project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Principes de base de la conception de sites Web adaptatifs {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


L'utilisation d'appareils mobiles pour naviguer sur le Web connaît un développement phénoménal. Malheureusement, force est de constater que la majeure partie du Web n'est pas optimisée pour les terminaux de ce type. Les appareils mobiles sont souvent limités par la taille d'affichage et une approche différente s'avère nécessaire quant à la disposition du contenu à l'écran.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


{% include "web/_shared/udacity/ud893.html" %}




Téléphones, "phablettes", tablettes, ordinateurs, consoles de jeu, téléviseurs et même accessoires connectés, il existe aujourd'hui une multitude de tailles d'écran différentes. Dans ce domaine, le changement est la norme. Il est donc important que votre site puisse s'adapter à tous les formats, que ce soit aujourd'hui ou demain.


  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>


La conception de sites web adaptatifs (ou RWD, Responsive Web Design, en anglais), est un concept défini à l'origine par [Ethan Marcotte dans 'A List Apart'](http://alistapart.com/article/responsive-web-design/){: .external }. Ce concept répond aux besoins des utilisateurs et des appareils qu'ils utilisent. La disposition change en fonction de la taille et des fonctionnalités de l'appareil. Sur un téléphone, par exemple, le contenu s'affichera dans une seule colonne, alors qu'il apparaîtra dans deux colonnes sur une tablette.


## Définir la fenêtre d'affichage 

Dans le cas des pages optimisées pour un large éventail d'appareils, l'en-tête du document doit contenir un élément Meta Viewport. La balise Meta Viewport indique au navigateur comment contrôler les dimensions et la mise à l'échelle de la page.




### TL;DR {: .hide-from-toc }
- Utilisez la balise Meta `viewport` pour contrôler la largeur et le dimensionnement de la fenêtre d'affichage du navigateur.
- Insérez le code <code>width=device-width</code> pour établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil.
- Insérez le code <code>initial-scale=1</code> pour établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l'appareil.
- Assurez-vous que l'accès à votre page est possible sans désactiver le redimensionnement utilisateur.


Pour offrir aux internautes une expérience optimale, les navigateurs mobiles affichent la page avec la largeur d'écran d'un ordinateur de bureau (soit généralement 980 pixels, mais cela varie en fonction des appareils). Ils essaient ensuite d'améliorer la qualité visuelle en augmentant la taille des polices et en dimensionnant le contenu pour qu'il s'adapte à la taille de l'écran. Pour l'utilisateur, cela se traduit par un affichage irrégulier de la taille des polices et la nécessité de devoir appuyer deux fois ou pincer pour zoomer pour afficher le contenu et interagir avec celui-ci.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


La valeur Meta `width=device-width` de fenêtre d'affichage indique à la page d'établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil. Cela permet à la page d'ajuster le contenu selon différentes tailles d'écran, qu'il soit affiché sur un petit smartphone ou sur un grand écran d'ordinateur.

<img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page sans fenêtre d'affichage">
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page sur laquelle une fenêtre d'affichage est définie">
<div class="clearfix"></div>


Certains navigateurs conservent une largeur de page constante lors de la rotation du contenu en mode paysage et préfèrent le zoom à l'ajustement de la mise en page pour occuper tout l'écran. L'ajout de l'attribut `initial-scale=1` indique au navigateur d'établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l'appareil, quelle que soit l'orientation de ce dernier, et permet à la page de tirer parti de toute la largeur de l'écran en mode paysage.

Note: Séparez les attributs à l'aide d'une virgule, afin de permettre une analyse correcte par les navigateurs plus anciens.

### Garantir l'accessibilité de la fenêtre d'affichage

Outre l'attribut `initial-scale`, vous pouvez définir les attributs suivants sur la fenêtre d'affichage :

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Une fois ces attributs définis, il se peut que l'utilisateur ne soit plus en mesure de zoomer sur la fenêtre d'affichage, ce qui peut entraîner des problèmes d'accessibilité.


## Adapter le contenu à la taille de la fenêtre d'affichage 


Le défilement est devenu un geste naturel pour l'utilisateur, que ce soit sur l'écran d'un ordinateur de bureau ou d'un appareil mobile. Aussi, l'obliger à faire défiler la page horizontalement ou à effectuer un zoom arrière pour afficher toute la page dégrade sérieusement son confort d'utilisation.


### TL;DR {: .hide-from-toc }
- N'utilisez pas d'éléments de largeur fixe de grande taille.
- Ne liez pas le rendu correct du contenu à une largeur de fenêtre d'affichage spécifique.
- Utilisez des requêtes média CSS pour appliquer des styles différents aux grands et aux petits écrans.


Lorsque vous développez un site pour mobile avec une balise `meta viewport`, il est facile de créer accidentellement du contenu qui n'est pas parfaitement adapté à la fenêtre d'affichage spécifiée. Par exemple, si une image est affichée avec une largeur supérieure à celle de la fenêtre d'affichage, il se peut que cette dernière défile horizontalement. Vous devez ajuster ce contenu à la largeur de la fenêtre d'affichage, de sorte que l'utilisateur ne doive pas faire défiler la page horizontalement.

Dans la mesure où les dimensions et la largeur de l'écran, exprimées en pixels CSS, varient sensiblement d'un appareil à un autre (que ce soit entre des smartphones et des tablettes, voire entre différents smartphones), la largeur de la fenêtre d'affichage ne doit pas constituer le critère de rendu.

Si vous définissez une largeur CSS absolue élevée pour des éléments de page (comme dans l'exemple ci-dessous), la valeur `div` sera trop large pour la fenêtre d'affichage sur un appareil plus étroit (c'est le cas, par exemple, d'un appareil ayant une largeur de 320 pixels CSS, comme un iPhone). Optez plutôt pour des valeurs de largeur relatives, comme `width: 100%`. Prenez également garde aux valeurs de positionnement absolues élevées, susceptibles de rejeter l'élément hors de la fenêtre d'affichage sur des écrans de petite taille.

<img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page avec un élément de largeur fixe de 344 pixels sur un iPhone." class="attempt-left">
<img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page avec un élément de largeur fixe de 344 pixels sur un Nexus 5." class="attempt-right">


## Utiliser des requêtes média CSS pour la réactivité du contenu 


Les requêtes média sont de simples filtres qui peuvent être appliqués à des styles CSS. Elles simplifient la modification des styles sur la base des caractéristiques de l'appareil qui affiche le contenu, y compris le type d'affichage, la largeur, la hauteur, l'orientation et même la résolution.




### TL;DR {: .hide-from-toc }
- Vous pouvez utiliser des requêtes média pour appliquer des styles en fonction des caractéristiques de l'appareil.
- Préférez <code>min-width</code> à <code>min-device-width</code> pour garantir la compatibilité la plus large possible.
- Attribuez des tailles relatives aux éléments pour éviter de fractionner la disposition.



Vous pouvez, par exemple, placer tous les styles nécessaires à l'impression dans une requête média d'impression :


    <link rel="stylesheet" href="print.css" media="print">
    

Outre l'utilisation de l'attribut `media` dans le lien de la feuille de style, deux autres méthodes permettent d'appliquer des requêtes média qui peuvent être intégrées dans un fichier CSS, à savoir : `@media` et `@import`. Pour des raisons de performances, il est préférable d'utiliser l'une des deux premières méthodes plutôt que la syntaxe `@import` (voir la section [Éviter les importations CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

La logique appliquée aux requêtes média et les filtres ne sont pas mutuellement exclusifs. En effet, les filtres répondant aux critères du bloc CSS seront appliqués selon les règles de priorité pour CSS.

### Appliquer des requêtes média sur la base de la taille de la fenêtre d'affichage

Les requêtes média permettent de créer du contenu adaptatif, des styles spécifiques étant appliqués à tous les écrans, quelle que soit leur taille. La syntaxe de la requête média permet de créer des règles applicables en fonction des caractéristiques de l'appareil.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Bien que plusieurs éléments différents puissent faire l'objet de requêtes, ceux qui sont utilisés le plus souvent dans le cadre de la conception de sites Web adaptatifs sont `min-width`, `max-width`, `min-height` et 'max-height`.


<table>
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

<img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Aperçu d'une page qui utilise des requêtes média pour modifier des propriétés lors du redimensionnement.">


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* Lorsque la largeur du navigateur est comprise entre <b>0 pixel</b> et <b>640 pixels</b>, `max-640px.css` est appliqué.
* Lorsque la largeur du navigateur est comprise entre <b>500 pixels</b> et <b>600 pixels</b>, les styles situés dans `@media` sont appliqués.
* Lorsque la largeur du navigateur est <b>supérieure ou égale à 640 pixels</b>, `min-640px.css` est appliqué.
* Lorsque la <b>largeur du navigateur est supérieure à sa hauteur</b>, `landscape.css` est appliqué.
* Lorsque la <b>hauteur du navigateur est supérieure à sa largeur</b>, `portrait.css` est appliqué.


### Remarque concernant `min-device-width`

Il est également possible de créer des requêtes sur la base de `*-device-width`, bien que cette pratique soit **fortement déconseillée**.

La différence est subtile, mais elle revêt une importance majeure : `min-width` est basé sur la taille de la fenêtre du navigateur, tandis que `min-device-width` est basé sur la taille de l'écran. Malheureusement, il se peut que certains navigateurs, dont l'ancienne version du navigateur Android, ne signalent pas correctement la largeur de l'appareil et relèvent, à la place, la taille d'écran en pixels plutôt que la largeur attendue de la fenêtre d'affichage.

En outre, l'utilisation de `*-device-width` peut empêcher l'adaptation du contenu sur des ordinateurs de bureau ou d'autres appareils autorisant le redimensionnement de fenêtres, car la requête repose sur la taille réelle de l'appareil, et non sur celle de la fenêtre du navigateur.

### Utiliser des unités relatives

La fluidité et la proportionnalité, par opposition aux dispositions de largeur fixe, constituent un concept essentiel dans le cadre de la conception de sites Web adaptatifs. L'utilisation d'unités de mesure relatives permet de simplifier les dispositions et d'éviter la création accidentelle de composants trop grands pour la fenêtre d'affichage.

Par exemple, en définissant la valeur `width: 100%` sur un élément `div` de niveau supérieur, vous avez la garantie qu'il couvre la largeur de la fenêtre d'affichage et qu'il est toujours adapté à cette dernière. L'élément `div` convient, qu'il s'agisse d'un iPhone d'une largeur de 320 pixels, d'un Blackberry Z10 d'une largeur de 342 pixels ou d'un Nexus 5 d'une largeur de 360 pixels.

De plus, l'utilisation d'unités relatives permet aux navigateurs d'afficher le contenu sur la base du niveau de zoom des utilisateurs, sans qu'il faille ajouter de barres de défilement horizontal à la page.

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }



## Choisir des points de rupture 


S'il peut être utile de définir des points de rupture en fonction des catégories d'appareils, nous vous invitons néanmoins à faire preuve de prudence. Procéder de la sorte en fonction d'appareils, de produits, de marques ou de systèmes d'exploitation spécifiques peut, en effet, devenir un cauchemar sur le plan de la maintenance. C'est plutôt le contenu qui devrait déterminer comment adapter la disposition à son conteneur.



### TL;DR {: .hide-from-toc }
- Créez des points de rupture en fonction du contenu et jamais sur la base d''appareils, de produits ou de marques spécifiques.
- Concevez tout d'abord votre contenu pour l'appareil mobile le plus petit, puis améliorez progressivement l'expérience des visiteurs à mesure que la surface d'écran disponible augmente.
- Limitez la taille des lignes de texte à 70 ou 80 caractères.


### Choisir les points de rupture principaux en commençant par les écrans de petite taille

Concevez le contenu pour qu'il s'adapte d'abord aux écrans de petite taille, puis élargissez l'écran jusqu'à ce qu'un point de rupture soit nécessaire. Cela vous permettra d'optimiser les points de rupture en fonction du contenu et de maintenir leur nombre à un niveau minimum.

Examinons l'exemple de [prévision météorologique](/web/fundamentals/design-and-ux/responsive/) que nous avons utilisé au début du cours.
La première étape consiste à soigner la présentation des prévisions sur un petit écran.

<img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Aperçu des prévisions météorologiques sur un petit écran.">


Redimensionnez ensuite le navigateur jusqu'à ce qu'il y ait trop d'espace entre les éléments et que la qualité d'affichage des prévisions ne soit plus optimale. Cette décision est subjective, mais considérez qu'au-delà de 600 pixels, la largeur limite a été atteinte .

<img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Aperçu des prévisions météorologiques à mesure que la page est agrandie.">


Pour insérer un point de rupture à 600 pixels, créez deux feuilles de style ; l'une à utiliser lorsque la taille du navigateur est inférieure ou égale à 600 pixels, et l'autre pour une taille supérieure à 600 pixels.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

Pour terminer, restructurez la feuille de style en cascade (CSS). Dans cet exemple, les styles courants, tels que les polices, les icônes, les couleurs et le positionnement de base, ont été placés dans le fichier 'weather.css'. Les dispositions spécifiques relatives au petit écran sont ensuite placées dans le fichier 'weather-small.css', tandis que les styles pour grand écran sont placés dans 'weather-large.css'.

<img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">

### Choisir des points de rupture mineurs lorsque cela s'avère nécessaire

Outre la sélection de points de rupture majeurs lors de modifications importantes de la disposition, il convient de tenir compte des changements mineurs. Par exemple, entre deux points de rupture majeurs, il peut s'avérer utile d'ajuster les marges ou le remplissage sur un élément, ou d'augmenter la taille de police pour offrir un rendu plus naturel dans la disposition.

Commençons par optimiser la disposition du petit écran. Dans ce cas, nous allons augmenter la taille de police lorsque la largeur de la fenêtre d'affichage est supérieure à 360 pixels. Ensuite, s'il y a suffisamment d'espace, nous pouvons séparer les températures maximale et minimale, de sorte qu'elles se trouvent sur la même ligne, au lieu d'être affichées l'une au-dessus de l'autre. Nous allons également agrandir légèrement les icônes illustrant les conditions météo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints." class="attempt-left">
<img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints." class="attempt-right">

<div class="clearfix"></div>


De même, dans le cas des écrans de grande taille, il est préférable de limiter la largeur maximale du panneau de prévision, de telle sorte qu'il n'occupe pas tout l'écran.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### Optimiser le texte pour la lecture

Si l'on se base sur la théorie de lisibilité standard, la colonne idéale doit contenir entre 70 et 80 caractères par ligne (soit entre 8 et 10 mots en anglais). Dès lors, chaque fois que la largeur d'un bloc de texte augmente d'environ 10 mots, l'utilisation d'un point de rupture doit être envisagée.

<img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Avant d'ajouter des points de rupture mineurs" class="attempt-left">
<img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Après avoir ajouté des points de rupture mineurs" class="attempt-right">
<div class="clearfix"></div>


Examinons de plus près l'article de blog ci-dessus.  Sur les écrans plus petits, l'utilisation de la police Roboto avec une taille de 1 em fonctionne parfaitement et génère 10 mots par ligne. Cependant, un point de rupture est nécessaire sur les écrans plus grands. Dans ce cas, si la largeur du navigateur est supérieure à 575 pixels, la largeur idéale du contenu est de 550 pixels.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### Ne jamais masquer complètement le contenu

Soyez prudent lors de la sélection du contenu à masquer ou afficher en fonction de la taille d'écran.
Ne masquez pas le contenu pour la simple raison qu'il ne tient pas sur l'écran. La taille d'écran ne permet pas de préjuger des besoins réels d'un utilisateur. Ainsi, supprimer la densité pollinique de la prévision météo peut constituer un problème majeur pour les personnes souffrant de ce type d'allergie et qui ont besoin de cette information.
