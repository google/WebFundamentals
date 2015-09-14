---
title: "Images dans le balisage"
description: "Particulièrement puissant, l'élément 'img' télécharge, décode et affiche du contenu. De plus, les navigateurs modernes sont compatibles avec un large éventail de formats d'image."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Utilisez des tailles relatives pour les images afin d'éviter tout dépassement accidentel de la capacité du conteneur."
    - "Utilisez l'élément <code>picture</code> pour spécifier des images différentes en fonction des caractéristiques de l'appareil (c'est ce que l'on désigne sous le nom d''art direction')."
    - "Utilisez l'attribut <code>srcset</code> et le descripteur <code>x</code> dans l'élément <code>img</code> pour fournir au navigateur des indications quant à la meilleure image à utiliser parmi différentes densités."
notes:
  picture-support:
    - "L'élément <code>picture</code> commence à faire son apparition dans les navigateurs. Bien que cet élément ne soit pas encore disponible dans tous les navigateurs, il est conseillé de l'utiliser en raison de sa puissante rétrocompatibilité et de l'utilisation potentielle du <a href='http://picturefill.responsiveimages.org/'>polyfill Picturefill</a>. Pour plus d'informations, rendez-vous sur le site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>."
  compressive:
    - "Soyez prudent lorsque vous utilisez la technique de compression, en raison des exigences supplémentaires sur le plan de la mémoire et du décodage. Le redimensionnement d'images sur des écrans de petite taille est une opération exigeante qui peut se révéler particulièrement laborieuse sur des appareils d'entrée de gamme disposant d'une mémoire et d'une puissance de traitement limitées."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  Particulièrement puissant, l'élément `img` télécharge, décode et affiche du contenu. De plus, les navigateurs modernes sont compatibles avec un large éventail de formats d'image. Inclure des images compatibles avec plusieurs appareils ne diffère pas de la méthode utilisée pour les ordinateurs de bureau. Il suffit de quelques réglages mineurs pour garantir une expérience utilisateur optimale.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Appliquer des tailles relatives aux images

Pensez à utiliser des unités relatives lors de l'indication de largeurs pour les images afin d'éviter tout dépassement accidentel de la capacité de la fenêtre d'affichage. Si vous définissez, par exemple, la valeur `width: 50%;`, la largeur de l'image équivaudra à 50 % de l'élément conteneur (et non à la fenêtre d'affichage, ni à la taille de pixel réelle).

Dans la mesure où la technologie CSS autorise le contenu à dépasser la capacité de son conteneur, il peut s'avérer nécessaire d'utiliser la valeur `max-width: 100%` pour éviter le débordement d'images et d'autre contenu. Par exemple :

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Veillez à fournir des descriptions explicites au moyen de l'attribut `alt` sur les éléments `img`. Elles contribuent à rendre votre site plus accessible en offrant du contexte aux lecteurs d'écran et à d'autres technologies assistives.

## Améliorer les éléments `img` avec l'attribut `srcset` pour les écrans à haute densité de pixels

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      L'attribut <code>srcset</code> améliore le comportement de l'élément <code>img</code>, facilitant ainsi la diffusion de plusieurs fichiers image pour différentes caractéristiques d'appareil. À l'instar de la <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">fonction CSS</a> native de CSS, l'attribut <code>srcset</code> permet au navigateur de choisir l'image idéale en fonction des caractéristiques de l'appareil ; par exemple, une image 2x sur un écran 2x et, à l'avenir, une image 1x sur un appareil 2x sur un réseau à faible débit.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

Sur les navigateurs non compatibles avec l'attribut `srcset`, le fichier image par défaut spécifié par l'attribut `src` est utilisé. C'est pourquoi il est important de toujours inclure une image 1x pouvant être affichée sur tout appareil, quelles qu'en soient les capacités. Lorsque l'attribut `srcset` est accepté, une liste d'images/de conditions séparées par des virgules est analysée avant de formuler des requêtes, et seule l'image appropriée est téléchargée et affichée.

Les conditions peuvent inclure des éléments tels que la densité de pixels ou encore la largeur et la hauteur. Cependant, seule la densité de pixels bénéficie, à ce jour, d'une vaste prise en charge. Pour trouver le bon équilibre entre le comportement actuel et les fonctionnalités à venir, contentez-vous d'intégrer l'image 2x dans l'attribut.

## `Art direction` dans des images adaptatives avec l'élément `picture`

La modification d'images sur la base des caractéristiques de l'appareil (opération connue sous le nom d''art direction') peut être réalisée à l'aide de l'élément `picture`.  L'élément <code>picture</code> définit une solution déclarative pour fournir plusieurs versions d'une image sur la base de différentes caractéristiques, telles que la taille de l'appareil, la résolution, l'orientation, etc.

<img class="center" src="img/art-direction.png" alt="Exemple d'art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      L'élément <code>picture</code> doit être utilisé lorsqu'une source d'image est présente dans plusieurs densités ou lorsque la conception de sites Web adaptatifs impose une image quelque peu différente sur certains types d'écrans. Comme c'est le cas pour l'élément <code>video</code>, plusieurs éléments <code>source</code> peuvent être inclus, ce qui permet de spécifier différents fichiers image en fonction des requêtes média ou du format d'image.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

Dans l'exemple ci-dessus, si la largeur du navigateur est d'au moins 800 pixels, le fichier `head.jpg` ou `head-2x.jpg` est utilisé suivant la résolution de l'appareil. Si la largeur du navigateur est comprise entre 450 pixels et 800 pixels, le fichier `head-small.jpg` ou `head-small-2x.jp` est utilisé, une fois encore en fonction de la résolution de l'appareil. Pour les largeurs d'écran inférieures à 450 pixels et pour offrir une rétrocompatibilité lorsque l'élément `picture` n'est pas accepté, le navigateur affiche plutôt l'élément `img`, lequel doit toujours être inclus.

### Images à dimensionnement relatif

Si la taille définitive de l'image est inconnue, il peut s'avérer difficile de spécifier un descripteur de densité pour les sources d'images. Cela vaut tout particulièrement pour les images qui couvrent une largeur proportionnelle du navigateur et qui sont fluides, en fonction de la taille du navigateur. 

Au lieu de fournir des densités et des tailles d'image fixes, vous pouvez spécifier la taille de chaque image diffusée en ajoutant un descripteur de largeur avec la taille de l'élément d'image. Cela permet au navigateur de calculer automatiquement la densité de pixels effective et de choisir la meilleure image à télécharger.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

L'exemple ci-dessus affiche une image dont la largeur équivaut à la moitié de celle de la fenêtre d'affichage (sizes='50vw') et, en fonction de la largeur du navigateur et du rapport de pixel de l'appareil, permet au navigateur de choisir l'image appropriée, quelle que soit la taille de la fenêtre du navigateur. Le tableau ci-dessous illustre l'image qui sera choisie par le navigateur :

<table class="mdl-data-table mdl-js-data-table">
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


### Tenir compte des points de rupture dans les images adaptatives

Dans la plupart des cas, il se peut que la taille ou l'image change en fonction des points de rupture de la mise en page du site. Sur un petit écran, par exemple, vous souhaitez que l'image occupe toute la largeur de la fenêtre d'affichage, alors qu'elle n'occupera qu'une petite partie sur un écran de plus grande dimension. 

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

L'attribut `sizes` dans l'exemple ci-dessus utilise plusieurs requêtes média pour spécifier la taille de l'image. Si la largeur du navigateur est supérieure à 600 pixels, l'image équivaut à 25 % de la largeur de la fenêtre d'affichage. Si elle est comprise entre 500 pixels et 600 pixels, l'image équivaut à 25 % de la largeur de la fenêtre d'affichage. En-dessous de 500 pixels, elle occupe toute la largeur.


## Rendre extensibles les images de produit

Les clients veulent voir ce qu'ils achètent. Les personnes qui visitent les sites de vente au détail veulent être en mesure d'afficher des gros-plans en haute résolution des produits qu'ils consultent afin d'en visualiser les moindres détails, comme l'a démontré cette [étude menée par Google et AnswerLab](/web/fundamentals/principles/research-study.html).

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Site Web J. Crew avec une image de produit extensible">
  <figcaption>Site Web J. Crew avec une image de produit extensible</figcaption>
</figure>

Le site J. Crew constitue un excellent exemple de source d'images extensibles sur lesquelles l'utilisateur peut appuyer. Une superposition 'escamotable' indique une image sur laquelle il est possible d'appuyer pour afficher une image agrandie présentant les détails les plus infimes du produit.


## Autres techniques relatives aux images

### Images compressibles

La [technique d'image
compressible](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) diffuse des images 2x fortement compressées vers tous les appareils, quelles qu'en soient les capacités réelles. En fonction du type d'image et du niveau de compression, la qualité d'image peut paraître inchangée, mais la taille du fichier diminue de manière significative.

{% link_sample _code/compressive.html %}
      Voir l'exemple
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.notes.compressive %}

### Remplacement d'images JavaScript

La procédure de remplacement d'images JavaScript vérifie les capacités de l'appareil et 'agit en conséquence'. Vous pouvez déterminer le rapport de pixel de l'appareil à l'aide de `window.devicePixelRatio`, connaître la largeur et la hauteur de l'écran, et même procéder au reniflage de connexion réseau via `navigator.connection` ou émettre une fausse requête. Dès que vous avez collecté toutes ces informations, vous pouvez déterminer l'image à charger.

Le principal inconvénient de cette méthode est que l'utilisation du langage JavaScript diffère le chargement de l'image jusqu'à la fin de l'exécution de l'analyseur Look-Ahead, voire plus tard encore. En d'autres termes, le téléchargement des images ne commencera même pas avant le déclenchement de l'événement `pageload`. De plus, il est probable que le navigateur télécharge les images 1x et 2x entraînant, de ce fait, une augmentation du poids de la page.



