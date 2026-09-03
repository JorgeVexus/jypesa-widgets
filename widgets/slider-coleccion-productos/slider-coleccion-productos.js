(function () {
  // ─── GUARD: CSS/fuentes solo se inyectan una vez, pero el inicializador
  //     se ejecuta siempre para soportar múltiples instancias en la misma página.
  const _cssAlreadyInjected = window.__JypesaSliderColProductosCSS === true;
  if (!_cssAlreadyInjected) {
    window.__JypesaSliderColProductosCSS = true;

    // ─── 1. FUENTES Y CSS ───────────────────────────────────────────────────────
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Rubik:wght@300;400;500;600&display=swap';
    document.head.appendChild(fontLink);
  }

  // ─── 1. CSS (se construye siempre para tener la variable disponible; se inyecta solo una vez) ───
  const css = `
  /* ── WIDGET ROOT ── */
  .jypesa-scol-widget {
    width: 100%;
    background: transparent;
    font-family: 'Rubik', sans-serif;
    color: #506D85;
    box-sizing: border-box;
    padding: 0;
  }

  /* ── FILA ENCABEZADO Y CONTROLES ── */
  .jypesa-scol-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 100%;
    margin-bottom: 28px;
    box-sizing: border-box;
  }

  .jypesa-scol-header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    max-width: 900px;
    flex: 1;
    color: #506D85;
  }

  .jypesa-scol-header-img-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .jypesa-scol-header-img {
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  .jypesa-scol-header-texts {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .jypesa-scol-header-title {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(26px, 3.2vw, 44px);
    line-height: 1.1;
    color: inherit;
    margin: 0;
    word-break: normal;
    overflow-wrap: break-word;
  }

  .jypesa-scol-header-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: clamp(13px, 1vw, 15.5px);
    line-height: 1.4;
    color: inherit;
    margin: 0;
    opacity: 0.9;
  }

  .jypesa-scol-header-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 22px;
    border-radius: 4px;
    border: 1.5px solid currentColor;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    width: fit-content;
    margin-top: 4px;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .jypesa-scol-header-btn:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  /* ── CONTROLES FLECHAS (alineados a la derecha) ── */
  .jypesa-scol-controls-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .jypesa-scol-arrow-btn {
    width: 55px;
    height: 55px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.25s ease, transform 0.2s ease;
  }

  .jypesa-scol-arrow-btn:hover {
    opacity: 0.85;
    transform: scale(1.06);
  }

  .jypesa-scol-arrow-btn:active {
    transform: scale(0.95);
  }

  .jypesa-scol-arrow-btn.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .jypesa-scol-arrow-btn svg {
    width: 55px;
    height: 55px;
    aspect-ratio: 1 / 1;
    display: block;
  }

  /* ── OUTER WRAPPER ── */
  .jypesa-scol-outer {
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  /* ── TRACK (scroll horizontal) ── */
  .jypesa-scol-track {
    display: flex;
    gap: 20px;
    align-items: stretch;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding: 12px 4px 28px 4px;
    margin: -12px -4px -28px -4px;
    box-sizing: border-box;
  }

  .jypesa-scol-track::-webkit-scrollbar {
    display: none;
  }

  /* ── CARD ── */
  .jypesa-scol-card {
    flex: 0 0 258px;
    width: 258px;
    background: #ffffff;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    scroll-snap-align: center;
    text-decoration: none;
    color: #506D85;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.3s ease;
    padding-bottom: 28px;
    overflow: hidden;
  }

  .jypesa-scol-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(80, 109, 133, 0.12);
  }

  /* ── ZONA IMAGEN ── */
  .jypesa-scol-img-wrap {
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .jypesa-scol-img {
    max-width: 80%;
    max-height: 90%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .jypesa-scol-card:hover .jypesa-scol-img {
    transform: scale(1.06);
  }

  /* ── ZONA DETALLES ── */
  .jypesa-scol-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 16px;
    gap: 4px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 18px;
  }

  .jypesa-scol-name {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 21px;
    line-height: 1.1;
    color: #506D85;
    margin: 0;
  }

  .jypesa-scol-type {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #506D85;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 2px 0 0 0;
  }

  .jypesa-scol-sku {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1;
    color: #506D85;
    margin: 6px 0 0 0;
  }

  .jypesa-scol-specs {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
  }

  .jypesa-scol-specs span {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #506D85;
    line-height: 1.3;
  }

  /* ── DOTS MOVIL ── */
  .jypesa-scol-dots-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    width: 100%;
    position: relative;
    z-index: 10;
    pointer-events: auto;
  }

  .jypesa-scol-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(80, 109, 133, 0.25);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    flex-shrink: 0;
    border: none;
    padding: 0;
    outline: none;
    position: relative;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Área táctil ampliada de 36px x 36px para toque fácil en celular */
  .jypesa-scol-dot::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    pointer-events: auto;
  }

  .jypesa-scol-dot.active {
    background: var(--scol-dot-active-color, #48a9c5);
    width: 20px;
    border-radius: 100px;
  }

  /* ── VARIANTE DOTS BLANCOS (data-color="white", data-dots-color="white", data-theme="white") ── */
  .jypesa-scol-widget.jypesa-scol-dots-white .jypesa-scol-dot,
  .jypesa-scol-dots-bar.jypesa-scol-dots-white .jypesa-scol-dot,
  .jypesa-scol-dots-white .jypesa-scol-dot,
  [data-color="white"] .jypesa-scol-dot,
  [data-color="#fff"] .jypesa-scol-dot,
  [data-color="#ffffff"] .jypesa-scol-dot,
  [data-dots-color="white"] .jypesa-scol-dot,
  [data-dots-color="#fff"] .jypesa-scol-dot,
  [data-dots-color="#ffffff"] .jypesa-scol-dot,
  [data-dots="white"] .jypesa-scol-dot,
  [data-theme="white"] .jypesa-scol-dot {
    background: rgba(255, 255, 255, 0.45) !important;
  }

  .jypesa-scol-widget.jypesa-scol-dots-white .jypesa-scol-dot.active,
  .jypesa-scol-dots-bar.jypesa-scol-dots-white .jypesa-scol-dot.active,
  .jypesa-scol-dots-white .jypesa-scol-dot.active,
  [data-color="white"] .jypesa-scol-dot.active,
  [data-color="#fff"] .jypesa-scol-dot.active,
  [data-color="#ffffff"] .jypesa-scol-dot.active,
  [data-dots-color="white"] .jypesa-scol-dot.active,
  [data-dots-color="#fff"] .jypesa-scol-dot.active,
  [data-dots-color="#ffffff"] .jypesa-scol-dot.active,
  [data-dots="white"] .jypesa-scol-dot.active,
  [data-theme="white"] .jypesa-scol-dot.active {
    background: #ffffff !important;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25) !important;
  }

  /* ── EMPTY STATE ── */
  .jypesa-scol-empty {
    text-align: center;
    padding: 48px 24px;
    color: rgba(80, 109, 133, 0.5);
    font-size: 15px;
    font-family: 'Rubik', sans-serif;
  }

  /* ════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════ */
  @media (max-width: 768px) {
    .jypesa-scol-header-row {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
      gap: 12px !important;
      margin-bottom: 20px !important;
    }
    .jypesa-scol-header-content {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 12px !important;
      max-width: 60vw !important;
      flex: 1 !important;
      min-width: 0 !important;
    }
    .jypesa-scol-header-img-wrap {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      width: 60vw !important;
      box-sizing: border-box !important;
    }
    .jypesa-scol-header-img {
      object-fit: contain !important;
      display: block !important;
      flex-shrink: 0 !important;
    }
    .jypesa-scol-header-texts {
      flex: 1 !important;
      min-width: 0 !important;
    }
    .jypesa-scol-controls-row {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      gap: 10px !important;
      flex-shrink: 0 !important;
    }
    .jypesa-scol-arrow-btn {
      width: 38px !important;
      height: 38px !important;
      min-width: 38px !important;
      flex-shrink: 0 !important;
    }
    .jypesa-scol-arrow-btn svg {
      width: 38px !important;
      height: 38px !important;
    }
    .jypesa-scol-header-title {
      font-size: clamp(14px, 3.8vw, 19px) !important;
      line-height: 1.15 !important;
    }
    .jypesa-scol-header-desc {
      font-size: clamp(9px, 2.3vw, 11.5px) !important;
      line-height: 1.2 !important;
    }
  }

  @media (min-width: 769px) {
    .jypesa-scol-card {
      flex: 0 0 310px;
      width: 310px;
      scroll-snap-align: start;
    }

    .jypesa-scol-img-wrap {
      height: 310px;
    }

    /* Ocultar dots en desktop */
    .jypesa-scol-dots-bar {
      display: none !important;
    }

    .jypesa-scol-track {
      gap: 20px;
      padding: 12px 6px 28px 6px;
      margin: -12px -6px -28px -6px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  if (!_cssAlreadyInjected) {
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // ─── 2. SVGs DE FLECHAS (Figma) ─────────────────────────────────────────────
  let _instanceCount = 0;

  function buildArrowSvgs(uid) {
    const nextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
      <g>
        <rect width="55" height="55" rx="27.5" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 55 0)" fill="white" fill-opacity="0.2"/>
        <mask id="scol-mask-next-${uid}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="55" height="55">
          <rect width="55" height="55" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 55 0)" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#scol-mask-next-${uid})">
          <path d="M30.9011 28.0075L22.3739 36.5347C22.0838 36.8247 21.9437 37.1631 21.9533 37.5498C21.963 37.9365 22.1129 38.2749 22.4029 38.5649C22.6929 38.855 23.0313 39 23.418 39C23.8048 39 24.1431 38.855 24.4332 38.5649L33.3664 29.6607C33.5984 29.4287 33.7725 29.1676 33.8885 28.8776C34.0045 28.5876 34.0625 28.2975 34.0625 28.0075C34.0625 27.7174 34.0045 27.4274 33.8885 27.1374C33.7725 26.8473 33.5984 26.5863 33.3664 26.3543L24.4332 17.421C24.1431 17.131 23.7999 16.9908 23.4035 17.0005C23.0071 17.0101 22.6639 17.16 22.3739 17.45C22.0838 17.7401 21.9388 18.0785 21.9388 18.4652C21.9388 18.8519 22.0838 19.1903 22.3739 19.4803L30.9011 28.0075Z" fill="white" fill-opacity="0.8"/>
        </g>
      </g>
    </svg>`;

    const prevSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
      <g>
        <rect y="0" width="55" height="55" rx="27.5" fill="white" fill-opacity="0.2"/>
        <mask id="scol-mask-prev-${uid}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="55" height="55">
          <rect y="0" width="55" height="55" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#scol-mask-prev-${uid})">
          <path d="M24.0989 28.0075L32.6261 36.5347C32.9162 36.8247 33.0563 37.1631 33.0467 37.5498C33.037 37.9365 32.8871 38.2749 32.5971 38.5649C32.3071 38.855 31.9687 39 31.582 39C31.1952 39 30.8569 38.855 30.5668 38.5649L21.6336 29.6607C21.4016 29.4287 21.2275 29.1676 21.1115 28.8776C20.9955 28.5876 20.9375 28.2975 20.9375 28.0075C20.9375 27.7174 20.9955 27.4274 21.1115 27.1374C21.2275 26.8473 21.4016 26.5863 21.6336 26.3543L30.5668 17.421C30.8569 17.131 31.2001 16.9908 31.5965 17.0005C31.9929 17.0101 32.3361 17.16 32.6261 17.45C32.9162 17.7401 33.0612 18.0785 33.0612 18.4652C33.0612 18.8519 32.9162 19.1903 32.6261 19.4803L24.0989 28.0075Z" fill="white" fill-opacity="0.8"/>
        </g>
      </g>
    </svg>`;

    return { prevSvg, nextSvg };
  }

  // ─── 3. DATOS FALLBACK ──────────────────────────────────────────────────────
  const fallbackProducts = [
    {
      name: 'Citrus Bright',
      type: 'Agua micelar con vitamina C',
      sku: '5013-AD03',
      spec1: '30 ml',
      spec2: 'Flowpack',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
      imgAlt: 'Citrus Bright',
      link: '#',
      marca: 'Botanicus',
    },
    {
      name: 'Nopal Cleanse',
      type: 'Dermolimpiador Facial',
      sku: '5013-AD02',
      spec1: '30 ml',
      spec2: 'Flowpack',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
      imgAlt: 'Nopal Cleanse',
      link: '#',
      marca: 'Botanicus',
    },
    {
      name: 'Calm Lavander',
      type: 'Crema para manos',
      sku: '5013-AD01',
      spec1: '40 ml',
      spec2: 'Tubo laminado',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
      imgAlt: 'Calm Lavander',
      link: '#',
      marca: 'Botanicus',
    },
    {
      name: 'Clear Glow',
      type: 'Serum contorno de ojos',
      sku: '5013-AD04',
      spec1: '15 ml',
      spec2: 'Gotero vidrio',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
      imgAlt: 'Clear Glow',
      link: '#',
      marca: 'Botanicus',
    },
    {
      name: 'Glow Shield',
      type: 'Crema facial rosa mosqueta',
      sku: '5013-AD06',
      spec1: '15 ml',
      spec2: 'Tarro vidrio',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
      imgAlt: 'Glow Shield',
      link: '#',
      marca: 'Botanicus',
    },
    {
      name: 'White Aura',
      type: 'Agua de azahar',
      sku: '5013-AD07',
      spec1: '30 ml',
      spec2: 'Botella spray',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
      imgAlt: 'White Aura',
      link: '#',
      marca: 'Persea',
    },
    {
      name: 'Rose Mist',
      type: 'Agua de rosas',
      sku: '5013-AD05',
      spec1: '30 ml',
      spec2: 'Botella spray',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
      imgAlt: 'Rose Mist',
      link: '#',
      marca: 'Persea',
    },
    {
      name: 'Naked Repair',
      type: 'Manteca corporal nutritiva',
      sku: '5013-AD04',
      spec1: '30 gr',
      spec2: 'Tarro plastico',
      spec3: '12 pzs./Caja',
      imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
      imgAlt: 'Naked Repair',
      link: '#',
      marca: 'Persea',
    },
  ];

  // ─── 4. LEER ENCABEZADO (CMS O ATRIBUTOS) ───────────────────────────────────
  function readHeaderData(target, source) {
    const getAttr = (...names) => {
      for (const name of names) {
        let val = target.getAttribute(name);
        if (!val && target.parentElement) {
          val = target.parentElement.getAttribute(name);
        }
        if (!val && source) {
          val = source.getAttribute(name);
        }
        if (val) return val.trim().replace(/^['"]|['"]$/g, '');
      }
      return '';
    };

    const getCms = (cls) => {
      if (!source) return '';
      const el = source.querySelector(cls);
      return el ? el.textContent.trim() : '';
    };

    const getCmsAttr = (cls, attr) => {
      if (!source) return '';
      const el = source.querySelector(cls);
      return el ? (el.getAttribute(attr) || '').trim() : '';
    };

    const getCmsImg = (...classes) => {
      const allSelectors = classes.join(', ');
      // 1. Buscar en source (o dentro de sus items .w-dyn-item)
      let el = source ? source.querySelector(allSelectors) : null;
      // 2. Si no, buscar en el target
      if (!el && target) el = target.querySelector(allSelectors);
      // 3. Si no, buscar en el padre de target
      if (!el && target && target.parentElement) el = target.parentElement.querySelector(allSelectors);

      if (el) {
        if (el.tagName === 'IMG') {
          const directSrc = el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('data-original-src');
          if (directSrc && directSrc !== '#' && directSrc.trim()) {
            return directSrc.trim();
          }
          const srcset = el.getAttribute('srcset');
          if (srcset) {
            const firstSrc = srcset.split(',')[0].trim().split(' ')[0];
            if (firstSrc) return firstSrc.trim();
          }
          if (el.src && el.src !== '#' && !el.src.endsWith('#')) {
            return el.src.trim();
          }
        }
        const dataSrc = el.getAttribute('data-src') || el.getAttribute('src');
        if (dataSrc && dataSrc !== '#') return dataSrc.trim();
        const bg = (el.style && el.style.backgroundImage) || '';
        const m = bg.match(/url\(['"]?(.*?)['"]?\)/);
        if (m && m[1]) return m[1].trim();
        const txt = el.textContent ? el.textContent.trim() : '';
        if (txt.match(/^https?:\/\/|^\/|^\.\//)) return txt;
      }
      return '';
    };

    const title = getAttr('data-header-title', 'data-title') || getCms('.jypesa-scol-cms-header-title');
    const desc = getAttr('data-header-desc', 'data-desc', 'data-header-subtitle', 'data-subtitle') || getCms('.jypesa-scol-cms-header-desc, .jypesa-scol-cms-header-subtitle');
    const btnText = getAttr('data-header-btn-text', 'data-btn-text') || getCms('.jypesa-scol-cms-header-btn-text');
    const btnUrl = getAttr('data-header-btn-url', 'data-btn-url') || getCmsAttr('.jypesa-scol-cms-header-btn-url', 'href') || getCms('.jypesa-scol-cms-header-btn-url');
    const color = getAttr('data-header-color', 'data-color') || getCms('.jypesa-scol-cms-header-color');
    const dotsColor = getAttr('data-dots-color', 'data-dots', 'data-dot-color') || getCms('.jypesa-scol-cms-dots-color');
    const imgSize = getAttr('data-header-img-size', 'data-img-size');
    const imgWidth = getAttr('data-header-img-width', 'data-img-width');
    const imgHeight = getAttr('data-header-img-height', 'data-img-height');
    const imgSrc = getAttr('data-header-img', 'data-header-image', 'data-header-icon', 'data-brand-img', 'data-brand-icon') ||
      getCmsImg('.jypesa-scol-cms-header-img', '.jypesa-scol-header-img', '.jypesa-scol-cms-header-icon', '.jypesa-scol-header-icon', '.jypesa-scol-cms-brand-img', '.jypesa-scol-brand-img', '.jypesa-scol-cms-brand-icon', '.jypesa-scol-brand-icon');

    return { title, desc, btnText, btnUrl, color, dotsColor, imgSrc, imgSize, imgWidth, imgHeight };
  }

  // ─── 5. LEER PRODUCTOS DEL CMS ──────────────────────────────────────────────
  function findCmsSource(target, uid) {
    let source = null;

    // 1. Selector explícito por atributo data-cms-source en target (ej: data-cms-source="#source-1")
    const cmsAttr = target.getAttribute('data-cms-source');
    if (cmsAttr) {
      source = document.querySelector(cmsAttr);
      if (source) return source;
    }

    // 2. Buscar dentro del propio target (si el embed está dentro de la lista o viceversa)
    source = target.querySelector('.jypesa-scol-cms-source');
    if (source) return source;

    // 3. Buscar en el mismo elemento padre: hermanos inmediatos (hacia atrás y hacia adelante)
    let parent = target.parentElement;
    if (parent) {
      // Hermanos anteriores
      let sib = target.previousElementSibling;
      while (sib) {
        if (sib.classList.contains('jypesa-scol-cms-source')) return sib;
        const inner = sib.querySelector('.jypesa-scol-cms-source');
        if (inner) return inner;
        sib = sib.previousElementSibling;
      }

      // Hermanos posteriores
      sib = target.nextElementSibling;
      while (sib) {
        if (sib.classList.contains('jypesa-scol-cms-source')) return sib;
        const inner = sib.querySelector('.jypesa-scol-cms-source');
        if (inner) return inner;
        sib = sib.nextElementSibling;
      }
    }

    // 4. Buscar dentro de la sección o contenedor padre más cercano (ej: .w-section, section, .container, .wrapper)
    let current = target.parentElement;
    while (current && current !== document.body) {
      const inParent = current.querySelector('.jypesa-scol-cms-source');
      if (inParent && inParent !== target && !inParent.contains(target)) return inParent;
      current = current.parentElement;
    }

    // 5. Auto-detectar un Collection List hermano en la misma sección que contenga .jypesa-scol-prod-name
    current = target.parentElement;
    while (current && current !== document.body) {
      const sampleProd = current.querySelector('.jypesa-scol-prod-name');
      if (sampleProd) {
        const list = sampleProd.closest('.w-dyn-list, .w-dyn-items, .jypesa-scol-cms-source') || sampleProd.parentElement;
        if (list && list !== target && !list.contains(target)) return list;
      }
      current = current.parentElement;
    }

    // 6. Fallback global: buscar fuentes .jypesa-scol-cms-source no reclamadas aún por otra instancia
    const allSources = Array.from(document.querySelectorAll('.jypesa-scol-cms-source'));
    if (allSources.length) {
      const unclaimed = allSources.find(s => !s.getAttribute('data-claimed-by'));
      if (unclaimed) return unclaimed;
      return allSources[0];
    }

    return null;
  }

  // ─── 5b. DETECTAR ORDEN DE PRODUCTO (jypesa-prod-order) ─────────────────────
  function getProdOrderVal(itemEl) {
    // Solo selectores estrictamente de producto, nunca de colección/tab,
    // para evitar capturar col-order values accidentalmente.
    const selectors = [
      '.jypesa-prod-order',
      '.jypesa-scol-prod-order',
      '.jypesa-product-order',
      '[data-prod-order]',
      '[data-product-order]'
    ];

    // Buscar ÚNICAMENTE dentro del item (nunca en ancestros).
    for (const sel of selectors) {
      if (itemEl.matches && itemEl.matches(sel)) {
        const txt = (itemEl.textContent || '').trim();
        const m = txt.match(/^\s*(-?\d+)\s*$/);
        if (m) return parseInt(m[1], 10);
      }
      const found = itemEl.querySelectorAll ? Array.from(itemEl.querySelectorAll(sel)) : [];
      for (const el of found) {
        // El texto debe ser SOLO un número para evitar falsos positivos.
        const txt = (el.textContent || '').trim();
        const m = txt.match(/^\s*(-?\d+)\s*$/);
        if (m) return parseInt(m[1], 10);
        // Fallback: leer atributo directo.
        for (const attr of ['data-prod-order', 'data-product-order']) {
          const val = el.getAttribute ? el.getAttribute(attr) : null;
          if (val) {
            const am = val.match(/-?\d+/);
            if (am) return parseInt(am[0], 10);
          }
        }
      }
    }

    // También leer el atributo directamente en el item.
    for (const attr of ['data-prod-order', 'data-product-order']) {
      const val = itemEl.getAttribute ? itemEl.getAttribute(attr) : null;
      if (val) {
        const m = val.match(/-?\d+/);
        if (m) return parseInt(m[0], 10);
      }
    }

    return NaN;
  }

  function readProductsFromCMS(target, uid) {
    const source = findCmsSource(target, uid);

    if (source) {
      source.setAttribute('data-claimed-by', `scol-widget-${uid}`);
      source.style.display = 'none';
    }

    const headerData = readHeaderData(target, source);

    if (!source) return { products: null, headerData };

    let items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) {
      if (source.classList.contains('w-dyn-item')) {
        items = [source];
      } else {
        items = Array.from(source.querySelectorAll('div')).filter(
          (el) => el.querySelector('.jypesa-scol-prod-name')
        );
        items = items.filter(
          (el, i, arr) => !arr.some((o, j) => j !== i && o.contains(el))
        );
      }
    }

    if (!items.length) return { products: null, headerData };

    const products = [];
    items.forEach((item) => {
      const nameEl = item.querySelector('.jypesa-scol-prod-name');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      if (!name) return;

      const get = (cls) => {
        const el = item.querySelector(cls);
        return el ? el.textContent.trim() : '';
      };

      const imgEl = item.querySelector('.jypesa-scol-prod-img');
      const linkEl = item.querySelector('.jypesa-scol-prod-link');

      const orderNum = getProdOrderVal(item);

      products.push({
        name,
        type: get('.jypesa-scol-prod-type'),
        sku: get('.jypesa-scol-prod-sku'),
        spec1: get('.jypesa-scol-prod-spec1'),
        spec2: get('.jypesa-scol-prod-spec2'),
        spec3: get('.jypesa-scol-prod-spec3'),
        imgSrc: imgEl ? (imgEl.getAttribute('src') || imgEl.src || '') : '',
        imgAlt: imgEl ? (imgEl.getAttribute('alt') || name) : name,
        link: linkEl ? (linkEl.getAttribute('href') || '#') : '#',
        marca: get('.jypesa-scol-prod-marca'),
        order: !isNaN(orderNum) ? orderNum : 999,
      });
    });

    // Ordenar de menor a mayor según order
    products.sort((a, b) => a.order - b.order);

    return {
      products: products.length ? products : null,
      headerData
    };
  }

  // ─── 6. CONSTRUIR HTML ──────────────────────────────────────────────────────
  function buildCard(prod) {
    const tgt = prod.link !== '#' ? ' target="_blank" rel="noopener"' : '';
    return `
      <a href="${prod.link}" class="jypesa-scol-card"${tgt}>
        <div class="jypesa-scol-img-wrap">
          ${prod.imgSrc
            ? `<img class="jypesa-scol-img" src="${prod.imgSrc}" alt="${prod.imgAlt}" loading="lazy">`
            : ''}
        </div>
        <div class="jypesa-scol-details">
          <p class="jypesa-scol-name">${prod.name}</p>
          ${prod.type ? `<p class="jypesa-scol-type">${prod.type}</p>` : ''}
          ${prod.sku ? `<p class="jypesa-scol-sku">${prod.sku}</p>` : ''}
          <div class="jypesa-scol-specs">
            ${prod.spec1 ? `<span>${prod.spec1}</span>` : ''}
            ${prod.spec2 ? `<span>${prod.spec2}</span>` : ''}
            ${prod.spec3 ? `<span>${prod.spec3}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  function buildWidgetHtml(products, headerData, uid, isWhiteDots) {
    if (!products.length) {
      return `<div class="jypesa-scol-empty">No hay productos disponibles.</div>`;
    }

    const { prevSvg, nextSvg } = buildArrowSvgs(uid);

    const dots = products
      .map((_, i) =>
        `<button class="jypesa-scol-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Ir al producto ${i + 1}"></button>`
      )
      .join('');

    const hasHeaderContent = headerData.title || headerData.desc || headerData.btnText || headerData.imgSrc;
    const colorStyle = headerData.color ? ` style="color: ${headerData.color};"` : '';
    const btnStyle = headerData.color ? ` style="color: ${headerData.color}; border-color: ${headerData.color};"` : '';

    let imgWrapStyle = '';
    const imgStyles = [];
    if (headerData.imgSize) {
      imgStyles.push(`width: ${headerData.imgSize} !important; height: ${headerData.imgSize} !important;`);
    }
    if (headerData.imgWidth) {
      imgStyles.push(`width: ${headerData.imgWidth} !important;`);
    }
    if (headerData.imgHeight) {
      imgStyles.push(`height: ${headerData.imgHeight} !important;`);
    }
    if (imgStyles.length) {
      imgWrapStyle = ` style="${imgStyles.join(' ')}"`;
    }

    return `
      <!-- Header row con Título, Descripción, Imagen/Logo opcional y Flechas alineadas a la derecha -->
      <div class="jypesa-scol-header-row">
        ${hasHeaderContent ? `
          <div class="jypesa-scol-header-content">
            ${headerData.imgSrc ? `
              <div class="jypesa-scol-header-img-wrap"${imgWrapStyle}>
                <img src="${headerData.imgSrc}" alt="${headerData.title || 'Colección'}" class="jypesa-scol-header-img" loading="lazy">
              </div>
            ` : ''}
            <div class="jypesa-scol-header-texts">
              ${headerData.title ? `<h2 class="jypesa-scol-header-title"${colorStyle}>${headerData.title}</h2>` : ''}
              ${headerData.desc ? `<p class="jypesa-scol-header-desc"${colorStyle}>${headerData.desc}</p>` : ''}
              ${headerData.btnText ? `<a href="${headerData.btnUrl || '#'}" class="jypesa-scol-header-btn"${btnStyle}>${headerData.btnText}</a>` : ''}
            </div>
          </div>
        ` : '<div></div>'}

        <div class="jypesa-scol-controls-row">
          <button class="jypesa-scol-arrow-btn jypesa-scol-prev" aria-label="Anterior">
            ${prevSvg}
          </button>
          <button class="jypesa-scol-arrow-btn jypesa-scol-next" aria-label="Siguiente">
            ${nextSvg}
          </button>
        </div>
      </div>

      <!-- Slider -->
      <div class="jypesa-scol-outer">
        <div class="jypesa-scol-track">
          ${products.map(buildCard).join('')}
        </div>
      </div>

      <!-- Dots solo movil -->
      <div class="jypesa-scol-dots-bar${isWhiteDots ? ' jypesa-scol-dots-white' : ''}">
        ${dots}
      </div>
    `;
  }

  // ─── 7. INTERACTIVIDAD ──────────────────────────────────────────────────────
  function setupInteractions(widget, total) {
    const track = widget.querySelector('.jypesa-scol-track');
    const prevBtn = widget.querySelector('.jypesa-scol-prev');
    const nextBtn = widget.querySelector('.jypesa-scol-next');
    const dots = widget.querySelectorAll('.jypesa-scol-dot');

    if (!track) return;

    const getStep = () => {
      const card = track.querySelector('.jypesa-scol-card');
      return card && card.offsetWidth > 0 ? card.offsetWidth + 20 : 330;
    };

    const scrollToIdx = (idx) => {
      const cards = track.querySelectorAll('.jypesa-scol-card');
      const card = cards[idx];
      if (!card) return;

      const isMobile = window.innerWidth <= 768;
      let targetLeft = card.offsetLeft;

      if (isMobile) {
        // En móvil las tarjetas tienen scroll-snap-align: center
        targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      const finalLeft = Math.max(0, Math.min(maxScroll, targetLeft));

      track.scrollTo({ left: finalLeft, behavior: 'smooth' });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () =>
        track.scrollBy({ left: -getStep(), behavior: 'smooth' })
      );
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () =>
        track.scrollBy({ left: getStep(), behavior: 'smooth' })
      );
    }

    dots.forEach((dot, idx) => {
      const handleSelect = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        scrollToIdx(idx);
      };

      dot.addEventListener('click', handleSelect);
      dot.addEventListener('touchend', handleSelect, { passive: false });
    });

    const onScroll = () => {
      const sl = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      const isMobile = window.innerWidth <= 768;
      const cards = track.querySelectorAll('.jypesa-scol-card');

      let active = 0;
      if (cards.length && isMobile && track.clientWidth > 0) {
        const centerLine = sl + track.clientWidth / 2;
        let minDiff = Infinity;
        cards.forEach((c, i) => {
          const cardCenter = c.offsetLeft + c.clientWidth / 2;
          const diff = Math.abs(cardCenter - centerLine);
          if (diff < minDiff) {
            minDiff = diff;
            active = i;
          }
        });
      } else {
        const step = getStep();
        active = Math.min(total - 1, Math.max(0, Math.round(sl / step)));
      }

      dots.forEach((d, i) => d.classList.toggle('active', i === active));

      if (prevBtn) prevBtn.classList.toggle('disabled', sl <= 5);
      if (nextBtn) nextBtn.classList.toggle('disabled', sl >= max - 5);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Detección cuando el contenedor se hace visible (ej. pestañas de Webflow)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onScroll();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(widget);
    }

    // Sincronización al cambiar de tabs en Webflow
    document.addEventListener('click', (e) => {
      if (e.target && e.target.closest && e.target.closest('.w-tab-link, [data-w-tab], .tab-link')) {
        setTimeout(onScroll, 100);
        setTimeout(onScroll, 350);
      }
    });

    setTimeout(onScroll, 200);
  }

  // ─── 8. INICIALIZADOR ───────────────────────────────────────────────────────
  // Corre siempre que el script se carga para detectar nuevos containers,
  // incluso si el CSS ya fue inyectado por una instancia anterior.
  function initSliderColWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-scol-widget-container, [data-jypesa-scol-widget], #jypesa-scol-widget'
    );
    if (!targets.length) return;

    targets.forEach((target) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      const uid = ++_instanceCount;

      const cmsRes = readProductsFromCMS(target, uid);
      let products = cmsRes.products || fallbackProducts;
      const headerData = cmsRes.headerData;

      // Filtro opcional por "Colección Padre / Marca"
      // Uso: <div data-jypesa-scol-widget data-page-filter="Botanicus">
      const pageFilter = (target.getAttribute('data-page-filter') || target.getAttribute('data-filter') || target.getAttribute('data-brand-filter') || '').trim();
      if (pageFilter) {
        const fl = pageFilter.toLowerCase();
        const filtered = products.filter(
          (p) => p.marca && (p.marca.toLowerCase() === fl || p.marca.toLowerCase().includes(fl))
        );
        if (filtered.length) products = filtered;
      }

      const rawDotsColor = (
        target.getAttribute('data-dots-color') ||
        target.getAttribute('data-dots') ||
        target.getAttribute('data-color') ||
        target.getAttribute('data-theme') ||
        headerData.dotsColor ||
        ''
      ).toLowerCase().trim();

      const isWhiteDots = rawDotsColor === 'white' || rawDotsColor === '#fff' || rawDotsColor === '#ffffff';

      const wrapper = document.createElement('div');
      wrapper.className = 'jypesa-scol-widget' + (isWhiteDots ? ' jypesa-scol-dots-white' : '');
      if (rawDotsColor && !isWhiteDots) {
        wrapper.style.setProperty('--scol-dot-active-color', rawDotsColor);
      }
      wrapper.innerHTML = buildWidgetHtml(products, headerData, uid, isWhiteDots);
      target.appendChild(wrapper);

      setupInteractions(wrapper, products.length);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliderColWidget);
  } else {
    initSliderColWidget();
  }
})();
