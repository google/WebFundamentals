---
title: "Materiały referencyjne"
description: "Poniżej znajdziesz krótki przegląd właściwości elementu video."
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
  Poniżej znajdziesz krótki przegląd właściwości elementu video.
</p>

{% include shared/toc.liquid %}


## Atrybuty elementu video

Pełną listę atrybutów elementu video i ich definicji znajdziesz w [specyfikacji elementu video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
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

### Autoodtwarzanie

Na komputerze `autoplay` nakazuje przeglądarce, by jak najszybciej rozpoczęła pobieranie i odtwarzanie filmu. W iOS oraz Chrome na Androida `autoplay` nie działa. Użytkownik musi kliknąć ekran, by obejrzeć film.

Nawet w przypadku platform, na których autoodtwarzanie jest możliwe, zastanów się, czy warto je włączać:

* Transmisja danych może być droga.
* Uruchomienie pobierania i odtwarzania multimediów bez zgody użytkownika może nagle obciążyć łącze i procesor, spowalniając renderowanie strony.
* Użytkownik może być w miejscu, w którym odtwarzanie filmu lub dźwięku jest niestosowne.

Działanie autoodtwarzania można skonfigurować w Android WebView, korzystając z [interfejsu API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Domyślnie jest ono włączone, ale w aplikacji WebView można je wyłączyć.

### Wstępne wczytywanie

Atrybut `preload` podpowiada przeglądarce, ile informacji lub treści należy wstępnie wczytać.

<table class="mdl-data-table mdl-js-data-table">
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

## JavaScript

[Artykuł o wideo opublikowany w HTML5 Rocks](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) zawiera świetne podsumowanie właściwości, metod i zdarzeń w JavaScripcie, których można używać do sterowania odtwarzaniem filmu. Wymieniamy je tutaj, w razie potrzeby dodając uwagi związane z urządzeniami mobilnymi.

### Właściwości

<table class="mdl-data-table mdl-js-data-table">
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

Właściwości playbackRate ({% link_sample _code/scripted.html %}zobacz stronę demonstracyjną{% endlink_sample %}) i volume nie działają na urządzeniach mobilnych.

### Metody

<table class="mdl-data-table mdl-js-data-table">
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
są wywoływane w odpowiedzi na działanie użytkownika, np. kliknięcie przycisku. Zobacz {% link_sample _code/scripted.html %}stronę demonstracyjną{% endlink_sample %}. Podobnie nie można rozpoczynać odtwarzania takich treści jak filmy z YouTube umieszczone na stronie.

### Zdarzenia

To tylko niektóre z wywoływanych zdarzeń multimedialnych. Pełną listę znajdziesz na stronie [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) w Mozilla Developer Network.

<table class="mdl-data-table mdl-js-data-table">
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



