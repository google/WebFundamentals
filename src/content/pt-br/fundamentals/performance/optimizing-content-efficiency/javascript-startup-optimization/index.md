project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mantenha um custo baixo de transmissão e análise/compilação de sua rede para JavaScript para garantir que as páginas interajam rapidamente.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# Otimização da inicialização em JavaScript {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Ao criar sites que dependem fortemente de JavaScript, às vezes pagamos pelo que
enviamos de maneiras que nem sempre visualizamos com facilidade. Neste artigo,
abordaremos por que um pouco de **disciplina** pode ser útil se você quiser que o site carregue e seja
interativo com rapidez em dispositivos móveis. Oferecer menos JavaScript significa menos
tempo para transmissão de rede, menos tempo gasto para descompactar códigos e menos tempo
para analisar e compilar esse JavaScript.

## Rede

Quando a maioria dos desenvolvedores pensa no custo de JavaScript, é em
termos de **custo de download e execução**. Quanto mais lenta for a conexão de um usuário,
mais tempo demorará para enviar mais bytes de JavaScript pela rede.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="Quando um navegador solicita um
recurso, esse recurso precisa ser recuperado e descompactado. No caso
de recursos como JavaScript, eles precisam ser analisados e compilados antes da
execução."/>

Isso pode ser um problema, até mesmo em países de primeiro mundo, já que o **tipo de conexão
de rede eficaz** que um usuário tem talvez não seja 3G, 4G ou Wi-Fi. O usuário pode estar usando uma rede
Wi-Fi pública, mas na realidade estar conectado a um ponto de acesso de rede móvel com velocidades de 2G.

É possível **reduzir** o custo de transferência de rede do JavaScript com estas opções:

* **Somente enviar o código que um usuário precisa**.
    * Use a [divisão de código](/web/updates/2017/06/supercharged-codesplit) para dividir
      seu JavaScript entre o que é e não é essencial. Os pacotes de módulo,
      como o [webpack](https://webpack.js.org), são compatíveis com a
      [divisão de código](https://webpack.js.org/guides/code-splitting/).
    * Carregar lentamente códigos não críticos.
* **Minificação**
    * Use [UglifyJS](https://github.com/mishoo/UglifyJS) para
      [minificar](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)
      o código ES5.
    * Use [babel-minify](https://github.com/babel/minify) ou
      [uglify-es](https://www.npmjs.com/package/uglify-es) para minificar ES2015+.
* **Compressão**
    * No mínimo, use
      [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)
      para compactar recursos baseados em texto.
    * Considere usar
      [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
      ~[q11](https://twitter.com/paulcalvano/status/924660429846208514). O Brotli
      tem melhor desempenho em taxas de compressão do que o gzip. Ele ajudou a CertSimple a economizar
      [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)
      no tamanho de bytes de JS compactado e a LinkedIn a economizar
      [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)
      nos tempos de carregamento.
* **Remover código não utilizado**.
    * Identifique códigos que podem ser removidos ou lentamente carregados
      com a [cobertura de código
      do DevTools](/web/updates/2017/04/devtools-release-notes#coverage).
    * Use
      [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
      e browserlist para evitar transcompilar recursos que já existem em navegadores modernos.
      Para desenvolvedores avançados, a [análise cuidadosa dos pacotes de
      webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer) talvez seja útil
      para identificar onde cortar dependências irrelevantes.
    * Para extrair o código, confira
      [tree-shaking](https://webpack.js.org/guides/tree-shaking/), os plug-ins de corte de biblioteca e otimizações avançadas da [Closure
      Compiler](/closure/compiler/)
      como o
      [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash) ou
      o
      [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js)
      da webpack para bibliotecas como Moment.js.
* **Armazenar código em cache para reduzir as viagens da rede.**
    * Use [HTTP
      o armazenamento em cache](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
      para garantir que os navegadores armazenem as respostas em cache de maneira eficaz. Determine o ciclo de vida
      ideal para scripts (max-age) e forneça tokens de validação (ETag) para evitar
      a transferência de bytes inalterados.
    * O armazenamento em cache do service worker pode tornar a rede do seu app resiliente e oferecer
      acesso ávido a recursos como o [cache de código
      do V8](https://v8project.blogspot.com/2015/07/code-caching.html).
    * Use o armazenamento em cache de longo prazo para não precisar recuperar novamente recursos que não
      mudaram. Se for usar o Webpack, consulte o [hash
      de nome de arquivo](https://webpack.js.org/guides/caching/).

## Analisar/compilar

Após o download, um dos custos **mais pesados** de JavaScript é quando um mecanismo de
JS **analisa/compila** esse código. No [Chrome
DevTools](/web/tools/chrome-devtools/), a análise e a compilação fazem parte do
tempo de “Script" amarelo no painel “Performance”.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

As guias “Bottom-Up” e “Call Tree” mostram os tempos exatos de análise/compilação:

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Painel
“Performance” > “Bottom-Up” do Chrome DevTools. Com a opção “Runtime Call Stats” do V8 ativada,
podemos ver o tempo gasto nas fases Parse e Compile </figcaption> </figure>

Note: a compatibilidade do painel “Performance” com “Runtime Call Stats” atualmente está na fase experimental.
Para ativar, acesse chrome://flags/#enable-devtools-experiments -> reinicie o Chrome ->
acesse DevTools -> Settings -> Experiments -> aperte Shift 6 vezes -> marque a opção
chamada `Timeline: V8 Runtime Call Stats on Timeline` e feche e reabra o DevTools.

Mas, por que isso é importante?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

Passar muito tempo analisando/compilando um código pode atrasar muito a rapidez com a qual um usuário
pode interagir com o site. Quanto mais você enviar JavaScript, mais demorado será para
analisar e compilá-lo antes de o site ficar interativo.

> Byte por byte, **o JavaScript é mais caro para o navegador processar do que
> imagens ou fontes da Web de mesmo tamanho** — Tom Dale

Em comparação ao JavaScript, há inúmeros custos envolvidos no processamento de
imagens de mesmo tamanho (elas ainda precisam ser decodificadas!), mas, no
hardware móvel médio, é mais provável que o JS afete negativamente a interatividade da página.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>Bytes de JavaScript
e imagem possuem custos muito diferentes. As imagens geralmente não bloqueiam o thread
principal nem impedem que as interfaces fiquem interativas enquanto são decodificadas e
rasterizadas. No entanto, o JS pode atrasar a interatividade por causa da análise, da compilação e dos
custos de execução.</figcaption> </figure>

Quando falamos sobre a lentidão da análise e compilação, estamos
falando sobre o smartphones **medianos** aqui. É importante levar esse contexto em consideração. **Usuários médios podem ter smartphones
com CPUs e GPUs lentas, sem cache L2/L3 e inclusive com memória
limitada.**

> Nem sempre os recursos de rede e do dispositivo se equiparam. Um usuário
> com uma conexão Fiber incrível não necessariamente tem a melhor CPU para
> analisar e avaliar o JavaScript enviado para seu dispositivo. O inverso
> também é válido, uma conexão de rede terrível, mas uma CPU megarrápida. — Kristofer
> Baxter, LinkedIn

Abaixo, vemos o custo de analisar aproximadamente 1 MB de JavaScript descompactado (simples) em um
hardware de baixa e alta capacidade. **Há uma diferença de 2 a 5x no tempo para analisar/compilar
código entre os smartphones mais rápidos do mercado e os smartphones medianos**.

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>Este gráfico
destaca os tempos de análise de um pacote de 1 MB de JavaScript (aproximadamente 250 KB comprimido com zgip) em
dispositivos móveis e computadores desktop de classes diferentes. Ao analisar o custo de
análise, é preciso considerar os números não comprimidos, por exemplo, aproximadamente 250 KB de JS comprimido com gzip
descompacta para aproximadamente 1 MB de código.</figcaption> </figure>

O que ocorre com um site real, tipo CNN.com?

**No iPhone 8 de alta capacidade, leva apenas cerca de 4 segundos para analisar/compilar o JS da CNN em comparação
a cerca de 13 segundos em um smartphone mediano (Moto G4)**. Isso pode afetar significativamente a
rapidez com a qual um usuário pode interagir completamente com esse site.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>Acima,
vemos os tempos de análise comparando o desempenho do chip A11 Bionic da Apple ao
Snapdragon 617 no hardware mais mediano de um dispositivo Android.</figcaption> </figure>

Isso destaca a importância de testar em hardware **mediano** (como o Moto
G4) em vez de testar somente no smartphone que está no seu bolso. No entanto, o contexto
é importante: **otimize para as condições de dispositivo e rede dos seus usuários.**

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>O Google
Analytics pode oferecer insights sobre as <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">classes
de dispositivos móveis</a> que usuários reais usam para acessar seu site. Isso pode
oferecer oportunidades para entender as limitações reais de CPU/GPU
que os usuários possuem.</figcaption> </figure>


**Será que realmente estamos enviando JavaScript demais? Sim, é possível :)**

Ao usar o HTTP Archive (os principais 500 mil sites) para analisar o estado de [JavaScript em
dispositivos móveis](http://beta.httparchive.org/reports/state-of-javascript#bytesJs), vemos
que 50% dos sites levam mais de 14 segundos para ficarem interativos. Esses sites gastam
até 4 segundos apenas para analisar e compilar JS.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

Leve em consideração o tempo que leva para recuperar e processar o JS e outros recursos e
talvez não seja surpreendente que usuários aguardem um pouco até acharem que
páginas estão prontas para serem usadas. Certamente podemos melhorar isso.

**Remover o JavaScript que não é essencial para as páginas pode reduzir os
tempos de transmissão, análise e compilação intensivas da CPU, além da possível sobrecarga da memória. Isso
também ajuda a acelerar a interatividade das suas páginas.**

## Tempo de execução

A análise e a compilação não são as únicas a terem um custo. A **execução de JavaScript**
(executar o código após ser analisado/compilado) é uma das operações que precisa ocorrer
no thread principal. Tempos de execução longos também podem atrasar a rapidez com a qual um usuário pode
interagir com o site.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> Se o script for executado por mais de 50 ms, o tempo de interação é atrasado pela
> quantia *total* de tempo que leva para fazer o download, compilar e executar o JS —
> Alex Russell

Para resolver esse problema, é bom ter o JavaScript em **pequenos pedaços** para evitar
o bloqueio do thread principal. Descubra se você pode reduzir a quantidade de trabalho
feito durante a execução.

## Outros custos

O JavaScript pode afetar o desempenho da página de outras formas:

* Memória. As páginas podem ficar instáveis ou pausar frequentemente devido à GC (coleta de
  lixo). Quando um navegador recupera a memória, a execução de JS é pausada para que um
  navegador que coleta lixo com frequência possa pausar a execução com uma frequência maior do que a
  desejada. Evite [vazamentos de memória](/web/tools/chrome-devtools/memory-problems/)
  e pausas frequentes de GC para ter páginas sem instabilidade.
* Durante o tempo de execução, o JavaScript de longa duração pode bloquear o thread principal, resultando em
  páginas não responsivas. Quebrar o trabalho em pedaços menores (usando
  <code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  ou <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  para agendamento) pode minimizar problemas de responsividade.

## Padrões para reduzir o custo de entrega de JavaScript

Quando se está tentando manter os tempos de análise/compilação e transmissão da rede para JavaScript
lentos, há padrões que podem ajudar, como agrupamento baseado em rotas ou
[PRPL](/web/fundamentals/performance/prpl-pattern/).

### PRPL

PRPL (sigla para push, renderizar, pré-armazenar em cache e carregar lentamente) é um padrão que otimiza a
interatividade pelo armazenamento em cache e pela divisão de código agressivos:

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

Vamos conferir seu impacto.

Analisamos o tempo de carregamento de sites conhecidos para dispositivos móveis e Progressive Web Apps usando o
Runtime Call Stats do V8. Como podemos ver, o tempo de análise (mostrado em laranja) é uma
porção significativa do tempo gasto por muitos destes sites:

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

[Wego](https://www.wego.com), um site que usa PRPL, consegue manter um tempo de
análise baixo para suas rotas, obtendo interatividade muito rapidamente. Muitos dos outros sites
acima adotaram a divisão de código e os orçamentos de desempenho para tentar reduzir os custos
de JS.


### Bootstrap progressivo

Muitos sites otimizam a visibilidade do conteúdo em detrimento da interatividade. Para ter
uma primeira gravação rápida com pacotes grandes de JavaScript, os desenvolvedores
às vezes empregam renderização no servidor. Depois disso, eles fazem "upgrade" para anexar gerenciadores
de evento quando o JavaScript finalmente for recuperado.

Mas, cuidado, pois isso tem um preço. Você 1) geralmente envia uma resposta HTML
*maior*, que pode impulsionar a interatividade; 2) pode deixar o usuário isolado
de modo que metade da experiência não fique realmente interativa até que o JavaScript
termine de ser processado.

O bootstrap progressivo pode ser uma abordagem mais adequada. Envie uma página minimamente
funcional (composta apenas pelo HTML/JS/CSS necessário para a rota atual).
À medida que mais recursos chegarem, o app poderá carregar lentamente e desbloquear mais recursos.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">Bootstrap
progressivo</a> por Paul Lewis </figcaption> </figure>

Carregar o código em proporção ao que está sendo visualizado é o principal objetivo. PRPL e
Bootsrap progressivo são padrões que podem ajudar a fazer isso.

## Conclusões

**O tamanho de transmissão é essencial para redes de baixa capacidade. O tempo de análise é importante para
dispositivos com CPU. É importante mantê-los baixos.**

Equipes foram bem-sucedidas ao adotar orçamentos de desempenho rigorosos para manter os
tempos de transmissão, análise e compilação de JavaScript baixos. Confira "[Can You
Afford It?: Real-world Web Performance
Budgets (Dá para pagar? Os orçamentos de desempenho do mundo real)](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)"
de Alex Russel para ver orientações sobre orçamentos para dispositivos móveis.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>É
útil considerar o espaço de JS que as decisões arquitetônicas que tomamos
nos deixam para a lógica do app.</figcaption> </figure>

Se você estiver criando um site que segmente dispositivos móveis, faça o seu melhor para desenvolver
em hardware representativo, manter os tempos de análise/compilação de JavaScript baixos e
adotar um orçamento de desempenho para garantir que sua equipe consiga monitorar os
custos de JavaScript.

## Saiba mais

* [Chrome Dev Summit 2017 - Modern Loading Best
  Practices (Melhores práticas para carregamento moderno)](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [JavaScript Start-up
  Performance (Desempenho de inicialização do JavaScript)](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
* [Solving the web performance
  crisis (Como solucionar a crise do desempenho de Web)](https://nolanlawson.github.io/frontendday-2016/) — Nolan Lawson
* [Can you afford it? Real-world performance
  budgets (Dá para pagar? Os orçamentos de desempenho do mundo real)](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
  — Alex Russell
* [Evaluating web frameworks and
  libraries (Avaliação das bibliotecas e estruturas da Web)](https://twitter.com/kristoferbaxter/status/908144931125858304) —
  Kristofer Baxter
* [Cloudflare’s Results of experimenting with
  Brotli (Resultados da experimentação com Brotli da Cloudfare)](https://blog.cloudflare.com/results-experimenting-brotli/) para
  compressão (o Brotli dinâmico com uma qualidade mais alta pode atrasar a renderização
  da página inicial. Avalie com cuidado. Em vez disso, recomendamos comprimir
  estatisticamente.)
* [Performance
  Futures (Futuros do desempenho)](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
  — Sam Saccone
