---
title: "L'accessibilité est importante"
description: "L'accessibilité n'est pas une fonctionnalité."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Utilisez l'élément vidéo pour importer, décoder et lire des contenus vidéos sur votre site."
    - "Produisez des vidéos de plusieurs formats pour couvrir une gamme de plates-formes mobiles."
    - "Définissez correctement la taille des vidéos. Veillez à ce qu'elles ne débordent pas de leurs contenants."
    - "L'accessibilité est importante. Ajoutez l'élément de suivi en tant qu'élément enfant de l'élément vidéo."
notes:
  media-fragments :
    - "L'API Media Fragments est compatible avec la plupart des plates-formes, à l'exception d'iOS."
    - "Assurez-vous que les demandes de type 'Range' sont compatibles avec votre serveur. Elles sont activées par défaut sur la plupart des serveurs. Cependant, il arrive qu'elles soient désactivées sur certains services d'hébergement."
  dont-overflow:
    - "Ne forcez pas la taille d'un élément générant un format d'image différent de celui de la vidéo d'origine. Les vidéos écrasées ou étirées donnent une mauvaise image du site."
  accessibility-matters:
    - "L'élément de suivi est compatible avec Chrome pour Android, Safari pour iOS, ainsi que tous les navigateurs actuels pour ordinateur de bureau, sauf Firefox (voir <a href='http://caniuse.com/track' title='État de compatibilité d'un élément de suivi'>caniuse.com/track</a>). Plusieurs polyfills sont également disponibles. Nous vous recommandons d'utiliser l'<a href='//www.delphiki.com/html5/playr/' title='élément de suivi polyfill Playr'>Playr</a> ou le<a href='//captionatorjs.com/' title='suivi Captionator'>Captionator</a>."
  construct-video-streams:
    - "MSE est compatible avec Chrome et Opera sur Android, ainsi qu'avec Internet Explorer 11 et Chrome pour les ordinateurs de bureau. La compatibilité est également prévue pour <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Images</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Optimiser l'efficacité du contenu</a>"
---

<p class="intro">
  L'accessibilité n'est pas une fonctionnalité. Les utilisateurs malentendants ou malvoyants ne peuvent pas du tout bénéficier d'une vidéo si celle-ci ne contient pas de sous-titres ni de descriptions. Le temps que vous allez passer à ajouter ces éléments à la vidéo vous coûtera bien moins que de faire subir une expérience désagréable aux internautes. Faites en sorte de fournir au minimum une expérience de base accessible à tous.
</p>

{% include shared/toc.liquid %}



## Ajouter des sous-titres pour améliorer l'accessibilité

Pour améliorer l'accessibilité des médias sur mobile, ajoutez des sous-titres ou des descriptions à l'aide de l'élément de suivi.

{% include shared/remember.liquid title="Important" list=page.notes.accessibility-matters %}

Lorsque vous utilisez l'élément de suivi, les sous-titres ont l'apparence suivante :

 <img class="center" alt="Capture d'écran montrant les sous-titres affichés à l'aide de l'élément de suivi dans Chrome sur Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

##Ajouter un élément de suivi

Il est très facile d'ajouter des sous-titres à une vidéo. Il vous suffit d'ajouter un élément de suivi en tant qu'élément enfant de l'élément vidéo :

{% include_code src=_code/track.html snippet=track lang=html %}

L'attribut d'élément de suivi `src` indique l'emplacement du fichier de suivi.

##Définir des sous-titres dans un fichier de suivi

Un fichier de suivi est composé de `signaux` chronométrés au format WebVTT :

    WEBVTT

    00:00.000 --> 00:04.000
     Un homme est assis sur une branche, utilisant un ordinateur portable.

    00:05.000 --> 00:08.000
     La branche casse et il commence à tomber.

    ...



