project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Trabalhando com tela cheia.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-01 #}

# Como criar experiências em tela cheia {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Temos a capacidade de criar sites e aplicativos de tela cheia imersivos
com facilidade, mas como tudo na web, tem algumas formas de fazer isso.
Isso é muito importante agora que os navegadores estão oferecendo suporte a uma
experiência de "aplicativo web instalado" que faz uso da tela cheia.

<div class="clearfix"></div>

## Leve o seu aplicativo ou site à tela cheia

Há diversas formas com que um usuário ou desenvolvedor pode colocar um aplicativo web em tela cheia:

* Solicitar ao navegador a exibição em tela cheia em resposta a um gesto do usuário;
* Instalar o aplicativo na tela inicial;
* Simular uma, escondendo a barra de endereço automaticamente.

### Solicitar ao navegador a exibição em tela cheia em resposta a um gesto do usuário

<a href="http://caniuse.com/#feat=fullscreen">Nem todas as plataformas são iguais</a>.
O Safari para iOS não tem uma API de tela cheia, mas temos uma para o Chrome para Android,
o Firefox e o IE 11+. A maioria dos aplicativos que você cria usará uma combinação de
JS API e seletores CSS fornecidos pela especificação de tela cheia. Os principais recursos da
JS API para você na construção de uma experiência em tela cheia são:

* `element.requestFullscreen()` (atualmente prefixado no Chrome, no Firefox e no IE)
    que exibe o elemento em modo de tela cheia.
* `document.exitFullscreen()` (atualmente prefixado no Chrome, no Firefox e no IE.
  O Firefox usa `cancelFullScreen()` no lugar dele), que cancela o modo de tela cheia.
* `document.fullscreenElement` (atualmente prefixado no Chrome, no Firefox e no IE),
    que retorna "true" se algum dos elementos estiver em modo de tela cheia.

Observação: você notará que, nas versões prefixadas, há muita
      inconsistência no contorno do "S" na tela. Isso é esquisito, mas
      é o problema com especificações embutidas.

Quando o aplicativo está em tela cheia, você não tem mais acesso aos controles
da IU do navegador. Isso altera a forma com que os usuário interagem com a sua
experiência. Eles não têm acesso aos controles de navegação padrão, como "Voltar"
e "Avançar", nem o botão de atualizar.  É
importante atender a esse cenário.  Você pode usar alguns seletores CSS para ajudar
a mudar o estilo e a apresentação do seu site quando o navegador entrar
em modo de tela cheia.

    <button id="goFS">Go fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          document.body.requestFullscreen();
      }, false);
    </script>

O exemplo acima é um pouco irreal, porque eu escondi toda a complexidade que envolve
o uso dos prefixos do fornecedor.

Observação: vão para o inferno, prefixos do fornecedor!

O código real e muito mais complexo. <a
href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">O Mozilla
criou</a> um script muito útil que você pode usar para alternar para tela cheia.  Como
você pode ver, a situação do prefixo do fornecedor é complexa e
difícil de lidar se comparada à API especificada. Mesmo com o código um pouco mais simples
abaixo, continua complexa.

    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

Nós, desenvolvedores web, odiamos complexidade.  Uma boa API abstrata de alto nível que você pode usar
é o módulo <a href="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a>
do <a href="http://sindresorhus.com/screenfull.js"/>Sindre Sorhus</a>,
que unifica os dois prefixos ligeiramente diferentes da JS API e do fornecedor em uma
API consistente.

#### Dicas para a Fullscreen API

##### Levando o documento à tela cheia

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>Figura 1: Tela cheia no elemento "body".</figcaption>
</figure>


É natural pensar em colocar o elemento "body" em tela cheia, mas se você trabalha
com um motor de renderização baseado no WebKit ou no Blink, verá que isso produz um efeito estranho de
comprimir a largura do corpo ao menor tamanho possível que comporta todo o
conteúdo (o Mozilla Gecko funciona bem).

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png" >
<figcaption>Figura 2: Tela cheia no elemento "document".</figcaption>
</figure>

Para consertar isso, use o elemento "document" no lugar de "body":

    document.documentElement.requestFullscreen();



<div class="clearfix"></div>


##### Levando um elemento "video" para a tela cheia

Levar um elemento "video" para tela cheia é exatamente igual para todos os outros
elementos. Você chama o método `requestFullscreen` no elemento
"video".

    <video id=videoElement></video>
    <button id="goFS">Go Fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var videoElement = document.getElementById("videoElement");
          videoElement.requestFullscreen();
      }, false);
    </script>

Se o seu elemento `<video>` não tiver o atributo "controls" definido,
o usuário não poderá controlar o vídeo quando ele estiver em tela cheia. A
forma recomendada de fazer isso é ter um contêiner básico que encapsule o vídeo e
os controles aos quais você quer que o usuário tenha acesso.

    <div id="container">
      <video></video>
      <div>
        <button>Play</button>
        <button>Stop</button>
        <button id="goFS">Go fullscreen</button>
      </div>
    </div>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var container = document.getElementById("container");
          container.requestFullscreen();
      }, false);
    </script>

Isso dá muita flexibilidade, porque você consegue combinar o objeto
"container" com o pseudo-seletor CSS (por exemplo, para esconder o botão "goFS").

    <style>
      #goFS:-webkit-full-screen #goFS {
        display: none;
      }
      #goFS:-moz-full-screen #goFS {
        display: none;
      }
      #goFS:-ms-fullscreen #goFS {
        display: none;
      }
      #goFS:fullscreen #goFS {
        display: none;
      }
    </style>

Com esses padrões, é possível detectar quando a tela cheia está ativa e adaptar a
interface do usuário a ela, por exemplo:

* Fornecendo um link para voltar à página inicial
* Fornecendo um mecanismo para fechar caixas de diálogo ou navegar retornando


### Inicializando uma página em tela cheia pela tela inicial

Não é possível inicializar uma página da web em tela cheia quando o usuário está navegando nela.
Os fornecedores de navegador sabem muito bem que uma experiência de tela cheia em todo carregamento de página
é extremamente irritante, por isso, exigem um gesto do usuário para entrar em tela cheia.
Porém, os fornecedores permitem que os usuários "instalem" aplicativos, e, para o sistema operacional, o ato de instalar é um
sinal de que o usuário quer inicializá-lo como um autêntico aplicativo de
plataforma.

Nas principais plataformas móveis, é bem fácil implementar usando
metatags ou arquivos de manifesto como mostrado abaixo.

#### iOS

Desde o lançamento do iPhone, os usuários podem instalar aplicativos web
na tela inicial e inicializá-los em modo de tela cheia.

    <meta name="apple-mobile-web-app-capable" content="yes">

> Se "content" for definido como "yes", o aplicativo web será executado em modo de tela cheia,
> ao contrário do que faria se "content" fosse definido como "no". O comportamento padrão é usar o Safari para exibir
> conteúdo web. Você pode determinar se uma página da web deve ser exibida em tela cheia
> usando a propriedade somente leitura booleana JavaScript window.navigator.standalone.
> Clique <a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">aqui</a> para saber mais.

#### Chrome for Android

A equipe do Chrome recentemente implementou um recurso que instrui o navegador a
inicializar a página em tela cheia quando o usuário a tiver adicionado na tela inicial.  Essa função
é parecida com a do modelo do Safari para iOS.

    <meta name="mobile-web-app-capable" content="yes">

> Você pode configurar seu aplicativo web para adicionar um ícone de atalho à
> tela inicial de um dispositivo e para ser aberto em modo de tela cheia usando
> o item de menu "Add to Home Screen" do Chrome for Android.
> Clique <a href="https://developers.chrome.com/multidevice/android/installtohomescreen">aqui</a> para saber mais.

Uma melhor opção é usar o manifesto dos aplicativos web.

#### Manifesto dos aplicativos web (Chrome, Opera, Firefox, Samsung)

O [manifesto para aplicativos web](/web/fundamentals/engage-and-retain/web-app-manifest/)
é um arquivo JSON simples que dá a você, o
desenvolvedor, a capacidade de controlar a exibição do aplicativo ao usuário nas áreas
em que normalmente eles esperariam ver aplicativos (por exemplo, a tela inicial de um dispositivo móvel), determinar
o que o usuário pode inicializar e, mais importante ainda, como eles podem inicializar. No futuro,
o manifesto dará ainda mais controle sobre seu aplicativo mas, no momento, estamos
concentrados em como o seu aplicativo pode ser inicializado. Especificamente:

1. Informando o navegador sobre o manifesto
2. Descrevendo como inicializar

Depois que criar o manifesto e hospedá-lo no seu site, tudo o que
precisará fazer é adicionar uma tag "link" para cada página que envolve o seu aplicativo. Veja como a seguir:

    <link rel="manifest" href="/manifest.json">

O Chrome oferece suporte a manifestos desde a versão 38 do Chrome for Android (outubro de 2014)
e dá a você controle sobre como o aplicativo web é exibido quando é instalado
na tela inicial (pelas propriedades `short_name`, `name` e `icons`) e como
ele deve ser inicializado quando o usuário clica no ícone de inicialização (via `start_url`,
`display` e `orientation`).

Veja um exemplo de manifesto abaixo. Ele não contempla tudo que pode compor um
manifesto.

    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "/index.html",
      "display": "standalone",
      "orientation": "landscape"
    }

Esse recurso é totalmente progressivo e permite criar experiências melhores
e mais integradas para os usuários de um navegador compatível com o recurso.

Quando o usuário adiciona o seu site ou aplicativo à tela inicial, há uma intenção do
usuário de tratá-lo como um aplicativo. Isso significa que você deve buscar direcionar o usuário
para a operação do seu aplicativo, não para uma página de produtos. Por exemplo,
se o usuário precisa fazer login no aplicativo, uma página de login é uma boa pedida
para a inicialização.

##### Aplicativos utilitários

A maioria dos aplicativos utilitários se beneficiará disso de maneira imediata. Para esses
aplicativos, você provavelmente quer que eles sejam inicializados na forma autônoma, assim como todo aplicativo
de uma plataforma móvel. Para instruir um aplicativo a inicializar na forma autônoma, adicione o seguinte ao manifesto
do aplicativo web:

    "display": "standalone"

##### Jogos

A maioria dos jogos se beneficiará do manifesto de maneira imediata. A grande
maioria dos jogos deve querer a inicialização em tela cheia e uma orientação
específica forçada.

Se você esta desenvolvendo um jogo de vista aérea ou um como o Flappy Birds, é
em provável que você queira que o jogo sempre fique em modo retrato.

    "display": "fullscreen",
    "orientation": "portrait"

Por outro lado, se estiver criando um jogo de quebra cabeças ou um como o X-Com, provavelmente
você vai querer que o jogo sempre use a orientação de paisagem.

    "display": "fullscreen",
    "orientation": "landscape"

##### Sites de notícia

Na maioria dos casos, os sites de notícia oferecem experiência puramente baseada em conteúdo. A maioria dos
desenvolvedores, naturalmente, pensaria em adicionar um manifesto a um site de notícias.  O manifesto
permite definir o que inicializar (a página principal do site de notícias) e
como inicializá-la (em tela cheia ou como uma guia de navegador comum).

A escolha depende de você e de como você acha que os usuários gostariam de acessar a sua
experiência. Se quiser que o site tenha todo o aparato dos navegadores que se espera
que um site tenha, você pode definir a exibição como `browser`.

    "display": "browser"

Se quiser que o site de notícias pareça com a maioria dos aplicativos centrados em notícias na forma
com que apresentam suas experiências como aplicativos e removem da IU todos os recursos que remetem à web, você pode
configurar a exibição como `standalone`.

    "display": "standalone"

### Simular uma tela cheia, escondendo a barra de endereço automaticamente.

Você pode "simular uma tela cheia" escondendo a barra de endereço automaticamente da seguinte forma:

    window.scrollTo(0,1);

Warning: digo isso como amigo. Isso existe. É bem maneiro, mas é
        enganar. Não use. &mdash; Paul

Esse é um método bem simples: a página carrega e a barra do navegador é instruída a
desaparecer. Infelizmente não está padronizado e não tem
compatibilidade de forma geral. Além disso, você tem que encontrar alternativas para um monte de peculiaridades.

Por exemplo, muitas vezes os navegadores restauram a posição na página quando o usuário
volta a ela. Usar `window.scrollTo` anula isso, o que irrita
os usuários. Para encontrar uma alternativa para esse comportamento, você tem que armazenar a última posição em
localStorage e lidar com os casos extremos (por exemplo, se o usuário tiver a
página aberta em diversas janelas).

## Orientações para a experiência do usuário

Ao criar um site que tira vantagem da tela cheia, há diversas
possíveis mudanças na experiência do usuário que você precisa conhecer para
poder criar um serviço que encante os usuários.

### Não dependa dos controles de navegação

O iOS não tem um botão de voltar nem gesto de atualizar. Portanto, você deve
garantir que os usuários possam navegar por todo o aplicativo sem ficarem presos.

Você pode detectar se está executando em modo de tela cheia ou em um modo instalado
facilmente em todas as grandes plataformas.

#### iOS

No iOS, você pode usar o booleano `navigator.standalone` para ver se o usuário inicializou
pela tela inicial ou não.

    if(navigator.standalone == true) {
      // My app is installed and therefore fullscreen
    }

#### Manifesto dos aplicativos web (Chrome, Opera, Samsung)

Ao inicializar como um aplicativo instalado, o Chrome não é executado em tela cheia
de verdade, então `document.fullscreenElement` retorna "null" e os seletores CSS
não funcionam.

Quando o usuário solicita a tela cheia por um gesto no site, os recursos da API de tela cheia
padrão ficam disponíveis, incluindo o pseudo-seletor CSS que permite
adaptar a IU para reagir ao estado de tela cheia da seguinte forma:

    selector:-webkit-full-screen {
      display: block; // displays the element only when in fullscreen
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

Se o usuário inicializar o site pela tela inicial, a consulta de mídia `display-mode`
será definida como definida no manifesto do aplicativo web. No caso de
tela cheia pura, isso seria:

    @media (display-mode: fullscreen) {

    }

Se o usuário inicializar o aplicativo em modo autônomo, a consulta de mídia `display-mode`
será `standalone`:

    @media (display-mode: standalone) {

    }


#### Firefox

Quando o usuário solicita a tela cheia pelo seu site ou inicializa o aplicativo em
modo de tela cheia, todos os recursos da API de tela cheia padrão ficam disponíveis, incluindo o
pseudo-seletor CSS, que permite adaptar a IU para reagir ao estado de tela cheia
da seguinte forma:

    selector:-moz-full-screen {
      display: block; // hides the element when not in fullscreen mode
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Internet Explorer

No IE, a pseudo-classe CSS não tem hífen, mas mesmo assim funciona de forma parecida no
Chrome e no Firefox.

    selector:-ms-fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Especificação

A grafia da especificação corresponde à sintaxe usada pelo IE.

    selector:fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

### Manter o usuário na experiência de tela cheia

A API de tela cheia pode ter algumas frescuras às vezes. Os fornecedores de navegador não querem
prender os usuários em uma página de tela cheia, por isso, desenvolveram mecanismos para
sair da tela cheia assim que possível.  Isso significa que você não tem como
criar um site em tela cheia que abra muitas páginas porque:

* Alterar o URL programaticamente usando `window.location =
  "http://example.com"` sai da tela cheia.
* O clique de um usuário em um link externo da sua página fará com que a tela cheia seja abandonada.
* Alterar o URL por `navigator.pushState` da API também sairá da
  experiência de tela cheia.

Você tem duas opções se quiser manter o usuário em uma experiência de tela cheia:

1. Use os mecanismos instaláveis dos aplicativos web para ir para a tela cheia.
2. Gerencie sua IU e o estado do aplicativo usando o fragmento # .

Usando a sintaxe # para atualizar o URL (window.location = "#somestate") e
detectando o evento `window.onhashchange`, você pode usar a própria pilha histórica
do navegador para gerenciar mudanças no estado do aplicativo, permitir que o usuário use
os botões de voltar ou oferecer um botão de voltar programático simples
usando a API de histórico, como demonstrado abaixo:

    window.history.go(-1);

### Deixe o usuário escolher quando ativar a tela cheia

Não existe nada mais irritante para o usuário do que um site que faz algo
inesperado. Quando o usuário navega para o site, não tente fazê-lo ir para o modo
de tela cheia.

Não intercepte o primeiro evento de toque e chame `requestFullscreen()`.

1. É irritante.
2. Os navegadores podem decidir perguntar ao usuário em algum momento se
   ele deseja que o aplicativo seja aberto em tela cheia.

Se quiser inicializar aplicativos em tela cheia, pense em usar as experiências
de instalação de cada plataforma.

### Não fique insistindo que o usuário instale o seu aplicativo na tela de início.

Se planeja oferecer uma experiência de tela cheia pelos mecanismos instalados do aplicativo,
pense no usuário.

* Aja com discrição. Use um banner ou rodapé para informá-los de que podem instalar o
  aplicativo.
* Se eles descartarem a proposta, não a mostre novamente.
* No primeiro acesso dos usuários, é bem provável que eles não queiram instalar o aplicativo, a menos
  que estejam muito satisfeitos com o seu serviço. Pense em convidá-los a instalar depois
  de uma interação positiva no site.
* Se o usuário acessa o site regularmente e não instala o aplicativo, provavelmente
  não instalará o aplicativo no futuro. Não insista.

## Conclusão

Apesar de não termos uma API totalmente padronizada e implementada, usando algumas das
dicas apresentadas neste artigo fica fácil criar experiências que tiram
vantagem de toda a tela do usuário, independentemente do dispositivo em questão.


{# wf_devsite_translation #}
