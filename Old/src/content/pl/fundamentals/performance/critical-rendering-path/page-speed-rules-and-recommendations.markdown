---
title: "Reguły i zalecenia na temat PageSpeed Insights"
description: "Reguły PageSpeed Insights w kontekście: na co zwracać uwagę podczas optymalizacji krytycznej ścieżki renderowania i dlaczego."
updated_on: 2014-04-28
---
<p class="intro">
  Reguły PageSpeed Insights w kontekście: na co zwracać uwagę podczas optymalizacji krytycznej ścieżki renderowania i dlaczego.
</p>

## Wyeliminuj kod JavaScript i CSS blokujący renderowanie

Aby maksymalnie skrócić czas wymagany do przeprowadzenia pierwszego renderowania strony, musimy zminimalizować liczbę zasobów krytycznych na stronie, liczbę pobieranych krytycznych bajtów i długość ścieżki krytycznej.

## Zoptymalizuj użycie kodu JavaScript

Zasoby JavaScript domyślnie blokują parser, chyba że zostaną opatrzone słowem kluczowym _async_ lub dodane z wykorzystaniem specjalnego fragmentu kodu JavaScript. Kod JavaScript blokujący parser powoduje, że przeglądarka musi oczekiwać na utworzenie modelu CSSOM i wstrzymać tworzenie modelu DOM, co może się wiązać ze znacznym opóźnieniem pierwszego renderowania strony.

### **Staraj się stosować asynchroniczne zasoby JavaScript**

Zasoby asynchroniczne nie powodują blokowania parsera dokumentu i pozwalają uniknąć zablokowania przez model CSSOM przed wykonaniem skryptu. Zdarza się, że jeśli skrypt można zmienić na asynchroniczny, oznacza to również, że jest on zbędny przy pierwszym renderowaniu strony &ndash; rozważ wczytywanie skryptów asynchronicznych dopiero po pierwszym renderowaniu strony.

### **Odkładaj w czasie parsowanie skryptów JavaScript**

Wykonywanie wszystkich skryptów niepotrzebnych do utworzenia treści widocznej przy pierwszym renderowaniu powinno zostać odłożone na później, by przeglądarka musiała wykonać jak najmniej czynności podczas renderowania strony.

### **Unikaj długo wykonujących się skryptów JavaScript**

Długo wykonujące się skrypty JavaScript blokują przeglądarkę, uniemożliwiając jej tworzenie modelu DOM i CSSOM oraz renderowanie strony. Z tego względu wszelkie procedury inicjalizacyjne i funkcje zbędne przy pierwszym renderowaniu należy odłożyć na później. Jeśli wymagane jest uruchomienie długiej sekwencji poleceń inicjalizacyjnych, zastanów się, czy można ją podzielić na kilka etapów. Pozwoli to przeglądarce przetworzyć inne zdarzenia między tymi etapami.

## Zoptymalizuj użycie kodu CSS

Do utworzenia drzewa renderowania potrzebny jest kod CSS, a skrypt JavaScript zazwyczaj blokuje kod CSS w trakcie pierwszego konstruowania strony. Upewnij się, że wszystkie nieistotne fragmenty kodu CSS (np. zapytania o wydruk i inne zapytania o media) są oznaczone jako niekrytyczne, a ilość krytycznego kodu CSS i czas wymagany do jego wykonania są możliwie najmniejsze.

### **Umieszczaj kod CSS w nagłówku dokumentu**

Wszystkie zasoby CSS należy zadeklarować w dokumencie HTML możliwie najwcześniej, by przeglądarka mogła jak najwcześniej wykryć tagi `<link>` i wysłać żądania odnośnie do zasobów CSS.

### **Unikaj importów CSS**

Dyrektywa importu CSS (@import) umożliwia jednemu arkuszowi stylów import reguł z innego arkusza stylów. Jednak stosowania tych dyrektyw należy unikać, ponieważ wprowadzają one do ścieżki krytycznej dodatkowe cykle wymiany danych: importowane zasoby CSS są wyszukiwane dopiero po zakończeniu pobierania i parsowania arkusza stylów CSS zawierającego regułę @import.

### **Znaczniki CSS blokujące renderowanie zamieszczaj w dokumencie HTML**

Aby uzyskać najwyższą wydajność, zastanów się, czy nie umieścić krytycznej sekwencji znaczników CSS bezpośrednio w dokumencie HTML. Pozwala to wyeliminować ze ścieżki krytycznej dodatkowe cykle wymiany danych, a przy odpowiednim zaimplementowaniu może służyć do uzyskania ścieżki krytycznej o `jednym cyklu wymiany danych`, w którym zasobem blokującym są tylko znaczniki HTML.



