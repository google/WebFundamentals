project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Einführung in die CSS-Eigenschaft für das Overscroll-Verhalten.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Übernehmen Sie die Kontrolle über Ihre Schriftrolle: Anpassen von Pull-to-Refresh- und Überlauf-Effekten {: .page-title }

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

Mit der [CSS `overscroll-behavior`](https://wicg.github.io/overscroll-behavior/)
Eigenschaft für das Überlaufverhalten können Entwickler das standardmäßige
Überlauf- [`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/)
des Browsers außer Kraft setzen, wenn sie den oberen bzw. unteren Rand des
Inhalts erreichen. Zu den Anwendungsfällen gehört das Deaktivieren der
Pull-to-Refresh-Funktion auf Mobilgeräten, das Entfernen von Überrollglühen und
Gummibandeffekten sowie das Verhindern des Bildlaufs von Seiteninhalten, wenn
sie sich unter einem Modal / Overlay befinden.

`overscroll-behavior` erfordert Chrome 63+. Es befindet sich in der Entwicklung
oder wird von anderen Browsern in Betracht gezogen. Weitere Informationen finden
Sie unter
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) . {:
.caution }

## Hintergrund

### Bildlaufgrenzen und Bildlaufverkettung {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Scrollverkettung unter Chrome Android.</figcaption>
</figure>

Das Scrollen ist eine der grundlegendsten Möglichkeiten, mit einer Seite zu
interagieren. Bestimmte UX-Muster können jedoch aufgrund des skurrilen
Standardverhaltens des Browsers schwierig zu handhaben sein. Nehmen Sie zum
Beispiel eine App-Schublade mit einer großen Anzahl von Elementen, durch die der
Benutzer möglicherweise scrollen muss. Wenn sie den Boden erreichen, hört der
Überlaufbehälter auf zu scrollen, da kein Inhalt mehr zu verbrauchen ist. Mit
anderen Worten, der Benutzer erreicht eine "Bildlaufgrenze". Beachten Sie
jedoch, was passiert, wenn der Benutzer weiter scrollt. **Der Inhalt *hinter*
der Schublade beginnt zu scrollen** ! Das Scrollen wird vom übergeordneten
Container übernommen. die Hauptseite selbst im Beispiel.

Es stellt sich heraus, dass dieses Verhalten als **Scroll-Verkettung bezeichnet
wird** . Das Standardverhalten des Browsers beim Scrollen von Inhalten. Oft ist
der Standard ziemlich gut, aber manchmal ist er nicht wünschenswert oder sogar
unerwartet. Bestimmte Apps möchten möglicherweise eine andere Benutzererfahrung
bieten, wenn der Benutzer eine Bildlaufbegrenzung erreicht.

### Der Pull-to-Refresh-Effekt {: #p2r }

Pull-to-Refresh ist eine intuitive Geste, die von mobilen Apps wie Facebook und
Twitter verwendet wird. Durch das Aufrufen und Freigeben eines sozialen Feeds
wird neuer Speicherplatz für neuere Posts erstellt, die geladen werden können.
Tatsächlich ist dieses spezielle UX *so populär* geworden *,* dass mobile
Browser wie Chrome auf Android den gleichen Effekt übernommen haben. Wenn Sie
oben auf der Seite nach unten streichen, wird die gesamte Seite aktualisiert:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Das benutzerdefinierte Pull-to-Refresh von Twitter <br> beim
Aktualisieren eines Feeds in ihrer PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Die native Pull-to-Refresh-Aktion von Chrome Android <br>
Aktualisiert die gesamte Seite.</figcaption>
  </figure>
</div>

In Situationen wie dem Twitter- [PWA](/web/progressive-web-apps/) kann es
sinnvoll sein, die native Pull-to-Refresh-Aktion zu deaktivieren. Warum? In
dieser App möchten Sie wahrscheinlich nicht, dass der Benutzer die Seite
versehentlich aktualisiert. Es besteht auch die Möglichkeit, eine doppelte
Aktualisierungsanimation zu sehen! Alternativ ist es möglicherweise sinnvoller,
die Aktion des Browsers anzupassen und enger an der Marke der Site auszurichten.
Der unglückliche Teil ist, dass es schwierig war, diese Art der Anpassung
durchzuführen. Entwickler schreiben am Ende unnötiges JavaScript, fügen [nicht
passive](/web/tools/lighthouse/audits/passive-event-listeners) Touch-Listener
hinzu (die das Scrollen blockieren) oder kleben die gesamte Seite in ein 100-vw
/ vh- `<div>` (um ein Überlaufen der Seite zu verhindern). Diese
Problemumgehungen wirken sich
[nachweislich](https://wicg.github.io/overscroll-behavior/#intro) negativ auf
die Bildlaufleistung aus.

Wir können es besser machen!

## `overscroll-behavior` einführen {: #intro }

Die [Eigenschaft](https://wicg.github.io/overscroll-behavior/)
`overscroll-behavior` ist eine neue CSS-Funktion, die das Verhalten steuert,
wenn Sie einen Container (einschließlich der Seite selbst) `overscroll-behavior`
. Sie können damit die Scroll-Verkettung abbrechen, die Pull-to-Refresh-Aktion
deaktivieren / anpassen, Gummibandeffekte unter iOS deaktivieren (wenn Safari
das `overscroll-behavior` implementiert) und vieles mehr. Das Beste daran ist,
dass die <strong data-md-type="double_emphasis">Verwendung des
`overscroll-behavior` die `overscroll-behavior` nicht beeinträchtigt,</strong>
wie dies bei den im Intro erwähnten Hacks der Fall ist!

Die Eigenschaft nimmt drei mögliche Werte an:

1. **auto** - Standard. Rollen, die von dem Element ausgehen, können sich auf
Vorgängerelemente ausbreiten.

- **Enthalten** - Verhindert das Verketten von Bildläufen. Scrolls werden nicht
an Vorfahren weitergegeben, aber lokale Effekte innerhalb des Knotens werden
angezeigt. Zum Beispiel der Overscroll-Glow-Effekt bei Android oder der
Rubberbanding-Effekt bei iOS, der den Benutzer benachrichtigt, wenn er eine
Bildlaufbegrenzung erreicht hat. **Hinweis** : Verwenden des
`overscroll-behavior: contain` für das `html` Element, um
Overscroll-Navigationsaktionen zu verhindern.
- **none** - wie `contain` , verhindert aber auch Übersteuerungseffekte
innerhalb des Knotens selbst (z. B. Android-Übersteuerungsglühen oder
iOS-Gummibanding).

Hinweis: `overscroll-behavior` unterstützt auch Kurzformen für
`overscroll-behavior-x` und `overscroll-behavior-y` wenn Sie nur Verhalten für
eine bestimmte Achse definieren möchten.

Sehen wir uns einige Beispiele an, um zu sehen, wie man das
`overscroll-behavior` .

## Verhindern, dass Schriftrollen ein Element mit fester Position verlassen {: #fixedpos }

### Das Chatbox-Szenario {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
<figcaption>Der Inhalt unterhalb des Chatfensters scrollt ebenfalls
:(</figcaption>
</figure>

Stellen Sie sich eine fest positionierte Chatbox vor, die sich am unteren Rand
der Seite befindet. Die Chatbox soll eine eigenständige Komponente sein und vom
dahinter liegenden Inhalt getrennt gescrollt werden. Aufgrund der
Bildlaufverkettung beginnt das Dokument jedoch mit dem Bildlauf, sobald der
Benutzer die letzte Nachricht im Chat-Verlauf abruft.

Für diese App ist es sinnvoller, Rollen, die aus der Chatbox stammen, im Chat zu
belassen. Um dies zu erreichen, fügen `overscroll-behavior: contain` dem
Element, in dem sich die Chat-Nachrichten befinden, das `overscroll-behavior:
contain` :

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Im Wesentlichen stellen wir eine logische Trennung zwischen dem Bildlaufkontext
der Chatbox und der Hauptseite her. Das Endergebnis ist, dass die Hauptseite
weiterhin angezeigt wird, wenn der Benutzer den oberen / unteren Rand des
Chat-Verlaufs erreicht. Rollen, die in der Chatbox beginnen, breiten sich nicht
aus.

### Das Seitenüberlagerungsszenario {: #overlay }

Eine weitere Variante des Szenarios "Underscroll" ist das Scrollen von Inhalten
hinter einer **Überlagerung mit festen Positionen** . Ein totes Giveaway-
`overscroll-behavior` ist angebracht! Der Browser ist bemüht, hilfreich zu sein,
die Website sieht jedoch fehlerhaft aus.

**Beispiel** - modal mit und ohne `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Vorher</b> : Der Seiteninhalt wird unter der Überlagerung
angezeigt.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>After</b> : Der Seiteninhalt wird nicht unter der
Überlagerung angezeigt.</figcaption>
  </div>
</figure>

## Pull-to-Refresh deaktivieren {: #disablp2r }

**Das Deaktivieren der Pull-to-Refresh-Aktion ist eine einzelne Zeile von CSS**
. Vermeiden Sie einfach die Verkettung von Bildläufen für das gesamte
Ansichtsfenster definierende Element. In den meisten Fällen ist das `<html>`
oder `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Mit diesem einfachen Zusatz
[korrigieren](https://ebidel.github.io/demos/chatbox.html) wir die doppelten
Pull-to-Refresh-Animationen in der
[Chatbox-Demo](https://ebidel.github.io/demos/chatbox.html) und können
stattdessen einen benutzerdefinierten Effekt implementieren, der eine
übersichtlichere Ladeanimation verwendet. Der gesamte Posteingang verschwimmt
ebenfalls, wenn der Posteingang aktualisiert wird:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Vor</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Nach dem</figcaption>
  </div>
</figure>

Hier ist ein Ausschnitt des [vollständigen
Codes](https://github.com/ebidel/demos/blob/master/chatbox.html) :

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

## Deaktivieren von Überrollglühen und Gummibandeffekten {: #disableglow }

Verwenden Sie " `overscroll-behavior-y: none` um den Bounce-Effekt zu
deaktivieren, wenn Sie eine `overscroll-behavior-y: none`

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
<figcaption><b>Vorher</b> : Wenn Sie auf die Bildlaufbegrenzung treffen,
leuchtet diese auf.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Nachher</b> : Glühen deaktiviert.</figcaption>
  </div>
</figure>

Hinweis: Die Navigation mit dem Wischen nach links / rechts bleibt dabei
erhalten. Um Navigationen zu verhindern, können Sie `overscroll-behavior-x:
none` . Dies wird jedoch [noch](https://crbug.com/762023) in Chrome
[implementiert](https://crbug.com/762023) .

## Vollständige Demo {: #demo }

Alles in allem verwendet die vollständige
[Chatbox-Demo](https://ebidel.github.io/demos/chatbox.html) das
`overscroll-behavior` , um eine benutzerdefinierte Pull-to-Refresh-Animation zu
erstellen und das Verlassen des Chatbox-Widgets durch Bildlauf zu deaktivieren.
Dies bietet ein optimales Benutzererlebnis, das ohne CSS- `overscroll-behavior`
zu erreichen gewesen wäre.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Demo ansehen</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Quelle</a></figcaption>
</figure>

<br>
