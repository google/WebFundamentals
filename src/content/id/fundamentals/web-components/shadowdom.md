project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Shadow DOM memungkinkan developer web membuat DOM dan CSS yang terkategori untuk komponen web

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: Komponen Web Mandiri {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

Shadow DOM menghilangkan keringkihan membangun aplikasi web. Keringkihan
tersebut bersumber dari sifat global HTML, CSS, dan JS. Setelah bertahun-tahun, kami
menemukan begitu [banyak](http://getbem.com/introduction/) 
[dari](https://github.com/css-modules/css-modules)
[alat](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
untuk mengatasi masalah. Misalnya, bila Anda menggunakan id/kelas HTML baru,
Anda tidak akan diberi tahu jika itu mengalami konflik dengan nama yang ada yang digunakan oleh laman.
[Bug halus](http://www.2ality.com/2012/08/ids-are-global.html) tersembunyi,
kekhususan CSS menjadi masalah yang sangat besar (`!important` dalam semua hal!), pemilih
gaya berkembang tidak terkontrol, dan
[kinerja bisa terpengaruh](/web/updates/2016/06/css-containment). Daftar
masalahnya terus bertambah.

**Shadow DOM memperbaiki CSS dan DOM**. Ia memperkenalkan **gaya bercakupan** ke platform
web. Tanpa alat atau konvensi penamaan, Anda bisa **membundel CSS bersama
markup**, menyembunyikan detail implementasi, dan **menulis komponen
mandiri** dalam JavaScript biasa.

## Pengantar {: #intro}

Note: **Sudah mengerti Shadow DOM?** Artikel ini menjelaskan spesifikasi
<a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">
Shadow DOM v1</a> yang baru. Jika Anda menggunakan Shadow DOM, kemungkinan Anda sudah
familier dengan <a href="https://www.chromestatus.com/features/4507242028072960">
versi v0 yang disertakan di Chrome 35</a>, dan polyfill webcomponents.js.
Konsepnya sama, namun spesifikasi v1 memiliki perbedaan API yang penting. Versi ini
juga yang disepakati untuk diimplementasikan oleh semua browser, dan yang sudah
diimplementasikan di Safari Tech Preview dan Chrome Canary. Bacalah terus
untuk mengetahui apa saja yang baru atau lihat bagian ini di <a href="#historysupport">
Riwayat dan dukungan browser</a> untuk informasi selengkapnya.

Shadow DOM adalah salah satu dari empat standar Komponen Web: 
[Template HTML](https://www.html5rocks.com/en/tutorials/webcomponents/template/),
[Shadow DOM][sd_spec_whatwg],
[Elemen khusus](/web/fundamentals/getting-started/primers/customelements) dan
[Impor HTML](https://www.html5rocks.com/en/tutorials/webcomponents/imports/).

Anda tidak harus menulis komponen web yang menggunakan shadow DOM. Namun bila melakukannya,
Anda bisa memanfaatkan keuntungannya (pelingkupan CSS, enkapsulasi DOM,
komposisi) dan membangun
[elemen khusus](/web/fundamentals/getting-started/primers/customelements) yang dapat digunakan kembali,
luwes, sangat mudah dikonfigurasi, dan sangat mudah digunakan kembali. Jika elemen
khusus menjadi cara untuk membuat HTML baru (dengan JS API), maka shadow DOM menjadi
cara Anda menyediakan HTML dan CSS-nya. Kedua API bergabung untuk membuat komponen
dengan HTML, CSS, dan JavaScript mandiri.

Shadow DOM dirancang sebagai alat untuk membangun aplikasi berbasis komponen. Karena itu,
ini memberikan solusi untuk masalah umum dalam development web:

- **DOM Terisolasi**: DOM komponen bersifat mandiri (mis. 
  `document.querySelector()` tidak akan mengembalikan simpul dalam shadow DOM komponen).
- **CSS Bercakupan**: CSS yang didefinisikan dalam shadow DOM akan menjadi cakupannya. Aturan gaya 
  tidak bocor dan gaya laman tetap tertata.
- **Komposisi**: Merancang API deklaratif yang berbasis markup untuk komponen Anda.
- **CSS Sederhana** - DOM bercakupan artinya Anda bisa menggunakan pemilih CSS sederhana, nama 
  id/kelas yang lebih generik, dan tidak khawatir dengan konflik penamaan.
- **Produktivitas** - Pertimbangkan aplikasi dalam beberapa potongan DOM bukannya satu laman 
  (global) yang besar.

Note: Walaupun Anda bisa menggunakan shadow DOM API dan kegunaannya di luar komponen
web, saya hanya akan memfokuskan pada contoh-contoh yang dibangun pada elemen khusus.
Saya akan menggunakan elemen khusus v1 API dalam semua contoh.


#### `fancy-tabs` demo {: #demo}

Sepanjang artikel ini, saya akan merujuk ke komponen demo (`<fancy-tabs>`)
dan merujuk cuplikan kode dari sana. Jika browser Anda mendukung API, Anda
akan melihat demonya langsung di bawah ini. Jika tidak, lihat 
<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
sumber lengkapnya di Github</a>.

<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
      Lihat sumbernya di Github
    </a>
  </figcaption>
</figure>

## Apa yang dimaksud dengan shadow DOM? {: #what}

#### Latar belakang DOM {: #sdbackground}

HTML menjadi kekuatan web karena mudah digunakan. Dengan mendeklarasikan beberapa tag, Anda
bisa menulis laman dalam sekejap yang memiliki presentasi maupun struktur. Walau demikian,
HTML itu sendiri tidaklah seberguna itu. Orang mudah memahami bahasa berbasis
teks, namun mesin memerlukan lebih dari itu. Masuklah ke Document Object
Model, atau DOM.

Saat browser memuat laman web, ia melakukan banyak hal menarik. Salah satu
yang dilakukannya adalah mengubah HTML penulis ke dalam dokumen langsung.
Pada dasarnya, untuk memahami struktur laman, browser mem-parse HTML (string
statis teks) ke dalam model data (objek/simpul). Browser mempertahankan
hierarki HTML dengan membuat turunan dari simpul-simpul ini: DOM. Yang keren
tentang DOM adalah karena ia merupakan representasi langsung dari laman Anda. Tidak seperti HTML
statis yang kita tulis, simpul buatan browser berisi properti, metode, dan
terutama...bisa dimanipulasi oleh program! Itulah sebabnya kita dapat membuat elemen
DOM secara langsung menggunakan JavaScript:


    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

menghasilkan markup HTML berikut:


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

Semua itu memang bagus. Lalu 
[bagaimana dengan _shadow DOM_](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)?

#### DOM...yang membayangi {: #sddom}

Shadow DOM cuma DOM biasa dengan dua perbedaan: 1) bagaimana pembuatan/penggunaannya dan
2) bagaimana perilakunya sehubungan dengan bagian laman selebihnya. Biasanya, Anda membuat simpul
DOM dan menambahkannya sebagai anak elemen lain. Dengan shadow DOM, Anda
membuat pohon DOM bercakupan yang dilampirkan ke elemen, namun terpisah dari
anak sesungguhnya. Subpohon bercakupan ini disebut **pohon bayangan**. Elemen
tempat melampirkannya adalah **shadow host**. Apa saja yang Anda tambahkan dalam bayangan akan bersifat
lokal untuk elemen hosting, termasuk `<style>`. Seperti inilah cara shadow DOM
menghasilkan pelingkupan gaya CSS.

## Membuat shadow DOM {: #create}

**Shadow root** adalah fragmen dokumen yang akan melekat pada elemen "host".
Tindakan melampirkan shadow root adalah cara elemen memperoleh shadow DOM-nya. Untuk
membuat shadow DOM bagi sebuah elemen, panggil `element.attachShadow()`:


    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

Saya menggunakan `.innerHTML` untuk mengisi shadow root, namun Anda juga bisa menggunakan DOM
API yang lain. Inilah web. Kita punya pilihan.

Spesifikasi [mendefinisikan daftar elemen](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)
yang tidak bisa menjadi host shadow tree. Ada sejumlah alasan suatu elemen berada
dalam daftar:

- Browser sudah menjadi host bagi shadow DOM internalnya sendiri untuk elemen 
  (`<textarea>`, `<input>`).
- Tidak mungkin bagi elemen menjadi host shadow DOM (`<img>`).

Misalnya, ini tidak bekerja:


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

### Membuat shadow DOM untuk elemen khusus {: #elements}

Shadow DOM sangat berguna saat membuat
[elemen khusus](/web/fundamentals/getting-started/primers/customelements).
Gunakan shadow DOM untuk membagi-bagi HTML, CSS, dan JS elemen, sehingga
menghasilkan "komponen web".

**Contoh** - elemen khusus **melampirkan shadow DOM ke dirinya sendiri**,
mengenkapsulasi DOM/CSS-nya:

    // Use custom elements API v1 to register a new HTML tag and define its JS behavior
    // using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

Ada beberapa hal menarik yang terjadi di sini. Yang pertama adalah bahwa
elemen khusus **membuat shadow DOM sendiri** bila instance `<fancy-tabs>`
dibuat. Itu dilakukan dalam `constructor()`. Kedua, karena kita sedang membuat
shadow root, aturan CSS di dalam `<style>` akan bercakupan `<fancy-tabs>`.

Note: Bila Anda mencoba menjalankan contoh ini, mungkin Anda akan melihat bahwa tidak ada yang
dirender. Markup pengguna seakan menghilang! Itu karena **shadow DOM
elemen dirender menggantikan anaknya**. Jika Anda ingin menampilkan
anaknya, Anda perlu memberi tahu browser tempat merendernya dengan memasukkan
[elemen `<slot>`](#slots) dalam shadow DOM Anda. Selengkapnya mengenai hal itu
[nanti](#composition_slot).


## Komposisi dan slot {: #composition_slot}

Komposisi adalah salah satu fitur yang paling kurang dipahami pada shadow DOM, namun
barangkali menjadi yang paling penting.

Dalam dunia development web kita, komposisi adalah cara kita membangun aplikasi
dari HTML secara deklaratif. Berbagai blok pembangun (`<div>`, `<header>`,
`<form>`, `<input>`) bersama-sama membentuk aplikasi. Sebagian dari tag ini bahkan
saling bekerja sama. Komposisilah yang membuat elemen asli seperti `<select>`,
`<details>`, `<form>`, dan `<video>` jadi begitu fleksibel. Masing-masing tag tersebut menerima
HTML tertentu sebagai anak dan melakukan sesuatu yang spesial dengannya. Misalnya,
`<select>` mengetahui cara merender `<option>` dan `<optgroup>` menjadi widget tarik-turun dan
widget multi-pilih. Elemen `<details>` merender `<summary>` sebagai
panah yang dapat diperluas. Bahkan `<video>` mengetahui cara menangani anak tertentu: elemen
`<source>` tidak akan dirender, namun mereka memengaruhi perilaku video.
Memang ajaib!

### Terminologi: light DOM vs. shadow DOM {: #lightdom}

Komposisi Shadow DOM memperkenalkan sekumpulan dasar-dasar baru dalam development
web. Sebelum melangkah lebih jauh, mari kita standarkan beberapa
terminologi agar kita berbicara dalam bahasa yang sama.

**Light DOM**

Markup yang ditulis pengguna komponen Anda. DOM ini berada
di luar shadow DOM komponen. Inilah anak sesungguhnya dari elemen.


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

DOM yang ditulis oleh penulis komponen. Shadow DOM bersifat lokal untuk komponen dan
mendefinisikan struktur internalnya, CSS bercakupan, dan mengenkapsulasi detail
implementasi Anda. Ia juga mendefinisikan cara merender markup yang ditulis oleh pemakai
komponen Anda.


    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**Flattened DOM tree**

Hasil dari browser yang mendistribusikan light DOM pengguna ke dalam shadow
DOM Anda, yang merender produk akhir. Flattened tree adalah yang pada akhirnya Anda lihat
di DevTools dan yang dirender pada laman.


    <button is="better-button">
      #shadow-root
        <style>...</style>
        <slot name="icon">
          <img src="gear.svg" slot="icon">
        </slot>
        <slot>
          <span>Settings</span>
        </slot>
    </button>
    

### Elemen &lt;slot&gt; {: #slots}

Shadow DOM menggabung berbagai DOM tree yang berbeda menggunakan elemen `<slot>`.
**Slot adalah Placeholder di dalam komponen Anda yang _bisa_ diisi pengguna dengan
markup mereka sendiri**. Dengan mendefinisikan satu atau beberapa slot, Anda mengundang markup luar untuk merender
dalam shadow DOM komponen Anda. Pada dasarnya, Anda mengatakan _"Render markup
pengguna di sini"_.

Note: Slot adalah cara membuat "API deklaratif" untuk komponen web. Slot
menggabung DOM pengguna untuk membantu merender komponen keseluruhan, sehingga, **menggabung
berbagai DOM tree**.


Elemen diizinkan "melintasi" batas shadow DOM bila `<slot>` mengundangnya
masuk. Elemen-elemen ini disebut **simpul terdistribusi**. Secara konseptual,
simpul terdistribusi boleh jadi terlihat agak ganjil. Slot tidak secara fisik memindah DOM; mereka
merendernya di lokasi lain dalam shadow DOM.

Sebuah komponen bisa mendefinisikan nol atau beberapa slot dalam shadow DOM-nya. Slot bisa kosong
atau menyediakan materi fallback. Jika pengguna tidak menyediakan materi [light DOM](#lightdom)
, slot akan merender materi fallback-nya.


    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

Anda juga bisa membuat **slot bernama**. Slot bernama adalah lubang spesifik dalam
shadow DOM Anda yang dirujuk pengguna melalui nama.

**Contoh** - slot bernama dalam shadow DOM `<fancy-tabs>`:


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

Pengguna komponen mendeklarasikan `<fancy-tabs>` dengan demikian:


    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <h2>'s and changing the ordering would also work! -->
    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    

Dan jika Anda ingin tahu, flattened tree akan terlihat seperti ini:


    <fancy-tabs>
      #shadow-root
        <div id="tabs">
          <slot id="tabsSlot" name="title">
            <button slot="title">Title</button>
            <button slot="title" selected>Title 2</button>
            <button slot="title">Title 3</button>
          </slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot">
            <section>content panel 1</section>
            <section>content panel 2</section>
            <section>content panel 3</section>
          </slot>
        </div>
    </fancy-tabs>
    

Perhatikan bahwa komponen kita bisa menangani berbagai konfigurasi, namun
flattened DOM tree tetap sama. Kita juga bisa beralih dari `<button>` ke
`<h2>`. Komponen ini ditulis untuk menangani aneka tipe anak...seperti
yang dilakukan `<select>`!

## Penataan gaya  {: #styling}

Ada banyak opsi untuk menata gaya komponen web. Komponen yang menggunakan shadow
DOM bisa diberi gaya oleh laman utama, mendefinisikan gayanya sendiri, atau menyediakan sangkutan (dalam
bentuk [properti khusus CSS][css_props]) bagi pengguna untuk menggantikan default-nya.

### Gaya yang didefinisikan komponen {: #host}

Warisan fitur paling berguna dari shadow DOM adalah **CSS bercakupan**:

- Pemilih CSS dari laman luar tidak berlaku di dalam komponen Anda.
- Gaya yang didefinisikan di dalam tidak akan bocor keluar (bleed out). Gaya itu akan menjadi cakupan elemen host.

**Pemilih CSS yang digunakan dalam shadow DOM berlaku lokal untuk komponen Anda**.  Pada
praktiknya, ini berarti kita bisa menggunakan lagi nama-nama id/kelas biasa, tanpa khawatir
terjadi konflik di laman. Pemilih CSS yang lebih sederhana adalah praktik terbaik
dalam Shadow DOM. Kinerjanya juga bagus.

**Contoh** - gaya yang didefinisikan dalam akar bayangan bersifat lokal


    #shadow-root
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          ...
        }
        #tabs {
          display: inline-flex;
          ...
        }
      </style>
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

Stylesheet juga dijadikan cakupan pohon bayangan:


    #shadow-root
      <!-- Available in Chrome 54+ -->
      <!-- WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=160683 -->
      <link rel="stylesheet" href="styles.css">
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

Pernahkah membayangkan bagaimana elemen `<select>` merender widget multi-pilih (sebagai ganti
tarik-turun) bila Anda menambahkan atribut `multiple`:

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>` dapat menata gaya pada _dirinya sendiri_ secara berbeda, berdasarkan atribut yang Anda
deklarasikan padanya. Komponen web juga bisa menata gaya dirinya sendiri, dengan menggunakan pemilih `:host`
.

**Contoh** - komponen yang menata gaya untuk dirinya sendiri


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

Satu keistimewaan dengan `:host` adalah bahwa aturan di laman induk memiliki kekhususan lebih tinggi
daripada aturan `:host` yang didefinisikan dalam elemen. Yakni, gaya luar yang menang. Hal ini
memungkinkan pengguna mengganti penataan gaya tingkat atas dari luar. Selain itu, `:host`
hanya bekerja dalam konteks shadow root, sehingga Anda tidak bisa menggunakannya di luar
shadow DOM.

Bentuk fungsional `:host(<selector>)` memungkinkan Anda menargetkan host jika
cocok dengan `<selector>`. Ini merupakan cara yang bagus bagi komponen Anda untuk mengenkapsulasi
perilaku yang bereaksi pada interaksi pengguna atau status atau simpul internal gaya berdasarkan
host.


    <style>
    :host {
      opacity: 0.4;
      will-change: opacity;
      transition: opacity 300ms ease-in-out;
    }
    :host(:hover) {
      opacity: 1;
    }
    :host([disabled]) { /* style when host has disabled attribute. */
      background: grey;
      pointer-events: none;
      opacity: 0.4;
    }
    :host(.blue) {
      color: blue; /* color host when it has class="blue" */
    }
    :host(.pink) > #tabs {
      color: pink; /* color internal #tabs node when host has class="pink". */
    }
    </style>
    

### Menata gaya berdasarkan konteks {: #contextstyling}

`:host-context(<selector>)` mencocokkan dengan komponen jika ia atau pendahulunya ada yang
cocok `<selector>`. Ini biasanya digunakan untuk pengaturan tema berdasarkan komponen
sekitarnya. Misalnya, banyak orang mengatur tema dengan mengaplikasikan kelas ke
`<html>` atau `<body>`:


    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)` akan menata gaya `<fancy-tabs>` bila ia adalah turunan
dari `.darktheme`:


    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` bisa berguna untuk pengaturan tema, namun pendekatan yang lebih baik adalah untuk
[membuat sangkutan gaya menggunakan properti khusus CSS](#stylehooks).

### Menata gaya simpul terdistribusi {: #stylinglightdom}

`::slotted(<compound-selector>)` mencocokkan simpul yang didistribusikan ke dalam
`<slot>`.

Anggaplah kita telah membuat komponen lencana nama:


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

Shadow DOM komponen itu bisa memberi gaya pada `<h2>` dan `.title` milik pengguna:


    <style>
    ::slotted(h2) {
      margin: 0;
      font-weight: 300;
      color: red;
    }
    ::slotted(.title) {
       color: orange;
    }
    /* DOESN'T WORK (can only select top-level nodes).
    ::slotted(.company),
    ::slotted(.title .company) {
      text-transform: uppercase;
    }
    */
    </style>
    <slot></slot>
    

Jika Anda ingat dari bahasan sebelumnya, `<slot>` tidak memindahkan light DOM milik pengguna. Bila
simpul didistribusikan ke dalam `<slot>`, `<slot>` akan merender DOM-nya namun
simpul secara fisik tetap diam. **Gaya yang diterapkan sebelum distribusi akan terus
diterapkan setelah distribusi**. Akan tetapi, bila light DOM didistribusikan, ia _bisa_
menerima gaya tambahan (gaya yang didefinisikan oleh shadow DOM).

Satu lagi, contoh yang lebih detail dari `<fancy-tabs>`:


    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabsSlot::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          ...
        }
        #tabsSlot::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted([aria-hidden="true"]) {
          display: none;
        }
      </style>
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
    

Dalam contoh ini, ada dua slot: slot bernama untuk judul tab, dan slot
bernama untuk materi tab. Bila pengguna memilih tab, kita akan mencetak tebal pilihan mereka
dan menampilkan panelnya. Itu dilakukan dengan memilih simpul terdistribusi yang memiliki atribut
`selected`. Elemen khusus JS (tidak ditampilkan di sini) menambahkan atribut
tersebut pada waktu yang tepat.

### Menata gaya komponen dari luar {: #stylefromoutside}

Ada dua cara untuk menata gaya komponen dari luar. Cara
termudah adalah menggunakan nama tag sebagai pemilih:


    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**Gaya luar selalu menang dari gaya yang didefinisikan dalam shadow DOM**. Misalnya,
jika pengguna menulis pemilih `fancy-tabs { width: 500px; }`, ia akan mengalahkan
aturan komponen: `:host { width: 650px;}`.

Menata gaya komponen itu sendiri hanya akan membawa Anda sejauh ini. Namun apa yang terjadi jika Anda
ingin menata gaya internal komponen? Untuk itu, kita memerlukan properti
khusus CSS.

#### Membuat sangkutan gaya menggunakan properti khusus CSS {: #stylehooks}

Pengguna bisa mengutak-atik gaya internal jika penulis komponen menyediakan sangkutan penataan gaya dengan
menggunakan [properti khusus CSS][css_props]. Secara konseptual, idenya mirip dengan
`<slot>`. Anda bisa membuat "placeholder gaya" untuk diganti oleh pengguna.

**Contoh** - `<fancy-tabs>` memungkinkan pengguna mengganti warna latar belakang:


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

Di dalam shadow DOM:


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

Dalam hal ini, komponen akan menggunakan `black` sebagai nilai latar belakang karena
pengguna telah menyediakannya. Jika tidak maka menggunakan `#9E9E9E` default.

Note: Sebagai penulis komponen, Anda bertanggung jawab memberi tahu developer
tentang properti khusus CSS yang bisa mereka gunakan. Anggaplah ini bagian dari antarmuka publik
komponen Anda. Pastikan untuk mendokumentasikan sangkutan penataan gaya!


## Topik lanjutan {: #advanced}

### Membuat akar bayangan tertutup (sebaiknya dihindari) {: #closed}

Ada ragam shadow DOM lain yang disebut mode "tertutup". Saat Anda membuat
shadow tree tertutup, JavaScript luar tidak akan bisa mengakses DOM internal
komponen Anda. Ini mirip dengan bagaimana elemen native seperti `<video>` bekerja.
JavaScript tidak bisa mengakses shadow DOM `<video>` karena browser
mengimplementasikannya menggunakan shadow root mode tertutup.

**Contoh** - membuat pohon bayangan tertutup:


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

API lainnya juga dipengaruhi oleh mode tertutup:

- `Element.assignedSlot` / `TextNode.assignedSlot` akan mengembalikan `null`
- `Event.composedPath()` untuk kejadian yang berkaitan dengan elemen di dalam shadow
  DOM, akan mengembalikan []

Note: Akar bayangan tertutup tidak begitu berguna. Sebagian developer akan menganggap mode
tertutup sebagai fitur keamanan semu. Namun mari kita perjelas, ini **bukan** fitur
keamanan. Mode tertutup cuma mencegah JS luar masuk ke dalam
DOM internal elemen.


Inilah rangkuman mengapa Anda jangan sampai membuat komponen web dengan
`{mode: 'closed'}`:

1. Rasa keamanan semu. Tidak ada yang menghentikan penyerang untuk
   membajak `Element.prototype.attachShadow`.

2. Mode tertutup **mencegah kode elemen khusus Anda mengakses
   shadow DOM-nya sendiri**. Itu berarti gagal total. Sebagai gantinya, Anda harus menyembunyikan referensi
   untuk nanti jika Anda ingin menggunakan sesuatu seperti `querySelector()`. Hal ini sepenuhnya 
   menggagalkan tujuan awal dari mode tertutup!

        customElements.define('x-element', class extends HTMLElement {
          constructor() {
            super(); // always call super() first in the ctor.
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
          }
          connectedCallback() {
            // When creating closed shadow trees, you'll need to stash the shadow root
            // for later if you want to use it again. Kinda pointless.
            const wrapper = this._shadowRoot.querySelector('.wrapper');
          }
          ...
        });

3. **Closed mode makes your component less flexible for end users**. Karena Anda
   membangun komponen web, ada saatnya Anda lupa menambahkan
   fitur. Opsi konfigurasi. Kasus penggunaan yang diinginkan pengguna. Contoh 
   umum adalah lupa menyertakan sangkutan penataan gaya yang memadai untuk simpul internal.
   Dengan mode tertutup, tidak ada cara bagi pengguna untuk mengganti default dan memodifikasi
   gaya. Kemampuan mengakses internal komponen akan sangat membantu.
   Pada akhirnya, pengguna akan memecah komponen Anda, mencari yang lain, atau membuat komponen
   mereka sendiri jika komponen tersebut tidak melakukan apa yang mereka inginkan :(

### Menggunakan slot di JS {: #workwithslots}

Shadow DOM API menyediakan utilitas untuk menggunakan slot dan simpul
terdistribusi. Ini sudah siap pakai saat menulis elemen khusus.

#### Kejadian slotchange {: #slotchange}

Kejadian `slotchange` akan terpicu bila simpul terdistribusi slot berubah. Misalnya
, jika pengguna menambahkan/membuang anak dari light DOM.


    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
Note: `slotchange` tidak akan terpicu bila instance komponen
telah diinisialisasi lebih dahulu.

Untuk memantau tipe perubahan lain pada light DOM, Anda bisa menyetel
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
dalam konstruktor elemen Anda.

#### Elemen apa saja yang sedang di-render dalam slot? {: #slotnodes}

Kadang-kadang ada gunanya mengetahui elemen apa saja yang terkait dengan sebuah slot. Panggil
`slot.assignedNodes()` untuk menemukan elemen apa saja yang sedang dirender slot. Opsi
`{flatten: true}` juga akan mengembalikan materi fallback slot (jika tidak ada simpul
yang sedang didistribusikan).

Sebagai contoh, anggaplah shadow DOM Anda seperti ini:

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>Penggunaan</th><th>Panggil</th><th>Hasil</th></tr></thead>
  <tr>
    <td>&lt;button is="better-button"&gt;My button&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[text]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button">&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button"&gt;&lt;/button&gt;</td>
    <td><code>slot.assignedNodes({flatten: true});</code></td>
    <td><code>[&lt;b&gt;fallback content&lt;/b&gt;]</code></td>
  </tr>
</table>

#### Ke slot manakah elemen ditetapkan? {: #assignedslot}

Boleh juga menjawab pertanyaan sebaliknya. `element.assignedSlot` akan memberi tahu
Anda ke slot komponen manakah elemen Anda ditetapkan.

### Model kejadian Shadow DOM {: #events}

Bila sebuah kejadian menggelembung naik dari shadow DOM, targetnya akan disesuaikan untuk menjaga
enkapsulasi yang disediakan shadow DOM. Yaitu, kejadian ditargetkan ulang agar
seolah berasal dari komponen, bukannya dari elemen internal dalam
shadow DOM Anda. Sebagian kejadian bahkan tidak menyebarkan shadow DOM.

Kejadian yang **malah** melewati batas bayangan adalah:

- Kejadian Fokus: `blur`, `focus`, `focusin`, `focusout`
- Kejadian Mouse: `click`, `dblclick`, `mousedown`, `mouseenter`, `mousemove`, dll.
- Kejadian Roda: `wheel`
- Kejadian Input: `beforeinput`, `input`
- Kejadian Keyboard: `keydown`, `keyup`
- Kejadian Komposisi: `compositionstart`, `compositionupdate`, `compositionend`
- Kejadian Seret: `dragstart`, `drag`, `dragend`, `drop`, dll.

**Tip**

Jika shadow tree terbuka, memanggil `event.composedPath()` akan mengembalikan selarik
simpul yang telah dilalui kejadian.

#### Menggunakan kejadian khusus {: #customevents}

Kejadian DOM khusus yang dipicu pada simpul internal di shadow tree tidak
menggelembung keluar dari batas bayangan kecuali jika kejadian dibuat menggunakan flag
`composed: true`:


    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

Jika `composed: false` (default), konsumen tidak akan dapat mendengarkan kejadian
di luar shadow root Anda.


    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

### Menangani fokus {: #focus}

Jika Anda mengingat kembali dari [model kejadian shadow DOM](#events), kejadian yang diaktifkan
dalam shadow DOM disesuaikan agar terlihat seperti datang dari elemen hosting.
Misalnya, Anda mengeklik `<input>` dalam shadow root:


    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

Kejadian `focus` akan terlihat seperti itu berasal dari `<x-focus>`, bukan `<input>`.
Begitu juga, `document.activeElement` akan menjadi `<x-focus>`. Jika shadow root
dibuat dengan `mode:'open'` (lihat [mode tertutup](#closed)), Anda juga
bisa mengakses simpul internal yang mendapatkan fokus:

    document.activeElement.shadowRoot.activeElement // only works with open mode.

Jika terdapat beberapa tingkatan shadow DOM (misalnya elemen khusus dalam
elemen khusus lain), Anda harus secara rekursif masuk lebih dalam ke shadow root untuk
menemukan `activeElement`:


    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

Alternatif lain untuk mendapatkan fokus adalah opsi `delegatesFocus: true`, yang meluaskan perilaku
fokus elemen dalam shadow tree:

- Jika Anda mengeklik sebuah simpul dalam shadow DOM dan simpul itu bukanlah area yang dapat difokuskan,
  area pertama yang dapat difokuskan akan menjadi fokus.
- Ketika simpul di dalam shadow DOM memperoleh fokus, `:focus` diterapkan ke host
  selain elemen yang difokuskan.

**Contoh** - cara `delegatesFocus: true` mengubah perilaku fokus


    <style>
      :focus {
        outline: 2px solid red;
      }
    </style>
    
    <x-focus></x-focus>
    
    <script>
    customElements.define('x-focus', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
    
        const root = this.attachShadow({mode: 'open', delegatesFocus: true});
        root.innerHTML = `
          <style>
            :host {
              display: flex;
              border: 1px dotted black;
              padding: 16px;
            }
            :focus {
              outline: 2px solid blue;
            }
          </style>
          <div>Clickable Shadow DOM text</div>
          <input type="text" placeholder="Input inside shadow dom">`;
    
        // Know the focused element inside shadow DOM:
        this.addEventListener('focus', function(e) {
          console.log('Active element (inside shadow dom):',
                      this.shadowRoot.activeElement);
        });
      }
    });
    </script>
    

**Hasil**

<img src="imgs/delegateFocusTrue.png" title="delegatesFocus: true behavior">

Di atas merupakan hasil ketika `<x-focus>` difokuskan (klik pengguna, dimasukkan dalam tab,
`focus()`, dll.), "Clickable Shadow DOM text" diklik, atau
`<input>` internal difokuskan (termasuk `autofocus`).

Jika Anda menyetel `delegatesFocus: false`, inilah yang akan Anda lihat sebagai gantinya:

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> dan  <code>&lt;input></code> internal difokuskan.
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> dan  <code>&lt;x-focus></code>
    mendapatkan fokus (mis. memiliki <code>tabindex="0"</code>).
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> dan "Clickable Shadow DOM text"
    diklik (atau area kosong lain dalam elemen shadow DOM diklik).
  </figcaption>
</figure>

## Tip & Trik {: #tricks}

Setelah bertahun-tahun saya belajar suatu atau beberapa hal tentang penulisan komponen web. Menurut saya
Anda akan menemukan banyak tip berguna untuk penulisan komponen dan
men-debug shadow DOM.

### Gunakan pengekangan CSS {: #containment}

Biasanya, layout/style/paint komponen web benar-benar mandiri. Gunakan
[pengekangan CSS](/web/updates/2016/06/css-containment) di `:host` untuk perf
win:


    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### Menyetel ulang gaya yang tidak dapat diwariskan {: #reset}

Gaya yang tidak dapat diwariskan (`background`, `color`, `font`, `line-height`, dll.) terus
diwariskan dalam shadow DOM. Artinya, mereka menembus batas shadow DOM secara
default. Jika Anda ingin memulai dari dasar, gunakan `all: initial;` untuk menyetel ulang
gaya yang tidak dapat diwariskan ke nilai awal mereka bila mereka melewati batas bayangan.


    <style>
      div {
        padding: 10px;
        background: red;
        font-size: 25px;
        text-transform: uppercase;
        color: white;
      }
    </style>
    
    <div>
      <p>I'm outside the element (big/white)</p>
      <my-element>Materi Light DOM juga terpengaruh.</my-element>
      <p>I'm outside the element (big/white)</p>
    </div>
    
    <script>
    const el = document.querySelector('my-element');
    el.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          all: initial; /* 1st rule so subsequent properties are reset. */
          display: block;
          background: white;
        }
      </style>
      <p>my-element: all CSS properties are reset to their
         initial value using <code>all: initial</code>.</p>
      <slot></slot>
    `;
    </script>

{% framebox height="195px" %}
<div class="demoarea">
  <style>
    #initialdemo {
      padding: 10px;
      background: red;
      font-size: 25px;
      text-transform: uppercase;
      color: white;
    }
  </style>

  <div id="initialdemo">
    <p>I'm outside the element (big/white)</p>
    <my-element>Materi Light DOM juga terpengaruh.</my-element>
    <p>I'm outside the element (big/white)</p>
  </div>
</div>

<script>
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

if (supportsShadowDOM()) {
  const el = document.querySelector('#initialdemo my-element');
  el.attachShadow({mode: 'open'}).innerHTML = `
    <style>
      :host {
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block;
        background: white;
      }
    </style>
    <p>my-element: all CSS properties are reset to their
       initial value using <code>all: initial</code>.</p>
    <slot></slot>
  `;
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### Menemukan semua elemen khusus yang digunakan oleh laman {: #findall}

Kadang-kadang ada gunanya juga menemukan elemen khusus yang digunakan di laman. Caranya, Anda
harus berulang-ulang menyusuri shadow DOM dari semua elemen yang digunakan di laman.


    const allCustomElements = [];
    
    function isCustomElement(el) {
      const isAttr = el.getAttribute('is');
      // Check for <super-button> and <button is="super-button">.
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    }
    
    function findAllCustomElements(nodes) {
      for (let i = 0, el; el = nodes[i]; ++i) {
        if (isCustomElement(el)) {
          allCustomElements.push(el);
        }
        // If the element has shadow DOM, dig deeper.
        if (el.shadowRoot) {
          findAllCustomElements(el.shadowRoot.querySelectorAll('*'));
        }
      }
    }
    
    findAllCustomElements(document.querySelectorAll('*'));
    

{% comment %}
Beberapa browser juga mendukung penggunaan kombinator `/deep/` shadow DOM v0 di `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

Untuk sekarang, `/deep/` [teruslah bekerja di panggilan `querySelectorAll()`](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
{% endcomment %}

### Membuat elemen dari &lt;template> {: #fromtemplate}

Sebagai ganti mengisi shadow root menggunakan `.innerHTML`, kita bisa menggunakan
`<template>` deklaratif. Template adalah Placeholder ideal untuk mendeklarasikan struktur
komponen web.

Lihat contoh di 
["Elemen khusus: membangun komponen web pakai-ulang"](/web/fundamentals/getting-started/primers/customelements).

## Riwayat & dukungan browser {: #historysupport}

Jika Anda mengikuti komponen web selama dua tahun terakhir, Anda akan
mengetahui bahwa Chrome 35+/Opera telah menyertakan versi lama shadow DOM untuk
sekian lama. Blink akan terus mendukung kedua versi secara paralel untuk sekian
lama. Spesifikasi v0 menyediakan metode berbeda untuk membuat shadow root
(`element.createShadowRoot` sebagai ganti `element.attachShadow` v1). Memanggil
metode lama akan terus membuat shadow root dengan semantik v0, jadi
kode v0 tidak akan putus.

Jika Anda tertarik dengan spesifikasi v0 lama, lihat artikel
html5rocks: 
[1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/),
[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/),
[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/).
Ada juga perbandingan penting tentang 
[perbedaan antara shadow DOM v0 dan v1][differences].

### Dukungan browser {: #support}

Chrome 53 ([status](https://www.chromestatus.com/features/4667415417847808)), 
Opera 40, dan Safari 10 menyertakan shadow DOM v1. Edge sedang mempertimbangkan
[dengan prioritas tinggi](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/).
Mozilla memiliki [bug terbuka](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)
untuk diimplementasikan.

Untuk mendeteksi shadow DOM, periksa eksistensi `attachShadow`:


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
#### Polyfill {: #polyfill}

Sampai dukungan browser tersedia secara luas, polyfill
[shadydom](https://github.com/webcomponents/shadydom) dan 
[shadycss](https://github.com/webcomponents/shadycss) memberikan 
fitur v1. Shady DOM meniru pelingkupan DOM dari Shadow DOM dan properti khusus CSS
polyfill shadycss dan pelingkupan gaya yang disediakan API bawaan.

Pemasangan polyfill:

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

Penggunaan polyfill:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.async = true;
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }

    // Lazy load the polyfill if necessary.
    if (!supportsShadowDOMV1) {
      loadScript('/bower_components/shadydom/shadydom.min.js')
        .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
        .then(e => {
          // Polyfills loaded.
        });
    } else {
      // Native shadow dom v1 support. Go to go!
    }


Lihat [https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)
untuk petunjuk tentang cara melakukan shim/mencakup gaya Anda.


## Kesimpulan

Untuk pertama kalinya, kita memiliki primitif API yang melakukan pelingkupan CSS dan
pelingkupan DOM dengan benar, serta memiliki komposisi sesungguhnya. Digabung dengan API komponen web lain
seperti elemen khusus, shadow DOM menyediakan cara untuk menulis komponen
yang benar-benar dienkapsulasi tanpa hack atau menggunakan pemuat lama seperti `<iframe>`.

Jangan salah paham. Shadow DOM tentu saja hewan buas yang rumit! Namun layak
dipelajari. Sisihkan waktu untuk mempelajarinya. Pelajari dan tanyakan!

#### Bacaan lebih lanjut

- [Perbedaan antara Shadow DOM v1 dan v0][differences]
- ["Introducing Slot-Based Shadow DOM API"](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
 dari Blog WebKit.
- [Web Components and the future of Modular CSS](https://philipwalton.github.io/talks/2015-10-26/)
  oleh [Philip Walton](https://twitter.com/@philwalton)
- ["Elemen khusus: membangun komponen web pakai-ulang"](/web/fundamentals/getting-started/primers/customelements)
 dari WebFundamentals Google.
- [Spesifikasi Shadow DOM v1][sd_spec_whatwg]
- [Spesifikasi elemen khusus v1][ce_spec]

## FAQ

**Bisakah saya menggunakan Shadow DOM v1 saat ini?**

Ya, bersama polyfill. Lihat [Dukungan browser](#support).

**Fitur keamanan apa yang disediakan shadow DOM?**

Shadow DOM bukanlah fitur keamanan. Ini adalah alat bantu ringan untuk pelingkupan CSS
dan menyembunyikan pohon DOM di komponen. Jika Anda menginginkan batas keamanan sesungguhnya,
gunakan `<iframe>`.

**Apakah komponen web harus menggunakan shadow DOM?**

Tidak! Anda tidak harus membuat komponen web yang menggunakan shadow DOM. Akan tetapi,
dengan menulis [elemen khusus yang menggunakan Shadow DOM](#elements) berarti Anda bisa
memanfaatkan berbagai fitur seperti pelingkupan CSS, enkapsulasi DOM, dan komposisi.

**Apakah perbedaan antara akar bayangan terbuka dan tertutup?**

Lihat [Akar bayangan tertutup](#closed).

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
