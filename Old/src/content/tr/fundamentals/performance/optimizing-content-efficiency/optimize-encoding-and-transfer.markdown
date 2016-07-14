---
title: "Metin tabanli varliklarin kodlamasini ve aktarim boyutunu optimize etme"
description: "Gereksiz kaynaklari çikardiktan sonraki adim, tarayicinin indirmesi gereken kalan kaynaklarin toplam boyutunu en aza indirmek; diger bir deyisle, bunlara içerik türüne özel ve genel sikistirma (GZip) algoritmalari uygulayarak sikistirmaktir."
updated_on: 2014-09-12
key-takeaways:
  compression-101:
    - "Sikistirma, kodlama bilgilerinin daha az sayida bit kullanilarak islenmesidir"
    - Gereksiz verilerin çikarilmasi her zaman en iyi sonuçlari saglar
    - Birçok farkli sikistirma teknigi ve algoritmasi vardir
    - En iyi sikistirmayi gerçeklestirmek için çesitli teknikleri kullanmaniz gerekecektir
  minification:
    - "Içerige özel optimizasyonlar, teslim edilen kaynaklarin boyutunu önemli ölçüde azaltabilir."
    - "Içerige özel optimizasyonlar, olusturma/yayinlama döngünüzün bir parçasi olduklarinda en iyi sekilde uygulanirlar."
  text-compression:
    - "GZIP, en iyi performansini metin tabanli varliklar üzerinde gösterir: CSS, JavaScript, HTML"
    - Tüm modern tarayicilar GZIP sikistirmasini destekler ve otomatik olarak bunu ister
    - Sunucunuzun GZIP sikistirmasi saglayacak sekilde yapilandirilmasi gerekir
    - "Bazi CDN'ler, GZIP'in etkinlestirilmesine özel önem verir"
notes:
  jquery-minify:
    - "Tipik bir örnekte JQuery kitapliginin sikistirilmamis gelistirme sürümü artik 300 KB boyuta yaklasmaktadir. Ayni kitapligin küçültülmüs (yorumlar kaldirilmis vb.) sürümü yaklasik 3 kat daha küçüktür: Yaklasik 100 KB."
  gzip:
    - "Ister inanin ister inanmayin, GZIP'in varligin boyutunu artirabildigi durumlar söz konusudur. Bu genellikle varlik çok küçük ve GZIP sözlügünün ek yükü sikistirma tasarrufundan yüksek oldugunda veya kaynak zaten iyi bir sekilde sikistirilmissa görülür. Bazi sunucular, bu sorunu önlemek için bir `minimum dosya boyutu esigi` belirlemenize olanak tanir."
---

<p class="intro">
  Web uygulamalarimiz kapsam, tutku ve islevsellik açisindan büyümeye devam eder. Bu iyi bir seydir. Ancak, daha zengin bir web'e dogru araliksiz yapilan bu yürüyüs baska bir trendi de beraberinde getirir: Her bir uygulama tarafindan indirilen veri miktari sabit bir hizla artmaya devam etmektedir. Harika bir performans saglamak için her bayt verinin teslimini optimize etmemiz gerekir!
</p>

{% include shared/toc.liquid %}


## Veri sikistirmasi 101

Gereksiz dosyalari çikardiktan sonraki adim, tarayicinin indirmesi gereken kalan kaynaklarin toplam boyutunu en aza indirmek, diger bir deyisle bunlari sikistirmaktir. Kaynak türüne (metin, resimler, yazi tipleri vb.) bagli olarak birbirinden farkli çesitli teknikler emrimize amadedir: Sunucuda etkinlestirilebilecek genel araçlar, belirli içerik türleri için isleme öncesi optimizasyonlari ve gelistiricinin girisini gerektiren kaynaga özel optimizasyonlar.

En iyi performansin saglanmasi, tüm bu tekniklerin kombinasyonunu gerektirir.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

Veri boyutunu azaltma süreci `veri sikistirmasi` olarak bilinir ve kendi basina derin bir çalisma alanidir: Birçok kisi kariyerlerinin tamamini çesitli sikistiricilarin sikistirma oranlarini, hizini ve bellek gereksinimlerini iyilestirmek için algoritmalar, teknikler ve optimizasyonlar üzerinde çalisarak harcamistir. Bu konu üzerinde tam bir tartisma yapmanin bizim kapsamimiz disinda oldugunu söylemeye bile gerek yoktur, ancak sikistirmanin nasil çalistigini ve sayfalarimizin gerektirdigi çesitli varliklarin boyutunu azaltmak için kullanabilecegimiz teknikleri yüksek düzeyde anlamak yine de önemlidir.

Bu tekniklerin temel ilkelerini uygulamada göstermek üzere, yalnizca bu örnek için kesfedecegimiz basit bir kisa mesaj biçimini nasil optimize etmeye baslayacagimizi düsünelim:

    # Asagida gizli bir ileti vardir. Bu ileti, anahtar/deger biçimindeki
    # bir üstbilgi kümesi, bunu izleyen yeni bir satir ve sifrelenmis iletiden olusur.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. Iletiler, `#` önekiyle belirtilen rastgele ek açiklamalar içerebilir. Ek açiklamalar, iletinin anlamini veya diger herhangi bir davranisini etkilemez.
2. Iletiler, anahtar/deger çiftleri olan (ve birbirinden `:` ile ayrilan) `üstbilgiler` içerebilir ve iletinin basinda görünmelidir.
3. Iletiler metin veri yükü tasir.

Su anda yaklasik 200 karakter uzunlugunda olan yukaridaki iletinin boyutunu küçültmek için ne yapabilirdik?

1. Yorum ilginç, ancak gerçekte iletinin anlamini degistirmedigini biliyoruz; dolayisiyla iletiyi iletirken bunu çikaririz.
2. Muhtemelen üstbilgileri verimli bir sekilde kodlamak için kullanilabilecek bazi akilli teknikler vardir. Tüm iletilerin her zaman `format` ve `date` üstbilgilerinin olup olmadigini bilmiyoruz, ancak varsa bunlari iki kisa tamsayi kimligine dönüstürüp yalnizca bunlari gönderebiliriz! Bununla birlikte, durumun böyle oldugundan emin olmadigimiz için simdilik bunu oldugu gibi birakacagiz.
3. Veri yükü yalnizca metin ve gerçekte içeriginin ne oldugu bilmiyorsak da (görünüse göre bir `gizli ileti` kullaniyor) sadece metne bakildiginda bile içinde gereksiz birçok seyin oldugu görülüyor. Belki tekrar eden harfleri göndermek yerine yalnizca tekrarlanan harfleri sayip bunlari daha verimli bir sekilde kodlayamaz miyiz?
    * Örn. `AAA` `3A` veya üç A sirasi olur.


Tekniklerimizi birlestirerek asagidaki sonuca ulasiriz:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

Yeni ileti 56 karakter uzunlugundadir ve bu, orijinal iletiyi %72 gibi etkileyici bir oranda sikistirmayi basardigimiz anlamina gelir. Fena degil, her seyi dikkate aldik ve daha isin basindayiz!

Elbette, sunu merak ediyor olabilirsiniz: Tüm bunlar harika, ama bunun web sayfalarimizi optimize etmemize nasil yardimi olacak? Herhalde sikistirma algoritmalarimizi kesfetmeye çalismayacagiz, degil mi? Yanitimiz hayir, çalismayacagiz. Ancak, ileride göreceginiz gibi sayfalarimizdaki çesitli kaynaklari optimize ederken tam olarak ayni teknikleri ve düsünme yöntemini kullanacagiz: ön isleme, baglama özel optimizasyonlar ve farkli içerik için farkli algoritmalar.


## Küçültme: Ön isleme ve baglama özel optimizasyonlar

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

Yedek veya gereksiz verileri sikistirmanin en iyi yolu bunlari tümüyle çikarmaktir. Elbette, yalnizca rastgele verileri silemeyiz, ancak veri biçiminin içerige özel bilgisine ve özelliklerine sahip olabilecegimiz bazi baglamlarda, gerçek anlamini etkilemeden veri yükünün boyutunu önemli ölçüde küçültmek genellikle mümkündür.

{% include_code src=_code/minify.html snippet=full %}

Yukaridaki basit HTML sayfasini ve içerdigi üç farkli içerik türünü düsünün: HTML biçimlendirmesi, CSS stilleri ve JavaScript. Bu içerik türlerinin her biri geçerli HTML biçimlendirmesini, CSS kurallarini veya JavaScript içerigini olusturan ögeler için farkli kurallara, yorumlari belirtmek ve diger seyler için de farkli kurallara sahiptir. Bu sayfanin boyutunu nasil küçültebiliriz?

* Kod yorumlari bir gelistiricinin en iyi dostudur, ancak tarayicinin bunlari görmesine gerek yoktur! Basit bir sekilde CSS (`/* ... */`), HTML (`<!-- ... -->`) ve JavaScript (`// ...`) yorumlarini çikarmamiz sayfanin toplam boyutunu önemli ölçüde azaltabilir.
* Bir `akilli` CSS sikistiricisi, `.awesome-container` ile ilgili kurallari tanimlamak için verimsiz bir yol kullandigimizi fark edebilir ve diger stilleri etkilemeden iki bildirimi bir bildirime indirebilir ve böylece, daha fazla bayttan tasarruf saglayabilir.
* Bosluk (aralar ve sekmeler) HTML, CSS ve JavaScript'te gelistiriciye kolaylik saglar. Bir ek sikistirici, tüm sekmeleri ve aralari çikarabilir.

^
{% include_code src=_code/minified.html snippet=full %}

Yukaridaki adimlari uyguladiktan sonra sayfamiz 406 karakterden 150 karaktere düser ve %63 sikistirma tasarrufu saglamis oluruz! Evet kabul ediyorum, çok okunabilir degil, ama öyle olmasi da gerekmiyor: Orijinal sayfayi `gelistirme sürümümüz` olarak tutabilir ve daha sonra, sayfayi web sitemizde yayinlamaya hazir oldugumuzda yukaridaki adimlari uygulayabiliriz.

Bir adim geri çekildigimizde, yukaridaki örnek önemli bir noktayi gösterir: Genel amaçli bir sikistirici da (örnegin, rastgele metni sikistirmak üzere tamamlanmis bir tanesi) yukaridaki sayfayi sikistirirken büyük olasilikla oldukça ise yarayabilirdi, ancak yorumlari çikaracagini, CSS kurallarini daraltmayi veya içerige özel diger onlarca optimizasyonu hiçbir zaman bilemezdi. Bu nedenle ön isleme / küçültme / baglama duyarli optimizasyon güçlü bir araç olabilir.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

Benzer bir sekilde, yukaridaki teknikler yalnizca metin tabanli varliklarin ötesine genisletilebilir. Resimler, video ve diger içerik türlerinin tümü, kendi meta veri biçimlerini ve çesitli veri yüklerini içerir. Örnegin, bir kamerayla resim çektiginizde, fotograf genellikle fazladan birçok bilgi yerlestirir: Kamera ayarlari, konum vb. Uygulamaniza bagli olarak bu veriler kritik öneme sahip olabilir (ör. bir fotograf paylasim sitesi) veya tamamiyla yararsiz olduklarindan bunlari kaldirmaya degip degmeyecegini düsünmeniz gerekir. Uygulamada, bu meta veriler her resim için onlarca kilobayt edebilir!

Kisacasi, varliklarinizin verimliligini optimize ederken ilk adim olarak farkli içerik türlerinin envanterini olusturun ve bunlarin boyutunu küçültmek için içerige özel ne tür optimizasyonlar uygulayabileceginizi düsünün. Bunu yapmaniz önemli tasarruflar saglayabilir! Daha sonra, neler olduklarini belirledikten sonra, bu optimizasyonlari olusturma ve yayin süreçlerinize ekleyerek otomatiklestirin. Optimizasyonlarin gerçeklestirilecegini garanti edebilmenizin tek yolu budur.

## GZIP ile metin sikistirma

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](http://en.wikipedia.org/wiki/Gzip), herhangi bir bayt akisina uygulanabilecek genel bir sikistiricidir: Içine bakildiginda önceden görülen içerigin bir kismini hatirlar ve yinelenen veri parçalarini verimli bir sekilde bulup degistirmeyi dener. Meraklilar, [GZIP'in düsük seviyeli harika bir açiklamasi için buraya](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s) bakabilir. Bununla birlikte, GZIP uygulamada en iyi performansini metne dayali içerikte göstererek büyük dosyalar için %70-90'a varan sikistirma oranlari gerçeklestirebilir. Diger yandan GZIP'in alternatif algoritmalarla önceden sikistirilmis varliklar (ör. çogu resim biçimi) üzerinde çalistirilmasi hemen hemen hiç iyilestirme saglamaz.

Tüm modern tarayicilar GZIP'i destekler ve tüm HTTP istekleri için GZIP sikistirmasini otomatik olarak görüsür: Bizim isimiz, sunucunun istemci tarafindan istendiginde sikistirilmis kaynak sunmak üzere dogru bir sekilde yapilandirildigindan emin olmaktir.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Kitaplik</th>
    <th>Boyut</th>
    <th>Sikistirilmis boyut</th>
    <th>Sikistirma orani</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="kitaplik">jquery-1.11.0.js</td>
  <td data-th="boyut">276 KB</td>
  <td data-th="sikistirilmis">82 KB</td>
  <td data-th="tasarruflar">%70</td>
</tr>
<tr>
  <td data-th="kitaplik">jquery-1.11.0.min.js</td>
  <td data-th="boyut">94 KB</td>
  <td data-th="sikistirilmis">33 KB</td>
  <td data-th="tasarruflar">%65</td>
</tr>
<tr>
  <td data-th="kitaplik">angular-1.2.15.js</td>
  <td data-th="boyut">729 KB</td>
  <td data-th="sikistirilmis">182 KB</td>
  <td data-th="tasarruflar">%75</td>
</tr>
<tr>
  <td data-th="kitaplik">angular-1.2.15.min.js</td>
  <td data-th="boyut">101 KB</td>
  <td data-th="sikistirilmis">37 KB</td>
  <td data-th="tasarruflar">%63</td>
</tr>
<tr>
  <td data-th="kitaplik">bootstrap-3.1.1.css</td>
  <td data-th="boyut">118 KB</td>
  <td data-th="sikistirilmis">18 KB</td>
  <td data-th="tasarruflar">%85</td>
</tr>
<tr>
  <td data-th="kitaplik">bootstrap-3.1.1.min.css</td>
  <td data-th="boyut">98 KB</td>
  <td data-th="sikistirilmis">17 KB</td>
  <td data-th="tasarruflar">%83</td>
</tr>
<tr>
  <td data-th="kitaplik">foundation-5.css</td>
  <td data-th="boyut">186 KB</td>
  <td data-th="sikistirilmis">22 KB</td>
  <td data-th="tasarruflar">%88</td>
</tr>
<tr>
  <td data-th="kitaplik">foundation-5.min.css</td>
  <td data-th="boyut">146 KB</td>
  <td data-th="sikistirilmis">18 KB</td>
  <td data-th="tasarruflar">%88</td>
</tr>
</tbody>
</table>

Yukaridaki tabloda GZIP sikistirmasinin en popüler birkaç JavaScript kitapligi ve CSS çerçevesi için sagladigi tasarruflar gösterilmektedir. Tasarruflar %60 ile 88 arasinda degisir. Bununla birlikte, küçültülen dosyalarin (dosya adlarindaki `.min` ekinden tanimlanirlar) ve GZIP'in birlikte daha da fazla kazanim saglayacagini unutmayin.

1. **Önce içerige özel optimizasyonlar uygulayin: CSS, JS ve HTML küçültücüler.**
2. **Küçültülen çiktiyi sikistirmak için GZIP`i uygulayin.**

Bunun en iyi tarafi, GZIP'in etkinlestirilmesinin uygulamasi en basit ve en yüksek ödüllü optimizasyonlardan biri olmasidir. Maalesef birçok kisi bunu uygulamayi unutur. Çogu web sunucusu içerigi sizin adiniza sikistirir; sizin tek yapmaniz gereken sunucunun GZIP sikistirmasindan yararlanacak tüm içerik türlerini sikistirmak üzere dogru bir sekilde yapilandirildigini dogrulamaktir.

Sunucunuz için en iyi yapilandirma nedir? HTML5 Standart Metin projesi, her bir yapilandirma isareti ve ayari için ayrintili açiklamalarla birlikte en popüler sunucularin tümü için [örnek yapilandirma dosyalari](https://github.com/h5bp/server-configs) içerir: Listede favori sunucunuzu bulun, GZIP bölümünü arayin ve sunucunuzun önerilen ayarlarla yapilandirildigini onaylayin.

<img src="images/transfer-vs-actual-size.png" class="center" alt="Gerçek ve aktarim boyutunun karsilastirildigi DevTools demosu">

GZIP'i uygulamada görmenin hizli ve basit bir yolu Chrome DevTools'u açip Ag panelinde `Boyut / Içerik` sütununu incelemektir: `Boyut`, varligin aktarim boyutunu, `Içerik` ise varligin sikistirilmamis boyutunu belirtir. Yukaridaki örnekte yer alan HTML varligi için GZIP, aktarim sirasinda 24,8 KB tasarruf etmistir!

{% include shared/remember.liquid list=page.notes.gzip %}

Son olarak, bir uyarimiz var: Çogu sunucu, varliklari sizin için otomatik olarak sikistirir, ancak bunlari kullaniciya sunarken bazi CDN'ler, GZIP ögesinin sunuldugundan emin olmak için ekstra özen ve manuel çalismagerektirir. Sitenizi denetleyin ve varliklarinizin gerçekten [sikistirildigindan](http://www.whatsmyip.org/http-compression-test/) emin olun!





