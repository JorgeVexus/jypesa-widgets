(function () {
  if (window.__JypesaHoteleriaTabs) return;
  window.__JypesaHoteleriaTabs = true;

  // ─── Fuentes ─────────────────────────────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Rubik:wght@300;400;500&display=swap';
  document.head.appendChild(fontLink);

  // ─── CSS ──────────────────────────────────────────────────────────────────────
  const css = `
  :root {
    --jht-slate:       #506D85;
    --jht-slate-50:    rgba(80, 109, 133, 0.5);
    --jht-slate-15:    rgba(80, 109, 133, 0.15);
    --jht-blue:        #48A9C5;
  }

  /* ── Widget wrapper ─────────────────────────────────────────── */
  .jht-widget {
    width: 100%;
    font-family: 'Rubik', sans-serif;
    color: var(--jht-slate);
    box-sizing: border-box;
    background: transparent;
  }

  /* ── Layout 2 columnas (desktop) ────────────────────────────── */
  .jht-inner {
    display: flex;
    width: 100%;
    min-height: 520px;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ── COLUMNA IZQUIERDA ──────────────────────────────────────── */
  .jht-left {
    flex: 0 0 clamp(300px, 28vw, 460px);
    width: clamp(300px, 28vw, 460px);
    position: relative;
    padding-left: clamp(16px, 2.5vw, 48px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* Etiqueta "Segmento • Hotelería" (Línea solo bajo la primera palabra) */
  .jht-segment-label {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 0;
    margin-top: 0;
    align-self: flex-start;
  }

  .jht-segment-first {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(17px, 1.4vw, 21px);
    color: var(--jht-slate);
    letter-spacing: 1.05px;
    white-space: nowrap;
    line-height: 1;
    border-bottom: 2px solid var(--jht-slate);
    padding-bottom: 10px;
  }

  .jht-segment-rest {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(17px, 1.4vw, 21px);
    color: var(--jht-slate);
    letter-spacing: 1.05px;
    white-space: nowrap;
    line-height: 1;
    padding-bottom: 10px;
  }

  /* Título de sección */
  .jht-title {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(32px, 4.2vw, 76px);
    line-height: 1.05;
    color: var(--jht-slate);
    margin: 0;
    margin-top: 18px;
    width: 100%;
    max-width: 480px;
    word-break: normal;
    overflow-wrap: normal;
    hyphens: none;
  }

  /* Descripción general */
  .jht-subtitle {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: clamp(14px, 1.05vw, 16px);
    line-height: 1.35;
    color: var(--jht-slate);
    margin: 0;
    margin-top: 23px;
    width: 100%;
    max-width: 422px;
  }

  /* ── Contenedor de tabs (lista vertical) ────────────────────── */
  .jht-tabs-nav {
    margin-top: clamp(24px, 2.5vw, 47px);
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 2.5vw, 47px);
    width: 100%;
    max-width: 405px;
  }

  /* Tab individual */
  .jht-tab-btn {
    position: relative;
    height: 50px;
    width: 100%;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    outline: none;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Hover: desliza el tab 6 px a la derecha (sólo inactivos) */
  .jht-tab-btn:not(.active):hover {
    transform: translateX(6px);
    opacity: 0.8;
  }

  /* Texto del tab */
  .jht-tab-btn-label {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(17px, 1.4vw, 22px);
    line-height: 1;
    letter-spacing: 1.1px;
    color: var(--jht-slate);
    opacity: 0.5;
    transition: opacity 0.3s ease, font-size 0.3s ease, left 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    position: absolute;
    left: clamp(40px, 6vw, 132px);
  }

  /* Estado activo del tab */
  .jht-tab-btn.active .jht-tab-btn-label {
    opacity: 1;
    font-size: clamp(17px, 1.4vw, 22px);
    left: clamp(65px, 8vw, 161px);
  }

  /* Línea decorativa bajo el tab activo */
  .jht-tab-btn-line {
    position: absolute;
    bottom: -12px;
    left: clamp(65px, 8vw, 163px);
    width: clamp(130px, 14vw, 206px);
    height: 1.5px;
    background: var(--jht-slate);
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 1px;
  }

  .jht-tab-btn.active .jht-tab-btn-line {
    opacity: 1;
    transform: scaleX(1);
  }

  /* ── COLUMNA DERECHA (panel de contenido) ───────────────────── */
  .jht-right {
    flex: 1;
    min-width: 0;
    position: relative;
    overflow: hidden;
    min-height: 520px;
  }

  /* Panel de contenido (uno por tab) */
  .jht-panel {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(20px, 2.5vw, 47px);
    padding-left: clamp(20px, 2.5vw, 45px);
    padding-right: clamp(16px, 2vw, 30px);
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateY(20px);
  }

  .jht-panel.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  /* Texto descriptivo del panel */
  .jht-panel-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: clamp(14.5px, 1.15vw, 18px);
    line-height: 1.35;
    color: var(--jht-slate);
    margin: 0;
    width: 100%;
    max-width: 700px;
  }

  /* Contenedor de imágenes */
  .jht-images {
    display: flex;
    gap: clamp(8px, 1vw, 12px);
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
  }

  /* Imagen individual */
  .jht-img-wrap {
    flex: 1 1 0px;
    min-width: 0;
    max-width: 390px;
    height: auto;
    aspect-ratio: 1 / 1;
    background: #d9d9d9;
    overflow: hidden;
    position: relative;
    flex-shrink: 1;
  }

  .jht-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jht-img-wrap:hover img {
    transform: scale(1.04);
  }


  @media (max-width: 1100px) {

    /* Desactivar hover translateX en touch/tablet (en horizontal no tiene sentido) */
    .jht-tab-btn:not(.active):hover {
      transform: none;
      opacity: 1;
    }

    .jht-inner {
      flex-direction: column;
      min-height: auto;
      gap: 0;
    }

    /* ── Columna izquierda → full width ── */
    .jht-left {
      flex: none;
      width: 100%;
      padding: 0 40px;
    }

    .jht-segment-label {
      margin-top: 0;
    }

    .jht-title {
      font-size: 72px;
      width: 100%;
      margin-top: 14px;
    }

    .jht-subtitle {
      width: 100%;
      margin-top: 16px;
      font-size: 15px;
    }

    /* ── Tabs → flex-wrap para evitar desbordamientos sin mover la pantalla ── */
    .jht-tabs-nav {
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      gap: 10px 18px;
      margin-top: 28px;
      border-bottom: 1.5px solid var(--jht-slate-15);
      padding-bottom: 10px;
    }

    .jht-tabs-nav::-webkit-scrollbar { display: none; }

    .jht-tab-btn {
      /* Cada tab es una píldora horizontal */
      height: auto;
      width: auto;
      flex-shrink: 0;
      padding: 14px 28px;
      align-items: center;
      /* Reemplazamos la línea vertical por borde inferior */
      border-bottom: 2.5px solid transparent;
      transition: border-color 0.3s ease, opacity 0.3s ease;
    }

    .jht-tab-btn-label {
      /* Volvemos al flujo normal (sin absolute) */
      position: static;
      font-size: 18px;
      opacity: 0.45;
      letter-spacing: 0.9px;
      /* Eliminamos el transition de left (no aplica) */
      transition: opacity 0.3s ease;
    }

    .jht-tab-btn.active {
      border-bottom-color: var(--jht-slate);
    }

    .jht-tab-btn.active .jht-tab-btn-label {
      opacity: 1;
      font-size: 18px;
    }

    /* Ocultamos la línea decorativa vertical de desktop */
    .jht-tab-btn-line {
      display: none;
    }

    /* ── Columna derecha → full width ── */
    .jht-right {
      width: 100%;
      padding: 0 40px;
      margin-top: 32px;
    }

    /* Panels: stacked pero ocultos, sin posición absolute */
    .jht-panel {
      position: static;
      display: none;
      opacity: 0;
      pointer-events: none;
      transform: none;
      gap: 24px;
      padding-left: 0;
      padding: 0;
    }

    .jht-panel.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
    }

    .jht-panel-desc {
      font-size: 16px;
      width: 100%;
      line-height: 1.5;
    }

    /* Imágenes en carrusel horizontal con snap */
    .jht-images {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      scroll-snap-type: x mandatory;
      scroll-padding: 0 40px;
      /* Compensa el padding del contenedor para scroll edge-to-edge */
      margin: 0 -40px;
      padding: 4px 40px 16px;
      gap: 16px;
    }

    .jht-images::-webkit-scrollbar { display: none; }

    .jht-img-wrap {
      width: 320px;
      height: 320px;
      flex-shrink: 0;
      scroll-snap-align: start;
    }
  }

  /* ════════════════════════════════════════════════════════════════
     RESPONSIVE — Mobile grande (≤768px)
     Estrategia: reducir padding, imágenes más pequeñas, título más compacto
  ════════════════════════════════════════════════════════════════ */
  @media (max-width: 768px) {

    .jht-left {
      padding: 0 24px;
    }

    .jht-title {
      font-size: clamp(30px, 7vw, 44px);
    }

    .jht-right {
      padding: 0 24px;
      margin-top: 24px;
    }

    .jht-tab-btn {
      padding: 12px 20px;
    }

    .jht-tab-btn-label {
      font-size: 16px;
    }

    .jht-tab-btn.active .jht-tab-btn-label {
      font-size: 16px;
    }

    .jht-panel-desc {
      font-size: 15px;
    }

    /* Imágenes a tamaño de tarjeta móvil */
    .jht-images {
      margin: 0 -24px;
      padding: 4px 24px 16px;
      scroll-padding: 0 24px;
    }

    .jht-img-wrap {
      /* Casi full-width para ver 1 imagen + un peek de la siguiente */
      width: calc(100vw - 72px);
      max-width: 340px;
      height: 280px;
    }
  }

  /* ════════════════════════════════════════════════════════════════
     RESPONSIVE — Mobile pequeño (≤480px)
     Estrategia: full-bleed, título compacto, imágenes full snap
  ════════════════════════════════════════════════════════════════ */
  @media (max-width: 480px) {

    .jht-left {
      padding: 0 16px;
    }

    .jht-title {
      font-size: clamp(26px, 7.5vw, 36px);
      margin-top: 10px;
    }

    .jht-subtitle {
      font-size: 14px;
      margin-top: 12px;
    }

    .jht-tabs-nav {
      margin-top: 20px;
    }

    .jht-tab-btn {
      padding: 10px 14px;
    }

    .jht-tab-btn-label {
      font-size: 15px;
      letter-spacing: 0.5px;
    }

    .jht-tab-btn.active .jht-tab-btn-label {
      font-size: 15px;
    }

    .jht-right {
      padding: 0 16px;
      margin-top: 20px;
    }

    .jht-panel {
      gap: 20px;
    }

    .jht-panel-desc {
      font-size: 14px;
      line-height: 1.55;
    }

    /* Imágenes full width con snap */
    .jht-images {
      margin: 0 -16px;
      padding: 4px 16px 20px;
      scroll-padding: 0 16px;
      gap: 12px;
    }

    .jht-img-wrap {
      width: calc(100vw - 48px);
      max-width: 100%;
      height: 240px;
    }
  }

  /* ── Dots de paginación para carrusel de imágenes (mobile) ── */
  @media (max-width: 1100px) {
    .jht-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      margin-top: 16px;
    }

    .jht-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(80, 109, 133, 0.25);
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .jht-dot.active {
      background: var(--jht-slate);
      width: 22px;
      border-radius: 100px;
    }
  }

  /* Ocultar dots en desktop */
  .jht-dots {
    display: none;
  }

  /* Ocultar listas fuente del CMS de Webflow para que no rendericen texto/imágenes sin estilo */
  .jht-cms-source, [class*="cms-source-"] {
    display: none !important;
  }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ─── Datos fallback ───────────────────────────────────────────────────────────
  const FALLBACK_DATA = {
    segmentLabel: 'Segmento • Hotelería',
    sectionTitle: 'Hotelería',
    sectionDesc: 'Soluciones diseñadas para elevar la experiencia del huésped y optimizar la operación hotelera.',
    tabs: [
      {
        id: 'hoteles-independientes',
        label: 'Hoteles independientes',
        desc: 'Soluciones accesibles, estéticas y funcionales para hoteles que buscan destacar sin complicar su operación.',
        images: [
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4d5d430c17b94a5ca3d29d_Nosotros%20jypesa.avif',
            alt: 'Hotel independiente - imagen 1'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5bdf58a79c5b45a15c2b55_Desarrollo-personalizado-hero.avif',
            alt: 'Hotel independiente - imagen 2'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5d71d7a5db3796b30d0da4_blur.avif',
            alt: 'Hotel independiente - imagen 3'
          }
        ]
      },
      {
        id: 'cadenas-hoteleras',
        label: 'Cadenas hoteleras',
        desc: 'Programas de abastecimiento centralizado, consistencia de producto en todas las propiedades y acceso a la plataforma Avendra para simplificar compras.',
        images: [
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5f9b1e1e7a654eba705955_sustentabilidad%2001.webp',
            alt: 'Cadena hotelera - imagen 1'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5f9b1ee752754a4bde9fe7_sustentabilidad%2002.webp',
            alt: 'Cadena hotelera - imagen 2'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5f9b27c2ad81f74357967e_sustentabilidad%2003.webp',
            alt: 'Cadena hotelera - imagen 3'
          }
        ]
      },
      {
        id: 'grupos-hoteleros',
        label: 'Grupos hoteleros & operadores',
        desc: 'Gestión multi-marca y multi-mercado. Desarrollo de colecciones exclusivas por marca, private label y coordinación logística internacional desde EE.UU. y México.',
        images: [
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5f9b1f3fd0d0b22e5f8120_sustentabilidad%2004.webp',
            alt: 'Grupo hotelero - imagen 1'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e8fd701a7a1134c22_iso%202276.avif',
            alt: 'Grupo hotelero - imagen 2'
          },
          {
            src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e4489cf12b17d47f4_peta.avif',
            alt: 'Grupo hotelero - imagen 3'
          }
        ]
      }
    ]
  };

  // ─── Leer datos desde el CMS de Webflow ──────────────────────────────────────
  function readFromCMS(container) {
    let source = null;
    const rawAttr = container.getAttribute('data-cms-source') || '';
    const cmsSel = rawAttr.trim().replace(/^['"]|['"]$/g, '');

    if (cmsSel) {
      const cleanSel = cmsSel.replace(/^[.#]/, '');
      source = document.querySelector(cmsSel) ||
               document.querySelector('.' + cleanSel) ||
               document.querySelector('#' + cleanSel) ||
               (container.parentElement ? container.parentElement.querySelector('.' + cleanSel) : null);
    }

    // Si no tiene data-cms-source explícito, buscar dentro del mismo contenedor padre o hermano
    if (!source && container.parentElement) {
      source = container.parentElement.querySelector('.jht-cms-source, [class*="cms-source-"]');
    }

    // Si no se especificó data-cms-source y no hay local, buscar global
    if (!source && !cmsSel) {
      source = document.querySelector('.jht-cms-source, [class*="cms-source-"]');
    }
    if (!source) return null;

    // Forzar el ocultamiento de la fuente en el DOM
    source.style.display = 'none';

    const items = Array.from(source.querySelectorAll('.w-dyn-item, .jht-cms-tab'));
    if (!items.length) return null;

    // Datos del header (opcionales, tomados del primer elemento o del wrapper)
    const segmentLabelEl = source.querySelector('.jht-cms-segment-label');
    const sectionTitleEl = source.querySelector('.jht-cms-section-title');
    const sectionDescEl  = source.querySelector('.jht-cms-section-desc');

    const tabs = items.map(item => {
      const labelEl  = item.querySelector('.jht-cms-tab-label');
      const descEl   = item.querySelector('.jht-cms-tab-desc');
      const imgEls   = Array.from(item.querySelectorAll('.jht-cms-tab-img'));
      const label    = labelEl ? labelEl.textContent.trim() : '';
      if (!label) return null;

      const id = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      const images = imgEls.map(img => ({
        src: img.getAttribute('src') || img.src || '',
        alt: img.getAttribute('alt') || label
      }));

      return {
        id,
        label,
        desc: descEl ? descEl.textContent.trim() : '',
        images
      };
    }).filter(Boolean);

    if (!tabs.length) return null;

    return {
      segmentLabel: segmentLabelEl ? segmentLabelEl.textContent.trim() : FALLBACK_DATA.segmentLabel,
      sectionTitle: sectionTitleEl ? sectionTitleEl.textContent.trim() : FALLBACK_DATA.sectionTitle,
      sectionDesc:  sectionDescEl  ? sectionDescEl.textContent.trim()  : FALLBACK_DATA.sectionDesc,
      tabs
    };
  }

  function formatSegmentLabel(label) {
    if (!label) return '';
    const trimmed = label.trim();
    const spaceIdx = trimmed.indexOf(' ');
    if (spaceIdx === -1) {
      return `<span class="jht-segment-first">${trimmed}</span>`;
    }
    const firstWord = trimmed.substring(0, spaceIdx);
    const rest = trimmed.substring(spaceIdx).trim();
    return `<span class="jht-segment-first">${firstWord}</span><span class="jht-segment-rest">${rest}</span>`;
  }

  // ─── Construir HTML ───────────────────────────────────────────────────────────
  function buildWidget(data) {
    const leftPanels = data.tabs.map((tab, i) => `
      <button class="jht-tab-btn ${i === 0 ? 'active' : ''}" data-tab="${tab.id}" aria-selected="${i === 0}">
        <span class="jht-tab-btn-label">${tab.label}</span>
        <span class="jht-tab-btn-line" aria-hidden="true"></span>
      </button>
    `).join('');

    const rightPanels = data.tabs.map((tab, i) => `
      <div class="jht-panel ${i === 0 ? 'active' : ''}" data-panel-tab="${tab.id}" role="tabpanel" aria-labelledby="jht-btn-${tab.id}">
        <p class="jht-panel-desc">${tab.desc}</p>
        <div class="jht-images" data-panel-id="${tab.id}">
          ${tab.images.map(img => `
            <div class="jht-img-wrap">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
          `).join('')}
        </div>
        ${tab.images.length > 1 ? `
        <div class="jht-dots" role="tablist" aria-label="Imágenes">
          ${tab.images.map((_, idx) => `
            <span class="jht-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}" role="tab" aria-label="Imagen ${idx + 1}"></span>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `).join('');

    return `
      <div class="jht-widget">
        <div class="jht-inner">

          <!-- ── Columna Izquierda ── -->
          <div class="jht-left">
            <div class="jht-segment-label">
              ${formatSegmentLabel(data.segmentLabel)}
            </div>
            <h2 class="jht-title">${data.sectionTitle}</h2>
            <p class="jht-subtitle">${data.sectionDesc}</p>

            <nav class="jht-tabs-nav" role="tablist" aria-label="${data.sectionTitle}">
              ${leftPanels}
            </nav>
          </div>

          <!-- ── Columna Derecha ── -->
          <div class="jht-right">
            ${rightPanels}
          </div>

        </div>
      </div>
    `;
  }

  // ─── Activar tab ────────────────────────────────────────────────────
  function activateTab(container, tabId) {
    // Botones
    container.querySelectorAll('.jht-tab-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    // Panels
    container.querySelectorAll('.jht-panel').forEach(panel => {
      const isActive = panel.getAttribute('data-panel-tab') === tabId;
      panel.classList.toggle('active', isActive);
      // Al activar un panel, resetear el carrusel de imágenes al inicio
      if (isActive) {
        const images = panel.querySelector('.jht-images');
        if (images) images.scrollLeft = 0;
        // Resetear dots al primer slide
        panel.querySelectorAll('.jht-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === 0);
        });
      }
    });
  }

  // ─── Inicializar una instancia ──────────────────────────────────────────────
  function initInstance(container) {
    const data = readFromCMS(container) || FALLBACK_DATA;
    container.innerHTML = buildWidget(data);

    // Eventos de clic en los tabs
    container.querySelectorAll('.jht-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activateTab(container, btn.getAttribute('data-tab'));
      });
    });

    // Sincronizar dots con el scroll horizontal del carrusel de imágenes
    container.querySelectorAll('.jht-images').forEach(imagesEl => {
      const panel = imagesEl.closest('.jht-panel');
      if (!panel) return;
      const dots = panel.querySelectorAll('.jht-dot');
      if (!dots.length) return;
      const items = imagesEl.querySelectorAll('.jht-img-wrap');

      // Hacer clic en un dot desplaza el carrusel a esa imagen
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          const target = items[idx];
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          }
        });
      });

      // IntersectionObserver: actualiza el dot activo al hacer scroll
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              const idx = Array.from(items).indexOf(entry.target);
              if (idx < 0) return;
              dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
          });
        },
        { root: imagesEl, threshold: 0.5 }
      );

      items.forEach(item => observer.observe(item));
    });

    // ─── Soporte para Deep Linking (Abrir tab desde URL hash o ?tab=) ────────
    function cleanAlpha(str) {
      if (!str) return '';
      return decodeURIComponent(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    }

    function slugify(str) {
      if (!str) return '';
      return decodeURIComponent(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    function checkUrlHash() {
      const rawHash = (window.location.hash || '').replace('#', '').trim();
      const urlParams = new URLSearchParams(window.location.search);
      const rawParam = (urlParams.get('tab') || '').trim();
      const target = rawHash || rawParam;

      if (!target) return;

      const tSlug = slugify(target);
      const tAlpha = cleanAlpha(target);

      const buttons = Array.from(container.querySelectorAll('.jht-tab-btn'));
      const match = buttons.find(btn => {
        const tabId = btn.getAttribute('data-tab') || '';
        const labelText = btn.querySelector('.jht-tab-btn-label')?.textContent || '';
        
        const idSlug = slugify(tabId);
        const idAlpha = cleanAlpha(tabId);
        const lblSlug = slugify(labelText);
        const lblAlpha = cleanAlpha(labelText);

        return (
          idSlug === tSlug ||
          lblSlug === tSlug ||
          idAlpha === tAlpha ||
          lblAlpha === tAlpha ||
          (tAlpha.length >= 3 && (idAlpha.includes(tAlpha) || lblAlpha.includes(tAlpha) || tAlpha.includes(idAlpha) || tAlpha.includes(lblAlpha)))
        );
      });

      if (match) {
        const targetTabId = match.getAttribute('data-tab');
        activateTab(container, targetTabId);
        setTimeout(() => {
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }

    checkUrlHash();
    window.addEventListener('hashchange', checkUrlHash);
  }

  // ─── Buscar y lanzar todos los contenedores ───────────────────────────────────
  function init() {
    // Recolectar todos los contenedores posibles sin duplicar
    const seen = new Set();
    const all = [];

    // 1. Contenedores por clase / atributo
    document.querySelectorAll('.jht-widget-container, [data-widget="hoteleria-tabs"]')
      .forEach(el => { if (!seen.has(el)) { seen.add(el); all.push(el); } });

    // 2. Contenedor por id de Webflow embed
    const byId = document.getElementById('jypesa-hoteleria-tabs-widget');
    if (byId && !seen.has(byId)) { seen.add(byId); all.push(byId); }

    // 3. Contenedor legacy
    const legacy = document.getElementById('jht-widget');
    if (legacy && !seen.has(legacy)) { seen.add(legacy); all.push(legacy); }

    if (all.length === 0) {
      console.warn('[jht] No se encontró ningún contenedor. Agrega un div con class="jht-widget-container" o id="jypesa-hoteleria-tabs-widget".');
      return;
    }

    all.forEach(initInstance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
