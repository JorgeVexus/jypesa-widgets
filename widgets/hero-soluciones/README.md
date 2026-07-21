# Hero Soluciones — Desarrollo Personalizado

Widget hero para la sección **Desarrollo Personalizado** de Jypesa.
Implementación pixel-perfect del diseño de Figma (`node-id: 1752-43401`).

---

## Archivos

| Archivo | Descripción |
|---|---|
| `hero-soluciones.js` | Widget principal (autocontenido — CSS + HTML + JS) |
| `preview.html` | Página de preview local |

---

## Estructura visual

```
┌──────────────────────────────────────────────────────────┐
│  [Imagen de fondo: productos cosméticos en azul]        │
│  [Overlay gradiente oscuro ← izquierda]                 │
│                                                          │
│  Creamos productos          ← entra animada             │
│  a la medida                ← entra animada             │
│  de tu marca                ← entra animada             │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  GLASS PANEL (backdrop-filter blur)                  │ │
│ │  "Desarrollamos amenidades personalizadas..."        │ │
│ │  [Desarrollar mi proyecto ›]  [Contactar a un asesor›]│
│ │ ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ─  │ │
│ │  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] ...      │ │
│ │   ← Marquee infinito de partners →                  │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Secuencia de animación

| Delay | Elemento | Efecto |
|---|---|---|
| 0ms | Imagen de fondo | Ken Burns (scale 1.06 → 1.0) |
| 150ms | "Creamos productos" | Slide desde izquierda + fade |
| 420ms | "a la medida" | Slide desde izquierda + fade |
| 680ms | "de tu marca" | Slide desde izquierda + fade |
| 980ms | Glass panel + botones + marquee | Fade up |

La animación se dispara cuando el widget entra al viewport (IntersectionObserver).

---

## Integración en Webflow

### 1. HTML Embed (target)
```html
<div id="jypesa-hero-soluciones-widget"></div>
```

### 2. Script (Before `</body>` o en Embed)
```html
<script src="URL_DE_TU_WIDGET/hero-soluciones.js"></script>
```

### 3. Partners Marquee — Integración con CMS

El widget lee automáticamente los logos del marquee desde la misma
**Collection List** que usa `partners-marquee.js`. Sólo necesitas:

**En la página de Webflow**, añade tu Collection List con `display: none` y las clases:
```
Collection wrapper: jypesa-partners-marquee-cms-source
Collection item:    w-dyn-item
Logo image:         jypesa-partners-marquee-cms-img
```

> **Si ya tienes esa colección en la misma página** (porque usas `partners-marquee.js`
> en otro lugar de la página), el widget la reutiliza automáticamente.
> No necesitas añadir una segunda colección.

**Si el widget no encuentra la colección CMS**, usa automáticamente los
17 logos de fallback hardcodeados en el JS.

---

## Variantes de color del marquee

El widget por defecto usa `filter: brightness(0) invert(1)` (logos en blanco).
Puedes modificarlo en la clase `.jhs-marquee-item img` dentro del CSS del widget.

---

## Breakpoints responsive

| Breakpoint | Comportamiento |
|---|---|
| ≥ 1281px | Full desktop (fuentes `clamp` hasta 68px / 86px italic) |
| 1025–1280px | Laptops pequeñas (padding reducido, mismas fuentes clamp) |
| ≤ 1024px | Laptop/tablet landscape (padding 40px, logos marquee 32px) |
| ≤ 768px | Tablet portrait (padding 28px, logos 28px) |
| ≤ 480px | Mobile (padding 20px, logos 24px, marquee más rápido) |
