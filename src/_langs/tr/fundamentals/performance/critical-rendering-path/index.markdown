---
layout: section
title: "Kritik Olusturma Yolu"
description: "Kullanicinin bir sayfada gerçeklestirmek istedigi birincil eylemle ilgili içerigin görüntülenmesine öncelik taniyarak kritik olusturma yolunu optimize etme."
introduction: "Kritik olusturma yolunun optimize edilmesi sayfalarimizin performansini iyilestirme açisindan kritik öneme sahiptir: Amacimiz, kullanicinin bir sayfada gerçeklestirmek istediginiz birincil eylemle ilgili içerige öncelik tanimak ve bu içerigi görüntülemektir."
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 1
id: critical-rendering-path
collection: performance
authors:
  - ilyagrigorik
---
{% wrap content%}

Hizli bir web deneyiminin saglanmasi tarayicinin çok çalismasini gerektirir. Bu çalismanin çogu web gelistiricileri olarak bizden gizlenir: Biz biçimlendirmeyi yazariz ve ekranda güzel görünümlü bir sayfa görüntülenir. Ancak, tarayici HTML, CSS ve JavaScript kodumuzu tüketmeden ekrandaki olusturulmus piksellere tam olarak nasil gider?

Performans için optimize etme; HTML, CSS ve JavaScript baytlarinin alinmasindan bunlari olusturulan piksellere döndürmek için gerekli islemenin yapilmasina kadar aradaki bu adimlarda neler oldugunu anlamayla ilgilidir. Bu adimlar **kritik olusturma yolu**`nu olusturur.

<img src="images/progressive-rendering.png" class="center" alt="asamali sayfa olusturma">

Kritik olusturma yolunu optimize ederek, sayfalarimizin ilk olusturma süresini önemli ölçüde iyilestirebiliriz. Bunun öteside, kritik olusturma yolunun anlasilmasi, iyi performans gösteren etkilesimli uygulamalarin olusturulmasi için bir temel görevi de görür. Etkilesimli güncellemelerin islenmesine iliskin sürecin, sürekli bir döngü içinde ve ideal olarak saniyede 60 kare hizda yapildigi anlasilmistir! Ancak, simdilik aceleci davranip hata yapmayalim. Ilk olarak, basit bir sayfayi görüntülerken tarayicinin nasil ilerledigine dair hizli, en bastan baslayan bir genel bakisa göz atalim.

{% endwrap%}

