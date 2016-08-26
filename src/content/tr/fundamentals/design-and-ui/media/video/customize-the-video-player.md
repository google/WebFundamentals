project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Video oynaticiyi özellestirme {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Farkli platformlar videoyu farkli sekilde görüntüler. Mobil çözümlerde cihaz yönünün dikkate alinmasi gerekir. Video içeriginin tam ekran görünümünü kontrol etmek için Tam Ekran API'sini kullanin.



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
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Bu tarayici video ögesini desteklemiyor.</p>
</video>

Bunu çalisirken görmek için <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demoya</a> göz atin.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



