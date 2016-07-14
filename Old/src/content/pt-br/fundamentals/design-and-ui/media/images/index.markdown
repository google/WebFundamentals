---
title: "Imagens"
description: "Uma imagem vale por mil palavras, e as imagens desempenham uma função importante em todas as páginas. Mas elas muitas vezes também representam quase todos os bytes no carregamento da página.  Com o Web design responsivo, não só os layouts podem ser modificados com base nas características do dispositivo, como também as imagens."
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
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  Uma imagem vale por mil palavras, e as imagens desempenham uma função importante em todas as páginas. Mas elas muitas vezes também representam quase todos os bytes no carregamento da página.  Com o Web design responsivo, não só os layouts podem ser modificados com base nas características do dispositivo, como também as imagens.
</p>



### Imagens responsivas

O Web design responsivo significa que não somente os layouts podem ser modificados com base nas características do dispositivo, mas as imagens também.  Por exemplo, em telas de alta resolução (2x), é necessário usar imagens de alta resolução para garantir a nitidez.  Uma imagem com 50% de largura pode funcionar com eficácia quando o navegador tem 800 px de largura, mas usará um espaço excessivo em um telefone com tela estreita. Além disso, ela usará a mesma largura de banda quando for diminuída para caber em uma tela menor.

### Direção de arte

<img class="center" src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Outras vezes, talvez seja necessário alterar a imagem de forma mais drástica: mudando as proporções, fazendo cortes e até mesmo substituindo toda a imagem.  Nesse caso, a alteração da imagem geralmente é denominada direção de arte.  Acesse [responsiveimages.org/demos/](http://responsiveimages.org/demos/) para ver mais exemplos.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



