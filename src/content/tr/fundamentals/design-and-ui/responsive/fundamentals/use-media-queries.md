project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Duyarlilik için CSS medya sorgularini kullanma {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Medya sorgulari, CSS stillerine uygulanabilecek basit filtrelerdir.  Içerigi olusturan cihazin ekran türü, genislik, yükseklik, yön, hatta çözünürlügünü de içeren özelliklerine göre stilleri degistirmeyi kolaylastirirlar.




## TL;DR {: .hide-from-toc }
- Cihaz özelliklerine göre stil uygulamak için medya sorgulari kullanilabilir.
- En genis deneyimi saglamak için <code>min-device-width</code> yerine <code>min-width</code> kodunu kullanin.
- Yerlesimi bozmamak için ögeler için göreli boyutlar kullanin.



Örnegin, bir yazdirma medya sorgusu içine yazdirma için gereken tüm stilleri yerlestirebilirsiniz:


    <link rel="stylesheet" href="print.css" media="print">
    

Stil sayfasi baglantisinda `media` özelligini kullanmaya ek olarak, bir CSS dosyasina yerlestirilebilecek medya sorgularini uygulamanin iki yolu daha vardir: `@media` ve `@import`.  Performans nedeniyle `@import` sözdizimi yerine ilk iki yöntemden biri önerilir (bkz. [CSS içe aktarmalarindan kaçinma]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

Medya sorgulari için geçerli olan mantik, birbiriyle örtüsür ve bu ölçütü karsilayan filtrelerin sonucunda belirlenen CSS blogu, CSS'deki standart öncelik kurallari kullanilarak uygulanir.

## Medya sorgularini görüntü alani boyutuna göre uygulama

Medya sorgulari; küçük, büyük ve aradaki ekranlara belirli stillerin uygulandigi duyarli bir deneyim olusturabilmemizi saglar.  Medya sorgusu sözdizimi, cihaz özelliklerine bagli olarak uygulanabilecek kurallarin olusturulmasina olanak tanir.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Sorgulayabilecegimiz farkli ögeler söz konusudur, ancak duyarli web tasarimi için en sik kullanilanlar `min-width`, `max-width`, `min-height` ve `max-height` ögeleridir.


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="özellik">özellik</th>
      <th data-th="Sonuç">Sonuç</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="özellik"><code>min-width</code></td>
      <td data-th="Sonuç">Kurallar, genisligi sorguda tanimlanan degerin üzerinde olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>max-width</code></td>
      <td data-th="Sonuç">Kurallar, genisligi sorguda tanimlanan degerin altinda olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>min-height</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligi sorguda tanimlanan degerin üzerinde olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>max-height</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligi sorguda tanimlanan degerin altinda olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>orientation=portrait</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligin genislikten büyük veya genislige esit oldugu tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>orientation=landscape</code></td>
      <td data-th="Sonuç">Kurallar, genisligin yükseklikten büyük oldugu tarayicilar için uygulanir.</td>
    </tr>
  </tbody>
</table>

Birlikte bir örnege bakalim:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Yeniden boyutlandirilirken özellikleri degistirmek için medya sorgularini kullanan bir sayfanin önizlemesi.">
  {% endlink_sample %}
</figure>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* Tarayici genisligi <b>0p</b> ile <b>640p</b> arasinda oldugunda, `max-640px.css` uygulanir.
* Tarayici genisligi <b>500p</b> ile <b>600p</b> arasinda oldugunda, `@media` içindeki stiller uygulanir.
* Tarayici genisligi <b>640p veya daha fazla</b> oldugunda, `min-640px.css` uygulanir.
* Tarayici <b>genisligi yükseklikten fazla oldugunda</b>, `landscape.css` uygulanir.
* Tarayici <b>yüksekligi genislikten fazla oldugunda</b>, `portrait.css` uygulanir.


## `min-device-width` ile ilgili bir not

`*-device-width` özelligine dayali sorgular da olusturulabilir; ancak bu uygulama **kesinlikle tavsiye edilmemektedir**.

Fark küçük ancak çok önemlidir: `min-width`, tarayici penceresinin boyutuna dayanirken `min-device-width` özelligi ekranin boyutuna dayanir.  Ne yazik ki eski Android tarayicisinin da aralarinda bulundugu bazi tarayicilar, cihaz genisligini dogru bir sekilde bildiremez ve ekran boyutunu beklenen görüntü alani genisligi yerine cihaz pikselleri olarak bildirir.

Buna ek olarak, `*-device-width` özelliginin kullanilmasi, sorgu tarayici penceresinin boyutu yerine gerçek cihaz boyutuna dayali olacagindan, masaüstü bilgisayarlarda veya pencerelerin yeniden boyutlandirilmasina olanak taniyan diger cihazlarda içerigin uyarlanmasini engelleyebilir.

## Göreli birimler kullanma

Duyarli tasarimin arkasindaki önemli bir kavram, sabit genislikli yerlesimlere karsilik degiskenlik ve orantisalliktir.  Ölçümler için göreli birimlerin kullanilmasi, yerlesimlerin basitlestirilmesine yardimci olabilir ve yanlislikla görüntü alani için çok büyük olan bilesenlerin olusturulmasini önleyebilir.

Örnegin, üst düzey bir div ögesinde genisligin %100 degerine ayarlanmasi, ögenin görüntü alaninin genisligine uzamasini ve hiçbir zaman görüntü alani için çok büyük veya çok küçük olmamasini saglar.  div ögesi cihaz ister 320 piksel genisliginde bir iPhone, ister 342 piksel genisliginde bir Blackberry Z10, isterse de 360 piksel genisliginde bir Nexus 5 olsun görünüme sigar.

Buna ek olarak, göreli birimlerin kullanilmasi, tarayicilarin sayfaya yatay kaydirma çubuklari eklemesine gerek kalmadan içerigi kullanicilarin zum düzeyine dayali olarak olusturmalarina olanak tanir.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



