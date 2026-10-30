'use strict';
const fs = require('node:fs');
const path = require('node:path');
const institution = require('../config/institution.js');
const departments = require('../config/departments.js');
const template = require('../templates/signature.js');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assinaturas');

function validateConfig() {
  if (departments.length !== 13) throw new Error('A configuração deve conter 13 departamentos.');
  for (const key of ['id', 'email']) {
    if (new Set(departments.map(item => item[key])).size !== departments.length) throw new Error(`Valor duplicado: ${key}`);
  }
  for (const d of departments) {
    if (!/^[a-z0-9-]+$/.test(d.id) || !/^[a-z]+@medimagem\.med\.br$/.test(d.email) || !d.name) throw new Error('Departamento inválido.');
  }
  for (const url of [institution.website, institution.logo.url, institution.contactUrl, institution.resultsUrl, institution.whatsapp.url, institution.ombudsman.url, ...Object.values(institution.icons).map(icon => icon.url)]) {
    if (new URL(url).protocol !== 'https:') throw new Error(`A URL deve usar HTTPS: ${url}`);
  }
  for (const color of Object.values(institution.colors)) {
    if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error(`Cor inválida: ${color}`);
  }
  for (const d of departments) {
    if (template.documentHTML(d, institution).length >= 10000) throw new Error(`Assinatura excede o limite: ${d.id}`);
  }
}

validateConfig();
fs.mkdirSync(output, { recursive: true });
const manifest = departments.map(department => {
  const file = `assinatura-${department.id}.html`;
  const html = template.documentHTML(department, institution);
  fs.writeFileSync(path.join(output, file), html, 'utf8');
  return { department: department.name, email: department.email, file, characters: html.length, bytes: Buffer.byteLength(html) };
});
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'assets', 'brand.css'), '/* Gerado por scripts/generate.cjs a partir de config/institution.js. */\n:root {\n' + Object.entries(institution.colors).map(([key, value]) => `  --${key.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}: ${value};`).join('\n') + '\n}\n');
console.log(`Geradas ${manifest.length} assinaturas. Maior documento: ${Math.max(...manifest.map(item => item.characters))} caracteres.`);
