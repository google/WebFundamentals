project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Princípios básicos de Web design responsivo {: .page-title }

{% include "_shared/contributors/TODO.html" %}


O uso de dispositivos móveis para navegar pela Web está aumentando em ritmo astronômico. No entanto, grande parte da Web não está otimizada para esses dispositivos. Os dispositivos móveis muitas vezes são limitados pelo tamanho da tela e exigem uma abordagem diferente em relação à forma como o conteúdo será disposto na tela.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }




Existem inúmeros tamanhos de tela em diferentes celulares, `phablets`, tablets, computadores, consoles de videogame, TVs e até mesmo telas incorporadas em acessórios pessoais.  Os tamanhos das telas estão em constante evolução, por isso, é importante que seu site possa se adaptar a qualquer tamanho disponível hoje e no futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Web design responsivo, definido originalmente por [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/), relaciona-se às necessidades dos usuários e aos dispositivos que eles usam.  O layout é alterado de acordo com o tamanho e os recursos do dispositivo.  Por exemplo, em um celular, os usuários veem o conteúdo disposto em uma única coluna. Um tablet possivelmente exibirá o mesmo conteúdo em duas colunas.



