---
layout: article
title: "Otimização de imagens"
description: "As imagens geralmente são responsáveis pela maior parte dos bytes transferidos em uma página da Web e muitas vezes ocupam uma parcela significativa do espaço visual. Como resultado, a otimização de imagens pode muitas vezes resultar em uma grande economia de bytes e melhor desempenho para seu site. Se menos bytes precisarem ser transferidos pelo navegador, haverá menor concorrência pela largura de banda do cliente e, consequentemente, o conteúdo relevante poderá ser transferido e exibido mais rapidamente na tela."
introduction: "Em geral, as imagens são responsáveis pela maior parte dos bytes transferidos em uma página da Web e frequentemente ocupam uma parcela significativa do espaço visual. Como resultado, a otimização de imagens pode muitas vezes resultar em uma grande economia de bytes e melhor desempenho para seu site. Se menos bytes precisarem ser transferidos pelo navegador, haverá menor concorrência pela largura de banda do cliente e, consequentemente, o conteúdo relevante poderá ser transferido e exibido mais rapidamente na tela."
article:
  written_on: 2014-05-07
  updated_on: 2014-05-10
  order: 3
collection: optimizing-content-efficiency
authors:
  - ilyagrigorik
key-takeaways:
  replace:
    - Elimine recursos de imagem desnecessários
    - Utilize efeitos CSS3 sempre que possível
    - Use fontes da Web em vez de incorporar texto em imagens por meio de código
  vector-raster:
    - Imagens vetoriais são ideais para representar formas geométricas
    - Imagens vetoriais são independentes de resolução e zoom
    - Imagens de varredura devem ser usadas para cenas complexas com muitos detalhes e formas irregulares
  hidpi:
    - Telas de alta resolução têm vários pixels físicos por pixel CSS
    - Imagens de alta resolução exigem um número bem maior de pixels e bytes
    - As técnicas de otimização de imagens são iguais independentemente da resolução
  optimizing-vector:
    - O formato de imagem SVG é baseado em XML
    - Os arquivos SVG devem ser reduzidos para ficarem menores
    - Os arquivos SVG devem ser compactados com GZIP
  optimizing-raster:
    - Uma imagem de varredura é uma grade de pixels
    - Cada pixel codificar informações de cor e transparência
    - Os compactadores de imagem usam várias técnicas para diminuir o número de bits por pixel necessários e, consequentemente, reduzir o tamanho do arquivo de imagem
  lossless-lossy:
    - "Devido à forma como nossa visão funciona, as imagens são ótimas candidatas à compactação com perdas"
    - "A otimização de imagens é uma relação entre a compactação com perdas e sem perdas"
    - "A escolha e o uso dos algoritmos com ou sem perdas e a forma como eles são usados determinam as diferenças nos formatos das imagens"
    - "Não há um formato ou `configuração de qualidade` ideal para todas as imagens: cada combinação entre o conteúdo da imagem e o compactador usado gera resultados diferentes"
  formats:
    - "Comece selecionando o formato universal correto: GIF, PNG, JPEG"
    - "Faça testes e selecione a melhor configuração para cada formato: qualidade, tamanho da paleta etc."
    - Considere incluir recursos em WebP e JPEG XR para imagens dimensionadas de clientes modernos
  scaled-images:
    - A exibição de recursos dimensionados é uma das formas mais simples e eficazes de otimização
    - Esteja atento a recursos muito grandes, pois eles resultam em alta sobrecarga
    - Reduza o número de pixels desnecessários dimensionando suas imagens de acordo com o tamanho de exibição


notes:
  decompressed:
    - "Além disso, independentemente do formato de imagem usado para transferir os dados do servidor para o cliente, quando a imagem é decodificada pelo navegador, cada pixel ocupa sempre 4 bytes de memória. Isso pode ser uma limitação importante para imagens grandes e dispositivos que não têm muita memória disponível, como dispositivos móveis mais antigos."
  artifacts:
    - "Da esquerda para a direita (PNG): 32 bits (16 milhões de cores), 7 bits (128 cores), 5 bits (32 cores). Cenas complexas com transições graduais de cor (gradientes, céu etc.) exigem paletas com mais cores para evitar artefatos visuais como um céu pixelado em um recurso de 5 bits. Por outro lado, se a imagem usa poucas cores, então uma paleta com muitas cores seria um desperdício de bits."
  quality:
    - "Os níveis de qualidade de formatos de imagens diferentes não são diretamente comparáveis devido às variações entre os algoritmos usados para codificar a imagem: um JPEG com 90% de qualidade será bem diferente de um WebP com 90% de qualidade. Na verdade, até os níveis de qualidade do mesmo formato de imagem podem gerar resultados visivelmente diferentes dependendo da implementação do compactador."
  resized:
    - 'Passar o cursor sobre o elemento de imagem no Chrome DevTools revela o tamanho "natural" e o tamanho de "exibição" do recurso de imagem. No exemplo acima, a imagem de 300 x 260 pixels é transferida, mas depois é redimensionada (245 x 212) no cliente quando é exibida.'
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

A otimização de imagens é uma arte e uma ciência: é uma arte porque não há uma maneira ideal para compactar uma determinada imagem. Ela é uma ciência porque há várias técnicas e algoritmos avançados que podem reduzir bastante o tamanho de uma imagem. Encontrar a melhor configuração para sua imagem exige uma análise detalhada de vários aspectos: recursos do formato, conteúdo dos dados codificados, qualidade, dimensões de pixel, entre outros.

## Como eliminar e substituir imagens

{% include modules/takeaway.liquid list=page.key-takeaways.replace %}

A primeira pergunta que você deve se fazer é se determinada imagem é realmente necessária para alcançar o efeito desejado. O bom design é simples e sempre resultará em um melhor desempenho. A melhor estratégia de otimização é eliminar recursos de imagem sempre que possível, pois eles geralmente consomem muitos bytes em relação aos recursos em HTML, CSS, JavaScript e outros. Uma imagem bem posicionada pode dizer mais que mil palavras. Por isso, cabe a você encontrar o equilíbrio.

Em seguida, é preciso considerar se há outra tecnologia que possa gerar os resultados desejados de maneira mais eficiente:

* **Efeitos CSS** (gradientes, sombras etc.) e animações CSS podem ser usados para gerar recursos que não dependem de resolução e mantêm a qualidade em qualquer nível de zoom, além de geralmente consumirem bem menos bytes do que um arquivo de imagem.
* **Fontes da Web** permitem o uso de elegantes faces de tipos e mantêm a capacidade de selecionar, pesquisar e redimensionar o texto, o que significa uma grande melhoria na facilidade de uso.

Pense duas vezes antes de incorporar texto por meio de código em uma imagem. A qualidade da tipografia é essencial para um bom design, para o branding e para facilitar a leitura, mas o texto em imagens prejudica a experiência do usuário. O motivo é que esse tipo de texto não pode ser selecionado, pesquisado, ampliado nem acessado, além de não ser exibido corretamente em dispositivos com alto DPI. Usar fontes da Web requer um [conjunto próprio de otimizações] (https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), mas resolve todos os problemas citados acima e é sempre uma opção melhor para a exibição de texto.


## Imagens vetoriais vs. imagens de varredura

{% include modules/takeaway.liquid list=page.key-takeaways.vector-raster %}

Depois de decidir que o uso de uma imagem é a melhor maneira de alcançar o efeito desejado, você precisa selecionar o formato certo:

&nbsp;

<div class="clear">
  <div class="g--half">
    <b>Vetor</b>
    <img class="center" src="images/vector-zoom.png" alt="Imagem vetorial ampliada">
  </div>

  <div class="g--half g--last">
    <b>Varredura</b>
    <img src="images/raster-zoom.png" alt="Imagem de varredura ampliada">
  </div>
</div>

* [Gráficos vetoriais](http://pt.wikipedia.org/wiki/Desenho_vetorial) usam linhas, pontos e polígonos para representar uma imagem.
* [Gráficos de varredura](http://pt.wikipedia.org/wiki/Raster) representam uma imagem codificando valores individuais para cada pixel em uma grade retangular.

Cada formato tem seus prós e contras. Os formatos vetoriais são ideais para representar imagens de formas geométricas simples (por exemplo, logo marcas, texto, ícones etc.) e para ter uma qualidade excelente em qualquer configuração de resolução e zoom. Assim, eles são perfeitos para telas de alta resolução e recursos que precisam ser exibidos em vários tamanhos.

No entanto, os formatos vetoriais deixam a desejar quando a cena é complexa (por exemplo, uma foto): talvez seja necessária uma quantidade proibitiva de marcações SVG para descrever todas as formas e mesmo assim o resultado poderá não ser `fotorrealista`. Nesse caso, é melhor usar um formato de imagem de varredura, como GIF, PNG ou JPEG, ou um dos formatos mais atuais, como JPEG-XR e WebP.

As imagens de varredura não são independentes de resolução e zoom, ou seja, quando ampliadas, elas ficam irregulares e embaçadas. Como resultado, para proporcionar a melhor experiência possível aos usuários, talvez você precise salvar várias versões da mesma imagem de varredura em várias resoluções.


## Implicações das telas de resolução alta

{% include modules/takeaway.liquid list=page.key-takeaways.hidpi %}

Quando falamos em pixels de imagem, precisamos distinguir entre dois tipos de pixel: CSS e físicos. Um único pixel CSS pode conter vários pixels físicos, ou seja, um único pixel CSS pode corresponder diretamente a um único pixel físico ou ser composto por vários. Qual é o objetivo disso? Quanto mais pixels, mais detalhado é o conteúdo exibido na tela.

<img src="images/css-vs-device-pixels.png" class="center" alt="Pixels CSS vs. pixels físicos">

Telas com alto DPI (HiDPI) exibem resultados incríveis, mas há um ponto negativo: os recursos de imagem precisam de mais detalhes para se beneficiarem da maior quantidade de pixels físicos. O ponto positivo é que as imagens vetoriais são ideais para essa função, pois podem ser exibidas em qualquer resolução com ótimos resultados. Para exibir detalhes mais sutis talvez seja necessário um maior custo de processamento, mas o recurso resultante é o mesmo e não depende da resolução.

Por outro lado, as imagens de varredura impõem um desafio muito maior, pois codificam os dados da imagem pixel por pixel. Portanto, quanto maior o número de pixels, maior o tamanho do arquivo da imagem de varredura. Como exemplo, considere a diferença entre um recurso de foto exibido na resolução de 100 x 100 pixels (CSS):

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Resolução da tela</th>
    <th>Total de pixels</th>
    <th>Tamanho do arquivo descompactado (4 bytes por pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolução">1 x</td>
  <td data-th="total de pixels">100 x 100 = 10.000</td>
  <td data-th="tamanho do arquivo">40.000 bytes</td>
</tr>
<tr>
  <td data-th="resolução">2 x</td>
  <td data-th="total de pixels">100 x 100 x 4 = 40.000</td>
  <td data-th="tamanho do arquivo">160.000 bytes</td>
</tr>
<tr>
  <td data-th="resolução">3 x</td>
  <td data-th="total de pixels">100 x 100 x 9 = 90.000</td>
  <td data-th="tamanho do arquivo">360.000 bytes</td>
</tr>
</tbody>
</table>

Quando a resolução da tela física é duplicada, o número total de pixels é multiplicado por quatro: o dobro de pixels horizontais vezes o dobro de pixels verticais. Portanto, uma tela ampliada `2 x` não dobra, mas quadruplica o número de pixels necessários.

O que isso significa na prática? Uma das melhores características das telas de alta resolução é a capacidade de exibir lindas imagens. No entanto, as telas de alta resolução exigem imagens também de alta resolução. Prefira as imagens vetoriais sempre que possível, pois elas não dependem da resolução e sempre exibem resultados de alta qualidade. Se for necessário usar imagens de varredura, disponibilize e otimize múltiplas variações de cada imagem. Veja mais detalhes a seguir.


## Otimização de imagens vetoriais

{% include modules/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

Todos os navegadores modernos oferecem suporte ao formato SVG (gráficos vetoriais escaláveis), que é um formato de imagem para gráficos bidimensionais baseado em XML. É possível incorporar as marcações SVG diretamente na página ou como um recurso externo. Por sua vez, um arquivo SVG pode ser criado pela maioria dos softwares de ilustração vetorial ou manualmente e direto no seu editor de texto preferido.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

O exemplo acima mostra um simples círculo com contorno preto e fundo vermelho que foi exportado pelo Adobe Illustrator. É possível ver que ele contém muitos metadados, como informações de camadas, comentários e namespaces de XML que muitas vezes são desnecessários para exibir o recurso no navegador. Consequentemente, recomendamos que você sempre reduza os arquivos SVG usando ferramentas como o [svgo](https://github.com/svg/svgo).

Nesse contexto, o svgo diminui em 58% o tamanho do arquivo SVG gerado pelo Illustrator, reduzindo-o de 470 para 199 bytes. Como o SVG é um formato baseado em XML, também é possível aplicar a compactação do GZIP para reduzir o tamanho de transferência. Verifique se o servidor está configurado para compactar recursos SVG.


## Otimização de imagens de varredura

{% include modules/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

Uma imagem vetorial é somente uma grade bidimensional de `pixels` individuais, ou seja, uma imagem de 100 x 100 pixels é uma sequência de 10.000 pixels. Cada pixel, por sua vez, armazena os valores `[ÓRGÃO](http://en.wikipedia.org/wiki/RGBA_color_espaço): (R) canal vermelho, (G) canal verde, (B) canal azul e (A) canal alfa (transparência).

Internamente, o navegador aloca 256 valores (tons) para cada canal, que se convertem em 8 bits por canal (2 ^ 8 = 256) e 4 bytes por pixel (4 canais x 8 bits = 32 bits = 4 bytes). Como resultado, o tamanho do arquivo é facilmente calculado quando conhecemos as dimensões da grade:

* uma imagem de 100 x 100 pixels é composta por 10.000 pixels
* 10.000 pixels x 4 bytes = 40.000 bytes
* 40.000 bytes / 1024 = 39 KB

^

{% include modules/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Dimensões</th>
    <th>Pixels</th>
    <th>Tamanho do arquivo</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensões">100 x 100</td>
  <td data-th="pixels">10.000</td>
  <td data-th="tamanho do arquivo">39 KB</td>
</tr>
<tr>
  <td data-th="dimensões">200 x 200</td>
  <td data-th="pixels">40.000</td>
  <td data-th="tamanho do arquivo">156 KB</td>
</tr>
<tr>
  <td data-th="dimensões">300 x 300</td>
  <td data-th="pixels">90.000</td>
  <td data-th="tamanho do arquivo">351 KB</td>
</tr>
<tr>
  <td data-th="dimensões">500 x 500</td>
  <td data-th="pixels">250.000</td>
  <td data-th="tamanho do arquivo">977 KB</td>
</tr>
<tr>
  <td data-th="dimensões">800 x 800</td>
  <td data-th="pixels">640.000</td>
  <td data-th="tamanho do arquivo">2.500 KB</td>
</tr>
</tbody>
</table>

39 KB pode não parecer muito para uma imagem de 100 x 100 pixels, mas esse valor pode aumentar rapidamente com o uso de imagens maiores, tornando os recursos de imagem lentos e encarecendo o download. No entanto, até agora descrevemos o formato de imagem `descompactado`. O que podemos fazer para reduzir o tamanho da imagem?

Uma estratégia simples é reduzir a `profundidade de bits` da imagem de 8 bits por canal para uma paleta de cores menor: 8 bits por canal resulta em 256 valores por canal e 16.777.216 (2563) cores no total. E se reduzirmos a paleta para 256 cores? Precisaríamos de um total de apenas 8 bits para os canais RGB, reduzindo automaticamente 2 bytes por pixel. Isso significa uma compactação de 50% sobre o formato original de 4 bytes por pixel.

<img src="images/artifacts.png" class="center" alt="Artefatos de compactação">

{% include modules/remember.liquid title="Note" list=page.notes.artifacts %}

Em seguida, depois de otimizar os dados armazenados em pixels individuais, podemos começar a tratar os pixels adjacentes. Muitas imagens, principalmente as fotos, têm vários pixels adjacentes com cores semelhantes (por exemplo, o céu, texturas repetidas etc.). Com essa informação ao nosso favor, o compactador pode aplicar a `[codificação delta] (http://en.wikipedia.org/wiki/Delta_encoding)`, que em vez armazenar os valores individuais de cada pixel, armazena a diferença entre pixels adjacentes. Se os pixels adjacentes forem iguais, o delta é igual a `zero` e só é preciso armazenar um bit. Não pararemos por aqui...

O olho humano tem níveis de sensibilidade diferentes para cores diferentes. Sendo assim, é possível otimizar o código de cores reduzindo ou aumentando a paleta para incluir ou excluir essas cores.
Os pixels `adjacentes` formam uma grade em duas dimensões, indicando que cada pixel tem vários vizinhos. Podemos usar esse fato para melhorar ainda mais a codificação delta.
Em vez de olhar somente para os vizinhos diretos de cada pixel, podemos incluir blocos maiores de pixels adjacentes e codificar diferentes blocos com diferentes configurações. E assim por diante...

Como você deve saber, a otimização de imagens pode se tornar bastante complexa (ou divertida, dependendo do seu ponto de vista) e é uma importante área de pesquisa acadêmica e comercial. As imagens consomem muitos bytes e o desenvolvimento de técnicas de compactação mais eficientes é muito benéfico. Para mais informações, acesse a [página da Wikipédia](http://pt.wikipedia.org/wiki/Compactação_de_imagens) ou o [documento sobre técnicas de compactação WebP] (https://developers.google.com/speed/webp/docs/compression) e veja alguns exemplos práticos.

Tudo isso é ótimo, porém muito acadêmico: como isso ajuda a otimizar imagens em nossas páginas? Nosso papel aqui não é inventar novas técnicas de compactação, mas é importante entender o problema: pixels RGBA, profundidade de pixels e várias técnicas de otimização. É fundamental entender e ter em mente todos esses problemas antes de começarmos a falar sobre os vários formatos de imagens de varredura.


## Compactação sem perdas vs. com perdas

{% include modules/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

Para certos tipos de dados, como o código-fonte de uma página ou um arquivo executável, é essencial que o compactador não altere nem perca nenhuma informação original. Qualquer bit ausente ou incorreto pode modificar completamente o significado do conteúdo do arquivo ou, ainda pior, torná-lo completamente inválido. Para outros tipos de dados, como imagens, áudio e vídeo, pode ser perfeitamente aceitável exibir uma representação `aproximada` dos dados originais.

Na verdade, devido ao funcionamento da nossa visão, geralmente não há problema em descartar algumas informações de cada pixel para reduzir o tamanho do arquivo. Por exemplo, como não temos a mesma sensibilidade para todas as cores, podemos usar menos bits para codificar algumas cores. Consequentemente, um fluxo típico de otimização de imagens consiste em duas etapas de alto nível:

1. A imagem é processada usando um filtro `[com perdas](http://en.wikipedia.org/wiki/Lossy_compression)` que elimina alguns dados de pixel
1. A imagem é processada usando um filtro `[sem perdas](http://en.wikipedia.org/wiki/Lossless_compression)` que compacta os dados de pixel

**A primeira etapa é opcional e o algoritmo exato dependerá do formato específico da imagem. No entanto, é preciso entender que qualquer imagem pode passar pelo processo de compactação com perdas para reduzir seu tamanho.** Na verdade, a diferença entre os vários formatos de imagens, como GIF, PNG, JPEG e outros, está na combinação entre os algoritmos usados (ou omitidos) ao aplicar as etapas de compactação com perdas e sem perdas.

Qual é a configuração ideal para a otimização com perdas e sem perdas? A resposta depende o conteúdo da imagem e de seus próprios critérios, como as implicações impostas pelo tamanho do arquivo e pelos artefatos introduzidos na compactação com perdas. Em alguns casos, pode ser melhor evitar a otimização com perdas para poder comunicar detalhes complexos integralmente e, em outros casos, pode ser melhor usar técnicas avançadas de otimização com perdas para reduzir o tamanho do arquivo do recurso de imagem. Aqui será preciso levar em conta o contexto e sua avaliação pessoal, pois não há uma configuração universal.

<img src="images/save-for-web.png" class="center" alt="Salvar para a Web">

Por exemplo, ao usar um formato com perdas, como o JPEG, o compactador geralmente exibe uma opção de configuração personalizável de `qualidade` (como o seletor de qualidade oferecido pela função `Salvar para a Web` do Adobe Photoshop) que normalmente é um número entre 1 e 100 que controla como os algoritmos com perdas e sem perdas irão se comportar internamente. Para conseguir os melhores resultados, faça testes em suas imagens com várias configurações diferentes e não hesite em reduzir a qualidade, pois geralmente o resultado visual é muito bom e a redução no tamanho do arquivo pode ser enorme.

{% include modules/remember.liquid title="Note" list=page.notes.quality %}


## Como selecionar o formato de imagem correto

{% include modules/takeaway.liquid list=page.key-takeaways.formats %}

Além das diferenças entre os vários algoritmos de compactação com perdas e sem perdas, os vários formatos de imagem são compatíveis com diferentes recursos, como canais de transparência (alfa) e animação. Consequentemente, escolher o `formato correto` para uma determinada imagem é uma combinação dos resultados visuais desejados e dos requisitos funcionais.


<table class="table-4">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Formato</th>
    <th>Transparência</th>
    <th>Animação</th>
    <th>Navegador</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="formato"><a href="http://pt.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparência">Sim</td>
  <td data-th="animação">Sim</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://pt.wikipedia.org/wiki/PNG">PNG</a></td>
  <td data-th="transparência">Sim</td>
  <td data-th="animação">Não</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://pt.wikipedia.org/wiki/Joint_Photographic_Experts_Group">JPEG</a></td>
  <td data-th="transparência">Não</td>
  <td data-th="animação">Não</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://pt.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparência">Sim</td>
  <td data-th="animação">Sim</td>
  <td data-th="navegador">IE</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://pt.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparência">Sim</td>
  <td data-th="animação">Sim</td>
  <td data-th="navegador">Google Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Existem três formatos de imagem compatíveis universalmente: GIF, PNG e JPEG. Além desses formatos, alguns navegadores também aceitam formatos mais novos como WebP e JPEG XR, que oferecem melhor compactação geral e mais recursos. Então, qual formato você deve usar?

<img src="images/format-tree.png" class="center" alt="Salvar para a Web">

1. **Você precisa de animação? Se precisar, o GIF é a única escolha universal.**
  * O GIF limita a paleta de cores a 256 cores, tornando-se uma péssima escolha para a maioria das imagens. Além disso, o PNG-8 oferece melhor compactação para imagens com paletas reduzidas. Consequentemente, o GIF é a melhor opção somente quando é preciso usar animação.
1. **Você precisa preservar detalhes sutis com a maior resolução possível? Use o PNG.**
  * O PNG não utiliza algoritmos de compactação com perdas após a escolha do tamanho da paleta de cores. Assim, esse formato gera imagens com a máxima qualidade, porém com tamanhos de arquivos bem maiores do que outros formatos. Use-o com cautela.
  * Se o recurso de imagem possuir gráficos compostos por formas geométricas, considere convertê-lo para um formato vetorial (SVG).
  * Se o recurso de imagem tiver texto, reconsidere antes usá-lo. O texto incorporado a imagens não pode ser selecionado, pesquisado ou ampliado/reduzido. Se houver necessidade de apresentar uma aparência personalizada (para fins de branding ou por outros motivos), é melhor usar as fontes da Web.
1. **Você pretende otimizar uma foto, uma captura de tela ou algum recurso de imagem semelhante? Use o JPEG.**
  * O JPEG usa uma combinação de otimização com e sem perdas para reduzir o tamanho do arquivo do recurso de imagem. Teste vários níveis de qualidade do JPEG para encontrar a melhor relação entre qualidade e tamanho de arquivo para seu recurso.

Finalmente, após determinar o formato de imagem ideal e a respectiva configuração para cada um dos recursos, considere adicionar mais uma variante codificada em WebP e JPEG XR. Esses dois formatos são novos e (ainda) não são universalmente compatíveis com todos os navegadores. Mesmo assim, eles proporcionam grandes economias para clientes mais novos: em média, o WebP proporciona uma [redução de 30% no tamanho do arquivo](https://developers.google.com/speed/webp/docs/webp_study) em comparação a uma imagem JPEG equivalente.

Como o WebP e o JPEG XR não são universalmente compatíveis, é preciso alterar a lógica dos aplicativos ou dos servidores para que eles exibam o recurso adequado:

* Algumas CDNs incluem a exibição de WebP e JPEG XR.
* Algumas ferramentas de código aberto (como PageSpeed for apache ou Nginx) automatizam a otimização, a conversão e a exibição de determinados recursos.
* É possível alterar a lógica do aplicativo para detectar o cliente, verificar quais formatos são compatíveis e exibir o melhor formato de imagem disponível.

Finalmente, se você usar um Webview para exibir o conteúdo no seu aplicativo nativo, você terá total controle sobre o cliente e poderá usar o formato WebP com exclusividade. O Facebook, o Google+ e muitos outros usam o WebP para exibir todas as imagens em seus aplicativos. A economia definitivamente compensa. Para saber mais sobre o WebP, assista à apresentação do Google I/O 2013: [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE).


## Ajuste de ferramentas e parâmetros

Não há um formato de imagem, uma ferramenta ou um conjunto de parâmetros de otimização perfeito para todas as imagens. Para conseguir os melhores resultados, é preciso escolher o formato e suas configurações com base no conteúdo da imagem, nos seus requisitos visuais e em outros requisitos técnicos.

<table class="table-2">
<colgroup><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Ferramenta</th>
    <th>Descrição</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="ferramenta"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="descrição">cria e otimiza imagens GIF</td>
</tr>
<tr>
  <td data-th="ferramenta"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="descrição">otimiza imagens JPEG</td>
</tr>
<tr>
  <td data-th="ferramenta"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="descrição">otimização de PNG sem perdas</td>
</tr>
<tr>
  <td data-th="ferramenta"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="descrição">otimização de PNG com perdas</td>
</tr>
</tbody>
</table>


Não hesite em testar os parâmetros de cada compactador. Diminua a qualidade, veja como fica, apague e repita o processo. Quando você encontrar uma boa configuração, será possível aplicá-la a outras imagens semelhantes do seu site, mas não presuma que todas as imagens precisam ser compactadas com a mesma configuração.


## Exibição de recursos de imagem dimensionados

{% include modules/takeaway.liquid list=page.key-takeaways.scaled-images %}

A otimização de imagens se resume a dois critérios: a otimização do número de bytes usados para codificar cada pixel de imagem e a otimização do número total de pixels. O tamanho do arquivo de imagem é simplesmente o número total de pixels multiplicado pelo número total de bytes usados para codificar cada pixel. Simples assim.

Consequentemente, uma das técnicas mais fáceis e eficientes é garantir que não sejam enviados mais pixels do que o necessário para exibir o recurso no navegador com o tamanho desejado. Parece simples, não é? No entanto, muitas páginas não passam nesse teste para a maioria dos recursos de imagem. Normalmente, elas enviam recursos de imagem maiores e dependem do navegador para redimensioná-los e exibi-los com uma resolução mais baixa. Além disso, isso consome recursos extra de CPU.

<img src="images/resized-image.png" class="center" alt="Imagem redimensionada">

{% include modules/remember.liquid title="Note" list=page.notes.resized %}

A sobrecarga do envio de pixels desnecessários com o propósito de que o navegador faça o redimensionamento por nós, representa uma oportunidade desperdiçada de reduzir e otimizar o número total de bytes necessários para exibir a página. Além disso, o redimensionamento não é somente uma função do número de pixels subtraídos da imagem, mas também dos pixels subtraídos do tamanho natural.

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Tamanho natural</th>
    <th>Tamanho de exibição</th>
    <th>Pixels desnecessários</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="natural">110 x 110</td>
  <td data-th="exibição">100 x 100</td>
  <td data-th="sobrecarga">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="natural">410 x 410</td>
  <td data-th="exibição">400 x 400</td>
  <td data-th="sobrecarga">410 x 410 - 400 x 400 = 8.100</td>
</tr>
<tr>
  <td data-th="natural">810 x 810</td>
  <td data-th="exibição">800 x 800</td>
  <td data-th="sobrecarga">810 x 810 - 800 x 800 = 16.100</td>
</tr>
</tbody>
</table>

Nos três casos acima, o tamanho de exibição tem `apenas 10 pixels a menos` do que o tamanho natural da imagem. No entanto, o número de pixels extra que teríamos que codificar e enviar é significativamente maior do que o tamanho natural. Consequentemente, embora não seja possível garantir que todos os recursos de imagem sejam exibidos no tamanho exato de exibição, **você deve garantir que o número de pixels desnecessários seja mínimo e que os recursos maiores, especificamente, se aproximem do tamanho máximo de exibição.**

## Lista de verificação da otimização de imagens

A otimização de imagens é uma arte e uma ciência: é uma arte porque não há uma maneira ideal para compactar uma determinada imagem. Ela é uma ciência porque há várias técnicas e algoritmos avançados que podem reduzir bastante o tamanho de uma imagem.

Dicas e técnicas importantes para otimizar suas imagens:

* **Prefira formatos vetoriais:** as imagens vetoriais não dependem de resolução e escala e, por isso, são perfeitas para a grande variedade de dispositivos e telas de alta resolução que existem atualmente.
* **Faça a redução e a compactação de recursos SVG:** as marcações XML geradas pela maioria dos aplicativos de ilustração geralmente contêm metadados desnecessários que podem ser removidos. Verifique se seus servidores estão configurados para aplicar a compactação com o GZIP aos recursos SVG.
* **Escolha o melhor formato de imagem de varredura:** determine seus requisitos funcionais e selecione a melhor opção para cada recurso.
* **Faça testes com as configurações de qualidade ideais para os formatos de varredura:** não hesite em reduzir as configurações de `qualidade`, pois geralmente os resultados são muito bons e a redução do número de bytes é significativa.
* **Remova os metadados de imagem desnecessários:** muitas imagens de varredura possuem metadados desnecessários sobre o recurso: dados geográficos, informações da câmera etc. Use as ferramentas adequadas para excluir esses dados.
* **Exiba imagens dimensionadas:** redimensione as imagens no servidor e verifique se o tamanho de `exibição` está o mais próximo possível do tamanho `natural` da imagem. Esteja especialmente atento a imagens grandes, pois são elas que geram a maior sobrecarga quando redimensionadas.
* **Automatizar é a palavra de ordem:** invista em ferramentas e infraestrutura de automação para garantir que seus recursos de imagem estejam sempre otimizados.


{% include modules/nextarticle.liquid %}

{% endwrap %}

