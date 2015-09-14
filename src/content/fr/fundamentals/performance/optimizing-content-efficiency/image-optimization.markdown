---
title: "Optimisation de l'image"
description: "Les images représentent souvent la majorité des octets téléchargés sur une page Web, et occupent également une grande partie de l'espace visuel. En conséquence, l'optimisation des images permet souvent de réaliser les économies en octets et les améliorations des performances les plus importantes pour votre site Web : moins le navigateur doit télécharger d'octets, moins il y a de compétition pour la bande passante du client, et plus vite le navigateur peut télécharger et afficher le contenu utile à l'écran."
updated_on: 2014-05-10
key-takeaways:
  replace:
    - "Éliminez les ressources images inutiles."
    - "Utilisez les effets CSS3 chaque fois que c'est possible."
    - "Utilisez les polices du Web au lieu d'encoder le texte en images."
  vector-raster:
    - "Les images vectorielles sont idéales pour les images composées de formes géométriques."
    - "Les images vectorielles sont indépendantes du zoom et de la résolution."
    - "Les images matricielles doivent être utilisées pour les scènes complexes avec beaucoup de formes irrégulières et de détails."
  hidpi:
    - "Les écrans haute résolution ont plusieurs pixels d'appareil par pixel CSS."
    - "Les images haute résolution nécessitent un nombre beaucoup plus important de pixels et d'octets."
    - "Les techniques d'optimisation de l'image sont les mêmes quelle que soit la résolution."
  optimizing-vector:
    - "SVG est un format d'image basé sur le balisage XML."
    - "Les fichiers SVG doivent être réduits pour réduire leur taille."
    - "Les fichiers SVG doivent être compressés avec GZIP."
  optimizing-raster:
    - "Une image matricielle est une grille de pixels."
    - "Chaque pixel encode des informations sur la couleur et la transparence."
    - "Les logiciels de compression d'image utilisent différentes techniques pour réduire le nombre de bits requis pas pixel afin de réduire la taille de fichier de l'image."
  lossless-lossy:
    - "En raison de la façon dont fonctionnent nos yeux, les images sont d'excellentes candidates pour la compression avec perte."
    - "L'optimisation des images est une fonction de la compression avec et sans perte."
    - "Les différences de format des images sont dues à la différence de façon et à quels algorithmes avec et sans perte sont utilisés pour optimiser l'image."
    - "Il n'existe pas un seul format idéal ou 'paramètre de qualité pour toutes les images' : chaque combinaison de logiciel de compression spécifique et de contenu d'image produit un résultat unique."
  formats:
    - "Commencez par sélectionner un format universel adapté : GIF, PNG, JPEG."
    - "Expérimentez et sélectionnez les meilleurs paramètres pour chaque format : qualité, taille de la palette, etc."
    - "Envisagez la possibilité d'ajouter des éléments WebP et JPEG XR pour les images à l'échelle de clients modernes"
  scaled-images:
    - "La production d'éléments à l'échelle est l'une des optimisations les plus simples et les plus efficaces."
    - "Accordez une attention particulière aux éléments volumineux, car ils produisent un temps système élevé."
    - "Réduisez le nombre de pixels inutiles en mettant vos images à l'échelle de leur taille d'affichage."
notes:
  decompressed:
    - "Notez que quel que soit le format d'image utilisé pour transférer les données du serveur au client, lorsque l'image est décodée par le navigateur, chaque pixel occupe toujours 4 octets de mémoire. Cela peut représenter une contrainte importante pour les grandes images et les appareils qui ne disposent pas de beaucoup de mémoire, par exemple les appareils mobiles bas de gamme."
  artifacts:
    - "De gauche à droite (PNG) : 32 bits (16 000 couleurs), 7 bits (128 couleurs), 5 bits (32 couleurs). Les scènes complexes avec des transitions de couleur graduelles (dégradés, ciel, etc.) nécessitent des palettes de couleurs plus larges pour éviter les artéfacts visuels tels que le ciel pixellisé dans l'élément à 5 bits. D'un autre côté, si l'image n'utilise que quelques couleurs, une large palette est un gaspillage de bits précieux !"
  quality:
    - "Notez qu'il est impossible de comparer directement les niveaux de qualité des différents formats d'image, en raison des différences dans les algorithmes utilisés pour encoder l'image : la qualité 90 JPEG produit un résultat très différent de la qualité 90 WebP. En fait, même des niveaux de qualité pour le même format d'image peuvent produire des résultats visiblement selon la mise en œuvre du logiciel de compression !"
  resized:
    - "Le fait de passer la souris sur l'élément de l'image dans Chrome DevTools révèle les tailles 'naturelle' et 'd'affichage' de celui-ci. Dans l'exemple ci-dessus, l'image de 300 x 260 pixels est téléchargée, mais son échelle est ensuite réduite (245 x 212) sur le client lorsqu'elle est affichée."
---

<p class="intro">
  Les images représentent souvent la majorité des octets téléchargés sur une page Web, et occupent également une grande partie de l'espace visuel. En conséquence, l'optimisation des images permet souvent de réaliser les économies en octets et les améliorations des performances les plus importantes pour votre site Web : moins le navigateur doit télécharger d'octets, moins il y a de compétition pour la bande passante du client, et plus vite le navigateur peut télécharger et afficher le contenu utile à l'écran.
</p>


{% include shared/toc.liquid %}

L'optimisation d'image est à la fois un art et une science : c'est un art, car il n'existe pas de réponse définitive quant à la meilleure façon de compresser une image individuelle, et c'est une science, car il existe un grand nombre de techniques et algorithmes bien développés permettant de réduire de façon significative la taille d'une image. Pour trouver les meilleurs paramètres pour votre image, vous devez analyser avec soin de nombreux facteurs : capacités du format, contenu des données encodées, qualité, dimensions en pixels, etc.

## Éliminer et remplacer les images

{% include shared/takeaway.liquid list=page.key-takeaways.replace %}

La toute première question que vous devez vous poser est la suivante : une image est-elle vraiment indispensable pour produire l'effet recherché ? Un bon design doit être simple, et offre également les meilleures performances. Si vous pouvez éliminer une image, qui nécessite souvent un grand nombre d'octet comparé aux éléments HTML, CSS, JavaScript et autres sur la page, alors c'est toujours la meilleure stratégie d'optimisation. Cela étant dit, une image bien placée peut également transmettre plus d'informations qu'un millier de mots. Il vous incombe donc de trouver le bon équilibre.

Ensuite, vous devez vous demander s'il existe une autre technologie capable de fournir les résultats souhaités de façon plus efficace :

* **Effets CSS** (dégradés, ombres, etc.) et animations CSS peuvent être utilisés pour produire des éléments à la résolution indépendante qui semblent toujours nets, quels que soient la résolution et le niveau de zoom, souvent pour une fraction du nombre d'octets nécessaires pour un fichier image.
* Les **polices Web** permettent d'utiliser de superbes types de caractères tout en préservant la possibilité de sélectionner, rechercher et redimensionner le texte, ce qui représente une amélioration importante en termes de facilité d'utilisation.

Si vous devez encoder du texte dans une image, réfléchissez-y à deux fois. Une bonne typographie est essentielle pour la qualité du design, de la marque et de la lisibilité. Mais le texte dans les images n'est pas très agréable pour les utilisateurs : le texte ne peut pas être sélectionné, recherché, agrandi, il n'est pas accessible et n'est pas adapté aux appareils avec un ppp élevé. L'utilisation de polices Web nécessite son [propre ensemble d'optimisations](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), mais elle permet de résoudre tous ces problèmes et constitue toujours un meilleur choix pour afficher du texte.


## Images vectorielles ou matricielles

{% include shared/takeaway.liquid list=page.key-takeaways.vector-raster %}

Une fois que vous avez déterminé qu'une image est bien le format optimal pour obtenir l'effet souhaité, il est ensuite essentiel de choisir un format adapté :

&nbsp;

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>Image vectorielle</b>
    <img class="center" src="images/vector-zoom.png" alt="Image vectorielle agrandie">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>Image matricielle</b>
    <img src="images/raster-zoom.png" alt="Image matricielle agrandie">
  </div>
</div>

* Les [images vectorielles](http://fr.wikipedia.org/wiki/Image_vectorielle) utilisent des lignes, des points et des polygones pour représenter une image.
* Les [images matricielles](http://fr.wikipedia.org/wiki/Image_matricielle) représentent une image en encodant les valeurs individuelles de chaque pixel dans une grille rectangulaire.

Chaque format offre des avantages et des inconvénients. Les formats vectoriels sont mieux adaptés aux images composées de formes géométriques simples (logos, texte, icône, etc.), et offrent un résultat net à chaque résolution et niveau de zoom. Cela en fait le format idéal pour les écrans haute résolution et les éléments qui doivent être affichés dans plusieurs tailles.

Cependant, les formats vectorielles montrent leurs limites lorsque la scène est complexe, comme c'est le cas des photos : la quantité de balisage SVG pour décrire toutes les formes peut être extrêmement élevée, et le résultat ne pas être pour autant 'photoréaliste'. C'est dans de tels cas qu'il faut utiliser un format d'image matricielle tel que GIF, PNG, JPEG, ou l'un des formats les plus récents tels que JPEG-XR et WebP.

Les images matricielles n'offrent pas les mêmes propriétés : elles ne sont pas indépendantes de la résolution ou du niveau de zoom. Lorsque vous agrandissez une image matricielle, celle-ci se déforme ou devient floue. Il peut donc être nécessaire d'enregistrer plusieurs versions d'une image matricielle à différentes résolutions pour offrir une expérience optimale à vos utilisateurs.


## Implications des écrans haute résolution

{% include shared/takeaway.liquid list=page.key-takeaways.hidpi %}

Lorsqu'on parle de pixels d'image, il est nécessaire de distinguer deux types de pixels différents : les pixels CSS et les pixels d'appareil. Un seul pixel CSS peut contenir plusieurs pixels d'appareil. Par exemple, un seul pixel d'appareil peut correspondre directement à un seul pixel d'appareil, ou être composé de plusieurs pixels d'appareil. Qu'est-ce que ça change ? Plus les pixels d'appareil sont nombreux, plus le contenu affiché à l'écran sera détaillé.

<img src="images/css-vs-device-pixels.png" class="center" alt="Pixels CSS ou d'appareil">

Les écrans à ppp élevé (HiDPI) offrent un résultat esthétique, mais avec un inconvénient évident : nos éléments d'image nécessitent un plus grand nombre de détails pour profiter du plus grand nombre de pixels d'appareil. La bonne nouvelle est que les images vectorielles sont parfaitement adaptées à cette tâche, puisqu'elles peuvent être affichées à n'importe quelle résolution et offrir un résultat net. Le coût de traitement pour afficher les plus petits détails peut être plus élevé, mais l'élément sous-jacent est le même et est indépendant de la résolution.

D'un autre côté, les images matricielles offrent un défi bien plus important, car elles encodent les données de l'image pixel par pixel. Par conséquent, plus il y a de pixels, plus la taille de fichier de l'image matricielle sera importante. Considérons par exemple la différence entre un élément photographique affiché à 100 x 100 pixels (CSS) :

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Résolution d'écran</th>
    <th>Nombre total de pixels</th>
    <th>Taille du fichier non compressé (4 octets par pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="résolution">1x</td>
  <td data-th="nombre total de pixels">100 x 100 = 10 000</td>
  <td data-th="taille du fichier">40 000 octets</td>
</tr>
<tr>
  <td data-th="résolution">2x</td>
  <td data-th="nombre total de pixels">100 x 100 x 4 = 40 000</td>
  <td data-th="taille du fichier">160 000 octets</td>
</tr>
<tr>
  <td data-th="résolution">3x</td>
  <td data-th="nombre total de pixels">100 x 100 x 9 = 90 000</td>
  <td data-th="taille du fichier">360 000 octets</td>
</tr>
</tbody>
</table>

Lorsqu'on double la résolution de l'écran physique, le nombre total de pixels est multiplié par quatre : le double du nombre de pixels horizontaux multiplié par le double du nombre de pixels verticaux. Par conséquent, un écran '2x' ne contient pas seulement deux fois, mais quatre fois plus de pixels nécessaires !

Qu'est-ce que cela signifie concrètement ? Les écrans haute résolution nous permettent d'afficher de belles images, ce qui peut être un avantage pour présenter un produit. Cependant, des écrans haute résolution nécessitent aussi des images haute résolution : préférez donc des images vectorielles lorsque c'est possible, puis qu'elles sont indépendantes de la résolution et offrent toujours un résultat net. Et si vous devez utiliser une image matricielle, proposez et optimisez plusieurs versions de chaque image. Pour en savoir plus, lisez la suite.


## Optimiser les images vectorielles

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

Tous les navigateurs modernes sont compatibles avec le format SVG (Scalable Vector Graphics), qui est un format d'image basé sur le balisage XML, pour les images en deux dimensions : nous pouvons intégrer le balisage SVG directement sur la page, ou comme ressource externe. Un fichier SVG peut également être créé par la plupart des logiciels de dessin vectoriel, ou à la main et directement dans votre traitement de texte préféré.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

L'exemple ci-dessus montre un cercle simple avec un contour noir et un fond rouge. Il a été exporté depuis Adobe Illustrator. Comme vous le voyez, il contient un grand nombre de métadonnées, telles que des informations de couche, des commentaires et des espaces de nom souvent inutiles pour afficher l'élément dans le navigateur. Par conséquent, il est toujours bon de réduire la taille de vos fichiers SVG en utilisant un outil tel que [svgo](https://github.com/svg/svgo).

Dans ce cas, svgo réduit la taille du fichier ci-dessus généré par Illustrator de 58 %, le faisant passer de 470 à 199 octets. De plus, puisque le format SVG est basé sur XML, nous pouvons également appliquer la compression GZIP pour réduire sa taille de transfert. Assurez-vous cependant que votre serveur est configuré pour compresser les éléments SVG !


## Optimiser les images matricielles

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

Une image matricielle est simplement une grille de 'pixels' individuels en deux dimensions. Par exemple une image de 100 x 100 pixels est une séquence de 10 000 pixels. À son tour, chaque pixel stocke les valeurs '[RVBA](http://fr.le cachepedia.org/le cache/RVBA)' : (R) canal rouge, (V) canal vert, (B) canal bleu et (A) canal alpha (transparent).

En interne, le navigateur attribue 256 valeurs (nuances) à chaque canal, ce qui se traduit par 8 bits par canal (2 ^ 8 = 256), et 4 octets par pixel (4 canaux x 8 bits = 32 bits = 4 octets). Par conséquent, si nous connaissons les dimensions de la grille, il est facile de calculer la taille du fichier :

* Une image 100 x 100 px est composée de 10 000 pixels
* 10 000 pixels x 4 octets = 40 000 octets
* 40 000 octets / 1 024 = 39 Ko

^

{% include shared/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Dimensions</th>
    <th>Pixels</th>
    <th>Taille du fichier</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensions">100 x 100</td>
  <td data-th="pixels">10 000</td>
  <td data-th="taille du fichier">39 Ko</td>
</tr>
<tr>
  <td data-th="dimensions">200 x 200</td>
  <td data-th="pixels">40 000</td>
  <td data-th="taille du fichier">156 Ko</td>
</tr>
<tr>
  <td data-th="dimensions">300 x 300</td>
  <td data-th="pixels">90 000</td>
  <td data-th="taille du fichier">351 Ko</td>
</tr>
<tr>
  <td data-th="dimensions">500 x 500</td>
  <td data-th="pixels">250 000</td>
  <td data-th="taille du fichier">977 Ko</td>
</tr>
<tr>
  <td data-th="dimensions">800 x 800</td>
  <td data-th="pixels">640 000</td>
  <td data-th="taille du fichier">2 500 Ko</td>
</tr>
</tbody>
</table>

Une taille de 39 Ko pour une image de 100 x 100 pixels peut sembler peu, mais la taille de fichier augmente rapidement pour les images plus importantes et rend les éléments d'image à la fois lents et coûteux à télécharger. Heureusement, ce que nous avons décrit jusqu'à maintenant est le format d'image 'non compressé'. Que pouvons-nous faire pour réduire la taille du fichier image ?

Une simple stratégie consiste à réduire la 'profondeur de bit' de l'image de 8 bits par canal à une palette de couleur plus petite : 8 bits par canal nous donne 256 valeurs par canal, et un total de 16 777 216 (2 563) couleurs. Que se passe-t-il si l'on réduit la palette à 256 couleurs ? Nous n'avons alors plus besoin que de 8 bits au total pour les canaux RVB, et réalisons immédiatement une économie de deux octets par pixel, soit une économie de 50 % sur la compression par rapport à notre format original de 4 octets par pixel !

<img src="images/artifacts.png" class="center" alt="Artéfacts de compression">

{% include shared/remember.liquid title="Note" list=page.notes.artifacts %}

Ensuite, maintenant que nous avons optimisé les données stockées dans les pixels individuels, nous pourrions être encore plus malins et nous intéresser aux pixels à proximité : on s'aperçoit alors que dans de nombreuses images, en particulier les photos, beaucoup de pixels proches les uns des autres ont des couleurs similaires, par exemple le ciel, les textures répétitives, etc. Utilisant cette information à notre avantage, le logiciel de compression peut appliquer un '[codage différentiel](http://fr.wikipedia.org/wiki/Codage_différentiel)', avec lequel au lieu de stocker les valeurs individuelles de chaque pixel, nous pouvons stocker la différence entre les pixels proches les uns des autres : si les pixels adjacents sont identiques, la différence est de 'zéro' et il n'est alors nécessaire de stocker qu'un seul bit ! Mais ne nous arrêtons pas en si bon chemin...

L'œil humain a différents niveaux de sensibilité en fonction des différentes couleurs : nous pouvons optimiser notre codage des couleurs pour en tenir compte, en réduisant ou en augmentant la palette pour ces couleurs.
Les pixels 'à proximité' forment une grille en deux dimensions, ce qui signifie que chaque pixel a de nombreux voisins : nous pouvons utiliser ce fait pour améliorer encore davantage le codage différentiel.
Au lieu de ne regarder que les voisins immédiats de chaque pixel, nous pouvons regarder des groupes plus étendus de pixels voisins et encoder différents blocs avec différents paramètres. Et ainsi de suite...

Comme vous pouvez le voir, l'optimisation d'image devient vite compliquée (ou amusante, selon votre point de vue), et c'est un domaine de recherche universitaire et commerciale très actif. Les images occupent un grand nombre d'octets, et la valeur du développement de meilleures techniques de compression des images est inestimable ! Si vous souhaitez en apprendre davantage, consultez la [page Wikipédia](http://fr.wikipedia.org/wiki/Compression_d'image), ou le [document de présentation des techniques de compression WebP](https://developers.google.com/speed/webp/docs/compression) pour avoir un exemple concret.

Mais une fois encore, tout ceci est très intéressant, mais très théorique : en quoi cela nous aide-t-il à optimiser les images sur nos pages ? Nous ne sommes évidemment pas capables d'inventer de nouvelles techniques de compression, mais il est important de comprendre la forme du problème : pixels RVBA, profondeur de bit, et les diverses techniques d'optimisation. Il est essentiel de comprendre tous ces concepts et de les garder à l'esprit avant d'aborder le sujet des différents formats d'image matricielle.


## Compression d'image avec et sans perte

{% include shared/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

Pour certains types de données, tels que le code source d'une page ou un fichier exécutable, il est essentiel qu'un logiciel de compression n'endommage et ne perde aucune des informations d'origine : un seul octet manquant ou incorrect peut modifier complètement la signification des contenus du fichier ou pire, le détruire totalement. Pour certains autres types de données, telles que les images, les fichiers audio et les vidéos, il peut être parfaitement acceptable de fournir une représentation 'approximative' des données d'origine.

En fait, étant donnée la façon dont fonctionne l'œil, nous pouvons souvent nous permettre de nous débarrasser de certaines informations pour chaque pixel afin de réduire la taille de fichier d'une image. Par exemple, nos yeux ont une sensibilité différente en fonction des couleurs, ce qui signifie que nous pouvons utiliser moins de bits pour encoder certaines couleurs. En conséquence, le déroulement d'une optimisation d'image classique se compose de deux étapes principales :

1. L'image est traitée par un filtre '[avec perte](http://fr.wikipedia.org/wiki/Compression_de_données#Compression_avec_pertes)' qui élimine certaines données des pixels.
1. L'image est traitée par un filtre '[sans perte](http://en.wikipedia.org/wiki/Lossless_compression)' qui comprime les données des pixels.

** La première étape est facultative, et l'algorithme exact dépend du format d'image spécifique. Mais il est important de comprendre que n'importe quelle image peut subir une compression avec perte pour réduire sa taille.** En fait, la différence entre les différents formats d'image, tels que GIF, PNG, JPEG, etc., réside dans la combinaison d'algorithmes spécifiques qu'ils utilisent (ou omettent) lorsqu'ils appliquent les étapes avec et sans perte.

Alors, quelle est la configuration 'optimale' de l'optimisation avec et sans perte ? La réponse dépend du contenu de l'image et de vos propres critères, tels que l'équilibre entre taille du fichier et artéfacts introduits par la compression avec perte : dans certains cas, vous pouvez souhaiter ignorer l'optimisation avec perte pour communiquer une image très détaillée de façon extrêmement fidèle, et dans d'autres cas vous pourrez appliquer une optimisation avec perte agressive afin de réduire la taille de fichier de l'élément image.  C'est à ce moment-là que votre jugement et le contexte doivent entrer en jeu. Il n'existe par de paramètre universel unique.

<img src="images/save-for-web.png" class="center" alt="Enregistrer pour le Web">

Prenons un exemple concret. Lorsqu'on utilise un format avec perte comme JPEG, le logiciel de compression expose généralement un paramètre de 'qualité' (par exemple la barre de défilement fournie par la fonctionnalité 'Enregistrer pour le Web' dans Adobe Photoshop), le plus souvent un nombre entre 1 et 100 qui contrôle le fonctionnement interne d'un ensemble spécifique d'algorithmes avec et sans perte. Pour obtenir les meilleurs résultats, testez plusieurs paramètres de qualité pour vos images, et n'ayez pas peur d'en réduire la qualité : les résultats visuels sont souvent très bons et les économies en termes de taille de fichier peuvent être assez importantes.

{% include shared/remember.liquid title="Note" list=page.notes.quality %}


## Sélectionner le bon format d'image

{% include shared/takeaway.liquid list=page.key-takeaways.formats %}

Outre différents algorithme de compression avec et sans perte, les différents formats d'image sont compatibles avec différentes fonctionnalités, telles que les animations et les canaux de transparence (alpha). En conséquence, le choix du 'bon format' pour une image spécifique dépend du résultat visuel souhaité et des exigences fonctionnelles.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Format</th>
    <th>Transparence</th>
    <th>Animation</th>
    <th>Navigateur</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="format"><a href="http://fr.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparence">Oui</td>
  <td data-th="animation">Oui</td>
  <td data-th="navigateur">Tous</td>
</tr>
<tr>
  <td data-th="format"><a href="http://fr.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparence">Oui</td>
  <td data-th="animation">Non</td>
  <td data-th="navigateur">Tous</td>
</tr>
<tr>
  <td data-th="format"><a href="http://fr.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparence">Non</td>
  <td data-th="animation">Non</td>
  <td data-th="navigateur">Tous</td>
</tr>
<tr>
  <td data-th="format"><a href="http://fr.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparence">Oui</td>
  <td data-th="animation">Oui</td>
  <td data-th="navigateur">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://fr.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparence">Oui</td>
  <td data-th="animation">Oui</td>
  <td data-th="navigateur">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Il existe trois formats d'image compatibles au niveau universel : GIF, PNG et JPEG. En plus de ces formats, certains navigateurs sont également compatibles avec des formats plus récents tels que WebP et JPEG XR, qui offrent une meilleure compression globale et davantage de fonctionnalités. Alors, quel format utiliser ?

<img src="images/format-tree.png" class="center" alt="Enregistrer pour le Web">

1. ** Avez-vous besoin d'animations ? Si oui, le format GIF est le seul choix universel.**
  * Le format GIF limite la palette de couleur à un maximum de 256 couleurs, ce qui en fait un choix peu adapté à la plupart des images. En outre, le format PNG-8 offre une meilleure compression pour les images avec une petite palette. Par conséquent, le format GIF n'est adapté que lorsque vous avez besoin d'animations.
1. ** Avez-vous besoin de conserver de petits détails avec une résolution élevée ? Utilisez le format PNG.**
  * Le format PNG n'applique aucun algorithme de compression avec perte autre que le choix de la taille de la palette de couleur. Par conséquent, il produit la qualité d'image la plus élevée, mais avec des tailles de fichier sensiblement plus importantes que les autres formats. Utilisez-le de façon intelligente.
  * Si l'élément d'image contient des images composées de formes géométriques, pensez à le convertir à un format vectoriel (SVG) !
  * Si l'élément d'image contient du texte, réfléchissez-y à deux fois. Le texte dans les images ne peut pas être sélectionné, recherché, ni agrandi. Si vous devez transmettre une apparence personnalisée (pour une marque ou d'autres raisons), utilisez plutôt une police Web.
1. ** Optimisez-vous une photo, une capture d'écran ou un élément d'image similaire ? Utilisez le format JPEG.**
  * Le format JPEG utilise une combinaison d'optimisations avec et sans perte pour réduire la taille de fichier de l'élément d'image. Testez plusieurs niveaux de qualité JPEG pour trouver le meilleur équilibre entre qualité et taille de fichier pour votre élément.

Enfin, une fois que vous avez déterminé le format d'image optimal et les paramètres correspondants pour chacun de vos éléments, pensez à ajouter une variante supplémentaire encodée aux formats WebP et JPEG XR. Ces deux formats sont récents et malheureusement pas (encore) compatibles avec tous les navigateurs, mais ils peuvent néanmoins permettre de faire des économies importantes pour les clients les plus récents. Par exemple, WebP offre en moyenne une [réduction de la taille de fichier de 30 %](https://developers.google.com/speed/webp/docs/webp_study) par rapport à une image au format JPEG comparable.

Puisque ni WebP, ni JPEG XR n'est compatible au niveau universel, vous devrez ajouter une logique supplémentaires à votre application ou à vos serveurs pour diffuser la ressource appropriée :

* Certains CDN offrent un service d'optimisation d'image, y compris aux formats JPEG XR et WebP.
* Certains outils Open Source, par exemple PageSpeed pour Apache ou Nginx, automatisent l'optimisation, la conversion et la diffusion d'éléments adaptés.
* Vous pouvez ajouter une logique d'application supplémentaire pour détecter le client, contrôler les formats avec lesquels il est compatible et diffuser l'image au meilleur format disponible.

Enfin, notez que si vous utilisez un affichage Web pour afficher le contenu dans votre application native, vous avez un contrôle total du client, et pouvez utiliser WebP de façon exclusive ! Facebook, Google+ et bien d'autres utilisent WebP pour afficher toutes leurs images dans leurs applications. Les économies réalisées en valent la peine. Pour en savoir plus sur WebP, consultez la présentation [WebP : Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) sur Google I/O 2013.


## Outils et réglage des paramètres

Il n'existe pas un format d'image, un outil ou un ensemble de paramètres d'optimisation parfait, qui s'applique à toutes les images. Pour obtenir les meilleurs résultats, vous devez choisir le format et ses paramètres en fonction du contenu de l'image et de ses exigences visuelles et techniques.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Outil</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="outil"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="description">permet de créer et d'optimiser des images au format GIF</td>
</tr>
<tr>
  <td data-th="outil"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="description">permet d'optimiser des images au format JPEG</td>
</tr>
<tr>
  <td data-th="outil"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="description">permet d'optimiser sans perte des images au format PNG</td>
</tr>
<tr>
  <td data-th="outil"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="description">permet d'optimiser avec perte des images au format PNG</td>
</tr>
</tbody>
</table>


N'ayez pas peur de tester les paramètres de chaque logiciel de compression. Diminuez la qualité, observez le résultat, puis rincez, lavez et recommencez. Lorsque vous avez trouvé un ensemble de paramètres satisfaisant, vous pouvez l'appliquer à d'autres images semblables sur votre site. Mais ne partez pas du principe que toutes les images doivent être compressées avec les mêmes paramètres.


## Afficher des éléments d'image à l'échelle

{% include shared/takeaway.liquid list=page.key-takeaways.scaled-images %}

L'optimisation d'image se résume à deux critères : l'optimisation du nombre d'octets utilisés pour encoder chaque pixel de l'image, et l'optimisation du nombre total de pixels. La taille de fichier de l'image correspond simplement au nombre total de pixels multiplié par le nombre d'octets utilisés pour encoder chaque pixel. Ni plus, ni moins.

Par conséquent, l'une des techniques d'optimisation d'image les plus simples et les plus efficaces consiste à vous assurer que vous ne transportez pas plus de pixels que nécessaire pour afficher l'élément à la taille souhaitée dans le navigateur. Ça paraît plutôt simple, n'est-ce pas ? Malheureusement, la plupart des pages échouent à ce test pour la plupart de leurs images : elles envoient généralement des éléments plus volumineux et comptent sur le navigateur pour les redimensionner (ce qui consomme également des ressources supplémentaires du processeur) et les afficher à une plus faible résolution.

<img src="images/resized-image.png" class="center" alt="Images redimensionnées">

{% include shared/remember.liquid title="Note" list=page.notes.resized %}

Le temps système créé pour l'expédition de pixels inutiles, simplement pour que le navigateur redimensionne l'image pour vous, est une occasion manquée de réduire et d'optimiser le nombre total d'octets requis pour afficher la page. En outre, notez que le redimensionnement ne dépend pas que du nombre de pixels retirés de l'image, mais également de sa taille naturelle.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Taille naturelle</th>
    <th>Taille d'affichage</th>
    <th>Pixels inutiles</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="naturelle">110 x 110</td>
  <td data-th="affichage">100 x 100</td>
  <td data-th="temps système">110 x 110 - 100 x 100 = 2 100</td>
</tr>
<tr>
  <td data-th="naturelle">410 x 410</td>
  <td data-th="affichage">400 x 400</td>
  <td data-th="temps système">410 x 410 - 400 x 400 = 8 100</td>
</tr>
<tr>
  <td data-th="naturelle">810 x 810</td>
  <td data-th="affichage">800 x 800</td>
  <td data-th="temps système">810 x 810 - 800 x 800 = 16 100</td>
</tr>
</tbody>
</table>

Notez que dans les trois cas ci-dessus, la taille d'affichage ne mesure 'que 10 pixels de moins' que la taille naturelle de l'image. Cependant, plus la taille naturelle est importante, plus le nombre de pixels supplémentaires à encoder et expédier est important ! En conséquence, bien que vous ne puissiez peut-être pas garantir que chaque élément est fourni à la taille d'affichage exacte, **vous devez vous assurer que le nombre de pixels inutile est minime, et que vos éléments volumineux en particulier sont livrés dans une taille aussi proche que possible de leur taille d'affichage.**

## Liste de contrôle de l'optimisation d'image

L'optimisation d'image est à la fois un art et une science : c'est un art, car il n'existe pas de réponse définitive quant à la meilleure façon de compresser une image individuelle, et c'est une science, car il existe des techniques et algorithmes bien développés permettant de réduire de façon significative la taille d'une image.

Voici quelques conseils et techniques à garder à l'esprit lorsque vous travaillez à l'optimisation de vos images :

* **Préférez les formats vectoriels** : les images vectorielles sont indépendantes de la résolution et de l'échelle. Elles sont donc parfaitement adaptées aux nombreux appareils et à la haute résolution actuels.
* **Réduisez et compressez vos éléments SVG** : le balisage XML produit par la plupart des applications de dessin contient souvent des métadonnées inutiles qui peuvent être supprimées. Assurez-vous que vos serveurs sont configurés pour appliquer une compression GZIP aux éléments SVG.
* **Choisissez le meilleur format d'image matricielle** : déterminez vos exigences fonctionnelles et sélectionnez le format adapté à chaque élément.
* **Testez les paramètres de qualité optimaux pour les formats matriciels** : n'ayez pas peur de réduire les paramètres de 'qualité'. Les résultats sont souvent très bons pour une économie d'octets importante.
* **Supprimez les métadonnées d'image inutiles** : de nombreuses images matricielles contiennent des données inutiles à propos de l'élément, telles que les informations géographiques, les informations de l'appareil photo, etc. Utilisez les outils adaptés pour supprimer ces données.
* **Diffusez des images mises à l'échelle** : redimensionnez les images sur le serveur et assurez-vous que la taille 'd'affichage' est la plus proche possible de la taille 'naturelle' de l'image. Faites en particulier attention aux grandes images, car elles produisent le temps système le plus important lorsqu'elles sont redimensionnées !
* **Automatisez, automatisez, automatisez** : investissez dans des outils et une infrastructure automatisés qui garantissent que vos éléments d'image sont toujours optimisés.




