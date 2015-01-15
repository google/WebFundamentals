---
layout: article
title: "Olusturmayi Engelleyen CSS"
description: "Varsayilan olarak CSS, olusturmayi engelleyen bir kaynak olarak islenir. Bu, CSSOM olusturuluncaya kadar tarayicinin islenmis herhangi bir içerigin olusturulmasini bekletecegi anlamina gelir. CSS'nizi küçük tuttugunuzdan, mümkün olan en hizli sekilde sagladiginizdan ve olusturmayi engellemeyecek medya türleri ve sorgulari kullandiginizdan emin olun."
introduction: "Varsayilan olarak CSS, olusturmayi engelleyen bir kaynak olarak islenir. Bu, CSSOM olusturuluncaya kadar tarayicinin islenmis herhangi bir içerigin olusturulmasini bekletecegi anlamina gelir. CSS'nizi küçük tuttugunuzdan, mümkün olan en hizli sekilde sagladiginizdan ve olusturmayi engellemeyecek medya türleri ve sorgulari kullandiginizdan emin olun."
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  order: 3
collection: critical-rendering-path
authors:
  - ilyagrigorik
related-guides:
  media-queries:
    -
      title: Duyarlilik için CSS medya sorgularini kullanma
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Duyarli Web tasarimi"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - Varsayilan olarak CSS, bir olusturma engelleyen kaynak olarak islenir.
    - Medya türleri ve medya sorgulari, bazi CSS kaynaklarini olusturmayi engellemeyen olarak isaretlememize olanak tanir.
    - Engelleyen veya engelleme yapmayan davranisindan bagimsiz olarak tüm CSS kaynaklari tarayici tarafindan indirilir.
---
{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>


Önceki bölümde, olusturma agacinin yapimi için kritik olusturma yolunun hem DOM'yi hem de CSSOM'yi gerektirdigini ve bunun, performans üzerinde önemli bir sonucunun oldugunu gördük: **Hem HTML hem de CSS, olusturmayi engelleyen kaynaklardir.** DOM olmadan olusturacak bir seyimiz olmayacagi için HTML gereksinimi açiktir, ancak CSS gereksinimi o kadar açik olmayabilir. CSS'de olusturmayi engellemeden tipik bir sayfayi olusturmayi denersek ne olur?

{% include modules/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="clear">
  <div class="g--half">
    <b>CSS ile NYTimes</b>
    <img class="center" src="images/nytimes-css-device.png" alt="CSS ile NYTimes">

  </div>

  <div class="g--half g--last">
    <b>CSS olmadan NYTimes (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="CSS olmadan NYTimes">

  </div>
</div>

{% comment %}
<table>
<tr>
<td>CSS ile NYTimes</td>
<td>CSS olmadan NYTimes (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="CSS ile NYTimes" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="CSS olmadan NYTimes" class="center"></td>
</tr>
</table>
{% endcomment %}

CSS ile ve CSS olmadan NYTimes web sitesinin yer aldigi yukaridaki örnekte, CSS kullanilabilir hale gelinceye kadar olusturmanin neden engellendigi gösterilmektedir. CSS olmadan, sayfa kullanilamaz durumdadir. Aslinda, sagdaki deneyime genellikle `Biçimlendirilmemis Içerigin Yanip Sönmesi` (FOUC) adi verilir. Sonuç olarak, tarayici hem DOM hem de CSSOM'ye sahip oluncaya kadar olusturmayi engeller.

> **_CSS, olusturmayi engelleyen bir kaynaktir, ilk olusturma süresini optimize etmek için istemciye mümkün oldugunca çabuk ve hizli bir sekilde ulastirin!_**

Bununla birlikte, yalnizca belirli kosullar altinda, örnegin sayfa yazdirilirken veya genis bir ekrana yansitilirken kullanilan bazi CSS stillerimiz varsa ne olur? Bu kaynaklarda olusturmayi engellemeseydik iyi olurdu!

CSS `medya türleri` ve `medya sorgulari`, bu durumlari ele almamiza olanak tanir:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

[Medya sorgusu]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html), bir medya türü ve belirli medya özelliklerinin kosullarini denetleyen sifir veya daha fazla ifadeden olusur. Örnegin, ilk stil sayfasi bildirimimiz herhangi bir medya türü veya sorgusu saglamadigindan, tüm durumlarda geçerli olur; diger bir deyisle, her zaman olusturmayi engeller. Diger yandan, ikinci stil sayfasi yalnizca içerik yazdirilirken uygulanir. Yazdirma için yer paylasimini yeniden ayarlamak, yazi tiplerini degistirmek vb. isteyebilirsiniz. Dolayisiyla, bu stil sayfasinin ilk yüklendiginde sayfanin olusturulmasini engellemesine gerek yoktur. Son olarak, son stil sayfasi bildirimi tarayici tarafindan yürütülen bir `medya sorgusu` saglar: Kosullar eslesirse tarayici, stil sayfayi indirilip isleninceye kadar olusturmayi engeller.

Medya sorgularini kullanarak sunumumuzu, ekran ve yazdirma gibi özel kullanim örneklerine ve ayrica, ekran yönü, yeniden boyutlandirma olaylari gibi dinamik kosullara uyarlayabiliriz. **Stil sayfasi varliklarinizi bildirirken medya türüne ve sorgularina dikkat edin. Bunlar, kritik olusturma yolunun performansi üzerinde büyük etkiye sahiptir!**

{% include modules/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Simdi biraz uygulama örneklerine bakalim:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="screen">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* Ilk bildirim olusturmayi engeller ve tüm kosullarla eslesir.
* Ikinci bildirim de olusturmayi engeller: 'ekran' varsayilan türdür ve herhangi bir tür belirtmezseniz dolayli olarak 'ekran'a ayarlanir. Dolayisiyla, birinci ve ikinci bildirimler aslinda esdegerdir.
* Üçüncü bildirim bir dinamik medya sorgusudur ve sayfa yüklenirken degerlendirilir. Sayfa yüklenirken cihazin yönüne bagli olarak portrait.css olusturmayi engelleyebilir veya engellemeyebilir.
* Son bildirim yalnizca sayfa yazdirilirken uygulanir, dolayisiyla sayfa tarayiciya ilk kez yüklenirken olusturmayi engellemez.

Son olarak, 'olusturmayi engelleme'nin yalnizca tarayicinin söz konusu kaynakta sayfanin ilk olusturmasini bekletmek zorunda olup olmayacagini belirttigini unutmayin. Her durumda, CSS varligi tarayici tarafindan indirilir, ancak engelleme yapmayan kaynaklar için bu islem daha düsük öncelikli olur.

{% include modules/nextarticle.liquid %}

{% endwrap%}

