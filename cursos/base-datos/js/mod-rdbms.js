registerModule({
  id: 'rdbms', title: 'RDBMS: qué significa "relacional"', unidad: 'I',
  semanas: [1], evaluacion: ['certamen-1'],
  lead: 'Un gestor de bases de datos relacionales administra las operaciones sobre la base. La palabra que hay que desarmar es "relacional": no se refiere a las tablas, se refiere al sentido lógico entre los datos.',
  build(sec) {

    /* -------- Card 1: qué administra un RDBMS -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'El nombre completo'));
    c1.append(el('p', {}, 'No es "gestor de bases de datos" a secas: es ', el('b', {}, 'Sistema de Gestión de Bases de Datos Relacionales'), ' — RDBMS, por sus siglas en inglés.'));
    c1.append(el('p', {}, 'Se encarga de administrar las operaciones sobre la base: creación, actualización, acceso, y todo lo demás.'));
    c1.append(el('p', { class: 'note' }, 'Los más conocidos, según la clase: ', el('b', {}, 'Oracle, DB2, MySQL y PostgreSQL'), '. En este curso el SQL que se va a escribir es T-SQL, el dialecto de SQL Server (por eso la bibliografía obligatoria es el Ben-Gan).'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02 — Centralización y propagación», diapositivas 4 y 16, Canvas 2026-2. La observación sobre T-SQL sale del programa de la asignatura (bibliografía obligatoria) y de la Unidad IV, no de esta diapositiva.'));
    sec.append(c1);

    /* -------- Card 2: qué son datos relacionados -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Primera lectura: datos que se relacionan entre sí'));
    c2.append(el('p', {}, 'Datos relacionados son ', el('b', {}, 'los que mantienen un sentido lógico entre sí'), '. Tres ejemplos de la clase:'));
    c2.append(el('ul', {},
      el('li', {}, 'Los datos financieros de una persona.'),
      el('li', {}, 'Los datos biológicos de una especie animal.'),
      el('li', {}, 'Los datos químicos de un metal.')
    ));
    c2.append(el('p', { class: 'note' }, 'Esto es lo mismo que "no se mezclan peras con manzanas" del tema ', el('b', {}, '¿Qué es una base de datos?'), ', visto desde adentro de un registro: lo que agrupa a esos datos es que hablan de la misma cosa.'));
    c2.append(el('p', {}, 'Pero la clase avisa que esa es solo la ', el('b', {}, 'primera'), ' lectura.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositivas 5 a 7, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: segunda lectura, grupos que se relacionan -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Segunda lectura: grupos que se relacionan con otros grupos'));
    c3.append(el('p', {}, 'También se relacionan ', el('b', {}, 'agrupaciones'), ' de datos que a primera vista no tienen nada que ver. Tres frases, y lo que aparece adentro de cada una:'));

    const analisis = el('details', { open: '' },
      el('summary', {}, 'Una persona X se inscribe en un curso de bases de datos dictado por una universidad'),
      el('div', {},
        el('ul', {},
          el('li', {}, 'Datos de la persona'),
          el('li', {}, 'Datos del programa de estudios'),
          el('li', {}, 'Datos de la universidad'),
          el('li', {}, 'Datos del docente')
        )
      ));
    c3.append(analisis);
    c3.append(el('details', {},
      el('summary', {}, 'Un gato Y es atendido por un veterinario'),
      el('div', {},
        el('ul', {},
          el('li', {}, 'Datos del gato'),
          el('li', {}, 'Datos del veterinario'),
          el('li', {}, 'Datos de la clínica'),
          el('li', {}, 'Datos de la malla de estudios del veterinario'),
          el('li', {}, 'Datos de la universidad donde estudió el veterinario')
        )
      )));
    c3.append(el('details', {},
      el('summary', {}, 'Un astrónomo A registra información de un quásar Q'),
      el('div', {},
        el('ul', {},
          el('li', {}, 'Datos del astrónomo'),
          el('li', {}, 'Datos del observatorio'),
          el('li', {}, 'Datos del plan de estudios del astrónomo'),
          el('li', {}, 'Datos de la universidad del astrónomo'),
          el('li', {}, 'Datos del quásar')
        )
      )));
    c3.append(el('p', { class: 'note' }, 'Fijate en el patrón: en las tres, una frase de una línea esconde entre cuatro y cinco grupos distintos. Ese desarme es exactamente el ', el('b', {}, 'levantamiento'), ' que se hace al construir un MER — el primer paso del tema ', el('b', {}, 'Cómo se construye un MER'), '.'));
    c3.append(el('p', {}, 'Cuando dos grupos se tocan, la clase dice que estamos frente a una ', el('b', {}, 'transacción'), '.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositivas 7 a 10, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: maestros vs transacciones -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'Maestros y transacciones'));
    c4.append(el('p', {}, 'Aparecen entonces dos tipos de grupos de datos. Esta distinción se usa todo el semestre, incluso para decidir si una clave primaria va a ser simple o compuesta.'));

    const merPrestamo = Mer(c4, {
      alto: 230, titulo: 'Persona toma un préstamo con una financiera',
      entidades: [
        { id: 'persona', txt: 'Persona', x: .16, y: .52, paso: 0, lado: 'arriba', abanico: 96, radio: 104,
          attrs: [{ t: 'rut', pk: 1 }, { t: 'nombre' }] },
        { id: 'financiera', txt: 'Financiera', x: .85, y: .52, paso: 0, lado: 'arriba', abanico: 96, radio: 104,
          attrs: [{ t: 'id_fin', pk: 1 }, { t: 'razón social' }] }
      ],
      relaciones: [
        { id: 'prestamo', txt: 'Préstamo', x: .505, y: .52, de: 'persona', a: 'financiera', card: ['1', 'N'], paso: 1 }
      ]
    });

    new Stepper(c4, [
      {
        d: 'Los dos <b>maestros</b>. Tienden a ser inmutables: se actualizan poco. Se identifican de manera unívoca. Describen activos — personas, inmuebles, patrimonio.',
        run: async () => { merPrestamo.hasta(0); merPrestamo.resaltar(['persona', 'financiera']); }
      },
      {
        d: 'La <b>transacción</b>: «una persona X toma un préstamo por $1.000.000 con la financiera Y». Registra una operación <b>entre</b> maestros, opera siempre con al menos dos, y normalmente lleva asociada la fecha y hora que originó el registro.',
        run: async () => { merPrestamo.hasta(1); merPrestamo.resaltar(['prestamo']); }
      }
    ], () => { merPrestamo.hasta(0); merPrestamo.limpiarMarcas(); }, 'rdbms');

    c4.append(el('p', { class: 'note' }, el('b', {}, 'Regla de bolsillo: '), 'si el grupo describe algo que ', el('b', {}, 'es'), ', es maestro. Si describe algo que ', el('b', {}, 'pasó'), ', es transacción. Y si pasó, lleva fecha.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositivas 10 y 11, Canvas 2026-2. El diagrama y la regla de bolsillo son propios; la diapositiva presenta el ejemplo del préstamo como lista de tres grupos, sin dibujarlo.'));
    sec.append(c4);

    /* -------- Card 5: la definición completa -------- */
    const c5 = el('div', { class: 'card' });
    c5.append(el('h3', {}, 'Entidad, y la definición larga'));
    c5.append(el('p', {}, 'Los grupos de datos relacionados entre sí se llaman ', el('b', {}, 'entidades'), '. Las entidades se relacionan con otras entidades, y de ahí sale información nueva: la transacción.'));
    c5.append(el('p', {}, 'Con eso, la definición completa que da la clase:'));
    c5.append(el('div', { class: 'formula' },
      el('p', { style: 'margin:0' }, 'Un RDBMS gestiona bases de datos que implementan un control de duplicidad sobre entidades conformadas por datos que tienen sentido lógico entre sí, y que a su vez interactúan con otras entidades generando nuevas transacciones.')));
    c5.append(el('p', { class: 'note' }, 'Este tipo de base se usa en cualquier industria que necesite llevar registro y control estadístico de sus transacciones. El ejemplo que da la clase es el mundo financiero, y no es casual: es el que más transacciones genera por maestro.'));
    c5.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositiva 12, Canvas 2026-2. La definición está transcrita quitando una repetición del original ("control de duplicidad controlada"); el resto es literal.'));
    sec.append(c5);
  }
});
