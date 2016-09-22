project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google dan AnswerLab melakukan penelitian bagaimana pengguna berinteraksi dengan beragam situs seluler. Tujuannya adalah untuk menjawab pertanyaan, 'Apa yang membuat situs ponsel yang baik?'

{# wf_updated_on: 2016-09-01 #}
{# wf_published_on: 2014-08-08 #}

# Prinsip-prinsip desain situs {: .page-title }


{% include "_shared/contributors/petelepage.html" %}

#### Apa yang membuat situs ponsel lebih baik?

Google dan AnswerLab melakukan [penelitian](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals) untuk menjawab pertanyaan ini. 
Kuncinya: 


> Pengguna ponsel sangat berorientasi pada tujuan. Mereka berharap untuk bisa mendapatkan apa yang mereka butuhkan, segera, dan dengan cara mereka sendiri. 


Penelitian ini dilakukan selama 119 jam, sesi kedayagunaan in-person dengan peserta di AS. Peserta diminta untuk melakukan tugas-tugas penting di beragam situs mobile. Pengguna iOS dan Android termasuk di dalamnya, dan pengguna menguji situs di ponsel mereka sendiri. Untuk setiap situs, peserta diminta untuk menyampaikan pikiran mereka pada saat mereka telah menyelesaikan tugas-tugas yang berfokus pada pendaftaran, seperti melakukan pembelian atau melakukan pemesanan. 

Penelitian ini menemukan 25 prinsip desain situs mobile, dikelompokkan ke dalam lima kategori.

## Halaman awal dan navigasi situs


Pusatkan perhatian halaman mobile Anda pada tujuan untuk menghubungkan pengguna pada konten yang dicari.


### 1. Buat supaya panggilan untuk beraksi berada di posisi terdepan dan berada di tengah

Buat supaya tugas-tugas sekunder tersedia melalui [menu](/web/fundamentals/design-and-ui/responsive/) atau “di bawah lipatan” 
(bagian dari halaman yang tidak bisa dilihat tanpa digulir ke bawah).


<figure class="attempt-left">
  <img src="images/hpnav-cta-good.png">
  <figcaption class="success">Lakukan: buat agar semua tugas penting tersedia dengan mudah.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/hpnav-cta-bad.png">
  <figcaption class="warning">Jangan lakukan: memboroskan ruang berharga di atas dengan calls-to-action seperti “Pelajari lebih lanjut”.</figcaption>
</figure>

<div class="clearfix"></div>


### 2. Buat agar menu singkat dan manis

<figure class="attempt-right">
  <img src="images/hpnav-menus-good.png">
  <figcaption class="success">Lakukan: buat agar menu singkat dan manis.</figcaption>
</figure>

Pengguna ponsel tidak memiliki kesabaran untuk menggulir daftar panjang pilihan untuk menemukan apa yang mereka inginkan. Tata ulang menu Anda agar lebih singkat, tanpa mengorbankan kegunaannya.

<div class="clearfix"></div>


### 3. Mudahkan untuk kembali ke halaman awal

<figure class="attempt-right">
  <img src="images/hpnav-hp-good.png">
  <figcaption class="success">Lakukan: Buat agar mudah untuk kembali ke halaman awal.</figcaption>
</figure>

Pengguna mengharapkan untuk kembali ke halaman awal ketika mereka tekan logo di kiri atas halaman mobile, dan mereka akan frustrasi ketika fitur ini tidak tersedia, atau tidak bekerja. 


<div class="clearfix"></div>

### 4. Jangan biarkan promosi mencuri perhatian 

Aplikasi interstitial yang besar (Contoh: promosi satu halaman penuh yang menyembunyikan konten dan meminta pengguna untuk menginstal aplikasi) mengganggu pengguna dan membuat sulit untuk melakukan tugas-tugas. Di samping mengganggu pengguna, situs yang menggunakan aplikasi interstitial terbukti gagal [Google Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/), yang berdampak negatif terhadap peringkat pencarian. 


<figure class="attempt-left">
  <img src="images/hpnav-promo-good.png">
  <figcaption class="success">Lakukan: Promosi harus mudah disingkirkan dan tidak mengalihkan perhatian.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/hpnav-promo-bad.png">
  <figcaption class="warning">Jangan lakukan: Interstitial (kadang-kadang disebut sebagai pembanting pintu) sering mengganggu pengguna dan membuat penjelajahan situs terasa menyakitkan.</figcaption>
</figure>

<div class="clearfix"></div>

## Site search

Bantu pengguna ponsel menemukan apa yang mereka cari saat sedang terburu-buru.


### 5. Buat pencari situs terlihat

Pengguna yang sedang mencari informasi biasanya beralih ke fitur pencarian, sehingga kolom pencarian harus menjadi salah satu hal pertama yang mereka lihat di halaman Anda. Jangan menyembunyikan kotak pencarian di menu.


<figure class="attempt-left">
  <img src="images/ss-search-good.jpg">
  <figcaption class="success">Lakukan: Buat fitur pencarian terlihat</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/ss-search-bad.jpg">
  <figcaption class="warning">Jangan lakukan: Menyembunyikan fitur pencarian berada di menu tersembunyi</figcaption>
</figure>
<div class="clearfix"></div>


### 6. Pastikan hasil pencarian situs relevan 

Pengguna biasanya tidak memindai melalui beberapa halaman hasil pencarian untuk menemukan apa yang mereka cari. Buat lebih mudah dengan menambahkan fitur auto-complete, memperbaiki salah eja, dan menyarankan permintaan terkait. Daripada membuat yang baru, pertimbangkan produk teruji seperti [Google Custom Search](https://cse.google.com/cse/). 


<figure class="attempt-left">
  <img src="images/ss-relevant-good.png" alt="Situs dengan hasil pencarian yang relevan">
  <figcaption class="success">Lakukan: Macy's menampilkan hanya item untuk anak-anak.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/ss-relevant-bad.png" alt="Pencarian menampilkan hasil yang tidak relevan">
  <figcaption class="warning">Jangan lakukan: Menampilkan semua hasil yang berisi kata "kid" di dalamnya.</figcaption>
</figure>
<div class="clearfix"></div>


### 7. Implementasikan penyaringan (filter) untuk mempersempit hasil pencarian

Peserta penelitian mengandalkan [filter](https://developers.google.com/custom-search/docs/structured_search) untuk menemukan apa yang mereka cari, dan meninggalkan situs yang tidak memiliki fitur penyaringan (filter). Letakkan filter di atas hasil pencarian, dan bantulah pengguna dengan menampilkan berapa banyak hasil akan dikembalikan ketika filter tertentu diterapkan.


<figure class="attempt-left">
  <img src="images/ss-filters-good.jpg">
  <figcaption class="success">Lakukan: Mudahkan dengan penyaringan (filter)</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/ss-filters-bad.jpg">
  <figcaption class="warning">Jangan Lakukan: Menyembunyikan fungsi penyaringan (filter).</figcaption>
</figure>
<div class="clearfix"></div>


### 8. Bimbing pengguna agar mendapatkan hasil pencarian situs yang lebih baik

<figure class="attempt-right">
  <img src="images/ss-guide-good.png" srcset="images/ss-guide-good.png 1x, images/ss-guide-good-2x.png 2x" alt="Zappos memandu pengguna dengan meminta mereka apa yang mereka cari.">
  <figcaption class="success">Lakukan: bantu pengguna untuk menemukan apa yang mereka cari dengan membimbing mereka ke arah yang benar.</figcaption>
</figure>

Untuk situs dengan segmen pelanggan yang beragam, ajukan beberapa pertanyaan sebelum menampilkan kotak pencarian dan gunakan tanggapan pelanggan sebagai filter permintaan pencarian untuk memastikan bahwa pengguna mendapatkan hasil dari segmen yang paling relevan. 


<div class="clearfix"></div>


## Perdagangan dan konversi

Memahami perilaku pelanggan Anda dan membiarkan pengguna untuk mendaftarkan diri atas kemauan mereka sendiri.


### 9. Biarkan pengguna menjelajah sebelum mereka mendaftarkan diri

Peserta penelitian merasa frustrasi oleh situs yang mengharuskan pendaftaran di awal sebelum melihat isi situs, terutama ketika nama institusi belum dikenal.
Meskipun informasi pelanggan menjadi bagian tak terpisahkan untuk bisnis Anda,
mengharuskan pendaftaran di awal justru bisa menurunkan minat calon pelanggan untuk mendaftar.



<figure class="attempt-left">
  <img src="images/cc-gates-good.png">
  <figcaption class="success">Lakukan: Persilahkan pengguna untuk menelusuri situs tanpa memerlukan pendaftaran.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/cc-gates-bad.png">
  <figcaption class="warning">Jangan lakukan: Menempatkan login atau formulir registrasi di awal situs dapat menurunkan tingkat peminatan.</figcaption>
</figure>
<div class="clearfix"></div>


### 10. Ijinkan pengguna untuk membeli sebagai tamu

<figure class="attempt-right">
  <img src="images/cc-purchase-guest-good.png">
  <figcaption class="success">Lakukan: Perbolehkan pengguna untuk membeli dengan akun sebagai tamu.</figcaption>
</figure>

Peserta penelitian melihat pembelian sebagai tamu lebih "nyaman", "sederhana", "mudah", dan "cepat ".
Pengguna merasa terganggu oleh situs yang memaksa mereka untuk mendaftar saat melakukan pembelian,
terutama ketika manfaat dari pendaftaran tidak jelas.

<div class="clearfix"></div>



### 11. Gunakan informasi yang ada untuk memaksimalkan kenyamanan

Ingat dan [isikan preferensi](/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs) untuk pengguna yang terdaftar. Tawarkan layanan checkout dari pihak ketiga yang dikenal untuk pengguna baru.

### 12. Gunakan tombol click-to-call untuk pengisian yang rumit

Pada perangkat dengan kemampuan menelepon, [tautan click-to-call](/web/fundamentals/native-hardware/click-to-call/)
memungkinkan pengguna untuk melakukan panggilan telepon hanya dengan menekan tautan.
Pada perangkat ponsel yang digunakan, pengguna akan menerima konfirmasi sebelum nomor dihubungi,
atau ada menu yang ditampilkan untuk meminta pengguna menentukan apa yang akan dilakukan dengan nomor tersebut.

### 13. Permudah penyelesaian transaksi menggunakan perangkat lain


<figure class="attempt-right">
  <img src="images/cc-other-device-good.png">
  <figcaption class="success">Lakukan: Sediakan cara yang mudah untuk pengguna melanjutkan penjelajahan atau berbelanja pada perangkat lain.</figcaption>
</figure>


Pengguna berharap bisa menyelesaikan transaksinya di perangkat lain.
Misalnya, mungkin mereka ingin melihat item pada layar yang lebih besar.
Atau mereka mungkin terganggu oleh panggilan tugas lain yang perlu diselesaikan segera.
Dukung kesulitan pelanggan ini dengan memudahkan pengguna untuk
[berbagi item di jejaring sosial](/web/fundamentals/discovery-and-monetization/social-discovery/),
atau dengan membolehkan pengguna email sendiri link langsung dari dalam situs.


<div class="clearfix"></div>

## Pengisian Form

Sediakan pengalaman pendaftaran yang menyenangkan dengan bentuk form yang mudah.


### 14. Persingkat pengisian informasi

Pindahkan secara otomatis ke isian berikutnya ketika pengguna menekan Enter. 
Secara umum, semakin sedikit ketukan yang harus dilakukan, semakin baik. 

### 15. Pilih input yang paling mudah

Gunakan [jenis masukan](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type) yang paling sesuai.
Gunakan elemen seperti [`datalist`](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) 
untuk menyediakan nilai yang disarankan.

### 16. Sediakan kalender visual untuk pemilihan tanggal


<figure class="attempt-right">
  <img src="images/forms-calendar-good.png">
  <figcaption class="success">Lakukan: gunakan widget kalender bila memungkinkan.</figcaption>
</figure>


Tandai tanggal mulai dan akhir dengan jelas. 
Pengguna tidak perlu meninggalkan situs dan memeriksa aplikasi kalender hanya untuk memilih tanggal yang sesuai.

<div class="clearfix"></div>


### 17. Minimalkan kesalahan pengisian dengan menampilkan label dan validasi real-time 

<figure class="attempt-right">
  <img src="images/forms-multipart-good.png">
  <figcaption class="success">Lakukan: isikan konten secara otomatis bila memungkinkan.</figcaption>
</figure>


Beri label setiap isian dengan benar dan validasi isian secara real-time.

<div class="clearfix"></div>


### 18. Desain formulir yang efisien

Manfaatkan [autofill](/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs#use-metadata-to-enable-auto-complete) 
sehingga pengguna dapat dengan mudah melengkapi formulir dengan data yang sudah diisi terlebih dahulu oleh aplikasi. 
Bantu isikan informasi yang telah diketahui. 
Misalnya, ketika mengisikan alamat pengiriman dan penagihan, 
cobalah untuk menggunakan [`requestAutocomplete`](/web/fundamentals/design-and-ui/input/forms/use-request-auto-complete) 
atau bantulah pengguna untuk menyalin alamat pengiriman mereka ke alamat penagihan (atau sebaliknya).

## Usability dan form factor


Hibur pengguna ponsel Anda dengan hal-hal kecil yang meningkatkan kenyamanan mereka.


### 19. Optimalkan seluruh situs Anda untuk ponsel

Gunakan [tata letak yang responsif](/web/fundamentals/design-and-ui/responsive/) 
yang mampu menyesuaikan diri berdasarkan pada ukuran layar dan kemampuan perangkat pengguna. 
Peserta penelitian menemukan bahwa situs dengan campuran desktop dan halaman yang dioptimalkan untuk seluler bahkan sulit untuk digunakan dibandingkan situs yang diperuntukkan khusus untuk desktop saja.

### 20. Jangan membuat pengguna melakukan pinch-to-zoom 

Pengguna merasa nyaman dengan menggulirkan layar secara vertikal, tapi tidak horizontal. Hindari elemen yang besar, dan lebarnya tetap. Gunakan [CSS media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) 
untuk menerapkan corak berbeda untuk layar yang berbeda. Jangan membuat konten yang hanya tampil baik pada [layar lebar](/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport) tertentu. 
Situs yang memaksa pengguna untuk menggulir secara horizontal [Google Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/), yang bisa berdampak negatif terhadap peringkat pencarian.

### 21. Buat gambar produk bisa diperluas


<figure class="attempt-right">
  <img src="images/sw-make-images-expandable-good.png">
  <figcaption class="success">Lakukan: Buatlah gambar produk yang bisa diperluas dan mudah untuk dilihat secara detail.</figcaption>
</figure>


Pelanggan ritel berharap situs membiarkan mereka [melihat closeups produk dengan resolusi tinggi](/web/fundamentals/design-and-ui/media/images/). Peserta penelitian frustrasi ketika mereka tidak dapat melihat apa yang mereka beli.

<div class="clearfix"></div>


### 22. Beritahukan kepada pengguna orientasi layar mana yang terbaik


<figure class="attempt-right">
  <img src="images/us-orientation.jpg">
  <figcaption class="success">Lakukan: Beritahu pengguna orientasi mana yang terbaik.</figcaption>
</figure>


Peserta penelitian cenderung untuk tetap di orientasi layar yang sama sampai sesuatu mendorong mereka untuk beralih. Desainlah untuk orientasi landscape dan portrait, atau mendorong pengguna untuk beralih ke orientasi optimal. Pastikan bahwa calls-to-action penting dapat diselesaikan bahkan jika pengguna mengabaikan saran untuk beralih orientasi. 

<div class="clearfix"></div>


### 23. Pastikan pengguna Anda tetap di satu jendela penjelajah


<figure class="attempt-right">
  <img src="images/sw-single-browser-good.png">
  <figcaption class="success">Lakukan: Macy's menjaga penggunannya tetap berada di situs dengan cara menyediakan kupon di situs.</figcaption>
</figure>


Pengguna mungkin mengalami kesulitan beralih di antara jendela dan mungkin tidak dapat menemukan jalan mereka kembali ke situs. Hindari calls-to-action yang memulai jendela baru. Identifikasi setiap kasus yang mungkin menyebabkan pengguna melihat ke luar situs Anda dan menyediakan fitur untuk menjaga mereka di situs Anda. Misalnya, jika Anda menerima kupon, tawarkan mereka langsung di situs, daripada memaksa pengguna untuk mencari situs lain untuk melihat penawarannya.

<div class="clearfix"></div>


### 24. Hindari pelabelan 'full site' 

Ketika peserta penelitian melihat pilihan untuk 'full site' (yaitu situs desktop) dibandingkan 'situs mobile', mereka berfikir situs mobile miskin konten dan memilih 'full site', sehingga mengarahkan mereka ke situs desktop. 


### 25. Jelaskan mengapa Anda perlu lokasi pengguna

Pengguna harus selalu tahu mengapa Anda [meminta lokasi mereka] (/ web / fundamental / native-hardware / user-lokasi /). Peserta penelitian yang mencoba untuk memesan hotel di kota lain menjadi bingung ketika sebuah situs perjalanan mendeteksi lokasi mereka dan menawarkan hotel di kota mereka saat ini sebagai gantinya. Biarkan isian lokasi kosong secara default, dan biarkan pengguna memilih untuk mengisi secara sadar seperti "Cari Dekat Saya". 


<figure class="attempt-left">
  <img src="images/sw-navigation-good.png">
  <figcaption class="success">Lakukan: Mintalah ijin akses ke lokasi pada pengguna.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/sw-navigation-bad.png">
  <figcaption class="warning">Jangan lakukan: Tergesa-gesa meminta di halaman awal sehingga pemuatan situs akan menjadi terbebani dan pengguna merasakan pengalaman yang buruk.</figcaption>
</figure>
<div class="clearfix"></div>



Translated By: 
{% include "_shared/contributors/abdshomad.html" %}

