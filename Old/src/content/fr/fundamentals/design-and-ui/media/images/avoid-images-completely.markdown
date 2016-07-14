---
title: "Éviter complètement les images"
description: "Dans certains cas, l'image idéale n'est, en réalité, pas du tout une image. Dans la mesure du possible, utilisez les capacités natives du navigateur pour proposer des fonctions identiques ou similaires."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - "Évitez d'utiliser des images lorsque cela s'avère possible. Utilisez plutôt les fonctionnalités offertes par le navigateur pour les ombres, les dégradés, les coins arrondis, etc."
---

<p class="intro">
  Dans certains cas, l'image idéale n'est, en réalité, pas du tout une image. Dans la mesure du possible, utilisez les capacités natives du navigateur pour proposer des fonctions identiques ou similaires.  Les navigateurs génèrent des éléments visuels qui, auparavant, auraient nécessité des images. Outre le fait que les navigateurs ne doivent plus télécharger de fichiers image distincts, cela permet d'éviter que les images ne soient dimensionnées de façon maladroite. Les icônes peuvent être affichées à l'aide de polices Unicode ou de polices d'icônes spéciales.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Placer du texte dans des balises plutôt que l'intégrer dans des images

Dans la mesure du possible, évitez d'intégrer le texte dans des images. Évitez, par exemple, d'utiliser des images comme titres ou encore de placer directement des informations telles que des numéros de téléphone ou des adresses dans des images. Outre le fait que ces informations ne peuvent pas être copiées et collées par les utilisateurs, elles sont inexploitables par les lecteurs d'écran et n'offrent aucune souplesse d'adaptation. Placez plutôt le texte dans le balisage et, au besoin, utilisez des polices Web pour obtenir le style souhaité.

## Utiliser CSS pour remplacer des images

Les navigateurs modernes peuvent utiliser des fonctionnalités CSS pour créer des styles qui, auparavant, auraient nécessité des images. Quelques exemples : des dégradés complexes peuvent être créés à l'aide de la propriété <code>background</code>, des ombres peuvent être créées à l'aide de <code>box-shadow</code> et des coins arrondis peuvent être ajoutés à l'aide de la propriété <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Veuillez noter que l'utilisation de ces techniques exige des cycles de rendu, qui peuvent être relativement importants sur des appareils mobiles. En cas d'utilisation excessive, vous risquez de perdre les éventuels avantages obtenus et une baisse des performances est possible.



