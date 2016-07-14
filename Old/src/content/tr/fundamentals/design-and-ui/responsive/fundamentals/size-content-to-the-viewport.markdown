---
title: "Içerigi görünüme göre boyutlandirma"
description: "Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin."
updated_on: 2014-04-30
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
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  Hem masaüstü hem de mobil cihazlarda kullanicilar web sitelerini yatay olarak degil, dikey olarak kaydirmaya aliskindir ve kullaniciyi, tüm sayfayi görmesi için yatay olarak kaydirmaya veya uzaklastirmaya zorlamak kötü bir kullanici deneyimiyle sonuçlanir.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

`Meta görüntü alani` etiketiyle bir mobil site gelistirirken yanlislikla belirtilen görünüme tam sigmayan sayfa içerigi olusturmak kolaydir. Örnegin, görüntü alanindan daha genis bir ene sahip olarak görüntülenen bir resim, görüntü alaninin yatay olarak kaydirilmasina neden olabilir. Bu içerigi, görüntü alaninin genisligi içine sigacak sekilde ayarlamaniz ve kullanicinin yatay olarak kaydirmak zorunda kalmamasini saglamaniz gerekir.

Ekran boyutlari ve CSS piksellerindeki genislik, cihazlar arasinda (ör. telefonlar ve tabletler arasinda, hatta farkli telefonlar arasinda bile) oldukça degistiginden, içerigin olusturulmasi için belirli bir görüntü alani temel alinmamalidir.

Sayfa ögeleri için genis mutlak CSS genisliklerinin ayarlanmasi (asagidaki örnekte oldugu gibi), dar bir cihazda (ör. iPhone gibi 320 CSS pikseli genisligi olan bir cihazda) `div` ögesinin görüntü alani için çok genis olmasina neden olur. Bunun yerine, `width: 100%` gibi göreli genislik degerleri kullanmayi düsünebilirsiniz.  Benzer bir sekilde, ögenin küçük ekranlarda görüntü alaninin disinda kalmasina neden olabilecek genis mutlak konumlandirma degerleri kullanmaktan kaçinin.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone'da 344 piksel sabit genislikli bir öge içeren sayfa.">
      Örnege bakin
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5'te 344 piksel sabit genislikli bir öge içeren sayfa.">
      Örnege bakin
    {% endlink_sample %}
  </div>
</div>



