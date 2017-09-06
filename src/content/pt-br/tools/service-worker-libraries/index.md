project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Bibliotecas de service worker.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-11-07 #}

# Bibliotecas de service worker {: .page-title }

Use nossas bibliotecas de [service worker](/web/fundamentals/getting-started/primers/service-workers)
para simplificar o desenvolvimento, eliminando código
clichê de service workers.

<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>Visão geral das bibliotecas de service workers</figcaption>
</figure>

**sw-precache &mdash;** integra-se ao processo de compilação para gerar um service
worker que armazena previamente em cache ativos estáticos como, por exemplo, um shell
de aplicativo.

**sw-toolbox &mdash;** implementa padrões comuns de armazenamento em cache em tempo de execução, como conteúdo
dinâmico, chamadas de API e recursos de terceiros com a mesma facilidade da criação de um arquivo LEIAME.

**sw-offline-google-analytics &mdash;** retém temporariamente e tenta executar
novamente solicitações de análise para evitar perdê-las em desconexões de rede.

<div class="clearfix"></div>

## Por que usar bibliotecas de service workers?

Você já está convencido das vantagens de adicionar um service worker ao seu app
da Web, trocando a incerteza da rede pela promessa de uma experiência rápida, voltada ao modo
off-line com base em service workers. No entanto, para criar o seu próprio service worker
desde o início, você tem de superar alguns obstáculos:

* Armazenar previamente em cache URLs com facilidade e confiabilidade. 
* Incrementar uma string de versão de cache para garantir a atualização de recursos armazenados previamente em
  cache.
* Implementar uma estratégia de expiração de cache para considerar o tamanho do cache ou o vencimento
  da entrada.
* Criar padrões comuns como tempos limite de rede e código clichê [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi).

* Capturar e relatar dados do Google Analytics durante o uso off-line.


Você pode resolver todos esses inconvenientes usando nossas bibliotecas de service workers.


## Service Worker Precache 

O [Service Worker Precache](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) é um
módulo para gerar um service worker que
armazena previamente em cache os recursos. O módulo pode ser usado em scripts de compilação baseados em JavaScript,
como os criados pelo [`gulp`](https://gulpjs.com/), além de oferecer uma
[interface de linha de comando](https://github.com/GoogleChrome/sw-precache/#command-line-interface). Você pode usar o módulo
diretamente ou, se preferir usar os [wrappers](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
em volta de `sw-precache` para ambientes de compilação específicos, como
[`webpack`](https://webpack.github.io/).

Ele pode ser [usado juntamente com](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md) a biblioteca [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox),
que funciona bem seguindo o [modelo App Shell + conteúdo dinâmico](/web/fundamentals/architecture/app-shell).

A documentação completa está no arquivo [leiame](https://github.com/GoogleChrome/sw-precache/blob/master/README.md).
O [guia de primeiros passos](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md) 
oferece um ponto de partida mais rápido.

[Obter sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Recursos

| Recurso | Resumo |
|---------|---------|
| Armazene previamente em cache o shell do aplicativo | O shell do seu app da Web (HTML, JavaScript e CSS essenciais) pode ser armazenado previamente em cache quando um usuário acessa a sua página. |
| Integração em tempo de compilação | Coloque-o no processo de compilação existente: [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js) ou [linha de comando](https://github.com/GoogleChrome/sw-precache#command-line-interface). |
| Sempre atualizado | Mudanças na sua versão atualizam o script dos service workers. Os usuários recebem atualizações, mas não é necessário controlar manualmente a versão do conteúdo ou dos caches. |
| Sem rede, sem problema | Os recursos estáticos são entregues [primeiro do cache](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), rapidamente, independentemente de a rede estar ou não disponível. |

## Service Worker Toolbox

O [Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) oferece
alguns auxiliares simples para uso na criação de seus próprios service workers. Especificamente,
ele oferece padrões comuns de armazenamento em cache e uma
[abordagem expressiva](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
do uso dessas estratégias para solicitações em tempo de execução. 

[Obter sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Recursos

| Recurso | Resumo |
|---------|---------|
| Armazenamento em cache em tempo de execução | Armazene em cache recursos grandes ou pouco usados, como imagens, em tempo de execução, quando forem usados pela primeira vez. |
| Fallbacks off-line | Carregue imagens novas, respostas de API e outro conteúdo dinâmico pela rede quando estiver on-line, mas faça fallback para um marcador armazenado em cache quando off-line. |
| Adeus Lie-Fi | Enfrente o [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) executando automaticamente fallback para uma resposta armazenada em cache quando a rede ficar muito lenta. |
| Combata a ocupação excessiva do cache | Essa imagem do mês passado não precisa ficar no cache para sempre. A expiração do cache com base em com pouco uso recente ou vencidos ajuda a liberar espaço.|

## Google Analytics off-line

O [Google Analytics off-line](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) 
retém temporariamente e tenta executar novamente solicitações de análise para evitar perdê-las em desconexões
de rede. Essa ferramenta pode ser instalada facilmente no sistema de compilação
usando npm e importada com facilidade para o script do service worker. Configure-a usando uma
chamada de função parametrizada.

[Obter sw-offline-google-analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### Recursos

| Recurso | Resumo |
|---------|---------|
| Google Analytics off-line | Cria gerenciadores de recuperação que garantem a disponibilidade off-line do JavaScript do Google Analytics. |
| Armazena temporariamente dados em cache | Mantém solicitações de análise efetuadas quando o dispositivo está off-line e tenta executá-las novamente na próxima vez em que o service worker é inicializado. |
| Valores para reprodução personalizada | Pares chave-valor a serem adicionados a solicitações reproduzidas do Google Analytics. Por exemplo, você pode definir uma dimensão personalizada para indicar que uma solicitação foi reproduzida. |
| Parâmetros de ocorrência modificados | Permite modificar programaticamente os parâmetros de uma ocorrência para, por exemplo, rastrear o tempo decorrido em uma tentativa e reprodução de ocorrência. |

## Saiba mais

### Artigos

[Primeiros passos com o sw-toolbox](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134), de Dean Hume

[Adicionar compatibilidade com o modo off-line para create-react-app usando sw-precache](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm), de Jeffrey Posnick

O estudo de caso [Service workers em produção](/web/showcase/case-study/service-workers-iowa)
oferece uma visão aprofundada sobre como as bibliotecas `sw-precache` e `sw-toolbox` 
foram usadas juntas como base para o
[app da Web da Google I/O 2015](https://events.google.com/io2015/).

### Codelabs

[Adicionar um service worker com sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### Vídeos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

A apresentação de Jeff Posnick do Chrome Dev Summit 2015,
_Carregamento instantâneo com service workers_, descreve como usar eficazmente
`sw-precache` e `sw-toolbox` juntos para criar apps da Web que podem ser carregados rapidamente e
funcionar off-line.

[Slides](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt e Addy Osmani explicam como nossas bibliotecas de service workers podem ajudar
apps da Web a funcionar off-line quase que imediatamente. Este vídeo descreve 
`sw-precache` e `sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Neste episódio de Totally Tooling Mini-Tips, Matt e Addy percorrem o
`sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Na Google I/O 2016, Mat Scales descreve bibliotecas e ferramentas ótimas para fazer com que
Progressive Web Apps sejam carregados rapidamente, funcionem muito bem off-line e sejam aprimorados progressivamente,
tudo isso para oferecer uma melhor experiência do usuário.


{# wf_devsite_translation #}
