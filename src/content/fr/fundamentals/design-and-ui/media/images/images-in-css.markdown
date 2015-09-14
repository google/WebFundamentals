---
title: "Images dans la propriété CSS"
description: "La propriété CSS 'background' constitue un puissant outil pour ajouter des images complexes à des éléments, facilitant ainsi l'ajout de plusieurs images, leur répétition, etc."
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
---

<p class="intro">
  La propriété CSS 'background' constitue un puissant outil pour ajouter des images complexes à des éléments, facilitant ainsi l'ajout de plusieurs images, leur répétition, etc.  Associée à des requêtes média, la propriété 'background' s'avère encore plus puissante et permet notamment le chargement conditionnel d'images sur la base de la résolution d'écran, de la taille de la fenêtre d'affichage, etc.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Utiliser des requêtes média pour le chargement conditionnel d'images ou le changement des images en fonction des caractéristiques de l'appareil ('art direction')

Les requêtes média n'affectent pas seulement la mise en page. Vous pouvez également les utiliser pour le chargement conditionnel d'images ou le changement d'images en fonction de la largeur de la fenêtre d'affichage.

Dans l'exemple ci-dessous, seul le fichier `small.png` est téléchargé et appliqué à l'élément `div` de contenu sur les écrans de plus petite taille, tandis que, sur les écrans plus grands, `background-image: url(body.png)` est appliqué à `body` et `background-image: url(large.png)`, à l'élément `div` de contenu.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

## Utiliser la fonction image-set pour fournir des images haute résolution

La fonction `image-set()` de CSS améliore le comportement de la propriété `background`, facilitant ainsi la diffusion de plusieurs fichiers image pour différentes caractéristiques d'appareil. Cela permet au navigateur de choisir l'image idéale en fonction des caractéristiques de l'appareil ; par exemple, une image 2x sur un écran 2x, ou bien une image 1x sur un appareil 2x sur un réseau à faible débit.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

Outre le chargement de l'image appropriée, le navigateur la dimensionne
comme il se doit. En d'autres termes, le navigateur suppose que les images 2x sont deux fois plus grandes que les images 1x et les réduit donc selon un facteur 2, de sorte qu'elles semblent avoir la même taille sur la page.

La fonction `image-set()` est relativement récente et seuls les navigateurs Chrome et Safari l'acceptent actuellement avec le préfixe fournisseur `-webkit`. Il convient également de veiller à inclure une image de substitution lorsque la fonction `image-set()` n'est pas acceptée. Par exemple :

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

Dans l'exemple ci-dessus, l'élément approprié est chargé dans les navigateurs compatibles avec la fonction `image-set`, tandis que l'élément 1x est utilisé dans les autres cas. Notons toutefois une restriction, et elle est de taille : dans la mesure où peu de navigateurs sont compatibles avec la fonction `image-set()`, la plupart d'entre eux recevront l'élément 1x.

      ## Utiliser des requêtes média pour fournir des images haute résolution ou changer les images en fonction des caractéristiques de l'appareil ('art direction')

Les requêtes média peuvent créer des règles sur la base du [rapport de pixel de l'appareil](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), ce qui permet de spécifier des images différentes pour les écrans 2x et 1x.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Les navigateurs Chrome, Firefox et Opera acceptent tous la syntaxe `(min-resolution: 2dppx)` standard. Pour Safari et Android, en revanche, l'ancienne syntaxe sans `dppx` est requise. Pour rappel, ces styles ne sont chargés que si l'appareil correspond à la requête média. En outre, vous devez spécifier des styles pour le scénario de base. Cette méthode offre également l'avantage d'afficher quelque chose si le navigateur n'accepte pas les requêtes média spécifiques à la résolution.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

Vous pouvez également utiliser la syntaxe `min-width` pour afficher d'autres images en fonction de la taille de la fenêtre d'affichage. L'avantage de cette technique est de ne pas télécharger l'image si la requête média ne correspond pas. Par exemple, le fichier `bg.png` n'est téléchargé et appliqué à l'élément `body` que si la largeur du navigateur est supérieure ou égale à 500 pixels :

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}	



