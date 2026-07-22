(function () {
  if (window.__JypesaTabsColeccionesProductosInitialized) return;
  window.__JypesaTabsColeccionesProductosInitialized = true;

  // 1. Inyectar Fuentes y CSS
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const cssStyles = `
  :root {
    --jypesa-tabs-slate: #506D85;
    --jypesa-tabs-slate-50: rgba(80, 109, 133, 0.5);
    --jypesa-tabs-slate-15: rgba(80, 109, 133, 0.15);
    --jypesa-tabs-blue: #48a9c5;
    --jypesa-tabs-dark-blue: #0088bd;
    --jypesa-tabs-light-cyan: #9ef4f5;
    --jypesa-tabs-bg-light: #f8fafc;
    --jypesa-tabs-white: #ffffff;
    --jypesa-tabs-border-card: rgba(80, 109, 133, 0.12);
  }

  .jypesa-tabs-colecciones-widget-container,
  [data-jypesa-tabs-colecciones-widget],
  #jypesa-tabs-colecciones-widget,
  .jypesa-tabs-colecciones-widget {
    width: 100% !important;
    display: block !important;
    align-self: stretch !important;
    box-sizing: border-box !important;
  }

  .jypesa-tabs-colecciones-widget {
    background: transparent;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-tabs-slate);
    padding: 40px 0;
  }

  /* LAYOUT GENERAL */
  .jypesa-tabs-layout {
    display: flex !important;
    flex-direction: column;
    gap: 28px;
    width: 100% !important;
    align-self: stretch !important;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }

  /* COLUMNA IZQUIERDA (NAVEGACIÓN) */
  .jypesa-tabs-left-col {
    width: 100%;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
  }

  .jypesa-tabs-nav-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .jypesa-tabs-nav-subtitle {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 21px;
    font-weight: 400;
    color: var(--jypesa-tabs-slate);
    letter-spacing: 1.05px;
    position: relative;
    padding-bottom: 10px;
    display: inline-block;
    text-transform: none;
    margin-bottom: 12px;
  }

  .jypesa-tabs-nav-subtitle::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 75%;
    height: 2px;
    background-color: var(--jypesa-tabs-slate);
  }

  .jypesa-tabs-nav-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 26px;
    line-height: 1.1;
    color: var(--jypesa-tabs-slate);
    margin: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }

  .jypesa-tabs-nav-title span {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 52px;
    line-height: 1;
    background: linear-gradient(135deg, var(--jypesa-tabs-blue) 0%, var(--jypesa-tabs-dark-blue) 50%, var(--jypesa-tabs-light-cyan) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    padding: 6px 10px;
    margin-top: -10px;
    margin-bottom: -6px;
    letter-spacing: 2px;
  }

  /* Menú horizontal en móvil */
  .jypesa-tabs-menu {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 20px;
    padding-bottom: 10px;
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1px solid var(--jypesa-tabs-slate-15);
    justify-content: flex-start;
  }

  .jypesa-tabs-menu::-webkit-scrollbar {
    display: none;
  }

  .jypesa-tabs-menu-item {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 22px;
    color: var(--jypesa-tabs-slate);
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    user-select: none;
    line-height: 1.1;
    flex-shrink: 0;
    border-bottom: 1.5px solid transparent;
    letter-spacing: 1.1px;
  }

  .jypesa-tabs-menu-item:hover {
    opacity: 0.8;
  }

  .jypesa-tabs-menu-item.active {
    opacity: 1;
    border-bottom: 1.5px solid var(--jypesa-tabs-slate);
  }

  /* COLUMNA DERECHA (CONTENIDO DINÁMICO) */
  .jypesa-tabs-right-col {
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
  }

  .jypesa-tab-content-panel {
    display: none;
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
    animation: jypesaFadeIn 0.5s ease forwards;
  }

  .jypesa-tab-content-panel.active {
    display: block !important;
    width: 100% !important;
  }

  @keyframes jypesaFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ÁREA DE INFORMACIÓN (FIGMA STYLE) */
  .jypesa-tabs-info-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--jypesa-tabs-slate-15);
    box-sizing: border-box;
    align-items: stretch;
    width: 100% !important;
    align-self: stretch !important;
  }

  .jypesa-tabs-fragrance-block {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }

  .jypesa-tabs-fragrance-line {
    display: none; /* Oculto en móvil */
  }

  .jypesa-tabs-fragrance-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
    align-items: center;
    width: 100%;
  }

  .jypesa-tabs-fragrance-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 14px;
    text-transform: none;
    margin: 0;
    color: var(--jypesa-tabs-slate);
    line-height: 1.1;
  }

  .jypesa-tabs-fragrance-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    font-size: 14px;
    color: var(--jypesa-tabs-slate);
    line-height: 1.4;
  }

  .jypesa-tabs-fragrance-mood {
    margin: 0;
  }

  .jypesa-tabs-fragrance-notes {
    margin: 0;
    white-space: normal;
  }

  /* FRAGRANCE BLOCK MULTICOLUMNA (FIGMA PIXEL PERFECT STYLE) */
  .jypesa-tabs-fragrance-block.figma-columns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .jypesa-tabs-note-col {
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: center;
    text-align: center;
    color: var(--jypesa-tabs-slate);
    font-size: 14px;
    box-sizing: border-box;
  }

  .jypesa-tabs-note-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.1;
    color: var(--jypesa-tabs-slate);
    margin: 0;
    white-space: nowrap;
  }

  .jypesa-tabs-note-text {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.35;
    color: var(--jypesa-tabs-slate);
    margin: 0;
  }

  .jypesa-tabs-note-text p {
    margin: 0;
    line-height: 1.35;
  }

  .jypesa-tabs-mood-heading {
    margin: 0 0 2px 0 !important;
    font-weight: 400;
  }

  .jypesa-tabs-refill-label {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: rgba(80, 109, 133, 0.5);
    text-transform: uppercase;
    margin: 0;
    text-align: center;
    width: 100%;
    letter-spacing: 0.5px;
  }

  .jypesa-tabs-collection-desc {
    font-family: 'Rubik', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    color: var(--jypesa-tabs-slate);
    text-align: center;
  }

  /* SLIDERS DE PRODUCTOS */
  .jypesa-tabs-slider-outer {
    position: relative;
    width: 100% !important;
    align-self: stretch !important;
    box-sizing: border-box;
  }

  .jypesa-tabs-products-container {
    display: flex;
    width: 100% !important;
    min-width: 100% !important;
    gap: 16px;
    align-items: stretch;
    justify-content: flex-start;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 10px 5px 25px 5px !important;
    margin: -10px -5px -25px -5px;
    box-sizing: border-box;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 16px;
  }

  .jypesa-tabs-products-container::-webkit-scrollbar {
    display: none;
  }

  /* Desactivar flechas desktop en móvil */
  .jypesa-tabs-nav-btn {
    display: none !important;
  }

  /* TARJETA DE PRODUCTO (FIGMA STYLE) */
  .jypesa-tabs-product-card {
    flex: 0 0 258px;
    width: 258px;
    background-color: var(--jypesa-tabs-white);
    border: 2px solid transparent;
    border-radius: 15px;
    overflow: visible;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    scroll-snap-align: center;
    text-decoration: none;
    color: inherit;
    gap: 16px;
    padding-bottom: 24px;
  }

  .jypesa-tabs-product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(80, 109, 133, 0.08);
  }

  .jypesa-tabs-card-img-wrap {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 12px;
  }

  .jypesa-tabs-card-img {
    width: 100%;
    height: 100%;
    max-width: 230px;
    max-height: 270px;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jypesa-tabs-product-card:hover .jypesa-tabs-card-img {
    transform: scale(1.05);
  }

  .jypesa-tabs-card-details {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }

  .jypesa-tabs-card-title {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 21px;
    line-height: 1;
    color: var(--jypesa-tabs-slate);
    margin: 0;
  }

  .jypesa-tabs-card-sku {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1;
    color: var(--jypesa-tabs-slate);
    margin: 10px 0 0 0;
    display: block;
  }

  .jypesa-tabs-card-specs {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .jypesa-tabs-card-specs span {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--jypesa-tabs-slate);
    line-height: 1;
    display: block;
    text-align: center;
  }

  /* CONTROLES MÓVILES */
  .jypesa-tabs-controls-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .jypesa-tabs-mobile-nav {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--jypesa-tabs-white);
    border: 1px solid var(--jypesa-tabs-slate-15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--jypesa-tabs-slate);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(80, 109, 133, 0.08);
    transition: all 0.2s ease;
    padding: 0;
    outline: none;
  }

  .jypesa-tabs-mobile-nav:active {
    background: var(--jypesa-tabs-bg-light);
    color: var(--jypesa-tabs-blue);
    transform: scale(0.95);
  }

  .jypesa-tabs-mobile-nav.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .jypesa-tabs-mobile-nav svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .jypesa-tabs-dots-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .jypesa-tabs-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(80, 109, 133, 0.25);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jypesa-tabs-dot.active {
    background: var(--jypesa-tabs-blue);
    width: 20px;
    border-radius: 100px;
  }


  /* ==========================================================================
     MEDIA QUERIES (DESKTOP LAYOUT - OVERRIDES FOR >= 769px)
     ========================================================================== */
  @media (min-width: 769px) {
    .jypesa-tabs-colecciones-widget {
      padding: 60px 0;
    }

    /* LAYOUT A DOS COLUMNAS */
    .jypesa-tabs-layout {
      flex-direction: row;
      gap: 200px !important;
      padding: 0 24px;
      align-items: flex-start;
    }

    /* NAVEGACIÓN LATERAL FIJA */
    .jypesa-tabs-left-col {
      width: 320px;
      flex-shrink: 0;
      position: -webkit-sticky;
      position: sticky;
      top: 40px;
      gap: 24px;
    }

    .jypesa-tabs-nav-header {
      align-items: flex-start;
      text-align: left;
    }

    .jypesa-tabs-nav-title {
      font-size: 37px;
      text-align: left;
      align-items: flex-start;
    }

    .jypesa-tabs-nav-title span {
      font-size: 75px;
      padding: 10px 15px;
      margin-left: 75px;
      margin-top: -18px;
      margin-bottom: -10px;
      letter-spacing: 3.75px;
    }

    /* Menú vertical */
    .jypesa-tabs-menu {
      flex-direction: column;
      gap: 16px;
      padding-top: 10px;
      margin: 0;
      padding-left: 0;
      padding-right: 0;
      border-bottom: none;
      overflow-x: visible;
      justify-content: flex-start;
      width: 100%;
    }

    .jypesa-tabs-menu-item {
      font-size: 22px;
      padding-bottom: 12px;
      flex-shrink: 1;
      width: 206px;
    }

    /* CONTENIDO DERECHO */
    .jypesa-tabs-right-col {
      flex: 1 1 0% !important;
      min-width: 0 !important;
      width: calc(100% - 520px) !important;
      align-self: stretch !important;
    }

    /* Figma vertical stack overrides for desktop */
    .jypesa-tabs-info-area {
      flex-direction: column;
      gap: 20px;
      margin-bottom: 36px;
      padding-bottom: 24px;
      align-items: flex-start;
      border-bottom: 1px solid var(--jypesa-tabs-slate-15);
      width: 100% !important;
      align-self: stretch !important;
    }

    .jypesa-tabs-fragrance-block {
      gap: 23px;
      width: max-content;
      max-width: 100%;
      justify-content: flex-start;
    }

    .jypesa-tabs-fragrance-block.figma-columns {
      gap: 23px;
      width: max-content;
      max-width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
    }

    .jypesa-tabs-fragrance-block.figma-columns .jypesa-tabs-fragrance-line {
      display: block;
      width: 1px;
      height: 49px;
      background-color: var(--jypesa-tabs-slate-15);
      flex-shrink: 0;
    }

    .jypesa-tabs-note-col {
      align-items: flex-start;
      text-align: left;
    }

    .jypesa-tabs-fragrance-line {
      display: block;
      width: 1px;
      height: 49px;
      background-color: var(--jypesa-tabs-slate-15);
      flex-shrink: 0;
    }

    .jypesa-tabs-fragrance-content {
      gap: 9px;
      text-align: left;
      align-items: flex-start;
      width: auto;
    }

    .jypesa-tabs-fragrance-details {
      align-items: flex-start;
    }

    .jypesa-tabs-refill-label {
      text-align: left;
      width: auto;
    }

    .jypesa-tabs-collection-desc {
      text-align: left;
    }

    /* Slider de productos desktop */
    .jypesa-tabs-products-container {
      gap: 24px;
      scroll-padding: 0 40px;
    }

    .jypesa-tabs-product-card {
      scroll-snap-align: start;
    }

    /* Ocultar controles móviles en desktop */
    .jypesa-tabs-controls-mobile {
      display: none !important;
    }

    /* Habilitar y posicionar flechas desktop */
    .jypesa-tabs-nav-btn {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      width: 42px;
      height: 42px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid var(--jypesa-tabs-slate-15);
      border-radius: 50%;
      display: flex !important;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(80, 109, 133, 0.1);
      color: var(--jypesa-tabs-slate);
      transition: all 0.25s ease;
      user-select: none;
      opacity: 0;
      visibility: hidden;
    }

    .jypesa-tabs-nav-btn:hover {
      background: var(--jypesa-tabs-white);
      color: var(--jypesa-tabs-blue);
      box-shadow: 0 6px 16px rgba(80, 109, 133, 0.18);
      border-color: rgba(80, 109, 133, 0.3);
    }

    .jypesa-tabs-nav-btn.prev-btn { left: -16px; }
    .jypesa-tabs-nav-btn.next-btn { right: -16px; }

    .jypesa-tabs-slider-outer:hover .jypesa-tabs-nav-btn {
      opacity: 1;
      visibility: visible;
    }
  }

  /* AJUSTE INTERMEDIO PARA TABLETS / PANTALLAS PEQUEÑAS DESKTOP */
  @media (min-width: 769px) and (max-width: 991px) {
    .jypesa-tabs-layout {
      gap: 32px;
    }
    .jypesa-tabs-left-col {
      width: 240px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 2. Iconos SVG
  const arrowLeftSvg = `<svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>`;
  const arrowRightSvg = `<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>`;

  // No active underline SVG definition needed (handled via CSS border-bottom)

  // 3. Colecciones por defecto (Fallback)
  const defaultCollections = [
    {
      name: 'Jabones',
      id: 'jabones',
      mood: 'Sofisticado, herbal, cítrico',
      refill: 'RELLENABLE',
      salida: 'Limón y Verbena',
      corazon: 'Romero',
      fondo: 'Cedro',
      desc: 'Una caricia fresca y vigorizante para la piel. Formulado con extractos naturales que limpian suavemente mientras envuelven los sentidos en una experiencia aromática revitalizante.',
      products: [
        {
          name: 'Jabón Facial',
          sku: 'JB-FAC-01',
          weight: '28 gr | 0.9 oz',
          packaging: 'Flowpack',
          qty: '300 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
          imgAlt: 'Jabón Facial',
          link: '#'
        },
        {
          name: 'Jabón Corporal',
          sku: 'JB-COR-02',
          weight: '50 gr | 1.7 oz',
          packaging: 'Flowpack',
          qty: '200 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
          imgAlt: 'Jabón Corporal',
          link: '#'
        },
        {
          name: 'Jabón Exfoliante',
          sku: 'JB-EXF-03',
          weight: '40 gr | 1.4 oz',
          packaging: 'Caja de Cartón',
          qty: '250 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
          imgAlt: 'Jabón Exfoliante',
          link: '#'
        }
      ]
    },
    {
      name: 'Botella Boston',
      id: 'botella-boston',
      mood: 'Relajante, lavanda, amaderado',
      refill: 'RELLENABLE',
      salida: 'Lavanda Francesa',
      corazon: 'Eucalipto',
      fondo: 'Sándalo',
      desc: 'Elegancia sustentable para el baño contemporáneo. Nuestras botellas Boston combinan un diseño minimalista de alta gama con fórmulas premium, pensadas para rellenar y reducir el desperdicio.',
      products: [
        {
          name: 'Shampoo Hidratante',
          sku: 'BB-SHM-10',
          weight: '300 ml | 10.1 oz',
          packaging: 'Botella Boston PET',
          qty: '36 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
          imgAlt: 'Shampoo Hidratante',
          link: '#'
        },
        {
          name: 'Acondicionador Suave',
          sku: 'BB-ACD-11',
          weight: '300 ml | 10.1 oz',
          packaging: 'Botella Boston PET',
          qty: '36 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
          imgAlt: 'Acondicionador Suave',
          link: '#'
        },
        {
          name: 'Gel de Baño Herbal',
          sku: 'BB-GEL-12',
          weight: '300 ml | 10.1 oz',
          packaging: 'Botella Boston PET',
          qty: '36 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
          imgAlt: 'Gel de Baño Herbal',
          link: '#'
        }
      ]
    },
    {
      name: 'JH Magic',
      id: 'jh-magic',
      mood: 'Exótico, especiado, dulce',
      refill: 'NO RELLENABLE',
      salida: 'Canela y Vainilla',
      corazon: 'Cardamomo',
      fondo: 'Haba Tonka',
      desc: 'Una experiencia sensorial mística y envolvente. JH Magic transforma la rutina diaria en un ritual de lujo, fusionando notas cálidas y especiadas que perduran delicadamente en la piel.',
      products: [
        {
          name: 'Loción Corporal Magic',
          sku: 'JH-LOC-20',
          weight: '60 ml | 2.0 oz',
          packaging: 'Tubo Aluminio Colapsable',
          qty: '100 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
          imgAlt: 'Loción Corporal Magic',
          link: '#'
        },
        {
          name: 'Jabón de Barra Luxury',
          sku: 'JH-JAB-21',
          weight: '80 gr | 2.8 oz',
          packaging: 'Envoltura de Papel Plisado',
          qty: '150 pzs/Caja',
          imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
          imgAlt: 'Jabón de Barra Luxury',
          link: '#'
        }
      ]
    }
  ];

  // Helper para limpiar texto de nbsp y espacios vacios
  function cleanText(text) {
    if (!text) return '';
    return text.replace(/[\u00a0\s]+/g, ' ').trim();
  }

  // Helper para normalizar strings en slugs
  function makeSlug(text) {
    return cleanText(text)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // 4. Leer del CMS de Webflow
  function readCollectionsFromCMS(target) {
    let sourceSelector = target.getAttribute('data-cms-source');
    let source = sourceSelector ? document.querySelector(sourceSelector) : null;

    if (!source) {
      source = target.querySelector('.jypesa-tabs-colecciones-cms-source');
    }
    if (!source) {
      source = target.previousElementSibling;
      if (source && !source.classList.contains('jypesa-tabs-colecciones-cms-source')) {
        source = null;
      }
    }
    if (!source) {
      source = document.querySelector('.jypesa-tabs-colecciones-cms-source');
    }
    if (!source) {
      // Auto-detectar buscando cualquier elemento de producto en el DOM
      const sampleProdName = document.querySelector('.jypesa-tabs-prod-name');
      if (sampleProdName) {
        source = sampleProdName.closest('.w-dyn-list') || 
                 sampleProdName.closest('.w-dyn-items') || 
                 sampleProdName.closest('.jypesa-tabs-colecciones-cms-source-test') || 
                 sampleProdName.parentElement;
      }
    }

    if (!source) return null;

    let items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) {
      if (source.classList.contains('w-dyn-item')) {
        items = [source];
      } else {
        // En caso de que no tenga w-dyn-item (por ejemplo, maquetación manual o modificada)
        items = Array.from(source.querySelectorAll('.w-dyn-item, div')).filter(el => el.querySelector('.jypesa-tabs-prod-name'));
        // Quitar duplicados si hay anidación
        items = items.filter((el, idx, self) => !self.some((other, oIdx) => oIdx !== idx && other.contains(el)));
      }
    }

    if (!items.length) return null;

    const getElText = el => (el ? cleanText(el.textContent) : '');

    // Leer la marca/colección padre desde el primer elemento
    const parentBrandEl = source.querySelector('.jypesa-tabs-col-parent-brand');
    const parentBrand = getElText(parentBrandEl);

    const collectionsMap = {};

    items.forEach(item => {
      const colNameEl = item.querySelector('.jypesa-tabs-col-name');
      if (!colNameEl) return;
      const colName = getElText(colNameEl);
      if (!colName) return;

      if (!collectionsMap[colName]) {
        const moodEl = item.querySelector('.jypesa-tabs-col-mood');
        const refillEl = item.querySelector('.jypesa-tabs-col-refill');
        const salidaEl = item.querySelector('.jypesa-tabs-col-notes-salida');
        const corazonEl = item.querySelector('.jypesa-tabs-col-notes-corazon');
        const fondoEl = item.querySelector('.jypesa-tabs-col-notes-fondo');
        const descEl = item.querySelector('.jypesa-tabs-col-desc');

        collectionsMap[colName] = {
          name: colName,
          id: makeSlug(colName),
          mood: getElText(moodEl),
          refill: getElText(refillEl).toUpperCase() || 'RELLENABLE',
          salida: getElText(salidaEl),
          corazon: getElText(corazonEl),
          fondo: getElText(fondoEl),
          desc: getElText(descEl),
          products: []
        };
      }

      const prodNameEl = item.querySelector('.jypesa-tabs-prod-name');
      if (prodNameEl) {
        const prodName = getElText(prodNameEl);
        const skuEl = item.querySelector('.jypesa-tabs-prod-sku');
        const weightEl = item.querySelector('.jypesa-tabs-prod-weight');
        const packagingEl = item.querySelector('.jypesa-tabs-prod-packaging');
        const qtyEl = item.querySelector('.jypesa-tabs-prod-qty');
        const imgEl = item.querySelector('.jypesa-tabs-prod-img');
        const linkEl = item.querySelector('.jypesa-tabs-prod-link');

        collectionsMap[colName].products.push({
          name: prodName,
          sku: getElText(skuEl),
          weight: getElText(weightEl),
          packaging: getElText(packagingEl),
          qty: getElText(qtyEl),
          imgSrc: imgEl ? (imgEl.getAttribute('src') || imgEl.src || '') : '',
          imgAlt: imgEl ? (imgEl.getAttribute('alt') || prodName) : prodName,
          link: linkEl ? (linkEl.getAttribute('href') || '#') : '#'
        });
      }
    });

    const collections = Object.values(collectionsMap);
    return collections.length ? { collections, parentBrand } : null;
  }

  // 5. Construir HTML del Widget
  function buildWidgetHtml(collections) {
    return `
      <div class="jypesa-tabs-layout">
        <!-- Columna Izquierda (Navegación) -->
        <div class="jypesa-tabs-left-col">
          <div class="jypesa-tabs-nav-header">
            <span class="jypesa-tabs-nav-subtitle">Productos de la colección</span>
          </div>
          <h2 class="jypesa-tabs-nav-title">Descubre nuestros <span>productos</span></h2>
          <div class="jypesa-tabs-menu">
            ${collections.map((col, idx) => `
              <div class="jypesa-tabs-menu-item ${idx === 0 ? 'active' : ''}" data-tab="${col.id}">
                ${col.name}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Columna Derecha (Contenido Dinámico) -->
        <div class="jypesa-tabs-right-col">
          ${collections.map((col, idx) => {
            const hasMood = Boolean(col.mood && col.mood.trim());
            const hasCorazon = Boolean(col.corazon && col.corazon.trim());
            const hasFondo = Boolean(col.fondo && col.fondo.trim());
            const hasSalida = Boolean(col.salida && col.salida.trim());

            const hasMultiNotes = Boolean(hasCorazon || hasFondo);
            const hasAnyNotes = Boolean(hasMood || hasSalida || hasCorazon || hasFondo);

            let fragranceBlockHtml = '';
            if (hasAnyNotes) {
              if (hasMultiNotes) {
                // Layout Figma Multicolumna cuando existen notas de corazón y/o base
                fragranceBlockHtml = `
                  <div class="jypesa-tabs-fragrance-block figma-columns">
                    ${hasMood ? `
                      <div class="jypesa-tabs-fragrance-line"></div>
                      <div class="jypesa-tabs-note-col">
                        <h4 class="jypesa-tabs-note-title">Sobre la fragancia</h4>
                        <div class="jypesa-tabs-note-text">
                          <p class="jypesa-tabs-mood-heading">Mood:</p>
                          <p>${col.mood}</p>
                        </div>
                      </div>
                    ` : ''}

                    ${hasCorazon ? `
                      <div class="jypesa-tabs-fragrance-line"></div>
                      <div class="jypesa-tabs-note-col">
                        <h4 class="jypesa-tabs-note-title">Notas de corazón</h4>
                        <div class="jypesa-tabs-note-text"><p>${col.corazon}</p></div>
                      </div>
                    ` : ''}

                    ${hasFondo ? `
                      <div class="jypesa-tabs-fragrance-line"></div>
                      <div class="jypesa-tabs-note-col">
                        <h4 class="jypesa-tabs-note-title">Notas de base</h4>
                        <div class="jypesa-tabs-note-text"><p>${col.fondo}</p></div>
                      </div>
                    ` : ''}

                    ${hasSalida ? `
                      <div class="jypesa-tabs-fragrance-line"></div>
                      <div class="jypesa-tabs-note-col">
                        <h4 class="jypesa-tabs-note-title">Notas de salida</h4>
                        <div class="jypesa-tabs-note-text"><p>${col.salida}</p></div>
                      </div>
                    ` : ''}
                  </div>
                `;
              } else {
                // Layout simple original cuando solo está sobre la fragancia (mood) y/o nota de salida
                fragranceBlockHtml = `
                  <div class="jypesa-tabs-fragrance-block">
                    <div class="jypesa-tabs-fragrance-line"></div>
                    
                    <div class="jypesa-tabs-fragrance-content">
                      ${hasMood ? `<h4 class="jypesa-tabs-fragrance-title">Sobre la fragancia</h4>` : ''}
                      <div class="jypesa-tabs-fragrance-details">
                        ${hasMood ? `<p class="jypesa-tabs-fragrance-mood">Mood: ${col.mood}</p>` : ''}
                        ${hasSalida ? `<p class="jypesa-tabs-fragrance-notes">Notas de salida: ${col.salida}</p>` : ''}
                      </div>
                    </div>
                    
                    <div class="jypesa-tabs-fragrance-line"></div>
                  </div>
                `;
              }
            }

            return `
              <div class="jypesa-tab-content-panel ${idx === 0 ? 'active' : ''}" id="panel-${col.id}">
                <!-- Cabecera de Información (Figma Style) -->
                <div class="jypesa-tabs-info-area">
                  ${fragranceBlockHtml}
                  
                  <!-- Refill label -->
                  ${col.refill ? `<div class="jypesa-tabs-refill-label">${col.refill}</div>` : ''}
                  
                  <!-- Description -->
                  ${col.desc ? `<p class="jypesa-tabs-collection-desc">${col.desc}</p>` : ''}
                </div>

                <!-- Slider / Carrusel de Productos -->
                <div class="jypesa-tabs-slider-outer">
                  <div class="jypesa-tabs-nav-btn prev-btn" aria-label="Anterior">
                    ${arrowLeftSvg}
                  </div>
                  <div class="jypesa-tabs-nav-btn next-btn" aria-label="Siguiente">
                    ${arrowRightSvg}
                  </div>

                  <div class="jypesa-tabs-products-container">
                    ${col.products.map(prod => `
                      <a href="${prod.link}" class="jypesa-tabs-product-card" ${prod.link !== '#' ? 'target="_blank"' : ''}>
                        <div class="jypesa-tabs-card-img-wrap">
                          ${prod.imgSrc ? `<img class="jypesa-tabs-card-img" src="${prod.imgSrc}" alt="${prod.imgAlt}" loading="lazy">` : ''}
                        </div>
                        <div class="jypesa-tabs-card-details">
                          <h4 class="jypesa-tabs-card-title">${prod.name}</h4>
                          ${prod.sku ? `<span class="jypesa-tabs-card-sku">${prod.sku}</span>` : ''}
                          <div class="jypesa-tabs-card-specs">
                            ${prod.weight ? `<span>${prod.weight}</span>` : ''}
                            ${prod.packaging ? `<span>${prod.packaging}</span>` : ''}
                            ${prod.qty ? `<span>${prod.qty}</span>` : ''}
                          </div>
                        </div>
                      </a>
                    `).join('')}
                  </div>

                  <!-- Controles móviles y Paginación -->
                  <div class="jypesa-tabs-controls-mobile">
                    <button class="jypesa-tabs-mobile-nav prev-mobile-btn" aria-label="Anterior">
                      ${arrowLeftSvg}
                    </button>
                    <div class="jypesa-tabs-dots-container">
                      ${col.products.map((_, pIdx) => `
                        <span class="jypesa-tabs-dot ${pIdx === 0 ? 'active' : ''}" data-index="${pIdx}"></span>
                      `).join('')}
                    </div>
                    <button class="jypesa-tabs-mobile-nav next-mobile-btn" aria-label="Siguiente">
                      ${arrowRightSvg}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 6. Configurar Eventos e Interactividad
  function setupWidgetInteractions(target, collections) {
    const tabButtons = target.querySelectorAll('.jypesa-tabs-menu-item');
    const contentPanels = target.querySelectorAll('.jypesa-tab-content-panel');

    // Manejo de tabs
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        // Desactivar todos los botones
        tabButtons.forEach(b => b.classList.remove('active'));
        // Desactivar todos los paneles
        contentPanels.forEach(p => p.classList.remove('active'));

        // Activar el actual
        btn.classList.add('active');
        const activePanel = target.querySelector(`#panel-${tabId}`);
        if (activePanel) {
          activePanel.classList.add('active');
          // Actualizar el carrusel de este panel para centrar estados de navegación
          const container = activePanel.querySelector('.jypesa-tabs-products-container');
          if (container) handleScroll(container, activePanel);
        }
      });
    });

    // Configurar cada Slider de productos en los paneles
    contentPanels.forEach(panel => {
      const container = panel.querySelector('.jypesa-tabs-products-container');
      const prevBtn = panel.querySelector('.prev-btn');
      const nextBtn = panel.querySelector('.next-btn');
      const prevMobileBtn = panel.querySelector('.prev-mobile-btn');
      const nextMobileBtn = panel.querySelector('.next-mobile-btn');
      const dots = panel.querySelectorAll('.jypesa-tabs-dot');

      if (!container) return;

      const isMobile = () => window.innerWidth <= 768;

      const getCardWidth = () => {
        const card = container.querySelector('.jypesa-tabs-product-card');
        if (!card) return 270;
        return card.getBoundingClientRect().width;
      };

      const getScrollStep = () => {
        const width = getCardWidth();
        const gap = isMobile() ? 16 : 24;
        return width + gap;
      };

      const getScrollStepByMode = (mobileMode = false) => {
        const step = getScrollStep();
        if (mobileMode || isMobile()) {
          return step;
        }
        return step * 2; // Scroll de 2 en 2 en Desktop
      };

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          container.scrollBy({ left: -getScrollStepByMode(false), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
          container.scrollBy({ left: getScrollStepByMode(false), behavior: 'smooth' });
        });
      }

      if (prevMobileBtn && nextMobileBtn) {
        prevMobileBtn.addEventListener('click', () => {
          container.scrollBy({ left: -getScrollStepByMode(true), behavior: 'smooth' });
        });
        nextMobileBtn.addEventListener('click', () => {
          container.scrollBy({ left: getScrollStepByMode(true), behavior: 'smooth' });
        });
      }

      dots.forEach((dot, dIdx) => {
        dot.addEventListener('click', () => {
          const step = getScrollStep();
          container.scrollTo({ left: dIdx * step, behavior: 'smooth' });
        });
      });

      // Manejar scroll para actualizar botones y dots
      const onScroll = () => handleScroll(container, panel);
      container.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onScroll);
      setTimeout(onScroll, 200);
    });
  }

  function handleScroll(container, panel) {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const cardEl = container.querySelector('.jypesa-tabs-product-card');
    if (!cardEl) return;
    
    const cardWidth = cardEl.getBoundingClientRect().width;
    const gap = window.innerWidth <= 768 ? 16 : 24;
    const step = cardWidth + gap;

    const prevBtn = panel.querySelector('.prev-btn');
    const nextBtn = panel.querySelector('.next-btn');
    const prevMobileBtn = panel.querySelector('.prev-mobile-btn');
    const nextMobileBtn = panel.querySelector('.next-mobile-btn');
    const dots = panel.querySelectorAll('.jypesa-tabs-dot');

    const activeIndex = Math.min(
      dots.length - 1,
      Math.max(0, Math.round(scrollLeft / step))
    );

    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeIndex));

    if (prevBtn && nextBtn) {
      prevBtn.style.opacity = scrollLeft <= 5 ? '0' : '1';
      prevBtn.style.visibility = scrollLeft <= 5 ? 'hidden' : 'visible';
      nextBtn.style.opacity = scrollLeft >= maxScroll - 5 ? '0' : '1';
      nextBtn.style.visibility = scrollLeft >= maxScroll - 5 ? 'hidden' : 'visible';
    }

    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.classList.toggle('disabled', scrollLeft <= 5);
      nextMobileBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 5);
    }
  }

  // 7. Inicializador principal del widget
  function initTabsColeccionesWidget() {
    const targets = document.querySelectorAll('.jypesa-tabs-colecciones-widget-container, [data-jypesa-tabs-colecciones-widget], #jypesa-tabs-colecciones-widget');
    if (!targets.length) return;

    targets.forEach(target => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      const data = readCollectionsFromCMS(target);
      const collections = data ? data.collections : defaultCollections;

      target.innerHTML = buildWidgetHtml(collections);

      setupWidgetInteractions(target, collections);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabsColeccionesWidget);
  } else {
    initTabsColeccionesWidget();
  }
})();
