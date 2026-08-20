/* Mapa del curso: índice por unidad, con los temas en el orden en que se dictan.
   Deliberadamente NO muestra el calendario del semestre ni las evaluaciones.
   Esos datos siguen en curso.js (semanas, evaluaciones, reglas) porque son los
   que fijan el orden y el alcance de cada tema al escribirlos, pero al lector
   le sirve saber qué hay y dónde está, no en qué fecha se dicta. */
registerModule({
  id:'inicio', title:'Mapa del curso', unidad:'inicio', semanas:[],
  lead:'Todos los temas del curso, agrupados por unidad y en el orden en que se dictan. Los que están en gris todavía no los pasamos.',
  build(sec){
    const C=window.CURSO;
    const unidades=[...new Set(window.MODULES.map(m=>m.unidad))].filter(u=>u!=='inicio');
    unidades.forEach(u=>{
      const temas=window.MODULES.filter(m=>m.unidad===u);
      if(!temas.length)return;
      const card=el('div',{class:'card'});
      card.append(el('h3',{},'Unidad '+u+(C.unidades[u]?' · '+C.unidades[u]:'')));
      const lista=el('div',{class:'temas-lista'});
      temas.forEach(m=>{
        lista.append(el('a',{
          class:'tema-item'+(m.pendiente?' pend':''),
          href:'#'+m.id,
          onclick:e=>{e.preventDefault();activate(m.id);}
        },m.title));
      });
      card.append(lista);
      sec.append(card);
    });
    sec.append(el('p',{class:'fuente suelta'},'Bibliografía del curso: '+C.bibliografia));
  }
});
