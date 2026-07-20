# Colección CMS Webflow — Sistemas de Dispensación Comparativa

Esta guía te proporciona la configuración exacta para crear la colección en el CMS de Webflow, vincularla correctamente con el widget interactivo y aplicar filtros por categoría para estructurar tus secciones.

---

## 1. Configuración de la Colección en el CMS de Webflow

Crea una colección en el CMS con los siguientes parámetros y campos exactos:

### Información de la Colección
*   **Nombre de la Colección (Collection Name)**: `Dispensadores`
*   **Slug de la Colección (Collection Slug)**: `dispensadores`

### Lista de Campos (Fields) a agregar:

| Nombre del Campo (Label) | Tipo de Campo Webflow | ID / Class para asignar en el HTML | Propósito / Ejemplo |
| :--- | :--- | :--- | :--- |
| **Nombre** | `Plain text` (Required) | `.jypesa-disp-name` | Nombre del dispensador (ej. `Easy Snap`) |
| **Badge** | `Plain text` (Optional) | `.jypesa-disp-badge` | Etiqueta de la línea (ej. `Economy` o `Premium`) |
| **Color del Badge** | `Plain text` (Optional) | `.jypesa-disp-badge-color` | Código de color en Hex/RGBA para el fondo del badge (ej. `#4aa25d` o `#8a3ab9`) |
| **Categoría** | `Plain text` (Optional) | `.jypesa-disp-categoria` | Categoría principal. Debe ser exactamente uno de estos tres valores:<br>- `Sistemas de dispensación`<br>- `Soportes`<br>- `Complementos` |
| **Descripción Categoría** | `Plain text` (Optional) | `.jypesa-disp-categoria-desc` | Descripción que saldrá debajo de la categoría (ej. `Diseñados para mejorar procesos...`) |
| **Código** | `Plain text` (Optional) | `.jypesa-disp-codigo` | Código SKU (ej. `JHJY-0065` o `-`) |
| **Capacidad** | `Plain text` (Optional) | `.jypesa-disp-capacidad` | Capacidad (ej. `400 ml / 13.5 oz`) |
| **Material** | `Plain text` (Optional) | `.jypesa-disp-material` | Material (ej. `HDPE — Material reciclable`) |
| **Seguridad** | `Plain text` (Optional) | `.jypesa-disp-seguridad` | Tipo de llave/seguro (ej. `Media (llave exclusiva)`) |
| **Descripción Producto** | `Plain text` (Optional) | `.jypesa-disp-desc` | Resumen de características para el párrafo del producto |
| **Imagen Principal** | `Image` (Required) | `.jypesa-disp-img-main` | Imagen del dispensador por defecto (vista inicial) |
| **Variante 1 - Miniatura** | `Image` (Optional) | `.jypesa-disp-subimg-1` | Ícono/botella pequeña de la primera marca compatible |
| **Variante 1 - Imagen Grande** | `Image` (Optional) | `.jypesa-disp-subimg-1-large` | Vista grande del dispensador con la Variante 1 colocada |
| **Variante 2 - Miniatura** | `Image` (Optional) | `.jypesa-disp-subimg-2` | Ícono/botella pequeña de la segunda marca compatible |
| **Variante 2 - Imagen Grande** | `Image` (Optional) | `.jypesa-disp-subimg-2-large` | Vista grande del dispensador con la Variante 2 colocada |
| **Variante 3 - Miniatura** | `Image` (Optional) | `.jypesa-disp-subimg-3` | Ícono/botella pequeña de la tercera marca compatible |
| **Variante 3 - Imagen Grande** | `Image` (Optional) | `.jypesa-disp-subimg-3-large` | Vista grande del dispensador con la Variante 3 colocada |
| **Enlace Guía de Instalación** | `Link` (Optional) | `.jypesa-disp-guia-link` | Enlace para descargar la guía de instalación (PDF) |
| **Enlace Ficha Técnica** | `Link` (Optional) | `.jypesa-disp-ficha-link` | Enlace para descargar la ficha técnica (PDF) |

> [!NOTE]
> *   **Ocultado Inteligente de Miniaturas**: Si no cargas imágenes en los campos de Variante 1/2/3, la barra inferior de miniaturas **se ocultará por completo** de forma automática (evitando imágenes rotas y redundancia).
> *   **Ocultado Inteligente de Botones**: Si dejas vacíos los enlaces de *Guía de Instalación* o *Ficha Técnica*, los botones correspondientes **no se mostrarán**.

---

## 2. Cómo Estructurar la Colección en la Página de Webflow

1. En la página de Webflow, inserta una **Collection List** conectada a la colección `Dispensadores`.
2. Asigna la clase **`jypesa-sdc-cms-source`** al elemento contenedor principal de la lista (**Collection List Wrapper**).
3. Dentro del **Collection Item** (`w-dyn-item`), coloca los siguientes elementos de forma oculta (puedes meterlos en un Div Block y ponerle `display: none`):
   * Un bloque de texto con la clase `.jypesa-disp-name` enlazado al campo *Nombre*.
   * Un bloque de texto con la clase `.jypesa-disp-badge` enlazado al campo *Badge*.
   * Un bloque de texto con la clase `.jypesa-disp-badge-color` enlazado al campo *Color del Badge*.
   * Un bloque de texto con la clase `.jypesa-disp-categoria` enlazado al campo *Categoría*.
   * Un bloque de texto con la clase `.jypesa-disp-categoria-desc` enlazado al campo *Descripción Categoría*.
   * Un bloque de texto con la clase `.jypesa-disp-codigo` enlazado al campo *Código*.
   * Un bloque de texto con la clase `.jypesa-disp-capacidad` enlazado al campo *Capacidad*.
   * Un bloque de texto con la clase `.jypesa-disp-material` enlazado al campo *Material*.
   * Un bloque de texto con la clase `.jypesa-disp-seguridad` enlazado al campo *Seguridad*.
   * Un bloque de texto con la clase `.jypesa-disp-desc` enlazado al campo *Descripción Producto*.
   * Un elemento de imagen con la clase `.jypesa-disp-img-main` enlazado a *Imagen Principal*.
   * Elementos de imagen para las miniaturas y sus imágenes grandes correspondientes (ej. `.jypesa-disp-subimg-1` y `.jypesa-disp-subimg-1-large`).
   * Un enlace tipo botón (`Link Block` o `Button`) con la clase `.jypesa-disp-guia-link` enlazado al link de la *Guía de Instalación*.
   * Un enlace tipo botón con la clase `.jypesa-disp-ficha-link` enlazado al link de la *Ficha Técnica*.

---

## 3. Código Embed para Inicializar el Widget (Con Filtros de Categoría)

Coloca un bloque de **Embed HTML** justo **abajo** de tu lista de colección. Configura el widget para filtrar y mostrar únicamente una categoría específica usando el atributo `data-category-filter`. El título destacado y el subtítulo de la sección se actualizarán automáticamente basados en la categoría seleccionada:

```html
<!-- Ejemplo 1: Mostrar únicamente la sección Sistemas de dispensación -->
<div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Sistemas de dispensación"></div>

<!-- Ejemplo 2: Mostrar únicamente la sección Soportes -->
<!-- <div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Soportes"></div> -->

<!-- Ejemplo 3: Mostrar únicamente la sección Complementos -->
<!-- <div class="jypesa-sistemas-dispensacion-comparativa" data-category-filter="Complementos"></div> -->

<!-- Cargar el script interactivo -->
<script src="https://jypesa-widgets.vercel.app/widgets/sistemas-dispensacion-comparativa/sistemas-dispensacion-comparativa.js"></script>
```

El widget leerá los datos del CMS oculto, filtrará las tarjetas para mostrar únicamente los elementos que coincidan con la categoría especificada en `data-category-filter`, actualizará dinámicamente los encabezados con el nombre y la descripción de la categoría asignada, generará la interfaz interactiva, los botones de descarga de guías/fichas técnicas, y habilitará el cambio de imagen al hacer clic en las marcas/botellas compatibles.
