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
    width: 100% !important;
    max-width: 100% !important;
    font-family: 'Rubik', sans-serif;
    color: var(--jht-slate);
    box-sizing: border-box !important;
    background: transparent;
    overflow-x: hidden !important;
  }

  /* ── Layout 2 columnas (desktop) ────────────────────────────── */
  .jht-inner {
    display: flex;
    width: 100% !important;
    max-width: 100% !important;
    min-height: 520px;
    position: relative;
    box-sizing: border-box !important;
    overflow: hidden !important;
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

  /* Etiqueta "Segmento • Hotelería" */
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

  /* ── Contenedor de tabs (lista vertical en Desktop) ────────────────────── */
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

  /* Hover: desliza el tab 6 px a la derecha */
  .jht-tab-btn:hover {
    transform: translateX(6px);
    opacity: 0.8;
  }

  /* Texto del tab */
  .jht-tab-btn-label {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(20px, 1.6vw, 30px);
    line-height: 1;
    color: var(--jht-slate);
    opacity: 0.45;
    letter-spacing: 1.5px;
    white-space: nowrap;
    position: absolute;
    left: 0;
    transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, font-size 0.4s ease;
    user-select: none;
  }

  .jht-tab-btn.active .jht-tab-btn-label {
    opacity: 1;
    font-size: clamp(22px, 1.8vw, 32px);
    left: 17px;
  }

  /* Línea vertical decorativa del tab activo (Desktop) */
  .jht-tab-btn-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--jht-slate);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jht-tab-btn.active .jht-tab-btn-line {
    transform: scaleY(1);
  }

  /* ── COLUMNA DERECHA ───────────────────────────────────────── */
  .jht-right {
    flex: 1;
    position: relative;
    padding-right: clamp(16px, 2.5vw, 48px);
    box-sizing: border-box;
    min-width: 0;
  }

  /* Panels de contenido */
  .jht-panel {
    position: absolute;
    inset: 0;
    padding-left: clamp(24px, 4vw, 80px);
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transform: translateY(12px);
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .jht-panel.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  /* Texto descriptivo del panel activo */
  .jht-panel-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: clamp(14px, 1.05vw, 16px);
    line-height: 1.4;
    color: var(--jht-slate);
    margin: 0;
    width: 100%;
    max-width: 660px;
  }

  /* Galería de imágenes (Desktop: grid 3 cols) */
  .jht-images {
    display: flex;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .jht-img-wrap {
    flex: 1;
    min-width: 0;
    aspect-ratio: 247 / 460;
    background: #d9d9d9;
    overflow: hidden;
    position: relative;
  }

  .jht-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    user-drag: none;
    -webkit-user-drag: none;
    pointer-events: none;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jht-img-wrap:hover img {
    transform: scale(1.04);
  }

  .jht-dots {
    display: none;
  }

  /* ════════════════════════════════════════════════════════════════
     RESPONSIVE — Tablet / Mobile (≤1100px)
     ================================================================ */
  @media (max-width: 1100px) {

    .jht-widget,
    .jht-inner {
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }

    .jht-inner {
      flex-direction: column;
      min-height: auto;
      gap: 0;
    }

    /* ── Columna izquierda full width ── */
    .jht-left {
      flex: none;
      width: 100% !important;
      padding: 0 24px;
      box-sizing: border-box;
    }

    .jht-segment-label {
      margin-top: 0;
    }

    .jht-title {
      font-size: clamp(32px, 6.5vw, 54px);
      width: 100%;
      margin-top: 14px;
    }

    .jht-subtitle {
      width: 100%;
      margin-top: 16px;
      font-size: 15px;
    }

    /* ── Tabs adaptativos con flex-wrap para que nunca desborden la pantalla ── */
    .jht-tabs-nav {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      gap: 10px 18px;
      margin-top: 24px;
      overflow-x: visible;
      border-bottom: 1.5px solid var(--jht-slate-15);
      padding-bottom: 12px;
      box-sizing: border-box;
    }

    .jht-tab-btn {
      height: auto;
      width: auto;
      flex-shrink: 0;
      padding: 4px 6px 8px 6px;
      align-items: center;
      border-bottom: 2.5px solid transparent;
      transition: transform 0.3s ease, opacity 0.3s ease, border-color 0.3s ease;
    }

    .jht-tab-btn:hover {
      transform: translateX(6px);
      opacity: 0.8;
    }

    .jht-tab-btn-label {
      position: static;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-size: 21px;
      color: var(--jht-slate);
      opacity: 0.45;
      letter-spacing: 0.8px;
      word-break: break-word;
      transition: opacity 0.3s ease;
    }

    .jht-tab-btn.active {
      border-bottom-color: var(--jht-slate);
    }

    .jht-tab-btn.active .jht-tab-btn-label {
      opacity: 1;
      font-size: 21px;
    }

    .jht-tab-btn-line {
      display: none;
    }

    /* ── Columna derecha full width ── */
    .jht-right {
      width: 100% !important;
      padding: 0 24px;
      margin-top: 24px;
      box-sizing: border-box;
    }

    .jht-panel {
      position: static;
      display: none;
      opacity: 0;
      pointer-events: none;
      transform: none;
      gap: 20px;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .jht-panel.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
    }

    .jht-panel-desc {
      font-size: 15px;
      width: 100%;
      line-height: 1.55;
    }

    /* Imágenes en carrusel horizontal limpio sin romper la pantalla */
    .jht-images {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      scroll-snap-type: x mandatory;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 8px 0 20px 0 !important;
      gap: 16px;
      box-sizing: border-box;
    }

    .jht-images::-webkit-scrollbar { display: none; }

    .jht-img-wrap {
      width: calc(100vw - 48px);
      max-width: 320px;
      height: 270px;
      aspect-ratio: auto;
      flex-shrink: 0;
      scroll-snap-align: start;
      box-sizing: border-box;
    }

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
      background: var(--jht-blue);
      transform: scale(1.3);
    }
  }

  /* ════════════════════════════════════════════════════════════════
     RESPONSIVE — Mobile (≤480px)
     ================================================================ */
  @media (max-width: 480px) {
    .jht-left, .jht-right {
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
      gap: 8px 14px;
    }

    .jht-tab-btn-label {
      font-size: 19px;
      letter-spacing: 0.5px;
    }

    .jht-tab-btn.active .jht-tab-btn-label {
      font-size: 19px;
    }

    .jht-right {
      margin-top: 20px;
    }

    .jht-panel-desc {
      font-size: 14px;
      line-height: 1.55;
    }

    .jht-img-wrap {
      width: calc(100vw - 32px);
      max-width: 100%;
      height: 240px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── DATOS POR DEFECTO ────────────────────────────────────────────────────────
  const FALLBACK_DATA = {
    segmentLabel: 'Segmento • Hotelería',
    sectionTitle: 'Hotelería',
    sectionDesc: 'Soluciones diseñadas para elevar la experiencia del huésped y optimizar la operación hotelera.',
    tabs: [
      {
        id: 'hoteles-independientes',
        label: 'Hoteles independientes',
        desc: 'Identidad propia y flexibilidad operativa. Líneas de amenidades que transmiten el carácter único de su propiedad con entregas ágiles sin mínimos restrictivos.',
        images: [
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a03195ee0498b3c9acfbfe0_hoteles-independientes-1.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a03195ea11a5c64395df3d0_hoteles-independientes-2.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a03195e2acb2db2a2a07ddf_hoteles-independientes-3.avif'
        ]
      },
      {
        id: 'cadenas-hoteleras',
        label: 'Cadenas hoteleras',
        desc: 'Estandarización, escala y volumen con garantía de suministro continuo. Desarrollo de programas personalizados alineados con los estándares globales de su marca.',
        images: [
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a029db51d8ff8fe4d41_cadenas-hoteleras-1.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a0209c13554e26cebd9_cadenas-hoteleras-2.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a0279c6ea40eef645d9_cadenas-hoteleras-3.avif'
        ]
      },
      {
        id: 'grupos-hoteleros-operadores',
        label: 'Grupos hoteleros & operadores',
        desc: 'Gestión multi-marca y multi-mercado. Desarrollo de colecciones exclusivas por marca, private label y coordinación logística internacional desde EE.UU. y México.',
        images: [
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a590c2394a50bbff8ff_grupos-hoteleros-1.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a59449f1db1237e199d_grupos-hoteleros-2.avif',
          'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a031a59092490df1bbf43bb_grupos-hoteleros-3.avif'
        ]
      }
    ]
  };

  // ─── Lectura de Webflow CMS ──────────────────────────────────────────────────
  function readFromCMS(container) {
    let sourceSelector = container.getAttribute('data-cms-source');
    let source = sourceSelector ? document.querySelector(sourceSelector) : null;

    if (!source) source = container.querySelector('.jht-cms-source, .jypesa-hoteleria-cms-source');
    if (!source) source = document.querySelector('.jht-cms-source, .jypesa-hoteleria-cms-source, [data-cms-source]');

    if (!source) return null;

    const items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const segLabelEl = source.querySelector('.jht-cms-segment-label, .segment-label');
    const secTitleEl = source.querySelector('.jht-cms-section-title, .section-title');
    const secDescEl  = source.querySelector('.jht-cms-section-desc, .section-desc');

    const cleanText = str => str ? str.replace(/[\u0300-\u036f]/g, '').replace(/[\u00a0\s]+/g, ' ').trim() : '';

    const tabs = items.map((item, idx) => {
      const labelEl = item.querySelector('.jht-cms-tab-label, .tab-label');
      const descEl  = item.querySelector('.jht-cms-panel-desc, .panel-desc');
      const imgEls  = Array.from(item.querySelectorAll('.jht-cms-img, .cms-img, img'));

      const labelText = cleanText(labelEl?.textContent) || `Opción ${idx + 1}`;
      const tabId     = item.getAttribute('data-tab-id') ||
                        labelText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      return {
        id: tabId,
        label: labelText,
        desc: cleanText(descEl?.textContent),
        images: imgEls.map(img => img.getAttribute('src') || img.src || '').filter(Boolean)
      };
    });

    return {
      segmentLabel: cleanText(segLabelEl?.textContent) || FALLBACK_DATA.segmentLabel,
      sectionTitle: cleanText(secTitleEl?.textContent) || FALLBACK_DATA.sectionTitle,
      sectionDesc:  cleanText(secDescEl?.textContent)  || FALLBACK_DATA.sectionDesc,
      tabs
    };
  }

  // ─── Helpers de Formateo ─────────────────────────────────────────────────────
  function formatSegmentLabel(labelStr) {
    const parts = labelStr.split(/•|·|-/).map(s => s.trim());
    if (parts.length >= 2) {
      return `<span class="jht-segment-first">${parts[0]}</span> <span class="jht-segment-rest">• ${parts.slice(1).join(' • ')}</span>`;
    }
    return `<span class="jht-segment-first">${labelStr}</span>`;
  }

  // ─── Render HTML ──────────────────────────────────────────────────────────────
  function buildWidget(data) {
    const leftPanels = data.tabs.map((tab, idx) => `
      <button
        class="jht-tab-btn ${idx === 0 ? 'active' : ''}"
        data-tab="${tab.id}"
        role="tab"
        aria-selected="${idx === 0 ? 'true' : 'false'}"
      >
        <div class="jht-tab-btn-line"></div>
        <span class="jht-tab-btn-label">${tab.label}</span>
      </button>
    `).join('');

    const rightPanels = data.tabs.map((tab, idx) => `
      <div class="jht-panel ${idx === 0 ? 'active' : ''}" data-panel-tab="${tab.id}" role="tabpanel">
        <p class="jht-panel-desc">${tab.desc}</p>

        <div class="jht-images">
          ${tab.images.map((src, i) => `
            <div class="jht-img-wrap">
              <img src="${src}" alt="${tab.label} ${i + 1}" loading="lazy" />
            </div>
          `).join('')}
        </div>

        <div class="jht-dots">
          ${tab.images.map((_, i) => `
            <span class="jht-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>
          `).join('')}
        </div>
      </div>
    `).join('');

    return `
      <div class="jht-widget">
        <div class="jht-inner">

          <!-- Columna Izquierda -->
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

          <!-- Columna Derecha -->
          <div class="jht-right">
            ${rightPanels}
          </div>

        </div>
      </div>
    `;
  }

  // ─── Activar tab (SIN romper el scroll de la ventana) ─────────────────────────
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
      if (isActive) {
        const images = panel.querySelector('.jht-images');
        if (images) images.scrollLeft = 0;
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

    // Sincronizar carrusel e imágenes con mouse drag & dots
    container.querySelectorAll('.jht-images').forEach(imagesEl => {
      const panel = imagesEl.closest('.jht-panel');
      if (!panel) return;
      const dots = panel.querySelectorAll('.jht-dot');
      if (!dots.length) return;
      const items = imagesEl.querySelectorAll('.jht-img-wrap');

      // Soporte Drag de Mouse en escritorio para imágenes
      let isMouseDown = false;
      let startX = 0;
      let scrollLeftStart = 0;

      imagesEl.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isMouseDown = true;
        startX = e.pageX - imagesEl.offsetLeft;
        scrollLeftStart = imagesEl.scrollLeft;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - imagesEl.offsetLeft;
        const walk = (x - startX);
        imagesEl.scrollLeft = scrollLeftStart - walk;
      });

      window.addEventListener('mouseup', () => {
        isMouseDown = false;
      });

      // Hacer clic en un dot desplaza el carrusel a esa imagen usando el scroll interno del contenedor
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          const target = items[idx];
          if (target) {
            imagesEl.scrollTo({ left: target.offsetLeft - imagesEl.offsetLeft, behavior: 'smooth' });
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
        const tabId = match.getAttribute('data-tab');
        activateTab(container, tabId);
      }
    }

    checkUrlHash();
    window.addEventListener('hashchange', checkUrlHash);
  }

  // ─── Auto-init Universal con Montaje Automático ────────────────────────────────
  function initAll() {
    let targets = Array.from(document.querySelectorAll(`
      #jypesa-hoteleria-tabs,
      #hoteleria-tabs,
      #jypesa-hoteleria-tabs-widget,
      .jypesa-hoteleria-tabs-widget-container,
      .jypesa-hoteleria-tabs,
      .jypesa-hoteleria-tabs-widget,
      [data-jypesa-hoteleria-tabs],
      [data-hoteleria-tabs],
      .jht-widget-target
    `));

    // Si hay datos CMS pero falta el div de destino con ID en Webflow
    if (!targets.length) {
      const cmsSource = document.querySelector('.jht-cms-source, .jypesa-hoteleria-cms-source');
      if (cmsSource && cmsSource.parentElement) {
        const mountPoint = document.createElement('div');
        mountPoint.id = 'jypesa-hoteleria-tabs';
        cmsSource.parentElement.insertBefore(mountPoint, cmsSource);
        targets = [mountPoint];
      }
    }

    targets.forEach(el => {
      if (el.getAttribute('data-jht-init') === 'true') return;
      el.setAttribute('data-jht-init', 'true');
      initInstance(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
