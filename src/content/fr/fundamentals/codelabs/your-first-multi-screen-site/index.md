project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Le Web est accessible à un très large éventail d'appareils, depuis les téléphones équipés de petits écrans jusqu'aux téléviseurs au format XXL. Découvrez comment créer un site qui fonctionne parfaitement sur tous ces appareils.

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Votre premier site multi-appareil {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



Concevoir du contenu adapté à plusieurs appareils est plus simple qu'il n'y paraît. Ce guide vous explique comment créer une page de destination de produit pour notre <a href='https://www.udacity.com/course/mobile-web-development--cs256'>Cours CS256 : Développement de contenu Web pour mobile</a> qui fonctionne parfaitement sur différents types d'appareil.

<img src="images/finaloutput-2x.jpg" alt="Affichage du projet fini sur plusieurs appareils">

Développer du contenu pour plusieurs appareils présentant des caractéristiques différentes, une grande variété de tailles d'écran et une multitude de méthodes d'interaction peut paraître intimidant, voire impossible.

Détrompez-vous ! Concevoir des sites Web parfaitement adaptatifs n'est pas aussi difficile qu'il n'y paraît. Pour vous le prouver, ce guide vous emmène à la découverte de la procédure à suivre pour y parvenir. Cette procédure se compose de deux étapes relativement simples :

1. Définition de l'architecture d'information (connue aussi sous le nom de AI) et de la structure de la page. 2. Ajout d'éléments de conception pour une souplesse d'adaptation optimale et un affichage de qualité sur tous les appareils.




## Créer vos propres contenu et structure 




Le contenu est l'élément le plus important d'un site. Il est donc essentiel de faire en sorte que le contenu ne soit pas dicté par les impératifs de conception. Dans ce guide, nous allons identifier le contenu prioritaire, créer une structure de page en fonction de ce contenu, puis présenter la page dans une disposition linéaire simple adaptée à la fois aux fenêtres d'affichage larges et étroites.


### Créer la structure de page

Nous avons identifié nos besoins :

1. Une zone qui décrit notre produit à un haut niveau 'CS256 : Cours de développement de contenu Web pour mobile'
2. Un formulaire pour rassembler des informations auprès des utilisateurs intéressés par notre produit
3. Une description détaillée et une vidéo
4. Des images du produit en action
5. Un tableau de données contenant des informations pour soutenir les réclamations

### TL;DR {: .hide-from-toc }
- Identifiez le contenu dont vous avez besoin en premier.
- Esquissez l'architecture d'information (AI) nécessaire pour les fenêtres d'affichage larges et étroites.
- Créez une vue schématique de la page avec le contenu, mais sans les styles.


Nous vous proposons également une disposition et une architecture d'information rudimentaires pour les fenêtres d'affichage larges et étroites.

<img class="attempt-left" src="images/narrowviewport.png" alt="Architecture d'information pour les fenêtres d'affichage étroites">
<img  class="attempt-right" src="images/wideviewport.png" alt="Architecture d'information pour les fenêtres d'affichage larges">
<div class="clearfix"></div>


Une conversion peut être effectuée facilement dans les sections rudimentaires d'une page schématique que nous utiliserons pour le reste de ce projet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### Ajouter du contenu à la page

La structure de base de ce site est terminée. Nous connaissons les sections dont nous avons besoin, le contenu à y afficher, ainsi que la position du contenu dans l'architecture d'information globale. Nous pouvons donc passer maintenant à la création du site.

Note: Style viendra plus tard 

#### Créer le titre et le formulaire

Le titre et le formulaire de notification de demande sont les composants essentiels de notre page. Ils doivent être présentés immédiatement à l'utilisateur.

Dans le titre, ajoutez simplement du texte pour décrire le cours :

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

Vous devez également compléter le formulaire.
Il s'agit d'un formulaire simple où sont renseignés les noms et numéros de téléphone des utilisateurs, ainsi que le meilleur moment pour les rappeler.

Des étiquettes et des espaces réservés doivent être associés à tous les formulaires pour permettre aux utilisateurs d'activer facilement des éléments et de comprendre ce qu'ils sont censés contenir, et aussi d'aider les outils d'accessibilité à comprendre la structure du formulaire. Outre l'envoi de la valeur de formulaire au serveur, l'attribut de nom est utilisé pour fournir au navigateur de précieuses indications sur la manière de compléter automatiquement ce formulaire.

Des types sémantiques seront ajoutés pour permettre aux utilisateurs de saisir, en un tournemain, du contenu sur un appareil mobile. Par exemple, lors de la saisie d'un numéro de téléphone, l'utilisateur doit simplement voir un clavier de numérotation.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Créer la section 'Vidéo et informations'

La section de contenu 'Vidéo et informations' sera un peu plus détaillée.
Elle contiendra une liste à puces des caractéristiques de nos produits, ainsi qu'un espace vidéo réservé présentant le produit en action.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

La vidéo est souvent utilisée pour décrire le contenu de manière plus interactive et pour faire la démonstration d'un produit ou concept.

L'application des bonnes pratiques vous permet d'intégrer aisément du contenu vidéo dans votre site :

* Ajoutez un attribut `controls` pour permettre une lecture facile de la vidéo.
* Ajoutez une image `poster` pour proposer aux utilisateurs un aperçu du contenu.
* Ajoutez plusieurs éléments `<source>` en fonction des formats vidéo acceptés.
* Ajoutez du texte de remplacement pour permettre aux utilisateurs de télécharger la vidéo s'il s'avère impossible de la lire dans la fenêtre.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video"   adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Créer la section 'Images'

Un site sans images peut être pour le moins ennuyeux. Il existe deux types d'images :

* Images de contenu : il s'agit d'images intégrées au document, utilisées pour véhiculer des informations supplémentaires sur le contenu.
* Images stylistiques : images utilisées pour embellir le site. Il s'agit généralement d'images d'arrière-plan, de motifs et de dégradés. Ces images seront traitées dans l'[article suivant](#).

La section 'Images' de notre page est un ensemble d'images de contenu.

Les images de contenu sont essentielles pour transmettre le sens de la page. On peut les comparer aux images utilisées dans des articles de journaux. Les images que nous utilisons sont les photos des formateurs du projet, à savoir : Chris Wilson, Peter Lubbers et Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

Les images sont définies sur une échelle de 100 % de la largeur de l'écran. Cela fonctionne très bien sur les appareils présentant une fenêtre d'affichage étroite, mais moins bien sur une fenêtre d'affichage large (un ordinateur de bureau, par exemple). Nous traiterons ce point dans la section relative à la conception de sites Web adaptatifs.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

De nombreux utilisateurs n'ont pas la possibilité d'afficher des images et ont souvent recours à une technologie assistive, telle qu'un lecteur d'écran qui analyse les données de la page et les leur transmet verbalement. Vous devez vous assurer que toutes vos images de contenu comportent une balise `alt` que le lecteur d'écran peut lire à l'utilisateur.

Lorsque vous ajoutez des balises `alt`, faites en sorte que le texte situé entre les balises soit aussi concis que possible pour décrire l'image en détail. Dans notre exemple de démonstration, l'attribut est simplement formaté en tant que `Name: Role`. Suffisamment d'informations sont présentées pour permettre à l'utilisateur de comprendre que cette section concerne les auteurs et leur fonction.

#### Ajouter la section 'Données tabulées'

La dernière section est un simple tableau utilisé pour afficher des statistiques spécifiques sur le produit.

Les tableaux ne doivent être utilisés que pour les données tabulaires, telles que des matrices d'information.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### Ajouter un pied de page

Sur la plupart des sites, un pied de page est nécessaire pour afficher du contenu tel que des conditions d'utilisation, des clauses de non-responsabilité, ou d'autres informations qui ne sont pas censées se trouver dans la zone de navigation principale ou la zone de contenu principale de la page.

Notre site comportera simplement des liens vers les conditions d'utilisation, une page 'Contact' et nos profils de médias sociaux.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### Résumé

Nous avons créé la structure du site et identifié tous les principaux éléments structuraux. Nous nous sommes également assurés que tout le contenu pertinent était prêt et disponible pour satisfaire nos besoins.

<img class="attempt-left" src="images/content.png" alt="Content">
<img  class="attempt-right" src="images/narrowsite.png" alt="">


Comme vous pouvez le constater, la page n'a pas fière allure. Ne vous inquiétez pas, c'est voulu ! 
Le contenu est l'élément le plus important d'un site, et nous devions nous assurer que nous disposions d'une densité et d'une architecture d'information robuste. Ce guide nous a donné un excellent point de départ. Dans le guide suivant, nous nous chargerons du style de contre contenu.





## Souplesse d'adaptation du contenu 




Le Web est accessible à un très large éventail d'appareils, depuis les téléphones équipés de petits écrans jusqu'aux téléviseurs au format XXL. Chaque appareil présente ses propres avantages et contraintes. En tant que développeur Web, vous êtes censé accepter toutes les gammes d'appareils.


Le site que nous développons sera compatible avec plusieurs types d'appareil et tailles d'écran. Dans l'[article précédent](#), nous avons réalisé l'architecture d'information de la page et créé une structure de base.
Dans ce guide, nous allons utiliser notre structure de base avec du contenu et la transformer en une superbe page capable de s'adapter à un large éventail de formats d'écran.

<figure class="attempt-left">
  <img  src="images/content.png" alt="Contenu">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Contenu et structure </a> </figcaption>
</figure>
<figure class="attempt-left">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Site définitif </a> </figcaption>
</figure>

Conformément au principe de développement Web Mobile First, nous allons commencer par une fenêtre d'affichage étroite (semblable à celle d'un téléphone mobile) et nous concentrer sur ce format.
Nous évoluerons ensuite vers des appareils de plus grande taille.
Pour ce faire, nous pouvons élargir la fenêtre d'affichage, puis déterminer si la conception et la disposition sont appropriées.

Nous avons créé précédemment quelques conceptions de haut niveau relatives à l'affichage de notre contenu. Nous devons, à présent, faire en sorte que notre page s'adapte à ces dispositions.
Pour ce faire, il convient de déterminer l'emplacement des points de rupture, c'est-à-dire des points de changement de la disposition et des styles, sur la base de l'adaptation du contenu au format de l'écran.

### TL;DR {: .hide-from-toc }
- Toujours utiliser une fenêtre d'affichage.
- Toujours commencer par une fenêtre d''affichage étroite, puis la faire évoluer.
- Utiliser des points de rupture lorsqu'il s'avère nécessaire d'adapter le contenu.
- Créer une vision de haut niveau de votre disposition sur des points de rupture majeurs.


### Ajouter une Viewport

Même dans le cas d'une page de base, vous **devez** inclure une balise Meta Viewport.
La fenêtre d'affichage est un composant indispensable pour offrir du contenu adaptatif sur plusieurs appareils.
En l'absence de fenêtre d'affichage, votre site ne fonctionnera pas correctement sur un appareil mobile.

Cette fenêtre d'affichage indique au navigateur que la page doit être adaptée au format de l'écran. Vous pouvez spécifier de nombreuses configurations différentes pour que la fenêtre contrôle l'affichage de la page. Voici les configurations par défaut que nous recommandons :

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

La fenêtre d'affichage réside dans l'en-tête du document et ne doit être déclarée qu'une seule fois.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Appliquer un style simple 

Des consignes très précises concernant l'utilisation des marques et des polices sont fournies dans un guide de style pour notre produit et notre société.

#### Guide de style

Ce guide vous permet d'avoir une connaissance précise de la représentation visuelle de la page et garantit une parfaite cohérence pendant toute la phase de conception.

##### Couleurs

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Ajouter des images stylistiques 

Dans le guide précédent, nous avons ajouté des images dites de 'contenu'. Elles constituaient un élément important pour la description de notre produit. Les images stylistiques ne sont pas requises dans le contenu obligatoire, mais elles ajoutent une touche visuelle et permettent d'attirer l'attention de l'utilisateur sur un élément spécifique.

Une image de titre destinée à la partie au-dessus de la ligne de flottaison constitue un excellent exemple. Elle est souvent utilisée pour inciter les utilisateurs à en savoir plus sur le produit.

<img  src="images/narrowsite.png" alt="Site après conception">


L'intégration de ces images peut s'avérer relativement simple. Dans le cas présent, il s'agira de l'arrière-plan de l'en-tête et l'image sera appliquée au moyen d'une feuille de style CSS simple.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Nous avons choisi une image d'arrière-plan floue, qui ne dénature pas le contenu, et nous avons fait en sorte qu'elle 'recouvre' entièrement l'élément. Cela lui permet de s'étendre, tout en conservant le format d'image correct.

<br style="clear: both;">

### Réglez votre premier point de rupture

La conception commence à se dégrader visuellement à partir d'une largeur approximative de 600 pixels. Dans cet exemple, la longueur de la ligne est supérieure à 10 mots (soit la longueur de lecture optimale) et c'est là que nous voulons la modifier.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Désolé, votre navigateur n'accepte pas le contenu vidéo.
     <a href="videos/firstbreakpoint.mov">Téléchargez la vidéo</a>.
  </p>
</video>

'600 pixels' semble être la valeur idéale pour créer notre premier point de rupture. Cette valeur nous donne l'étendue nécessaire pour repositionner les éléments afin de mieux les adapter à l'écran. Pour ce faire, nous allons utiliser une technologie appelée [Requêtes média](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Il y a davantage d'espace sur un grand écran, ce qui se traduit par une souplesse accrue au niveau de l'affichage du contenu.

Note: Il n'est pas nécessaire de déplacer tous les éléments en même temps. Vous pouvez, au besoin, effectuer des ajustements mineurs.

S'agissant de notre page de produit, il convient de tenir compte de certaines exigences :

* Limiter la largeur maximale de la conception.
* Modifier le remplissage des éléments et réduire la taille du texte.
* Déplacer le formulaire pour qu'il flotte en mode intégré avec le contenu de l'en-tête.
* Faire en sorte que la vidéo flotte dans le contenu.
* Réduire la taille des images et les faire apparaître dans une plus belle grille.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### Limiter la largeur maximale de la conception

Nous nous sommes limités à deux dispositions principales : une fenêtre d'affichage étroite et une autre large, ce qui facilite sensiblement la procédure de création.

Nous avons également choisi de créer, sur la fenêtre d'affichage étroite, des sections à fond perdu qui conservent cet attribut sur la fenêtre d'affichage large. Cela signifie que nous devrons limiter la largeur maximale de l'écran, de telle sorte que le texte et les paragraphes ne s'affichent pas sur une seule longue ligne sur les écrans extra-larges. Nous avons fixé ce point à environ 800 pixels.

Pour parvenir à ce résultat, nous devons limiter la largeur et centrer les éléments. Nous devons créer un conteneur autour de chaque section principale et appliquer un élément 'margin: auto'. De cette manière, l'écran pourra être étendu, mais le contenu restera centré sur une taille maximale de 800 pixels.

Le conteneur sera un simple élément `div` sous la forme suivante :

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### Modifier le remplissage et réduire la taille du texte

La fenêtre d'affichage étroite n'offre pas beaucoup d'espace pour afficher le contenu. C'est pourquoi la taille et la graisse des polices font souvent l'objet d'une réduction considérable pour pouvoir s'adapter à l'écran.

Dans le cas d'une fenêtre d'affichage plus grande, nous devons tenir compte du fait que l'utilisateur disposera probablement d'un écran de plus grande taille, mais aussi qu'il en sera plus éloigné. Pour améliorer la lisibilité du contenu, nous pouvons non seulement augmenter la taille et la graisse des polices, mais aussi modifier le remplissage afin de faire ressortir des zones spécifiques.

Dans notre page de produit, nous allons augmenter le remplissage des éléments de section pour qu'il reste sur une valeur équivalant à 5 % de la largeur. Nous allons également augmenter la taille des en-têtes de chacune des sections.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Adapter les éléments à la fenêtre d'affichage large

La fenêtre d'affichage étroite était un affichage linéaire empilé. Chaque section principale, et son contenu, était affiché de haut en bas.

Une fenêtre d'affichage large donne davantage d'espace pour afficher le contenu de manière optimale pour cet écran. Dans le cas de notre page de produit, cela signifie que, conformément à notre architecture d'information, nous pouvons :

* déplacer le formulaire dans les informations d'en-tête ;
* positionner la vidéo à droite des points clés ;
* disposer les images en mosaïque ;
* étendre le tableau.

#### Faire flotter l'élément Formulaire

La fenêtre d'affichage étroite nous offre beaucoup moins d'espace horizontal pour positionner convenablement les éléments sur l'écran.

Pour utiliser plus efficacement cet espace horizontal, il convient de fractionner le flux linéaire de l'en-tête, et de rapprocher le formulaire de la liste.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Désolé, votre navigateur n'accepte pas le contenu vidéo.
     <a href="videos/floatingform.mov">Téléchargez la vidéo</a>.
  </p>
</video>

#### Faire flotter l'élément Vidéo

La vidéo présente dans l'interface de la fenêtre d'affichage étroite est conçue pour occuper toute la largeur de l'écran et être positionnée après la liste des fonctionnalités principales. Sur une fenêtre d'affichage large, la vidéo étendue sera trop grande et n'apparaîtra pas correctement lorsqu'elle sera positionnée à côté de la liste des fonctionnalités.

L'élément vidéo doit être éliminé du flux vertical de la fenêtre d'affichage étroite et affiché au côté de la liste à puces de contenu sur une fenêtre d'affichage large.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### Disposer les images en mosaïque

Les images de l'interface de la fenêtre d'affichage étroite (cela concerne principalement les appareils mobiles) sont définies pour occuper toute la largeur de l'écran et être empilées verticalement. Lorsqu'elles sont agrandies, ces images n'apparaissent pas correctement sur une fenêtre d'affichage large.

Pour remédier à ce problème, elles sont étendues à 30 % de la largeur du conteneur et disposées horizontalement (plutôt que verticalement dans la vue étroite). Nous allons également ajouter un arrondi de bordure et un effet d'ombrage pour rendre les images plus attrayantes.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Faire en sorte que les images s'adaptent à la résolution (PPP)

Lors de l'utilisation d'images, il convient de tenir compte de la taille de la fenêtre d'affichage et de la densité de l'affichage.

Le Web a été conçu pour des écrans de 96 PPP.  L'avènement des appareils mobiles s'est accompagné d'une augmentation considérable de la densité en pixels des écrans, sans parler des écrans de type Retina qui équipent les portables. Aussi, les images codées en 96 PPP offrent-elles généralement un résultat visuel médiocre sur les appareils haute résolution.

Nous vous proposons une solution qui n'a pas encore été adoptée à grande échelle.
Pour les navigateurs compatibles, vous pouvez afficher une image en haute densité sur un écran du même type.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tableaux

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### Récapitulation

Note: Au moment où vous lirez ces lignes, vous aurez terminé la création de votre premier exemple de page de destination de produit compatible avec un large éventail d'appareils, de formats et de tailles d'écran.

Pour prendre un bon départ, suivez donc ces quelques consignes :

1. Créer une AI de base et comprendre le contenu avant de commencer le codage.
2. Toujours définir une fenêtre d'affichage.
3. Créer une expérience de base axée sur le principe de développement Mobile First.
4. Après avoir créé une expérience pour mobile, augmenter la largeur de l'affichage jusqu'à ce que la qualité visuelle se dégrade, puis définir le point de rupture à cet endroit.
5. Continuer à itérer.



