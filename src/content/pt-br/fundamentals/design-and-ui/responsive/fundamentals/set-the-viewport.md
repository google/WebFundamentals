project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Definir a janela de visualização {: .page-title }

{% include "_shared/contributors/TODO.html" %}


É preciso que as páginas otimizadas para diversos dispositivos incluam um elemento meta de janela de visualização no título do documento.  Uma metatag de janela de visualização fornece ao navegador as instruções de como controlar as dimensões e o redimensionamento da página.




## TL;DR {: .hide-from-toc }
- Use uma metatag de janela de visualização para controlar a largura e o dimensionamento da janela de visualização dos navegadores.
- 'Inclua <code>width=device-width</code> para corresponder à largura da tela em número de pixels, independentemente do dispositivo.'
- 'Inclua <code>initial-scale=1</code> para estabelecer uma relação de 1:1 entre os pixels do CSS e os pixels independentes do dispositivo.'
- Mantenha ativo o redimensionamento de usuários para garantir que a página seja acessível.


Para tentar fornecer a melhor experiência possível, os navegadores de dispositivos móveis processarão a página na largura da tela de um computador (geralmente cerca de 980 px, embora esse número varie conforme o dispositivo) e, em seguida, aumentarão o tamanho das fontes e redimensionarão o conteúdo para adequá-lo à tela e tentar fazer com que ele seja exibido de forma mais eficaz.  Para os usuários, o tamanho das fontes pode parecer inconsistente, e talvez eles tenham que tocar duas vezes ou aumentar o zoom na página a fim de visualizar corretamente e interagir com o conteúdo.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Ao usar o valor meta de janela de visualização `width=device-width`, você faz com que a página corresponda à largura da tela em um número de pixels independentes do dispositivo. Assim, a página poderá reorganizar o conteúdo para adequar-se a diferentes tamanhos de tela, sejam processados em um pequeno celular ou em um grande monitor de computador.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sem uma janela de segmentação definida">
      Ver o exemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página com uma janela de segmentação definida">
      Ver o exemplo
    {% endlink_sample %}
  </div>
</div>

Alguns navegadores mantêm a largura da página constante, aumentando o zoom em vez de mudar a organização do conteúdo para preencher a tela no modo paisagem. O atributo `initial-scale=1` orienta os navegadores a estabelecer uma relação de 1:1 entre os pixels do código CSS e os pixels independentes do dispositivo, seja qual for a orientação da tela. Isso permite que a página aproveite a largura total do modo paisagem.

<!-- TODO: Verify note type! -->
Note: Use uma vírgula para separar atributos e garantir que os navegadores mais antigos possam analisá-los corretamente.

## Estabeleça uma janela de visualização acessível

Além de definir um atributo `initial-scale`, você também pode definir os seguintes atributos na janela de visualização:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Quando definidos, esses atributos podem impedir o usuário de aumentar o zoom na janela de visualização, causando possíveis problemas de acessibilidade.



