(function () {
  // Evitar doble inicialización
  if (window.__JypesaSistemasDispensacionWidgetInitialized) return;
  window.__JypesaSistemasDispensacionWidgetInitialized = true;

  // ─── 1. INYECCIÓN DE FUENTES Y CSS ─────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const css = `
  /* ── VARIABLES & RESET ── */
  :root {
    --jypesa-disp-slate: #506D85;
    --jypesa-disp-blue: #48A9C5;
    --jypesa-disp-blue-hover: #398ea7;
    --jypesa-disp-border: rgba(80, 109, 133, 0.3);
    --jypesa-disp-text-dim: rgba(37, 40, 42, 0.5);
  }

  .jypesa-disp-widget-wrapper {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-disp-slate);
    box-sizing: border-box;
    padding: 16px 12px;
    background: transparent;
  }

  .jypesa-disp-widget-wrapper * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── CABECERA ── */
  .jypesa-disp-header {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 35px;
    width: 100%;
    align-items: flex-start;
  }

  .jypesa-disp-title-wrap {
    border-bottom: 2px solid var(--jypesa-disp-slate);
    padding-bottom: 10px;
    display: inline-block;
  }

  .jypesa-disp-section-title {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 25px;
    font-weight: 400;
    line-height: normal;
    color: var(--jypesa-disp-slate);
    letter-spacing: 1.05px;
    white-space: nowrap;
  }

  .jypesa-disp-section-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.35;
    color: var(--jypesa-disp-slate);
    width: 100%;
  }

  /* ── CONTENEDOR GRID / SCROLL ── */
  .jypesa-disp-track {
    display: flex;
    gap: 20px;
    align-items: stretch;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
    -webkit-overflow-scrolling: touch;
    padding: 10px 4px 30px 4px;
    margin: 0 -4px -10px -4px;
  }

  .jypesa-disp-track::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  /* ── COLUMNA DE PRODUCTO ── */
  .jypesa-disp-column {
    flex: 0 0 100%;
    width: 100%;
    background: #ffffff;
    padding: 20px 16px 30px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    scroll-snap-align: center;
    border-radius: 8px;
    border: 1px solid rgba(80, 109, 133, 0.15);
    box-shadow: 0 4px 12px rgba(80, 109, 133, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .jypesa-disp-column:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(80, 109, 133, 0.1);
  }

  .jypesa-disp-card {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }

  .jypesa-disp-card-top {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  /* ── DISPLAY DE IMAGEN PRINCIPAL ── */
  .jypesa-disp-display {
    width: 100%;
    height: 287px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .jypesa-disp-main-img-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .jypesa-disp-main-img {
    max-width: 90%;
    max-height: 90%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: opacity 0.25s ease-in-out, transform 0.4s ease;
  }

  .jypesa-disp-column:hover .jypesa-disp-main-img {
    transform: scale(1.03);
  }

  /* TAG DE CATEGORÍA */
  .jypesa-disp-tag {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 12px;
    border-radius: 2px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jypesa-disp-tag p {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    line-height: normal;
    color: #ffffff;
    white-space: nowrap;
  }

  /* ── MINIATURAS (THUMBNAILS) ── */
  .jypesa-disp-thumbs-container {
    border-top: 1px solid var(--jypesa-disp-border);
    padding-top: 8px;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 60px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  
  .jypesa-disp-thumbs-container::-webkit-scrollbar {
    display: none;
  }

  .jypesa-disp-thumb-btn {
    width: 50px;
    height: 50px;
    background: #ffffff;
    border: 1.5px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: border-color 0.2s ease, opacity 0.2s ease;
    flex-shrink: 0;
    outline: none;
  }

  .jypesa-disp-thumb-btn:hover {
    border-color: var(--jypesa-disp-blue);
  }

  .jypesa-disp-thumb-btn.active {
    border-color: var(--jypesa-disp-slate);
  }

  .jypesa-disp-thumb-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  /* ── INFORMACIÓN Y DETALLES ── */
  .jypesa-disp-info-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    padding-top: 14px;
  }

  .jypesa-disp-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 28px; /* Reducido a 28px en móvil */
    line-height: 1.1;
    color: var(--jypesa-disp-slate);
    letter-spacing: -0.5px;
  }

  .jypesa-disp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 16px;
    width: 100%;
  }

  .jypesa-disp-grid-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .jypesa-disp-grid-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: normal;
    color: var(--jypesa-disp-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .jypesa-disp-grid-value {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    color: var(--jypesa-disp-slate);
  }

  .jypesa-disp-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.35;
    color: var(--jypesa-disp-slate);
    width: 100%;
    min-height: auto; /* Sin altura mínima en móvil */
  }

  /* ── BOTONES DE ACCIÓN ── */
  .jypesa-disp-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: auto;
  }

  .jypesa-disp-btn {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 6px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 13px; /* figma era 14px */
    letter-spacing: 0.7px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    outline: none;
  }

  .jypesa-disp-btn-primary {
    background: var(--jypesa-disp-blue);
    color: #ffffff;
  }

  .jypesa-disp-btn-primary:hover {
    background: var(--jypesa-disp-blue-hover);
    box-shadow: 0 4px 10px rgba(72, 169, 197, 0.2);
  }

  .jypesa-disp-btn-secondary {
    background: transparent;
    color: var(--jypesa-disp-slate);
    border: 2px solid var(--jypesa-disp-slate);
  }

  .jypesa-disp-btn-secondary:hover {
    background: var(--jypesa-disp-slate);
    color: #ffffff;
  }

  .jypesa-disp-btn svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  .jypesa-disp-btn:hover svg {
    transform: translateY(1px);
  }

  /* ── DOTS DE NAVEGACIÓN MÓVIL ── */
  .jypesa-disp-dots-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    width: 100%;
  }

  .jypesa-disp-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(80, 109, 133, 0.25);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: none;
    outline: none;
  }

  .jypesa-disp-dot.active {
    background: var(--jypesa-disp-blue);
    width: 20px;
    border-radius: 100px;
  }

  /* ── ESTADOS VACÍOS ── */
  .jypesa-disp-empty {
    text-align: center;
    padding: 60px 24px;
    font-size: 16px;
    color: var(--jypesa-disp-text-dim);
    width: 100%;
  }

  /* ════════════════════════════════════════
     DESKTOP (>= 992px)
     Pixel Perfect Grid & Separadores
  ════════════════════════════════════════ */
  @media (min-width: 992px) {
    .jypesa-disp-widget-wrapper {
      padding: 24px;
    }

    .jypesa-disp-track {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      overflow: visible;
      padding: 0;
      margin: 0;
    }

    .jypesa-disp-column {
      flex: none;
      width: 100%;
      scroll-snap-align: none;
      border: none;
      border-radius: 0;
      box-shadow: none;
      border-right: 1px solid var(--jypesa-disp-border);
      padding: 20px 24px 30px 24px;
    }

    .jypesa-disp-column:last-child {
      border-right: none;
    }

    .jypesa-disp-column:hover {
      transform: none;
      box-shadow: none;
    }
    
    .jypesa-disp-dots-bar {
      display: none !important;
    }

    .jypesa-disp-tag {
      padding: 4px 18px;
    }

    .jypesa-disp-tag p {
      font-size: 25px;
    }

    .jypesa-disp-thumbs-container {
      min-height: 91px;
      gap: 12px;
    }

    .jypesa-disp-thumb-btn {
      width: 83px;
      height: 83px;
      padding: 6px;
    }

    .jypesa-disp-name {
      font-size: 37px;
    }

    .jypesa-disp-desc {
      min-height: 110px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── 2. SVG ICON DE DESCARGA (Fuerza color de texto con currentColor) ───────
  const downloadIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="jypesa-mask-download" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
      <rect width="14" height="14" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#jypesa-mask-download)">
      <path d="M6.72519 9.7389C6.64039 9.70759 6.55975 9.65369 6.48325 9.5772L3.94383 7.03777C3.82242 6.91622 3.76246 6.77406 3.76396 6.61127C3.76559 6.44848 3.82555 6.30372 3.94383 6.177C4.07055 6.05042 4.21605 5.98502 4.38034 5.9808C4.54476 5.97658 4.69033 6.03783 4.81705 6.16455L6.3875 7.735V1.4875C6.3875 1.31369 6.44616 1.16818 6.56349 1.05099C6.68068 0.933664 6.82619 0.875 7 0.875C7.17381 0.875 7.31932 0.933664 7.43651 1.05099C7.55384 1.16818 7.6125 1.31369 7.6125 1.4875V7.735L9.18295 6.16455C9.3045 6.04314 9.44871 5.98318 9.61558 5.98468C9.78259 5.98631 9.92945 6.05042 10.0562 6.177C10.1745 6.30372 10.2357 6.44718 10.2399 6.60739C10.2441 6.76759 10.1829 6.91105 10.0562 7.03777L7.51675 9.5772C7.44025 9.65369 7.35961 9.70759 7.27481 9.7389C7.19001 9.77034 7.09841 9.78606 7 9.78606C6.90159 9.78606 6.80999 9.77034 6.72519 9.7389ZM2.35133 13.125C1.93878 13.125 1.58958 12.9821 1.30375 12.6962C1.01792 12.4104 0.875 12.0612 0.875 11.6487V10.0468C0.875 9.87296 0.933664 9.72746 1.05099 9.61027C1.16818 9.49294 1.31369 9.43428 1.4875 9.43428C1.66131 9.43428 1.80682 9.49294 1.92401 9.61027C2.04134 9.72746 2.1 9.87296 2.1 10.0468V11.6487C2.1 11.7116 2.1262 11.7691 2.1786 11.8214C2.23087 11.8738 2.28845 11.9 2.35133 11.9H11.6487C11.7116 11.9 11.7691 11.8738 11.8214 11.8214C11.8738 11.7691 11.9 11.7116 11.9 11.6487V10.0468C11.9 9.87296 11.9587 9.72746 12.076 9.61027C12.1932 9.49294 12.3387 9.43428 12.5125 9.43428C12.6863 9.43428 12.8318 9.49294 12.949 9.61027C13.0663 9.72746 13.125 9.87296 13.125 10.0468V11.6487C13.125 12.0612 12.9821 12.4104 12.6962 12.6962C12.4104 12.9821 12.0612 13.125 11.6487 13.125H2.35133Z" fill="currentColor"/>
    </g>
  </svg>`;

  // ─── 3. MOCK DATA / FALLBACKS (Alineado a Figma y servido localmente) ───────
  const fallbackProducts = [
    {
      name: 'Easy Snap',
      categoryName: 'Economy',
      categoryColor: '#4aa25d',
      categoryTitle: 'Sistemas de dispensación',
      categoryDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      code: '-',
      capacity: '400 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      security: 'Media (llave exclusiva)',
      description: 'Sistema de dispensación recargable y no recargable, diseñado con un look flotante que aporta ligereza visual y elegancia en la pared, reduce residuos plásticos, previene robos, optimiza costos operativos y ofrece al huésped una experiencia limpia, segura y profesional.',
      images: [
        'http://localhost:3845/assets/1fe019cde4bfdbce5e683bf4427d646fc4614f19.png',
        'http://localhost:3845/assets/cb1fe94c2e4fcf4e1ebea04e7d932082bf2a6e1a.png',
        'http://localhost:3845/assets/ffa5030f13f9f057515b6a1a3f434c31b26af357.png',
        'http://localhost:3845/assets/8d8d76980dcea84d2cc1baa69ecd576b65de1c37.png',
        'http://localhost:3845/assets/af021db665d1b71876c3099a1001967ce7521b9f.png'
      ],
      fileInstallation: '#',
      fileTechnical: '#'
    },
    {
      name: 'Emperor',
      categoryName: 'Economy',
      categoryColor: '#4aa25d',
      categoryTitle: 'Sistemas de dispensación',
      categoryDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      code: 'JHJY-0065',
      capacity: '400 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      security: 'Media (llave exclusiva)',
      description: 'Sistema de dispensación recargable y no recargable, diseñado para lucir integrado a la pared, reducir residuos plásticos, prevenir robos, optimizar costos operativos y ofrecer al huésped una experiencia limpia, segura y profesional.',
      images: [
        'http://localhost:3845/assets/cf8b2d0a4bb0f7ba7952abfe4dbc9478a6b30a3f.png',
        'http://localhost:3845/assets/db723466f4bfe4ba5a5635c130d31579c5211e0c.png',
        'http://localhost:3845/assets/a90fbd6388dfc9f5a4a6936ec7cc26537b2a8e0c.png',
        'http://localhost:3845/assets/d597d935de591c0dc8329644669c19c6ae960eff.png',
        'http://localhost:3845/assets/63b23f3a89dd22c59e0a2e9400bc40515dcaddc7.png'
      ],
      fileInstallation: '#',
      fileTechnical: '#'
    },
    {
      name: 'Dovelock',
      categoryName: 'Economy',
      categoryColor: '#4aa25d',
      categoryTitle: 'Sistemas de dispensación',
      categoryDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      code: '-',
      capacity: '345 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      security: 'Alta (llave exclusiva)',
      description: 'Sistema de dispensación recargable y no recargable, diseñado con un look flotante que aporta ligereza visual y elegancia en la pared, reduce residuos plásticos, previene robos, optimiza costos operativos y ofrece al huésped una experiencia limpia, segura y profesional.',
      images: [
        'http://localhost:3845/assets/1fe019cde4bfdbce5e683bf4427d646fc4614f19.png',
        'http://localhost:3845/assets/4c94314893b55535f7d5a6dc93f41a72146b2516.png',
        'http://localhost:3845/assets/2816b85fd04a0c6337857065fbcc02303963535c.png',
        'http://localhost:3845/assets/9fc25b793d37297e6a5886cccae489344b8cdc76.png',
        'http://localhost:3845/assets/aaa0bcf6a03ea27ee140dc3dfefec6961e239794.png'
      ],
      fileInstallation: '#',
      fileTechnical: '#'
    },
    {
      name: 'The Nurture',
      categoryName: 'Economy',
      categoryColor: '#4aa25d',
      categoryTitle: 'Sistemas de dispensación',
      categoryDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      code: 'JHJY-0064',
      capacity: '414 ml / 14 oz',
      material: 'HDPE — Material reciclable',
      security: 'Media (llave exclusiva)',
      description: 'Sistema de dispensación recargable y no recargable, diseñado para lucir integrado a la pared, reducir residuos plásticos, prevenir robos, optimizar costos operativos y ofrecer al huésped una experiencia limpia, segura y profesional.',
      images: [
        'http://localhost:3845/assets/1fe019cde4bfdbce5e683bf4427d646fc4614f19.png',
        'http://localhost:3845/assets/cb1fe94c2e4fcf4e1ebea04e7d932082bf2a6e1a.png',
        'http://localhost:3845/assets/7520c24b560b1329e243ca2f090b77e8a1dc0c4f.png',
        'http://localhost:3845/assets/2ca227916222490bbd29ae77674a22d397fbfe7f.png',
        'http://localhost:3845/assets/df4cf40d78adff896fc2acf0aa0c69b4a6c1b29b.png'
      ],
      fileInstallation: '#',
      fileTechnical: '#'
    }
  ];

  // ─── 4. PARSEO DE DATOS CMS DESDE EL DOM ─────────────────────────────────────
  function readProductsFromCMS() {
    const sourceContainer = document.querySelector('.jypesa-disp-cms-source');
    if (!sourceContainer) return null;

    const items = Array.from(sourceContainer.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const products = [];
    items.forEach((item) => {
      const nameEl = item.querySelector('.jypesa-disp-prod-name');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      if (!name) return;

      const getVal = (selector, attr = '') => {
        const el = item.querySelector(selector);
        if (!el) return '';
        if (attr) return el.getAttribute(attr) || '';
        return el.textContent.trim();
      };

      // Recopilar hasta 5 imágenes cargadas
      const images = [];
      for (let i = 1; i <= 5; i++) {
        const img = getVal(`.jypesa-disp-prod-img${i}`, 'src');
        if (img) images.push(img);
      }

      products.push({
        name: name,
        categoryName: getVal('.jypesa-disp-prod-cat-name'),
        categoryColor: getVal('.jypesa-disp-prod-cat-color') || '#4AA25D',
        categoryTitle: getVal('.jypesa-disp-prod-cat-title') || 'Sistemas de dispensación',
        categoryDesc: getVal('.jypesa-disp-prod-cat-desc') || '',
        code: getVal('.jypesa-disp-prod-code') || '-',
        capacity: getVal('.jypesa-disp-prod-capacity') || '-',
        material: getVal('.jypesa-disp-prod-material') || '-',
        security: getVal('.jypesa-disp-prod-security') || '-',
        description: getVal('.jypesa-disp-prod-description') || '',
        images: images.length ? images : ['https://via.placeholder.com/300x300?text=No+Image'],
        fileInstallation: getVal('.jypesa-disp-prod-file-installation', 'href') || '#',
        fileTechnical: getVal('.jypesa-disp-prod-file-technical', 'href') || '#'
      });
    });

    return products.length ? products : null;
  }

  // ─── 5. GENERACIÓN HTML DINÁMICO ───────────────────────────────────────────
  function buildCardHtml(prod, cardId) {
    const mainImg = prod.images[0] || 'https://via.placeholder.com/300x300?text=No+Image';

    // Generar miniaturas (thumbnails)
    let thumbsHtml = '';
    if (prod.images.length > 1) {
      thumbsHtml = prod.images
        .map((imgSrc, index) => `
          <button class="jypesa-disp-thumb-btn${index === 0 ? ' active' : ''}" 
                  data-thumb-index="${index}" 
                  data-card-id="${cardId}" 
                  aria-label="Ver imagen ${index + 1}">
            <img class="jypesa-disp-thumb-img" src="${imgSrc}" alt="${prod.name} thumbnail ${index + 1}" loading="lazy">
          </button>
        `)
        .join('');
    }

    // Configurar botones de descarga (se ocultan si la url es '#' o vacía)
    const hasInst = prod.fileInstallation && prod.fileInstallation !== '#';
    const hasTech = prod.fileTechnical && prod.fileTechnical !== '#';

    let buttonsHtml = '';
    if (hasInst) {
      buttonsHtml += `
        <a href="${prod.fileInstallation}" class="jypesa-disp-btn jypesa-disp-btn-primary" download target="_blank" rel="noopener">
          Descargar guía de instalación ${downloadIcon}
        </a>
      `;
    }
    if (hasTech) {
      buttonsHtml += `
        <a href="${prod.fileTechnical}" class="jypesa-disp-btn jypesa-disp-btn-secondary" download target="_blank" rel="noopener">
          Descargar ficha técnica ${downloadIcon}
        </a>
      `;
    }

    // Tag Color
    const tagBgColor = prod.categoryColor || '#4AA25D';

    return `
      <div class="jypesa-disp-column" data-card-id="${cardId}">
        <div class="jypesa-disp-card">
          <div class="jypesa-disp-card-top">
            
            <!-- Imagen Principal -->
            <div class="jypesa-disp-display">
              <div class="jypesa-disp-tag" style="background-color: ${tagBgColor};">
                <p>${prod.categoryName || 'Economy'}</p>
              </div>
              <div class="jypesa-disp-main-img-container">
                <img class="jypesa-disp-main-img" src="${mainImg}" alt="${prod.name}" id="main-img-${cardId}" loading="lazy">
              </div>
            </div>

            <!-- Miniaturas -->
            <div class="jypesa-disp-thumbs-container">
              ${thumbsHtml}
            </div>

            <!-- Información -->
            <div class="jypesa-disp-info-container">
              <h3 class="jypesa-disp-name">${prod.name}</h3>
              <div class="jypesa-disp-grid">
                <div class="jypesa-disp-grid-cell">
                  <p class="jypesa-disp-grid-label">Código</p>
                  <p class="jypesa-disp-grid-value">${prod.code}</p>
                </div>
                <div class="jypesa-disp-grid-cell">
                  <p class="jypesa-disp-grid-label">Capacidad</p>
                  <p class="jypesa-disp-grid-value">${prod.capacity}</p>
                </div>
                <div class="jypesa-disp-grid-cell">
                  <p class="jypesa-disp-grid-label">Material</p>
                  <p class="jypesa-disp-grid-value">${prod.material}</p>
                </div>
                <div class="jypesa-disp-grid-cell">
                  <p class="jypesa-disp-grid-label">Seguridad</p>
                  <p class="jypesa-disp-grid-value">${prod.security}</p>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <p class="jypesa-disp-desc">${prod.description}</p>
          </div>

          <!-- Botones de Descarga -->
          <div class="jypesa-disp-actions">
            ${buttonsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // ─── 6. LÓGICA DE INTERACTIVIDAD ───────────────────────────────────────────
  function setupWidgetInteractions(targetEl, products) {
    const track = targetEl.querySelector('.jypesa-disp-track');
    const dots = targetEl.querySelectorAll('.jypesa-disp-dot');

    // Cambiar Imagen Principal con las Miniaturas
    const thumbBtns = targetEl.querySelectorAll('.jypesa-disp-thumb-btn');
    thumbBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const thumbIdx = parseInt(this.getAttribute('data-thumb-index'), 10);
        const cardId = parseInt(this.getAttribute('data-card-id'), 10);
        
        // Remover clase activa de miniaturas de la tarjeta actual
        const cardThumbs = targetEl.querySelectorAll(`.jypesa-disp-thumb-btn[data-card-id="${cardId}"]`);
        cardThumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Cambiar imagen principal con efecto fundido suave
        const mainImg = targetEl.querySelector(`#main-img-${cardId}`);
        if (mainImg) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = products[cardId].images[thumbIdx];
            mainImg.style.opacity = '1';
          }, 200);
        }
      });
    });

    // Control de scroll y dots para móvil
    if (track && dots.length) {
      const handleScroll = () => {
        const scrollLeft = track.scrollLeft;
        const column = track.querySelector('.jypesa-disp-column');
        if (!column) return;
        const width = column.offsetWidth + 20; // card width + gap
        const activeIdx = Math.min(
          dots.length - 1,
          Math.max(0, Math.round(scrollLeft / width))
        );

        dots.forEach((dot, i) => {
          if (i === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      };

      track.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          const column = track.querySelector('.jypesa-disp-column');
          if (!column) return;
          const width = column.offsetWidth + 20;
          track.scrollTo({ left: index * width, behavior: 'smooth' });
        });
      });
    }
  }

  // ─── 7. INICIALIZADOR ──────────────────────────────────────────────────────
  function initSistemasDispensacionWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-dispensadores-widget, [data-jypesa-dispensadores-widget], #jypesa-dispensadores-widget'
    );
    if (!targets.length) return;

    // Leer del CMS (Si existe, sino fallback)
    const cmsProducts = readProductsFromCMS();
    const sourceProducts = cmsProducts || fallbackProducts;

    targets.forEach((target, widgetIndex) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      // Filtrado por categoría si se especifica en el div contenedor
      // Uso: <div data-jypesa-dispensadores-widget data-category-filter="Economy">
      const filterCategory = (target.getAttribute('data-category-filter') || '').trim();
      let products = sourceProducts;
      if (filterCategory) {
        const fl = filterCategory.toLowerCase();
        products = sourceProducts.filter(
          (p) => p.categoryName.toLowerCase() === fl
        );
      }

      // Si no quedan productos tras el filtrado
      if (!products.length) {
        target.innerHTML = `<div class="jypesa-disp-empty">No hay dispensadores disponibles en la categoría "${filterCategory}".</div>`;
        return;
      }

      // Tomar metadatos de categoría desde el primer producto de la lista resultante
      const sectionTitle = products[0].categoryTitle || 'Sistemas de dispensación';
      const sectionDesc = products[0].categoryDesc || 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.';

      // Construcción del HTML
      const cardsHtml = products
        .map((p, idx) => buildCardHtml(p, idx))
        .join('');

      const dotsHtml = products
        .map((_, idx) => `
          <button class="jypesa-disp-dot${idx === 0 ? ' active' : ''}" data-index="${idx}" aria-label="Ir a producto ${idx + 1}"></button>
        `)
        .join('');

      target.innerHTML = `
        <div class="jypesa-disp-widget-wrapper">
          <!-- Cabecera -->
          <div class="jypesa-disp-header">
            <div class="jypesa-disp-title-wrap">
              <h2 class="jypesa-disp-section-title">${sectionTitle}</h2>
            </div>
            <p class="jypesa-disp-section-desc">${sectionDesc}</p>
          </div>

          <!-- Grid/Track Deslizador -->
          <div class="jypesa-disp-track">
            ${cardsHtml}
          </div>

          <!-- Dots de navegación móvil -->
          <div class="jypesa-disp-dots-bar">
            ${dotsHtml}
          </div>
        </div>
      `;

      // Inicializar eventos de interacción
      setupWidgetInteractions(target, products);
    });
  }

  // Ejecución al estar listo el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSistemasDispensacionWidget);
  } else {
    initSistemasDispensacionWidget();
  }
})();
