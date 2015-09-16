---
title: "Responsives Webdesign: Grundlagen"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
updated_on: 2014-04-30
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---

<p class="intro">
  Die Nutzung von Mobilgeräten für das Internet steigt auch weiterhin mit ungeheuerlicher Geschwindigkeit, leider ist jedoch ein Großteil des Webs nicht für diese Geräte optimiert. Die Funktionalität von Mobilgeräten ist häufig durch eine geringe Displaygröße eingeschränkt, sodass ein neuer Ansatz bei der Bereitstellung von Inhalten am Bildschirm gefragt ist.
</p>

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Telefone, Phablets, Tablets, Desktopcomputer, Spielekonsolen, Fernseher und sogar Wearables weisen eine extreme Vielfalt an verschiedenen Bildschirmgrößen auf. Bildschirmgrößen verändern sich ständig, weshalb es besonders wichtig ist, dass sich Ihre Website an diese anpassen kann, ob heute oder in der Zukunft.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Responsives Webdesign, ursprünglich von [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) definiert, reagiert auf die Bedürfnisse der Nutzer und der Geräte, die sie verwenden. Das Layout verändert sich auf Grundlage der Größe und der Funktionen des Geräts. Wenn Nutzer mit einem Telefon Inhalte zum Beispiel in einer einzelnen Spaltenansicht sehen, könnte der gleiche Inhalt auf einem Tablet in zwei Spalten erscheinen.
