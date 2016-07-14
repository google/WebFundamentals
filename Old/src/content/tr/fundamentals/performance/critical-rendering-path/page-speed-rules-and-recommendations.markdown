---
title: "PageSpeed Kurallari ve Önerileri"
description: "Baglamla ilgili PageSpeed Insights kurallari: Kritik Olusturma Yolunu optimize neye önem verilmeli ve neden."
updated_on: 2014-04-28
---
<p class="intro">
  Baglamla ilgili PageSpeed Insights kurallari: Kritik Olusturma Yolunu optimize neye önem verilmeli ve neden.
</p>

## Olusturmayi engelleyen JavaScript'i ve CSS'yi çikarma

Ilk olusturmada en hizli süreyi saglamak için sayfadaki kritik kaynaklarin sayisini en aza indirmek ve (mümkün oldugunda) bunlari çikarmak, indirilen kritik bayt sayisini en aza indirmek ve kritik yol uzunlugunu optimize etmek istersiniz.

## JavaScript Kullanimini Optimize Etme

JavaScript kaynaklari, _async_ olarak isaretlenmezlerse veya bir özel JavaScript snippet'i araciligiyla eklenmezlerse varsayilan olarak ayristiriciyi engellerler. Ayristiriciyi engelleyen JavaScript, tarayiciyi CSSOM'yi beklemeye ve DOM yapimini duraklatmaya zorlar; buna karsilik, ilk olusturmanin süresi önemli ölçüde gecikebilir.

### **Zaman uyumsuz JavaScript kaynaklari tercih edin**

Zaman uyumsuz kaynaklar doküman ayristiricisinin engellemesini kaldirir ve tarayicinin, komut dosyasini yürütmeden önce CSSOM'yi engellemekten kaçinmasina olanak tanir. Genellikle komut dosyasi zaman uyumsuz yapilabilirse, bu komut dosyasinin ilk olusturma için gerekli olmadigi anlamina da gelir. Zaman uyumsuz komut dosyalarini ilk olusturmadan sonra yüklemeyi düsünebilirsiniz.

### **JavaScript'i ayristirmayi erteleyin**

Tarayicinin sayfayi olustururken gerçeklestirmesi gereken is miktarini en aza indirmek üzere ilk olusturmada görünür içerigin olusturulmasi için kritik ve gerekli olmayan komut dosyalari ertelenmelidir.

### **Uzun çalisan JavaScript'ten kaçinin**

Uzun çalisan JavaScript, tarayicinin DOM, CSSOM ve sayfayi olusturmasini engeller. Sonuç olarak, ilk olusturmada gerekli olmayan baslatma mantigi ve islevleri daha sonrasina ertelenmelidir. Uzun bir baslatma sirasinin çalistirilmasi gerekiyorsa tarayicinin diger olaylari da arada islemesine olanak tanimak için bunu, birkaç asamaya bölmeyi düsünebilirsiniz.

## CSS Kullanimini Optimize Etme

CSS, olusturma agacini olusturmak için gerekir ve JavaScript genellikle sayfanin ilk yapimi sirasinda CSS'yi engeller. Gerekli olmayan CSS'nin (ör. yazdirma ve diger medya sorgulari) kritik degil seklinde isaretlendiginden ve kritik CSS miktari ile bunu saglamak için gereken sürenin mümkün oldugunca küçük tutuldugundan emin olmalisiniz.

### **CSS'yi doküman basligina yerlestirin**

Tüm CSS kaynaklari, HTML dokümani içinde mümkün oldugunca erken belirtilmelidir. Böylece, tarayici `<link>` etiketlerini kesfedebilir ve CSS'ye iliskin istegi mümkün olan en kisa sürede gönderir.

### **CSS içe aktarmalarindan kaçinin**

CSS içe aktarma (@import) yönergesi, bir stil sayfasinin kurallari baska bir stil sayfasi dosyasina içe aktarabilmesini saglar. Ancak, bu yönergeler kritik yolda ek gidis gelislere neden olacagindan bu yönergelerden kaçinilmalidir: Içe aktarilan CSS kaynaklari, yalnizca @import kuralini içeren CSS stil sayfasinin kendisi alindiktan ve ayristirildiktan sonra kesfedilir.

### **Satir içi olusturmayi engelleyen CSS**

En iyi performans için kritik CSS'yi dogrudan HTML dokümaninda satir içine yerlestirmek isteyebilirsiniz. Bu, kritik yoldaki ek gidis gelisleri ortadan kaldirir ve dogru yapilirsa, yalnizca HTML'nin engelleyen kaynak oldugu bir `tek gidis gelislik` kritik yol uzunlugu saglamak için kullanilabilir.



