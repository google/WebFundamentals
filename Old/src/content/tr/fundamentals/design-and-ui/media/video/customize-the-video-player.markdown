---
title: "Video oynaticiyi özellestirme"
description: "Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Sitenizde video yüklemek, kodunu çözmek ve oynatmak için video ögesini kullanin."
    - "Çesitli mobil platformlari kapsamak için videoyu birden çok biçimde olusturun."
    - "Videolarin boyutunu dogru bir sekilde ayarlayin; kapsayicilarindan tasmadiklarindan emin olun."
    - "Erisilebilirlik önemlidir; parça ögesini, video ögesinin alt ögesi olarak ekleyin."
notes:
  media-fragments:
    - "Medya Parçalari API'si çogu platformda desteklenir, ancak iOS'ta desteklenmez."
    - "Aralik Isteklerinin sunucunuzda desteklendiginden emin olun. Aralik Istekleri, çogu sunucuda varsayilan olarak etkindir, ancak bazi barindirma hizmetleri bunlari kapatabilir."
  dont-overflow:
    - "Orijinal videodan farkli bir en boy oraniyla sonuçlanacak öge boyutu ayarlamasini zorlamayin. Basik veya uzamis video kötü görünür."
  accessibility-matters:
    - "Izleme ögesi Android için Chrome'da, iOS Safari'de ve Firefox haricinde geçerli tüm masaüstü tarayicilarda desteklenir (bkz. <a href='http://caniuse.com/track' title='Izleme ögesi destek durumu'>caniuse.com/track</a>). Çesitli çoklu dolgular da kullanilmaktadir. <a href='//www.delphiki.com/html5/playr/' title='Playr parça ögesi çoklu dolgusu'>Playr</a> veya <a href='//captionatorjs.com/' title='Captionator parça'>Captionator</a> kullanmanizi öneririz."
  construct-video-streams:
    - "MSE, Android üzerinde Chrome ve Opera, masaüstü için Internet Explorer 11 ve Chrome tarafindan desteklenir ve <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions uygulama zaman çizelgesi'>Firefox</a> için de destek saglanmasi planlanmaktadir."
  optimize:
    - "<a href='../images/'>Resimler</a>"
    - <a href='../../performance/optimizing-content-efficiency/'>Içerik verimliligini optimize etme</a>
---

<p class="intro">
  Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.
</p>

{% include shared/toc.liquid %}


Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.

## Cihaz yönü farkli cihazlarda nasil çalisir?

Cihaz yönü masaüstü monitörler veya dizüstü bilgisayarlar için bir sorun degildir, ancak mobil cihazlar ve tabletler için web sayfasi tasarlanirken çok büyük öneme sahiptir.

iPhone'daki Safari, dikey ve yatay yönler arasinda geçis yapmada basarilidir:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="iPhone'daki Safari'de oynayan videonun ekran görüntüsü, dikey" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="iPhone'daki Safari'de oynayan videonun ekran görüntüsü, yatay" src="images/iPhone-video-playing-landscape.png">
</div>

iPad'de ve Android için Chrome'da cihaz yönü sorunlu olabilir.
Örnegin, hiç özellestirme yapilmadan, yatay yöndeki bir iPad'de oynayan bir video sunun gibi görünür:

<img class="center" alt="iPad Retina'daki Safari'de oynayan videonun ekran görüntüsü, yatay"
src="images/iPad-Retina-landscape-video-playing.png">

Videoyu CSS ile `width: 100%` veya `max-width: 100%` degerine ayarlamak, birçok cihaz yönü yer paylasimi sorununu çözebilir. Tam ekran alternatiflerini de degerlendirmek isteyebilirsiniz.

## Satir içi veya tam ekran görüntü

Farkli platformlar videoyu farkli sekilde görüntüler. iPhone'daki Safari, web sayfasindaki bir video ögesini satir içinde görüntüler, ancak videoyu tam ekran modunda oynatir:

<img class="center" alt="iPhone'da video ögesinin ekran görüntüsü, dikey" src="images/iPhone-video-with-poster.png">

Android'de, kullanicilar tam ekran simgesini tiklayarak tam ekran moduna geçmek için istekte bulunabilir. Ancak, varsayilan deger videonun satir içinde oynatilmasidir:

<img class="center" alt="Android için Chrome'da oynayan videonun ekran görüntüsü, dikey" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad'deki Safari, videoyu satir içinde oynatir:

<img class="center" alt="iPad Retina'daki Safari'de oynayan videonun ekran görüntüsü, yatay" src="images/iPad-Retina-landscape-video-playing.png">

## Içerigin tam ekran olmasini kontrol etme

Tam ekran video oynatmayi zorlamayan platformlar için Tam Ekran API'si [yaygin bir sekilde desteklenir](//caniuse.com/fullscreen). Içerigin veya sayfanin tam ekran olmasini kontrol etmek için bu API'yi kullanin.

video: gibi bir ögeyi tam ekran yapmak için
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Dokümanin tamamini tam ekran yapmak için:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Ayrica, tam ekran durum degisikliklerini dinleyebilirsiniz:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Isterseniz ögenin su anda tam ekran modunda olup olmadigini kontrol edebilirsiniz:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Ögelerin tam ekran modunda görüntülenme seklini degistirmek için CSS `:fullscreen` söz sinifini da kullanabilirsiniz.

Tam Ekran API'sini destekleyen cihazlarda, video için yer tutucu olarak küçük resimleri kullanabilirsiniz:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>

Bunu çalisirken görmek için {% link_sample _code/fullscreen.html %}demoya{% endlink_sample %} göz atin.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



