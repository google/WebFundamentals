project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dla użytkowników wielkość ma znaczenie.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Nadawanie filmom prawidłowych rozmiarów {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Dla użytkowników wielkość ma znaczenie.


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



## Sprawdzanie rozmiaru wideo

Faktyczny rozmiar klatki wideo określony przy kodowaniu może być inny niż wymiary elementu video (tak jak obraz może być wyświetlany w rozmiarze innym niż rzeczywisty).

Aby sprawdzić rozmiar, w którym film został zakodowany, użyj właściwości `videoWidth` i `videoHeight` elementu video. Właściwości `width` i `height` zwracają wymiary elementu video, które można zmieniać, korzystając z CSS lub wbudowanych atrybutów width i height.

## Zapobieganie wychodzeniu filmów poza kontener

Gdy elementy video nie mieszczą się w widocznym obszarze, mogą wyjść poza swój kontener, uniemożliwiając użytkownikowi obejrzenie filmu i skorzystanie
z elementów sterujących.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z Chrome na Androida, orientacja pionowa: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z Chrome na Androida, orientacja pozioma: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Do kontrolowania wymiarów elementu video możesz używać JavaScriptu lub CSS. Biblioteki i wtyczki JavaScript takie jak [FitVids](//fitvidsjs.com/) pozwalają zachować odpowiedni współczynnik proporcji i rozmiar nawet w przypadku filmów Flash z YouTube lub innych źródeł.

Użyj [zapytań o media CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), by określić wymiary elementów w zależności od wielkości widocznego obszaru. Świetnie sprawdza się `max-width: 100%`.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

W przypadku treści multimedialnych w elementach iframe (np. filmów z YouTube) zastosuj rozwiązanie elastyczne &ndash; takie jak [proponowane przez Johna Surdakowskiego](//avexdesigns.com/responsive-youtube-embed/)).

<!-- TODO: Verify note type! -->
Note: Nie wymuszaj rozmiarów, które nadają elementowi inny współczynnik proporcji niż ma pierwotny film. Obraz ściśnięty lub rozciągnięty źle wygląda.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Porównaj <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">przykład strony elastycznej</a> z <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">wersją nieelastyczną</a>.




