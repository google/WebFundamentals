---
title: "Duyarli Web Tasarimi Temel Bilgileri"
description: "Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin."
updated_on: 2014-04-30
key-takeaways:
  set-viewport:
    - "Tarayici görüntü alaninin genisligini ve ölçeklemesini kontrol etmek için meta görünüm etiketini kullanin."
    - "Ekranin genisligini cihazdan bagimsiz pikseller seklinde eslestirmek için <code>width=device-width</code>kodunu ekleyin."
    - "CSS pikselleri ile cihazdan bagimsiz pikseller arasinda bire bir iliski olusturmak için <code>initial-scale=1</code> kodunu ekleyin."
    - "Sayfaniza, kullanici ölçeklemesini devre disi birakmadan erisilebildiginden emin olun."
  size-content-to-vp:
    - "Genis sabit genislikli ögeler kullanmayin."
    - "Içerigin iyi bir sekilde olusturulmasi belirli bir görüntü alani genisligine bagli olmamalidir."
    - "Küçük ve büyük ekranlar için farkli tasarimlar uygulamak için CSS medya sorgularini kullanin."
  media-queries:
    - "Cihaz özelliklerine göre stil uygulamak için medya sorgulari kullanilabilir."
    - "En genis deneyimi saglamak için <code>min-device-width</code> yerine <code>min-width</code> kodunu kullanin."
    - "Yerlesimi bozmamak için ögeler için göreli boyutlar kullanin."
  choose-breakpoints:
    - "Kesme noktalarini içerige göre olusturun, hiçbir zaman belirli cihazlara, ürünlere veya markalara göre olusturmayin."
    - "Ilk olarak en küçük mobil cihaz için tasarim yapin, daha sonra daha fazla ekran kullanima sunuldukça deneyimi artan bir sekilde gelistirin."
    - "Metin satirlarini en fazla 70 veya 80 karakter civarinda tutun."
notes:
  use-commas:
    - "Eski tarayicilarin özellikleri dogru bir sekilde ayristirabileceklerinden emin olmak üzere özellikleri birbirinden ayirmak için virgül kullanin."
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
  Web'de sörf yapmak için mobil cihazlarin kullanilmasi çok büyük bir hizla artmaktadir, ancak ne yazik ki web'in çogunlugu bu mobil cihazlar için optimize edilmemistir. Mobil cihazlar genellikle ekran boyutuna göre sinirlanir ve içerigin ekrana yerlestirilme sekliyle ilgili farkli bir yaklasim gereklidir.
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Telefonlarda, `tablet-telefonlarda`, tabletlerde, masaüstü bilgisayarlarda, oyun konsollarinda, TV'lerde, hatta giyilebilir ürünlerde çok farkli ekran boyutlari söz konusudur.  Ekran boyutlari her zaman degismektedir, dolayisiyla sitenizin bugün veya gelecekte her ekran boyutuna uyum saglayabilmesi önemlidir.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Ilk olarak [A List Apart baslikli makalede Ethan Marcotte](http://alistapart.com/article/responsive-web-design/) tarafindan tanimlanan duyarli web tasarimi, kullanicilarin ve kullanmakta olduklarin cihazlarin gereksinimlerine yanit verir.  Yerlesim, cihazin boyutuna ve yeteneklerine göre degisir.  Örnegin, bir telefonda, kullanicilar tek sütunlu bir görünümde gösterilen içerigi görürken bir tablet, ayni içerigi iki sütunda gösterebilir.



