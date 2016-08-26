project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Auch bei den besten Anzeigen kann die Nutzerfreundlichkeit noch verbessert werden. Zwar kommen die eigentlichen Anzeigeninhalte von den Werbetreibenden, Sie bestimmen jedoch über die Art des Inhalts sowie Farbe, Größe und Platzierung dieser Anzeigen.

{# wf_review_required #}
{# wf_updated_on: 2014-08-12 #}
{# wf_published_on: 2000-01-01 #}

# Anzeigen anpassen {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Auch bei den besten Anzeigen kann die Nutzerfreundlichkeit noch verbessert werden. Zwar kommen die eigentlichen Anzeigeninhalte von den Werbetreibenden, Sie bestimmen jedoch über die Art des Inhalts sowie Farbe, Größe und Platzierung dieser Anzeigen.



## TL;DR {: .hide-from-toc }
- 'Platzieren Sie eine Anzeige niemals dort, wo ein Nutzer sie als störend empfinden könnte. Achten Sie darauf, dass bei ''Above the Fold''-Anzeigen keine wichtigen Inhalte nach unten verschoben werden.'
- 'Verwenden Sie immer Responsive-Anzeigenblöcke. Falls die Option ''Optimale Größenanpassung'' nicht ausreicht, aktivieren Sie den erweiterten Modus.'
- 'Versuchen Sie, die Anzeigen gleichmäßig zu verteilen, um Anzeigenblindheit zu vermeiden.'
- 'Wählen Sie Textformate, die mit Ihrer Website harmonieren, diese komplementieren oder einen Kontrast bilden.'


## Optimale Anzeigenplatzierung

Bei Ihren Überlegungen zu Platzierung und Anzahl von Anzeigen auf Ihrer Website
sollte der Nutzer immer im Vordergrund stehen.

* Reichern Sie Ihre Website-Inhalte mit Anzeigen an, nicht umgekehrt.
* Seiten mit übermäßig vielen Anzeigen, Anzeigen, die wichtige Inhalte nach unten verschieben und so ein Scrollen des Nutzers erfordern, gruppierte Anzeigen, die den sichtbaren Bereich der Seite dominieren oder Anzeigen ohne klare Kennzeichnung können sich auf die Zufriedenheit der Nutzer auswirken und verstoßen gegen die AdSense-Richtlinien.
* Stellen Sie sicher, dass die Anzeigen einen Mehrwert für den Nutzer bieten. Anzeigenblöcke, die deutlich weniger Einnahmen oder weniger Klicks oder Aufrufe generieren, sind für die Besucher wahrscheinlich nicht von Nutzen.

Platzierungsmöglichkeiten für mobile Anzeigen:

<img src="images/mobile_ads_placement.png" class="center" alt="Beispiel-Image-Anzeige für Mobilgeräte">

Weitere Informationen finden Sie in den 
[Best Practices für das Anzeigen-Placement](https://support.google.com/adsense/answer/1282097) mit AdSense.


## Und wenn eine responsive Größenanpassung nicht ausreicht?
Manchmal benötigen Sie mehr Kontrolle über die Anzeigenschaltung, sodass Responsive-Anzeigen alleine nicht ausreichen. In diesem Fall können Sie den erweiterten Modus aktivieren und die optimale Größenanpassung im Code Ihres Responsive-Anzeigenblocks überschreiben. 
So können Sie die genaue Größe von Anzeigen zum Beispiel anhand von [Medienabfragen]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) steuern:

1. Folgen Sie der Anleitung zum [Erstellen eines Responsive-Anzeigenblocks]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. Wählen Sie im Codefeld der Anzeige die Option <strong>Erweitert (Anpassung des Codes erforderlich)</strong> aus dem Drop-down-Menü `Modus` aus.
3. Ändern Sie den Anzeigencode, um die jeweiligen Größen Ihrer Anzeigen je nach Gerät des Nutzers festzulegen:


    <ins class="adsbygoogle adslot_1"
        style="display:block;"
        data-ad-client="ca-pub-1234"
        data-ad-slot="5678"></ins>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/monetization/ads/customize.html">  Testen</a>

Weitere Informationen finden Sie unter [Erweiterte Funktionen](https://support.google.com/adsense/answer/3543893) in der AdSense-Hilfe.

<!-- TODO: Verify note type! -->
Note: Testen Sie Ihre Anzeigen immer auf unterschiedlichen Geräten und Bildschirmen, um sicherzustellen, dass sie auch entsprechend angepasst werden.

## Designs auswählen, die Ihre Website komplementieren

Die [erfolgreichsten Anzeigen](https://support.google.com/adsense/answer/17957) harmonieren mit dem Design Ihrer Website oder bilden einen Kontrast. Google AdSense bietet eine Reihe von [vordefinierten Anzeigendesigns](https://support.google.com/adsense/answer/6002585), aus denen Sie das Design wählen können, das am besten zu Ihrer Website passt. Natürlich können Sie auch selbst kreativ werden.

###Anpassbare Elemente

In Textanzeigen lassen sich folgende Elemente anpassen:

* Randfarbe
* Hintergrundfarbe
* Schriftfamilie und -größe
* Standardtextfarbe
* Textfarbe des Anzeigentitels
* Textfarbe der URLs

### Designs anwenden

Beim Erstellen eines neuen Anzeigenblocks können Sie ein anderes Design für Textanzeigen auswählen. Erweitern Sie hierzu die Eigenschaft <strong>Textanzeigendesign</strong>:

<img src="images/customize.png" class="center" alt="Textanzeigendesigns">

Alle Textanzeigen verwenden das Google AdSense-Design <strong>Standard</strong>.  Sie können ein beliebiges vordefiniertes Design verwenden, kleinere Änderungen daran vornehmen oder Ihr eigenes benutzerdefiniertes Design erstellen.

Sobald Sie ein neues Design gespeichert haben, können Sie es nach Belieben auf vorhandene oder 
neue Anzeigenblöcke anwenden:

1. Navigieren Sie zu [Anzeigendesigns](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Wählen Sie das Anzeigendesign, das geändert werden soll, aus der Liste der <strong>für alle aktiven Produkte verfügbaren Anzeigendesigns</strong> aus.
3. Nehmen Sie die gewünschten Änderungen vor und <strong>Speichern Sie das Anzeigendesign</strong>.

Wenn Sie ein vorhandenes Anzeigendesign ändern, werden alle aktiven Anzeigenblöcke, die dieses Design verwenden, automatisch aktualisiert.

<!-- TODO: Verify note type! -->
Note: Die Gestaltung der Displayanzeigen bleiben den Werbetreibenden überlassen. Sie können zwar durch Anzeigenplatzierung und -größe beeinflussen, welche Arten von Displayanzeigen auf Ihrer Website geschaltet werden, auf die Bildinhalte selbst haben Sie jedoch keinen Einfluss.


