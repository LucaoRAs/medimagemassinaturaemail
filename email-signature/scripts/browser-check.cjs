'use strict';
// Browser QA without npm dependencies. Node 22+, or Node 20 --experimental-websocket.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const company = require('../config/institution.js');
const departments = require('../config/departments.js');
const template = require('../templates/signature.js');
const root = path.resolve(__dirname, '..');
const qa = path.join(root, '.qa');
const previews = path.join(root, 'docs', 'previews');
fs.mkdirSync(path.join(qa, 'downloads'), { recursive: true });
fs.mkdirSync(previews, { recursive: true });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const checks = [], layouts = [], errors = [];
function check(name, passed, details) { checks.push({ name, passed: Boolean(passed), ...(details === undefined ? {} : { details }) }); }
const server = http.createServer((req, res) => {
  let target;
  try { target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); } catch (_) { res.writeHead(400).end(); return; }
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end(); return; }
  if (target === root || fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.woff2': 'font/woff2' };
  fs.readFile(target, (error, content) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' }); res.end(content);
  });
});

(async () => {
  let browser, socket;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const browserPath = process.env.BROWSER_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const profile = path.join(qa, `profile-${process.pid}`);
    browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
    browser.on('error', error => { errors.push(error.message); });
    const portFile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await delay(100);
    if (!fs.existsSync(portFile)) throw new Error('Chrome não iniciou o endpoint de depuração.');
    const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
    const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
    let sequence = 0;
    const pending = new Map();
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const handler = pending.get(message.id); pending.delete(message.id);
        message.error ? handler.reject(new Error(JSON.stringify(message.error))) : handler.resolve(message.result);
      } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
      pending.set(id, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
      socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const viewport = width => send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
    const navigate = async url => {
      await send('Page.navigate', { url });
      await delay(150);
      await evaluate(`new Promise(resolve => { const finish = () => document.fonts.ready.then(() => resolve(true)); if (document.readyState === 'complete') finish(); else window.addEventListener('load', finish, { once: true }); })`);
    };
    const screenshot = async (name, clip) => {
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, ...(clip ? { clip: { ...clip, scale: 1 } } : {}) });
      fs.writeFileSync(path.join(previews, name), Buffer.from(shot.data, 'base64'));
    };
    await send('Page.enable'); await send('Runtime.enable');
    await viewport(1440); await navigate(origin + '/index.html');
    check('13 opções no seletor e 13 departamentos na lista', await evaluate(`document.querySelectorAll('#department-select option').length === 13 && document.querySelectorAll('.department-button').length === 13`));
    check('Fonte local Quicksand carregada', await evaluate(`document.fonts.check('600 16px Quicksand')`));
    check('Logotipo vertical HTTPS carregou no navegador', await evaluate(`document.querySelector('#signature-preview img').naturalWidth === ${company.logo.originalWidth} && document.querySelector('#signature-preview img').naturalHeight === ${company.logo.originalHeight} && document.querySelector('#logo-status').dataset.state === 'loaded'`));
    check('Quatro ícones de contato carregaram', await evaluate(`[...document.querySelectorAll('#signature-preview img')].slice(1).length === 4 && [...document.querySelectorAll('#signature-preview img')].every(img => img.complete && img.naturalWidth > 0)`));
    await screenshot('painel-desktop.png');
    const rect = await evaluate(`(() => { const r = document.querySelector('#signature-preview > table').getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })()`);
    await screenshot('assinatura-agendamento.png', rect);
    await evaluate(`document.querySelector('[data-department="marketing"]').click()`);
    await screenshot('assinatura-marketing.png', await evaluate(`(() => { const r = document.querySelector('#signature-preview > table').getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })()`));
    for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
      await viewport(width);
      for (const d of departments) {
        await evaluate(`document.querySelector('#department-select').value = ${JSON.stringify(d.id)}; document.querySelector('#department-select').dispatchEvent(new Event('change'));`);
        const layout = await evaluate(`(() => { const p = document.querySelector('#signature-preview'); const table = p.querySelector('table'); return { viewport: innerWidth, document: document.documentElement.scrollWidth, previewWidth:p.clientWidth, previewScroll:p.scrollWidth, tableWidth:table.getBoundingClientRect().width, email:p.querySelector('a[href^="mailto:"]').textContent, selected:document.querySelectorAll('[aria-current="true"]').length, broken:[...document.images].filter(i => i.complete && !i.naturalWidth).length }; })()`);
        layouts.push({ width, department: d.id, ...layout });
        check(`Layout ${width}px / ${d.id}`, layout.document <= width && layout.previewScroll <= layout.previewWidth + 1 && layout.email === d.email && layout.selected === 1 && layout.broken === 0, layout);
      }
    }
    await viewport(390); await navigate(origin + '/index.html'); await screenshot('painel-celular.png');
    await viewport(1440); await navigate(origin + '/index.html#ti');
    check('Link direto seleciona Tecnologia da Informação', await evaluate(`document.querySelector('#preview-title').textContent === 'Tecnologia da Informação'`));
    await evaluate(`document.querySelector('[data-department="recepcao"]').click()`);
    check('Clique na lista atualiza a conta', await evaluate(`document.querySelector('#selected-email').textContent === 'recepcao@medimagem.med.br'`));
    await send('Browser.grantPermissions', { origin, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
    await send('Page.bringToFront');
    await evaluate(`document.querySelector('#copy-signature').click()`);
    await delay(300);
    const clipboard = await evaluate(`(async () => { const items = await navigator.clipboard.read(); const item = items[0]; return { types:item.types, html:await (await item.getType('text/html')).text(), plain:await (await item.getType('text/plain')).text() }; })()`);
    check('Clipboard API escreve text/html e text/plain reais', clipboard.types.includes('text/html') && clipboard.types.includes('text/plain') && clipboard.html.includes('mailto:recepcao@medimagem.med.br') && clipboard.html.includes(company.logo.url) && clipboard.plain.includes('Recepção'));
    await evaluate(`(() => { const target = document.createElement('div'); target.id = 'qa-paste'; target.contentEditable = 'true'; document.body.append(target); target.focus(); })()`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'v', code: 'KeyV', modifiers: 2, windowsVirtualKeyCode: 86 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'v', code: 'KeyV', modifiers: 2, windowsVirtualKeyCode: 86 });
    await delay(300);
    check('Colagem real em editor HTML preserva tabela, imagem, links e estilo', await evaluate(`(() => { const target = document.querySelector('#qa-paste'); return !!target.querySelector('table') && !!target.querySelector('img[src^="https:"]') && !!target.querySelector('a[href="mailto:recepcao@medimagem.med.br"]') && !!target.querySelector('[style]'); })()`));
    await evaluate(`document.querySelector('#qa-paste').remove()`);
    await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: path.join(qa, 'downloads') });
    await evaluate(`document.querySelector('#download-signature').click()`);
    const download = path.join(qa, 'downloads', 'assinatura-recepcao.html');
    for (let i = 0; i < 50 && !fs.existsSync(download); i++) await delay(100);
    check('Download HTML real corresponde ao arquivo gerado', fs.existsSync(download) && fs.readFileSync(download, 'utf8') === template.documentHTML(departments.find(d => d.id === 'recepcao'), company));
    await evaluate(`Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { write: () => Promise.reject(new Error('Permission denied')) } });`);
    await evaluate(`document.querySelector('#copy-signature').click()`); await delay(150);
    check('Permissão negada usa fallback de cópia formatada', await evaluate(`document.querySelector('#copy-status').textContent.includes('copiada com formatação')`));
    await evaluate(`document.execCommand = () => false; document.querySelector('#copy-signature').click();`); await delay(100);
    check('Falha de todas as APIs oferece seleção manual funcional', await evaluate(`!document.querySelector('#manual-help').hidden && window.getSelection().toString().includes('recepcao@medimagem.med.br')`));
    await evaluate(`document.querySelector('#select-manual').click()`);
    check('Seleção manual exclui instruções e texto da mensagem', await evaluate(`!window.getSelection().toString().includes('Cópia manual') && !window.getSelection().toString().includes('Atenciosamente')`));
    await navigate(origin + '/index.html');
    // A real HTTP 404 makes failure deterministic, independent of DNS timeouts.
    await evaluate(`window.MedInstitution.logo.url = ${JSON.stringify(origin + '/missing-logo.png')}; document.querySelector('#department-select').dispatchEvent(new Event('change'));`); await delay(400);
    check('Imagem indisponível é sinalizada sem substituição local silenciosa', await evaluate(`!document.querySelector('#logo-warning').hidden && document.querySelector('#logo-status').dataset.state === 'error'`));
    await evaluate(`window.MedInstitution.logo.url = ${JSON.stringify(company.logo.url)}; document.querySelector('#retry-logo').click();`); await delay(250);
    check('Reverificação restaura status de imagem carregada', await evaluate(`document.querySelector('#logo-warning').hidden && document.querySelector('#logo-status').dataset.state === 'loaded'`));
    await navigate(pathToFileURL(path.join(root, 'index.html')).href);
    check('Painel abre diretamente por file://', await evaluate(`document.querySelectorAll('.department-button').length === 13 && document.querySelector('#signature-preview a[href^="mailto:"]').textContent === 'agendamento@medimagem.med.br'`));
    await evaluate(`document.querySelector('#manual-copy').click()`);
    check('Seleção manual funciona também por file://', await evaluate(`window.getSelection().toString().includes('agendamento@medimagem.med.br')`));
    for (const width of [320, 560, 800]) {
      await viewport(width);
      for (const d of departments) {
        await navigate(origin + `/assinaturas/assinatura-${d.id}.html`);
        check(`HTML final ${width}px / ${d.id}`, await evaluate(`document.documentElement.scrollWidth <= innerWidth && [...document.images].every(img => img.naturalWidth > 0) && !document.querySelector('script,style,link') && getComputedStyle(document.querySelector('table')).fontFamily.includes('Arial')`));
      }
    }
    check('Sem exceções JavaScript', errors.length === 0, errors);
    await send('Browser.close').catch(() => {});
  } catch (error) { check('Execução completa dos testes de navegador', false, error.stack); }
  finally {
    if (socket) socket.close();
    if (browser && browser.exitCode === null) browser.kill();
    server.close();
    const failures = checks.filter(item => !item.passed);
    const report = { checkedAt: new Date().toISOString(), browser: 'Chrome headless', gmailTested: false, outlookTested: false, passed: checks.length - failures.length, failed: failures.length, failures, checks, layouts };
    fs.writeFileSync(path.join(root, 'docs', 'browser-validation.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(`${report.passed} verificações de navegador aprovadas; ${report.failed} falhas.`);
    for (const failure of failures) console.log(failure.name, failure.details || '');
    process.exitCode = failures.length ? 1 : 0;
  }
})();
