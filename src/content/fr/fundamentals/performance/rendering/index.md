project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Les utilisateurs remarquent quand les sites ou applications ne
fonctionnent pas correctement, leur optimisation est donc cruciale!

{# wf_updated_on: 2019-07-29 #}
{# wf_published_on: 2015-03-20 #}
{# wf_blink_components: Blink>Paint #}

# Performance de rendu {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

Les utilisateurs actuels d'Internet
[s'attendent à ce que les pages qu'ils visitent soient
interactives](https://paul.kinlan.me/what-news-readers-want/)
et c'est là que vous devez concentrer votre temps et vos efforts. Les pages ne
doivent pas seulement se charger rapidement, elles doivent aussi fonctionner
correctement; le défilement doit être très rapide, les animations et
interactions doivent être aussi intuitives que possible.

Afin d'écrire des sites et des applications performantes il vous faut
comprendre comment le HTML, le Javascript et le CSS sont gérés par le
navigateur, et vous assurer que le code écrit (et le code tiers que vous
incluez) fonctionne le plus efficacement possible.

## 60 fps et taux de rafraîchissement des appareils

<div class="attempt-right">
  <figure>
    <img src="images/intro/response.jpg" alt="Utilisateur interagissant avec un site.">
  </figure>
</div>

La plupart des appareils actuels ont un taux de rafraîchissement **d'environ 60
images par seconde**. S'il y a une animation ou une transition en cours, ou si
l'utilisateur fait défiler la page, le navigateur doit être en accord avec le
taux de rafraîchissement de l'appareil et placer une nouvelle image à chaque
fois que l'écran se rafraîchit.

Chacune de ces images consomme environ 16 ms (1 seconde / 60 = 16.66ms).
En réalité, le navigateur a plus de tâches à effectuer que le seul
rafraîchissement de l'image. C'est pourquoi l'ensemble des tâches doivent être
complétées dans un temps de **10ms**. Si vous échouez à effectuer vos actions
dans ce temps imparti, le taux de rafraîchissement chute, et le contenu a un
rendu saccadé.
On appelle souvent cela du "jank", et cela a un impact négatif sur l'expérience
utilisateur.

## Le pipeline de pixels

Il y a cinq domaines principaux que vous devez connaître et prendre en compte
lorsque vous travaillez. Ce sont les zones sur lesquelles vous avez le plus de
contrôle et les points clés du pipeline de pixels à l'écran:

<img src="images/intro/frame-full.jpg" alt="Le pipeline de pixels complet.">

- **JavaScript**. De manière générale le JavaScript est utilisé pour écrire des
fonctions qui ont un impact visual, que ce soit en utilisant la fonction
`animate` de JQuery, en triant un ensemble de données, ou en ajoutant des
éléments du DOM à la page. Il n'est pas du seul ressort de Javascript de
déclencher des changements visuels: les animations CSS, les transitions ainsi
que les animations via la Web Animations API sont aussi très utilisées.
- **Calculs de style**. Il s'agit du processus de détermination des règles CSS à
appliquer en fonction des sélecteurs correspondants, par exemple, `.headline` ou
`.nav > .nav__item`. A ce stade, lorsque les règles sont connues, elles sont
appliquées et les styles finaux sont calculés.
- **Mise en page**. Une fois que le navigateur connait les règles à appliquer
à un élément, il peut commencer à calculer l'espace nécessaire à l'affichage sur
l'écran. La mise en page du modèle signifie qu'un élément peut avoir un impact
sur d'autres, par exemple la largeur de l'élément `<body>` affecte la largeur de
ses enfants et ainsi de suite sur toute la profondeur de l'arbre, donc ce
processus peut être assez demandeur pour le navigateur.
- **Rendu**. Le rendu est le processus de remplissage en pixels. Il implique de
dessiner le texte, les couleurs, les bordures, les ombres et l'ensemble des
parties visibles à l'écran. Le rendu est de manière générale effectué sur
plusieurs surfaces, appelés "couches".
- **Composition**. Maintenant que les différentes parties de la page sont
dessinées en plusieurs couches, il convient de les dessiner dans le bon ordre de
manière à ce que la page s'affiche correctement. Ceci est particulièrement
important lorsque des éléments se chevauchent, résultant au fait qu'un élément
puisse, de manière incorrecte, apparaître au dessus d'un autre.

Chacune de ces parties du pipeline représente une opportunité d'introduire une
latence, il est donc important de comprendre les parties du pipeline que votre
code déclenche.

Parfois, on entend le terme "rastérisation" en conjonction avec le rendu.
C'est parce que le rendu est composé de deux tâches: 1) créer la liste des
appels de rendu, et 2) remplir avec les pixels.

Ce dernier est appelé "rastérisation", et à chaque fois que vous voyez des appels
de rendu dans DevTools, vous devez penser que cela inclut probablement une
rastérisation. (Dans certaines architectures, la création des appels de rendu et
la rastérisation sont faites dans des threads séparés, mais ce n'est pas quelque
chose qui est sous le contrôle du développeur.)

Il n'est pas nécessaire pour vous de toucher à chaque étape du pipeline pour
chaque rendu. En réalité, il y a trois manières pour le pipeline d'avoir un
impact, *normalement*, sur une certaine trame lorsque vous faites un changement
visuel, qu'il soit en Javascript, en CSS, ou via les Web Animations:

### 1. JS / CSS > Style > Mise en Page> Rendu > Composition

<img src="images/intro/frame-full.jpg" alt="Le pipeline de pixels complet.">

Si vous changez une propriété de "mise en page" lié au changement des propriétés
géométriques d'un élément, comme sa largeur, sa hauteur, ou sa position avec
left ou top, le navigateur va devoir vérifier les autres élements et réajuster
la page. Chacune des parties affectées va devoir être rendue une nouvelle fois,
et le rendu final va devoir être réagencé avec ces autres élements.

### 2. JS / CSS > Style > Rendu> Composition

<img src="images/intro/frame-no-layout.jpg" alt="Le pipeline de pixels sans mise en page.">

Si vous faites un changement de "rendu uniquement", comme une image
d'arrière-plan, la couleur du texte, ou des ombres, en d'autres mots des
propriétés qui n'affectent pas le rendu d'une page, le navigateur va passer
l'étape de mise en page, mais il va tout de même faire le rendu.

### 3. JS / CSS > Style > Composition

<img src="images/intro/frame-no-layout-paint.jpg" alt="Le pipeline de pixels sans mise en page ou rendu.">

Si vous faites un changement qui ne nécessite ni une remise en page, ni un rendu
supplémentaire, le navigateur passe directement à l'étape de composition.

Cette dernière est la plus économe en termes de ressources et la plus appropriée
pour des points assez délicats dans le cycle de vie de l'application, comme les
animations ou le défilement de la page.

Note : si vous souhaitez savoir laquelle de ces trois versions sera déclenchée
par rapport à vos modifications de propriétés CSS, rendez-vous sur  [CSS
Triggers](https://csstriggers.com).
Et si vous souhaitez en apprendre plus rapidement sur les performances
d'animations, dirigez-vous à la section relative [au changement des propriétés de
compositeur uniquement.](../../../../en/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

La performance est l'art d'éviter le travail, et de rendre le travail effectué
le plus efficace possible. Dans beaucoup de cas, il s'agit de travailler avec le
navigateur, et non contre. Il est intéressant de garder à l'esprit que le
travail listé au dessus dans le pipeline diffère en terme de coûts de calcul;
certaines tâches sont plus coûteuses que d'autres!

Intéressons nous plus en détails aux différentes étapes du pipeline. Nous allons
étudier les problèmes récurrents, comment les diagnostiquer et les résoudre.

{% include "web/_shared/udacity/ud860.html" %}

## Votre avis {: #feedback }

{% include "web/_shared/helpful.html" %}
