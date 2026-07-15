(function () {
  // Guard contra múltiples inicializaciones
  if (window.__JypesaBeneficiosPerseaWidgetInitialized) return;
  window.__JypesaBeneficiosPerseaWidgetInitialized = true;

  var SLUG = 'beneficios-persea';
  var GSAP_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var ST_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
  var SOAP_IMG = 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a566ccb56a4028bde4f9216_persea%20beneficios.avif';

  var BENEFITS = [
    { n: 1,  t: 'Vegano',              d: 'Sin ingredientes de origen animal ni subproductos' },
    { n: 2,  t: 'Cruelty-free',        d: 'No probado en animales' },
    { n: 3,  t: 'Libre de parabenos',  d: 'Conservado sin parabenos' },
    { n: 4,  t: 'Sin ftalatos',        d: 'Sin plastificantes restringidos' },
    { n: 5,  t: 'Sin aceites minerales', d: 'Sin parafina/mineral oil' },
    { n: 6,  t: 'Fórmula biodegradable', d: 'Para un consumo responsable' },
    { n: 7,  t: 'Sin alcohol secante', d: 'Menos resequedad/ardor' },
    { n: 8,  t: 'Sin formaldehído',    d: '"Donors". No libera formaldehído.' },
    { n: 9,  t: 'Microbiome-friendly', d: 'Formulado/testado para respetar microbiota' },
    { n: 10, t: 'No GMO',              d: 'Menor riesgo de alergia de contacto' },
    { n: 11, t: 'Sin MIT/CMIT',        d: 'Menor riesgo de alergia de contacto' }
  ];

  function injectStyles() {
    if (document.getElementById('bp-styles-' + SLUG)) return;
    var style = document.createElement('style');
    style.id = 'bp-styles-' + SLUG;
    style.textContent = [
      "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@500&family=Rubik:wght@400;500&display=swap');",
      "",
      ".bp-widget{",
      "  position:relative;width:100%;padding:60px 0;",
      "  box-sizing:border-box;background-position:center;background-size:cover;background-repeat:no-repeat;",
      "  --bp-text-color:#506D85;color:var(--bp-text-color);",
      "  font-family:'Rubik',sans-serif;-webkit-font-smoothing:antialiased;",
      "}",
      ".bp-widget-inner{",
      "  width:100%;max-width:1320px;margin:0 auto;padding:0 24px;box-sizing:border-box;position:relative;",
      "}",
      "",
      ".bp-header{text-align:center;margin-bottom:30px;padding:0 16px;}",
      ".bp-title{",
      "  font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;",
      "  font-size:44px;line-height:1;margin:0;color:inherit;letter-spacing:1px;",
      "}",
      ".bp-slogan{",
      "  font-family:'Montserrat',sans-serif;font-weight:500;font-size:24px;",
      "  line-height:1.25;margin:10px 0 0;color:inherit;",
      "}",
      ".bp-slogan-desktop-spaces{display:none;}",
      "",
      ".bp-stage{position:relative;width:100%;max-width:1210px;margin:0 auto;",
      "  aspect-ratio:1210 / 1028;}",
      "",
      ".bp-soap{",
      "  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);",
      "  height:min(600px,58vh);width:auto;max-width:90%;z-index:1;pointer-events:none;",
      "  filter:drop-shadow(0 12px 30px rgba(80,109,133,0.18));",
      "}",
      "",
      ".bp-item{position:absolute;z-index:2;display:flex;align-items:center;}",
      ".bp-num{",
      "  font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;",
      "  font-size:40px;line-height:1;color:inherit;",
      "  margin-right:18px;flex:0 0 auto;",
      "}",
      ".bp-sep{display:block;width:1px;height:45px;",
      "  background:var(--bp-text-color);opacity:0.35;margin-right:18px;flex:0 0 auto;}",
      ".bp-text{max-width:200px;}",
      ".bp-item-title{font-family:'Rubik',sans-serif;font-weight:500;",
      "  font-size:21px;line-height:1.15;color:inherit;margin:0;}",
      ".bp-item-desc{font-family:'Rubik',sans-serif;font-weight:400;",
      "  font-size:14px;line-height:1.35;color:inherit;opacity:0.78;margin-top:4px;}",
      "",
      "/* Posiciones escalonadas tipo reloj, simétricas (desktop) */",
      "@media (min-width:901px){",
      "  .bp-widget{height:min(1028px, 100vh);padding:24px 0;}",
      "  .bp-widget-inner{display:flex;flex-direction:column;height:100%;}",
      "  .bp-header{position:relative;width:901px;height:175px;margin:0 auto 38px;padding:0;}",
      "  .bp-title{",
      "    position:absolute;left:22px;top:0;width:379px;height:80px;",
      "    font-size:90px;letter-spacing:4.5px;text-align:center;",
      "  }",
      "  .bp-slogan{",
      "    position:absolute;left:50%;transform:translateX(-50%);top:5px;width:901px;",
      "    font-size:75px;line-height:1.13;text-align:center;white-space:pre-wrap;margin:0;",
      "  }",
      "  .bp-slogan-desktop-spaces{display:inline;}",
      "  .bp-stage{flex:1 1 auto;aspect-ratio:auto;max-height:none;}",
      "  .bp-item.bp-pos-1{left:12%;top:4%}",
      "  .bp-item.bp-pos-2{left:6%;top:22%}",
      "  .bp-item.bp-pos-3{left:0.5%;top:42%}",
      "  .bp-item.bp-pos-4{left:4%;top:60%}",
      "  .bp-item.bp-pos-5{left:10%;top:76%}",
      "  .bp-item.bp-pos-6{left:50%;top:86%;transform:translateX(-50%)}",
      "  .bp-item.bp-pos-11{right:12%;top:4%}",
      "  .bp-item.bp-pos-10{right:6%;top:22%}",
      "  .bp-item.bp-pos-9{right:0.5%;top:42%}",
      "  .bp-item.bp-pos-8{right:4%;top:60%}",
      "  .bp-item.bp-pos-7{right:10%;top:76%}",
      "}",
      "",
      "/* Responsive: apila en vertical, jabón arriba */",
      "@media (max-width:900px){",
      "  .bp-stage{aspect-ratio:auto;display:flex;flex-direction:column;",
      "    align-items:center;gap:16px;max-width:360px;}",
      "  .bp-soap{position:static;transform:none;width:160px;margin:6px auto 18px;}",
      "  .bp-item{position:static!important;top:auto!important;left:auto!important;",
      "    right:auto!important;transform:none!important;width:100%;max-width:340px;",
      "    justify-content:flex-start;}",
      "  .bp-text{max-width:100%;}",
      "}",
      "",
      "/* Estados iniciales (ocultos) para evitar flash antes de GSAP */",
      ".bp-header{opacity:0;transform:translateY(-20px);}",
      ".bp-num{opacity:0;transform:scale(0.6);transform-origin:center;}",
      ".bp-sep{opacity:0;transform:scaleY(0);transform-origin:top center;}",
      ".bp-text{opacity:0;transform:translateX(-24px);}",
      "",
      "/* Fallback: sin GSAP o reduced-motion -> todo visible */",
      ".bp-fallback .bp-header,.bp-fallback .bp-num,",
      ".bp-fallback .bp-sep,.bp-fallback .bp-text{",
      "  opacity:1!important;transform:none!important;}",
      ""
    ].join('\n');
    document.head.appendChild(style);
  }

  function buildHtml(centralImg) {
    var items = BENEFITS.map(function (b) {
      return '' +
        '<div class="bp-item bp-pos-' + b.n + '" data-index="' + b.n + '">' +
          '<span class="bp-num">' + b.n + '</span>' +
          '<span class="bp-sep" aria-hidden="true"></span>' +
          '<div class="bp-text">' +
            '<div class="bp-item-title">' + b.t + '</div>' +
            '<div class="bp-item-desc">' + b.d + '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    return '' +
      '<div class="bp-widget">' +
        '<div class="bp-widget-inner">' +
          '<div class="bp-header">' +
            '<h2 class="bp-title">Beneficios</h2>' +
            '<p class="bp-slogan"><span class="bp-slogan-desktop-spaces">                   </span>que marcan la diferencia</p>' +
          '</div>' +
          '<div class="bp-stage">' +
            '<img class="bp-soap" src="' + (centralImg || SOAP_IMG) + '" alt="Jabón Persea">' +
            items +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function initAnimation(root) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    // Sin GSAP, sin ScrollTrigger o reduced-motion -> todo visible (fallback)
    if (!gsap || !ST || reduce) {
      root.classList.add('bp-fallback');
      return;
    }
    if (gsap.registerPlugin && ST) gsap.registerPlugin(ST);

    var header = root.querySelector('.bp-header');
    var items = root.querySelectorAll('.bp-item');
    var section = root.querySelector('.bp-widget') || root;

    // Construye la timeline coreografiada (número -> línea -> texto) 1..11
    function buildTimeline(triggerCfg) {
      var tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: triggerCfg
      });
      tl.to(header, { opacity: 1, y: 0, duration: 0.4 });
      var pos = 0.5;
      items.forEach(function (item) {
        var num = item.querySelector('.bp-num');
        var sep = item.querySelector('.bp-sep');
        var txt = item.querySelector('.bp-text');
        tl.to(num, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' }, pos);
        tl.to(sep, { opacity: 1, scaleY: 1, duration: 0.3 }, pos + 0.18);
        tl.to(txt, { opacity: 1, x: 0, duration: 0.4 }, pos + 0.32);
        pos += 0.5; // cada beneficio avanza en el scroll
      });
      return tl;
    }

    // Estados iniciales ocultos (se reaplican por matchMedia al cambiar breakpoint)
    function hideAll() {
      gsap.set(header, { opacity: 0, y: -20 });
      items.forEach(function (item) {
        gsap.set(item.querySelector('.bp-num'), { opacity: 0, scale: 0.6 });
        gsap.set(item.querySelector('.bp-sep'), { opacity: 0, scaleY: 0 });
        gsap.set(item.querySelector('.bp-text'), { opacity: 0, x: -24 });
      });
    }

    var mm = gsap.matchMedia();
    // Desktop: sección FIJA (pin) a pantalla completa; al hacer scroll aparecen 1..11
    mm.add('(min-width: 901px)', function () {
      hideAll();
      buildTimeline({
        trigger: section,
        start: 'top top',
        end: '+=1700',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      });
    });
    // Móvil: reveal atado al scroll, sin pin (la lista apilada es alta)
    mm.add('(max-width: 900px)', function () {
      hideAll();
      buildTimeline({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 55%',
        scrub: 0.6,
        invalidateOnRefresh: true
      });
    });

    // Recalcula posiciones cuando cargan fuentes/imágenes (clave con pin)
    var refresh = function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh);
    setTimeout(refresh, 400);
  }

  // Leer imágenes y configuraciones desde un listado dinámico del CMS en la página
  function readImagesFromCMS() {
    var source = document.querySelector('.jypesa-beneficios-cms-source');
    if (!source) {
      var sampleImg = document.querySelector('.jypesa-beneficios-col-central-img');
      if (sampleImg) {
        source = sampleImg.closest('.w-dyn-list') || sampleImg.closest('.w-dyn-items') || sampleImg.parentElement;
      }
    }
    if (!source) return null;

    var centralImgEl = source.querySelector('.jypesa-beneficios-col-central-img');
    var bgImgEl = source.querySelector('.jypesa-beneficios-col-bg-img');
    var textColorEl = source.querySelector('.jypesa-beneficios-col-text-color');

    var centralImg = centralImgEl ? (centralImgEl.getAttribute('src') || centralImgEl.src) : null;
    var bgImg = bgImgEl ? (bgImgEl.getAttribute('src') || bgImgEl.src) : null;
    var textColor = textColorEl ? textColorEl.textContent.trim() : null;

    return {
      centralImg: centralImg,
      bgImg: bgImg,
      textColor: textColor
    };
  }

  function boot() {
    var targets = document.querySelectorAll('#jypesa-beneficios-persea-widget, [data-jypesa-beneficios-persea-widget], .jypesa-beneficios-persea-widget');
    if (!targets.length) return;

    injectStyles();

    var cmsData = readImagesFromCMS();

    targets.forEach(function (target) {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      var customCentralImg = target.getAttribute('data-central-img');
      var customBgImg = target.getAttribute('data-bg-img');
      var customTextColor = target.getAttribute('data-text-color');

      var centralImg = customCentralImg || (cmsData && cmsData.centralImg) || SOAP_IMG;
      var bgImg = customBgImg || (cmsData && cmsData.bgImg) || 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a567e82b6dd63d7d58888a8_background%20beneficios%20persea.webp';
      var textColor = customTextColor || (cmsData && cmsData.textColor) || null;

      target.innerHTML = buildHtml(centralImg);

      var widgetEl = target.querySelector('.bp-widget');
      if (widgetEl) {
        if (bgImg) {
          widgetEl.style.backgroundImage = "url('" + bgImg + "')";
        }
        if (textColor) {
          widgetEl.style.setProperty('--bp-text-color', textColor);
        }
      }

      initAnimation(target);
    });
  }

  function loadScript(src, ondone) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = ondone;
    s.onerror = ondone; // si falla, seguimos (fallback muestra todo)
    document.head.appendChild(s);
  }

  function ensureGsap(cb) {
    if (window.gsap && window.ScrollTrigger) return cb();
    loadScript(GSAP_SRC, function () {
      if (window.ScrollTrigger) return cb();
      loadScript(ST_SRC, cb);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { ensureGsap(boot); });
  } else {
    ensureGsap(boot);
  }
})();
