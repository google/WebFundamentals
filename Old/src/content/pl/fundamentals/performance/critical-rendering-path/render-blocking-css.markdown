---
title: "Kod CSS blokujący renderowanie"
description: "Domyślnie kod CSS jest traktowany jako zasób blokujący renderowanie, co oznacza, że przeglądarka wstrzymuje renderowanie przetwarzanej treści do utworzenia modelu CSSOM. Pamiętaj, by maksymalnie uprościć znaczniki CSS, dostarczyć je możliwie najszybciej i korzystać z mediów takich typów oraz takich zapytań o media, by nie blokowały renderowania."
updated_on: 2014-09-18
related-guides:
  media-queries:
    -
      title: Używanie zapytań o media CSS w celu zwiększenia szybkości odpowiedzi
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Elastyczne projektowanie witryn"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - Domyślnie kod CSS jest traktowany jako zasób blokujący renderowanie.
    - Dzięki typom mediów i zapytaniom o media możemy oznaczyć niektóre zasoby CSS jako nieblokujące renderowanie.
    - Przeglądarka pobiera wszystkie zasoby CSS, niezależnie od ich własności blokujących lub nieblokujących.
---
<p class="intro">
  Domyślnie kod CSS jest traktowany jako zasób blokujący renderowanie, co oznacza, że przeglądarka wstrzymuje renderowanie przetwarzanej treści do utworzenia modelu CSSOM. Pamiętaj, by maksymalnie uprościć znaczniki CSS, dostarczyć je możliwie najszybciej i korzystać z mediów takich typów oraz takich zapytań o media, by nie blokowały renderowania.
</p>



W poprzedniej sekcji dowiedzieliśmy się, że tworzenie drzewa renderowania w krytycznej ścieżce renderowania wymaga obecności zarówno drzewa DOM, jak i drzewa CSSOM. Ma to kluczowe znaczenie dla wydajności: **zarówno znaczniki HTML, jak i znaczniki CSS, są zasobami blokującymi renderowanie.** Jest to oczywiste dla znaczników HTML, ponieważ bez drzewa DOM nie byłoby elementów do renderowania, ale w przypadku znaczników CSS może tak się nie wydawać. Co by się stało, gdyby spróbować zrenderować typową stronę po zniesieniu blokady renderowania przez kod CSS?

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>Gazeta NYTimes ze stylami CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="Gazeta NYTimes bez stylów CSS">

  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>Gazeta NYTimes bez stylów CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="Gazeta NYTimes bez stylów CSS">

  </div>
</div>

{% comment %}
<table class="mdl-data-table mdl-js-data-table">
<tr>
<td>Gazeta NYTimes ze stylami CSS</td>
<td>Gazeta NYTimes bez stylów CSS</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="Gazeta NYTimes ze stylami CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="Gazeta NYTimes bez stylów CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

W powyższym przykładzie witryny gazety NYTimes z i bez użycia stylów CSS zademonstrowano, dlaczego renderowanie jest blokowane do momentu udostępnienia arkuszy CSS &ndash; bez arkuszy CSS strona jest w zasadzie niezdatna do użytku. Sposób wyświetlania przedstawiony po prawej stronie często nazywa się widokiem FOUC (Flash of Unstyled Content). Z tego względu przeglądarka blokuje renderowanie, aż obydwa modele &ndash; DOM i CSSOM &ndash; staną się dostępne.

> **_Kod CSS jest zasobem blokującym renderowanie, dlatego należy przesłać go do klienta możliwie najszybciej, by skrócić czas do pierwszego renderowania._**

Co jednak, jeśli niektóre style CSS są używane tylko w pewnych warunkach, na przykład gdy strona jest drukowana lub renderowana na dużym monitorze? Najlepiej by było, gdyby renderowanie nie było blokowane przez te zasoby.

`Typy mediów` i `zapytania o media` w arkuszach CSS pozwalają na wdrożenie takiego sposobu użytkowania:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

[Zapytanie o media]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) składa się z typu mediów i opcjonalnie z wyrażeń umożliwiających sprawdzenie funkcji poszczególnych mediów. Na przykład deklaracja pierwszego arkusza stylów nie zawiera żadnego typu mediów lub zapytania, dlatego obowiązuje we wszystkich przypadkach &ndash; dlatego będzie zawsze blokować renderowanie. Drugi arkusz stylów będzie obowiązywać przy wydruku treści &ndash; być może trzeba zmienić układ strony, zastosować inne czcionki itp. &ndash; dlatego ten arkusz stylów nie musi blokować renderowania strony przy jej pierwszym wczytaniu. Ostatnia deklaracja arkusza stylów zawiera `zapytanie o media` wykonywane przez przeglądarkę: jeśli warunek jest spełniony, przeglądarka zablokuje renderowanie do momentu pobrania i przetworzenia arkusza stylów.

Dzięki zastosowaniu zapytań o media prezentację można dostosować do konkretnych przypadków, np. wyświetlania na ekranie albo wydruku, oraz do dynamicznie zmieniających się warunków, takich jak orientacja ekranu, zdarzenia zmiany rozmiaru i innych. **Przy deklarowaniu zasobów arkuszy stylów zwracaj uwagę na typ mediów i zapytania, ponieważ mają one ogromny wpływ na wydajność w krytycznej ścieżce renderowania.**

{% include shared/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Oto kilka praktycznych przykładów:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* Pierwsza deklaracja blokuje renderowanie i obowiązuje we wszystkich przypadkach.
* Druga deklaracja również blokuje renderowanie: typem domyślnym jest `all` &ndash; w przypadku braku innej deklaracji typ przyjmuje domyślnie wartość `all`. Dlatego pierwsza i druga deklaracja są w rzeczywistości równoważne.
* W trzeciej deklaracji występuje dynamiczne zapytanie o media, wykonywane w trakcie wczytywania strony. Plik portrait.css zablokuje renderowanie przy odpowiedniej orientacji urządzenia w trakcie wczytywania strony.
* Ostatnia deklaracja obowiązuje tylko przy wydruku strony i nie blokuje renderowania przy pierwszym wczytywaniu strony w przeglądarce.

Pamiętaj, że pojęcie `zasób blokujący renderowanie` odnosi się tylko do faktu, że przeglądarka wstrzymuje pierwsze renderowanie strony z powodu tego zasobu. Niezależnie od tego, czy następuje czy nie, przeglądarka zawsze pobiera zasób CSS, chociaż w przypadku zasobów nieblokujących z niższym priorytetem.



