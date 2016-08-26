project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Basisbeginselen voor responsive webdesign {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Het gebruik van mobiele apparaten om op internet te browsen neemt enorm snel toe. Veel websites zijn echter nog niet geoptimaliseerd voor die mobiele apparaten. Mobiele apparaten zijn vaak beperkt door de grootte van het scherm en vereisen een andere aanpak voor de manier waarop de inhoud op het scherm wordt weergegeven.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }




Er bestaan heel veel verschillende schermformaten op telefoons, `phablets`, tablets, desktops, gameconsoles, tv`s, zelfs wearables. De schermformaten zullen altijd wijzigen en daarom is het belangrijk dat uw website zich aan elk formaat kan aanpassen, nu en in de toekomst.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Responsive webdesign, oorspronkelijk gedefinieerd door [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) beantwoordt aan de behoeften van de gebruikers en de apparaten die zij gebruiken. De lay-out verandert op basis van de grootte en mogelijkheden van het apparaat. Op een telefoon zien gebruikers inhoud bijvoorbeeld in één kolom, terwijl een tablet dezelfde inhoud misschien in twee kolommen weergeeft.



