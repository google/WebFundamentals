---
title: "Görüntü alanini ayarlama"
description: "Web`in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin."
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
  Çesitli cihazlar için optimize edilmis sayfalar, dokümanin basinda bir meta görüntü alani ögesi içermelidir.  Meta görüntü alani etiketi, tarayiciya sayfanin boyutlarini ve ölçeklemesini nasil kontrol edecegine iliskin talimatlar verir.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

En iyi deneyimi saglama çabasiyla mobil tarayicilar, sayfayi bir masaüstü ekran genisliginde (genellikle 980 piksel civarinda, ancak bu deger cihazlar arasinda degisiklik gösterir) olusturur ve daha sonra, yazi tipi boyutlarini artirip içerigi ekrana sigdirmak için ölçekleyerek içerigin daha iyi görünmesine çalisir.  Kullanicilar için bu, yazi tipi boyutlarinin tutarsiz görünebilmesi ve içerigi görmek ve içerikle etkilesimde bulunabilmek için ekrana iki kez hafifçe vurmalari veya parmaklarini sikistirarak zum yapmak zorunda kalmalari anlamina gelir.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


`width=device-width` meta görüntü alani degeri kullanildiginda, cihazdan bagimsiz piksel sayisi kullanilarak sayfanin ekranin genisligiyle eslestirilmesi talimati verilir. Bu, ister küçük bir cep telefonunda isterse de genis bir masaüstü monitöründe olusturulmus olsun, sayfanin içerigi yeniden düzenleyerek farkli ekran boyutlariyla eslestirmesine olanak tanir.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Görüntü alani ayari olmayan sayfa">
      Örnege bakin
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Görüntü alani ayari olan sayfa">
      Örnege bakin
    {% endlink_sample %}
  </div>
</div>

Bazi tarayicilar, yatay moda dönerken sayfanin genisligini sabit tutar ve ekrani doldurmak için yeniden düzenlemek yerine zum yapar. `initial-scale=1` özelligi eklendiginde, tarayiciya CSS pikselleri ile cihazdan bagimsiz pikseller arasinda, cihazin yönü ne olursa olsun 1:1 iliski olusturmasi talimati verilir ve sayfanin tam yatay genislikten yararlanmasi saglanir.

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## Erisilebilir görüntü alani saglama

Bir `baslangiç ölçegi` ayarlamaya ek olarak, görüntü alaninda asagidaki özellikleri de ayarlayabilirsiniz:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Bunlar ayarlandiklarinda, kullanicinin görüntü alanini zum yapma yetenegini devre disi birakip erisilebilirlik sorunlarina neden olabilir.



