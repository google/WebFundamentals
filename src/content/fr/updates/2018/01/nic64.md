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

# Nouveau dans Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* La prise en charge de [`ResizeObservers` ](#resizeobserver) vous avertira lorsque le rectangle de contenu d’un élément aura changé de taille.
* Les modules peuvent désormais accéder à des métadonnées spécifiques à l’hôte avec [import.meta](#import-meta).
* Le [bloqueur de pop-up](#popup-blocker) devient fort.
* [`window.alert()` ](#window-alert) ne change plus le focus.

Et il y a [beaucoup plus](#more)!

Je suis Pete LePage. Découvrons ce qui est nouveau pour les développeurs dans Chrome 64!

<div class="clearfix"></div>

Note: Vous voulez la liste complète des changements? Consultez la [liste de modifications du référentiel source Chromium](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140).

## `ResizeObserver` {: #resizeobserver }

Le suivi des modifications de la taille d’un élément peut être un peu pénible. Très probablement, vous attacherez un écouteur à l'événement `resize` du document, puis appelez `getBoundingClientRect` ou `getComputedStyle` . Mais, les deux peuvent causer des problèmes de mise en page.

Et si la fenêtre du navigateur ne changeait pas de taille, mais si un nouvel élément était ajouté au document? Ou vous avez ajouté `display: none` à un élément? Ces deux éléments peuvent modifier la taille des autres éléments de la page.

`ResizeObserver` vous avertit chaque fois que la taille d’un élément change et fournit les nouvelles hauteur et largeur de l’élément, réduisant ainsi le risque de contorsions de la présentation.

Comme d'autres observateurs, son utilisation est assez simple: créez un objet `ResizeObserver` et transmettez un rappel au constructeur. Le rappel recevra un tableau de `ResizeOberverEntries` - une entrée par élément observé - qui contient les nouvelles dimensions de l'élément.

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

Regardez [`ResizeObserver` : C'est comme `document.onresize` pour Elements](/web/updates/2016/10/resizeobserver) pour plus de détails et des exemples concrets.


## Bloqueur de pop-up amélioré {: #popup-blocker }

Je déteste tab-under. Vous les connaissez, c’est quand une page ouvre une fenêtre contextuelle vers une destination ET navigue sur la page. Habituellement, l’un d’eux est une annonce ou quelque chose que vous ne voulez pas.

À partir de Chrome 64, ces types de navigation seront bloqués et Google Chrome affichera une interface utilisateur native à l’utilisateur, lui permettant de suivre la redirection s’il le souhaite.


## `import.meta` {: #import-meta }

Lors de l'écriture de modules JavaScript, vous souhaitez souvent accéder à des métadonnées spécifiques à l'hôte concernant le module actuel. Chrome 64 prend désormais en charge la propriété `import.meta` dans les modules et expose l'URL du module en tant que `import.meta.url` .

Ceci est très utile lorsque vous souhaitez résoudre des ressources relatives au fichier de module par opposition au document HTML actuel.


## Et plus! {: #more }

Ce ne sont là que quelques-uns des changements apportés à Chrome 64 par les développeurs. Bien entendu, il y en a beaucoup plus.

* Chrome prend désormais en charge les [captures nommées](/web/updates/2017/07/upcoming-regexp-features#named_captures) et les [échappements de propriétés Unicode](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) dans les expressions régulières.
* La valeur `preload` par défaut pour les éléments `<audio>` et `<video>` est maintenant `metadata` . Cela met Chrome en ligne avec les autres navigateurs et permet de réduire l'utilisation de la bande passante et des ressources en ne chargeant que les métadonnées et non le support lui-même.
* Vous pouvez maintenant utiliser `Request.prototype.cache` pour afficher le mode de cache d'un `Request` et déterminer si une demande est une demande de rechargement.
* À l'aide de l'API Focus Management, vous pouvez maintenant focaliser un élément sans y accéder avec l'attribut `preventScroll` .

## `window.alert()` {: #window-alert }

Oh, et un de plus! Bien que ce ne soit pas vraiment une "fonctionnalité de développeur", cela me fait plaisir. `window.alert()` n'apporte plus d'onglet d'arrière-plan au premier plan! Au lieu de cela, l'alerte sera affichée lorsque l'utilisateur reviendra à cet onglet.

Plus de commutation aléatoire des onglets, car quelque chose a déclenché un `window.alert` sur moi. Je vous regarde le vieil agenda Google.


Assurez-vous de vous abonner (0) à notre [chaîne YouTube](https://goo.gl/6FP1a5) et vous recevrez une notification par e-mail chaque fois que nous lancerons une nouvelle vidéo ou ajouterons notre [flux RSS](https://www.youtube.com/user/ChromeDevelopers/) à votre lecteur de flux.


Je suis Pete LePage. Dès que Chrome 65 sera disponible, je serai ici pour vous dire ce qu’il ya de nouveau dans Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}