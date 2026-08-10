(function (window, document) {
  "use strict";

  var currentScript = document.currentScript;

  function resolveBaseURL(protocol, hostname, origin, scriptSource) {
    var widgetPath = "/widgets/slider%20certificaciones%20new";
    if (scriptSource) {
      return new URL(".", scriptSource).href;
    }
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return new URL(widgetPath + "/", origin).href;
    }
    return "https://jypesa-widgets.vercel.app" + widgetPath + "/";
  }

  var baseURL = resolveBaseURL(
    location.protocol,
    location.hostname,
    location.origin,
    currentScript && currentScript.src
  );

  function report(message, error) {
    console.error("[Grupack Certifications] " + message, error || "");
  }

  function assetURL(value) {
    return new URL(value, baseURL).href;
  }

  function injectStylesheet(callback) {
    var marker = "gpk-certifications-styles";
    var existing = document.getElementById(marker);
    if (existing) {
      if (callback) callback();
      return;
    }
    var link = document.createElement("link");
    link.id = marker;
    link.rel = "stylesheet";
    link.href = assetURL("slider-certificaciones.css");
    var onLoad = function () {
      if (callback) callback();
      initAll();
      remeasureAll();
    };
    link.addEventListener("load", onLoad);
    link.addEventListener("error", function () {
      report("Could not load stylesheet.");
      if (callback) callback();
    });
    document.head.appendChild(link);
  }

  function resolveImages(widget) {
    widget.querySelectorAll("img[src]").forEach(function (image) {
      var source = image.getAttribute("src");
      if (!source || /^(?:[a-z]+:|\/\/|#|data:|blob:)/i.test(source)) return;
      image.src = assetURL(source);
      image.addEventListener("error", function () {
        image.classList.add("is-missing");
        image.removeAttribute("src");
      }, { once: true });
    });
  }

  var englishCards = [
    ["Good Manufacturing Practices", "We operate under ISO 22716 certification, ensuring that our cosmetic manufacturing processes meet international standards for quality, safety, and control.", "For hotels, this means offering reliable, consistent, and safe amenities in every room. For guests, it provides a personal care experience aligned with global standards, building confidence and satisfaction throughout their stay."],
    ["Cruelty-free beauty", "Our PETA certification confirms that our products are not tested on animals and align with the industry’s ethical standards.", "For hotels, this helps meet the expectations of increasingly informed and discerning guests. For guests, it reinforces an experience grounded in respect and responsibility while strengthening positive brand perception."],
    ["Sustainable palm oil", "Our RSPO certification allows us to develop products using palm oil from responsible sources. This certification applies to specific formulations upon client request.", "Hotels can integrate products aligned with sustainability and environmental responsibility policies. For guests, it represents a more conscious choice that adds value to the property’s brand experience."],
    ["Plastic recovered before reaching the ocean", "Our tube packaging is made with Ocean Bound Plastic collected before it reaches the ocean, helping reduce marine pollution.", "Hotels can reduce their environmental impact through concrete actions in their amenity programs. For guests, each product represents a tangible contribution to protecting the planet and integrating sustainability into their daily experience."],
    ["Climate commitment", "In 2025, we offset 292 metric tons of CO2 as part of our environmental commitment and as an initial step in an ongoing impact reduction and mitigation strategy.", "For hotels, this adds value to ESG goals and sustainability reporting. For guests, it reinforces the perception of a stay at a property committed to the environment and the planet’s future."],
    ["Quality that builds trust", "Our facilities and products are registered in accordance with U.S. Food and Drug Administration regulations, allowing us to operate compliantly in the U.S. market.", "For international hotels and hotel groups, this provides confidence and security when selecting suppliers. For guests, it ensures that products meet strict quality and safety requirements."]
  ];

  function resolveLanguage(widget) {
    var root = widget.closest && widget.closest("#gpk-slider-certificaciones-widget-root");
    var value = widget.getAttribute("data-lang") || (root && root.getAttribute("data-lang")) || "es";
    return String(value).toLowerCase().trim() === "en" ? "en" : "es";
  }

  function applyLanguage(widget, lang) {
    if (lang !== "en") return;
    widget.setAttribute("aria-roledescription", "carousel");
    widget.setAttribute("aria-label", "Certifications");
    var previous = widget.querySelector(".gpk-cert-prev");
    var next = widget.querySelector(".gpk-cert-next");
    if (previous) previous.setAttribute("aria-label", "View previous certification");
    if (next) next.setAttribute("aria-label", "View next certification");
    var cards = widget.querySelectorAll(".gpk-cert-card");
    cards.forEach(function (card, index) {
      var copy = englishCards[index];
      if (!copy) return;
      var tagline = card.querySelector(".gpk-cert-tagline");
      var paragraphs = card.querySelectorAll(".gpk-cert-copy");
      if (tagline) tagline.textContent = copy[0];
      if (paragraphs[0]) paragraphs[0].textContent = copy[1];
      if (paragraphs[1]) paragraphs[1].textContent = copy[2];
    });
    var carbonTitle = widget.querySelector(".gpk-cert-card--carbon h2");
    var carbonFallback = widget.querySelector(".gpk-cert-card--carbon .gpk-cert-image-fallback");
    var fdaTitle = widget.querySelector(".gpk-cert-card--fda h2");
    var fdaFallback = widget.querySelector(".gpk-cert-card--fda .gpk-cert-image-fallback");
    if (carbonTitle) carbonTitle.textContent = "Carbon Offset";
    if (carbonFallback) carbonFallback.textContent = "Carbon Offset";
    if (fdaTitle) fdaTitle.textContent = "Regulatory Compliance";
    if (fdaFallback) fdaFallback.textContent = "Regulatory Compliance";
  }

  function initWidget(widget) {
    if (!widget || widget.dataset.gpkCertInitialized === "true") return;

    var viewport = widget.querySelector(".gpk-cert-viewport");
    var track = widget.querySelector(".gpk-cert-track");
    var slides = Array.prototype.slice.call(track ? track.children : []);
    var cards = Array.prototype.slice.call(track ? track.querySelectorAll(".gpk-cert-card") : []);
    var previous = widget.querySelector(".gpk-cert-prev");
    var next = widget.querySelector(".gpk-cert-next");
    var status = widget.querySelector(".gpk-cert-status");
    var lang = resolveLanguage(widget);
    var state = { index: 0, visible: 1, step: 0, dragStart: null, pointerId: null };
    if (!viewport || !track || !previous || !next || !slides.length || cards.length !== slides.length) {
      report("Widget markup is incomplete.");
      return;
    }
    widget.dataset.gpkCertInitialized = "true";
    applyLanguage(widget, lang);

    if (status) status.textContent = "";
    resolveImages(widget);

    function lastIndex() {
      return Math.max(0, slides.length - state.visible);
    }

    function render(announce) {
      state.index = Math.min(lastIndex(), Math.max(0, state.index));
      widget.style.setProperty("--gpk-cert-offset", String(-state.index * state.step) + "px");
      previous.disabled = state.index === 0;
      next.disabled = state.index === lastIndex();
      cards.forEach(function (card, cardIndex) {
        var visible = cardIndex >= state.index && cardIndex < state.index + state.visible;
        card.setAttribute("aria-hidden", String(!visible));
      });
      if (announce && status) {
        status.textContent = lang === "en"
          ? "Certifications " + (state.index + 1) + " to " + Math.min(slides.length, state.index + state.visible) + " of " + slides.length
          : "Certificaciones " + (state.index + 1) + " a " + Math.min(slides.length, state.index + state.visible) + " de " + slides.length;
      }
    }

    function measure() {
      var styles = window.getComputedStyle(widget);
      var trackStyles = window.getComputedStyle(track);
      state.visible = Math.max(1, parseInt(styles.getPropertyValue("--gpk-cert-visible"), 10) || 1);
      state.step = slides[0].getBoundingClientRect().width +
        (parseFloat(trackStyles.columnGap || trackStyles.gap) || 0);
      render(false);
    }

    function move(delta) {
      var nextIndex = Math.min(lastIndex(), Math.max(0, state.index + delta));
      if (nextIndex === state.index) return;
      state.index = nextIndex;
      render(true);
    }

    function onPreviousClick() { move(-1); }
    function onNextClick() { move(1); }
    function onKeydown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
    function onPointerDown(event) {
      if (event.isPrimary === false || event.button !== 0 || state.pointerId !== null) return;
      state.dragStart = event.clientX;
      state.pointerId = event.pointerId;
      if (typeof viewport.setPointerCapture === "function") {
        viewport.setPointerCapture(event.pointerId);
      }
    }
    function onPointerUp(event) {
      if (state.dragStart === null || event.pointerId !== state.pointerId) return;
      var distance = event.clientX - state.dragStart;
      state.dragStart = null;
      state.pointerId = null;
      if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
    }
    function onPointerCancel(event) {
      if (event.pointerId !== state.pointerId) return;
      state.dragStart = null;
      state.pointerId = null;
    }

    previous.addEventListener("click", onPreviousClick);
    next.addEventListener("click", onNextClick);
    viewport.addEventListener("keydown", onKeydown);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerCancel);

    var resizeObserver = null;
    function cleanup() {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      previous.removeEventListener("click", onPreviousClick);
      next.removeEventListener("click", onNextClick);
      viewport.removeEventListener("keydown", onKeydown);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerCancel);
      removalObserver.disconnect();
      delete widget._gpkCertMeasure;
      delete widget.dataset.gpkCertInitialized;
    }
    if ("ResizeObserver" in window) {
      resizeObserver = new window.ResizeObserver(measure);
      resizeObserver.observe(viewport);
    } else {
      window.addEventListener("resize", measure);
    }
    var removalObserver = new window.MutationObserver(function () {
      if (!document.documentElement.contains(widget)) cleanup();
    });
    removalObserver.observe(document.documentElement, { childList: true, subtree: true });
    widget._gpkCertMeasure = measure;
    measure();
  }

  function remeasureAll() {
    document.querySelectorAll(".gpk-cert-widget").forEach(function (widget) {
      if (typeof widget._gpkCertMeasure === "function") {
        widget._gpkCertMeasure();
      }
    });
  }

  function initAll() {
    document.querySelectorAll(".gpk-cert-widget").forEach(function (widget) {
      if (widget.dataset.gpkCertInitialized === "true") return;
      initWidget(widget);
    });
  }

  function observeWidgets() {
    var observer = new window.MutationObserver(initAll);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return observer;
  }

  function loadMarkup() {
    var root = document.getElementById("gpk-slider-certificaciones-widget-root");
    if (!root || root.querySelector(".gpk-cert-widget")) {
      initAll();
      return;
    }
    fetch(assetURL("slider-certificaciones.html"))
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      })
      .then(function (html) {
        root.innerHTML = html;
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(function() {
            initAll();
            remeasureAll();
          });
        } else {
          initAll();
          remeasureAll();
        }
      })
      .catch(function (error) { report("Could not load widget markup.", error); });
  }

  if (typeof module === "object" && module.exports) {
    module.exports = { initWidget: initWidget, initAll: initAll, observeWidgets: observeWidgets, resolveLanguage: resolveLanguage, applyLanguage: applyLanguage };
    return;
  }

  injectStylesheet();
  observeWidgets();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadMarkup, { once: true });
  } else {
    loadMarkup();
  }
})(window, document);
