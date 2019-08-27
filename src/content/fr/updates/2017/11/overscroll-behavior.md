project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Introduction à la propriété CSS overscroll-behavior.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Prenez le contrôle de votre parchemin: personnalisez les effets d'extraction par rafraîchissement et de débordement {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

La [`overscroll-behavior` CSS
`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/) permet aux
développeurs de remplacer le comportement de défilement par débordement par
défaut du navigateur lorsqu'il atteint le haut / le bas du contenu. Les cas
d'utilisation incluent la désactivation de la fonctionnalité d'extraction pour
actualiser sur un téléphone mobile, la suppression des effets de lueur et
d'élargissement du défilement excessif et l'empêchement du contenu de la page de
défiler lorsqu'il est sous un modal / superposition.

`overscroll-behavior` nécessite Chrome 63+. Il est en cours de développement ou
est considéré par d'autres navigateurs. Voir
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) pour
plus d'informations. {: .caution }

## Contexte

### Défilement des limites et défilement des chaînes {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Faites défiler la chaîne sur Chrome Android.</figcaption>
</figure>

Le défilement est l’un des moyens les plus fondamentaux d’interagir avec une
page, mais certains modèles d’UX peuvent être difficiles à gérer en raison des
comportements par défaut insolites du navigateur. À titre d'exemple, prenons un
tiroir d'applications avec un grand nombre d'éléments que l'utilisateur peut
avoir à faire défiler. Lorsqu'ils atteignent le bas, le conteneur de débordement
cesse de défiler car il n'y a plus de contenu à consommer. En d'autres termes,
l'utilisateur atteint une "limite de défilement". Mais remarquez ce qui se passe
si l'utilisateur continue à faire défiler. **Le contenu *derrière* le tiroir
commence à défiler** ! Le défilement est pris en charge par le conteneur parent;
la page principale elle-même dans l'exemple.

Il s'avère que ce comportement s'appelle " **scroll chaining"** ; le
comportement par défaut du navigateur lors du défilement de contenu. Souvent, le
réglage par défaut est très joli, mais parfois ce n’est pas souhaitable ni même
inattendu. Certaines applications peuvent vouloir offrir une expérience
utilisateur différente lorsque l'utilisateur atteint une limite de défilement.

### L'effet Pull-to-refresh {: #p2r }

Tirer pour actualiser est un geste intuitif popularisé par les applications
mobiles telles que Facebook et Twitter. En tirant vers le bas sur un flux social
et en le relâchant, vous créez un nouvel espace pour les publications plus
récentes. En fait, cette UX est devenue *si populaire* que les navigateurs
mobiles tels que Chrome sous Android ont adopté le même effet. Glisser vers le
bas en haut de la page actualise la page entière:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Personnalisation de Twitter pour l'actualisation <br> lors de
l'actualisation d'un aliment dans leur PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Action native d'extraction et d'actualisation de Google Chrome
<br> rafraîchit la page entière.</figcaption>
  </figure>
</div>

Pour des situations telles que le [PWA de](/web/progressive-web-apps/) Twitter,
il peut être judicieux de désactiver l'action native d'extraction /
actualisation. Pourquoi? Dans cette application, vous ne voulez probablement pas
que l'utilisateur rafraîchit accidentellement la page. Il y a aussi le potentiel
de voir une animation à double rafraîchissement! Sinon, il serait peut-être plus
agréable de personnaliser l'action du navigateur, en l'alignant plus étroitement
sur la marque du site. Ce qui est malheureux, c’est que ce type de
personnalisation a été difficile à maîtriser. Les développeurs finissent par
écrire du code JavaScript inutile, ajoutent
[des](/web/tools/lighthouse/audits/passive-event-listeners) écouteurs tactiles
[non passifs](/web/tools/lighthouse/audits/passive-event-listeners) (qui
bloquent le défilement) ou collent la page entière dans un fichier 100vw / vh
`<div>` (pour empêcher le débordement de la page). Ces solutions de
contournement ont des effets négatifs [bien
documentés](https://wicg.github.io/overscroll-behavior/#intro) sur les
performances de défilement.

Nous pouvons faire mieux!

## Présentation `overscroll-behavior` {: #intro }

La [propriété](https://wicg.github.io/overscroll-behavior/)
`overscroll-behavior` est une nouvelle fonctionnalité CSS qui contrôle le
comportement de ce qui se produit lorsque vous faites défiler un conteneur (y
compris la page elle-même). Vous pouvez l'utiliser pour annuler le chaînage de
défilement, désactiver / personnaliser l'action d'extraction pour actualiser,
désactiver les effets de superposition sur iOS (lorsque Safari implémente le
`overscroll-behavior` ), etc. La meilleure partie est que l' <strong
data-md-type="double_emphasis">utilisation `overscroll-behavior` n'affecte pas
négativement les performances de la page</strong> comme les hacks mentionnés
dans l'intro!

La propriété prend trois valeurs possibles:

1. **auto** - Par défaut. Les parchemins provenant de l'élément peuvent se
propager aux éléments ancêtres.

- **contenir** - empêche le chaînage de défilement. Les parchemins ne se
propagent pas aux ancêtres, mais les effets locaux dans le nœud sont affichés.
Par exemple, l’effet de lueur de superposition sur Android ou l’effet élastique
sur iOS qui informe l’utilisateur lorsque celui-ci a atteint une limite de
défilement. **Remarque** : l'utilisation `overscroll-behavior: contain` :
`overscroll-behavior: contain` sur l'élément `html` empêche les actions de
navigation par incrustation.
- **aucun** - même que `contain` mais elle empêche également des effets dans le
nœud Défilement prolongé lui - même (par exemple , Android ou iOS éclat
Défilement prolongé rubberbanding).

Remarque: `overscroll-behavior` prend également en charge les raccourcis pour
`overscroll-behavior-x` et `overscroll-behavior-y` si vous souhaitez définir des
comportements uniquement pour un axe donné.

Examinons quelques exemples pour voir comment utiliser le `overscroll-behavior`
.

## Empêcher les parchemins d'échapper à un élément à position fixe {: #fixedpos }

### Le scénario de la chatbox {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
<figcaption>Le contenu sous la fenêtre de discussion défile également
:(</figcaption>
</figure>

Considérez une boîte de chat positionnée fixe qui se trouve au bas de la page.
L'intention est que la boîte de discussion soit un composant autonome et qu'elle
défile séparément du contenu situé derrière elle. Toutefois, en raison de
l'enchaînement des défilement, le document commence à défiler dès que
l'utilisateur a cliqué sur le dernier message de l'historique de discussion.

Pour cette application, il est plus approprié que les parchemins provenant de la
zone de discussion restent dans la discussion. Nous pouvons y arriver en
ajoutant `overscroll-behavior: contain` à l'élément qui contient les messages de
discussion:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Essentiellement, nous créons une séparation logique entre le contexte de
défilement de la boîte de dialogue et la page principale. Le résultat final est
que la page principale reste en place lorsque l'utilisateur atteint le haut / le
bas de l'historique de discussion. Les parchemins qui commencent dans la zone de
discussion ne se propagent pas.

### Le scénario de superposition de page {: #overlay }

Une autre variante du scénario de "sous-défilement" est lorsque vous voyez le
contenu défiler derrière une **superposition de positions fixes** . Un
`overscroll-behavior` cadeau est en ordre! Le navigateur essaie d'être utile,
mais il finit par rendre le site bogué.

**Exemple** - modal avec et sans `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Avant</b> : le contenu de la page défile sous la
superposition.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Après</b> : le contenu de la page ne défile pas sous la
superposition.</figcaption>
  </div>
</figure>

## Désactivation du pull-to-refresh {: #disablp2r }

**Désactiver l'action d'extraction pour actualiser correspond à une seule ligne
de code CSS** . Empêcher simplement le chaînage de défilement de tout l'élément
définissant une fenêtre. Dans la plupart des cas, c'est `<html>` ou `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Avec cet ajout simple, nous
[corrigeons](https://ebidel.github.io/demos/chatbox.html) les animations à
double extraction pour actualiser dans la [démo de
chatbox](https://ebidel.github.io/demos/chatbox.html) et pouvons, à la place,
implémenter un effet personnalisé qui utilise une animation de chargement plus
claire. La totalité de la boîte de réception s'estompe également au fur et à
mesure que celle-ci s'actualise:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Avant</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Après</figcaption>
  </div>
</figure>

Voici un extrait du [code
complet](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Désactivation des effets de lueur et d'élastiques en incrustation excessive {: #disableglow }

Pour désactiver l'effet de rebond lorsque vous `overscroll-behavior-y: none` une
limite de défilement, utilisez `overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Avant</b> : frapper la limite de défilement montre une
lueur.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Après</b> : lueur désactivée.</figcaption>
  </div>
</figure>

Remarque: Ceci préservera toujours les navigations de balayage gauche / droite.
Pour empêcher les navigations, vous pouvez utiliser `overscroll-behavior-x:
none` . Cependant, cela est [toujours en cours
d'implémentation](https://crbug.com/762023) dans Chrome.

## Démo complète {: #demo }

En [résumé, la démonstration](https://ebidel.github.io/demos/chatbox.html)
complète de [chatbox](https://ebidel.github.io/demos/chatbox.html) utilise le
`overscroll-behavior` de `overscroll-behavior` pour créer une animation
personnalisée d'extraction et d'actualisation et empêcher les parchemins
d'échapper au widget de chatbox. Cela fournit une expérience utilisateur
optimale qu'il aurait été difficile de réaliser sans `overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Voir la démo</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">La source</a></figcaption>
</figure>

<br>
