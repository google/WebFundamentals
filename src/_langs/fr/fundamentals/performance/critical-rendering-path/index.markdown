---
layout: section
title: "Chemin critique du rendu"
description: "Optimisation du chemin critique du rendu en affichant en priorité le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page."
introduction: "L'optimisation du chemin critique du rendu est essentielle pour améliorer les performances de nos pages : notre objectif est de donner la priorité et d'afficher le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page."
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 1
id: critical-rendering-path
collection: performance
authors:
  - ilyagrigorik
---
{% wrap content%}

Pour offrir une expérience rapide sur Internet, le navigateur doit fournir un travail important. La majeure partie de ce travail nous est cachée, à nous les développeurs Web : nous écrivons le balisage, et une jolie page s'affiche à l'écran. Mais comment le navigateur fait-il exactement pour afficher des pixels à l'écran à partir de notre code HTML, CSS et JavaScript ?

Pour optimiser les performances, il est essentiel de comprendre ce qui se passe au cours de ces étapes intermédiaires entre la réception des octets HTML, CSS et JavaScript et le traitement nécessaire pour les transformer en pixels affichés. C'est ce que l'on appelle le **chemin critique du rendu**.

<img src="images/progressive-rendering.png" class="center" alt="affichage progressif de la page">

En optimisant le chemin critique du rendu, nous pouvons améliorer de façon significative le temps nécessaire pour afficher nos pages pour la première fois. En outre, le fait de comprendre le chemin critique du rendu permet d'avoir de bonnes bases pour créer des applications interactives qui offrent de bonnes performances. En fait, le processus de traitement des mises à jours interactives est identique, mais il s'effectue en boucle et sans interruption, et idéalement à 60 images par seconde ! Mais n'allons pas trop vite. Observons d'abord rapidement le processus d'affichage complet d'une page simple par le navigateur.

{% endwrap%}

