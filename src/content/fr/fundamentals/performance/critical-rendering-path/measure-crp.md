project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Vous ne pouvez pas optimiser ce que vous ne pouvez pas mesurer. Heureusement, l'API Navigation Timing offre tous les outils nécessaires pour mesurer chaque étape du chemin critique du rendu.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Mesurer le chemin critique du rendu avec Navigation Timing {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Vous ne pouvez pas optimiser ce que vous ne pouvez pas mesurer. Heureusement, l'API Navigation Timing offre tous les outils nécessaires pour mesurer chaque étape du chemin critique du rendu.


### TL;DR {: .hide-from-toc }
- Navigation Timing fournit des horodatages haute résolution pour la mesure du chemin critique du rendu.
- Le navigateur émet une série d'événements consommables qui capturent les différentes étapes du chemin critique du rendu.


Des mesures et des instruments de qualité sont la base de toute stratégie de performances efficace. Et c'est exactement ce que l'API Navigation Timing propose.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Chaque libellé du schéma ci-dessus correspond à un horodatage haute résolution que le navigateur suit pour chaque page chargée. En fait, dans ce cas précis nous ne montrons qu'une fraction de l'ensemble des horodatages. Pour le moment, nous ignorerons tous les horodatages associés au réseau, mais nous y reviendrons à l'occasion d'une autre leçon.

Mais alors, que signifient ces horodatages ?

* **domLoading** : c'est l'horodatage de démarrage de la totalité du processus. Le navigateur est sur le point de commencer à analyser les premiers octets reçus pour le document
 HTML.
* **domInteractive** : indique le moment où le navigateur a terminé d'analyser l'ensemble du code HTML et où la construction du DOM est terminée.
* **domContentLoaded** : indique le moment où le modèle DOM est prêt et où aucune feuille de style n'empêche l'exécution de JavaScript. Cela signifie qu'il est désormais possible (potentiellement) de construire l'arborescence d'affichage.
    * De nombreux logiciels JavaScript attendent cet événement avant de commencer à exécuter leur propre logique. Pour cette raison, le navigateur capture les horodatages _EventStart_ et _EventEnd_ pour nous permettre de savoir combien de temps a duré l'exécution.
* **domComplete** : comme son nom l'implique, la totalité du traitement est terminée et le téléchargement de toutes les ressources sur la page (images, etc.) est terminé. C'est-à-dire que le bouton fléché en cours de chargement a cessé de tourner.
* **loadEvent** : c'est la dernière étape du chargement de chaque page. Le navigateur lance un événement `onload` qui peut déclencher une logique d'application supplémentaire.

La spécification du modèle HTML dicte les conditions spécifiques pour chaque événement : quand il doit être déclenché, quelles conditions doivent êtes respectées, etc. En ce qui nous concerne, nous nous concentrerons sur quelques points clés en lien avec le chemin critique du rendu :

* **domInteractive** indique le moment où le modèle DOM est prêt.
* **domContentLoaded** indique généralement quand [les modèles DOM et CSSOM sont prêts tous les deux](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/){: .external }.
    * Si aucun analyseur ne bloque le JavaScript, alors _DOMContentLoaded_ est déclenché immédiatement après _domInteractive_.
* **domComplete** indique quand la page et toutes ses sous-ressources sont prêtes.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full"   adjust_indentation="auto" %}
</pre>

L'exemple ci-dessus peut semble un peu intimidant de prime abord, mais il est en réalité assez simple. L'API Navigation Timing capture tous les horodatages concernés, et notre code attend simplement le déclenchement de l'événement `onload`. N'oubliez pas que l'événement `onload` est déclenché après domInteractive, domContentLoaded et domComplete. L'API calcule alors la différence entre les différents horodatages.
<img src="images/device-navtiming-small.png" class="center" alt="Démo NavTiming">

Cela étant dit, nous disposons maintenant d'étapes spécifiques pour effectuer le suivi et d'une fonction simple pour produire ces mesures. Notez qu'au lieu d'imprimer ces statistiques sur la page, vous pouvez également modifier le code pour les envoyer à un serveur d'analyse ([Google Analytics le fait automatiquement](https://support.google.com/analytics/answer/1205784){: .external }). C'est un excellent moyen de garder un œil sur les performances de vos pages et d'identifier les pages candidates qui pourraient bénéficier d'un travail d'optimisation.



