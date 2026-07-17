(function () {
  // Evitar doble inicialización
  if (window.__JypesaPartnersMarqueeWidgetInitialized) return;
  window.__JypesaPartnersMarqueeWidgetInitialized = true;

  // ─── 1. INYECCIÓN DE ESTILOS CSS ───────────────────────────────────────────
  const css = `
  .jypesa-partners-marquee-container {
    width: 100%;
    overflow: hidden;
    background: transparent;
    padding: 20px 0;
    display: block;
    box-sizing: border-box;
  }

  .jypesa-partners-marquee-container * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .jypesa-partners-marquee-track {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    will-change: transform;
    animation: jypesa-partners-marquee-scroll var(--jypesa-marquee-duration, 20s) linear infinite;
  }

  .jypesa-partners-marquee-item {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
  }

  .jypesa-partners-marquee-item img {
    height: 50px;
    max-height: 50px;
    max-width: 130px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  /* Animación horizontal infinita */
  @keyframes jypesa-partners-marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Ajustes para móviles */
  @media (max-width: 479px) {
    .jypesa-partners-marquee-item {
      padding: 0 20px;
    }
    .jypesa-partners-marquee-item img {
      height: 35px;
      max-height: 35px;
      max-width: 90px;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── 2. LOGOS DE FALLBACK POR DEFECTO (17 LOGOS) ───────────────────────────
  const fallbackLogos = [
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e72767d30050a400a0bcf_elements%2001.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7276ffc51ee72ae73f41_tea%20leaf%2002.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7277d307b0bb54574407_rainforest%2003.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7276abf0ec18d6aaecf4_ayo%2004.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727745701dd685b875ec_cava-logo%2005.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275910f1612b878c54a_biogena_logo%202%2006.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275a1b09e5bf135c618_lavarino_logo%202%2007.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727523c9f6ce77be39cd_dove_logo%202%2008.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275e19e819716d5be2b_tresemme-logo%202%2009.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727573dce274159f2ee3_vervan_logo%202%2010.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7275f7c1071d6567dc20_hawaiian-tropic-1-logo-png-transparent%2011.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e72740db3862dc342bed6_FAF_logo%2012.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e727481172bebada70930_persea%20logo%2013.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274062c939df35cb162_agavia%20logo%2014.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274910f1612b878c088_Logo-Valquer%202%2015.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274910f1612b878c084_xinu_logo%2016.avif',
    'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e7274bc85f259d8bfe18c_botanicaromatica%2017.avif'
  ];

  // ─── 3. LEER LOGOS DESDE EL CMS DE WEBFLOW ───────────────────────────────────
  function readLogosFromCMS() {
    const sourceContainer = document.querySelector('.jypesa-partners-marquee-cms-source');
    if (!sourceContainer) return null;

    const items = Array.from(sourceContainer.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const logos = [];
    items.forEach((item) => {
      // Intentar buscar la imagen del logo dentro del collection item
      const img = item.querySelector('.jypesa-partners-marquee-cms-img');
      if (img) {
        const src = img.getAttribute('src');
        // Ignorar placeholders vacíos de Webflow
        if (src && src.trim() !== '' && !src.includes('placeholder') && src !== '#') {
          logos.push(src);
        }
      }
    });

    return logos.length ? logos : null;
  }

  // ─── 4. LÓGICA DE MULTIPLICACIÓN Y GENERACIÓN DEL TRACK INFINITO ──────────────
  function generateInfiniteLogosTrack(uniqueLogos) {
    let baseList = [...uniqueLogos];

    // Asegurar que la lista de logos cubra holgadamente cualquier ancho de pantalla (mínimo 15 logos)
    // Esto previene que queden huecos en el translateX(-50%) si suben pocos logos en el CMS
    while (baseList.length < 15) {
      baseList = baseList.concat(uniqueLogos);
    }

    // Duplicar el bloque resultante completo (bloque A + bloque A)
    // Esto garantiza un reinicio seamless e invisible en la animación
    const fullList = baseList.concat(baseList);

    return fullList
      .map((logoUrl) => `
        <div class="jypesa-partners-marquee-item">
          <img src="${logoUrl}" alt="Partner Logo" loading="lazy">
        </div>
      `)
      .join('');
  }

  // ─── 5. INICIALIZAR EL WIDGET EN EL DOM ──────────────────────────────────────
  function initPartnersMarqueeWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-partners-marquee-widget, [data-jypesa-partners-marquee-widget], #jypesa-partners-marquee-widget'
    );
    if (!targets.length) return;

    // Leer del CMS (Si existe, sino fallback)
    const cmsLogos = readLogosFromCMS();
    const sourceLogos = cmsLogos || fallbackLogos;

    const itemsHtml = generateInfiniteLogosTrack(sourceLogos);

    targets.forEach((target) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      // Leer la duración del scroll desde el data attribute (ej: data-duration="30s")
      // Por defecto irá a 20s
      const duration = target.getAttribute('data-duration') || '20s';

      // Inyectar HTML del carrusel
      target.innerHTML = `
        <div class="jypesa-partners-marquee-container">
          <div class="jypesa-partners-marquee-track" style="--jypesa-marquee-duration: ${duration};">
            ${itemsHtml}
          </div>
        </div>
      `;
    });
  }

  // Ejecución al estar listo el DOM o de inmediato si ya cargó
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartnersMarqueeWidget);
  } else {
    initPartnersMarqueeWidget();
  }
})();
