# Guía de Integración — Widget de Sistemas de Dispensación (Scroll Split)

Esta guía detalla paso a paso cómo integrar el widget de **Sistemas de Dispensación** con efecto de desplazamiento vertical opuesto (scroll split) en tu proyecto de Webflow.

---

## 1. Código Embed para Webflow

Agrega un bloque de **Embed HTML** en Webflow en la sección donde desees renderizar el widget:

```html
<!-- Contenedor del Widget de Sistemas de Dispensación (Scroll Split) -->
<div class="jypesa-sistemas-dispensacion-widget"></div>

<!-- Cargar el script desde Vercel (Producción) -->
<script src="https://jypesa-widgets.vercel.app/widgets/sistemas-dispensacion/sistemas-dispensacion.js"></script>
```

---

## 2. Comportamiento y Contenidos

Este es un widget **estático autónomo** diseñado para optimizar el rendimiento y evitar dependencias de colecciones CMS. Carga las siguientes imágenes oficiales del CDN de Webflow:

- **Columna Izquierda (Sube)**:
  - Imagen 1: `elements 03.avif` (Soporte de pared biogena en uso)
  - Imagen 2: `elements 04.avif` (Lavabo y dispensador con espejo)
- **Columna Derecha (Sube)**:
  - Imagen 1: `elements 01.avif` (Dispensador Elements 2 en 1 bajo el agua)
  - Imagen 2: `elements 02.avif` (Dispensadores en repisa con plantas tropicales)

- **Columna Central (Baja)**:
  - Subtítulo: `Sistemas de dispensación`
  - Título: `Menos residuos, mayor eficiencia` (*eficiencia* estilizada en tipografía *Instrument Serif* en cursiva y con degradado)
  - Párrafo: `Dispensadores que combinan estética, practicidad y sostenibilidad para mejorar la presentación y gestión de amenidades en hoteles.`
  - Botón: `Ver sistemas de dispensación` $\rightarrow$ Enlace absoluto a `/sistemas-de-dispensacion`
