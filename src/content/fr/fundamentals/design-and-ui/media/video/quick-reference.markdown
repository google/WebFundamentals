---
title: "Guide de référence rapide"
description: "Brève présentation des propriétés de l'élément vidéo"
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
  Brève présentation des propriétés de l'élément vidéo
</p>

{% include shared/toc.liquid %}


## Attributs d'élément vidéo

Pour obtenir la liste complète des attributs d'élément vidéo et de leurs définitions, consultez la page relative à la [norme de l'élément vidéo](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Attribut</th>
      <th>Disponibilité</th>
      <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribut"><code>src</code></td>
      <td data-th="Disponibilité">Tous les navigateurs</td>
      <td data-th="Description">Adresse (URL) de la vidéo.</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>poster</code></td>
      <td data-th="Disponibilité">Tous les navigateurs</td>
      <td data-th="Description">Adresse (URL) d'un fichier d'images que le navigateur peut présenter dès l'affichage de l'élément vidéo, sans télécharger de contenu vidéo.</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>preload</code></td>
      <td data-th="Disponibilité">Tous les navigateurs mobiles ignorent le préchargement.</td>
      <td data-th="Description">Indique au navigateur que le préchargement de métadonnées (ou de contenu vidéo) avant la lecture est utile. Les options disponibles sont "Aucun", "Métadonnées" ou "Automatique" (pour en savoir plus, consultez la section relative au préchargement). </td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>autoplay</code></td>
      <td data-th="Disponibilité">Non compatible avec iPhone ou Android. Compatible avec tous les navigateurs pour ordinateurs, iPad, Firefox et Opera pour Android.</td>
      <td data-th="Description">Démarre le téléchargement et la lecture dès que possible (consultez la section relative à la lecture automatique). </td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>loop</code></td>
      <td data-th="Disponibilité">Tous les navigateurs</td>
      <td data-th="Description">Lit la vidéo en boucle.</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>controls</code></td>
      <td data-th="Disponibilité">Tous les navigateurs</td>
      <td data-th="Description">Affiche les commandes vidéo par défaut (lecture, pause, etc.).</td>
    </tr>
  </tbody>
</table>

### Lecture automatique

Sur un ordinateur de bureau, l'attribut `autoplay` indique au navigateur de démarrer immédiatement le téléchargement et la lecture de la vidéo, dès que cela est possible. Sur iOS et Chrome pour Android, l'attribut `autoplay` ne fonctionne pas. L'internaute doit appuyer sur l'écran pour lire la vidéo.

Même sur les plates-formes sur lesquelles il est possible d'intégrer l'attribut `autoplay`, vous devez tenir compte des facteurs suivants avant de l'activer :

* La consommation de données peut s'avérer coûteuse.
* Lorsque le téléchargement et la lecture du contenu multimédia démarrent sans demander l'autorisation de l'internaute, la bande passante et le CPU risquent d'être monopolisés de façon inattendue et d'entraîner un retard dans l'affichage de la page.
* L'internaute peut se trouver dans un environnement dans lequel la lecture d'un contenu vidéo ou audio peut le déranger.

Le comportement de la lecture automatique peut être configuré dans la section AndroidWebView de l'[API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Par défaut, ce comportement est défini sur la valeur `true`, mais il peut être désactivé par une application WebView.

### Préchargement

L'attribut `preload` indique au navigateur la quantité d'informations ou de contenu à précharger.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valeur</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Valeur"><code>none</code></td>
      <td data-th="Description">L'internaute peut ne pas regarder la vidéo du tout. Aucun préchargement n'est lancé</td>.
    </tr>
    <tr>
      <td data-th="Valeur"><code>metadata</code></td>
      <td data-th="Description">Les métadonnées (durée, dimensions, pistes de texte) doivent être préchargées, mais avec un contenu vidéo minimal.</td>
    </tr>
    <tr>
      <td data-th="Valeur"><code>auto</code></td>
      <td data-th="Description">Le téléchargement immédiat de l'intégralité de la vidéo est le comportement souhaité.</td>
    </tr>
  </tbody>
</table>

L'attribut "preload" entraîne des effets différents selon les plates-formes.
Par exemple, le navigateur Chrome met en mémoire tampon 25 secondes de contenu vidéo sur un ordinateur de bureau, et rien sur iOS ou Android. Cela peut entraîner des retards au démarrage de la lecture sur les appareils mobiles, qui n'existent pas sur les ordinateurs de bureau. Consultez la [page de test de Steve Souder] (//stevesouders.com/tests/mediaevents.php) pour obtenir davantage d'informations.

## JavaScript

L'article relatif à la [vidéo du site HTML5 Rocks](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) résume parfaitement les propriétés, les méthodes et les événements JavaScript qui peuvent être utilisés pour contrôler la lecture de contenu vidéo. Nous avons intégré le contenu de cet article dans cette section et avons mis à jour les contenus spécifiques aux appareils mobiles, le cas échéant.

### Propriétés

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Propriété</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Propriété"><code>currentTime</code></td>
      <td data-th="Description">Fournit ou définit la position de lecture en secondes.</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>volume</code></td>
      <td data-th="Description">Fournit ou définit le niveau de volume actuel de lecture de la vidéo.</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>muted</code></td>
      <td data-th="Description">Fournit ou définit la désactivation du son.</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>playbackRate</code></td>
      <td data-th="Description">Fournit ou définit la vitesse de lecture. La valeur 1 correspond à une lecture à vitesse normale.</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>buffered</code></td>
      <td data-th="Description">Informations sur la quantité du contenu vidéo mis en mémoire tampon et prêt pour la lecture (regardez la <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">démonstration</a>).</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>currentSrc</code></td>
      <td data-th="Description">L'adresse de la vidéo en cours de lecture.</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>videoWidth</code></td>
      <td data-th="Description">Largeur de la vidéo en pixels (qui peut être différente de la largeur de l'élément vidéo).</td>
    </tr>
    <tr>
      <td data-th="Propriété"><code>videoHeight</code></td>
      <td data-th="Description">Hauteur de la vidéo en pixels (qui peut être différente de la hauteur de l'élément vidéo).</td>
    </tr>
  </tbody>
</table>

Les propriétés "playbackRate" ({% link_sample _code/scripted.html %}voir la démonstration{% endlink_sample %}) et `volume` ne sont pas compatibles avec les plates-formes mobiles.

### Méthodes

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Méthode</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Méthode"><code>load()</code></td>
      <td data-th="Description">Charge ou recharge une source vidéo sans lancer la lecture : par exemple, lorsque que l'attribut `src` est modifié à l'aide de JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Méthode"><code>play()</code></td>
      <td data-th="Description">Lit la vidéo à partir de son emplacement actuel.</td>
    </tr>
    <tr>
      <td data-th="Méthode"><code>pause()</code></td>
      <td data-th="Description">Met en pause la vidéo à son emplacement actuel.</td>
    </tr>
    <tr>
      <td data-th="Méthode"><code>canPlayType('format')</code></td>
      <td data-th="Description">Détecte les formats compatibles (consultez l'article 'Vérifier les formats compatibles').</td>
    </tr>
  </tbody>
</table>

Sur les plates-formes mobiles (sauf Opera sur Android), les méthodes `play()` et `pause()` ne fonctionnent pas sauf si
elles sont appelées en réponse à une action de l'internaute, un clic, par exemple : regardez la {% link_sample _code/scripted.html %}démonstration{% endlink_sample %}. De même, la lecture ne peut pas être lancée pour le contenu tel que les vidéos YouTube intégrées.

### Événements

Les événements répertoriés ci-dessous ne représentent qu'une partie des événements multimédia qui peuvent être mis en œuvre. Consultez la page [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) du site Mozilla Developer Network pour obtenir une liste complète.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Événement</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Événement"><code>canplaythrough</code></td>
      <td data-th="Description">Est envoyé lorsque suffisamment de données sont disponibles pour que le navigateur détecte que la vidéo peut être lue en entier, sans interruption.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>ended</code></td>
      <td data-th="Description">Est envoyé lorsque la lecture de la vidéo est terminée.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>error</code></td>
      <td data-th="Description">Est envoyé lorsqu'une erreur se produit.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>playing</code></td>
      <td data-th="Description">Est envoyé lorsque la lecture de la vidéo démarre pour la première fois, après avoir été mise en pause ou lors d'un redémarrage.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>progress</code></td>
      <td data-th="Description">Est envoyé périodiquement pour indiquer la progression du téléchargement.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>waiting</code></td>
      <td data-th="Description">Est envoyé lorsqu'une action est retardée dans l'attente de la fin d'une autre action.</td>
    </tr>
    <tr>
      <td data-th="Événement"><code>loadedmetadata</code></td>
      <td data-th="Description">Est envoyé lorsque le navigateur a terminé de charger les métadonnées de la vidéo : durée, dimensions et pistes de texte.</td>
    </tr>
  </tbody>
</table>



