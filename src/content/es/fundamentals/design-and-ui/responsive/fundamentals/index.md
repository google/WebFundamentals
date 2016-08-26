project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte de la Web no está optimizada para varios dispositivos. Adquiere los conocimientos básicos para que tu sitio funcione en móviles, en ordenadores o en cualquier dispositivo con pantalla.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Conceptos básicos de diseño web adaptable {: .page-title }

{% include "_shared/contributors/TODO.html" %}


El uso de los dispositivos móviles para navegar por la Web está creciendo de forma astronómica y, sin embargo, la mayoría de la Web no está optimizada para estos dispositivos. Los dispositivos móviles suelen tener un tamaño de pantalla limitado y debería cambiar la forma de presentar el contenido en estas pantallas.


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




Existe una multitud de tamaños de pantalla diferentes en teléfonos,  en híbridos de teléfono y tablet, en tablets, en ordenadores, en consolas de videojuegos, en televisores e incluso en tecnología ponible.  Los tamaños de pantalla están cambiando siempre, por eso es importante que tu sitio pueda adaptarse a cualquier tamaño hoy y en el futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

El diseño web adaptable, definido por primera vez por [Ethan Marcotte en A List Apart](http://alistapart.com/article/responsive-web-design/), responde a las necesidades de los usuarios y de sus dispositivos.  El diseño cambia en función del tamaño y de la capacidad del dispositivo.  Por ejemplo, en un teléfono, los usuarios verían el contenido en una sola columna. En cambio, en un tablet el mismo contenido podría aparecer en dos columnas.



