# Smart Order solo en el menú español

## Objetivo

Ocultar el enlace `Smart Order` del menú principal cuando el widget se renderiza en inglés, conservándolo sin cambios en español.

## Comportamiento

- Con `data-lang="es"`, el menú seguirá mostrando `Smart order` con la URL `https://sm.jypesa.com/jypesa/public/login`.
- Con `data-lang="en"`, el enlace no se incluirá en el HTML generado.
- La detección automática de idioma existente seguirá determinando el mismo resultado cuando `data-lang` no esté definido.
- El botón de contacto y el selector de idioma conservarán su estructura y posición.
- No se utilizará CSS para esconder el enlace: se aplicará render condicional para que el elemento tampoco exista en el DOM inglés.

## Alcance técnico

Se modificará `widgets/navegacion-principal/navegacion-principal.js` para generar el bloque `Smart Order` únicamente cuando `lang === 'es'`. Se añadirá una prueba automatizada que valide su presencia en español y su ausencia en inglés.

## Fuera de alcance

- Cambiar la URL, texto o estilo de `Smart Order` en español.
- Añadir el enlace al menú móvil.
- Modificar otros elementos o rutas de navegación.

