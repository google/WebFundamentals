---
title: "Utiliser des requêtes média CSS pour la réactivité du contenu"
description: "La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - "Utilisez la balise Meta `viewport` pour contrôler la largeur et le dimensionnement de la fenêtre d'affichage du navigateur."
    - "Insérez le code <code>width=device-width</code> pour établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil."
    - "Insérez le code <code>initial-scale=1</code> pour établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l'appareil."
    - "Assurez-vous que l'accès à votre page est possible sans désactiver le redimensionnement utilisateur."
  size-content-to-vp:
    - "N'utilisez pas d'éléments de largeur fixe de grande taille."
    - "Ne liez pas le rendu correct du contenu à une largeur de fenêtre d'affichage spécifique."
    - "Utilisez des requêtes média CSS pour appliquer des styles différents aux grands et aux petits écrans."
  media-queries:
    - "Vous pouvez utiliser des requêtes média pour appliquer des styles en fonction des caractéristiques de l'appareil."
    - "Préférez <code>min-width</code> à <code>min-device-width</code> pour garantir la compatibilité la plus large possible."
    - "Attribuez des tailles relatives aux éléments pour éviter de fractionner la disposition."
  choose-breakpoints:
    - "Créez des points de rupture en fonction du contenu et jamais sur la base d'appareils, de produits ou de marques spécifiques."
    - "Concevez tout d'abord votre contenu pour l'appareil mobile le plus petit, puis améliorez progressivement l'expérience des visiteurs à mesure que la surface d'écran disponible augmente."
    - "Limitez la taille des lignes de texte à 70 ou 80 caractères."
notes:
  use-commas:
    - "Séparez les attributs à l'aide d'une virgule, afin de permettre une analyse correcte par les navigateurs plus anciens."
---
<p class="intro">
  Les requêtes média sont de simples filtres qui peuvent être appliqués à des styles CSS. Elles simplifient la modification des styles sur la base des caractéristiques de l'appareil qui affiche le contenu, y compris le type d'affichage, la largeur, la hauteur, l'orientation et même la résolution.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


Vous pouvez, par exemple, placer tous les styles nécessaires à l'impression dans une requête média d'impression :

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Outre l'utilisation de l'attribut `media` dans le lien de la feuille de style, deux autres méthodes permettent d'appliquer des requêtes média qui peuvent être intégrées dans un fichier CSS, à savoir : `@media` et `@import`. Pour des raisons de performances, il est préférable d'utiliser l'une des deux premières méthodes plutôt que la syntaxe `@import` (voir la section [Éviter les importations CSS]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

La logique appliquée aux requêtes média et les filtres ne sont pas mutuellement exclusifs. En effet, les filtres répondant aux critères du bloc CSS seront appliqués selon les règles de priorité pour CSS.

## Appliquer des requêtes média sur la base de la taille de la fenêtre d'affichage

Les requêtes média permettent de créer du contenu adaptatif, des styles spécifiques étant appliqués à tous les écrans, quelle que soit leur taille. La syntaxe de la requête média permet de créer des règles applicables en fonction des caractéristiques de l'appareil.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Bien que plusieurs éléments différents puissent faire l'objet de requêtes, ceux qui sont utilisés le plus souvent dans le cadre de la conception de sites Web adaptatifs sont `min-width`, `max-width`, `min-height` et 'max-height`.


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="attribut">attribut</th>
      <th data-th="Résultat">Résultat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribut"><code>min-width</code></td>
      <td data-th="Résultat">Règles appliquées pour toute largeur de navigateur supérieure à la valeur définie dans la requête.</td>
    </tr>
    <tr>
      <td data-th="attribut"><code>max-width</code></td>
      <td data-th="Résultat">Règles appliquées pour toute largeur de navigateur inférieure à la valeur définie dans la requête.</td>
    </tr>
    <tr>
      <td data-th="attribut"><code>min-height</code></td>
      <td data-th="Résultat">Règles appliquées pour toute hauteur de navigateur supérieure à la valeur définie dans la requête.</td>
    </tr>
    <tr>
      <td data-th="attribut"><code>max-height</code></td>
      <td data-th="Résultat">Règles appliquées pour toute hauteur de navigateur inférieure à la valeur définie dans la requête.</td>
    </tr>
    <tr>
      <td data-th="attribut"><code>orientation=portrait</code></td>
      <td data-th="Résultat">Règles appliquées à tout navigateur dont la hauteur est supérieure ou égale à la largeur.</td>
    </tr>
    <tr>
      <td data-th="attribut"><code>orientation=landscape</code></td>
      <td data-th="Résultat">Règles appliquées à tout navigateur dont la largeur est supérieure à la hauteur.</td>
    </tr>
  </tbody>
</table>

Prenons un exemple :

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Aperçu d'une page qui utilise des requêtes média pour modifier des propriétés lors du redimensionnement.">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* Lorsque la largeur du navigateur est comprise entre <b>0 pixel</b> et <b>640 pixels</b>, `max-640px.css` est appliqué.
* Lorsque la largeur du navigateur est comprise entre <b>500 pixels</b> et <b>600 pixels</b>, les styles situés dans `@media` sont appliqués.
* Lorsque la largeur du navigateur est <b>supérieure ou égale à 640 pixels</b>, `min-640px.css` est appliqué.
* Lorsque la <b>largeur du navigateur est supérieure à sa hauteur</b>, `landscape.css` est appliqué.
* Lorsque la <b>hauteur du navigateur est supérieure à sa largeur</b>, `portrait.css` est appliqué.


## Remarque concernant `min-device-width`

Il est également possible de créer des requêtes sur la base de `*-device-width`, bien que cette pratique soit **fortement déconseillée**.

La différence est subtile, mais elle revêt une importance majeure : `min-width` est basé sur la taille de la fenêtre du navigateur, tandis que `min-device-width` est basé sur la taille de l'écran. Malheureusement, il se peut que certains navigateurs, dont l'ancienne version du navigateur Android, ne signalent pas correctement la largeur de l'appareil et relèvent, à la place, la taille d'écran en pixels plutôt que la largeur attendue de la fenêtre d'affichage.

En outre, l'utilisation de `*-device-width` peut empêcher l'adaptation du contenu sur des ordinateurs de bureau ou d'autres appareils autorisant le redimensionnement de fenêtres, car la requête repose sur la taille réelle de l'appareil, et non sur celle de la fenêtre du navigateur.

## Utiliser des unités relatives

La fluidité et la proportionnalité, par opposition aux dispositions de largeur fixe, constituent un concept essentiel dans le cadre de la conception de sites Web adaptatifs. L'utilisation d'unités de mesure relatives permet de simplifier les dispositions et d'éviter la création accidentelle de composants trop grands pour la fenêtre d'affichage.

Par exemple, en définissant la valeur `width: 100%` sur un élément `div` de niveau supérieur, vous avez la garantie qu'il couvre la largeur de la fenêtre d'affichage et qu'il est toujours adapté à cette dernière. L'élément `div` convient, qu'il s'agisse d'un iPhone d'une largeur de 320 pixels, d'un Blackberry Z10 d'une largeur de 342 pixels ou d'un Nexus 5 d'une largeur de 360 pixels.

De plus, l'utilisation d'unités relatives permet aux navigateurs d'afficher le contenu sur la base du niveau de zoom des utilisateurs, sans qu'il faille ajouter de barres de défilement horizontal à la page.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



