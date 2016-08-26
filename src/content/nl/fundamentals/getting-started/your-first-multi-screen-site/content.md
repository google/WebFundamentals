project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Inhoud is het belangrijkste aspect van een website. In deze gids tonen we hoe u snel een planning kunt maken voor het bouwen van uw eerste website voor meerdere apparaten.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Uw eigen inhoud en structuur maken {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Inhoud is het belangrijkste aspect van een website. We moeten dus het design afstemmen op de inhoud en niet andersom. In deze gids bepalen we eerst de inhoud die we nodig hebben, maken we een paginastructuur op basis van deze inhoud en geven we de pagina weer in een eenvoudige lineaire lay-out die ideaal is voor smalle en brede viewports.


## De paginastructuur maken

We hebben bepaald dat we het volgende nodig hebben:

1.  Een gedeelte waarin ons product `CS256: Mobile web development`-cursus uitvoerig wordt beschreven
2.  Een formulier om informatie te verzamelen van gebruikers die interesse hebben voor ons product
3.  Een uitgebreide beschrijving en video
4.  Afbeeldingen van het product in actie
5.  Een gegevenstabel met informatie als back-up van de claims

## TL;DR {: .hide-from-toc }
- Bepaal eerst de inhoud die u nodig heeft.
- Stel Information Architecture (IA) op voor smalle en brede viewports.
- Maak een geraamte van de pagina met inhoud maar zonder styling.


We hebben ook een architectuur van onbewerkte informatie en lay-out verkregen voor zowel de smalle als brede viewports.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Smalle viewport IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Brede viewport IA">
</div>

U kunt dit gemakkelijk converteren naar de onbewerkte gedeelten van een geraamtepagina die we voor de rest van het project zullen gebruiken.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

## Inhoud aan de pagina toevoegen

De basisstructuur van de website is klaar. We weten welke gedeelten we nodig hebben, de inhoud die we in deze gedeelten willen weergeven en waar we deze in de algemene informatie-architectuur willen plaatsen. We kunnen nu beginnen aan het bouwen van de website.

<!-- TODO: Verify note type! -->
Note: stijl komt later

### De kop en het formulier maken

De kop en het aanmeldingsformulier vormen de essentiële onderdelen van onze pagina. Deze moeten onmiddellijk aan de gebruiker worden weergegeven.

Voeg aan de kop eenvoudige tekst toe om de cursus te beschrijven:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

We moeten ook het formulier invullen.
Het formulier is eenvoudig en verzamelt de namen en telefoonnummers van de gebruikers en een goed moment om hen terug te bellen.

Alle formulieren moeten labels en placeholders bevatten zodat gebruikers zich gemakkelijk op elementen kunnen richten en kunnen begrijpen wat zo is bedoeld, en zodat toegankelijkheidstools de structuur van het formulier kunnen begrijpen. Het naamkenmerk stuurt niet alleen de formulierwaarde naar de server, het wordt ook gebruikt om de browser belangrijke hints te geven over het automatisch invullen van het formulier voor de gebruiker.

We voegen semantische typen toe zodat gebruikers snel en eenvoudig inhoud kunnen invoeren op een mobiel apparaat. Wanneer de gebruiker bijvoorbeeld een telefoonnummer invoert, wordt alleen een toetsenblok weergegeven.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Het gedeelte Video en informatie

Het gedeelte Video en informatie van inhoud is meer uitgebreid.
Het bevat een lijst met opsommingstekens van kenmerken van onze producten en ook een placeholder voor video die weergeeft hoe ons product voor de gebruiker werkt.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Video`s worden vaak gebruikt om inhoud op een interactievere manier te beschrijven en om een product of een concept te demonstreren.

Door de best practices te volgen kunt u video gemakkelijk in uw website integreren:

*  Voeg een kenmerk `controls` toe zodat gebruikers de video gemakkelijk kunnen afspelen.
*  Voeg een `poster`-afbeelding toe zodat gebruikers een voorbeeld van de inhoud kunnen weergeven.
*  Voeg meerdere `<source>`-elementen toe op basis van ondersteunde videoindelingen.
*  Voeg `fall-back`-tekst toe zodat gebruikers de video kunnen downloaden als ze deze niet in het venster kunnen afspelen.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Het gedeelte Afbeeldingen maken

Websites zonder afbeeldingen kunnen saai zijn. Er zijn twee soorten afbeeldingen:

*  Inhoudsafbeeldingen &mdash; afbeeldingen die in het document staan en worden gebruikt om extra informatie over de inhoud weer te geven.
*  Stilistische afbeeldingen &mdash; afbeeldingen die worden gebruikt om de website mooier te maken. Dit zijn vaak achtergrondafbeeldingen, patronen en kleurovergangen. We bespreken dit in het [volgende artikel]({{page.nextPage.relative_url}}).

Het gedeelte Afbeeldingen in onze pagina is een verzameling van inhoudsafbeeldingen.

Inhoudsafbeeldingen zijn heel belangrijk om de betekenis van de pagina weer te geven. Vergelijk ze met de afbeeldingen die in krantenartikelen worden gebruikt. De afbeeldingen die we gebruiken zijn foto`s van de lesgevers van het project: Chris Wilson, Peter Lubbers en Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

De afbeeldingen zijn ingesteld om aan te passen naar 100% van de breedte van het scherm. Dit werkt goed op apparaten met een smalle viewport, maar minder goed op apparaten met een brede viewport (bijvoorbeeld een desktop). We bespreken dit in het gedeelte over responsive design.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Vaak kunnen mensen geen afbeeldingen weergeven en gebruiken ze een ondersteunende technologie zoals een schermlezer die de gegevens op de pagina parseert en verbaal aan de gebruiker doorgeeft. U moet ervoor zorgen dat al uw inhoudsafbeeldingen een beschrijvende `alt`-tag hebben die de schermlezer aan de gebruiker kan doorgeven.

Wanneer u `alt`-tags toevoegt, moet u erop letten dat de alt-tekst de afbeelding zo beknopt mogelijk volledig beschrijft. In onze demo gebruiken we bijvoorbeeld het kenmerk `Name: Role`, dat genoeg informatie bevat zodat de gebruiker begrijpt dat in dit gedeelte de auteurs en hun functie worden besproken.

### Het gedeelte Tabelgegevens toevoegen

Het laatste gedeelte is een eenvoudige tabel die wordt gebruikt om specifieke statistieken over het product weer te geven.

Tabellen mogen alleen worden gebruikt voor tabelgegevens, bijvoorbeeld matrices van informatie.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

### Een voettekst toevoegen

De meeste websites hebben een voettekst nodig voor inhoud zoals Algemene voorwaarden, Vrijwaringen, en andere inhoud die niet past in de hoofdnavigatie of in het hoofdinhoud-gebied van de pagina.

Op onze website maken we gewoon een koppeling naar Algemene voorwaarden, een pagina Contact en onze sociale mediaprofielen.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

## Samenvatting

We hebben overzicht van de website gemaakt en we hebben alle belangrijke structurele elementen bepaald. We hebben er ook voor gezorgd dat alle relevante inhoud klaar is en op de juiste plaats staat om aan onze zakelijke behoeften te voldoen.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="inhoud">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Het is u misschien opgevallen dat de pagina helemaal niet mooi is. Dat is de bedoeling. 
Inhoud is het belangrijkste aspect van een website en we moesten ervoor zorgen dat we een goede solide informatiearchitectuur en -dichtheid hebben. Dankzij deze gids hebben we een uitstekende basis waarop we kunnen bouwen. In de volgende gids zullen we onze inhoud vormgeven.



