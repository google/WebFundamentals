---
title: "Analyser la performance du chemin critique du rendu"
description: "Identifier et résoudre les problèmes de chemin critique du rendu nécessite une bonne connaissance des pièges habituels. Nous allons étudier la question sous un angle pratique pour en tirer les modèles de performance courants qui vous permettront d'optimiser vos pages."
updated_on: 2014-04-28
---
<p class="intro">
  Identifier et résoudre les problèmes de chemin critique du rendu nécessite une bonne connaissance des pièges habituels. Nous allons étudier la question sous un angle pratique pour en tirer les modèles de performance courants qui vous permettront d'optimiser vos pages.
</p>


{% include shared/toc.liquid %}

L'objectif de l'optimisation du chemin critique du rendu est de permettre au navigateur d'afficher la page aussi vite que possible. Des pages plus rapides se traduisent par une hausse de l'engagement et du nombre de pages vues, et par une [amélioration des conversions](http://www.google.com/think/multiscreen/success.html). Par conséquent, pour minimiser le temps passé par l'internaute à scruter un écran vide, nous allons optimiser le choix et l'ordre dans lequel charger les ressources.

Afin d'illustrer ce processus, nous allons commencer par le cas le plus simple possible, puis construire progressivement une page pour y inclure des ressources, des styles et une logique applicative supplémentaires. En même temps, nous verrons les cas qui peuvent poser problème et comment optimiser chacun d'entre eux.

Enfin, un dernier point avant de commencer... Jusqu'ici, nous nous sommes exclusivement intéressés à ce qui se produit dans le navigateur une fois que la ressource (fichier CSS, JavaScript ou HTML) est disponible et peut être traitée. Nous avons ignoré le laps de temps nécessaire pour récupérer celle-ci dans le cache ou sur le réseau. Nous allons étudier très en détail les méthodes d'optimisation des aspects liés au réseau de notre application dans la prochaine leçon. Mais en attendant, pour plus de réalisme, nous allons utiliser les valeurs suivantes :

* Une boucle réseau (latence de propagation) vers le serveur dure 100 ms.
* Le temps de réponse du serveur est de 100 ms pour un document HTML et de 10 ms pour tous les autres fichiers.

## L'expérience Hello World

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Nous allons commencer avec un balisage HTML basique et une seule image, sans CSS ni JavaScript, ce qui est d'une simplicité enfantine. Nous allons à présent ouvrir notre chronologie réseau dans Chrome DevTools, puis examiner le graphique en cascade des ressources qui en résulte :

<img src="images/waterfall-dom.png" alt="" class="center" alt="Chemin critique du rendu">

Comme prévu, le téléchargement du fichier HTML a pris 200 ms. La portion transparente de la ligne bleue indique le temps d'attente du navigateur sur le réseau, c'est à dire qu'aucun octet de réponse n'a encore été reçu. La partie pleine de la ligne indique le temps écoulé jusqu'à la fin du téléchargement, après la réception des premiers octets de réponse. Dans l'exemple ci-dessus, le téléchargement HTML est de petite taille (moins de 4 Ko). Une seule boucle réseau suffit pour récupérer l'intégralité du fichier. Par conséquent, la récupération du document prend approximativement 200 ms. Une moitié de cette durée est passée à attendre sur le réseau et l'autre moitié à attendre la réponse du serveur.

Une fois que le contenu HTML devient disponible, le navigateur doit analyser les octets, les convertir en jetons et construire l'arborescence DOM. Dans DevTools, vous remarquerez, ce qui est pratique, que la durée de l'événement DOMContentLoaded est indiquée sur la dernière ligne (216 ms) et qu'elle est représentée par la ligne verticale bleue. L'intervalle situé entre la fin du téléchargement du fichier HTML et la ligne verticale bleue (DOMContentLoaded) représente le temps nécessaire au navigateur pour construire l'arborescence DOM, à peine quelques millisecondes, dans le cas présent.

Enfin, il est intéressant de remarquer que la photo 'You're awesome' n'a pas bloqué l'événement DOMContentLoaded. Il s'avère que nous pouvons construire l'arborescence de rendu et même afficher la page sans attendre tous les éléments de celle-ci : ** toutes les ressources ne sont pas essentielles pour générer le premier affichage rapide**. Concrètement, comme nous le verrons, lorsqu'on évoque le chemin critique du rendu, il s'agit en général du balisage HTML, de CSS et de JavaScript. Les images ne bloquent pas l'affichage initial de la page. Cependant, nous devons bien entendu tenter de nous assurer que les images en question d'affichent également dès que possible.

Ceci étant, l'événement `load` (également appelé `onload` de manière courante) est bloqué sur l'image. DevTools affiche l'événement `onload` à 335 ms. Pour rappel, l'événement `onload` marque le moment où *toutes les ressources* nécessaires à la page ont été téléchargées et traitées. C'est à ce moment que l'indicateur de chargement peut cesser de tourner dans le navigateur. Il est représenté par une ligne verticale rouge dans le graphique en cascade.


## Ajouter JavaScript et CSS à la formule

Notre page de l'expérience 'Hello World' est simple en apparence, mais en coulisses, tout un processus est mis en œuvre pour qu'elle fonctionne. Ceci dit, en pratique, nous aurons besoin de bien plus que du HTML. Nous utiliserons probablement une feuille de styles CSS ainsi qu'un ou plusieurs scripts, afin de rendre la page plus interactive. Ajoutons à présent ces deux éléments dans la formule pour voir ce qui va se produire :

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Avant d'ajouter JavaScript et CSS:_

<img src="images/waterfall-dom.png" alt="Chemin critique du rendu avec DOM" class="center">

_Avec JavaScript et CSS :_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

L'ajout de deux fichiers CSS et JavaScript externes a entraîné le rajout de deux requêtes sur le graphique en cascade. Elles ont été envoyées approximativement en même temps par le navigateur. Jusqu'ici, tout va bien. Cependant, **vous remarquerez que la différence de temps entre les événements `DOMContentLoaded` et `onload` est bien plus réduite. Pour quelle raison ?**

* À la différence de l'exemple comportant simple fichier HTML, il faut désormais récupérer et analyser le fichier CSS pour construire le modèle objet CSS (CSSOM). Nous savons également que le DOM et le CSSOM sont nécessaires pour construire l'arborescence de rendu.
* Comme un analyseur bloque également le fichier JavaScript sur notre page, l'événement DOMContentLoaded est bloqué jusqu'au téléchargement et à l'analyse du fichier CSS. Le fichier JavaScript peut envoyer une requête au CSSOM, nous devons donc bloquer et attendre le fichier CSS avant de pouvoir exécuter le fichier JavaScript.

**Et si l'on remplace notre script externe par un script intégré ?**Cette question, banale en apparence, est en réalité très difficile. Il s'avère que même si le script est directement intégré à la page, le navigateur ne dispose que d'une seule méthode fiable pour déterminer l'action programmée dans le script : il doit l'exécuter. Et comme nous l'avons vu plus haut, cela n'est possible qu'une fois que le CSSOM a été construit. Pour résumer, un fichier JavaScript intégré bloque également l'analyseur.

Ceci étant, est-ce que l'intégration du script permet à la page de s'afficher plus vite, bien qu'elle bloque sur le fichier CSS ? Le scénario précédent était compliqué, mais celui-ci l'est encore plus. Essayons pour voir ce qui se passe...

_JavaScript externe :_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript intégré :_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM et JS intégré" class="center">

Nous avons effectué une requête de moins, mais les temps des événements `DOMContentLoaded` et `onload` sont effectivement les mêmes. Pourquoi ? Nous savons à présent qu'il importe peu que le fichier JavaScript soit intégré ou externe, car dès que le navigateur charge la balise du script, il se bloque et attend que le CSSOM soit construit. De plus, dans notre premier exemple, le téléchargement des fichiers CSS et JavaScript s'effectue en parallèle dans le navigateur et se termine en même temps. Par conséquent, dans ce cas particulier, l'intégration du code JavaScript n'est pas d'une grande utilité. Cette solution ne convient pas. Alors que faire pour que notre page s'affiche plus vite ? En fait, il existe plusieurs stratégies différentes.

Tout d'abord, n'oubliez pas que tous les scripts intégrés bloquent les analyseurs. En revanche, pour les scripts externes, il est possible d'ajouter le mot clé `async` pour débloquer l'analyseur. Nous allons donc annuler l'intégration que nous avions effectuée, puis tenter cette solution.

{% include_code src=_code/measure_crp_async.html snippet=full %}

_JavaScript (externe) bloquant l'analyseur :_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript (externe) asynchrone :_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, JS asynchrone" class="center">

C'est beaucoup mieux ! L'événement DOMContentLoaded survient peu de temps après l'analyse du HTML. Le navigateur détecte que le JavaScript ne doit pas être bloqué. Comme il n'y a pas d'autres scripts bloquants pour l'analyseur, la construction CSSOM peut également s'effectuer en parallèle.

Par ailleurs, nous aurions pu tenter une autre approche en intégrant les codes CSS et JavaScript :

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, CSS intégré, JS intégré" class="center">

Vous remarquerez que l'événement DOMContentLoaded se produit effectivement au même moment que dans l'exemple précédent. Au lieu d'identifier notre JavaScript en tant que `async`, nous avons intégré le CSS et le JavaScript dans la page elle-même. La page HTML devient beaucoup plus lourde, mais en contrepartie, il n'est pas nécessaire que le navigateur attende pour récupérer toutes les ressources externes. Tout est inclus dans la page.

Comme vous le voyez, même avec une page très simple, l'optimisation du chemin critique du rendu est un exercice qui n'est pas facile. Nous devons comprendre le schéma de dépendance existant entre les différentes ressources, identifier les ressources 'essentielles' et nous devons choisir une stratégie parmi d'autres pour savoir comment inclure ces ressources dans la page. Il n'y a pas de solution unique à ce problème. Chaque page est différente et vous devrez suivre tout seul une procédure similaire, afin de découvrir la stratégie optimale.

Voyons à présent si en prenant un peu de recul, il est possible d'identifier quelques modèles généraux de performance...


## Modèles de performance

La page la plus simple possible est uniquement composée de balisage HTML : pas de CSS, pas de JavaScript ni d'autres types de ressources. Pour afficher cette page, le navigateur doit lancer la requête, attendre l'arrivée du document HTML, l'analyser, construire le DOM et enfin, l'afficher sur l'écran :

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="Chemin critique du rendu Hello World" class="center">

**L'intervalle de temps compris entre T<sub>0</sub> et T<sub>1</sub> indique la durée de traitement du réseau et du serveur.** Dans le meilleur des cas, (si le fichier HTML est de petite taille), il suffit d'une seule boucle réseau pour récupérer l'intégralité du document. En raison du fonctionnement des protocoles de transport TCP, les fichiers de taille plus importante peuvent nécessiter davantage de boucles. Nous reviendrons sur ce sujet dans une leçon ultérieure. **Par conséquent, nous pouvons affirmer que la page ci-dessus, dans le meilleur des cas, a un chemin critique du rendu d'une boucle (au minimum).**

À présent, observons la même page, avec un fichier CSS externe :

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="Chemin critique du rendu avec DOM et CSSOM" class="center">

Là encore, la récupération du fichier réseau prend une boucle réseau. Le balisage récupéré indique ensuite que le fichier CSS est également requis. Cela signifie que le navigateur doit retourner sur le serveur, puis récupérer le CSS avant de pouvoir afficher la page à l'écran. **Par conséquent, un minimum de deux boucles réseau est nécessaire pour afficher cette page**. Encore une fois, le chargement du fichier CSS peut nécessiter plusieurs boucles, d'où l'accent sur le terme `minimum`.

Nous allons définir le vocabulaire que nous utiliserons pour décrire le chemin critique du rendu :

* **Ressource cruciale** : ressource susceptible de bloquer l'affichage initial de la page.
* **Longueur du chemin critique** : nombre de boucles ou temps total nécessaire à la récupération de toutes les ressources cruciales.
* **Octets cruciaux** : nombre total d'octets nécessaires pour obtenir le premier affichage de la page, composé de la somme des tailles de transfert des fichiers de toutes les ressources cruciales
Notre premier exemple de page avec un seul fichier HTML contenait une ressource cruciale unique (le document HTML), la longueur du chemin critique équivalait à une boucle réseau (dans l'hypothèse d'un fichier de petite taille) et le nombre d'octets cruciaux n'était que la taille de transfert du document HTML lui-même.

Comparons à présent ces données  aux caractéristiques du chemin critique de l'exemple HTML +  CSS ci-dessus :

<img src="images/analysis-dom-css.png" alt="DOM + Chemin critique du rendu avec CSSOM" class="center">

* **2** ressources cruciales
* **2** ou plusieurs boucles réseau pour la longueur minimum du chemin critique
* **9** Ko d'octets cruciaux

Les fichiers HTML et CSS sont tous les deux nécessaires à la construction de l'arborescence de rendu, ce qui en fait deux ressources cruciales. Le fichier CSS n'est récupéré qu'une fois que le navigateur a chargé le document HTML. La longueur minimale du chemin critique est donc de deux boucles. Les deux ressources totalisent une somme de 9 Ko d'octets cruciaux.

Nous allons maintenant ajouter un autre fichier JavaScript à cette formule.

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Nous avons ajouté le fichier app.js, qui est un élément JavaScript externe sur cette page. Comme nous le savons à présent, il s'agit d'une ressource bloquant l'analyseur (c'est à dire, cruciale). Pire encore, nous allons devoir bloquer et attendre le CSSOM afin d'exécuter le fichier JavaScript. Pour rappel, le fichier JavaScript peut envoyer une requête au CSSOM et donc le navigateur se mettra en pause jusqu'au téléchargement du fichier `css.style` et à la construction du CSSOM.

<img src="images/analysis-dom-css-js.png" alt="Chemin critique du rendu avec DOM, CSSOM et JavaScript" class="center">

Ceci étant, concrètement, en observant le 'graphique en cascade du réseau' pour cette page, vous remarquerez que les requêtes CSS et JavaScript seront initiées à peu près au même moment. Le navigateur reçoit le fichier HTML, découvre les deux ressources, puis lance es deux requêtes. Ainsi, les caractéristiques de chemin critique de cette page sont les suivantes :

* **3** ressources cruciales
* **2** ou plusieurs boucles réseau pour la longueur minimum du chemin critique
* **11** Ko d'octets cruciaux

Nous avons donc à présent trois ressources cruciales, totalisant 11 Ko d'octets cruciaux, mais la longueur de chemin critique est toujours de deux boucles, car nous pouvons transférer les fichiers CSS et JavaScript en parallèle. **Pour déterminer les caractéristiques d'un chemin critique du rendu, vous devez être capable d'identifier quelles ressources sont cruciales et de comprendre comment le navigateur programme leur récupération.** Continuons avec notre exemple...

Après en avoir discuté avec les développeurs de notre site, nous avons réalisé que le fichier JavaScript inclus dans notre page ne doit pas forcément être bloquant. Elle contient des statistiques et d'autres codes qui ne bloquent pas obligatoirement son affichage. Sachant cela, nous pouvons ajouter l'attribut `async` à la balise de script pour débloquer l'analyseur :

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="Chemin critique du rendu avec DOM, CSSOM et JavaScript asynchrone" class="center">

Rendre le script asynchrone comporte plusieurs avantages :

* Le script n'est plus bloquant pour l'analyseur et ne fait pas partie du chemin critique du rendu.
* Comme il n'y a pas d'autres scripts cruciaux, le fichier CSS ne doit pas bloquer l'événement DOMContentLoaded.
* Plus tôt l'événement DOMContentLoaded est déclenché, plus tôt d'autres logiques applicatives peuvent commencer à s'exécuter.

En conséquence, notre page optimisée comporte à nouveau deux ressources cruciales (HTML et CSS), une longueur minimale de chemin critique de deux boucles et un total de 9 Ko d'octets cruciaux.

Pour finir, supposons que la feuille de style CSS ne soit utile que pour l'impression. Quel serait le résultat ?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="Chemin critique du rendu avec DOM, CSS non bloquant et JavaScript asynchrone" class="center">

Comme la ressource css.style ne sert qu'à l'impression, le navigateur n'a pas besoin de la bloquer pour afficher la page. Donc, dès que la construction du DOM est terminée, le navigateur dispose de suffisamment d'informations pour afficher la page. Par conséquent, cette page ne comporte qu'une seule ressource cruciale (le document HTML) et la longueur minimale du chemin critique du rendu est d'une boucle.



