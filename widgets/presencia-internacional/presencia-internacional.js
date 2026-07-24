(function() {
  if (window.__JypesaPresenciaInternacionalWidgetInitialized) return;
  window.__JypesaPresenciaInternacionalWidgetInitialized = true;

  /* ==========================================================
     DATOS DE LOCACIONES (PLACEHOLDER)
     Reemplaza este arreglo con el listado real de JYPESA.
     type acepta: 'oficina' | 'distribuidor' | 'cedis'
     ========================================================== */
  /* ==========================================================
     DATOS DE LOCACIONES (PLACEHOLDER BILINGÜE)
     ========================================================== */
  const LOCATIONS = [
    { id: 1, type: 'oficina', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 22.1565, lng: -100.9855, isDefault: true },
    { id: 2, type: 'distribuidor', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 25.6866, lng: -100.3161 },
    { id: 3, type: 'distribuidor', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 25.4260, lng: -101.0053 },
    { id: 4, type: 'distribuidor', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 22.7709, lng: -102.5832 },
    { id: 5, type: 'cedis', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 21.9623, lng: -99.6134 },
    { id: 6, type: 'distribuidor', name: 'Jypesa Hospitality', address: 'C. Cernícalo 155, La Aurora, 44460 Guadalajara, Jal.', phone: '+52 33 3540 2939', hoursEs: 'Abierto ahora • Cierra a las 20:00 hrs', hoursEn: 'Open Now • Closes at 8:00 PM', lat: 22.2331, lng: -97.8614 },
  ];

  /* ==========================================================
     DICCIONARIO BILINGÜE
     ========================================================== */
  const staticTextsByLang = {
    es: {
      titleMain: 'Presencia',
      titleAccent: 'internacional',
      searchPlaceholder: 'Buscar locación',
      description: 'JYPESA cuenta con una red de distribuidores autorizados en América, Europa y el Caribe para brindarte servicio local y soporte en tu idioma.',
      filtersBtn: 'Filtros',
      filterOptions: {
        oficina: 'Oficinas',
        distribuidor: 'Distribuidor',
        cedis: 'CEDIS'
      },
      countText: function(count, word) { return `${count} <em>${word}</em> cerca tuyo`; },
      emptyMessage: 'No encontramos locaciones con esos filtros.',
      fullscreenLabel: 'Pantalla completa',
      typeLabels: {
        oficina: { singular: 'oficina', plural: 'oficinas' },
        distribuidor: { singular: 'distribuidor', plural: 'distribuidores' },
        cedis: { singular: 'CEDIS', plural: 'CEDIS' },
      }
    },
    en: {
      titleMain: 'International',
      titleAccent: 'Presence',
      searchPlaceholder: 'Search Location',
      description: 'JYPESA has a network of authorized distributors in the Americas, Europe, and the Caribbean to provide you with local service and support in your language.',
      filtersBtn: 'Filters',
      filterOptions: {
        oficina: 'Offices',
        distribuidor: 'Distributors',
        cedis: 'CEDIS'
      },
      countText: function(count, word) { return `${count} <em>${word}</em> Near You`; },
      emptyMessage: 'No locations found with those filters.',
      fullscreenLabel: 'Fullscreen',
      typeLabels: {
        oficina: { singular: 'Location', plural: 'Locations' },
        distribuidor: { singular: 'Location', plural: 'Locations' },
        cedis: { singular: 'Location', plural: 'Locations' },
      }
    }
  };

  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Instrument+Serif:ital@1&display=swap');

:root {
  --jypesa-pi-slate: #506D85;
  --jypesa-pi-blue: #48A9C5;
  --jypesa-pi-blue-light: #9EF4F5;
  --jypesa-pi-dark: #25282A;
  --jypesa-pi-muted: rgba(37, 40, 42, 0.55);
  --jypesa-pi-border: #D1D5DC;
  --jypesa-pi-success: #4AA25D;
  --jypesa-pi-bg-soft: #F5F8FA;
}

.jypesa-presencia-internacional-widget * {
  box-sizing: border-box;
}

.jypesa-presencia-internacional-widget {
  font-family: 'Montserrat', sans-serif;
  color: var(--jypesa-pi-dark);
  width: 100%;
  padding: 60px 40px;
}

.jypesa-pi-grid {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 40px;
  align-items: start;
}

.jypesa-pi-panel {
  display: flex;
  flex-direction: column;
}

.jypesa-pi-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 34px;
  color: var(--jypesa-pi-slate);
  line-height: 1.1;
  margin: 0;
}

.jypesa-pi-title-accent {
  display: block;
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 40px;
  line-height: 1.1;
  background: linear-gradient(90deg, #48A9C5 0%, #9EF4F5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.jypesa-pi-search {
  position: relative;
  margin-top: 24px;
}

.jypesa-pi-search input {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 14px;
  border: 1px solid var(--jypesa-pi-border);
  border-radius: 8px;
  background: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: var(--jypesa-pi-dark);
  outline: none;
  transition: border-color 0.2s ease;
}

.jypesa-pi-search input:focus {
  border-color: var(--jypesa-pi-blue);
}

.jypesa-pi-search svg {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--jypesa-pi-muted);
  pointer-events: none;
}

.jypesa-pi-desc {
  margin-top: 16px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--jypesa-pi-muted);
}

.jypesa-pi-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  position: relative;
}

.jypesa-pi-count {
  font-size: 13px;
  font-weight: 600;
  color: var(--jypesa-pi-dark);
}

.jypesa-pi-count em {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  color: var(--jypesa-pi-blue);
  font-weight: 400;
}

.jypesa-pi-filters-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--jypesa-pi-dark);
  padding: 4px 0;
}

.jypesa-pi-filters-btn svg {
  color: var(--jypesa-pi-slate);
}

.jypesa-pi-filters-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #fff;
  border: 1px solid var(--jypesa-pi-border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 8px;
  min-width: 160px;
  z-index: 20;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
}

.jypesa-pi-filters-dropdown.open {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.jypesa-pi-filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 6px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}

.jypesa-pi-filter-option:hover {
  background: var(--jypesa-pi-bg-soft);
}

.jypesa-pi-filter-option input {
  accent-color: var(--jypesa-pi-blue);
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.jypesa-pi-list {
  margin-top: 20px;
  max-height: 372px;
  overflow-y: auto;
  padding-right: 4px;
}

.jypesa-pi-list::-webkit-scrollbar {
  width: 5px;
}

.jypesa-pi-list::-webkit-scrollbar-thumb {
  background: var(--jypesa-pi-border);
  border-radius: 4px;
}

.jypesa-pi-item {
  padding: 16px 10px;
  border-bottom: 1px solid #ECEFF1;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.jypesa-pi-item:hover,
.jypesa-pi-item.active {
  background: var(--jypesa-pi-bg-soft);
}

.jypesa-pi-item-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--jypesa-pi-dark);
  margin: 0 0 8px;
}

.jypesa-pi-item-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--jypesa-pi-dark);
  margin-bottom: 6px;
  line-height: 1.4;
}

.jypesa-pi-item-row svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--jypesa-pi-slate);
}

.jypesa-pi-item-row a {
  color: var(--jypesa-pi-dark);
  text-decoration: underline;
}

.jypesa-pi-item-hours {
  font-size: 13px;
  font-weight: 500;
  color: var(--jypesa-pi-success);
}

.jypesa-pi-empty {
  padding: 30px 10px;
  font-size: 13px;
  color: var(--jypesa-pi-muted);
  text-align: center;
}

.jypesa-pi-map-wrap {
  position: relative;
  width: 100%;
  height: 640px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--jypesa-pi-bg-soft);
}

.jypesa-pi-map {
  width: 100%;
  height: 100%;
}

.jypesa-pi-fullscreen-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 500;
  width: 36px;
  height: 36px;
  background: #fff;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  color: var(--jypesa-pi-dark);
}

.jypesa-pi-fullscreen-btn:hover {
  color: var(--jypesa-pi-blue);
}

.jypesa-pi-marker .jypesa-pi-pin {
  position: relative;
  width: 100%;
  height: 100%;
}

.jypesa-pi-pin-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--jypesa-pi-blue);
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.jypesa-pi-pin::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid var(--jypesa-pi-blue);
}

.jypesa-pi-marker.type-oficina .jypesa-pi-pin-circle,
.jypesa-pi-marker.active .jypesa-pi-pin-circle {
  background: var(--jypesa-pi-dark);
}

.jypesa-pi-marker.type-oficina .jypesa-pi-pin::after,
.jypesa-pi-marker.active .jypesa-pi-pin::after {
  border-top-color: var(--jypesa-pi-dark);
}

.jypesa-pi-marker.type-cedis .jypesa-pi-pin-circle {
  background: var(--jypesa-pi-slate);
}

.jypesa-pi-marker.type-cedis .jypesa-pi-pin::after {
  border-top-color: var(--jypesa-pi-slate);
}

.jypesa-pi-marker.active .jypesa-pi-pin-circle {
  box-shadow: 0 4px 10px rgba(0,0,0,0.35);
}

.jypesa-pi-popup .leaflet-popup-content-wrapper {
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
  padding: 0;
}

.jypesa-pi-popup .leaflet-popup-content {
  margin: 16px 18px;
  width: 240px !important;
}

.jypesa-pi-popup-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--jypesa-pi-dark);
  margin: 0 0 8px;
}

.jypesa-pi-popup-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: var(--jypesa-pi-dark);
  margin-bottom: 6px;
  line-height: 1.4;
}

.jypesa-pi-popup-row svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--jypesa-pi-slate);
}

.jypesa-pi-popup-row a {
  color: var(--jypesa-pi-dark);
  text-decoration: underline;
}

.jypesa-pi-popup-hours {
  font-size: 12px;
  font-weight: 500;
  color: var(--jypesa-pi-success);
}

@media (max-width: 900px) {
  .jypesa-presencia-internacional-widget {
    padding: 40px 20px;
  }

  .jypesa-pi-grid {
    grid-template-columns: 1fr;
  }

  .jypesa-pi-map-wrap {
    height: 380px;
    order: -1;
  }

  .jypesa-pi-list {
    max-height: none;
  }
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  const ICONS = {
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    filters: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`,
    expand: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  };

  function buildWidgetHtml(t) {
    return `
<div class="jypesa-presencia-internacional-widget">
  <div class="jypesa-pi-grid">
    <div class="jypesa-pi-panel">
      <h2 class="jypesa-pi-title">${t.titleMain} <span class="jypesa-pi-title-accent">${t.titleAccent}</span></h2>

      <div class="jypesa-pi-search">
        <input type="text" class="pi-search-input" id="pi-search-input" placeholder="${t.searchPlaceholder}" autocomplete="off">
        ${ICONS.search}
      </div>

      <p class="jypesa-pi-desc">${t.description}</p>

      <div class="jypesa-pi-meta-row">
        <span class="jypesa-pi-count" id="pi-count"></span>
        <button type="button" class="jypesa-pi-filters-btn" id="pi-filters-btn">
          ${t.filtersBtn} ${ICONS.filters}
        </button>
        <div class="jypesa-pi-filters-dropdown" id="pi-filters-dropdown">
          <label class="jypesa-pi-filter-option"><input type="checkbox" value="oficina"> ${t.filterOptions.oficina}</label>
          <label class="jypesa-pi-filter-option"><input type="checkbox" value="distribuidor"> ${t.filterOptions.distribuidor}</label>
          <label class="jypesa-pi-filter-option"><input type="checkbox" value="cedis"> ${t.filterOptions.cedis}</label>
        </div>
      </div>

      <div class="jypesa-pi-list" id="pi-list"></div>
    </div>

    <div class="jypesa-pi-map-wrap" id="pi-map-wrap">
      <button type="button" class="jypesa-pi-fullscreen-btn" id="pi-fullscreen-btn" aria-label="${t.fullscreenLabel}">${ICONS.expand}</button>
      <div class="jypesa-pi-map" id="pi-map"></div>
    </div>
  </div>
</div>
`;
  }

  function loadLeaflet(callback) {
    if (window.L) { callback(); return; }

    if (!document.querySelector('link[data-jypesa-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-jypesa-leaflet', 'true');
      document.head.appendChild(link);
    }

    let script = document.querySelector('script[data-jypesa-leaflet]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.setAttribute('data-jypesa-leaflet', 'true');
      document.head.appendChild(script);
    }
    script.addEventListener('load', callback, { once: true });
    if (window.L) callback();
  }

  function getHours(loc, lang) {
    if (lang === 'en') {
      return loc.hoursEn || 'Open Now • Closes at 8:00 PM';
    }
    return loc.hoursEs || loc.hours || 'Abierto ahora • Cierra a las 20:00 hrs';
  }

  function initPresenciaInternacionalWidget() {
    const targets = document.querySelectorAll(
      '#jypesa-presencia-internacional-widget, [data-jypesa-presencia-internacional-widget], .jypesa-presencia-internacional-widget, .jypesa-presencia-internacional-widget-container'
    );
    if (!targets.length) return;

    targets.forEach(target => {
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

      target.classList.add('jypesa-presencia-internacional-widget');
      const t = staticTextsByLang[lang] || staticTextsByLang.es;
      target.innerHTML = buildWidgetHtml(t);

      const searchInput = target.querySelector('#pi-search-input');
      const countEl = target.querySelector('#pi-count');
      const listEl = target.querySelector('#pi-list');
      const filtersBtn = target.querySelector('#pi-filters-btn');
      const filtersDropdown = target.querySelector('#pi-filters-dropdown');
      const filterCheckboxes = target.querySelectorAll('.jypesa-pi-filter-option input');
      const mapWrap = target.querySelector('#pi-map-wrap');
      const fullscreenBtn = target.querySelector('#pi-fullscreen-btn');

      let activeId = LOCATIONS.find(l => l.isDefault) ? LOCATIONS.find(l => l.isDefault).id : LOCATIONS[0].id;
      let map = null;
      const markers = {};

      function getActiveTypes() {
        return Array.from(filterCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
      }

      function getFiltered() {
        const query = searchInput.value.trim().toLowerCase();
        const activeTypes = getActiveTypes();
        return LOCATIONS.filter(loc => {
          const matchesType = activeTypes.length === 0 || activeTypes.includes(loc.type);
          const matchesQuery = !query || loc.name.toLowerCase().includes(query) || loc.address.toLowerCase().includes(query);
          return matchesType && matchesQuery;
        });
      }

      function updateCount(filtered) {
        const activeTypes = getActiveTypes();
        let word = filtered.length === 1 ? t.typeLabels.oficina.singular : t.typeLabels.oficina.plural;
        if (activeTypes.length === 1 && t.typeLabels[activeTypes[0]]) {
          const labels = t.typeLabels[activeTypes[0]];
          word = filtered.length === 1 ? labels.singular : labels.plural;
        }
        countEl.innerHTML = t.countText(filtered.length, word);
      }

      function renderList() {
        const filtered = getFiltered();
        updateCount(filtered);

        if (filtered.length === 0) {
          listEl.innerHTML = `<div class="jypesa-pi-empty">${t.emptyMessage}</div>`;
          return;
        }

        listEl.innerHTML = filtered.map(loc => `
          <div class="jypesa-pi-item${loc.id === activeId ? ' active' : ''}" data-id="${loc.id}">
            <p class="jypesa-pi-item-name">${loc.name}</p>
            <div class="jypesa-pi-item-row">${ICONS.pin}<span>${loc.address}</span></div>
            <div class="jypesa-pi-item-row">${ICONS.phone}<a href="tel:${loc.phone.replace(/[\s+]+/g, '')}">${loc.phone}</a></div>
            <div class="jypesa-pi-item-hours">${getHours(loc, lang)}</div>
          </div>
        `).join('');

        listEl.querySelectorAll('.jypesa-pi-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = Number(item.getAttribute('data-id'));
            selectLocation(id, true);
          });
        });
      }

      function buildIcon(loc, isActive) {
        if (!window.L) return null;
        const size = isActive ? 44 : 34;
        return window.L.divIcon({
          className: `jypesa-pi-marker type-${loc.type}${isActive ? ' active' : ''}`,
          html: `<div class="jypesa-pi-pin"><div class="jypesa-pi-pin-circle">${ICONS.check}</div></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size + 6],
          popupAnchor: [0, -(size + 6)],
        });
      }

      function popupHtml(loc) {
        return `
          <div class="jypesa-pi-popup-name">${loc.name}</div>
          <div class="jypesa-pi-popup-row">${ICONS.pin}<span>${loc.address}</span></div>
          <div class="jypesa-pi-popup-row">${ICONS.phone}<a href="tel:${loc.phone.replace(/[\s+]+/g, '')}">${loc.phone}</a></div>
          <div class="jypesa-pi-popup-hours">${getHours(loc, lang)}</div>
        `;
      }

      function selectLocation(id, flyTo) {
        const prevId = activeId;
        activeId = id;
        const loc = LOCATIONS.find(l => l.id === id);
        if (!loc) return;

        if (map) {
          if (markers[prevId]) markers[prevId].setIcon(buildIcon(LOCATIONS.find(l => l.id === prevId), false));
          if (markers[id]) {
            markers[id].setIcon(buildIcon(loc, true));
            markers[id].openPopup();
          }
          if (flyTo) map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), 7), { duration: 0.6 });
        }

        target.querySelectorAll('.jypesa-pi-item').forEach(el => {
          el.classList.toggle('active', Number(el.getAttribute('data-id')) === id);
        });

        if (flyTo) {
          const activeEl = target.querySelector(`.jypesa-pi-item[data-id="${id}"]`);
          if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }

      function renderMarkers() {
        if (!map) return;
        const filtered = getFiltered();
        const filteredIds = new Set(filtered.map(l => l.id));

        Object.keys(markers).forEach(id => {
          const numId = Number(id);
          if (filteredIds.has(numId)) {
            if (!map.hasLayer(markers[id])) markers[id].addTo(map);
          } else if (map.hasLayer(markers[id])) {
            map.removeLayer(markers[id]);
          }
        });
      }

      function initMap() {
        map = window.L.map(target.querySelector('#pi-map'), {
          zoomControl: true,
          attributionControl: true,
        });

        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        LOCATIONS.forEach(loc => {
          const marker = window.L.marker([loc.lat, loc.lng], { icon: buildIcon(loc, loc.id === activeId) });
          marker.bindPopup(popupHtml(loc), { className: 'jypesa-pi-popup', closeButton: true, offset: [0, 0] });
          marker.on('click', () => selectLocation(loc.id, true));
          marker.addTo(map);
          markers[loc.id] = marker;
        });

        const bounds = window.L.latLngBounds(LOCATIONS.map(l => [l.lat, l.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });

        const activeLoc = LOCATIONS.find(l => l.id === activeId);
        if (activeLoc && markers[activeId]) {
          setTimeout(() => markers[activeId].openPopup(), 300);
        }
      }

      searchInput.addEventListener('input', () => {
        renderList();
        renderMarkers();
      });

      filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          renderList();
          renderMarkers();
        });
      });

      filtersBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filtersDropdown.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!filtersDropdown.contains(e.target) && e.target !== filtersBtn) {
          filtersDropdown.classList.remove('open');
        }
      });

      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          mapWrap.requestFullscreen && mapWrap.requestFullscreen();
        } else {
          document.exitFullscreen && document.exitFullscreen();
        }
      });

      document.addEventListener('fullscreenchange', () => {
        if (map) setTimeout(() => map.invalidateSize(), 100);
      });

      renderList();
      loadLeaflet(initMap);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresenciaInternacionalWidget);
  } else {
    initPresenciaInternacionalWidget();
  }
})();
