project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml


{# wf_updated_on: 2014-05-09 #}
{# wf_published_on: 2014-05-06 #}

# Otimização de Imagens {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

As imagens são frequentemente responsáveis pela maioria dos bytes baixados em uma página da Web, além de muitas vezes ocuparem uma quantidade considerável de espaço visual. Consequentemente, a otimização das imagens pode gerar algumas das maiores economias de bytes e melhorias de desempenho para seu site: quanto menos bytes o navegador precisar baixar, menor será a concorrência pela largura de banda do cliente e mais rápido o navegador poderá baixar e renderizar conteúdo útil na tela.

A otimização de imagens é uma arte e uma ciência. Uma arte, porque não existe resposta definitiva sobre qual a melhor forma de comprimir uma imagem individual. E uma ciência, porque existem diversas técnicas e algoritmos bem desenvolvidos que podem reduzir substancialmente o tamanho de uma imagem. A identificação das configurações ideais para uma imagem exige uma análise cuidadosa de diversos fatores: recursos do formato, conteúdo dos dados codificados, qualidade e dimensões em pixels, entre outros.

## Eliminar e substituir imagens

### TL;DR {: .hide-from-toc }
- Elimine recursos de imagem desnecessários
- Use efeitos CSS3 sempre que possível
- Use fontes da Web em vez de codificar texto em imagens


A primeira pergunta que você deve responder é se uma imagem é realmente necessária para alcançar o efeito que você deseja. Além de ser simples, um bom design proporciona o melhor desempenho. Se for possível eliminar um recurso de imagem, que normalmente exige um grande número de bytes em comparação ao HTML, CSS, JavaScript e outros ativos na página, essa será sempre a melhor estratégia de otimização. Por outro lado, uma imagem bem posicionada também pode comunicar mais informações que mil palavras. Cabe a você encontrar esse equilíbrio.

Em seguida, considere a existência de uma tecnologia alternativa que possa fornecer os resultados desejados com maior eficiência:

* **Efeitos CSS** (gradientes, sombras etc.) e animações CSS podem ser usados para produzir ativos independentes de resolução que sempre parecem nítidos em todas as resoluções e níveis de zoom. Muitas vezes, usando uma fração dos bytes necessários para um arquivo de imagem.
* **Fontes da Web** permitem usar fontes elegantes e preservar a capacidade de selecionar, pesquisar e redimensionar texto, um aprimoramento considerável de usabilidade.

Se por acaso você pensar em codificar texto em um ativo de imagem, pare e pense novamente. Uma boa tipografia é essencial para um bom design, uso de marca e legibilidade. No entanto, textos em imagem oferecem uma experiência do usuário de baixa qualidade: o texto não é selecionável, pesquisável, redimensionável, acessível ou fácil de usar em dispositivos com alto DPI. O uso de fontes da Web exige o seu [próprio conjunto de otimizações](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), mas resolve todas essas questões e é sempre uma melhor opção para a exibição de texto.


## Imagens vetoriais vs. de raster

### TL;DR {: .hide-from-toc }
- As imagens vetoriais são ideais para imagens que contêm formas geométricas
- As imagens vetoriais independem de zoom e resolução
- As imagens de raster devem ser usadas para cenas complexas, com muitos detalhes e formas irregulares


Depois de determinar que uma imagem é realmente o formato ideal para conseguir o efeito desejado, a próxima opção importante e selecionar o formato adequado:

<div class="attempt-left">
  <figure>
    <img src="images/vector-zoom.png" alt="Imagem vetorial com zoom aproximado">
    <figcaption>Imagem vetorial com zoom aproximado</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/raster-zoom.png" alt="Imagem de raster com zoom aproximado">
    <figcaption>Imagem de raster com zoom aproximado</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

* Os [gráficos vetoriais](https://en.wikipedia.org/wiki/Vector_graphics) usam linhas, pontos e polígonos para representar uma imagem.
* Os [gráficos de raster](https://en.wikipedia.org/wiki/Raster_graphics) representam uma imagem codificando os valores individuais de cada pixel dentro de uma grade retangular.

Cada formato tem seu próprio conjunto de vantagens e desvantagens. Os formatos vetoriais são ideais para imagens que consistem em formas geométricas simples (por exemplo, logotipos, texto, ícones, etc.) e oferecem resultados nítidos em todas as configurações de resolução e nível de zoom. É um formato muito adequado para telas e ativos de alta resolução que precisam ser exibidos em diversos tamanhos.

No entanto, os formatos vetoriais deixam a desejar quando a cena é complexa (por exemplo, uma fotografia). A quantidade de marcação SVG para descrever todas as formas pode ser extremamente alta e a saída ainda não terá um "realismo fotográfico". Se isso ocorrer, é o momento de usar um formato de imagem de raster como GIF, PNG, JPEG ou um dos formatos mais novos como JPEG-XR e WebP.

As imagens de raster não tem as mesmas propriedades convenientes de independência de resolução ou nível de zoom. Quando você aumenta a escala de uma imagem de raster, vê gráficos serrilhados e borrados. Portanto, pode ser necessário salvar várias versões de uma imagem de raster com diversas resoluções para oferecer a experiência ideal a seus usuários.


## Implicações das telas de alta resolução

### TL;DR {: .hide-from-toc }
- As telas de alta resolução têm vários pixels de dispositivo por pixel de CSS
- As imagens de alta resolução exigem um número consideravelmente maior de pixels e bytes
- As técnicas de otimização de imagem são as mesmas, independentemente da resolução


Quando falamos sobre pixels de imagem, precisamos distinguir entre os diferentes tipos de pixels: pixels de CSS e pixels do dispositivo. Um único pixel de CSS podem conter vários pixels do dispositivo. Por exemplo, um único pixel de CSS pode corresponder diretamente a um único pixel de dispositivo ou a vários pixels de dispositivo. E o que significa isso? Bem, quantos mais pixels de dispositivo, maiores os detalhes do conteúdo exibido na tela.

<img src="images/css-vs-device-pixels.png"  alt="Pixels de CSS vs. pixels de dispositivo">

Telas com alto DPI (HiDPI) produzem belos resultados, mas há um compromisso evidente: nossos ativos de imagem exigem mais detalhes para poder aproveitar a maior quantidade de pixels de dispositivo. A vantagem é que as imagens vetoriais são perfeitamente adequadas para essa tarefa, pois podem ser renderizadas em qualquer resolução com resultados nítidos. Podemos ter de pagar um alto custo de processamento para renderizar o maior número de detalhes, mas o ativo subjacente é o mesmo e independe da resolução.

Por outro lado, imagens de raster são um desafio muito maior, pois codificam dados de imagem por pixel. Portanto, quanto maior o número de pixels, tanto maior o tamanho do arquivo de uma imagem de raster. Por exemplo, vamos considerar as diferenças entre um ativo de fotografia exibido com 100x100 pixels (CSS):

<table>
<thead>
  <tr>
    <th>Resolução da tela</th>
    <th>Total de pixels</th>
    <th>Tamanho do arquivo não comprimido (4 bytes por pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="total pixels">100 x 100 = 10.000</td>
  <td data-th="filesize">40.000 bytes</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="total pixels">100 x 100 x 4 = 40.000</td>
  <td data-th="filesize">160.000 bytes</td>
</tr>
<tr>
  <td data-th="resolution">3x</td>
  <td data-th="total pixels">100 x 100 x 9 = 90.000</td>
  <td data-th="filesize">360.000 bytes</td>
</tr>
</tbody>
</table>

Quando multiplicamos a tela física por dois, o número total de pixels é multiplicado por quatro: o dobro do número de pixels horizontais multiplicado pelo dobro do número de pixels verticais. Assim, uma tela duas vezes maior não duplica, mas quadruplica o número de pixels necessários!

O que isso significa na prática? As telas de altas resolução nos permitem exibir belas imagens, que podem ser um ótimo recurso do produto. No entanto, elas também exigem imagens de alta resolução. Prefira imagens vetoriais sempre que possível, pois não dependem de resolução e sempre oferecem resultados nítidos. Se for necessário usar uma imagem de raster, forneça e otimize diversas variantes de cada imagem com a ajuda de [`srcset` e `picture`](/web/fundamentals/design-and-ux/media/images#images-in-markup).

## Otimizar imagens vetoriais

### TL;DR {: .hide-from-toc }
- O SVG é um formato de imagem baseado em XML
- Os arquivos SVG devem ser minimizados para reduzir seu tamanho
- Os arquivos SVG devem ser compactados com GZIP


Todos os navegadores modernos são compatíveis com Scalable Vector Graphics (SVG), um formato de imagem baseado em XML para gráficos bidimensionais. Podemos incorporar a marcação do SVG diretamente na página ou como um recurso externo. Por sua vez, é possível criar um arquivo SVG com a maioria dos softwares de desenho baseados em vetor ou de forma manual e direta no seu editor de texto favorito.


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
    

O exemplo acima renderiza uma forma circular simples, com borda preta e fundo vermelho, e foi exportado do Adobe Illustrator. Como você pode ver, o exemplo contém muitos metadados, como informações sobre camadas, comentários e namespaces XML que, muitas vezes, não são necessários para renderizar o ativo no navegador. Como resultado, é sempre uma boa ideia minimizar arquivos SVG por meio de uma ferramenta como o [svgo](https://github.com/svg/svgo).

Neste caso, o svgo reduz o tamanho do arquivo SVG acima, gerado pelo Illustrator, em 58%, reduzindo-o de 470 para 199 bytes. Além disso, como o SVG é um formato baseado em XML, também podemos aplicar a compactação do GZIP para reduzir seu tamanho de transferência. Verifique se o servidor está configurado para compactar ativos do SVG.


## Otimização de imagens de raster

### TL;DR {: .hide-from-toc }
- Uma imagem de raster é uma grade de pixels
- Cada pixel codifica informações de cor e transparência
- Os compressores de imagem usam diversas técnicas para reduzir o número de bits necessários por pixel e reduzir o tamanho do arquivo da imagem


Uma imagem de raster é simplesmente uma grade bidimensional de pixels individuais. Por exemplo, uma imagem de 100x100 pixels é uma sequência de 10.000 pixels. Por sua vez, cada pixel armazena os valores "[RGBA](https://en.wikipedia.org/wiki/RGBA_color_space)": canal vermelho ou (R)ed, canal verde ou (G)reen, canal azul ou (B)lue e canal alfa ou (A)lpha (transparência).

Internamente, o navegador aloca 256 valores (tons) por canal, o que corresponde a 8 bits por canal (2 ^ 8 = 256) e 4 bytes por pixel (4 canais x 8 bits = 32 bits = 4 bytes). Portanto, se soubermos as dimensões da grade, poderemos calcular facilmente o tamanho do arquivo:

* uma imagem com 100x100 pixels consiste em 10.000 pixels
* 10.000 pixels x 4 bytes = 40.000 bytes
* 40.000 bytes/1024 = 39 KB

Observação: Como comentário, independentemente do formato de imagem usado para transferir os dados do servidor para o cliente, quando a imagem é decodificada pelo navegador, cada pixel ocupa 4 bytes de memória. Isso pode ser uma restrição importante para imagens grandes e dispositivos que não têm muita memória disponível. Por exemplo, dispositivos móveis básicos.

<table>
<thead>
  <tr>
    <th>Dimensões</th>
    <th>Pixels</th>
    <th>Tamanho do arquivo</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensions">100x100</td>
  <td data-th="pixels">10.000</td>
  <td data-th="file size">39 KB</td>
</tr>
<tr>
  <td data-th="dimensions">200x200</td>
  <td data-th="pixels">40.000</td>
  <td data-th="file size">156 KB</td>
</tr>
<tr>
  <td data-th="dimensions">300x300</td>
  <td data-th="pixels">90.000</td>
  <td data-th="file size">351 KB</td>
</tr>
<tr>
  <td data-th="dimensions">500x500</td>
  <td data-th="pixels">250.000</td>
  <td data-th="file size">977 KB</td>
</tr>
<tr>
  <td data-th="dimensions">800x800</td>
  <td data-th="pixels">640.000</td>
  <td data-th="file size">2.500 KB</td>
</tr>
</tbody>
</table>

Pode ser que 39 KB para uma imagem de 100x100 pixels não seja muita coisa, mas o tamanho do arquivo explode rapidamente para imagens maiores, fazendo com que o download de ativos de imagem seja lento e caro. Felizmente, o que descrevemos até agora é o formato de imagem "não comprimido". O que podemos fazer para reduzir o tamanho do arquivo de imagem?

Uma estratégia simples é reduzir a "intensidade de bits" da imagem de 8 bits para uma paleta de cores menor. Com 8 bits por canal, temos 256 valores por canal e 16.777.216 (2563) cores no total. E se reduzirmos a paleta para 256 cores? Nesse caso, precisaríamos apenas de 8 bits para os canais RGB e obteríamos uma economia imediata de dois bytes por pixel, o que é uma economia de compressão de 50% em relação ao formato original de 4 bytes por pixel.

<img src="images/artifacts.png"  alt="Artefatos de compressão">

Observação: Da esquerda para a direita (PNG): 32 bits (16 milhões de cores), 7 bits (128 cores), 5 bits (32 cores). Cenas complexas com transições de cor graduais (gradientes, céu, etc.) exigem paletas de cores maiores para evitar artefatos visuais como o céu serrilhado no ativo de 5 bits. Por outro lado, se a imagem usar apenas algumas cores, uma paleta grande será apenas um desperdício de bits preciosos!

Após otimizar os dados armazenados em pixels individuais, podemos usar mais inteligência e examinar também os pixels próximos. Acontece que muitas imagens, especialmente fotografias, têm muitos pixels próximos com cores semelhantes. Por exemplo, o céu, texturas repetidas etc. O compressor pode usar essas informações em nosso benefício para aplicar a "[codificação delta](https://en.wikipedia.org/wiki/Delta_encoding)". Em vez de armazenar os valores individuais de cada pixel, podemos armazenar a diferença entre pixels próximos. Se os pixels adjacentes forem iguais, o delta será "zero" e precisaremos armazenar apenas um único bit. E não vamos parar por aí...

O olho humano tem níveis diferentes de sensibilidade para cores diferentes. Podemos otimizar nossa codificação de cores para considerar essa característica, reduzindo ou aumentando a paleta para essas cores.
Os pixels "próximos" formam uma grade bidimensional, o que significa que cada pixel tem vários vizinhos. Podemos usar esse fato para aprimorar ainda mais a codificação delta.
Em vez de examinar apenas os vizinhos imediatos de cada pixel, podemos examinar blocos maiores de pixels próximos e codificar blocos diferentes com configurações diferentes. E assim por diante...

Como podemos ver, a otimização de imagens fica rapidamente complicada (ou divertida, dependendo do ponto de vista) e é uma área ativa de pesquisa acadêmica e comercial. As imagens ocupam muitos bytes e o desenvolvimento de melhores técnicas de compressão de imagem gera muitos benefícios. Se você está curioso e quer saber mais, acesse a [página da Wikipedia](https://en.wikipedia.org/wiki/Image_compression) ou confira o [whitepaper de técnicas de compressão do WebP](/speed/webp/docs/compression) para ver um exemplo prático.

Novamente, tudo isso é incrível, mas também muito acadêmico. Como isso nos ajuda a otimizar imagens em nossas páginas? Bem, certamente não estamos na posição de inventar novas técnicas de compressão, mas é importante compreender o formato do problema: pixels RGBA, intensidade de bits e diversas técnicas de otimização. Todos esses conceitos são essenciais para compreender e manter na mente antes de discutirmos os diversos formatos de imagem de raster.


## Compressão de imagem sem perda vs. com perda

### TL;DR {: .hide-from-toc }
- Devido à forma como nossos olhos funcionam, as imagens são ótimas candidatas à compressão com perda
- A otimização de imagem é uma função da compressão com e sem perda
- As diferenças nos formatos de imagem são causadas pela diferença na escolha e no modo de utilização dos algoritmos com e sem perda usados para otimizar a imagem
- Não existe um único formato melhor ou uma única "configuração de qualidade" para todas as imagens. Cada combinação de um compressor e um conteúdo de imagem específicos gera uma saída única


Para alguns tipos de dados, como o código-fonte de uma página, ou um arquivo executável, é essencial que o compressor não altere ou perca nenhuma das informações originais. Um único bit de dados ausente ou incorreto pode alterar totalmente o significado do conteúdo do arquivo ou, o que é pior, invalidá-lo totalmente. Para alguns outros tipos de dados, como imagens, áudio e vídeo, pode ser perfeitamente aceitável fornecer uma representação "aproximada" dos dados originais.

Na verdade, devido à forma como o olho funciona, podemos muitas vezes descartar algumas informações sobre cada pixel para reduzir o tamanho do arquivo de uma imagem. Por exemplo, nossos olhos têm sensibilidade diferente às diversas cores, o que significa que podemos usar menos bits para codificar algumas cores. Como resultado, um fluxo normal de otimização de imagem consiste em duas etapas resumidas:

1. A imagem é processada com um filtro "[com perda](https://en.wikipedia.org/wiki/Lossy_compression)" que elimina alguns dados dos pixels
1. A imagem é processada com um filtro "[sem perda](https://en.wikipedia.org/wiki/Lossless_compression)" que comprime os dados dos pixels

**A primeira etapa é opcional. O algoritmo exato utilizado depende do formato de imagem específico, mas é importante compreender que qualquer imagem pode passar por um passo de compressão com perda para reduzir seu tamanho.** Na verdade, a diferença entre os diversos formatos de imagem, como GIF, PNG, JPEG e outros, é a combinação de algoritmos específicos usados (ou não usados) para aplicar as etapas com perda e sem perda.

Então, qual é a configuração "ideal" da otimização com e sem perda? A resposta depende do conteúdo da imagem e de seus próprios critérios, como o compromisso entre tamanho de arquivo e artefatos introduzidos pela compressão com perda. Em alguns casos, a otimização com perda pode ser evitada para comunicar detalhes minuciosos com toda a fidelidade. Em outros casos, pode ser possível aplicar uma otimização com perda de forma agressiva para reduzir o tamanho do arquivo do ativo de imagem.  É aí que seu próprio julgamento e o contexto precisam ser considerados. Não existe uma configuração universal.

<img src="images/save-for-web.png" class="attempt-right" alt="Salvar para a Web">

Como exemplo prático, quando usar um formato com perda como JPEG, o compressor normalmente exibirá uma configuração personalizável de "qualidade" (por exemplo, o controle deslizante de qualidade oferecido pela funcionalidade "Salvar para a Web" no Adobe Photoshop). Essa configuração costuma ser um número entre 1 e 100 que controla o funcionamento interno da coleção específica dos algoritmos com e sem perda. Para obter os melhores resultados, experimente diversas configurações de qualidade para suas imagens e não tenha receio de diminuir a qualidade. Os resultados visuais são com frequência muito bons e as economias no tamanho do arquivo podem ser consideráveis.

Observação: Observe que os níveis de qualidade para os diferentes formatos de imagem não são diretamente comparáveis devido a diferenças nos algoritmos usados para codificar a imagem. Um JPEG com qualidade 90 gera um resultado bem diferente de um WebP com qualidade 90. Na verdade, até mesmo níveis de qualidade do mesmo formato de imagem podem gerar saídas visivelmente diferentes de acordo com a implementação do compressor.


## Selecionar o formato da imagem correto

### TL;DR {: .hide-from-toc }
- Comece selecionado o formato universal correto: GIF, PNG, JPEG
- Experimente e selecione as melhores configurações para cada formato: qualidade, tamanho da paleta etc.
- Considere a adição de ativos WebP e JPEG XR para clientes modernos


Além de algoritmos de compressão com e sem perda diferentes, os diversos formatos de imagem oferecem recursos diferentes como canais de animação e transparência (alfa). Como resultado, a escolha do "formato certo" para uma determinada imagem é uma combinação dos resultados visuais desejados com os requisitos funcionais.


<table>
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
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparency">Sim</td>
  <td data-th="animation">Sim</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparency">Sim</td>
  <td data-th="animation">Não</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparency">Não</td>
  <td data-th="animation">Não</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparency">Sim</td>
  <td data-th="animation">Sim</td>
  <td data-th="browser">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparency">Sim</td>
  <td data-th="animation">Sim</td>
  <td data-th="browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Existem três formatos de imagem com compatibilidade universal: GIF, PNG e JPEG. Além desses formatos, alguns navegadores também são compatíveis com formatos mais recentes, como WebP e JPEG XR, que oferecem uma melhor compressão geral e mais recursos. Então, que formato deve ser usado?

<img src="images/format-tree.png"  alt="Salvar para a Web">

1. **Você precisa de animação? Se precisar, o GIF é a única opção universal.**
    * O GIF limita a paleta de cores a no máximo 256 cores, o que é uma opção insatisfatória para a maioria das imagens. Além disso, o PNG-8 oferece uma compressão melhor para imagens com uma paleta pequena. Portanto, GIF é a resposta certa apenas quando a animação é necessária.
1. **Você precisa preservar detalhes minuciosos com a mais alta resolução? Use PNG.**
    * O PNG não aplica nenhum algoritmo de compressão com perda além da escolha do tamanho da paleta de cores. Assim, ele gera a imagem de mais alta qualidade, mas com o custo de um tamanho de arquivo consideravelmente maior que outros formatos. Use com critério.
    * Se o ativo de imagem for composto por formas geométricas, considere a conversão para um formato vetorial (SVG).
    * Se o ativo de imagem tiver texto, pare e pense novamente. Não é possível selecionar, pesquisar nem alterar o zoom de texto em imagens. Se você precisa oferecer uma aparência personalizada (para uso de marca ou por outros motivos), use uma fonte da Web.
1. **Você está otimizando uma fotografia, uma captura de tela ou um ativo de imagem semelhante? Use JPEG.**
    * O JPEG usa uma combinação de otimização com e sem perda para reduzir o tamanho de arquivo de um ativo de imagem. Tente diversos níveis de qualidade de JPEG para encontrar o melhor compromisso qualidade vs. tamanho do arquivo para o seu ativo.

Por fim, após determinar o formato de imagem ideal e suas configurações para cada um dos ativos, considere a adição de uma variante adicional codificada em WebP e JPEG XR. Os dois formatos são novos e, infelizmente, não são (ainda) universalmente compatíveis com todos os navegadores. Mesmo assim, podem oferecer economias consideráveis para os clientes mais recentes. Por exemplo, na média, o WebP oferece uma [redução de 30% no tamanho do arquivo](/speed/webp/docs/webp_study) em relação a uma imagem JPEG comparável.

Como o WebP e o JPEG XR não contam com suporte universal, será necessário acrescentar lógica ao aplicativo ou aos servidores para servir o recurso adequado:

* Algumas CDNs fornecem otimização de imagens como serviço, incluindo fornecimento de JPEG XR e WebP.
* Algumas ferramentas de código aberto (por exemplo, PageSpeed para Apache ou Nginx) automatizam a otimização, a conversão e o envio de ativos adequados.
* Você pode adicionar lógica ao aplicativo para detectar o cliente, verificar os formatos compatíveis e servir o melhor formato de imagem disponível.

Por fim, observe que, se usar uma Webview para renderizar conteúdo no aplicativo nativo, você terá controle completo do cliente e poderá usar exclusivamente o WebP. O Facebook, o Google+ e muitos outros usam WebP para fornecer todas as imagens em seus aplicativos. As economias realmente compensam. Para saber mais sobre o WebP, confira a apresentação [WebP: implemente imagens menores e mais bonitas com maior rapidez](https://www.youtube.com/watch?v=pS8udLMOOaE) da Google I/O 2013.


## Ajuste de ferramentas e parâmetros

Não existe um formato, uma ferramenta ou um conjunto de parâmetros de otimização perfeito aplicável a todas as imagens. Para obter os melhores resultados, você terá de escolher o formato e suas configurações de acordo com o conteúdo da imagem e seus requisitos visuais e técnicos.

<table>
<thead>
  <tr>
    <th>Ferramenta</th>
    <th>Descrição</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="tool"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="description">crie e otimize imagens GIF</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="description">otimize imagens JPEG</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="description">otimização PNG sem perda</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="description">otimização PNG com perda</td>
</tr>
</tbody>
</table>


Não tenha receio de experimentar com os parâmetros de cada compressor. Reduza a qualidade, veja a aparência, faça alguns ajustes e repita. Quando encontrar um bom conjunto de configurações, pode aplicá-lo a outras imagens semelhantes no site, mas não suponha que todas as imagens devem ser comprimidas com as mesmas configurações.


## Fornecer ativos de imagem dimensionados corretamente

### TL;DR {: .hide-from-toc }
- O fornecimento de ativos dimensionados corretamente é uma das otimizações mais simples e eficazes
- Examine cuidadosamente ativos grandes, pois resultam em alta sobrecarga
- Reduza o número de pixels desnecessários alterando a escala da imagem para o tamanho de exibição


A otimização de imagens se resume a dois critérios: otimizar o número de bytes usados para codificar cada pixel de imagem e otimizar o número total de pixels. O tamanho de arquivo da imagem é simplesmente o número total de pixels multiplicado pelo número de bytes usados para codificar cada pixel. Nem mais, nem menos.

<img src="images/resized-image.png" class="attempt-right" alt="Imagem redimensionada">

Portanto, uma das técnicas de otimização mais simples e eficazes é garantir que não estamos enviando pixels além do necessário para exibir o ativo no tamanho pretendido no navegador. Parece simples, certo? Infelizmente, a maioria das páginas falha nesse teste em muitos dos ativos de imagem. Normalmente, elas enviam ativos maiores e dependem do navegador para redimensioná-las, consumindo mais recursos de CPU, e exibi-las com menor resolução.

Observação: Passe o cursor sobre o elemento de imagem no Chrome DevTools para revelar os tamanhos "natural" e de "exibição" do ativo de imagem. No exemplo acima, é baixada uma imagem com 300x260 pixels. No entanto, sua escala é reduzida (245x212) no cliente quando exibida.

A sobrecarga de enviar pixels desnecessários para que o navegador redimensione a imagem para nós é uma grande oportunidade perdida para reduzir e otimizar o número total de bytes necessários para renderizar a página. Além disso, observe que o redimensionamento não é apenas uma função do número de pixels reduzido da imagem, mas também de seu tamanho natural.

<table>
<thead>
  <tr>
    <th>Resolução da tela</th>
    <th>Tamanho natural</th>
    <th>Tamanho de exibição (pixels do CSS)</th>
    <th>Pixels desnecessários</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">110x110</td>
  <td data-th="display">100x100</td>
  <td data-th="overhead">110 x 110 - 100 x 100 = 2.100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">410x410</td>
  <td data-th="display">400x400</td>
  <td data-th="overhead">410 x 410 - 400 x 400 = 8.100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">810x810</td>
  <td data-th="display">800x800</td>
  <td data-th="overhead">810 x 810 - 800 x 800 = 16.100</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">220x220</td>
  <td data-th="display">100x100</td>
  <td data-th="overhead">210 x 210 - (2 x 100) x (2 x 100) = 8.400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">820x820</td>
  <td data-th="display">400x400</td>
  <td data-th="overhead">820 x 820 - (2 x 400) x (2 x 400) = 32.400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">1620x1620</td>
  <td data-th="display">800x800</td>
  <td data-th="overhead">1.620 x 1.620 - (2 x 800) x (2 x 800) = 64.400</td>
</tr>
</tbody>
</table>

Observe que em todos os casos acima, o tamanho de exibição é "apenas 10 pixels de CSS menor" que o ativo necessário para cada resolução de tela. No entanto, o número de pixels extras e a sobrecarga associada crescem rapidamente com o aumento das dimensões de exibição da imagem. Como resultado, embora você talvez não consiga garantir que cada ativo seja fornecido no tamanho exato de exibição, **você deve garantir que o número de pixels desnecessários seja mínimo e que seus ativos grandes sejam fornecidos com o tamanho mais próximo possível ao tamanho de exibição.**

## Lista de verificação da otimização de imagem

A otimização de imagens é uma arte e uma ciência. Uma arte, porque não existe resposta definitiva sobre qual a melhor forma de comprimir uma imagem individual. E uma ciência, porque existem diversas técnicas e algoritmos bem desenvolvidos que podem ajudar a reduzir substancialmente o tamanho de uma imagem.

Veja a seguir algumas dicas e técnicas a considerar durante a otimização das imagens:

* **Prefira os formatos vetoriais:** as imagens vetoriais são independentes de resolução e escala, o que as torna ideais para um mundo de muitos dispositivos e alta resolução.
* **Minimize e compacte ativos SVG:** a marcação XML produzida pela maioria dos aplicativos de desenho contêm muitas vezes metadados desnecessários que podem ser removidos. Verifique se os servidores estão configurados para aplicar compressão do GZIP em ativos SVG.
* **Escolha o melhor formato de imagem de raster:** determine seus requisitos funcionais e selecione o formato mais adequado a cada ativo específico.
* **Experimente com as configurações ideais de qualidade para os formatos de raster:** não tenha receio de reduzir as configurações de "qualidade". Os resultados são frequentemente muito bons e as economias de byte são consideráveis.
* **Remova metadados desnecessários da imagem:** muitas imagens de raster contêm metadados desnecessários sobre o ativo: informações geográficas e da câmera, entre outras. Use as ferramentas adequadas para remover esses dados.
* **Forneça imagens dimensionadas corretamente:** redimensione imagens no servidor e verifique se o tamanho de "exibição" é o mais próximo possível do tamanho "natural" da imagem. Verifique atentamente as imagens grandes, pois são responsáveis pelas maiores sobrecargas quando redimensionadas.
* **Automatize, automatize, automatize:** invista em ferramentas automatizadas e infraestrutura que assegurem que todos os ativos de imagem sejam sempre otimizados.


{# wf_devsite_translation #}
