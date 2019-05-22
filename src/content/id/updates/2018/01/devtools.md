project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Apa yang Baru Di DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Fitur baru yang datang ke DevTools di Chrome 65 meliputi:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Baca terus, atau tonton versi video dari catatan rilis ini, di bawah ini.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Periksa versi Chrome apa yang Anda jalankan di `chrome://version` . Jika Anda menjalankan versi sebelumnya, fitur-fitur ini tidak akan ada. Jika Anda menjalankan versi yang lebih baru, fitur-fitur ini mungkin telah berubah. Pembaruan otomatis Chrome ke versi utama baru setiap 6 minggu.

## Local Overridees {: #overrides }

**Local Overrides** memungkinkan Anda membuat perubahan di DevTools, dan menjaga perubahan tersebut di seluruh beban halaman. Sebelumnya, perubahan apa pun yang Anda buat di DevTools akan hilang saat Anda memuat ulang halaman.
**Local Override** berfungsi untuk sebagian besar jenis file, dengan beberapa pengecualian. Lihat [Limitations](#overrides-limitations) .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Bagaimana itu bekerja:

* Anda menentukan direktori di mana DevTools harus menyimpan perubahan.
* Saat Anda membuat perubahan di DevTools, DevTools menyimpan salinan file yang diubah ke direktori Anda.
* Saat Anda memuat ulang halaman, DevTools melayani file lokal yang dimodifikasi, alih-alih sumber daya jaringan.

Untuk mengatur **Local Overrides**:

1. Buka panel **Sources**. 1. Buka tab **Mengganti**.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Klik **Pengaturan Mengganti**. 1. Pilih direktori mana Anda ingin menyimpan perubahan Anda. 1. Di bagian atas viewport Anda, klik **Allow** untuk memberi DevTools akses baca dan tulis ke direktori. 1. Buat perubahan Anda.

### Batasan {: #overrides-limitations }

* DevTools tidak menyimpan perubahan yang dibuat di **DOM Tree** dari panel **Elements**. Edit HTML di panel **Sumber** sebagai gantinya.
* Jika Anda mengedit CSS di **Styles** pane, dan sumber CSS itu adalah file HTML, DevTools tidak akan menyimpan perubahan. Edit file HTML di panel **Sources**.

### Fitur terkait {: #overrides-related }

* [Workspaces][WS] . DevTools secara otomatis memetakan sumber daya jaringan ke repositori lokal. Setiap kali Anda membuat perubahan di DevTools, perubahan itu juga akan disimpan ke repositori lokal Anda.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## Tab Perubahan {: #changes }

Lacak perubahan yang Anda buat secara lokal di DevTools melalui tab **Perubahan** yang baru.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## Alat aksesibilitas baru {: #a11y }

Gunakan panel **Accessibility** baru untuk memeriksa properti aksesibilitas suatu elemen, dan periksa rasio kontras elemen teks di **Color Picker** untuk memastikan bahwa mereka dapat diakses oleh pengguna dengan gangguan penglihatan atau warna rendah -visi kekurangan.

### Accessibility pane {: #a11y-pane }

Gunakan **Accessibility** pane pada panel **Elements** untuk menyelidiki properti aksesibilitas dari elemen yang saat ini dipilih.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Lihat A11ycast Rob Dodson tentang pelabelan di bawah ini untuk melihat panel **Accessibility** dalam tindakan.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Contrast ratio dalam Color Picker {: #contrast }

[Color Picker][CP] sekarang menunjukkan rasio kontras elemen teks. Meningkatkan rasio kontras elemen teks membuat situs Anda lebih mudah diakses oleh pengguna dengan gangguan penglihatan rendah atau kekurangan penglihatan warna. Lihat [Color and contrast][contrast] untuk mempelajari lebih lanjut tentang bagaimana rasio kontras mempengaruhi aksesibilitas.

Meningkatkan kontras warna elemen teks Anda membuat situs Anda lebih bermanfaat bagi <i>semua</i> pengguna. Dengan kata lain, jika teks Anda berwarna abu-abu dengan latar belakang putih, sulit bagi siapa pun untuk membaca.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

Di **Gambar 5**, dua tanda centang di samping ** 4,61 ** berarti bahwa elemen ini memenuhi [enhanced recommended contrast ratio (AAA)][enhanced]{:.external} . Jika hanya ada satu tanda centang, itu berarti ia bertemu dengan [minimum recommended contrast ratio (AA)][minimum]{:.external} .

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Klik ** Tampilkan Lebih Banyak **! [Show More][SM]{:.cdt-inl} untuk memperluas bagian **Contrast Ratio**. Garis putih di kotak **Color Spectrum** menunjukkan batas antara warna yang memenuhi rasio kontras yang direkomendasikan, dan yang tidak. Misalnya, karena warna abu-abu di
**Gambar 6** memenuhi rekomendasi, itu berarti bahwa semua warna di bawah garis putih juga memenuhi rekomendasi.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Fitur terkait {: #contrast-related }

Panel **Audit** memiliki audit akses otomatis untuk memastikannya
* setiap elemen * teks pada halaman memiliki rasio kontras yang cukup.

Lihat [Run Lighthouse in Chrome DevTools][audit] , atau tonton A11ycast di bawah ini, untuk mempelajari cara menggunakan ** **panel** untuk menguji aksesibilitas.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## Audit baru {: #audits }

Chrome 65 dikirimkan dengan kategori baru audit SEO, dan banyak audit kinerja baru.

Note: Panel **Audit** didukung oleh [Lighthouse][LH] . Chrome 64 menjalankan Lighthouse versi 2.5. Chrome 65 menjalankan Lighthouse versi 2.8. Jadi bagian ini hanyalah ringkasan pembaruan Lighthouse dari 2.6, 2.7, dan 2.8.

### Audit SEO baru {: #seo }

Memastikan bahwa halaman Anda melewati setiap audit dalam kategori **SEO** yang baru dapat membantu meningkatkan peringkat mesin pencari Anda.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### Audit kinerja baru {: #performance }

Chrome 65 juga dikirimkan dengan banyak audit kinerja baru:

* Waktu boot-up JavaScript tinggi
* Menggunakan kebijakan cache tidak efisien pada aset statis
* Menghindari pengalihan halaman
* Dokumen menggunakan plugin
* Perkecil CSS
* Meminimalkan JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Pembaruan lainnya {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] untuk membuatnya lebih inklusif dari format gambar generasi mendatang lainnya
* [A rehaul of the accessibility score][a11yscore]
* Jika audit aksesibilitas tidak berlaku untuk suatu halaman, audit itu tidak lagi diperhitungkan terhadap skor aksesibilitas
* Kinerja kini menjadi bagian teratas dalam laporan

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Kode yang dapat dipercaya melangkah dengan pekerja dan kode asynchronous {: #stepping }

Chrome 65 menghadirkan pembaruan ke **Step Into**! Tombol [Step Into][into]{:.cdt-inl} saat masuk ke kode yang meneruskan pesan antar utas, dan kode asinkron. Jika Anda menginginkan perilaku loncatan sebelumnya, Anda dapat menggunakan **Langkah** yang baru! Tombol [Step][step]{:.cdt-inl} , sebagai gantinya.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### Melangkah ke kode yang melewatkan pesan antara utas benang {: #workers }

Ketika Anda masuk ke kode yang mengirimkan pesan antar utas, DevTools sekarang menunjukkan apa yang terjadi di setiap utas.

Misalnya, aplikasi dalam **Gambar 8** meneruskan pesan antara utas utama dan utas pekerja. Setelah masuk ke dalam panggilan `postMessage()` pada utas utama, DevTools berhenti di handler `onmessage` di thread pekerja. Penangan `onmessage` itu sendiri mengirim pesan kembali ke utas utama. Masuk ke * bahwa * panggilan berhenti DevTools kembali di utas utama.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

Saat Anda masuk ke kode seperti ini di versi Chrome sebelumnya, Chrome hanya menunjukkan Anda sisi utas-utama dari kode, seperti yang Anda lihat di **Gambar 9**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### Melangkah ke dalam kode asynchronous {: #async }

Ketika melangkah ke kode asynchronous, DevTools sekarang mengasumsikan bahwa Anda ingin berhenti di kode asynchronous yang akhirnya berjalan.

Sebagai contoh, dalam **Gambar 10** setelah melangkah ke `setTimeout()` , DevTools menjalankan semua kode yang mengarah ke titik di belakang layar, dan kemudian berhenti dalam fungsi yang diteruskan ke `setTimeout()` .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Ketika Anda masuk ke kode seperti ini di Chrome 63, DevTools berhenti dalam kode karena secara kronologis berjalan, seperti yang Anda lihat di **Gambar 11**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Beberapa rekaman dalam panel Performance {: #recordings }

Panel **Performance** sekarang memungkinkan Anda menyimpan hingga 5 rekaman secara sementara. Rekaman akan dihapus ketika Anda menutup jendela DevTools Anda. Lihat [Get Started with Analyzing Runtime Performance][runtime] untuk merasa nyaman dengan panel **Performance**.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## Bonus: Mengotomatiskan aksi DevTools dengan Puppeteer 1.0 {: #puppeteer }

Note: Bagian ini tidak terkait dengan Chrome 65.

Versi 1.0 dari Puppeteer, alat otomatisasi browser yang dikelola oleh tim Chrome DevTools, sekarang keluar. Anda dapat menggunakan Puppeteer untuk mengotomatiskan banyak tugas yang sebelumnya hanya tersedia melalui DevTools, seperti menangkap tangkapan layar:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

Ini juga memiliki API untuk banyak tugas otomatisasi yang umumnya berguna, seperti menghasilkan PDF:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

Lihat [Quick Start][quickstart] untuk mempelajari lebih lanjut.

[quickstart]: /web/tools/puppeteer/get-started

Anda juga dapat menggunakan Puppeteer untuk mengekspos fitur DevTools saat menjelajah tanpa pernah secara eksplisit membuka DevTools. Lihat [Using DevTools Features Without Opening DevTools][without] sebagai contoh.

[without]: /web/updates/2018/01/devtools-without-devtools

## Permintaan dari tim DevTools: pertimbangkan Canary {: #canary }

Jika Anda menggunakan Mac atau Windows, pertimbangkan untuk menggunakan [Chrome Canary][canary] sebagai browser pengembangan default Anda. Jika Anda melaporkan bug atau perubahan yang tidak Anda sukai saat masih ada di Canary, tim DevTools dapat menanggapi umpan balik Anda secara signifikan lebih cepat.

Note: Canary adalah versi Chrome yang mengandung pendarahan. Ini dirilis segera setelah dibangun, tanpa pengujian. Ini berarti bahwa Canary istirahat dari waktu ke waktu, sekitar sebulan sekali, dan biasanya tetap dalam satu hari. Anda dapat kembali menggunakan Chrome Stable saat Canary putus.

[canary]: https://www.google.com/chrome/browser/canary.html

## Umpan balik {: #feedback }

Tempat terbaik untuk mendiskusikan salah satu fitur atau perubahan yang Anda lihat di sini adalah [google-chrome-developer-tools@googlegroups.com mailing list][ML] . Anda juga dapat mentweet kami di [@ChromeDevTools](https://twitter.com/chromedevtools) jika waktu Anda [@ChromeDevTools](https://twitter.com/chromedevtools) . Jika Anda yakin telah menemukan bug di DevTools, silakan [open an issue](https://crbug.com/new) .

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Catatan rilis sebelumnya {: #links }

Lihat tag [devtools-whatsnew][tag] untuk tautan ke semua catatan rilis DevTools sebelumnya.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
