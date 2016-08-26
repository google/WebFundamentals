project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: De CSS-eigenschap `background` is een krachtige tool waarmee u complexe afbeeldingen aan elementen kunt toevoegen en gemakkelijk meerdere afbeeldingen toevoegt, ze kunt laten terugkomen, enzovoort.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Afbeeldingen in CSS {: .page-title }

{% include "_shared/contributors/TODO.html" %}



De CSS-eigenschap `background` is een krachtige tool waarmee u complexe afbeeldingen aan elementen kunt toevoegen en gemakkelijk meerdere afbeeldingen toevoegt, ze kunt laten terugkomen, enzovoort.  In combinatie met mediaquery's wordt de eigenschap `background` nog krachtiger, waardoor het voorwaardelijke laden van afbeeldingen op basis van onder andere schermresolutie en de grootte van de viewport mogelijk wordt.



## TL;DR {: .hide-from-toc }
- 'Gebruik de beste afbeelding voor de kenmerken van de display, houd rekening met het formaat van het scherm, de resolutie van het apparaat en de paginalay-out.'
- Wijzig de eigenschap <code>background-image</code> in CSS voor high-DPI-beeldschermen via mediaquery`s met <code>min-resolution</code> en <code>-webkit-min-device-pixel-ratio</code>.
- Gebruik srcset voor afbeeldingen met hoge resolutie naast de 1x afbeelding in opmaak.
- Houd rekening met de prestatiekosten wanneer u JavaScript-technieken gebruikt voor vervanging van afbeeldingen of wanneer u zwaar gecomprimeerde afbeeldingen met hoge resolutie op apparaten met een lagere resolutie plaatst.


## Gebruik mediaquery`s voor het voorwaardelijk laden van afbeeldingen of voor art direction

Mediaquery`s beïnvloeden niet alleen de paginalay-out, maar kunnen ook worden gebruikt om afbeeldingen voorwaardelijk te laden of om art direction te verzorgen, afhankelijk van de breedte van de viewport.

In het onderstaande voorbeeld wordt op kleine schermen alleen `small.png` gedownload en toegepast op de inhoud-`div`, terwijl op grote schermen `background-image: url(body.png)` wordt toegepast op de hoofdtekst en `background-image: url(large.png)` op de inhoud-`div`.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## Afbeeldingsset gebruiken voor het leveren van afbeeldingen met hoge resolutie

Met de functie `image-set()` in CSS wordt de gedragseigenschap `background` verbeterd, waardoor het gemakkelijker wordt meerdere afbeeldingsbestanden voor verschillende apparaatkenmerken te maken. Zo kan de browser de beste afbeelding kiezen, afhankelijk van de kenmerken van het apparaat. Bijvoorbeeld een 2x afbeelding op een 2x scherm, of een 1x afbeelding op een 2x apparaat als het een netwerk met beperkte bandbreedte betreft.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

De browser zal niet alleen de juiste afbeelding laden, maar deze ook correct
schalen. Met andere woorden, de browser gaat er vanuit dat 2x afbeeldingen tweemaal zo groot zijn als 1x afbeeldingen en zal om die reden het 2x bestand omlaag schalen met een factor 2, waardoor de afbeelding op de papina dezelfde grootte lijkt te hebben.

Er is nog maar sinds kort ondersteuning voor `image-set()` en dit wordt alleen ondersteund in Chrome en Safari met het voorvoegsel `-webkit` van de leverancier. U moet er ook voor zorgen dat u een reserve-afbeelding toevoegt voor het geval `image-set()` niet wordt ondersteund, bijvoorbeeld:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

De juiste asset wordt in browsers geladen die image-set ondersteunen, en kunnen bij gebrek aan ondersteuning terugvallen op de 1x asset. De logische restrictie is dat zolang `image-set()` browserondersteuning laag is, de meeste browsers de 1x asset zullen ontvangen.

## Mediaquery`s gebruiken om afbeeldingen met hoge resolutie of art direction te maken

Mediaquery`s kunnen regels maken die gebaseerd zijn op de [device pixel ratio](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), waardoor het mogelijk wordt om verschillende afbeeldingen voor 2x versus 1x schermen op te geven.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox en Opera ondersteunen alledrie de standaard `(min-resolution: 2dppx)`, terwijl voor zowel Safari als Android Browser de oudere syntax met voorvoegsel van de leverancier vereist is zonder de eenheid `dppx`. Houd er rekening mee dat deze stijlen alleen worden geladen als het apparaat overeenkomt met de mediaquery, en dat u stijlen moet opgeven voor de basiscasus. Dit biedt ook het voordeel dat er in ieder geval iets wordt weergegeven in het geval de browser geen resolutiespecifieke mediaquery`s ondersteunt.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

U kunt ook de `min-width`-syntax gebruiken voor het weergeven van alternatieve afbeeldingen, afhankelijk van de grootte van de viewport. Deze techniek heeft het voordeel dat de afbeelding niet wordt gedownload als de mediaquery er niet mee overeenkomt.  Zo wordt `bg.png` bijvoorbeeld alleen gedownload en toegepast op de `body` als de breedte van de browser 500 px of groter is:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



