project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Crie do zero seu site para vários dispositivos. Aprenda como agilizar o desenvolvimento e criar um site com carregamento rápido usando um pacote de ferramentas de compilação.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-09-24 #}

# Configurar ferramentas de compilação {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
Crie do zero seu site para vários dispositivos. Aprenda como agilizar o desenvolvimento e criar um site com carregamento rápido usando um pacote de ferramentas de compilação. Todo site deve ter uma versão de desenvolvimento e uma versão de produção.<br /><br />A versão de desenvolvimento tem todos arquivos de HTML, CSS, JS e imagem em um formato prático para você trabalhar.<br /><br />A versão de produção usa esses mesmos arquivos, mas os reduzem, concatenam e mesclam, além de otimizar imagens.

Os desenvolvedores Web precisam considerar milhões ao mesmo tempo. A etapa de compilação
é uma das mais fundamentais, mas também é a mais complicada de ser iniciada.  Você
deve determinar todas as tarefas que precisa automatizar, como: Compressão
de imagem, redução de CSS, concatenação de JavaScript, teste responsivo,
teste de unidade, e a lista continua...

Siga este guia para aprender a melhor forma de estruturar seu fluxo de trabalho para que
seus sites já empreguem as melhores práticas desde
o primeiro passo.


### TL;DR {: .hide-from-toc }
- As suas ferramentas do processo de compilação devem ser otimizadas para oferecer maior desempenho; elas devem reduzir e concatenar automaticamente JavaScript, CSS, HTML e imagens.
- Use o LiveReload ou outras ferramentas similares para facilitar o processo de desenvolvimento.


Antes de começar a codificação, considere a abordagem de otimização e crie a
versão de produção do site. Se definir o fluxo de trabalho desde o início,
você evitará surpresas desagradáveis no final do projeto e poderá adotar novas ferramentas
para agilizar o desenvolvimento e cuidar das tarefas
monótonas.

## O que é o processo de compilação?

O processo de compilação é um conjunto de tarefas executadas nos arquivos
do projeto para realizar a compilação e o teste do código durante o desenvolvimento. Esse conjunto de tarefas é usado para criar a versão de implantação do
site.  O processo de compilação não deve ser visto como um conjunto de tarefas a serem executadas no final
do fluxo de desenvolvimento.

As ferramentas mais populares para implementação do processo de compilação são
[Gulp](http://gulpjs.com/){: .external } e [Grunt](http://gruntjs.com/), sendo que ambas são
ferramentas de linha de comando. Se você não tiver experiência com nenhuma das duas, sugerimos o Gulp. Nós a usamos no
[Web Starter Kit](/web/tools/starter-kit/) e a recomendamos
.

Existem ferramentas com GUIs que podem ser mais fáceis para começar a usar, mas
elas são menos flexíveis.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Plataformas compatíveis &amp; nome da ferramenta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## Quais tarefas devem fazer parte do processo de compilação?

Nas seções a seguir, vamos apresentar as tarefas mais comuns que você deve
adicionar ao processo de compilação e as tarefas recomendadas para uso no Grunt e no Gulp.

Isso requer muito trabalho de tentativa e erro até obter o resultado desejado
e pode acabar com o seu sono se você ainda não tiver experiência com processos de compilação.

Para ver um bom exemplo de processo de compilação, consulte o [guia de introdução do Web Starter
Kit](/web/fundamentals/getting-started/web-starter-kit/),
que explica como usar o Web Starter Kit e as funções dos
comandos no arquivo do Gulp. Você pode usar esse material como referência para ter um
processo funcional em pouco tempo e fazer alterações posteriormente se necessário.

Se preferir criar seus próprios processos de compilação e ainda estiver começando a aprender a usar o Gulp
ou Grunt, os guias de início rápido são o melhor ponto de partida para descobrir como instalar
e executar seu primeiro processo de compilação:

* [Primeiros passos do Grunt](http://gruntjs.com/getting-started)
* [Primeiros passos do
  Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

### Usar concatenação e minificação para ter um site mais rápido

Você não sabe bem o que significam os termos concatenação e minificação?
Concatenação é a mesclagem de vários arquivos, ou seja, é o processo de copiar e
colar vários arquivos em um só. A concatenação é importante porque o navegador
trabalha de forma mais eficiente se precisar obter apenas um arquivo, em vez de vários arquivos pequenos.

A redução é o processo de redução da contagem geral de
caracteres sem alterar o funcionamento do código. Remover comentários ou reduzir
um nome grande de variável são bons exemplos de redução. Isso
diminui o tamanho do arquivo e permite a conclusão de downloads em menos tempo.

Para redução, use o seguinte:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipo de arquivo</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

Para concatenação, use o seguinte:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipo de arquivo</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> ou <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> ou <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> ou <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**Observação**: Para usar o Sass, é necessário recorrer ao recurso de importação ([veja um exemplo no Web Starter
Kit](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss))

### Otimizar imagens

A otimização de imagens é uma etapa importante para ajudar no aumento de velocidade do site.
Você ficará surpreso quando perceber que é possível reduzir consideravelmente o tamanho das imagens sem perder qualidade. O navegador
não precisa dos metadados para exibir imagens, então eles são removidos.
Um exemplo são as informações da câmera usada para tirar a foto.

Use os módulos a seguir para otimizar imagens.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp &amp; Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### Não se perca com os prefixos de fornecedor:

Pode acabar dando trabalho demais incluir todos os prefixos de fornecedor no
seu CSS. Use um prefixador automático para adicionar os prefixos
necessários:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp vs Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**Nota**  
Se preferir, adicione um [pacote Sublime para cuidar da prefixação automática](/web/tools/setup/setup-editor#autoprefixer) para
você.

### Jamais use o editor de texto sem atualização em tempo real

Com a atualização em tempo real, o site é atualizado sempre que você faz alterações.
Depois de começar a usar, você não conseguirá mais viver sem.

O Web Starter Kit usa a sincronização com o navegador para oferecer suporte a Live Reload.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp vs Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> e <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

Observação: Se você gostou do conceito de atualização em tempo real, mas não quer se preocupar com o processo de compilação, [Addy Osmani escreveu um artigo no HTML5Rocks](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/) com várias soluções alternativas (tanto gratuitas quanto pagas).


{# wf_devsite_translation #}
