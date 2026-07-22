# Actualización de ubicaciones de Cobertura Global

## Objetivo

Reemplazar por completo las ubicaciones actuales de `widgets/cobertura-global/cobertura-global.js` con los registros del archivo `Copia de Mapa de distribuidores - Hoja 1.csv`, manteniendo el diseño visual del widget y preparando un preview local antes de cualquier publicación.

## Fuente de datos y normalización

- El CSV será la única fuente para nombres, tipos, direcciones, países y datos de contacto.
- Se corregirán errores de codificación y acentuación visibles, por ejemplo `México`, `Perú`, `Bogotá`, `Niña` y `Peñuelas`.
- Los tipos se presentarán como tres grupos: `Distribuidores`, `Oficinas` y `Fábrica`.
- `Black Dogs Hosp` se omitirá porque no contiene información geográfica suficiente.
- `Jypesa Colombia` se ubicará aproximadamente en Bogotá, Colombia.
- No se inventarán correos, URLs, direcciones ni nombres que no estén indicados por el CSV o por estas reglas aprobadas.

## Coordenadas

- Las coordenadas serán estáticas dentro del archivo JavaScript para que el widget no dependa de una API de geocodificación durante la carga.
- Cuando exista una dirección utilizable, se buscará la coordenada correspondiente con la mayor precisión práctica.
- Cuando no exista dirección exacta, se usará una coordenada aproximada basada en la ciudad, estado o país indicado.
- En ubicaciones repetidas o muy cercanas, el comportamiento actual del mapa combinará los grupos cuando corresponda y mantendrá disponible la información individual.

## Interfaz y comportamiento

- Se conservarán el mapa, animaciones, adaptación móvil y estilo visual actuales.
- La leyenda, listas y conteos se generarán desde los datos para evitar valores duplicados o desactualizados en el marcado HTML.
- Cada marcador abrirá un tooltip con nombre, tipo, ubicación y país cuando esos campos existan.
- El tooltip mostrará el correo o la URL de contacto únicamente cuando el CSV tenga un valor.
- Los correos se presentarán como enlaces `mailto:` y las URLs como enlaces web cuando la interacción del tooltip lo permita; en todos los casos el texto seguirá siendo legible.

## Tratamiento de datos incompletos

- Los campos vacíos se omitirán del tooltip sin dejar etiquetas ni espacios vacíos.
- Las ubicaciones con ciudad o estado, pero sin dirección, se representarán mediante coordenadas aproximadas.
- Los registros sin ningún dato geográfico inferible se excluirán del mapa.

## Verificación y preview

- Se validará que todos los registros elegibles del CSV aparezcan exactamente una vez en la estructura de datos.
- Se comprobarán los conteos por grupo y la ausencia de valores vacíos visibles en los tooltips.
- Se revisará el widget en escritorio y móvil mediante el preview local existente `cobertura-global.html`.
- Se entregará al usuario una URL local para revisar el resultado antes de subir o publicar cambios.

## Fuera de alcance

- No se desplegará ni publicará el widget.
- No se modificará el CSV original.
- No se rediseñará el mapa ni se añadirán filtros, buscador o nuevas interacciones fuera de lo necesario para mostrar los datos actualizados.
