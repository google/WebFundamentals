---
title: "Optimiser les images dans une optique de performances"
description: "Les images comptent souvent pour la majorité des octets téléchargés. De plus, elles occupent généralement une grande partie de l'espace visuel sur la page. "
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Utilisez l'image la mieux adaptée aux caractéristiques de l'écran en tenant compte de la taille de l'écran, de la résolution de l'appareil et de la mise en page."
    - "Dans le cas des écrans à haute densité de pixels, modifiez la propriété <code>background-image</code> dans la feuille de style à l'aide de requêtes média avec <code>min-resolution</code> et <code>-webkit-min-device-pixel-ratio</code>."
    - "Utilisez l'attribut 'srcset' pour fournir des images en haute résolution en plus de l'image 1x dans le balisage."
    - "Tenez compte des critères de performances lors de l'utilisation de techniques de remplacement d'images JavaScript ou lors de la diffusion d'images haute résolution utilisant un taux de compression élevé sur des appareils de plus faible résolution."
  avoid-images:
    - "Évitez d'utiliser des images lorsque cela s'avère possible. Il est conseillé d'exploiter les fonctionnalités offertes par le navigateur, d'utiliser des caractères Unicode au lieu d'images et de remplacer les icônes complexes par des polices d'icônes."
  optimize-images:
    - "Ne choisissez pas un format d'image au hasard, mais tâchez d'utiliser le format le mieux adapté en parfaite connaissance de cause."
    - "Intégrez des outils de compression et d'optimisation d'images dans votre flux de travail afin de réduire la taille des fichiers."
    - "Placez les images fréquemment utilisées dans des sprites d'image en vue de réduire le nombre de requêtes HTTP."
    - "Il est judicieux de ne charger les images qu'après leur défilement afin d'accélérer le chargement initial de la page et de réduire son poids initial."
notes:
  compressive:
    - "Soyez prudent lorsque vous utilisez la technique de compression, en raison des exigences supplémentaires sur le plan de la mémoire et du décodage. Le redimensionnement d'images sur des écrans de petite taille est une opération exigeante qui peut se révéler particulièrement laborieuse sur des appareils d'entrée de gamme disposant d'une mémoire et d'une puissance de traitement limitées."
related-guides:
  optimize:
  -
      title: "Optimisation d'images"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Optimisation de l'efficacité du contenu"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Les images comptent souvent pour la majorité des octets téléchargés. De plus, elles occupent généralement une grande partie de l'espace visuel sur la page. Par conséquent, leur optimisation peut vous permettre de réaliser des économies d'octets considérables et d'améliorer sensiblement les performances de votre site Web : moins le navigateur devra télécharger d'octets, moins il y aura de concurrence pour la bande passante du client, et plus vite le navigateur pourra télécharger et afficher tous les éléments.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Choisir le bon format

Vous devez prendre en compte deux types d'images : les [images vectorielles](http://fr.wikipedia.org/wiki/Image_vectorielle) et les [images matricielles](http://fr.wikipedia.org/wiki/Image_matricielle). Dans le cas des images matricielles, vous devez également choisir le format de compression adéquat ; "GIF", "PNG" ou "JPG", par exemple.

Les **images matricielles**, telles que les photos et d'autres images, sont représentées sous la forme d'une grille de points individuels ou pixels. Elles proviennent généralement d'un appareil photo ou d'un scanner, ou elles peuvent être créées dans le navigateur à l'aide de l'élément `canvas`. Plus ces images sont grandes, plus la taille du fichier est importante. Lorsque ces images sont redimensionnées au-delà de leur taille initiale, elles deviennent floues, car le navigateur doit 'deviner' comment remplir les pixels manquants.

Les **images vectorielles**, telles que les logos et les illustrations au trait, sont définies par un ensemble de courbes, de lignes, de formes et de couleurs de remplissage. Elles sont créées à l'aide de programmes comme Adobe Illustrator et Inkscape, et enregistrées dans un format vectoriel tel que ['SVG'](http://css-tricks.com/using-svg/). Les images vectorielles étant basées sur des primitives simples, leur dimensionnement n'entraîne aucune perte de qualité, ni modification de la taille du fichier.

Pour déterminer le format adéquat, il importe de tenir compte de l'origine de l'image (matricielle ou vectorielle), ainsi que du contenu (couleurs, animation, texte, etc.). Il n'existe pas de format idéal pour tous les types d'image, et chaque format présente des avantages et des inconvénients.

Pour prendre la bonne décision, commencez par appliquer ces quelques directives :

* Utilisez le format `JPG` pour les images photographiques.
* Utilisez le format `SVG` pour les illustrations vectorielles et les graphiques unis tels que les logos et les illustrations au trait.
  Si les illustrations vectorielles ne sont pas disponibles, essayez donc le format WebP ou PNG.
* Utilisez le format `PNG` plutôt que `GIF`, car il autorise davantage de couleurs et offre de meilleurs taux de compression.
* Pour les animations plus longues, il est conseillé d'utiliser l'élément `<video>` qui offre une meilleure qualité d'image et permet à l'utilisateur de contrôler la lecture.

## Réduire la taille de fichier

Il est possible de réduire sensiblement la taille du fichier image en le soumettant à un post-traitement après l'avoir enregistré. Il existe tout un éventail d'outils destinés à la compression d'images : avec et sans perte, en ligne, avec interface graphique, par ligne de commande, etc. Lorsque cela s'avère possible, il est conseillé d'automatiser l'optimisation des images, de sorte qu'elle soit considérée comme un objet de première classe dans votre flux de travail.

Plusieurs outils permettent d'effectuer une compression sans perte plus poussée sur les fichiers `JPG` et `PNG`, sans nuire à la qualité d'image. Pour le format `JPG`, essayez [jpegtran](http://jpegclub.org/) ou [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (disponible seulement sur Linux ; à exécuter avec l'option --strip-all). Pour le format `PNG`, essayez [OptiPNG](http://optipng.sourceforge.net/) ou [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

## Utiliser des sprites d'image

La création de sprites CSS est une technique par laquelle plusieurs images sont regroupées dans un seul fichier appelé `sprite sheet`. Les images individuelles peuvent ensuite être utilisées en indiquant l'image d'arrière-plan d'un élément (la `sprite sheet`), plus un décalage pour afficher la partie appropriée.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt=""Sprite sheet" utilisée comme exemple">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

L'avantage de cette technique est de réduire le nombre de téléchargements requis pour obtenir plusieurs images, tout en permettant la mise en cache.

## Lazy Loading

La technique de Lazy Loading permet d'accélérer sensiblement le chargement des longues pages qui comportent de nombreuses images sous la ligne de flottaison. Pour ce faire, les images sont chargées suivant les besoins ou une fois le chargement et le rendu du contenu principal terminés. Outre les améliorations qu'elle apporte sur le plan des performances, cette technique permet de créer des interfaces en défilement infini.

Soyez prudent lorsque vous créez des pages en défilement infini. En effet, puisque le contenu est chargé à mesure qu'il devient visible, il se peut que les moteurs de recherche ne le détectent jamais. De plus, les utilisateurs qui s'attendent à trouver des informations dans le pied de page ne les verront jamais, car du nouveau contenu est chargé en permanence.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




