---
title: "Biçimlendirme Içindeki Resimler"
description: "<code>img</code>, güçlü bir ögedir; içerigi indirir, kodunu çözer ve olusturur. Modern tarayicilar da çesitli resim biçimlerini destekler."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Resimlerin yanlislikla kapsayicidan tasmasini önlemek için göreli boyutlar kullanin."
    - "Cihaz özelliklerine bagli olarak farkli resimler belirtmek istediginizde (sanat yönetimi olarak da bilinir) <code>picture</code> ögesini kullanin."
    - "Farkli yogunluklar arasindan seçim yaparken, kullanilacak en iyi resimle ilgili olarak tarayiciya ipuçlari vermek için <code>img</code> ögesinin içinde <code>srcset</code> ve <code>x</code> tanimlayicisini kullanin."
notes:
  picture-support:
    - "<code>picture</code> ögesi, tarayicilarda kullanilmaya baslanmistir. Henüz tüm tarayicilarda kullanilmiyor olsa da, geriye dönük güçlü uyumlulugu ve <a href='http://picturefill.responsiveimages.org/'>Picturefill çoklu dolgusunu</a> kullanma olasiligi nedeniyle bu ögenin kullanilmasini öneririz. Daha ayrintili bilgi için <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> sitesine bakin."
  compressive:
    - "Daha fazla bellek gerektirmesi ve kod çözme maliyetlerinden dolayi sikistirma teknigini dikkatli kullanin.  Büyük resimleri küçük ekranlara sigdirmak üzere yeniden boyutlandirmak pahali bir islemdir ve özellikle hem bellegin hem de islemenin sinirli oldugu giris seviyesi cihazlarda zor olabilir."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  <code>img</code>, güçlü bir ögedir; içerigi indirir, kodunu çözer ve olusturur. Modern tarayicilar da çesitli resim biçimlerini destekler. Cihazlarda çalisan resimleri içerme, masaüstü için tasarimdan farkli degildir ve iyi bir deneyim olusturmak için yalnizca birkaç küçük degisikligin yapilmasi yeterlidir.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Resimler için göreli boyutlar kullanma

Resimlerin yanlislikla görüntü alanindan tasmalarini önlemek için resimlere iliskin genislikleri belirtirken göreli birimler kullanmayi unutmayin.  Örnegin, `width: 50%;`, resim genisliginin resmin içinde bulundugu ögenin (görüntü alaninin veya gerçek piksel boyutunun degil) %50'si kadar olmasina neden olur.

CSS, içerigin kapsayicisindan tasmasina izin verdiginden, resimlerin ve diger içerigin tasmasini önlemek için max-width: 100% ögesinin kullanilmasi gerekebilir.  Örnegin:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

`img` ögelerindeki `alt` özelligiyle anlamli açiklamalar sagladiginizdan emin olun; bunlar, ekran okuyuculara ve diger yardimci teknolojilere baglam saglayarak sitenizin daha erisilebilir hale gelmesine yardimci olur.

## `img` ögelerini yüksek DPI'ya sahip cihazlar için `srcset` özelligiyle gelistirme

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>srcset</code> özelligi, <code>img</code> ögesinin davranisini gelistirerek farkli cihaz özellikleri için birden çok resim dosyasi saglamayi kolaylastirir. CSS'de yerel olarak bulunan <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS islevine</a> benzer bir sekilde <code>srcset</code>, tarayicinin cihazin özelliklerine bagli olarak en iyi resmi seçmesine olanak tanir; örnegin, 2x bir ekranda 2x resim ve olasilikla ileride, sinirli bir bant genisligine sahip agdaki 2x cihazda 1x resim kullanma.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

`srcset` özelligini desteklemeyen tarayicilarda, tarayici `src` özelliginin belirttigi varsayilan resim dosyasini kullanir.  Yeteneklerden bagimsiz olarak tüm cihazlarda görüntülenebilecek bir 1x resmin her zaman dahil edilmesi bu nedenle önemlidir.  `srcset` desteklendiginde, virgülle ayrilmis resim/kosullar listesi herhangi bir istekte bulunulmadan önce ayristirilir ve yalnizca en uygun resim indirilip görüntülenir.

Kosullar, piksel yogunlugundan genislige ve yükseklige kadar her seyi içerebilir, ancak günümüzde yalnizca piksel yogunlugu iyi bir sekilde desteklenmektedir.  Geçerli davranisi ileride kullanilacak özelliklerle dengelemek için özellikte 2x resim saglamaya bagli kalin.

## `picture` özelligiyle duyarli resimlerde sanat yönetimi

Sanat yönetimi olarak da bilinen, cihaz özelliklerine göre resimlerin degismesi, picture ögesi kullanilarak gerçeklestirilebilir.  <code>picture</code> ögesi, bir resmin birden çok sürümünü cihaz boyutu, cihaz çözünürlügü, yön ve baska özelliklere göre saglamak için açiklayici bir çözüm tanimlar.

<img class="center" src="img/art-direction.png" alt="Sanat yönetimi örnegi"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>picture</code>·ögesi, bir resim kaynagi birden çok yogunluga sahip oldugunda veya bir duyarli tasarim, bazi ekran türlerinde farkli bir resmin kullanilmasini gerektirdiginde kullanilmalidir.  <code>video</code> ögesine benzeyen birden çok <code>source</code> ögesi eklenebilir; böylece, medya sorgularina veya resim biçimine bagli olarak farkli resim dosyalarini belirtmek mümkün hale gelir.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

Yukaridaki örnekte, tarayici genisligi en az 800 piksel olursa cihaz çözünürlügüne bagli olarak `head.jpg` veya `head-2x.jpg` kullanilir. Tarayici 450 piksel ile 800 piksel arasinda olursa, cihaz çözünürlügüne bagli olarak `head-small.jpg` veya `head-small-2x.jpg` kullanilir. 450 pikselin altindaki ekran genislikleri ve `picture` ögesinin desteklenmedigi yerlerde geriye dönük uyumluluk için tarayici, bunun yerine `img` ögesini olusturur ve bu öge her zaman koda dahil edilmelidir.

### Göreli boyuta sahip resimler

Resmin son boyutu bilinmediginde, resim kaynaklari için bir yogunluk tanimlayicisi belirtmek zor olabilir. ·  Bu özellikle, tarayicinin genisligine orantisal olarak uzayan ve tarayicinin boyutuna bagli olarak degisken olan resimler için geçerlidir.

Sabit resim boyutlari ve yogunluklari saglamak yerine, saglanan her bir resmin boyutu, resim ögesinin boyutuyla birlikte bir genislik tanimlayicisi eklenerek belirtilebilir. Bu, tarayicinin etkili piksel yogunlugunu otomatik olarak hesaplamasina ve indirilecek en iyi resmi seçmesine olanak tanir.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

Yukaridaki örnek, görüntü alani genisliginin yarisi kadar olan (`sizes='50vw'`) bir resim olusturur ve tarayicinin genisligi ile cihazin piksel oranina bagli olarak, tarayicinin tarayici penceresinin ne büyüklükte oldugundan bagimsiz olarak dogru resmi seçmesine olanak tanir.  Örnegin, asagidaki tabloda tarayicinin seçecegi resim gösterilmektedir:

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Tarayici genisligi">Tarayici genisligi</th>
      <th data-th="Cihaz piksel orani">Cihaz piksel orani</th>
      <th data-th="Kullanilan resim">Kullanilan resim</th>
      <th data-th="Etkili çözünürlük">Etkili çözünürlük</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tarayici genisligi">400 piksel</td>
      <td data-th="Cihaz piksel orani">1</td>
      <td data-th="Kullanilan resim"><code>200.png</code></td>
      <td data-th="Etkili çözünürlük">1x</td>
    </tr>
    <tr>
      <td data-th="Tarayici genisligi">400 piksel</td>
      <td data-th="Cihaz piksel orani">2</td>
      <td data-th="Kullanilan resim"><code>400.png</code></td>
      <td data-th="Etkili çözünürlük">2x</td>
    </tr>
    <tr>
      <td data-th="Tarayici genisligi">320 piksel</td>
      <td data-th="Cihaz piksel orani">2</td>
      <td data-th="Kullanilan resim"><code>400.png</code></td>
      <td data-th="Etkili çözünürlük">2,5x</td>
    </tr>
    <tr>
      <td data-th="Tarayici genisligi">600 piksel</td>
      <td data-th="Cihaz piksel orani">2</td>
      <td data-th="Kullanilan resim"><code>800.png</code></td>
      <td data-th="Etkili çözünürlük">2,67x</td>
    </tr>
    <tr>
      <td data-th="Tarayici genisligi">640 piksel</td>
      <td data-th="Cihaz piksel orani">3</td>
      <td data-th="Kullanilan resim"><code>1000.png</code></td>
      <td data-th="Etkili çözünürlük">3,125x</td>
    </tr>
    <tr>
      <td data-th="Tarayici genisligi">1100 piksel</td>
      <td data-th="Cihaz piksel orani">1</td>
      <td data-th="Kullanilan resim"><code>1400.png</code></td>
      <td data-th="Etkili çözünürlük">1,27x</td>
    </tr>
  </tbody>
</table>


### Duyarli resimlerde kesme noktalarini dikkate alma

Birçok durumda, resmin boyutu sitenin yerlesim kesme noktalarina bagli olarak degisebilir.  Örnegin, küçük bir ekranda, resmin görüntü alaninin tam genisligine uzamasini isterken, genis ekranlarda yalnizca küçük bir kismi kaplamasini isteyebilirsiniz.  

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

Yukaridaki örnekte bulunan `sizes` özelligi, resmin boyutunu belirtmek için çesitli medya sorgulari kullanir.  Tarayici genisligi 600 pikselden büyük oldugunda resim, görüntü alaninin genisliginin %25'i kadar olurken, tarayici genisligi 500 piksel ile 600 piksel araliginda oldugunda görüntü alani genisliginin %50'si ve 500 pikselin altindaki tarayici genisliklerinde tam genislikte olacaktir.


## Ürün resimlerini genisletilebilir yapma

Müsteriler, satin aldiklari ürünleri görmek ister.  Perakende satis sitelerinde, kullanicilar ayrintilara daha iyi bakmak için ürünlerin yüksek çözünürlüklü yakindan çekilmis resimlerini görüntüleyebilmeyi bekler ve bunu yapamadiklarinda [çalisma katilimcilari](/web/fundamentals/principles/research-study.html) hayal kirikligi yasarlar.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Genisletilebilir ürün resminin bulundugu J. Crew web sitesi">
  <figcaption>J. Crew'in genisletilebilir ürün resmi bulunan web sitesi.</figcaption>
</figure>

J. Crew sitesinde hafifçe vurulabilir, genisletilebilir resimlere iyi bir örnek saglanmaktadir. Kaybolan bir yer paylasimi, hafifçe vurulabilecek bir resmin oldugunu ve ince ayrintilarin görülebildigi zum yapilmis bir resmin saglanacagini belirtir.


## Diger resim teknikleri

### Sikistirilabilir Resimler

[sikistirilabilir resim
teknigi](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview), cihazin yetenekleri ne olursa olsun tüm cihazlara son derece sikistirilmis bir 2x resim sunar.  Resmin türüne ve sikistirma düzeyine bagli olarak resim kalitesi degismis görünmeyebilir, ancak dosya boyutu önemli ölçüde düser.

{% link_sample _code/compressive.html %}
      Örnege bakin
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript resim degisimi

JavaScript resim degisimi, cihazin yeteneklerini kontrol ederve `dogru seyi yapar`. Cihaz piksel oranini `window.devicePixelRatio` araciligiyla belirleyebilir, ekran genisligini ve yüksekligini alabilir ve `navigator.connection` araciligiyla veya sahte bir istek yayinlayarak ag baglantisi dinlemesi bile yapabilirsiniz. Tüm bu bilgileri topladiktan sonra, hangi resmin yüklenecegine karar verebilirsiniz.

Bu yaklasimin bir büyük olumsuz yönü de JavaScript'in kullanilmasi nedeniyle ileri bakma ayristiricisinin isi bitinceye kadar resim yüklemesini geciktireceginiz anlamina gelir. Bu da `pageload` etkinligi baslamadan resimlerin indirilmeye bile baslanmayacak olmasi demektir. Buna ek olarak, tarayici muhtemelen hem 1x hem de 2x resimleri indirecek, dolayisiyla sayfa agirligi artmis olacaktir.



