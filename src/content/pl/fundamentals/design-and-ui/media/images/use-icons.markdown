---
title: "Używanie obrazów SVG jako ikon"
description: "Jeśli to możliwe, jako ikon na swojej stronie użyj obrazów SVG, a w niektórych przypadkach znaków Unicode."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - Zamiast obrazów rastrowych jako ikon użyj obrazów SVG lub znaków Unicode.
---

<p class="intro">
  Jeśli to możliwe, jako ikon na swojej stronie użyj obrazów SVG, a w niektórych przypadkach znaków Unicode.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Zastępowanie prostych ikon znakami Unicode

Wiele czcionek zawiera rozmaite symbole Unicode, których możesz użyć zamiast obrazów. W przeciwieństwie do obrazów czcionki Unicode poprawnie się skalują i niezależnie od wielkości dobrze wyglądają na ekranie.

Oprócz normalnego zestawu znaków czcionka Unicode może obejmować formy numeryczne (&#8528;), strzałki (&#8592;), operatory matematyczne (&#8730;), kształty geometryczne (&#9733;), symbole elementów sterujących (&#9654;), kody alfabetu Braille`a (&#10255;), nuty (&#9836;), litery greckie (&#937;), a nawet bierki szachowe (&#9822;).

Znaki Unicode można dodawać do strony tak samo jak nazwane elementy &ndash; `&#XXXX`, gdzie `XXXX` to numer znaku Unicode. Na przykład:

{% highlight html %}
Jesteś super&#9733;
{% endhighlight %}

Jesteś super&#9733;

## Zastępowanie złożonych ikon obrazami SVG
Jeśli potrzebujesz bardziej złożonych ikon, skorzystaj z formatu SVG, który ma niewielkie wymagania, jest prosty w użyciu i działa ze stylami CSS. Obrazy SVG mają kilka zalet w porównaniu z obrazami rastrowymi:

* To grafika wektorowa, którą można skalować bez ograniczeń.
* Pozwalają w prosty sposób stosować efekty CSS takie jak kolor, cienie, przezroczystość i animacje.
* Można umieszczać je bezpośrednio w treści dokumentu.
* Mają charakter semantyczny.
* Dzięki odpowiednim atrybutom lepiej współpracują z funkcjami ułatwień dostępu.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Problemy przy stosowaniu czcionek z ikonami

Czcionki z ikonami są popularne i łatwe w użyciu, ale w porównaniu z ikonami SVG mają kilka wad.

* To grafika wektorowa, którą nie tylko można skalować bez ograniczeń, ale też poddawać wygładzaniu krawędzi. W efekcie ikony czasami nie są odpowiednio ostre.
* W ograniczonym stopniu działają ze stylami CSS.
* Dokładne pozycjonowanie pikseli może być trudne ze względu na wysokość wiersza, odstępy między literami itp.
* Nie mają charakteru semantycznego i niezbyt dobrze współpracują z czytnikami ekranu oraz innymi funkcjami ułatwień dostępu.
* Przy braku prawidłowego zakresu mogą powodować pobieranie dużych plików, mimo że używasz tylko niewielkiego podzbioru dostępnych ikon. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Przykład strony z czcionką z ikonami Font Awesome">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

Istnieją setki darmowych i płatnych czcionek z ikonami, np. [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) czy [Glyphicons](http://glyphicons.com/).

Pamiętaj, by podczas wybierania ikon wziąć pod uwagę dodatkowe żądania HTTP i ilość pobieranych danych. Jeśli np. potrzebujesz tylko kilku ikon, lepiej użyć obrazu lub sprite`a graficznego.



