---
title: "Kritik Olusturma Yolunu Optimize Etme"
description: "Ilk olusturmada mümkün olan en hizli süreyi saglamak için üç degiskeni optimize etmemiz gerekir: Kritik kaynaklarin sayisini en aza indirme, kritik baytlarin sayisini en aza indirme ve kritik yol uzunlugunu en aza indirme."
updated_on: 2014-04-28
---

Ilk olusturmada mümkün olan en hizli süreyi saglamak için üç degiskeni optimize etmemiz gerekir:

* **Kritik kaynaklarin sayisini en aza indirme.**
* **Kritik baytlarin sayisini en aza indirme.**
* **Kritik yol uzunlugunu en aza indirme.**

Kritik kaynak, sayfanin ilk olusturmasini engelleyebilecek herhangi bir kaynaktir. Bu kaynaklardan sayfada ne kadar az olursa, tarayicinin içerigi ekrana getirmek için yapmasi gereken is ve CPU ile diger kaynaklar için yapilan yarisma da o kadar azalir.

Benzer bir sekilde, tarayicinin indirmesi gereken kritik bayt sayisi azaldikça, içerigi daha hizli islemeye geçebilir ve içerigi ekranda gösterebilir. Bayt sayisini azaltmak için kaynak sayisini azaltabiliriz (kaldirabilir veya kritik olmaktan çikarabiliriz) ve her bir kaynagi sikistirarak ve optimize ederek aktarim boyutunu en aza indirdigimizden emin olabiliriz.

Son olarak, kritik yol uzunlugu sayfanin gerektirdigi tüm kritik kaynaklar ve bunlarin bayt boyutu arasindaki bir bagimlilik grafigi islevidir: Bazi kaynak indirmeleri yalnizca önceki bir kaynak islendiyse baslatilabilir ve kaynak büyüdükçe, kaynagi indirmek için gerçeklestirilmesi gereken gidis gelis sayisi artar.

Diger bir deyisle, kaynak sayisi, bunlarin bayt boyutu ve kritik yol uzunlugu birbiriyle iliskilidir, ancak tam olarak ayni degildir. Örnegin, kritik kaynaklarin sayisini azaltamayabilir veya kritik yol uzunlugunu kisaltamayabilirsiniz, ancak kritik baytlarin sayisini azaltmak yine de önemli bir optimizasyondur ve bu unsurlar için de geçerlidir.

**Kritik olusturma yolunu optimize etmeye iliskin adimlarin genel sirasi söyledir:**

1. Kritik yolunuzu analiz etme ve tanimlama: kaynak sayisi, bayt sayisi, uzunluk.
2. Kritik kaynaklarin sayisini en aza indirme: çikarma, indirilmelerini erteleme, zaman uyumsuz olarak isaretleme vb.
3. Kalan kritik kaynaklarin yüklenme siralamasini optimize etme: kritik yol uzunlugunu kisaltmak için tüm kritik varliklari mümkün oldugunca erken indirmek istersiniz.
4. Indirme süresini azaltmak için kritik bayt sayisini optimize edin (gidis gelis sayisi).



