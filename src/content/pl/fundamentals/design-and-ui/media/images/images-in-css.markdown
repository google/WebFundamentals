---
title: "Obrazy w CSS"
description: "Właściwość CSS `background` to skuteczne narzędzie do umieszczania złożonych obrazów w elementach, które ułatwia dodawanie wielu obrazów, pozwala powtarzać je w elemencie itp."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Używaj obrazów, które najlepiej pasują do cech wyświetlacza. Weź pod uwagę rozmiar ekranu, rozdzielczość urządzenia i układ strony."
    - "Zmień właściwość <code>background-image</code> w CSS na potrzeby wyświetlaczy o wysokiej liczbie DPI, korzystając z zapytań o media z parametrami <code>min-resolution</code> i <code>-webkit-min-device-pixel-ratio</code>."
    - "Dodaj do znaczników atrybut srcset, by oprócz obrazów w skali 1x wyświetlać też wersje w wysokiej rozdzielczości."
    - "Rozważ spadek wydajności podczas stosowania technik zastępowania grafik w JavaScripcie lub wyświetlania mocno skompresowanych obrazów w wysokiej rozdzielczości na urządzeniach o niższej rozdzielczości."
  avoid-images:
    - "W miarę możliwości unikaj obrazów. Zamiast nich korzystaj z funkcji przeglądarki oraz znaków w standardzie Unicode, a złożone ikony zastępuj czcionkami z ikonami."
  optimize-images:
    - "Nie wybieraj przypadkowo formatu obrazu. Zapoznaj się z dostępnymi formatami i wybierz ten najbardziej odpowiedni."
    - "W procesie tworzenia używaj narzędzi do optymalizacji i kompresji obrazów, by zmniejszyć rozmiary plików."
    - "Zmniejsz liczbę żądań HTTP, umieszczając często używane obrazy w sprite`ach graficznych."
    - "Rozważ opcję wczytywania obrazów dopiero wtedy, gdy po przewinięciu strony pojawią się w widoku, tak by skrócić czas początkowego wyświetlania strony i zmniejszyć ilość pobieranych danych."
notes:
  compressive:
    - "Zachowaj ostrożność przy korzystaniu z technik kompresji, bo dekodowanie wymaga większej ilości pamięci i obciąża procesor. Zmiana rozmiaru dużych obrazów, by zmieściły się na mniejszym ekranie, wymaga znacznych zasobów i jest szczególnie uciążliwa na słabszych urządzeniach z niewielką pamięcią i mocą procesora."
---

<p class="intro">
  Właściwość CSS `background` to skuteczne narzędzie do umieszczania złożonych obrazów w elementach, które ułatwia dodawanie wielu obrazów, pozwala powtarzać je w elemencie itp. W połączeniu z zapytaniami o media staje się jeszcze bardziej przydatna, umożliwiając warunkowe wczytywanie obrazów na podstawie rozdzielczości ekranu, rozmiaru widocznego obszaru i innych parametrów.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Używanie zapytań o media do warunkowego wczytywania obrazów lub dostosowywania grafiki

Zapytania o media nie tylko wypływają na układ strony, ale też pozwalają warunkowo wczytywać obrazy i dostosowywać grafikę na podstawie szerokości widocznego obszaru.

W przykładzie poniżej na mniejszych ekranach tylko plik `small.png` jest pobierany i stosowany do elementu `div`. Z kolei na większych polecenie `background-image: url(body.png)` jest stosowane do treści, a `background-image: url(large.png)` &ndash; do elementu `div`.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

## Używanie funkcji image-set do wyświetlania obrazów w wysokiej rozdzielczości

Funkcja `image-set()` w CSS rozszerza działanie właściwości `background`, ułatwiając wyświetlanie różnych plików graficznych w zależności od cech urządzenia. Dzięki niej przeglądarka może wybrać obraz, który najlepiej pasuje do możliwości urządzenia. Na przykład pokazać obraz 2x na ekranie 2x lub obraz 1x na urządzeniu 2x przy ograniczonej przepustowości sieci.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

Oprócz wczytania poprawnej grafiki przeglądarka także odpowiednio
ją skaluje. Krótko mówiąc, przeglądarka zakłada, że obrazy 2x są dwa razy większe niż 1x, więc pomniejsza je dwukrotnie, by miały właściwy rozmiar na stronie.

Funkcja `image-set()` jest dość nowa i działa tylko w Chrome i Safari z przedrostkiem dostawcy `-webkit`. Pamiętaj też, by dołączyć obraz zastępczy, na wypadek gdyby funkcja `image-set()` nie była obsługiwana, na przykład:

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

Kod powyżej powoduje wczytanie odpowiedniego zasobu w przeglądarkach, w których działa funkcja `image-set`, a w pozostałych &ndash; wyświetlenie zasobu zastępczego 1x. Oczywiście dopóki niewiele przeglądarek obsługuje `image-set()`, najczęściej użytkownicy będą widzieć zasób 1x.

## Używanie zapytań o media do wyświetlania obrazów w wysokiej rozdzielczości lub dostosowywania grafiki

W zapytaniach o media można tworzyć reguły, które zależą od [współczynnika pikseli urządzenia](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), co pozwala określać różne obrazy przeznaczone na wyświetlacze 2x lub 1x.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Chrome, Firefox i Opera obsługują standardowe polecenie `(min-resolution: 2dppx)`, a Safari i przeglądarka w Androidzie wymagają starszej wersji składni z przedrostkiem dostawcy i bez jednostki `dppx`. Pamiętaj, że te style wczytują się tylko wtedy, gdy urządzenie pasuje do zapytania o media, więc musisz zdefiniować też style stosowane w podstawowym przypadku. Dzięki temu zyskasz pewność, że nawet gdy przeglądarka nie obsługuje rozdzielczości podanej w konkretnych zapytaniach o media, wyrenderuje poprawny widok.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

Możesz też użyć polecenia `min-width`, by wyświetlać alternatywne obrazy w zależności od rozmiaru widocznego obszaru. Zaleta tej techniki polega na tym, że jeśli zapytanie o media nie pasuje, obraz nie jest pobierany. Na przykład plik `bg.png` jest pobierany i stosowany w elemencie `body` tylko wtedy, gdy szerokość przeglądarki wynosi co najmniej 500&nbsp;pikseli:

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}	



