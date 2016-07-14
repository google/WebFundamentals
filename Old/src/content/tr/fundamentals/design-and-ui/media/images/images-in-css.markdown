---
title: "CSS içindeki resimler"
description: "CSS `background` özelligi; birden çok resim eklemeyi kolaylastiran, tekrarlanmalarini saglayan ve baska olanaklar sunan, ögelere karmasik resimler eklemek için güçlü bir araçtir."
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
---

<p class="intro">
  CSS `background` özelligi; birden çok resim eklemeyi kolaylastiran, tekrarlanmalarini saglayan ve baska olanaklar sunan, ögelere karmasik resimler eklemek için güçlü bir araçtir.  Medya sorgulariyla birlestirildiginde, arka plan özelligi daha da güçlü hale gelerek ekran çözünürlügü, görüntü alani boyutu ve diger unsurlara dayanarak kosullu resim yüklenebilmesini saglar.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Kosullu resim yükleme veya sanat yönetimi için medya sorgularini kullanma

Medya sorgulari yalnizca sayfa yerlesimini etkilemekle kalmaz, ayni zamanda resimleri kosullu olarak yüklemek veya görüntü alani genisligine bagli olarak sanat yönetimi saglamak için de kullanilabilir.

Örnegin, asagidaki örnekteki küçük ekranlarda yalnizca `small.png` dosyasi indirilip içerik `div` ögesine uygulanirken, büyük ekranlarda gövdeye `background-image: url(body.png)` ve içerik `div` ögesine `background-image: url(large.png)` uygulanir.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

## Yüksek çözünürlüklü resimler saglamak için image-set islevini kullanma

CSS`deki `image-set()` islevi, `background` özelliginin davranisini gelistirerek farkli cihaz özellikleri için birden çok resim dosyasi saglanmasini kolaylastirir.  Bu, tarayicinin cihazin özelliklerine bagli olarak en iyi resmi seçmesine olanak tanir; örnegin, bant genisliginin sinirli oldugu bir agda bir 2x görüntüde bir 2x resim veya bir 2x cihazda 1x resim kullanma.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

Dogru resmin yüklenmesine ek olarak, tarayici resmi uygun bir sekilde
ölçekler. Diger bir deyisle, tarayici 2x resimlerin 1x resimlerden iki kat genis oldugunu kabul ederek 2x resmi 2 katsayisiyla küçültür. Böylece, resim sayfada ayni boyutta görünür.

`image-set()` destegi hâlâ yenidir ve yalnizca Chrome ile Safari'de `-webkit` tedarikçi firma önekiyle desteklenmektedir.  `image-set()` islevi desteklenmediginde bir yedek resmin eklenmesine de dikkat edilmelidir; örnegin:

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

Yukaridaki kod, image-set islevini destekleyen tarayicilarda uygun ögeyi, aksi halde 1x ögenin yedek resmini yükler. Dikkat edilmesi gereken nokta, `image-set()` tarayici destegi az oldugu için çogu tarayicinin 1x ögesini alacak olmasidir.

## Yüksek çözünürlüklü resimler veya sanat yönetimi saglamak için medya sorgularini kullanin

Medya sorgulari, [cihaz piksel oranina](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg) temelinde kurallar olusturarak 2x ve 1x görüntüler için farkli resimlerin belirtilmesini mümkün hale getirebilir.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Chrome, Firefox ve Opera tarayicilarinin üçü de standart `(min-resolution: 2dppx)` destegine sahipken Safari ve Android Browser, `dppx` birimi içermeyen eski satici önekli sözdizimini gerektirir.  Bu stillerin yalnizca cihazin medya sorgusuyla eslesmesi durumunda yüklendigini ve temel duruma iliskin stilleri belirlemeniz gerektigini unutmayin.  Bu, tarayicinin medya sorgularina özel çözünürlügü desteklememesi durumunda bir seylerin olusturulacagindan emin olma avantajini da saglar.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

Ayrica, görüntü alani boyutuna bagli olarak alternatif resimler görüntülemek için min-width sözdizimini de kullanabilirsiniz.  Bu teknik, medya sorgusu eslesmezse resmin indirilmemesi avantajina sahiptir. Örnegin, `bg.png` dosyasi yalnizca tarayici genisligi 500 piksel veya daha büyük oldugunda indirilir ve `body` ögesine uygulanir:

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}	



