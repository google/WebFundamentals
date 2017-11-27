project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Je kan beinvloeden hoe jouw site wordt weergegeven wanneer het gedeeld wordt via sociale media door het plaatsen van een aantal regels HTML op iedere pagina. Dit kan meer bezoekers naar je site trekken door het voorbeeld te voorzien van meer gegevens.

{# wf_updated_on: 2014-11-08 #}
{# wf_published_on: 2000-01-01 #}

# Controle over je weergave op sociale media {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Je kan beinvloeden hoe jouw site wordt weergegeven wanneer het gedeeld wordt via sociale media door het plaatsen van een aantal regels HTML op iedere pagina. Dit kan meer bezoekers naar je site trekken door het voorbeeld te voorzien van meer gegevens.


### TL;DR {: .hide-from-toc }
- Gebruik schema.org microdata om pagina titel, beschrijving en afbeelding te specificeren voor Google+.
- Gebruik Open Graph Protocol (OGP) om pagina titel, beschrijving en afbeelding te specificeren voor Facebook.
- Gebruik Twitter Cards om pagina titel, beschrijving, afbeelding en Twitter ID te specificeren voor Twitter.


Je kan beinvloeden hoe jouw site wordt weergegeven wanneer het gedeeld wordt via sociale media door het plaatsen van een aantal regels HTML op iedere pagina. Dit kan leiden tot betere toegankelijkheid door het voorbeeld rijkere informatie te bieden. Zonder dit, zullen sociale media website alleen de basis informatie tonen, zonder afbeeldingen of andere handige informatie.

Welke zou vaker worden aangeklikt? Gebruikers zijn aangetrokken tot afbeeldingen en zijn beter overtuigd dat ze vinden wat ze zoeken als er een voorbeeld vooraf is.


<figure class="attempt-left">
  <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
   imgs/gplus-snippet-1-2x.png 2x" />
  <figcaption>Zonder de juiste opmaak is alleen de titel zichtbaar.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
   imgs/gplus-snippet-2-2x.png 2x" />
  <figcaption>Met de juiste opmaak is de titel correct en zijn een korte beschrijving en afbeelding bijgevoegd.</figcaption>
</figure>
<div class="clearfix"></div>


Wanneer iemand op een sociaal netwerk jouw website wilt delen met zijn vrienden, zal hij waarschijnlijk zelf toevoegen hoe cool het is, en dat delen. Maar jouw website omschrijven is tijdrovend werk en kan de plank mislaan vanuit het standpunt van de eigenaar gezien. Ook zijn er diensten die het aantal karakters beperken die gebruikers kunnen toevoegen.

Door geschikte metadata toe te voegen aan jouw pagina's, maak je het delen makkelijker: de titel, omschrijving en een relevante afbeelding zijn dan voorgeselecteerd. Dat betekent dat gebruikers geen waardevolle tijd (en karakters) hoeven te besteden om de link te omschrijven.

## Gebruik schema.org + microdata voor rich snippets op Google+
Crawlers gebruiken meerdere methoden om een pagina te kunnen lezen en begrijpen. Door [microdata](http://www.w3.org/TR/microdata/){: .external } en
[schema.org](https://schema.org/){: .external } vocabulaire te gebruiken help je de sociale media sites en zoekmachines beter de inhoud te begrijpen.

Hier is een voorbeeld:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

De meeste metadata wordt geplaatst in de head van een pagina, maar microdata zit waar de context bestaat.

### Voeg `itemscope` toe voor de microdata scope
Door de`itemscope` toe te voegen kan je de tag specificeren als een blok content over een bepaald item.

### Voeg `itemtype` toe om de soort website te definiëren
De type van een item kan worden gespecificeerd met het `itemtype` attribuut samen met de `itemscope`. De waarde van `itemtype` wordt bepaald door het soort content op de pagina. Je kan de relevante informatie vinden op [deze pagina](http://schema.org/docs/full.html){: .external }.

### Voeg `itemprop` toe om ieder item te beschrijven volgens het schema.org vocabulaire
`itemprop`s defineren eigenschappen voor `itemtype`s in de scope. Voor sociale media metadata is voornamelijk de `itemprop` waardes van `name`, `description` and `image` het meest relevant.

### Leer meer
Deze microdata levert semantische data aan crawlers, voornamelijk [Google+](https://plus.google.com/){: .external } en Google Search. Om meer te leren over snippets en rendering op Google+ lees de volgende documenten:

* [Article Rendering - Google+ Platform](/+/web/snippet/article-rendering)
* [Snippet - Google+ Platform](/+/web/snippet/)

### Valideer rich snippets
Om rich snippets te valideren op Google+ kan je deze tools gebruiken:

* [Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets){: .external } - Webmaster Tools  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

* [Semantic inspector](https://chrome.google.com/webstore/detail/semantic-inspector/jobakbebljifplmcapcooffdbdmfdbjh/reviews){: .external } - Chrome Extension  

<img src="imgs/semantic-inspector.png" srcset="imgs/semantic-inspector.png 1x, imgs/semantic-inspector-2x.png 2x" />

## Gebruik Open Graph Protocol (OGP) voor rich snippets op Facebook
De [Open Graph Protocol (OGP)](http://ogp.me/){: .external } levert Facebook de nodige metadata om web pagina's dezelfde functionaliteit te geven als andere Facebook objecten.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

Wanneer dit in de <em>head</em> sectie van jouw pagina zit, wordt deze metadata gebruikt voor rich snippet informatie wanneer de pagina wordt gedeeld.

### Gebruik `og:` namespaced `meta` tags om metadata te omschrijven
Een `meta` tag bevat een `property` attribuut en een `content` attribuut.

<table>
    <thead>
    <tr>
      <th data-th="Property">Waarde</th>
      <th data-th="Content">Eigenschap</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">De titel van de pagina</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">De beschrijving van de pagina.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">De canonical url van de webpagina.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">URL naar een afbeelding van de pagina.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">Geeft het type pagina aan. Kies er een die het meest relevant is voor jouw pagina <a href="https://developers.facebook.com/docs/reference/opengraph/">hier</a>.</td>
    </tr>
  </tbody>
</table>

Deze meta tags bevatten semantische informatie voor sociale media crawlers, voornamelijk van Google+](https://plus.google.com/){: .external } en [Facebook](https://www.facebook.com/).

### Leer meer
Om meer te leren over wat je kan toevoegen aan een Facebook post, bezoek de officieele Open Graph Protocol site:

* [ogp.me](http://ogp.me/){: .external }

### Valideer rich snippets
Om de markup te valideren kan je deze tool van Facebook gebruiken:

* [Debugger](https://developers.facebook.com/tools/debug/){: .external }

## Gebruik Twitter Cards voor rich snippets op Twitter
[Twitter Cards](https://dev.twitter.com/docs/cards){: .external } zijn een uitbreiding op het [Open Graph Protocol toegespitst voor Twitter](https://twitter.com/). Het geeft de mogelijkheid om media zoals afbeeldingen en video's toe te voegen aan een tweet met een link naar jouw site. Door de passende metadata toe te voegen, zullen tweets met een link naar jouw site een zogenaamde card hebben met deze rich media.

### Gebruik `twitter:` namespaced meta tags om metadata te omschrijven
Om Twitter Card werkend te krijgen [moet je domein zijn goedgekeurd](https://cards-dev.twitter.com/validator){: .external } en moet de meta tag `twitter:card` met een `name` attribuut hebben.

Hier is een kort voorbeeld:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Door het toevoegen van de Twitter id aan twitter:site, zal Twitter deze informatie implementeren bij een gedeelde link.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### Leer meer
Om meer te leren over Twitter Cards bezoek:

* [Twitter's developer site](https://dev.twitter.com/docs/cards){: .external }

### Valideer rich snippets
Om je opmaak te valideren levert Twitter:

* [Card Validator](https://cards-dev.twitter.com/validator){: .external }

## In de praktijk
Gegeven deze drie opties wordt in de praktijk meestal alle drie tegelijk geintegreerd in de webpagina. Hier is een voorbeeld:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

Merk op dat microdata en OGP bepaalde opmaak delen:

* `itemscope` staat in de `head` tag
* `title` en `description` zijn hetzelfde voor microdata en OGP
* `itemprop="image"` gebruikt de `link` tag met een `href` attribuut in plaats van het hergebruiken van `meta` tag met `property="og:image"`

Als laatste, valideer dat je pagina eruit ziet zoals verwacht op ieder sociale media website voordat je publiceert.

Translated By:
{% include "web/_shared/contributors/yvoschaap.html" %}
