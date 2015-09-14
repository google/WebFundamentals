---
title: "Instrueer zoekmachines hoe jou pagina verschillende type apparaten ondersteunt"
description: "Als je website meerdere apparaten ondersteunt, dan is hoe deze in de zoekresultaten wordt weergeven een belangrijk onderdeel van het ontwerp van jouw site. Deze gids helpt je jouw site te optimaliseren voor zoekmachines gegeven de URL structuur."
translators:
  - yvoschaap
updated_on: 2014-11-05
key-takeaways:
  - Bepaal de URL structuur van je pagina
  - Responsive design is bij voorkeur aangeraden
  - Gebruik <code>rel="canonical"</code> + <code>rel="alternate"</code> om desktop en mobiele pagina's te onderscheiden
  - Gebruik <code>Vary HTTP</code> header voor een URL die dynamisch de desktop of mobiele html serveert
---
<p class="intro">
  Als je website meerdere apparaten ondersteunt, dan is hoe deze in de zoekresultaten wordt weergeven een belangrijk onderdeel van het ontwerp van jouw site. Deze gids helpt je jouw site te optimaliseren voor zoekmachines gegeven de URL structuur.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways %}

Ben je bezig om je website <em>responsive</em> te maken? Is er een mobiele versie met een eigen URL? Of serveer je zowel specifiek voor desktop of mobiel vanaf dezelfde URL? Je zou je werk kunnen verbeteren door het te optimaliseren voor zoekmachines.

## Bepaal de URL structuur van je site
Er zijn verschillende manieren om content te serveren voor verschillende apparaten. De drie meest gangbare zijn:

1. **Responsive Web Design:** serveer dezelfde HTML voor één URL and gebruik CSS Media Queries om te bepalen hoe de content moet worden afgebeeld op het apparaat.
bijv) Desktop en Mobiel: http://www.example.com/
1. **Aparte mobiele site:** verwijs de gebruiker naar een speciale URL afhankelijk van de user-agent.
bijv) Desktop: http://www.example.com/ Mobiel: http://m.example.com/
1. **Dynamisch serveren:** serveert verschillende HTML voor dezelfde URL afhankelijk van de user-agent.
bijv) Desktop en Mobiel: http://www.example.com/

De beste aanpak die we adviseren is om responsive web design te gebruiken. Ook zijn er veel bestaande websites die voor mobiel specifieke versies serveren. En enkele serveren mobiel en deskop met dezelfde URL.

Bepaal welke URL structuur het beste past bij jou website. Probeer dan te optimaliseren gegeven jou situatie.

## Responsive Web Design is de voorkeur
Als je bezig bent je site responsive te maken, zit je al goed. Het voordeel van een responsive website is:

* Gebruiksvriendelijk voor delen
* Snellere laadtijd zonder verwijzingen
* Eén punt voor de zoekresulaten.

<img src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x imgs/responsive-2x.png 2x" >

Door het responsive te maken:

* Is het makkelijker voor gebruikers om je pagina te delen.
* Moeten gebruikers niet worden doorgestuurd afhankelijk van de user agent en dus sneller
* Onderhoudskosten zijn lager voor website en zoekmachine crawler.

Leer hoe je jouw website bouwt met responsive web design door middel van de [Multi-Device
Layouts](https://developers.google.com/web/fundamentals/layouts/) sectie.

## Gebruik `link[rel=canonical]` of `link[rel=alternate]` wanneer je meerdere URLs gebruikt
Het serveren van gelijksoortige inhoud op zowel desktop als mobiel op verschillende URLs kan verwarring veroorzaken voor gebruikers en zoekmachines. Het is niet duidelijk dat de inhoud identiek is. Je moet aangeven:

* Inhoud van de 2 URLs zijn identiek
* Welke is de mobiele versie
* Welke is de desktop (canonical) versie

Deze informatie kan zoekmachines helpen beter te indexeren, en er voor zorgen dat gebruikers vinden wat ze zochten in het formaat geoptimaliseerd voor hun apparaat.

### Gebruik `link[rel=alternate]` voor de desktop versie.
Op de desktop pagina geef je aan dat er een mobiele versie met een andere URL. Dat doe je door het toevoegen van een `link` tag met `rel="alternate"` die verwijst naar de mobiele versie via `href`. Door het toevoegen van een `media` attribuut met de waarde `"only screen and (max-width:
640px)"` zal het aan de zoekmachines aangeven dat dit gericht is op mobiele schermen.

[http://www.example.com/](http://www.example.com/) HTML

{% highlight html %}
<title>...</title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
{% endhighlight %}

### Gebruik `link[rel=canonical]` voor de mobiele versie
Op de mobiele pagina geef je aan dat er een desktop (canonical) versie is op een andere URL. Doe dit door een `link` tag met `rel="canonical"` toe te voegen, die verwijst naar de desktop versie via `href`.

[http://m.example.com/](http://m.example.com/) HTML

{% highlight html %}
<title>...</title>
<link rel="canonical" href="http://www.example.com/">
{% endhighlight %}

<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x imgs/different_url-2x.png 2x" >

## Gebruik `Vary HTTP` wanneer je gegeven het type apparaat andere HTML serveert
Het serveren van verschillende HTML afhankelijk van het type apparaat kan onnodige verwijzingen beperken, verstuurd altijd de juiste HTML en heeft één URL voor de zoekmachine. Maar het heeft ook nadelen:

* Er kunnen tussenpartijen zijn (proxies). Alleen als de proxy weet dat de inhoud per user agent verschilt kan het de juiste pagina doorgeven.
* De inhoud veranderen afhankelijk van de user agent heeft het risico om te worden aangezien als [cloaking](https://support.google.com/webmasters/answer/66355). Een schending van Google’s Webmaster Guidelines.

Door zoekmachines te laten weten dat de inhoud zich aanpast afhankelijk van de user agent kan het de zoekresultaten optimaliseren voor apparaat waarmee de gebruiker zoekt.

### Gebruik `Vary HTTP`
Om aan te geven dat je URL verschillende inhoud serveert afhankelijk van de user agent verstuur je een `Vary: User-Agent` in de HTTP header.

[http://www.example.com/](http://www.example.com/) HTTP Header

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: text/html
Vary: User-Agent
Content-Length: 5710
{% endhighlight %}

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x imgs/same_url-2x.png 2x" >

Door de `Vary: User-Agent` header weten de zoekmachines en proxies dat de inhoud afhankelijk is van de user agent. Dit zorgt ervoor dat de zoekmachine begrijpt dat de HTML voor de desktop en mobiel anders kan zijn.

Wil je meer over URL structuur voor mobiel en desktop te leren, lees [Building Smartphone-Optimized Websites](https://developers.google.com/webmasters/smartphone-sites/).
