(function () {
  if (window.__JypesaSliderCertificacionesWidgetInitialized) return;
  window.__JypesaSliderCertificacionesWidgetInitialized = true;

  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap');

:root {
  --jypesa-cert-slate: #506D85;
  --jypesa-cert-blue: #48A9C5;
  --jypesa-cert-divider: rgba(80, 109, 133, 0.15);
}

.jypesa-slider-certificaciones-widget {
  position: relative;
  width: 100%;
  background: transparent;
  font-family: 'Rubik', sans-serif;
  color: var(--jypesa-cert-slate);
  padding: 60px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.jypesa-cert-section-header {
  max-width: 940px;
  margin: 0 auto 48px;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.jypesa-cert-section-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 37px;
  line-height: 1.1;
  color: var(--jypesa-cert-slate);
  margin: 0;
}

.jypesa-cert-slider-outer {
  position: relative;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.jypesa-cert-products-container {
  display: flex;
  gap: 35px;
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

.jypesa-cert-products-container::-webkit-scrollbar {
  display: none;
}

.jypesa-cert-nav-btn {
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
  color: var(--jypesa-cert-slate);
  transition: all 0.25s ease;
  user-select: none;
  opacity: 0;
  visibility: hidden;
}

.jypesa-cert-slider-outer:hover .jypesa-cert-nav-btn {
  opacity: 1;
  visibility: visible;
}

.jypesa-cert-nav-btn:hover {
  background: #ffffff;
  color: var(--jypesa-cert-blue);
  box-shadow: 0 6px 16px rgba(80, 109, 133, 0.18);
  border-color: rgba(80, 109, 133, 0.3);
}

.jypesa-cert-nav-btn.prev-btn { left: 10px; }
.jypesa-cert-nav-btn.next-btn { right: 10px; }

.jypesa-cert-nav-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.jypesa-cert-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  width: 100%;
}

.jypesa-cert-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(80, 109, 133, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.jypesa-cert-dot.active {
  background: var(--jypesa-cert-blue);
  width: 24px;
  border-radius: 100px;
}

.jypesa-cert-controls-mobile {
  display: none;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
}

.jypesa-cert-mobile-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(80, 109, 133, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jypesa-cert-slate);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(80, 109, 133, 0.08);
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.jypesa-cert-mobile-nav:active {
  background: transparent;
  color: var(--jypesa-cert-blue);
  transform: scale(0.95);
}

.jypesa-cert-mobile-nav.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.jypesa-cert-mobile-nav svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* =====================
   CERTIFICATION CARD
   ===================== */
.jypesa-cert-card {
  flex: 0 0 calc((100% - 70px) / 3);
  min-width: 300px;
  max-width: 568px;
  height: 720px;
  background: #ffffff;
  border-radius: 0px;
  box-shadow: 4px 5px 14.4px 0px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  scroll-snap-align: start;
  overflow: clip;
}

.jypesa-cert-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(80, 109, 133, 0.18);
}

.jypesa-cert-card-img-wrap {
  width: 100%;
  height: 380px;
  background: rgba(72, 169, 197, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.jypesa-cert-card-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  display: block;
}

.jypesa-cert-card-header {
  padding: 24px 32px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: left;
  box-sizing: border-box;
}

.jypesa-cert-card-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 50px;
  line-height: 1.1;
  color: var(--jypesa-cert-slate);
  margin: 0;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.jypesa-cert-card-title.small-title {
  font-size: 40px;
}

.jypesa-cert-card-divider {
  width: 1px;
  height: 40px;
  background: var(--jypesa-cert-divider);
  flex-shrink: 0;
}

.jypesa-cert-card-phrase {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.35;
  color: var(--jypesa-cert-slate);
  margin: 0;
}

.jypesa-cert-card-body {
  padding: 0 32px 32px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
}

.jypesa-cert-card-body p {
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: var(--jypesa-cert-slate);
  margin: 0 0 12px;
}

.jypesa-cert-card-body p:last-child {
  margin-bottom: 0;
}

@media (max-width: 1100px) {
  .jypesa-slider-certificaciones-widget {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .jypesa-cert-slider-outer {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
  }

  .jypesa-cert-products-container-desktop,
  .jypesa-cert-products-container {
    gap: 20px;
    scroll-padding: 0;
  }

  .jypesa-cert-card {
    flex: 0 0 calc((100% - 40px) / 3);
    min-width: 250px;
    max-width: 568px;
    height: auto;
    min-height: 600px;
  }

  .jypesa-cert-card-img-wrap {
    height: 240px;
  }

  .jypesa-cert-card-header {
    padding: 16px 16px 12px;
    gap: 12px;
  }

  .jypesa-cert-card-title {
    font-size: 28px;
  }

  .jypesa-cert-card-title.small-title {
    font-size: 20px;
  }

  .jypesa-cert-card-phrase {
    font-size: 14px;
  }

  .jypesa-cert-card-body {
    padding: 0 16px 20px;
  }

  .jypesa-cert-card-body p {
    font-size: 12.5px;
    line-height: 1.45;
  }
}

@media (max-width: 768px) {
  .jypesa-slider-certificaciones-widget {
    padding: 40px 0;
  }

  .jypesa-cert-section-header {
    margin-bottom: 30px;
  }

  .jypesa-cert-section-title {
    font-size: 28px;
  }

  .jypesa-cert-slider-outer {
    padding: 0 5%;
  }

  .jypesa-cert-products-container,
  .jypesa-cert-products-container-desktop {
    scroll-padding: 0 5%;
    gap: 16px;
    padding: 15px 5px 30px !important;
    margin: -15px -5px -30px;
  }

  .jypesa-cert-card {
    flex: 0 0 85vw;
    width: 85vw;
    max-width: 90%;
    height: auto;
    scroll-snap-align: center;
    min-height: 580px;
  }

  .jypesa-cert-card-img-wrap {
    height: 200px;
  }

  .jypesa-cert-card-title {
    font-size: 32px;
  }

  .jypesa-cert-card-title.small-title {
    font-size: 20px;
  }

  .jypesa-cert-card-phrase {
    font-size: 14px;
  }

  .jypesa-cert-nav-btn {
    display: none !important;
  }

  .jypesa-cert-controls-mobile {
    display: flex;
  }

  .jypesa-cert-mobile-nav {
    display: flex;
  }
}

@media (min-width: 769px) {
  .jypesa-cert-mobile-nav {
    display: none !important;
  }

  /* Desktop: mostrar 3 cards a la vez, slider desplaza 1 a la vez */
  .jypesa-cert-slider-outer {
    padding: 0 20px;
  }

  .jypesa-cert-products-container {
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    justify-content: flex-start;
    gap: 35px;
    padding: 15px 5px 30px;
    margin: -15px -5px -30px;
  }

  .jypesa-cert-card {
    scroll-snap-align: start;
  }
}

/* Contenedor con snap para centrar el paso de 3 cards en desktop */
.jypesa-cert-products-container-desktop {
  display: flex;
  gap: 35px;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 40px;
  padding: 15px 15px 30px !important;
  margin: -15px -15px -30px;
  box-sizing: border-box;
  scrollbar-width: none;
}

.jypesa-cert-products-container-desktop::-webkit-scrollbar {
  display: none;
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  const arrowRightIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  const defaultCertifications = [
    {
      id: 'iso-22716',
      title: 'ISO 22716',
      smallTitle: false,
      phrase: 'Confianza en cada detalle de la experiencia del huésped',
      src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e8fd701a7a1134c22_iso%202276.avif',
      alt: 'ISO 22716',
      paragraphs: [
        'Cumplimiento con estándares internacionales de Buenas Prácticas de Fabricación (BPF) para productos cosméticos.',
        'Garantiza calidad, seguridad y control en cada etapa de producción, ofreciendo tranquilidad tanto al hotel como al huésped.'
      ]
    },
    {
      id: 'peta',
      title: 'PETA',
      smallTitle: false,
      phrase: 'Bienestar animal como estándar global',
      src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e4489cf12b17d47f4_peta.avif',
      alt: 'PETA',
      paragraphs: [
        'Certificación que avala que nuestros productos y materias primas no son testeados en animales.',
        'Compromiso ético con el bienestar animal y estándares globales de cruelty-free en toda la línea de amenidades.'
      ]
    },
    {
      id: 'rspo',
      title: 'RSPO',
      smallTitle: false,
      phrase: 'Ingredientes responsables para una hospitalidad consciente',
      src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e427b2473472805fe_rspo.avif',
      alt: 'RSPO',
      paragraphs: [
        'Miembros de la Mesa Redonda sobre Aceite de Palma Sostenible (RSPO), promoviendo prácticas responsables en toda la cadena de suministro.',
        'Selección de ingredientes que equilibran rendimiento, huella ambiental y responsabilidad social para hoteles conscientes.'
      ]
    },
    {
      id: 'ocean-bound-plastic',
      title: 'Ocean Bound Plastic',
      smallTitle: true,
      phrase: 'Reducción de impacto en cada amenidad',
      src: 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a4ffe5e8c3dd6f2cd6f39f0_ocean%20bound.avif',
      alt: 'Ocean Bound Plastic',
      paragraphs: [
        'Utilizamos plástico recuperado antes de llegar al océano para la fabricación de nuestros envases tipo tubo.',
        'Innovación sostenible que convierte residuos oceánicos en amenidades de alta calidad, reduciendo el impacto ambiental.'
      ]
    }
  ];

  // Lee las certificaciones desde una Collection List de Webflow (oculta) si el equipo
  // ya migró el contenido al CMS; si no existe, se usa defaultCertifications como fallback.
  // Se busca en todo el documento (no solo dentro de target) porque el Collection List vive
  // como elemento hermano del embed en el Designer, no puede anidarse dentro de su HTML crudo.
  function readCertificationsFromCMS(target) {
    const source = document.querySelector('.jypesa-cert-cms-source');
    if (!source) return null;

    const items = Array.from(source.querySelectorAll('.w-dyn-item'));
    if (!items.length) return null;

    const parsed = items.map((item, idx) => {
      const titleEl = item.querySelector('.jypesa-cert-cms-title');
      const imgEl = item.querySelector('.jypesa-cert-cms-img');
      if (!titleEl || !imgEl) return null;

      const phraseEl = item.querySelector('.jypesa-cert-cms-phrase');
      const descEl = item.querySelector('.jypesa-cert-cms-desc');
      const title = titleEl.textContent.trim();
      const paragraphs = descEl
        ? Array.from(descEl.querySelectorAll('p')).map(p => p.textContent.trim()).filter(Boolean)
        : [];

      return {
        id: title.toLowerCase().normalize('NFD').replace(new RegExp('[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']', 'g'), '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cert-${idx}`,
        title,
        // Webflow no permite bindear un campo Switch al valor de un atributo custom,
        // asi que el tamano de titulo se infiere del largo del texto en vez de un campo CMS aparte.
        smallTitle: title.length > 14,
        phrase: phraseEl ? phraseEl.textContent.trim() : '',
        src: imgEl.getAttribute('src') || '',
        alt: imgEl.getAttribute('alt') || title,
        paragraphs
      };
    }).filter(Boolean);

    return parsed.length ? parsed : null;
  }

  function buildWidgetHtml(certifications) {
    return `
<div class="jypesa-slider-certificaciones-widget">
  

  <div class="jypesa-cert-slider-outer">
    <div class="jypesa-cert-nav-btn prev-btn">
      <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </div>
    <div class="jypesa-cert-nav-btn next-btn">
      <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </div>

    <div class="jypesa-cert-products-container-desktop">
      ${certifications.map(cert => `
      <div class="jypesa-cert-card" id="${cert.id}">
        <div class="jypesa-cert-card-img-wrap">
          <img class="jypesa-cert-card-img" src="${cert.src}" alt="${cert.alt}">
        </div>
        <div class="jypesa-cert-card-header">
          <h3 class="jypesa-cert-card-title ${cert.smallTitle ? 'small-title' : ''}">${cert.smallTitle ? cert.title.replace(' ', '<br>', 1) : cert.title}</h3>
          <div class="jypesa-cert-card-divider"></div>
          <p class="jypesa-cert-card-phrase">${cert.phrase}</p>
        </div>
        <div class="jypesa-cert-card-body">
          ${cert.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
      `).join('')}
    </div>

    <div class="jypesa-cert-controls-mobile">
      <button class="jypesa-cert-mobile-nav prev-mobile-btn" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div class="jypesa-cert-dots-container">
        ${certifications.map((_, idx) => `<span class="jypesa-cert-dot${idx === 0 ? ' active' : ''}" data-index="${idx}"></span>`).join('')}
      </div>
      <button class="jypesa-cert-mobile-nav next-mobile-btn" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  </div>
</div>
`;
  }

  function initSliderCertificacionesWidget() {
    const target = document.getElementById('jypesa-slider-certificaciones-widget') || document.querySelector('[data-jypesa-slider-certificaciones-widget]');
    if (!target) return;

    const certifications = readCertificationsFromCMS(target) || defaultCertifications;

    target.innerHTML = buildWidgetHtml(certifications);

    const container = target.querySelector('.jypesa-cert-products-container-desktop');
    const prevBtn = target.querySelector('.prev-btn');
    const nextBtn = target.querySelector('.next-btn');
    const prevMobileBtn = target.querySelector('.prev-mobile-btn');
    const nextMobileBtn = target.querySelector('.next-mobile-btn');
    const dots = target.querySelectorAll('.jypesa-cert-dot');

    if (!container) return;

    const isMobile = () => window.innerWidth <= 768;

    const getCardWidth = () => {
      const cardEl = container.querySelector('.jypesa-cert-card');
      if (!cardEl) return 568;
      const rect = cardEl.getBoundingClientRect();
      return rect.width || 568;
    };

    const getScrollStep = () => {
      const cardWidth = getCardWidth();
      const gap = isMobile() ? 16 : 35;
      return cardWidth + gap;
    };

    // Desktop: scroll de 3 tarjetas, mobile: 1 tarjeta a la vez
    const getDesktopScrollStep = () => {
      const cardWidth = getCardWidth();
      const gap = 35;
      return (cardWidth + gap) * 3;
    };

    const getMobileScrollStep = () => {
      const cardWidth = getCardWidth();
      const gap = 16;
      return cardWidth + gap;
    };

    const getCurrentScrollStep = () => {
      return isMobile() ? getMobileScrollStep() : getDesktopScrollStep();
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getCurrentScrollStep(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getCurrentScrollStep(), behavior: 'smooth' });
      });
    }

    if (prevMobileBtn && nextMobileBtn) {
      prevMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getMobileScrollStep(), behavior: 'smooth' });
      });
      nextMobileBtn.addEventListener('click', () => {
        container.scrollBy({ left: getMobileScrollStep(), behavior: 'smooth' });
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const step = isMobile() ? getMobileScrollStep() : getDesktopScrollStep();
        container.scrollTo({ left: idx * step, behavior: 'smooth' });
      });
    });

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const step = getCurrentScrollStep();
      const maxScroll = container.scrollWidth - container.clientWidth;

      const totalSteps = Math.max(1, Math.ceil((container.scrollWidth) / step));
      const activeIndex = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(scrollLeft / step))
      );

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
    document.addEventListener('DOMContentLoaded', initSliderCertificacionesWidget);
  } else {
    initSliderCertificacionesWidget();
  }
})();
