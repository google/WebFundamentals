---
title: "Dimensione o conteúdo conforme a janela de visualização"
description: "Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela."
updated_on: 2014-04-30
key-takeaways:
  set-viewport:
    - "Use uma metatag de janela de visualização para controlar a largura e o dimensionamento da janela de visualização dos navegadores."
    - "Inclua <code>width=device-width</code> para corresponder à largura da tela em número de pixels, independentemente do dispositivo."
    - "Inclua <code>initial-scale=1</code> para estabelecer uma relação de 1:1 entre os pixels do CSS e os pixels independentes do dispositivo."
    - "Mantenha ativo o redimensionamento de usuários para garantir que a página seja acessível."
  size-content-to-vp:
    - "Não use elementos grandes de largura fixa."
    - "O conteúdo não deve depender de uma largura específica da janela de visualização para que seja processado adequadamente."
    - "Use consultas de mídia de CSS para aplicar diferentes formatações de estilo a telas pequenas e grandes."
  media-queries:
    - "As consultas de mídia podem ser usadas para aplicar estilos com base nas características dos dispositivos."
    - "Use <code>min-width</code> sobre <code>min-device-width</code> para proporcionar uma experiência eficiente em telas mais largas."
    - "Use tamanhos relativos para elementos a fim de evitar quebra do layout."
  choose-breakpoints:
    - "Crie pontos de quebra com base no conteúdo, nunca em dispositivos, marcas ou produtos específicos."
    - "Elabore o projeto primeiramente para o menor dispositivo móvel e amplie a experiência de modo progressivo à medida que ela for disponibilizada em telas maiores."
    - "Mantenha as linhas de texto em no máximo 70 ou 80 caracteres."
notes:
  use-commas:
    - "Use uma vírgula para separar atributos e garantir que os navegadores mais antigos possam analisá-los corretamente."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  Tanto em computadores quanto em dispositivos móveis, os usuários estão acostumados a rolar as páginas em sentido vertical, não em sentido horizontal. Ao forçar o usuário a rolar uma página horizontalmente ou diminuir o zoom para ver todo o conteúdo da página, você gera uma experiência insatisfatória.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

Ao desenvolver um site para dispositivos móveis com uma metatag de janela de visualização, é fácil criar de forma acidental um conteúdo inadequado à largura da janela de visualização especificada. Por exemplo, uma imagem exibida em uma largura maior que a janela de visualização pode fazer com que a página tenha que ser rolada em sentido horizontal. Ajuste esse conteúdo para adequar-se à largura da janela de visualização, de forma que o usuário não precise rolar em sentido horizontal.

Como as dimensões e a largura da tela nos pixels do código CSS variam enormemente conforme os dispositivos (entre celulares e tablets, e mesmo entre diferentes celulares), o conteúdo não deve depender de uma largura de janela específica para ser corretamente processado.

A definição de elementos com grandes larguras absolutas no código CSS (como no exemplo abaixo) fará com que o div seja largo demais para a janela de visualização em um dispositivo mais estreito (por exemplo, um dispositivo com uma largura de 320 pixels no CSS, como um iPhone). Em vez disso, considere usar valores de largura relativos, como `width: 100%`.  Da mesma forma, cuidado ao usar grandes valores absolutos para definir posicionamento, já que eles podem fazer com que o elemento fique fora da janela de visualização em dispositivos com telas pequenas.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Página com um elemento fixo de 344 px de largura em um iPhone.">
      Ver o exemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Página com um elemento fixo de 344 px em um Nexus 5.">
      Ver o exemplo
    {% endlink_sample %}
  </div>
</div>



