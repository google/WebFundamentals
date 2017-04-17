project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Praktik terbaik untuk pengaturan waktu pendaftaran service worker Anda.

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2016-11-28 #}

# Pendaftaran Service Worker {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[Service
worker](/web/fundamentals/getting-started/primers/service-workers)
bisa mempercepat kunjungan berulang ke aplikasi web, namun Anda harus mengambil
langkah-langkah untuk memastikan bahwa pemasangan pertama service worker tidak mengurangi kualitas
pengalaman kunjungan pertama pengguna.

Umumnya, menangguhkan
[pendaftaran](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
service worker hingga setelah laman pertama dimuat akan menyediakan pengalaman terbaik untuk
pengguna, khususnya mereka yang menggunakan perangkat seluler dengan koneksi jaringan yang lebih lambat.

## Boilerplate pendaftaran umum

Jika pernah membaca tentang service worker, barangkali Anda pernah menemukan
boilerplate yang secara substansial mirip dengan berikut ini:

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

Ini mungkin kadang-kadang disertai beberapa pernyataan `console.log()`, atau
[kode](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)
yang mendeteksi pembaruan ke pendaftaran service worker sebelumnya, sebagai cara
memberi tahu pengguna untuk menyegarkan laman. Namun semua itu cuma variasi minor atas
beberapa baris kode standar.

Jadi, adakah perbedaan kecil pada `navigator.serviceWorker.register`? Adakah
praktik terbaik untuk diikuti? Tidaklah mengejutkan (asalkan artikel ini tidak
langsung berhenti di sini) bila jawaban terhadap keduanya adalah "ya!"

## Kunjungan pertama pengguna

Mari kita perhatikan kunjungan pertama pengguna ke aplikasi web. Belum ada service worker,
dan browser tidak memiliki cara untuk mengetahui lebih dini apakah nanti akan
dipasang service worker.

Sebagai developer, prioritas Anda adalah memastikan apakah browser dengan cepat
mendapatkan rangkaian minimal sumber daya penting yang dibutuhkan untuk menampilkan
laman interaktif. Apa saja yang memperlambat pengambilan sumber daya itu adalah musuh bagi
pengalaman waktu-ke-interaktif yang cepat.

Sekarang bayangkan bahwa dalam proses pengunduhan JavaScript atau gambar yang perlu
dirender oleh laman, browser Anda memutuskan untuk memulai sebuah thread atau
proses latar belakang (untuk meringkasnya, anggaplah ini thread). Anggaplah
Anda tidak sedang menggunakan mesin desktop yang berotot, melainkan tipe ponsel
kelas bawah yang dijasikan perangkat utama oleh orang di seluruh dunia. Memulai
thread ekstra ini menambah perebutan waktu CPU dan memori yang seharusnya
digunakan oleh browser Anda untuk merender laman web interaktif.

Thread latar belakang yang menganggur mungkin tidak akan menghasilkan perbedaan signifikan. Namun bagaimana jika
thread itu tidak menganggur, melainkan memutuskan bahwa ia juga akan mulai
mengunduh sumber daya dari jaringan? Semua persoalan tentang perebutan CPU atau memori
harus disisihkan dulu untuk memikirkan tentang keterbatasan bandwidth
yang tersedia pada banyak perangkat seluler. Bandwidth itu berharga, jadi jangan meremehkan
sumber daya penting dengan mengunduh sumber daya sekunder pada waktu yang sama.

Maksud semua ini adalah bahwa memulai thread baru service worker untuk mengunduh
dan meng-cache sumber daya di latar belakang bisa membantu tujuan Anda untuk menyediakan
pengalaman waktu-ke-interaktif yang tersingkat saat pertama pengguna
mengunjungi situs Anda.

## Memperbaiki boilerplate

Solusinya adalah mengontrol mulainya service worker dengan memilih kapan memanggil
`navigator.serviceWorker.register()`. Aturan main sederhana adalah menunda
pendaftaran hingga setelah <code>[load
event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>
dipicu pada <code>window</code>, sehingga:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

Namun waktu yang tepat untuk memulai pendaftaran service worker bisa juga bergantung pada
apakah aplikasi web Anda berjalan dengan baik setelah dimuat. Misalnya, [aplikasi web Google I/O
2016](https://events.google.com/io2016/) menyediakan animasi singkat
sebelum beralih ke layar utama. Tim kami
[menemukan](/web/showcase/2016/iowa2016) bahwa memulai
pendaftaran service worker selama animasi bisa menyebabkan kelambatan
pada perangkat seluler low-end. Daripada memberikan pengalaman buruk kepada pengguna, lebih baik kita
[tunda](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)
pendaftaran service worker hingga setelah animasi, bila browser kemungkinan
besar memiliki beberapa detik waktu menganggur.

Demikian pula, jika aplikasi web Anda menggunakan kerangka kerja yang melakukan persiapan tambahan setelah
laman dimuat, carilah kejadian spesifik kerangka kerja yang memberi petunjuk kapan
pekerjaan itu selesai.

## Kunjungan selanjutnya

Hingga sekarang kita sedang memfokuskan pada pengalaman kunjungan pertama, namun bagaimana dampak
penundaan pendaftaran service worker pada kunjungan berulang ke situs Anda?
Walaupun hal ini mungkin mengejutkan sebagian orang, seharusnya tidak ada dampaknya sama sekali.

Bila service worker telah didaftarkan, ia akan melalui [kejadian
daur hidup](/web/fundamentals/instant-and-offline/service-worker/lifecycle) `install` dan
`activate`.
Setelah service worker diaktifkan, ia bisa menangani kejadian `fetch` untuk
kunjungan selanjutnya ke aplikasi web Anda. Service worker akan dimulai *sebelum*
membuat permintaan untuk laman apa pun yang berada dalam cakupannya, yang memang masuk akan bila
dipikirkan. Jika service worker yang ada belum dijalankan sebelum
mengunjungi laman, maka ia tidak akan memiliki kesempatan untuk memenuhi kejadian `fetch` untuk
permintaan navigasi.

Jadi setelah ada service worker yang aktif, maka tidak penting kapan Anda memanggil
`navigator.serviceWorker.register()`, atau sebenarnya, *apakah Anda memanggilnya*.
Kecuali jika Anda mengubah URL skrip service worker,
`navigator.serviceWorker.register()` secara efektif akan
[no-op](https://en.wikipedia.org/wiki/NOP) selama kunjungan selanjutnya. Tidak relevan
kapan memanggilnya.

## Alasan untuk mendaftar dini

Adakah skenario yang membuat pendaftaran service worker sedini mungkin
menjadi hal yang masuk akal? Skenario yang terlintas di benak adalah bila service worker Anda menggunakan
<code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>
untuk mengontrol laman selama kunjungan pertama, dan service worker
secara agresif melakukan [caching
waktu proses](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)
di dalam penangan <code>fetch</code> -nya. Dalam situasi itu, ada
untungnya membuat service worker aktif secepat mungkin, untuk mencoba
mengisi cache waktu prosesnya dengan sumber daya mungkin nanti akan masuk. Jika
aplikasi web Anda termasuk dalam kategori ini, ada baiknya mengambil langkah mundur untuk memastikan
penangan <code>install</code> service worker Anda tidak meminta
sumber daya yang berebut bandwidth dengan permintaan laman utama.

## Menguji berbagai hal

Cara yang bagus untuk menyimulasikan kunjungan pertama adalah membuka aplikasi web Anda di [jendela
Samaran
Chrome](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop),
dan mengamati lalu lintas jaringan di [DevTools
Chrome](/web/tools/chrome-devtools/). Sebagai
developer web, Anda mungkin akan memuat ulang instance lokal aplikasi web
puluhan kali sehari. Namun dengan mengunjungi ulang situs Anda bila sudah ada
service worker dan cache telah terisi penuh, Anda tikdak mendapatkan pengalaman yang sama
dengan yang akan didapat pengguna baru, dan masalah potensial mudah terabaikan.

Inilah contoh yang mengilustrasikan perbedaan yang bisa dihasilkan oleh
pengaturan waktu pendaftaran. Kedua tangkapan layar diambil saat mengunjungi sebuah [aplikasi
contoh](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo) dalam mode
Penyamaran dengan menggunakan throttling jaringan untuk menyimulasikan koneksi yang lambat.

![Lalu lintas jaringan pada pendaftaran dini.](../images/early-registration.png
"Network traffic with early registration.")

Tangkapan layar di atas mencerminkan lalu lintas jaringan bila contoh dimodifikasi
untuk melakukan pendaftaran service worker sesegera mungkin. Anda bisa melihat
permintaan precaching (entri dengan [ikon
roda gigi](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)
di sebelahnya, berasal dari penangan `install` service worker)
diselingi dengan permintaan akan sumber daya lain yang dibutuhkan untuk menampilkan laman.

![Lalu lintas jaringan dengan pendaftaran terlambat.](../images/late-registration.png
"Network traffic with late registration.")


Dalam tangkapan layar di atas, pendaftaran service worker ditunda hingga setelah
laman dimuat. Anda bisa melihat bahwa permintaan precaching tidak dimulai hingga semua
sumber daya diambil dari jaringan, sehingga menghilangkan rebutan
bandwidth. Terlebih lagi, karena sebagian item precaching sudah ada dalam
cache HTTP browser—item dengan `(from disk cache)` di kolom Size
—kita bisa mengisi cache service worker tanpa harus masuk lagi ke
jaringan.

Anda akan dapat bonus jika menjalankan pengujian semacam ini dari perangkat low-end sungguhan pada
jaringan seluler sesungguhnya. Anda bisa memanfaatkan [kemampuan
debug dari jauh](/web/tools/chrome-devtools/remote-debugging/)
di Chrome dengan menghubungkan ponsel Android ke mesin desktop lewat USB, dan memastikan pengujian
yang dijalankan benar-benar mencerminkan pengalaman sesungguhnya dari banyak
pengguna Anda.

## Kesimpulan

Untuk merangkum, memastikan pengguna Anda mendapatkan pengalaman kunjungan pertama yang terbaik
harus menjadi prioritas utama. Menunda pendaftaran service worker hingga setelah
laman dimuat selama kunjungan pertama bisa membantu memastikannya. Anda tetap akan mendapatkan
semua manfaat memiliki service worker untuk kunjungan berulang.

Cara praktis untuk memastikan penundaan pendaftaran pertama service worker
Anda hingga setelah laman pertama dimuat adalah menggunakan yang berikut ini:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
