project_path: /web/_project.yaml 
book_path: /web/fundamentals/_book.yaml
description: A arquitetura de shell dos aplicativos mantém sua IU local e carrega conteúdo dinamicamente, sem sacrificar o potencial da web de oferecer links e de descobrir e encontrar. 

{# wf_updated_on: 2017-07-12 #} 
{# wf_published_on: 2016-09-27 #}

# O modelo de shell dos aplicativos {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Uma arquitetura de **shell de aplicativo** (ou app shell) é uma forma de se criar um
Progressive Web App que carrega de forma confiável e instantânea na tela do usuário,
muito parecido com o que se vê em aplicativos nativos.

O "shell" de um aplicativo é o HTML, o CSS e o JavaScript mínimos necessários para se gerar a
interface do usuário e, quando armazenados em cache off-line, podem oferecer **desempenho instantâneo
e confiável** a usuários quando voltam a acessar. Isso significa que o shell dos aplicativos
não é carregado pela rede sempre que o usuário acessa. Apenas o conteúdo
estritamente necessário é buscado na rede.

Para [aplicativos
de uma única página](https://en.wikipedia.org/wiki/Single-page_application) com
arquiteturas pesadas em JavaScript, um shell de aplicativo é uma abordagem certeira. Essa
abordagem se baseia no armazenamento agressivo do shell em cache (usando um [service
worker](/web/fundamentals/primers/service-worker/)) para fazer o aplicativo
funcionar. Depois, o conteúdo dinâmico é carregado em cada página que usa JavaScript. Um shell
de aplicativo é útil para se obter HTML inicial na tela rapidamente, sem usar
uma rede.

<img src="images/appshell.png" alt="Arquitetura de shell dos aplicativos" />

Em outras palavras, o shell dos aplicativos é semelhante a um pacote de código que se
publicaria em uma loja de aplicativos ao compilar um aplicativo nativo. Ele é composto pelo esqueleto da sua
IU e pelos principais componentes necessários para fazer o aplicativo funcionar, mas, na maioria dos casos,
não contém os dados.

Observação: Experimente o codelab do [Primeiro Progressive Web
App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
para saber como arquitetar e
implementar seu primeiro shell de aplicativo em um aplicativo de meteorologia. O vídeo [Instant
Loading with the App Shell model](https://www.youtube.com/watch?v=QhUzmR8eZAo)
também oferece um passo a passo desse padrão.

### Quando usar o modelo de shell de aplicativo

Criar um PWA não significa ter que começar do zero. Se você está criando um aplicativo
moderno de uma única página, provavelmente já está usando algo parecido com um shell de aplicativo,
mas talvez não o chame de shell. Os detalhes podem variar um pouco, dependendo
de que bibliotecas ou estruturas você usa, mas o conceito em si
se aplica a qualquer estrutura.

Uma arquitetura de shell de aplicativo é a melhor abordagem para aplicativos e sites que
têm navegação relativamente rígida, mas que têm conteúdo mudando constantemente. Diversas estruturas e bibliotecas
JavaScript modernas já indicam separar a lógica do aplicativo
de seu conteúdo para simplificar a aplicação da arquitetura.
Para uma classe de sites que só tem conteúdo estático, você ainda pode
aplicar o mesmo modelo, mas o site será 100% composto de shell de aplicativo.

Para ver como o Google criou uma arquitetura de shell de aplicativo, dê uma olhada em
[Criando o Progressive Web App da Google I/O 2016](/web/showcase/2016/iowa2016).
Esse aplicativo real começou com um SPA para criar um PWA que armazena conteúdo em cache com antecedência
usando um service worker, carrega novas páginas dinamicamente, faz transição de
vistas de forma suave e reutiliza o conteúdo depois do primeiro carregamento.


### Benefícios {: #app-shell-benefits }

Os benefícios de uma arquitetura de shell de aplicativo com um service worker incluem:

* **Desempenho confiável e consistentemente rápido**. Os acessos repetidos
são extremamente rápidos.  Os ativos estáticos e a IU (por exemplo, HTML, JavaScript, imagens
e CSS) são armazenados em cache no primeiro acesso, assim, em um segundo acesso, eles são
carregados instantaneamente. O conteúdo _pode_ ser armazenado em cache no primeiro acesso, mas
normalmente é carregado só quando necessário.

* **Interações como as de um nativo**. Ao adotar o modelo de shell de aplicativo, você
pode criar experiências com navegação e interações instantâneas, como as de um
aplicativo nativo, complementadas pela capacidade de funcionamento off-line.

* **Uso econômico de dados**. Projete visando ao mínimo de uso de dados e pense bem no
que será armazenado em cache, porque aplicar isso a arquivos não essenciais (imagens grandes que
não são exibidas em todas as páginas, por exemplo) faz com que os navegadores baixem
mais dados do que o estritamente necessário. Embora o uso de dados seja relativamente barato em países
do ocidente, esse não é o caso em mercados
emergentes.

## Requisitos {: #app-shell-requirements }

O ideal é que o shell do aplicativo:

* Carregue rapidamente
* Use a menor quantidade de dados possível
* Use ativos estáticos a partir de um cache local
* Separe conteúdo de navegação
* Recupere e exiba conteúdo específico da página (HTML, JSON etc.)
* Como opção, armazene conteúdo dinâmico em cache

O shell de aplicativo mantém sua IU local e insere conteúdo dinamicamente por meio de uma
API, mas sem prejudicar o potencial da web de oferecer links e de descobrir e encontrar. Na
próxima vez que o usuário acessar o aplicativo, a versão mais recente será exibida automaticamente.
Não é preciso baixar novas versões antes de usá-lo.

Observação: A [Lighthouse](https://github.com/googlechrome/lighthouse), extensão de monitoramento,
pode ser usada para verificar se o PWA que usa um shell de aplicativo atinge um alto padrão
de desempenho. [To the Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E)
é uma palestra que dá um passo a passo sobre como otimizar um PWA usando essa ferramenta.

## Criar shell para o seu aplicativo {: #building-your-app-shell }

Estrutura o aplicativo com uma clara distinção entre o shell da página e o
conteúdo dinâmico. Em geral, o aplicativo deve carregar o shell mais simples possível,
mas incluir conteúdo importante da página suficiente com o download inicial. Determine
o ponto de equilíbrio entre velocidade e o nível de atualização dos dados de cada uma das suas fontes
de dados.

<figure>
  <img src="images/wikipedia.jpg"
    alt="Aplicativo off-line do Wikipédia usando um shell de aplicativo com conteúdo armazenado em cache">
  <figcaption>O <a href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">aplicativo off-line do Wikipédia</a> de Jake Archibald é um bom exemplo de PWA que usa um modelo de shell de aplicativo. Ele carrega instantaneamente em acessos repetidos, mas busca conteúdo dinamicamente usando JS. Em seguida, esse conteúdo é armazenado em cache off-line para acessos futuros.
</figcaption>
</figure>

### Exemplo de HTML para um shell de aplicativo {: #example-html-for-appshell }

Esse exemplo separa a infraestrutura e a IU principais do aplicativo dos dados.
É importante manter o carregamento inicial o mais simples possível para exibir somente
o layout da página assim que o aplicativo web for aberto. Parte desse conteúdo vem do
arquivo de índice do seu aplicativo (DOM embutido, estilos) e o resto é carregado por
scripts e folhas de estilo externos.

Toda a IU e a infraestrutura é armazenada em cache localmente usando um service worker para que,
nos próximos carregamentos, se recupere somente dados novos ou alterados, em vez de
carregar tudo de novo.

O arquivo `index.html` do seu diretório de trabalho devem ser parecido com
o código a seguir. Esse é um subconjunto do conteúdo real e não é um arquivo
de índice completo. Vejamos o que ele contém.

* HTML e CSS para o "esqueleto" da interface do usuário, complementados por marcadores
  de navegação e conteúdo.
* Um arquivo JavaScript externo (app.js) para lidar com a lógica da navegação e da IU,
  além do código para exibir postagens recuperadas do servidor e armazená-las
  localmente usando um mecanismo de armazenamento como IndexedDB.
* Um manifesto do aplicativo web e o carregador do service worker para ativar os recursos off-line.

<div class="clearfix"></div>

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>App Shell</title>
      <link rel="manifest" href="/manifest.json">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Shell</title>
      <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
      <header class="header">
        <h1 class="header__title">App Shell</h1>
      </header>
      
      <nav class="nav">
      ...
      </nav>
      
      <main class="main">
      ...
      </main>

      <div class="dialog-container">
      ...
      </div>

      <div class="loader">
        <!-- Show a spinner or placeholders for content -->
      </div>

      <script src="app.js" async></script>
      <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      }
      </script>
    </body>
    </html>

<div class="clearfix"></div>


Observação: Acesse [https://app-shell.appspot.com/](https://app-shell.appspot.com/)
para ver um PWA real muito simples que usa um shell de aplicativo e renderização
no servidor para o conteúdo. Pode-se implementar um shell de aplicativo usando qualquer biblioteca
ou estrutura, conforme explicado na nossa palestra <a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">Progressive Web Apps em
todas as estruturas</a>. Você pode obter exemplos usando o Polymer (<a
href="https://shop.polymer-project.org">Shop</a>) e o React (<a
href="https://github.com/insin/react-hn">ReactHN</a>,
<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>).
 

### Armazenar o shell do aplicativo em cache {: #app-shell-caching }

Um shell de aplicativo pode ser armazenado em cache por meio de um service worker gravado manualmente ou um
gerado por uma ferramenta de pré-armazenamento em cache de ativos estáticos, como
a [sw-precache](https://github.com/googlechrome/sw-precache).

Observação: Os exemplos são somente para fins ilustrativos
e referência geral. Os recursos usados provavelmente serão diferentes para o seu
aplicativo.

#### Armazenar o shell do aplicativo manualmente

Veja abaixo um exemplo de código de service worker que armazena recursos estáticos do
shell do aplicativo na [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
usando o evento `install` do service worker:

    var cacheName = 'shell-content';
    var filesToCache = [
      '/css/styles.css',
      '/js/scripts.js',
      '/images/logo.svg',

      '/offline.html’,

      '/’,
    ];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });

#### Como usar sw-precache para armazenar o shell do aplicativo em cache

O service worker gerado pelo sw-precache armazenará em cache e entregará os recursos
que você definir como parte do processo de compilação. Você pode aplicar o pré-armazenamento em cache a qualquer arquivo
HTML, JavaScript e CSS que faça parte do shell do aplicativo. Tudo vai
funcionar off-line e carregar rapidamente em acessos repetidos sem você precisar fazer mais nada.

Veja um exemplo básico de como usar o sw-precache como parte de um
processo de compilação do [gulp](http://gulpjs.com):

    gulp.task('generate-service-worker', function(callback) {
      var path = require('path');
      var swPrecache = require('sw-precache');
      var rootDir = 'app';

      swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
      }, callback);
    });

Para saber mais sobre armazenamento de ativos estáticos em cache, acesse o codelab
[Como adicionar um service worker com
o sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0).

Note: o sw-precache é útil para armazenamento off-line de recursos estáticos em cache. Para
recursos de tempo de execução/dinâmicos, recomendamos usar nossa biblioteca de cortesia:
[sw-toolbox](https://github.com/googlechrome/sw-toolbox).

## Conclusão {: #conclusion }

Shell de aplicativo usando service worker é um padrão poderoso para armazenamento em cache off-line,
mas também oferece bons ganhos de desempenho na forma de carregamento instantâneo para
acessos repetidos ao PWA. É possível armazenar o shell do seu aplicativo em cache, para que ele
funcione off-line, e inserir o conteúdo usando JavaScript.

Em acessos repetidos, isso permite exibir pixels importantes na tela
sem precisar da rede, mesmo que o conteúdo eventualmente venha dela.



{# wf_devsite_translation #}
