---
title: "Optymalizacja krytycznej ścieżki renderowania"
description: "Aby maksymalnie skrócić czas wymagany do przeprowadzenia pierwszego renderowania strony, musimy zminimalizować trzy zmienne: liczbę krytycznych zasobów, liczbę krytycznych bajtów i długość ścieżki krytycznej."
updated_on: 2014-04-28
---

Aby maksymalnie skrócić czas wymagany do przeprowadzenia pierwszego renderowania strony, musimy zminimalizować trzy zmienne:

* **liczbę krytycznych zasobów,**
* **liczbę krytycznych bajtów,**
* **długość ścieżki krytycznej.**

Zasobem krytycznym jest dowolny zasób zdolny do zablokowania pierwszego renderowania strony. Im mniej takich zasobów obecnych na stronie, tym mniej działań musi wykonać przeglądarka, by wyświetlić treść na ekranie, i tym mniejsze zapotrzebowanie na moc obliczeniową procesora i inne zasoby.

Podobnie im mniej bajtów krytycznych musi pobrać przeglądarka, tym szybciej może przejść do przetwarzania treści i wyświetlić ją na ekranie. Liczbę takich bajtów można zmniejszyć, redukując liczbę zasobów (eliminując je lub przekształcając je na niekrytyczne) i zmniejszając rozmiar każdego zasobu przez jego kompresję i optymalizację.

W końcu należy zaznaczyć, że długość ścieżki krytycznej wynika z zależności pomiędzy wszystkimi zasobami krytycznymi potrzebnymi na stronie i ich rozmiarem w bajtach: pobieranie niektórych zasobów można rozpocząć dopiero po przetworzeniu poprzedniego zasobu, a im większy zasób, tym więcej kolejnych cykli wymiany danych wymaga jego pobranie.

Inaczej mówiąc, liczba zasobów, ich rozmiar w bajtach i długość ścieżki krytycznej są ze sobą powiązane, ale nie oznaczają dokładnie tego samego. Na przykład zmniejszenie liczby zasobów krytycznych lub skrócenie ścieżki krytycznej może nie być wykonalne, ale zmniejszenie liczby bajtów krytycznych wciąż będzie stanowić ważny krok optymalizacji &ndash; i na odwrót.

**Ogólnie sekwencja kroków wymaganych do optymalizacji krytycznej ścieżki renderowania jest następująca:**

1. Analiza i charakterystyka ścieżki krytycznej: liczby zasobów, rozmiaru w bajtach, długości ścieżki.
2. Minimalizacja liczby zasobów krytycznych: ich eliminacja, odłożenie pobierania, oznaczenie jako asynchroniczne itp.
3. Optymalizacja kolejności wczytywania pozostałych zasobów krytycznych: aby skrócić ścieżkę krytyczną, pobieranie wszystkich zasobów krytycznych powinno zacząć się możliwie najwcześniej.
4. Optymalizacja liczby bajtów krytycznych w celu redukcji czasu pobierania (liczby cykli wymiany danych).



