project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Rendern im Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

Als Entwickler stehen wir häufig vor Entscheidungen, die sich auf die gesamte
Architektur unserer Anwendungen auswirken. Eine der wichtigsten Entscheidungen,
die Webentwickler treffen müssen, ist die Implementierung von Logik und
Rendering in ihrer Anwendung. Dies kann schwierig sein, da es verschiedene
Möglichkeiten gibt, eine Website zu erstellen.

Unser Verständnis dieses Bereichs wird durch unsere Arbeit in Chrome in den
letzten Jahren mit großen Websites geprägt. Im Großen und Ganzen empfehlen wir
Entwicklern, das Rendern von Servern oder das statische Rendern im Rahmen eines
vollständigen Rehydratisierungsansatzes in Betracht zu ziehen.

Um die Architekturen, aus denen wir uns bei dieser Entscheidung entscheiden,
besser verstehen zu können, müssen wir die einzelnen Ansätze und die
einheitliche Terminologie genau kennen, die wir verwenden müssen, wenn wir
darüber sprechen. Die Unterschiede zwischen diesen Ansätzen helfen dabei, die
Kompromisse beim Rendern im Web durch die Linse der Leistung zu
veranschaulichen.

## Terminologie {: #terminology }

**Rendern**

- **SSR:** Serverseitiges Rendern - Rendern einer clientseitigen oder
universellen Anwendung in HTML auf dem Server.
- **CSR:** Client-seitiges Rendern - Rendern einer App in einem Browser, in der
Regel mithilfe des DOM.
- **Rehydration:** "Booten" von JavaScript-Ansichten auf dem Client, sodass sie
den DOM-Baum und die Daten des vom Server gerenderten HTML wiederverwenden.
- **Vorrendern:** Ausführen einer clientseitigen Anwendung zur Erstellungszeit,
um ihren Anfangszustand als statisches HTML zu erfassen.

**Performance**

- **TTFB:** Time to First Byte (Zeit bis zum ersten Byte) - wird als die Zeit
zwischen dem Klicken auf einen Link und dem **Eintreffen** des ersten
Inhaltsbits angesehen.
- **FP:** First Paint - Das erste Mal, dass ein Pixel für den Benutzer sichtbar
wird.
- **FCP:** First Contentful Paint - Der Zeitpunkt, zu dem der angeforderte
Inhalt (Artikelkörper usw.) sichtbar wird.
- **TTI:** Time To Interactive - die Zeit, zu der eine Seite interaktiv wird
(Ereignisse verkabelt usw.).

## Server-Rendering {: #server-rendering }

*Server-Rendering generiert als Antwort auf die Navigation den vollständigen
HTML-Code für eine Seite auf dem Server. Auf diese Weise werden zusätzliche
Roundtrips zum Abrufen und Schablonieren von Daten auf dem Client vermieden, da
diese behandelt werden, bevor der Browser eine Antwort erhält.*

Server-Rendering erzeugt im Allgemeinen ein schnelles [First
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FP) und ein schnelles [First Contentful
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP). Durch das Ausführen von Seitenlogik und Rendering auf dem Server kann
vermieden werden, dass viel JavaScript an den Client gesendet wird, wodurch eine
schnelle [Time to
Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
(TTI) erreicht wird. Dies ist sinnvoll, da beim Server-Rendering nur Text und
Links an den Browser des Benutzers gesendet werden. Dieser Ansatz eignet sich
für ein breites Spektrum von Geräte- und Netzwerkbedingungen und eröffnet
interessante Browseroptimierungen wie das Parsen von Streaming-Dokumenten.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Beim Server-Rendering müssen Benutzer wahrscheinlich nicht auf die Verarbeitung
von CPU-gebundenem JavaScript warten, bevor sie Ihre Website verwenden können.
Auch wenn [JS von
Drittanbietern](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
nicht vermieden werden kann, können Sie durch die Verwendung von
Server-Rendering zur Reduzierung Ihrer eigenen [JS-Kosten
von](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
Erstanbietern mehr "
[Budget](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
" für den Rest erhalten. Dieser Ansatz hat jedoch einen Hauptnachteil: Das
Generieren von Seiten auf dem Server nimmt Zeit in Anspruch, was häufig zu einer
langsameren [Zeit bis zum ersten
Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) ( [Time to First
Byte,](https://en.wikipedia.org/wiki/Time_to_first_byte) TTFB) führen kann.

Ob Server-Rendering für Ihre Anwendung ausreicht, hängt weitgehend davon ab,
welche Art von Erfahrung Sie erstellen. Es gibt eine langjährige Debatte über
die korrekten Anwendungen des Server-Renderings im Vergleich zum clientseitigen
Rendering. Beachten Sie jedoch, dass Sie das Server-Rendering für einige Seiten
und nicht für andere Seiten verwenden können. Einige Websites haben mit Erfolg
Hybrid-Rendering-Techniken übernommen. [Der
Netflix-](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
Server rendert seine relativ statischen Zielseiten, während der JS-Server für
interaktionsintensive Seiten
[vorab](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
abgerufen wird. Auf diese Weise haben diese umfangreicheren clientseitig
gerenderten Seiten eine bessere Chance, schnell geladen zu werden.

Viele moderne Frameworks, Bibliotheken und Architekturen ermöglichen es,
dieselbe Anwendung sowohl auf dem Client als auch auf dem Server zu rendern.
Diese Techniken können für das Server-Rendering verwendet werden. Es ist jedoch
wichtig zu beachten, dass Architekturen, bei denen das Rendering sowohl auf dem
Server ***als auch*** auf dem Client erfolgt, eine eigene Lösungsklasse mit sehr
unterschiedlichen Leistungseigenschaften und Kompromissen darstellen.
Reagierende Benutzer können [renderToString
()](https://reactjs.org/docs/react-dom-server.html) oder darauf erstellte
Lösungen wie [Next.js](https://nextjs.org) für das Server-Rendering verwenden.
Vue-Benutzer können sich das [Server-Rendering-Handbuch
von](https://ssr.vuejs.org) Vue oder [Nuxt ansehen](https://nuxtjs.org) . Winkel
hat [Universal](https://angular.io/guide/universal) . Bei den meisten gängigen
Lösungen wird jedoch eine Art Flüssigkeitszufuhr eingesetzt. Beachten Sie daher
die Vorgehensweise, bevor Sie ein Werkzeug auswählen.

## Statisches Rendern {: #static-rendering }

[Das statische
Rendern](https://frontarm.com/articles/static-vs-server-rendering/) erfolgt zum
Zeitpunkt der Erstellung und bietet ein schnelles "First Paint", "First
Contentful Paint" und "Time To Interactive" - vorausgesetzt, die Anzahl der
clientseitigen JS ist begrenzt. Anders als beim Server-Rendering wird auch eine
konstant schnelle Zeit bis zum ersten Byte erreicht, da der HTML-Code für eine
Seite nicht im laufenden Betrieb generiert werden muss. Im Allgemeinen bedeutet
statisches Rendern, dass im Voraus für jede URL eine separate HTML-Datei
erstellt wird. Da HTML-Antworten im Voraus generiert werden, können statische
Renderings auf mehreren CDNs bereitgestellt werden, um das Edge-Caching zu
nutzen.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Lösungen für das statische Rendern gibt es in allen Formen und Größen. Tools wie
[Gatsby](https://www.gatsbyjs.org) sollen Entwicklern das Gefühl vermitteln,
dass ihre Anwendung dynamisch gerendert und nicht als Build-Schritt generiert
wird. Andere wie [Jekyl](https://jekyllrb.com) und [Metalsmith
begrüßen](https://metalsmith.io) ihre statische Natur und bieten einen
schablonenbasierten Ansatz.

Ein Nachteil des statischen Renderns ist, dass für jede mögliche URL einzelne
HTML-Dateien generiert werden müssen. Dies kann schwierig oder sogar unmöglich
sein, wenn Sie nicht vorhersagen können, welche URLs im Voraus angezeigt werden
sollen, oder für Websites mit einer großen Anzahl eindeutiger Seiten.

Reagierende Benutzer sind möglicherweise mit [Gatsby](https://www.gatsbyjs.org)
, [Next.js statischem
Export](https://nextjs.org/learn/excel/static-html-export/) oder
[Navi](https://frontarm.com/navi/) vertraut - all dies erleichtert das Verfassen
mithilfe von Komponenten. Es ist jedoch wichtig, den Unterschied zwischen
statischem Rendering und Prerendering zu verstehen: Statisch gerenderte Seiten
sind interaktiv, ohne dass viel clientseitiges JS ausgeführt werden muss,
wohingegen das Prerendering das First Paint oder First Contentful Paint einer
einzelnen Seitenanwendung verbessert, auf der gebootet werden muss der Client,
damit die Seiten wirklich interaktiv sind.

Wenn Sie nicht sicher sind, ob es sich bei einer bestimmten Lösung um statisches
Rendern oder Vorrendern handelt, versuchen Sie diesen Test: Deaktivieren Sie
JavaScript und laden Sie die erstellten Webseiten. Bei statisch gerenderten
Seiten bleibt der größte Teil der Funktionen ohne aktiviertes JavaScript
erhalten. Für vorgerenderte Seiten gibt es möglicherweise noch einige
grundlegende Funktionen wie Links, aber der größte Teil der Seite ist inaktiv.

Ein weiterer nützlicher Test besteht darin, Ihr Netzwerk mit Chrome DevTools zu
verlangsamen und zu beobachten, wie viel JavaScript heruntergeladen wurde, bevor
eine Seite interaktiv wird. Das Vorrendern erfordert im Allgemeinen mehr
JavaScript, um interaktiv zu werden, und JavaScript ist in der Regel komplexer
als der Ansatz der [progressiven
Verbesserung](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
, der beim statischen Rendern verwendet wird.

## Server-Rendering vs. statisches Rendering {: #server-vs-static }

Server-Rendering ist kein Wundermittel - seine Dynamik kann mit
[erheblichen](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
Kosten für den [Rechenaufwand
verbunden](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
sein. Viele Server-Rendering-Lösungen werden nicht vorzeitig geleert, können
TTFB verzögern oder die gesendeten Daten verdoppeln (z. B. Inline-Status, der
von JS auf dem Client verwendet wird). In React kann renderToString () langsam
sein, da es synchron und Singlethread ist. Das richtige Rendern von Servern kann
das Finden oder Erstellen einer Lösung für das [Zwischenspeichern von
Komponenten](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, das Verwalten des Speicherverbrauchs, das Anwenden von
[Memo-](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
Techniken und viele andere Probleme umfassen. Im Allgemeinen wird dieselbe
Anwendung mehrmals verarbeitet / neu erstellt - einmal auf dem Client und einmal
auf dem Server. Nur weil Server-Rendering dazu führen kann, dass etwas früher
angezeigt wird, bedeutet dies nicht, dass Sie plötzlich weniger Arbeit zu tun
haben.

Server-Rendering erzeugt HTML-On-Demand für jede URL, kann jedoch langsamer
sein, als nur statisch gerenderten Inhalt bereitzustellen. Wenn Sie zusätzliche
Arbeitsschritte [ausführen](https://freecontent.manning.com/caching-in-react/)
können, können Server-Rendering und
[HTML-Caching](https://freecontent.manning.com/caching-in-react/) die
Server-Rendering-Zeit erheblich verkürzen. Der Vorteil von Server-Rendering ist
die Fähigkeit, mehr "Live" -Daten abzurufen und auf einen vollständigeren Satz
von Anforderungen zu antworten, als dies bei statischem Rendering möglich ist.
Zu personalisierende Seiten sind ein konkretes Beispiel für die Art der
Anforderung, die mit statischem Rendering nicht gut funktioniert.

Das Server-Rendering kann beim Erstellen einer
[PWA](https://developers.google.com/web/progressive-web-apps/) auch interessante
Entscheidungen enthalten. Ist es besser, das ganzseitige
[Service-Worker-](https://developers.google.com/web/fundamentals/primers/service-workers/)
Caching zu verwenden oder nur einzelne Inhalte auf dem Server zu rendern?

## Client-Side-Rendering (CSR) {: #csr }

*Client-Side-Rendering (CSR) bezeichnet das Rendern von Seiten direkt im Browser
mithilfe von JavaScript. Alle Logik-, Datenabruf-, Vorlagen- und Routingvorgänge
werden auf dem Client und nicht auf dem Server ausgeführt.*

Clientseitiges Rendern ist für Mobilgeräte unter Umständen schwierig und schnell
zu erhalten. Es kann sich der Leistung von reinem Server-Rendering annähern,
wenn es nur minimale Arbeit leistet, ein [knappes
JavaScript-Budget](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144)
[einhält](https://en.wikipedia.org/wiki/Round-trip_delay_time) und in so wenigen
[RTTs](https://en.wikipedia.org/wiki/Round-trip_delay_time) wie möglich Wert
[liefert](https://en.wikipedia.org/wiki/Round-trip_delay_time) . Kritische
Skripte und Daten können über [HTTP / 2 Server
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) oder
`<link rel=preload>` schneller `<link rel=preload>` , sodass der Parser
schneller für Sie funktioniert.
[Es](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
lohnt sich, Muster wie
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
auszuwerten, um sicherzustellen, dass sich die ersten und nachfolgenden
Navigationen sofort anfühlen.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

Der Hauptnachteil des clientseitigen Renderns besteht darin, dass die
erforderliche JavaScript-Menge mit zunehmender Anwendungsgröße zunimmt. Dies
wird besonders schwierig, wenn neue JavaScript-Bibliotheken, Polyfills und Code
von Drittanbietern hinzugefügt werden, die um Verarbeitungsleistung konkurrieren
und häufig verarbeitet werden müssen, bevor der Inhalt einer Seite gerendert
werden kann. Erfahrungen mit CSR, die auf großen JavaScript-Paketen basieren,
sollten eine [aggressive Code-Aufteilung
in](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
Betracht ziehen und darauf achten, JavaScript nur dann zu laden, wenn Sie es
benötigen. Für Erfahrungen mit wenig oder keiner Interaktivität kann das
Server-Rendering eine skalierbarere Lösung für diese Probleme darstellen.

Wenn Sie eine Anwendung mit nur einer Seite erstellen, können Sie die
wichtigsten Teile der Benutzeroberfläche identifizieren, die von den meisten
Seiten gemeinsam genutzt werden, um die [Zwischenspeichertechnik von Application
Shell](https://developers.google.com/web/updates/2015/11/app-shell) anzuwenden.
In Kombination mit Servicemitarbeitern kann dies die wahrgenommene Leistung bei
wiederholten Besuchen erheblich verbessern.

## Server-Rendering und CSR über Rehydration kombinieren {: #rehydration }

Dieser Ansatz, der oft als Universal Rendering oder einfach als „SSR“ bezeichnet
wird, versucht, die Kompromisse zwischen clientseitigem Rendering und
Server-Rendering durch beides zu glätten. Navigationsanforderungen wie das Laden
oder Neuladen ganzer Seiten werden von einem Server verarbeitet, der die
Anwendung in HTML rendert. Anschließend werden das JavaScript und die zum
Rendern verwendeten Daten in das resultierende Dokument eingebettet. Bei
sorgfältiger Implementierung wird genau wie beim Server-Rendering ein schnelles
First Contentful Paint erzielt, das durch erneutes Rendern auf dem Client
mithilfe einer als [(Re-) Hydration
bezeichneten](https://docs.electrode.io/guides/general/server-side-data-hydration)
Technik "aufgenommen" wird. Dies ist eine neuartige Lösung, die jedoch einige
erhebliche Leistungsmängel aufweisen kann.

Der Hauptnachteil von SSR bei der Rehydratisierung besteht darin, dass es einen
erheblichen negativen Einfluss auf Time To Interactive haben kann, selbst wenn
es First Paint verbessert. SSR-Seiten sehen oft trügerisch geladen und
interaktiv aus, können jedoch erst dann auf Eingaben reagieren, wenn die
clientseitige JS ausgeführt wird und Ereignishandler angehängt wurden. Dies kann
auf dem Handy Sekunden oder sogar Minuten dauern.

Vielleicht haben Sie das selbst erlebt - für einen Zeitraum, nachdem eine Seite
geladen zu sein scheint, hat das Klicken oder Tippen nichts zu tun. Das wird
schnell frustrierend ... *„Warum passiert nichts? Warum kann ich nicht scrollen?
"*

### Ein Rehydrationsproblem: Eine App zum Preis von zwei {: #rehydration-issues }

Rehydrationsprobleme können aufgrund von JS oft schlimmer sein als verzögerte
Interaktivität. Damit das clientseitige JavaScript genau dort „abrufen“ kann, wo
der Server aufgehört hat, ohne alle Daten erneut anfordern zu müssen, die der
Server zum Rendern seines HTML-Codes verwendet hat, serialisieren aktuelle
SSR-Lösungen im Allgemeinen die Antwort von einer Benutzeroberfläche
Datenabhängigkeiten in das Dokument als Skript-Tags. Das resultierende
HTML-Dokument enthält ein hohes Maß an Duplizierung:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Wie Sie sehen, gibt der Server eine Beschreibung der Benutzeroberfläche der
Anwendung als Antwort auf eine Navigationsanforderung zurück, gibt jedoch auch
die Quelldaten zurück, die zum Erstellen dieser Benutzeroberfläche verwendet
wurden, sowie eine vollständige Kopie der Benutzeroberflächenimplementierung,
die dann auf dem Client gestartet wird . Erst nachdem bundle.js geladen und
ausgeführt wurde, wird diese Benutzeroberfläche interaktiv.

Leistungsmetriken, die von echten Websites mit SSR-Rehydrierung erfasst wurden,
weisen darauf hin, dass von deren Verwendung dringend abgeraten werden sollte.
Letztendlich liegt der Grund in der Benutzererfahrung: Es ist extrem einfach,
Benutzer in einem „unheimlichen Tal“ zurückzulassen.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

Es gibt jedoch Hoffnung für eine SSR mit Rehydration. Kurzfristig kann die
TTFB-Verzögerung nur durch die Verwendung von SSR für Inhalte mit hoher
Cachefreundlichkeit verringert werden. Dies führt zu ähnlichen Ergebnissen wie
beim Prerendering. Eine
[schrittweise](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, schrittweise oder teilweise Rehydratisierung kann der Schlüssel sein, um diese
Technik in Zukunft praktikabler zu machen.

## Streaming-Server-Rendering und progressive Rehydration {: #progressive-rehydration }

Das Server-Rendering hat in den letzten Jahren eine Reihe von Entwicklungen
erfahren.

[Beim Streaming
Server-Rendering](https://zeit.co/blog/streaming-server-rendering-at-spectrum)
können Sie HTML-Code in Blöcken senden, die der Browser beim Empfang
schrittweise rendern kann. Dies kann ein schnelles First Paint und First
Contentful Paint bereitstellen, da Markups schneller bei den Benutzern ankommen.
In React bedeutet, dass Streams in [renderToNodeStream ()
im](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) Vergleich
zu synchronem renderToString asynchron sind, dass der Gegendruck gut verarbeitet
wird.

Eine fortschreitende Rehydratation ist ebenfalls einen Blick wert und etwas, das
React [erforscht hat](https://github.com/facebook/react/pull/14717) . Bei diesem
Ansatz werden einzelne Teile einer vom Server gerenderten Anwendung im Laufe der
Zeit "hochgefahren", anstatt wie bisher üblich die gesamte Anwendung auf einmal
zu initialisieren. Dies kann dazu beitragen, die Menge an JavaScript zu
reduzieren, die erforderlich ist, um Seiten interaktiv zu machen, da die
clientseitige Aktualisierung von Teilen der Seite mit niedriger Priorität
zurückgestellt werden kann, um das Blockieren des Hauptthreads zu verhindern.
Dies kann auch dazu beitragen, eine der häufigsten SSR-Probleme bei der
Rehydration zu vermeiden, bei der ein vom Server gerenderter DOM-Baum zerstört
und dann sofort wiederhergestellt wird. Meistens, weil für das erste synchrone
clientseitige Rendern Daten erforderlich waren, die noch nicht fertig waren und
möglicherweise auf Promise warteten Auflösung.

### Teilweise Rehydration {: #partial-rehydration }

Eine teilweise Rehydratisierung hat sich als schwierig zu implementieren
erwiesen. Dieser Ansatz ist eine Erweiterung der Idee der progressiven
Rehydratisierung, bei der die einzelnen Teile (Komponenten / Ansichten / Bäume),
die progressiv rehydriert werden sollen, analysiert werden und diejenigen mit
geringer Interaktivität oder ohne Reaktivität identifiziert werden. Für jeden
dieser meist statischen Teile wird der entsprechende JavaScript-Code dann in
inaktive Referenzen und dekorative Funktionen umgewandelt, wodurch der
clientseitige Footprint auf nahezu Null reduziert wird. Der Ansatz der
teilweisen Flüssigkeitszufuhr bringt seine eigenen Probleme und Kompromisse mit
sich. Das Caching ist mit einigen interessanten Herausforderungen verbunden, und
die clientseitige Navigation bedeutet, dass wir nicht davon ausgehen können,
dass vom Server gerendertes HTML für inerte Teile der Anwendung verfügbar ist,
ohne dass eine vollständige Seite geladen wird.

### Trisomorphes Rendering {: #trisomorphic }

Wenn
[Servicemitarbeiter](https://developers.google.com/web/fundamentals/primers/service-workers/)
eine Option für Sie sind, ist möglicherweise auch das Rendern „trisomorpher“
Elemente von Interesse. Es ist eine Technik, bei der Sie Streaming
Server-Rendering für anfängliche / Nicht-JS-Navigationen verwenden und dann
Ihren Servicemitarbeiter veranlassen können, HTML-Code für Navigationen zu
rendern, nachdem es installiert wurde. Dies kann zwischengespeicherte
Komponenten und Vorlagen auf dem neuesten Stand halten und SPA-artige
Navigationen zum Rendern neuer Ansichten in derselben Sitzung ermöglichen.
Dieser Ansatz funktioniert am besten, wenn Sie denselben Vorlagen- und
Weiterleitungscode zwischen dem Server, der Clientseite und dem
Servicemitarbeiter freigeben können.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## SEO-Überlegungen {: #seo }

Bei der Auswahl einer Strategie für das Rendern im Web berücksichtigen Teams
häufig die Auswirkungen von SEO. Server-Rendering wird oft gewählt, um eine
"vollständig aussehende" Erfahrung zu liefern, die Crawler mühelos
interpretieren können. Crawler [verstehen vielleicht
JavaScript](https://web.dev/discoverable/how-search-works) , aber es gibt oft
[Einschränkungen, die es](/search/docs/guides/rendering) wert sind, beachtet zu
werden, wie sie dargestellt werden. Client-seitiges Rendern kann funktionieren,
jedoch häufig nicht ohne zusätzliche Tests und Beinarbeit. In jüngerer Zeit ist
das [dynamische Rendern](/search/docs/guides/dynamic-rendering) ebenfalls eine
Option, die in Betracht gezogen werden sollte, wenn Ihre Architektur stark vom
clientseitigen JavaScript gesteuert wird.

Im Zweifelsfall ist das Tool " [Mobile Friendly Test"
von](https://search.google.com/test/mobile-friendly) unschätzbarem Wert, um zu
testen, ob der von Ihnen gewählte Ansatz genau das tut, was Sie sich erhofft
haben. Es zeigt eine visuelle Vorschau der Darstellung einer Seite für den
Crawler von Google, den gefundenen serialisierten HTML-Inhalt (nachdem
JavaScript ausgeführt wurde) und alle beim Rendern aufgetretenen Fehler.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## Abschluss ... {: #wrapup }

Messen und verstehen Sie Ihre Engpässe, wenn Sie sich für einen Rendering-Ansatz
entscheiden. Überlegen Sie, ob Sie mit statischem Rendering oder
Server-Rendering zu 90% dorthin gelangen können. Es ist vollkommen in Ordnung,
HTML hauptsächlich mit minimalem JS zu versenden, um ein interaktives Erlebnis
zu erhalten. Hier ist eine handliche Infografik, die das Server-Client-Spektrum
zeigt:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Credits {: #credits }

Vielen Dank an alle für ihre Bewertungen und Inspiration:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson und
Sebastian Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
