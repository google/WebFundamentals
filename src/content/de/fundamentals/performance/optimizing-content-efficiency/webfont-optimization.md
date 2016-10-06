project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Die Typografie ist eine grundlegende Voraussetzung für gutes Design und Branding sowie Lesbarkeit und Zugänglichkeit. Webschriftarten erfüllen die obigen Bedingungen und bieten noch mehr: Der Text ist skalierbar, kann durchsucht, vergrößert und verkleinert werden und unterstützt hohe DPI-Werte. Außerdem liefern diese Schriftarten eine konstante und scharfe Textdarstellung unabhängig von der Bildschirmgröße und -auflösung. 

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# Optimierung von Webschriftarten {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Die Typografie ist eine grundlegende Voraussetzung für gutes Design und Branding sowie Lesbarkeit und Zugänglichkeit. Webschriftarten erfüllen die obigen Bedingungen und bieten noch mehr: Der Text ist skalierbar, kann durchsucht, vergrößert und verkleinert werden und unterstützt hohe DPI-Werte. Außerdem liefern diese Schriftarten eine konstante und scharfe Textdarstellung unabhängig von der Bildschirmgröße und -auflösung. Webschriftarten sind für gutes Design, gute Nutzererfahrung und hohe Leistung erforderlich.


Die Optimierung von Webschriftarten ist ein entscheidender Bestandteil der gesamten Leistungsstrategie. Jede Schriftart ist eine zusätzliche Ressource und einige Schriftarten blockieren möglicherweise das Rendern des Textes, aber nur weil die Seite Webschriftarten verwendet, heißt dies nicht, dass sie langsamer gerendert werden muss. Im Gegenteil: Eine optimierte Schriftart in Kombination mit einer sinnvollen Strategie für das Laden und Anwenden auf der Seite kann zur Verringerung der gesamten Seitengröße beitragen und die Rendering-Zeiten verkürzen.

## Aufbau einer Webschriftart

### TL;DR {: .hide-from-toc }
- Unicode-Schriftarten können Tausende von Glyphen enthalten.
- Es gibt vier Schriftformate: WOFF2, WOFF, EOT und TTF.
- Einige Schriftformate erfordern die GZIP-Komprimierung.


Eine Webschriftart ist eine Sammlung von Glyphen und jede Glyphe ist eine Vektorform, die einen Buchstaben oder ein Symbol repräsentiert. Dies führt dazu, dass die Größe einer bestimmten Schriftartdatei durch zwei einfache Variablen bestimmt wird: die Komplexität des Vektorpfads der einzelnen Glyphen und die Anzahl der Glyphen in einer bestimmten Schriftart. Open Sans, eine der beliebtesten Webschriftarten, enthält beispielsweise 897 Glyphen, u. a. lateinische, griechische und kyrillische Zeichen.

<img src="images/glyphs.png" class="center" alt="Glyphentabelle für Schriftarten">

Bei Auswahl einer Schriftart ist es wichtig, zu berücksichtigen, welche Zeichensätze unterstützt werden. Wenn Ihre Seiteninhalte in mehreren Sprachen lokalisiert werden müssen, sollten Sie eine Schriftart verwenden, die den Nutzern ein einheitliches Aussehen und eine konsistente Erfahrung bietet. Die [Schriftartfamilie Noto von Google](https://www.google.com/get/noto/) strebt beispielsweise die Unterstützung aller Sprachen auf der Welt an. Beachten Sie jedoch, dass die Gesamtgröße von Noto mit allen Sprachen einen ZIP-Download von mehr als 130 MB mit sich bringt! 

Es liegt auf der Hand, dass die Verwendung von Schriftarten im Internet eine sorgfältige Codierung erfordert, um sicherzugehen, dass die Typografie nicht die Leistung beeinträchtigt. Auf der Webplattform finden Sie alle erforderlichen Grundlagen und im weiteren Verlauf des Leitfadens wird praktisch dargestellt, wie das Beste von beidem erreicht werden kann.

### Formate von Webschriftarten

Derzeit werden vier Formate von Schriftartcontainern im Internet verwendet: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://de.wikipedia.org/wiki/TrueType), [WOFF](http://de.wikipedia.org/wiki/Web_Open_Font_Format) und [WOFF2](http://www.w3.org/TR/WOFF2/). Trotz der großen Auswahl gibt es leider kein einzelnes universelles Format, das in allen alten und neuen Browsern funktioniert: EOT eignet sich [nur für den IE](http://caniuse.com/#feat=eot), TTF bietet [partielle IE-Unterstützung](http://caniuse.com/#search=ttf), WOFF verfügt über die breiteste Unterstützung, ist aber [in einigen älteren Browsern nicht verfügbar](http://caniuse.com/#feat=woff) und die WOFF 2.0-Unterstützung [ist für viele Browser noch nicht implementiert](http://caniuse.com/#feat=woff2).

Was bedeutet das für uns? Es gibt kein einziges Format, das in allen Browsern funktioniert, d. h., es müssen mehrere Formate bereitgestellt werden, um eine einheitliche Erfahrung zu bieten:

* Liefern Sie die WOFF 2.0-Variante für Browser, die diese unterstützen.
* Liefern Sie die WOFF-Variante für die Mehrzahl der Browser.
* Liefern Sie die TTF-Variante für alte Android-Browser (vor 4.4).
* Liefern Sie die EOT-Variante für alte IE-Browser (vor IE9).
^

Note: Eigentlich gibt es auch den <a href='http://caniuse.com/svg-fonts'>SVG-Schriftart-Container</a>, aber dieser wurde nie von IE oder Firefox unterstützt und mittlerweile auch nicht mehr von Chrome. Deshalb hat er nur eingeschränkten Nutzen und wird in diesem Leitfaden nicht behandelt.

### Schriftgröße per Komprimierung reduzieren

Eine Schriftart ist eine Sammlung von Glyphen, von denen jede eine Reihe von Pfaden zur Beschreibung der Buchstabenform darstellt. Die einzelnen Glyphen unterscheiden sich natürlich, aber ungeachtet dessen enthalten sie eine Vielzahl ähnlicher Informationen, die mit GZIP oder einem kompatiblen Komprimierungsprogramm minimiert werden können: 

* Die Formate EOT und TTF werden standardmäßig nicht komprimiert: Achten Sie darauf, dass Ihre Server für die Anwendung der [GZIP-Komprimierung](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) konfiguriert sind, wenn Sie diese Formate bereitstellen.
* WOFF verfügt über eine integrierte Komprimierung. Achten Sie darauf, dass Ihr WOFF-Komprimierungsprogramm die optimalen Komprimierungseinstellungen verwendet. 
* WOFF2 nutzt spezifische Vorverarbeitungs- und Komprimierungsalgorithmen für eine Verringerung der Dateigröße um ca. 30 % gegenüber anderen Formaten, siehe [Bericht](http://www.w3.org/TR/WOFF20ER/).

Darüber hinaus ist es beachtenswert, dass einige Schriftartformate zusätzliche Metadaten wie zum Beispiel Informationen zum [Hinting](http://http://de.wikipedia.org/wiki/Hint) und zur [Unterschneidung](http://http://de.wikipedia.org/wiki/Unterschneidung_%28Typografie%29) beinhalten, die auf manchen Plattformen nicht benötigt werden, was eine weitere Optimierung der Dateigröße ermöglicht. Informieren Sie sich über die verfügbaren Optimierungsoptionen Ihres Schriftart-Komprimierungsprogramms und achten Sie darauf, wenn Sie diesen Weg verfolgen, dass Sie über die geeignete Infrastruktur zum Testen und zur Übermittlung dieser optimierten Schriftarten an die einzelnen Browser verfügen, z. B. stellt Google Fonts mehr als 30 optimierte Varianten für jede Schriftart bereit und erkennt und liefert die optimale Variante für jede Plattform und jeden Browser.

Note: Ziehen Sie die Verwendung der <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli-Komprimierung</a> für die Formate EOT, TTF und WOFF in Betracht. Zopfli ist ein mit ZLIB kompatibles Komprimierungsprogramm, das die Dateigröße gegenüber GZIP um ca. weitere 5 % reduziert.

## Schriftartfamilie mit @font-face definieren

### TL;DR {: .hide-from-toc }
- Verwenden Sie den Hinweis `format()`, um mehrere Schriftformate anzugeben.
- Unterteilen Sie große Unicode-Schriftarten, um die Leistung zu verbessern: Nutzen Sie die Unicode-Bereichsunterteilung und sehen Sie eine manuelle Ausweichlösung zur Unterteilung für ältere Browser vor.
- Reduzieren Sie die Zahl der stilistischen Schriftvarianten, um die Leistung bei der Seiten- und Textwiedergabe zu verbessern.


Die CSS-at-Regel @font-face gestattet es, den Speicherort einer bestimmten Schriftartressource, deren Style-Eigenschaften und die Unicode-Codepoints festzulegen, für die sie verwendet werden soll. Über eine Kombination solcher @font-face-Deklarationen kann eine `Schriftartfamilie` erstellt werden, die der Browser zur Beurteilung heranzieht, welche Schriftartressourcen herunterzuladen sind und auf die aktuelle Seite angewendet werden müssen. Wir wollen uns nun genauer ansehen, wie das intern vor sich geht.

### Format auswählen

Jede @font-face-Deklaration beinhaltet den Namen der Schriftartfamilie, die eine logische Gruppe aus mehreren Deklarationen darstellt, außerdem die [Schriftarteigenschaften](http://www.w3.org/TR/css3-fonts/#font-prop-desc) wie Stil, Stärke und Streckung sowie den [SRC-Descriptor](http://www.w3.org/TR/css3-fonts/#src-desc), der eine priorisierte Liste der Speicherorte für die Schriftartressource angibt.


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


Beachten Sie zunächst, dass in den obigen Beispielen eine einzige Schriftartfamilie _Awesome Font_ mit zwei Schriftstilen (normal und _italic_) definiert wird, die jeweils auf eine andere Gruppe an Schriftartressourcen verweisen. Jeder SRC-Descriptor enthält wiederum eine priorisierte, kommagetrennte Liste mit Ressourcenvarianten: 

* Mithilfe der Anweisung `local()` können wir lokal installierte Schriftarten referenzieren, laden und verwenden.
* Mithilfe der Anweisung `url()` können wir externe Schriftarten laden und einen optionalen Hinweis `format()` aufnehmen, der das Format der Schriftart angibt, auf die die vorgesehene URL verweist.


Note: Wenn Sie nicht auf einen der Standard-Systemschriftarten zurückgreifen, haben die Nutzer in der Praxis die entsprechenden Schriftarten selten lokal installiert, insbesondere auf Mobilgeräten, wo es faktisch unmöglich ist, zusätzliche Schriftarten zu `installieren`. Aus diesem Grund sollten Sie stets eine Liste mit externen Speicherorten für Schriftarten bereitstellen.

Wenn der Browser feststellt, dass die Schriftart benötigt wird, arbeitet er die bereitgestellte Ressourcenliste in der angegebenen Reihenfolge ab und versucht, die entsprechende Ressource zu laden. Gemäß dem obigen Beispiel geschieht das wie folgt:

1. Der Browser führt das Seitenlayout aus und bestimmt, welche Schriftartvarianten für die Darstellung des vorgegebenen Texts auf der Seite benötigt werden.
2. Für jede erforderliche Schriftart prüft der Browser, ob diese lokal verfügbar ist.
3. Wenn die Datei lokal nicht verfügbar ist, arbeitet der Browser die externen Definitionen ab:
  * Ist ein Formathinweis vorhanden, prüft der Browser, ob er das Format unterstützt, bevor er den Download einleitet, andernfalls geht er zur nächsten Schriftart über.
  * Ist kein Formathinweis vorhanden, lädt er die Ressource herunter.

Die Kombination aus lokalen und externen Anweisungen mit entsprechenden Formathinweisen ermöglicht es uns, alle verfügbaren Schriftartformate anzugeben und dem Browser die übrige Arbeit zu überlassen: Der Browser ermittelt, welche Ressourcen erforderlich sind und wählt das optimale Format aus.

Note: Es kommt auf die Reihenfolge an, in der die Schriftvarianten angegeben werden. Der Browser wählt das erste unterstützte Format aus. Wenn Sie also wünschen, dass die neueren Browser WOFF2 verwenden, ist die WOFF2-Deklaration vor WOFF anzuordnen und so weiter.

### Unterteilung in Unicode-Bereiche

Neben den Schrifteigenschaften wie Stil, Stärke und Streckung können wir mit der @font-face-Regel ein Gruppe von Unicode-Codepoints definieren, die von jeder Ressource unterstützt werden. Auf diese Weise ist es möglich, eine große Unicode-Schriftart in kleinere Untergruppen, z. B. für lateinische, kyrillische und griechische Zeichen, aufzuteilen und nur die Glyphen herunterzuladen, die für die Darstellung des Texts auf einer bestimmten Seite erforderlich sind.

Mit dem [Unicode-Bereichs-Descriptor](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) können wir eine kommagetrennte Liste von Bereichswerten angeben, von denen jeder in einer von drei verschiedenen Formen vorliegen kann:

* Einzelner Codepoint, z. B. U+416)
* Intervallbereich, z. B. U+400-4ff): kennzeichnet die Start- und End-Codepoints eines Bereichs
* Platzhalterbereich, z. B. U+4??): Die Zeichen `?` zeigen eine hexadezimale Ziffer an .

Wir können unsere Schriftart _Awesome Font_ zum Beispiel in lateinische und japanische Untergruppen aufteilen, die vom Browser je nach Bedarf heruntergeladen werden: 


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
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    


Note: Die Unterteilung in Unicode-Bereiche ist besonders für asiatische Sprachen wichtig, bei denen die Anzahl der Glyphen wesentlich höher ist als in westlichen Sprachen und eine typische `komplette` Schriftart oftmals in Megabyte anstatt in Kilobyte angegeben wird!

Mithilfe von Unicode-Bereichsuntergruppen und separaten Dateien für jede stilistische Variante der Schriftart können wir eine kombinierte Schriftartfamilie definieren, die schneller und effizienter heruntergeladen werden kann. Die Besucher laden dann nur die Varianten und Untergruppen herunter, die diese Schriftartfamilie benötigt, und sie sind nicht gezwungen, Untergruppen herunterzuladen, die sie womöglich auf der Seite niemals sehen oder verwenden. 

Es soll jedoch nicht verschwiegen werden, dass Unicode-Bereiche einen kleinen Haken haben: [Sie werden noch nicht von allen Browsern unterstützt](http://caniuse.com/#feat=font-unicode-range). Einige Browser ignorieren den Unicode-Bereichshinweis einfach und laden alle Varianten herunter, während andere die @font-face-Deklaration überhaupt nicht verarbeiten. Wir lösen dieses Problem, indem wir bei älteren Browsern auf die `manuelle Unterteilung` ausweichen.

Da alte Browser nicht ausreichend intelligent sind, um nur die benötigten Untergruppen auszuwählen und keine kombinierte Schriftart erstellen können, weichen wir auf die Bereitstellung einer einzelnen Schriftartressource aus, die alle notwendigen Untergruppen enthält und verbergen den Rest vor dem Browser. Wenn die Seite zum Beispiel nur lateinische Schriftzeichen verwendet, können wir andere Glyphen entfernen und diese spezielle Untergruppe als eigenständige Ressource übermitteln. 

1. **Wie bestimmen wir, welche Untergruppen benötigt werden?** 
  - Wenn die Unterteilung in Unicode-Bereiche vom Browser unterstützt wird, wählt dieser die richtige Untergruppe automatisch aus. Die Seite muss lediglich die Untergruppendateien bereitstellen und die passenden Unicode-Bereiche in den @font-face-Regeln angeben.
  - Wenn der Unicode-Bereich nicht unterstützt wird, muss die Seite alle unnötigen Untergruppen ausblenden, d. h., es ist Aufgabe des Entwicklers, die erforderlichen Untergruppen anzugeben.
2. **Wie erzeugen wir Schriftart-Untergruppen?**
  - Verwenden Sie das Open-Source-Tool [pyftsubset](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) für die Unterteilung und Optimierung Ihrer Schriftarten.
  - Einige Schriftartdienste gestatten die manuelle Unterteilung über benutzerdefinierte Abfrageparameter, mit denen die erforderliche Untergruppe für Ihre Seite manuell angegeben werden kann - schlagen Sie in der Dokumentation Ihres Schriftartanbieters nach.


### Schriftartauswahl und -synthese

Jede Schriftartfamilie besteht aus mehreren stilistischen Varianten (normal, fett, kursiv) und mehreren Schriftstärken für jeden Stil, von denen jeder wiederum sehr unterschiedliche Glyphenformen aufweisen kann, z. B. unterschiedliche Abstände, Größen oder eine komplett andere Form. 

<img src="images/font-weights.png" class="center" alt="Schriftstärken">

Das Diagramm oben zeigt zum Beispiel eine Schriftartfamilie mit drei unterschiedlichen Schriftstärken: 400 (normal), 700 (fett) und 900 (extra fett). Alle anderen Varianten dazwischen (grau dargestellt) werden vom Browser automatisch der ähnlichsten Variante zugeordnet. 


> Wenn eine Stärke angegeben ist, für die keine Schrift vorhanden ist, wird eine Schrift mit ähnlicher Stärke verwendet. Grundsätzlich werden Fettformatierungen Schriften mit höherer Stärke und helle Formatierungen Schriften mit geringerer Stärke zugeordnet.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algorithmus für CSS3-Schriftartenzuordnung</a>

Die entsprechende Logik gilt für kursive Varianten. Der Schriftart-Designer steuert, welche Varianten erstellt werden, und wir steuern, welche Varianten wir auf der Seite verwenden. Da jede Variante einen separaten Download darstellt, empfiehlt es sich, die Zahl der Varianten zu begrenzen. Wir können zum Beispiel zwei Fettschrift-Varianten für unsere Schriftartfamilie _Awesome Font_ festlegen: 


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
    

Mit dem obigen Beispiel wird die Schriftartfamilie _Awesome Font_ deklariert, die aus zwei Ressourcen mit demselben Satz an lateinischen Glyphen (U+000-5FF) besteht, aber zwei verschiedene Stärken anbietet: normal (400) und fett (700). Wie verhält es sich jedoch, wenn eine unserer CSS-Regeln eine andere Schriftstärke angibt oder die Schriftstileigenschaft auf kursiv setzt?

* Wenn eine genau übereinstimmende Schriftart nicht verfügbar ist, ersetzt der Browser diese durch diejenige mit der ähnlichsten Übereinstimmung.
* Wird keine stilistische Übereinstimmung gefunden, z. B. weil wir wie im obigen Beispiel keine kursiven Varianten deklariert haben, erstellt der Browser eine eigene Schriftartvariante. 

<img src="images/font-synthesis.png" class="center" alt="Schriftartsynthese">

> Die Autoren sollten sich darüber im Klaren sein, dass synthetisierte Ansätze sich womöglich für Skripte in kyrillischer Schrift nicht eignen, bei denen die kursiven Formen stark abweichen. Es ist immer besser, eine originale Kursivschrift zu verwenden, als auf eine synthetische Version zurückzugreifen.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3-Schriftartstil</a>


Im obigen Beispiel wird der Unterschied zwischen originalen und synthetisierten Schriftartresultaten für Open-Sans aufgezeigt. Alle synthetisierten Varianten wurden dabei aus einer einzigen Schrift mit der Stärke 400 erzeugt. Wie Sie sehen, bestehen bei den Ergebnissen keine erkennbaren Unterschiede. Die Erzeugung von fetten und kursiven Varianten ist nicht im Detail vorgegeben. Deshalb unterscheiden sich die Resultate bei den verschiedenen Browsern und hängen außerdem stark von der jeweiligen Schriftart ab.

Note: Im Sinne einer optimalen Konsistenz und bestmöglicher visueller Resultate sollten Sie sich nicht auf die Schriftartsynthese verlassen. Minimieren Sie stattdessen die Anzahl der verwendeten Schriftvarianten und geben Sie deren Speicherort an, damit der Browser diese herunterladen kann, wenn sie auf der Seite benötigt werden. Unter Berücksichtigung der obigen Ausführungen <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>kann in manchen Fällen eine synthetisierte Variante eine gangbare Option darstellen</a>. Dies ist allerdings sorgfältig zu prüfen.


## Laden und Rendern optimieren

### TL;DR {: .hide-from-toc }
- Schriftartanforderungen werden verzögert, bis die Rendering-Baumstruktur erstellt ist, was zu einer verzögerten Textwiedergabe führen kann.
- Das Font Loading API ermöglicht die Implementierung von Strategien zum Laden und Rendern von Schriftarten, die das standardmäßige langsame Laden (Lazy Loading) von Schriftarten umgehen.
- Mit der Inline-Ersetzung kann das standardmäßige Lazy Loading von Schriftarten in älteren Browsern umgangen werden.


Eine `komplette` Webschriftart, die alle stilistischen Varianten und alle Glyphen umfasst, die wir möglicherweise nicht brauchen, kann ohne Weiteres einen Download von mehreren Megabytes bedeuten. Aus diesem Grund wurde eigens die CSS-Regel @font-face konzipiert, mit der wir die Schriftartfamilie in eine Sammlung von Ressourcen aufteilen können, die Unicode-Untergruppen, spezielle Stilvarianten usw. umfasst. 

Anhand dieser Deklarationen bestimmt der Browser die erforderlichen Untergruppen und Varianten und lädt die minimalen Bestandteile, die für die Wiedergabe des Texts benötigt werden. Dieses Verhalten ist zwar sehr komfortabel, kann aber bei mangelnder Sorgfalt zu einem Leistungsengpass im kritischen Rendering-Pfad führen und die Textwiedergabe verzögern - und das wollen wir ja unbedingt vermeiden! 

### Webschriftarten und kritischer Rendering-Pfad

Das Lazy Loading von Schriftarten hat eine wichtige verborgene Auswirkung, die die Textwiedergabe verzögern kann: Der Browser muss [die Rendering-Baumstruktur erstellen](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), die von den DOM- und CSSOM-Baumstrukturen abhängt, bevor klar ist, welche Schriftartressourcen für das Rendern des Texts benötigt werden. Das hat zur Folge, dass Schriftarten wesentlich später als andere kritische Ressourcen angefordert werden und der Browser eventuell an der Textwiedergabe gehindert wird, bis die jeweilige Ressource abgerufen wurde.

<img src="images/font-crp.png" class="center" alt="Kritischer Rendering-Pfad für Schriftarten">

1. Der Browser fordert ein HTML-Dokument an.
2. Der Browser beginnt mit dem Parsen der HTML-Antwort und mit der Erstellung des DOM.
3. Der Browser erkennt CSS-, JS- und andere Ressourcen und versendet Anforderungen.
4. Der Browser erstellt nach dem Erhalt aller CSS-Inhalte das CSSOM und verbindet es mit der DOM-Baumstruktur, um die Rendering-Baumstruktur zu erzeugen.
  * Die Schriftartanforderungen werden ausgegeben, sobald durch die Rendering-Baumstruktur angezeigt wird, welche Schriftartvarianten für die Wiedergabe des vorgegebenen Texts auf der Seite benötigt werden.
5. Der Browser führt das Layout aus und stellt die Inhalte auf dem Bildschirm dar.
  * Wenn die Schriftart noch nicht verfügbar ist, kann der Browser keine Textpixel rendern.
  * Sobald die Schriftart verfügbar ist, rendert der Browser die Textpixel.

Das `Rennen` zwischen dem ersten Rendern des Seiteninhalts, das kurz nach der Erstellung der Rendering-Baumstruktur erfolgen kann, und der Anforderung der Schriftartressource ist für das `Leertextproblem` verantwortlich, bei dem der Browser das Seitenlayout ohne Text darstellt. Das tatsächliche Verhalten unterscheidet sich bei den verschiedenen Browsern:

* Safari hält das Rendern des Texts an, bis der Schriftartdownload abgeschlossen ist.
* Chrome und Firefox halten die Schriftartdarstellung bis zu 3 Sekunden an und nutzen dann eine Ausweich-Schriftart. Sobald der Schriftartdownload abgeschlossen ist, rendern sie den Text erneut mit der heruntergeladenen Schriftart.
* IE stellt sofort die Ausweich-Schriftart dar, wenn die angeforderte Schriftart noch nicht verfügbar ist und rendert diese erneut, sobald der Schriftartdownload abgeschlossen ist.

Es gibt gute Argumente für und gegen die unterschiedlichen Rendering-Strategien: Manche finden das erneute Rendern holprig, während andere sofortige Resultate vorziehen und sich nicht am erneuten Seitenaufbau stören, sobald der Schriftartdownload abgeschlossen ist. Diese Diskussion wollen wir hier aber nicht führen. Wichtig ist, dass beim Lazy Loading die Anzahl der Bytes geringer wird, sich aber die Textwiedergabe potenziell verzögert. Wir wollen uns nun damit befassen, wie wir dieses Verhalten optimieren können.

### Schriftart-Rendering mit dem Font Loading API optimieren

Das [Font Loading API](http://dev.w3.org/csswg/css-font-loading/) bietet eine Scripting-Oberfläche für die Definition und Bearbeitung von CSS-Schriftarten, die Verfolgung des Downloadfortschritts und die Umgehung des standardmäßigen Lazy Loading-Verhaltens. Wenn wir beispielsweise sicher sind, dass eine bestimmte Schriftvariante benötigt wird, können wir diese definieren und den Browser anweisen, den sofortigen Abruf der Schriftartressource einzuleiten:


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
    

Weil wir den Schriftstatus mit der Methode [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) überprüfen und den jeweiligen Downloadfortschritt verfolgen können, ist es darüber hinaus möglich, eine angepasste Strategie für die Wiedergabe von Text auf unseren Seiten festzulegen: 

* Wir können das Rendern des gesamten Textes anhalten, bis die Schriftart verfügbar ist.
* Wir können für jede Schriftart ein benutzerdefiniertes Zeitlimit implementieren.
* Wir können mithilfe der Ausweich-Schriftart die Rendering-Blockade aufheben und einen neuen Stil einfügen, der die gewünschte Schriftart nutzt, sobald sie verfügbar ist.

Das Beste ist: Wir können die obigen Strategien auch mischen und an unterschiedliche Seiteninhalte anpassen, z. B. das Text-Rendering in bestimmten Bereichen bis zur Verfügbarkeit der Schriftart anhalten, eine Ausweich-Schriftart nutzen und dann erneut rendern, sobald der Schriftartdownload abgeschlossen ist, verschiedene Zeitlimits festlegen und so weiter. 

Note: Das Font Loading API <a href='http://caniuse.com/#feat=font-loading'>ist für manche Browser noch in der Entwicklungsphase</a>. Ziehen Sie die Verwendung des <a href='https://github.com/bramstein/fontloader'>FontLoader-Polyfills</a> oder der <a href='https://github.com/typekit/webfontloader'>Webfontloader-Bibliothek</a> in Betracht, um eine ähnliche Funktionalität bereitzustellen, allerdings mit dem Nachteil einer zusätzlichen JavaScript-Abhängigkeit.

### Schriftart-Rendering durch Inline-Ersetzung optimieren

Eine einfache alternative Strategie, um mithilfe des Font Loading API das `Leertext-Problem` zu umgehen, besteht darin, die Schriftartinhalte inline in ein CSS-Stylesheet einzubetten:

* CSS-Stylesheets mit passenden Medienabfragen werden vom Browser mit hoher Priorität automatisch heruntergeladen, weil sie für die Erstellung des CSSOM benötigt werden.
* Die Inline-Einbettung von Schriftartdaten in ein CSS-Stylesheet zwingt den Browser dazu, die Schriftart mit hoher Priorität herunterzuladen, ohne auf die Rendering-Baumstruktur zu warten und stellt somit eine manuelle Umgehung des standardmäßigen Lazy Loading-Verhaltens dar.

Zwar ist die Inlining-Strategie nicht so flexibel und gestattet es uns nicht, benutzerdefinierte Zeitlimits oder Rendering-Ansätze für unterschiedliche Inhalte zu definieren, aber es ist eine einfache und robuste Lösung, die mit allen Browsern funktioniert. Isolieren Sie für optimale Resultate die Inline-Schriftarten in ein eigenständiges Stylesheet und stellen Sie sie mit einer langen Ablaufdauer (max-age) bereit. Auf diese Weise zwingen Sie die Besucher bei der Aktualisierung Ihres CSS nicht dazu, die Schriftarten erneut herunterzuladen. 

Note: Nutzen Sie die Inline-Ersetzung selektiv! Vergegenwärtigen Sie sich, dass der Grund, warum @font-face ein Lazy Loading-Verhalten nutzt, die Vermeidung des Downloads unnötiger Schriftvarianten und Untergruppen ist. Ebenso wird das Anwachsen Ihres CSS-Codes über eine aggressive Inline-Ersetzung sich negativ auf den <a href='/web/fundamentals/performance/critical-rendering-path/'>kritischen Rendering-Pfad</a> auswirken - der Browser müssen den gesamten CSS-Code herunterladen, bevor er das CSSOM erstellt, die Rendering-Baumstruktur erzeugt und den Seiteninhalt auf dem Bildschirm darstellt.

### Wiederverwendung von Schriftarten mit HTTP-Caching optimieren

Schriftartressourcen sind typischerweise statische Ressourcen, die nicht häufig aktualisiert werden. Aus diesem Grund eignen sie sich hervorragend für eine lange Ablaufdauer (max-age). Geben Sie sowohl einen [bedingten ETag-Header](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) als auch eine [optimale Cache-Control-Richtlinie](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) für alle Schriftartressourcen an. 
    
Es ist nicht nötig, Schriftarten im localStorage oder mit anderen Methoden zu speichern - diese führen alle zu Leistungseinbußen. Der HTTP-Cachespeicher des Browsers stellt in Kombination mit dem Font Loading API bzw. der Webfontloader-Bibliothek das beste und stabilste Verfahren zur Übermittlung von Schriftartressourcen an den Browser dar.


## Optimierungscheckliste

Im Gegensatz zur gängigen Meinung verzögern Webschriftarten nicht notwendigerweise die Seitendarstellung oder wirken sich negativ auf andere Leistungsmesswerte aus. Ein optimierter Einsatz von Schriftarten kann zu einer wesentlich besseren Nutzererfahrung beitragen: hervorragendes Branding sowie verbesserte Lesbarkeit, Nutzbarkeit und Durchsuchbarkeit bei gleichzeitiger Bereitstellung einer Lösung mit multiplen Auflösungen, die sich an alle Bildschirmformate anpasst. Schrecken Sie nicht vor der Verwendung von Webschriftarten zurück! 

Allerdings kann eine naive Implementierung zu großen Downloads und unnötigen Verzögerungen führen. Deshalb ist es erforderlich, das Optimierungs-Toolkit zu überarbeiten und den Browser bei der Optimierung der Schriftartressourcen und deren Abruf sowie bei der Verwendung auf unseren Seiten zu unterstützen. 

1. **Schriftartnutzung überprüfen und überwachen:** Verwenden Sie nicht zu viele Schriftarten auf Ihren Seiten und minimieren Sie für jede Schriftart die Zahl der verwendeten Varianten. Dies ermöglicht die Bereitstellung einer einheitlicheren und schnelleren Nutzererfahrung.
2. **Schriftartressourcen unterteilen:** Viele Schriftarten können unterteilt oder in mehrere Unicode-Bereiche aufgeteilt werden, damit nur die Glyphen übertragen werden, die von einer bestimmten Seite benötigt werden. Damit wird die Dateigröße reduziert und die Downloadgeschwindigkeit der Ressource erhöht. Achten Sie bei der Festlegung der Untergruppen darauf, eine Optimierung für die erneute Schriftartverwendung durchzuführen, z. B., wenn Sie keinen anderen, überlappenden Zeichensatz auf den einzelnen Seiten herunterladen möchten. Es hat sich bewährt, eine Unterteilung auf Skriptbasis, z. B. für lateinische, kyrillische Zeichensätze usw., durchzuführen.
3. **Optimierte Schriftartformate für jeden Browser bereitstellen:** Jede Schriftart sollte in den Formaten WOFF2, WOFF, EOT und TTF geliefert werden. Wenden Sie die GZIP-Komprimierung auf die Formate EOT und TTF an, da diese standardmäßig nicht komprimiert werden.
4. **Richtlinien für Revalidierung und optimales Caching vorgeben:** Schriftarten sind statische Ressourcen, die nicht häufig aktualisiert werden. Achten Sie darauf, dass Ihre Server einen max-age-Zeitstempel mit langer Lebensdauer und ein Revalidierungstoken vorsehen, um eine effiziente Wiederverwendung von Schriftarten auf verschiedenen Seiten zu gestatten.
5. **Font Loading API zur Optimierung des kritischen Rendering-Pfads nutzen:** Das standardmäßige Lazy Loading-Verhalten kann zu einem verzögerten Rendern von Text führen. Das Font Loading API gestattet die Außerkraftsetzung dieses Verhaltens bei bestimmten Schriftarten und die Festlegung benutzerdefinierter Strategien für das Rendering und die Zeitüberschreitung bei unterschiedlichen Seiteninhalten. Für ältere Browser, die das API nicht unterstützen, können Sie die Webfontloader-JavaScript-Bibliothek oder die CSS-Inlining-Strategie nutzen.


