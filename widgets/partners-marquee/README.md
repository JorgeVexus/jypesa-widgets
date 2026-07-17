# Guía de Integración — Widget de Carrusel Infinito (Partners Marquee)

Esta guía detalla paso a paso cómo integrar el widget de **Carrusel Infinito de Socios/Logos** en tu proyecto de Webflow.

---

## 1. Código Embed para Webflow

Agrega un bloque de **Embed HTML** en Webflow en las secciones donde desees renderizar el carrusel infinito (puedes colocarlo tantas veces como desees en la página):

```html
<!-- Contenedor del Carrusel Infinito -->
<div class="jypesa-partners-marquee-widget"></div>

<!-- Opcional: Personalizar la velocidad del ciclo (ej: más rápido 25 segundos) -->
<!-- <div class="jypesa-partners-marquee-widget" data-duration="25s"></div> -->

<!-- Cargar el script desde Vercel (Cargar solo una vez en la página) -->
<script src="https://jypesa-widgets.vercel.app/widgets/partners-marquee/partners-marquee.js"></script>
```

---

## 2. Estructura de la Colección CMS (Webflow)

Crea una colección CMS en Webflow llamada **Logos de Socios**:

| Nombre del Campo en Webflow | Tipo de Campo | Identificador de Clase CSS | Descripción |
| :--- | :--- | :--- | :--- |
| **Name** | Plain Text | | Nombre de control (ej. `Elements`) |
| **Logo de Socio** | Image | `.jypesa-partners-marquee-cms-img` | Logotipo del socio comercial |

*Nota: Sube cada logo **una sola vez**. El script en producción se encarga de clonar y repetir dinámicamente los logos para formar el bucle sin fin.*

---

## 3. Mapeo de Clases para el Collection List Oculto

Para alimentar de forma dinámica el widget, agrega un **Collection List** conectado a la colección de **Logos de Socios** en la misma página (generalmente en el footer), ocúltalo (**`display: none;`**), y asígnale la clase principal **`.jypesa-partners-marquee-cms-source`**. 

Dentro del **Collection Item** (`.w-dyn-item`), enlaza el elemento de imagen:

| Clase CSS del Elemento | Elemento HTML | Campo del CMS a Enlazar |
| :--- | :--- | :--- |
| **`.jypesa-partners-marquee-cms-img`** | Image | **Logo de Socio** (elemento `img` nativo) |

---

## 4. Funcionamiento Técnico (Autoreplicación)
El script calcula la longitud de la lista de logos. Si la cantidad es pequeña (por ejemplo, menos de 15 logotipos), el script los repetirá de manera automatizada en memoria antes de duplicarlos por completo para crear el track infinito. Esto previene que se generen cortes o huecos negros a resoluciones Ultra-Wide y resoluciones de monitor amplias, asegurando un desplazamiento horizontal uniforme e infinito.
