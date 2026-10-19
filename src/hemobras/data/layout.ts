import {units, type Unit} from './organization';
export type DiagramNode = {id: string; x: number; y: number; w: number; h: number; size: number};
const node = (id: string, x: number, y: number, w = 900, h = 125, size = 44): DiagramNode => ({id,x,y,w,h,size});
export const contextUnits: Unit[] = [
 {id:'auditoria-comite',name:'Comitê de Auditoria',parent:'cadm',relation:'advisory'},
 {id:'pessoas-comite',name:'Comitê de Pessoas, Elegibilidade, Sucessão e Remuneração',parent:'cadm',relation:'advisory'},
 {id:'tecnico-comite',name:'Comitê Técnico Científico',parent:'cadm',relation:'advisory'},
 {id:'auditoria',name:'Auditoria Interna',parent:'cadm',relation:'advisory'},
 {id:'ouvidoria',name:'Ouvidoria',parent:'cadm',relation:'advisory'},
 {id:'relacoes-institucionais',name:'Assessoria de Relações Institucionais',parent:'gabinete',relation:'hierarchy'},
 {id:'relacoes-internacionais',name:'Assessoria de Relações Internacionais',parent:'gabinete',relation:'hierarchy'},
 {id:'inovacao',name:'Assessoria de Inovação',parent:'gabinete',relation:'hierarchy'},
 {id:'juridica-contencioso',name:'Assessoria Jurídica (contensioso)',parent:'procuradoria',relation:'hierarchy'},
 {id:'juridica-consultivo',name:'Assessoria Jurídica (consultivo)',parent:'procuradoria',relation:'hierarchy'},
 {id:'inteligencia-mercado',name:'Coordenadoria de Inteligência de Mercado',parent:'negocios',relation:'hierarchy'},
 {id:'parcerias',name:'Coordenadoria de Parcerias e Novos Negócios',parent:'negocios',relation:'hierarchy'},
 {id:'eventos',name:'Coordenadoria de Eventos',parent:'comunicacao',relation:'hierarchy'},
 {id:'planejamento-orcamento',name:'Coordenadoria de Planejamento e Orçamento',parent:'estrategica',relation:'hierarchy'},
 {id:'escritorio',name:'Coordenadoria de Escritório de Gestão de Projetos e de Processos',parent:'estrategica',relation:'hierarchy'},
 {id:'pmo',name:'Supervisão de Gestão de Projetos (PMO)',parent:'escritorio',relation:'hierarchy'},
 {id:'processos',name:'Supervisão de Gestão de Processos',parent:'escritorio',relation:'hierarchy'},
];
export const diagramUnits = [...units,...contextUnits];
export const layout: DiagramNode[] = [
 node('assembleia',1800,0,580,120,48),node('cadm',1800,230,580,120,44),
 node('fiscal',2800,230,500,120,44),node('executiva',1800,470,580,120,46),
 node('presidencia',1800,800,580,120,50),
 node('auditoria-comite',200,230,620,110,34),node('pessoas-comite',200,400,620,150,32),
 node('tecnico-comite',200,620,620,110,34),node('secretaria',200,800,620,150,38),
 node('auditoria',1040,230,560,110,38),node('corregedoria',1040,470,560,110,44),node('ouvidoria',1040,680,560,110,44),
 ...['seguranca','tecnologia','asg','diversidade','integridade','etica'].map((id,i)=>node(id,2450+i*500,600,450,150,38)),
 node('gabinete',900,1170),node('procuradoria',900,1810),node('conformidade',900,2190,900,150,36),node('negocios',900,2420,900,130),
 node('assessoria',2380,1170),node('comunicacao',2380,1380),node('estrategica',2380,1850),
 node('relacoes-institucionais',-150,1335,900,110,38),node('relacoes-internacionais',-150,1490,900,110,38),node('inovacao',-150,1645,900,110,38),
 node('juridica-contencioso',0,1985,750,110,34),node('juridica-consultivo',0,2140,750,110,34),
 node('inteligencia-mercado',-100,2610,900,115,38),node('parcerias',-100,2760,900,115,38),
 node('eventos',3450,1560,900,125,40),node('planejamento-orcamento',3450,1880,900,125,38),node('escritorio',3450,2060,900,150,36),
 node('pmo',4450,2290,700,110,34),node('processos',4450,2440,700,110,34),
 node('industrial',500,3150,900,270,64),node('qualidade',1650,3150,900,270,64),node('corporativa',2800,3150,900,270,64),
];
export const findNode=(id:string)=>layout.find(n=>n.id===id)!;
export const labelFor=(id:string)=>diagramUnits.find(n=>n.id===id)!.name;
export function connector(id:string):string {
 const n=findNode(id);const u=diagramUnits.find(x=>x.id===id)!;
 if(!u.parent)return '';
 const p=findNode(u.parent);const cx=n.x+n.w/2;const cy=n.y+n.h/2;const px=p.x+p.w/2;
 if(id==='fiscal')return `M${px} ${p.y+p.h} V175 H${cx} V${n.y}`;
 if(['cadm','executiva','presidencia'].includes(id))return `M${px} ${p.y+p.h} V${n.y}`;
 if(['auditoria-comite','pessoas-comite','tecnico-comite','secretaria','auditoria','corregedoria','ouvidoria'].includes(id))return `M1800 290 H1700 V190 H940 V${cy} H${n.x<900?n.x+n.w:n.x}`;
 if(u.parent==='executiva')return `M2380 530 H${cx} V${n.y}`;
 if(['industrial','qualidade','corporativa'].includes(id))return `M2090 920 V3000 H${cx} V${n.y}`;
 if(u.parent==='presidencia')return `M2090 920 V${cy} H${n.x<2000?n.x+n.w:n.x}`;
 const right=n.x>p.x;
 const bus=right?p.x+p.w+90:p.x-100;
 return `M${right?p.x+p.w:p.x} ${p.y+p.h/2} H${bus} V${cy} H${right?n.x:n.x+n.w}`;
}
// Linhas são geradas a partir dos mesmos parents que definem a estrutura oficial.
