---
title: "Choisir des points de rupture"
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
  S'il peut être utile de définir des points de rupture en fonction des catégories d'appareils, nous vous invitons néanmoins à faire preuve de prudence. Procéder de la sorte en fonction d'appareils, de produits, de marques ou de systèmes d'exploitation spécifiques peut, en effet, devenir un cauchemar sur le plan de la maintenance. C'est plutôt le contenu qui devrait déterminer comment adapter la disposition à son conteneur.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Choisir les points de rupture principaux en commençant par les écrans de petite taille

Concevez le contenu pour qu'il s'adapte d'abord aux écrans de petite taille, puis élargissez l'écran jusqu'à ce qu'un point de rupture soit nécessaire. Cela vous permettra d'optimiser les points de rupture en fonction du contenu et de maintenir leur nombre à un niveau minimum.

Examinons l'exemple de [prévision météorologique]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html) que nous avons utilisé au début du cours.
La première étape consiste à soigner la présentation des prévisions sur un petit écran.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Aperçu des prévisions météorologiques sur un petit écran.">
  {% endlink_sample %}
</figure>

Redimensionnez ensuite le navigateur jusqu'à ce qu'il y ait trop d'espace entre les éléments et que la qualité d'affichage des prévisions ne soit plus optimale. Cette décision est subjective, mais considérez qu'au-delà de 600 pixels, la largeur limite a été atteinte .

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Aperçu des prévisions météorologiques à mesure que la page est agrandie.">
  {% endlink_sample %}
</figure>

Pour insérer un point de rupture à 600 pixels, créez deux feuilles de style ; l'une à utiliser lorsque la taille du navigateur est inférieure ou égale à 600 pixels, et l'autre pour une taille supérieure à 600 pixels.

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Pour terminer, restructurez la feuille de style en cascade (CSS). Dans cet exemple, les styles courants, tels que les polices, les icônes, les couleurs et le positionnement de base, ont été placés dans le fichier 'weather.css'. Les dispositions spécifiques relatives au petit écran sont ensuite placées dans le fichier 'weather-small.css', tandis que les styles pour grand écran sont placés dans 'weather-large.css'.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Choisir des points de rupture mineurs lorsque cela s'avère nécessaire

Outre la sélection de points de rupture majeurs lors de modifications importantes de la disposition, il convient de tenir compte des changements mineurs. Par exemple, entre deux points de rupture majeurs, il peut s'avérer utile d'ajuster les marges ou le remplissage sur un élément, ou d'augmenter la taille de police pour offrir un rendu plus naturel dans la disposition.

Commençons par optimiser la disposition du petit écran. Dans ce cas, nous allons augmenter la taille de police lorsque la largeur de la fenêtre d'affichage est supérieure à 360 pixels. Ensuite, s'il y a suffisamment d'espace, nous pouvons séparer les températures maximale et minimale, de sorte qu'elles se trouvent sur la même ligne, au lieu d'être affichées l'une au-dessus de l'autre. Nous allons également agrandir légèrement les icônes illustrant les conditions météo.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

De même, dans le cas des écrans de grande taille, il est préférable de limiter la largeur maximale du panneau de prévision, de telle sorte qu'il n'occupe pas tout l'écran.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## Optimiser le texte pour la lecture

Si l'on se base sur la théorie de lisibilité standard, la colonne idéale doit contenir entre 70 et 80 caractères par ligne (soit entre 8 et 10 mots en anglais). Dès lors, chaque fois que la largeur d'un bloc de texte augmente d'environ 10 mots, l'utilisation d'un point de rupture doit être envisagée.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Avant d'ajouter des points de rupture mineurs">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Après avoir ajouté des points de rupture mineurs">
  </div>
</div>

Examinons de plus près l'article de blog ci-dessus.  Sur les écrans plus petits, l'utilisation de la police Roboto avec une taille de 1 em fonctionne parfaitement et génère 10 mots par ligne. Cependant, un point de rupture est nécessaire sur les écrans plus grands. Dans ce cas, si la largeur du navigateur est supérieure à 575 pixels, la largeur idéale du contenu est de 550 pixels.

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Ne jamais masquer complètement le contenu

Soyez prudent lors de la sélection du contenu à masquer ou afficher en fonction de la taille d'écran.
Ne masquez pas le contenu pour la simple raison qu'il ne tient pas sur l'écran. La taille d'écran ne permet pas de préjuger des besoins réels d'un utilisateur. Ainsi, supprimer la densité pollinique de la prévision météo peut constituer un problème majeur pour les personnes souffrant de ce type d'allergie et qui ont besoin de cette information.




