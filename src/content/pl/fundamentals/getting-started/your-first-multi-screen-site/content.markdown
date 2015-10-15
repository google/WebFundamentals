---
title: "Tworzenie treści i struktury"
description: "Treści to najważniejszy element każdej witryny. W tym przewodniku pokazujemy, jak w prosty sposób zaplanować budowę swojej pierwszej witryny działającej na różnych urządzeniach."
notes:
  styling:
    - Stylizacja przyjdzie później
updated_on: 2014-04-23
related-guides:
  create-amazing-forms:
    -
      title: Tworzenie świetnych formularzy
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Formularze"
        href: fundamentals/input/form/
    -
      title: Nadawanie prawidłowych etykiet i nazw elementom wejściowym
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Formularze"
        href: fundamentals/input/form/
    -
      title: Wybór najlepszego typu elementu wejściowego
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Formularze"
        href: fundamentals/input/form/
  video:
    -
      title: Skuteczne korzystanie z filmów
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Wideo"
        href: fundamentals/media/
    -
      title: Zmiana pozycji początkowej
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Wideo"
        href: fundamentals/media/
    -
      title: Dołączanie obrazu plakatu
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Wideo"
        href: fundamentals/media/
  images:
    -
      title: Skuteczne korzystanie z obrazów
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Obrazy"
        href: fundamentals/media/
    -
      title:  Prawidłowe umieszczanie obrazów w znacznikach
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Obrazy"
        href: fundamentals/media/
    -
      title: Optymalizacja obrazów
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Obrazy"
        href: fundamentals/media/
key-takeaways:
  content-critical:
    - "Najpierw ustal, jakich treści potrzebujesz."
    - "Naszkicuj architekturę informacji (AI) w obszarze wąskim i szerokim."
    - "Utwórz schematyczny widok strony z zawartością, ale bez stylów."
---

<p class="intro">
  Treści to najważniejszy element każdej witryny. Nasz projekt przygotujemy pod ich kątem oraz zadbamy, by układ witryny nie wpływał na jej zawartość. W tym przewodniku najpierw określimy potrzebne treści, na ich podstawie opracujemy strukturę stron, a potem zaprezentujemy stronę w prostym układzie liniowym, która dobrze wygląda zarówno w wąskim, jak i w szerokim widocznym obszarze.
</p>

{% include shared/toc.liquid %}

## Tworzenie struktury strony

Ustaliliśmy, że potrzebujemy tych elementów:

1.  Obszar z ogólnym opisem oferowanego przez nas kursu `CS256 Tworzenie witryn mobilnych`
2.  Formularz do zbierania informacji od użytkowników zainteresowanych kursem
3.  Dokładny opis i film
4.  Obrazy przedstawiające kurs w praktyce
5.  Tabelę danych, które potwierdzają, że warto odbyć kurs

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Opracowaliśmy też wstępną architekturę informacji oraz układy w wąskim i szerokim widocznym obszarze.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="AI w obszarze wąskim">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="AI w obszarze szerokim">
</div>

To wszystko można łatwo przekształcić w główne sekcje schematycznej strony, której będziemy używać w tym projekcie.

{% include_code src=_code/addstructure.html snippet=structure %}

## Dodawanie treści do strony

Podstawowa struktura witryny jest gotowa. Wiemy już, jakie sekcje są potrzebne, co się w nich znajdzie i gdzie umieścimy je w ogólnej architekturze informacji. Możemy zacząć tworzenie witryny.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Tworzenie nagłówka i formularza

Nagłówek i formularz kontaktowy to kluczowe komponenty strony. Użytkownik musi od razu je widzieć.

W nagłówku umieść prosty tekst z opisem kursu:

{% include_code src=_code/addheadline.html snippet=headline %}

Musimy też utworzyć formularz.
Będzie on prosty &ndash; pozwoli użytkownikowi podać imię i nazwisko, numer telefonu oraz dogodny termin, w którym możemy zadzwonić.

Wszystkie formularze powinny mieć etykiety i elementy zastępcze, które pomagają użytkownikom ustawić fokus i zorientować się, jakie dane należy podać, a narzędziom ułatwiającym dostęp &ndash; poznać strukturę formularza. Atrybut name nie tylko przesyła wartość z formularza na serwer, ale też daje ważne wskazówki przeglądarce, jak automatycznie wypełnić formularz za użytkownika.

Dodamy typy semantyczne, by przyspieszyć i uprościć wpisywanie wartości przez użytkowników urządzeń mobilnych. Na przykład podczas podawania numeru telefonu użytkownikowi powinna wyświetlić się klawiatura numeryczna.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Tworzenie sekcji z filmem i informacjami

Sekcja z filmem i informacjami będzie zawierać nieco bardziej szczegółowe treści.
Znajdą się tam lista punktowana z zaletami naszej usługi oraz element zastępczy filmu pokazującego korzyści, jakie odniesie użytkownik.

{% include_code src=_code/addcontent.html snippet=section1 %}

Filmy często wykorzystuje się do przedstawienia treści w bardziej interaktywny sposób oraz zaprezentowania produktu lub pomysłu.

Aby bez problemów umieścić film na stronie, postępuj zgodnie ze sprawdzonymi metodami:

*  Dodaj atrybut `controls`, by ułatwić użytkownikom odtwarzanie filmu.
*  Dodaj obraz `poster`, na którym widzowie zobaczą podgląd treści.
*  Dodaj wiele elementów `<source>` w zależności od obsługiwanych formatów wideo.
*  Dodaj tekst zastępczy, który pozwoli użytkownikom pobrać film, jeśli nie będą mogli odtworzyć go w oknie.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Tworzenie sekcji z obrazami

Witryny pozbawione grafiki mogą trochę nudzić. Na stronach występują dwa typy obrazów:

*  Obrazy treści &ndash; są częścią dokumentu i zawierają dodatkowe informacje związane z jego treścią.
*  Obrazy stylistyczne &ndash; poprawiają wygląd strony. Należą do nich obrazy tła, wzory i gradienty. Omówimy je w [następnym artykule]({{page.nextPage.relative_url}}).

Sekcja z obrazami na naszej stronie to kolekcja obrazów treści.

Obrazy treści odgrywają kluczową rolę w przekazywaniu sensu strony. Potraktuj je jak zdjęcia umieszczane w artykułach w gazecie. Grafiki, których użyjemy, to zdjęcia osób prowadzących kurs &ndash; Chrisa Wilsona, Petera Lubbersa i Seana Benneta.

{% include_code src=_code/addimages.html snippet=images lang=html %}

Ustawiliśmy skalowanie obrazów do 100% szerokości ekranu. Takie rozwiązanie działa dobrze na urządzeniach z wąskim widocznym obszarem, ale gorzej na tych z obszarem szerokim (np. na komputerach). Zajmiemy się tym w artykule o projektowaniu elastycznym.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Wiele osób nie może oglądać obrazów i często korzysta z takich technologii wspomagających jak czytnik ekranu, który analizuje dane na stronie i przekazuje je użytkownikowi głosowo. Musisz upewnić się, że wszystkie obrazy treści mają opisowy tag `alt`, którego zawartość czytnik ekranu będzie mógł na głos odczytać użytkownikowi.

Przy dodawaniu tagów `alt` postaraj się, by tekst tagu był jak najbardziej zwięzły i w pełni opisywał obraz. W naszym przykładzie atrybut ma format `Imię i nazwisko: rola`. To dość informacji, by użytkownik zrozumiał, że sekcja jest poświęcona autorom i ich pracy.

### Dodawanie sekcji z tabelą danych

Ostatnia sekcja to prosta tabela z konkretnymi statystykami związanymi z naszą usługą.

W tabelach umieszczaj tylko dane tabelaryczne, tzn. zestawy informacji w wierszach i kolumnach.

{% include_code src=_code/addcontent.html snippet=section3 %}

### Dodawanie stopki

Stopka na większości stron zawiera takie informacje jak warunki korzystania z usługi, wyłączenia odpowiedzialności i inne, które nie należą do głównych elementów nawigacyjnych ani podstawowego obszaru treści strony.

Na naszej stronie podamy tylko linki do warunków korzystania z usługi, strony kontaktowej oraz profilów w mediach społecznościowych.

{% include_code src=_code/addcontent.html snippet=footer %}

## Podsumowanie

Utworzyliśmy szkic strony i określiliśmy poszczególne główne elementy struktury. Przygotowaliśmy i rozmieściliśmy wszystkie odpowiednie treści zgodnie z naszymi celami biznesowymi.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="zawartość">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Na razie strona wygląda fatalnie, ale to celowe. 
Treści to najważniejszy element każdej witryny. Po nich należy opracować właściwą architekturę informacji i układ elementów. Ten przewodnik pozwolił nam stworzyć solidną podstawę do dalszej rozbudowy witryny. W następnym dodamy style do treści.



