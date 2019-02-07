project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Praktik terbaik untuk pengaturan waktu pendaftaran pekerja layanan Anda.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2016-11-28 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Pendaftaran Pekerja Layanan {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[Pekerja
layanan](/web/fundamentals/getting-started/primers/service-workers)
bisa mempercepat kunjungan berulang ke aplikasi web, namun Anda harus mengambil
langkah-langkah untuk memastikan bahwa instalasi awal pekerja layanan tidak mengurangi kualitas
pengalaman kunjungan pertama pengguna.

Umumnya, menangguhkan
[pendaftaran](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) pekerja layanan
hingga setelah halaman awal dimuat akan memberikan pengalaman terbaik untuk
pengguna, khususnya mereka yang menggunakan perangkat seluler dengan koneksi jaringan yang lebih lambat.

## Boilerplate pendaftaran umum

Jika Anda pernah membaca tentang pekerja layanan, mungkin Anda pernah menemukan
boilerplate yang secara substansial mirip dengan berikut ini:

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

Ini mungkin kadang-kadang disertai beberapa pernyataan `console.log()`, atau
[kode](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)
yang mendeteksi update ke pendaftaran pekerja layanan sebelumnya, sebagai cara
memberi tahu pengguna untuk memuat ulang halaman. Namun semua itu hanya variasi minor pada
beberapa baris kode standar.

Jadi, adakah perbedaan kecil pada `navigator.serviceWorker.register`? Adakah
praktik terbaik untuk diikuti? Tidak mengejutkan (asalkan artikel ini tidak langsung
berhenti di sini), jawaban terhadap keduanya adalah "ya!"

## Kunjungan pertama pengguna

Mari kita perhatikan kunjungan pertama pengguna ke aplikasi web. Belum ada pekerja layanan,
dan browser tidak memiliki cara untuk mengetahui lebih dini apakah nantinya akan ada pekerja layanan
yang diinstal.

Sebagai developer, prioritas Anda adalah memastikan bahwa browser dengan cepat
mendapatkan set minimal resource penting yang dibutuhkan untuk menampilkan
halaman interaktif. Apa saja yang memperlambat pengambilan resource tersebut adalah musuh bagi
pengalaman waktu-ke-interaktif yang cepat.

Sekarang bayangkan bahwa dalam proses download JavaScript atau gambar yang perlu
dirender oleh halaman, browser Anda memutuskan untuk memulai thread atau
proses latar belakang (untuk meringkasnya, kita asumsikan ini thread). Anggaplah
Anda tidak sedang menggunakan mesin desktop yang canggih, melainkan tipe ponsel
kelas bawah yang banyak dijadikan perangkat utama oleh orang di seluruh dunia. Memulai
thread ekstra ini menambah kontensi bagi CPU dan memori yang seharusnya
digunakan oleh browser Anda untuk merender halaman web interaktif.

Thread latar belakang yang menganggur mungkin tidak akan menghasilkan perbedaan signifikan. Namun bagaimana jika
thread itu tidak menganggur, melainkan memutuskan juga akan mulai
mendownload resource dari jaringan? Semua persoalan tentang perebutan CPU atau memori
harus disisihkan dulu untuk memikirkan tentang keterbatasan bandwidth
yang ditemukan pada banyak perangkat seluler. Bandwidth berperan sangat penting, jadi jangan meremehkan
resource penting dengan mendownload resource sekunder pada waktu yang sama.

Maksud semua ini adalah bahwa mengerjakan thread baru pekerja layanan untuk mendownload
dan meng-cache resource di latar belakang bisa membantu tujuan Anda untuk menyediakan
pengalaman waktu-ke-interaktif tersingkat saat pertama kali pengguna
mengunjungi situs Anda.

## Memperbaiki boilerplate

Solusinya adalah mengontrol mulainya pekerja layanan dengan memilih kapan memanggil
`navigator.serviceWorker.register()`. Aturan sederhananya adalah menunda
pendaftaran hingga setelah <code>[peristiwa
pemuatan](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>
dipicu pada <code>window</code>, sehingga:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

Namun waktu yang tepat untuk memulai pendaftaran pekerja layanan juga bisa bergantung pada
apakah aplikasi web Anda berjalan dengan baik setelah dimuat. Misalnya, [aplikasi web Google I/O
2016](https://events.google.com/io2016/) menyediakan animasi singkat
sebelum beralih ke layar utama. Tim kami
[menemukan](/web/showcase/2016/iowa2016) bahwa memulai
pendaftaran pekerja layanan selama animasi bisa menyebabkan kelambatan
pada perangkat seluler low-end. Alih-alih memberikan pengalaman buruk kepada pengguna, lebih baik kita
[menunda](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)
pendaftaran pekerja layanan hingga setelah animasi, jika browser kemungkinan
besar memiliki beberapa detik waktu menganggur.

Demikian pula, jika aplikasi web Anda menggunakan kerangka kerja yang melakukan penyiapan tambahan setelah
halaman dimuat, carilah kejadian spesifik kerangka kerja yang memberi petunjuk kapan
pekerjaan itu selesai.

## Kunjungan selanjutnya

Hingga sekarang kita sedang memfokuskan pada pengalaman kunjungan pertama, namun bagaimana dampak
penundaan pendaftaran pekerja layanan pada kunjungan berulang ke situs Anda?
Walaupun hal ini mungkin mengejutkan sebagian orang, seharusnya tidak ada dampaknya sama sekali.

Jika pekerja layanan telah terdaftar, ia akan melalui `install` dan
`activate` [peristiwa
siklus proses](/web/fundamentals/instant-and-offline/service-worker/lifecycle).
Setelah pekerja layanan diaktifkan, maka bisa menangani peristiwa `fetch` untuk
kunjungan selanjutnya ke aplikasi web Anda. Pekerja layanan akan dimulai *sebelum*
membuat permintaan untuk halaman apa pun yang berada dalam cakupannya, yang memang sesuai bila
dipikirkan. Jika pekerja layanan yang ada belum dijalankan sebelum
mengunjungi halaman, maka tidak ada kesempatan untuk memenuhi kejadian `fetch` untuk
permintaan navigasi.

Dengan demikian, setelah ada pekerja layanan yang aktif, maka tidak penting kapan Anda memanggil
`navigator.serviceWorker.register()`, atau sebenarnya, *apakah Anda memanggilnya*.
Kecuali jika Anda mengubah URL skrip pekerja layanan,
`navigator.serviceWorker.register()` secara efektif menjadi
[no-op](https://en.wikipedia.org/wiki/NOP) selama kunjungan selanjutnya. Tidak relevan
kapan memanggilnya.

## Alasan untuk mendaftar dini

Adakah skenario yang membuat pendaftaran pekerja layanan sedini mungkin
menjadi hal yang masuk akal? Skenario yang terlintas di benak adalah jika pekerja layanan menggunakan
<code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>
untuk mengontrol halaman selama kunjungan pertama, dan pekerja layanan
secara agresif melakukan [caching
waktu proses](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)
di dalam pengendali <code>fetch</code>-nya. Dalam situasi itu, ada
manfaat membuat pekerja layanan aktif secepat mungkin, untuk mencoba
mengisi cache waktu prosesnya dengan resource mungkin nanti akan masuk. Jika
aplikasi web Anda termasuk dalam kategori ini, ada baiknya mengambil langkah mundur untuk memastikan
pengendali <code>install</code> pekerja layanan Anda tidak meminta
resource yang berebut bandwidth dengan permintaan halaman utama.

## Menguji berbagai hal

Cara yang bagus untuk menyimulasikan kunjungan pertama adalah membuka aplikasi web Anda di [jendela
Samaran
Chrome](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop),
dan mengamati traffic jaringan di [DevTools
Chrome](/web/tools/chrome-devtools/). Sebagai
developer web, Anda mungkin akan memuat ulang instance lokal aplikasi web
puluhan kali sehari. Namun dengan mengunjungi ulang situs Anda bila sudah ada
pekerja layanan dan cache telah terisi penuh, Anda tidak mendapatkan pengalaman yang sama
dengan yang akan didapat pengguna baru, dan masalah potensial mudah terabaikan.

Inilah contoh yang mengilustrasikan perbedaan yang bisa dihasilkan oleh
pengaturan waktu pendaftaran. Kedua screenshot diambil saat mengunjungi sebuah [aplikasi
contoh](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo) dalam mode
Penyamaran dengan menggunakan throttling jaringan untuk menyimulasikan koneksi yang lambat.

![Traffic jaringan pada pendaftaran dini.](images/early-registration.png
"Network traffic with early registration.")

Screenshot di atas mencerminkan traffic jaringan bila contoh dimodifikasi
untuk melakukan pendaftaran pekerja layanan sesegera mungkin. Anda bisa melihat
permintaan precaching (entri dengan [ikon
roda gigi](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)
di sebelahnya, berasal dari pengendali `install` pekerja layanan)
diselingi dengan permintaan akan resource lain yang dibutuhkan untuk menampilkan laman.

![Traffic jaringan dengan pendaftaran terlambat.](images/late-registration.png
"Network traffic with late registration.")


Dalam screenshot di atas, pendaftaran pekerja layanan ditunda hingga setelah
halaman dimuat. Anda bisa melihat bahwa permintaan precaching tidak dimulai hingga semua
sumber daya diambil dari jaringan, sehingga menghilangkan rebutan
bandwidth. Terlebih lagi, karena sebagian item precaching sudah ada dalam
cache HTTP browser—item dengan `(from disk cache)` di kolom Size
—kita bisa mengisi cache pekerja layanan tanpa harus masuk lagi ke
jaringan.

Anda akan dapat bonus jika menjalankan pengujian semacam ini dari perangkat low-end sungguhan pada
jaringan seluler sesungguhnya. Anda bisa memanfaatkan [kemampuan
debug dari jauh](/web/tools/chrome-devtools/remote-debugging/)
di Chrome dengan menghubungkan ponsel Android ke mesin desktop lewat USB, dan memastikan pengujian
yang dijalankan benar-benar mencerminkan pengalaman sesungguhnya dari banyak
pengguna Anda.

## Kesimpulan

Untuk merangkum, memastikan pengguna Anda mendapatkan pengalaman kunjungan pertama yang terbaik
harus menjadi prioritas utama. Menunda pendaftaran pekerja layanan hingga setelah
laman dimuat selama kunjungan pertama bisa membantu memastikannya. Anda tetap akan mendapatkan
semua manfaat memiliki pekerja layanan untuk kunjungan berulang.

Cara praktis untuk memastikan penundaan pendaftaran pertama pekerja layanan
Anda hingga setelah laman pertama dimuat adalah menggunakan yang berikut ini:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
