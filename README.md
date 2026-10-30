# Assinaturas de e-mail — Med&Imagem

[Abrir a central de assinaturas](https://lucaoras.github.io/medimagemassinaturaemail/).

O painel existente fica em [`email-signature/index.html`](email-signature/index.html), com prévia, cópia formatada e download das 13 assinaturas. As instruções de uso e manutenção estão em [`email-signature/README.md`](email-signature/README.md).

## Estrutura e página inicial

```text
index.html          entrada do GitHub Pages; redireciona para o painel
.nojekyll           publicação dos arquivos estáticos sem processamento Jekyll
email-signature/    painel, configurações, CSS, JavaScript, imagens e assinaturas
Laboratório/        arquivos originais da identidade visual do laboratório
Med&Imagem/         arquivos originais da identidade visual da clínica
```

O problema era a ausência de um arquivo de entrada na raiz publicada. Havia um `index.html` apenas dentro de `email-signature/`. Com a origem `main` / `/(root)`, o GitHub Pages precisa encontrar a entrada na raiz do repositório.

O novo `index.html` abre `./email-signature/index.html`. O caminho relativo funciona no endereço `/medimagemassinaturaemail/`, em outras pastas de hospedagem e ao abrir o arquivo localmente. O redirecionamento JavaScript preserva parâmetros e fragmentos, como `?origem=link#ti`, e usa `location.replace` para não criar uma etapa extra no botão Voltar. Sem JavaScript, há redirecionamento por HTML e um link de acesso; o próprio painel já oferece instruções para esse caso.

O painel continua em sua pasta original, mantendo válidos os caminhos `assets/`, `config/`, `templates/` e `scripts/`. A fonte é relativa ao CSS em `assets/`. As assinaturas independentes usam CSS inline e imagens com URLs HTTPS absolutas, necessárias também fora do site, nos clientes de e-mail. Nenhum layout, imagem, dado de contato ou template foi alterado.

As pastas `Laboratório` e `Med&Imagem` contêm originais em AI, PDF, JPG e PNG, não páginas iniciais. Seus nomes foram preservados; links para arquivos nessas pastas devem codificar os segmentos da URL (acentos, espaços e `&`) e respeitar maiúsculas e minúsculas. O painel usa os arquivos de nomes simples em `email-signature/assets/` e as imagens públicas configuradas. A pasta local `images/` está vazia e não é uma dependência.

## Publicar

Mantenha **Settings → Pages → Build and deployment** com:

- **Source:** `Deploy from a branch`.
- **Branch:** `main`.
- **Folder:** `/(root)`.

Não é necessário workflow personalizado, instalação de dependências ou etapa de build: os HTMLs e recursos já estão prontos no repositório. O arquivo vazio `.nojekyll` desativa o processamento Jekyll para essa publicação estática. Não há `CNAME`, configuração Jekyll ou workflow de deploy personalizado no projeto.

Após revisar as alterações, faça commit e push para `main`. Aguarde o processo **pages build and deployment** na aba **Actions** concluir e abra:

- Entrada: <https://lucaoras.github.io/medimagemassinaturaemail/>
- Painel: <https://lucaoras.github.io/medimagemassinaturaemail/email-signature/index.html>
- Departamento por link direto: <https://lucaoras.github.io/medimagemassinaturaemail/#ti>

Com as configurações informadas acima, nenhuma mudança manual em Settings é necessária. Se o deploy falhar, consulte os logs da execução na aba Actions. A preparação local não publica as alterações; o endereço público só receberá a correção após o push e o deploy.

Referências oficiais: [arquivo de entrada e `.nojekyll`](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) e [publicação a partir de uma branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Validar

Na raiz do repositório, com Node.js 22+ e Chrome instalado:

```powershell
node email-signature/scripts/validate.cjs
node email-signature/scripts/browser-check.cjs
```

Para Node.js 20, acrescente `--experimental-websocket` ao comando de navegador. Para outra instalação do Chrome, configure `BROWSER_PATH`. Há também instruções para usar o runtime do Cursor no README do painel.

O teste de navegador serve a raiz do repositório **somente sob `/medimagemassinaturaemail/`**, respeitando maiúsculas e minúsculas mesmo no Windows. Ele verifica a entrada, o redirecionamento, os parâmetros e fragmentos, o acesso sem JavaScript, os recursos locais, a abertura por `file://`, os 13 departamentos, a cópia formatada, o download e os layouts em diferentes larguras. Requisições que perdem o caminho base retornam 404 nesse servidor de teste.

O teste usa um perfil isolado do Chrome e sobrescreve a área de transferência para verificar a cópia e a colagem. As imagens HTTPS das assinaturas exigem acesso à internet. Resultados e limites da validação: [`email-signature/docs/VALIDACAO.md`](email-signature/docs/VALIDACAO.md).
