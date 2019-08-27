project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: L'API de création de badges est une nouvelle API de plate-forme Web qui
  permet aux applications Web installées de définir un badge pour l'ensemble de l'application,
  affiché à un emplacement spécifique au système d'exploitation associé à l'application,
  tel que l'écran d'accueil ou l'écran d'accueil.

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {#
wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags:
capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials
#} {# wf_featured_snippet: The Badging API is a new web platform API that allows
installed web apps to set an application-wide badge, shown in an
operating-system-specific place associated with the application, such as the
shelf or home screen. Badging makes it easy to subtly notify the user that there
is some new activity that might require their attention, or it can be used to
indicate a small amount of information, such as an unread count. #} {#
wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Badging pour les icônes d'application {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">Nous travaillons actuellement sur cette API dans le cadre
du <a href="/web/updates/capabilities">projet de</a> nouvelles <a
href="/web/updates/capabilities">fonctionnalités</a> et, à partir de Chrome 73,
elle est disponible en tant que version d' <a href="#ot"><b>évaluation
d'origine</b></a> . Cet article sera mis à jour à mesure que l'API de création
de badges évolue. <br> <b>Dernière mise à jour:</b> le 21 août 2019</aside>

## Qu'est-ce que l'API Badging? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>Exemple de Twitter avec 8 notifications et une autre application
affichant un badge de type drapeau.</figcaption>
</figure>

L'API de création de badges est une nouvelle API de plate-forme Web qui permet
aux applications Web installées de définir un badge au niveau de l'application,
affiché à un emplacement spécifique au système d'exploitation associé à
l'application (telle que l'écran d'accueil ou l'écran d'accueil).

Le badging permet de notifier de manière subtile à l'utilisateur qu'il existe
une nouvelle activité qui pourrait nécessiter son attention, ou qu'il peut être
utilisé pour indiquer une petite quantité d'informations, telle qu'un compte non
lu.

Les badges ont tendance à être plus conviviaux que les notifications et peuvent
être mis à jour avec une fréquence beaucoup plus élevée, car ils n'interrompent
pas l'utilisateur. Et, comme ils n'interrompent pas l'utilisateur, aucune
autorisation spéciale n'est nécessaire pour les utiliser.

[Lisez explicatif](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### Cas d'utilisation suggérés pour l'API de création de badges {: #use-cases }

Exemples de sites pouvant utiliser cette API:

- Chat, messagerie et applications sociales pour signaler que de nouveaux
messages sont arrivés ou pour afficher le nombre d'éléments non lus.
- Applications de productivité, pour signaler qu'une tâche d'arrière-plan de
longue durée (telle que le rendu d'une image ou d'une vidéo) est terminée.
- Jeux, pour signaler qu'une action du joueur est requise (par exemple, aux
échecs, lorsque c'est au tour du joueur).

## Etat actuel {: #status }

Étape | Statut
--- | ---
1. Créer un explicatif | [Achevée](https://github.com/WICG/badging/blob/master/explainer.md)
2. Créer le brouillon initial de la spécification | [Achevée](https://wicg.github.io/badging/)
**3. Recueillir les commentaires et itérer sur la conception** | [**En cours**](#feedback)
**4. Essai d'origine** | [**En cours**](#ot)
5. Lancement | Pas commencé

### Voir en action

1. À l'aide de Chrome 73 ou version ultérieure sous Windows ou Mac, ouvrez la
[démonstration de l'API Badging](https://badging-api.glitch.me/) .
2. Lorsque vous y êtes invité, cliquez sur **Installer** pour installer
l'application ou utilisez le menu Chrome pour l'installer, puis ouvrez-la en
tant que PWA installé. Notez qu'il doit être exécuté en tant que PWA installé
(dans votre barre de tâches ou votre station d'accueil).
3. Cliquez sur le bouton **Définir** ou **Effacer** pour définir ou effacer le
badge de l'icône de l'application. Vous pouvez également fournir un numéro pour
la *valeur* du *badge* .

Remarque: Bien que l'API Badging *dans Chrome* nécessite une application
installée avec une icône pouvant être réellement badgée, il est déconseillé de
faire des appels à l'API Badging en fonction de l'état d'installation. L'API de
création de badges peut s'appliquer à *n'importe quel endroit où* un navigateur
peut afficher un badge. Les développeurs ne doivent donc pas présumer des
situations dans lesquelles le navigateur fera fonctionner les badges. Appelez
simplement l'API quand elle existe. Si ça marche, ça marche. Sinon, ce n'est
tout simplement pas le cas.

## Comment utiliser l'API Badging {: #use }

Depuis Chrome 73, l’API de création de badges est disponible en tant que version
d’origine pour Windows (7+) et macOS. [Les essais
Origin](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
vous permettent d’essayer de nouvelles fonctionnalités et de nous faire part de
vos commentaires sur la convivialité, le côté pratique et l’efficacité, ainsi
que sur la communauté des standards Web. Pour plus d'informations, reportez-vous
au document [Origin Trials Guide for Web
Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### Prise en charge du badging sur plusieurs plates-formes

L'API de création de badges est prise en charge (dans une version d'évaluation
de l'origine) sous Windows et macOS. Android n'est pas pris en charge car il
vous oblige à afficher une notification, bien que cela puisse changer à
l'avenir. La prise en charge de Chrome OS est en attente de la mise en place du
badging sur la plateforme.

### Inscrivez-vous à l'essai d'origine {: #ot }

1. [Demander un
jeton](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
pour votre origine.
2. Ajoutez le jeton à vos pages. Il existe deux manières de fournir ce jeton sur
les pages de votre origine:
-  Ajoutez une balise `<meta>` d' `origin-trial` à l'en-tête de n'importe
quelle page. Par exemple, cela peut ressembler à quelque chose comme: `<meta
http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
-  Si vous pouvez configurer votre serveur, vous pouvez également fournir le
jeton sur les pages à l'aide d'un en `Origin-Trial` tête HTTP `Origin-Trial` .
L'en-tête de réponse obtenu devrait ressembler à `Origin-Trial: TOKEN_GOES_HERE`
: `Origin-Trial: TOKEN_GOES_HERE`

### Alternatives à l'essai d'origine

Si vous souhaitez tester l'API de création de badges localement, sans essai
d'origine, activez l'indicateur `#enable-experimental-web-platform-features`
dans `chrome://flags` .

### Utilisation de l'API de création de badges lors de l'essai d'origine

Dogfood: lors de l'essai de l'origine, l'API sera disponible via
`window.ExperimentalBadge` . Le code ci-dessous est basé sur la conception
actuelle et sera modifié avant qu’il n’atteigne le navigateur en tant qu’API
normalisée.

Pour utiliser l'API Badging, votre application Web doit répondre [aux critères
d'installation de Chrome](/web/fundamentals/app-install-banners/#criteria) et
l'utilisateur doit l'ajouter à son écran d'accueil.

L'interface `ExperimentalBadge` est un objet membre de la `window` . Il contient
deux méthodes:

- `set([number])` : définit le badge de l'application. Si une valeur est
fournie, définissez le badge sur la valeur fournie, sinon, affichez un point
blanc ordinaire (ou un autre indicateur approprié à la plate-forme).
- `clear()` : `clear()` le badge de l'application.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` et `ExperimentalBadge.clear()` peuvent être appelés
depuis une page d’avant-plan ou, éventuellement, par un prestataire de services.
Dans les deux cas, cela affecte l'ensemble de l'application, pas seulement la
page en cours.

Dans certains cas, le système d'exploitation peut ne pas autoriser la
représentation exacte du badge. Dans ce cas, le navigateur tentera de fournir la
meilleure représentation possible pour ce périphérique. Par exemple, alors que
l'API Badging n'est pas prise en charge sur Android, Android affiche uniquement
un point au lieu d'une valeur numérique.

Remarque: Ne supposez rien sur la façon dont l'agent utilisateur veut afficher
le badge. Nous nous attendons à ce que certains agents utilisateurs prennent un
numéro du type "4000" et le réécrivent en "99+". Si vous le saturez vous-même
(par exemple à "99"), le "+" n'apparaîtra pas. Peu importe le nombre actuel,
définissez simplement `Badge.set(unreadCount)` et laissez l'agent utilisateur le
gérer en conséquence.

## Commentaires {: #feedback }

Nous avons besoin de votre aide pour nous assurer que l'API Badging fonctionne
de manière à répondre à vos besoins et que nous ne manquons aucun scénario clé.

<aside class="key-point"><b>Nous avons besoin de votre aide!</b> - La conception
actuelle (autorisant-t-elle un entier ou une valeur de drapeau) répondra-t-elle
à vos besoins? Si ce n'est pas le cas, veuillez enregistrer un problème dans le
<a href="https://github.com/WICG/badging/issues">référentiel WICG / badging</a>
et fournir autant de détails que possible. En outre, un certain nombre de <a
href="https://github.com/WICG/badging/blob/master/choices.md">questions en
suspens</a> font encore l’objet de discussions et nous aimerions connaître votre
avis.</aside>

Nous aimerions également savoir comment vous envisagez d'utiliser l'API de
création de badges:

- Vous avez une idée de cas d'utilisation ou une idée de son utilisation?
- Avez-vous l'intention de l'utiliser?
- Vous aimez ça, et vous voulez montrer votre soutien?

Partagez vos réflexions sur la discussion du [discours WICG de l'API
Badging](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
.

{% include "web/_shared/helpful.html" %}

## Liens utiles {: #helpful }

- [Explicatrice
publique](https://github.com/WICG/badging/blob/master/explainer.md)
- [Badging API Démo](https://badging-api.glitch.me/) | [Badging source de
démonstration de l'API](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [Bug de suivi](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [Entrée
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- Demander un [jeton d'essai
d'origine](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [Comment utiliser un jeton d'essai
d'origine](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- Composant Blink: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
