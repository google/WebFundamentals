---
title: "Personnaliser le lecteur de vidéos"
description: "L'affichage des vidéos varie d'une plate-forme à l'autre. Les solutions pour mobile doivent donc tenir compte de l'orientation de l'appareil. Utilisez l'API Fullscreen afin de contrôler l'affichage en plein écran du contenu vidéo."
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
  L'affichage des vidéos varie d'une plate-forme à l'autre. Les solutions pour mobile doivent donc tenir compte de l'orientation de l'appareil. Utilisez l'API Fullscreen afin de contrôler l'affichage en plein écran du contenu vidéo.
</p>

{% include shared/toc.liquid %}


L'affichage des vidéos varie d'une plate-forme à l'autre. Les solutions pour mobile doivent donc tenir compte de l'orientation de l'appareil. Utilisez l'API Fullscreen afin de contrôler l'affichage en plein écran du contenu vidéo.

## Fonctionnement de l'orientation selon les appareils

L'orientation de l'appareil ne pose pas de problème en ce qui concerne les ordinateurs de bureau et les portables. En revanche, elle revêt une importance capitale lorsqu'il s'agit de concevoir des pages Web pour les téléphones mobiles et les tablettes.

Safari, sur l'iPhone, passe parfaitement bien du mode portrait au mode paysage :

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Capture d'écran de lecture d'une vidéo dans Safari sur iPhone, en mode portrait" src="images/iPhone-video-playing-portrait.png">
   <img class="mdl-cell mdl-cell--6--col" alt="Capture d'écran de lecture d'une vidéo dans Safari sur iPhone, en mode paysage" src="images/iPhone-video-playing-landscape.png">
</div>

L'orientation de l'appareil peut néanmoins être problématique sur un iPad et sur Chrome pour Android.
Par exemple, en l'absence de personnalisation, une vidéo lue sur un iPad en mode paysage a l'apparence suivante :

<img class="center" alt="Capture d'écran d'une vidéo lue dans Safari sur un iPad Retina, en mode paysage"
src="images/iPad-Retina-landscape-video-playing.png">

L'utilisation des paramètres de largeur "width: 100%" ou "max-width: 100%" avec CSS permet de résoudre de nombreux problèmes de présentation liés à l'orientation de l'appareil. Vous pouvez également recourir aux solutions d'affichage en mode plein écran.

##Affichage intégré ou en mode plein écran

L'affichage des vidéos varie d'une plate-forme à l'autre. Dans Safari pour iPhone, l'affichage de l'élément vidéo est intégré à la page Web, mais la vidéo est lue en mode plein écran :

<img class="center" alt="Capture d'écran d'un élément vidéo sur iPhone, en mode portrait" src="images/iPhone-video-with-poster.png">

Sur Android, l'internaute peut passer en mode plein écran en cliquant sur l'icône Plein écran. Mais par défaut, la lecture est intégrée à la page :

<img class="center" alt="   Capture d'écran de lecture d'une vidéo dans Chrome sur Android, en mode portrait" src="images/Chrome-Android-video-playing-portrait-3x5.png">

La lecture de vidéos dans Safari pour iPad s'effectue sur la page Web :

<img class="center" alt="Capture d'écran d'une vidéo lue dans Safari sur un iPad Retina, en mode paysage" src="images/iPad-Retina-landscape-video-playing.png">

## Contrôler l'affichage en mode plein écran du contenu

Pour les plates-formes qui ne forcent pas la lecture des vidéos en mode plein écran, l'API Fullscreen est [largement compatible] (//caniuse.com/fullscreen). Utilisez cette API pour contrôler l'affichage en mode plein écran du contenu ou de la page.

Pour afficher un élément en plein écran, par exemple une video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Pour afficher la totalité du document en plein écran :
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Vous pouvez également surveiller les modifications d'état du mode plein écran :
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Ou encore, vous pouvez vérifier si l'élément est actuellement en mode plein écran :
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Vous pouvez enfin utiliser la pseudo-classe CSS ":fullscreen" pour modifier l'affichage des éléments en mode plein écran.

Sur les appareils compatibles avec l'API Fullscreen, il peut être judicieux d'utiliser une vignette en tant qu'espace réservé pour le contenu vidéo :

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Ce navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

Pour voir comment cette vidéo s'affiche en plein écran, regardez la {% link_sample _code/fullscreen.html %}démonstration{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



