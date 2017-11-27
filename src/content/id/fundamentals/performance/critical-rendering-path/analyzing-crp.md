project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara mengidentifikasi dan mengatasi bottleneck kinerja jalur rendering penting.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Menganalisis Kinerja Jalur Rendering Penting {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Untuk mengidentifikasi dan mengatasi bottleneck kinerja jalur rendering penting 
diperlukan pengetahuan yang baik mengenai kesalahan umum. Mari kita ikuti tur praktik langsung 
dan memahami pola kinerja umum yang akan membantu mengoptimalkan laman 
Anda.


Pengoptimalan jalur rendering penting memungkinkan browser menggambar laman secepat mungkin: semakin cepat mengubah laman menjadi interaksi yang lebih tinggi, semakin banyak laman yang ditampilkan, dan [semakin baik konversi](https://www.google.com/think/multiscreen/success.html). Untuk meminimalkan lama pengunjung menampilkan layar kosong, kita perlu mengoptimalkan sumber daya yang akan dimuat dan urutannya.

Untuk membantu mengilutrasikan proses ini, mari kita mulai dengan kasus yang sesederhana mungkin dan secara bertahap membangun laman untuk menyertakan sumber daya tambahan, gaya, dan logika aplikasi. Dalam prosesnya, kita akan mengoptimalkan setiap kasus; kita juga akan melihat di mana saja kesalahan bisa terjadi.

Sejauh ini kita telah memfokuskan secara eksklusif pada apa yang terjadi di browser setelah sumber daya (file CSS, JS, atau HTML) tersedia untuk diproses. Kita telah mengabaikan waktu yang diperlukan untuk mengambil sumber daya, baik dari cache maupun dari jaringan. Kita akan menggunakan anggapan berikut ini:

* Perjalanan bolak-balik jaringan (latensi propagasi) ke server menghabiskan waktu 100 md.
* Waktu respons server adalah 100 md bagi dokumen HTML dan 10 md bagi semua file lainnya.

## Pengalaman hello world

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

Kita akan mulai dengan markup HTML dasar dan gambar tunggal; tanpa CSS atau JavaScript. Mari kita buka timeline Network di Chrome DevTools dan periksa jenjang sumber daya yang dihasilkan:

<img src="images/waterfall-dom.png" alt=""  alt="CRP">

Note: Walaupun dokumen ini menggunakan DevTools untuk mengilustrasikan konsep CRP, DevTools
saat ini tidak cocok untuk analisis CRP. Lihat [Bagaimana dengan
DevTools?](measure-crp#devtools) untuk informasi selengkapnya.

Sebagaimana yang diharapkan, file HTML memerlukan waktu sekitar 200 md untuk diunduh. Perhatikan, bagian transparan pada garis biru menyatakan waktu tunggu browser di jaringan tanpa menerima byte respons sementara bagian yang padat menampilkan waktu untuk menyelesaikan pengunduhan setelah byte respons pertama diterima. Ukuran unduhan HTML kecil (<4 K), jadi kita hanya membutuhkan satu kali bolak-balik untuk mengambil file lengkap. Hasilnya, dokumen HTML memerlukan waktu sekitar 200 md untuk diambil, dengan setengah dari waktunya dihabiskan untuk menunggu di jaringan, dan separuh lagi untuk menunggu respons server.

Bila materi HTML tersedia, browser akan mem-parse byte, mengonversinya menjadi token, dan membangun pohon DOM. Perhatikan, DevTools dengan mudah melaporkan waktu untuk kejadian DOMContentLoaded di bawah (216 md), yang juga dinyatakan dengan garis vertikal biru. Selisih antara akhir pengunduhan HTML dan garis vertikal biru (DOMContentLoaded) adalah waktu yang dihabiskan browser untuk membangun pohon DOM&mdash;dalam hal ini, hanya beberapa milidetik.

Perhatikan, "awesome photo" kita tidak memblokir kejadian `domContentLoaded`. Ternyata, kita bisa membangun pohon render dan bahkan menggambar laman tanpa menunggu setiap aset pada laman: **tidak semua sumber daya wajib menghasilkan penggambaran pertama yang cepat**. Sebenarnya, bila membicarakan tentang jalur rendering penting, biasanya kita membicarakan markup HTML, CSS, dan JavaScript. Gambar tidak memblokir render awal laman&mdash;meskipun kita juga harus mencoba menggambar gambar sesegera mungkin.

Dengan demikian, kejadian `load` (disebut juga dengan `onload`), diblokir pada gambar: DevTools melaporkan kejadian `onload` pada 335 md. Ingatlah bahwa kejadian `onload` menandai titik ketika **semua sumber daya** yang diperlukan oleh laman telah diunduh dan diproses; ini adalah titik ketika spinner pemuatan bisa berhenti berputar dalam browser (garis vertikal merah dalam jenjang).


## Menambahkan JavaScript dan CSS ke dalam campuran

Laman "pengalaman Hello World" kita tampaknya sederhana namun banyak yang terjadi di balik itu semua. Pada praktiknya kita juga akan memerlukan lebih dari sekadar HTML: kemungkinannya adalah, kita akan memiliki stylesheet CSS dan satu atau beberapa skrip untuk menambahkan beberapa interaktivitas ke laman. Marilah kita tambahkan keduanya pada campuran dan melihat apa yang terjadi:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_timing.html){: target="_blank" .external }

_Sebelum menambahkan JavaScript dan CSS:_

<img src="images/waterfall-dom.png" alt="DOM CRP" >

_Dengan JavaScript dan CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" >

Penambahan file JavaScript dan CSS eksternal akan menambahkan dua permintaan ekstra ke jenjang kita, yang semuanya yang dikirim pada waktu yang hampir bersamaan oleh browser. Akan tetapi, **perhatikan sekarang ada banyak selisih waktu lebih kecil antara kejadian `domContentLoaded` dan `onload`.**

Apa yang terjadi?

* Tidak seperti contoh HTML biasa, kita juga perlu mengambil dan mem-parse file CSS untuk membangun CSSOM, dan kita membutuhkan DOM maupun CSSOM untuk membangun pohon render.
* Karena laman juga berisi file JavaScript pemblokir parser di laman, kejadian `domContentLoaded` akan diblokir hingga file CSS diunduh dan di-parse: karena JavaScript mungkin akan membuat kueri CSSOM, maka kita harus memblokir file CSS hingga selesai diunduh agar kita bisa mengeksekusi JavaScript.

**Bagaimana jika kita menggantikan skrip eksternal dengan skrip inline?** Meskipun skrip dibuat inline secara langsung ke dalam laman, browser tidak bisa mengeksekusinya sebelum CSSOM dibangun. Singkatnya, JavaScript yang disisipkan juga merupakan pemblokir parser.

Dengan demikian, meski memblokir CSS, apakah penyisipan skrip secara inline akan membuat render laman menjadi lebih cepat? Mari kita coba dan lihat apa yang terjadi.

_JavaScript Eksternal:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" >

_JavaScript Disisipkan:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM, dan JS yang disisipkan inline" >

Kita menghilangkan satu permintaan, namun waktu `onload` dan `domContentLoaded` secara efektif sama. Mengapa? Seperti yang kita ketahui, tidak masalah apakah JavaScript inline atau eksternal, karena begitu browser mencapai tag skrip, browser akan memblokir dan menunggu CSSOM dibangun. Lebih jauh, dalam contoh pertama, browser mengunduh CSS maupun JavaScript secara bersamaan dan selesai mengunduhnya pada waktu yang hampir bersamaan. Dalam hal ini, menyisipkan kode JavaScript secara inline tidak terlalu membantu. Namun ada sejumlah strategi yang bisa membuat laman kita dirender lebih cepat.

Pertama-tama, ingatlah bahwa semua skrip inline adalah pemblokir parser, namun untuk skrip eksternal kita dapat menambahkan kata kunci "async" untuk membuka kunci parser. Mari kita urungkan penyisipan dan mencoba yang itu:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_async.html){: target="_blank" .external }

_Pemblokiran parser JavaScript (eksternal):_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" >

_Async JavaScript (eksternal):_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, JS asinkron" >

Jauh lebih baik! Kejadian `domContentLoaded` dipicu tidak lama setelah HTML di-parse; browser tahu tidak boleh memblokir JavaScript dan karena tidak ada skrip pemblokiran parser lainnya, konstruksi CSSOM juga bisa berlangsung secara bersamaan.

Alternatifnya, kita bisa membuat CSS dan JavaScript secara inline:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_inlined.html){: target="_blank" .external }

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, CSS inline, JS inline" >

Perhatikan, waktu `domContentLoaded` secara efektif sama seperti dalam contoh sebelumnya; sebagai ganti menandai JavaScript kita sebagai asinkron, kita telah menyisipkan baik CSS dan JS ke dalam laman itu sendiri secara inline. Ini membuat laman HTML kita menjadi jauh lebih besar, namun keuntungannya adalah browser tidak harus menunggu mengambil sumber daya eksternal; semuanya sudah ada di laman itu.

Seperti yang Anda dapat lihat, meski dengan satu laman sederhana, mengoptimalkan jalur rendering penting merupakan latihan yang tidak remeh: kita harus memahami ketergantungan grafik antar berbagai sumber daya berbeda, kita perlu mengidentifikasikan sumber daya mana yang "penting", dan kita harus memilih di antara berbagai strategi berbeda mengenai cara menyertakan sumber daya tersebut pada laman. Tidak ada satu solusi untuk masalah ini; setiap laman berbeda. Anda perlu mengikuti proses serupa untuk mencari tahu sendiri strategi yang optimal.

Dengan demikian, mari kita lihat apakah kita bisa mundur selangkah dan mengidentifikasi beberapa pola kinerja umum.

## Pola kinerja

Laman paling sederhana mungkin hanya terdiri dari markup HTML: tanpa CSS, tanpa JavaScript, atau tipe sumber daya lainnya. Untuk merender laman ini, browser harus memulai permintaan, tunggu dokumen HTML tiba, lakukan parse, bangun DOM dan terakhir render pada layar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

<img src="images/analysis-dom.png" alt="Hello world CRP" >

**Waktu antara T<sub>0</sub> dan T<sub>1</sub> merekam waktu pemrosesan jaringan dan server.** Dalam kasus terbaik (jika file HTML-nya kecil), hanya perlu satu kali bolak-balik di jaringan untuk mengambil dokumen lengkap. Mengingat cara kerja protokol transpor TCP, file yang lebih besar mungkin perlu bolak-balik lebih banyak. **Akibatnya, dalam kasus terbaik, laman di atas memiliki satu (minimum) jalur rendering penting bolak-balik.**

Sekarang, marilah kita pertimbangkan laman yang sama namun dengan file CSS eksternal:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css.html){: target="_blank" .external }

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

Sekali lagi, kita menghabiskan satu kali bolak-balik jaringan untuk mengambil dokumen HTML, kemudian markup yang diambil akan memberi tahu bahwa kita juga memerlukan file CSS; ini berarti browser harus kembali ke server dan mengambil CSS agar bisa merender laman pada layar. **Akibatnya, laman ini perlu minimum dua kali bolak-balik agar bisa menampilkannya.** Sekali lagi, file CSS mungkin perlu beberapa kali bolak-balik, sehingga penekanannya adalah "minimum".

Mari kita definisikan kosa kata yang akan digunakan untuk menjelaskan jalur rendering penting:

* **Sumber Daya Penting:** Sumber daya yang bisa memblokir rendering awal laman.
* **Panjang Jalur Penting:** Jumlah bolak-balik, atau total waktu yang diperlukan untuk mengambil semua sumber daya penting.
* **Byte Penting:** Total jumlah byte yang diperlukan untuk mendapatkan render pertama laman, yaitu jumlah ukuran file yang ditransfer dari semua sumber daya penting.
Contoh pertama kita dengan satu laman HTML yang berisi satu sumber daya penting (dokumen HTML); panjang jalur pentingnya juga sama dengan satu kali bolak-balik jaringan (dengan anggapan ukuran file kecil), dan total byte penting hanya seukuran transfer dokumen HTML itu sendiri.

Sekarang marilah kita bandingkan dengan karakteristik jalur penting dari contoh HTML + CSS di atas:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

* **2** sumber daya penting
* **2** atau lebih perjalanan bolak balik untuk panjang jalur penting minimum.
* **9** KB byte penting

Kita memerlukan HTML maupun CSS untuk membangun pohon render. Akibatnya, HTML dan CSS sama-sama menjadi sumber daya penting: CSS hanya diambil setelah browser mendapatkan dokumen HTML, sehingga panjang jalur pentingnya adalah minimum dua kali bolak-balik. Total jumlah kedua sumber daya menjadi 9 KB byte penting.

Sekarang mari kita tambahkan file JavaScript ekstra ke dalam campuran.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js.html){: target="_blank" .external }

Kita telah menambahkan `app.js`, yang keduanya merupakan aset JavaScript eksternal pada laman dan sumber daya pemblokiran parser (yang penting). Yang lebih buruk, untuk mengeksekusi file JavaScript kita harus memblokir dan menunggu CSSOM - ingatlah bahwa JavaScript bisa membuat kueri CSSOM dan karena itu browser akan dihentikan sementara hingga `style.css` diunduh dan CSSOM dibangun.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" >

Dengan demikian, pada praktiknya jika melihat "jenjang jaringan" laman ini, Anda akan melihat bahwa baik permintaan CSS maupun JavaScript akan dimulai pada waktu yang hampir bersamaan; browser mendapatkan HTML, menemukan kedua sumber daya, dan memulai kedua permintaan. Hasilnya, laman di atas memiliki karakteristik jalur penting berikut:

* **3** sumber daya penting
* **2** atau lebih perjalanan bolak balik untuk panjang jalur penting minimum.
* **11** KB byte penting

Sekarang kita memiliki tiga sumber daya penting yang jumlahnya hingga 11 KB byte penting, namun panjang jalur penting kita masih dua kali bolak-balik karena kita bisa mentransfer CSS dan JavaScript secara bersamaan. **Dengan mengetahui karakteristik jalur rendering penting berarti kita bisa mengidentifikasi sumber daya penting, dan memahami cara browser menjadwalkan pengambilannya.** Mari kita lanjutkan dengan contoh.

Setelah chatting dengan para developer situs, kita menyadari bahwa JavaScript yang disertakan pada laman tidak perlu diblokir; kita memiliki beberapa analitik dan kode lain di dalamnya yang tidak perlu memblokir rendering laman kita. Dengan mengetahui hal itu, kita bisa menambahkan atribut "async" ke tag skrip untuk membuka blokir parser:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, JavaScript CRP asinkron" >

Skrip asinkron memiliki sejumlah kelebihan:

* Skrip tidak lagi merupakan pemblokiran parser dan bukan bagian dari jalur rendering penting.
* Karena tidak ada skrip penting lainnya, CSS juga tidak perlu memblokir kejadian `domContentLoaded`.
* Semakin cepat kejadian `domContentLoaded` dipicu, semakin cepat pula logika aplikasi bisa mulai dieksekusi.

Hasilnya, laman kita yang telah dioptimalkan kini kembali dengan dua sumber daya penting (HTML dan CSS), dengan panjang jalur penting minimum dua perjalanan bolak balik, dan total 9 KB byte penting.

Terakhir, jika stylesheet CSS hanya perlu dicetak, seperti apa penampilannya?

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_nb_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, CSS yang tidak memblokir, dan JavaScript CRP asinkron" >

Karena sumber daya style.css hanya digunakan untuk pencetakan, browser tidak perlu diblokir di situ untuk merender laman. Oleh karena itu, begitu konstruksi DOM selesai, browser memiliki cukup informasi untuk merender laman. Hasilnya, laman ini hanya merupakan sumber daya penting tunggal (dokumen HTML), dan panjang jalur rendering penting minimum adalah satu perjalanan bolak balik.

<a href="optimizing-critical-rendering-path" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Optimizing CRP">
  <button>Berikutnya: Mengoptimalkan Jalur Rendering Penting</button>
</a>


{# wf_devsite_translation #}
