(function () {
  if (window.__JypesaSliderColProductosInitialized) return;
  window.__JypesaSliderColProductosInitialized = true;

  // ─── 1. FUENTES Y CSS ───────────────────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

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

  /* ── FILA DE CONTROLES (flechas arriba-derecha) ── */
  .jypesa-scol-controls-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    width: 100%;
    padding-right: 100px;
    box-sizing: border-box;
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
    transition: opacity 0.2s ease, transform 0.2s ease;
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
    margin-top: 20px;
    width: 100%;
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
  }

  .jypesa-scol-dot.active {
    background: #48a9c5;
    width: 20px;
    border-radius: 100px;
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
     DESKTOP (>= 769px)
  ════════════════════════════════════════ */
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
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── 2. SVGs DE FLECHAS (Figma) ─────────────────────────────────────────────
  // Se generan IDs únicos por instancia para evitar conflictos en página
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

  // ─── 4. LEER DEL CMS ────────────────────────────────────────────────────────
  /*
   * MAPEO CMS → Clases Webflow (añadir en CMS List como hidden elements):
   *
   *   .jypesa-scol-prod-name    → Producto - Nombre
   *   .jypesa-scol-prod-type    → Producto - Tipo  (campo nuevo a crear)
   *   .jypesa-scol-prod-sku     → Producto - SKU
   *   .jypesa-scol-prod-spec1   → Producto - Peso/Volumen
   *   .jypesa-scol-prod-spec2   → Producto - Empaque
   *   .jypesa-scol-prod-spec3   → Producto - Embalaje
   *   .jypesa-scol-prod-img     → Producto - Imagen  (img element)
   *   .jypesa-scol-prod-link    → link href del producto
   *   .jypesa-scol-prod-marca   → Coleccion Padre / Marca
   *
   * Wrapper del CMS List: clase .jypesa-scol-cms-source
   * Filtro por pagina:    data-page-filter="NombreDeMarca"  en el widget host
   */
  function readProductsFromCMS(target) {
    let source = null;

    const cmsAttr = target.getAttribute('data-cms-source');
    if (cmsAttr) source = document.querySelector(cmsAttr);

    if (!source) source = target.querySelector('.jypesa-scol-cms-source');

    if (!source) {
      const prev = target.previousElementSibling;
      if (prev && prev.classList.contains('jypesa-scol-cms-source'))
        source = prev;
    }

    if (!source) source = document.querySelector('.jypesa-scol-cms-source');
    if (!source) return null;

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

    if (!items.length) return null;

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
      });
    });

    return products.length ? products : null;
  }

  // ─── 5. CONSTRUIR HTML ──────────────────────────────────────────────────────
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

  function buildWidgetHtml(products, uid) {
    if (!products.length) {
      return `<div class="jypesa-scol-empty">No hay productos disponibles.</div>`;
    }

    const { prevSvg, nextSvg } = buildArrowSvgs(uid);

    const dots = products
      .map((_, i) =>
        `<button class="jypesa-scol-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Ir al producto ${i + 1}"></button>`
      )
      .join('');

    return `
      <!-- Flechas arriba-derecha, sobre las cards -->
      <div class="jypesa-scol-controls-row">
        <button class="jypesa-scol-arrow-btn jypesa-scol-prev" aria-label="Anterior">
          ${prevSvg}
        </button>
        <button class="jypesa-scol-arrow-btn jypesa-scol-next" aria-label="Siguiente">
          ${nextSvg}
        </button>
      </div>

      <!-- Slider -->
      <div class="jypesa-scol-outer">
        <div class="jypesa-scol-track">
          ${products.map(buildCard).join('')}
        </div>
      </div>

      <!-- Dots solo movil -->
      <div class="jypesa-scol-dots-bar">
        ${dots}
      </div>
    `;
  }

  // ─── 6. INTERACTIVIDAD ──────────────────────────────────────────────────────
  function setupInteractions(widget, total) {
    const track = widget.querySelector('.jypesa-scol-track');
    const prevBtn = widget.querySelector('.jypesa-scol-prev');
    const nextBtn = widget.querySelector('.jypesa-scol-next');
    const dots = widget.querySelectorAll('.jypesa-scol-dot');

    if (!track) return;

    const getStep = () => {
      const card = track.querySelector('.jypesa-scol-card');
      return card ? card.getBoundingClientRect().width + 20 : 330;
    };

    if (prevBtn)
      prevBtn.addEventListener('click', () =>
        track.scrollBy({ left: -getStep(), behavior: 'smooth' })
      );
    if (nextBtn)
      nextBtn.addEventListener('click', () =>
        track.scrollBy({ left: getStep(), behavior: 'smooth' })
      );

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () =>
        track.scrollTo({ left: idx * getStep(), behavior: 'smooth' })
      );
    });

    const onScroll = () => {
      const sl = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      const step = getStep();
      const active = Math.min(total - 1, Math.max(0, Math.round(sl / step)));

      dots.forEach((d, i) => d.classList.toggle('active', i === active));

      if (prevBtn) prevBtn.classList.toggle('disabled', sl <= 5);
      if (nextBtn) nextBtn.classList.toggle('disabled', sl >= max - 5);
    };

    track.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    setTimeout(onScroll, 200);
  }

  // ─── 7. INICIALIZADOR ───────────────────────────────────────────────────────
  function initSliderColWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-scol-widget-container, [data-jypesa-scol-widget], #jypesa-scol-widget'
    );
    if (!targets.length) return;

    targets.forEach((target) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      const uid = ++_instanceCount;

      let products = readProductsFromCMS(target) || fallbackProducts;

      // Filtro por "Coleccion Padre / Marca"
      // Uso: <div data-jypesa-scol-widget data-page-filter="Botanicus">
      const pageFilter = (target.getAttribute('data-page-filter') || '').trim();
      if (pageFilter) {
        const fl = pageFilter.toLowerCase();
        const filtered = products.filter(
          (p) => p.marca.toLowerCase() === fl
        );
        if (filtered.length) products = filtered;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'jypesa-scol-widget';
      wrapper.innerHTML = buildWidgetHtml(products, uid);
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
