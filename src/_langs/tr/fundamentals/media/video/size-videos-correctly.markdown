---
layout: article
title: "Videolarin boyutlarini dogru bir sekilde ayarlama"
description: "Kullanicilarinizin mutlulugu söz konusu oldugunda boyut önemlidir."
introduction: "Kullanicilarinizin memnuniyeti söz konusu oldugunda boyut önemlidir."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Platformun isleyebileceginden daha genis çerçeve boyutuna veya daha yüksek kaliteye sahip videolar sunmayin.
    - Videolarinizi, olmalari gerekenden daha uzun yapmayin.
    - Uzun videolar, indirme ve aramada kesintilere neden olabilir; bazi tarayicilar videoyu oynatmaya baslamak için indirme isleminin bitmesini bekleyebilir.
remember:
  media-fragments:
    - Medya Parçalari API'si çogu platformda desteklenir, ancak iOS'ta desteklenmez.
    - Aralik Isteklerinin sunucunuzda desteklendiginden emin olun. Aralik Istekleri, çogu sunucuda varsayilan olarak etkindir, ancak bazi barindirma hizmetleri bunlari kapatabilir.
  dont-overflow:
    - Orijinal videodan farkli bir en boy oraniyla sonuçlanacak öge boyutu ayarlamasini zorlamayin. Basik veya uzamis video kötü görünür.
  accessibility-matters:
    - Izleme ögesi Android için Chrome'da, iOS Safari'de ve Firefox haricinde geçerli tüm masaüstü tarayicilarda desteklenir (bkz. <a href="http://caniuse.com/track" title="Izleme ögesi destek durumu">caniuse.com/track</a>). Çesitli çoklu dolgular da kullanilmaktadir. <a href='//www.delphiki.com/html5/playr/' title='Playr parça ögesi çoklu dolgusu'>Playr</a> veya <a href='//captionatorjs.com/' title='Captionator parça'>Captionator</a> kullanmanizi öneririz.
  construct-video-streams:
    - MSE, Android üzerinde Chrome ve Opera, masaüstü için Internet Explorer 11 ve Chrome tarafindan desteklenir ve <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions uygulama zaman çizelgesi'>Firefox</a> için de destek saglanmasi planlanmaktadir.
  optimize:
    - <a href="../images/">Resimler</a>
    - <a href="../../performance/optimizing-content-efficiency/">Içerik verimliligini optimize etme</a>
related:
  media:
  -
      title: "Duyarlilik için CSS medya sorgularini kullanma"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Duyarli Web Tasarimi Temel Bilgileri"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

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

## Video boyutunu kontrol etme

Kodlandigi sekliyle gerçek video çerçeve boyutu, video ögesi boyutlarindan farkli olabilir (bir resmin gerçek boyutlari kullanilarak görüntülenmeyebilecegi gibi).

Bir videonun kodlandigi boyutu kontrol etmek için video ögesinin `videoWidth` ve `videoHeight` özelliklerini kullanin. `width` ve `height`, video ögesinin boyutlarini döndürür. Bu boyutlar, CSS veya satir içi genislik ve yükseklik özellikleri kullanilarak ayarlanmis olabilir.

## Videolarin kapsayicilarindan tasmadiklarindan emin olma

Video ögeleri görüntü alani için çok büyük olduklarinda, kapsayicilarindan tasip kullanicinin içerigi görmesini veya denetimleri kullanmasini
imkansiz hale getirebilirler.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Android Chrome ekran görüntüsü, dikey: biçimlendirilmemis video ögesi görüntü alanindan tasar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Android Chrome ekran görüntüsü, yatay: biçimlendirilmemis video ögesi görüntü alanindan tasar" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Video boyutlarini JavaScript veya CSS'yi kullanarak kontrol edebilirsiniz. JavaScript kitapliklari ve [FitVids](//fitvidsjs.com/) gibi eklentiler, YouTube ve diger kaynaklardaki Flash videolar için bile uygun boyutun ve en boy oraninin korunmasini mümkün kilmaktadir.

Görüntü alani boyutlarina bagli olarak ögelerin boyutunu belirtmek için [CSS medya sorgularini](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) kullanin; `max-width: 100%` sizin dostunuzdur.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

iframe içindeki medya içerigi (YouTube videolari gibi) için duyarli bir yaklasim deneyin ([John Surdakowski'nin önerdigi](//avexdesigns.com/responsive-youtube-embed/) gibi bir yaklasim).

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

{% link_sample _code/responsive_embed.html %}Duyarli örnegi{% endlink_sample %}, {% link_sample _code/unyt.html %}duyarli olmayan sürümle{% endlink_sample %} karsilastirin.


{% include modules/nextarticle.liquid %}

{% endwrap %}

