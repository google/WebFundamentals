---
title: "HTTP-Caching"
description: "Der Abruf von Inhalten über das Netzwerk ist sowohl langwierig als auch kostspielig: Umfangreiche Antworten erfordern viele Paketumläufe zwischen Client und Server, was die Verfügbarkeit und Verarbeitung durch den Browser verzögert und zudem zu Datenkosten für den Besucher führt. Aus diesem Grund stellt die Fähigkeit, zuvor abgerufene Ressourcen im Cache zwischenzuspeichern und wiederzuverwenden, einen kritischen Aspekt der Leistungsoptimierung dar."
updated_on: 2014-01-05
key-takeaways:
  validate-etags:
    - "Ein Validierungstoken wird vom Server über den ETag-HTTP-Header übertragen."
    - "Ein Validierungstoken ermöglicht effiziente Aktualisierungsprüfungen von Ressourcen. Es werden keine Daten übertragen, wenn sich die Ressource nicht geändert hat."
  cache-control:
    - "Für jede Ressource können die Caching-Richtlinien per Cache-Control-HTTP-Header definiert werden."
    - "Mit Cache-Control-Anweisungen wird geregelt, wer die Antwort im Cachespeicher ablegen kann, unter welchen Bedingungen und über welchen Zeitraum."
  invalidate-cache:
    - "Die Antworten im lokalen Cachespeicher werden so lange verwendet, bis die Ressource `abgelaufen` ist."
    - "Die Einbettung eines Fingerabdrucks des Dateiinhalts in die URL ermöglicht es, den Client zur einer Aktualisierung auf eine neue Version der Antwort zu zwingen."
    - "In jeder Anwendung muss eine eigene Cachehierarchie für die optimale Leistung festgelegt werden."
notes:
  webview-cache:
    - "Wenn Sie eine Webansicht zum Abrufen und Anzeigen von Webinhalten in Ihrer Anwendung nutzen, ist es eventuell nötig, zusätzliche Konfigurationsmerker vorzusehen, damit der HTTP-Cachespeicher aktiviert, seine Größe an Ihren Anwendungsfall angepasst und seine Persistenz abgesichert wird. Überprüfen Sie Ihre Einstellungen anhand der Plattformdokumentation!"
  boilerplate-configs:
    - "Tipp: Das Projekt `HTML5 Boilerplate` enthält <a href='https://github.com/h5bp/server-configs'>Beispiel-Konfigurationsdateien</a> für alle populären Server mit detaillierten Kommentaren zu jedem Konfigurationsmerker und jeder Einstellung. Navigieren Sie in der Liste zu Ihrem bevorzugten Server, sehen Sie sich die passenden Einstellungen an und kopieren bzw. überprüfen Sie diese, um sicherzugehen, dass Ihr Server mit den empfohlenen Einstellungen konfiguriert ist."
  cache-control:
    - "Der Cache-Control-Header wurde im Rahmen der HTTP/1.1-Spezifikation definiert und ersetzt bisherige Header, z. B. Expires, die zur Festlegung von Caching-Richtlinien für Antworten verwendet wurden. Alle modernen Browser unterstützen Cache-Control, deshalb reicht dies aus."
---

<p class="intro">
  Der Abruf von Inhalten über das Netzwerk ist sowohl langwierig als auch kostspielig: Umfangreiche Antworten erfordern viele Paketumläufe zwischen Client und Server, was die Verfügbarkeit und Verarbeitung durch den Browser verzögert und zudem zu Datenkosten für den Besucher führt. Aus diesem Grund stellt die Fähigkeit, zuvor abgerufene Ressourcen im Cache zwischenzuspeichern und wiederzuverwenden, einen kritischen Aspekt der Leistungsoptimierung dar.
</p>


{% include shared/toc.liquid %}

Es ist einfach großartig, dass jeder Browser über die Implementierung eines HTTP-Cachespeichers verfügt! Es muss nur noch sichergestellt werden, dass jede Serverantwort korrekte HTTP-Header-Anweisungen beinhaltet, die dem Browser mitteilen, wann und für wie lange die Antwort zwischengespeichert werden kann.

{% include shared/remember.liquid list=page.notes.webview-cache %}

<img src="images/http-request.png" class="center" alt="HTTP-Anfrage">

Wenn der Server eine Antwort zurücksendet, übermittelt er auch eine Sammlung von HTTP-Headern mit der Beschreibung des Inhaltstyps, der Längenangabe, den Caching-Anweisungen, dem Validierungstoken und mehr. Beim obigen Kommunikationsvorgang sendet der Server zum Beispiel eine Antwort mit 1024 Byte zurück, weist den Client an, diese für bis zu 120 Sekunden zwischenzuspeichern und übermittelt ein Validierungstoken (`x234dff`), das nach Ablauf der Antwort genutzt werden kann, um zu prüfen, ob die Ressource verändert wurde.


## Zwischengespeicherte Antworten mit ETags validieren

{% include shared/takeaway.liquid list=page.key-takeaways.validate-etags %}

Nehmen wir an, dass seit unserem ursprünglichen Abruf 120 Sekunden verstrichen sind und der Browser eine neue Anfrage für dieselbe Ressource eingeleitet hat. Zunächst überprüft der Browser den lokalen Cachespeicher und findet dort die vorherige Antwort. Allerdings kann er diese leider nicht verwenden, da sie mittlerweile `abgelaufen` ist. Zu diesem Zeitpunkt könnte einfach eine neue Anfrage gesendet und die neue vollständige Antwort abgerufen werden, aber das wäre ineffizient, weil sich die Ressource nicht geändert hat und kein Grund vorliegt, genau dieselben Bytes erneut herunterzuladen, die sich bereits im Cachespeicher befinden!

Genau für dieses Problem wurden Validierungstokens, wie sie im ETag-Header angegeben sind, entwickelt. Der Server erzeugt ein beliebiges Token - in der Regel einen Hash-Wert oder einen anderen Fingerabdruck des Dateiinhalts - und sendet dieses zurück. Der Client muss nicht wissen, wie der Fingerabdruck erzeugt wird, er muss ihn nur bei der nächsten Anfrage an den Server senden. Wenn der Fingerabdruck noch identisch ist, dann wurde die Ressource nicht geändert und der Download kann übersprungen werden.

<img src="images/http-cache-control.png" class="center" alt="Beispiel für HTTP-Cache-Control">

Im obigen Beispiel überträgt der Client das ETag-Token automatisch im HTTP-Anfrage-Header `If-None-Match`. Der Server vergleicht das Token mit der aktuellen Ressource und sendet eine Antwort `304 Not Modified` zurück, wenn die Ressource nicht geändert wurde. Damit wird dem Browser mitgeteilt, dass sich die Antwort im Cachespeicher nicht geändert hat und für weitere 120 Sekunden erneuert werden kann. Beachten Sie, dass es nicht notwendig ist, die Antworten erneut herunterzuladen - das spart Zeit und Bandbreite.

Wie profitieren Sie als Webentwickler von einer effizienten Revalidierung? Der Browser nimmt uns alle Arbeit ab: Er erkennt automatisch, ob zuvor ein Validierungstoken spezifiziert wurde, er hängt es an eine ausgehende Anfrage an und er aktualisiert ggf. die Cache-Zeitstempel auf Basis der empfangenen Antwort vom Server. **Wir haben nur noch sicherzustellen, dass der Server tatsächlich die notwendigen ETag-Token bereitstellt. Schlagen Sie die benötigten Konfigurationsmerker in der Serverdokumentation nach.**

{% include shared/remember.liquid list=page.notes.boilerplate-configs %}


## Cache-Control

{% include shared/takeaway.liquid list=page.key-takeaways.cache-control %}

Die beste Anfrage ist eine Anfrage, für die keine Kommunikation mit dem Server erforderlich ist. Eine lokale Kopie der Antwort ermöglicht es uns, sämtliche Netzwerklatenz zu eliminieren und Gebühren für die Datenübertragung zu vermeiden. Zu diesem Zweck gestattet die HTTP-Spezifikation dem Server, eine [Anzahl unterschiedlicher Cache-Control-Anweisungen](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) zurückzusenden, die regeln, wie und für wie lange eine einzelne Antwort vom Browser und anderen dazwischen geschalteten Cachespeichern zwischengespeichert werden kann.

{% include shared/remember.liquid list=page.notes.cache-control %}

<img src="images/http-cache-control-highlight.png" class="center" alt="Beispiel für HTTP-Cache-Control">

### `no-cache` und `no-store`

`no-cache` gibt an, dass die zurückgesendete Antwort nicht für die Beantwortung einer nachfolgenden Anfrage an dieselbe URL verwendet werden kann, ohne zunächst beim Server nachzufragen, ob sich die Antwort geändert hat. Aus diesem Grund wird bei Vorliegen eines ordnungsgemäßen Validierungstokens (ETag) `no-cache` einen Paketumlauf zur Validierung der zwischengespeicherten Antwort nach sich ziehen. Allerdings wird der Download vermieden, wenn sich die Ressource nicht geändert hat.

Im Gegensatz dazu ist `no-store` wesentlich unkomplizierter, denn es verbietet dem Browser und allen dazwischen geschalteten Caches  einfach, irgendeine Version der zurückgesendeten Antwort zu speichern, z. B. eine mit persönlichen Daten oder Bankdaten. Jedes Mal, wenn der Nutzer diese Ressource anfordert, wird eine Anfrage an den Server gesendet und es wird in jedem Fall eine vollständige Antwort heruntergeladen.

### `Öffentlich` oder `privat`

Wenn die Antwort als `öffentlich` (public) gekennzeichnet ist, kann sie zwischengespeichert werden, auch wenn damit eine HTTP-Authentifizierung verknüpft ist und selbst wenn der Statuscode der Antwort im Normalfall nicht im Cachespeicher abgelegt werden kann. Meist ist `public` nicht notwendig, weil durch explizite Caching-Informationen wie `max-age` angegeben ist,
dass die Antwort zwischengespeichert werden kann.

Im Gegensatz dazu können `private` Antworten zwar vom Browser zwischengespeichert werden, sind jedoch typischerweise für einen einzelnen Nutzer bestimmt und dürfen deshalb nicht dazwischen in einem Cachespeicher abgelegt werden, d. h., eine HTML-Seite mit privaten Nutzerinformationen kann vom Browser des Nutzers, nicht jedoch von einem CDN zwischengespeichert werden.

### `max-age`

Mit dieser Anweisung wird der maximale Zeitraum in Sekunden vorgegeben, während dem ab dem Zeitpunkt der Anfrage die abgerufene Antwort wiederverwendet werden darf, z. B. gibt `max-age=60` an, dass die Antwort während der nächsten 60 Sekunden zwischengespeichert und erneut genutzt werden kann.

## Optimale Cache-Control-Richtlinien festlegen

<img src="images/http-cache-decision-tree.png" class="center" alt="Entscheidungsbaum für Zwischenspeichern">

Gehen Sie nach dem obigen Entscheidungsbaum vor, um die optimale Caching-Richtlinie für eine bestimmte Ressource oder eine Gruppe von Ressourcen festzulegen, die von Ihrer Anwendung verwendet werden. Es empfiehlt sich, so viele Antworten wie möglich über den maximalen Zeitraum auf dem Client zwischenzuspeichern und im Sinne einer effizienten Revalidierung Validierungstoken für jede Antwort vorzusehen.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th width="30%">Cache-Control-Anweisungen</th>
    <th>Erläuterung</th>
  </tr>
</thead>
<tr>
  <td data-th="Cache-Control">max-age=86400</td>
  <td data-th="Erläuterung">Die Antwort kann vom Browser und intermediären Cachespeichern zwischengespeichert werden, d. h., sie ist bis zu einem Tag (60 Sekunden x 60 Minuten x 24 Stunden) `öffentlich`.</td>
</tr>
<tr>
  <td data-th="Cache-Control">privat, max-age=600</td>
  <td data-th="Erläuterung">Die Antwort kann vom Browser des Clients nur maximal 10 Minuten (60 Sekunden x 10 Minuten) zwischengespeichert werden.</td>
</tr>
<tr>
  <td data-th="Cache-Control">no-store</td>
  <td data-th="Erläuterung">Die Antwort darf nicht zwischengespeichert werden und muss bei jeder Anfrage vollständig abgerufen werden.</td>
</tr>
</table>

Laut HTTP Archive können bei den 300.000 beliebtesten Websites (Alexa-Rangliste) [fast die Hälfte aller heruntergeladenen Antworten vom Browser zwischengespeichert werden](http://httparchive.org/trends.php#maxage0), was bei wiederholten Seitenaufrufen und -besuchen enorme Einsparungen bedeutet! Natürlich bedeutet dies nicht, dass bei Ihrer Anwendung 50 % der Ressourcen zwischengespeichert werden können - auf manchen Websites ist dies bei 90 % und mehr Ressourcen möglich, während sich auf anderen viele private oder zeitkritische Daten befinden, die gar nicht im Cachespeicher abgelegt werden können.

**Überprüfen Sie Ihre Seiten daraufhin, welche Ressourcen zwischengespeichert werden können und stellen Sie sicher, dass sie zutreffende Cache-Control- und ETag-Header zurückmelden.**


## Zwischengespeicherte Antworten annullieren und aktualisieren

{% include shared/takeaway.liquid list=page.key-takeaways.invalidate-cache %}

Sämtliche vom Browser ausgegebenen HTTP-Anfragen werden zuerst an den Browsercache weitergeleitet, um zu überprüfen, ob eine gültige Antwort im Cachespeicher vorliegt, die der Anfrage entspricht. Liegt eine Übereinstimmung vor, wird die Antwort aus dem Cache ausgelesen, wodurch sowohl die Netzwerklatenz als auch die durch die Übertragung anfallenden Datenkosten umgangen werden. **Wie verhält es sich jedoch, wenn wir eine zwischengespeicherte Antwort aktualisieren oder annulieren möchten?**

Gehen wir beispielsweise davon aus, dass wir unsere Besucher aufgefordert haben, ein CSS-Stylesheet für bis zu 24 Stunden (max-age=86400) zwischenzuspeichern, aber unser Grafiker soeben ein Update geliefert hat, das wir allen Nutzern zur Verfügung stellen möchten. Wie teilen wir allen Besuchern mit, die eine mittlerweile veraltete Kopie unseres CSS im Cachespeicher haben, dass sie diesen aktualisieren sollten? Das ist ohne Weiteres nicht möglich. Wir müssen dazu die URL der Ressource ändern.

Nachdem die Antwort vom Browser zwischengespeichert wurde, wird diese Version so lange verwendet, bis sie laut max-age nicht mehr gültig ist oder abläuft bzw. aus einem anderen Grund aus dem Cachespeicher entfernt wird, z. B. weil der Nutzer seinen Browsercache leert. Auf diese Weise kann der Fall eintreten, dass verschiedene Nutzer beim Aufbau der Seite unterschiedliche Versionen der Datei verwenden: Nutzer, die die Ressource soeben abriefen, verwenden die neue Version, während Nutzer, bei denen eine frühere aber noch gültige Kopie im Cachespeicher vorliegt, eine ältere Version der Antwort verwenden.

**Wie bekommen wir das Beste von beidem: clientseitiges Caching und schnelle Updates?** Nun, wir können einfach die URL der Ressource ändern und den Nutzer zwingen, immer dann die neue Antwort herunterzuladen, wenn sie geänderte Inhalte aufweist. Dazu wird in der Regel ein Fingerabdruck der Datei oder eine Versionsnummer im Dateinamen eingebettet, z. B. im Style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png" class="center" alt="Cachehierarchie">

Die Möglichkeit, ressourcenspezifische Caching-Richtlinien festzulegen, gestattet es uns, `Cachehierarchien` zu definieren. Auf diese Weise können wir nicht nur steuern, wie lange eine Antwort zwischengespeichert wird, sondern auch, wie schnell die Besucher neue Versionen sehen. Zur Veranschaulichung wollen wir das obige Beispiel untersuchen:

* Das HTML-Element ist mit `no-cache` gekennzeichnet. Das bedeutet, dass der Browser das Dokument bei jeder Anfrage neu validiert und im Falle einer Änderung der Inhalte die neueste Version abruft. Außerdem betten wir innerhalb des HTML-Markups Fingerabdrücke in den URLs für CSS- und JavaScript-Elemente ein. Wenn sich die Inhalte dieser Dateien ändern, ändert sich der HMTL-Code der Seite ebenfalls und eine neue Kopie der HTML-Antwort wird heruntergeladen.
* Das CSS darf von den Browsern zwischengespeichert werden und die Gültigkeit von intermediären Cachespeichern, z. B. einem CDN, ist auf 1 Jahr begrenzt. Beachten Sie, dass wir die lange Gültigkeitsdauer von 1 Jahr bedenkenlos verwenden können, weil wir den Fingerabdruck der Datei im Dateinamen einbetten: Wenn das CSS aktualisiert wird, ändert sich auch die URL.
* Auch für das JavaScript ist eine Gültigkeitsdauer von 1 Jahr festgelegt, allerdings ist es als privat gekennzeichnet, vielleicht weil es private Nutzerdaten enthält, die das CDN nicht zwischenspeichern sollte.
* Das Bild wird ohne Versionsnummer oder eindeutigem Fingerabdruck mit einer Gültigkeit von 1 Tag im Cachespeicher abgelegt.

Über die Kombination von ETag, Cache-Control und eindeutigen URLs ist das Beste von beidem möglich: langfristige Gültigkeitszeiträume, Kontrolle über die Orte, wo die Antwort zwischengespeichert werden kann, und bedarfsgesteuerte Updates.

## Caching-Checkliste

Es gibt keine ideale Cacherichtlinie für alle Fälle. In Abhängigkeit von Ihren Trafficmustern, der Art der übertragenen Daten und den anwendungsspezifischen Anforderungen an die Datenaktualität sind die passenden ressourcenspezifischen Einstellungen sowie die gesamte Cachehierarchie festzulegen und zu konfigurieren.

Einige Tipps und Methoden für die Caching-Strategie:

1. **Konsistente URLs verwenden:** Wenn Sie dieselben Inhalte unter verschiedenen URLs bereitstellen, werden diese Inhalte mehrfach abgerufen und gespeichert. Hinweis: Beachten Sie, dass [bei URLs zwischen Groß- und Kleinschreibung unterschieden wird](http://www.w3.org/TR/WD-html40-970708/htmlweb.html)!
2. **Sicherstellen, dass der Server ein Validierungstoken (ETag) bereitstellt:** Mit Validierungstoken entfällt die Notwendigkeit, dieselben Bytes zu übertragen, wenn sich eine Ressource auf dem Server nicht geändert hat.
3. **Ermitteln, welche Ressourcen in dazwischen geschalteten Cachespeichern abgelegt werden können:** Ressourcen mit Antworten, die für alle Nutzer identisch sind, eignen sich hervorragend für die Zwischenspeicherung durch ein CDN und andere Cachespeicher.
4. **Die optimale Cache-Lebensdauer für jede Ressource bestimmen:** Für verschiedene Ressourcen bestehen eventuell unterschiedliche Aktualitätsanforderungen. Überprüfen und bestimmen Sie das passende Höchstalter (max-age) für jede Ressource.
5. **Die optimale Cachehierarchie für Ihre Website bestimmen:** Über die Kombination aus Ressourcen-URLs mit inhaltsbezogenem Fingerabdruck und einer kurzen Cache- bzw. no-cache-Lebensdauer für HTML-Dokumente können Sie steuern, wie schnell Updates vom Client abgerufen werden.
6. **Downloads minimieren:** Einige Ressourcen werden häufiger aktualisiert als andere. Wenn ein bestimmter Teil einer Ressource, z. B. eine JavaScript-Funktion oder eine Gruppe von CSS-Styles, häufig aktualisiert wird, überlegen Sie, diesen Code als separate Datei bereitzustellen. Auf diese Weise können die übrigen Inhalte, z. B. ein Bibliothekscode, der sich nicht häufig ändert, aus dem Cachespeicher abgerufen werden und die Menge der herunterzuladenden Inhalte beim Abrufen eines Updates wird minimiert.




