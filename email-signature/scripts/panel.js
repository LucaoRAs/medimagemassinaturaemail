(function () {
  'use strict';
  const company = window.MedInstitution;
  const departments = window.MedDepartments;
  const template = window.MedSignature;
  const $ = id => document.getElementById(id);
  let selected;
  let logoCheck = 0;
  const preview = $('signature-preview');
  const status = $('copy-status');

  // Keep display data in sync even when config is edited before regeneration.
  Object.entries(company.colors).forEach(([key, value]) => document.documentElement.style.setProperty('--' + key.replace(/[A-Z]/g, char => '-' + char.toLowerCase()), value));
  document.querySelectorAll('[data-company-link]').forEach(link => { link.href = company.website; });
  $('brand-logo').src = company.panelLogo.local;
  $('brand-logo').alt = company.panelLogo.alt;
  $('footer-slogan').textContent = company.slogan;

  departments.forEach((department, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'department-button';
    button.dataset.department = department.id;
    button.setAttribute('aria-controls', 'signature-preview');
    const number = document.createElement('span');
    number.className = 'department-number';
    number.setAttribute('aria-hidden', 'true');
    number.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('span');
    name.textContent = department.name;
    button.append(number, name);
    button.addEventListener('click', () => selectDepartment(department.id));
    $('department-list').append(button);
    $('department-select').add(new Option(department.name, department.id));
  });

  function checkLogo() {
    const run = ++logoCheck;
    const images = [...preview.querySelectorAll('img')];
    const label = $('logo-status');
    label.textContent = 'Verificando logo e ícones…';
    label.dataset.state = 'loading';
    $('logo-warning').hidden = true;
    const finish = loaded => {
      if (run !== logoCheck) return;
      label.textContent = loaded ? 'Logo e ícones carregados' : 'Imagem da assinatura indisponível';
      label.dataset.state = loaded ? 'loaded' : 'error';
      $('logo-warning').hidden = loaded;
    };
    const inspect = () => {
      if (images.some(img => img.complete && !img.naturalWidth)) finish(false);
      else if (images.every(img => img.complete && img.naturalWidth > 0)) finish(true);
    };
    images.forEach(img => {
      img.addEventListener('load', inspect, { once: true });
      img.addEventListener('error', () => finish(false), { once: true });
    });
    inspect();
    setTimeout(() => { if (run === logoCheck && images.some(img => !img.naturalWidth)) finish(false); }, 12000);
  }

  function selectDepartment(id) {
    selected = departments.find(department => department.id === id) || departments[0];
    $('preview-title').textContent = selected.name;
    $('selected-email').textContent = selected.email;
    $('department-select').value = selected.id;
    document.querySelectorAll('.department-button').forEach(button => button.setAttribute('aria-current', String(button.dataset.department === selected.id)));
    preview.innerHTML = template.render(selected, company);
    preview.setAttribute('aria-label', `Assinatura de ${selected.name}. Conteúdo selecionável.`);
    $('manual-help').hidden = true;
    status.textContent = 'Copie a assinatura e cole nas configurações do Gmail.';
    try { history.replaceState(null, '', '#' + selected.id); } catch (_) { /* file:// can restrict history */ }
    checkLogo();
  }

  function selectPreview() {
    preview.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(preview);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function manualCopy() {
    $('manual-help').hidden = false;
    status.textContent = 'Assinatura selecionada. Use Ctrl+C ou ⌘+C para copiar.';
    selectPreview();
  }

  function legacyCopy(html, plain) {
    selectPreview();
    let supplied = false;
    const onCopy = event => {
      if (!event.clipboardData) return;
      event.clipboardData.setData('text/html', html);
      event.clipboardData.setData('text/plain', plain);
      event.preventDefault();
      supplied = true;
    };
    document.addEventListener('copy', onCopy);
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { /* Manual selection below */ }
    finally { document.removeEventListener('copy', onCopy); }
    return copied && supplied;
  }

  $('copy-signature').addEventListener('click', async () => {
    const department = selected;
    const html = template.render(department, company);
    const plain = template.plainText(department, company);
    const button = $('copy-signature');
    button.disabled = true;
    let copied = false;
    try {
      if (window.isSecureContext && navigator.clipboard && navigator.clipboard.write && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        })]);
        copied = true;
      }
    } catch (_) { /* Denied permissions still allow manual copying. */ }
    try {
      if (!copied && department === selected) copied = legacyCopy(html, plain);
      if (department !== selected) {
        status.textContent = copied ? `Assinatura de ${department.name} copiada. Copie novamente para usar ${selected.name}.` : 'Departamento alterado. Clique em Copiar assinatura novamente.';
      } else if (copied) {
        $('manual-help').hidden = true;
        window.getSelection().removeAllRanges();
        status.textContent = `Assinatura de ${department.name} copiada com formatação. Cole no Gmail com Ctrl+V ou ⌘+V.`;
      } else manualCopy();
    } finally { button.disabled = false; }
  });

  $('download-signature').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([template.documentHTML(selected, company)], { type: 'text/html;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `assinatura-${selected.id}.html`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    status.textContent = `Download solicitado: assinatura-${selected.id}.html. Abra o arquivo no navegador para visualizar.`;
  });

  $('department-select').addEventListener('change', event => selectDepartment(event.target.value));
  $('manual-copy').addEventListener('click', manualCopy);
  $('select-manual').addEventListener('click', selectPreview);
  $('retry-logo').addEventListener('click', () => { preview.innerHTML = template.render(selected, company); checkLogo(); });
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (departments.some(department => department.id === id)) selectDepartment(id);
  });
  selectDepartment(location.hash.slice(1));
})();
