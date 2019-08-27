project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Renderowanie w sieci {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

Jako programiści często mamy do czynienia z decyzjami, które wpłyną na całą
architekturę naszych aplikacji. Jedną z kluczowych decyzji, które muszą podjąć
programiści, jest to, gdzie zaimplementować logikę i rendering w swojej
aplikacji. Może to być trudne, ponieważ istnieje wiele różnych sposobów na
zbudowanie strony internetowej.

Nasze zrozumienie tej przestrzeni jest potwierdzone przez naszą pracę w Chrome
rozmawiającą z dużymi witrynami w ciągu ostatnich kilku lat. Mówiąc ogólnie,
zachęcamy programistów do rozważenia renderowania serwera lub renderowania
statycznego w ramach pełnego podejścia do rehydracji.

Aby lepiej zrozumieć architektury, z których wybieramy, kiedy podejmujemy tę
decyzję, musimy mieć solidne zrozumienie każdego podejścia i spójną
terminologię, której należy używać, mówiąc o nich. Różnice między tymi
podejściami pomagają zilustrować kompromisy renderowania w Internecie przez
pryzmat wydajności.

## Terminologia {: #terminology }

**Wykonanie**

- **SSR:** Renderowanie po stronie serwera - renderowanie po stronie klienta lub
uniwersalnej aplikacji do HTML na serwerze.
- **CSR:** Renderowanie po stronie klienta - renderowanie aplikacji w
przeglądarce, zwykle przy użyciu DOM.
- **Rehydration:** „uruchamianie” widoków JavaScriptu na kliencie w taki sposób,
że ponownie wykorzystują drzewo DOM danych i dane HTML renderowane na serwerze.
- **Wstępne renderowanie:** uruchamianie aplikacji po stronie klienta w czasie
kompilacji w celu uchwycenia jej stanu początkowego jako statycznego kodu HTML.

**Występ**

- **TTFB:** Czas do pierwszego bajtu - postrzegany jako czas między kliknięciem
linku a pierwszym bitem treści.
- **FP:** First Paint - pierwszy piksel staje się widoczny dla użytkownika.
- **FCP:** First Contentful Paint - czas, kiedy żądana treść (treść artykułu
itp.) Staje się widoczna.
- **TTI:** Time To Interactive - czas, w którym strona staje się interaktywna
(zdarzenia podłączone, itp.).

## Renderowanie serwera {: #server-rendering }

*Renderowanie serwera generuje pełny kod HTML strony na serwerze w odpowiedzi na
nawigację. Pozwala to uniknąć dodatkowych podróży w obie strony w celu
pobierania danych i tworzenia szablonów na kliencie, ponieważ jest on
obsługiwany, zanim przeglądarka otrzyma odpowiedź.*

Renderowanie na serwerze generuje szybko [pierwszą
farbę](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FP) i [pierwszą
farbę](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP). Uruchamianie logiki strony i renderowanie na serwerze pozwala uniknąć
wysyłania dużej ilości kodu JavaScript do klienta, co pomaga osiągnąć szybki
[czas na
interaktywność](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
(TTI). Ma to sens, ponieważ przy renderowaniu serwera tak naprawdę po prostu
wysyłasz tekst i linki do przeglądarki użytkownika. Takie podejście może działać
dobrze w szerokim spektrum warunków urządzeń i sieci i otwiera interesujące
optymalizacje przeglądarki, takie jak strumieniowe analizowanie dokumentów.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Przy renderowaniu serwerów użytkownicy prawdopodobnie nie będą musieli czekać na
przetworzenie kodu JavaScript związanego z procesorem, zanim będą mogli
korzystać z Twojej witryny. Nawet jeśli nie można uniknąć [JS innej
firmy](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
, użycie renderowania serwera w celu zmniejszenia własnych [kosztów
JS](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
może dać ci większy „
[budżet](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
” na resztę. Jest jednak jedna podstawowa wada tego podejścia: generowanie stron
na serwerze wymaga czasu, co często może skutkować wolniejszym [czasem do
pierwszego bajtu](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB).

To, czy rendering serwera jest wystarczający dla Twojej aplikacji, zależy w
dużej mierze od tego, jaki rodzaj doświadczenia budujesz. Od dawna trwa debata
na temat poprawnych aplikacji renderowania na serwerze w porównaniu do
renderowania po stronie klienta, ale ważne jest, aby pamiętać, że możesz wybrać
renderowanie na serwerze dla niektórych stron, a nie innych. Niektóre witryny z
powodzeniem przyjęły techniki renderowania hybrydowego. Serwer
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
renderuje swoje względnie statyczne strony docelowe, jednocześnie [pobierając
wstępnie](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
JS dla stron obciążonych interakcją, co daje tym cięższym stronom renderowanym
przez klientów większą szansę szybkiego ładowania.

Wiele nowoczesnych platform, bibliotek i architektur umożliwia renderowanie tej
samej aplikacji zarówno na kliencie, jak i na serwerze. Techniki te można
wykorzystać do renderowania serwerów, jednak należy pamiętać, że architektury, w
których renderowanie odbywa się zarówno na serwerze, jak ***i*** na kliencie, są
ich własną klasą rozwiązań o bardzo różnych charakterystykach wydajnościowych i
kompromisach. React użytkownicy mogą używać [renderToString
()](https://reactjs.org/docs/react-dom-server.html) lub rozwiązań zbudowanych na
nim, takich jak [Next.js](https://nextjs.org) do renderowania na serwerze.
Użytkownicy Vue mogą zapoznać się z [przewodnikiem renderowania
serwera](https://ssr.vuejs.org) Vue lub [Nuxt](https://nuxtjs.org) . Angular ma
[uniwersalny](https://angular.io/guide/universal) . Najpopularniejsze
rozwiązania wykorzystują jednak pewną formę nawodnienia, dlatego przed wyborem
narzędzia należy pamiętać o stosowanym podejściu.

## Renderowanie statyczne {: #static-rendering }

[Renderowanie
statyczne](https://frontarm.com/articles/static-vs-server-rendering/) odbywa się
w czasie kompilacji i oferuje szybki First Paint, First Contentful Paint i Time
To Interactive - zakładając, że ilość JS po stronie klienta jest ograniczona. W
przeciwieństwie do renderowania serwera udaje mu się również osiągnąć szybki
czas do pierwszego bajtu, ponieważ kod HTML strony nie musi być generowany w
locie. Ogólnie rzecz biorąc, renderowanie statyczne oznacza utworzenie osobnego
pliku HTML dla każdego adresu URL przed czasem. Ponieważ odpowiedzi HTML są
generowane z wyprzedzeniem, statyczne rendery można wdrożyć w wielu sieciach
CDN, aby skorzystać z buforowania krawędzi.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Rozwiązania do renderowania statycznego są dostępne we wszystkich kształtach i
rozmiarach. Narzędzia takie jak [Gatsby](https://www.gatsbyjs.org) zostały
zaprojektowane tak, aby programiści czuli, że ich aplikacja jest renderowana
dynamicznie, a nie generowana jako krok kompilacji. Inni, tacy jak
[Jekyl](https://jekyllrb.com) i [Metalsmith,](https://metalsmith.io) przyjmują
swoją statyczną naturę, zapewniając podejście bardziej oparte na szablonach.

Jedną z wad statycznego renderowania jest konieczność generowania indywidualnych
plików HTML dla każdego możliwego adresu URL. Może to być trudne, a nawet
niewykonalne, gdy nie możesz przewidzieć, które adresy URL będą z wyprzedzeniem,
lub w przypadku witryn z dużą liczbą unikalnych stron.

React użytkownicy mogą być zaznajomieni z [Gatsby](https://www.gatsbyjs.org) ,
[statycznym eksportem
Next.js](https://nextjs.org/learn/excel/static-html-export/) lub
[Navi](https://frontarm.com/navi/) - wszystko to ułatwia
[pisanie](https://nextjs.org/learn/excel/static-html-export/) przy użyciu
komponentów. Jednak ważne jest, aby zrozumieć różnicę między renderowaniem
statycznym a renderowaniem wstępnym: statycznie renderowane strony są
interaktywne bez potrzeby wykonywania dużo JS po stronie klienta, podczas gdy
wstępne renderowanie poprawia pierwszą farbę lub pierwszą zawartość farby
pojedynczej strony, którą należy uruchomić klient, aby strony były naprawdę
interaktywne.

Jeśli nie masz pewności, czy dane rozwiązanie renderuje statycznie, czy
renderuje wstępnie, spróbuj tego testu: wyłącz JavaScript i załaduj utworzone
strony internetowe. W przypadku stron renderowanych statycznie większość funkcji
będzie nadal istnieć bez włączonej obsługi JavaScript. W przypadku wstępnie
wstępnie wydrukowanych stron mogą nadal istnieć podstawowe funkcje, takie jak
łącza, ale większość strony będzie obojętna.

Kolejnym przydatnym testem jest spowolnienie sieci za pomocą Chrome DevTools i
obserwowanie, ile JavaScript zostało pobrane, zanim strona stanie się
interaktywna. Wstępne renderowanie zwykle wymaga większej liczby skryptów
JavaScript, aby uzyskać interaktywność, a JavaScript jest zwykle bardziej
złożony niż podejście do [progresywnego
ulepszania](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
stosowane w renderowaniu statycznym.

## Renderowanie serwera a renderowanie statyczne {: #server-vs-static }

Renderowanie serwerów nie jest srebrną kulą - jego dynamiczny charakter może
wiązać się ze
[znacznymi](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
kosztami
[obliczeniowymi](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
. Wiele rozwiązań renderujących serwer nie wypłukuje się wcześnie, może opóźnić
TTFB lub podwoić wysyłane dane (np. Stan wbudowany używany przez JS na
kliencie). W React funkcja renderToString () może działać wolno, ponieważ jest
synchroniczna i jednowątkowa. Uzyskiwanie prawidłowego renderowania przez serwer
może wymagać znalezienia lub zbudowania rozwiązania do [buforowania
komponentów](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, zarządzania zużyciem pamięci, stosowania technik
[zapamiętywania](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
i wielu innych problemów. Zasadniczo przetwarzasz / przebudowujesz tę samą
aplikację wiele razy - raz na kliencie i raz na serwerze. To, że renderowanie na
serwerze może sprawić, że coś pokaże się wcześniej, nie oznacza nagle, że masz
mniej pracy.

Renderowanie na serwerze tworzy kod HTML na żądanie dla każdego adresu URL, ale
może być wolniejszy niż tylko wyświetlanie statycznie renderowanej treści. Jeśli
możesz włożyć dodatkową pracę nóg, renderowanie serwera + [buforowanie
HTML](https://freecontent.manning.com/caching-in-react/) może znacznie skrócić
czas renderowania serwera. Zaletą renderowania na serwerze jest możliwość
pobierania większej liczby „żywych” danych i odpowiadania na pełniejszy zestaw
żądań niż jest to możliwe przy renderowaniu statycznym. Strony wymagające
personalizacji są konkretnym przykładem rodzaju żądania, które nie działałoby
dobrze przy renderowaniu statycznym.

Renderowanie serwera może również przedstawiać interesujące decyzje podczas
budowania [PWA](https://developers.google.com/web/progressive-web-apps/) . Czy
lepiej jest używać buforowania całego [serwisu dla pracowników
serwisu](https://developers.google.com/web/fundamentals/primers/service-workers/)
, czy po prostu renderować poszczególne elementy treści na serwerze?

## Renderowanie po stronie klienta (CSR) {: #csr }

*Renderowanie po stronie klienta (CSR) oznacza renderowanie stron bezpośrednio w
przeglądarce przy użyciu JavaScript. Cała logika, pobieranie danych, szablony i
routing są obsługiwane na kliencie, a nie na serwerze.*

Renderowanie po stronie klienta może być trudne i szybkie w przypadku urządzeń
mobilnych. Może osiągnąć wydajność czystego renderowania serwera, wykonując
minimalną pracę, utrzymując [napięty budżet
JavaScript](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144)
i zapewniając wartość przy jak najmniejszej [liczbie
RTT](https://en.wikipedia.org/wiki/Round-trip_delay_time) . Krytyczne skrypty i
dane można dostarczyć wcześniej za pomocą [HTTP Push / Server
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) lub
`<link rel=preload>` , co przyspieszy działanie parsera. Wzory takie jak
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
są warte oceny, aby początkowa i następna nawigacja były natychmiastowe.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

Głównym minusem renderowania po stronie klienta jest to, że wymagana liczba
skryptów JavaScript rośnie wraz ze wzrostem aplikacji. Staje się to szczególnie
trudne dzięki dodaniu nowych bibliotek JavaScript, funkcji wypełniania i kodu
innej firmy, które konkurują o moc przetwarzania i często muszą być przetwarzane
przed wyświetleniem zawartości strony. Doświadczenia zbudowane przy użyciu CSR,
które opierają się na dużych pakietach JavaScript, powinny rozważyć [agresywne
dzielenie
kodu](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
i leniwe ładowanie kodu JavaScript - „obsługuj tylko to, czego potrzebujesz,
kiedy jest to potrzebne”. W przypadku doświadczeń z małą lub zerową
interaktywnością rendering serwera może stanowić bardziej skalowalne rozwiązanie
tych problemów.

Dla osób budujących aplikację jednostronicową identyfikacja głównych części
interfejsu użytkownika współdzielonego przez większość stron oznacza, że możesz
zastosować technikę [buforowania powłoki
aplikacji](https://developers.google.com/web/updates/2015/11/app-shell) . W
połączeniu z pracownikami usług może to znacznie poprawić postrzeganą wydajność
podczas wielokrotnych wizyt.

## Łączenie renderowania serwerów i CSR poprzez rehydrację {: #rehydration }

Podejście to, często określane jako Universal Rendering lub po prostu „SSR”,
próbuje wygładzić kompromisy między renderowaniem po stronie klienta a
renderowaniem serwera, wykonując oba te elementy. Żądania nawigacji, takie jak
pełne ładowanie strony lub ponowne ładowanie, są obsługiwane przez serwer, który
renderuje aplikację do HTML, a następnie JavaScript i dane używane do
renderowania są osadzane w wynikowym dokumencie. Po starannym wdrożeniu uzyskuje
się szybkie Pierwsze zadowolenie z malowania, podobnie jak renderowanie serwera,
a następnie „podnosi”, renderując ponownie na kliencie przy użyciu techniki
zwanej [(re)
hydratacją](https://docs.electrode.io/guides/general/server-side-data-hydration)
. To nowatorskie rozwiązanie, ale może mieć poważne wady wydajności.

Podstawowym minusem SSR z nawadnianiem jest to, że może mieć znaczący negatywny
wpływ na Czas na Interakcję, nawet jeśli poprawi Pierwszą Farbę. Strony SSR
często wyglądają na zwodniczo załadowane i interaktywne, ale w rzeczywistości
nie mogą odpowiedzieć na dane wejściowe, dopóki nie zostanie wykonane JS po
stronie klienta i nie zostaną dołączone procedury obsługi zdarzeń. Na telefonie
komórkowym może to potrwać kilka sekund, a nawet minut.

Być może sam tego doświadczyłeś - przez pewien czas po tym, jak strona wygląda
na załadowaną, kliknięcie lub stuknięcie nic nie robi. To szybko staje się
frustrujące ... *„Dlaczego nic się nie dzieje? Dlaczego nie mogę przewijać?*

### Problem z nawodnieniem: Jedna aplikacja w cenie dwóch {: #rehydration-issues }

Problemy z nawodnieniem mogą często być gorsze niż opóźniona interaktywność z
powodu JS. Aby JavaScript po stronie klienta mógł dokładnie „odebrać” w miejscu,
w którym serwer przerwał, bez konieczności ponownego żądania wszystkich danych,
które serwer wykorzystał do renderowania HTML, obecne rozwiązania SSR generalnie
serializują odpowiedź z interfejsu użytkownika zależności danych w dokumencie
jako znaczniki skryptu. Wynikowy dokument HTML zawiera wysoki poziom duplikacji:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Jak widać, serwer zwraca opis interfejsu użytkownika aplikacji w odpowiedzi na
żądanie nawigacji, ale zwraca także dane źródłowe użyte do skomponowania tego
interfejsu użytkownika oraz pełną kopię implementacji interfejsu użytkownika,
która następnie uruchamia się na kliencie . Dopiero po zakończeniu ładowania
pliku bundle.js i wykonania ten interfejs użytkownika staje się interaktywny.

Wskaźniki wydajności zebrane z prawdziwych stron internetowych przy użyciu
rehydracji SSR wskazują, że jego stosowanie powinno być mocno odradzane.
Ostatecznie powód sprowadza się do User Experience: niezwykle łatwo jest
pozostawić użytkowników w „niesamowitej dolinie”.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

Jednak istnieje nadzieja na SSR z nawodnieniem. W krótkim okresie tylko użycie
SSR dla zawartości wysoce buforowalnej może zmniejszyć opóźnienie TTFB, dając
wyniki podobne do wstępnego renderowania. Nawadnianie
[przyrostowe](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, progresywne lub częściowe może być kluczem do uczynienia tej techniki bardziej
opłacalną w przyszłości.

## Renderowanie serwera strumieniowego i progresywne nawodnienie {: #progressive-rehydration }

W ciągu ostatnich kilku lat renderowanie serwerów uległo wielu zmianom.

[Renderowanie serwera
strumieniowego](https://zeit.co/blog/streaming-server-rendering-at-spectrum)
umożliwia wysyłanie fragmentów HTML, które przeglądarka może renderować
stopniowo po otrzymaniu. Może to zapewnić szybką pierwszą farbę i pierwszą
satysfakcjonującą farbę, gdy znaczniki docierają do użytkowników szybciej. W
React strumienie są asynchroniczne w [renderToNodeStream
()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) - w
porównaniu do synchronicznego renderToString - oznacza, że przeciwciśnienie jest
dobrze obsługiwane.

Warto również mieć na uwadze stopniowe nawadnianie, a coś, co React
[badał](https://github.com/facebook/react/pull/14717) . Dzięki takiemu podejściu
poszczególne elementy aplikacji renderowanej na serwerze są „uruchamiane” w
czasie, zamiast obecnego wspólnego podejścia polegającego na inicjowaniu całej
aplikacji na raz. Może to pomóc w zmniejszeniu ilości kodu JavaScript wymaganego
do interaktywnej strony, ponieważ aktualizacja części strony o niskim
priorytecie po stronie klienta może zostać odroczona, aby zapobiec blokowaniu
głównego wątku. Może także pomóc uniknąć jednego z najczęstszych pułapek
nawadniania SSR, w którym drzewo DOM renderowane na serwerze zostaje zniszczone,
a następnie natychmiast odbudowane - najczęściej dlatego, że początkowe
synchroniczne renderowanie po stronie klienta wymaga danych, które nie są
jeszcze w pełni gotowe, być może czekając na Promise rozkład.

### Częściowe nawodnienie {: #partial-rehydration }

Częściowe nawodnienie okazało się trudne do wdrożenia. Podejście to stanowi
rozszerzenie koncepcji stopniowego nawadniania, polegające na analizie
poszczególnych elementów (komponentów / widoków / drzew), które mają być
stopniowo nawadniane, i identyfikowane są te o małej interaktywności lub bez
reaktywności. Dla każdej z tych w większości statycznych części odpowiedni kod
JavaScript jest następnie przekształcany w obojętne referencje i funkcje
dekoracyjne, zmniejszając ich ślad po stronie klienta do niemal zera. Podejście
z częściowym uwodnieniem wiąże się z własnymi problemami i kompromisami. Stanowi
to pewne interesujące wyzwania dla buforowania, a nawigacja po stronie klienta
oznacza, że nie możemy zakładać, że renderowany przez serwer HTML dla obojętnych
części aplikacji będzie dostępny bez pełnego załadowania strony.

### Renderowanie trisomorficzne {: #trisomorphic }

Jeśli [pracownicy
usług](https://developers.google.com/web/fundamentals/primers/service-workers/)
są dla ciebie opcją, rendering „trisomorficzny” może być również interesujący.
Jest to technika, w której można użyć renderowania serwera przesyłania
strumieniowego do nawigacji początkowej / innej niż JS, a następnie poprosić
pracownika usługi o renderowanie kodu HTML dla nawigacji po jego zainstalowaniu.
Może to aktualizować buforowane komponenty i szablony oraz umożliwia nawigację w
stylu SPA w celu renderowania nowych widoków w tej samej sesji. Takie podejście
działa najlepiej, gdy można udostępniać ten sam kod szablonów i routingu między
serwerem, stroną klienta i pracownikiem serwisu.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## Zagadnienia związane z SEO {: #seo }

Zespoły często uwzględniają wpływ SEO przy wyborze strategii renderowania w
Internecie. Renderowanie serwerów jest często wybierane w celu zapewnienia
„pełnego wyglądu” przeszukiwaczy, które mogą z łatwością interpretować. Roboty
[mogą rozumieć JavaScript](https://web.dev/discoverable/how-search-works) , ale
często istnieją [ograniczenia,](/search/docs/guides/rendering) o których należy
pamiętać w sposobie renderowania. Renderowanie po stronie klienta może działać,
ale często nie bez dodatkowych testów i pracy nóg. Ostatnio [dynamiczne
renderowanie](/search/docs/guides/dynamic-rendering) stało się również opcją
wartą rozważenia, jeśli twoja architektura jest silnie napędzana przez
JavaScript po stronie klienta.

W razie wątpliwości narzędzie [Mobile Friendly
Test](https://search.google.com/test/mobile-friendly) jest nieocenione przy
testowaniu, czy wybrane przez Ciebie podejście spełnia Twoje oczekiwania.
Pokazuje wizualny podgląd wyglądu strony dla robota Google, znalezioną
serializowaną treść HTML (po uruchomieniu JavaScript) oraz wszelkie błędy
napotkane podczas renderowania.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## Kończę ... {: #wrapup }

Podejmując decyzję o podejściu do renderowania, zmierz i zrozum, jakie są twoje
wąskie gardła. Zastanów się, czy renderowanie statyczne lub renderowanie na
serwerze może zapewnić ci 90% możliwości. Całkowicie dobrze jest wysyłać HTML z
minimalną liczbą JS, aby uzyskać interaktywne wrażenia. Oto przydatna
infografika przedstawiająca spektrum serwer-klient:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Kredyty {: #credits }

Dziękujemy wszystkim za recenzje i inspiracje:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson i Sebastian
Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
