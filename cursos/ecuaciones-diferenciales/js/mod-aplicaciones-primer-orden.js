/* contenidoOficial original (índice a cubrir):
   - Crecimiento y decrecimiento exponencial
   - Ley de enfriamiento de Newton
   - Problemas de mezclas */
registerModule({id:'aplicaciones-primer-orden',title:'Aplicaciones de primer orden',unidad:'I',semanas:[5],evaluacion:['control-2','certamen-1'],
  lead:'Los mismos dos métodos de esta unidad —separables y factor integrante— resuelven modelos físicos reales; lo que cambia de un problema a otro es el planteo, no la técnica de resolución.',
  build(sec){

    /* -------- Card 1: el patrón común -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'El patrón común: tasa de cambio = entrada − salida'));
    c1.append(el('p',{},'Mezclas en un estanque, enfriamiento, circuitos y crecimiento poblacional se ven distintos, pero todos se plantean con la misma estructura: la razón de cambio de una cantidad es lo que entra menos lo que sale (o, en enfriamiento, lo que se gana menos lo que se pierde hacia el ambiente). El caso general de un estanque con volumen $V(t)$:'));
    c1.append(el('div',{class:'formula',html:'$$\\frac{dQ}{dt} = (\\text{tasa entrada})\\cdot(\\text{conc. entrada}) - (\\text{tasa salida})\\cdot\\frac{Q(t)}{V(t)}$$'}));
    c1.append(el('p',{},'Cada modelo de este tema ya se resolvió con una técnica de esta unidad — el trabajo real está en el ',el('b',{},'planteo'),', no en la resolución algebraica:'));
    c1.append(el('ul',{},
      el('li',{},el('b',{},'Crecimiento y decaimiento exponencial: '),'ya resuelto en el tema Variables separables, tanto la versión de crecimiento (card "Actividad inicial: crecimiento del dinero", interés compuesto) como la logística (ejercicio de modelado de moscas y de población). Acá se agrega, en los ejercicios, un segundo modelo logístico con números de un Control 1 real de Canvas — distinto del que ya está en Variables separables.'),
      el('li',{},el('b',{},'Ley de enfriamiento de Newton: '),'la técnica completa (variables separables) y un ejemplo con un objeto que se ',el('b',{},'enfría'),' ya están en el tema Variables separables, card "Ley de enfriamiento de Newton". Acá se resuelve la variante donde el objeto se ',el('b',{},'calienta'),' hacia el ambiente — misma ley, sentido opuesto.'),
      el('li',{},el('b',{},'Mezclas en un tanque: '),'con datos numéricos reales de un examen (no un supuesto), en la próxima card.'),
      el('li',{},el('b',{},'Circuitos: '),'contenido nuevo de este módulo, con la misma técnica de factor integrante del tema Lineal de primer orden y factor integrante.')
    ));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Aplicaciones: modelos de mezclas" (fórmula del balance entrada−salida); la organización en cuatro modelos y las referencias cruzadas son de esta ficha.'));
    sec.append(c1);

    /* -------- Card 2: mezclas con datos reales -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Mezclas en un tanque, con datos de un examen real'));
    c2.append(el('p',{},'Un estanque tiene $100\\text{ L}$ de agua pura. Entra salmuera con concentración $1\\text{ kg/L}$ a razón de $6\\text{ L/min}$, y la mezcla —bien revuelta— sale a razón de $5\\text{ L/min}$. Determinar (i) el instante en que la concentración de sal llega a $63/64\\text{ kg/L}$, y (ii) la capacidad mínima que necesita el estanque para llegar a esa concentración.'));
    c2.append(el('p',{class:'note'},'index-v3.html trae este mismo problema, pero con tasas asumidas ($4$ y $3\\text{ L/min}$) porque la nota del vault que le sirvió de base solo conservaba $V(t)=100+t$ y la conclusión de los $200\\text{ L}$, sin las tasas originales. Acá se usan los números reales de la fuente encontrada — ver la ficha.'));
    Pasos(c2,[
      {tex:'V(t)=100+(6-5)t=100+t',nota:'El volumen crece 1 L/min neto (entra más de lo que sale).'},
      {tex:'\\dfrac{dQ}{dt}=6(1)-5\\cdot\\dfrac{Q}{100+t}\\ \\Longrightarrow\\ \\dfrac{dQ}{dt}+\\dfrac{5}{100+t}Q=6,\\quad Q(0)=0',nota:'Balance entrada−salida: es una EDO lineal de primer orden en Q(t).'},
      {tex:'\\mu(t)=e^{\\int\\frac{5}{100+t}dt}=e^{5\\ln(100+t)}=(100+t)^5',nota:'Factor integrante, técnica del tema Lineal de primer orden y factor integrante.'},
      {tex:'\\dfrac{d}{dt}\\big[(100+t)^5Q\\big]=6(100+t)^5',nota:'Multiplicando por μ: el lado izquierdo ya es la derivada de μQ.'},
      {tex:'(100+t)^5Q=(100+t)^6+C',nota:'Integrando ambos lados.'},
      {tex:'Q(0)=0\\ \\Longrightarrow\\ 100^5\\cdot0=100^6+C\\ \\Longrightarrow\\ C=-100^6',nota:'Imponiendo la condición inicial (estanque con agua pura).'},
      {tex:'Q(t)=(100+t)-100^6(100+t)^{-5}',nota:'Solución particular.'},
      {tex:'\\dfrac{Q(t)}{V(t)}=1-\\left(\\dfrac{100}{100+t}\\right)^6',nota:'Dividiendo Q(t) por V(t)=100+t, la concentración se simplifica a esta forma cerrada.'},
      {tex:'1-\\left(\\dfrac{100}{100+t}\\right)^6=\\dfrac{63}{64}\\ \\Longrightarrow\\ \\left(\\dfrac{100}{100+t}\\right)^6=\\dfrac1{64}=\\left(\\dfrac12\\right)^6',nota:'Igualando a la concentración pedida.'},
      {tex:'\\dfrac{100}{100+t}=\\dfrac12\\ \\Longrightarrow\\ t=100\\text{ min}',nota:'Ambos lados son positivos, así que se puede tomar la raíz sexta directa.'}
    ],{modId:'aplicaciones-primer-orden',titulo:'Estanque real: entra 6 L/min, sale 5 L/min'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'con $Q(t)=(100+t)-100^6(100+t)^{-5}$: $Q\'(t)=1+5\\cdot100^6(100+t)^{-6}$, y $\\dfrac{5Q}{100+t}=5-5\\cdot100^6(100+t)^{-6}$. Sumando, $Q\'+\\dfrac{5Q}{100+t}=1+5=6$ ✓ (los términos con $100^6$ se cancelan). Y $Q(0)=100-100^6\\cdot100^{-5}=100-100=0$ ✓.'));
    c2.append(el('p',{},'(ii) La capacidad mínima se lee directamente de $V(t)$, no de $Q(t)$: $V(100)=200\\text{ L}$ — el estanque necesita al menos ',el('b',{},'200 litros'),' de capacidad.'));
    const planoMezcla=Plano(c2,{xMin:0,xMax:250,yMin:0,yMax:1.05,alto:280});
    planoMezcla.dibujar(P=>{
      P.ejes();
      P.curva(()=>1,{color:'--muted',grosor:1,guiones:true});
      P.curva(t=>1-Math.pow(100/(100+t),6),{color:'--s1',grosor:2.5});
      P.punto(100,63/64,{color:'--s4',etiqueta:'(100, 63/64)'});
    });
    c2.append(el('p',{class:'note'},'La concentración $c(t)=Q(t)/V(t)$ (azul) parte en 0 (agua pura) y se acerca cada vez más despacio a $1\\text{ kg/L}$ (línea punteada, la concentración de entrada) sin llegar nunca a tocarla — a los 100 min todavía le falta $1/64$ para igualarla.'));
    c2.append(el('p',{class:'fuente'},'Fuente: "Estudio EDO.pdf" (repo Material-Ingeniería-Informática, enlazado desde la nota del vault "Aplicaciones de EDO de primer orden"), problema 4 de un examen anterior de Ecuaciones Diferenciales — mismo enunciado, tasas y resultado (t=100 min, V=200 L) que ahí aparecen resueltos. La forma cerrada de c(t) y su verificación por sustitución son elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: enfriamiento de Newton, variante de calentamiento -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Ley de enfriamiento de Newton: la variante de calentamiento'));
    c3.append(el('p',{},'Un día de playa a $25°\\text{C}$ de ambiente: se compran helados recién sacados de un congelador a $2°\\text{C}$ (empiezan a derretirse a $10°\\text{C}$). Al recibirlos, uno conversa con una amiga durante 4 minutos, y estima que en ese lapso la temperatura de los helados subió a $9°\\text{C}$. ¿Cuánto tiempo máximo se puede demorar el regreso para que no se derritan?'));
    Pasos(c3,[
      {tex:'\\dfrac{dT}{dt}=-K(T-25)\\ \\Longrightarrow\\ T(t)=25+Ce^{-Kt}',nota:'Misma ley y misma técnica que en el tema Variables separables, card "Ley de enfriamiento de Newton" — acá el objeto se calienta hacia el ambiente en vez de enfriarse hacia él.'},
      {tex:'T(0)=2\\ \\Longrightarrow\\ C=2-25=-23',nota:'Condición inicial: los helados salen del congelador a 2°C.'},
      {tex:'T(4)=9\\ \\Longrightarrow\\ 9=25-23e^{-4K}\\ \\Longrightarrow\\ e^{-4K}=\\dfrac{16}{23}',nota:'Dato de los 4 minutos conversando.'},
      {tex:'T(t^*)=10\\ \\Longrightarrow\\ e^{-Kt^*}=\\dfrac{15}{23}',nota:'t* (medido desde la compra) es el instante en que se alcanza el umbral de derretimiento.'},
      {tex:'\\dfrac{e^{-Kt^*}}{e^{-4K}}=\\dfrac{15/23}{16/23}=\\dfrac{15}{16}',nota:'Dividiendo las dos ecuaciones anteriores, K se cancela sin necesidad de despejarlo primero.'},
      {tex:'e^{-K(t^*-4)}=\\dfrac{15}{16}\\ \\Longrightarrow\\ t^*-4=\\dfrac{\\ln(16/15)}{K}',nota:'Despejando t*−4.'},
      {tex:'t^*-4=\\dfrac{4\\ln(16/15)}{\\ln(23/16)}\\approx0{,}71\\text{ min}\\approx43\\text{ s}',nota:'Sustituyendo K=ln(23/16)/4 del paso anterior. Es el tiempo máximo disponible para el regreso — ya se gastaron los primeros 4 minutos conversando.'}
    ],{modId:'aplicaciones-primer-orden',titulo:'Helados en la playa: T=25−23e^(−Kt)'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$T(t^*)=25-23\\cdot\\dfrac{15}{23}=25-15=10$ ✓, y $T(4)=25-23\\cdot\\dfrac{16}{23}=25-16=9$ ✓, ambos por construcción de $e^{-Kt^*}$ y $e^{-4K}$. El resultado (menos de un minuto) muestra que la estimación de la madre —"que no se derritan en el camino"— era una advertencia con muy poco margen real, no solo una frase.'));
    let regreso=1.5;
    const Kh=Math.log(23/16)/4, tStar=Math.log(23/15)/Kh;
    function TFn(t){return 25-23*Math.exp(-Kh*t);}
    const planoHelado=Plano(c3,{xMin:0,xMax:8,yMin:0,yMax:28,alto:280});
    planoHelado.dibujar(P=>{
      P.ejes();
      P.curva(()=>10,{color:'--muted',grosor:1,guiones:true});
      P.curva(TFn,{color:'--s1',grosor:2.5});
      P.punto(0,2,{color:'--s2',etiqueta:'compra'});
      P.punto(4,9,{color:'--s4',etiqueta:'con la amiga'});
      const tTotal=4+regreso, Tt=TFn(tTotal);
      P.punto(tTotal,Tt,{color:Tt<10?'--s5':'--s8',etiqueta:'ahora'});
    });
    const notaHelado=el('p',{class:'note'});
    function actualizarHelado(){
      const tTotal=4+regreso, Tt=TFn(tTotal);
      notaHelado.textContent='Regreso: '+regreso.toFixed(1)+' min (total desde la compra: '+tTotal.toFixed(1)+' min) → T='+Tt.toFixed(1)+'°C. '+(Tt<10?'Todavía no se derrite (umbral en t≈'+tStar.toFixed(2)+' min).':'¡Ya se pasó del umbral de derretimiento!');
    }
    actualizarHelado();
    c3.append(notaHelado);
    c3.append(el('div',{class:'controls'},
      el('label',{},'minutos de regreso:'),
      el('input',{type:'range',min:'0',max:'4',step:'0.1',value:String(regreso),oninput:e=>{
        regreso=parseFloat(e.target.value); planoHelado.redibujar(); actualizarHelado();
      }})
    ));
    c3.append(el('p',{class:'fuente'},'Fuente: "Estudio EDO.pdf" (repo Material-Ingeniería-Informática), enunciado y planteo de la EDO ($dT/dt=-K(T-T_{amb})$, $T(0)=2$); el cálculo de K, del instante t* y de la respuesta final no aparecen resueltos en la fuente y son elaboración propia, verificada arriba.'));
    sec.append(c3);

    /* -------- Card 4: circuitos RL -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Circuitos RL en serie'));
    c4.append(el('p',{},'Un circuito con una resistencia $R$, un inductor $L$ y una fuente $E(t)$ en serie cumple, por la ley de voltajes de Kirchhoff, que la suma de caídas de voltaje iguala la fuente:'));
    c4.append(el('div',{class:'formula',html:'$$L\\dfrac{di}{dt}+Ri=E(t)$$'}));
    c4.append(el('p',{},'Es una EDO lineal de primer orden en $i(t)$ — misma receta del tema Lineal de primer orden y factor integrante. Para una fuente constante $E(t)=E_0$ (una batería) con el circuito inicialmente sin corriente, $i(0)=0$:'));
    Pasos(c4,[
      {tex:'\\dfrac{di}{dt}+\\dfrac{R}{L}i=\\dfrac{E_0}{L}',nota:'Forma estándar: se divide por L.'},
      {tex:'\\mu(t)=e^{\\int\\frac RL dt}=e^{Rt/L}',nota:'Factor integrante.'},
      {tex:'\\dfrac{d}{dt}\\big[e^{Rt/L}i\\big]=\\dfrac{E_0}{L}e^{Rt/L}\\ \\Longrightarrow\\ e^{Rt/L}i=\\dfrac{E_0}{R}e^{Rt/L}+C',nota:'Multiplicando por μ e integrando.'},
      {tex:'i(0)=0\\ \\Longrightarrow\\ 0=\\dfrac{E_0}{R}+C\\ \\Longrightarrow\\ C=-\\dfrac{E_0}{R}',nota:'Circuito sin corriente al cerrar el interruptor en t=0.'},
      {tex:'i(t)=\\dfrac{E_0}{R}\\big(1-e^{-Rt/L}\\big)',nota:'Solución: la corriente crece desde 0 hacia el valor de régimen E₀/R.'}
    ],{modId:'aplicaciones-primer-orden',titulo:'Circuito RL con fuente constante: i(t)=(E₀/R)(1−e^(−Rt/L))'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$\\dfrac{di}{dt}=\\dfrac{E_0}{L}e^{-Rt/L}$, así que $L\\dfrac{di}{dt}+Ri=E_0e^{-Rt/L}+E_0(1-e^{-Rt/L})=E_0$ ✓ — coincide con la fuente constante. La cantidad $\\tau=L/R$ es la ',el('b',{},'constante de tiempo'),': en $t=\\tau$, $i=(E_0/R)(1-e^{-1})\\approx0{,}632\\,E_0/R$, un 63,2% del valor de régimen, sin importar los valores de R y L.'));
    let Rval=10; const Lval=2, E0val=12;
    function iFn(t,R){return (E0val/R)*(1-Math.exp(-R*t/Lval));}
    const planoRL=Plano(c4,{xMin:0,xMax:2,yMin:0,yMax:2.6,alto:280});
    planoRL.dibujar(P=>{
      P.ejes();
      P.curva(()=>E0val/Rval,{color:'--muted',grosor:1,guiones:true});
      P.curva(t=>iFn(t,Rval),{color:'--s1',grosor:2.5});
      const tau=Lval/Rval;
      P.punto(tau,iFn(tau,Rval),{color:'--s4',etiqueta:'τ=L/R'});
    });
    const notaRL=el('p',{class:'note'});
    function actualizarRL(){
      notaRL.textContent='R='+Rval.toFixed(1)+' Ω, L=2 H, E₀=12 V → i_máx=E₀/R='+(E0val/Rval).toFixed(2)+' A, τ=L/R='+(Lval/Rval).toFixed(2)+' s.';
    }
    actualizarRL();
    c4.append(notaRL);
    c4.append(el('div',{class:'controls'},
      el('label',{},'resistencia R (Ω):'),
      el('input',{type:'range',min:'5',max:'20',step:'0.5',value:String(Rval),oninput:e=>{
        Rval=parseFloat(e.target.value); planoRL.redibujar(); actualizarRL();
      }})
    ));
    c4.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Campbell, Zill) para circuitos RL en serie — no hay cobertura de circuitos en index-v3.html, en las notas del vault, ni en material de Canvas 2026-2 para esta unidad. Los valores numéricos (R=10 Ω, L=2 H, E₀=12 V) y la verificación son elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));

    c5.append(el('details',{},
      el('summary',{},'El tamaño de una población se modela con $\\dfrac{dP}{dt}=1{,}2P-\\dfrac{P^2}{3500}$ (Control 1 de Ecuaciones Diferenciales, Canvas 2026-2). Resolver la ecuación.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dP}{dt}=\\dfrac{P(4200-P)}{3500}$$'}),
        el('div',{class:'formula',html:'$$\\dfrac{dP}{P(4200-P)}=\\dfrac{dt}{3500}$$'}),
        el('div',{class:'formula',html:'$$\\dfrac1{P(4200-P)}=\\dfrac1{4200}\\left(\\dfrac1P+\\dfrac1{4200-P}\\right)$$'}),
        el('div',{class:'formula',html:'$$\\dfrac1{4200}\\ln\\left|\\dfrac{P}{4200-P}\\right|=\\dfrac{t}{3500}+C$$'}),
        el('div',{class:'formula',html:'$$P(t)=\\dfrac{4200}{1+Be^{-1{,}2t}}$$'}),
        el('p',{class:'note'},'La pauta de Canvas llega hasta las fracciones parciales; despejar hasta la forma logística cerrada P(t) es elaboración propia. Verificación: para $P=4200/(1+Be^{-1,2t})$ vale la identidad logística estándar $dP/dt=1{,}2P(1-P/4200)=1{,}2P-P^2/3500$ (porque $1{,}2/4200=1/3500$) ✓, exactamente la ecuación original — misma familia logística que el ejercicio de modelado de población (sección 6.2) del tema Variables separables, ahí con techo 800.000 y acá con K=4200.'))));

    c5.append(el('details',{},
      el('summary',{},'Un estanque de 100 L contiene 5 kg de sal disuelta. Entra salmuera con concentración 0,2 kg/L a 4 L/min, y la mezcla sale a la misma razón (volumen constante). Hallar Q(t) y la cantidad de sal a los 10 minutos.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dQ}{dt}=4(0{,}2)-4\\dfrac{Q}{100}=0{,}8-0{,}04Q\\ \\Longrightarrow\\ Q\'+0{,}04Q=0{,}8$$'}),
        el('div',{class:'formula',html:'$$\\mu(t)=e^{0{,}04t}\\ \\Longrightarrow\\ Q(t)=20+Ce^{-0{,}04t},\\quad Q(0)=5\\Rightarrow C=-15$$'}),
        el('div',{class:'formula',html:'$$Q(t)=20-15e^{-0{,}04t}\\ \\Longrightarrow\\ Q(10)=20-15e^{-0{,}4}\\approx9{,}95\\text{ kg}$$'}),
        el('p',{class:'note'},'A volumen constante, $P(t)=\\text{tasa}/V$ es una constante en vez de depender de t — más simple que el caso de la card "Mezclas en un tanque", donde el volumen crecía.'))));

    c5.append(el('details',{},
      el('summary',{},'Circuito RL con R=5 Ω, L=1 H y E₀=10 V, i(0)=0. Hallar i(t) y el valor de régimen.'),
      el('div',{},
        el('div',{class:'formula',html:'$$i(t)=\\dfrac{E_0}{R}\\big(1-e^{-Rt/L}\\big)=2\\big(1-e^{-5t}\\big)\\text{ A}$$'}),
        el('p',{class:'note'},'Valor de régimen: $i\\to E_0/R=2$ A cuando $t\\to\\infty$. Constante de tiempo $\\tau=L/R=1/5=0{,}2$ s: la misma que en el ejemplo de la card "Circuitos RL en serie" (ahí L=2, R=10, también τ=0,2 s) — coincidencia de estos valores, no una propiedad general.'))));

    c5.append(el('p',{class:'fuente'},'Fuente: primer ejercicio, "Control 1 01-24.pdf" (Canvas 2026-2, Ecuaciones Diferenciales, pregunta 2) — el planteo y las fracciones parciales son de la pauta; el despeje final a forma logística cerrada y la verificación son elaboración propia. Segundo ejercicio: index-v3.html (contenido auditado), ejercicio 6 de la Unidad 1 (mismo enunciado, mezclas a volumen constante). Tercer ejercicio: elaboración propia, aplicando la fórmula de la card "Circuitos RL en serie" con otros valores.'));
    sec.append(c5);
  }});
