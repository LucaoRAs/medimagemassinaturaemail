(function (root) {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function render(department, company) {
    const e = escape;
    const c = company.colors;
    const link = (url, text, color = c.ink) => `<a href="${e(url)}" style="color:${e(color)};text-decoration:none;">${e(text)}</a>`;
    const row = (content, style = '') => `<tr><td style="padding:0;${style}">${content}</td></tr>`;
    const phoneLink = phone => `<a href="${e(phone.url)}" style="color:${c.muted};text-decoration:none;">${e(phone.label).replace(/^(\(\d+\))\s(.+)$/, '$1 <strong>$2</strong>')}</a>`;
    const contact = (icon, html, extra = '') => `<tr><td width="30" valign="middle" style="width:30px;padding:0 8px 6px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="22" style="width:22px;border-collapse:separate;"><tbody><tr><td width="22" height="22" align="center" valign="middle" bgcolor="${c.wine}" style="width:22px;height:22px;padding:0;background-color:${c.wine};border-radius:50%;font-size:0;line-height:0;"><img src="${e(company.icons[icon].url)}" alt="" width="14" height="14" border="0" style="display:block;width:14px;height:14px;border:0;"></td></tr></tbody></table></td><td valign="middle" style="padding:0 0 6px;font-size:13px;line-height:20px;color:${c.muted};word-break:break-word;${extra}">${html}</td></tr>`;
    const contactRows = [
      contact('email', link(`mailto:${department.email}`, department.email, c.muted)),
      contact('phone', `Telefone ${phoneLink(company.phone)}`),
      contact('chat', `Agendamento ${phoneLink(company.whatsapp)}`),
      contact('website', link(company.website, company.websiteLabel, c.wine), 'font-weight:bold;')
    ].join('');
    const contacts = [
      row(e(department.name), `font-size:24px;line-height:29px;font-weight:bold;letter-spacing:-0.4px;color:${c.wine};padding-bottom:4px;`),
      row(e(company.description), `font-size:12px;line-height:18px;color:${c.muted};padding-bottom:15px;`),
      row(`<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;"><tbody>${contactRows}</tbody></table>`),
      ...(department.results ? [row(link(company.resultsUrl, 'Resultados de exames ↗', c.muted), 'font-size:11px;line-height:17px;padding-left:38px;')] : [])
    ].join('');
    const footer = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;"><tbody>${row(e(company.slogan), `border-top:1px solid ${c.line};padding-top:12px;font-size:15px;line-height:21px;font-weight:bold;color:${c.wine};`)}${row(company.address.map(e).join(' · '), `padding-top:5px;font-size:11px;line-height:17px;color:${c.muted};`)}</tbody></table>`;
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${company.signatureWidth}" bgcolor="${c.white}" style="width:100%;max-width:${company.signatureWidth}px;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:${c.ink};background-color:${c.white};"><tbody><tr><td width="32%" align="center" valign="middle" style="width:32%;padding:0 12px 0 0;border-right:1px solid ${c.wine};"><a href="${e(company.website)}" style="text-decoration:none;"><img src="${e(company.logo.url)}" alt="${e(company.logo.alt)}" width="${company.logo.width}" height="${company.logo.height}" border="0" style="display:block;width:${company.logo.width}px;max-width:100%;height:auto;border:0;"></a></td><td valign="middle" style="padding:0 0 0 24px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:${c.ink};"><tbody>${contacts}</tbody></table></td></tr><tr><td colspan="2" style="padding:18px 0 0;">${footer}</td></tr></tbody></table>`;
  }

  function plainText(department, company) {
    return [department.name, `${company.name} — ${company.description}`, department.email,
      `Telefone: ${company.phone.label}`, `Agendamento / WhatsApp: ${company.whatsapp.label}`,
      company.website, ...company.address, company.slogan,
      ...(department.results ? [`Resultados de exames: ${company.resultsUrl}`] : [])].join('\n');
  }

  function documentHTML(department, company) {
    return `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Assinatura — ${escape(department.name)} | ${escape(company.name)}</title>\n</head>\n<body style="margin:0;padding:20px;background-color:${company.colors.white};">\n${render(department, company)}\n</body>\n</html>\n`;
  }

  const api = { render, plainText, documentHTML, escape };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MedSignature = api;
})(typeof globalThis === 'object' ? globalThis : this);
