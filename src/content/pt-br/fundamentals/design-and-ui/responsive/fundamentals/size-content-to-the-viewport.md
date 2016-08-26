project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Dimensione o conteúdo conforme a janela de visualização {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Tanto em computadores quanto em dispositivos móveis, os usuários estão acostumados a rolar as páginas em sentido vertical, não em sentido horizontal. Ao forçar o usuário a rolar uma página horizontalmente ou diminuir o zoom para ver todo o conteúdo da página, você gera uma experiência insatisfatória.


## TL;DR {: .hide-from-toc }
- Não use elementos grandes de largura fixa.
- O conteúdo não deve depender de uma largura específica da janela de visualização para que seja processado adequadamente.
- Use consultas de mídia de CSS para aplicar diferentes formatações de estilo a telas pequenas e grandes.


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



