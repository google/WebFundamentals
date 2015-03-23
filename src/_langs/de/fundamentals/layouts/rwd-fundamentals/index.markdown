---
layout: section
title: "Responsives Webdesign: Grundlagen"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
introduction: "Die Nutzung von Mobilgeräten für das Internet steigt auch weiterhin mit ungeheuerlicher Geschwindigkeit, leider ist jedoch ein Großteil des Webs nicht für diese Geräte optimiert. Die Funktionalität von Mobilgeräten ist häufig durch eine geringe Displaygröße eingeschränkt, sodass ein neuer Ansatz bei der Bereitstellung von Inhalten am Bildschirm gefragt ist."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
authors:
  - petelepage
id: rwd-fundamentals
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Verwenden Sie das Darstellungsbereich-Meta-Tag zur Steuerung der Breite und Skalierung des Darstellungsbereichs im Browser.
    - Verwenden Sie <code>width=device-width</code> zur Abstimmung auf die Breite des Bildschirms in geräteunabhängigen Pixeln.
    - Verwenden Sie <code>initial-scale=1</code>, um eine 1:1-Beziehung zwischen CSS-Pixeln und geräteunabhängigen Pixeln zu gewährleisten.
    - Stellen Sie sicher, dass Ihre Seite zugänglich ist, indem Sie die Nutzerskalierung beibehalten.
  size-content-to-vp:
    - Verwenden Sie keine großen Elemente mit fester Breite.
    - Inhalte sollten für eine gute Darstellung nicht auf eine bestimmte Breite des Darstellungsbereichs ausgerichtet werden.
    - Verwenden Sie CSS-Medienabfragen, um verschiedene Stile für große und kleine Bildschirme anzuwenden.
  media-queries:
    - Medienabfragen können dazu verwendet werden, Stile auf Grundlage von Gerätecharakteristiken anzuwenden.
    - Verwenden Sie <code>min-width</code> statt <code>min-device-width</code>, um möglichst viele Breiten abzudecken.
    - Verwenden Sie relative Größen für Elemente, damit das Layout harmonisch bleibt.
  choose-breakpoints:
    - Erstellen Sie Übergangspunkte auf Grundlage der Inhalte und niemals auf Grundlage bestimmter Geräte, Produkte oder Marken.
    - Erstellen Sie das Design zuerst für die kleinsten Mobilgeräte und erweitern Sie die Erfahrung anschließend auf den zusätzlichen Platz, der auf größeren Anzeigen verfügbar ist.
    - Achten Sie darauf, dass Zeilen immer maximal 70 bis 80 Zeichen enthalten.
remember:
  use-commas:
    - Verwenden Sie Kommas zum Trennen von Attributen, damit gewährleistet ist, dass auch ältere Browser diese Attribute richtig verarbeiten können.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

{% comment %}
<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/oK09n_PGhTo?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>
{% endcomment %}

{% include modules/udacity.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Telefone, Phablets, Tablets, Desktopcomputer, Spielekonsolen, Fernseher und sogar Wearables weisen eine extreme Vielfalt an verschiedenen Bildschirmgrößen auf. Bildschirmgrößen verändern sich ständig, weshalb es besonders wichtig ist, dass sich Ihre Website an diese anpassen kann, ob heute oder in der Zukunft.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Responsives Webdesign, ursprünglich von [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) definiert, reagiert auf die Bedürfnisse der Nutzer und der Geräte, die sie verwenden. Das Layout verändert sich auf Grundlage der Größe und der Funktionen des Geräts. Wenn Nutzer mit einem Telefon Inhalte zum Beispiel in einer einzelnen Spaltenansicht sehen, könnte der gleiche Inhalt auf einem Tablet in zwei Spalten erscheinen.

{% include modules/nextarticle.liquid %}

{% endwrap %}

