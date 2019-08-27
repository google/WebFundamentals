project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Wprowadzenie do właściwości overscroll-zachowania CSS.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Przejmij kontrolę nad przewijaniem: dostosowywanie efektów przeciągania i odświeżania oraz przepełnienia {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

Właściwość [`overscroll-behavior`
CSS](https://wicg.github.io/overscroll-behavior/) umożliwia programistom
zastąpienie domyślnego zachowania przewijania w przeglądarce po osiągnięciu
górnej / dolnej krawędzi treści. Przypadki użycia obejmują wyłączenie funkcji
„przeciągnij, aby odświeżyć” na telefonie komórkowym, usunięcie efektu poślizgu
i gumki podczas przewijania oraz zapobieganie przewijaniu zawartości strony, gdy
znajduje się ona pod modalną / nakładką.

`overscroll-behavior` wymaga Chrome 63+. Jest w fazie rozwoju lub rozważany
przez inne przeglądarki. Więcej informacji na stronie
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) . {:
.caution }

## tło

### Przewiń granice i przewiń łańcuchy {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Przewiń łączenie w Chrome na Androidzie.</figcaption>
</figure>

Przewijanie jest jednym z najbardziej podstawowych sposobów interakcji ze
stroną, ale niektóre wzorce UX mogą być trudne w obsłudze z powodu dziwnych
domyślnych zachowań przeglądarki. Jako przykład weź szufladę z dużą liczbą
elementów, które użytkownik może przewijać. Gdy osiągną dno, pojemnik z
przepełnieniem przestaje się przewijać, ponieważ nie ma już więcej treści do
konsumpcji. Innymi słowy, użytkownik osiąga „granicę przewijania”. Ale zauważ,
co się stanie, jeśli użytkownik będzie nadal przewijał. **Zawartość *za*
szufladą zaczyna się przewijać** ! Przewijanie jest przejmowane przez kontener
nadrzędny; sama strona główna w przykładzie.

Okazuje się, że takie zachowanie nazywa się **łańcuchem przewijania** ; domyślne
zachowanie przeglądarki podczas przewijania zawartości. Często ustawienie
domyślne jest całkiem miłe, ale czasami nie jest pożądane ani nawet
nieoczekiwane. Niektóre aplikacje mogą chcieć zapewnić inne wrażenia
użytkownika, gdy użytkownik przekroczy granicę przewijania.

### Efekt „przeciągnij, aby odświeżyć” {: #p2r }

Pull-to-refresh to intuicyjny gest spopularyzowany przez aplikacje mobilne,
takie jak Facebook i Twitter. Wyciągnięcie i opublikowanie kanału
społecznościowego tworzy nowe miejsce na załadowanie najnowszych postów. W
rzeczywistości ten konkretny UX stał się *tak popularny,* że przeglądarki
mobilne, takie jak Chrome na Androida, przyjęły ten sam efekt. Przeciągnięcie w
dół u góry strony odświeża całą stronę:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Niestandardowe ściąganie w celu odświeżenia na Twitterze <br>
podczas odświeżania kanału w PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Natywne działanie ściągania i odświeżania Chrome na Androida
<br> odświeża całą stronę.</figcaption>
  </figure>
</div>

W sytuacjach takich jak Twitter [PWA](/web/progressive-web-apps/) sensowne może
być wyłączenie natywnego działania polegającego na pobieraniu i odświeżaniu.
Czemu? W tej aplikacji prawdopodobnie nie chcesz, aby użytkownik przypadkowo
odświeżył stronę. Istnieje również potencjał, aby zobaczyć podwójną animację
odświeżania! Alternatywnie, może być lepiej dostosować działanie przeglądarki,
dopasowując ją bardziej do marki witryny. Niefortunne jest to, że tego rodzaju
dostosowanie było trudne. Programiści kończą pisanie niepotrzebnego JavaScript,
dodają [nie pasywne](/web/tools/lighthouse/audits/passive-event-listeners)
detektory dotykowe (które blokują przewijanie) lub umieszczają całą stronę w
100vw / vh `<div>` (aby zapobiec przepełnieniu strony). Te obejścia mają [dobrze
udokumentowane](https://wicg.github.io/overscroll-behavior/#intro) negatywne
skutki dla wydajności przewijania.

Możemy zrobić lepiej!

## Przedstawiamy `overscroll-behavior` {: #intro }

`overscroll-behavior`
[nieruchomość](https://wicg.github.io/overscroll-behavior/) jest nowa funkcja
CSS, które kontroluje zachowanie tego, co się dzieje, gdy dalekie przewinięcie
pojemnik (włączając w to samo stronie). Możesz go użyć, aby anulować tworzenie
łańcucha przewijania, wyłączyć / dostosować akcję „przeciągnij, aby odświeżyć”,
wyłączyć efekty `overscroll-behavior` w iOS (gdy Safari implementuje
`overscroll-behavior` ) i więcej. Najlepsze jest to, że <strong
data-md-type="double_emphasis">użycie `overscroll-behavior` nie wpływa
negatywnie na wydajność strony,</strong> podobnie jak włamania wspomniane we
wstępie!

Właściwość przyjmuje trzy możliwe wartości:

1. **auto** - Domyślnie. Zwoje powstałe na elemencie mogą rozprzestrzeniać się
na elementy przodka.

- **zawiera** - zapobiega łączeniu przewijania. Zwoje nie rozprzestrzeniają się
na przodków, ale wyświetlane są lokalne efekty w węźle. Na przykład efekt
jaśniejszego przewijania w Androidzie lub efekt gumki w iOS, który powiadamia
użytkownika, gdy przekroczy granicę przewijania. **Uwaga** : użycie
`overscroll-behavior: contain` na elemencie `html` zapobiega działaniom
nawigacyjnym overscroll.
- **none** - to samo co `contain` ale także zapobiega efektom przekroczenia w
samym węźle (np. poświata przekroczenia Androida lub gumowanie na iOS).

Uwaga: `overscroll-behavior` obsługuje również `overscroll-behavior-x` dla
`overscroll-behavior-x` i `overscroll-behavior-y` jeśli chcesz zdefiniować
zachowania tylko dla określonej osi.

Rzućmy `overscroll-behavior` na kilka przykładów, aby zobaczyć, jak używać
`overscroll-behavior` .

## Nie dopuść, aby zwoje unikały elementu o stałej pozycji {: #fixedpos }

### Scenariusz czatu {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>Przewija się także zawartość pod oknem czatu :(</figcaption>
</figure>

Rozważ stały czat umieszczony na dole strony. Chodzi o to, aby chatbox był
samodzielnym komponentem i aby przewijał się niezależnie od treści za nim.
Jednak ze względu na łańcuch przewijania dokument zaczyna przewijać, gdy tylko
użytkownik trafi na ostatnią wiadomość w historii czatów.

W przypadku tej aplikacji bardziej odpowiednie jest, aby zwoje pochodzące z
czatu pozostawały w czacie. Możemy to zrobić, dodając `overscroll-behavior:
contain` do elementu, który przechowuje wiadomości czatu:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Zasadniczo tworzymy logiczną separację między przewijanym kontekstem czatu a
stroną główną. Efektem końcowym jest to, że strona główna pozostaje umieszczona,
gdy użytkownik osiągnie górę / dół historii czatu. Zwoje, które zaczynają się w
czacie, nie rozprzestrzeniają się.

### Scenariusz nakładania strony {: #overlay }

Inną odmianą scenariusza „przewijania” jest sytuacja, w której zawartość
przewija się za **nakładką** o **stałej pozycji** . Zachowanie
`overscroll-behavior` martwych `overscroll-behavior` jest w porządku!
Przeglądarka stara się być pomocna, ale w efekcie strona wygląda na błędną.

**Przykład** - modalny z `overscroll-behavior: contain` i bez
`overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Przed</b> : zawartość strony przewija się pod
nakładką.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Po</b> : zawartość strony nie przewija się pod
nakładką.</figcaption>
  </div>
</figure>

## Wyłączanie pull-to-refresh {: #disablp2r }

**Wyłączenie działania pull-to-refresh to pojedyncza linia CSS** . Po prostu
zapobiegaj tworzeniu łańcuchów przewijania dla całego elementu definiującego
rzutnię. W większości przypadków jest to `<html>` lub `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Dzięki temu prostemu dodatkowi naprawiamy podwójne animacje „przeciągnij, aby
odświeżyć” w wersji [demo czatu](https://ebidel.github.io/demos/chatbox.html) i
możemy zamiast tego zaimplementować niestandardowy efekt, który wykorzystuje
ładniejszą animację ładowania. Cała skrzynka odbiorcza również się rozmywa, gdy
skrzynka odbiorcza jest odświeżana:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Przed</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Po</figcaption>
  </div>
</figure>

Oto fragment [pełnego
kodu](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Wyłączanie efektów blasku i gumki podczas przewijania {: #disableglow }

Aby wyłączyć efekt odbicia po uderzeniu w granicę przewijania, użyj
`overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Przed</b> : naciśnięcie granicy przewijania powoduje
świecenie.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Po</b> : świecenie wyłączone.</figcaption>
  </div>
</figure>

Uwaga: To nadal zachowuje nawigację w lewo / w prawo. Aby zapobiec nawigacji,
możesz użyć `overscroll-behavior-x: none` . Jednak [wciąż jest to
wdrażane](https://crbug.com/762023) w Chrome.

## Pełna wersja demo {: #demo }

`overscroll-behavior` , pełna [wersja
demonstracyjna](https://ebidel.github.io/demos/chatbox.html)
`overscroll-behavior` używa `overscroll-behavior` do stworzenia niestandardowej
animacji przeciągania i odświeżania oraz wyłączania przewijania z widżetu
chatbox. Zapewnia to optymalne wrażenia użytkownika, które byłyby trudne do
osiągnięcia bez `overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Zobacz demo</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Źródło</a></figcaption>
</figure>

<br>
