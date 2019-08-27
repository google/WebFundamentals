project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Pengantar properti perilaku-overscroll CSS.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Kendalikan gulir Anda: menyesuaikan efek tarik-untuk-menyegarkan dan meluap {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

Properti [`overscroll-behavior`
CSS](https://wicg.github.io/overscroll-behavior/) memungkinkan pengembang untuk
menimpa perilaku gulir overflow default browser ketika mencapai bagian atas /
bawah konten. Kasus penggunaan mencakup penonaktifan fitur
tarik-untuk-menyegarkan pada ponsel, menghapus efek overscroll glow dan
rubberbanding, dan mencegah konten halaman dari pengguliran saat berada di bawah
modal / hamparan.

`overscroll-behavior` membutuhkan Chrome 63+. Ini sedang dikembangkan atau
sedang dipertimbangkan oleh browser lain. Lihat
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) untuk
informasi lebih lanjut. {: .caution }

## Latar Belakang

### Gulir batas dan gulir rantai {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Gulir rantai di Chrome Android.</figcaption>
</figure>

Menggulir adalah salah satu cara paling mendasar untuk berinteraksi dengan suatu
halaman, tetapi pola-pola UX tertentu bisa rumit untuk ditangani karena perilaku
default unik browser. Sebagai contoh, ambil laci aplikasi dengan sejumlah besar
item yang mungkin harus digulir pengguna. Ketika mereka mencapai bagian bawah,
wadah yang meluap berhenti bergulir karena tidak ada lagi konten untuk
dikonsumsi. Dengan kata lain, pengguna mencapai "batas gulir". Tetapi perhatikan
apa yang terjadi jika pengguna terus menggulir. **Konten di *belakang* laci
mulai bergulir** ! Pengguliran diambil alih oleh wadah induk; halaman utama itu
sendiri dalam contoh.

Ternyata perilaku ini disebut **rantai gulir** ; perilaku default browser saat
menggulir konten. Seringkali defaultnya cukup bagus, tetapi terkadang tidak
diinginkan atau bahkan tidak terduga. Aplikasi tertentu mungkin ingin memberikan
pengalaman pengguna yang berbeda ketika pengguna mencapai batas gulir.

### Efek tarik-untuk-menyegarkan {: #p2r }

Pull-to-refresh adalah gerakan intuitif yang dipopulerkan oleh aplikasi seluler
seperti Facebook dan Twitter. Menarik umpan sosial dan melepaskan menciptakan
ruang baru untuk memuat lebih banyak posting terbaru. Bahkan, UX khusus ini
telah menjadi *sangat populer* sehingga browser seluler seperti Chrome di
Android telah mengadopsi efek yang sama. Menggesek ke bawah di bagian atas
halaman menyegarkan seluruh halaman:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Tarik-untuk-menyegarkan kustom Twitter <br> saat menyegarkan
feed di PWA mereka.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Tindakan tarik-untuk-menyegarkan asli Android Chrome <br>
menyegarkan seluruh halaman.</figcaption>
  </figure>
</div>

Untuk situasi seperti [PWA](/web/progressive-web-apps/) Twitter, mungkin masuk
akal untuk menonaktifkan tindakan tarik-untuk-menyegarkan asli. Mengapa? Dalam
aplikasi ini, Anda mungkin tidak ingin pengguna me-refresh halaman secara tidak
sengaja. Ada juga potensi untuk melihat animasi penyegaran ganda! Atau, mungkin
lebih baik untuk menyesuaikan tindakan browser, menyelaraskannya lebih dekat
dengan pencitraan situs. Bagian yang disayangkan adalah jenis penyesuaian ini
sulit dilakukan. Pengembang akhirnya menulis JavaScript yang tidak perlu,
menambahkan pendengar sentuh
[non-pasif](/web/tools/lighthouse/audits/passive-event-listeners) (yang
memblokir gulir), atau menempelkan seluruh halaman dalam 100vw / vh `<div>`
(untuk mencegah halaman meluap). Penanganan ini memiliki efek negatif yang
[terdokumentasi dengan baik](https://wicg.github.io/overscroll-behavior/#intro)
pada kinerja pengguliran.

Kita bisa berbuat lebih baik!

## Memperkenalkan `overscroll-behavior` {: #intro }

The `overscroll-behavior`
[properti](https://wicg.github.io/overscroll-behavior/) adalah fitur CSS baru
yang mengontrol perilaku apa yang terjadi ketika Anda gulir wadah (termasuk
halaman itu sendiri). Anda dapat menggunakannya untuk membatalkan chaining
gulir, menonaktifkan / menyesuaikan aksi tarik-untuk-menyegarkan, menonaktifkan
efek rubberbanding di iOS (ketika Safari menerapkan `overscroll-behavior` ), dan
banyak lagi. Bagian terbaiknya adalah <strong
data-md-type="double_emphasis">menggunakan `overscroll-behavior` tidak
memengaruhi kinerja halaman</strong> seperti peretasan yang disebutkan dalam
intro!

Properti mengambil tiga kemungkinan nilai:

1. **otomatis** - Default. Gulungan yang berasal dari elemen dapat merambat ke
elemen leluhur.

- **mengandung** - mencegah chaining gulir. Gulungan tidak merambat ke leluhur
tetapi efek lokal di dalam simpul diperlihatkan. Misalnya, efek cahaya
overscroll pada Android atau efek rubberbanding pada iOS yang memberi tahu
pengguna ketika mereka telah mencapai batas gulir. **Catatan** : menggunakan
`overscroll-behavior: contain` pada elemen `html` mencegah tindakan navigasi
overscroll.
- **tidak ada** - sama dengan `contain` tetapi juga mencegah efek overscroll di
dalam simpul itu sendiri (mis. Android overscroll glow atau iOS rubberbanding).

Catatan: `overscroll-behavior` juga mendukung singkatan untuk
`overscroll-behavior-x` dan `overscroll-behavior-y` jika Anda hanya ingin
mendefinisikan perilaku untuk sumbu tertentu.

Mari selami beberapa contoh untuk melihat bagaimana menggunakan
`overscroll-behavior` .

## Cegah gulungan agar tidak keluar dari elemen posisi tetap {: #fixedpos }

### Skenario chatbox {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>Konten di bawah jendela obrolan juga menggulung :(</figcaption>
</figure>

Pertimbangkan kotak obrolan yang diposisikan tetap yang berada di bagian bawah
halaman. Tujuannya adalah bahwa chatbox adalah komponen mandiri dan bahwa itu
menggulir secara terpisah dari konten di belakangnya. Namun, karena rantai
gulir, dokumen mulai bergulir segera setelah pengguna menyentuh pesan terakhir
dalam riwayat obrolan.

Untuk aplikasi ini, lebih tepat untuk memiliki gulungan yang berasal dari kotak
obrolan tetap dalam obrolan. Kita dapat mewujudkannya dengan menambahkan
`overscroll-behavior: contain` ke elemen yang menyimpan pesan obrolan:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Pada dasarnya, kami membuat pemisahan logis antara konteks gulir kotak obrolan
dan halaman utama. Hasil akhirnya adalah bahwa halaman utama tetap diletakkan
ketika pengguna mencapai bagian atas / bawah dari riwayat obrolan. Gulungan yang
dimulai di kotak obrolan tidak menyebar.

### Skenario hamparan halaman {: #overlay }

Variasi lain dari skenario "underscroll" adalah ketika Anda melihat konten
bergulir di balik **overlay posisi tetap** . `overscroll-behavior` mati gratis
sudah beres! Peramban ini berusaha membantu tetapi akhirnya membuat situs
tersebut terlihat bermasalah.

**Contoh** - modal dengan dan tanpa `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Sebelum</b> : konten halaman bergulir di bawah
overlay.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Setelah</b> : konten halaman tidak menggulir di bawah
overlay.</figcaption>
  </div>
</figure>

## Menonaktifkan pull-to-refresh {: #disablp2r }

**Mematikan aksi pull-to-refresh adalah satu baris CSS** . Cegah pengguliran
scroll pada seluruh elemen yang mendefinisikan viewport. Dalam kebanyakan kasus,
itu `<html>` atau `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Dengan tambahan sederhana ini, kami memperbaiki animasi tarik ganda untuk
menyegarkan di [demo chatbox](https://ebidel.github.io/demos/chatbox.html) dan
bisa, menerapkan efek khusus yang menggunakan animasi pemuatan yang lebih rapi.
Seluruh kotak masuk juga kabur saat kotak masuk disegarkan:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Sebelum</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Setelah</figcaption>
  </div>
</figure>

Berikut cuplikan [kode
lengkap](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Menonaktifkan efek overscroll glow dan rubberbanding {: #disableglow }

Untuk menonaktifkan efek pentalan saat mengenai batas gulir, gunakan
`overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Sebelum</b> : memukul batas gulir menunjukkan
cahaya.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Setelah</b> : cahaya dinonaktifkan.</figcaption>
  </div>
</figure>

Catatan: Ini masih akan mempertahankan navigasi geser ke kiri / kanan. Untuk
mencegah navigasi, Anda dapat menggunakan `overscroll-behavior-x: none` . Namun,
ini [masih diterapkan](https://crbug.com/762023) di Chrome.

## Demo penuh {: #demo }

Menyatukan semuanya, [demo kotak
obrolan](https://ebidel.github.io/demos/chatbox.html) lengkap menggunakan
`overscroll-behavior` untuk membuat animasi tarik-untuk-menyegarkan kustom dan
menonaktifkan gulir agar tidak keluar dari widget chatbox. Ini memberikan
pengalaman pengguna yang optimal yang sulit dicapai tanpa `overscroll-behavior`
CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Lihat demo</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Sumber</a></figcaption>
</figure>

<br>
