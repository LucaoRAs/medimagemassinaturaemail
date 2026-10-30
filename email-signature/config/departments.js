(function (root) {
  'use strict';
  const departments = [
    { id: 'agendamento', name: 'Agendamento', email: 'agendamento@medimagem.med.br', results: true },
    { id: 'digitacao', name: 'Digitação', email: 'digitacao@medimagem.med.br', results: false },
    { id: 'faturamento', name: 'Faturamento', email: 'faturamento@medimagem.med.br', results: false },
    { id: 'financeiro', name: 'Financeiro', email: 'financeiro@medimagem.med.br', results: false },
    { id: 'gerencia', name: 'Gerência', email: 'gerencia@medimagem.med.br', results: false },
    { id: 'laboratorio', name: 'Laboratório', email: 'laboratorio@medimagem.med.br', results: true },
    { id: 'medicos', name: 'Corpo Médico', email: 'medicos@medimagem.med.br', results: true },
    { id: 'institucional', name: 'Institucional', email: 'medimagem@medimagem.med.br', results: false },
    { id: 'marketing', name: 'Marketing', email: 'mkt@medimagem.med.br', results: false },
    { id: 'recepcao', name: 'Recepção', email: 'recepcao@medimagem.med.br', results: true },
    { id: 'ressonancia', name: 'Ressonância Magnética', email: 'ressonancia@medimagem.med.br', results: true },
    { id: 'ti', name: 'Tecnologia da Informação', email: 'ti@medimagem.med.br', results: false },
    { id: 'tomografia', name: 'Tomografia', email: 'tomografia@medimagem.med.br', results: true }
  ];
  if (typeof module === 'object' && module.exports) module.exports = departments;
  else root.MedDepartments = departments;
})(typeof globalThis === 'object' ? globalThis : this);
