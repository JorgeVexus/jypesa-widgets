(function() {
  // Evitar doble inicialización
  if (window.__JypesaColeccionesHoteleriaWidgetInitialized) return;
  window.__JypesaColeccionesHoteleriaWidgetInitialized = true;

  // Inyectar CSS
  const cssUrl = './widgets/colecciones-hoteleria/css/colecciones-hoteleria.css';
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = cssUrl;
  document.head.appendChild(cssLink);

  // SVG Icons
  const arrowRightIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  // HTML Base del Widget
  const widgetHtml = `
<div class="jypesa-colecciones-hoteleria-widget">
  <!-- Encabezado de la sección -->
  <div class="jypesa-colhot-section-header">
    <h2 class="jypesa-colhot-section-title">Colecciones recomendadas</h2>
    <p class="jypesa-colhot-section-desc">Colecciones diseñadas para adaptarse a distintos niveles de servicio, desde opciones funcionales hasta experiencias premium.</p>
  </div>

  <!-- Contenedor Deslizador -->
  <div class="jypesa-colhot-slider-outer">
    <!-- Contenedor de Tarjetas -->
    <div class="jypesa-colhot-products-container">
      <!-- Tarjeta 1 (Brand): Almond -->
      <div class="jypesa-colhot-card-brand">
        <div class="jypesa-colhot-card-brand-img-wrap">
          <img class="jypesa-colhot-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif" alt="Colección Almond">
        </div>
        <div class="jypesa-colhot-card-brand-info">
          <div class="jypesa-colhot-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b52eaf112499de5983e3f_almond%20brown.avif" alt="Almond Logo">
          </div>
          <a href="#" class="jypesa-btn-colhot btn-brand">
            Ver colección
            <span class="jypesa-btn-colhot-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 2 (Brand): Biogena -->
      <div class="jypesa-colhot-card-brand">
        <div class="jypesa-colhot-card-brand-img-wrap">
          <img class="jypesa-colhot-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e902b07bcb3cb0c9342a5_biogena%20card.avif" alt="Colección Biogena">
        </div>
        <div class="jypesa-colhot-card-brand-info">
          <div class="jypesa-colhot-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a45942a20a286e2747e72b2_biogena%20logo.avif" alt="Biogena Logo">
          </div>
          <a href="#" class="jypesa-btn-colhot btn-brand">
            Ver colección
            <span class="jypesa-btn-colhot-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 3 (Brand): Lavarino -->
      <div class="jypesa-colhot-card-brand">
        <div class="jypesa-colhot-card-brand-img-wrap">
          <img class="jypesa-colhot-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e902bed7c023d091ad15c_lavarino%20card.avif" alt="Colección Lavarino">
        </div>
        <div class="jypesa-colhot-card-brand-info">
          <div class="jypesa-colhot-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e8fdfc2e926006bcb07fd_lavarino%20color.avif" alt="Lavarino Logo">
          </div>
          <a href="#" class="jypesa-btn-colhot btn-brand">
            Ver colección
            <span class="jypesa-btn-colhot-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 4 (Brand): Persea -->
      <div class="jypesa-colhot-card-brand">
        <div class="jypesa-colhot-card-brand-img-wrap">
          <img class="jypesa-colhot-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e902bbfa0dffa388036ad_persea%20card.avif" alt="Colección Persea">
        </div>
        <div class="jypesa-colhot-card-brand-info">
          <div class="jypesa-colhot-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e9029fdb871d2a4e0f94f_persea%20black%20logo.avif" alt="Persea Logo">
          </div>
          <a href="#" class="jypesa-btn-colhot btn-brand">
            Ver colección
            <span class="jypesa-btn-colhot-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  // Renderizado del Widget
  function initColeccionesHoteleriaWidget() {
    const target = document.getElementById('jypesa-colecciones-hoteleria-widget') || document.querySelector('[data-jypesa-colecciones-hoteleria-widget]');
    if (!target) return;

    target.innerHTML = widgetHtml;

    const container = target.querySelector('.jypesa-colhot-products-container');

    if (!container) return;

    // Calcular desplazamiento entre tarjetas
    const getScrollStep = () => {
      const cardEl = container.querySelector('.jypesa-colhot-card-brand');
      if (!cardEl) return 340;
      const cardWidth = cardEl.offsetWidth;
      const gap = window.innerWidth <= 768 ? 16 : 25;
      return cardWidth + gap;
    };

    // Scroll con botones desktop
    const prevBtn = target.querySelector('.prev-btn');
    const nextBtn = target.querySelector('.next-btn');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Botones mobile
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');

    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Dots en mobile
    const dots = target.querySelectorAll('.jypesa-colhot-dot');

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
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      if (prevBtn && nextBtn) {
        if (scrollLeft <= 5) {
          prevBtn.style.opacity = '0';
          prevBtn.style.visibility = 'hidden';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.visibility = 'visible';
        }

        if (scrollLeft >= maxScroll - 5) {
          nextBtn.style.opacity = '0';
          nextBtn.style.visibility = 'hidden';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.visibility = 'visible';
        }
      }

      if (prevMobileBtn && nextMobileBtn) {
        if (scrollLeft <= 5) {
          prevMobileBtn.classList.add('disabled');
        } else {
          prevMobileBtn.classList.remove('disabled');
        }

        if (scrollLeft >= maxScroll - 5) {
          nextMobileBtn.classList.add('disabled');
        } else {
          nextMobileBtn.classList.remove('disabled');
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    setTimeout(handleScroll, 300);
  }

  // Cargar widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColeccionesHoteleriaWidget);
  } else {
    initColeccionesHoteleriaWidget();
  }
})();
