---
title: "Kesme noktalari nasil seçilir?"
description: "Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - "Tarayici görüntü alaninin genisligini ve ölçeklemesini kontrol etmek için meta görünüm etiketini kullanin."
    - "Ekranin genisligini cihazdan bagimsiz pikseller seklinde eslestirmek için <code>width=device-width</code>kodunu ekleyin."
    - "CSS pikselleri ile cihazdan bagimsiz pikseller arasinda bire bir iliski olusturmak için <code>initial-scale=1</code> kodunu ekleyin."
    - "Sayfaniza, kullanici ölçeklemesini devre disi birakmadan erisilebildiginden emin olun."
  size-content-to-vp:
    - "Genis sabit genislikli ögeler kullanmayin."
    - "Içerigin iyi bir sekilde olusturulmasi belirli bir görüntü alani genisligine bagli olmamalidir."
    - "Küçük ve büyük ekranlar için farkli tasarimlar uygulamak için CSS medya sorgularini kullanin."
  media-queries:
    - "Cihaz özelliklerine göre stil uygulamak için medya sorgulari kullanilabilir."
    - "En genis deneyimi saglamak için <code>min-device-width</code> yerine <code>min-width</code> kodunu kullanin."
    - "Yerlesimi bozmamak için ögeler için göreli boyutlar kullanin."
  choose-breakpoints:
    - "Kesme noktalarini içerige göre olusturun, hiçbir zaman belirli cihazlara, ürünlere veya markalara göre olusturmayin."
    - "Ilk olarak en küçük mobil cihaz için tasarim yapin, daha sonra daha fazla ekran kullanima sunuldukça deneyimi artan bir sekilde gelistirin."
    - "Metin satirlarini en fazla 70 veya 80 karakter civarinda tutun."
notes:
  use-commas:
    - "Eski tarayicilarin özellikleri dogru bir sekilde ayristirabileceklerinden emin olmak üzere özellikleri birbirinden ayirmak için virgül kullanin."
---
<p class="intro">
  Kesme noktalarini cihaz siniflarina göre tanimlamayi düsünmeniz yararli olabilir, ancak dikkatli olmalisiniz.  Kesme noktalarinin bugün kullanilmakta olan belirli cihazlara, ürünlere, marka adlarina veya isletim sistemlerine göre tanimlanmasi bakim açisindan tam bir kabusa dönüsebilir. Bunun yerine, yerlesimleri kapsayicisina nasil ayarlayacagini içerigin kendisi belirlemelidir.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Küçüklerden baslayarak ana kesme noktalarini seçin, daha sonra yukari dogru çalisin

Içerigi ilk olarak küçük bir ekran boyutuna sigacak sekilde tasarlayin, daha sonra bir kesme noktasi gerekinceye kadar ekrani genisletin. ·  Bu, kesme noktalarini içerige göre optimize etmenize ve mümkün oldugunca az sayida kesme noktasi olusturmaniza olanak tanir.

Baslangiçta gördügümüz [hava durumu tahmini]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html) örnegi üzerinden çalismaya baslayalim.
Ilk adimimiz, tahminin küçük bir ekranda iyi görünmesini saglamak olacak.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Hava durumu tahminini önizlemesinin küçük bir ekranda gösterimi.">
  {% endlink_sample %}
</figure>

Daha sonra, ögeler arasinda çok fazla beyaz bosluk oluncaya ve tahmin kötü görününceye kadar tarayici boyutunu yeniden ayarlayin.  Burada verilecek karar biraz görecelidir, ancak 600 pikselin üzeri kesinlikle çok genistir.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Sayfa genisledikçe hava durumu tahmininin önizlemesi.">
  {% endlink_sample %}
</figure>

600 piksel noktasinda bir kesme noktasi eklemek için iki yeni stil sayfasi olusturun. Bunlarin birini tarayici 600 piksel ve altindayken, digerini de 600 pikselden genis oldugunda kullanacaksiniz.

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Son olarak, CSS'yi yeniden yazin.  Bu örnekte, `weather.css` dosyasina yazi tipleri, simgeler, temel konumlandirma ve renkler gibi genel stilleri yerlestirdik.  Daha sonra, küçük ekrana iliskin belirli yerlesimler `weather-small.css` ve genis ekran stilleri `weather-large.css` dosyasina yerlestirilir.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Gerektiginde küçük kesme noktalari seçin

Yerlesim önemli ölçüde degistiginde ana kesme noktalari seçmeye ek olarak, küçük degisiklikler için ayarlama yapmak da yararli olur.  Örnegin, ana kesme noktalari arasinda bir ögenin kenar bosluklarinin veya dolgusunun ayarlanmasi veya yerlesimde daha dogal görünmesi için yazi tipi boyutunun artirilmasi yararli olabilir.

Küçük ekran yerlesimini optimize ederek baslayalim.  Bu örnekte, görüntü alani genisligi 360 pikselden büyük oldugunda yazi tipini artiralim.  Ikinci olarak, yeterli alan oldugunda yüksek ve düsük sicakliklari ayirabiliriz; böylece, birbirinin üzerinde görüneceklerine ayni satirda görünürler.  Hava durumu simgelerini de biraz genisletelim.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Benzer bir sekilde, tüm ekran genisligini tüketmemesi için genis ekranlarda tahmin panelinin maksimum genisligini sinirlamak en dogru karar olacaktir.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## Metni okuma için optimize etme

Klasik okunabilirlik teorisi, ideal bir sütunun satir basina 70 ile 80 karakter içermesi gerektigini (Ingilizcede yaklasik 8 ile 10 kelime) söyler, dolayisiyla bir metin blogunun genisligi yaklasik 10 kelimeyi geçecek sekilde büyüdügünde bir kesme noktasinin kullanilmasi düsünülebilir.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Küçük kesme noktalari eklemeden önce.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Küçük kesme noktalari ekledikten sonra.">
  </div>
</div>

Yukaridaki blog yayini örnegine daha ayrintili bir sekilde bakalim.  Küçük ekranlarda, 1em büyüklügündeki Roboto yazi tipi mükemmel bir sekilde satir basina 10 kelime verir, ancak genis ekranlarda bir kesme noktasi gerektirir. Bu durumda, tarayici genisligi 575 pikselden büyükse ideal içerik genisligi 550 piksel olur.

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Hiçbir zaman içerigi tam olarak gizlemeyin

Ekran boyutuna bagli olarak gizlenecek veya gösterilecek içerigi seçerken dikkatli olun.
Içerigi yalnizca ekrana sigdiramayacaginiz için gizlemeyin. ·  Ekran boyutu, bir kullanicinin isteyebilecegi seyler için tanimlayici bir gösterge degildir.  Örnegin, hava durumu tahmininden polen sayisinin çikarilmasi, bahar alerjisi olan ve disari çikip çikamayacaklarini belirlemek için bu bilgiye gereksinim duyan kisiler için ciddi bir sorun olabilir.




