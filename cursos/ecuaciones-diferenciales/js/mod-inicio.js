registerModule({
  id:'inicio', title:'Mapa del semestre', unidad:'inicio', semanas:[],
  lead:'Las 19 semanas del curso, qué método de resolución se ve en cada una y qué entra en cada evaluación.',
  build(sec){
    const C=window.CURSO;
    const hoy=new Date(), inicio=new Date(2026,7,3); // 03-08-2026, lunes de la semana 1
    const semActual=Math.floor((hoy-inicio)/(7*24*3600*1000))+1;

    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Calendario'));
    c1.append(el('p',{class:'note'},'La semana en curso está resaltada. Hacé clic en un tema para abrirlo.'));
    const lista=el('div',{class:'semanas'});
    // Contrato de CURSO.semanas[].tema (lo copian también Multivariable y EDO):
    //   - string: el caso mayoritario, una sola materia esa semana.
    //   - string[]: la calendarización oficial dicta más de una materia en la
    //     misma semana (p. ej. Probabilidades semana 8: Análisis Exploratorio
    //     de Datos + Teoremas de Convergencia, en la misma fila del PDF). Cada
    //     id se muestra como su propio enlace clicable, unidos por " + ".
    //   - null/undefined/[]: la semana no trae materia nueva (certamen, feriado,
    //     exámenes…); se muestra el hito, o '—' si tampoco hay hito.
    // Un id de módulo que todavía no tiene ficha registrada degrada a texto
    // plano (no clicable) en vez de lanzar — así el mapa no se rompe mientras
    // van llegando las tareas que registran cada módulo.
    C.semanas.forEach(s=>{
      const temaIds=Array.isArray(s.tema)?s.tema:(s.tema?[s.tema]:[]);
      const etiqueta=temaIds.length
        ? el('span',{},temaIds.map((id,i)=>{
            const m=window.MODULES.find(x=>x.id===id);
            const nodo=m
              ? el('a',{href:'#'+m.id,onclick:e=>{e.preventDefault();activate(m.id);}},m.title)
              : el('span',{},id);
            return i===0?nodo:[el('span',{},' + '),nodo];
          }))
        : el('span',{},s.hito||'—');
      const fila=el('div',{class:'semana'+(s.n===semActual?' actual':'')+(temaIds.length?'':' libre')},
        el('span',{class:'num'},String(s.n)),
        el('span',{class:'fechas'},s.desde+' → '+s.hasta),
        el('span',{},etiqueta,temaIds.length&&s.hito?el('span',{class:'note',style:'margin-left:.6rem'},'· '+s.hito):null));
      lista.append(fila);
    });
    c1.append(lista);
    sec.append(c1);

    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Qué entra en cada evaluación'));
    C.evaluaciones.forEach(e=>{
      c2.append(el('p',{},el('span',{class:'evaluacion'+(/certamen/.test(e.id)?' certamen':'')},e.nombre+' · '+e.fecha)));
      c2.append(el('ul',{class:'note'},e.temas.map(t=>el('li',{},t))));
    });
    sec.append(c2);

    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Reglas del curso'));
    c3.append(el('ul',{class:'note'},C.reglas.map(r=>el('li',{},r))));
    c3.append(el('p',{class:'fuente'},'Fuente: calendarización oficial 2026-2 · '+C.bibliografia));
    sec.append(c3);
  }
});
