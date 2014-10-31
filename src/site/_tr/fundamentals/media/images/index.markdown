---
layout: section
title: "Resimler"
description: "Bir resim 1000 kelimeye bedeldir ve resimler, her sayfanin ayrilmaz bir parçasidir. Ayni zamanda indirilen baytlarin çogunlugundan genellikle bunlar sorumludur.  Duyarli web tasarimiyla, cihaz özelliklerine dayali olarak yalnizca yer paylasimlarimiz degil, ayni zamanda resimler de degisebiliyor."
introduction: "Bir resim 1000 kelimeye bedeldir ve resimler, her sayfanin ayrilmaz bir parçasidir. Ayni zamanda indirilen baytlarin çogunlugundan genellikle bunlar sorumludur.  Duyarli web tasarimiyla cihaz özelliklerine dayali olarak yalnizca yer paylasimlarimiz degil, ayni zamanda resimler de degisebiliyor."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
id: images
key-takeaways:
  use-right-image:
    - Görüntünün özellikleri için en iyi resmi kullanin; ekran boyutu, cihaz çözünürlügü ve sayfa yerlesimini dikkate alin.
    - <code>min-resolution</code> ve <code>-webkit-min-device-pixel-ratio</code> ile medya sorgulari kullanan yüksek DPI`ya sahip görüntüler için CSS`deki <code>background-image</code> özelligini degistirin.
    - Biçimlendirmede 1x resme ek olarak yüksek çözünürlüklü resimler saglamak için srcset tanimlayicisini kullanin.
    - JavaScript resim degistirme tekniklerini kullanirken veya son derece sikistirilmis yüksek çözünürlüklü resimleri düsük çözünürlüklü cihazlara sunarken performans maliyetlerini göz önünde bulundurun.
  avoid-images:
    - Mümkün oldugunda resim kullanmaktan kaçinin; bunun yerine, tarayici yeteneklerinden yararlanin, resimlerin yerine unicode karakterler kullanin ve karmasik simgeleri simge yazi tipleriyle degistirin.
  optimize-images:
    - Rastgele bir resim biçimi seçmekle kalmayin, kullanabileceginiz farkli biçimleri anlayin ve en uygun biçimi kullanin.
    - Dosya boyutlarini küçültmek için is akisiniza resim optimizasyonu ve sikistirma araçlarini dahil edin.
    - Sik kullanilan resimleri, resim bagimsiz görüntülerinin içine yerlestirerek http isteklerinin sayisini azaltin.
    - Ilk sayfa yükleme süresini iyilestirmek ve ilk sayfa agirligini azaltmak için resimleri yalnizca görünümün içine kaydirilmalarindan sonra yüklemeyi degerlendirin.
remember:
  compressive:
    - Daha fazla bellek gerektirmesi ve kod çözme maliyetlerinden dolayi sikistirma teknigini dikkatli kullanin.  Büyük resimleri küçük ekranlara sigdirmak üzere yeniden boyutlandirmak pahali bir islemdir ve özellikle hem bellegin hem de islemenin sinirli oldugu giris seviyesi cihazlarda zor olabilir.
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

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### Duyarli resimler

Duyarli web tasarimi, cihaz özelliklerine dayali olarak yalnizca yer paylasimlarimizin degil, ayni zamanda içerigin de degisebilecegi anlamina gelir.  Örnegin, yüksek çözünürlüklü (2x) ekranlarda netligin saglanmasi için yüksek çözünürlüklü grafiklerin kullanilmasi gerekir.  %50 genislikteki bir resim, tarayici 800 piksel genisliginde oldugunda iyi çalisabilir, ancak dar bir telefonda çok fazla alan kullanir ve küçük ekrana sigdirilmasi için ölçeklendiginde ayni bant genisligi ek yüküyle gelir.

### Sanat yönetimi

<img class="center" src="img/art-direction.png" alt="Sanat yönetimi örnegi"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Resmin önemli ölçüde degistirilmesinin gerekebilecegi diger zamanlar sunlardir: Oranlarin degismesi, resmin kirpilmasi ve tüm resmin degistirilmesi.  Bu durumda, resmin degistirilmesine genellikle sanat yönetimi adi verilir.  Daha fazla örnek için [responsiveimages.org/demos/](http://responsiveimages.org/demos/) adresine bakin.

{% include modules/nextarticle.liquid %}

{% endwrap %}

