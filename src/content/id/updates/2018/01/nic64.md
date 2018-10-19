project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Baru di Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Dukungan untuk [`ResizeObservers` ](#resizeobserver), akan memberi tahu Anda ketika kotak konten elemen telah berubah ukurannya.
* Modul sekarang dapat mengakses untuk menghosting metadata tertentu dengan [import.meta](#import-meta).
* The [pop-up blocker](#popup-blocker) menjadi kuat.
* [`window.alert()` ](#window-alert) tidak lagi mengubah fokus.

Dan masih ada [banyak lagi](#more)!

Saya Pete LePage. Mari selami dan lihat apa yang baru bagi pengembang di Chrome 64!

<div class="clearfix"></div>

SPCLCLL0 Ingin daftar lengkap perubahan? Lihat [daftar perubahan repositori sumber Chrome](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140).

## `ResizeObserver` {: #resizeobserver }

Melacak saat perubahan ukuran elemen bisa sedikit merepotkan. Kemungkinan besar, Anda akan melampirkan pendengar ke acara `resize` dokumen, kemudian memanggil `getBoundingClientRect` atau `getComputedStyle` . Namun, keduanya dapat menyebabkan labrakan tata letak.

Dan bagaimana jika jendela browser tidak mengubah ukuran, tetapi elemen baru ditambahkan ke dokumen? Atau Anda menambahkan `display: none` ke elemen? Keduanya dapat mengubah ukuran elemen lain di dalam halaman.

`ResizeObserver` memberi tahu Anda kapan pun ukuran elemen berubah, dan menyediakan tinggi dan lebar elemen yang baru, sehingga mengurangi risiko benturan tata letak.

Seperti Pengamat lainnya, menggunakannya cukup sederhana, buat objek `ResizeObserver` dan teruskan panggilan balik ke konstruktor. Callback akan diberikan larik `ResizeOberverEntries` - satu entri per elemen yang diamati - yang berisi dimensi baru untuk elemen.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Periksa [`ResizeObserver` : Ini seperti `document.onresize` untuk Elemen](/web/updates/2016/10/resizeobserver) untuk detail lebih lanjut dan contoh dunia nyata.


## Peningkatan Pemblokir Pop-up {: #popup-blocker }

Saya benci tab-under. Anda mengenal mereka, itu saat laman membuka munculan ke beberapa tujuan DAN menavigasi halaman. Biasanya salah satunya adalah iklan atau sesuatu yang tidak Anda inginkan.

Mulai dari Chrome 64, jenis navigasi ini akan diblokir, dan Chrome akan menampilkan beberapa UI asli kepada pengguna - memungkinkan mereka untuk mengikuti pengalihan jika mereka mau.


## `import.meta` {: #import-meta }

Saat menulis modul JavaScript, Anda sering ingin mengakses metadata khusus-host tentang modul saat ini. Chrome 64 sekarang mendukung properti `import.meta` dalam modul dan mengekspos URL untuk modul sebagai `import.meta.url` .

Ini sangat membantu ketika Anda ingin menyelesaikan sumber daya relatif terhadap file modul yang bertentangan dengan dokumen HTML saat ini.


## Dan lagi! {: #more }

Ini hanyalah beberapa perubahan di Chrome 64 untuk pengembang, tentu saja, masih banyak lagi.

* Chrome sekarang mendukung [tangkapan bernama](/web/updates/2017/07/upcoming-regexp-features#named_captures) dan [Pelolosan properti Unicode](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) dalam ekspresi reguler.
* Nilai `preload` default untuk elemen `<audio>` dan `<video>` sekarang `metadata` . Ini membawa Chrome sejalan dengan peramban lain dan membantu mengurangi penggunaan bandwidth dan sumber daya dengan hanya memuat metadata dan bukan media itu sendiri.
* Anda sekarang dapat menggunakan `Request.prototype.cache` untuk melihat mode cache `Request` dan menentukan apakah permintaan adalah permintaan isi ulang.
* Menggunakan API Manajemen Fokus, Anda sekarang dapat memfokuskan elemen tanpa menggulirnya dengan atribut `preventScroll` .

## `window.alert()` {: #window-alert }

Oh, dan satu lagi! Meskipun ini bukan benar-benar 'fitur pengembang', itu membuat saya senang. `window.alert()` tidak lagi membawa tab latar belakang ke latar depan! Sebaliknya, peringatan akan ditampilkan ketika pengguna beralih kembali ke tab itu.

Tidak ada lagi pengalihan tab secara acak karena sesuatu memecat `window.alert` pada saya. Saya melihat Anda Google Kalender lama.


Pastikan untuk [berlangganan](https://goo.gl/6FP1a5) ke [saluran YouTube] kami (1), dan Anda akan mendapatkan notifikasi email setiap kali kami meluncurkan video baru, atau tambahkan [umpan RSS](https://www.youtube.com/user/ChromeDevelopers/) ke pembaca umpan Anda.


Saya Pete LePage, dan segera setelah Chrome 65 dirilis, saya akan ada di sini untuk memberi tahu Anda - apa yang baru di Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}