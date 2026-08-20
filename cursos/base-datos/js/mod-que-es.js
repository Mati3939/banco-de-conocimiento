registerModule({
  id: 'que-es', title: '¿Qué es una base de datos?', unidad: 'I',
  semanas: [1], evaluacion: ['certamen-1'],
  lead: 'Una colección organizada de datos que responde a las necesidades de información de una organización. Suena obvio; las tres palabras que importan son "organizada", "necesidades" y "una".',
  build(sec) {

    /* -------- Card 1: la definición -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'La definición'));
    c1.append(el('p', {}, 'Una base de datos es una ', el('b', {}, 'colección organizada de datos estructurados'), '. Los datos que hay dentro tienen un sentido para el objetivo por el cual se hizo la colección.'));
    c1.append(el('p', {}, 'La versión corta que usó el profesor: ', el('b', {}, 'no se mezclan peras con manzanas'), '.'));
    c1.append(el('p', { class: 'note' }, 'De ahí sale la propiedad que más se repite en el curso: una base de datos es ', el('b', {}, 'temática'), '. Tiene un asunto. Si no lo tiene, no está organizada — es un depósito.'));
    c1.append(el('p', {}, 'Cuatro afirmaciones que conviene poder repetir de memoria:'));
    c1.append(el('ul', {},
      el('li', {}, 'Es una colección de datos organizados.'),
      el('li', {}, 'Responde a las necesidades de información de una organización.'),
      el('li', {}, 'Es temática.'),
      el('li', {}, 'Es parte indispensable de un sistema de información.')
    ));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 01 — Centralización y propagación», diapositivas 4 y 7, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: contexto y origen -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'De dónde viene'));
    c2.append(el('p', {}, 'La clase parte con una pregunta trampa: ¿cuándo se acuñó el concepto de "base de datos"?'));
    c2.append(el('ul', {},
      el('li', {}, el('b', {}, '1884, Nueva York.'), ' Herman Hollerith y su máquina de tarjetas perforadas.'),
      el('li', {}, el('b', {}, '1890.'), ' Esa máquina se aplica al censo de los Estados Unidos.'),
      el('li', {}, el('b', {}, 'Mucho antes.'), ' Los romanos hacían censos —el que aparece en el relato del año 0—, pero chinos y sumerios ya los hacían hace más de 6.000 años.')
    ));
    c2.append(el('p', {}, 'El punto de la diapositiva no es la fecha: es que ', el('b', {}, 'recolectar, organizar y registrar información es una de las razones por las que empezamos a escribir la historia'), '. Un censo con fines militares, tributarios o demográficos ya es una base de datos de la población.'));

    const advertencia = el('details', {},
      el('summary', {}, 'Un matiz sobre la fecha de 1884'),
      el('div', {},
        el('p', {}, 'La diapositiva dice que en 1884 "apareció el concepto de base de datos". Conviene separar dos cosas que ahí van juntas:'),
        el('ul', {},
          el('li', {}, 'Lo de 1884 y 1890 —Hollerith, las tarjetas perforadas, el censo— está bien: es el origen del ', el('b', {}, 'procesamiento mecánico de datos'), '.'),
          el('li', {}, 'El ', el('b', {}, 'término'), ' "base de datos" (database) es de los años 60, del ambiente de los sistemas militares estadounidenses, y se populariza con los primeros gestores de esa década.')
        ),
        el('p', { class: 'note' }, 'No cambia nada de lo que hay que saber para el curso, y el mensaje de fondo de la clase sigue en pie. Queda anotado para que, si en algún certamen aparece la pregunta por el nombre y no por la máquina, la respuesta no salga corrida por 80 años.')
      ));
    c2.append(advertencia);
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 01», diapositivas 3 y 5, Canvas 2026-2. El matiz sobre la datación del término es propio, no está en la diapositiva.'));
    sec.append(c2);

    /* -------- Card 3: centralización -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Centralizar: para qué, y a cambio de qué'));
    c3.append(el('p', {}, 'El objetivo de una base de datos es ', el('b', {}, 'centralizar la información de una organización'), '. Un solo lugar donde está el dato, en vez de doce planillas que se contradicen.'));
    c3.append(el('p', {}, 'Centralizar compra tres cosas:'));
    c3.append(el('ul', {},
      el('li', {}, el('b', {}, 'Congruencia'), ' — el dato dice lo mismo mires donde mires.'),
      el('li', {}, el('b', {}, 'Disponibilidad'), ' — está cuando se lo necesita.'),
      el('li', {}, el('b', {}, 'Confidencialidad'), ' — se puede controlar quién lo ve, porque hay una sola puerta.')
    ));
    c3.append(el('p', {}, 'Y cobra una: ', el('b', {}, 'es un punto único de falla'), '. La pregunta que deja la clase es "¿cuál es el peor caso para un recurso centralizado?", y la respuesta es que si falla, no se pierde una parte de la información: se pierde toda.'));
    c3.append(el('p', { class: 'note' }, 'Esa tensión —centralizar y a la vez no morir con el servidor— es la que explica el resto del subtítulo de la clase, "y propagación": réplicas, respaldos y distribución existen para pagar esa cuenta.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 01», diapositiva 6, Canvas 2026-2. La lectura de "propagación" como respuesta al punto único de falla es propia; la diapositiva plantea el problema y no lo resuelve todavía.'));
    sec.append(c3);

    /* -------- Card 4: base de datos vs sistema de información -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'No confundir con el sistema de información'));
    c4.append(el('p', {}, 'Son cosas distintas y la relación entre ellas tiene una dirección:'));

    Mer(c4, {
      alto: 210, titulo: 'Un sistema de información contiene una o muchas bases de datos',
      entidades: [
        { id: 'si', txt: 'Sistema de información', x: .26, y: .5, lado: 'abajo', abanico: 90, radio: 96,
          attrs: [{ t: 'procesos' }, { t: 'usuarios' }, { t: 'interfaz' }] },
        { id: 'bd', txt: 'Base de datos', x: .8, y: .5, lado: 'abajo', abanico: 90, radio: 96,
          attrs: [{ t: 'tema' }, { t: 'entidades' }] }
      ],
      relaciones: [{ id: 'contiene', txt: 'contiene', x: .53, y: .5, de: 'si', a: 'bd', card: ['1', 'N'] }]
    });

    c4.append(el('p', { class: 'note' }, 'Un sistema de información puede contener ', el('b', {}, 'una o muchas'), ' bases de datos. Al revés no: la base de datos es una pieza del sistema, no el sistema. Cuando en el curso se hable de "modelar el sistema", lo que se va a modelar es la base.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 01», diapositiva 7, Canvas 2026-2. El diagrama es propio: la diapositiva enuncia la relación con palabras, no con un MER.'));
    sec.append(c4);
  }
});
