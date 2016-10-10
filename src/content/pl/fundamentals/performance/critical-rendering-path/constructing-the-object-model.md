project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Zanim przeglądarka zacznie renderować treść na ekranie, musi utworzyć drzewa DOM i CSSOM. Dlatego musimy dopilnować, by znaczniki HTML i CSS zostały przekazane do przeglądarki możliwie najszybciej.


{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Tworzenie modelu obiektowego {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Zanim przeglądarka zacznie renderować stronę, musi utworzyć drzewa DOM i CSSOM. Dlatego musimy dopilnować, by znaczniki HTML i CSS zostały przekazane do przeglądarki możliwie najszybciej.



## Model DOM (Document Object Model)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Zacznijmy od najprostszego możliwego przypadku: zwykłej strony HTML z tekstem i jednym obrazem. Co musi zrobić przeglądarka, by przetworzyć tę prostą stronę?

<img src="images/full-process.png" alt="Proces tworzenia modelu DOM">

1. **Konwersja:** przeglądarka odczytuje nieprzetworzone bajty znaczników HTML z dysku lub przez sieć i zamienia je na znaki, uwzględniając podane kodowanie pliku (np. UTF-8).
1. **Tokenizacja:** przeglądarka zamienia łańcuchy znaków na odrębne tokeny określone [standardem HTML5 organizacji W3C](http://www.w3.org/TR/html5/){: .external } &ndash; np. "<html>", "<body>", jak również inne łańcuchy obecne w nawiasach trójkątnych. Każdy token ma specjalne znaczenie i opisuje go pewien zestaw reguł.
1. **Analiza leksykalna:** wyznaczone tokeny są przekształcane w obiekty z określonymi właściwościami i regułami.
1. **Tworzenie modelu DOM:** ponieważ znaczniki HTML określa związki pomiędzy różnymi tagami (niektóre tagi obejmują inne tagi), utworzone obiekty są łączone w drzewiastą strukturę danych odzwierciedlającą zależności pomiędzy elementami nadrzędnymi i podrzędnymi określonymi w pierwotnym kodzie: obiekt _HTML_ jest elementem nadrzędnym obiektu _body_, obiekt _body_ jest elementem nadrzędnym obiektu _paragraph_ i tak dalej.

<img src="images/dom-tree.png" class="center" alt="Drzewo DOM">

**Efektem końcowym całej tej procedury jest obiektowy model dokumentu lub model DOM (Document Object Model) naszej prostej strony, wykorzystywany przez przeglądarkę w kolejnych krokach przetwarzania strony.**

Zawsze gdy przeglądarka przetwarza znaczniki HTML, musi wykonać wszystkie powyższe kroki: konwersja bajtów na znaki, identyfikacja tokenów, konwersja tokenów na węzły i utworzenie drzewa DOM. Procedura ta może zająć trochę czasu, zwłaszcza jeśli do przetworzenia jest wiele znaczników HTML.

<img src="images/dom-timeline.png" class="center" alt="Śledzenie tworzenia modelu DOM w narzędziach DevTools">

Note: Zakładamy, że dysponujesz podstawową znajomością Narzędzi Chrome dla programistów &ndash; tzn. umiesz przechwycić wykres działania sieci i zapisać oś czasu. Jeśli potrzebujesz szybkiego przypomnienia, zapoznaj się z <a href='https://developer.chrome.com/devtools'>dokumentacją Narzędzi Chrome dla programistów</a>, a jeśli dopiero chcesz je poznać, skorzystaj z kursu <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> (Odkryj Narzędzia dla programistów) w szkole kodowania.

Po otworzeniu Narzędzi Chrome dla programistów i zapisaniu osi czasu wczytywania strony można przeanalizować rzeczywisty czas wymagany do wykonania tego kroku &ndash; w powyższym przykładzie przekształcenie zestawu bajtów znaczników HTML na drzewo DOM zajęło ok. 5 ms. Oczywiście jeśli strona będzie miała większą objętość, jak w przypadku większości stron, ta procedura potrwa znacznie dłużej. W kolejnych rozdziałach opisujących tworzenie płynnych animacji zauważysz, że przetwarzanie dużych ilości znaczników HTML może stanowić wąskie gardło.

Czy po przygotowaniu drzewa DOM mamy dostatecznie wiele informacji, by zrenderować stronę na ekranie? Jeszcze nie! Drzewo DOM przedstawia właściwości i zależności opisane w kodzie dokumentu, ale nie zawiera żadnych informacji o wyglądzie renderowanych elementów. Za wygląd odpowiada model CSSOM, którym zaraz się zajmiemy.

## Obiektowy model CSS (CSSOM)

Gdy przeglądarka tworzyła model DOM naszej prostej strony, napotkała w sekcji nagłówka dokumentu na tag linka odwołujący się do zewnętrznego arkusza stylów CSS: style.css. Przewidując, że zasób ten będzie wymagany do renderowania strony, natychmiast wysłała żądanie odnośnie do tego zasobu, a otrzymana odpowiedź zawierała poniższą treść:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

Możemy oczywiście zadeklarować nasze style bezpośrednio w znacznikach HTML (tzn. inline), ale rozdzielenie znaczników CSS od znaczników HTML umożliwia rozdzielenie treści od stylizacji: projektanci mogą pracować nad znacznikami CSS, a programiści mogą się skupić na znacznikach HTML.

Tak jak w przypadku znaczników HTML konieczne jest przekształcenie otrzymanych znaczników CSS w coś, co przeglądarka mogłaby zrozumieć i wykorzystać podczas pracy. Dlatego wykonamy podobne czynności, co w przypadku znaczników HTML:

<img src="images/cssom-construction.png" class="center" alt="Kroki tworzenia modelu CSSOM">

Bajty danych CSS są przekształcane w znaki, a następnie w tokeny i węzły, w końcu łączone w strukturę drzewiastą znaną jako `obiektowy model CSS Object Model` lub w skrócie CSSOM:

<img src="images/cssom-tree.png" class="center" alt="Drzewo CSSOM">

Dlaczego model CSSOM ma strukturę drzewiastą? Przy wyznaczaniu końcowego zestawu stylów dla jakiegokolwiek obiektu na stronie przeglądarka rozpoczyna od najbardziej ogólnej reguły odnoszącej się do danego węzła (np. jeśli jest to element podrzędny elementu body, będą obowiązywać wszystkie style elementu body), a następnie rekursywnie uzupełnia wyznaczone style o bardziej szczegółowe reguły &ndash; tzn. reguły są `dziedziczone w dół`.

Rozważmy to na konkretnym przykładzie &ndash; drzewie CSSOM powyżej. Wszelki tekst pomiędzy tagami _span_ i obecny w obrębie sekcji body będzie miał rozmiar czcionki równy 16 pikseli i kolor czerwony &ndash; dyrektywa rozmiaru czcionki jest dziedziczona w dół przez element span po elemencie body. Jeśli jednak tag span jest elementem podrzędnym tagu paragrafu (p), jego zawartość nie zostanie wyświetlona.

Zwróć uwagę, że powyższe drzewo nie jest kompletnym drzewem CSSOM i zawiera tylko style, które postanowiliśmy nadpisać w naszym arkuszu stylów. Każda przeglądarka zapewnia domyślny zestaw stylów znany jako `style agenta użytkownika` (widoczne jeśli nie wprowadzamy własnych stylów). Nasze style po prostu zastępują te style domyślne (np. [domyślne style przeglądarki IE](http://www.iecss.com/){: .external }). Jeśli przy przeglądaniu za pomocą Narzędzi Chrome dla programistów `wyznaczonych stylów` zastanawiałeś się, skąd się one biorą, teraz już wiesz!

Chcesz wiedzieć, jak długo trwało przetwarzanie CSS? Zapisz oś czasu w narzędziach DevTools i poszukaj zdarzania `Recalculate Style`: inaczej niż w przypadku parsowania DOM oś czasu nie zawiera osobnej pozycji `Parse CSS`, a zamiast tego to jedno zdarzenie obejmuje parsowanie drzewa CSSOM i rekursywne wyznaczanie stylów.

<img src="images/cssom-timeline.png" class="center" alt="Śledzenie tworzenia modelu CSSOM w narzędziach DevTools">

Przetwarzanie naszego trywialnego przykładu arkusza stylów zajęło ok. 0,6 ms i miało wpływ na 8 elementów na stronie -- niezbyt wiele, ale i tak trochę to trwało. Ale gdzie jest tych 8 elementów? Drzewa CSSOM i DOM są strukturami danych niezależnymi od siebie. Okazuje się, że przeglądarka ukrywa przed nami ważny krok. Następnie omówimy drzewo renderowania powstałe z połączenia drzew DOM i CSSOM.



