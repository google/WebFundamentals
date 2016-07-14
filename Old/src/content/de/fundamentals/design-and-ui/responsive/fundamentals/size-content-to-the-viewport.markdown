---
title: "Größe der Inhalte an Darstellungsbereich anpassen"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
updated_on: 2014-04-30
key-takeaways:
  size-content-to-vp:
    - "Verwenden Sie keine großen Elemente mit fester Breite."
    - "Inhalte sollten für eine gute Darstellung nicht auf eine bestimmte Breite des Darstellungsbereichs ausgerichtet werden."
    - "Verwenden Sie CSS-Medienabfragen, um verschiedene Stile für große und kleine Bildschirme anzuwenden."
notes:
  use-commas:
    - Verwenden Sie Kommas zum Trennen von Attributen, damit gewährleistet ist, dass auch ältere Browser diese Attribute richtig verarbeiten können.
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---

<p class="intro">
  Sowohl auf Desktopcomputern als auch Mobilgeräten sind Nutzer daran gewöhnt, auf Websites vertikal und nicht horizontal zu scrollen. Sie dazu zu zwingen, in der Horizontalen zu scrollen oder herauszoomen zu müssen, um die ganze Seite zu sehen, führt zu einer negativen Nutzererfahrung.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

Wenn Sie eine mobile Website mit einem Darstellungsbereich-Meta-Tag entwickeln, ist es sehr gut möglich, dass Sie versehentlich Seiteninhalte erstellen, die nicht gut in den festgelegten Darstellungsbereich passen. So kann etwa ein Bild, das breiter als der Darstellungsbereich dargestellt wird, dazu führen, dass im Darstellungsbereich horizontal gescrollt werden muss. Passen Sie solche Inhalte immer so an, dass sie die Breite des Darstellungsbereichs nicht überschreiten, damit Nutzer nicht horizontal scrollen müssen.

Da sich die Bildschirmabmessungen und die Breite in CSS-Pixeln stark bei Geräten unterscheiden können, etwa zwischen Telefonen und Tablets oder sogar zwischen verschiedenen Telefonen, sollten Inhalte zur guten Darstellung nicht auf einen bestimmen Darstellungsbereich ausgerichtet werden.

Das Festlegen von absoluten CSS-Breiten für Seitenelemente, wie etwa im Beispiel unten, führt dazu, dass der `div`-Bereich für den Darstellungsbereich auf schmaleren Geräten zu breit ausfällt, zum Beispiel bei einer Breite von 320 CSS-Pixeln auf iPhones. Verwenden Sie stattdessen relative Werte für die Breite, zum Beispiel `width: 100%`. Ebenso sollten Sie vorsichtig bei der Verwendung von großen absoluten Positionierungswerten sein, die möglicherweise dazu führen, dass das Element auf kleinen Bildschirmen aus dem Darstellungsbereich fällt.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Seite mit einem Element mit einer festen Breite von 344 Pixeln auf einem iPhone">
      Siehe Beispiel
    {% endlink_sample %}
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Seite mit einem Element mit einer festen Breite von 344 Pixeln auf Nexus 5">
      Siehe Beispiel
    {% endlink_sample %}
  </div>
</div>



