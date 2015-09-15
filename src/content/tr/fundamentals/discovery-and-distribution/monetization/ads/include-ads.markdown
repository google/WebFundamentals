---
title: "Sitenize AdSense reklamlari ekleme"
description: "Sitenize nasil reklam ekleyeceginizi ögrenmek için bu kilavuzdaki adimlari izleyin. Bir AdSense hesabi olusturun, reklam birimleri olusturun, birimleri sitenize yerlestirin, ödeme ayarlarini yapilandirin ve ödeme alin."
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - "Bir AdSense hesabi olusturmak için 18 yasindan büyük olmaniz, bir Google Hesabinizin ve adresinizin olmasi gerekir."
    - "Basvuruda bulunmadan önce web sitenizin yayinda olmasi ve web sitesi içeriginin AdSense politikalarina uygun olmasi gerekir."
    - "Bir kullanici hangi cihazi kullanirsa kullansin, reklamlarinizin görünüme sigdigindan emin olmak için duyarli reklam birimleri olusturun."
    - "Ödeme ayarlarini dogrulayin ve paranin yagmaya baslamasini bekleyin."
notes:
  crawler:
    - "AdSense tarayicisinin siteye erismesini engellemediginizden emin olun (<a href='https://support.google.com/adsense/answer/10532'>bu yardim konusuna</a> bakin)." 
  body:
    - Tüm reklam kodunu gövde etiketi içine yerlestirin; aksi halde reklamlar çalismaz.
  smarttag:
    - "<code>data-ad-client</code> ve <code>data-ad-slot</code>, olusturdugunuz her reklam için benzersiz olacaktir."
    - "Olusturulan reklam kodundaki <code>data-ad-format=auto</code> etiketi, duyarli reklam birimine iliskin akilli boyutlandirma davranisini saglar."
---

<p class="intro">
  Sitenize nasil reklam ekleyeceginizi ögrenmek için bu kilavuzdaki adimlari izleyin. Bir AdSense hesabi olusturun, reklam birimleri olusturun, birimleri sitenize yerlestirin, ödeme ayarlarini yapilandirin ve ödeme alin.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Reklamlar içeren örnek sayfa olusturma

Bu gözden geçirmede, Google AdSense ve Web Starter Kit'i kullanarak duyarli reklamlar içeren bir örnek sayfa olusturacaksiniz:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Masaüstü ve mobil cihazlar için reklamlari olan örnek web sitesi">

Web Start Kit'e yabanciysaniz [Web Starter Kit'i Ayarlama]({{site.fundamentals}}/tools/setup/setup_kit.html) dokümanlarina bakin.

Reklamlari sitenize eklemek ve ödeme almak için su basit adimlari izlemeniz gerekir:

1. Bir AdSense hesabi olusturun.
2. Reklam birimleri olusturun.
3. Reklam birimlerini bir sayfaya yerlestirin.
4. Ödeme ayarlarini yapilandirin.

## Bir AdSense hesabi olusturma
Reklamlari sitenizde sunmak için etkin bir AdSense hesabinizin olmasi gerekir. Henüz hesabiniz yoksa [bir tane olusturmaniz](https://www.google.com/adsense/) ve AdSense hizmet sartlarini kabul etmeniz gerekecektir.  Hesabinizi olusturdugunuzda sunlari dogrulamaniz gerekir:

* En azindan 18 yasinda oldugunuzu ve dogrulanmis bir Google Hesabinizin oldugunu.
* 
[Google AdSense program politikalarina](https://support.google.com/adsense/answer/48182) uygun yayinda olan bir web sitesine veya baska çevrimiçi içerige sahip oldugunuz; reklamlar bu sitede barindirilir.
* Bir posta adresinizin ve ödemelerinizi alabilmeniz için banka hesabinizla iliskilendirilmis bir yazisma adresinizin oldugu.

## Reklam birimleri olusturma

Reklam birimi, sayfaniza eklediginiz JavaScript'in sonucu olarak sayfanizda görüntülenen bir reklam grubudur.  Reklam birimlerinizi boyutlandirirken üç seçeneginiz vardir:

* **[Duyarli (Önerilen)](https://support.google.com/adsense/answer/3213689)**. 
* [Önceden tanimlanmis](https://support.google.com/adsense/answer/6002621).
* [Özel boyutlu](https://support.google.com/adsense/answer/3289364).

Duyarli bir site olusturuyorsunuz; duyarli reklam birimleri kullanin.
Duyarli reklamlar, cihazin boyutuna ve üst kapsayicinin genisligine göre otomatik olarak yeniden boyutlandirilir.
Duyarli reklamlar, duyarli yer paylasiminiza uygun bir sekilde çalisarak sitenizin tüm cihazlarda harika görünmesini saglar.

Duyarli reklam birimleri kullanmazsaniz reklamlarin kullanicilarin cihazlarina göre nasil görünecegini kontrol etmek için çok daha fazla kod yazmaniz gerekecektir. Reklam birimlerinizin tam boyutunu belirtmeniz gerekse bile, [gelismis modda]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough) duyarli reklam birimleri kullanin.

Kodunuzu basitlestirmek ve zaman ile emekten tasarruf etmeniz için duyarli reklam kodu, reklam birimi boyutunu otomatik olarak sayfa yer paylasiminiza uyarlar. 
Kod, reklam birimi üst kapsayicisinin genisligine göre gereken boyutu dinamik bir sekilde hesaplar, ardindan kapsayiciya sigan ve en iyi performansi gösteren reklam boyutunu seçer.
Örnegin, 360 piksel genislige sahip mobil cihazlar için optimize edilmis bir sitede 320x50 boyutunda bir reklam birimi gösterilebilir.

Su anda [en iyi performans gösteren reklam boyutlarini](https://support.google.com/adsense/answer/6002621#top) Google AdSense [Reklam boyutlari kilavuzundan](https://support.google.com/adsense/answer/6002621#top) izleyin.

### Duyarli reklam birimi olusturmak için

1. [Reklamlarim sekmesini](https://www.google.com/adsense/app#myads-springboard) ziyaret edin.
2. <strong>+Yeni reklam birimi</strong>'ni tiklayin.
3. Reklam biriminize benzersiz bir ad verin. Bu ad, sitenize yapistirilan reklam kodunda görüneceginden açiklayici olmasina çalisin.
4. Reklam boyutu açilir listesinden <strong>Duyarli</strong>'yi seçin.
5. Reklam türü açilir listesinden <strong>Metin ve görüntülü reklamlar</strong>'i seçin.
6. <strong>Kaydet ve kodu al</strong>'i tiklayin.
7. Görüntülenen <strong>Reklam kodu</strong> kutusunda, Mod açilir listesinden <strong>Akilli boyutlandirma (önerilen)</strong> seçenegini belirleyin. 
Bu, önerilen moddur ve reklam kodunuzda herhangi bir degisiklik yapmanizi gerektirmez.

Reklam biriminizi olusturduktan sonra, AdSense asagidakine benzer, sitenize eklenecek bir kod snippet'i saglar:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Reklam birimlerini sitenize ekleme

Reklami sayfaya eklemek için saglanan AdSense snippet'ini biçimlendirmemize yapistirmamiz gerekir.  Birden çok reklami eklemek istiyorsaniz ayni reklam birimini yeniden kullanabilir veya birden çok reklam birimi olusturabilirsiniz.

1. `app` klasöründeki `index.html` dosyasini açin.
2. Saglanan snippet'i `main` etiketine yapistirin.
3. Dosyayi kaydedin ve tarayicinizda görüntülemeyi deneyin, ardindan bir mobil cihazda veya Chrome öykünücüsü araciligiyla açmaya çalisin.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Masaüstü ve mobil cihazlar için reklamlari olan örnek web sitesi">
    <br>
  Deneyin
          </a>
</div>

## Ödeme ayarlarini yapilandirma

AdSense ödemenizin ne zaman gelecegini mi merak ediyorsunuz? Bu ay mi, yoksa gelecek ay mi ödeme alacaginizi tahmin etmeye mi çalisiyorsunuz? Asagidaki adimlarin tümünü tamamladiginizdan emin olun:

1. [Alacakli profilinde](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) gerekli vergi bilgilerini sagladiginizi dogrulayin. 
2. Alacakli adinizin ve adresinizin dogru oldugunu onaylayin.
3. [Ödeme ayarlari sayfasinda](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS) ödeme biçiminizi seçin.
4. [Kisisel tanitim numaranizi (PIN)](https://support.google.com/adsense/answer/157667) girin. Bu PIN, hesap bilgilerinizin dogru oldugunu dogrular.
5. Bakiyenizin [ödeme esigine](https://support.google.com/adsense/answer/1709871) ulasip ulasmadigini kontrol edin. 

Diger sorulariniz için [AdSense ödemeleri tanitimina](https://support.google.com/adsense/answer/1709858) bakin.


