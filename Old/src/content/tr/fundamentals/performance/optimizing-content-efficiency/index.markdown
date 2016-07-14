---
title: "Içerik Verimliligini Optimize Etme"
description: "Her bir uygulama tarafindan indirilen veri miktari artmaya devam etmektedir. Harika bir performans saglamak için her baytin teslimini optimize etmemiz gerekir!"
updated_on: 2014-04-29
---

<p class="intro">
  Web uygulamalarimiz kapsam, tutku ve islevsellik açisindan büyümeye devam eder. Bu iyi bir seydir. Ancak, daha zengin bir web'e dogru araliksiz yapilan bu yürüyüs baska bir trendi de beraberinde getirir: Her bir uygulama tarafindan indirilen veri miktari sabit bir hizla artmaya devam etmektedir. Harika bir performans saglamak için her bayt verinin teslimini optimize etmemiz gerekir!
</p>


Modern bir web uygulamasi nasil görünür? [HTTP Archive](http://httparchive.org/), bu sorunun yanitini bulmamiza yardim edebilir. Proje, en popüler siteleri (Aleksa Ilk 1M listesindeki 300.000'den fazla site) periyodik bir sekilde tarayip kaydederek ve bagimsiz her bir hedefe iliskin kaynak sayisi, içerik türleri ve diger meta verilerle ilgili analizleri toplayarak web'in nasil olusturuldugunu izlemektedir.

<img src="images/http-archive-trends.png" class="center" alt="HTTP Archive trendleri">

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th></th>
    <th>%50</th>
    <th>%75</th>
    <th>%90</th>
  </tr>
</thead>
<tr>
  <td data-th="tür">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="tür">Resimler</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="tür">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="tür">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="tür">Diger</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="tür"><strong>Toplam</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Yukaridaki veriler, Ocak 2013 ile Ocak 2014 arasinda web'deki popüler hedefler için indirilen bayt sayisindaki büyüme trendini yakalar. Elbette, her site ayni hizda büyümez veya ayni miktarda veri gerektirmez; bu yüzden dagitim içindeki farkli yüzdelik dilimleri vurguladik: 50 (orta), 75 ve 90.

2014'ün basinda ortalama bir site, toplam 1054 KB bayt aktaran 75 istekten olusuyordu ve toplam bayt (ve istek) sayisi önceki yil boyunca sabit bir hizda büyüdü. Tek basina bu çok sasirtici olmamakla birlikte önemli performans çikarimlari tasir: Evet, Internet hizlari giderek yükseltmektedir, ancak farkli ülkelerde farkli hizlarda artar ve birçok kullanici, özellikle mobil kullanim açisindan hâlâ veri sinirlamalarina ve ölçülen, pahali tarifelere tabidir.

Masaüstü benzerlerinden farkli olarak, web uygulamalari ayri bir yükleme süreci gerektirmez: URL'yi girersiniz ve uygulama çalismaya hazirdir. Bu, web'in önemli bir özelligidir. Bununla birlikte, bunun olmasi için **genellikle çesitli kaynaklari onlarca, hatta bazen yüzlerce kez getirmemiz gerekir. Bunlarin tümü megabaytlarca veri eder ve hedefledigimiz aninda web deneyimini kolaylastirmak için yüzlerce milisaniyede bir araya getirilmeleri gerekir.**

Bu gereksinimlerin isiginda bir aninda web deneyimini gerçeklestirmek küçük bir is degildir, bu yüzden de içerik verimliliginin optimize edilmesi kritik öneme sahiptir: Gereksiz indirmelerin çikarilmasi, çesitli sikistirma teknikleriyle her bir kaynagin aktarim kodlamasinin optimize edilmesi ve yedek indirmeleri ortadan kaldirmak için mümkün oldugunda önbellege almadan yararlanilmasi.


