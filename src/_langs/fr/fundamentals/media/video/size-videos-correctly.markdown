---
layout: article
title: "Définir correctement la taille des vidéos"
description: "La taille des vidéos est importante lorsqu'il s'agit de satisfaire les internautes."
introduction: "La taille des vidéos est importante  lorsqu'il s'agit de satisfaire les internautes."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - N'envoyez pas de vidéos d'une taille de trame ou dune qualité supérieures aux capacités de la plate-forme.
    - Limitez la longueur de vos vidéos au strict nécessaire.
    - Les vidéos longues risquent d'entraîner un ralentissement du téléchargement et de la recherche. Certains navigateurs devront parfois attendre le téléchargement de la vidéo avant de lancer la lecture.
remember:
  media-fragments:
    - L'API Media Fragments est compatible avec la plupart des plates-formes, à l'exception d'iOS.
    - Assurez-vous que les demandes de type `Range` sont compatibles avec votre serveur. Elles sont activées par défaut sur la plupart des serveurs. Cependant, il arrive qu'elles soient désactivées sur certains services d'hébergement.
  dont-overflow:
    - Ne définissez pas en force un dimensionnement d'élément qui génère un format d'image différent de celui de la vidéo d'origine. Les vidéos écrasées ou étirées donnent une mauvaise image du site.
  accessibility-matters:
    - L'élément de suivi est compatible avec Chrome pour Android, Safari pour iOS, ainsi que tous les navigateurs actuels pour ordinateur de bureau, sauf Firefox (voir <a href="http://caniuse.com/track" title="État de compatibilité d'un élément de suivi">caniuse.com/track</a>). Plusieurs polyfills sont également disponibles. Nous vous recommandons d'utiliser l'<a href='//www.delphiki.com/html5/playr/' title='élément de suivi polyfill Playr'>Playr</a> ou le<a href='//captionatorjs.com/' title='suivi Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE est compatible avec Chrome et Opera sur Android, ainsi qu'avec Internet Explorer 11 et Chrome pour les ordinateurs de bureau. La compatibilité est également prévue pour <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>.
  optimize:
    - <a href="../images/">Images</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimiser l'efficacité du contenu</a>
related:
  media:
  -
      title: "Utiliser les requêtes média dans CSS pour un design réactif"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Notions de base sur le Responsive Web Design"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

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

## Vérifier la taille de la vidéo

La taille réelle de la trame vidéo telle qu'elle est encodée peut différer des dimensions de l'élément vidéo, tout comme une image peut ne pas s'afficher à sa taille réelle.

Pour vérifier la taille encodée d'une vidéo, utilisez les propriétés d'élément vidéo `videoWidth` et `videoHeight`. Les propriétés `width` et `height` renvoient les dimensions de l'élément vidéo, dont la taille a pu être définie via CSS ou des attributs de largeur et de hauteur intégrés à la page.

## Éviter les débordements

Lorsque l'élément vidéo est trop grand pour la fenêtre d'affichage, il risque de déborder et d'empêcher l'internaute de voir le contenu ou
d'utiliser les commandes.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Capture d'écran Android Chrome, en mode portrait : l'élément vidéo n'a pas été mis en forme et déborde de la fenêtre d'affichage" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Capture d'écran Android Chrome, en mode paysage : l'élément vidéo n'a pas été mis en forme et déborde de la fenêtre d'affichage" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Vous pouvez contrôler les dimensions de la vidéo dans JavaScript ou CSS. Les bibliothèques et les plug-ins JavaScript, comme [FitVids](//fitvidsjs.com/), par exemple, permettent de conserver la taille et le format d'image appropriés, même pour les vidéos Flash de YouTube et d'autres sources.

Utilisez les [requêtes média CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) pour spécifier la taille d'éléments en fonction des dimensions de la fenêtre d'affichage. Dans ce cas, nous vous conseillons d'utiliser `max-width: 100%`.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Pour le contenu multimédia intégré dans des cadres iFrame, comme les vidéos YouTube, tentez d'avoir une approche de type adaptatif. Consultez celle qui est [proposée par John Surdakowski](//avexdesigns.com/responsive-youtube-embed/).

{% include modules/remember.liquid title="Important" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Comparez l'{% link_sample _code/responsive_embed.html %}exemple adaptatif{% endlink_sample %} avec la {% link_sample _code/unyt.html %}version non-adaptative{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

