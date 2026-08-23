# YHWH — Adivina la palabra agregando vocales

Juego estático para GitHub Pages, sin servidor.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño.
- `app.js`: lógica del juego.
- `palabras-es.js`: datos de las palabras.
- `texto-es.js`: textos visibles de la interfaz.

## Otro idioma

Para crear otra versión lingüística:

1. Copia `palabras-es.js` a `palabras-it.js`.
2. Traduce/adapta los datos.
3. Copia `texto-es.js` a `texto-it.js`.
4. En `app.js`, cambia los imports a los archivos del idioma correspondiente.

La lógica del juego no depende de un servidor.

## Datos

La estructura esperada es:

- categoría principal
- dificultad
- `fortext`
- subcategorías dentro de `words`
- siete palabras por categoría principal es la cantidad prevista por las reglas.

`help[i]` corresponde a `words[i]`.

## Comparación de respuestas

Se usa distancia de Levenshtein <= 1, ignorando mayúsculas, tildes y espacios repetidos. Por ello:

- `aire` = correcto
- `aires` = correcto
- `ire` = correcto
- `aira` = correcto
- `cosa` frente a `casas` = incorrecto

## GitHub Pages

Sube los cinco archivos principales al repositorio de GitHub Pages y abre la URL del sitio. No requiere npm, React ni build.


## Cambios de esta versión
- Pausa y reanudación del temporizador sin perder el tiempo restante.
- El botón de respuesta dice `RESPONDER`.
- Los aciertos parciales no revelan la solución completa: otorgan la mitad de los puntos y pasa el turno al jugador siguiente para completar la misma palabra.
- Las pistas son acumulativas. En la tercera ronda se mantienen visibles la pista/ayuda y la subcategoría, y a partir de ahí se agregan vocales.
- Los mensajes de correcto, parcial, incorrecto y tiempo agotado permanecen en un cuadro de confirmación hasta pulsar `CONTINUAR`.
