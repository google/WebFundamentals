---
title: "Gereksiz indirmeleri çikarma"
description: "En hizli ve en iyi optimize edilmis kaynak, gönderilmemis kaynaktir. Kaynaklarinizi yakin zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynagin daha iyi bir kullanici deneyimi saglamaya yardimci oldugundan emin olmak için periyodik bir sekilde yapmalisiniz."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Sayfalarinizdaki kendi varliklarinizin ve üçüncü taraf varliklarinin tamaminin envanterini yapin"
    - "Her bir varligin performansini ölçün: Degeri ve teknik performansi"
    - "Kaynaklarin yeterli deger saglayip saglamadigini belirleyin"
---

<p class="intro">
  En hizli ve en iyi optimize edilmis kaynak, gönderilmemis kaynaktir. Kaynaklarinizi yakin zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynagin daha iyi bir kullanici deneyimi saglamaya yardimci oldugundan emin olmak için periyodik bir sekilde yapmalisiniz.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

En hizli ve en iyi optimize edilmis kaynak, gönderilmemis kaynaktir. Elbette, bu açik bir ifadeye benzeyebilir, ancak uygulamada sik sik göz ardi edilir: Bir performans mühendisi olarak, her zaman elestirel bir gözle uygulamanizdan gereksiz kaynaklari çikarma firsatlari saglamak sizin isinizdir. Ekibinizle dolayli ve açik varsayimlari sorgulamak ve periyodik olarak bunlari yeniden gündeme getirmek iyi bir uygulamadir. Birkaç örnek:

* X kaynagini her zaman sayfalarimiza dahil ettik, ancak bunu indirip görüntülemenin maliyeti kullaniciya sagladigi degeri karsiliyor mu? Degerini ölçüp kanitlayabilir miyiz?
* Kaynak, özellikle de bir üçüncü taraf kaynagiysa tutarli performans sagliyor mu? Bu kaynak kritik yolda mi veya olmasi gerekir mi? Kaynak kritik yoldaysa sitemiz için tek hata noktasi olabilir mi? Diger bir deyisle, kaynak kullanilamaz hale gelirse sayfalarimizin performansini ve kullanici deneyimini etkiler mi?
* Bu kaynagin bir SLA'ya ihtiyaci var mi veya kaynak SLA'ya sahip mi? Bu kaynak; sikistirma, önbellege alma gibi performans en iyi uygulamalarina uygun mu?

Siklikla sayfalarimiz gereksiz veya daha kötüsü, ziyaretçiye veya barindirildiklari siteye fazla deger saglamadan sayfa performansini olumsuz etkileyen kaynaklar içerir. Bu, hem birinci taraf hem de üçüncü taraf kaynaklar ve widget'lar için esit derecede geçerlidir:

* A Sitesi, ziyaretçilerin bir hizli tiklamayla birden çok fotografi önizlemelerine olanak tanimak için ana sayfasinda bir fotograf döngüsü görüntülemeye karar vermistir. Sayfa yüklendiginde tüm fotograflar yüklenecek ve kullanici tarafindan ilerletilecektir.
    * **Soru:** Kaç kullanicinin döngüde birden çok fotograf görüntüledigini ölçtünüz mü? Çogu ziyaretçi tarafindan hiçbir zaman görüntülenmeyecek gereksiz kaynaklari indirerek yüksek bir ek yük getiriyor olabilirsiniz.
* B Sitesi, ilgili içerigi görüntülemek, sosyal etkilesimi iyilestirmek veya baska bir hizmet saglamak için bir üçüncü taraf widget'i yüklemeye karar vermistir.
    * **Soru:** Kaç ziyaretçinin widget'i kullandigini veya widget'in sagladigi içerigi tikladigini izlediniz mi? Bu widget'in olusturdugu etkilesim ek yükü dogrulamak için yeterli mi?

Görebileceginiz gibi gereksiz indirmeleri çikarma önemsiz bir ifade gibi görünse de, uygulamada karar vermek için genellikle dikkatlice uzun süre düsünmeyi ve ölçüm yapmayi gerektiren bir seydir. Aslinda, en iyi sonuçlar için periyodik olarak envanter yapmali ve sayfalarinizdaki her varlikla ilgili olarak bu sorulari yeniden sormalisiniz.



