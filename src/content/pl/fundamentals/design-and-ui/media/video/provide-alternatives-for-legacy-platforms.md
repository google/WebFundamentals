project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Nie wszystkie formaty wideo działają na każdej platformie. Sprawdź, które formaty są obsługiwane na głównych platformach, i upewnij się, że Twój film będzie można odtwarzać na każdej z nich.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Alternatywne rozwiązania na starsze platformy {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Nie wszystkie formaty wideo działają na każdej platformie. Sprawdź, które formaty są obsługiwane na głównych platformach, i upewnij się, że Twój film będzie można odtwarzać na każdej z nich.



## Sprawdzanie obsługiwanych formatów

Aby dowiedzieć się, które formaty wideo działają, użyj metody `canPlayType()`. Przyjmuje ona argument w postaci ciągu znaków, który zawiera `mime-type` i opcjonalne kodeki, po czym zwraca jedną z tych wartości:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Zwracana wartość</th>
      <th>Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Zwracana wartość">(pusty ciąg znaków)</td>
      <td data-th="Opis">Kontener i/lub kodek nie jest obsługiwany.</td>
    </tr>
    <tr>
      <td data-th="Zwracana wartość"><code>maybe</code></td>
      <td data-th="Opis">
        Kontener i kodeki mogą być obsługiwane, ale przeglądarka
        musi pobrać fragment filmu, by to sprawdzić.
      </td>
    </tr>
    <tr>
      <td data-th="Zwracana wartość"><code>probably</code></td>
      <td data-th="Opis">Format prawdopodobnie jest obsługiwany.
      </td>
    </tr>
  </tbody>
</table>

Poniżej znajdziesz kilka przykładowych argumentów metody `canPlayType()` i wartości zwracane po uruchomieniu jej w Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Typ</th>
      <th>Odpowiedź</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Typ"><code>video/xyz</code></td>
      <td data-th="Odpowiedź">(pusty ciąg znaków)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Odpowiedź">(pusty ciąg znaków)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Odpowiedź">(pusty ciąg znaków)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Odpowiedź"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm</code></td>
      <td data-th="Odpowiedź"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Odpowiedź"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Przygotowanie filmu w wielu formatach

Jest wiele narzędzi, które pozwalają zapisać dany film w różnych formatach:

* Narzędzia na komputer: [FFmpeg](//ffmpeg.org/)
* Aplikacje z interfejsem graficznym: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Usługi kodowania/transkodowania online: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Sprawdzanie użytego formatu

Chcesz dowiedzieć się, który format wideo wybrała przeglądarka?

Użyj w JavaScripcie właściwości `currentSrc` elementu video, by odczytać nazwę odtwarzanego pliku źródłowego.

Aby zobaczyć, jak to działa, skorzystaj z <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">tej strony demonstracyjnej</a>. Chrome i Firefox wybierają `chrome.webm` (to pierwszy obsługiwany przez nie plik źródłowy na liście dostępnych), a Safari &ndash; `chrome.mp4`.



