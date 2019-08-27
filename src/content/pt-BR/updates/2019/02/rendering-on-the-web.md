project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Renderizando na Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

Como desenvolvedores, somos frequentemente confrontados com decisões que
afetarão toda a arquitetura de nossos aplicativos. Uma das principais decisões
que os desenvolvedores da web devem tomar é onde implementar lógica e
renderização em seus aplicativos. Isso pode ser difícil, pois existem várias
maneiras diferentes de criar um site.

Nossa compreensão desse espaço é informada por nosso trabalho no Chrome,
conversando com sites grandes nos últimos anos. Em termos gerais, incentivamos
os desenvolvedores a considerar a renderização do servidor ou a estática em uma
abordagem de reidratação completa.

Para entender melhor as arquiteturas que escolhemos quando tomamos essa decisão,
precisamos ter um entendimento sólido de cada abordagem e uma terminologia
consistente a ser usada ao falar sobre elas. As diferenças entre essas
abordagens ajudam a ilustrar as vantagens e desvantagens da renderização na Web
pelas lentes do desempenho.

## Terminologia {: #terminology }

**Renderização**

- **SSR:** renderização no servidor - renderizando um aplicativo universal ou do
lado do cliente em HTML no servidor.
- **CSR:** renderização do lado do cliente - renderizando um aplicativo em um
navegador, geralmente usando o DOM.
- **Reidratação:** "inicializando" as visualizações JavaScript no cliente, para
que reutilizem a árvore e os dados DOM do HTML renderizado pelo servidor.
- **Pré-renderização:** executando um aplicativo do lado do cliente no momento
da construção para capturar seu estado inicial como HTML estático.

**atuação**

- **TTFB:** Tempo até o primeiro byte - visto como o tempo entre clicar em um
link e o primeiro pedaço de conteúdo que entra.
- **FP:** Primeira pintura - a primeira vez que um pixel é obtido fica visível
para o usuário.
- **FCP:** Primeira pintura com conteúdo - o momento em que o conteúdo
solicitado (corpo do artigo, etc.) se torna visível.
- **TTI:** Time To Interactive - o horário em que uma página se torna interativa
(eventos conectados, etc).

## Renderização do servidor {: #server-rendering }

*A renderização do servidor gera o HTML completo para uma página no servidor em
resposta à navegação. Isso evita viagens de ida e volta adicionais para busca e
modelagem de dados no cliente, uma vez que são tratadas antes que o navegador
obtenha uma resposta.*

A renderização do servidor geralmente produz uma [primeira
pintura](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
rápida (FP) e uma [primeira pintura com
conteúdo](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP). A execução da lógica e da renderização da página no servidor evita o
envio de muito JavaScript para o cliente, o que ajuda a obter um
[tempo](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
rápido [para
interatividade](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
(TTI). Isso faz sentido, já que com a renderização do servidor você está apenas
enviando texto e links para o navegador do usuário. Essa abordagem pode
funcionar bem para um amplo espectro de condições de dispositivo e de rede e
abre otimizações interessantes do navegador, como a análise de documentos de
streaming.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Com a renderização do servidor, é improvável que os usuários permaneçam
aguardando o processamento do JavaScript vinculado à CPU antes de poderem usar
seu site. Mesmo quando [JS de
terceiros](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
não pode ser evitado, o uso da renderização do servidor para reduzir seus
próprios [custos de JS
de](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
terceiros pode fornecer mais "
[orçamento](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
" para o resto. No entanto, há uma desvantagem principal nessa abordagem: gerar
páginas no servidor leva tempo, o que geralmente pode resultar em um
[tempo](https://en.wikipedia.org/wiki/Time_to_first_byte) mais lento [para o
primeiro byte](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB).

Se a renderização do servidor é suficiente para o seu aplicativo depende muito
do tipo de experiência que você está construindo. Há um debate de longa data
sobre os aplicativos corretos de renderização do servidor versus renderização do
lado do cliente, mas é importante lembrar que você pode optar por usar a
renderização do servidor para algumas páginas e outras não. Alguns sites
adotaram técnicas de renderização híbrida com sucesso.
[O](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
servidor
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
processa suas páginas de destino relativamente estáticas, enquanto
[pré](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
-
[busca](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
o JS para páginas com muita interação, dando a essas páginas mais pesadas,
processadas pelo cliente, uma melhor chance de carregar rapidamente.

Muitas estruturas, bibliotecas e arquiteturas modernas tornam possível
renderizar o mesmo aplicativo no cliente e no servidor. Essas técnicas podem ser
usadas para renderização do servidor, no entanto, é importante observar que as
arquiteturas em que a renderização ocorre no servidor ***e*** no cliente são sua
própria classe de solução com características e vantagens muito diferentes de
desempenho. Os usuários do React podem usar [renderToString
()](https://reactjs.org/docs/react-dom-server.html) ou soluções criadas sobre
ele, como [Next.js](https://nextjs.org) para renderização do servidor. Os
usuários do Vue podem consultar o [guia de renderização](https://ssr.vuejs.org)
do [servidor](https://ssr.vuejs.org) do Vue ou o [Nuxt](https://nuxtjs.org) .
Angular tem [Universal](https://angular.io/guide/universal) . As soluções mais
populares empregam alguma forma de hidratação, portanto, esteja ciente da
abordagem em uso antes de selecionar uma ferramenta.

## Renderização estática {: #static-rendering }

[A renderização
estática](https://frontarm.com/articles/static-vs-server-rendering/) ocorre no
momento da construção e oferece uma primeira pintura rápida, uma primeira
pintura com conteúdo e um tempo para interatividade - assumindo que a quantidade
de JS do lado do cliente é limitada. Diferentemente da renderização do servidor,
ele também consegue obter um tempo de espera para o primeiro byte
consistentemente rápido, já que o HTML de uma página não precisa ser gerado
rapidamente. Geralmente, a renderização estática significa produzir um arquivo
HTML separado para cada URL antes do tempo. Com as respostas HTML sendo geradas
com antecedência, as renderizações estáticas podem ser implantadas em várias
CDNs para aproveitar o cache de borda.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Soluções para renderização estática de todas as formas e tamanhos. Ferramentas
como o [Gatsby](https://www.gatsbyjs.org) são projetadas para fazer com que os
desenvolvedores sintam que seu aplicativo está sendo renderizado dinamicamente,
e não gerado como uma etapa de construção. Outros, como
[Jekyl](https://jekyllrb.com) e [Metalsmith,](https://metalsmith.io) adotam sua
natureza estática, fornecendo uma abordagem mais orientada a modelos.

Uma das desvantagens da renderização estática é que arquivos HTML individuais
devem ser gerados para cada URL possível. Isso pode ser desafiador ou até
inviável quando você não pode prever quais serão esses URLs antes do tempo ou
para sites com um grande número de páginas exclusivas.

Os usuários do React podem estar familiarizados com a [exportação estática
do](https://nextjs.org/learn/excel/static-html-export/)
[Gatsby](https://www.gatsbyjs.org) ,
[Next.js](https://nextjs.org/learn/excel/static-html-export/) ou
[Navi](https://frontarm.com/navi/) - tudo isso facilita a criação usando
componentes. No entanto, é importante entender a diferença entre renderização
estática e pré-renderização: as páginas renderizadas estáticas são interativas
sem a necessidade de executar muito JS do lado do cliente, enquanto a
pré-renderização aprimora a Primeira Pintura ou a Primeira Pintura Contenciosa
de um Aplicativo de Página Única que deve ser inicializado em o cliente para que
as páginas sejam verdadeiramente interativas.

Se você não tiver certeza se uma determinada solução é renderização estática ou
pré-renderização, tente este teste: desative o JavaScript e carregue as páginas
da web criadas. Para páginas renderizadas estaticamente, a maior parte da
funcionalidade ainda existe sem o JavaScript ativado. Para páginas
pré-renderizadas, ainda pode haver algumas funcionalidades básicas, como links,
mas a maior parte da página será inerte.

Outro teste útil é diminuir a velocidade da sua rede usando o Chrome DevTools e
observar quanto JavaScript foi baixado antes de uma página se tornar interativa.
A pré-renderização geralmente requer mais JavaScript para ser interativo, e esse
JavaScript tende a ser mais complexo do que a abordagem de [Aprimoramento
Progressivo](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
usada pela renderização estática.

## Renderização de servidor x renderização estática {: #server-vs-static }

A renderização do servidor não é uma tarefa fácil - sua natureza dinâmica pode
resultar em custos [indiretos significativos de
computação](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
. Muitas soluções de renderização de servidor não descarregam cedo, podem
atrasar o TTFB ou dobrar os dados enviados (por exemplo, estado embutido usado
por JS no cliente). Em React, renderToString () pode ser lento, pois é síncrono
e de thread único. Obter a renderização correta do servidor pode envolver a
localização ou construção de uma solução para [armazenamento em cache de
componentes](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, gerenciamento do consumo de memória, aplicação de técnicas de
[memorização](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
e muitas outras preocupações. Geralmente, você está processando / reconstruindo
o mesmo aplicativo várias vezes - uma vez no cliente e outra no servidor. Só
porque a renderização do servidor pode fazer com que algo apareça mais cedo, de
repente, não significa que você tem menos trabalho a fazer.

A renderização do servidor produz HTML sob demanda para cada URL, mas pode ser
mais lenta do que apenas servir conteúdo renderizado estático. Se você pode
colocar o trabalho adicional, a renderização do servidor + o [cache
HTML](https://freecontent.manning.com/caching-in-react/) podem reduzir bastante
o tempo de renderização do servidor. A vantagem da renderização do servidor é a
capacidade de extrair mais dados "ativos" e responder a um conjunto mais
completo de solicitações do que é possível com a renderização estática. As
páginas que requerem personalização são um exemplo concreto do tipo de
solicitação que não funcionaria bem com a renderização estática.

A renderização do servidor também pode apresentar decisões interessantes ao
criar um [PWA](https://developers.google.com/web/progressive-web-apps/) . É
melhor usar o cache do [trabalhador de serviço
de](https://developers.google.com/web/fundamentals/primers/service-workers/)
página inteira ou apenas partes de conteúdo individuais da renderização do
servidor?

## Renderização no lado do cliente (CSR) {: #csr }

*Renderização no lado do cliente (CSR) significa renderizar páginas diretamente
no navegador usando JavaScript. Toda lógica, busca de dados, modelagem e
roteamento são tratados no cliente e não no servidor.*

Pode ser difícil obter e manter a renderização do lado do cliente rápida para
dispositivos móveis. Ele pode abordar o desempenho da renderização pura do
servidor, fazendo um trabalho mínimo, mantendo um [orçamento JavaScript
apertado](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144) e
agregando valor no [menor](https://en.wikipedia.org/wiki/Round-trip_delay_time)
número possível de [RTTs](https://en.wikipedia.org/wiki/Round-trip_delay_time) .
Scripts e dados críticos podem ser entregues mais cedo usando [HTTP / 2 Server
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) ou
`<link rel=preload>` , que faz com que o analisador funcione mais cedo. [Vale
a](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
pena avaliar padrões como o
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
para garantir que as navegações iniciais e subsequentes sejam instantâneas.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

A principal desvantagem da renderização no lado do cliente é que a quantidade de
JavaScript necessária tende a aumentar à medida que o aplicativo cresce. Isso se
torna especialmente difícil com a adição de novas bibliotecas JavaScript,
polyfills e código de terceiros, que competem pelo poder de processamento e
geralmente precisam ser processados antes que o conteúdo de uma página seja
renderizado. As experiências criadas com o CSR, que dependem de grandes pacotes
de JavaScript, devem considerar [a divisão agressiva de
código](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
e garantir o carregamento lento do JavaScript - "servem apenas o que você
precisa, quando precisa". Para experiências com pouca ou nenhuma interatividade,
a renderização do servidor pode representar uma solução mais escalável para
esses problemas.

Para as pessoas que constroem um Aplicativo de Página Única, identificar as
partes principais da Interface do Usuário compartilhadas pela maioria das
páginas significa que você pode aplicar a técnica de [cache do Shell de
Aplicativo](https://developers.google.com/web/updates/2015/11/app-shell) .
Combinado com os trabalhadores de serviço, isso pode melhorar drasticamente o
desempenho percebido em visitas repetidas.

## Combinando renderização de servidor e CSR via reidratação {: #rehydration }

Muitas vezes referida como Universal Rendering ou simplesmente "SSR", essa
abordagem tenta suavizar as compensações entre a renderização do lado do cliente
e a renderização do servidor, fazendo as duas coisas. Solicitações de navegação,
como carregamentos ou recarregamentos de páginas inteiras, são tratadas por um
servidor que renderiza o aplicativo em HTML; o JavaScript e os dados usados para
renderização são incorporados ao documento resultante. Quando implementado com
cuidado, ele obtém uma primeira pintura rápida e contenciosa, exatamente como a
renderização do servidor, e “pega” renderizando novamente no cliente usando uma
técnica chamada [(re)
hidratação](https://docs.electrode.io/guides/general/server-side-data-hydration)
. Esta é uma solução nova, mas pode ter algumas desvantagens consideráveis de
desempenho.

A principal desvantagem do SSR com reidratação é que ele pode ter um impacto
negativo significativo no Time To Interactive, mesmo que melhore o First Paint.
As páginas do SSR geralmente parecem enganosamente carregadas e interativas, mas
não podem realmente responder à entrada até que o JS do lado do cliente seja
executado e os manipuladores de eventos tenham sido anexados. Isso pode levar
segundos ou até minutos no celular.

Talvez você tenha experimentado isso sozinho - por um período de tempo após
parecer que uma página foi carregada, clicar ou tocar não faz nada. Isso
rapidamente se torna frustrante ... *“Por que nada está acontecendo? Por que não
consigo rolar?*

### Um problema de reidratação: um aplicativo pelo preço de dois {: #rehydration-issues }

Problemas de reidratação geralmente podem ser piores do que a interatividade
atrasada devido ao JS. Para que o JavaScript do lado do cliente possa "capturar"
com precisão onde o servidor parou sem precisar solicitar novamente todos os
dados que o servidor usou para renderizar seu HTML, as soluções atuais de SSR
geralmente serializam a resposta de uma interface do usuário dependências de
dados no documento como tags de script. O documento HTML resultante contém um
alto nível de duplicação:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Como você pode ver, o servidor está retornando uma descrição da interface do
usuário do aplicativo em resposta a uma solicitação de navegação, mas também
está retornando os dados de origem usados para compor essa interface do usuário
e uma cópia completa da implementação da interface do usuário que é inicializada
no cliente . Somente depois que o bundle.js termina o carregamento e a execução,
essa interface se torna interativa.

As métricas de desempenho coletadas de sites reais usando reidratação SSR
indicam que seu uso deve ser fortemente desencorajado. Por fim, o motivo se
resume à experiência do usuário: é extremamente fácil acabar deixando os
usuários em um "vale misterioso".

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

Há esperança para SSR com reidratação, no entanto. A curto prazo, apenas o uso
de SSR para conteúdo altamente armazenável em cache pode reduzir o atraso do
TTFB, produzindo resultados semelhantes aos da pré-renderização. Reidratar
[gradualmente](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, progressivamente ou parcialmente pode ser a chave para tornar essa técnica
mais viável no futuro.

## Renderização do servidor de streaming e reidratação progressiva {: #progressive-rehydration }

A renderização do servidor teve vários desenvolvimentos nos últimos anos.

[A renderização do servidor de
streaming](https://zeit.co/blog/streaming-server-rendering-at-spectrum) permite
enviar HTML em partes que o navegador pode processar progressivamente à medida
que é recebido. Isso pode fornecer uma primeira pintura rápida e uma primeira
pintura com conteúdo, à medida que a marcação chega aos usuários mais
rapidamente. No React, os fluxos sendo assíncronos em [renderToNodeStream
()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) -
comparados com o renderToString síncrono - significa que a contrapressão é
tratada bem.

Também vale a pena observar a reidratação progressiva, e algo que o React vem
[explorando](https://github.com/facebook/react/pull/14717) . Com essa abordagem,
partes individuais de um aplicativo renderizado pelo servidor são
"inicializadas" ao longo do tempo, em vez da abordagem comum atual de
inicializar o aplicativo inteiro de uma só vez. Isso pode ajudar a reduzir a
quantidade de JavaScript necessária para tornar as páginas interativas, pois a
atualização no lado do cliente de partes de baixa prioridade da página pode ser
adiada para evitar o bloqueio do encadeamento principal. Também pode ajudar a
evitar uma das armadilhas mais comuns da Reidratação de SSR, onde uma árvore DOM
renderizada pelo servidor é destruída e depois reconstruída imediatamente -
geralmente porque a inicial síncrona do lado do cliente processa os dados
necessários que ainda não estão prontos, talvez aguardando Promise resolução.

### Reidratação parcial {: #partial-rehydration }

A reidratação parcial se mostrou difícil de implementar. Essa abordagem é uma
extensão da idéia de reidratação progressiva, onde são analisadas as peças
individuais (componentes / vistas / árvores) a serem reidratadas
progressivamente e identificadas aquelas com pouca interatividade ou nenhuma
reatividade. Para cada uma dessas partes principalmente estáticas, o código
JavaScript correspondente é então transformado em referências inertes e
funcionalidade decorativa, reduzindo sua área de cobertura do lado do cliente
para quase zero. A abordagem de hidratação parcial vem com seus próprios
problemas e compromissos. Isso apresenta alguns desafios interessantes para o
armazenamento em cache, e a navegação no lado do cliente significa que não
podemos assumir que o HTML renderizado pelo servidor, pois partes inertes do
aplicativo estarão disponíveis sem o carregamento completo da página.

### Renderização trissomórfica {: #trisomorphic }

Se [os trabalhadores do
serviço](https://developers.google.com/web/fundamentals/primers/service-workers/)
são uma opção para você, a renderização “trisomórfica” também pode ser
interessante. É uma técnica em que você pode usar a renderização do servidor de
streaming para navegações iniciais / não JS e, em seguida, fazer com que o
responsável pelo serviço assuma a renderização de HTML para navegações após a
instalação. Isso pode manter os componentes e modelos armazenados em cache
atualizados e permite navegações no estilo SPA para renderizar novas
visualizações na mesma sessão. Essa abordagem funciona melhor quando você pode
compartilhar o mesmo código de modelo e roteamento entre o servidor, a página do
cliente e o trabalhador do serviço.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## Considerações sobre SEO {: #seo }

As equipes geralmente levam em consideração o impacto do SEO ao escolher uma
estratégia para renderização na web. A renderização do servidor geralmente é
escolhida por oferecer uma experiência de "aparência completa" que os
rastreadores podem interpretar com facilidade. Os rastreadores [podem entender o
JavaScript](https://web.dev/discoverable/how-search-works) , mas geralmente há
[limitações que](/search/docs/guides/rendering) merecem atenção na forma como
são renderizados. A renderização do lado do cliente pode funcionar, mas muitas
vezes não sem testes e trabalhos adicionais. Mais recentemente, [a renderização
dinâmica](/search/docs/guides/dynamic-rendering) também se tornou uma opção que
vale a pena considerar se sua arquitetura é fortemente orientada pelo JavaScript
do lado do cliente.

Em caso de dúvida, a ferramenta [Teste de compatibilidade com dispositivos
móveis](https://search.google.com/test/mobile-friendly) é inestimável para
testar se a abordagem escolhida faz o que você espera. Ele mostra uma
visualização visual de como qualquer página aparece no rastreador do Google, o
conteúdo HTML serializado encontrado (após a execução do JavaScript) e quaisquer
erros encontrados durante a renderização.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## Finalizando ... {: #wrapup }

Ao decidir sobre uma abordagem de renderização, meça e entenda quais são seus
gargalos. Considere se a renderização estática ou a renderização do servidor
pode levá-lo a 90% do caminho. Não há problema em enviar HTML com JS mínimo para
obter uma experiência interativa. Aqui está um infográfico útil que mostra o
espectro servidor-cliente:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Créditos {: #credits }

Obrigado a todos por suas críticas e inspiração:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson e Sebastian
Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
