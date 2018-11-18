project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Poproś o sprawdzenie {: .page-title }

Aby Twoja witryna lub strona zostały odznaczone (bez flagi) jako niebezpieczne lub potencjalnie nieprawdziwe dla użytkowników,
poproś Google o ich sprawdzenie.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Wymagania

*   Znajomość poleceń powłoki/terminala

## Sposób postępowania

### 1. Wymagania wstępne

Zanim poprosisz o sprawdzenie, potwierdź, że wykonałeś następujące czynności:

* Zweryfikowałeś własność swojej witryny w usłudze Search Console
* Oczyściłeś swoją witrynę z wandalizmu hakera
* Załatałeś lukę
* Przywróciłeś oczyszczoną witrynę do trybu online

### 2. Dokładnie sprawdź, czy Twoje strony są dostępne i czyste

Dla bezpieczeństwa użyj Wget lub cURL, aby wyświetlić strony z Twojej witryny, takie jak Twoja
strona główna i adres URL zmodyfikowany przez hakera. Powinny być teraz czyste. W takim przypadku,
i pewności, że to samo dotyczy pozostałych stron z Twojej witryny,
czas poprosić o sprawdzenie.

Informacja: W celu wyszukania przez Googlebota i zapewnienia, że Twoje strony są czyste,
strony te muszą być dostępne. Upewnij się, że nie zostały one zablokowane lub usunięte przez roboty
z indeksowania z powodu `noindex` tagów META lub dyrektyw dla robotów.

### 3. Poproś o sprawdzenie

Przed poproszeniem o sprawdzenie:

* **upewnij się, że problem został naprawiony**,
prośba o sprawdzenie w przypadku nadal istniejącego problemu tylko przedłuży okres
oznaczenia witryny jako niebezpiecznej.

* **dokładnie sprawdź, gdzie powinieneś poprosić o sprawdzenie**, proces sprawdzania
odbywa się w określonym narzędziu, w zależności od problemu związanego z Twoją witryną.
Zapoznaj się z poniższymi kanałami.


#### A. Zaatakowana witryna

*Otrzymałeś powiadomienie o zaatakowanej witrynie w
[**raporcie Ręczne działania**](https://www.google.com/webmasters/tools/manual-action)
usługi Search Console:*

1. Teraz, gdy przeszedłeś kolejne etapy procesu oczyszczania,
  możesz ponownie przejść do raportu [Ręczne działania](https://www.google.com/webmasters/tools/manual-action)
  i znaleźć problem z dopasowaniem do całej witryny lub częściowym
  dopasowaniem.
2. Wybierz opcję **Request a review**.

    Aby przesłać sprawdzenie, prosimy o podanie dodatkowych informacji na temat
    czynności wykonanych w celu oczyszczenia witryny. Dla każdej kategorii ataku możesz zawrzeć
    zdanie z opisem oczyszczania witryny (przykładowo: „W przypadku
    adresów URL, pod którymi zamieniona została zawartość, niechciana zawartość została usunięta, a podatność
    załatana: poprzez uaktualnienie nieaktualnej wtyczki.”).


#### B. Niepożądane oprogramowanie (w tym złośliwe oprogramowanie typu malware)

*Otrzymałeś powiadomienie o złośliwym oprogramowaniu typu malware lub niepożądanym oprogramowaniu w
[**raporcie Ręczne działania**](https://www.google.com/webmasters/tools/security-issues)
usługi Search Console:*

1. Otwórz
  [**raport dotyczący Problemów z zabezpieczeniami**](https://www.google.com/webmasters/tools/security-issues)
  ponownie w usłudze Search Console. Raport może nadal wyświetlać ostrzeżenia oraz przykładowe
  zainfekowane adresy URL widoczne wcześniej.
2. Wybierz opcję **Request a review**.

    Aby przesłać sprawdzenie, prosimy o podanie dodatkowych informacji na temat
    czynności wykonanych w celu usunięcia naruszenia zasad z witryny. Przykładowo:
    „Usunąłem kod zewnętrzny, który rozpowszechniał złośliwe oprogramowanie typu malware na mojej
    witrynie i zastąpiłem go nowszą wersją kodu”.


*Nie otrzymałeś powiadomienia o złośliwym oprogramowaniu typu malware lub niepożądanym oprogramowaniu w
[**raporcie Ręczne działania**](https://www.google.com/webmasters/tools/security-issues)
usługi Search Console, ale otrzymałeś powiadomienie za pośrednictwem swojego konta AdWords:*

1. Poproś o sprawdzenie za pośrednictwem
  [Centrum pomocy AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Wyłudzanie informacji lub socjotechniki

*Otrzymałeś powiadomienie o wyłudzeniu informacji w
[**raporcie Ręczne działania**](https://www.google.com/webmasters/tools/security-issues)
usługi Search Console:*

1. Otwórz
  [**raport dotyczący Problemów z zabezpieczeniami**](https://www.google.com/webmasters/tools/security-issues)
  ponownie w usłudze Search Console. Raport może nadal wyświetlać ostrzeżenia oraz przykładowe
  zainfekowane adresy URL widoczne wcześniej.
2. Wybierz opcję **Request a review**.

    Aby przesłać sprawdzenie, prosimy o podanie dodatkowych informacji na temat
    czynności wykonanych w celu usunięcia naruszenia zasad z witryny. Przykładowo:
    „Usunąłem stronę, która prosiła użytkowników o podanie danych osobowych”.

3. Można również poprosić o sprawdzenie pod adresem
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Poza funkcją narzędzia do raportowania dla właścicieli witryn uważających, że ich strona
  została nieprawidłowo oznaczona jako wyłudzająca informacje, raport ten aktywuje sprawdzenie
  stron wyłudzających informacje, które zostały oczyszczone w celu podniesienia ostrzeżeń.

### 4. Zaczekaj na sprawdzenie

* **Czas sprawdzania ataku spamem:** Sprawdzanie witryn zaatakowanych
  spamem może potrwać do kilku tygodni. Dzieje się tak, dlatego że sprawdzanie spamu
  może obejmować ręczne sprawdzanie lub całkowite ponowne przetworzenie
  zaatakowanych stron. W przypadku zatwierdzenia sprawdzenia Problemy z zabezpieczeniami nie będą
  dalej wyświetlać zaatakowanych typów kategorii lub przykładów zaatakowanych adresów URL.
* **Czas sprawdzania złośliwego oprogramowania typu malware:** Sprawdzanie witryn zainfekowanych
  złośliwym oprogramowaniem typu malware wymaga kilku dni. Po zakończeniu sprawdzania
  odpowiedź będzie dostępna w Twoich **Wiadomościach** w usłudze Search Console.
* **Czas sprawdzania wyłudzania informacji:** Sprawdzanie wyłudzania informacji zajmuje około dnia
. W przypadku powodzenia ostrzeżenie o wyłudzaniu informacji widoczne dla użytkowników zostanie
  usunięte, a Twoja strona może ponownie pojawiać się w wynikach wyszukiwania.

Jeśli Google stwierdzi, że Twoja witryna jest czysta, ostrzeżenia przeglądarek i
wyników wyszukiwania powinny zostać usunięte w ciągu 72 godzin.

Jeśli Google stwierdzi, że problem nie został rozwiązany, raport
Problemów z zabezpieczeniami w usłudze Search Console może wyświetlić więcej zainfekowanych przykładów
adresów URL, aby pomóc Ci, np. w kolejnym dochodzeniu. Ostrzeżenia dotyczące
witryny zaatakowanej spamem, złośliwym oprogramowaniem typu malware lub wyłudzaniem informacji pozostaną w wynikach wyszukiwania i/lub przeglądarkach jako
przestroga w celu ochrony użytkowników.

### Końcowe kroki

* **Jeśli Twoja prośba została zatwierdzona,** sprawdź czy witryna działa zgodnie z oczekiwaniami:
  strony ładują się poprawnie, a linki można kliknąć. Aby Twoja witryna była bezpieczna,
  zachęcamy wszystkich właścicieli witryn do wdrożenia planu konserwacji i bezpieczeństwa,
  tworzonego za pomocą funkcji [Oczyść i zabezpiecz witrynę](clean_site).

    Więcej informacji znajduje się w zasobach od
    [StopBadware](https://www.stopbadware.org):

      * [Przeciwdziałanie szkodliwemu oprogramowaniu: podstawy](https://www.stopbadware.org/prevent-badware-basics)
      * [Materiały dodatkowe: zaatakowane witryny](https://www.stopbadware.org/hacked-sites-resources)

* **Jeśli Twoja prośba nie została zatwierdzona,** ponownie sprawdź swoją witrynę pod kątem
  [złośliwego oprogramowania typu malware](hacked_with_malware) lub [niepożądanych](hacked_with_spam) lub jakichkolwiek
  modyfikacji, czy też nowych plików stworzonych przez hakera. Alternatywnie, możesz
  spróbować poprosić o dalszą pomoc
  [specjalistów z Twojego zespołu wsparcia](support_team).
