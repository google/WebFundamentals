---
title: "Otimizar imagens para aprimorar o desempenho"
description: "As imagens geralmente representam a maioria dos bytes do download de uma página e com frequência ocupam uma parte significativa do espaço visualizado nela."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Use a imagem mais indicada de acordo com as características de exibição, considerando o tamanho da tela, a resolução do dispositivo e o layout da página."
    - "Altere a propriedade <code>background-image</code> no CSS para telas com alto DPI usando consultas de mídia com <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>."
    - "Use <code>srcset</code> para fornecer imagens de alta resolução junto com a imagem de 1x na marcação."
    - "Considere os custos de desempenho ao usar técnicas de substituição de imagem JavaScript ou ao veicular imagens de alta resolução fortemente compactadas em dispositivos com resoluções inferiores."
  avoid-images:
    - "Evite imagens sempre que possível e aproveite as funcionalidades do navegador. Use caracteres unicode no lugar das imagens e substitua ícones complexos por fontes de ícones."
  optimize-images:
    - "Não escolha um formato de imagem de forma aleatória, procure conhecer os diferentes formatos disponíveis e use o mais indicado para seu caso."
    - "Inclua ferramentas de otimização e compactação de imagem no fluxo de trabalho para reduzir o tamanho dos arquivos."
    - "Coloque as imagens usadas com maior frequência em conjuntos de imagens (sprites) para reduzir o número de solicitações http."
    - "Considere carregar as imagens somente quando o local da página em que elas se encontram for visualizado, reduzindo assim o tempo de carregamento inicial da página."
notes:
  compressive:
    - "Tenha cuidado com a técnica de compactação por causa dos altos custos associados de memória e decodificação.  O redimensionamento de grandes imagens para adequação a telas menores custa caro e pode se tornar uma tarefa difícil em dispositivos mais antigos, cuja memória e capacidade de processamento são reduzidas."
related-guides:
  optimize:
  -
      title: "Otimização de imagens"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        title: "Como otimizar a eficiência do conteúdo"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  As imagens geralmente representam a maioria dos bytes do download de uma página e com frequência ocupam uma parte significativa do espaço visualizado nela. Com isso, a otimização das imagens pode proporcionar uma das melhores formas de economia de bytes e aprimoramento de desempenho para os sites: quanto menor o número de bytes no download do navegador, menos concorrência haverá pela largura de banda do cliente e mais rápido será feito o download pelo navegador para exibir todo o conteúdo da página.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Escolha o formato apropriado

Existem dois tipos de imagem a ser considerados: [imagens vetoriais](http://pt.wikipedia.org/wiki/Desenho_vetorial) e [imagens de varredura](http://pt.wikipedia.org/wiki/Raster). Para as imagens de varredura, talvez seja necessário escolher também o formato adequado de compactação, por exemplo, GIF, PNG e JPG.

As **imagens de varredura**, como fotografias e outras imagens, são representadas como uma grade de pontos ou pixels individuais. As imagens de varredura geralmente são originadas em câmeras ou digitalizadores (scanners) e também podem ser criadas no navegador com o elemento `canvas`.  À medida que o tamanho da imagem é ampliado, o tamanho do arquivo também é.  Quando dimensionadas para um tamanho maior que o original, as imagens de varredura ficam borradas porque o navegador não sabe como preencher os pixels ausentes.

As **imagens vetoriais`, como logotipos e desenhos lineares, são definidas por um conjunto de curvas, linhas, formas e cores de preenchimento. Essas imagens são criadas com programas como o Adobe Illustrator ou o Inkscape e salvas em formato vetorial, como [`SVG`](http://css-tricks.com/using-svg/).  Como as imagens vetoriais são criadas em arquivos primitivos simples, elas podem ser redimensionadas sem qualquer perda de qualidade e sem mudança no tamanho do arquivo.

Ao escolher o formato mais indicado, é importante considerar a origem da imagem (de varredura ou vetorial) e o conteúdo (cores, animação, texto etc.). Nenhum formato se ajustará a todos os tipos de imagem, e cada um tem suas próprias vantagens e desvantagens.

Siga estas diretrizes ao escolher o formato mais apropriado:

* Use JPG para imagens fotográficas.
* Use SVG para desenhos vetoriais e imagens com cores sólidas, como logotipos e desenhos lineares.
  Se o formato vetorial não estiver disponível, use WebP ou PNG.
* Use PNG em vez de GIF, já que o formato PNG permite mais cores e oferece taxas de compactação melhores.
* Para animações mais longas, considere o uso do atributo `<video>`, que fornece uma qualidade de imagem superior e permite ao usuário controlar a reprodução.

## Reduza o tamanho do arquivo

O tamanho do arquivo de imagem pode ser reduzido consideravelmente. Para isso, é necessário realizar um processo de `pós-processamento` após salvar o arquivo. Existem inúmeras ferramentas que comprimem imagens: compactação com e sem perdas, on-line, GUI, linha de comando etc.  Sempre que possível, é mais indicado tentar automatizar a otimização de imagens para garantir a qualidade desse processo no fluxo de trabalho.

Diversas ferramentas estão disponíveis para realizar uma compactação mais detalhada e sem perdas em arquivos JPG e PNG que não prejudicará a qualidade da imagem. Para imagens JPG, use [jpegtran](http://jpegclub.org/) ou [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (disponível somente para Linux, deve ser executado com a opção `strip-all`). Para arquivos PNG, use [OptiPNG](http://optipng.sourceforge.net/) ou [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

## Use painéis de imagens (sprites)

O código CSS oferece uma técnica pela qual diversas imagens são combinadas em uma única imagem, formando um `painel de imagens`, também chamado de `sprite sheet`. Em seguida, as imagens individuais podem ser usadas. Para isso, é especificada a imagem de segundo plano de um elemento (o painel de imagens) e um ajuste é feito para exibir a parte correta da imagem.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt=" Painel de imagens usado no exemplo">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

O uso do painel de imagens (`spriting`) oferece a vantagem de reduzir o número de downloads necessários para exibir diversas imagens enquanto mantém o armazenamento em cache.

## Considere o carregamento ocioso

O carregamento ocioso exibe as imagens abaixo da dobra conforme o necessário ou após o carregamento e o processamento do conteúdo principal, podendo acelerar consideravelmente a exibição de páginas longas. Além das melhorias de desempenho, o uso do carregamento ocioso pode criar experiências de rolagem de página infinitas.

Tenha cuidado ao criar páginas com rolagem infinita. Como o conteúdo é carregado à medida que se torna visível, os mecanismos de pesquisa podem não localizar esse conteúdo.  Além disso, os usuários que procuram informações localizadas no rodapé da página nunca as encontrarão, pois sempre haverá novos conteúdos sendo carregados.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




