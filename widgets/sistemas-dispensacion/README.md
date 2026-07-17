# Guía de Integración — Widget de Sistemas de Dispensación (Webflow)

Esta guía detalla paso a paso cómo integrar el widget de **Sistemas de Dispensación** en tu proyecto de Webflow.

---

## 1. Código Embed para Webflow

Agrega un bloque de **Embed HTML** en Webflow en la sección donde desees renderizar el widget:

```html
<!-- 1. Contenedor del Widget de Dispensadores -->
<!-- Puedes filtrar especificando el atributo data-category-filter="NombreDeCategoria" -->
<div data-jypesa-dispensadores-widget data-category-filter="Economy"></div>

<!-- 2. Cargar el script desde Vercel -->
<script src="https://jypesa-widgets.vercel.app/widgets/sistemas-dispensacion/sistemas-dispensacion.js"></script>
```

---

## 2. Estructura de las Colecciones CMS (Webflow)

Para alimentar el widget, te sugerimos crear las siguientes dos colecciones en Webflow:

### Colección A: `Categorías de Dispensadores`
Se utiliza para agrupar los productos, definir los textos generales de la cabecera y el color de fondo personalizado del tag superior.

| Nombre del Campo en Webflow | Tipo de Campo | Descripción | Ejemplo de Valor |
| :--- | :--- | :--- | :--- |
| **Name** | Plain Text | Nombre interno de la categoría / filtro | `Economy` |
| **Título de Sección** | Plain Text | Título que aparece en la cabecera del widget | `Sistemas de dispensación` |
| **Descripción de Sección** | Plain Text | Descripción corta bajo el título | `Diseñados para mejorar procesos, reducir desperdicio...` |
| **Color del Tag** | Plain Text | Color hexadecimal para el tag de la card | `#4AA25D` |

---

### Colección B: `Productos de Dispensadores`
Contiene la información de cada una de las tarjetas de los productos.

| Nombre del Campo en Webflow | Tipo de Campo | Descripción |
| :--- | :--- | :--- |
| **Name** | Plain Text | Nombre del producto (e.g., `Easy Snap`) |
| **Categoría** | Reference | Enlace a la colección `Categorías de Dispensadores` |
| **Código** | Plain Text | Código identificador (e.g., `JHJY-0065` o `-`) |
| **Capacidad** | Plain Text | Volumen / Capacidad (e.g., `400 ml / 13.5 oz`) |
| **Material** | Plain Text | Material del dispensador (e.g., `HDPE — Material reciclable`) |
| **Seguridad** | Plain Text | Nivel de seguridad (e.g., `Media (llave exclusiva)`) |
| **Descripción** | Plain Text / Rich | Descripción larga del producto |
| **Imagen Principal** | Image | Imagen grande inicial de la card |
| **Imagen 2** | Image (Opcional) | Segunda miniatura e imagen alternativa |
| **Imagen 3** | Image (Opcional) | Tercera miniatura e imagen alternativa |
| **Imagen 4** | Image (Opcional) | Cuarta miniatura e imagen alternativa |
| **Imagen 5** | Image (Opcional) | Quinta miniatura e imagen alternativa |
| **Guía de Instalación** | Document / File | Archivo PDF para descargar la guía de instalación |
| **Ficha Técnica** | Document / File | Archivo PDF para descargar la ficha técnica |

---

## 3. Mapeo de Clases para el Collection List Oculto

Para que el script pueda extraer dinámicamente los datos en Webflow, debes añadir un **Collection List** conectado a la colección de **Productos de Dispensadores** en la misma página, ocultarlo mediante estilos (**`display: none;`**), y aplicarle la clase principal **`.jypesa-disp-cms-source`**. 

Dentro del **Collection Item** (`.w-dyn-item`), debes añadir elementos de texto, imagen o enlaces con las siguientes clases y enlazados a sus campos CMS respectivos:

| Clase CSS del Elemento | Elemento HTML | Campo del CMS a Enlazar |
| :--- | :--- | :--- |
| **`.jypesa-disp-prod-name`** | Text Block | **Name** (Nombre del Producto) |
| **`.jypesa-disp-prod-code`** | Text Block | **Código** |
| **`.jypesa-disp-prod-capacity`** | Text Block | **Capacidad** |
| **`.jypesa-disp-prod-material`** | Text Block | **Material** |
| **`.jypesa-disp-prod-security`** | Text Block | **Seguridad** |
| **`.jypesa-disp-prod-description`** | Text Block | **Descripción** |
| **`.jypesa-disp-prod-img1`** | Image | **Imagen Principal** (elemento `img` nativo) |
| **`.jypesa-disp-prod-img2`** | Image | **Imagen 2** (elemento `img` nativo) |
| **`.jypesa-disp-prod-img3`** | Image | **Imagen 3** (elemento `img` nativo) |
| **`.jypesa-disp-prod-img4`** | Image | **Imagen 4** (elemento `img` nativo) |
| **`.jypesa-disp-prod-img5`** | Image | **Imagen 5** (elemento `img` nativo) |
| **`.jypesa-disp-prod-file-installation`** | Link Block / Link | **Guía de Instalación** (enlace al archivo PDF) |
| **`.jypesa-disp-prod-file-technical`** | Link Block / Link | **Ficha Técnica** (enlace al archivo PDF) |
| **`.jypesa-disp-prod-cat-name`** | Text Block | **Categoría $\rightarrow$ Name** (Nombre de la Categoría) |
| **`.jypesa-disp-prod-cat-color`** | Text Block | **Categoría $\rightarrow$ Color del Tag** (ej: `#4AA25D`) |
| **`.jypesa-disp-prod-cat-title`** | Text Block | **Categoría $\rightarrow$ Título de Sección** |
| **`.jypesa-disp-prod-cat-desc`** | Text Block | **Categoría $\rightarrow$ Descripción de Sección** |

---

## 4. Instanciación Múltiple en una misma Página

Si deseas tener múltiples instancias del widget en la misma página (por ejemplo, una sección de "Economy" y otra de "Premium"), solo debes crear contenedores HTML Embed independientes con su respectivo filtro:

```html
<!-- Instancia 1 -->
<div data-jypesa-dispensadores-widget data-category-filter="Economy"></div>

<!-- Instancia 2 -->
<div data-jypesa-dispensadores-widget data-category-filter="Premium"></div>
```

El script leerá el mismo Collection List oculto de la página, separará los productos automáticamente por su categoría y renderizará cada sección con su título, descripción y color de tag correspondientes de forma independiente.
