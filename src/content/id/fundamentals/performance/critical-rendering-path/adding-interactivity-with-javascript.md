project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript memungkinkan kita untuk memodifikasi hampir semua aspek laman: materi, penataan gaya, dan responsnya terhadap interaksi pengguna. Namun demikian, JavaScript juga bisa memblokir konstruksi DOM dan menunda waktu laman di-render. Untuk menghasilkan kinerja yang optimal, jadikan JavaScript Anda asinkron dan tiadakan setiap JavaScript yang tidak penting dari jalur rendering penting.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# Menambahkan Interaktivitas dengan JavaScript {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

JavaScript memungkinkan kita untuk memodifikasi hampir semua aspek laman: materi,
penataan gaya, dan responsnya terhadap interaksi pengguna. Akan tetapi, JavaScript juga
bisa memblokir konstruksi DOM dan menunda waktu laman dirender. Untuk menghasilkan kinerja
yang optimal, jadikan JavaScript Anda asinkron dan tiadakan setiap JavaScript yang tidak penting
dari jalur rendering penting.

### TL;DR {: .hide-from-toc }
- JavaScript bisa melakukan kueri dan memodifikasi DOM dan CSSOM.
- Eksekusi JavaScript akan memblokir di CSSOM.
- JavaScript memblokir konstruksi DOM kecuali secara tegas dideklarasikan sebagai asinkron.


JavaScript adalah bahasa dinamis yang berjalan di browser dan memungkinkan kita untuk mengubah hampir setiap aspek dari cara kerja laman: kita bisa memodifikasi materi dengan menambahkan atau membuang elemen dari pohon DOM; kita bisa memodifikasi properti CSSOM setiap elemen, kita bisa menangani masukan pengguna; dan banyak lagi. Untuk mengilustrasikan hal ini, mari kita perkaya contoh "Hello World" sebelumnya dengan skrip inline sederhana:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* JavaScript memungkinkan kita mengakses DOM dan mengambil referensi ke simpul bentang tersembunyi; simpul ini mungkin tidak terlihat di pohon render, namun masih ada di DOM. Selanjutnya, bila memiliki referensinya, kita bisa mengubah teksnya (lewat .textContent), dan bahkan mengganti perhitungan properti gaya tampilannya dari "none" menjadi "inline". Kini laman kita menampilkan "**Hello interactive students!**".

* JavaScript juga memungkinkan kita untuk membuat, menata gaya, menambahkan, dan membuang elemen baru di DOM. Secara teknis, keseluruhan laman kita bisa berupa satu file JavaScript besar saja yang membuat dan menata gaya elemen satu per satu. Walau itu bisa dilakukan, dalam praktiknya menggunakan HTML dan CSS jauh lebih mudah. Dalam bagian kedua fungsi JavaScript, kita membuat elemen div yang baru, menetapkan materi teksnya, menggayakannya, dan menambahkannya ke tubuh.

<img src="images/device-js-small.png"  alt="pratinjau laman">

Dengan hal itu, kita telah memodifikasi materi dan gaya CSS dari simpul DOM saat ini, dan menambahkan seluruh simpul yang baru ke dokumen. Laman kita tidak akan memenangkan penghargaan desain, namun laman menggambarkan kemampuan dan fleksibilitas yang ditawarkan JavaScript kepada kita.

Akan tetapi, walaupun JavaScript menawarkan banyak kemampuan kepada kita, banyak batasan tambahan yang ditimbulkan dalam hal bagaimana dan kapan laman dirender.

Pertama, perhatikan bahwa dalam contoh di atas, skrip inline kita ada di bagian bawah laman. Mengapa? Anda harus mencobanya sendiri, namun jika kita memindahkan skrip di atas elemen _span_, Anda akan melihat bahwa skrip akan gagal dan mengeluh bahwa ia tidak bisa menemukan referensi ke elemen _span_ dalam dokumen - yaitu, _getElementsByTagName(‘span')_ akan mengembalikan _null_. Ini mendemonstrasikan properti penting: skrip kita dieksekusi pada titik penyisipan yang tepat di dalam dokumen. Bila parser HTML menemukan tag skrip, parser akan menghentikan sementara proses konstruksi DOM dan memperoleh kontrol ke mesin JavaScript; setelah mesin JavaScript selesai dijalankan, browser kemudian mengambilnya dari tempat terakhir meninggalkannya dan melanjutkan konstruksi DOM.

Dengan kata lain, blok skrip kita tidak dapat menemukan elemen apa pun di bagian bawah laman karena belum diproses! Atau, dengan kata lain: **mengeksekusi skrip inline akan memblokir konstruksi DOM, yang juga akan menunda render awal.**

Properti samar lainnya dari pengenalan skrip ke dalam laman kita adalah skrip dapat membaca dan mengubah tidak hanya DOM namun juga properti CSSOM. Faktanya, itulah yang sebenarnya kita lakukan dalam contoh kita ketika kita mengubah properti tampilan dari elemen bentang dari none ke inline. Hasil akhirnya? Sekarang kita memiliki kondisi kejar mengejar.

Bagaimana jika browser belum selesai mengunduh dan membangun CSSOM ketika kita ingin menjalankan skrip kita? Jawabannya sederhana dan tidak cukup bagus untuk kinerja: **browser akan menunda eksekusi skrip dan konstruksi DOM hingga ia selesai mengunduh dan membangun CSSOM.**

Singkatnya, JavaScript menimbulkan banyak dependensi baru di antara eksekusi DOM, CSSOM, dan JavaScript. Hal ini bisa menyebabkan penundaan browser secara signifikan dalam pemrosesan dan rendering laman pada layar:

* Lokasi skrip dalam dokumen sifatnya signifikan.
* Bila browser menemukan tag skrip, konstruksi DOM akan berhenti sementara hingga skrip selesai dieksekusi.
* JavaScript bisa melakukan kueri dan memodifikasi DOM dan CSSOM.
* Eksekusi JavaScript akan berhenti sementara hingga CSSOM siap.

Secara garis besarnya, "optimalisasi jalur rendering penting" mengacu pada pemahaman dan optimalisasi grafik dependensi antara HTML, CSS, dan JavaScript.

## Pemblokiran parser versus JavaScript asinkron

Secara default, eksekusi JavaScript adalah "pemblokiran parser": bila browser menemukan skrip dalam dokumen, browser harus menghentikan sementara konstruksi DOM, menyerahkan kontrol ke waktu proses JavaScript, dan membiarkan skrip dieksekusi sebelum melanjutkan dengan konstruksi DOM. Kita melihat aksinya pada skrip inline dalam contoh kita sebelumnya. Sebenarnya, skrip inline selalu memblokir parser kecuali jika Anda menulis kode tambahan untuk menunda eksekusinya.

Bagaimana dengan skrip yang disertakan lewat tag skrip? Mari kita ambil contoh sebelumnya dan mengekstrak kode kita ke dalam file terpisah:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

Baik kita menggunakan tag &lt;script&gt; atau cuplikan JavaScript inline, Anda
diharapkan untuk bertindak dengan cara yang sama. Di kedua kasus, browser akan berhenti sementara dan
mengeksekusi skrip sebelum bisa memproses bagian selebihnya dalam dokumen.
Akan tetapi, **untuk kasus file JavaScript eksternal, browser juga harus berhenti sementara dan menunggu
skrip diambil dari disk, cache, atau server jarak jauh, yang
bisa menambah penundaan dari puluhan hingga ribuan milidetik pada jalur rendering
penting.**

Secara default, semua JavaScript memblokir parser. Browser tidak tahu apa yang akan dilakukan skrip pada laman, sehingga harus beranggapan dengan skenario terburuk dan memblokir parser. Sebuah petunjuk bagi browser bahwa skrip tidak perlu dieksekusi pada titik yang persis dengan yang direferensikan akan memungkinkan browser melanjutkan konstruksi DOM dan membiarkan skrip dieksekusi bila sudah siap; misalnya, setelah file diambil dari cache atau server jauh.  

Untuk mencapai hal ini, kita menandai skrip kita sebagai _async_:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

Penambahan kata kunci async ke tag skrip akan memberi tahu browser agar tidak memblokir konstruksi DOM selagi menunggu skrip tersedia, yang secara signifikan bisa meningkatkan kinerja.

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>Berikutnya: Mengukur Jalur Rendering Penting</button>
</a>


{# wf_devsite_translation #}
