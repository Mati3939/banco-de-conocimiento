/* contenidoOficial original (índice a cubrir):
   - La ecuación de Euler */
registerModule({id:'euler',title:'La ecuación de Euler',unidad:'II',semanas:[10],evaluacion:['taller-1','certamen-2'],
  lead:'La ecuación de Euler-Cauchy tiene coeficientes variables, pero la sustitución y=xʳ la reduce a una ecuación algebraica en r con la misma estructura de tres casos que la ecuación característica.',
  build(sec){

    /* -------- Card 1: sustitución y ecuación indicial -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'La sustitución $y=x^r$ y la ecuación indicial'));
    c1.append(el('p',{},'Es el caso más importante de EDO de segundo orden con ',el('b',{},'coeficientes variables'),' que aun así tiene solución cerrada sencilla, sin necesitar el tema Reducción de orden y coeficientes indeterminados desde una solución conocida:'));
    c1.append(el('div',{class:'formula',html:'$$x^2y\'\'+bxy\'+cy=0,\\qquad x\\gt0$$'}));
    c1.append(el('p',{},'Se propone $y=x^r$ — el análogo de $e^{\\lambda x}$ para coeficientes constantes:'));
    Pasos(c1,[
      {tex:'y=x^r,\\qquad y\'=rx^{r-1},\\qquad y\'\'=r(r-1)x^{r-2}',nota:'Propuesta y sus derivadas.'},
      {tex:'x^2\\cdot r(r-1)x^{r-2}+bx\\cdot rx^{r-1}+c\\cdot x^r=0',nota:'Sustituyendo en la EDO.'},
      {tex:'x^r\\big[r(r-1)+br+c\\big]=0',nota:'Cada término aporta el mismo factor xʳ; se saca factor común.'},
      {tex:'r(r-1)+br+c=0 \\ \\Longleftrightarrow\\ r^2+(b-1)r+c=0',nota:'Como xʳ≠0 para x>0, el problema se reduce a esta ecuación indicial algebraica en r — el análogo exacto de la ecuación característica.'}
    ],{modId:'euler',titulo:'De x²y″+bxy′+cy=0 a la ecuación indicial'});
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Ecuación de Euler-Cauchy (coeficientes variables)".'));
    sec.append(c1);

    /* -------- Card 2: los tres casos -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Los tres casos, según el discriminante'));
    c2.append(el('p',{},'El discriminante de la ecuación indicial clasifica la solución general en tres familias — misma lógica que la clasificación por discriminante de una ecuación característica, solo que con $x^r$ en vez de $e^{\\lambda x}$:'));
    c2.append(el('p',{},el('b',{},'1. Raíces reales distintas '),el('span',{class:'mathinline',html:'$r_1\\neq r_2$'}),':'));
    c2.append(el('div',{class:'formula',html:'$$y=c_1x^{r_1}+c_2x^{r_2}$$'}));
    c2.append(el('p',{},el('b',{},'2. Raíz real repetida '),el('span',{class:'mathinline',html:'$r$'}),':'));
    c2.append(el('div',{class:'formula',html:'$$y=(c_1+c_2\\ln x)\\,x^{r}$$'}));
    c2.append(el('p',{},el('b',{},'3. Raíces complejas conjugadas '),el('span',{class:'mathinline',html:'$r=\\alpha\\pm\\beta i$'}),':'));
    c2.append(el('div',{class:'formula',html:'$$y=x^\\alpha\\big(c_1\\cos(\\beta\\ln x)+c_2\\sin(\\beta\\ln x)\\big)$$'}));
    c2.append(el('p',{class:'note'},'La sustitución $t=\\ln x$ convierte Euler-Cauchy en una ecuación de coeficientes ',el('b',{},'constantes'),' en $t$ — por eso la estructura es idéntica, con $\\ln x$ haciendo el papel de $x$ y $x^r$ el de $e^{\\lambda x}$. Válida tal como está para $x\\gt0$; para $x\\lt0$ se reemplaza $x$ por $|x|$. En el caso 2, olvidar el factor $\\ln x$ en el segundo término deja dos "soluciones" linealmente dependientes — mismo error posible que en la clasificación de raíz doble de una ecuación característica ordinaria.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Ecuación de Euler-Cauchy (coeficientes variables)".'));
    sec.append(c2);

    /* -------- Card 3: ejemplos de los tres casos -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Los tres casos, resueltos'));
    c3.append(el('p',{},'Hallar la solución general de (a) $x^2y\'\'-2y=0$, (b) $x^2y\'\'-3xy\'+4y=0$ y (c) $x^2y\'\'+xy\'+y=0$.'));
    Pasos(c3,[
      {tex:'(a)\\ r(r-1)-2=0 \\ \\Longrightarrow\\ r^2-r-2=(r-2)(r+1)=0',nota:'Raíces reales distintas: r=2,−1.'},
      {tex:'y=c_1x^2+c_2x^{-1}',nota:'Caso 1.'},
      {tex:'(b)\\ r(r-1)-3r+4=0 \\ \\Longrightarrow\\ r^2-4r+4=(r-2)^2=0',nota:'Raíz real repetida: r=2 (doble).'},
      {tex:'y=(c_1+c_2\\ln x)\\,x^2',nota:'Caso 2.'},
      {tex:'(c)\\ r(r-1)+r+1=0 \\ \\Longrightarrow\\ r^2+1=0',nota:'Raíces complejas conjugadas: r=±i (α=0, β=1).'},
      {tex:'y=c_1\\cos(\\ln x)+c_2\\sin(\\ln x)',nota:'Caso 3.'}
    ],{modId:'euler',titulo:'Los tres casos de Euler-Cauchy'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación de (c): '),'$y=\\cos(\\ln x)\\Rightarrow y\'=-\\dfrac{\\sin(\\ln x)}{x}\\Rightarrow y\'\'=\\dfrac{\\sin(\\ln x)-\\cos(\\ln x)}{x^2}$ (regla del producto sobre $-\\sin(\\ln x)\\cdot x^{-1}$). Entonces $x^2y\'\'+xy\'+y=[\\sin(\\ln x)-\\cos(\\ln x)]-\\sin(\\ln x)+\\cos(\\ln x)=0$ ✓. Los casos (a) y (b) se verifican igual de directo derivando $x^2$, $x^{-1}$ y $x^2\\ln x$.'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 9 "Ecuación de Euler-Cauchy: los tres casos". La verificación del caso (c) es elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: conexión con reducción de orden -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Cuando conviene el atajo, y cuando no hay atajo'));
    c4.append(el('p',{},'La ecuación indicial es un atajo: solo existe porque Euler-Cauchy tiene la forma exacta $x^2y\'\'+bxy\'+cy=0$. Si en cambio solo se conoce ',el('i',{},'una'),' solución $y_1$ de una ecuación con coeficientes variables que no encaja en ese molde, no hay ecuación indicial que resolver — hace falta el tema ',el('b',{},'Reducción de orden y coeficientes indeterminados'),'. Ese tema resuelve, por reducción de orden desde $y_1=x^2$, la misma ecuación (b) de la card "Los tres casos, resueltos" ($x^2y\'\'-3xy\'+4y=0$) y obtiene $y_2=x^2\\ln x$ — exactamente el factor $x^2\\ln x$ del caso 2 de esta card, confirmando que ambos métodos son consistentes cuando los dos aplican.'));
    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia — cruce entre el ejemplo 9(b) de esta card y el ejercicio de reducción de orden con y₁=x² del tema Reducción de orden y coeficientes indeterminados.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));

    c5.append(el('details',{},
      el('summary',{},'Resolver $x^2y\'\'+5xy\'+4y=0$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$r(r-1)+5r+4=0 \\ \\Longrightarrow\\ r^2+4r+4=(r+2)^2=0 \\ \\Longrightarrow\\ r=-2\\ (\\text{doble})$$'}),
        el('div',{class:'formula',html:'$$y(x)=(c_1+c_2\\ln x)\\,x^{-2}$$'}),
        el('p',{class:'note'},'Verificación del término $x^{-2}\\ln x$: $y=x^{-2}\\ln x\\Rightarrow y\'=-2x^{-3}\\ln x+x^{-3}\\Rightarrow y\'\'=6x^{-4}\\ln x-5x^{-4}$; $x^2y\'\'+5xy\'+4y=(6-10+4)x^{-2}\\ln x+(-5+5)x^{-2}=0$ ✓.'))));

    c5.append(el('details',{},
      el('summary',{},'Resolver $x^2y\'\'+2xy\'-6y=0$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$r(r-1)+2r-6=0 \\ \\Longrightarrow\\ r^2+r-6=(r+3)(r-2)=0 \\ \\Longrightarrow\\ r=2,-3$$'}),
        el('div',{class:'formula',html:'$$y(x)=c_1x^2+c_2x^{-3}$$'}),
        el('p',{class:'note'},'Verificación de $x^{-3}$: $y=x^{-3}\\Rightarrow y\'=-3x^{-4}\\Rightarrow y\'\'=12x^{-5}$; $x^2(12x^{-5})+2x(-3x^{-4})-6x^{-3}=12x^{-3}-6x^{-3}-6x^{-3}=0$ ✓.'))));

    c5.append(el('p',{class:'fuente'},'Fuente: primer ejercicio, index-v3.html (contenido auditado), ejercicio 10 de la Unidad 2 (mismo enunciado). Segundo ejercicio: elaboración propia, mismo patrón (caso 1) con otros coeficientes.'));
    sec.append(c5);
  }});
