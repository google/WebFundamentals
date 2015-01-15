---
layout: section
title: "Principes de base de la conception de sites Web adaptatifs"
description: "La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran."
introduction: "L'utilisation d'appareils mobiles pour naviguer sur le Web connaît un développement phénoménal. Malheureusement, force est de constater que la majeure partie du Web n'est pas optimisée pour les terminaux de ce type. Les appareils mobiles sont souvent limités par la taille d'affichage et une approche différente s'avère nécessaire quant à la disposition du contenu à l'écran."
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
    - Utilisez la balise Meta <code>viewport</code> pour contrôler la largeur et le dimensionnement de la fenêtre d'affichage du navigateur.
    - Insérez le code <code>width=device-width</code> pour établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil.
    - Insérez le code <code>initial-scale=1</code> pour établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l'appareil.
    - Assurez-vous que l'accès à votre page est possible sans désactiver le redimensionnement utilisateur.
  size-content-to-vp:
    - N'utilisez pas d'éléments de largeur fixe de grande taille.
    - Ne liez pas le rendu correct du contenu à une largeur de fenêtre d'affichage spécifique.
    - Utilisez des requêtes média CSS pour appliquer des styles différents aux grands et aux petits écrans.
  media-queries:
    - Vous pouvez utiliser des requêtes média pour appliquer des styles en fonction des caractéristiques de l'appareil.
    - Préférez <code>min-width</code> à <code>min-device-width</code> pour garantir la compatibilité la plus large possible.
    - Attribuez des tailles relatives aux éléments pour éviter de fractionner la disposition.
  choose-breakpoints:
    - Créez des points de rupture en fonction du contenu et jamais sur la base d'appareils, de produits ou de marques spécifiques.
    - Concevez tout d'abord votre contenu pour l'appareil mobile le plus petit, puis améliorez progressivement l'expérience des visiteurs à mesure que la surface d'écran disponible augmente.
    - Limitez la taille des lignes de texte à 70 ou 80 caractères.
remember:
  use-commas:
    - Séparez les attributs à l'aide d'une virgule, afin de permettre une analyse correcte par les navigateurs plus anciens.
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

Téléphones, "phablettes", tablettes, ordinateurs, consoles de jeu, téléviseurs et même accessoires connectés, il existe aujourd'hui une multitude de tailles d'écran différentes. Dans ce domaine, le changement est la norme. Il est donc important que votre site puisse s'adapter à tous les formats, que ce soit aujourd'hui ou demain.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

La conception de sites web adaptatifs (ou RWD, Responsive Web Design, en anglais), est un concept défini à l'origine par [Ethan Marcotte dans 'A List Apart'](http://alistapart.com/article/responsive-web-design/). Ce concept répond aux besoins des utilisateurs et des appareils qu'ils utilisent. La disposition change en fonction de la taille et des fonctionnalités de l'appareil. Sur un téléphone, par exemple, le contenu s'affichera dans une seule colonne, alors qu'il apparaîtra dans deux colonnes sur une tablette.

{% include modules/nextarticle.liquid %}

{% endwrap %}

