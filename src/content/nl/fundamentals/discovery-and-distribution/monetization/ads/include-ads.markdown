---
title: "AdSense-advertenties toevoegen aan uw website"
description: "In deze handleiding leest u welke stappen u moet voltooien om advertenties toe te voegen aan uw website. Maak een AdSense-account, maak advertentieblokken, plaats de advertentieblokken op uw website, configureer de betalingsinstellingen en krijg uitbetaald."
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - "Om een AdSense-account te maken moet u achttien zijn, een Google-account en een adres hebben."
    - "Uw website moet online zijn voordat u een aanvraag indient en de inhoud van de website moet voldoen aan het AdSense-beleid."
    - "Maak responsieve advertentieblokken zodat uw advertenties altijd passen, ongeacht het apparaat waarop de gebruiker de advertenties bekijkt."
    - "Controleer de betalingsinstellingen en wacht tot het geld komt binnenrollen."
notes:
  crawler:
    - "Zorg ervoor dat u de AdSense-crawler toegang geeft tot uw website (zie <a href='https://support.google.com/adsense/answer/10532'>dit Help-onderwerp</a>)."
  body:
    - "Plaats alle advertentiecode binnen de body tag, anders werken de advertenties niet."
  smarttag:
    - "De code <code>data-ad-client</code> en <code>data-ad-slot</code> zijn voor elke advertentie die u genereert uniek."
    - "De code <code>data-ad-format=auto</code> in de gegenereerde advertentiecode zorgt ervoor dat het formaat van het responsieve advertentieblok slim wordt aangepast."
---

<p class="intro">
  In deze handleiding leest u welke stappen u moet voltooien om advertenties toe te voegen aan uw website. Maak een AdSense-account, maak advertentieblokken, plaats de advertentieblokken op uw website, configureer de betalingsinstellingen en krijg uitbetaald.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Voorbeeldpagina met advertenties maken

In deze toelichting maakt u met behulp van Google AdSense en de Web Starter Kit een eenvoudige pagina waaraan responsieve advertenties zijn toegevoegd :

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Voorbeeldwebsite met advertenties op desktop en mobiel">

Als u niet bekend bent met de Web Starter Kit, raadpleeg dan de [Set Up Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html)-documentatie.

Volg de volgende eenvoudige stappen om advertenties toe te voegen aan uw website en uitbetaald te krijgen:

1. Maak een AdSense-account.
2. Maak advertentieblokken.
3. Plaats advertentieblokken op een pagina.
4. Configureer de betalingsinstellingen.

## Een AdSense-account maken
Om advertenties weer te geven op uw website, heeft u een actieve AdSense-account nodig. Als u nog geen account heeft, moet u er [een maken](https://www.google.com/adsense/) en akkoord gaan met de gebruiksvoorwaarden van AdSense. Voor het maken van een account gelden de volgende voorwaarden:

* U bent ten minste 18 jaar oud en heeft een geldig Google-account.
* U bent de eigenaar van een actieve website of andere online inhoud die voldoet aan het
[Google AdSense-programmabeleid](https://support.google.com/adsense/answer/48182); advertenties die op deze website worden gehost.
* U heeft een postbus of huisadres waaraan uw bankrekeningnummer is gekoppeld, waarop u betalingen kunt ontvangen.

## Advertentieblokken maken

Een advertentieblok bestaat uit een set advertenties die worden weergegeven op uw pagina door middel van JavaScript-code die u toevoegt aan uw pagina. Er zijn drie manieren om uw advertentieblokken het gewenste formaat te geven:

* **[Responsief (aanbevolen)](https://support.google.com/adsense/answer/3213689)**. 
* [Vooraf gedefinieerd](https://support.google.com/adsense/answer/6002621).
* [Aangepast formaat](https://support.google.com/adsense/answer/3289364).

Als u een responsieve website maakt, gebruik dan responsieve advertentieblokken.
Het formaat van een responsieve advertentie wordt automatisch aangepast aan het formaat van het apparaat en de breedte van de hoofdcontainer.
Responsieve advertenties werken in overeenstemming met uw responsieve layout, zodat uw website op alle apparaten optimaal wordt weergegeven.

Als u geen responsieve advertentieblokken gebruikt, moet u veel meer code schrijven om te bepalen hoe advertenties op het apparaat van de gebruiker worden weergegeven. Zelfs als u het exacte formaat van uw advertentieblokken moet opgeven, loont het om met responsieve advertentieblokken te werken. Gebruik in dat geval de [geavanceerde modus]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Om de code te vereenvoudigen en u tijd en moeite te besparen, voegt de responsieve advertentiecode automatisch het formaat van het advertentieblok toe aan uw paginalayout. 
De code berekent dynamisch het vereiste formaat op basis van de hoofdcontainer van het advertentieblok en kiest vervolgens het best presterende advertentieformaat in de container.
Op een voor mobiel gebruik geoptimaliseerde website met een breedte van 360 px kan bijvoorbeeld een advertentieblok van 320 x 50 worden weergegeven.

Bekijk de actuele [best presterende advertentieformaten](https://support.google.com/adsense/answer/6002621#top) in de [Handleiding voor advertentieformaten] van Google AdSense(https://support.google.com/adsense/answer/6002621#top).

### Een responsief advertentieblok maken

1. Ga naar het [tabblad `Mijn advertenties`](https://www.google.com/adsense/app#myads-springboard).
2. Klik op <strong>+Nieuw advertentieblok</strong>.
3. Geef uw advertentieblok een unieke naam. Deze naam wordt weergegeven in de advertentiecode die naar uw website wordt gekopieerd, kies dus voor een beschrijvende naam.
4. Selecteer <strong>Responsief</strong> in het dropdown-menu `Advetentieformaat`.
5. Selecteer <strong>Tekst- en display-advertenties</strong> in het dropdown-menu `Advertentietype`.
6. Klik op <strong>Opslaan en code ophalen</strong>.
7. Het vak <strong>Advertentiecode</strong> wordt weergegeven. Selecteer de optie <strong>Formaat slim aanpassen (aanbevolen)</strong> in het dropdown-menu `Modus`. 
Dit is de aanbevolen modus. Als u deze modus kiest, hoeft u geen wijzigingen aan te brengen in uw advertentiecode.

Nadat u het advertentieblok heeft gemaakt, ontvangt u van AdSense een codefragment dat u kunt toevoegen aan uw website (zie het voorbeeld hieronder):

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Advertentieblokken toevoegen aan uw website

Om de advertentie toe te voegen aan de pagina, moet het AdSense-codefragment in onze opmaak worden geplakt. Als u meerdere advertenties wilt toevoegen, kunt u ervoor kiezen hetzelfde advertentieblok opnieuw te gebruiken of verschillende advertentieblokken te maken.

1. Open `index.html` in de map `app`.
2. Plak het ontvangen codefragment in de tag `main`.
3. Sla het bestand op en controleer of het kan worden weergegeven in uw browser. Probeer het bestand vervolgens te openen op een mobiel apparaat of via de emulator van Chrome.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Voorbeeldwebsite met advertenties op desktop en mobiel">
    <br>
  Probeer het maar eens
  </a>
</div>

##. Betalingsinstellingen configureren

Benieuwd wanneer uw AdSense-betaling binnenkomt? Wilt u weten of u deze maand of volgende maand wordt uitbetaald? Zorg ervoor dat u de volgende stappen heeft voltooid:

1. Geef eventuele vereiste belastinggevens op in het [profiel van de begunstigde](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE). 
2. Bevestig de naam en het adres van de begunstigde.
3. Selecteer uw betalingsmethode op de pagina [Betalingsinstellingen](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Geef uw [pincode] op (https://support.google.com/adsense/answer/157667). Deze pincode wordt gebruikt om te controleren of uw accountgegevens correct zijn.
5. Controleer of uw saldo de [betaaldrempel] heeft bereikt(https://support.google.com/adsense/answer/1709871). 

Raadpleeg [Inleiding tot AdSense-betalingen](https://support.google.com/adsense/answer/1709858) voor meer informatie.


