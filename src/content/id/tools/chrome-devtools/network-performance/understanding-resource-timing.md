project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Penting bagi Anda untuk memahami fase tempat sumber daya dikumpulkan di jaringan. Ini adalah dasar memperbaiki masalah pemuatan.

{# wf_published_on: 2016-02-03 #}
{# wf_updated_on: 2017-07-12 #}

# Memahami Resource Timing {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Penting bagi Anda untuk memahami fase tempat sumber daya dikumpulkan di jaringan. Ini adalah dasar memperbaiki masalah pemuatan.


### TL;DR {: .hide-from-toc }
- Memahami fase pengaturan waktu sumber daya.
- Mengetahui yang disediakan oleh setiap fase bagi Resource Timing API.
- Mengetahui berbagai indikator masalah kinerja di grafik timeline, seperti rangkaian bilah transparan atau blok hijau besar.


Semua permintaan jaringan dianggap sebagai sumber daya.
Saat diambil melalui jaringan, sumber daya memiliki daur hidup yang diekspresikan dalam bentuk pengaturan waktu sumber daya.
Panel Network menggunakan [Resource Timing API](http://www.w3.org/TR/resource-timing) yang sama, yang tersedia untuk developer aplikasi.

Note: saat menggunakan Resource Timing API dengan sumber daya lintas-sumber, pastikan
bahwa semua sumber daya memiliki header CORS.

Resource Timing API menyediakan tingkat detail yang lengkap tentang setiap waktu aset yang akan diterima.
Fase utama daur hidup permintaan adalah:

* Pengalihan
  * Langsung memulai `startTime`.
  * Jika pengalihan terjadi, `redirectStart` juga dimulai.
  * Jika pengalihan terjadi di akhir fase ini, `redirectEnd` akan diambil.
* Cache Aplikasi
  * Jika cache aplikasi yang memenuhi permintaan, waktu `fetchStart` akan diambil.
* DNS
  * Waktu `domainLookupStart` diambil di awal permintaan DNS.
  * Waktu `domainLookupEnd` diambil di akhir permintaan DNS.
* TCP
  * `connectStart` diambil saat pertama kali terhubung ke server.
  * Jika TLS dan SSL sedang digunakan, `secureConnectionStart` akan dimulai saat handshake dimulai untuk mengamankan koneksi.
  * `connectEnd` diambil saat koneksi ke server selesai.
* Permintaan
  * `requestStart` diambil setelah permintaan sumber daya dikirim ke server.
* Respons
  * `responseStart` adalah waktu saat server pertama kali merespons permintaan.
  * `responseEnd` adalah waktu saat permintaan selesai dan data diambil.

![Diagram Resource Timing API](imgs/resource-timing-api.png)

## Menampilkan di DevTools

Untuk melihat informasi pengaturan waktu penuh untuk entri tertentu di Panel Network, Anda memiliki tiga opsi.

1. Arahkan kursor ke atas grafik pengaturan waktu di bawah kolom timeline. Ini akan menampilkan munculan yang menampilkan data pengaturan waktu penuh.
2. Klik entri mana pun dan buka tab Timing entri tersebut.
3. Gunakan Resource Timing API untuk mengambil data mentah dari JavaScript.

![Informasi Resource Timing](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  Kode ini bisa dijalankan di konsol DevTools.
  Ini akan menggunakan API Network Timing untuk mengambil semua sumber daya.
  Lalu kode ini akan memfilter entri yang mencari yang memiliki nama yang mengandung "syle.css".
  Jika ditemukan, ini akan dikembalikan.
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
</code>
</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Entri Resource Timing">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>Queuing</strong></dt>
  <dd>
    Permintaan yang masuk antrean menunjukkan bahwa:
 <ul>
        <li>
        Permintaan ditunda oleh mesin rendering karena prioritasnya dianggap lebih rendah daripada sumber daya kritis (misalnya skrip/gaya).
        Ini sering terjadi pada gambar.
 </li>
        <li>
        Permintaan ditangguhkan untuk menunggu soket TCP yang tidak tersedia yang akan segera dibebaskan.
        </li>
        <li>
        Permintaan ditangguhkan karena browser hanya mengizinkan <a href="https://crbug.com/12066">enam koneksi TCP</a> per asalnya di HTTP 1.
 </li>
        <li>
        Waktu yang dihabiskan untuk membuat entri cache disk (biasanya sangat cepat.)
 </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> Stalled/Blocking</strong></dt>
  <dd>
    Waktu yang dihabiskan oleh permintaan untuk menunggu sebelum bisa dikirimkan.
    Permintaan bisa menunggu karena alasan apa pun yang dijelaskan untuk Mengantre.
    Selain itu, waktu ini termasuk waktu apa pun yang dihabiskan saat negosiasi proxy.
 </dd>

  <dt class="proxy-negotiation"><strong> Proxy Negotiation</strong></dt>
  <dd>Waktu yang dihabiskan untuk bernegosiasi dengan koneksi server proxy.</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> Lookup</strong></dt>
  <dd>
    Waktu yang dihabiskan untuk melakukan pencarian DNS.
    Setiap domain baru pada laman memerlukan perjalanan bolak-balik penuh untuk melakukan pencarian DNS.
 </dd>

  <dt class="initial-connection"><strong> Initial Connection / Connecting</strong></dt>
  <dd>Waktu yang diperlukan untuk membuat koneksi, termasuk handshake/percobaan <abbr title="Transmission Control Protocol">TCP</abbr> dan menegosiasikan <abbr title="Secure Sockets Layer">SSL</abbr>.</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>Waktu yang dihabiskan untuk melakukan handshake SSL.</dd>

  <dt class="request-sent"><strong> Request Sent / Sending</strong></dt>
  <dd>
    Waktu yang dihabiskan untuk menerbitkan permintaan jaringan.
    Biasanya sepersekian milidetik.
  </dd>

  <dt class="ttfb"><strong> Waiting (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    Waktu yang dihabiskan untuk respons awal, atau dikenal sebagai Time To First Byte.
    Waktu ini merekam latensi perjalanan bolak-balik ke server, di samping waktu yang dihabiskan untuk menunggu server mengirimkan respons.
  </dd>

  <dt class="content-download"><strong> Content Download / Downloading</strong></dt>
  <dd>Waktu yang dihabiskan untuk menerima data respons.</dd>
</dl>


## Mendiagnosis Masalah Jaringan

Ada beragam kemungkinan masalah yang dapat diungkap melalui Network Panel.
Untuk menemukan masalah seperti ini memerlukan pemahaman yang baik tentang cara klien dan server berkomunikasi dan batasan yang diterapkan oleh protokol.

### Rangkaian yang Mengantre atau Tertahan

Masalah yang paling umum adalah serangkaian item yang mengantre atau tertahan.
Ini menunjukkan bahwa terlalu banyak sumber daya yang sedang diambil dari satu domain.
Di koneksi HTTP 1.0/1.1, Chrome menerapkan maksimum enam koneksi TCP per host.
Jika Anda meminta dua belas item sekaligus, enam permintaan pertama akan dimulai dan enam yang terakhir akan diantrekan.
Setelah salah satu dari enam permintaan pertama selesai, item pertama di antrean akan mulai proses permintaannya.

![Rangkaian permintaan tertahan](imgs/stalled-request-series.png)

Untuk memperbaiki masalah ini untuk lalu lintas HTTP 1, Anda perlu mengimplementasikan [domain sharding](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/).
Artinya, membuat beberapa subdomain di aplikasi Anda agar menyajikan sumber daya.
Lalu pecah sumber daya agar disajikan secara merata di semua subdomain.

Solusi untuk koneksi HTTP 1 **tidak** tidak berlaku untuk koneksi HTTP 2.
Sebaliknya, ini akan berdampak negatif. Jika Anda menerapkan HTTP 2, jangan lakukan domain sharding pada sumber daya karena ini bertentangan dengan rancangan operasi HTTP 2.
Pada HTTP 2, ada satu koneksi TCP ke server yang berfungsi sebagai koneksi multipleks.
Ini menghapus batas enam koneksi pada HTTP 1 dan beberapa sumber daya bisa ditransfer melalui satu koneksi secara bersamaan.

### Time to First Byte Lambat

<small>Alias: banyak sekali warna hijau</small>

![Indikator TTFB Tinggi](imgs/indicator-of-high-ttfb.png)

Time to first byte (TTFB) yang lambat ditandai oleh waktu tunggu yang tinggi.
Waktu tunggu sebaiknya [kurang dari 200 md](/speed/docs/insights/Server).
TTFB yang tinggi menunjukkan salah satu dari dua masalah utama. Gunakan salah satu cara berikut:

1. Kondisi jaringan antara klien dan server buruk, atau
2. Respons aplikasi server yang lambat

Untuk mengatasi TTFB yang tinggi, kurangi sebanyak mungkin jaringan.
Idealnya, host aplikasi secara lokal dan lihat jika masih terjadi TTFB tinggi.
Jika demikian, artinya aplikasi perlu dioptimalkan agar kecepatan respons membaik.
Ini bisa berarti mengoptimalkan kueri database, mengimplementasikan cache untuk beberapa bagian materi, atau mengubah konfigurasi server web Anda.
Ada banyak alasan mengapa backend menjadi lambat.
Anda harus meneliti perangkat lunak Anda dan mencari tahu apa yang tidak memenuhi anggaran kinerja Anda.

Jika TTFB rendah di lokal, artinya masalahnya terletak di jaringan antara klien dan server.
Pelintasan jaringan bisa dihambat oleh berbagai hal.
Ada begitu banyak titik antara klien dan server, dan setiap titik ini memiliki batasan koneksi dan bisa menyebabkan masalah.
Metode paling sederhana untuk menguji cara menguranginya adalah menempatkan aplikasi Anda di host lain dan lihat apakah TTFB membaik.

### Mencapai kapasitas throughput

<small>Alias: banyak sekali biru</small>

![Indikator kapasitas throughput](imgs/indicator-of-large-content.png)

Jika Anda melihat banyak waktu dihabiskan di fase Content Download, meningkatkan respons server atau melakukan penyatuan tidak akan membantu.
Solusi utamanya adalah mengirimkan byte lebih sedikit.


{# wf_devsite_translation #}
