project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pastikan Anda mendapatkan kinerja terbaik dari penerapan pekerja layanan.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Pekerja layanan berkinerja tinggi memuat {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Menambahkan [pekerja
layanan](/web/fundamentals/getting-started/primers/service-workers) ke aplikasi
web web◉bisa menawarkan manfaat kinerja signifikan, web◉bisa menawarkan manfaat kinerja signifikan
meskipun mengikuti semua [praktik terbaik caching browser
tradisional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching).
Tetapi ada beberapa praktik terbaik yang harus diikuti untuk mengoptimalkan waktu
muat Anda. Kiat berikut akan membantu Anda mendapatkan kinerja terbaik dari
penerapan pekerja layanan.

## Pertama, apa itu permintaan navigasi?

Permintaan navigasi (secara singkat) didefinisikan dalam spesifikasi [Fetch
](https://fetch.spec.whatwg.org/#navigation-request) sebagai: <em>
Permintaan [navigasi](https://fetch.spec.whatwg.org/#concept-request) adalah
permintaan yang
[tujuannya](https://fetch.spec.whatwg.org/#concept-request-destination) adalah
"<code>document</code>".</em> Meski secara teknik benar, definisi itu k
nuansa, dan menjual murah pentingnya navigasi di kinerja aplikasi
web. Dalam bahasa sehari-hari, permintaan navigasi terjadi setiap kali Anda memasukkan
URL di bilah lokasi browser, berinteraksi dengan
<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code>,
atau mengunjungi tautan dari satu halaman web ke halaman lain. Menempatkan `<iframe>`
di halaman juga akan mengarah kepada permintaan navigasi untuk `<iframe>` `src`.

Note: [Aplikasi satu halaman](https://en.wikipedia.org/wiki/Single-page_application),
mengandalkan [API Histori](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
dan modifikasi DOM di tempat, cenderung menghindari permintaan navigasi saat beralih
dari tampilan ke tampilan. Tetapi permintaan awal di sesi browser untuk
aplikasi satu halaman masih navigasi.

Saat aplikasi web mungkin membuat banyak permintaan [subsumber daya
lain](https://fetch.spec.whatwg.org/#subresource-request) untuk
menampilkan semua kontennya—untuk elemen seperti skrip, gambar, atau gaya—ini
HTML dalam respons navigasi yang bertanggung jawab atas memulai semua
permintaan lain. Setiap penundaan respons permintaan awal navigasi akan
sangat jelas bagi pengguna Anda, karena mereka dibiarkan menatap layar kosong selama
periode waktu yang tidak ditentukan.

Note: [Push server HTTP/2](/web/fundamentals/performance/http2/#server_push)
menambahkan metode di sini, karena memungkinkan respons subsumber daya dikembalikan tanpa
latensi tambahan, sepanjang respons navigasi. Tetapi setiap penundaan dalam
dalam membuat server jarak jauh juga akan menyebabkan penundaan
data yang didorong ke klien.

Praktik [terbaik caching
tradisional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page),
jenis yang bergantung pada header `Cache-Control` HTTP dan bukan pekerja layanan,
harus [membuka jaringan setiap
navigasi](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses),
untuk memastikan semua URL subsumber daya segar. Keinginan kinerja
web adalah mendapatkan semua manfaat subsumber daya yang di-cache secara agresif,
*tanpa* mengharuskan permintaan navigasi yang bergantung pada jaringan. Dengan
pekerja layanan yang dikonfigurasi dengan benar disesuaikan dengan arsitektur
khusus situs Anda, yang sekarang memungkinkan.

## Untuk kinerja terbaik, pintas jaringan untuk navigasi

Dampak terbesar menambahkan pekerja layanan ke aplikasi web berasal dari
merespons permintaan navigasi tanpa menunggu jaringan.
Skenario-kasus-terbaik untuk terhubung ke server web kemungkinan akan menerima perintah
magnitudo lebih lama dari yang diperlukan untuk membaca data yang di-cache secara lokal. Dalam skenario
di mana koneksi klien kurang ideal—pada dasarnya, apa pun di jaringan
seluler—jumlah waktu yang diperlukan untuk mengembalikan byte data pertama dari
jaringan dapat dengan mudah melebihi total waktu yang diperlukan untuk memproses HTML
lengkap.

Dengan memilih penerapan pekerja layanan cache pertama yang benar sangat bergantung pada
arsitektur situs Anda.

### Streaming respons gabungan

Jika HTML dapat dipecah menjadi bagian kecil secara alami, dengan header
dan footer statis bersama dengan bagian tengah yang bervariasi tergantung pada URL permintaan,
navigasi penanganan menggunakan respons yang di-stream sudah ideal. Anda bisa menyusun
respons dari setiap bagian yang di-cache secara terpisah. Dengan
stream memastikan bahwa bagian awal dari respons adalah terekspos ke
klien secepat mungkin, sehingga penguraian HTML lebih cepat diberikan dan
permintaan subsumber daya tambahan dilakukan.

Artikel "[Stream Jalan Anda Menuju Respons Langsung](/web/updates/2016/06/sw-readablestreams)"
memberikan gambaran dasar pendekatan ini, tetapi untuk contoh
dan demo nyata, "[2016 - tahunnya stream web](https://jakearchibald.com/2016/streams-ftw/) Jake Archibald"
adalah panduan pasti.

Note: Untuk beberapa aplikasi web, tidak ada yang menghindari jaringan saat merespons
permintaan navigasi. Mungkin HTML untuk setiap URL di situs tergantung pada data
dari sistem pengelolaan konten, atau mungkin situs Anda menggunakan tata letak yang bervariasi dan
tidak cocok dengan struktur shell aplikasi yang umum. Pekerja layanan masih
membuka pintu untuk peningkatan atas *status quo* untuk memuat HTML.
Dengan stream, Anda bisa merespons permintaan navigasi segera dengan
sebagian HTML biasa yang di-cache—mungkin situs Anda penuh `<head>` dan beberapa elemen
`<body>` awal—saat masih memuat sisa HTML, khusus untuk
URL yang diberikan, dari jaringan.

### Menyimpan cache HTML statis

Jika Anda punya aplikasi web sederhana yang sepenuhnya bergantung pada dokumen
HTML statis, maka Anda beruntung: lokasi untuk menghindari jaringan
mudah. Anda memerlukan pekerja layanan yang merespons navigasi dengan
HTML yang sebelumnya disimpan di cache, dan itu juga termasuk logika non-pengeblokan untuk terus memperbarui
HTML itu saat situs Anda berkembang.

Satu pendekatan adalah menggunakan pengendali `fetch` pekerja layanan yang menerapkan
[kebijakan stale-while-revalidate](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
untuk permintaan navigasi, seperti ini:

```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

Pendekatan lain yaitu menggunakan alat seperti [Workbox](https://workboxjs.org/), yang
terhubung ke proses build aplikasi web untuk menghasilkan pekerja layanan yang
menangani penyimpanan cache semua sumber daya statis (bukan hanya dokumen HTML), memberikan
cache-pertama ke semua sumber daya ini, dan memperbarui sumber daya ini.

### Menggunakan Shell Aplikasi

Jika Anda memiliki aplikasi halaman tunggal yang ada,
[arsitektur shell aplikasi](/web/fundamentals/architecture/app-shell)
mudah diterapkan. Ada strategi jelas untuk menangani
permintaan navigasi tanpa mengandalkan jaringan: setiap permintaan navigasi,
terlepas dari URL tertentu, dipenuhi dengan salinan yang di-cache dari
"shell" umum dalam dokumen HTML. Shell ini mencakup semua yang diperlukan untuk mem-boot
aplikasi satu halaman, dan logika perutetan sisi klien bisa merender
konten khusus URL permintaan.

Dengan ditulis tangan, pengendali pekerja layanan `fetch` yang sesuai akan terlihat
sesuatu seperti:

```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

[Workbox](https://workboxjs.org/) juga bisa membantu di sini, baik dengan memastikan
`app-shell.html` disimpan di cache dan diperbarui, juga memberikan
[penunjang](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)
untuk merespons permintaan navigasi dengan shell yang di-cache.

## ⚠️ Gotcha kinerja

Jika Anda tidak bisa merespons navigasi dengan data yang disimpan di cache, tetapi Anda memerlukan pekerja
layanan untuk fungsionalitas lain—seperti menyediakan
[konten fallback offline](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback),
atau [menangani notifikasi push](/web/fundamentals/getting-started/codelabs/push-notifications/)
—berarti Anda dalam situasi aneh. Jika Anda tidak melakukan tindakan pencegahan tertentu,
turunnya kinerja dapat Anda alami saat menyertakan pekerja layanan.
Tetapi dengan menghindari gotcha ini, dasar Anda akan kuat.

### Jangan pernah menggunakan pengendali fetch "passthrough"

Jika Anda menggunakan pekerja layanan hanya untuk notifikasi push, Anda mungkin
secara keliru berpikir bahwa hal berikut diperlukan, atau hanya akan diperlakukan
sebagai tanpa-op:

```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

Tipe pengendali fetch "passthrough" ini berbahaya, karena semuanya akan
terus bekerja di aplikasi web, tetapi latensi
kecil akan terjadi setiap kali permintaan jaringan dibuat. Tetapi ada biaya tambahan dalam
memulai pekerja layanan jika ini belum berjalan, dan ada juga
biaya tambahan dalam meneruskan respons dari pekerja layanan ke klien yang membuat
permintaan itu.

Jika pekerja layanan tidak berisi `fetch` pengendali sama sekali, beberapa browser
akan membuat catatan tentang itu dan [tidak ragu-ragu memulai pekerja
layanan](https://github.com/w3c/ServiceWorker/issues/718) setiap kali ada
permintaan layanan.

### Gunakan pramuat navigasi jika diperlukan

Ada beberapa skenario di mana Anda *memerlukan* `fetch` pengendali untuk menggunakan strategi
penyimpanan cache untuk subsumber data tertentu, tetapi arsitektur Anda membuatnya tidak mungkin
merespons permintaan navigasi. Atau, Anda mungkin tidak masalah jika
menggunakan data yang disimpan di cache sebagai respons navigasi, tetapi Anda masih ingin membuat
permintaan jaringan agar data baru ditukar setelah halaman memuat.

Fitur yang dikenal sebagai
[Pramuat Navigasi](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)
relevan untuk kedua kasus penggunaan itu. Fitur ini bisa mengurangi keterlambatan yang mungkin disebabkan oleh
pekerja layanan yang tidak merespons navigasi. Fitur ini
juga bisa digunakan untuk permintaan "out of band" data baru yang bisa
digunakan oleh kode sisi klien setelah halaman memuat. Terdapat semua detail dalam artikel
"[Mempercepat Pekerja Layanan dengan Pramuat Navigasi](/web/updates/2017/02/navigation-preload)"
yang Anda perlukan untuk mengonfigurasi pekerja layanan
dengan sesuai.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
