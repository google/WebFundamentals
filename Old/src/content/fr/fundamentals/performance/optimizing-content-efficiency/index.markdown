---
title: "Optimiser le contenu de façon efficace"
description: "La quantité de données téléchargée par chaque application ne cesse d'augmenter. Pour offrir d'excellentes performances, nous devons optimiser la livraison de chaque octet !"
updated_on: 2014-04-29
---

<p class="intro">
  Nos applications Web continuent de se développer en termes de portée, d'ambition et de fonctionnalité. Et c'est une bonne chose. Cependant, la course incessante vers un Web plus riche provoque une autre tendance : la quantité de données téléchargée par chaque application augmente sens cesse, rapidement. Pour offrir d'excellentes performances, nous devons optimiser la livraison de chaque octet de données !
</p>


À quoi ressemble une application Web moderne ? [HTTP Archive](http://httparchive.org/) peut nous aider à répondre à cette question. Ce projet suit la façon dont le Web se construit en arpentant régulièrement les sites les plus populaires (plus de 300 000, tirés de la liste Alexa Top 1M), et en enregistrant et en agrégeant des statistiques sur le nombre de ressources, les types de contenus et autres métadonnées pour chaque destination.

<img src="images/http-archive-trends.png" class="center" alt="Tendances HTTP Archive">

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th></th>
    <th>50e percentile</th>
    <th>75e percentile</th>
    <th>90e percentile</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 Ko</td>
  <td data-th="75%">26 Ko</td>
  <td data-th="90%">54 Ko</td>
</tr>
<tr>
  <td data-th="type">Images</td>
  <td data-th="50%">528 Ko</td>
  <td data-th="75%">1 213 Ko</td>
  <td data-th="90%">2 384 Ko</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 Ko</td>
  <td data-th="75%">385 Ko</td>
  <td data-th="90%">587 Ko</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 Ko</td>
  <td data-th="75%">53 Ko</td>
  <td data-th="90%">108 Ko</td>
</tr>
<tr>
  <td data-th="type">Autre</td>
  <td data-th="50%">282 Ko</td>
  <td data-th="75%">308 Ko</td>
  <td data-th="90%">353 Ko</td>
</tr>
<tr>
  <td data-th="type"><strong>Total</strong></td>
  <td data-th="50%"><strong>1 054 Ko</strong></td>
  <td data-th="75%"><strong>1 985 Ko</strong></td>
  <td data-th="90%"><strong>3 486 Ko</strong></td>
</tr>
</table>

Les données ci-dessus capturent la tendance de la croissance du nombre d'octets téléchargés pour les destinations populaires sur Internet entre janvier 2013 et janvier 2014. Bien sûr, tous les sites n'ont pas la même croissance, et ne nécessitent pas la même quantité de données. C'est pour cette raison que nous mettons en évidence les différents quantiles au sein de la distribution : 50e (médian), 75e et 90e.

Un site médian au début de l'année 2014 est composé de 75 requêtes pour un total de 1 054 Ko transférés, et le nombre total d'octets et de demandes n'a pas cessé d'augmenter rapidement au cours de l'année précédente. Cette information n'est pas surprenante en soit, mais elle a des implications importantes en termes de performances : oui, les vitesses d'Internet augmentent, mais elles augmentent à une vitesse différente selon les pays, et de nombreux utilisateurs sont encore soumis à des plafonds de données et à des forfaits mesurés et onéreux, en particulier sur les appareils mobiles.

Contrairement à leurs équivalents sur les ordinateurs de bureau, les applications Web ne nécessitent pas un processus d'installation distinct : saisissez l'URL et l'application est prête à l'emploi. C'est l'une des principales caractéristiques d'Internet. Cependant, pour y parvenir **nous devons souvent récupérer des dizaines, parfois même des centaines, de ressources différentes, ce qui peut représenter des mégaoctets de données, qui doivent être rassemblés en des centaines de millisecondes pour permettre l'expérience instantanée d'Internet que nous souhaitons offrir.**

À la lumière de ces exigences, obtenir une expérience instantanée d'Internet n'est pas une mince affaire. C'est pourquoi il est indispensable d'optimiser l'efficacité du contenu, en éliminant les téléchargements inutiles, en optimisant l'encodage du transfert de chaque ressource à l'aide de diverses techniques de compression et en utilisant la mise en cache chaque fois que c'est possible pour éliminer les téléchargements redondants.


