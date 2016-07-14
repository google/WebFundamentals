---
title: "Duyarli Olmasini Saglayin"
description: "Web'e, küçük ekranli telefonlardan genis ekranli televizyonlara kadar çok çesitli cihazlardan erisilebilir. Tüm bu cihazlarda iyi bir sekilde çalisacak bir siteyi nasil olusturacaginizi ögrenin."
key-takeaways:
  make-responsive:
    - Her zaman bir görüntü alani kullanin.
    - Her zaman önce dar bir görüntü alaniyla baslayip daha sonra bunu genisletin.
    - Içerigi uyarlamaniz gerektiginde bunu kesme noktalariniza dayandirin.
    - Ana kesme noktalarinizdan yerlesiminizin bir üst düzey görüntüsünü olusturun.
related-guides:
  responsive:
    -
      title: Görüntü alanini ayarlama
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Duyarli Web tasarimi"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Içerigi görüntü alanina göre boyutlandirma
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Duyarli Web tasarimi"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Medya Sorgularini Kullanma
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Duyarli Web tasarimi"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Yerlesim kaliplari
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Yerlesim Kaliplari"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Çogunlukla Degisken yerlesim
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Duyarli Web tasarimi"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Yüksek DPI degerine sahip cihazlar için resimleri kaynak kümesiyle gelistirin"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Resimler"
        href: media/images/
    - 
      title: "Yüksek çözünürlüklü resimler veya sanat yönetimi saglamak için medya sorgularini kullanin"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Resimler"
        href: media/images/

notes:
  styling:
    - "Marka yönergelerimize uygun renk, dolgu ve yazi tipi stili içeren bir stil grubunu kabul ettik."
  not-all-at-once:
    - "Tüm ögeleri ayni anda tasimaniz gerekmez, gerektikçe küçük ayarlamalar yapabilirsiniz."
updated_on: 2014-04-23
---

<p class="intro">
  Web'e, küçük ekranli telefonlardan genis ekranli televizyonlara kadar çok çesitli cihazlardan erisilebilir. Her bir cihaz kendi benzersiz avantajlarina, ayni zamanda kisitlamalarina sahiptir. Bir web gelistiricisi olarak tüm cihazlari desteklemeniz beklenir.
</p>

{% include shared/toc.liquid %}

Birden çok ekran boyutunda ve cihaz türünde çalisacak bir site olusturuyoruz. [Önceki makale]({{page.previousPage.relative_url}}) baslikli makalede, sayfanin Bilgi Mimarisi'ni isledik ve bir temel yapi olusturduk.
Bu kilavuzda, içerikle temel yapimizi alip çok sayida ekran boyutuna duyarli güzel bir sayfaya dönüstürecegiz.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Içerik">
    <figcaption>{% link_sample _code/content-without-styles.html %} Içerik ve yapi{% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Son site {% endlink_sample %} </figcaption>
  </figure>
</div>

Önce Mobil Cihazlar web gelistirme ilkelerini izleyerek bir cep telefonuna benzeyen, dar bir görüntü alaniyla basliyoruz ve önce bu deneyimi olusturuyoruz.
Daha sonra, deneyimi daha genis cihaz siniflarina ölçekliyoruz.
Bunu, görüntü alanimizi genisleterek ve tasarim ile yerlesimin düzgün görünüp görünmedigine karar vererek yapabiliriz.

Daha önce, içerigimizin nasil görünmesi gerektigine dair farkli, üst düzey birkaç tasarim olusturmustuk. Simdi sayfamizin bu farkli yerlesimlere uyarlanmasini saglamamiz gerekiyor.
Bunu, içerigi ekran boyutuna sigdirma yöntemimize göre kesme noktalarimizi nereye yerlestirecegimize karar vererek yapiyoruz. Kesme noktalari, yerlesim ve stil degisikliginin gerçeklestigi noktalardir.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Bir görüntü alani ekle

Temel bir sayfa için bile her zaman bir görüntü alani meta etiketi **kullanmaniz gerekir**.
Görüntü alani, birden çok cihaz deneyimi olusturmak için ihtiyaciniz olan en önemli bilesendir.
Bu olmadan, siteniz bir mobil cihazda düzgün çalismaz.

Görüntü alani, tarayiciya sayfanin ekrana sigmasi için ölçeklenmesi gerektigini bildirir.  Görüntü alaninizin sayfanin görüntüsünü kontrol etmesi için belirtebileceginiz birçok farkli yapilandirma vardir.  Varsayilan olarak sunlari öneririz:

{% include_code src=_code/viewport.html snippet=viewport %}

Görüntü alani, dokümanin basinda yer alir ve yalnizca bir kez açiklanmasi gerekir.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Basit stil uygula 

Ürünümüzün ve sirketimizin bir stil kilavuzunda saglanmis çok özel marka bilinci olusturma ve yazi tipi yönergeleri zaten vardir.

### Stil kilavuzu

Stil kilavuzu, sayfanin görsel gösterimini bir üst düzeyde anlamanin yararli bir yoludur ve tasarim genelinde tutarli oldugunuzdan emin olmaniza yardimci olur.

#### Renkler 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Biçimsel resimler eklemek

Önceki kilavuzda, "içerik resimleri" adli resimleri ekledik.  Bunlar, ürünümüzün anlatilmasi açisindan önemli resimlerdi.  Biçimsel resimler, temel içerigin parçasi olarak ihtiyaç duyulmayan, ancak görsel gösteris ekleyen veya kullanicinin dikkatini belirli bir içerik parçasina yönlendirmeye yardimci olan resimlerdir.

Buna iyi bir örnek, "ekranin üst kismi"ndaki içerik için bir manset resmi kullanilmasi olabilir. Genellikle, kullaniciyi ürünle ilgili daha fazla bilgi okumaya ikna etmek için kullanilir.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Tasarlanmis site">
</div>

Eklenmeleri çok basit olabilir. Bizim örnegimizde, bu basligin arka plani olacaktir ve bazi basit CSS'ler araciligiyla uygulanacaktir.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Dikkati içerikten uzaklastirmamasi için bulaniklastirilmis, basit bir arka plan resmi seçtik ve bunu tüm ögeyi `kaplayacak` sekilde ayarladik; böylece, dogru en boy oranini korurken her zaman uzatilir.

<br style="clear: both;">

## İlk kesme noktamizi ayarlayın

Tasarim, yaklasik 600 piksel genisliginde kötü görünmeye basliyor.  Bizim örnegimizde, satirin uzunlugu 10 kelimenin üzerine çikiyor (en uygun okuma uzunlugu) ve bu noktada, bunu degistirmek istiyoruz.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Maalesef tarayiciniz videoyu desteklemiyor.
     <a href="videos/firstbreakpoint.mov">Videoyu indirin</a>.
  </p>
</video>

600 piksel, ilk kesme noktamizi olusturmak için iyi bir yer gibi görünüyor. Bu, ögeleri ekrana daha iyi sigmalari amaciyla yeniden konumlandirmamiz için gereken alani saglayacak.  Bunu, [Medya Sorgulari]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) adli bir teknolojiyi kullanarak yapabiliriz.

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Daha genis bir ekranda daha fazla alan vardir, dolayisiyla içerigin nasil görüntülenebilecegi konusunda daha esnek olunabilir.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

Ürün sayfamiz baglaminda görünüse göre sunlari yapmamiz gerekecek:

*  Tasarimin maksimum genisligini sinirlama.
*  Ögelerin dolgusunu degistirme ve metin boyutunu küçültme.
*  Formu, baslik içerigiyle hizali bir sekilde hareket etmesi için tasima.
*  Videonun içerik çevresinde hareket etmesini saglama.
*  Resimlerin boyutunu küçültme ve daha hos bir tabloda görünmelerini saglama.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Tasarimin maksimum genisligini sinirlama

Yalnizca iki ana yerlesimimizin olmasini seçtik: dar bir görüntü alani ve genis bir görüntü alani. Bu seçimimiz, olusturma sürecimizi büyük ölçüde basitlestirecek.

Ayrica, dar görüntü alaninda kenarliksiz bölümler olusturmaya ve bu bölümlerin, genis görüntü alaninda kenarliksiz kalmasina karar verdik.  Bu, metin ve paragraflarin ultra genis ekranlarda tek, uzun bir satira uzamamasi için ekranin maksimum genisligini sinirlamamiz gerektigi anlamina gelir.  Bu noktanin yaklasik 800 pikselde olmasini seçtik.

Bunu gerçeklestirmek için genisligi sinirlandirmamiz ve ögeleri ortalamamiz gerekir.  Her bir ana bölümün çevresinde bir kapsayici olusturup bir `margin: auto` kodu uygulamaliyiz. Bu, ekranin büyümesine, ancak içerigin ortalanmis bir sekilde ve maksimum 800 piksel boyutta kalmasina olanak taniyacak.

Kapsayici, asagidaki biçimde basit bir `div` ögesi olacak:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## Dolguyu degistirme ve metin boyutunu küçültme

Dar görüntü alaninda, içerigi görüntülemek için çok fazla alanimiz olmadigindan tipografinin boyutu ve agirligi, ekrana sigmasi için çogunlukla önemli ölçüde küçültülür.

Daha genis bir görüntü alanimiz oldugunda kullanicinin daha genis bir ekranda, ancak ekrandan biraz daha uzakta bulunma olasiligini göz önünde bulundurmamiz gerekir.  Içerigin okunabilirligini artirmak için tipografinin boyutunu ve agirligini artirabilir ve ayri alanlari daha da ayirmak için dolguyu degistirebiliriz.

Ürün sayfamizda, bölüm ögelerinin dolgusunu genisligin %5'inde kalacak sekilde ayarlayarak dolguyu artiracagiz.  Ayrica, her bir bölümün basliklarinin boyutunu da artiracagiz.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## Ögeleri genis görüntü alanina uyarlama

Dar görüntü alanimiz, yigin seklinde dogrusal bir görüntüydü.  Her bir ana bölüm ve içindeki içerik, yukaridan asagiya dogru görüntüleniyordu.

Genis görüntü alani, bize içerigi ilgili ekran için en uygun sekilde görüntülemek üzere kullanabilecegimiz fazladan alan verir.  Ürün sayfamiz için bu, IA'miza göre asagidakileri yapabilecegimiz anlamina gelir:

*  Formu, baslik bilgileri çevresinde hareket ettirme.
*  Videoyu, önemli noktalarin sagina yerlestirme.
*  Resimleri döseme.
*  Tabloyu genisletme.

### Form ögesini hareket ettirme

Dar görüntü alani, ögeleri ekrana rahatça yerlestirmek için çok daha az bir yatay alani kullanabilecegimiz anlamina gelir.

Yatay ekran alanini daha etkili kullanmak için basligin dogrusal akisindan çikmamiz ve form ile listeyi yan yana olacaklari sekilde tasimamiz gerekir.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Maalesef tarayiciniz videoyu desteklemiyor.
     <a href="videos/floatingform.mov">Videoyu indirin</a>.
  </p>
</video>

### Video ögesini hareket ettirme

Dar görüntü alani arayüzündeki video, ekranin tam genisligini kaplayacak ve önemli özellikler listesinden sonre yerlestirilecek sekilde tasarlanmistir. Genis bir görüntü alaninda, video çok genisleyecek sekilde ölçeklenir ve özellik listemizin yanina yerlestirildiginde yanlis görünür.

Video ögesinin, dar görüntü alaninin dikey akisinin disina tasinmasi ve genis bir görüntü alaninda içerigin madde imli listesiyle yan yana görüntülenmesi gerekir.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### Resimleri Döseme

Dar görüntü alani arayüzündeki resimler (çogunlukla mobil cihazlar), ekranin tam genisligini kaplayacak ve dikey olarak yigilacak sekilde ayarlanir.  Bu, genis görüntü alaninda iyi bir sekilde ölçeklenmez.

Resimlerin genis bir görüntü alaninda dogru görünmesini saglamak için kapsayici genisliginin %30'una ölçeklenirler ve (dar görüntü alanindaki gibi dikey yerlestirilmeleri yerine) yatay olarak yerlestirilirler. Ayrica, resimleri daha çekici hale getirmek için biraz sinir yariçapi ve kutu gölgesi de ekleyecegiz.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### Resimleri DPI'ya duyarli yapma

Resimleri kullanirken, görüntü alaninin boyutunu ve ekranin yogunlugunu dikkate alin.

Web baslangiçta 96 dpi degerindeki ekranlar için olusturulmustu.  Mobil cihazlarin kullanilmaya baslanmasiyla ekranlarin piksel yogunlugunda büyük bir artis gördük; dizüstü bilgisayarlarin Retina sinifi ekranlarindan hiç söz etmiyoruz bile.  Bunun gibi, 96 dpi degerine kodlanan resimler genellikle yüksek dpi degerine sahip bir cihazda berbat görünür.

Bunun için henüz yaygin bir sekilde benimsenmemis bir çözümümüz var.
Bunu destekleyen tarayicilarda, yüksek yogunluga sahip bir ekranda yüksek yogunluga sahip bir resim görüntüleyebilirsiniz.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tablolar

Tablolarin, dar görüntü alani olan cihazlarda dogru bir sekilde görüntülenmesi çok zordur ve bunlara özel olarak dikkat edilmesi gerekir.

Dar bir görüntü alaninda tablonuzu iki satirdan olusturmanizi, bir satirdaki baslik ve hücrelerin sirasini degistirerek sütunlu görünümü elde etmenizi öneririz.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Maalesef tarayiciniz videoyu desteklemiyor.
     <a href="videos/responsivetable.mov">Videoyu indirin</a>.
  </p>
</video>

Sitemizde, yalnizca tablo içerigi için fazladan bir kesme noktasi olusturmamiz gerekiyordu.
Önce bir mobil cihaz için olusturdugunuzda, uygulanan stilleri geri almak daha zor olacagindan, dar görüntü alani tablosu CSS'sini genis görüntü alani  CSS'sinden ayirmamiz gerekir.
Bu, bize net ve tutarli bir kesme saglar.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Özet

**TEBRIKLER.** Bunu okurken, çok sayida cihazda, biçim katsayisinda ve ekran boyutunda çalisan ilk basit ürün açilis sayfanizi olusturmus olacaksiniz.

Bu yönergeleri uygularsaniz iyi bir baslangiç yaparsiniz:

1.  Bir temel IA olusturun ve kodlamadan önce içeriginizi anlayin.
2.  Her zaman bir görüntü alani ayarlayin.
3.  Temel deneyiminizi önce mobil cihazlar yaklasimiyla olusturun.
4.  Mobil deneyiminizi olusturduktan sonra, görüntünün genisligini görüntü bozulmaya baslayana kadar artirin ve kesme noktanizi buraya ayarlayin.
5.  Bunu tekrarlamaya devam edin.



