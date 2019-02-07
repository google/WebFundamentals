project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Graças aos dispositivos móveis e à proliferação da rede, hoje muito mais pessoas usam a Web. À medida que a base de usuários cresce, o desempenho fica cada vez mais importante. Neste artigo, descubra por que o desempenho é importante e saiba o que é possível fazer para tornar a Web mais rápida para todos.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# Por que o desempenho é importante {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

Na nossa busca compartilhada para impulsionar a Web a fazer mais, nós nos deparamos com um
problema comum: o desempenho. Os sites nunca tiveram tantos
recursos. São tantos recursos que vários sites enfrentam dificuldades para alcançar um alto
nível de desempenho entre as diversas condições de rede e os diferentes dispositivos.

Os problemas com o desempenho variam. No melhor dos cenários, eles geram pequenos atrasos que incomodam um pouco
os usuários. Já em situações mais graves, eles tornam o site completamente inacessível,
sem resposta à entrada do usuário ou apresentam os dois problemas.

## Cuidar do desempenho é reter os usuários

Queremos que os usuários possam interagir de forma significativa com o que nós criamos. Se for um
blog, queremos que as pessoas leiam as postagens. Se for uma loja virtual, queremos que
comprem os artigos. Se for uma rede social, queremos que
as pessoas possam interagir entre si.

O desempenho exerce um papel fundamental no sucesso de qualquer empreendimento on-line. Veja aqui alguns
estudos de casos que mostram como os sites de alto desempenho engajam e retêm os usuários de maneira mais eficaz do que os de
baixo desempenho:

- [O Pinterest aumentou o tráfego do mecanismo de pesquisa e os cadastros em 15%][pinterest] quando
 os tempos de espera percebidos foram reduzidos em 40%.
- [O COOK aumentou as conversões em 7%, diminuiu as taxas de rejeição em 7% e aumentou o número de
 páginas por sessão em 10%][COOK] quando reduziu o tempo de carregamento médio da página para 850
 milissegundos.

[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

Veja alguns estudos de caso que mostram como o baixo desempenho causou um impacto negativo nas metas
da empresa:

- [A BBC perdeu mais 10% de usuários][BBC] para cada segundo adicional
 que o site levou para ser carregado.
- [A DoubleClick do Google descobriu que 53% das visitas feitas por meio de sites para dispositivos móveis eram abandonadas][DoubleClick] se o carregamento de uma página
 levasse mais do que três segundos.

[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

No mesmo estudo da DoubleClick do Google mencionado acima, descobriu-se
que os sites com carregamento de até cinco segundos tinham 70% de sessões mais longas, 35% de taxas de
rejeição mais baixas e 25% de visualizações de anúncios a mais do que os que levam quase quatro vezes
mais tempo, em 19 segundos. Para ter uma ideia geral de como o desempenho
do seu site é comparado com seus concorrentes, [conheça a ferramenta
Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="Uma captura de tela da ferramenta
Speed Scorecard, comparando o desempenho entre quatro sites de ponta de estoque conhecidos.">
  <figcaption><b>Imagem 1</b>. O Speed Scorecard compara o desempenho de quatro
sites concorrentes usando dados do Chrome UX Report de usuários de rede 4G nos Estados
Unidos.</figcaption>
</figure>

## Cuidar do desempenho é melhorar as conversões

Reter usuários é fundamental para melhorar as conversões. Sites
lentos causam um impacto negativo na receita, e o oposto também é verdade. Veja aqui alguns
exemplos de como o desempenho pode tornar os negócios mais (ou
menos) lucrativos:

- Para a Mobify, [cada 100 ms de redução na velocidade de carregamento da página inicial gerou um **aumento de
1,11%** na conversão com base na sessão, produzindo um aumento
de receita anual média de **quase
$380.000**](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html).
Além disso, uma redução de 100 ms na velocidade de carregamento da página de pagamento gerou um **aumento
de 1,55%** na conversão com base na sessão e um crescimento
de receita anual média de **quase $530.000**.
- A DoubleClick descobriu que os [editores que tinham sites com carregamento de até cinco segundos ganharam
até **duas vezes o valor da receita por anúncio**, em comparação aos que eram carregados em até 19
segundos](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).
- [Quando o AutoAnything reduziu o tempo de carregamento da página pela metade, foi identificado **um aumento de 12 a 13%
nas
vendas**](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/).

Se você gerencia uma empresa na Web, o desempenho é fundamental. Se a experiência do
usuário do seu site for rápida e responsiva às entradas dele, isso gerará efeitos positivos nos negócios. Para
ver como o desempenho pode afetar sua receita, verifique a ferramenta [Calculadora de
impacto](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="Uma captura de tela da Calculadora de
Impacto, com uma estimativa da receita que pode ser gerada por um site se forem feitas melhorias no
desempenho.">
  <figcaption><b>Imagem 2</b>. A Calculadora de Impacto faz uma estimativa da
receita que pode ser gerada ao melhorar o desempenho do site.</figcaption>
</figure>

## Cuidar do desempenho é ter uma experiência do usuário satisfatória

Quando você navega até um URL, você faz isso a partir de qualquer ponto de
partida possível. Dependendo de algumas
condições, como a qualidade da conexão e o dispositivo usado, a
experiência pode variar entre os usuários.

<figure>
  <img src="images/speed-comparison.png" alt="Uma comparação de duas bobinas de tiras de filme
do carregamento de uma página. A primeira mostra um carregamento de página com uma conexão lenta, enquanto
a segunda exibe o mesmo carregamento com uma conexão rápida.">
  <figcaption><b>Imagem 3</b>. Uma comparação de carregamento de página com uma conexão muito lenta
(parte superior) em relação à uma conexão mais rápida (parte inferior).</figcaption>
</figure>

Quando um site começa a ser carregado, há um tempo em que os usuários aguardam o conteúdo
ser exibido. Até que isso aconteça, não há uma real experiência do usuário. Essa falta
de experiência é breve em conexões rápidas. No entanto, em conexões mais lentas,
os usuários são forçados a aguardar. Os usuários podem enfrentar mais problemas, conforme os
recursos da página lentamente aparecem.

O desempenho é um aspecto fundamental de uma
boa experiência do usuário. Quando os sites apresentam muitos códigos, é necessário que os navegadores usem megabytes
do plano de dados do usuário para fazer o download do código. Os dispositivos móveis têm memória e energia de CPU
limitados. Frequentemente, eles ficam sobrecarregados com o que pode ser uma pequena quantidade
de códigos não otimizados. Isso cria um mau desempenho, que leva
à falta de resposta. De acordo com o que sabemos sobre o comportamento humano, os usuários não
tolerarão os aplicativos com baixo desempenho por muito tempo antes de abandoná-los.
Se quiser saber mais sobre
como avaliar o desempenho do seu site e descobrir oportunidades para melhorá-lo,
consulte [_Como considerar as ferramentas de velocidade_](/web/fundamentals/performance/speed-tools/).

<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Visão geral do desempenho da página como aparece na
Lighthouse.">
  <figcaption><b>Imagem 4</b>. Visão geral do desempenho da página como aparece na <a
href="/web/tools/lighthouse/">Lighthouse</a>.</figcaption>
</figure>

## Cuidar do desempenho é lidar com pessoas

Os sites e aplicativos com um mau desempenho também podem representar altos custos para seus
usuários.

[Como os usuários de dispositivos móveis constituem uma grande parte de usuários da Internet de todo o
mundo](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet),
é importante considerar que muitos deles acessam a Web usando
redes LTE, 4G, 3G e até mesmo 2G. Conforme destacado por Ben Schwarz da Calibre
[neste estudo de desempenho do
mundo real](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342),
o valor dos planos de dados pré-pagos está diminuindo, o que torna o acesso
à Internet mais acessível em locais onde antes isso não ocorria. Os dispositivos
móveis e o acesso à Internet não são mais itens de luxo.
Eles são ferramentas comuns e necessárias para navegar e operar em um mundo cada vez mais
interconectado.

[O tamanho total das páginas vem aumentando desde, pelo menos,
2011](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal), e essa
tendência parece que veio para ficar. À medida que as páginas normais enviam um número maior de informações, os usuários
precisam substituir os planos de dados limitados com mais frequência, o que gera gastos mais altos.

Além de poupar dinheiro, as experiências do
usuário mais leves e rápidas também podem ser fundamentais para usuários em crise. Recursos públicos, como hospitais,
clínicas e centros de atendimento possuem recursos on-line que proporcionam aos usuários informações importantes
e específicas necessárias durante uma crise. [Embora o design seja
crucial para apresentar informações importantes de maneira eficiente em momentos
críticos](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis),
a velocidade da exibição desses dados não pode ser subestimada.
Isso faz parte do nosso trabalho.

## O que fazer a partir daqui

Embora as listas abaixo possam parecer intimidadoras, entenda
que você não precisa fazer _todas_ essas ações para melhorar o desempenho do seu
site. Elas são só pontos de partida. Por isso, não se assuste!
_Qualquer coisa_ que você possa fazer para melhorar o desempenho será útil para seus usuários.

### Observe quais recursos você envia

Um método eficaz para desenvolver aplicativos com alto desempenho é [examinar
_quais_ recursos você envia aos
usuários](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads).
O [painel Network no Chrome DevTools](/web/tools/chrome-devtools/network-performance/)
faz um excelente trabalho de síntese de todos os recursos usados em uma página específica. No entanto, se você ainda não pensou sobre o desempenho do seu site, saber
por onde começar pode ser assustador. Veja algumas
sugestões:

- Se você usar Bootstrap ou Foundation para criar sua IU, avalie se eles são
necessários. Essas abstrações incluem vários CSS que o navegador precisa fazer o download, analisar
e aplicar a uma página, tudo antes do CSS específico do site
aparecer.
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
e [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) são
formidáveis na criação de layouts simples e complexos com relativamente poucos códigos.
[Como CSS é um recurso de
bloqueio de renderização](/web/fundamentals/performance/critical-rendering-path/render-blocking-css),
a sobrecarga de uma biblioteca de CSS pode atrasar a renderização significativamente. Você pode
acelerar sua renderização removendo sobrecargas desnecessárias sempre que possível.
- As bibliotecas JavaScript são convenientes, mas nem sempre necessárias. Use jQuery, por
exemplo: A seleção de elementos foi extraordinariamente simplificada graças a métodos como
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
e
[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
A vinculação de Event é fácil com
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList),
[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute),
e
[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
oferecem maneiras simples de se trabalhar com atributos de elementos e classes. Se você precisar usar
uma biblioteca, pesquise alternativas mais simples. Por exemplo,
[Zepto](http://zeptojs.com/) é uma alternativa menor para jQuery, e
[Preact](https://preactjs.com/) é uma opção menor para React.
- Nem todos os sites precisam ser aplicativos de página única (SPAs), já que frequentemente usam o JavaScript
de maneira extensiva. [O JavaScript é o recurso mais caro que disponibilizamos
na Web, byte por
byte](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e), já que ele
precisa ser transferido por download, analisado, compilado e executado. Por
exemplo, blogs e sites de notícias com arquitetura e front-end atualizados podem ter um desempenho tão bom
quanto experiências tradicionais de múltiplas páginas. Isso ocorre se o [armazenamento em cache de
HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
for devidamente configurado e, opcionalmente, se um [service
worker](/web/fundamentals/primers/service-workers/) for usado.

### Observe como você envia recursos

Uma exibição eficiente é fundamental para gerar experiências do usuário rápidas.

- [Migrar para HTTP/2](/web/fundamentals/performance/http2/). O HTTP/2 aborda diversos
problemas de desempenho inerentes em HTTP/1.1, como limites de solicitação simultânea e
a falta de compressão de cabeçalho.
- [Faça o download de recursos mais cedo usando as dicas de
recursos](/web/fundamentals/performance/resource-prioritization). `rel=preload` é
uma dessas dicas que permite a realização de buscas antecipadas de recursos importantes antes
que o navegador possa descobri-las. [Isso pode causar um efeito
pronunciado positivo](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)
na renderização e redução do [Tempo para
interação da página](/web/tools/lighthouse/audits/time-to-interactive) quando usado
com cuidado. [`rel=preconnect` é outra dica de recurso que pode encobrir a
latência de abertura de novas conexões para recursos hospedados em domínios de
terceiros](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/).
- Sites modernos enviam [_muito_
JavaScript](http://httparchive.org/trends.php#bytesJS&reqJS) [e
CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS) em média. Era
comum usar estilos e scripts em grandes pacotes em ambientes de HTTP/1.
Isso ocorria porque uma grande quantidade de solicitações era prejudicial para o desempenho.
Com o HTTP/2, isso não acontece mais, já que solicitações múltiplas e
simultâneas são mais baratas. [Considere usar separação de códigos em
webpack](https://webpack.js.org/guides/code-splitting/) para limitar a quantidade de
scripts transferidos por download às necessidades da página ou da visualização atual. Divida
seu CSS em modelos ou arquivos específicos por componentes menores e só inclua
os recursos que provavelmente serão usados.

### Observe quantos dados você envia

Veja algumas sugestões para limitar _quantos_ dados você envia:

- [Reduza os recursos
de texto](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations).
A minificação é a remoção de espaços em branco, comentários e outros
conteúdos desnecessários em recursos baseados em texto. Ela reduz significativamente a quantidade de dados que você
envia aos usuários sem impactar a funcionalidade. [Use a uglificação em
JavaScript](https://www.npmjs.com/package/uglifyjs) para uma redução ainda maior
por meio da variável de encurtamento e nomes de métodos. Como SVG é um formato
de imagem baseado em texto, [ele pode ser otimizado com SVGO](https://github.com/svg/svgo).
- [Configure o servidor para comprimir
recursos](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer).
A compressão reduz drasticamente a quantidade de dados enviada aos usuários,
_especialmente_ os recursos de texto. O GZIP é uma opção conhecida, mas [a compressão Brotli pode ir
além](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/).
No entanto, saiba que a compressão _não_ é capaz de livrar o desempenho de todos os males:
Alguns formatos de arquivo implicitamente comprimidos (por exemplo: JPEG, PNG, GIF, WOFF
etc.) não respondem a esse recurso por já estarem comprimidos.
- [Otimize as
imagens](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)
para garantir que seu site envie o mínimo possível de dados de imagem. [Como as imagens são responsáveis por uma
grande parte da média de payload por página na
Web](http://httparchive.org/trends.php#bytesImg&reqImg), a otimização de
imagem representa uma grande oportunidade de aumentar o desempenho.
- Se você tiver tempo, considere usar formatos de imagem alternativos.
O [WebP](/speed/webp/) desfruta de [um suporte razoavelmente amplo ao
navegador](https://caniuse.com/#feat=webp) e usa menos dados que JPEG e PNG,
mantendo uma alta qualidade visual. O [JPEG XR é outro
formato alternativo](https://jpeg.org/jpegxr/index.html) compatível com IE Edge,
oferecendo economias de dados semelhantes.
- [Exiba imagens
de modo responsivo](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
A enorme diversidade de dispositivos e telas é uma grande
oportunidade de melhorar o desempenho ao enviar imagens que se adaptam melhor às
telas em que são exibidas. Nos casos de uso mais simples, você pode adicionar um [`srcset`
atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
a um `<img>` elemento para especificar uma matriz de imagens que poderão ser escolhidas pelo navegador.
Já nos mais complexos, você pode usar `<picture>` para ajudar o navegador
a escolher o melhor formato (por exemplo: WebP, e não JPEG ou PNG) ou disponibilizar
tratamentos diferentes de imagens para vários tamanhos de telas.
- [Use vídeo em vez de GIFs
animados](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/).
Os GIFs animados são _muito pesados_. Os vídeos de qualidade semelhante são _bem_ menores,
muitas vezes representando uma redução de 80% do tamanho. Se seu site usa muitos GIFs animados, isso terá
um efeito significativo na melhoria do desempenho no carregamento.
- As [dicas do cliente](http://httpwg.org/http-extensions/client-hints.html) podem
personalizar a exibição de recursos com base em condições atuais de rede e características do
dispositivo. Os cabeçalhos `DPR`, `Width` e `Viewport-Width` podem ajudar a
[exibir as melhores imagens para um dispositivo usando códigos do servidor _e_ mostrar menos
marcações](/web/updates/2015/09/automating-resource-selection-with-client-hints).
O cabeçalho `Save-Data` pode ajudar a [oferecer experiências de aplicativo mais leves para
usuários com essa solicitação](/web/updates/2016/02/save-data).
- A [`NetworkInformation`
API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
expõe informações sobre a conexão de rede do usuário. Essas informações podem ser
usadas para alterar as experiências do aplicativo para usuários em redes mais lentas.

Para ver mais guias completos sobre como melhorar o desempenho, verifique a nota no
[modelo de desempenho RAIL](/web/fundamentals/performance/rail), concentrado
na melhoria do tempo de carregamento e capacidade de resposta do aplicativo. [O nosso guia de
padrões PRPL também é um recurso
excelente](/web/fundamentals/performance/prpl-pattern/) para melhorar o
desempenho de aplicativos de página única modernos.

Se você estiver animado para saber mais sobre o desempenho e sobre como tornar seu site
mais rápido, leia nosso documento de desempenho para encontrar guias sobre diversos
tópicos. Adicionamos novos guias constantemente e também atualizamos os existentes. Por isso,
volte sempre!

_Um agradecimento especial a [Addy Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), [Matt
Gaunt](/web/resources/contributors/mattgaunt), [Philip
Walton](/web/resources/contributors/philipwalton), [Vinamrata
Singal](/web/resources/contributors/vinamratasingal), [Daniel
An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
e [Pete LePage](/web/resources/contributors/petelepage) pelos diversos
comentários sobre como melhorar e lançar este recurso!_

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
