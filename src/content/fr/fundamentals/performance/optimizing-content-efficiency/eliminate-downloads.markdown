---
title: "Éliminer les téléchargements inutiles"
description: "La ressource la plus rapide et la mieux optimisée est une ressource qui n'est pas envoyée. Avez-vous audité vos ressources récemment ? Vous devez le faire régulièrement pour vous assurer que chaque ressource permet d'offrir une meilleure expérience à l'utilisateur."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Inventorier tous vos éléments et tous les éléments tiers sur vos pages"
    - "Mesurer les performances de chaque élément : sa valeur et ses performances techniques"
    - "Déterminer si les ressources offrent une valeur suffisante"
---

<p class="intro">
  La ressource la plus rapide et la mieux optimisée est une ressource qui n'est pas envoyée. Avez-vous audité vos ressources récemment ? Vous devez le faire régulièrement pour vous assurer que chaque ressource permet d'offrir une meilleure expérience à l'utilisateur.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

La ressource la plus rapide et la mieux optimisée est une ressource qui n'est pas envoyée. Cela peut sembler évident, mais en pratique, ce principe est trop souvent oublié : en tant que technicien en performances, il vous incombe de toujours garder un regard critique afin de saisir chaque opportunité d'éliminer les ressources inutiles de votre application. La remise en question et le réexamen périodique des suppositions implicites et explicites avec votre équipe font partie des bonnes pratiques. Quelques exemples :

* Nous avons toujours inclus la ressource X sur nos pages, mais le coût de son téléchargement et de son affichage est-il compensé par la valeur apportée à l'utilisateur ? Pouvons-nous mesurer et prouver sa valeur ?
* La ressource, en particulier s'il s'agit d'une ressource tierce, offre-t-elle des performances constantes ? La ressource se trouve-t-elle dans le chemin critique, ou a-t-elle besoin de s'y trouver ? Si la ressource se trouve dans le chemin critique, pourrait-elle constituer un point faible pour notre site ? C'est-à-dire que si la ressource n'est pas disponible, cela affecte-t-il l'expérience de nos pages pour l'utilisateur ?
* Cette ressource a-t-elle besoin ou dispose-t-elle d'un contrat de niveau de service ? Cette ressource respecte-t-elle les bonnes pratiques en matière de performances : compression, mise en cache, etc. ?

Nos pages contiennent trop souvent des ressources inutiles, ou pire, qui réduisent les performances de la page sans offrir beaucoup de valeur au visiteur ou au site sur lequel elles sont hébergées. Cela s'applique également aux ressources et widgets propriétaires et tiers :

* Le site A a décidé d'afficher un un carrousel de photos sur sa page d'accueil, pour permettre au visiteur de prévisualiser plusieurs photos en un clic. Toutes les photos sont chargées en même temps que la page, et l'utilisateur les fait défiler.
    * **Question** : Avez-vous calculé combien d'utilisateurs affichent plusieurs photos dans la galerie carrousel ? Vous pouvez augmenter de façon importante le temps système en téléchargeant des ressources inutiles que la plupart des visiteurs ne consultent jamais.
* Le site B a décidé d'installer un widget tiers pour afficher le contenu connexe, augmenter les interactions sociales ou fournir un autre service.
    * **Question** : Avez-vous contrôlé combien de visiteurs utilisent le widget ou cliquent pour accéder au contenu fourni par celui-ci ? Les interactions générées par ce widget sont-elles suffisantes pour justifier le temps système ?

Comme vous pouvez le voir, si le fait d'éliminer les téléchargements inutiles peut sembler sans intérêt, en pratique c'est tout le contraire, car cela demande souvent beaucoup de réflexion et de mesures pour prendre la décision adaptée. En fait, pour obtenir les meilleurs résultats possibles, vous devez inventorier et vous reposer ces questions régulièrement pour chaque élément sur vos pages.



