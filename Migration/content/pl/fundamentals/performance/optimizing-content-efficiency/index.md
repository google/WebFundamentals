---
title: "Optymalizacja wydajności związanej z treścią"
description: "Ilość danych pobieranych przez każdą aplikację cały czas rośnie. Aby zagwarantować najwyższą wydajność, musimy zoptymalizować transfer każdego bajtu."
updated_on: 2014-04-29
---

<p class="intro">
  Nasze aplikacje internetowe stają się coraz bardziej wyrafinowane, ambitne i funkcjonalne &ndash; to dobry kierunek. Jednak niepowstrzymane dążenie ku coraz bogatszym wrażeniom w Internecie powoduje powstanie kolejnego trendu: ilość danych pobieranych przez aplikacje rośnie w stałym tempie. Aby zagwarantować najwyższą wydajność, musimy zoptymalizować transfer każdego bajtu.
</p>


Jak wygląda nowoczesna aplikacja internetowa? Projekt [HTTP Archive](http://httparchive.org/) pozwoli nam uzyskać odpowiedź na to pytanie. Projekt ten śledzi sposób budowy stron internetowych, regularnie indeksując najbardziej popularne witryny (ponad 300 000 pozycji z listy Alexa Top 1M), w każdej z lokalizacji rejestrując i agregując analizy liczby zasobów, rodzaju treści i innych metadanych.

<img src="images/http-archive-trends.png" class="center" alt="Trendy zarejestrowane w projekcie HTTP Archive">

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th></th>
    <th>50 percentyl</th>
    <th>75 percentyl</th>
    <th>90 percentyl</th>
  </tr>
</thead>
<tr>
  <td data-th="typ">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="typ">Obrazy</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="typ">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="typ">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="typ">Inne</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="typ"><strong>Razem</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Powyższe dane przedstawiają trendy wzrostu ilości danych pobranych z popularnych lokalizacji w Internecie od stycznia 2013 r. do stycznia 2014 r. Oczywiście nie każda witryna rośnie w tym samym tempie lub generuje tę samą ilość danych, dlatego zamieszczamy różne kwantyle z dystrybucji: 50. (mediana), 75. i 90.

Medianowa witryna na początku 2014 r. generowała 75 żądań o łącznym rozmiarze 1054 KB przesłanych danych. Łączna ilość danych (i żądań) rosła w stałym tempie przez cały poprzedni rok. Nie powinno to nikogo dziwić, choć niesie za sobą poważne konsekwencje odnośnie do wydajności: tak, połączenia sieciowe stają się coraz szybsze, jednak zależnie od kraju różnią się od siebie dynamiką, a wielu użytkowników nadal podlega limitom i opłatom za transfer danych &ndash; szczególnie w przypadku Internetu na urządzeniach mobilnych.

W przeciwieństwie do swoich komputerowych odpowiedników, aplikacje internetowe nie wymagają osobnego procesu instalacji: wystarczy wprowadzić adres URL i można pracować -- to najważniejsza cecha Internetu. Jest to możliwe dzięki temu, że **pobiera się często dziesiątki, a czasami setki różnych zasobów, których łączny rozmiar może sięgać megabajtów. Błyskawiczne działanie aplikacji internetowych, do którego dążymy, jest możliwe dzięki pobieraniu wszystkich tych danych razem w ciągu kilkuset milisekund.**

Osiągnięcie szybkiej pracy aplikacji internetowych jest w świetle tych wymagań niełatwym zadaniem. Dlatego kluczowe znaczenie ma optymalizacja wydajności związanej z treścią: eliminacja zbędnych pobrań, optymalizacja kodowania transferu każdego zasobu dzięki różnym technikom kompresji, jak również powszechne użycie funkcji buforowania w celu eliminacji powtarzających się pobrań.


