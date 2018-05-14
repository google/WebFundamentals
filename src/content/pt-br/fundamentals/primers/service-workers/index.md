project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Experiências off-line avançadas, sincronizações periódicas em segundo plano, notificações push&mdash; funcionalidades que normalmente exigem um aplicativo nativo&mdash; estão chegando à Web. Os service workers oferecem a base técnica necessária para todos esses recursos.

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2016-01-18 #}

# Service Workers: uma Introdução {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

Experiências off-line avançadas, sincronizações periódicas em segundo plano, notificações
push&mdash; funcionalidades que normalmente exigem um aplicativo
nativo&mdash; estão chegando à Web. Os service workers oferecem a base técnica
necessária para todos esses recursos.

## O que é um Service Worker

Um service worker é um script que seu navegador executa em segundo plano,
separado da página da Web, possibilitando recursos que não precisam de uma página
da Web ou de interação do usuário. Atualmente, os service workers já incluem recursos como 
[notificações push](/web/updates/2015/03/push-notifications-on-the-open-web) 
e [sincronização em segundo plano](/web/updates/2015/12/background-sync). No futuro, os 
service workers permitirão outras ações como sincronização periódica ou geolocalização.
O principal recurso discutido neste tutorial é a capacidade de interceptar e 
tratar solicitações de rede, incluindo o gerenciamento programático de um cache de 
respostas.

Essa API é muito interessante porque permite experiências
off-line, oferecendo aos desenvolvedores controle total sobre a
experiência.

Antes do service worker, havia outra API que proporcionava aos usuários uma experiência
off-line na Web, denominada [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }.
Os principais problemas com AppCache são o [número de armadilhas](http://alistapart.com/article/application-cache-is-a-douchebag) 
que existem, bem como o fato de que enquanto o design funciona particularmente bem para apps da 
Web de uma única página, ele não é tão bom em sites de várias páginas. Os service workers forma projetados para 
eliminar esses pontos negativos comuns.

Características importantes de um service worker:

* É um [JavaScript Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external }.
  Portanto, não consegue acessar o DOM diretamente. Em vez disso, um service worker pode 
  se comunicar com as páginas que controla respondendo a mensagens enviadas pela 
  interface [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage).
  Essas páginas podem manipular o DOM, se necessário.
* O service worker é um proxy de rede programável, permitindo controlar como 
  as solicitações de rede da página são tratadas.
* Ele é encerrado quando ocioso e reiniciado quando necessário novamente. 
  Isso significa que não se pode confiar no estado global dentro dos gerenciadores `onfetch` 
  e `onmessage` de um service worker. Para informações que devem ser persistidas e 
  reutilizadas entre reinícios, os service workers podem acessar a 
  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
* Os service workers fazem uso intensivo de promessas. Se você não está familiarizado com promessas, 
  interrompa esta leitura e confira 
  [Promessas, uma Introdução](/web/fundamentals/getting-started/primers/promises).

## O ciclo de vida do service worker

Um service worker tem um ciclo de vida totalmente separado da página da Web.

Para instalar um service worker no site, é necessário registrá-lo, o que pode ser feito
no JavaScript da página. O registro de um service worker faz com que o navegador
inicie a etapa de instalação do service worker em segundo plano.

Durante a etapa de instalação, normalmente alguns ativos estáticos são armazenados em cache. Se
todos os arquivos forem armazenados em cache corretamente, o service worker
estará instalado. Se houver falha no download e no armazenamento em cache de qualquer arquivo, a etapa de
instalação falhará e o service worker não será ativado (ou seja, não será instalado). Se
isso ocorre, não se preocupe. Haverá uma nova tentativa na próxima vez. Mas isso significa que, se instalado,
 você sabe que os ativos estáticos estão no cache.

Após a instalação, a próxima etapa é a ativação e é uma ótima
oportunidade para lidar com o gerenciamento de caches antigos, o que veremos na
seção de atualização do service worker.

Depois da etapa de ativação, o service worker controlará todas as páginas dentro
de seu escopo, embora a página que registrou o service worker pela
primeira vez não será controlada até ser carregada novamente. Quando o service worker
assumir o controle, estará em um de dois estados: encerrado, para economizar
memória, ou tratando eventos de recuperação e mensagem gerados pela página
quando faz uma solicitação ou mensagem de rede.

Veja a seguir uma versão muito simplificada do ciclo de vida do service worker em sua
primeira instalação.

![ciclo de vida do service worker](imgs/sw-lifecycle.png)


## Pré-requisitos

### Compatibilidade de navegadores

O número de opções de navegador está crescendo. Service workers são compatíveis com Firefox e
Opera. O Microsoft Edge já está 
[demonstrando suporte público](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/).
Até mesmo o Safari já divulgou [alguns sinais sobre o desenvolvimento futuro](https://trac.webkit.org/wiki/FiveYearPlanFall2015).
Você pode acompanhar o andamento de todos os navegadores no site 
[is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/) {: .external }
de Archibald.

### Você precisa de HTTPS

Durante o desenvolvimento, você poderá usar service workers por meio do `localhost`. No
entanto, para implantá-lo em um site, será necessário ter o HTTPS instalado no servidor.

O uso de um service worker permite sequestrar conexões, bem como fabricar e filtrar
respostas. É uma ferramenta muito poderosa. Você pode usar esses recursos por um bom motivo, mas um
intermediário não autorizado pode querer fazer algo diferente. Para evitar que isso aconteça, só é possível registrar service
workers em páginas servidas usando HTTPS. Assim, sabemos que o service worker recebido pelo
navegador não foi adulterado durante sua jornada pela rede.

As [páginas do Github](https://pages.github.com/){: .external } são servidas usando HTTPS. Portanto, são
um local perfeito para hospedar demonstrações.

Se você quiser adicionar HTTPS ao servidor, será necessário obter um 
certificado TLS e configurá-lo no servidor. Esse processo varia de acordo com a configuração. 
Portanto, verifique a documentação do servidor e não deixe de conferir o 
[gerador de configurações SSL do Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/) 
para obter as práticas recomendadas.

## Registrar um Service Worker

Para instalar um service worker, você precisa iniciar o processo 
**registrando-o** em sua página. Isso informa ao navegador onde reside
o arquivo JavaScript do service worker.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

Este código verifica a disponibilidade da API de service worker. Se disponível,
o service worker em `/sw.js` é registrado
[quando a página está carregada](/web/fundamentals/instant-and-offline/service-worker/registration).

Você pode chamar `register()` todas as vezes que uma página é carregada, sem se preocupar com isso. O navegador
saberá se o service worker já está registrado ou não e se comportará
adequadamente.

Um ponto sutil do método `register()` é a localização do arquivo do
service worker. Neste caso, você notará que o arquivo do service worker está na raiz do
domínio. Isso significa que o escopo do service worker será a origem
completa. Em outras palavras, este service worker receberá eventos `fetch` para
tudo nesse domínio. Se registrarmos o arquivo do service worker em
`/example/sw.js`, ele verá apenas os eventos `fetch` das páginas
com URL iniciando com `/example/` (ou seja, `/example/page1/`, `/example/page2/`).

Agora, você já pode verificar se o service worker está ativado acessando `chrome://inspect
/#service-workers` e procurando o seu site.

![Inspecionar service workers](imgs/sw-chrome-inspect.png)

Na primeira implementação dos service workers, também era possível ver seus detalhes
por meio de `chrome://serviceworker-internals`. Isso ainda pode ser
útil, pelo menos para compreender o ciclo de vida dos service
workers, mas não se surpreenda se esse recurso for substituído totalmente por
`chrome://inspect/#service-workers` posteriormente.

Pode ser útil testar o service worker em uma janela anônima,
permitindo que você feche e abra janelas novamente sabendo que o service worker anterior não
afetará a nova janela. Todos os registros e caches criados em uma
janela anônima são eliminados quando a janela é fechada.


## Instalar um service worker

Depois que uma página controlada inicia o processo de registro, vamos mudar para o
ponto de vista do script do service worker, que trata o evento `install`.

No exemplo mais básico, é necessário definir um retorno de chamada para o evento de instalação
e decidir os arquivos que serão armazenados no cache.

    self.addEventListener('install', function(event) {
      // Perform install steps
    });


Dentro do nosso retorno de chamada do `install`, precisamos executar as etapas a seguir:

1. Abra um cache.
2. Armazene os arquivos em cache.
3. Confirme se todos os ativos necessários estão armazenados no cache.

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


Aqui podemos ver que chamamos `caches.open()` com o nome do cache desejado e depois
`cache.addAll()`, passando nossa matriz de arquivos. Essa matriz é uma cadeia de 
promessas (`caches.open()` e `cache.addAll()`). O método `event.waitUntil()`
recebe uma promessa e a usa para saber o tempo de instalação e se foi
a instalação bem-sucedida.

Se todos os arquivos forem armazenados no cache corretamente, o service worker estará
instalado. Se o download de **qualquer** dos arquivos falhar, a etapa de instalação também
falhará. Isso permite confiar na disponibilidade de todos os ativos definidos, mas também
significa que você precisa ser cuidadoso com a lista de arquivos que quer armazenar em cache na
etapa de instalação. Se a lista de arquivos for longa, aumentará a chance de falha
no armazenamento em cache de um dos arquivos, impedindo a instalação do
service worker.

Esse é apenas um exemplo. Você pode executar outras tarefas no evento `install` ou
até evitar configurar um evento `install`.

## Cache e solicitações de retorno

Agora que instalou um service worker, você provavelmente quer 
  retornar uma das respostas armazenadas em cache, certo?

Depois que um service worker é instalado e o usuário navega para uma página diferente
ou atualiza a página, o service worker começa a receber eventos `fetch`. Veja um exemplo
a seguir.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });


Aqui, definimos nosso evento `fetch` e, em `event.respondWith()`, 
passamos uma promessa de `caches.match()`. Esse método examina a solicitação e
encontra todos os resultados armazenados em qualquer um dos caches criados pelo service worker.

Se tivermos uma resposta correspondente, retornaremos o valor do cache. Caso contrário, retornaremos
o resultado de uma chamada para `fetch`, que criará uma solicitação de rede e retornará
os dados se algo for recuperado da rede. Esse é um exemplo simples
e usa todos os ativos armazenados em cache durante a etapa da instalação.

Se quisermos armazenar novas solicitações em cache de forma cumulativa, poderemos fazê-lo tratando a
resposta da solicitação de recuperação e adicionando-a ao cache, como mostrado a seguir.


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


O que estamos fazendo é:

1. Adicionar um retorno de chamada a `.then()` na solicitação `fetch`.
2. Após obter uma resposta, executar as seguintes verificações:

   1. Verificar se a resposta é válida.
   2. Verificar se o status da resposta é `200`.
   3. Verificar se o tipo de resposta é **basic**, o que indica que é uma 
      solicitação de nossa origem. Isso significa que solicitações de ativos de terceiros 
      não são armazenadas no cache.
3. Se todas as verificações forem bem-sucedidas, [clonaremos](https://fetch.spec.whatwg.org/#dom-response-clone) 
   a resposta. O motivo para isso é que, como a resposta é um 
   [Stream](https://streams.spec.whatwg.org/){: .external }, o corpo poderá ser consumido apenas 
   uma vez. Como queremos retornar a resposta para uso pelo navegador, bem como 
   passá-la para uso pelo cache, precisamos cloná-la para podermos enviá-la ao 
   navegador e ao cache.

## Atualizar um Service Worker {: #update-a-service-worker }

Em um determinado momento, será necessário atualizar 
o service worker. Quando isso ocorrer, siga estas etapas:

1. Atualize o arquivo JavaScript do service worker. Quando o usuário navegar para
   o site, o navegador tentará baixar novamente o arquivo de script que definiu o
   service worker em segundo plano. Mesmo que apenas um byte seja diferente entre 
   o arquivo do service worker e a versão carregada no momento, o navegador considerará que há um 
   _novo_ service worker.
2. O novo service worker será iniciado e o evento `install` será acionado.
3. Nesse momento, o service worker anterior ainda estará controlando as páginas atuais. 
   Portanto, o novo service worker entrará em um estado `waiting`.
4. Quando as páginas do site abertas nesse momento forem fechadas, o service worker 
   anterior será finalizado e o novo assumirá o controle.
5. Quando o novo service worker assumir o controle, o evento `activate` 
   será acionado.

Uma tarefa comum que ocorre no retorno de chamada `activate` é o gerenciamento do cache.
O motivo para fazer isso no retorno de chamada `activate` é que, se for
necessário apagar caches antigos na etapa de instalação, eventuais service workers antigos,
que controlam todas as páginas atuais, não poderão mais
servir arquivos usando esses caches.

Vamos supor que temos um cache chamado `'my-site-cache-v1'` e decidimos
dividi-lo em um cache para páginas e outro para postagem do blog.
Isso significa que a etapa de instalação criará dois caches, `'pages-cache-v1'` e
`'blog-posts-cache-v1'` e a etapa de ativação excluirá o cache antigo
`'my-site-cache-v1'`.

O código a seguir faz isso em loop que percorre todos os caches do
service worker, excluindo os que não estão definidos na lista de permissões
do cache.


    self.addEventListener('activate', function(event) {

      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## Problemas e pontos a melhorar

Esses recursos são realmente novos. Veja a seguir uma relação de problemas que 
pode atrapalhar o uso desses recursos. Esperamos que esta seção seja excluída em breve. Por enquanto, 
é bom considerar os problemas a seguir.


### Se uma instalação falhar, ainda não fornecemos informações suficientes sobre a falha

Se um worker for registrado, mas não aparecer em `chrome://inspect/#service-workers` 
ou `chrome://serviceworker-internals`, é provável que tenha ocorrido uma falha na 
instalação devido a um erro ou a uma promessa rejeitada passada para
`event.waitUntil()`.

Para contornar esse problema, acesse `chrome://serviceworker-internals`, marque a opção "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging", e coloque uma instrução de depurador no início do evento de instalação.
Essa modificação, juntamente com <a href="/web/tools/chrome-devtools/javascript/add-breakpoints#exceptions">Pausar em exceções não detectadas</a>,
deve revelar o problema.


### Os padrões de fetch()

#### Por padrão, sem credenciais

Quando você usa o `fetch`, por padrão, a solicitação não terá credenciais, como 
cookies. Em vez disso, se você quiser credenciais, chame:

    fetch(url, {
      credentials: 'include'
    })


Esse comportamento é intencional e é provavelmente melhor que o padrão mais complexo do
XHR, que é enviar credenciais se o URL for da mesma origem e, caso contrário,
omiti-las. O comportamento da recuperação é mais parecido com outras solicitações CORS, como `<img crossorigin>`, que nunca enviam cookies, a menos que você aceite usando `<img crossorigin="use-credentials">`.



#### Por padrão, falha sem CORS

Por padrão, a recuperação de um recurso de um URL de terceiros falhará se não for compatível
com CORS. Você pode adicionar uma opção `no-CORS` à solicitação para evitar a falha,
mas isso causará uma resposta "opaca", o que significa que você não saberá 
se a resposta foi bem-sucedida ou não.

    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### Tratar imagens responsivas

O atributo `srcset` do elemento `<picture>` seleciona o ativo de imagem
mais adequado em tempo de execução e faz uma solicitação de rede.

Para o service worker, há algumas opções caso seja necessário armazenar uma imagem em cache
durante a etapa de instalação:

1. Instale todas as imagens solicitadas pelo elemento `<picture>` e pelo atributo `srcset`.

2. Instale uma única versão da imagem em baixa resolução.
3. Instale uma única versão da imagem em alta resolução.

Na verdade, recomendamos a opção 2 ou 3 porque o download de todas as
imagens seria um desperdício de espaço de armazenamento.

Vamos supor que você escolha a versão de baixa resolução no momento da instalação, tente
recuperar imagens de maior resolução da rede quando a página for carregada e,
em caso de falha, faça o fallback para a versão de baixa resolução. Essa é uma opção refinada e
elegante, mas há um problema.

Se tivermos estas duas imagens:

| Densidade de tela | Largura | Altura |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

Em uma imagem `srcset`, teríamos uma marcação como esta:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


Se estivermos em uma tela 2x, o navegador optará pelo download de `image-2x.png`.
Se estivermos off-line, poderemos capturar essa solicitação com `.catch()` e retornar `image-src.png`
, se estiver no cache. No entanto, o navegador esperará uma imagem que
considere os pixels extras de uma tela 2x. Portanto, a imagem aparecerá como
200x200 pixels CSS em vez de 400x400 pixels CSS. A única forma de contornar isso é
definir uma altura e largura fixas na imagem.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


Para elementos `<picture>` usados para direção de arte, isso fica consideravelmente
mais difícil e depende em grande parte de como as imagens são criadas e usadas.
No entanto, pode ser possível usar uma abordagem similar para srcset.

## Saiba mais

Há uma lista de documentação sobre service workers mantida em 
[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html)
que pode ser útil.

## Receba ajuda

Se você não conseguir resolver um problema, publique suas dúvidas no Stackoverflow e use a tag 
'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' 
para que possamos acompanhar os problemas e tentarmos ajudar o máximo possível.


{# wf_devsite_translation #}
