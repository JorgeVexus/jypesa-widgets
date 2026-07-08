(function () {
  // Evitar doble inicialización
  if (window.__JypesaColeccionesHoteleriaWidgetInitialized) return;
  window.__JypesaColeccionesHoteleriaWidgetInitialized = true;

  // Inyectar CSS
  const cssStyles = `
/* CSS para el Widget de Colecciones Hoteleria Jypesa */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap');

:root {
  --jypesa-colhot-bg: transparent;
  --jypesa-colhot-slate: #506D85;
  --jypesa-colhot-blue: #48A9C5;
  --jypesa-colhot-border: rgba(80, 109, 133, 0.2);
}

.jypesa-colecciones-hoteleria-widget {
  position: relative;
  width: 100%;
  background: transparent;
  font-family: 'Rubik', sans-serif;
  color: var(--jypesa-colhot-slate);
  padding: 60px 0;
  box-sizing: border-box;
  overflow: hidden;
}

/* TÍTULO DE LA SECCIÓN */
.jypesa-colhot-section-header {
  max-width: 940px;
  margin: 0 auto 48px;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.jypesa-colhot-section-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 37px;
  line-height: 1.1;
  color: var(--jypesa-colhot-slate);
  margin: 0;
}

.jypesa-colhot-section-desc {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.35;
  color: var(--jypesa-colhot-slate);
  margin: 0;
}

/* CONTENEDOR DE PRODUCTOS (FLEX / SCROLL) */
.jypesa-colhot-slider-outer {
  position: relative;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.jypesa-colhot-products-container {
  display: flex;
  gap: 25px;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px !important;
  margin: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 40px;
}

.jypesa-colhot-products-container::-webkit-scrollbar {
  display: none;
}

/* BOTONES DE NAVEGACIÓN HORIZONTAL (DESKTOP) */
.jypesa-colhot-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(80, 109, 133, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(80, 109, 133, 0.1);
  color: var(--jypesa-colhot-slate);
  transition: all 0.25s ease;
  user-select: none;
  opacity: 0;
  visibility: hidden;
}

.jypesa-colhot-slider-outer:hover .jypesa-colhot-nav-btn {
  opacity: 1;
  visibility: visible;
}

.jypesa-colhot-nav-btn:hover {
  background: #ffffff;
  color: var(--jypesa-colhot-blue);
  box-shadow: 0 6px 16px rgba(80, 109, 133, 0.18);
  border-color: rgba(80, 109, 133, 0.3);
}

.jypesa-colhot-nav-btn.prev-btn { left: 10px; }
.jypesa-colhot-nav-btn.next-btn { right: 10px; }

.jypesa-colhot-nav-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* PAGINACIÓN POR PUNTOS */
.jypesa-colhot-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  width: 100%;
}

.jypesa-colhot-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(80, 109, 133, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-colhot-dot.active {
  background: var(--jypesa-colhot-blue);
  width: 24px;
  border-radius: 100px;
}

/* CONTROLES DE DESPLAZAMIENTO MÓVIL */
.jypesa-colhot-controls-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
}

.jypesa-colhot-mobile-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(80, 109, 133, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jypesa-colhot-slate);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 109, 133, 0.08);
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.jypesa-colhot-mobile-nav:active {
  background: var(--jypesa-colhot-bg);
  color: var(--jypesa-colhot-blue);
  transform: scale(0.95);
}

.jypesa-colhot-mobile-nav.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.jypesa-colhot-mobile-nav svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* TARJETAS TIPO 1: COLECCIONES (ALMOND / BIOGENA / LAVARINO / PERSEA) */
.jypesa-colhot-card-brand {
  flex: 0 0 311px;
  width: 311px;
  height: 532px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 14.4px rgba(80, 109, 133, 0.1);
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  scroll-snap-align: start;
}

.jypesa-colhot-card-brand:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(80, 109, 133, 0.18);
}

.jypesa-colhot-card-brand-img-wrap {
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
}

.jypesa-colhot-card-brand-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-colhot-card-brand:hover .jypesa-colhot-card-brand-img {
  transform: scale(1.05);
}

.jypesa-colhot-card-brand-info {
  background: #ffffff;
  padding: 24px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.jypesa-colhot-brand-logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jypesa-colhot-brand-logo-container img {
  max-height: 100%;
  max-width: 180px;
  object-fit: contain;
}

/* BOTONES Y SUS ANIMACIONES DE HOVER */
.jypesa-colhot-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 39px;
  border-radius: 6px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
}

/* Botún Colección (Azul) */
.jypesa-colhot-btn.btn-brand {
  background-color: var(--jypesa-colhot-blue);
  color: #ffffff;
  width: 218px;
  font-size: 18px;
  letter-spacing: 0.9px;
  border: none;
}

.jypesa-colhot-btn.btn-brand:hover {
  background-color: #3b91a9;
  box-shadow: 0 4px 12px rgba(72, 169, 197, 0.25);
}

/* Iconos de Botones */
.jypesa-colhot-btn-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-colhot-btn-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

/* Animación de Hover en Botón */
.jypesa-colhot-btn:hover .jypesa-colhot-btn-icon {
  transform: translateX(6px);
}

/* RESPONSIVIDAD */
@media (max-width: 768px) {
  .jypesa-colecciones-hoteleria-widget {
    padding: 40px 0;
  }
  .jypesa-colhot-section-header {
    margin-bottom: 30px;
  }
  .jypesa-colhot-section-title {
    font-size: 28px;
  }
  .jypesa-colhot-section-desc {
    font-size: 14px;
  }
  
  .jypesa-colhot-slider-outer {
    padding: 0 20px;
  }
  
  .jypesa-colhot-products-container {
    scroll-padding: 0 20px;
    gap: 16px;
  }

  .jypesa-colhot-card-brand {
    flex: 0 0 calc(100% - 20px);
    width: calc(100% - 20px);
    scroll-snap-align: center;
  }

  .jypesa-colhot-nav-btn {
    display: none !important;
  }
}

/* Desktop: 4 cards fijas en una sola fila */
@media (min-width: 769px) {
  .jypesa-colhot-mobile-nav {
    display: none !important;
  }

  .jypesa-colhot-slider-outer {
    padding: 0 20px;
  }

  .jypesa-colhot-products-container {
    overflow-x: hidden !important;
    scroll-snap-type: none !important;
    justify-content: center;
    gap: 20px;
    padding: 0;
    margin: 0;
  }

  .jypesa-colhot-nav-btn {
    display: none !important;
  }

  .jypesa-colhot-card-brand {
    flex: 0 0 235px;
    width: 235px;
    height: auto;
  }

  .jypesa-colhot-card-brand-img-wrap {
    height: 235px;
  }

  .jypesa-colhot-brand-logo-container {
    height: 50px;
  }

  .jypesa-colhot-brand-logo-container img {
    max-width: 160px;
  }

  .jypesa-colhot-card-brand-info {
    padding: 20px 16px;
  }

  .jypesa-colhot-btn.btn-brand {
    width: 195px;
    font-size: 14px;
    letter-spacing: 0.4px;
    height: 34px;
  }

  .jypesa-colhot-controls-mobile {
    display: none !important;
  }

  .jypesa-colhot-dots-container {
    display: none !important;
  }
}
`;

  // Crear e inyectar etiqueta de estilo en el head
  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // SVG Icons
  const arrowRightIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
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
    
    <!-- Botones de Navegación (Desktop) -->
    <div class="jypesa-colhot-nav-btn prev-btn">
      <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </div>
    <div class="jypesa-colhot-nav-btn next-btn">
      <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </div>

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
          <a href="#" class="jypesa-colhot-btn btn-brand">
            Ver colección
            <span class="jypesa-colhot-btn-icon">${arrowRightIcon}</span>
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
          <a href="#" class="jypesa-colhot-btn btn-brand">
            Ver colección
            <span class="jypesa-colhot-btn-icon">${arrowRightIcon}</span>
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
          <a href="#" class="jypesa-colhot-btn btn-brand">
            Ver colección
            <span class="jypesa-colhot-btn-icon">${arrowRightIcon}</span>
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
          <a href="#" class="jypesa-colhot-btn btn-brand">
            Ver colección
            <span class="jypesa-colhot-btn-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Paginación por Puntos (Controles de Desplazamiento Celular/Desktop) -->
    <div class="jypesa-colhot-controls-mobile">
      <button class="jypesa-colhot-mobile-nav prev-mobile-btn" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div class="jypesa-colhot-dots-container">
        <span class="jypesa-colhot-dot active" data-index="0"></span>
        <span class="jypesa-colhot-dot" data-index="1"></span>
        <span class="jypesa-colhot-dot" data-index="2"></span>
        <span class="jypesa-colhot-dot" data-index="3"></span>
      </div>
      <button class="jypesa-colhot-mobile-nav next-mobile-btn" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
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
    const prevBtn = target.querySelector('.jypesa-colhot-nav-btn.prev-btn');
    const nextBtn = target.querySelector('.jypesa-colhot-nav-btn.next-btn');
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');
    const dots = target.querySelectorAll('.jypesa-colhot-dot');

    if (!container) return;

    // Calcular desplazamiento entre tarjetas
    const getScrollStep = () => {
      const cardEl = container.querySelector('.jypesa-colhot-card-brand');
      if (!cardEl) return 340;
      const cardWidth = cardEl.offsetWidth;
      const gap = window.innerWidth <= 768 ? 16 : 25;
      return cardWidth + gap;
    };

    // Manejo de clicks en flechas de navegación (Escritorio)
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Manejo de clicks en flechas de navegación (Móvil)
    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
      nextMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Manejo de clicks en puntos de paginación
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        container.scrollTo({ left: idx * getScrollStep(), behavior: 'smooth' });
      });
    });

    // Actualización de puntos activos y visibilidad de flechas al hacer scroll
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const step = getScrollStep();
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Calcular índice activo
      const activeIndex = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(scrollLeft / step))
      );

      // Actualizar clases de los puntos
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      // Actualizar flechas de escritorio
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

      // Actualizar flechas de móvil
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

    // Configuración inicial
    setTimeout(handleScroll, 300);
  }

  // Cargar widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColeccionesHoteleriaWidget);
  } else {
    initColeccionesHoteleriaWidget();
  }
})();
