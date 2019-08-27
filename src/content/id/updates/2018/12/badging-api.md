project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Badging API adalah API platform web baru yang memungkinkan aplikasi web
  yang terinstal untuk mengatur lencana aplikasi, yang ditunjukkan di tempat khusus
  sistem operasi yang terkait dengan aplikasi, seperti rak atau layar beranda.

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {#
wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags:
capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials
#} {# wf_featured_snippet: The Badging API is a new web platform API that allows
installed web apps to set an application-wide badge, shown in an
operating-system-specific place associated with the application, such as the
shelf or home screen. Badging makes it easy to subtly notify the user that there
is some new activity that might require their attention, or it can be used to
indicate a small amount of information, such as an unread count. #} {#
wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Lencana untuk Ikon Aplikasi {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">Kami sedang mengerjakan API ini sebagai bagian dari <a
href="/web/updates/capabilities">proyek kemampuan</a> baru, dan mulai di Chrome
73 itu tersedia sebagai <a href="#ot"><b>uji coba asal</b></a> . Pos ini akan
diperbarui saat API Lencana berevolusi. <br> <b>Terakhir Diperbarui:</b> 21
Agustus 2019</aside>

## Apa itu API Lencana? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>Contoh Twitter dengan 8 pemberitahuan dan aplikasi lain yang
menunjukkan lencana jenis bendera.</figcaption>
</figure>

API Lencana adalah API platform web baru yang memungkinkan aplikasi web yang
terinstal untuk mengatur lencana aplikasi, yang ditunjukkan di tempat khusus
sistem operasi yang terkait dengan aplikasi (seperti rak atau layar beranda).

Lencana memudahkan memberi tahu pengguna secara halus bahwa ada beberapa
aktivitas baru yang mungkin memerlukan perhatian mereka, atau dapat digunakan
untuk menunjukkan sejumlah kecil informasi, seperti jumlah yang belum dibaca.

Lencana cenderung lebih ramah pengguna daripada notifikasi, dan dapat diperbarui
dengan frekuensi yang jauh lebih tinggi, karena tidak mengganggu pengguna. Dan,
karena mereka tidak mengganggu pengguna, tidak diperlukan izin khusus untuk
menggunakannya.

[Baca explainer](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### Kasing penggunaan yang disarankan untuk API Lencana {: #use-cases }

Contoh situs yang dapat menggunakan API ini termasuk:

- Obrolan, email, dan aplikasi sosial, untuk memberi sinyal bahwa pesan baru
telah tiba, atau menunjukkan jumlah item yang belum dibaca.
- Aplikasi produktivitas, untuk memberi sinyal bahwa tugas latar belakang yang
sudah berjalan lama (seperti merender gambar atau video) telah selesai.
- Permainan, untuk memberi sinyal bahwa tindakan pemain diperlukan (misalnya,
dalam Catur, saat giliran pemain).

## Status saat ini {: #status }

Langkah | Status
--- | ---
1. Buat explainer | [Lengkap](https://github.com/WICG/badging/blob/master/explainer.md)
2. Buat draf spesifikasi awal | [Lengkap](https://wicg.github.io/badging/)
**3. Kumpulkan umpan balik & beralih pada desain** | [**Sedang berlangsung**](#feedback)
**4. Uji coba asal** | [**Sedang berlangsung**](#ot)
5. Luncurkan | Belum mulai

### Lihat itu dalam aksi

1. Menggunakan Chrome 73 atau yang lebih baru pada Windows atau Mac, buka [demo
Badging API](https://badging-api.glitch.me/) .
2. Saat diminta, klik **Instal** untuk menginstal aplikasi, atau gunakan menu
Chrome untuk menginstalnya, lalu buka sebagai PWA yang diinstal. Catatan, itu
harus dijalankan sebagai PWA yang diinstal (di bilah tugas atau dok Anda).
3. Klik tombol **Setel** atau **Hapus** untuk mengatur atau menghapus lencana
dari ikon aplikasi. Anda juga dapat memberikan nomor untuk nilai *Lencana* .

Catatan: Meskipun API Lencana *di Chrome* memerlukan aplikasi yang dipasang
dengan ikon yang sebenarnya dapat di-badge, kami menyarankan agar tidak
melakukan panggilan ke API Lencana tergantung pada kondisi pemasangan. API
Lencana dapat diterapkan ke *mana saja* yang mungkin ingin ditampilkan oleh
browser, sehingga pengembang tidak boleh membuat asumsi tentang situasi apa yang
akan membuat browser berfungsi. Panggil saja API ketika ada. Jika berhasil, itu
berfungsi. Jika tidak, itu tidak benar.

## Cara menggunakan API Lencana {: #use }

Mulai di Chrome 73, API Lencana tersedia sebagai uji coba asal untuk Windows
(7+) dan macOS. [Uji coba
Asal](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
memungkinkan Anda untuk mencoba fitur baru dan memberikan umpan balik tentang
kegunaan, kepraktisan, dan efektivitas kepada kami, dan komunitas standar web.
Untuk informasi lebih lanjut, lihat [Panduan Uji Coba Asal untuk Pengembang
Web](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### Dukungan untuk badging lintas platform

API Lencana didukung (dalam uji coba asal) di Windows dan macOS. Android tidak
didukung karena mengharuskan Anda untuk menampilkan pemberitahuan, meskipun ini
dapat berubah di masa mendatang. Dukungan Chrome OS sedang menunggu implementasi
badging pada platform.

### Daftar untuk uji coba asal {: #ot }

1. [Minta
token](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
untuk asal Anda.
2. Tambahkan token ke halaman Anda, ada dua cara untuk memberikan token ini pada
halaman mana pun di asal Anda:
-  Tambahkan tag `<meta>` `origin-trial` ke kepala halaman mana pun.
Misalnya, ini mungkin terlihat seperti: `<meta http-equiv="origin-trial"
content="TOKEN_GOES_HERE">`
-  Jika Anda dapat mengkonfigurasi server Anda, Anda juga dapat memberikan
token pada halaman menggunakan header HTTP `Origin-Trial` . Header respons yang
dihasilkan akan terlihat seperti: `Origin-Trial: TOKEN_GOES_HERE`

### Alternatif untuk uji coba asal

Jika Anda ingin bereksperimen dengan Badging API secara lokal, tanpa uji coba
asal, aktifkan flag `#enable-experimental-web-platform-features` di
`chrome://flags` .

### Menggunakan Badging API selama uji coba asal

Dogfood: Selama uji coba asal, API akan tersedia melalui
`window.ExperimentalBadge` . Kode di bawah ini didasarkan pada desain saat ini,
dan akan berubah sebelum mendarat di browser sebagai API standar.

Untuk menggunakan Badging API, aplikasi web Anda harus memenuhi [kriteria
pemasangan Chrome](/web/fundamentals/app-install-banners/#criteria) , dan
pengguna harus menambahkannya ke layar beranda mereka.

Antarmuka `ExperimentalBadge` adalah objek anggota di `window` . Ini berisi dua
metode:

- `set([number])` : Mengatur lencana aplikasi. Jika suatu nilai diberikan, setel
lencana ke nilai yang diberikan sebaliknya, tampilkan titik putih polos (atau
bendera lain yang sesuai dengan platform).
- `clear()` : Menghapus lencana aplikasi.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` dan `ExperimentalBadge.clear()` dapat dipanggil dari
halaman latar depan, atau berpotensi di masa depan, seorang pekerja layanan.
Dalam kedua kasus, itu mempengaruhi seluruh aplikasi, bukan hanya halaman saat
ini.

Dalam beberapa kasus, OS mungkin tidak mengizinkan representasi badge yang
tepat, dalam hal ini, browser akan berusaha memberikan representasi terbaik
untuk perangkat itu. Misalnya, meskipun API Lencana tidak didukung di Android,
Android hanya menampilkan titik alih-alih nilai numerik.

Catatan: Jangan menganggap apa pun tentang bagaimana agen pengguna ingin
menampilkan lencana. Kami berharap beberapa agen pengguna akan mengambil nomor
seperti "4000" dan menulis ulang sebagai "99+". Jika Anda menjenuhkannya sendiri
(misalnya ke "99") maka "+" tidak akan muncul. Tidak peduli nomor yang
sebenarnya, cukup set `Badge.set(unreadCount)` dan biarkan agen pengguna
berurusan dengan menampilkannya.

## Umpan Balik {: #feedback }

Kami membutuhkan bantuan Anda untuk memastikan bahwa API Lencana bekerja dengan
cara yang memenuhi kebutuhan Anda dan bahwa kami tidak melewatkan skenario kunci
apa pun.

<aside class="key-point"><b>Kami membutuhkan bantuan Anda!</b> - Apakah desain
saat ini (memungkinkan nilai integer atau flag) memenuhi kebutuhan Anda? Jika
tidak, silakan ajukan masalah di <a
href="https://github.com/WICG/badging/issues">WICG / badging repo</a> dan
berikan detail sebanyak yang Anda bisa. Selain itu, ada sejumlah <a
href="https://github.com/WICG/badging/blob/master/choices.md">pertanyaan
terbuka</a> yang masih dibahas, dan kami akan tertarik mendengar tanggapan
Anda.</aside>

Kami juga tertarik untuk mendengar bagaimana Anda berencana untuk menggunakan
API Lencana:

- Punya ide untuk use case atau ide di mana Anda akan menggunakannya?
- Apakah Anda berencana untuk menggunakan ini?
- Menyukainya, dan ingin menunjukkan dukungan Anda?

Bagikan pemikiran Anda pada [diskusi Wacout WICG API
Badging](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
.

{% include "web/_shared/helpful.html" %}

## Tautan Bermanfaat {: #helpful }

- [Penjelajah publik](https://github.com/WICG/badging/blob/master/explainer.md)
- [Demo API Badging](https://badging-api.glitch.me/) | [Sumber Demo API
badging](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [Bug pelacakan](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [Entri
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- Minta [token uji coba
asal](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [Cara menggunakan token percobaan
asal](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- Komponen Blink: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
