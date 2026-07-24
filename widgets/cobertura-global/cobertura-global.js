(function () {
  if (window.__JypesaCoberturaGlobalWidgetInitialized) return;
  window.__JypesaCoberturaGlobalWidgetInitialized = true;

  /* ==========================================================
     DATOS DE UBICACIONES
     ========================================================== */
  const GROUPS = {
    Distribuidores: { color: '#0089C1' },
    Oficinas: { color: '#4AA25D' },
    'Fábrica': { color: '#FBB31F' },
  };

  const GROUP_PRIORITY = ['Distribuidores', 'Oficinas', 'Fábrica'];

  /* LOCATIONS_DATA_START */
  const LOCATIONS = [
    { name: 'Cafi Guatemala', type: 'Distribuidores', location: 'Avenida Elena 6-42, Zona 3, Ciudad de Guatemala', country: 'Guatemala', contact: 'ventasguatemala@jypesa.com', lat: 14.6349, lon: -90.5069 },
    { name: 'Cafi El Salvador', type: 'Distribuidores', location: 'Blvd. Vijosa, calle L-1 N.° 44-C, Ciudad Merliot', country: 'El Salvador', contact: 'ventassalvador@jypesa.com', lat: 13.6745, lon: -89.2787 },
    { name: 'Cafi Belén', type: 'Distribuidores', location: 'Potrerillos, 400 m oeste y 25 m sur del Sol Naciente, bodegas 3 y 4, San Rafael de Alajuela 20108', country: 'Costa Rica', contact: 'ventascr@jypesa.com', lat: 10.0132, lon: -84.2116 },
    { name: 'Distribuidora M y G', type: 'Distribuidores', location: 'Edificio Plaza Real, local 10, entre 18 y 19 avenida, 2 calle, barrio Río de Piedras, San Pedro Sula, Cortés 21101', country: 'Honduras', contact: 'ventashonduras@jypesa.com', lat: 15.5050, lon: -88.0250 },
    { name: 'Rutacom', type: 'Distribuidores', location: 'Av. Portales 856, entre Av. Pando y Av. M. Urquidi, Ed. Hupermall, piso 8, oficina 7, Queru Queru, Cochabamba', country: 'Bolivia', contact: 'ventasbol@jypesa.com', lat: -17.3716, lon: -66.1432 },
    { name: 'Droguería', type: 'Distribuidores', location: 'Av. Emilio Cavenecia 151, interior 702, Miraflores, Lima', country: 'Perú', contact: 'ventasperu@jypesa.com', lat: -12.1111, lon: -77.0316 },
    { name: 'Onatextiles', type: 'Distribuidores', location: 'Naves del Canal Este, fase II, local 5, sector Friusa, Bávaro, La Altagracia', country: 'República Dominicana', contact: 'ventasrd@jypesa.com', lat: 18.6991, lon: -68.4358 },
    { name: 'DFL Importers', type: 'Distribuidores', location: '71 Molynes Road, Kingston 10', country: 'Jamaica', contact: 'salesjamaica@jypesa.com', lat: 18.0105, lon: -76.7990 },
    { name: 'Cosmoceutical Pharma', type: 'Distribuidores', location: 'La Niña E8-52 y Diego de Almagro, Edif. Royal Business, oficina 608, Quito', country: 'Ecuador', contact: 'ventasecuador@jypesa.com', lat: -0.1868, lon: -78.4826 },
    { name: 'World Target Supplies', type: 'Distribuidores', location: 'Urbanización Los Ángeles, calle 63, casa A-11, corregimiento de Betania, Panamá', country: 'Panamá', contact: 'ventaspanama@jypesa.com', lat: 9.0052, lon: -79.5348 },
    { name: 'Helios Colombia', type: 'Distribuidores', location: 'Calle 127 70G-78, oficina 411, Bogotá', country: 'Colombia', contact: 'ventascolombia@jypesa.com', lat: 4.7077, lon: -74.0711 },
    { name: 'Jypesa Chile', type: 'Distribuidores', location: 'Coyancura 2241, Providencia 7510151, Región Metropolitana', country: 'Chile', contact: 'ventaschile@jypesa.com', lat: -33.4197, lon: -70.6064 },
    { name: 'Galyfer', type: 'Distribuidores', location: 'Alicante 1740, Montevideo', country: 'Uruguay', contact: 'ventasuruguay@jypesa.com', lat: -34.8738, lon: -56.1667 },
    { name: 'Productos de Limpieza del Valle', type: 'Distribuidores', location: 'Melchor Ocampo 717, Oaxaca de Juárez', country: 'México', contact: 'https://www.facebook.com/naturyoaxaca', lat: 17.0654, lon: -96.7236 },
    { name: 'Insumos del Norte', type: 'Distribuidores', location: 'Manuel J. Clouthier 451-5, Ciudad Juárez', country: 'México', contact: 'https://insumosdelnorte.com/', lat: 31.6904, lon: -106.4245 },
    { name: 'Hotel Store Puerto Vallarta', type: 'Distribuidores', location: 'Av. Tepic Norte 473, Puerto Vallarta', country: 'México', lat: 20.6534, lon: -105.2253 },
    { name: 'Farmases', type: 'Distribuidores', location: 'Calle Cabrera 147, Monterrey', country: 'México', contact: 'https://www.farmases.com/', lat: 25.6866, lon: -100.3161 },
    { name: 'Oran Químicos e Insumos', type: 'Distribuidores', location: 'Amado Nervo 805-A, Tamaulipas', country: 'México', contact: 'https://www.distribucionesestrella.com/', lat: 23.7369, lon: -99.1411 },
    { name: 'Comercial Sanitaria', type: 'Distribuidores', location: 'Blvd. Luis Encinas s/n, entre Carbó y Ures, Col. Centro, Hermosillo, Sonora 83000', country: 'México', contact: 'https://www.comercialsanitaria.mx/', lat: 29.0729, lon: -110.9559 },
    { name: 'Insumos de la Limpieza e Higiene', type: 'Distribuidores', location: 'Circuito Bosques de la Trinidad 220, Plan de Ayala, Tuxtla Gutiérrez, Chiapas', country: 'México', contact: 'https://insumos.com.mx/', lat: 16.7516, lon: -93.1161 },
    { name: 'Equilimp', type: 'Distribuidores', location: 'Av. Peñuelas 21, interior 20B, San Pedrito Peñuelas, Querétaro', country: 'México', contact: 'https://equilimp.com.mx/', lat: 20.6139, lon: -100.3896 },
    { name: 'JOFA', type: 'Distribuidores', location: 'Calle F 2473, Mexicali; cobertura también en Tijuana', country: 'México', contact: 'https://jofa.com.mx/', lat: 32.6245, lon: -115.4523 },
    { name: 'Escencia Hotelera', type: 'Distribuidores', location: 'Calle Millet 19, departamento 13, Eucalipto Vallarta, Colima', country: 'México', lat: 19.2433, lon: -103.7250 },
    { name: 'Marquise Hospitality', type: 'Distribuidores', country: 'Texas, Estados Unidos', contact: 'www.marquisehospitality.com', lat: 31.0000, lon: -99.9018 },
    { name: 'Rutherford Supply', type: 'Distribuidores', country: 'Virginia, Estados Unidos', contact: 'https://rutherfordsupply.com/', lat: 37.4316, lon: -78.6569 },
    { name: 'Justice Packaging', type: 'Distribuidores', country: 'Georgia, Estados Unidos', contact: 'https://correctionsmarketplace.com/', lat: 32.1656, lon: -82.9001 },
    { name: 'Turnkey Options', type: 'Distribuidores', country: 'Virginia, Estados Unidos', contact: 'https://www.turnkeyoptionsllc.com/', lat: 37.5816, lon: -78.5069 },
    { name: 'Liberty Distribution', type: 'Distribuidores', country: 'West Virginia, Estados Unidos', contact: 'https://libertydistributors.com/', lat: 38.5976, lon: -80.4549 },
    { name: 'Bright Textiles', type: 'Distribuidores', location: '3542 E. T. C. Jester Blvd., Houston, Texas 77018', country: 'Estados Unidos', contact: 'https://www.facebook.com/brightextiles/', lat: 29.8196, lon: -95.4500 },
    { name: 'Paper Chemical', type: 'Distribuidores', country: 'Savannah, Georgia, Estados Unidos', contact: 'https://www.paperchemicalsupply.com/Web/', lat: 32.0809, lon: -81.0912 },
    { name: 'GARAU', type: 'Distribuidores', country: 'Palma de Mallorca, España', lat: 39.5696, lon: 2.6502 },
    { name: 'Tu Pack', type: 'Distribuidores', country: 'Barcelona, España', lat: 41.3874, lon: 2.1686 },
    { name: 'Packetalia', type: 'Distribuidores', country: 'Comunidad Valenciana, España', lat: 39.4699, lon: -0.3763 },
    { name: 'Eco One', type: 'Distribuidores', country: 'Madrid, España', lat: 40.4168, lon: -3.7038 },
    { name: 'Juan de Hoyos', type: 'Distribuidores', country: 'Colombia', contact: 'https://www.jdh.com.co/', lat: 4.5709, lon: -74.2973 },
    { name: 'Jypesa Oficinas Centrales', type: 'Oficinas', location: 'Av. Acueducto 2100, Colinas de San Javier, Guadalajara, Jalisco 45110', country: 'México', lat: 20.7027, lon: -103.3938 },
    { name: 'Jypesa North America', type: 'Oficinas', location: 'Ubicación aproximada', country: 'Texas, Estados Unidos', lat: 31.1000, lon: -99.8018 },
    { name: 'Jypesa Colombia', type: 'Oficinas', location: 'Ubicación aproximada en Bogotá', country: 'Colombia', lat: 4.7110, lon: -74.0721 },
    { name: 'Jypesa', type: 'Fábrica', location: 'Cernícalo 155, Guadalajara, Jalisco', country: 'México', lat: 20.6597, lon: -103.3496 },
  ];
  /* LOCATIONS_DATA_END */

  /* ==========================================================
     ESTILOS
     ========================================================== */
  const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Rubik:wght@300;400;500;600&display=swap');

.jypesa-cobertura-global-widget {
  --jypesa-cg-bg: #EEF7FA;
  --jypesa-cg-accent-office: #0089C1;
  --jypesa-cg-accent-factory: #4AA25D;
  --jypesa-cg-accent-associated: #FBB31F;
  --jypesa-cg-text-city: #506D85;
}

.jypesa-cobertura-global-widget,
.jypesa-cobertura-global-widget * {
  box-sizing: border-box;
}

.jypesa-cobertura-global-widget {
  background: var(--jypesa-cg-bg);
  font-family: 'Rubik', system-ui, sans-serif;
  color: #1a2e3f;
  width: 100%;
  overflow-x: hidden;
}

.jypesa-cg-header {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  opacity: 0;
  animation: jypesaCgFadeUp 0.7s ease forwards;
}

.jypesa-cg-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px; /* Exactos 50px en desktop */
  font-weight: 500;
  line-height: 1.15;
  color: #506D85;
  margin: 0;
  text-align: left;
}

.jypesa-cg-title-line {
  display: block;
  white-space: nowrap;
}

.jypesa-cg-subtitle {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 400;
  color: #506D85;
  max-width: 671px;
  line-height: 1.35;
  margin: 0;
  text-align: right;
}

@media (max-width: 991px) {
  .jypesa-cg-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 2rem 1.5rem 0;
  }
  .jypesa-cg-title {
    font-size: clamp(20px, 6.2vw, 42px); /* Escala responsiva en pantallas medianas y chicas */
  }
  .jypesa-cg-subtitle {
    max-width: 100%;
    text-align: left;
    font-size: 15px;
  }
}

.jypesa-cg-map-section {
  max-width: 1400px;
  margin: 1.2rem auto 0;
  padding: 0 2rem 3rem;
  position: relative;
  opacity: 0;
  animation: jypesaCgFadeUp 0.7s ease 0.15s forwards;
}

.jypesa-cg-map-wrapper {
  position: relative;
  background: var(--jypesa-cg-bg);
}

.jypesa-cg-world-map-svg {
  display: block;
  width: 100%;
  height: auto;
  background: var(--jypesa-cg-bg);
}

.jypesa-cg-overlay {
  position: absolute;
  bottom: 30px;
  left: 35px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  pointer-events: auto;
  padding: 12px 14px;
  background: rgba(238, 247, 250, 0.88);
  border-radius: 8px;
}

.jypesa-cg-overlay .jypesa-cg-cities { display: none; }

.jypesa-cg-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jypesa-cg-group-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.jypesa-cg-group-title-wrap {
  display: flex;
  align-items: center;
  gap: 7px;
}

.jypesa-cg-pin,
.jypesa-cg-mob-pin {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.jypesa-cg-group-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  line-height: 1;
}

.jypesa-cg-group-count {
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.jypesa-cg-cities {
  display: flex;
  gap: 28px;
}

.jypesa-cg-cities-col,
.jypesa-cg-cities-single {
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--jypesa-cg-text-city);
}

.jypesa-cg-bottom-row {
  display: flex;
  gap: 24px;
}

.jypesa-cg-group-bottom {
  gap: 3px;
}

.jypesa-cg-tooltip {
  position: fixed;
  display: flex;
  width: 337px;
  max-width: calc(100vw - 32px);
  padding: 14px 15px 40px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  font-family: 'Rubik', sans-serif;
  color: #1a2e3f;
  pointer-events: auto;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}

.jypesa-cg-tt-link {
  color: #0089C1;
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.jypesa-cg-tooltip.jypesa-cg-tooltip-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.jypesa-cg-tt-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  text-align: left;
}

.jypesa-cg-tt-title {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a2e3f;
}

.jypesa-cg-tt-category {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 13px;
}

.jypesa-cg-tt-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 13px;
  color: var(--jypesa-cg-text-city);
  line-height: 1.4;
}

.jypesa-cg-tt-pin-icon { width: 14px; height: 14px; flex-shrink: 0; margin-top: 1px; }

.jypesa-cg-mobile { display: none; }

.jypesa-cg-mob-group {
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(0,40,70,0.06);
}

.jypesa-cg-mob-group:last-child { border-bottom: none; }

.jypesa-cg-mob-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 0.5rem;
}

.jypesa-cg-mob-title-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
}

.jypesa-cg-mob-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  line-height: 1;
}

.jypesa-cg-mob-count {
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.jypesa-cg-mob-cities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 12px;
}

.jypesa-cg-mob-city {
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--jypesa-cg-text-city);
}

@keyframes jypesaCgFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .jypesa-cg-header { padding: 1.5rem 1.5rem 0; }
  .jypesa-cg-map-section { padding: 0 1.5rem 2.5rem; }
  .jypesa-cg-overlay { bottom: 14px; left: 14px; padding: 10px 12px 8px; gap: 10px; border-radius: 8px; }
  .jypesa-cg-group-title { font-size: 11px; }
  .jypesa-cg-group-count { font-size: 10px; }
  .jypesa-cg-pin { width: 14px; height: 14px; }
  .jypesa-cg-cities { gap: 12px; }
  .jypesa-cg-cities-col, .jypesa-cg-cities-single { font-size: 8.5px; line-height: 1.5; }
  .jypesa-cg-bottom-row { gap: 14px; }
  .jypesa-cg-group { gap: 3px; }
  .jypesa-cg-overlay { gap: 10px; }
}

@media (max-width: 768px) {
  .jypesa-cg-header { padding: 1.2rem 1rem 0; }
  .jypesa-cg-map-section { padding: 0 1rem 0; }
  .jypesa-cg-overlay { display: none; }
  .jypesa-cg-mobile {
    display: block;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
    background: var(--jypesa-cg-bg);
  }
  .jypesa-cg-mobile-inner {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 0.2rem 1rem 0.5rem;
    border: 1px solid rgba(255,255,255,0.7);
  }
  .jypesa-cg-tooltip { width: 280px; padding: 12px 14px 28px 14px; }
  .jypesa-cg-tt-title { font-size: 14px; }
  .jypesa-cg-tt-category { font-size: 12px; }
  .jypesa-cg-tt-row { font-size: 12px; }
}

@media (max-width: 480px) {
  .jypesa-cg-header { padding: 1rem 0.75rem 0; }
  .jypesa-cg-map-section { padding: 0 0.75rem 0; }
  .jypesa-cg-map-wrapper { border-radius: 8px; overflow: hidden; }
  .jypesa-cg-mobile { padding: 0 0.75rem 1.5rem; }
  .jypesa-cg-mobile-inner { padding: 0.15rem 0.75rem 0.4rem; border-radius: 10px; }
  .jypesa-cg-mob-title { font-size: 13px; }
  .jypesa-cg-mob-count { font-size: 11px; }
  .jypesa-cg-mob-cities { grid-template-columns: 1fr; gap: 0; }
  .jypesa-cg-mob-city { font-size: 10.5px; }
  .jypesa-cg-mob-group { padding: 0.7rem 0; }
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  /* ==========================================================
     ICONO DE PIN (reutilizado en overlay, lista móvil, tooltip
     y marcadores del mapa — mismo diseño en todos lados)
     ========================================================== */
  function pinIconInner(color, maskId) {
    return `<mask id="${maskId}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1" y="-1" width="29" height="29"><rect x="-0.738" y="-0.604" width="28.207" height="28.207" fill="#D9D9D9"/></mask>
      <g mask="url(#${maskId})"><path d="M10.355 21.802c-.687-.249-1.335-.56-1.945-.933a9.1 9.1 0 0 1-1.685-1.33c-.909-.909-1.59-1.935-2.045-3.079-.454-1.144-.681-2.308-.681-3.49 0-1.182.227-2.345.681-3.489.455-1.144 1.136-2.17 2.044-3.079A8.9 8.9 0 0 1 9.803 4.356C10.947 3.902 12.111 3.674 13.293 3.674s2.346.228 3.49.682 2.17 1.136 3.079 2.045 1.58 1.935 2.045 3.079c.454 1.144.681 2.307.681 3.49 0 1.182-.227 2.345-.681 3.489-.454 1.144-1.136 2.17-2.045 3.079a9.1 9.1 0 0 1-1.685 1.33c-.61.373-1.258.684-1.945.933L14.07 25.757c-.165.309-.423.463-.775.463s-.611-.154-.776-.463L10.355 21.802Zm2.939 2.3L14.85 21.232a3.5 3.5 0 0 0 .434-.551c.165-.151.366-.267.603-.348a8.5 8.5 0 0 0 3.573-2.832c1.544-1.544 2.317-3.388 2.317-5.532 0-2.144-.773-3.988-2.317-5.532-1.544-1.544-3.388-2.316-5.532-2.316-2.144 0-3.988.772-5.532 2.316-1.544 1.544-2.316 3.988-2.316 5.532 0 2.144.772 3.988 2.316 5.532.415.415.87.778 1.366 1.089.496.311 1.02.559 1.573.743.231.069.434.183.609.342.175.159.318.345.429.557l1.556 2.87Z" fill="${color}"/></g>
      <path d="M13.5 3.447C8.265 3.447 4.021 7.691 4.021 12.926s4.244 9.479 9.479 9.479 9.479-4.244 9.479-9.479S18.735 3.447 13.5 3.447Zm3.519 3.204c.276.156.546.333.803.527l.127.096-4.031 10.585-.037.008s-.095.02-.3.02-.516-.017-.977-.085l-.088-.013 4.288-11.258.215.12Zm-5.679 7.476-2.598-3.444h1.678l2.618 3.444h-1.698Zm7.247 3.886c-1.358 1.358-3.164 2.106-5.087 2.106s-3.727-.748-5.086-2.106c-1.358-1.358-2.106-3.165-2.106-5.086 0-1.921.748-3.727 2.106-5.087 1.358-1.358 3.166-2.106 5.086-2.106.6 0 1.365.11 2.044.295l.078.022-.525 1.24-.059-.016c-.498-.136-1.016-.204-1.538-.204-3.229 0-5.856 2.627-5.856 5.856 0 3.229 2.627 5.856 5.856 5.856s5.856-2.627 5.856-5.856c0-1.252-.39-2.447-1.129-3.456l-.025-.034.658-1.342.24.32c1.041 1.287 1.591 2.847 1.591 4.513 0 1.921-.748 3.727-2.106 5.087Z" fill="${color}"/>`;
  }

  function pinSvg(color, maskId, cls) {
    return `<svg class="${cls}" width="16" height="16" viewBox="0 0 27 27" fill="none">${pinIconInner(color, maskId)}</svg>`;
  }

  /* Proporciones del ícono (viewBox 27x27): centro del círculo superior
     y su radio, usados para anclar el pulso/badge de los marcadores. */
  const PIN_HEAD_OFFSET_RATIO = 1 - 12.926 / 27;
  const PIN_HEAD_RADIUS_RATIO = 9.479 / 27;

  /* ==========================================================
     MARKUP DEL WIDGET
     ========================================================== */
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char];
    });
  }

  function groupLocations(groupName) {
    return LOCATIONS.filter(function (location) { return location.type === groupName; });
  }

  function listLabel(location) {
    return location.name + (location.country ? ', ' + location.country : '');
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
  }

  function contactHref(value) {
    if (isEmail(value)) return 'mailto:' + value;
    return /^https?:\/\//i.test(value) ? value : 'https://' + value;
  }

  function tooltipRow(label, value) {
    if (!value) return '';
    return `<div class="jypesa-cg-tt-row"><strong>${escapeHtml(label)}:</strong><span>${escapeHtml(value)}</span></div>`;
  }

  /* ==========================================================
     DICCIONARIO BILINGÜE
     ========================================================== */
  const staticTextsByLang = {
    es: {
      titleLine1: 'Cobertura estratégica',
      titleLine2: 'y distribución eficiente',
      subtitle: 'Integramos producción, operación y distribución para asegurar cobertura, rapidez y consistencia en cada entrega, donde sea que nos necesites.',
      groups: {
        Distribuidores: 'Distribuidores',
        Oficinas: 'Oficinas',
        'Fábrica': 'Fábrica'
      },
      tooltip: {
        location: 'Ubicación',
        country: 'País / región',
        contact: 'Contacto'
      }
    },
    en: {
      titleLine1: 'Strategic Coverage and',
      titleLine2: 'Efficient Distribution',
      subtitle: 'We integrate production, operation, and distribution to ensure coverage, speed, and consistency in every delivery, wherever you need us.',
      groups: {
        Distribuidores: 'Distributors',
        Oficinas: 'Offices',
        'Fábrica': 'Factory'
      },
      tooltip: {
        location: 'Location',
        country: 'Country / region',
        contact: 'Contact'
      }
    }
  };

  function buildDesktopGroups(texts) {
    return GROUP_PRIORITY.map(function (groupName, groupIndex) {
      const group = GROUPS[groupName];
      const locations = groupLocations(groupName);
      const midpoint = Math.ceil(locations.length / 2);
      const columns = locations.length > 8 ? [locations.slice(0, midpoint), locations.slice(midpoint)] : [locations];
      const displayGroupName = (texts && texts.groups && texts.groups[groupName]) ? texts.groups[groupName] : groupName;
      return `
        <div class="jypesa-cg-group${groupIndex ? ' jypesa-cg-group-bottom' : ''}">
          <div class="jypesa-cg-group-header">
            <div class="jypesa-cg-group-title-wrap">
              ${pinSvg(group.color, 'jypesa-cg-mask-group-' + groupIndex, 'jypesa-cg-pin')}
              <span class="jypesa-cg-group-title" style="color: ${group.color};">${escapeHtml(displayGroupName)}</span>
            </div>
            <span class="jypesa-cg-group-count" style="color: ${group.color};">${locations.length}</span>
          </div>
          <div class="jypesa-cg-cities">
            ${columns.map(function (column) {
              return `<div class="jypesa-cg-cities-col">${column.map(function (location) {
                return escapeHtml(listLabel(location));
              }).join('<br>')}</div>`;
            }).join('')}
          </div>
        </div>`;
    }).join('');
  }

  function buildMobileGroups(texts) {
    return GROUP_PRIORITY.map(function (groupName, groupIndex) {
      const group = GROUPS[groupName];
      const locations = groupLocations(groupName);
      const displayGroupName = (texts && texts.groups && texts.groups[groupName]) ? texts.groups[groupName] : groupName;
      return `
        <div class="jypesa-cg-mob-group">
          <div class="jypesa-cg-mob-header">
            <div class="jypesa-cg-mob-title-wrap">
              ${pinSvg(group.color, 'jypesa-cg-mask-mobile-' + groupIndex, 'jypesa-cg-mob-pin')}
              <span class="jypesa-cg-mob-title" style="color: ${group.color};">${escapeHtml(displayGroupName)}</span>
            </div>
            <span class="jypesa-cg-mob-count" style="color: ${group.color};">${locations.length}</span>
          </div>
          <div class="jypesa-cg-mob-cities">
            ${locations.map(function (location) {
              return `<span class="jypesa-cg-mob-city">${escapeHtml(listLabel(location))}</span>`;
            }).join('')}
          </div>
        </div>`;
    }).join('');
  }

  function buildWidgetHtml(texts) {
    return `
<div class="jypesa-cg-header">
  <h1 class="jypesa-cg-title">
    <span class="jypesa-cg-title-line">${texts.titleLine1}</span>
    <span class="jypesa-cg-title-line">${texts.titleLine2}</span>
  </h1>
  <p class="jypesa-cg-subtitle">${texts.subtitle}</p>
</div>

<div class="jypesa-cg-map-section">
  <div class="jypesa-cg-map-wrapper">
    <svg class="jypesa-cg-world-map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet"></svg>

    <div class="jypesa-cg-overlay">${buildDesktopGroups(texts)}</div>
  </div>
</div>

<div class="jypesa-cg-mobile">
  <div class="jypesa-cg-mobile-inner">${buildMobileGroups(texts)}</div>
</div>
`;
  }

  /* ==========================================================
     CARGA DINÁMICA DE D3 + TOPOJSON
     ========================================================== */
  function loadScriptOnce(src, marker, callback) {
    if (window[marker]) { callback(); return; }
    let script = document.querySelector(`script[data-jypesa-cg="${marker}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.setAttribute('data-jypesa-cg', marker);
      document.head.appendChild(script);
    }
    script.addEventListener('load', callback, { once: true });
    if (window[marker]) callback();
  }

  function loadMapLibs(callback) {
    if (window.d3 && window.topojson) { callback(); return; }
    loadScriptOnce('https://d3js.org/d3.v7.min.js', 'd3', function () {
      loadScriptOnce('https://cdn.jsdelivr.net/npm/topojson@3.0.2/dist/topojson.min.js', 'topojson', callback);
    });
  }

  /* ==========================================================
     RENDER DEL MAPA
     ========================================================== */
  function renderMap(target, texts) {
    const coordinateCounts = new Map();
    const markers = LOCATIONS.map(function (location) {
      const key = location.lat.toFixed(4) + ',' + location.lon.toFixed(4);
      const occurrence = coordinateCounts.get(key) || 0;
      coordinateCounts.set(key, occurrence + 1);
      const angle = occurrence * 2.39996;
      const radius = occurrence ? 0.35 + occurrence * 0.12 : 0;
      return Object.assign({}, location, {
        lat: location.lat + Math.sin(angle) * radius,
        lon: location.lon + Math.cos(angle) * radius,
        color: GROUPS[location.type].color,
      });
    });

    const W = 1000, H = 500;
    const projection = d3.geoNaturalEarth1().scale(170).translate([W / 2, H / 2 + 10]);
    const pathGen = d3.geoPath().projection(projection);
    const svgEl = target.querySelector('.jypesa-cg-world-map-svg');
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const glow = defs.append('filter').attr('id', 'jypesa-cg-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    glow.append('feGaussianBlur').attr('stdDeviation', '3.5').attr('result', 'b');
    glow.append('feMerge').selectAll('feMergeNode').data(['b', 'SourceGraphic']).enter().append('feMergeNode').attr('in', function (d) { return d; });

    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#EEF7FA');

    const mapG = svg.append('g');

    let tt = document.querySelector('.jypesa-cg-tooltip');
    if (!tt) {
      tt = document.createElement('div');
      tt.className = 'jypesa-cg-tooltip';
      document.body.appendChild(tt);
    }

    let hideTimer;

    function showTT(ev, m) {
      window.clearTimeout(hideTimer);
      const displayType = (texts && texts.groups && texts.groups[m.type]) ? texts.groups[m.type] : m.type;
      const contactLabel = texts ? texts.tooltip.contact : 'Contacto';
      const locationLabel = texts ? texts.tooltip.location : 'Ubicación';
      const countryLabel = texts ? texts.tooltip.country : 'País / región';

      const contact = m.contact
        ? `<div class="jypesa-cg-tt-row"><strong>${escapeHtml(contactLabel)}:</strong><a class="jypesa-cg-tt-link" href="${escapeHtml(contactHref(m.contact))}" target="${isEmail(m.contact) ? '_self' : '_blank'}" rel="noopener noreferrer">${escapeHtml(m.contact)}</a></div>`
        : '';
      tt.innerHTML = `
        <div class="jypesa-cg-tt-inner">
          <div class="jypesa-cg-tt-title">${escapeHtml(m.name)}</div>
          <div class="jypesa-cg-tt-category" style="color: ${m.color};">${escapeHtml(displayType)}</div>
          ${tooltipRow(locationLabel, m.location)}
          ${tooltipRow(countryLabel, m.country)}
          ${contact}
        </div>
      `;
      posTT(ev);
      tt.classList.add('jypesa-cg-tooltip-visible');
    }

    function posTT(ev) {
      let x = ev.clientX + 14, y = ev.clientY - 16;
      const tw = tt.offsetWidth, th = tt.offsetHeight;
      if (x + tw > window.innerWidth - 10) x = ev.clientX - tw - 14;
      if (y + th > window.innerHeight - 10) y = window.innerHeight - th - 10;
      if (y < 10) y = 10;
      tt.style.left = x + 'px';
      tt.style.top = y + 'px';
    }

    function hideTT() { tt.classList.remove('jypesa-cg-tooltip-visible'); }
    function scheduleHideTT() { hideTimer = window.setTimeout(hideTT, 180); }
    tt.addEventListener('mouseenter', function () { window.clearTimeout(hideTimer); });
    tt.addEventListener('mouseleave', scheduleHideTT);

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json').then(function (wd) {
      const countries = topojson.feature(wd, wd.objects.countries);
      const filtered = {
        type: 'FeatureCollection',
        features: countries.features.filter(function (f) {
          const n = f.properties && f.properties.name;
          return !(n && n.toLowerCase().indexOf('antarctica') !== -1);
        }),
      };

      mapG.selectAll('.jypesa-cg-country').data(filtered.features).enter().append('path')
        .attr('class', 'jypesa-cg-country')
        .attr('d', function (d) { return pathGen(d); })
        .attr('fill', '#7BAAC4')
        .attr('stroke', '#5E97B5')
        .attr('stroke-width', 0.4)
        .attr('stroke-linejoin', 'round');

      mapG.append('path').datum(d3.geoGraticule().step([20, 20]))
        .attr('d', pathGen)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.07)')
        .attr('stroke-width', 0.4);

      const mg = svg.append('g');
      const PIN_SIZE = 20;
      const headY = -PIN_SIZE * PIN_HEAD_OFFSET_RATIO;
      const headR = PIN_SIZE * PIN_HEAD_RADIUS_RATIO;

      markers.forEach(function (m, i) {
        const coords = projection([m.lon, m.lat]);
        if (!coords || isNaN(coords[0])) return;

        const maskId = 'jypesa-cg-mask-marker-' + i;

        const g = mg.append('g')
          .attr('class', 'jypesa-cg-marker')
          .attr('transform', 'translate(' + coords[0] + ',' + coords[1] + ')')
          .style('cursor', 'pointer');

        g.append('circle')
          .attr('class', 'jypesa-cg-hit-area')
          .attr('cx', 0).attr('cy', headY).attr('r', PIN_SIZE * 0.62)
          .attr('fill', 'transparent');

        g.append('circle')
          .attr('class', 'jypesa-cg-pulse-ring')
          .attr('cx', 0).attr('cy', headY).attr('r', headR)
          .attr('fill', 'none').attr('stroke', m.color).attr('stroke-width', 1).attr('opacity', 0);

        const iconG = g.append('g').attr('class', 'jypesa-cg-pin-icon');

        iconG.append('svg')
          .attr('x', -PIN_SIZE / 2).attr('y', -PIN_SIZE)
          .attr('width', PIN_SIZE).attr('height', PIN_SIZE)
          .attr('viewBox', '0 0 27 27')
          .html(pinIconInner(m.color, maskId));

        function handleEnter(ev) {
          showTT(ev, m);
          iconG.transition().duration(160).attr('transform', 'scale(1.35)').attr('filter', 'url(#jypesa-cg-glow)');
          g.select('.jypesa-cg-pulse-ring').transition().duration(160).attr('r', headR * 1.5).attr('opacity', 0.35);
        }

        g.on('mouseenter', handleEnter);
        g.on('mousemove', function (ev) { posTT(ev); });
        g.on('mouseleave', function () {
          scheduleHideTT();
          iconG.transition().duration(180).attr('transform', 'scale(1)').attr('filter', null);
          g.select('.jypesa-cg-pulse-ring').transition().duration(180).attr('r', headR).attr('opacity', 0);
        });

        g.on('touchstart', function (ev) {
          ev.preventDefault();
          const touch = ev.touches[0];
          handleEnter({ clientX: touch.clientX, clientY: touch.clientY });
        });

        g.attr('opacity', 0).transition().delay(300 + i * 55).duration(450).attr('opacity', 1);
      });
    }).catch(function (err) { console.error('[jypesa-cobertura-global] error cargando mapa:', err); });

    window.addEventListener('scroll', hideTT);
    window.addEventListener('resize', hideTT);
    document.addEventListener('touchstart', function (ev) {
      if (!ev.target.closest('.jypesa-cg-marker') && !ev.target.closest('.jypesa-cg-tooltip')) {
        hideTT();
      }
    });
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function initCoberturaGlobalWidget() {
    const targets = document.querySelectorAll(
      '#jypesa-cobertura-global-widget, [data-jypesa-cobertura-global-widget], .jypesa-cobertura-global-widget, .jypesa-cobertura-global-widget-container'
    );
    if (!targets.length) return;

    targets.forEach(function (target) {
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

      target.classList.add('jypesa-cobertura-global-widget');
      const texts = staticTextsByLang[lang] || staticTextsByLang.es;
      target.innerHTML = buildWidgetHtml(texts);

      loadMapLibs(function () { renderMap(target, texts); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoberturaGlobalWidget);
  } else {
    initCoberturaGlobalWidget();
  }
})();
