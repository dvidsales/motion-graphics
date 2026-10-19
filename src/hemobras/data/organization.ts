// Fonte: Organograma Hemobrás, aprovado CADM em 22/05/2026.
// Os tipos de ligação são preservados; posição no layout não cria subordinação.
export type Unit = {id: string; name: string; parent: string | null; relation: 'hierarchy' | 'advisory'};
export const units: Unit[] = [
  {id: 'assembleia', name: 'Assembleia Geral', parent: null, relation: 'hierarchy'},
  {id: 'cadm', name: 'Conselho de Administração', parent: 'assembleia', relation: 'hierarchy'},
  {id: 'fiscal', name: 'Conselho Fiscal', parent: 'assembleia', relation: 'hierarchy'},
  {id: 'executiva', name: 'Diretoria Executiva', parent: 'cadm', relation: 'hierarchy'},
  {id: 'presidencia', name: 'Presidência', parent: 'executiva', relation: 'hierarchy'},
  {id: 'secretaria', name: 'Secretaria Executiva dos Órgãos Colegiados', parent: 'cadm', relation: 'advisory'},
  {id: 'corregedoria', name: 'Corregedoria', parent: 'cadm', relation: 'advisory'},
  {id: 'seguranca', name: 'Comitê de Segurança da Informação', parent: 'executiva', relation: 'advisory'},
  {id: 'tecnologia', name: 'Comitê de Tecnologia da Informação', parent: 'executiva', relation: 'advisory'},
  {id: 'asg', name: 'Comitê ASG', parent: 'executiva', relation: 'advisory'},
  {id: 'diversidade', name: 'Comitê de Diversidade', parent: 'executiva', relation: 'advisory'},
  {id: 'integridade', name: 'Comitê de Governança e Integridade', parent: 'executiva', relation: 'advisory'},
  {id: 'etica', name: 'Comitê de Ética', parent: 'executiva', relation: 'advisory'},
  {id: 'gabinete', name: 'Gabinete da Presidência', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'procuradoria', name: 'Procuradoria Jurídica', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'conformidade', name: 'Assessoria de Conformidade, Integridade, Governança e Risco', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'negocios', name: 'Gerência de Inteligência e Novos Negócios', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'assessoria', name: 'Assessoria', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'comunicacao', name: 'Assessoria de Comunicação', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'estrategica', name: 'Gerência de Gestão Estratégica', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'industrial', name: 'Diretoria Industrial', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'qualidade', name: 'Diretoria de Qualidade e Suprimentos', parent: 'presidencia', relation: 'hierarchy'},
  {id: 'corporativa', name: 'Diretoria de Gestão Corporativa e Financeira', parent: 'presidencia', relation: 'hierarchy'},
];
export const unit = (id: string) => {
  const found = units.find((item) => item.id === id);
  if (!found) throw new Error(`Unidade ausente: ${id}`);
  return found;
};
export const committeeIds = ['seguranca', 'tecnologia', 'asg', 'diversidade', 'integridade', 'etica'];
export const presidencyIds = ['gabinete', 'procuradoria', 'conformidade', 'negocios', 'assessoria', 'comunicacao', 'estrategica'];
export const directorateIds = ['industrial', 'qualidade', 'corporativa'];
