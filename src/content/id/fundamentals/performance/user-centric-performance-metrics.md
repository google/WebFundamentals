project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Metrik Kinerja yang Berfokus pada Pengguna

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-06-01 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Metrik Kinerja yang Berfokus pada Pengguna {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

Anda mungkin kerap mendengar bahwa kinerja itu penting, dan
yang teramat penting adalah bahwa aplikasi web Anda harus cepat.

Tetapi ketika Anda mencoba menjawab pertanyaan: *seberapa cepat aplikasi saya?*, Anda akan menyadari bahwa cepat
adalah istilah yang samar-samar. Apa sebenarnya yang dimaksud dengan kata cepat? Dalam konteks
apa? Dan cepat untuk siapa?

<aside>
  <strong>Note:</strong> Jika Anda lebih suka menonton video daripada membaca artikel,
 saya membahas topik ini di Google I/O 2017 dengan rekan saya
  <a href="https://twitter.com/shubhie">Shubhie Panicker</a>.
</aside>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6Ljq-Jn-EgU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Berbicara tentang kinerja, ketepatan adalah hal yang sangat penting agar kita tidak memunculkan
miskonsepsi atau menyebarkan mitos yang kadang dapat menyebabkan
developer yang sebenarnya memiliki maksud baik justru mengoptimalkan hal-hal yang keliru&mdash;yang pada akhirnya akan membahayakan pengalaman pengguna
dan bukan justru memperbaikinya.

Untuk menawarkan contoh spesifik, saat ini sering kita dengar orang mengatakan sesuatu
seperti: __*Saya menguji aplikasi saya, dan perlu waktu X.XX detik untuk memuatnya*__.

Masalah dengan pernyataan ini *tidak* pada inti bahwa pernyataan itu palsu, tetapi pada inti bahwa
pernyataan ini tidak sesuai dalam merepresentasikan kenyataan. Waktu muat aplikasi sangat berbeda dari satu pengguna ke pengguna yang lain,
tergantung kemampuan perangkat dan kondisi jaringan yang digunakan. Mempresentasikan waktu
muat sebagai angka tunggal akan mengabaikan pengguna yang mengalami waktu muat lebih lama.

Dalam kenyataan, waktu muat aplikasi Anda adalah kumpulan waktu muat dari setiap
pengguna, dan satu-satunya cara untuk merepresentasikannya adalah dengan distribusi
seperti histogram di bawah:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-histogram.png"
       alt="Histogram waktu muat untuk pengunjung situs"/>
</figure>

Angka pada sumbu X menunjukkan waktu muat, dan tinggi batang pada
sumbu Y menunjukkan angka relatif pengguna yang mengalami waktu muat
dalam bucket waktu khusus. Seperti ditampilkan dalam bagan ini, ketika sebagian besar pengguna
mengalami waktu muat kurang dari satu atau dua detik, tidak sedikit dari mereka masih mengalami
waktu muat jauh lebih lama.

Alasan lain mengapa "situs saya dimuat dalam X.XX detik" merupakan mitos adalah bahwa pemuatan bukanlah
momen tunggal&mdash;tetapi merupakan pengalaman bahwa tidak satu pun metrik yang benar-benar mampu menangkap
sepenuhnya. Ada beberapa momen selama pengalaman pemuatan yang bisa memengaruhi
apakah pengguna mempersepsikannya sebagai "cepat", dan jika Anda hanya berfokus pada satu momen saja, Anda mungkin
melewatkan pengalaman buruk yang terjadi selama sisa waktu.

Sebagai contoh, pertimbangkan aplikasi yang mengoptimalkan render awal cepat,
yang mengirimkan konten kepada pengguna dengan segera. Jika aplikasi tersebut memuat bundle
JavaScript besar untuk mem-parse dan mengeksekusinya, konten
di halaman tidak akan interaktif hingga setelah JavaScript tersebut dijalankan. Jika pengguna
bisa melihat link di halaman tersebut tetapi tidak bisa mengkliknya, atau jika ia dapat melihat kotak teks
tapi tidak bisa mengetik di dalamnya, pengguna tersebut mungkin tidak akan tahu seberapa cepat halaman dirender.

Jadi, alih-alih mengukur pemuatan dengan satu metrik saja, sebaiknya kita mengukur
waktu dari setiap momen di semua pengalaman yang bisa berdampak terhadap
*persepsi* pemuatan pengguna.

Contoh kedua mitos kinerja adalah bahwa __*kinerja adalah satu-satunya perhatian
pada waktu muat*__.

Kita sebagai tim telah bersalah karena membuat kekeliruan ini, dan bisa diperbesar oleh
fakta bahwa sebagian besar alat kinerja *hanya* mengukur kinerja pemuatan.

Tetapi kenyataannya kinerja buruk dapat terjadi kapan saja, tidak hanya selama
pemuatan. Aplikasi yang tidak merespons dengan cepat terhadap ketukan atau klik, dan aplikasi yang tidak
ter-scroll atau bergerak dengan lancar bisa sama buruknya dengan aplikasi yang dimuat dengan lambat. Pengguna
sangat memperhatikan seluruh pengalaman, dan kita sebagai developer juga harus demikian.

Tema umum dalam semua miskonsepsi kinerja ini adalah bahwa fokus diberikan pada
hal-hal yang memiliki sedikit atau tidak ada sama sekali dengan pengalaman pengguna. Demikian pula,
metrik kinerja tradisional seperti waktu
[muat](https://developer.mozilla.org/en-US/docs/Web/Events/load) atau waktu
[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
sangat tidak dapat diandalkan, karena ketika hal itu terjadi, mungkin berkaitan atau
mungkin tidak berkaitan dengan saat pengguna berpikir bahwa aplikasi tersebut dimuat.

Dengan demikian, untuk memastikan bahwa kita tidak mengulang kesalahan ini, maka kita harus menjawab pertanyaan-pertanyaan
berikut:

1. Metrik apa yang paling akurat mengukur kinerja seperti yang dirasakan oleh manusia?
2. Bagaimana kita mengukur metrik-metrik ini pada pengguna aktual kita?
3. Bagaimana kita menginterpretasikan pengukuran kita untuk menentukan apakah aplikasi itu "cepat"?
4. Setelah memahami kinerja pengguna nyata aplikasi kita, apa yang harus kita lakukan untuk mencegah terjadinya
  regresi dan berharap bisa meningkatkan kinerja di masa mendatang?

## Metrik kinerja yang berfokus pada Pengguna

Ketika pengguna membuka ke halaman web, mereka biasanya mencari umpan balik
visual untuk meyakinkan mereka bahwa semuanya akan berfungsi seperti yang diharapkan.

<table>
  <tr>
   <td><strong>Apakah terjadi?</strong></td>
   <td>Apakah berhasil terbuka? Apakah server menanggapi?</td>
  </tr>
  <tr>
   <td><strong>Apakah berguna?</strong></td>
   <td>Apakah sudah cukup konten yang dirender bisa disukai oleh pengguna?</td>
  </tr>
  <tr>
   <td><strong>Apakah bisa digunakan?</strong></td>
   <td>Apakah pengguna bisa berinteraksi dengan halaman, atau apakah masih sibuk memuat?</td>
  </tr>
  <tr>
   <td><strong>Apakah menyenangkan?</strong></td>
   <td>Apakah interaksi lancar dan natural, bebas lambat dan tersendat?</td>
  </tr>
</table>

Untuk memahami kapan sebuah halaman mengirimkan umpan balik ini kepada para penggunanya, kami telah mendefinisikan
banyak metrik baru:

### First paint dan first contentful paint

[Paint Timing](https://github.com/WICG/paint-timing) API mendefinisikan dua
metrik: *first paint* (FP) dan *first contentful paint* (FCP). Metrik ini
menandai titik-titik, segera setelah navigasi, ketika browser merender piksel
ke layar. Ini penting bagi pengguna karena menjawab pertanyaan:
*apakah terjadi?*

Perbedaan utama antara kedua metrik adalah bahwa FP menandai titik ketika
browser merender *apa saja* yang secara visual berbeda dari apa yang ada di
layar sebelum navigasi. Sebaliknya, FCP adalah titik ketika browser
merender bit pertama konten dari DOM, yang mungkin berupa teks, gambar, SVG,
atau bahkan elemen `<canvas>`.

### First meaningful paint dan hero element timing

First meaningful paint (FMP) adalah metrik yang menjawab pertanyaan: "apakah
berguna?". Sementara konsep "berguna" sangat sulit ditentukan dengan cara yang
berlaku umum untuk semua halaman web (dan dengan demikian tidak ada ketentuan), cukup
mudah bagi developer web itu sendiri untuk mengetahui bagian apa dari halaman mereka yang akan
paling berguna bagi penggunanya.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-hero-elements.png"
       alt="Contoh hero element pada berbagai situs"/>
</figure>

"Bagian terpenting" dari suatu halaman web sering disebut sebagai *hero
element*. Sebagai contoh, di halaman tontonan YouTube, hero element berupa
video utama. Di Twitter hero element tersebut mungkin berupa badge notifikasi dan tweet
pertama. Di aplikasi cuaca, hero element tersebut berupa ramalan untuk lokasi tertentu. Dan di
situs berita, hero element berupa kabar utama dan gambar unggulan.

Halaman hampir selalu memiliki bagian-bagian yang lebih penting daripada bagian-bagian lainnya. Jika
bagian terpenting dari sebuah halaman dapat dimuat dengan cepat, pengguna mungkin tidak menyadari bahwa
bagian halaman lainnya tidak dimuat dengan cepat.

### Tugas yang berjalan lama

Browser menanggapi input pengguna dengan menambahkan tugas ke antrean pada thread utama untuk
dieksekusi satu per satu. Ini juga tempat browser mengeksekusi
JavaScript aplikasi Anda, sehingga dalam pengertian itu browser tersebut thread tunggal.

Dalam beberapa kasus, tugas-tugas ini dapat memakan waktu lama untuk dijalankan, dan jika hal itu terjadi, thread
utama diblokir dan semua tugas lain yang sedang dalam antrean harus menunggu.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-long-tasks.png"
       alt="Tugas yang berjalan lama sebagaimana dilihat di alat developer Chrome"/>
</figure>

Pengguna akan melihat ini sebagai lambat atau tersendat, dan itu adalah sumber utama pengalaman
buruk di web saat ini.

[Long tasks API](https://w3c.github.io/longtasks/) mengidentifikasi setiap tugas
melebihi 50 milidetik sebagai berpotensi bermasalah, dan menampilkan tugas-tugas
tersebut ke developer aplikasi. Waktu 50 milidetik dipilih agar aplikasi
bisa memenuhi [panduan RAIL](/web/fundamentals/performance/rail)
dengan menanggapi input pengguna dalam 100 milidetik.

### Time to interactive

Metrik *Time to interactive* (TTI) menandai poin saat aplikasi Anda
dirender secara visual dan mampu menanggapi input pengguna secara meyakinkan.
Aplikasi mungkin tidak bisa menanggapi input pengguna karena beberapa alasan:

* JavaScript yang diperlukan untuk membuat komponen yang diperlukan untuk membuat di halaman belum
  dimuat.
* Ada tugas-tugas yang berjalan lama yang memblokir thread utama (seperti yang dijelaskan di bagian
  terakhir).

Metrik TTI mengidentifikasi titik ketika JavaScript awal halaman
dimuat dan thread utama dalam keadaan idle (bebas tugas yang berjalan lama).

### Memetakan metrik untuk pengalaman pengguna

Kembali ke pertanyaan-pertanyaan yang sebelumnya kita identifikasi sebagai hal yang paling
penting bagi pengalaman pengguna, tabel ini menguraikan bagaimana masing-masing metrik
hanya mencantumkan peta ke pengalaman yang kita harap dapat dioptimalkan:

<table>
  <tr>
    <th>Pengalaman</th>
    <th>Metrik</th>
  </tr>
  <tr>
    <td>Apakah terjadi?</td>
    <td>First Paint (FP) / First Contentful Paint (FCP)</td>
  </tr>
  <tr>
    <td>Apakah berguna?</td>
    <td>First Meaningful Paint (FMP) / Hero Element Timing</td>
  </tr>
  <tr>
    <td>Apakah bisa digunakan?</td>
    <td>Time to Interactive (TTI)</td>
  </tr>
  <tr>
    <td>Apakah menyenangkan?</td>
    <td>Tugas yang Berjalan Lama (secara teknis tidak ada tugas yang berjalan lama)</td>
  </tr>
</table>

Dan screenshot timeline pemuatan ini akan membantu Anda memvisualkan di mana
metrik pemuatan cocok dalam pengalaman pemuatan:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-load-timeline.png"
       alt="Screenshot ketika metrik-metrik ini terjadi di pengalaman pemuatan"/>
</figure>

Bagian berikutnya memerinci cara mengukur metrik-metrik ini pada perangkat pengguna nyata.

## Mengukur metrik-metrik ini pada perangkat pengguna nyata

Salah satu alasan utama kami secara historis mengoptimalkan metrik seperti pemuatan dan
`DOMContentLoaded` adalah karena metrik-metrik tersebut terekspos sebagai peristiwa di browser dan mudah
mengukur pengguna nyata.

Sebaliknya, banyak metrik lain yang secara historis sangat sulit untuk
diukur. Sebagai contoh, kode ini adalah jalan pintas yang sering kita lihat digunakan oleh developer untuk mendeteksi
tugas yang berjalan lama:

```
(function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());
```

Kode ini dimulai dengan loop `requestAnimationFrame` tanpa batas dan merekam waktu
pada setiap iterasi. Jika waktu saat ini lebih dari 50 milidetik setelah
waktu sebelumnya, kita bisa berasumsi bahwa waktu tersebut adalah hasil dari tugas yang berjalan lama. Meskipun kode ini
umumnya berfungsi, namun memiliki banyak kelemahan:

* Menambah overhead ke setiap frame.
* Mencegah idle block.
* Sangat tidak baik untuk masa pakai baterai.

Aturan terpenting pengukuran kinerja adalah bahwa aturan tersebut tidak membuat kinerja
menjadi lebih buruk.

Layanan seperti [Lighthouse](/web/tools/lighthouse/) dan [Uji Halaman
](https://www.webpagetest.org/) sudah menawarkan beberapa metrik baru ini
untuk saat ini (dan secara umum merupakan alat yang hebat untuk menguji kinerja pada
fitur sebelum merilisnya), tetapi alat ini tidak berjalan di perangkat
pengguna Anda, jadi mereka tidak mencerminkan pengalaman kinerja aktual pengguna Anda.

Untungnya, dengan penambahan beberapa API browser baru, mengukur metrik ini
pada perangkat nyata akhirnya sangat mungkin tanpa banyak jalan pintas atau solusi yang dapat
memperburuk kinerja.

API baru ini adalah
[`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver),
[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry),
dan
[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).
Untuk menampilkan beberapa kode dengan penerapan API baru ini, contoh kode berikut
menciptakan instance `PerformanceObserver` baru dan subscribe dinotifikasi
tanpa entri paint (mis. FP dan FCP) serta semua tugas yang berjalan lama yang terjadi:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType);
    console.log(entry.startTime); // DOMHighResTimeStamp
    console.log(entry.duration); // DOMHighResTimeStamp
  }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['resource', 'paint']});
```

Apa yang diberikan `PerformanceObserver` kepada kita yang belum pernah kita miliki sebelumnya adalah kemampuan
subscribe ke peristiwa-peristiwa kinerja saat peristiwa-peristiwa itu terjadi dan menanggapinya dengan cara
asinkron. Ini menggantikan antarmuka
[PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)
lama, yang sering meminta polling untuk melihat ketika data
tersedia.

### Melacak FP/FCP

Setelah Anda memiliki data untuk peristiwa kinerja tertentu, Anda dapat mengirimnya ke
layanan analisis yang Anda gunakan untuk mengambil metrik bagi pengguna saat ini.
Sebagai contoh, dengan Google Analytics, Anda bisa melacak waktu first paint sebagai
berikut:

```
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // `name` will be either 'first-paint' or 'first-contentful-paint'.
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);

      ga('send', 'event', {
        eventCategory: 'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true,
      });
    }
  });
  observer.observe({entryTypes: ['paint']});
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="...">
</head>
```

<aside>
  <p><strong>Penting:</strong> Anda harus memastikan <code>PerformanceObserver
 Anda </code> terdaftar di <code>&lt;head&gt;</code> dokumen Anda
  sebelum stylesheet, sehingga dijalankan sebelum FP/FCP terjadi.<p>
  <p>Ini tidak diperlukan lagi setelah Level 2 <a
  href="https://w3c.github.io/performance-timeline/">spesifikasi Performance Observer
  </a> diterapkan, saat memperkenalkan flag <a
  href="https://w3c.github.io/performance-timeline/#dom-performanceobserverinit-
  buffered"><code>buffered</code></a> yang mengizinkan Anda mengakses entri kinerja
  yang diatrekan sebelum <code>PerformanceObserver</code>
  dibuat.</p>
</aside>

### Melacak FMP menggunakan hero element

Setelah mengidentifikasi elemen apa di halaman tersebut yang merupakan hero element,
Anda perlu melacak titik di mana hero element itu terlihat oleh pengguna.

Kami belum memiliki definisi standar untuk FMP (dan dengan demikian juga tidak ada jenis entri
kinerja). Ini tidak bisa diabaikan karena betapa sulitnya menentukan,
dengan cara umum, apa arti "berguna" untuk semua halaman.

Namun, dalam konteks halaman tunggal atau aplikasi tunggal, secara umum
paling baik untuk mempertimbangkan FMP menjadi momen ketika hero element Anda terlihat
di layar.

Steve Souders memiliki artikel hebat yang disebut [Metrik User Timing dan Kustom
](https://speedcurve.com/blog/user-timing-and-custom-metrics/) yang
menjelaskan banyak teknik untuk menggunakan API kinerja browser guna untuk ditentukan
dalam kode ketika berbagai jenis media terlihat.

### Melacak TTI

Dalam jangka panjang, kami berharap memiliki metrik TTI yang terstadardisasi dan diekspos dalam
browser melalui PerformanceObserver. Sementara itu, kami sudah mengembangkan polyfill
yang dapat digunakan untuk mendeteksi TTI saat ini dan dapat berfungsi di browser apa pun yang mendukung
[Long Tasks API](https://w3c.github.io/longtasks/).

Polyfill mengekspos metode `getFirstConsistentlyInteractive()`, yang menampilkan
promise yang dipecahkan dengan nilai TTI. Anda bisa melacak TTI menggunakan Google
Analytics berikut:

```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});
```

Metode `getFirstConsistentlyInteractive()` menerima opsi konfigurasi `startTime`
opsional, yang mengizinkan Anda menentukan ikatan yang lebih rendah yang Anda tahu
aplikasi Anda tidak bisa interaktif sebelumnya. Secara default, polyfill menggunakan
DOMContentLoaded sebagai waktu mulai, tetapi seringkali lebih akurat untuk digunakan
sesuatu seperti saat hero element Anda terlihat atau titik ketika Anda
mengetahui semua event listener Anda telah ditambahkan.

Lihat [dokumentasi polyfill
TTI](https://github.com/GoogleChrome/tti-polyfill) untuk petunjuk lengkap
pemasangan dan penggunaan.

<aside>
  <strong>Note:</strong> Seperti dengan FMP, sangat sulit untuk menentukan definisi metrik TTI
  yang bekerja sempurna untuk semua halaman. Versi yang sudah kami
  terapkan dalam polyfill akan dapat berfungsi untuk hampir di semua aplikasi, tetapi mungkin
  tidak bisa berfungsi untuk aplikasi tertentu Anda. Sebaiknya Anda mengujinya terlebih dahulu
  mengandalkannya. Jika Anda ingin mendapatkan informasi lebih lengkap tentang spesifikasi dan implementasi TTI
, Anda bisa membaca
  <a href="https://goo.gl/OSmrPk">dokumen definisi metrik </a>.
</aside>

### Melacak tugas yang berjalan lama

Saya menyebutkan di atas bahwa tugas yang berjalan lama sering menyebabkan pengalaman pengguna negatif
(mis. pengendali peristiwa yang lamban atau penurunan frame). Sebaiknya Anda tahu
seberapa sering ini terjadi, sehingga Anda bisa melakukan upaya untuk meminimalkannya.

Untuk mendeteksi tugas yang berjalan lama di JavaScript, buat `PerformanceObserver` baru dan
amati entri jenis `longtask`. Salah satu fitur menarik entri tugas yang berjalan lama adalah
bahwa tugas itu berisi [properti
atribusi](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming), sehingga
Anda bisa dengan mudah melacak kode mana yang menyebabkan tugas berjalan lama:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});
```

Properti atribusi akan menjelaskan konteks frame mana sebagai penyebab
tugas yang berjalan lama, yang berguna dalam menentukan apakah skrip iframe pihak ketiga yang
menyebabkan masalah. Versi masa depan spesifikasi berencana untuk menambahkan lebih banyak granularitas
dan mengekspos URL, baris, dan jumlah kolom skrip, yang akan sanagt membantu dalam
menentukan apakah skrip Anda menyebabkan pelambatan.

### Melacak latensi input

Tugas yang berjalan lama yang memblokir thread utama dapat mencegah event listener Anda
melakukan eksekusi secara tepat waktu. [Model kinerja
RAIL](/web/fundamentals/performance/rail) mengajarkan bahwa order untuk satu antarmuka
pengguna terasa lancar, maka harus menanggapi dalam 100 milidetik input pengguna, dan jika
ini tidak terjadi, maka penting untuk mengetahuinya.

Untuk mendeteksi latensi input dalam kode, Anda bisa membandingkan stempel waktu dengan
waktu sekarang, dan jika perbedaanya melebihi 100 milidetik, Anda bisa (dan harus)
melaporkannya.

```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    ga('send', 'event', {
      eventCategory: 'Performance Metric'
      eventAction: 'input-latency',
      eventLabel: '#subscribe:click',
      eventValue: Math.round(lag),
      nonInteraction: true,
    });
  }
});
```

Karena latensi acara biasanya merupakan hasil dari tugas yang berjalan lama, Anda dapat menggabungkan logika
deteksi latensi laten Anda dengan logika deteksi tugas yang berjalan lama: jika tugas yang berjalan lama
memblokir thread utama pada saat yang sama dengan `event.timeStamp`, Anda
juga bisa melaporkan nilai atribusi tugas yang berjalan lama tersebut. Ini akan mengizinkan Anda
menggambar garis yang jelas antara pengalaman kinerja neatif dan kode
penyebabnya.

Meskipun teknik ini tidak sempurna (tidak menangani event listener yang berlangsung lama
pada fase propagasi, dan tidak berfungsi untuk scrolling atau animasi
komposit yang tidak dijalankan di thread utama), namun menjadi langkah bagus pertama
untuk memahami seberapa sering kode JavaScript yang berjalan dalam waktu lama mempengaruhi pengalaman
pengguna.

## Mengintepretasikan data

Setelah Anda mulai mengumpulkan metrik kinerja untuk pengguna nyata, Anda harus
menjalankan data tersebut. Data kinerja pengguna nyata berguna untuk beberapa
alasan utama:

* Memvalidasi bahwa aplikasi Anda berkinerja sesuai harapan.
* Mengidentifikasi tempat-tempat di mana kinerja buruk berdampak negatif terhadap konversi
  (apa pun maknanya bagi aplikasi Anda).
* Mencari peluang untuk menyempurnakan pengalaman pengguna dan membuat pengguna nyaman.

Satu hal yang pasti patut diperbandingkan adalah bagaimana kinerja aplikasi Anda di desktop
vs perangkat seluler. Bagan berikut menunjukkan distribusi TTI
di desktop (biru) dan seluler (jingga). Seperti yang Anda lihat dari contoh ini, nilai TTI
di perangkat seluler sedikit lebih lama daripada di desktop:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-tti-mobile-v-desktop.png"
       alt="Distribusi TTI di desktop dan seluler"/>
</figure>

Karena angka-angka di sini spesifik aplikasi (dan Anda sebaiknya tidak berasumsi angka-angka itu cocok
dengan angka Anda, maka Anda harus menguji sendiri), hal ini memberi Anda contoh bagaimana
Anda dapat melihat laporan pada metrik penggunaan Anda:

#### Desktop

<table>
  <tr>
   <td><strong>Persentil</strong></td>
   <td align="right"><strong>TTI (detik)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">2,3</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">4,7</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">8,3</td>
  </tr>
</table>

#### Seluler

<table>
  <tr>
   <td><strong>Persentil</strong></td>
   <td align="right"><strong>TTI (detik)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">3,9</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">8,0</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">12,6</td>
  </tr>
</table>

Memerinci hasil Anda di seluler dan desktop dan menganalisis data sebagai distribusi
memungkinkan Anda mendapatkan wawasan cepat tentang pengalaman pengguna yang sebenarnya.
Misalnya, berdasarkan tabel di atas, saya dapat dengan mudah melihat bahwa, untuk aplikasi ini,
**10% pengguna ponsel membutuhkan waktu lebih dari 12 detik untuk menjadi interaktif!**

### Bagaimana kinerja mempengaruhi bisnis

Satu manfaat besar pelacakan kinerja dalam fitur analytics Anda adalah bahwa Anda bisa
menggunakan data tersebut untuk menganalisis bagaimana kinerja mempengaruhi bisnis.

Jika Anda melacak penyelesaian tujuan
atau konversi ecommerce dalam analytics, Anda dapat membuat laporan yang mengeksplorasi korelasinya dengan metrik
kinerja aplikasi. Misalnya:

* Apakah pengguna dengan waktu interaktif yang lebih cepat membeli lebih banyak barang?
* Apakah pengguna yang mengalami lebih banyak tugas yang berjalan lama saat alur proses pembayaran mengalami penurunan dengan laju lebih tinggi?

Jika ditemukan korelasi, akan jauh lebih mudah untuk menetapkan
pada bisnis tersebut bahwa kinera itu penting dan harus diprioritaskan.

### Pengabaian pemuatan

Kita tahu bahwa pengguna sering meninggalkan aplikasi ketika waktu muat terlalu lama.
Sayangnya, ini berarti bahwa semua metrik kinerja kita memiliki masalah
[bias survivorship](https://en.wikipedia.org/wiki/Survivorship_bias) yang sama, di mana
data tidak mencakup metrik pemuatan dari orang-orang yang tidak menunggu halaman tersebut untuk
menyelesaikan pemuatan (yang kemungkinan angkanya terlalu rendah).

Meskipun Anda tidak dapat melacak berapa angka yang seharusnya jika pengguna tersebut
macet, Anda dapat melacak seberapa sering hal ini terjadi serta berapa lama setiap pengguna
menunggu sementara.

Ini agak sulit dilakukan dengan Google Analytics karena library analytics.js
biasanya dimuat secara asinkron, dan mungkin tidak tersedia ketika
pengguna memutuskan untuk keluar. Namun demikian, Anda tidak perlu menunggu analytics.js
memuat sebelum mengirim data ke Google Analytics. Anda bisa mengirimkannya secara langsung melalui
[Protokol Pengukuran](/analytics/devguides/collection/protocol/v1/).

Kode ini menambahkan listener ke
[`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
peristiwa (yang terpicu jika halaman dikosongkan atau masuk ke latar belakang)
dan mengirimkan nilai `performance.now()` pada poin tersebut.

```
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://www.google-analytics.com/collect';
  const GA_COOKIE = document.cookie.replace(
    /(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1');
  const TRACKING_ID = 'UA-XXXXX-Y';
  const CLIENT_ID =  GA_COOKIE || (Math.random() * Math.pow(2, 52));

  // Send the data to Google Analytics via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'v=1', 't=event', 'ec=Load', 'ea=abandon', 'ni=1',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'tid=' + TRACKING_ID,
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

Anda bisa menggunakan kode ini dengan menyalinnya ke dalam `<head>` dokumen Anda dan mengganti
placeholder `UA-XXXXX-Y` dengan
[ID pelacakan](https://support.google.com/analytics/answer/1008080) Anda.

Anda juga akan memastikan bahwa Anda menghapus listener ini setelah halaman
tersebut menjadi interaktif atau Anda akan melaporkan pengabaian pemuatan di mana Anda
juga melaporkan TTI.

```
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## Mengoptimalkan kinerja dan mencegah regresi

Hal hebat tentang mendefinisikan metrik yang berfokus pada pengguna adalah ketika Anda mengoptimalkan untuk
mereka, Anda pasti juga meningkatkan pengalaman pengguna.

Salah satu cara paling sederhana untuk meningkatkan kinerja adalah dengan hanya mengirimkan lebih sedikit kode JavaScript
ke klien, tetapi dalam kasus di mana mengurangi ukuran kode bukan merupakan pilihan, maka penting bahwa Anda untuk berpikir tentang *bagaimana* Anda mengirimkan
JavaScript Anda.

### Mengoptimalkan FP/FCP

Anda dapat menurunkan waktu untuk first paint dan first contentful paint dengan menghapus
skrip pemblokiran atau stylesheet apa pun dari `<head>` dokumen Anda.

Dengan meluangkan waktu untuk mengidentifikasi set minimal gaya yang diperlukan untuk menunjukkan kepada pengguna bahwa
"itu terjadi" dan menampilkannya di `<head>` (atau menggunakan [push server
HTTP/2](/web/fundamentals/performance/http2/#server_push)), Anda bisa mendapatkan waktu
first paint yang cepat.

[Pola shell aplikasi](/web/updates/2015/11/app-shell) adalah contoh bagus
cara melakukan ini untuk [Aplikasi Web Progresif](/web/progressive-web-apps/).

### Mengoptimalkan FMP/TTI

Setelah Anda mengidentifikasi elemen UI yang paling penting di halaman Anda (hero
element), Anda harus memastikan bahwa pemuatan skrip awal Anda hanya berisi
kode yang diperlukan untuk mendapatkan elemen-elemen yang dirender dan membuatnya interaktif.

Kode apa pun yang tidak terkait dengan hero element Anda yang disertakan dalam bundle awal
Javascript Anda akan memperlambat waktu Anda untuk interaktivitas. Tidak ada alasan untuk memaksa
perangkat pengguna Anda untuk mengunduh dan mem-parse kode JavaScript yang
tidak langsung mereka dapatkan.

Sebagai aturan umum, Anda harus berusaha sekeras mungkin untuk meminimalkan waktu
antara FMP dan TTI. Jika tidak mungkin untuk meminimalkan waktu ini,
benar-benar penting antarmuka Anda membuatnya jelas bahwa halaman tersebut belum
interaktif.

Salah satu pengalaman yang paling membuat frustrasi bagi pengguna adalah mengetuk elemen dan
tidak ada reaksi yang terjadi.

### Mencegah tugas yang berjalan lebih lama

Dengan memecah kode dan memprioritaskan urutan pemuatannya, Anda tidak
hanya bisa membuat halaman Anda lebih cepat interaktif, tetapi Anda juga dapat mengurangi tugas yang berjalan lebih lama
dan diharapkan memiliki latensi input yang lebih sedikit dan lebih sedikit frame lambat.

Selain memecah kode menjadi file yang terpisah, Anda juga dapat memecah
bongkahan besar kode ke dalam potongan-potongan yang lebih kecil yang dapat
dijalankan secara asinkron atau
[ditangguhkan ke idlepoint selanjutnya](/web/updates/2015/08/using-requestidlecallback).
Dengan menjalankan logika ini secara asinkron dalam potongan yang lebih kecil, Anda menyisakan ruang pada
thread utama untuk browser guna menanggapi input pengguna.

Terakhir, Anda harus memastikan bahwa Anda menguji kode pihak ketiga dan memastikan
kode yang berjalan lambat dengan cara yang dapat dipertanggungjawabkan. Iklan pihak ketiga atau skrip pelacakan yang
menyebabkan banyak tugas yang berjalan lama dapat lebih banyak dampak negatifnya dibandingkan
positifnya bagi perusahaan Anda.

## Mencegah regresi

Artikel ini telah banyak berfokus pada pengukuran kinerja pada pengguna nyata, dan
benar bahwa data RUM adalah data kinerja yang pada akhirnya penting, data
lab masih penting dalam memastikan aplikasi Anda berkinerja baik (dan
tidak beregresi) sebelum merilis fitur baru. Uji laboratorium adalah uji yang ideal untuk
mendeteksi regresi, karena banyak dijalankan di lingkungan yang terkendali dan jauh lebih rentan terhadap variabilitas acak
uji RUM.

Fitur seperti [Lighthouse](/web/tools/lighthouse/) dan [Uji
Halaman](https://www.webpagetest.org/) dapat diintegrasikan ke dalam server integrasi kontinu
Anda, dan dapat menulis uji yang menggagalkan build jika metrik kunci
beregresi atau turun di bawah ambang tertentu.

Dan untuk kode yang sudah dirilis, Anda dapat menambahkan [Peringatan
kustom](https://support.google.com/analytics/answer/1033021) untuk memberi tahu Anda jika
ada lonjakan yang tak terduga dalam terjadinya peristiwa kinerja negatif.
Ini dapat terjadi, misalnya, jika pihak ketiga merilis versi baru dari
salah satu layanannya dan tiba-tiba pengguna Anda mulai melihat lebih banyak tugas yang berjalan
lama.

Agar berhasil mencegah terjadinya regresi, Anda perlu menguji kinerja di lab dan
di lapangan dengan setiap rilis fitur baru.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-test-cycle.png"
       alt="Diagram alur RUM dan pengujian laboratorium dalam proses rilis"/>
</figure>

## Mengemas dan meneruskan

Kami telah membuat langkah signifikan pada tahun lalu dalam mengekspos metrik yang berfokus pada pengguna
untuk developer di browser, tetapi kami belum selesai, dan kami memiliki lebih banyak lagi yang
direncanakan

Kami benar-benar ingin menstandardisasi metrik time to interactive dan hero element, sehingga
developer tidak perlu mengukurnya sendiri atau bergantung pada polyfill. Kami juga
ingin memudahkan developer untuk mengatributkan penurunan frame dan latensi
input ke tugas yang berjalan lama dan kode yang menyebabkannya.

Meskipun banyak hal yang harus kami lakukan, kami senang dengan kemajuan yang telah kami buat. Dengan API
baru seperti `PerformanceObserver` dan tugas yang berjalan lama yang didukung secara native di
browser, developer akhirnya memiliki primitif yang diperlukan untuk mengukur kinerja
pengguna nyata tanpa mengganggu pengalaman mereka.

Metrik yang paling penting adalah metrik yang mewakili pengalaman
pengguna nyata, dan kami ingin menjadikannya semudah mungkin bagi developer untuk
memuaskan pengguna mereka dan membuat aplikasi hebat.

## Tetap terhubung

{% include "web/_shared/helpful.html" %}

Masalah spesifikasi file:

* [https://github.com/w3c/longtasks/issues](https://github.com/w3c/longtasks/issues)
* [https://github.com/WICG/paint-timing/issues](https://github.com/WICG/paint-timing/issues)
* [https://github.com/w3c/performance-timeline/issues](https://github.com/w3c/performance-timeline/issues)

Masalah polyfill file:

* [https://github.com/GoogleChrome/tti-polyfill/issues](https://github.com/GoogleChrome/tti-polyfill/issues)

Ajukan pertanyaan:

* [progressive-web-metrics@chromium.org](mailto:progressive-web-metrics@chromium.org)
* [public-web-perf@w3.org](mailto:public-web-perf@w3.org)

Berikan masukan Anda tentang usualan API baru:

* [https://github.com/w3c/charter-webperf/issues](https://github.com/w3c/charter-webperf/issues)
