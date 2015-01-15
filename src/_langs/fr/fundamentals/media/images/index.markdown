---
layout: section
title: "Images"
description: "Les images font justement partie intégrante de chaque page. Cependant, elles constituent également la majorité des octets téléchargés. La conception de sites Web adaptatifs permet non seulement d'adapter les dispositions aux caractéristiques de l'appareil, mais aussi les images."
introduction: "Comme dit l'adage : 'Une image vaut mieux qu'un long discours'. Et les images font justement partie intégrante de chaque page. Cependant, elles constituent également la majorité des octets téléchargés. La conception de sites Web adaptatifs permet non seulement d'adapter les dispositions aux caractéristiques de l'appareil, mais aussi les images."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
id: images
key-takeaways:
  use-right-image:
    - Utilisez l'image la mieux adaptée aux caractéristiques de l'écran en tenant compte de la taille de l'écran, de la résolution de l'appareil et de la mise en page.
    - Dans le cas des écrans à haute densité de pixels, modifiez la propriété <code>background-image</code> dans la feuille de style à l'aide de requêtes média avec <code>min-resolution</code> et <code>-webkit-min-device-pixel-ratio</code>.
    - Utilisez l'attribut 'srcset' pour fournir des images en haute résolution en plus de l'image 1x dans le balisage.
    - Tenez compte des critères de performances lors de l'utilisation de techniques de remplacement d'images JavaScript ou lors de la diffusion d'images haute résolution utilisant un taux de compression élevé sur des appareils de plus faible résolution.
  avoid-images:
    Évitez d'utiliser des images lorsque cela s'avère possible. Il est conseillé d'exploiter les fonctionnalités offertes par le navigateur, d'utiliser des caractères Unicode au lieu d'images et de remplacer les icônes complexes par des polices d'icônes.
  optimize-images:
    - Ne choisissez pas un format d'image au hasard, mais tâchez d'utiliser le format le mieux adapté en parfaite connaissance de cause.
    - Intégrez des outils de compression et d'optimisation d'images dans votre flux de travail afin de réduire la taille des fichiers.
    - Placez les images fréquemment utilisées dans des sprites d'image en vue de réduire le nombre de requêtes HTTP.
    - Il est judicieux de ne charger les images qu'après leur défilement afin d'accélérer le chargement initial de la page et de réduire son poids initial.
remember:
  compressive:
    - Soyez prudent lorsque vous utilisez la technique de compression, en raison des exigences supplémentaires sur le plan de la mémoire et du décodage. Le redimensionnement d'images sur des écrans de petite taille est une opération exigeante qui peut se révéler particulièrement laborieuse sur des appareils d'entrée de gamme disposant d'une mémoire et d'une puissance de traitement limitées.
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### Images adaptatives

Grâce à la conception de sites Web adaptatifs, il est possible d'adapter non seulement les dispositions aux caractéristiques de l'appareil, mais aussi les images. Par exemple, sur des écrans haute résolution (2x), des graphiques haute résolution sont nécessaires pour garantir la netteté des détails. Une image d'une largeur de 50 % donnera de bons résultats avec un navigateur de 800 pixels de large, mais occupera trop d'espace sur un téléphone à écran étroit. Cependant, elle utilisera toujours autant de bande passante lorsqu'elle sera adaptée à un écran plus petit.

### Art direction

<img class="center" src="img/art-direction.png" alt="Exemple d'art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Dans d'autres cas, il se peut que l'image doive subir des modifications plus importantes : changement des proportions, recadrage, voire remplacement de toute l'image. On parle alors d''art direction'. Pour consulter d'autres exemples, rendez-vous sur [responsiveimages.org/demos/](http://responsiveimages.org/demos/).

{% include modules/nextarticle.liquid %}

{% endwrap %}

