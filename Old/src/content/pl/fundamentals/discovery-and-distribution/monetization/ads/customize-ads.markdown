---
title: "Dostosowywanie reklam"
description: "Najlepsze reklamy mogą pozytywnie wpłynąć na wrażenia użytkownika. Mimo że treść reklam pochodzi od reklamodawców, możesz decydować o ich rodzaju, kolorach, rozmiarach i miejscach docelowych."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - "Nigdy nie umieszczaj reklam tam, gdzie mogą utrudniać użytkownikowi korzystanie z witryny w zamierzony sposób. Upewnij się, że reklamy w części strony widocznej na ekranie nie spychają ważnych treści w dół."
    - "Zawsze korzystaj z elastycznych jednostek reklamowych. Jeśli inteligentna zmiana rozmiaru nie wystarcza, użyj trybu zaawansowanego."
    - "Szukaj możliwości integracji reklam z treściami, by zapobiegać ich ignorowaniu."
    - "Wybieraj style tekstu, które pasują do wyglądu witryny, uzupełniają go lub z nim kontrastują."
notes:
  targeting:
    - "Reklamy są kierowane na podstawie ogólnej zawartości witryny, a nie słów kluczowych czy kategorii. Jeśli chcesz wyświetlać reklamy związane z konkretnymi tematami, umieść na stronach pełne zdania i akapity na te tematy."
  testing:
    - "Zawsze testuj reklamy na różnych urządzeniach i ekranach, by upewnić się, że są odpowiednio elastyczne."
  images:
    - "Reklamodawcy mają pełną kontrolę nad wyglądem swoich reklam displayowych. Możesz wpływać na to, jakie rodzaje tych reklam pojawiają się w Twojej witrynie, określając ich rozmiary i miejsca docelowe, ale nie możesz decydować o treści obrazów."
---

<p class="intro">
  Najlepsze reklamy mogą pozytywnie wpłynąć na wrażenia użytkownika. Mimo że treść reklam pochodzi od reklamodawców, możesz decydować o ich rodzaju, kolorach, rozmiarach i miejscach docelowych.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Umieszczanie reklam tam, gdzie najbardziej przydają się użytkownikom

Gdy zastanawiasz się, ile reklam umieścić w swojej witrynie
i gdzie mają się one znaleźć, zawsze kieruj się wygodą użytkownika.

* Użyj reklam, by uzupełnić treść witryny &ndash; nie odwrotnie.
* Strony z nadmierną liczbą reklam bądź reklamami, które spychają ważne treści na część strony widoczną po przewinięciu, są zgrupowane razem i dominują widoczny obszar lub nie mają wyraźnych oznaczeń, obniżają zadowolenie użytkownika i są sprzeczne z zasadami AdSense.
* Upewnij się, że reklamy są przydatne dla użytkowników. Jeśli masz jednostki reklamowe, które generują wyraźnie mniej przychodów, kliknięć lub wyświetleń, wyświetlane w nich reklamy prawdopodobnie nie interesują użytkowników.

Przykładowe miejsca docelowe reklam mobilnych:

<img src="images/mobile_ads_placement.png" class="center" alt="Przykładowa mobilna reklama graficzna">

Więcej informacji znajdziesz w artykule 
[Sprawdzone metody związane z miejscami docelowymi reklamy](https://support.google.com/adsense/answer/1282097) w AdSense.


## Co zrobić, gdy elastyczne określanie rozmiarów nie wystarcza?
Czasami potrzebujesz większej kontroli nad sposobem wyświetlania reklam niż ta, którą dają elastyczne reklamy. W takiej sytuacji możesz użyć trybu zaawansowanego i zastąpić inteligentne określanie rozmiarów w kodzie elastycznej jednostki reklamowej. 
Na przykład możesz dokładnie sterować określaniem rozmiarów reklam, korzystając z [zapytań o media]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html):

1. Postępuj zgodnie z instrukcjami, by [utworzyć elastyczną jednostkę reklamową]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. W polu Kod reklamy wybierz <strong>Zaawansowane (wymagana modyfikacja kodu)</strong> z menu Tryb.
3. Zmień kod reklamy, by ustawić dokładne rozmiary reklam w zależności od urządzenia użytkownika:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Wypróbuj
{% endlink_sample %}

Więcej informacji znajdziesz w sekcji [Zaawansowane funkcje](https://support.google.com/adsense/answer/3543893) w pomocy AdSense.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Wybór stylów uzupełniających wygląd witryny

[Najskuteczniejsze reklamy](https://support.google.com/adsense/answer/17957) pasują do stylistyki witryny lub z nią kontrastują. Google AdSense udostępnia zestaw [wstępnie zdefiniowanych stylów reklamy](https://support.google.com/adsense/answer/6002585). Wybierz ten, który najlepiej wygląda w Twojej witrynie, lub utwórz własny.

### Co możesz dostosować

W reklamach tekstowych możesz dostosować te elementy stylu:

* kolor obramowania,
* kolor tła,
* rodzaj i rozmiar czcionki,
* domyślny kolor tekstu,
* kolor tekstu w tytule reklamy,
* kolor tekstu w adresach URL.

### Jak stosować style

Aby podczas tworzenia nowej jednostki zastosować inny styl do reklam tekstowych, rozwiń właściwość <strong>Styl reklamy tekstowej</strong>:

<img src="images/customize.png" class="center" alt="Style reklamy tekstowej">

Wszystkie reklamy tekstowe korzystają ze stylu <strong>Domyślny</strong> w Google AdSense. Możesz użyć dowolnego wstępnie zdefiniowanego stylu w niezmienionej postaci, wprowadzić w nim niewielkie zmiany lub utworzyć własny styl niestandardowy.

Zapisany styl możesz zastosować do wybranych istniejących lub 
nowych jednostek reklamowych:

1. Wejdź na stronę [Style reklamy](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Wybierz styl reklamy, który chcesz zmienić, z listy <strong>stylów reklamy dostępnych we wszystkich aktywnych produktach</strong>.
3. Wprowadź zmiany i <strong>zapisz styl reklamy</strong>.

Po zmianie istniejącego stylu reklamy wszystkie aktywne jednostki reklamowe, które z niego korzystają, są automatycznie aktualizowane.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


