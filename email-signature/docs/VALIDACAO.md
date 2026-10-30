# Validação executada

Data: **30/10/2026**, horário de Brasília. Resultado final: **147 verificações estáticas e 161 verificações no Chrome aprovadas; zero falhas**. As dez URLs públicas conferidas responderam com HTTP 200.

## Correção do GitHub Pages

- Antes da correção, a consulta pública a `https://lucaoras.github.io/medimagemassinaturaemail/` retornou **HTTP 404**; o painel em `email-signature/index.html` retornou **HTTP 200**. Não existia arquivo de entrada na raiz do repositório.
- Criado `index.html` na raiz com redirecionamento relativo para o painel existente. Parâmetros e fragmentos de departamento foram preservados no redirecionamento JavaScript; o fallback por HTML foi validado com JavaScript desativado.
- Criado `.nojekyll` vazio para publicar os arquivos estáticos diretamente. A origem informada, **Deploy from a branch → main → /(root)**, pode ser mantida, sem workflow personalizado.
- O servidor de teste publica a raiz exclusivamente sob **`/medimagemassinaturaemail/`**, com correspondência exata de maiúsculas e minúsculas. CSS, JavaScript, fonte e imagens locais carregaram sem referências ausentes ou requisições fora desse caminho. O 404 intencional do teste de falha de imagem é contabilizado separadamente.
- A entrada da raiz respondeu HTTP 200 localmente e abriu o painel por HTTP e por `file://`. O link `?origem=pages#ti` selecionou Tecnologia da Informação corretamente.
- Mantidas todas as verificações de departamentos, layouts, cópia, colagem, seleção manual e download. As quatro capturas regeneradas foram **idênticas byte a byte** às anteriores à correção.
- Os HTMLs das assinaturas, o painel, seus estilos, configurações, template e imagens permaneceram intactos. As pastas `Laboratório` e `Med&Imagem` não foram alteradas.

As verificações acima validam os arquivos locais corrigidos. **Commit, push para `main` e conclusão do deploy do GitHub Pages ainda são necessários** para que a correção apareça no endereço público. Não foi feita alteração remota de configuração nem publicação nesta etapa. Instruções: [README da raiz](../../README.md).

## Geração e HTML final

- 13 arquivos HTML independentes, um para cada departamento e conta solicitados.
- Configuração e template únicos; os arquivos gerados e os downloads do painel correspondem ao mesmo conteúdo.
- Maior documento: **6.153 caracteres**, abaixo dos 10.000 informados pela ajuda do Gmail. Tamanho de cada arquivo em `assinaturas/manifest.json`.
- UTF-8, inclusive acentos; nome do departamento e e-mail corretos.
- Tabelas de apresentação, estilos inline e fontes Arial/Helvetica.
- Sem JavaScript, CSS externo, Grid, Flexbox, SVG, Base64, fontes externas ou imagens relativas nos HTMLs finais.
- Links `mailto:`, `tel:` e HTTPS; nenhum número exclusivo foi atribuído a um departamento.
- Logo vertical oficial em alta resolução, dimensões explícitas, proporção preservada e texto alternativo. Quatro ícones PNG com dimensões explícitas e alternativa vazia por serem decorativos; textos adjacentes identificam os contatos. Departamento em destaque, números em negrito e rodapé com frase e endereço.
- Escape de conteúdo e atributos no template.

Relatório reproduzível: [static-validation.json](static-validation.json).

## Navegador e interações

Chrome headless em perfil isolado, com servidor local temporário sob `/medimagemassinaturaemail/` e também com abertura direta via `file://`.

- **91 combinações**: 13 departamentos × 320, 360, 390, 768, 1024, 1440 e 1920 px. Sem rolagem horizontal da página ou da prévia, com seleção e e-mail correspondentes.
- **39 combinações dos HTMLs finais**: 13 arquivos × 320, 560 e 800 px. Sem transbordamento horizontal; fonte de sistema e logo carregados.
- Lista e seletor com 13 opções; clique na lista e link direto por fragmento (`index.html#ti`) funcionando.
- Fonte Quicksand e marca local do painel carregadas.
- Quatro ícones PNG públicos carregados e monitorados pelo painel, junto ao logotipo.
- URL pública do logo carregada no navegador; erro real HTTP 404 sinalizado e recuperação pelo botão “Verificar novamente”. Nenhuma substituição local silenciosa na assinatura.
- Escrita e leitura reais da área de transferência com os formatos `text/html` e `text/plain`.
- Colagem por `Ctrl+V` em um **editor HTML local de teste**, preservando tabela, imagem, links e estilos.
- Permissão da Clipboard API negada: fallback de cópia formatada funcionando.
- Ambas as APIs indisponíveis: instruções manuais e seleção somente da assinatura funcionando.
- Download real de `assinatura-recepcao.html`, comparado ao arquivo gerado.
- Painel e seleção manual funcionando por `file://`.
- Nenhuma exceção JavaScript na execução final.

Relatório: [browser-validation.json](browser-validation.json). Capturas reais inspecionadas:

- [Desktop](previews/painel-desktop.png).
- [Celular, 390 px](previews/painel-celular.png).
- [Assinatura de Agendamento](previews/assinatura-agendamento.png).
- [Assinatura de Marketing, conforme a referência](previews/assinatura-marketing.png).

Em larguras pequenas, textos longos podem quebrar em mais linhas e a marca reduz proporcionalmente; nenhum campo é removido. O painel usa Arial para o conteúdo de e-mail e Quicksand nos títulos de interface.

## Links e imagem

GETs públicos, sem autenticação e sem envio de mensagens:

| Recurso | Resultado |
| --- | --- |
| Site institucional | HTTP 200 |
| Página oficial de contato | HTTP 200 |
| Página de resultados | HTTP 200; `id="destino"` presente |
| Link do WhatsApp de agendamento | HTTP 200, após redirecionamento oficial |
| Link da ouvidoria, mantido na configuração | HTTP 200, após redirecionamento oficial |
| PNG vertical em alta resolução no repositório do site | HTTP 200, `image/png`, 82.843 bytes |
| Ícone de e-mail | HTTP 200, `image/png`, 327 bytes |
| Ícone de telefone | HTTP 200, `image/png`, 420 bytes |
| Ícone de conversa/agendamento | HTTP 200, `image/png`, 205 bytes |
| Ícone de site | HTTP 200, `image/png`, 812 bytes |

Hashes SHA-256 dos cinco PNGs públicos iguais às cópias locais em `assets/logo-medimagem-vertical-hd.png` e `assets/icons/`. Endereços completos, tipos, bytes e destinos dos redirecionamentos: [public-link-validation.json](public-link-validation.json).

O acesso HTTP 200 ao WhatsApp valida o destino público do link, não atendimento ou entrega de mensagens. Os links de telefone e e-mail foram verificados estruturalmente, sem ligação ou envio. O link de resultados leva à seção HTTPS oficial; o portal externo HTTP e a autenticação de pacientes/médicos não foram testados.

## Limites e intervenção manual

**Gmail e Outlook não foram acessados ou testados.** Os testes de navegador demonstram a geração, renderização e transporte do HTML; não substituem o processamento do editor Gmail ou de seus destinatários. Outros navegadores, dispositivos físicos e clientes de e-mail em modo escuro não foram testados.

Para concluir a instalação em cada conta, copie a assinatura pelo painel, cole nas configurações do Gmail, defina os padrões e salve. Envie um e-mail de teste e confirme a exibição do logotipo e o funcionamento dos links no destinatário.

Não há publicação de imagem obrigatória pendente: logo e ícones já são públicos. A transferência opcional para o domínio institucional requer publicação manual dos PNGs, atualização da configuração e nova geração. Assinaturas já instaladas precisam ser recoladas manualmente quando houver mudanças.

Nenhuma conta foi configurada automaticamente, nenhuma credencial foi solicitada/armazenada e nenhuma mensagem foi enviada. O site principal permaneceu intacto.
