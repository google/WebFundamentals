project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Dostosowywanie rozmiaru treści do widocznego obszaru {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Zarówno na komputerach, jak i urządzeniach mobilnych użytkownicy są przyzwyczajeni do przewijania stron w pionie, ale nie w poziomie. Zmuszanie użytkownika do przewijania w poziomie lub pomniejszania widoku, gdy chce zobaczyć pozostałą część strony, obniża wygodę obsługi.


## TL;DR {: .hide-from-toc }
- Nie używaj dużych elementów o stałej szerokości.
- Prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru.
- 'Użyj zapytań o media CSS, by zastosować różne style na małych i dużych ekranach.'


Podczas tworzenia witryny mobilnej z metatagiem `viewport` łatwo przypadkowo dodać do strony treści, które nie pasują do określonego widocznego obszaru. Na przykład obraz szerszy niż widoczny obszar powoduje konieczność przewijania w poziomie. Elementy tego typu trzeba dopasować do szerokości widocznego obszaru, tak by użytkownik nie musiał przewijać ich w bok.

Wymiary ekranu i szerokość w pikselach CSS mogą bardzo się różnić na poszczególnych urządzeniach (np. telefonach i tabletach czy nawet różnych telefonach), dlatego prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru.

Ustawienie dużych bezwzględnych szerokości CSS elementów strony (tak jak w przykładzie poniżej) spowoduje, że element `div` będzie zbyt szeroki dla widocznego obszaru na węższym urządzeniu (np. iPhonie, który ma 320&nbsp;pikseli szerokości CSS). Zamiast tego użyj względnych wartości szerokości, na przykład `width: 100%`. Podobnie pamiętaj, by nie używać dużych bezwzględnych wartości pozycji, które mogą spowodować, że element znajdzie się poza widocznym obszarem na małym ekranie.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na iPhonie">
      Zobacz przykład
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na Nexusie 5.">
      Zobacz przykład
    {% endlink_sample %}
  </div>
</div>



