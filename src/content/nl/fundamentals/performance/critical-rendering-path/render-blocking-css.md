project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS wordt standaard behandeld als een weergaveblokkerende bron. Dit betekent dat de browser wacht met het weergeven van de verwerkte inhoud totdat het CSSOM is opgebouwd. Zorg dat uw CSS bondig is, lever het zo snel mogelijk en gebruik mediatypen en -query's om de weergave te deblokkeren.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Weergaveblokkerende CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


CSS wordt standaard behandeld als een weergaveblokkerende bron. Dit betekent dat de browser wacht met het weergeven van de verwerkte inhoud totdat het CSSOM is opgebouwd. Zorg dat uw CSS bondig is, lever het zo snel mogelijk en gebruik mediatypen en -query's om de weergave te deblokkeren.



In het vorige gedeelte zagen we dat het kritieke weergavepad zowel de DOM- als de CSSOM-boomstructuur nodig heeft om de weergaveboomstructuur te kunnen opbouwen. Dit zorgt voor een groot gevolg voor de prestatie: **zowel HTML als CSS zijn weergaveblokkerende bronnen.** De HTML is voor de hand liggend, aangezien we zonder het DOM niets hebben om weer te geven, maar het CSS is misschien minder duidelijk. Wat zou er gebeuren als we proberen een gewone pagina weer te geven zonder een weergaveblokkering op CSS?

### TL;DR {: .hide-from-toc }
- CSS wordt standaard behandeld als een weergaveblokkerende bron.
- Mediatypen en -query's maken het mogelijk om bepaalde CSS-bronnen te markeren als niet-weergaveblokkerend.
- Alle CSS-bronnen, onafhankelijk van blokkerend of niet-blokkerend gedrag, worden gedownload door de browser.


<figure class="attempt-left">
  <img class="center" src="images/nytimes-css-device.png" alt="New York Times met CSS">
  <figcaption>New York Times met CSS</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/nytimes-nocss-device.png" alt="New York Times zonder CSS">
  <figcaption>New York Times zonder CSS (FOUC, flash of unstyled content)</figcaption>
</figure>

De bovenstaande voorbeelden van de New York Times met en zonder CSS demonstreren waarom de weergave wordt geblokkeerd totdat het CSS beschikbaar is: zonder CSS is de pagina in feite onbruikbaar. Het voorbeeld rechts wordt zelfs vaak `FOUC` of `Flash of Unstyled Content` (flits met niet-opgemaakte inhoud) genoemd. De browser blokkeert daarom de weergave totdat zowel het DOM als het CSSOM beschikbaar zijn.

> **_CSS is een weergaveblokkerende bron: zorg dat u deze zo snel mogelijk bij de gebruiker krijgt om de tijd tot de eerste weergave te optimaliseren._**

Maar wat zou er gebeuren als bepaalde CSS-stijlen alleen onder bepaalde voorwaarden worden gebruikt, bijvoorbeeld alleen wanneer de pagina wordt afgedrukt of wanneer de pagina wordt geprojecteerd op een grote monitor? Het zou fijn zijn als de weergave niet op deze bronnen zou blokkeren.

Mogelijk kan je deze gevallen aanpakken met CSS media types en mediaquery's.


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Een [mediaquery](/web/fundamentals/design-and-ux/responsive/#use-media-queries) bestaat uit een mediatype en nul of meer expressies die de voorwaarden van bepaalde mediafuncties controleren. Onze eerste stijlbladdefiniëring biedt bijvoorbeeld geen enkel mediatype of -query, daarom is het van toepassing in alle gevallen: dat wil zeggen dat het altijd weergaveblokkerend is. Het tweede stijlblad is alleen van toepassing wanneer de inhoud wordt afgedrukt (misschien wilt u hiervoor een andere opmaak of een ander lettertype gebruiken). Hierdoor hoeft het stijlblad de weergave van de pagina niet te blokkeren wanneer dit stijlblad voor het eerst wordt geladen. Tot slot biedt de laatste stijlbladdefiniëring een `mediaquery` die wordt uitgevoerd door de browser: als de voorwaarden overeenkomen, blokkeert de browser de weergave totdat het stijlblad is gedownload en verwerkt.

Door het gebruik van mediaquery's kan de presentatie van een pagina op bepaalde gebruiksgevallen worden aangepast, zoals afdrukken of weergeven. Daarnaast zorgen mediaquery's ervoor dat de weergave wordt aangepast aan bepaalde dynamische voorwaarden, zoals een andere schermstand, een aanpaste grootte en andere wijzigingen. **Wanneer u uw stijlbladitems definieert, moet u goed op de mediatypen en -query's letten, aangezien deze een grote invloed hebben op het kritieke weergavepad.**

{# include shared/related_guides.liquid inline=true list=page.related-guides.media-queries #}

Laten we een aantal praktijkvoorbeelden bekijken:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* De eerste definiëring is weergaveblokkerend en wordt onder alle voorwaarden toegepast.
* De tweede definiëring is ook weergaveblokkerend: `all` is het standaardtype en als u geen type opgeeft, wordt dit onvoorwaardelijk ingesteld op `all`. Dus de eerste en de tweede definiëringen zijn feitelijk hetzelfde.
* De derde definiëring heeft een dynamische mediaquery, die wordt beoordeeld wanneer de pagina wordt geladen. Afhankelijk van de stand van het apparaat wanneer de pagina wordt geladen, kan portrait.css wel of niet weergaveblokkerend zijn.
* De laatste definiëring wordt alleen toegepast wanneer de pagina wordt afgedrukt, dus is dit niet weergaveblokkerend wanneer de pagina voor het eerst wordt geladen in de browser.

Let er tot slot op dat `weergaveblokkerend` alleen verwijst naar of de browser de initiële weergave van de pagina stopt bij die bron. Het CSS-items wordt altijd door de browser gedownload, maar met een lagere prioriteit voor een niet-blokkerende bron.



