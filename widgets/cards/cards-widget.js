(function () {
  // Guard against multiple initializations
  if (window.__JypesaCardsWidgetInitialized) return;
  window.__JypesaCardsWidgetInitialized = true;

  // Inyectar CSS
  const cssStyles = `
/* CSS para el Widget de Tarjetas de Capacidades Jypesa */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Rubik:wght@400;500&display=swap');

.jypesa-cards-wrap {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 24px;
  font-family: 'Rubik', sans-serif;
  color: #506D85;
  box-sizing: border-box;
}

/* Grid de Tarjetas */
.jypesa-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  margin: 0 auto;
}

/* Tarjeta Individual */
.jypesa-card {
  background: #ffffff;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 4px 5px 14.4px 0px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
  height: 786px;
  text-decoration: none;
  color: inherit;
  outline: none;
  box-sizing: border-box;
}

/* Área de Imagen de la Tarjeta */
.jypesa-card-img {
  position: relative;
  width: 100%;
  height: 559px;
  overflow: hidden;
  background-color: #f7fafc;
}

.jypesa-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Área de Contenido de la Tarjeta */
.jypesa-card-content {
  padding: 32px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  box-sizing: border-box;
}

/* Título */
.jypesa-card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 34px;
  line-height: 1.1;
  color: #506D85;
  margin: 0 0 14px 0;
  transition: color 0.3s ease;
}

/* Descripción */
.jypesa-card-desc {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.45;
  color: #506D85;
  max-width: 286px;
  margin: 0 0 28px 0;
  flex-grow: 1;
}

/* Botón CTA (Estilo Hero de Jypesa) */
.jypesa-card-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #506D85;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.7px;
  text-transform: none;
  border-radius: 6px;
  width: 213px;
  height: 40px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: auto;
  box-sizing: border-box;
}

/* Icono de Flecha */
.jypesa-card-btn svg {
  width: 16px;
  height: 16px;
  display: block;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ==========================================================================
   EFECTOS HOVER Y MICRO-ANIMACIONES */

.jypesa-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(80, 109, 133, 0.14);
}

.jypesa-card:hover .jypesa-card-img img {
  transform: scale(1.04);
}

.jypesa-card:hover .jypesa-card-title {
  color: #48A9C5;
}

.jypesa-card:hover .jypesa-card-btn {
  background-color: #48A9C5;
}

/* Animación de la Flecha: se desplaza a la derecha 6px al hacer hover en la tarjeta */
.jypesa-card:hover .jypesa-card-btn svg {
  transform: translateX(6px);
}

.jypesa-card:focus-visible {
  outline: 3px solid #48A9C5;
  transform: translateY(-8px);
}

/* ==========================================================================
   DISEÑO RESPONSIVO */

@media (max-width: 1200px) {
  .jypesa-cards-grid {
    gap: 20px;
  }
  .jypesa-card {
    height: 720px;
  }
  .jypesa-card-img {
    height: 480px;
  }
  .jypesa-card-title {
    font-size: 28px;
  }
  .jypesa-card-desc {
    font-size: 15px;
    margin-bottom: 20px;
  }
}

@media (max-width: 991px) {
  .jypesa-cards-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    max-width: 480px;
  }
  .jypesa-card {
    height: 786px;
  }
  .jypesa-card-img {
    height: 559px;
  }
  .jypesa-card-title {
    font-size: 34px;
  }
  .jypesa-card-desc {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .jypesa-cards-wrap {
    padding: 30px 16px;
  }
  .jypesa-card {
    height: 640px;
  }
  .jypesa-card-img {
    height: 420px;
  }
  .jypesa-card-title {
    font-size: 26px;
  }
  .jypesa-card-desc {
    font-size: 14px;
    margin-bottom: 15px;
  }
}
`;

  // Inyectar el style en el head
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(cssStyles));
  document.head.appendChild(styleEl);

  // URLs de las imágenes
  const imgProduccion = "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69fa4efff4a6fd72dc61b7b9_produccion%20card.webp";
  const imgPrivateLabel = "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69fa4c519a629b382ee5f884_Product-Image.png";
  const imgLicencias = "https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69fa4c51ab013c1db7e3825f_Product-Image.png";

  const arrowSvg = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // HTML Estructura del Widget
  const widgetHtml = `
<div class="jypesa-cards-wrap" role="region" aria-label="Líneas de Negocio JYPESA">
  <div class="jypesa-cards-grid">
    
    <!-- Producción -->
    <a href="/desarollo-personalizado" class="jypesa-card" tabindex="0">
      <div class="jypesa-card-img">
        <img src="${imgProduccion}" alt="Producción Jypesa" loading="lazy" />
      </div>
      <div class="jypesa-card-content">
        <h3 class="jypesa-card-title">Producción</h3>
        <p class="jypesa-card-desc">Desarrollo y fabricación de amenidades con control de calidad en cada etapa.</p>
        <button class="jypesa-card-btn" tabindex="-1">
          Saber más
          ${arrowSvg}
        </button>
      </div>
    </a>

    <!-- Private Label -->
    <a href="/desarollo-personalizado" class="jypesa-card" tabindex="0">
      <div class="jypesa-card-img">
        <img src="${imgPrivateLabel}" alt="Private Label Jypesa" loading="lazy" />
      </div>
      <div class="jypesa-card-content">
        <h3 class="jypesa-card-title">Private label</h3>
        <p class="jypesa-card-desc">Creación de productos personalizados alineados a la identidad de cada cliente.</p>
        <button class="jypesa-card-btn" tabindex="-1">
          Saber más
          ${arrowSvg}
        </button>
      </div>
    </a>

    <!-- Licencias -->
    <a href="/desarollo-personalizado" class="jypesa-card" tabindex="0">
      <div class="jypesa-card-img">
        <img src="${imgLicencias}" alt="Licencias Jypesa" loading="lazy" />
      </div>
      <div class="jypesa-card-content">
        <h3 class="jypesa-card-title">Licencias</h3>
        <p class="jypesa-card-desc">Colaboración con marcas reconocidas para ofrecer colecciones diferenciadas.</p>
        <button class="jypesa-card-btn" tabindex="-1">
          Ver colecciones
          ${arrowSvg}
        </button>
      </div>
    </a>

  </div>
</div>
`;

  function initCards() {
    const target = document.getElementById('jypesa-cards-widget') || document.querySelector('[data-jypesa-cards-widget]');
    if (!target) {
      console.warn("Jypesa Cards Widget target element not found. Make sure an element with ID 'jypesa-cards-widget' exists on the page.");
      return;
    }
    target.innerHTML = widgetHtml;
  }

  // Cargar widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    initCards();
  }
})();
