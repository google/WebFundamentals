project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengguna akan tahu jika situs dan aplikasi tidak berjalan dengan baik, jadi optimalisasi kinerja rendering sangatlah penting!

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Kinerja Rendering {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Pengguna web saat ini
[berharap agar laman yang mereka kunjungi akan interaktif dan berjalan mulus](https://paul.kinlan.me/what-news-readers-want/)
dan karena itulah Anda perlu semakin memfokuskan waktu dan usaha. Laman
tidak hanya harus cepat dimuat, namun juga berjalan dengan baik; guliran
harus secepat gerakan jari, dan animasi serta interaksi harus sehalus sutera.

Untuk menulis situs dan aplikasi yang berkinerja, Anda perlu memahami cara HTML, JavaScript dan CSS ditangani oleh browser, dan memastikan bahwa kode yang Anda tulis (dan kode pihak ke-3 yang disertakan) berjalan seefisien mungkin.

## 60 fps dan Laju Penyegaran Perangkat

<div class="attempt-right">
  <figure>
    <img src="images/intro/response.jpg" alt="Pengguna sedang berinteraksi dengan situs web.">
  </figure>
</div>

Sebagian besar perangkat sekarang ini memperbarui layarnya **60 kali per detik**. Jika ada
animasi atau transisi yang sedang berjalan, atau pengguna yang sedang menggulir laman,
browser perlu mencocokkan laju penyegaran perangkat dan menempatkan 1 gambar baru, atau
bingkai, untuk setiap pembaruan layar itu.


Setiap bingkai itu memiliki alokasi waktu hanya 16 md (1 detik / 60 = 16,66 md).
Akan tetapi, pada kenyataannya browser memiliki pekerjaan rumah untuk dilakukan, jadi semua pekerjaan
Anda harus diselesaikan dalam waktu **10 md**. Bila Anda gagal memenuhi alokasi waktu
ini, laju bingkai akan turun, dan materi akan bergoyang di layar. Hal ini
sering kali disebut dengan **jank**, dan berdampak negatif pada pengalaman pengguna.

## Saluran piksel

Ada lima bidang utama yang perlu Anda ketahui dan ingat saat
bekerja. Bidang-bidang itulah yang bisa Anda kontrol dan menjadi poin utama dalam
saluran piksel-ke-layar:

<img src="images/intro/frame-full.jpg"  alt="Pipeline piksel penuh">

* **JavaScript**. Biasanya JavaScript digunakan untuk menangani pekerjaan yang akan mengakibatkan perubahan visual, baik berupa fungsi `animate` jQuery, pengurutan set data, atau penambahan elemen DOM ke laman. Walau begitu, tidak harus JavaScript yang memicu perubahan visual: CSS Animations, Transitions, dan Web Animations API, juga umum digunakan.
* **Penghitungan gaya**. Inilah proses untuk mengetahui aturan CSS mana yang berlaku pada suatu elemen berdasarkan pemilih kecocokan, misalnya, `.headline` atau `.nav > .nav__item`. Dari sana, begitu diketahui, aturan akan diterapkan dan gaya akhir untuk setiap elemen akan dihitung.
* **Layout**. Setelah browser mengetahui aturan yang akan diterapkan pada elemen, browser bisa mulai menghitung banyaknya ruang diperlukan dan lokasinya di layar. Model layout web berarti satu elemen bisa memengaruhi elemen lainnya; misalnya, lebar elemen `<body>` biasanya memengaruhi lebar anaknya dan seterusnya ke atas dan ke bawah pohon tersebut, sehingga proses itu berpengaruh luas untuk browser.
* **Menggambar**. Menggambar adalah proses pengisian piksel. Ini termasuk menggambar teks, warna, gambar, border, dan bayangan, pokoknya setiap komponen visual elemen. Menggambar biasanya dilakukan pada beberapa permukaan sekaligus, yang biasa disebut layer.
* **Komposisi**. Karena bagian-bagian laman kemungkinan digambar ke dalam sekian banyak layer sekaligus, maka perlu digambar ke layar dalam urutan yang benar agar laman bisa di-render dengan benar. Hal ini sangat penting bagi elemen yang saling tumpang tindih, karena suatu kesalahan dapat mengakibatkan satu elemen muncul di atas elemen lain secara salah.

Masing-masing bagian pipeline ini mewakili kemungkinan munculnya jank, jadi kita perlu memahami secara persis bagian pipeline mana yang akan dipicu oleh kode Anda.

Kadang-kadang Anda mungkin mendengar istilah "rasterize" digunakan bersama paint.
Ini karena menggambar sebenarnya adalah dua tugas: 1) membuat daftar panggilan
draw, dan 2) pengisian piksel.

Yang kedua disebut "rasterisasi" jadi kapan saja melihat catatan paint di
DevTools, Anda harus menganggapnya sebagai termasuk rasterisasi. (Di beberapa
arsitektur, pembuatan daftar panggilan draw dan rasterisasi dilakukan di thread
berbeda, namun hal itu tidak bisa dikontrol oleh developer.)

Anda tidak harus selalu menyentuh setiap bagian saluran di setiap bingkai.
Pada kenyataannya, ada tiga cara penyaluran _biasanya_ digunakan untuk bingkai yang
diberikan saat Anda membuat perubahan visual, baik dengan JavaScript, CSS, maupun
Animasi Web:

### 1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg"  alt="Pipeline piksel penuh">

Jika Anda mengubah properti “layout”, sehingga properti yang mengubah geometri
elemen, seperti lebar, tinggi, atau posisinya dengan kiri atau atas, maka browser
harus memeriksa semua elemen lainnya dan "mengubah posisi/geometri" laman. Area yang
terpengaruh perlu digambar ulang, dan elemen hasil penggambaran akhir perlu
disusun kembali bersama-sama.

### 2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" alt="Pipeline piksel tanpa layout.">

Jika Anda mengubah properti “paint only”, seperti gambar latar belakang, warna teks, atau
bayangan, yakni yang tidak memengaruhi layout laman, maka browser akan melewati
layout, namun tetap akan menggambar.

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" alt="Pipeline piksel tanpa layout atau paint.">

Jika Anda mengubah properti yang tidak memerlukan layout maupun paint, maka
browser akan melompatinya untuk melakukan komposisi saja.

Versi akhir ini paling murah dan paling diinginkan untuk titik tekanan tinggi
dalam daur hidup aplikasi, seperti animasi atau pengguliran.

Note: Jika Anda ingin mengetahui manakah dari ketiga versi di atas yang mengubah properti CSS yang akan dipicu, lihat [Pemicu CSS](https://csstriggers.com). Dan jika Anda ingin jalur cepat ke animasi berkinerja tinggi, bacalah bagian tentang [mengubah properti compositor-saja](stick-to-compositor-only-properties-and-manage-layer-count).

Kinerja adalah seni menghindari pekerjaan, dan membuat pekerjaan yang Anda lakukan jadi
seefisien mungkin. Umumnya, ini adalah tentang bekerja sama dengan browser, bukan
melawannya. Perlu diingat bahwa pekerjaan yang tercantum di atas di
saluran berbeda dalam artian biaya komputasi; sebagian tugas lebih mahal dibanding
yang lain!

Mari kita pelajari lebih jauh aneka bagian pipeline ini. Kita akan mengamati
berbagai masalah umum serta cara mendiagnosis dan memperbaikinya.

{% include "web/_shared/udacity/ud860.html" %}


{# wf_devsite_translation #}
