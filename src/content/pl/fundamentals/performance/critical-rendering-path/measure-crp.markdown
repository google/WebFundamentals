---
title: "Pomiar krytycznej ścieżki renderowania za pomocą interfejsu Navigation Timing"
description: "Jeśli czegoś nie da się zmierzyć, nie można tego zoptymalizować. Na szczęście interfejs API Navigation Timing zapewnia nam wszystkie narzędzia do pomiarów na każdym etapie krytycznej ścieżki renderowania."
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - "Interfejs Navigation Timing udostępnia sygnatury o wysokiej rozdzielczości czasowej, umożliwiające pomiar krytycznej ścieżki renderowania."
    - "Na różnych etapach krytycznej ścieżki renderowania przeglądarka generuje serię zdarzeń, które można następnie przechwycić."
---
<p class="intro">
  Jeśli czegoś nie da się zmierzyć, nie można tego zoptymalizować. Na szczęście interfejs API Navigation Timing zapewnia nam wszystkie narzędzia do pomiarów na każdym etapie krytycznej ścieżki renderowania.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

Podstawą każdej solidnej strategii optymalizacji wydajności jest poprawny pomiar i dobre narzędzia. Właśnie to zapewnia interfejs API Navigation Timing.

<img src="images/dom-navtiming.png" class="center" alt="Interfejs Navigation Timing">

Każda z etykiet na powyższym diagramie odpowiada sygnaturze czasowej o wysokiej rozdzielczości. Przeglądarka generuje te sygnatury dla każdej wczytywanej strony. W zasadzie przedstawiamy tutaj tylko niewielką część wszystkich sygnatur czasowych &ndash; na razie pomijamy te związane z siecią, ale powrócimy do nich w jednej z następnych lekcji.

Co oznaczają te sygnatury czasowe?

* **domLoading:** jest to sygnatura czasowa, od której rozpoczyna się cały proces &ndash; przeglądarka właśnie ma rozpocząć parsowanie pierwszych odebranych bajtów dokumentu
  HTML.
* **domInteractive:** sygnalizuje moment, w którym przeglądarka kończy parsowanie wszystkich znaczników HTML i tworzenie modelu DOM.
* **domContentLoaded:** sygnalizuje moment, w którym model DOM jest gotowy, arkusze stylów blokujące wykonywanie skryptów JavaScript nie występują, co oznacza, że teraz można (potencjalnie) utworzyć drzewo renderowania.
    * Wiele platform JavaScript czeka z wykonywaniem własnego kodu do pojawienia się tego zdarzenia. Z tej przyczyny przeglądarka przechwytuje sygnatury czasowe _EventStart_ i _EventEnd_, umożliwiając śledzenia czasu wykonywania.
* **domComplete:** jak wskazuje nazwa, ukończono wszystkie procedury przetwarzania i pobieranie wszystkich zasobów na stronie (obrazów itd.) - tzn. wskaźnik postępu wczytywania przestał się obracać.
* **loadEvent:** ostatnim etapem wczytywania strony jest wygenerowanie zdarzenia `onload`, które może wyzwolić wykonywanie dodatkowego kodu aplikacji.

Specyfikacja HTML określa szczegóły odnośnie do występowania każdego ze zdarzeń: kiedy należy je wygenerować, jakie warunki powinny być spełnione i tak dalej. W naszym przypadku skupimy się na kilku kluczowych zdarzeniach związanych z krytyczną ścieżką renderowania:

* **domInteractive** sygnalizuje, kiedy gotowy jest model DOM.
* **domContentLoaded** zazwyczaj sygnalizuje, kiedy [zarówno model DOM, jak i model CSSOM są gotowe](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Jeśli nie występują skrypty JavaScript blokujące parsowanie, zdarzenie _DOMContentLoaded_ jest wyzwalane bezpośrednio po zdarzeniu _domInteractive_.
* Zdarzenie **domComplete** informuje o gotowości strony i wszystkich skojarzonych z nią zasobów.

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

Na pierwszy rzut oka powyższy przykład może wydawać się nieco zniechęcający, ale w rzeczywistości jest całkiem prosty. Interfejs API Navigation Timing przechwytuje wszystkie odpowiednie sygnatury czasowe, a nasz kod po prostu czeka na wyzwolenie zdarzenia `onload` &ndash; przypominamy, że zdarzenie onload jest generowane po zdarzeniu domInteractive, domContentLoaded i domComplete &ndash; następnie obliczana jest różnica czasu między różnymi sygnaturami czasowymi.
<img src="images/device-navtiming-small.png" class="center" alt="Demonstracja interfejsu NavTiming">

Na razie powiedzieliśmy już wszystko. Umiemy już śledzić pewne konkretne zdarzenia i tworzyć proste funkcje umożliwiające pomiar czasu. Zwróć uwagę, że kod można zmodyfikować również tak, by zamiast wyświetlać wartości tych pomiarów na stronie wysyłał je do serwera do analizy witryn ([Google Analytics wykonuje to automatycznie](https://support.google.com/analytics/answer/1205784?hl=en)), co jest świetnym sposobem monitorowania wydajności i znajdowania stron, które skorzystałyby na optymalizacji.



