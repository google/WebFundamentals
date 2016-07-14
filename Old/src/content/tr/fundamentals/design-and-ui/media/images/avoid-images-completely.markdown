---
title: "Resimlerden tamamiyla kaçinin"
description: "Bazen en iyi resim aslinda hiç resim olmamasidir. Mümkün oldugunda, ayni veya benzer islevsellikleri saglamak için tarayicinin yerel yeteneklerini kullanin."
updated_on: 2014-06-10
key-takeaways:
  kaçinin-images:
    - "Mümkün oldugunda resim kullanmaktan kaçinin; bunun yerine, gölgeler, renk geçisleri, yuvarlanmis köseler ve daha fazlasi için tarayici yeteneklerinden yararlanin."
---

<p class="intro">
  Bazen en iyi resim aslinda hiç resim olmamasidir. Mümkün oldugunda, ayni veya benzer islevsellikleri saglamak için tarayicinin yerel yeteneklerini kullanin. Önceden resimler gerekliydi, ancak artik tarayicilar görselleri olusturabilir.   Bu, tarayicilarin artik ayri resim dosyalari indirmelerine gerek olmadigi anlamina gelir ve garip sekilde ölçeklenmis resimlerin kullanilmasini önler.  Simgeler, unicode veya özel simge yazi tipleri kullanilarak olusturulabilir.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Resimlerin içine yerlestirilmis metin yerine metinleri biçimlendirme içine yerlestirin

Mümkün oldugunda, metin bir metin olmali ve örnegin basliklar için resimlerin kullanilmasi veya telefon numaralari veya adresler gibi iletisim bilgilerinin dogrudan resimlerin içine yerlestirilmesi gibi resimlerin içine yerlestirilmemelidir.  Bu, kullanicilarin bilgileri kopyalayip yapistirabilmesini engeller, ekran okuyucularin bilgilere erisememesine neden olur ve duyarli degildir.  Bunun yerine, metni biçimlendirmenizin içine yerlestirin ve gerekiyorsa ihtiyaç duydugunuz stili gerçeklestirmek için web yazi tiplerini kullanin.

## Resimlerin yerini almasi için CSS'yi kullanma

Modern tarayicilar, önceden resimleri gerektiren stiller olusturmak için CSS özelliklerini kullanabilir.  Örnegin, karmasik renk geçisleri <code>background</code>; gölgeler <code>box-shadow</code> özelligi kullanilarak olusturulabilir ve yuvarlanmis köseler <code>border-radius</code> özelligiyle eklenebilir.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Bu teknikleri kullanmanin olusturma döngüleri gerektirdigini unutmayin. Bu, mobil cihazlarda çok önemli olabilmektedir.  Fazla kullanilirsa elde etmis oldugunuz tümfaydalari kaybedebilir ve performans düsüsü yasayabilirsiniz.



