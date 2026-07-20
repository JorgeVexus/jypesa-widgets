(function () {
  if (window.__JypesaCoberturaGlobalWidgetInitialized) return;
  window.__JypesaCoberturaGlobalWidgetInitialized = true;

  /* ==========================================================
     DATOS DE UBICACIONES
     ========================================================== */
  const GROUPS = {
    'Oficinas de representación': {
      color: '#0089C1',
      cities: [
        { name: 'Guadalajara', country: 'México', lat: 20.6597, lon: -103.3496 },
        { name: 'San José', country: 'Costa Rica', lat: 9.9281, lon: -84.0907 },
        { name: 'Cancún', country: 'México', lat: 21.1619, lon: -86.8515 },
        { name: 'Bogotá', country: 'Colombia', lat: 4.7110, lon: -74.0721 },
        { name: 'Punta Cana', country: 'Rep. Dominicana', lat: 18.5601, lon: -68.3725 },
        { name: 'Lima', country: 'Perú', lat: -12.0464, lon: -77.0428 },
        { name: 'Kingston', country: 'Jamaica', lat: 17.9712, lon: -76.7936 },
        { name: 'Santiago', country: 'Chile', lat: -33.4489, lon: -70.6693 },
        { name: 'Las Vegas', country: 'USA', lat: 36.1699, lon: -115.1398 },
        { name: 'Alicante', country: 'España', lat: 38.3452, lon: -0.4810 },
        { name: 'Dallas', country: 'USA', lat: 32.7767, lon: -96.7970 },
        { name: 'Guangzhou', country: 'China', lat: 23.1291, lon: 113.2644 },
        { name: 'Guatemala', country: 'Guatemala', lat: 14.6349, lon: -90.5069 },
        { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
      ],
    },
    'Fábricas Jypesa': {
      color: '#4AA25D',
      cities: [
        { name: 'Guadalajara', country: 'México', lat: 20.6597, lon: -103.3496 },
        { name: 'Toledo', country: 'España', lat: 39.8628, lon: -4.0273 },
        { name: 'Yangzhou', country: 'China', lat: 32.3932, lon: 119.4127 },
      ],
    },
    'Fábricas Asociadas': {
      color: '#FBB31F',
      cities: [
        { name: 'Medellín', country: 'Colombia', lat: 6.2442, lon: -75.5812 },
        { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
        { name: 'Kuala Lumpur', country: 'Malasia', lat: 3.1390, lon: 101.6869 },
      ],
    },
  };

  const GROUP_PRIORITY = ['Oficinas de representación', 'Fábricas Jypesa', 'Fábricas Asociadas'];

  /* ==========================================================
     ESTILOS
     ========================================================== */
  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Rubik:wght@300;400;500;600&display=swap');

.jypesa-cobertura-global-widget {
  --jypesa-cg-bg: #EEF7FA;
  --jypesa-cg-accent-office: #0089C1;
  --jypesa-cg-accent-factory: #4AA25D;
  --jypesa-cg-accent-associated: #FBB31F;
  --jypesa-cg-text-city: #506D85;
}

.jypesa-cobertura-global-widget,
.jypesa-cobertura-global-widget * {
  box-sizing: border-box;
}

.jypesa-cobertura-global-widget {
  background: var(--jypesa-cg-bg);
  font-family: 'Rubik', system-ui, sans-serif;
  color: #1a2e3f;
  width: 100%;
  overflow-x: hidden;
}

.jypesa-cg-header {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  opacity: 0;
  animation: jypesaCgFadeUp 0.7s ease forwards;
}

.jypesa-cg-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px; /* Exactos 50px en desktop */
  font-weight: 500;
  line-height: 1.15;
  color: #506D85;
  margin: 0;
  text-align: left;
}

.jypesa-cg-title-line {
  display: block;
  white-space: nowrap;
}

.jypesa-cg-subtitle {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 400;
  color: #506D85;
  max-width: 671px;
  line-height: 1.35;
  margin: 0;
  text-align: right;
}

@media (max-width: 991px) {
  .jypesa-cg-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 2rem 1.5rem 0;
  }
  .jypesa-cg-title {
    font-size: clamp(20px, 6.2vw, 42px); /* Escala responsiva en pantallas medianas y chicas */
  }
  .jypesa-cg-subtitle {
    max-width: 100%;
    text-align: left;
    font-size: 15px;
  }
}

.jypesa-cg-map-section {
  max-width: 1400px;
  margin: 1.2rem auto 0;
  padding: 0 2rem 3rem;
  position: relative;
  opacity: 0;
  animation: jypesaCgFadeUp 0.7s ease 0.15s forwards;
}

.jypesa-cg-map-wrapper {
  position: relative;
  background: var(--jypesa-cg-bg);
}

.jypesa-cg-world-map-svg {
  display: block;
  width: 100%;
  height: auto;
  background: var(--jypesa-cg-bg);
}

.jypesa-cg-overlay {
  position: absolute;
  bottom: 30px;
  left: 35px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  pointer-events: auto;
}

.jypesa-cg-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jypesa-cg-group-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.jypesa-cg-group-title-wrap {
  display: flex;
  align-items: center;
  gap: 7px;
}

.jypesa-cg-pin,
.jypesa-cg-mob-pin {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.jypesa-cg-group-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  line-height: 1;
}

.jypesa-cg-group-count {
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.jypesa-cg-cities {
  display: flex;
  gap: 28px;
}

.jypesa-cg-cities-col,
.jypesa-cg-cities-single {
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--jypesa-cg-text-city);
}

.jypesa-cg-bottom-row {
  display: flex;
  gap: 24px;
}

.jypesa-cg-group-bottom {
  gap: 3px;
}

.jypesa-cg-tooltip {
  position: fixed;
  display: flex;
  width: 337px;
  max-width: calc(100vw - 32px);
  padding: 14px 15px 40px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  font-family: 'Rubik', sans-serif;
  color: #1a2e3f;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}

.jypesa-cg-tooltip.jypesa-cg-tooltip-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.jypesa-cg-tt-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  text-align: left;
}

.jypesa-cg-tt-title {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a2e3f;
}

.jypesa-cg-tt-category {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 13px;
}

.jypesa-cg-tt-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 13px;
  color: var(--jypesa-cg-text-city);
  line-height: 1.4;
}

.jypesa-cg-tt-pin-icon { width: 14px; height: 14px; flex-shrink: 0; margin-top: 1px; }

.jypesa-cg-mobile { display: none; }

.jypesa-cg-mob-group {
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(0,40,70,0.06);
}

.jypesa-cg-mob-group:last-child { border-bottom: none; }

.jypesa-cg-mob-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 0.5rem;
}

.jypesa-cg-mob-title-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
}

.jypesa-cg-mob-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  line-height: 1;
}

.jypesa-cg-mob-count {
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.jypesa-cg-mob-cities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 12px;
}

.jypesa-cg-mob-city {
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--jypesa-cg-text-city);
}

@keyframes jypesaCgFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .jypesa-cg-header { padding: 1.5rem 1.5rem 0; }
  .jypesa-cg-map-section { padding: 0 1.5rem 2.5rem; }
  .jypesa-cg-overlay { bottom: 14px; left: 14px; padding: 10px 12px 8px; gap: 10px; border-radius: 8px; }
  .jypesa-cg-group-title { font-size: 11px; }
  .jypesa-cg-group-count { font-size: 10px; }
  .jypesa-cg-pin { width: 14px; height: 14px; }
  .jypesa-cg-cities { gap: 12px; }
  .jypesa-cg-cities-col, .jypesa-cg-cities-single { font-size: 8.5px; line-height: 1.5; }
  .jypesa-cg-bottom-row { gap: 14px; }
  .jypesa-cg-group { gap: 3px; }
  .jypesa-cg-overlay { gap: 10px; }
}

@media (max-width: 768px) {
  .jypesa-cg-header { padding: 1.2rem 1rem 0; }
  .jypesa-cg-map-section { padding: 0 1rem 0; }
  .jypesa-cg-overlay { display: none; }
  .jypesa-cg-mobile {
    display: block;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
    background: var(--jypesa-cg-bg);
  }
  .jypesa-cg-mobile-inner {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 0.2rem 1rem 0.5rem;
    border: 1px solid rgba(255,255,255,0.7);
  }
  .jypesa-cg-tooltip { width: 280px; padding: 12px 14px 28px 14px; }
  .jypesa-cg-tt-title { font-size: 14px; }
  .jypesa-cg-tt-category { font-size: 12px; }
  .jypesa-cg-tt-row { font-size: 12px; }
}

@media (max-width: 480px) {
  .jypesa-cg-header { padding: 1rem 0.75rem 0; }
  .jypesa-cg-map-section { padding: 0 0.75rem 0; }
  .jypesa-cg-map-wrapper { border-radius: 8px; overflow: hidden; }
  .jypesa-cg-mobile { padding: 0 0.75rem 1.5rem; }
  .jypesa-cg-mobile-inner { padding: 0.15rem 0.75rem 0.4rem; border-radius: 10px; }
  .jypesa-cg-mob-title { font-size: 13px; }
  .jypesa-cg-mob-count { font-size: 11px; }
  .jypesa-cg-mob-cities { grid-template-columns: 1fr; gap: 0; }
  .jypesa-cg-mob-city { font-size: 10.5px; }
  .jypesa-cg-mob-group { padding: 0.7rem 0; }
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  /* ==========================================================
     ICONO DE PIN (reutilizado en overlay, lista móvil, tooltip
     y marcadores del mapa — mismo diseño en todos lados)
     ========================================================== */
  function pinIconInner(color, maskId) {
    return `<mask id="${maskId}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1" y="-1" width="29" height="29"><rect x="-0.738" y="-0.604" width="28.207" height="28.207" fill="#D9D9D9"/></mask>
      <g mask="url(#${maskId})"><path d="M10.355 21.802c-.687-.249-1.335-.56-1.945-.933a9.1 9.1 0 0 1-1.685-1.33c-.909-.909-1.59-1.935-2.045-3.079-.454-1.144-.681-2.308-.681-3.49 0-1.182.227-2.345.681-3.489.455-1.144 1.136-2.17 2.044-3.079A8.9 8.9 0 0 1 9.803 4.356C10.947 3.902 12.111 3.674 13.293 3.674s2.346.228 3.49.682 2.17 1.136 3.079 2.045 1.58 1.935 2.045 3.079c.454 1.144.681 2.307.681 3.49 0 1.182-.227 2.345-.681 3.489-.454 1.144-1.136 2.17-2.045 3.079a9.1 9.1 0 0 1-1.685 1.33c-.61.373-1.258.684-1.945.933L14.07 25.757c-.165.309-.423.463-.775.463s-.611-.154-.776-.463L10.355 21.802Zm2.939 2.3L14.85 21.232a3.5 3.5 0 0 0 .434-.551c.165-.151.366-.267.603-.348a8.5 8.5 0 0 0 3.573-2.832c1.544-1.544 2.317-3.388 2.317-5.532 0-2.144-.773-3.988-2.317-5.532-1.544-1.544-3.388-2.316-5.532-2.316-2.144 0-3.988.772-5.532 2.316-1.544 1.544-2.316 3.988-2.316 5.532 0 2.144.772 3.988 2.316 5.532.415.415.87.778 1.366 1.089.496.311 1.02.559 1.573.743.231.069.434.183.609.342.175.159.318.345.429.557l1.556 2.87Z" fill="${color}"/></g>
      <path d="M13.5 3.447C8.265 3.447 4.021 7.691 4.021 12.926s4.244 9.479 9.479 9.479 9.479-4.244 9.479-9.479S18.735 3.447 13.5 3.447Zm3.519 3.204c.276.156.546.333.803.527l.127.096-4.031 10.585-.037.008s-.095.02-.3.02-.516-.017-.977-.085l-.088-.013 4.288-11.258.215.12Zm-5.679 7.476-2.598-3.444h1.678l2.618 3.444h-1.698Zm7.247 3.886c-1.358 1.358-3.164 2.106-5.087 2.106s-3.727-.748-5.086-2.106c-1.358-1.358-2.106-3.165-2.106-5.086 0-1.921.748-3.727 2.106-5.087 1.358-1.358 3.166-2.106 5.086-2.106.6 0 1.365.11 2.044.295l.078.022-.525 1.24-.059-.016c-.498-.136-1.016-.204-1.538-.204-3.229 0-5.856 2.627-5.856 5.856 0 3.229 2.627 5.856 5.856 5.856s5.856-2.627 5.856-5.856c0-1.252-.39-2.447-1.129-3.456l-.025-.034.658-1.342.24.32c1.041 1.287 1.591 2.847 1.591 4.513 0 1.921-.748 3.727-2.106 5.087Z" fill="${color}"/>`;
  }

  function pinSvg(color, maskId, cls) {
    return `<svg class="${cls}" width="16" height="16" viewBox="0 0 27 27" fill="none">${pinIconInner(color, maskId)}</svg>`;
  }

  /* Proporciones del ícono (viewBox 27x27): centro del círculo superior
     y su radio, usados para anclar el pulso/badge de los marcadores. */
  const PIN_HEAD_OFFSET_RATIO = 1 - 12.926 / 27;
  const PIN_HEAD_RADIUS_RATIO = 9.479 / 27;

  /* ==========================================================
     MARKUP DEL WIDGET
     ========================================================== */
  function buildWidgetHtml() {
    return `
<div class="jypesa-cg-header">
  <h1 class="jypesa-cg-title">
    <span class="jypesa-cg-title-line">Cobertura estratégica</span>
    <span class="jypesa-cg-title-line">y distribución eficiente</span>
  </h1>
  <p class="jypesa-cg-subtitle">Integramos producción, operación y distribución para asegurar cobertura, rapidez y consistencia en cada entrega, donde sea que nos necesites.</p>
</div>

<div class="jypesa-cg-map-section">
  <div class="jypesa-cg-map-wrapper">
    <svg class="jypesa-cg-world-map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet"></svg>

    <div class="jypesa-cg-overlay">
      <div class="jypesa-cg-group">
        <div class="jypesa-cg-group-header">
          <div class="jypesa-cg-group-title-wrap">
            ${pinSvg('#0089C1', 'jypesa-cg-mask-office', 'jypesa-cg-pin')}
            <span class="jypesa-cg-group-title" style="color: #0089C1;">Oficinas de representación</span>
          </div>
          <span class="jypesa-cg-group-count" style="color: #0089C1;">14</span>
        </div>
        <div class="jypesa-cg-cities">
          <div class="jypesa-cg-cities-col">
            Guadalajara, México<br>
            Cancún, México<br>
            Punta Cana, RD<br>
            Kingston, Jamaica<br>
            Las Vegas, USA<br>
            Dallas, USA<br>
            Guatemala, Guatemala
          </div>
          <div class="jypesa-cg-cities-col">
            San José, Costa Rica<br>
            Bogotá, Colombia<br>
            Lima, Perú<br>
            Santiago, Chile<br>
            Alicante, España<br>
            Guangzhou, China<br>
            Sydney, Australia
          </div>
        </div>
      </div>

      <div class="jypesa-cg-bottom-row">
        <div class="jypesa-cg-group jypesa-cg-group-bottom">
          <div class="jypesa-cg-group-header">
            <div class="jypesa-cg-group-title-wrap">
              ${pinSvg('#4AA25D', 'jypesa-cg-mask-factory', 'jypesa-cg-pin')}
              <span class="jypesa-cg-group-title" style="color: #4AA25D;">Fábricas Jypesa</span>
            </div>
            <span class="jypesa-cg-group-count" style="color: #4AA25D;">3</span>
          </div>
          <div class="jypesa-cg-cities-single">
            Guadalajara, México<br>
            Toledo, España<br>
            Yangzhou, China
          </div>
        </div>

        <div class="jypesa-cg-group jypesa-cg-group-bottom">
          <div class="jypesa-cg-group-header">
            <div class="jypesa-cg-group-title-wrap">
              ${pinSvg('#FBB31F', 'jypesa-cg-mask-associated', 'jypesa-cg-pin')}
              <span class="jypesa-cg-group-title" style="color: #F9B623;">Fábricas Asociadas</span>
            </div>
            <span class="jypesa-cg-group-count" style="color: #FFC107;">3</span>
          </div>
          <div class="jypesa-cg-cities-single">
            Medellín, Colombia<br>
            Buenos Aires, Argentina<br>
            Kuala Lumpur, Malasia
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="jypesa-cg-mobile">
  <div class="jypesa-cg-mobile-inner">
    <div class="jypesa-cg-mob-group">
      <div class="jypesa-cg-mob-header">
        <div class="jypesa-cg-mob-title-wrap">
          ${pinSvg('#0089C1', 'jypesa-cg-mask-office-m', 'jypesa-cg-mob-pin')}
          <span class="jypesa-cg-mob-title" style="color: #0089C1;">Oficinas de representación</span>
        </div>
        <span class="jypesa-cg-mob-count" style="color: #0089C1;">14</span>
      </div>
      <div class="jypesa-cg-mob-cities">
        <span class="jypesa-cg-mob-city">Guadalajara, México</span>
        <span class="jypesa-cg-mob-city">San José, Costa Rica</span>
        <span class="jypesa-cg-mob-city">Cancún, México</span>
        <span class="jypesa-cg-mob-city">Bogotá, Colombia</span>
        <span class="jypesa-cg-mob-city">Punta Cana, RD</span>
        <span class="jypesa-cg-mob-city">Lima, Perú</span>
        <span class="jypesa-cg-mob-city">Kingston, Jamaica</span>
        <span class="jypesa-cg-mob-city">Santiago, Chile</span>
        <span class="jypesa-cg-mob-city">Las Vegas, USA</span>
        <span class="jypesa-cg-mob-city">Alicante, España</span>
        <span class="jypesa-cg-mob-city">Dallas, USA</span>
        <span class="jypesa-cg-mob-city">Guangzhou, China</span>
        <span class="jypesa-cg-mob-city">Guatemala, Guatemala</span>
        <span class="jypesa-cg-mob-city">Sydney, Australia</span>
      </div>
    </div>

    <div class="jypesa-cg-mob-group">
      <div class="jypesa-cg-mob-header">
        <div class="jypesa-cg-mob-title-wrap">
          ${pinSvg('#4AA25D', 'jypesa-cg-mask-factory-m', 'jypesa-cg-mob-pin')}
          <span class="jypesa-cg-mob-title" style="color: #4AA25D;">Fábricas Jypesa</span>
        </div>
        <span class="jypesa-cg-mob-count" style="color: #4AA25D;">3</span>
      </div>
      <div class="jypesa-cg-mob-cities">
        <span class="jypesa-cg-mob-city">Guadalajara, México</span>
        <span class="jypesa-cg-mob-city">Toledo, España</span>
        <span class="jypesa-cg-mob-city">Yangzhou, China</span>
      </div>
    </div>

    <div class="jypesa-cg-mob-group">
      <div class="jypesa-cg-mob-header">
        <div class="jypesa-cg-mob-title-wrap">
          ${pinSvg('#FBB31F', 'jypesa-cg-mask-associated-m', 'jypesa-cg-mob-pin')}
          <span class="jypesa-cg-mob-title" style="color: #F9B623;">Fábricas Asociadas</span>
        </div>
        <span class="jypesa-cg-mob-count" style="color: #FFC107;">3</span>
      </div>
      <div class="jypesa-cg-mob-cities">
        <span class="jypesa-cg-mob-city">Medellín, Colombia</span>
        <span class="jypesa-cg-mob-city">Buenos Aires, Argentina</span>
        <span class="jypesa-cg-mob-city">Kuala Lumpur, Malasia</span>
      </div>
    </div>
  </div>
</div>
`;
  }

  /* ==========================================================
     CARGA DINÁMICA DE D3 + TOPOJSON
     ========================================================== */
  function loadScriptOnce(src, marker, callback) {
    if (window[marker]) { callback(); return; }
    let script = document.querySelector(`script[data-jypesa-cg="${marker}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.setAttribute('data-jypesa-cg', marker);
      document.head.appendChild(script);
    }
    script.addEventListener('load', callback, { once: true });
    if (window[marker]) callback();
  }

  function loadMapLibs(callback) {
    if (window.d3 && window.topojson) { callback(); return; }
    loadScriptOnce('https://d3js.org/d3.v7.min.js', 'd3', function () {
      loadScriptOnce('https://cdn.jsdelivr.net/npm/topojson@3.0.2/dist/topojson.min.js', 'topojson', callback);
    });
  }

  /* ==========================================================
     RENDER DEL MAPA
     ========================================================== */
  function renderMap(target) {
    const locMap = new Map();
    Object.keys(GROUPS).forEach(function (groupName) {
      const groupInfo = GROUPS[groupName];
      groupInfo.cities.forEach(function (c) {
        const key = c.lat.toFixed(4) + ',' + c.lon.toFixed(4);
        if (!locMap.has(key)) {
          locMap.set(key, { name: c.name, country: c.country, lat: c.lat, lon: c.lon, groups: [{ name: groupName, color: groupInfo.color }] });
        } else {
          const entry = locMap.get(key);
          if (!entry.groups.some(function (g) { return g.name === groupName; })) entry.groups.push({ name: groupName, color: groupInfo.color });
        }
      });
    });
    const markers = Array.from(locMap.values());

    const W = 1000, H = 500;
    const projection = d3.geoNaturalEarth1().scale(170).translate([W / 2, H / 2 + 10]);
    const pathGen = d3.geoPath().projection(projection);
    const svgEl = target.querySelector('.jypesa-cg-world-map-svg');
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const glow = defs.append('filter').attr('id', 'jypesa-cg-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    glow.append('feGaussianBlur').attr('stdDeviation', '3.5').attr('result', 'b');
    glow.append('feMerge').selectAll('feMergeNode').data(['b', 'SourceGraphic']).enter().append('feMergeNode').attr('in', function (d) { return d; });

    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#EEF7FA');

    const mapG = svg.append('g');

    let tt = document.querySelector('.jypesa-cg-tooltip');
    if (!tt) {
      tt = document.createElement('div');
      tt.className = 'jypesa-cg-tooltip';
      document.body.appendChild(tt);
    }

    function showTT(ev, m) {
      const sorted = [...m.groups].sort(function (a, b) { return GROUP_PRIORITY.indexOf(a.name) - GROUP_PRIORITY.indexOf(b.name); });
      const primary = sorted[0];
      const categoryLine = sorted.map(function (gr) { return gr.name; }).join(' · ');
      tt.innerHTML = `
        <div class="jypesa-cg-tt-inner">
          <div class="jypesa-cg-tt-title">${m.name}, ${m.country}</div>
          <div class="jypesa-cg-tt-category" style="color: ${primary.color};">${categoryLine}</div>
          <div class="jypesa-cg-tt-row">
            ${pinSvg('#506D85', 'jypesa-cg-mask-tt-pin', 'jypesa-cg-tt-pin-icon')}
            <span>${m.lat.toFixed(3)}°, ${m.lon.toFixed(3)}°</span>
          </div>
        </div>
      `;
      posTT(ev);
      tt.classList.add('jypesa-cg-tooltip-visible');
    }

    function posTT(ev) {
      let x = ev.clientX + 14, y = ev.clientY - 16;
      const tw = tt.offsetWidth, th = tt.offsetHeight;
      if (x + tw > window.innerWidth - 10) x = ev.clientX - tw - 14;
      if (y + th > window.innerHeight - 10) y = window.innerHeight - th - 10;
      if (y < 10) y = 10;
      tt.style.left = x + 'px';
      tt.style.top = y + 'px';
    }

    function hideTT() { tt.classList.remove('jypesa-cg-tooltip-visible'); }

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json').then(function (wd) {
      const countries = topojson.feature(wd, wd.objects.countries);
      const filtered = {
        type: 'FeatureCollection',
        features: countries.features.filter(function (f) {
          const n = f.properties && f.properties.name;
          return !(n && n.toLowerCase().indexOf('antarctica') !== -1);
        }),
      };

      mapG.selectAll('.jypesa-cg-country').data(filtered.features).enter().append('path')
        .attr('class', 'jypesa-cg-country')
        .attr('d', function (d) { return pathGen(d); })
        .attr('fill', '#7BAAC4')
        .attr('stroke', '#5E97B5')
        .attr('stroke-width', 0.4)
        .attr('stroke-linejoin', 'round');

      mapG.append('path').datum(d3.geoGraticule().step([20, 20]))
        .attr('d', pathGen)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.07)')
        .attr('stroke-width', 0.4);

      const mg = svg.append('g');
      const PIN_SIZE = 20;
      const headY = -PIN_SIZE * PIN_HEAD_OFFSET_RATIO;
      const headR = PIN_SIZE * PIN_HEAD_RADIUS_RATIO;

      markers.forEach(function (m, i) {
        const coords = projection([m.lon, m.lat]);
        if (!coords || isNaN(coords[0])) return;

        const sorted = [...m.groups].sort(function (a, b) { return GROUP_PRIORITY.indexOf(a.name) - GROUP_PRIORITY.indexOf(b.name); });
        const primary = sorted[0];
        const secondary = sorted.length > 1 ? sorted[1] : null;
        const maskId = 'jypesa-cg-mask-marker-' + i;

        const g = mg.append('g')
          .attr('class', 'jypesa-cg-marker')
          .attr('transform', 'translate(' + coords[0] + ',' + coords[1] + ')')
          .style('cursor', 'pointer');

        // Área de hover invisible y estable: el ícono real (con máscara + filtro
        // de glow animados) tiene bordes que parpadean al hacer hit-testing pixel
        // a pixel, así que el mouseenter/leave se ancla a esta forma fija en vez.
        g.append('circle')
          .attr('class', 'jypesa-cg-hit-area')
          .attr('cx', 0).attr('cy', headY).attr('r', PIN_SIZE * 0.62)
          .attr('fill', 'transparent');

        // Anillo de pulso, centrado en la cabeza del pin (mismo ícono que overlay/tooltip)
        g.append('circle')
          .attr('class', 'jypesa-cg-pulse-ring')
          .attr('cx', 0).attr('cy', headY).attr('r', headR)
          .attr('fill', 'none').attr('stroke', primary.color).attr('stroke-width', 1).attr('opacity', 0);

        // El pin se ancla por su punta en (0,0), que coincide con las coordenadas geográficas
        const iconG = g.append('g').attr('class', 'jypesa-cg-pin-icon');

        iconG.append('svg')
          .attr('x', -PIN_SIZE / 2).attr('y', -PIN_SIZE)
          .attr('width', PIN_SIZE).attr('height', PIN_SIZE)
          .attr('viewBox', '0 0 27 27')
          .html(pinIconInner(primary.color, maskId));

        if (secondary) {
          iconG.append('circle')
            .attr('class', 'jypesa-cg-marker-badge')
            .attr('cx', headR * 0.72).attr('cy', headY - headR * 0.6).attr('r', PIN_SIZE * 0.14)
            .attr('fill', secondary.color).attr('stroke', '#fff').attr('stroke-width', 1.2);
        }

        function handleEnter(ev) {
          showTT(ev, m);
          iconG.transition().duration(160).attr('transform', 'scale(1.35)').attr('filter', 'url(#jypesa-cg-glow)');
          g.select('.jypesa-cg-pulse-ring').transition().duration(160).attr('r', headR * 1.5).attr('opacity', 0.35);
        }

        function handleLeave() {
          hideTT();
          iconG.transition().duration(180).attr('transform', 'scale(1)').attr('filter', null);
          g.select('.jypesa-cg-pulse-ring').transition().duration(180).attr('r', headR).attr('opacity', 0);
        }

        g.on('mouseenter', handleEnter);
        g.on('mousemove', function (ev) { posTT(ev); });
        g.on('mouseleave', handleLeave);

        g.on('touchstart', function (ev) {
          ev.preventDefault();
          const touch = ev.touches[0];
          handleEnter({ clientX: touch.clientX, clientY: touch.clientY });
        });

        g.attr('opacity', 0).transition().delay(300 + i * 55).duration(450).attr('opacity', 1);
      });
    }).catch(function (err) { console.error('[jypesa-cobertura-global] error cargando mapa:', err); });

    window.addEventListener('scroll', hideTT);
    window.addEventListener('resize', hideTT);
    document.addEventListener('touchstart', function (ev) {
      if (!ev.target.closest('.jypesa-cg-marker') && !ev.target.closest('.jypesa-cg-tooltip')) {
        hideTT();
      }
    });
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function initCoberturaGlobalWidget() {
    const target = document.getElementById('jypesa-cobertura-global-widget') || document.querySelector('[data-jypesa-cobertura-global-widget]');
    if (!target) return;

    target.classList.add('jypesa-cobertura-global-widget');
    target.innerHTML = buildWidgetHtml();

    loadMapLibs(function () { renderMap(target); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoberturaGlobalWidget);
  } else {
    initCoberturaGlobalWidget();
  }
})();
