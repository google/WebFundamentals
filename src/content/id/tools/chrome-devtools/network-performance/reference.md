project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Referensi komprehensif fitur panel Jaringan Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# Referensi Analisis Jaringan {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Temukan cara baru untuk menganalisis bagaimana pemuatan halaman Anda dalam referensi
komprehensif fitur analisis jaringan Chrome DevTools.

Note: Referensi ini berdasarkan Chrome 58. Jika Anda menggunakan Chrome versi lain
, UI dan fitur DevTools mungkin berbeda. Periksa
`chrome://help` untuk melihat versi Chrome mana yang Anda gunakan.

## Mencatat permintaan jaringan {: #record }

Secara default, DevTools mencatat semua permintaan jaringan di panel Jaringan,
selama DevTools terbuka.

<figure>
  <img src="imgs/network.png" alt="Panel Jaringan.">
  <figcaption>
    <b>Gambar 1</b>. Panel Jaringan
  </figcaption>
</figure>

### Berhenti mencatat pemintaan jaringan {: #stop-recording }

Untuk berhenti mencatat pemintaan:

* Klik **Stop recording network log** ![Berhenti mencatat log
  jaringan](imgs/record-on.png){: .devtools-inline } di panel Jaringan. Panel Jaringan
  berubah menjadi abu-abu yang menandakan bahwa DevTools tidak mencatat permintaan lagi.
* Tekan <kbd>Command</kbd>+<kbd>E</kbd> (Mac) atau
  <kbd>Control</kbd>+<kbd>E</kbd> (Windows, Linux) saat panel Jaringan
  dalam fokus.

### Menghapus permintaan {: #clear }

Klik **Clear** ![Hapus][clear]{:.devtools-inline} di panel Jaringan
untuk menghapus semua permintaan dari tabel Permintaan.

<figure>
  <img src="imgs/clear.svg" alt="Tombol Hapus.">
  <figcaption>
    <b>Gambar 2</b>. Hapus, dikotaki warna biru
  </figcaption>
</figure>

[clear]: imgs/clear-requests.png

### Menyimpan permintaan di seluruh pemuatan halaman {: #preserve-log }

Untuk menyimpan permintaan di seluruh pemuatan halaman, centang kotak centang **Preserve log**
di panel Jaringan. DevTools menyimpan semua permintaan hingga Anda menonaktifkan
**Preserve log**.

<figure>
  <img src="imgs/preserve-log.svg" alt="Kotak centang Preserve Log.">
  <figcaption>
    <b>Gambar 3</b>. Kotak centang Preserve Log, dikotaki warna biru
  </figcaption>
</figure>

### Mengambil screenshot selama pemuatan halaman {: #screenshots }

Ambil screenshot untuk menganalisis apa yang dilihat pengguna saat mereka menunggu halaman Anda
memuat.

Untuk mengaktifkan screenshot, klik **Capture screenshots** ![Ambil
screenshot][capture]{: .devtools-inline } di panel Jaringan. Panel Jaringan berubah menjadi
biru ketika diaktifkan.

Muat ulang halaman saat panel Jaringan sedang fokus untuk mengambil screenshot.

Setelah gambar diambil, Anda dapat menindaklanjuti screenshot dengan cara berikut:

* Arahkan kursor ke screenshot untuk melihat di titik mana screenshot itu
  diambil. Garis berwarna kuning muncul pada panel Ringkasan.
* Klik thumbnail screenshot untuk memfilter permintaan yang muncul
  setelah screenshot diambil.
* Klik dua kali pada thumbnail untuk memperbesar.

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="Mengarahkan kursor ke screenshot.">
  <figcaption>
    <b>Gambar 4</b>. Mengarahkan kursor ke screenshot. Garis vertikal berwarna kuning
    dalam panel Ringkasan dan Waterfall menunjukkan waktu
    screenshot diambil.
  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### Mengulang permintaan XHR {: #replay-xhr }

Untuk mengulang permintaan XHR, klik kanan permintaan di tabel Permintaan
dan pilih **Replay XHR**.

<figure>
  <img src="imgs/replay-xhr.png" alt="Memilih Replay XHR.">
  <figcaption>
    <b>Gambar 5</b>. Memilih Replay XHR
  </figcaption>
</figure>

## Mengubah perilaku pemuatan

### Mengemulasikan pengunjung kali pertama dengan menonaktifkan cache browser {: #disable-cache}

Untuk mengemulasikan bagaimana pengalaman pengguna kali pertama di situs Anda, centang **Disable
cache**. DevTools menonaktifkan cache browser. DevTools secara lebih akurat
mengemulasi pengalaman pengguna kali pertama, karena permintaan dilayani dari
cache browser pada kunjungan berulang.

<figure>
  <img src="imgs/disable-cache.svg" alt="Kotak centang Nonaktifkan Cache.">
  <figcaption>
    <b>Gambar 6</b>. Kotak centang Nonaktifkan Cache, dikotaki warna biru
  </figcaption>
</figure>

#### Menonaktifkan cache browser dari panel samping Kondisi Jaringan {: #disable-cache-network-conditions }

Jika Anda ingin menonaktifkan cache saat bekerja di panel DevTools lain, gunakan
panel samping Kondisi Jaringan.

1. Buka [panel samping Kondisi Jaringan](#network-conditions).
1. Centang atau hapus centang kotak centang **Disable cache**.

### Menghapus cache browser secara manual {: #clear-cache}

Untuk menghapus cache browser secara manual, klik kanan di mana saja
di tabel Permintaan dan pilih **Clear Browser Cache**.

<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="Memilih Clear Browser Cache.">
  <figcaption>
    <b>Gambar 7</b>. Memilih Clear Browser Cache
  </figcaption>
</figure>

### Mengemulasi secara offline {: #offline }

Ada kelas baru aplikasi web, yang disebut [Progressive Web App][pwa], yang dapat
berfungsi secara offline dengan bantuan [pekerja layanan][sw]. Saat membuat
aplikasi semacam ini, sebaiknya Anda menyimulasikan perangkat yang
tidak memiliki koneksi data sesegera mungkin.

Centang **Offline** untuk mensimulasikan pengalaman jaringan yang sepenuhnya
offline.

<figure>
  <img src="imgs/offline.svg"
       alt="Kotak centang Offline">
  <figcaption>
    <b>Gambar 8</b>. Kotak centang Offline, dikotaki warna biru
  </figcaption>
</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### Mengemulasi koneksi jaringan yang lambat {: #throttling }

Mengemulasi 2G, 3G, dan kecepatan koneksi lainnya dari menu **Network Throttling**
.

<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="Menu Pembatasan Jaringan.">
  <figcaption>
    <b>Gambar 9</b>. Menu Pembatasan Jaringan, dikotaki warna biru
  </figcaption>
</figure>

Anda dapat memilih dari berbagai preset, seperti 2G Bagus atau Reguler. Anda
juga dapat menambahkan preset kustom Anda sendiri dengan membuka menu Pembatasan Jaringan
dan memilih **Custom** > **Add**.

DevTools menampilkan ikon peringatan di samping tab **Network** untuk
memperingatkan bahwa pembatasan diaktifkan.

#### Mengemulasi koneksi jaringan yang lambat dari panel samping Kondisi Jaringan {: #throttling-network-conditions }

Jika Anda ingin membatasi koneksi jaringan saat bekerja di panel
DevTools lainnya, gunakan panel samping Kondisi Jaringan.

1. Buka [panel samping Kondisi Jaringan](#network-conditions).
1. Pilih kecepatan koneksi yang Anda inginkan dari menu **Network Throttling**.

### Menghapus cookie browser secara manual {: #clear-cookies }

Jika ingin menghapus cookie browser secara manual, klik kanan di mana saja di
tabel Permintaan dan pilih **Clear Browser Cookies**.

<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="Memilih Hapus Cookie Browser.">
  <figcaption>
    <b>Gambar 10</b>. Memilih Hapus Cookie Browser
  </figcaption>
</figure>

### Mengganti browser {: #user-agent }

Untuk mengganti browser secara manual:

1. Buka [panel samping Kondisi Jaringan](#network-conditions).
1. Hapus centang **Select automatically**.
1. Pilih opsi browser dari menu, atau masukkan browser kustom dalam
   kotak teks.

## Memfilter permintaan {: #filter }

### Memfilter permintaan berdasarkan properti {: #filter-by-property }

Gunakan kotak teks **Filter** untuk memfilter permintaan berdasarkan properti, seperti
domain atau ukuran permintaan.

Jika Anda tidak dapat melihat kotak teks, panel Filter mungkin tersembunyi.
Lihat [Menyembunyikan panel Filter](#hide-filters).

<figure>
  <img src="imgs/filter-text-box.svg" alt="Kotak teks Filter.">
  <figcaption>
    <b>Gambar 11</b>. Kotak teks Filter, dikotaki warna biru
  </figcaption>
</figure>

Anda dapat menggunakan beberapa properti secara bersamaan dengan memisahkan setiap properti
menggunakan spasi. Misalnya, `mime-type:image/gif larger-than:1K` menampilkan
semua GIF yang lebih dari satu kilobyte. Filter multi-properti ini
setara dengan operasi AND. Operasi OR saat ini
tidak didukung.

Di bawah ini adalah daftar lengkap properti yang didukung.

* `domain`. Hanya menampilkan resource dari domain yang ditetapkan. Anda dapat menggunakan
  karakter pengganti (`*`) untuk menyertakan beberapa domain. Misalnya, `*.com`
  menampilkan resource dari semua nama domain yang berakhiran `.com`. DevTools
  mengisi menu dropdown pelengkapan otomatis dengan semua domain
  yang dijumpainya.
* `has-response-header`. Menampilkan resource yang berisi header respons HTTP
  yang sudah ditetapkan. DevTools mengisi menu dropdown pelengkapan otomatis dengan
  semua header respons yang dijumpainya.
* `is`. Gunakan `is:running` untuk menemukan resource `WebSocket`.
* `larger-than`. Menampilkan resource yang lebih besar dari ukuran yang ditetapkan,
  dalam byte. Menetapkan nilai `1000` adalah sama dengan menetapkan nilai `1k`.
* `method`. Menampilkan resource yang diambil melalui jenis metode HTTP
  yang ditetapkan. DevTools mengisi dropdown dengan semua metode HTTP
  yang dijumpainya.
* `mime-type`. Menampilkan resource jenis MIME yang sudah ditentukan. DevTools mengisi otomatis menu
  dropdown dengan semua jenis MIME yang dijumpainya.
* `mixed-content`. Menampilkan semua resource konten campuran (`mixed-content:all`) atau
  hanya yang sedang ditampilkan (`mixed-content:displayed`).
* `scheme`. Menampilkan resource yang diambil melalui HTTP yang tidak dilindungi (`scheme:http`)
  atau HTTPS yang dilindungi (`scheme:https`).
* `set-cookie-domain`. Menampilkan resource yang memiliki header `Set-Cookie`
  dengan atribut `Domain` yang cocok dengan nilai yang ditetapkan. DevTools
  mengisi pelengkapan otomatis dengan semua domain cookie yang
  dijumpainya.
* `set-cookie-name`. Menampilkan resource yang memiliki header `Set-Cookie`
  dengan nama yang cocok dengan nilai yang ditetapkan. DevTools mengisi
  pelengkapan otomatis dengan semua nama cookie yang dijumpainya.
* `set-cookie-value`. Menampilkan resource yang memiliki header `Set-Cookie`
  dengan nilai yang cocok dengan nilai yang ditetapkan. DevTools mengisi
  pelengkapan otomatis dengan semua nilai cookie yang dijumpainya.
* `status-code`. Hanya menampilkan resource yang kode status HTTP-nya cocok dengan kode
  yang ditetapkan. DevTools mengisi menu dropdown pelengkapan otomatis dengan semua
 kode status yang dijumpainya.

### Memfilter permintaan berdasarkan jenis {: #filter-by-type }

Untuk memfilter permintaan berdasarkan jenis permintaan, klik tombol **XHR**, **JS**, **CSS**,
**Img**, **Media**, **Font**, **Doc**, **WS** (WebSocket), **Manifest**, atau
**Other** (jenis lainnya yang tidak tercantum di sini) di panel Jaringan.

Jika Anda tidak dapat melihat tombol-tombol ini, panel Filter mungkin tersembunyi.
Lihat [Menyembunyikan panel Filter](#hide-filters).

Untuk mengaktifkan beberapa jenis filter secara bersamaan, tahan <kbd>Command</kbd>
(Mac) atau <kbd>Control</kbd> (Windows, Linux) lalu klik.

<figure>
  <img src="imgs/multi-type-filter.png"
       alt="Menggunakan filter Jenis untuk menampilkan resource JS, CSS, dan Dok[umen]
.">
  <figcaption>
    <b>Gambar 12</b>. Menggunakan filter Jenis untuk menampilkan resource JS, CSS, dan
   Dok[umen].
  </figcaption>
</figure>

### Memfilter permintaan berdasarkan waktu {: #filter-by-time }

Klik dan seret ke kiri atau kanan pada panel Ringkasan untuk hanya menampilkan permintaan
yang sedang aktif selama jangka waktu tersebut. Filter inklusif. Setiap permintaan
yang aktif selama waktu yang disorot ditampilkan.

<figure>
  <img src="imgs/overview-filter.png"
       alt="Memfilter permintaan apa pun yang tidak aktif sekitar 2500 milidetik.">
  <figcaption>
    <b>Gambar 13</b>. Memfilter permintaan apa pun yang tidak aktif sekitar
    2500 milidetik
  </figcaption>
</figure>

### Menyembunyikan data URL

[URL Data][data-uris] adalah file kecil yang disematkan ke dokumen lain. Permintaan
yang Anda lihat di tabel Permintaan yang dimulai dengan
`data:` adalah URL data.

Centang kotak centang **Hide data URLs** untuk menyembunyikan permintaan ini.

<figure>
  <img src="imgs/hide-data-urls.svg" alt="Kotak centang Sembunyikan URL Data.">
  <figcaption>
    <b>Gambar 14</b>. Kotak centang Sembunyikan URL Data
  </figcaption>
</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## Mengurutkan permintaan

Secara default, permintaan di tabel Permintaan diurutkan berdasarkan waktu
inisiasi, tetapi Anda dapat mengurutkan tabel menggunakan kriteria lain.

### Mengurutkan berdasarkan kolom {: #sort-by-column }

Klik header dari kolom mana pun di Permintaan untuk mengurutkan permintaan berdasarkan kolom
tersebut.

### Mengurutkan berdasarkan fase aktivitas {: #sort-by-activity }

Untuk mengubah bagaimana Waterfall mengurutkan permintaan, klik kanan pada header tabel
Permintaan, arahkan kursor ke **Waterfall**, dan pilih salah satu dari opsi
berikut:

* **Start Time**. Permintaan pertama yang dimulai ada di bagian atas.
* **Response Time**. Permintaan pertama yang mulai mendownload ada di bagian atas.
* **End Time**. Permintaan pertama yang sudah selesai ada di bagian atas.
* **Total Duration**. Permintaan dengan penyiapan koneksi terpendek dan
  permintaan/respons ada di bagian atas.
* **Latency**. Permintaan yang menunggu waktu tersingkat untuk respons
  ada di bagian atas.

Deskripsi ini mengasumsikan bahwa setiap opsi diberi peringkat dari yang terpendek
ke yang terpanjang. Mengklik header kolom **Waterfall** akan membalik urutan.

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="Mengurutkan Waterfall berdasarkan durasi total.">
  <figcaption>
    <b>Gambar 15</b>. Mengurutkan Waterfall berdasarkan durasi total. Bagian
    yang lebih terang dari setiap bilah adalah waktu yang dihabiskan menunggu. Bagian yang lebih gelap adalah waktu
    yang dihabiskan untuk mendownload byte.
  </figcaption>
</figure>

## Menganalisis permintaan {: #analyze }

Selama DevTools terbuka, DevTools mencatat semua permintaan di panel Jaringan.
Gunakan panel Jaringan untuk menganalisis permintaan.

### Melihat log permintaan {: #requests }

Gunakan tabel Permintaan untuk melihat log dari semua permintaan yang dibuat ketika DevTools
telah terbuka. Mengklik atau mengarahkan kursor ke permintaan akan memperlihatkan lebih banyak informasi
tentang permintaan.

<figure>
  <img src="imgs/requests-table.svg"
       alt="Tabel Permintaan.">
  <figcaption>
    <b>Gambar 16</b>. Tabel Permintaan, dikotaki warna biru
  </figcaption>
</figure>

Tabel Requests menampilkan kolom berikut secara default:

* **Name**. Nama file resource, atau ID untuk resource tersebut.
* **Status**. Kode status HTTP.
* **Type**. Jenis MIME dari resource yang diminta.
* **Initiator**. Objek atau proses berikut dapat memulai permintaan:
    * **Parser**. Parser HTML Chrome.
    * **Redirect**. Pengalihan HTTP.
    * **Script**. Fungsi JavaScript.
    * **Other**. Beberapa proses atau tindakan lain, seperti menavigasi ke halaman
      melalui link atau memasukkan URL di kolom URL.
* **Size**. Ukuran gabungan header respons
  beserta isi respons, sebagaimana dikirimkan oleh server.
* **Time**. Durasi total, dari permulaan permintaan ke
  bagian akhir byte terakhir dalam respons.
* [**Waterfall**](#waterfall). Perincian visual setiap aktivitas permintaan.

#### Menambahkan atau menghapus kolom {: #columns }

Klik kanan header tabel Permintaan dan pilih opsi
untuk menyembunyikan atau menampilkannya. Opsi yang ditampilkan saat ini memiliki tanda centang di sebelahnya.

<figure>
  <img src="imgs/add-column.png"
       alt="Menambahkan kolom ke tabel Permintaan.">
  <figcaption>
    <b>Gambar 17</b>. Menambahkan kolom ke tabel Permintaan.
  </figcaption>
</figure>

#### Menambahkan kolom khusus {: #custom-columns }

Untuk menambahkan kolom khusus ke tabel Permintaan, klik kanan header
tabel Permintaan dan pilih **Response Headers** > **Manage Header Columns**.

<figure>
  <img src="imgs/custom-column.png"
       alt="Menambahkan kolom khusus ke tabel Permintaan.">
  <figcaption>
    <b>Gambar 18</b>. Menambahkan kolom khusus ke tabel Permintaan.
  </figcaption>
</figure>

### Melihat waktu permintaan yang saling terkait {: #waterfall }

Gunakan Waterfall untuk melihat waktu permintaan yang saling terkait.
Secara default, Waterfall diurutkan berdasarkan waktu mulai permintaan.
Jadi, permintaan yang ada di sisi kiri dimulai lebih awal daripada permintaan yang
ada di sisi kanan.

Lihat [Mengurutkan berdasarkan fase aktivitas](#sort-by-activity) untuk melihat beragam cara
dalam mengurutkan Waterfall.

<figure>
  <img src="imgs/waterfall.png"
       alt="Kolom Waterfall panel Permintaan.">
  <figcaption>
    <b>Gambar 19</b>. Kolom Waterfall panel Permintaan.
  </figcaption>
</figure>

### Menganalisis frame Koneksi WebSocket {: #frames }

Untuk melihat frame koneksi WebSocket:

1. Klik URL koneksi WebSocket, di bawah kolom **Name**
   tabel Permintaan.
1. Klik tab **Frames**. Tabel menampilkan 100 frame terakhir.

Untuk memuat ulang tabel, klik ulang nama koneksi WebSocket di bawah kolom
**Name** pada tabel Permintaan.

<figure>
  <img src="imgs/frames.svg"
       alt="Tab Frame.">
  <figcaption>
    <b>Gambar 20</b>. Tab Frame, dikotaki warna biru
  </figcaption>
</figure>

Tabel berisi tiga kolom:

* **Data**. Payload pesan. Jika berformat teks biasa, pesan
  ditampilkan di sini. Untuk opcode biner, kolom ini menampilkan nama dan kode
  opcode. Didukung opcode berikut: Frame Lanjutan,
  Frame Biner, Frame Tutup Koneksi, Frame Ping, dan Frame Pong.
* **Length**. Panjang payload pesan, dalam byte.
* **Time**. Waktu ketika pesan itu diterima atau dikirim.

Pesan diberi kode warna sesuai dengan jenisnya:

* Pesan teks keluar berwarna hijau terang.
* Pesan teks masuk berwarna putih.
* Opcode WebSocket berwarna kuning terang.
* Error berwarna merah terang.

### Melihat pratinjau isi respons {: #preview }

Untuk melihat pratinjau isi respons:

1. Klik URL permintaan, di bawah kolom **Name** pada tabel
   Permintaan.
1. Klik tab **Preview**.

Tab ini sangat berguna untuk melihat gambar.

<figure>
  <img src="imgs/preview.svg"
       alt="Tab Pratinjau">
  <figcaption>
    <b>Gambar 21</b>. Tab Pratinjau, dikotaki warna biru
  </figcaption>
</figure>

### Melihat isi respons {: #response }

Untuk melihat isi respons ke permintaan:

1. Klik URL permintaan, di bawah kolom **Name** pada tabel
   Permintaan.
1. Klik tab **Response**.

<figure>
  <img src="imgs/response.svg"
       alt="Tab Respons.">
  <figcaption>
    <b>Gambar 22</b>. Tab Respons, dikotaki warna biru
  </figcaption>
</figure>

### Melihat header HTTP {: #headers }

Untuk melihat data header HTTP tentang permintaan:

1. Klik URL permintaan, di bawah kolom **Name** pada tabel
   Permintaan.
1. Klik tab **Headers**.

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="Tab Header.">
  <figcaption>
    <b>Gambar 23</b>. Tab Header, dikotaki warna biru
  </figcaption>
</figure>

#### Melihat source header HTTP {: #header-source }

Secara default, tab Header menampilkan nama header berdasarkan abjad. Untuk melihat nama header
HTTP dalam urutan yang diterima:

1. Buka tab **Headers** untuk permintaan yang Anda minati. Baca
   [Melihat header HTTP](#headers).
1. Klik **view source**, di samping bagian **Request Header** atau **Response
   Header**.

### Melihat parameter string kueri {: #query-string }

Untuk melihat parameter string kueri URL dalam format yang bisa dibaca manusia:

1. Buka tab **Headers** untuk permintaan yang Anda minati. Baca
   [Melihat header HTTP](#headers).
1. Buka bagian **Query String Parameters**.

<figure>
  <img src="imgs/query-string.svg" alt="Bagian Parameter String Kueri.">
  <figcaption>
    <b>Gambar 24</b>. Bagian Parameter String Kueri, dikotaki warna biru
  </figcaption>
</figure>

#### Melihat sumber parameter string kueri {: #query-string-source }

Untuk melihat sumber parameter string kueri permintaan:

1. Buka bagian Parameter String Kueri. Lihat [Melihat parameter
   string kueri](#query-string).
1. Klik **view source**.

#### Melihat parameter string kueri yang dikodekan URL {: #query-string-encodings }

Untuk melihat parameter string kueri dalam format yang dapat dibaca manusia, tetapi dengan mempertahankan
encoding:

1. Buka bagian Parameter String Kueri. Lihat [Melihat parameter
   string kueri](#query-string).
1. Klik **view URL encoded**.

### Melihat cookie {: #cookies }

Untuk melihat cookie yang dikirim dalam header HTTP permintaan:

1. Klik URL permintaan, di bawah kolom **Name**
   pada tabel Permintaan.
1. Klik tab **Cookies**.

Baca [Kolom](/web/tools/chrome-devtools/manage-data/cookies#fields) untuk
deskripsi setiap kolom.

<figure>
  <img src="imgs/cookies.svg"
       alt="Tab Cookie.">
  <figcaption>
    <b>Gambar 25</b>. Tab Cookie, dikotaki warna biru
  </figcaption>
</figure>

### Melihat perincian waktu permintaan {: #timing }

Untuk melihat perincian waktu permintaan:

1. Klik URL permintaan, di bawah kolom **Name** pada tabel
   Permintaan.
1. Klik tab **Timing**.

Lihat [Pratinjau perincian waktu](#timing-preview) untuk cara yang lebih cepat
mengakses data ini.

Lihat [Tahap perincian waktu dijelaskan](#timing-explanation) untuk informasi
selengkapnya tentang setiap tahap yang Anda lihat di tab Waktu.

<figure>
  <img src="imgs/timing.svg" alt="Tab Waktu.">
  <figcaption>
    <b>Gambar 26</b>. Tab Waktu, dikotaki warna biru
  </figcaption>
</figure>

Berikut informasi selengkapnya tentang setiap tahap.

Baca [Lihat perincian waktu](#timing-breakdown) untuk cara lain dalam mengakses
tampilan ini.

#### Melihat pratinjau perincian waktu {: #timing-preview }

Untuk melihat pratinjau perincian waktu permintaan, arahkan kursor ke
entri permintaan di kolom **Waterfall** pada tabel Permintaan.

Baca [Melihat perincian waktu permintaan](#timing) untuk cara mengakses
data ini tanpa harus mengarahkan kursor.

<figure>
  <img src="imgs/waterfall-hover.png"
       alt="Melihat pratinjau perincian waktu permintaan.">
  <figcaption>
    <b>Gambar 27</b>. Melihat pratinjau perincian waktu permintaan
  </figcaption>
</figure>

#### Tahap perincian waktu dijelaskan {: #timing-explanation }

Berikut informasi selengkapnya tentang setiap tahap yang Anda lihat di tab
Waktu:

* **Queueing**. Browser mengantrekan permintaan ketika:
    * Ada permintaan prioritas yang lebih tinggi.
    * Sudah ada enam koneksi TCP yang terbuka untuk asal ini, yang merupakan
      batasnya. Hanya berlaku untuk HTTP/1.0 dan HTTP/1.1.
    * Browser secara singkat mengalokasikan ruang di cache disk
* **Stalled**. Permintaan dapat terhenti karena salah satu alasan yang dijelaskan
  di **Queueing**.
* **DNS Lookup**. Browser mengatasi masalah alamat IP permintaan.
* **Proxy negotiation**. Browser menegosiasikan permintaan dengan [server
  proxy](https://en.wikipedia.org/wiki/Proxy_server).
* **Request sent**. Permintaan sedang dikirim.
* **ServiceWorker Preparation**. Browser sedang memulai pekerja layanan.
* **Request to ServiceWorker**. Permintaan dikirim ke pekerja
  layanan.
* **Waiting (TTFB)**. Browser menunggu byte pertama dari respons.
  TTFB adalah singkatan dari Time To First Byte. Waktu ini mencakup 1 kali round trip latensi
  waktu yang diperlukan server untuk menyiapkan respons.
* **Content Download**. Browser menerima respons.
* **Receiving Push**. Browser menerima data untuk respons ini melalui HTTP/2
  Server Push.
* **Reading Push**. Browser membaca data lokal yang diterima sebelumnya.

### Melihat inisiator dan dependensi {: #initiators-dependencies }

Untuk melihat inisiator dan dependensi suatu permintaan, tahan <kbd>Shift</kbd>
dan arahkan kursor ke permintaan pada tabel Permintaan. DevTools inisiatior berwarna
hijau, dan dependensi berwarna merah.

<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="Melihat inisiator dan dependensi permintaan.">
  <figcaption>
    <b>Gambar 28</b>. Melihat inisiator dan dependensi permintaan
  </figcaption>
</figure>

Ketika tabel Permintaan disusun secara kronologis, permintaan
hijau pertama di atas permintaan yang Anda arahkan kursor Anda adalah inisiator
dari dependensi. Jika ada permintaan hijau lain di atasnya, permintaan
yang lebih tinggi adalah inisiator dari inisiator tersebut. Dan seterusnya.

### Melihat peristiwa pemuatan {: #load }

DevTools menampilkan waktu peristiwa `DOMContentLoaded` dan `load` di
beberapa tempat pada panel Jaringan. Peristiwa `DOMContentLoaded` berwarna
biru, dan peristiwa `load` berwarna merah.

<figure>
  <img src="imgs/load-events.svg"
       alt="Lokasi peristiwa DOMContentLoaded dan load pada panel Jaringan.">
  <figcaption>
    <b>Gambar 29</b>. Lokasi peristiwa <code>DOMContentLoaded</code> dan
    <code>load</code> pada panel Jaringan
  </figcaption>
</figure>

### Melihat jumlah total permintaan {: #total-number }

Jumlah total permintaan dicantumkan dalam panel Rangkuman, di bagian bawah
panel Jaringan.

Perhatian: Jumlah ini hanya melacak permintaan yang tercatat sejak DevTools
dibuka. Jika permintaan lain dilakukan sebelum DevTools dibuka, permintaan
tersebut tidak dihitung.

<figure>
  <img src="imgs/total-requests.svg"
       alt="Jumlah total permintaan sejak DevTools dibuka">
  <figcaption>
    <b>Gambar 30</b>. Jumlah total permintaan sejak DevTools dibuka
  </figcaption>
</figure>

### Melihat ukuran download total {: #total-size }

Ukuran download total permintaan dicantumkan dalam panel Ringkasan, di
bagian bawah panel Jaringan.

Perhatian: Jumlah ini hanya melacak permintaan yang tercatat sejak DevTools
dibuka. Jika permintaan lain dilakukan sebelum DevTools dibuka, permintaan
tersebut tidak dihitung.

<figure>
  <img src="imgs/total-size.svg"
       alt="Ukuran download total permintaan">
  <figcaption>
    <b>Gambar 31</b>. Ukuran download total permintaan
  </figcaption>
</figure>

Baca [Lihat ukuran resource yang tidak terkompresi](#uncompressed) untuk mengetahui ukuran
resource setelah browser membuka kompresinya.

### Melihat pelacakan tumpukan yang menyebabkan permintaan {: #initiator-stack-trace }

Saat pernyataan JavaScript menyebabkan resource diminta, arahkan kursor ke kolom **Initiator**
untuk melihat pelacakan tumpukan yang mengarah ke permintaan.

<figure>
  <img src="imgs/initiator-stack.png"
       alt="Pelacakan tumpukan mengarah ke permintaan resource">
  <figcaption>
    <b>Gambar 32</b>. Pelacakan tumpukan mengarah ke permintaan resource
  </figcaption>
</figure>

### Melihat ukuran resource yang tidak terkompresi {: #uncompressed }

Klik **Use Large Request Rows** ![Gunakan Baris Permintaan
Besar](imgs/large-resource-rows-button.png){:.inline-icon} lalu lihat
nilai terendah pada kolom **Size**.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Contoh resource tidak terkompresi.">
  <figcaption>
    <b>Gambar 33</b>. Ukuran terkompresi file <code>jquery-bundle.js</code>
   yang dikirim melalui jaringan adalah <code>30.9 KB</code>, sedangkan ukuran yang tidak terkompresi adalah
    <code>86.3 KB</code>
  </figcaption>
</figure>

## Mengekspor data permintaan {: #export }

### Menyimpan semua permintaan jaringan ke file HAR {: #save-as-har }

Untuk menyimpan semua permintaan jaringan ke file HAR:

1. Klik kanan permintaan apa pun di tabel Permintaan.
1. Pilih **Save as HAR with Content**. DevTools menyimpan semua permintaan yang telah dilakukan sejak Anda
   membuka DevTools ke file HAR. Tidak ada cara untuk memfilter permintaan, atau hanya menyimpan satu
   permintaan.

Setelah Anda mendapatkan file HAR, Anda dapat mengimpornya kembali ke DevTools untuk dianalisis. Cukup
seret dan lepas file HAR ke dalam tabel Permintaan. Lihat juga [HAR Analyzer][HAR
Analyzer]{: .external }.

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="Memilih Simpan sebagai HAR dengan Konten.">
  <figcaption>
    <b>Gambar 34</b>. Memilih <b>Simpan sebagai HAR dengan Konten</b>.
  </figcaption>
</figure>

### Menyalin satu atau lebih permintaan ke papan klip {: #copy }

Di bawah kolom **Name** pada tabel Permintaan, klik kanan permintaan,
arahkan kursor ke **Copy**, dan pilih salah satu dari opsi berikut:

* **Copy Link Address**. Salin URL permintaan ke papan klip.
* **Copy Response**. Salin isi respons ke papan klip.
* **Copy as cURL**. Salin permintaan sebagai perintah cURL.
* **Copy All as cURL**. Salin semua permintaan sebagai rangkaian perintah cURL.
* **Copy All as HAR**. Salin semua permintaan sebagai data HAR.

<figure>
  <img src="imgs/copy.png" alt="Memilih Salin Respons.">
  <figcaption>
    <b>Gambar 35</b>. Memilih Salin Respons
  </figcaption>
</figure>

## Mengubah tata letak panel Jaringan

Luaskan atau ciutkan bagian dari UI panel Jaringan untuk fokus pada hal yang
penting bagi Anda.

### Menyembunyikan panel Filter {: #hide-filters }

Secara default, DevTools menampilkan [panel Filter](#filters).
Klik **Filter** ![Filter][filter]{: .devtools-inline } untuk menyembunyikannya.

<figure>
  <img src="imgs/hide-filters.svg" alt="Tombol Sembunyikan Filter">
  <figcaption>
    <b>Gambar 36</b>. Sembunyikan Filter, dikotaki warna biru
  </figcaption>
</figure>

[filter]: imgs/filters.png

### Menggunakan baris permintaan besar {: #request-rows }

Gunakan baris besar ketika Anda ingin lebih banyak spasi kosong di tabel permintaan
jaringan Anda. Beberapa kolom juga menyediakan lebih banyak informasi
ketika menggunakan baris besar. Misalnya, nilai terendah dari kolom **Size**
adalah ukuran permintaan yang tidak terkompresi.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Contoh baris permintaan besar pada panel Permintaan.">
  <figcaption>
    <b>Gambar 37</b>. Contoh baris permintaan besar pada panel Permintaan
  </figcaption>
</figure>

Klik **Use large request rows** ![Gunakan baris permintaan
besar][large]{:.devtools-inline} untuk mengaktifkan baris besar.

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="Tombol Baris Permintaan Besar">
  <figcaption>
    <b>Gambar 38</b>. Baris Permintaan Besar, dikotaki warna biru
  </figcaption>
</figure>

### Menyembunyikan panel Ringkasan {: #hide-overview }

Secara default, DevTools menampilkan [panel Ringkasan](#overview).
Klik **Hide overview** ![Sembunyikan ringkasan][hide]{:.devtools-inline} untuk menyembunyikannya.

<figure>
  <img src="imgs/hide-overview.svg" alt="Tombol Sembunyikan Ringkasan">
  <figcaption>
    <b>Gambar 39</b>. Sembunyikan Ringkasan, dikotaki warna biru
  </figcaption>
</figure>

[hide]: imgs/hide-overview.png

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
