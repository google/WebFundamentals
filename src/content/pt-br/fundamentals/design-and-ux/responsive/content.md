project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Considere o conteúdo, não só o layout e o design gráfico, ao criar para diversos usuários e dispositivos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-05-10 #}

# Conteúdo para vários dispositivos {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## Como as pessoas leem na Web

O [guia de escrita do governo dos EUA](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html) resume o que as pessoas querem da escrita na Web:

> Ao escrever para a Web, use uma linguagem simples que permita que os usuários encontrem o que precisam, entendam o que encontraram e usem isso para atender às suas necessidades.
>
> A escrita também deve permitir ações e ser localizável e compartilhável.

Pesquisas mostram que [as pessoas não leem páginas da Web, elas passam os olhos](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/). Em média, [as pessoas só leem de 20 a 28% do conteúdo de uma página da Web](https://www.nngroup.com/articles/how-little-do-users-read/). A leitura em uma tela é muito mais lenta do que em papel. As pessoas desistirão e deixarão seu site a não ser que as informações sejam fáceis de acessar e entender.

## Como escrever para dispositivos móveis

Concentre-se no assunto em questão e conte a história diretamente. Para que o seu texto seja adequado para diversos dispositivos e janelas de visualização, exponha seus pontos principais desde o início: em regra, idealmente [nos quatro primeiros parágrafos, em cerca de 70 palavras](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610).

Pergunte-se qual é o objetivo das pessoas ao acessar seu site. Elas estão querendo descobrir algo? Se as pessoas visitarem seu site em busca de informações, seu texto deve ser direcionado a ajudá-las a atingir esse objetivo. Escreva em [voz ativa](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice), ofereça ações e soluções.

Publique apenas o que seus visitantes querem e nada mais.

[Pesquisas do governo do Reino Unido](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) também mostram que:

> 80% das pessoas preferem frases escritas em linguagem direta — quanto mais
>complexa for a questão, maior é essa preferência (por exemplo, 97% preferem a expressão “entre
> outros” ao latim “inter alia”).
>
> Quanto mais instruídas as pessoas são e mais especializados são seus conhecimentos, maior
> é sua preferência pela linguagem direta.

Em outras palavras: use uma linguagem direta, palavras curtas e estruturas de frase simples, mesmo para um público-alvo letrado e técnico. A não ser que haja um bom motivo para não fazer isso, mantenha o tom coloquial. Uma antiga regra do jornalismo é escrever como se você estivesse conversando com uma criança de 11 anos inteligente.

## O próximo bilhão de usuários

A abordagem minimalista de escrita é particularmente importante para leitores de dispositivos móveis e é essencial ao criar conteúdo para celulares de baixo custo com pequenas janelas de visualização que exigem mais rolagem e podem ter telas de menor qualidade e menos responsivas.

A maioria do próximo bilhão de usuários que acessar a Internet terá dispositivos baratos. Esses usuários não desejarão gastar seu orçamento de dados navegando por conteúdos demasiadamente longos e podem não ler em sua língua materna. Reduza o texto: use frases curtas, pontuação mínima, parágrafos de até cinco linhas e cabeçalhos de uma linha. Considere usar um texto responsivo (por exemplo, use títulos mais curtos para janelas de visualização menores), mas [esteja ciente das desvantagens](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/).

Uma atitude minimalista também tornará seu conteúdo mais fácil de localizar e internacionalizar, além de tornar mais provável que ele seja citado nas redes sociais.

Em resumo:

* Mantenha a simplicidade
* Elimine elementos desnecessários
* Seja direto


## Elimine conteúdo desnecessário

Em termos de tamanho de byte, as páginas da Web são [grandes e estão ficando cada vez maiores](http://httparchive.org/trends.php#bytesTotal&reqTotal).

[Técnicas de design responsivas](/web/fundamentals/design-and-ux/responsive/) possibilitam o fornecimento de diferentes conteúdo para uma janela de visualização menor, mas é interessante começar otimizando o texto, as imagens e outros conteúdos.

> Usuários da Web se orientam frequentemente por ações, sempre indo em busca de respostas para suas dúvidas em vez de sentar e absorver um bom livro.
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

Pergunte a si mesmo: qual é o objetivo das pessoas quando acessam meu site?

Todos os componentes da página ajudam os usuários a atingir esse objetivo?

### Remova os elementos redundantes da página

Arquivos HTML constituem quase 70.000 e mais de nove solicitações para uma página da Web em média, segundo o [HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml).

Muitos sites populares usam milhares de elementos HTML por página e milhares de linhas de código, mesmo em dispositivos móveis. Arquivos HTML de tamanho excessivo [podem não fazer com que as páginas sejam carregadas mais lentamente](http://jsbin.com/zofavunapo/1/edit?html,js,output), mas uma carga de HTML pesada pode ser um sinal de conteúdo excessivo: arquivos .html maiores significam mais elementos, mais conteúdo de texto ou ambos.

Reduzir a complexidade do HTML também reduzirá o peso da página, ajudará a permitir a localização e internacionalização e tornará o design responsivo mais fácil de planejar e depurar. Para saber mais sobre como escrever um HTML mais eficiente, consulte [HTML de alto desempenho](https://samdutton.wordpress.com/2015/04/02/high-performance-html/).

> Cada etapa que o usuário precisar realizar antes de obter valor com seu aplicativo custará 20% dos seus usuários
>
>— [Gabor Cselle, Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

O mesmo se aplica ao conteúdo: ajude os usuários a obterem o que desejam o mais depressa possível.

Não oculte o conteúdo de usuários de dispositivos móveis. Busque a [paridade de conteúdo](http://bradfrost.com/blog/mobile/content-parity/), pois tentar adivinhar quais recursos os usuários de dispositivos móveis não precisarão acabará sendo um erro para alguém. Se você tiver os recursos, crie versões alternativas do mesmo conteúdo para tamanhos diferentes de janelas de visualização, mesmo que apenas para os elementos de página de alta prioridade.

Considere o gerenciamento de conteúdo e o fluxo de trabalho: os sistemas legados resultam em conteúdo de legado?

### Simplifique o texto

Conforme a Web passa para o ambiente móvel, você deve adaptar seu conteúdo. Mantenha a simplicidade, reduza elementos excessivos e seja direto.

### Remova imagens redundantes

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-images.png" alt="HTTP Archive mostrando um aumento no número de solicitações de imagens e tamanhos de transferência de imagens" />
    <figcaption>De acordo com <a href="http://httparchive.org/trends.php#bytesImg&reqImg">dados do HTTP Archive</a>, uma página da Web comum faz 54 solicitações de imagens.</figcaption>
  </figure>
</div>

Imagens podem ser bonitas, divertidas e informativas, mas elas também ocupam espaço na página, aumentam o peso da página e aumentam o número de solicitações. [A latência piora de acordo com a conectividade](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), o que significa que solicitações excessivas de arquivos de imagem é um problema cada vez maior conforme a Web ocupa o espaço móvel.


<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="Gráfico de pizza do HTTP Archive mostrando a média de bytes por página de acordo com o tipo de conteúdo, 60% do qual são imagens">
    <figcaption>Imagens constituem mais de 60% do peso da página.</figcaption>
  </figure>
</div>

Imagens também consomem energia. Depois da tela, o rádio é o segundo maior consumidor de bateria. Mais solicitações de imagem, mais uso de rádio, mais baterias esgotadas. Apenas a renderização das imagens já consome energia e esse consumo é proporcional ao tamanho e ao número. Confira o relatório da Stanford [Who Killed My Battery? (Quem acabou com a minha bateria?)](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)

Se possível, livre-se das imagens!

Veja algumas sugestões:

* Considere designs que evitem o uso de imagens ou use poucas imagens. [Uma página com apenas texto pode ser linda](https://onepagelove.com/tag/text-only)! Pergunte a si mesmo: o que os visitantes do meu site estão tentando fazer? As imagens ajudam nesse processo?
* Antigamente, era comum salvar cabeçalhos e outros elementos de texto como gráficos. Essa abordagem não responde bem a mudanças de tamanho da janela de visualização e isso aumenta o peso da página e a latência. Usar o texto como gráfico também significa que ele não será encontrado por mecanismos de pesquisa e não poderá ser acessado por leitores de tela e outras tecnologias de acessibilidade. Use texto "de verdade" quando possível — fontes da Web e CSS podem resultar em uma tipografia muito bonita.
* Use CSS em vez de imagens para gradientes, sombras, bordas arredondadas e [texturas de plano de fundo](http://lea.verou.me/css3patterns/){: .external }, que são recursos [com suporte na maioria dos navegadores modernos](http://caniuse.com/#search=shadows). Lembre-se, entretanto, de que, embora o CSS seja melhor do que imagens, ele ainda poderá incorrer em [penalidades de processamento e renderização](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/) especialmente significativas para dispositivos móveis.
* Imagens de fundo raramente funcionam bem em dispositivos móveis. Você pode [usar consultas de mídia](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/) para evitar imagens de fundo em janelas de visualização pequenas.
* Evite imagens na tela de apresentação.
* [Use CSS para animações na interface](/web/fundamentals/design-and-ux/animations/).
* Conheça os glifos; use [símbolos e ícones Unicode](https://en.wikipedia.org/wiki/List_of_Unicode_characters) em vez de imagens, com fontes da Web se necessário.
* Considere usar [fontes de ícone](http://weloveiconfonts.com/#zocial); elas são gráficos vetoriais que podem ser expandidos infinitamente e um conjunto inteiro de imagens pode ser baixado em uma só fonte. (No entanto, [estas informações](https://sarasoueidan.com/blog/icon-fonts-to-svg/) devem ser consideradas.)
* O elemento `<canvas>` pode ser usado para compilar imagens em JavaScript, de linhas, curvas, texto e outras imagens.
* [Inline SVG ou imagens URI de dados](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/) não reduzirão o peso da página, mas podem reduzir a latência ao diminuir o número de solicitações de recursos. O Inline SVG tem um [bom suporte em navegadores de computadores e dispositivos móveis](http://caniuse.com/#feat=svg-html5), e [ferramentas de otimização](http://petercollingridge.appspot.com/svg-optimiser) podem reduzir o tamanho do SVG de forma significativa. Da mesma forma, também [há um amplo suporte](http://caniuse.com/datauri) para URIs de dados. Ambos elementos podem ser incorporados ao CSS.
* Considere usar `<video>` em vez de GIFs animados. [O elemento video tem suporte em todos os navegadores móveis](http://caniuse.com/video) (exceto no Opera Mini).

Para saber mais, consulte [Otimização de imagens](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) e [Eliminar e substituir imagens](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images).


## Crie conteúdo de forma que ele se adeque a diferentes tamanhos de janela de visualização {: #viewport }

> "Crie um produto, não reimagine um existente para telas pequenas. Bons produtos
> para dispositivos móveis são criados, nunca adaptados."
>
>— <a href="https://goo.gl/KBAXj0">Design e desenvolvimento para dispositivos móveis</a>, Brian Fling


Grandes designers não ‘otimizam para dispositivos móveis’, mas pensam de forma responsiva para criar sites que se adequam a uma grande variedade de dispositivos. A estrutura do texto e dos demais elementos da página são essenciais para o sucesso em diferentes dispositivos.

Muitos do próximo bilhão de usuários que acessarão a Internet usarão dispositivos de baixo custo com pequenas janelas de visualização. A leitura em uma tela de 3,5 pol ou 4 pol com baixa resolução pode ser difícil.

Veja uma imagem dos dois celulares juntos:

![Foto comparando a exibição de uma postagem do blog em celulares de baixo custo e sofisticados](imgs/devices-photo.jpg)

Na tela maior, o texto é pequeno, porém legível.

Na tela menor, o navegador renderiza o layout corretamente, mas o texto fica ilegível, mesmo ampliando o zoom. A tela fica desfocada e as cores desbotadas — o branco não parece branco — o que torna o conteúdo menos legível.

### Crie conteúdo para dispositivos móveis

Ao criar conteúdo para diversas janelas de visualização, considere o conteúdo, o layout e o design gráfico,
[crie designs com texto e imagens reais, não conteúdo fictício](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website)

> "O conteúdo está à frente do design. Design sem conteúdo não é design, é decoração."
>
>— Jeffrey Zeldman

* Coloque seu conteúdo mais importante na parte superior, pois os [usuários tendem a ler páginas da Web em um padrão de F](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
* Os usuários acessam seu site para cumprir um objetivo. Pergunte-se do que eles precisam para cumprir esse objetivo e livre-se do resto. Seja rígido quanto a ornamentos visuais e textuais, conteúdo de legado, links excessivos e outros itens desnecessários.
* Tenha cuidado com ícones de compartilhamento social, pois eles podem deixar o layout desorganizado e seu código pode tornar o carregamento lento.
* Crie [layouts responsivos](/web/fundamentals/design-and-ux/responsive/) para o conteúdo e não tamanhos fixos de dispositivo.

### Teste o conteúdo

Success: Tudo que fizer... **teste**!

* Verifique a legibilidade em janelas de visualização menores usando o Chrome DevTools e outras [ferramentas de emulação](/web/fundamentals/performance/poor-connectivity/).
* [Teste seu conteúdo em condições de baixa largura de banda e alta latência](/web/fundamentals/performance/poor-connectivity/); experimente o conteúdo em diversos cenários de conectividade.
* Experimente ler e interagir com seu conteúdo em um celular de baixo custo.
* Peça que amigos e colegas experimentem seu aplicativo ou site.
* Compile um laboratório de teste de dispositivos simples. O [repositório do GitHub](https://github.com/GoogleChrome/MiniMobileDeviceLab) para o Mini Mobile Device Lab da Google tem instruções sobre como compilar um laboratório próprio. O [OpenSTF](https://github.com/openstf/stf) é um aplicativo da Web simples para testar sites em vários dispositivos Android.

Veja o OpenSTF em ação:

[![Interface do OpenSTF](imgs/stf.png)](https://github.com/openstf/stf)

Dispositivos móveis são cada vez mais usados para consumir conteúdo e obter informações, não apenas dispositivos para comunicação, jogos e mídia.

Isso faz com que seja extremamente importante planejar o conteúdo para que ele se adeque a diversos tipos de janelas de visualização e priorizar o conteúdo ao planejar o layout, a interface e o design de interação para vários dispositivos.


## Entenda os custos dos dados

As páginas da Web estão ficando maiores. <br><br>De acordo com o <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a>, o peso da página dos <a href="http://httparchive.org/about.php#listofurls">um milhão maiores sites</a> agora é, em média, de 2 MB.


Usuários evitam sites ou aplicativos que parecem lentos ou caros, portanto, é essencial entender o custo de carregar os componentes da página ou do aplicativo.

Reduzir o peso da página também pode ser lucrativo. [Chris Zacharias do YouTube](http://blog.chriszacharias.com/page-weight-matters) descobriu que, ao reduzir o tamanho da propriedade watch-page de 1,2 MB para 250 KB:

> Muitas pessoas que antes não conseguiam usar o YouTube passaram a conseguir.

Em outras palavras, reduzir o peso da página **pode abrir mercados inteiramente novos**.

### Calcule o peso da página {: #weight }

Existem várias ferramentas para calcular o peso da página. O painel Network do Chrome DevTools mostra o tamanho total em bytes de todos os recursos e pode ser usado para identificar os pesos de tipos de ativos individuais. Você também pode verificar quais itens foram recuperados do cache do navegador.

![Painel Network do Chrome DevTools mostra os tamanhos dos recursos](imgs/chrome-dev-tools.png)

O Firefox e outros navegadores oferecem ferramentas semelhantes.

[WebPagetest](http://webpagetest.org) oferece a capacidade de testar o primeiro carregamento de página e os carregamentos subsequentes. Você pode automatizar os testes com [scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (por exemplo, para fazer login em um site) ou usando suas [RESTful APIs](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). O exemplo a seguir (carregar [developers.google.com/web](/web/)) mostra que o armazenamento em cache foi bem-sucedido e que os carregamentos de página subsequentes não precisaram de recursos adicionais.

![Resultados do WebPagetest mostrando o tamanho total em bytes da primeira visita a uma página e das visitas subsequentes](imgs/webpagetest-first-and-repeat.png)

O WebPagetest também fornece um detalhamento de tamanho e solicitação por tipo MIME.

![Gráficos de pizza do WebPagetest mostrando solicitações e bytes por tipo MIME](imgs/webpagetest-requests-and-bytes-pie-charts.png)

### Calcule o custo da página

Para muitos usuários, os dados não custam apenas bytes e desempenho, custam dinheiro.

O site [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } permite que você estime o custo financeiro real de carregar seu site. O histograma abaixo mostra quanto custa (usando um plano de dados pré-pago) para carregar o site [amazon.com](https://www.amazon.com/).

![A estimativa do custo de dados (em 12 países) para carregar a página inicial do amazon.com](imgs/what-does-my-site-cost.png)

Lembre-se de que isso não considera a renda como fator acessibilidade. Os dados do [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) mostram o custo dos dados.

<table>
  <tr>
    <td></td>
    <td><strong>Plano de dados de 500 MB<br>custo (USD)</strong></td>
    <td><strong>Salário mínimo <br>por hora (USD)</strong></td>
    <td><strong>Horas de trabalho necessárias para pagar<br>pelo plano de dados de 500 MB</strong></td>
  </tr>
  <tr>
    <td>Índia</td>
    <td>US$ 3,38</td>
    <td>US$ 0,20</td>
    <td>17 horas</td>
  </tr>
  <tr>
    <td>Indonésia</td>
    <td>US$ 2,39</td>
    <td>US$ 0,43</td>
    <td>6 horas</td>
  </tr>
  <tr>
    <td>Brasil</td>
    <td>US$ 13,77</td>
    <td>US$ 1,04</td>
    <td>13 horas</td>
  </tr>
</table>


O peso da página não é um problema apenas para mercados emergentes. Em muitos países, as pessoas usam planos móveis com dados limitados e evitarão seu site ou aplicativo se perceberem que ele será pesado e caro. Mesmo planos de dados de celular e Wi-Fi "ilimitados" geralmente têm um limite de dados que, se atingido, o fluxo de dados é bloqueado ou reduzido.

Resumo: o peso da página afeta o desempenho e aumenta o custo. [Otimizar a eficiência do conteúdo](/web/fundamentals/performance/optimizing-content-efficiency/) mostra como reduzir esse custo.


{# wf_devsite_translation #}
