(function () {
  // Evitar doble inicialización
  if (window.__JypesaSistemasDispensacionWidgetInitialized) return;
  window.__JypesaSistemasDispensacionWidgetInitialized = true;

  // ─── 1. INYECCIÓN DE FUENTES Y CSS ─────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:wght@400;500;600&family=Rubik:wght@300;400;500;600&display=swap';
  document.head.appendChild(fontLink);

  const css = `
  /* ── VARIABLES Y ESTILOS GENERALES ── */
  :root {
    --jypesa-disp-slate: #506D85;
    --jypesa-disp-border: rgba(80, 109, 133, 0.3);
  }

  .jypesa-disp-split-widget {
    width: 100%;
    background-color: #ffffff;
    font-family: 'Rubik', sans-serif;
    color: var(--jypesa-disp-slate);
    box-sizing: border-box;
    overflow: hidden;
  }

  .jypesa-disp-split-widget * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── COLUMNA CENTRAL: TEXTOS Y BOTONES ── */
  .jypesa-disp-destacable {
    position: relative;
    padding-bottom: 12px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }

  .jypesa-disp-destacable::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 2px;
    background-color: var(--jypesa-disp-slate);
  }

  .jypesa-disp-destacable p {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 21px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 1.05px;
    color: var(--jypesa-disp-slate);
    text-transform: none;
  }

  .jypesa-disp-main-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: clamp(34px, 3.8vw, 70px); /* Tamaño fluido según el ancho de pantalla */
    line-height: 1.15;
    color: var(--jypesa-disp-slate);
    text-align: center;
    max-width: 1148px;
    margin-bottom: 25px;
  }

  .jypesa-disp-title-line {
    display: block;
    white-space: nowrap; /* Evita que el texto de la línea se divida */
  }

  /* Cursiva con degradado para el título */
  .jypesa-disp-split-italic-highlight {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg, #48A9C5 0%, #0088BD 50%, #9EF4F5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  .jypesa-disp-intro-desc {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.45;
    color: var(--jypesa-disp-slate);
    text-align: center;
    max-width: 732px;
    margin-bottom: 35px;
  }

  .jypesa-disp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: var(--jypesa-disp-slate);
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.9px;
    padding: 15px 30px;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  }

  .jypesa-disp-btn:hover {
    background-color: #3b5264;
    transform: translateY(-2px);
  }

  .jypesa-disp-btn svg {
    transition: transform 0.3s ease;
  }

  .jypesa-disp-btn:hover svg {
    transform: translateX(4px);
  }

  /* ── LAYOUT DESKTOP SCROLL INTERACTIVE (>= 992px) ── */
  .jypesa-disp-split-desktop-wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 200vh; /* Altura del contenedor de scroll */
  }

  .jypesa-disp-split-desktop-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0; /* Padding lateral removido según solicitud */
    overflow: hidden;
    max-width: 1850px;
    margin: 0 auto;
  }

  /* Columnas laterales de imágenes */
  .jypesa-disp-split-col-left,
  .jypesa-disp-split-col-right {
    width: 465px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
    padding: 80px 0;
  }

  .jypesa-disp-split-inner-track {
    display: flex;
    flex-direction: column;
    gap: 80px;
    will-change: transform;
  }

  .jypesa-disp-split-img-box {
    width: 100%;
    height: calc(100vh - 160px); /* 100vh - padding superior/inferior */
    border-radius: 0;
    overflow: hidden;
    position: relative;
  }

  .jypesa-disp-split-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Columna central de textos */
  .jypesa-disp-split-col-center {
    width: calc(100% - 930px); /* Ancho restante del contenedor (sin padding lateral) */
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    padding: 80px 20px;
  }

  .jypesa-disp-split-center-textbox {
    position: absolute;
    top: 80px;
    left: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    will-change: transform;
  }

  /* ── LAYOUT MÓVIL (< 992px) ── */
  .jypesa-disp-split-mobile-wrapper {
    display: none;
    width: 100%;
    padding: 60px 24px;
    background-color: #ffffff;
  }

  .jypesa-disp-split-mobile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 40px;
    width: 100%;
  }

  .jypesa-disp-split-mobile-header .jypesa-disp-main-title {
    font-size: 42px;
    line-height: 1.2;
  }

  .jypesa-disp-split-mobile-header .jypesa-disp-intro-desc {
    font-size: 16px;
    line-height: 1.5;
  }

  /* Carrusel móvil responsivo y estético */
  .jypesa-disp-split-mobile-carousel {
    width: 100%;
    margin-top: 30px;
    position: relative;
  }

  .jypesa-disp-split-mobile-track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding: 10px 0;
  }

  .jypesa-disp-split-mobile-track::-webkit-scrollbar {
    display: none;
  }

  .jypesa-disp-split-mobile-slide {
    flex: 0 0 82%;
    scroll-snap-align: center;
    border-radius: 0;
    overflow: hidden;
    aspect-ratio: 1 / 1.15;
    box-shadow: 0 4px 15px rgba(80, 109, 133, 0.08);
  }

  .jypesa-disp-split-mobile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .jypesa-disp-split-mobile-dots {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
  }

  .jypesa-disp-split-mobile-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(80, 109, 133, 0.25);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .jypesa-disp-split-mobile-dot.active {
    background-color: var(--jypesa-disp-slate);
    transform: scale(1.2);
  }

  /* ── RESPONSIVIDAD GENERAL ── */
  /* ── RESPONSIVIDAD GENERAL DE ESCRITORIO (Laptops & Pantallas Medianas/Pequeñas) ── */
  @media (min-width: 992px) and (max-width: 1440px) {
    .jypesa-disp-split-desktop-sticky {
      padding: 0;
    }
    .jypesa-disp-split-col-left,
    .jypesa-disp-split-col-right {
      width: 360px; /* Ancho reducido de imágenes para más espacio central */
    }
    .jypesa-disp-split-col-center {
      width: calc(100% - 720px); /* Ancho dinámico restante */
    }
    .jypesa-disp-main-title {
      font-size: 50px;
    }
    .jypesa-disp-intro-desc {
      font-size: 16px;
    }
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    .jypesa-disp-split-desktop-sticky {
      padding: 0;
    }
    .jypesa-disp-split-col-left,
    .jypesa-disp-split-col-right {
      width: 280px; /* Ancho de imágenes aún más compacto */
    }
    .jypesa-disp-split-col-center {
      width: calc(100% - 560px); /* Más espacio libre para los textos */
    }
    .jypesa-disp-main-title {
      font-size: 40px;
      margin-bottom: 15px;
    }
    .jypesa-disp-intro-desc {
      font-size: 14px;
      margin-bottom: 25px;
    }
    .jypesa-disp-destacable {
      margin-bottom: 15px;
    }
    .jypesa-disp-destacable p {
      font-size: 18px;
    }
    .jypesa-disp-btn {
      font-size: 16px;
      padding: 12px 24px;
    }
  }

  @media (max-width: 991px) {
    .jypesa-disp-split-desktop-wrapper {
      display: none !important;
    }
    .jypesa-disp-split-mobile-wrapper {
      display: block !important;
    }
  }

  @media (max-width: 576px) {
    .jypesa-disp-split-mobile-wrapper {
      padding: 40px 16px;
    }
    .jypesa-disp-split-mobile-header .jypesa-disp-main-title {
      font-size: 32px;
    }
    .jypesa-disp-split-mobile-grid {
      grid-template-columns: 1fr; /* 1 columna en celulares pequeños */
      gap: 20px;
    }
  }
  `;

  // Inyectar estilos en el head
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── 2. OBTENER RUTA BASE DEL SCRIPT PARA ASSETS ──────────────────────────────
  let basePath = './';
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].src;
    if (src && src.includes('sistemas-dispensacion.js')) {
      basePath = src.substring(0, src.indexOf('widgets/'));
      break;
    }
  }

  // ─── 3. DATOS DE FALLBACK (VALORES POR DEFECTO DE FIGMA) ──────────────────────
  // ─── 3. DATOS DE DISEÑO ESTÁTICOS (FIGMA REF & BILINGÜE) ──────────────────────
  const staticDataByLang = {
    es: {
      title: '<span class="jypesa-disp-title-line">Menos residuos,</span><span class="jypesa-disp-title-line">mayor <span class="jypesa-disp-split-italic-highlight">eficiencia</span></span>',
      subtitle: 'Sistemas de dispensación',
      desc: 'Dispensadores que combinan estética, practicidad y sostenibilidad para mejorar la presentación y gestión de amenidades en hoteles.',
      btnText: 'Ver sistemas de dispensación',
      btnLink: '/sistemas-de-dispensacion',
      images: [
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a517650cc0f99d3d0a0d182_elements%2003.avif', // Izquierda 1
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765121c2aa4efdc14b0b_elements%2004.avif', // Izquierda 2
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765095d88faa906532c8_elements%2001.avif', // Derecha 1
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5176510c1099a1f3814e4d_elements%2002.avif'  // Derecha 2
      ]
    },
    en: {
      title: '<span class="jypesa-disp-title-line">Less Waste, Greater</span><span class="jypesa-disp-title-line"><span class="jypesa-disp-split-italic-highlight">Efficiency</span></span>',
      subtitle: 'Dispensing Systems',
      desc: 'Dispensers that combine aesthetics, practicality, and sustainability to improve the presentation and management of amenities in hotels.',
      btnText: 'View Dispensing Systems',
      btnLink: '/en/sistemas-de-dispensacion',
      images: [
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a517650cc0f99d3d0a0d182_elements%2003.avif', // Izquierda 1
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765121c2aa4efdc14b0b_elements%2004.avif', // Izquierda 2
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a51765095d88faa906532c8_elements%2001.avif', // Derecha 1
        'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5176510c1099a1f3814e4d_elements%2002.avif'  // Derecha 2
      ]
    }
  };

  // ─── 5. GENERACIÓN HTML DINÁMICO ───────────────────────────────────────────
  function buildWidgetHtml(data) {
    const leftColImages = [data.images[0], data.images[1]];
    const rightColImages = [data.images[2], data.images[3]];

    return `
      <!-- DESKTOP SCROLL INTERACTIVE LAYOUT -->
      <div class="jypesa-disp-split-desktop-wrapper">
        <div class="jypesa-disp-split-desktop-sticky">
          <!-- Columna Izquierda (Sube) -->
          <div class="jypesa-disp-split-col-left">
            <div class="jypesa-disp-split-inner-track">
              <div class="jypesa-disp-split-img-box">
                <img class="jypesa-disp-split-img" src="${leftColImages[0]}" alt="Imagen Izquierda 1" loading="lazy">
              </div>
              <div class="jypesa-disp-split-img-box">
                <img class="jypesa-disp-split-img" src="${leftColImages[1]}" alt="Imagen Izquierda 2" loading="lazy">
              </div>
            </div>
          </div>

          <!-- Columna Central (Baja contenido) -->
          <div class="jypesa-disp-split-col-center">
            <div class="jypesa-disp-split-center-textbox">
              <div class="jypesa-disp-destacable">
                <p>${data.subtitle}</p>
              </div>
              <h2 class="jypesa-disp-main-title">${data.title}</h2>
              <p class="jypesa-disp-intro-desc">${data.desc}</p>
              <a href="${data.btnLink}" class="jypesa-disp-btn">
                ${data.btnText}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Columna Derecha (Sube) -->
          <div class="jypesa-disp-split-col-right">
            <div class="jypesa-disp-split-inner-track">
              <div class="jypesa-disp-split-img-box">
                <img class="jypesa-disp-split-img" src="${rightColImages[0]}" alt="Imagen Derecha 1" loading="lazy">
              </div>
              <div class="jypesa-disp-split-img-box">
                <img class="jypesa-disp-split-img" src="${rightColImages[1]}" alt="Imagen Derecha 2" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MOBILE STATIC/SWIPE CAROUSEL LAYOUT (< 992px) -->
      <div class="jypesa-disp-split-mobile-wrapper">
        <div class="jypesa-disp-split-mobile-header">
          <div class="jypesa-disp-destacable">
            <p>${data.subtitle}</p>
          </div>
          <h2 class="jypesa-disp-main-title">${data.title}</h2>
          <p class="jypesa-disp-intro-desc">${data.desc}</p>
          <a href="${data.btnLink}" class="jypesa-disp-btn">
            ${data.btnText}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div class="jypesa-disp-split-mobile-carousel">
          <div class="jypesa-disp-split-mobile-track">
            <div class="jypesa-disp-split-mobile-slide">
              <img class="jypesa-disp-split-mobile-img" src="${leftColImages[0]}" alt="Foto 1" loading="lazy">
            </div>
            <div class="jypesa-disp-split-mobile-slide">
              <img class="jypesa-disp-split-mobile-img" src="${leftColImages[1]}" alt="Foto 2" loading="lazy">
            </div>
            <div class="jypesa-disp-split-mobile-slide">
              <img class="jypesa-disp-split-mobile-img" src="${rightColImages[0]}" alt="Foto 3" loading="lazy">
            </div>
            <div class="jypesa-disp-split-mobile-slide">
              <img class="jypesa-disp-split-mobile-img" src="${rightColImages[1]}" alt="Foto 4" loading="lazy">
            </div>
          </div>
          <div class="jypesa-disp-split-mobile-dots">
            <button class="jypesa-disp-split-mobile-dot active" data-index="0" aria-label="Ir a foto 1"></button>
            <button class="jypesa-disp-split-mobile-dot" data-index="1" aria-label="Ir a foto 2"></button>
            <button class="jypesa-disp-split-mobile-dot" data-index="2" aria-label="Ir a foto 3"></button>
            <button class="jypesa-disp-split-mobile-dot" data-index="3" aria-label="Ir a foto 4"></button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── 6. LÓGICA DE INTERACTIVIDAD DE SCROLL DESKTOP ──────────────────────────
  function setupDesktopScroll(wrapper) {
    const desktopWrapper = wrapper.querySelector('.jypesa-disp-split-desktop-wrapper');
    const leftCol = wrapper.querySelector('.jypesa-disp-split-col-left');
    const leftTrack = wrapper.querySelector('.jypesa-disp-split-col-left .jypesa-disp-split-inner-track');
    const rightTrack = wrapper.querySelector('.jypesa-disp-split-col-right .jypesa-disp-split-inner-track');
    const centerCol = wrapper.querySelector('.jypesa-disp-split-col-center');
    const textBox = wrapper.querySelector('.jypesa-disp-split-center-textbox');

    if (!desktopWrapper || !leftCol || !leftTrack || !rightTrack || !centerCol || !textBox) return;

    const handleScroll = () => {
      // 1. Verificar si el elemento está en pantalla
      const rect = desktopWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Si la sección no está visible, retornar
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      // 2. Calcular progreso del scroll en la sección
      const scrolled = -rect.top;
      const scrollRange = rect.height - windowHeight;
      const progress = Math.min(1, Math.max(0, scrolled / scrollRange)); // Rango [0, 1]

      // 3. Obtener dimensiones dinámicas para las transformaciones
      const colHeight = leftCol.offsetHeight;
      const imgBox = leftCol.querySelector('.jypesa-disp-split-img-box');
      if (!imgBox) return;
      const imgHeight = imgBox.offsetHeight;

      // El gap es de 80px (según CSS)
      const gap = 80;
      const totalImgTravel = imgHeight + gap;

      // Desplazar imágenes hacia arriba
      leftTrack.style.transform = `translateY(-${progress * totalImgTravel}px)`;
      rightTrack.style.transform = `translateY(-${progress * totalImgTravel}px)`;

      // Desplazar caja de texto central hacia abajo
      const textBoxHeight = textBox.offsetHeight;
      const padding = 80; // Padding superior/inferior del contenedor central
      const maxCenterTravel = colHeight - textBoxHeight - (padding * 2);

      if (maxCenterTravel > 0) {
        textBox.style.transform = `translateY(${progress * maxCenterTravel}px)`;
      } else {
        textBox.style.transform = 'translateY(0px)';
      }
    };

    // Escuchar el evento de scroll de la ventana
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Ejecutar una vez al inicio
    handleScroll();
  }

  // ─── 7. LÓGICA DE INTERACTIVIDAD DE CAROUSEL MÓVIL ──────────────────────────
  function setupMobileCarousel(wrapper) {
    const track = wrapper.querySelector('.jypesa-disp-split-mobile-track');
    const dots = wrapper.querySelectorAll('.jypesa-disp-split-mobile-dot');

    if (!track || !dots.length) return;

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const width = track.offsetWidth;
      const activeIdx = Math.min(dots.length - 1, Math.max(0, Math.round(scrollLeft / width)));

      dots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    track.addEventListener('scroll', handleScroll);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const slide = track.querySelector('.jypesa-disp-split-mobile-slide');
        if (!slide) return;
        const width = slide.offsetWidth + 16; // width + gap
        track.scrollTo({ left: index * width, behavior: 'smooth' });
      });
    });

    // Drag to scroll con el mouse en simulador
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => {
      isDown = false;
    });
    track.addEventListener('mouseup', () => {
      isDown = false;
    });
    track.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  // ─── 8. INICIALIZADOR DEL WIDGET ─────────────────────────────────────────────
  function initSistemasDispensacionWidget() {
    const targets = document.querySelectorAll(
      '.jypesa-sistemas-dispensacion-widget, [data-jypesa-sistemas-dispensacion-widget], #jypesa-sistemas-dispensacion-widget'
    );
    if (!targets.length) return;

    targets.forEach((target) => {
      if (target.getAttribute('data-initialized') === 'true') return;
      target.setAttribute('data-initialized', 'true');

      let lang = (target.getAttribute('data-lang') || '').toLowerCase().trim();
      if (lang !== 'en' && lang !== 'es') {
        const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
        if (htmlLang.startsWith('en')) {
          lang = 'en';
        } else if (window.location.pathname.toLowerCase().startsWith('/en')) {
          lang = 'en';
        } else {
          lang = 'es';
        }
      }

      const data = staticDataByLang[lang] || staticDataByLang.es;

      // Cargar HTML
      target.innerHTML = buildWidgetHtml(data);

      // Configurar scroll interactivo desktop
      setupDesktopScroll(target);

      // Configurar carrusel móvil
      setupMobileCarousel(target);
    });
  }

  // Ejecución al estar listo el DOM o inmediatamente si ya cargó
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSistemasDispensacionWidget);
  } else {
    initSistemasDispensacionWidget();
  }
})();
