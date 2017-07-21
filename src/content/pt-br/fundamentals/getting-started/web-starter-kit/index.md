project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Às vezes, a parte mais difícil de um novo projeto é começar. O Web StarterKit oferece uma base sólida com uma ampla variedade de ferramentas para ajudar você durante o processo de desenvolvimento.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-07-16 #}

# Inicie seu site com o Web Starter Kit {: .page-title }

Warning: Este artigo não é atualizado há algum tempo e pode não refletir a realidade. Certifique-se de verificar o Web Starter Kit [documentação](https://github.com/google/web-starter-kit/) para os últimos detalhes.

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

Este guia orienta você pelo processo de compilar um novo site com o Web
Starter Kit e ajuda você a aproveitar ao máximo as ferramentas fornecidas.

<div style="clear:both;"></div>

## Fases do desenvolvimento

Durante o desenvolvimento, três comandos serão usados regularmente: `gulp serve`, `gulp` e `gulp serve:dist`. Vejamos como cada comando contribui para o processo de desenvolvimento.


### Inicie um Servidor Local

A primeira tarefa que analisaremos é: `$ gulp serve`.

À primeira vista, essa tarefa inicia um servidor HTTP local para que você possa exibir seu site
em um navegador, mas por trás dos panos há algumas ferramentas adicionais em funcionamento.

#### Live Reload

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O Live Reload elimina a tradicional sequência de atualização em que se realiza uma mudança no
editor, alterna-se para o navegador, digita-se CTRL-R e aguarda-se o recarregamento da
página.

Com o Live Reload, você pode fazer mudanças no seu editor e vê-las entrar em vigor
imediatamente em qualquer navegador, com seu site aberto.


#### Testes em vários dispositivos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O Browser Sync ajuda você a testar seu site em vários dispositivos. Qualquer rolagem,
toque ou pressionar de tecla será compartilhado por qualquer navegador conectado.

Isso funciona apenas quando você executa seu site com `gulp serve`. Faça o teste executando
`gulp serve`, abra o URL em duas janelas do navegador lado a lado e role
uma das páginas.

<div style="clear:both;"></div>

#### Prefixação automática

Ao considerar uma variedade de navegadores, você precisará usar os prefixos do fornecedor para
garantir que poderá usar os recursos de cada um deles. O Web Starter Kit automatiza toda a
prefixação para você.

Nosso exemplo de CSS (abaixo) não inclui nenhum prefixo do fornecedor:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

O processo de compilação executa o CSS pelo autoprefixador, que produz a
saída final abaixo:

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

#### Verifique seu JavaScript

O JSHint é uma ferramenta que analisa seu código JavaScript para verificar possíveis problemas
com sua lógica JavaScript e [aplica as práticas recomendadas de codificação](//www.jshint.com/docs/){: .external }.

A ferramenta é executada sempre que você compila o projeto ou, se estiver executando o gulp server,
sempre que realiza uma alteração em um arquivo JavaScript.

#### Compile seu Sass

Enquanto você estiver executando o comando serve, qualquer alteração realizada em qualquer arquivo Sass
no seu projeto será compilada no CSS e prefixada. Depois disso, sua
página será recarregada com o Live Reload.

Para iniciantes em Sass, o projeto se descreve como "Linguagem
de extensão CSS". Em essência, é o CSS com alguns recursos adicionais. Por exemplo,
oferece suporte adicional a variáveis e funções, que ajudam você a estruturar seu CSS
de maneira modular e reutilizável.

### Compile uma versão de produção do seu site

Você pode compilar uma versão pronta para a produção do seu site com o simples comando `gulp`
. Esse comando executa algumas das tarefas já vistas, com tarefas
adicionais destinadas a tornar o carregamento do seu site mais rápido e eficiente.

As principais tarefas que a compilação de produção realiza são:

#### Compilar estilos

Primeiro, a compilação do Sass será realizada no seu projeto. Depois da compilação do Sass
, o Autoprefixador será executado em todo o CSS.

#### Verificar problemas em seu JavaScript

A segunda etapa de compilação executa o JSHint no seu JavaScript.

#### Compilar as páginas HTML

A próxima etapa verifica seus arquivos HTML, procurando por blocos de compilação para concatenar
e reduzir o JavaScript. Depois que o JavaScript for verificado, o processo de compilação
reduzirá a página HTML.

A redução diminui o número de caracteres no arquivo JavaScript final
removendo comentários ou caracteres de espaço que não são realmente necessários, assim como
algumas outras técnicas. Isso reduz o tamanho final do arquivo, acelerando o
tempo de carregamento do site.

Concatenamento significa colar o conteúdo de vários arquivos em apenas um. O motivo
pelo qual fazemos isso é para que o navegador precise realizar apenas uma solicitação para o servidor
em vez de várias, o que é mais rápido para os seus usuários.

Um bloco de compilação tem tudo que é preciso para gerenciar quais arquivos JavaScript reduziremos
e concatenaremos. Vejamos um exemplo de bloco de compilação:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

Um bloco de compilação nada mais é que um comentário especialmente formatado. 
Todos os seus arquivos JavaScript entre o bloco de compilação serão mesclados
(concatenados) e reduzidos em um arquivo chamado main.min.js e
a compilação final substituirá esses scripts com a tag de script:

    <script src="scripts/main.min.js"></script>

#### Otimizar qualquer ativo de imagem

Para JPEGs e PNGs, os metadados na imagem são retirados; não é necessário
renderizar a imagem. Os metadados incluem informações como a câmera usada
para tirar a foto.

Para SVGs, eles removerão qualquer atributo que não seja necessário ou qualquer espaço em branco e
comentários que existam.

#### Copiar fontes

Essa simples tarefa copia nossas fontes do aplicativo para o diretório de compilação final.

#### Copiar qualquer arquivo do diretório raiz

Se a compilação encontrar algum arquivo no diretório raiz do projeto, ela também
o copiará na compilação final.

### Teste sua compilação de produção

Antes de iniciar qualquer produção, você precisa garantir que tudo funciona
conforme o esperado. O comando `gulp serve:dist` compila uma versão de produção do seu site,
inicia um servidor e abre um navegador para você. Isso **não tem o Live Reload ou o 
Browser Sync**, mas é uma forma confiável de testar seu site antes de implantá-lo.


## Configure o Web Starter Kit


O Web Starter Kit depende de NodeJS, NPM e Sass para funcionar. Quando esses recursos forem instalados, você terá o que precisa para começar a usar o Web Starter Kit nos seus projetos.


### Instale essas dependências únicas

Há dois conjuntos de ferramentas que você precisa instalar em seu computador antes de compilar
sites com o Web Starter Kit: NodeJS e NPM, & Sass.

#### NodeJS e NPM

As ferramentas de compilação do Web Starter Kit precisam de Node e NPM. O Node é usado para executar Gulp, o
executor de tarefas. O NPM é usado para baixar os módulos necessários para realizar determinadas tarefas
no Gulp.

Se você não tem certeza se possui o NodeJS e NPM, verifique abrindo um prompt de comando e
executando `node -v`. Se o Node responder, verifique se a versão corresponde à versão atual
em NodeJS.org.

Se você não receber uma resposta ou tiver uma versão antiga, acesse NodeJS.org e
clique no grande botão verde Install. O NPM será instalado com NodeJS
automaticamente.

### Configure seu projeto do Web Starter Kit

A primeira etapa é ir para [/web/tools/starter-kit/](/web/tools/starter-kit/)
, baixar e extrair o zip. Essa será a base para o seu projeto. Portanto, renomeie a pasta e coloque-a em algum local relevante em seu computador. No resto deste guia, chamaremos a pasta de `my-project.`

Em seguida, você precisará instalar as dependências locais para o Web Starter Kit. Abra um
prompt de comando, altere o diretório na sua pasta de projeto e execute os seguintes scripts de instalação
npm.

    cd my-project
    npm install
    npm install gulp -g

Pronto! Agora você tem tudo de que precisa para usar as ferramentas Gulp no Web Starter
Kit.


Observação: Se você receber erros de permissão ou acesso como  <code>EPERM</code> ou <code>EACCESS</code>, não use  <code>sudo</code> como solução. Consulte <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>esta página</a> para obter uma solução mais adequada.

<!--
The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">


{# wf_devsite_translation #}
