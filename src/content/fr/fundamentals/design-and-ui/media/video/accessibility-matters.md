project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: L'accessibilité n'est pas une fonctionnalité.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# L'accessibilité est importante {: .page-title }

{% include "_shared/contributors/TODO.html" %}



L'accessibilité n'est pas une fonctionnalité. Les utilisateurs malentendants ou malvoyants ne peuvent pas du tout bénéficier d'une vidéo si celle-ci ne contient pas de sous-titres ni de descriptions. Le temps que vous allez passer à ajouter ces éléments à la vidéo vous coûtera bien moins que de faire subir une expérience désagréable aux internautes. Faites en sorte de fournir au minimum une expérience de base accessible à tous.




## Ajouter des sous-titres pour améliorer l'accessibilité

Pour améliorer l'accessibilité des médias sur mobile, ajoutez des sous-titres ou des descriptions à l'aide de l'élément de suivi.

<!-- TODO: Verify note type! -->
Note: L'élément de suivi est compatible avec Chrome pour Android, Safari pour iOS, ainsi que tous les navigateurs actuels pour ordinateur de bureau, sauf Firefox (voir <a href='http://caniuse.com/track' title='État de compatibilité d'un élément de suivi'>caniuse.com/track</a>). Plusieurs polyfills sont également disponibles. Nous vous recommandons d'utiliser l'<a href='//www.delphiki.com/html5/playr/' title='élément de suivi polyfill Playr'>Playr</a> ou le<a href='//captionatorjs.com/' title='suivi Captionator'>Captionator</a>.

Lorsque vous utilisez l'élément de suivi, les sous-titres ont l'apparence suivante :

 <img class="center" alt="Capture d'écran montrant les sous-titres affichés à l'aide de l'élément de suivi dans Chrome sur Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

##Ajouter un élément de suivi

Il est très facile d'ajouter des sous-titres à une vidéo. Il vous suffit d'ajouter un élément de suivi en tant qu'élément enfant de l'élément vidéo :

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

L'attribut d'élément de suivi `src` indique l'emplacement du fichier de suivi.

##Définir des sous-titres dans un fichier de suivi

Un fichier de suivi est composé de `signaux` chronométrés au format WebVTT :

    WEBVTT

    00:00.000 --> 00:04.000
     Un homme est assis sur une branche, utilisant un ordinateur portable.

    00:05.000 --> 00:08.000
     La branche casse et il commence à tomber.

    ...



