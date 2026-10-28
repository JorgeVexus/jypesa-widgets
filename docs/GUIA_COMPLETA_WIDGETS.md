# Manual Completo de Widgets Webflow — JYPESA
> **Guía técnica y de edición para el cliente**  
> *Versión actualizada: Octubre 2026*

Este documento contiene la guía completa para entender, insertar y editar todos los widgets interactivos desarrollados para el ecosistema web de **JYPESA** (tanto para el sitio en español `jypesa.com` como para el sitio en inglés `jypesausa.com`).

---

## Índice General

1. [Arquitectura y Conceptos Clave](#1-arquitectura-y-conceptos-clave)
   - [¿Dónde se alojan los widgets?](#dónde-se-alojan-los-widgets)
   - [Cómo se inserta un widget en Webflow](#cómo-se-inserta-un-widget-en-webflow)
   - [Sistema bilingüe (Español / Inglés)](#sistema-bilingüe-español--inglés)
   - [Widgets estáticos vs. Widgets conectados al CMS](#widgets-estáticos-vs-widgets-conectados-al-cms)
   - [Cómo probarlos en tu computadora localmente](#cómo-probarlos-en-tu-computadora-localmente)
2. [Estructura del Repositorio](#2-estructura-del-repositorio)
3. [Guía Detallada Widget por Widget](#3-guía-detallada-widget-por-widget)
   - [01. Navegación Principal (Mega Menú Navbar)](#01-navegación-principal-mega-menú-navbar)
   - [02. Detector de Idioma y Redirección (Head Script)](#02-detector-de-idioma-y-redirección-head-script)
   - [03. Hero Interactivo con KPIs (Página Nosotros)](#03-hero-interactivo-con-kpis-página-nosotros)
   - [04. Hero Soluciones (Desarrollo Personalizado)](#04-hero-soluciones-desarrollo-personalizado)
   - [05. Carrusel Infinito de Marcas (Partners Marquee)](#05-carrusel-infinito-de-marcas-partners-marquee)
   - [06. Catálogo de Colecciones en Pestañas (Tabs Colecciones Productos)](#06-catálogo-de-colecciones-en-pestañas-tabs-colecciones-productos)
   - [07. Pestañas de Hotelería por Segmento (Hotelería Tabs)](#07-pestañas-de-hotelería-por-segmento-hotelería-tabs)
   - [08. Sistemas de Dispensación (Scroll Split)](#08-sistemas-de-dispensación-scroll-split)
   - [09. Sistemas de Dispensación Comparativa (Catálogo de Dispensadores)](#09-sistemas-de-dispensación-comparativa-catálogo-de-dispensadores)
   - [10. Deslizador Vertical de Sustentabilidad (Scroll Vertical Fijo)](#10-deslizador-vertical-de-sustentabilidad-scroll-vertical-fijo)
   - [11. Sustentabilidad e Innovación Aplicada (Bloque Comparativo 2 Fases)](#11-sustentabilidad-e-innovación-aplicada-bloque-comparativo-2-fases)
   - [12. Beneficios Persea (Dial Circular Interactivo)](#12-beneficios-persea-dial-circular-interactivo)
   - [13. Cobertura Global (Mapa Mundial Interactivo SVG)](#13-cobertura-global-mapa-mundial-interactivo-svg)
   - [14. Presencia Internacional (Mapa Leaflet con Búsqueda y Filtros)](#14-presencia-internacional-mapa-leaflet-con-búsqueda-y-filtros)
   - [15. Línea de Tiempo Histórica (Timeline Jypesa)](#15-línea-de-tiempo-histórica-timeline-jypesa)
   - [16. Tarjetas de Capacidades / Líneas de Negocio (Cards)](#16-tarjetas-de-capacidades--líneas-de-negocio-cards)
   - [17. Proceso de Producción (De la Idea a la Producción)](#17-proceso-de-producción-de-la-idea-a-la-producción)
   - [18. Carrusel de Certificaciones (Slider Certificaciones)](#18-carrusel-de-certificaciones-slider-certificaciones)
   - [19. Carrusel de Colecciones Recomendadas (Sliders de Colección)](#19-carrusel-de-colecciones-recomendadas-sliders-de-colección)
   - [20. Selector Múltiple para Formulario de Contacto (Multi-Select)](#20-selector-múltiple-para-formulario-de-contacto-multi-select)
4. [Buenas Prácticas y Resolución de Problemas](#4-buenas-prácticas-y-resolución-de-problemas)

---

## 1. Arquitectura y Conceptos Clave

### Dónde se alojan los widgets
Todos los archivos JavaScript, CSS e imágenes del proyecto están sincronizados y alojados en **Vercel** en el siguiente dominio base:
```
https://jypesa-widgets.vercel.app/widgets/[NOMBRE-DEL-WIDGET]/[ARCHIVO]
```
Cuando realizas cambios en el repositorio y los subes a la rama principal (`main`), Vercel actualiza automáticamente los scripts en vivo sin necesidad de cambiar los códigos dentro de Webflow.

### Cómo se inserta un widget en Webflow
La integración en cualquier página de Webflow sigue la regla de **2 elementos**:
1. Un contenedor HTML (un `<div>` con un atributo `id`, `class` o `data-jypesa-...`) colocado dentro de un elemento **Embed** en la página.
2. Una etiqueta `<script>` que llama al archivo JavaScript del widget alojado en el servidor Vercel.

**Ejemplo representativo:**
```html
<!-- 1. Contenedor donde se dibuja el widget -->
<div data-jypesa-partners-marquee-widget></div>

<!-- 2. Script que carga la lógica y los estilos -->
<script src="https://jypesa-widgets.vercel.app/widgets/partners-marquee/partners-marquee.js"></script>
```

### Sistema bilingüe (Español / Inglés)
Los widgets de JYPESA cuentan con soporte bilingüe nativo. Para determinar en qué idioma mostrarse, el widget aplica la siguiente prioridad automática:
1. **Atributo explícito en el Embed**: Si el contenedor tiene `data-lang="en"` se muestra en inglés; si tiene `data-lang="es"` se muestra en español.
2. **Dominio del sitio web**: Si el visitante se encuentra en `jypesausa.com` o la URL empieza con `/en`, el widget detecta inglés automáticamente.
3. **Etiqueta HTML de la página**: Si la página tiene `<html lang="en">`, se activa el inglés.
4. **Por defecto**: Si ninguna de las anteriores se cumple, se muestra en **Español** (`es`).

> 💡 **Consejo:** En las páginas en inglés de Webflow, puedes forzar el idioma en cualquier widget agregando el atributo `data-lang="en"` en su contenedor HTML.

### Widgets estáticos vs. Widgets conectados al CMS
- **Widgets Estáticos Autónomos**: Contienen sus textos, imágenes y enlaces programados directamente dentro del archivo JavaScript. Son ultrarrápidos, no dependen de colecciones de Webflow y se editan modificando los textos del archivo `.js`.
- **Widgets Dinámicos con CMS**: Leen automáticamente datos de una **Collection List** de Webflow que se coloca oculta en la página (`display: none;`). Permiten que el cliente cambie fotos, nombres y descripciones directamente desde el administrador de Webflow sin tocar código.

### Cómo probarlos en tu computadora localmente
Para revisar o editar los widgets en tu computadora antes de publicarlos:
1. Abre una terminal en la carpeta raíz del proyecto.
2. Ejecuta:
   ```bash
   node server.cjs
   ```
3. Abre tu navegador en `http://localhost:3000/hero.html` o en la ruta de cualquiera de los archivos de prueba (por ejemplo `http://localhost:3000/widgets/navegacion-principal/preview.html`).

---

## 2. Estructura del Repositorio

La carpeta principal donde vive todo el código de los widgets es **`/widgets/`**:

```text
jypesa-widgets/
│
├── widgets/                             ← CARPETA PRINCIPAL DE WIDGETS
│   ├── assets/                          ← Imágenes y recursos estáticos
│   ├── beneficios-persea/               ← Widget de beneficios persea
│   ├── cards/                           ← Widget de tarjetas de capacidades
│   ├── cobertura-global/                ← Mapa SVG mundial de cobertura
│   ├── colecciones/                     ← Sliders de colecciones
│   ├── colecciones-canal-comercial/     ← Variante Canal Comercial
│   ├── colecciones-empresarial/         ← Variante Empresarial
│   ├── colecciones-hospitalidad-avanzada/ ← Variante Hospitalidad
│   ├── colecciones-hoteleria/           ← Variante Hotelería
│   ├── colecciones-institucional/       ← Variante Institucional
│   ├── colecciones-tabs/                ← Catálogo en tabs clásico
│   ├── contacto-multiselect/            ← Dropdown multi-selección
│   ├── hero-interactive/                ← Hero Nosotros con KPIs
│   ├── hero-soluciones/                 ← Hero Desarrollo Personalizado
│   ├── hoteleria-tabs/                  ← Pestañas por segmento hotelero
│   ├── language-detector/               ← Redirección inteligente ES/EN
│   ├── navegacion-principal/            ← Mega menú navbar responsive
│   ├── partners-marquee/                ← Carrusel continuo de logos
│   ├── presencia-internacional/         ← Mapa Leaflet con buscador
│   ├── proceso/                         ← Línea de proceso 8 pasos
│   ├── sistemas-dispensacion/           ← Scroll Split dispensadores
│   ├── sistemas-dispensacion-comparativa/ ← Catálogo y fichas técnicas
│   ├── slider-certificaciones/          ← Carrusel de sellos y normas
│   ├── slider-coleccion-productos/      ← Carrusel de productos por marca
│   ├── slider-scroll-vertical/          ← Sustentabilidad con scroll fijo
│   ├── sustentabilidad/                 ← Bloque de I+D y empaque
│   ├── tabs-colecciones-productos/      ← Catálogo principal con notas olfativas
│   ├── tabs-colecciones-productos-variantes/ ← Catálogo con selector de familias
│   └── timeline/                        ← Línea de tiempo histórica
│
├── tests/                               ← Pruebas unitarias automatizadas
├── changelogs/                          ← Registro de cambios por fecha
├── server.cjs                           ← Servidor local para pruebas
└── vercel.json                          ← Configuración de CORS y headers Vercel
```

---

## 3. Guía Detallada Widget por Widget

---

### 01. Navegación Principal (Mega Menú Navbar)

* **¿Dónde se usa?** En la cabecera (Header) de todas las páginas del sitio web.
* **Archivos en el repositorio:**
  - `widgets/navegacion-principal/navegacion-principal.js` (Lógica, estructura y estilos integrados)
  - `widgets/navegacion-principal/preview.html` (Vista previa local con alternador ES / EN)

#### Código Embed para Webflow
Inserta un bloque de **Embed HTML** en el símbolo global de navegación de Webflow:

```html
<!-- Contenedor del Navbar -->
<div id="jypesa-nav-principal-widget" data-lang="es"></div>

<!-- Script en Vercel -->
<script src="https://jypesa-widgets.vercel.app/widgets/navegacion-principal/navegacion-principal.js"></script>
```

#### Atributos opcionales
| Atributo | Valores | Efecto |
| :--- | :--- | :--- |
| `data-lang` | `"es"` o `"en"` | Fuerza el idioma del menú, textos y enlaces. |
| `data-theme` o `data-color` | `"white"` o `"light"` | Aplica fondo blanco fijo desde el inicio (útil en páginas con fondos claros donde el texto blanco no se leería). |

#### Cómo editarlo
Abre `widgets/navegacion-principal/navegacion-principal.js`:
- **Menú de navegación y enlaces:** Alrededor de las líneas 1300 a 1450 encontrarás los arreglos de enlaces (`menuItems`) para escritorio y móvil.
- **Botón Smart Order (Español):** Enlaza a `https://sm.jypesa.com/jypesa/public/login`.
- **Botón Shop (Inglés):** Enlaza a `https://shop.jypesausa.com`.

---

### 02. Detector de Idioma y Redirección (Head Script)

* **¿Dónde se usa?** En la configuración global de Webflow: **Site Settings > Custom Code > Head Code**.
* **Archivos en el repositorio:**
  - `widgets/language-detector/language-detector.html`

#### Código Embed para Webflow
Pega el código completo dentro del `<head>` de Webflow:

```html
<script>
(function () {
  'use strict';
  // Excluye crawlers de Google, Bing, Facebook para no dañar el SEO
  var botPattern = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot/i;
  if (botPattern.test(navigator.userAgent)) return;

  var pathname = window.location.pathname.replace(/\/$/, '') || '/';
  var search = window.location.search;
  var hash = window.location.hash;

  // Guarda preferencia si la URL tiene ?lang=en o ?lang=es
  var urlParams = new URLSearchParams(search);
  var queryLang = urlParams.get('lang');
  if (queryLang === 'en' || queryLang === 'es') {
    try { localStorage.setItem('jypesa_lang', queryLang); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem('jypesa_lang'); } catch (e) {}

  var targetLang = savedLang;
  if (!targetLang) {
    var rawLanguages = navigator.languages || [navigator.language || 'es'];
    var isEnglish = false;
    for (var i = 0; i < rawLanguages.length; i++) {
      if ((rawLanguages[i] || '').toLowerCase().startsWith('en')) { isEnglish = true; break; }
      if ((rawLanguages[i] || '').toLowerCase().startsWith('es')) { isEnglish = false; break; }
    }
    targetLang = isEnglish ? 'en' : 'es';
  }

  var isOnUsaSite = window.location.hostname.toLowerCase().indexOf('jypesausa.com') !== -1;
  if (targetLang === 'en' && !isOnUsaSite) {
    var USA_ORIGIN = 'https://jypesausa.com';
    // Mapeo inteligente de rutas:
    var routes = {
      '/': '/', '/inicio': '/',
      '/nosotros': '/about-us',
      '/contacto': '/contact',
      '/desarollo-personalizado': '/custom-development',
      '/sustentabilidad': '/sustainability',
      '/sistemas-de-dispensacion': '/dispensing-systems',
      '/accesorios': '/accessories',
      '/soluciones': '/solutions'
    };
    var dest = routes[pathname] ? (USA_ORIGIN + routes[pathname]) : (USA_ORIGIN + pathname);
    window.location.replace(dest + search + hash);
  }
})();
</script>
```

#### Cómo editarlo
Para agregar nuevas páginas traducidas, simplemente agrega la equivalencia en el objeto de rutas (por ejemplo: `'/nueva-pagina': '/new-page'`).

---

### 03. Hero Interactivo con KPIs (Página Nosotros)

* **¿Dónde se usa?** En la parte superior de la página **Nosotros** (`/nosotros` y `/about-us`).
* **Archivos en el repositorio:**
  - `widgets/hero-interactive/hero-widget.js`
  - `widgets/hero-interactive/hero-widget.css`

#### Código Embed para Webflow
```html
<div id="jypesa-hero-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/hero-interactive/hero-widget.js"></script>
```

#### Cómo editarlo
Abre `widgets/hero-interactive/hero-widget.js`:
- Alrededor de la línea 475 se encuentra el diccionario `heroTexts`:
  ```javascript
  es: {
    kpis: [
      { num: '+50', suffix: 'años', heading: 'De experiencia en hospitalidad', desc: '...' },
      { num: '+21', suffix: 'países', heading: 'Con presencia internacional', desc: '...' },
      { num: '7,000', suffix: 'm²', heading: 'De infraestructura operativa', desc: '...' },
      { num: '3', suffix: 'continentes', heading: 'Alcance global', desc: '...' }
    ]
  }
  ```
- Puedes cambiar los números, sufijos y textos descriptivos en español e inglés directamente en ese archivo.

---

### 04. Hero Soluciones (Desarrollo Personalizado)

* **¿Dónde se usa?** En la cabecera de la página **Desarrollo Personalizado** (`/desarollo-personalizado` y `/custom-development`).
* **Archivos en el repositorio:**
  - `widgets/hero-soluciones/hero-soluciones.js`
  - `widgets/hero-soluciones/README.md`
  - `widgets/hero-soluciones/preview.html`

#### Código Embed para Webflow
```html
<!-- Contenedor del Hero de Soluciones -->
<div id="jypesa-hero-soluciones-widget" data-lang="es"></div>

<!-- Script del Widget -->
<script src="https://jypesa-widgets.vercel.app/widgets/hero-soluciones/hero-soluciones.js"></script>
```

#### Conexión con CMS (Opcional)
Para alimentar el carrusel de logos inferior con Webflow CMS, crea una lista de colección oculta (`display: none;`) con la clase principal `.jypesa-partners-marquee-cms-source`. Si no se añade, el widget usará automáticamente los 17 logotipos integrados de respaldo.

---

### 05. Carrusel Infinito de Marcas (Partners Marquee)

* **¿Dónde se usa?** En el Home, en el Footer o en páginas de producto para mostrar marcas y clientes aliados.
* **Archivos en el repositorio:**
  - `widgets/partners-marquee/partners-marquee.js`
  - `widgets/partners-marquee/README.md`

#### Código Embed para Webflow
```html
<!-- Contenedor del Carrusel Infinito -->
<div class="jypesa-partners-marquee-widget" data-duration="35s"></div>

<!-- Script en Vercel (Cargar una sola vez en la página) -->
<script src="https://jypesa-widgets.vercel.app/widgets/partners-marquee/partners-marquee.js"></script>
```

#### Integración con CMS de Webflow
1. Crea una colección llamada **Logos de Socios** con los campos:
   - `Name` (Texto)
   - `Logo` (Imagen)
2. En la página, agrega una **Collection List** conectada a esa colección.
3. Asígnale la clase CSS **`.jypesa-partners-marquee-cms-source`** al contenedor y ponle estilo `display: none;`.
4. A la etiqueta de imagen interna asigna la clase **`.jypesa-partners-marquee-cms-img`**.

> 💡 **Autoreplicación inteligente:** Si subes pocos logos (por ejemplo 5 o 8), el script los multiplica automáticamente para que en pantallas anchas (Ultra-Wide) nunca se corte la animación.

---

### 06. Catálogo de Colecciones en Pestañas (Tabs Colecciones Productos)

* **¿Dónde se usa?** Es el **widget estrella** del catálogo de amenidades (`/colecciones`, líneas de hotelería, páginas individuales de líneas estándar, superior, premium y lujo).
* **Archivos en el repositorio:**
  - `widgets/tabs-colecciones-productos/tabs-colecciones-productos.js`
  - `tabs-colecciones-productos.html` (Preview raíz)

#### Características
- Columna izquierda con navegación fija (sticky) de colecciones.
- Ficha de **Pirámide Olfativa** interactiva (Notas de salida, corazón y fondo).
- Insignia de **Rellenable** (`RELLENABLE` o `NO RELLENABLE`).
- Carrusel horizontal con tarjetas de producto (SKU, gramaje, piezas por caja).

#### Código Embed para Webflow
```html
<!-- Contenedor del Catálogo -->
<div class="jypesa-tabs-colecciones-widget" data-cms-source="#mi-coleccion-cms" data-lang="es"></div>

<!-- Script del Widget -->
<script src="https://jypesa-widgets.vercel.app/widgets/tabs-colecciones-productos/tabs-colecciones-productos.js"></script>
```

#### Mapeo de Clases para la Colección CMS de Webflow
Coloca un Collection List oculto (`display: none;`) con el identificador que pusiste en `data-cms-source` (ejemplo `id="mi-coleccion-cms"` o clase `.jypesa-tabs-colecciones-cms-source`). Dentro de cada ítem (`.w-dyn-item`), asigna las siguientes clases a los elementos:

| Clase CSS a asignar | Elemento en Webflow | Campo del CMS |
| :--- | :--- | :--- |
| `.jypesa-tabs-col-name` | Texto | Nombre de la Colección (ej: *Elements*) |
| `.jypesa-tabs-col-order` | Texto | Número de orden de la pestaña (ej: `1`, `2`) |
| `.jypesa-tabs-col-desc` | Texto | Descripción general de la colección |
| `.jypesa-tabs-col-logo` | Imagen | Logo de la marca |
| `.jypesa-tabs-col-mood` | Texto | Mood aromático (ej: *Cítrico, herbal, fresco*) |
| `.jypesa-tabs-col-notes-salida` | Texto | Notas de Salida |
| `.jypesa-tabs-col-notes-corazon` | Texto | Notas de Corazón |
| `.jypesa-tabs-col-notes-fondo` | Texto | Notas de Fondo |
| `.jypesa-tabs-col-refill` | Texto | `RELLENABLE` o `NO RELLENABLE` |
| `.jypesa-tabs-prod-name` | Texto | Nombre del producto (ej: *Jabón Facial*) |
| `.jypesa-tabs-prod-sku` | Texto | Código SKU |
| `.jypesa-tabs-prod-weight` | Texto | Gramaje o volumen (ej: *28 gr \| 0.9 oz*) |
| `.jypesa-tabs-prod-packaging`| Texto | Tipo de empaque (ej: *Flowpack*) |
| `.jypesa-tabs-prod-qty` | Texto | Presentación (ej: *300 pzs/Caja*) |
| `.jypesa-tabs-prod-img` | Imagen | Fotografía del producto |
| `.jypesa-tabs-prod-link` | Enlace | URL a la ficha o botón de contacto |

---

### 07. Pestañas de Hotelería por Segmento (Hotelería Tabs)

* **¿Dónde se usa?** En la sección de soluciones hoteleras (`/soluciones` o `/solutions`), dividiendo la propuesta de valor para *Hoteles Independientes*, *Cadenas Hoteleras* y *Grupos Hoteleros*.
* **Archivos en el repositorio:**
  - `widgets/hoteleria-tabs/hoteleria-tabs.js`
  - `hoteleria-tabs.html`

#### Código Embed para Webflow
```html
<div id="jypesa-hoteleria-tabs-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/hoteleria-tabs/hoteleria-tabs.js"></script>
```

#### Cómo editarlo
- **Vía CMS (Recomendado):** Añade un Collection List con la clase `.jht-cms-source` con los campos de título, descripción y 3 imágenes por cada segmento.
- **Vía Código:** Si no usas CMS, en `hoteleria-tabs.js` busca el objeto `FALLBACK_DATA_BY_LANG` (alrededor de la línea 587) y edita directamente los textos e imágenes tanto en español como en inglés.

---

### 08. Sistemas de Dispensación (Scroll Split)

* **¿Dónde se usa?** En la página de **Sistemas de Dispensación** (`/sistemas-de-dispensacion` y `/dispensing-systems`).
* **Efecto visual:** Mientras el usuario hace scroll, las columnas laterales de imágenes suben en direcciones opuestas y la columna central con el mensaje de sustentabilidad permanece fija.
* **Archivos en el repositorio:**
  - `widgets/sistemas-dispensacion/sistemas-dispensacion.js`
  - `widgets/sistemas-dispensacion/README.md`

#### Código Embed para Webflow
```html
<div class="jypesa-sistemas-dispensacion-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/sistemas-dispensacion/sistemas-dispensacion.js"></script>
```

#### Cómo editar las imágenes y textos
Abre `widgets/sistemas-dispensacion/sistemas-dispensacion.js`:
- Alrededor de las líneas 25 a 45 encontrarás las URLs de las 4 imágenes oficiales (alojadas en el CDN de Webflow).
- El botón enlaza automáticamente a `/sistemas-de-dispensacion` en español o `/dispensing-systems` en inglés.

---

### 09. Sistemas de Dispensación Comparativa (Catálogo de Dispensadores)

* **¿Dónde se usa?** En la sección comparativa de soportes, dispensadores y botellas compatibles.
* **Archivos en el repositorio:**
  - `widgets/sistemas-dispensacion-comparativa/sistemas-dispensacion-comparativa.js`
  - `widgets/sistemas-dispensacion-comparativa/README.md`

#### Código Embed para Webflow
Puedes colocar el widget filtrando por categoría en distintas secciones de la misma página con un solo script al final:

```html
<!-- Sección 1: Sistemas de dispensación -->
<div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Sistemas de dispensación"></div>

<!-- Sección 2: Soportes de pared -->
<div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Soportes"></div>

<!-- Sección 3: Complementos -->
<div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Complementos"></div>

<!-- Script único de carga -->
<script src="https://jypesa-widgets.vercel.app/widgets/sistemas-dispensacion-comparativa/sistemas-dispensacion-comparativa.js"></script>
```

#### Campos de la Colección CMS en Webflow
Clase del contenedor de origen: `.jypesa-sdc-cms-source` (`display: none;`).

| Clase para el elemento | Campo en Webflow | Descripción |
| :--- | :--- | :--- |
| `.jypesa-disp-name` | Texto | Nombre del dispensador (ej: *Easy Snap*) |
| `.jypesa-disp-badge` | Texto | Etiqueta (ej: *Economy* o *Premium*) |
| `.jypesa-disp-badge-color` | Texto | Color Hex (ej: `#4AA25D`) |
| `.jypesa-disp-categoria` | Texto | `Sistemas de dispensación`, `Soportes` o `Complementos` |
| `.jypesa-disp-codigo` | Texto | Código SKU |
| `.jypesa-disp-capacidad` | Texto | Capacidad (ej: *400 ml / 13.5 oz*) |
| `.jypesa-disp-material` | Texto | Material (ej: *HDPE Reciclable*) |
| `.jypesa-disp-seguridad` | Texto | Tipo de cerradura/llave |
| `.jypesa-disp-desc` | Texto | Párrafo explicativo |
| `.jypesa-disp-img-main` | Imagen | Imagen frontal por defecto |
| `.jypesa-disp-guia-link` | Enlace | Enlace de descarga de Guía de Instalación (PDF) |
| `.jypesa-disp-ficha-link` | Enlace | Enlace de descarga de Ficha Técnica (PDF) |

---

### 10. Deslizador Vertical de Sustentabilidad (Scroll Vertical Fijo)

* **¿Dónde se usa?** En la página de **Sustentabilidad** (`/sustentabilidad` y `/sustainability`).
* **Archivos en el repositorio:**
  - `widgets/slider-scroll-vertical/slider-scroll-vertical.js`
  - `widgets/slider-scroll-vertical/README.md`

#### Código Embed para Webflow
```html
<div data-jypesa-sustentabilidad-widget data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/slider-scroll-vertical/slider-scroll-vertical.js"></script>
```

#### Estructura de las Diapositivas
Las 4 diapositivas del recorrido son:
1. **01. Nocean**: Sistemas recargables con logo Nocean.
2. **02. Materiales Reciclados**: Plásticos post-consumo PCR y aluminio reciclable.
3. **03. Fórmulas Limpias**: Ingredientes biodegradables libres de sulfatos y parabenos.
4. **04. Certificaciones Internacionales**: Sellos de auditoría ambiental y calidad.

Para administrarlas desde Webflow CMS, conecta una lista con la clase `.jypesa-sust-cms-source` con los campos `.jypesa-sust-prod-index`, `.jypesa-sust-prod-title`, `.jypesa-sust-prod-desc` e imagen `.jypesa-sust-prod-img`.

---

### 11. Sustentabilidad e Innovación Aplicada (Bloque Comparativo 2 Fases)

* **¿Dónde se usa?** En la sección técnica de formulación, empaque y optimización.
* **Archivos en el repositorio:**
  - `widgets/sustentabilidad/sustentabilidad-widget.js`
  - `widgets/sustentabilidad/sustentabilidad-widget.css`

#### Código Embed para Webflow
```html
<div id="jypesa-sustentabilidad-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/sustentabilidad/sustentabilidad-widget.js"></script>
```

#### Cómo editarlo
En `sustentabilidad-widget.js` encontrarás el diccionario `ENGLISH_COPY` (alrededor de la línea 10) que mapea cada término de formulación ("Desarrollo de fórmula", "Pruebas microbiológicas", "Selección de materiales", "Laboratorio interno") entre español e inglés.

---

### 12. Beneficios Persea (Dial Circular Interactivo)

* **¿Dónde se usa?** En la página o sección dedicada a la línea **Persea**.
* **Efecto visual:** Presenta una botella o jabón central rodeado por 11 sellos de beneficio (Vegano, Cruelty-free, Sin parabenos, Biodegradable, etc.) animados en forma de reloj con GSAP.
* **Archivos en el repositorio:**
  - `widgets/beneficios-persea/beneficios-persea.js`
  - `widgets/beneficios-persea/preview.html`

#### Código Embed para Webflow
```html
<div 
  id="jypesa-beneficios-persea-widget" 
  data-lang="es"
  data-central-img="URL_DE_TU_IMAGEN_DE_PRODUCTO"
  data-text-color="#506D85">
</div>
<script src="https://jypesa-widgets.vercel.app/widgets/beneficios-persea/beneficios-persea.js"></script>
```

#### Atributos personalizables
- `data-central-img`: Reemplaza la foto del jabón o botella del centro.
- `data-bg-img`: Cambia la textura de fondo.
- `data-text-color`: Cambia el color tipográfico de los 11 puntos.

---

### 13. Cobertura Global (Mapa Mundial Interactivo SVG)

* **¿Dónde se usa?** En la sección de alcance global del Home o página Nosotros.
* **Efecto visual:** Mapa vectorial SVG con pines de pulsación agrupados por categoría y un panel interactivo que resalta las ciudades al pasar el cursor o hacer clic.
* **Archivos en el repositorio:**
  - `widgets/cobertura-global/cobertura-global.js`
  - `cobertura-global.html`

#### Código Embed para Webflow
```html
<div id="jypesa-cobertura-global-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/cobertura-global/cobertura-global.js"></script>
```

#### Cómo agregar o editar ciudades en el mapa
Abre `widgets/cobertura-global/cobertura-global.js` entre las líneas 17 y 40 (bloque `LOCATIONS`):
```javascript
{ 
  type: 'representativeOffices', // 'representativeOffices' | 'jypesaFactories' | 'associatedFactories'
  city: { es: 'Guadalajara', en: 'Guadalajara' }, 
  country: { es: 'México', en: 'Mexico' }, 
  lat: 20.6597, 
  lon: -103.3496 
}
```
* **Azul (`#0089C1`):** Oficinas de representación.
* **Verde (`#4AA25D`):** Fábricas propias de JYPESA.
* **Amarillo (`#FBB31F`):** Fábricas asociadas internacionales.

Basta con añadir o modificar la latitud (`lat`) y longitud (`lon`) para que el pin se posicione exactamente sobre el mapa mundial.

---

### 14. Presencia Internacional (Mapa Leaflet con Búsqueda y Filtros)

* **¿Dónde se usa?** En la página de **Contacto** y **Ubicaciones** de JYPESA.
* **Efecto visual:** Mapa cartográfico navegable real con buscador en tiempo real, filtros por tipo (Oficinas, Plantas, CEDIS, Contactos Regionales), vista en pantalla completa y tarjetas con botón de llamada directa y correo electrónico.
* **Archivos en el repositorio:**
  - `widgets/presencia-internacional/presencia-internacional.js`
  - `presencia-internacional.html`

#### Código Embed para Webflow
```html
<div id="jypesa-presencia-internacional-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/presencia-internacional/presencia-internacional.js"></script>
```

#### Cómo editar las sucursales y datos de contacto
Abre `widgets/presencia-internacional/presencia-internacional.js` en las líneas 9 a 20 (arreglo `LOCATIONS`):
```javascript
{ 
  id: 1, 
  type: 'oficina', // 'oficina' | 'planta' | 'cedis' | 'contacto'
  nameEs: 'Jypesa Oficinas Corporativas México', 
  nameEn: 'Jypesa Corporate Offices Mexico', 
  address: 'Av. Acueducto 2100, Colinas de San Javier, Guadalajara, Jal.', 
  phone: '+52 33 4040 2081', 
  email: 'cercadeti@jypesa.com', 
  lat: 20.7043, 
  lng: -103.4130, 
  isDefault: true 
}
```

---

### 15. Línea de Tiempo Histórica (Timeline Jypesa)

* **¿Dónde se usa?** En la sección de historia y trayectoria de la página **Nosotros**.
* **Efecto visual:** Barra de progreso temporal que se ilumina del primer al último hito, con círculos concéntricos y reproducción automática en computadoras.
* **Archivos en el repositorio:**
  - `widgets/timeline/timeline-widget.js`
  - `widgets/timeline/timeline-widget.css`
  - `timeline.html`

#### Código Embed para Webflow
```html
<div data-jypesa-timeline-widget data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/timeline/timeline-widget.js"></script>
```

#### Cómo editar los años e hitos
Abre `widgets/timeline/timeline-widget.js` entre las líneas 430 y 460:
```javascript
es: [
  { year: '1976', title: 'Fundación de JYPESA', desc: 'Inicia operaciones en Guadalajara...' },
  { year: '1995', title: 'Primera Planta Industrial', desc: '...' },
  { year: '2010', title: 'Expansión Internacional', desc: '...' },
  { year: 'Hoy',  title: '21 Países · 7,000 m² · Laboratorio Propio', desc: '...' }
]
```

---

### 16. Tarjetas de Capacidades / Líneas de Negocio (Cards)

* **¿Dónde se usa?** En la página de inicio o soluciones para presentar las 3 divisiones: **Producción**, **Private Label** y **Licencias**.
* **Archivos en el repositorio:**
  - `widgets/cards/cards-widget.js`
  - `widgets/cards/cards-widget.css`
  - `cards.html`

#### Código Embed para Webflow
```html
<div id="jypesa-cards-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/cards/cards-widget.js"></script>
```

---

### 17. Proceso de Producción (De la Idea a la Producción)

* **¿Dónde se usa?** En la página de **Desarrollo Personalizado** (`/desarollo-personalizado`).
* **Efecto visual:** Recorrido interactivo de 8 etapas con línea SVG trazada conforme se desplaza la pantalla:
  1. Brief técnico
  2. Análisis de viabilidad
  3. Desarrollo o adaptación
  4. Validacion de muestras
  5. Ajustes regulatorios
  6. Producción piloto
  7. Producción industrial
  8. Entrega
* **Archivos en el repositorio:**
  - `widgets/proceso/proceso-widget.js`
  - `widgets/proceso/proceso-widget.css`
  - `proceso.html`

#### Código Embed para Webflow
```html
<div id="jypesa-proceso-widget" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/proceso/proceso-widget.js"></script>
```

---

### 18. Carrusel de Certificaciones (Slider Certificaciones)

* **¿Dónde se usa?** En las páginas de Sustentabilidad, Calidad o Nosotros.
* **Archivos en el repositorio:**
  - `widgets/slider-certificaciones/slider-certificaciones.js` y `widgets/slider certificaciones new/`
  - `slider-certificaciones.html`

#### Código Embed para Webflow
```html
<div id="gpk-slider-certificaciones-widget-root" data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/slider%20certificaciones%20new/slider-certificaciones.js"></script>
```

---

### 19. Carrusel de Colecciones Recomendadas (Sliders de Colección)

* **¿Dónde se usa?** En páginas comerciales y de catálogo para mostrar colecciones sugeridas con botones circulares de navegación prev/next.
* **Archivos en el repositorio:**
  - `widgets/slider-coleccion-productos/slider-coleccion-productos.js`
  - Variantes dedicadas: `widgets/colecciones-hoteleria/`, `widgets/colecciones-empresarial/`, `widgets/colecciones-institucional/`, `widgets/colecciones-canal-comercial/`.

#### Código Embed para Webflow
```html
<div data-jypesa-colecciones-hoteleria-widget data-lang="es"></div>
<script src="https://jypesa-widgets.vercel.app/widgets/colecciones-hoteleria/colecciones-hoteleria.js"></script>
```

---

### 20. Selector Múltiple para Formulario de Contacto (Multi-Select)

* **¿Dónde se usa?** En el formulario de la página **Contacto** (`/contacto` y `/contact`).
* **Función:** Transforma el campo desplegable nativo de selección única de Webflow (`#collection-interest` o `#coleccion-interes`) en un menú desplegable con casillas de verificación (checkboxes) agrupadas por categoría (*Estándar, Superior, Premium*) y serializa las selecciones separadas por comas en un campo oculto para que lleguen completas en el correo del formulario.
* **Archivos en el repositorio:**
  - `widgets/contacto-multiselect/contacto-multiselect.js`
  - `widgets/contacto-multiselect/contacto-multiselect.css`

#### Código Embed para Webflow
Coloca este script en el **Footer Code** de la página de contacto (o dentro de un Embed debajo del formulario):

```html
<link rel="stylesheet" href="https://jypesa-widgets.vercel.app/widgets/contacto-multiselect/contacto-multiselect.css">
<script src="https://jypesa-widgets.vercel.app/widgets/contacto-multiselect/contacto-multiselect.js"></script>
```

#### Requisito en Webflow
Asegúrate de que el elemento `<select>` de tu formulario en Webflow tenga el ID:
- `coleccion-interes` (para el sitio en español)
- `collection-interest` (para el sitio en inglés)

---

## 4. Buenas Prácticas y Resolución de Problemas

### 1. ¿Cómo ver cambios inmediatamente sin problemas de caché?
Los navegadores guardan en memoria los archivos JavaScript. Cuando hagas un cambio en un archivo `.js`:
- Si quieres probarlo de inmediato en Webflow sin esperar la expiración de caché, puedes agregar un parámetro de versión al script:
  ```html
  <script src="https://jypesa-widgets.vercel.app/widgets/navegacion-principal/navegacion-principal.js?v=2.0.1"></script>
  ```
- Al cambiar el número `?v=...`, todos los visitantes y Webflow descargarán la versión nueva inmediatamente.

### 2. ¿Cómo inspeccionar errores en el navegador?
1. En tu navegador, haz clic derecho en cualquier parte de la página y selecciona **Inspeccionar** (o presiona `F12`).
2. Ve a la pestaña **Consola** (Console).
3. Si un widget no encuentra su contenedor, verás un mensaje de advertencia claro indicando qué ID o clase faltó (por ejemplo: `Jypesa Cards Widget target element not found`).

### 3. Evitar conflictos de fuentes tipográficas
Todos los widgets de JYPESA descargan sus propias fuentes oficiales de Google Fonts (*Instrument Serif, Montserrat, Rubik*) de forma segura y con protección para que nunca se importen dos veces en la misma página.

### 4. Soporte y mantenimiento
Para cualquier duda o ajuste en la lógica de los widgets, consulta los changelogs detallados en la carpeta `/changelogs/` del repositorio, donde queda documentada cada actualización histórica.
