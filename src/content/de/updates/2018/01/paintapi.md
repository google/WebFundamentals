project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS Paint API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Neue Möglichkeiten in Chrome 65 CSS Paint API (auch bekannt als "CSS Custom Paint" oder "Houdini's Paint Worlet") wird in Chrome Stable standardmäßig aktiviert. Was ist es? Was kannst du damit machen? Und wie funktioniert es? Nun, lies weiter, willst du '...


Mit CSS Paint API können Sie ein Bild programmgesteuert generieren, wenn eine CSS-Eigenschaft ein Bild erwartet. Eigenschaften wie `background-image` oder `border-image` werden normalerweise mit `url()` verwendet, um eine Image-Datei oder mit CSS-integrierten Funktionen wie `linear-gradient()` zu laden. Anstatt diese zu verwenden, können Sie jetzt `paint(myPainter)` verwenden, um auf ein _paint-Worklet_ zu verweisen.

### Ein Malarbeitsblatt schreiben

Um ein Arbeitsblatt namens `myPainter` zu definieren, müssen Sie eine CSS-Arbeitsblattdatei mit `CSS.paintWorklet.addModule('my-paint-worklet.js')` laden. In dieser Datei können wir die `registerPaint` -Funktion verwenden, um eine Paint Workle-Klasse zu registrieren:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Innerhalb des `paint()` -Callbacks können wir `ctx` genauso verwenden wie `CanvasRenderingContext2D` , wie wir es aus `<canvas>` kennen. Wenn Sie wissen, wie Sie in `<canvas>` zeichnen, können Sie ein Farbarbeitsblatt einzeichnen! `geometry` sagt uns die Breite und die Höhe der Leinwand, die uns zur Verfügung steht. `properties` Ich werde später in diesem Artikel erklären.

Note: Der Kontext eines Malarbeitsbereichs entspricht nicht 100% dem `<canvas>` -Kontext. Ab sofort fehlen Text Rendering Methoden und aus Sicherheitsgründen können Sie keine Pixel aus dem Canvas zurücklesen.

Als einleitendes Beispiel schreiben wir ein Schachbrett-Paint-Arbeitsblatt und verwenden es als Hintergrundbild eines `<textarea>` . (Ich benutze ein Textfeld, da es standardmäßig in der Größe veränderbar ist.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Wenn Sie `<canvas>` in der Vergangenheit verwendet haben, sollte dieser Code bekannt sein. Sehen Sie das Live [Demo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) hier.

Note: Wie bei fast allen neuen APIs ist die CSS Paint-API nur über HTTPS (oder `localhost` ) verfügbar.

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="Textarea mit einem Schachbrettmuster als Hintergrundbild.">

Der Unterschied zur Verwendung eines allgemeinen Hintergrundbildes besteht darin, dass das Muster bei Bedarf immer dann neu gezeichnet wird, wenn der Benutzer die Größe des Textfelds ändert. Dies bedeutet, dass das Hintergrundbild immer genau so groß ist, wie es sein muss, einschließlich der Kompensation für Anzeigen mit hoher Dichte.

Das ist ziemlich cool, aber es ist auch ziemlich statisch. Würden wir jedes Mal ein neues Arbeitsblatt schreiben wollen, wenn wir dasselbe Muster, aber mit unterschiedlich großen Quadraten wollten? Die Antwort ist nein!

### Parametriere dein Worklet

Glücklicherweise kann das Paint Worlet auf andere CSS-Eigenschaften zugreifen, wo der zusätzliche Parameter `properties` ins Spiel kommt. Wenn Sie der Klasse ein statisches `inputProperties` -Attribut zuweisen, können Sie Änderungen an jeder CSS-Eigenschaft, einschließlich benutzerdefinierter Eigenschaften, abonnieren. Die Werte werden Ihnen über den Parameter `properties` übergeben.

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Jetzt können wir den gleichen Code für alle Arten von Schachbrettern verwenden. Aber noch besser, wir können jetzt in DevTools gehen und [fiedeln mit den Werten](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) bis wir das richtige Aussehen finden.

<div style="display: flex; justify-content: center">  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: Es wäre auch schön, die Farben zu parametrisieren, oder? Die Spezifikation ermöglicht der `paint()` -Funktion, eine Liste von Argumenten zu übernehmen. Diese Funktion ist in Chrome noch nicht implementiert, da sie sich stark auf die Houdini API für Eigenschaften und Werte stützt, die noch einige Zeit benötigt, bevor sie ausgeliefert werden kann.

## Browser, die kein Farbarbeitsgerät unterstützen Zum Zeitpunkt der Erstellung dieses Handbuchs wurde in Chrome nur ein Farbarbeitsblatt implementiert. Während es von allen anderen Browser-Anbietern positive Signale gibt, gibt es keine großen Fortschritte. Um auf dem Laufenden zu bleiben, überprüfe regelmäßig [Ist Houdini Ready?](https://ishoudinireadyyet.com). In der Zwischenzeit sollten Sie die progressive Erweiterung verwenden, damit der Code auch dann ausgeführt wird, wenn keine Unterstützung für Paint Worlet vorhanden ist. Um sicherzustellen, dass die Dinge wie erwartet funktionieren, müssen Sie Ihren Code an zwei Stellen anpassen: CSS und JS.

Die Unterstützung für das Farbarbeitsblatt in JS kann durch Überprüfen des `CSS` -Objekts ermittelt werden:

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Für die CSS-Seite haben Sie zwei Möglichkeiten. Sie können `@supports` verwenden:

    @supports (background: paint(id)) {
      /* ... */
    }

Ein kompakterer Trick besteht darin, die Tatsache zu verwenden, dass CSS eine vollständige Eigenschaftsdeklaration ungültig macht und anschließend ignoriert, wenn eine unbekannte Funktion darin enthalten ist. Wenn Sie eine Eigenschaft zweimal angeben - zuerst ohne Paint-Arbeitsblatt und dann mit dem Paint-Arbeitsblatt - erhalten Sie eine progressive Erweiterung:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

In Browsern mit Unterstützung für Paint Worlet überschreibt die zweite Deklaration von `background-image` die erste. In Browsern ohne Unterstützung für Paint Worletlet ist die zweite Deklaration ungültig und wird verworfen, sodass die erste Deklaration wirksam bleibt.

### CSS Paint Polyfill

Für viele Anwendungen ist es auch möglich, [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) zu verwenden, das modernen Browsern CSS-Unterstützung für benutzerdefinierte Paint- und Paint-Worklets hinzufügt.

## Use Cases Es gibt viele Anwendungsfälle für Paint Worklets, von denen einige offensichtlicher sind als andere. Einer der offensichtlichsten ist die Verwendung von Paint Workles, um die Größe Ihres DOM zu reduzieren. Oft werden Elemente hinzugefügt, um Verschönerungen mithilfe von CSS zu erstellen. Zum Beispiel enthält in [Material Design Lite](https://getmdl.io) die Schaltfläche mit dem Welleneffekt 2 zusätzliche `<span>` -Elemente, um die Welligkeit selbst zu implementieren. Wenn Sie viele Schaltflächen haben, kann dies zu einer Reihe von DOM-Elementen führen und zu einer Verschlechterung der Leistung auf Mobilgeräten führen. Wenn Sie stattdessen den Welleneffekt mit dem Paint-Arbeitsblatt (1) implementieren, erhalten Sie 0 zusätzliche Elemente und nur ein Malarbeitselement. Darüber hinaus haben Sie etwas, das viel einfacher anzupassen und zu parametrisieren ist.

Ein weiterer Vorteil der Verwendung von Paint Worlet ist, dass in den meisten Szenarien eine Lösung mit Paint Worlet klein in Bytes ist. Natürlich gibt es einen Kompromiss: Ihr Malcode wird immer dann ausgeführt, wenn sich die Leinwandgröße oder einer der Parameter ändert. Wenn Ihr Code also komplex ist und lange braucht, könnte er jank einführen. Chrome arbeitet daran, Farbarbeitselemente vom Hauptthread zu entfernen, sodass selbst lang laufende Farbarbeitsflächen die Reaktionsfähigkeit des Hauptthreads nicht beeinträchtigen.

Für mich ist die aufregendste Aussicht, dass die Paint-Worklet-Software ein effizientes Polyfilling von CSS-Funktionen ermöglicht, die ein Browser noch nicht hat. Ein Beispiel wäre Polyfill [Kegelschnittgradienten](https://lab.iamvdo.me/houdini/conic-gradient), bis sie nativ in Chrome landen. Ein anderes Beispiel: In einem CSS-Meeting wurde entschieden, dass Sie jetzt mehrere Rahmenfarben haben können. Während dieses Meeting noch lief, schrieb mein Kollege Ian Kilpatrick [1] für dieses neue CSS-Verhalten einen Paintfill (1) mit Hilfe eines Paint Worletts.

## Denken außerhalb der "Box" Die meisten Menschen beginnen, über Hintergrundbilder und Randbilder nachzudenken, wenn sie etwas über das Paintworklet lernen. Ein weniger intuitiver Anwendungsfall für Farbarbeitsflächen ist `mask-image` , um DOM-Elemente mit beliebigen Formen zu versehen. Zum Beispiel ein [Diamant](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="Ein DOM-Element in Form eines Diamanten.">

`mask-image` nimmt ein Bild, das die Größe des Elements hat. Bereiche, in denen das Maskenbild transparent ist, ist das Element transparent. Bereiche, in denen das Maskenbild undurchsichtig ist, das Element undurchsichtig.

## Jetzt in Chrome

Paint Worklet war eine Weile in Chrome Canary. Mit Chrome 65 ist es standardmäßig aktiviert. Probieren Sie die neuen Möglichkeiten aus, die das Malwerk öffnet und zeigen Sie uns, was Sie gebaut haben! Für mehr Inspiration, werfen Sie einen Blick auf [Vincent De Oliveira's Sammlung](https://lab.iamvdo.me/houdini/).

Note: Breakpoints werden derzeit in der CSS Paint-API nicht unterstützt, werden jedoch in einer späteren Version von Chrome aktiviert.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}