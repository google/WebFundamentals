project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mengukur kinerja jaringan aplikasi web Anda menggunakan panel Network Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Mengukur Waktu Pemuatan Resource {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}


Perhatian: Halaman ini tidak digunakan lagi. Di bagian atas setiap bagian, terdapat
link ke halaman terbaru tempat Anda dapat menemukan informasi yang serupa.

Ukur kinerja jaringan situs Anda menggunakan panel
<strong>Network</strong>.


Panel **Network** mencatat informasi tentang operasi setiap jaringan di
suatu halaman, termasuk detail data timing, permintaan dan respons HTTP
header, cookie, dan lainnya.


### TL;DR {: .hide-from-toc }
- Menggunakan panel Network untuk mencatat dan menganalisis aktivitas jaringan.
- Melihat informasi pemuatan secara agregat atau untuk setiap resource.
- Memfilter dan mengurutkan tampilan resource.
- Menyimpan, menyalin, dan membersihkan catatan jaringan.
- Menyesuaikan panel Network sesuai kebutuhan Anda.

## Ringkasan panel Network

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat bagian berikut untuk mengetahui informasi
  terbaru:
  <ul>
    <li><a href="reference#controls">Panel Kontrol</a></li>
    <li><a href="reference#filters">Panel Filter</a></li>
    <li><a href="reference#overview">Panel Ringkasan</a></li>
    <li><a href="reference#requests">Panel Permintaan</a></li>
    <li><a href="reference#summary">Panel Rangkuman</a></li>
  </ul>
</aside>

Panel Network terdiri dari lima panel:

1. **Controls**. Gunakan opsi ini untuk mengontrol tampilan panel **Network**
   dan fungsinya.
2. **Filters**. Gunakan opsi ini untuk mengontrol resource apa saja yang ditampilkan di
   **Requests Table**. Tips: tekan dan tahan <kbd>Cmd</kbd> (Mac) atau <kbd>Ctrl</kbd>
   (Window/Linux), lalu klik filter untuk memilih beberapa filter di
   pada saat yang sama.
3. **Overview**. Grafik ini menampilkan timeline pengambilan resource.
   Jika Anda melihat beberapa bilah yang ditumpuk secara vertikal, artinya resource tersebut
 diambil secara bersamaan.
4. **Requests Table**. Tabel ini menampilkan daftar setiap resource yang diambil.
   Secara default, tabel ini diurutkan secara kronologis, dengan resource
   paling awal ditampilkan di atas.
   Mengklik nama resource akan menampilkan informasi selengkapnya tentang resource tersebut.
   Tips: klik kanan header tabel mana pun kecuali **Timeline** untuk
   menambahkan atau menghapus kolom informasi.
5. **Summary**. Sekilas, panel ini memberi tahu Anda tentang jumlah total permintaan,
 jumlah data yang ditransfer, dan waktu muat.

![panel jaringan](imgs/panes.png)

**Requests Table** menampilkan kolom berikut secara default. Anda bisa
[menambahkan dan menghapus kolom](#add-and-remove-table-columns).

* **Name**. Nama resource.
* **Status**. Kode status HTTP.
* **Type**. Jenis MIME dari resource yang diminta.
* **Initiator**. Objek atau proses yang memulai permintaan. Inisiator
  bisa memiliki salah satu nilai berikut:
  * **Parser**. Parser HTML Chrome memulai permintaan.
  * **Redirect**. Pengalihan HTTP memulai permintaan.
  * **Script**. Skrip memulai permintaan.
  * **Other**. Beberapa proses atau tindakan lain memulai permintaan,
   misalnya pengguna yang masuk ke halaman melalui link, atau dengan memasukkan
   URL di kolom alamat.
* **Size**. Ukuran gabungan header respons (biasanya berukuran
  beberapa ratus byte) ditambah isi respons, sebagaimana dikirimkan oleh server.
* **Time**. Durasi total, dari permulaan permintaan ke
  bagian akhir byte terakhir dalam respons.
* **Timeline**. Kolom Timeline menampilkan jenjang visual semua
  permintaan jaringan. Mengklik header kolom ini akan menampilkan menu
  bidang pengurutan tambahan.

## Rekam aktivitas jaringan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#record">Memulai atau menghentikan perekaman</a>
  untuk informasi terbaru.
</aside>

Saat panel **Network** terbuka, DevTools akan merekam semua aktivitas jaringan
secara default. Untuk merekam, cukup muat ulang halaman saat panel terbuka, atau tunggu
aktivitas jaringan pada halaman yang saat ini dimuat.

Anda bisa melihat apakah DevTools melakukan perekaman atau tidak melalui tombol
**record**. Jika berwarna merah
(![tombol rekam aktif](imgs/record-on.png){:.inline}), berarti DevTools sedang merekam.
Jika berwarna abu-abu (![tombol rekam nonaktif](imgs/record-off.png){:.inline}), berarti DevTools
tidak sedang merekam. Klik tombol ini untuk memulai atau menghentikan perekaman, atau tekan
pintasan keyboard <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Ambil screenshot saat merekam {:#filmstrip}

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#screenshots">Mengambil screenshot saat merekam</a>
  untuk informasi terbaru.
</aside>

Panel **Network** dapat mengambil screenshot selama pemuatan halaman. Fitur ini
dikenal sebagai **Filmstrip**.

Klik ikon **camera** untuk mengaktifkan Filmstrip. Jika ikon berwarna abu-abu,
artinya Filmstrip dinonaktifkan  (![filmstrip
nonaktif](imgs/filmstrip-disabled.png){:.inline}). Jika ikon berwarna biru, artinya
Filmstrip diaktifkan (![filmstrip aktif](imgs/filmstrip-enabled.png){:.inline}).

Muat ulang laman untuk merekam tangkapan layar. Screenshot ditampilkan
di atas **Overview**.

![merekam dengan filmstrip](imgs/filmstrip.png)

Jika Anda mengarahkan kursor ke screenshot, **Timeline** akan menampilkan garis kuning
vertikal yang menunjukkan bahwa bingkai itu direkam.

![overlay filmstrip pada timeline](imgs/filmstrip-timeline-overlay.png)

Klik dua kali screenshot untuk melihat versinya yang diperbesar. Saat
tangkapan layar diperbesar, gunakan panah kiri dan kanan di keyboard Anda
untuk berpindah antar-tangkapan layar.

![screenshot filmstrip yang diperbesar](imgs/filmstrip-zoom.png)

## Lihat informasi peristiwa DOMContentLoaded dan pemuatan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#load">Melihat peristiwa pemuatan</a>
  untuk informasi terbaru.
</aside>

Panel **Network** menyorot dua peristiwa:
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) dan
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` dipicu saat markup awal halaman telah
di-parse. Ini ditampilkan di dua tempat pada panel **Network**:

1. Bilah vertikal biru di panel **Overview** menandakan peristiwa.
2. Di panel **Summary**, Anda bisa melihat waktu persisnya peristiwa.

![peristiwa DOMContentLoaded di panel Network](imgs/domcontentloaded.png)

`load` dipicu saat halaman telah dimuat sepenuhnya. Ini ditampilkan di tiga tempat:

1. Bilah vertikal merah di panel **Overview** menandakan peristiwa.
2. Bilah vertikal merah di **Requests Table** menandakan peristiwa juga.
3. Di panel **Summary** Anda bisa melihat waktu persis peristiwa tersebut.

![memuat kejadian di panel Network](imgs/load.png)

## Lihat detail untuk resource tunggal

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#details">Menampilkan detail</a>
  untuk informasi terbaru.
</aside>

Klik nama resource (di kolom **Name** pada **Requests Table**)
untuk melihat informasi selengkapnya tentang resource tersebut.

Tab yang tersedia akan berubah, tergantung tipe resource yang Anda pilih,
tetapi empat tab berikut paling umum ditampilkan:

* **Headers**. Header HTTP yang terkait dengan resource ini.
* **Preview**. Pratinjau resource JSON, gambar, dan teks.
* **Response**. Data respons HTTP (jika ada).
* **Timing**. Perincian daur hidup permintaan yang lebih detail untuk
 resource.

![menampilkan perincian untuk satu resource](imgs/network-headers.png)

### Lihat timing jaringan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#timing">tab Timing</a>
  untuk informasi terbaru.
</aside>

Klik tab **Timing** untuk menampilkan perincian daur hidup permintaan yang lebih detail
untuk resource tunggal.

Siklus hidup menampilkan berapa lama waktu yang dihabiskan dalam kategori berikut:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Mengantrekan
* Terhenti
* Jika berlaku: DNS lookup, initial connection, SSL handshake
* Request sent
* Waiting (Time to first byte (TTFB))
* Content Download

![tab timing](imgs/timing-tab.png)

Anda juga bisa melihat informasi yang sama ini dengan mengarahkan pointer mouse ke atas
resource di dalam grafik **Timeline**.

![data timing untuk satu resource di timeline](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Panduan Terkait:

* [Memahami Resource Timing](understanding-resource-timing)

### Melihat header HTTP

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#headers">Tab Headers</a>
  untuk informasi terbaru.
</aside>

Mengklik **Headers** akan menampilkan header untuk resource tersebut.

Tab **Headers** menampilkan URL permintaan, metode HTTP, dan
kode status respons resource. Selain itu, tab ini menampilkan header respons dan permintaan
HTTP dan nilainya, serta setiap parameter string kueri.

![header HTTP untuk resource tunggal](imgs/network-headers.png)

Anda dapat menampilkan header respons, header permintaan, atau parameter string kueri
dalam format sumber atau format yang di-parse dengan mengklik link `view source` atau `view parsed`
di sebelah masing-masing bagian.

![menampilkan resource header](imgs/view-header-source.png)

Anda juga bisa menampilkan parameter string kueri di format URL yang dienkode atau didekode dengan
mengklik link `view URL encoded` atau `view decoded` di sebelah bagian tersebut.

![menampilkan URL yang dienkode](imgs/view-url-encoded.png)

### Pratinjau resource

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#preview">Tab Pratinjau</a>
  untuk informasi terbaru.
</aside>

Klik tab **Preview** untuk menampilkan pratinjau resource tersebut. Tab **Preview**
bisa menampilkan informasi berguna atau tidak, tergantung tipe
resource yang Anda pilih.

![pratinjau resource gambar](imgs/preview-png.png)

### Tampilkan materi respons HTTP

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#response">Tab Respons</a>
  untuk informasi terbaru.
</aside>

Klik tab **Response** untuk menampilkan materi respons HTTP
yang tidak diformat. Tab **Response** bisa menampilkan informasi berguna atau tidak,
tergantung tipe resource yang Anda pilih.

![data respons resource JSON](imgs/response-json.png)

### Melihat cookie

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#cookies">Tab Cookie</a>
  untuk informasi terbaru.
</aside>

Klik tab **Cookies** untuk menampilkan tabel cookie yang ditransmisikan di
header respons dan permintaan HTTP resource. Tab ini hanya tersedia
jika cookie ditransmisikan.

Berikut adalah keterangan setiap kolom di tabel:

* **Name**. Nama cookie.
* **Value**. Nilai cookie.
* **Domain**. Domain tempat cookie berada.
* **Path**. Jalur URL asal cookie.
* **Expires / Max-Age**. Nilai properti kedaluwarsa atau usia maksimum
 cookie.
* **Size**. Ukuran cookie dalam byte.
* **HTTP**. Menandakan bahwa cookie harus ditetapkan oleh browser dalam
  permintaan HTTP saja dan tidak bisa diakses dengan JavaScript.
* **Secure**. Kehadiran atribut ini menandakan bahwa cookie harus
  ditransmisikan hanya melalui koneksi aman.

![cookie resource](imgs/cookies.png)

### Tampilkan frame WebSocket

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#frames">Tab Frame</a>
  untuk informasi terbaru.
</aside>

Klik tab **Frames** untuk menampilkan
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
informasi koneksi. Tab ini hanya terlihat jika resource yang dipilih
memulai koneksi `WebSocket`.

![tab websocket frames](imgs/websocket-frames.png)

Daftar berikut menjelaskan masing-masing kolom di tabel tab
**Frames**:

* **Data**. Payload pesan. Jika berformat teks biasa, pesan
  ditampilkan di sini. Untuk opcode biner, bidang ini menampilkan nama dan kode
  opcode. Didukung opcode berikut:
  * Continuation Frame
  * Binary Frame
  * Connection Close Frame
  * Ping Frame
  * Pong Frame
* **Length**. Panjang payload pesan dalam byte.
* **Time**. Stempel waktu saat pesan dibuat.

Pesan diberi kode warna sesuai dengan jenisnya:

* Pesan teks keluar ditandai dengan kode warna hijau muda.
* Pesan teks masuk berwarna putih.
* Opcode WebSocket berwarna kuning terang.
* Error berwarna merah terang.

**Catatan tentang implementasi saat ini:**

* Untuk memuat ulang tabel **Frames** setelah pesan baru masuk, klik
  nama resource di sebelah kiri.
* Hanya 100 pesan `WebSocket` terakhir yang dipertahankan di tabel **Frames**.

## Tampilkan inisiator dan dependensi resource {:#initiators-dependencies}

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#initiators-dependencies">Menampilkan inisiator dan
  dependensi</a> untuk informasi terbaru.
</aside>

Tekan <kbd>Shift</kbd> dan arahkan kursor ke resource untuk menampilkan inisiator
dan dependensinya. Bagian ini mengacu pada resource yang Anda arahkan pointer mouse
ke atasnya sebagai **target**.

Resource pertama di atas target yang ditandai warna hijau adalah inisiator
target. Jika ada resource kedua di atasnya yang ditandai warna
hijau, ini adalah inisiator dari inisiator. Semua resource di bawah target
dengan kode warna merah adalah dependensi target.

Di screenshot berikut, targetnya adalah `dn/`. Inisiator target adalah
skrip yang dimulai dengan `rs=AA2Y`. Inisiator dari inisiator
(`rs=AA2Y`) adalah `google.com`. Terakhir, `dn.js` adalah dependensi
target (`dn/`).

![menampilkan inisiator dan
dependensi resource](imgs/initiators-dependencies.png)

Perhatikan bahwa untuk halaman yang berisi banyak resource, Anda mungkin
tidak dapat melihat semua inisiator atau dependensi.

## Mengurutkan permintaan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#sort-by-activity">Mengurutkan berdasarkan fase aktivitas</a>
  untuk informasi terbaru.
</aside>

Secara default, resource di **Requests Table** diurutkan berdasarkan waktu mulai
dari setiap permintaan, yang dimulai dengan permintaan paling awal di bagian atas.

Klik header kolom untuk mengurutkan tabel berdasarkan setiap nilai resource
untuk header tersebut. Klik lagi header yang sama untuk mengubah urutan ke
naik atau turun.

Kolom **Timeline** bersifat unik, berbeda dari yang lain. Jika diklik, menu bidang pengurutan
akan ditampilkan:

* **Timeline**. Mengurutkan berdasarkan waktu mulai setiap permintaan jaringan. Ini adalah
  pengurutan default dan sama dengan mengurutkan berdasarkan opsi **Start Time**
* **Start Time**. Mengurutkan berdasarkan waktu mulai setiap permintaan jaringan (sama
  dengan mengurutkan opsi **Timeline**).
* **Response Time**. Mengurutkan berdasarkan waktu respons setiap permintaan.
* **End Time**. Mengurutkan berdasarkan waktu setiap kali permintaan selesai.
* **Duration**. Mengurutkan berdasarkan waktu total setiap permintaan. Pilih filter
  ini untuk melihat resource mana yang membutuhkan waktu paling lama untuk dimuat.
* **Latency**. Mengurutkan berdasarkan waktu antara permintaan dimulai sampai
  awal mulai respons. Pilih filter ini untuk melihat resource
 mana yang membutuhkan waktu terlama untuk byte pertama atau time to first byte (TTFB).

![bidang pengurutan timeline](imgs/timeline-sort-fields.png)

## Memfilter permintaan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#filters">Panel filter</a>
  untuk informasi terbaru.
</aside>

Panel **Network** menyediakan berbagai cara untuk memfilter resource mana yang akan
ditampilkan. Klik tombol **filters**
(![tombol filter](imgs/filters.png){:.inline})
untuk menyembunyikan atau menampilkan panel **Filter**.

Gunakan tombol tipe materi untuk menampilkan resource tipe materi
yang dipilih saja.

Note: Tekan <kbd>Cmd</kbd> (Mac) atau <kbd>Ctrl</kbd> (Windows/Linux), lalu klik untuk mengaktifkan beberapa filter secara bersamaan.

![beberapa filter tipe materi dipilih
secara bersamaan](imgs/multiple-content-type-filters.png)

Bidang teks **filter** meski sederhana, tetapi sangat berguna. Jika Anda memasukkan
sembarang string ke dalamnya, panel **Network** hanya menampilkan resource yang
nama filenya cocok dengan string yang dimasukkan.

![pemfilteran nama resource](imgs/resource-name-filtering.png)

Bidang teks **filter** juga mendukung berbagai kata kunci yang dapat Anda gunakan untuk
mengurutkan resource berdasarkan berbagai properti, seperti ukuran file menggunakan kata kunci `larger-than`
.

Daftar berikut menguraikan semua kata kunci.

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

![memfilter berdasarkan ukuran file](imgs/larger-than.png)

Beberapa kata kunci di atas menyebutkan menu dropdown pelengkapan otomatis. Untuk membuka menu
pelengkapan otomatis, ketik kata kunci diikuti dengan tanda titik dua. Misalnya,
di screenshot berikut, mengetik `domain:` akan membuka dropdown pelengkapan otomatis.

![memfilter pelengkapan otomatis bidang teks](imgs/filter-autocomplete.png)

## Salin, simpan, dan bersihkan informasi jaringan

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat bagian berikut untuk mengetahui informasi
  terbaru:
  <ul>
    <li><a href="reference#copy">Menyalin satu atau semua permintaan</a></li>
    <li><a href="reference#save-as-har">Menyimpan sebagai HAR dengan konten</a></li>
    <li><a href="reference#clear-cache">Membersihkan cache browser</a></li>
    <li><a href="reference#clear-cookies">Membersihkan cookie browser</a></li>.
  </ul>
</aside>

Klik kanan di dalam **Requests Table** untuk menyalin, menyimpan, atau
menghapus informasi jaringan. Beberapa opsi peka konteks, sehingga
jika Anda ingin beroperasi dengan satu resource, Anda harus mengklik kanan
baris resource tersebut. Daftar berikut menjelaskan setiap opsi.

* **Copy Response**. Menyalin respons HTTP resource yang dipilih ke
  clipboard sistem.
* **Copy as cURL**. Menyalin permintaan jaringan resource yang dipilih sebagai
 string perintah   [cURL](http://curl.haxx.se/){: .external } ke clipboard sistem.
  Lihat [Menyalin permintaan sebagai perintah cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**. Menyalin semua resource ke clipboard sistem sebagai
 data [HAR](https://en.wikipedia.org/wiki/.har){: .external } .
  File HAR berisi struktur data JSON yang menjelaskan "jenjang"
  jaringan. Banyak [pihak ketiga](https://ericduran.github.io/chromeHAR/){: .external }
  [fitur](https://code.google.com/p/harviewer/){: .external } dapat merekonstruksi jenjang
 jaringan dari data di file HAR. Lihat
 [Web Performance Power Tool: Arsip HTTP
  (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
  untuk informasi selengkapnya.
* **Save as HAR with Content**. Menyimpan semua data jaringan ke dalam
  file HAR bersama dengan setiap resource halaman. Resource biner, termasuk gambar,
  dienkode sebagai teks berenkode Base64.
* **Clear Browser Cache**. Bersihkan cache browser.
  **Tips**: Anda juga bisa mengaktifkan atau menonaktifkan cache browser dari panel samping
  [**Network Conditions**][nc].
* **Clear Browser Cookies**. Bersihkan cookie browser.
* **Open in Sources Panel**. Buka resource yang dipilih di panel
  **Sources**.
* **Open Link in New Tab**. Membuka resource yang dipilih di tab baru. Anda
  juga bisa mengklik dua kali nama resource di tabel Network.
* **Copy Link Address**. Menyalin URL resource ke clipboard sistem.
* **Save**. Simpan resource teks yang dipilih. Hanya ditampilkan pada resource
  teks.
* **Replay XHR**. Mengirimkan ulang `XMLHTTPRequest` yang dipilih. Hanya ditampilkan di resource
 XHR.

![menyalin dan menyimpan menu konteks](imgs/copy-save-menu.png)

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Salin satu atau semua permintaan sebagai perintah cURL {: #curl }

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#copy">Menyalin satu atau semua permintaan</a>
  untuk informasi terbaru.
</aside>

[cURL](http://curl.haxx.se/){: .external } adalah alat (bantu) baris perintah untuk membuat transaksi
HTTP

Klik kanan pada resource dalam Tabel Permintaan, arahkan kursor ke
**Copy** lalu pilih **Copy as cURL** untuk menyalin string permintaan cURL
untuk semua resource yang dideteksi oleh panel Network.

![Menyalin permintaan tunggal sebagai perintah cURL](imgs/copy-as-curl.png)

Pilih **Copy All as cURL** untuk menyalin string permintaan cURL untuk semua
resource yang dideteksi oleh panel Network.

Jika Anda menyalin semua, pemfilteran akan diabaikan (mis. Anda memfilter panel Network
agar hanya menampilkan resourse **Copy All as cURL**, Anda akan mendapatkan
semua resource yang terdeteksi, tidak hanya CSS).

## Menyesuaikan panel Network

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#request-rows">Menggunakan baris permintaan besar atau kecil</a>
  untuk informasi terbaru.
</aside>

Secara default, **Requests Table** menampilkan resource dengan baris kecil. Klik
tombol **Use large resource rows**
(![tombol baris resource besar](imgs/large-resource-rows-button.png){:.inline})
untuk menambah ukuran masing-masing baris.

Baris besar memungkinkan beberapa kolom untuk menampilkan dua bidang teks: bidang
primer dan bidang sekunder. Header kolom menunjukkan arti dari
bidang sekunder.

![baris resource besar](imgs/large-resource-rows.png)

### Tambah dan hapus kolom tabel

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat bagian berikut untuk mengetahui informasi
  terbaru:
  <ul>
    <li><a href="reference#columns">Tampilkan atau sembunyikan kolom</a></li>
    <li><a href="reference#custom-columns">Tambahkan kolom khusus</a></li>
  </ul>
</aside>

Klik kanan header apa pun di **Requests Table** untuk menambahkan atau menghapus
kolom.

![Menambahkan atau menghapus kolom](imgs/add-remove-columns.png)

### Simpan log jaringan saat navigasi

<aside class="warning">
  <b>Perhatian:</b> Halaman ini tidak digunakan lagi. Lihat
  <a href="reference#preserve-log">Menyimpan log</a>
  untuk informasi terbaru.
</aside>

Secara default, perekaman aktivitas jaringan dibuang setiap kali Anda
memuat ulang halaman saat ini atau memuat halaman yang berbeda.
Aktifkan kotak centang **Preserve log** untuk menyimpan log jaringan di semua
skenario ini. Catatan baru ditambahkan ke bagian bawah **Requests Table**.

## Resource tambahan

Untuk mempelajari selengkapnya tentang mengoptimalkan kinerja jaringan aplikasi Anda, lihat referensi berikut:

* Gunakan [Insight
 PageSpeed](/speed/pagespeed/insights) untuk mengidentifikasi
  praktik terbaik kinerja yang bisa diterapkan pada situs Anda, dan
  [fitur Pengoptimalan PageSpeed](/speed/pagespeed/optimization) untuk
  mengotomatiskan proses penerapan praktik terbaik tersebut.
* [Jaringan Kinerja Tinggi di Google
  Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)
  membahas bagian dalam jaringan Chrome dan bagaimana Anda dapat memanfaatkannya
  untuk mempercepat situs Anda.
* [Bagaimana cara kerja kompresi gzip
](/speed/articles/gzip) memberikan ringkasan tingkat tinggi
  tentang kompresi gzip dan keunggulannya.
* [Praktik Terbaik Kinerja
  Web](/speed/docs/best-practices/rules_intro)
  memberikan tips tambahan untuk mengoptimalkan kinerja jaringan halaman web
  atau aplikasi Anda.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
