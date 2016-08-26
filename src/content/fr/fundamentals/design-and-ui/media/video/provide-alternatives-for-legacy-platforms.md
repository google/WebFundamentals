project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Certains formats vidéos ne sont pas compatibles avec toutes les plates-formes. Vérifiez quels sont les formats compatibles avec les plates-formes principales, puis assurez-vous que votre vidéo fonctionne dans chacun d'entre eux.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Offrir des solutions pour les anciennes plates-formes {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Certains formats vidéos ne sont pas compatibles avec toutes les plates-formes. Vérifiez quels sont les formats compatibles avec les plates-formes principales, puis assurez-vous que votre vidéo fonctionne dans chacun d'entre eux.



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

Pour regarder une démonstration, <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">cliquez ici</a> : Chrome et Firefox ont sélectionné `chrome.webm` (car c'est le premier format répertorié dans la liste des sources potentielles compatibles avec ces navigateurs). Le navigateur Safari a sélectionné `chrome.mp4`.



