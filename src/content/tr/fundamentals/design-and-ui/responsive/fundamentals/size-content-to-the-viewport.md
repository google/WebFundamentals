project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web'in çogunlugu bu çoklu cihaz deneyimleri için optimize edilmemistir. Sitenizin mobil cihazlarda, masaüstü bilgisayarlarda veya ekrani olan herhangi bir seyde çalismasini saglamak için gereken temel bilgileri edinin.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Içerigi görünüme göre boyutlandirma {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Hem masaüstü hem de mobil cihazlarda kullanicilar web sitelerini yatay olarak degil, dikey olarak kaydirmaya aliskindir ve kullaniciyi, tüm sayfayi görmesi için yatay olarak kaydirmaya veya uzaklastirmaya zorlamak kötü bir kullanici deneyimiyle sonuçlanir.


## TL;DR {: .hide-from-toc }
- Genis sabit genislikli ögeler kullanmayin.
- Içerigin iyi bir sekilde olusturulmasi belirli bir görüntü alani genisligine bagli olmamalidir.
- Küçük ve büyük ekranlar için farkli tasarimlar uygulamak için CSS medya sorgularini kullanin.


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



