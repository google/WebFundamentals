---
title: "Souplesse d'adaptation du contenu"
description: "Le Web est accessible à un très large éventail d'appareils, depuis les téléphones équipés de petits écrans jusqu'aux téléviseurs au format XXL. Découvrez comment créer un site qui fonctionne parfaitement sur tous ces appareils."
key-takeaways:
  make-responsive:
    - "Toujours utiliser une fenêtre d'affichage."
    - "Toujours commencer par une fenêtre d'affichage étroite, puis la faire évoluer."
    - "Utiliser des points de rupture lorsqu'il s'avère nécessaire d'adapter le contenu."
    - "Créer une vision de haut niveau de votre disposition sur des points de rupture majeurs."
translators:
related-guides:
  responsive:
    -
      title: Définition de la fenêtre d'affichage
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Conception de sites Web adaptatifs"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Adapter le contenu à la taille de la fenêtre d'affichage
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Conception de sites Web adaptatifs"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Utiliser des requêtes média
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Conception de sites Web adaptatifs"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Agencements
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Agencements"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Disposition "Mostly Fluid"
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Conception de sites Web adaptatifs"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Améliorer les éléments `img` avec l'attribut `srcset` pour les écrans à haute densité de pixels"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Images"
        href: media/images/
    - 
      title: "Utiliser des requêtes média pour fournir des images haute résolution ou changer les images en fonction des caractéristiques de l'appareil ('art direction')"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Images"
        href: media/images/

notes:
  styling:
    - "Nous avons choisi un ensemble de styles comprenant des couleurs, un remplissage et un style de police correspondant aux consignes d'utilisation de notre marque."
  not-all-at-once:
    - "Il n'est pas nécessaire de déplacer tous les éléments en même temps. Vous pouvez, au besoin, effectuer des ajustements mineurs."
updated_on: 2014-04-23
---

<p class="intro">
  Le Web est accessible à un très large éventail d'appareils, depuis les téléphones équipés de petits écrans jusqu'aux téléviseurs au format XXL. Chaque appareil présente ses propres avantages et contraintes. En tant que développeur Web, vous êtes censé accepter toutes les gammes d'appareils.
</p>

{% include shared/toc.liquid %}

Le site que nous développons sera compatible avec plusieurs types d'appareil et tailles d'écran. Dans l'[article précédent]({{page.previousPage.relative_url}}), nous avons réalisé l'architecture d'information de la page et créé une structure de base.
Dans ce guide, nous allons utiliser notre structure de base avec du contenu et la transformer en une superbe page capable de s'adapter à un large éventail de formats d'écran.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Contenu">
    <figcaption>{% link_sample _code/content-without-styles.html %} Contenu et structure {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Site définitif {% endlink_sample %} </figcaption>
  </figure>
</div>

Conformément au principe de développement Web Mobile First, nous allons commencer par une fenêtre d'affichage étroite (semblable à celle d'un téléphone mobile) et nous concentrer sur ce format.
Nous évoluerons ensuite vers des appareils de plus grande taille.
Pour ce faire, nous pouvons élargir la fenêtre d'affichage, puis déterminer si la conception et la disposition sont appropriées.

Nous avons créé précédemment quelques conceptions de haut niveau relatives à l'affichage de notre contenu. Nous devons, à présent, faire en sorte que notre page s'adapte à ces dispositions.
Pour ce faire, il convient de déterminer l'emplacement des points de rupture, c'est-à-dire des points de changement de la disposition et des styles, sur la base de l'adaptation du contenu au format de l'écran.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Ajouter une Viewport

Même dans le cas d'une page de base, vous **devez** inclure une balise Meta Viewport.
La fenêtre d'affichage est un composant indispensable pour offrir du contenu adaptatif sur plusieurs appareils.
En l'absence de fenêtre d'affichage, votre site ne fonctionnera pas correctement sur un appareil mobile.

Cette fenêtre d'affichage indique au navigateur que la page doit être adaptée au format de l'écran. Vous pouvez spécifier de nombreuses configurations différentes pour que la fenêtre contrôle l'affichage de la page. Voici les configurations par défaut que nous recommandons :

{% include_code src=_code/viewport.html snippet=viewport %}

La fenêtre d'affichage réside dans l'en-tête du document et ne doit être déclarée qu'une seule fois.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Appliquer un style simple 

Des consignes très précises concernant l'utilisation des marques et des polices sont fournies dans un guide de style pour notre produit et notre société.

### Guide de style

Ce guide vous permet d'avoir une connaissance précise de la représentation visuelle de la page et garantit une parfaite cohérence pendant toute la phase de conception.

#### Couleurs

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Ajouter des images stylistiques 

Dans le guide précédent, nous avons ajouté des images dites de 'contenu'. Elles constituaient un élément important pour la description de notre produit. Les images stylistiques ne sont pas requises dans le contenu obligatoire, mais elles ajoutent une touche visuelle et permettent d'attirer l'attention de l'utilisateur sur un élément spécifique.

Une image de titre destinée à la partie au-dessus de la ligne de flottaison constitue un excellent exemple. Elle est souvent utilisée pour inciter les utilisateurs à en savoir plus sur le produit.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Site après conception">
</div>

L'intégration de ces images peut s'avérer relativement simple. Dans le cas présent, il s'agira de l'arrière-plan de l'en-tête et l'image sera appliquée au moyen d'une feuille de style CSS simple.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Nous avons choisi une image d'arrière-plan floue, qui ne dénature pas le contenu, et nous avons fait en sorte qu'elle 'recouvre' entièrement l'élément. Cela lui permet de s'étendre, tout en conservant le format d'image correct.

<br style="clear: both;">

## Réglez votre premier point de rupture

La conception commence à se dégrader visuellement à partir d'une largeur approximative de 600 pixels. Dans cet exemple, la longueur de la ligne est supérieure à 10 mots (soit la longueur de lecture optimale) et c'est là que nous voulons la modifier.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Désolé, votre navigateur n'accepte pas le contenu vidéo.
     <a href="videos/firstbreakpoint.mov">Téléchargez la vidéo</a>.
  </p>
</video>

'600 pixels' semble être la valeur idéale pour créer notre premier point de rupture. Cette valeur nous donne l'étendue nécessaire pour repositionner les éléments afin de mieux les adapter à l'écran. Pour ce faire, nous allons utiliser une technologie appelée [Requêtes média]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Il y a davantage d'espace sur un grand écran, ce qui se traduit par une souplesse accrue au niveau de l'affichage du contenu.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

S'agissant de notre page de produit, il convient de tenir compte de certaines exigences :

* Limiter la largeur maximale de la conception.
* Modifier le remplissage des éléments et réduire la taille du texte.
* Déplacer le formulaire pour qu'il flotte en mode intégré avec le contenu de l'en-tête.
* Faire en sorte que la vidéo flotte dans le contenu.
* Réduire la taille des images et les faire apparaître dans une plus belle grille.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Limiter la largeur maximale de la conception

Nous nous sommes limités à deux dispositions principales : une fenêtre d'affichage étroite et une autre large, ce qui facilite sensiblement la procédure de création.

Nous avons également choisi de créer, sur la fenêtre d'affichage étroite, des sections à fond perdu qui conservent cet attribut sur la fenêtre d'affichage large. Cela signifie que nous devrons limiter la largeur maximale de l'écran, de telle sorte que le texte et les paragraphes ne s'affichent pas sur une seule longue ligne sur les écrans extra-larges. Nous avons fixé ce point à environ 800 pixels.

Pour parvenir à ce résultat, nous devons limiter la largeur et centrer les éléments. Nous devons créer un conteneur autour de chaque section principale et appliquer un élément 'margin: auto'. De cette manière, l'écran pourra être étendu, mais le contenu restera centré sur une taille maximale de 800 pixels.

Le conteneur sera un simple élément `div` sous la forme suivante :

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## Modifier le remplissage et réduire la taille du texte

La fenêtre d'affichage étroite n'offre pas beaucoup d'espace pour afficher le contenu. C'est pourquoi la taille et la graisse des polices font souvent l'objet d'une réduction considérable pour pouvoir s'adapter à l'écran.

Dans le cas d'une fenêtre d'affichage plus grande, nous devons tenir compte du fait que l'utilisateur disposera probablement d'un écran de plus grande taille, mais aussi qu'il en sera plus éloigné. Pour améliorer la lisibilité du contenu, nous pouvons non seulement augmenter la taille et la graisse des polices, mais aussi modifier le remplissage afin de faire ressortir des zones spécifiques.

Dans notre page de produit, nous allons augmenter le remplissage des éléments de section pour qu'il reste sur une valeur équivalant à 5 % de la largeur. Nous allons également augmenter la taille des en-têtes de chacune des sections.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## Adapter les éléments à la fenêtre d'affichage large

La fenêtre d'affichage étroite était un affichage linéaire empilé. Chaque section principale, et son contenu, était affiché de haut en bas.

Une fenêtre d'affichage large donne davantage d'espace pour afficher le contenu de manière optimale pour cet écran. Dans le cas de notre page de produit, cela signifie que, conformément à notre architecture d'information, nous pouvons :

* déplacer le formulaire dans les informations d'en-tête ;
* positionner la vidéo à droite des points clés ;
* disposer les images en mosaïque ;
* étendre le tableau.

### Faire flotter l'élément Formulaire

La fenêtre d'affichage étroite nous offre beaucoup moins d'espace horizontal pour positionner convenablement les éléments sur l'écran.

Pour utiliser plus efficacement cet espace horizontal, il convient de fractionner le flux linéaire de l'en-tête, et de rapprocher le formulaire de la liste.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Désolé, votre navigateur n'accepte pas le contenu vidéo.
     <a href="videos/floatingform.mov">Téléchargez la vidéo</a>.
  </p>
</video>

### Faire flotter l'élément Vidéo

La vidéo présente dans l'interface de la fenêtre d'affichage étroite est conçue pour occuper toute la largeur de l'écran et être positionnée après la liste des fonctionnalités principales. Sur une fenêtre d'affichage large, la vidéo étendue sera trop grande et n'apparaîtra pas correctement lorsqu'elle sera positionnée à côté de la liste des fonctionnalités.

L'élément vidéo doit être éliminé du flux vertical de la fenêtre d'affichage étroite et affiché au côté de la liste à puces de contenu sur une fenêtre d'affichage large.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### Disposer les images en mosaïque

Les images de l'interface de la fenêtre d'affichage étroite (cela concerne principalement les appareils mobiles) sont définies pour occuper toute la largeur de l'écran et être empilées verticalement. Lorsqu'elles sont agrandies, ces images n'apparaissent pas correctement sur une fenêtre d'affichage large.

Pour remédier à ce problème, elles sont étendues à 30 % de la largeur du conteneur et disposées horizontalement (plutôt que verticalement dans la vue étroite). Nous allons également ajouter un arrondi de bordure et un effet d'ombrage pour rendre les images plus attrayantes.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### Faire en sorte que les images s'adaptent à la résolution (PPP)

Lors de l'utilisation d'images, il convient de tenir compte de la taille de la fenêtre d'affichage et de la densité de l'affichage.

Le Web a été conçu pour des écrans de 96 PPP.  L'avènement des appareils mobiles s'est accompagné d'une augmentation considérable de la densité en pixels des écrans, sans parler des écrans de type Retina qui équipent les portables. Aussi, les images codées en 96 PPP offrent-elles généralement un résultat visuel médiocre sur les appareils haute résolution.

Nous vous proposons une solution qui n'a pas encore été adoptée à grande échelle.
Pour les navigateurs compatibles, vous pouvez afficher une image en haute densité sur un écran du même type.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tableaux

Dans le cas des tableaux, il est difficile d'obtenir un bon résultat sur les appareils qui présentent une fenêtre d'affichage étroite. Ils doivent donc faire l'objet d'une attention particulière.

Il est conseillé de créer le tableau dans deux lignes, en transposant l'en-tête et les cellules dans une ligne afin de leur conférer une forme colonnaire.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Désolé, votre navigateur n'accepte pas le contenu vidéo.
     <a href="videos/responsivetable.mov">Téléchargez la vidéo</a>.
  </p>
</video>

Pour notre site, nous avons dû créer un point de rupture supplémentaire, destiné simplement au contenu du tableau.
Lorsque vous développez du contenu selon le principe Mobile First, il est plus difficile d'annuler les styles appliqués. Il faut donc séparer les feuilles de style du tableau de la fenêtre d'affichage étroite de celles de la fenêtre d'affichage large.
Cela permet de créer une séparation claire et cohérente.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Récapitulation

**FÉLICITATIONS.** Au moment où vous lirez ces lignes, vous aurez terminé la création de votre premier exemple de page de destination de produit compatible avec un large éventail d'appareils, de formats et de tailles d'écran.

Pour prendre un bon départ, suivez donc ces quelques consignes :

1. Créer une AI de base et comprendre le contenu avant de commencer le codage.
2. Toujours définir une fenêtre d'affichage.
3. Créer une expérience de base axée sur le principe de développement Mobile First.
4. Après avoir créé une expérience pour mobile, augmenter la largeur de l'affichage jusqu'à ce que la qualité visuelle se dégrade, puis définir le point de rupture à cet endroit.
5. Continuer à itérer.



