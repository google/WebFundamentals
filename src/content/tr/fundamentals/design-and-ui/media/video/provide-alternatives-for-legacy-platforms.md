project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Tüm video biçimleri tüm platformlarda desteklenmez. Büyük platformlarda desteklenen biçimlere bakin ve videonuzun bunlarin her birinde çalistigindan emin olun.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Eski platformlar için alternatifler saglama {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Tüm video biçimleri tüm platformlarda desteklenmez. Büyük platformlarda desteklenen biçimlere bakin ve videonuzun bunlarin her birinde çalistigindan emin olun.



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

Bunu çalisirken görmek için <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">bu demoya</a> göz atin: Chrome ve Firefox, `chrome.webm` kaynagini seçerken (bunun, bu tarayicilarin destekledigi olasi kaynaklar listesinde ilk sirada olmasindan kaynaklanir) Safari `chrome.mp4` kaynagini seçer.



