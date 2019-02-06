project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Métricas de desempenho centradas no usuário

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-06-01 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Métricas de desempenho centradas no usuário {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

Você já deve ter ouvidos diversas vezes que o desempenho é importante e que é
crucial que seus aplicativos da Web sejam rápidos.

Mas ao tentar responder à pergunta *meu aplicativo é rápido?*, você perceberá que
rápido é um termo vago. O que queremos dizer exatamente com rápido? Em que
contexto? E rápido pra quem?

<aside>
  <strong>Note:</strong> caso você prefira assistir a um vídeo em vez de ler um artigo,
 tratei deste assunto na Google I/O 2017 com minha colega
 <a href="https://twitter.com/shubhie">Shubhie Panicker</a>.
</aside>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6Ljq-Jn-EgU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Ao falarmos de desempenho, a precisão é importante. Assim não criamos
mal-entendidos nem espalhamos mitos que podem, às vezes, levar desenvolvedores bem-intencionados
a otimizações erradas&mdash;que, em última instância, são mais prejudiciais
do que benéficas à experiência do usuário.

Para dar um exemplo específico, é comum hoje em dia ouvir as pessoas dizerem algo
como: __*Testei meu aplicativo e ele carrega em X.XX segundos*__.

O problema dessa afirmação *não* é que ela seja falsa, é que se trata
de uma representação equivocada da realidade. Os tempos de carregamento variam drasticamente de usuário para usuário,
dependendo das capacidades do dispositivo e das condições de rede. Apresentar tempos
de carregamento como um número único ignora os usuários que tiveram carregamentos muito mais lentos.

Na verdade, o tempo de carregamento do aplicativo é a junção de todos os tempos de carregamento de cada
usuário individual. O único jeito de representar completamente essa informação é com uma distribuição,
como no histograma abaixo:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-histogram.png"
       alt="Histograma de tempos de carregamento para visitantes de um site"/>
</figure>

Os números ao longo do eixo X mostram os tempos de carregamento, e a altura das barras no
eixo Y mostram o número relativo de usuários que tiveram um tempo de carregamento naquele intervalo
de tempo específico. Como esse gráfico mostra, enquanto o maior segmento de usuários
teve tempos de carregamento inferiores a um ou dois segundos, muitos deles ainda tiveram tempos bem
mais longos.

O outro motivo que faz da afirmação "meu site carrega em X.XX segundos" um mito é que o carregamento não é um
momento único no tempo&mdash;, mas uma experiência que nenhuma métrica pode capturar
completamente. Existem diversos momentos durante a experiência de carregamento que podem afetar
a percepção do usuário sobre ela ser "rápida". Se você focar em apenas um desses momentos, poderá
ignorar experiências ruins que acontecem no restante do tempo.

Por exemplo, considere um aplicativo que otimiza a renderização inicial rápida,
fornecendo conteúdo para o usuário imediatamente. Se esse aplicativo carregar um pacote
JavaScript grande, que leva vários segundos para analisar e executar, o conteúdo
na página não será interativo até que o JavaScript funcione. Se o usuário
conseguir ver um link na página, mas não puder clicar nele, ou ainda se puder ver uma caixa de texto
e não conseguir digitar, provavelmente não se importará com a rapidez de renderização da página.

Então, em vez de medir o carregamento com apenas uma métrica, deveríamos fazer a medição de
cada momento que pode ter efeito sobre a *percepção* de carregamento do usuário
ao longo da experiência.

Um segundo exemplo de mito de desempenho é que __*o desempenho só preocupa
durante o tempo de carregamento*__.

Nós, como equipe, somos responsáveis por esse equívoco, e ele torna-se ainda mais significativo porque
a maioria das ferramentas de desempenho medem *somente* o carregamento.

Mas a verdade é que um desempenho fraco pode ocorrer a qualquer momento, não apenas durante o
carregamento. Aplicativos que não respondem rapidamente a toques ou cliques e aqueles que não
rolam ou animam de maneira suave podem ser tão ruins quanto aplicativos com carregamento lento. Os usuários
preocupam-se com a experiência completa e nós, os desenvolvedores, deveríamos fazer o mesmo.

Um tema comum em todos esses equívocos com relação ao desempenho é que eles focam em
coisas que têm pouco ou nada a ver com a experiência do usuário. Da mesma forma,
as métricas de desempenho tradicionais como o
tempo de [carregamento](https://developer.mozilla.org/en-US/docs/Web/Events/load) ou o tempo de
[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
não são totalmente confiáveis, uma vez que sua ocorrência pode ou não corresponder
ao momento em que o usuário acha que o aplicativo está carregado.

Para evitar a repetição desse erro, precisamos responder a estas
perguntas:

1. Quais métricas medem de maneira mais precisa o desempenho percebido por uma pessoa?
2. Como medimos essas métricas em nossos usuários atuais?
3. Como interpretamos nossas medidas para determinar se um aplicativo é "rápido"?
4. Depois de entender o desempenho real do aplicativo para o usuário, o que fazemos para impedir
   regressões e termos a oportunidade de melhorar o desempenho no futuro?

## Métricas de desempenho centradas no usuário

Quando um usuário navega em uma página da Web, ele normalmente procura por feedback
visual que confirme que tudo funcionará da forma esperada.

<table>
  <tr>
   <td><strong>A página está funcionando?</strong></td>
   <td>O início da navegação foi bem-sucedido? O servidor respondeu?</td>
  </tr>
  <tr>
   <td><strong>A página é útil?</strong></td>
   <td>Ela tem conteúdo renderizado suficiente que permita que os usuários interajam?</td>
  </tr>
  <tr>
   <td><strong>A página pode ser usada?</strong></td>
   <td>Os usuários podem interagir com a página ou ela ainda está em processo de carregamento?</td>
  </tr>
  <tr>
   <td><strong>A página é agradável?</strong></td>
   <td>As interações são fluidas e naturais, sem lentidão e instabilidade?</td>
  </tr>
</table>

Para compreender quando uma página oferece esse feedback aos usuários, definimos
várias métricas novas:

### Primeira exibição e primeira exibição de conteúdo

A [Paint Timing API](https://github.com/WICG/paint-timing) define duas
métricas: a *primeira exibição* (FP, na sigla em inglês) e a *primeira exibição de conteúdo* (FCP, na sigla em inglês). Essas métricas
marcam os pontos, imediatamente após a navegação, em que o navegador renderiza pixels
na tela. Isso é importante para o usuário porque responde à pergunta:
*A página está funcionando?

A principal diferença entre as duas métricas é que a FP marca o momento em que o
navegador renderiza *algo* que é visualmente diferente do que estava na
tela antes da navegação. Por outro lado, a FCP é o momento em que o navegador
renderiza a primeira parte do conteúdo do DOM que pode ser texto, imagem, SVG
ou até mesmo um elemento `<canvas>`.

### Primeira exibição significativa e tempo de elemento principal

A primeira exibição significativa (FMP, na sigla em inglês) é a métrica que responde à pergunta: “A página é
útil?". Embora o conceito de “útil" seja muito difícil de especificar de uma forma que
se aplique genericamente a todas as páginas da Web (e, portanto, não há especificação), é muito
fácil para os desenvolvedores Web saber quais partes das páginas serão
mais úteis aos usuários.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-hero-elements.png"
       alt="Exemplos de elementos principais em vários sites"/>
</figure>

Essas “partes mais importantes” de uma página da Web geralmente são chamadas de *elementos
principais*. Na página de exibição do YouTube, por exemplo, o elemento principal é o
vídeo principal. No Twitter, provavelmente seja os indicadores de notificação e o primeiro
tuíte. Em um aplicativo de meteorologia, é a previsão do tempo para o local especificado. E em um site de
notícias, normalmente é a história principal e a imagem em destaque.

Páginas da Web quase sempre têm partes que são mais importantes do que outras. Se as
partes mais importantes de uma página são carregadas rapidamente, o usuário pode nem mesmo perceber que
o restante ainda não carregou.

### Tarefas longas

Os navegadores respondem aos comandos do usuário adicionando tarefas que são executadas uma por uma em uma fila
do thread principal. É aí também que o navegador executa o
JavaScript do aplicativo. Nesse sentido, o navegador tem thread único.

Em alguns casos, essas tarefas podem levar muito tempo para serem executadas. Se isso ocorrer, o
thread principal será bloqueado e todas as outras tarefas na fila precisarão esperar.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-long-tasks.png"
       alt="Tarefas longas conforme vistas no Chrome Developer Tools"/>
</figure>

Para o usuário, isso aparece como lentidão ou instabilidade. Hoje em dia, essa é uma das maiores fontes de
experiências ruins na Internet.

A [Long Tasks API](https://w3c.github.io/longtasks/) identifica qualquer tarefa
maior do que 50 milissegundos como potencialmente problemática e expõe essas
tarefas para o desenvolvedor do aplicativo. O tempo de 50 milissegundos foi escolhido para que os aplicativos
pudessem atender às [diretrizes RAIL](/web/fundamentals/performance/rail) de
resposta ao comando do usuário em 100 ms.

### Tempo para interação da página

A métrica *Tempo para interação da página* (TTI, na sigla em inglês) marca o ponto no qual o aplicativo
está visualmente renderizado e capaz de responder de forma confiável ao comando do usuário. Um
aplicativo pode não conseguir responder ao comando do usuário por algumas razões:

* O JavaScript necessário para fazer os componentes da página funcionarem ainda não foi
  carregado.
* Tarefas longas estão bloqueando o thread principal (como descrito na última
 seção).

A métrica TTI identifica o ponto no qual o JavaScript inicial da página está
carregado e o thread principal está ocioso (sem tarefas longas).

### Mapeamento de métricas para a experiência do usuário

Voltando às perguntas que identificamos como as mais
importantes para a experiência do usuário, esta tabela ilustra como cada uma das métricas que
acabamos de listar é mapeada para a experiência que esperamos otimizar:

<table>
  <tr>
    <th>A experiência</th>
    <th>A métrica</th>
  </tr>
  <tr>
    <td>A página está funcionando?</td>
    <td>Primeira exibição (FP)/Primeira exibição de conteúdo (FCP)</td>
  </tr>
  <tr>
    <td>A página é útil?</td>
    <td>Primeira exibição significativa (FMP)/Tempo de elemento principal</td>
  </tr>
  <tr>
    <td>A página pode ser usada?</td>
    <td>Tempo para interação da página (TTI)</td>
  </tr>
  <tr>
    <td>A página é agradável?</td>
    <td>Tarefas longas (tecnicamente, a falta de tarefas longas)</td>
  </tr>
</table>

E estas capturas de tela de uma linha do tempo de carregamento podem ajudar a visualizar melhor onde
essas métricas se encaixam na experiência de carregamento:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-load-timeline.png"
       alt="Capturas de tela de onde essas métricas ocorrem na experiência de carregamento"/>
</figure>

A próxima seção mostra em detalhes como medir essas métricas em dispositivos de usuários reais.

## Medição de métricas em dispositivos de usuários reais

Um dos principais motivos pelos quais historicamente otimizamos com base em métricas como carregamento e
`DOMContentLoaded` é que eles são expostos como eventos no navegador e são fáceis de
medir em usuários reais.

Por outro lado, muitas outras métricas são historicamente muito difíceis de
medir. Por exemplo, este código é uma alternativa que frequentemente vemos os desenvolvedores usarem para detectar
tarefas longas:

```
(function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());
```

Esse código inicia um loop infinito de `requestAnimationFrame` e registra o tempo
em cada iteração. Se o tempo atual for maior que 50 milissegundos após o
tempo anterior, o código pressupõe que foi resultado de uma tarefa longa. Embora esse código
funcione em geral, ele tem muitos pontos negativos:

* Ele adiciona sobrecarga a cada frame.
* Ele evita bloqueios ociosos.
* É péssimo para a duração da bateria.

A regra mais importante do código de medição do desempenho é que ele não deve
piorar o desempenho.

Serviços como o [Lighthouse](/web/tools/lighthouse/) e o [Web Page
Test](https://www.webpagetest.org/) oferecem algumas dessas novas métricas há
algum tempo (e são, em geral, ótimas ferramentas para teste de desempenho em
recursos antes de lançá-los), mas não são executados nos
dispositivos dos usuários e não representam a experiência de desempenho real deles.

Felizmente, com a introdução de algumas novas APIs de navegadores, a medição dessas métricas em
dispositivos reais finalmente é possível sem precisar recorrer a várias soluções alternativas que podem
piorar o desempenho.

Estas novas APIs são
[`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver),
[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry)
e
[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).
Para exibir alguns códigos com essas novas APIs em ação, o seguinte exemplo de código
cria uma nova instância de `PerformanceObserver` e inscreve-se em notificações
sobre entradas de exibição (por exemplo, FP e FCP), bem como para qualquer tarefa longa que ocorrer:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType);
    console.log(entry.startTime); // DOMHighResTimeStamp
    console.log(entry.duration); // DOMHighResTimeStamp
  }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['resource', 'paint']});
```

O que o `PerformanceObserver` nos oferece e que nunca tivemos antes é a habilidade de
se inscrever em eventos de desempenho conforme eles acontecem, além de responder de
forma assíncrona. Isso substitui a antiga interface
[PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)
, que frequentemente precisava pesquisar para ver quando os dados
estavam disponíveis.

### Rastreamento de FP/FCP

Quando você tiver os dados de um evento de desempenho específico, pode enviá-los para
qualquer serviço de análise para capturar a métrica do usuário atual.
Ao usar o Google Analytics, por exemplo, você pode rastrear os tempos de primeira exibição da
seguinte forma:

```
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // `name` will be either 'first-paint' or 'first-contentful-paint'.
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);

      ga('send', 'event', {
        eventCategory: 'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true,
      });
    }
  });
  observer.observe({entryTypes: ['paint']});
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="...">
</head>
```

<aside>
  <p><strong>Importante:</strong> você deve verificar se o <code>PerformanceObserver
 </code> está registrado no <code>&lt;head&gt;</code> do documento
 antes de qualquer folha de estilo para que ele seja executado antes da FP/FCP.<p>
  <p>Isso não será mais necessário quando o Level 2 da <a
  href="https://w3c.github.io/performance-timeline/">especificação do Performance Observer
 </a> for implementado, já que ele apresenta uma <a
  href="https://w3c.github.io/performance-timeline/#dom-performanceobserverinit-
  buffered"><code>buffered</code></a> sinalização que permite acessar entradas
 de desempenho enfileiradas antes do <code>PerformanceObserver</code>
  que está sendo criado.</p>
</aside>

### Rastreamento de FMP usando elementos principais

Depois de identificar quais elementos na página são os principais, você
deve rastrear o ponto no qual eles ficam visíveis aos usuários.

Não temos uma definição padronizada para FMP (e, portanto, nenhum tipo de
entrada de desempenho). Em parte, isso é devido à dificuldade em determinar
de forma genérica o que é ser “significativo" para todas as páginas.

No entanto, no contexto de uma única página ou de um único aplicativo, geralmente é
melhor considerar a FMP como sendo o momento em que seus elementos principais ficam visíveis na
tela.

Steve Souders tem um excelente artigo chamado [Métricas personalizadas e tempo
do usuário](https://speedcurve.com/blog/user-timing-and-custom-metrics/) que
aborda em detalhes muitas técnicas para usar APIs de desempenho do navegador para determinar
no código o momento em que vários tipos de mídia ficam visíveis.

### Rastreamento de TTI

Em longo prazo, esperamos ter uma métrica TTI padronizada e exposta no
navegador por meio do PerformanceObserver. Enquanto isso, desenvolvemos um polyfill
que pode ser usado para detectar TTI atualmente e funciona em qualquer navegador compatível com a
[Long Tasks API](https://w3c.github.io/longtasks/).

O polyfill expõe um método `getFirstConsistentlyInteractive()` que retorna
uma promessa que resolve com o valor TTI. Você pode rastrear o TTI usando o Google
Analytics da seguinte forma:

```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});
```

O método `getFirstConsistentlyInteractive()` aceita uma configuração `startTime`
opcional, o que permite que você especifique um limite inferior antes do qual o aplicativo
não pode ser interativo. Por padrão, o polyfill usa
DOMContentLoaded como o horário de início, mas frequentemente é mais preciso usar
o momento em que os elementos principais ficam visíveis ou o ponto em que você
sabe que todos os seus listeners de evento foram adicionados.

Consulte a [documentação do polyfill de
TTI](https://github.com/GoogleChrome/tti-polyfill) para instruções
completas de instalação e uso.

<aside>
  <strong>Note:</strong> assim como no caso da FMP, é muito difícil especificar uma definição de métrica TTI
 que funcione perfeitamente para todas as páginas da Web. A versão que
 implementamos no polyfill funcionará para a maioria dos aplicativos, mas é possível que não funcione
 para seu aplicativo específico. É importante testá-lo antes de
 contar com ele. Se desejar mais detalhes sobre a definição e implementação do TTI
, leia o
 <a href="https://goo.gl/OSmrPk">documento de definição da métrica TTI</a>.
</aside>

### Rastreamento de tarefas longas

Mencionei acima que tarefas longas têm grandes chances de causar algum tipo de experiência
negativa do usuário (por exemplo, um gerenciador de eventos lento ou um frame perdido). É bom prestar
atenção à frequência com que isso acontece para que você possa se esforçar para minimizar o problema.

Para detectar tarefas longas no JavaScript, cria-se um novo `PerformanceObserver` e
observa-se as entradas do tipo `longtask`. Um bom recurso das entradas de tarefas longas é que
que elas contêm uma [property
attribution](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming). Dessa forma,
você pode rastrear mais facilmente qual código causou a tarefa longa:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});
```

A property attribution dirá a você qual contexto de frame foi responsável pela
tarefa longa, o que é útil para determinar se scripts iframe de terceiros estão
causando problemas. As versões futuras da especificação devem adicionar mais granularidade
e expor URL, linha e número de coluna do script. Isso será muito útil para ajudar a
determinar se seus próprios scripts estão causando lentidão.

### Rastreamento de latência de entrada

Tarefas longas que bloqueiam o thread principal podem evitar que os listeners de evento
sejam executados rapidamente. O [modelo de desempenho
RAIL](/web/fundamentals/performance/rail) ensina que, para que uma
interface do usuário pareça fluida, ela deve responder ao comando do usuário em 100 ms.
Se isso não acontecer, é importante saber o porquê.

Para detectar a latência de entrada no código, você pode comparar a data e a hora do evento com o
horário atual. Se a diferença for maior que 100 ms, você pode (e deve)
relatar.

```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    ga('send', 'event', {
      eventCategory: 'Performance Metric'
      eventAction: 'input-latency',
      eventLabel: '#subscribe:click',
      eventValue: Math.round(lag),
      nonInteraction: true,
    });
  }
});
```

Como a latência de evento é normalmente resultado de uma tarefa longa, você pode combinar
sua lógica de detecção de latência de evento com sua lógica de detecção de tarefa longa: se uma tarefa
longa estava bloqueando o thread principal ao mesmo tempo que o `event.timeStamp`, você
pode relatar também o valor de atribuição dessa tarefa longa. Isso permitiria que você
desenhasse uma linha muito clara entre a experiência de desempenho negativa e o código
que a causou.

Embora essa técnica não seja perfeita (ela não lida com listeners de eventos longos depois,
na fase de propagação, além de não funcionar com animações
de rolagem ou composição que não são executadas no thread principal), é um bom primeiro passo em direção
ao entendimento da frequência com que códigos JavaScript de execução longa tem afetado a
experiência do usuário.

## Interpretação dos dados

Depois de começar a coletar métricas de desempenho para usuários reais, você precisa
usar essas informações. Os dados de desempenho do usuário real são úteis devido a alguns
motivos principais:

* Validação de que seu aplicativo funciona conforme o esperado.
* Identificação dos locais em que o desempenho fraco está afetando negativamente as conversões
 (independentemente do que isso significa para seu aplicativo).
* Descoberta de oportunidades de melhoria da experiência e satisfação do usuário.

Algo que definitivamente vale a pena comparar é o desempenho do aplicativo em dispositivos móveis
e em computadores. O seguinte gráfico mostra a distribuição do TTI entre computadores
(em azul) e dispositivos móveis (em laranja). Como você pode ver nesse exemplo, o valor de TTI em
dispositivos móveis foi bem maior do que em computadores:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-tti-mobile-v-desktop.png"
       alt="Distribuição do TTI entre computadores e dispositivos móveis"/>
</figure>

Embora os números apresentados sejam específicos desse aplicativo (e você não deve presumir que seriam os mesmos
em seu caso sem fazer seus próprios testes), esse é um bom exemplo
de abordagem de relatório para suas métricas de uso:

#### Computadores

<table>
  <tr>
   <td><strong>Percentil</strong></td>
   <td align="right"><strong>TTI (segundos)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">2,3</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">4,7</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">8,3</td>
  </tr>
</table>

#### Dispositivos móveis

<table>
  <tr>
   <td><strong>Percentil</strong></td>
   <td align="right"><strong>TTI (segundos)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">3,9</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">8,0</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">12,6</td>
  </tr>
</table>

Detalhar seus resultados entre dispositivos móveis e computadores e analisar os dados como
distribuição permite que você tenha informações rápidas a respeito das experiências de usuários reais.
Por exemplo, na tabela acima posso ver facilmente que, para esse aplicativo,
**10% dos usuários de dispositivos móveis levaram mais de 12 segundos para se tornarem interativos!**

### Como o desempenho afeta a empresa

Uma enorme vantagem de rastrear o desempenho em ferramentas de análise é que você pode
usar esses dados para analisar como o desempenho afeta a empresa.

Se você está rastreando conclusões de metas ou conversões de comércio eletrônico em análise,
pode criar relatórios que explorem qualquer correlação entre esses dados e as métricas de
desempenho do aplicativo. Por exemplo:

* Usuários com tempos interativos mais rápidos compram mais?
* Usuários com mais tarefas longas durante a finalização de compra têm taxas mais altas de desistência?

Se correlações forem encontradas, será substancialmente mais fácil fazer a empresa
notar que desempenho é importante e deve ser priorizado.

### Abandono de carregamento

Sabemos que os usuários costumam abandonar a página se ela leva muito tempo para carregar.
Isso significa que todas as nossas métricas de desempenho compartilham do problema
de [viés de sobrevivência](https://en.wikipedia.org/wiki/Survivorship_bias). Ou seja,
os dados não incluem as métricas de carregamento de pessoas que não esperaram a página
terminar de carregar (o que normalmente significa que os números ficam muito baixos).

Embora você não possa rastrear quais seriam os números se esses usuários tivessem
esperado, você pode rastrear a frequência com que isso acontece e também por quanto tempo cada usuário
permaneceu.

Isso é um pouco difícil de fazer com o Google Analytics uma vez que biblioteca analytics.js
é carregado normalmente de forma assíncrona e pode não estar disponível quando o usuário
decide abandonar a página. No entanto, você não precisa aguardar o carregamento de analytics.js
antes de enviar dados para o Google Analytics. Você pode enviá-los diretamente por meio do
[Protocolo de avaliação](/analytics/devguides/collection/protocol/v1/).

Esse código adiciona um listener ao evento
[`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
(que é acionado se a página estiver sendo descarregada ou for para segundo plano)
e ele envia o valor do `performance.now()` nesse ponto.

```
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://www.google-analytics.com/collect';
  const GA_COOKIE = document.cookie.replace(
    /(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1');
  const TRACKING_ID = 'UA-XXXXX-Y';
  const CLIENT_ID =  GA_COOKIE || (Math.random() * Math.pow(2, 52));

  // Send the data to Google Analytics via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'v=1', 't=event', 'ec=Load', 'ea=abandon', 'ni=1',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'tid=' + TRACKING_ID,
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

Você pode usar esse código ao copiá-lo no `<head>` do documento e substituir
o marcador `UA-XXXXX-Y` pelo
[código de rastreamento](https://support.google.com/analytics/answer/1008080).

Você também deve remover esse listener quando a página
se tornar interativa ou reportará abandono por carregamento enquanto
também reporta TTI.

```
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## Otimização de desempenho e prevenção de regressão

O mais extraordinário de definir métricas centradas no usuário é que quando você otimiza dessa forma,
inevitavelmente também melhora a experiência do usuário.

Uma das formas mais simples de melhorar o desempenho é simplesmente enviar menos códigos JavaScript
para o cliente, mas nos casos em que reduzir o tamanho do código não é uma opção, é
essencial que você pense *como* você fornece o JavaScript.

### Otimização de FP/FCP

Você pode diminuir o tempo da primeira exibição e da primeira exibição significativa removendo qualquer script ou folha de estilo
que bloqueie a renderização do `<head>` do documento.

Ao dedicar tempo à identificação do conjunto mínimo de estilos necessários para mostrar ao usuário
que "a página está funcionando" e ao colocá-los inline no `<head>` (ou usando o [push do
servidor HTTP/2](/web/fundamentals/performance/http2/#server_push)), você pode conseguir
tempos de primeira exibição incrivelmente rápidos.

O [padrão shell do aplicativo](/web/updates/2015/11/app-shell) é um ótimo exemplo de
como fazer isso para [Progressive Web Apps](/web/progressive-web-apps/).

### Otimização de FMP/TTI

Depois de identificar os elementos de IU mais importantes de sua página (os elementos
principais), verifique se o carregamento inicial de script contém apenas o
código necessário para renderizar esses elementos e torná-los interativos.

Qualquer código não relacionado aos elementos principais que esteja incluído no pacote
JavaScript inicial aumentará o tempo até a interatividade. Não há motivo
para forçar os dispositivos dos usuários a fazer o download e analisar códigos JavaScript de que eles não
precisam imediatamente.

Como regra geral, você deve tentar minimizar ao máximo o tempo
entre a FMP e o TTI. Nos casos em que não seja possível minimizar esse tempo,
é absolutamente essencial que suas interfaces deixem bem claro que a página ainda não está
interativa.

Uma das experiências mais frustrantes para um usuário é tocar em um elemento e
nada acontecer.

### Prevenção de tarefas longas

Ao dividir seu código e priorizar a ordem em que ele é carregado, você
pode não só tornar suas páginas interativas mais rapidamente, mas também reduzir as tarefas longas.
Assim, poderá ter menos latência de entrada e menos frames lentos.

Além de dividir o código em arquivos separados, você também pode dividir
blocos grandes de código síncrono em blocos menores que podem ser executados
de forma assíncrona ou ser
[adiados para o próximo ponto ocioso](/web/updates/2015/08/using-requestidlecallback).
Ao executar essa lógica de forma assíncrona em blocos menores, você libera espaço no
thread principal para o navegador responder ao comando do usuário.

Por fim, você deve verificar se está testando o código de terceiros e identificando
todos os códigos de execução lenta. Anúncios ou scripts de rastreamento de terceiros que
causam muitas tarefas longas acabam causando mais transtornos do que benefícios
à empresa.

## Prevenção de regressão

Este artigo concentrou-se na medição de desempenho em usuários reais e
, embora seja verdade que os dados RUM são os que realmente importam,
dados de laboratório ainda são cruciais para assegurar que seu aplicativo tenha um bom desempenho (e que não tenha
regressões) antes do lançamento de novos recursos. Testes de laboratório são ideais para detecção de
regressão porque são realizados em um ambiente controlado e são muito menos propensos à
variabilidade aleatória dos testes RUM.

Ferramentas como [Lighthouse](/web/tools/lighthouse/) e [Web Page
Test](https://www.webpagetest.org/) podem ser integradas ao servidor
de integração contínua, e você pode escrever testes que podem causar falha da versão se as métricas principais
regredirem ou ficarem abaixo de determinado limite.

E para códigos já lançados, você pode adicionar [alertas
personalizados](https://support.google.com/analytics/answer/1033021) para informarem se
houver picos inesperados na ocorrência de eventos de desempenho negativo.
Isso pode acontecer, por exemplo, se um terceiro lança uma nova versão de um
de seus serviços e repentinamente seus usuários começam a ver um aumento significativo nas tarefas
longas.

Para impedir regressões com sucesso, você precisa testar o desempenho tanto no
laboratório quanto no ambiente real a cada novo lançamento de recurso.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-test-cycle.png"
       alt="Um fluxograma RUM e testes de laboratório no processo de lançamento"/>
</figure>

## Conclusão e próximos passos

Fizemos avanços significativos no ano passado com relação à exposição de métricas centradas no usuário
para desenvolvedores no navegador. No entanto, ainda não acabamos e há muito mais em nossos
planos.

Gostaríamos de padronizar as métricas de tempo para interação e elemento principal para que os
desenvolvedores não tenham que fazer suas próprias medições ou depender de polyfills. Também
gostaríamos de facilitar para os desenvolvedores a atribuição de frames perdidos e latência de
entrada para tarefas longas específicas e o código que as causou.

Embora tenhamos muito trabalho a fazer, estamos empolgados com o avanço que fizemos. Com
novas APIs como `PerformanceObserver` e as tarefas longas com compatibilidade nativa com o
navegador, os desenvolvedores finalmente têm o básico necessário para medir o desempenho
de usuários reais sem comprometer a experiência.

As métricas mais importantes são as que representam experiências de usuários reais
, e nós queremos facilitar ao máximo para os desenvolvedores
a tarefa de encantar seus usuários e criar grandes aplicativos.

## Fique conectado

{% include "web/_shared/helpful.html" %}

Reporte problemas de especificação:

* [https://github.com/w3c/longtasks/issues](https://github.com/w3c/longtasks/issues)
* [https://github.com/WICG/paint-timing/issues](https://github.com/WICG/paint-timing/issues)
* [https://github.com/w3c/performance-timeline/issues](https://github.com/w3c/performance-timeline/issues)

Reporte problemas de polyfill:

* [https://github.com/GoogleChrome/tti-polyfill/issues](https://github.com/GoogleChrome/tti-polyfill/issues)

Faça perguntas:

* [progressive-web-metrics@chromium.org](mailto:progressive-web-metrics@chromium.org)
* [public-web-perf@w3.org](mailto:public-web-perf@w3.org)

Expresse seu apoio sobre novas propostas de API:

* [https://github.com/w3c/charter-webperf/issues](https://github.com/w3c/charter-webperf/issues)
