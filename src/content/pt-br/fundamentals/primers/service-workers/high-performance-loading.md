project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Certifique-se de receber o melhor desempenho com a implementação do service worker.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Carregamento de alto desempenho do service worker {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Adicionar um [service
worker](/web/fundamentals/getting-started/primers/service-workers) ao seu app
da Web pode oferecer benefícios de desempenho significativos, indo além do que é possível,
mesmo seguindo todas as [práticas
recomendadas tradicionais de armazenamento em cache do navegador](/web/fundamentals/performance/optimizing-content-efficiency/http-caching).
Mas há algumas práticas recomendadas a serem seguidas para otimizar seus tempos de
carregamento. As dicas a seguir garantem que você receba o melhor desempenho com
a implementação do service worker.

## Em primeiro lugar, o que são solicitações de navegação?

As solicitações de navegação são (sucintamente) definidas em [Especificações
de busca](https://fetch.spec.whatwg.org/#navigation-request) como: <em>Uma
[solicitação de navegação](https://fetch.spec.whatwg.org/#concept-request) é uma
solicitação cujo
[destino](https://fetch.spec.whatwg.org/#concept-request-destination) é
"<code>document</code>".</em> Embora tecnicamente essa definição esteja correta, ela não dispõe de
nuances e desvaloriza a importância das navegações no desempenho
do app da Web. Coloquialmente, uma solicitação de navegação assume sempre que você insere um
URL na barra de localização do seu navegador, interage com
<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code>
ou visita o link de uma página da Web para outra. Colocar um `<iframe>`
em uma página também levará a uma solicitação de navegação para o `src` do `<iframe>`.

Note: [aplicativos de uma única página](https://en.wikipedia.org/wiki/Single-page_application)
que confiam na [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
e em modificações DOM adotadas tendem a evitar as solicitações de navegação ao trocar
de uma visualização para outra. Mas a solicitação inicial em uma sessão do navegador para o app
de uma única página ainda é uma navegação.

Embora seu app da Web possa fazer muitas outras [solicitações de
sub-recursos](https://fetch.spec.whatwg.org/#subresource-request) para
exibir todos os seus conteúdos (para elementos como scripts, imagens ou estilos) é o
HTML na resposta de navegação que é responsável por iniciar todas as outras
solicitações. Qualquer atraso na resposta à solicitação de navegação inicial será
extremamente aparentes para os usuários, porque eles ficarão encarando a tela em branco por
tempo indeterminado.

Note: o [push do servidor HTTP/2](/web/fundamentals/performance/http2/#server_push)
adiciona uma prega aqui, já que permite que as respostas de sub-recurso sejam retornadas sem
latência adicional, junto com a resposta de navegação. Mas qualquer demora no
estabelecimento de conexão com o servidor remoto também levará a atrasos nos
dados enviados ao cliente.

As [práticas
recomendadas de armazenamento em cache](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page),
do tipo que depende de cabeçalhos HTTP `Cache-Control` e não de um service worker,
exigem [que cada
navegação acesse a rede](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses)
para garantir que todos os URLs de sub-recursos estejam atualizados. O ideal para o desempenho da
Web é conseguir todos os benefícios de sub-recursos armazenados em cache de modo agressivo,
*sem* exigir uma solicitação de navegação que seja dependente da rede. Com um
service worker devidamente configurado personalizado para a arquitetura
específica do site, que agora é possível.

## Ignorar a rede para navegações a fim de conseguir o melhor desempenho

O maior impacto da adição de um service worker ao seu aplicativo da Web vem da resposta
às solicitações de navegação sem ter que esperar a rede. O
melhor cenário para se conectar a um servidor Web provavelmente é receber ordens de
magnitude maior do que seria necessário para ler os dados armazenados em cache localmente. Nos cenários em que
uma conexão do cliente seja inferior à ideal, ou seja, basicamente qualquer coisa em uma rede
móvel, o tempo levado para conseguir o primeiro byte de dados da
rede pode ultrapassar com muita facilidade o tempo total que seria levado para renderizar o HTML
completo.

Escolher a implementação do service worker certa voltada primeiramente ao armazenamento em cache depende muito da
arquitetura do seu site.

### Streaming de respostas compostas

Caso seu HTML possa ser naturalmente dividido em partes menores, com um cabeçalho estático
e rodapé junto com uma porção mediana que varia de acordo com o URL de solicitação,
o ideal será gerenciar as navegações usando uma resposta transmitida por streaming. É possível compor
a resposta a partir de partes individuais armazenadas em cache separadamente. Usar os
streams garante que a parte inicial da resposta seja exposta ao
cliente o mais rápido possível, oferecendo uma vantagem na análise do HTML e
fazendo solicitações adicionais de sub-recursos.

O artigo “[Streaming para receber respostas imediatas](/web/updates/2016/06/sw-readablestreams)"
oferece uma visão geral básica dessa abordagem, mas para exemplos
e demonstrações do mundo real, o artigo "[2016 – o ano dos streams da Web](https://jakearchibald.com/2016/streams-ftw/)"
de Jake Archibald é o guia mais completo.

Note: para alguns apps da Web, não há como evitar a rede ao responder a
uma solicitação de navegação. É possível que o HTML para cada URL no seu site dependa de dados
de um sistema de gerenciamento de conteúdo. Ou talvez seu site use diversos layouts e
não se ajuste a uma estrutura shell genérica de aplicativos. Os service workers ainda
abrem o caminho para melhorias no *status quo* do carregamento do seu HTML.
Ao usar streams, é possível responder às solicitações de navegação imediatamente com uma parte
comum e armazenada em cache de HTML, talvez o `<head>` completo do seu site e alguns elementos iniciais de
`<body>`, enquanto o resto do HTML ainda é carregado, específico para determinado
URL, da rede.

### Armazenamento em cache de HTML estático

Se tiver um app da Web simples que dependa inteiramente de um conjunto de documentos estáticos de
HTML, então você está com sorte: seu caminho para evitar a rede é
simples. Você precisa de um service worker que responda às navegações com o
HTML previamente armazenado em cache e que inclua lógica não bloqueante para manter
esse HTML atualizado conforme seu site evolui.

Uma possível abordagem é usar um gerenciador de `fetch` de service worker que implemente uma
[política obsoleta enquanto revalida](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
para solicitações de navegação, assim:

```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

Outra abordagem é usar uma ferramenta como [Workbox](https://workboxjs.org/), que
se prende ao processo de versão do seu app da Web para gerar um service worker que
gerencie o armazenamento em cache de todos os seus recursos estáticos (não apenas de documentos HTML), disponibilizando
o armazenamento em cache em primeiro lugar e mantendo-os atualizados.

### Usar um shell de aplicativos

Se você tiver um aplicativo de página única, então
[a arquitetura shell do aplicativo](/web/fundamentals/architecture/app-shell)
será simples de implementar. Há uma estratégia muito clara para gerenciar
as solicitações de navegação sem depender da rede: cada solicitação de navegação,
independentemente do URL específico, é realizada com uma cópia armazenada em cache de um
"shell" genérico de um documento HTML. O shell inclui tudo o que é necessário para fazer a configuração de bootstrap
do aplicativo de página única, e a lógica de roteamento do cliente pode renderizar o
conteúdo específico para o URL do cliente.

Escrito a mão, o gerenciador de `fetch` do service worker correspondente deve ficar
mais ou menos assim:

```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

O [Workbox](https://workboxjs.org/) também pode ajudar, garantindo que
`app-shell.html` esteja armazenado em cache e atualizado, bem como fornecendo
[auxiliares](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)
para responder às solicitações de navegação com shell armazenado em cache.

## ⚠️ Pegadinhas de desempenho

Se não conseguir responder às navegações usando os dados armazenados em cache, mas precisar de um service
worker para outra funcionalidade, como fornecer
[conteúdo de feedback off-line](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback),
ou [gerenciar notificações push](/web/fundamentals/getting-started/codelabs/push-notifications/),
você estará em maus lençóis. Caso não tome precauções, você
pode acabar perdendo desempenho ao adicionar seu service worker.
Mas enquanto mantiver distância dessas pegadinhas, ficará tudo bem.

### Nunca usar um gerenciador de busca “passthrough”

Se estiver usando um service worker apenas para as notificações push, você pode pensar
erroneamente que as ações a seguir são necessárias ou que serão tratadas
como no-op:

```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

Esse tipo de gerenciador de busca “passthrough” é insidioso, já que tudo
continuará a funcionar no seu aplicativo da Web, mas você acabará introduzindo uma pequena queda de
latência sempre que uma solicitação de rede for feita. Há uma sobrecarga envolvida na
inicialização de um service worker se ele já não estiver em execução. Há também uma
sobrecarga na transmissão de resposta do service worker para o cliente que fez
a solicitação.

Caso seu service worker não tenha um gerenciador de `fetch`, alguns navegadores
farão observações sobre isso e [não inicializarão o service
worker](https://github.com/w3c/ServiceWorker/issues/718) sempre que houver uma
solicitação de rede.

### Usar o pré-carregamento de navegação quando apropriado

Em alguns cenários, você *precisa* de um `fetch` gerenciador para usar uma estratégia de
armazenamento em cache para certos sub-recursos, mas sua arquitetura não possibilita
responder às solicitações de navegação. Como opção, você pode
usar dados armazenados em cache na sua resposta à navegação. Mesmo assim, faça uma
solicitação de rede para que os dados novos apareçam quando a página for carregada.

Um recurso conhecido como
[Pré-carregamento de recurso](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)
é relevante para ambos os casos de uso. Ele pode mitigar os atrasos que um
service worker que não tenha respondido às navegações pode introduzir de outra forma. Ele
também pode ser usado para solicitações "out of band" de dados novos que podem ser
usados pelo código do cliente depois de a página ter carregado. O artigo
“[Acelerar o service worker com pré-carregamentos de navegação](/web/updates/2017/02/navigation-preload)“
tem todos os detalhes necessários para configurar o service worker
adequadamente.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
