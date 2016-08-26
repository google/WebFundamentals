project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Podstawy elastycznego projektowania witryn {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Liczba urządzeń mobilnych używanych do surfowania po sieci rośnie w astronomicznym tempie, jednak większość stron internetowych nie jest zoptymalizowana do działania na tych urządzeniach. Częstym ograniczeniem urządzeń mobilnych jest rozmiar wyświetlacza, dlatego wymagają one stosowania innych sposobów rozmieszczania treści na ekranie.


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




Ekrany mogą być w wielu różnych rozmiarach &ndash; na telefonach, `fabletach`, tabletach, komputerach, konsolach do gier, telewizorach, a nawet urządzeniach do noszenia. Zawsze będą pojawiać się nowe, dlatego witryna powinna dostosowywać się do każdego rozmiaru ekranu &ndash; teraz i w przyszłości.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Elastyczne projektowanie witryn, pierwotnie zdefiniowane przez [Ethana Marcotte`a w czasopiśmie A List Apart](http://alistapart.com/article/responsive-web-design/) to odpowiedź na potrzeby użytkowników i ich urządzeń. Układ strony zmienia się w zależności od rozmiaru i możliwości urządzenia. Na przykład na telefonie użytkownik widzi treści w jednej kolumnie. Z kolei na tablecie te same treści są już wyświetlane w dwóch kolumnach.



