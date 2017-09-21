project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google dan AnswerLab melakukan penelitian mengenai cara pengguna berinteraksi dengan berbagai situs seluler. Tujuannya adalah untuk menjawab pertanyaan, 'Apa yang membuat sebuah situs seluler bagus?'

{# wf_published_on: 2014-08-08 #}
{# wf_updated_on: 2015-09-17 #}

# Apa yang Membuat Sebuah Situs Seluler Bagus? {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google dan AnswerLab melakukan [studi penelitian](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals) untuk menjawab pertanyaan ini. 

> Pengguna seluler sangat berorientasi pada tujuan. Mereka berharap bisa mendapatkan apa yang mereka
> butuhkan, dengan segera, dan dengan cara mereka sendiri. 

Penelitian ini dilakukan dengan sesi kegunaan per-orang selama 119 jam dengan
partisipan dari AS. Para partisipan diminta untuk melakukan tugas-tugas kunci di
berbagai situs seluler. Termasuk pengguna iOS dan Android, dan pengguna
menguji situs tersebut di ponsel mereka sendiri. Untuk setiap situs, para partisipan diminta
untuk menyuarakan pemikiran mereka dengan keras karena mereka menyelesaikan tugas-tugas yang berfokus pada konversi seperti
melakukan pembelian atau pemesanan reservasi.

Penelitian ini menemukan 25 prinsip desain situs seluler, dikelompokkan ke dalam lima
kategori.

## Navigasi situs dan laman Beranda

Berhasil: Fokuskan beranda seluler Anda pada cara menghubungkan pengguna ke materi yang mereka cari.

### Pertahankan panggilan untuk aksi di depan dan tengah

Menyediakan tugas sekunder melalui [menu](/web/fundamentals/design-and-ux/responsive/)
atau "paro bawah" (bagian dari laman web yang tidak bisa dilihat tanpa gulir ke bawah).

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Memudahkan ketersediaan semua tugas yang paling sering dipakai pengguna.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Membuang ruang berharga paro-atas dengan panggil-untuk-aksi tidak jelas seperti "ketahui selengkapnya".
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Pertahankan menu yang singkat dan manis

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Pertahankan menu yang singkat dan manis.
     </figcaption>
  </figure>
</div>

Pengguna seluler tidak memiliki kesabaran untuk menggulir melalui daftar panjang opsi
untuk menemukan apa yang mereka inginkan. Tata ulang menu Anda agar menggunakan item sesedikit mungkin,
tanpa harus mengorbankan kegunaan.

<div style="clear:both;"></div>

### Mempermudah cara kembali ke laman beranda

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Mempermudah cara kembali ke laman beranda.
     </figcaption>
  </figure>
</div>

Pengguna ingin kembali ke beranda ketika mereka mengetuk logo di sudut kiri atas
laman seluler, dan mereka bisa frustrasi bila tidak tersedia atau tidak bekerja.

<div style="clear:both;"></div>

### Jangan biarkan promosi mencuri perhatian

Pengantara pemasangan aplikasi besar (mis. promosi selayar-penuh yang menyembunyikan materi
dan meminta pengguna untuk memasang aplikasi) menjengkelkan pengguna dan mempersulit saat
melakukan tugas. Selain menjengkelkan pengguna, situs yang menggunakan pengantara pemasangan aplikasi
tidak akan lolos
[Uji Ramah Google Seluler](https://search.google.com/test/mobile-friendly),
yang bisa berdampak negatif terhadap peringkat penelusuran mereka.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Promosi harus mudah ditutup dan tidak mengganggu pengalaman pengguna.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Pengantara (kadang-kadang disebut membanting pintu) sering menjengkelkan pengguna dan membuat menggunakan situs adalah sebuah penderitaan.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

## Penelusuran situs

Berhasil: Membantu pengguna seluler menemukan apa yang mereka cari dengan sangat cepat.

### Membuat penelusuran situs terlihat

Pengguna yang mencari informasi biasanya membuka penelusuran, sehingga bidang penelusuran
harus menjadi salah satu item utama yang mereka lihat di laman Anda. Jangan menyembunyikan kotak
telusur di menu.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>LAKUKAN</b>: Membuat penelusuran terlihat
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>JANGAN</b>: Menyembunyikan penelusuran di menu luapan
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Pastikan hasil penelusuran situs relevan

Pengguna tidak memindai beberapa laman dari hasil penelusuran untuk menemukan apa yang mereka
cari. Permudah pengguna dengan menyelesaikan-otomatis kueri, mengoreksi
kesalahan eja, dan menyarankan kueri terkait. Daripada menciptakan kembali
sesuatu yang sudah ada, pertimbangkan produk yang kuat seperti [Google Penelusuran Khusus](https://cse.google.com/cse/){: .external }.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Macy hanya mengembalikan barang anak-anak (kids).
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Mengembalikan hasil dengan kata anak (kid) di dalamnya.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Mengimplementasikan filter untuk mempersempit hasil

Partisipan penelitian mengandalkan [filter](/custom-search/docs/structured_search)
untuk menemukan apa yang mereka cari, dan meninggalkan situs yang tidak memiliki filter
yang efektif. Menempatkan filter di atas hasil penelusuran, dan membantu pengguna dengan menampilkan berapa
banyak hasil yang dikembalikan ketika filter tertentu diterapkan.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>LAKUKAN</b>: Permudah untuk memberi filter.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>JANGAN</b>: Menyembunyikan fungsionalitas filter.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Memandu pengguna agar hasil penelusuran situs lebih baik

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="Zappos memandu pengguna dengan bertanya apa yang mereka cari.">
    <figcaption class="success">
      <b>LAKUKAN</b>: Membantu pengguna untuk menemukan apa yang mereka cari dengan memandu mereka ke arah yang tepat.
     </figcaption>
  </figure>
</div>

Untuk situs dengan segmen pengguna yang beragam, ajukan beberapa pertanyaan sebelum menyajikan
kotak telusur, dan menggunakan respons pengguna sebagai filter kueri penelusuran untuk
memastikan bahwa pengguna mendapatkan hasil dari segmen yang paling relevan.

<div style="clear:both;"></div>

## Niaga dan konversi

Berhasil: Memahami perjalanan pelanggan Anda dan membiarkan pengguna melakukan konversi dengan cara mereka sendiri. 

### Biarkan pengguna menjelajahi sebelum mereka berkomitmen

Partisipan penelitian frustrasi oleh situs yang mengharuskan pendaftaran di awal
untuk melihat situs, terutama ketika merek tersebut masih terdengar asing. Meskipun informasi
pelanggan mungkin integral untuk bisnis Anda, memintanya terlalu dini bisa
menyebabkan pendaftaran yang lebih sedikit.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Izinkan pengguna menjelajahi situs tanpa harus mendaftar masuk.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Menempatkan login atau registrasi terlalu awal dalam sebuah situs.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Izinkan pengguna membeli sebagai tamu

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Izinkan pengguna membeli dengan akun tamu.
     </figcaption>
  </figure>
</div>

Partisipan penelitian menganggap checkout tamu "nyaman", "sederhana", "mudah",
dan "cepat". Pengguna kesal oleh situs yang memaksa mereka mendaftarkan sebuah
akun saat melakukan pembelian, terutama ketika manfaat dari akun
tidak jelas.

<div style="clear:both;"></div>

### Menggunakan informasi yang ada untuk memaksimalkan kemudahan

Ingat dan
[pra-isi preferensi](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)
untuk pengguna terdaftar. Tawarkan layanan checkout pihak ketiga yang familier untuk pengguna baru.

### Menggunakan tombol click-to-call untuk tugas yang kompleks

Pada perangkat dengan kemampuan menelepon,
[tautan click-to-call](/web/fundamentals/native-hardware/click-to-call/) memungkinkan
pengguna untuk melakukan panggilan telepon hanya dengan mengetuk tautan. Pada kebanyakan perangkat seluler, pengguna
menerima konfirmasi sebelum nomor dihubungi, atau tampil menu yang akan
menanyakan pengguna bagaimana sebaiknya nomor ditangani.

### Buatlah mudah untuk diselesaikan pada perangkat lain

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Berikan cara mudah bagi pengguna untuk melanjutkan browsing atau berbelanja di perangkat lain.
     </figcaption>
  </figure>
</div>

Pengguna sering kali ingin menyelesaikan tugas pada perangkat lain. Misalnya, mereka
mungkin ingin menampilkan item pada layar yang lebih besar. Atau mereka mungkin sedang sibuk dan harus
menyelesaikannya nanti. Dukung perjalanan pelanggan ini dengan memungkinkan pengguna untuk
[berbagi item di jaringan sosial](/web/fundamentals/discovery-and-monetization/social-discovery/),
atau dengan memperbolehkan pengguna meng-email sendiri tautan secara langsung dari dalam situs.

<div style="clear:both;"></div>

## Entri formulir

Berhasil: Sediakan pengalaman konversi yang mulus dan tanpa friksi dengan formulir yang bisa dipakai.


### Merampingkan entri informasi

Secara otomatis maju ke bidang berikutnya ketika pengguna menekan Return. Secara umum,
semakin sedikit pengguna melakukan ketukan, semakin baik.

### Memilih masukan yang paling sederhana

Gunakan [tipe masukan yang paling tepat](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)
untuk setiap skenario. Gunakan elemen seperti
[`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist)
untuk menyediakan nilai yang disarankan untuk bidang.

### Menyediakan kalender visual untuk pemilihan tanggal

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: gunakan widget kalender jika memungkinkan.
     </figcaption>
  </figure>
</div>

Beri label tanggal awal dan akhir dengan jelas. Pengguna sebaiknya tidak perlu meninggalkan situs dan
memeriksa aplikasi kalender hanya untuk menjadwalkan suatu tanggal.

<div style="clear:both;"></div>

### Meminimalkan kesalahan formulir dengan label dan validasi real-time

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Pra-isi materi apabila memungkinkan.
     </figcaption>
  </figure>
</div>

Labeli input dengan benar dan validasi input secara real-time.

<div style="clear:both;"></div>

### Mendesain formulir efisien

Manfaatkan [isiotomatis](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)
sehingga pengguna bisa dengan mudah melengkapi formulir dengan data pra-isi. Pra-isi
bidang dengan informasi yang sudah Anda tahu. Misalnya, ketika mengambil alamat pengiriman
dan penagihan, cobalah untuk menggunakan
[`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)
atau memperbolehkan pengguna menyalin alamat pengiriman ke alamat penagihan mereka (atau sebaliknya). 

## Kegunaan dan faktor bentuk

Berhasil: Menyenangkan pengguna seluler dengan hal-hal kecil yang meningkatkan pengalaman mereka.

### Mengoptimalkan seluruh situs Anda untuk perangkat seluler

Menggunakan [layout responsif](/web/fundamentals/design-and-ux/responsive/) yang
bisa berubah berdasarkan ukuran dan kemampuan perangkat pengguna. Partisipan
penelitian menemukan bahwa situs dengan campuran laman yang dioptimalkan untuk seluler dan desktop, lebih
sulit digunakan dibandingkan situs khusus untuk desktop.

### Jangan buat pengguna melakukan cubit-untuk-zoom

Pengguna merasa nyaman dengan pengguliran situs secara vertikal, namun tidak secara horizontal.
Hindari elemen dengan lebar tetap dan besar. Gunakan
[kueri media CSS](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)
untuk menerapkan penataan gaya yang berbeda untuk layar berbeda. Jangan membuat materi yang
hanya terlihat baik pada
[lebar tampilan yang terlihat](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) tertentu.
Situs yang memaksa pengguna untuk gulir secara horizontal tidak akan lolos
[Uji Ramah-Google Seluler](https://search.google.com/test/mobile-friendly),
yang bisa berdampak negatif terhadap peringkat penelusuran.

### Membuat gambar produk yang bisa diperbesar

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Membuat gambar produk yang bisa diperbesar sehingga mudah untuk melihat detailnya.
     </figcaption>
  </figure>
</div>

Pelanggan retail berharap situs mengizinkan mereka
[melihat tampilan dekat resolusi tinggi](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)
dari produk. Partisipan penelitian merasa kecewa ketika mereka tidak bisa melihat
apa yang mereka beli.

<div style="clear:both;"></div>

### Memberi tahu pengguna orientasi yang terbaik

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>LAKUKAN</b>: Memberi tahu pengguna orientasi yang terbaik.
     </figcaption>
  </figure>
</div>

Partisipan penelitian biasanya tetap menggunakan orientasi layar yang sama sampai
sesuatu mendorong mereka untuk beralih. Desain untuk mode lanskap dan potret,
atau dorong pengguna agar beralih ke orientasi optimal. Pastikan bahwa
panggil-untuk-aksi yang penting bisa diselesaikan bahkan jika pengguna mengabaikan
saran untuk beralih orientasi.

<div style="clear:both;"></div>

### Menjaga pengguna tetap di satu jendela browser

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Macy mempertahankan pengguna di situs mereka dengan memberikan kupon di situs.
     </figcaption>
  </figure>
</div>

Pengguna mungkin mengalami kesulitan saat beralih antar jendela dan mungkin tidak dapat menemukan
jalan kembali ke situs. Hindari panggil-untuk-aksi yang membuka jendela baru.
Identifikasi setiap proses yang mungkin menyebabkan pengguna mencari di luar situs dan
menyediakan fitur agar mereka tetap berada di situs Anda. Misalnya, jika Anda menerima kupon,
langsung tawarkan kepada mereka di situs, bukannya memaksa pengguna mencari penawaran di situs
lainnya.

<div style="clear:both;"></div>

### Hindari pelabelan "situs lengkap"

Ketika partisipan penelitian melihat opsi untuk "situs lengkap" (situs desktop)
versus "situs seluler", mereka berpikir bahwa situs seluler kekurangan materi dan memilih
"lengkap", yang mengarahkan mereka ke situs desktop.


### Jelaskan mengapa Anda memerlukan lokasi pengguna

Pengguna harus selalu mengerti alasan Anda meminta
[lokasi](/web/fundamentals/native-hardware/user-location/) mereka. Partisipan
penelitian yang mencoba untuk memesan hotel di kota lain menjadi bingung ketika sebuah
situs perjalanan mendeteksi lokasi mereka dan menawarkan hotel di kota mereka yang
sekarang ini. Biarkan bidang lokasi kosong secara default, dan izinkan pengguna untuk
mengisinya melalui panggil-untuk-aksi yang jelas seperti "Find Near Me".

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Selalu minta akses ke lokasi berdasarkan isyarat pengguna.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Memintanya secara langsung di beranda saat situs sedang memuat akan menjadikan pengalaman pengguna yang buruk.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
