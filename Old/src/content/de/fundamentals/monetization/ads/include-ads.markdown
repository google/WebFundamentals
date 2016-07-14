---
title: "AdSense-Anzeigen auf Ihrer Website schalten"
description: "Der folgende Leitfaden bietet Ihnen eine schrittweise Anleitung zur Schaltung von Anzeigen auf Ihrer Website. Erstellen Sie ein AdSense-Konto sowie Anzeigenblöcke, platzieren Sie die Blöcke auf Ihrer Website, konfigurieren Sie die Zahlungseinstellungen und erhalten Sie Zahlungen."
updated_on: 2014-07-31
  - petelepage
key-takeaways:
  tldr: 
    - "Um ein AdSense-Konto erstellen zu können, müssen Sie 18 Jahre alt sein, über ein Google-Konto verfügen und eine Adresse angeben."
    - "Ihre Website muss online sein, bevor Sie einen Antrag einreichen, und der Inhalt der Website muss den AdSense-Richtlinien entsprechen."
    - "Erstellen Sie Responsive-Anzeigenblöcke, damit die Größe Ihrer Anzeigen immer passend ist, ganz egal, auf welchem Gerät sich der Nutzer die Anzeigen ansieht."
    - "Überprüfen Sie die Zahlungseinstellungen und warten Sie, bis die ersten Zahlungen eingehen."
notes:
  crawler:
    - "Vergewissern Sie sich, dass der AdSense-Crawler auf Ihre Website zugreifen kann. Weitere Informationen finden Sie in <a href='https://support.google.com/adsense/answer/10532'>diesem Hilfethema</a>."
  body:
    - "Fügen Sie den gesamten Anzeigencode in das Body-Tag ein. Andernfalls funktionieren die Anzeigen nicht."
  smarttag:
    - "<code>data-ad-client</code> und <code>data-ad-slot</code> sind für jede von Ihnen erstellte Anzeige einzigartig."
    - "Das Tag <code>data-ad-format=auto</code> im generierten Anzeigencode sorgt bei Responsive-Anzeigenblöcken für die optimale Größenanpassung."
---

<p class="intro">
  Der folgende Leitfaden bietet Ihnen eine schrittweise Anleitung zur Schaltung von Anzeigen auf Ihrer Website. Erstellen Sie ein AdSense-Konto sowie Anzeigenblöcke, platzieren Sie die Blöcke auf Ihrer Website, konfigurieren Sie die Zahlungseinstellungen und erhalten Sie Zahlungen.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Beispielseite mit Anzeigen erstellen

In dieser schrittweisen Anleitung erstellen Sie mithilfe von Google AdSense und dem Web Starter Kit eine einfache Seite mit Responsive-Anzeigen:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Beispielwebsite mit Anzeigen auf Desktop- und Mobilgeräten">

Falls Sie mit dem Web Starter Kit nicht vertraut sind, finden Sie alle erforderlichen Informationen in der Dokumentation zur [Einrichtung des Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html).

Gehen Sie folgendermaßen vor, um Anzeigen auf Ihrer Website zu schalten und Zahlungen zu erhalten:

1. Erstellen Sie ein AdSense-Konto.
2. Erstellen Sie Anzeigenblöcke.
3. Platzieren Sie Anzeigenblöcke auf einer Seite.
4. Konfigurieren Sie die Zahlungseinstellungen.

## AdSense-Konto erstellen
Um Anzeigen auf Ihrer Website schalten zu können, benötigen Sie ein aktives AdSense-Konto. Falls Sie noch kein AdSense-Konto haben, müssen Sie [eins erstellen](https://www.google.com/adsense/) und den AdSense-Nutzungsbedingungen zustimmen. Beim Erstellen Ihres Kontos müssen Sie Folgendes bestätigen:

* Sie sind mindestens 18 Jahre alt und haben ein bestätigtes Google-Konto.
* Sie besitzen eine Live-Website oder andere Online-Inhalte, die den
[Programmrichtlinien von Google AdSense](https://support.google.com/adsense/answer/48182) entsprechen. Die Anzeigen werden auf dieser Website gehostet.
* Sie haben eine Postanschrift, die auch in Ihrem Bankkonto hinterlegt ist. Nur dann können Sie Zahlungen erhalten.

## Anzeigenblöcke erstellen

Ein Anzeigenblock besteht aus einer Reihe von Anzeigen, die auf der Grundlage von JavaScript-Code, den Sie zu Ihrer Seite hinzugefügt haben, auf Ihrer Seite angezeigt werden. Für die Größe Ihrer Anzeigenblöcke stehen drei Optionen zur Verfügung:

* **[Responsive (empfohlen)](https://support.google.com/adsense/answer/3213689)** 
* [Vordefiniert](https://support.google.com/adsense/answer/6002621)
* [Benutzerdefiniert](https://support.google.com/adsense/answer/3289364)

Wenn Sie eine Website mit Responsive Webdesign erstellen, verwenden Sie Responsive-Anzeigenblöcke.
Bei Responsive-Anzeigen wird die Größe automatisch an die Größe des Geräts und die Breite des übergeordneten Containers angepasst.
Responsive-Anzeigen sind auf das Responsive Webdesign Ihrer Website abgestimmt. So sieht Ihre Website auf jedem Gerät gut aus.

Wenn Sie keine Responsive-Anzeigenblöcke verwenden, müssen Sie viel mehr Code schreiben, um festzulegen, wie die Werbung auf dem jeweiligen Gerät des Nutzers angezeigt werden soll. Auch wenn Sie die genaue Größe Ihrer Anzeigenblöcke angeben müssen, können Sie Responsive-Anzeigenblöcke im [erweiterten Modus]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough) verwenden.

So wird Ihr Code einfacher und Sie müssen weniger Zeit und Mühe aufwenden, denn der Code der Responsive-Anzeige passt die Größe des Anzeigenblocks automatisch an das Layout Ihrer Seite an. 
Der Code berechnet die erforderliche Größe dynamisch auf der Grundlage der Breite des übergeordneten Containers des Anzeigenblocks und wählt dann die passende, leistungsstärkste Anzeigengröße für den Container aus.
Zum Beispiel könnte auf einer für Mobilgeräte optimierten Website mit einer Breite von 360 Pixel ein Anzeigenblock im Format 320 x 50 geschaltet werden.

Einen Überblick über die derzeit [leistungsstärksten Anzeigengrößen](https://support.google.com/adsense/answer/6002621#top) finden Sie im [Leitfaden zu Anzeigengrößen](https://support.google.com/adsense/answer/6002621#top) von Google AdSense.

### Responsive-Anzeigenblock erstellen

1. Rufen Sie den Tab [Meine Anzeigen](https://www.google.com/adsense/app#myads-springboard) auf.
2. Klicken Sie auf <strong>+Neuer Anzeigenblock</strong>.
3. Geben Sie einen eindeutigen Namen für den Anzeigenblock ein. Dieser erscheint im Anzeigencode, der in Ihre Website eingefügt wird, und sollte daher aussagekräftig sein.
4. Wählen Sie aus dem Drop-down-Menü `Anzeigengröße` die Option <strong>Responsive</strong> aus.
5. Wählen Sie aus dem Drop-down-Menü `Anzeigentyp` die Option <strong>Text- & Displayanzeigen</strong> aus.
6. Klicken Sie auf <strong>Speichern und Code abrufen</strong>.
7. Wählen Sie im Feld <strong>Anzeigencode</strong>, das daraufhin erscheint, die Option <strong>Optimale Größenanpassung (empfohlen)</strong> aus dem Drop-down-Menü `Modus` aus. 
Dies ist der empfohlene Modus, der keine Änderungen an Ihrem Anzeigencode erfordert.

Nachdem Sie Ihren Anzeigenblock erstellt haben, erhalten Sie von AdSense ein Code-Snippet, das auf Ihrer Website eingefügt wird. Beispiel:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Anzeigenblöcke in Ihre Website integrieren

Um die Anzeige in die Seite zu integrieren, müssen wir das erhaltene AdSense-Snippet in unser Markup einfügen. Bei mehreren Anzeigen können Sie entweder den gleichen Anzeigenblock verwenden oder mehrere Anzeigenblöcke erstellen.

1. Öffnen Sie die Datei `index.html` im Ordner `app`.
2. Fügen Sie das Snippet in das Tag `main` ein.
3. Speichern Sie die Datei und versuchen Sie, diese in Ihrem Browser anzuzeigen. Anschließend öffnen Sie sie auf einem Mobilgerät oder über den Chrome-Emulator.

{% include shared/remember.liquid list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Beispielwebsite mit Anzeigen auf Desktop- und Mobilgeräten">
    <br>
  Testen
  </a>
</div>

## Zahlungseinstellungen konfigurieren

Sie fragen sich, wann Ihre AdSense-Zahlung auf Ihrem Konto eingeht? Sie möchten herausfinden, ob Sie Ihr Geld diesen oder nächsten Monat erhalten? Vergewissern Sie sich, dass sie alle unten aufgeführten Schritte ausgeführt haben:

1. Überprüfen Sie, ob alle erforderlichen Steuerinformationen im [Profil des Zahlungsempfängers](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) enthalten sind. 
2. Überprüfen Sie, ob Name und Adresse des Zahlungsempfängers korrekt sind.
3. Wählen Sie auf der Seite [Zahlungseinstellungen](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS) die gewünschte Zahlungsweise aus.
4. Geben Sie Ihre [persönliche Identifikationsnummer (PIN)](https://support.google.com/adsense/answer/157667) ein. Diese PIN bestätigt die Richtigkeit Ihrer Kontodaten.
5. Überprüfen Sie, ob Ihr Guthaben den [Schwellenwert für die Auszahlung](https://support.google.com/adsense/answer/1709871) erreicht hat. 

Antworten auf weitere Fragen erhalten Sie unter [AdSense-Zahlungen - Einführung](https://support.google.com/adsense/answer/1709858).


