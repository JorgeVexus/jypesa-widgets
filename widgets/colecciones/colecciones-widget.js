(function() {
  // Evitar doble inicialización
  if (window.__JypesaColeccionesWidgetInitialized) return;
  window.__JypesaColeccionesWidgetInitialized = true;

  // Inyectar CSS
  const cssStyles = `
/* CSS para el Widget de Colecciones Recomendadas Jypesa */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap');

:root {
  --jypesa-col-bg: #EEF7FA;
  --jypesa-col-slate: #506D85;
  --jypesa-col-blue: #48A9C5;
  --jypesa-col-border: rgba(80, 109, 133, 0.2);
}

.jypesa-colecciones-widget {
  position: relative;
  width: 100%;
  background: transparent;
  font-family: 'Rubik', sans-serif;
  color: var(--jypesa-col-slate);
  padding: 60px 0;
  box-sizing: border-box;
  overflow: hidden;
}

/* TÍTULO DE LA SECCIÓN */
.jypesa-col-section-header {
  max-width: 940px;
  margin: 0 auto 48px;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.jypesa-col-section-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 37px;
  line-height: 1.1;
  color: var(--jypesa-col-slate);
  margin: 0;
}

.jypesa-col-section-desc {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.35;
  color: var(--jypesa-col-slate);
  margin: 0;
}

/* CONTENEDOR DE PRODUCTOS (FLEX / SCROLL) */
.jypesa-col-slider-outer {
  position: relative;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.jypesa-col-products-container {
  display: flex;
  gap: 25px;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 15px 15px 30px;
  margin: -15px -15px -30px;
  box-sizing: border-box;
  scrollbar-width: none; /* Ocultar barra de desplazamiento estándar */
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 40px;
}

.jypesa-col-products-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* BOTONES DE NAVEGACIÓN HORIZONTAL (DESKTOP) */
.jypesa-col-nav-btn {
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
  color: var(--jypesa-col-slate);
  transition: all 0.25s ease;
  user-select: none;
  opacity: 0;
  visibility: hidden;
}

.jypesa-col-slider-outer:hover .jypesa-col-nav-btn {
  opacity: 1;
  visibility: visible;
}

.jypesa-col-nav-btn:hover {
  background: #ffffff;
  color: var(--jypesa-col-blue);
  box-shadow: 0 6px 16px rgba(80, 109, 133, 0.18);
  border-color: rgba(80, 109, 133, 0.3);
}

.jypesa-col-nav-btn.prev-btn { left: 10px; }
.jypesa-col-nav-btn.next-btn { right: 10px; }

.jypesa-col-nav-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* PAGINACIÓN POR PUNTOS */
.jypesa-col-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.jypesa-col-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(80, 109, 133, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-col-dot.active {
  background: var(--jypesa-col-blue);
  width: 24px;
  border-radius: 100px;
}

/* CONTROLES DE DESPLAZAMIENTO MÓVIL */
.jypesa-col-controls-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
}

.jypesa-col-mobile-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(80, 109, 133, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jypesa-col-slate);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 109, 133, 0.08);
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.jypesa-col-mobile-nav:active {
  background: var(--jypesa-col-bg);
  color: var(--jypesa-col-blue);
  transform: scale(0.95);
}

.jypesa-col-mobile-nav.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.jypesa-col-mobile-nav svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

@media (min-width: 769px) {
  .jypesa-col-mobile-nav {
    display: none !important;
  }
}

/* TARJETAS TIPO 1: COLECCIONES (ALMOND / ELEMENTS) */
.jypesa-card-brand {
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

.jypesa-card-brand:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(80, 109, 133, 0.18);
}

.jypesa-card-brand-img-wrap {
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
}

.jypesa-card-brand-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-card-brand:hover .jypesa-card-brand-img {
  transform: scale(1.05);
}

.jypesa-card-brand-info {
  background: #ffffff;
  padding: 24px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.jypesa-brand-logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jypesa-brand-logo-container img {
  max-height: 100%;
  max-width: 180px;
  object-fit: contain;
}

/* TARJETAS TIPO 2: PRODUCTO (AMENIDADES / SET VERSÁTIL / PREMIUM) */
.jypesa-card-product {
  flex: 0 0 330px;
  width: 330px;
  height: 535px;
  background: #ffffff;
  border: 2px solid var(--jypesa-col-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  scroll-snap-align: start;
}

.jypesa-card-product:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(80, 109, 133, 0.18);
  border-color: rgba(80, 109, 133, 0.4);
}

.jypesa-card-product-img-wrap {
  width: 100%;
  height: 330px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.jypesa-card-product-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-card-product:hover .jypesa-card-product-img {
  transform: scale(1.05);
}

.jypesa-card-product-details {
  padding: 16px 20px 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: center;
}

.jypesa-product-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.jypesa-product-title {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 21px;
  line-height: 1.2;
  color: var(--jypesa-col-slate);
  margin: 0 0 4px;
}

.jypesa-product-pack {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--jypesa-col-slate);
  margin: 0 0 8px;
}

.jypesa-product-specs {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: var(--jypesa-col-slate);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* BOTONES Y SUS ANIMACIONES DE HOVER */
.jypesa-btn-col {
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

/* Botón Colección (Azul) */
.jypesa-btn-col.btn-brand {
  background-color: var(--jypesa-col-blue);
  color: #ffffff;
  width: 218px;
  font-size: 18px;
  letter-spacing: 0.9px;
  border: none;
}

.jypesa-btn-col.btn-brand:hover {
  background-color: #3b91a9;
  box-shadow: 0 4px 12px rgba(72, 169, 197, 0.25);
}

/* Botón Amazon (Gris Pizarra) */
.jypesa-btn-col.btn-amazon {
  background-color: var(--jypesa-col-slate);
  border: 2px solid var(--jypesa-col-slate);
  color: #ffffff;
  width: 206px;
  font-size: 14px;
  letter-spacing: 0.7px;
  height: 38px;
}

.jypesa-btn-col.btn-amazon:hover {
  background-color: #3e5568;
  border-color: #3e5568;
  box-shadow: 0 4px 12px rgba(80, 109, 133, 0.25);
}

/* Iconos de Botones */
.jypesa-btn-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-btn-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

/* Animación de Hover en Botón */
.jypesa-btn-col:hover .jypesa-btn-icon {
  transform: translateX(6px);
}

/* RESPONSIVIDAD */
@media (max-width: 768px) {
  .jypesa-colecciones-widget {
    padding: 40px 0;
  }
  .jypesa-col-section-header {
    margin-bottom: 30px;
  }
  .jypesa-col-section-title {
    font-size: 28px;
  }
  .jypesa-col-section-desc {
    font-size: 14px;
  }
  
  .jypesa-col-slider-outer {
    padding: 0 20px;
  }
  
  .jypesa-col-products-container {
    scroll-padding: 0 20px;
    gap: 16px;
  }

  .jypesa-card-brand {
    flex: 0 0 calc(100% - 20px);
    width: calc(100% - 20px);
    scroll-snap-align: center;
  }

  .jypesa-card-product {
    flex: 0 0 calc(100% - 20px);
    width: calc(100% - 20px);
    scroll-snap-align: center;
  }

  .jypesa-col-nav-btn {
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

  const amazonIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M18.8 15.65c-1.12.87-2.9 1.34-4.88 1.34-3.57 0-6.49-1.5-6.49-5.18 0-4.05 3.32-5.46 7.42-5.46 1.15 0 2.29.13 3.12.33v-.55c0-1.84-1.07-2.9-2.9-2.9-1.57 0-3.07.72-3.83 1.29-.2.15-.46.12-.6-.08L9.27 2.76c-.12-.17-.08-.43.11-.56C10.74 1.25 12.89.7 15.42.7c3.84 0 5.92 2.06 5.92 6.13v6.79c0 1.05.42 1.62.9 2.07.17.15.19.42.04.58L20.6 18.06c-.15.15-.39.14-.52-.02-.45-.55-.8-.85-1.28-2.39zM18 10.7c-.64-.2-1.57-.3-2.37-.3-2.45 0-4.21.67-4.21 3.07 0 1.48.97 2.16 2.37 2.16 1.7 0 3.3-.92 4.21-2.43V10.7z"/>
      <path d="M2.8 20.35C7.9 23.4 16.3 23.55 21.2 20.25c.34-.23.63.14.3.41-3.9 3.25-11.4 3.75-16.7 1.15-.37-.18-.46-.62-.1-.85l.1-.06s0 0 0 0z"/>
      <path d="M22.06 18.45c-.24-.18-.53.07-.46.33.27.97.77 2.79-.1 3.53-.4.34-1.95-.08-2.88-.27-.27-.05-.44.19-.24.37.94.88 3 .95 3.5.52.5-.42.45-2.22.18-3.48v-.03s0 0 0 0z"/>
    </svg>
  `;

  // HTML Base del Widget
  const widgetHtml = `
<div class="jypesa-colecciones-widget">
  
  <!-- Encabezado de la sección -->
  <div class="jypesa-col-section-header">
    <h2 class="jypesa-col-section-title">Colecciones recomendadas</h2>
    <p class="jypesa-col-section-desc">Colecciones diseñadas para adaptarse a distintos niveles de servicio, desde opciones funcionales hasta experiencias premium.</p>
  </div>

  <!-- Contenedor Deslizador -->
  <div class="jypesa-col-slider-outer">
    
    <!-- Botones de Navegación (Desktop) -->
    <div class="jypesa-col-nav-btn prev-btn">
      <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </div>
    <div class="jypesa-col-nav-btn next-btn">
      <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </div>

    <!-- Contenedor de Tarjetas -->
    <div class="jypesa-col-products-container">
      
      <!-- Tarjeta 1 (Brand): Almond -->
      <div class="jypesa-card-brand">
        <div class="jypesa-card-brand-img-wrap">
          <img class="jypesa-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b532f0542e28e5b3ec0e1_collection-img-almond.avif" alt="Colección Almond">
        </div>
        <div class="jypesa-card-brand-info">
          <div class="jypesa-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b52eaf112499de5983e3f_almond%20brown.avif" alt="Almond Logo">
          </div>
          <a href="#" class="jypesa-btn-col btn-brand">
            Ver colección
            <span class="jypesa-btn-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 2 (Brand): Elements -->
      <div class="jypesa-card-brand">
        <div class="jypesa-card-brand-img-wrap">
          <img class="jypesa-card-brand-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d60d15698c25225221_collection-img-elements.avif" alt="Colección Elements">
        </div>
        <div class="jypesa-card-brand-info">
          <div class="jypesa-brand-logo-container">
            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e8ef22f4266f0cc0e2496e_elements%20logo%20color.avif" alt="Elements Logo">
          </div>
          <a href="#" class="jypesa-btn-col btn-brand">
            Ver colección
            <span class="jypesa-btn-icon">${arrowRightIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 3 (Product): Amenidades Hoteleras -->
      <div class="jypesa-card-product">
        <div class="jypesa-card-product-img-wrap">
          <img class="jypesa-card-product-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d6f624fb94a50edfe1_collection-img-amenidades.avif" alt="Amenidades hoteleras profesionales">
        </div>
        <div class="jypesa-card-product-details">
          <div class="jypesa-product-meta">
            <h3 class="jypesa-product-title">Amenidades hoteleras profesionales</h3>
            <span class="jypesa-product-pack">216 pzs./Caja</span>
            <div class="jypesa-product-specs">
              <span>96 Shampoos (40ml)</span>
              <span>120 Jabones (20g)</span>
            </div>
          </div>
          <a href="#" class="jypesa-btn-col btn-amazon">
            Comprar en Amazon
            <span class="jypesa-btn-icon">${amazonIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 4 (Product): Set Versátil -->
      <div class="jypesa-card-product">
        <div class="jypesa-card-product-img-wrap">
          <img class="jypesa-card-product-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d66ea18620390b0eec_collection-img-set-versatil.avif" alt="Set versátil">
        </div>
        <div class="jypesa-card-product-details">
          <div class="jypesa-product-meta">
            <h3 class="jypesa-product-title">Set versátil</h3>
            <span class="jypesa-product-pack">100 pzs./Caja</span>
            <div class="jypesa-product-specs">
              <span>32 Shampoo (40ml)</span>
              <span>32 Cremas humectantes (40ml)</span>
              <span>36 Jabones (20g)</span>
            </div>
          </div>
          <a href="#" class="jypesa-btn-col btn-amazon">
            Comprar en Amazon
            <span class="jypesa-btn-icon">${amazonIcon}</span>
          </a>
        </div>
      </div>

      <!-- Tarjeta 5 (Product): Amenidades Premium -->
      <div class="jypesa-card-product">
        <div class="jypesa-card-product-img-wrap">
          <img class="jypesa-card-product-img" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a0b58d59e6389f1a0c8ebbe_collection-img-set-amenidades-premium.avif" alt="Amenidades Premium">
        </div>
        <div class="jypesa-card-product-details">
          <div class="jypesa-product-meta">
            <h3 class="jypesa-product-title">Amenidades Premium</h3>
            <span class="jypesa-product-pack">320 pzs./Caja</span>
            <div class="jypesa-product-specs">
              <span>80 Shampoos (40ml)</span>
              <span>40 Acondicionadores (40ml)</span>
              <span>40 Geles de baño (40ml)</span>
              <span>40 Cremas humectantes (40ml)</span>
              <span>120 Jabones (20gr)</span>
            </div>
          </div>
          <a href="#" class="jypesa-btn-col btn-amazon">
            Comprar en Amazon
            <span class="jypesa-btn-icon">${amazonIcon}</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Paginación por Puntos (Controles de Desplazamiento Celular/Desktop) -->
    <div class="jypesa-col-controls-mobile">
      <button class="jypesa-col-mobile-nav prev-mobile-btn" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div class="jypesa-col-dots-container">
        <span class="jypesa-col-dot active" data-index="0"></span>
        <span class="jypesa-col-dot" data-index="1"></span>
        <span class="jypesa-col-dot" data-index="2"></span>
        <span class="jypesa-col-dot" data-index="3"></span>
        <span class="jypesa-col-dot" data-index="4"></span>
      </div>
      <button class="jypesa-col-mobile-nav next-mobile-btn" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>

  </div>
</div>
`;

  // Renderizado del Widget
  function initColeccionesWidget() {
    const target = document.getElementById('jypesa-colecciones-widget') || document.querySelector('[data-jypesa-colecciones-widget]');
    if (!target) return;

    target.innerHTML = widgetHtml;

    const container = target.querySelector('.jypesa-col-products-container');
    const prevBtn = target.querySelector('.prev-btn');
    const nextBtn = target.querySelector('.next-btn');
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');
    const dots = target.querySelectorAll('.jypesa-col-dot');

    if (!container) return;

    // Calcular desplazamiento entre tarjetas
    const getScrollStep = () => {
      const cardEl = container.querySelector('.jypesa-card-brand') || container.querySelector('.jypesa-card-product');
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
    document.addEventListener('DOMContentLoaded', initColeccionesWidget);
  } else {
    initColeccionesWidget();
  }
})();
