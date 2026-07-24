(function () {
  if (window.__JypesaColeccionesTabsWidgetInitialized) return;
  window.__JypesaColeccionesTabsWidgetInitialized = true;

  // 1. Inyectar Fuentes y Estilos CSS Pixel-Perfect de Figma para Colecciones
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600;700&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const cssStyles = `
  :root {
    --jypesa-coltabs-slate: #506D85;
    --jypesa-coltabs-slate-50: rgba(80, 109, 133, 0.5);
    --jypesa-coltabs-slate-15: rgba(80, 109, 133, 0.15);
    --jypesa-coltabs-blue: #48a9c5;
    --jypesa-coltabs-dark-blue: #0088bd;
    --jypesa-coltabs-light-cyan: #9ef4f5;
    --jypesa-coltabs-bg-light: #f8fafc;
    --jypesa-coltabs-white: #ffffff;
    --jypesa-coltabs-shadow: 4px 5px 14.4px 0px rgba(0, 0, 0, 0.1);
  }

  .jypesa-colecciones-tabs-widget-container,
  .jypesa-tabs-colecciones-widget-container,
  [data-jypesa-colecciones-tabs-widget],
  [data-jypesa-tabs-colecciones-widget],
  #jypesa-colecciones-tabs-widget,
  #jypesa-tabs-colecciones-widget,
  .jypesa-colecciones-tabs-widget,
  .jypesa-tabs-colecciones-widget {
    width: 100% !important;
    display: block !important;
    align-self: stretch !important;
    box-sizing: border-box !important;
  }

  .jypesa-colecciones-tabs-widget,
  .jypesa-tabs-colecciones-widget {
    background: transparent;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-coltabs-slate);
    padding: 24px 0;
    overflow: hidden;
  }

  /* LAYOUT GENERAL */
  .jypesa-coltabs-layout {
    display: flex !important;
    flex-direction: column;
    gap: 24px;
    width: 100% !important;
    max-width: 1850px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }

  /* COLUMNA IZQUIERDA (NAVEGACIÓN) */
  .jypesa-coltabs-left-col {
    width: 100%;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
  }

  .jypesa-coltabs-nav-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .jypesa-coltabs-nav-subtitle {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 19px;
    font-weight: 400;
    color: var(--jypesa-coltabs-slate);
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 6px;
    display: inline-block;
    text-transform: none;
    margin-bottom: 10px;
  }

  .jypesa-coltabs-nav-subtitle::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 1.5px;
    background-color: var(--jypesa-coltabs-slate);
  }

  .jypesa-coltabs-nav-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 1.15;
    color: var(--jypesa-coltabs-slate);
    margin: 0 0 12px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .jypesa-coltabs-nav-title span {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 46px;
    line-height: 1;
    background: linear-gradient(135deg, var(--jypesa-coltabs-blue) 0%, var(--jypesa-coltabs-dark-blue) 60%, var(--jypesa-coltabs-light-cyan) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    letter-spacing: 1.5px;
  }

  /* TABS EN MÓVIL Y DESKTOP */
  .jypesa-coltabs-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px 16px;
    width: 100%;
    margin: 0;
    padding: 0 0 14px 0;
    border-bottom: 1px solid var(--jypesa-coltabs-slate-15);
    box-sizing: border-box;
  }

  .jypesa-coltabs-menu-item {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 21px;
    color: var(--jypesa-coltabs-slate);
    opacity: 0.45;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease, border-color 0.3s ease !important;
    position: relative;
    padding: 4px 6px 8px 6px;
    display: inline-flex;
    align-items: center;
    user-select: none;
    line-height: 1.15;
    border-bottom: 2px solid transparent;
    letter-spacing: 0.8px;
    word-break: break-word;
  }

  .jypesa-coltabs-menu-item:hover {
    opacity: 0.8 !important;
    transform: translateX(6px) !important;
  }

  .jypesa-coltabs-menu-item.active {
    opacity: 1 !important;
    border-bottom: 2.5px solid var(--jypesa-coltabs-slate);
  }

  /* COLUMNA DERECHA */
  .jypesa-coltabs-right-col {
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
    position: relative;
  }

  .jypesa-coltabs-tab-content-panel {
    display: none;
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
    animation: jypesaColTabsFadeIn 0.4s ease forwards;
  }

  .jypesa-coltabs-tab-content-panel.active {
    display: block !important;
    width: 100% !important;
  }

  @keyframes jypesaColTabsFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .jypesa-coltabs-tab-top-desc {
    font-family: 'Rubik', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: var(--jypesa-coltabs-slate);
    margin: 0 0 20px 0;
  }

  /* SLIDERS DE PRODUCTOS CON SOPORTE DRAG DE MOUSE */
  .jypesa-coltabs-slider-outer {
    position: relative;
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
  }

  .jypesa-coltabs-products-container {
    display: flex;
    width: 100% !important;
    gap: 16px;
    align-items: stretch;
    justify-content: flex-start;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 10px 0 24px 0 !important;
    margin: 0;
    box-sizing: border-box;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .jypesa-coltabs-products-container.is-dragging {
    cursor: grabbing !important;
    scroll-behavior: auto !important;
    scroll-snap-type: none !important;
  }

  .jypesa-coltabs-products-container::-webkit-scrollbar {
    display: none;
  }

  /* PREVENIR ARRASTRE NATIVO DE IMÁGENES NAVEGADOR */
  .jypesa-coltabs-card-img,
  .jypesa-coltabs-card-logo {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  }

  /* TARJETA EN MÓVIL */
  .jypesa-coltabs-product-card {
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
    height: 480px;
    background-color: var(--jypesa-coltabs-white);
    box-shadow: var(--jypesa-coltabs-shadow);
    border-radius: 0px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    position: relative;
    scroll-snap-align: center;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, box-shadow 0.35s ease;
    will-change: transform, opacity;
  }

  .jypesa-coltabs-product-card:hover {
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.15);
  }

  /* IMAGEN SUPERIOR CARD */
  .jypesa-coltabs-card-img-wrap {
    width: 100%;
    height: 72%;
    position: relative;
    overflow: hidden;
    background-color: #f4f7f9;
  }

  .jypesa-coltabs-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jypesa-coltabs-product-card:hover .jypesa-coltabs-card-img {
    transform: scale(1.04);
  }

  /* INFO INFERIOR CARD */
  .jypesa-coltabs-card-info {
    width: 100%;
    height: 28%;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background-color: var(--jypesa-coltabs-white);
    text-align: center;
  }

  .jypesa-coltabs-card-logo-wrap {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90%;
  }

  .jypesa-coltabs-card-logo {
    max-height: 40px;
    max-width: 160px;
    object-fit: contain;
    width: auto;
  }

  .jypesa-coltabs-card-title-fallback {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: var(--jypesa-coltabs-slate);
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
  }

  /* BOTÓN "CONOCER MÁS" */
  .jypesa-coltabs-card-btn {
    background-color: var(--jypesa-coltabs-blue);
    color: var(--jypesa-coltabs-white);
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.8px;
    height: 38px;
    width: 100%;
    max-width: 200px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    border: none;
    box-sizing: border-box;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease !important;
  }

  .jypesa-coltabs-card-btn:hover {
    background-color: #3b93ac !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(72, 169, 197, 0.4) !important;
  }

  .jypesa-coltabs-card-btn-icon {
    width: 7px;
    height: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s ease !important;
  }

  .jypesa-coltabs-card-btn:hover .jypesa-coltabs-card-btn-icon {
    transform: translateX(4px) !important;
  }

  .jypesa-coltabs-card-btn-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .jypesa-coltabs-desktop-nav-btn {
    display: none;
  }

  /* PAGINACIÓN INFERIOR */
  .jypesa-coltabs-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 18px;
    width: 100%;
  }

  .jypesa-coltabs-dot-bar {
    height: 5px;
    width: 30px;
    background-color: rgba(72, 169, 197, 0.35);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .jypesa-coltabs-dot-bar.active {
    background-color: var(--jypesa-coltabs-blue);
  }

  /* ==========================================================================
     MEDIA QUERIES (DESKTOP LAYOUT >= 769px)
     ========================================================================== */
  @media (min-width: 769px) {
    .jypesa-colecciones-tabs-widget,
    .jypesa-tabs-colecciones-widget {
      padding: 60px 0;
    }

    .jypesa-coltabs-layout {
      flex-direction: row;
      gap: 50px !important;
      padding: 0 40px;
      align-items: flex-start;
    }

    .jypesa-coltabs-left-col {
      width: 380px;
      flex-shrink: 0;
      position: sticky;
      top: 40px;
      gap: 28px;
    }

    .jypesa-coltabs-nav-title {
      font-size: 36px;
      margin-bottom: 16px;
    }

    .jypesa-coltabs-nav-title span {
      font-size: 72px;
    }

    .jypesa-coltabs-nav-subtitle {
      font-size: 21px;
      margin-bottom: 14px;
    }

    .jypesa-coltabs-nav-subtitle::after {
      width: 60px;
    }

    /* Menú vertical en Desktop */
    .jypesa-coltabs-menu {
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 20px;
      padding-top: 10px;
      margin: 0;
      padding: 0;
      border-bottom: none;
      width: 100%;
    }

    .jypesa-coltabs-menu-item {
      font-size: 26px;
      padding-bottom: 6px;
      width: fit-content;
    }

    .jypesa-coltabs-right-col {
      flex: 1 1 0% !important;
      min-width: 0 !important;
    }

    .jypesa-coltabs-products-container {
      gap: 20px;
      scroll-snap-type: none;
      padding: 15px 5px 35px 5px !important;
      margin: -15px -5px -35px -5px;
    }

    /* TARJETA EN DESKTOP: ANCHO FIJO DE FIGMA (445px) */
    .jypesa-coltabs-product-card {
      flex: 0 0 445px;
      width: 445px;
      height: 760px;
      scroll-snap-align: none;
    }

    .jypesa-coltabs-card-img-wrap {
      height: 74%;
    }

    .jypesa-coltabs-card-info {
      height: 26%;
      padding: 24px 30px;
      gap: 21px;
    }

    .jypesa-coltabs-card-logo-wrap {
      height: 60px;
    }

    .jypesa-coltabs-card-logo {
      max-height: 58px;
      max-width: 220px;
    }

    .jypesa-coltabs-card-btn {
      font-size: 18px;
      height: 39px;
      max-width: 218px;
    }

    .jypesa-coltabs-desktop-nav-btn {
      position: absolute;
      right: -24px;
      top: 40%;
      transform: translateY(-50%);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--jypesa-coltabs-white);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      display: flex !important;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 20;
      border: none;
      outline: none;
      transition: all 0.25s ease;
      color: var(--jypesa-coltabs-blue);
      opacity: 1 !important;
      visibility: visible !important;
    }

    .jypesa-coltabs-desktop-nav-btn:hover {
      transform: translateY(-50%) scale(1.08);
      box-shadow: 0 6px 20px rgba(72, 169, 197, 0.3);
    }

    .jypesa-coltabs-tab-top-desc {
      font-size: 15px;
      margin-bottom: 24px;
    }

    .jypesa-coltabs-dot-bar {
      width: 33px;
    }
  }

  @media (min-width: 1400px) {
    .jypesa-coltabs-layout {
      gap: 80px !important;
    }
    .jypesa-coltabs-left-col {
      width: 420px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 2. Iconos SVG centralizados
  const arrowRightSvg = `<svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.15013 6.32527L0.25013 11.2253C0.0834632 11.3919 0.00290725 11.5864 0.00846287 11.8086C0.0140185 12.0308 0.10013 12.2253 0.266796 12.3919C0.433463 12.5586 0.627907 12.6419 0.85013 12.6419C1.07235 12.6419 1.2668 12.5586 1.43346 12.3919L6.5668 7.27527C6.70013 7.14194 6.80013 6.99194 6.8668 6.82527C6.93346 6.6586 6.9668 6.49194 6.9668 6.32527C6.9668 6.1586 6.93346 5.99194 6.8668 5.82527C6.80013 5.6586 6.70013 5.5086 6.5668 5.37527L1.43346 0.241935C1.2668 0.0752686 1.06957 -0.005287 0.841797 0.00026855C0.614019 0.0058241 0.416797 0.0919352 0.25013 0.258602C0.0834637 0.425269 0.000130149 0.619713 0.00013014 0.841935C0.00013013 1.06416 0.0834636 1.2586 0.25013 1.42527L5.15013 6.32527Z" fill="currentColor"/></svg>`;
  const navBtnRightSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="#48A9C5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // 3. Diccionario Estático Bilingüe
  const staticTexts = {
    es: {
      subtitle: 'Nuestras colecciones',
      titleLine: 'Conoce nuestras',
      titleSpan: 'colecciones',
      cardBtnText: 'Saber más'
    },
    en: {
      subtitle: 'Our collections',
      titleLine: 'Discover our',
      titleSpan: 'collections',
      cardBtnText: 'Learn More'
    }
  };

  // Colecciones por defecto según Figma 322-23490 (Bilingüe)
  const defaultCollectionsByLang = {
    es: [
      {
        name: 'Estándar',
        id: 'estandar',
        desc: 'Colección de líneas versátiles y esenciales diseñadas para satisfacer las necesidades diarias con un toque distintivo de calidad y frescura.',
        subgroups: [
          {
            products: [
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              },
              {
                name: 'Almond & Olive',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#almond-olive'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              },
              {
                name: 'Tea Leaf',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#tealeaf'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              }
            ]
          }
        ]
      },
      {
        name: 'Superior',
        id: 'superior',
        desc: 'Formulaciones enriquecidas con extractos botánicos y envases de diseño contemporáneo para experiencias de hospitalidad superior.',
        subgroups: [
          {
            products: [
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Green & Citrics',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#citrics'
              },
              {
                name: 'Almond & Olive',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#almond-olive'
              },
              {
                name: 'Tea Leaf',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#tealeaf'
              },
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              }
            ]
          }
        ]
      },
      {
        name: 'Premium',
        id: 'premium',
        desc: 'Línea de amenidades de alta gama con aceites esenciales, fragancias complejas y presentaciones recargables sustentables.',
        subgroups: [
          {
            products: [
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              },
              {
                name: 'nOcean Spa',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#nocean'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              }
            ]
          }
        ]
      },
      {
        name: 'Lujo',
        id: 'lujo',
        desc: 'Colecciones de máxima exclusividad para hoteles boutique y resorts de ultra lujo, elaboradas con estándares internacionales superiores.',
        subgroups: [
          {
            products: [
              {
                name: 'Xinu Haute Parfumerie',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#xinu'
              },
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              },
              {
                name: 'nOcean Spa',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#nocean'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              }
            ]
          }
        ]
      }
    ],
    en: [
      {
        name: 'Standard',
        id: 'standard',
        desc: 'A collection of versatile and essential lines designed to satisfy daily needs with a distinctive touch of quality and freshness.',
        subgroups: [
          {
            products: [
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              },
              {
                name: 'Almond & Olive',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#almond-olive'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              },
              {
                name: 'Tea Leaf',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#tealeaf'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              }
            ]
          }
        ]
      },
      {
        name: 'Superior',
        id: 'superior',
        desc: 'Formulations enriched with botanical extracts and contemporary container designs for superior hospitality experiences.',
        subgroups: [
          {
            products: [
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Green & Citrics',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#citrics'
              },
              {
                name: 'Almond & Olive',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#almond-olive'
              },
              {
                name: 'Tea Leaf',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#tealeaf'
              },
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              }
            ]
          }
        ]
      },
      {
        name: 'Premium',
        id: 'premium',
        desc: 'High-end amenity line with essential oils, complex fragrances, and sustainable refillable presentations.',
        subgroups: [
          {
            products: [
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              },
              {
                name: 'nOcean Spa',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#nocean'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Elements',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
                link: '#elements'
              }
            ]
          }
        ]
      },
      {
        name: 'Luxury',
        id: 'luxury',
        desc: 'Ultra-exclusive collections for boutique hotels and luxury resorts, crafted to superior international standards.',
        subgroups: [
          {
            products: [
              {
                name: 'Xinu Haute Parfumerie',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#xinu'
              },
              {
                name: 'Luxury Wood',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
                link: '#luxury-wood'
              },
              {
                name: 'nOcean Spa',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
                link: '#nocean'
              },
              {
                name: 'Persea Botanicals',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
                link: '#persea'
              },
              {
                name: 'Rainforest Foliage',
                logoSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
                link: '#rainforest'
              }
            ]
          }
        ]
      }
    ]
  };

  // Helper sanitizadores
  function cleanText(text) {
    if (!text) return '';
    return text.replace(/[\u0300-\u036f]/g, '').replace(/[\u00a0\s]+/g, ' ').trim();
  }

  function makeSlug(text) {
    return cleanText(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // 4. Lector dinámico de Webflow CMS
  function readCollectionsFromCMS(target, lang = 'es') {
    let sourceSelector = target.getAttribute('data-cms-source');
    let source = sourceSelector ? document.querySelector(sourceSelector) : null;

    if (!source) source = target.querySelector('.jypesa-colecciones-tabs-cms-source, .jypesa-tabs-colecciones-cms-source');
    if (!source) source = document.querySelector('.jypesa-colecciones-tabs-cms-source, .jypesa-tabs-colecciones-cms-source, .jypesa-colecciones-tabs-cms-source-test, .jypesa-tabs-colecciones-cms-source-test, [data-cms-source]');

    if (!source) return null;

    let items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const collectionsMap = {};

    items.forEach((item, idx) => {
      const getVal = (selectors) => {
        for (const sel of selectors) {
          const el = item.querySelector(sel);
          if (el && el.textContent.trim()) return cleanText(el.textContent);
        }
        return '';
      };

      let colName = '';
      if (lang === 'en') {
        colName = getVal(['.jypesa-coltabs-col-name-en', '.jypesa-tabs-col-name-en', '[data-col-name-en]']);
      }
      if (!colName) {
        colName = getVal(['.jypesa-coltabs-col-name', '.jypesa-tabs-col-name', '.jypesa-col-name', '.collection-name', '[data-col-name]']);
      }
      if (!colName) colName = lang === 'en' ? 'Collection' : 'Colección';

      if (!collectionsMap[colName]) {
        let desc = '';
        if (lang === 'en') {
          desc = getVal(['.jypesa-coltabs-col-desc-en', '.jypesa-tabs-col-desc-en']);
        }
        if (!desc) {
          desc = getVal(['.jypesa-coltabs-col-desc', '.jypesa-tabs-col-desc', '.collection-desc']);
        }

        collectionsMap[colName] = {
          name: colName,
          id: makeSlug(colName),
          desc: desc,
          products: []
        };
      }

      let prodName = '';
      if (lang === 'en') {
        prodName = getVal(['.jypesa-coltabs-prod-name-en', '.jypesa-tabs-prod-name-en', '[data-prod-name-en]']);
      }
      if (!prodName) {
        prodName = getVal(['.jypesa-coltabs-prod-name', '.jypesa-tabs-prod-name', '.product-name', '[data-prod-name]']) || colName;
      }

      const logoEl = item.querySelector('.jypesa-coltabs-col-logo, .jypesa-tabs-col-logo, img.jypesa-col-logo, [data-logo]');
      const imgEl = item.querySelector('.jypesa-coltabs-prod-img, .jypesa-tabs-prod-img, img.jypesa-prod-img, [data-img]');
      const linkEl = item.querySelector('.jypesa-coltabs-prod-link, .jypesa-tabs-prod-link, a.jypesa-prod-link, a');

      let logoSrc = '';
      if (logoEl) {
        logoSrc = logoEl.getAttribute('src') || logoEl.getAttribute('data-src') || logoEl.src || '';
      }

      let imgSrc = imgEl ? (imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || imgEl.src || '') : '';
      if (!imgSrc) {
        imgSrc = logoSrc || 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif';
      }

      const prodObj = {
        name: prodName || (lang === 'en' ? `Product ${idx + 1}` : `Producto ${idx + 1}`),
        logoSrc: logoSrc,
        imgSrc: imgSrc,
        link: linkEl ? (linkEl.getAttribute('href') || '#') : '#'
      };

      collectionsMap[colName].products.push(prodObj);
    });

    const collections = Object.values(collectionsMap).map(col => {
      return {
        name: col.name,
        id: col.id,
        desc: col.desc,
        subgroups: [{ products: col.products }]
      };
    });

    return collections.length ? collections : null;
  }

  // 5. Construcción HTML del Widget
  function buildWidgetHtml(collections, lang = 'es') {
    const t = staticTexts[lang] || staticTexts.es;

    return `
      <div class="jypesa-coltabs-layout">
        <!-- Columna Izquierda (Navegación / Tabs) -->
        <div class="jypesa-coltabs-left-col">
          <div class="jypesa-coltabs-nav-header">
            <span class="jypesa-coltabs-nav-subtitle">${t.subtitle}</span>
            <h2 class="jypesa-coltabs-nav-title">
              ${t.titleLine} 
              <span>${t.titleSpan}</span>
            </h2>
          </div>
          <div class="jypesa-coltabs-menu">
            ${collections.map((col, idx) => `
              <div class="jypesa-coltabs-menu-item ${idx === 0 ? 'active' : ''}" data-tab="${col.id}">
                ${col.name}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Columna Derecha (Slider de Productos/Colecciones) -->
        <div class="jypesa-coltabs-right-col">
          ${collections.map((col, idx) => `
            <div class="jypesa-coltabs-tab-content-panel ${idx === 0 ? 'active' : ''}" id="panel-${col.id}">
              ${col.desc ? `<p class="jypesa-coltabs-tab-top-desc">${col.desc}</p>` : ''}
              ${col.subgroups.map(sub => `
                <div class="jypesa-coltabs-slider-outer">
                  <button class="jypesa-coltabs-desktop-nav-btn next-btn" aria-label="${lang === 'en' ? 'Next Collection' : 'Siguiente Colección'}">
                    ${navBtnRightSvg}
                  </button>

                  <div class="jypesa-coltabs-products-container">
                    ${sub.products.map(prod => `
                      <a href="${prod.link}" class="jypesa-coltabs-product-card">
                        <div class="jypesa-coltabs-card-img-wrap">
                          ${prod.imgSrc ? `<img class="jypesa-coltabs-card-img" src="${prod.imgSrc}" alt="${prod.name}" loading="lazy">` : ''}
                        </div>
                        <div class="jypesa-coltabs-card-info">
                          <div class="jypesa-coltabs-card-logo-wrap">
                            ${prod.logoSrc ? `<img class="jypesa-coltabs-card-logo" src="${prod.logoSrc}" alt="${prod.name}">` : `<h3 class="jypesa-coltabs-card-title-fallback">${prod.name}</h3>`}
                          </div>
                          <div class="jypesa-coltabs-card-btn">
                            <span>${t.cardBtnText}</span>
                            <span class="jypesa-coltabs-card-btn-icon">${arrowRightSvg}</span>
                          </div>
                        </div>
                      </a>
                    `).join('')}
                  </div>

                  <div class="jypesa-coltabs-pagination">
                    ${sub.products.map((_, pIdx) => `
                      <span class="jypesa-coltabs-dot-bar ${pIdx === 0 ? 'active' : ''}" data-index="${pIdx}"></span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 6. Animación del Slider ("Exit Shrink & Fade") + Eventos con Ciclo Infinito
  function updateCardExitAnimations(container) {
    if (!container) return;

    if (window.innerWidth <= 768) {
      const cards = container.querySelectorAll('.jypesa-coltabs-product-card');
      cards.forEach(card => {
        card.style.transform = 'none';
        card.style.opacity = '1';
      });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll('.jypesa-coltabs-product-card');

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardLeftRelative = cardRect.left - containerRect.left;
      const cardRightRelative = cardRect.right - containerRect.left;
      const cardWidth = cardRect.width;

      if (cardLeftRelative < 15) {
        // Tarjeta saliendo hacia la izquierda (se reduce y desaparece)
        const exitProgress = Math.max(0, Math.min(1, cardRightRelative / (cardWidth * 0.85)));
        const scale = 0.70 + (0.30 * exitProgress);
        const opacity = Math.pow(exitProgress, 1.2);
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.transformOrigin = 'right center';
      } else if (cardRightRelative > containerRect.width - 15) {
        // Tarjeta saliendo por la derecha
        const enterProgress = Math.max(0, Math.min(1, (containerRect.width - cardLeftRelative) / (cardWidth * 0.85)));
        const scale = 0.82 + (0.18 * enterProgress);
        const opacity = Math.max(0.3, enterProgress);
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.transformOrigin = 'left center';
      } else {
        // Tarjeta completamente visible al centro
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        card.style.transformOrigin = 'center center';
      }
    });
  }

  function setupWidgetInteractions(target) {
    const tabButtons = target.querySelectorAll('.jypesa-coltabs-menu-item');
    const contentPanels = target.querySelectorAll('.jypesa-coltabs-tab-content-panel');

    function activateTab(tabId) {
      tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });
      contentPanels.forEach(panel => {
        const isActive = panel.id === `panel-${tabId}`;
        panel.classList.toggle('active', isActive);
        if (isActive) {
          const container = panel.querySelector('.jypesa-coltabs-products-container');
          if (container) {
            setTimeout(() => updateCardExitAnimations(container), 50);
          }
        }
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        activateTab(tabId);
      });
    });

    contentPanels.forEach(panel => {
      const container = panel.querySelector('.jypesa-coltabs-products-container');
      const nextBtn = panel.querySelector('.next-btn');
      const dotBars = panel.querySelectorAll('.jypesa-coltabs-dot-bar');

      if (!container) return;

      const getScrollStep = () => {
        const card = container.querySelector('.jypesa-coltabs-product-card');
        return card ? card.getBoundingClientRect().width + 16 : container.clientWidth;
      };

      // SOPORTE DE ARRASTRE CON EL MOUSE (CLICK & DRAG MOUSE SCROLLING)
      let isMouseDown = false;
      let startX = 0;
      let scrollLeftStart = 0;
      let isDragged = false;

      container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isMouseDown = true;
        isDragged = false;
        startX = e.pageX - container.offsetLeft;
        scrollLeftStart = container.scrollLeft;
        container.classList.add('is-dragging');
      });

      window.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 5) {
          isDragged = true;
        }
        container.scrollLeft = scrollLeftStart - walk;
      });

      window.addEventListener('mouseup', () => {
        if (isMouseDown) {
          isMouseDown = false;
          container.classList.remove('is-dragging');
        }
      });

      // Prevenir navegación accidental si se arrastró
      const cards = container.querySelectorAll('.jypesa-coltabs-product-card');
      cards.forEach(card => {
        card.addEventListener('click', (e) => {
          if (isDragged) {
            e.preventDefault();
            e.stopPropagation();
            isDragged = false;
          }
        });
      });

      // NAVEGACIÓN CON BUCLE INFINITO AL LLEGAR AL ÚLTIMO CARD
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const scrollLeft = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          const step = getScrollStep();

          if (scrollLeft >= maxScroll - 25) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: step, behavior: 'smooth' });
          }
        });
      }

      dotBars.forEach((bar, idx) => {
        bar.addEventListener('click', () => {
          if (idx === dotBars.length - 1) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            container.scrollTo({ left: maxScroll, behavior: 'smooth' });
          } else {
            container.scrollTo({ left: idx * getScrollStep(), behavior: 'smooth' });
          }
        });
      });

      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const step = getScrollStep();

        let activeIdx;
        if (maxScroll > 0 && scrollLeft >= maxScroll - 25) {
          activeIdx = dotBars.length - 1;
        } else {
          activeIdx = Math.min(
            dotBars.length - 1,
            Math.max(0, Math.round(scrollLeft / step))
          );
        }

        dotBars.forEach((bar, bIdx) => bar.classList.toggle('active', bIdx === activeIdx));
        
        // Ejecutar animación dinámica de reducción/desaparición
        updateCardExitAnimations(container);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', () => {
        handleScroll();
      });

      setTimeout(handleScroll, 100);
    });
  }

  // 7. Inicialización Global
  function initColeccionesTabsWidget() {
    const targets = document.querySelectorAll(`
      #jypesa-colecciones-tabs-widget,
      #jypesa-tabs-colecciones-widget,
      .jypesa-colecciones-tabs-widget-container,
      .jypesa-tabs-colecciones-widget-container,
      [data-jypesa-colecciones-tabs-widget],
      [data-jypesa-tabs-colecciones-widget],
      .jypesa-colecciones-tabs-widget,
      .jypesa-tabs-colecciones-widget
    `);
    if (!targets.length) return;

    targets.forEach(target => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      let lang = (target.getAttribute('data-lang') || '').toLowerCase().trim();
      if (lang !== 'en' && lang !== 'es') {
        const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
        if (htmlLang.startsWith('en')) {
          lang = 'en';
        } else if (window.location.pathname.toLowerCase().startsWith('/en')) {
          lang = 'en';
        } else {
          lang = 'es';
        }
      }

      const collections = readCollectionsFromCMS(target, lang) || (defaultCollectionsByLang[lang] || defaultCollectionsByLang.es);
      target.innerHTML = buildWidgetHtml(collections, lang);
      setupWidgetInteractions(target);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColeccionesTabsWidget);
  } else {
    initColeccionesTabsWidget();
  }
})();
