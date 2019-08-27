project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Rendu sur le Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

En tant que développeurs, nous sommes souvent confrontés à des décisions qui
affecteront l’ensemble de l’architecture de nos applications. L'une des
principales décisions que les développeurs Web doivent prendre est de savoir où
mettre en œuvre la logique et le rendu dans leur application. Cela peut être
difficile, car il existe différentes manières de créer un site Web.

Notre compréhension de cet espace s’appuie sur les travaux que nous avons menés
dans Chrome pour communiquer avec de grands sites au cours des dernières années.
De manière générale, nous encourageons les développeurs à envisager le rendu sur
serveur ou le rendu statique sur une approche de réhydratation complète.

Afin de mieux comprendre les architectures que nous avons choisies lorsque nous
prenons cette décision, nous devons bien comprendre chaque approche et utiliser
une terminologie cohérente pour en parler. Les différences entre ces approches
aident à illustrer les inconvénients du rendu sur le Web du point de vue de la
performance.

## Terminologie {: #terminology }

**Le rendu**

- **SSR:** Rendu sur le serveur - Rend une application côté client ou
universelle en HTML sur le serveur.
- **RSE:** Rendu côté client - Rendu d'une application dans un navigateur,
généralement à l'aide du DOM.
- **Réhydratation:** «amorcez» les vues JavaScript sur le client de manière à ce
qu'elles réutilisent l'arborescence et les données DOM du fichier HTML rendu par
le serveur.
- **Prérendering:** exécution d'une application côté client au moment de la
génération pour capturer son état initial en tant que code HTML statique.

**Performance**

- **TTFB:** Time **To** First Byte (Délai jusqu'au premier octet): temps écoulé
entre le clic sur un lien et le premier bit de contenu entrant.
- **FP:** Première peinture - la première fois qu'un pixel devient visible pour
l'utilisateur.
- **FCP:** Première peinture de contenu - heure à laquelle le contenu demandé
(corps de l'article, etc.) devient visible.
- **TTI:** Time To Interactive - Heure à laquelle une page devient interactive
(événements câblés, etc.).

## Rendu du serveur {: #server-rendering }

*Le rendu du serveur génère le code HTML complet pour une page du serveur en
réponse à la navigation. Cela évite des allers-retours supplémentaires pour
l'extraction de données et la création de modèles sur le client, car ces
opérations sont gérées avant que le navigateur obtienne une réponse.*

Le rendu de serveur produit généralement une [première
peinture](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
rapide et une [première peinture de
contenu](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP). L'exécution de la logique de page et du rendu sur le serveur permet
d'éviter d'envoyer beaucoup de JavaScript au client, ce qui permet d'obtenir un
TTI ( [Time to
Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
) rapide. Cela a du sens, car avec le rendu sur serveur, vous envoyez simplement
du texte et des liens au navigateur de l'utilisateur. Cette approche peut
convenir à un large éventail de conditions de périphérique et de réseau et ouvre
des perspectives d'optimisation intéressantes pour le navigateur, telles que
l'analyse en continu de documents.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Avec le rendu du serveur, il est peu probable que les utilisateurs attendent le
traitement de JavaScript lié à la CPU avant de pouvoir utiliser votre site. Même
lorsque [des JS
tiers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
ne peuvent pas être évités, l'utilisation du rendu sur serveur pour réduire vos
propres [coûts JS
de](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
première partie peut vous donner plus de "
[budget](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
" pour le reste. Toutefois, cette approche présente un inconvénient principal:
la génération de pages sur le serveur prend du temps, ce qui peut souvent
ralentir le [délai jusqu'au premier
octet](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB).

Que le rendu du serveur soit suffisant pour votre application dépend en grande
partie du type d'expérience que vous développez. Il existe un débat de longue
date sur les applications correctes du rendu de serveur par rapport au rendu
côté client, mais il est important de se rappeler que vous pouvez choisir
d'utiliser le rendu de serveur pour certaines pages et pas pour d'autres.
Certains sites ont adopté avec succès les techniques de rendu hybrides.
[Le](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
serveur
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
rend ses pages de destination relativement statiques, tout en [effectuant une
pré](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
-
[extraction](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
du JS pour les pages très interactives, ce qui confère à ces pages plus lourdes
rendues par les clients un chargement plus rapide.

De nombreux frameworks, bibliothèques et architectures modernes permettent de
rendre la même application à la fois sur le client et sur le serveur. Ces
techniques peuvent être utilisées pour le rendu de serveur, mais il est
important de noter que les architectures où le rendu se produit à la fois sur le
serveur ***et*** sur le client constituent leur propre classe de solution avec
des caractéristiques de performance et des compromis très différents. Les
utilisateurs de React peuvent utiliser [renderToString
()](https://reactjs.org/docs/react-dom-server.html) ou des solutions intégrées
telles que [Next.js](https://nextjs.org) pour le rendu du serveur. Les
utilisateurs de Vue peuvent consulter le [guide de rendu](https://ssr.vuejs.org)
du [serveur](https://ssr.vuejs.org) de Vue ou [Nuxt](https://nuxtjs.org) .
Angulaire a [universel](https://angular.io/guide/universal) . La plupart des
solutions populaires utilisent cependant une certaine forme d'hydratation. Soyez
donc conscient de l'approche utilisée avant de choisir un outil.

## Rendu statique {: #static-rendering }

[Le rendu statique](https://frontarm.com/articles/static-vs-server-rendering/)
se produit au moment de la construction et offre une première peinture rapide,
une première peinture contenant du contenu et un temps pour interactif - en
supposant que la quantité de JS côté client soit limitée. À la différence du
rendu de serveur, il parvient également à obtenir un Time To First Byte toujours
rapide, car le code HTML d'une page ne doit pas être généré à la volée.
Généralement, le rendu statique signifie la production d'un fichier HTML séparé
pour chaque URL à l'avance. Les réponses HTML étant générées à l'avance, les
rendus statiques peuvent être déployés sur plusieurs CDN afin de tirer parti de
la mise en cache Edge.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Les solutions de rendu statique sont de toutes formes et de toutes tailles. Des
outils tels que [Gatsby](https://www.gatsbyjs.org) sont conçus pour que les
développeurs aient l’impression que leur application est rendue de manière
dynamique plutôt que générée lors de la construction. D'autres, comme
[Jekyl](https://jekyllrb.com) et [Metalsmith,](https://metalsmith.io) adoptent
leur nature statique, offrant une approche davantage basée sur des modèles.

Un des inconvénients du rendu statique est que des fichiers HTML individuels
doivent être générés pour chaque URL possible. Cela peut être difficile, voire
infaisable, lorsque vous ne pouvez pas prédire ce que seront ces URL à l’avance
ou pour les sites comportant un grand nombre de pages uniques.

Les utilisateurs de React sont peut-être familiarisés avec
[Gatsby](https://www.gatsbyjs.org) , [l’exportation statique de
Next.js](https://nextjs.org/learn/excel/static-html-export/) ou
[Navi](https://frontarm.com/navi/) - tous ces éléments facilitent la [création
d’](https://nextjs.org/learn/excel/static-html-export/) utilisateurs. Cependant,
il est important de comprendre la différence entre le rendu statique et le
prérendering: les pages rendues statiques sont interactives sans qu'il soit
nécessaire d'exécuter beaucoup de JS côté client, tandis que le prérendering
améliore la première peinture ou la première peinture contentante d'une
application à une seule page à démarrer. le client pour que les pages soient
vraiment interactives.

Si vous ne savez pas si une solution donnée est un rendu statique ou un
pré-rendu, essayez ce test: désactivez JavaScript et chargez les pages Web
créées. Pour les pages rendues statiquement, la plupart des fonctionnalités
existeront toujours sans JavaScript activé. Pour les pages prédéfinies, il peut
toujours y avoir des fonctionnalités de base telles que des liens, mais la
plupart des pages sont inertes.

Un autre test utile consiste à ralentir votre réseau à l'aide de Chrome DevTools
et à voir combien de JavaScript a été téléchargé avant qu'une page ne devienne
interactive. En règle générale, le processus de présélection nécessite plus de
JavaScript pour devenir interactif, et ce dernier a tendance à être plus
complexe que l'approche [Progressive
Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
utilisée par le rendu statique.

## Rendu de serveur vs rendu statique {: #server-vs-static }

Le rendu sur serveur n'est pas une solution miracle, sa nature dynamique peut
engendrer
[des](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
frais [généraux de
calcul](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
considérables. De nombreuses solutions de rendu de serveur ne se vident pas tôt,
peuvent retarder TTFB ou doubler les données envoyées (par exemple, l'état en
ligne utilisé par JS sur le client). Dans React, renderToString () peut être
lent car synchrone et mono-thread. Obtenir serveur de rendu « droit » peut
consister à trouver ou construire une solution pour la
[mise](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
en [cache
composants](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, gestion de la consommation de mémoire, l' application
[Memoization](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
techniques, et bien d' autres préoccupations. En général, vous traitez /
reconstruisez la même application plusieurs fois, une fois sur le client et une
fois sur le serveur. Ce n'est pas parce que le rendu sur le serveur peut faire
apparaître quelque chose plus tôt que vous avez moins de travail à faire.

Le rendu de serveur produit du code HTML à la demande pour chaque URL, mais peut
être plus lent que le simple fait de servir du contenu rendu statique. Si vous
pouvez mettre en œuvre le travail supplémentaire, le rendu du serveur + la [mise
en cache HTML](https://freecontent.manning.com/caching-in-react/) peuvent
réduire considérablement le temps de rendu du serveur. L'avantage du rendu de
serveur est la capacité d'extraire plus de données "en direct" et de répondre à
un ensemble de demandes plus complet que ce qui est possible avec le rendu
statique. Les pages nécessitant une personnalisation sont un exemple concret du
type de demande qui ne fonctionnerait pas bien avec le rendu statique.

Le rendu du serveur peut également présenter des décisions intéressantes lors de
la construction d'un
[PWA](https://developers.google.com/web/progressive-web-apps/) . Est-il
préférable d'utiliser la mise en cache de personnel de [service
de](https://developers.google.com/web/fundamentals/primers/service-workers/)
page complète ou simplement de restituer des éléments de contenu individuels au
serveur?

## Rendu côté client (CSR) {: #csr }

*Le rendu côté client (RSC) signifie le rendu de pages directement dans le
navigateur à l'aide de JavaScript. Toute la logique, la récupération de données,
la modélisation et le routage sont gérés sur le client plutôt que sur le
serveur.*

Le rendu côté client peut être difficile à obtenir et à conserver rapidement
pour les mobiles. Il peut s’approcher des performances du rendu de serveur pur
si le travail effectué est minimal, en maintenant un [budget JavaScript
serré](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144) et
en apportant de la valeur dans le moins de
[RTT](https://en.wikipedia.org/wiki/Round-trip_delay_time) possible. Les scripts
et les données critiques peuvent être livrés plus rapidement en utilisant [HTTP
/ 2 Server
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) ou
`<link rel=preload>` , ce qui permet à l'analyseur de fonctionner plus
rapidement pour vous. Des modèles tels que
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
méritent d’être évalués afin de s’assurer que les navigations initiale et
ultérieure se sentent instantanées.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

Le principal inconvénient du rendu côté client est que la quantité de JavaScript
requise a tendance à augmenter parallèlement à la croissance d'une application.
Cela devient particulièrement difficile avec l'ajout de nouvelles bibliothèques
JavaScript, de polyfill et de code tiers, qui se font concurrence pour la
puissance de traitement et doivent souvent être traités avant que le contenu
d'une page puisse être restitué. Les expériences construites avec la RSE
reposant sur des ensembles JavaScript volumineux doivent prendre en compte le
[fractionnement agressif du
code](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
et ne pas oublier de charger paresseux du
[code](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
JavaScript - "ne vous sert que ce dont vous avez besoin, quand vous en avez
besoin". Pour les expériences avec peu ou pas d'interactivité, le rendu sur
serveur peut représenter une solution plus évolutive à ces problèmes.

Pour les personnes qui construisent une application à une seule page, identifier
les parties principales de l'interface utilisateur partagées par la plupart des
pages signifie que vous pouvez appliquer la technique de [mise en cache
d'Application
Shell](https://developers.google.com/web/updates/2015/11/app-shell) . Combiné
aux travailleurs du service, cela peut considérablement améliorer la performance
perçue lors de visites répétées.

## Combinaison du rendu du serveur et de la CSR via la réhydratation {: #rehydration }

Souvent appelée «rendu universel» ou simplement «SSR», cette approche tente de
régler les compromis entre le rendu côté client et le rendu serveur en
effectuant les deux. Les demandes de navigation telles que le chargement ou le
rechargement de pages entières sont gérées par un serveur qui restitue
l'application au format HTML, puis le code JavaScript et les données utilisés
pour le rendu sont incorporés au document résultant. Une fois soigneusement mis
en œuvre, cela permet d'obtenir une première peinture rapide au contenu comme
dans le cas du rendu de serveur, puis «reprend» en rendant à nouveau le client à
l'aide d'une technique appelée [(ré)
hydratation](https://docs.electrode.io/guides/general/server-side-data-hydration)
. Cette solution est nouvelle, mais elle peut avoir des inconvénients
considérables en termes de performances.

Le principal inconvénient du SSR avec réhydratation est qu’il peut avoir un
impact négatif significatif sur Time To Interactive, même s’il améliore First
Paint. Les pages SSR semblent souvent chargées et interactives de manière
trompeuse, mais ne peuvent pas répondre aux entrées tant que le JS côté client
n'est pas exécuté et que les gestionnaires d'événements ne sont associés. Cela
peut prendre des secondes, voire des minutes sur le mobile.

Peut-être l'avez-vous déjà expérimenté vous-même - pendant un certain temps
après avoir eu l'impression qu'une page avait été chargée, un clic ou un appui
ne fait rien. Cela devient vite frustrant… *«Pourquoi rien ne se passe? Pourquoi
je ne peux pas faire défiler? "*

### Un problème de réhydratation: une application pour le prix de deux {: #rehydration-issues }

Les problèmes de réhydratation peuvent souvent être pires que l'interactivité
retardée due au SC. Pour que le code JavaScript côté client puisse «détecter»
avec précision le point où le serveur s'est arrêté sans avoir à demander à
nouveau toutes les données utilisées par le serveur pour restituer son code
HTML, les solutions SSR actuelles sérialisent généralement la réponse d'une
interface utilisateur. dépendances de données dans le document sous forme de
balises de script. Le document HTML résultant contient un haut niveau de
duplication:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Comme vous pouvez le constater, le serveur renvoie une description de
l'interface utilisateur de l'application en réponse à une demande de navigation,
mais renvoie également les données source utilisées pour composer cette
interface utilisateur, ainsi qu'une copie complète de la mise en œuvre de
l'interface utilisateur qui démarre ensuite sur le client. . Ce n'est qu'après
que bundle.js a fini de charger et d'exécuter cette interface utilisateur de
devenir interactive.

Les mesures de performance recueillies à partir de sites Web réels utilisant la
réhydratation SSR indiquent que son utilisation devrait être fortement
déconseillée. En fin de compte, la raison en est liée à l'expérience
utilisateur: il est extrêmement facile de laisser les utilisateurs dans une
«vallée surnaturelle».

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

La réhydratation offre cependant un espoir. À court terme, seule l'utilisation
du SSR pour du contenu pouvant être mis en mémoire cache peut réduire le délai
TTFB, produisant des résultats similaires à ceux du prérendering. Une
réhydratation
[progressive](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, progressive ou partielle peut être la clé pour rendre cette technique plus
viable à l’avenir.

## Diffusion en continu du serveur et réhydratation progressive {: #progressive-rehydration }

Le rendu sur serveur a connu un certain nombre de développements au cours des
dernières années.

[Le rendu en continu du
serveur](https://zeit.co/blog/streaming-server-rendering-at-spectrum) vous
permet d’envoyer du HTML en morceaux que le navigateur peut restituer
progressivement au fur et à mesure de sa réception. Cela peut fournir une
première peinture rapide et une première peinture contenant du contenu, car le
balisage arrive plus rapidement aux utilisateurs. Dans React, les flux étant
asynchrones dans [renderToNodeStream
()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) -
comparés à renderToString synchrone - signifie que la contrepression est bien
gérée.

La réhydratation progressive vaut également la peine d'être surveillée, et React
a déjà [exploré](https://github.com/facebook/react/pull/14717) quelque chose.
Avec cette approche, les composants individuels d'une application rendue par le
serveur sont «démarrés» au fil du temps, plutôt que l'approche courante actuelle
consistant à initialiser l'ensemble de l'application en une seule fois. Cela
peut aider à réduire la quantité de JavaScript nécessaire pour rendre les pages
interactives, car la mise à niveau côté client des parties de la page de faible
priorité peut être différée pour éviter de bloquer le thread principal. Cela
peut également aider à éviter l'un des pièges les plus courants de la
réhydratation SSR, dans lequel une arborescence DOM rendue par le serveur est
détruite puis immédiatement reconstruite, le plus souvent parce que le client
synchrone initial rendait des données requises qui n'étaient pas encore prêtes,
peut-être en attente de Promise. résolution.

### Réhydratation partielle {: #partial-rehydration }

La réhydratation partielle s'est avérée difficile à mettre en œuvre. Cette
approche est une extension de l'idée de réhydratation progressive, qui consiste
à analyser les éléments individuels (composants / vues / arbres) à réhydrater
progressivement et à identifier ceux présentant une interactivité faible ou
aucune réactivité. Pour chacune de ces parties essentiellement statiques, le
code JavaScript correspondant est ensuite transformé en références inertes et en
fonctionnalités décoratives, réduisant ainsi leur encombrement côté client à
quasiment nul. L'approche d'hydratation partielle vient avec ses propres
problèmes et compromis. Cela pose des défis intéressants pour la mise en cache,
et la navigation côté client signifie que nous ne pouvons pas supposer que le
code HTML rendu par le serveur pour les parties inertes de l'application sera
disponible sans chargement complet de la page.

### Rendu trisomorphe {: #trisomorphic }

Si [les travailleurs du
service](https://developers.google.com/web/fundamentals/primers/service-workers/)
sont une option pour vous, le rendu «trisomorphique» peut également être
intéressant. Il s'agit d'une technique dans laquelle vous pouvez utiliser le
rendu de serveur en continu pour les navigations initiales / non JS, puis
demander à votre technicien de service de restituer le rendu du code HTML pour
les navigations après son installation. Cela permet de conserver les composants
et les modèles mis en cache à jour et permet une navigation de style SPA pour le
rendu de nouvelles vues au cours de la même session. Cette approche fonctionne
mieux lorsque vous pouvez partager le même code de modèle et de routage entre le
serveur, la page client et l'agent de service.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## Considérations sur le référencement {: #seo }

Les équipes prennent souvent en compte l'impact du référencement lors du choix
d'une stratégie de rendu sur le Web. Le rendu sur serveur est souvent choisi
pour offrir une expérience "complète" aux yeux des robots peut facilement
interpréter. Les robots d'exploration [comprennent peut-être
JavaScript](https://web.dev/discoverable/how-search-works) , mais leur rendu est
souvent [limité](/search/docs/guides/rendering) . Le rendu côté client peut
fonctionner, mais souvent pas sans tests supplémentaires et sans intervention de
votre part. Plus récemment, [le rendu
dynamique](/search/docs/guides/dynamic-rendering) est également devenu une
option à considérer si votre architecture est fortement basée sur le code
JavaScript côté client.

En cas de doute, l'outil [Mobile Friendly
Test](https://search.google.com/test/mobile-friendly) est un outil précieux pour
vérifier que l'approche choisie fait ce que vous souhaitez. Il présente un
aperçu visuel de l’apparence d’une page pour le robot d'exploration de Google,
du contenu HTML sérialisé trouvé (après l'exécution de JavaScript) et de toute
erreur rencontrée lors du rendu.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## En conclusion ... {: #wrapup }

Lorsque vous choisissez une approche de rendu, mesurez et comprenez quels sont
vos goulots d'étranglement. Déterminez si le rendu statique ou le rendu sur
serveur peut vous permettre d’atteindre 90% du trajet. Il est tout à fait
possible d’envoyer du HTML principalement avec un minimum de JS afin d’obtenir
une expérience interactive. Voici une infographie pratique montrant le spectre
serveur-client:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Crédits {: #credits }

Merci à tous pour leurs critiques et leur inspiration:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson et
Sebastian Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
