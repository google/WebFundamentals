---
title: "Optimisation des polices Web"
description: "La typographie est essentielle pour la qualité du design, de la marque, de la lisibilité et de l'accessibilité. Les polices Web offrent tout ceci et plus encore : elles permettent de sélectionner le texte, de le rechercher, de l'agrandir, et de le rendre adapté aux appareils avec un ppp élevé, offrant un affichage du texte cohérent et net quelles que soient la taille de l'écran et la résolution. Les polices Web sont essentielles pour obtenir un design, un UX et des performances de qualité."
updated_on: 2014-09-30
key-takeaways:
  anatomy:
    - "Les polices Unicode peuvent contenir des milliers de glyphes"
    - "Il existe quatre formats de police : WOFF2, WOFF, EOT et TTF"
    - "Certains formats de police nécessitent l'utilisation de la compression GZIP"
  font-family:
    - "Utilisez l'algorithme d'optimisation format() pour spécifier plusieurs formats de police"
    - "Définissez des sous-ensembles pour les polices Unicode volumineuses pour améliorer les performances : utilisez les sous-paramètres unicode-range et fournissez un sous-paramètre de rechange manuel pour les navigateurs plus anciens"
    - "Réduisez le nombre de variantes de police stylistique afin d'améliorer les performances d'affichage de la page et du texte"
  font-crp:
    - "Les demandes de police sont retardées jusqu'à ce que l'arborescence d'affichage soit construite, ce qui a pour conséquence un retard de l'affichage du texte"
    - "L'API Font Loading nous permet de mettre en œuvre des stratégies de chargement et d'affichage des polices personnalisées qui remplacent le chargement de police inactif par défaut"
    - "L'intégration de police nous permet de remplacer le chargement de police inactif par défaut dans les navigateurs les plus anciens"

notes:
  svg:
    - "Techniquement, il existe également le <a href='http://caniuse.com/svg-fonts'>conteneur de police SVG</a>, mais il n'a jamais été compatible avec IE ni Firefox, et est maintenant obsolète dans Chrome. Son utilité est donc limitée, et nous l'omettons volontairement dans ce guide."
  zopfli:
    - "Pensez à utiliser la <a href='http://en.wikipedia.org/wiki/Zopfli'>compression Zopfli</a> pour les formats EOT, TTF et WOFF. Zopfli est un logiciel de compression compatible avec les données zlib, qui propose une réduction de la taille des fichiers supplémentaire d'environ 5 % par rapport à gzip."
  local-fonts: 
    - "À moins que vous référenciez l'une des polices système par défaut, en pratique il est rare que l'utilisateur l'ait installé localement, en particulier sur les appareils mobiles, où il est concrètement impossible 'd'installer' des polices supplémentaires. En conséquence, vous devez toujours fournir une liste d'emplacements pour les polices externes."
  font-order:
    - "L'ordre dans lequel les variantes d'une police sont spécifiées est important. Le navigateur choisit le premier format compatible. Par conséquent, si vous souhaitez que les navigateurs les plus récents utilisent WOFF2, vous devez placer la déclaration WOFF2 au-dessus de WOFF, et ainsi de suite."
  unicode-subsetting:
    - "Les sous-ensembles unicode-range sont particulièrement importants pour les langues asiatiques, dans lesquelles le nombre de glyphes est beaucoup plus important que dans les langues occidentales, et pour lesquelles une police 'complète' est souvent mesurée en mégaoctets et non pas en dizaines de kilo-octets !"
  synthesis:
    - "Pour une meilleure cohérence et de meilleurs résultats visuels, ne vous fiez pas à la synthèse des polices. Réduisez le nombre de variantes de police utilisé et spécifiez leur emplacement, afin que le navigateur puisse les télécharger lorsqu'elles sont utilisées sur la page. Cela étant dit, dans certain cas une variante synthétisée <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>peut être une bonne option</a>. Mais utilisez-la avec précaution."
  webfontloader:
    - "L'API Font Loading est toujours <a href='http://caniuse.com/#feat=font-loading'>en cours de développement dans certains navigateurs</a>. Pensez donc à utiliser l'<a href='https://github.com/bramstein/fontloader'>émulateur de navigateur Web FontLoader</a>, ou la <a href='https://github.com/typekit/webfontloader'>bibliothèque webfontloader</a>, afin de proposer des fonctionnalités similaires, que ce soit avec un temps système ou une dépendance JavaScript supplémentaires."
  font-inlining: 
    - "Utilisez l'intégration de façon sélective ! Souvenez-vous que @font-face utilise le comportement de chargement inactif pour éviter de télécharger des variantes et sous-ensembles de police inutiles. De plus, l'augmentation de la taille de votre CSS par une intégration agressive aura un impact négatif sur votre <a href='/web/fundamentals/performance/critical-rendering-path/'>chemin critique du rendu</a> : le navigateur doit télécharger tout le code CSS avant de pouvoir construire le modèle CSSOM, créer l'arborescence d'affichage et afficher le contenu de la page d'affichage à l'écran."
---

<p class="intro">
  La typographie est essentielle pour la qualité du design, de la marque, de la lisibilité et de l'accessibilité. Les polices Web offrent tout ceci et plus encore : elles permettent de sélectionner le texte, de le rechercher, de l'agrandir, et de le rendre adapté aux appareils avec un ppp élevé, offrant un affichage du texte cohérent et net quelles que soient la taille de l'écran et la résolution. Les polices Web sont essentielles pour obtenir un design, un UX et des performances de qualité.
</p>

{% include shared/toc.liquid %}

L'optimisation de police Web est un élément essentiel de la stratégie de performance globale. Chaque police est une ressource supplémentaire, et certaines polices peuvent empêcher l'affichage du texte. Mais le fait que la page utilise des polices Web ne signifie pas que l'affichage doit être plus lent. Au contraire, une police optimisée associée à une stratégie judicieuse pour son chargement et son application sur la page peuvent contribuer à réduire la taille totale de la page et améliorer le délai d'affichage de la page.

## Anatomie d'une police Web

{% include shared/takeaway.liquid list=page.key-takeaways.anatomy %}

Une police Web est une collection de glyphes, et chaque glyphe est une forme vectorielle qui représente une lettre ou un symbole. Par conséquent, la taille d'un fichier de police spécifique est déterminée par deux variables simples : la complexité des chemins vectoriels de chaque glyphe et le nombre de glyphes dans une police spécifique. Par exemple, Open Sans, qui est l'une des polices Web les plus populaires, contient 897 glyphes, comprenant des caractères latins, grecs et cyrilliques.

<img src="images/glyphs.png" class="center" alt="Tableau des glyphes de la police">

Lorsque vous choisissez une police, il est important de prendre en compte les jeux de caractères compatibles. Si vous avez besoin de localiser le contenu de votre page dans plusieurs langues, vous devez utiliser une police capable d'offrir un aspect et une expérience cohérents à vos utilisateurs. Par exemple, la [famille de polices Noto de Google](https://www.google.com/get/noto/) a pour but d'être compatible avec toutes les langues du monde. Notez cependant que la taille totale de Noto, toutes langues comprises, atteint un téléchargement de plus de 130 Mo ZIP ! 

De façon évidente, il convient de procéder avec soin lors de l'utilisation des polices sur le Web, afin de vous assurer que la typographie n'entrave pas les performances. Heureusement, la plateforme d'Internet fournit toutes les primitives nécessaires, et le reste de ce guide est consacré à une analyse concrète de la façon de profiter du meilleure des deux mondes.

### Formats de police Web

Il existe aujourd'hui quatre formats de conteneur de police utilisés sur Internet : [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://fr.wikipedia.org/wiki/TrueType), [WOFF](http://fr.wikipedia.org/wiki/Web_Open_Font_Format) et [WOFF2](http://www.w3.org/TR/WOFF2/). Malheureusement, malgré ce vaste choix, il n'existe pas un seul format universel qui fonctionne sur tous les navigateurs, anciens et nouveaux : EOT fonctionne sur [IE uniquement](http://caniuse.com/#feat=eot), TTF est [partiellement compatible avec IE](http://caniuse.com/#search=ttf), WOFF est le plus compatible, mais il [n'est pas disponible sur certains anciens navigateurs](http://caniuse.com/#feat=woff) et la compatibilité de WOFF 2.0 est [en cours de développement pour de nombreux navigateurs](http://caniuse.com/#feat=woff2).

Alors que nous reste-t-il ? Il n'existe par un format unique qui fonctionne sur tous les navigateurs, ce qui signifie que nous devons fournir plusieurs formats pour offrir une expérience cohérente :

* Diffuser une variante WOFF 2.0 pour les navigateurs compatibles.
* Diffuser une variante WOFF pour la majorité des navigateurs.
* Diffuser une variante TTF pour les anciens navigateurs Android (avant 4.4).
* Diffuser une variante EOT pour les anciens navigateurs IE (avant IE9).
^

{% include shared/remember.liquid title="Note" list=page.notes.svg %}

### Réduire la taille de police avec la compression

Une police est une collection de glyphes, et chaque glyphe est un ensemble de chemins décrivant la forme de la lettre. Chaque glyphe est différent, bien sûr. Mais ils contiennent cependant beaucoup d'informations similaires qui peuvent être compressées avec GZIP ou un logiciel de compression compatible : 

* Les formats EOT et TTF ne sont pas compressés par défaut : assurez-vous que vos serveurs sont configurés pour appliquer la [compression GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) lorsque vous utilisez ces formats.
* Le format WOFF dispose d'une compression intégrée. Assurez-vous que votre logiciel de compression WOFF utilise des paramètres de compression optimaux. 
* Le format WOFF2 utilise un prétraitement et des algorithmes de compression personnalisés pour offrir une réduction de la taille de fichier supérieure de ~30 % par rapport aux autres formats. Consultez le [rapport](http://www.w3.org/TR/WOFF20ER/).

Enfin il est important de noter que certains formats contiennent des métadonnées supplémentaires, telles que des informations d'[optimisation de rendu](http://fr.wikipedia.org/wiki/Font_hinting) et de [crénage](http://fr.wikipedia.org/wiki/Crénage) qui peuvent être inutiles sur certaines plateformes, ce qui permet d'optimiser encore davantage la taille du fichier. Consultez votre logiciel de compression des polices pour connaître les options d'optimisation disponibles, et si vous choisissez cette voie, assurez-vous que vous disposez d'une infrastructure adaptée pour tester et proposer ces polices optimisées à chaque navigateur. Par exemple, Google Fonts possède plus de 30 variantes optimisées pour chaque police, et détecte et fournit automatiquement la variante optimale pour chaque plateforme et navigateur.

{% include shared/remember.liquid title="Note" list=page.notes.zopfli %}

## Définir une famille de polices avec @font-face

{% include shared/takeaway.liquid list=page.key-takeaways.font-family %}

La règle `at-rule` CSS @font-face nous permet de définir l'emplacement d'une ressource de police spécifique, ses caractéristiques stylistiques et les points de code Unicode pour lesquels elle doit être utilisée. Vous pouvez utiliser une combinaison de ces déclarations @font-face pour construire une 'famille de polices', que le navigateur utilise pour évaluer quelles ressources de police doivent être téléchargées et appliquées à la page actuelle. Regardons maintenant plus en détail comment cela fonctionne.

### Sélection de format

Chaque déclaration @font-face fournit le nom de la famille de polices, qui joue le rôle de groupe logique de plusieurs déclarations, des [propriétés de police](http://www.w3.org/TR/css3-fonts/#font-prop-desc) telles que le style, le poids et l'étendue, et le [descripteur src](http://www.w3.org/TR/css3-fonts/#src-desc) qui spécifie une liste d'emplacements classés par priorité pour la ressource de la police.

{% highlight css  %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('ttf'),
       url('/fonts/awesome.eot') format('eot');
}

@font-face {
  font-family: 'Awesome Font';
  font-style: italic;
  font-weight: 400;
  src: local('Awesome Font Italic'),
       url('/fonts/awesome-i.woff2') format('woff2'), 
       url('/fonts/awesome-i.woff') format('woff'),
       url('/fonts/awesome-i.ttf') format('ttf'),
       url('/fonts/awesome-i.eot') format('eot');
}
{% endhighlight %}

Tout d'abord, notez que les exemples ci-dessus définissent une seule famille _Awesome Font_ avec deux styles (normal et _italic_), chacun indiquant un ensemble de ressources de police différent. Ensuite, chaque descripteur `src` contient une liste de variantes de ressources, classées par priorité et séparées par une virgule : 

* La directive `local()` nous permet de référencer, charger et utiliser les polices installées localement.
* La directive `url()` nous permet de charger des polices externes, et peuvent contenir un algorithme d'optimisation `format()` facultatif indiquant le format de la police référencée par l'URL fournie.

^
{% include shared/remember.liquid title="Note" list=page.notes.local-fonts %}

Lorsque le navigateur détermine que la police est nécessaire, il consulte la liste de ressources fournir dans l'ordre indiqué et tente de charger la ressource adaptée. Considérons l'exemple ci-dessus :

1. Le navigateur effectue la mise en page de la page et détermine quelles variantes de la police sont requises pour afficher le texte spécifié sur la page.
2. Pour chaque police requise, le navigateur vérifie si elle est disponible localement.
3. Si le fichier n'est pas disponible localement, il consulte le définitions externes l'une après l'autre :
  * Si un algorithme d'optimisation de format est présent, le navigateur vérifie s'il est compatible avant de lancer le téléchargement, et s'il ne l'est pas, passe au suivant.
  * Si aucun algorithme d'optimisation n'est présent, le navigateur télécharge la ressource.

La combinaison de directives locales et externes avec les algorithmes d'optimisation de format adaptés nous permet de spécifier tous les formats de police disponibles, et laisse le navigateur gérer le reste : le navigateur définit quelles ressources sont nécessaires et sélectionne pour nous le format le mieux adapté.

{% include shared/remember.liquid title="Note" list=page.notes.font-order %}

### Créer des sous ensembles unicode-range

Outre les propriétés de police telles que le style, le poids et la portée, la règle @font-face nous permet de définir un ensemble de points de code Unicode compatible avec chaque ressource. Cela nous permet de partager une police Unicode volumineuse en plusieurs sous-ensembles (par exemple latin, cyrillique, grec) et de ne télécharger que les glyphes nécessaires pour afficher le texte sur une page spécifique.

Le [descripteur unicode-range](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) nous permet de spécifier une liste de valeurs de plage séparées par une virgule, chacune pouvant prendre l'une des trois formes différentes suivantes :

* Point de code unique (par exemple, U+416)
* Plage d'intervalle (par exemple, U+400-4ff) : indique les points de code de début et de fin d'une plage
* Plage de caractères de remplacement (par exemple, U+4??) : les caractères `?` indiquent un chiffre hexadécimal

Par exemple, nous pouvons diviser notre famille _Awesome Font_ en sous ensembles Latin et Japonais, chacun étant téléchargé par le navigateur en fonction des besoins : 

{% highlight css %}
@font-face {
  font-family: `Awesome Font`;
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: `Awesome Font`;
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-jp.woff2') format('woff2'), 
       url('/fonts/awesome-jp.woff') format('woff'),
       url('/fonts/awesome-jp.ttf') format('ttf'),
       url('/fonts/awesome-jp.eot') format('eot');
  unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
}
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.unicode-subsetting %}

L'utilisation de sous-ensembles unicode-range et de fichiers distincts pour chaque variante stylistique de la police nous permet de définir une famille de polices composite, à la fois plus rapide et plus efficace à télécharger : le visiteur ne télécharge que les variantes et sous-ensembles dont il a besoin, et n'est pas obligé de télécharger des sous-ensembles qu'il ne verra ou n'utilisera peut-être jamais sur la page. 

Cela dit, il y a un petit inconvénient avec unicode-range : [il n'est pas compatible avec tous les navigateurs](http://caniuse.com/#feat=font-unicode-range), du moins pas encore. Certains navigateurs ignorent simplement l'algorithme d'optimisation unicode-range et téléchargent toutes les variantes, alors que d'autres peuvent ne pas traiter la déclaration @font-face du tout. Pour résoudre ce problème, nous devons revenir aux "sous-ensembles manuels" pour les anciens navigateurs.

Parce que les anciens navigateurs ne sont pas assez intelligents pour ne sélectionner que les sous-ensembles nécessaires et ne peuvent pas construire une police composite, nous devons revenir à l'ancienne méthode : fournir une seule ressource de police qui contient tous les sous-ensembles nécessaires, et masquer le reste pour le navigateur. Par exemple, si la page n'utilise que des caractères latins, nous pouvons supprimer les autres glyphes et diffuser ce sous-ensemble particulier comme ressource autonome. 

1. **Comment pouvons-nous déterminer quels sous-ensembles sont nécessaires ?** 
  - Si le navigateur est compatible avec le sous-ensemble unicode-range, le navigateur sélectionne automatiquement le bon sous-ensemble. La page doit simplement fournir les fichiers du sous-ensemble et spécifier les unicode-ranges adaptés dans les règles @font-face.
  - Si le navigateur n'est pas compatible avec unicode-range, la page doit masquer tous les sous-ensembles inutiles. C'est-à-dire que le développeur doit spécifier les sous-ensembles requis.
2. **Comment pouvons-nous générer des sous-ensembles de police ?**
  - Utilisez l'[outil Open Source pyftsubset](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) pour créer des sous-ensembles et optimiser vos polices.
  - Certains services des polices permettent de créer des sous-ensembles manuellement via des paramètres de requête personnalisés, que vous pouvez utiliser pour spécifier manuellement le sous-ensemble requis pour votre page. Consultez la documentation de votre fournisseur de police.


### Sélection de police et synthèse

Chaque famille de police est composée de plusieurs variantes stylistiques (normal, gras, italique) et de plusieurs poids pour chaque style, chacun pouvant à son tour contenir des formes de glyphes très différentes, telles qu'un espacement ou une taille différents, ou tout simplement une forme différente. 

<img src="images/font-weights.png" class="center" alt="Poids des polices">

Par exemple, le diagramme ci-dessus illustre une famille de polices qui propose trois poids de caractères gras différents : 400 (normal), 700 (gras), and 900 (extra gras). Toutes les autres variantes intermédiaires, indiquées en gris, sont automatiquement mappées à la variante la plus proche par le navigateur. 

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Lorsqu'un poids est spécifié pour lequel il n'existe pas de face, une face avec un poids approchant est utilisée. En général, les poids gras sont mappés à des faces avec des poids plus importants, et les poids légers sont mappés à des faces avec des poids plus légers.
    <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algorithme de correspondance de police CSS3</a></p>
    </blockquote>
  </div>
</div>

Une logique similaire s'applique aux variantes _italic_. Le concepteur de polices contrôle les variantes qu'il produit, et nous contrôlons les variantes que nous utilisons sur la page. Puisque chaque variante est téléchargée séparément, il est conseillé d'en utiliser le moins possible ! Par exemple, nous pouvons définit deux variantes de gras pour notre famille _Awesome Font_ : 

{% highlight css %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 700;
  src: local('Awesome Font'),
       url('/fonts/awesome-l-700.woff2') format('woff2'), 
       url('/fonts/awesome-l-700.woff') format('woff'),
       url('/fonts/awesome-l-700.ttf') format('ttf'),
       url('/fonts/awesome-l-700.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
{% endhighlight %}

L'exemple ci-dessus déclare que la famille _Awesome Font_ est composée de deux ressources qui couvrent le même ensemble de glyphes latins (U+000-5FF), mais offrent des 'poids' différents : normal (400) et gras (700). Cependant, que se passe-t-il si l'une de nos règles CSS spécifie un poids de police différent, ou définit la propriété du style de police comme italique ?

* Si aucune correspondance exacte n'est disponible pour la police, le navigateur la remplace par la correspondance la plus proche.
* Si aucune correspondance n'est trouvée pour le style (si nous n'avons pas déclaré de variantes en italique dans l'exemple ci-dessus, par exemple), le navigateur synthétise sa propre variante de police. 

<img src="images/font-synthesis.png" class="center" alt="Synthèse des polices">

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Les auteurs doivent également être conscients que les approches synthétisées peuvent ne pas être adaptées à des scripts comme le cyrillique, pour lequel les formes en italique ont un aspect très différent. Il est toujours préférable d'utiliser une police italique réelle plutôt que de se fier à une version synthétique.
    <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">Style de police CSS3</a></p>
    </blockquote>
  </div>
</div>

Les exemples ci-dessus illustrent la différence entre les résultats des polices réelles et synthétiques pour Open-Sans. Toutes les variantes synthétiques sont générées à partir d'une seule police ayant un poids de 400. Comme vous pouvez le voir, les résultats sont très différents. Les détails de la création des variantes en gras et en italique ne sont pas spécifiés. Par conséquent, les résultats varient en fonction du navigateur, et dépendent également beaucoup de la police.

{% include shared/remember.liquid title="Note" list=page.notes.synthesis %}


## Optimiser le chargement et l'affichage

{% include shared/takeaway.liquid list=page.key-takeaways.font-crp %}

Une police Web 'complète' avec toutes les variantes stylistiques, dont nous pouvons ne pas avoir besoin, plus tous les glyphes, qui peuvent être inutiles, peut facilement générer un téléchargement de plusieurs mégaoctets. Pour résoudre ce problème, la règle CSS @font-face est conçue spécialement pour nous permettre de diviser la famille de polices en une collection de ressources : sous-ensembles Unicode, variantes stylistiques distinctes, etc. 

Avec ces déclarations, le navigateur détermine les sous-ensembles et variantes nécessaires, et télécharge l'ensemble minimal requis pour afficher le texte. Ce comportement a de nombreux avantages, mais si nous ne faisons pas attention, il peut également créer un goulot d'étranglement en termes de performances dans le chemin critique du rendu et retarder l'affichage du texte. C'est un problème qu'il vaut mieux éviter ! 

### Polices Web et le chemin critique du rendu

Le chargement inactif de polices comporte une importante implication cachée qui peut retarder l'affichage du texte : le navigateur doit [construire l'arborescence d'affichage](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction), qui dépend des arborescences des modèles DOM et CSSOM, avant de savoir quelles ressources de police sont nécessaires pour afficher le texte. Résultat, les requêtes de police sont retardées beaucoup plus longtemps que les autres ressources critiques, et le navigateur peut être empêché d'afficher le texte jusqu'à ce que la ressource soit récupérée.

<img src="images/font-crp.png" class="center" alt="Chemin critique du rendu pour les polices">

1. Le navigateur demande le document HTML.
2. Le navigateur commence à analyser la réponse HTML et à construire le modèle DOM.
3. Le navigateur découvre le code CSS, JS et autres ressources, et transmet les requêtes.
4. Le navigateur construit le modèle CSSOM une fois que tout le contenu du code CSS est reçu, et le combine avec l'arborescence du modèle DOM pour construire l'arborescence d'affichage.
  * Les demandes de police sont envoyées une fois que l'arborescence d'affichage indique quelles variantes de la police sont nécessaires pour afficher le texte spécifié sur la page.
5. Le navigateur effectue la mise en page et peint le contenu sur l'écran.
  * Si la police n'est pas encore disponible, le navigateur ne peut pas afficher les pixels de texte.
  * Une fois que la police est disponible, le navigateur peint les pixels de texte.

la 'course' entre la première peinture du contenu de la page, qui peut être effectuée peu de temps après la création de l'arborescence d'affichage, et la requête de la ressource de police est ce qui crée le 'problème de texte manquant', lorsque le navigateur affiche la page sans le texte. Le comportement réel dans cette situation varie en fonction du navigateur :

* Safari diffère l'affichage du texte jusqu'à la fin du téléchargement de la police.
* Chrome et Firefox diffèrent l'affichage de la police jusqu'à trois secondes, puis ils utilisent une police de rechange, et une fois que le téléchargement de la police est terminé, ils affichent à nouveau le texte avec la police téléchargée.
* IE affiche immédiatement le texte avec la police de rechange si la police demandée n'est pas encore disponible, et l'affiche à nouveau une fois le téléchargement de la police terminé.

Chaque stratégie d'affichage a des avantages : certaines personnes trouve que l'affichage en plusieurs fois perturbant, alors que d'autres préfèrent voir un résultat immédiat et ne sont pas gênées par le nouveau chargement de la page une fois la police téléchargée. Ce n'est pas ce qui nous intéresse ici. L'important est que le chargement inactif réduit le nombre d'octets, mais peut également retarder l'affichage du texte. Voyons ensuite comment nous pouvons optimiser ce comportement.

### Optimiser l'affichage de la police avec l'API Font Loading

L'[API Font Loading](http://dev.w3.org/csswg/css-font-loading/) fournit une interface d'écriture de script qui permet de définir et de manipuler les faces des polices CSS, de suivre la progression de leur téléchargement et de contourner leur comportement de chargement inactif par défaut. Par exemple, si nous sommes certains qu'une variante de police spécifique sera nécessaire, nous pouvons la définir et demander au navigateur de lancer une récupération immédiate de la ressource de police :

{% highlight javascript %}
var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load(); // don't wait for render tree, initiate immediate fetch!

font.ready().then(function() {
  // apply the font (which may rerender text and cause a page reflow)
  // once the font has finished downloading
  document.fonts.add(font);
  document.body.style.fontFamily = "Awesome Font, serif";

  // OR... by default content is hidden, and rendered once font is available
  var content = document.getElementById("content");
  content.style.visibility = "visible";

  // OR... apply own render strategy here... 
});
{% endhighlight %}

De plus, comme nous pouvons contrôler la méthode du statut de la police (via la directive [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) et suivre la progression de son téléchargement, nous pouvons également définir une stratégie personnalisée pour afficher le texte sur nos pages : 

* Nous pouvons retarder l'affichage de l'ensemble du texte jusqu'à ce que la police soit disponible.
* Nous pouvons mettre en œuvre un délai d'expiration personnalisé pour chaque police.
* Nous pouvons utiliser la police de rechange pour débloquer l'affichage et injecter un nouveau style utilisant la police souhaitée lorsqu'elle est disponible.

Encore mieux, nous pouvons aussi mélanger toutes les stratégies ci-dessus pour les différents contenus sur la page. Nous pouvons différer l'affichage du texte pour certaines sections jusqu'à ce que la police soit disponible, utiliser une police de rechange, puis afficher à nouveau le texte lorsque la police est téléchargée, définir des délais d'expiration différents, etc. 

{% include shared/remember.liquid title="Note" list=page.notes.webfontloader %}

### Optimiser l'affichage des polices avec l'intégration

Une stratégie alternative simple à l'utilisation de l'API Font Loading pour éliminer le 'problème de texte manquant' consiste à intégrer le contenu des polices dans une feuille de style CSS :

* Les feuilles de style CSS avec requêtes média correspondantes sont automatiquement téléchargées par le navigateur avec une priorité élevée, car elles ont nécessaires pour construire le modèle CSSOM.
* L'intégration des données des polices dans une feuille de style CSS force le navigateur à télécharger la police avec une priorité élevée et sans attendre l'arborescence d'affichage. Cela permet de contourner manuellement le comportement de chargement inactif par défaut.

La stratégie d'intégration n'est pas aussi flexible, et ne nous permet pas de définir des délais d'expiration ou des stratégies d'affichage personnalisés pour les différents contenus, mais c'est une solution simple et fiable qui fonctionne sur tous les navigateurs. Pour obtenir les meilleurs résultats, séparez les polices intégrées en plusieurs feuilles de styles indépendantes et diffusez-les avec une directive `max-age` longue. Ainsi, lorsque vous mettez à jour votre code CSS, vous ne forcez pas vos visiteurs à télécharger à nouveau les polices. 

{% include shared/remember.liquid title="Note" list=page.notes.font-inlining %}

### Optimiser la réutilisation des polices avec la mise en cache HTTP

Les ressources de polices sont généralement des ressources statiques qui ne sont pas mises à jour fréquemment. Elles sont donc idéalement adaptées à une expiration `max-age` longue. Assurez-vous de spécifier à la fois un [en-tête ETag conditionnel](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) et des [règles Cache-Control optimales](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) pour toutes les ressources de polices.   
    
Il est inutile de stocker les polices sur un dispositif de stockage local ou via d'autres mécanismes, puisque chacune a ses inconvénients en termes de performances. Le cache HTTP du navigateur, associée à l'API Font Loading ou à la bibliothèque webfontloader, offre le meilleur et le plus fiable mécanisme pour fournir les ressources de police au navigateur.


## Liste de contrôle de l'optimisation

Contrairement à une croyance répandue, l'utilisation de polices Web ne retarde pas nécessairement l'affichage de la page et n'a pas nécessairement un impact négatif sur les autres statistiques de performances. Une utilisation bien optimisée des polices peut offrir une expérience utilisateur largement améliorée : bonne présentation de la marque, lisibilité, facilité d'utilisation et recherche facilitées, tout en offrant une solution en plusieurs résolutions et à l'échelle qui s'adapte bien à tous les formats d'écran et toutes les résolutions. N'ayez pas peur d'utiliser les polices Web ! 

Ceci dit, une mise en œuvre non informée peut provoquer des téléchargements importantes et des retards inutiles. C'est pour cela que nous devons ressortir notre kit d'optimisation et aider le navigateur en optimisant les éléments de police eux-mêmes, ainsi que la façon dont ils sont récupérés et utilisés sur nos pages. 

1. **Auditez et surveillez votre utilisation des polices** : n'utilisez pas un trop grand nombre de polices sur vos pages, et pour chaque police, réduisez au minimum le nombre de variantes utilisées. Cela permettra d'offrir une expérience plus cohérente et plus rapide à vos utilisateurs.
2. **Organisez vos ressources de polices en sous-ensembles** : de nombreuses polices peuvent être organisées en sous-ensembles, ou divisées en plusieurs unicode-ranges, afin de ne fournir que les glyphes nécessaires à une page spécifique. Cela permet de réduire la taille des fichiers et d'améliorer la vitesse de téléchargement de la ressource. Cependant, lorsque vous définissez des sous-ensembles, pensez à les optimiser pour la réutilisation des polices, pour éviter par exemple de télécharger des ensembles de caractères différents, mais se chevauchant sur chaque page. Une méthode efficace consiste à créer des sous-ensembles en fonction du script : latin, cyrillique, etc.
3. **Fournissez des formats de police optimisés à chaque navigateur** : chaque police doit être fournie dans les formats WOFF2, WOFF, EOT et TTF. Assurez-vous d'appliquer la compression GZIP aux formats EOT et TTF, puisqu'ils ne sont pas compressés par défaut.
4. **Spécifiez les règles de revalidation et de mise en cache optimale** : les polices sont des ressources statiques qui ne sont pas mises à jour souvent. Assurez-vous que vos serveurs fournissent un horodatage `max-age` long et un jeton de revalidation, pour permettre une réutilisation efficace des polices sur les différentes pages.
5. **Utilisez l'API Font Loading pour optimiser le chemin critique du rendu** : le comportement de chargement inactif par défaut peut retarder l'affichage du texte. L'API Font Loading nous permet de contourner ce comportement pour des polices spécifiques, et de spécifier des stratégies d'affichage et d'expiration du délai personnalisées pour les différents contenus sur la page. Pour les anciens navigateurs qui ne sont pas compatibles ave l'API, vous pouvez utiliser la bibliothèque JavaScript webfontloader ou la stratégie d'intégration de CSS.


