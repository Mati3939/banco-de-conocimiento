registerModule({
  id: 'mer', title: 'El modelo entidad-relación', unidad: 'II',
  semanas: [2], evaluacion: ['certamen-1'],
  lead: 'Un diagrama que muestra cómo se relacionan entre sí las colecciones de datos de un sistema. Se lee como una oración: las entidades son sustantivos y las relaciones son verbos.',
  build(sec) {

    /* -------- Card 1: qué es -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Qué es'));
    c1.append(el('p', {}, 'El modelo entidad-relación —también llamado ', el('b', {}, 'diagrama entidad-relación'), '— es un tipo de diagrama de flujo que ilustra cómo colecciones de datos llamadas entidades se relacionan entre sí dentro de un sistema.'));
    c1.append(el('p', {}, 'Se usa para diseñar o depurar bases de datos relacionales, en ingeniería de software, sistemas de información empresarial, educación e investigación. Emplea un conjunto definido de símbolos: rectángulos, rombos, óvalos y líneas de conexión.'));
    c1.append(el('div', { class: 'formula' },
      el('p', { style: 'margin:0' }, 'Los MER son un reflejo de la estructura gramatical: las ', el('b', {}, 'entidades'), ' funcionan como sustantivos y las ', el('b', {}, 'relaciones'), ' como verbos.')));
    c1.append(el('p', { class: 'note' }, 'Esa frase es la herramienta más práctica de toda la unidad. Ante un enunciado, subrayar los sustantivos da los candidatos a entidad y subrayar los verbos da los candidatos a relación. Es literalmente el primer paso del proceso, y se retoma en ', el('b', {}, 'Cómo se construye un MER'), '.'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03 — Modelamiento y predicción», diapositiva 5, Canvas 2026-2. La lectura de la frase gramatical como técnica de subrayado es propia.'));
    sec.append(c1);

    /* -------- Card 2: historia -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Un poco de arqueología informática'));
    c2.append(el('ul', {},
      el('li', {}, el('b', {}, '1976.'), ' Peter Pin-Shan Chen publica «Modelo entidad-relación: hacia una visión unificada de los datos», mientras era profesor adjunto en la Escuela Sloan de Administración del MIT.'),
      el('li', {}, el('b', {}, 'Décadas del 60 y 70.'), ' Charles Bachman y A.P.G. Brown trabajan en los antecesores del enfoque de Chen. Bachman desarrolla un tipo de diagrama de estructura de datos que lleva su nombre: el ', el('b', {}, 'diagrama de Bachman'), '. Brown publica sobre el modelado de sistemas del mundo real.'),
      el('li', {}, el('b', {}, 'Después.'), ' James Martin agrega mejoras al ERD.')
    ));
    c2.append(el('p', { class: 'note' }, 'El trabajo de Chen, Bachman, Brown, Martin y otros también contribuyó al desarrollo de ', el('b', {}, 'UML'), ', el lenguaje que usa preferentemente la programación orientada a objetos. Vale decir: el diagrama de clases que se vio en programación y el MER son primos.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03», diapositiva 4, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: los tres tipos -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Los tres tipos de MER'));
    c3.append(el('p', {}, 'Van de menos a más detalle. No son alternativas: son etapas del mismo diseño.'));

    const merTipos = Mer(c3, {
      alto: 200, titulo: 'Del modelo conceptual al físico',
      entidades: [
        { id: 'conc', txt: 'Conceptual', x: .17, y: .55, paso: 0, lado: 'arriba', abanico: 0, radio: 100,
          attrs: [{ t: 'alcance global' }] },
        { id: 'log', txt: 'Lógico', x: .5, y: .55, paso: 1, lado: 'arriba', abanico: 0, radio: 100,
          attrs: [{ t: 'sin tecnología' }] },
        { id: 'fis', txt: 'Físico', x: .83, y: .55, paso: 2, lado: 'arriba', abanico: 0, radio: 100,
          attrs: [{ t: 'con tecnología' }] }
      ],
      relaciones: [
        { id: 'r1', txt: 'detalla', x: .335, y: .55, de: 'conc', a: 'log', card: ['1', 'N'], paso: 1 },
        { id: 'r2', txt: 'implementa', x: .665, y: .55, de: 'log', a: 'fis', card: ['1', 'N'], paso: 2 }
      ]
    });

    new Stepper(c3, [
      {
        d: '<b>Modelo de datos conceptual.</b> La visualización de nivel más alto, con la menor cantidad de detalle. Su valor es mostrar el alcance global del modelo y representar la arquitectura del sistema. Se emplea en sistemas de gran tamaño.',
        run: async () => { merTipos.hasta(0); merTipos.resaltar(['conc']); }
      },
      {
        d: '<b>Modelo de datos lógico.</b> Contiene más detalle: se definen las entidades transaccionales y operativas. Es <b>independiente de la tecnología</b> en la que se vaya a implementar.',
        run: async () => { merTipos.hasta(1); merTipos.resaltar(['log']); }
      },
      {
        d: '<b>Modelo de datos físico.</b> Entrega los detalles tecnológicos para implementar la base. De cada modelo lógico pueden salir <b>uno o más</b> modelos físicos — por eso la cardinalidad 1:N.',
        run: async () => { merTipos.hasta(2); merTipos.resaltar(['fis']); }
      }
    ], () => { merTipos.hasta(-1); merTipos.limpiarMarcas(); }, 'mer');

    c3.append(el('p', { class: 'note' }, 'Lo que se dibuja en los ejercicios de este curso es, casi siempre, un modelo ', el('b', {}, 'lógico'), ': tiene entidades, atributos, claves y cardinalidades, pero todavía no dice si va a correr en SQL Server o en PostgreSQL.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03», diapositivas 6 y 7, Canvas 2026-2. El diagrama, las cardinalidades entre etapas y la observación final son propios: las diapositivas describen los tres tipos como lista.'));
    sec.append(c3);

    /* -------- Card 4: resumen -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'Lo que hay que llevarse'));
    c4.append(el('ul', {},
      el('li', {}, 'Un MER permite estructurar una base de datos relacional.'),
      el('li', {}, 'Existen tres tipos de MER: conceptual, lógico y físico.'),
      el('li', {}, 'Un diccionario de datos permite predecir las necesidades de espacio en disco para la operación de un sistema.')
    ));
    c4.append(el('p', { class: 'note' }, 'La tercera es la que sorprende: el diccionario no es solo documentación, es una herramienta de estimación. Está desarrollada en el tema ', el('b', {}, 'Diccionario de datos'), '.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03», diapositiva 16 (resumen), Canvas 2026-2.'));
    sec.append(c4);
  }
});
