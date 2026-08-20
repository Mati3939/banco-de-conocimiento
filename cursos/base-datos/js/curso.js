/* Metadatos de Base de Datos (IIP226W, 2026-2).
   Fuente: "Programa de Asignatura — Bases de Datos" (Canvas 2026-2), sección D
   (Unidades de Contenidos) para las unidades, y sección G para la bibliografía.

   NO hay calendarización semanal publicada para este ramo: a diferencia de los
   tres ramos de matemáticas, Canvas no trae un PDF con las 19 semanas. Por eso
   `semanas` va vacío y `evaluaciones` solo lista lo que el programa afirma
   ("tres certámenes y un examen", más proyecto semestral y tareas), SIN fechas
   inventadas. Nada de esto se muestra en pantalla (ver CONVENCIONES.md, "El
   calendario NO se muestra"); está acá para ordenar y delimitar el contenido. */
window.CURSO = {
  slug: 'base-datos',
  titulo: 'Base de Datos',
  emoji: '🗃️',
  codigo: 'IIP226W',
  semestre: '2026-2',
  bibliografia: 'Itzik Ben-Gan, «T-SQL Fundamentals» · Paige Jacobs, «Guía completa para principiantes de la programación SQL» · Dan Tow, «SQL Tuning»',
  unidades: {
    inicio: '',
    I: 'Introducción',
    II: 'Modelamiento',
    III: 'SQL nivel I',
    IV: 'SQL nivel II'
  },
  /* Sin fechas: el programa dice cuántas evaluaciones hay, no cuándo. */
  evaluaciones: [
    { id: 'certamen-1', nombre: 'Certamen 1', fecha: 'sin fecha publicada',
      temas: ['Introducción a las bases de datos', 'Modelamiento: MER y diccionario de datos'] },
    { id: 'certamen-2', nombre: 'Certamen 2', fecha: 'sin fecha publicada',
      temas: ['Normalización', 'SQL nivel I: DDL y DML'] },
    { id: 'certamen-3', nombre: 'Certamen 3', fecha: 'sin fecha publicada',
      temas: ['SQL nivel II: cursores, triggers y T-SQL'] },
    { id: 'proyecto', nombre: 'Proyecto semestral', fecha: 'sin fecha publicada',
      temas: ['Diseño e implementación de una base de datos sobre un caso real'] }
  ],
  reglas: [
    'Tres certámenes y un examen final (programa, sección F).',
    'Se evalúa además con rúbricas, proyecto semestral y tareas.',
    'Prerrequisito: Taller de Obtención y Preparación de Datos.',
    '8 créditos · 1 módulo teórico + 1 práctico + 1 de ayudantía por semana.'
  ],
  semanas: []
};
