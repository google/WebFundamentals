---
title: "Créer vos propres contenu et structure"
description: "Le contenu est l'élément le plus important d'un site. Ce guide vous explique comment planifier rapidement la création de votre premier site multi-appareil."
notes:
  styling:
    - "Style viendra plus tard "
updated_on: 2014-04-23
related-guides:
  create-amazing-forms:
    -
      title: Créer de superbes formulaires
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Formulaires"
        href: fundamentals/input/form/
    -
      title: Étiqueter et nommer correctement des entrées
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Formulaires"
        href: fundamentals/input/form/
    -
      title: Choisir le meilleur type d'entrée
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Formulaires"
        href: fundamentals/input/form/
  video:
    -
      title: Utiliser efficacement la vidéo
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Vidéo"
        href: fundamentals/media/
    -
      title: Modifier la position de départ
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Vidéo"
        href: fundamentals/media/
    -
      title: Inclure une image poster
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Vidéo"
        href: fundamentals/media/
  images:
    -
      title: Utiliser efficacement des images
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title:  Utilisation correcte des images dans le balisage
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title: Optimisation d'images
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
key-takeaways:
  content-critical:
    - "Identifiez le contenu dont vous avez besoin en premier."
    - "Esquissez l'architecture d'information (AI) nécessaire pour les fenêtres d'affichage larges et étroites."
    - "Créez une vue schématique de la page avec le contenu, mais sans les styles."
---

<p class="intro">
   Le contenu est l'élément le plus important d'un site. Il est donc essentiel de faire en sorte que le contenu ne soit pas dicté par les impératifs de conception. Dans ce guide, nous allons identifier le contenu prioritaire, créer une structure de page en fonction de ce contenu, puis présenter la page dans une disposition linéaire simple adaptée à la fois aux fenêtres d'affichage larges et étroites.
</p>

{% include shared/toc.liquid %}

## Créer la structure de page

Nous avons identifié nos besoins :

1. Une zone qui décrit notre produit à un haut niveau 'CS256 : Cours de développement de contenu Web pour mobile'
2. Un formulaire pour rassembler des informations auprès des utilisateurs intéressés par notre produit
3. Une description détaillée et une vidéo
4. Des images du produit en action
5. Un tableau de données contenant des informations pour soutenir les réclamations

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Nous vous proposons également une disposition et une architecture d'information rudimentaires pour les fenêtres d'affichage larges et étroites.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Architecture d'information pour les fenêtres d'affichage étroites">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Architecture d'information pour les fenêtres d'affichage larges">
</div>

Une conversion peut être effectuée facilement dans les sections rudimentaires d'une page schématique que nous utiliserons pour le reste de ce projet.

{% include_code src=_code/addstructure.html snippet=structure %}

## Ajouter du contenu à la page

La structure de base de ce site est terminée. Nous connaissons les sections dont nous avons besoin, le contenu à y afficher, ainsi que la position du contenu dans l'architecture d'information globale. Nous pouvons donc passer maintenant à la création du site.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Créer le titre et le formulaire

Le titre et le formulaire de notification de demande sont les composants essentiels de notre page. Ils doivent être présentés immédiatement à l'utilisateur.

Dans le titre, ajoutez simplement du texte pour décrire le cours :

{% include_code src=_code/addheadline.html snippet=headline %}

Vous devez également compléter le formulaire.
Il s'agit d'un formulaire simple où sont renseignés les noms et numéros de téléphone des utilisateurs, ainsi que le meilleur moment pour les rappeler.

Des étiquettes et des espaces réservés doivent être associés à tous les formulaires pour permettre aux utilisateurs d'activer facilement des éléments et de comprendre ce qu'ils sont censés contenir, et aussi d'aider les outils d'accessibilité à comprendre la structure du formulaire. Outre l'envoi de la valeur de formulaire au serveur, l'attribut de nom est utilisé pour fournir au navigateur de précieuses indications sur la manière de compléter automatiquement ce formulaire.

Des types sémantiques seront ajoutés pour permettre aux utilisateurs de saisir, en un tournemain, du contenu sur un appareil mobile. Par exemple, lors de la saisie d'un numéro de téléphone, l'utilisateur doit simplement voir un clavier de numérotation.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Créer la section 'Vidéo et informations'

La section de contenu 'Vidéo et informations' sera un peu plus détaillée.
Elle contiendra une liste à puces des caractéristiques de nos produits, ainsi qu'un espace vidéo réservé présentant le produit en action.

{% include_code src=_code/addcontent.html snippet=section1 %}

La vidéo est souvent utilisée pour décrire le contenu de manière plus interactive et pour faire la démonstration d'un produit ou concept.

L'application des bonnes pratiques vous permet d'intégrer aisément du contenu vidéo dans votre site :

* Ajoutez un attribut `controls` pour permettre une lecture facile de la vidéo.
* Ajoutez une image `poster` pour proposer aux utilisateurs un aperçu du contenu.
* Ajoutez plusieurs éléments `<source>` en fonction des formats vidéo acceptés.
* Ajoutez du texte de remplacement pour permettre aux utilisateurs de télécharger la vidéo s'il s'avère impossible de la lire dans la fenêtre.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Créer la section 'Images'

Un site sans images peut être pour le moins ennuyeux. Il existe deux types d'images :

* Images de contenu : il s'agit d'images intégrées au document, utilisées pour véhiculer des informations supplémentaires sur le contenu.
* Images stylistiques : images utilisées pour embellir le site. Il s'agit généralement d'images d'arrière-plan, de motifs et de dégradés. Ces images seront traitées dans l'[article suivant]({{page.nextPage.relative_url}}).

La section 'Images' de notre page est un ensemble d'images de contenu.

Les images de contenu sont essentielles pour transmettre le sens de la page. On peut les comparer aux images utilisées dans des articles de journaux. Les images que nous utilisons sont les photos des formateurs du projet, à savoir : Chris Wilson, Peter Lubbers et Sean Bennet.

{% include_code src=_code/addimages.html snippet=images lang=html %}

Les images sont définies sur une échelle de 100 % de la largeur de l'écran. Cela fonctionne très bien sur les appareils présentant une fenêtre d'affichage étroite, mais moins bien sur une fenêtre d'affichage large (un ordinateur de bureau, par exemple). Nous traiterons ce point dans la section relative à la conception de sites Web adaptatifs.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

De nombreux utilisateurs n'ont pas la possibilité d'afficher des images et ont souvent recours à une technologie assistive, telle qu'un lecteur d'écran qui analyse les données de la page et les leur transmet verbalement. Vous devez vous assurer que toutes vos images de contenu comportent une balise `alt` que le lecteur d'écran peut lire à l'utilisateur.

Lorsque vous ajoutez des balises `alt`, faites en sorte que le texte situé entre les balises soit aussi concis que possible pour décrire l'image en détail. Dans notre exemple de démonstration, l'attribut est simplement formaté en tant que `Name: Role`. Suffisamment d'informations sont présentées pour permettre à l'utilisateur de comprendre que cette section concerne les auteurs et leur fonction.

### Ajouter la section 'Données tabulées'

La dernière section est un simple tableau utilisé pour afficher des statistiques spécifiques sur le produit.

Les tableaux ne doivent être utilisés que pour les données tabulaires, telles que des matrices d'information.

{% include_code src=_code/addcontent.html snippet=section3 %}

### Ajouter un pied de page

Sur la plupart des sites, un pied de page est nécessaire pour afficher du contenu tel que des conditions d'utilisation, des clauses de non-responsabilité, ou d'autres informations qui ne sont pas censées se trouver dans la zone de navigation principale ou la zone de contenu principale de la page.

Notre site comportera simplement des liens vers les conditions d'utilisation, une page 'Contact' et nos profils de médias sociaux.

{% include_code src=_code/addcontent.html snippet=footer %}

## Résumé

Nous avons créé la structure du site et identifié tous les principaux éléments structuraux. Nous nous sommes également assurés que tout le contenu pertinent était prêt et disponible pour satisfaire nos besoins.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Comme vous pouvez le constater, la page n'a pas fière allure. Ne vous inquiétez pas, c'est voulu ! 
Le contenu est l'élément le plus important d'un site, et nous devions nous assurer que nous disposions d'une densité et d'une architecture d'information robuste. Ce guide nous a donné un excellent point de départ. Dans le guide suivant, nous nous chargerons du style de contre contenu.



