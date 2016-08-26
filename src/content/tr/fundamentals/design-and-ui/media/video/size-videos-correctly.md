project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Kullanicilarinizin mutlulugu söz konusu oldugunda boyut önemlidir.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Videolarin boyutlarini dogru bir sekilde ayarlama {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Kullanicilarinizin memnuniyeti söz konusu oldugunda boyut önemlidir.


## TL;DR {: .hide-from-toc }
- Platformun isleyebileceginden daha genis çerçeve boyutuna veya daha yüksek kaliteye sahip videolar sunmayin.
- 'Videolarinizi, olmalari gerekenden daha uzun yapmayin.'
- 'Uzun videolar, indirme ve aramada kesintilere neden olabilir; bazi tarayicilar videoyu oynatmaya baslamak için indirme isleminin bitmesini bekleyebilir.'



## Video boyutunu kontrol etme

Kodlandigi sekliyle gerçek video çerçeve boyutu, video ögesi boyutlarindan farkli olabilir (bir resmin gerçek boyutlari kullanilarak görüntülenmeyebilecegi gibi).

Bir videonun kodlandigi boyutu kontrol etmek için video ögesinin `videoWidth` ve `videoHeight` özelliklerini kullanin. `width` ve `height`, video ögesinin boyutlarini döndürür. Bu boyutlar, CSS veya satir içi genislik ve yükseklik özellikleri kullanilarak ayarlanmis olabilir.

## Videolarin kapsayicilarindan tasmadiklarindan emin olma

Video ögeleri görüntü alani için çok büyük olduklarinda, kapsayicilarindan tasip kullanicinin içerigi görmesini veya denetimleri kullanmasini
imkansiz hale getirebilirler.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome ekran görüntüsü, dikey: biçimlendirilmemis video ögesi görüntü alanindan tasar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome ekran görüntüsü, yatay: biçimlendirilmemis video ögesi görüntü alanindan tasar" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Video boyutlarini JavaScript veya CSS'yi kullanarak kontrol edebilirsiniz. JavaScript kitapliklari ve [FitVids](//fitvidsjs.com/) gibi eklentiler, YouTube ve diger kaynaklardaki Flash videolar için bile uygun boyutun ve en boy oraninin korunmasini mümkün kilmaktadir.

Görüntü alani boyutlarina bagli olarak ögelerin boyutunu belirtmek için [CSS medya sorgularini](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) kullanin; `max-width: 100%` sizin dostunuzdur.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

iframe içindeki medya içerigi (YouTube videolari gibi) için duyarli bir yaklasim deneyin ([John Surdakowski'nin önerdigi](//avexdesigns.com/responsive-youtube-embed/) gibi bir yaklasim).

<!-- TODO: Verify note type! -->
Note: Orijinal videodan farkli bir en boy oraniyla sonuçlanacak öge boyutu ayarlamasini zorlamayin. Basik veya uzamis video kötü görünür.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">Duyarli örnegi</a>, <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">duyarli olmayan sürümle</a> karsilastirin.




