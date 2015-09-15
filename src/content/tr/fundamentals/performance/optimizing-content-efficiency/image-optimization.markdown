---
title: "Resim optimizasyonu"
description: "Resimler genellikle bir web sayfasinda indirilen baytlarin çogunlugundan sorumlu olur ve siklikla görsel alanin önemli bir kismini kaplar. Sonuç olarak, resimlerin optimize edilmesi genellikle en büyük bayt tasarruflarindan ve web sitenizdeki en iyi performans iyilestirmelerinden bazilarini saglayabilir: Tarayicinin indirmesi gereken bayt miktari azaldikça, istemci bant genisligi için daha az rekabet olur ve tarayici, yararli içerigi daha hizli indirip ekranda olusturabilir."
updated_on: 2014-05-10
key-takeaways:
  replace:
    - Gereksiz resim kaynaklarini çikarin
    - Mümkün oldugunda CSS3 efektlerinden yararlanin
    - Resimlerde metin kodlamak yerine web yazi tiplerini kullanin
  vector-raster:
    - "Vektör resimler, geometrik sekillerden olusan resimler için idealdir"
    - Vektör resimler zum ve çözünürlükten bagimsizdir
    - "Tarama resimler, birçok düzensiz sekil ve ayrinti bulunan karmasik sahneler için kullanilmalidir"
  hidpi:
    - Yüksek çözünürlüklü ekranlarin CSS pikseli basinda birden çok cihaz pikseli vardir
    - "Yüksek çözünürlüklü resimler, önemli ölçüde daha fazla piksel ve bayt gerektirir"
    - "Resim optimizasyon teknikleri, çözünürlükten bagimsiz olarak aynidir"
  optimizing-vector:
    - "SVG, XML tabanli bir resim biçimidir"
    - Boyutlarinin azaltilmasi için SVG dosyalari küçültülmelidir
    - SVG dosyalari GZIP ile sikistirilmalidir
  optimizing-raster:
    - "Tarama resmi, piksellerden olusmus bir kilavuzdur"
    - "Her bir piksel, renk ve seffaflik bilgilerini kodlar"
    - "Resim sikistiricilari, resmin dosya boyutunu küçültmek için piksel basina gereken bit sayisini azaltmak üzere çesitli teknikler kullanir"
  lossless-lossy:
    - "Gözlerimizin çalisma seklinde dolayi, resimler kayipli sikistirma için mükemmel adaylardir"
    - "Resim optimizasyonu, bir kayipli ve kayipsiz sikistirma islevidir"
    - "Resim biçimlerindeki farklar, resmi optimize etmek için kullanilan kayipli ve kayipsiz algoritmalardan ve bu algoritmalarin kullanimlarindaki farkliliklardan kaynaklanir"
    - "Tüm resimler için geçerli tek bir en iyi biçim veya 'kalite ayari' yoktur: Belirli sikistirici ve resim içeriklerinin her bir kombinasyonu benzersiz bir çikis olusturur"
  formats:
    - "Dogru evrensel biçimi seçerek baslayin: GIF, PNG, JPEG"
    - "Her bir biçim için en iyi ayarlari deneyip seçin: Kalite, palet boyutu vb."
    - "Modern istemciler için WebP ve JPEG XR varliklari eklemeyi düsünebilirsiniz ölçeklenmis-resimler"
  scaled-images:
    - "Ölçeklenmis varliklar saglama, en basit ve en etkili optimizasyonlardan biridir"
    - Büyük varliklar yüksek ek yüke neden oldugundan bunlarla ilgili dikkatli olun
    - Resimlerinizi ekran boyutuna ölçekleyerek gereksiz piksel sayisini azaltin


notes:
  decompressed:
    - "Bu arada, verileri sunucudan istemciye aktarmak için kullanilan resim biçiminden bagimsiz olarak, resmin kodu tarayici tarafindan çözüldügünde her bir piksel her zaman 4 bayt bellek kullanir. Bu, büyük resimler ve kullanilabilir bellegi çok fazla olmayan cihazlar (ör. alt sinif mobil cihazlar) için önemli bir kisitlama olabilir."
  artifacts:
    - "Soldan saga (PNG): 32 bit (16M renk), 7 bit (128 renk), 5 bit (32 renk). Kademeli renk geçisleri olan karmasik sahneler (gradyanlar, gökyüzü vb.), 5 bit varlikta piksellestirilmis gökyüzü gibi görsel yapay nesneleri önlemek için daha genis renk paletleri gerektirir. Diger yandan, resim yalnizca birkaç renk kullaniyorsa, genis bir palet yalnizca degerli bitlerin harcanmasi anlamina gelir!"
  quality:
    - "Farkli resim biçimlerinin kalite düzeylerinin, resmi kodlamak için kullanilan algoritmalardaki farkliliklar nedeniyle dogrudan karsilastirilamadigini unutmayin: 90 kaliteli JPEG, 90 kaliteli bir WebP'den çok farkli bir sonuç olusturur. Aslinda, ayni resim biçiminin kalite düzeyleri bile sikistiricinin uygulamasina bagli olarak görünür sekilde farkli çikis üretebilir!"
  resized:
    - "Chrome DevTools'ta imleci resim ögesinin üzerinde beklettiginizde, resim varliginin 'dogal' ve 'ekran' boyutlari görünür. Yukaridaki örnekte 300x260 piksellik resim indirilir, ancak görüntülenirken istemcide ölçegi küçültülür (245x212)."
---

<p class="intro">
  Resimler genellikle bir web sayfasinda indirilen baytlarin çogunlugundan sorumlu olur ve siklikla görsel alanin önemli bir kismini kaplar. Sonuç olarak, resimlerin optimize edilmesi genellikle en büyük bayt tasarruflarindan ve web sitenizdeki en iyi performans iyilestirmelerinden bazilarini saglayabilir: Tarayicinin indirmesi gereken bayt miktari azaldikça, istemci bant genisligi için daha az rekabet olur ve tarayici, yararli içerigi daha hizli indirip ekranda olusturabilir.
</p>


{% include shared/toc.liquid %}

Resim optimizasyonu hem bir sanat hem de bilimdir: Tek bir resmin en iyi nasil sikistirilacagina dair tek bir tanimlayici yanit olmadigindan bir sanattir; bununla birlikte bir resmin boyutunu önemli ölçüde küçültebilecek iyi gelistirilmis birçok teknik ve algoritma olmasindan dolayi bir bilimdir. Resminiz için en iyi ayarlarin bulunmasi, birçok boyutta dikkatli analizlerin yapilmasini gerektirir: Biçim yetenekleri, kodlanmis verilerin içerigi, kalite, piksel boyutlari ve daha fazlasi.

## Resimleri çikarma ve degistirme

{% include shared/takeaway.liquid list=page.key-takeaways.replace %}

Kendinize ilk olarak, bir resmin gerçekte pesinde oldugunuz etkiyi gerçeklestirmek için gerekli olup olmadigini sormaniz gerekir. Iyi tasarim basittir ve her zaman en iyi performansi saglar. Genellikle HTML, CSS, JavaScript ve sayfadaki diger varliklara göre daha fazla sayida bayt gerektiren bir resim kaynagini çikarabiliyorsaniz, bu her zaman en iyi optimizasyon stratejisidir. Bununla birlikte, iyi yerlestirilmis bir resim bin kelimeden daha fazla bilgi aktarabilir; bu nedenle, bu dengeyi bulmak size baglidir.

Daha sonra, istenen sonuçlari daha verimli bir sekilde saglayabilecek bir alternatif teknolojinin olup olmadigini düsünmeniz gerekir:

* **CSS etkileri** (gradyanlar, gölgeler vb.) ve CSS animasyonlari, genellikle bir resim dosyasinin gerektiginden daha az sayida bayt ile her çözünürlükte ve zum düzeyinde her zaman net görünen, çözünürlükten bagimsiz varliklar olusturmak için kullanilabilir.
* **Web yazi tipleri** metin seçme, arama ve yeniden boyutlandirma yetenegini korurken güzel yazi biçimleri kullanilabilmesini saglar. Bu, kullanilabilirlik açisindan önemli bir iyilestirmedir.

Kendinizi bir resim varliginin içine metin kodlarken bulursaniz durun ve yeniden düsünün. Harika tipografi iyi tasarim, marka bilinci olusturma ve okunabilirlik için kritik öneme sahiptir, ancak resim içindeki metin seçilebilir, aranabilir, zum yapilabilir, erisilebilir ve yüksek DPI'ya sahip cihazlar için kolay kullanilabilir degildir. Web yazi tiplerinin kullanilmasi, [kendi optimizasyon ayarlarini](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/) gerektirir, ancak tüm bu endiseleri ele alir ve her zaman daha iyi bir metin görüntüleme seçenegidir.


## Vektör ve Tarama resimler

{% include shared/takeaway.liquid list=page.key-takeaways.vector-raster %}

Bir resmin gerçekte istediginiz etkiyi gerçeklestirmek için en uygun biçim oldugunu belirledikten sonraki kritik seçim, uygun biçimin seçilmesidir:

&nbsp;

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>Vektör</b>
    <img class="center" src="images/vector-zoom.png" alt="Zum yapilmis vektör resim">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>Tarama</b>
    <img src="images/raster-zoom.png" alt="Zum yapilmis tarama resim">
  </div>
</div>

* [Vektör grafikler](http://en.wikipedia.org/wiki/Vector_graphics), bir resmi yansitmak için çizgiler, noktalar ve çokgenler kullanir.
* [Tarama grafikler](http://en.wikipedia.org/wiki/Raster_graphics), bir resmi, dikdörtgen sekilli bir kilavuzun içindeki her bir pikselin tek tek degerlerini kodlayarak yansitir.

Her bir biçimin kendi olumlu ve olumsuz yönleri vardir. Vektör biçimleri, ideal olarak geometrik sekillerden olusan resimler (ör. logolar, metin, simgeler vb.) için uygundur ve her çözünürlük ve zum ayarinda net sonuçlar saglar. Bu, vektör resimleri yüksek çözünürlüklü ekranlar ve degisen boyutlarda görüntülenmesi gereken varliklar için ideal bir biçim yapar.

Bununla birlikte, vektör biçimleri sahne karmasik hale geldiginde (ör. bir fotograf) yetersiz kalir: Tüm sekilleri açiklamak için gereken SVG biçimlendirmesi engelleyici bir sekilde yüksek olabilir ve sonuç yine de `fotograf gerçekliginde` görünmeyebilir. Böyle bir durumda GIF, PNG, JPEG gibi bir tarama resim biçimini veya JPEG-XR ve WebP gibi daha yeni biçimlerden birini kullanmaniz gerekir.

Tarama resimler, çözünürlükten veya zumdan bagimsiz olma gibi hos özelliklere sahip degildir. Bir tarama resmin ölçegini büyüttügünüzde tirtikli ve bulanik grafikler görürsünüz. Sonuç olarak, kullanicilariniza en uygun deneyimi saglamak için bir tarama resmin birden çok sürümünü çesitli çözünürlüklerde kaydetmeniz gerekebilir.


## Yüksek çözünürlüklü ekranlarin çikarimlari

{% include shared/takeaway.liquid list=page.key-takeaways.hidpi %}

Resim piksellerinden söz ettigimizde, farkli piksel türlerini birbirinden ayirt etmemiz gerekir: CSS pikselleri ve cihaz pikselleri. Tek bir CSS pikseli birden çok cihaz pikseli içerebilir. Örnegin, tek bir CSS pikseli dogrudan tek bir cihaz pikseline karsilik gelebilir veya birden çok cihaz pikseli tarafindan desteklenebilir. Bunun amaci nedir? Ne kadar çok cihaz pikseli olursa ekranda görüntülenen içerigin ayrintisi da o kadar ince olur.

<img src="images/css-vs-device-pixels.png" class="center" alt="CSS ve cihaz pikselleri">

Yüksek DPI'ya sahip (HiDPI) ekranlar güzel sonuçlar üretir, ancak bunun için açikça bir seyden vazgeçmeleri gerekir: Resim varliklarimizin daha yüksek cihaz pikseli sayisindan yararlanabilmesi için daha ayrintili olmasi gerekir. Iyi haber, vektör resimlerinin bu görev için ideal bir sekilde uygun oldugudur. Her çözünürlükte net sonuçlarla olusturulabilirler. Daha ince ayrintiyi olusturmak için daha yüksek bir isleme maliyeti ödeyebiliriz, ancak temel varlik aynidir ve çözünürlükten bagimsizdir.

Diger yandan, tarama resimler, resim verilerini piksel temelinde kodladiklari için çok daha büyük bir zorluga neden olur. Dolayisiyla, piksel sayisi arttikça, bir tarama resmin dosya boyutu da büyür. Örnek olarak, 100x100 (CSS) pikselde görüntülenen bir fotograf varligi arasindaki farki düsünelim:

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Ekran çözünürlügü</th>
    <th>Toplam piksel sayisi</th>
    <th>Sikistirilmamis dosya boyutu (piksel basina 4 bayt)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="çözünürlük">1x</td>
  <td data-th="toplam piksel sayisi">100 x 100 = 10.000</td>
  <td data-th="dosya boyutu">40.000 bayt</td>
</tr>
<tr>
  <td data-th="çözünürlük">2x</td>
  <td data-th="toplam piksel sayisi">100 x 100 x 4 = 40.000</td>
  <td data-th="dosya boyutu">160.000 bayt</td>
</tr>
<tr>
  <td data-th="çözünürlük">3x</td>
  <td data-th="toplam piksel sayisi">100 x 100 x 9 = 90.000</td>
  <td data-th="dosya boyutu">360.000 bayt</td>
</tr>
</tbody>
</table>

Fiziksel ekranin çözünürlügünü iki katina çikardigimizda, toplam piksel sayisi dört kat artar: yatay piksellerin sayisi iki kat, dikey piksellerin sayisi da iki kat fazla olur. O zaman, `2x` olan bir ekran gereken piksel sayisini iki katina degil, dört katina çikarir!

Bu, uygulamada ne anlama gelir? Yüksek çözünürlüklü ekranlar, güzel resimler sunmamizi saglar ve bu, harika bir ürün özelligi olabilir. Bununla birlikte, yüksek çözünürlüklü ekranlar ayni zamanda yüksek çözünürlüklü resimler gerektirir: Çözünürlükten bagimsiz olduklari ve her zaman net sonuçlar sagladiklari için mümkün oldugunda vektör resimleri tercih edin. Bir tarama resmin kullanilmasi gerekirse her bir resmin birden çok çesidini saglayip optimize edin. Daha ayrintili bilgi için okumaya devam edin.


## Vektör resimleri optimize etme

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

Tüm modern tarayicilar, iki boyutlu grafikler için XML tabanli bir resim biçimi olan Ölçeklenebilir Vektör Grafikleri'ni (SVG) destekler: SVG biçimlendirmesini dogrudan sayfaya yerlestirebilir veya harici bir kaynak olarak saglayabiliriz. Dolayisiyla, bir SVG dosyasi çogu vektör tabanli çizim yazilimiyla veya el ile dogrudan en sevdiginiz metin düzenleyicisinde olusturulabilir.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

Yukaridaki örnek, siyah bir ana hatti ve kirmizi bir arka plani olan basit bir daire sekli olusturur ve bu sekilde Adobe Illustrator'dan disa aktarilmistir. Fark edebileceginiz gibi genellikle varligin tarayicida olusturulmasi için gerekli olmayan katman bilgileri, açiklamalar ve XML ad alanlari gibi çok sayida meta veri içermektedir. Sonuç olarak, [svgo](https://github.com/svg/svgo) gibi bir araç çalistirarak SVG dosyalarinizi küçültmeniz her zaman iyi bir fikirdir.

Tipik bir örnek olarak svgo, Illustrator tarafindan olusturulan yukaridaki SVG dosyasinin boyutunu %58 oraninda küçülterek 470 bayttan 199 bayta düsürür. Bunun yani sira, SVG XML tabanli bir biçim oldugundan aktarim boyutunu küçültmek için GZIP sikistirmasini da uygulayabiliriz. Sunucunuzun SVG varliklarini sikistiracak sekilde yapilandirildigindan emin olun!


## Tarama resimleri optimize etme

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

Bir tarama resim, bagimsiz `piksel`lerden olusan 2 boyutlu bir kilavuzdur. Örnegin, 100x100 piksellik bir resim, 10.000 piksellik bir siradir. Bununla birlikte, her bir piksel "[RGBA](http://en.wikipedia.org/wiki/RGBA_color_space)" degerlerini saklar: (R) kirmizi kanal, (G) yesil kanal, (B) mavi kanal ve (A) alfa (seffaflik) kanali.

Dahili olarak, tarayici her bir kanal için 256 deger (gölgeler) ayirir. Bu da kanal basina 8 bit (2 ^ 8 = 256) ve piksel basina 4 bayta (4 kanal x 8 bit = 32 bit = 4 bayt) karsilik gelir. Sonuç olarak, kilavuzun boyutlarini bilirsek dosya boyutunu kolayca hesaplayabiliriz:

* 100 x 100 piksellik resim 10.000 pikselden olusur
* 10.000 piksel x 4 bayt = 40.000 bayt
* 40.000 bayt / 1024 = 39 KB

^

{% include shared/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Boyutlar</th>
    <th>Piksel sayisi</th>
    <th>Dosya boyutu</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="boyutlar">100 x 100</td>
  <td data-th="piksel sayisi">10.000</td>
  <td data-th="dosya boyutu">39 KB</td>
</tr>
<tr>
  <td data-th="boyutlar">200 x 200</td>
  <td data-th="piksel sayisi">40.000</td>
  <td data-th="dosya boyutu">156 KB</td>
</tr>
<tr>
  <td data-th="boyutlar">300 x 300</td>
  <td data-th="piksel sayisi">90.000</td>
  <td data-th="dosya boyutu">351 KB</td>
</tr>
<tr>
  <td data-th="boyutlar">500 x 500</td>
  <td data-th="piksel sayisi">250.000</td>
  <td data-th="dosya boyutu">977 KB</td>
</tr>
<tr>
  <td data-th="boyutlar">800 x 800</td>
  <td data-th="piksel sayisi">640.000</td>
  <td data-th="dosya boyutu">2500 KB</td>
</tr>
</tbody>
</table>

100x100 piksellik bir resim için 39 KB büyük bir sorun gibi görünmeyebilir, ancak daha büyük resimlerde dosya boyutu hizla patlar ve resim varliklarini indirilmesi yavas ve pahali ögeler haline getirir. Neyse ki, simdiye kadar `sikistirilmamis` resim biçimini açikladik. Resim dosyasinin boyutunu küçültmek için ne yapabiliriz?

Bir basit strateji, resmin 'bit derinligi'ni kanal basina 8 bitten daha küçük bir renk paletine düsürmektir: Kanal basina 8 bit bize kanal basina 256 deger ve toplamda 16.777.216 (2563) renk verir. Paleti 256 renge düsürseydik ne olurdu? O zaman RGB kanallari için toplamda yalnizca 8 bite ihtiyacimiz olurdu ve hemen piksel basina iki bayt tasarruf ederdik. Bu, orijinal piksel basina 4 bayt biçimimize göre %50 sikistirma tasarrufuna karsilik gelir!

<img src="images/artifacts.png" class="center" alt="Sikistirma yapay nesneleri">

{% include shared/remember.liquid title="Note" list=page.notes.artifacts %}

Bagimsiz piksellerde saklanan verileri optimize ettikten sonra, daha akilli olabilir ve yakindaki piksellere de bakabilirdik: Görünüse göre birçok resmin, özellikle de fotograflarin benzer renklere sahip birçok yakin pikseli var (ör. gökyüzü, tekrar eden dokular vb.). Sikistirici, bu bilgileri avantajimiza kullanarak '[delta kodlamasini](http://en.wikipedia.org/wiki/Delta_encoding)' uygulayabilir. Bu durumda, her bir pikselin bagimsiz degerlerini saklamak yerine yakindaki pikseller arasindaki farki saklayabiliriz: Bitisik pikseller ayniysa delta 'sifir' olur ve yalnizca tek bir biti saklamamiz gerekir! Peki ama neden orada duralim?

Insan gözü farkli renklere karsi farkli hassasliktadir: Paleti bu renkler için düsürerek veya yükselterek bunu hesaba katabilir ve renk kodlamamizi optimize edebiliriz.
'Yakindaki' pikseller, iki boyutlu bir kilavuz olusturur. Bu, her bir pikselin birden çok komsusu oldugu anlamina gelir: Delta kodlamasini daha da iyilestirmek için bu gerçegi kullanabiliriz.
Her bir pikselin yalnizca bitisigindeki komsularina bakmak yerine, yakindaki piksellerden olusan daha genis bloklara bakabilir ve farkli bloklari farkli ayarlarla kodlayabiliriz. Ve bu böyle devam eder...

Gördügünüz üzere, resim optimizasyonu hizla karmasiklasir (veya bakis açiniza göre eglenceli bir hal alir) ve akademik ve ticari arastirmalarin aktif bir alanidir. Resimler çok fazla bayt kullanir ve daha iyi resim sikistirma teknikleri gelistirme çok deger saglar! Daha fazla bilgi edinmeye merakliysaniz [Wikipedia sayfasina](http://en.wikipedia.org/wiki/Image_compression) gidin veya uygulamali bir örnek için [WebP sikistirma teknikleri tanitim yazisina](https://developers.google.com/speed/webp/docs/compression) göz atin.

Bir kez daha, bunlarin hesap harika, ama ayni zamanda çok akademik: Bu, sayfalarimizdaki resimleri optimize etmemize nasil yardimci olur? Kesinlikle yeni sikistirma teknikleri bulacak bir konumda degiliz, ancak sorunun seklini anlamamiz önem tasiyor: RGBA pikselleri, bit derinligi ve çesitli optimizasyon teknikleri. Tüm bu kavramlari, çesitli tarama resim biçimleriyle ilgili tartismalara dalmadan önce anlamamiz ve aklimizda bulundurmamiz çok önemlidir.


## Kayipsiz ve kayipli resim sikistirma

{% include shared/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

Bir sayfanin kaynak kodu veya bir yürütülebilir dosya gibi belirli veri türleri için bir sikistiricinin orijinal bilgileri degistirmemesi veya kaybetmemesi kritik öneme sahiptir: Tek bir eksik veya yanlis veri biti, dosya içeriginin anlamini tamamiyla degistirebilir veya daha kötüsü, tümüyle bozabilir. Resimler, ses ve video gibi diger bazi veri türleri için orijinal verilerin bir 'yaklasik' yansimasinin saglanmasi mükemmel bir sekilde kabul edilebilir.

Aslinda, gözün çalisma seklinden dolayi, bir resmin dosya boyutunu küçültmek için her bir pikselle ilgili bazi bilgilerin atilmasi sik sik yanimiza kâr kalir. Örnegin, gözlerimizin farkli renklere karsi hassasiyeti farklidir ve bu, bazi renkleri kodlamak için daha az sayida bit kullanabilecegimiz anlamina gelir. Sonuç olarak, tipik bir resim optimizasyonu ardisik düzeni iki üst düzey adimdan olusur:

1. Resim, bazi piksel verilerini çikaran '[kayipli](http://en.wikipedia.org/wiki/Lossy_compression)' bir filtreyle islenir
1. Resim, piksel verilerini sikistiran '[kayipsiz](http://en.wikipedia.org/wiki/Lossless_compression)' bir filtreyle islenir

**Ilk adim istege baglidir ve kesin algoritma ilgili resim biçimine bagli olur, ancak herhangi bir resmin, boyutunun küçültülmesi için kayipli bir sikistirma adimindan geçirilebileceginin anlasilmasi önemlidir.** Aslinda GIF, PNG, JPEG ve digerleri gibi çesitli resim biçimleri arasindaki fark, kayipli ve kayipsiz adimlar uygulanirken kullandiklari belirli algoritmalarin birlestirilmesindedir (veya atilmasindadir).

Dolayisiyla, kayipli ve kayipsiz optimizasyonun 'en iyi' yapilandirmasi nedir? Yanit, resim içerigine ve kayipli sikistirmanin getirdigi dosya boyutu ile yapay nesneler arasindaki degis tokus gibi ölçütlerinize baglidir: Bazi durumlarda, karisik ayrintilari tam dogrulukta iletmek için kayipli optimizasyonu atlamak isteyebilirsiniz; diger durumlardaysa resim varliginin dosya boyutunu azaltmak için agresif bir kayipli optimizasyon uygulayabilirsiniz. Burada sizin karariniz ve baglaminiz devreye girmelidir. Tek bir evrensel ayar yoktur.

<img src="images/save-for-web.png" class="center" alt="Web için kaydetme">

Uygulamali örnek olarak, JPEG gibi kayipli bir biçimi kullanirken sikistirici genellikle özellestirilebilir `kalite` ayarini açar (ör. Adobe Photoshop'taki 'Web için Kaydet' islevinin sagladigi kalite kaydirma çubugu). Bu genellikle kayipli ve kayipsiz algoritmalarin belirli bir koleksiyonunun iç çalismalarini kontrol eden 1 ile 100 arasinda bir sayi olur. En iyi sonuçlar için resimlerinizi çesitli kalite ayarlariyla deneyin ve kaliteyi düsürmekten korkmayin. Görsel sonuçlar genellikle çok iyi olur ve dosya boyutu tasarruflari oldukça büyük olabilir.

{% include shared/remember.liquid title="Note" list=page.notes.quality %}


## Dogru resim biçimini seçme

{% include shared/takeaway.liquid list=page.key-takeaways.formats %}

Farkli kayipli ve kayipsiz sikistirma algoritmalarina ek olarak, farkli resim biçimleri animasyon ve seffaflik (alfa) kanallari gibi farkli özellikleri destekler. Sonuç olarak, belirli bir resme iliskin `dogru biçim` seçimi, istediginiz görsel sonuçlar ile islevsel gereksinimlerin bir birlesimidir.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Biçim</th>
    <th>Seffaflik</th>
    <th>Animasyon</th>
    <th>Tarayici</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="biçim"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="seffaflik">Evet</td>
  <td data-th="animasyon">Evet</td>
  <td data-th="tarayici">Tümü</td>
</tr>
<tr>
  <td data-th="biçim"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="seffaflik">Evet</td>
  <td data-th="animasyon">Hayir</td>
  <td data-th="tarayici">Tümü</td>
</tr>
<tr>
  <td data-th="biçim"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="seffaflik">Hayir</td>
  <td data-th="animasyon">Hayir</td>
  <td data-th="tarayici">Tümü</td>
</tr>
<tr>
  <td data-th="biçim"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="seffaflik">Evet</td>
  <td data-th="animasyon">Evet</td>
  <td data-th="tarayici">IE</td>
</tr>
<tr>
  <td data-th="biçim"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="seffaflik">Evet</td>
  <td data-th="animasyon">Evet</td>
  <td data-th="tarayici">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Evrensel olarak desteklenen üç resim biçimi vardir: GIF, PNG ve JPEG. Bu biçimlere ek olarak, bazi tarayicilar WebP ve JPEG XR gibi yeni biçimleri de destekler. Bu biçimler, daha iyi bir genel sikistirma ve daha fazla özellik sunar. Hangi biçimi kullanmaliyim?

<img src="images/format-tree.png" class="center" alt="Web için kaydetme">

1. **Animasyona ihtiyaciniz var mi? Varsa GIF tek evrensel seçenektir.**
  * GIF, renk paletini en fazla 256 renkle sinirlandirarak çogu resim için kötü bir seçenek haline gelir. Bununla birlikte, PNG-8 küçük bir paletle resimler için daha iyi sikistirma saglar. Sonuç olarak, GIF yalnizca animasyon gerektiginde dogru yanittir.
1. **Ince ayrintiyi en yüksek çözünürlükle korumaniz gerekiyor mu? PNG'yi kullanin.**
  * PNG, renk paleti boyutu seçimi disinda herhangi bir kayipli sikistirma algoritmasi uygulamaz. Sonuç olarak, en yüksek kaliteli resmi olusturur, ancak bu, diger biçimlerden önemli ölçüde daha büyük bir dosya boyutuna mal olur. Akillica kullanin.
  * Resim varligi geometrik sekillerden olusan resimler içeriyorsa resmi bir vektör (SVG) biçimine dönüstürmeyi düsünebilirsiniz!
  * Resim varligi metin içeriyorsa durun ve yeniden düsünün. Resimlerin içindeki metin seçilebilir, aranabilir veya `zum yapilabilir` olmaz. Bir özel görünümü (marka bilinci olusturma veya baska nedenlerle) aktarmaniz gerekiyorsa bunun yerine bir web yazi tipi kullanin.
1. **Bir fotografi, ekran görüntüsünü veya benzer bir resim varligini mi optimize ediyorsunuz? JPEG kullanin.**
  * JPEG, resim varliginin dosya boyutunu azaltmak için kayipli ve kayipsiz optimizasyonun bir birlesimini kullanir. Varliginiz için en iyi kalite ile dosya boyutu degis tokusunu bulmak için çesitli JPEG kalite düzeylerini deneyin.

Son olarak, en uygun resim biçimini ve varliklarinizin her biri için ayarlarini belirledikten sonra, WebP ve JPEG XR olarak kodlanmis bir ek varyantini eklemeyi düsünebilirsiniz. Bu biçimlerin her ikisi de yeni ve ne yazik ki (henüz) tüm tarayicilar tarafindan evrensel bir sekilde desteklenmiyorlar, ancak yine de yeni istemciler için önemli tasarruflar saglayabilirler. Örnegin, WebP benzer bir JPEG resmine göre ortalama olarak [%30 dosya boyutu küçülmesi](https://developers.google.com/speed/webp/docs/webp_study) saglar.

WebP ve JPEG XR evrensel olarak desteklenmediginden, uygun kaynagi sunmak için uygulamaniza veya sunuculariniza ek mantik eklemeniz gerekir:

* Bazi CDN'ler, JPEG XR ve WebP teslimini de içeren resim optimizasyonunu hizmet olarak saglar.
* Bazi açik kaynak araçlari (ör. Apache için PageSpeed veya Nginx) uygun varliklarin optimizasyonunu, dönüstürülmesini ve sunumunu otomatiklestirir.
* Istemciyi algilamak, hangi biçimleri desteklediklerini kontrol etmek ve kullanilabilir en iyi resim biçimini sunmak için ek uygulama mantigi ekleyebilirsiniz.

Son olarak, yerel uygulamanizda içerik olusturmak için bir Webview kullaniyorsaniz, istemci üzerinde tam denetime sahip olacaginizi ve özel olarak WebP'yi kullanabileceginizi unutmayin! Facebook, Google+ ve diger birçok site, tüm resimlerini uygulamalari içinde saglamak için WebP'yi kullanir. Bunun sagladigi tasarruf kesinlikle buna deger. WebP hakkinda daha fazla bilgi edinmek için Google I/O 2013'teki [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) baslikli sunuma göz atin.


## Araçlar ve parametre ayari

Tek bir mükemmel resim biçimi, araç veya tüm resimler için geçerli bir optimizasyon parametreleri kümesi yoktur. En iyi sonuçlar için biçimi ve ayarlarini resmin içerigi ile görsel ve diger teknik gereksinimlerine göre sizin seçmeniz gerekir.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Araç</th>
    <th>Açiklama</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="araç"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="açiklama">GIF resimlerini olusturur ve optimize eder</td>
</tr>
<tr>
  <td data-th="araç"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="açiklama">JPEG resimlerini optimize eder</td>
</tr>
<tr>
  <td data-th="araç"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="açiklama">kayipsiz PNG optimizasyonu</td>
</tr>
<tr>
  <td data-th="araç"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="açiklama">kayipli PNG optimizasyonu</td>
</tr>
</tbody>
</table>


Her bir sikistiricinin parametreleriyle deneyler yapmaktan korkmayin. Kaliteyi düsürün, nasil göründügüne bakin, sonra durulayin, köpürtün ve tekrar edin. Iyi bir ayar kümesi bulduktan sonra, bunlari sitenizdeki diger benzer resimlere uygulayabilirsiniz, ancak tüm resimlerin ayni ayarlarla sikistirilmasi gerektigini düsünmeyin.


## Ölçeklenmis resim varliklari saglama

{% include shared/takeaway.liquid list=page.key-takeaways.scaled-images %}

Resim optimizasyonu iki ölçüte indirgenebilir: her bir resim pikselini kodlamak için kullanilan bayt sayisini optimize etme ve toplam piksel sayisini optimize etme: Resmin dosya boyutu basit bir sekilde toplam piksel sayisinin, her bir pikseli kodlamak için kullanilan bayt sayisiyla çarpimidir. Ne bundan fazla, ne de eksik.

Sonuç olarak, en basit ve en etkili resim optimizasyon tekniklerinden biri, varligi tarayicida istenen boyutunda görüntülemek için gerekenden daha fazla piksel göndermedigimizden emin olmaktir. Basit görünüyor, degil mi? Maalesef çogu sayfada resim varliklarinin birçogu bu testte basarisiz olur: Genellikle, daha büyük varliklar gönderip bunlari yeniden ölçeklemesi ve daha düsük bir çözünürlükte görüntülemesi için tarayiciya güvenirler. Bu da fazladan CPU kaynagi tüketir.

<img src="images/resized-image.png" class="center" alt="Yeniden boyutlandirilmis resim">

{% include shared/remember.liquid title="Note" list=page.notes.resized %}

Yalnizca resmi bizim adimiza tarayicinin yeniden ölçeklemesini saglamak adina gereksiz piksellerin gönderilmesinin getirdigi ek yük, sayfayi olusturmak için gereken toplam bayt sayisini azaltmak ve optimize etmek için büyük bir firsatin kaçmasidir. Bununla birlikte, yeniden boyutlandirma islevinin yalnizca resmin küçültüldügü piksel sayisiyla ilgili olmadigini, ayni zamanda dogal boyutunun küçültülmesiyle de ilgili oldugunu unutmayin.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Dogal boyut</th>
    <th>Ekran boyutu</th>
    <th>Gereksiz piksel sayisi</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dogal">110 x 110</td>
  <td data-th="ekran">100 x 100</td>
  <td data-th="ek yük">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="dogal">410 x 410</td>
  <td data-th="ekran">400 x 400</td>
  <td data-th="ek yük">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="dogal">810 x 810</td>
  <td data-th="ekran">800 x 800</td>
  <td data-th="ek yük">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

Yukaridaki üç örnekte de ekran boyutunun resmin dogal boyutundan `yalnizca 10 piksel daha küçük` oldugunu unutmayin. Bununla birlikte, kodlamamiz ve göndermemiz gereken fazladan piksel sayisi, dogal boyuttan önemli ölçüde daha yüksektir! Sonuç olarak, her bir varligin tam olarak ekran boyutunda saglanmasini garanti edemezsiniz, ancak **gereksiz piksel sayisinin en alt düzeyde tutuldugundan ve özellikle büyük varliklarinizin ekran boyutlarina mümkün oldugunca yakin bir sekilde saglandigindan emin olmaniz gerekir.**

## Resim optimizasyonu kontrol listesi

Resim optimizasyonu hem bir sanat hem de bilimdir: Tek bir resmin en iyi nasil sikistirilacagina dair tek bir tanimlayici yanit olmadigindan bir sanattir; bununla birlikte bir resmin boyutunu önemli ölçüde küçültmeye yardimci olabilecek iyi gelistirilmis birçok teknik ve algoritma olmasindan dolayi bir bilimdir.

Resimlerinizi optimize etme üzerinde çalisirken aklinizda bulundurmaniz gereken bazi ipuçlari ve teknikler:

* **Vektör biçimlerini tercih edin:** Vektör resimler çözünürlükten ve ölçekten bagimsizdir. Bu özellikleri, vektör biçimlerini çoklu cihaz ve yüksek çözünürlük dünyasi ile mükemmel bir sekilde uyumlu hale getirir.
* **SVG varliklarini küçültün ve sikistirin:** Çogu çizim uygulamasi tarafindan olusturulan XML biçimlendirmesi, genellikle kaldirilabilecek gereksiz meta veriler içerir; sunucularinizin SVG varliklari için GZIP sikistirmasi uygulayacak sekilde yapilandirildigindan emin olun.
* **En iyi tarama resim biçimini seçin:** Islevsel gereksinimlerinizi belirleyin ve ilgili her bir varliga uygun olan biçimi seçin.
* **Tarama biçimleri için en uygun kalite ayarlariyla deneyler yapin:** 'Kalite' ayarlarini düsürmekten korkmayin, sonuçlar genellikle çok iyi olur ve önemli ölçüde bayt tasarrufu saglanir.
* **Gereksiz resim meta verilerini kaldirin:** Birçok tarama resmi varlikla ilgili gereksiz meta veriler içerir: Cografya bilgileri, kamera bilgileri vb. Bu verileri çikarmak için uygun araçlari kullanin.
* **Ölçeklenmis resimler sunun:** Resimleri sunucuda yeniden boyutlandirin ve 'ekran' boyutunun, resmin `dogal` boyutuna mümkün oldugunca yakin oldugundan emin olun. Büyük resimler yeniden boyutlandirildiklarinda en büyük ek yükten sorumlu oldugu için özellikle büyük resimlere dikkat edin!
* **Otomatiklestirin, otomatiklestirin, otomatiklestirin:** Tüm resim varliklarinizin her zaman optimize edilmis olmasini saglayacak otomatik araçlara ve altyapiya yatirim yapin.




