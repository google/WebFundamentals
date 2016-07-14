---
title: "Controle over het doorzoeken en indexeren van zoekmachines"
description: "Om jouw content te verspreiden over de hele wereld, is in de zoekmachines staan onvermijdelijk. Maar verkeerde instellingen kunnen er toe leiden dat teveel informatie wordt verspreid. Begrijp hoe zoekmachine <em>crawlers</em> werken en hoe je je website kan beschermen voor ongelukken."
translators:
  - yvoschaap
key-takeaways:
  - Geen robots.txt of geen robots meta tags vereist voor volledig toegankelijke pagina's
  - Gebruik noindex voor pagina's waarvoor je toegang wilt beperken tot alleen de mensen die de URL kennen
  - Gebruik authenticatie manieren voor pagina's die vertrouwelijk zijn
notes:
  crawlers:
    - "Veel mensen halen het doorzoeken (crawling) en indexeren door elkaar. Het verbieden van doorzoeken betekent niet dat de pagina dan ook niet in de zoekresultaten komt. Bijvoorbeeld als een andere website linkt naar een webpagina die is geblokkeerd voor doorzoeken, kan de pagina alsnog in de zoekresutaten komen (in dat geval zal het zoekresultaat geen uitgebreide beschrijving hebben)."
notes:
  robots:
    - "Je kan prima zonder een robots.txt bestand als je geen crawl controle nodig hebt. Gebruik nooit een 500 server antwoord voor <code>/robots.txt</code>. Dat kan alle toekomstige doorzoek acties stop zetten wat tot beperkte zoekresultaten details kan leiden."
  x-robots-tag:
    - "Als je het crawlen verbiedt door middel van robots.txt, kunnen zoekmachines alsnog deze pagina's indexeren zonder dat ze op de hoogte zijn van dat je dat niet wilt. Dit kan gebeuren omdat:<ul><li>Zoekmachines vinden de pagina's via links op andere sites.</li><li>Zoekmachines kunnen de <code>noindex</code> niet detecteren doordat hij niet doorzocht kan worden.</li></ul>"
  searchable:
    - "Als je afvraagt of Javascript en Stylesheet bestanden moet blokkeren? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google doet zijn best om deze te begrijpen</a> en inhoud te vinden doormiddel van AJAX. Je moet dit dus zeker toelaten."

---

<p class="intro">
  Om jouw content te verspreiden over de hele wereld, is in de zoekmachines staan onvermijdelijk. Maar verkeerde instellingen kunnen er toe leiden dat teveel informatie wordt verspreid. Begrijp hoe zoekmachine <em>crawlers</em> werken en hoe je je website kan beschermen voor ongelukken.
</p>

{% include shared/toc.liquid %}

Het delen van informatie aan de wereld kent geen betere manier dan via het web. Zodra je een document publiceren op het web, zal het onmiddellijk beschikbaar zijn voor de rest van de wereld. De pagina is zichtbaar voor iedereen zolang de URL bekend is, dat en dat is waar de zoekmachines bij komen kijken. Zodra zoekmachines weten over jouw website, zullen jouw documenten doorzoekbaar en toegankelijk zijn voor van mensen over de hele wereld.

Echter, er zijn enkele gevallen waar je niet wilt dat mensen bepaalde documenten vinden, ook al heb je ze zelf op het web gezet. Bijvoorbeeld een blog admin pagina is iets waar alleen bepaalde gebruikers toegang tot moeten hebben. Er is geen waarde om deze pagina's te vindbaar te maken in de zoekmachines.

In dit document leert u hoe u zoekmachines kan instrueren bepaalde pagina's niet in de zoekresultaten toe te laten.

{% include shared/takeaway.liquid list=page.key-takeaways %}

## Begrijp het verschil tussen "Crawling" en "Indexeren"
Voordat we leren hoe je de zoekmachine robots kunt beinvloeden, is het belangrijk te begrijpen hoe zoekmachines omgaan met jouw webpagina's. Vanuit het oogpunt van je site, zijn er ongeveer twee activiteiten die zoekmachines ondernemen op uw website: doorzoeken ("crawling") en indexering.

"Crawling" is wanneer een zoekmachine uw webpagina ophaalt en de inhoud ervan analyseert. De inhoud zal worden opgeslagen in de database van de zoekmachine en kan worden gebruikt voor het vullen van zoekresultaat gegevens, de rangschikking ervan en het ontdekken van nieuwe pagina's door de links te volgen.

"Indexeren" is wanneer een zoekmachine de website URL en alle andere geassocieerde informatie opslaat in zijn database, om te gebruiken in de zoekresultaten.

{% include shared/remember.liquid title="Remember" list=page.notes.crawlers %}

## Controle op het doorzoeken van zoekmachine robots
Je kan controle hebben op de zoekmachine robots ("crawlers") die komen op je webpagina's door gebruik te maken van een bestand genaamd robots.txt. (Niet alle crawlers respecteren jou wensen uit het robots.txt bestand. Houdt in je achterhoofd dat iedereen een crawler kan starten.)

### Hoe robots.txt te gebruiken
Robots.txt is een simpel tekst bestand dat beschrijft hoe je wilt dat zoekmachine bots je site doorzoeken.

Plaats robots.txt in de publieke root map van je website server. Als de site domein [http://pages.example.com/](http://pages.example.com/) is, moet het robots.txt bestand toegankelijk zijn via [http://pages.example.com/robots.txt](http://pages.example.com/robots.txt). Als je domein verschillende subdomeinen of poorten heeft, zullen deze niet vallen onder dit robots.txt bestand, maar moet je het bestand ook plaatsen voor iedere subdomein.

Hier is een kort voorbeeld:

**http://pages.example.com/robots.txt**
{% highlight text %}
User-agent: *
Disallow: /
{% endhighlight %}

Dit geeft aan dat je geen enkele zoekmachine robot toelaat om jouw pagina's te doorzoeken.

**http://pages.example.com/robots.txt**
{% highlight text %}
User-agent: Googlebot
Disallow: /nogooglebot/
{% endhighlight %}

Je kan het gedrag ook specificeren per zoekmachine robot (user agent) door de user-agent naam te zetten achter `User-Agent:`. In het bovenstaande geval, laat je `Googlebot` niet toe `/nogooglebot/` te doorzoeken, inclusief alle onderliggende content van die map.

Je kan verder leren hoe je een robotx.txt bestand maakt via onderstaande zoekmachine hulp pagina's:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)
^

{% include shared/remember.liquid title="Note" list=page.notes.robots %}

### Test robots.txt
Afhankelijk van op welke crawler jou robots.txt is gericht, hebben zoekmachines tools om de robots.txt te testen. Neem Google als voorbeeld, er is een validator in [Webmaster Tools](https://www.google.com/webmasters/tools/robots-testing-tool). Gebruik het als test of jou robots.txt werkt zoals verwacht.  

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex heeft ook [een gelijksoortige tool](https://webmaster.yandex.com/robots.xml).  

## Controle op indexering
Als je niet wilt dat je pagina in de zoekresultaten komt is robots.txt niet de juiste oplossing. Je moet deze pagina's wel laten crawlen, maar explictiet aangeven dat je ze niet wilt indexeren. Er zijn twee oplossingen:

### Gebruik robots meta tags
Om aan te geven dat je een bepaalde HTML pagina niet geindexeerd wilt hebben, voeg je een bepaalde `meta` toe. Door de attribuut as `name="robots"` en de `content="noindex"` te zetten, geef je aan dat geen enkele zoekmachine deze pagina mag indexeren.

{% highlight html %}
<!DOCTYPE html>
<html><head>
<meta name="robots" content="noindex" />
{% endhighlight %}

Door het veranderen van de waarde van de `name` attribuut naar een spcifieke user agent kan je deze beperking alleen op hem instellen. Bijvoorbeeld `name="googlebot"` geeft aan dat je niet wilt dat Googlebot je pagina indexeerd (niet hoofdletter gevoelig).  

{% highlight html %}
<!DOCTYPE html>
<html><head>
<meta name="googlebot" content="noindex" />
{% endhighlight %}

Andere opties voor de robots meta tag kan je hier vinden:

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

[Lijst met user agent namen](#appendix-list-of-crawler-user-agents).

### X-Robots-Tag
Om aan te geven dat je objecten die geen HTML zijn - zoals afbeeldingen, stylesheets of script bestanden - niet geindexeerd wilt hebben, voeg dan `X-Robots-Tag: noindex` in de HTTP header toe.

{% highlight http %}
HTTP/1.1 200 OK
X-Robots-Tag: noindex
Content-Type: text/html; charset=UTF-8
{% endhighlight %}

Als je de beperkingen wilt specificeren voor een bepaalde user agent, voeg de user agent naam toe voor `noindex`.  

{% highlight http %}
HTTP/1.1 200 OK
X-Robots-Tag: googlebot: noindex
Content-Type: text/html; charset=UTF-8
{% endhighlight %}

Om meer te leren over de X-Robots-Tag:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)
^

{% include shared/remember.liquid title="Note" list=page.notes.x-robots-tag %}

Verwacht niet dat robots.txt de zoekindex controleert.

## Voorbeeld oplossingen per type content
Wat zijn de beste oplossingen voor controle op doorzoeken en indexering? Bekijk de lijst met voorbeeld oplossingen per type pagina.

### Volledig toegankelijk en doorzoekbaar voor iedereen
Pagina's waarvan je wilt dat iedereen toegang kan hebben. Meeste van de internetpagina's zijn dit.

#### Oplossingen

* Geen robots.txt nodig.
* Geen robots meta tags nodig.

### Beperkte toegang voor alleen mensen die de URL hebben
Niet-vertrouwelijke pagina's waarvan alleen een beperkte groep gebruikers toegang hebben die de URL hebben. Bijvoorbeeld:

* Login pagina voor een blog beheer pagina
* Vertrouwelijke gegevens die voor (beginnende) gebruikers via een URL toegankelijk zijn gemaakt

#### Oplossingen
Bij dit type pagina's, wil je dat de zoekmachine ze niet indexeert.

* Geen robots.txt nodig.
* Gebruik `noindex` meta tags voor HTML pagina's.
* Gebruik `X-Robots-Tag: noindex` voor niet-HTML objecten (afbeeldingen, pdf, etc).
^

{% include shared/remember.liquid title="Note" list=page.notes.searchable %}

### Beperkte toegang voor bepaalde gebruikers
Vertrouwelijke pagina's waarvan je alleen gebruikers met de juiste permissies toegang geeft. In dit geval, ook wanneer iemand de URL vindt, laat de server niet de inhoud zien zonder juiste permissies. Bijvoorbeeld:

* Gedeelde prive informatie op een social netwerk
* Boekhoudgegevens

#### Oplossingen
Bij dit type pagina's wil je dat de zoekmachine ze niet doorzoekt of indexeerd.

* Antwoord met code 401 "Unauthorised" voor toegang zonder de juiste authenticatie (of stuur de bezoeker door naar de inlog pagina).
* Gebruik niet de robots.txt om deze niet te laten doorzoeken. Zo zou anders de 401 niet kunnen worden gedetecteerd.

De beperkingssystemen kunnen zijn gebaseerd op IP adres, Cookie, Basic Auth, OAuth, etc. Hoe je deze manieren van authenticatie moet implementeren gaat te ver voor dit artikel.

## Verzoek tot het verwijderen van een pagina uit de zoekmachines
Er zijn situaties waar je een resultaat uit de zoekmachine wilt verwijderen:

* De pagina bestaat niet meer
* De pagina is geindexeerd maar bevat vertrouwelijke informatie

De voornaamste zoekmachines hebben een methode om een verzoek te doen om zulke pagina' te verwijderen. Het process bestaat uit:

1. Zorg ervoor dat de pagina die je wilt verwijderen:
    * al verwijderd is van de server en een 404 geeft
    * juist geconfigureerd is om niet te indexeren (noindex)

1. Ga naar de verzoek pagina van de zoekmachines (Google en Bing vereisen dat je eerst valideert dat je de eigenaar bent).
1. Verstuur het verzoek.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Lees de concrete stappenplannen van de verschillende zoekmachine hulp pagina's:

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

## Appendix: Lijst van crawler user agents namen

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)

