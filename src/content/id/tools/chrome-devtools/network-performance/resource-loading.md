project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mengukur kinerja jaringan aplikasi web Anda menggunakan panel Network Chrome DevTools.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Mengukur Waktu Pemuatan Sumber Daya {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Mengukur kinerja jaringan situs Anda menggunakan panel 
<strong>Network</strong>.

![panel chrome devtools network](imgs/network-panel.png)

Panel **Network** mencatat informasi tentang setiap operasi jaringan pada
sebuah laman, yang meliputi data pengaturan waktu yang detail, header permintaan dan respons HTTP, 
cookie, dan lainnya.


### TL;DR {: .hide-from-toc }
- Menggunakan panel Network untuk mencatat dan menganalisis aktivitas jaringan.
- Melihat informasi beban secara agregat atau untuk masing-masing sumber daya.
- Memfilter dan mengurutkan tampilan sumber daya.
- Menyimpan, menyalin, dan membersihkan catatan jaringan.
- Menyesuaikan panel Network sesuai kebutuhan.


## Ringkasan panel Network

Panel Network terdiri atas lima panel:

1. **Controls**. Gunakan opsi ini untuk mengontrol tampilan panel **Network** 
   dan fungsinya.
2. **Filters**. Gunakan opsi ini untuk mengontrol sumber daya apa saja yang akan ditampilkan di 
   **Requests Table**. Tip: tekan <kbd>Cmd</kbd> (Mac) atau <kbd>Ctrl</kbd>
   (Window/Linux), lalu klik filter untuk memilih beberapa filter 
   secara bersamaan.
3. **Overview**. Grafik ini menampilkan timeline pengambilan sumber daya.
   Jika Anda melihat beberapa bilah yang ditumpuk secara vertikal, artinya sumber daya tersebut 
 diambil secara bersamaan.
4. **Requests Table**. Tabel ini menampilkan daftar setiap sumber daya yang diambil.
   Secara default, tabel ini diurutkan secara kronologis, dengan sumber daya 
   yang paling awal ditampilkan di atas.
   Mengeklik nama sumber daya akan menampilkan informasi selengkapnya tentang sumber daya tersebut.
   Tip: klik kanan header tabel mana pun kecuali **Timeline** untuk 
   menambahkan atau membuang kolom informasi.
5. **Summary**. Sekilas, panel ini memberi tahu Anda tentang jumlah total permintaan,
 jumlah data yang ditransfer, dan waktu muat.

![Panel network panel](imgs/panes.png)

**Requests Table** menampilkan kolom berikut secara default. Anda bisa
[menambahkan dan membuang kolom](#add-and-remove-table-columns).

* **Name**. Nama sumber daya.
* **Status**. Kode status HTTP.
* **Type**. Tipe MIME sumber daya yang diminta.
* **Initiator**. Objek atau proses yang memulai permintaan. Inisiator 
  bisa memiliki salah satu nilai berikut:
  * **Parser**. Parser HTML Chrome memulai permintaan.
  * **Redirect**. Pengalihan HTTP memulai permintaan.
  * **Script**. Skrip memulai permintaan.
  * **Other**. Proses atau tindakan lain memulai permintaan, 
   misalnya pengguna yang masuk ke laman melalui tautan, atau dengan memasukkan 
   URL di bilah alamat.
* **Size**. Ukuran gabungan header respons (biasanya berukuran 
  beberapa ratus byte) ditambah tubuh respons, sebagaimana dikirimkan oleh server. 
* **Time**. Durasi total, dari mulai permintaan sampai 
  penerimaan byte terakhir di respons. 
* **Timeline**. Kolom Timeline menampilkan jenjang visual semua 
  permintaan jaringan. Mengeklik header kolom ini akan menampilkan menu 
  bidang pengurutan tambahan.

## Merekam aktivitas jaringan

Saat panel **Network** dibuka, DevTools akan merekam semua aktivitas jaringan
secara default. Untuk merekam, cukup muat ulang laman saat panel terbuka, atau tunggu 
aktivitas jaringan pada laman yang saat ini dimuat.

Anda bisa melihat apakah DevTools melakukan perekaman atau tidak melalui tombol 
**record**. Bila berwarna merah 
(![tombol record aktif](imgs/record-on.png){:.inline}), artinya DevTools sedang merekam.
Bila berwarna abu-abu (![tombol record nonaktif](imgs/record-off.png){:.inline}, artinya DevTools 
tidak sedang merekam. Klik tombol ini untuk memulai atau menghentikan perekaman, atau tekan 
pintasan keyboard <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Mengambil tangkapan layar saat merekam {:#filmstrip}

Panel **Network** dapat merekam tangkapan layar selama pemuatan laman. Fitur ini
dikenal sebagai **Filmstrip**. 

Klik ikon **kamera** untuk mengaktifkan Filmstrip. Bila ikon berwarna abu-abu, 
artinya Filmstrip dinonaktifkan  (![filmstrip 
dinonaktifkan](imgs/filmstrip-disabled.png){:.inline}). Bila ikon berwarna biru, artinya
Filmstrip diaktifkan (![filmstrip diaktifkan](imgs/filmstrip-enabled.png){:.inline}).

Muat ulang laman untuk merekam tangkapan layar. Tangkapan layar ditampilkan
di atas **Overview**. 

![merekam dengan filmstrip](imgs/filmstrip.png)

Bila Anda mengarahkan kursor ke atas tangkapan layar, **Timeline** akan menampilkan garis kuning
vertikal yang menunjukkan bahwa bingkai itu direkam.

![overlay filmstrip pada timeline](imgs/filmstrip-timeline-overlay.png)

Klik dua kali tangkapan layar untuk melihat versinya yang diperbesar. Saat
tangkapan layar diperbesar, gunakan panah kiri dan kanan di keyboard Anda
untuk berpindah antar-tangkapan layar.

![tangkapan layar filmstrip yang diperbesar](imgs/filmstrip-zoom.png)

## Menampilkan informasi kejadian DOMContentLoaded dan load

Panel **Network** menyorot dua kejadian: 
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) dan 
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` dipicu saat markup awal laman telah 
di-parse. Ini ditampilkan di dua tempat pada panel **Network**:

1. Bilah vertikal biru di panel **Overview** menandakan kejadian.
2. Di panel **Summary** Anda bisa melihat waktu pasti kejadian.

![Kejadian DOMContentLoaded di panel network](imgs/domcontentloaded.png)

`load` dipicu saat laman telah dimuat sepenuhnya. Ini ditampilkan di tiga tempat:

1. Bilah vertikal merah di panel **Overview** menandakan kejadian.
2. Bilah vertikal merah di **Requests Table** juga menandakan kejadian.
3. Di panel **Summary** Anda bisa melihat waktu pasti kejadian.

![memuat kejadian di panel network](imgs/load.png)

## Menampilkan detail satu sumber daya

Klik nama sumber daya (di kolom **Name** di **Requests Table**)
untuk menampilkan informasi selengkapnya tentang sumber daya tersebut.

Tab yang tersedia akan berubah tergantung pada tipe sumber daya yang Anda pilih,
tetapi empat tab berikut paling umum ditampilkan:

* **Headers**. Header HTTP yang terkait dengan sumber daya ini.
* **Preview**. Pratinjau sumber daya JSON, gambar, dan teks.
* **Response**. Data respons HTTP (jika ada).
* **Timing**. Perincian daur hidup permintaan yang lebih detail untuk 
 sumber daya.

![menampilkan perincian untuk satu sumber daya](imgs/network-headers.png)

### Menampilkan pengaturan waktu jaringan

Klik tab **Timing** untuk menampilkan perincian daur hidup permintaan yang lebih detail 
untuk satu sumber daya. 

Siklus hidup menampilkan berapa lama waktu yang dihabiskan dalam kategori berikut:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled
* Jika berlaku: DNS lookup, initial connection, SSL handshake
* Request sent
* Waiting (Time to first byte (TTFB))
* Content Download

![tab timing](imgs/timing-tab.png)

Anda juga bisa melihat informasi yang sama ini dengan mengarahkan pointer mouse ke atas 
sumber daya di dalam grafik **Timeline**. 

![data pengaturan waktu untuk satu sumber daya di timeline](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Panduan Terkait:

* [Memahami Resource Timing](understanding-resource-timing)

### Menampilkan header HTTP

Mengeklik **Headers** akan menampilkan header untuk sumber daya tersebut.

Tab **Headers** menampilkan URL permintaan, metode HTTP, dan 
kode status respons sumber daya. Selain itu, tab ini menampilkan header respons dan permintaan 
HTTP dan nilainya, serta setiap parameter string kueri. 

![Header HTTP untuk satu sumber daya](imgs/network-headers.png)

Anda dapat menampilkan header respons, header permintaan, atau parameter string kueri
dalam format sumber atau format yang di-parse dengan mengeklik tautan `view source` atau `view parsed` 
di sebelah masing-masing bagian.

![menampilkan sumber daya header](imgs/view-header-source.png)

Anda juga bisa menampilkan parameter string kueri di format URL yang dienkode atau didekode dengan
mengeklik tautan `view URL encoded` atau `view decoded` di sebelah bagian tersebut.

![menampilkan URL yang dienkode](imgs/view-url-encoded.png)

### Melakukan pratinjau sumber daya

Klik tab **Preview** untuk menampilkan pratinjau sumber daya tersebut. Tab **Preview**
bisa menampilkan informasi berguna atau tidak, tergantung pada tipe 
sumber daya yang Anda pilih.

![pratinjau sumber daya gambar](imgs/preview-png.png)

### Menampilkan materi respons HTTP

Klik tab **Response** untuk menampilkan materi respons HTTP 
yang tidak diformat. Tab **Response** bisa menampilkan informasi berguna atau tidak, 
tergantung pada tipe sumber daya yang Anda pilih.

![data respons sumber daya JSON](imgs/response-json.png)

### Menampilkan cookie

Klik tab **Cookies** untuk menampilkan tabel cookie yang ditransmisikan di 
header respons dan permintaan HTTP sumber daya. Tab ini hanya tersedia
bila cookie ditransmisikan.

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

![cookie sumber daya](imgs/cookies.png)

### Menampilkan bingkai WebSocket

Klik tab **Frames** untuk menampilkan informasi koneksi 
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
. Tab ini hanya terlihat bila sumber daya yang dipilih 
memulai koneksi `WebSocket`.

![tab websocket frames](imgs/websocket-frames.png)

Daftar berikut menjelaskan masing-masing kolom di tabel pada tab **Frames**
:

* **Data**. Payload pesan. Jika berformat teks biasa, pesan 
  ditampilkan di sini. Untuk opcode biner, bidang ini menampilkan nama dan kode 
  opcode. Opcode berikut didukung:
  * Continuation Frame
  * Binary Frame
  * Connection Close Frame
  * Ping Frame
  * Pong Frame
* **Length**. Panjang payload pesan dalam byte.
* **Time**. Stempel waktu saat pesan dibuat.

Pesan diberi kode warna sesuai dengan tipenya: 

* Pesan teks keluar ditandai dengan warna hijau muda.
* Pesan teks masuk berwarna putih. 
* Opcode WebSocket berwarna kuning muda.
* Kesalahan berwarna merah muda.

**Catatan tentang implementasi saat ini:**

* Untuk menyegarkan tabel **Frames** setelah pesan baru tiba, klik 
  nama sumber daya di sebelah kiri.
* Hanya 100 pesan `WebSocket` terakhir yang dipertahankan di tabel **Frames**.

## Menampilkan inisiator dan dependensi sumber daya {:#initiators-dependencies}

Tekan <kbd>Shift</kbd> sambil arahkan kursor ke atas sumber daya untuk menampilkan inisiator
dan dependensinya. Bagian ini mengacu pada sumber daya yang Anda arahkan pointer mouse 
ke atasnya sebagai **target**. 

Sumber daya pertama di atas target yang ditandai warna hijau adalah inisiator
target. Jika ada sumber daya kedua di atasnya yang ditandai warna
hijau, ini adalah inisiator dari inisiator. Semua sumber daya di bawah target
dengan kode warna merah adalah dependensi target.

Di tangkapan layar berikut, targetnya adalah `dn/`. Inisiator target adalah
skrip yang dimulai dengan `rs=AA2Y`. Inisiator dari inisiator 
(`rs=AA2Y`) adalah `google.com`. Terakhir, `dn.js` adalah dependensi 
target (`dn/`).

![menampilkan inisiator dan 
dependensi sumber daya](imgs/initiators-dependencies.png)

Perhatikan bahwa untuk laman yang berisi banyak sumber daya, Anda mungkin 
tidak dapat melihat semua inisiator atau dependensi. 

## Mengurutkan permintaan

Secara default, sumber daya di **Requests Table** diurutkan berdasarkan waktu mulai
setiap permintaan, yang dimulai dengan permintaan paling awal di bagian atas.

Klik header kolom untuk mengurutkan tabel berdasarkan setiap nilai sumber daya
untuk header tersebut. Klik lagi header yang sama untuk mengubah urutan ke 
naik atau turun.

Kolom **Timeline** bersifat unik, berbeda dari yang lain. Bila diklik, menu bidang pengurutan
akan ditampilkan:

* **Timeline**. Mengurutkan berdasarkan waktu mulai setiap permintaan jaringan. Ini adalah 
  pengurutan default dan sama dengan mengurutkan berdasarkan opsi **Start Time**.
* **Start Time**. Mengurutkan berdasarkan waktu mulai setiap permintaan jaringan (sama 
  dengan mengurutkan berdasarkan opsi **Timeline**).
* **Response Time**. Mengurutkan berdasarkan waktu respons setiap permintaan.
* **End Time**. Mengurutkan berdasarkan waktu setiap kali permintaan selesai.
* **Duration**. Mengurutkan berdasarkan waktu total setiap permintaan. Pilih filter 
  ini untuk melihat sumber daya mana yang membutuhkan waktu paling lama untuk dimuat.
* **Latency**. Mengurutkan berdasarkan waktu antara permintaan dimulai sampai 
  awal mulai respons. Pilih filter ini untuk melihat sumber daya mana 
 yang membutuhkan waktu terlama untuk byte pertama atau time to first byte (TTFB).

![Bidang pengurutan timeline](imgs/timeline-sort-fields.png)

## Memfilter permintaan 

Panel **Network** menyediakan berbagai cara untuk memfilter sumber daya mana yang akan 
ditampilkan. Klik tombol **filters**
(![tombol filters](imgs/filters.png){:.inline})
untuk menyembunyikan atau menampilkan panel **Filters**.

Gunakan tombol content type untuk menampilkan sumber daya tipe materi 
yang dipilih saja. 

Note: Tekan <kbd>Cmd</kbd> (Mac) atau <kbd>Ctrl</kbd> (Windows/Linux), lalu klik untuk mengaktifkan beberapa filter secara bersamaan.

![beberapa filter tipe materi dipilih 
secara bersamaan](imgs/multiple-content-type-filters.png)

Bidang teks **filter** meski sederhana, tetapi sangat berguna. Jika Anda memasukkan
sembarang string ke dalamnya, panel **Network** hanya menampilkan sumber daya yang
nama filenya cocok dengan string yang dimasukkan.

![pemfilteran nama sumber daya](imgs/resource-name-filtering.png)

Bidang teks **filter** juga mendukung berbagai kata kunci yang dapat Anda gunakan untuk 
mengurutkan sumber daya berdasarkan berbagai properti, seperti ukuran file menggunakan kata kunci `larger-than`
.

Daftar berikut menguraikan semua kata kunci. 

* `domain`. Hanya menampilkan sumber daya dari domain yang ditetapkan. Anda bisa menggunakan 
  karakter pengganti (`*`) untuk menyertakan beberapa domain. Misalnya, `*.com` 
  menampilkan sumber daya dari semua nama domain yang berakhiran `.com`. DevTools 
  mengisi menu tarik-turun pelengkapan otomatis dengan semua domain
  yang dijumpainya.
* `has-response-header`. Menampilkan sumber daya yang berisi header respons HTTP 
  yang ditetapkan. DevTools mengisi menu tarik-turun pelengkapan otomatis dengan 
  semua header respons yang dijumpainya.
* `is`. Gunakan `is:running` untuk menemukan sumber daya `WebSocket`.
* `larger-than`. Menampilkan sumber daya yang lebih besar dari ukuran yang ditetapkan, 
  dalam byte. Menetapkan nilai `1000` adalah sama dengan menetapkan nilai `1k`.
* `method`. Menampilkan sumber daya yang diambil melalui tipe metode HTTP
  yang ditetapkan. DevTools mengisi tarik-turun dengan semua metode HTTP
  yang dijumpainya.
* `mime-type`. Menampilkan sumber daya tipe MIME yang ditetapkan. DevTools mengisi
  tarik-turun dengan semua tipe MIME yang dijumpainya.
* `mixed-content`. Menampilkan semua sumber daya materi campuran (`mixed-content:all`) atau
  hanya yang sedang ditampilkan (`mixed-content:displayed`).
* `scheme`. Menampilkan sumber daya yang diambil melalui HTTP yang tidak dilindungi (`scheme:http`) 
  atau HTTPS yang dilindungi (`scheme:https`).
* `set-cookie-domain`. Menampilkan sumber daya yang memiliki header `Set-Cookie` 
  dengan atribut `Domain` yang cocok dengan nilai yang ditetapkan. DevTools 
  mengisi pelengkapan otomatis dengan semua domain cookie yang 
  dijumpainya.
* `set-cookie-name`. Menampilkan sumber daya yang memiliki header `Set-Cookie` 
  dengan nama yang cocok dengan nilai yang ditetapkan. DevTools mengisi 
  pelengkapan otomatis dengan semua nama cookie yang dijumpainya.
* `set-cookie-value`. Menampilkan sumber daya yang memiliki header `Set-Cookie` 
  dengan nilai yang cocok dengan nilai yang ditetapkan. DevTools mengisi 
  pelengkapan otomatis dengan semua nilai cookie yang dijumpainya.
* `status-code`. Hanya menampilkan sumber daya yang kode status HTTP-nya cocok dengan kode 
  yang ditetapkan. DevTools mengisi menu tarik-turun pelengkapan otomatis dengan semua 
 kode status yang dijumpainya.

![Memfilter berdasarkan ukuran file](imgs/larger-than.png)

Beberapa kata kunci di atas menyebutkan menu tarik-turun pelengkapan otomatis. Untuk membuka menu
pelengkapan otomatis, ketikkan kata kunci diikuti dengan tanda titik dua. Misalnya,
di tangkapan layar berikut, mengetikkan `domain:` akan membuka tarik-turun pelengkapan otomatis.

![filter pelengkapan otomatis bidang teks](imgs/filter-autocomplete.png)

## Menyalin, menyimpan, dan membersihkan informasi jaringan

Klik kanan di dalam **Requests Table** untuk menyalin, menyimpan, atau
menghapus informasi jaringan. Beberapa opsi peka konteks, sehingga 
jika Anda ingin beroperasi dengan satu sumber daya, Anda harus mengeklik kanan
baris sumber daya tersebut. Daftar berikut menjelaskan setiap opsi.

* **Copy Response**. Menyalin respons HTTP sumber daya yang dipilih ke 
  clipboard sistem.
* **Copy as cURL**. Menyalin permintaan jaringan sumber daya yang dipilih sebagai
 string perintah [cURL](http://curl.haxx.se/){: .external } ke clipboard sistem.
  Lihat [Menyalin permintaan sebagai perintah cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**. Menyalin semua sumber daya ke clipboard sistem sebagai
 data [HAR](https://en.wikipedia.org/wiki/.har){: .external }.
  File HAR berisi struktur data JSON yang menjelaskan "jenjang" 
  jaringan. Beberapa [alat](https://code.google.com/p/harviewer/){: .external }
 [pihak ketiga](https://ericduran.github.io/chromeHAR/){: .external } dapat merekonstruksi jenjang
 jaringan dari data di file HAR. Lihat
 [Web Performance Power Tool: HTTP Archive 
  (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
  untuk informasi selengkapnya.
* **Save as HAR with Content**. Menyimpan semua data jaringan ke dalam
  file HAR bersama dengan setiap sumber daya laman. Sumber daya biner, termasuk gambar, 
  dienkode sebagai teks berenkode Base64.
* **Clear Browser Cache**. Membersihkan cache browser.
  **Tip**: Anda juga bisa mengaktifkan atau menonaktifkan cache browser dari panel samping 
  [**Network Conditions**][nc].
* **Clear Browser Cookies**. Membersihkan cookie browser.
* **Open in Sources Panel**. Membuka sumber daya yang dipilih di panel 
  **Sources**.
* **Open Link in New Tab**. Membuka sumber daya yang dipilih di tab baru. Anda 
  juga bisa mengeklik dua kali nama sumber daya di tabel Network.
* **Copy Link Address**. Menyalin URL sumber daya ke clipboard sistem.
* **Save**. Menyimpan sumber daya teks yang dipilih. Hanya ditampilkan pada sumber daya 
  teks.
* **Replay XHR**. Mengirimkan ulang `XMLHTTPRequest` yang dipilih. Hanya ditampilkan pada sumber daya
 XHR.

![salin dan simpan menu konteks](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Menyalin satu atau semua permintaan sebagai perintah cURL {: #curl }

[cURL](http://curl.haxx.se/){: .external } adalah alat (bantu) baris perintah untuk membuat transaksi 
HTTP. 

Klik kanan pada sumber daya dalam Requests Table, arahkan kursor ke atas 
**Copy** lalu pilih **Copy as cURL** untuk menyalin string permintaan cURL 
untuk semua sumber daya yang dideteksi oleh panel Network.

![Salin permintaan tunggal sebagai perintah cURL](imgs/copy-as-curl.png)

Pilih **Copy All as cURL** untuk menyalin string permintaan cURL untuk semua
sumber daya yang dideteksi oleh panel Network.

Apabila Anda menyalin semua, filter akan diabaikan (mis. Anda sedang memfilter panel Network
agar hanya menampilkan sumber daya CSS lalu menekan **Copy All as cURL**, Anda akan mendapatkan
semua sumber daya yang terdeteksi, tidak hanya CSS).

## Menyesuaikan panel Network

Secara default, **Requests Table** menampilkan sumber daya dengan baris yang kecil. Klik tombol
 **Use large resource rows** 
(![tombol large resource row](imgs/large-resource-rows-button.png){:.inline})
untuk meningkatkan ukuran setiap baris. 

Baris besar memungkinkan beberapa kolom untuk menampilkan dua bidang teks: bidang 
primer dan bidang sekunder. Header kolom menunjukkan arti dari 
bidang sekunder. 

![baris sumber daya besar](imgs/large-resource-rows.png)

### Menambahkan dan membuang kolom tabel

Klik kanan header apa pun di **Requests Table** untuk menambahkan atau membuang
kolom.

![Tambah atau buang kolom](imgs/add-remove-columns.png)

### Menyimpan log jaringan saat navigasi

Secara default, perekaman aktivitas jaringan dibuang setiap kali Anda 
memuat ulang laman saat ini atau memuat laman yang berbeda.
Aktifkan kotak centang **Preserve log** untuk menyimpan log jaringan di semua
skenario ini. Catatan baru ditambahkan ke bagian bawah **Requests Table**.

## Sumber daya tambahan

Untuk mempelajari selengkapnya tentang mengoptimalkan kinerja jaringan aplikasi Anda, lihat referensi berikut:

* Gunakan [PageSpeed 
  Insights](/speed/pagespeed/insights) untuk mengidentifikasi 
  praktik terbaik kinerja yang bisa diterapkan pada situs Anda, dan 
  [alat optimalisasi 
  PageSpeed](/speed/pagespeed/optimization) untuk 
  mengotomatiskan proses penerapan praktik terbaik tersebut.
* [High Performance Networking in Google
  Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/) 
  membahas bagian dalam jaringan Chrome dan bagaimana Anda dapat memanfaatkannya 
  untuk mempercepat situs Anda.
* [How gzip compression 
  works](/speed/articles/gzip) memberikan ringkasan tingkat tinggi 
  tentang kompresi gzip dan keunggulannya.
* [Web Performance Best 
  Practices](/speed/docs/best-practices/rules_intro) 
  memberikan tip tambahan untuk mengoptimalkan kinerja jaringan laman web 
  atau aplikasi Anda.




{# wf_devsite_translation #}
