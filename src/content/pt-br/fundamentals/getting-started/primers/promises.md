project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "As promessas simplificam cálculos postergados e assíncronos. Uma promessa representa uma operação ainda não concluída."

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2014-01-29 #}

# Promessas em JavaScript: uma introdução {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Senhoras e senhores, preparem-se para um momento importantíssimo na história do
desenvolvimento da Web.

<em>[Soam os tambores]</em>

As promessas agora são um recurso nativo no JavaScript!

<em>[Fogos de artifício explodem, papéis brilhantes caem de cima, a multidão enlouquece]</em>

Nesse momento, você está em uma destas categorias:

* As pessoas comemoram à sua volta, mas você não sabe bem o motivo dessa confusão. Talvez você nem mesmo tenha certeza do que é uma "promessa". Você gostaria de dar de ombros, mas o peso do papel brilhante é muito grande em seus ombros. Se for isso, não se preocupe. Eu demorei uma eternidade para entender porque deveria me preocupar com tudo isso. Provavelmente, você deve começar... [pelo começo](#whats-all-the-fuss-about).
* Você soca o ar! Demorou, certo? Você já usou essas tais promessas antes, mas está incomodado dom a API um pouco diferente de todas as implementações. Qual é a API para a versão oficial do JavaScript? Você provavelmente deve começar com a [terminologia](#promise-terminology).
* Você já conhecia tudo isso e acha ridículas essas pessoas pulando sem parar, como se isso fosse novidade para eles. Curta sua superioridade por alguns momentos e vá direto para a [referência da API](#promise-api-reference).

## Por que todo esse estardalhaço? {: #whats-all-the-fuss-about }

O JavaScript usa um único encadeamento. Isso significa que duas partes de um script não podem ser executadas ao mesmo tempo; elas têm de ser executadas uma após a outra. Em navegadores, o JavaScript compartilha um encadeamento com muitas outras coisas que variam de navegador para navegador. Porém, o JavaScript tipicamente está na mesma fila das atividades de pintura, atualização de estilos e tratamento das ações dos usuários (como destaque de texto e interação com controles dos formulários). Uma atividade em uma dessas coisas retarda as demais.

Você, como ser humano, usa multiencadeamento. Você pode digitar com vários dedos, pode dirigir e conversar ao mesmo tempo. A única função bloqueadora com que temos de lidar é o espirro, quando todas as atividades em andamento devem ser suspensas pela duração do espirro. Isso é muito irritante, principalmente quando você está dirigindo e tentando manter uma conversa. Você não quer escrever um código que espirre.

Você provavelmente usou eventos e retornos de chamada para evitar isso. Aqui estão os eventos:

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


Não há nenhum espirro aqui. Obtemos a imagem, adicionamos alguns ouvintes e o JavaScript pode interromper a execução até que algum desses ouvintes seja chamado.

Infelizmente, no exemplo acima, é possível que os eventos tenham ocorrido antes de começarmos a ouvi-los. Portanto, precisamos contornar isso usando a propriedade "complete" das imagens:

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

Essa técnica não captura as imagens que tiveram erros antes de começarmos a ouvi-las. Infelizmente, o DOM não oferece essa funcionalidade. Além disso, nesse exemplo carregamos uma imagem. As coisas ficam ainda mais complexas quando queremos saber quando um conjunto de imagens foi carregado.


## Eventos nem sempre são a melhor maneira

Os eventos são ótimos para coisas que ocorrem várias vezes com o mesmo objeto&mdash; keyup, touchstart etc. Com esses eventos, não importa o que aconteceu antes do ouvinte ser anexado. Mas quando falamos de sucesso/falha assíncronos, o ideal é algo assim:

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

É isso o que as promessas fazem, mas com nomes melhores. Se elementos de uma imagem HTML tivessem um método "ready" que retornasse uma promessa, poderíamos fazer isto:

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


Na essência, as promessas são um pouco semelhantes aos ouvintes de eventos, exceto que:

* Uma promessa só pode ter sucesso ou falhar uma vez. Ela não pode ter sucesso ou falhar duas vezes, nem alternar entre sucesso e falha ou vice-versa.
* Se uma promessa tiver sucesso ou falhar e você adicionar posteriormente um retorno de chamada de sucesso/falha, o retorno de chamada correto será chamado, mesmo que o evento tenha ocorrido anteriormente.

Isso é extremamente útil para sucesso/falha assíncronos, pois você não está muito interessado no momento exato da disponibilidade de alguma coisa, mas está mais interessado na reação a um resultado.


## Terminologia das promessas {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) examinou a primeira versão deste artigo e me atribuiu nota zero para terminologia. Ele me colocou em quarentena, me obrigou a copiar [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 100 vezes e escreveu uma carta preocupada para meus pais. Apesar disso, eu ainda me confundo com terminologia, mas os termos básicos são descritos a seguir.

Uma promessa pode ser:

* **atendida** - a ação relacionada à promessa teve sucesso
* **rejeitada** - a ação relacionada à promessa falhou
* **pendente** - a ação ainda não foi atendida nem rejeitada
* **definida** - a ação foi atendida ou rejeitada


[A especificação](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) também usa o termo **thenable** para descrever um objeto semelhante à promessa, no sentido de que tem um método `then`. Esse termo me lembra do ex-dirigente do futebol inglês, [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables). Por isso, vou usá-lo o menos possível.


## As promessas chegaram ao JavaScript!

As promessas já existem há algum tempo na forma de bibliotecas, como:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

Essas bibliotecas e as promessas do JavaScript compartilham um comportamento comum e padronizado, denominado [Promises/A+](https://github.com/promises-aplus/promises-spec). Se você usa jQuery, ele tem algo semelhante chamado de [Deferreds](https://api.jquery.com/category/deferred-object/). No entanto, Deferreds não é compatível com Promise/A+, o que as torna [ligeiramente diferentes e menos úteis](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/), portanto, tome cuidado. O jQuery também tem [um tipo Promise](https://api.jquery.com/Types/#Promise), mas ele é apenas um subconjunto do Deferred e apresenta os mesmos problemas.

Embora as implementações de promessas sigam um comportamento padronizado, existem diferenças entre as APIs gerais. As APIs das promessas do JavaScript são semelhantes às do RSVP.js. Veja como criar uma promessa:

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


O construtor de promessas aceita um argumento, um retorno de chamada com dois parâmetros, resolver e rejeitar. Faça algo dentro do retorno de chamada, talvez algo assíncrono, e chame resolver se tudo funcionou bem ou, caso contrário, chame rejeitar.

Assim como o `throw` no JavaScript simples, é comum, mas não obrigatório, chamar rejeitar com um objeto Error. A vantagem dos objetos Error é que capturam um rastreamento de pilha, aumentando a utilidade das ferramentas de depuração.

Veja como usar essa promessa:

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` aceita dois argumentos: um retorno de chamada para o sucesso e outro para a falha. Ambos são opcionais. Portanto, você pode adicionar um retorno de chamada somente para o sucesso ou somente para a falha.

As promessas do JavaScript começaram do DOM como "Futures", foram renomeadas para "Promises" e, finalmente, movidas para o JavaScript. O fato delas estarem no JavaScript, em vez de no DOM, é algo ótimo porque elas ficam disponíveis em contextos JS fora do navegador, como Node.js (sem entrar no mérito se são usadas nas APIs essenciais).

Embora sejam um recurso do JavaScript, o DOM pode usá-las sem nenhum problema. Na verdade, todas as novas APIs do DOM com métodos de sucesso/falha usarão promessas. Isso já está acontecendo com [Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), [Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready), [ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options) e [Streams](https://github.com/whatwg/streams#basereadablestream), entre outros.


## Compatibilidade de navegadores e polyfill

Já existem implementações de promessas nos navegadores atuais.

A partir das versões Chrome 32, Opera 19, Firefox 29, Safari 8 e Microsoft Edge, as promessas são ativadas por padrão.

Para adicionar compatibilidade com a especificação a navegadores que não têm uma implementação completa de promessas, ou para adicionar promessas a outros navegadores e ao Node.js, confira o [polyfill](https://github.com/jakearchibald/ES6-Promises#readme) (2 kb comprimido com GZIP).


## Compatibilidade com outras bibliotecas

A API de promessas do JavaScript considera qualquer coisa que tenha um método `then()` como semelhante a uma promessa (ou `thenable` na terminologia de promessas – _suspiro_). Portanto, se você usar uma biblioteca que retorna uma promessa do Q, não há problema, ela funcionará corretamente com as novas promessas do JavaScript.

Embora, como já mencionado, os Deferreds do jQuery sejam um tanto... inúteis. Felizmente, você pode usar cast para transformá-los em promessas padrão, o que é bom fazer o quanto antes:


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


Aqui, o `$.ajax` do jQuery retorna um Deferred. Como ele tem um método `then()`, `Promise.resolve()` pode transformá-lo em uma promessa do JavaScript. No entanto, algumas vezes os Deferreds passam vários argumentos aos seus retornos de chamada, por exemplo:

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



Ao passo que as promessas do JS ignoram qualquer argumento além do primeiro:


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



Felizmente, é isso o que precisamos normalmente ou, pelo menos, temos acesso ao que queremos. Além disso, é bom notar que o jQuery não segue a convenção de passar objetos Error nas rejeições.


## Simplificar código assíncrono complexo

OK, vamos codificar alguma coisa. Suponhamos que queremos:

1. Iniciar um controle giratório para indicar uma carga
1. Recuperar algum JSON para uma matéria, da qual receberemos o título e URLs para cada capítulo
1. Adicionar o título a página
1. Recuperar cada capítulo
1. Adicionar a história à página
1. Interromper o controle giratório

E também informar ao usuário se ocorreu algum erro durante o processamento. Nesse caso, devemos interromper o controle giratório, ou ele continuará a girar, ficará tonto e cairá em outra IU.

Naturalmente, você não usaria JavaScript para entregar uma matéria, pois [é mais rápido entregá-la com HTML](https://jakearchibald.com/2013/progressive-enhancement-is-faster/). Mas esse padrão é muito comum quando usamos APIs: várias recuperações de dados e fazer alguma coisa quando elas forem concluídas.

Para começar, vamos recuperar dados da rede:

## Transformar XMLHttpRequest em promessa

As APIs antigas serão atualizadas para usa promessas mantendo, se possível a compatibilidade com versões anteriores. O `XMLHttpRequest` é um ótimo candidato, mas por enquanto vamos escrever uma função simples para fazer uma solicitação GET:



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


[Clique aqui para ver como isso funciona](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external } e verifique o console do DevTools para ver o resultado. Agora já podemos fazer solicitações HTTP sem digitarmos manualmente `XMLHttpRequest`. Isso é ótimo, porque quanto mais longe eu ficar da confusão irritante de maiúsculas e minúsculas de `XMLHttpRequest`, maior a minha felicidade.


## Encadear

O `then()` não é o final da história. Você pode encadear `then`s para transformar valores ou executar mais ações assíncronas, uma após a outra.


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


Como exemplo prático, vamos voltar para:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



A resposta é JSON, mas o que estamos recebendo no momento é texto simples. Poderíamos alterar a nossa função get para usar o [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType) do JSON, mas também podemos resolver isso com promessas:

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



Como `JSON.parse()` aceita um único argumento e retorna um valor transformado, podemos fazer um atalho:

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[Veja como isso funciona aqui](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external } e verifique o console do DevTools para ver o resultado. Na verdade, seria bem fácil fazer uma função `getJSON()`:


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` continua retornando uma promessa, que recupera um URL e analisa a resposta como JSON.


### Enfileirar ações assíncronas

Também é possível encadear `then`s para executar ações assíncronas em sequência.

Quando você retorna alguma coisa de um retorno de chamada de `then()`, ocorre algo mágico. Se você retornar um valor, o próximo `then()` será chamado com esse valor. No entanto, se você retornar algo semelhante a uma promessa, ela bloqueia o próximo `then()`, que somente será chamado quando essa promessa for definida (sucesso/falha). Por exemplo:

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



Aqui, fazemos uma solicitação assíncrona para `story.json`, que retorna um conjunto de URLs a serem solicitados. Em seguida, solicitamos o primeiro URL. É aí que as promessas começam realmente a se destacar de simples padrões de retorno de chamada.

Você pode até fazer um método de atalho para obter capítulos:

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


Não baixamos `story.json` até que `getChapter` seja chamado, mas nas próximas chamadas de `getChapter`, reutilizaremos a promessa da matéria. Assim `story.json` será recuperado apenas uma vez. Viva as promessas!


## Tratamento de erros

Como vimos anteriormente, `then()` aceita dois argumentos, um para sucesso, outro para falha (ou atender e rejeitar, na terminologia de promessas):

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


Não há nada especial sobre o `catch()`:, é apenas uma outra forma de `then(undefined, func)`, mas é mais legível. Observe que os dois exemplos de código acima não se comportam da mesma forma. O último é equivalente a:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


A diferença é sutil, mas extremamente útil. As rejeições de promessa pulam para o próximo `then()` com um retorno de chamada de rejeição (ou `catch()`, pois é equivalente). Com `then(func1, func2)`, são chamadas `func1` ou `func2`, mas nunca ambas. Mas com `then(func1).catch(func2)`, ambas serão chamadas se `func1` rejeitar, pois são etapas diferente na cadeia. Veja o seguinte:


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



O fluxo acima é bastante semelhante ao try/catch normal do JavaScript. Erros que ocorrem em um "try" vão imediatamente para o bloco `catch()`. Veja a seguir o fluxograma do código acima (eu adoro fluxogramas):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Siga as linhas azuis para promessas atendidas ou vermelhas para as rejeitadas.

### Exceções e promessas do JavaScript
As rejeições acontecem quando uma promessa é rejeitada explicitamente, mas também implicitamente, se um erro for acionado no retorno de chamada do construtor:

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


Isso significa que é útil fazer todo o trabalho relacionado a promessas dentro do retorno de chamada do construtor de promessas para que os erros sejam capturados automaticamente e transformados em rejeições.

O mesmo acontece com erros acionados nos retornos de chamada `then()`.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### Tratamento de erros na prática

Podemos usar catch com nossa matéria e nossos capítulos para exibir um erro ao usuário:



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



Se a recuperação de `story.chapterUrls[0]` falhar (por exemplo, HTTP 500 ou o usuário está off-line), ela pulará todos os retornos de chamada de sucesso seguintes, incluindo o de `getJSON()`, que tenta analisar a resposta como JSON. Além disso, ela pulará o retorno de chamada que adiciona chapter1.html à página. Em vez de tudo isso, ela executará o retorno de chamada do catch. Como resultado, se qualquer ação prévia falhar, "Failed to show chapter" será adicionado à página.

Como o try/catch do JavaScript, o erro é capturado e o código subsequente continua. Portanto, o controle giratório fica sempre oculto, que é o que desejamos. O código acima se torna uma versão assíncrona e não bloqueadora deste código:

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


O `catch()` pode ser necessário simplesmente para fins de registro em log, sem recuperação do erro. Para fazer isso, acione novamente o erro. Podemos fazer isso em nosso método `getJSON()`:



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


Assim, conseguimos recuperar um capítulo, mas queremos todos eles. Vamos fazer isso acontecer.


## Paralelismo e sequência: como obter o melhor de ambos


Não é fácil pensar assincronamente. Se você está com dificuldades para começar, tente escrever o código como se fosse síncrono. Neste caso:

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

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


Funciona (vide [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external })! 
Mas o código é síncrono e bloqueia o navegador durante os downloads. Para fazer isso
funcionar de forma assíncrona, usamos `then()` para fazer as coisas acontecerem, uma após a outra.

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



Mas como podemos percorrer os URLs dos capítulos e recuperá-los na ordem certa? Isto **não funciona**:

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` não reconhece assincronismo. Portanto, os capítulos apareceriam na ordem de download, que é basicamente a forma como Pulp Fiction foi escrito. Como não estramos lidando com Pulp Fiction, vamos corrigir esse problema.


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


Esta é a primeira vez que vemos `Promise.resolve()`, que cria uma promessa que é resolvida para qualquer valor informado. Se você passar uma instância de `Promise`, ela simplesmente a retornará (**observação:** essa é uma mudança na especificação que algumas implementações ainda não seguem). Se você passar algo semelhante a uma promessa (tem um método `then()`), ela criará uma `Promise` legítima que será atendida/rejeitada da mesma forma. Se você passar qualquer outro valor como, por exemplo, `Promise.resolve('Hello')`, ela criará uma promessa que será atendida com esse valor. Se você fizer a chamada sem um valor, como acima, a promessa será atendida com "indefinido".


Existe também `Promise.reject(val)`, que cria uma promessa que será rejeitada com o valor fornecido (ou indefinido).

Podemos organizar o código acima usando [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



Esse código faz o mesmo que o exemplo anterior, mas não precisa da variável separada "sequence". Nosso retorno de chamada reduce é chamado para cada item da matriz. "sequence" será `Promise.resolve()` na primeira vez, mas para o resto das chamadas, "sequence" será o que retornarmos na chamada anterior. `array.reduce` é realmente útil para resumir uma matriz em um único valor que, neste caso, é uma promessa.

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

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

E ficou assim (vide [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }), uma versão totalmente assíncrona da versão síncrona. Mas podemos fazer melhor. No momento, nossa página é baixada da seguinte forma:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Os navegadores são muito eficientes no download de várias coisas ao mesmo tempo. Por isso, estamos perdendo desempenho baixando capítulos um depois do outro. O que queremos fazer é baixá-los todos ao mesmo tempo e processá-los depois que todos os downloads forem concluídos. Felizmente, existe uma API para isso:


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` recebe uma matriz de promessas e cria uma promessa que será atendida quando todas as promessas forem concluídas com sucesso. Você recebe uma matriz de resultados (com os dados das promessas atendidas) na mesma ordem em que passou as promessas.



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

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

Dependendo da conexão, isso pode ser alguns segundos mais rápido que a carga individual (vide [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }) e o código fica menor que em nossa primeira tentativa. Os capítulos podem ser baixados em qualquer ordem, mas aprecem na tela na ordem correta.


<figure>
  <img src="imgs/promise2.gif">
</figure>

No entanto, ainda podemos melhorar o desempenho percebido. Quando o capítulo um chegar, teremos de adicioná-lo à página. Isso permite que o usuário comece a leitura antes da chegada dos demais capítulos. Quando o capítulo três chegar, não o adicionaremos à página porque o usuário poderá não perceber que o capítulo dois não está disponível. Quando o capítulo dois chegar, poderemos adicionar os capítulos dois, três e assim por diante.

Para fazer isso, recuperamos o JSON de todos os capítulos ao mesmo tempo e criamos uma sequência para adicioná-los ao documento:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
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

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

E este é o resultado (vide [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }), o melhor de dois mundos! A mesma quantidade de tempos será necessária para entregar todo o conteúdo, mas o usuário receberá a primeira parte do conteúdo antes.


<figure>
  <img src="imgs/promise3.gif">
</figure>

Neste exemplo simples, todos os capítulos chegam aproximadamente no mesmo momento, mas o benefício de exibir um de cada vez será ainda maior para capítulos mais numerosos e maiores.


Para fazer tudo isso com [retornos de chamada ou eventos no estilo do Node.js](https://gist.github.com/jakearchibald/0e652d95c07442f205ce), precisaríamos do dobro de código e, o mais importante, não seria tão fácil de entender. No entanto, ainda não chegamos ao fim do tópico sobre promessas. Quando combinadas com outros recursos do ES6, elas ficam ainda mais fáceis de usar.


## Rodada bônus: promessas e geradores


A próxima parte envolve um grupo de novos recursos do ES6, mas isso não é algo que você precisa entender para começar a usar promessas em seu código ainda hoje. Encare essas informações como um trailer de alguns recursos fantásticos que serão lançados em breve.

O ES6 também oferece [geradores](http://wiki.ecmascript.org/doku.php?id=harmony:generators), que permitem que as funções saiam em um determinado ponto, como "return", mas depois reiniciem no mesmo ponto e estado, por exemplo:



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


Observe o asterisco antes do nome da função. Isso faz dela um gerador. A palavra-chave yeld é o nosso ponto de retorno/reinício. Podemos usar o gerador da seguinte forma:

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


Mas o que isso significa para promessas? Bem, você pode usar esse comportamento de retornar/resumir para escrever código assíncrono que parece e é tão fácil de entender quanto o código síncrono. Não se preocupe em entender todas as linhas, mas veja a seguir uma função auxiliar que permite o uso de `yield` para aguardar a definição de promessas:

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


Eu [copiei essa função do Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500), mas fiz algumas adaptações para as promessas do JavaScript. Com isso, podemos pegar a nossa versão final do capítulo, combiná-la com várias vantagens novas do ES6 e transformá-la em:

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download parallel.
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

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

Isso funciona exatamente como antes, mas é muito mais fácil de ler. Esse código já funciona hoje no Chrome e no Opera (vide [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }) e também funciona no Microsoft Edge, desde que você acesse `about:flags` e ative a configuração **Enable experimental JavaScript features**. Essa configuração será ativada por padrão em uma próxima versão.


Isso reúne vários recursos novos do ES6: promessas, geradores, let, for-of. Quando executamos yield em uma promessa, o auxiliar de criação aguarda a resolução da promessa e retorna o valor final. Se a promessa for rejeitada, o spawn fará com que a instrução yield acione uma exceção, que poderemos capturar com o try/catch normal do JavaScript. Uma codificação assíncrona incrivelmente simples!


Esse padrão é tão útil que será disponibilizado no ES7 na forma de [funções assíncronas](https://jakearchibald.com/2014/es7-async-functions/). Será muito parecido com o que vimos acima, mas sem a necessidade de um método `spawn`.


## Referência da API de promessas {: #promise-api-reference }

Todos os métodos funcionam nos navegadores Chrome, Opera, Firefox, Microsoft Edge e Safari, exceto onde indicado. [O polyfill](https://github.com/jakearchibald/ES6-Promises#readme) oferece os recursos abaixo para todos os navegadores.


### Métodos estáticos

<table class="responsive methods">
<tr>
<th colspan="2">Resumos de métodos</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Retorna a promessa (somente se  <code>promise.constructor == Promise</code>)</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>Faz uma nova promessa usando o thenable. Um thenable é parecido a uma promessa na medida em que tem um `then()` método.</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>Faz uma promessa que será atendida como  <code>obj</code>. nessa situação.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td>Faz uma promessa que será rejeitada como  <code>obj</code>. Para fins de consistência e depuração (por exemplo, rastreamentos de pilha),  <code>obj</code> deve ser um  <code>instanceof Error</code>.</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>Faz uma promessa que será atendida quando todos os itens da matriz forem atendidos e será rejeitada se (e quando) qualquer item for rejeitado. Cada item da matriz é passado para  <code>Promise.resolve</code>. Portanto, a matriz pode ser uma mistura de objetos parecidos com promessa e outros objetos. O valor do atendimento é uma matriz, na ordem dos valores de atendimento. O valor da rejeição é o valor da primeira rejeição.</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>Faz uma promessa que será atendida assim que qualquer item for atendido ou será rejeitada assim que qualquer item for rejeitado, o que ocorrer primeiro.</td>
</tr>
</table>

Observação: Não estou convencido da utilidade de `Promise.race`. Eu preferiria ter um oposto de `Promise.all` que somente será rejeitada se todos os itens forem rejeitados.

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
      Sua promessa será atendida/rejeitada com o resultado  <code>thenable</code>
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Your promise is fulfilled with <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Your promise is rejected with <code>obj</code>. For consistency and 
      debugging (e.g., stack traces), obj should be an <code>instanceof Error</code>.
      Any errors thrown in the constructor callback will be implicitly passed
      to <code>reject()</code>.
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
    <code>onFulfilled</code> será chamado quando/se "promise" for resolvida. 
    <code>onRejected</code> será chamado quando/se "promise" for rejeitada. Ambos são
    opcionais. Se um deles ou ambos forem omitidos, o próximo 
    <code>onFulfilled</code>/<code>onRejected</code>  da cadeia será chamado.
    Os dois retornos de chamada aceitam um único parâmetro, o valor do atendimento ou 
    o motivo da rejeição.  <code>then()</code> retorna uma nova promessa, equivalente 
    ao valor retornado por  <code>onFulfilled</code>/<code>onRejected</code>
    após ser passado por meio de <code>Promise.resolve</code>. Se um erro for
    acionado no retorno de chamada, a promessa retornada será rejeitada com esse erro.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td>Outra forma de <code>promise.then(undefined, onRejected)</code></td>
</tr>
</table>



Muitos agradecimentos para Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans e Yutaka Hirano, que revisaram este texto e fizeram correções e recomendações.

Agradeço também a [Mathias Bynens](https://mathiasbynens.be/){: .external } por [atualizar várias partes](https://github.com/html5rocks/www.html5rocks.com/pull/921/files) do artigo.


{# wf_devsite_translation #}
