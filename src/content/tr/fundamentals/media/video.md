project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sitenize video eklemenin ve kullanicilarin tüm cihazlarda mümkün olan en iyi deneyimi yasamalarini saglamanin en basit yollarini ögrenin.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



Kullanicilar videolari sever; videolar eglenceli, bilgilendirici olabilir. Mobil cihazlarda, videolar kolay bir bilgi tüketme yolu olabilir. Ancak videolar bant genisligini kullanir; her platformda her zaman ayni sekilde çalismazlar. Kullanicilar videolarin yüklenmesini beklemeyi veya oynat dügmesine bastiklarinda hiçbir seyin olmamasini sevmez. Sitenize video eklemenin ve kullanicilarin tüm cihazlarda mümkün olan en iyi deneyimi yasamalarini saglamanin en basit yolunu bulmak için daha fazla bilgi edinin.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Video ekleme 




Sitenize video eklemenin ve kullanicilarin tüm cihazlarda mümkün olan en iyi deneyimi yasamalarini saglamanin en basit yollarini ögrenin.



### TL;DR {: .hide-from-toc }
- Sitenizde video yüklemek, kodunu çözmek ve oynatmak için video ögesini kullanin.
- Çesitli mobil platformlari kapsamak için videoyu birden çok biçimde olusturun.
- Videolarin boyutunu dogru bir sekilde ayarlayin; kapsayicilarindan tasmadiklarindan emin olun.
- Erisilebilirlik önemlidir; parça ögesini, video ögesinin alt ögesi olarak ekleyin.


### Video ögesini ekleme

Sitenizde video yüklemek, kodunu çözmek ve oynatmak için video ögesini ekleyin.

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Tarayiciniz video ögesini desteklemiyor.</p>
    </video>
    

### Birden çok dosya biçimi belirtme

Tüm tarayicilar ayni video biçimlerini desteklemez.
`<source>` ögesi, kullanicinin tarayicisinin biçimlerden birini desteklememesi olasiligina karsi yedek olarak birden çok biçim belirtebilmenizi saglar.
Örnegin:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Tarayici `<source>` etiketlerini ayristirdiginda, indirilip oynatilacak dosyaya karar vermesinde yardimci olmasi için istege bagli `type` özelligini kullanir. Tarayici WebM biçimini destekliyorsa chrome.webm dosyasini oynatir, aksi halde MPEG-4 videolarini oynatip oynatamayacagini kontrol eder.
Video ve sesin web'de nasil çalistigiyla ilgili daha fazla bilgi edinmek için <a href='//www.xiph.org/video/vid1.shtml' title='Dijital video ile ilgili son derece eglenceli ve bilgilendirici video kilavuz'>A Digital Media Primer for Geeks</a> adli videoya göz atin.

Bu yaklasimin farkli HTML sunma veya sunucu tarafi komut dosyasi olusturmaya göre, özellikle mobil cihazlar açisindan bazi avantajlari vardir:

* Gelistiriciler, biçimleri tercih sirasina göre listeleyebilir.
* Yerel istemci tarafi geçisi gecikmeyi azaltir; içerigi almak için yalnizca bir istekte bulunulur.
* Tarayicinin bir biçim seçmesi, kullanici-araci algilamali sunucu tarafi destek veritabani kullanmaktan daha basit, daha hizli ve muhtemelen daha güvenilirdir.
* Her bir dosya kaynagi türünün belirtilmesi ag performansini iyilestirir; tarayici, biçimi `kontrol etmek` için videonun bir parçasini indirmek zorunda kalmadan bir video kaynagi seçebilir.

Bu noktalarin tümü özellikle bant genisligi ve gecikmenin çok önemli oldugu ve kullanici sabrinin muhtemelen sinirli olacagi mobil baglamlarda önemlidir. 
Tür özelliginin koda dahil edilmemesi, desteklenmeyen türlere sahip birden çok kaynak oldugunda performansi olumsuz etkileyebilir.

Mobil tarayici gelistirici araçlarinizi kullanarak ag etkinligini <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">tür özellikleri ile</a> ve <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">tür özellikleri olmadan</a> karsilastirin.
Ayrica, [sunucunuzun dogru MIME türünü bildirdiginden emin olmak](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types) için tarayici gelistirici araçlarinizdaki yanit üstbilgilerini kontrol edin; aksi halde, video kaynagi türü kontrolleri çalismaz.

### Bir baslangiç ve bitis zamani belirtme

Bant genisliginden tasarruf edin ve sitenizin daha duyarli hissettirmesini saglayin: Video ögesine bir baslangiç ve bitis zamani eklemek için Medya Parçalari API'sini kullanin.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>

Bir medya parçasi eklemek için medya URL'sine yalnizca `#t=[start_time][,end_time]` kodunu eklersiniz. Örnegin, videoyu 5. saniye ile 10. saniye arasinda oynatmak için sunlari belirtin:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Medya Parçalari API'sini, birden çok dosyayi kodlayip sunmak zorunda kalmadan ayni videoda birden çok görünüm sunmak (DVD'lerdeki bölüm baslangiçlari gibi) için de kullanabilirsiniz.

Note: - Medya Parçalari API''si çogu platformda desteklenir, ancak iOS''ta desteklenmez.
- Aralik Isteklerinin sunucunuzda desteklendiginden emin olun. Aralik Istekleri, çogu sunucuda varsayilan olarak etkindir, ancak bazi barindirma hizmetleri bunlari kapatabilir.


Tarayici gelistirme araçlarinizi kullanarak yanit üstbilgilerindeki `Accept-Ranges: bytes` dizesini kontrol edin:

<img class="center" alt="Chrome Dev Tools ekran görüntüsü: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Bir poster resmi ekleme

Video ögesine bir poster özelligi ekleyerek kullanicilarinizin, videoyu indirmelerine veya oynatmaya baslamalarina gerek kalmadan, öge yüklenir yüklenmez içerikle ilgili bir fikir edinmelerini saglayin.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Poster, video `src` ögesi bozulursa veya saglanan video biçimlerinin hiçbiri desteklenmiyorsa bir yedek olarak da kullanilabilir. Poster resimlerin tek dezavantaji, biraz bant genisligi tüketen ve olusturma gerektiren ek dosya istegidir. Daha fazla bilgi için [Resim optimizasyonu](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization) konusuna bakin.

Burada, poster resmi olmayan ve poster resmi olan videolarin yan yana karsilastirmasini bulabilirsiniz. Poster resmi, bunun video olmadigini göstermek için gri tonlarinda yaptik:

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome ekran görüntüsü, dikey: poster yok" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Android Chrome ekran görüntüsü, dikey: poster yok
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome ekran görüntüsü, dikey: poster resimli" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Android Chrome ekran görüntüsü, dikey: poster resimli
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

## Eski platformlar için alternatifler saglama 




Tüm video biçimleri tüm platformlarda desteklenmez. Büyük platformlarda desteklenen biçimlere bakin ve videonuzun bunlarin her birinde çalistigindan emin olun.



### Hangi biçimlerin desteklendigini kontrol etme

Hangi video biçimlerinin desteklendigini ögrenmek için `canPlayType()` islevini kullanin. Yöntem; bir `mime-type` ve istege bagli codec'lerden olusan bir dize bagimsiz degiskeni alir ve asagidaki degerlerin birini döndürür:

<table>
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


<table>
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


### Birden çok biçimde video olusturma

Ayni videoyu farkli biçimlerde kaydetmenize yardimci olacak çok sayida araç vardir:

* Masaüstü araçlari: [FFmpeg](//ffmpeg.org/)
* GUI uygulamalari: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Çevrimiçi kodlama/kod dönüstürme hizmetleri: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Hangi biçimin kullanildigini kontrol etme

Tarayicinin hangi video biçimini seçtigini bilmek ister misiniz?

Kullanilan kaynagi döndürmek için JavaScript'te, videonun `currentSrc` özelligini kullanin.

Bunu çalisirken görmek için <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">bu demoya</a> göz atin: Chrome ve Firefox, `chrome.webm` kaynagini seçerken (bunun, bu tarayicilarin destekledigi olasi kaynaklar listesinde ilk sirada olmasindan kaynaklanir) Safari `chrome.mp4` kaynagini seçer.


## Videolarin boyutlarini dogru bir sekilde ayarlama 




Kullanicilarinizin memnuniyeti söz konusu oldugunda boyut önemlidir.


### TL;DR {: .hide-from-toc }
- Platformun isleyebileceginden daha genis çerçeve boyutuna veya daha yüksek kaliteye sahip videolar sunmayin.
- Videolarinizi, olmalari gerekenden daha uzun yapmayin.
- Uzun videolar, indirme ve aramada kesintilere neden olabilir; bazi tarayicilar videoyu oynatmaya baslamak için indirme isleminin bitmesini bekleyebilir.



### Video boyutunu kontrol etme

Kodlandigi sekliyle gerçek video çerçeve boyutu, video ögesi boyutlarindan farkli olabilir (bir resmin gerçek boyutlari kullanilarak görüntülenmeyebilecegi gibi).

Bir videonun kodlandigi boyutu kontrol etmek için video ögesinin `videoWidth` ve `videoHeight` özelliklerini kullanin. `width` ve `height`, video ögesinin boyutlarini döndürür. Bu boyutlar, CSS veya satir içi genislik ve yükseklik özellikleri kullanilarak ayarlanmis olabilir.

### Videolarin kapsayicilarindan tasmadiklarindan emin olma

Video ögeleri görüntü alani için çok büyük olduklarinda, kapsayicilarindan tasip kullanicinin içerigi görmesini veya denetimleri kullanmasini
imkansiz hale getirebilirler.

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome ekran görüntüsü, dikey: biçimlendirilmemis video ögesi görüntü alanindan tasar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Android Chrome ekran görüntüsü, dikey: biçimlendirilmemis video ögesi görüntü alanindan tasar
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome ekran görüntüsü, yatay: biçimlendirilmemis video ögesi görüntü alanindan tasar">
    <figcaption>
      Android Chrome ekran görüntüsü, yatay: biçimlendirilmemis video ögesi görüntü alanindan tasar
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


Video boyutlarini JavaScript veya CSS'yi kullanarak kontrol edebilirsiniz. JavaScript kitapliklari ve [FitVids](//fitvidsjs.com/) gibi eklentiler, YouTube ve diger kaynaklardaki Flash videolar için bile uygun boyutun ve en boy oraninin korunmasini mümkün kilmaktadir.

Görüntü alani boyutlarina bagli olarak ögelerin boyutunu belirtmek için [CSS medya sorgularini](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) kullanin; `max-width: 100%` sizin dostunuzdur.

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

iframe içindeki medya içerigi (YouTube videolari gibi) için duyarli bir yaklasim deneyin ([John Surdakowski'nin önerdigi](//avexdesigns.com/responsive-youtube-embed/) gibi bir yaklasim).

Note: Orijinal videodan farkli bir en boy oraniyla sonuçlanacak öge boyutu ayarlamasini zorlamayin. Basik veya uzamis video kötü görünür.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling"   adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup"   adjust_indentation="auto" %}
</pre>

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">Duyarli örnegi</a>, <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">duyarli olmayan sürümle</a> karsilastirin.


## Video oynaticiyi özellestirme 




Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.



Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.

### Cihaz yönü farkli cihazlarda nasil çalisir?

Cihaz yönü masaüstü monitörler veya dizüstü bilgisayarlar için bir sorun degildir, ancak mobil cihazlar ve tabletler için web sayfasi tasarlanirken çok büyük öneme sahiptir.

iPhone'daki Safari, dikey ve yatay yönler arasinda geçis yapmada basarilidir:

<div class="attempt-left">
  <figure>
    <img  alt="iPhone'daki Safari'de oynayan videonun ekran görüntüsü, dikey" src="images/iPhone-video-playing-portrait.png">
    <figcaption>iPhone'daki Safari'de oynayan videonun ekran görüntüsü, dikey</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="iPhone'daki Safari'de oynayan videonun ekran görüntüsü, yatay" src="images/iPhone-video-playing-landscape.png">
    <figcaption>iPhone'daki Safari'de oynayan videonun ekran görüntüsü, yatay</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

iPad'de ve Android için Chrome'da cihaz yönü sorunlu olabilir.
Örnegin, hiç özellestirme yapilmadan, yatay yöndeki bir iPad'de oynayan bir video sunun gibi görünür:

<img class="center" alt="iPad Retina'daki Safari'de oynayan videonun ekran görüntüsü, yatay"
src="images/iPad-Retina-landscape-video-playing.png">

Videoyu CSS ile `width: 100%` veya `max-width: 100%` degerine ayarlamak, birçok cihaz yönü yer paylasimi sorununu çözebilir. Tam ekran alternatiflerini de degerlendirmek isteyebilirsiniz.

### Satir içi veya tam ekran görüntü

Farkli platformlar videoyu farkli sekilde görüntüler. iPhone'daki Safari, web sayfasindaki bir video ögesini satir içinde görüntüler, ancak videoyu tam ekran modunda oynatir:

<img class="center" alt="iPhone'da video ögesinin ekran görüntüsü, dikey" src="images/iPhone-video-with-poster.png">

Android'de, kullanicilar tam ekran simgesini tiklayarak tam ekran moduna geçmek için istekte bulunabilir. Ancak, varsayilan deger videonun satir içinde oynatilmasidir:

<img class="center" alt="Android için Chrome'da oynayan videonun ekran görüntüsü, dikey" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad'deki Safari, videoyu satir içinde oynatir:

<img class="center" alt="iPad Retina'daki Safari'de oynayan videonun ekran görüntüsü, yatay" src="images/iPad-Retina-landscape-video-playing.png">

### Içerigin tam ekran olmasini kontrol etme

Tam ekran video oynatmayi zorlamayan platformlar için Tam Ekran API'si [yaygin bir sekilde desteklenir](//caniuse.com/fullscreen). Içerigin veya sayfanin tam ekran olmasini kontrol etmek için bu API'yi kullanin.

video: gibi bir ögeyi tam ekran yapmak için

    elem.requestFullScreen();
    

Dokümanin tamamini tam ekran yapmak için:

    document.body.requestFullScreen();
    

Ayrica, tam ekran durum degisikliklerini dinleyebilirsiniz:

    video.addEventListener("fullscreenchange", handler);
    

Isterseniz ögenin su anda tam ekran modunda olup olmadigini kontrol edebilirsiniz:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Ögelerin tam ekran modunda görüntülenme seklini degistirmek için CSS `:fullscreen` söz sinifini da kullanabilirsiniz.

Tam Ekran API'sini destekleyen cihazlarda, video için yer tutucu olarak küçük resimleri kullanabilirsiniz:

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>

Bunu çalisirken görmek için <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">demoya</a> göz atin.

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## Erisilebilirlik önemlidir 




Erisilebilirlik bir özellik degildir. Duyamayan veya göremeyen kullanicilar, bir videoyu altyazilar veya açiklamalar olmadan hiç deneyimleyemez. Bunlarin videonuza eklenmesi, kullanicilariniza sundugunuz kötü deneyimden çok daha kisa sürer. En azindan tüm kullanicilar için bir temel deneyim saglayin.




### Erisilebilirligi iyilestirmek için altyazi ekleme

Medyanin mobil cihazlarda daha erisilebilir olmasini saglamak için parça ögesini kullanarak altyazilar veya açiklamalar ekleyin.

Note: Izleme ögesi Android için Chrome'da, iOS Safari'de ve Firefox haricinde geçerli tüm masaüstü tarayicilarda desteklenir (bkz. <a href='http://caniuse.com/track' title='Izleme ögesi destek durumu'>caniuse.com/track</a>). Çesitli çoklu dolgular da kullanilmaktadir. <a href='//www.delphiki.com/html5/playr/' title='Playr parça ögesi çoklu dolgusu'>Playr</a> veya <a href='//captionatorjs.com/' title='Captionator parça'>Captionator</a> kullanmanizi öneririz.

Izleme ögesi kullanildiginda altyazilar sunun gibi görünür:

 <img class="center" alt="Android için Chrome'da parça ögesi kullanilarak görüntülenen altyazilarin gösterildigi ekran görüntüsü" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Parça ögesi ekleme

Videonuza altyazi eklemek çok kolaydir. Bunun için video ögesinin alt ögesi olarak bir parça ögesi eklemeniz yeterlidir:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

Parça ögesinin `src` özelligi, parça dosyasinin konumunu verir.

### Parça dosyasinda altyazilari tanimlama

Bir parça dosyasi, WebVTT biçimindeki zamanli `ipuçlarindan` olusur:

    WEBVTT

    00:00.000 --> 00:04.000
    Adam bir agaç dalinda oturup dizüstü bilgisayar kullanmaktadir.

    00:05.000 --> 00:08.000
    Dal kirilir ve adam düsmeye baslar.

    ...
    

## Hizli Basvuru 




Video ögesiyle ilgili özelliklere hizli, genel bir bakis.



### Video ögesi özellikleri

Video ögesi özelliklerinin ve tanimlarinin tam listesi için [video ögesi teknik özelliklerine](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element) bakin.

<table>
  <thead>
      <th>Özellik</th>
      <th>Kullanilabilirlik</th>
      <th>Açiklama</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Özellik"><code>src</code></td>
      <td data-th="Kullanilabilirlik">Tüm tarayicilar</td>
      <td data-th="Açiklama">Videonun adresi (URL).</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>poster</code></td>
      <td data-th="Kullanilabilirlik">Tüm tarayicilar</td>
      <td data-th="Açiklama">Video ögesi görüntülenir görüntülenmez, video içerigi indirilmeden tarayicinin gösterebilecegi bir resim dosyasinin adresi (URL).</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>preload</code></td>
      <td data-th="Kullanilabilirlik">Tüm mobil tarayicilar önceden yüklemeyi yoksayar.</td>
      <td data-th="Açiklama">Tarayiciya, oynatmadan önce meta verilerin (veya videonun bir kisminin) önceden yüklenmesinin yararli olup olmadigini bildiren ipuçlari. Seçenekler none, metadata veya auto degerleridir (ayrintili bilgi için Önceden yükleme bölümüne bakin). </td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>autoplay</code></td>
      <td data-th="Kullanilabilirlik">iPhone veya Android'de desteklenmez; tüm masaüstü tarayicilar, iPad, Firefox ve Android için Opera'da desteklenir.</td>
      <td data-th="Description">Indirmeye ve oynatmaya mümkün olan en kisa zamanda baslatir (Otomatik oynatma bölümüne bakin). </td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>loop</code></td>
      <td data-th="Kullanilabilirlik">Tüm tarayicilar</td>
      <td data-th="Açiklama">Videoyu döngü seklinde oynatir.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>controls</code></td>
      <td data-th="Kullanilabilirlik">Tüm tarayicilar</td>
      <td data-th="Açiklama">Varsayilan video denetimlerini (oynat, duraklat vb.) gösterir.</td>
    </tr>
  </tbody>
</table>

#### Otomatik oynatma

Masaüstünde `autoplay` özelligi, tarayiciya videoyu hemen indirmeye baslamasini ve mümkün olan en kisa zamanda oynatmasini bildirir. iOS'ta ve Android için Chrome'da, `autoplay` özelligi çalismaz; kullanicilarin videoyu oynatmak için ekrana hafifçe vurmasi gerekir.

Otomatik oynatmanin mümkün oldugu platformlarda bile, bunu etkinlestirmenin iyi bir fikir olup olmadigini degerlendirmeniz gerekir:

* Veri kullanimi pahali olabilir.
* Önce sormadan medyanin indirilip oynatilmaya baslamasina neden olmaniz, beklenmedik bir sekilde bant genisligini ve CPU'yu isgal edebilir ve dolayisiyla, sayfanin olusturulmasinda gecikmeye neden olabilir.
* Kullanicilar, video oynatmak veya ses çalmak için uygun olmayan bir durumda olabilir.

Otomatik oynatma davranisi Android WebView'da [WebSettings API'si](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) araciligiyla yapilandirilabilir.
Varsayilan olarak true degerine ayarlanir, ancak bir WebView uygulamasi bunu devre disi birakmayi seçebilir.

#### Önceden yükleme

`preload` özelligi, tarayiciya ne kadar bilginin veya içerigin önceden yüklenmesi gerektigi konusunda bir ipucu saglar.

<table>
  <thead>
    <tr>
      <th>Deger</th>
      <th>Açiklama</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Deger"><code>none</code></td>
      <td data-th="Açiklama">Kullanici videoyu izlemeyebilir bile; hiçbir seyi önceden yüklemeyin</td>
    </tr>
    <tr>
      <td data-th="Deger"><code>metadata</code></td>
      <td data-th="Açiklama">Meta veriler (süre, boyutlar, metin parçalari) önceden yüklenmelidir, ancak video minimum düzeyde tutulmalidir.</td>
    </tr>
    <tr>
      <td data-th="Deger"><code>auto</code></td>
      <td data-th="Açiklama">Tüm videonun hemen indirilmesinin istendigi düsünülmektedir.</td>
    </tr>
  </tbody>
</table>

`preload` özelliginin farkli platformlarda farkli etkileri vardir.
Örnegin, Chrome masaüstünde videonun 25 saniyesini arabellegine alirken, iOS veya Android'de arabellege alma islemi gerçeklestirmez. Bu, mobil cihazlarda, masaüstünde olmayan oynatmayi baslatma gecikmelerinin olabilecegi anlamina gelir. Tüm ayrintilar için [Steve Souders'in test sayfasina](//stevesouders.com/tests/mediaevents.php) bakin.

### JavaScript

[HTML5 Rocks Video makalesi](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript), video oynatmayi kontrol etmek için kullanilabilecek JavaScript özelliklerinin, yöntemlerinin ve olaylarinin harika bir özetini sunmaktadir. Bu içerigi, uygun durumlarda mobil cihazlara özel kaygilarla güncelleyerek buraya ekledik.

#### Özellikler

<table>
  <thead>
    <th>Özellik</th>
    <th>Açiklama</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Özellik"><code>currentTime</code></td>
      <td data-th="Açiklama">Oynatma konumunu alin veya saniye olarak ayarlayin.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>volume</code></td>
      <td data-th="Açiklama">Videonun geçerli ses düzeyini alin veya ayarlayin.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>muted</code></td>
      <td data-th="Açiklama">Ses kapatma ayarini alin veya belirleyin.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>playbackRate</code></td>
      <td data-th="Açiklama">Oynatma hizini alin veya ayarlayin; 1 degeri normal ilerleme hizidir.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>buffered</code></td>
      <td data-th="Açiklama">Videonun ne kadarinin arabellege alindigi ve oynatilmaya hazir olduguyla ilgili bilgi (<a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Bir kanvas ögesinde arabellege alinan video miktarinin gösterildigi demo">demoya</a> bakin).</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>currentSrc</code></td>
      <td data-th="Açiklama">Oynatilmakta olan videonun adresi.</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>videoWidth</code></td>
      <td data-th="Açiklama">Videonun piksel cinsinden belirtilen genisligi (video ögesi genisliginden farkli olabilir).</td>
    </tr>
    <tr>
      <td data-th="Özellik"><code>videoHeight</code></td>
      <td data-th="Açiklama">Videonun piksel cinsinden belirtilen yüksekligi (video ögesi yüksekliginden farkli olabilir).</td>
    </tr>
  </tbody>
</table>

PlaybackRate (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">demoya bakin</a>) ve volume, mobil cihazlarda desteklenmez.

#### Yöntemler

<table>
  <thead>
    <th>Yöntem</th>
    <th>Açiklama</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Yöntem"><code>load()</code></td>
      <td data-th="Açiklama">Oynatmayi baslatmadan bir video kaynagini yükler veya yeniden yükler: Örnegin, video src ögesi JavaScript kullanilarak degistiginde.</td>
    </tr>
    <tr>
      <td data-th="Yöntem"><code>play()</code></td>
      <td data-th="Açiklama">Videoyu geçerli konumundan oynatir.</td>
    </tr>
    <tr>
      <td data-th="Yöntem"><code>pause()</code></td>
      <td data-th="Açiklama">Videoyu geçerli konumunda duraklatir.</td>
    </tr>
    <tr>
      <td data-th="Yöntem"><code>canPlayType('format')</code></td>
      <td data-th="Açiklama">Hangi biçimlerin desteklendigini ögrenir (bkz. Hangi biçimlerin desteklendigini kontrol etme).</td>
    </tr>
  </tbody>
</table>

Mobil cihazlarda (Android için Opera disinda) play() ve pause() yöntemleri, bir
dügmeyi tiklama gibi kullanici eylemlerine yanit olarak çagrilmadikça çalismaz: <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">Demoya</a> bakin. (Benzer sekilde, yerlesik YouTube videolari gibi içerik için oynatma baslatilamaz.)

#### Olaylar

Bunlar, etkinlesebilecek medya olaylarinin yalnizca bir alt kümesidir. Tam liste için Mozilla Developer Network'te [Medya olaylari](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) sayfasina bakin.

<table>
  <thead>
    <th>Olay</th>
    <th>Açiklama</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Olay"><code>canplaythrough</code></td>
      <td data-th="Açiklama">Tarayicinin videoyu kesintisiz bir sekilde oynatabilecegini düsündürecek yeterli veri oldugunda etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>ended</code></td>
      <td data-th="Açiklama">Videonun oynatilmasi bittiginde etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>error</code></td>
      <td data-th="Açiklama">Bir hata ortaya çikarsa etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>playing</code></td>
      <td data-th="Açiklama">Video ilk kez oynatilmaya basladiginda, duraklatildiktan sonra veya yeniden baslatilirken etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>progress</code></td>
      <td data-th="Açiklama">Indirme ilerleme durumunu göstermek için periyodik olarak etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>waiting</code></td>
      <td data-th="Açiklama">Baska bir eylemin tamamlanmasini bekleyen bir eylem geciktiginde etkinlesir.</td>
    </tr>
    <tr>
      <td data-th="Olay"><code>loadedmetadata</code></td>
      <td data-th="Açiklama">Tarayici videoya iliskin meta verileri (süre, boyutlar ve metin parçalari) yüklemeyi bitirdiginde etkinlesir.</td>
    </tr>
  </tbody>
</table>



