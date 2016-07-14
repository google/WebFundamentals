---
title: "Chemin critique du rendu"
description: "Optimisation du chemin critique du rendu en affichant en priorité le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page."
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  L'optimisation du chemin critique du rendu est essentielle pour améliorer les performances de nos pages : notre objectif est de donner la priorité et d'afficher le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page.
</p>

Pour offrir une expérience rapide sur Internet, le navigateur doit fournir un travail important. La majeure partie de ce travail nous est cachée, à nous les développeurs Web : nous écrivons le balisage, et une jolie page s'affiche à l'écran. Mais comment le navigateur fait-il exactement pour afficher des pixels à l'écran à partir de notre code HTML, CSS et JavaScript ?

Pour optimiser les performances, il est essentiel de comprendre ce qui se passe au cours de ces étapes intermédiaires entre la réception des octets HTML, CSS et JavaScript et le traitement nécessaire pour les transformer en pixels affichés. C'est ce que l'on appelle le **chemin critique du rendu**.

<img src="images/progressive-rendering.png" class="center" alt="affichage progressif de la page">

En optimisant le chemin critique du rendu, nous pouvons améliorer de façon significative le temps nécessaire pour afficher nos pages pour la première fois. En outre, le fait de comprendre le chemin critique du rendu permet d'avoir de bonnes bases pour créer des applications interactives qui offrent de bonnes performances. En fait, le processus de traitement des mises à jours interactives est identique, mais il s'effectue en boucle et sans interruption, et idéalement à 60 images par seconde ! Mais n'allons pas trop vite. Observons d'abord rapidement le processus d'affichage complet d'une page simple par le navigateur.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


