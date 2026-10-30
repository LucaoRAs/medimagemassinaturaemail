'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const company = require('../config/institution.js');
const departments = require('../config/departments.js');
const template = require('../templates/signature.js');
const root = path.resolve(__dirname, '..');
const expected = {
  agendamento: ['Agendamento', 'agendamento'], digitacao: ['Digitação', 'digitacao'],
  faturamento: ['Faturamento', 'faturamento'], financeiro: ['Financeiro', 'financeiro'],
  gerencia: ['Gerência', 'gerencia'], laboratorio: ['Laboratório', 'laboratorio'],
  medicos: ['Corpo Médico', 'medicos'], institucional: ['Institucional', 'medimagem'],
  marketing: ['Marketing', 'mkt'], recepcao: ['Recepção', 'recepcao'],
  ressonancia: ['Ressonância Magnética', 'ressonancia'], ti: ['Tecnologia da Informação', 'ti'],
  tomografia: ['Tomografia', 'tomografia']
};
const checks = [];
function check(description, condition) { assert.ok(condition, description); checks.push(description); }
const files = fs.readdirSync(path.join(root, 'assinaturas')).filter(file => file.endsWith('.html'));
check('Exatamente 13 arquivos HTML independentes', files.length === 13);
check('Exatamente 13 departamentos', departments.length === 13);
for (const d of departments) {
  const [name, email] = expected[d.id];
  check(`${d.id}: departamento e conta corretos`, d.name === name && d.email === `${email}@medimagem.med.br`);
  const html = fs.readFileSync(path.join(root, 'assinaturas', `assinatura-${d.id}.html`), 'utf8');
  check(`${d.id}: arquivo sincronizado com configuração/template`, html === template.documentHTML(d, company));
  check(`${d.id}: documento UTF-8 sem caracteres corrompidos`, html.includes('charset="utf-8"') && !/[�]|Ã[£§©³ª]/.test(html));
  check(`${d.id}: abaixo de 10000 caracteres`, html.length < 10000);
  check(`${d.id}: sem scripts, estilos externos, SVG, flex ou grid`, !/<(?:script|style|link|svg|iframe|form)\b|display\s*:\s*(?:flex|grid)|data:|file:|localhost|@font-face|class=/i.test(html));
  check(`${d.id}: estrutura de tabelas`, html.includes('<table role="presentation"') && html.includes('<tbody>') && html.includes('font-family:Arial,Helvetica,sans-serif'));
  check(`${d.id}: imagem absoluta com dimensões e alternativa`, html.includes(`src="${company.logo.url}"`) && /<img[^>]+alt="[^"]+"[^>]+width="\d+" height="\d+"/.test(html));
  check(`${d.id}: e-mail próprio e telefone institucional`, html.includes(`href="mailto:${d.email}"`) && html.includes('href="tel:+553535315710"'));
  const links = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]);
  check(`${d.id}: protocolos de links permitidos`, links.every(link => /^(https:\/\/|mailto:|tel:)/.test(link)));
  check(`${d.id}: resultados conforme configuração`, html.includes(company.resultsUrl) === d.results);
  check(`${d.id}: quatro ícones PNG HTTPS com dimensões explícitas`, Object.values(company.icons).every(icon => html.includes(`src="${icon.url}" alt="" width="14" height="14"`)));
}
check('PNG local idêntico ao recurso público verificado', crypto.createHash('sha256').update(fs.readFileSync(path.join(root, company.logo.local))).digest('hex') === company.logo.sha256);
const malicious = { ...departments[0], name: '<script>alert("x")</script>', email: '" onclick="x' };
check('Template escapa conteúdo e atributos', !template.render(malicious, company).includes('<script>') && !template.render(malicious, company).includes('href="mailto:" onclick='));
const report = { checkedAt: new Date().toISOString(), passed: checks.length, failures: [], checks, signatureSizes: departments.map(d => ({ id: d.id, characters: template.documentHTML(d, company).length })) };
fs.writeFileSync(path.join(root, 'docs', 'static-validation.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`${checks.length} verificações estáticas aprovadas.`);
