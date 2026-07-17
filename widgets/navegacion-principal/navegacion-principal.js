(function() {
  if (window.__JypesaNavPrincipalWidgetInitialized) return;
  window.__JypesaNavPrincipalWidgetInitialized = true;

  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Instrument+Serif:ital@0;1&display=swap');

:root {
  --primary: #506D85;
  --secondary: #48A9C5;
  --text-dark: #25282A;
  --text-muted: rgba(37, 40, 42, 0.5);
  --white: #FFFFFF;
  --nav-bg: rgba(255, 255, 255, 0.01);
  --nav-blur: 20px;
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --mega-width: 1440px;
}

.jypesa-nav-principal-widget * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.jypesa-nav-principal-widget body {
  background-color: #fcfcfc;
}

.jypesa-nav-principal-widget .jypesa-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  background: transparent;
  transition: var(--transition);
  border-bottom: 1px solid rgba(0,0,0,0.03);
}

.jypesa-nav-principal-widget .jypesa-nav.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

/* Hover en la parte superior: fondo blanco (sin glass) igual que en scroll */
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover .logo,
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover .nav-link,
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover .action-icon,
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover .smart-order {
  color: #506D85;
}
.jypesa-nav-principal-widget .jypesa-nav:not(.scrolled):not(.nav-hidden):hover .hamburger span {
  background: #506D85;
}

.jypesa-nav-principal-widget .jypesa-nav.nav-hidden {
  transform: translateY(-100%);
  will-change: transform;
}

.jypesa-nav-principal-widget .nav-container {
  max-width: var(--mega-width);
  margin: 0 auto;
  height: 90px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.jypesa-nav-principal-widget .logo {
  font-weight: 900;
  font-size: 24px;
  color: var(--white);
  text-decoration: none;
  letter-spacing: 1px;
  transition: var(--transition);
  display: inline-flex;
}

.jypesa-nav-principal-widget .nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  height: 100%;
}

.jypesa-nav-principal-widget .nav-link-item {
  height: 100%;
  display: flex;
  align-items: center;
}

.jypesa-nav-principal-widget .nav-link {
  text-decoration: none;
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  transition: var(--transition);
}

.jypesa-nav-principal-widget .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--secondary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.jypesa-nav-principal-widget .nav-link:hover {
  color: var(--secondary);
}

.jypesa-nav-principal-widget .nav-link:hover::after,
.jypesa-nav-principal-widget .nav-link-item:hover .nav-link::after {
  transform: scaleX(1);
  transform-origin: left;
}

.jypesa-nav-principal-widget .nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.jypesa-nav-principal-widget .action-icon {
  color: var(--white);
  text-decoration: none;
  display: flex;
  padding: 8px;
  transition: var(--transition);
}

.jypesa-nav-principal-widget .action-icon:hover {
  color: var(--secondary);
}

.jypesa-nav-principal-widget .smart-order {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
  text-decoration: none;
  position: relative;
  padding: 10px 0;
  transition: var(--transition);
}

.jypesa-nav-principal-widget .smart-order::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--secondary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.jypesa-nav-principal-widget .smart-order:hover {
  color: var(--secondary);
}

.jypesa-nav-principal-widget .smart-order:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.jypesa-nav-principal-widget .btn-contact {
  background: var(--primary);
  color: var(--white);
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition);
  border: none;
  cursor: pointer;
}

.jypesa-nav-principal-widget .btn-contact:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.jypesa-nav-principal-widget .jypesa-nav.scrolled .logo,
.jypesa-nav-principal-widget .jypesa-nav.scrolled .nav-link,
.jypesa-nav-principal-widget .jypesa-nav.scrolled .action-icon,
.jypesa-nav-principal-widget .jypesa-nav.scrolled .smart-order {
  color: #506D85;
}

.jypesa-nav-principal-widget .mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
  box-shadow: inset 0px 0px 16.9px 0px rgba(0,0,0,0.1);
}

.jypesa-nav-principal-widget .nav-link-item:hover .mega-menu {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.jypesa-nav-principal-widget .mega-content {
  max-width: var(--mega-width);
  margin: 0 auto;
  min-height: 480px;
  display: flex;
  padding: 40px 110px 60px 40px;
}

.jypesa-nav-principal-widget .visual-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 660px;
  height: 100%;
  background: #F9F9F9;
  overflow: hidden;
}

@media (min-width: 1441px) {
  .jypesa-nav-principal-widget .visual-block {
    width: calc(50vw - 60px);
  }
}

.jypesa-nav-principal-widget .visual-block img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.jypesa-nav-principal-widget .visual-block img.inactive {
  opacity: 0;
  z-index: 1;
}

.jypesa-nav-principal-widget .visual-block img.active {
  opacity: 1;
  z-index: 2;
}

.jypesa-nav-principal-widget .visual-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent 70%, white 100%);
  z-index: 5;
}

.jypesa-nav-principal-widget .links-container {
  margin-left: 705px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.jypesa-nav-principal-widget .cat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 20px;
}

.jypesa-nav-principal-widget .sections-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
}

.jypesa-nav-principal-widget .menu-section {
  min-width: 120px;
}

.jypesa-nav-principal-widget .section-header {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: 18px;
  color: var(--primary);
  letter-spacing: 0.8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--primary);
  margin-bottom: 16px;
  display: inline-block;
  opacity: 0.9;
}

.jypesa-nav-principal-widget .options-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.jypesa-nav-principal-widget .option-link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
  transition: var(--transition);
  white-space: nowrap;
}

.jypesa-nav-principal-widget .option-link:hover {
  color: var(--secondary);
  padding-left: 4px;
}

/* Fila inferior de Dispensadores y Accesorios */
.jypesa-nav-principal-widget .category-block-bottom {
  border-top: 1px solid rgba(80, 109, 133, 0.2);
  padding-top: 24px;
  margin-top: 10px;
  display: flex;
  gap: 150px;
}

.jypesa-nav-principal-widget .dispensadores-col,
.jypesa-nav-principal-widget .accesorios-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.jypesa-nav-principal-widget .dispensadores-col .dispensadores-row,
.jypesa-nav-principal-widget .accesorios-col .accesorios-row {
  display: flex;
  gap: 120px;
}

.jypesa-nav-principal-widget .cat-label-link {
  text-decoration: none;
  display: inline-block;
}

.jypesa-nav-principal-widget .cat-label-link:hover .cat-label {
  color: var(--secondary);
}

.jypesa-nav-principal-widget .hamburger {
  display: none;
  width: 25px;
  height: 18px;
  cursor: pointer;
  position: relative;
  z-index: 2001;
}

.jypesa-nav-principal-widget .hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--white);
  transition: .25s ease-in-out;
}

.jypesa-nav-principal-widget .jypesa-nav.scrolled .hamburger span,
.jypesa-nav-principal-widget .hamburger.active span {
  background: #506D85;
}

.jypesa-nav-principal-widget .hamburger span:nth-child(1) { top: 0; }
.jypesa-nav-principal-widget .hamburger span:nth-child(2) { top: 8px; }
.jypesa-nav-principal-widget .hamburger span:nth-child(3) { top: 16px; }

.jypesa-nav-principal-widget .hamburger.active span:nth-child(1) { top: 8px; transform: rotate(135deg); }
.jypesa-nav-principal-widget .hamburger.active span:nth-child(2) { opacity: 0; left: -60px; }
.jypesa-nav-principal-widget .hamburger.active span:nth-child(3) { top: 8px; transform: rotate(-135deg); }

.jypesa-nav-principal-widget .mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  padding: 120px 30px;
  visibility: hidden;
  opacity: 0;
  transition: var(--transition);
  overflow-y: auto;
}

.jypesa-nav-principal-widget .mobile-overlay.active {
  visibility: visible;
  opacity: 1;
}

.jypesa-nav-principal-widget .mob-nav-list {
  list-style: none;
}

.jypesa-nav-principal-widget .mob-item {
  border-bottom: 1px solid #f0f0f0;
}

.jypesa-nav-principal-widget .mob-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  text-decoration: none;
  cursor: pointer;
}

.jypesa-nav-principal-widget .mob-trigger span {
  font-size: 20px;
  color: var(--text-muted);
  transition: transform 0.3s;
}

.jypesa-nav-principal-widget .mob-item.open .mob-trigger span {
  transform: rotate(45deg);
}

.jypesa-nav-principal-widget .mob-submenu {
  display: none;
  padding: 0 0 20px 15px;
}

.jypesa-nav-principal-widget .mob-item.open .mob-submenu {
  display: block;
}

.jypesa-nav-principal-widget .mob-cat-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  margin: 15px 0 10px;
}

.jypesa-nav-principal-widget .mob-link {
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: var(--text-dark);
  font-size: 15px;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .jypesa-nav-principal-widget .nav-links,
  .jypesa-nav-principal-widget .nav-actions {
    display: none;
  }

  .jypesa-nav-principal-widget .hamburger {
    display: flex;
  }

  .jypesa-nav-principal-widget .nav-container {
    height: 70px;
    padding: 0 24px;
  }
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  const widgetHtml = `
<div class="jypesa-nav-principal-widget">
<nav class="jypesa-nav" id="nav">
    <div class="nav-container">
        <a href="/" class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="132" height="32" viewBox="0 0 132 32" fill="none" style="display:block;">
              <g clip-path="url(#clip0_716_31440)">
                <path d="M54.8289 10.5108H43.4157V31.6971H45.9821V22.7321H54.8289C59.1727 22.7321 61.6652 20.4981 61.6652 16.6047C61.6652 12.7114 59.1727 10.5085 54.8289 10.5085V10.5108ZM54.9208 20.3645H45.9821V12.8784H54.9208C57.7293 12.8784 59.0382 14.0633 59.0382 16.6069C59.0382 19.1506 57.7293 20.3645 54.9208 20.3645Z" fill="currentColor"/>
                <path d="M100.475 20.4981L93.4481 19.155C91.0364 18.7006 90.1264 17.8476 90.2071 16.1169C90.3617 13.0499 94.2864 12.5911 96.6107 12.5911C100.379 12.5911 102.624 14.0477 103.288 16.9188L103.353 17.1972L105.816 16.2283C104.85 12.3416 101.64 10.2078 96.7138 10.2078C91.2247 10.2078 87.811 12.4018 87.5802 16.0813C87.43 18.9924 89.2119 20.8144 92.8743 21.4959L99.9033 22.839C102.943 23.3981 103.274 24.7322 103.198 25.9639C103.142 26.8682 102.97 29.6168 96.5726 29.6168C92.3498 29.6168 89.9673 28.0287 89.2859 24.7634L89.2298 24.4939L86.7553 25.4673C87.7371 29.7437 91.0835 32 96.4695 32C102.261 32 105.583 29.8729 105.825 26.0085C106.009 23.0617 104.209 21.2064 100.477 20.4959L100.475 20.4981Z" fill="currentColor"/>
                <path d="M118.321 10.5108L107.562 31.6971H110.371L113.831 24.8236H125.733L129.16 31.6971H132L121.212 10.5108H118.319H118.321ZM114.995 22.4871L119.782 13.0254L124.543 22.4871H114.995Z" fill="currentColor"/>
                <path d="M13.3049 24.2355C13.3049 26.9395 11.0926 29.1379 8.37159 29.1379H1.01087L0 31.6971H8.37159C12.5114 31.6971 15.8803 28.3494 15.8803 24.2355V10.5085H13.3049V24.2355Z" fill="currentColor"/>
                <path d="M68.674 21.9147H82.129V19.547H66.1076V31.6971H82.5571V29.3294H68.674V21.9147Z" fill="currentColor"/>
                <path d="M82.129 10.5108H66.1076V12.8784H82.129V10.5108Z" fill="currentColor"/>
                <path d="M22.4543 10.5108H19.2199L27.327 21.1039H30.5614L22.4543 10.5108Z" fill="currentColor"/>
                <path d="M28 31.1971H30.7547L42.9075 -0.5H40.1506L28 31.1971Z" fill="currentColor"/>
                <path d="M129.7 14.7984C130.33 14.7984 130.877 14.5868 131.325 14.1703C131.774 13.7515 132.002 13.2415 132.002 12.6534C132.002 12.0654 131.776 11.5531 131.325 11.1366C130.877 10.7224 130.332 10.5108 129.7 10.5108C129.068 10.5108 128.524 10.7201 128.075 11.1366C127.625 11.5531 127.396 12.0632 127.396 12.6534C127.396 13.2437 127.625 13.7537 128.073 14.1703C128.521 14.5868 129.068 14.7984 129.698 14.7984H129.7ZM128.45 11.5019C128.793 11.1834 129.214 11.023 129.7 11.023C130.187 11.023 130.606 11.1834 130.949 11.5019C131.294 11.8227 131.462 12.1991 131.462 12.6534C131.462 13.1078 131.289 13.4887 130.949 13.805C130.606 14.1235 130.187 14.2861 129.7 14.2861C129.214 14.2861 128.795 14.1235 128.45 13.805C128.102 13.4842 127.934 13.1056 127.934 12.6534C127.934 12.2013 128.102 11.8227 128.45 11.5019Z" fill="currentColor"/>
                <path d="M129.447 12.8205H129.631L130.196 13.7092H130.754L130.113 12.7269C130.37 12.6 130.5 12.3973 130.5 12.1256C130.5 11.8249 130.346 11.4641 129.608 11.4641H128.949V13.7092H129.447V12.8205ZM129.447 11.8939H129.611C130.005 11.8939 130.005 12.0699 130.005 12.1456C130.005 12.2525 129.983 12.3216 129.936 12.3528C129.904 12.375 129.815 12.4107 129.568 12.4107C129.517 12.4107 129.476 12.4107 129.447 12.4107V11.8962V11.8939Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_716_31440">
                  <rect width="132" height="32" fill="white"/>
                </clipPath>
              </defs>
            </svg>
        </a>

        <ul class="nav-links">
            <li class="nav-link-item"><a href="/nosotros" class="nav-link">Nosotros</a></li>
            <li class="nav-link-item">
                <span class="nav-link">Productos</span>
                <div class="mega-menu">
                    <div class="mega-content">
                        <div class="visual-block" id="v-block">
                            <img id="img-1" class="active" src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1efc9fb63da3bbe96f_Elements%20menu%C3%8C%C2%81.webp" alt="">
                            <img id="img-2" class="inactive" src="" alt="">
                            <div class="visual-overlay"></div>
                        </div>
                        <div class="links-container">
                            <div class="category-block">
                                <p class="cat-label">COLECCIONES</p>
                                <div class="sections-row">
                                    <div class="menu-section">
                                        <div class="section-header">Estándar</div>
                                        <ul class="options-list">
                                            <li><a href="/colecciones/estandar/elements" class="option-link" data-p="Elements">Elements</a></li>
                                            <li><a href="/colecciones/estandar/tea-leaf" class="option-link" data-p="Tea Leaf">Tea Leaf</a></li>
                                            <li><a href="/colecciones/estandar/rain-forest" class="option-link" data-p="Rainforest">Rainforest</a></li>
                                            <li><a href="/colecciones/estandar/almond-olive" class="option-link" data-p="Almond">Almond & Olive</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Superior</div>
                                        <ul class="options-list">
                                            <li><a href="/colecciones/superior/cava" class="option-link" data-p="Cava">Cava</a></li>
                                            <li><a href="/colecciones/superior/biogena" class="option-link" data-p="Biogena">Biogena</a></li>
                                            <li><a href="/colecciones/superior/lavarino-cosso" class="option-link" data-p="Lavarino">Lavarino Cosso</a></li>
                                            <li><a href="#" class="option-link" data-p="Dove">Dove</a></li>
                                            <li><a href="/colecciones/superior/tresseme" class="option-link" data-p="Tresemme">Tresemme</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Premium</div>
                                        <ul class="options-list">
                                            <li><a href="/colecciones/premium/vervan" class="option-link" data-p="Vervan">Vervan</a></li>
                                            <li><a href="/colecciones/premium/hawaiian-tropic" class="option-link" data-p="Hawaiian">Hawaiian Tropic</a></li>
                                            <li><a href="/colecciones/premium/for-all-folks" class="option-link" data-p="For All Folks">For All Folks</a></li>
                                            <li><a href="/colecciones/premium/persea" class="option-link" data-p="Persea">Persea</a></li>
                                            <li><a href="/colecciones/premium/agavia" class="option-link" data-p="Agavia">Agavia</a></li>
                                            <li><a href="#" class="option-link" data-p="Valquer">Valquer</a></li>
                                            <li><a href="/colecciones/premium/botanicus" class="option-link" data-p="Botanicus">Botanicus</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Lujo</div>
                                        <ul class="options-list">
                                            <li><a href="/colecciones/lujo/botanicaromatica" class="option-link" data-p="Botanicaromatica">Botanicaromatica</a></li>
                                            <li><a href="/colecciones/lujo/xinu" class="option-link" data-p="Xinu">Xinu</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="category-block-bottom">
                                <div class="dispensadores-col">
                                    <p class="cat-label">DISPENSADORES</p>
                                    <div class="dispensadores-row">
                                        <a href="/soportes" class="option-link" data-p="Soportes">Soportes</a>
                                        <a href="/sistemas-de-dispensacion" class="option-link" data-p="Sistemas">Sistemas de dispensación</a>
                                    </div>
                                </div>
                                <div class="accesorios-col">
                                    <a href="/accesorios" class="cat-label-link"><p class="cat-label">ACCESORIOS</p></a>
                                    <div class="accesorios-row">
                                        <a href="/accesorios" class="option-link" data-p="Lavarino">Lavarino</a>
                                        <a href="/accesorios" class="option-link" data-p="Nocean">Nocean</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-link-item">
                <a href="/soluciones" class="nav-link">Soluciones</a>
                <div class="mega-menu">
                    <div class="mega-content">
                        <div class="visual-block">
                            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5a93f331191cd8cd4670a3_soluciones%20menu.avif" alt="Soluciones">
                            <div class="visual-overlay"></div>
                        </div>
                        <div class="links-container">
                            <div class="category-block">
                                <p class="cat-label">SOLUCIONES INTEGRALES</p>
                                <div class="sections-row">
                                    <div class="menu-section">
                                        <div class="section-header">Hotelería</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/hoteleria/independientes" class="option-link">Hoteles independientes</a></li>
                                            <li><a href="/soluciones/hoteleria/cadenas" class="option-link">Cadenas hoteleras</a></li>
                                            <li><a href="/soluciones/hoteleria/grupos-operadores" class="option-link">Grupos hoteleros & operadores</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Hospitalidad alternativa</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/hospitalidad/airbnb" class="option-link">Airbnb</a></li>
                                            <li><a href="/soluciones/hospitalidad/str" class="option-link">STR</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Institucional</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/institucional/hospitales" class="option-link">Hospitales</a></li>
                                            <li><a href="/soluciones/institucional/restaurantes-clubes" class="option-link">Restaurante & Clubes</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="sections-row" style="margin-top: 30px;">
                                    <div class="menu-section">
                                        <div class="section-header">Canal comercial</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/canal-comercial/distribuidores" class="option-link">Distribuidores</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Empresarial</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/empresarial/corporativo-regalos" class="option-link">Corporativo & Regalos empresariales</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Hospitalidad especializada</div>
                                        <ul class="options-list">
                                            <li><a href="/soluciones/hospitalidad-especializada/cruceros-campamentos" class="option-link">Cruceros & Campamentos</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-link-item"><a href="/desarrollo" class="nav-link">Desarrollo personalizado</a></li>
            <li class="nav-link-item">
                <a href="/sustentabilidad" class="nav-link">Sustentabilidad</a>
                <div class="mega-menu">
                    <div class="mega-content">
                        <div class="visual-block">
                            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5a9443a95ace5546670f65_sustentabilidad%20menu.avif" alt="Sustentabilidad">
                            <div class="visual-overlay"></div>
                        </div>
                        <div class="links-container">
                            <div class="category-block">
                                <p class="cat-label">SUSTENTABILIDAD</p>
                                <div class="sections-row">
                                    <div class="menu-section">
                                        <div class="section-header">Materiales responsables</div>
                                        <ul class="options-list">
                                            <li><a href="/sustentabilidad#materiales" class="option-link">Nocean</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Reducción de residuos</div>
                                        <ul class="options-list">
                                            <li><a href="/sustentabilidad#refill" class="option-link">Refill systems</a></li>
                                            <li><a href="/sustentabilidad#residuos" class="option-link">Reducción de residuos</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Certificaciones</div>
                                        <ul class="options-list">
                                            <li><a href="/sustentabilidad#certificaciones" class="option-link">Certificaciones ambientales</a></li>
                                            <li><a href="/sustentabilidad#estandares" class="option-link">Estándares de calidad</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Impacto</div>
                                        <ul class="options-list">
                                            <li><a href="/sustentabilidad#impacto" class="option-link">Impacto ambiental y social</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-link-item">
                <span class="nav-link">Recursos</span>
                <div class="mega-menu">
                    <div class="mega-content">
                        <div class="visual-block">
                            <img src="https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/6a5a948117207012f5176ae5_recurso%20menu.avif" alt="Recursos">
                            <div class="visual-overlay"></div>
                        </div>
                        <div class="links-container">
                            <div class="category-block">
                                <p class="cat-label">RECURSOS</p>
                                <div class="sections-row">
                                    <div class="menu-section">
                                        <div class="section-header">Material comercial</div>
                                        <ul class="options-list">
                                            <li><a href="/recursos/catalogos" class="option-link">Catálogos descargables</a></li>
                                            <li><a href="/recursos/fichas-tecnicas" class="option-link">Fichas técnicas</a></li>
                                        </ul>
                                    </div>
                                    <div class="menu-section">
                                        <div class="section-header">Contenido y tendencias</div>
                                        <ul class="options-list">
                                            <li><a href="/blog" class="option-link">Blog</a></li>
                                            <li><a href="/recursos/tendencias" class="option-link">Tendencias de hospitalidad</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <div class="nav-actions">
            <a href="#" class="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
            <a href="https://sm.jypesa.com/jypesa/public/login" class="smart-order" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Smart order
            </a>
            <a href="/contacto" class="btn-contact">Contáctanos</a>
        </div>

        <div class="hamburger" id="h-trigger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>

<div class="mobile-overlay" id="m-overlay">
    <ul class="mob-nav-list">
        <li class="mob-item">
            <a href="/nosotros" class="mob-trigger">Nosotros</a>
        </li>
        <li class="mob-item">
            <div class="mob-trigger">Productos <span>+</span></div>
            <div class="mob-submenu">
                <div class="mob-cat-title">Colecciones</div>
                <a href="/productos#colecciones" class="mob-link">Estándar (Elements, Tea Leaf...)</a>
                <a href="/productos#colecciones" class="mob-link">Superior (Cava, Biogena...)</a>
                <a href="/productos#colecciones" class="mob-link">Premium (Vervan, Hawaiian...)</a>
                <a href="/productos#colecciones" class="mob-link">Lujo (Botanicaromatica, Xinu)</a>
                <div class="mob-cat-title">Dispensadores</div>
                <a href="/soportes" class="mob-link">Soportes</a>
                <a href="/sistemas-de-dispensacion" class="mob-link">Sistemas de dispensación</a>
                <div class="mob-cat-title">Accesorios</div>
                <a href="/accesorios" class="mob-link">Ver todos los accesorios</a>
                <a href="/accesorios" class="mob-link">Lavarino</a>
                <a href="/accesorios" class="mob-link">Nocean</a>
            </div>
        </li>
        <li class="mob-item">
            <div class="mob-trigger">Soluciones <span>+</span></div>
            <div class="mob-submenu">
                <div class="mob-cat-title">Hotelería</div>
                <a href="/soluciones/hoteleria/independientes" class="mob-link">Hoteles independientes</a>
                <a href="/soluciones/hoteleria/cadenas" class="mob-link">Cadenas hoteleras</a>
                <a href="/soluciones/hoteleria/grupos-operadores" class="mob-link">Grupos hoteleros & operadores</a>
                <div class="mob-cat-title">Hospitalidad alternativa</div>
                <a href="/soluciones/hospitalidad/airbnb" class="mob-link">Airbnb</a>
                <a href="/soluciones/hospitalidad/str" class="mob-link">STR</a>
                <div class="mob-cat-title">Institucional</div>
                <a href="/soluciones/institucional/hospitales" class="mob-link">Hospitales</a>
                <a href="/soluciones/institucional/restaurantes-clubes" class="mob-link">Restaurante & Clubes</a>
                <div class="mob-cat-title">Canal comercial</div>
                <a href="/soluciones/canal-comercial/distribuidores" class="mob-link">Distribuidores</a>
                <div class="mob-cat-title">Empresarial</div>
                <a href="/soluciones/empresarial/corporativo-regalos" class="mob-link">Corporativo & Regalos empresariales</a>
                <div class="mob-cat-title">Hospitalidad especializada</div>
                <a href="/soluciones/hospitalidad-especializada/cruceros-campamentos" class="mob-link">Cruceros & Campamentos</a>
            </div>
        </li>
        <li class="mob-item">
            <a href="/desarrollo" class="mob-trigger">Desarrollo personalizado</a>
        </li>
        <li class="mob-item">
            <div class="mob-trigger">Sustentabilidad <span>+</span></div>
            <div class="mob-submenu">
                <div class="mob-cat-title">Materiales responsables</div>
                <a href="/sustentabilidad#materiales" class="mob-link">Nocean</a>
                <div class="mob-cat-title">Reducción de residuos</div>
                <a href="/sustentabilidad#refill" class="mob-link">Refill systems</a>
                <a href="/sustentabilidad#residuos" class="mob-link">Reducción de residuos</a>
                <div class="mob-cat-title">Certificaciones</div>
                <a href="/sustentabilidad#certificaciones" class="mob-link">Certificaciones ambientales</a>
                <a href="/sustentabilidad#estandares" class="mob-link">Estándares de calidad</a>
                <div class="mob-cat-title">Impacto</div>
                <a href="/sustentabilidad#impacto" class="mob-link">Impacto ambiental y social</a>
            </div>
        </li>
        <li class="mob-item">
            <div class="mob-trigger">Recursos <span>+</span></div>
            <div class="mob-submenu">
                <div class="mob-cat-title">Material comercial</div>
                <a href="/recursos/catalogos" class="mob-link">Catálogos descargables</a>
                <a href="/recursos/fichas-tecnicas" class="mob-link">Fichas técnicas</a>
                <div class="mob-cat-title">Contenido y tendencias</div>
                <a href="/blog" class="mob-link">Blog</a>
                <a href="/recursos/tendencias" class="mob-link">Tendencias de hospitalidad</a>
            </div>
        </li>
        <li class="mob-item" style="padding: 40px 0;">
            <a href="/contacto" class="btn-contact" style="display: block; text-align: center;">Contáctanos</a>
        </li>
    </ul>
</div>
</div>
`;

  function initNavPrincipalWidget() {
    const target = document.getElementById('jypesa-nav-principal-widget') || document.querySelector('[data-jypesa-nav-principal-widget]');
    if (!target) return;

    target.innerHTML = widgetHtml;

    const IMAGES = {
        'Valquer': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1fe7ff3cfa3d446df1_Valque%20menu%C3%8C%20%C2%81.webp',
        'Hawaiian': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1fb3721bd1607834ee_Hawaiian%20Tropic%20menu%C3%8C%C2%81.webp',
        'Xinu': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1fce91ebe09257f40e_Xinu%C3%8C%C2%81%20menu%C3%8C%C2%81.webp',
        'Persea': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1e1fc216bcbf94bff1_Persea%20menu%C3%8C%C2%81.webp',
        'Lavarino': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1e54ff69caf5c7db28_Lavarino%20menu%C3%8C%C2%81.webp',
        'Nocean': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1e54ff69caf5c7db28_Lavarino%20menu%C3%8C%C2%81.webp',
        'Elements': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1efc9fb63da3bbe96f_Elements%20menu%C3%8C%C2%81.webp',
        'Sistemas': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1efc9fb63da3bbe96f_Elements%20menu%C3%8C%C2%81.webp',
        'Soportes': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1efc9fb63da3bbe96f_Elements%20menu%C3%8C%C2%81.webp',
        'Tresemme': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1e66dcf59e15d3c2ca_Tresemme%20menu%C3%8C%C2%81.webp',
        'Tea Leaf': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1d8292eb38827b77f0_Tea%20Leaf%20manu%C3%8C%C2%81.webp',
        'Botanicaromatica': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1df209c74d9a0bf46c_botanicaromatica%20menu%C3%8C%C2%81.webp',
        'Dove': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1d527cb5a0a41eed38_Dove%20menu%C3%8C%C2%81.webp',
        'Cava': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1d2fd55338e35d58ea_Cava%20menu%C3%8C%C2%81.webp',
        'Agavia': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1d40c2a13025483ff0_Agavia%20menu%C3%8C%C2%81.webp',
        'Biogena': 'https://cdn.prod.website-files.com/69d7c3721733f0f4aaa00b42/69e28e1d8ecf2458e29f0dec_Biogena%20menu%C3%8C%C2%81.webp',
    };

    const nav = target.querySelector('#nav');
    const images = [target.querySelector('#img-1'), target.querySelector('#img-2')];
    let activeIdx = 0;
    const links = target.querySelectorAll('.option-link[data-p]');

    if (nav) {
      let lastY = window.scrollY;
      let ticking = false;
      const onScroll = () => {
        ticking = false;
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 20);
        // Ocultar al bajar, mostrar al subir
        const mo = target.querySelector('#m-overlay');
        const menuOpen = mo && mo.classList.contains('active');
        if (!menuOpen) {
          if (y > lastY && y > 120) {
            nav.classList.add('nav-hidden');
          } else if (y < lastY) {
            nav.classList.remove('nav-hidden');
          }
        }
        lastY = y;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(onScroll);
          ticking = true;
        }
      }, { passive: true });
    }

    if (images[0] && images[1]) {
      links.forEach(l => {
        l.addEventListener('mouseenter', () => {
          const key = l.getAttribute('data-p');
          const nextSrc = IMAGES[key];

          if (nextSrc && images[activeIdx].src !== nextSrc) {
            const nextIdx = (activeIdx + 1) % 2;

            images[nextIdx].src = nextSrc;
            images[nextIdx].classList.remove('inactive');
            images[nextIdx].classList.add('active');

            images[activeIdx].classList.remove('active');
            images[activeIdx].classList.add('inactive');

            activeIdx = nextIdx;
          }
        });
      });
    }

    const hTrigger = target.querySelector('#h-trigger');
    const mOverlay = target.querySelector('#m-overlay');
    if (hTrigger && mOverlay) {
      hTrigger.addEventListener('click', () => {
        mOverlay.classList.toggle('active');
        hTrigger.classList.toggle('active');
      });
    }

    target.querySelectorAll('.mob-trigger').forEach(t => {
      const submenu = t.nextElementSibling;
      if (submenu && submenu.classList.contains('mob-submenu')) {
        t.addEventListener('click', (e) => {
          e.preventDefault();
          t.parentElement.classList.toggle('open');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavPrincipalWidget);
  } else {
    initNavPrincipalWidget();
  }
})();
