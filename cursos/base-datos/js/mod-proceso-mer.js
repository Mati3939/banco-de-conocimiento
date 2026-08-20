registerModule({
  id: 'proceso-mer', title: 'Cómo se construye un MER', unidad: 'II',
  semanas: [2, 3], evaluacion: ['certamen-1'],
  lead: 'Cuatro pasos, siempre en el mismo orden: levantamiento, agrupación, diagramación y depuración. Acá se recorren sobre el caso de estudio de la clase, el sistema de pensiones.',
  build(sec) {

    /* -------- Card 1: el caso -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'El caso de estudio'));
    c1.append(el('p', {}, 'Una organización estatal encargada del pago de las pensiones de sus ciudadanos inició un proceso de transformación digital el año 2000. Lleva registro de los pagos del aporte obligatorio del trabajador sobre su sueldo bruto.'));
    c1.append(el('ul', {},
      el('li', {}, 'Contratos laborales: aporte del ', el('b', {}, '12,95 %'), '.'),
      el('li', {}, 'Trabajadores independientes: aporte del ', el('b', {}, '3,5 %'), '.')
    ));
    c1.append(el('p', {}, 'De cada operación se registra: identificación del trabajador, empleador, fecha del aporte, monto del aporte, sueldo bruto, porcentaje del aporte y tipo de contrato.'));
    c1.append(el('p', { class: 'note' }, 'Escala del problema: la fuerza laboral era de ', el('b', {}, '5 millones'), ' de trabajadores el año 2000 y de ', el('b', {}, '8 millones'), ' el 2020. Ese dato no es decorativo — es el que se usa en ', el('b', {}, 'Diccionario de datos'), ' para calcular el espacio en disco.'));

    c1.append(el('details', {},
      el('summary', {}, 'Las nueve necesidades de información que tiene que responder el modelo'),
      el('div', {},
        el('ol', {},
          el('li', {}, 'Obtener todos los aportes de un trabajador.'),
          el('li', {}, 'El monto total aportado por cada trabajador.'),
          el('li', {}, 'Cuántos trabajadores tuvo una empresa en un determinado periodo de tiempo.'),
          el('li', {}, 'Cuántos aportes fueron como trabajador independiente o dependiente.'),
          el('li', {}, 'Generar un ranking de trabajadores por monto total aportado.'),
          el('li', {}, 'Generar un ranking de empresas por cantidad de trabajadores en un determinado periodo.'),
          el('li', {}, 'Generar un ranking de empresas por mejor sueldo promedio.'),
          el('li', {}, 'Calcular la tendencia, al alza o a la baja, de los sueldos promedio de todos los trabajadores.'),
          el('li', {}, 'Calcular la tendencia, al alza o a la baja, de los tipos de contrato de los trabajadores.')
        ),
        el('p', { class: 'note' }, 'Vale la pena leerlas antes de modelar: un modelo no está bien o mal en abstracto, está bien o mal ', el('em', {}, 'para responder estas preguntas'), '. Fijate que casi todas necesitan agrupar por trabajador o por empresa y sumar montos — eso ya adelanta dónde tienen que estar las claves.')
      )));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04 — Diseño y previsión», diapositivas 4, 5 y 6, Canvas 2026-2. El comentario sobre leer las necesidades antes de modelar es propio.'));
    sec.append(c1);

    /* -------- Card 2: los cuatro pasos, aplicados -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Los cuatro pasos'));
    c2.append(el('p', {}, 'El proceso de construcción de un MER que fija la clase tiene cuatro etapas. Avanzá con los botones para verlas sobre el caso.'));

    const merPens = Mer(c2, {
      alto: 330, titulo: 'MER del sistema de pensiones',
      entidades: [
        { id: 'trab', txt: 'Trabajador', x: .10, y: .60, paso: 2, lado: 'arriba', abanico: 108, radio: 118,
          attrs: [{ t: 'rut', pk: 1 }, { t: 'nombre' }, { t: 'dirección', compuesto: 1 }] },
        { id: 'aporte', txt: 'Aporte', x: .50, y: .60, paso: 2, debil: true, lado: 'abajo', abanico: 130, radio: 112,
          attrs: [
            { t: 'fecha', pk: 1 }, { t: 'sueldo bruto' },
            { t: 'tipo contrato', paso: 4 }, { t: '% aporte', derivado: 1, paso: 4 }
          ] },
        { id: 'empl', txt: 'Empleador', x: .90, y: .60, paso: 2, lado: 'arriba', abanico: 108, radio: 118,
          attrs: [{ t: 'rut empresa', pk: 1 }, { t: 'razón social' }] }
      ],
      relaciones: [
        { id: 'realiza', txt: 'Realiza', x: .30, y: .60, de: 'trab', a: 'aporte', card: ['1', 'N'], paso: 3 },
        { id: 'ante', txt: 'Ante', x: .70, y: .60, de: 'aporte', a: 'empl', card: ['N', '1'], paso: 3 }
      ]
    });

    new Stepper(c2, [
      {
        d: '<b>1. Levantamiento.</b> Sacar del enunciado todos los datos que aparecen, sin ordenarlos todavía: identificación del trabajador, empleador, fecha del aporte, monto, sueldo bruto, porcentaje del aporte, tipo de contrato. Es la lista cruda.',
        run: async () => { merPens.hasta(1); merPens.limpiarMarcas(); }
      },
      {
        d: '<b>2. Agrupación.</b> Juntar los datos que hablan de la misma cosa. Aparecen tres grupos: los que describen a la <b>persona</b>, los que describen a la <b>empresa</b>, y los que describen <b>lo que pasó</b> entre las dos. Los dos primeros son maestros; el tercero es una transacción.',
        run: async () => { merPens.hasta(2); merPens.resaltar(['trab', 'empl', 'aporte']); }
      },
      {
        d: '<b>3. Diagramación.</b> Dibujar las entidades y unirlas con relaciones, poniendo la cardinalidad de cada una. Un trabajador realiza muchos aportes; muchos aportes se hacen ante un mismo empleador.',
        run: async () => { merPens.hasta(3); merPens.resaltar(['realiza', 'ante']); }
      },
      {
        d: '<b>4. Depuración.</b> Revisar qué sobra. El <b>porcentaje del aporte</b> no se guarda: se deduce del tipo de contrato (12,95 % o 3,5 %), así que pasa a ser un atributo <b>derivado</b> — elipse punteada. Y el <b>tipo de contrato</b> se queda en el Aporte y no en el Trabajador, porque una misma persona puede cotizar como dependiente un mes y como independiente el siguiente.',
        run: async () => { merPens.hasta(4); merPens.resaltar(['aporte']); }
      }
    ], () => { merPens.hasta(1); merPens.limpiarMarcas(); }, 'proceso-mer');

    c2.append(el('p', { class: 'note' }, 'Fijate que el paso 4 es el único que ', el('b', {}, 'quita'), ' cosas. Los tres primeros agregan; la depuración es donde el modelo deja de ser una transcripción del enunciado y pasa a ser un diseño.'));

    c2.append(el('details', {},
      el('summary', {}, 'De dónde sale este desarrollo (importante)'),
      el('div', {},
        el('p', {}, 'Los cuatro nombres de los pasos —levantamiento, agrupación, diagramación, depuración— y el caso de estudio son de la clase: están en las diapositivas 2, 4, 5 y 6 de «Bases de datos 04», y cada paso tiene su propia diapositiva (10 a 17).'),
        el('p', {}, el('b', {}, 'Pero esas ocho diapositivas están vacías'), ': solo llevan el título («Levantamiento», «Levantamiento / Resultado», «Agrupación», y así). El desarrollo lo hizo el profesor en vivo y no quedó en el archivo.'),
        el('p', { class: 'note' }, 'Entonces: el diagrama de arriba, la agrupación en tres grupos, las cardinalidades y las dos decisiones de depuración son ', el('b', {}, 'reconstrucción propia'), ' a partir del enunciado y de las reglas del propio curso (maestro/transacción, clave compuesta en transacciones, atributo derivado). Si en clase salió otro modelo, ese manda. Vale la pena contrastarlo con los apuntes o con la grabación.')
      )));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 04», diapositivas 2, 4, 5, 6 y 10 a 17, Canvas 2026-2. Ver la nota de arriba: las diapositivas 10 a 17 solo contienen los títulos de los pasos.'));
    sec.append(c2);

    /* -------- Card 3: el método en una tabla -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'El método, para aplicarlo a cualquier enunciado'));
    c3.append(el('ol', {},
      el('li', {}, el('b', {}, 'Levantamiento'), ' — subrayá los ', el('b', {}, 'sustantivos'), ' (candidatos a entidad) y los ', el('b', {}, 'verbos'), ' (candidatos a relación). Es la frase de la diapositiva 5 de «Bases de datos 03» convertida en procedimiento.'),
      el('li', {}, el('b', {}, 'Agrupación'), ' — para cada dato, preguntá "¿de qué cosa habla?". Los que hablan de lo mismo van juntos. Separá lo que ', el('em', {}, 'es'), ' (maestro) de lo que ', el('em', {}, 'pasó'), ' (transacción).'),
      el('li', {}, el('b', {}, 'Diagramación'), ' — dibujá entidades, elegí una clave primaria por entidad, uní con rombos y aplicá las dos preguntas de ', el('b', {}, 'Cardinalidades'), ' en cada relación.'),
      el('li', {}, el('b', {}, 'Depuración'), ' — buscá tres cosas: atributos que se puedan calcular (→ derivados), atributos repetidos en dos entidades (→ sobra uno), y entidades con un solo atributo además de su clave (→ probablemente era un atributo, no una entidad).')
    ));
    c3.append(el('p', { class: 'note' }, 'Recién después de esos cuatro pasos viene el ', el('b', {}, 'diccionario de datos'), ': se arma sobre el modelo ya depurado, porque su cálculo de espacio depende de qué atributos quedaron.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: los cuatro nombres son de «Bases de datos 04», diapositiva 2. El contenido de cada paso es elaboración propia, apoyada en la frase «entidades como sustantivos y relaciones como verbos» de «Bases de datos 03», diapositiva 5, Canvas 2026-2.'));
    sec.append(c3);
  }
});
