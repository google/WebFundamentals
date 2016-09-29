project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Optimisation du chemin critique du rendu en affichant en priorité le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page.

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# Chemin critique du rendu {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


L'optimisation du chemin critique du rendu est essentielle pour améliorer les performances de nos pages : notre objectif est de donner la priorité et d'afficher le contenu associé à la première action que l'utilisateur souhaite effectuer sur une page.

Pour offrir une expérience rapide sur Internet, le navigateur doit fournir un travail important. La majeure partie de ce travail nous est cachée, à nous les développeurs Web : nous écrivons le balisage, et une jolie page s'affiche à l'écran. Mais comment le navigateur fait-il exactement pour afficher des pixels à l'écran à partir de notre code HTML, CSS et JavaScript ?

Pour optimiser les performances, il est essentiel de comprendre ce qui se passe au cours de ces étapes intermédiaires entre la réception des octets HTML, CSS et JavaScript et le traitement nécessaire pour les transformer en pixels affichés. C'est ce que l'on appelle le **chemin critique du rendu**.

<img src="images/progressive-rendering.png" class="center" alt="affichage progressif de la page">

En optimisant le chemin critique du rendu, nous pouvons améliorer de façon significative le temps nécessaire pour afficher nos pages pour la première fois. En outre, le fait de comprendre le chemin critique du rendu permet d'avoir de bonnes bases pour créer des applications interactives qui offrent de bonnes performances. En fait, le processus de traitement des mises à jours interactives est identique, mais il s'effectue en boucle et sans interruption, et idéalement à 60 images par seconde ! Mais n'allons pas trop vite. Observons d'abord rapidement le processus d'affichage complet d'une page simple par le navigateur.


{% include "web/_shared/udacity/ud884.html" %}




