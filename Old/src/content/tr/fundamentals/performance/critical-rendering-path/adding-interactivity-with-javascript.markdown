---
title: "JavaScript ile Etkilesim Ekleme"
description: "JavaScript, sayfanin neredeyse her yönünü degistirmemize olanak tanir: içerik, stil ve kullanici etkilesimlerine karsi davranisi. Bununla birlikte , JavaScript DOM yapimini engelleyebilir ve sayfanin olusturulma zamanini geciktirebilir. En iyi performansi sunmak için JavaScript'inizi zaman uyumsuz yapin ve önemli olusturma yolundaki gereksiz JavaScript kodlarini kaldirin."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - JavaScript; DOM ve CSSOM'yi sorgulayip degistirebilir.
    - JavaScript yürütmesi CSSOM'de engelleme yapar.
    - "JavaScript, açik bir sekilde zaman uyumsuz oldugu açiklanmazsa DOM yapisini engeller."
---
<p class="intro">
  JavaScript, sayfanin neredeyse her yönünü degistirmemize olanak tanir: içerik, stil ve kullanici etkilesimlerine karsi davranisi. Bununla birlikte , JavaScript DOM yapimini engelleyebilir ve sayfanin olusturulma zamanini geciktirebilir. En iyi performansi sunmak için JavaScript'inizi zaman uyumsuz yapin ve önemli olusturma yolundaki gereksiz JavaScript kodlarini kaldirin.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript, tarayicinin içinde çalisan dinamik bir dildir ve sayfa davranisiyla ilgili neredeyse her unsuru degistirmemize olanak tanir: DOM agacindan ögeler ekleyerek veya bu ögeleri kaldirarak sayfadaki içerigi degistirebiliriz, her bir ögenin CSSOM özelliklerini degistirebiliriz, kullanici girisini isleyebiliriz ve daha birçok islem yapabiliriz. Bunu çalisirken göstermek için önceki `Herkese Merhaba` örnegimizi basit bir satir içi komut dosyasiyla genisletelim:

{% include_code src=_code/script.html snippet=full %}

* JavaScript, DOM'ye erismemize ve gizli span dügümüne referansi çikarmamiza olanak tanir. Dügüm, olusturma agacinda görünmeyebilir, ancak DOM'de bulunmaya devam eder! Daha sonra, referansi aldigimizda metnini (.textContent araciligiyla) degistirebilir, hatta hesaplanmis görüntü stili özelligini geçersiz kilip `none` yerine `inline` degerine ayarlayabiliriz. Her seyin sonunda, sayfamiz artik `**Merhaba etkilesimli ögrenciler!**` mesajini görüntüleyecek.

* JavaScript, yeni ögeler olusturmamiza, biçimlendirmemize, bunlari DOM'ye eklememize ve DOM'den kaldirmamiza da olanak tanir. Aslinda, teknik olarak sayfamizin tamami, ögeleri tek tek olusturan ve biçimlendiren bir büyük JavaScript dosyasi olabilirdi. Bu ise yarardi, ancak HTML ve CSS ile çalismak pratikte çok daha kolaydir. JavaScript islevimizin ikinci bölümünde, yeni bir div ögesi olusturuyoruz, metin içerigini ayarliyoruz, biçimlendiriyoruz ve bunu gövdeye ekliyoruz.

<img src="images/device-js-small.png" class="center" alt="sayfa önizlemesi">

Bununla, mevcut bir DOM dügümünün içerigini ve CSS stilini degistirdik ve dokümana tamamiyla yeni bir dügüm ekledik. Sayfamiz herhangi bir tasarim ödülü kazanmayacak, ancak JavaScript'in bize sagladigi gücü ve esnekligi gösteriyor.

Bununla birlikte, altta yatan büyük bir performans riski vardir. JavaScript bize birçok güç saglar, ancak sayfanin nasil ve ne zaman olusturulacagiyla ilgili çok sayida ek sinirlama da olusturur.

Öncelikle, yukaridaki örnekte satir içi komut dosyamizin sayfanin alt kismina yakin bir yerde olduguna dikkat edin. Neden? Bunu kendiniz denemelisiniz, ancak komut dosyasini _span_ ögesinin üzerine tasirsak komut dosyasinin basarisiz olacagini fark edip dokümanda herhangi bir _span_ ögesine yapilmis basvuru bulamadigindan sikayet edersiniz. Örnegin, _getElementsByTagName('span')_, _null_ degerini döndürür. Bu, önemli bir özelligi gösterir: Komut dosyamiz, tam olarak dokümana ekledigimiz noktada yürütülür. HTML ayristirici bir komut dosyasi etiketiyle karsilastiginda, DOM yapim islemini duraklatir ve denetimi JavaScript motoruna verir; JavaScript motorunun çalismasi bittiginde, tarayici kaldigi yerden devam eder ve DOM olusturma islemini sürdürür.

Diger bir deyisle, komut dosyasi blogumuz, henüz islenmedikleri için sayfanin sonraki kisimlarinda geçen hiçbir ögeyi bulamaz! Biraz daha farkli da açiklayabiliriz: **satir içi komut dosyamizi yürütmemiz, DOM yapimini engelleyerek baslangiç olusturmasini da geciktirir.**

Sayfamizda komut dosyalari kullanmamizin sagladigi hemen fark edilmeyen bir baska özellik de bunlarin yalnizca DOM'yi degil, ayni zamanda CSSOM özelliklerini de okuyup degistirebilmeleridir. Aslinda, örnegimizde span ögesinin none olan görüntü özelligini inline olarak degistirdigimizde yapmakta oldugumuz sey tam olarak da budur. Sonuç? Artik bir yaris kosulumuz var.

Komut dosyamizi çalistirmak istedigimizde tarayici CSSOM'yi indirip olusturmayi bitirmediyse ne olur? Yanit basit ve performans için hiç de iyi degil: **Tarayici, CSSOM'yi indirme ve olusturma islemini bitirinceye kadar komut dosyasi yürütmesini geciktirir ve biz beklerken, DOM yapimi da engellenir!**

Kisacasi JavaScript; DOM, CSSOM ve JavaScript yürütmesi arasina yeni birçok bagimlilik ekler ve tarayicinin, sayfamizi ekranda isleyip olusturma hizi açisindan da önemli gecikmelere yol açabilir:

1. Dokümandaki komut dosyasinin konumu önemlidir.
2. Bir komut dosyasi etiketiyle karsilasildiginda DOM yapimi duraklatilir ve komut dosyasinin yürütmesi bitene kadar bekletilir.
3. JavaScript, DOM ve CSSOM'yi sorgulayip degistirebilir.
4. JavaScript yürütmesi, CSSOM hazir olana kadar geciktirilir.

'Kritik olusturma yolunu optimize etmek'ten söz ettigimizde, genis bir ölçekte HTML, CSS ve JavaScript arasindaki bagimlilik grafigini anlamaktan ve optimize etmekten bahsediyoruz.


## Ayristirici Engellemesi ve Zaman Uyumsuz JavaScript

Varsayilan olarak, JavaScript yürütmesi `ayristirici engellemesi`dir: Tarayici, dokümanda bir komut dosyasiyla karsilastiginda DOM yapimini duraklatmasi, denetimi JavaScript çalisma zamanina devretmesi ve DOM yapimina devam etmeden önce komut dosyasinin yürütülmesini beklemesi gerekir. Bunu, önceki örnegimizde bir satir içi komut dosyasiyla uygulamada zaten gördük. Aslinda, satir içi komut dosyalari, siz özel olarak dikkat etmez ve yürütmelerini geciktirmek için ek kod yazmazsaniz her zaman ayristirici engellemesi yapar.

Bir script etiketi araciligiyla eklenecek komut dosyalarina ne dersiniz? Önceki örnegimizi alalim ve kodumuzu ayri bir dosyaya çikartalim:

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

Satir içi JavaScript snippet'i kullanmak yerine bir `<script>` etiketi kullandigimizda yürütme sirasinin farkli olmasini bekler misiniz? Elbette, bunlar ayni olduklari ve ayni sekilde davranmalari gerektigi için yanit `hayir` olacaktir. Her iki durumda da tarayicinin duraklamasi ve dokümanin geri kalanini islemek için komut dosyasini yürütmesi gerekecektir. Bununla birlikte, **bir harici JavaScript dosyasinin olmasi durumunda, tarayicinin yine duraklamasi ve komut dosyasinin diskten, önbellekten veya bir uzak sunucudan getirilmesini beklemesi gerekir. Bu da kritik olusturma yoluna binlerce milisaniyeye varan bir gecikme ekleyebilir.**

Ancak iyi bir haberimiz var, bunun için bir imdat çikisimiz bulunuyor! Varsayilan olarak tüm JavaScript ayristirici engellemesi yapar ve tarayici, komut dosyasinin sayfada ne yapmayi planladigini bilmez; dolayisiyla, en kötü senaryoyu düsünmeli ve ayristiriciyi engellemelidir. Ancak, tarayiciya bir sinyal verip komut dosyasinin, tam olarak dokümanda basvuruda bulunuldugu noktada yürütülmesine gerek olmadigini söyleyebilseydik ne olurdu? Bunu yapmamiz, tarayicinin DOM yapimina devam etmesine ve komut dosyasini hazir olduktan sonra, yani dosya önbellekten veya bir uzak sunucudan getirildikten sonra yürütmesine olanak tanirdi.

Peki, bu hileyi nasil gerçeklestirecegiz? Oldukça basit, komut dosyamizi _async_ olarak isaretleyebiliriz:

{% include_code src=_code/split_script_async.html snippet=full %}

async (zaman uyumsuz) anahtar kelimesinin komut dosyasina eklenmesi tarayiciya, komut dosyasinin kullanilabilir hale gelmeyi beklerken DOM yapimini engellememesi gerektigini bildirir. Bu, büyük bir performans kazanci saglar!



