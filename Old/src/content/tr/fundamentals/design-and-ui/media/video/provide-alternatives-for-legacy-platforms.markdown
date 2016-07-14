---
title: "Eski platformlar için alternatifler saglama"
description: "Tüm video biçimleri tüm platformlarda desteklenmez. Büyük platformlarda desteklenen biçimlere bakin ve videonuzun bunlarin her birinde çalistigindan emin olun."
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
  Tüm video biçimleri tüm platformlarda desteklenmez. Büyük platformlarda desteklenen biçimlere bakin ve videonuzun bunlarin her birinde çalistigindan emin olun.
</p>

{% include shared/toc.liquid %}


## Hangi biçimlerin desteklendigini kontrol etme

Hangi video biçimlerinin desteklendigini ögrenmek için `canPlayType()` islevini kullanin. Yöntem; bir `mime-type` ve istege bagli codec'lerden olusan bir dize bagimsiz degiskeni alir ve asagidaki degerlerin birini döndürür:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Dönüs degeri</th>
      <th>Açiklama</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Dönüs degeri">(bos dize)</td>
      <td data-th="Açiklama">Kapsayici ve/veya codec desteklenmiyor.</td>
    </tr>
    <tr>
      <td data-th="Dönüs degeri"><code>maybe</code></td>
      <td data-th="Açiklama">
        Kapsayici ve codec'ler destekleniyor olabilir, ancak tarayicinin
        kontrol etmek üzere videonun bir kismini indirmesi gerekiyor.
      </td>
    </tr>
    <tr>
      <td data-th="Dönüs degeri"><code>probably</code></td>
      <td data-th="Açiklama">Biçimin desteklendigi görülüyor.
      </td>
    </tr>
  </tbody>
</table>

Burada bazi `canPlayType()` bagimsiz degisken örneklerini ve Chrome'da çalistirildiklarinda gelen dönüs degerlerini bulabilirsiniz:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Tür</th>
      <th>Yanit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tür"><code>video/xyz</code></td>
      <td data-th="Yanit">(bos dize)</td>
    </tr>
    <tr>
      <td data-th="Tür"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Yanit">(bos dize)</td>
    </tr>
    <tr>
      <td data-th="Tür"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Yanit">(bos dize)</td>
    </tr>
    <tr>
      <td data-th="Tür"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Yanit"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Tür"><code>video/webm</code></td>
      <td data-th="Yanit"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Tür"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Yanit"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Birden çok biçimde video olusturma

Ayni videoyu farkli biçimlerde kaydetmenize yardimci olacak çok sayida araç vardir:

* Masaüstü araçlari: [FFmpeg](//ffmpeg.org/)
* GUI uygulamalari: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Çevrimiçi kodlama/kod dönüstürme hizmetleri: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Hangi biçimin kullanildigini kontrol etme

Tarayicinin hangi video biçimini seçtigini bilmek ister misiniz?

Kullanilan kaynagi döndürmek için JavaScript'te, videonun `currentSrc` özelligini kullanin.

Bunu çalisirken görmek için {% link_sample _code/video-main.html %}bu demoya{% endlink_sample %} göz atin: Chrome ve Firefox, `chrome.webm` kaynagini seçerken (bunun, bu tarayicilarin destekledigi olasi kaynaklar listesinde ilk sirada olmasindan kaynaklanir) Safari `chrome.mp4` kaynagini seçer.



