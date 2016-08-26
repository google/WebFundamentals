project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Erisilebilirlik bir özellik degildir.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Erisilebilirlik önemlidir {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Erisilebilirlik bir özellik degildir. Duyamayan veya göremeyen kullanicilar, bir videoyu altyazilar veya açiklamalar olmadan hiç deneyimleyemez. Bunlarin videonuza eklenmesi, kullanicilariniza sundugunuz kötü deneyimden çok daha kisa sürer. En azindan tüm kullanicilar için bir temel deneyim saglayin.




## Erisilebilirligi iyilestirmek için altyazi ekleme

Medyanin mobil cihazlarda daha erisilebilir olmasini saglamak için parça ögesini kullanarak altyazilar veya açiklamalar ekleyin.

<!-- TODO: Verify note type! -->
Note: Izleme ögesi Android için Chrome'da, iOS Safari'de ve Firefox haricinde geçerli tüm masaüstü tarayicilarda desteklenir (bkz. <a href='http://caniuse.com/track' title='Izleme ögesi destek durumu'>caniuse.com/track</a>). Çesitli çoklu dolgular da kullanilmaktadir. <a href='//www.delphiki.com/html5/playr/' title='Playr parça ögesi çoklu dolgusu'>Playr</a> veya <a href='//captionatorjs.com/' title='Captionator parça'>Captionator</a> kullanmanizi öneririz.

Izleme ögesi kullanildiginda altyazilar sunun gibi görünür:

 <img class="center" alt="Android için Chrome'da parça ögesi kullanilarak görüntülenen altyazilarin gösterildigi ekran görüntüsü" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Parça ögesi ekleme

Videonuza altyazi eklemek çok kolaydir. Bunun için video ögesinin alt ögesi olarak bir parça ögesi eklemeniz yeterlidir:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

Parça ögesinin `src` özelligi, parça dosyasinin konumunu verir.

## Parça dosyasinda altyazilari tanimlama

Bir parça dosyasi, WebVTT biçimindeki zamanli `ipuçlarindan` olusur:

    WEBVTT

    00:00.000 --> 00:04.000
    Adam bir agaç dalinda oturup dizüstü bilgisayar kullanmaktadir.

    00:05.000 --> 00:08.000
    Dal kirilir ve adam düsmeye baslar.

    ...



