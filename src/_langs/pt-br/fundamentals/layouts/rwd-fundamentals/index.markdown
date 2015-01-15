---
layout: section
title: "Princípios básicos de Web design responsivo"
description: "Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela."
introduction: "O uso de dispositivos móveis para navegar pela Web está aumentando em ritmo astronômico. No entanto, grande parte da Web não está otimizada para esses dispositivos. Os dispositivos móveis muitas vezes são limitados pelo tamanho da tela e exigem uma abordagem diferente em relação à forma como o conteúdo será disposto na tela."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
authors:
  - petelepage
id: rwd-fundamentals
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Use uma metatag de janela de visualização para controlar a largura e o dimensionamento da janela de visualização dos navegadores.
    - Inclua <code>width=device-width</code> para corresponder à largura da tela em número de pixels, independentemente do dispositivo.
    - Inclua <code>initial-scale=1</code> para estabelecer uma relação de 1:1 entre os pixels do CSS e os pixels independentes do dispositivo.
    - Mantenha ativo o redimensionamento de usuários para garantir que a página seja acessível.
  size-content-to-vp:
    - Não use elementos grandes de largura fixa.
    - O conteúdo não deve depender de uma largura específica da janela de visualização para que seja processado adequadamente.
    - Use consultas de mídia de CSS para aplicar diferentes formatações de estilo a telas pequenas e grandes.
  media-queries:
    - As consultas de mídia podem ser usadas para aplicar estilos com base nas características dos dispositivos.
    - Use <code>min-width</code> sobre <code>min-device-width</code> para proporcionar uma experiência eficiente em telas mais largas.
    - Use tamanhos relativos para elementos a fim de evitar quebra do layout.
  choose-breakpoints:
    - Crie pontos de quebra com base no conteúdo, nunca em dispositivos, marcas ou produtos específicos.
    - Elabore o projeto primeiramente para o menor dispositivo móvel e amplie a experiência de modo progressivo à medida que ela for disponibilizada em telas maiores.
    - Mantenha as linhas de texto em no máximo 70 ou 80 caracteres.
remember:
  use-commas:
    - Use uma vírgula para separar atributos e garantir que os navegadores mais antigos possam analisá-los corretamente.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/oK09n_PGhTo?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

Existem inúmeros tamanhos de tela em diferentes celulares, `phablets`, tablets, computadores, consoles de videogame, TVs e até mesmo telas incorporadas em acessórios pessoais.  Os tamanhos das telas estão em constante evolução, por isso, é importante que seu site possa se adaptar a qualquer tamanho disponível hoje e no futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Web design responsivo, definido originalmente por [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/), relaciona-se às necessidades dos usuários e aos dispositivos que eles usam.  O layout é alterado de acordo com o tamanho e os recursos do dispositivo.  Por exemplo, em um celular, os usuários veem o conteúdo disposto em uma única coluna. Um tablet possivelmente exibirá o mesmo conteúdo em duas colunas.

{% include modules/nextarticle.liquid %}

{% endwrap %}

