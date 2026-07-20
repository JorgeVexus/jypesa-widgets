(function () {
  // Guard against multiple initializations
  if (window.__JypesaSustentabilidadWidgetInitialized) return;
  window.__JypesaSustentabilidadWidgetInitialized = true;

  var SLUG = 'sustentabilidad';
  var GSAP_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var ST_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

  // Helper to load CSS link dynamically based on script location
  function injectStylesheet() {
    var scriptEl = document.currentScript || document.querySelector('script[src*="sustentabilidad-widget.js"]');
    var cssUrl = '';
    if (scriptEl && scriptEl.src) {
      cssUrl = scriptEl.src.replace('.js', '.css');
    } else {
      cssUrl = './widgets/sustentabilidad/sustentabilidad-widget.css';
    }

    if (document.querySelector('link[href="' + cssUrl + '"]')) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    document.head.appendChild(link);
  }

  // Resolve images directory URL
  function getImagesDir() {
    var scriptEl = document.currentScript || document.querySelector('script[src*="sustentabilidad-widget.js"]');
    var scriptUrl = scriptEl ? scriptEl.src : '';
    if (scriptUrl) {
      var baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));
      // From widgets/sustentabilidad to widgets/assets/images/sustentabilidad
      return baseUrl.substring(0, baseUrl.lastIndexOf('/')) + '/assets/images/sustentabilidad';
    }
    return './widgets/assets/images/sustentabilidad';
  }

  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function ensureGsap(cb) {
    if (window.gsap && window.ScrollTrigger) return cb();
    if (window.gsap) {
      return loadScript(ST_SRC, cb);
    }
    loadScript(GSAP_SRC, function () {
      loadScript(ST_SRC, cb);
    });
  }

  function buildHtml() {
    var imagesDir = getImagesDir();
    var imgBg1 = imagesDir + '/card-bg-1.png';
    var imgBg2 = imagesDir + '/card-bg-2.png';
    var imgBg3 = imagesDir + '/card-bg-3.png';
    var imgWarehouse = imagesDir + '/warehouse.png';

    var svgCheck = '<svg class="jyp-sust-check-icon" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.17321 8.20689L9.76384 3.61626C9.87217 3.50793 9.99856 3.45376 10.143 3.45376C10.2874 3.45376 10.4138 3.50793 10.5222 3.61626C10.6305 3.72459 10.6847 3.85324 10.6847 4.0022C10.6847 4.15116 10.6305 4.2798 10.5222 4.38813L5.55238 9.37147C5.44405 9.4798 5.31766 9.53397 5.17321 9.53397C5.02877 9.53397 4.90238 9.4798 4.79405 9.37147L2.46488 7.0423C2.35655 6.93397 2.30464 6.80532 2.30915 6.65636C2.31367 6.50741 2.37009 6.37876 2.47842 6.27043C2.58676 6.16209 2.7154 6.10793 2.86436 6.10793C3.01332 6.10793 3.14196 6.16209 3.2503 6.27043L5.17321 8.20689Z" fill="currentColor"/></svg>';

    // HTML elements templates to avoid code duplication
    var cardsHtml = '' +
      '<div class="jyp-sust-card card-1">' +
      '<img class="jyp-sust-card-bg-img" src="' + imgBg1 + '" alt="Fórmula">' +
      '<div class="jyp-sust-card-content">' +
      '<h3 class="jyp-sust-card-title">Desarrollo de fórmula</h3>' +
      '<div class="jyp-sust-card-checklist">' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Desde cero</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Adaptación de fórmulas</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Optimización</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Replicación técnica</span></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="jyp-sust-card card-2">' +
      '<img class="jyp-sust-card-bg-img" src="' + imgBg2 + '" alt="I+D">' +
      '<div class="jyp-sust-card-content">' +
      '<h3 class="jyp-sust-card-title">Investigación<br>y desarrollo</h3>' +
      '<div class="jyp-sust-card-checklist">' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Laboratorio interno</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Pruebas microbiológicas</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Estudios de estabilidad</span></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="jyp-sust-card card-3">' +
      '<img class="jyp-sust-card-bg-img" src="' + imgBg3 + '" alt="Empaque">' +
      '<div class="jyp-sust-card-content">' +
      '<h3 class="jyp-sust-card-title">Branding y empaque</h3>' +
      '<div class="jyp-sust-card-checklist">' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Diseño y adaptación</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Estudios de estabilidad</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-card-check-text">Selección de materiales</span></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    var photoHtml = '' +
      '<div class="jyp-sust-photo-block">' +
      '<img class="jyp-sust-photo-img" src="' + imgWarehouse + '" alt="Almacén de optimización">' +
      '</div>';

    var state1LeftTextHtml = '' +
      '<h2 class="jyp-sust-state-title">Modelo de servicio integral</h2>' +
      '<p class="jyp-sust-state-desc">Sistemas de dispensación recargables diseñados para reducir el uso de envases de un solo uso en hoteles y operaciones de hospitalidad.</p>' +
      '<p class="jyp-sust-state-desc" style="opacity: 0.78;">Reducimos la fricción operativa y aceleramos tu salida al mercado.</p>';

    var state2LeftTextHtml = '' +
      '<h2 class="jyp-sust-state-title">Innovación aplicada</h2>' +
      '<p class="jyp-sust-state-desc">Escuchamos tu necesidad principal, la resolvemos técnicamente.</p>' +
      '<div class="jyp-sust-checklist">' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Optimización sensorial</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Alternativas de materias primas</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Mejora de estabilidad</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Sustitución estratégica de ingredientes</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Diferenciación competitiva</span></div>' +
      '<div class="jyp-sust-check-item">' + svgCheck + '<span class="jyp-sust-check-text">Alternativas sostenibles</span></div>' +
      '</div>' +
      '<p class="jyp-sust-state-desc" style="opacity: 0.78;">No nos limitamos a ejecutar instrucciones, aportamos criterio técnico.</p>';

    return '' +
      '<section class="jyp-sust-section">' +
      '<div class="jyp-sust-container">' +

      '<!-- LADO IZQUIERDO -->' +
      '<div class="jyp-sust-left">' +
      '<div class="jyp-sust-static-header">' +
      '<div class="jyp-sust-sub">' +
      '<p><span class="jyp-sust-sub-underline">Un solo proceso</span>, múltiples soluciones</p>' +
      '</div>' +
      '<h2 class="jyp-sust-title">De la formulación a la optimización</h2>' +
      '<p class="jyp-sust-desc">Integramos desarrollo, adaptación y optimización en un solo proceso, aportando criterio técnico en cada etapa para mejorar el desempeño, la viabilidad y la competitividad del producto.</p>' +
      '</div>' +
      '<div class="jyp-sust-divider"></div>' +

      '<!-- CONTENIDO DINÁMICO ESCRITORIO -->' +
      '<div class="jyp-sust-dynamic-wrap">' +
      '<div class="jyp-sust-state-left state-1 active">' +
      state1LeftTextHtml +
      '</div>' +
      '<div class="jyp-sust-state-left state-2">' +
      state2LeftTextHtml +
      '</div>' +
      '</div>' +

      '<!-- FLUJO VERTICAL MÓVIL (Rearreglo para móvil) -->' +
      '<div class="jyp-sust-mobile-flow">' +
      '<div class="jyp-sust-mobile-block block-1">' +
      '<div class="jyp-sust-mobile-block-text">' +
      state1LeftTextHtml +
      '</div>' +
      '<div class="jyp-sust-cards-group">' +
      cardsHtml +
      '</div>' +
      '</div>' +
      '<div class="jyp-sust-mobile-block block-2">' +
      '<div class="jyp-sust-mobile-block-text">' +
      state2LeftTextHtml +
      '</div>' +
      photoHtml +
      '</div>' +
      '</div>' +

      '</div>' +

      '<!-- LADO DERECHO (Solo escritorio) -->' +
      '<div class="jyp-sust-right">' +
      '<div class="jyp-sust-sliding-container">' +
      '<div class="jyp-sust-cards-group">' +
      cardsHtml +
      '</div>' +
      photoHtml +
      '</div>' +
      '</div>' +

      '</div>' +
      '</section>';
  }

  function initAnimation(root) {
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!gsap || !ST || reduce) {
      return; // Fallback handled by CSS
    }

    if (gsap.registerPlugin && ST) gsap.registerPlugin(ST);

    var leftState1 = root.querySelector('.jyp-sust-state-left.state-1');
    var leftState2 = root.querySelector('.jyp-sust-state-left.state-2');
    var cardsGroup = root.querySelector('.jyp-sust-right .jyp-sust-cards-group');
    var photoBlock = root.querySelector('.jyp-sust-right .jyp-sust-photo-block');
    var section = root.querySelector('.jyp-sust-section');

    var mm = gsap.matchMedia();

    // DESKTOP INTERACTIVE PINNED SCROLL
    mm.add("(min-width: 1025px)", function () {
      // Set initial state values
      gsap.set(leftState1, { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(leftState2, { opacity: 0, y: 25, pointerEvents: 'none' });
      gsap.set(cardsGroup, { opacity: 1 });
      gsap.set(photoBlock, { opacity: 0 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1200", // Smooth scroll pin duration
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      // Synchronized scrub animations: fade out cards, fade in photo, change left side texts
      tl.to(leftState1, { opacity: 0, y: -25, pointerEvents: 'none', duration: 0.4 }, 0)
        .to(cardsGroup, { opacity: 0, ease: 'power2.inOut', duration: 1 }, 0)
        .to(photoBlock, { opacity: 1, ease: 'power2.inOut', duration: 1 }, 0)
        .to(leftState2, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.4 }, 0.6);

      return function () {
        tl.kill();
      };
    });

    // MOBILE TIMELINE ENTRIES
    mm.add("(max-width: 1024px)", function () {
      // Clean inline styles from desktop mode
      gsap.set([leftState1, leftState2, cardsGroup, photoBlock], { clearProps: "all" });

      // Animate entry of block 2 content on mobile scroll
      gsap.from(".jyp-sust-mobile-block.block-2", {
        opacity: 0.4,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".jyp-sust-mobile-block.block-2",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  function initTimeline() {
    var target = document.getElementById('jypesa-sustentabilidad-widget') || document.querySelector('[data-jypesa-sustentabilidad-widget]');
    if (!target) {
      console.warn("Jypesa Sustentabilidad Widget target element not found.");
      return;
    }

    // Inject CSS
    injectStylesheet();

    // Render HTML content
    target.innerHTML = buildHtml();

    // Setup GSAP
    ensureGsap(function () {
      initAnimation(target);
    });
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
