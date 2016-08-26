project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sitenize video eklemenin ve kullanicilarin tüm cihazlarda mümkün olan en iyi deneyimi yasamalarini saglamanin en basit yollarini ögrenin.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Video ekleme {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Sitenize video eklemenin ve kullanicilarin tüm cihazlarda mümkün olan en iyi deneyimi yasamalarini saglamanin en basit yollarini ögrenin.



## TL;DR {: .hide-from-toc }
- 'Sitenizde video yüklemek, kodunu çözmek ve oynatmak için video ögesini kullanin.'
- Çesitli mobil platformlari kapsamak için videoyu birden çok biçimde olusturun.
- Videolarin boyutunu dogru bir sekilde ayarlayin; kapsayicilarindan tasmadiklarindan emin olun.
- 'Erisilebilirlik önemlidir; parça ögesini, video ögesinin alt ögesi olarak ekleyin.'


## Video ögesini ekleme

Sitenizde video yüklemek, kodunu çözmek ve oynatmak için video ögesini ekleyin.

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Tarayiciniz video ögesini desteklemiyor.</p>
    </video>
    

## Birden çok dosya biçimi belirtme

Tüm tarayicilar ayni video biçimlerini desteklemez.
`<source>` ögesi, kullanicinin tarayicisinin biçimlerden birini desteklememesi olasiligina karsi yedek olarak birden çok biçim belirtebilmenizi saglar.
Örnegin:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
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

Mobil tarayici gelistirici araçlarinizi kullanarak ag etkinligini <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">tür özellikleri ile</a> ve <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">tür özellikleri olmadan</a> karsilastirin.
Ayrica, [sunucunuzun dogru MIME türünü bildirdiginden emin olmak](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types) için tarayici gelistirici araçlarinizdaki yanit üstbilgilerini kontrol edin; aksi halde, video kaynagi türü kontrolleri çalismaz.

## Bir baslangiç ve bitis zamani belirtme

Bant genisliginden tasarruf edin ve sitenizin daha duyarli hissettirmesini saglayin: Video ögesine bir baslangiç ve bitis zamani eklemek için Medya Parçalari API'sini kullanin.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>

Bir medya parçasi eklemek için medya URL'sine yalnizca `#t=[start_time][,end_time]` kodunu eklersiniz. Örnegin, videoyu 5. saniye ile 10. saniye arasinda oynatmak için sunlari belirtin:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Medya Parçalari API'sini, birden çok dosyayi kodlayip sunmak zorunda kalmadan ayni videoda birden çok görünüm sunmak (DVD'lerdeki bölüm baslangiçlari gibi) için de kullanabilirsiniz.

<!-- TODO: Verify note type! -->
Note: - 'Medya Parçalari API''si çogu platformda desteklenir, ancak iOS''ta desteklenmez.'
- 'Aralik Isteklerinin sunucunuzda desteklendiginden emin olun. Aralik Istekleri, çogu sunucuda varsayilan olarak etkindir, ancak bazi barindirma hizmetleri bunlari kapatabilir.'


Tarayici gelistirme araçlarinizi kullanarak yanit üstbilgilerindeki `Accept-Ranges: bytes` dizesini kontrol edin:

<img class="center" alt="Chrome Dev Tools ekran görüntüsü: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Bir poster resmi ekleme

Video ögesine bir poster özelligi ekleyerek kullanicilarinizin, videoyu indirmelerine veya oynatmaya baslamalarina gerek kalmadan, öge yüklenir yüklenmez içerikle ilgili bir fikir edinmelerini saglayin.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Poster, video `src` ögesi bozulursa veya saglanan video biçimlerinin hiçbiri desteklenmiyorsa bir yedek olarak da kullanilabilir. Poster resimlerin tek dezavantaji, biraz bant genisligi tüketen ve olusturma gerektiren ek dosya istegidir. Daha fazla bilgi için [Resim optimizasyonu](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization) konusuna bakin.

Burada, poster resmi olmayan ve poster resmi olan videolarin yan yana karsilastirmasini bulabilirsiniz. Poster resmi, bunun video olmadigini göstermek için gri tonlarinda yaptik:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome ekran görüntüsü, dikey: poster yok" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome ekran görüntüsü, dikey: poster resimli" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



