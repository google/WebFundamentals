---
title: "Web yazi tipi optimizasyonu"
description: "Tipografi; iyi tasarim, marka bilinci olusturma, okunabilirlik ve erisilebilirlik özelliklerinin temelini olusturur. Web yazi tipleri yukaridakilerin tümünü ve daha fazlasini saglar: Metin seçilebilir, aranabilir, zum yapilabilir ve yüksek DPI dostudur, ekran boyutu ve çözünürlükten bagimsiz olarak tutarli ve net metin olusturmasi saglar. Web yazi tipleri iyi tasarim, UX ve performans için kritik öneme sahiptir."
updated_on: 2014-09-30
key-takeaways:
  anatomy:
    - "Unicode yazi tipleri binlerce glif içerebilir"
    - "Dört yazi tipi biçimi vardir: WOFF2, WOFF, EOT, TTF"
    - "Bazi yazi tipi biçimleri GZIP sikistirmasinin kullanilmasini gerektirir"
  font-family:
    - "Birden çok yazi tipi biçimi belirtmek için format() ipucunu kullanin"
    - "Performansi iyilestirmek için genis unicode yazi tiplerinin alt kümelerini olusturun: Unicode araligi alt kümesi olusturun ve eski tarayicilar için bir manuel alt küme yedegi saglayin"
    - "Sayfa ve metin olusturma performansini iyilestirmek için biçimsel yazi tipi çesitlerinin sayisini azaltin"
  font-crp:
    - "Yazi tipi istekleri, olusturma agaci olusturuluncaya kadar geciktirilir. Bu, metin olusturmasinin gecikmesine neden olabilir"
    - "Yazi Tipi Yükleme API'si, varsayilan yazi tipinin geç yüklenmesi yöntemini geçersiz kilan özel yazi tipi yükleme ve olusturma stratejileri uygulamamiza olanak tanir"
    - "Yazi tipini satir içinde kullanma, eski tarayicilardaki varsayilan yazi tipinin geç yüklenmesi yöntemini geçersiz kilmamiza olanak tanir"

notes:
  svg:
    - "Teknik olarak, <a href='http://caniuse.com/svg-fonts'>SVG yazi tipi kapsayicisi</a> da vardir, ancak bu kapsayici hiçbir zaman IE veya Firefox tarafindan desteklenmemistir ve simdi Chrome'da kullanimdan kaldirilmistir. Böyle olunca da kullanimi sinirli olmustur. Bu kapsayiciyi, bu kilavuzda da özellikle atliyoruz."
  zopfli:
    - "EOT, TTF ve WOFF biçimleri için <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli sikistirmasini</a> kullanmayi düsünebilirsiniz. Zopfli, gzip'e göre yaklasik olarak %5 dosya boyutu küçültmesi saglayan, zlib uyumlu bir sikistiricidir."
  local-fonts: 
    - "Varsayilan sistem yazi tiplerinden birine basvuruda bulunmuyorsaniz, pratikte kullanicinin, özellikle de ek yazi tiplerinin `yüklenmesinin` gerçekten imkansiz oldugu mobil cihazlarda bunu yerel olarak yüklemis olmasi nadir görülen bir durumdur. Sonuç olarak, her zaman harici yazi tipi konumlarinin bir listesini saglamaniz gerekir."
  font-order:
    - "Yazi tipi çesitlerinin belirtildigi sira önemlidir. Tarayici, destekledigi ilk biçimi seçer. Dolayisiyla, yeni tarayicilarin WOFF2 kullanmasini istiyorsaniz, WOFF2 bildirimini WOFF üzerine yerlestirmeniz gerekir."
  unicode-subsetting:
    - "Unicode araligi alt kümesi özellikle Asya dilleri için önemlidir. Bu dillerdeki glif sayisi, bati dillerinden çok daha fazladir ve tipik bir `tam` yazi tipi genellikle onlarca kilobayt yerine megabaytlarla ölçülür!"
  synthesis:
    - "En iyi tutarlilik ve görsel sonuçlar için yazi tipi sentezine güvenmemeniz gerekir. Bunun yerine, kullanilan yazi tipi çesitlerinin sayisini en aza indirin ve konumlarini belirtin. Bu sekilde, tarayici sayfada kullanildiklarinda bunlari indirebilir. Bununla birlikte, bazi durumlarda sentezlenmis bir çesit <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>uygun bir seçenek olabilir</a>; bunu kullanirken dikkatli olun."
  webfontloader:
    - "Yazi Tipi Yükleme API'si <a href='http://caniuse.com/#feat=font-loading'>bazi tarayicilarda hâlâ gelistirme asamasindadir</a>. Benzer bir islevsellik saglamak için <a href='https://github.com/bramstein/fontloader'>FontLoader çoklu dolgusunu</a> veya <a href='https://github.com/typekit/webfontloader'>webfontloader kitapligini</a> kullanmayi düsünebilirsiniz; ancak bunlar, bir JavaScript bagimliligi ek yükü de getirir."
  font-inlining: 
    - "Satir içi kullanirken seçici olun! @font-face kuralinin geç yükleme davranisini kullanma nedeninin, gereksiz yazi tipi çesitlerini ve alt kümelerini indirmekten kaçinmak oldugunu unutmayin. Ayrica, CSS dosyanizin boyutunu agresif satir içi kullanimla büyütmek <a href='/web/fundamentals/performance/critical-rendering-path/'>kritik olusturma yolunuzu</a> olumsuz bir sekilde etkiler. Tarayicinin CSSOM'yi, olusturma agacini ve ekranda sayfa içerigini olusturmadan önce tüm CSS'yi indirmesi gerekir."
---

<p class="intro">
  Tipografi; iyi tasarim, marka bilinci olusturma, okunabilirlik ve erisilebilirlik özelliklerinin temelini olusturur. Web yazi tipleri yukaridakilerin tümünü ve daha fazlasini saglar: Metin seçilebilir, aranabilir, zum yapilabilir ve yüksek DPI dostudur, ekran boyutu ve çözünürlükten bagimsiz olarak tutarli ve net metin olusturmasi saglar. Web yazi tipleri iyi tasarim, UX ve performans için kritik öneme sahiptir.
</p>

{% include shared/toc.liquid %}

Web yazi tipi optimizasyonu, genel performans stratejisinin kritik bir parçasidir. Her yazi tipi bir ek kaynaktir ve bazi yazi tipleri metnin olusturulmasini engelleyebilir; ancak sayfanin web yazi tiplerini kullanmasi daha yavas olusturulmasi gerektigi anlamina gelmez. Tam tersine, optimize edilmis bir yazi tipi yüklenme sekilleriyle ilgili makul bir stratejiyle birlestirilip sayfaya uygulandiginda, toplam sayfa boyutunu azaltmaya ve sayfa olusturma sürelerini iyilestirmeye yardimci olabilir.

## Web yazi tipinin anatomisi

{% include shared/takeaway.liquid list=page.key-takeaways.anatomy %}

Web yazi tipi, gliflerden olusan bir koleksiyondur ve her bir glif, bir harfi veya sembolü açiklayan bir vektör seklidir. Sonuç olarak, belirli bir yazi tipi dosyasinin boyutu iki basit degisken tarafindan belirlenir: Her bir glifin vektör yollarinin karmasikligi ve belirli bir yazi tipindeki gliflerin sayisi. Örnegin, en popüler web yazi tiplerinden olan Open Sans; Latin, Yunan ve Kiril karakterlerini de kapsayan 897 glif içerir.

<img src="images/glyphs.png" class="center" alt="Yazi tipi glif tablosu">

Bir yazi tipi seçerken hangi karakter kümelerinin desteklendigine dikkat edilmesi önem tasir. Sayfa içeriginizi birden çok dile yerellestirmeniz gerekiyorsa kullanicilariniza tutarli bir görünüm ve deneyim saglayabilecek bir yazi tipi kullanmaniz gerekir. Örnegin, [Google'in Noto yazi tipi ailesi](https://www.google.com/get/noto/) dünyadaki tüm dilleri desteklemeyi amaçlar. Ancak, Noto'nun toplam boyutunun tüm diller dahil oldugunda 130 MB üzerinde bir ZIP indirmesi oldugunu unutmayin! 

Açik bir biçimde, tipografinin performansi engellememesi için web'de yazi tiplerini kullanirken dikkatli bir mühendislik çalismasi gerekir. Neyse ki web platformu gerekli tüm temel ögeleri saglar ve bu kilavuzun geri kalaninda, her ikisinden de en iyi sekilde nasil yararlanacagimiza uygulamali bir sekilde bakacagiz.

### Web yazi tipi biçimleri

Bugün web'de dört yazi tipi kapsayici biçimi kullanilmaktadir: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://en.wikipedia.org/wiki/TrueType), [WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format) ve [WOFF2](http://www.w3.org/TR/WOFF2/). Ne yazik ki çok çesitli seçenekler olmasina ragmen, tüm eski ve yeni tarayicilarda çalisan tek bir evrensel biçim yoktur: EOT [yalnizca IE'de çalisir](http://caniuse.com/#feat=eot), TTF [IE'de kismen desteklenir](http://caniuse.com/#search=ttf), WOFF en genis destegi alir, ancak [bazi eski tarayicilarda kullanilamaz](http://caniuse.com/#feat=woff) ve WOFF 2.0 destegi [üzerinde birçok tarayicinin çalismalari devam etmektedir](http://caniuse.com/#feat=woff2).

Peki bu bizim açimizdan ne anlama geliyor? Tüm tarayicilarda çalisan tek bir biçimin olmamasi, tutarli bir deneyim saglamak için birden çok biçim saglamamiz gerektigi anlamina gelir:

* WOFF 2.0 çesidini destekleyen tarayicilara bu çesidi sunun
* Tarayicilarin çogunluguna WOFF çesidini sunun
* Eski Android (4.4 altindaki) tarayicilara TTF çesidini sunun
* Eski IE (IE9 altindaki) tarayicilara EOT çesidini sunun
^

{% include shared/remember.liquid title="Note" list=page.notes.svg %}

### Sikistirmayla yazi tipi boyutunu küçültme

Yazi tipi, gliflerden olusan bir koleksiyondur. Gliflerin her biri, harf biçimini açiklayan bir yol kümesidir. Elbette bagimsiz glifler farklidir, ancak yine de GZIP veya uyumlu bir sikistiriciyla sikistirilabilecek birçok benzer bilgiler içerirler: 

* Varsayilan olarak EOT ve TTF biçimleri sikistirilmaz: Sunucularinizin bu biçimleri saglarken [GZIP sikistirmasi](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) uygulayacak sekilde yapilandirildigindan emin olun.
* WOFF yerlesik sikistirmaya sahiptir. WOFF sikistiricinizin en uygun sikistirma ayarlarini kullanmakta oldugundan emin olun. 
* WOFF2, diger biçimlere göre yaklasik %30 daha küçük dosya boyutu saglamak için özel ön isleme ve sikistirma algoritmalari kullanir. [Rapora](http://www.w3.org/TR/WOFF20ER/) bakabilirsiniz.

Son olarak, bazi yazi tiplerinin bazi platformlar için gerekli olmayabilecek [yazi tipi ipucu](http://en.wikipedia.org/wiki/Font_hinting) ve [aralik birakma](http://en.wikipedia.org/wiki/Kerning) bilgileri içerdigini unutmamakta fayda vardir. Bu, daha fazla dosya boyutu optimizasyonuna olanak tanir. Kullanabileceginiz optimizasyon seçenekleri için yazi tipi sikistiriciniza danisin ve bu yolu seçerseniz, optimize edilen bu yazi tiplerini test edecek ve her bir ilgili tarayiciya saglayacak uygun altyapiya sahip oldugunuzdan emin olun. Örnegin, Google Yazi Tipleri her bir yazi tipi için 30'un üzerinde optimize edilmis çesit saglar ve her bir platform ve tarayici için en uygun çesidi otomatik olarak algilayip teslim eder.

{% include shared/remember.liquid title="Note" list=page.notes.zopfli %}

## Yazi tipi ailesini @font-face ile tanimlama

{% include shared/takeaway.liquid list=page.key-takeaways.font-family %}

@font-face CSS kuyruklu a kurali, belirli bir yazi tipi kaynaginin konumunu, stil özelliklerini ve yazi tipi için kullanilacak Unicode kod noktalarini tanimlamamiza olanak tanir. Bu tür @font-face bildirimlerinin bir kombinasyonu kullanilarak bir `yazi tipi ailesi` olusturulabilir. Daha sonra, tarayici hangi yazi tipi kaynaklarinin indirilmesi ve geçerli sayfaya uygulanmasi gerektigini degerlendirir. Bunun sahne arkasinda nasil çalistigina daha yakindan bakalim.

### Biçim seçimi

Her bir @font-face bildirimi, yazi tipi ailesinin adini saglar. Yazi tipi ailesi birden çok bildirimin, stil, agirlik ve uzatma gibi [yazi tipi özelliklerinin](http://www.w3.org/TR/css3-fonts/#font-prop-desc) ve yazi tipi kaynagina iliskin öncelikli bir konum listesini belirten [src tanimlayicisindan](http://www.w3.org/TR/css3-fonts/#src-desc) olusan bir mantiksal grup gibi hareket eder.

{% highlight css  %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('ttf'),
       url('/fonts/awesome.eot') format('eot');
}

@font-face {
  font-family: 'Awesome Font';
  font-style: italic;
  font-weight: 400;
  src: local('Awesome Font Italic'),
       url('/fonts/awesome-i.woff2') format('woff2'), 
       url('/fonts/awesome-i.woff') format('woff'),
       url('/fonts/awesome-i.ttf') format('ttf'),
       url('/fonts/awesome-i.eot') format('eot');
}
{% endhighlight %}

Ilk olarak, yukaridaki örnekte iki stili (normal ve _italic_) olan tek bir _Awesome Font_ ailesinin tanimlandigina ve her bir stilin farkli bir yazi tipi kaynak kümesini isaret ettigine dikkat edin. Dolayisiyla, her bir `src` tanimlayicisi öncelikli, virgülle ayrilmis bir kaynak çesitleri listesi içerir: 

* `local()` yönergesi, yerel olarak yüklenmis yazi tiplerine basvuruda bulunmamiza, bunlari yüklememize ve kullanmamiza olanak tanir.
* `url()` yönergesi, harici yazi tiplerini yüklememize olanak tanir ve saglanan URL'nin basvuruda bulundugu yazi tipinin biçimini belirten, istege bagli bir `format()` ipucu içermesine izin verilir.

^
{% include shared/remember.liquid title="Note" list=page.notes.local-fonts %}

Tarayici yazi tipinin gerektigini belirlediginde, saglanan kaynak listesini belirtilen sirada tekrarlar ve uygun kaynagi yüklemeye çalisir. Örnegin, yukaridaki örnegi izlersek:

1. Tarayici sayfa yer paylasimini gerçeklestirir ve sayfada belirtilen metnin olusturulmasi için gereken yazi tipi çesitlerini belirler.
2. Gereken her bir yazi tipi için tarayici, yazi tipinin yerel olarak mevcut olup olmadigini kontrol eder.
3. Dosya yerel olarak bulunamazsa, harici tanimlari tekrar eder:
  * Bir biçim ipucu varsa tarayici, indirme islemini baslatmadan önce biçimi destekleyip desteklemedigini kontrol eder; aksi halde bir sonrakine ilerler.
  * Herhangi bir biçim ipucu yoksa tarayici kaynagi indirir.

Uygun biçim ipuçlariyla yerel ve harici yönergelerin kombinasyonu, kullanilabilir tüm yazi tipi biçimlerini belirtebilmemizi ve geri kalani tarayicinin gerçeklestirmesini saglar: Tarayici, hangi kaynaklarin gerekli oldugunu belirler ve en uygun biçimi bizim adimiza seçer.

{% include shared/remember.liquid title="Note" list=page.notes.font-order %}

### Unicode araligi alt kümesi olusturma

Stil, agirlik ve uzatma gibi yazi tipi özelliklerine ek olarak, @font-face kurali her bir kaynak tarafindan desteklenen bir Unicode kod noktalari kümesi tanimlamamiza olanak tanir. Bu, genis bir Unicode yazi tipini küçük alt kümelere bölebilmemizi (ör. Latin, Kiril, Yunan alt kümeleri) ve yalnizca ilgili sayfadaki metni olusturmak için gereken glifleri indirebilmemizi saglar.

[Unicode araligi tanimlayici](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range), aralik degerlerinin virgülle ayrilmis bir listesini belirtmemize olanak tanir. Bu degerlerin her biri üç farkli biçimden birinde olabilir:

* Tek kod noktasi (ör. U+416)
* Uzaklik araligi (ör. U+400-4ff): Bir araligin baslangiç ve bitis kod noktalarini belirtir
* Joker karakter araligi (ör. U+4??): `?` karakterler herhangi bir onaltilik sayiyi belirtir

Örnegin, _Awesome Font_ ailemizi Latin ve Japonca alt kümelerine bölebiliriz. Daha sonra, bunlarin her biri tarayici tarafindan gerektiginde indirilir: 

{% highlight css %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-jp.woff2') format('woff2'), 
       url('/fonts/awesome-jp.woff') format('woff'),
       url('/fonts/awesome-jp.ttf') format('ttf'),
       url('/fonts/awesome-jp.eot') format('eot');
  unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
}
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.unicode-subsetting %}

Unicode araligi alt kümelerinin ve her bir biçimsel yazi tipi çesidi için ayri dosyalarin kullanilmasi, hem daha hizli hem de daha verimli bir sekilde indirilen bir bilesik yazi tipi ailesi tanimlamamiza olanak tanir. Ziyaretçi yalnizca gereksinim duydugu çesitleri ve alt kümeleri indirir ve sayfada hiç görmeyecegi veya kullanmayacagi alt kümeleri indirmeye zorlanmaz. 

Bununla birlikte, unicode araligiyla ilgili küçük bir nokta söz konusudur: Henüz [tüm tarayicilar tarafindan desteklenmemektedir](http://caniuse.com/#feat=font-unicode-range). Bazi tarayicilar unicode araligi ipucunu göz ardi edip tüm çesitleri indirirken, digerleri @font-face bildirimini hiç isleyemez. Bu konuyu ele almak üzere eski tarayicilar için "manuel alt küme" yedegi saglamamiz gerekir.

Eski tarayicilar gerekli alt kümeleri seçecek kadar akilli olmadiklari ve bir bilesik yazi tipi olusturmayacaklari için gerekli tüm alt kümeleri içeren tek bir yazi tipi kaynagi saglamak ve geri kalani tarayicidan gizlemek için bir yedegimizin olmasi gerekir. Örnegin, sayfa yalnizca Latin karakterleri kullaniyorsa, diger glifleri çikarabilir ve bu alt kümeyi bagimsiz bir kaynak olarak sunabiliriz. 

1. **Hangi alt kümelerin gerektigini nasil belirleriz?** 
  - Tarayici unicode araligi alt kümesini destekliyorsa, dogru alt kümeyi otomatik olarak seçer. Sayfanin yalnizca alt küme dosyalarini saglamasi ve @font-face kurallarinda uygun unicode araliklarini belirtmesi gerekir.
  - Unicode araligi desteklenmiyorsa sayfanin gereksiz tüm alt kümeleri gizlemesi gerekir. Gereken alt kümeleri gelistirici belirlemelidir.
2. **Yazi tipi alt kümelerini nasil olustururuz?**
  - Alt küme olusturmak ve yazi tiplerinizi optimize etmek için açik kaynakli [pyftsubset aracini](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) kullanin.
  - Bazi yazi tipi hizmetleri, özel sorgu parametreleri araciligiyla manuel alt küme olusturmaya olanak tanir. Sayfaniz için gereken alt kümeyi kendiniz manuel olarak belirtirken bunu kullanabilirsiniz. Yazi tipi saglayicinizin dokümanlarina bakin.


### Yazi tipi seçimi ve sentez

Her bir yazi tipi ailesi birden çok biçimsel çesit (normal, kalin, italik) ve her bir stil için her biri çok farkli glif sekilleri içerebilecek birden çok agirliktan (ör. farkli aralik, boyutlandirma veya tamamiyla farkli bir sekil) olusur. 

<img src="images/font-weights.png" class="center" alt="Yazi tipi agirliklari">

Örnegin, yukaridaki semada üç farkli kalin agirligi sunan bir yazi tipi ailesi gösterilmektedir: 400 (normal), 700 (kalin) ve 900 (ekstra kalin). Aradaki diger tüm çesitler (gri ile belirtilenler), tarayici tarafindan otomatik olarak en yakin çesit ile eslestirilir. 

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Yüzü olmayan bir agirlik belirtildiginde, yakin bir agirliga sahip baska bir yüz kullanilir. Genel olarak, kalin agirliklar daha büyük agirliklara sahip yüzlerle ve hafif agirliklar, daha hafif agirliklara sahip yüzlerle eslestirilir.
    <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3 yazi tipi eslestirme algoritmasi</a></p>
    </blockquote>
  </div>
</div>

Benzer mantik _italic_ çesitler için de geçerlidir. Yazi tipi tasarimcisi hangi çesitleri olusturacaklarini, biz de sayfada kullanacagimiz çesitleri kontrol ederiz. Her bir çesit ayri bir indirme oldugundan çesit sayisinin az tutulmasi iyi bir fikirdir! Örnegin, _Awesome Font_ ailemiz için iki kalin çesit tanimlayabiliriz: 

{% highlight css %}
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 700;
  src: local('Awesome Font'),
       url('/fonts/awesome-l-700.woff2') format('woff2'), 
       url('/fonts/awesome-l-700.woff') format('woff'),
       url('/fonts/awesome-l-700.ttf') format('ttf'),
       url('/fonts/awesome-l-700.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
{% endhighlight %}

Yukaridaki örnekte, ayni Latin glif kümesini kapsayan, ancak iki farkli `agirlik`ta iki kaynaktan olusan _Awesome Font_ ailesi bildirilmektedir (U+000-5FF): normal (400) ve kalin (700). Bununla birlikte, CSS kurallarimizdan biri farkli bir yazi tipi agirligi belirtir veya yazi tipi stil özelligini italige ayarlarsa ne olur?

* Bir tam yazi tipi eslesmesi yoksa tarayici, bunu en yakin eslesmeyle degistirir.
* Herhangi bir biçimsel eslesme bulunamazsa (ör. yukaridaki örnekte herhangi bir italik çesit bildirmediysek), tarayici kendi yazi tipi çesidini sentezler. 

<img src="images/font-synthesis.png" class="center" alt="Yazi tipi sentezi">

<div class="quote">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Yazarlar, sentezlenmis yaklasimlarin Kiril gibi, italik biçimlerin sekil olarak çok farkli oldugu komut dosyalari için uygun olamayacagi konusunda dikkatli olmalidir. Bir sentetik sürüme güvenmek yerine gerçek bir italik yazi tipinin kullanilmasi her zaman için daha iyidir.
    <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3 yazi tipi stili</a></p>
    </blockquote>
  </div>
</div>

Yukaridaki örnekte, Open-Sans için gerçek ve sentezlenmis yazi tipi sonuçlari arasindaki fark gösterilmektedir. Sentezlenmis tüm çesitler 400 agirlikli tek bir yazi tipinden olusturulmustur. Sizin de görebileceginiz gibi, sonuçlar arasinda dikkat çekici bir fark vardir. Kalin ve yatik çesitlerin nasil olusturulacagina iliskin ayrintilar belirtilmemistir. Dolayisiyla, sonuçlar tarayicidan tarayiciya degistir ve ayrica, yazi tipine son derece baglidir.

{% include shared/remember.liquid title="Note" list=page.notes.synthesis %}


## Yükleme ve olusturmayi optimize etme

{% include shared/takeaway.liquid list=page.key-takeaways.font-crp %}

Ihtiyacimiz olmayabilecek tüm biçimsel çesitleri ve kullanilmayabilecek tüm glifleri içeren bir `tam` web yazi tipi, kolayca megabaytlarca büyüklükte bir indirmeyle sonuçlanabilir. Bunu ele almak için @font-face CSS kurali, özellikle yazi tipi ailesini bir kaynak koleksiyonuna bölmemize olanak taniyacak sekilde tasarlanmistir: Unicode alt kümeler, ayri stil çesitleri vb. 

Bu bildirimler saglandiginda, tarayici gereken alt kümeleri ve çesitleri belirleyip metni olusturmak için gereken en küçük kümeyi indirir. Bu davranis çok kullanislidir, ancak dikkatli olmazsak kritik olusturma yolunda bir performans sorununa ve metin olusturmasinin gecikmesine neden olabilir. Bunun olmasini kesinlikle istemeyiz! 

### Web Yazi Tipleri ve Kritik Olusturma Yolu

Yazi tiplerinin geç yüklenmesi, metin olusturmayi geciktirebilecek önemli bir gizli etki tasir: Tarayicinin, metni olusturmak için ihtiyaç duyacagi yazi tipi kaynaklarini ögrenmeden önce DOM ve CSSOM agaçlarina bagimli olan [olusturma agacini olusturmasi gerekir](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction). Sonuç olarak, yazi tipi istekleri diger kritik kaynaklarin sonrasina ertelenir ve kaynak getirilinceye kadar tarayicinin metni olusturmasi engellenebilir.

<img src="images/font-crp.png" class="center" alt="Yazi tipi kritik olusturma yolu">

1. Tarayici HTML dokümanini ister
2. Tarayici, HTML yanitini ayristirmaya ve DOM'yi olusturmaya baslar
3. Tarayici; CSS, JS ve diger kaynaklari kesfeder ve istekler gönderir
4. Tarayici, tüm CSS içerigi alindiktan sonra CSSOM'yi olusturur ve olusturma agaci yapimi için bunu DOM agaciyla birlestirir
  * Yazi tipi istekleri, olusturma agaci sayfada belirtilen metni olusturmak için gereken yazi tipi çesitlerini belirttikten sonra gönderilir
5. Tarayici yer paylasimini gerçeklestirir ve içerigi ekranda boyar
  * Yazi tipi henüz mevcut degilse, tarayici hiç metin pikseli olusturamaz
  * Yazi tipi kullanilabilir duruma geldiginde tarayici metin piksellerini boyar

Olusturma agaci olusturulduktan kisa bir süre sonra yapilabilen sayfa içeriginin ilk boyamasi ile yazi tipi kaynaginin istenmesi arasindaki `yaris`, tarayicinin sayfa yer paylasimini olusturabildigi ancak metni atladigi `bos metin sorunu`nu ortaya çikarir. Gerçek davranis, çesitli tarayicilar arasinda farklilik gösterir:

* Safari, yazi tipi indirilinceye kadar metin olusturmayi bekletir.
* Chrome ve Firefox, yazi tipi olusturmayi 3 saniyeye kadar bekletir; sonrasinda bir yedek yazi tipi kullanirlar ve yazi tipi indirildikten sonra, metni indirilen yazi tipiyle bir kez daha yeniden olustururlar.
* IE, istenen yazi tipi henüz mevcut degilse metni hemen yedek yazi tipiyle olusturur ve yazi tipi indirme islemi tamamlandiktan sonra metni yeniden olusturur.

Farkli olusturma stratejilerini destekleyen ve bunlara karsi olan iyi tartismalar vardir: Bazi kisiler yeni olusturmayi rahatsiz edici bulurken digerleri aninda sonuçlar görmeyi tercih eder ve yazi tipi indirildikten sonra sayfanin yeniden düzenlenmesini önemsemez. Biz burada bu tartismaya girmeyecegiz. Önemli olan nokta, geç yüklemenin bayt sayisini azaltmasi, ancak ayni zamanda metin olusturmasini geciktirme potansiyelinin de olmasidir. Simdi, bu davranisi nasil optimize edebilecegimize bakalim.

### Yazi Tipi Yükleme API'si ile yazi tipi olusturmayi optimize etme

[Yazi Tipi Yükleme API'si](http://dev.w3.org/csswg/css-font-loading/), CSS yazi tipi yüzlerinin tanimlanmasi ve kullanilmasi, indirme isleme ilerleme durumunun izlenmesi ve varsayilan geç yükleme davranisinin geçersiz kilinmasi için bir komut dosyasi arayüzü saglar. Örnegin, belirli bir yazi tipi çesidinin gerekeceginden eminsek bunu tanimlayabilir ve tarayiciya, yazi tipi kaynagini hemen getirmeye baslamasini söyleyebiliriz:

{% highlight javascript %}
var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load(); // don't wait for render tree, initiate immediate fetch!

font.ready().then(function() {
  // apply the font (which may rerender text and cause a page reflow)
  // once the font has finished downloading
  document.fonts.add(font);
  document.body.style.fontFamily = "Awesome Font, serif";

  // OR... by default content is hidden, and rendered once font is available
  var content = document.getElementById("content");
  content.style.visibility = "visible";

  // OR... apply own render strategy here... 
});
{% endhighlight %}

Bunun ötesinde, yazi tipi durumunu ([check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) yöntemi araciligiyla kontrol edebildigimiz ve indirme islemi ilerleme durumunu izleyebildigimizden, sayfalarimizdaki metnin olusturulmasina yönelik özel bir strateji de tanimlayabiliriz: 

* Yazi tipi kullanilabilir duruma gelene kadar tüm metin olusturma islemini bekletebiliriz.
* Her bir yazi tipi için bir özel zaman asimi uygulayabiliriz.
* Olusturmanin engellemesini kaldirmak için yedek yazi tipi kullanabilir ve yazi tipi kullanilabilir duruma geldikten sonra, istenen yazi tipini kullanan yeni bir stil ekleyebiliriz.

En iyisi, sayfadaki farkli içerik için yukaridaki stratejileri karistirip eslestirebiliriz; diger bir deyisle, bazi bölümlerde yazi tipi kullanilabilir duruma gelene kadar metin olusturmayi bekletip bir yedek kullanabilir ve yazi tipi indirme islemi bittikten sonra yeniden olusturabilir, farkli zaman asimlari belirleyebilir ve baska islemler yapabiliriz. 

{% include shared/remember.liquid title="Note" list=page.notes.webfontloader %}

### Satir içi kullanimla yazi tipi olusturmayi optimize etme

`Bos metin sorunu` nu ortadan kaldirmak üzere Yazi Tipi Yükleme API'sini kullanmaya alternatif basit bir strateji de yazi tipi içerigini bir CSS stil sayfasinda satir içinde kullanmaktir:

* Eslesen medya sorgularina sahip CSS stil sayfalari, CSSOM'yi olusturmak için gerekli olduklarindan tarayici tarafindan yüksek öncelikle otomatik olarak indirilir.
* Yazi tipi verilerinin CSS stil sayfasinda satir içinde kullanilmasi tarayiciyi, yazi tipini yüksek öncelikle ve olusturma agacini beklemeden indirmeye zorlar. Bu yaklasim, varsayilan geç yükleme davranisini el ile geçersiz kilar.

Satir içinde kullanma stratejisi çok esnek degildir ve farkli içerik için özel zaman asimlari veya olusturma stratejileri tanimlamamiza olanak tanimaz, ancak tüm tarayicilarda çalisan basit ve saglam bir çözümdür. En iyi sonuçlar için satir içinde kullanilan yazi tiplerini bagimsiz bir stil sayfasina ayirin ve bunlari uzun bir max-age degeriyle sunun. Bu sekilde, CSS'nizi güncellediginizde ziyaretçileri bu yazi tiplerini yeniden indirmeye zorlamamis olursunuz. 

{% include shared/remember.liquid title="Note" list=page.notes.font-inlining %}

### HTTP Önbellege Alma özelligiyle yazi tipi yeniden kullanimini optimize etme

Yazi tipi kaynaklari genellikle sik güncellenmeyen statik kaynaklardir. Sonuç olarak, uzun bir max-age süre sonu için çok uygundurlar. Tüm yazi tipi kaynaklari için hem bir [kosullu ETag üstbilgisi](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) hem de bir [en iyi Cache-Control politikasi](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) belirttiginizden emin olun.   
    
Yazi tiplerinin localStorage içinde veya baska mekanizmalar araciligiyla depolanmasina gerek yoktur. Bunlarin her birinin kendi performans avantajlari vardir. Tarayicinin HTTP önbellegi, Yazi Tipi Yükleme API'si veya webfontloader kitapligiyla birlikte, yazi tipi kaynaklarini tarayiciya teslim etmek için en iyi ve en saglam mekanizmayi saglar.


## Optimizasyon kontrol listesi

Popüler düsüncenin aksine, web yazi tiplerinin kullanilmasinin sayfa olusturmayi geciktirmesi gerekmez veya diger performans ölçümleri üzerinde olumsuz etkisi yoktur. Yazi tiplerinin iyi bir sekilde optimize edilerek kullanilmasi, çok daha iyi bir genel kullanici deneyimini saglayabilir: Harika marka bilinci olusturma, iyilestirilmis okunabilirlik, kullanilabilirlik ve aranabilirlik özelliklerinin tümü, tüm ekran biçimlerine ve çözünürlüklerine iyi bir sekilde uyum saglayan ölçeklenebilir çok çözünürlüklü bir çözümle saglanir. Web yazi tiplerini kullanmaktan korkmayin! 

Bununla birlikte, denenmemis bir uygulama büyük indirmelere ve gereksiz gecikmelere yol açabilir. Bu noktada, optimizasyon araç takimimizin tozunu almamiz ve yazi tipi varliklarini ve sayfalarimizda nasil getirilip kullanilacaklarini kendimiz optimize ederek tarayiciya yardimci olmamiz gerekir. 

1. **Yazi tipi kullaniminizi denetleyin ve izleyin:** Sayfalarinizda çok sayida yazi tipi kullanmayin ve her bir yazi tipi için kullanilan çesitlerin sayisini en aza indirin. Bu, kullanicilariniz için daha tutarli ve daha hizli bir deneyim saglamaniza yardimci olur.
2. **Yazi tipi kaynaklarinizin alt kümesini olusturun:** Yalnizca belirli bir sayfa için gereken glifleri saglamak üzere birçok yazi tipinin alt kümesi olusturulabilir veya yazi tipleri birden çok unicode araligina bölünebilir. Bu, dosya boyutunu küçültür ve kaynagin indirme hizini iyilestirir. Ancak, alt kümeleri tanimlarken yazi tipi yeniden kullanimi optimizasyonuna dikkat edin. Her sayfada farkli, ancak örtüsen bir karakter kümesini indirmek istemezsiniz. Iyi bir uygulama yazili metne dayali alt küme olusturmaktir (ör. Latin, Kiril vb.).
3. **Her bir tarayiciya optimize edilmis yazi tipi biçimleri saglayin:** Her bir yazi tipi WOFF2, WOFF, EOT ve TTF biçimlerinde saglanmalidir. EOT ve TTF biçimleri varsayilan olarak sikistirilmadigindan, bu biçimlere GZIP sikistirmasi uyguladiginizdan emin olun.
4. **Yeniden dogrulama ve en uygun önbellege alma politikalarini belirtin:** Yazi tipleri, sik güncellenmeyen statik kaynaklardir. Farkli sayfalar arasinda verimli yazi tipi yeniden kullanimina imkan tanimak için sunucularinizin uzun ömürlü bir max-age zaman damgasi ve bir yeniden dogrulama belirteci sagladigindan emin olun.
5. **Kritik Olusturma Yolunu optimize etmek için Yazi Tipi Yükleme API'sini kullanin:** Varsayilan geç yükleme davranisi, metin olusturmasini geciktirebilir. Yazi Tipi Yükleme API'si, belirli yazi tipleri için bu davranisi geçersiz kilmamiza ve sayfadaki farkli içerik için özel olusturma ve zaman asimi stratejileri belirtmemize olanak tanir. API'yi desteklemeyen eski tarayicilarda, webfontloader JavaScript kitapligini veya CSS satir içinde kullanim stratejisini kullanabilirsiniz.


