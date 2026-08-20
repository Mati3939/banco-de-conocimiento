registerModule({
  id: 'ejercicios-mer', title: 'Banco de ejercicios MER', unidad: 'II',
  semanas: [2, 3], evaluacion: ['certamen-1'],
  lead: 'Los diecisiete casos que circulan en el curso, con la solución oficial cuando existe. Once vienen con su .drawio resuelto; los otros seis todavía no.',
  build(sec) {

    /* ------------------------------------------------------------------
       Los once ejercicios de la ayudantía y de la guía vienen con su
       archivo .drawio resuelto en Canvas. Lo que va acá es la lectura de
       ESOS archivos: entidades con sus atributos y relaciones con su
       cardinalidad, tal como están dibujadas. No hay reinterpretación.
       ------------------------------------------------------------------ */
    const RESUELTOS = [
      { id: 'veterinaria', n: 'Veterinaria', origen: 'Ayudantía 1, ejercicio 1',
        caso: 'Una veterinaria lleva años anotando a mano los datos de sus dueños, sus mascotas y las consultas que realiza, y quiere pasar todo eso a una base de datos. Cada dueño puede traer más de una mascota; cada vez que una mascota se atiende se registra el motivo y el diagnóstico; quieren poder revisar el historial completo de consultas de una misma mascota.',
        ents: [['Dueño', 'id_dueno, nombre, telefono, direccion'],
               ['Mascota', 'id_mascota, nombre_mascota, especie, fecha_nac'],
               ['Consulta', 'id_consulta, fecha, motivo, diagnostico']],
        rels: [['Tiene', 'Dueño (1) — Mascota (N)'], ['Genera', 'Mascota (1) — Consulta (N)']],
        diagrama: {
          alto: 220,
          entidades: [{ id: 'd', txt: 'Dueño', x: .12, y: .5 }, { id: 'm', txt: 'Mascota', x: .5, y: .5 }, { id: 'c', txt: 'Consulta', x: .88, y: .5 }],
          relaciones: [{ id: 'r1', txt: 'Tiene', x: .31, y: .5, de: 'd', a: 'm', card: ['1', 'N'] },
                       { id: 'r2', txt: 'Genera', x: .69, y: .5, de: 'm', a: 'c', card: ['1', 'N'] }]
        } },
      { id: 'restaurante', n: 'Restaurante', origen: 'Ayudantía 1, ejercicio 2',
        caso: 'Un restaurante quiere ordenar clientes, mesas, pedidos y platos del menú. Cada grupo se instala en una mesa fija y esa mesa recibe distintos grupos durante el día; quien atiende toma el pedido de la mesa y ese pedido puede incluir varios platos; un mismo plato puede aparecer en muchos pedidos; quien atiende puede tener varios pedidos a la vez.',
        ents: [['Mesero', 'id_mesero, nombre_mesero, turno'],
               ['Cliente', 'id_cliente, nombre, telefono, email'],
               ['Pedido', 'id_pedido, fecha, hora, total'],
               ['Plato', 'id_plato, nombre_plato, precio, categoria'],
               ['Mesa', 'id_mesa, numero, capacidad']],
        rels: [['Atiende', 'Mesero (1) — Pedido (N)'], ['Realiza', 'Cliente (1) — Pedido (N)'],
               ['Incluye', 'Pedido (N) — Plato (M)'], ['Recibe', 'Pedido (N) — Mesa (1)']] },
      { id: 'streaming', n: 'Plataforma de streaming', origen: 'Ayudantía 1, ejercicio 3',
        caso: 'Una plataforma quiere ordenar cuentas, perfiles, catálogo, categorías y reseñas. Quien contrata paga un solo plan asociado a una única cuenta; una cuenta puede tener varios perfiles; cada título pertenece a una sola categoría; cualquier perfil puede dejar una reseña; un perfil entra desde varios dispositivos pero cada dispositivo se vincula a un solo perfil.',
        ents: [['Suscripción', 'id_suscripcion, plan, fecha_inicio, monto'],
               ['Usuario', 'id_usuario, nombre, email, fecha_registro'],
               ['Perfil', 'id_perfil, nombre_perfil, edad, idioma'],
               ['Dispositivo', 'id_dispositivo, tipo, sistema_operativo'],
               ['Reseña', 'id_resena, puntaje, comentario, fecha'],
               ['Contenido', 'id_contenido, titulo, anio, duracion'],
               ['Categoría', 'id_categoria, nombre_categoria']],
        rels: [['Tiene', 'Suscripción (1) — Usuario (1)'], ['Crea', 'Usuario (1) — Perfil (N)'],
               ['Usa', 'Perfil (1) — Dispositivo (N)'], ['Escribe', 'Perfil (1) — Reseña (N)'],
               ['Recibe', 'Contenido (1) — Reseña (N)'], ['Agrupa', 'Categoría (1) — Contenido (N)']] },
      { id: 'biblioteca', n: 'Biblioteca municipal', origen: 'Guía de ejercicios, 1',
        caso: 'Cada libro fue escrito por un autor y el mismo autor aparece en varios libros. Los vecinos se inscriben como socios y retiran libros: un socio retira varios libros a lo largo del año, y un mismo libro pasa por las manos de más de un socio. En cada retiro se anota la fecha de retiro y la de devolución.',
        ents: [['Autor', 'id_autor, nombre, nacionalidad'],
               ['Libro', 'id_libro, titulo, anio_publicacion, genero'],
               ['Préstamo', 'id_prestamo, fecha_retiro, fecha_devolucion'],
               ['Socio', 'id_socio, nombre, telefono, direccion']],
        rels: [['Escribe', 'Autor (1) — Libro (N)'], ['Corresponde', 'Libro (1) — Préstamo (N)'],
               ['Realiza', 'Socio (1) — Préstamo (N)']],
        comentario: 'Fijate cómo la solución oficial resuelve el N:M entre Socio y Libro: no lo dibuja. Mete <b>Préstamo</b> como entidad intermedia, con las fechas colgando de ella, y la relación queda partida en dos 1:N. Es exactamente lo que se anticipa en el tema <b>Cardinalidades</b>.' },
      { id: 'taller', n: 'Taller mecánico', origen: 'Guía de ejercicios, 2',
        caso: 'Los clientes traen sus vehículos y un mismo cliente puede tener más de uno. El taller asigna un mecánico a cada reparación, y ese mecánico suele tener varias órdenes abiertas. Cada vez que un vehículo entra se abre una orden con el diagnóstico y los repuestos usados, muchas veces más de uno.',
        ents: [['Cliente', 'id_cliente, nombre, telefono, direccion'],
               ['Vehículo', 'id_vehiculo, patente, marca, modelo'],
               ['Orden de trabajo', 'id_orden, fecha_ingreso, diagnostico, estado'],
               ['Repuesto', 'id_repuesto, nombre_repuesto, precio'],
               ['Mecánico', 'id_mecanico, nombre_mecanico, especialidad']],
        rels: [['Posee', 'Cliente (1) — Vehículo (N)'], ['Genera', 'Vehículo (1) — Orden de trabajo (N)'],
               ['Utiliza', 'Orden de trabajo (N) — Repuesto (M)'], ['Atiende', 'Mecánico (1) — Orden de trabajo (N)']] },
      { id: 'inmobiliaria', n: 'Inmobiliaria de arriendos', origen: 'Guía de ejercicios, 3',
        caso: 'Un mismo propietario puede tener varias propiedades. Cada propiedad se ubica en una comuna. Cuando alguien arrienda se firma un contrato; con los años una misma propiedad pasa por distintos contratos y un arrendatario firma más de uno. Mientras dure el contrato, cada mes se registra un pago.',
        ents: [['Propietario', 'id_propietario, nombre, telefono'],
               ['Propiedad', 'id_propiedad, direccion, tipo, metros_cuadrados'],
               ['Contrato', 'id_contrato, fecha_inicio, fecha_termino, monto_mensual'],
               ['Pago', 'id_pago, fecha_pago, monto'],
               ['Comuna', 'id_comuna, nombre_comuna'],
               ['Arrendatario', 'id_arrendatario, nombre, telefono, rut']],
        rels: [['Tiene', 'Propietario (1) — Propiedad (N)'], ['Ubica', 'Comuna (1) — Propiedad (N)'],
               ['Genera', 'Propiedad (1) — Contrato (N)'], ['Firma', 'Arrendatario (1) — Contrato (N)'],
               ['Genera', 'Contrato (1) — Pago (N)']] },
      { id: 'colegio', n: 'Colegio', origen: 'Guía de ejercicios, 4',
        caso: 'Cada semestre es un periodo académico distinto y en cada uno se abren varias secciones. Una asignatura puede dictarse en más de una sección; cada sección queda a cargo de un profesor y se imparte en una sala. Un profesor dicta varias secciones y una sala se usa para varias. Los estudiantes se inscriben en varias secciones.',
        ents: [['Periodo académico', 'id_periodo, nombre_periodo, anio'],
               ['Sección', 'id_seccion, cupo'],
               ['Inscripción', 'id_inscripcion, fecha_inscripcion'],
               ['Estudiante', 'id_estudiante, nombre, rut'],
               ['Asignatura', 'id_asignatura, nombre_asignatura, creditos'],
               ['Profesor', 'id_profesor, nombre_profesor, especialidad'],
               ['Sala', 'id_sala, numero_sala, capacidad']],
        rels: [['Agrupa', 'Periodo académico (1) — Sección (N)'], ['Dicta', 'Asignatura (1) — Sección (N)'],
               ['Imparte', 'Profesor (1) — Sección (N)'], ['Aloja', 'Sala (1) — Sección (N)'],
               ['Tiene', 'Sección (1) — Inscripción (N)'], ['Realiza', 'Estudiante (1) — Inscripción (N)']],
        comentario: 'Mismo patrón que la biblioteca: el N:M entre Estudiante y Sección se resuelve con <b>Inscripción</b> en el medio. Y <b>Sección</b> termina recibiendo cuatro claves foráneas (periodo, asignatura, profesor, sala): es el nodo donde converge todo el modelo.' },
      { id: 'hotel', n: 'Hotel boutique', origen: 'Guía de ejercicios, 5',
        caso: 'El hotel se organiza en pisos y cada piso agrupa varias habitaciones. Cada habitación es de un tipo (individual, doble o suite) que define su precio base. Un huésped reserva una habitación y suele volver a reservar. Un empleado gestiona cada reserva. Durante la estadía el huésped pide servicios adicionales, y todo lo consumido se suma a una factura asociada a esa reserva.',
        ents: [['Piso', 'id_piso, numero_piso'],
               ['Habitación', 'id_habitacion, numero_habitacion, estado'],
               ['Reserva', 'id_reserva, fecha_inicio, fecha_termino'],
               ['Factura', 'id_factura, fecha_emision, total'],
               ['Tipo de habitación', 'id_tipo, nombre_tipo, precio_base'],
               ['Huésped', 'id_huesped, nombre, pasaporte, telefono'],
               ['Empleado', 'id_empleado, nombre_empleado, cargo'],
               ['Servicio adicional', 'id_servicio, nombre_servicio, precio']],
        rels: [['Agrupa', 'Piso (1) — Habitación (N)'], ['Corresponde', 'Tipo de habitación (1) — Habitación (N)'],
               ['Genera', 'Habitación (1) — Reserva (N)'], ['Realiza', 'Huésped (1) — Reserva (N)'],
               ['Gestiona', 'Empleado (1) — Reserva (N)'], ['Incluye', 'Reserva (N) — Servicio adicional (M)'],
               ['Tiene', 'Reserva (1) — Factura (1)']],
        comentario: 'Acá aparece un <b>1:1</b> (Reserva — Factura), que es el caso raro. Se justifica porque la factura tiene vida propia: se emite en otro momento y con otros permisos que la reserva.' },
      { id: 'tienda', n: 'Tienda online', origen: 'Guía de ejercicios, 6',
        caso: 'Un cliente registra más de una dirección de despacho y hace varios pedidos. Cada pedido puede incluir distintos productos, y un mismo producto aparece en pedidos de clientes distintos. Cada producto pertenece a una categoría y lo abastece un proveedor que surte varios productos. Confirmado el pedido se procesa un pago y se coordina un envío. Después el cliente puede dejar una reseña.',
        ents: [['Cliente', 'id_cliente, nombre, email, telefono'],
               ['Pedido', 'id_pedido, fecha, estado'],
               ['Producto', 'id_producto, nombre_producto, precio'],
               ['Dirección', 'id_direccion, calle, comuna'],
               ['Pago', 'id_pago, fecha_pago, monto'],
               ['Envío', 'id_envio, fecha_envio, estado_envio'],
               ['Categoría', 'id_categoria, nombre_categoria'],
               ['Proveedor', 'id_proveedor, nombre_proveedor'],
               ['Reseña', 'id_resena, puntaje, comentario']],
        rels: [['Realiza', 'Cliente (1) — Pedido (N)'], ['Registra', 'Cliente (1) — Dirección (N)'],
               ['Incluye', 'Pedido (N) — Producto (M)'], ['Genera', 'Pedido (1) — Pago (1)'],
               ['Coordina', 'Pedido (1) — Envío (1)'], ['Pertenece', 'Categoría (1) — Producto (N)'],
               ['Abastece', 'Proveedor (1) — Producto (N)'], ['Recibe', 'Producto (1) — Reseña (N)'],
               ['Escribe', 'Cliente (1) — Reseña (N)'], ['DirigidoA', 'Envío (N) — Dirección (1)']],
        comentario: 'Reseña recibe dos relaciones a la vez —del Cliente que la escribe y del Producto sobre el que trata— y no tiene sentido sin ninguna de las dos. Es el ejemplo más claro de <b>entidad débil</b> de toda la guía.' },
      { id: 'banco', n: 'Banco', origen: 'Guía de ejercicios, 7',
        caso: 'Cada sucursal se ubica en una ciudad y en algunas ciudades hay más de una. En cada sucursal trabajan empleados. Cuando un cliente abre una cuenta, esta queda asociada a un tipo (corriente, vista o ahorro) y a la sucursal donde se abrió. Un cliente puede tener más de una cuenta, y a cada cuenta se le puede asociar más de una tarjeta para operar en los cajeros.',
        ents: [['Ciudad', 'id_ciudad, nombre_ciudad'],
               ['Sucursal', 'id_sucursal, nombre_sucursal, direccion'],
               ['Cuenta', 'id_cuenta, saldo, fecha_apertura'],
               ['Cajero automático', 'id_cajero, ubicacion'],
               ['Empleado', 'id_empleado, nombre_empleado, cargo'],
               ['Cliente', 'id_cliente, nombre, rut'],
               ['Tipo de cuenta', 'id_tipo, nombre_tipo'],
               ['Tarjeta', 'id_tarjeta, numero_tarjeta, fecha_vencimiento'],
               ['Transacción', 'id_transaccion, fecha, monto'],
               ['Préstamo', 'id_prestamo, monto_prestado, cuotas']],
        rels: [['Tiene', 'Ciudad (1) — Sucursal (N)'], ['Instala', 'Ciudad (1) — Cajero automático (N)'],
               ['Trabaja', 'Sucursal (1) — Empleado (N)'], ['Abre', 'Sucursal (1) — Cuenta (N)'],
               ['Posee', 'Cliente (1) — Cuenta (N)'], ['Clasifica', 'Tipo de cuenta (1) — Cuenta (N)'],
               ['Asocia', 'Cuenta (1) — Tarjeta (N)'], ['Registra', 'Cuenta (1) — Transacción (N)'],
               ['Otorga', 'Cuenta (1) — Préstamo (N)']],
        comentario: 'Este es el más parecido a lo que puede caer en un certamen: hay una imagen <code>MER_Control1_Banco.jpeg</code> en la carpeta de la clase del 19/08 con un modelo de banco. Vale la pena comparar los dos.' },
      { id: 'cines', n: 'Cadena de cines', origen: 'Guía de ejercicios, 8',
        caso: 'El ejercicio más grande de la guía: cines con salas, funciones, películas, géneros, actores, boletos, clientes, empleados, snacks y reseñas.',
        ents: [['Cine', 'id_cine, nombre_cine, direccion'], ['Sala', 'id_sala, numero_sala, capacidad'],
               ['Función', 'id_funcion, fecha, horario'], ['Boleto', 'id_boleto, asiento, precio'],
               ['Cliente', 'id_cliente, nombre, email'], ['Película', 'id_pelicula, titulo, duracion'],
               ['Género', 'id_genero, nombre_genero'], ['Actor', 'id_actor, nombre_actor'],
               ['Empleado', 'id_empleado, nombre_empleado, cargo'],
               ['Pedido de snacks', 'id_pedido_snack, fecha, total'],
               ['Snack', 'id_snack, nombre_snack, precio'],
               ['Reseña', 'id_resena, puntaje, comentario']],
        rels: [['Tiene', 'Cine (1) — Sala (N)'], ['Aloja', 'Sala (1) — Función (N)'],
               ['Proyecta', 'Película (1) — Función (N)'], ['Clasifica', 'Género (1) — Película (N)'],
               ['Participa', 'Película (N) — Actor (M)'], ['Vende', 'Función (1) — Boleto (N)'],
               ['Compra', 'Cliente (1) — Boleto (N)'], ['Procesa', 'Empleado (1) — Boleto (N)'],
               ['Realiza', 'Cliente (1) — Pedido de snacks (N)'], ['Incluye', 'Pedido de snacks (N) — Snack (M)'],
               ['Escribe', 'Cliente (1) — Reseña (N)'], ['Sobre', 'Reseña (N) — Película (1)']],
        comentario: 'Doce entidades y doce relaciones. Si se puede armar este, los de certamen van a parecer cortos.' }
    ];

    /* ---- Card 1: los resueltos ---- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Con solución oficial'));
    c1.append(el('p', {}, 'Estos once tienen su archivo ', el('code', {}, '.drawio'), ' resuelto en Canvas. Lo que está adentro de cada uno es la lectura de ese archivo: entidades con sus atributos y relaciones con su cardinalidad, tal como están dibujadas.'));
    c1.append(el('p', { class: 'note' }, 'Se aprovechan mucho más si primero se intenta el modelo a ciegas, con las dos preguntas de ', el('b', {}, 'Cardinalidades'), ', y recién después se abre la solución para comparar.'));

    RESUELTOS.forEach(ej => {
      const cuerpo = el('div', {});
      cuerpo.append(el('p', { class: 'note' }, el('b', {}, 'El caso: '), ej.caso));
      if (ej.diagrama) Mer(cuerpo, ej.diagrama);
      cuerpo.append(el('p', {}, el('b', {}, 'Entidades y atributos')));
      cuerpo.append(el('ul', {}, ej.ents.map(e =>
        el('li', {}, el('b', {}, e[0]), ' — ', el('code', {}, e[1])))));
      cuerpo.append(el('p', {}, el('b', {}, 'Relaciones')));
      cuerpo.append(el('ul', {}, ej.rels.map(r =>
        el('li', {}, el('b', {}, r[0]), ': ', r[1]))));
      if (ej.comentario) cuerpo.append(el('p', { class: 'note', html: ej.comentario }));
      c1.append(el('details', {}, el('summary', {}, ej.n + ' — ' + ej.origen), cuerpo));
    });

    c1.append(el('p', { class: 'fuente' }, 'Fuente: archivos .drawio de «Ayudantía / Semana 1» (ejercicios 1 a 3) y de «Ayudantía / Semana 1 / Guía de Ejercicios» (ejercicios 1 a 8), Canvas 2026-2. Los enunciados vienen de «Ayudantía 1 — Repaso de MER» (Ricardo Parra), diapositivas 6 a 8, y de «Guía de Ejercicios — Modelo Entidad-Relación» en PDF. Los comentarios en cursiva bajo cada solución son propios; los .drawio no traen texto explicativo.'));
    sec.append(c1);

    /* ---- Card 2: sin solución ---- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Sin solución publicada'));
    c2.append(el('p', {}, 'Estos seis están planteados en el material pero no tienen respuesta en Canvas. Los dos primeros son los más importantes: son los que se trabajaron en la clase del 19 de agosto, y ambos piden explícitamente los tres tipos de atributo especiales.'));

    const SIN = [
      ['MER Bomberos de Chile', 'Clase del 19/08 — <code>Mer_bomberos.pptx</code>',
       'En Chile los cuerpos de bomberos son instituciones privadas. Cada Cuerpo de Bomberos tiene una o más Compañías, y cada Compañía tiene uno o más Bomberos/as. Un bombero puede pertenecer solo a una compañía y cada compañía solo a un cuerpo. Cada comuna puede tener un solo Cuerpo de Bomberos, pero un Cuerpo puede pertenecer a una o más comunas (Ley N° 20.564).',
       'Requisitos: cada entidad con al menos 4 atributos; al menos un atributo compuesto, uno derivado y uno multivalor; todas las relaciones con su cardinalidad. En la misma carpeta hay un <code>bomberos_iciit.drawio</code> y un <code>MER_bomberos.png</code>: conviene abrirlos antes de resolverlo desde cero.'],
      ['Cuentas corrientes', 'Clase del 19/08 — <code>Mer_cuentas_corrientes.pdf</code>',
       'Un cliente puede abrir una o varias cuentas corrientes en un banco; cada cuenta solo puede tener un cliente como titular. Cada cuenta pertenece exclusivamente a un banco y debe registrar al menos un número único de cuenta y una fecha de apertura. Del cliente se registra nombre completo, fecha de nacimiento, un identificador único, su dirección y teléfonos de contacto.',
       'Mismos tres requisitos de atributos especiales. Y el enunciado los regala: <b>dirección</b> pide ser compuesto, <b>teléfonos</b> (en plural) pide ser multivaluado, y de la <b>fecha de nacimiento</b> sale la edad como derivado.'],
      ['Gabinete de abogados', '«Bases de datos 05 — Práctica», ejercicio 1',
       'Cada asunto tiene un número de expediente que lo identifica y corresponde a un solo cliente. Del asunto se guarda el periodo (fecha de inicio y de archivo), su estado (en trámite, archivado…) y los datos personales del cliente. Algunos asuntos son llevados por uno o varios procuradores, de los que también interesan sus datos personales.', ''],
      ['Zoos del mundo', '«Bases de datos 05», ejercicio 2',
       'De cada zoo: nombre, ciudad, país, tamaño en m² y presupuesto anual. De cada especie: nombre vulgar, nombre científico, familia y si está en peligro de extinción. Además, de cada animal que el zoo posee: número de identificación, especie, sexo, año de nacimiento, país de origen y continente.', ''],
      ['Compañía aérea', '«Bases de datos 05», ejercicio 3',
       'Tres recursos: aviones, pilotos y tripulación. Del piloto: código, nombre y horas de vuelo; de la tripulación, código y nombre. Todos tienen una base a la que regresan. Un vuelo va de un origen a un destino a una hora determinada y tiene número (el de Palma a Alicante de las 13:50 es el IB-8830). De cada vuelo, pasado o de los próximos tres meses, se quiere saber el avión, el piloto y cada miembro de tripulación. Cada avión tiene código, tipo (BOEING-747) y una base de mantenimiento.', ''],
      ['El chef', '«Bases de datos 05», ejercicio 4',
       'El más largo de todos. Recetas obtenidas de diversas fuentes, con su ubicación física; cada receta es una serie de pasos con operación, ingredientes, tiempo, utensilios y comentario opcional; tiempo total aproximado porque hay tareas en paralelo; tipo de plato, ingrediente principal, precio; recetas distintas para un mismo plato, identificadas por número clave. De cada ingrediente: nombre, calorías, cantidades por fase y unidades. Y una carta de menús de tres platos con precio y comentario.', '']
    ];
    SIN.forEach(s => {
      const cuerpo = el('div', {});
      cuerpo.append(el('p', {}, s[2]));
      if (s[3]) cuerpo.append(el('p', { class: 'note', html: s[3] }));
      c2.append(el('details', {}, el('summary', { html: s[0] + ' — ' + s[1] }), cuerpo));
    });

    c2.append(el('p', { class: 'note' }, 'Las diapositivas de práctica dicen: ', el('b', {}, '«Para cada ejercicio se debe generar un diagrama MER en la notación que prefieran y el diccionario de datos.»'), ' O sea que ninguno se termina con el dibujo — falta siempre la tabla del tema ', el('b', {}, 'Diccionario de datos'), '.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Mer_bomberos.pptx» y «Mer_cuentas_corrientes.pdf» de la carpeta clase_20260819, y «Bases de datos 05 — Práctica», diapositivas 2 y 4 a 9, Canvas 2026-2. La observación sobre qué atributo del enunciado de cuentas corrientes conviene usar como compuesto, multivaluado y derivado es propia.'));
    sec.append(c2);
  }
});
