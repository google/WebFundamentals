---
title: "Erisilebilirlik önemlidir"
description: "Erisilebilirlik bir özellik degildir."
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
  Erisilebilirlik bir özellik degildir. Duyamayan veya göremeyen kullanicilar, bir videoyu altyazilar veya açiklamalar olmadan hiç deneyimleyemez. Bunlarin videonuza eklenmesi, kullanicilariniza sundugunuz kötü deneyimden çok daha kisa sürer. En azindan tüm kullanicilar için bir temel deneyim saglayin.
</p>

{% include shared/toc.liquid %}



## Erisilebilirligi iyilestirmek için altyazi ekleme

Medyanin mobil cihazlarda daha erisilebilir olmasini saglamak için parça ögesini kullanarak altyazilar veya açiklamalar ekleyin.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Izleme ögesi kullanildiginda altyazilar sunun gibi görünür:

 <img class="center" alt="Android için Chrome'da parça ögesi kullanilarak görüntülenen altyazilarin gösterildigi ekran görüntüsü" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Parça ögesi ekleme

Videonuza altyazi eklemek çok kolaydir. Bunun için video ögesinin alt ögesi olarak bir parça ögesi eklemeniz yeterlidir:

{% include_code src=_code/track.html snippet=track lang=html %}

Parça ögesinin `src` özelligi, parça dosyasinin konumunu verir.

## Parça dosyasinda altyazilari tanimlama

Bir parça dosyasi, WebVTT biçimindeki zamanli `ipuçlarindan` olusur:

    WEBVTT

    00:00.000 --> 00:04.000
    Adam bir agaç dalinda oturup dizüstü bilgisayar kullanmaktadir.

    00:05.000 --> 00:08.000
    Dal kirilir ve adam düsmeye baslar.

    ...



