---
title: "Ajouter de l'interactivité avec JavaScript"
description: "JavaScript nous permet de modifier pratiquement chaque aspect de la page : le contenu, le style et le comportement en réponse aux interactions de l'internaute. Cependant, JavaScript peut également bloquer la construction DOM et retarder l'affichage de la page. Pour obtenir une performance optimale, utilisez un fichier JavaScript asynchrone et éliminez tout fichier JavaScript inutile du chemin critique du rendu."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - "JavaScript peut envoyer des requêtes au DOM et au CSSOM et les modifier."
    - "L'exécution de JavaScript sur le CSSOM."
    - "JavaScript bloque la construction du DOM sauf s'il est explicitement déclaré asynchrone."
---
<p class="intro">
  JavaScript nous permet de modifier pratiquement chaque aspect de la page : le contenu, le style et le comportement en réponse aux interactions de l'internaute. Cependant, JavaScript peut également bloquer la construction DOM et retarder l'affichage de la page. Pour obtenir une performance optimale, utilisez un fichier JavaScript asynchrone et éliminez tout fichier JavaScript inutile du chemin critique du rendu.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript est un langage dynamique exécuté dans le navigateur qui nous permet de modifier presque tous les aspects du comportement de la page. Nous pouvons modifier son contenu, en ajoutant ou en supprimant des éléments de l'arbre DOM, nous pouvons modifier les propriétés CSSOM d chaque élément, nous pouvons traiter les informations de l'internaute et bien plus encore. Pour illustrer concrètement ces propriétés, ajoutons un simple script intégré à notre exemple précédent 'Hello World' :

{% include_code src=_code/script.html snippet=full %}

* JavaScript nous permet d'atteindre le DOM et de tirer la référence vers le nœud caché de la balise `span`. Le nœud n'est parfois pas visible dans l'arbre de rendu, mais il est toujours là, dans le DOM. Ensuite, une fois que nous avons la référence, nous pouvons en modifier le texte (via .textContent), et même remplacer sa propriété de style d'affichage `none` par `inline`. Une fois que nous avons effectué toutes ces opérations, la page affiche désormais l'expression `**Hello interactive students !**`.

* JavaScript nous permet également de créer, d'appliquer des styles, d'ajouter et de supprimer de nouveaux éléments au DOM. En fait, d'un point de vue technique, la page toute entière pourrait n'être qu'un grand fichier JavaScript créant et appliquant des styles aux éléments, un par un. Cela fonctionnerait, mais dans la pratique, travailler avec HTML et CSS est beaucoup plus facile. Dans la deuxième partie de notre fonction JavaScript, nous créons un élément DIV, définissons son contenu texte, lui appliquons un style, puis l'ajoutons à la section `body`.

<img src="images/device-js-small.png" class="center" alt="aperçu de la page">

En outre, nous avons modifié le contenu et le style CSS d'un nœud de DOM existant, puis ajouté un nœud entièrement nouveau au document. Cette page ne va pas être récompensée par un prix de design, mais elle illustre la puissance et la flexibilité que JavaScript nous offre.

Cependant, celles-ci cachent une mise en garde de taille quant à la performance. JavaScript nous offre beaucoup de puissance, mais génère de nombreuses limitations supplémentaires sur la méthode et le moment d'affichage de la page.

Tout d'abord, vous remarquerez que dans l'exemple ci-dessus, le script intégré se trouve dans la partie inférieure de la page. Pourquoi ? Vous devriez essayer par vous-même, mais si nous déplaçons l'élément _span_, vous remarquerez que le script échoue, parce qu'il ne trouve aucune référence aux éléments _span_ du document. En d'autres termes, la propriété _getElementsByTagName('span')_ renvoie la valeur _null_. Ceci démontre une propriété importante :notre script s'exécute à l'emplacement exact où il est inséré dans le document. Lorsque l'analyseur HTML rencontre une balise de script, il suspend le processus de construction du DOM, puis cède le contrôle au moteur JavaScript. Lorsque celui-ci a fini de s'exécuter, le navigateur reprend sa tâche au point où il l'a laissée, puis reprend la construction du DOM.

En d'autres termes, le bloqueur de script ne trouve pas d'éléments plus loin sur la page, car ils n'ont pas encore été traités. Ou, d'un autre point de vue, **l'exécution du script intégré bloque la construction du DOM, ce qui retarde également l'affichage initial.**

L'introduction de scripts dans notre page comporte une autre subtile propriété. Non seulement ils peuvent lire et modifier le DOM, mais également les propriétés CSSOM. En fait, c'est exactement ce que nous faisons dans notre exemple, lorsque nous remplaçons la valeur `none` de la propriété d'affichage de l'élément `span` par la valeur `inline`. Quel est le résultat final ? Nous avons désormais une situation de concurrence.

Qu'en est-il si le navigateur n'a pas terminé de télécharger et de construire CSSOM lorsque nous voulons exécuter le script ? La réponse est simple, mais pas très efficace pour la performance : **le navigateur retardera l'exécution du script jusqu'à ce qu'il ait terminé de télécharger et de construire le CSSOM, et en attendant, la construction du DOM est également bloquée.**

Pour résumer, JavaScript génère beaucoup de nouvelles dépendances entre le DOM, le CSSOM et l'exécution de JavaScript. Cela peut entraîner des retards importants dans la rapidité du traitement et de l'affichage de la page à l'écran :

1. L'emplacement du script dans le document est important.
2. La construction du DOM est suspendue lorsqu'une balise de script se présente, jusqu'à ce que l'exécution du script soit terminée.
3. JavaScript peut envoyer des requêtes au DOM et au CSSOM et les modifier.
4. L'exécution de JavaScript est retardée jusqu'à ce que le CSSOM soit prêt.

Lorsque l'on évoque 'l'optimisation du chemin critique du rendu', en règle générale, il s'agit de comprendre et d'optimiser le schéma de dépendance entre HTML, CSS et JavaScript.


## Blocage de l'analyseur vs JavaScript asynchrone

Par défaut, l'exécution de JavaScript est bloquante pour l'analyseur. Lorsque le navigateur détecte un script dans le document, il doit suspendre la construction du DOM, céder le contrôle à l'exécution JavaScript et laisser le script s'exécuter avant de terminer la construction du DOM. Nous avons déjà vu une illustration concrète de ce cas dans l'exemple précédent. En fait, les scripts intégrés sont toujours bloquants pour l'analyseur, sauf si vous avez été prudent et que vous avez écrit un code supplémentaire pour différer leur exécution.

Qu'en est-il des scripts inclus via une balise de script ? Prenons l'exemple précédent et recopions le code dans un fichier séparé :

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

Vous attendez-vous à ce que l'ordre d'exécution soit différent lorsque nous utilisons une balise `<script>` à la place d'un extrait JavaScript intégré ? Bien sûr, la réponse est `non`, car ils sont identiques et doivent se comporter de la même manière. Dans les deux cas, le navigateur devra suspendre sa tâche et exécuter le script avant de pouvoir traiter le reste du document. Cependant, **dans le cas d'un fichier JavaScript externe, le navigateur devra également suspendre sa tâche et attendre que le script soit récupéré sur le disque, le cache ou un serveur distant. Cette attente peut ajouter entre des dizaines et des milliers de millisecondes de retard au chemin critique du rendu.**

Ceci étant, heureusement, il existe une solution de secours. Par défaut, tout script JavaScript est bloquant pour l'analyseur, le navigateur ne peut donc pas détecter les actions programmées dans le script pour la page. Par conséquent, il doit prévoir le scénario le plus défavorable et bloquer l'analyseur. Cependant, que se passerait-il si nous pouvions signaler au navigateur que le script ne doit pas forcément être exécuté à l'emplacement exact auquel il est référencé dans le document ? Cela permettrait au navigateur de continuer à construire le DOM et de laisser le script s'exécuter lorsqu'il est prêt, c'estest à dire une fois que le fichier a été récupéré dans le cache ou sur un serveur distant.

Comment procéder pour parvenir à ce résultat ? C'est assez simple, il nous suffit de marquer le script comme _async_ :

{% include_code src=_code/split_script_async.html snippet=full %}

L'ajout du mot clé `async` à la balise de script indique au navigateur qu'il ne doit pas bloquer la construction du DOM pendant qu'il attend que le script soit disponible : le gain de performance est considérable.



