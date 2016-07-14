---
title: "Utiliser des images SVG pour les icônes"
description: "Lorsque vous ajoutez des icônes à une page, utilisez des icônes SVG dans la mesure du possible ou, dans certains cas, des caractères Unicode."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - "Pour les icônes, utilisez des images SVG ou des symboles Unicode à la place des images matricielles."
---

<p class="intro">
  Lorsque vous ajoutez des icônes à une page, utilisez des icônes SVG dans la mesure du possible ou, dans certains cas, des caractères Unicode.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Remplacer les icônes simples par des symboles Unicode

De nombreuses polices sont compatibles avec les innombrables symboles Unicode disponibles, qui peuvent remplacer des images.  À la différence de ces dernières, les polices Unicode sont bien adaptées au changements de taille et leur apparence est parfaite, quelle que soit la taille d'affichage sur l'écran.

Outre le jeu de caractères normal, Unicode peut contenir des symboles pour certains formats de nombres (&#8528;), des flèches (&#8592;), des signes mathématiques (&#8730;), des formes géométriques (&#9733;), des images de commandes (&#9654;), des motifs en braille (&#10255;), des notes de musique (&#9836;), des lettres de l'alphabet grec (&#937;) et même des pièces de jeu d'échecs (&#9822;).

Pour inclure un caractère unicode, vous devez utiliser le même format que pour les entités nommées : `&#XXXX`, `XXXX` représentant le numéro de caractère Unicode. Par exemple :

{% highlight html %}
Vous êtes une super &#9733;
{% endhighlight %}

Vous êtes une super &#9733;

## Remplacer les icônes complexes par des icônes SVG
Pour les icônes dont les besoins sont plus complexes, les icônes SVG sont généralement d'un poids modéré, faciles à utiliser et peuvent être formatées avec CSS. Les icônes SVG présentent de nombreux avantages par rapports aux images matricielles :

* Ce sont des graphiques vectoriels dont on peut modifier la taille à l'infini.
* Les effets CSS, tels que la couleur, l'ombrage, la transparence et les animations s'appliquent directement.
* Les images SVG peuvent être intégrées dans le document lui-même.
* Elles sont sémantiques.
* Elles permettent une meilleure accessibilité avec les attributs appropriés.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Utiliser les polices d'icônes avec précaution

Les polices d'icône sont populaires et peuvent être faciles à utiliser. En revanche, elles ont certains inconvénients par rapport aux icônes SVG.

* Ce sont des graphiques vectoriels dont on peut modifier la taille à l'infini. Mais elles font parfois l'objet d'un anti-crénelage, ce qui génère des icônes moins fines que prévu.
* Styles limités avec CSS.
* Il est parfois difficile de les positionner parfaitement au pixel près, selon la hauteur de ligne, l'espacement des lettres, etc.
* Elles ne sont pas sémantiques et peuvent être difficiles à utiliser avec des lecteurs d'écran ou d'autres technologies d'assistance.
* Si elles ne sont pas conçues correctement, elles peuvent générer un fichier de taille importante pour une utilisation limitée à un petit sous-groupe d'icônes, parmi celles qui sont disponibles. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Exemple de page dans laquelle FontAwesome a été utilisé pour les icônes de type police.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

Des centaines de polices d'icônes gratuites et payantes existent, notamment [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) et [Glyphicons](http://glyphicons.com/).

Veillez à comparer le poids de la demande HTTP et de la taille de fichier supplémentaires avec le besoin en icônes. Par exemple, si vous n'avez besoin que de quelques icônes, il peut s'avérer plus judicieux d'utiliser une image ou un sprite d'images.



