# Textos responsivos del widget Sistemas de Dispensación

## Objetivo

Evitar que el título, descripción o botón de `widgets/sistemas-dispensacion/sistemas-dispensacion.js` se desborden, queden recortados o se superpongan con las imágenes en cualquier ancho de pantalla, tanto en español como en inglés.

## Diseño

- La columna central se convertirá en el contexto de tamaño para su contenido tipográfico.
- El título calculará su escala con base en el ancho disponible de esa columna, con límites mínimos y máximos legibles.
- Las líneas del título dejarán de usar `white-space: nowrap` y podrán dividirse naturalmente en espacios.
- Título, descripción, subtítulo y botón tendrán `max-width: 100%` y reglas seguras de ajuste de palabras.
- El botón podrá envolver su texto sin separar incorrectamente el icono.
- En móvil se conservará el layout actual, pero se reemplazarán tamaños fijos por límites fluidos donde sea necesario.
- Se conservarán textos, imágenes, colores, animaciones, enlaces y jerarquía visual actuales.

## Idiomas

Las mismas reglas se aplicarán a `data-lang="es"` y `data-lang="en"`. No se crearán excepciones visuales exclusivas para una frase o idioma.

## Verificación

- Pruebas de contrato para impedir el regreso de `nowrap` y exigir límites de ancho y tipografía fluida.
- Validación de sintaxis JavaScript.
- Preview local en español e inglés en anchos representativos de escritorio, laptop, tablet y móvil.

