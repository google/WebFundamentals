---
title: "Performans için resimleri optimize etme"
description: "Resimler genellikle indirilen baytlarin çogunlugundan sorumludur ve sayfadaki görsel alanin önemli bir kismini kaplar."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Görüntünün özellikleri için en iyi resmi kullanin; ekran boyutu, cihaz çözünürlügü ve sayfa yerlesimini dikkate alin."
    - "<code>min-resolution</code> ve <code>-webkit-min-device-pixel-ratio</code> ile medya sorgulari kullanan yüksek DPI'ya sahip görüntüler için CSS`deki <code>background-image</code> özelligini degistirin."
    - "Biçimlendirmede 1x resme ek olarak yüksek çözünürlüklü resimler saglamak için srcset tanimlayicisini kullanin."
    - "JavaScript resim degistirme tekniklerini kullanirken veya son derece sikistirilmis yüksek çözünürlüklü resimleri düsük çözünürlüklü cihazlara sunarken performans maliyetlerini göz önünde bulundurun."
  avoid-images:
    - "Mümkün oldugunda resim kullanmaktan kaçinin; bunun yerine, tarayici yeteneklerinden yararlanin, resimlerin yerine unicode karakterler kullanin ve karmasik simgeleri simge yazi tipleriyle degistirin."
  optimize-images:
    - "Rastgele bir resim biçimi seçmekle kalmayin, kullanabileceginiz farkli biçimleri anlayin ve en uygun biçimi kullanin."
    - "Dosya boyutlarini küçültmek için is akisiniza resim optimizasyonu ve sikistirma araçlarini dahil edin."
    - "Sik kullanilan resimleri, resim bagimsiz görüntülerinin içine yerlestirerek http isteklerinin sayisini azaltin."
    - "Ilk sayfa yükleme süresini iyilestirmek ve ilk sayfa agirligini azaltmak için resimleri yalnizca görünümün içine kaydirilmalarindan sonra yüklemeyi degerlendirin."
notes:
  compressive:
    - "Daha fazla bellek gerektirmesi ve kod çözme maliyetlerinden dolayi sikistirma teknigini dikkatli kullanin.  Büyük resimleri küçük ekranlara sigdirmak üzere yeniden boyutlandirmak pahali bir islemdir ve özellikle hem bellegin hem de islemenin sinirli oldugu en yalin cihazlarda zor olabilir."
related-guides:
  optimize:
  -
      title: "Resim optimizasyonu"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Içerik Verimliligini Optimize Etme"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Resimler genellikle indirilen baytlarin çogunlugundan sorumludur ve sayfadaki görsel alanin önemli bir kismini kaplar. Sonuç olarak, resimlerin optimize edilmesi genellikle en büyük bayt tasarruflarindan ve web sitenizdeki en iyi performans iyilestirmelerinden bazilarini saglayabilir: Tarayicinin indirmesi gereken bayt miktari azaldikça, istemci bant genisligi için daha az rekabet olur ve tarayici, tüm ögeleri daha hizli indirip görüntüleyebilir.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Dogru biçimi seçme

Dikkate alinacak iki resim türü vardir: [vektör resimleri](http://en.wikipedia.org/wiki/Vector_graphics) ve [tarama resimleri](http://en.wikipedia.org/wiki/Raster_graphics). Tarama resimleri için "GIF", "PNG", "JPG" gibi dogru sikistirma biçimini de seçmeniz gerekir.

**Tarama resimleri**, fotograflar ve bagimsiz noktalar veya piksellerden olusmus bir tablo gibi sunulan diger resimler gibidir. Tarama resimleri genellikle bir kamera veya tarayicidan gelir veya tarayicida `canvas` ögesiyle olusturulabilir.  Resim boyutu büyüdükçe dosya boyutu da büyür.  Orijinal boyutundan daha büyük ölçekli oldugunda, tarayicinin eksik pikselleri nasil dolduracagini tahmin etmesi gerekeceginden tarama resimleri bulaniklasir.

**Vektör resimleri**; bir egri, çizgi, sekil ve dolgu renkleri grubunun tanimladigi logolar ve çizgi resimler gibidir. Vektör resimleri, Adobe Illustrator veya Inkscape gibi programlarla olusturulur ve [`SVG`](http://css-tricks.com/using-svg/) gibi bir vektör biçiminde kaydedilir.  Vektör resimleri basit temel ögelere dayandigindan, dosya boyutunda bir degisiklik olmadan ve kalite kaybina ugramadan ölçeklenebilirler.

Dogru biçimi seçerken, hem resmin kaynaginin (tarama veya vektör) hem de içerigin (renkler, animasyon, metin vb.) dikkate alinmasi önemlidir. Hiçbir biçim tüm resim türleri için uygun degildir ve her bir biçimin güçlü ve zayif oldugu yönler vardir.

Dogru biçimi seçerken su yönergelerle baslayin:

* Fotograf resimleri için `JPG` biçimini kullanin.
* Vektör resimleri ve logolar ile çizgi resimler gibi sabit renkli grafikler için `SVG` biçimini kullanin.
  Vektör resmi kullanilamiyorsa WebP veya PNG'yi deneyin.
* Daha fazla renge olanak tanidigi ve daha iyi sikistirma oranlari sundugu için `GIF` yerine `PNG` biçimini kullanin.
* Daha uzun animasyonlar için daha iyi resim kalitesi saglayan ve kullanicinin oynatma üzerinde denetim sahibi olmasini saglayan `<video>` ögesini kullanmayi düsünebilirsiniz.

## Dosya boyutunu küçültme

Resim dosyasi boyutu, kayit isleminden sonra `son isleme` ile önemli ölçüde küçültülebilir. Resim sikistirmasi için kayipli ve kayipsiz, çevrimiçi, GUI, komut satiri gibi çesitli araçlar vardir.  Mümkün oldugunda, resimlerin is akisinizda birinci sinif vatandaslar olmalari için resim optimizasyonunu otomatiklestirmeyi denemeniz en iyisidir.

`JPG` ve `PNG` dosyalarinda, resim kalitesi üzerinde herhangi bir etki yaratmadan daha iyi, kayipsiz sikistirma yapabilen çesitli araçlar vardir. `JPG` için [jpegtran](http://jpegclub.org/) veya [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (yalnizca Linux'ta kullanilabilir; --strip-all seçenegiyle çalistirin) araçlarini deneyin. `PNG` için [OptiPNG](http://optipng.sourceforge.net/) veya [PNGOUT](http://www.advsys.net/ken/util/pngout.htm) araçlarini deneyin.

## Resim bagimsiz görüntülerini kullanma

CSS bagimsiz görüntüleri, çesitli resimlerin tek bir `bagimsiz görüntü sayfasi` resminde birlestirildigi bir tekniktir. Bagimsiz resimler, daha sonra dogru parçanin görüntülenmesi için bir ögenin arka plan resmi (bagimsiz görüntü sayfasi) ve bir ofset degeri belirtilerek kullanilabilir.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Örnekte kullanilan resim bagimsiz görüntü sayfasi">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

Bagimsiz görüntülerin, birden çok resmi almak için gereken indirmelerin sayisini azaltirken önbellege almayi saglama avantaji vardir.

## Geç yüklemeyi degerlendirme

Geç yükleme, asagida birçok resim içeren uzun sayfalarin yüklenmesini, bu resimleri gerektiklerinde veya birincil içerigin yüklenip olusturulmasi bittikten sonra yükleyerek önemli ölçüde hizlandirabilir.  Performans iyilestirmelerine ek olarak, geç yüklemeyi kullanma sonsuz kaydirma deneyimleri olusturabilir.

Sonsuz kaydirma sayfalarinda içerik görünür oldugunda yüklendigi ve arama motorlari bu içerigi hiçbir zaman göremeyebilecegi için bu sayfalari olustururken dikkatli olun.  Buna ek olarak, altbilgide görmeyi bekledikleri bilgiyi arayan kullanicilar, sürekli olarak yeni içerik yüklendiginden altbilgiyi hiçbir zaman görmez.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




