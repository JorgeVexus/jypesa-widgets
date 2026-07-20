(function () {
  // Guard against multiple initializations
  if (window.__JypesaProcesoWidgetInitialized) return;
  window.__JypesaProcesoWidgetInitialized = true;

  var SLUG = 'proceso';
  var GSAP_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var ST_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

  var STEPS = [
    { n: 1, t: 'Brief técnico', d: 'Levantamiento de requerimientos y especificaciones clave.' },
    { n: 2, t: 'Análisis de viabilidad', d: 'Evaluación técnica, de costos y factibilidad de producción.' },
    { n: 3, t: 'Desarrollo o adaptación', d: 'Formulación y desarrollo a medida según necesidades.' },
    { n: 4, t: 'Validación de muestras', d: 'Elaboración de prototipos para pruebas y aprobación.' },
    { n: 5, t: 'Ajustes regulatorios', d: 'Cumplimiento normativo, etiquetado y certificaciones.' },
    { n: 6, t: 'Producción piloto', d: 'Prueba a escala inicial para verificación de calidad.' },
    { n: 7, t: 'Producción industrial', d: 'Fabricación masiva bajo estándares rigurosos.' },
    { n: 8, t: 'Entrega', d: 'Empaque, logística y entrega en destino final.' }
  ];

  // Helper to load CSS link dynamically based on script location
  function injectStylesheet() {
    var scriptEl = document.currentScript || document.querySelector('script[src*="proceso-widget.js"]');
    var cssUrl = '';
    if (scriptEl && scriptEl.src) {
      cssUrl = scriptEl.src.replace('.js', '.css');
    } else {
      cssUrl = './widgets/proceso/proceso-widget.css';
    }
    
    if (document.querySelector('link[href="' + cssUrl + '"]')) return;
    
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    document.head.appendChild(link);
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
    var cardsHtml = '';

    STEPS.forEach(function (step) {
      var descHtml = step.d ? '<p class="jyp-step-desc">' + step.d + '</p>' : '';
      cardsHtml += '' +
        '<div class="jyp-step-card step-' + step.n + '" data-step="' + step.n + '">' +
          '<div class="jyp-step-dot dot-' + step.n + '" data-step="' + step.n + '">' +
            '<div class="jyp-dot-ring outer"></div>' +
            '<div class="jyp-dot-ring mid"></div>' +
            '<div class="jyp-dot-ring inner"></div>' +
          '</div>' +
          '<h3 class="jyp-step-num">' + step.n + '</h3>' +
          '<div class="jyp-step-details">' +
            '<h4 class="jyp-step-title">' + step.t + '</h4>' +
            descHtml +
          '</div>' +
        '</div>';
    });

    return '' +
      '<section class="jyp-proceso-section">' +
        '<div class="jyp-proceso-container">' +
          '<!-- Header -->' +
          '<div class="jyp-proceso-header">' +
            '<div class="jyp-proceso-sub">' +
              '<p>Nuestro proceso</p>' +
            '</div>' +
            '<div class="jyp-proceso-header-row">' +
              '<div class="jyp-proceso-title-wrap">' +
                '<h2 class="jyp-proceso-title-main">De la idea a la </h2>' +
                '<p class="jyp-proceso-title-gradient">producción</p>' +
              '</div>' +
              '<div class="jyp-proceso-header-desc">' +
                '<strong>Metodología clara que reduce riesgos y retrabajos.</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
          
          '<!-- Content Timeline Area -->' +
          '<div class="jyp-proceso-content">' +
            '<!-- SVG Serpentine Line -->' +
            '<div class="jyp-proceso-svg-wrap">' +
              '<svg viewBox="0 0 1080.5 271" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<!-- Background Inactive Path -->' +
                '<path class="jyp-svg-line-bg" d="M0 0.5H950C1021.8 0.5 1080 60.9416 1080 135.5C1080 210.058 1021.8 270.5 950 270.5H320" stroke="#506D85" stroke-opacity="0.15" stroke-width="2"/>' +
                '<!-- Foreground Active Path -->' +
                '<path class="jyp-svg-line-active" d="M0 0.5H950C1021.8 0.5 1080 60.9416 1080 135.5C1080 210.058 1021.8 270.5 950 270.5H320" stroke="#48A9C5" stroke-width="2" stroke-linecap="round"/>' +
              '</svg>' +
              '<!-- Mobile progress line -->' +
              '<div class="jyp-proceso-mobile-progress"></div>' +
            '</div>' +
            
            '<!-- Rendered Cards with embedded Dots -->' +
            cardsHtml +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function initAnimation(root) {
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!gsap || !ST || reduce) {
      // Fallback: make everything active and visible
      root.querySelectorAll('.jyp-step-card, .jyp-step-dot').forEach(function (el) {
        el.classList.add('visited');
      });
      return;
    }

    if (gsap.registerPlugin && ST) gsap.registerPlugin(ST);

    var activePath = root.querySelector('.jyp-svg-line-active');
    var isMobile = function () { return window.innerWidth <= 1024; };

    // Function to update active/visited classes
    function toggleActive(activeIndex) {
      root.querySelectorAll('.jyp-step-card').forEach(function (card, idx) {
        var stepNum = idx + 1;
        if (stepNum === activeIndex) {
          card.classList.add('active');
          card.classList.remove('visited');
        } else if (stepNum < activeIndex) {
          card.classList.remove('active');
          card.classList.add('visited');
        } else {
          card.classList.remove('active');
          card.classList.remove('visited');
        }
      });

      root.querySelectorAll('.jyp-step-dot').forEach(function (dot, idx) {
        var stepNum = idx + 1;
        if (stepNum === activeIndex) {
          dot.classList.add('active');
          dot.classList.remove('visited');
        } else if (stepNum < activeIndex) {
          dot.classList.remove('active');
          dot.classList.add('visited');
        } else {
          dot.classList.remove('active');
          dot.classList.remove('visited');
        }
      });
    }

    // Measure active SVG line
    var pathLength = activePath.getTotalLength();
    gsap.set(activePath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    var mm = gsap.matchMedia();

    // DESKTOP PINNED TIMELINE
    mm.add("(min-width: 1025px)", function () {
      // Initial states
      gsap.set(".jyp-step-dot.dot-1, .jyp-step-card.step-1", { opacity: 1, y: 0, scale: 1 });
      gsap.set([".jyp-step-dot:not(.dot-1)", ".jyp-step-card:not(.step-1)"], { opacity: 0.3, y: 15, scale: 0.9 });
      gsap.set(activePath, { strokeDashoffset: pathLength });
      
      toggleActive(1);

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector('.jyp-proceso-section'),
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            var progress = self.progress;
            var activeIndex = 1;
            if (progress >= 0.15) activeIndex = 2;
            if (progress >= 0.30) activeIndex = 3;
            if (progress >= 0.45) activeIndex = 4;
            if (progress >= 0.57) activeIndex = 5;
            if (progress >= 0.70) activeIndex = 6;
            if (progress >= 0.85) activeIndex = 7;
            if (progress >= 0.97) activeIndex = 8;
            
            toggleActive(activeIndex);
          }
        }
      });

      // Animate line path
      tl.to(activePath, { strokeDashoffset: 0, ease: 'none', duration: 1 });

      // Animate steps opacity/positions in sync exactly as line reaches each dot
      tl.to(".jyp-step-dot.dot-2, .jyp-step-card.step-2", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.16)
        .to(".jyp-step-dot.dot-3, .jyp-step-card.step-3", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.31)
        .to(".jyp-step-dot.dot-4, .jyp-step-card.step-4", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.46)
        .to(".jyp-step-dot.dot-5, .jyp-step-card.step-5", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.58)
        .to(".jyp-step-dot.dot-6, .jyp-step-card.step-6", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.71)
        .to(".jyp-step-dot.dot-7, .jyp-step-card.step-7", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.86)
        .to(".jyp-step-dot.dot-8, .jyp-step-card.step-8", { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0.98);

      return function () {
        // Cleanup functions
        tl.kill();
      };
    });

    // MOBILE STACKED TIMELINE
    mm.add("(max-width: 1024px)", function () {
      // Set initial state for mobile
      gsap.set(".jyp-step-dot, .jyp-step-card", { opacity: 0.3, x: 15, scale: 0.9 });
      gsap.set(".jyp-step-dot.dot-1, .jyp-step-card.step-1", { opacity: 1, x: 0, scale: 1 });
      toggleActive(1);

      // ScrollTrigger for mobile progress bar
      var mobileST = ScrollTrigger.create({
        trigger: root.querySelector('.jyp-proceso-content'),
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: function (self) {
          var progress = self.progress;
          var mobileLine = root.querySelector('.jyp-proceso-mobile-progress');
          if (mobileLine) {
            mobileLine.style.height = (progress * 100) + '%';
          }
          
          var activeIndex = 1;
          if (progress > 0.10) activeIndex = 2;
          if (progress > 0.24) activeIndex = 3;
          if (progress > 0.38) activeIndex = 4;
          if (progress > 0.52) activeIndex = 5;
          if (progress > 0.66) activeIndex = 6;
          if (progress > 0.80) activeIndex = 7;
          if (progress > 0.92) activeIndex = 8;
          
          toggleActive(activeIndex);
        }
      });

      // Animate card entries
      var mobileTimelines = [];
      root.querySelectorAll('.jyp-step-card').forEach(function (card, idx) {
        if (idx === 0) return;
        var dot = root.querySelector('.jyp-step-dot.dot-' + (idx + 1));
        
        var mTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
        
        mTl.to(card, { opacity: 1, x: 0, scale: 1, duration: 0.4 })
           .to(dot, { opacity: 1, scale: 1, duration: 0.3 }, 0);
           
        mobileTimelines.push(mTl);
      });

      return function () {
        mobileST.kill();
        mobileTimelines.forEach(function (t) { t.kill(); });
      };
    });
  }

  function initTimeline() {
    var target = document.getElementById('jypesa-proceso-widget') || document.querySelector('[data-jypesa-proceso-widget]');
    if (!target) {
      console.warn("Jypesa Proceso Widget target element not found.");
      return;
    }

    // Inject css stylesheet
    injectStylesheet();

    // Render HTML content
    target.innerHTML = buildHtml();

    // Boot GSAP
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
