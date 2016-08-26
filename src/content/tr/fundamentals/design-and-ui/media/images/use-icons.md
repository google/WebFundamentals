project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sayfaniza simgeler eklerken mümkün oldugunda SVG simgeleri veya bazi durumlarda unicode karakterler kullanin.

{# wf_review_required #}
{# wf_updated_on: 2014-06-09 #}
{# wf_published_on: 2000-01-01 #}

# Simgeler için SVG kullanma {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Sayfaniza simgeler eklerken mümkün oldugunda SVG simgeleri veya bazi durumlarda unicode karakterler kullanin.




## TL;DR {: .hide-from-toc }
- Simgeler için tarama resimleri yerine SVG veya unicode kullanin.


## Basit simgeleri unicode ile degistirme

Birçok yazi tipi, resimlerin yerine kullanilabilecek çok sayida unicode glifi için destek saglamaktadir.  Resimlerden farkli olarak, unicode yazi tipleri de ölçeklenebilir ve ekranda ne kadar küçük veya büyük olsalar da iyi görünür.

Normal karakter kümesinin ötesinde, unicode sayi biçimleri (&#8528;), oklar (&#8592;), matematik isleçleri (&#8730;), geometrik sekiller (&#9733;), denetim resimleri (&#9654;), braille kaliplari (&#10255;), müzik notalari (&#9836;), Yunan harfleri (&#937;), hatta satranç taslari (&#9822;) için semboller içerebilir.

Bir unicode karakter ekleme, adlandirilmis varliklarla ayni sekilde yapilir: `&#XXXX`; burada `XXXX` unicode karakter numarasini temsil eder.  Örnegin:


    Süper &#9733; oldugunuz belli.
    

Süper &#9733; oldugunuz belli.

## Karmasik simgeleri SVG ile degistirme
Daha karmasik simge gereksinimleri için SVG simgeleri genellikle hafif ve kullanimi kolaydir, ayrica CSS ile biçimlendirilebilirler. SVG'nin tarama resimlerine göre bazi avantajlari vardir:

* Bunlar, sonsuz bir sekilde ölçeklenebilen vektör grafikleridir.
* Renk, gölgeleme, seffaflik ve animasyonlar gibi CSS efektleri dogrudan uygulanir.
* SVG resimleri, dogrudan dokümanin içinde hizalanabilir.
* Anlamsaldirlar.
* Uygun özelliklerle daha iyi erisilebilirlik saglarlar.

&nbsp;

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/icon-svg.html" region_tag="iconsvg" lang=html %}
</pre>

## Simge yazi tiplerini dikkatli bir sekilde kullanin

Simge yazi tipleri popülerdir ve kolayca kullanilabilirler, ancak SVG simgelerine göre bazi olumsuz yönleri vardir.

* Bunlar, sonsuz bir sekilde ölçeklenebilen vektör grafikleridir, ancak üzerlerinde yumusatma yapilabilir ve bu, simgelerin beklendikleri kadar net olmamalarina yol açar.
* Biçimlendirmeleri CSS ile sinirlidir.
* Piksel mükemmel konumlandirmasi satir yüksekligi, harf boslugu gibi unsurlara bagli olarak zor olabilir.
* Anlamsal degillerdir ve ekran okuyucular veya diger yardimci teknolojilerle kullanilmalari zor olabilir.
* Dogru bir sekilde anlasilmazlarsa mevcut simgelerin yalnizca küçük bir alt kümesini kullanmak için büyük bir dosya boyutuna neden olabilirler. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Yazi tipi simgeleri için FontAwesome'in kullanildigi bir sayfanin örnegi.">
{% endlink_sample %}
<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/icon-font.html" region_tag="iconfont" lang=html %}
</pre>

Aralarinda [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) ve [Glyphicons]'un (http://glyphicons.com/) da bulundugu yüzlerce ücretsiz ve ücretli simge yazi tipi vardir.

Ek HTTP istegi agirligini ve dosya boyutunu, simge gereksinimiyle dengelediginizden emin olun.  Örnegin, yalnizca birkaç simgeye ihtiyaciniz varsa bir resim veya resim bagimsiz görüntüsü kullanmaniz daha iyi olabilir.



