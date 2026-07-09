(function() {
  if (window.__JypesaColeccionesHospitalidadAvanzadaWidgetInitialized) return;
  window.__JypesaColeccionesHospitalidadAvanzadaWidgetInitialized = true;

  // Inyectar CSS inline
  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap');

:root {
  --jypesa-colhosp-bg: transparent;
  --jypesa-colhosp-slate: #506D85;
  --jypesa-colhosp-blue: #48A9C5;
  --jypesa-colhosp-border: rgba(80, 109, 133, 0.2);
}

.jypesa-colecciones-hospitalidad-avanzada-widget {
  position: relative;
  width: 100%;
  background: transparent;
  font-family: 'Rubik', sans-serif;
  color: var(--jypesa-colhosp-slate);
  padding: 60px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.jypesa-colhosp-section-header {
  max-width: 940px;
  margin: 0 auto 48px;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.jypesa-colhosp-section-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 37px;
  line-height: 1.1;
  color: var(--jypesa-colhosp-slate);
  margin: 0;
}

.jypesa-colhosp-section-desc {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.35;
  color: var(--jypesa-colhosp-slate);
  margin: 0;
}

.jypesa-colhosp-slider-outer {
  position: relative;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.jypesa-colhosp-products-container {
  display: flex;
  gap: 25px;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 15px 15px 30px !important;
  margin: -15px -15px -30px;
  box-sizing: border-box;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 40px;
}

.jypesa-colhosp-products-container::-webkit-scrollbar {
  display: none;
}

.jypesa-colhosp-nav-btn {
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
  color: var(--jypesa-colhosp-slate);
  transition: all 0.25s ease;
  user-select: none;
  opacity: 0;
  visibility: hidden;
}

.jypesa-colhosp-slider-outer:hover .jypesa-colhosp-nav-btn {
  opacity: 1;
  visibility: visible;
}

.jypesa-colhosp-nav-btn:hover {
  background: #ffffff;
  color: var(--jypesa-colhosp-blue);
  box-shadow: 0 6px 16px rgba(80, 109, 133, 0.18);
  border-color: rgba(80, 109, 133, 0.3);
}

.jypesa-colhosp-nav-btn.prev-btn { left: 10px; }
.jypesa-colhosp-nav-btn.next-btn { right: 10px; }

.jypesa-colhosp-nav-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.jypesa-colhosp-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  width: 100%;
}

.jypesa-colhosp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(80, 109, 133, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-colhosp-dot.active {
  background: var(--jypesa-colhosp-blue);
  width: 24px;
  border-radius: 100px;
}

.jypesa-colhosp-controls-mobile {
  display: none;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
}

.jypesa-colhosp-mobile-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(80, 109, 133, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jypesa-colhosp-slate);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 109, 133, 0.08);
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.jypesa-colhosp-mobile-nav:active {
  background: transparent;
  color: var(--jypesa-colhosp-blue);
  transform: scale(0.95);
}

.jypesa-colhosp-mobile-nav.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.jypesa-colhosp-mobile-nav svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.jypesa-colhosp-card-brand {
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

.jypesa-colhosp-card-brand:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(80, 109, 133, 0.18);
}

.jypesa-colhosp-card-brand-img-wrap {
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
}

.jypesa-colhosp-card-brand-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-colhosp-card-brand:hover .jypesa-colhosp-card-brand-img {
  transform: scale(1.05);
}

.jypesa-colhosp-card-brand-info {
  background: #ffffff;
  padding: 24px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.jypesa-colhosp-brand-logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.jypesa-colhosp-brand-logo-container img {
  max-height: 100%;
  max-width: 180px;
  object-fit: contain;
}

.jypesa-btn-colhosp {
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

.jypesa-btn-colhosp.btn-brand {
  background-color: var(--jypesa-colhosp-blue);
  color: #ffffff;
  width: 218px;
  font-size: 18px;
  letter-spacing: 0.9px;
  border: none;
}

.jypesa-btn-colhosp.btn-brand:hover {
  background-color: #3b91a9;
  box-shadow: 0 4px 12px rgba(72, 169, 197, 0.25);
}

.jypesa-btn-colhosp-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-btn-colhosp-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.jypesa-btn-colhosp:hover .jypesa-btn-colhosp-icon {
  transform: translateX(6px);
}

@media (max-width: 768px) {
  .jypesa-colecciones-hospitalidad-avanzada-widget {
    padding: 40px 0;
  }

  .jypesa-colhosp-section-header {
    margin-bottom: 30px;
  }

  .jypesa-colhosp-section-title {
    font-size: 28px;
  }

  .jypesa-colhosp-section-desc {
    font-size: 14px;
  }

  .jypesa-colhosp-slider-outer {
    padding: 0 20px;
  }

  .jypesa-colhosp-products-container {
    scroll-padding: 0 20px;
    gap: 16px;
  }

  .jypesa-colhosp-card-brand {
    flex: 0 0 calc(100% - 20px);
    width: calc(100% - 20px);
    height: auto;
    scroll-snap-align: center;
  }

  .jypesa-colhosp-card-brand-img-wrap {
    height: 280px;
  }

  .jypesa-colhosp-nav-btn {
    display: none !important;
  }

  .jypesa-colhosp-mobile-nav {
    display: flex;
  }
}

@media (min-width: 769px) {
  .jypesa-colhosp-mobile-nav {
    display: none !important;
  }

  .jypesa-colhosp-slider-outer {
    padding: 0 20px;
  }

  .jypesa-colhosp-products-container {
    overflow-x: hidden !important;
    scroll-snap-type: none !important;
    justify-content: center;
    gap: 20px;
    padding: 0;
    margin: 0;
  }

  .jypesa-colhosp-nav-btn {
    display: none !important;
  }

  .jypesa-colhosp-card-brand {
    flex: 0 0 235px;
    width: 235px;
    height: auto;
  }

  .jypesa-colhosp-card-brand-img-wrap {
    height: 235px;
  }

  .jypesa-colhosp-brand-logo-container {
    height: 50px;
  }

  .jypesa-colhosp-brand-logo-container img {
    max-width: 160px;
  }

  .jypesa-colhosp-card-brand-info {
    padding: 20px 16px;
  }

  .jypesa-btn-colhosp.btn-brand {
    width: 195px;
    font-size: 14px;
    letter-spacing: 0.4px;
    height: 34px;
  }

  .jypesa-colhosp-controls-mobile {
    display: none !important;
  }

  .jypesa-colhosp-dots-container {
    display: none !important;
  }
}
  `;

  // Inyectar CSS inline
  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  const arrowRightIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  const widgetHtml = `
<div class="jypesa-colecciones-hospitalidad-avanzada-widget">
  <div class="jypesa-colhosp-section-header">
    <h2 class="jypesa-colhosp-section-title">Colecciones recomendadas</h2>
    <p class="jypesa-colhosp-section-desc">Colecciones diseñadas para adaptarse a distintos niveles de servicio, desde opciones funcionales hasta experiencias premium.</p>
  </div>

  <div class="jypesa-colhosp-slider-outer">
    <div class="jypesa-colhosp-nav-btn prev-btn">
      <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </div>
    <div class="jypesa-colhosp-nav-btn next-btn">
      <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </div>

    <div class="jypesa-colhosp-products-container">

      <!-- Card 1: Biogena -->
      <div class="jypesa-colhosp-card-brand">
        <div class="jypesa-colhosp-card-brand-img-wrap">
          <img class="jypesa-colhosp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e902b07bcb3cb0c9342a5_biogena%20card.avif" alt="Colección Biogena">
        </div>
        <div class="jypesa-colhosp-card-brand-info">
          <div class="jypesa-colhosp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a45942a20a286e2747e72b2_biogena%20logo.avif" alt="Biogena Logo">
          </div>
          <a href="#" class="jypesa-btn-colhosp btn-brand">
            Ver colección
            <span class="jypesa-btn-colhosp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Card 2: Valquer -->
      <div class="jypesa-colhosp-card-brand">
        <div class="jypesa-colhosp-card-brand-img-wrap">
          <img class="jypesa-colhosp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ff40f7ffdc80d1a704521_valquer%20card.png" alt="Colección Valquer">
        </div>
        <div class="jypesa-colhosp-card-brand-info">
          <div class="jypesa-colhosp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a45977b4602903e2d3f14e5_valquer%20logo.avif" alt="Valquer Logo">
          </div>
          <a href="#" class="jypesa-btn-colhosp btn-brand">
            Ver colección
            <span class="jypesa-btn-colhosp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Card 3: Botanica -->
      <div class="jypesa-colhosp-card-brand">
        <div class="jypesa-colhosp-card-brand-img-wrap">
          <img class="jypesa-colhosp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ea675c893eee24a7cf4a3_botanica%20card%2001.png" alt="Colección Botanica">
        </div>
        <div class="jypesa-colhosp-card-brand-info">
          <div class="jypesa-colhosp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ea674336b9ada8e17984a_botanica%20logo%20color.png" alt="Botanica Logo">
          </div>
          <a href="#" class="jypesa-btn-colhosp btn-brand">
            Ver colección
            <span class="jypesa-btn-colhosp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Card 4: Persea -->
      <div class="jypesa-colhosp-card-brand">
        <div class="jypesa-colhosp-card-brand-img-wrap">
          <img class="jypesa-colhosp-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e902bbfa0dffa388036ad_persea%20card.avif" alt="Colección Persea">
        </div>
        <div class="jypesa-colhosp-card-brand-info">
          <div class="jypesa-colhosp-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4e9029fdb871d2a4e0f94f_persea%20black%20logo.avif" alt="Persea Logo">
          </div>
          <a href="#" class="jypesa-btn-colhosp btn-brand">
            Ver colección
            <span class="jypesa-btn-colhosp-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

    </div>

    <div class="jypesa-colhosp-controls-mobile">
      <button class="jypesa-colhosp-mobile-nav prev-mobile-btn" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div class="jypesa-colhosp-dots-container">
        <span class="jypesa-colhosp-dot active" data-index="0"></span>
        <span class="jypesa-colhosp-dot" data-index="1"></span>
        <span class="jypesa-colhosp-dot" data-index="2"></span>
        <span class="jypesa-colhosp-dot" data-index="3"></span>
      </div>
      <button class="jypesa-colhosp-mobile-nav next-mobile-btn" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  </div>
</div>
`;

  function initColeccionesHospitalidadAvanzadaWidget() {
    const target = document.getElementById('jypesa-colecciones-hospitalidad-avanzada-widget') || document.querySelector('[data-jypesa-colecciones-hospitalidad-avanzada-widget]');
    if (!target) return;

    target.innerHTML = widgetHtml;

    const container = target.querySelector('.jypesa-colhosp-products-container');
    const prevBtn = target.querySelector('.prev-btn');
    const nextBtn = target.querySelector('.next-btn');
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');
    const dots = target.querySelectorAll('.jypesa-colhosp-dot');

    if (!container) return;

    const getScrollStep = () => {
      const cardEl = container.querySelector('.jypesa-colhosp-card-brand');
      if (!cardEl) return 340;
      const cardWidth = cardEl.offsetWidth;
      const gap = window.innerWidth <= 768 ? 16 : 25;
      return cardWidth + gap;
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' }));
      nextBtn.addEventListener('click', () => container.scrollBy({ left: getScrollStep(), behavior: 'smooth' }));
    }

    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.addEventListener('click', () => container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' }));
      nextMobileBtn.addEventListener('click', () => container.scrollBy({ left: getScrollStep(), behavior: 'smooth' }));
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => container.scrollTo({ left: idx * getScrollStep(), behavior: 'smooth' }));
    });

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const step = getScrollStep();
      const maxScroll = container.scrollWidth - container.clientWidth;
      const activeIndex = Math.min(dots.length - 1, Math.max(0, Math.round(scrollLeft / step)));

      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === activeIndex));

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColeccionesHospitalidadAvanzadaWidget);
  } else {
    initColeccionesHospitalidadAvanzadaWidget();
  }
})();
