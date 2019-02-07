project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "As promessas simplificam cálculos postergados e assíncronos. Uma promessa representa uma operação ainda não concluída."

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2019-02-06 #}
{# wf_blink_components: Blink>JavaScript #}

# Promessas em JavaScript: uma introdução {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Desenvolvedores, preparem-se para um momento importantíssimo na história do
desenvolvimento da Web.

<em>[Soam os tambores]</em>

As promessas agora são um recurso nativo no JavaScript!

<em>[Fogos de artifício explodem, papéis brilhantes caem, a multidão enlouquece]</em>

Nesse momento, você está em uma destas categorias:

* As pessoas comemoram à sua volta, mas você não sabe bem o motivo
 dessa confusão. Talvez você nem mesmo tenha certeza do que é uma "promessa". Você gostaria de dar de ombros, mas o
 peso do papel brilhante é muito pesado. Se for isso, não
 se preocupe. Eu demorei uma eternidade para entender porque deveria me preocupar com tudo
 isso. Provavelmente, você deve começar [pelo início](#whats-all-the-fuss-about).
* Você soca o ar! Demorou, certo? Você já usou essas tais promessas antes,
 mas está incomodado que todas as implementações têm APIs um pouco diferentes.
  Qual é a API para a versão oficial do JavaScript? Você provavelmente deve
 começar com a [terminologia](#promise-terminology).
* Você já conhecia tudo isso e acha ridículas essas pessoas pulando sem parar,
 como se fosse novidade para elas. Curta sua superioridade por alguns momentos e
 vá direto para a [referência da API](#promise-api-reference).

## Por que todo esse estardalhaço? {: #whats-all-the-fuss-about }

O JavaScript usa um único thread. Isso significa que duas partes de um script não podem ser executadas ao
mesmo tempo. É preciso fazer isso em sequência. O JavaScript
compartilha um thread com muitos outros itens que variam de navegador para
navegador. Porém, o JavaScript normalmente está na mesma fila das atividades de pintura, atualização
de estilos e tratamento das ações dos usuários (como destaque de texto e interação
com controles dos formulários). Uma atividade em uma dessas ações retarda as demais.

Você, como ser humano, usa vários threads. Você pode digitar com vários dedos,
dirigir e conversar ao mesmo tempo. A única função
bloqueadora com que temos de lidar é o espirro, quando todas as atividades em andamento devem
ser suspensas pela duração dele. Isso é muito irritante,
principalmente quando você está dirigindo e tentando manter uma conversa. Você não
quer escrever um código que espirre.

Você provavelmente usou eventos e callbacks para evitar isso. Veja os eventos:

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


Não há nenhum espirro aqui. Obtemos a imagem, adicionamos alguns listeners e o
JavaScript pode interromper a execução até que algum deles seja chamado.

No exemplo acima, é possível que os eventos tenham ocorrido
antes de começarmos a ouvi-los. Portanto, precisamos resolver isso usando
a property "complete" das imagens:

    var img1 = document.querySelector('.img-1');

    function loaded() {
      // woo yey image loaded
    }

    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
      // argh everything's broken
    });

Essa técnica não captura as imagens que tiveram erros antes de começarmos a
ouvi-las. O DOM não oferece essa funcionalidade. Além disso, nesse exemplo
carregamos uma imagem. Tudo fica ainda mais complexo quando queremos saber quando um conjunto
de imagens foi carregado.


## Eventos nem sempre são a melhor maneira

Os eventos são ótimos para coisas que ocorrem várias vezes com o mesmo
objeto&mdash;keyup, touchstart etc. Com esses eventos, não importa
o que aconteceu antes do listener ser anexado. Mas quando falamos de conclusão/falha
assíncronos, o ideal é algo assim:

    img1.callThisIfLoadedOrWhenLoaded(function() {
      // loaded
    }).orIfFailedCallThis(function() {
      // failed
    });

    // and…
    whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
      // all loaded
    }).orIfSomeFailedCallThis(function() {
      // one or more failed
    });

É isso o que as promessas fazem, mas com nomes melhores. Se elementos de uma imagem HTML tivessem um método
"ready" que retornasse uma promessa, poderíamos fazer isto:

    img1.ready().then(function() {
      // loaded
    }, function() {
      // failed
    });

    // and…
    Promise.all([img1.ready(), img2.ready()]).then(function() {
      // all loaded
    }, function() {
      // one or more failed
    });


Na essência, as promessas são um pouco semelhantes aos listeners de eventos, exceto que:

* Uma promessa só pode ser concluída ou falhar uma vez. Ela não pode ser concluída ou falhar duas vezes,
 nem alternar entre conclusão e falha ou vice-versa.
* Se uma promessa for concluída ou falhar, e você adicionar posteriormente um callback
 de conclusão/falha, o retorno correto será chamado, mesmo que o evento tenha ocorrido
 anteriormente.

Isso é extremamente útil para conclusão/falha assíncronos, já que você não está muito
interessado no momento exato da disponibilidade de algo, mas
na reação a um resultado.


## Terminologia das promessas {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) examinou a primeira versão
deste artigo e me atribuiu nota zero para terminologia. Ele me colocou em quarentena,
me obrigou a copiar
[Estados e destinos](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
100 vezes e escreveu uma carta preocupada para meus pais. Apesar disso, eu ainda
me confundo com a terminologia, mas os termos básicos são descritos a seguir.

Uma promessa pode ser:

* **fulfilled**: a ação relacionada à promessa foi concluída
* **rejected**: ocorreu uma falha na ação relacionada à promessa
* **pending**: a ação ainda não foi realizada ou rejeitada
* **settled**: a ação foi concluída ou rejeitada


[A especificação](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)
também usa o termo **thenable** para descrever um objeto semelhante à promessa,
já que tem um método `then`. Esse termo me lembra do ex-dirigente do futebol inglês,
[Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables). Por
isso, vou usá-lo o menos possível.


## As promessas chegaram ao JavaScript!

As promessas já existem há algum tempo na forma de bibliotecas, como:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

Essas bibliotecas e as promessas do JavaScript compartilham um comportamento comum e padronizado,
denominado [Promises/A+](https://github.com/promises-aplus/promises-spec). Se
você usa jQuery, ele tem algo semelhante chamado de
[Deferreds](https://api.jquery.com/category/deferred-object/). No entanto, os
Deferreds não são compatíveis com Promise/A+, o que os torna
[sutilmente diferentes e menos úteis](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/). Por
isso, fique atento. O jQuery também tem
[um tipo de promessa](https://api.jquery.com/Types/#Promise), mas é somente um
subconjunto de Deferreds e possui os mesmos problemas.

Embora as implementações de promessas sigam um comportamento padronizado, existem
diferenças gerais entre as APIs. As APIs das promessas do JavaScript são semelhantes às do RSVP.js.
Veja como criar uma promessa:

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


O construtor de promessas aceita um argumento, um callback com dois parâmetros,
“resolver” e “rejeitar”. Faça algo dentro do callback, talvez algo assíncrono, e chame
“resolver” se tudo tiver funcionado bem. Caso contrário, chame “rejeitar”.

Assim como o `throw` no JavaScript simples, é comum, mas não obrigatório, chamar
“rejeitar” com um objeto Error. A vantagem dos objetos Error é que eles capturam um
rastreamento de pilha, aumentando a utilidade das ferramentas de depuração.

Veja como usar essa promessa:

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` aceita dois argumentos: um callback para a conclusão e outro
para a falha. Ambos são opcionais. Portanto, você pode adicionar um callback somente para a
conclusão ou só para a falha.

As promessas do JavaScript começaram no DOM como "Futures", foram renomeadas para "Promises" e,
finalmente, movidas para o JavaScript. É ótimo elas estarem no JavaScript, em vez de no
DOM, já que ficam disponíveis em contextos JS fora do navegador, como
Node.js, independentemente de serem usadas ou não nas APIs essenciais.

Embora sejam um recurso do JavaScript, o DOM pode usá-las sem nenhum problema. Na
verdade, todas as novas APIs do DOM com métodos de conclusão/falha usarão promessas.
Isso já está acontecendo com
[Gerenciamento de cota](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota),
[Eventos de carregamento de fonte](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready),
[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17),
[Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options),
[Streams](https://github.com/whatwg/streams#basereadablestream) e mais.


## Compatibilidade de navegadores &amp; e polyfill

Já existem implementações de promessas nos navegadores atuais.

A partir das versões Chrome 32, Opera 19, Firefox 29, Safari 8 &amp; Microsoft Edge,
as promessas são ativadas por padrão.

Para adicionar compatibilidade com a especificação
a navegadores que não têm uma implementação completa de promessas ou para incluir promessas em outros navegadores e ao Node.js, confira o
[polyfill](https://github.com/jakearchibald/ES6-Promises#readme)
(2 kb comprimido com GZIP).


## Compatibilidade com outras bibliotecas

A API de promessas do JavaScript considera qualquer coisa que tenha um método `then()` como semelhante a uma
promessa (ou `thenable` na terminologia de promessas – _suspiro_). Portanto, se você usar uma biblioteca
que retorna uma promessa do Q, não há problema, ela funcionará corretamente com as novas promessas do
JavaScript.

Embora, como já mencionado, os Deferreds do jQuery sejam um tanto... inúteis.
Você pode usar “cast” para transformá-los em promessas padrão, o que é bom fazer
o quanto antes:


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


Aqui, o `$.ajax` do jQuery retorna um Deferred. Como ele tem um método `then()`,
`Promise.resolve()` pode transformá-lo em uma promessa do JavaScript. No entanto,
algumas vezes os Deferreds passam vários argumentos aos callbacks relacionados, por exemplo:

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



Já as promessas do JS ignoram qualquer argumento além do primeiro:


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



É isso o que precisamos normalmente ou, pelo menos, nos dá acesso ao
que queremos. Além disso, é importante notar que o jQuery não segue a convenção de
passar objetos Error nas rejeições.


## Simplificar o código assíncrono complexo

OK, vamos escrever código. Digamos que você queira fazer o seguinte:

1. Iniciar um controle giratório para indicar um carregamento
1. Buscar algum JSON para uma história que nos dará o título e URLs para cada capítulo
1. Adicionar o título à página
1. Buscar cada capítulo
1. Adicionar a história à página
1. Interromper o controle giratório

Além disso, informar ao usuário se ocorreu algum erro durante o processamento. Nesse caso, devemos
interromper o controle giratório. Caso contrário, ele continuará a girar, ficará
tonto e falhará em outra IU.

Normalmente, você não usaria JavaScript para exibir uma história, já que
[é mais rápido fazer isso com HTML](https://jakearchibald.com/2013/progressive-enhancement-is-faster/).
No entanto, esse padrão é muito comum quando usamos APIs: Várias buscas
de dados e fazer alguma coisa quando elas forem concluídas.

Para começar, vamos buscar dados da rede:

## Transformar XMLHttpRequest em promessa

As APIs antigas serão atualizadas para usarem as promessas, se for possível em modo de compatibilidade
inversa. `XMLHttpRequest` é a opção principal. Enquanto isso,
escreveremos uma função simples para fazer uma solicitação GET:



    function get(url) {
      // Return a new promise.
      return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    }


Agora, vamos usá-la:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


Já podemos fazer solicitações HTTP sem digitar manualmente `XMLHttpRequest`. Isso é ótimo, já que o melhor é ficar longe da
confusão entre maiúsculas e minúsculas de `XMLHttpRequest`.


## Encadear

O `then()` não é o final da história. Você pode encadear métodos `then` para
transformar valores ou executar mais ações assíncronas em sequência.


### Transformar valores
Você pode transformar valores simplesmente retornando o novo valor:

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


Como exemplo prático, voltaremos para:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



A resposta é JSON, mas o que estamos recebendo no momento é um texto simples. Poderíamos
alterar nossa função get para usar o
[`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType) do JSON,
mas também podemos resolver isso com promessas:

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



Como `JSON.parse()` aceita um único argumento e retorna um valor transformado,
podemos criar um atalho:

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


Na verdade, seria bem fácil usar uma função `getJSON()`:

    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` continua retornando uma promessa, que busca um URL e analisa
a resposta como JSON.


### Enfileirar ações assíncronas

Também é possível encadear métodos `then` para executar ações assíncronas em sequência.

Quando você retorna algum item de um callback de `then()`, ocorre algo mágico.
Se você retornar um valor, o próximo `then()` será chamado com ele. No entanto, se
você retornar algo semelhante a uma promessa, ela bloqueará o próximo `then()`, que somente
será chamado quando essa promessa for definida (conclusão/falha). Por exemplo:

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



Aqui, fazemos uma solicitação assíncrona para `story.json`, que retorna um conjunto de
URLs a serem solicitados. Em seguida, solicitamos o primeiro URL. É aí que as promessas
começam realmente a se destacar de simples padrões de callback.

Você pode até criar um método de atalho para obter capítulos:

    var storyPromise;

    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');

      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }

    // and using it is simple:
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    })


Não fazemos o download de `story.json` até que `getChapter` seja chamado, mas nas próximas
chamadas de `getChapter`, reutilizaremos a promessa da história. Assim, a busca de `story.json`
será feita só uma vez. Viva às promessas!


## Gerenciamento de erros

Como vimos anteriormente, `then()` aceita dois argumentos, um
para conclusão e outro para falha (ou “atender” e “rejeitar”, na terminologia de promessas):

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


Você também pode usar `catch()`:


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


Não há nada especial sobre o `catch()`, é somente uma outra forma mais legível de
`then(undefined, func)`. Observe que os dois exemplos de
código acima não se comportam da mesma forma. O último é equivalente a:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


A diferença é sutil, mas extremamente útil. As rejeições de promessa pulam
para o próximo método `then()` com um callback de rejeição (ou `catch()`, que
é equivalente). Com `then(func1, func2)`, são
chamadas `func1` ou `func2`, mas nunca ambas. No entanto, com `then(func1).catch(func2)`, ambas serão
chamadas se `func1` rejeitar o método, já que são etapas diferentes na cadeia. Veja
o exemplo a seguir:


    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch(function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch(function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    })



O fluxo acima é bastante semelhante ao try/catch normal do JavaScript. Erros que
ocorrem em um "try" vão imediatamente para o bloqueio `catch()`. Veja a seguir o
fluxograma do código acima (adoro fluxogramas):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden"
   src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Siga as linhas azuis para promessas atendidas ou vermelhas para as
rejeitadas.

### Exceções e promessas do JavaScript
As rejeições acontecem quando uma promessa é recusada explicitamente, mas também implicitamente
, se um erro for acionado no callback do construtor:

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });

    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })


Isso significa que é útil fazer todo o trabalho relacionado a promessas dentro do callback do
construtor para que os erros sejam capturados automaticamente e
transformados em rejeições.

O mesmo acontece com erros acionados nos callbacks `then()`.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### Gerenciamento de erros na prática

Podemos usar o “catch” com nossa história e nossos capítulos para exibir um erro ao usuário:



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



Se a recuperação de `story.chapterUrls[0]` falhar (por exemplo, HTTP 500 ou o usuário está off-line), ela
pulará todos os callbacks de conclusão a seguir, incluindo o de
`getJSON()`, que tenta analisar a resposta como JSON. Além disso, ela pulará o
callback que adiciona chapter1.html à página. Em vez de tudo isso, ela executará o callback do
catch. Como resultado, se
qualquer ação prévia falhar, "Failed to show chapter" será adicionado à página.

Como o try/catch do JavaScript, o erro é capturado e o código subsequente
continua. Portanto, o controle giratório fica sempre oculto, que é o que queremos. O
código acima se torna uma versão assíncrona e não bloqueadora do código:

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


O `catch()` pode ser necessário simplesmente para geração de registros, sem recuperação
do erro. Para fazer isso, acione novamente o erro. Podemos fazer isso no
nosso método `getJSON()`:



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


Conseguimos buscar um capítulo, mas queremos todos eles. Faremos
isso acontecer.


## Paralelismo e sequência: como obter o melhor dos dois recursos


Não é fácil pensar assincronamente. Se você está com dificuldades para começar,
tente escrever o código como se fosse síncrono. Neste caso:

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);

      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });

      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }

    document.querySelector('.spinner').style.display = 'none'

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/sync-example.html)


Funciona (veja o
[código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/sync-example.html))!
Porém, o código é síncrono e bloqueia o navegador durante os downloads. Para fazer isso
funcionar de forma assíncrona, usamos `then()` para que tudo ocorra em sequência.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch &amp; display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })



No entanto, podemos percorrer os URLs dos capítulos e buscá-los na ordem certa? Isso
**não funciona**:

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` não reconhece assincronismo. Portanto, os capítulos apareceriam na ordem de
download, que é basicamente a forma como Pulp Fiction foi escrito. Como não
estamos lidando com Pulp Fiction, corrigiremos esse problema.


### Criar uma sequência
Queremos transformar nossa matriz `chapterUrls` em uma sequência de promessas. Podemos fazer isso usando `then()`:

    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    story.chapterUrls.forEach(function(chapterUrl) {
      // Add these actions to the end of the sequence
      sequence = sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    })


Esta é a primeira vez que vemos `Promise.resolve()`. Isso cria uma
promessa que é resolvida para qualquer valor informado. Se você passar uma
instância de `Promise`, ela simplesmente a retornará (**Note:** essa é uma
mudança na especificação que algumas implementações ainda não seguem). Se você
passar algo semelhante a uma promessa (com um método `then()`), ela criará
uma `Promise` legítima que será atendida/rejeitada da mesma forma. Se você passar
qualquer outro valor como, por exemplo, `Promise.resolve('Hello')`, ela criará uma
promessa que será atendida com esse valor. Se você fizer a chamada sem um valor,
como acima, a promessa será atendida com "indefinido".


Existe também `Promise.reject(val)`, que cria uma promessa que será rejeitada com
o valor fornecido (ou indefinido).

Podemos organizar o código acima usando
[`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



Esse código faz o mesmo que o exemplo anterior, mas não precisa da variável separada
"sequence". Nosso callback reduzido é chamado para cada item na matriz.
"sequence" é `Promise.resolve()` na primeira chamada. No entanto, para o resto de
"sequence" de chamadas, será aquilo que retornar da chamada anterior. `array.reduce`
é útil para resumir uma matriz a um único valor, que nesse caso
é uma promessa.

Vamos juntar tudo isso:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-example.html)

E ficou assim (veja o
[código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-example.html)),
uma versão totalmente assíncrona da opção síncrona. Ainda podemos fazer melhor. No momento,
o download da nossa página acontece assim:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Os navegadores são muito eficientes no download de vários itens ao mesmo tempo. Por isso, estamos perdendo
desempenho fazendo o download de capítulos um depois do outro. Queremos fazer
o download de todos ao mesmo tempo e processá-los depois que isso sejam concluído.
Existe uma API para isso:


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` recebe uma matriz de promessas e cria uma promessa que será atendida
quando todas as outras forem concluídas. Você recebe uma matriz de resultados (com
os dados das promessas atendidas) na mesma ordem em que elas foram passadas.



    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-all-example.html)

Dependendo da conexão, esse processo pode ser alguns segundos mais rápido que o carregamento individual (veja o
[código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-all-example.html))
, e o código pode ficar menor na nossa primeira tentativa. É possível fazer o download dos capítulos em qualquer
ordem, mas eles são exibidos na tela na ordem correta.


<figure>
  <img src="imgs/promise2.gif">
</figure>

No entanto, ainda podemos melhorar o desempenho percebido. Quando o capítulo um chegar, teremos
de adicioná-lo à página. Isso permite que o usuário comece a leitura antes da chegada dos
demais capítulos. Quando o capítulo três chegar, não o adicionaremos à
página porque talvez o usuário não perceba que o capítulo dois não está disponível. Quando o capítulo dois
chegar, poderemos adicionar os capítulos dois, três e assim por diante.

Para fazer isso, buscamos o JSON de todos os capítulos ao mesmo tempo e criamos uma
sequência para adicioná-los ao documento:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download in parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-best-example.html)

E este é o resultado (veja o
[código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-best-example.html)),
o melhor de dois mundos! O mesmo tempo será necessário para exibir todo o conteúdo,
mas o usuário receberá a primeira parte dele antes.


<figure>
  <img src="imgs/promise3.gif">
</figure>

Neste exemplo simples, todos os capítulos chegam aproximadamente no mesmo momento, mas
o benefício de exibir um de cada vez será ainda maior para capítulos
mais longos.


Para fazer tudo isso com [callbacks ou
eventos no estilo do Node.js](https://gist.github.com/jakearchibald/0e652d95c07442f205ce),
precisaríamos do dobro de código e, o mais importante, não seria tão fácil de entender. No entanto, ainda
não chegamos ao fim do tópico sobre promessas. Quando combinadas com outros recursos do ES6,
elas ficam ainda mais fáceis de usar.


## Rodada bônus: promessas e geradores


A próxima parte envolve um grupo de novos recursos do ES6, mas isso não é algo
que você precisa entender para começar a usar promessas no seu código. Encare essas informações como um
trailer de alguns recursos fantásticos que serão lançados em breve.

O ES6 também oferece
[geradores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators),
que permitem que as funções saiam em um determinado ponto, como "return", mas depois
reiniciem no mesmo ponto e estado, por exemplo:


    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


Observe o asterisco antes do nome da função. Isso faz dela um gerador. A palavra-chave “yield”
é nosso ponto de retorno/retomada. Podemos usar o gerador da seguinte forma:

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


Mas o que isso significa para as promessas? Você pode usar esse comportamento de retornar/retomar
para escrever um código assíncrono que parece e é tão fácil de entender
quanto o síncrono. Não se preocupe em entender todas as linhas, mas
veja a seguir uma função auxiliar que permite o uso de `yield` para aguardar a definição de
promessas:

    function spawn(generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }
      var generator = generatorFunc();
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    }


Eu
[copiei essa função do Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500),
mas fiz algumas adaptações para as promessas do JavaScript. Com isso, podemos usar nossa
versão final do capítulo, combiná-la com várias novas vantagens do ES6 e
transformá-la em:

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download in parallel.
        let chapterPromises = story.chapterUrls.map(getJSON);

        for (let chapterPromise of chapterPromises) {
          // Wait for each chapter to be ready, then add it to the page
          let chapter = yield chapterPromise;
          addHtmlToPage(chapter.html);
        }

        addTextToPage("All done");
      }
      catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage("Argh, broken: " + err.message);
      }
      document.querySelector('.spinner').style.display = 'none';
    })

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-generators-example.html)

Funciona exatamente como antes, mas é muito mais fácil de ler. Esse código já funciona hoje no
Chrome e no Opera (veja o
[código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-generators-example.html))
e também pode ser usado no Microsoft Edge, desde que você acesse `about:flags` e ative a configuração
**Enable experimental JavaScript features**. Essa configuração será
ativada por padrão em uma próxima versão.


Isso reúne vários recursos novos do ES6: promessas, geradores, let, for-of.
Quando executamos yield em uma promessa, o auxiliar de criação aguarda a resolução da promessa e
retorna o valor final. Se a promessa for rejeitada, o spawn fará com que a instrução yield
acione uma exceção, que poderá ser capturada com o
try/catch normal do JavaScript. É uma codificação assíncrona incrivelmente simples!


Esse padrão é tão útil que será disponibilizado no ES7 na forma de
[funções assíncronas](https://jakearchibald.com/2014/es7-async-functions/). O recurso é
muito parecido com o que vimos acima, mas sem a necessidade de um método `spawn`.


## Referência da API de promessas {: #promise-api-reference }

Todos os métodos funcionam nos navegadores Chrome, Opera, Firefox, Microsoft Edge e Safari,
exceto onde indicado. O
[Polyfill](https://github.com/jakearchibald/ES6-Promises#readme) oferece
os recursos abaixo para todos os navegadores.


### Métodos estáticos

<table class="responsive methods">
<tr>
<th colspan="2">Resumos dos métodos</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Retorna a promessa (somente se <code>promise.constructor == Promise</code>)</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>
    Faz uma nova promessa usando o thenable. Um thenable é parecido com uma promessa
    na medida em que tem um método `then()`.
  </td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>Faz uma promessa que será atendida como <code>obj</code>. nessa situação.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td>
    Faz uma promessa que será rejeitada como <code>obj</code>. Para fins de consistência e
    depuração (por exemplo: rastreamento de pilha), <code>obj</code> deveria ser um
    <code>instanceof Error</code>.
  </td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>
    Faz uma promessa que será atendida quando todos os itens da matriz também forem e
    rejeitada se (e quando) qualquer item for rejeitado. Cada item da matriz é passado para
    <code>Promise.resolve</code>. Portanto, a matriz pode ser uma combinação
    de objetos parecidos com promessa e outros itens. O valor do atendimento é
    uma matriz, na ordem dos valores correspondentes. O valor da rejeição é
    o valor da primeira rejeição.
  </td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>
    Faz uma promessa que será atendida assim que qualquer item for atendido ou será rejeitada assim
    que qualquer item for rejeitado, o que ocorrer primeiro.
  </td>
</tr>
</table>

Note: Não estou convencido da utilidade de `Promise.race`. Eu preferiria ter um
oposto de `Promise.all` que somente será rejeitada se todos os itens forem rejeitados.

### Construtor

<table class="responsive constructors">
<tr>
<th colspan="2">Construtor</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Sua promessa será atendida/rejeitada com o resultado de
      <code>thenable</code>
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Sua promessa será atendida com <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Sua promessa será rejeitada com <code>obj</code>. Para fins de consistência e
      depuração (por exemplo, rastreamentos de pilha), o obj deve ser um <code>instanceof
      Error</code>.  Todos os erros acionados no callback do construtor serão passados
      implicitamente para <code>reject()</code>.
    </p>
  </td>
</tr>
</table>

### Métodos de instância

<table class="responsive methods">
<tr>
<th colspan="2">Métodos de instância</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    <code>onFulfilled</code> é chamado quando/se a "promessa" for resolvida.
    <code>onRejected</code> é chamado quando/se a "promessa" for rejeitada. As duas opções são
    opcionais. Se um deles ou ambos forem omitidos, o próximo
    <code>onFulfilled</code>/<code>onRejected</code> da cadeia será chamado.
    Os dois callbacks têm um parâmetro único, o valor de atendimento ou
    motivo da rejeição. <code>then()</code> retorna uma nova promessa equivalente ao
    valor retornado de <code>onFulfilled</code>/<code>onRejected</code>
    após ser passado por meio de <code>Promise.resolve</code>. Se um erro for
    acionado no callback, a promessa retornada será rejeitada com esse problema.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td>Outra forma de <code>promise.then(undefined, onRejected)</code></td>
</tr>
</table>

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

Muitos agradecimentos para Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp,
Addy Osmani, Arthur Evans e Yutaka Hirano, que revisaram este texto e fizeram
correções e recomendações.

Agradeço também a [Mathias Bynens](https://mathiasbynens.be/) por
[atualizar várias partes](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)
do artigo.
