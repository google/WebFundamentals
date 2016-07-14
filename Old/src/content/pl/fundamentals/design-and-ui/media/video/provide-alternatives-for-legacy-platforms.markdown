---
title: "Alternatywne rozwiązania na starsze platformy"
description: "Nie wszystkie formaty wideo działają na każdej platformie. Sprawdź, które formaty są obsługiwane na głównych platformach, i upewnij się, że Twój film będzie można odtwarzać na każdej z nich."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Użyj elementu video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie."
    - "Przygotuj film w wielu formatach, by można było oglądać go na wielu platformach mobilnych."
    - "Ustaw prawidłowy rozmiar filmu. Upewnij się, że nie będzie on wystawać poza swój kontener."
    - "Ułatwienia dostępu są ważne. Dodaj element track jako podrzędny elementu video."
notes:
  media-fragments:
    - "Interfejs API Media Fragments działa na większości platform z wyjątkiem iOS."
    - "Upewnij się, że Twój serwer odpowiada na żądania zakresu. Na większości serwerów ta funkcja jest domyślnie włączona, ale niektórzy administratorzy usług hostingowych ją wyłączają."
  dont-overflow:
    - "Nie wymuszaj rozmiarów, które nadają elementowi inny współczynnik proporcji niż ma pierwotny film. Obraz ściśnięty lub rozciągnięty źle wygląda."
  accessibility-matters:
    - "Element track działa w Chrome na Androida, Safari na iOS i wszystkich współczesnych przeglądarkach na komputerach z wyjątkiem Firefoksa (zobacz na <a href='http://caniuse.com/track' title='Stan obsługi elementu track'>caniuse.com/track</a>). Jest też dostępnych kilka rozwiązań polyfill. Zalecamy <a href='//www.delphiki.com/html5/playr/' title='Polyfill elementu track Playr'>Playr</a> i <a href='//captionatorjs.com/' title='Element track Captionator'>Captionator</a>."
  construct-video-streams:
    - "MSE działa w Chrome i Operze na Androida oraz Internet Explorerze 11 i Chrome na komputerach. Wprowadzenie obsługi w <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Oś czasu implementacji Media Source Extensions w Firefoksie'>Firefoksie</a> jest planowane."
  optimize:
    - "<a href='../images/'>Obrazy</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Optymalizowanie obsługi treści</a>"
---

<p class="intro">
  Nie wszystkie formaty wideo działają na każdej platformie. Sprawdź, które formaty są obsługiwane na głównych platformach, i upewnij się, że Twój film będzie można odtwarzać na każdej z nich.
</p>

{% include shared/toc.liquid %}


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

Aby zobaczyć, jak to działa, skorzystaj z {% link_sample _code/video-main.html %}tej strony demonstracyjnej{% endlink_sample %}. Chrome i Firefox wybierają `chrome.webm` (to pierwszy obsługiwany przez nie plik źródłowy na liście dostępnych), a Safari &ndash; `chrome.mp4`.



