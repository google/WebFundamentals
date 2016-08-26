project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La taille des vidéos est importante lorsqu'il s'agit de satisfaire les internautes.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Définir correctement la taille des vidéos {: .page-title }

{% include "_shared/contributors/TODO.html" %}



La taille des vidéos est importante  lorsqu'il s'agit de satisfaire les internautes.


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



## Vérifier la taille de la vidéo

La taille réelle de la trame vidéo telle qu'elle est encodée peut différer des dimensions de l'élément vidéo, tout comme une image peut ne pas s'afficher à sa taille réelle.

Pour vérifier la taille encodée d'une vidéo, utilisez les propriétés d'élément vidéo `videoWidth` et `videoHeight`. Les propriétés `width` et `height` renvoient les dimensions de l'élément vidéo, dont la taille a pu être définie via CSS ou des attributs de largeur et de hauteur intégrés à la page.

## Éviter les débordements

Lorsque l'élément vidéo est trop grand pour la fenêtre d'affichage, il risque de déborder et d'empêcher l'internaute de voir le contenu ou
d'utiliser les commandes.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Capture d'écran Android Chrome, en mode portrait : l'élément vidéo n'a pas été mis en forme et déborde de la fenêtre d'affichage" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Capture d'écran Android Chrome, en mode paysage : l'élément vidéo n'a pas été mis en forme et déborde de la fenêtre d'affichage" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Vous pouvez contrôler les dimensions de la vidéo dans JavaScript ou CSS. Les bibliothèques et les plug-ins JavaScript, comme [FitVids](//fitvidsjs.com/), par exemple, permettent de conserver la taille et le format d'image appropriés, même pour les vidéos Flash de YouTube et d'autres sources.

Utilisez les [requêtes média CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) pour spécifier la taille d'éléments en fonction des dimensions de la fenêtre d'affichage. Dans ce cas, nous vous conseillons d'utiliser `max-width: 100%`.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Pour le contenu multimédia intégré dans des cadres iFrame, comme les vidéos YouTube, tentez d'avoir une approche de type adaptatif. Consultez celle qui est [proposée par John Surdakowski](//avexdesigns.com/responsive-youtube-embed/).

<!-- TODO: Verify note type! -->
Note: Ne forcez pas la taille d'un élément générant un format d'image différent de celui de la vidéo d'origine. Les vidéos écrasées ou étirées donnent une mauvaise image du site.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Comparez l'<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">exemple adaptatif</a> avec la <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">version non-adaptative</a>.




