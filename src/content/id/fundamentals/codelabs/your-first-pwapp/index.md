project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# Progressive Web App Anda yang Pertama {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## Pendahuluan

### Apa yang membuat aplikasi web, Aplikasi Web Progresif?

Aplikasi Web Progresif menyediakan pengalaman yang dapat diinstal dan seperti aplikasi di desktop dan seluler yang dibangun dan dikirim langsung melalui web. Itu adalah aplikasi web yang cepat dan andal. Dan yang paling penting, mereka adalah aplikasi web yang berfungsi di browser apa pun. Jika Anda membuat aplikasi web hari ini, Anda sudah berada di jalur untuk membangun Aplikasi Web Progresif.

#### Cepat &amp; Andal

Setiap pengalaman web harus cepat, dan ini terutama berlaku untuk Aplikasi Web Progresif. Cepat mengacu pada waktu yang diperlukan untuk mendapatkan konten yang berarti di layar, dan memberikan pengalaman interaktif dalam waktu kurang dari 5 detik.

Dan, itu harus sangat cepat. Sulit untuk menekankan seberapa jauh kinerja yang andal lebih baik. Pikirkan seperti ini: beban pertama aplikasi asli membuat frustrasi. Ini dilindungi oleh toko aplikasi dan unduhan besar, tetapi begitu Anda sampai pada titik di mana aplikasi diinstal, biaya di muka diamortisasi di semua mulai aplikasi, dan tidak ada yang mulai memiliki penundaan variabel. Setiap permulaan aplikasi secepat yang terakhir, tidak ada perbedaan. Aplikasi Web Progresif harus memberikan kinerja andal yang diharapkan pengguna dari pengalaman apa pun yang diinstal.

#### Installability

Aplikasi Web Progresif dapat berjalan di tab browser, tetapi juga dapat diinstal. Memberi bookmark pada sebuah situs hanya menambahkan pintasan, tetapi Aplikasi Web Progresif yang terinstal terlihat dan berperilaku seperti semua aplikasi lain yang diinstal. Ini diluncurkan dari tempat yang sama dengan peluncuran aplikasi lain. Anda dapat mengontrol pengalaman peluncuran, termasuk layar splash yang disesuaikan, ikon dan banyak lagi. Ini berjalan sebagai aplikasi, di jendela aplikasi tanpa bilah alamat atau UI browser lainnya. Dan seperti semua aplikasi terpasang lainnya, ini adalah aplikasi tingkat atas di pengalih tugas.

Ingat, penting bahwa PWA yang dapat diinstal cepat dan dapat diandalkan. Pengguna yang memasang PWA berharap aplikasi mereka berfungsi, tidak peduli apa pun koneksi jaringannya. Ini harapan dasar yang harus dipenuhi oleh setiap aplikasi yang diinstal.

#### Mobile &amp; Desktop

Dengan menggunakan teknik desain responsif, Aplikasi Web Progresif bekerja pada desktop __and__ seluler, menggunakan basis kode tunggal antar platform. Jika Anda mempertimbangkan untuk menulis aplikasi asli, lihat manfaat yang ditawarkan PWA.

### Apa yang akan Anda bangun

Dalam codelab ini, Anda akan membuat aplikasi web cuaca menggunakan teknik Aplikasi Web Progresif. Aplikasi Anda akan:

* Gunakan desain responsif, sehingga berfungsi di desktop atau seluler.
* Jadilah cepat, menggunakan pekerja layanan untuk melakukan precache sumber daya aplikasi (HTML, CSS, JavaScript, gambar) yang diperlukan untuk menjalankan, dan cache data cuaca saat runtime untuk meningkatkan kinerja.
* Dapat diinstal, menggunakan manifes aplikasi web dan acara `beforeinstallprompt` untuk memberi tahu pengguna bahwa itu dapat diinstal.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: Untuk menyederhanakan codelab ini, dan menjelaskan dasar-dasar pemberian pengalaman offline, kami menggunakan JavaScript vanilla. Dalam aplikasi produksi, kami sangat menyarankan menggunakan alat-alat seperti [Workbox](/web/tools/workbox/) untuk membangun pekerja layanan Anda. Ini menghilangkan banyak ujung tajam dan sudut gelap yang mungkin Anda temui.

### Apa yang akan Anda pelajari

* Cara membuat dan menambahkan manifes aplikasi web
* Cara memberikan pengalaman offline yang sederhana
* Cara memberikan pengalaman offline penuh
* Cara membuat aplikasi Anda dapat diinstal

Codelab ini difokuskan pada Aplikasi Web Progresif. Konsep dan blok kode yang tidak relevan dipoles dan disediakan bagi Anda untuk hanya menyalin dan menempel.

### Yang Anda butuhkan

* Versi terbaru dari Chrome (74 atau lebih baru) PWA hanyalah aplikasi web, dan berfungsi di semua browser, tetapi kami akan menggunakan beberapa fitur Chrome DevTools untuk lebih memahami apa yang terjadi di tingkat browser, dan menggunakannya untuk uji pengalaman instal.
* Pengetahuan tentang HTML, CSS, JavaScript, dan [Chrome DevTools](https://developer.chrome.com/devtools) .

## Mempersiapkan

### Dapatkan kunci untuk API Langit Gelap

Data cuaca kami berasal dari [Dark Sky API](https://darksky.net/dev) . Untuk menggunakannya, Anda harus meminta kunci API. Mudah digunakan, dan gratis untuk proyek non-komersial.

[Register for API Key](https://darksky.net/dev/register)

Note: Anda masih dapat menyelesaikan codelab ini tanpa kunci API Dark Sky. Jika server kami tidak dapat memperoleh data nyata dari Dark Sky API, itu akan mengembalikan data palsu.

#### Pastikan kunci API Anda berfungsi dengan benar

Untuk menguji apakah Kunci API Anda berfungsi dengan benar, buat permintaan HTTP ke API DarkSky. Perbarui URL di bawah ini untuk mengganti `DARKSKY_API_KEY` dengan kunci API Anda. Jika semuanya berfungsi, Anda akan melihat ramalan cuaca terbaru untuk Kota New York.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### Dapatkan kodenya

Kami telah memasukkan semua yang Anda butuhkan untuk proyek ini ke dalam repo Git. Untuk memulai, Anda harus mengambil kode dan membukanya di lingkungan pengembang favorit Anda. Untuk codelab ini, kami sarankan menggunakan Glitch.

#### Sangat Dianjurkan: Gunakan Glitch untuk mengimpor repo

Menggunakan Glitch adalah metode yang disarankan untuk bekerja melalui codelab ini.

1. Buka tab browser baru dan pergi ke [https://glitch.com](https://glitch.com) .
2. Jika Anda tidak memiliki akun, Anda harus mendaftar.
3. Klik __New Project__, lalu __Klik dari Git Repo .__
4. Klon __https: //github.com/googlecodelabs/your-first-pwapp.git__ dan klik OK.
5. Setelah repo dimuat, edit file `.env` , dan perbarui dengan kunci API DarkSky Anda. 6. Klik tombol __Tampilkan Live__ untuk melihat PWA dalam aksi.

#### Alternatif: Unduh kode &amp; bekerja secara lokal

Jika Anda ingin mengunduh kode dan bekerja secara lokal, Anda harus memiliki Node versi terbaru, dan pengaturan editor kode dan siap untuk digunakan.

Caution: Jika Anda bekerja secara lokal, beberapa audit Lighthouse tidak akan berlalu, dan instalasi mungkin tidak tersedia karena server lokal tidak menyajikan konten dalam konteks yang aman.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. Buka kemasan file zip yang diunduh.
2. Jalankan `npm install` untuk menginstal dependensi yang diperlukan untuk menjalankan server.
3. Edit `server.js` dan setel kunci API DarkSky Anda.
4. Jalankan `node server.js` untuk memulai server pada port 8000.
5. Buka tab browser ke [http://localhost:8000](http://localhost:8000)

## Menetapkan garis dasar

### Apa titik awal kita?

Titik awal kami adalah aplikasi cuaca dasar yang dirancang untuk codelab ini. Kode ini telah terlalu disederhanakan untuk menunjukkan konsep-konsep dalam codelab ini, dan memiliki sedikit penanganan kesalahan. Jika Anda memilih untuk menggunakan kembali kode ini di aplikasi produksi, pastikan Anda menangani kesalahan dan sepenuhnya menguji semua kode.

Beberapa hal untuk dicoba ...

1. Tambahkan kota baru dengan tombol tambah biru di sudut kanan bawah.
2. Refresh data dengan tombol refresh di sudut kanan atas.
3. Hapus kota menggunakan x di kanan atas setiap kartu kota.
4. Lihat cara kerjanya di desktop dan seluler.
5. Lihat apa yang terjadi ketika Anda offline.
6. Menggunakan panel Jaringan Chrome, lihat apa yang terjadi ketika jaringan dibatasi ke Slow 3G.
7. Tambahkan penundaan ke server perkiraan dengan mengubah `FORECAST_DELAY` di `server.js`

### Audit dengan Mercusuar

[Lighthouse](/web/tools/lighthouse/#devtools) adalah alat yang mudah digunakan untuk membantu meningkatkan kualitas situs dan halaman Anda. Ini memiliki audit untuk kinerja, aksesibilitas, aplikasi web progresif, dan banyak lagi. Setiap audit memiliki dokumen rujukan yang menjelaskan mengapa audit itu penting, serta cara memperbaikinya.

![b112675caafccef0.png](img/b112675caafccef0.png)

Kami akan menggunakan Mercusuar untuk mengaudit aplikasi Cuaca kami, dan memverifikasi perubahan yang telah kami buat.

Note: Anda dapat menjalankan Mercusuar di Chrome DevTools, dari baris perintah, atau sebagai modul Node. Pertimbangkan [adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) ke proses pembuatan Anda untuk memastikan aplikasi web Anda tidak mundur.

### Ayo jalankan Mercusuar

1. Buka proyek Anda di tab baru.
2. Buka Chrome DevTools dan beralih ke tab __Audits__, DevTools menampilkan daftar kategori audit, biarkan semuanya diaktifkan.
3. Klik __Jalankan audit__, setelah 60-90 detik, Lighthouse memberi Anda laporan di halaman tersebut.

### Audit Aplikasi Web Progresif

Kami akan fokus pada hasil audit Aplikasi Web Progresif.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

Dan ada banyak warna merah untuk fokus:

* __❗GAGAL:__ Halaman saat ini tidak merespons dengan 200 ketika offline.
* __❗GAGAL:__ `start_url` tidak merespons dengan 200 ketika offline.
* __❗GAGAL:__ Tidak mendaftarkan pekerja layanan yang mengontrol halaman dan `start_url.`
* __❗GAGAL:__ Manifes aplikasi web tidak memenuhi persyaratan pemasangan.
* __❗GAGAL:__ Tidak dikonfigurasikan untuk layar splash khusus.
* __❗GAGAL:__ Tidak mengatur warna tema address-bar.

Mari kita mulai dan mulai memperbaiki beberapa masalah ini!

## Tambahkan manifes aplikasi web

Pada akhir bagian ini, aplikasi cuaca kami akan melewati audit berikut:

* Manifes aplikasi web tidak memenuhi persyaratan pemasangan.
* Tidak dikonfigurasikan untuk layar splash khusus.
* Tidak mengatur warna tema address-bar.

### Buat manifes aplikasi web

[web app manifest](/web/fundamentals/web-app-manifest) adalah file JSON sederhana yang memberi Anda, pengembang, kemampuan untuk mengontrol bagaimana aplikasi Anda muncul kepada pengguna.

Menggunakan manifes aplikasi web, aplikasi web Anda dapat:

* Beri tahu peramban bahwa Anda ingin aplikasi Anda dibuka di jendela mandiri ( `display` ).
* Tentukan halaman apa yang dibuka saat aplikasi pertama kali diluncurkan ( `start_url` ).
* Tetapkan seperti apa tampilan aplikasi di dok atau peluncur aplikasi ( `short_name` , `icons` ).
* Buat layar splash ( `name` , `icons` , `colors` ).
* Beri tahu browser untuk membuka jendela dalam mode landscape, atau portrait ( `orientation` ).
* Dan [plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

Buat file bernama `public/manifest.json` di proyek Anda dan salin / rekatkan konten berikut:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

Manifes mendukung berbagai ikon, yang ditujukan untuk berbagai ukuran layar. Untuk lab kode ini, kami telah memasukkan beberapa lainnya karena kami membutuhkannya untuk integrasi iOS kami.

Note: Agar dapat dipasang, Chrome mengharuskan Anda memberikan setidaknya ikon 192x192px dan ikon 512x512px. Tapi Anda juga bisa memberikan ukuran lain. Chrome menggunakan ikon yang paling dekat dengan 48dp, misalnya, 96px pada perangkat 2x atau 144px untuk perangkat 3x.

### Tambahkan tautan ke manifes aplikasi web

Selanjutnya, kita perlu memberi tahu browser tentang manifes kita dengan menambahkan `<link rel="manifest"...` ke setiap halaman di aplikasi kita. Tambahkan baris berikut ke elemen `<head>` di file `index.html` Anda.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### Memutar

DevTools menyediakan cara cepat dan mudah untuk memeriksa file `manifest.json` Anda. Buka panel __Manifest__ pada panel __Application__. Jika Anda telah menambahkan informasi manifes dengan benar, Anda dapat melihatnya diurai dan ditampilkan dalam format yang ramah-manusia pada panel ini.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### Tambahkan meta tag &amp; ikon iOS

Safari di iOS tidak mendukung aplikasi web manifest ( [yet](https://webkit.org/status/#specification-web-app-manifest) ), sehingga Anda akan perlu menambahkan [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) ke `<head>` dari Anda `index.html` berkas:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### Bonus: Perbaikan Mercusuar yang mudah

Audit Lighthouse kami menyebutkan beberapa hal lain yang cukup mudah untuk diperbaiki, jadi mari kita selesaikan itu sementara kita di sini.

#### Tetapkan deskripsi meta

Di bawah audit SEO, Lighthouse mencatat bahwa [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; kami dapat ditampilkan dalam hasil pencarian Google. Deskripsi unik berkualitas tinggi dapat menjadikan hasil Anda lebih relevan bagi pengguna pencarian dan dapat meningkatkan lalu lintas pencarian Anda.

Untuk menambahkan deskripsi, tambahkan tag `meta` berikut ke `<head>` dokumen Anda:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### Mengatur warna tema bilah alamat

Dalam audit PWA, Lighthouse mencatat aplikasi kami &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) &quot;. Mereka bilah alamat browser untuk mencocokkan warna merek Anda memberikan pengalaman pengguna yang lebih mendalam.

Untuk mengatur warna tema di ponsel, tambahkan tag `meta` berikut ke `<head>` dokumen Anda:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Verifikasi perubahan dengan Mercusuar

Jalankan Mercusuar lagi (dengan mengklik tanda + di sudut kiri atas panel Audit) dan verifikasi perubahan Anda.

__SEO Audit__

* __✅ LULUS:__ Dokumen memiliki deskripsi meta.

__Audit Aplikasi Web Progresif__

* __❗GAGAL:__ Halaman saat ini tidak merespons dengan 200 ketika offline.
* __❗GAGAL:__ `start_url` tidak merespons dengan 200 ketika offline.
* __❗GAGAL:__ Tidak mendaftarkan pekerja layanan yang mengontrol halaman dan `start_url.`
* __✅ LULUS:__ Manifes aplikasi web memenuhi persyaratan pemasangan.
* __✅ LULUS:__ Dikonfigurasi untuk layar splash khusus.
* __✅ LULUS:__ Mengatur warna tema address-bar.

## Berikan pengalaman offline dasar

Ada harapan dari pengguna bahwa aplikasi yang diinstal akan selalu memiliki pengalaman dasar jika sedang offline. Itulah mengapa sangat penting bagi aplikasi web yang dapat diinstal untuk tidak pernah menampilkan dinosaurus offline Chrome. Pengalaman offline dapat berkisar dari halaman offline yang sederhana, hingga pengalaman hanya baca dengan data yang di-cache sebelumnya, hingga pengalaman offline yang berfungsi penuh yang secara otomatis disinkronkan ketika koneksi jaringan dipulihkan.

Di bagian ini, kita akan menambahkan halaman offline sederhana ke aplikasi cuaca kita. Jika pengguna mencoba memuat aplikasi saat offline, itu akan menampilkan halaman khusus kami, bukan halaman offline khas yang ditampilkan browser. Pada akhir bagian ini, aplikasi cuaca kami akan melewati audit berikut:

* Halaman saat ini tidak merespons dengan 200 ketika offline.
* `start_url` tidak merespons dengan 200 ketika offline.
* Tidak mendaftarkan pekerja layanan yang mengontrol halaman dan `start_url.`

Di bagian selanjutnya, kami akan mengganti halaman offline khusus kami dengan pengalaman offline penuh. Ini akan meningkatkan pengalaman offline, tetapi yang lebih penting, ini akan secara signifikan meningkatkan kinerja kami, karena sebagian besar aset kami (HTML, CSS dan JavaScript) akan disimpan dan disajikan secara lokal, menghilangkan jaringan sebagai potensi hambatan.

### Pekerja layanan untuk menyelamatkan

Jika Anda tidak terbiasa dengan pekerja layanan, Anda bisa mendapatkan pemahaman dasar dengan membaca [Introduction To Service Workers](/web/fundamentals/primers/service-worker/) tentang apa yang dapat mereka lakukan, bagaimana siklus hidup mereka bekerja dan banyak lagi. Setelah Anda menyelesaikan lab kode ini, pastikan untuk memeriksa [Debugging Service Workers code lab](http://goo.gl/jhXCBy) untuk melihat lebih mendalam bagaimana bekerja dengan pekerja layanan.

Fitur yang disediakan melalui pekerja layanan harus dianggap sebagai peningkatan progresif, dan hanya ditambahkan jika didukung oleh browser. Misalnya, dengan pekerja layanan Anda dapat [app shell](/web/fundamentals/architecture/app-shell) -cache [app shell](/web/fundamentals/architecture/app-shell) dan data untuk aplikasi Anda, sehingga itu tersedia bahkan ketika jaringan tidak. Ketika pekerja layanan tidak didukung, kode offline tidak dipanggil, dan pengguna mendapatkan pengalaman dasar. Menggunakan deteksi fitur untuk memberikan peningkatan progresif memiliki sedikit overhead dan tidak akan terputus di browser lama yang tidak mendukung fitur itu.

Warning: Fungsionalitas pekerja layanan hanya tersedia pada halaman yang diakses melalui HTTPS (http: // localhost dan yang setara juga akan berfungsi untuk memfasilitasi pengujian).

### Daftarkan pekerja layanan

Langkah pertama adalah mendaftarkan pekerja layanan. Tambahkan kode berikut ke file `index.html` Anda:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

Kode ini memeriksa untuk melihat apakah API pekerja layanan tersedia, dan jika ya, pekerja layanan di `/service-worker.js` terdaftar setelah halaman tersebut [loaded](/web/fundamentals/primers/service-workers/registration) .

Catatan, pekerja layanan dilayani dari direktori root, bukan dari direktori `/scripts/` . Ini adalah cara termudah untuk mengatur __ `scope` __ dari pekerja layanan Anda. `scope` pekerja layanan menentukan file mana yang dikontrol pekerja layanan, dengan kata lain, dari jalur mana pekerja layanan akan memotong permintaan. `scope` default adalah lokasi file pekerja layanan, dan meluas ke semua direktori di bawah ini. Jadi jika `service-worker.js` terletak di direktori root, pekerja layanan akan mengontrol permintaan dari semua halaman web di domain ini.

### Halaman offline Precache

Pertama, kita perlu memberi tahu pekerja layanan apa yang harus di-cache. Kami telah membuat [offline page](https://your-first-pwa.glitch.me/offline.html) ( `public/offline.html` ) sederhana yang akan kami tampilkan kapan saja tidak ada koneksi jaringan.

Di `service-worker.js` Anda, tambahkan `'/offline.html',` ke array `FILES_TO_CACHE` , hasil akhirnya harus seperti ini:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

Selanjutnya, kita perlu memperbarui acara `install` untuk memberitahu pekerja layanan untuk melakukan pra-cache halaman offline:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: Peristiwa dan siklus hidup pekerja layanan dicakup di bagian selanjutnya.

Acara `install` kami sekarang membuka cache dengan `caches.open()` dan memberikan nama cache. Memberi nama cache memungkinkan kita untuk versi file, atau memisahkan data dari sumber daya yang di-cache sehingga kita dapat dengan mudah memperbarui satu tetapi tidak mempengaruhi yang lain.

Setelah cache terbuka, kita dapat memanggil `cache.addAll()` , yang mengambil daftar URL, mengambilnya dari server dan menambahkan respons ke cache. Perhatikan bahwa `cache.addAll()` akan menolak jika ada permintaan individu yang gagal. Itu berarti Anda dijamin bahwa, jika langkah pemasangan berhasil, cache Anda akan berada dalam kondisi yang konsisten. Tetapi, jika gagal karena suatu alasan, itu akan secara otomatis mencoba lagi saat pekerja layanan memulai.

#### Memutar

Mari kita lihat bagaimana Anda dapat menggunakan DevTools untuk memahami dan men-debug pekerja layanan. Sebelum memuat ulang halaman Anda, buka DevTools, buka panel __Layanan Pekerja__ pada panel __Aplikasi__. Seharusnya terlihat seperti ini:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

Ketika Anda melihat halaman kosong seperti ini, itu berarti bahwa halaman yang sedang terbuka tidak memiliki pekerja layanan terdaftar.

Sekarang, muat ulang halaman Anda. Panel Pekerja Layanan sekarang akan terlihat seperti ini:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

Ketika Anda melihat informasi seperti ini, itu berarti halaman memiliki pekerja layanan yang sedang berjalan.

Di sebelah label Status, ada nomor (*34251* dalam kasus ini), awasi nomor itu saat Anda bekerja dengan pekerja layanan. Ini cara mudah untuk mengetahui apakah pekerja layanan Anda telah diperbarui.

### Bersihkan halaman offline lama

Kami akan menggunakan acara `activate` untuk membersihkan data lama di cache kami. Kode ini memastikan bahwa pekerja layanan Anda memperbarui cache setiap kali ada file shell aplikasi berubah. Agar ini berfungsi, Anda harus menambahkan variabel `CACHE_NAME` di bagian atas file pekerja layanan Anda.

Tambahkan kode berikut ke acara `activate` Anda:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### Memutar

Dengan panel Pekerja Layanan terbuka, segarkan halaman, Anda akan melihat pekerja layanan baru diinstal, dan kenaikan nomor status.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

Pekerja layanan yang diperbarui segera mengambil kendali karena acara `install` kami selesai dengan `self.skipWaiting()` , dan acara `activate` selesai dengan `self.clients.claim()` . Tanpa itu, pekerja layanan lama akan terus mengontrol halaman selama ada tab yang terbuka ke halaman.

### Menangani permintaan jaringan yang gagal

Dan akhirnya, kita perlu menangani acara `fetch` . Kita akan menggunakan [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) . Pekerja layanan pertama-tama akan mencoba mengambil sumber daya dari jaringan, jika gagal, ia akan mengembalikan halaman offline dari cache.

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

Handler `fetch` hanya perlu menangani navigasi halaman, sehingga permintaan lain dapat dibuang dari handler dan akan ditangani secara normal oleh browser. Tetapi, jika permintaan `.mode` adalah `navigate` , gunakan `fetch` untuk mencoba mendapatkan item dari jaringan. Jika gagal, pengendali `catch` membuka cache dengan `caches.open(CACHE_NAME)` dan menggunakan `cache.match('offline.html')` untuk mendapatkan halaman offline yang didahului. Hasilnya kemudian diteruskan kembali ke browser menggunakan `evt.respondWith()` .

Key Point: Membungkus panggilan `fetch` di [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) mencegah penanganan peramban bawaan bawaan dan memberi tahu peramban bahwa kami ingin menangani sendiri responsnya. Jika Anda tidak memanggil `evt.respondWith()` di dalam pengendali `fetch` , Anda hanya akan mendapatkan perilaku jaringan default.
</aside>

#### Memutar

Mari kita periksa untuk memastikan semuanya berfungsi seperti yang kita harapkan. Dengan panel Pekerja Layanan terbuka, segarkan halaman, Anda akan melihat pekerja layanan baru diinstal, dan kenaikan nomor status.

Kami juga dapat memeriksa untuk melihat apa yang telah di-cache. Buka panel __Cache Storage__ pada panel __Application__ dari DevTools. Klik kanan __Cache Storage__, pilih __Refresh Caches__, perluas bagian dan Anda akan melihat nama cache statis Anda tercantum di sisi kiri. Mengklik pada nama cache menunjukkan semua file yang di-cache.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

Sekarang, mari kita coba mode offline. Kembali ke panel __Service Workers__ dari DevTools dan centang kotak centang __Offline__. Setelah memeriksanya, Anda akan melihat ikon peringatan kuning kecil di sebelah tab panel __Network__. Ini menunjukkan bahwa Anda sedang luring.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

Muat ulang halaman Anda dan ... berfungsi! Kami mendapatkan panda offline __our__, alih-alih dino offline Chrome!

### Kiat untuk pekerja layanan pengujian

Pekerja layanan debug bisa menjadi tantangan, dan ketika itu melibatkan caching, hal-hal bisa menjadi lebih dari mimpi buruk jika cache tidak diperbarui ketika Anda mengharapkannya. Antara siklus pekerja pekerja biasa dan bug dalam kode Anda, Anda mungkin menjadi cepat frustrasi. __Tapi jangan .__

#### Gunakan DevTools

Di panel Pekerja Layanan dari panel Aplikasi, ada beberapa kotak centang yang akan membuat hidup Anda lebih mudah.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - Ketika dicentang mensimulasikan pengalaman offline dan mencegah permintaan untuk pergi ke jaringan.
* __Perbarui pada reload__ - Ketika dicentang akan mendapatkan pekerja layanan terbaru, instal, dan segera aktifkan.
* __Bypass untuk jaringan__ - Ketika permintaan yang dicentang memotong pekerja layanan dan dikirim langsung ke jaringan.

#### Mulai Segar

Dalam beberapa kasus, Anda mungkin menemukan diri Anda memuat data cache atau bahwa hal-hal tidak diperbarui seperti yang Anda harapkan. Untuk menghapus semua data yang disimpan (penyimpanan lokal, data diindeksDB, file cache) dan menghapus semua pekerja layanan, gunakan panel Hapus penyimpanan di tab aplikasi. Atau, Anda juga bisa bekerja di jendela Penyamaran.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

Kiat tambahan:

* Setelah seorang pekerja layanan telah tidak terdaftar, ia mungkin tetap terdaftar sampai jendela browser yang berisi ditutup.
* Jika beberapa jendela ke aplikasi Anda terbuka, pekerja layanan baru tidak akan berlaku sampai semua jendela dimuat ulang dan diperbarui ke pekerja layanan terbaru.
* Membatalkan pendaftaran pekerja layanan tidak menghapus cache!
* Jika seorang pekerja layanan ada dan seorang pekerja layanan baru terdaftar, pekerja layanan baru tidak akan mengambil kendali sampai halaman dimuat kembali, kecuali jika Anda [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) .

### Verifikasi perubahan dengan Mercusuar

Jalankan Mercusuar lagi dan verifikasi perubahan Anda. Jangan lupa untuk menghapus centang pada kotak centang Offline sebelum Anda memverifikasi perubahan Anda!

__SEO Audit__

* __✅ LULUS:__ Dokumen memiliki deskripsi meta.

__Audit Aplikasi Web Progresif__

* __✅ LULUS:__ Halaman saat ini merespons dengan 200 ketika offline.
* __✅ LULUS:__ `start_url` merespons dengan 200 ketika offline.
* __✅ LULUS:__ Mendaftarkan pekerja layanan yang mengontrol halaman dan `start_url.`
* __✅ LULUS:__ Manifes aplikasi web memenuhi persyaratan pemasangan.
* __✅ LULUS:__ Dikonfigurasi untuk layar splash khusus.
* __✅ LULUS:__ Mengatur warna tema address-bar.

## Berikan pengalaman offline penuh

Luangkan waktu sejenak dan letakkan ponsel Anda dalam mode pesawat, dan coba jalankan beberapa aplikasi favorit Anda. Dalam hampir semua kasus, mereka memberikan pengalaman offline yang cukup kuat. Pengguna mengharapkan pengalaman yang kuat dari aplikasi mereka. Dan web seharusnya tidak berbeda. Aplikasi Web Progresif harus dirancang dengan offline sebagai skenario inti.

Key Point: Merancang untuk offline-pertama dapat secara drastis meningkatkan kinerja aplikasi web Anda dengan mengurangi jumlah permintaan jaringan yang dibuat oleh aplikasi Anda, alih-alih sumber daya dapat diberlakukan dan disajikan langsung dari cache lokal. Bahkan dengan koneksi jaringan tercepat, melayani dari cache lokal akan lebih cepat!

### Daur hidup pekerja layanan

Siklus hidup pekerja layanan adalah bagian yang paling rumit. Jika Anda tidak tahu apa yang ia coba lakukan dan apa manfaatnya, itu bisa terasa seperti melawan Anda. Tetapi begitu Anda tahu cara kerjanya, Anda dapat memberikan pembaruan yang mulus dan mencolok kepada pengguna, memadukan yang terbaik dari web dan pola asli.

Key Point: Codelab ini hanya mencakup dasar-dasar siklus hidup pekerja layanan. Untuk menyelam lebih dalam, lihat [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) artikel tentang WebFundamentals.

Acara #### `install`

Acara pertama yang didapatkan oleh pekerja layanan adalah `install` . Ini dipicu segera setelah pekerja dieksekusi, dan itu hanya dipanggil sekali per pekerja layanan. __Jika Anda mengubah skrip pekerja layanan Anda, browser menganggapnya sebagai pekerja layanan yang berbeda__, dan itu akan mendapatkan acara `install` sendiri.

![72ed77b1720512da.png](img/72ed77b1720512da.png)

Biasanya acara `install` digunakan untuk menyimpan semua yang Anda butuhkan agar aplikasi berjalan.

Acara #### `activate`

Pekerja layanan akan menerima acara `activate` setiap kali dimulai. Tujuan utama acara `activate` adalah untuk mengonfigurasi perilaku pekerja layanan, membersihkan semua sumber daya yang tertinggal dari proses sebelumnya (misalnya cache lama), dan membuat pekerja layanan siap menangani permintaan jaringan (misalnya acara `fetch` yang dijelaskan di bawah).

Acara #### `fetch`

Acara pengambilan memungkinkan pekerja layanan untuk mencegat permintaan jaringan dan menangani permintaan. Itu dapat pergi ke jaringan untuk mendapatkan sumber daya, dapat menariknya dari cache sendiri, menghasilkan respons khusus atau sejumlah opsi yang berbeda. Lihatlah [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) untuk berbagai strategi yang dapat Anda gunakan.

#### Memperbarui pekerja layanan

Peramban memeriksa untuk melihat apakah ada versi baru pekerja layanan Anda pada setiap pemuatan halaman. Jika menemukan versi baru, versi baru diunduh dan diinstal di latar belakang, tetapi tidak diaktifkan. Itu duduk dalam keadaan menunggu, sampai tidak ada lagi halaman yang terbuka yang menggunakan pekerja layanan lama. Setelah semua jendela menggunakan pekerja layanan lama ditutup, pekerja layanan baru diaktifkan dan dapat mengambil kendali. Rujuk ke bagian [Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) dari dokumen Siklus Hidup Pekerja Layanan untuk detail lebih lanjut.

### Memilih strategi caching yang tepat

Memilih [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) tepat tergantung pada jenis sumber daya yang Anda coba cache dan bagaimana Anda mungkin membutuhkannya nanti. Untuk aplikasi cuaca kami, kami akan membagi sumber yang kami butuhkan untuk cache menjadi dua kategori: sumber daya yang ingin kami ambil sebelumnya dan data yang akan kami cache saat runtime.

#### Caching sumber daya statis

Mengkhotbahkan sumber daya Anda adalah konsep yang mirip dengan apa yang terjadi ketika pengguna menginstal aplikasi desktop atau seluler. Sumber daya utama yang diperlukan untuk menjalankan aplikasi diinstal, atau di-cache pada perangkat sehingga dapat dimuat nanti apakah ada koneksi jaringan atau tidak.

Untuk aplikasi kami, kami akan melakukan precut semua sumber daya statis kami ketika pekerja layanan kami diinstal sehingga semua yang kami butuhkan untuk menjalankan aplikasi disimpan di perangkat pengguna. Untuk memastikan aplikasi kami memuat kilat dengan cepat, kami akan menggunakan strategi [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) ; alih-alih pergi ke jaringan untuk mendapatkan sumber daya, mereka malah ditarik dari cache lokal; hanya jika tidak tersedia maka kami akan mencoba mendapatkannya dari jaringan.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

Menarik dari cache lokal menghilangkan segala variabilitas jaringan. Tidak peduli apa pun jenis jaringan yang digunakan pengguna (WiFi, 5G, 3G, atau bahkan 2G), sumber daya utama yang perlu kita jalankan tersedia segera.

Caution: Dalam sampel ini, sumber daya statis disajikan menggunakan strategi [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) , yang menghasilkan salinan dari konten yang di-cache dikembalikan tanpa berkonsultasi dengan jaringan. Meskipun strategi `cache-first` mudah diimplementasikan, itu dapat menyebabkan tantangan di masa depan.

#### Caching data aplikasi

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) adalah tipe data tertentu yang ideal dan berfungsi dengan baik untuk aplikasi kami. Ia mendapat data di layar secepat mungkin, lalu memperbarui bahwa setelah jaringan mengembalikan data terbaru. Stale-while -valvalate artinya kita harus memulai dua permintaan asinkron, satu ke cache dan satu ke jaringan.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

Dalam keadaan normal, data yang di-cache akan dikembalikan segera menyediakan aplikasi dengan data terbaru yang dapat digunakan. Kemudian, ketika permintaan jaringan kembali, aplikasi akan diperbarui menggunakan data terbaru dari jaringan.

Untuk aplikasi kami, ini memberikan pengalaman yang lebih baik daripada jaringan, kembali ke strategi cache karena pengguna tidak perlu menunggu sampai permintaan jaringan habis untuk melihat sesuatu di layar. Mereka mungkin awalnya melihat data yang lebih tua, tetapi begitu permintaan jaringan kembali, aplikasi akan diperbarui dengan data terbaru.

### Perbarui logika aplikasi

Seperti yang disebutkan sebelumnya, aplikasi harus memulai dua permintaan asinkron, satu ke cache dan satu ke jaringan. Aplikasi ini menggunakan objek `caches` tersedia di `window` untuk mengakses cache dan mengambil data terbaru. Ini adalah contoh yang sangat baik untuk peningkatan progresif karena objek `caches` mungkin tidak tersedia di semua browser, dan jika tidak, permintaan jaringan tetap berfungsi.

Perbarui fungsi `getForecastFromCache()` , untuk memeriksa apakah objek `caches` tersedia di objek `window` global, dan jika ya, minta data dari cache.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

Kemudian, kita perlu memodifikasi [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) sehingga ia membuat dua panggilan, satu ke `getForecastFromNetwork()` untuk mendapatkan ramalan dari jaringan, dan satu ke `getForecastFromCache()` untuk mendapatkan ramalan cache yang terakhir:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

Aplikasi cuaca kami sekarang membuat dua permintaan data tidak sinkron, satu dari cache dan satu melalui `fetch` . Jika ada data dalam cache, itu akan dikembalikan dan diberikan dengan sangat cepat (puluhan milidetik). Kemudian, ketika `fetch` merespons, kartu akan diperbarui dengan data terbaru langsung dari API cuaca.

Perhatikan bagaimana permintaan cache dan permintaan `fetch` diakhiri dengan panggilan untuk memperbarui kartu perkiraan. Bagaimana aplikasi mengetahui apakah itu menampilkan data terbaru? Ini ditangani dalam kode berikut dari `renderForecast()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

Setiap kali kartu diperbarui, aplikasi menyimpan stempel waktu data pada atribut tersembunyi pada kartu. Aplikasi hanya menebus jika cap waktu yang sudah ada pada kartu lebih baru daripada data yang diteruskan ke fungsi.

### Pre-cache sumber daya aplikasi kami

Di pekerja layanan, mari kita tambahkan `DATA_CACHE_NAME` sehingga kita dapat memisahkan data aplikasi kita dari shell aplikasi. Saat shell aplikasi diperbarui dan cache lama dihapus, data kami akan tetap tak tersentuh, siap untuk memuat yang sangat cepat. Ingat, jika format data Anda berubah di masa mendatang, Anda akan memerlukan cara untuk mengatasinya dan memastikan shell aplikasi dan konten tetap sinkron.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

Jangan lupa juga perbarui `CACHE_NAME` ; kami akan mengubah semua sumber daya statis kami juga.

Agar aplikasi kami dapat bekerja secara offline, kita perlu melakukan precache semua sumber daya yang dibutuhkan. Ini juga akan membantu kinerja kami. Alih-alih harus mendapatkan semua sumber daya dari jaringan, aplikasi akan dapat memuat semuanya dari cache lokal, menghilangkan ketidakstabilan jaringan.

Perbarui array `FILES_TO_CACHE` dengan daftar file:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

Karena kita secara manual membuat daftar file ke cache, setiap kali kita memperbarui file, kita harus memperbarui `CACHE_NAME` . Kami dapat menghapus `offline.html` dari daftar file cache kami karena aplikasi kami sekarang memiliki semua sumber daya yang diperlukan untuk bekerja offline, dan tidak akan pernah menampilkan halaman offline lagi.

Caution: Dalam sampel ini, kami menggulung sendiri pekerja layanan kami. Setiap kali kami memperbarui sumber daya statis apa pun, kami perlu memutar ulang pekerja layanan dan memperbarui cache, jika tidak, konten lama akan disajikan. Selain itu, ketika satu file berubah, seluruh cache tidak valid dan perlu diunduh ulang. Itu berarti memperbaiki kesalahan pengejaan karakter tunggal sederhana akan membuat cache tidak valid dan semuanya harus diunduh lagi — tidak terlalu efisien. [Workbox](/web/tools/workbox/) menangani ini dengan anggun, dengan mengintegrasikannya ke dalam proses build Anda, hanya file yang diubah akan diperbarui, menghemat bandwidth untuk pengguna dan perawatan yang lebih mudah untuk Anda!

#### Memperbarui pengaktif acara yang diaktifkan

Untuk memastikan kami `activate` acara tidak sengaja menghapus data kami, dalam `activate` terjadi `service-worker.js` , ganti `if (key !== CACHE_NAME) {` dengan:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### Perbarui fetch event handler

Kami perlu memodifikasi pekerja layanan untuk mencegat permintaan ke API cuaca dan menyimpan respons mereka di cache, sehingga kami dapat dengan mudah mengaksesnya nanti. Dalam strategi basi-sementara-memvalidasi ulang, kami berharap respons jaringan menjadi &#39;sumber kebenaran&#39;, selalu memberi kami informasi terbaru. Jika tidak bisa, tidak masalah untuk gagal karena kami telah mengambil data cache terbaru di aplikasi kami.

Perbarui pengendali acara `fetch` untuk menangani permintaan ke API data secara terpisah dari permintaan lainnya.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

Kode memotong permintaan dan memeriksa apakah itu untuk ramalan cuaca. Jika ya, gunakan `fetch` untuk mengajukan permintaan. Setelah respons dikembalikan, buka cache, tirukan respons, simpan di cache, dan kembalikan respons ke pemohon semula.

Kami perlu menghapus centang `evt.request.mode !== 'navigate'` karena kami ingin pekerja layanan kami menangani semua permintaan (termasuk gambar, skrip, file CSS, dll), bukan hanya navigasi. Jika kami meninggalkan check-in itu, hanya HTML yang akan disajikan dari cache pekerja layanan, semua yang lain akan diminta dari jaringan.

### Cobalah

Aplikasi harus benar-benar berfungsi offline sekarang. Refresh halaman untuk memastikan Anda mendapatkan pekerja layanan terinstal, kemudian simpan beberapa kota dan tekan tombol refresh pada aplikasi untuk mendapatkan data cuaca segar.

Lalu pergi ke panel __Cache Storage__ pada panel __Application__ dari DevTools. Buka bagian itu dan Anda akan melihat nama cache statis dan cache data Anda tercantum di sebelah kiri. Membuka cache data harus menunjukkan data yang disimpan untuk setiap kota.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

Kemudian, buka DevTools dan beralih ke panel Pekerja Layanan, dan centang kotak centang Offline, lalu coba muat ulang halaman, lalu buka offline dan muat ulang halaman.

Jika Anda berada di jaringan yang cepat dan ingin melihat bagaimana cuaca data diperbarui pada koneksi yang lambat, mengatur `FORECAST_DELAY` properti di `server.js` ke `5000` . Semua permintaan ke API perkiraan akan ditunda hingga 5.000 ms.

### Verifikasi perubahan dengan Mercusuar

Ini juga merupakan ide bagus untuk menjalankan Mercusuar lagi.

__SEO Audit__

* __✅ LULUS:__ Dokumen memiliki deskripsi meta.

__Audit Aplikasi Web Progresif__

* __✅ LULUS:__ Halaman saat ini merespons dengan 200 ketika offline.
* __✅ LULUS:__ `start_url` merespons dengan 200 ketika offline.
* __✅ LULUS:__ Mendaftarkan pekerja layanan yang mengontrol halaman dan `start_url.`
* __✅ LULUS:__ Manifes aplikasi web memenuhi persyaratan pemasangan.
* __✅ LULUS:__ Dikonfigurasi untuk layar splash khusus.
* __✅ LULUS:__ Mengatur warna tema address-bar.

## Tambahkan pengalaman menginstal

Ketika Aplikasi Web Progresif diinstal, ia terlihat dan berperilaku seperti semua aplikasi lain yang diinstal. Ini diluncurkan dari tempat yang sama dengan peluncuran aplikasi lain. Ini berjalan di aplikasi tanpa bilah alamat atau UI browser lainnya. Dan seperti semua aplikasi terpasang lainnya, ini adalah aplikasi tingkat atas di pengalih tugas.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

Di Chrome, Aplikasi Web Progresif dapat dipasang melalui menu konteks tiga titik, atau Anda dapat memberikan tombol atau komponen UI lainnya kepada pengguna yang akan meminta mereka untuk menginstal aplikasi Anda.

Success: Karena pengalaman pemasangan di menu konteks tiga titik Chrome agak terkubur, kami sarankan Anda memberikan beberapa indikasi dalam aplikasi Anda untuk memberi tahu pengguna bahwa aplikasi Anda dapat dipasang, dan tombol instal untuk menyelesaikan proses pemasangan.

### Audit dengan Mercusuar

Agar pengguna dapat menginstal Aplikasi Web Progresif Anda, ia harus memenuhi [certain criteria](/web/fundamentals/app-install-banners/#criteria) . Cara termudah untuk memeriksa adalah menggunakan Mercusuar dan pastikan memenuhi kriteria yang dapat diinstal.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

Jika Anda bekerja melalui codelab ini, PWA Anda harus sudah memenuhi kriteria ini.

Key Point: Untuk bagian ini, aktifkan kotak centang **Bypass untuk jaringan** di panel Pekerja Layanan **dari panel** Aplikasi di DevTools. Ketika dicentang, permintaan memotong pekerja layanan dan dikirim langsung ke jaringan. Ini menyederhanakan proses pengembangan kami karena kami tidak perlu memperbarui pekerja layanan kami saat mengerjakan bagian ini.

### Tambahkan install.js ke index.html

Pertama, mari kita tambahkan `install.js` ke file `index.html` kami.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### Dengarkan acara `beforeinstallprompt`

Jika menambahkan ke layar beranda [criteria](/web/fundamentals/app-install-banners/#criteria) terpenuhi, Chrome akan memecat acara `beforeinstallprompt` , yang dapat Anda gunakan untuk menunjukkan aplikasi Anda dapat &#39;diinstal&#39;, dan kemudian meminta pengguna untuk menginstalnya. Tambahkan kode di bawah ini untuk mendengarkan acara `beforeinstallprompt` :

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### Simpan acara dan tampilkan tombol instal

Dalam fungsi `saveBeforeInstallPromptEvent` kami, kami akan menyimpan referensi ke acara `beforeinstallprompt` sehingga kami dapat memanggil `prompt()` nanti, dan memperbarui UI kami untuk menunjukkan tombol instal.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### Tampilkan prompt / sembunyikan tombol

Ketika pengguna mengklik tombol instal, kita perlu memanggil `.prompt()` pada acara `beforeinstallprompt` disimpan. Kita juga perlu menyembunyikan tombol instal, karena `.prompt()` hanya dapat dipanggil satu kali pada setiap event yang disimpan.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

Memanggil `.prompt()` akan menampilkan dialog modal kepada pengguna, meminta mereka menambahkan aplikasi Anda ke layar beranda.

### Catat hasilnya

Anda dapat memeriksa untuk melihat bagaimana pengguna merespons dialog instal dengan mendengarkan janji yang dikembalikan oleh properti `userChoice` dari acara `beforeinstallprompt` disimpan. Janji mengembalikan objek dengan properti `outcome` setelah prompt ditampilkan dan pengguna meresponsnya.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

Satu komentar tentang `userChoice` , [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) , bukan fungsi seperti yang Anda harapkan.

#### Log semua instal acara

Selain UI apa pun yang Anda tambahkan untuk menginstal aplikasi Anda, pengguna juga dapat menginstal PWA Anda melalui metode lain, misalnya menu tiga titik Chrome. Untuk melacak peristiwa ini, dengarkan acara yang diinstal.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

Kemudian, kita perlu memperbarui fungsi `logAppInstalled` , untuk codelab ini, kita hanya akan menggunakan `console.log` , tetapi dalam aplikasi produksi, Anda mungkin ingin mencatat ini sebagai peristiwa dengan perangkat lunak analitik Anda.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### Perbarui pekerja layanan

Jangan lupa untuk memperbarui `CACHE_NAME` di file `service-worker.js` Anda karena Anda telah membuat perubahan pada file yang sudah di-cache. Mengaktifkan kotak centang __Bypass for network__ di panel Pekerja Layanan dari panel Aplikasi di DevTools akan berfungsi dalam pengembangan, tetapi tidak akan membantu di dunia nyata.

### Cobalah

Mari kita lihat bagaimana langkah instalasi kita. Agar aman, gunakan tombol __Clear site data__ di panel Aplikasi DevTools untuk menghapus semuanya dan pastikan kita mulai baru. Jika sebelumnya Anda menginstal aplikasi, pastikan untuk menghapus instalannya, jika tidak ikon instalasi tidak akan muncul lagi.

#### Pastikan tombol instal terlihat

Pertama, mari kita verifikasi ikon instal kami muncul dengan benar, pastikan untuk mencoba ini di desktop dan seluler.

1. Buka URL di tab Chrome baru.
2. Buka menu tiga titik Chrome (di sebelah bilah alamat).
▢ Pastikan Anda melihat &quot;* Instal Cuaca ... *&quot; di menu.
3. Refresh data cuaca menggunakan tombol refresh di sudut kanan atas untuk memastikan kami memenuhi [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) .
▢ Pastikan ikon instal terlihat di header aplikasi.

#### Verifikasi tombol instal berfungsi

Selanjutnya, mari kita pastikan semuanya terpasang dengan benar, dan acara kami dipecat dengan benar. Anda dapat melakukan ini di desktop atau seluler. Jika Anda ingin menguji ini di ponsel, pastikan Anda menggunakan debugging jarak jauh sehingga Anda dapat melihat apa yang masuk ke konsol.

1. Buka Chrome, dan di tab browser baru, navigasikan ke Weather PWA Anda.
2. Buka DevTools dan alihkan ke panel Console.
3. Klik tombol install di sudut kanan atas.
▢ Verifikasi tombol instal menghilang
▢ Verifikasi dialog instal modal ditampilkan.
4. Klik Batal.
▢ Verifikasi &quot;* Pengguna menolak prompt A2HS *&quot; ditampilkan di output konsol.
▢ Verifikasi tombol instal muncul kembali.
5. Klik tombol install lagi, lalu klik tombol install di dialog modal.
▢ Verifikasi &quot;* Pengguna menerima prompt A2HS *&quot; ditampilkan di output konsol.
▢ Verifikasi &quot;* Aplikasi Cuaca telah dipasang *&quot; ditampilkan di output konsol.
▢ Verifikasi aplikasi Cuaca ditambahkan ke tempat Anda biasanya menemukan aplikasi.
6. Luncurkan PWA Cuaca.
▢ Verifikasi aplikasi terbuka sebagai aplikasi mandiri, baik di jendela aplikasi di desktop, atau layar penuh di ponsel.

Catatan, jika Anda menjalankan pada desktop dari localhost, PWA yang Anda instal dapat menampilkan spanduk alamat karena localhost tidak dianggap sebagai host yang aman.

#### Verifikasi instalasi iOS berfungsi dengan baik

Mari kita juga periksa perilaku di iOS. Jika Anda memiliki perangkat iOS, Anda dapat menggunakannya, atau jika Anda menggunakan Mac, coba iOS Simulator yang tersedia dengan Xcode.

1. Buka Safari dan di tab browser baru, navigasikan ke Weather PWA Anda.
2. Klik *Bagikan*! Tombol [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) .
3. Gulir ke kanan dan klik tombol *Add to Home Screen*.
▢ Pastikan judul, URL, dan ikonnya benar.
4. Klik *Tambah.* ▢ Pastikan ikon aplikasi ditambahkan ke layar beranda.
5. Luncurkan PWA Cuaca dari layar beranda.
▢ Verifikasi aplikasi meluncurkan layar penuh.

### Bonus: Mendeteksi jika aplikasi Anda diluncurkan dari layar beranda

`display-mode` media `display-mode` memungkinkan untuk menerapkan gaya tergantung pada bagaimana aplikasi diluncurkan, atau menentukan bagaimana itu diluncurkan dengan JavaScript.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

Anda juga dapat memeriksa `display-mode` permintaan media dalam [JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) .

### Bonus: Menghapus Instalasi PWA Anda

Ingat, `beforeinstallevent` tidak menyala jika aplikasi sudah diinstal, jadi selama pengembangan Anda mungkin ingin menginstal dan menghapus aplikasi Anda beberapa kali untuk memastikan semuanya berjalan seperti yang diharapkan.

#### Android

Di Android, PWA dihapus instalasinya dengan cara yang sama seperti aplikasi lain yang diinstal dihapus.

* Buka laci aplikasi.
* Gulir ke bawah untuk menemukan ikon Cuaca.
* Seret ikon aplikasi ke atas layar.
* Pilih *Copot pemasangan.*

#### ChromeOS

Di ChromeOS, PWA mudah dihapus dari kotak pencarian peluncur.

* Buka peluncur.
* Ketik &quot;* Cuaca *&quot; di kotak pencarian, PWA Cuaca Anda akan muncul di hasil.
* Klik kanan (alt-klik) pada Weather PWA.
* Klik *Hapus dari Chrome ...*

#### macOS dan Windows

Di Mac dan Windows, PWA harus dihapus instalasinya melalui Chrome.

* Di tab browser baru, buka chrome: // apps.
* Klik kanan (alt-klik) pada Weather PWA.
* Klik *Hapus dari Chrome ...*

## Selamat

Selamat, Anda telah berhasil membangun Aplikasi Web Progresif pertama Anda!

Anda menambahkan manifes aplikasi web agar dapat diinstal, dan Anda menambahkan pekerja layanan untuk memastikan bahwa PWA Anda selalu cepat, dan dapat diandalkan. Anda belajar cara menggunakan DevTools untuk mengaudit aplikasi dan bagaimana hal itu dapat membantu Anda meningkatkan pengalaman pengguna.

Anda sekarang tahu langkah-langkah kunci yang diperlukan untuk mengubah aplikasi web apa pun menjadi Aplikasi Web Progresif.

### Bacaan lebih lanjut

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### Referensi dokumen

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## Menemukan masalah, atau memiliki umpan balik? {: .hide-from-toc }

Bantu kami membuat lab kode kami lebih baik dengan mengirimkan [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) hari ini. Dan terimakasih!

{% include "web/_shared/translation-end.html" %}
