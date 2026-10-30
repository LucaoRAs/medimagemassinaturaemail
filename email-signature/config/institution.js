(function (root) {
  'use strict';
  const institution = {
    name: 'Med&Imagem',
    description: 'Centro de Diagnóstico Médico',
    slogan: 'Mais do que diagnosticar. Cuidar.',
    website: 'https://www.medimagem.med.br/',
    websiteLabel: 'www.medimagem.med.br',
    contactUrl: 'https://www.medimagem.med.br/faleConosco.html',
    resultsUrl: 'https://www.medimagem.med.br/index.html#destino',
    phone: { label: '(35) 3531-5710', url: 'tel:+553535315710' },
    whatsapp: { label: '(35) 99722-6479', url: 'https://wa.me/5535997226479' },
    ombudsman: { label: '(35) 99921-2077', url: 'https://wa.me/5535999212077' },
    address: ['Rua São Miguel, 300 · Mocoquinha', 'São Sebastião do Paraíso · MG'],
    logo: {
      url: 'https://raw.githubusercontent.com/LucaoRAs/medimagemsite/e3330f25fc2a6675137cfe0d1168bd6c95c30317/img/icone.png',
      local: 'assets/logo-medimagem-vertical-hd.png',
      alt: 'Med&Imagem — Centro de Diagnóstico Médico',
      width: 180,
      height: 180,
      originalWidth: 1080,
      originalHeight: 1080,
      sha256: 'b73e9039570c15e7ccd5f004a16e30ee62964368377ff77b2e2838155c3cb04e'
    },
    icons: {
      email: { url: 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_email_white_24dp.png', local: 'assets/icons/email.png' },
      phone: { url: 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_call_white_24dp.png', local: 'assets/icons/phone.png' },
      chat: { url: 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_chat_white_24dp.png', local: 'assets/icons/chat.png' },
      website: { url: 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/action/2x_web/ic_language_white_24dp.png', local: 'assets/icons/website.png' }
    },
    panelLogo: { local: 'assets/logo-medimagem.png', alt: 'Med&Imagem — Centro de Diagnóstico Médico' },
    colors: {
      wine: '#881c56', wineDark: '#6e1646', blue: '#658795',
      ink: '#293b43', muted: '#51656d', rose: '#f8f0f4',
      mist: '#eef1f3', white: '#ffffff', line: '#dbe4e7'
    },
    signatureWidth: 600,
    verifiedOn: '2026-10-30'
  };
  if (typeof module === 'object' && module.exports) module.exports = institution;
  else root.MedInstitution = institution;
})(typeof globalThis === 'object' ? globalThis : this);
