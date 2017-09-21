project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Duyarli Web Tasarimi Temel Bilgileri {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Web'de sörf yapmak için mobil cihazlarin kullanilmasi çok büyük bir hizla artmaktadir, ancak ne yazik ki web'in çogunlugu bu mobil cihazlar için optimize edilmemistir. Mobil cihazlar genellikle ekran boyutuna göre sinirlanir ve içerigin ekrana yerlestirilme sekliyle ilgili farkli bir yaklasim gereklidir.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


{% include "web/_shared/udacity/ud893.html" %}




Telefonlarda, `tablet-telefonlarda`, tabletlerde, masaüstü bilgisayarlarda, oyun konsollarinda, TV'lerde, hatta giyilebilir ürünlerde çok farkli ekran boyutlari söz konusudur.  Ekran boyutlari her zaman degismektedir, dolayisiyla sitenizin bugün veya gelecekte her ekran boyutuna uyum saglayabilmesi önemlidir.


  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>


Ilk olarak [A List Apart baslikli makalede Ethan Marcotte](http://alistapart.com/article/responsive-web-design/) tarafindan tanimlanan duyarli web tasarimi, kullanicilarin ve kullanmakta olduklarin cihazlarin gereksinimlerine yanit verir.  Yerlesim, cihazin boyutuna ve yeteneklerine göre degisir.  Örnegin, bir telefonda, kullanicilar tek sütunlu bir görünümde gösterilen içerigi görürken bir tablet, ayni içerigi iki sütunda gösterebilir.


## Görüntü alanini ayarlama

Çesitli cihazlar için optimize edilmis sayfalar, dokümanin basinda bir meta görüntü alani ögesi içermelidir.  Meta görüntü alani etiketi, tarayiciya sayfanin boyutlarini ve ölçeklemesini nasil kontrol edecegine iliskin talimatlar verir.




### TL;DR {: .hide-from-toc }
- Tarayici görüntü alaninin genisligini ve ölçeklemesini kontrol etmek için meta görünüm etiketini kullanin.
- Ekranin genisligini cihazdan bagimsiz pikseller seklinde eslestirmek için <code>width=device-width</code>kodunu ekleyin.
- CSS pikselleri ile cihazdan bagimsiz pikseller arasinda bire bir iliski olusturmak için <code>initial-scale=1</code> kodunu ekleyin.
- Sayfaniza, kullanici ölçeklemesini devre disi birakmadan erisilebildiginden emin olun.


En iyi deneyimi saglama çabasiyla mobil tarayicilar, sayfayi bir masaüstü ekran genisliginde (genellikle 980 piksel civarinda, ancak bu deger cihazlar arasinda degisiklik gösterir) olusturur ve daha sonra, yazi tipi boyutlarini artirip içerigi ekrana sigdirmak için ölçekleyerek içerigin daha iyi görünmesine çalisir.  Kullanicilar için bu, yazi tipi boyutlarinin tutarsiz görünebilmesi ve içerigi görmek ve içerikle etkilesimde bulunabilmek için ekrana iki kez hafifçe vurmalari veya parmaklarini sikistirarak zum yapmak zorunda kalmalari anlamina gelir.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


`width=device-width` meta görüntü alani degeri kullanildiginda, cihazdan bagimsiz piksel sayisi kullanilarak sayfanin ekranin genisligiyle eslestirilmesi talimati verilir. Bu, ister küçük bir cep telefonunda isterse de genis bir masaüstü monitöründe olusturulmus olsun, sayfanin içerigi yeniden düzenleyerek farkli ekran boyutlariyla eslestirmesine olanak tanir.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Görüntü alani ayari olmayan sayfa">
    <figcaption>
      Page without a viewport set
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Görüntü alani ayari olan sayfa">
    <figcaption>
      Page with a viewport set
     </figcaption>
  </figure>
  </a>
</div>

Bazi tarayicilar, yatay moda dönerken sayfanin genisligini sabit tutar ve ekrani doldurmak için yeniden düzenlemek yerine zum yapar. `initial-scale=1` özelligi eklendiginde, tarayiciya CSS pikselleri ile cihazdan bagimsiz pikseller arasinda, cihazin yönü ne olursa olsun 1:1 iliski olusturmasi talimati verilir ve sayfanin tam yatay genislikten yararlanmasi saglanir.

Note: Eski tarayicilarin özellikleri dogru bir sekilde ayristirabileceklerinden emin olmak üzere özellikleri birbirinden ayirmak için virgül kullanin.

### Erisilebilir görüntü alani saglama

Bir `baslangiç ölçegi` ayarlamaya ek olarak, görüntü alaninda asagidaki özellikleri de ayarlayabilirsiniz:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Bunlar ayarlandiklarinda, kullanicinin görüntü alanini zum yapma yetenegini devre disi birakip erisilebilirlik sorunlarina neden olabilir.


## Içerigi görünüme göre boyutlandirma

Hem masaüstü hem de mobil cihazlarda kullanicilar web sitelerini yatay olarak degil, dikey olarak kaydirmaya aliskindir ve kullaniciyi, tüm sayfayi görmesi için yatay olarak kaydirmaya veya uzaklastirmaya zorlamak kötü bir kullanici deneyimiyle sonuçlanir.


### TL;DR {: .hide-from-toc }
- Genis sabit genislikli ögeler kullanmayin.
- Içerigin iyi bir sekilde olusturulmasi belirli bir görüntü alani genisligine bagli olmamalidir.
- Küçük ve büyük ekranlar için farkli tasarimlar uygulamak için CSS medya sorgularini kullanin.


`Meta görüntü alani` etiketiyle bir mobil site gelistirirken yanlislikla belirtilen görünüme tam sigmayan sayfa içerigi olusturmak kolaydir. Örnegin, görüntü alanindan daha genis bir ene sahip olarak görüntülenen bir resim, görüntü alaninin yatay olarak kaydirilmasina neden olabilir. Bu içerigi, görüntü alaninin genisligi içine sigacak sekilde ayarlamaniz ve kullanicinin yatay olarak kaydirmak zorunda kalmamasini saglamaniz gerekir.

Ekran boyutlari ve CSS piksellerindeki genislik, cihazlar arasinda (ör. telefonlar ve tabletler arasinda, hatta farkli telefonlar arasinda bile) oldukça degistiginden, içerigin olusturulmasi için belirli bir görüntü alani temel alinmamalidir.

Sayfa ögeleri için genis mutlak CSS genisliklerinin ayarlanmasi (asagidaki örnekte oldugu gibi), dar bir cihazda (ör. iPhone gibi 320 CSS pikseli genisligi olan bir cihazda) `div` ögesinin görüntü alani için çok genis olmasina neden olur. Bunun yerine, `width: 100%` gibi göreli genislik degerleri kullanmayi düsünebilirsiniz.  Benzer bir sekilde, ögenin küçük ekranlarda görüntü alaninin disinda kalmasina neden olabilecek genis mutlak konumlandirma degerleri kullanmaktan kaçinin.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone'da 344 piksel sabit genislikli bir öge içeren sayfa.">
    <figcaption>
      iPhone'da 344 piksel sabit genislikli bir öge içeren sayfa.
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5'te 344 piksel sabit genislikli bir öge içeren sayfa.">
    <figcaption>
      Nexus 5'te 344 piksel sabit genislikli bir öge içeren sayfa.
     </figcaption>
  </figure>
  </a>
</div>

## Duyarlilik için CSS medya sorgularini kullanma

Medya sorgulari, CSS stillerine uygulanabilecek basit filtrelerdir.  Içerigi olusturan cihazin ekran türü, genislik, yükseklik, yön, hatta çözünürlügünü de içeren özelliklerine göre stilleri degistirmeyi kolaylastirirlar.




### TL;DR {: .hide-from-toc }
- Cihaz özelliklerine göre stil uygulamak için medya sorgulari kullanilabilir.
- En genis deneyimi saglamak için <code>min-device-width</code> yerine <code>min-width</code> kodunu kullanin.
- Yerlesimi bozmamak için ögeler için göreli boyutlar kullanin.



Örnegin, bir yazdirma medya sorgusu içine yazdirma için gereken tüm stilleri yerlestirebilirsiniz:


    <link rel="stylesheet" href="print.css" media="print">
    

Stil sayfasi baglantisinda `media` özelligini kullanmaya ek olarak, bir CSS dosyasina yerlestirilebilecek medya sorgularini uygulamanin iki yolu daha vardir: `@media` ve `@import`.  Performans nedeniyle `@import` sözdizimi yerine ilk iki yöntemden biri önerilir (bkz. [CSS içe aktarmalarindan kaçinma](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

Medya sorgulari için geçerli olan mantik, birbiriyle örtüsür ve bu ölçütü karsilayan filtrelerin sonucunda belirlenen CSS blogu, CSS'deki standart öncelik kurallari kullanilarak uygulanir.

### Medya sorgularini görüntü alani boyutuna göre uygulama

Medya sorgulari; küçük, büyük ve aradaki ekranlara belirli stillerin uygulandigi duyarli bir deneyim olusturabilmemizi saglar.  Medya sorgusu sözdizimi, cihaz özelliklerine bagli olarak uygulanabilecek kurallarin olusturulmasina olanak tanir.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Sorgulayabilecegimiz farkli ögeler söz konusudur, ancak duyarli web tasarimi için en sik kullanilanlar `min-width`, `max-width`, `min-height` ve `max-height` ögeleridir.


<table>
    <thead>
    <tr>
      <th data-th="özellik">özellik</th>
      <th data-th="Sonuç">Sonuç</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="özellik"><code>min-width</code></td>
      <td data-th="Sonuç">Kurallar, genisligi sorguda tanimlanan degerin üzerinde olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>max-width</code></td>
      <td data-th="Sonuç">Kurallar, genisligi sorguda tanimlanan degerin altinda olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>min-height</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligi sorguda tanimlanan degerin üzerinde olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>max-height</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligi sorguda tanimlanan degerin altinda olan tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>orientation=portrait</code></td>
      <td data-th="Sonuç">Kurallar, yüksekligin genislikten büyük veya genislige esit oldugu tarayicilar için uygulanir.</td>
    </tr>
    <tr>
      <td data-th="özellik"><code>orientation=landscape</code></td>
      <td data-th="Sonuç">Kurallar, genisligin yükseklikten büyük oldugu tarayicilar için uygulanir.</td>
    </tr>
  </tbody>
</table>

Birlikte bir örnege bakalim:

<figure>
  
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Yeniden boyutlandirilirken özellikleri degistirmek için medya sorgularini kullanan bir sayfanin önizlemesi.">
  
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* Tarayici genisligi <b>0p</b> ile <b>640p</b> arasinda oldugunda, `max-640px.css` uygulanir.
* Tarayici genisligi <b>500p</b> ile <b>600p</b> arasinda oldugunda, `@media` içindeki stiller uygulanir.
* Tarayici genisligi <b>640p veya daha fazla</b> oldugunda, `min-640px.css` uygulanir.
* Tarayici <b>genisligi yükseklikten fazla oldugunda</b>, `landscape.css` uygulanir.
* Tarayici <b>yüksekligi genislikten fazla oldugunda</b>, `portrait.css` uygulanir.


### `min-device-width` ile ilgili bir not

`*-device-width` özelligine dayali sorgular da olusturulabilir; ancak bu uygulama **kesinlikle tavsiye edilmemektedir**.

Fark küçük ancak çok önemlidir: `min-width`, tarayici penceresinin boyutuna dayanirken `min-device-width` özelligi ekranin boyutuna dayanir.  Ne yazik ki eski Android tarayicisinin da aralarinda bulundugu bazi tarayicilar, cihaz genisligini dogru bir sekilde bildiremez ve ekran boyutunu beklenen görüntü alani genisligi yerine cihaz pikselleri olarak bildirir.

Buna ek olarak, `*-device-width` özelliginin kullanilmasi, sorgu tarayici penceresinin boyutu yerine gerçek cihaz boyutuna dayali olacagindan, masaüstü bilgisayarlarda veya pencerelerin yeniden boyutlandirilmasina olanak taniyan diger cihazlarda içerigin uyarlanmasini engelleyebilir.

### Göreli birimler kullanma

Duyarli tasarimin arkasindaki önemli bir kavram, sabit genislikli yerlesimlere karsilik degiskenlik ve orantisalliktir.  Ölçümler için göreli birimlerin kullanilmasi, yerlesimlerin basitlestirilmesine yardimci olabilir ve yanlislikla görüntü alani için çok büyük olan bilesenlerin olusturulmasini önleyebilir.

Örnegin, üst düzey bir div ögesinde genisligin %100 degerine ayarlanmasi, ögenin görüntü alaninin genisligine uzamasini ve hiçbir zaman görüntü alani için çok büyük veya çok küçük olmamasini saglar.  div ögesi cihaz ister 320 piksel genisliginde bir iPhone, ister 342 piksel genisliginde bir Blackberry Z10, isterse de 360 piksel genisliginde bir Nexus 5 olsun görünüme sigar.

Buna ek olarak, göreli birimlerin kullanilmasi, tarayicilarin sayfaya yatay kaydirma çubuklari eklemesine gerek kalmadan içerigi kullanicilarin zum düzeyine dayali olarak olusturmalarina olanak tanir.

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }



## Kesme noktalari nasil seçilir?

Kesme noktalarini cihaz siniflarina göre tanimlamayi düsünmeniz yararli olabilir, ancak dikkatli olmalisiniz.  Kesme noktalarinin bugün kullanilmakta olan belirli cihazlara, ürünlere, marka adlarina veya isletim sistemlerine göre tanimlanmasi bakim açisindan tam bir kabusa dönüsebilir. Bunun yerine, yerlesimleri kapsayicisina nasil ayarlayacagini içerigin kendisi belirlemelidir.



### TL;DR {: .hide-from-toc }
- Kesme noktalarini içerige göre olusturun, hiçbir zaman belirli cihazlara, ürünlere veya markalara göre olusturmayin.
- Ilk olarak en küçük mobil cihaz için tasarim yapin, daha sonra daha fazla ekran kullanima sunuldukça deneyimi artan bir sekilde gelistirin.
- Metin satirlarini en fazla 70 veya 80 karakter civarinda tutun.


### Küçüklerden baslayarak ana kesme noktalarini seçin, daha sonra yukari dogru çalisin

Içerigi ilk olarak küçük bir ekran boyutuna sigacak sekilde tasarlayin, daha sonra bir kesme noktasi gerekinceye kadar ekrani genisletin. ·  Bu, kesme noktalarini içerige göre optimize etmenize ve mümkün oldugunca az sayida kesme noktasi olusturmaniza olanak tanir.

Baslangiçta gördügümüz [hava durumu tahmini](/web/fundamentals/design-and-ux/responsive/) örnegi üzerinden çalismaya baslayalim.
Ilk adimimiz, tahminin küçük bir ekranda iyi görünmesini saglamak olacak.

<figure>
  
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Hava durumu tahminini önizlemesinin küçük bir ekranda gösterimi.">
  
</figure>

Daha sonra, ögeler arasinda çok fazla beyaz bosluk oluncaya ve tahmin kötü görününceye kadar tarayici boyutunu yeniden ayarlayin.  Burada verilecek karar biraz görecelidir, ancak 600 pikselin üzeri kesinlikle çok genistir.

<figure>
  
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Sayfa genisledikçe hava durumu tahmininin önizlemesi.">
  
</figure>

600 piksel noktasinda bir kesme noktasi eklemek için iki yeni stil sayfasi olusturun. Bunlarin birini tarayici 600 piksel ve altindayken, digerini de 600 pikselden genis oldugunda kullanacaksiniz.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

Son olarak, CSS'yi yeniden yazin.  Bu örnekte, `weather.css` dosyasina yazi tipleri, simgeler, temel konumlandirma ve renkler gibi genel stilleri yerlestirdik.  Daha sonra, küçük ekrana iliskin belirli yerlesimler `weather-small.css` ve genis ekran stilleri `weather-large.css` dosyasina yerlestirilir.

<figure>
  
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  
</figure>

### Gerektiginde küçük kesme noktalari seçin

Yerlesim önemli ölçüde degistiginde ana kesme noktalari seçmeye ek olarak, küçük degisiklikler için ayarlama yapmak da yararli olur.  Örnegin, ana kesme noktalari arasinda bir ögenin kenar bosluklarinin veya dolgusunun ayarlanmasi veya yerlesimde daha dogal görünmesi için yazi tipi boyutunun artirilmasi yararli olabilir.

Küçük ekran yerlesimini optimize ederek baslayalim.  Bu örnekte, görüntü alani genisligi 360 pikselden büyük oldugunda yazi tipini artiralim.  Ikinci olarak, yeterli alan oldugunda yüksek ve düsük sicakliklari ayirabiliriz; böylece, birbirinin üzerinde görüneceklerine ayni satirda görünürler.  Hava durumu simgelerini de biraz genisletelim.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
    <figcaption>
      Before adding minor breakpoints.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
    <figcaption>
      After adding minor breakpoints.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


Benzer bir sekilde, tüm ekran genisligini tüketmemesi için genis ekranlarda tahmin panelinin maksimum genisligini sinirlamak en dogru karar olacaktir.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### Metni okuma için optimize etme

Klasik okunabilirlik teorisi, ideal bir sütunun satir basina 70 ile 80 karakter içermesi gerektigini (Ingilizcede yaklasik 8 ile 10 kelime) söyler, dolayisiyla bir metin blogunun genisligi yaklasik 10 kelimeyi geçecek sekilde büyüdügünde bir kesme noktasinin kullanilmasi düsünülebilir.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Küçük kesme noktalari eklemeden önce.">
    <figcaption>Küçük kesme noktalari eklemeden önce.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Küçük kesme noktalari ekledikten sonra.">
    <figcaption>Küçük kesme noktalari ekledikten sonra.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Yukaridaki blog yayini örnegine daha ayrintili bir sekilde bakalim.  Küçük ekranlarda, 1em büyüklügündeki Roboto yazi tipi mükemmel bir sekilde satir basina 10 kelime verir, ancak genis ekranlarda bir kesme noktasi gerektirir. Bu durumda, tarayici genisligi 575 pikselden büyükse ideal içerik genisligi 550 piksel olur.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### Hiçbir zaman içerigi tam olarak gizlemeyin

Ekran boyutuna bagli olarak gizlenecek veya gösterilecek içerigi seçerken dikkatli olun.
Içerigi yalnizca ekrana sigdiramayacaginiz için gizlemeyin. ·  Ekran boyutu, bir kullanicinin isteyebilecegi seyler için tanimlayici bir gösterge degildir.  Örnegin, hava durumu tahmininden polen sayisinin çikarilmasi, bahar alerjisi olan ve disari çikip çikamayacaklarini belirlemek için bu bilgiye gereksinim duyan kisiler için ciddi bir sorun olabilir.
