project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Par défaut, le code CSS est traité comme ressource empêchant l'affichage, ce qui signifie que le navigateur suspend l'affichage de tout contenu traité jusqu'à ce que le modèle CSSOM soit construit. Assurez-vous de conserver un code CSS simple, faites en sorte qu'il soit transmis le plus vite possible, et utilisez des types et requêtes de média pour débloquer l'affichage.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Code CSS empêchant l'affichage {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Par défaut, le code CSS est traité comme ressource empêchant l'affichage, ce qui signifie que le navigateur suspend l'affichage de tout contenu traité jusqu'à ce que le modèle CSSOM soit construit. Assurez-vous de conserver un code CSS simple, faites en sorte qu'il soit transmis le plus vite possible, et utilisez des types et requêtes de média pour débloquer l'affichage.

Dans la section précédente, nous avons vu que le chemin critique du rendu nécessite de disposer des modèles DOM et CSSOM pour construire l'arborescence d'affichage, ce qui crée une implication importante des performances : **Les balisages HTML et CSS sont des ressources empêchant l'affichage.** C'est évident pour le code HTML, puisque sans le modèle DOM nous n'aurions rien à afficher. Toutefois, cette exigence pour le code CSS peut être moins évidente. Que ce passerait-il si nous tentions d'afficher une page classique sans que le code CSS empêche l'affichage ?

### TL;DR {: .hide-from-toc }
- Par défaut, le code CSS est traité comme ressource empêchant l''affichage.
- Les types de média et les requêtes média nous permettent de marquer certaines ressources CSS comme n'empêchant pas l'affichage.
- Toutes les ressources CSS, qu''elles empêchent ou non l''affichage, sont téléchargées par le navigateur.


<figure class="attempt-left">
  <img src="images/nytimes-css-device.png" alt="NYTimes avec code CSS">
  <figcaption>NYTimes avec code CSS</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/nytimes-nocss-device.png" alt="NYTimes sans code CSS">
  <figcaption>NYTimes sans code CSS (FOUC)</figcaption>
</figure>
<div class="clearfix"></div>

L'exemple ci-dessus, montrant le site Web NYTimes avec et sans code CSS, démontre pourquoi l'affichage est bloqué jusqu'à ce que le code CSS soit disponible. En effet, sans code CSS, la page est inutilisable. En fait l'expérience de droite est souvent appelée FOUC ('Flash of Unstyled Content', soit 'Flash de contenu sans style'). En conséquence, le navigateur empêche l'affichage jusqu'à ce qu'il dispose à la fois du modèle DOM et du modèle CSSOM.

> **_CSS est une ressource empêchant l'affichage. Transmettez-la au client dès que possible pour optimiser la rapidité du premier affichage !_**

Mais que ce passe-t-il si nous disposons de styles CSS qui ne sont utilisés que dans certaines conditions, par exemple lorsque la page est imprimée ou projetée sur un grand écran ? Il serait agréable de ne pas avoir besoin d'empêcher l'affichage sur ces ressources !

Les 'types de média' et les 'requêtes média' du code CSS nous permettent de gérer ces situations :


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Une [requête média](/web/fundamentals/design-and-ux/responsive/#use-media-queries) se compose d'un type de média et de zéro expression ou plus qui vérifie les conditions de fonctionnalités de média particulières. Par exemple, notre première déclaration de feuille de style ne fournit aucun type ou requête de média. Elle s'applique donc dans tous les cas, c'est-à-dire qu'elle empêche toujours l'affichage. La deuxième feuille de style, quant à elle, ne s'applique que lorsque le contenu est imprimé (vous souhaitez peut-être modifier la mise en page, les polices, etc.). Par conséquent cette feuille de style n'a pas besoin d'empêcher l'affichage de la page lorsque celle-ci est chargée pour la première fois. Enfin, la dernière déclaration de feuille de style fournit une 'requête média' exécutée par le navigateur : si les conditions sont respectées, le navigateur empêche l'affichage jusqu'à ce que la feuille de style soit téléchargée et traitée.

L'utilisation de requêtes média permet d'adapter notre présentation à des utilisations spécifiques, telles que l'affichage plutôt que l'impression, mais également à des conditions dynamiques telles que la modification de l'orientation de l'écran, des événements de redimensionnement, etc. **Lorsque vous déclarez les éléments de votre feuille de style, soyez attentif au type et aux requêtes de média, car ils ont un impact significatif sur les performances du chemin critique du rendu.**

{# include shared/related_guides.liquid inline=true list=page.related-guides.media-queries #}

Prenons quelques exemples concrets :


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* La première déclaration empêche l'affichage et respecte toutes les conditions.
* La seconde déclaration empêche également l'affichage : 'all' est le type par défaut, et si vous ne précisez pas le type, il sera implicitement défini sur 'all'. La première et la deuxième déclaration sont donc en fait équivalentes.
* La troisième déclaration a une requête média dynamique qui sera évaluée lors du chargement de la page. En fonction de l'orientation de l'appareil lors du chargement de la page, portrait.css peut empêcher ou non l'affichage.
* La dernière déclaration n'est appliquée que lorsque la page est imprimée. Elle n'empêche donc pas l'affichage lors du premier chargement de la page dans le navigateur.

Enfin, notez que l'expression 'empêche l'affichage' ne fait référence qu'au fait que le navigateur doit suspendre l'affichage initial de la page sur cette ressource. Que la page soit affichée ou non, l'élément CSS est toujours téléchargé par le navigateur, bien que les ressources n'empêchant pas l'affichage ne soient pas prioritaires.



