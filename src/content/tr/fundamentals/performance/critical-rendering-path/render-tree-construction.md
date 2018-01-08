project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSSOM ve DOM agaçlari, bir olusturma agacinda birlestirilir. Bu agaç daha sonra, görünür her bir ögenin yer paylasimini hesaplamak için kullanilir ve ekranda pikselleri olusturan boyama isleminde giris görevi görür. Bu adimlarin her birinin optimize edilmesi, en iyi olusturma performansinin gerçeklestirilmesi açisindan kritik öneme sahiptir.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Olusturma agaci yapimi, Yer paylasimi ve Boyama {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


CSSOM ve DOM agaçlari, bir olusturma agacinda birlestirilir. Bu agaç daha sonra, görünür her bir ögenin yer paylasimini hesaplamak için kullanilir ve ekranda pikselleri olusturan boyama isleminde giris görevi görür. Bu adimlarin her birinin optimize edilmesi, en iyi olusturma performansinin gerçeklestirilmesi açisindan kritik öneme sahiptir.


Nesne modelinin olusturulmasina iliskin önceki bölümde, HTML ve CSS girislerine dayanarak DOM ve CSSOM agaçlari olusturmustuk. Bununla birlikte, bunlarin her ikisi de dokümanin farkli unsurlarini yakalayan bagimsiz nesnelerdir: Biri, içerigi açiklarken digeri, dokümana uygulanmasi gereken stil kurallarini açiklar. Ikisini nasil birlestiririz ve ekranda pikselleri olusturmak için tarayiciya aliriz?

### TL;DR {: .hide-from-toc }
- DOM ve CSSOM agaçlari, olusturma agacini olusturmak üzere birlestirilir.
- Olusturma agaci yalnizca sayfanin olusturulmasi için gereken dügümleri içerir.
- Yer paylasimi, her bir nesnenin tam konumunu ve boyutunu hesaplar.
- Boyama, son olusturma agacini alan ve ekran için pikselleri olusturan son adimdir.


Ilk adim, tarayicinin DOM ve CSSOM'yi, sayfadaki tüm görünür DOM içerigini ve her bir dügüme iliskin CSSOM stil bilgilerinin tümünü yakalayan bir 'olusturma agaci'nda birlestirmesi içindir.

<img src="images/render-tree-construction.png" alt="DOM ve CSSOM, olusturma agacini olusturmak üzere birlestirilir" class="center">

Olusturma agacini olusturmak için tarayici kabaca asagidakileri yapar:

1. DOM agacinin kökünde baslayarak görünür her bir dügümün üstünden geçer.
  * Bazi dügümler hiç görünür degildir (ör. script etiketleri, meta etiketleri vb.) ve olusturulan çiktida bunlar yansitilmayacagi için atlanirlar.
  * Bazi dügümler CSS araciligiyla gizlenir ve olusturma agacindan da atlanir. Örnegin, yukaridaki örnekte bulunan span dügümü, `display: none` özelligini ayarlayan açik bir kuralimiz oldugundan olusturma agacinda yoktur.
1. Görünür her bir dügüm için eslesen uygun CSSOM kurallarini bulun ve bunlari uygulayin.
2. Görünür dügümleri, içerik ve hesaplanan stilleriyle yayinlayin.

Note: Kisa bir not olarak, `visibility: hidden` degerinin `display: none` degerinden farkli oldugunu unutmayin. Ilki ögeyi görünmez yapar, ancak öge yer paylasiminda alan kaplamaya devam eder (bos kutu olarak olusturulur), buna karsilik ikincisi (display: none) ögeyi, öge görünmezmis ve yer paylasiminin bir parçasi degilmis gibi olusturma agacindan tamamiyla çikarir.

Son çikti, hem içerigi hem de ekranda görünen tüm içerigin stil bilgilerini içeren bir olusturmadir. Yaklasiyoruz!  **Olusturma agaci tamamlandiginda, 'yer paylasimi' asamasina geçebiliriz.**

Bu noktaya kadar, hangi dügümlerin görünür olmasi gerektigini ve bunlarin hesaplanan stillerini hesapladik, ancak cihazin [görüntü alani](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) içindeki tam konumlarini ve boyutlarini hesaplamadik. Bu, 'yer paylasimi' asamasidir; bazen 'yeniden düzenleme' olarak da bilinir.

Her bir nesnenin kesin boyutunu ve konumunu belirlemek için tarayici, olusturma agacinin kökünden baslar ve sayfadaki her bir nesnenin geometrisini hesaplamak için üzerinden geçer. Basit bir uygulama örnegini degerlendirelim:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Yukaridaki sayfanin gövdesi iç içe yerlestirilmis iki div ögesi içerir: Ilk (üst) div ögesi, dügümün görüntü boyutunu görüntü alani genisliginin %50'sine ve üst ögenin içerdigi ikinci div ögesi, genisligini üst ögenin %50'sine (görüntü alani genisliginin %25'ine) ayarlar!

<img src="images/layout-viewport.png" alt="Yer paylasimi bilgilerini hesaplama" class="center">

Yer paylasimi sürecinin sonucu, görüntü alani içindeki her bir ögenin kesin konumunu ve boyutunu tam olarak yakalayan bir 'kutu model'dir: Göreli ölçülerin tümü, ekranda mutlak piksel konumlarina dönüstürülmüs ve diger islemler yapilmistir.

Son olarak, artik hangi dügümlerin görünür olduklarini, bunlarin hesaplanan stillerini ve geometrilerini bildigimize göre, sonunda bu bilgileri son asamamiza geçirebiliriz. Bu asamada, olusturma agacindaki her bir dügümü ekranda gerçek piksellere dönüstürecegiz. Bu adima genellikle `boyama` veya `tarama` adi verilir.

Tüm bunlari takip edebildiniz mi? Bu adimlarin her biri, tarayici tarafindan azimsanmayacak miktarda is yapilmasini gerektirir. Bu, tüm bunlarin genellikle biraz zaman alabilecegi anlamina da gelir. Neyse ki, Chrome DevTools yukarida asamalarin üçünün de bazi analizlerini almamiza yardimci olabilir. Orijinal `herkese merhaba` örnegimizin yer paylasimi asamasini inceleyelim:

<img src="images/layout-timeline.png" alt="DevTools'ta yer paylasimini ölçme" class="center">

* Olusturma agaci yapimi ile konum ve boyut hesaplamasi, Zaman Çizelgesi'nde 'Yer Paylasimi' olayi ile yakalanir.
* Yer paylasimi tamamlandiktan sonra, tarayici birer 'Boyama Ayarlari' ve 'Boyama' olayi yayinlar. Bunlar, olusturma agacini ekranda gerçek piksellere dönüstürür.

Olusturma agaci yapimi, yer paylasimi ve boyama islemlerini gerçeklestirmek için gereken süre dokümanin boyutuna, uygulanan stillere ve elbette, üzerinde çalistirildigi cihaza bagli olarak degisiklik gösterir: Doküman ne kadar büyükse tarayicinin yapmasi gereken is de o kadar fazla olur; stiller karmasiklastikça boyama için harcanan süre de uzar (ör. mat bir rengi boyamasi 'ucuz'dur ve bir kabarti gölgesinin hesaplanmasi ve olusturulmasi 'pahali'dir).

Sonunda, sayfamiz görüntü alaninda görünür hale geldi. Yasasin!

<img src="images/device-dom-small.png" alt="Olusturulan Herkese Merhaba sayfasi" class="center">

Tarayicinin gerçeklestirdigi tüm adimlari hizlica özetleyelim:

1. HTML biçimlendirmesini isleme ve DOM agacini olusturma.
2. CSS biçimlendirmesini isleme ve CSSOM agacini olusturma.
3. DOM ve CSSOM'yi bir olusturma agacinda birlestirme.
4. Her bir dügüm geometrisini hesaplamak için olusturma agacinda yer paylasimini çalistirma.
5. Ekran için bagimsiz dügümleri boyama.

Demo sayfamiz çok basit görünebilir, ancak oldukça çalisma gerektiriyor! DOM veya CSSOM degistirilseydi ne olacagini tahmin edebilir misiniz? Ekranda hangi piksellerin yeniden olusturulmasinin gerektigini belirlemek için ayni süreci bastan tekrar etmemiz gerekirdi.

**Kritik olusturma yolunu optimize etme, yukaridaki sirada 1. ile 5. adim arasindaki adimlarda harcanan toplam süreyi en aza indirme sürecidir.** Bunu yapmamiz içerigi ekran için mümkün olan en kisa zamanda olusturabilmemizi saglar ve ayrica, ilk olusturma sonrasinda ekran güncellemeleri arasindaki süreyi azaltir (etkilesimli içerik için daha yüksek yenileme hizi gerçeklestirmemizi saglar).



