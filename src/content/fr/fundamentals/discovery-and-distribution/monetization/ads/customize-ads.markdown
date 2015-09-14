---
title: "Personnaliser vos annonces"
description: "Les meilleures annonces peuvent améliorer l'expérience utilisateur. Alors que le contenu des annonces provient de l'annonceur, vous contrôlez le type de contenu, la couleur, la taille et l'emplacement de ces annonces."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - "Ne placez jamais d'annonces à un emplacement sur lequel elles pourraient gêner la navigation de l'internaute sur le site. Assurez-vous que les annonces placées au-dessus du pli ne poussent pas de contenu important au-dessous de celui-ci."
    - "Utilisez toujours des blocs d'annonces adaptatives. Si le dimensionnement intelligent ne suffit pas, passez en mode avancé."
    - "Recherchez les possibilités d'intégrer les annonces au sein du contenu, afin d'éviter qu'elles ne soient pas visibles."
    - "Sélectionnez des styles de texte qui s'intègrent, mettent en valeur ou contrastent avec votre site."
notes:
  targeting:
    - "Les annonces sont ciblées en fonction du contenu du site dans son ensemble et non selon des mots clés ou des catégories. Si vous souhaitez afficher des annonces associées à des thèmes spécifiques, intégrez des phrases et des paragraphes entiers relatifs aux thèmes en question."
  testing:
    - "Testez toujours vos annonces sur différents appareils et écrans afin de vous assurer que le mécanisme adaptatif fonctionne correctement."
  images:
    - "Les annonceurs contrôlent totalement l'apparence de leurs annonces graphiques. Vous pouvez influer sur le type d'annonces graphiques qui figurent sur votre site à l'aide des paramètres d'emplacement et de taille d'annonces, mais vous ne pouvez pas contrôler le contenu de l'image."
---

<p class="intro">
  Les meilleures annonces peuvent améliorer l'expérience utilisateur. Alors que le contenu des annonces provient de l'annonceur, vous contrôlez le type de contenu, la couleur, la taille et l'emplacement de ces annonces.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Placez les annonces  en veillant au confort de l'internaute

Lorsqu'il s'agit de décider de l'emplacement des annonces sur votre site
et de leur nombre, pensez d'abord à l'internaute.

* Utilisez les annonces pour augmenter le contenu du site et non l'inverse..
* Les pages qui contiennent un nombre d'annonces excessif, des annonces qui poussent le contenu important au-dessous du pli, des annonces regroupées qui dominent l'espace visible ou qui ne sont pas clairement indiquées entraînent une baisse de la satisfaction de l'internaute. De plus, elles sont contraires au règlement Google AdSense.
* Veillez à ce que les annonces apportent une valeur ajoutée à l'utilisateur. Si certains de vos blocs d'annonces génèrent beaucoup moins de revenus ou entraînent moins de clics ou de vues, il est probable qu'ils n'apportent pas de valeur ajoutée.

Exemple d'options d'emplacement pour les annonces pour mobiles :

<img src="images/mobile_ads_placement.png" class="center" alt="Exemple d'annonce graphique pour mobile">

Pour en savoir plus, consultez les 
[bonnes pratiques relatives à l'emplacement des annonces](https://support.google.com/adsense/answer/1282097) de Google AdSense.


## Que faire si le dimensionnement adaptatif ne suffit pas ?
Dans certains cas, il arrive que vous ayez besoin de contrôler davantage l'affichage de vos annonces qu'en utilisant les annonces adaptatives. Dans ce cas, vous pouvez passer au mode avancé et remplacer le dimensionnement intelligent dans le code du bloc d'annonces adaptatives. 
Par exemple, vous pouvez contrôler le dimensionnement exact des annonces à l'aide de [requêtes média]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) :

1. Suivez les instructions pour [créer un bloc d'annonces adaptatives]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. Dans la fenêtre de code de l'annonce, sélectionnez le mode <strong>Avancé (modification du code obligatoire)</strong> dans la liste déroulante 'Mode'.
3. Modifiez le code de l'annonce pour définir les dimensions exactes de votre annonce en fonction de l'appareil de l'utilisateur :

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Faites un essai
{% endlink_sample %}

Pour en savoir plus, consultez l'article [Fonctionnalités avancées](https://support.google.com/adsense/answer/3543893) dans le centre d'aide Google AdSense.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Sélectionnez des styles qui mettent votre site en valeur

Les [annonces les plus efficaces](https://support.google.com/adsense/answer/17957) s'harmonisent ou contrastent avec le style de votre site. Le site Google AdSense offre un ensemble de [styles d'annonces prédéfinis](https://support.google.com/adsense/answer/6002585). Sélectionnez celui qui convient le mieux à votre site ou créez votre propre style.

### Les éléments personnalisables

Dans les annonces textuelles, vous pouvez personnaliser tous les éléments de styles suivants :

* Couleur des bordures
* Couleur de l'arrière-plan
* Famille de police de texte et taille de la police
* Couleur de texte par défaut
* Couleur de texte spécifique au titre de l'annonce
* Couleur de texte spécifique aux URL

### Comment appliquer des styles

Lors de la création d'un nouveau bloc, pour appliquer un style différent aux annonces textuelles, développez la propriété <strong>Style de l'annonce textuelle</strong> :

<img src="images/customize.png" class="center" alt="Styles d'annonce textuelle">

Toutes les annonces textuelles utilisent le style <strong>par défaut</strong> de Google AdSense.  Vous pouvez utiliser tous les styles prédéfinis tels quels, leur apporter de légères modifications ou créer votre propre style personnalisé.

Une fois que vous avez enregistré un nouveau style, vous pouvez l'appliquer à tous les blocs d'annonces existants ou 
aux nouveaux blocs :

1. Accédez à la section [Ajouter des styles](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Sélectionnez le style que vous souhaitez modifier dans la liste des <strong>Styles d'annonce disponibles pour tous vos produits actifs</strong>.
3. Effectuez les modifications souhaitées, puis cliquez sur<strong>Enregistrer le style d'annonce</strong>.

Lorsque vous modifiez un style d'annonce existant, tous les blocs d'annonces actifs utilisant ce style sont automatiquement mis à jour.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


