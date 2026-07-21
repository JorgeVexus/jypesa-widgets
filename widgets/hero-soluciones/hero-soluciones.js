(function () {
  // ─── GUARD ───────────────────────────────────────────────────────────────────
  if (window.__JypesaHeroSolucionesWidgetInitialized) return;
  window.__JypesaHeroSolucionesWidgetInitialized = true;

  // ─── CSS ─────────────────────────────────────────────────────────────────────
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@1&family=Rubik:wght@400;500&display=swap');

/* ── CONTENEDOR PRINCIPAL HERO ─────────────────────────────────────────────── */
.jhs-widget {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 1080px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
  background: #0f1e30;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ── IMAGEN DE FONDO ───────────────────────────────────────────────────────── */
.jhs-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.jhs-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transform: scale(1.05);
  transition: transform 2.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.jhs-widget.jhs-ready .jhs-bg img {
  transform: scale(1.0);
}

/* ── OVERLAY SUTIL IZQUIERDA ────────────────────────────────────────────────── */
.jhs-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(15, 30, 48, 0.45) 0%,
    rgba(15, 30, 48, 0.20) 45%,
    rgba(15, 30, 48, 0.0) 80%
  );
  pointer-events: none;
}

/* ── SECCIÓN DE CONTENIDO PRINCIPAL (IZQUIERDA) ─────────────────────────────── */
.jhs-main-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 92px);
  padding-bottom: clamp(60px, 10vh, 120px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* ── BLOQUE DE TÍTULOS ─────────────────────────────────────────────────────── */
.jhs-title-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Espaciado aumentado entre el título principal y la descripción */
  margin-bottom: clamp(32px, 5.5vh, 65px);
}

/* Línea 1: "Creamos productos" */
.jhs-line1 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(32px, 4.3vw, 75px);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
  white-space: nowrap;
  /* Animación entrada desde la izquierda */
  opacity: 0;
  transform: translateX(-70px);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Línea 2: "a la medida" (Serif Italic) */
.jhs-line2 {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(52px, 8.3vw, 150px);
  font-weight: 400;
  font-style: italic;
  color: #ffffff;
  line-height: 0.95;
  letter-spacing: 0.03em;
  margin: 0;
  padding-left: clamp(40px, 8.5vw, 155px);
  margin-top: -0.05em;
  margin-bottom: -0.05em;
  white-space: nowrap;
  /* Animación entrada desde la izquierda */
  opacity: 0;
  transform: translateX(-70px);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Línea 3: "de tu marca" */
.jhs-line3 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(32px, 4.3vw, 75px);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
  white-space: nowrap;
  /* Animación entrada desde la izquierda */
  opacity: 0;
  transform: translateX(-70px);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

/* ── BLOQUE SECUNDARIO: SUBTÍTULO Y BOTONES ────────────────────────────────── */
.jhs-sub-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 575px;
  /* Animación entrada desde la izquierda */
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Descripción con barra lateral izquierda */
.jhs-description-container {
  border-left: 2px solid #ffffff;
  padding: 6px 10px 6px 20px;
  margin-bottom: clamp(20px, 3vh, 34px);
}

.jhs-description {
  font-family: 'Rubik', 'Montserrat', sans-serif;
  font-size: clamp(13px, 1.05vw, 18px);
  font-weight: 400;
  color: #ffffff;
  line-height: 1.35;
  margin: 0;
}

/* ── BOTONES CTA ───────────────────────────────────────────────────────────── */
.jhs-buttons {
  display: flex;
  gap: clamp(12px, 1.8vw, 30px);
  align-items: center;
  flex-wrap: wrap;
}

.jhs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: clamp(11px, 1.4vh, 15px) clamp(16px, 1.3vw, 22px);
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(13px, 1.05vw, 18px);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  white-space: nowrap;
  letter-spacing: 0.04em;
  transition: background 0.22s ease, border-color 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease;
}

/* Botón 1 (Blanco) */
.jhs-btn-primary {
  background: #ffffff;
  color: #506d85;
  border: 2px solid #ffffff;
}

.jhs-btn-primary:hover {
  background: #f0f6fa;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Botón 2 (Transparente con borde blanco) */
.jhs-btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.jhs-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* Icono de flecha en botones */
.jhs-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.jhs-btn:hover .jhs-btn-icon {
  transform: translateX(3px);
}

/* ── MARQUEE DE PARTNERS (AL FONDO DE LA PANTALLA) ────────────────────────── */
.jhs-marquee-row {
  position: absolute;
  bottom: clamp(15px, 3vh, 35px);
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 1s ease;
}

.jhs-marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: clamp(40px, 4.2vw, 75px);
  animation: jhsMarqueeScroll 35s linear infinite;
  will-change: transform;
}

.jhs-marquee-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.25s ease;
}

.jhs-marquee-item:hover {
  opacity: 1;
}

.jhs-marquee-item img {
  height: clamp(24px, 2.5vw, 42px);
  max-width: 130px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
}

@keyframes jhsMarqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── ESTADOS ACTIVOS DE ANIMACIÓN ─────────────────────────────────────────── */
.jhs-widget.jhs-anim-line1 .jhs-line1 {
  opacity: 1;
  transform: translateX(0);
}

.jhs-widget.jhs-anim-line2 .jhs-line2 {
  opacity: 1;
  transform: translateX(0);
}

.jhs-widget.jhs-anim-line3 .jhs-line3 {
  opacity: 1;
  transform: translateX(0);
}

.jhs-widget.jhs-anim-sub .jhs-sub-block {
  opacity: 1;
  transform: translateX(0);
}

.jhs-widget.jhs-anim-marquee .jhs-marquee-row {
  opacity: 1;
}

/* ── RESPONSIVE & ADAPTABILIDAD PARA LAPTOPS PEQUEÑAS ─────────────────────── */
@media (max-height: 780px) and (min-width: 992px) {
  .jhs-main-content {
    padding-bottom: 75px;
  }
  .jhs-title-block {
    margin-bottom: 24px;
  }
  .jhs-description-container {
    margin-bottom: 18px;
  }
}

/* Mobile & Tablet */
@media (max-width: 991px) {
  .jhs-widget {
    height: auto;
    min-height: 100vh;
    padding: 80px 0 60px 0;
  }
  .jhs-main-content {
    padding-bottom: 80px;
  }
  .jhs-line2 {
    padding-left: 20px;
  }
  .jhs-sub-block {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .jhs-line2 {
    padding-left: 10px;
  }
  .jhs-buttons {
    flex-direction: column;
    width: 100%;
  }
  .jhs-btn {
    width: 100%;
  }
}
`;

  // Inyectar CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── ASSETS ──────────────────────────────────────────────────────────────────
  const heroImageUrl = 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5d71d7a5db3796b30d0da4_blur.avif';

  // Logos de fallback para Marquee
  const fallbackLogos = [
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e72767d30050a400a0bcf_elements%2001.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7276ffc51ee72ae73f41_tea%20leaf%2002.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7277d307b0bb54574407_rainforest%2003.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7276abf0ec18d6aaecf4_ayo%2004.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727745701dd685b875ec_cava-logo%2005.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275910f1612b878c54a_biogena_logo%202%2006.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275a1b09e5bf135c618_lavarino_logo%202%2007.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727523c9f6ce77be39cd_dove_logo%202%2008.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275e19e819716d5be2b_tresemme-logo%202%2009.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727573dce274159f2ee3_vervan_logo%202%2010.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275f7c1071d6567dc20_hawaiian-tropic-1-logo-png-transparent%2011.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e72740db3862dc342bed6_FAF_logo%2012.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727481172bebada70930_persea%20logo%2013.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274062c939df35cb162_agavia%20logo%2014.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274910f1612b878c088_Logo-Valquer%202%2015.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274910f1612b878c084_xinu_logo%2016.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274bc85f259d8bfe18c_botanicaromatica%2017.avif'
  ];

  // ─── LEER LOGOS DESDE EL CMS DE WEBFLOW ──────────────────────────────────────
  function readLogosFromCMS() {
    const sourceContainer = document.querySelector(
      '.jypesa-partners-marquee-cms-source, [data-jhs-cms-source]'
    );
    if (!sourceContainer) return null;

    const items = Array.from(sourceContainer.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const logos = [];
    items.forEach(function (item) {
      const img = item.querySelector('.jypesa-partners-marquee-cms-img, [data-jhs-logo-img]');
      if (img) {
        const src = img.getAttribute('src');
        if (src && src.trim() !== '' && !src.includes('placeholder') && src !== '#') {
          logos.push(src);
        }
      }
    });

    return logos.length ? logos : null;
  }

  // ─── GENERAR TRACK DEL MARQUEE INFINITO ──────────────────────────────────────
  function buildMarqueeHtml(logos) {
    let baseList = [...logos];
    while (baseList.length < 14) {
      baseList = baseList.concat(logos);
    }
    const fullList = baseList.concat(baseList);

    return fullList.map(function (src) {
      return `<div class="jhs-marquee-item"><img src="${src}" alt="Partner Logo" loading="lazy"></div>`;
    }).join('');
  }

  // ─── ESTRUCTURA HTML ─────────────────────────────────────────────────────────
  function buildWidgetHtml(marqueeHtml) {
    const svgArrow = `<svg class="jhs-btn-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    // Ruta relativa /contacto para que funcione en cualquier dominio (webflow.io, personalizado, etc.)
    const contactUrl = '/contacto';

    return `
<div class="jhs-widget" id="jhs-inner">

  <!-- Imagen de fondo -->
  <div class="jhs-bg">
    <img src="${heroImageUrl}" alt="Jypesa — Desarrollo Personalizado" loading="eager">
  </div>

  <!-- Overlay sutil izquierda -->
  <div class="jhs-overlay"></div>

  <!-- Contenido Principal -->
  <div class="jhs-main-content">

    <!-- Bloque de Títulos -->
    <div class="jhs-title-block">
      <h1 class="jhs-line1">Creamos productos</h1>
      <span class="jhs-line2">a la medida</span>
      <span class="jhs-line3">de tu marca</span>
    </div>

    <!-- Subtítulo + Botones -->
    <div class="jhs-sub-block">
      <div class="jhs-description-container">
        <p class="jhs-description">
          Desarrollamos amenidades personalizadas desde la conceptualización hasta la producción, alineadas a la identidad y necesidades de cada cliente.
        </p>
      </div>

      <div class="jhs-buttons">
        <a href="${contactUrl}" class="jhs-btn jhs-btn-primary">
          <span>Desarrollar mi proyecto</span>
          ${svgArrow}
        </a>
        <a href="${contactUrl}" class="jhs-btn jhs-btn-secondary">
          <span>Contactar a un asesor</span>
          ${svgArrow}
        </a>
      </div>
    </div>

  </div>

  <!-- Marquee al fondo -->
  <div class="jhs-marquee-row">
    <div class="jhs-marquee-track">
      ${marqueeHtml}
    </div>
  </div>

</div>
`;
  }

  // ─── INICIALIZAR WIDGET ───────────────────────────────────────────────────────
  function initWidget() {
    const target = document.getElementById('jypesa-hero-soluciones-widget') ||
                   document.querySelector('[data-jypesa-hero-soluciones]') ||
                   document.querySelector('.jypesa-hero-soluciones-widget');

    if (!target) {
      console.warn('[JHS] Target element not found. Make sure element with id="jypesa-hero-soluciones-widget" exists.');
      return;
    }

    const cmsLogos = readLogosFromCMS();
    const logos = cmsLogos || fallbackLogos;
    const marqueeHtml = buildMarqueeHtml(logos);

    target.innerHTML = buildWidgetHtml(marqueeHtml);

    const widget = target.querySelector('.jhs-widget');
    if (!widget) return;

    // ── SECUENCIA DE ANIMACIÓN (DE IZQUIERDA A DERECHA) ────────────────────────
    function runAnimation() {
      requestAnimationFrame(function () {
        widget.classList.add('jhs-ready');
      });

      // 1. "Creamos productos" entra de la izquierda
      setTimeout(function () {
        widget.classList.add('jhs-anim-line1');
      }, 150);

      // 2. "a la medida" entra de la izquierda
      setTimeout(function () {
        widget.classList.add('jhs-anim-line2');
      }, 450);

      // 3. "de tu marca" entra de la izquierda
      setTimeout(function () {
        widget.classList.add('jhs-anim-line3');
      }, 750);

      // 4. Subtítulo y botones entran de la izquierda
      setTimeout(function () {
        widget.classList.add('jhs-anim-sub');
      }, 1050);

      // 5. Marquee aparece al fondo
      setTimeout(function () {
        widget.classList.add('jhs-anim-marquee');
      }, 1350);
    }

    // Observer o activación directa
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runAnimation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(widget);
    } else {
      setTimeout(runAnimation, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
