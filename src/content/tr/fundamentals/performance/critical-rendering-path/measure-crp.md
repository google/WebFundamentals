project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ölçemediginiz bir seyi optimize edemezsiniz. Neyse ki, Gezinme Zamanlamasi API'si bize kritik olusturma yolunun her bir adimini ölçmemiz için gereken tüm araçlari veriyor!

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Kritik Olusturma Yolunu Gezinme Zamanlamasiyla Ölçme {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Ölçemediginiz bir seyi optimize edemezsiniz. Neyse ki, Gezinme Zamanlamasi API'si bize kritik olusturma yolunun her bir adimini ölçmemiz için gereken tüm araçlari veriyor!


### TL;DR {: .hide-from-toc }
- Gezinme Zamanlamasi, CRP ölçümü için yüksek çözünürlüklü zaman damgalari saglar.
- Tarayici, CRP''nin çesitli asamalarini yakalayan bir tüketilir olaylar serisi yayinlar.


Her saglam performans stratejisinin temeli, iyi ölçüme ve araçlarla is yapmaya dayanir. Görünüse göre, Gezinme Zamanlamasi API'sinin tam olarak sagladigi da budur.

<img src="images/dom-navtiming.png" class="center" alt="Gezinme Zamanlamasi">

Yukaridaki semada bulunan etiketlerin her biri, tarayicinin yükledigi her sayfa için izledigi yüksek çözünürlüklü bir zaman damgasina karsilik gelir. Aslinda, bu özel örnekte tüm farkli zaman damgalarinin yalnizca bir kismini gösteriyoruz. Simdilik agla ilgili tüm zaman damgalarini atliyoruz, ancak ileride göreceginiz bir baska derste bunlara geri dönecegiz.

Bu zaman damgalari ne anlama geliyor?

* **domLoading:** Bu, tüm sürecin baslangiç zaman damgasidir; tarayici aldigi ilk HTML dokümaninin baytlarini ayristirmaya baslamak
  üzeredir.
* **domInteractive:** Tarayicinin tüm HTML'yi ayristirmayi bitirdigi ve DOM yapimini tamamladigi noktayi isaretler.
* **domContentLoaded:** DOM'nin hazir oldugu ve JavaScript yürütmesini engelleyen herhangi bir stil sayfasinin bulunmadigi noktayi isaretler; artik olusturma agacinin yapimini (muhtemelen) gerçeklestirebilecegimiz anlamina gelir.
    * Birçok JavaScript çerçevesi, kendi mantiklarini yürütmeye baslamak için bu olayi bekler. Bu nedenle, tarayici _EventStart_ ve _EventEnd_ zaman damgalarini, bu yürütmenin ne kadar sürecegini izleyebilmemiz için yakalar.
* **domComplete:** Adindan da anlasilacagi gibi, islemenin tümü tamamlanmistir ve sayfadaki kaynaklarin (resimler vb.) tamaminin indirme islemi bitmistir (yükleme deger degistiricisinin dönmesi durmustur).
* **loadEvent:** Her sayfa yüklemesinde son bir adim olarak tarayici, ek uygulama mantigini tetikleyebilecek bir `onload` olayini etkinlestirir.

HTML belirtimi, her olay için belirli kosullar getirir: Olayin ne zaman etkinlesmesinin gerektigi, hangi kosullarin karsilanmasinin gerektigi vb. Buradaki amacimiza uygun olarak, kritik olusturma yoluyla ilgili birkaç önemli asamaya odaklanacagiz:

* **domInteractive**, DOM'nin hazir oldugu zamani isaretler.
* **domContentLoaded**, genellikle [hem DOM hem de CSSOM'nin hazir oldugu](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/) zamani isaretler.
    * Ayristiriciyi engelleyen JavaScript yoksa _DOMContentLoaded_ olayi, _domInteractive_ olayindan hemen sonra etkinlesir.
* **domComplete**, sayfanin ve tüm alt kaynaklarinin hazir oldugu zamani isaretler.

^

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full"   adjust_indentation="auto" %}
</pre>

Yukaridaki örnek ilk bakista biraz ürkütücü görünebilir, ancak gerçekte oldukça basittir. Gezinme Zamanlamasi API'si, ilgili tüm zaman damgalarini yakalar ve bizim kodumuz yalnizca `onload` olayinin etkinlesmesini bekler. Onload olayinin domInteractive, domContentLoaded ve domComplete olaylarindan sonra etkinlestigini hatirlayin. Kodumuz, daha sonra çesitli zaman damgalari arasindaki farki hesaplar.
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming demosu">

Nihayetinde, artik izlenecek bazi belirli asamalara ve bu ölçümleri yapmak için basit bir isleve sahibiz. Bu ölçümleri sayfaya yazdirmak yerine kodu, bu ölçümleri bir analiz sunucusuna ([Google Analytics bunu otomatik olarak yapar](https://support.google.com/analytics/answer/1205784)) gönderecek sekilde de degistirebilirsiniz. Bu, sayfalarinizin performansiyla ilgili kayitlar tutmak ve bir miktar optimizasyon çalismasi yapabileceginiz aday sayfalari tanimlamak için harika bir yoldur.



