project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Internet jest dostępny na szerokiej gamie urządzeń &ndash; od telefonów z małymi ekranami aż po ogromne telewizory. Przeczytaj, jak stworzyć witrynę, która dobrze działa na wszystkich tych urządzeniach.

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Pierwsza witryna na różne urządzenia {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



Tworzenie interfejsów działających na różnych urządzeniach nie jest tak trudne, jak się wydaje. W tym przewodniku stworzymy przykładową stronę docelową o usłudze (<a href='https://www.udacity.com/course/mobile-web-development--cs256'>kursie CS256 Tworzenie witryn mobilnych</a>) działającą bez problemów na wszystkich rodzajach urządzeń.

<img src="images/finaloutput-2x.jpg" alt="różne urządzenia z ostateczną wersją projektu">

Budowanie stron z myślą o wielu urządzeniach z różnymi możliwościami, rozmiarami ekranów i metodami interakcji może sprawiać wrażenie zadania wymagającego, a nawet niemożliwego.

Tworzenie w pełni elastycznych witryn nie jest jednak tak trudne, jak sądzisz &ndash; przekonasz się o tym, wykonując pierwsze kroki z tego przewodnika. Podzieliliśmy go na dwa proste etapy:

1.  Definiowanie architektury informacji (zwykle określanej jako AI) oraz struktury strony. 2.  Dodawanie elementów wizualnych, by strona była elastyczna i dobrze wyglądała na wszystkich urządzeniach.




## Tworzenie treści i struktury 




Treści to najważniejszy element każdej witryny. Nasz projekt przygotujemy pod ich kątem oraz zadbamy, by układ witryny nie wpływał na jej zawartość. W tym przewodniku najpierw określimy potrzebne treści, na ich podstawie opracujemy strukturę stron, a potem zaprezentujemy stronę w prostym układzie liniowym, która dobrze wygląda zarówno w wąskim, jak i w szerokim widocznym obszarze.


### Tworzenie struktury strony

Ustaliliśmy, że potrzebujemy tych elementów:

1.  Obszar z ogólnym opisem oferowanego przez nas kursu `CS256 Tworzenie witryn mobilnych`
2.  Formularz do zbierania informacji od użytkowników zainteresowanych kursem
3.  Dokładny opis i film
4.  Obrazy przedstawiające kurs w praktyce
5.  Tabelę danych, które potwierdzają, że warto odbyć kurs

### TL;DR {: .hide-from-toc }
- Najpierw ustal, jakich treści potrzebujesz.
- Naszkicuj architekturę informacji (AI) w obszarze wąskim i szerokim.
- Utwórz schematyczny widok strony z zawartością, ale bez stylów.


Opracowaliśmy też wstępną architekturę informacji oraz układy w wąskim i szerokim widocznym obszarze.

<img class="attempt-left" src="images/narrowviewport.png" alt="AI w obszarze wąskim">
<img  class="attempt-right" src="images/wideviewport.png" alt="AI w obszarze szerokim">
<div class="clearfix"></div>

To wszystko można łatwo przekształcić w główne sekcje schematycznej strony, której będziemy używać w tym projekcie.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### Dodawanie treści do strony

Podstawowa struktura witryny jest gotowa. Wiemy już, jakie sekcje są potrzebne, co się w nich znajdzie i gdzie umieścimy je w ogólnej architekturze informacji. Możemy zacząć tworzenie witryny.

Note: Stylizacja przyjdzie później

#### Tworzenie nagłówka i formularza

Nagłówek i formularz kontaktowy to kluczowe komponenty strony. Użytkownik musi od razu je widzieć.

W nagłówku umieść prosty tekst z opisem kursu:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

Musimy też utworzyć formularz.
Będzie on prosty &ndash; pozwoli użytkownikowi podać imię i nazwisko, numer telefonu oraz dogodny termin, w którym możemy zadzwonić.

Wszystkie formularze powinny mieć etykiety i elementy zastępcze, które pomagają użytkownikom ustawić fokus i zorientować się, jakie dane należy podać, a narzędziom ułatwiającym dostęp &ndash; poznać strukturę formularza. Atrybut name nie tylko przesyła wartość z formularza na serwer, ale też daje ważne wskazówki przeglądarce, jak automatycznie wypełnić formularz za użytkownika.

Dodamy typy semantyczne, by przyspieszyć i uprościć wpisywanie wartości przez użytkowników urządzeń mobilnych. Na przykład podczas podawania numeru telefonu użytkownikowi powinna wyświetlić się klawiatura numeryczna.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Tworzenie sekcji z filmem i informacjami

Sekcja z filmem i informacjami będzie zawierać nieco bardziej szczegółowe treści.
Znajdą się tam lista punktowana z zaletami naszej usługi oraz element zastępczy filmu pokazującego korzyści, jakie odniesie użytkownik.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

Filmy często wykorzystuje się do przedstawienia treści w bardziej interaktywny sposób oraz zaprezentowania produktu lub pomysłu.

Aby bez problemów umieścić film na stronie, postępuj zgodnie ze sprawdzonymi metodami:

*  Dodaj atrybut `controls`, by ułatwić użytkownikom odtwarzanie filmu.
*  Dodaj obraz `poster`, na którym widzowie zobaczą podgląd treści.
*  Dodaj wiele elementów `<source>` w zależności od obsługiwanych formatów wideo.
*  Dodaj tekst zastępczy, który pozwoli użytkownikom pobrać film, jeśli nie będą mogli odtworzyć go w oknie.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Tworzenie sekcji z obrazami

Witryny pozbawione grafiki mogą trochę nudzić. Na stronach występują dwa typy obrazów:

*  Obrazy treści &ndash; są częścią dokumentu i zawierają dodatkowe informacje związane z jego treścią.
*  Obrazy stylistyczne &ndash; poprawiają wygląd strony. Należą do nich obrazy tła, wzory i gradienty. Omówimy je w [następnym artykule](#).

Sekcja z obrazami na naszej stronie to kolekcja obrazów treści.

Obrazy treści odgrywają kluczową rolę w przekazywaniu sensu strony. Potraktuj je jak zdjęcia umieszczane w artykułach w gazecie. Grafiki, których użyjemy, to zdjęcia osób prowadzących kurs &ndash; Chrisa Wilsona, Petera Lubbersa i Seana Benneta.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

Ustawiliśmy skalowanie obrazów do 100% szerokości ekranu. Takie rozwiązanie działa dobrze na urządzeniach z wąskim widocznym obszarem, ale gorzej na tych z obszarem szerokim (np. na komputerach). Zajmiemy się tym w artykule o projektowaniu elastycznym.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Wiele osób nie może oglądać obrazów i często korzysta z takich technologii wspomagających jak czytnik ekranu, który analizuje dane na stronie i przekazuje je użytkownikowi głosowo. Musisz upewnić się, że wszystkie obrazy treści mają opisowy tag `alt`, którego zawartość czytnik ekranu będzie mógł na głos odczytać użytkownikowi.

Przy dodawaniu tagów `alt` postaraj się, by tekst tagu był jak najbardziej zwięzły i w pełni opisywał obraz. W naszym przykładzie atrybut ma format `Imię i nazwisko: rola`. To dość informacji, by użytkownik zrozumiał, że sekcja jest poświęcona autorom i ich pracy.

#### Dodawanie sekcji z tabelą danych

Ostatnia sekcja to prosta tabela z konkretnymi statystykami związanymi z naszą usługą.

W tabelach umieszczaj tylko dane tabelaryczne, tzn. zestawy informacji w wierszach i kolumnach.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### Dodawanie stopki

Stopka na większości stron zawiera takie informacje jak warunki korzystania z usługi, wyłączenia odpowiedzialności i inne, które nie należą do głównych elementów nawigacyjnych ani podstawowego obszaru treści strony.

Na naszej stronie podamy tylko linki do warunków korzystania z usługi, strony kontaktowej oraz profilów w mediach społecznościowych.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### Podsumowanie

Utworzyliśmy szkic strony i określiliśmy poszczególne główne elementy struktury. Przygotowaliśmy i rozmieściliśmy wszystkie odpowiednie treści zgodnie z naszymi celami biznesowymi.


<img class="attempt-left" src="images/content.png" alt="zawartość">
<img class="attempt-right" src="images/narrowsite.png" alt="">
<div class="clearfix"></div>


Na razie strona wygląda fatalnie, ale to celowe. 
Treści to najważniejszy element każdej witryny. Po nich należy opracować właściwą architekturę informacji i układ elementów. Ten przewodnik pozwolił nam stworzyć solidną podstawę do dalszej rozbudowy witryny. W następnym dodamy style do treści.





## Nadawanie stronie elastyczności 




Internet jest dostępny na szerokiej gamie urządzeń &ndash; od telefonów z małymi ekranami aż po ogromne telewizory. Każde urządzenie ma własne, unikalne zalety i ograniczenia. Jako programista witryn internetowych musisz postarać się, by działały one na wszystkich rodzajach urządzeń.


Tworzymy witrynę, która działa na ekranach o różnym rozmiarze i wielu rodzajach urządzeń. W [poprzednim artykule](#) opracowaliśmy architekturę informacji na stronie i przygotowaliśmy podstawową strukturę.
W tym przewodniku przekształcimy naszą podstawową strukturę i treść w atrakcyjną stronę, która działa elastycznie na ekranach rozmaitej wielkości.


<figure class="attempt-left">
  <img  src="images/content.png" alt="Treść">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Treść i struktura </a> </figcaption>
</figure>
<figure class="attempt-right">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Gotowa strona </a> </figcaption>
</figure>
<div class="clearfix"></div>


Zgodnie z zasadą `najpierw mobilne` zaczynamy od wąskiego widocznego obszaru (takiego jak na telefonach komórkowych) i budujemy dostosowany do niego interfejs.
Następnie skalujemy stronę na potrzeby większych urządzeń.
Stopniowo poszerzamy widoczny obszar, jednocześnie oceniając, czy projekt i układ wyglądają poprawnie.

Wcześniej zaprojektowaliśmy dwa ogólne sposoby prezentacji naszych treści. Teraz tak dopracujemy stronę, by odpowiednio wyświetlała się w obu tych różnych układach.
Sprawdzimy, jak treści pasują do rozmiaru ekranu, i we właściwy sposób rozmieścimy punkty graniczne &ndash; czyli takie, w których układ i style się zmieniają.

### TL;DR {: .hide-from-toc }
- Zawsze używaj tagu viewport.
- Zawsze zaczynaj od wąskiego widocznego obszaru i zwiększaj skalę.
- Gdy musisz dostosować wygląd treści, ustaw odpowiednio punkty graniczne.
- Stwórz ogólną wizję układu strony obejmującą główne punkty graniczne.


### Dodaj viewport

Nawet do prostej strony zawsze **musisz** dodać metatag viewport.
To najważniejszy komponent przy tworzeniu interfejsów działających na różnych rodzajach urządzeń.
Bez niego witryna nie będzie dobrze działać na urządzeniach mobilnych.

Tag viewport informuje przeglądarkę, że stronę trzeba przeskalować, dopasowując do rozmiarów ekranu. Jest wiele konfiguracji, które możesz określić w tym tagu, by sterować wyświetlaniem strony. Jako domyślne zalecamy to ustawienie:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

Tag viewport należy do nagłówka dokumentu. Wystarczy zadeklarować go tylko raz.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Zastosuj prostą stylizację 

W naszej firmie i usługach stosujemy konkretne cechy marki i parametry czcionek określone w przewodniku po stylach.

#### Przewodniku po stylach 

Przewodnik po stylach pozwala ogólnie zapoznać się ze stylistyką stron i zadbać o jej spójność w całym projekcie.

##### Kolory

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Dodaj obrazy stylistyczne 

W poprzednim przewodniku dodaliśmy `obrazy treści`, czyli grafiki, które zawierają ważne informacje o naszej usłudze. Obrazy stylistyczne nie są niezbędną częścią głównych treści, ale tworzą oprawę wizualną i pomagają skierować uwagę użytkownika na konkretne informacje.

Dobry przykład to grafika w nagłówku ilustrująca treści widoczne na ekranie po wejściu na stronę. Często zachęca użytkownika, by dowiedział się więcej o usłudze.


<img  src="images/narrowsite.png" alt="Zaprojektowana strona">


Dodawanie takich obrazów jest bardzo łatwe. My na przykład umieścimy tło w nagłówku, używając do tego stylu CSS.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Wybraliśmy prosty obraz tła, który jest rozmazany, by nie odwracał uwagi od treści. Ustawienie rozmiaru to `cover`, dzięki czemu grafika zawsze rozciąga się na cały widok, zachowując prawidłowy współczynnik proporcji.

<br style="clear: both;">

### Ustaw swój pierwszy punkt graniczny 

Projekt zaczyna wyglądać źle przy szerokości około 600&nbsp;pikseli. W naszym przypadku długość wiersza przekracza wtedy dziesięć wyrazów (optymalna długość podczas czytania), dlatego w tym punkcie wprowadzimy zmiany.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/firstbreakpoint.mov">Pobierz go</a>.
  </p>
</video>

600&nbsp;pikseli to dobre miejsce na pierwszy punkt graniczny, który pozwala nam zmienić położenie elementów, by lepiej pasowały do ekranu. Możemy do tego użyć technologii nazywanej [zapytaniami o media](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Dzięki swoim rozmiarom większy ekran daje więcej swobody przy wyborze sposobu prezentowania treści.

Note: Nie musisz przesuwać wszystkich elementów jednocześnie. W razie potrzeby możesz wprowadzać mniejsze poprawki.

W kontekście naszej strony o usłudze musimy wykonać te czynności:

*  Ograniczyć maksymalną szerokość projektu.
*  Zmienić odstępy między elementami i zmniejszyć rozmiar tekstu.
*  Przenieść formularz na ten sam poziom co treść w nagłówku.
*  Przesunąć film, tak by znalazł się obok informacji.
*  Zmniejszyć rozmiar obrazów i ładnie je ułożyć.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### Ograniczyć maksymalną szerokość projektu

Zdecydowaliśmy się przygotować tylko dwa główne układy &ndash; obszar wąski i szeroki, co znacznie upraszcza proces tworzenia.

Postanowiliśmy też utworzyć sekcje sięgające samej krawędzi zarówno w wąskim, jak i w szerokim widocznym obszarze. To oznacza, że musimy ograniczyć maksymalną szerokość ekranu, by tekst i akapity nie rozciągnęły się na bardzo szerokich ekranach w pojedyncze, długie wiersze. Będzie ona wynosić około 800&nbsp;pikseli.

Aby to osiągnąć, ograniczymy szerokość elementów i wyśrodkujemy je. Musimy utworzyć kontener wokół każdej głównej sekcji i zastosować parametr `margin: 
auto`. Dzięki temu nawet na większym ekranie treści pozostaną wyśrodkowane, a ich rozmiar nie przekroczy 800&nbsp;pikseli.

Kontenerem będzie prosty element "div" w tej postaci:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### Zmiana odstępów i zmniejszanie rozmiaru tekstu

Obszar wąski oferuje niewiele miejsca na wyświetlanie treści, więc czcionka często ma bardzo mały rozmiar i grubość, by pasowała do ekranu.

Przy szerszym widocznym obszarze trzeba wziąć pod uwagę to, że użytkownik jest dalej od ekranu. Aby poprawić czytelność treści, możemy zwiększyć rozmiar i grubość czcionki oraz zmienić odstępy, by poszczególne obszary bardziej się wyróżniały.

Na naszej stronie o usłudze powiększymy odstępy między sekcjami, ustawiając je na 5% szerokości. Zwiększymy też rozmiar nagłówka każdej sekcji.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Dostosowywanie elementów do szerokiego widocznego obszaru

W wąskim widocznym obszarze elementy wyświetlają się w linii, jeden nad drugim. Każda główna sekcja i znajdujące się w niej treści są ułożone kolejno od góry do dołu.

Obszar szeroki zawiera dodatkowe miejsce, które można wykorzystać do optymalnego zaprezentowania treści na ekranie. To w przypadku naszej strony o usłudze oznacza, że zgodnie z AI możemy:

*  Przesunąć formularz, tak by znalazł się obok informacji w nagłówku.
*  Umieścić film na prawo od najważniejszych punktów.
*  Ułożyć obrazy obok siebie.
*  Poszerzyć tabelę.

#### Przenoszenie elementu z formularzem

Wąski widoczny obszar oznacza, że mamy znacznie mniej dostępnego miejsca w poziomie, by swobodnie ułożyć elementy na ekranie.

Aby skuteczniej wykorzystać tę przestrzeń, musimy zrezygnować z liniowego położenia nagłówka i umieścić formularz obok listy informacji.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/floatingform.mov">Pobierz go</a>.
  </p>
</video>

#### Przenoszenie elementu z filmem

Film w interfejsie z wąskim widocznym obszarem ma pełną szerokość ekranu i wyświetla się pod listą głównych zalet usługi. W obszarze szerokim przeskalowany film stanie się zbyt duży i będzie źle wyglądał poniżej listy.

Na szerszym ekranie element z filmem trzeba usunąć z pionowego układu obszaru wąskiego i umieścić obok listy punktowanej.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### Układanie obrazów obok siebie

Obrazy w interfejsie z wąskim widocznym obszarem (najczęściej na urządzeniach mobilnych) mają pełną szerokość ekranu i są ułożone w pionie. Po przeskalowaniu do obszaru szerokiego nie wyglądają dobrze.

Aby poprawić ich wygląd w szerokim widocznym obszarze, przeskalujemy je do 30% szerokości kontenera i ułożymy w poziomie (zamiast w pionie jak w wąskim widocznym obszarze). Zaokrąglimy też ich obramowanie i dodamy cień, by prezentowały się ciekawiej.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Dopasowywanie obrazów do liczby DPI

Jeśli korzystasz z obrazów, weź pod uwagę rozmiar widocznego obszaru i gęstość wyświetlacza.

Dawniej strony internetowe były przeznaczone na ekrany o gęstości 96&nbsp;dpi. Wraz z pojawieniem się urządzeń mobilnych znacznie wzrosła gęstość pikseli na ekranach (nie wspominając o wyświetlaczach klasy Retina w laptopach). W efekcie obrazy zakodowane na 96&nbsp;dpi często wyglądają fatalnie na urządzeniach z większą liczbą DPI.

Mamy na to rozwiązanie, które nie jest jeszcze powszechnie stosowane.
W przeglądarkach, które mają tę funkcję, na wyświetlaczu o wysokiej gęstości można pokazywać odpowiednio dostosowane obrazy.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tabele

Tabele bardzo trudno przedstawić prawidłowo na urządzeniach z wąskim widocznym obszarem, dlatego trzeba dobrze je zaplanować.

W takiej sytuacji zalecamy przekształcenie tabeli w dwie kolumny oraz przeniesienie nagłówków i komórek do kolejnych wierszy, by uzyskać układ pionowy.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/responsivetable.mov">Pobierz go</a>.
  </p>
</video>

Na naszej stronie utworzymy dodatkowy punkt graniczny specjalnie na potrzeby tabeli.
Gdy najpierw tworzysz wersję na urządzenia mobilne, trudniej jest cofnąć zastosowane style, dlatego musimy wyłączyć style CSS tabeli w obszarze wąskim ze stylów CSS w obszarze szerokim.
Dzięki temu uzyskamy wyraźny i spójny punkt graniczny.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### Podsumowanie

**GRATULACJE.** Skoro to czytasz, Twoja pierwsza prosta strona docelowa o usłudze jest już gotowa i działa na szerokiej gamie urządzeń bez względu na rozmiary i kształt ekranu.

Na początek zawsze warto postępować zgodnie z tymi wskazówkami:

1.  Zanim zaczniesz pisać kod, stwórz prostą AI i zapoznaj się ze strukturą treści.
2.  Pamiętaj, by ustawić tag viewport.
3.  Utwórz podstawowy interfejs zgodnie z zasadą `najpierw strona mobilna`.
4.  Po przygotowaniu interfejsu na urządzenia mobilne zwiększaj szerokość wyświetlania, aż strona przestanie dobrze wyglądać. W tym miejscu dodaj punkt graniczny.
5.  W razie potrzeby kontynuuj te czynności.



