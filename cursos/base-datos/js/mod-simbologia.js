registerModule({
  id: 'simbologia', title: 'Simbología y notación', unidad: 'II',
  semanas: [2], evaluacion: ['certamen-1'],
  lead: 'Rectángulo, rombo y elipse. Con esas tres figuras y cuatro variantes de borde se dice todo lo que un MER tiene que decir.',
  build(sec) {

    /* -------- Card 1: el vocabulario completo -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Las tres figuras'));
    c1.append(el('p', {}, 'Este es el diagrama de referencia del curso. Cada símbolo que aparece acá vuelve a aparecer en todos los ejercicios.'));

    const merRef = Mer(c1, {
      alto: 300, titulo: 'Simbología del MER en notación de Chen',
      entidades: [
        { id: 'paciente', txt: 'Paciente', x: .19, y: .62, lado: 'arriba', abanico: 128, radio: 128,
          attrs: [{ t: 'rut', pk: 1 }, { t: 'teléfono', multi: 1 }, { t: 'edad', derivado: 1 }] },
        { id: 'consulta', txt: 'Consulta', x: .81, y: .62, debil: true, lado: 'arriba', abanico: 96, radio: 122,
          attrs: [{ t: 'fecha' }, { t: 'motivo' }] }
      ],
      relaciones: [
        { id: 'atiende', txt: 'Atiende', x: .5, y: .62, de: 'paciente', a: 'consulta', card: ['1', 'N'] }
      ]
    });

    c1.append(el('ul', {},
      el('li', {}, el('b', {}, 'Rectángulo simple'), ' — entidad ', el('b', {}, 'fuerte'), ': existe por sí sola. Acá, ', el('b', {}, 'Paciente'), '.'),
      el('li', {}, el('b', {}, 'Rectángulo de doble borde'), ' — entidad ', el('b', {}, 'débil'), ': depende de otra para existir. Acá, ', el('b', {}, 'Consulta'), ': sin un paciente, esa consulta no significa nada.'),
      el('li', {}, el('b', {}, 'Rombo'), ' — ', el('b', {}, 'relación'), ': asociación entre dos o más entidades. En sus lados se anotan las cardinalidades (1, N, M).'),
      el('li', {}, el('b', {}, 'Elipse'), ' — ', el('b', {}, 'atributo'), '. Sus variantes son las que más se olvidan:')
    ));
    c1.append(el('ul', {},
      el('li', {}, el('b', {}, 'Subrayado'), ' → clave primaria. Acá, ', el('b', {}, 'rut'), '.'),
      el('li', {}, el('b', {}, 'Doble elipse'), ' → multivaluado: puede tener varios valores a la vez. Acá, ', el('b', {}, 'teléfono'), ' — una persona tiene el del trabajo y el celular.'),
      el('li', {}, el('b', {}, 'Elipse punteada'), ' → derivado: se calcula y ', el('b', {}, 'no'), ' se almacena. Acá, ', el('b', {}, 'edad'), ', que sale de la fecha de nacimiento.'),
      el('li', {}, el('b', {}, 'Compuesto'), ' → se puede descomponer en partes con sentido propio. El caso típico es ', el('b', {}, 'dirección'), ' = calle + número + comuna.')
    ));
    c1.append(el('p', { class: 'note' }, 'Los tres últimos —multivaluado, derivado y compuesto— aparecen explícitamente pedidos en los enunciados de este semestre: tanto el MER de Bomberos como el de cuentas corrientes exigen "al menos un atributo compuesto, uno derivado y uno multivalor". Conviene tenerlos a mano, no descubrirlos en el certamen.'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Ayudantía 1 — Repaso de MER», diapositiva 4 (Ricardo Parra, r.parraj@udd.cl), y «Bases de datos 03», diapositivas 8 a 12, Canvas 2026-2. El diagrama reúne en un solo dibujo los símbolos que las diapositivas muestran por separado.'));
    sec.append(c1);

    /* -------- Card 2: las dos notaciones -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Chen y Barker: dos formas de dibujar lo mismo'));
    c2.append(el('p', {}, 'La clase muestra dos notaciones. Son el mismo modelo con distinta tipografía visual:'));

    const cols = el('div', { class: 'flexcols' });
    const a = el('div', { style: 'flex:1 1 19rem' });
    a.append(el('h4', { style: 'margin:0 0 .7rem; font-size:1rem' }, 'Notación de Chen'));
    a.append(el('ul', {},
      el('li', {}, 'Entidades en rectángulos, relaciones en rombos, atributos en elipses colgando de la entidad.'),
      el('li', {}, 'Las cardinalidades se escriben sobre las líneas: 1, N, M.'),
      el('li', {}, 'Ocupa mucho espacio: cada atributo es una elipse propia.'),
      el('li', {}, 'Es la que se usa para ', el('b', {}, 'explicar'), '.')
    ));
    const b = el('div', { style: 'flex:1 1 19rem' });
    b.append(el('h4', { style: 'margin:0 0 .7rem; font-size:1rem' }, 'Notación de Barker («patas de gallo»)'));
    b.append(el('ul', {},
      el('li', {}, 'Cada entidad es una caja con sus atributos ', el('b', {}, 'adentro'), ', como una lista.'),
      el('li', {}, 'No hay rombos: la relación es la línea, y el verbo se escribe encima.'),
      el('li', {}, 'La cardinalidad se dibuja en el extremo de la línea. La "pata de gallo" (tres rayitas) significa "muchos".'),
      el('li', {}, 'Es compacta: es la que se usa para ', el('b', {}, 'trabajar'), '.')
    ));
    cols.append(a, b);
    c2.append(cols);
    c2.append(el('p', { class: 'note' }, 'La guía de ejercicios pide dibujar "usando la simbología vista en clases" y las diapositivas de práctica dicen ', el('b', {}, '"en la notación que prefieran"'), '. O sea: las dos valen, pero hay que ser consistente dentro de un mismo diagrama.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 03», diapositivas 8 a 12 (las notaciones se presentan como imágenes, sin texto), y «Bases de datos 05 — Práctica», diapositiva 2, Canvas 2026-2. La comparación punto por punto es propia: las diapositivas muestran los dos dibujos sin contrastarlos.'));
    sec.append(c2);

    /* -------- Card 3: entidad débil -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Cuándo una entidad es débil'));
    c3.append(el('p', {}, 'Una entidad es débil cuando ', el('b', {}, 'no puede identificarse sola'), ': necesita la clave de otra entidad para distinguir sus registros.'));
    c3.append(el('p', {}, 'La prueba práctica es preguntarse: ', el('b', {}, '«si borro el registro del que depende, ¿este sigue teniendo sentido?»'), ' Si la respuesta es no, es débil.'));
    c3.append(el('ul', {},
      el('li', {}, el('b', {}, 'Consulta'), ' sin ', el('b', {}, 'Mascota'), ' → no significa nada. Débil.'),
      el('li', {}, el('b', {}, 'Cuota'), ' sin ', el('b', {}, 'Contrato'), ' → no significa nada. Débil.'),
      el('li', {}, el('b', {}, 'Vehículo'), ' sin ', el('b', {}, 'Cliente'), ' → el auto sigue existiendo. Fuerte, aunque esté relacionado.')
    ));
    c3.append(el('p', { class: 'note' }, 'Ojo con la confusión más común: que una entidad tenga una clave foránea ', el('b', {}, 'no'), ' la vuelve débil. Débil es que ', el('em', {}, 'necesite'), ' esa clave ajena para identificarse. Un vehículo tiene patente propia; una cuota se identifica por «contrato + número de cuota».'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Ayudantía 1», diapositiva 4 (definición de entidad fuerte y débil), Canvas 2026-2. La prueba del «si borro el otro, ¿sigue teniendo sentido?» y los tres ejemplos son propios.'));
    sec.append(c3);
  }
});
