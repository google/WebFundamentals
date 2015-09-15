---
title: "Set Up Web Starter Kit"
description: "Este guia é para iniciantes no Web Starter Kit. Ele explica como trabalhar com o Web Starter Kit o mais rapidamente possível."
notes:
  nosudo: 
    - "Em caso de erros de permissão ou acesso como <code>EPERM</code> ou <code>EACCESS</code>, não use o <code>sudo</code> como uma solução alternativa. Consulte <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>esta página</a> para obter uma solução mais adequada."
updated_on: 2015-04-01
---

<p class="intro">
  O Web Starter Kit depende do NodeJS, NPM e Sass para funcionar. Com eles em seu computador, você terá tudo que precisa para começar a usar o Web Starter Kit em seus projetos.
</p>

{% include shared/toc.liquid %}

## Instalar estas dependências únicas

Há dois conjuntos de ferramentas que você precisa instalar em seu computador antes de compilar
sites com o Web Starter Kit: NodeJS, NPM e Sass.

### NodeJS e NPM

As ferramentas de compilação do Web Starter Kit precisam de Node e NPM. Node é usado para executar o Gulp, o
executor de tarefas. O NPM é usado para baixar os módulos necessários para realizar determinadas tarefas
no Gulp.

Se você não tem certeza se possui o NodeJS e NPM, verifique abrindo um prompt de comando e
executando `node -v`. Se o Node responder, verifique se a versão corresponde à versão atual
no NodeJS.org.

Se você não receber uma resposta ou tiver uma versão antiga, visite NodeJS.org e
clique no grande botão verde Instalar. O NPM será instalado com o NodeJS
automaticamente.

## Configure seu projeto do Web Starter Kit

A primeira etapa é ir para [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
, baixar e extrair o zip. Essa será a base para o seu projeto. Portanto, renomeie a pasta e coloque-a em algum local relevante em seu computador. No resto deste guia, chamaremos a pasta de `my-project`.

Em seguida, você precisará instalar as dependências locais para o Web Starter Kit. Abra um
prompt de comando, altere o diretório na sua pasta de projeto e execute os seguintes scripts de instalação
npm.

    cd my-project
    npm install
    npm install gulp -g

Pronto! Agora você tem tudo que precisa para usar as ferramentas Gulp no Web Starter
Kit.

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

A próxima seção deste guia aborda como usar o Gulp. Mas se você desejar ver
como eles são, tente executar o servidor local digitando `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">


