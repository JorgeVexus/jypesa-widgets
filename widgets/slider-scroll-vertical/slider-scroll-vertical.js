(function () {
  // Evitar doble inicialización
  if (window.__JypesaSustentabilidadScrollWidgetInitialized) return;
  window.__JypesaSustentabilidadScrollWidgetInitialized = true;

  // ─── 1. INYECCIÓN DE FUENTES Y CSS ─────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const css = `
  /* ── VARIABLES & BASICS ── */
  :root {
    --jypesa-sust-bg: #74C87D;
    --jypesa-sust-text: #ffffff;
    --jypesa-sust-slate: #506D85;
  }

  .jypesa-sust-widget * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .jypesa-sust-widget {
    width: 100%;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-sust-text);
    background-color: var(--jypesa-sust-bg);
  }

  /* ── DESKTOP SCROLL SECTION (>= 992px) ── */
  .jypesa-sust-desktop-wrapper {
    display: none;
    position: relative;
    width: 100%;
    height: 400vh; /* 4 slides * 100vh */
  }

  .jypesa-sust-desktop-sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    background-color: var(--jypesa-sust-bg);
  }

  /* COLUMNA IZQUIERDA (TEXTOS E INFO STATIC/DYNAMIC) */
  .jypesa-sust-desktop-left {
    width: 45%;
    height: 100vh;
    padding: 6vh 6vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 10;
  }

  .jypesa-sust-left-top {
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: flex-start;
  }

  .jypesa-sust-destacable {
    border-bottom: 2px solid var(--jypesa-sust-text);
    padding-bottom: 10px;
    width: 71px; /* Ancho fijo para cubrir solo las primeras 6 letras */
    overflow: visible;
  }

  .jypesa-sust-destacable p {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 18px; /* Reducido a 18px */
    letter-spacing: 1.05px;
    color: var(--jypesa-sust-text);
    white-space: nowrap; /* Evita que el texto salte de línea debido al ancho de 71px */
  }

  .jypesa-sust-main-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 75px;
    line-height: 1;
    color: var(--jypesa-sust-text);
  }

  .jypesa-sust-intro-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.45;
    color: var(--jypesa-sust-text);
    max-width: 570px;
  }

  /* BOTÓN EXPLORAR/SABER MÁS */
  .jypesa-sust-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #ffffff;
    color: var(--jypesa-sust-slate);
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.9px;
    padding: 15px 30px;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  }

  .jypesa-sust-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }

  .jypesa-sust-btn svg {
    transition: transform 0.3s ease;
  }

  .jypesa-sust-btn:hover svg {
    transform: translateX(3px);
  }

  /* HORIZONTAL DIVIDER */
  .jypesa-sust-divider {
    width: 228px;
    height: 1px;
    background-color: var(--jypesa-sust-text);
    margin: 75px 0;
    transition: opacity 0.5s ease;
    opacity: 0;
  }

  .jypesa-sust-divider.visible {
    opacity: 1;
  }

  /* DYNAMIC TEXT CONTAINER (BOTTOM LEFT) */
  .jypesa-sust-desktop-bottom {
    position: relative;
    height: 280px; /* Altura fija estable en desktop */
    width: 100%;
  }

  .jypesa-sust-slide-text-block {
    position: absolute;
    top: 0; /* Alinear arriba para mantener un espacio reducido y consistente con el divisor */
    left: 0;
    width: 100%;
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
    transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    flex-direction: column;
    gap: 15px; /* Reducir gap para un look más compacto y limpio */
    align-items: flex-start;
  }

  .jypesa-sust-slide-text-block.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .jypesa-sust-slide-index {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 28px;
    line-height: 1;
    color: var(--jypesa-sust-text);
  }

  .jypesa-sust-slide-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 50px;
    line-height: 1.1;
    color: var(--jypesa-sust-text);
  }

  .jypesa-sust-slide-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.45;
    color: var(--jypesa-sust-text);
    max-width: 590px;
  }

  .jypesa-sust-slide-logo {
    height: 75px;
    max-width: 250px;
    object-fit: contain;
    display: block;
    margin-bottom: 5px;
  }

  /* CERTIFICATIONS IMAGE */
  .jypesa-sust-certs-img {
    height: 45px;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin-top: 15px;
    opacity: 0.95;
    transition: opacity 0.3s ease;
  }

  .jypesa-sust-certs-img:hover {
    opacity: 1;
  }

  .jypesa-sust-certs-img-mobile {
    height: 38px;
    max-width: 100%;
    object-fit: contain;
    display: block;
    margin-top: 10px;
  }

  /* COLUMNA DERECHA (IMÁGENES APILADAS) */
  .jypesa-sust-desktop-right {
    width: 55%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .jypesa-sust-img-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    will-change: transform;
    /* Las capas superiores se apilan */
    transform: translateY(100%);
  }

  .jypesa-sust-img-layer:first-child {
    transform: translateY(0); /* La primera está visible por defecto */
    z-index: 1;
  }
  .jypesa-sust-img-layer:nth-child(2) { z-index: 2; }
  .jypesa-sust-img-layer:nth-child(3) { z-index: 3; }
  .jypesa-sust-img-layer:nth-child(4) { z-index: 4; }

  .jypesa-sust-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Barra de scroll de fantasía removida */


  /* ── MOBILE SCROLL/SWIPE CAROUSEL (< 992px) ── */
  .jypesa-sust-mobile-wrapper {
    display: block;
    width: 100%;
    padding: 40px 16px;
    background-color: var(--jypesa-sust-bg);
  }

  .jypesa-sust-mobile-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 30px;
  }

  .jypesa-sust-mobile-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: clamp(30px, 8vw, 44px);
    line-height: 1.1;
    color: var(--jypesa-sust-text);
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* TRACK & SLIDES */
  .jypesa-sust-mobile-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 10px;
    user-select: none;
    -webkit-user-select: none;
  }

  .jypesa-sust-mobile-track::-webkit-scrollbar {
    display: none;
  }

  .jypesa-sust-mobile-slide {
    flex: 0 0 100%;
    width: 100%;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 16px;
    user-select: none;
    -webkit-user-select: none;
  }

  .jypesa-sust-mobile-img-box {
    width: 100%;
    aspect-ratio: 16 / 11;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .jypesa-sust-mobile-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .jypesa-sust-mobile-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    padding: 0;
    width: 100%;
  }

  .jypesa-sust-mobile-index {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 24px;
    color: var(--jypesa-sust-text);
  }

  .jypesa-sust-mobile-slide-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: clamp(22px, 6vw, 30px);
    line-height: 1.2;
    color: var(--jypesa-sust-text);
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .jypesa-sust-mobile-slide-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.45;
    color: var(--jypesa-sust-text);
  }

  /* DOTS MOBILE */
  .jypesa-sust-mobile-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
  }

  .jypesa-sust-mobile-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .jypesa-sust-mobile-dot.active {
    background-color: #ffffff;
    width: 20px;
    border-radius: 10px;
  }


  /* ── RESPONSIVE MEDIA QUERIES ── */
  @media (min-width: 992px) {
    .jypesa-sust-desktop-wrapper {
      display: block;
    }
    
    .jypesa-sust-mobile-wrapper {
      display: none;
    }
  }

  /* Ajustes para pantallas medianas/laptops (e.g. 992px a 1550px) */
  @media (min-width: 992px) and (max-width: 1550px) {
    .jypesa-sust-desktop-left {
      padding: 4vh 4vw;
      width: 48%;
    }
    .jypesa-sust-desktop-right {
      width: 52%;
    }
    .jypesa-sust-main-title {
      font-size: 52px;
    }
    .jypesa-sust-intro-desc {
      font-size: 15px;
      max-width: 100%;
    }
    .jypesa-sust-left-top {
      gap: 15px;
    }
    .jypesa-sust-btn {
      font-size: 15px;
      padding: 12px 24px;
    }
    .jypesa-sust-divider {
      margin: 50px 0;
    }
    .jypesa-sust-desktop-bottom {
      height: 240px; /* Altura fija en pixel estable */
    }
    .jypesa-sust-slide-title {
      font-size: 34px;
    }
    .jypesa-sust-slide-desc {
      font-size: 15px;
    }
    .jypesa-sust-certs-img {
      height: 32px;
      margin-top: 10px;
    }
  }

  /* Ajustes para pantallas tipo laptop pequeñas (e.g. 992px a 1200px) */
  @media (min-width: 992px) and (max-width: 1200px) {
    .jypesa-sust-desktop-left {
      padding: 3vh 3vw;
      width: 50%;
    }
    .jypesa-sust-desktop-right {
      width: 50%;
    }
    .jypesa-sust-main-title {
      font-size: 42px;
    }
    .jypesa-sust-intro-desc {
      font-size: 14px;
    }
    .jypesa-sust-left-top {
      gap: 10px;
    }
    .jypesa-sust-btn {
      font-size: 14px;
      padding: 10px 20px;
    }
    .jypesa-sust-divider {
      margin: 35px 0;
    }
    .jypesa-sust-desktop-bottom {
      height: 220px; /* Altura fija reducida */
    }
    .jypesa-sust-slide-title {
      font-size: 28px;
    }
    .jypesa-sust-slide-desc {
      font-size: 14px;
    }
    .jypesa-sust-certs-img {
      height: 28px;
      margin-top: 8px;
    }
  }

  /* Ajustes específicos para pantallas con poca altura vertical (max-height: 850px) */
  @media (min-height: 500px) and (max-height: 850px) and (min-width: 992px) {
    .jypesa-sust-desktop-left {
      padding: 3vh 4vw;
    }
    .jypesa-sust-main-title {
      font-size: 44px;
    }
    .jypesa-sust-intro-desc {
      font-size: 14px;
    }
    .jypesa-sust-left-top {
      gap: 10px;
    }
    .jypesa-sust-divider {
      margin: 30px 0;
    }
    .jypesa-sust-desktop-bottom {
      height: 220px; /* Altura fija reducida para pantallas de baja altura */
    }
    .jypesa-sust-slide-title {
      font-size: 28px;
    }
    .jypesa-sust-slide-desc {
      font-size: 14px;
    }
    .jypesa-sust-certs-img {
      height: 26px;
      margin-top: 6px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── 2. INLINE SVG CERTIFICACIONES DE CALIDAD ──────────────────────────────
  const certIcons = {
    crueltyFree: `<svg class="jypesa-sust-cert-icon" width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29 55C43.3594 55 55 43.3594 55 29C55 14.6406 43.3594 3 29 3C14.6406 3 3 14.6406 3 29C3 43.3594 14.6406 55 29 55Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M25.7 34.6C26.1 33.7 26.6 32.7 27.2 31.8C27.9 30.7 28.7 29.8 29.5 28.9C30.4 27.8 31.3 26.8 32.2 25.8C33.4 24.3 34.5 22.8 35.5 21.2C35.9 20.6 36.3 19.9 36.6 19.2C36.8 18.7 36.8 18.1 36.6 17.6C36.4 17 36 16.5 35.5 16.2C34.8 15.8 34.1 15.8 33.4 16C32.4 16.3 31.5 16.8 30.7 17.5C29.6 18.3 28.6 19.4 27.8 20.6C26.9 21.8 26.1 23.1 25.5 24.5C24.8 26.1 24.2 27.7 23.8 29.4C23.5 30.5 23.3 31.6 23.2 32.7C23.1 33.2 23.1 33.7 23.3 34.2C23.5 34.7 23.9 35.1 24.4 35.3C24.9 35.5 25.4 35.2 25.7 34.6Z" fill="white"/>
      <path d="M21.5 31.3C21.7 30.1 22.1 29 22.6 27.9C23.3 26.4 24.2 25 25.2 23.7C26.3 22.2 27.6 20.8 29.1 19.6C29.7 19.1 30.4 18.6 31.2 18.3C31.6 18.1 32 18.1 32.4 18.3C32.7 18.5 33 18.8 33.1 19.2C33.2 19.7 33.1 20.2 32.8 20.6C32.4 21.3 31.9 22 31.3 22.6C30.2 23.8 28.9 24.9 27.6 25.9C26.2 27 24.7 28 23.1 28.8C22.6 29.1 22 29.4 21.5 29.7C21.1 29.9 20.9 30.4 21.1 30.8C21.2 31.2 21.7 31.4 22.1 31.3H21.5Z" fill="white"/>
      <path d="M37.8 33.8C37.8 32.8 37.6 31.8 37.3 30.8C36.8 29.3 36.1 27.9 35.2 26.6C34.2 25.2 33 23.9 31.7 22.8C31.1 22.3 30.4 21.9 29.6 21.7C29.2 21.6 28.8 21.7 28.5 21.9C28.2 22.1 28 22.5 28 22.9C28 23.4 28.2 23.9 28.5 24.2C29 24.8 29.6 25.4 30.2 26C31.4 27.1 32.7 28.1 34 29C35.4 30 36.8 30.9 38.3 31.7C38.8 32 39.4 32.2 39.9 32.4C40.3 32.6 40.5 32.1 40.3 31.7C40.2 31.3 39.7 31.1 39.3 31.2C38.8 32 38.3 32.9 37.8 33.8Z" fill="white"/>
    </svg>`,

    parabenFree: `<svg class="jypesa-sust-cert-icon" width="85" height="37" viewBox="0 0 85 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 30C22.4 30 28 24.4 28 17.5C28 10.6 22.4 5 15.5 5C8.6 5 3 10.6 3 17.5C3 24.4 8.6 30 15.5 30Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M19 12L12 23" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M11 11.5C12.5 12 14.5 13.5 15 15.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M12.5 9.5C14.5 10 17 12 17.5 14.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M37 25H33V11H37C39.2 11 41 12.8 41 15C41 17.2 39.2 19 37 19H33" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M47 25V17C47 14.8 48.8 13 51 13H55V25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M61 25V17C61 14.8 62.8 13 65 13C67.2 13 69 14.8 69 17V25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M61 19H69" stroke="white" stroke-width="2"/>
      <path d="M75 25V11" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M75 18C77 18 79 16 79 14.5C79 13 77 11 75 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    postConsumer: `<svg class="jypesa-sust-cert-icon" width="59" height="75" viewBox="0 0 59 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5 70C46.3452 70 60 56.3452 60 40C60 23.6548 46.3452 10 29.5 10C12.6548 10 -1 23.6548 -1 40C-1 56.3452 12.6548 70 29.5 70Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M29.5 22V50" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20 32L29.5 21.5L39 32" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 45C18 47.5 20.5 50 23.5 50H35.5C38.5 50 41 47.5 41 45" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    carbonFree: `<svg class="jypesa-sust-cert-icon" width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29.5" cy="29.5" r="26.5" stroke="white" stroke-width="2"/>
      <path d="M19 32.5C18 30.5 17.5 28 18 25.5C18.8 21.5 22 18.5 26 18C30.5 17.5 34.5 20.5 35.5 24.5C36 27 35.5 29.5 34.5 31.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M23 27C23 25.5 24.5 24 26 24C27.5 24 29 25.5 29 27C29 28.5 27.5 30 26 30C24.5 30 23 28.5 23 27Z" fill="white"/>
      <path d="M38 18.5C39.5 20 41 22 41 24.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M40.5 16C42.5 18 44 20.5 44 23.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    esr: `<svg class="jypesa-sust-cert-icon" width="58" height="45" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5H48C51.3 5 54 7.7 54 11V34C54 37.3 51.3 40 48 40H10C6.7 40 4 37.3 4 34V11C4 7.7 6.7 5 10 5Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M14 28H19V25H16V22H19V19H14V14H21V16H17V18H20V23H17V26H21V28H14V28ZM25 28C27 28 29 27 30 25.5C30 24 29 22.5 27 22H25C24.2 21.8 23.8 21.5 23.8 21C23.8 20.2 24.5 19.8 25.5 19.8C26.5 19.8 27.2 20.2 27.2 21H29.2C29.2 19 27.5 18 25.5 18C23.5 18 21.8 19 21.8 21C21.8 22.8 23.2 23.5 25 23.8H27C27.8 24 28.2 24.3 28.2 24.8C28.2 25.5 27.2 26 26 26C24.5 26 23.5 25 23.5 24H21.5C21.5 26.2 23 28 25 28ZM37 28V18H41C42.8 18 44 19 44 20.5C44 22 43 22.8 41.5 23L44 28H41.5L39.2 23.5H39V28H37ZM39 21.5H41C41.8 21.5 42.2 21.2 42.2 20.8C42.2 20.3 41.8 20 41 20H39V21.5Z" fill="white"/>
    </svg>`
  };

  // ─── 3. MOCK DATA / FALLBACKS (Alineado a Figma) ───────────────────────────
  // Resolver ruta base para las imágenes locales en el panel de pruebas
  let basePath = './widgets/';
  if (window.location.pathname.includes('widgets/slider-scroll-vertical')) {
    basePath = '../';
  }

  const fallbackSlides = [
    {
      indexNumber: '01',
      slideTitle: '',
      slideDesc: 'Todos nuestros tubos tienen en su composición plástico recuperado del océano (ocean bound plastic) Nocean fomentando el uso de materiales responsables y evitando que más plástico llegue al océano.',
      slideImg: basePath + 'assets/images/slider scroll vertical home/01.webp',
      logoSpecial: basePath + 'assets/images/slider scroll vertical home/Logo nocean.webp',
      showCerts: false
    },
    {
      indexNumber: '02',
      slideTitle: 'Refill systems',
      slideDesc: 'Sistemas de dispensación recargables diseñados para reducir el uso de envases de un solo uso en hoteles y operaciones de hospitalidad.',
      slideImg: basePath + 'assets/images/slider scroll vertical home/02.webp',
      logoSpecial: '',
      showCerts: false
    },
    {
      indexNumber: '03',
      slideTitle: 'Reducción de residuos',
      slideDesc: 'Desarrollo de soluciones que optimizan el consumo de productos y disminuyen la generación de residuos en la operación diaria de hoteles y empresas de hospitalidad.',
      slideImg: basePath + 'assets/images/slider scroll vertical home/03.webp',
      logoSpecial: '',
      showCerts: false
    },
    {
      indexNumber: '04',
      slideTitle: 'Certificaciones e impacto',
      slideDesc: 'Compromiso con estándares de calidad, prácticas responsables y acciones orientadas a generar un impacto ambiental y social positivo.',
      slideImg: basePath + 'assets/images/slider scroll vertical home/04.webp',
      logoSpecial: '',
      showCerts: true
    }
  ];

  // ─── 4. PARSEO DE DATOS CMS DESDE EL DOM ─────────────────────────────────────
  function readSlidesFromCMS() {
    const sourceContainer = document.querySelector('.jypesa-sust-cms-source');
    if (!sourceContainer) return null;

    const items = Array.from(sourceContainer.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const slides = [];
    items.forEach((item) => {
      const indexEl = item.querySelector('.jypesa-sust-prod-index');
      if (!indexEl) return;
      const indexNumber = indexEl.textContent.trim();
      if (!indexNumber) return;

      const getVal = (selector, attr = '') => {
        const el = item.querySelector(selector);
        if (!el) return '';
        if (attr) return el.getAttribute(attr) || '';
        return el.textContent.trim();
      };

      const showCertsText = getVal('.jypesa-sust-prod-show-certs').toLowerCase();
      // Si es el slide 04 o 4, o si el switch está activado, mostrar certificaciones
      const isFourthSlide = indexNumber === '04' || indexNumber === '4';
      const showCerts = isFourthSlide || ['true', 'yes', '1', 'si', 'sí'].includes(showCertsText);

      slides.push({
        indexNumber: indexNumber,
        slideTitle: getVal('.jypesa-sust-prod-title'),
        slideDesc: getVal('.jypesa-sust-prod-desc'),
        slideImg: getVal('.jypesa-sust-prod-img', 'src'),
        logoSpecial: getVal('.jypesa-sust-prod-logo', 'src'),
        certsImgSrc: getVal('.jypesa-sust-prod-certs-img', 'src'),
        showCerts: showCerts
      });
    });

    // Ordenar las diapositivas ascendente según su número de índice para evitar orden invertido de Webflow
    slides.sort((a, b) => {
      const idxA = parseInt(a.indexNumber, 10) || 0;
      const idxB = parseInt(b.indexNumber, 10) || 0;
      return idxA - idxB;
    });

    return slides.length ? slides : null;
  }

  // ─── 5. GENERACIÓN HTML DINÁMICO ───────────────────────────────────────────
  function buildWidgetHtml(slides) {
    // ── HTML Desktop Left Column Blocks ──
    const desktopLeftBlocks = slides
      .map((slide, idx) => {
        const hasLogo = slide.logoSpecial && 
                        slide.logoSpecial.trim() !== '' && 
                        !slide.logoSpecial.includes('placeholder') &&
                        slide.logoSpecial !== '#';

        const titleOrLogo = hasLogo 
          ? `<img class="jypesa-sust-slide-logo" src="${slide.logoSpecial}" alt="Logo">`
          : `<h3 class="jypesa-sust-slide-title">${slide.slideTitle}</h3>`;

        const hasCertsImg = slide.certsImgSrc && 
                            slide.certsImgSrc.trim() !== '' && 
                            !slide.certsImgSrc.includes('placeholder') &&
                            slide.certsImgSrc !== '#';

        const certsImgToUse = hasCertsImg 
          ? slide.certsImgSrc 
          : `${basePath}assets/images/slider scroll vertical home/Certifications Container.png`;

        const certsRow = slide.showCerts
          ? `<img class="jypesa-sust-certs-img" src="${certsImgToUse}" alt="Certificaciones" loading="lazy">`
          : '';

        return `
          <div class="jypesa-sust-slide-text-block${idx === 0 ? ' active' : ''}" data-slide-index="${idx}">
            <span class="jypesa-sust-slide-index">${slide.indexNumber}</span>
            ${titleOrLogo}
            <p class="jypesa-sust-slide-desc">${slide.slideDesc}</p>
            ${certsRow}
          </div>
        `;
      })
      .join('');

    // ── HTML Desktop Right Column Layers ──
    const desktopRightLayers = slides
      .map((slide, idx) => `
        <div class="jypesa-sust-img-layer" data-slide-index="${idx}">
          <img class="jypesa-sust-img" src="${slide.slideImg}" alt="Imagen ${slide.indexNumber}" loading="lazy">
        </div>
      `)
      .join('');

    // ── HTML Mobile Swipe Carousel Slides ──
    const mobileSlides = slides
      .map((slide, idx) => {
        const hasLogo = slide.logoSpecial && 
                        slide.logoSpecial.trim() !== '' && 
                        !slide.logoSpecial.includes('placeholder') &&
                        slide.logoSpecial !== '#';

        const titleOrLogo = hasLogo 
          ? `<img class="jypesa-sust-slide-logo" src="${slide.logoSpecial}" alt="Logo" style="height: 55px;">`
          : `<h3 class="jypesa-sust-mobile-slide-title">${slide.slideTitle}</h3>`;

        const hasCertsImg = slide.certsImgSrc && 
                            slide.certsImgSrc.trim() !== '' && 
                            !slide.certsImgSrc.includes('placeholder') &&
                            slide.certsImgSrc !== '#';

        const certsImgToUse = hasCertsImg 
          ? slide.certsImgSrc 
          : `${basePath}assets/images/slider scroll vertical home/Certifications Container.png`;

        const certsRow = slide.showCerts
          ? `<img class="jypesa-sust-certs-img-mobile" src="${certsImgToUse}" alt="Certificaciones" loading="lazy">`
          : '';

        return `
          <div class="jypesa-sust-mobile-slide">
            <div class="jypesa-sust-mobile-img-box">
              <img src="${slide.slideImg}" alt="Diapositiva ${slide.indexNumber}" loading="lazy">
            </div>
            <div class="jypesa-sust-mobile-info">
              <span class="jypesa-sust-mobile-index">${slide.indexNumber}</span>
              ${titleOrLogo}
              <p class="jypesa-sust-mobile-slide-desc">${slide.slideDesc}</p>
              ${certsRow}
            </div>
          </div>
        `;
      })
      .join('');

    // ── HTML Mobile Dots ──
    const mobileDots = slides
      .map((_, idx) => `
        <button class="jypesa-sust-mobile-dot${idx === 0 ? ' active' : ''}" data-index="${idx}" aria-label="Ir a diapositiva ${idx + 1}"></button>
      `)
      .join('');

    return `
      <!-- DESKTOP SCROLL INTERACTIVE LAYOUT -->
      <div class="jypesa-sust-desktop-wrapper">
        <div class="jypesa-sust-desktop-sticky">
          <!-- Columna Izquierda Fija -->
          <div class="jypesa-sust-desktop-left">
            <div class="jypesa-sust-left-top">
              <div class="jypesa-sust-destacable">
                <p>Compromiso con el planeta</p>
              </div>
              <h2 class="jypesa-sust-main-title">Sustentabilidad</h2>
              <p class="jypesa-sust-intro-desc">En Jypesa desarrollamos soluciones para la industria de la hospitalidad que integran innovación, calidad y responsabilidad ambiental.<br><br>A través de materiales responsables, sistemas recargables y procesos optimizados, buscamos reducir el impacto ambiental de las amenidades utilizadas en hoteles y espacios de hospitalidad.</p>
              <a href="/sustentabilidad" class="jypesa-sust-btn">
                Saber más 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>

            <!-- Divisor entre Intro y Slide -->
            <div class="jypesa-sust-divider"></div>

            <!-- Bloques de Texto Dinámicos -->
            <div class="jypesa-sust-desktop-bottom">
              ${desktopLeftBlocks}
            </div>
          </div>

          <!-- Columna Derecha de Imágenes -->
          <div class="jypesa-sust-desktop-right">
            ${desktopRightLayers}
            
            <!-- Indicador de scroll removido -->
          </div>
        </div>
      </div>

      <!-- MOBILE SWIPE LAYOUT -->
      <div class="jypesa-sust-mobile-wrapper">
        <div class="jypesa-sust-mobile-header">
          <div class="jypesa-sust-destacable">
            <p>Compromiso con el planeta</p>
          </div>
          <h2 class="jypesa-sust-mobile-title">Sustentabilidad</h2>
          <p class="jypesa-sust-mobile-slide-desc" style="opacity: 0.9; margin-bottom: 15px;">En Jypesa desarrollamos soluciones para la industria de la hospitalidad que integran innovación, calidad y responsabilidad ambiental.</p>
          <a href="/sustentabilidad" class="jypesa-sust-btn">
            Saber más 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div class="jypesa-sust-mobile-track">
          ${mobileSlides}
        </div>

        <div class="jypesa-sust-mobile-dots">
          ${mobileDots}
        </div>
      </div>
    `;
  }

  // ─── 6. INTERACTIVIDAD Y DETECCIÓN DE SCROLL ─────────────────────────────────
  function setupDesktopScroll(wrapper, slides) {
    const desktopWrapper = wrapper.querySelector('.jypesa-sust-desktop-wrapper');
    const textBlocks = wrapper.querySelectorAll('.jypesa-sust-slide-text-block');
    const imgLayers = wrapper.querySelectorAll('.jypesa-sust-img-layer');
    const divider = wrapper.querySelector('.jypesa-sust-divider');

    if (!desktopWrapper) return;

    const handleScroll = () => {
      // 1. Verificar si el elemento está en pantalla
      const rect = desktopWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Si la sección no está en pantalla, no hacer cálculos
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      // 2. Calcular progreso de scroll dentro de la sección
      const scrolled = -rect.top;
      const scrollRange = rect.height - windowHeight;
      const progress = Math.min(1, Math.max(0, scrolled / scrollRange)); // Rango [0, 1]

      // 3. Mostrar u ocultar el divisor con fundido
      if (progress > 0.05) {
        divider.classList.add('visible');
      } else {
        divider.classList.remove('visible');
      }

      // 4. Mover el handle removido

      // 5. Transición de imágenes (Stacking translateY)
      // Slide 1 (índice 0) es estático en el fondo.
      // Slide 2 a 4 suben proporcionalmente.
      const numSlides = slides.length;
      
      for (let i = 1; i < numSlides; i++) {
        // Rango en el que la capa i se desliza hacia arriba
        // Capa i empieza a subir a partir de (i-1) / (numSlides-1)
        const startProgress = (i - 1) / (numSlides - 1);
        const endProgress = i / (numSlides - 1);

        let layerY = 100; // Por defecto abajo (100% de TranslateY)
        if (progress >= endProgress) {
          layerY = 0; // Diapositiva completada
        } else if (progress > startProgress) {
          const localProgress = (progress - startProgress) / (endProgress - startProgress);
          layerY = (1 - localProgress) * 100;
        }

        imgLayers[i].style.transform = `translateY(${layerY}%)`;
      }

      // 6. Activar bloques de texto correspondientes
      // El índice activo se calcula dividiendo el progreso linealmente
      const activeIdx = Math.min(numSlides - 1, Math.max(0, Math.floor(progress * numSlides)));
      textBlocks.forEach((block, idx) => {
        if (idx === activeIdx) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Ejecución inicial rápida
    setTimeout(handleScroll, 100);
  }

  function setupMobileCarousel(wrapper) {
    const track = wrapper.querySelector('.jypesa-sust-mobile-track');
    const dots = wrapper.querySelectorAll('.jypesa-sust-mobile-dot');

    if (!track || !dots.length) return;

    const getStep = () => {
      const slide = track.querySelector('.jypesa-sust-mobile-slide');
      return slide ? slide.offsetWidth + 20 : 320;
    };

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const step = getStep();
      const activeIdx = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(scrollLeft / step))
      );

      dots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    track.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: idx * getStep(), behavior: 'smooth' });
      });
    });

    // ── SOPORTE ARRASTRE DE RATÓN Y TÁCTIL MEJORADO (DRAG TO SCROLL FOR EMULATORS) ──
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.scrollBehavior = 'auto';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      track.style.scrollBehavior = 'smooth';
      track.style.cursor = 'grab';
      
      // Snap suave al finalizar arrastre
      const sLeft = track.scrollLeft;
      const step = getStep();
      const nearestIdx = Math.round(sLeft / step);
      track.scrollTo({ left: nearestIdx * step, behavior: 'smooth' });
    };

    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('mouseup', endDrag);

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5; // multiplicador de sensibilidad
      track.scrollLeft = scrollLeft - walk;
    });

    // Inicializar cursor a grab
    track.style.cursor = 'grab';
  }

  // ─── 7. INICIALIZADOR ──────────────────────────────────────────────────────
  function initSustentabilidadWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-sustentabilidad-widget, [data-jypesa-sustentabilidad-widget], #jypesa-sustentabilidad-widget'
    );
    if (!targets.length) return;

    const cmsSlides = readSlidesFromCMS();
    const slides = cmsSlides || fallbackSlides;

    targets.forEach((target) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      const wrapper = document.createElement('div');
      wrapper.className = 'jypesa-sust-widget';
      wrapper.innerHTML = buildWidgetHtml(slides);
      target.appendChild(wrapper);

      // Configurar interactividades
      setupDesktopScroll(wrapper, slides);
      setupMobileCarousel(wrapper);
    });
  }

  // Ejecución al estar listo el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSustentabilidadWidget);
  } else {
    initSustentabilidadWidget();
  }
})();
