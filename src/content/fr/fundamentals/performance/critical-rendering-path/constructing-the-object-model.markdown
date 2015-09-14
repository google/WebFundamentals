---
title: "Construire le modèle d'objet"
description: "Avant que le navigateur puisse afficher le contenu sur l'écran, les arborescences DOM et CSSOM doivent être créées. Nous devons donc nous assurer que le code HTML et CSS est transmis au navigateur le plus rapidement possible."
updated_on: 2014-09-12
key-takeaways:
  construct-object-model:
    - "Octets → caractères → jetons → nœuds → modèle d'objet."
    - "Le balisage HTML est transformé en DOM (modèle d'objet de document) et le balisage CSS est transformé en CSSOM (modèle d'objet CSS)."
    - "Les modèles DOM et CSSOM sont des structures de données indépendantes."
    - "Chrome DevTools Timeline nous permet de capturer et de contrôler les coûts de construction et de traitement des modèles DOM et CSSOM."
notes:
  devtools:
    - "Nous supposons que vous connaissez les principes de base de Chrome DevTools, c'est-à-dire que vous savez comment capturer une suite de réseaux ou enregistrer une chronologie. Si vous avez besoin de vous rafraîchir la mémoire, consultez la <a href='https://developer.chrome.com/devtools'>documentation Chrome DevTools</a>, ou si vous découvrez DevTools pour la première fois, nous vous conseillons de suivre le cours Codeschool <a href='http://discover-devtools.codeschool.com/'>Découvrir DevTools</a>."
---
<p class="intro">
  Avant que le navigateur puisse afficher la page, les arborescences DOM et CSSOM doivent être créées. Nous devons donc nous assurer que le code HTML et CSS est transmis au navigateur le plus rapidement possible.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## Modèle d'objet de document (DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

Commençons par un exemple le plus simple possible : une page en HTML brut avec du texte et une seule image. Que doit faire le navigateur pour traiter cette page simple ?

<img src="images/full-process.png" alt="Processus de construction du DOM">

1. **Conversion** : le navigateur lit les octets bruts du HTML sur le disque ou le réseau, et les traduit en caractères individuels en fonction de l'encodage spécifique du fichier (UTF-8, par exemple).
1. **Création de jetons** : le navigateur convertit les chaînes de caractères en différents jetons spécifiés par la [norme HTML5 du W3C](http://www.w3.org/TR/html5/), telles que `<html>`, `<body>` et d'autres chaînes entre chevrons. Chaque jeton possède une signification particulière et un ensemble de règles.
1. **Analyse lexicale** : les jetons émis sont convertis en 'objets' qui définissent leurs propriétés et leurs règles.
1. **Construction du DOM** : enfin, puisque le balisage HTML définit les relations entre les différentes balises (certaines balises sont contenues dans d'autres), les objets créés sont associés selon une arborescence, qui capture également la relation parent-enfant définie dans le balisage d'origine : l'objet _HTML_ est un parent de l'objet _body_, _body_ est un parent de l'objet _paragraph_, etc.

<img src="images/dom-tree.png" class="center" alt="Arborescence du DOM">

**Le résultat final de l'ensemble de ce processus est le modèle d'objet de document, ou `DOM` de notre page simple, que le navigateur utilise pour tout traitement supplémentaire de la page.**

Chaque fois que le navigateur doit traiter le balisage HTML, il doit suivre toutes les étapes ci-dessus : convertir les octets en caractères, identifier les jetons, convertir les jetons en nœuds et créer l'arborescence du DOM. La totalité du processus peut prendre du temps, en particulier si la quantité de code HTML à traiter est importante.

<img src="images/dom-timeline.png" class="center" alt="Effectuer le suivi de la construction du DOM dans DevTools">

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

Si vous ouvrez Chrome DevTools et enregistrez une chronologie lors du chargement de la page, vous pouvez voir la durée de cette étape. Dans l'exemple ci-dessus, il nous a fallu environ 5 ms pour convertir un fragment d'octets HTML en une arborescence de DOM. Bien sûr, pour une page plus importante, comme le sont la plupart des pages, le traitement peut être beaucoup plus long. Dans les prochaines sections qui décrivent comment créer des animations fluides, vous verrez que cette étape peut rapidement devenir votre goulot d'étranglement si le navigateur doit traiter de grandes quantités de code HTML.

Une fois l'arborescence du DOM prête, disposons-nous de suffisamment d'informations pour afficher la page à l'écran ? Pas encore ! L'arborescence du DOM capture les propriétés et les relations du balisage du document, mais elle ne nous donne aucune information sur l'aspect que doit avoir l'élément lorsqu'il est affiché. C'est à cela que sert le CSSOM, dont nous allons parler maintenant !

## Modèle d'objet CSS (CSSOM)

Pendant la construction du DOM de notre page simple, le navigateur a rencontré une balise de lien dans la section `head` du document, faisant référence à une feuille de style CSS externe : style.css. Anticipant le fait que cette ressource sera nécessaire pour afficher la page, le navigateur envoie immédiatement une demande pour cette ressource, qui est renvoyée avec le contenu suivant :

{% include_code src=_code/style.css snippet=full lang=css %}

Évidemment, nous aurions pu déclarer nos styles directement au sein du balisage HTML (intégré). Toutefois, le fait de séparer le CSS du code HTML nous permet de traiter le contenu et le graphisme comme deux choses distinctes : les graphistes peuvent travailler sur le CSS, les développeurs peuvent se concentrer sur le code HTML, et ainsi de suite.

Comme pour le code HTML, nous devons convertir les règles CSS reçues en un format que le navigateur peut comprendre et utiliser. C'est pourquoi nous répétons un processus très semblable à celui utilisé avec le code HTML :

<img src="images/cssom-construction.png" class="center" alt="Étapes de la construction du CSSOM">

Les octets CSS sont convertis en caractères, puis en jetons et en nœuds, et sont enfin associés selon une structure arborescente appelée 'Modèle d'objet CSS' ou CSSOM :

<img src="images/cssom-tree.png" class="center" alt="Arborescence du CSSOM">

Pourquoi le CSSOM possède-t-il une structure arborescente ? Lors du calcul de l'ensemble de styles final pour tout objet sur la page, le navigateur commence par la règle la plus générale applicable à ce nœud (par exemple, s'il s'agit d'un élément enfant du corps, tous les styles du corps s'appliquent). Il affine ensuite de façon récursive les styles calculés en appliquant des règles plus spécifiques, c'est-à-dire que les règles sont 'appliquées en cascade'.

Pour rendre les choses plus concrètes, observez l'arborescence CSSOM ci-dessus. Tout texte contenu entre les balises _span_ et placé dans l'élément `body` aura une police de 16 pixels et sera en rouge. La directive concernant la police est transmise de l'élément 'body' à l'élément `span`. Cependant, si une balise `span` est l'enfant d'une balise de paragraphe (p), alors son contenu n'est pas affiché.

Notez également que l'arborescence ci-dessus n'est pas l'arborescence CSSOM complète et qu'elle ne montre que les styles que nous avons décidé de remplacer dans notre feuille de style. Chaque navigateur fournit un ensemble de styles par défaut également appelés 'styles user-agent'. C'est ce que nous voyons lorsque nous ne fournissons pas nos propres styles, et nos styles remplacent simplement ces styles par défaut (les [styles IE par défaut], par exemple(http://www.iecss.com/)). Vous savez maintenant d'où viennent tous les 'styles calculés' dans Chrome DevTools !

Vous vous demandez combien de temps a duré le traitement du CSS ? Enregistrez une chronologie dans DevTools et recherchez l'événement 'Recalculer le style' : contrairement à l'analyse du DOM, la chronologie n'affiche pas d'entrée 'Analyser le CSS' distincte, mais capture l'analyse et la construction de l'arborescence du CSSOM, ainsi que le calcul récursif des styles calculés sous cet événement précis.

<img src="images/cssom-timeline.png" class="center" alt="Effectuer le suivi de la construction du CSSOM dans DevTools">

Le traitement de notre feuille de style simple prend environ 0,6 ms, et cette feuille de style affecte huit éléments sur la page. C'est peu, mais une fois encore, ce n'est pas gratuit. Cependant, d'où viennent ces huit éléments ? Les modèles CSSOM et DOM sont des structures de données indépendantes ! En fait, le navigateur masque une étape importante. Parlons ensuite de l'arborescence d'affichage qui lie les modèles DOM et CSSOM entre eux.



