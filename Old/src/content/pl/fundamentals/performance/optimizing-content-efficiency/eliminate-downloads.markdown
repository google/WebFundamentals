---
title: "Eliminowanie niepotrzebnych pobrań"
description: "Najszybszym i najbardziej optymalnym zasobem jest zasób, którego w ogóle nie trzeba przesyłać. Czy pamiętasz o audytowaniu swoich zasobów? Regularnie audytuj swoje zasoby, by zagwarantować, że każdy zapewnia użytkownikom najwyższy poziom wygody."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Inwentaryzuj wszystkie swoje i zewnętrzne zasoby na swoich stronach"
    - "Określ wydajność związaną z każdym zasobem: jego znaczenie i techniczną wydajność"
    - "Ustal, czy zasoby zapewniają odpowiednią wartość"
---

<p class="intro">
  Najszybszym i najbardziej optymalnym zasobem jest zasób, którego w ogóle nie trzeba przesyłać. Czy pamiętasz o audytowaniu swoich zasobów? Regularnie audytuj swoje zasoby, by zagwarantować, że każdy zapewnia użytkownikom najwyższy poziom wygody.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

Najszybszym i optymalnym zasobem jest zasób, którego w ogóle nie trzeba przesyłać. Poniższe stwierdzenie może wydawać się banalne, ale zbyt często nie stosuje się go w praktyce: a tymczasem inżynier ds. wydajności powinien zachować krytyczne spojrzenie i zawsze korzystać z okazji do wyeliminowania zbędnych zasobów z aplikacji. Dobrą praktyką jest dyskusja i okresowa weryfikacja jawnych i domniemanych założeń odnoszących się do zasobów. Oto kilka przykładów:

* Zawsze zamieszczaliśmy zasób X na naszych stronach, ale czy jego wartość dla użytkownika kompensuje koszt związany z jego pobieraniem i wyświetlaniem? Czy można zmierzyć i udowodnić jego wartość?
* Czy zasób &ndash; szczególnie jeśli jest to zasób zewnętrzny &ndash; zapewnia stałą wydajność? Czy zasób ten znajduje się w ścieżce krytycznej, czy musi się w niej znajdować? Jeśli zasób leży na ścieżce krytycznej, czy może się stać przyczyną awarii naszej witryny &ndash; tzn. jeśli zasób stanie się niedostępny, czy to wpłynie na wydajność naszych stron i wrażenia użytkownika?
* Czy ten zasób wymaga posiadania umowy SLA? Czy ten zasób spełnia wymagania wydajności względem kompresji, buforowania i tak dalej?

Zbyt często nasze strony zawierają zasoby zbędne lub, co gorsze, obniżające wydajność stron, a praktycznie nie wnoszące żadnej dodatkowej wartości dla użytkownika lub witryny, na której są hostowane. Odnosi się to w równym stopniu do własnych, jak i zewnętrznych zasobów i widżetów:

* Projektanci witryny A zdecydowali się na zastosowanie na swojej stronie głównej obrotowej galerii zdjęć. Miało to umożliwić przeglądanie wielu zdjęć jednym kliknięciem. Wszystkie zdjęcia były ładowane w trakcie wczytywania strony, a użytkownik sam wybierał kolejne zdjęcia do wyświetlenia.
    * **Pytanie:** czy określono, ilu użytkowników wyświetla kolejne zdjęcia z galerii obrotowej? Pobieranie zbędnych zasobów wprowadza duże opóźnienie wczytywania strony, mimo że większość użytkowników nigdy nie ogląda zdjęć.
* Projektanci witryny B zdecydowali się na użycie widżetu zewnętrznego, który wyświetli treść powiązaną, umożliwi zaangażowanie społecznościowe i zapewni inne usługi.
    * **Pytanie:** czy określono, ilu użytkowników korzysta z widżetu lub klika dostarczane przez widżet odnośniki powiązane z treścią? Czy korzyści z zastosowania widżetu usprawiedliwiają ubytek wydajności?

Jak można zauważyć, eliminowanie zbędnych pobrań wydaje się prostym zadaniem, ale w praktyce takie nie jest, ponieważ przed podjęciem ostatecznej decyzji wymaga przemyślenia sprawy i wykonania pewnych pomiarów. Najlepsze wyniki osiąga się przy regularnej inwentaryzacji zasobów i weryfikacji tych pytań względem każdego zasobu na Twoich stronach.



