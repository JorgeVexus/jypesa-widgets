(function() {
  // Guard against multiple initializations
  if (window.__JypesaTimelineWidgetInitialized) return;
  window.__JypesaTimelineWidgetInitialized = true;

  // Inyectar CSS
  const cssStyles = `
/* CSS para el Widget de Línea de Tiempo Jypesa */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Rubik:wght@400;500&display=swap');

.jypesa-timeline-wrap {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 5%; /* Padding lateral del 5% para centrar de forma fluida en pantallas grandes */
  font-family: 'Rubik', sans-serif;
  color: #506D85;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  box-sizing: border-box;
}

.jypesa-timeline-wrap::-webkit-scrollbar {
  display: none;
}

/* Contenedor Flex Horizontal */
.jypesa-timeline {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: auto; /* Ancho fluido en lugar de max-content */
  padding-top: 10px;
  box-sizing: border-box;
}

/* Pista de la Línea (Del primer al último círculo) */
.jypesa-timeline .timeline-track {
  position: absolute;
  top: calc(75px + 37px); /* Centrado perfecto con el centro vertical de los círculos */
  left: 17.5px; /* Comienza exactamente en el centro del primer círculo */
  width: 75%; /* Del primer dot al último dot (3 intervalos de 4 columnas = 75%) */
  height: 2px;
  z-index: 1;
}

/* Línea de Fondo */
.jypesa-timeline .timeline-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: transparent; /* Transparente para que no se vea la línea gris vacía */
  border: none;
}

/* Línea de Progreso Activa (Transición de 0.5s) */
.jypesa-timeline .timeline-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #48A9C5;
  width: 0%;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

/* Cada Item de la Línea de Tiempo */
.jypesa-timeline .timeline-item {
  position: relative;
  flex: 1; /* Distribución fluida y equitativa entre los 4 hitos */
  padding: 0 20px;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
}

.jypesa-timeline .timeline-item:first-child {
  padding-left: 0;
}

/* AÑO */
.jypesa-timeline .timeline-year {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 75px;
  line-height: 1;
  color: #506D85;
  opacity: 0.5; /* visible al 50% por defecto */
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

/* DOT (Punto de Intersección) */
.jypesa-timeline .timeline-dot {
  position: relative;
  width: 35px;
  height: 35px;
  margin: 12px 0 12px -16.5px; /* Centrado con la línea vertical izquierda */
  opacity: 0.5; /* visible al 50% por defecto */
  transform: scale(1);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 3;
}

/* Anillos del Dot */
.jypesa-timeline .dot-ring {
  position: absolute;
  border-radius: 50%;
  transition: background 0.3s ease, transform 0.3s ease;
}

.jypesa-timeline .dot-ring--outer {
  width: 35px;
  height: 35px;
  top: 0;
  left: 0;
  background: rgba(72, 169, 197, 0.2);
}

.jypesa-timeline .dot-ring--mid {
  width: 27px;
  height: 27px;
  top: 4px;
  left: 4px;
  background: rgba(72, 169, 197, 0.4);
}

.jypesa-timeline .dot-ring--inner {
  width: 16px;
  height: 16px;
  top: 10px;
  left: 10px;
  background: #48A9C5;
}

.jypesa-timeline .timeline-item.active .dot-ring--outer {
  transform: scale(1.15);
  background: rgba(72, 169, 197, 0.35);
}

.jypesa-timeline .timeline-item.active .dot-ring--inner {
  transform: scale(1.2);
}

/* Pulso infinito en activo */
.jypesa-timeline .timeline-item.active .timeline-dot::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid #48A9C5;
  animation: jypesaPulse 2s ease-in-out infinite;
}

@keyframes jypesaPulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* DESCRIPCIÓN */
.jypesa-timeline .timeline-body {
  width: 100%;
  padding-left: 19px;
  border-left: 2px solid rgba(72, 169, 197, 0.3); /* Color claro para inactivos */
  opacity: 0.5; /* visible al 50% por defecto */
  transform: translateY(0);
  min-height: 180px; /* Forzar misma altura de contenedor en desktop */
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-left-color 0.3s ease;
  box-sizing: border-box;
}

.jypesa-timeline .timeline-body h3 {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 21px;
  line-height: 1.25;
  margin-bottom: 12px;
  color: #506D85;
}

.jypesa-timeline .timeline-body p {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  color: #506D85;
}

/* ==========================================================================
   ANIMACIÓN DE ENTRADA (js-animate-entry)
   ========================================================================== */

/* Entrada escalonada */
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(1) .timeline-year,
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(1) .timeline-dot {
  opacity: 0.5;
  transform: translateY(0) scale(1);
  transition-delay: 0.08s;
}
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(1) .timeline-body {
  opacity: 0.5;
  transform: translateY(0);
  transition-delay: 0.15s;
}

.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(2) .timeline-year,
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(2) .timeline-dot {
  opacity: 0.5;
  transform: translateY(0) scale(1);
  transition-delay: 0.22s;
}
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(2) .timeline-body {
  opacity: 0.5;
  transform: translateY(0);
  transition-delay: 0.29s;
}

.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(3) .timeline-year,
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(3) .timeline-dot {
  opacity: 0.5;
  transform: translateY(0) scale(1);
  transition-delay: 0.36s;
}
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(3) .timeline-body {
  opacity: 0.5;
  transform: translateY(0);
  transition-delay: 0.43s;
}

.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(4) .timeline-year,
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(4) .timeline-dot {
  opacity: 0.5;
  transform: translateY(0) scale(1);
  transition-delay: 0.5s;
}
.jypesa-timeline-wrap.js-animate-entry .timeline-item:nth-child(4) .timeline-body {
  opacity: 0.5;
  transform: translateY(0);
  transition-delay: 0.57s;
}

/* ==========================================================================
   ESTADOS DE ACTIVIDAD Y VISITA */
.jypesa-timeline .timeline-item.active .timeline-year,
.jypesa-timeline .timeline-item.visited .timeline-year {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition-delay: 0s !important;
}

.jypesa-timeline .timeline-item.active .timeline-dot,
.jypesa-timeline .timeline-item.visited .timeline-dot {
  opacity: 1 !important;
  transform: scale(1) !important;
  transition-delay: 0s !important;
}

.jypesa-timeline .timeline-item.active .timeline-body,
.jypesa-timeline .timeline-item.visited .timeline-body {
  opacity: 1 !important;
  transform: translateY(0) !important;
  border-left-color: #48A9C5;
  transition-delay: 0s !important;
}

.jypesa-timeline .timeline-item.active .timeline-body {
  border-left-width: 3px;
  padding-left: 18px;
}

.jypesa-timeline .timeline-item.visited:not(.active) .timeline-body {
  border-left-width: 2px;
  padding-left: 19px;
}

/* ==========================================================================
   DISEÑO RESPONSIVO (Móvil Vertical) */
@media (max-width: 768px) {
  .jypesa-timeline-wrap {
    overflow-x: hidden;
    padding: 20px 16px;
  }
  
  .jypesa-timeline {
    flex-direction: column;
    min-width: unset;
    padding-left: 28px;
  }
  
  .jypesa-timeline .timeline-track {
    position: absolute;
    top: 24px; /* Centro vertical del primer dot */
    bottom: 24px; /* Centro vertical del último dot */
    left: 14px;
    width: 2px;
    height: auto;
    right: auto;
  }
  
  .jypesa-timeline .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent; /* Transparente en móvil también */
    border: none;
  }
  
  .jypesa-timeline .timeline-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 0%;
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .jypesa-timeline .timeline-item {
    flex: none;
    width: 100%;
    padding: 0 0 36px 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  
  .jypesa-timeline .timeline-year {
    font-size: 48px;
    width: 100%;
    margin-bottom: 4px;
    transform: translateX(-16px);
  }
  
  .jypesa-timeline .timeline-dot {
    position: absolute;
    left: -28px;
    top: 10px;
    margin: 0;
    width: 28px;
    height: 28px;
  }
  
  .jypesa-timeline .dot-ring--outer { width: 28px; height: 28px; }
  .jypesa-timeline .dot-ring--mid { width: 22px; height: 22px; top: 3px; left: 3px; }
  .jypesa-timeline .dot-ring--inner { width: 12px; height: 12px; top: 8px; left: 8px; }
  
  .jypesa-timeline .timeline-body {
    width: 100%;
    padding-left: 16px;
    border-left: 2px solid #48A9C5;
    transform: translateX(-16px);
    min-height: auto; /* Reiniciar en móvil */
  }
  
  .jypesa-timeline .timeline-item.active .timeline-body,
  .jypesa-timeline .timeline-item.visited .timeline-body {
    border-left-width: 3px;
    padding-left: 15px;
    transform: translateX(0) !important;
  }

  .jypesa-timeline-wrap.js-animate-entry .timeline-item .timeline-year,
  .jypesa-timeline-wrap.js-animate-entry .timeline-item .timeline-body {
    transform: translateX(0);
  }
}

@media (max-width: 400px) {
  .jypesa-timeline .timeline-year { font-size: 38px; }
  .jypesa-timeline .timeline-body h3 { font-size: 17px; }
  .jypesa-timeline .timeline-body p { font-size: 12px; }
}
`;

  // Inyectar el style en el head
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(cssStyles));
  document.head.appendChild(styleEl);

  // HTML del widget
  const widgetHtml = `
<div class="jypesa-timeline-wrap" role="region" aria-label="Línea de tiempo JYPESA">
  <div class="jypesa-timeline" role="list">
    <div class="timeline-track">
      <div class="timeline-line"></div>
      <div class="timeline-progress" aria-hidden="true"></div>
    </div>

    <!-- 1975 -->
    <div class="timeline-item" role="listitem" tabindex="0" data-index="0">
      <div class="timeline-year">1975</div>
      <div class="timeline-dot" aria-hidden="true">
        <div class="dot-ring dot-ring--outer"></div>
        <div class="dot-ring dot-ring--mid"></div>
        <div class="dot-ring dot-ring--inner"></div>
      </div>
      <div class="timeline-body">
        <h3>Nacimiento de las amenidades en México</h3>
        <p>JYPESA comienza a fabricar productos de higiene para la industria farmacéutica y lanza la primera línea de amenidades para hospitalidad del país.</p>
      </div>
    </div>

    <!-- 1978 -->
    <div class="timeline-item" role="listitem" tabindex="0" data-index="1">
      <div class="timeline-year">1978</div>
      <div class="timeline-dot" aria-hidden="true">
        <div class="dot-ring dot-ring--outer"></div>
        <div class="dot-ring dot-ring--mid"></div>
        <div class="dot-ring dot-ring--inner"></div>
      </div>
      <div class="timeline-body">
        <h3>JYPESA Amenities: jabón y shampoo</h3>
        <p>Nace formalmente la división Amenities con 2 productos. Con el tiempo, el catálogo crece junto con la presencia nacional e internacional.</p>
      </div>
    </div>

    <!-- 2000's -->
    <div class="timeline-item" role="listitem" tabindex="0" data-index="2">
      <div class="timeline-year">2000's</div>
      <div class="timeline-dot" aria-hidden="true">
        <div class="dot-ring dot-ring--outer"></div>
        <div class="dot-ring dot-ring--mid"></div>
        <div class="dot-ring dot-ring--inner"></div>
      </div>
      <div class="timeline-body">
        <h3>Expansión internacional y 5 líneas de producto</h3>
        <p>Apertura de oficinas en EE.UU. (×2), Guatemala, Perú y Cuba. El portafolio evoluciona a 5 líneas que atienden todos los segmentos del sector.</p>
      </div>
    </div>

    <!-- Hoy -->
    <div class="timeline-item" role="listitem" tabindex="0" data-index="3">
      <div class="timeline-year">Hoy</div>
      <div class="timeline-dot" aria-hidden="true">
        <div class="dot-ring dot-ring--outer"></div>
        <div class="dot-ring dot-ring--mid"></div>
        <div class="dot-ring dot-ring--inner"></div>
      </div>
      <div class="timeline-body">
        <h3>21 países · 7,000 m² · Laboratorio propio</h3>
        <p>Presente en 21 países de las Américas, Europa y Asia, con instalaciones de 7,000 m² y un laboratorio de fragancias que colabora con casas fragancistas de renombre mundial.</p>
      </div>
    </div>
  </div>
</div>
`;

  function initTimeline() {
    const target = document.getElementById('jypesa-timeline-widget') || document.querySelector('[data-jypesa-timeline-widget]');
    if (!target) {
      console.warn("Jypesa Timeline Widget target element not found.");
      return;
    }

    target.innerHTML = widgetHtml;

    const wrap = target.querySelector('.jypesa-timeline-wrap');
    const items = target.querySelectorAll('.timeline-item');
    const progress = target.querySelector('.timeline-progress');
    const timeline = target.querySelector('.jypesa-timeline');

    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 2800; // Avanza cada 2.8 segundos de forma automática

    const isMobile = () => window.innerWidth <= 768;

    function activateItem(el) {
      const activeIdx = parseInt(el.dataset.index, 10);
      items.forEach(i => {
        const idx = parseInt(i.dataset.index, 10);
        if (idx === activeIdx) {
          i.classList.add('active');
        } else {
          i.classList.remove('active');
        }

        // Iluminar al 100% de opacidad todos los hitos recorridos (index <= activeIndex)
        if (idx <= activeIdx) {
          i.classList.add('visited');
        } else {
          i.classList.remove('visited');
        }
      });
      updateProgress(el);
    }

    function updateProgress(el) {
      const idx = parseInt(el.dataset.index, 10);
      const total = items.length - 1;
      if (isMobile()) {
        const rect = timeline.getBoundingClientRect();
        const itemRect = el.getBoundingClientRect();
        const pct = (itemRect.top - rect.top + itemRect.height / 2) / rect.height;
        progress.style.width = '2px';
        progress.style.height = Math.min(pct * 100, 100) + '%';
      } else {
        const pct = (idx / total) * 100;
        progress.style.height = '2px';
        progress.style.width = pct + '%';
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(() => {
        const active = target.querySelector('.timeline-item.active');
        let nextIdx = 0;
        if (active) {
          const currentIdx = parseInt(active.dataset.index, 10);
          nextIdx = (currentIdx + 1) % items.length;
        }
        activateItem(items[nextIdx]);
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Event Listeners y pausa de Autoplay al interactuar (click o teclado)
    items.forEach(item => {
      item.addEventListener('click', () => {
        stopAutoplay();
        activateItem(item);
      });
      item.addEventListener('keydown', e => {
        stopAutoplay();
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateItem(item);
        }
        const idx = parseInt(item.dataset.index, 10);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = items[idx + 1];
          if (next) { next.focus(); activateItem(next); }
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = items[idx - 1];
          if (prev) { prev.focus(); activateItem(prev); }
        }
      });
    });

    // Iniciar animación progresiva cuando el elemento sea visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            wrap.classList.add('js-animate-entry');

            // Cargar primer dot y activar autoplay tras terminar la entrada del primer item
            setTimeout(() => {
              activateItem(items[0]);
              startAutoplay();
            }, 300);

            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(wrap);
    } else {
      wrap.classList.add('js-animate-entry');
      setTimeout(() => {
        activateItem(items[0]);
        startAutoplay();
      }, 300);
    }

    // Recalcular progreso en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const active = target.querySelector('.timeline-item.active');
        if (active) updateProgress(active);
      }, 200);
    });
  }

  // Cargar widget
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
