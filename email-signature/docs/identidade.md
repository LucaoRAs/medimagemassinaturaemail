# Identidade visual e fontes

Conferência em 30/10/2026, antes da implementação.

## Repositórios inspecionados

O projeto de assinaturas continha os manuais e arquivos oficiais em `Med&Imagem/` e `Laboratório/`, sem páginas HTML/CSS. A marca vertical foi conferida no original `Med&Imagem/Vertical/PNG/01-Logo-Med&Imagem-Vertical---Preferencial.png`, com margens transparentes e a composição oficial em duas linhas.

Também foi localizado e inspecionado, somente para leitura, o repositório vizinho `../medimagemsite/`. Nele, `img/icone.png` contém a marca vertical oficial em alta resolução (1080 × 1080 px), centralizada em círculo branco com cantos transparentes. O remoto é `https://github.com/LucaoRAs/medimagemsite.git`, versão local `e3330f25fc2a6675137cfe0d1168bd6c95c30317`. A marca horizontal em `img/logo_medimagem.png` é usada apenas no cabeçalho do painel.

Nenhum arquivo dos repositórios ou diretórios originais foi alterado. Toda a implementação está em `email-signature/`.

## Site oficial

HTML, CSS e página de contatos foram obtidos do domínio oficial. Cópias de consulta em `docs/research/` preservam a evidência do momento da análise; não participam da execução do painel.

- [Página inicial](https://www.medimagem.med.br/).
- [CSS oficial](https://www.medimagem.med.br/style/style.css?v=20261005).
- [Contatos oficiais](https://www.medimagem.med.br/faleConosco.html).
- [Seção oficial de resultados](https://www.medimagem.med.br/index.html#destino).

| Papel | Valor observado no CSS |
| --- | --- |
| Vinho principal / `--wine` | `#881c56` |
| Vinho escuro / `--wine-dark` | `#6e1646` |
| Azul / `--blue` | `#658795` |
| Azul alternativo / `--blue-alt` | `#638595` |
| Texto / `--ink` | `#293b43` |
| Texto secundário / `--muted` | `#51656d` |
| Rosa claro / `--rose` | `#f8f0f4` |
| Cinza claro / `--mist` | `#eef1f3` |
| Linhas / `--line` | `#dbe4e7` |
| Branco | `#ffffff` |

A fonte do site é Quicksand, em arquivo local `fonts/quicksand-latin.woff2`. O painel reutiliza essa fonte e a licença OFL existente no repositório. As assinaturas usam Arial/Helvetica por compatibilidade. Foram preservados fundo branco, títulos vinho, detalhes azuis, separadores discretos e espaços regulares.

## Dados institucionais

| Dado | Conferência |
| --- | --- |
| Med&Imagem — Centro de Diagnóstico Médico | Confirmado no site e na marca |
| Telefone (35) 3531-5710 | Confirmado; site o identifica como recepção |
| WhatsApp (35) 99722-6479 | Confirmado; agendamento institucional |
| Ouvidoria (35) 99921-2077 | Confirmado; centralizado na configuração, omitido das assinaturas para evitar excesso de informação |
| Rua São Miguel, 300, Mocoquinha, São Sebastião do Paraíso — MG | Confirmado |
| 13 contas por departamento | Informadas pelo usuário; não inferidas do site nem testadas por envio |
| Frase institucional | Duas variantes no site; adotada a solicitada: “Mais do que diagnosticar. Cuidar.” |

## Imagem pública

O site atual usa `img/logo28anosroxa.png`, uma arte comemorativa. Para reproduzir a referência enviada pelo usuário com melhor nitidez, foi selecionado o PNG vertical oficial de alta resolução já público no repositório do site:

<https://raw.githubusercontent.com/LucaoRAs/medimagemsite/e3330f25fc2a6675137cfe0d1168bd6c95c30317/img/icone.png>

GET público sem autenticação: HTTP 200, `image/png`, 82.843 bytes. O SHA-256 do download e do arquivo local do site coincide: `b73e9039570c15e7ccd5f004a16e30ee62964368377ff77b2e2838155c3cb04e`. A URL identifica um commit, sem expiração ou token. A imagem foi carregada também no Chrome durante a validação visual. A versão local em `assets/logo-medimagem-vertical-hd.png` é idêntica e está pronta para eventual hospedagem própria. O arquivo original de 1080 px é exibido em até 180 px, com proporção preservada e sem recortes por CSS.

O layout segue a referência “Assinatura Corporativa Med&Imagem Marketing.png”: departamento em 24 px, divisória vinho fina, logo vertical maior, contatos com ícones em círculos vinho e números em negrito. A frase institucional fica em 15 px, com endereço abaixo e separador horizontal discreto. Toda a composição usa tabelas e CSS inline. Os textos continuam selecionáveis e os links clicáveis; a referência não foi convertida em uma imagem única de assinatura.

Os ícones são PNGs brancos do Google Material Design Icons 3.0.1, licença Apache 2.0, exibidos em 14 px sobre células vinho de 22 px com bordas arredondadas. Fontes e licença: [assets/icons](../assets/icons/README.md). Os quatro recursos públicos responderam HTTP 200 e seus hashes coincidiram com as cópias locais. Se o arredondamento não for suportado por algum cliente, a célula continua legível como um quadrado vinho; os contatos adjacentes mantêm seus links.

## Resultados e contato

Contato: `https://www.medimagem.med.br/faleConosco.html`. O WhatsApp de agendamento usa `https://wa.me/5535997226479`; o texto pré-preenchido opcional usado no site foi omitido.

A seção `id="destino"` encaminha pacientes e médicos a endereços HTTP no host `medimagemssp3.ddns.net:8081`. Para cumprir o requisito de HTTPS nas assinaturas, o link aponta para `https://www.medimagem.med.br/index.html#destino`. Não foi inventada uma versão HTTPS desse portal, nem feito login, consulta de laudos ou envio de mensagens.
