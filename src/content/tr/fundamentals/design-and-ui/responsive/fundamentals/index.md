project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Duyarli Web Tasarimi Temel Bilgileri {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Web'de sörf yapmak için mobil cihazlarin kullanilmasi çok büyük bir hizla artmaktadir, ancak ne yazik ki web'in çogunlugu bu mobil cihazlar için optimize edilmemistir. Mobil cihazlar genellikle ekran boyutuna göre sinirlanir ve içerigin ekrana yerlestirilme sekliyle ilgili farkli bir yaklasim gereklidir.


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




Telefonlarda, `tablet-telefonlarda`, tabletlerde, masaüstü bilgisayarlarda, oyun konsollarinda, TV'lerde, hatta giyilebilir ürünlerde çok farkli ekran boyutlari söz konusudur.  Ekran boyutlari her zaman degismektedir, dolayisiyla sitenizin bugün veya gelecekte her ekran boyutuna uyum saglayabilmesi önemlidir.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Ilk olarak [A List Apart baslikli makalede Ethan Marcotte](http://alistapart.com/article/responsive-web-design/) tarafindan tanimlanan duyarli web tasarimi, kullanicilarin ve kullanmakta olduklarin cihazlarin gereksinimlerine yanit verir.  Yerlesim, cihazin boyutuna ve yeteneklerine göre degisir.  Örnegin, bir telefonda, kullanicilar tek sütunlu bir görünümde gösterilen içerigi görürken bir tablet, ayni içerigi iki sütunda gösterebilir.



