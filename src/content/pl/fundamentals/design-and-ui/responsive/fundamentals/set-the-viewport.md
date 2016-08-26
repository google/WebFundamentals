project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Ustawianie tagu viewport {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Strony zoptymalizowane pod kątem działania na rozmaitych urządzeniach muszą w nagłówku dokumentu zawierać metatag viewport. Przekazuje on przeglądarce instrukcje, jak sterować wymiarami i skalowaniem strony.




## TL;DR {: .hide-from-toc }
- 'Użyj metatagu viewport, by sterować szerokością i skalowaniem widocznego obszaru w przeglądarkach.'
- 'Dołącz tag <code>width=device-width</code>, by dopasować stronę do szerokości ekranu w pikselach niezależnych od urządzenia.'
- 'Dołącz tag <code>initial-scale=1</code>, by utworzyć relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia.'
- 'Nie wyłączaj skalowania strony przez użytkownika, by nie ograniczać jej dostępności.'


Aby strona działała jak najlepiej, przeglądarki mobilne renderują ją w szerokości ekranu komputera (zwykle około 980&nbsp;pikseli, choć zdarzają się też inne wartości), a potem próbują poprawić wygląd treści, zwiększając czcionki i skalując zawartość, by pasowała do ekranu. W takiej sytuacji rozmiary czcionek mogą być niespójne, a użytkownik musi kliknąć dwukrotnie lub inaczej zmienić powiększenie, by zobaczyć treści i wejść z nimi w interakcję.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Wartość metatagu viewport `width=device-width` powoduje, że strona dopasowuje się do szerokości ekranu w pikselach niezależnych od urządzenia. Dzięki temu jej zawartość może zostać ułożona odpowiednio do danego rozmiaru ekranu &ndash; zarówno małego w telefonie komórkowym, jak i dużego w monitorze komputera.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Strona bez ustawionego tagu viewport">
      Zobacz przykład
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Strona z ustawionym tagiem viewport">
      Zobacz przykład
    {% endlink_sample %}
  </div>
</div>

Niektóre przeglądarki utrzymują stałą szerokość strony podczas obrotu do trybu poziomego i powiększają widok zamiast na nowo ułożyć zawartość na ekranie. Atrybut `initial-scale=1` poleca przeglądarce ustanowić relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia, bez względu na jego orientację. To pozwala wykorzystać pełną szerokość strony w trybie poziomym.

<!-- TODO: Verify note type! -->
Note: Atrybuty rozdziel przecinkami, by starsze przeglądarki analizowały je prawidłowo.

## Ułatwianie dostępu do treści w widocznym obszarze

Oprócz `initial-scale` możesz też ustawić te atrybuty tagu viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Po ustawieniu mogą one uniemożliwić użytkownikowi powiększanie widocznego obszaru, powodując problemy z dostępnością.



