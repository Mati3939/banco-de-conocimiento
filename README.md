# Banco de conocimiento — Biblioteca

Biblioteca web interactiva construida sobre un vault de notas atómicas de
**Ingeniería Civil en Informática**: resúmenes por ramo, fórmulas en LaTeX,
visualizaciones animadas y ejercicios resueltos.

**Sitio publicado:** https://Mati3939.github.io/banco-de-conocimiento/

## Qué incluye

17 cursos, cada uno con su página completa organizada por unidades:

| Semestre | Cursos |
|---|---|
| 1 | Introducción al Cálculo · Álgebra · Geometría · Taller de Programación |
| 2 | Cálculo Diferencial · Álgebra Lineal · Física · Desafíos de Programación |
| 3 | Cálculo Integral · Análisis Exploratorio de Datos · Obtención de Datos · Diseño de Servicios · Visualización de Datos · Bootcamp de Lenguajes |
| Futuros | Cálculo Multivariable · Ecuaciones Diferenciales · Probabilidades |

Cada página de curso contiene resumen por unidades, fórmulas renderizadas con
KaTeX, simulaciones interactivas en canvas con controles, ejemplos trabajados y
ejercicios con solución desplegable.

La portada es una **constelación animada**: un grafo en canvas donde cada nodo
es un curso, agrupados en órbitas por semestre. Buscador global con `Ctrl+K`
sobre un índice de ~400 entradas.

## Cómo funciona

Sitio **100 % estático, sin paso de build**. Todas las dependencias están
vendorizadas en `assets/vendor/` (KaTeX, GSAP, fuentes), así que no hace ni una
sola petición a servidores externos y funciona offline.

```
index.html              portada (constelación + buscador)
assets/css/             observatorio.css (v3) · estilo.css (v2)
assets/js/              observatorio.js · nucleo.js
assets/vendor/          KaTeX, GSAP y fuentes (locales)
cursos/<ramo>/
  index.html            página del curso
  indice-curso.js       entradas de ese curso para el buscador global
```

## Correrlo localmente

```bash
node servir.mjs
```

Y abrir http://localhost:8080. En Windows también sirve el atajo
`Servir Biblioteca.bat`.

## Créditos

Contenido y desarrollo: Matías Pino. Las notas son elaboración propia a partir
de las clases; el material oficial de los cursos no se incluye en este repositorio.
