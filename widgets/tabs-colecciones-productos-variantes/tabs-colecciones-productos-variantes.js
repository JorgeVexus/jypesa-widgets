(function () {
  if (window.__JypesaTabsColeccionesProductosVariantesInitialized) return;
  window.__JypesaTabsColeccionesProductosVariantesInitialized = true;

  // 1. Inyectar Fuentes y CSS
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600;700&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const cssStyles = `
  :root {
    --jypesa-var-slate: #8A9Aad;
    --jypesa-var-slate-50: rgba(138, 154, 173, 0.5);
    --jypesa-var-slate-15: rgba(138, 154, 173, 0.15);
    --jypesa-var-cyan: #9ef4f5;
    --jypesa-var-blue: #48a9c5;
    --jypesa-var-gold: #E5C158;
    --jypesa-var-text-light: #ffffff;
    --jypesa-var-text-muted: #a0aec0;
    --jypesa-var-card-bg: transparent;
    --jypesa-var-img-bg: #ffffff;
    --jypesa-var-border: rgba(255, 255, 255, 0.1);
  }

  .jypesa-var-widget {
    width: 100%;
    background: transparent;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-var-text-light);
    padding: 60px 0;
    box-sizing: border-box;
  }

  .jypesa-var-layout {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }

  /* COLUMNA IZQUIERDA (NAVEGACIÓN) */
  .jypesa-var-left-col {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
  }

  .jypesa-var-nav-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .jypesa-var-nav-subtitle {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 21px;
    font-weight: 400;
    color: var(--jypesa-var-slate);
    letter-spacing: 1.05px;
    position: relative;
    padding-bottom: 8px;
    display: inline-block;
    margin-bottom: 12px;
  }

  .jypesa-var-nav-subtitle::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--jypesa-var-slate-50);
  }

  .jypesa-var-nav-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 1.2;
    color: var(--jypesa-var-text-light);
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .jypesa-var-nav-title span {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 56px;
    line-height: 0.9;
    color: var(--jypesa-var-cyan);
    display: inline-block;
    letter-spacing: 2px;
    margin-top: 5px;
  }

  /* Menú horizontal en móvil */
  .jypesa-var-menu {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 24px;
    padding-bottom: 12px;
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1px solid var(--jypesa-var-border);
    justify-content: flex-start;
  }

  .jypesa-var-menu::-webkit-scrollbar {
    display: none;
  }

  .jypesa-var-menu-item {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 24px;
    color: var(--jypesa-var-text-light);
    opacity: 0.4;
    cursor: pointer;
    transition: all 0.3s ease;
    padding-bottom: 8px;
    flex-shrink: 0;
    border-bottom: 2px solid transparent;
    letter-spacing: 1.1px;
  }

  .jypesa-var-menu-item:hover {
    opacity: 0.8;
  }

  .jypesa-var-menu-item.active {
    opacity: 1;
    border-bottom: 2px solid var(--jypesa-var-cyan);
    color: var(--jypesa-var-cyan);
  }

  /* COLUMNA DERECHA */
  .jypesa-var-right-col {
    width: 100%;
    box-sizing: border-box;
  }

  .jypesa-var-tab-panel {
    display: none;
    animation: jypesaVarFadeIn 0.5s ease forwards;
  }

  .jypesa-var-tab-panel.active {
    display: block;
  }

  @keyframes jypesaVarFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .jypesa-var-desc {
    font-family: 'Rubik', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--jypesa-var-text-muted);
    margin: 0 0 32px 0;
    max-width: 800px;
  }

  /* FILAS DE FRAGANCIAS */
  .jypesa-var-fragrance-row {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
  }

  .jypesa-var-fragrance-row:last-child {
    margin-bottom: 0;
  }

  /* HEADER DE FRAGANCIA (FIGMA STYLE) */
  .jypesa-var-fragrance-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid var(--jypesa-var-border);
    padding-bottom: 16px;
    align-items: flex-start;
  }

  .jypesa-var-fragrance-title-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .jypesa-var-fragrance-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: var(--jypesa-var-gold);
    margin: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .jypesa-var-fragrance-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    font-size: 13px;
  }

  .jypesa-var-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .jypesa-var-meta-label {
    font-weight: 500;
    color: var(--jypesa-var-text-muted);
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.5px;
  }

  .jypesa-var-meta-value {
    color: var(--jypesa-var-text-light);
    font-weight: 400;
  }

  /* SLIDER EXTERNO */
  .jypesa-var-slider-outer {
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  .jypesa-var-products-container {
    display: flex;
    gap: 16px;
    align-items: stretch;
    justify-content: flex-start;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 10px 4px 20px 4px;
    margin: -10px -4px -20px -4px;
    box-sizing: border-box;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
  }

  .jypesa-var-products-container::-webkit-scrollbar {
    display: none;
  }

  /* TARJETA DE PRODUCTO */
  .jypesa-var-product-card {
    flex: 0 0 258px;
    width: 258px;
    background: var(--jypesa-var-card-bg);
    border-radius: 12px;
    overflow: visible;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
    scroll-snap-align: start;
    text-decoration: none;
    color: inherit;
    border: 1px solid transparent;
  }

  .jypesa-var-product-card.placeholder {
    opacity: 0.15;
    pointer-events: none;
  }

  .jypesa-var-product-card:not(.placeholder):hover {
    transform: translateY(-5px);
  }

  .jypesa-var-card-img-wrap {
    width: 258px;
    height: 258px;
    background-color: var(--jypesa-var-img-bg);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }

  .jypesa-var-card-img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    transition: transform 0.5s ease;
  }

  .jypesa-var-product-card:hover .jypesa-var-card-img {
    transform: scale(1.06);
  }

  .jypesa-var-card-details {
    padding: 4px 0 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
  }

  .jypesa-var-card-title {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: var(--jypesa-var-text-light);
    margin: 0 0 6px 0;
  }

  .jypesa-var-card-sku {
    font-size: 13px;
    color: var(--jypesa-var-slate);
    margin-bottom: 12px;
    display: block;
  }

  .jypesa-var-card-specs {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    color: var(--jypesa-var-text-muted);
  }

  .jypesa-var-card-specs span {
    display: block;
  }

  /* CONTROLES UNIFICADOS DE NAVEGACIÓN (ABAJO) */
  .jypesa-var-controls-unified {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin-top: 36px;
    width: 100%;
  }

  .jypesa-var-nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--jypesa-var-text-light);
    cursor: pointer;
    transition: all 0.25s ease;
    padding: 0;
    outline: none;
  }

  .jypesa-var-nav-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--jypesa-var-cyan);
    border-color: var(--jypesa-var-cyan);
  }

  .jypesa-var-nav-btn.disabled {
    opacity: 0.25;
    cursor: not-allowed;
    pointer-events: none;
  }

  .jypesa-var-nav-btn svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .jypesa-var-dots {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .jypesa-var-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .jypesa-var-dot.active {
    background: var(--jypesa-var-cyan);
    width: 20px;
    border-radius: 100px;
  }

  /* ==========================================================================
     MEDIA QUERIES (DESKTOP LAYOUT - OVERRIDES FOR >= 769px)
     ========================================================================== */
  @media (min-width: 769px) {
    .jypesa-var-layout {
      flex-direction: row;
      gap: 80px;
      align-items: flex-start;
    }

    .jypesa-var-left-col {
      width: 280px;
      flex-shrink: 0;
      position: -webkit-sticky;
      position: sticky;
      top: 40px;
      gap: 32px;
    }

    .jypesa-var-menu {
      flex-direction: column;
      gap: 16px;
      padding-top: 10px;
      margin: 0;
      padding-left: 0;
      padding-right: 0;
      border-bottom: none;
      overflow-x: visible;
      width: 100%;
    }

    .jypesa-var-menu-item {
      padding-bottom: 8px;
      width: 100%;
      text-align: left;
      font-size: 26px;
    }

    .jypesa-var-right-col {
      flex-grow: 1;
      min-width: 0;
    }

    .jypesa-var-fragrance-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }

    .jypesa-var-fragrance-meta {
      font-size: 14px;
    }

    .jypesa-var-products-container {
      gap: 24px;
    }

    .jypesa-var-product-card {
      flex: 0 0 270px;
      width: 270px;
    }

    .jypesa-var-card-img-wrap {
      width: 270px;
      height: 270px;
    }
  }

  @media (min-width: 992px) {
    .jypesa-var-layout {
      gap: 120px;
    }
    .jypesa-var-left-col {
      width: 320px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // Iconos SVG
  const arrowLeftSvg = `<svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>`;
  const arrowRightSvg = `<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>`;

  // 2. Datos Fallback (Colección Vervan)
  const defaultCollections = [
    {
      name: 'Jabones',
      id: 'jabones',
      desc: 'Más que limpieza, una experiencia sensorial. Nuestros jabones sólidos en barra son el detalle perfecto que marca la diferencia, suaves, fragantes y pensados para brindar confort en cada uso. Un gentil de cortesía que convierte la estancia en un verdadero placer.',
      variants: [
        {
          name: 'VERBENA',
          family: 'Cítrica - Aromática',
          notes: 'Verbena',
          products: [
            {
              name: 'Jabón Flowpack',
              sku: 'JB-VRB-28',
              weight: '28 gr | 0.7 oz',
              packaging: 'Flowpack',
              qty: 'TBD',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
              imgAlt: 'Jabón Verbena Flowpack 28g',
              link: '#'
            },
            {
              name: 'Jabón Cajita',
              sku: 'JB-VRB-42',
              weight: '42 gr | 1.40 oz',
              packaging: 'Cajita',
              qty: 'TBD',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
              imgAlt: 'Jabón Verbena Cajita 42g',
              link: '#'
            }
          ]
        },
        {
          name: 'TÉ VERDE, MENTA JENGIBRE',
          family: 'Fresca',
          notes: 'Té verde, menta y jengibre',
          products: [
            {
              name: 'Jabón Flowpack',
              sku: 'JB-TVD-28',
              weight: '28 gr | 0.7 oz',
              packaging: 'Flowpack',
              qty: 'TBD',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
              imgAlt: 'Jabón Té Verde Flowpack 28g',
              link: '#'
            },
            {
              name: 'Jabón Cajita',
              sku: 'JB-TVD-42',
              weight: '42 gr | 1.40 oz',
              packaging: 'Cajita',
              qty: 'TBD',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
              imgAlt: 'Jabón Té Verde Cajita 42g',
              link: '#'
            }
          ]
        }
      ]
    },
    {
      name: 'Botella Boston',
      id: 'botella-boston',
      desc: 'Elegancia sustentable para el baño contemporáneo. Nuestras botellas Boston combinan un diseño minimalista de alta gama con fórmulas premium, pensadas para rellenar y reducir el desperdicio.',
      variants: [
        {
          name: 'VERBENA',
          family: 'Cítrica - Aromática',
          notes: 'Verbena',
          products: [
            {
              name: 'Shampoo Hidratante',
              sku: 'BT-VRB-300',
              weight: '300 ml | 10.1 oz',
              packaging: 'Botella Boston PET',
              qty: '36 pzs/Caja',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
              imgAlt: 'Shampoo Verbena Boston 300ml',
              link: '#'
            },
            {
              name: 'Acondicionador Suave',
              sku: 'BT-VRB-AC',
              weight: '300 ml | 10.1 oz',
              packaging: 'Botella Boston PET',
              qty: '36 pzs/Caja',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
              imgAlt: 'Acondicionador Verbena Boston 300ml',
              link: '#'
            }
          ]
        },
        {
          name: 'TÉ VERDE, MENTA JENGIBRE',
          family: 'Fresca',
          notes: 'Té verde, menta y jengibre',
          products: [
            {
              name: 'Shampoo Hidratante',
              sku: 'BT-TVD-300',
              weight: '300 ml | 10.1 oz',
              packaging: 'Botella Boston PET',
              qty: '36 pzs/Caja',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
              imgAlt: 'Shampoo Té Verde Boston 300ml',
              link: '#'
            },
            {
              name: 'Acondicionador Suave',
              sku: 'BT-TVD-AC',
              weight: '300 ml | 10.1 oz',
              packaging: 'Botella Boston PET',
              qty: '36 pzs/Caja',
              imgSrc: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif',
              imgAlt: 'Acondicionador Té Verde Boston 300ml',
              link: '#'
            }
          ]
        }
      ]
    }
  ];

  function makeSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // 3. Parser del CMS de Webflow
  function readCollectionsFromCMS(target) {
    let sourceSelector = target.getAttribute('data-cms-source');
    let source = sourceSelector ? document.querySelector(sourceSelector) : null;

    if (!source) source = target.querySelector('.jypesa-var-cms-source');
    if (!source) source = target.previousElementSibling;
    if (!source) source = document.querySelector('.jypesa-var-cms-source');

    if (!source) return null;

    let items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) {
      if (source.classList.contains('w-dyn-item')) {
        items = [source];
      } else {
        items = Array.from(source.querySelectorAll('.w-dyn-item, div')).filter(el => el.querySelector('.jypesa-tabs-prod-name'));
      }
    }

    if (!items.length) return null;

    const dataMap = {};

    items.forEach(item => {
      // 1. Nombre de la pestaña / categoría (e.g. Jabones)
      const colNameEl = item.querySelector('.jypesa-tabs-col-name');
      if (!colNameEl) return;
      const colName = colNameEl.textContent.trim();
      if (!colName) return;

      // 2. Variante de Fragancia (e.g. VERBENA o TÉ VERDE, MENTA JENGIBRE)
      const variantNameEl = item.querySelector('.jypesa-tabs-prod-variant');
      if (!variantNameEl) return;
      const variantName = variantNameEl.textContent.trim().toUpperCase();
      if (!variantName) return;

      if (!dataMap[colName]) {
        const descEl = item.querySelector('.jypesa-tabs-col-desc');
        dataMap[colName] = {
          name: colName,
          id: makeSlug(colName),
          desc: descEl ? descEl.textContent.trim() : '',
          variants: {}
        };
      }

      if (!dataMap[colName].variants[variantName]) {
        const familyEl = item.querySelector('.jypesa-tabs-prod-family') || item.querySelector('.jypesa-tabs-col-mood');
        const notesEl = item.querySelector('.jypesa-tabs-prod-notes') || item.querySelector('.jypesa-tabs-col-notes-salida');
        
        dataMap[colName].variants[variantName] = {
          name: variantName,
          family: familyEl ? familyEl.textContent.trim() : '',
          notes: notesEl ? notesEl.textContent.trim() : '',
          products: []
        };
      }

      const prodNameEl = item.querySelector('.jypesa-tabs-prod-name');
      if (prodNameEl) {
        const prodName = prodNameEl.textContent.trim();
        const skuEl = item.querySelector('.jypesa-tabs-prod-sku');
        const weightEl = item.querySelector('.jypesa-tabs-prod-weight');
        const packagingEl = item.querySelector('.jypesa-tabs-prod-packaging');
        const qtyEl = item.querySelector('.jypesa-tabs-prod-qty');
        const imgEl = item.querySelector('.jypesa-tabs-prod-img');
        const linkEl = item.querySelector('.jypesa-tabs-prod-link');

        dataMap[colName].variants[variantName].products.push({
          name: prodName,
          sku: skuEl ? skuEl.textContent.trim() : '',
          weight: weightEl ? weightEl.textContent.trim() : '',
          packaging: packagingEl ? packagingEl.textContent.trim() : '',
          qty: qtyEl ? qtyEl.textContent.trim() : '',
          imgSrc: imgEl ? (imgEl.getAttribute('src') || imgEl.src || '') : '',
          imgAlt: imgEl ? (imgEl.getAttribute('alt') || prodName) : prodName,
          link: linkEl ? (linkEl.getAttribute('href') || '#') : '#'
        });
      }
    });

    // Alinear y ordenar para que coincidan las posiciones de columnas
    const categories = Object.values(dataMap).map(cat => {
      const variantList = Object.values(cat.variants);
      
      // Ordenamos para que VERBENA esté arriba si es posible
      variantList.sort((a, b) => {
        if (a.name.includes('VERBENA')) return -1;
        if (b.name.includes('VERBENA')) return 1;
        return 0;
      });

      // ALINEACIÓN DE COLUMNAS:
      // Identificamos todos los formatos únicos de productos en esta categoría
      // Formato = Nombre + Empaque + Peso
      const uniqueFormats = [];
      variantList.forEach(v => {
        v.products.forEach(p => {
          const key = `${p.name}_${p.packaging}_${p.weight}`.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!uniqueFormats.some(f => f.key === key)) {
            uniqueFormats.push({
              key,
              name: p.name,
              packaging: p.packaging,
              weight: p.weight
            });
          }
        });
      });

      // Re-estructuramos la lista de productos de cada variante para que coincidan con uniqueFormats
      variantList.forEach(v => {
        const alignedProducts = uniqueFormats.map(format => {
          // Buscamos si la variante actual tiene un producto que coincida con este formato
          const match = v.products.find(p => {
            const key = `${p.name}_${p.packaging}_${p.weight}`.toLowerCase().replace(/[^a-z0-9]/g, '');
            return key === format.key;
          });

          // Si lo tiene, lo retornamos. Si no, creamos un placeholder para mantener el espacio
          if (match) {
            return match;
          } else {
            return {
              name: format.name,
              sku: '',
              weight: format.weight,
              packaging: format.packaging,
              qty: '',
              imgSrc: '',
              imgAlt: '',
              link: '#',
              isPlaceholder: true
            };
          }
        });

        v.products = alignedProducts;
      });

      return {
        name: cat.name,
        id: cat.id,
        desc: cat.desc,
        variants: variantList
      };
    });

    return categories.length ? categories : null;
  }

  // 4. Generar HTML del Widget
  function buildWidgetHtml(collections) {
    return `
      <div class="jypesa-var-layout">
        <!-- Columna Izquierda (Navegación) -->
        <div class="jypesa-var-left-col">
          <div class="jypesa-var-nav-header">
            <span class="jypesa-var-nav-subtitle">Productos de la colección</span>
          </div>
          <h2 class="jypesa-var-nav-title">Descubre nuestros <span>productos</span></h2>
          
          <div class="jypesa-var-menu">
            ${collections.map((col, idx) => `
              <div class="jypesa-var-menu-item ${idx === 0 ? 'active' : ''}" data-tab="${col.id}">
                ${col.name}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Columna Derecha (Contenido de Variantes en Filas) -->
        <div class="jypesa-var-right-col">
          ${collections.map((col, idx) => `
            <div class="jypesa-var-tab-panel ${idx === 0 ? 'active' : ''}" id="var-panel-${col.id}">
              ${col.desc ? `<p class="jypesa-var-desc">${col.desc}</p>` : ''}
              
              <!-- Contenedor de las dos filas de fragancia -->
              <div class="jypesa-var-rows-wrapper">
                ${col.variants.map((v, vIdx) => `
                  <div class="jypesa-var-fragrance-row">
                    <!-- Cabecera de la Fila (Detalles de Fragancia) -->
                    <div class="jypesa-var-fragrance-header">
                      <div class="jypesa-var-fragrance-title-wrap">
                        <h3 class="jypesa-var-fragrance-title">${v.name}</h3>
                      </div>
                      
                      <div class="jypesa-var-fragrance-meta">
                        ${v.family ? `
                          <div class="jypesa-var-meta-item">
                            <span class="jypesa-var-meta-label">Familia olfativa</span>
                            <span class="jypesa-var-meta-value">${v.family}</span>
                          </div>
                        ` : ''}
                        ${v.notes ? `
                          <div class="jypesa-var-meta-item">
                            <span class="jypesa-var-meta-label">Notas</span>
                            <span class="jypesa-var-meta-value">${v.notes}</span>
                          </div>
                        ` : ''}
                      </div>
                    </div>

                    <!-- Slider de Productos de esta variante -->
                    <div class="jypesa-var-slider-outer">
                      <div class="jypesa-var-products-container" data-row-index="${vIdx}">
                        ${v.products.map(prod => {
                          if (prod.isPlaceholder) {
                            return `
                              <div class="jypesa-var-product-card placeholder">
                                <div class="jypesa-var-card-img-wrap"></div>
                                <div class="jypesa-var-card-details">
                                  <h4 class="jypesa-var-card-title">${prod.name}</h4>
                                  <div class="jypesa-var-card-specs">
                                    <span>${prod.weight}</span>
                                    <span>${prod.packaging}</span>
                                  </div>
                                </div>
                              </div>
                            `;
                          }
                          return `
                            <a href="${prod.link}" class="jypesa-var-product-card" ${prod.link !== '#' ? 'target="_blank"' : ''}>
                              <div class="jypesa-var-card-img-wrap">
                                ${prod.imgSrc ? `<img class="jypesa-var-card-img" src="${prod.imgSrc}" alt="${prod.imgAlt}" loading="lazy">` : ''}
                              </div>
                              <div class="jypesa-var-card-details">
                                <h4 class="jypesa-var-card-title">${prod.name}</h4>
                                ${prod.sku ? `<span class="jypesa-var-card-sku">${prod.sku}</span>` : ''}
                                <div class="jypesa-var-card-specs">
                                  ${prod.weight ? `<span>${prod.weight}</span>` : ''}
                                  ${prod.packaging ? `<span>${prod.packaging}</span>` : ''}
                                  ${prod.qty ? `<span>${prod.qty}</span>` : ''}
                                </div>
                              </div>
                            </a>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Controles de navegación y paginación unificados (mueven ambas filas al mismo tiempo) -->
              <div class="jypesa-var-controls-unified">
                <button class="jypesa-var-nav-btn prev-var-btn" aria-label="Anterior">
                  ${arrowLeftSvg}
                </button>
                <div class="jypesa-var-dots">
                  ${(col.variants[0]?.products || []).map((_, pIdx) => `
                    <span class="jypesa-var-dot ${pIdx === 0 ? 'active' : ''}" data-index="${pIdx}"></span>
                  `).join('')}
                </div>
                <button class="jypesa-var-nav-btn next-var-btn" aria-label="Siguiente">
                  ${arrowRightSvg}
                </button>
              </div>

            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 5. Configurar Interacción del Widget
  function setupWidgetInteractions(target, collections) {
    const tabButtons = target.querySelectorAll('.jypesa-var-menu-item');
    const panels = target.querySelectorAll('.jypesa-var-tab-panel');

    // Navegación de Pestañas (Categorías)
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePanel = target.querySelector(`#var-panel-${tabId}`);
        if (activePanel) {
          activePanel.classList.add('active');
          // Forzar refresco de alineación de scroll
          const sliders = Array.from(activePanel.querySelectorAll('.jypesa-var-products-container'));
          if (sliders.length > 0) {
            updateControlsState(sliders[0], activePanel);
          }
        }
      });
    });

    // Configurar sincronización de scroll y controles por cada panel
    panels.forEach(panel => {
      const sliders = Array.from(panel.querySelectorAll('.jypesa-var-products-container'));
      const prevBtn = panel.querySelector('.prev-var-btn');
      const nextBtn = panel.querySelector('.next-var-btn');
      const dots = panel.querySelectorAll('.jypesa-var-dot');

      if (sliders.length < 1) return;

      // 1. SINCRONIZACIÓN DE SCROLL:
      // Cuando cualquiera de los sliders cambia de scroll, movemos los demás al mismo valor.
      // Usamos flags para evitar bucles infinitos de eventos de scroll.
      let isSyncing = false;
      sliders.forEach(slider => {
        slider.addEventListener('scroll', () => {
          if (isSyncing) return;
          isSyncing = true;
          
          const scrollLeft = slider.scrollLeft;
          sliders.forEach(otherSlider => {
            if (otherSlider !== slider) {
              otherSlider.scrollLeft = scrollLeft;
            }
          });
          
          updateControlsState(slider, panel);
          isSyncing = false;
        });
      });

      // Funciones de cálculo para el desplazamiento
      const getCardWidth = () => {
        const card = sliders[0].querySelector('.jypesa-var-product-card');
        return card ? card.getBoundingClientRect().width : 258;
      };

      const getScrollStep = () => {
        const cardWidth = getCardWidth();
        const gap = window.innerWidth <= 768 ? 16 : 24;
        return cardWidth + gap;
      };

      // 2. EVENTOS DE BOTONES DE NAVEGACIÓN
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          const step = getScrollStep();
          // Desplazamos todos los sliders del panel al unísono
          sliders.forEach(s => {
            s.scrollBy({ left: -step, behavior: 'smooth' });
          });
        });

        nextBtn.addEventListener('click', () => {
          const step = getScrollStep();
          sliders.forEach(s => {
            s.scrollBy({ left: step, behavior: 'smooth' });
          });
        });
      }

      // 3. EVENTOS DE DOTS
      dots.forEach((dot, dotIdx) => {
        dot.addEventListener('click', () => {
          const step = getScrollStep();
          sliders.forEach(s => {
            s.scrollTo({ left: dotIdx * step, behavior: 'smooth' });
          });
        });
      });

      // Inicializar estado de botones y dots
      setTimeout(() => {
        updateControlsState(sliders[0], panel);
      }, 100);

      window.addEventListener('resize', () => {
        updateControlsState(sliders[0], panel);
      });
    });
  }

  // Actualizar estado activo de los dots y deshabilitar flechas de navegación en los límites
  function updateControlsState(primarySlider, panel) {
    if (!primarySlider) return;
    
    const scrollLeft = primarySlider.scrollLeft;
    const maxScroll = primarySlider.scrollWidth - primarySlider.clientWidth;
    
    const cardEl = primarySlider.querySelector('.jypesa-var-product-card');
    if (!cardEl) return;
    
    const cardWidth = cardEl.getBoundingClientRect().width;
    const gap = window.innerWidth <= 768 ? 16 : 24;
    const step = cardWidth + gap;

    const prevBtn = panel.querySelector('.prev-var-btn');
    const nextBtn = panel.querySelector('.next-var-btn');
    const dots = panel.querySelectorAll('.jypesa-var-dot');

    // Calcular dot activo en base al scroll actual
    const activeIndex = Math.min(
      dots.length - 1,
      Math.max(0, Math.round(scrollLeft / step))
    );

    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeIndex));

    if (prevBtn && nextBtn) {
      prevBtn.classList.toggle('disabled', scrollLeft <= 5);
      nextBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 5);
    }
  }

  // 6. Inicialización del Widget
  function initTabsColeccionesVariantes() {
    const targets = document.querySelectorAll('.jypesa-var-widget-container, [data-jypesa-var-widget], #jypesa-var-widget');
    if (!targets.length) return;

    targets.forEach(target => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      // Intentar leer desde el CMS. Si no hay CMS, usar fallback
      const collections = readCollectionsFromCMS(target) || defaultCollections;

      target.innerHTML = buildWidgetHtml(collections);
      setupWidgetInteractions(target, collections);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabsColeccionesVariantes);
  } else {
    initTabsColeccionesVariantes();
  }
})();
