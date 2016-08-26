project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Właściwość CSS `background` to skuteczne narzędzie do umieszczania złożonych obrazów w elementach, które ułatwia dodawanie wielu obrazów, pozwala powtarzać je w elemencie itp.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Obrazy w CSS {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Właściwość CSS `background` to skuteczne narzędzie do umieszczania złożonych obrazów w elementach, które ułatwia dodawanie wielu obrazów, pozwala powtarzać je w elemencie itp. W połączeniu z zapytaniami o media staje się jeszcze bardziej przydatna, umożliwiając warunkowe wczytywanie obrazów na podstawie rozdzielczości ekranu, rozmiaru widocznego obszaru i innych parametrów.



## TL;DR {: .hide-from-toc }
- 'Używaj obrazów, które najlepiej pasują do cech wyświetlacza. Weź pod uwagę rozmiar ekranu, rozdzielczość urządzenia i układ strony.'
- 'Zmień właściwość <code>background-image</code> w CSS na potrzeby wyświetlaczy o wysokiej liczbie DPI, korzystając z zapytań o media z parametrami <code>min-resolution</code> i <code>-webkit-min-device-pixel-ratio</code>.'
- 'Dodaj do znaczników atrybut srcset, by oprócz obrazów w skali 1x wyświetlać też wersje w wysokiej rozdzielczości.'
- Rozważ spadek wydajności podczas stosowania technik zastępowania grafik w JavaScripcie lub wyświetlania mocno skompresowanych obrazów w wysokiej rozdzielczości na urządzeniach o niższej rozdzielczości.


## Używanie zapytań o media do warunkowego wczytywania obrazów lub dostosowywania grafiki

Zapytania o media nie tylko wypływają na układ strony, ale też pozwalają warunkowo wczytywać obrazy i dostosowywać grafikę na podstawie szerokości widocznego obszaru.

W przykładzie poniżej na mniejszych ekranach tylko plik `small.png` jest pobierany i stosowany do elementu `div`. Z kolei na większych polecenie `background-image: url(body.png)` jest stosowane do treści, a `background-image: url(large.png)` &ndash; do elementu `div`.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## Używanie funkcji image-set do wyświetlania obrazów w wysokiej rozdzielczości

Funkcja `image-set()` w CSS rozszerza działanie właściwości `background`, ułatwiając wyświetlanie różnych plików graficznych w zależności od cech urządzenia. Dzięki niej przeglądarka może wybrać obraz, który najlepiej pasuje do możliwości urządzenia. Na przykład pokazać obraz 2x na ekranie 2x lub obraz 1x na urządzeniu 2x przy ograniczonej przepustowości sieci.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Oprócz wczytania poprawnej grafiki przeglądarka także odpowiednio
ją skaluje. Krótko mówiąc, przeglądarka zakłada, że obrazy 2x są dwa razy większe niż 1x, więc pomniejsza je dwukrotnie, by miały właściwy rozmiar na stronie.

Funkcja `image-set()` jest dość nowa i działa tylko w Chrome i Safari z przedrostkiem dostawcy `-webkit`. Pamiętaj też, by dołączyć obraz zastępczy, na wypadek gdyby funkcja `image-set()` nie była obsługiwana, na przykład:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

Kod powyżej powoduje wczytanie odpowiedniego zasobu w przeglądarkach, w których działa funkcja `image-set`, a w pozostałych &ndash; wyświetlenie zasobu zastępczego 1x. Oczywiście dopóki niewiele przeglądarek obsługuje `image-set()`, najczęściej użytkownicy będą widzieć zasób 1x.

## Używanie zapytań o media do wyświetlania obrazów w wysokiej rozdzielczości lub dostosowywania grafiki

W zapytaniach o media można tworzyć reguły, które zależą od [współczynnika pikseli urządzenia](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), co pozwala określać różne obrazy przeznaczone na wyświetlacze 2x lub 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox i Opera obsługują standardowe polecenie `(min-resolution: 2dppx)`, a Safari i przeglądarka w Androidzie wymagają starszej wersji składni z przedrostkiem dostawcy i bez jednostki `dppx`. Pamiętaj, że te style wczytują się tylko wtedy, gdy urządzenie pasuje do zapytania o media, więc musisz zdefiniować też style stosowane w podstawowym przypadku. Dzięki temu zyskasz pewność, że nawet gdy przeglądarka nie obsługuje rozdzielczości podanej w konkretnych zapytaniach o media, wyrenderuje poprawny widok.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

Możesz też użyć polecenia `min-width`, by wyświetlać alternatywne obrazy w zależności od rozmiaru widocznego obszaru. Zaleta tej techniki polega na tym, że jeśli zapytanie o media nie pasuje, obraz nie jest pobierany. Na przykład plik `bg.png` jest pobierany i stosowany w elemencie `body` tylko wtedy, gdy szerokość przeglądarki wynosi co najmniej 500&nbsp;pikseli:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



