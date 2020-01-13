project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-12-09 #}
{# wf_blink_components: N/A #}

# O manual off-line {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Quando o AppCache foi disponibilizado, ofereceu alguns padrões para permitir
acesso off-line ao conteúdo. Se esses eram os padrões de que precisava, parabéns,
você ganhou na loteria do AppCache (o prêmio principal continua sem ganhador). No entanto, o resto
de nós ficou
[sem saber o que fazer](http://alistapart.com/article/application-cache-is-a-douchebag).

Com o [ServiceWorker][sw_primer], desistimos de tentar resolver a questão do off-line e disponibilizamos
aos desenvolvedores as peças necessárias para que eles mesmos resolvessem essa questão. O service worker oferece
controle sobre o armazenamento em cache e como as solicitações são processadas. Isso significa que você mesmo
cria os próprios padrões. Vamos examinar isoladamente alguns padrões possíveis
, mas na prática você usará vários deles em conjunto
dependendo do URL e do contexto.

Todos os exemplos de código funcionam atualmente no Chrome e no Firefox, a menos que haja uma observação em contrário.
Para detalhes completos sobre o suporte ao service worker, consulte ["O service worker está pronto?"][is_sw_ready].

Para uma demonstração funcional de alguns desses padrões, consulte [Trained-to-thrill][ttt]
e [este vídeo](https://www.youtube.com/watch?v=px-J9Ghvcx4),
que mostra o impacto sobre o desempenho.

## A máquina de cache – quando armazenar recursos

O [ServiceWorker][sw_primer] permite processar solicitações de forma independente do
cache. Portanto, faremos um exame individual. Para começar, armazenamento em cache: quando deve
ser feito?

### Na instalação – como uma dependência {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

O ServiceWorker oferece um evento `install`. Você pode usar isso para preparar o
que precisa estar pronto antes de processar outros eventos. Enquanto isso
acontece, todas as versões anteriores do ServiceWorker ainda estão executando e
entregando páginas. Portanto, o que você fizer agora não pode interferir com essas atividades.

**Ideal para:** CSS, imagens, fontes, JS, modelos… basicamente, tudo que
você considere estático para essa "versão" do site.

São os itens que, em caso de falha de acesso,
interromperiam totalmente o site, itens que um aplicativo nativo equivalente incluiria
como parte do download inicial.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

O `event.waitUntil` faz uma promessa para definir a duração e o sucesso da
instalação. Se a promessa for rejeitada, a instalação será considerada uma falha
e esse ServiceWorker será abandonado (se houver uma versão anterior
em execução, ela ficará intacta). `caches.open` e `cache.addAll` retornam
promessas. Se a recuperação de um dos recursos falhar, a chamada de `cache.addAll`
será rejeitada.

Em [trained-to-thrill][ttt], uso isso para
[armazenar recursos estáticos em cache](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3).


### Na instalação, não como uma dependência {: #on-install-not }

<img src="images/cm-on-install-not.png">

Semelhante à anterior, mas sem retardar a conclusão da instalação e sem provocar erros
na instalação em caso de falha no armazenamento em cache.

**Ideal para:** recursos maiores que não sejam imediatamente necessários, como
arquivos de níveis posteriores de um jogo.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

Não estamos passando a promessa `cache.addAll` para os níveis 11 a 20 de volta para
`event.waitUntil`. Portanto, mesmo se houver falha, o jogo continuará disponível
off-line. Naturalmente, você terá de considerar a possível ausência desses
níveis e tentar armazená-los em cache de novo se estiverem ausentes.

O ServiceWorker pode ser encerrado durante o download dos níveis 11 a 20, porque já
concluiu o processamento dos eventos, o que significa que eles não serão armazenados em cache. Futuramente, pretendemos
adicionar uma API para downloads em segundo plano para processar esses tipos de casos, bem como downloads
maiores como filmes.

### Na ativação {: #on-activate }

<img src="images/cm-on-activate.png">

**Ideal para:** limpeza e migração.

Após a instalação de um novo ServiceWorker, se nenhuma versão anterior estiver sendo usada,
a versão nova será ativada e você receberá um evento `activate`. Como a versão
antiga não está ativa, é um bom momento para processar migrações de esquema no
IndexedDB e também excluir caches não utilizados.

    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

Durante a ativação, outros eventos como `fetch` são colocados em uma fila. Portanto, uma
ativação longa poderá bloquear carregamentos de páginas. Mantenha a ativação
o mais leve possível. Use-a apenas para atividades que _não podem_ ser feitas enquanto a versão
antiga estiver ativa.

Em [trained-to-thrill][ttt], uso isso para
[remover caches antigos](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17).

### Na interação do usuário {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**Ideal para:** se não for possível que o site todo fique off-line, você poderá permitir que o
usuário selecione o conteúdo que quiser disponibilizar off-line. Por exemplo, um vídeo
sobre um tópico no YouTube, um artigo na Wikipédia, uma determinada galeria no Flickr.

Ofereça ao usuário um botão "Read later" ou "Save for offline". Quando
clicado, recupere o que for necessário da rede e armazene-o no cache.

    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

A [caches API][caches_api] está disponível em páginas e em service
workers. Isso significa que você não precisa envolver o service worker para adicionar
algo ao cache.


### Na resposta da rede {: #on-network-response }

<img src="images/cm-on-network-response.png">

**Ideal para:** atualização frequente de recursos, como a caixa de entrada do usuário ou
conteúdo de artigos. Também é útil para conteúdo não essencial, como avatares,
mas é preciso tomar cuidado.

Se um item solicitado não estiver no cache, busque-o na rede,
envie-o para a página e, ao mesmo tempo, adicione-o ao cache.

Se você fizer isso para um grupo de URLs, como avatares, será necessário tomar
cuidado para não ocupar excessivamente a memória da origem. Caso o usuário precise liberar
espaço em disco, é melhor não ser o primeiro candidato. Não deixe de descartar
itens desnecessários do cache.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

Para possibilitar o uso eficiente de memória, você pode ler um corpo de resposta/solicitação
uma única vez. No código acima,
[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) é usado para
criar cópias adicionais que podem ser lidas separadamente.

Em [trained-to-thrill][ttt], uso isso para
[armazenar imagens do Flickr em cache](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109).

### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**Ideal para:** atualizar recursos frequentemente quando não é essencial ter a versão
mais recente. Os avatares podem estar nessa categoria.

Se houver uma versão armazenada em cache disponível, use-a, mas recupere uma atualização para
a próxima vez.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

Isso é bastante semelhante ao
[stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) do HTTP.

### Na mensagem push {: #on-push-message }

<img src="images/cm-on-push.png">

A [Push API](/web/fundamentals/push-notifications)
é outro recurso baseado no service worker. Isso permite que o
service worker seja despertado em resposta a uma mensagem do serviço de
mensagens do SO. Isso acontecerá mesmo se o usuário não tiver uma guia aberta no
próprio site. Somente o service worker será despertado. Você solicita permissão para fazer isso
em uma página, e o usuário será notificado.

**Ideal para:** conteúdo relacionado a uma notificação, como uma mensagem de
bate-papo, uma notícia recente ou um e-mail. Também se aplica a conteúdo com poucas
mudanças que se beneficie com uma sincronização imediata, como uma atualização de lista de tarefas
ou uma alteração de calendário.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O resultado final comum é uma notificação que, quando tocada,
abre/foca uma página relevante. No entanto, a atualização dos caches antes que isso aconteça é
_extremamente_ importante. Obviamente, o usuário está on-line no momento de receber a
mensagem push, mas poderá não estar quando finalmente interagir com a
notificação. Portanto, é importante disponibilizar esse conteúdo off-line. O aplicativo nativo do
Twitter, que em sua maior parte é um exemplo excelente de
aplicativo voltado ao modo off-line, não aplicou isso corretamente.

Sem uma conexão, o Twitter falha ao fornecer o conteúdo relacionado à
mensagem push. O toque na mensagem não remove a notificação. No entanto, o
usuário fica com menos informações que antes do toque. Não faça isso!

<div style="clear:both;"></div>

Este código atualiza os caches antes de mostrar uma notificação:

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### Na sincronização em segundo plano {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

A [sincronização em segundo plano](/web/updates/2015/12/background-sync)
é outro recurso baseado no
service worker. Ela permite solicitar a sincronização de dados em segundo plano
uma única vez ou em determinados intervalos (extremamente heurísticos). Isso acontecerá mesmo
se o usuário não tiver uma guia aberta no site. Somente o service worker
será despertado. Você solicita permissão para fazer isso em uma página e o usuário será
notificado.

**Ideal para:** atualizações não urgentes, particularmente as que ocorrem com alguma regularidade,
fazendo com que uma mensagem push por atualização seja muito frequente, como linhas do tempo
de redes sociais ou notícias.

    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## Persistência do cache {: #cache-persistence }

Sua origem recebe uma determinada quantidade de espaço livre para usar como achar melhor.
Esse espaço livre é compartilhado entre todos os armazenamentos de origem: LocalStorage,
IndexedDB, Filesystem e, claro, Caches.

A quantidade recebida não é especificada. Ela será diferente em função do dispositivo e
das condições do armazenamento. Você pode descobrir quanto você recebeu por meio de:

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

No entanto, como todo o armazenamento do navegador, esse tem liberdade de descartá-lo
se o dispositivo ficar com pouco armazenamento disponível. O navegador
não consegue distinguir entre os filmes que você quer manter a qualquer custo
e o jogo com o qual você não se preocupa muito.

Para contornar isso, há uma proposta de API,
[`requestPersistent`](https://storage.spec.whatwg.org/){: .external }:

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

Naturalmente, o usuário precisa conceder a permissão. Tornar os usuários parte desse
fluxo é importante, já que agora podemos esperar que eles estejam no controle da remoção.
Se o dispositivo do usuário estiver sob pressão e limpar os dados não essenciais
não resolver, ele poderá determinar que itens
deve manter ou remover.

Para que isso funcione, é necessário que os sistemas operacionais tratem origens "duráveis"
como o equivalente a aplicativos nativos no detalhamento do uso de armazenamento, em
vez de relatar o navegador como um único item.


## Sugestões de entrega – responder solicitações {: #serving-suggestions }

Não importa a quantidade de armazenamento em cache, o service worker não usará esse
cache a menos que você informe quando e como fazer isso. Veja a seguir alguns padrões
para processar solicitações:

### Somente cache {: #cache-only }

<img src="images/ss-cache-only.png">

**Ideal para:** tudo que você considere estático para essa "versão" do site.
Você deve ter armazenado em cache esses itens no evento de instalação. Portanto, pode confiar que
eles estarão lá.

    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

… embora você nem sempre precise processar esse caso especificamente,
[Cache, fallback para rede](#cache-falling-back-to-network) fará isso.

### Somente rede {: #network-only }

<img src="images/ss-network-only.png">

**Ideal para:** itens que não tenham equivalente off-line, como pings
de análises, solicitações diferentes de GET.

    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

… embora você nem sempre precise processar esse caso especificamente,
[Cache, fallback para rede](#cache-falling-back-to-network) fará isso.

### Cache, fallback para rede {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**Ideal para:** se estiver criando um aplicativo voltado ao modo off-line, é assim que você processará
a maioria das solicitações. Outros padrões serão exceções, de acordo com a
solicitação recebida.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

Com isso, você terá o comportamento "somente cache" para os itens do cache e o
comportamento "somente rede" para qualquer item não armazenado em cache (incluindo todas as solicitações diferentes de
GET, porque elas não podem ser armazenadas em cache).

### Corrida entre cache e rede {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**Ideal para:** recursos pequenos quando você procura desempenho em dispositivos com
acesso a disco lento.

Em algumas combinações de discos rígidos mais antigos, antivírus e conexões mais rápidas
com a Internet, buscar recursos de rede poderá ser mais rápido que
acessar o disco. No entanto, acessar a rede quando o usuário tem o conteúdo
no dispositivo pode ser um desperdício de dados. Portanto, considere isso.

    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling. Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### Rede com fallback para cache {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**Ideal para:** uma solução rápida para recursos com atualização frequente, fora
da "versão" do site. Por exemplo, artigos, avatares, linhas do tempo de mídia social,
placares de jogos.

Isso significa que você oferece aos usuários on-line o conteúdo mais atualizado, mas os usuários
off-line recebem uma versão anterior armazenada em cache. Se a solicitação de rede for bem-sucedida, você
poderá [atualizar a entrada no cache](#on-network-response).

No entanto, esse método tem falhas. Um usuário com conexão intermitente ou
lenta terá de esperar por uma falha de rede até receber o conteúdo perfeitamente
aceitável que já está no dispositivo. Isso pode
demorar muito e ser uma experiência do usuário frustrante. Veja o próximo
padrão, [Cache, depois rede](#cache-then-network) para uma solução melhor.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### Cache, depois rede {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**Ideal para:** conteúdo com atualizações frequentes. Por exemplo, artigos, linhas do tempo
de mídia social, placares de jogos.

Isso exige que a página faça duas solicitações, uma para o cache, outra para a
rede. A ideia é mostrar antes o conteúdo armazenado em cache e depois atualizar a página
quando/se os dados da rede chegarem.

Às vezes, você pode simplesmente substituir os dados atuais quando novos dados chegarem
(por exemplo placares de jogos), mas isso pode ser prejudicial com conteúdos
maiores. Basicamente, não "suma" com algo que o usuário pode estar lendo ou
com o que pode estar interagindo.

O Twitter adiciona o novo conteúdo sobre o conteúdo anterior e ajusta a posição de
rolagem para que o usuário não seja interrompido. Isso é possível porque o Twitter mantém
na maioria das vezes uma ordem basicamente linear do conteúdo. Copiei esse padrão para o
[trained-to-thrill][ttt] a fim de colocar o conteúdo na tela com a maior rapidez
possível, sem deixar de exibir conteúdo atualizado quando recebido.

**Código na página:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage(data);
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**Código no Service Worker:**

Voltamos sempre à rede e atualizamos o cache durante o processamento.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });


Em [trained-to-thrill][ttt], contornei essa situação
usando [XHR em vez de fetch](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3)
e abusando do cabeçalho de Accept para informar o service worker onde buscar o
resultado ([código da página](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70),
[código do service worker](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)).

### Fallback genérico {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

Se ocorrer uma falha na disponibilização de algum item do cache e/ou da rede, você poderá
oferecer um fallback genérico.

**Ideal para:** imagens secundárias como avatares, falha em solicitações POST,
página "Não disponível em modo off-line".

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

O item para o qual você fizer fallback será provavelmente uma [dependência de instalação](#on-install-as-dependency).

Caso sua página esteja enviando um e-mail, o service worker poderá fazer fallback para
armazenar o e-mail em uma "caixa de saída" do IDB e responder informando a página que
o envio falhou, mas os dados foram retidos.

### Modelos do service worker {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**Ideal para:** páginas que não podem armazenar em cache a resposta do servidor.

[A renderização de páginas no servidor acelera tudo](https://jakearchibald.com/2013/progressive-enhancement-is-faster/),
mas isso pode significar a inclusão de dados de estado que podem não fazer sentido em um cache
como, por exemplo, "Login efetuado como...". Se sua página for controlada por um service worker,
em vez disso, opte por solicitar dados JSON juntamente com um modelo
e renderizá-los.

    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request.url);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## Como tudo funciona em conjunto

Não é necessário escolher um desses métodos. Você provavelmente usará diversos
deles, dependendo do URL da solicitação. Por exemplo,
[trained-to-thrill][ttt] usa:

* [Cache na instalação](#on-install-as-dependency), para IU e comportamento estático
* [Cache na resposta de rede](#on-network-response), para as imagens e os dados do Flickr
* [Busca do cache, de volta à rede](#cache-falling-back-to-network), para a maioria das solicitações
* [Busca do cache, depois da rede](#cache-then-network), para os resultados de pesquisa do Flickr

Basta examinar a solicitação e escolher o que fazer:

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

... você sabe.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

### Créditos {: hide-from-toc }
… pelos belos ícones:

* [Código](http://thenounproject.com/term/code/17547/){: .external } por buzzyrobot
* [Agenda](http://thenounproject.com/term/calendar/4672/){: .external } por Scott Lewis
* [Rede por](http://thenounproject.com/term/network/12676/){: .external } Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/) por Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external } por iconsmind.com
* [Lixo](http://thenounproject.com/term/trash/20538/){: .external } por trasnik
* [Notificação](http://thenounproject.com/term/notification/32514/){: .external } por @daosme
* [Layout](http://thenounproject.com/term/layout/36872/){: .external } por Mister Pixel
* [Nuvem](http://thenounproject.com/term/cloud/2788/){: .external } por P.J. Onori

Agradeço a [Jeff Posnick](https://twitter.com/jeffposnick) por detectar vários erros lamentáveis
antes que eu clicasse em "Publicar".

### Leia mais
* [Service workers – uma introdução][sw_primer]
* [O service worker está pronto?][is_sw_ready] – rastreie o status de implementação entre os principais navegadores
* [Promessas do JavaScript – uma introdução](/web/fundamentals/getting-started/primers/promises) – guia para as promessas


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
