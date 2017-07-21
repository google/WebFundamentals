project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uma análise detalhada do ciclo de vida dos service workers.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# O ciclo de vida do Service Worker {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

O ciclo de vida de um service worker é a parte mais complicada. Se você não
sabe o que ele está tentando fazer e quais são os benefícios que ele gera, pode parecer que ele atua
contra você. Mas, depois que se entende como ele funciona, pode-se fornecer atualizações fáceis
e discretas aos usuários, misturando o melhor da web com o melhor dos padrões nativos.

Essa é uma análise detalhada, mas os tópicos no início de cada seção abordam boa parte do
que você precisa saber.

## A intenção

A intenção do ciclo de vida é:

* Poder começar o desenvolvimento com base no off-line.
* Permitir que um novo service worker se prepare sem prejudicar o
  atual.
* Garantir que uma página de dentro do escopo seja totalmente controlada pelo mesmo service worker (ou por
  nenhum).
* Garantir que só haja uma versão do seu site sendo executada por vez.

Esse último ponto é muito importante. Sem os service workers, os usuários podem carregar
uma guia do seu site e depois abrir outra. Isso pode fazer com que haja duas versões do
seu site em execução ao mesmo tempo. Às vezes, não tem problema, mas se você lida com
armazenamento, pode facilmente terminar com duas abas tendo opiniões diferentes
sobre como gerenciar o armazenamento compartilhado. Isso pode gerar erros, ou
pior: perda de dados.

Warning: os usuários odeiam perda de dados. Eles ficam extremamente desapontados.

## O primeiro service worker

Resumindo:

* O evento `install` é o primeiro evento que um service worker recebe, e ele só
  acontece uma vez.
* Uma promessa passada a `installEvent.waitUntil()` sinaliza a duração e
  o êxito ou uma falha na instalação.
* Um service worker não receberá eventos como `fetch` e `push` até
  finalizar com sucesso a instalação e ficar "ativo".
* Por padrão, as buscas de uma página não passar por um service worker a menos que a solicitação
  da página tenha passado por um. Por isso, você precisaria atualizar a
  página para ver os efeitos do service worker.
* `clients.claim()` pode suspender esse padrão e assumir o controle de
  páginas não controladas.

<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Instalando</text><text y="6.7" x="81.1" class="label">Ativo</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Veja este HTML:

    <!DOCTYPE html>
    An image will appear here in 3 seconds:
    <script>
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.log('Boo!', err));

      setTimeout(() => {
        const img = new Image();
        img.src = '/dog.svg';
        document.body.appendChild(img);
      }, 3000);
    </script>

Ele registra um service worker e adiciona a imagem de um cachorro após 3 segundos.

Conheça o service worker registrado, `sw.js`:

    self.addEventListener('install', event => {
      console.log('V1 installing…');

      // cache a cat SVG
      event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
      );
    });

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the cat SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
      }
    });

Ele armazena uma imagem de um gato em cache e entrega-a sempre que há uma solicitação de
`/dog.svg`. Porém, se você [executar o exemplo
acima](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, verá um cachorro na primeira vez que carregar a página. Atualize e
você verá o gato.

Observação: gatos são melhores que cachorros. Porque *sim*.

### Escopo e controle

O escopo padrão do registro de um service worker é `./` em relação ao
URL do script. Isso significa que se você registrar um service worker em
`//example.com/foo/bar.js`, seu escopo padrão será `//example.com/foo/`.

Chamamos de páginas, workers e `clients` dos workers compartilhados. Seu service worker só
pode controlar clientes que estejam no escopo. Quando um cliente é "controlado", suas
buscas passam pelo service worker em escopo. Você pode detectar se um cliente é
controlado por `navigator.serviceWorker.controller`, que será "null" ou uma instância do
service worker.

### Baixar, analisar e executar

Seu primeiro service worker é baixado quando você chama `.register()`. Se o seu
script falhar em baixar, analisar ou acionar um erro na execução inicial,
a promessa de registro é rejeitada e o service worker é descartado.

O Chrome DevTools exibe o erro no console e na seção
dos service workers na guia "Application":

<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Erro exibido na guia Service Worker do DevTools">
</figure>

### Instalação

O primeiro evento que um service worker recebe é `install`. Esse evento é acionado assim que
o worker é executado e só é chamado uma vez por service worker. Se
você alterar o script do service worker, o navegador o considerará um service
worker diferente e ele receberá o próprio evento `install`. Falarei sobre [atualizações em detalhes
mais para a frente](#updates).

O evento `install` é a sua chance de armazenar em cache tudo de que precisa antes de poder
controlar clientes. A promessa que você passa a `event.waitUntil()` permite que o navegador
saiba quando a instalação acaba e se foi concluída com sucesso.

Se a promessa for rejeitada, significa que houve um erro na instalação, e o navegador descarta
o service worker. Ele nunca controlará clientes. Isso significa que podemos depender de
"cat.svg" estar presente no cache em nossos eventos `fetch`. É uma dependência.

### Ativação

Quando o service worker está pronto para controlar clientes e gerenciar eventos
funcionais como `push` e `sync`, você obterá um evento `activate`. Mas não
significa que a página que chamou `.register()` será controlada.

Na primeira vez em que você carregar [a
demonstração](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, muito embora `dog.svg` seja solicitado bem depois de o service worker
ser ativado, ele não gerenciará a solicitação e você ainda verá a imagem do
cachorro. O padrão é *consistência*. Se sua página carrega sem um service worker,
seus sub-recursos também carregarão dessa forma. Se você carregar [a
demonstração](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external} pela segunda vez (em outras palavras, atualizar a página), ela será controlada.
As duas páginas e as duas imagens passarão por eventos `fetch` e você verá um gato
dessa vez.

### clients.claim

Você pode assumir o controle de clientes não controlados chamando `clients.claim()` dentro
do service worker quando ele estiver ativo.

Veja uma [variação da demonstração
acima](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external}, em que `clients.claim()` é chamado no evento `activate`. Você *deve* ver
um gato na primeira vez. Digo *deve* porque, nesse caso, há uma condição de tempo. Você só
verá um gato se o service worker for ativado e `clients.claim()` entrar em vigor
antes de acontecer uma tentativa de carregamento da imagem.

Se você usar o service worker para carregar páginas de forma diferente de como elas são carregadas
pela rede, `clients.claim()` pode ser um problema, já que o service worker
acaba controlando alguns clientes que carregaram sem ele.

Observação: vejo muitas pessoas incluindo `clients.claim()` para todas as ocasiões, mas eu
raramente faço isso. Ele só é importante no primeiro carregamento e, devido ao
Progressive Enhancement, a página normalmente funciona muito bem sem um service
worker.

## Como atualizar o service worker {: #updates}

Resumindo:

* Uma atualização é acionada:
    * Na navegação, para uma página em escopo.
    * Em eventos funcionais como `push` e `sync`, a menos que tenha ocorrido uma
      verificação de atualização nas últimas 24 horas.
    * Na chamada de `.register()` *somente se* o URL do service worker tiver mudado.
* Os cabeçalhos de armazenamento em cache do script do service worker são respeitados (até 24
  horas) quando se busca atualizações. Vamos tornar esse comportamento opcional, já que
  ele deixa as pessoas em situação difícil. Você provavelmente quer `max-age` de 0 no script do seu
  service worker.
* Seu service worker é considerado atualizado se for diferente, em nível de byte, do que
  o navegador já tem (estamos ampliando isso para incluir scripts/módulos
  importados também).
* O service worker atualizado é inicializado junto com o que já existe e recebe
  seu próprio evento `install`.
* Se o novo worker tiver um código de status diferente de "ok" (por exemplo, 404), falhar em analisar, acionar
  um erro durante a execução ou for rejeitado durante a instalação, ele será descartado,
  mas o atual continua ativo.
* Depois de instalado com sucesso, o worker atualizado espera (`wait`) até que o worker
  existente não esteja controlando nenhum cliente (observe que os clientes se sobrepõe durante uma
  atualização).
* `self.skipWaiting()` evita a espera, o que significa que o service worker
  é ativado assim que a instalação é concluída.

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Instalando</text><text y="6.7" x="81.1" class="label">Ativo</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">Aguardando</text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Digamos que tenhamos alterado o script do nosso service worker para responder a uma imagem de
um cavalo em vez de a de um gato:

    const expectedCaches = ['static-v2'];

    self.addEventListener('install', event => {
      console.log('V2 installing…');

      // cache a horse SVG into a new cache, static-v2
      event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.svg'))
      );
    });

    self.addEventListener('activate', event => {
      // delete any caches that aren't in expectedCaches
      // which will get rid of static-v1
      event.waitUntil(
        caches.keys().then(keys => Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )).then(() => {
          console.log('V2 now ready to handle fetches!');
        })
      );
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the horse SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
      }
    });

Observação: não tenho uma opinião relevante sobre os cavalos.

[Dê uma olhada em uma demonstração do
mencionado acima](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}. Você ainda verá a imagem de um gato. Veja por que...

### Instalação

Veja que eu mudei o nome do cache de `static-v1` para `static-v2`. Isso
significa que posso configurar o novo cache sem apagar nada no primeiro,
que o service worker antigo ainda está usando.

Esse padrão cria caches específicos de cada versão, o que se parece com como um aplicativo nativo
agruparia ativos em seu executável. Você também pode ter caches que não sejam específicos
de versão, como `avatars`.

### Aguardando

Depois de instalado com sucesso, o service worker atualizado atrasa a ativação
até que o service worker existente não esteja mais controlando nenhum cliente. Esse estado
é chamado de "espera" e é como o navegador garante que somente uma versão do
seu service worker fique em execução por vez.

Se você executou [a demonstração
atualizada](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, deve continuar vendo a imagem de um gato, porque o worker versão 2
ainda não foi ativado. É possível ver o novo service worker aguardando na
guia "Application" do DevTools:

<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools exibindo o novo service worker esperando">
</figure>

Mesmo que você só tenha uma guia aberta para a demonstração, atualizar a página não é suficiente
para permitir que a nova versão assuma. Isso acontece por causa da forma com que as navegações nos navegadores funcionam.
Quando você navega, a página atual não é descartada até que os cabeçalhos de resposta
sejam recebidos, e mesmo assim, se a resposta tiver um
cabeçalho `Content-Disposition`, a página atual pode continuar lá. Por causa dessa sobreposição, o service worker atual
está sempre controlando um cliente durante uma atualização.

Para receber a atualização, feche ou saia de todas as guias usando o service worker
atual. Depois, quando [navegar de volta para
a demonstração](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, você verá o cavalo.

Esse padrão é parecido com o processo de atualização do Chrome. As atualizações do Chrome são baixadas em
segundo plano, mas não se aplicam até que o Chrome seja reiniciado. Enquanto isso, você pode
continuar usando a versão atual sem interrupção. No entanto, isso é um problema
durante o desenvolvimento, mas o DevTools tem formas de facilitar, o que é um dos
[próximos assuntos deste artigo](#devtools).

### Ativação

A ativação dispara quando o service worker antigo é descartado e seu novo service worker está
pronto para controlar clientes. Esse é o momento ideal para fazer coisas que não dá
para fazer enquanto o worker antigo ainda está em uso, como migrar bancos de dados e apagar
caches.

Na demonstração acima, mantenho uma lista de caches que espero que estejam lá e, no
evento `activate`, me livro de todo o resto, o que remove o antigo
cache `static-v1`.

Warning: você pode não estar atualizando a versão antiga. Pode ser um service worker de muitas versões atrás.

Se você passar uma promessa `event.waitUntil()`, ele carregará em buffer os eventos funcionais
(`fetch`, `push`, `sync` etc) até a promessa ser processada. Então, quando o evento `fetch`
dispara, a ativação está completa.

Warning: a API de armazenamento em cache é o "armazenamento de origem" (como localStorage e
IndexedDB). Se você tem muitos sites na mesma origem (por exemplo,
`yourname.github.io/myapp`) tome cuidado para não excluir o cache dos outros
sites. Para evitar isso, dê ao cache um nome com prefixo único relacionado ao site atual,
por exemplo, `myapp-static-v1`, e não toque neles a menos que comecem com `myapp-`.

### Pular a fase de espera

A fase de espera indica que você está executando apenas uma versão do site de cada vez,
mas não é preciso esperar esse recurso. Você pode ativar o novo service
worker antes chamando `self.skipWaiting()`.

Isso faz com que o service worker remova o worker atualmente ativo e ative-se
assim que entra na fase de espera (ou imediatamente se já estiver na
fase de espera). Ele *não* faz com que o worker pule a instalação, somente a espera.

Não faz diferença quando se chama `skipWaiting()`, desde que seja durante ou
antes da espera. É muito comum chamá-lo no evento `install`:

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

Mas, você pode querer chamá-lo como resultado de um `postMessage()` ao service
worker. Por exemplo, usar `skipWaiting()` após uma interação do usuário.

[Veja uma demonstração que usa
`skipWaiting()`](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}. Você deve ver a imagem de uma vaca sem ter que sair.
Como com `clients.claim()`, é uma corrida, então você só verá a vaca se o novo service
worker buscar, instalar e ativar antes de a página tentar carregar a imagem.

Warning: `skipWaiting()` significa que o seu novo service worker provavelmente controla
páginas que foram carregadas com uma versão antiga. Isso quer dizer que algumas buscas
da sua página serão gerenciadas pelo service worker antigo, mas o novo service
worker gerenciará as buscas seguintes. Se isso pode dar problema, não
use `skipWaiting()`.

### Atualizações manuais

Como mencionei mais cedo, o navegador verifica se há atualizações automaticamente
após navegação e eventos funcionais, mas você também pode acioná-las manualmente:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

Se acredita que o usuário usa seu site por muito tempo sem recarregar,
pode ser uma boa ideia chamar `update()` em um intervalo (como de hora em hora).

### Evite alterar o URL do script do seu service worker

Se você leu [minha postagem sobre práticas recomendadas
para armazenamento em cache](https://jakearchibald.com/2016/caching-best-practices/){: .external},
pode achar que é uma boa ideia dar a cada versão do seu service worker um URL exclusivo.
**Não faça isso!** Essa normalmente é uma prática ruim para os service workers. Só atualize
o script no seu local atual.

Veja um dos problemas que essa abordagem pode gerar:

1. `index.html` registra `sw-v1.js` como um service worker.
1. `sw-v1.js` armazena `index.html` em cache e o fornece para poder funcionar off-line.
1. Você atualiza `index.html` para que seu novo e reluzente `sw-v2.js` seja registrado.

Se você fizer isso, o usuário nunca receberá `sw-v2.js`, porque `sw-v1.js`
fornecerá a versão antiga de `index.html` que está no cache. Você se colocou em uma posição
em que precisa atualizar o service worker para atualizar o
service worker. Meu Deus.

Porém, para [a demonstração
acima](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, *alterei* o URL do service worker. Meu intuito é, para
fins de demonstração, poder alternar entre as versões. Não é algo que faria
na produção.

## Facilitando o desenvolvimento {: #devtools}

O ciclo de vida de um service worker é criado pensando no usuário, mas,
durante o desenvolvimento, isso é bem complicado. Felizmente, temos algumas abordagens que podem ajudar:

### Atualizar no recarregamento

Essa é a minha favorita.

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools mostrando a atualização no recarregamento">
</figure>

Isso torna o ciclo de vida fácil para o desenvolvedor. Cada navegação vai:

1. Buscar o service worker novamente.
1. Instalá-lo como uma nova versão, mesmo que seja idêntico em nível de bytes, o que significa que o evento `install`
  será executado e o seu cache, atualizado.
1. Pular a fase de espera para que o novo service worker seja ativado.
1. Navegar pela página.

Isso significa que você terá atualizações em cada navegação (incluindo atualização)
sem ter que recarregar ou fechar a guia.

### Pular a espera

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools mostrando como pular a espera">
</figure>

Se você tem um worker em espera, pode clicar em "skip waiting" no DevTools para
promovê-lo a "active" imediatamente.

### Forçar recarregamento

Se você forçar o recarregamento da página, o service worker será
totalmente ignorado. Essa abordagem não será controlada. Esse recurso está na especificação, então funciona
em outros navegadores que oferecem suporte a service workers.

## Gerenciar atualizações

O service worker foi projetado como parte da [web
extensível](https://extensiblewebmanifesto.org/){: .external }. A ideia é que nós, como
desenvolvedores de navegador, reconheçamos que não somos melhores no desenvolvimento web do
que os desenvolvedores web. E, sendo assim, não devemos fornecer APIs de alto nível limitadas que
resolvam um problema específico usando padrões de que *nós* gostamos, mas sim dar a você acesso
ao âmago do navegador e permitir que você o acesse como quiser, da forma que funcionar
melhor para os *seus* usuários.

Por isso, para oferecer o máximo de padrões que podemos, vamos ver todo o ciclo de atualização:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.installing; // the installing worker, or undefined
      reg.waiting; // the waiting worker, or undefined
      reg.active; // the active worker, or undefined

      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has as skipped waiting and become
      // the new active worker. 
    });

## Você sobreviveu! Está tudo bem!

Ufa! Quanta teoria técnica. Continue com a gente na próximas semanas. Vamos
falar em detalhes sobre algumas aplicações práticas de tudo isso abordado aqui.


{# wf_devsite_translation #}
