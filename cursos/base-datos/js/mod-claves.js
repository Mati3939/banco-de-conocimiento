registerModule({
  id: 'claves', title: 'Claves primarias y foráneas', unidad: 'II',
  semanas: [2], evaluacion: ['certamen-1'],
  lead: 'La clave primaria contesta "¿cuál de todos?". La foránea es esa misma clave viajando a otra entidad, y es el mecanismo concreto con el que la base impone integridad referencial.',
  build(sec) {

    /* -------- Card 1: por qué hace falta una clave -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Por qué no alcanza con el nombre'));
    c1.append(el('p', {}, 'Un ', el('b', {}, 'atributo'), ' es un elemento que describe a otro: NOMBRE describe a PERSONA. Pero la clase lo pone a prueba enseguida: ¿cuántos Juanes, Álex, Benjamines y Lucas existen?'));
    c1.append(el('p', {}, 'Hace falta entonces un atributo ', el('b', {}, 'único e irrepetible (unívoco)'), ' que permita identificar a una persona. Por ejemplo, el RUT identifica a Álex. Ese tipo de atributo se llama ', el('b', {}, 'clave primaria'), '.'));
    c1.append(el('p', { class: 'note' }, 'En el diagrama se marca subrayando el nombre del atributo; en el diccionario de datos, con una columna PK.'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04 — Diseño y previsión», diapositiva 7, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: simple vs compuesta -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Simple o compuesta'));
    c2.append(el('p', {}, 'Una clave primaria (id o #) puede ser de dos formas:'));
    c2.append(el('ul', {},
      el('li', {}, el('b', {}, 'Simple'), ' — se conforma por un solo atributo.'),
      el('li', {}, el('b', {}, 'Compuesta'), ' — se conforma por dos o más atributos, que juntos identifican el registro.')
    ));
    c2.append(el('div', { class: 'formula' },
      el('p', { style: 'margin:0' }, 'Las claves primarias ', el('b', {}, 'simples'), ' se usan en entidades ', el('b', {}, 'maestras'), '. Las ', el('b', {}, 'compuestas'), ' se suelen usar en entidades de ', el('b', {}, 'transacción'), '.')));
    c2.append(el('p', { class: 'note' }, 'Ahí se cierra el círculo con la distinción maestro/transacción del tema ', el('b', {}, 'RDBMS: qué significa "relacional"'), '. Un maestro es una cosa: le basta un identificador. Una transacción es un cruce entre cosas: se identifica por quiénes se cruzaron y cuándo — y eso son varios atributos.'));
    c2.append(el('p', {}, 'Ejemplo del caso de pensiones que se modela en clase: un ', el('b', {}, 'Aporte'), ' no se identifica por un número suelto, sino por «qué trabajador + qué empleador + en qué fecha».'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositiva 8, Canvas 2026-2. El ejemplo del aporte usa el caso de estudio de la diapositiva 4 del mismo archivo; la lectura como cierre de maestro/transacción es propia.'));
    sec.append(c2);

    /* -------- Card 3: clave foránea e integridad referencial -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'La clave foránea'));
    c3.append(el('p', {}, 'Un modelo relacional permite relacionar dos entidades de modo que se genere una ', el('b', {}, 'dependencia'), ' entre ellas: Maestro → Detalle. La clave primaria del Maestro ', el('b', {}, 'se traspasa'), ' al Detalle, y ahí ese atributo pasa a llamarse ', el('b', {}, 'clave foránea (fk)'), '.'));

    const merFk = Mer(c3, {
      alto: 250, titulo: 'La clave primaria del maestro viaja al detalle como clave foránea',
      entidades: [
        { id: 'cliente', txt: 'Cliente', x: .17, y: .58, paso: 0, lado: 'arriba', abanico: 96, radio: 116,
          attrs: [{ t: 'rut', pk: 1, paso: 0 }, { t: 'nombre', paso: 0 }] },
        { id: 'factura', txt: 'Factura', x: .83, y: .58, paso: 1, lado: 'arriba', abanico: 120, radio: 122,
          attrs: [{ t: 'n° factura', pk: 1, paso: 1 }, { t: 'fecha', paso: 1 }, { t: 'rut (fk)', paso: 2 }] }
      ],
      relaciones: [
        { id: 'emite', txt: 'Emite', x: .5, y: .58, de: 'cliente', a: 'factura', card: ['1', 'N'], paso: 2 }
      ]
    });

    new Stepper(c3, [
      {
        d: 'El <b>maestro</b>: Cliente, con su clave primaria <b>rut</b>. Existe por sí solo.',
        run: async () => { merFk.hasta(0); merFk.resaltar(['cliente']); }
      },
      {
        d: 'El <b>detalle</b>: Factura, con su propia clave primaria. Todavía no hay nada que la ate a un cliente.',
        run: async () => { merFk.hasta(1); merFk.resaltar(['factura']); }
      },
      {
        d: 'Se establece la relación, y la clave del maestro <b>baja</b> al detalle como <b>clave foránea</b>. Desde ahora no puede existir una factura sin un rut válido en Cliente: eso es la <b>integridad referencial</b>.',
        run: async () => { merFk.hasta(2); merFk.resaltar(['emite']); }
      }
    ], () => { merFk.hasta(-1); merFk.limpiarMarcas(); }, 'claves');

    c3.append(el('p', {}, 'La frase exacta de la clase: esta estrategia permite que ', el('b', {}, 'en el detalle no existan nuevos registros sin una clave foránea válida en el maestro'), '.'));
    c3.append(el('p', { class: 'note' }, 'Es la misma integridad referencial del tema ', el('b', {}, 'Relacional vs. no relacional'), ', ahora vista desde el otro lado. Allá era «no se puede borrar el maestro si tiene detalles»; acá es «no se puede crear un detalle sin maestro». Son la misma regla aplicada en las dos direcciones.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositiva 9, Canvas 2026-2. El ejemplo Cliente–Factura y el diagrama paso a paso son propios: la diapositiva enuncia la regla en abstracto.'));
    sec.append(c3);

    /* -------- Card 4: errores frecuentes -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'Tres confusiones que cuestan puntos'));
    c4.append(el('details', {},
      el('summary', {}, '«Le pongo id a todo y listo»'),
      el('div', {},
        el('p', {}, 'Funciona para maestros. Para una transacción, un id autonumérico esconde la clave real: si ', el('b', {}, 'Inscripción'), ' tiene id propio pero nada impide insertar dos veces al mismo alumno en la misma sección, el modelo no está expresando la regla del negocio.'),
        el('p', { class: 'note' }, 'La clave compuesta (alumno + sección) sí la expresa, y además la base la hace cumplir sola.')
      )));
    c4.append(el('details', {},
      el('summary', {}, '«Tiene clave foránea, entonces es entidad débil»'),
      el('div', {},
        el('p', {}, 'No. Tener FK significa que está relacionada. Ser débil significa que ', el('b', {}, 'necesita'), ' esa clave ajena para identificarse. Un vehículo tiene patente propia y además el rut del dueño como FK: está relacionado, pero es fuerte.'),
        el('p', { class: 'note' }, 'Está desarrollado en la última tarjeta del tema ', el('b', {}, 'Simbología y notación'), '.')
      )));
    c4.append(el('details', {},
      el('summary', {}, '«La clave primaria puede ser el nombre, si en este caso no se repite»'),
      el('div', {},
        el('p', {}, 'Es la trampa del ejemplo de los Juanes. Una clave primaria no es «un valor que hoy no se repite»: es un atributo que ', el('b', {}, 'no puede'), ' repetirse nunca, por la naturaleza del dato.'),
        el('p', { class: 'note' }, 'Por eso los ejemplos del curso usan RUT, número de expediente, número de vuelo, patente: identificadores emitidos por alguien que garantiza la unicidad.')
      )));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: elaboración propia a partir de las diapositivas 7 a 9 de «Bases de datos 04» y de los enunciados de la Guía de ejercicios MER (Canvas 2026-2). Los tres errores no figuran listados en ningún material del curso.'));
    sec.append(c4);
  }
});
