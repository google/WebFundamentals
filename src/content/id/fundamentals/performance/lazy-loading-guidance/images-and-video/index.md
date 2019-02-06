project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Jika situs Anda memiliki banyak gambar dan video, tetapi Anda tidak ingin mengurangi salah satu dari itu, lazy loading mungkin menjadi teknik yang Anda butuhkan untuk meningkatkan waktu pemuatan halaman awal dan menurunkan payload per halaman.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# Menjalankan Lazy Loading Gambar dan Video {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

Bagian
[gambar](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)
dan [video](http://beta.httparchive.org/reports/page-weight#bytesVideo) dalam
payload khusus situs dapat menjadi signifikan. Sayangnya, stakeholder
project mungkin tidak mau memotong resource media apa pun dari aplikasi
yang ada. Jalan buntu semacam ini membuat frustrasi, terutama ketika semua pihak
yang terlibat ingin meningkatkan kinerja situs, tetapi tidak bisa menyetujui cara mencapai tujuan itu.
Untungnya, lazy loading adalah solusi yang mempersingkat payload halaman awal_dan_
waktu pemuatan, tetapi tidak mengecilkan konten.

## Apa itu lazy loading?

Lazy loading adalah teknik yang menunda pemuatan dari resource yang tidak penting pada waktu
pemuatan halaman. Sebagai gantinya, resource yang tidak penting dimuat pada saat yang
dibutuhkan. Di mana gambar terkait, "tidak penting" sering diartikan sebagai
"off-screen". Jika Anda menggunakan Lighthouse dan memeriksa peluang untuk
peningkatan, Anda mungkin telah melihat beberapa panduan di bagian ini dalam bentuk
[audit Gambar
Offscreen](/web/tools/lighthouse/audits/offscreen-images):

<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Screenshot Audit
Gambar Offscreen di Lighthouse.">
  <figcaption><b>Gambar 1</b>. Salah satu audit kinerja Lighthouse adalah untuk
mengidentifikasi gambar off screen, yang merupakan kandidat untuk lazy loading.</figcaption>
</figure>

Anda mungkin sudah melihat lazy loading saat diimplementasikan, dan akan terjadi seperti
ini:

- Anda tiba di suatu halaman, dan mulai men-scroll saat Anda membaca konten.
- Pada titik tertentu, Anda men-scroll gambar placeholder ke dalam viewport.
- Gambar pengganti tiba-tiba diganti oleh gambar akhir.

Contoh dari lazy loading gambar dapat ditemukan pada platform penerbitan populer
[Medium](https://medium.com/), yang memuat gambar placeholder yang ringan ke
pemuatan halaman, dan menggantinya dengan gambar yang telah menjalankan lazy loading saat di-scroll ke
viewport.

<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="Screenshot situs
Medium dalam penjelajahan, menunjukkan lazy loading saat diimplementasikan. Placeholder
blurry ada di sebelah kiri, dan resource yang dimuat ada di sebelah kanan.">
  <figcaption><b>Gambar 2</b>. Contoh lazy loading gambar saat diimplementasikan. Gambar
placeholder dimuat saat memuat halaman (kiri), dan ketika di-scroll ke
viewport, gambar akhir dimuat pada saat dibutuhkan.</figcaption>
</figure>

Jika Anda tidak terbiasa dengan lazy loading, Anda mungkin bertanya-tanya seberapa bermanfaat
teknik ini, dan apa manfaatnya. Baca terus untuk mengetahui!

## Mengapa menjalankan lazy loading gambar atau video, bukan langsung _memuatnya_ saja?

Karena mungkin Anda memuat sesuatu yang tidak pernah dilihat pengguna. Ini
bermasalah karena beberapa alasan:

- Memboroskan data. Pada koneksi yang tidak diukur, hal ini bukan hal terburuk yang bisa
terjadi (walaupun Anda bisa menggunakan bandwidth berharga itu untuk mendownload
resource lain yang memang akan dilihat oleh pengguna). Namun, pada paket
data yang terbatas, memuat sesuatu yang tidak pernah dilihat pengguna bisa menjadi
pemborosan uang mereka.
- Memboroskan waktu pemrosesan, baterai, dan resource sistem lainnya. Setelah resource
media didownload, browser harus mendekodekannya dan menyajikan kontennya di dalam
viewport.

Saat menjalankan lazy loading gambar dan video, kita mengurangi waktu pemuatan halaman awal, berat
halaman awal, dan penggunaan resource sitem, yang semuanya memiliki dampak positif pada
kinerja. Dalam panduan ini, kita akan membahas beberapa teknik dan menawarkan panduan untuk menajalankan
lazy loading gambar dan video, serta [daftar pendek library yang umum digunakan
](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries).

## Menjalankan lazy loading gambar

Mekanisme lazy loading gambar sederhana secara teori, tetapi detailnya sebenarnya
agak rewel. Selain itu, ada dua kasus penggunaan berbeda yang keduanya dapat
mendapat manfaat dari pemuatan malas. Pertama-tama mari kita mulai dengan menjalankan lazy loading gambar inline di
HTML.

### Gambar inline

Kandidat lazy loading yang paling umum adalah gambar seperti yang digunakan dalam elemen `<img>`.
Saat menjalankan lazy loading pada elemen `<img>`, kita menggunakan JavaScript untuk memeriksa apakah elemen tersebut ada di
viewport. Jika iya, atribut `src` (dan terkadang `srcset`) yang diisi dengan
URL ke konten gambar yang diinginkan.

#### Menggunakan intersection observer

Jika Anda sudah menulis kode lazy loading sebelumnya, Anda mungkin sudah menyelesaikan tugas Anda
dengan menggunakan pengendali peristiwa seperti `scroll` atau `resize`. Meskipun pendekatan ini adalah
yang paling kompatibel di seluruh browser, browser modern menawarkan cara yang lebih berkinerja dan
efisien untuk mengecek visibilitas elemen melalui [
API intersection observer](/web/updates/2016/04/intersectionobserver).

Note: Intersection observer tidak didukung di semua browser. Jika kompatibilitas
lintas browser sangat penting, pastikan untuk membaca [bagian
berikutnya](#using_event_handlers_the_most_compatible_way), yang menunjukkan kepada Anda cara
menjalankan lazy loading gambar dengan menggunakan lebih sedikit performan (tetapi lebih kompatibel!) scroll dan ubah ukuran
pengendali peristiwa.

Intersection observer lebih mudah digunakan dan dibaca daripada kode yang mengandalkan berbagai
pengendali peristiwa, karena developer hanya perlu mendaftarkan observer ke elemen
pengawasan daripada menulis kode deteksi visibilitas elemen yang membosankan. Yang
perlu dilakukan pengembang adalah memutuskan apa yang harus dilakukan ketika suatu elemen
tidak terlihat. Mari kita asumsikan pola markup dasar ini untuk elemen `<img>`
yang menjalankan lazy loading:

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="Saya adalah sebuah gambar!">
```

Ada tiga bagian yang relevan dari markup ini yang harus kita fokuskan:

1. Atribut `class`, yang elemennya akan kita pilih di
JavaScript.
2. Atribut `src`, yang mereferensikan gambar placeholder yang akan muncul saat
halaman pertama kali dimuat.
3. Atribut `data-src` dan `data-srcset`, yang merupakan atribut placeholder
yang berisi URL untuk gambar yang akan dimuat setelah elemen ada di viewport.

Sekarang mari kita lihat bagaimana kita dapat menggunakan intersection observer di JavaScript untuk menjalankan lazy loading
gambar menggunakan pola markup ini:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

Pada peristiwa `DOMContentLoaded` dokumen, skrip ini menanyakan DOM untuk semua elemen
`<img>` dengan class `lazy`. Jika intersection observer tersedia,
kita membuat observer baru yang menjalankan callback ketika elemen `img.lazy` masuk ke
viewport. Lihat [contoh
CodePen ini](https://codepen.io/malchata/pen/YeMyrQ) untuk melihat kode ini diimplementasikan.

Note: Kode ini memanfaatkan metode intersection observer yang bernama
`isIntersecting`, yang tidak tersedia pada implementasi Edge 15's intersection observer
. Karena itulah, kode lazy loading di atas (dan snippet kode serupa lainnya
) akan gagal. Konsultasikan [masalah GitHub
ini](https://github.com/w3c/IntersectionObserver/issues/211) untuk panduan tentang
kondisi deteksi fitur yang lebih lengkap.

Namun, kelemahan dari intersection observer adalah bahwa [meskipun memiliki dukungan
yang baik di antara browser](https://caniuse.com/#feat=intersectionobserver), intersection observer ini
tidak universal. [Anda perlu melakukan
polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
browser yang tidak mendukungnya, atau seperti yang disarankan oleh kode di atas, mendeteksi apakah itu
tersedia dan kemudian kembali ke metode yang lebih lama dan lebih kompatibel.

#### Menggunakan pengendali peristiwa (cara yang paling kompatibel)

Saat Anda _harus_ menggunakan intersection observer untuk lazy loading, persyaratan
aplikasi Anda mungkin sedemikian rupa sehingga kompatibilitas browser sangat penting. [Anda _dapat_
polyfill dukungan
intersection observer](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) (dan
ini akan lebih mudah), tetapi Anda juga dapat kembali ke kode menggunakan
[`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll),
[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize), dan
mungkin
[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)
pengendali peristiwa dalam konser dengan
[`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
untuk menentukan apakah suatu elemen ada di viewport.

Dengan asumsi pola markup yang sama dari sebelumnya, JavaScript berikut menyediakan
fungsionalitas lazy loading:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

Kode ini menggunakan `getBoundingClientRect` dalam pengendali peristiwa `scroll` untuk memeriksa apakah
ada elemen `img.lazy` di viewport. Panggilan `setTimeout` digunakan untuk
menghapus pemrosesan, dan variabel `active` berisi status pemrosesan yang
digunakan untuk membatasi panggilan fungsi. Karena gambar di-lazy loading, gambar
tersebut dihapus dari array elemen. Ketika array elemen mencapai `length` dari `0`,
kode pengendali peristiwa creoll dihapus. Lihat kode ini diimplementasikan di [contoh
CodePen ini](https://codepen.io/malchata/pen/mXoZGx).

Sementara kode ini diimplementasikan di hampir semua browser, code tersebut memiliki potensi masalah
kinerja dalam panggilan `setTimeout` berulang dapat menjadi sia-sia, bahkan jika kode
di dalamnya diperlambat. Dalam contoh ini, pemeriksaan sedang dijalankan setiap 200
milidetik pada scroll dokumen atau ukuran jendela terlepas dari apakah ada
gambar di viewport atau tidak. Selain itu, pekerjaan membosankan untuk melacak berapa banyak
elemen diserahkan pada lazy load dan melepaskan pengendali peristiwa scroll diserahkan
pada developer.

Sederhananya: Gunakan intersection observer jika memungkinkan, dan kembali ke pengendali
peristiwa jika kompatibilitas seluas mungkin adalah persyaratan aplikasi
yang penting.

### Gambar di CSS

Walaupun tag `<img>` adalah cara paling umum untuk menggunakan gambar pada halaman web, gambar
juga dapat dipanggil melalui properti CSS
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
(dan properti lainnya). Tidak seperti `<img>` elemen yang memuat terlepas dari
visibilitasnya, perilaku pemuatan gambar dalam CSS dilakukan dengan lebih banyak
spekulasi. Ketika [model
dokumen dan objek CSS](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
dan [hierarki
render](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)
dibuat, browser memeriksa bagaimana CSS diterapkan pada dokumen sebelum
meminta resource eksternal. Jika browser telah menentukan aturan CSS
yang melibatkan resource eksternal tidak sesuai untuk dokumen seperti yang saat ini
dibangun, browser tidak memintanya.

Perilaku spekulatif ini dapat digunakan untuk menunda pemuatan gambar dalam CSS dengan
menggunakan JavaScript untuk menentukan kapan suatu elemen berada dalam viewport, dan
selanjutnya menerapkan class pada elemen tersebut yang menerapkan penataan gaya
gambar latar. Hal ini menyebabkan gambar didownload pada saat dibutuhkan
bukan pada saat pemuatan awal. Misalnya, mari kita ambil elemen yang berisi
large hero background image:

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

Elemen `div.lazy-background` biasanya akan berisi hero background
image yang dipanggil oleh beberapa CSS. Namun, dalam contoh lazy loading ini, kita dapat memisahkan
properti `background-image` elemen `div.lazy-background` melalui class `visible`
yang akan kita tambahkan ke elemen ketika berada di viewport:

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

Dari sini, kita akan menggunakan JavaScript untuk memeriksa apakah elemen tersebut ada di viewport (dengan
intersection observer!), Dan menambahkan class `visible` ke elemen
`div.lazy-background` pada waktu itu, yang memuat gambar:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

Seperti yang ditunjukkan sebelumnya, Anda harus memastikan Anda menyediakan pengganti atau
polyfill untuk intersection observer karena tidak semua browser saat ini mendukungnya.
Lihat [demo CodePen ini](https://codepen.io/malchata/pen/wyLMpR) untuk melihat
kode ini diimplementasikan.

## Menjalankan lazy loading video

Seperti halnya elemen gambar, kita juga bisa menjalankan lazy loading untuk video. Ketika menjalankan lazy loading video dalam
keadaan normal, kita melakukannya menggunakan elemen `<video>` (meskipun [
metode alternatif menggunakan
`<img>`](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/) telah
muncul dengan implementasi yang terbatas). _Bagaimana_ kita menjalankan lazy loading `<video>` bergantung pada
kasus penggunaan. Mari kita bahas beberapa skenario yang masing-masing memerlukan
solusi yang berbeda.

### Untuk video yang tidak autoplay

Untuk video yang pemutarannya dimulai oleh pengguna (mis., video yang _tidak_
autoplay), menentukan [atribut`preload`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
di elemen `<video>` yang mungkin diinginkan:

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Di sini, kita menggunakan atribut `preload` dengan nilai `none` untuk mencegah browser
melakukan pramuat _data_ video apa pun. Untuk menempati ruang tersebut, kita menggunakan atribut `poster`
untuk memberikan elemen `<video>` pada placeholder. Alasannya adalah bahwa
perilaku default untuk memuat video dapat bervariasi dari browser ke browser:

- Di Chrome, default untuk `preload` dulu `auto`, tetapi pada Chrome 64, sekarang
default menjadi `metadata`. Meski begitu, pada versi desktop Chrome, sebagian
video dapat dimuat menggunakan header `Content-Range`. Firefox, Edge, dan
Internet Explorer 11 berperilaku serupa.
- Seperti halnya Chrome di desktop, Safari versi 11.0 desktop akan menjalankan pramuat untuk rentang
video. Dalam versi 11.2 (saat ini versi Tech Preview Safari), hanya
metadata video yang di-pramuat. [Di Safari di iOS, video tidak pernah
di-pramuat](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9).
- Saat [mode Penghemat Data](https://support.google.com/chrome/answer/2392284)
diaktifkan, `preload` secara default menjadi `none`.

Karena perilaku default browser sehubungan dengan `preload` tidak diatur,
menjadi eksplisit mungkin pilihan terbaik bagi Anda. Dalam kasus ini di mana pengguna memulai
pemutaran, menggunakan `preload="none"` adalah cara termudah untuk menunda pemuatan video di
semua platform. Atribut `preload` bukan satu-satunya cara untuk menunda pemuatan
konten video. [_Putar Ulang Cepat dengan Pramuat
Video_](/web/fundamentals/media/fast-playback-with-video-preload) dapat memberi Anda
beberapa ide dan insight untuk bekerja dengan pemutaran video dalam JavaScript.

Sayangnya, itu tidak terbukti berguna ketika kita ingin menggunakan video sebagai ganti
GIF animasi, yang akan kita bahas selanjutnya.

### Untuk video yang bertindak sebagai pengganti GIF animasi

Sementara GIF animasi dapat digunakan secara luas, mereka setara dengan video dalam
beberapa aspek, terutama dalam ukuran file output. GIF animasi dapat mencapai
hingga beberapa megabyte data. Video dengan kualitas visual serupa cenderung
jauh lebih kecil.

Menggunakan elemen `<video>` sebagai pengganti GIF animasi tidak akan
semulus elemen `<img>`. Yang melekat dalam GIF animasi adalah
tiga perilaku ini:

1. Mereka diputar secara otomatis saat dimuat.
2. Mereka berputar terus menerus ([meskipun itu tidak selalu
terjadi](https://davidwalsh.name/prevent-gif-loop)).
3. Mereka tidak memiliki trek audio.

Mencapai ini dengan elemen `<video>` terlihat seperti ini:

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Atribut `autoplay`, `muted`, dan `loop` sedah cukup jelas.
[`playsinline` diperlukan agar pemutaran otomatis terjadi di
iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/). Sekarang kita memiliki
pengganti video-sebagai-GIF yang dapat digunakan di seluruh platform. Tapi bagaimana
cara menjalankan lazy loading? [Chrome akan menjalankan lazy loading video untuk
Anda](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg),
tetapi Anda tidak dapat mengandalkan semua browser untuk memberikan perilaku yang dioptimalkan ini.
Bergantung pada audience Anda dan persyaratan aplikasi, Anda mungkin perlu
mengatasi masalah Anda sendiri. Untuk memulai, ubah markup `<video>` Anda sesuai dengan:

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Anda akan melihat penambahan [attribut`poster`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster),
yang memungkinkan Anda menentukan placeholder untuk menempati ruang elemen `<video>` hingga
video di-lazy load. Seperti halnya contoh lazy loading `<img>` dari
sebelumnya, kita menyimpan URL video di atribut `data-src` pada setiap elemen `<source>`
. Dari sana, kita akan menggunakan beberapa JavaScript yang mirip dengan
contoh lazy loading gambar berdasarkan intersection observer sebelumnya:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

Ketika menjalankan lazy loading elemen `<video>`, kita perlu mengulangi semua elemen turunan
`<source>` dan membalik atribut `data-src` menjadi `src`. Setelah
selesai melakukannya, kita perlu memicu pemuatan video dengan memanggil
metode `load` elemen, setelah itu media akan mulai memutar secara otomatis
per atribut `autoplay`.

Dengan menggunakan metode ini, kita memiliki solusi video yang mengemulasi perilaku GIF animasi,
tapi tidak menimbulkan penggunaan data intensif yang sama seperti GIF animasi, dan kita dapat
menjalankan lazy loading pada konten itu.

## Menjalankan lazy loading library

Jika Anda tidak begitu peduli tentang _bagaimana_ cara kerja lazy loading dalam sistem dan hanya
ingin memilih library dan pergi (dan tidak masalah dengan itu!), ada banyak
pilihan untuk dipilih. Banyak library menggunakan pola markup yang mirip dengan yang
ditunjukkan dalam panduan ini. Berikut adalah beberapa library lazy loading yang mungkin
berguna:

- [lazysizes](https://github.com/aFarkas/lazysizes) adalah library lazy
loading berfitur lengkap yang menjalankan lazy loading gambar dan iframe. Pola yang digunakan cukup
mirip dengan contoh kode yang ditampilkan di sini karena secara otomatis mengikat ke class
`lazyload` pada elemen `<img>`, dan mengharuskan Anda untuk menentukan URL gambar dalam atribut
`data-src` dan/atau `data-srcset`, yang kontennya ditukar
menjadi atribut `src` dan/atau `srcset`, secara berurutan. Pola ini menggunakan intersection
observer (yang dapat Anda polyfill), dan dapat diperpanjang dengan [sejumlah
plugin](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo) untuk
melakukan hal-hal seperti menjalankan lazy load video.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) adalah opsi
super ringan yang hanya menggunakan intersection observer. Karena itu, pola sangat berkinerja,
tapi perlu di-polyfill sebelum Anda bisa menggunakannya di browser yang lebih lama.
- [blazy](https://github.com/dinbror/blazy) adalah pilihan lain yang menyebut
dirinya sebagai lazy loader ringan (beratnya 1,4 KB). Seperti lazysizes,
blazy tidak memerlukan utilitas pihak ketiga mana pun untuk dimuat, dan berfungsi untuk IE7+.
Sayangnya, blazy tidak menggunakan intersection observer.
- [yall.js](https://github.com/malchata/yall.js) adalah library yang saya tulis yang menggunakan
IntersectionObserver dan beralih kembali ke pengendali peristiwa. Ini kompatibel dengan IE11
dan browser utama.
- Jika Anda mencari library lazy loading yang spesifik-React, Anda dapat mempertimbangkan
[react-lazyload](https://github.com/jasonslyvia/react-lazyload). Meskipun tidak
menggunakan intersection observer, itu _menyediakan_ metode lazy
loading gambar yang familier bagi mereka yang terbiasa mengembangkan aplikasi dengan React.

Masing-masing library lazy loading ini didokumentasikan dengan baik, dengan banyak pola
markup untuk berbagai upaya lazy loading Anda. Jika Anda bukan orang yang suka mengutak-atik,
pilih library dan pergi. Itu hanya akan membutuhkan sedikit usaha.

## Apa yang bisa salah

Sementara lazy loading gambar dan video memiliki
manfaat kinerja yang positif dan terukur, ini bukanlah tugas yang bisa dianggap enteng. Jika Anda salah,
ada konsekuensi yang tidak diinginkan. Karena itu, ingatlah beberapa
hal penting berikut ini:

### Pikirkan fold-nya

Mungkin tergoda untuk menjalankan lazy loading setiap resource media tunggal pada halaman dengan
JavaScript, tetapi Anda harus menahan godaan ini. Apa pun yang berada di atas
fold seharusnya tidak di-lazy load. Resource semacam itu harus dianggap aset
penting, dan karenanya harus dimuat secara normal.

Argumen utama untuk memuat resource media penting dengan cara yang biasa sebagai pengganti
lazy loading adalah bahwa lazy loading menunda pemuatan reasurce tersebut sampai
setelah DOM bersifat interaktif ketika skrip telah selesai memuat dan memulai
eksekusi. Untuk gambar di bawah fold, gambar itu baik-baik saja, tetapi akan lebih cepat untuk
memuat resource kritis di atas fold dengan elemen `<img>` standar.

Tentu saja, di mana letak fold tidak begitu jelas akhir-akhir ini saat situs web
dilihat pada begitu banyak layar dengan berbagai ukuran. Apa yang ada di atas fold pada laptop
mungkin terletak _di bawah_ perangkat seluler. Tidak ada saran ampuh untuk
mengatasi ini secara optimal dalam setiap situasi. Anda harus melakukan
inventarisasi aset penting halaman Anda, dan memuat gambar-gambar tersebut dengan mode
khusus.

Selain itu, Anda mungkin tidak ingin terlalu ketat tentang garis fold sebagai
ambang batas untuk memicu lazy loading. Mungkin lebih ideal untuk keperluan Anda untuk
membuat zona buffering agak jauh di bawah flod sehingga gambar mulai
dimuat dengan baik sebelum pengguna men-scrollnya ke dalam viewport. Misalnya,
API intersection observer memungkinkan Anda untuk menentukan properti `rootMargin` dalam
objek pilihan saat Anda membuat instance `IntersectionObserver` baru. Cara ini
secara efektif memberikan elemen buffering, yang memicu perilaku lazy loading sebelum
elemen berada di viewport:

```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin: "0px 0px 256px 0px"
});
```

Jika nilai untuk `rootMargin` terlihat mirip dengan nilai yang Anda tentukan untuk properti
`margin` CSS, karena memang demikian! Dalam hal ini, kita memperluas
margin bawah dari elemen yang mengamati (browser viewport secara default, tetapi
ini dapat diubah menjadi elemen tertentu menggunakan properti `root`) dengan 256
piksel. Itu berarti fungsi callback akan dieksekusi ketika elemen gambar
berukuran 256 piksel viewport, yang berarti bahwa gambar akan mulai dimuat
sebelum pengguna benar-benar melihatnya.

Untuk mendapat efek yang sama menggunakan kode penanganan peristiwa scroll, cukup sesuaikan centang
`getBoundingClientRect` untuk memasukkan buffer, dan Anda akan mendapatkan
efek yang sama di browser yang tidak mendukung intersection observer.

### Pergeseran tata letak dan placeholder

Lazy loading media dapat menyebabkan pergeseran tata letak jika placeholder tidak digunakan.
Perubahan ini dapat membingungkan bagi pengguna dan memicu
operasi tata letak DOM yang mahal yang menggunakan resource sistem dan berkontribusi pada kemacetan. Setidaknya,
pertimbangkan menggunakan placeholder warna solid yang menempati dimensi yang sama dengan
gambar sasaran, atau teknik seperti
[LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) atau
[SQIP](https://github.com/technopagan/sqip) yang menunjukkan konten media
item sebelum dimuat.

Untuk tag `<img>`, `src` pada awalnya harus menunjuk ke tempat placeholder sampai
atribut itu diupdate dengan URL gambar akhir. Gunakan atribut `poster` dalam elemen
`<video>` untuk menunjuk ke gambar placeholder. Selain itu, gunakan atribut `width` dan
`height` pada tag `<img>` dan `<video>`. Ini memastikan bahwa
transisi dari placeholder ke gambar akhir tidak akan mengubah ukuran yang diberikan
dari elemen saat media dimuat.

### Penundaan decoding gambar

Memuat gambar besar dalam JavaScript dan meletakkannya ke DOM dapat mengikat
utas utama, menyebabkan antarmuka pengguna menjadi tidak responsif untuk waktu singkat
saat decoding terjadi. [Secara acak menyinkronkan gambar menggunakan metode `decode`
](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)
sebelum memasukkannya ke DOM dapat mengurangi jenis kemacetan ini, tetapi
berhati-hatilah: Ini belum tersedia di mana-mana, dan menambah kompleksitas logika lazy
loading. Jika Anda ingin menggunakannya, Anda harus memeriksanya. Di bawah ini menunjukkan
bagaimana Anda dapat menggunakan `Image.decode()` dengan pengganti:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

Lihat [link CodePen ini](https://codepen.io/malchata/pen/WzeZGW) untuk melihat
kode yang mirip dengan contoh ini dalam implementasi. Jika sebagian besar gambar Anda cukup kecil,
ini mungkin tidak banyak membantu Anda, tetapi tentu saja dapat membantu mengurangi kemacetan ketika
menjalankan lazy loading gambar besar secara besar-besaran dan memasukkannya ke dalam DOM.

### Saat sesuatu tidak dimuat

Terkadang resource media akan gagal dimuat karena satu atau beberapa masalah dan error
terjadi. Kapan ini bisa terjadi? Itu tergantung, tetapi inilah satu skenario hipotetis
untuk Anda: Anda memiliki kebijakan caching HTML untuk periode waktu yang singkat (mis., lima
menit), dan pengguna mengunjungi situs _atau pengguna membiarkan tab basi terbuka untuk
periode waktu yang lama (mis., beberapa jam) dan kembali untuk membaca konten Anda.
Pada titik tertentu dalam proses ini, pemindahan terjadi. Selama penyebaran ini,
nama resource gambar berubah karena versi berbasis hash, atau dihapus
sama sekali. Pada saat pengguna menjalankan lazy loading gambar, resource
tidak tersedia, lalu gagal.

Meskipun ini adalah kejadian yang relatif jarang, mungkin Anda harus memiliki rencana
cadangan jika lazy loading gagal. Untuk gambar, solusi seperti itu mungkin terlihat seperti
ini:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

Apa yang Anda lakukan jika terjadi error bergantung pada aplikasi Anda. Misalnya
, Anda dapat mengganti area tempat placeholder gambar dengan tombol yang memungkinkan
pengguna mencoba memuat gambar lagi, atau cukup menampilkan pesan error
di area tempat placeholder gambar.

Skenario lain juga bisa muncul. Apa pun yang Anda lakukan, bukanlah hal buruk untuk
memberi tahu pengguna ketika error terjadi, dan mungkin memberi mereka tindakan untuk
dilakukan jika terjadi lebih buruk.

### Ketersediaan JavaScript

Jangan asumsikan bahwa JavaScript selalu tersedia. Jika Anda akan
menjalankan lazy loading gambar, pertimbangkan untuk menawarkan markup `<noscript>` yang akan menampilkan gambar
jika JavaScript tidak tersedia. Contoh penggantian paling sederhana yang mungkin melibatkan
elemen `<noscript>` untuk menyajikan gambar jika JavaScript dinonaktifkan:

```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="Saya adalah sebuah gambar!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="Saya adalah sebuah gambar!">
</noscript>
```

Jika JavaScript dinonaktifkan, pengguna akan melihat _kedua_ gambar placeholder dan
gambar yang berisi elemen `<noscript>`. Untuk menyiasatinya, kita dapat menempatkan
class `no-js` pada tag `<html>` seperti:

```html
<html class="no-js">
```

Kemudian kita menempatkan satu baris skrip inline di `<head>` sebelum lembar gaya apa pun
diminta melalui tag `<link>` yang menghapus class `no-js` dari elemen `<html>`
jika JavaScript aktif:

```html
<script>document.documentElement.classList.remove("no-js");</script>
```

Akhirnya, kita dapat menggunakan beberapa CSS untuk menyembunyikan elemen dengan class lazy ketika
JavaScript tidak tersedia seperti:

```css
.no-js .lazy {
  display: none;
}
```

Ini tidak mencegah gambar placeholder dari pemuatan, tetapi hasilnya lebih
diinginkan. Pengguna JavaScript-nya dinonaktifkan mendapatkan sesuatu yang lebih dari sekadar gambar
placeholder, yang lebih baik daripada placeholder dan tidak ada konten gambar yang berarti sama
sekali.

## Kesimpulan

Jika digunakan dengan hati-hati, lazy loading gambar dan video dapat mempersingkat waktu
pemuatan awal dan payload halaman secara signifikan di situs Anda. Pengguna tidak akan memicu aktivitas
jaringan yang tidak perlu dan biaya pemrosesan resource media yang mungkin tidak pernah mereka lihat, tetapi mereka
masih dapat melihat resource itu jika mereka mau.

Selama teknik peningkatan kinerja berjalan, lazy loading cukup
kontroversial. Jika Anda memiliki banyak gambar inline di situs Anda, ini
cara yang sangat baik untuk mengurangi hasil download yang tidak perlu. Pengguna situs Anda dan
para stakeholder project akan menghargai itu!

_Terima kasih khusus kepada [François
Beaufort](/web/resources/contributors/beaufortfrancois), Dean Hume, [Ilya
Grigork](/web/resources/contributors/ilyagrigorik), [Paul
Irish](/web/resources/contributors/paulirish), [Addy
Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), dan Martin Schierle atas
masukan mereka yang sangat berharga, yang secara signifikan meningkatkan kualitas artikel ini._
