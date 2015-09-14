---
title: "Règles et recommandations PageSpeed"
description: "Règles PageSpeed Insights en contexte : à quoi vous devez faire attention lorsque vous optimisez le chemin critique du rendu, et pourquoi."
updated_on: 2014-04-28
---
<p class="intro">
  Règles PageSpeed Insights en contexte : à quoi vous devez faire attention lorsque vous optimisez le chemin critique du rendu, et pourquoi.
</p>

## Éliminer les modèles JavaScript et CSS empêchant l'affichage

Pour obtenir un premier affichage le plus rapide possible, vous devez réduire le nombre de ressources critiques sur la page, et les éliminer lorsque c'est possible, réduire le nombre d'octets critiques téléchargés et optimiser la longueur du chemin critique.

## Optimiser l'utilisation de JavaScript

Les ressources JavaScript bloquent l'analyseur par défaut, à moins d'être marquées comme _async_ ou ajoutées via un extrait de code JavaScript spécial. Le JavaScript bloquant l'analyseur force le navigateur à attendre le modèle CSSOM et interrompt la construction du DOM, ce qui peut à son tour retarder fortement le premier affichage.

### **Préférer les ressources JavaScript asynchrones**

Les ressources asynchrones débloquent l'analyseur du document et permettent au navigateur d'éviter le blocage sur le modèle CSSOM avant l'exécution du script. Souvent, s'il est possible de rendre le script asynchrone, cela signifie également qu'il n'est pas indispensable pour le premier affichage. Envisagez de charger les scripts asynchrones après le premier affichage.

### **Différer l'analyse de JavaScript**

Tous les scripts qui ne sont pas indispensables à la construction du contenu visible pour le premier affichage doivent être différés, afin de réduire la quantité de travail que le navigateur doit effectuer pour afficher la page.

### **Éviter les JavaScript avec une longue exécution**

Les blocs JavaScript s'exécutant sur le long terme empêchent le navigateur de construire les modèles DOM et CSSOM, et d'afficher la page. En conséquence, toute logique d'initialisation ou fonctionnalité non essentielle pour le premier affichage doit être remise à plus tard. Si une longue séquence d'initialisation doit être exécutée, envisagez de la diviser en plusieurs étapes pour permettre au navigateur de traiter les autres événements entre deux étapes.

## Optimiser l'utilisation du code CSS

Le code CSS est requis pour construire l'arborescence d'affichage, et le JavaScript se bloque souvent sur le code CSS lors de la construction initiale de la page. Vous devez vous assurer que tout code CSS non essentiel est marqué comme étant non critique (par exemple, les impressions et autres requêtes média), et que la quantité de code CSS critique et la durée nécessaire pour le fournir sont aussi faibles que possible.

### **Placer le code CSS dans l'en-tête du document**

Toutes les ressources CSS doivent être spécifiées le plus tôt possible dans le document HTML, afin que le navigateur puisse découvrir les balises `<link>` et envoyer la requête pour le code CSS aussi tôt que possible.

### **Éviter les importations de code CSS**

La directive CSS import (@import) permet à une feuille de style d'importer des règles depuis un autre fichier de feuille de style. Cependant, ces directives doivent être évitées, car elles introduisent des allers-retours supplémentaires dans le chemin critique : les ressources CSS importées sont découvertes seulement après que la feuille de style CSS avec la règle @import elle-même a été reçue et analysée.

### **Code CSS empêchant l'affichage intégré**

Pour de meilleures performances, vous pouvez envisager d'intégrer le code CSS critique directement dans le document HTML. Cela élimine les allers-retours supplémentaires dans le chemin critique, et si vous le faites correctement, cela peut être utilisé pour obtenir une longueur de chemin critique en `un aller-retour` dans laquelle seul le code HTML est une ressource bloquante.



