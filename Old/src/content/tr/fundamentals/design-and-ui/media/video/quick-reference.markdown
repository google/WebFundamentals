---
title: "Hizli Basvuru"
description: "Video ögesiyle ilgili özelliklere hizli, genel bir bakis."
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
---

<p class="intro">
  Video ögesiyle ilgili özelliklere hizli, genel bir bakis.
</p>

{% include shared/toc.liquid %}


## Video ögesi özellikleri

Video ögesi özelliklerinin ve tanimlarinin tam listesi için [video ögesi teknik özelliklerine](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element) bakin.

<table class="mdl-data-table mdl-js-data-table">
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

### Otomatik oynatma

Masaüstünde `autoplay` özelligi, tarayiciya videoyu hemen indirmeye baslamasini ve mümkün olan en kisa zamanda oynatmasini bildirir. iOS'ta ve Android için Chrome'da, `autoplay` özelligi çalismaz; kullanicilarin videoyu oynatmak için ekrana hafifçe vurmasi gerekir.

Otomatik oynatmanin mümkün oldugu platformlarda bile, bunu etkinlestirmenin iyi bir fikir olup olmadigini degerlendirmeniz gerekir:

* Veri kullanimi pahali olabilir.
* Önce sormadan medyanin indirilip oynatilmaya baslamasina neden olmaniz, beklenmedik bir sekilde bant genisligini ve CPU'yu isgal edebilir ve dolayisiyla, sayfanin olusturulmasinda gecikmeye neden olabilir.
* Kullanicilar, video oynatmak veya ses çalmak için uygun olmayan bir durumda olabilir.

Otomatik oynatma davranisi Android WebView'da [WebSettings API'si](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) araciligiyla yapilandirilabilir.
Varsayilan olarak true degerine ayarlanir, ancak bir WebView uygulamasi bunu devre disi birakmayi seçebilir.

### Önceden yükleme

`preload` özelligi, tarayiciya ne kadar bilginin veya içerigin önceden yüklenmesi gerektigi konusunda bir ipucu saglar.

<table class="mdl-data-table mdl-js-data-table">
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

## JavaScript

[HTML5 Rocks Video makalesi](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript), video oynatmayi kontrol etmek için kullanilabilecek JavaScript özelliklerinin, yöntemlerinin ve olaylarinin harika bir özetini sunmaktadir. Bu içerigi, uygun durumlarda mobil cihazlara özel kaygilarla güncelleyerek buraya ekledik.

### Özellikler

<table class="mdl-data-table mdl-js-data-table">
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

PlaybackRate ({% link_sample _code/scripted.html %}demoya bakin{% endlink_sample %}) ve volume, mobil cihazlarda desteklenmez.

### Yöntemler

<table class="mdl-data-table mdl-js-data-table">
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
dügmeyi tiklama gibi kullanici eylemlerine yanit olarak çagrilmadikça çalismaz: {% link_sample _code/scripted.html %}Demoya{% endlink_sample %} bakin. (Benzer sekilde, yerlesik YouTube videolari gibi içerik için oynatma baslatilamaz.)

### Olaylar

Bunlar, etkinlesebilecek medya olaylarinin yalnizca bir alt kümesidir. Tam liste için Mozilla Developer Network'te [Medya olaylari](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) sayfasina bakin.

<table class="mdl-data-table mdl-js-data-table">
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



