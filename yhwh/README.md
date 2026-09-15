# YHWH — Adivina la palabra agregando vocales

Juego estático para GitHub Pages, sin servidor.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño.
- `app.js`: lógica del juego.
- `palabras-es.js`: datos de las palabras.
- `texto-es.js`: textos visibles de la interfaz.

## Otro idioma

Para crear otra versión lingüística XX:

1. Traduce/adapta `palabras-es.js` a `palabras-XX.js`.
2. Traduce/adapta `texto-es.js` a `texto-it.js`.
3. Quiza En `app.js`, cambia los imports a los archivos del idioma correspondiente.

La lógica del juego no depende de un idioma.

### Traducciones

respetar mayúsculas y minúsculas del texto original
- Italiano:
confirmación: crecima
prohibido: proibido
pureza: purezza, no purita
fariseos: farisei no parisei
ENCARNÓ: si è INCARNATO
dar ropa: dare abiti
SEÑOR mio & DIOS mio: mio SIGNORE & mio DIO
'&' se traduce '&'

-Ingles:
A.T. -> O.T.
tolerar : tolerate
PUERTAS cerradas: closed GATES
respeto: respect
TEMOR:FEAR (no FEAR OF THE LORD)
HIDRATAR: HIDRATE (no GIVE DRINK)
SEÑOR mio & DIOS mio: my LORD & my GOD (no MY LORD & MY GOD)
SEMANA Santa: Holy WEEK
SANTO de Dios: HOLY one
ANCIANIDAD ; ELDERLY

## Datos

La estructura esperada es:
- categoría (principal)
- `fortext`: descripción de la categoría
- dificultad: nivel
- tags
- categoría dentro de `words` (subcategoría)
	- en general son dos subcategorías por categoría
- en general siete palabras por categoría principal, tres en una subcategoría y cuatro en la otra.

`help[i]` corresponde a `words[i]`.

## Comparación de respuestas

### Palabras de 4 letras o más
Se usa distancia de Levenshtein <= 1, ignorando mayúsculas, tildes y espacios repetidos. 
Por ejemplo, si la palabra es `aire`:
- `aires` = correcto
- `ire` = correcto
- `aira` = correcto
- `aaires`  = incorrecto


### Palabras de 3 letras o menos
Igualdad estricta. Por ejemplo, si la palabra es`rey`:
- `ray`: incorrecto
- `erey`: incorrecto

## GitHub Pages

Sube los cinco archivos principales al repositorio de GitHub Pages y abre la URL del sitio. No requiere npm, React ni build.


## Reglas de juego

### Botón información
  <p>1. Intenta adivinar las palabras en MAYÚSCULA agregando las vocales que le faltan (+3 puntos por palabra)</p>
  <p>2. Bonus: Adivinar la categoría a la que pertenece (+1 punto)</p>
  <p>3. Si no aciertas, el turno pasará al siguiente jugador.</p>
  <p>4. Si ningún jugador acierta, se termina la ronda y se revelan pistas y/o vocales para volver a intentar</p>
  <p>5. Puedes usar el botón "REVELAR PISTA" para forzar una pista inmediata a cambio de 1 punto.</p>


## Opciones de configuración

### Botón de configuración
- Tiempo de cada turno
- Número de Rondas máximo para adivinar una palabra
- cantidad de categorias
- cantidad de jugadores

### Despliege de banderas
- Idioma

## Cambios de esta versión