---
title: "Dodawanie filmu"
description: "Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu."
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
  Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu.
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## Dodawanie elementu video

Dodaj element video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>Twoja przeglądarka nie obsługuje elementu video.</p>
</video>
{% endhighlight %}

## Określanie wielu formatów plików

Nie wszystkie przeglądarki obsługują te same formaty wideo.
Element `<source>` pozwala określić wiele formatów zastępczych, jeśli przeglądarka nie obsługuje tego zamierzonego.
Na przykład:

{% include_code src=_code/video-main.html snippet=sourcetypes %}

Podczas analizowania tagów `<source>` przeglądarka korzysta z opcjonalnego atrybutu `type`, by ustalić, który plik ma pobrać i odtworzyć. Jeśli przeglądarka obsługuje WebM, odtworzy plik chrome.webm. W przeciwnym razie sprawdzi, czy może odtworzyć film w formacie MPEG-4.
Więcej o działaniu plików wideo i dźwiękowych w internecie dowiesz się z filmu <a href='//www.xiph.org/video/vid1.shtml' title='Ciekawy i pouczający przewodnik wideo po cyfrowych filmach'>A Digital Media Primer for Geeks</a>.

To rozwiązanie ma kilka zalet w porównaniu do wykonywania różnego kodu HTML lub używania skryptów po stronie serwera, zwłaszcza na urządzeniach mobilnych:

* Programista może wymienić formaty w preferowanej kolejności.
* Natywne przełączanie się po stronie klienta zmniejsza czas oczekiwania. Przeglądarka wysyła tylko jedno żądanie, by pobrać treści.
* Umożliwienie przeglądarce wyboru formatu jest prostsze, szybsze i prawdopodobnie bardziej niezawodne niż stosowanie bazy danych obsługi po stronie serwera i wykrywanie klienta użytkownika.
* Określenie typu każdego pliku źródłowego zwiększa wydajność sieci. Przeglądarka może wybrać plik wideo bez pobierania fragmentu filmu i rozpoznawania formatu.

Wszystkie te punkty są szczególnie ważne w kontekście urządzeń mobilnych, na których przepustowość sieci i czas oczekiwania mają duże znaczenie, a cierpliwość użytkownika jest zwykle ograniczona. 
Brak atrybutu type może wpłynąć na wydajność, gdy wiele typów plików źródłowych nie jest obsługiwanych.

Użyj narzędzi dla programistów w przeglądarce mobilnej, by porównać aktywność sieci, gdy w kodzie {% link_sample _code/video-main.html %}są atrybuty type{% endlink_sample %} i gdy {% link_sample _code/notype.html %}ich nie ma{% endlink_sample %}.
Przejrzyj w tych narzędziach także nagłówki odpowiedzi, by [upewnić się, że serwer zgłasza właściwy typ MIME](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). W przeciwnym razie sprawdzanie typu pliku źródłowego filmu nie będzie działać.

## Określanie czasu rozpoczęcia i zakończenia

Możesz zmniejszyć obciążenie łącza i poprawić elastyczność strony &ndash; użyj interfejsu API Media Fragments, by dodać czas rozpoczęcia i zakończenia do elementu video.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
  <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

Aby umieścić na stronie fragment multimediów, wystarczy dodać `#t=[start_time][,end_time]` do ich adresu URL. Jeśli np. użytkownik ma zobaczyć fragment filmu od 5 do 10&nbsp;sekundy, użyj takiego elementu:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

Interfejs API Media Fragments pozwala udostępniać wiele widoków tego samego filmu (podobnie do wyboru scen na płycie DVD) bez konieczności kodowania i przesyłania wielu plików.

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

Użyj narzędzi dla programistów w przeglądarce, by znaleźć ciąg `Accept-Ranges: bytes` w nagłówkach odpowiedzi:

<img class="center" alt="Zrzut ekranu z Narzędziami Chrome dla programistów &ndash; `Accept-Ranges: bytes`" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Dołączanie obrazu plakatu

Dodaj atrybut poster do elementu video, by od razu po wczytaniu strony użytkownicy mogli zorientować się w treści filmu, bez potrzeby jego pobierania czy uruchamiania odtwarzania.

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

Plakat może też być obrazem zastępczym, gdy atrybut `src` elementu video jest nieprawidłowy lub żaden z dostępnych formatów wideo nie jest obsługiwany. Jedyna wada obrazów plakatu to dodatkowe żądanie wyświetlenia pliku, które zajmuje łącze i wymaga renderowania. Więcej informacji znajdziesz w artykule [Optymalizacja obrazów](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Tak wygląda porównanie filmu z obrazem plakatu i bez niego (plakat jest w odcieniach szarości na dowód, że nie jest to film):

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Zrzut ekranu Chrome na Androida, orientacja pionowa &ndash; bez plakatu" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Zrzut ekranu Chrome na Androida, orientacja pionowa &ndash; z plakatem" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



