project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Wideo {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Użytkownicy lubią filmy, bo zwykle są one ciekawe i treściwe. Na urządzeniach mobilnych filmy pozwalają przystępnie prezentować wiele informacji. Obciążają jednak łącze i nie zawsze działają tak samo na każdej platformie. Oczekiwanie na załadowanie filmu irytuje użytkowników, podobnie jak brak reakcji na kliknięcie przycisku odtwarzania. Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu.

<div class="clearfix"></div>


## Dodawanie filmu 




Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu.



### TL;DR {: .hide-from-toc }
- Użyj elementu video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie.
- Przygotuj film w wielu formatach, by można było oglądać go na wielu platformach mobilnych.
- Ustaw prawidłowy rozmiar filmu. Upewnij się, że nie będzie on wystawać poza swój kontener.
- Ułatwienia dostępu są ważne. Dodaj element track jako podrzędny elementu video.


### Dodawanie elementu video

Dodaj element video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie:

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Twoja przeglądarka nie obsługuje elementu video.</p>
    </video>
    

### Określanie wielu formatów plików

Nie wszystkie przeglądarki obsługują te same formaty wideo.
Element `<source>` pozwala określić wiele formatów zastępczych, jeśli przeglądarka nie obsługuje tego zamierzonego.
Na przykład:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Podczas analizowania tagów `<source>` przeglądarka korzysta z opcjonalnego atrybutu `type`, by ustalić, który plik ma pobrać i odtworzyć. Jeśli przeglądarka obsługuje WebM, odtworzy plik chrome.webm. W przeciwnym razie sprawdzi, czy może odtworzyć film w formacie MPEG-4.
Więcej o działaniu plików wideo i dźwiękowych w internecie dowiesz się z filmu <a href='//www.xiph.org/video/vid1.shtml' title='Ciekawy i pouczający przewodnik wideo po cyfrowych filmach'>A Digital Media Primer for Geeks</a>.

To rozwiązanie ma kilka zalet w porównaniu do wykonywania różnego kodu HTML lub używania skryptów po stronie serwera, zwłaszcza na urządzeniach mobilnych:

* Programista może wymienić formaty w preferowanej kolejności.
* Natywne przełączanie się po stronie klienta zmniejsza czas oczekiwania. Przeglądarka wysyła tylko jedno żądanie, by pobrać treści.
* Umożliwienie przeglądarce wyboru formatu jest prostsze, szybsze i prawdopodobnie bardziej niezawodne niż stosowanie bazy danych obsługi po stronie serwera i wykrywanie klienta użytkownika.
* Określenie typu każdego pliku źródłowego zwiększa wydajność sieci. Przeglądarka może wybrać plik wideo bez pobierania fragmentu filmu i rozpoznawania formatu.

Wszystkie te punkty są szczególnie ważne w kontekście urządzeń mobilnych, na których przepustowość sieci i czas oczekiwania mają duże znaczenie, a cierpliwość użytkownika jest zwykle ograniczona. 
Brak atrybutu type może wpłynąć na wydajność, gdy wiele typów plików źródłowych nie jest obsługiwanych.

Użyj narzędzi dla programistów w przeglądarce mobilnej, by porównać aktywność sieci, gdy w kodzie <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">są atrybuty type</a> i gdy <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">ich nie ma</a>.
Przejrzyj w tych narzędziach także nagłówki odpowiedzi, by [upewnić się, że serwer zgłasza właściwy typ MIME](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). W przeciwnym razie sprawdzanie typu pliku źródłowego filmu nie będzie działać.

### Określanie czasu rozpoczęcia i zakończenia

Możesz zmniejszyć obciążenie łącza i poprawić elastyczność strony &ndash; użyj interfejsu API Media Fragments, by dodać czas rozpoczęcia i zakończenia do elementu video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

Aby umieścić na stronie fragment multimediów, wystarczy dodać `#t=[start_time][,end_time]` do ich adresu URL. Jeśli np. użytkownik ma zobaczyć fragment filmu od 5 do 10&nbsp;sekundy, użyj takiego elementu:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Interfejs API Media Fragments pozwala udostępniać wiele widoków tego samego filmu (podobnie do wyboru scen na płycie DVD) bez konieczności kodowania i przesyłania wielu plików.

Note: - Interfejs API Media Fragments działa na większości platform z wyjątkiem iOS.
- Upewnij się, że Twój serwer odpowiada na żądania zakresu. Na większości serwerów ta funkcja jest domyślnie włączona, ale niektórzy administratorzy usług hostingowych ją wyłączają.


Użyj narzędzi dla programistów w przeglądarce, by znaleźć ciąg `Accept-Ranges: bytes` w nagłówkach odpowiedzi:

<img class="center" alt="Zrzut ekranu z Narzędziami Chrome dla programistów &ndash; `Accept-Ranges: bytes`" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Dołączanie obrazu plakatu

Dodaj atrybut poster do elementu video, by od razu po wczytaniu strony użytkownicy mogli zorientować się w treści filmu, bez potrzeby jego pobierania czy uruchamiania odtwarzania.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Plakat może też być obrazem zastępczym, gdy atrybut `src` elementu video jest nieprawidłowy lub żaden z dostępnych formatów wideo nie jest obsługiwany. Jedyna wada obrazów plakatu to dodatkowe żądanie wyświetlenia pliku, które zajmuje łącze i wymaga renderowania. Więcej informacji znajdziesz w artykule [Optymalizacja obrazów](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Tak wygląda porównanie filmu z obrazem plakatu i bez niego (plakat jest w odcieniach szarości na dowód, że nie jest to film):

<img class="attempt-left" alt="Zrzut ekranu Chrome na Androida, orientacja pionowa &ndash; bez plakatu" src="images/Chrome-Android-video-no-poster.png">
<img class="attempt-right" alt="Zrzut ekranu Chrome na Androida, orientacja pionowa &ndash; z plakatem" src="images/Chrome-Android-video-poster.png">
<div class="clearfix"></div>



## Alternatywne rozwiązania na starsze platformy 




Nie wszystkie formaty wideo działają na każdej platformie. Sprawdź, które formaty są obsługiwane na głównych platformach, i upewnij się, że Twój film będzie można odtwarzać na każdej z nich.



### Sprawdzanie obsługiwanych formatów

Aby dowiedzieć się, które formaty wideo działają, użyj metody `canPlayType()`. Przyjmuje ona argument w postaci ciągu znaków, który zawiera `mime-type` i opcjonalne kodeki, po czym zwraca jedną z tych wartości:

<table>
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


<table>
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


### Przygotowanie filmu w wielu formatach

Jest wiele narzędzi, które pozwalają zapisać dany film w różnych formatach:

* Narzędzia na komputer: [FFmpeg](//ffmpeg.org/)
* Aplikacje z interfejsem graficznym: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Usługi kodowania/transkodowania online: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Sprawdzanie użytego formatu

Chcesz dowiedzieć się, który format wideo wybrała przeglądarka?

Użyj w JavaScripcie właściwości `currentSrc` elementu video, by odczytać nazwę odtwarzanego pliku źródłowego.

Aby zobaczyć, jak to działa, skorzystaj z <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">tej strony demonstracyjnej</a>. Chrome i Firefox wybierają `chrome.webm` (to pierwszy obsługiwany przez nie plik źródłowy na liście dostępnych), a Safari &ndash; `chrome.mp4`.


## Nadawanie filmom prawidłowych rozmiarów 




Dla użytkowników wielkość ma znaczenie.



### Sprawdzanie rozmiaru wideo

Faktyczny rozmiar klatki wideo określony przy kodowaniu może być inny niż wymiary elementu video (tak jak obraz może być wyświetlany w rozmiarze innym niż rzeczywisty).

Aby sprawdzić rozmiar, w którym film został zakodowany, użyj właściwości `videoWidth` i `videoHeight` elementu video. Właściwości `width` i `height` zwracają wymiary elementu video, które można zmieniać, korzystając z CSS lub wbudowanych atrybutów width i height.

### Zapobieganie wychodzeniu filmów poza kontener

Gdy elementy video nie mieszczą się w widocznym obszarze, mogą wyjść poza swój kontener, uniemożliwiając użytkownikowi obejrzenie filmu i skorzystanie
z elementów sterujących.

<img class="attempt-left" alt="Zrzut ekranu z Chrome na Androida, orientacja pionowa: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Zrzut ekranu z Chrome na Androida, orientacja pozioma: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-landscape-video-unstyled.png">
<div class="clearfix"></div>


Do kontrolowania wymiarów elementu video możesz używać JavaScriptu lub CSS. Biblioteki i wtyczki JavaScript takie jak [FitVids](//fitvidsjs.com/) pozwalają zachować odpowiedni współczynnik proporcji i rozmiar nawet w przypadku filmów Flash z YouTube lub innych źródeł.

Użyj [zapytań o media CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), by określić wymiary elementów w zależności od wielkości widocznego obszaru. Świetnie sprawdza się `max-width: 100%`.

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

W przypadku treści multimedialnych w elementach iframe (np. filmów z YouTube) zastosuj rozwiązanie elastyczne &ndash; takie jak [proponowane przez Johna Surdakowskiego](//avexdesigns.com/responsive-youtube-embed/)).

Note: Nie wymuszaj rozmiarów, które nadają elementowi inny współczynnik proporcji niż ma pierwotny film. Obraz ściśnięty lub rozciągnięty źle wygląda.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling"   adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup"   adjust_indentation="auto" %}
</pre>

Porównaj <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">przykład strony elastycznej</a> z <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">wersją nieelastyczną</a>.


## Dostosowywanie odtwarzacza wideo 




Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.



Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.

### Jak działa wykrywanie orientacji na różnych urządzeniach

Orientacja urządzenia nie jest problemem na monitorach komputerowych ani laptopach, ale ma ogromne znaczenie przy projektowaniu stron internetowych na tablety i inne urządzenia mobilne.

Safari na iPhonie dobrze sobie radzi z przełączaniem się między orientacją pionową i poziomą:

<img class="attempt-left" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPhonie, orientacja pionowa" src="images/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPhonie, orientacja pozioma" src="images/iPhone-video-playing-landscape.png">
<div class="clearfix"></div>


Na iPadzie oraz w Chrome na Androida orientacja urządzenia może stanowić problem.
Na przykład niedostosowany film odtwarzany na iPadzie w orientacji poziomej wygląda tak:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPadzie Retina, orientacja pozioma"
src="images/iPad-Retina-landscape-video-playing.png">

Aby rozwiązać wiele problemów z układem związanych z orientacją urządzenia, przypisz elementowi video styl CSS z ustawieniem `width: 100%` lub `max-width: 100%`. Możesz też zastanowić się nad wykorzystaniem pełnego ekranu.

### Wyświetlanie w treści strony lub na pełnym ekranie

Na poszczególnych platformach filmy są odtwarzane w różny sposób. Safari na iPhonie wyświetla element video w treści strony internetowej, ale film odtwarza w trybie pełnoekranowym:

<img class="center" alt="Zrzut ekranu z elementem video na iPhonie, orientacja pionowa" src="images/iPhone-video-with-poster.png">

W Androidzie użytkownicy mogą włączyć tryb pełnoekranowy, klikając jego ikonę. Domyślnie film jest odtwarzany w treści strony:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Chrome na Androida, orientacja pionowa" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari na iPadzie odtwarza film w treści strony:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPadzie Retina, orientacja pozioma" src="images/iPad-Retina-landscape-video-playing.png">

### Sterowanie wyświetlaniem treści na pełnym ekranie

Platformy, które nie wymuszają odtwarzania filmów w trybie pełnoekranowym, powszechnie obsługują [interfejs API Fullscreen](//caniuse.com/fullscreen). Pozwala on sterować wyświetlaniem treści lub całej strony na pełnym ekranie.

Aby w trybie pełnoekranowym wyświetlić element, np. video:

    elem.requestFullScreen();
    

Aby w trybie pełnoekranowym wyświetlić cały dokument:

    document.body.requestFullScreen();
    

Możesz też śledzić zmiany stanu wyświetlania na pełnym ekranie:

    video.addEventListener("fullscreenchange", handler);
    

Jeśli chcesz sprawdzić, czy element jest obecnie w trybie pełnoekranowym:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Pseudoklasa CSS ":fullscreen" pozwala zmieniać sposób wyświetlania elementów w trybie pełnoekranowym.

Na urządzeniach, które obsługują interfejs API Fullscreen, możesz użyć obrazu miniatury jako elementu zastępczego filmu:

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

Aby zobaczyć, jak to działa, skorzystaj ze <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">strony demonstracyjnej</a>.

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## Ułatwienia dostępu są ważne 




Ułatwienia dostępu to nie dodatkowa funkcja. Użytkownicy, którzy nie widzą lub nie słyszą, potrzebują opisów głosowych lub napisów, by zapoznać się z filmem. Koszt w postaci czasu poświęconego na dodanie tych elementów do filmu jest znacznie mniejszy niż negatywne skutki niezadowolenia użytkowników. Wszyscy użytkownicy powinni mieć dostęp przynajmniej do podstawowych elementów strony.




### Dodawanie napisów ułatwiających dostęp

Aby poprawić dostępność multimediów na urządzeniach mobilnych, dodaj napisy i opisy, korzystając z elementu track.

Note: Element track działa w Chrome na Androida, Safari na iOS i wszystkich współczesnych przeglądarkach na komputerach z wyjątkiem Firefoksa (zobacz na <a href='http://caniuse.com/track' title='Stan obsługi elementu track'>caniuse.com/track</a>). Jest też dostępnych kilka rozwiązań polyfill. Zalecamy <a href='//www.delphiki.com/html5/playr/' title='Polyfill elementu track Playr'>Playr</a> i <a href='//captionatorjs.com/' title='Element track Captionator'>Captionator</a>.

Tak wyglądają napisy z elementu track:

<img class="center" alt="Zrzut ekranu z napisami z elementu track w Chrome na Androida" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Dodawanie elementu track

Do swojego filmu możesz bardzo łatwo dodać napisy &ndash; wystarczy dołączyć element track jako podrzędny elementu video:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

Atrybut `src` elementu track wskazuje lokalizację pliku ścieżki.

### Definiowanie napisów w pliku ścieżki

Plik ścieżki zawiera teksty z sygnaturą czasową w formacie WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Mężczyzna siedzi na gałęzi drzewa i korzysta z laptopa.

    00:05.000 --> 00:08.000
    Gałąź się łamie i mężczyzna zaczyna spadać.

    ...


## Materiały referencyjne 




Poniżej znajdziesz krótki przegląd właściwości elementu video.



### Atrybuty elementu video

Pełną listę atrybutów elementu video i ich definicji znajdziesz w [specyfikacji elementu video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
      <th>Atrybut</th>
      <th>Dostępność</th>
      <th>Opis</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Atrybut"><code>src</code></td>
      <td data-th="Dostępność">Wszystkie przeglądarki</td>
      <td data-th="Opis">Adres URL filmu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>poster</code></td>
      <td data-th="Dostępność">Wszystkie przeglądarki</td>
      <td data-th="Opis">Adres URL pliku graficznego, który przeglądarka może pokazać w chwili wyświetlenia elementu video, bez pobierania filmu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>preload</code></td>
      <td data-th="Dostępność">Wszystkie przeglądarki mobilne go ignorują.</td>
      <td data-th="Opis">Informuje przeglądarkę, że przed rozpoczęciem odtwarzania warto wstępnie wczytać metadane (lub fragment filmu). Opcje to none (brak), metadata (metadane) i auto (automatycznie). Szczegółowe informacje znajdziesz w sekcji Wczytywanie wstępne. </td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>autoplay</code></td>
      <td data-th="Dostępność">Nie działa na iPhonie ani w Androidzie. Działa we wszystkich przeglądarkach na komputerze i iPadzie oraz w Firefoksie i Operze na Androida.</td>
      <td data-th="Description">Powoduje jak najszybsze rozpoczęcie pobierania i odtwarzania (zobacz sekcję Autoodtwarzanie). </td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>loop</code></td>
      <td data-th="Dostępność">Wszystkie przeglądarki</td>
      <td data-th="Opis">Zapętla film.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>controls</code></td>
      <td data-th="Dostępność">Wszystkie przeglądarki</td>
      <td data-th="Opis">Pokazuje domyślne elementy sterujące odtwarzaniem filmu (odtwarzanie, wstrzymanie itp.).</td>
    </tr>
  </tbody>
</table>

#### Autoodtwarzanie

Na komputerze `autoplay` nakazuje przeglądarce, by jak najszybciej rozpoczęła pobieranie i odtwarzanie filmu. W iOS oraz Chrome na Androida `autoplay` nie działa. Użytkownik musi kliknąć ekran, by obejrzeć film.

Nawet w przypadku platform, na których autoodtwarzanie jest możliwe, zastanów się, czy warto je włączać:

* Transmisja danych może być droga.
* Uruchomienie pobierania i odtwarzania multimediów bez zgody użytkownika może nagle obciążyć łącze i procesor, spowalniając renderowanie strony.
* Użytkownik może być w miejscu, w którym odtwarzanie filmu lub dźwięku jest niestosowne.

Działanie autoodtwarzania można skonfigurować w Android WebView, korzystając z [interfejsu API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Domyślnie jest ono włączone, ale w aplikacji WebView można je wyłączyć.

#### Wstępne wczytywanie

Atrybut `preload` podpowiada przeglądarce, ile informacji lub treści należy wstępnie wczytać.

<table>
  <thead>
    <tr>
      <th>Wartość</th>
      <th>Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Wartość"><code>none</code></td>
      <td data-th="Opis">Użytkownik może nie zechcieć obejrzeć filmu &ndash; nie należy wczytywać wstępnie żadnych danych.</td>
    </tr>
    <tr>
      <td data-th="Wartość"><code>metadata</code></td>
      <td data-th="Opis">Należy wczytać metadane (czas trwania, wymiary, ścieżki tekstowe), ale z minimalnym fragmentem filmu.</td>
    </tr>
    <tr>
      <td data-th="Wartość"><code>auto</code></td>
      <td data-th="Opis">Zalecane jest pobranie od razu całego filmu.</td>
    </tr>
  </tbody>
</table>

Atrybut "preload" ma różne działanie na poszczególnych platformach.
Na przykład Chrome na komputerze buforuje 25&nbsp;sekund filmu, a w iOS oraz Androidzie nie pobiera żadnych danych. To oznacza, że na urządzeniach mobilnych rozpoczęcie odtwarzania może się opóźnić, co nie zdarza się na komputerach. Szczegółowe informacje znajdziesz na [stronie testowej Steve`a Soudersa](//stevesouders.com/tests/mediaevents.php).

### JavaScript

[Artykuł o wideo opublikowany w HTML5 Rocks](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) zawiera świetne podsumowanie właściwości, metod i zdarzeń w JavaScripcie, których można używać do sterowania odtwarzaniem filmu. Wymieniamy je tutaj, w razie potrzeby dodając uwagi związane z urządzeniami mobilnymi.

#### Właściwości

<table>
  <thead>
    <th>Właściwość</th>
    <th>Opis</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Właściwość"><code>currentTime</code></td>
      <td data-th="Opis">Odczytuje lub ustawia pozycję odtwarzania w sekundach.</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>volume</code></td>
      <td data-th="Opis">Odczytuje lub ustawia bieżący poziom głośności filmu.</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>muted</code></td>
      <td data-th="Opis">Sprawdza lub ustawia wyciszenie dźwięku.</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>playbackRate</code></td>
      <td data-th="Opis">Odczytuje lub ustawia tempo odtwarzania. 1&nbsp;to normalna szybkość do przodu.</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>buffered</code></td>
      <td data-th="Opis">Informacja o tym, jaka część filmu jest zbuforowana i gotowa do odtworzenia (zobacz <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Strona demonstracyjna ze wskaźnikiem buforowania filmu umieszczonym w elemencie canvas">stronę demonstracyjną</a>).</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>currentSrc</code></td>
      <td data-th="Opis">Adres odtwarzanego filmu.</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>videoWidth</code></td>
      <td data-th="Opis">Szerokość filmu w pikselach (może być inna niż elementu video).</td>
    </tr>
    <tr>
      <td data-th="Właściwość"><code>videoHeight</code></td>
      <td data-th="Opis">Wysokość filmu w pikselach (może być inna niż elementu video).</td>
    </tr>
  </tbody>
</table>

Właściwości playbackRate (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">zobacz stronę demonstracyjną</a>) i volume nie działają na urządzeniach mobilnych.

#### Metody

<table>
  <thead>
    <th>Metoda</th>
    <th>Opis</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Metoda"><code>load()</code></td>
      <td data-th="Opis">Wczytuje lub odświeża źródło filmu bez rozpoczynania odtwarzania. Na przykład wtedy, gdy zostało ono zmienione za pomocą kodu JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Metoda"><code>play()</code></td>
      <td data-th="Opis">Odtwarza film od bieżącego miejsca.</td>
    </tr>
    <tr>
      <td data-th="Metoda"><code>pause()</code></td>
      <td data-th="Opis">Wstrzymuje film w bieżącym miejscu.</td>
    </tr>
    <tr>
      <td data-th="Metoda"><code>canPlayType('format')</code></td>
      <td data-th="Opis">Sprawdza, które formaty są obsługiwane (przeczytaj sekcję Sprawdzanie obsługiwanych formatów).</td>
    </tr>
  </tbody>
</table>

Metody play() i pause() nie działają na urządzeniach mobilnych (z wyjątkiem Opery na Androida), chyba że
są wywoływane w odpowiedzi na działanie użytkownika, np. kliknięcie przycisku. Zobacz <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">stronę demonstracyjną</a>. Podobnie nie można rozpoczynać odtwarzania takich treści jak filmy z YouTube umieszczone na stronie.

#### Zdarzenia

To tylko niektóre z wywoływanych zdarzeń multimedialnych. Pełną listę znajdziesz na stronie [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) w Mozilla Developer Network.

<table>
  <thead>
    <th>Zdarzenie</th>
    <th>Opis</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Zdarzenie"><code>canplaythrough</code></td>
      <td data-th="Opis">Wywoływane, gdy na podstawie ilości dostępnych danych przeglądarka uznaje, że może odtworzyć cały film bez zakłóceń.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>ended</code></td>
      <td data-th="Opis">Wywoływane po zakończeniu odtwarzania filmu.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>error</code></td>
      <td data-th="Opis">Wywoływane po wystąpieniu błędu.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>playing</code></td>
      <td data-th="Opis">Wywoływane po pierwszym rozpoczęciu odtwarzania filmu, wstrzymaniu lub ponownym rozpoczęciu.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>progress</code></td>
      <td data-th="Opis">Wywoływane okresowo, by wskazać postępy pobierania.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>waiting</code></td>
      <td data-th="Opis">Wywoływane, gdy działanie zostaje opóźnione z powodu oczekiwania na zakończenie innego działania.</td>
    </tr>
    <tr>
      <td data-th="Zdarzenie"><code>loadedmetadata</code></td>
      <td data-th="Opis">Wywoływane, gdy przeglądarka zakończy wczytywanie metadanych filmu &ndash; czasu trwania, wymiarów i ścieżek tekstowych.</td>
    </tr>
  </tbody>
</table>



