---
title: "Kritik Olusturma Yolu Performansini Analiz Etme"
description: "Kritik olusturma yolu performans tikanikliklarinin tanimlanmasi ve çözülmesi, yaygin görülen güçlüklerle ilgili iyi bilgi sahibi olunmasini gerektirir. Simdi baslangiç turumuzu gerçeklestirelim ve sayfalarinizi optimize etmenize yardimci olacak, yaygin görülen performans kaliplarini çikartalim."
updated_on: 2014-04-28
---
<p class="intro">
  Kritik olusturma yolu performans tikanikliklarinin tanimlanmasi ve çözülmesi, yaygin görülen güçlüklerle ilgili iyi bilgi sahibi olunmasini gerektirir. Simdi baslangiç turumuzu gerçeklestirelim ve sayfalarinizi optimize etmenize yardimci olacak, yaygin görülen performans kaliplarini çikartalim.
</p>


{% include shared/toc.liquid %}

Kritik olusturma yolunu optimize etmenin amaci, tarayicinin sayfayi mümkün oldugunca hizli bir sekilde boyamasina olanak tanimaktir: Sayfalarin hizli olmasi, etkilesim ve görüntülenen sayfa sayisinin daha fazla olmasi ve [dönüsümün iyilestirilmesi](http://www.google.com/think/multiscreen/success.html) anlamina gelir. Sonuç olarak, hangi kaynaklarin ne sirada yüklendigini optimize ederek ziyaretçinin bos bir ekrana bakarak geçirdigi süreyi en aza indirmek isteriz.

Bu süreci göstermeye yardimci olmasi açisindan, olabilecek en basit örnekle baslayalim ve ek kaynaklari, stilleri ve uygulama mantigini ekleyerek sayfamizi kademeli bir sekilde olusturalim. Süreç içinde, islerin nerelerde yanlis gidebilecegini ve bu örneklerin her birini nasil optimize edebilecegimizi de görecegiz.

Son olarak, baslamadan önce son bir noktayi belirtmek istiyoruz... Simdiye kadar, özellikle kaynak (CSS; JS veya HTML dosyasi) islenmek için hazir olduktan sonra tarayicida neler olduguna odaklanmis ve kaynagin önbellekten veya agdan getirilmesi için gereken süreyi göz ardi etmistik. Bir sonraki derse uygulamamizin ag iletisimi unsurlarini nasil optimize edecegimizi ayrintili olarak görecegiz, ancak bu arada (yaptiklarimizi daha gerçekçi kilmak için) asagidaki kosullarin saglandigini varsayacagiz:

* Sunucuya ag gidis gelisi (yayilma gecikmesi) 100 ms olacaktir
* Sunucu yanit süresi, HTML dokümani için 100 ms ve diger tüm dosyalar için 10 ms olacaktir

## Herkese Merhaba deneyimi

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Mümkün olan en basit örnek olmasi için temel HTML biçimlendirmesi ve tek bir resimle baslayacagiz, CSS veya JavaScript olmayacak. Simdi, Chrome DevTools'ta Ag zaman çizelgemizi açip kaynak selalemizi inceleyim:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

Beklendigi gibi HTML dosyasinin indirilmesi yaklasik 200 ms sürdü. Mavi çizginin seffaf kisminin, tarayicinin agda bekledigi (hiç yanit baytinin alinmadigi) süreyi, mat kisminin da ilk yanit baytlari alindiktan sonra indirme islemini bitirmek için geçen süreyi gösterdigini unutmayin. Yukaridaki örnegimizde, HTML indirme islemi küçük (<4K) oldugundan tüm ihtiyacimiz olan tam dosyayi getirmek için tek bir gidis gelisti. Sonuç olarak, HTML dokümaninin getirilmesi yaklasik 200 ms sürdü. Bu sürenin yarisi agda bekleyerek, diger yarisi da sunucu yanitiyla geçti.

HTML içerigi kullanilabilir hale geldikten sonra, tarayicinin baytlari ayristirmasi, belirteçlere dönüstürmesi ve DOM agacini olusturmasi gerekir. DevTools'un, DOMContentLoaded olayi için geçen süreyi kullanisli bir sekilde alt kisimda bildirdigine (216 ms), bunun da mavi dikey çizgiye karsilik geldigine dikkat edin. HTML indirme isleminin sonu ile mavi dikey çizgi (DOMContentLoaded) arasindaki bosluk, tarayicinin DOM agacini olusturdugu süredir. Bu örnekte, bu süre yalnizca birkaç milisaniyedir.

Son olarak, ilginç bir seye dikkat edin: `Harika fotografimiz` domContentLoaded olayini engellemedi! Görünüse göre, sayfadaki her ögeyi beklemeden olusturma agacini yapabilir, hatta sayfayi boyayabiliriz: **Tüm kaynaklar ilk hizli boyanin saglanmasi açisindan önemli degildir**. Aslinda, ileride görecegimiz gibi, kritik olusturma yolundan söz ederken genellikle HTML biçimlendirmesi, CSS ve JavaScript'ten konusuyoruz. Resimler, sayfanin ilk olusturmasini engellemez. Elbette, resimlerin de mümkün oldugunca hizli boyanmalarini saglamayi da denemeliyiz!

Bununla birlikte, `yükleme` olayi (`onload` olarak da bilinir) resimde engellenmistir: DevTools, onload olayini 335 ms olarak bildirir. Onload olayinin, sayfanin gerektirdigi **tüm kaynaklarin** indirilip islendigi noktayi isaret ettigini unutmayin. Bu, tarayicidaki yükleme deger degistiricisinin dönmeyi durdurabilecegi noktadir ve bu nokta, selalede kirmizi dikey çizgiyle isaretlenmistir.


## Karisima JavaScript ve CSS ekleme

`Herkese Merhaba deneyimi` sayfamiz, yüzeyde basit görünebilir, ancak bunun olmasini saglamak için sahne arkasinda birçok sey olup bitmektedir! Bununla birlikte, uygulamada yalnizca HTML'den daha fazlasina da ihtiyacimiz olacaktir: Muhtemelen bir CSS stil sayfamiz ve sayfamiza biraz etkilesim eklemek için bir veya daha fazla komut dosyamiz olur. Simdi bunlarin her ikisini de karisimimiza ekleyip neler oldugunu görelim:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_JavaScript ve CSS eklemeden önce:_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_JavaScript ve CSS ile:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Harici CSS ve JavaScript dosyalarinin eklenmesi, selalemize fazladan iki istek ekledi. Bunlarin tümü tarayici tarafindan yaklasik olarak ayni anda gönderildi. Buraya kadar her sey yolunda. Ancak, **simdi domContentLoaded ile onload olaylar arasinda çok daha az bir zamanlama farkinin oldugunu unutmayin. Peki ne oldu?**

* Sade HTML örnegimizden farkli olarak, artik CSSOM'yi yapmak için CSS dosyasini getirip ayristirmamiz da gerekiyor ve olusturma agacini olusturmak için hem DOM'ye hem de CSSOM'ye ihtiyacimiz oldugunu biliyoruz.
* Sayfamizda ayristirici engelleyen bir JavaScript dosyamiz da oldugundan, domContentLoaded olayi CSS dosyasi indirilip ayristirilincaya kadar engellenir: JavaScript, CSSOM'yi sorgulayabilir, dolayisiyla JavaScript'i yürütebilmemiz için bunu engelleyip CSS'yi beklememiz gerekir.

**Harici komut dosyamizi bir satir içi komut dosyasiyla degistirirsek ne olur?** Yüzeyde önemsiz bir soru, ancak aslinda ustalik ve dikkat istiyor. Görünüse göre, komut dosyasi dogrudan sayfada satir içine yerlestirilse bile tarayicinin, bu komut dosyasinin yapmayi amaçladigi seyi bilmesi için en güvenilir yol, komut dosyasini yürütmek olur ve önceden de bildigimiz gibi, CSSOM olusturuluncaya kadar bunu yapamayiz.  Kisacasi, satir içine yerlestirilen JavaScript de ayristiriciyi engeller.

Bununla birlikte, CSS'de engellemeye yol açmasina ragmen komut dosyasinin satir içine yerlestirilmesi sayfanin daha hizli olusturulmasini saglar mi? Son senaryo aldaticiysa, bu daha da aldaticidir! Deneyelim ve neler oldugunu görelim...

_External JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Inlined JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM ve satir içi JS" class="center">

Bir tane daha az istekte bulunuyoruz, ancak onload ve domContentLoaded sürelerimiz etkin bir sekilde ayni, neden? JavaScript'in satir içinde veya harici olmasinin önemli olmadigini, çünkü tarayicinin script etiketiyle karsilasir karsilasmaz CSSOM olusturuluncaya kadar islemi engelleyip bekleyecegini biliyoruz. Bundan baska, ilk örnegimizde, hem CSS hem de JavaScript tarayici tarafindan paralel bir sekilde indiriliyor ve islem yaklasik olarak ayni zamanda bitiyordu. Sonuç olarak, bu örnekte, JavaScript kodunun satir içine yerlestirilmesi bize çok yardimci olmuyor! Hmm, o zaman takildik ve sayfamizin daha hizli olusturulmasi için yapabilecegimiz hiçbir sey yok mu? Aslinda, birkaç farkli stratejimiz var.

Öncelikle, tüm satir içi komut dosyalarinin ayristiriciyi engelledigini, ancak harici komut dosyalarina, ayristiricinin engellemesini kaldirmak için `async` anahtar kelimesini ekleyebildigimizi hatirlayin. Simdi satir içine yerlestirmemizi geri alip bunu bir deneyelim:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_Ayristirici engelleyen (harici) JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Zaman uyumsuz (harici) JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, zaman uyumsuz JS" class="center">

Çok daha iyi! domContentLoaded olayi HTML ayristirildiktan kisa bir süre sonra etkinlesir: Tarayici, JavaScript'i engellemeyecegini bilir ve ayristirici engelleyen baska komut dosyasi olmadigindan CSSOM yapimi da paralel olarak ilerleyebilir.

Alternatif olarak, farkli bir yaklasim deneyip hem CSS'yi hem de JavaScript'i satir içine yerlestirebilirdik:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, satir içi CSS, satir içi JS" class="center">

_domContentLoaded_ süresinin etkili bir sekilde önceki örnekle ayni olduguna dikkat edin: JavaScript'imizi zaman uyumsuz olarak isaretlemek yerine hem CSS'yi hem de JS'yi sayfanin kendisinde satir içine yerlestirdik. Bu, HTML sayfamizi çok daha büyük yapti; ancak olumlu tarafi, tarayicinin harici kaynaklarin getirilmesini beklemesine gerek kalmadi. Her sey dogrudan sayfanin içinde.

Görebileceginiz gibi, çok basit bir sayfayla bile kritik olusturma yolunun optimize edilmesi önemsiz olmayan bir uygulama: Farkli kaynaklar arasindaki bagimlilik grafigini anlamamiz, hangi kaynaklarin `kritik` oldugunu tanimlamamiz ve bu kaynaklari sayfaya nasil ekleyecegimizi belirlemek için farkli stratejiler arasindan seçim yapmamiz gerekiyor. Bu sorunun tek bir çözümü yoktur. Her sayfa digerinden farklidir ve en uygun stratejiyi belirlemek için kendi basiniza benzer bir süreci izlemeniz gerekir.

Bunlarin isiginda, geri çekilip bazi genel performans kaliplarini tanimlayip tanimlayamayacagimizi görelim...


## Performans Kaliplari

Mümkün olan en basit sayfa yalnizca HTML biçimlendirmesinden olusur: CSS, JavaScript veya baska kaynak türlerini içermez. Bu sayfayi olusturmak için tarayicinin istegi baslatmasi, HTML dokümaninin ulasmasini beklemesi, bunu ayristirmasi, DOM'yi olusturmasi ve son olarak, sayfayi ekranda olusturmasi gerekir:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="Herkese merhaba CRP" class="center">

**T<sub>0</sub> ile T<sub>1</sub> arasindaki süre, ag ile sunucu isleme sürelerini yakalar.** En iyi durumda (HTML dosyasi küçükse), tüm ihtiyacimiz olan belgenin tamamini getirmek için yalnizca bir ag gidis gelisidir. TCP aktarim protokollerinin çalisma seklinden dolayi, büyük dosyalar daha fazla gidis gelis gerektirebilir. Bu, ileride göreceginiz baska bir derste geri dönecegimiz bir konudur. **Sonuç olarak, yukaridaki sayfanin en iyi durumda bir gidis gelis (minimum) kritik olusturma yolunun oldugunu söyleyebiliriz.**

Simdi, ayni sayfayi bir harici CSS dosyasiyla düsünelim:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

Bir kez daha, HTML dokümanini getirmek için bir ag gidis gelisi gerçeklestiririz ve daha sonra, alinan biçimlendirme bize CSS dosyasina da ihtiyacimiz oldugunu bildirir: Bu, tarayicinin sayfayi ekranda olusturmadan önce sunucuya geri gitmesi ve CSS'yi almasi gerektigi anlamina gelir. **Sonuç olarak, bu sayfa, sayfanin görüntülenmesinden önce en az iki gidis gelis gerçeklestirir.** Bir kez daha, CSS dosyasinin birden çok gidis gelis gerektirebilecegini belirtelim; burada vurgu `en az` kelimesindedir.

Simdi, kritik olusturma yolunu açiklarken kullanacagimiz terimleri tanimlayalim:

* **Kritik Kaynak:** Sayfanin ilk olusturmasini engelleyebilecek kaynak.
* **Kritik Yol Uzunlugu:** Tüm kritik kaynaklari getirmek için gereken gidis gelis sayisi veya toplam süre.
* **Kritik Baytlar:** Sayfayi ilk kez olusturmak için alinmasi gereken toplam bayt miktari; tüm kritik kaynaklarin aktarim dosyasi boyutlarinin toplamidir.
Tek HTML sayfasi içeren ilk örnegimizde tek bir kritik kaynak (HTML dokümani) bulunuyordu. Kritik yol uzunlugu da 1 ag gidis gelisine esitti (dosyanin küçük oldugu varsayimiyla) ve toplam kritik bayt sayisi, HTML dokümaninin kendisinin aktarim boyutuydu.

Simdi, bunu yukaridaki HTML + CSS örneginin kritik yol özellikleriyle karsilastiralim:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

* **2** kritik kaynak
* En düsük kritik yol uzunlugu için **2** veya daha fazla gidis gelis
* **9** KB kritik bayt

Olusturma agacini olusturmak için hem HTML hem de CSS'ye ihtiyacimiz oldugundan, HTML ve CSS kritik kaynaklardir: CSS yalnizca tarayicinin HTML dokümanini almasindan sonra getirilir, dolayisiyla kritik yol uzunlugu en az iki gidis gelistir; her iki kaynak da toplam 9 KB kritik bayta dahil edilir.

Tamam, simdi karisima fazladan bir JavaScript dosyasi ekleyelim!

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Sayfada harici bir JavaScript varligi olan app.js dosyasini ekledik ve simdiye kadar ögrendigimiz gibi bu ayristirici engelleyen (ör. kritik) bir kaynaktir. Daha da kötüsü, JavaScript dosyasinin yürütülebilmesi için islemi engelleyip CSSOM'yi beklememiz gerekir. JavaScript'in CSSOM'yi sorgulayabildigini, dolayisiyla tarayicinin `style.css` indirilip CSSOM olusturuluncaya kadar bekleyecegini hatirlayin.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" class="center">

Bunlarin isiginda, uygulamada bu sayfanin 'ag selalesi'ne bakarsak CSS ve JavaScript isteklerinin yaklasik olarak ayni zamanda baslatilacagini fark edeceksiniz: Tarayici, HTML'yi alir, her iki kaynagi da kesfeder ve her iki istegi de baslatir. Sonuç olarak, yukaridaki sayfa asagidaki kritik yol özelliklerine sahiptir:

* **3** kritik kaynak
* En düsük kritik yol uzunlugu için **2** veya daha fazla gidis gelis
* **11** KB kritik bayt

Artik toplam 11 KB kritik bayt olan üç kritik kaynagimiz vardir, ancak kritik yol uzunlugumuz hâlâ iki gidis gelistir. Bunun nedeni, CSS ve JavaScript'i paralel bir sekilde aktarabiliyor olmamizdir! **Kritik olusturma yolunun özelliklerinin belirlenmesi, nelerin kritik kaynaklar oldugunu tanimlayabilmek ve tarayicinin, getirme islemlerini nasil planlayacagini anlamak anlamina gelir.** Örnegimizle devam edelim...

Site gelistiricilerimizle sohbet ettikten sonra, JavaScript'i engellenmesi gerekmeyen sayfamiza ekledigimizi fark ettik: Burada, sayfamizin olusturulmasini engellemesi gerekmeyen bazi analizlerimiz ve baska kodlarimiz bulunuyor. Bu bilgiyle, ayristiricinin engellemesini kaldirmak için script etiketine `async` özelligini ekleyebiliriz:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, zaman uyumsuz JavaScript CRP" class="center">

Komut dosyasinin zaman uyumsuz yapilmasi bazi avantajlar saglar:

* Komut dosyasi artik ayristiriciyi engellemez ve kritik olusturma yolunun bir parçasi degildir
* Baska kritik komut dosyasi olmadigindan, CSS'nin de domContentLoaded olayini engellemesi gerekmez
* domContentLoaded olayi ne kadar çabuk etkinlesirse, diger uygulama mantiginin yürütülmesine de o kadar çabuk baslanabilir

Sonuç olarak, optimize edilmis sayfamiz simdi tekrar iki kritik kaynaktir (HTML ve CSS), en düsük kritik yol uzunlugu iki gidis gelistir ve toplam 9 KB kritik bayt içerir.

Son olarak, CSS stil sayfasinin yalnizca yazdirma için gerektigini düsünelim. Nasil görünürdü?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, engelleme olmayan CSS ve zaman uyumsuz JavaScript CRP" class="center">

style.css kaynagi yalnizca yazdirma için kullanildigindan, tarayicinin sayfayi olusturmak için bunu engellemesine gerek yoktur. Dolayisiyla, DOM yapimi tamamlanir tamamlanmaz tarayici sayfayi olusturmak için yeterli bilgiye sahip olur! Sonuç olarak, bu sayfada yalnizca tek bir kritik kaynak (HTML dokümani) vardir ve en düsük kritik olusturma yolu uzunlugu bir gidis gelistir.



