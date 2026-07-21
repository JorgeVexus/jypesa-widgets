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
    min-height: 562px;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ── COLUMNA IZQUIERDA ──────────────────────────────────────── */
  .jht-left {
    flex: 0 0 503px;
    width: 503px;
    position: relative;
    padding-left: 52px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* Etiqueta "Segmento • Hotelería" */
  .jht-segment-label {
    display: inline-flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--jht-slate);
    margin-bottom: 0;
    margin-top: 0;
    align-self: flex-start;
  }

  .jht-segment-label span {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 21px;
    color: var(--jht-slate);
    letter-spacing: 1.05px;
    white-space: nowrap;
    line-height: 1;
  }

  /* Título "Hotelería" grande */
  .jht-title {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 90px;
    line-height: 1;
    color: var(--jht-slate);
    margin: 0;
    margin-top: 18px;
    width: 422px;
    word-break: break-word;
  }

  /* Descripción general */
  .jht-subtitle {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.35;
    color: var(--jht-slate);
    margin: 0;
    margin-top: 23px;
    width: 422px;
  }

  /* ── Contenedor de tabs (lista vertical) ────────────────────── */
  .jht-tabs-nav {
    margin-top: 47px;
    display: flex;
    flex-direction: column;
    gap: 47px;
    width: 405px;
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
    font-size: 22px;
    line-height: 1;
    letter-spacing: 1.1px;
    color: var(--jht-slate);
    opacity: 0.5;
    transition: opacity 0.3s ease, font-size 0.3s ease, left 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    position: absolute;
    /* Alineación por defecto (inactivo): igual al Figma "default" */
    left: 132px;
  }

  /* Estado activo del tab */
  .jht-tab-btn.active .jht-tab-btn-label {
    opacity: 1;
    font-size: 22px;
    left: 161px; /* Coincide con Figma "select" state */
  }

  /* Línea decorativa bajo el tab activo */
  .jht-tab-btn-line {
    position: absolute;
    bottom: -12px;
    left: 163px;
    width: 206px;
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
    position: relative;
    overflow: hidden;
    min-height: 562px; /* Altura del Figma — garantiza que los paneles absolutos sean visibles */
  }

  /* Panel de contenido (uno por tab) */
  .jht-panel {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 47px;
    padding-left: 55px;
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
    font-size: 18px;
    line-height: 1.35;
    color: var(--jht-slate);
    margin: 0;
    width: 700px;
    max-width: 100%;
  }

  /* Contenedor de imágenes */
  .jht-images {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    flex-shrink: 0;
  }

  /* Imagen individual */
  .jht-img-wrap {
    width: 390px;
    height: 390px;
    background: #d9d9d9;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
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

  /* ════════════════════════════════════════════════════════════════
     RESPONSIVE — Tablet (≤1100px)
     Estrategia: layout en columna, tabs horizontales con scroll snap,
     imágenes en carrusel horizontal
  ════════════════════════════════════════════════════════════════ */
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

    /* ── Tabs → fila horizontal con scroll + indicador de línea ── */
    .jht-tabs-nav {
      flex-direction: row;
      width: 100%;
      gap: 0;
      margin-top: 28px;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      /* Borde inferior como pista visual */
      border-bottom: 1.5px solid var(--jht-slate-15);
      padding-bottom: 0;
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
      font-size: 58px;
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
      font-size: 48px;
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
    const cmsSel = container.getAttribute('data-cms-source');
    if (cmsSel) source = document.querySelector(cmsSel);
    if (!source) source = document.querySelector('.jht-cms-source');
    if (!source) return null;

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

      const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

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

  // ─── Construir HTML ───────────────────────────────────────────────────────────
  function buildWidget(data) {
    const leftPanels = data.tabs.map((tab, i) => `
      <button class="jht-tab-btn ${i === 0 ? 'active' : ''}" data-tab="${tab.id}" aria-selected="${i === 0}">
        <span class="jht-tab-btn-label">${tab.label}</span>
        <span class="jht-tab-btn-line" aria-hidden="true"></span>
      </button>
    `).join('');

    const rightPanels = data.tabs.map((tab, i) => `
      <div class="jht-panel ${i === 0 ? 'active' : ''}" id="jht-panel-${tab.id}" role="tabpanel" aria-labelledby="jht-btn-${tab.id}">
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
              <span>${data.segmentLabel}</span>
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
      // Auto-scroll el tab activo al centro de la barra horizontal (mobile/tablet)
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Panels
    container.querySelectorAll('.jht-panel').forEach(panel => {
      const isActive = panel.id === `jht-panel-${tabId}`;
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
