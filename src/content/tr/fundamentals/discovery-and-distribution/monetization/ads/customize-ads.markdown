---
title: "Reklamlarinizi özellestirme"
description: "En iyi reklamlar kullanici deneyimini iyilestirebilir. Gerçek reklam içerigi reklamlardan gelse de, bu reklamlarin içerik türü, rengi, boyutu ve yerlesimi üzerinde sizin denetiminiz söz konusudur."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - Reklamlari hiçbir zaman kullanicinin sitenizde amaçladigi deneyime müdahale edecek sekilde yerlestirmeyin; ekranin üst kisimdaki reklamlarin önemli içerigi asagi itmediginden emin olun.
    - Her zaman duyarli reklam birimleri kullanin; akilli boyutlandirma yeterli degilse gelismis moda geçin.
    - Reklam körlügünü önlemek için reklamlari içerigin geneline entegre etmenizi saglayacak firsatlar arayin.
    - "Sitenizle harmanlanan, sitenizi tamamlayan veya sitenizle kontrast olusturan metin stilleri seçin."
notes:
  targeting:
    - "Reklamlar genel site içerigine göre hedeflenir, anahtar kelimelere veya kategorilere göre hedeflenmez. Belirli konularla ilgili reklamlari görüntülemek istiyorsaniz, bu konularla ilgili tam cümleler ve paragraflar ekleyin."
  testing:
    - Her zaman reklamlarinizi farkli cihazlarda ve ekranlarda test ederek duyarli davranisin dogru bir sekilde çalistigindan emin olun.
  images:
    - "Reklamverenler, görüntülü reklamlarinin nasil göründügü konusunda tam denetime sahiptir. Sitenizde görünen görüntülü reklamlarin türlerini, reklam yerlesimi ve boyutlandirmasi kullanarak etkileyebilirsiniz, ancak gerçekte resim içerigini kontrol edemezsiniz."
---

<p class="intro">
  En iyi reklamlar kullanici deneyimini iyilestirebilir. Gerçek reklam içerigi reklamlardan gelse de, bu reklamlarin içerik türü, rengi, boyutu ve yerlesimi üzerinde sizin denetiminiz söz konusudur.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Reklamlari kullanicilarin en çok faydalanacaklari yerlere yerlestirin

Sira, reklamlarin sitenizde nerelere yerlestirilecegine
ve kaç reklamin dahil edilecegine karar vermeye geldiginde her zaman ilk önce kullaniciyi düsünün!

* Site içerigini destekleyen reklamlar kullanin; bunun tersini yapmayin.
* Asiri sayida, önemli içerigi ekranin üst kismindan asagi iten, görüntülenebilir alani kaplayan kümelenmis veya açik etiketlemesi olmayan reklamlarin bulundugu sayfalar kullanici memnuniyetini düsürür ve AdSense politikalarina uygun degildir.
* Reklamlarin kullanicilara deger sagladigindan emin olun. Önemli ölçüde az gelir olusturan veya daha az tiklama veya görüntüleme alan reklam birimleriniz varsa, muhtemelen bunlar kullanicilara deger saglamiyordur.

Mobil reklamlar için örnek yerlesim seçenekleri:

<img src="images/mobile_ads_placement.png" class="center" alt="Örnek mobil resim reklam">

Daha fazla bilgi için AdSense 
[reklam yerlesimi için en iyi uygulamalarini](https://support.google.com/adsense/answer/1282097) inceleyin.


## Duyarli boyutlandirma yeterli degilse ne olur?
Bazi durumlarda, yalnizca duyarli reklamlar kullanma disinda, reklamlarinizin görüntülenme sekli üzerinde daha fazla denetiminizin olmasi gerekebilir.  Bu durumda, gelismis moda geçebilir ve duyarli reklam birimi kodunuzdaki akilli boyutlandirmayi geçersiz kilabilirsiniz. 
Örnegin, reklamin kesin boyutlandirmasini [medya sorgularini]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) kullanarak kontrol edebilirsiniz:

1. [Duyarli reklam birimi olusturmaya]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units) iliskin talimatlari izleyin.
2. Reklam kodu kutusunda, Mod açilir listesinden <strong>Gelismis (kod degisikligi gerekiyor)</strong> seçenegini belirleyin.
3. Reklamlarinizin kesin boyutlarini kullanicinin cihazina göre ayarlamak için reklam kodunu degistirin:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Deneyin
{% endlink_sample %}

Daha fazla bilgi için AdSense yardiminda [gelismis özelliklere](https://support.google.com/adsense/answer/3543893) bakin.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Sitenizi tamamlayan stiller seçme

[En basarili reklamlar](https://support.google.com/adsense/answer/17957) sitenizin stilleriyle harmanlanir veya bunlarla kontrast olusturur. Google AdSense, bir [önceden tanimlanmis reklam stilleri](https://support.google.com/adsense/answer/6002585) kümesi saglar; sitenize en uygun stili seçin veya kendi stilinizi olusturun.

### Neler özellestirilebilir?

Metin reklamlarda yer alan asagidaki stilleri özellestirebilirsiniz:

* Kenarlik rengi
* Arka plan rengi
* Metin yazi tipi ailesi ve yazi tipi boyutu
* Varsayilan metin rengi
* Reklam basligina özel metin rengi
* URL'lere özel metin rengi

### Stiller nasil uygulanir?

Yeni bir birim olustururken <strong>Metin reklam stili</strong> özelligini genisleterek metin reklamlara farkli bir stil uygulayabilirsiniz:

<img src="images/customize.png" class="center" alt="Metin reklam stilleri">

Tüm metin reklamlar, Google AdSense <strong>Varsayilan</strong> stilini kullanir.  Önceden tanimlanmis herhangi bir stili oldugu gibi kullanabilir, stilde küçük degisiklikler yapabilir veya kendi özel stilinizi olusturabilirsiniz.

Yeni bir stili kaydettikten sonra, bunu mevcut veya 
yeni reklam birimlerinizin herhangi birine uygulayabilirsiniz:

1. [Reklam Stilleri](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES)'ne gidin.
2. Degistirmek istediginiz reklam stilini <strong>Tüm aktif ürünleriniz için kullanabileceginiz reklam stilleri</strong> listesinden seçin.
3. Degisiklikleri yapin ve <strong>Reklam stilini kaydet</strong>'i tiklayin.

Mevcut bir reklam stilini degistirdiginizde, bu stili kullanan aktif reklam birimleri de otomatik olarak güncellenir.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


