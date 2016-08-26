project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Découvrez les méthodes les plus simples pour ajouter des vidéos à votre site et pour garantir aux internautes la meilleure expérience possible sur tous les appareils.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Ajouter une vidéo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Découvrez les méthodes les plus simples pour ajouter des vidéos à votre site et pour garantir aux internautes la meilleure expérience possible sur tous les appareils.



## TL;DR {: .hide-from-toc }
- 'Utilisez l''élément vidéo pour importer, décoder et lire des contenus vidéos sur votre site.'
- Produisez des vidéos de plusieurs formats pour couvrir une gamme de plates-formes mobiles.
- Définissez correctement la taille des vidéos. Veillez à ce qu'elles ne débordent pas de leurs contenants.
- L'accessibilité est importante. Ajoutez l'élément de suivi en tant qu'élément enfant de l'élément vidéo.


## Ajouter l'élément vidéo

    - Ajoutez l'élément vidéo pour importer, décoder et lire des contenus vidéos sur votre site :

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Ce navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>


    <video src="chrome.webm" type="video/webm">
         <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
    </video>
    

## Spécifier plusieurs formats de fichiers

Tous les navigateurs ne sont pas compatibles avec le même format vidéo.
L'élément <source> vous permet d'indiquer plusieurs formats, dans le cas où le navigateur de l'utilisateur n'est pas compatible avec l'un d'entre eux.
Par exemple :

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

Lorsque le navigateur analyse les balises <source>, l'attribut facultatif `type` lui permet de sélectionner le fichier à télécharger et à lire. Si le navigateur est compatible avec WebM, le format de fichier chrome.webm est lu. Dans le cas contraire, une vérification est lancée, pour savoir si la lecture de vidéos au format MPEG-4 est possible.
Consultez la page <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks (Une première approche des médias numériques pour les geeks)</a> pour découvrir le fonctionnement des contenus vidéo et audio sur le Web.

Cette approche comporte plusieurs avantages par rapport aux différentes méthodes d'établissement de scripts via HTML ou côté serveur, en particulier sur les plates-formes mobiles :

* Le développeur peut répertorier les formats par ordre de préférence.
* La commutation via le côté client natif réduit le temps de réponse. Une seule requête est envoyée pour obtenir du contenu.
* Il est plus simple, plus rapide et potentiellement plus fiable de laisser le navigateur déterminer un format que d'utiliser une base de données de support côté serveur avec détection d'agent utilisateur.
* La performance du réseau est améliorée lorsque le type de source de chaque fichier est indiquée. Le navigateur sélectionne ainsi une source vidéo sans avoir à télécharger cette dernière pour détecter le format.

Chacun de ces points est particulièrement important pour les plates-formes mobiles. En effet, la bande passante et le temps de réponse sont cruciaux, car la patience de l'utilisateur risque d'être limitée. 
La performance peut également être affectée si un attribut type n'est pas inclus, lorsque plusieurs sources comportent des types qui ne sont pas compatibles.

À l'aide des outils de développeur de votre navigateur mobile, comparez l'activité du réseau <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">avec attributs type</a> et <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">sans attributs type</a>.
Vérifiez également les en-têtes de réponse dans les outils pour les développeurs de votre navigateur pour [vous assurer que le serveur transmet le bon type MIME](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types), sinon les vérifications de type de source vidéo ne fonctionneront pas.

##Définir un intervalle de lecture

Pour économiser la bande passante et pour que votre site soit plus adaptatif, utilisez l'API Media Fragments afin d'ajouter un intervalle de lecture à l'élément vidéo.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Ce navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

Pour ajouter un fragment média, il vous suffit d'ajouter #t=[start_time][,end_time] à l'URL du fichier multimédia. Par exemple, pour générer une lecture de la vidéo dans l'intervalle compris entre la seconde 5 et la seconde 10, saisissez le code suivant :


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Vous pouvez également utiliser l'API Media Fragments pour fournir plusieurs vues de la même vidéo, comme des marqueurs temporels sur un DVD, sans avoir besoin d'encoder ni de traiter plusieurs fichiers.

<!-- TODO: Verify note type! -->
Note: - 'L''API Media Fragments est compatible avec la plupart des plates-formes, à l''exception d''iOS.'
- 'Assurez-vous que les demandes de type ''Range'' sont compatibles avec votre serveur. Elles sont activées par défaut sur la plupart des serveurs. Cependant, il arrive qu''elles soient désactivées sur certains services d''hébergement.'


À l'aide des outils pour les développeurs de votre navigateur, vérifiez la présence de la `chaîne Accept-Ranges: bytes` dans les en-têtes de réponse :

<img class="center" alt="Capture d'écran des outils pour les développeurs De Chrome : Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

##Inclure une affiche

Ajoutez un attribut affiche à l'élément vidéo de sorte que l'internaute puisse se faire une idée du contenu dès le chargement de l'élément, sans devoir télécharger la vidéo ni démarrer la lecture.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Une affiche constitue également une solution de repli, si l'attribut `src` de la vidéo est rompu ou si aucun des formats vidéo disponibles n'est compatible. Le seul inconvénient des affiches est qu'elles nécessitent une requête de fichier supplémentaire, ce qui consomme de la bande passante et entraîne un traitement de rendu. Pour en savoir plus, consultez la page [Optimisation des images] (../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Voici la comparaison de deux vidéos, avec et sans affiche. L'affiche est représentée en échelle de gris, pour montrer qu'il ne s'agit pas de la vidéo :

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Capture d'écran Android Chrome, format portrait : sans affiche" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Capture d'écran Android Chrome, format portrait : avec affiche" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



