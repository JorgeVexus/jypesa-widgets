# Guía de Integración — Widget Deslizador Scroll Vertical (Sustentabilidad)

Esta guía detalla paso a paso cómo integrar el widget de **Sustentabilidad** con efecto scroll vertical interactivo y carrusel móvil en tu proyecto de Webflow.

---

## 1. Código Embed para Webflow

Agrega un bloque de **Embed HTML** en Webflow en la sección donde desees renderizar el widget de sustentabilidad:

```html
<!-- 1. Contenedor del Widget de Sustentabilidad -->
<div data-jypesa-sustentabilidad-widget></div>

<!-- 2. Cargar el script desde Vercel (Producción) -->
<script src="https://jypesa-widgets.vercel.app/widgets/slider-scroll-vertical/slider-scroll-vertical.js"></script>
```

---

## 2. Estructura de la Colección CMS (Webflow)

Crea una colección llamada **Diapositivas de Sustentabilidad** en Webflow para alimentar las diapositivas del widget:

| Nombre del Campo en Webflow | Tipo de Campo | Identificador en el DOM | Descripción | Ejemplo de Valor |
| :--- | :--- | :--- | :--- | :--- |
| **Nombre** | Plain Text | `name` | Nombre interno de control | `Slide 01 — Nocean` |
| **Número de Índice** | Plain Text | `.jypesa-sust-prod-index` | Número indicador de 2 dígitos | `01`, `02`, `03`, `04` |
| **Título de Diapositiva** | Plain Text | `.jypesa-sust-prod-title` | Título del contenido (opcional para Slide 1) | `Refill systems` |
| **Descripción** | Plain Text / Rich | `.jypesa-sust-prod-desc` | Texto descriptivo de la diapositiva | `Sistemas de dispensación recargables...` |
| **Imagen Principal** | Image | `.jypesa-sust-prod-img` | Imagen lateral derecha (desktop) o superior (móvil) | (Imagen del CMS) |
| **Logo Especial** | Image (Opcional) | `.jypesa-sust-prod-logo` | Logo que reemplaza al título (ej: Nocean en Slide 1) | (Logo de Nocean) |
| **Mostrar Certificaciones** | Switch / Boolean | `.jypesa-sust-prod-show-certs` | Activa la fila de certificaciones en el Slide 4 | `True` o `False` |

---

## 3. Mapeo de Clases para el Collection List Oculto

Para que el script lea los datos en Webflow, añade un **Collection List** conectado a la colección de **Diapositivas de Sustentabilidad** en la misma página, ocúltalo con estilos (**`display: none;`**), y asígnale la clase principal **`.jypesa-sust-cms-source`**. 

Dentro del **Collection Item** (`.w-dyn-item`), debes enlazar los elementos a sus campos CMS con las siguientes clases respectivas:

| Clase CSS del Elemento | Elemento HTML | Campo del CMS a Enlazar |
| :--- | :--- | :--- |
| **`.jypesa-sust-prod-index`** | Text Block | **Número de Índice** (ej: `01`) |
| **`.jypesa-sust-prod-title`** | Text Block | **Título de Diapositiva** |
| **`.jypesa-sust-prod-desc`** | Text Block | **Descripción** |
| **`.jypesa-sust-prod-img`** | Image | **Imagen Principal** (elemento `img` nativo) |
| **`.jypesa-sust-prod-logo`** | Image | **Logo Especial** (elemento `img` nativo) |
| **`.jypesa-sust-prod-show-certs`** | Text Block | **Mostrar Certificaciones** (añadir texto dinámico ej: `true` / `false`) |

---

## 4. Archivos Locales (Referencias de Prueba)

Si requieres probar localmente o consultar las imágenes de referencia utilizadas, se encuentran en el repositorio en la ruta:
`widgets/assets/images/slider scroll vertical home/`

Las imágenes de fallback cargadas por defecto coinciden de forma exacta con la referencia de Figma:
1. `01.webp` y `Logo nocean.webp` para Slide 1.
2. `02.webp` para Slide 2.
3. `03.webp` para Slide 3.
4. `04.webp` y `Certifications Container.png` para Slide 4.
