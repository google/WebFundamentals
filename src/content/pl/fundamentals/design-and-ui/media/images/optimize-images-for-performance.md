project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obrazy często stanowią większość pobranych danych i zajmują znaczną część powierzchni strony.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Optymalizowanie obrazów pod kątem wydajności {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Obrazy często stanowią większość pobranych danych i zajmują znaczną część powierzchni strony. W efekcie ich optymalizacja może przynieść zauważalny spadek ilości pobieranych danych i zwiększenie wydajności witryny. Im mniej bajtów musi pobrać przeglądarka, tym szybciej pobierze i wyświetli wszystkie zasoby oraz w mniejszym stopniu obciąży łącze klienta.


## TL;DR {: .hide-from-toc }
- Nie wybieraj przypadkowo formatu obrazu. Zapoznaj się z dostępnymi formatami i wybierz ten najbardziej odpowiedni.
- 'W procesie tworzenia używaj narzędzi do optymalizacji i kompresji obrazów, by zmniejszyć rozmiary plików.'
- 'Zmniejsz liczbę żądań HTTP, umieszczając często używane obrazy w sprite`ach graficznych.'
- 'Rozważ opcję wczytywania obrazów dopiero wtedy, gdy po przewinięciu strony pojawią się w widoku, tak by skrócić czas początkowego wyświetlania strony i zmniejszyć ilość pobieranych danych.'


## Wybór właściwego formatu

Należy wziąć pod uwagę dwa typy obrazów: [wektorowe](http://pl.wikipedia.org/wiki/Grafika_wektorowa) i [rastrowe](http://pl.wikipedia.org/wiki/Grafika_rastrowa). W przypadku obrazów rastrowych trzeba jeszcze wybrać właściwy format kompresji &ndash; np. GIF, PNG lub JPG.

**Obrazy rastrowe**, do których należą fotografie i inne grafiki, mają postać siatki osobnych kropek (pikseli). Zwykle pochodzą z aparatu lub skanera. Można też utworzyć je w przeglądarce, korzystając z elementu `canvas`. Wraz z powiększaniem się obrazu wzrasta wielkość pliku. Obraz przeskalowany do większego rozmiaru niż pierwotny staje się rozmazany, bo przeglądarka musi zgadywać, jak wypełnić brakujące piksele.

**Obrazy wektorowe**, do których należą logo i rysunki kreskowe, składają się z zestawu linii, krzywych, kształtów i kolorów wypełnienia. Powstają w takich programach jak Adobe Illustrator lub Inkscape i są zapisywane w formacie wektorowym, np. [SVG](http://css-tricks.com/using-svg/). Obrazy wektorowe tworzy się z prostych elementów, dlatego można je skalować bez straty jakości i zmiany rozmiaru pliku.

Przy wyborze właściwego formatu musisz rozważyć zarówno rodzaj obrazu (rastrowy lub wektorowy), jak i jego treść (kolory, animacja, tekst itp.). Każdy format pasuje tylko do niektórych rodzajów obrazów oraz ma swoje zalety i wady.

Podczas wybierania formatu postępuj zgodnie z tymi wskazówkami:

* Przy fotografiach użyj JPG.
* Przy grafikach wektorowych i zawierających jednolite kolory (np. logo i rysunki kreskowe) użyj SVG.
 Jeśli grafika wektorowa jest niedostępna, skorzystaj z WebP lub PNG.
* Zamiast formatu GIF użyj PNG, który pozwala zastosować więcej kolorów i ma lepsze współczynniki kompresji.
* Przy dłuższych animacjach użyj tagu `<video>`, który daje wyższą jakość obrazu i pozwala użytkownikowi sterować odtwarzaniem.

## Zmniejszanie rozmiaru pliku

Plik można znacznie zmniejszyć, przetwarzając go po zapisaniu. Jest wiele narzędzi do kompresji obrazów &ndash; stratnej lub bezstratnej, online, z interfejsem graficznym, wierszem polecenia itp. W miarę możliwości najlepiej zautomatyzować optymalizację obrazów, by stała się uniwersalnym etapem procesu tworzenia.

Niektóre dostępne narzędzia wykonują dodatkową, bezstratną kompresję plików JPG i PNG, bez wpływu na jakość obrazu. W przypadku JPG wypróbuj [jpegtran](http://jpegclub.org/) lub [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (dostępny tylko na Linuksa, uruchamiany z opcją --strip-all). W przypadku PNG wypróbuj [OptiPNG](http://optipng.sourceforge.net/) lub [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

## Korzystanie ze sprite`ów graficznych

Spriting CSS to technika, w której wiele obrazów łączy się w jeden obraz `arkusza sprite`ów`. Aby następnie wybrać konkretną grafikę, trzeba określić obraz tła elementu (arkusz sprite`ów) i przesunięcie wskazujące właściwą część.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="Arkusz sprite'ów graficznych użyty jako przykład"></a>
<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-sprite.html" region_tag="sprite" lang=css %}
</pre>

Zaletą spritingu jest obniżenie liczby plików pobieranych przy wyświetlaniu wielu obrazów, bez utrudniania zapisu w pamięci podręcznej.

## Stosowanie leniwego wczytywania

Leniwe wczytywanie może znacznie przyspieszyć wyświetlanie długich stron, które w części widocznej po przewinięciu zawierają wiele obrazów. Obrazy te wczytują się w razie potrzeby lub po zakończeniu wczytywania i renderowania głównych treści. Oprócz podnoszenia wydajności leniwe wczytywanie pozwala tworzyć strony o nieograniczonej długości.

Podczas tworzenia takich stron zachowaj jednak ostrożność, bo wyszukiwarki mogą nie wykryć treści, które wczytują się dopiero po przewinięciu. Podobnie użytkownicy szukający informacji, które zwykle są w stopce, nigdy jej nie zobaczą, bo zawsze będą wczytywać się nowe treści.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




