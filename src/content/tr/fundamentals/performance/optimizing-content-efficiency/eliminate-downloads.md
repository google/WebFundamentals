project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En hızlı ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktır. Kaynaklarınızı yakın zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynağın daha iyi bir kullanici deneyimi sağlamaya yardımcı olduğundan emin olmak için periyodik bir şekilde yapmalısınız.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-03-31 #}

# Gereksiz indirmeleri çıkarma {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



En hızlı ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktır. Kaynaklarınızı yakın zamanda denetlediniz mi? Denetlemelisiniz ve bunu, her bir kaynağın daha iyi bir kullanıcı deneyimi sağlamaya yardımcı olduğundan emin olmak için periyodik bir şekilde yapmalısınız.


### TL;DR {: .hide-from-toc }
- Sayfalarınızdaki kendi varlıklarınızın ve üçüncü taraf varlıklarının tamamının envanterini yapın
- Her bir varlığın performansini ölçün: Değeri ve teknik performansi
- Kaynaklarin yeterli deger sağlayıp saglamadigini belirleyin


En hızlı ve en iyi optimize edilmiş kaynak, gönderilmemiş kaynaktır. Elbette, bu açık bir ifadeye benzeyebilir, ancak uygulamada sık sık göz ardı edilir: Bir performans mühendisi olarak, her zaman eleştirel bir gözle uygulamanizdan gereksiz kaynaklari çıkarma fırsatları sağlamak sizin işinizdir. Ekibinizle dolaylı ve açık varsayımlari sorgulamak ve periyodik olarak bunları yeniden gündeme getirmek iyi bir uygulamadir. Birkaç örnek:

* X kaynağını her zaman sayfalarımıza dahil ettik, ancak bunu indirip görüntülemenin maliyeti kullanıcıya sağladığı degeri karşılıyor mu? Degerini ölçüp kanıtlayabilir miyiz?
* Kaynak, özellikle de bir üçüncü taraf kaynağıysa tutarli performans sağlıyor mu? Bu kaynak kritik yolda mı veya olmasi gerekir mi? Kaynak kritik yoldaysa sitemiz için tek hata noktasi olabilir mi? Diğer bir deyişle, kaynak kullanilamaz hâle gelirse sayfalarımızın performansini ve kullanici deneyimini etkiler mi?
* Bu kaynagin bir SLA'ya ihtiyacı var mi veya kaynak SLA'ya sahip mi? Bu kaynak; sıkıştırma, önbelleğe alma gibi performans en iyi uygulamalarına uygun mu?

Sıklıkla sayfalarimiz gereksiz veya daha kötüsü, ziyaretçiye veya barındırıldıkları siteye fazla deger sağlamadan sayfa performansini olumsuz etkileyen kaynaklar içerir. Bu, hem birinci taraf hem de üçüncü taraf kaynaklar ve widget'lar için eşit derecede geçerlidir:

* A Sitesi, ziyaretçilerin bir hızlı tıklamayla birden çok fotografi önizlemelerine olanak tanımak için ana sayfasında bir fotograf döngüsü görüntülemeye karar vermiştir. Sayfa yüklendiginde tüm fotograflar yüklenecek ve kullanıcı tarafından ilerletilecektir.
    * **Soru:** Kaç kullanıcının döngüde birden çok fotograf görüntüledigini ölçtünüz mü? Çogu ziyaretçi tarafından hiçbir zaman görüntülenmeyecek gereksiz kaynakları indirerek yüksek bir ek yük getiriyor olabilirsiniz.
* B Sitesi, ilgili içerigi görüntülemek, sosyal etkileşimi iyileştirmek veya başka bir hizmet saglamak için bir üçüncü taraf widget'i yüklemeye karar vermistir.
    * **Soru:** Kaç ziyaretçinin widget'i kullandığını veya widget'in sagladigi içerigi tıkladığını izlediniz mi? Bu widget'in oluşturdugu etkileşim ek yükü doğrulamak için yeterli mi?

Görebileceginiz gibi gereksiz indirmeleri çıkarma önemsiz bir ifade gibi görünse de, uygulamada karar vermek için genellikle dikkatlice uzun süre düşünmeyi ve ölçüm yapmayı gerektiren bir şeydir. Aslında, en iyi sonuçlar için periyodik olarak envanter yapmalı ve sayfalarınızdaki her varlıkla ilgili olarak bu soruları yeniden sormalısınız.



