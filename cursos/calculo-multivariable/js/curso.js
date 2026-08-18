window.CURSO={
  slug:'calculo-multivariable',
  titulo:'Cálculo Multivariable',
  emoji:'∇',
  codigo:'IIM228A (IPLC214)',
  semestre:'2026-2',
  bibliografia:'Stewart, «Cálculo Trascendentes Tempranas», 4.ª ed. · Larson, «Cálculo y Geometría Analítica vol. 2», 6.ª ed.',
  unidades:{
    inicio:'',
    I:'Funciones vectoriales',
    II:'Cálculo diferencial',
    III:'Cálculo integral',
    IV:'Integrales de línea y de superficie'
  },
  evaluaciones:[
    {id:'test-1',nombre:'Test 1',fecha:'semana 3, en ayudantía',
     temas:['Unidad I completa']},
    {id:'test-2',nombre:'Test 2',fecha:'semana 5, en ayudantía',
     temas:['Cálculo diferencial hasta gradiente y plano tangente']},
    {id:'certamen-1',nombre:'Certamen 1',fecha:'05/09/2026 · 11:15–13:15',
     temas:['Unidad I','Unidad II hasta aproximación lineal']},
    {id:'test-3',nombre:'Test 3',fecha:'semana 10, en ayudantía',
     temas:['Integrales dobles']},
    {id:'test-4',nombre:'Test 4',fecha:'semana 12, en ayudantía',
     temas:['Integrales triples e integral de línea']},
    {id:'certamen-2',nombre:'Certamen 2',fecha:'24/10/2026 · 11:15–13:15',
     temas:['Unidad II restante','Unidad III','inicio de Unidad IV']},
    {id:'test-5',nombre:'Test 5',fecha:'semana 16, en ayudantía',
     temas:['Stokes y teorema de la divergencia']}
  ],
  reglas:[
    '5 tests en ayudantía valen 30 % en conjunto; se elimina la peor nota (no hay justificación de inasistencia a estas evaluaciones).',
    'Certamen 1 y Certamen 2 valen 35 % cada uno.',
    'Examen final acumulativo 30 %, con nota mínima 3,0. Si el examen queda bajo 3,0, se reprueba el ramo con esa nota.'
  ],
  semanas:[
    {n:1,desde:'03-08',hasta:'09-08',hito:'Inicio de clases',tema:'geometria-vectorial'},
    {n:2,desde:'10-08',hasta:'16-08',hito:'Elimina/agrega · 15/08 feriado',tema:'triedro-tnb'},
    {n:3,desde:'17-08',hasta:'23-08',hito:'Test 1',tema:'varias-variables'},
    {n:4,desde:'24-08',hasta:'30-08',hito:'',tema:'derivadas-parciales'},
    {n:5,desde:'31-08',hasta:'06-09',hito:'Test 2 · Certamen 1 el 05/09',tema:'gradiente'},
    {n:6,desde:'07-09',hasta:'13-09',hito:'Ronda de certámenes',tema:null},
    {n:7,desde:'14-09',hasta:'20-09',hito:'Fiestas Patrias — sin actividades',tema:null},
    {n:8,desde:'21-09',hasta:'27-09',hito:'',tema:'direccional'},
    {n:9,desde:'28-09',hasta:'04-10',hito:'',tema:'extremos'},
    {n:10,desde:'05-10',hasta:'11-10',hito:'Semana i · Test 3',tema:'integrales-dobles'},
    {n:11,desde:'12-10',hasta:'18-10',hito:'12/10 feriado',tema:'integrales-triples'},
    {n:12,desde:'19-10',hasta:'25-10',hito:'Test 4 · Certamen 2 el 24/10',tema:'integral-linea'},
    {n:13,desde:'26-10',hasta:'01-11',hito:'31/10 feriado',tema:'green'},
    {n:14,desde:'02-11',hasta:'08-11',hito:'Segunda ronda de certámenes',tema:null},
    {n:15,desde:'09-11',hasta:'15-11',hito:'Elimina extraordinaria 10/11 · Feria de las Ciencias 10-12/11',tema:'superficies'},
    {n:16,desde:'16-11',hasta:'22-11',hito:'Test 5 · fin de clases 21/11',tema:'stokes-gauss'},
    {n:17,desde:'23-11',hasta:'29-11',hito:'Exámenes finales',tema:null},
    {n:18,desde:'30-11',hasta:'06-12',hito:'Exámenes finales',tema:null},
    {n:19,desde:'07-12',hasta:'11-12',hito:'Recuperativos',tema:null}
  ]
};
