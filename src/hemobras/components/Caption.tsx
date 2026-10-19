const keywords=/\b(Presidência|Assembleia Geral|Conselho de Administração|Diretoria Executiva|Conselho Fiscal|Secretaria Executiva dos Órgãos Colegiados|Corregedoria|Diretoria Industrial|Diretoria de Qualidade e Suprimentos|Diretoria de Gestão Corporativa e Financeira)\b/g;
export function Caption({text}:{text:string}) {
 const parts=text.split(keywords);
 return <>{parts.map((part,i)=>i%2?<strong key={i} style={{color:'#8c1228',fontWeight:600}}>{part}</strong>:part)}</>;
}
