---
title: "Optymalizacja czcionek sieci web"
description: "Zagadnienie typografii ma kluczowe znaczenie w dążeniu do poprawności w projektowaniu, budowaniu marki, czytelności i dostępności dla niepełnosprawnych. Czcionki sieci web pozwalają osiągnąć powyższe cele i zwiększyć funkcjonalność tekstu: taki tekst można zaznaczać, wyszukiwać, dowolnie powiększać, jest przyjazny dla urządzeń o wysokiej rozdzielczości, zapewnia ostrość renderowania niezależnie od rozmiaru i rozdzielczości ekranu. Czcionki sieci web mają kluczowe znaczenie dla dobrej praktyki projektowania oraz zagwarantowania użytkownikom wygody i wydajności."
updated_on: 2014-09-30
key-takeaways:
  anatomy:
    - "Czcionki Unicode mogą zawierać tysiące glifów"
    - "Stosuje się czcionki w czterech formatach: WOFF2, WOFF, EOT, TTF"
    - "Niektóre formaty czcionek wymagają zastosowania kompresji GZIP"
  font-family:
    - "Formaty czcionek możesz określić za pomocą wskazówki format()"
    - "Aby zwiększyć wydajność, wydzielaj podzbiory z obszernych zbiorów czcionek Unicode: stosuj wydzielanie zakresów Unicode i ręczne wydzielanie podzbiorów w przypadku starszych przeglądarek"
    - "Ograniczaj liczbę różnych wariantów stylistycznych czcionek, by zwiększyć wydajność wczytywania i renderowania stron"
  font-crp:
    - "Żądania pobrania czcionek są odkładane do zakończenia tworzenia drzewa renderowania, co może prowadzić do opóźnienia renderowania tekstu"
    - "Interfejs API Font Loading pozwala wdrożyć własne strategie wczytywania i renderowania czcionek zastępujące domyślne procedury leniwego wczytywania czcionek"
    - "Zamieszczanie czcionek w kodzie umożliwia zastępowanie domyślnego sposobu leniwego wczytywania czcionek w starszych przeglądarkach"
notes:
  svg:
    - "Prawdę powiedziawszy, istnieje również <a href='http://caniuse.com/svg-fonts'>kontener czcionek SVG</a>, ale nigdy nie obsługiwała go ani przeglądarka IE, ani Firefox, a obecnie oznaczono go jako przestarzały w przeglądarce Chrome. Z tego względu ma on ograniczone zastosowanie i nie będzie omawiany w tym przewodniku."
  zopfli:
    - "Zastanów się nad wykorzystaniem <a href='http://en.wikipedia.org/wiki/Zopfli'>kompresji Zopfli</a> do optymalizacji czcionek w formatach EOT, TTF i WOFF. Zopfli to kompresor zgodny z formatem zlib, zapewniający redukcję rozmiaru pliku o ok. 5% w stosunku do kompresji gzip."
  local-fonts: 
    - "Jeśli strona nie odwołuje się do jednej z domyślnych czcionek systemowych, w praktyce rzadko są one zainstalowane lokalnie, zwłaszcza w przypadku urządzeń mobilnych, na których instalacja dodatkowych czcionek jest w zasadzie niemożliwa. Z tego powodu należy zawsze udostępniać listę zewnętrznych lokalizacji czcionek."
  font-order:
    - "Kolejność podania kolejnych wariantów czcionek ma znaczenie. Przeglądarka wybiera pierwszy obsługiwany format. Dlatego jeśli w nowszych przeglądarkach powinien być używany format WOFF2, deklarację czcionki w tym formacie należy umieścić przed deklaracją czcionki w formacie WOFF i tak dalej."
  unicode-subsetting:
    - "Wydzielanie zakresów Unicode ma szczególne znaczenie w przypadku języków azjatyckich, ponieważ liczba glifów jest o wiele większa niż w językach europejskich, a typowy pełny zbiór czcionek mierzy się w megabajtach, a nie w dziesiątkach kilobajtów."
  synthesis:
    - "Aby uzyskać jak najlepszy wygląd i zachować spójność wyświetlania, nie dopuszczaj do syntezy czcionek. Zamiast tego zmniejsz liczbę używanych wariantów czcionek i określ ich lokalizacje, dzięki czemu przeglądarka będzie mogła je pobrać, gdy okażą się potrzebne. Pamiętając o tym ostrzeżeniu, trzeba wiedzieć, że w niektórych przypadkach warianty uzyskane w drodze syntezy <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>mogą spełniać wymagania</a> &ndash; jednak należy stosować je z rozwagą."
  webfontloader:
    - "W przypadku niektórych przeglądarek interfejs API Font Loading jest wciąż w fazie <a href='http://caniuse.com/#feat=font-loading'>prac rozwojowych</a>. Rozważ użycie biblioteki <a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> lub <a href='https://github.com/typekit/webfontloader'>webfontloader</a>, by zapewnić podobną funkcjonalność, chociaż za cenę dołączenia dodatkowego zasobu JavaScript."
  font-inlining: 
    - "Z umiarem zamieszczaj czcionki w kodzie strony. Pamiętaj, że przyczyną leniwego wczytywania czcionek określonych dyrektywą @font-face jest chęć uniknięcia pobierania zbędnych wariantów i podzbiorów czcionek. Ponadto zwiększenie rozmiaru kodu CSS przez agresywne stosowanie zasady umieszczania czcionek w kodzie negatywnie wpływa na <a href='/web/fundamentals/performance/critical-rendering-path/'>krytyczną ścieżkę renderowania</a> &ndash; przeglądarka musi pobrać cały kod CSS przed utworzeniem modelu CSSOM, zbudowaniem drzewa renderowania i zrenderowaniem treści strony na ekranie."
---

<p class="intro">
  Zagadnienie typografii ma kluczowe znaczenie w dążeniu do poprawności w projektowaniu, budowaniu marki, czytelności i dostępności dla niepełnosprawnych. Czcionki sieci web pozwalają osiągnąć powyższe cele i zwiększyć funkcjonalność tekstu: taki tekst można zaznaczać, wyszukiwać, dowolnie powiększać, jest przyjazny dla urządzeń o wysokiej rozdzielczości, zapewnia ostrość renderowania niezależnie od rozmiaru i rozdzielczości ekranu. Czcionki sieci web mają kluczowe znaczenie dla dobrej praktyki projektowania oraz zagwarantowania użytkownikom wygody i wydajności.
</p>

{% include shared/toc.liquid %}

Optymalizacja czcionek sieci web jest kluczowym elementem strategii zwiększania wydajności. Każda czcionka to dodatkowy zasób zdolny do zablokowania renderowania tekstu, ale korzystanie z czcionek sieci web na stronie wcale nie oznacza, że strona musi renderować się wolniej. Wręcz przeciwnie, zoptymalizowana czcionka w połączeniu z rozsądną strategią wczytywania i wywoływania na stronie może zmniejszyć łączny rozmiar strony i skrócić czas jej renderowania.

## Budowa czcionki sieci web

{% include shared/takeaway.liquid list=page.key-takeaways.anatomy %}

Czcionka sieci web to zbiór glifów, z których każdy jest określonym wektorowo kształtem odzwierciedlającym literę lub symbol. Dlatego rozmiar pliku danej czcionki zależy od dwóch zmiennych: złożoności ścieżek wektorowych w obrębie każdego glifu i liczby glifów w obrębie danej czcionki. Na przykład czcionka Open Sans, będąca jedną z najpopularniejszych czcionek sieci web, zawiera 897 glifów, w tym znaki łacińskie, greckie i cyrylicę.

<img src="images/glyphs.png" class="center" alt="Tabela glifów czcionki">

Przy wyborze czcionki ważne jest, by uwzględnić, które zestawy znaków będą obsługiwane. Jeśli treść strony będzie lokalizowana w wielu językach, wybierz czcionkę zapewniającą spójny wygląd i wrażenia wszystkim użytkownikom. Na przykład [rodzina czcionek Noto firmy Google](https://www.google.com/get/noto/) ma w zamierzeniu obsługiwać wszystkie języki świata. Jednak należy pamiętać, że łączny rozmiar czcionki Noto, przy załączonych wszystkich językach, wynosi ponad 130 MB i to już po zastosowaniu kompresji ZIP! 

Jest oczywiste, że korzystanie z czcionek sieci web wymaga zastosowania dobrze przemyślanych zabiegów, by doskonała typografia nie kolidowała z wydajnością. Na szczęście platforma WWW dostarcza wszystkich potrzebnych funkcji podstawowych. W pozostałej części tego przewodnika zajmiemy się praktycznym wykorzystaniem najlepszych cech wszystkich rozwiązań.

### Formaty czcionek sieci web

Obecnie w Internecie korzysta się z czterech formatów kontenerów czcionek: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://pl.wikipedia.org/wiki/TrueType), [WOFF](http://pl.wikipedia.org/wiki/Web_Open_Font_Format) i [WOFF2](http://www.w3.org/TR/WOFF2/). Niestety, mimo wielu możliwości wyboru, nie istnieje jeden uniwersalny format obsługiwany przez wszystkie starsze i nowsze przeglądarki: format EOT obsługuje [tylko przeglądarka IE](http://caniuse.com/#feat=eot), w przeglądarce IE obecna jest [częściowa obsługa formatu TTF](http://caniuse.com/#search=ttf), format WOFF jest najlepiej obsługiwany, ale [niedostępny w niektórych starszych przeglądarkach](http://caniuse.com/#feat=woff), a wdrażanie obsługi formatu WOFF 2.0 w wielu przeglądarkach [ciągle trwa](http://caniuse.com/#feat=woff2).

Co to dla nas oznacza? Nie istnieje jeden format obsługiwany przez wszystkie przeglądarki, co oznacza konieczność stosowania wielu formatów, jeśli wrażenia użytkowników mają pozostać spójne:

* Przesyłaj wariant WOFF 2.0 do przeglądarek go obsługujących
* Przesyłaj wariant WOFF do większości przeglądarek
* Przesyłaj wariant TTF do starszych przeglądarek na Androidzie (starszych od wersji 4.4)
* Przesyłaj wariant EOT do starszych przeglądarek IE (starszych od wersji 9)
^

{% include shared/remember.liquid title="Note" list=page.notes.svg %}

### Redukcja rozmiaru czcionki dzięki kompresji

Czcionka to zbiór glifów, z których każdy stanowi kolekcję ścieżek opisujących kształt litery. Poszczególne glify są oczywiście różne, ale mimo to zawierają mnóstwo podobnych informacji, które można poddać kompresji metodą GZIP lub inną kompatybilną: 

* Domyślnie pliki formatów EOT i TTF nie są kompresowane: upewnij się, że konfiguracja serwerów wymusza stosowanie [kompresji GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) przy przesyłaniu plików w tych formatach.
* Format WOFF posiada wbudowaną kompresję &ndash; upewnij się, że algorytm kompresji formatu WOFF stosuje optymalne ustawienia kompresji. 
* Format WOFF2 obejmuje niestandardowe przetwarzanie wstępne i algorytmy kompresji umożliwiające redukcję rozmiaru pliku o ok. 30% w stosunku do innych formatów &ndash; patrz [raport](http://www.w3.org/TR/WOFF20ER/).

Warto również wspomnieć, że niektóre formaty czcionek zawierają dodatkowe metadane, np. odnoszące się do [hintingu](http://pl.wikipedia.org/wiki/Hinting) i [kerningu](http://pl.wikipedia.org/wiki/Kerning), które mogą być zbędne na niektórych platformach, co umożliwia dalszą optymalizację. Sprawdź w dokumentacji algorytmu kompresji czcionek, jakie opcje optymalizacji są dostępne, i upewnij się, że dysponujesz odpowiednią infrastrukturą do testowania i dostarczania takich zoptymalizowanych czcionek dla każdej przeglądarki &ndash; np. Google Fonts utrzymuje ponad 30 zoptymalizowanych wariantów dla każdej czcionki i automatycznie wykrywa i dostarcza optymalny wariant dla każdej platformy i przeglądarki.

{% include shared/remember.liquid title="Note" list=page.notes.zopfli %}

## Określanie rodziny czcionek regułą @font-face

{% include shared/takeaway.liquid list=page.key-takeaways.font-family %}

@font-face jest regułą CSS umożliwiającą określenie lokalizacji konkretnego zasobu czcionki, jej stylu i kodów Unicode, dla których powinien obowiązywać. Połączenie takich deklaracji reguł @font-face można wykorzystać do utworzenia `rodziny czcionek`, dzięki której przeglądarka może określić, które czcionki trzeba pobrać i zastosować na bieżącej stronie. Przyjrzyjmy się dokładniej, jak to działa.

### Wybór formatu

W każdej deklaracji reguły @font-face określa się nazwę rodziny czcionek, dzięki której może ona pełnić rolę logicznej grupy wielu deklaracji, [własności czcionki](http://www.w3.org/TR/css3-fonts/#font-prop-desc), takie jak styl, grubość, rozciągnięcie i [deskryptor źródłowy](http://www.w3.org/TR/css3-fonts/#src-desc) zawierający uporządkowaną według ważności listę lokalizacji tego zasobu czcionki.

{% highlight css  %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('ttf'),
       url('/fonts/awesome.eot') format('eot');
}

@font-face {
  font-family: 'Awesome Font';
  font-style: italic;
  font-weight: 400;
  src: local('Awesome Font Italic'),
       url('/fonts/awesome-i.woff2') format('woff2'), 
       url('/fonts/awesome-i.woff') format('woff'),
       url('/fonts/awesome-i.ttf') format('ttf'),
       url('/fonts/awesome-i.eot') format('eot');
}
{% endhighlight %}

Przede wszystkim zwróć uwagę, że w powyższych przykładach określono jedną rodzinę czcionek _Awesome Font_ o dwóch stylach (normalny i _kursywa_), z których każdy jest skojarzony z innym zestawem zasobów czcionek. Z kolei każdy deskryptor `src` zawiera uporządkowaną według ważności, rozdzieloną przecinkami, listę wariantów zasobu: 

* Dyrektywa `local()` umożliwia odwoływanie się, wczytywanie i używanie czcionek zainstalowanych lokalnie.
* Dyrektywa `url()` umożliwia wczytywanie czcionek zewnętrznych. Można do niej dołączyć opcjonalną wskazówkę `format()` w celu opisania formatu czcionki opisanej podanym adresem URL.

^
{% include shared/remember.liquid title="Note" list=page.notes.local-fonts %}

Gdy przeglądarka ustali, że dana czcionka jest potrzebna, odczytuje w określonej kolejności podaną listę zasobów i próbuje wczytać odpowiedni zasób. Korzystając z powyższego przykładu:

1. Przeglądarka wyznacza układ strony i określa, które warianty czcionki są wymagane do zrenderowania pewnego tekstu na stronie.
2. Dla każdej wymaganej czcionki przeglądarka sprawdza, czy czcionka jest dostępna lokalnie.
3. Jeśli plik nie jest dostępny lokalnie, wczytywane kolejno są definicje zewnętrzne:
  * Jeśli obecna jest wskazówka opisująca format, przed rozpoczęciem pobierania przeglądarka sprawdza, czy go obsługuje, a jeśli nie, przechodzi do następnej pozycji.
  * Jeśli nie podano wskazówki opisującej format, przeglądarka pobiera zasób.

Połączenie dyrektyw lokalnych i zewnętrznych z odpowiednimi wskazówkami opisującymi format pozwala określić wszystkie dostępne formaty czcionek i powierzyć przeglądarce pozostałe czynności: stwierdzenie, które zasoby są wymagane, i wybór ich optymalnego formatu.

{% include shared/remember.liquid title="Note" list=page.notes.font-order %}

### Wydzielanie zakresów Unicode

Oprócz właściwości czcionek, takich jak styl, grubość i rozciągniecie, reguła @font-face pozwala określić, jaki zakres Unicode ma być obsługiwany przez każdy z zasobów. Umożliwia to podział dużych czcionek Unicode na mniejsze podzbiory (np. zbiory czcionki łacińskiej, greckiej, cyrylicy) i pobieranie tylko glifów wymaganych do renderowania tekstu na konkretnej stronie.

[Deskryptor zakresu Unicode](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) umożliwia określenie wartości zakresów na liście rozdzielanej przecinkami, przy czym każdy z zakresów może przyjąć jedną z trzech postaci:

* Jedna wartość kodu (np. U+416)
* Zakres wartości (np. U+400-4ff): początek i koniec zakresu kodów
* Zakres określony symbolem wieloznacznym (np. U+4??): znak `?` oznacza dowolną cyfrę heksadecymalną

Na przykład naszą rodzinę czcionek _Awesome Font_ możemy rozdzielić na podzbiory czcionki łacińskiej i japońskiej, z których każdy przeglądarka będzie mogła pobrać według potrzeby: 

{% highlight css %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-jp.woff2') format('woff2'), 
       url('/fonts/awesome-jp.woff') format('woff'),
       url('/fonts/awesome-jp.ttf') format('ttf'),
       url('/fonts/awesome-jp.eot') format('eot');
  unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
}
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.unicode-subsetting %}

Użycie podzbiorów zakresów Unicode i osobnych plików dla każdego wariantu stylistycznego czcionki pozwala utworzyć złożoną rodzinę czcionek, co zwiększa zarówno prędkość, jak i efektywność pobierania &ndash; użytkownik będzie pobierać tylko potrzebne warianty i podzbiory, a nie te, których być może nigdy nie zobaczy lub nie wykorzysta na stronie. 

Pamiętajmy jednak o małym haczyku: [jeszcze nie wszystkie przeglądarki obsługują zakresy Unicode](http://caniuse.com/#feat=font-unicode-range). Niektóre przeglądarki po prostu ignorują wskazówkę z opisem zakresu Unicode i pobierają wszystkie warianty, a inne mogą w ogóle nie przetwarzać deklaracji @font-face. Aby poradzić sobie z tym problemem, musimy uciec się do "ręcznego wydzielania podzbiorów" w starszych przeglądarkach.

Ponieważ starsze przeglądarki nie są na tyle inteligentne, by wybrać tylko niezbędne zasoby i utworzyć czcionkę złożoną, musimy uciec się do dostarczenia pojedynczego zasobu czcionki, który będzie zawierać wszystkie niezbędne podzbiory, a pozostałe ukryć przed przeglądarką. Na przykład, jeśli strona wykorzystuje tylko znaki łacińskie, możemy pozbyć się pozostałych glifów i przesłać tylko określony podzbiór jako samodzielny zasób. 

1. **W jaki sposób określić, które podzbiory są potrzebne?** 
  - Jeśli przeglądarka obsługuje wydzielanie zakresów Unicode, wybierze automatycznie właściwy podzbiór. Strona będzie wymagać tylko dostarczenia plików podzbiorów i określenia odpowiednich zakresów Unicode w regułach @font-face.
  - W przypadku braku obsługi zakresów Unicode strona będzie musiała ukryć wszystkie zbędne podzbiory &ndash; tzn. programista będzie musiał samodzielnie określić wymagane podzbiory.
2. **Jak wygenerować podzbiory czcionek?**
  - Do określenia podzbiorów i optymalizacji czcionek można użyć narzędzia typu open source [pyftsubset](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16).
  - Niektóre serwisy z czcionkami umożliwiają wydzielanie podzbiorów z użyciem własnych parametrów zapytań, dzięki czemu można ręcznie określić podzbiór wymagany przez stronę &ndash; szczegóły możesz sprawdzić w dokumentacji serwisu.


### Wybór i synteza czcionek

Każda rodzina czcionek składa się z wielu wariantów stylistycznych (normalnego, pogrubionego, kursywy) i wielu stopni pogrubienia dla każdego stylu, z których z kolei każdy może zawierać glify o bardzo różnych kształtach &ndash; np. o różnej wielkości rozstrzelenia, różnym rozmiarze albo w ogóle o odmiennym kształcie. 

<img src="images/font-weights.png" class="center" alt="Grubości czcionek">

Powyższa ilustracja przedstawia rodzinę czcionek o trzech różnych grubościach: 400 (normalna), 700 (pogrubiona) i 900 (bardzo pogrubiona). Wszystkie inne (oznaczone kolorem szarym) warianty pomiędzy powyższymi są automatycznie mapowane przez przeglądarkę do najbliższego dostępnego wariantu. 

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Po określeniu grubości, dla której nie istnieje dedykowana czcionka, używana jest czcionka o najbliższej grubości. Generalnie warianty pogrubione są mapowane do wariantów o większych grubościach, a warianty normalne do wariantów o mniejszych grubościach.
    <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algorytm dopasowywania czcionek CSS3</a></p>
    </blockquote>
  </div>
</div>

Podobna procedura obowiązuje dla różnych wariantów _kursywy_. Projektant czcionek ma kontrolę nad tym, które warianty zostaną utworzone, a my mamy kontrolę nad tym, których wariantów użyjemy na stronie &ndash; a ponieważ każdy wariant wymaga osobnego pobierania, dobrze jest ograniczyć ich liczbę do minimum. Na przykład możemy określić dwa warianty naszej rodziny czcionek _Awesome Font_: 

{% highlight css %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 700;
  src: local('Awesome Font'),
       url('/fonts/awesome-l-700.woff2') format('woff2'), 
       url('/fonts/awesome-l-700.woff') format('woff'),
       url('/fonts/awesome-l-700.ttf') format('ttf'),
       url('/fonts/awesome-l-700.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
{% endhighlight %}

W powyższym przykładzie zadeklarowano rodzinę czcionek _Awesome Font_ składającą się z dwóch zasobów, które obejmują ten sam zestaw glifów łacińskich (U+000-5FF), ale cechują je inne grubości: normalna (400) i pogrubienie (700). Jednak co się stanie, jeśli w jednej z naszych reguł CSS zostanie użyta inna grubość czcionki lub jako styl czcionki zostanie wybrana kursywa?

* Jeśli dokładnie pasująca czcionka jest niedostępna, przeglądarka wybierze najbliższe dopasowanie.
* Jeśli brak dopasowania względem stylu (np. brak zadeklarowanych wariantów z kursywą, jak w przykładzie powyżej), przeglądarka przeprowadzi syntezę własnego wariantu czcionki. 

<img src="images/font-synthesis.png" class="center" alt="Synteza czcionek">

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Autorzy stron powinni mieć świadomość, że syntetyzowane czcionki mogą być zupełnie nieodpowiednie, np. w przypadku cyrylicy wersje z kursywą są zupełnie odmienne od normalnych. Zawsze lepiej jest polegać na rzeczywiście pobranej czcionce kursywy, niż na wersji zsyntetyzowanej.
    <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">Styl czcionki CSS3</a></p>
    </blockquote>
  </div>
</div>

Powyższy przykład ilustruje różnicę pomiędzy rzeczywistą i zsyntetyzowaną czcionką Open-Sans &ndash; wszystkie zsyntetyzowane warianty wygenerowano z jednej czcionki o grubości 400. Jak widać, różnice są zauważalne. Nie określono żadnych szczegółowych wytycznych generowania wariantów pogrubionych i skośnych. Dlatego wyniki mogą być różne dla różnych przeglądarek, zależą również w dużym stopniu od konkretnej czcionki.

{% include shared/remember.liquid title="Note" list=page.notes.synthesis %}


## Optymalizacja wczytywania i renderowania

{% include shared/takeaway.liquid list=page.key-takeaways.font-crp %}

Pełna wersja czcionki sieci web ze wszystkimi wariantami stylistycznymi, których możemy nie potrzebować, i ze wszystkimi glifami, których zazwyczaj się nie wykorzystuje, może skutkować koniecznością pobrania wielu megabajtów danych. Rozwiązaniem tego problemu jest reguła @font-face kodu CSS, którą opracowano specjalnie w celu umożliwienia podziału rodziny czcionek na kolekcję zasobów: podzbiorów Unicode, osobnych wariantów stylistycznych i tak dalej. 

Uwzględniając te deklaracje, przeglądarka wyznacza wymagane podzbiory i warianty, a następnie pobiera minimalny ich zestaw wymagany do zrenderowania tekstu. Takie zachowanie jest bardzo dla nas wygodne, ale jeśli nie zachowamy ostrożności, może wystąpić wąskie gardło w krytycznej ścieżce renderowania, co opóźni renderowanie tekstu &ndash; a tego chcielibyśmy uniknąć. 

### Czcionki sieci web i krytyczna ścieżka renderowania

Leniwe wczytywanie czcionek niesie ze sobą pewną ukrytą konsekwencję, która może prowadzić do opóźnienia renderowania tekstu: przeglądarka musi na podstawie drzew DOM i CSSOM [utworzyć drzewo renderowania](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction), zanim ustali, których zasobów będzie potrzebować do renderowania tekstu. Z tej przyczyny żądania pobierania czcionek są odkładane na moment po pobraniu innych krytycznych zasobów, a przeglądarka może zostać zablokowana i nie być zdolna do renderowania tekstu do chwili pobrania tych zasobów.

<img src="images/font-crp.png" class="center" alt="Krytyczna ścieżka renderowania czcionek">

1. Przeglądarka wysyła żądanie dokumentu HTML
2. Przeglądarka rozpoczyna parsowanie odpowiedzi HTML i tworzy drzewo DOM
3. Przeglądarka rozpoznaje kod CSS i JS oraz inne zasoby, a następnie wysyła odpowiednie żądania
4. Przeglądarka tworzy drzewo CSSOM po odebraniu wszystkich zasobów CSS, a następnie łączy je z drzewem DOM w jedno drzewo renderowania
  * Żądania czcionek są wysyłane po wykryciu w drzewie renderowania, których wariantów czcionek potrzeba do zrenderowania tekstu na stronie
5. Przeglądarka wyznacza układ strony i maluje treść na ekranie
  * W przypadku niedostępności czcionki przeglądarka może nie zrenderować żadnych pikseli tekstu
  * Gdy czcionka stanie się dostępna, przeglądarka wykona malowanie pikseli tekstu

Chęć jak najszybszego pierwszego odmalowania treści strony (co może nastąpić od razu po utworzeniu drzewa renderowania) i wysyłanie żądania o zasób czcionki dopiero po pewnym czasie prowadzą razem do `problemu pustego tekstu`. Objawia się on renderowaniem samego układu strony, ale nie tekstu. W rzeczywistości zachowanie zależy od rodzaju przeglądarki:

* Przeglądarka Safari wstrzymuje renderowanie tekstu, aż pobieranie czcionek się zakończy.
* Przeglądarki Chrome i Firefox wstrzymują renderowanie czcionek na maksymalnie 3 sekundy i po tym okresie stosują czcionki zastępcze, a po zakończeniu pobierania czcionek ponownie renderują tekst z użyciem pobranych czcionek.
* Przeglądarka IE niezwłocznie renderuje tekst z użyciem czcionek zastępczych, jeśli żądane czcionki nie są jeszcze dostępne, a następnie ponownie renderuje tekst z użyciem pobranych czcionek.

Istnieją dobre argumenty za i przeciw różnym strategiom renderowania: niektórych ludzi denerwuje ponowne renderowanie, inni wolą zobaczyć wyniki natychmiast i nie przeszkadza im zmiana układu strony po zakończeniu pobierania czcionek &ndash; o gustach się nie dyskutuje. Faktem jest, że leniwe wczytywanie prowadzi do redukcji liczby pobranych danych, ale potencjalnie prowadzi również do opóźnienia renderowania tekstu. Zaraz się zastanowimy, jak można zoptymalizować to zachowanie.

### Optymalizacja renderowania czcionek z użyciem interfejsu API Font Loading

[Interfejs API Font Loading](http://dev.w3.org/csswg/css-font-loading/) to interfejs do wczytywania skryptów umożliwiających określanie i manipulację czcionkami w kodzie CSS, śledzenie postępu ich pobierania i zastępowanie domyślnego sposobu leniwego wczytywania. Na przykład, jeśli mamy pewność, że pewien wariant czcionki będzie wymagany, możemy określić ten wariant i polecić przeglądarce niezwłoczne pobranie zasobu czcionki:

{% highlight javascript %}
var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load(); // don't wait for render tree, initiate immediate fetch!

font.ready().then(function() {
  // apply the font (which may rerender text and cause a page reflow)
  // once the font has finished downloading
  document.fonts.add(font);
  document.body.style.fontFamily = "Awesome Font, serif";

  // OR... by default content is hidden, and rendered once font is available
  var content = document.getElementById("content");
  content.style.visibility = "visible";

  // OR... apply own render strategy here... 
});
{% endhighlight %}

Ponadto (dzięki metodzie [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) możemy zweryfikować stan czcionki i śledzić postęp jej pobierania, możemy również określić własną strategię renderowania tekstu na stronach: 

* Możemy całkowicie wstrzymać renderowanie tekstu, aż czcionka stanie się dostępna.
* Możemy określić własny czas oczekiwania dla każdej czcionki.
* Możemy użyć czcionki zastępczej w celu odblokowania renderowania, a następnie wprowadzić nowy styl korzystający z preferowanej czcionki, gdy ta stanie się dostępna.

Najlepsze jest jednak to, że dla różnych typów treści na stronie można łączyć powyższe strategie &ndash; np. wstrzymanie renderowania tekstu w niektórych sekcjach, aż czcionka stanie się dostępna; użycie czcionki zastępczej i ponowne renderowanie po zakończeniu pobierania czcionek; określenie różnych limitów czasu oczekiwania i tak dalej. 

{% include shared/remember.liquid title="Note" list=page.notes.webfontloader %}

### Optymalizacja renderowania czcionek przez zamieszczanie czcionek w kodzie

Jeśli nie można skorzystać z interfejsu API Font Loading, `problem pustego tekstu` da się w prosty sposób wyeliminować: zamieścić zawartość czcionki w arkuszu stylów CSS.

* Arkusze stylów CSS z pasującymi zapytaniami o media są automatycznie pobierane przez przeglądarkę z wysokim priorytetem, ponieważ są potrzebne do utworzenia modelu CSSOM.
* Zamieszczanie danych czcionek w arkuszu stylów CSS wymusza na przeglądarce pobieranie czcionek z wysokim priorytetem i bez oczekiwania na drzewo renderowania &ndash; umożliwia to ręczne zastąpienie domyślnego zachowania polegającego na leniwym wczytywaniu.

Strategia zamieszczania w kodzie nie jest aż tak elastyczna i nie umożliwia określania niestandardowych czasów oczekiwania oraz strategii renderowania dla różnych typów treści, ale jest to proste i wszechstronne rozwiązanie, działające we wszystkich przeglądarkach. Najlepsze wyniki daje umieszczenie czcionek zamieszczonych w kodzie w osobnych arkuszach stylów i określenie ich długiego okresu ważności max-age &ndash; dzięki temu w przypadku aktualizacji arkusza CSS użytkownicy nie będą musieli ponownie pobierać czcionek. 

{% include shared/remember.liquid title="Note" list=page.notes.font-inlining %}

### Optymalizacja ponownego użycia czcionek dzięki buforowaniu HTTP

Zasoby czcionek są zazwyczaj zasobami statycznymi, niezbyt często aktualizowanymi. Dzięki temu zastosowanie długiego okresu upływu ważności max-age nie stanowi żadnego problemu. Pamiętaj, by określić zarówno [warunkowy nagłówek ETag](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags), jak i [optymalną politykę Cache-Control](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) dla wszystkich zasobów czcionek.   
    
Przechowywanie czcionek w magazynie lokalnym lub z użyciem innych mechanizmów jest niewskazane &ndash; każdy z nich powoduje różne specyficzne problemy z wydajnością. Pamięć podręczna HTTP przeglądarki w połączeniu z interfejsem API Font Loading lub biblioteką webfontloader to najlepszy i najbardziej wszechstronny sposób dostarczania zasobów czcionek do przeglądarki.


## Optymalizacja &ndash; lista czynności

Wbrew powszechnemu mniemaniu użycie czcionek sieci web nie musi prowadzić do opóźnienia renderowania stron ani mieć negatywnego wpływu na wydajność. Zoptymalizowane użycie czcionek pozwala zwiększyć wygodę użytkowników: rozszerzyć rozpoznawalność marki, polepszyć czytelność, funkcjonalność i sprawność wyszukiwania, zapewniając przy tym możliwość zmiany skali i pracę przy wielu różnych rozdzielczościach i formatach ekranu. Nie obawiaj się używania czcionek sieci web! 

Pamiętaj jednak, że zbyt prosta implementacja może skutkować pobieraniem dużej ilości danych i niepotrzebnymi opóźnieniami. Właśnie w tej chwili należy przypomnieć sobie o naszym przewodniku optymalizacji i wspomóc przeglądarkę, optymalizując same zasoby czcionek i sposób ich pobierania na stronach. 

1. **Audytuj i monitoruj użycie czcionek:** nie używaj zbyt wielu czcionek na stronach, a dla każdej czcionki ograniczaj liczbę obecnych wariantów. Pozwoli to skrócić czasy oczekiwania użytkowników na wyświetlenie treści.
2. **Używaj podzbiorów czcionek:** w przypadku wielu czcionek można wydzielić podzbiory, rozdzielić je na wiele zakresów Unicode i dostarczyć tylko glify konkretnie wymagane na danej stronie &ndash; pozwala to ograniczyć rozmiar pliku i zwiększyć prędkość pobierania zasobów. Przy określaniu podzbiorów pamiętaj o optymalizacji czcionek pod kątem ponownego użycia &ndash; np. niewskazane jest pobieranie różnych, ale zachodzących na siebie zbiorów znaków na różnych stronach. Dobrą praktyką jest wydzielanie podzbiorów w oparciu o transkrypcję &ndash; np. łacińską, cyrylicę i tak dalej.
3. **Przesyłaj czcionki w formatach dostosowanych do każdej z przeglądarek:** każda czcionka powinna być dostarczana w formatach WOFF2, WOFF, EOT i TTF. Upewnij się, że do formatów EOT i TTF stosowana będzie kompresja GZIP, ponieważ formaty te nie są domyślnie kompresowane.
4. **Określ zasady ponownej walidacji i optymalnego buforowania:** czcionki to zasoby statyczne, które są rzadko aktualizowane. Upewnij się, że Twoje serwery zapewniają długi okres ważności max-age i wysyłają tokeny walidacji, co umożliwi efektywne ponowne używanie czcionek na różnych stronach w witrynie.
5. **Używaj interfejsu API Font Loading do optymalizacji krytycznej ścieżki renderowania:** domyślny sposób leniwego wczytywania może się wiązać z opóźnieniem renderowania tekstu. Interfejs API Font Loading umożliwia zastępowanie tego zachowania dla poszczególnych czcionek i określanie własnych strategii renderowania i czasów oczekiwania dla różnych typów treści na stronie. W przypadku starszych, nieobsługujących tego interfejsu API, przeglądarek możesz skorzystać z biblioteki webfontloader dla języka JavaScript lub zastosować strategię umieszczania czcionek w kodzie CSS.


