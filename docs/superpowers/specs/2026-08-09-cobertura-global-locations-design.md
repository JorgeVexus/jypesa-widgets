# Actualización de ubicaciones de Cobertura Global

## Objetivo

Actualizar `widgets/cobertura-global/cobertura-global.js` para mostrar únicamente las oficinas de representación, fábricas Jypesa y fábricas asociadas indicadas por Jypesa. El widget deberá usar la misma información en el mapa y en sus listados, mostrar tooltips mínimos y funcionar en español e inglés mediante `data-lang`.

## Modelo de datos

Cada ubicación tendrá una categoría estable, ciudad, país, coordenadas y etiquetas localizadas. No contendrá direcciones, contactos, correos electrónicos ni URLs.

Las categorías internas serán:

- `representativeOffices`
- `jypesaFactories`
- `associatedFactories`

## Ubicaciones

### Oficinas de representación (14)

1. Guadalajara, México
2. Cancún, México
3. Punta Cana, República Dominicana
4. Kingston, Jamaica
5. Las Vegas, Estados Unidos
6. Dallas, Estados Unidos
7. Ciudad de Guatemala, Guatemala
8. San José, Costa Rica
9. Bogotá, Colombia
10. Lima, Perú
11. Santiago, Chile
12. Alicante, España
13. Guangzhou, China
14. Sydney, Australia

### Fábricas Jypesa (3)

1. Guadalajara, México
2. Toledo, España
3. Yangzhou, China

### Fábricas asociadas (3)

1. Medellín, Colombia
2. Buenos Aires, Argentina
3. Kuala Lumpur, Malasia

El fragmento `Améri` recibido entre ubicaciones se considera texto accidental y no se incluirá.

## Idiomas

`data-lang="es"` mostrará las categorías y países en español. `data-lang="en"` mostrará:

- `Representative Offices`
- `Jypesa Factories`
- `Associated Factories`
- Mexico, Dominican Republic, Jamaica, United States, Guatemala, Costa Rica, Colombia, Peru, Chile, Spain, China, Australia, Argentina y Malaysia.

Los nombres propios de las ciudades se mantienen, salvo las convenciones ortográficas normales del idioma: `Cancún`/`Cancun`, `Ciudad de Guatemala`/`Guatemala City`, `San José`/`San Jose`, `Bogotá`/`Bogota`, `Lima`, `Santiago`, `Alicante`, `Guangzhou`, `Sydney`, `Toledo`, `Yangzhou`, `Medellín`/`Medellin`, `Buenos Aires` y `Kuala Lumpur`.

Si el atributo no existe o su valor no es compatible, el widget conservará su detección actual por `<html lang>`, ruta `/en/` y, finalmente, español como fallback.

## Presentación e interacción

- Cada una de las tres categorías conservará un color de pin distinto.
- El listado de escritorio, el listado móvil y el mapa consumirán la misma fuente de datos.
- Cada etiqueta visible tendrá el formato `Ciudad, País` según el idioma activo.
- Al hacer hover, foco o selección sobre un pin, el tooltip mostrará únicamente `Ciudad, País`.
- Se eliminarán del tooltip los rótulos de ubicación, país/región y contacto, así como enlaces clicables.
- El mapa conservará su proyección, animaciones, interacción responsiva y comportamiento visual existente.

## Pruebas

Las pruebas automatizadas verificarán:

1. Exactamente 20 ubicaciones, distribuidas como 14 oficinas, 3 fábricas Jypesa y 3 fábricas asociadas.
2. Coordenadas numéricas para todos los pines.
3. Ausencia de propiedades de dirección, contacto y URL.
4. Traducción de categorías, ciudades convencionales y países para `data-lang="en"`.
5. Español por defecto y fallback para valores no soportados.
6. Tooltips reducidos a una sola etiqueta localizada.
7. Uso de las tres categorías tanto en el listado como en los pines del mapa.

## Fuera de alcance

- Cambiar el diseño general, tipografía, proyección o animaciones del mapa.
- Añadir nuevas páginas, enlaces o integraciones externas.
- Publicar el código o modificar Webflow desde esta tarea.

