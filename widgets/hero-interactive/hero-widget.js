(function() {
  // Guard against multiple initializations
  if (window.__JypesaHeroWidgetInitialized) return;
  window.__JypesaHeroWidgetInitialized = true;

  // CSS Styles Bundle
  const cssStyles = `
/* Importación de fuentes */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Instrument+Serif:ital@1&family=Rubik:wght@400;500&display=swap');

:root {
  --jypesa-primary: #506D85;
  --jypesa-blue: #0088BD;
  --jypesa-green: #4AA25D;
  --jypesa-light-blue: #48A9C5;
  --jypesa-teal: #9EF4F5;
  --jypesa-bg-light: #EEF7FA;
  --jypesa-text-muted: rgba(80, 109, 133, 0.8);
  --jypesa-gradient-flow: linear-gradient(to right, #48A9C5 0%, #0088BD 33%, #9EF4F5 66%, #48A9C5 100%);
  --jypesa-overlay: rgba(80, 109, 133, 0.25);
  --jypesa-kpis-bg: transparent;
  --jypesa-kpis-text: #506D85;
  --jypesa-kpis-text-muted: rgba(80, 109, 133, 0.8);
}

/* Contenedor Principal */
.jypesa-hero-widget {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 750px;
  max-height: 1080px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  background-color: transparent;
  box-sizing: border-box;
}

/* ==========================================================================
   FASE 1 & 2: Sección Superior (Hero con Imagen y Logotipo Central)
   ========================================================================== */
.jypesa-hero-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  transition: height 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.jypesa-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.jypesa-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.jypesa-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--jypesa-overlay);
  z-index: 2;
  transition: background 1.2s ease;
}

/* Contenedor del Texto & Logo Central */
.jypesa-hero-center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 90%;
  max-width: 480px;
  pointer-events: none;
  transition: top 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Contenedor del Logotipo Jypesa */
.jypesa-hero-logo-wrapper {
  overflow: hidden;
  height: auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.jypesa-hero-logo-svg {
  width: 100%;
  height: auto;
  display: block;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Contenedor del Texto "Sobre" */
.jypesa-hero-sobre-wrapper {
  position: absolute;
  bottom: calc(100% - 8px);
  right: 73%;
  width: 300px;
  height: 110px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.jypesa-hero-sobre {
  font-family: 'Instrument Serif', serif;
  font-size: 100px;
  font-style: italic;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.9;
  margin: 0;
  white-space: nowrap;
  text-align: right;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* ==========================================================================
   MARQUEE (Sobre la Imagen del Hero, posicionado flotando arriba del bottom)
   ========================================================================== */
.jypesa-marquee-row {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  height: 90px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  display: flex;
  align-items: center;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.jypesa-marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}

.jypesa-marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 140px;
  animation: jypesaMarquee 25s linear infinite;
}

.jypesa-marquee-logo {
  height: 52px;
  max-width: 180px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.jypesa-marquee-logo:hover {
  opacity: 1;
}

@keyframes jypesaMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ==========================================================================
   FASE 3: Panel Inferior (KPIs Transparentes)
   ========================================================================== */
.jypesa-hero-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35%;
  min-height: 250px;
  background-color: var(--jypesa-kpis-bg);
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.jypesa-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.jypesa-stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease;
}

.jypesa-stat-number-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 8px;
}

.jypesa-stat-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 64px;
  font-weight: 700;
  line-height: 0.9;
  background: var(--jypesa-gradient-flow);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: flowRight 8s linear infinite;
  margin-right: 8px;
  letter-spacing: -2px;
}

.jypesa-stat-suffix {
  font-family: 'Instrument Serif', serif;
  font-size: 26px;
  font-style: italic;
  color: var(--jypesa-kpis-text);
  opacity: 0.9;
}

.jypesa-stat-heading {
  font-family: 'Rubik', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: var(--jypesa-kpis-text);
  margin-bottom: 6px;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.jypesa-stat-description {
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--jypesa-kpis-text-muted);
  max-width: 260px;
  margin: 0 auto;
}

@keyframes flowRight {
  0% { background-position: 300% center; }
  100% { background-position: 0% center; }
}

/* ESTADOS DE ANIMACIÓN */
.jypesa-hero-widget.phase-1 .jypesa-hero-bg img {
  transform: scale(1.0);
}

.jypesa-hero-widget.phase-2 .jypesa-hero-sobre {
  transform: translateY(0);
  opacity: 1;
}

.jypesa-hero-widget.phase-2 .jypesa-hero-logo-svg {
  transform: translateY(0);
  opacity: 1;
}

.jypesa-hero-widget.phase-3 .jypesa-hero-top {
  height: 65%;
}

.jypesa-hero-widget.phase-3 .jypesa-marquee-row {
  opacity: 1;
  transform: translateY(0);
}

.jypesa-hero-widget.phase-3 .jypesa-hero-bottom {
  transform: translateY(0);
}

.jypesa-hero-widget.phase-3 .jypesa-stat-block {
  opacity: 1;
  transform: translateY(0);
}

.jypesa-hero-widget.phase-3 .jypesa-stat-block:nth-child(1) { transition-delay: 0.2s; }
.jypesa-hero-widget.phase-3 .jypesa-stat-block:nth-child(2) { transition-delay: 0.35s; }
.jypesa-hero-widget.phase-3 .jypesa-stat-block:nth-child(3) { transition-delay: 0.5s; }
.jypesa-hero-widget.phase-3 .jypesa-stat-block:nth-child(4) { transition-delay: 0.65s; }

/* ADAPTABILIDAD */
@media (max-width: 1200px) {
  .jypesa-hero-center-content { max-width: 400px; }
  .jypesa-hero-sobre { font-size: 80px; }
  .jypesa-hero-sobre-wrapper { height: 90px; }
  .jypesa-stat-number { font-size: 52px; }
  .jypesa-stat-suffix { font-size: 22px; }
  .jypesa-stat-heading { font-size: 16px; }
  .jypesa-marquee-logo { height: 44px; }
}

@media (max-width: 991px) {
  .jypesa-hero-widget {
    height: auto;
    min-height: auto;
    max-height: none;
    display: flex;
    flex-direction: column;
  }

  .jypesa-hero-top {
    position: relative;
    height: 60vh;
    min-height: 450px;
    width: 100%;
  }

  .jypesa-hero-widget.phase-3 .jypesa-hero-top {
    height: 50vh;
    min-height: 400px;
  }

  .jypesa-hero-bottom {
    position: relative;
    height: auto;
    min-height: auto;
    width: 100%;
    transform: translateY(0);
    padding: 40px 20px;
  }

  .jypesa-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 30px;
  }
  
  .jypesa-marquee-row {
    position: absolute;
    bottom: 20px;
    height: 70px;
  }
  .jypesa-marquee-logo { height: 38px; }
}

@media (max-width: 768px) {
  .jypesa-hero-center-content { max-width: 320px; }
  .jypesa-hero-sobre { font-size: 64px; }
  .jypesa-hero-sobre-wrapper { height: 75px; }
}

@media (max-width: 480px) {
  .jypesa-hero-top {
    height: 50vh;
    min-height: 350px;
  }

  .jypesa-hero-widget.phase-3 .jypesa-hero-top {
    height: 45vh;
    min-height: 300px;
  }

  /* Logotipo y "Sobre" más chicos en Celular */
  .jypesa-hero-center-content {
    max-width: 250px;
  }
  .jypesa-hero-sobre {
    font-size: 48px;
  }
  .jypesa-hero-sobre-wrapper {
    height: 50px;
    bottom: calc(100% - 4px);
  }

  .jypesa-stats-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 35px;
  }

  .jypesa-stat-block {
    align-items: center;
    text-align: center;
  }

  .jypesa-stat-number-wrapper {
    justify-content: center;
  }

  .jypesa-stat-description {
    max-width: 100%;
  }

  .jypesa-marquee-row {
    bottom: 15px;
    height: 60px;
  }
  
  .jypesa-marquee-track {
    gap: 70px;
  }

  .jypesa-marquee-logo {
    height: 32px;
  }
}
`;

  // Inject Stylesheet into head
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(cssStyles));
  document.head.appendChild(styleEl);

  // Asset URLs
  const heroImage = "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4d5d430c17b94a5ca3d29d_Nosotros%20jypesa.avif";
  const logoJypesaSvgUrl = "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a441a5d045393e9bab3f309_logo%20jypesa%20svg.svg";
  
  const partnerLogos = [
    "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e6752a58ed8b5d08cbf6a0_elements%20logo.png",
    "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e6752a9f06958f5bf74dc2_almond%20love%20logo.png",
    "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e6752abd0edae1b3d5e515_cava%20logo.png",
    "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e6752a5224c1d521102b00_lavarino%20logo.png",
    "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e6752a9dbc83cacdba36f6_Biogena%20logo.png"
  ];

  // Helper to build logo marquee HTML
  function getMarqueeHtml() {
    const tripleLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];
    return tripleLogos.map(logoUrl => `
      <img src="${logoUrl}" class="jypesa-marquee-logo" alt="Partner Logo" loading="lazy" />
    `).join('');
  }

  // HTML Structure
  const widgetHtml = `
<div class="jypesa-hero-widget">
  <!-- Sección Superior: Imagen Hero con Texto, Logo centralizado y Marquee overlay -->
  <div class="jypesa-hero-top">
    <div class="jypesa-hero-bg">
      <img src="${heroImage}" alt="Nosotros Jypesa Hero" />
    </div>
    <div class="jypesa-hero-overlay"></div>
    <div class="jypesa-hero-center-content">
      <div class="jypesa-hero-sobre-wrapper">
        <p class="jypesa-hero-sobre">Sobre</p>
      </div>
      <div class="jypesa-hero-logo-wrapper">
        <img src="${logoJypesaSvgUrl}" class="jypesa-hero-logo-svg" alt="Jypesa Logo" />
      </div>
    </div>
    
    <!-- Fila del Marquee (Sobre la imagen, en el fondo del contenedor superior) -->
    <div class="jypesa-marquee-row">
      <div class="jypesa-marquee-container">
        <div class="jypesa-marquee-track">
          ${getMarqueeHtml()}
        </div>
      </div>
    </div>
  </div>

  <!-- Sección Inferior: KPIs (Fondo Transparente) -->
  <div class="jypesa-hero-bottom">
    <div class="jypesa-stats-grid">
      <!-- Bloque 1 -->
      <div class="jypesa-stat-block">
        <div class="jypesa-stat-number-wrapper">
          <span class="jypesa-stat-number">+50</span>
          <span class="jypesa-stat-suffix">años</span>
        </div>
        <div class="jypesa-stat-heading">De experiencia en hospitalidad</div>
        <div class="jypesa-stat-description">Soluciones de amenidades y cuidado personal para la hotelería.</div>
      </div>

      <!-- Bloque 2 -->
      <div class="jypesa-stat-block">
        <div class="jypesa-stat-number-wrapper">
          <span class="jypesa-stat-number">+21</span>
          <span class="jypesa-stat-suffix">países</span>
        </div>
        <div class="jypesa-stat-heading">Con presencia internacional</div>
        <div class="jypesa-stat-description">Más de 30 países atendidos en Norteamérica, Latinoamérica y EMEA.</div>
      </div>

      <!-- Bloque 3 -->
      <div class="jypesa-stat-block">
        <div class="jypesa-stat-number-wrapper">
          <span class="jypesa-stat-number">7,000</span>
          <span class="jypesa-stat-suffix">m²</span>
        </div>
        <div class="jypesa-stat-heading">De infraestructura operativa</div>
        <div class="jypesa-stat-description">Logística diseñada para garantizar abastecimiento continuo.</div>
      </div>

      <!-- Bloque 4 -->
      <div class="jypesa-stat-block">
        <div class="jypesa-stat-number-wrapper">
          <span class="jypesa-stat-number">3</span>
          <span class="jypesa-stat-suffix">continentes</span>
        </div>
        <div class="jypesa-stat-heading">Alcance global</div>
        <div class="jypesa-stat-description">Desde donde hacemos posible nuestra producción y distribución.</div>
      </div>
    </div>
  </div>
</div>
`;

  // Find target container and inject
  function initWidget() {
    const target = document.getElementById('jypesa-hero-widget') || document.querySelector('[data-jypesa-hero-widget]');
    if (!target) {
      console.warn("Jypesa Hero Widget target element not found. Make sure an element with ID 'jypesa-hero-widget' exists on the page.");
      return;
    }

    target.innerHTML = widgetHtml;
    const widgetContainer = target.querySelector('.jypesa-hero-widget');

    // Run 3-phase animations
    
    // Fase 1: Entrada inicial (imagen a pantalla completa)
    setTimeout(() => {
      widgetContainer.classList.add('phase-1');
    }, 50);

    // Fase 2: Aparece "Sobre" y el logotipo central
    setTimeout(() => {
      widgetContainer.classList.add('phase-2');
    }, 600);

    // Fase 3: La imagen se encoge revelando logos y KPIs
    setTimeout(() => {
      widgetContainer.classList.add('phase-3');
    }, 2800);
  }

  // Load widget on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
