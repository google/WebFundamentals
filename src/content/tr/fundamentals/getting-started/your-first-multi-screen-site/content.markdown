---
title: "Içeriginizi ve Yapinizi Olusturma"
description: "Içerik, bir sitenin en önemli ögesidir. Bu kilavuzda, ilk çoklu cihaz sitenizi olusturmayi hizli bir sekilde nasil planlayabileceginizi gösterecegiz."
notes:
  styling:
    - Stil daha sonra gelecektir 
updated_on: 2014-04-23
related-guides:
  create-amazing-forms:
    -
      title: Harika formlar olusturma
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Formlar"
        href: fundamentals/input/form/
    -
      title: Girisleri dogru bir sekilde etiketleme ve adlandirma
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Formlar"
        href: fundamentals/input/form/
    -
      title: En iyi giris türünü seçme
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Formlar"
        href: fundamentals/input/form/
  video:
    -
      title: Videoyu etkili bir sekilde kullanma
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Baslangiç konumunu degistirme
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Bir poster resmi ekleme
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
  images:
    -
      title: Resimleri etkili bir sekilde kullanma
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Resimler"
        href: fundamentals/media/
    -
      title:  Resimleri biçimlendirmede dogru bir sekilde kullanma
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Resimler"
        href: fundamentals/media/
    -
      title: Resim optimizasyonu
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Resimler"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - Öncelikle ihtiyaciniz olan içerigi tanimlayin.
    - Dar ve genis görüntü alanlari için Bilgi Mimarisi`ni (IA) tasarlayin.
    - "Stil olmadan, içerikle birlikte sayfanin bir iskelet görünümünü olusturun."
---

<p class="intro">
  Içerik, bir sitenin en önemli ögesidir. O zaman, içerige göre tasarim yapip tasarimin içerige hükmetmesine izin vermeyelim. Bu kilavuzda, öncelikle ihtiyacimiz olan içerigi tanimlayacagiz, bu içerige dayali bir sayfa yapisi olusturacagiz ve daha sonra, sayfayi, dar ve genis görüntü alanlarinda düzgün çalisan basit bir dogrusal yerlesimde sunacagiz.
</p>

{% include shared/toc.liquid %}

## Sayfa yapisini olusturma

Asagidakilere ihtiyacimiz oldugunu belirledik:

1.  Yüksek bir düzeyde ürünümüz olan `CS256: Mobil web gelistirme` kursunu açiklayan bir alan
2.  Ürünümüzle ilgilenen kullanicilardan bilgi toplamak için bir form
3.  Ayrintili bir açiklama ve video
4.  Ürününün eylem halindeyken resimleri
5.  Iddialari destekleyen bilgilerin bulundugu bir veri tablosu

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Ayrica, hem dar hem de genis görüntü alanlari için kaba bir bilgi mimarisi ve yerlesim de olusturduk.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Dar Görüntü Alani IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Genis Görüntü Alani IA">
</div>

Bu, projenin geri kalaninda kullanacagimiz iskelet sayfanin kaba bölümlerine kolayca dönüstürülebilir.

{% include_code src=_code/addstructure.html snippet=structure %}

## Sayfaya içerik ekleme

Sitenin temel yapisi tamamlandi. Ihtiyacimiz olan bölümleri, bu bölümlerde görüntülenecek içerigi ve genel bilgi mimarisi içinde bunu nereye yerlestirecegimizi biliyoruz. Artik sitemizi olusturmaya baslayabiliriz.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Baslik ve formu olusturma

Baslik ve istek bildirim formu, sayfamizin önemli bilesenleridir. Bunlarin kullaniciya hemen sunulmasi gerekir.

Basliga, kursu açiklamak için basit bir metin ekleyin:

{% include_code src=_code/addheadline.html snippet=headline %}

Formu da doldurmamiz gerekiyor.
Bu, kullanicilarin adlarini, telefon numaralarini ve onlari geri aramak için uygun olduklari zaman bilgisini toplayan basit bir form olacak.

Kullanicilarin ögelere kolayca odaklanmalarini, içinde ne olmasi gerektigini anlamalarini kolaylastirmak ve ayrica, erisilebilirlik araçlarinin formun yapisini anlamasina yardimci olmak için tüm formlarin etiketleri ve yer tutuculari olmalidir.  Ad özelligi yalnizca form degerini sunucuya göndermekle kalmaz, ayni zamanda tarayiciya, formu kullanici adina otomatik olarak nasil dolduracagiyla ilgili önemli ipuçlari da verir.

Kullanicilarin bir mobil cihazda içerigi hizli ve basit bir sekilde girebilmelerini saglamak için anlamsal türler ekleyecegiz.  Örnegin, bir telefon numarasi girerken kullanicinin yalnizca bir tus takimi görmesi gerekir.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Video ve Bilgi bölümünü olusturma

Içerigin Video ve Bilgi bölümü biraz daha derinlige sahiptir.
Ürünlerimizin özelliklerinin madde imli bir listesini ve ayrica, bir kullaniciyi ürünümüzü kullanirken gösteren bir video yer tutucusunu içerir.

{% include_code src=_code/addcontent.html snippet=section1 %}

Videolar genellikle içerigi daha etkilesimli bir sekilde açiklamak ve siklikla bir ürünün veya kavramin tanitim gösterisini göstermek için kullanilir.

En iyi uygulamalari izleyerek videoyu sitenize kolayca entegre edebilirsiniz:

*  Kullanicilarin videoyu oynatmalarini kolaylastirmak için bir `controls` özelligi ekleyin.
*  Kullanicilara içerigin bir önizlemesini saglamak için bir `poster` resmi ekleyin.
*  Desteklenen video biçimlerine göre birden çok `<source>` ögesi ekleyin.
*  Kullanicilarin videoyu pencerede oynatamamalari durumunda indirebilmelerini saglamak için yedek metin ekleyin.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Resimler Bölümünü Olusturma

Resim bulunmayan siteler biraz sikici olabilir. Iki tür resim vardir:

*  Içerik resimleri: Dokümanla ayni dogrultuda olan ve içerikle ilgili fazladan bilgileri aktarmak için kullanilan resimler.
*  Biçimsel resimler: Sitenin daha iyi görünmesi için kullanilan resimler; bunlar genellikle arka plan resimleri, kaliplar ve renk geçisleri seklindedir.  Bu konuyu [sonraki makale]({{page.nextPage.relative_url}}) baslikli makalede ele alacagiz.

Sayfamizdaki Resimler bölümü, içerik resimlerinden olusan bir koleksiyondur.

Içerik resimleri, sayfanin anlamini aktarma açisindan önemlidir. Bunlari, gazete makalelerinde kullanilan resimler gibi düsünebilirsiniz. Kullandigimiz resimler, projenin egitmenleri olan Chris Wilson, Peter Lubbers ve Sean Bennet'in resimleridir.

{% include_code src=_code/addimages.html snippet=images lang=html %}

Resimler, ekran genisliginin %100 ölçegine ayarlanmistir. Bu, dar görüntü alani olan cihazlarda iyi bir sekilde çalisir, ancak genis görüntü alanina sahip cihazlarda (masaüstü bilgisayarlar gibi) çok iyi görünmez.  Bunu, duyarli tasarim bölümünde ele alacagiz.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Birçok kisi, resimleri görüntüleyemez ve genellikle, sayfadaki verileri ayristiran ve bunu kullaniciya sözlü olarak aktaran ekran okuyucu gibi bir yardimci teknoloji kullanir.  Tüm içerik resimlerinizde, ekran okuyucunun resmi kullaniciya açiklayabilmesi için bir tanimlayici `alt` etiketinin bulundugundan emin olun.

`alt` etiketlerini eklerken, resmi tam olarak açiklamak için alt metnini mümkün oldugunca kisa tuttugunuzdan emin olun.  Örnegin, demomuzda özelligi `Ad: Rol` olacak sekilde biçimlendiriyoruz. Bu, kullanicinin bu bölümün yazarlar ve yazarlarin isleriyle ilgili oldugunu anlamasi için yeterli bilgi sunmaktadir.

### Tablolastirilmis Veri Bölümünü Ekleme

Son bölüm, ürünle ilgili belirli ürün verilerini göstermek için kullanilan basit bir tablodur.

Tablolar yalnizca bilgi matrisleri gibi tablo seklindeki veriler için kullanilmalidir.

{% include_code src=_code/addcontent.html snippet=section3 %}

### Altbilgi Ekleme

Çogu sitenin Sartlar ve Kosullar, sorumlulugun reddi beyanlari gibi içerigi ve sayfanin ana gezinme veya ana içerik alaninda bulunmamasi gereken baska içerikleri görüntülemek için bir altbilgiye ihtiyaci vardir.

Bizim sitemizde, yalnizca Sartlar ve Kosullar'a, bir Iletisim sayfasina ve sosyal medya profillerimize baglanti verecegiz.

{% include_code src=_code/addcontent.html snippet=footer %}

## Özet

Sitenin ana hatlarini olusturduk ve ana yapisal ögelerin tümünü tanimladik.  Ayrica, ilgili tüm içerigin is gereksinimlerimizi karsilamak üzere hazir ve yerinde oldugundan emin olduk.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="içerik">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Sayfanin su anda kötü göründügünü fark etmissinizdir; bunu bilinçli olarak böyle yaptik. 
Içerik, bir sitenin en önemli ögesidir ve saglam bir bilgi mimarisine ve yogunluga sahip oldugumuzdan emin olmamiz gerekiyordu. Bu kilavuz, bize dayanabilecegimiz harika bir temel verdi. Sonraki kilavuzda içerigimizi biçimlendirecegiz.



