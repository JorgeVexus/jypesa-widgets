(function() {
  // Evitar doble inicialización
  if (window.__JypesaColeccionesEmpresarialWidgetInitialized) return;
  window.__JypesaColeccionesEmpresarialWidgetInitialized = true;

  // Inyectar CSS desde archivo externo
  const cssUrl = './widgets/colecciones-empresarial/css/colecciones-empresarial.css';
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = cssUrl;
  document.head.appendChild(cssLink);

  // SVG Icono flecha derecha
  const arrowRightIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  // HTML Base del Widget
  const widgetHtml = `
<div class="jypesa-colecciones-empresarial-widget">
  <!-- Encabezado de la sección -->
  <div class="jypesa-colemp-section-header">
    <h2 class="jypesa-colemp-section-title">Colecciones recomendadas</h2>
    <p class="jypesa-colemp-section-desc">Colecciones diseñadas para adaptarse a distintos niveles de servicio, desde opciones funcionales hasta experiencias premium.</p>
  </div>

  <!-- Contenedor Deslizador -->
  <div class="jypesa-colemp-slider-outer">
    <!-- Botones Navegación Desktop -->
    <div class="jypesa-colemp-nav-btn prev-btn">
      <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </div>
    <div class="jypesa-colemp-nav-btn next-btn">
      <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </div>

    <!-- Contenedor de Tarjetas -->
    <div class="jypesa-colemp-products-container">

      <!-- Tarjeta 1: FULL IMAGE (sin logo ni botón) -->
      <div class="jypesa-colemp-card-full">
        <div class="jypesa-colemp-card-full-img-wrap">
          <img class="jypesa-colemp-card-full-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4fef8ee1447ef4420eb936_empresarial%20card%201.avif" alt="Colección Empresarial 1">
        </div>
      </div>

      <!-- Tarjeta 2: BRAND NORMAL (Lavarino) -->
      <div class="jypesa-colemp-card-brand">
        <div class="jypesa-colemp-card-brand-img-wrap">
          <img class="jypesa-colemp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4fef4ffbca91008c0ff455_cava%20empresarial%20card.avif" alt="Cava Empresarial">
        </div>
        <div class="jypesa-colemp-card-brand-info">
          <div class="jypesa-colemp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4594281a9344acaeb8027d_lavarino%20logo.avif" alt="Lavarino Logo">
          </div>
          <a href="#" class="jypesa-btn-colemp btn-brand">
            Ver colección
            <span class="jypesa-btn-colemp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 3: BRAND NORMAL (Cava) -->
      <div class="jypesa-colemp-card-brand">
        <div class="jypesa-colemp-card-brand-img-wrap">
          <img class="jypesa-colemp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4fef4ffbca91008c0ff455_cava%20empresarial%20card.avif" alt="Cava Empresarial">
        </div>
        <div class="jypesa-colemp-card-brand-info">
          <div class="jypesa-colemp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ea0d760af0a672aea1dac_cava-logo%20color.avif" alt="Cava Logo">
          </div>
          <a href="#" class="jypesa-btn-colemp btn-brand">
            Ver colección
            <span class="jypesa-btn-colemp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Paginación por Puntos (Mobile) -->
    <div class="jypesa-colemp-controls-mobile">
      <button class="jypesa-colemp-mobile-nav prev-mobile-btn" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div class="jypesa-colemp-dots-container">
        <span class="jypesa-colemp-dot active" data-index="0"></span>
        <span class="jypesa-colemp-dot" data-index="1"></span>
        <span class="jypesa-colemp-dot" data-index="2"></span>
      </div>
      <button class="jypesa-colemp-mobile-nav next-mobile-btn" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  </div>
</div>
`;

  // Renderizado del Widget
  function initColeccionesEmpresarialWidget() {
    const target = document.getElementById('jypesa-colecciones-empresarial-widget') || document.querySelector('[data-jypesa-colecciones-empresarial-widget]');
    if (!target) return;

    target.innerHTML = widgetHtml;

    const container = target.querySelector('.jypesa-colemp-products-container');
    const prevBtn = target.querySelector('.prev-btn');
    const nextBtn = target.querySelector('.next-btn');
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');
    const dots = target.querySelectorAll('.jypesa-colemp-dot');

    if (!container) return;

    // Calcular desplazamiento entre tarjetas
    const getScrollStep = () => {
      const cardEl = container.querySelector('.jypesa-colemp-card-full') || container.querySelector('.jypesa-colemp-card-brand');
      if (!cardEl) return 340;
      const cardWidth = cardEl.offsetWidth;
      const gap = window.innerWidth <= 768 ? 16 : 25;
      return cardWidth + gap;
    };

    // Flechas desktop
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Flechas mobile
    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        container.scrollTo({ left: idx * getScrollStep(), behavior: 'smooth' });
      });
    });

    // Actualizar estado al hacer scroll
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const step = getScrollStep();
      const maxScroll = container.scrollWidth - container.clientWidth;

      const activeIndex = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(scrollLeft / step))
      );

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });

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
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    setTimeout(handleScroll, 300);
  }

  // Cargar widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColeccionesEmpresarialWidget);
  } else {
    initColeccionesEmpresarialWidget();
  }
})();
