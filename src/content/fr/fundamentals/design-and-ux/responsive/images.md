project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Les images font justement partie intégrante de chaque page. Cependant, elles constituent également la majorité des octets téléchargés. La conception de sites Web adaptatifs permet non seulement d'adapter les dispositions aux caractéristiques de l'appareil, mais aussi les images.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Images {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Comme dit l'adage : 'Une image vaut mieux qu'un long discours'. Et les images font justement partie intégrante de chaque page. Cependant, elles constituent également la majorité des octets téléchargés. La conception de sites Web adaptatifs permet non seulement d'adapter les dispositions aux caractéristiques de l'appareil, mais aussi les images.


### Images adaptatives

Grâce à la conception de sites Web adaptatifs, il est possible d'adapter non seulement les dispositions aux caractéristiques de l'appareil, mais aussi les images. Par exemple, sur des écrans haute résolution (2x), des graphiques haute résolution sont nécessaires pour garantir la netteté des détails. Une image d'une largeur de 50 % donnera de bons résultats avec un navigateur de 800 pixels de large, mais occupera trop d'espace sur un téléphone à écran étroit. Cependant, elle utilisera toujours autant de bande passante lorsqu'elle sera adaptée à un écran plus petit.

### Art direction

<img class="center" src="img/art-direction.png" alt="Exemple d'art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Dans d'autres cas, il se peut que l'image doive subir des modifications plus importantes : changement des proportions, recadrage, voire remplacement de toute l'image. On parle alors d''art direction'. Pour consulter d'autres exemples, rendez-vous sur [responsiveimages.org/demos/](http://responsiveimages.org/demos/){: .external }.


{% include "web/_shared/udacity/ud882.html" %}







## Images dans le balisage 




Particulièrement puissant, l'élément `img` télécharge, décode et affiche du contenu. De plus, les navigateurs modernes sont compatibles avec un large éventail de formats d'image. Inclure des images compatibles avec plusieurs appareils ne diffère pas de la méthode utilisée pour les ordinateurs de bureau. Il suffit de quelques réglages mineurs pour garantir une expérience utilisateur optimale.



### TL;DR {: .hide-from-toc }
- Utilisez des tailles relatives pour les images afin d'éviter tout dépassement accidentel de la capacité du conteneur.
- Utilisez l'élément <code>picture</code> pour spécifier des images différentes en fonction des caractéristiques de l'appareil (c'est ce que l'on désigne sous le nom d''art direction').
- Utilisez l'attribut <code>srcset</code> et le descripteur <code>x</code> dans l'élément <code>img</code> pour fournir au navigateur des indications quant à la meilleure image à utiliser parmi différentes densités.



### Appliquer des tailles relatives aux images

Pensez à utiliser des unités relatives lors de l'indication de largeurs pour les images afin d'éviter tout dépassement accidentel de la capacité de la fenêtre d'affichage. Si vous définissez, par exemple, la valeur `width: 50%;`, la largeur de l'image équivaudra à 50 % de l'élément conteneur (et non à la fenêtre d'affichage, ni à la taille de pixel réelle).

Dans la mesure où la technologie CSS autorise le contenu à dépasser la capacité de son conteneur, il peut s'avérer nécessaire d'utiliser la valeur `max-width: 100%` pour éviter le débordement d'images et d'autre contenu. Par exemple :


    img, embed, object, video {
      max-width: 100%;
    }
    

Veillez à fournir des descriptions explicites au moyen de l'attribut `alt` sur les éléments `img`. Elles contribuent à rendre votre site plus accessible en offrant du contexte aux lecteurs d'écran et à d'autres technologies assistives.

### Améliorer les éléments `img` avec l'attribut `srcset` pour les écrans à haute densité de pixels

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

L'attribut <code>srcset</code> améliore le comportement de l'élément <code>img</code>, facilitant ainsi la diffusion de plusieurs fichiers image pour différentes caractéristiques d'appareil. À l'instar de la <code>image-set</code> <a href="#use_image-set_to_provide_high_res_images">fonction CSS</a> native de CSS, l'attribut <code>srcset</code> permet au navigateur de choisir l'image idéale en fonction des caractéristiques de l'appareil ; par exemple, une image 2x sur un écran 2x et, à l'avenir, une image 1x sur un appareil 2x sur un réseau à faible débit.

<div class="clearfix"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Sur les navigateurs non compatibles avec l'attribut `srcset`, le fichier image par défaut spécifié par l'attribut `src` est utilisé. C'est pourquoi il est important de toujours inclure une image 1x pouvant être affichée sur tout appareil, quelles qu'en soient les capacités. Lorsque l'attribut `srcset` est accepté, une liste d'images/de conditions séparées par des virgules est analysée avant de formuler des requêtes, et seule l'image appropriée est téléchargée et affichée.

Les conditions peuvent inclure des éléments tels que la densité de pixels ou encore la largeur et la hauteur. Cependant, seule la densité de pixels bénéficie, à ce jour, d'une vaste prise en charge. Pour trouver le bon équilibre entre le comportement actuel et les fonctionnalités à venir, contentez-vous d'intégrer l'image 2x dans l'attribut.

### `Art direction` dans des images adaptatives avec l'élément `picture`

La modification d'images sur la base des caractéristiques de l'appareil (opération connue sous le nom d''art direction') peut être réalisée à l'aide de l'élément `picture`.  L'élément <code>picture</code> définit une solution déclarative pour fournir plusieurs versions d'une image sur la base de différentes caractéristiques, telles que la taille de l'appareil, la résolution, l'orientation, etc.

<img class="center" src="img/art-direction.png" alt="Exemple d'art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Note: L'élément <code>picture</code> commence à faire son apparition dans les navigateurs. Bien que cet élément ne soit pas encore disponible dans tous les navigateurs, il est conseillé de l'utiliser en raison de sa puissante rétrocompatibilité et de l'utilisation potentielle du <a href='http://picturefill.responsiveimages.org/'>polyfill Picturefill</a>. Pour plus d'informations, rendez-vous sur le site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

L'élément <code>picture</code> doit être utilisé lorsqu'une source d'image est présente dans plusieurs densités ou lorsque la conception de sites Web adaptatifs impose une image quelque peu différente sur certains types d'écrans. Comme c'est le cas pour l'élément <code>video</code>, plusieurs éléments <code>source</code> peuvent être inclus, ce qui permet de spécifier différents fichiers image en fonction des requêtes média ou du format d'image.

<div class="clearfix"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

Dans l'exemple ci-dessus, si la largeur du navigateur est d'au moins 800 pixels, le fichier `head.jpg` ou `head-2x.jpg` est utilisé suivant la résolution de l'appareil. Si la largeur du navigateur est comprise entre 450 pixels et 800 pixels, le fichier `head-small.jpg` ou `head-small-2x.jp` est utilisé, une fois encore en fonction de la résolution de l'appareil. Pour les largeurs d'écran inférieures à 450 pixels et pour offrir une rétrocompatibilité lorsque l'élément `picture` n'est pas accepté, le navigateur affiche plutôt l'élément `img`, lequel doit toujours être inclus.

#### Images à dimensionnement relatif

Si la taille définitive de l'image est inconnue, il peut s'avérer difficile de spécifier un descripteur de densité pour les sources d'images. Cela vaut tout particulièrement pour les images qui couvrent une largeur proportionnelle du navigateur et qui sont fluides, en fonction de la taille du navigateur. 

Au lieu de fournir des densités et des tailles d'image fixes, vous pouvez spécifier la taille de chaque image diffusée en ajoutant un descripteur de largeur avec la taille de l'élément d'image. Cela permet au navigateur de calculer automatiquement la densité de pixels effective et de choisir la meilleure image à télécharger.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

L'exemple ci-dessus affiche une image dont la largeur équivaut à la moitié de celle de la fenêtre d'affichage (sizes='50vw') et, en fonction de la largeur du navigateur et du rapport de pixel de l'appareil, permet au navigateur de choisir l'image appropriée, quelle que soit la taille de la fenêtre du navigateur. Le tableau ci-dessous illustre l'image qui sera choisie par le navigateur :

<table>
    <thead>
    <tr>
      <th data-th="Largeur du navigateur">Largeur du navigateur</th>
      <th data-th="Rapport de pixel de l'appareil">Rapport de pixel de l'appareil</th>
      <th data-th="Image utilisée">Image utilisée</th>
      <th data-th="Résolution effective">Résolution effective</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Largeur du navigateur">400 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">1</td>
      <td data-th="Image utilisée"><code>200.png</code></td>
      <td data-th="Résolution effective">1x</td>
    </tr>
    <tr>
      <td data-th="Largeur du navigateur">400 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">2</td>
      <td data-th="Image utilisée"><code>400.png</code></td>
      <td data-th="Résolution effective">2x</td>
    </tr>
    <tr>
      <td data-th="Largeur du navigateur">320 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">2</td>
      <td data-th="Image utilisée"><code>400.png</code></td>
      <td data-th="Résolution effective">2,5x</td>
    </tr>
    <tr>
      <td data-th="Largeur du navigateur">600 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">2</td>
      <td data-th="Image utilisée"><code>800.png</code></td>
      <td data-th="Résolution effective">2,67x</td>
    </tr>
    <tr>
      <td data-th="Largeur du navigateur">640 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">3</td>
      <td data-th="Image utilisée"><code>1000.png</code></td>
      <td data-th="Résolution effective">3,125x</td>
    </tr>
    <tr>
      <td data-th="Largeur du navigateur">1100 pixels</td>
      <td data-th="Rapport de pixel de l'appareil">1</td>
      <td data-th="Image utilisée"><code>1400.png</code></td>
      <td data-th="Résolution effective">1,27x</td>
    </tr>
  </tbody>
</table>


#### Tenir compte des points de rupture dans les images adaptatives

Dans la plupart des cas, il se peut que la taille ou l'image change en fonction des points de rupture de la mise en page du site. Sur un petit écran, par exemple, vous souhaitez que l'image occupe toute la largeur de la fenêtre d'affichage, alors qu'elle n'occupera qu'une petite partie sur un écran de plus grande dimension. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

L'attribut `sizes` dans l'exemple ci-dessus utilise plusieurs requêtes média pour spécifier la taille de l'image. Si la largeur du navigateur est supérieure à 600 pixels, l'image équivaut à 25 % de la largeur de la fenêtre d'affichage. Si elle est comprise entre 500 pixels et 600 pixels, l'image équivaut à 25 % de la largeur de la fenêtre d'affichage. En-dessous de 500 pixels, elle occupe toute la largeur.


### Rendre extensibles les images de produit

Les clients veulent voir ce qu'ils achètent. Les personnes qui visitent les sites de vente au détail veulent être en mesure d'afficher des gros-plans en haute résolution des produits qu'ils consultent afin d'en visualiser les moindres détails, comme l'a démontré cette [étude menée par Google et AnswerLab](/web/fundamentals/getting-started/principles/).

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Site Web J. Crew avec une image de produit extensible">
  <figcaption>Site Web J. Crew avec une image de produit extensible</figcaption>
</figure>

Le site J. Crew constitue un excellent exemple de source d'images extensibles sur lesquelles l'utilisateur peut appuyer. Une superposition 'escamotable' indique une image sur laquelle il est possible d'appuyer pour afficher une image agrandie présentant les détails les plus infimes du produit.


### Autres techniques relatives aux images

#### Images compressibles

La [technique d'image
compressible](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview){: .external} diffuse des images 2x fortement compressées vers tous les appareils, quelles qu'en soient les capacités réelles. En fonction du type d'image et du niveau de compression, la qualité d'image peut paraître inchangée, mais la taille du fichier diminue de manière significative.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html">Voir l'exemple</a>

Note: Soyez prudent lorsque vous utilisez la technique de compression, en raison des exigences supplémentaires sur le plan de la mémoire et du décodage. Le redimensionnement d'images sur des écrans de petite taille est une opération exigeante qui peut se révéler particulièrement laborieuse sur des appareils d'entrée de gamme disposant d'une mémoire et d'une puissance de traitement limitées.

#### Remplacement d'images JavaScript

La procédure de remplacement d'images JavaScript vérifie les capacités de l'appareil et 'agit en conséquence'. Vous pouvez déterminer le rapport de pixel de l'appareil à l'aide de `window.devicePixelRatio`, connaître la largeur et la hauteur de l'écran, et même procéder au reniflage de connexion réseau via `navigator.connection` ou émettre une fausse requête. Dès que vous avez collecté toutes ces informations, vous pouvez déterminer l'image à charger.

Le principal inconvénient de cette méthode est que l'utilisation du langage JavaScript diffère le chargement de l'image jusqu'à la fin de l'exécution de l'analyseur Look-Ahead, voire plus tard encore. En d'autres termes, le téléchargement des images ne commencera même pas avant le déclenchement de l'événement `pageload`. De plus, il est probable que le navigateur télécharge les images 1x et 2x entraînant, de ce fait, une augmentation du poids de la page.





## Images dans la propriété CSS 




La propriété CSS 'background' constitue un puissant outil pour ajouter des images complexes à des éléments, facilitant ainsi l'ajout de plusieurs images, leur répétition, etc.  Associée à des requêtes média, la propriété 'background' s'avère encore plus puissante et permet notamment le chargement conditionnel d'images sur la base de la résolution d'écran, de la taille de la fenêtre d'affichage, etc.



### TL;DR {: .hide-from-toc }
- Utilisez l'image la mieux adaptée aux caractéristiques de l'écran en tenant compte de la taille de lécran, de la résolution de l''appareil et de la mise en page.
- Dans le cas des écrans à haute densité de pixels, modifiez la propriété <code>background-image</code> dans la feuille de style à l'aide de requêtes média avec <code>min-resolution</code> et <code>-webkit-min-device-pixel-ratio</code>.
- Utilisez l'attribut 'srcset' pour fournir des images en haute résolution en plus de l'image 1x dans le balisage.
- Tenez compte des critères de performances lors de l'utilisation de techniques de remplacement d'images JavaScript ou lors de la diffusion d'images haute résolution utilisant un taux de compression élevé sur des appareils de plus faible résolution.


### Utiliser des requêtes média pour le chargement conditionnel d'images ou le changement des images en fonction des caractéristiques de l'appareil ('art direction')

Les requêtes média n'affectent pas seulement la mise en page. Vous pouvez également les utiliser pour le chargement conditionnel d'images ou le changement d'images en fonction de la largeur de la fenêtre d'affichage.

Dans l'exemple ci-dessous, seul le fichier `small.png` est téléchargé et appliqué à l'élément `div` de contenu sur les écrans de plus petite taille, tandis que, sur les écrans plus grands, `background-image: url(body.png)` est appliqué à `body` et `background-image: url(large.png)`, à l'élément `div` de contenu.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional"   adjust_indentation="auto" %}
</pre>

### Utiliser la fonction image-set pour fournir des images haute résolution

La fonction `image-set()` de CSS améliore le comportement de la propriété `background`, facilitant ainsi la diffusion de plusieurs fichiers image pour différentes caractéristiques d'appareil. Cela permet au navigateur de choisir l'image idéale en fonction des caractéristiques de l'appareil ; par exemple, une image 2x sur un écran 2x, ou bien une image 1x sur un appareil 2x sur un réseau à faible débit.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Outre le chargement de l'image appropriée, le navigateur la dimensionne
comme il se doit. En d'autres termes, le navigateur suppose que les images 2x sont deux fois plus grandes que les images 1x et les réduit donc selon un facteur 2, de sorte qu'elles semblent avoir la même taille sur la page.

La fonction `image-set()` est relativement récente et seuls les navigateurs Chrome et Safari l'acceptent actuellement avec le préfixe fournisseur `-webkit`. Il convient également de veiller à inclure une image de substitution lorsque la fonction `image-set()` n'est pas acceptée. Par exemple :

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset"   adjust_indentation="auto" %}
</pre>

Dans l'exemple ci-dessus, l'élément approprié est chargé dans les navigateurs compatibles avec la fonction `image-set`, tandis que l'élément 1x est utilisé dans les autres cas. Notons toutefois une restriction, et elle est de taille : dans la mesure où peu de navigateurs sont compatibles avec la fonction `image-set()`, la plupart d'entre eux recevront l'élément 1x.

## Utiliser des requêtes média pour fournir des images haute résolution ou changer les images en fonction des caractéristiques de l'appareil ('art direction')

Les requêtes média peuvent créer des règles sur la base du [rapport de pixel de l'appareil](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg){: .external}, ce qui permet de spécifier des images différentes pour les écrans 2x et 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Les navigateurs Chrome, Firefox et Opera acceptent tous la syntaxe `(min-resolution: 2dppx)` standard. Pour Safari et Android, en revanche, l'ancienne syntaxe sans `dppx` est requise. Pour rappel, ces styles ne sont chargés que si l'appareil correspond à la requête média. En outre, vous devez spécifier des styles pour le scénario de base. Cette méthode offre également l'avantage d'afficher quelque chose si le navigateur n'accepte pas les requêtes média spécifiques à la résolution.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx"   adjust_indentation="auto" %}
</pre>

Vous pouvez également utiliser la syntaxe `min-width` pour afficher d'autres images en fonction de la taille de la fenêtre d'affichage. L'avantage de cette technique est de ne pas télécharger l'image si la requête média ne correspond pas. Par exemple, le fichier `bg.png` n'est téléchargé et appliqué à l'élément `body` que si la largeur du navigateur est supérieure ou égale à 500 pixels :


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	





## Utiliser des images SVG pour les icônes 




Lorsque vous ajoutez des icônes à une page, utilisez des icônes SVG dans la mesure du possible ou, dans certains cas, des caractères Unicode.




### TL;DR {: .hide-from-toc }
- Pour les icônes, utilisez des images SVG ou des symboles Unicode à la place des images matricielles.


### Remplacer les icônes simples par des symboles Unicode

De nombreuses polices sont compatibles avec les innombrables symboles Unicode disponibles, qui peuvent remplacer des images.  À la différence de ces dernières, les polices Unicode sont bien adaptées au changements de taille et leur apparence est parfaite, quelle que soit la taille d'affichage sur l'écran.

Outre le jeu de caractères normal, Unicode peut contenir des symboles pour certains formats de nombres (&#8528;), des flèches (&#8592;), des signes mathématiques (&#8730;), des formes géométriques (&#9733;), des images de commandes (&#9654;), des motifs en braille (&#10255;), des notes de musique (&#9836;), des lettres de l'alphabet grec (&#937;) et même des pièces de jeu d'échecs (&#9822;).

Pour inclure un caractère unicode, vous devez utiliser le même format que pour les entités nommées : `&#XXXX`, `XXXX` représentant le numéro de caractère Unicode. Par exemple :


    Vous êtes une super &#9733;
    

Vous êtes une super &#9733;

### Remplacer les icônes complexes par des icônes SVG
Pour les icônes dont les besoins sont plus complexes, les icônes SVG sont généralement d'un poids modéré, faciles à utiliser et peuvent être formatées avec CSS. Les icônes SVG présentent de nombreux avantages par rapports aux images matricielles :

* Ce sont des graphiques vectoriels dont on peut modifier la taille à l'infini.
* Les effets CSS, tels que la couleur, l'ombrage, la transparence et les animations s'appliquent directement.
* Les images SVG peuvent être intégrées dans le document lui-même.
* Elles sont sémantiques.
* Elles permettent une meilleure accessibilité avec les attributs appropriés.

&nbsp;

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg"   adjust_indentation="auto" %}
</pre>

### Utiliser les polices d'icônes avec précaution

Les polices d'icône sont populaires et peuvent être faciles à utiliser. En revanche, elles ont certains inconvénients par rapport aux icônes SVG.

* Ce sont des graphiques vectoriels dont on peut modifier la taille à l'infini. Mais elles font parfois l'objet d'un anti-crénelage, ce qui génère des icônes moins fines que prévu.
* Styles limités avec CSS.
* Il est parfois difficile de les positionner parfaitement au pixel près, selon la hauteur de ligne, l'espacement des lettres, etc.
* Elles ne sont pas sémantiques et peuvent être difficiles à utiliser avec des lecteurs d'écran ou d'autres technologies d'assistance.
* Si elles ne sont pas conçues correctement, elles peuvent générer un fichier de taille importante pour une utilisation limitée à un petit sous-groupe d'icônes, parmi celles qui sont disponibles. 



<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Exemple de page dans laquelle FontAwesome a été utilisé pour les icônes de type police.">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont"   adjust_indentation="auto" %}
</pre>

Des centaines de polices d'icônes gratuites et payantes existent, notamment [Font Awesome](http://fortawesome.github.io/Font-Awesome/){: .external }, [Pictos](http://pictos.cc/){: .external} et [Glyphicons](http://glyphicons.com/){: .external}.

Veillez à comparer le poids de la demande HTTP et de la taille de fichier supplémentaires avec le besoin en icônes. Par exemple, si vous n'avez besoin que de quelques icônes, il peut s'avérer plus judicieux d'utiliser une image ou un sprite d'images.





## Optimiser les images dans une optique de performances 




Les images comptent souvent pour la majorité des octets téléchargés. De plus, elles occupent généralement une grande partie de l'espace visuel sur la page. Par conséquent, leur optimisation peut vous permettre de réaliser des économies d'octets considérables et d'améliorer sensiblement les performances de votre site Web : moins le navigateur devra télécharger d'octets, moins il y aura de concurrence pour la bande passante du client, et plus vite le navigateur pourra télécharger et afficher tous les éléments.


### TL;DR {: .hide-from-toc }
- Ne choisissez pas un format d''image au hasard, mais tâchez d''utiliser le format le mieux adapté en parfaite connaissance de cause.
- Intégrez des outils de compression et d'optimisation d'images dans votre flux de travail afin de réduire la taille des fichiers.
- Placez les images fréquemment utilisées dans des sprites d'image en vue de réduire le nombre de requêtes HTTP.
- Il est judicieux de ne charger les images qu'après leur défilement afin d'accélérer le chargement initial de la page et de réduire son poids initial.


### Choisir le bon format

Vous devez prendre en compte deux types d'images : les [images vectorielles](http://fr.wikipedia.org/wiki/Image_vectorielle){: .external } et les [images matricielles](http://fr.wikipedia.org/wiki/Image_matricielle){: .external }. Dans le cas des images matricielles, vous devez également choisir le format de compression adéquat ; "GIF", "PNG" ou "JPG", par exemple.

Les **images matricielles**, telles que les photos et d'autres images, sont représentées sous la forme d'une grille de points individuels ou pixels. Elles proviennent généralement d'un appareil photo ou d'un scanner, ou elles peuvent être créées dans le navigateur à l'aide de l'élément `canvas`. Plus ces images sont grandes, plus la taille du fichier est importante. Lorsque ces images sont redimensionnées au-delà de leur taille initiale, elles deviennent floues, car le navigateur doit 'deviner' comment remplir les pixels manquants.

Les **images vectorielles**, telles que les logos et les illustrations au trait, sont définies par un ensemble de courbes, de lignes, de formes et de couleurs de remplissage. Elles sont créées à l'aide de programmes comme Adobe Illustrator et Inkscape, et enregistrées dans un format vectoriel tel que ['SVG'](http://css-tricks.com/using-svg/){: .external }. Les images vectorielles étant basées sur des primitives simples, leur dimensionnement n'entraîne aucune perte de qualité, ni modification de la taille du fichier.

Pour déterminer le format adéquat, il importe de tenir compte de l'origine de l'image (matricielle ou vectorielle), ainsi que du contenu (couleurs, animation, texte, etc.). Il n'existe pas de format idéal pour tous les types d'image, et chaque format présente des avantages et des inconvénients.

Pour prendre la bonne décision, commencez par appliquer ces quelques directives :

* Utilisez le format `JPG` pour les images photographiques.
* Utilisez le format `SVG` pour les illustrations vectorielles et les graphiques unis tels que les logos et les illustrations au trait.
  Si les illustrations vectorielles ne sont pas disponibles, essayez donc le format WebP ou PNG.
* Utilisez le format `PNG` plutôt que `GIF`, car il autorise davantage de couleurs et offre de meilleurs taux de compression.
* Pour les animations plus longues, il est conseillé d'utiliser l'élément `<video>` qui offre une meilleure qualité d'image et permet à l'utilisateur de contrôler la lecture.

### Réduire la taille de fichier

Il est possible de réduire sensiblement la taille du fichier image en le soumettant à un post-traitement après l'avoir enregistré. Il existe tout un éventail d'outils destinés à la compression d'images : avec et sans perte, en ligne, avec interface graphique, par ligne de commande, etc. Lorsque cela s'avère possible, il est conseillé d'automatiser l'optimisation des images, de sorte qu'elle soit considérée comme un objet de première classe dans votre flux de travail.

Plusieurs outils permettent d'effectuer une compression sans perte plus poussée sur les fichiers `JPG` et `PNG`, sans nuire à la qualité d'image. Pour le format `JPG`, essayez [jpegtran](http://jpegclub.org/){: .external } ou [jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external} (disponible seulement sur Linux ; à exécuter avec l'option --strip-all). Pour le format `PNG`, essayez [OptiPNG](http://optipng.sourceforge.net/){: .external} ou [PNGOUT](http://www.advsys.net/ken/util/pngout.htm){: .external}.

### Utiliser des sprites d'image

La création de sprites CSS est une technique par laquelle plusieurs images sont regroupées dans un seul fichier appelé `sprite sheet`. Les images individuelles peuvent ensuite être utilisées en indiquant l'image d'arrière-plan d'un élément (la `sprite sheet`), plus un décalage pour afficher la partie appropriée.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt=""Sprite sheet" utilisée comme exemple"></a>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite"   adjust_indentation="auto" %}
</pre>

L'avantage de cette technique est de réduire le nombre de téléchargements requis pour obtenir plusieurs images, tout en permettant la mise en cache.

### Lazy Loading

La technique de Lazy Loading permet d'accélérer sensiblement le chargement des longues pages qui comportent de nombreuses images sous la ligne de flottaison. Pour ce faire, les images sont chargées suivant les besoins ou une fois le chargement et le rendu du contenu principal terminés. Outre les améliorations qu'elle apporte sur le plan des performances, cette technique permet de créer des interfaces en défilement infini.

Soyez prudent lorsque vous créez des pages en défilement infini. En effet, puisque le contenu est chargé à mesure qu'il devient visible, il se peut que les moteurs de recherche ne le détectent jamais. De plus, les utilisateurs qui s'attendent à trouver des informations dans le pied de page ne les verront jamais, car du nouveau contenu est chargé en permanence.

{# include shared/related_guides.liquid inline=true list=page.related-guides.optimize #}






## Éviter complètement les images 




Dans certains cas, l'image idéale n'est, en réalité, pas du tout une image. Dans la mesure du possible, utilisez les capacités natives du navigateur pour proposer des fonctions identiques ou similaires.  Les navigateurs génèrent des éléments visuels qui, auparavant, auraient nécessité des images. Outre le fait que les navigateurs ne doivent plus télécharger de fichiers image distincts, cela permet d'éviter que les images ne soient dimensionnées de façon maladroite. Les icônes peuvent être affichées à l'aide de polices Unicode ou de polices d'icônes spéciales.




### TL;DR {: .hide-from-toc }
- Évitez d''utiliser des images lorsque cela s''avère possible. Utilisez plutôt les fonctionnalités offertes par le navigateur pour les ombres, les dégradés, les coins arrondis, etc.


### Placer du texte dans des balises plutôt que l'intégrer dans des images

Dans la mesure du possible, évitez d'intégrer le texte dans des images. Évitez, par exemple, d'utiliser des images comme titres ou encore de placer directement des informations telles que des numéros de téléphone ou des adresses dans des images. Outre le fait que ces informations ne peuvent pas être copiées et collées par les utilisateurs, elles sont inexploitables par les lecteurs d'écran et n'offrent aucune souplesse d'adaptation. Placez plutôt le texte dans le balisage et, au besoin, utilisez des polices Web pour obtenir le style souhaité.

### Utiliser CSS pour remplacer des images

Les navigateurs modernes peuvent utiliser des fonctionnalités CSS pour créer des styles qui, auparavant, auraient nécessité des images. Quelques exemples : des dégradés complexes peuvent être créés à l'aide de la propriété <code>background</code>, des ombres peuvent être créées à l'aide de <code>box-shadow</code> et des coins arrondis peuvent être ajoutés à l'aide de la propriété <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Veuillez noter que l'utilisation de ces techniques exige des cycles de rendu, qui peuvent être relativement importants sur des appareils mobiles. En cas d'utilisation excessive, vous risquez de perdre les éventuels avantages obtenus et une baisse des performances est possible.



