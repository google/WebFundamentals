---
title: "Offrir des solutions pour les anciennes plates-formes"
description: "Certains formats vidéos ne sont pas compatibles avec toutes les plates-formes. Vérifiez quels sont les formats compatibles avec les plates-formes principales, puis assurez-vous que votre vidéo fonctionne dans chacun d'entre eux."
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
  Certains formats vidéos ne sont pas compatibles avec toutes les plates-formes. Vérifiez quels sont les formats compatibles avec les plates-formes principales, puis assurez-vous que votre vidéo fonctionne dans chacun d'entre eux.
</p>

{% include shared/toc.liquid %}


## Vérifier les formats compatibles

Utilisez l'attribut `canPlayType()` pour savoir quels formats vidéos sont compatibles. La méthode nécessite un argument de chaîne composé d'un `type MIME` et de codecs facultatifs. Elle renvoie ensuite l'une des valeurs suivantes :

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valeur renvoyée</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Valeur renvoyée">(chaîne vide)</td>
      <td data-th="Description">Le contenant et/ou le codec n'est pas compatible.</td>
    </tr>
    <tr>
      <td data-th="Valeur renvoyée"><code>maybe</code></td>
      <td data-th="Description">
        Le contenant et le(s) codec(s) sont peut-être compatibles mais le navigateur
        doit télécharger une partie de la vidéo pour vérifier.
      </td>
    </tr>
    <tr>
      <td data-th="Valeur renvoyée"><code>probably</code></td>
      <td data-th="Description">Le format semble être compatible.
      </td>
    </tr>
  </tbody>
</table>

Voici quelques exemples d'arguments `canPlayType()` et de valeurs renvoyées lors de l'exécution dans Chrome :


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Réponse</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Réponse">(chaîne vide)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Réponse">(chaîne vide)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Réponse">(chaîne vide)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Réponse"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Réponse"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Réponse"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Créer une vidéo dans plusieurs formats

Les nombreux outils suivants permettent d'enregistrer la même vidéo dans différents formats :

* Outils pour les ordinateurs de bureau : [FFmpeg](//ffmpeg.org/)
* Applications d'interface graphique utilisateur : [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Services d'encodage/transcodage en ligne : [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

##Vérifier le format utilisé

Vous voulez savoir quel format vidéo a été sélectionné par le navigateur ?

Dans JavaScript, utilisez la propriété `currentSrc` de la vidéo pour renvoyer la source utilisée.

Pour regarder une démonstration, {% link_sample _code/video-main.html %}cliquez ici{% endlink_sample %} : Chrome et Firefox ont sélectionné `chrome.webm` (car c'est le premier format répertorié dans la liste des sources potentielles compatibles avec ces navigateurs). Le navigateur Safari a sélectionné `chrome.mp4`.



