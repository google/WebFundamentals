project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Treści to najważniejszy element każdej witryny. W tym przewodniku pokazujemy, jak w prosty sposób zaplanować budowę swojej pierwszej witryny działającej na różnych urządzeniach.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Tworzenie treści i struktury {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Treści to najważniejszy element każdej witryny. Nasz projekt przygotujemy pod ich kątem oraz zadbamy, by układ witryny nie wpływał na jej zawartość. W tym przewodniku najpierw określimy potrzebne treści, na ich podstawie opracujemy strukturę stron, a potem zaprezentujemy stronę w prostym układzie liniowym, która dobrze wygląda zarówno w wąskim, jak i w szerokim widocznym obszarze.


## Tworzenie struktury strony

Ustaliliśmy, że potrzebujemy tych elementów:

1.  Obszar z ogólnym opisem oferowanego przez nas kursu `CS256 Tworzenie witryn mobilnych`
2.  Formularz do zbierania informacji od użytkowników zainteresowanych kursem
3.  Dokładny opis i film
4.  Obrazy przedstawiające kurs w praktyce
5.  Tabelę danych, które potwierdzają, że warto odbyć kurs

## TL;DR {: .hide-from-toc }
- 'Najpierw ustal, jakich treści potrzebujesz.'
- Naszkicuj architekturę informacji (AI) w obszarze wąskim i szerokim.
- 'Utwórz schematyczny widok strony z zawartością, ale bez stylów.'


Opracowaliśmy też wstępną architekturę informacji oraz układy w wąskim i szerokim widocznym obszarze.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="AI w obszarze wąskim">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="AI w obszarze szerokim">
</div>

To wszystko można łatwo przekształcić w główne sekcje schematycznej strony, której będziemy używać w tym projekcie.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

## Dodawanie treści do strony

Podstawowa struktura witryny jest gotowa. Wiemy już, jakie sekcje są potrzebne, co się w nich znajdzie i gdzie umieścimy je w ogólnej architekturze informacji. Możemy zacząć tworzenie witryny.

<!-- TODO: Verify note type! -->
Note: Stylizacja przyjdzie później

### Tworzenie nagłówka i formularza

Nagłówek i formularz kontaktowy to kluczowe komponenty strony. Użytkownik musi od razu je widzieć.

W nagłówku umieść prosty tekst z opisem kursu:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

Musimy też utworzyć formularz.
Będzie on prosty &ndash; pozwoli użytkownikowi podać imię i nazwisko, numer telefonu oraz dogodny termin, w którym możemy zadzwonić.

Wszystkie formularze powinny mieć etykiety i elementy zastępcze, które pomagają użytkownikom ustawić fokus i zorientować się, jakie dane należy podać, a narzędziom ułatwiającym dostęp &ndash; poznać strukturę formularza. Atrybut name nie tylko przesyła wartość z formularza na serwer, ale też daje ważne wskazówki przeglądarce, jak automatycznie wypełnić formularz za użytkownika.

Dodamy typy semantyczne, by przyspieszyć i uprościć wpisywanie wartości przez użytkowników urządzeń mobilnych. Na przykład podczas podawania numeru telefonu użytkownikowi powinna wyświetlić się klawiatura numeryczna.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Tworzenie sekcji z filmem i informacjami

Sekcja z filmem i informacjami będzie zawierać nieco bardziej szczegółowe treści.
Znajdą się tam lista punktowana z zaletami naszej usługi oraz element zastępczy filmu pokazującego korzyści, jakie odniesie użytkownik.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Filmy często wykorzystuje się do przedstawienia treści w bardziej interaktywny sposób oraz zaprezentowania produktu lub pomysłu.

Aby bez problemów umieścić film na stronie, postępuj zgodnie ze sprawdzonymi metodami:

*  Dodaj atrybut `controls`, by ułatwić użytkownikom odtwarzanie filmu.
*  Dodaj obraz `poster`, na którym widzowie zobaczą podgląd treści.
*  Dodaj wiele elementów `<source>` w zależności od obsługiwanych formatów wideo.
*  Dodaj tekst zastępczy, który pozwoli użytkownikom pobrać film, jeśli nie będą mogli odtworzyć go w oknie.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Tworzenie sekcji z obrazami

Witryny pozbawione grafiki mogą trochę nudzić. Na stronach występują dwa typy obrazów:

*  Obrazy treści &ndash; są częścią dokumentu i zawierają dodatkowe informacje związane z jego treścią.
*  Obrazy stylistyczne &ndash; poprawiają wygląd strony. Należą do nich obrazy tła, wzory i gradienty. Omówimy je w [następnym artykule]({{page.nextPage.relative_url}}).

Sekcja z obrazami na naszej stronie to kolekcja obrazów treści.

Obrazy treści odgrywają kluczową rolę w przekazywaniu sensu strony. Potraktuj je jak zdjęcia umieszczane w artykułach w gazecie. Grafiki, których użyjemy, to zdjęcia osób prowadzących kurs &ndash; Chrisa Wilsona, Petera Lubbersa i Seana Benneta.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

Ustawiliśmy skalowanie obrazów do 100% szerokości ekranu. Takie rozwiązanie działa dobrze na urządzeniach z wąskim widocznym obszarem, ale gorzej na tych z obszarem szerokim (np. na komputerach). Zajmiemy się tym w artykule o projektowaniu elastycznym.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Wiele osób nie może oglądać obrazów i często korzysta z takich technologii wspomagających jak czytnik ekranu, który analizuje dane na stronie i przekazuje je użytkownikowi głosowo. Musisz upewnić się, że wszystkie obrazy treści mają opisowy tag `alt`, którego zawartość czytnik ekranu będzie mógł na głos odczytać użytkownikowi.

Przy dodawaniu tagów `alt` postaraj się, by tekst tagu był jak najbardziej zwięzły i w pełni opisywał obraz. W naszym przykładzie atrybut ma format `Imię i nazwisko: rola`. To dość informacji, by użytkownik zrozumiał, że sekcja jest poświęcona autorom i ich pracy.

### Dodawanie sekcji z tabelą danych

Ostatnia sekcja to prosta tabela z konkretnymi statystykami związanymi z naszą usługą.

W tabelach umieszczaj tylko dane tabelaryczne, tzn. zestawy informacji w wierszach i kolumnach.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

### Dodawanie stopki

Stopka na większości stron zawiera takie informacje jak warunki korzystania z usługi, wyłączenia odpowiedzialności i inne, które nie należą do głównych elementów nawigacyjnych ani podstawowego obszaru treści strony.

Na naszej stronie podamy tylko linki do warunków korzystania z usługi, strony kontaktowej oraz profilów w mediach społecznościowych.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

## Podsumowanie

Utworzyliśmy szkic strony i określiliśmy poszczególne główne elementy struktury. Przygotowaliśmy i rozmieściliśmy wszystkie odpowiednie treści zgodnie z naszymi celami biznesowymi.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="zawartość">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Na razie strona wygląda fatalnie, ale to celowe. 
Treści to najważniejszy element każdej witryny. Po nich należy opracować właściwą architekturę informacji i układ elementów. Ten przewodnik pozwolił nam stworzyć solidną podstawę do dalszej rozbudowy witryny. W następnym dodamy style do treści.



