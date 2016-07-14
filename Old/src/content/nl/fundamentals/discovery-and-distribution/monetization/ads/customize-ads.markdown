---
title: "Advertenties aanpassen"
description: "Goede advertenties kunnen de gebruikerservaring verbeteren. De advertentie-inhoud wordt weliswaar aangeleverd door de adverteerder, maar u bepaalt het type inhoud, kleur, formaat en plaatsing van de advertentie."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - "Plaats nooit een advertentie op een plek waar deze mogelijk de beoogde gebruikerservaring op uw website in de weg staat; zorg ervoor dat advertenties die boven de vouw staan geen belangrijke inhoud omlaag duwen."
    - "Gebruik altijd responsieve advertentieblokken; ga over op de geavanceerde modus als slim aanpassen van het formaat niet voldoende is."
    - "Zoek naar mogelijkheden om advertenties te integreren in de inhoud, om te voorkomen dat gebruikers over advertenties heenkijken."
    - "Kies voor tekststijlen die met uw website harmoniëren, deze aanvullen of hier juist mee contrasteren."
notes:
  targeting:
    - "Advertenties worden gericht op de algemene inhoud van de website, niet op trefwoorden of categorieën. Als u advertenties wilt weergeven die betrekking hebben op specifieke onderwerpen, neem dan volledige zinnen en alinea`s op over deze onderwerpen."
  testing:
    - "Test uw advertenties altijd op verschillende apparaten en schermen om te controleren of het responsieve gedrag correct werkt."
  images:
    - "Adverteerders hebben volledige controle over de manier waarop hun beeldadvertenties eruitzien. U kunt invloed uitoefenen op de plaatsing en het formaat van de beeldadvertenties die op uw website verschijnen, maar u heeft geen controle over de feitelijke afbeelding."
---

<p class="intro">
  Goede advertenties kunnen de gebruikerservaring verbeteren. De advertentie-inhoud wordt weliswaar aangeleverd door de adverteerder, maar u bepaalt het type inhoud, kleur, formaat en plaatsing van de advertentie.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Plaats advertenties daar waar de gebruiker er het meest van profiteert

Houd altijd rekening met de gebruiker als u bepaalt waar en 
hoeveel advertenties u plaatst!

* Gebruik advertenties als aanvulling op de inhoud van de website, niet andersom.
* Pagina`s met extreem veel advertenties, advertenties die belangrijke inhoud omlaag duwen tot onder de vouw, advertenties die bij elkaar staan en de zichtbare schermruimte domineren of advertenties zonder duidelijke aanduiding leiden tot een lagere gebruikerstevredenheid en zijn in strijd met het AdSense-beleid.
* Zorg ervoor dat advertenties toegevoegde waarde hebben voor gebruikers. Als uw advertentieblokken aantoonbaar minder inkomsten opleveren of minder klikken en weergaves genereren, hebben ze waarschijnlijk weinig waarde voor de gebruiker.

Voorbeeld van plaatsingsmogelijkheden voor mobiele advertenties:

<img src="images/mobile_ads_placement.png" class="center" alt="Voorbeeld mobiele beeldadvertentie">

Raadpleeg voor meer informatie de 
[Praktische tips voor advertentieplaatsing] van AdSense(https://support.google.com/adsense/answer/1282097).


## Wat moet ik doen als een responsief formaat niet voldoende is?
In sommige gevallen wilt u misschien meer invloed kunnen uitoefenen op de manier waarop uw advertenties worden weergegeven dan door alleen maar gebruik te maken van responsieve advertenties. In dat geval kunt u de geavanceerde modus gebruiken en slim aanpassen van het formaat in de code van uw responsieve advertentieblok negeren. 
U kunt bijvoorbeeld het exacte formaat van advertenties bepalen met [mediaquery`s]({{website.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html):

1. Volg de instructies om een [responsief advertentieblok te maken]({{website.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. Selecteer in het venster `Advertenticode` de optie <strong>Geavanceerd (codeaanpassing vereist)</strong> in het dropdown-menu `Modus`.
3. Geef in uw advertentiecode het exacte formaat van uw advertenties voor het apparaat van de gebruiker op:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Probeer het maar eens
{% endlink_sample %}

Zie [geavanceerde functies](https://support.google.com/adsense/answer/3543893) in de Help van AdSense voor meer informatie.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Kies stijlen die goed passen bij uw website

De [succesvolste advertenties](https://support.google.com/adsense/answer/17957) harmoniëren of contrasteren met de stijlen van uw website. Google AdSense biedt een set [vooraf gedefinieerde advertentiestijlen](https://support.google.com/adsense/answer/6002585); kies de advertentiestijl die het beste past bij uw website of maak uw eigen advertentiestijl.

### Wat kunt u allemaal aanpassen

U kunt elk van de volgende stijlen aanpassen in tekstadvertenties:

* Randkleur
* Achtergrondkleur
* Lettertypefamilie en lettergrootte van de tekst
* Standaard tekstkleur
* Tekstkleur van de advertentietitel
* Tekstkleur van URL's

### Stijlen toepassen

Als u een nieuw blok maakt, kunt u een andere stijl toepassen op tekstadvertenties door de eigenschap <strong>Tekstadvertentiestijl</strong> te openen:

<img src="images/customize.png" class="center" alt="Tekstadvertentiestijlen">

Alle tekstadvertenties gebruiken de Google AdSense-stijl <strong>Standaard</strong>. U kunt alle vooraf gedefinieerde stijlen gebruiken zoals deze beschikbaar worden gesteld, kleine wijzigingen aanbrengen in de stijl of uw eigen aangepaste stijl creëren.

Als u een nieuwe stijl heeft opgeslagen, kunt u deze toepassen op alle bestaande of 
nieuwe advertentieblokken:

1. Navigeer naar [Advertentiestijlen](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Selecteer de advertentiestijl die u wilt wijzigen in de lijst <strong>Ad styles available for all your active products</strong>.
3. Breng de wijzigingen aan en kies <strong>Save ad style</strong>.

Als u een bestaande advertentiestijl wijzigt, worden alle actieve advertentieblokken die deze stijl gebruiken, automatisch bijgewerkt.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


