project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Principes de base de la conception de sites Web adaptatifs {: .page-title }

{% include "_shared/contributors/TODO.html" %}


L'utilisation d'appareils mobiles pour naviguer sur le Web connaît un développement phénoménal. Malheureusement, force est de constater que la majeure partie du Web n'est pas optimisée pour les terminaux de ce type. Les appareils mobiles sont souvent limités par la taille d'affichage et une approche différente s'avère nécessaire quant à la disposition du contenu à l'écran.


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




Téléphones, "phablettes", tablettes, ordinateurs, consoles de jeu, téléviseurs et même accessoires connectés, il existe aujourd'hui une multitude de tailles d'écran différentes. Dans ce domaine, le changement est la norme. Il est donc important que votre site puisse s'adapter à tous les formats, que ce soit aujourd'hui ou demain.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

La conception de sites web adaptatifs (ou RWD, Responsive Web Design, en anglais), est un concept défini à l'origine par [Ethan Marcotte dans 'A List Apart'](http://alistapart.com/article/responsive-web-design/). Ce concept répond aux besoins des utilisateurs et des appareils qu'ils utilisent. La disposition change en fonction de la taille et des fonctionnalités de l'appareil. Sur un téléphone, par exemple, le contenu s'affichera dans une seule colonne, alors qu'il apparaîtra dans deux colonnes sur une tablette.



