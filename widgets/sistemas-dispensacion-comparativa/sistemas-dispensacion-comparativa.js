(function () {
  // Evitar doble inicialización
  if (window.__JypesaSistemasDispensacionComparativaInitialized) return;
  window.__JypesaSistemasDispensacionComparativaInitialized = true;

  // 1. Inyectar fuentes de Google Fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  // 2. Inyectar estilos CSS específicos de Figma
  const cssStyles = `
  /* CONTENEDOR PRINCIPAL DEL WIDGET */
  .jypesa-sdc-widget {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 60px 24px;
    font-family: 'Rubik', sans-serif;
    color: #506D85;
    box-sizing: border-box;
  }

  .jypesa-sdc-widget * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ENCABEZADO */
  .jypesa-sdc-header {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 35px;
    width: 100%;
  }

  .jypesa-sdc-destacable {
    border-bottom: 2px solid #506D85;
    padding: 10px 0;
    width: fit-content;
  }

  .jypesa-sdc-destacable-text {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 21px;
    font-weight: 400;
    color: #506D85;
    letter-spacing: 1.05px;
    line-height: 1;
  }

  .jypesa-sdc-subtitle {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.35;
    color: #506D85;
    max-width: 800px;
  }

  /* GRID DE COMPARATIVA */
  .jypesa-sdc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    width: 100%;
    align-items: stretch;
  }

  /* COLUMNA INDIVIDUAL */
  .jypesa-sdc-column {
    background-color: #ffffff;
    padding: 20px 24px 30px 24px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    position: relative;
    box-shadow: 0 4px 15px rgba(80, 109, 133, 0.04);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }

  .jypesa-sdc-column:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(80, 109, 133, 0.12);
  }

  /* Líneas divisorias verticales entre columnas en desktop */
  @media (min-width: 992px) {
    .jypesa-sdc-column:not(:last-child) {
      border-right: 1px solid rgba(80, 109, 133, 0.2);
    }
  }

  /* CONTENEDOR DE IMAGEN (DISPLAY) */
  .jypesa-sdc-display-container {
    width: 100%;
    height: 287px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }

  .jypesa-sdc-img-main {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
    opacity: 1;
  }

  .jypesa-sdc-column:hover .jypesa-sdc-img-main {
    transform: scale(1.03);
  }

  /* BADGE DE TIPO (ECONOMY) */
  .jypesa-sdc-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #4aa25d;
    color: #ffffff;
    padding: 4px 18px;
    border-radius: 2px;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 25px;
    line-height: 1;
    z-index: 5;
  }

  /* CONTENEDOR DE MINIATURAS/COMPATIBILIDADES */
  .jypesa-sdc-thumbs-row {
    border-top: 1px solid rgba(80, 109, 133, 0.3);
    padding-top: 8px;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 83px;
  }

  .jypesa-sdc-thumb-box {
    width: 83px;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.25s ease;
    padding: 4px;
    opacity: 0.6;
    background-color: #fafafa;
  }

  .jypesa-sdc-thumb-box:hover {
    border-color: rgba(80, 109, 133, 0.3);
    opacity: 0.9;
  }

  .jypesa-sdc-thumb-box.active {
    border-color: #48a9c5;
    background-color: #ffffff;
    opacity: 1;
    box-shadow: 0 4px 10px rgba(72, 169, 197, 0.15);
  }

  .jypesa-sdc-thumb-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  /* CONTENIDO DETALLADO */
  .jypesa-sdc-details {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    flex-grow: 1;
  }

  /* TÍTULO DEL DISPENSADOR */
  .jypesa-sdc-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 45px;
    line-height: 1.1;
    color: #506D85;
    margin: 0;
    text-align: center;
  }

  /* ESPECIFICACIONES (TABLA / GRID) */
  .jypesa-sdc-specs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 20px;
    width: 100%;
  }

  .jypesa-sdc-spec-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .jypesa-sdc-spec-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: rgba(80, 109, 133, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
  }

  .jypesa-sdc-spec-value {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #506D85;
    line-height: 1.3;
  }

  /* DESCRIPCIÓN */
  .jypesa-sdc-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.35;
    color: #506D85;
    text-align: center;
    min-height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* BOTONES DE ACCIÓN */
  .jypesa-sdc-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: auto;
  }

  .jypesa-sdc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    border-radius: 6px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 13px;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.7px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }

  .jypesa-sdc-btn-primary {
    background-color: #48a9c5;
    color: #ffffff;
    border: none;
  }

  .jypesa-sdc-btn-primary:hover {
    background-color: #3b91a9;
  }

  .jypesa-sdc-btn-secondary {
    background-color: transparent;
    color: #506D85;
    border: 2px solid #506D85;
  }

  .jypesa-sdc-btn-secondary:hover {
    background-color: rgba(80, 109, 133, 0.06);
  }

  .jypesa-sdc-btn-icon {
    width: 14px;
    height: 14px;
    fill: currentColor;
    display: block;
  }

  /* DOTS DE NAVEGACIÓN MÓVIL */
  .jypesa-sdc-dots {
    display: none;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    width: 100%;
  }

  .jypesa-sdc-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(80, 109, 133, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .jypesa-sdc-dot.active {
    background-color: #48a9c5;
    transform: scale(1.2);
  }

  /* ESTADO VACÍO (FILTRADO SIN RESULTADOS) */
  .jypesa-sdc-empty {
    text-align: center;
    padding: 60px 24px;
    color: rgba(80, 109, 133, 0.5);
    font-size: 16px;
    font-family: 'Rubik', sans-serif;
    width: 100%;
    grid-column: 1 / -1;
  }

  /* RESPONSIVIDAD */
  @media (max-width: 1199px) {
    .jypesa-sdc-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .jypesa-sdc-column {
      border: 1px solid rgba(80, 109, 133, 0.1);
    }
  }

  @media (max-width: 768px) {
    .jypesa-sdc-widget {
      padding: 40px 16px;
    }
    .jypesa-sdc-grid {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      gap: 20px;
      padding: 10px 0 20px;
      scrollbar-width: none; /* Firefox */
    }
    .jypesa-sdc-grid::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
    .jypesa-sdc-column {
      flex: 0 0 100%; /* Un producto por slide */
      scroll-snap-align: center;
      border: 1px solid rgba(80, 109, 133, 0.15);
      border-radius: 8px;
    }
    .jypesa-sdc-dots {
      display: flex;
    }
    .jypesa-sdc-name {
      font-size: 38px;
    }
    .jypesa-sdc-desc {
      min-height: auto;
      margin-bottom: 12px;
    }
  }
  `;

  // Crear e inyectar etiqueta de estilo
  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // SVG de icono de descarga
  const downloadIcon = `
    <svg class="jypesa-sdc-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // 3. Datos de Fallback (especificaciones Figma con variantes)
  const defaultDispensers = [
    {
      name: 'Easy Snap',
      badge: 'Economy',
      badgeColor: '#4aa25d',
      categoria: 'Sistemas de dispensación',
      categoriaDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      codigo: '-',
      capacidad: '400 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      seguridad: 'Media (llave exclusiva)',
      desc: 'Sistema de dispensación recargable y no recargable, diseñado con un look flotante que aporta ligereza visual y elegancia en la pared, reduce residuos plásticos, previene robos, optimiza costos operativos y ofrece al huésped una experiencia limpia, segura y profesional.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a517650cc0f99d3d0a0d182_elements%2003.avif',
      variants: [
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif'
        },
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif'
        }
      ],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'Emperor',
      badge: 'Economy',
      badgeColor: '#4aa25d',
      categoria: 'Sistemas de dispensación',
      categoriaDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      codigo: 'JHJY-0065',
      capacidad: '400 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      seguridad: 'Media (llave exclusiva)',
      desc: 'Sistema de dispensación recargable y no recargable, diseñado para lucir integrado a la pared, reducir residuos plásticos, prevenir robos, optimizar costos operativos y ofrecer al huésped una experiencia limpia, segura y profesional.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765121c2aa4efdc14b0b_elements%2004.avif',
      variants: [
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif'
        },
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif'
        }
      ],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'Dovelock',
      badge: 'Economy',
      badgeColor: '#4aa25d',
      categoria: 'Sistemas de dispensación',
      categoriaDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      codigo: '-',
      capacidad: '345 ml / 13.5 oz',
      material: 'HDPE — Material reciclable',
      seguridad: 'Alta (llave exclusiva)',
      desc: 'Sistema de dispensación recargable y no recargable, diseñado con un look flotante que aporta ligereza visual y elegancia en la pared, reduce residuos plásticos, previene robos, optimiza costos operativos y ofrece al huésped una experiencia limpia, segura y profesional.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765095d88faa906532c8_elements%2001.avif',
      variants: [
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif'
        }
      ],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'The Nurture',
      badge: 'Economy',
      badgeColor: '#4aa25d',
      categoria: 'Sistemas de dispensación',
      categoriaDesc: 'Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.',
      codigo: 'JHJY-0064',
      capacidad: '414 ml / 14 oz',
      material: 'HDPE — Material reciclable',
      seguridad: 'Media (llave exclusiva)',
      desc: 'Sistema de dispensación recargable y no recargable, diseñado para lucir integrado a la pared, reducir residuos plásticos, prevenir robos, optimizar costos operativos y ofrecer al huésped una experiencia limpia, segura y profesional.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5176510c1099a1f3814e4d_elements%2002.avif',
      variants: [
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif'
        },
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif'
        }
      ],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'Lotus Premium',
      badge: 'Premium',
      badgeColor: '#48a9c5',
      categoria: 'Soportes',
      categoriaDesc: 'Soportes de pared de alta durabilidad y diseño antirrobo.',
      codigo: 'JHJY-0080',
      capacidad: '350 ml / 11.8 oz',
      material: 'PET Reciclado (PCR)',
      seguridad: 'Alta (cerradura oculta)',
      desc: 'Línea Premium fabricada con PET reciclado posconsumo. Su estética orgánica y dosificación precisa lo convierten en la opción ideal para hoteles de diseño y boutique.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif',
      variants: [
        {
          thumb: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif',
          large: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif'
        }
      ],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'Crown Premium',
      badge: 'Premium',
      badgeColor: '#48a9c5',
      categoria: 'Soportes',
      categoriaDesc: 'Soportes de pared de alta durabilidad y diseño antirrobo.',
      codigo: 'JHJY-0081',
      capacidad: '450 ml / 15.2 oz',
      material: 'PET Reciclado (PCR)',
      seguridad: 'Alta (cerradura oculta)',
      desc: 'Soporte doble con botellas traslúcidas que permiten vigilar el nivel del producto. Combina máxima higiene con un diseño limpio y moderno.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif',
      variants: [],
      guiaLink: '',
      fichaLink: ''
    },
    {
      name: 'Prestige Luxury',
      badge: 'Luxury',
      badgeColor: '#0e2333',
      categoria: 'Complementos',
      categoriaDesc: 'Accesorios y complementos para optimizar la experiencia de higiene.',
      codigo: 'JHJY-0090',
      capacidad: '300 ml / 10.1 oz',
      material: 'Aluminio Anodizado',
      seguridad: 'Máxima (llave magnética)',
      desc: 'Exclusivo dispensador de aluminio anodizado con acabado mate. Su sistema magnético antirrobo garantiza máxima seguridad en las suites más exigentes.',
      imgMain: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif',
      variants: [],
      guiaLink: '',
      fichaLink: ''
    }
  ];

  // 4. Leer del CMS de Webflow
  function readDispensersFromCMS(target) {
    let source = null;
    
    // 1. Selector personalizado por atributo
    const cmsAttr = target.getAttribute('data-cms-source');
    if (cmsAttr) {
      source = document.querySelector(cmsAttr);
    }

    // 2. Buscar dentro del mismo contenedor del widget
    if (!source) {
      source = target.querySelector('.jypesa-sdc-cms-source');
    }

    // 3. Buscar hermano anterior o posterior directo
    if (!source) {
      let sib = target.previousElementSibling;
      while (sib) {
        if (sib.classList.contains('jypesa-sdc-cms-source')) {
          source = sib;
          break;
        }
        sib = sib.previousElementSibling;
      }
    }
    if (!source) {
      let sib = target.nextElementSibling;
      while (sib) {
        if (sib.classList.contains('jypesa-sdc-cms-source')) {
          source = sib;
          break;
        }
        sib = sib.nextElementSibling;
      }
    }

    // 4. Buscar en el contenedor padre común (sección o contenedor de Webflow)
    if (!source && target.parentElement) {
      source = target.parentElement.querySelector('.jypesa-sdc-cms-source');
    }

    // 5. Buscar de forma global en la página
    if (!source) {
      source = document.querySelector('.jypesa-sdc-cms-source');
    }

    // 6. Auto-detectar buscando un item con clase de nombre en el mismo contenedor padre
    if (!source && target.parentElement) {
      const localSample = target.parentElement.querySelector('.jypesa-disp-name');
      if (localSample) {
        source = localSample.closest('.w-dyn-list') || 
                 localSample.closest('.w-dyn-items') || 
                 localSample.parentElement;
      }
    }

    // 7. Auto-detectar buscando de forma global en la página por clase de nombre
    if (!source) {
      const sampleEl = document.querySelector('.jypesa-disp-name');
      if (sampleEl) {
        source = sampleEl.closest('.w-dyn-list') || 
                 sampleEl.closest('.w-dyn-items') || 
                 sampleEl.parentElement;
      }
    }

    if (!source) return null;

    let items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) {
      if (source.classList.contains('w-dyn-item')) {
        items = [source];
      } else {
        items = Array.from(source.querySelectorAll('div')).filter(el => el.querySelector('.jypesa-disp-name'));
        items = items.filter((el, idx, self) => !self.some((other, oIdx) => oIdx !== idx && other.contains(el)));
      }
    }

    if (!items.length) {
      // Retornar array vacío para indicar que la fuente existe pero está filtrada/vacía
      return [];
    }

    const dispensers = [];
    items.forEach(item => {
      const nameEl = item.querySelector('.jypesa-disp-name');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      if (!name) return;

      const get = (cls) => {
        const el = item.querySelector(cls);
        return el ? el.textContent.trim() : '';
      };

      const getImgSrc = (cls) => {
        let el = item.querySelector(cls);
        if (!el) return '';
        
        // Si el selector no es un elemento de tipo IMG, buscar la imagen dentro
        if (el.tagName !== 'IMG') {
          const img = el.querySelector('img');
          if (img) el = img;
        }

        const attrSrc = el.getAttribute('src');
        if (attrSrc && attrSrc.trim() !== '') {
          const srcVal = attrSrc.trim();
          const lowerSrc = srcVal.toLowerCase();
          
          // Filtrar placeholders de Webflow, data-URIs y URLs autorreferenciales del navegador
          if (
            lowerSrc.includes('placeholder') || 
            lowerSrc.includes('cloudfront.net/img/') || 
            lowerSrc.startsWith('data:') ||
            srcVal === window.location.href ||
            srcVal === '#'
          ) {
            return '';
          }
          return srcVal;
        }
        return '';
      };

      const getLink = (cls) => {
        let el = item.querySelector(cls);
        if (!el) return '';
        
        // Si el elemento no es un enlace (<a>), buscar un enlace dentro
        if (el.tagName !== 'A') {
          const anchor = el.querySelector('a');
          if (anchor) el = anchor;
        }

        // Obtener el href del enlace si es un <a>
        let href = el.tagName === 'A' ? el.getAttribute('href') : '';
        
        // Si no es un enlace o el href es inválido/vacío, pero tiene texto que parece un enlace, usar el texto
        if (!href || href === '#' || href.trim() === '') {
          const txt = el.textContent.trim();
          if (
            txt.startsWith('http://') || 
            txt.startsWith('https://') || 
            txt.startsWith('/') || 
            txt.includes('.pdf') ||
            txt.includes('.doc')
          ) {
            href = txt;
          }
        }
        
        return (href && href !== '#' && href.trim() !== '') ? href.trim() : '';
      };

      // Mapear hasta 3 variantes (miniatura + imagen grande)
      const variants = [];
      for (let i = 1; i <= 3; i++) {
        const thumbUrl = getImgSrc(`.jypesa-disp-subimg-${i}`);
        if (thumbUrl) {
          const largeUrl = getImgSrc(`.jypesa-disp-subimg-${i}-large`) || thumbUrl;
          variants.push({
            thumb: thumbUrl,
            large: largeUrl
          });
        }
      }

      const imgEl = item.querySelector('.jypesa-disp-img-main');

      dispensers.push({
        name: name,
        badge: get('.jypesa-disp-badge') || 'Economy',
        badgeColor: get('.jypesa-disp-badge-color') || '',
        categoria: get('.jypesa-disp-categoria') || 'Sistemas de dispensación',
        categoriaDesc: get('.jypesa-disp-categoria-desc') || '',
        codigo: get('.jypesa-disp-codigo') || '-',
        capacidad: get('.jypesa-disp-capacidad') || '-',
        material: get('.jypesa-disp-material') || '-',
        seguridad: get('.jypesa-disp-seguridad') || '-',
        desc: get('.jypesa-disp-desc') || '',
        imgMain: getImgSrc('.jypesa-disp-img-main'),
        variants: variants,
        guiaLink: getLink('.jypesa-disp-guia-link'),
        fichaLink: getLink('.jypesa-disp-ficha-link')
      });
    });

    return dispensers.length ? dispensers : null;
  }

  // 5. Construir el HTML de los items del grid
  function buildGridHtml(dispensers) {
    if (!dispensers.length) {
      return `<div class="jypesa-sdc-empty">No hay dispensadores disponibles en esta categoría.</div>`;
    }

    return dispensers.map(disp => {
      const guideButton = disp.guiaLink
        ? `<a href="${disp.guiaLink}" target="_blank" class="jypesa-sdc-btn jypesa-sdc-btn-primary">
             Descargar guía de instalación
             ${downloadIcon}
           </a>`
        : '';

      const techButton = disp.fichaLink
        ? `<a href="${disp.fichaLink}" target="_blank" class="jypesa-sdc-btn jypesa-sdc-btn-secondary">
             Descargar ficha técnica
             ${downloadIcon}
           </a>`
        : '';

      let actionsHtml = '';
      if (guideButton || techButton) {
        actionsHtml = `
          <div class="jypesa-sdc-actions">
            ${guideButton}
            ${techButton}
          </div>
        `;
      }

      // Prepend la imagen principal como la primera miniatura/variante
      const allVariants = [];
      if (disp.imgMain) {
        allVariants.push({ thumb: disp.imgMain, large: disp.imgMain });
      }
      disp.variants.forEach(v => {
        if (v.thumb) allVariants.push(v);
      });

      // Generar HTML de miniaturas únicamente si hay más de una variante
      let thumbsHtml = '';
      if (allVariants.length > 1) {
        thumbsHtml = `
          <div class="jypesa-sdc-thumbs-row">
            ${allVariants.map((v, index) => {
              return `
                <div class="jypesa-sdc-thumb-box${index === 0 ? ' active' : ''}" data-large="${v.large}">
                  <img class="jypesa-sdc-thumb-img" src="${v.thumb}" alt="Variante" loading="lazy">
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      const badgeStyle = disp.badgeColor ? ` style="background-color: ${disp.badgeColor};"` : '';

      return `
        <div class="jypesa-sdc-column">
          <!-- Casing / Visual Display -->
          <div class="jypesa-sdc-display-container">
            ${disp.badge ? `<div class="jypesa-sdc-badge"${badgeStyle}>${disp.badge}</div>` : ''}
            ${disp.imgMain ? `<img class="jypesa-sdc-img-main" src="${disp.imgMain}" alt="${disp.name}" loading="lazy">` : ''}
          </div>

          <!-- Thumbs Container -->
          ${thumbsHtml}

          <!-- Detalles del Producto -->
          <div class="jypesa-sdc-details">
            <h3 class="jypesa-sdc-name">${disp.name}</h3>
            
            <div class="jypesa-sdc-specs">
              <div class="jypesa-sdc-spec-item">
                <span class="jypesa-sdc-spec-label">Código</span>
                <span class="jypesa-sdc-spec-value">${disp.codigo}</span>
              </div>
              <div class="jypesa-sdc-spec-item">
                <span class="jypesa-sdc-spec-label">Capacidad</span>
                <span class="jypesa-sdc-spec-value">${disp.capacidad}</span>
              </div>
              <div class="jypesa-sdc-spec-item">
                <span class="jypesa-sdc-spec-label">Material</span>
                <span class="jypesa-sdc-spec-value">${disp.material}</span>
              </div>
              <div class="jypesa-sdc-spec-item">
                <span class="jypesa-sdc-spec-label">Seguridad</span>
                <span class="jypesa-sdc-spec-value">${disp.seguridad}</span>
              </div>
            </div>

            <p class="jypesa-sdc-desc">${disp.desc}</p>

            ${actionsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  // 6. Inicializador del Widget y Event Listeners
  function initWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-sistemas-dispensacion-comparativa, [data-jypesa-sdc-widget], #jypesa-sistemas-dispensacion-comparativa'
    );
    if (!targets.length) return;

    targets.forEach(target => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      // Leer datos de Webflow CMS, usar fallback si no hay CMS
      const cmsData = readDispensersFromCMS(target);
      let dataToUse = cmsData || defaultDispensers;

      // Obtener el filtro de categoría (ej. "Sistemas de dispensación", "Soportes" o "Complementos")
      const categoryFilter = target.getAttribute('data-category-filter');
      
      let titleToUse = categoryFilter || "Sistemas de dispensación";
      let descToUse = "Diseñados para mejorar procesos, reducir desperdicio y garantizar consistencia.";

      // Filtrar por categoría usando data-category-filter (case-insensitive)
      if (categoryFilter) {
        const filterVal = categoryFilter.trim().toLowerCase();
        dataToUse = dataToUse.filter(disp => disp.categoria.toLowerCase() === filterVal);
      }

      // Tomar título y descripción dinámicos del primer elemento que coincida
      if (dataToUse.length > 0) {
        const firstMatch = dataToUse[0];
        if (firstMatch.categoria) {
          titleToUse = firstMatch.categoria;
        }
        if (firstMatch.categoriaDesc) {
          descToUse = firstMatch.categoriaDesc;
        }
      }

      // Ocultar wrapper fuente del CMS si existe
      const cmsSource = target.querySelector('.jypesa-sdc-cms-source') || 
                        document.querySelector('.jypesa-sdc-cms-source');
      if (cmsSource) {
        cmsSource.style.display = 'none';
      }

      // Estructurar el marcado general del Widget (Header + Grid + Dots)
      target.innerHTML = `
        <div class="jypesa-sdc-widget">
          <div class="jypesa-sdc-header">
            <div class="jypesa-sdc-destacable">
              <span class="jypesa-sdc-destacable-text">${titleToUse}</span>
            </div>
            <p class="jypesa-sdc-subtitle">${descToUse}</p>
          </div>
          <div class="jypesa-sdc-grid">
            ${buildGridHtml(dataToUse)}
          </div>
          <div class="jypesa-sdc-dots"></div>
        </div>
      `;

      // 7. Enganchar Event Listeners de Click para cambiar la imagen principal con transiciones
      const cards = target.querySelectorAll('.jypesa-sdc-column');
      cards.forEach(card => {
        const mainImg = card.querySelector('.jypesa-sdc-img-main');
        const thumbBoxes = card.querySelectorAll('.jypesa-sdc-thumb-box');

        thumbBoxes.forEach(box => {
          box.addEventListener('click', () => {
            const largeUrl = box.getAttribute('data-large');
            if (mainImg && largeUrl && mainImg.getAttribute('src') !== largeUrl) {
              mainImg.style.opacity = '0';
              setTimeout(() => {
                mainImg.setAttribute('src', largeUrl);
                mainImg.style.opacity = '1';
              }, 200);

              thumbBoxes.forEach(b => b.classList.remove('active'));
              box.classList.add('active');
            }
          });
        });
      });

      // 8. Lógica de Slider Móvil (para pantallas <= 768px)
      const grid = target.querySelector('.jypesa-sdc-grid');
      const dotsContainer = target.querySelector('.jypesa-sdc-dots');
      if (grid && dotsContainer && dataToUse.length > 0) {
        // Generar dots dinámicos
        dotsContainer.innerHTML = dataToUse.map((_, index) => `
          <button class="jypesa-sdc-dot${index === 0 ? ' active' : ''}" data-index="${index}" aria-label="Ir a producto ${index + 1}"></button>
        `).join('');

        const dots = dotsContainer.querySelectorAll('.jypesa-sdc-dot');

        // Escuchar scroll para actualizar el dot activo
        const handleScroll = () => {
          const scrollLeft = grid.scrollLeft;
          const slide = grid.querySelector('.jypesa-sdc-column');
          if (!slide) return;
          const width = slide.offsetWidth + 20; // slide width + 20px gap
          if (width <= 0) return;
          const activeIdx = Math.min(dots.length - 1, Math.max(0, Math.round(scrollLeft / width)));

          dots.forEach((dot, idx) => {
            if (idx === activeIdx) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        };

        grid.addEventListener('scroll', handleScroll);

        // Hacer clic en un dot para ir al slide
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            const slide = grid.querySelector('.jypesa-sdc-column');
            if (!slide) return;
            const width = slide.offsetWidth + 20; // slide width + 20px gap
            grid.scrollTo({ left: index * width, behavior: 'smooth' });
          });
        });
      }
    });
  }

  // Ejecución
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
