project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En hizli ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktir. Kaynaklarinizi yakin zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynağın daha iyi bir kullanici deneyimi saglamaya yardimci oldugundan emin olmak için periyodik bir şekilde yapmalisiniz.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-03-31 #}

# Gereksiz indirmeleri çıkarma {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



En hizli ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktır. Kaynaklarınızı yakın zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynağın daha iyi bir kullanici deneyimi saglamaya yardimci oldugundan emin olmak için periyodik bir şekilde yapmalisiniz.


### TL;DR {: .hide-from-toc }
- Sayfalarinizdaki kendi varlıklarınızın ve üçüncü taraf varliklarinin tamamının envanterini yapın
- Her bir varlığın performansini ölçün: Değeri ve teknik performansi
- Kaynaklarin yeterli deger saglayip saglamadigini belirleyin


En hizli ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktir. Elbette, bu açık bir ifadeye benzeyebilir, ancak uygulamada sık sık göz ardı edilir: Bir performans mühendisi olarak, her zaman eleştirel bir gözle uygulamanizdan gereksiz kaynaklari çıkarma fırsatlari saglamak sizin işinizdir. Ekibinizle dolayli ve açık varsayımlari sorgulamak ve periyodik olarak bunlari yeniden gündeme getirmek iyi bir uygulamadir. Birkaç örnek:

* X kaynagini her zaman sayfalarimiza dahil ettik, ancak bunu indirip görüntülemenin maliyeti kullaniciya sagladigi degeri karşılıyor mu? Degerini ölçüp kanıtlayabilir miyiz?
* Kaynak, özellikle de bir üçüncü taraf kaynağıysa tutarli performans sagliyor mu? Bu kaynak kritik yolda mi veya olmasi gerekir mi? Kaynak kritik yoldaysa sitemiz için tek hata noktasi olabilir mi? Diğer bir deyişle, kaynak kullanilamaz hâle gelirse sayfalarımızın performansini ve kullanici deneyimini etkiler mi?
* Bu kaynagin bir SLA'ya ihtiyaci var mi veya kaynak SLA'ya sahip mi? Bu kaynak; sıkıştırma, önbelleğe alma gibi performans en iyi uygulamalarina uygun mu?

Sıklıkla sayfalarimiz gereksiz veya daha kötüsü, ziyaretçiye veya barındırıldıkları siteye fazla deger saglamadan sayfa performansini olumsuz etkileyen kaynaklar içerir. Bu, hem birinci taraf hem de üçüncü taraf kaynaklar ve widget'lar için eşit derecede geçerlidir:

* A Sitesi, ziyaretçilerin bir hızlı tıklamayla birden çok fotografi önizlemelerine olanak tanimak için ana sayfasinda bir fotograf döngüsü görüntülemeye karar vermistir. Sayfa yüklendiginde tüm fotograflar yüklenecek ve kullanıcı tarafindan ilerletilecektir.
    * **Soru:** Kaç kullanicinin döngüde birden çok fotograf görüntüledigini ölçtünüz mü? Çogu ziyaretçi tarafindan hiçbir zaman görüntülenmeyecek gereksiz kaynaklari indirerek yüksek bir ek yük getiriyor olabilirsiniz.
* B Sitesi, ilgili içerigi görüntülemek, sosyal etkilesimi iyilestirmek veya başka bir hizmet saglamak için bir üçüncü taraf widget'i yüklemeye karar vermistir.
    * **Soru:** Kaç ziyaretçinin widget'i kullandigini veya widget'in sagladigi içerigi tikladigini izlediniz mi? Bu widget'in olusturdugu etkilesim ek yükü dogrulamak için yeterli mi?

Görebileceginiz gibi gereksiz indirmeleri çikarma önemsiz bir ifade gibi görünse de, uygulamada karar vermek için genellikle dikkatlice uzun süre düsünmeyi ve ölçüm yapmayi gerektiren bir şeydir. Aslında, en iyi sonuçlar için periyodik olarak envanter yapmali ve sayfalarinizdaki her varlikla ilgili olarak bu sorulari yeniden sormalısınız.



