project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ułatwienia dostępu to nie dodatkowa funkcja.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Ułatwienia dostępu są ważne {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Ułatwienia dostępu to nie dodatkowa funkcja. Użytkownicy, którzy nie widzą lub nie słyszą, potrzebują opisów głosowych lub napisów, by zapoznać się z filmem. Koszt w postaci czasu poświęconego na dodanie tych elementów do filmu jest znacznie mniejszy niż negatywne skutki niezadowolenia użytkowników. Wszyscy użytkownicy powinni mieć dostęp przynajmniej do podstawowych elementów strony.




## Dodawanie napisów ułatwiających dostęp

Aby poprawić dostępność multimediów na urządzeniach mobilnych, dodaj napisy i opisy, korzystając z elementu track.

<!-- TODO: Verify note type! -->
Note: Element track działa w Chrome na Androida, Safari na iOS i wszystkich współczesnych przeglądarkach na komputerach z wyjątkiem Firefoksa (zobacz na <a href='http://caniuse.com/track' title='Stan obsługi elementu track'>caniuse.com/track</a>). Jest też dostępnych kilka rozwiązań polyfill. Zalecamy <a href='//www.delphiki.com/html5/playr/' title='Polyfill elementu track Playr'>Playr</a> i <a href='//captionatorjs.com/' title='Element track Captionator'>Captionator</a>.

Tak wyglądają napisy z elementu track:

 <img class="center" alt="Zrzut ekranu z napisami z elementu track w Chrome na Androida" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Dodawanie elementu track

Do swojego filmu możesz bardzo łatwo dodać napisy &ndash; wystarczy dołączyć element track jako podrzędny elementu video:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

Atrybut `src` elementu track wskazuje lokalizację pliku ścieżki.

## Definiowanie napisów w pliku ścieżki

Plik ścieżki zawiera teksty z sygnaturą czasową w formacie WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Mężczyzna siedzi na gałęzi drzewa i korzysta z laptopa.

    00:05.000 --> 00:08.000
    Gałąź się łamie i mężczyzna zaczyna spadać.

    ...



