project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Varsayilan olarak CSS, olusturmayi engelleyen bir kaynak olarak islenir. Bu, CSSOM olusturuluncaya kadar tarayicinin islenmis herhangi bir içerigin olusturulmasini bekletecegi anlamina gelir. CSS'nizi küçük tuttugunuzdan, mümkün olan en hizli sekilde sagladiginizdan ve olusturmayi engellemeyecek medya türleri ve sorgulari kullandiginizdan emin olun.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Olusturmayi Engelleyen CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Varsayilan olarak CSS, olusturmayi engelleyen bir kaynak olarak islenir. Bu, CSSOM olusturuluncaya kadar tarayicinin islenmis herhangi bir içerigin olusturulmasini bekletecegi anlamina gelir. CSS'nizi küçük tuttugunuzdan, mümkün olan en hizli sekilde sagladiginizdan ve olusturmayi engellemeyecek medya türleri ve sorgulari kullandiginizdan emin olun.



Önceki bölümde, olusturma agacinin yapimi için kritik olusturma yolunun hem DOM'yi hem de CSSOM'yi gerektirdigini ve bunun, performans üzerinde önemli bir sonucunun oldugunu gördük: **Hem HTML hem de CSS, olusturmayi engelleyen kaynaklardir.** DOM olmadan olusturacak bir seyimiz olmayacagi için HTML gereksinimi açiktir, ancak CSS gereksinimi o kadar açik olmayabilir. CSS'de olusturmayi engellemeden tipik bir sayfayi olusturmayi denersek ne olur?

### TL;DR {: .hide-from-toc }
- Varsayilan olarak CSS, bir olusturma engelleyen kaynak olarak islenir.
- Medya türleri ve medya sorgulari, bazi CSS kaynaklarini olusturmayi engellemeyen olarak isaretlememize olanak tanir.
- Engelleyen veya engelleme yapmayan davranisindan bagimsiz olarak tüm CSS kaynaklari tarayici tarafindan indirilir.


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="CSS ile NYTimes">
    <figcaption>The New York Times with CSS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="CSS olmadan NYTimes">
    <figcaption>The New York Times without CSS (FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

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


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[Medya sorgusu](/web/fundamentals/design-and-ux/responsive/#use-media-queries), bir medya türü ve belirli medya özelliklerinin kosullarini denetleyen sifir veya daha fazla ifadeden olusur. Örnegin, ilk stil sayfasi bildirimimiz herhangi bir medya türü veya sorgusu saglamadigindan, tüm durumlarda geçerli olur; diger bir deyisle, her zaman olusturmayi engeller. Diger yandan, ikinci stil sayfasi yalnizca içerik yazdirilirken uygulanir. Yazdirma için yer paylasimini yeniden ayarlamak, yazi tiplerini degistirmek vb. isteyebilirsiniz. Dolayisiyla, bu stil sayfasinin ilk yüklendiginde sayfanin olusturulmasini engellemesine gerek yoktur. Son olarak, son stil sayfasi bildirimi tarayici tarafindan yürütülen bir `medya sorgusu` saglar: Kosullar eslesirse tarayici, stil sayfayi indirilip isleninceye kadar olusturmayi engeller.

Medya sorgularini kullanarak sunumumuzu, ekran ve yazdirma gibi özel kullanim örneklerine ve ayrica, ekran yönü, yeniden boyutlandirma olaylari gibi dinamik kosullara uyarlayabiliriz. **Stil sayfasi varliklarinizi bildirirken medya türüne ve sorgularina dikkat edin. Bunlar, kritik olusturma yolunun performansi üzerinde büyük etkiye sahiptir!**

{# include shared/related_guides.liquid inline=true list=page.related-guides.media-queries #}

Simdi biraz uygulama örneklerine bakalim:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* Ilk bildirim olusturmayi engeller ve tüm kosullarla eslesir.
* Ikinci bildirim de olusturmayi engeller: 'all' varsayilan türdür ve herhangi bir tür belirtmezseniz dolayli olarak 'all'a ayarlanir. Dolayisiyla, birinci ve ikinci bildirimler aslinda esdegerdir.
* Üçüncü bildirim bir dinamik medya sorgusudur ve sayfa yüklenirken degerlendirilir. Sayfa yüklenirken cihazin yönüne bagli olarak portrait.css olusturmayi engelleyebilir veya engellemeyebilir.
* Son bildirim yalnizca sayfa yazdirilirken uygulanir, dolayisiyla sayfa tarayiciya ilk kez yüklenirken olusturmayi engellemez.

Son olarak, 'olusturmayi engelleme'nin yalnizca tarayicinin söz konusu kaynakta sayfanin ilk olusturmasini bekletmek zorunda olup olmayacagini belirttigini unutmayin. Her durumda, CSS varligi tarayici tarafindan indirilir, ancak engelleme yapmayan kaynaklar için bu islem daha düsük öncelikli olur.



