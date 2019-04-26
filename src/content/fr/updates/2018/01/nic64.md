project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Nouveauté de Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* La prise en charge de [`ResizeObservers`](#resizeobserver) vous avertira lorsque le rectangle de contenu d&#39;un élément aura changé de taille.
* Les modules peuvent désormais accéder à des métadonnées spécifiques avec [import.meta](#import-meta) .
* Le [pop-up blocker](#popup-blocker) devient fort.
* [`window.alert()`](#window-alert) ne change plus le focus.

Et il y a [plenty more](#more) !

Je suis Pete LePage. Découvrons ce qui est nouveau pour les développeurs dans Chrome 64!

<div class="clearfix"></div>

Note: vous voulez la liste complète des modifications? Découvrez le [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) .

## `ResizeObserver` {: #resizeobserver }

Suivre les changements de taille d&#39;un élément peut être un peu pénible. Très probablement, vous attacherez un écouteur à l&#39;événement `resize` du document, puis appelez `getBoundingClientRect` ou `getComputedStyle` . Mais, les deux peuvent causer des problèmes de mise en page.

Et si la fenêtre du navigateur ne changeait pas de taille, mais qu&#39;un nouvel élément était ajouté au document? Ou vous avez ajouté `display: none` à un élément? Ces deux éléments peuvent modifier la taille des autres éléments de la page.

`ResizeObserver` vous avertit chaque fois que la taille d&#39;un élément change et fournit les nouvelles hauteur et largeur de l&#39;élément, ce qui réduit le risque d&#39;accident de la mise en page.

Comme d&#39;autres observateurs, son utilisation est assez simple: créez un objet `ResizeObserver` et transmettez un rappel au constructeur. Le rappel recevra un tableau de `ResizeOberverEntries` - une entrée par élément observé - qui contient les nouvelles dimensions de l&#39;élément.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Consultez [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver) pour plus de détails et des exemples concrets.


## Bloqueur de {: #popup-blocker } intempestives {: #popup-blocker }

Je déteste tab-under. Vous les connaissez, c&#39;est quand une page ouvre une fenêtre contextuelle vers une destination ET navigue sur la page. Habituellement, l’un d’eux est une annonce ou quelque chose que vous ne voulez pas.

À partir de Chrome 64, ces types de navigation seront bloqués et Google Chrome affichera une interface utilisateur native à l’utilisateur, lui permettant de suivre la redirection s’il le souhaite.


## `import.meta` {: #import-meta }

Lors de l&#39;écriture de modules JavaScript, vous souhaitez souvent accéder à des métadonnées spécifiques à l&#39;hôte concernant le module actuel. Chrome 64 prend désormais en charge la propriété `import.meta` dans les modules et expose l&#39;URL du module en tant que `import.meta.url` .

Ceci est très utile lorsque vous souhaitez résoudre des ressources relatives au fichier de module par opposition au document HTML actuel.


## Et plus encore! {: #more }

Ce ne sont là que quelques-uns des changements apportés à Chrome 64 par les développeurs. Bien entendu, il y en a beaucoup plus.

* Chrome prend désormais en charge [named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures) et [Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) dans les expressions régulières.
* La valeur par défaut de `preload` pour les éléments `<audio>` et `<video>` est désormais `metadata` . Cela met Chrome en ligne avec les autres navigateurs et permet de réduire l&#39;utilisation de la bande passante et des ressources en ne chargeant que les métadonnées et non le support lui-même.
* Vous pouvez maintenant utiliser `Request.prototype.cache` pour afficher le mode de cache d&#39;un `Request` et déterminer si une demande est une demande de rechargement.
* À l&#39;aide de l&#39;API Focus Management, vous pouvez maintenant focaliser un élément sans y `preventScroll` avec l&#39;attribut `preventScroll` .

## `window.alert()` {: #window-alert }

Oh, et un de plus! Bien que ce ne soit pas vraiment une &quot;fonctionnalité de développeur&quot;, cela me rend heureux. `window.alert()` n&#39;apporte plus d&#39;onglet d&#39;arrière-plan au premier plan! Au lieu de cela, l&#39;alerte sera affichée lorsque l&#39;utilisateur reviendra à cet onglet.

Plus de tabulation aléatoire, car un `window.alert` a été `window.alert` sur moi. Je te regarde le vieil agenda de Google.


N&#39;oubliez pas de [subscribe](https://goo.gl/6FP1a5) dans notre [YouTube channel](https://www.youtube.com/user/ChromeDevelopers/) et vous recevrez une notification par courrier électronique chaque fois que nous lançons une nouvelle vidéo ou ajoutez notre [RSS feed](/web/shows/rss.xml) à votre lecteur de flux.


Je m&#39;appelle Pete LePage et, dès la sortie de Chrome 65, je serai ici pour vous dire ce qu&#39;il y a de neuf dans Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}