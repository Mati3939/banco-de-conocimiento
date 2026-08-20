registerModule({
  id: 'diccionario', title: 'Diccionario de datos', unidad: 'II',
  semanas: [2, 3], evaluacion: ['certamen-1'],
  lead: 'La especificación de cada atributo del modelo. Sirve para crear las tablas físicas, y —esto es lo que sorprende— para predecir cuánto disco va a necesitar el sistema.',
  build(sec) {

    /* -------- Card 1: qué es y qué columnas lleva -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Qué es'));
    c1.append(el('p', {}, 'Un diccionario de datos es una ', el('b', {}, 'especificación de los atributos'), ' de las entidades que conforman la base de datos. Es la descripción de los atributos y tablas que conforman un MER.'));
    c1.append(el('p', {}, 'Por cada atributo se establece:'));
    c1.append(el('ul', {},
      el('li', {}, 'Nombre'), el('li', {}, 'Tipo de datos'), el('li', {}, 'Descripción'),
      el('li', {}, 'Clave primaria'), el('li', {}, 'Clave foránea')
    ));
    c1.append(el('p', { class: 'note' }, 'La plantilla que usa la clase agrega dos columnas a esa lista: ', el('b', {}, 'Entidad'), ' al principio (para saber a qué tabla pertenece el atributo) y ', el('b', {}, 'Nulo'), ' al final (si el atributo admite quedar vacío). Esas siete columnas son las que hay que reproducir en los ejercicios.'));
    c1.append(el('p', {}, 'Para qué sirve, según la clase:'));
    c1.append(el('ul', {},
      el('li', {}, 'Definir la estructura de las ', el('b', {}, 'tablas físicas'), ' que se crearán en la base de datos.'),
      el('li', {}, 'Calcular el ', el('b', {}, 'costo total del espacio'), ' requerido en disco, según el volumen de registros del sistema.')
    ));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03 — Modelamiento y predicción», diapositivas 13 y 15, y «Bases de datos 04 — Diseño y previsión», diapositiva 18, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: el ejemplo de la clase -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'El ejemplo de la clase'));
    c2.append(el('p', {}, 'Tres atributos de la entidad Trabajador del caso de pensiones. Esta tabla está copiada tal cual de la diapositiva:'));

    Diccionario(c2, [
      ['Trab', 'Nombre', 'String[50]', 'Nombre del individuo', 'No', 'No', 'No'],
      ['Trab', 'Rut', 'String[20]', 'Rut del individuo', 'Sí', 'No', 'No'],
      ['Trab', 'Direccion', 'String[100]', 'Direccion del individuo', 'No', 'No', 'Sí']
    ]);

    c2.append(el('p', { class: 'note' }, 'Fijate en la fila del RUT: es la única con Sí en PK. Y en la de Dirección: es la única con Sí en Nulo — puede quedar vacía. Esa combinación (qué identifica y qué puede faltar) es la mitad de lo que se le pide al diccionario.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositiva 20 (tabla literal, incluidas las palabras sin tilde del original), Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: el cálculo de espacio -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Calcular el espacio en disco'));
    c3.append(el('p', {}, 'Este es el uso del diccionario que no es obvio. Con los tipos de datos de arriba y el volumen de registros del caso, sale una cifra concreta.'));
    c3.append(el('p', {}, el('b', {}, 'Los atributos nulos también se consideran en el cálculo'), ': el espacio se reserva igual, esté o no el dato.'));

    Pasos(c3, [
      { tex: '\\text{largo del registro} = \\text{nombre} + \\text{rut} + \\text{direccion}', nota: 'Se suman los largos declarados en el diccionario.' },
      { tex: '\\text{largo del registro} = 50 + 20 + 100', nota: 'String[50], String[20] y String[100]. Dirección entra aunque sea nula.' },
      { tex: '\\text{largo del registro} = 170\\ \\text{bytes}', nota: 'Un registro de Trabajador pesa 170 bytes.' },
      { tex: '\\text{fuerza laboral (año 2000)} = 5{.}000{.}000', nota: 'Dato del enunciado del caso de estudio.' },
      { tex: '\\text{espacio total} = 170 \\times 5{.}000{.}000', nota: 'Largo del registro por cantidad de registros.' },
      { tex: '\\text{espacio total} = 850{.}000{.}000\\ \\text{bytes} = 810{,}62\\ \\text{MB}', nota: 'La cifra final que da la clase.' }
    ], { modId: 'diccionario', titulo: 'Cálculo del espacio para la entidad Trabajador' });

    c3.append(el('p', { class: 'note' }, el('b', {}, 'Sobre los 810,62: '), 'la conversión es correcta si se divide por 1024 dos veces (850.000.000 ÷ 1.048.576 = 810,62). Esa unidad hoy se llama ', el('b', {}, 'MiB'), ' (mebibyte); el "MB" del sistema internacional divide por 1.000.000 y daría 850 MB. No es un error de la clase —es la convención de toda la vida en informática— pero conviene saber cuál de las dos se está usando si el resultado tiene que coincidir con lo que reporta un disco.'));

    c3.append(el('details', {},
      el('summary', {}, 'Ejercicio: ¿y con la fuerza laboral de 2020?'),
      el('div', {},
        el('p', {}, 'El enunciado dice que el 2020 la fuerza laboral era de 8 millones. Con el mismo registro de 170 bytes:'),
        el('p', { class: 'formula', html: '$$170 \\times 8{.}000{.}000 = 1{.}360{.}000{.}000\\ \\text{bytes}$$' }),
        el('p', {}, 'Dividiendo dos veces por 1024: ', el('b', {}, '1.297,00 MiB'), ', o sea ', el('b', {}, '1,27 GiB'), ' solo para la tabla de trabajadores, sin contar aportes ni empleadores.'),
        el('p', { class: 'note' }, 'Y ahí se ve para qué sirve el ejercicio: la tabla de ', el('b', {}, 'Aporte'), ' tiene un registro por trabajador ', el('em', {}, 'por mes'), '. Doce por año, veinte años: el maestro pesa gigabytes y la transacción pesa terabytes. Esa asimetría es la razón por la que se separan maestros de transacciones.')
      )));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositivas 19 y 20, Canvas 2026-2 (el cálculo de los 5 millones es literal de la diapositiva). El cálculo para 2020, la nota sobre MB/MiB y la observación final sobre el peso de las transacciones son propios.'));
    sec.append(c3);

    /* -------- Card 4: plantilla vacía -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'La plantilla, para copiar'));
    c4.append(el('p', {}, 'Cada ejercicio de MER del curso pide el diagrama ', el('b', {}, 'y'), ' el diccionario. Esta es la estructura que hay que llenar:'));
    Diccionario(c4, [
      ['…', '…', '…', '…', '…', '…', '…']
    ]);
    c4.append(el('p', { class: 'note' }, 'Un par de criterios que ahorran correcciones: el tipo de datos se declara con largo (', el('b', {}, 'String[50]'), ', no "texto"); la clave foránea se marca en la entidad que la ', el('em', {}, 'recibe'), ', no en la que la emite; y una clave primaria nunca puede ser nula.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositiva 18 (tabla vacía), Canvas 2026-2. Los tres criterios son propios, deducidos de las reglas de clave primaria y foránea de la diapositiva 9 del mismo archivo.'));
    sec.append(c4);
  }
});
