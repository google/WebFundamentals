---
title: "Nesne Modelini Oluşturma"
description: "Tarayıcının içeriği ekranda oluşturabilmesi için önce DOM ve CSSOM ağaçlarını oluşturması gerekir. Sonuç olarak, HTML ve CSS'yi tarayıcıya mümkün olduğunca hızlı bir şekilde sağladığımızdan emin olmamız gerekir."
updated_on: 2014-09-12
key-takeaways:
  nesne-modeli-oluşturma:
    - Baytlar → karakterler → belirteçler → düğümler → nesne modeli.
    - "HTML biçimlendirmesi bir Doküman Nesne Modeli'ne (DOM), CSS biçimlendirmesi bir CSS Nesne Modeli'ne (CSSOM) dönüştürülür."
    - "DOM ve CSSOM, bağımsız veri yapılarıdır."
    - "Chrome DevTools Zaman Çizelgesi, DOM ve CSSOM'nin yapım ve işleme maliyetlerini yakalayıp incelememize olanak tanır."
notes:
  devtools:
    - "Chrome DevTools ile ilgili temel bilgilere sahip olduğunuzu (ör. bir ağ şelalesini nasıl yakalayacağınızı veya bir zaman çizelgesini kaydetmeyi bildiğinizi) varsayacağız. Hızlı bir hatırlatmaya gereksinim duyarsanız <a href='https://developer.chrome.com/devtools'>Chrome DevTools dokümanlarına</a> bakabilirsiniz veya DevTools'u yeni kullanmaya başladıysanız Codeschool <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> kursunu almanızı öneririz."
---
<p class="intro">
  Tarayıcının sayfayı oluşturabilmesi için önce DOM ve CSSOM ağaçlarını oluşturması gerekir. Sonuç olarak, HTML ve CSS'yi tarayıcıya mümkün olduğunca hızlı bir şekilde sağladığımızdan emin olmamız gerekir.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## Doküman Nesne Modeli (DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

Mümkün olan en basit örnekle başlayalım: biraz metin ve tek bir resim içeren sade bir HTML sayfası. Bu basit sayfayı işlemek için tarayıcının ne yapması gerekir?

<img src="images/full-process.png" alt="DOM yapım süreci">

1. **Dönüştürme:** Tarayıcı, HTML'nin işlenmemiş baytlarını diskten veya ağdan okur ve bunları, dosyada belirtilen kodlamaya (ör. UTF-8) dayanarak bağımsız karakterlere çevirir.
1. **Belirteçlere Çevirme:** Tarayıcı, karakter dizelerini [W3C HTML5 standardının](http://www.w3.org/TR/html5/) belirlediği ayrı belirteçlere dönüştürür; ör. "<html>", "<body>" ve "açılı parantezler" içindeki diğer dizeler. Her bir belirtecin özel bir anlamı ve bir kural kümesi vardır.
1. **Kuralları Belirleme:** Yayınlanan belirteçler, kendi özelliklerini ve kurallarını tanımlayan `nesnelere` dönüştürülür.
1. **DOM yapımı:** Son olarak, HTML biçimlendirmesi farklı etiketler arasındaki ilişkileri tanımladığından (bazı etiketler, başka etiketlerin içinde yer alır), oluşturulan nesneler bir ağaç veri yapısında bağlanır. Bu yapı, orijinal biçimlendirmede tanımlanan üst-alt ilişkilerini de yakalar: Ör. _HTML_ nesnesi, _body_ nesnesinin bir üst öğesidir, _body_ nesnesi de _paragraph_ nesnesinin üst öğesidir.

<img src="images/dom-tree.png" class="center" alt="DOM ağacı">

**Bu sürecin tamamının nihai çıktısı Doküman Nesne Modeli veya basit sayfamızın `DOM`sidir. Tarayıcı, sayfanın sonraki tüm işlemeleri için bunu kullanır.**

Tarayıcının HTML biçimlendirmesini işlemesinin gerektiği her defasında, tarayıcı yukarıdaki adımların tümünü gerçekleştirmek zorundadır: Baytları karakterlere dönüştürür, belirteçleri tanımlar, belirteçleri düğümlere dönüştürür ve DOM ağacını oluşturur. Tüm bu süreç, özellikle işlenecek büyük miktarda HTML'miz olduğunda biraz zaman alabilir.

<img src="images/dom-timeline.png" class="center" alt="DOM yapımını DevTools'ta takip etme">

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

Chrome DevTools'u açar ve sayfa yüklenirken bir zaman çizelgesi kaydederseniz bu adımın gerçekleştirilmesinin gerçekte ne kadar sürdüğünü görebilirsiniz. Yukarıdaki örnekte, HTML bayt parçasının DOM ağacına dönüştürülmesi yaklaşık 5 ms sürmüştür. Elbette, sayfa, çoğu sayfada olduğu gibi daha geniş olsaydı bu süreç çok daha uzun sürebilirdi. Akıcı animasyonlar oluşturmayla ilgili ilerideki bölümlerimizde, tarayıcının büyük miktarlarda HTML işlemesi gerekirse bunun kolayca tıkanabileceğiniz bir nokta olacağını göreceksiniz.

DOM ağacı hazır olduğunda, sayfayı ekranda oluşturmak için yeterli bilgiye sahip olur muyuz? Henüz değil! DOM ağacı, doküman biçimlendirmesinin özelliklerini ve ilişkilerini yakalar, ancak öğenin oluşturulduğunda nasıl görünmesi gerektiğiyle ilgili bize hiçbir şey söylemez. Bu, CSSOM'nin sorumluluğundadır. Şimdi de ona bakacağız!

## CSS Nesne Modeli (CSSOM)

Tarayıcı, basit sayfamızın DOM'sini oluştururken, dokümanın başlık bölümünde harici bir CSS stil sayfasına (style.css) başvuruda bulunan bir bağlantı etiketiyle karşılaştı. Sayfayı oluşturmak için bu kaynağa ihtiyacı olacağını tahmin ederek hemen bu kaynak için bir istek gönderir ve istek, aşağıdaki içerikle geri gelir:

{% include_code src=_code/style.css snippet=full lang=css %}

Elbette, stillerimizi doğrudan HTML biçimlendirmesinin içinde (satır içi) açıklayabilirdik, ancak CSS'mizi HTML'den bağımsız tutmamız içeriği ve tasarımı ayrı konular olarak ele almamıza olanak tanır: Tasarımcılar CSS üzerinde çalışırken, geliştiriciler de HTML üzerine odaklanabilir.

HTML ile olduğu gibi alınan CSS kurallarını, tarayıcının anlayıp çalışabileceği bir şeylere dönüştürmemiz gerekir. Dolayısıyla, bir kez daha, HTML ile yaptığımız çok basit bir işlemi tekrar ederiz:

<img src="images/cssom-construction.png" class="center" alt="CSSOM yapım adımları">

CSS baytları karakterlere, daha sonra belirteçlere ve düğümlere dönüştürülür; son olarak da `CSS Nesne Modeli` veya kısaca CSSOM olarak bilinen bir ağaç yapısına bağlanır:

<img src="images/cssom-tree.png" class="center" alt="CSSOM ağacı">

CSSOM`nin neden bir ağaç yapısı var? Sayfadaki herhangi bir nesnenin son stil kümesini hesaplarken tarayıcı, bu düğüm için geçerli olan en genel kuralla başlar (ör. bir gövde öğesinin alt öğesiyse tüm gövde stilleri geçerlidir) ve daha sonra, daha belirli kuralları uygulayarak hesaplanan stilleri giderek daraltır (ör. `aşağı doğru basamaklama` kuralları).

Bunu daha somutlaştırmak için yukarıdaki CSSOM ağacını düşünün. Gövde öğesinin içine yerleştirilmiş _span_ etiketinin içindeki metinlerin yazı tipi boyutu 16 piksel ve rengi kırmızı olur. Yazı tipi boyutu yönergesi, gövdeden span düğümüne aşağı doğru basamaklanır. Ancak, bir span etiketi bir paragraf (p) etiketinin alt öğesiyse içerikleri görüntülenmez.

Ayrıca, yukarıdaki ağacın eksiksiz CSSOM ağacı olmadığını, yalnızca stil sayfamızda geçersiz kılmaya karar verdiğimiz stilleri gösterdiğini unutmayın. Her tarayıcı, `kullanıcı aracı stilleri` olarak bilinen bir varsayılan stiller kümesi sağlar. Kendi stil kümemizi sağlamadığımızda bunu görürüz. Bizim stillerimiz de bu varsayılanları geçersiz kılar (ör. [varsayılan IE stilleri](http://www.iecss.com/)). Chrome DevTools`ta daha önce `hesaplanan stilleri` incelediyseniz ve tüm stillerin nereden geldiğini merak ettiyseniz, artık biliyorsunuz!

CSS işlemesinin ne kadar sürdüğünü mü merak ediyorsunuz? DevTools'ta bir zaman çizelgesi kaydedin ve `Stili Yeniden Hesapla` olayını arayın: DOM ayrıştırmasından farklı olarak, zaman çizelgesi ayrı bir `CSS Ayrıştırma` girişi göstermez. Bunun yerine, ayrıştırmayı ve CSSOM ağacı yapımını, ayrıca bu bir olay altında hesaplanan stillerin yinelemeli hesaplamasını yakalar.

<img src="images/cssom-timeline.png" class="center" alt="CSSOM yapımını DevTools'ta takip etme">

Önemsiz stil sayfamızın işlenmesi yaklaşık 0,6 ms sürer ve sayfadaki 8 öğe bundan etkilenir. Çok değil, ama hiç yoktan iyidir. Peki, 8 öğe nereden geldi? CSSOM ve DOM, bağımsız veri yapılarıdır! Görünüşe göre, tarayıcı önemli bir adımı gizliyor. Daha sonra, DOM ve CSSOM'yi birbirine bağlayan oluşturma ağacı hakkında konuşacağız.



