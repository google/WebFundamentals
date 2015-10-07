---
title: "Development Phases"
description: "Cada desenvolvedor passar á por várias fases durante o desenvolvimento de um projeto. O Web Starter Kit aumenta sua produtividade e simplifica uma variedade de tarefas para cada fase."
notes:
updated_on: 2014-10-21
---

<p class="intro">
  Durante o desenvolvimento, há 3 comandos específicos que você usará regularmente: gulp serve, gulp e gulp serve:dist. Vamos ver como cada tarefa o ajuda a desenvolver seu site.
</p>

{% include shared/toc.liquid %}

## Iniciar um Servidor Local

A primeira tarefa que analisaremos é: `$ gulp serve`.

Na superfície, esta tarefa inicia um servidor HTTP local para que você possa exibir seu site
em um navegador, mas por trás dos panos, há algumas ferramentas extras funcionando.

### Live Reload

O Live Reload elimina a tradicional sequência de atualização em que se realiza uma mudança no
editor, alterna-se para o navegador, digita-se CTRL-R e aguarda-se o recarregamento da
página.

Com o Live Reload, você pode fazer mudanças no seu editor e vê-las entrar em vigor
imediatamente em qualquer navegador, com seu site aberto.

{% ytvideo JE-ejS8N3YI %}

### Testes Entre Dispositivos

O Browser Sync ajuda você a testar seu site em vários dispositivos. Qualquer rolagem,
toque ou pressão do teclado será compartilhado por qualquer navegador conectado.

{% ytvideo RKKBIs_3svM %}

Isso funciona apenas quando você executa seu site com `gulp serve`. Faça o teste executando 
`gulp serve`, abra a URL em duas janelas do navegador lado a lado e role
uma das páginas.

### Prefixação Automática

Ao considerar uma variedade de navegadores, você precisará usar os prefixos do fornecedor para
garantir que poderá usar os recursos de cada um deles. O Web Starter Kit automatiza toda a
prefixação para você.

Nosso CSS modelo (abaixo) não inclui nenhum prefixo do fornecedor:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

O processo de compilação executa o CSS através do autoprefixador que produz a
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

### Verifique seu Javascript

JSHint é uma ferramenta que analisa seu código JavaScript para verificar possíveis problemas
com sua lógica JavaScript e [aplica as práticas recomendadas de codificação](http://www.jshint.com/docs/).

A ferramenta é executada sempre que você compila o projeto ou, se estiver executando o gulp server,
sempre que realiza uma alteração em um arquivo JavaScript.

### Compile seu Sass

Enquanto você estiver executando o comando serve, qualquer alteração realizada em qualquer arquivo Sass
no seu projeto será compilada no CSS e prefixada. Depois disso, sua
página será recarregada com o Live Reload.

Para iniciantes em Sass, o projeto se descreve como “Linguagem
de extensão CSS”. Basicamente, é o CSS com alguns recursos extras. Por exemplo,
oferece suporte adicional à variáveis e funções, que ajudam você a estruturar seu CSS
de maneira modular e reutilizável.

## Compilar uma Versão de Produção do Seu Site

Você pode compilar uma versão pronta para a produção do seu site com o simples comando `gulp`
. Esse comando executa algumas das tarefas já vistas, com tarefas
adicionais destinadas a tornar o carregamento do seu site mais rápido e eficiente.

As principais tarefas que a compilação de produção realiza são:

### Compilar Estilos

Primeiro, a compilação do Sass será realizada no seu projeto. Depois da compilação do Sass
, o Autoprefixador será executado em todos o CSS.

### Verificar problemas em seu Javascript

A segunda etapa de compilação executa o JSHint sobre seu JavaScript.

### Compilar as Páginas HTML

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
Todos os seus arquivos javascript entre o bloco de compilação serão mesclados
(concatenados) e reduzidos em um arquivo chamado main.min.js e 
a compilação final substituirá esses scripts com a tag de script:

    <script src="scripts/main.min.js"></script>

### Otimize qualquer ativo de imagem

Para JPEGs e PNGs, os metadados na imagem são retirados; não é necessário
renderizar a imagem. Os metadados incluem informações como a câmera usada
para tirar a foto.

Para SVGs, eles irão remover qualquer atributo que não seja necessário ou qualquer espaço em branco e
comentários que existam.

### Copiar Fontes

Essa simples tarefa copia nossas fontes do aplicativo para o diretório de compilação final.

### Copiar Qualquer Arquivo do Diretório Raiz

Se a compilação encontrar algum arquivo no diretório raiz do projeto, ela também
o copiará na compilação final.

## Teste Sua Compilação de Produção

Antes de iniciar qualquer produção, você precisa garantir que tudo funciona
conforme o esperado. O comando `gulp serve:dist` compila uma versão de produção do seu site,
inicia um servidor e abre um navegador para você. Isso **não tem o Live Reload ou o 
Browser Sync**, mas é uma forma confiável de testar seu site antes de implantá-lo.


