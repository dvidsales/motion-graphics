export type Cue={start:number;end:number;strong:string[];outlined:string[];caption:string;section:string};
const top=['assembleia','cadm','executiva','presidencia','fiscal'];
const committee=['seguranca','tecnologia','asg','diversidade','integridade','etica'];
export const cues:Cue[]=[
 {start:240,end:315,strong:['presidencia'],outlined:top,caption:'Acima da Presidência, permanecem a Assembleia Geral e os órgãos Conselho de Administração, Diretoria Executiva e Conselho Fiscal.',section:'Topo da estrutura'},
 {start:315,end:385,strong:['assembleia'],outlined:top,caption:'Acima da Presidência, permanecem a Assembleia Geral e os órgãos Conselho de Administração, Diretoria Executiva e Conselho Fiscal.',section:'Topo da estrutura'},
 {start:385,end:450,strong:['cadm'],outlined:top,caption:'Acima da Presidência, permanecem a Assembleia Geral e os órgãos Conselho de Administração, Diretoria Executiva e Conselho Fiscal.',section:'Topo da estrutura'},
 {start:450,end:510,strong:['executiva'],outlined:top,caption:'Acima da Presidência, permanecem a Assembleia Geral e os órgãos Conselho de Administração, Diretoria Executiva e Conselho Fiscal.',section:'Topo da estrutura'},
 {start:510,end:570,strong:['fiscal'],outlined:top,caption:'Acima da Presidência, permanecem a Assembleia Geral e os órgãos Conselho de Administração, Diretoria Executiva e Conselho Fiscal.',section:'Topo da estrutura'},
 {start:570,end:660,strong:['secretaria'],outlined:['cadm','corregedoria','secretaria'],caption:'Mas agora o Conselho de Administração abrange também a Secretaria Executiva dos Órgãos Colegiados e a Corregedoria.',section:'Conselho de Administração'},
 {start:660,end:780,strong:['corregedoria'],outlined:['cadm','secretaria','corregedoria'],caption:'Mas agora o Conselho de Administração abrange também a Secretaria Executiva dos Órgãos Colegiados e a Corregedoria.',section:'Conselho de Administração'},
 {start:780,end:820,strong:['executiva'],outlined:committee.slice(0,3),caption:'E a Diretoria Executiva incorpora os seguintes comitês.',section:'Diretoria Executiva'},
 {start:820,end:930,strong:[],outlined:committee.slice(0,3),caption:'E a Diretoria Executiva incorpora os seguintes comitês.',section:'Diretoria Executiva'},
 {start:930,end:1030,strong:[],outlined:committee.slice(3),caption:'E a Diretoria Executiva incorpora os seguintes comitês.',section:'Diretoria Executiva'},
 {start:1030,end:1080,strong:[],outlined:committee,caption:'E a Diretoria Executiva incorpora os seguintes comitês.',section:'Diretoria Executiva'},
 {start:1200,end:1320,strong:['gabinete','procuradoria'],outlined:['presidencia','gabinete','procuradoria'],caption:'A estrutura da Presidência reúne atividades de gabinete, jurídicas, governança, desenvolvimento de negócios, assessoramento, comunicação e gestão estratégica.',section:'Presidência'},
 {start:1320,end:1430,strong:['conformidade','negocios'],outlined:['presidencia','conformidade','negocios'],caption:'A estrutura da Presidência reúne atividades de gabinete, jurídicas, governança, desenvolvimento de negócios, assessoramento, comunicação e gestão estratégica.',section:'Presidência'},
 {start:1430,end:1560,strong:['assessoria','comunicacao'],outlined:['presidencia','assessoria','comunicacao','estrategica'],caption:'A estrutura da Presidência reúne atividades de gabinete, jurídicas, governança, desenvolvimento de negócios, assessoramento, comunicação e gestão estratégica.',section:'Presidência'},
 {start:1560,end:1680,strong:['estrategica'],outlined:['presidencia','assessoria','comunicacao','estrategica'],caption:'A estrutura da Presidência reúne atividades de gabinete, jurídicas, governança, desenvolvimento de negócios, assessoramento, comunicação e gestão estratégica.',section:'Presidência'},
 {start:1680,end:1860,strong:[],outlined:['industrial','qualidade','corporativa'],caption:'E essas são as diretorias da Hemobrás!\nDiretoria Industrial • Diretoria de Qualidade e Suprimentos • Diretoria de Gestão Corporativa e Financeira',section:'Diretorias da Hemobrás'},
];
export const cueAt=(frame:number)=>cues.find(c=>frame>=c.start&&frame<c.end);
