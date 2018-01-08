project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web'e, küçük ekranli telefonlardan genis ekranli televizyonlara kadar çok çesitli cihazlardan erisilebilir. Tüm bu cihazlarda iyi bir sekilde çalisacak bir siteyi nasil olusturacaginizi ögrenin.

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Ilk Çoklu Cihaz Siteniz {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



Çoklu cihaz deneyimleri olusturmak sanildigi kadar zor degildir. Bu kilavuzu izleyerek <a href='https://www.udacity.com/course/mobile-web-development--cs256'>CS256 Mobil Web Gelistirme kursumuz</a> için farkli cihaz türlerinin tümünde iyi sekilde çalisan bir örnek ürün açilis sayfasi olusturacagiz.

<img src="images/finaloutput-2x.jpg" alt="son projeyi gösteren birçok cihaz">

Farkli yeteneklere, oldukça farkli ekran boyutlarina ve etkilesim yöntemlerine sahip birden çok cihaz için olusturma, baslangiçta imkansiz gibi görünmese de göz korkutucu gelebilir.

Tamamiyla duyarli siteler olusturmak düsündügünüz kadar zor degildir ve size göstermek için bu kilavuzda, baslarken kullanabileceginiz adimlar ayrintili bir sekilde açiklanmaktadir.  Bunu iki basit adima ayirdik:

1.  Sayfanin bilgi mimarisini (genellikle IA olarak bilinir) ve yapisini tanimlama, 2.  Sayfanin duyarli olmasi ve tüm cihazlarda iyi görünmesi için tasarim ögeleri ekleme.




## Içeriginizi ve Yapinizi Olusturma 




Içerik, bir sitenin en önemli ögesidir. O zaman, içerige göre tasarim yapip tasarimin içerige hükmetmesine izin vermeyelim. Bu kilavuzda, öncelikle ihtiyacimiz olan içerigi tanimlayacagiz, bu içerige dayali bir sayfa yapisi olusturacagiz ve daha sonra, sayfayi, dar ve genis görüntü alanlarinda düzgün çalisan basit bir dogrusal yerlesimde sunacagiz.


### Sayfa yapisini olusturma

Asagidakilere ihtiyacimiz oldugunu belirledik:

1.  Yüksek bir düzeyde ürünümüz olan `CS256: Mobil web gelistirme` kursunu açiklayan bir alan
2.  Ürünümüzle ilgilenen kullanicilardan bilgi toplamak için bir form
3.  Ayrintili bir açiklama ve video
4.  Ürününün eylem halindeyken resimleri
5.  Iddialari destekleyen bilgilerin bulundugu bir veri tablosu

### TL;DR {: .hide-from-toc }
- Öncelikle ihtiyaciniz olan içerigi tanimlayin.
- Dar ve genis görüntü alanlari için Bilgi Mimarisi`ni (IA) tasarlayin.
- Stil olmadan, içerikle birlikte sayfanin bir iskelet görünümünü olusturun.


Ayrica, hem dar hem de genis görüntü alanlari için kaba bir bilgi mimarisi ve yerlesim de olusturduk.

<div class="demo clear" style="background-color: white;">
  <img class="attempt-left" src="images/narrowviewport.png" alt="Dar Görüntü Alani IA">
  <img  class="attempt-right" src="images/wideviewport.png" alt="Genis Görüntü Alani IA">
</div>

Bu, projenin geri kalaninda kullanacagimiz iskelet sayfanin kaba bölümlerine kolayca dönüstürülebilir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### Sayfaya içerik ekleme

Sitenin temel yapisi tamamlandi. Ihtiyacimiz olan bölümleri, bu bölümlerde görüntülenecek içerigi ve genel bilgi mimarisi içinde bunu nereye yerlestirecegimizi biliyoruz. Artik sitemizi olusturmaya baslayabiliriz.

Note: Stil daha sonra gelecektir

#### Baslik ve formu olusturma

Baslik ve istek bildirim formu, sayfamizin önemli bilesenleridir. Bunlarin kullaniciya hemen sunulmasi gerekir.

Basliga, kursu açiklamak için basit bir metin ekleyin:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

Formu da doldurmamiz gerekiyor.
Bu, kullanicilarin adlarini, telefon numaralarini ve onlari geri aramak için uygun olduklari zaman bilgisini toplayan basit bir form olacak.

Kullanicilarin ögelere kolayca odaklanmalarini, içinde ne olmasi gerektigini anlamalarini kolaylastirmak ve ayrica, erisilebilirlik araçlarinin formun yapisini anlamasina yardimci olmak için tüm formlarin etiketleri ve yer tutuculari olmalidir.  Ad özelligi yalnizca form degerini sunucuya göndermekle kalmaz, ayni zamanda tarayiciya, formu kullanici adina otomatik olarak nasil dolduracagiyla ilgili önemli ipuçlari da verir.

Kullanicilarin bir mobil cihazda içerigi hizli ve basit bir sekilde girebilmelerini saglamak için anlamsal türler ekleyecegiz.  Örnegin, bir telefon numarasi girerken kullanicinin yalnizca bir tus takimi görmesi gerekir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Video ve Bilgi bölümünü olusturma

Içerigin Video ve Bilgi bölümü biraz daha derinlige sahiptir.
Ürünlerimizin özelliklerinin madde imli bir listesini ve ayrica, bir kullaniciyi ürünümüzü kullanirken gösteren bir video yer tutucusunu içerir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

Videolar genellikle içerigi daha etkilesimli bir sekilde açiklamak ve siklikla bir ürünün veya kavramin tanitim gösterisini göstermek için kullanilir.

En iyi uygulamalari izleyerek videoyu sitenize kolayca entegre edebilirsiniz:

*  Kullanicilarin videoyu oynatmalarini kolaylastirmak için bir `controls` özelligi ekleyin.
*  Kullanicilara içerigin bir önizlemesini saglamak için bir `poster` resmi ekleyin.
*  Desteklenen video biçimlerine göre birden çok `<source>` ögesi ekleyin.
*  Kullanicilarin videoyu pencerede oynatamamalari durumunda indirebilmelerini saglamak için yedek metin ekleyin.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video"   adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Resimler Bölümünü Olusturma

Resim bulunmayan siteler biraz sikici olabilir. Iki tür resim vardir:

*  Içerik resimleri: Dokümanla ayni dogrultuda olan ve içerikle ilgili fazladan bilgileri aktarmak için kullanilan resimler.
*  Biçimsel resimler: Sitenin daha iyi görünmesi için kullanilan resimler; bunlar genellikle arka plan resimleri, kaliplar ve renk geçisleri seklindedir.  Bu konuyu [sonraki makale](#) baslikli makalede ele alacagiz.

Sayfamizdaki Resimler bölümü, içerik resimlerinden olusan bir koleksiyondur.

Içerik resimleri, sayfanin anlamini aktarma açisindan önemlidir. Bunlari, gazete makalelerinde kullanilan resimler gibi düsünebilirsiniz. Kullandigimiz resimler, projenin egitmenleri olan Chris Wilson, Peter Lubbers ve Sean Bennet'in resimleridir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

Resimler, ekran genisliginin %100 ölçegine ayarlanmistir. Bu, dar görüntü alani olan cihazlarda iyi bir sekilde çalisir, ancak genis görüntü alanina sahip cihazlarda (masaüstü bilgisayarlar gibi) çok iyi görünmez.  Bunu, duyarli tasarim bölümünde ele alacagiz.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Birçok kisi, resimleri görüntüleyemez ve genellikle, sayfadaki verileri ayristiran ve bunu kullaniciya sözlü olarak aktaran ekran okuyucu gibi bir yardimci teknoloji kullanir.  Tüm içerik resimlerinizde, ekran okuyucunun resmi kullaniciya açiklayabilmesi için bir tanimlayici `alt` etiketinin bulundugundan emin olun.

`alt` etiketlerini eklerken, resmi tam olarak açiklamak için alt metnini mümkün oldugunca kisa tuttugunuzdan emin olun.  Örnegin, demomuzda özelligi `Ad: Rol` olacak sekilde biçimlendiriyoruz. Bu, kullanicinin bu bölümün yazarlar ve yazarlarin isleriyle ilgili oldugunu anlamasi için yeterli bilgi sunmaktadir.

#### Tablolastirilmis Veri Bölümünü Ekleme

Son bölüm, ürünle ilgili belirli ürün verilerini göstermek için kullanilan basit bir tablodur.

Tablolar yalnizca bilgi matrisleri gibi tablo seklindeki veriler için kullanilmalidir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### Altbilgi Ekleme

Çogu sitenin Sartlar ve Kosullar, sorumlulugun reddi beyanlari gibi içerigi ve sayfanin ana gezinme veya ana içerik alaninda bulunmamasi gereken baska içerikleri görüntülemek için bir altbilgiye ihtiyaci vardir.

Bizim sitemizde, yalnizca Sartlar ve Kosullar'a, bir Iletisim sayfasina ve sosyal medya profillerimize baglanti verecegiz.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### Özet

Sitenin ana hatlarini olusturduk ve ana yapisal ögelerin tümünü tanimladik.  Ayrica, ilgili tüm içerigin is gereksinimlerimizi karsilamak üzere hazir ve yerinde oldugundan emin olduk.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Içerik">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Içerik ve yapi</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Son site </a>
    </figcaption>
  </figure>
</div>

Sayfanin su anda kötü göründügünü fark etmissinizdir; bunu bilinçli olarak böyle yaptik. 
Içerik, bir sitenin en önemli ögesidir ve saglam bir bilgi mimarisine ve yogunluga sahip oldugumuzdan emin olmamiz gerekiyordu. Bu kilavuz, bize dayanabilecegimiz harika bir temel verdi. Sonraki kilavuzda içerigimizi biçimlendirecegiz.





## Duyarli Olmasini Saglayin 




Web'e, küçük ekranli telefonlardan genis ekranli televizyonlara kadar çok çesitli cihazlardan erisilebilir. Her bir cihaz kendi benzersiz avantajlarina, ayni zamanda kisitlamalarina sahiptir. Bir web gelistiricisi olarak tüm cihazlari desteklemeniz beklenir.


Birden çok ekran boyutunda ve cihaz türünde çalisacak bir site olusturuyoruz. [Önceki makale](#) baslikli makalede, sayfanin Bilgi Mimarisi'ni isledik ve bir temel yapi olusturduk.
Bu kilavuzda, içerikle temel yapimizi alip çok sayida ekran boyutuna duyarli güzel bir sayfaya dönüstürecegiz.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Içerik">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Içerik ve yapi</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Son site </a>
    </figcaption>
  </figure>
</div>

Önce Mobil Cihazlar web gelistirme ilkelerini izleyerek bir cep telefonuna benzeyen, dar bir görüntü alaniyla basliyoruz ve önce bu deneyimi olusturuyoruz.
Daha sonra, deneyimi daha genis cihaz siniflarina ölçekliyoruz.
Bunu, görüntü alanimizi genisleterek ve tasarim ile yerlesimin düzgün görünüp görünmedigine karar vererek yapabiliriz.

Daha önce, içerigimizin nasil görünmesi gerektigine dair farkli, üst düzey birkaç tasarim olusturmustuk. Simdi sayfamizin bu farkli yerlesimlere uyarlanmasini saglamamiz gerekiyor.
Bunu, içerigi ekran boyutuna sigdirma yöntemimize göre kesme noktalarimizi nereye yerlestirecegimize karar vererek yapiyoruz. Kesme noktalari, yerlesim ve stil degisikliginin gerçeklestigi noktalardir.

### TL;DR {: .hide-from-toc }
- Her zaman bir görüntü alani kullanin.
- Her zaman önce dar bir görüntü alaniyla baslayip daha sonra bunu genisletin.
- Içerigi uyarlamaniz gerektiginde bunu kesme noktalariniza dayandirin.
- Ana kesme noktalarinizdan yerlesiminizin bir üst düzey görüntüsünü olusturun.


### Bir görüntü alani ekle

Temel bir sayfa için bile her zaman bir görüntü alani meta etiketi **kullanmaniz gerekir**.
Görüntü alani, birden çok cihaz deneyimi olusturmak için ihtiyaciniz olan en önemli bilesendir.
Bu olmadan, siteniz bir mobil cihazda düzgün çalismaz.

Görüntü alani, tarayiciya sayfanin ekrana sigmasi için ölçeklenmesi gerektigini bildirir.  Görüntü alaninizin sayfanin görüntüsünü kontrol etmesi için belirtebileceginiz birçok farkli yapilandirma vardir.  Varsayilan olarak sunlari öneririz:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

Görüntü alani, dokümanin basinda yer alir ve yalnizca bir kez açiklanmasi gerekir.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Basit stil uygula 

Ürünümüzün ve sirketimizin bir stil kilavuzunda saglanmis çok özel marka bilinci olusturma ve yazi tipi yönergeleri zaten vardir.

#### Stil kilavuzu

Stil kilavuzu, sayfanin görsel gösterimini bir üst düzeyde anlamanin yararli bir yoludur ve tasarim genelinde tutarli oldugunuzdan emin olmaniza yardimci olur.

##### Renkler 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Biçimsel resimler eklemek

Önceki kilavuzda, "içerik resimleri" adli resimleri ekledik.  Bunlar, ürünümüzün anlatilmasi açisindan önemli resimlerdi.  Biçimsel resimler, temel içerigin parçasi olarak ihtiyaç duyulmayan, ancak görsel gösteris ekleyen veya kullanicinin dikkatini belirli bir içerik parçasina yönlendirmeye yardimci olan resimlerdir.

Buna iyi bir örnek, "ekranin üst kismi"ndaki içerik için bir manset resmi kullanilmasi olabilir. Genellikle, kullaniciyi ürünle ilgili daha fazla bilgi okumaya ikna etmek için kullanilir.

<img  src="images/narrowsite.png" alt="Tasarlanmis site"  class="attempt-right" />

Eklenmeleri çok basit olabilir. Bizim örnegimizde, bu basligin arka plani olacaktir ve bazi basit CSS'ler araciligiyla uygulanacaktir.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Dikkati içerikten uzaklastirmamasi için bulaniklastirilmis, basit bir arka plan resmi seçtik ve bunu tüm ögeyi `kaplayacak` sekilde ayarladik; böylece, dogru en boy oranini korurken her zaman uzatilir.

<br style="clear: both;">

### İlk kesme noktamizi ayarlayın

Tasarim, yaklasik 600 piksel genisliginde kötü görünmeye basliyor.  Bizim örnegimizde, satirin uzunlugu 10 kelimenin üzerine çikiyor (en uygun okuma uzunlugu) ve bu noktada, bunu degistirmek istiyoruz.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Maalesef tarayiciniz videoyu desteklemiyor.
     <a href="videos/firstbreakpoint.mov">Videoyu indirin</a>.
  </p>
</video>

600 piksel, ilk kesme noktamizi olusturmak için iyi bir yer gibi görünüyor. Bu, ögeleri ekrana daha iyi sigmalari amaciyla yeniden konumlandirmamiz için gereken alani saglayacak.  Bunu, [Medya Sorgulari](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness) adli bir teknolojiyi kullanarak yapabiliriz.


    @media (min-width: 600px) {
    
    }
    

Daha genis bir ekranda daha fazla alan vardir, dolayisiyla içerigin nasil görüntülenebilecegi konusunda daha esnek olunabilir.

Note: Tüm ögeleri ayni anda tasimaniz gerekmez, gerektikçe küçük ayarlamalar yapabilirsiniz.

Ürün sayfamiz baglaminda görünüse göre sunlari yapmamiz gerekecek:

*  Tasarimin maksimum genisligini sinirlama.
*  Ögelerin dolgusunu degistirme ve metin boyutunu küçültme.
*  Formu, baslik içerigiyle hizali bir sekilde hareket etmesi için tasima.
*  Videonun içerik çevresinde hareket etmesini saglama.
*  Resimlerin boyutunu küçültme ve daha hos bir tabloda görünmelerini saglama.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### Tasarimin maksimum genisligini sinirlama

Yalnizca iki ana yerlesimimizin olmasini seçtik: dar bir görüntü alani ve genis bir görüntü alani. Bu seçimimiz, olusturma sürecimizi büyük ölçüde basitlestirecek.

Ayrica, dar görüntü alaninda kenarliksiz bölümler olusturmaya ve bu bölümlerin, genis görüntü alaninda kenarliksiz kalmasina karar verdik.  Bu, metin ve paragraflarin ultra genis ekranlarda tek, uzun bir satira uzamamasi için ekranin maksimum genisligini sinirlamamiz gerektigi anlamina gelir.  Bu noktanin yaklasik 800 pikselde olmasini seçtik.

Bunu gerçeklestirmek için genisligi sinirlandirmamiz ve ögeleri ortalamamiz gerekir.  Her bir ana bölümün çevresinde bir kapsayici olusturup bir `margin: auto` kodu uygulamaliyiz. Bu, ekranin büyümesine, ancak içerigin ortalanmis bir sekilde ve maksimum 800 piksel boyutta kalmasina olanak taniyacak.

Kapsayici, asagidaki biçimde basit bir `div` ögesi olacak:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### Dolguyu degistirme ve metin boyutunu küçültme

Dar görüntü alaninda, içerigi görüntülemek için çok fazla alanimiz olmadigindan tipografinin boyutu ve agirligi, ekrana sigmasi için çogunlukla önemli ölçüde küçültülür.

Daha genis bir görüntü alanimiz oldugunda kullanicinin daha genis bir ekranda, ancak ekrandan biraz daha uzakta bulunma olasiligini göz önünde bulundurmamiz gerekir.  Içerigin okunabilirligini artirmak için tipografinin boyutunu ve agirligini artirabilir ve ayri alanlari daha da ayirmak için dolguyu degistirebiliriz.

Ürün sayfamizda, bölüm ögelerinin dolgusunu genisligin %5'inde kalacak sekilde ayarlayarak dolguyu artiracagiz.  Ayrica, her bir bölümün basliklarinin boyutunu da artiracagiz.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Ögeleri genis görüntü alanina uyarlama

Dar görüntü alanimiz, yigin seklinde dogrusal bir görüntüydü.  Her bir ana bölüm ve içindeki içerik, yukaridan asagiya dogru görüntüleniyordu.

Genis görüntü alani, bize içerigi ilgili ekran için en uygun sekilde görüntülemek üzere kullanabilecegimiz fazladan alan verir.  Ürün sayfamiz için bu, IA'miza göre asagidakileri yapabilecegimiz anlamina gelir:

*  Formu, baslik bilgileri çevresinde hareket ettirme.
*  Videoyu, önemli noktalarin sagina yerlestirme.
*  Resimleri döseme.
*  Tabloyu genisletme.

#### Form ögesini hareket ettirme

Dar görüntü alani, ögeleri ekrana rahatça yerlestirmek için çok daha az bir yatay alani kullanabilecegimiz anlamina gelir.

Yatay ekran alanini daha etkili kullanmak için basligin dogrusal akisindan çikmamiz ve form ile listeyi yan yana olacaklari sekilde tasimamiz gerekir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Maalesef tarayiciniz videoyu desteklemiyor.
     <a href="videos/floatingform.mov">Videoyu indirin</a>.
  </p>
</video>

#### Video ögesini hareket ettirme

Dar görüntü alani arayüzündeki video, ekranin tam genisligini kaplayacak ve önemli özellikler listesinden sonre yerlestirilecek sekilde tasarlanmistir. Genis bir görüntü alaninda, video çok genisleyecek sekilde ölçeklenir ve özellik listemizin yanina yerlestirildiginde yanlis görünür.

Video ögesinin, dar görüntü alaninin dikey akisinin disina tasinmasi ve genis bir görüntü alaninda içerigin madde imli listesiyle yan yana görüntülenmesi gerekir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### Resimleri Döseme

Dar görüntü alani arayüzündeki resimler (çogunlukla mobil cihazlar), ekranin tam genisligini kaplayacak ve dikey olarak yigilacak sekilde ayarlanir.  Bu, genis görüntü alaninda iyi bir sekilde ölçeklenmez.

Resimlerin genis bir görüntü alaninda dogru görünmesini saglamak için kapsayici genisliginin %30'una ölçeklenirler ve (dar görüntü alanindaki gibi dikey yerlestirilmeleri yerine) yatay olarak yerlestirilirler. Ayrica, resimleri daha çekici hale getirmek için biraz sinir yariçapi ve kutu gölgesi de ekleyecegiz.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Resimleri DPI'ya duyarli yapma

Resimleri kullanirken, görüntü alaninin boyutunu ve ekranin yogunlugunu dikkate alin.

Web baslangiçta 96 dpi degerindeki ekranlar için olusturulmustu.  Mobil cihazlarin kullanilmaya baslanmasiyla ekranlarin piksel yogunlugunda büyük bir artis gördük; dizüstü bilgisayarlarin Retina sinifi ekranlarindan hiç söz etmiyoruz bile.  Bunun gibi, 96 dpi degerine kodlanan resimler genellikle yüksek dpi degerine sahip bir cihazda berbat görünür.

Bunun için henüz yaygin bir sekilde benimsenmemis bir çözümümüz var.
Bunu destekleyen tarayicilarda, yüksek yogunluga sahip bir ekranda yüksek yogunluga sahip bir resim görüntüleyebilirsiniz.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tablolar

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### Özet

**TEBRIKLER.** Bunu okurken, çok sayida cihazda, biçim katsayisinda ve ekran boyutunda çalisan ilk basit ürün açilis sayfanizi olusturmus olacaksiniz.

Bu yönergeleri uygularsaniz iyi bir baslangiç yaparsiniz:

1.  Bir temel IA olusturun ve kodlamadan önce içeriginizi anlayin.
2.  Her zaman bir görüntü alani ayarlayin.
3.  Temel deneyiminizi önce mobil cihazlar yaklasimiyla olusturun.
4.  Mobil deneyiminizi olusturduktan sonra, görüntünün genisligini görüntü bozulmaya baslayana kadar artirin ve kesme noktanizi buraya ayarlayin.
5.  Bunu tekrarlamaya devam edin.



