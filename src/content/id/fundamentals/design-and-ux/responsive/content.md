project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Perhatikan materi serta layout dan desain grafis ketika membangun untuk berbagai pengguna dan perangkat.

{# wf_updated_on: 2016-05-10 #}
{# wf_published_on: 2016-05-10 #}

# Materi Multi-Perangkat {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## Bagaimana orang membaca di web

[Panduan penulisan pemerintah AS](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html) merangkum apa yang orang inginkan dari menulis di web:

> Ketika menulis untuk web, menggunakan bahasa sederhana yang memungkinkan pengguna untuk menemukan apa yang mereka butuhkan, memahami apa yang mereka temukan, dan kemudian menggunakannya sesuai dengan kebutuhan.
>
> Ini juga harus bisa ditindaklanjuti, bisa ditemukan, dan bisa dibagikan.

Penelitian menunjukkan bahwa [orang tidak membaca laman web, tetapi mereka memindainya](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/). Rata-rata, [orang hanya membaca 20-28% dari materi laman web](https://www.nngroup.com/articles/how-little-do-users-read/). Membaca di layar jauh lebih lambat dibandingkan membaca di kertas. Orang akan bosan dan meninggalkan situs Anda kecuali informasi mudah untuk diakses dan dipahami.

## Cara menulis untuk perangkat seluler

Fokus pada subjek inti dan langsung ceritakan. Agar tulisan bekerja optimal di berbagai perangkat dan tampilan yang terlihat, pastikan untuk menempatkan inti tulisan di awal: sebagai pedoman, idealnya [dalam empat paragraf pertama, sekitar 70 kata](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610).

Tanyakan pada diri sendiri apa yang orang inginkan dari situs Anda. Apakah mereka mencoba untuk menemukan sesuatu? Jika orang mengunjungi situs Anda untuk suatu informasi, pastikan bahwa semua teks berorientasi untuk membantu mereka mencapai tujuan. Menulis dalam [aktif voice](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice), menawarkan tindakan dan solusi.

Hanya mempublikasikan apa yang diinginkan pengunjung, tidak lebih.

[Penelitian pemerintah UK ](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) juga menunjukkan bahwa:

> 80% orang lebih suka kalimat yang ditulis dalam bahasa Inggris yang jelas — dan semakin
>kompleks masalahnya, semakin besar preferensi-nya (mis., 97% memilih "among
> other things" dibandingkan bahasa Latin "inter alia").
>
> Semakin tinggi tingkat pendidikan orang dan lebih spesialis pengetahuannya,
> semakin besar preferensi mereka untuk bahasa Inggris sederhana.

Dengan kata lain: gunakan bahasa sederhana, kata-kata pendek dan struktur kalimat sederhana — bahkan untuk pengguna teknis dan terpelajar. Jagalah nada suara agar selalu enak didengarkan, kecuali ada alasan untuk tidak melakukannya. Aturan lawas jurnalisme adalah menulis seolah-olah Anda sedang berbicara dengan seorang anak yang cerdas berusia 11 tahun.

## Miliaran pengguna berikutnya

Pendekatan pared-down untuk penulisan sangat penting bagi pembaca di perangkat seluler, serta sangat penting ketika membuat materi untuk ponsel murah dengan tampilan yang terlihat yang kecil dan memerlukan lebih banyak tindakan gulir dan mungkin memiliki kualitas layar yang lebih rendah dan kurang responsif.

Sebagian besar miliaran pengguna berikutnya akan online menggunakan perangkat murah. Mereka tidak ingin menghabiskan kuota data dengan menavigasi materi yang bertele-tele, dan mungkin tidak membacanya dalam bahasa utama mereka. Pangkas teks Anda: gunakan kalimat pendek, tanda baca minimal, paragraf lima baris atau kurang, dan judul satu baris. Pertimbangkan teks responsif (misalnya, menggunakan kepala berita pendek untuk tampilan yang terlihat yang lebih kecil) tapi [waspadalah terhadap kerugiannya](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/).

Perilaku minimalis untuk teks juga akan membuat materi Anda lebih mudah dilokalkan dan internasionalisasi — dan semakin besar kemungkinan materi Anda akan dikutip di media sosial.

Intinya:

* Buatlah tetap sederhana
* Kurangi kesemrawutan
* Langsung ke intinya


## Menghapus materi yang tidak perlu

Dari segi ukuran byte, laman web menjadi [besar dan semakin besar](http://httparchive.org/trends.php#bytesTotal&reqTotal).

[Teknik desain responsif](/web/fundamentals/design-and-ux/responsive/) memungkinkan untuk menyajikan materi berbeda dalam tampilan yang terlihat yang lebih kecil, tapi akan lebih bijak jika memulai dengan merampingkan teks, gambar dan materi lainnya.

> Pengguna web sering kali berorientasi tindakan, cenderung aktif memburu jawaban atas pertanyaan mereka saat ini, daripada diam mempelajari buku yang bagus.
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

Tanyakan pada diri sendiri: apa yang orang ingin dapatkan ketika mereka mengunjungi situs saya?

Apakah setiap komponen laman membantu pengguna mencapai tujuan mereka?

### Menghapus elemen laman yang berlebihan

File HTML terbentuk dari hampir 70k dan lebih dari sembilan permintaan untuk rata-rata laman web, menurut [Arsip HTTP](http://httparchive.org/trends.php#bytesHtml&reqHtml).

Banyak situs populer menggunakan beberapa ribu elemen HTML per laman, dan beberapa ribu baris kode, bahkan di perangkat seluler. Ukuran file HTML yang terlalu besar [mungkin tidak memperlambat pemuatan laman](http://jsbin.com/zofavunapo/1/edit?html,js,output), namun payload HTML yang berat bisa menandakan materi yang gembung: file .html yang lebih besar berarti lebih banyak elemen, materi teks, atau keduanya.

Mengurangi kompleksitas HTML juga akan mengurangi besar laman, membantu pelokalan serta internasionalisasi dan membuat desain responsif agar lebih mudah untuk direncanakan dan di-debug. Untuk informasi tentang cara menulis HTML yang lebih efisien, lihat [HTML berkinerja tinggi](https://samdutton.wordpress.com/2015/04/02/high-performance-html/).

> Setiap langkah tambahan yang dilakukan pengguna sebelum mereka mendapatkan nilai dari aplikasi, akan membuat Anda dikenai penalti 20% dari pengguna
>
>— [Gabor Cselle, Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

Hal yang sama berlaku untuk materi: bantu pengguna mendapatkan apa yang mereka inginkan secepat mungkin.

Jangan sekadar menyembunyikan materi dari pengguna seluler. Arahkan ke [paritas materi](http://bradfrost.com/blog/mobile/content-parity/), karena Anda tidak akan bisa menebak apa fitur seluler yang diinginkan pengguna. Jika Anda memiliki sumber daya, buat versi alternatif dari materi yang sama untuk ukuran tampilan yang terlihat berbeda — bahkan jika hanya bagi elemen laman dengan prioritas tinggi.

Perhatikan pengelolaan materi dan alur kerja: sistem lawas menghasilkan materi lawas?

### Menyederhanakan teks

Karena web semakin populer di perangkat seluler, Anda harus mengubah cara Anda menulis. Buatlah tetap sederhana, kurangi kesemrawutan dan langsung ke intinya.

### Membuang gambar yang tidak penting

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-images.png" alt="Arsip HTTP menunjukkan peningkatan jumlah ukuran transfer gambar dan permintaan gambar" />
    <figcaption>Menurut <a href="http://httparchive.org/trends.php#bytesImg&reqImg">data Arsip HTTP</a>, laman web rata-rata membuat 54 permintaan gambar.</figcaption>
  </figure>
</div>

Gambar bisa indah, menyenangkan dan informatif — namun gambar juga menggunakan properti laman, menambah ukuran laman, dan meningkatkan jumlah permintaan file. [Latensi semakin buruk ketika konektivitas memburuk](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), yang berarti bahwa permintaan file gambar yang berlebihan adalah masalah yang semakin meningkat ketika web digunakan di perangkat seluler.


<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="Bagan pai Arsip HTTP menunjukkan byte rata-rata per laman menurut jenis materi, sekitar 60% merupakan gambar">
    <figcaption>Gambar membentuk lebih dari 60% berat laman.</figcaption>
  </figure>
</div>

Gambar juga mengonsumsi daya. Setelah layar, radio adalah fitur terbesar kedua yang paling menguras baterai. Semakin banyak permintaan gambar, semakin sering penggunaan radio, maka baterai akan semakin boros. Bahkan untuk merender gambar saja membutuhkan daya – dan ini sesuai dengan ukuran dan jumlahnya. Lihat laporan Stanford [Apa yang Menghabiskan Baterai Saya?](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)

Jika bisa, singkirkan gambarnya!

Berikut adalah beberapa sarannya:

* Pertimbangkan desain yang tidak menggunakan gambar sama sekali, atau menggunakan gambar secukupnya. [Teks-saja bisa menjadi indah](https://onepagelove.com/tag/text-only)! Tanyakan pada diri sendiri, "Apa yang ingin dicapai pengunjung ke situs saya? Apakah gambar membantu proses tersebut? "
* Di masa lalu, merupakan hal yang biasa untuk menyimpan judul dan teks lain dalam bentuk grafis. Pendekatan tersebut tidak merespons dengan baik untuk perubahan ukuran tampilan yang terlihat, serta menambah latensi dan ukuran laman. Menggunakan teks dalam bentuk grafis juga berarti teks tidak bisa ditemukan oleh mesin telusur, dan tidak dapat diakses oleh alat pembaca layar dan teknologi pendukung lainnya. Gunakan teks "sungguhan" apabila memungkinkan - Web Fonts dan CSS dapat memberikan tipografi yang indah.
* Daripada gambar, gunakanlah CSS untuk gradien, bayangan, sudut lengkung, dan [tekstur latar belakang](http://lea.verou.me/css3patterns/){: .external }, fitur [didukung oleh semua browser modern](http://caniuse.com/#search=shadows). Namun harap diingat, bahwa CSS mungkin lebih baik dari gambar, tapi tetap ada [penalti render dan pemrosesan](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/), yang signifikan terutama di perangkat seluler.
* Gambar latar jarang sekali bekerja dengan baik di perangkat seluler. Anda bisa [menggunakan kueri media](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/) untuk menghindari gambar latar pada tampilan yang terlihat yang kecil.
* Hindari gambar layar pembuka.
* [Gunakan CSS untuk animasi UI](/web/fundamentals/design-and-ux/animations/).
* Kenali glyph Anda; gunakan [ikon dan simbol Unicode](https://en.wikipedia.org/wiki/List_of_Unicode_characters) bukan gambar, dengan Web Fonts bila perlu.
* Pertimbangkan [font ikon](http://weloveiconfonts.com/#zocial); mereka adalah grafis vektor yang bisa diskalakan tanpa batas, dan seluruh kumpulan gambar bisa di unduh dalam satu font. (Namun, ketahui [persoalan ini](https://sarasoueidan.com/blog/icon-fonts-to-svg/).)
* Elemen `<canvas>` bisa digunakan untuk membuat gambar di JavaScript dari garis, kurva, teks, dan gambar lainnya.
* [Gambar URI Data atau SVG inline](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/) tidak akan mengurangi ukuran laman, namun mereka bisa mengurangi latensi dengan mengurangi jumlah permintaan sumber daya. SVG inline memiliki [dukungan yang baik pada browser seluler dan desktop](http://caniuse.com/#feat=svg-html5), dan [alat optimalisasi](http://petercollingridge.appspot.com/svg-optimiser) bisa secara signifikan mengurangi ukuran SVG. Demikian juga, URI Data [didukung dengan baik](http://caniuse.com/datauri). Keduanya bisa disisipkan di CSS.
* Pertimbangkan menggunakan `<video>` bukannya animasi GIF. [Elemen video ini didukung oleh semua browser di perangkat seluler](http://caniuse.com/video) (kecuali Opera Mini).

Untuk informasi selengkapnya, silakan lihat [Optimalisasi Gambar](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) serta [Menghilangkan dan mengganti gambar](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images).


## Merancang materi agar bekerja dengan baik pada ukuran tampilan yang terlihat berbeda {: #viewport }

> "Create a product, don't re-imagine one for small screens. Great mobile
> products are created, never ported."
>
>— <a href="https://goo.gl/KBAXj0">Mobile Design and Development</a>, Brian Fling


"Perancang hebat tidak hanya "mengoptimalkan untuk perangkat seluler" — mereka berpikir tanggap untuk membangun situs yang bekerja di berbagai perangkat. Struktur teks dan materi laman lainnya sangat penting untuk keberhasilan lintas-perangkat.

Banyak dari semiliar pengguna berikutnya yang datang online menggunakan perangkat murah dengan tampilan yang terlihat yang kecil. Membaca dengan resolusi rendah di layar 3,5" atau 4" bukanlah pekerjaan yang mudah.

Berikut adalah foto dari keduanya:

![Foto yang membandingkan tampilan entri blog pada ponsel cerdas yang mahal dan yang murah](imgs/devices-photo.jpg)

Pada layar yang lebih besar, teks berukuran kecil tapi terbaca.

Pada layar yang lebih kecil, browser merender layout dengan benar, namun teks tidak terbaca, bahkan ketika diperbesar. Layar terlihat buram dan memiliki 'color cast' — warna putih tidak terlihat putih — sehingga materi kurang terbaca.

### Mendesain materi untuk perangkat seluler

Ketika membangun untuk berbagai tampilan yang terlihat, pertimbangkan materi serta layout dan desain grafis,
[rancang dengan teks dan gambar nyata, jangan hanya materi dummy](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website).

> "Materi mengawali desain. Desain tanpa materi bukanlah desain, tetapi hanya dekorasi."
>
>— Jeffrey Zeldman

* Tempatkan materi Anda yang paling penting di atas, karena [pengguna cenderung membaca laman web dalam pola berbentuk-F](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
* Pengguna mengunjungi situs Anda untuk mencapai sebuah tujuan. Tanyakan pada diri sendiri apa yang mereka butuhkan untuk mencapai tujuan tersebut dan buang segala sesuatu yang lain. Lakukan tindakan tegas pada hiasan visual dan tekstual, materi lawas, tautan terlalu banyak, dan kesemrawutan lainnya.
* Hati-hati dengan ikon berbagi sosial; mereka bisa mengacaukan layout, dan kodenya dapat memperlambat pemuatan laman.
* Desain [layout responsif](/web/fundamentals/design-and-ux/responsive/) untuk materi, bukan ukuran perangkat tetap.

### Menguji materi

Berhasil: Apa pun yang Anda lakukan — **uji**!

* Periksa keterbacaan pada tampilan yang terlihat yang lebih kecil menggunakan Chrome DevTools dan [alat emulasi](/web/fundamentals/performance/poor-connectivity/) lainnya.
* [Uji materi di bawah kondisi bandwidth rendah dan latensi tinggi](/web/fundamentals/performance/poor-connectivity/); cobalah materi dalam berbagai skenario konektivitas.
* Cobalah baca dan berinteraksi dengan materi Anda pada ponsel murah.
* Ajak teman dan kolega untuk mencoba aplikasi atau situs Anda.
* Membangun lab uji perangkat sederhana. [GitHub repo](https://github.com/GoogleChrome/MiniMobileDeviceLab) untuk Mini Mobile Device Lab Google memiliki petunjuk tentang cara membangun lab sendiri. [OpenSTF](https://github.com/openstf/stf) adalah aplikasi web sederhana untuk menguji situs web di beberapa perangkat Android.

Berikut adalah OpenSTF sedang beraksi:

[![Antarmuka OpenSTF](imgs/stf.png)](https://github.com/openstf/stf)

Perangkat seluler semakin banyak dipakai untuk menggunakan materi dan memperoleh informasi — bukan hanya sebagai perangkat komunikasi, game dan media.

Hal ini membuat perencanaan materi semakin penting agar bisa bekerja dengan baik pada berbagai tampilan yang terlihat, dan untuk memprioritaskan materi ketika mempertimbangkan layout, antarmuka dan desain interaksi lintas-perangkat.


## Memahami biaya data

Laman web semakin besar. <br><br>Menurut <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">Arsip HTTP</a>, ukuran rata-rata laman untuk <a href="http://httparchive.org/about.php#listofurls">sejuta situs teratas</a> sekarang melampaui 2 MB.


Pengguna menghindari situs atau aplikasi yang dianggap lambat atau mahal biaya datanya, jadi penting untuk memahami biaya pemuatan laman dan komponen aplikasi.

Mengurangi ukuran laman juga menguntungkan. [Chris Zacharias dari YouTube](http://blog.chriszacharias.com/page-weight-matters) menemukan hal tersebut ketika mereka mengurangi ukuran laman-tontonan dari 1,2 MB ke 250 KB:

> Banyak orang yang sebelumnya tidak menggunakan YouTube, tiba-tiba memakainya.

Dengan kata lain, mengurangi ukuran laman **bisa membuka pasar baru**.

### Menghitung ukuran laman {: #weight }

Ada beberapa alat untuk menghitung ukuran laman. Panel Network pada Chrome DevTools menunjukkan ukuran byte total untuk semua sumber daya, dan bisa digunakan untuk memastikan ukuran untuk tipe aset individual. Anda juga bisa memeriksa item mana yang telah diambil dari cache browser.

![Panel Network pada Chrome DevTools menunjukkan ukuran sumber daya](imgs/chrome-dev-tools.png)

Firefox dan browser lainnya menawarkan alat serupa.

[WebPagetest](http://webpagetest.org) menyediakan kemampuan untuk menguji pemuatan laman pertama dan berikutnya. Anda bahkan bisa mengotomatiskan pengujian dengan menggunakan [skrip](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (misalnya, untuk masuk ke situs) atau menggunakan [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). Contoh berikut (memuat [developers.google.com/web](/web/)) menunjukkan bahwa proses cache telah berhasil dan pemuatan laman berikutnya tidak membutuhkan sumber daya tambahan.

![Hasil WebPagetest menampilkan ukuran total byte untuk kunjungan laman pertama dan ulangan](imgs/webpagetest-first-and-repeat.png)

WebPagetest juga memberikan ukuran dan meminta rincian berdasarkan tipe MIME.

![Bagan pai WebPagetest menampilkan permintaan dan byte berdasarkan tipe MIME](imgs/webpagetest-requests-and-bytes-pie-charts.png)

### Menghitung biaya laman

Bagi banyak pengguna, biaya data tidak hanya berupa byte dan kinerja — namun juga uang.

Situs [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } memungkinkan Anda untuk memperkirakan biaya finansial yang sesungguhnya untuk memuat situs Anda. Histogram di bawah ini menunjukkan berapa biaya (menggunakan paket data prabayar) untuk memuat [amazon.com](https://www.amazon.com/).

![Perkiraan biaya data di 12 negara) saat memuat beranda amazon.com](imgs/what-does-my-site-cost.png)

Ingatlah bahwa ini tidak memperhitungkan keterjangkauan harga relatif terhadap pendapatan. Data dari [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) menunjukkan biaya data.

<table>
  <tr>
    <td></td>
    <td><strong>Biaya paket data 500 MB<br>(USD)</strong></td>
    <td><strong>Upah minimum per jam<br>(USD)</strong></td>
    <td><strong>Jam kerja untuk membayar<br>paket data 500 MB</strong></td>
  </tr>
  <tr>
    <td>India</td>
    <td>$3,38</td>
    <td>$0,20</td>
    <td>17 jam</td>
  </tr>
  <tr>
    <td>Indonesia</td>
    <td>$2,39</td>
    <td>$0,43</td>
    <td>6 jam</td>
  </tr>
  <tr>
    <td>Brasil</td>
    <td>$13,77</td>
    <td>$1,04</td>
    <td>13 jam</td>
  </tr>
</table>


Ukuran laman bukan hanya masalah bagi pasar negara berkembang. Di banyak negara, orang menggunakan paket data seluler dengan data terbatas, dan akan menghindari situs atau aplikasi Anda jika mereka menganggap hal itu berat dan mahal. Bahkan paket data seluler dan wifi "tak terbatas" biasanya memiliki batas data yang apabila terlewati, data akan diblokir atau dibatasi kecepatannya.

Intinya: ukuran laman memengaruhi kinerja dan biaya. [Mengoptimalkan efisiensi materi](/web/fundamentals/performance/optimizing-content-efficiency/) menunjukkan cara mengurangi biaya tersebut.


{# wf_devsite_translation #}
