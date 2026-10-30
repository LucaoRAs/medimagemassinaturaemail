# Assinaturas institucionais — Med&Imagem

Painel local com 13 assinaturas por departamento, prévia, cópia formatada e download individual. O visual segue a referência enviada: marca vertical oficial em alta resolução, título vinho, ícones brancos em círculos vinho, números em negrito e rodapé com frase institucional e endereço. Os arquivos finais usam tabelas, CSS inline, Arial/Helvetica, textos selecionáveis e links clicáveis. O site principal e os originais da marca foram preservados.

## Abrir e usar

O painel também pode ser acessado em <https://lucaoras.github.io/medimagemassinaturaemail/> após a publicação. O `index.html` da raiz do repositório redireciona para este painel, preservando sua estrutura e os links diretos por departamento. Configuração e validação do GitHub Pages: [README da raiz](../README.md).

1. Abra **`index.html`** com Chrome, Edge, Firefox ou Safari. Não é necessário instalar pacotes, iniciar servidor ou acessar uma conta para abrir o painel.
2. Selecione seu departamento na lista ou no seletor do celular.
3. Confira o e-mail e a mensagem **“Logo e ícones carregados”**.
4. Clique em **Copiar assinatura**. Para guardar o arquivo independente, use **Baixar HTML**.

O painel abre diretamente por `file://`. Internet é necessária para carregar o logotipo e os quatro ícones das assinaturas. A marca no cabeçalho e a fonte do painel têm cópias locais. A prévia usa as mesmas URLs públicas das assinaturas finais; não esconde falhas de rede com imagens locais.

Se a cópia automática for bloqueada, clique em **Selecionar para copiar** e pressione `Ctrl+C` ou `⌘+C`. A seleção abrange somente a assinatura, excluindo botões e a mensagem de exemplo. No celular, toque e segure sobre o conteúdo e ajuste as alças da seleção. Outra alternativa é baixar o HTML, abri-lo no navegador e copiar sua exibição. A instalação no Gmail deve ser feita pelo navegador no computador.

## Instalar no Gmail

1. Abra o painel `index.html` no navegador.
2. Selecione o departamento correspondente à conta.
3. Copie a assinatura formatada.
4. Acesse o Gmail no computador.
5. Abra **Configurações** (engrenagem).
6. Selecione **Ver todas as configurações**.
7. Na aba **Geral**, localize **Assinatura**.
8. Clique em **Criar nova**, informe um nome e confirme.
9. Cole o conteúdo formatado com `Ctrl+V` ou `⌘+V` no editor.
10. Defina os padrões para novos e-mails e respostas/encaminhamentos. Se utilizar “Enviar e-mail como”, confira a conta selecionada.
11. Role até o final e clique em **Salvar alterações**.
12. Envie um e-mail de teste. Confira imagem, departamento, e-mail, alinhamento e links no destinatário, inclusive no celular.

**O Gmail não interpreta automaticamente código HTML bruto colado no editor de assinaturas.** Copie a prévia renderizada, não o código-fonte, e não use “Colar sem formatação”. A ajuda oficial informa limite de **10.000 caracteres**; o maior documento entregue tem 6.153 caracteres, com margem para o processamento do editor. [Ajuda oficial do Gmail](https://support.google.com/mail/answer/8395?hl=pt-BR).

## Arquivos finais

| Departamento | Conta | Arquivo em `assinaturas/` |
| --- | --- | --- |
| Agendamento | agendamento@medimagem.med.br | [assinatura-agendamento.html](assinaturas/assinatura-agendamento.html) |
| Digitação | digitacao@medimagem.med.br | [assinatura-digitacao.html](assinaturas/assinatura-digitacao.html) |
| Faturamento | faturamento@medimagem.med.br | [assinatura-faturamento.html](assinaturas/assinatura-faturamento.html) |
| Financeiro | financeiro@medimagem.med.br | [assinatura-financeiro.html](assinaturas/assinatura-financeiro.html) |
| Gerência | gerencia@medimagem.med.br | [assinatura-gerencia.html](assinaturas/assinatura-gerencia.html) |
| Laboratório | laboratorio@medimagem.med.br | [assinatura-laboratorio.html](assinaturas/assinatura-laboratorio.html) |
| Corpo Médico | medicos@medimagem.med.br | [assinatura-medicos.html](assinaturas/assinatura-medicos.html) |
| Institucional | medimagem@medimagem.med.br | [assinatura-institucional.html](assinaturas/assinatura-institucional.html) |
| Marketing | mkt@medimagem.med.br | [assinatura-marketing.html](assinaturas/assinatura-marketing.html) |
| Recepção | recepcao@medimagem.med.br | [assinatura-recepcao.html](assinaturas/assinatura-recepcao.html) |
| Ressonância Magnética | ressonancia@medimagem.med.br | [assinatura-ressonancia.html](assinaturas/assinatura-ressonancia.html) |
| Tecnologia da Informação | ti@medimagem.med.br | [assinatura-ti.html](assinaturas/assinatura-ti.html) |
| Tomografia | tomografia@medimagem.med.br | [assinatura-tomografia.html](assinaturas/assinatura-tomografia.html) |

Cada HTML abre de forma independente. Nenhum depende do JavaScript, CSS, fonte ou caminhos locais do painel. Apenas o logo e os ícones PNG são carregados pela rede. O mesmo modelo é usado para todos os setores; o link opcional de resultados aparece nos setores de atendimento, diagnóstico e corpo médico. O telefone e o WhatsApp são institucionais, sem atribuição de números exclusivos aos setores.

## Identidade e logotipo

- Vinho `#881c56`, vinho escuro `#6e1646`, azul `#658795`, texto `#293b43` e apoio `#51656d`, extraídos do CSS oficial em 30/10/2026.
- Quicksand local no painel, conforme o site, com licença OFL incluída. Arial/Helvetica nas assinaturas.
- Logotipo vertical oficial de 1080 × 1080 px, exibido em até 180 × 180 px, com as proporções preservadas. O círculo branco do arquivo se integra ao fundo branco da assinatura. A versão horizontal continua no cabeçalho do painel.
- Largura preferencial de 600 px; tabelas fluidas em telas menores, sem media queries ou dependência de CSS externo nas assinaturas.
- Ícones Google Material Design Icons em PNG, 48 × 48 px, exibidos em 14 × 14 px dentro de círculos vinho de 22 px. Licença Apache 2.0 incluída. O ícone de conversa representa o agendamento e seu link abre o WhatsApp institucional.

**URL do logotipo usada nas 13 assinaturas:**

<https://raw.githubusercontent.com/LucaoRAs/medimagemsite/e3330f25fc2a6675137cfe0d1168bd6c95c30317/img/icone.png>

É uma URL pública presa a um commit do repositório do site, sem token ou expiração. Retornou HTTP 200 e `image/png`, e os bytes coincidiram com o arquivo oficial local. A cópia pronta para hospedagem própria é [assets/logo-medimagem-vertical-hd.png](assets/logo-medimagem-vertical-hd.png). SHA-256: `b73e9039570c15e7ccd5f004a16e30ee62964368377ff77b2e2838155c3cb04e`.

Foi reutilizada a versão vertical oficial em alta resolução já pública no repositório do site. A disponibilidade futura depende de esse repositório permanecer público. Os quatro ícones usam URLs versionadas do pacote `material-design-icons@3.0.1` no jsDelivr; [fontes e licença](assets/icons/README.md). Hospedagem própria é opcional: publique os cinco PNGs, teste o acesso anônimo, altere `logo.url` e `icons.*.url` em `config/institution.js` e gere novamente os arquivos. Não foi feita publicação ou alteração na hospedagem.

## Dados conferidos e divergências

Os três números, o endereço e a identificação da clínica foram conferidos nas páginas oficiais. As 13 contas são as fornecidas no pedido; o site não lista todos os departamentos, e não foi testada a existência ou entrega de mensagens nessas caixas.

O site usa **“Mais que diagnosticar. Cuidar.”** em alguns trechos e **“Mais do que diagnosticar. Cuidar.”** em outro. Foi mantida a segunda forma, solicitada no projeto. A divergência foi sinalizada antes da implementação.

O portal externo de resultados é anunciado pelo site com HTTP. As assinaturas usam o endereço HTTPS oficial **`https://www.medimagem.med.br/index.html#destino`**, cuja âncora foi verificada. O paciente escolhe sua área no site. Não foram feitos login ou testes de consulta de exames.

Fontes, valores e decisões: [docs/identidade.md](docs/identidade.md).

## Organização e manutenção

```text
email-signature/
  index.html                   painel local
  assinaturas/                 13 HTMLs independentes e manifest.json
  assets/                      logo, fonte local, licença e CSS do painel
  config/institution.js        dados e cores compartilhados
  config/departments.js        departamentos, contas e opção de resultados
  templates/signature.js       template HTML único, texto simples e documento
  scripts/generate.cjs         gerador dos HTMLs, manifesto e cores do painel
  scripts/panel.js             navegação, cópia e downloads
  scripts/validate.cjs         verificações estáticas
  scripts/browser-check.cjs    testes no Chrome sem dependências npm
  scripts/verify-public-links.ps1  checagem pública dos destinos
  docs/                       evidências, relatórios e capturas
```

Para alterar telefone, endereço, marca ou cores, edite `config/institution.js`. Para alterar departamentos, edite `config/departments.js`. Nunca atualize os 13 HTMLs manualmente. O painel lê a mesma configuração e usa o mesmo template do gerador; não usa `fetch`, módulos ES ou servidor para carregar esses arquivos.

Para regenerar e conferir, com Node.js 18 ou superior, dentro de `email-signature/`:

```powershell
node scripts/generate.cjs
node scripts/validate.cjs
```

Node só é necessário para manutenção e testes. Para reprodução dos testes de navegador, use Node 22+ e Chrome instalado:

```powershell
node scripts/browser-check.cjs
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/verify-public-links.ps1
```

No Node 20, acrescente `--experimental-websocket`. O caminho padrão do Chrome está no script; para outra instalação defina `BROWSER_PATH`. O teste usa perfil isolado, servidor apenas em `127.0.0.1`, fecha ambos ao terminar e escreve arquivos temporários em `.qa/`, ignorada pelo Git. **O teste de cópia substitui a área de transferência por uma assinatura.** Nenhuma conta de e-mail é acessada.

Nesta máquina, sem `node` no PATH, a geração e os testes foram executados com o runtime Node já incluído no Cursor, sem instalar dependências. Para repetir com esse runtime no PowerShell:

```powershell
$env:ELECTRON_RUN_AS_NODE = '1'
$runtime = "$env:LOCALAPPDATA\Programs\cursor\Cursor.exe"
& $runtime --preserve-symlinks --preserve-symlinks-main scripts/generate.cjs | Out-Host
& $runtime --preserve-symlinks --preserve-symlinks-main scripts/validate.cjs | Out-Host
& $runtime --preserve-symlinks --preserve-symlinks-main --experimental-websocket scripts/browser-check.cjs | Out-Host
```

Após regenerar, reabra/recarregue o painel. Assinaturas já coladas em contas Gmail devem ser atualizadas manualmente em cada conta; o gerador não as altera remotamente.

## Validação e entrega visual

Veja [docs/VALIDACAO.md](docs/VALIDACAO.md) e os relatórios JSON para os resultados executados. As capturas são de renderização real no Chrome:

- [Prévia de Agendamento](docs/previews/assinatura-agendamento.png).
- [Prévia de Marketing, seguindo a referência](docs/previews/assinatura-marketing.png).
- [Painel em desktop](docs/previews/painel-desktop.png).
- [Painel em celular](docs/previews/painel-celular.png).

Não houve teste dentro de uma conta Gmail ou Outlook. Resta instalar manualmente e enviar um e-mail de teste para validar o processamento específico do Gmail e a exibição no destinatário. O teste automatizado de colagem ocorreu em um editor HTML local, não no Gmail. O painel foi testado em Chrome; outros navegadores e dispositivos físicos não foram testados.
