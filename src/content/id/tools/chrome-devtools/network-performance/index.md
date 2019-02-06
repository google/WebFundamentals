project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mulai menganalisis performa jaringan.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Mulai Menganalisis Performa Jaringan di Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: Baca [Mengoptimalkan Kecepatan Situs](/web/tools/chrome-devtools/speed/get-started) untuk
pendekatan komprehensif dalam meningkatkan kecepatan muat. Tutorial tersebut berisi alur kerja yang disarankan
untuk menganalisis performa pemuatan.

Pelajari cara menggunakan panel Jaringan Chrome DevTools untuk memahami penyebab halaman
dimuat secara lambat pada tutorial interaktif langkah demi langkah ini.

## Langkah 1: Siapkan DevTools {: #set-up }

Anggaplah Anda menerima laporan dari pengguna ponsel bahwa halaman tertentu
di situs Anda lambat. Tugas Anda mempercepat halaman.

1. Klik **Open Slow Page**. Halaman terbuka di tab baru.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>Buka Halaman Lambat</button>
     </a>

1. Saat halaman dalam fokus, tekan
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) untuk
   membuka DevTools di halaman.

1. Di DevTools, klik tab **Network**.

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="Panel Jaringan Chrome DevTools, yang terbuka di halaman
              lambat yang akan Anda diagnosis.">
       <figcaption>
         <b>Gambar 1</b>. Panel Jaringan Chrome DevTools, terbuka di samping
         halaman lambat yang akan Anda diagnosis.
       </figcaption>
     </figure>

     <aside class="note">
       <b>Note:</b> Untuk screenshot lainnya, DevTools <a
       href="/web/tools/chrome-devtools/ui#placement" target="_blank">
       dilepas ke jendela terpisah</a>, sehingga Anda dapat melihat kontennya
       lebih baik.
     </aside>

1. Aktifkan **Capture Screenshots** ![Ambil
   Screenshot][screenshots]{:.devtools-inline}, yang berubah menjadi biru saat diaktifkan.
   DevTools mengambil screenshot selama pemuatan halaman.

## Langkah 2: Tirukan pengalaman pengguna seluler {: #emulate }

Menguji performa jaringan di laptop atau desktop dapat mengecoh. Koneksi
internet jauh lebih cepat daripada pengguna seluler, dan browser
menyimpan cache resource dari kunjungan sebelumnya.

1. Centang kotak **Disable Cache**. Bila kotak centang
   ini aktif, DevTools tidak menyajikan sumber apa pun dari cache.
   Ini lebih akurat mengemulasi yang pertama kali pengguna alami ketika mereka
   melihat halaman Anda.

1. Dari menu turun **No Throttling**, piih
   **Regular 2G**. DevTools membatasi sambungan jaringan untuk menyimulasikan
   pengalaman 2G biasa. Inilah bagaimana pengguna ponsel merasakan situs
   di tempat-tempat dengan koneksi buruk.

<figure>
  <img src="imgs/get-started-setup.svg"
    alt="Panel Jaringan Chrome DevTools, setelah mengatur screenshot,
         penonaktifan cache, dan pembatasan.">
  <figcaption>
    <b>Gambar 2</b>. Panel Jaringan Chrome DevTools, atur untuk mengemulasikan
    pengalaman pengguna ponsel. Screenshot, penonaktifan
    cache, dan pembatasan ditunjukkan dalam warna biru, dari kiri ke kanan,
    masing-masing.
  </figcaption>
</figure>

Proses ini adalah persiapan kasus terburuk. Jika Anda bisa membuat halaman
memuat cepat di persiapan ini, halaman akan cepat untuk semua pengguna!

[screenshots]: imgs/capture-screenshots.png

## Langkah 3: Menganalisis permintaan {: #analyze }

Cari tahu apa yang membuat halaman lambat dengan memuat ulang halaman dan menganalisis
asal permintaan.

### Bagian A: Temukan skrip pemblokiran-render

Saat browser bertemu dengan tag `<script>`, ini pasti menjeda rendering dan
menjalankan skrip langsung. Temukan skrip yang tidak diperlukan untuk pemuatan halaman
tandai sebagai tidak bersamaan atau tunda eksekusi untuk mempercepat waktu muat.

1. Tekan <kbd>Command</kbd>+<kbd>R</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>R</kbd> (Windows, Linux) untuk memuat ulang halaman.
   Dengan koneksi Wi-Fi yang bagus, perlu lebih dari 10 detik untuk memuat halaman
   keseluruhan.

     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="Panel Jaringan Chrome DevTools, setelan memuat ulang halaman.">
       <figcaption>
         <b>Gambar 3</b>. Panel Jaringan Chrome DevTools, setelah memuat ulang
         halaman.
       </figcaption>
     </figure>

1. Catat nilai untuk [`DOMContentLoaded`][DOMContentLoaded] di panel [Riwayat
   ](reference#summary), di bagian bawah panel Jaringan.
   Anda akan melihat nilai setidaknya 4 detik. Saat Anda melihat kejadian ini
   telat aktif seperti ini, berhati-hatilah terhadap skrip yang menunda
   pemuatan dan penguraian dokumen utama.

1. Klik **main.js** untuk menyelidiki permintaan itu lebih lanjut. DevTools menampilkan
   serangkaian tab baru yang menyediakan informasi lebih lanjut tentang permintaan ini.

1. Klik tab **Preview** untuk melihat kode sumber permintaan. Anda bisa
   melihat skrip itu hanya berhenti selama 4.000mdtk.
   Dengan menandai skrip ini dengan `async` atribut dan memindahkannya
   ke bagian bawah `<body>` dokumen, halaman
   bisa memuat tanpa menunggu skrip.

     <figure>
       <img src="imgs/get-started-preview.png"
         alt="Melihat kode sumber untuk main.js di panel Pratinjau.">
       <figcaption>
         <b>Gambar 4</b>. Melihat kode sumber untuk <code>main.js</code> di
         panel Pratinjau.
       </figcaption>
     </figure>

Baca [Pemblokiran-parser versus JavaScript tidak bersamaan][async] untuk mempelajari lebih lanjut
tentang skrip pemblokiran-render.

### Bagian B: Cari permintaan besar

Bila halaman dimuat, apakah Anda memperhatikan logo DevTools perlu waktu lama
untuk memuat? Logo ini tidak memblokir pemuatan, tetapi membuat halaman *muncul*
dengan lambat. Pengguna suka saat halaman *muncul* dengan cepat.

1. Klik **Close** ![Tutup][close]{:.devtools-inline} sehingga Anda bisa melihat
   [**panel Permintaan**](reference#requests) lagi.

1. Klik dua kali screenshot kiri atas.

1. Tekan tombol kiri bawah untuk memindai serangkaian screenshot. Waktu
   di bawah screenshot menunjukkan kapan screenshot diambil. Screenshot
   perlu beberapa detik untuk memuat. Itu berarti mungkin
   ukuran file terlalu besar.

1. Klik di mana pun di luar screenshot untuk meminimalkannya.

1. Arahkan kursor ke [Air Terjun](reference#waterfall) untuk permintaan `logo-1024px.png`
   . Permintaan meluangkan sebagian besar waktu
   untuk mendownload gambar. Ini berarti gambar terlalu besar.

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="Air terjun untuk logo-1024px.png.">
       <figcaption>
         <b>Gambar 5</b>. Air terjun untuk <code>logo-1024px.png</code>.
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png

## Langkah 4: Verifikasi perbaikan di halaman yang diperbarui {: #verify }

Anda hampir selesai. Anggap sekarang Anda sudah membuat dua perubahan pada
halaman:

* Anda memindahkan skrip ke bagian bawah `<body>` dan menandainya `async`
  agar tidak memblokir pemuatan halaman.
* Anda mengubah logo menjadi SVG untuk mengubah ukurannya.

Yang perlu dilakukan adalah menguji halaman yang diperbarui untuk memverifikasi
perbaikan memang menjadikan halaman memuat lebih cepat.

1. Klik **Open Fast Page**. Halaman yang diperbaiki terbuka di tab baru.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>Buka Halaman Cepat</button>
     </a>

1. Atur DevTools sama seperti sebelumnya. Screenshot dan penonaktifan cache akan
   nyala, dan pembatasan jaringan akan diatur menjadi **Regular 2G**.
1. Muat ulang halaman. Halaman memuat jauh lebih cepat.

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="Rekaman pemuatan halaman, setelah menerapkan perbaikan.">
       <figcaption>
         <b>Gambar 6</b>. Rekaman pemuatan halaman, setelah menerapkan
         perbaikan. Halaman yang biasanya perlu sekitar 10 detik agar muncul
         lengkap secara visual. Sekarang hanya perlu waktu sekitar 1 detik.
       </figcaption>
     </figure>

<aside class="note">
  <b>Catatan</b>: Meski halaman memuat lebih cepat, halaman ini masih tidak bisa digunakan selama
  sekitar 5 detik. Ini karena halaman ini menjalankan skrip yang menghentikan
  utas utama halaman.
</aside>

## Langkah Berikutnya {: #next-steps }

Bagus. Sekarang Anda seorang ahli yang bonafide dalam panel Jaringan Chrome DevTools
. Yah... mungkin bukan seorang ahli. Tetapi Anda memiliki dasar
keahlian dan ilmu pengetahuan yang sangat baik.

* Baca <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / CRP"
  href="/web/fundamentals/performance/critical-rendering-path">
  Jalur Rendering Penting</a> untuk mempelajari lebih lanjut mengenai teori pemuatan halaman
  yang sangat cepat.
* Baca <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Issues Guide" href="issues">
  Panduan Masalah Jaringan</a> untuk mempelajari cara menemukan lebih banyak masalah jaringan.
* Baca <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">
  Referensi Panel Jaringan</a> untuk mengetahui daftar lengkap dari fitur panel Jaringan.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
