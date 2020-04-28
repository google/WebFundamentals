project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 65 for developers?

{# wf_published_on: 2018-03-06 #} {# wf_updated_on: 2018-03-07 #} {#
wf_featured_image: /web/updates/images/generic/new-in-chrome.png #} {# wf_tags:
chrome65,new-in-chrome,css,layout,performance #} {# wf_featured_snippet: Chrome
65 adds support for the new CSS Paint API, which allows you to programmatically
generate an image. You can use the Server Timing API to provide server
performance timing information via HTTP headers, and the new CSS display:
contents property can make boxes disappear! Let’s dive in and see what’s new for
developers in Chrome 65! #} {# wf_blink_components: N/A #}

# Nouveautés dans Chrome 65 {: .page-title}

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="_W4GSpoSOZI"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

- L'[API CSS Paint](#css-paint) vous permet de générer par programmation une
image. an image.
- L'[API de synchronisation du serveur](#server-timing) (Server Timing) permet
aux serveurs Web de fournir des informations de performances de synchronisation
via les en-têtes HTTP.
- La nouvelle [propriété CSS `display: contents`](#display-contents) peut faire
disparaître les boîtes !

Et bien [plus](#more)!

Je m'appelle Pete LePage. Découvrons ce qu'il y a de nouveau pour les
développeurs dans Chrome 65!

<div class="clearfix"></div>

Note: Vous voulez la liste complète des changements? Visitez la [Liste des
changements dans le dépôt source de
Chromium](https://chromium.googlesource.com/chromium/src/+log/64.0.3282.140..65.0.3325.146).

## API CSS Paint {: #css-paint }

L' [API CSS Paint](https://www.w3.org/TR/css-paint-api-1/) vous permet de
générer par programmation une image pour les propriétés CSS telles que
`background-image` ou `border-image` .

Au lieu de faire référence à une image, vous pouvez utiliser la nouvelle
fonction de peinture pour dessiner l'image, un peu comme un élément de toile.

<pre class="prettyprint"> <style>   .myElem { background-image:
<b>paint(checkerboard);</b> } </style> <script>
<b>CSS.paintWorklet.addModule('checkerboard.js');</b> </script> </pre>

Par exemple, au lieu d'ajouter des éléments supplémentaires au DOM, pour [créer
un effet d'ondulation](/web/updates/2018/01/paintapi#use_cases) sur un bouton
stylisé en material, vous pouvez utiliser l'API de peinture.

C'est aussi une puissante méthode de polyfilling CSS qui ne sont pas encore pris
en charge dans un navigateur.

Surma a un superbe article avec plusieurs
[démonstrations](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/)
dans ses [explications](/web/updates/2018/01/paintapi).

## API de synchronisation du serveur (Server Timing) {: # server-timing}

J'éspère que vous utilisez des APIs de navigation et de chronométrage de
ressources pour suivre l'évolution de votre site pour des utilisateurs réels.
Jusqu'à présent, il n'y avait pas de moyens facile pour le serveur de rendre
compte de son temps de performance.

La nouvelle [API Server Timing](https://w3c.github.io/server-timing/) permet à
votre serveur de transmettre des informations de synchronisation au navigateur,
vous donner une meilleure image de votre performance globale.

Vous pouvez suivre autant de mesures métriques que vous le souhaitez: temps de
lecture de la base de données, temps de démarrage ou tout ce qui vous intéresse,
en ajoutant en en-tête `Server-Timing` à votre réponse:

```
'Server-Timing': 'su=42;"Start-up",db-read=142;"Database Read"'
```

<img
src="https://github.com/google/WebFundamentals/blob/master/web/updates/images/2018/03/nic65-server-timing-devtools.png?raw=true"
class="attempt-right">

Ils sont affichés dans Chrome DevTools ou vous pouvez les extraire de l'en-tête
de réponse et les enregistrer avec vos autres analyses de performances.

<div class="clearfix"></div>

## `display: contents` {: #display-contents }

La nouvelle propriété CSS `display: contents` est assez bien faite!

Lorsqu'elle est ajoutée à un élément du conteneur, tout enfant prend sa place
dans le DOM et il disparaît essentiellement. Disons que j'ai deux `div` l'un
dans l'autre. Mon `div` externe a une bordure de couleur rouge, une couleur de
fond grise et j'ai défini une largeur de 200 pixels. Le `div` intérieur a des
bordures de couleur bleu et une couleur de fond bleu clair.

```
.disp-contents-outer {
  border: 2px solid red;
  background-color: #ccc;
  padding: 10px;
  width: 200px;
}
.disp-contents-inner {
  border: 2px solid blue;
  background-color: lightblue;
  padding: 10px;
}
```

Par défaut, le `div` interne est contenu dans le `div` externe.

<style>
.disp-contents-outer {
  border: 2px solid red;
  background-color: #ccc;
  padding: 10px;
  width: 200px;
}
.disp-contents-inner {
  border: 2px solid blue;
  background-color: lightblue;
  padding: 10px;
}
.disp-contents {
  display: contents;
}
</style>

<div class="disp-contents-outer">
  <div class="disp-contents-inner">
    I'm the inner <div>
  </div>
</div>

 Ajouter `display: contents` au div externe le fait disparaître, ses contraintes
ne s'appliquent plus au `div` interne. Le `div` interne a maintenant une largeur
de 100%.

<div class="disp-contents-outer disp-contents">
  <div class="disp-contents-inner">
    Use DevTools to inspect the DOM, and notice the outer <code>div</code> still
exists.
  </div>
</div>

 Il y a beaucoup de cas où cela pourrait être utile, le cas le plus commun est
avec flexbox.  Avec flexbox, seuls les enfants immédiats d'un conteneur flexible
deviennent des objets flexibles.

Mais, une fois que vous appliquez `display: contents` à un enfant, ses enfants
deviennent des éléments flex et sont disposés en utilisant les mêmes règles qui
auraient été appliquées à leur parent.

Jetez un coup d’œil à l'excellent article de [Rachel
Andrew](https://twitter.com/rachelandrew), [Vanishing boxes with display
contents](https://rachelandrew.co.uk/archives/2016/01/29/vanishing-boxes-with-display-contents/)
pour plus de détails et d'autres exemples.

## Et bien plus! {: #more }

Ce ne sont que quelques-uns des changements dans Chrome 65 pour les
développeurs, bien sûr, il y en a beaucoup plus.

- La syntaxe pour spécifier `HSL` et `HSLA` , et les coordonnées `RGB` et `RGBA`
pour la propriété de couleur
[correspondent](https://drafts.csswg.org/css-color/#the-hsl-notation) maintenant
[à](https://drafts.csswg.org/css-color/#the-hsl-notation) la [spécification CSS
Color 4](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) .
- Il y a une nouvelle [politique de
confidentialité](http://xhr.featurepolicy.rocks/) qui vous permet de contrôler
les XHR synchrones par le biais d'une en-tête HTTP ou de l'attribut `allow` de
l'iframe.

Assurez-vous de [jeter un coup d'œil aux nouveautés de Chrome
DevTools](/web/updates/2018/01/devtools) pour connaître les nouveautés de
DevTools dans Chrome 65.   Si vous êtes intéressé par Progressive Web Apps,
jetez un œil à la nouvelle [série de vidéos PWA
Roadshow](https://www.youtube.com/playlist?list=PLNYkxOF6rcICnIOm4cfylT0-cEfytBtYt).
Cliquez ensuite sur le bouton " [s'abonner](https://goo.gl/6FP1a5) " sur notre
[chaîne YouTube](https://www.youtube.com/user/ChromeDevelopers/) , et vous
recevrez une notification par e-mail chaque fois que nous postons une nouvelle
vidéo, ou ajoutez notre [flux RSS](/web/shows/rss.xml) à votre lecteur de flux.

Je suis Pete LePage et aussitôt que Chrome 66 sorira, je serai ici pour vous
dire ce qu'il y aura de nouveau dans Chrome !

{% include "web/_shared/rss-widget-updates.html" %}
