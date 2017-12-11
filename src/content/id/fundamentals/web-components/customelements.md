project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Elemen khusus memungkinkan developer web mendefinisikan tag HTML baru, memperluas yang sudah ada, dan membuat komponen web pakai-ulang.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-28 #}

# Elemen Khusus v1: Komponen Web Pakai-Ulang {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

Dengan [Elemen Khusus][spec], developer web bisa **membuat tag HTML baru**,
menambah tag HTML yang ada, atau memperluas komponen yang ditulis oleh developer lain.
API adalah fondasi [komponen web](http://webcomponents.org/){: .external }. Elemen khusus menghadirkan
sebuah cara berbasis standar web untuk membuat komponen yang dapat digunakan kembali dengan hanya menggunakan
JS/HTML/CSS biasa. Hasilnya irit kode, kode modular, dan lebih bisa digunakan kembali di aplikasi kita.

## Pengantar {: #intro}

Note: Artikel ini menjelaskan <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">spesifikasi Custom Elements v1</a> baru. Jika Anda menggunakan elemen khusus, kemungkinan Anda sudah familier dengan <a href="https://www.chromestatus.com/features/4642138092470272">versi v0 yang disertakan di Chrome 33</a>. Konsepnya sama, namun spesifikasi v1 memiliki perbedaan API penting. Bacalah terus untuk mengetahui apa saja yang baru atau lihat bagian ini di <a href="#historysupport">Riwayat dan dukungan browser</a> untuk informasi selengkapnya.

Browser memberi kita alat bagus untuk menstrukturkan aplikasi web.
Namanya HTML.  Anda mungkin pernah mendengarnya! Deklaratif, portabel, didukung dengan baik, dan mudah digunakan. Mungkin sehebat HTML, kosakata dan ekstensibilitasnya terbatas. [Standar hidup HTML](https://html.spec.whatwg.org/multipage/){: .external } tidak memiliki cara untuk mengaitkan secara otomatis perilaku JS dengan markup Anda... hingga sekarang.

Elemen khusus adalah jawaban untuk memodernisasi HTML; mengisi bagian yang hilang,
dan membundel struktur dengan perilaku. Jika HTML tidak menyediakan solusi terhadap masalah,
kita bisa membuat elemen khusus yang akan melakukannya. **Elemen khusus mengajari browser trik baru sekaligus mempertahankan manfaat HTML**.

## Mendefinisikan elemen baru {: #define}

Untuk mendefinisikan elemen HTML baru, kita memerlukan kemampuan JavaScript!

`customElements` global digunakan untuk mendefinisikan elemen khusus dan mengajarkan tag baru pada
browser. Panggil `customElements.define()` dengan nama tag yang ingin Anda
buat dan `class` JavaScript yang memperluas `HTMLElement` dasar.

**Contoh** - mendefinisikan panel samping seluler, `<app-drawer>`:


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

Contoh penggunaan:


    <app-drawer></app-drawer>
    

Perlu diingat bahwa menggunakan elemen khusus tidak ada bedanya dengan menggunakan `<div>` atau elemen lainnya. Instance bisa dideklarasikan di laman, yang dibuat secara dinamis di JavaScript, event listener bisa dilampirkan, dll. Teruskan membaca untuk melihat contoh lainnya.

### Mendefinisikan JavaScript API elemen {: #jsapi}

Fungsionalitas elemen khusus didefinisikan menggunakan ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) yang memperluas `HTMLElement`.
Perluasan `HTMLElement` akan memastikan elemen khusus mewarisi seluruh DOM API dan
berarti semua properti/metode yang Anda tambahkan ke kelas akan menjadi bagian dari antarmuka DOM elemen.
Pada dasarnya, gunakan kelas untuk membuat **JavaScript API publik** bagi tag Anda.

**Contoh** - mendefinisikan antarmuka DOM `<app-drawer>`:


    class AppDrawer extends HTMLElement {
    
      // A getter/setter for an open property.
      get open() {
        return this.hasAttribute('open');
      }
    
      set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
        this.toggleDrawer();
      }
    
      // A getter/setter for a disabled property.
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Can define constructor arguments if you wish.
      constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
    
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          // Don't toggle the drawer if it's disabled.
          if (this.disabled) {
            return;
          }
          this.toggleDrawer();
        });
      }
    
      toggleDrawer() {
        ...
      }
    }
    
    customElements.define('app-drawer', AppDrawer);
    

Dalam contoh ini, kita membuat panel samping yang memiliki properti `open`, properti `disabled`,
dan metode `toggleDrawer()`. Ini juga [merefleksikan properti sebagai atribut HTML](#reflectattr).

Sebuah fitur rapi dari elemen khusus adalah **`this` di dalam definisi kelas yang merujuk pada
elemen DOM itu sendiri** yakni instance kelas. Dalam contoh kita, `this` merujuk pada `<app-drawer>`. (😉) ini adalah cara elemen melampirkan listener `click` ke dirinya sendiri! Dan Anda tidak dibatasi pada event listener. Seluruh DOM API tersedia di dalam kode elemen. Gunakan `this` untuk mengakses properti elemen, memeriksa anaknya (`this.children`), membuat kueri simpul (`this.querySelectorAll('.items')`), dll.

**Aturan pembuatan elemen khusus**

1. Nama elemen khusus **harus berisi tanda hubung (-)**. Jadi `<x-tags>`, `<my-element>`, dan `<my-awesome-app>` semuanya adalah nama yang valid, sedangkan `<tabs>` dan `<foo_bar>` tidak valid. Persyaratan ini agar HTML parser bisa membedakan elemen khusus dari elemen biasa. Ini juga memastikan kompatibilitas ke depan bila tag baru ditambahkan ke HTML.
2. Anda tidak bisa mendaftarkan tag yang sama lebih dari satu kali. Mencobanya akan melontarkan `DOMException`. Setelah Anda memberi tahu browser tentang tag baru, selesailah urusan. Tidak ada jalan kembali.
3. Elemen khusus tidak bisa menutup-sendiri karena HTML hanya mengizinkan [beberapa elemen](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) yang bisa menutup-sendiri. Tulislah selalu tag penutup (<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>).

## Memperluas elemen {: #extend}

Custom Elements API berguna untuk membuat elemen baru HTML, juga berguna
untuk memperluas elemen khusus lainnya atau bahkan HTML bawaan browser.

### Memperluas elemen khusus {: #extendcustomeel}

Memperluas elemen khusus lain dilakukan dengan memperluas definisi kelasnya.

**Contoh** - buat `<fancy-app-drawer>` yang memperluas `<app-drawer>`:


    class FancyDrawer extends AppDrawer {
      constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
        ...
      }
    
      toggleDrawer() {
        // Possibly different toggle implementation?
        // Use ES2015 if you need to call the parent method.
        // super.toggleDrawer()
      }
    
      anotherMethod() {
        ...
      }
    }
    
    customElements.define('fancy-app-drawer', FancyDrawer);
    

### Memperluas elemen bawaan HTML {: #extendhtml}

Anggaplah Anda ingin membuat `<button>` yang lebih keren. Daripada mengulangi perilaku dan
fungsionalitas `<button>`, lebih baik menyempurnakan secara progresif elemen yang ada dengan menggunakan elemen khusus.

**Elemen bawaan yang disesuaikan** adalah elemen khusus yang memperluas salah satu tag HTML
bawaan browser. Manfaat utama memperluas elemen yang sudah ada adalah untuk
mendapatkan semua fiturnya (properti DOM, metode, aksesibilitas). Tidak ada cara yang lebih baik untuk menulis [progressive web app](/web/progressive-web-apps/) daripada **menyempurnakan secara progresif elemen HTML yang sudah ada**.

Untuk memperluas sebuah elemen, Anda perlu membuat sebuah definisi kelas yang mewarisi dari
antarmuka DOM yang tepat. Misalnya, sebuah elemen khusus yang memperluas `<button>`
perlu mewarisi dari `HTMLButtonElement` sebagai ganti `HTMLElement`. Demikian pula,
elemen yang memperluas `<img>` perlu memperluas `HTMLImageElement`.

**Contoh** - memperluas `<button>`:


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
      }
    
      // Material design ripple animation.
      drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
      }
    }
    
    customElements.define('fancy-button', FancyButton, {extends: 'button'});
    

Perhatikan, panggilan ke `define()` sedikit berubah saat memperluas elemen asli. Parameter ketiga yang diperlukan memberi tahu browser mengenai tag yang akan Anda perluas. Ini diperlukan karena banyak tag HTML yang berbagi antarmuka DOM yang sama. `<section>`, `<address>`, dan `<em>` (di antaranya) sama-sama menggunakan `HTMLElement`; baik `<q>` maupun `<blockquote>` sama-sama menggunakan `HTMLQuoteElement`; dll.. Penetapan `{extends: 'blockquote'}` akan memungkinkan browser mengetahui bahwa Anda sedang membuat `<blockquote>` yang disempurnakan sebagai ganti `<q>`. Lihat [spesifikasi HTML](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces) untuk mengetahui
daftar lengkap antarmuka DOM HTML.

Note: Memperluas `HTMLButtonElement` akan memberikan tombol keren kita dengan semua properti/metode DOM dari `<button>`. Itu akan mencocokkan banyak hal yang tidak perlu kita implementasikan sendiri: properti `disabled`, metode `click()`, listener `keydown`, dan manajemen `tabindex`. Sebagai gantinya, kita bisa memfokuskan penyempurnaan `<button>` secara progresif dengan fungsionalitas khusus, yang disebut metode `drawRipple()`. Semakin sedikit kode, semakin bisa digunakan kembali!

Konsumen elemen bawaan yang disesuaikan bisa menggunakannya dalam beberapa cara.
Mereka bisa mendeklarasikannya dengan menambahkan atribut `is=""` pada tag bawaan:


    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Fancy button!</button>
    

membuat instance di JavaScript:


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

atau menggunakan operator `new`:


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

Inilah contoh lain yang memperluas `<img>`.

**Contoh** - memperluas `<img>`:


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

Pengguna mendeklarasikan komponen ini sebagai:


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

atau membuat instance di JavaScript:


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

Note: Sebagian browser menyatakan keengganan untuk mengimplementasikan sintaks <code>is=""</code>. Hal ini tidak menguntungkan untuk aksesibilitas dan penyempurnaan progresif. Jika menurut Anda memperluas elemen HTML native berguna, sampaikan pendapat Anda <a href='https://github.com/w3c/webcomponents/issues/509'>di Github</a>.

## Reaksi elemen khusus {: #reactions}

Sebuah elemen khusus bisa mendefinisikan sangkutan daur hidup khusus untuk menjalankan kode selama
waktu menarik dari keberadaannya. Ini disebut **reaksi elemen khusus**.

<table>
  <thead>
    <tr>
      <th>Nama</th>
      <th>Dipanggil bila</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>Instance elemen yang dibuat atau <a href="#upgrades">ditingkatkan versinya</a>. Berguna untuk memulai state, menyiapkan event listener, atau <a href="#shadowdom">membuat shadow DOM</a>. Lihat <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">spec</a> untuk mengetahui pembatasan terhadap apa yang bisa Anda lakukan di <code>constructor</code>.</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>Dipanggil setiap kali elemen disisipkan ke dalam DOM. Berguna untuk menjalankan kode penyiapan, misalnya mengambil sumber daya atau rendering. Biasanya, Anda harus mencoba menunda pekerjaan hingga waktu ini.</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>Dipanggil setiap kali elemen dibuang dari DOM. Berguna untuk menjalankan kode pembersihan (membuang event listener, dll.).</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>Sebuah atribut telah ditambahkan, dibuang, diperbarui, atau diganti. Juga dipanggil untuk nilai awal bila sebuah elemen telah dibuat oleh parser, atau <a href="#upgrades">ditingkatkan versinya</a>. <b>Catatan:</b> hanya atribut yang tercantum di properti <code>observedAttributes</code> yang akan menerima callback ini.</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>Elemen khusus yang telah dipindah ke dalam <code>document</code> baru (mis. seseorang memanggil <code>document.adoptNode(el)</code>).</td>
    </tr>
  </tbody>
</table>

Browser memanggil `attributeChangedCallback()` untuk semua atribut yang masuk daftar putih
di larik `observedAttributes` (lihat [Mengamati perubahan pada atribut](#attrchanges)).
Pada dasarnya, ini merupakan optimalisasi kinerja. Bila pengguna mengubah atribut
umum seperti `style` atau `class`, tentu Anda tidak ingin jadi korban spam dengan segudang callback.

**Callback reaksi bersifat sinkron**. Jika seseorang memanggil `el.setAttribute(...)`
pada elemen Anda, browser akan segera memanggil `attributeChangedCallback()`. Demikian pula,
Anda akan menerima sebuah `disconnectedCallback()` langsung setelah elemen Anda dibuang dari
DOM (mis. pengguna memanggil `el.remove()`).

**Contoh:** menambahkan reaksi elemen khusus ke `<app-drawer>`:


    class AppDrawer extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
        ...
      }
      connectedCallback() {
        ...
      }
      disconnectedCallback() {
        ...
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        ...
      }
    }
    

Definisikan reaksi jika/bila memang logis. Jika elemen Anda cukup kompleks dan membuka koneksi ke IndexedDB di `connectedCallback()`, lakukan pekerjaan pembersihan di `disconnectedCallback()`. Namun hati-hati! Bagaimana pun, Anda tidak bisa mengandalkan elemen Anda yang akan dibuang dari DOM. Misalnya, `disconnectedCallback()` tidak akan pernah dipanggil jika pengguna menutup tab.

**Contoh:** memindah elemen khusus ke dalam dokumen lain, dengan mengamati `adoptedCallback()`-nya:


    function createWindow(srcdoc) {
      let p = new Promise(resolve => {
        let f = document.createElement('iframe');
        f.srcdoc = srcdoc || '';
        f.onload = e => {
          resolve(f.contentWindow);
        };
        document.body.appendChild(f);
      });
      return p;
    }
    
    // 1. Create two iframes, w1 and w2.
    Promise.all([createWindow(), createWindow()])
      .then(([w1, w2]) => {
        // 2. Define a custom element in w1.
        w1.customElements.define('x-adopt', class extends w1.HTMLElement {
          adoptedCallback() {
            console.log('Adopted!');
          }
        });
        let a = w1.document.createElement('x-adopt');
    
        // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
        w2.document.body.appendChild(a);
      });
    

## Properti dan atribut

### Merefleksikan properti ke atribut {: #reflectattr}

Sudah umum bagi properti HTML merefleksikan kembali nilainya ke DOM sebagai atribut HTML.
Misalnya, bila nilai `hidden` atau `id` berubah di JS:


    div.id = 'my-id';
    div.hidden = true;
    

nilai-nilai tersebut diterapkan ke DOM live sebagai atribut:


    <div id="my-id" hidden>
    

Ini disebut "[merefleksikan properti ke atribut](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)". Kebanyakan setiap properti di HTML melakukan hal ini. Mengapa? Atribut juga berguna untuk mengonfigurasi
elemen secara deklaratif dan API tertentu seperti aksesibilitas dan pemilih CSS mengandalkan atribut untuk berfungsi.

Merefleksikan properti berguna bila Anda ingin **membuat representasi DOM
elemen tetap sinkron dengan status JavaScript-nya**. Salah satu alasan Anda mungkin perlu
merefleksikan properti adalah agar penataan gaya yang didefinisikan pengguna diterapkan saat status JS berubah.

Panggil kembali `<app-drawer>` kita. Konsumen komponen ini mungkin ingin melenyapkannya
dan/atau mencegah interaksi pengguna bila ini telah dinonaktifkan:


    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

Bila properti `disabled` berubah di JS, kita ingin atribut itu ditambahkan
ke DOM agar cocok dengan pemilih pengguna. Elemen bisa menyediakan perilaku itu
dengan merefleksikan nilai ke atribut yang sama namanya:


    ...
    
    get disabled() {
      return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
      // Reflect the value of `disabled` as an attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.toggleDrawer();
    }
    

### Mengamati perubahan pada atribut {: #attrchanges}

Atribut HTML adalah cara praktis bagi pengguna untuk mendeklarasikan status awal:


    <app-drawer open disabled></app-drawer>
    

Elemen bisa bereaksi pada perubahan atribut dengan mendefinisikan `attributeChangedCallback`.
Browser akan memanggil metode ini untuk setiap perubahan pada atribut yang tercantum di larik `observedAttributes`.


    class AppDrawer extends HTMLElement {
      ...
    
      static get observedAttributes() {
        return ['disabled', 'open'];
      }
    
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
      }
    }
    

Dalam contoh, kita membuat atribut tambahan pada `<app-drawer>` bila atribut
`disabled` berubah. Walaupun kita tidak melakukannya di sini, Anda juga bisa
**menggunakan `attributeChangedCallback` untuk membuat properti JS tetap sinkron dengan atributnya**.

## Peningkatan versi elemen {: #upgrades}

### HTML yang disempurnakan secara progresif

Kita sudah mengetahui bahwa elemen khusus didefinisikan dengan memanggil `customElements.define()`.
Namun tidak berarti Anda harus mendefinisikan + mendaftarkan elemen khusus sekaligus.

**Elemen khusus bisa digunakan _sebelum_ definisinya didaftarkan**.

Penyempurnaan progresif adalah fitur elemen khusus. Dengan kata lain, Anda bisa mendeklarasikan sederet elemen `<app-drawer>` di laman dan tidak akan pernah memanggil `customElements.define('app-drawer', ...)` nanti. Hal ini karena browser memperlakukan elemen khusus potensial secara berbeda karena [tag yang tak dikenal](#unknown). Proses pemanggilan `define()` dan memberikan elemen yang ada beserta definisi kelas disebut "peningkatan versi elemen".

Untuk mengetahui kapan nama tag menjadi defined, Anda bisa menggunakan `window.customElements.whenDefined()`.
Ini akan menjajakan sebuah Promise yang akan ditetapkan bila elemen menjadi defined.


    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**Contoh** - menunda pekerjaan hingga satu set elemen anak ditingkatkan versinya


    <share-buttons>
      <social-button type="twitter"><a href="...">Twitter</a></social-button>
      <social-button type="fb"><a href="...">Facebook</a></social-button>
      <social-button type="plus"><a href="...">G+</a></social-button>
    </share-buttons>
    


    // Fetch all the children of <share-buttons> that are not defined yet.
    let undefinedButtons = buttons.querySelectorAll(':not(:defined)');
    
    let promises = [...undefinedButtons].map(socialButton => {
      return customElements.whenDefined(socialButton.localName);
    ));
    
    // Wait for all the social-buttons to be upgraded.
    Promise.all(promises).then(() => {
      // All social-button children are ready.
    });
    

Note: Saya menganggap elemen khusus sebagai elemen yang menggantung sebelum nasibnya didefinisikan. [spec](https://dom.spec.whatwg.org/#concept-element-custom-element-state) mendefinisikan status elemen sebagai "undefined", "uncustomized", atau "custom". Elemen bawaan seperti `<div>` selalu "defined".

## Materi yang didefinisikan elemen {: #addingmarkup}

Elemen khusus bisa mengelola materinya sendiri dengan menggunakan DOM API di dalam kode elemen. [Reaksi](#reactions) terutama berguna dalam hal ini.

**Contoh** - buat elemen dengan beberapa HTML default:

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
Declaring this tag will produce:

    <x-foo-with-markup>
     <b>I'm an x-foo-with-markup!</b>
    </x-foo-with-markup>

{% framebox height="70px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}
.demoarea::before {
  display: block;
  content: 'DEMO';
}
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-with-markup', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

Note: Mengganti anak elemen dengan materi baru umumnya bukan ide yang baik karena hal itu tidak diharapkan. Pengguna akan kaget melihat markup mereka dibuang. Cara yang lebih baik untuk menambahkan materi yang didefinisikan elemen adalah menggunakan shadow DOM, yang akan kita bicarakan berikutnya.

### Membuat elemen yang menggunakan Shadow DOM {: #shadowdom}

Note: Saya tidak akan membahas berbagai fitur [Shadow DOM][sd_spec] dalam artikel ini, namun
ini merupakan API andal untuk dikombinasikan bersama elemen khusus. Dengan sendirinya, Shadow DOM adalah
alat komposisi. Bila digunakan bersama elemen khusus, akan terjadi sesuatu yang ajaib.


Shadow DOM menyediakan cara bagi elemen untuk memiliki, merender, dan menata gaya suatu bagian DOM
yang terpisah dari bagian laman lainnya. Anda bahkan bisa menyembunyikan
keseluruhan aplikasi dalam satu tag:


    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

Untuk menggunakan Shadow DOM di elemen khusus, panggil `this.attachShadow` di dalam `constructor` Anda:

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>:host { ... }</style> <!-- look ma, scoped styles -->
          <b>I'm in shadow dom!</b>
          <slot></slot>
        `;
      }
      ...
    });

Contoh penggunaan:

    <x-foo-shadowdom>
      <p><b>User's</b> custom text</p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>I'm in shadow dom!</b>
      <slot></slot>
    </x-foo-shadowdom>

{% framebox height="130px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-shadowdom', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <b>I'm in shadow dom!</b>
        <slot></slot>
      `;
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### Membuat elemen dari `<template>` {: #fromtemplate}

Bagi mereka yang belum familier, [elemen `<template>`](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) memungkinkan Anda mendeklarasikan fragmen DOM yang telah di-parse, membekukan pemuatan laman, dan bisa diaktifkan nanti saat waktu proses. Ini adalah primitif API yang lain dalam keluarga komponen web. **Template adalah placeholder ideal untuk mendeklarasikan struktur elemen khusus**.

**Contoh:** mendaftarkan elemen dengan materi Shadow DOM yang dibuat dari `<template>`:

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
    </template>
    
    <script>
      customElements.define('x-foo-from-template', class extends HTMLElement {
        constructor() {
          super(); // always call super() first in the ctor.
          let shadowRoot = this.attachShadow({mode: 'open'});
          const t = document.querySelector('#x-foo-from-template');
          const instance = t.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
        ...
      });
    </script>
    

Beberapa baris kode ini punya kemampuan hebat. Mari kita pahami hal-hal pokok yang terjadi:

1. Kita mendefinisikan elemen baru dalam HTML: `<x-foo-from-template>`
2. Shadow DOM elemen dibuat dari `<template>`
3. DOM elemen bersifat lokal pada elemen berkat Shadow DOM
4. CSS internal elemen mencakup elemen berkat Shadow DOM

{% framebox height="100px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: orange; }</style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      shadowRoot.appendChild(t.content.cloneNode(true));
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

## Penataan gaya elemen khusus {: #styling}

Sekalipun elemen Anda mendefinisikan penataan gayanya sendiri menggunakan Shadow DOM, pengguna bisa
menata gaya elemen khusus Anda dari laman mereka. Ini disebut "gaya yang didefinisikan pengguna".


    <!-- user-defined styling -->
    <style>
      app-drawer {
        display: flex;
      }
      panel-item {
        transition: opacity 400ms ease-in-out;
        opacity: 0.3;
        flex: 1;
        text-align: center;
        border-radius: 50%;
      }
      panel-item:hover {
        opacity: 1.0;
        background: rgb(255, 0, 255);
        color: white;
      }
      app-panel > panel-item {
        padding: 5px;
        list-style: none;
        margin: 0 7px;
      }
    </style>
    
    <app-drawer>
      <panel-item>Do</panel-item>
      <panel-item>Re</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

Anda mungkin bertanya-tanya bagaimana kekhususan CSS akan berfungsi jika elemen memiliki
gaya yang didefinisikan dalam Shadow DOM. Dalam konteks kekhususan, gaya pengguna yang akan menang.
Gaya tersebut akan selalu menggantikan penataan gaya yang didefinisikan elemen. Lihat bagian tentang [Membuat elemen yang menggunakan Shadow DOM](#shadowdom).

### Pra-penataan gaya atas elemen yang tidak terdaftar {: #prestyle}

Sebelum sebuah elemen [ditingkatkan versi](#upgrades) Anda bisa menargetkannya dalam CSS dengan menggunakan kelas-semu `:defined`.
Ini berguna untuk pra-penataan gaya komponen. Misalnya, Anda mungkin ingin mencegah
layout atau FOUC visual lainnya dengan menyembunyikan komponen yang tidak didefinisikan dan memunculkannya
bila telah didefinisikan.

**Contoh** - sembunyikan `<app-drawer>` sebelum ia didefinisikan:


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

Setelah `<app-drawer>` didefinisikan, pemilih (`app-drawer:not(:defined)`)
tidak cocok lagi.

## Detail lain-lain {: #details}

### Elemen tak dikenal vs. elemen khusus yang belum didefinisikan {: #unknown}

HTML toleran dan fleksibel untuk digunakan. Misalnya, deklarasikan `<randomtagthatdoesntexist>` di laman dan browser akan menerimanya dengan senang hati. Mengapa tag non-standar bisa berfungsi? Jawabannya adalah [spesifikasi HTML](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement) mengizinkannya. Elemen yang tidak didefinisikan oleh spesifikasi akan di-parse sebagai `HTMLUnknownElement`.

Hal yang sama tidak berlaku untuk elemen khusus. Elemen khusus yang potensial akan di-parse sebagai
`HTMLElement` jika dibuat dengan nama yang valid (menyertakan "-"). Anda bisa memeriksanya di browser yang mendukung elemen khusus. Buka Konsol: <span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span> (atau <span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span> di Mac) dan tempelkan dalam baris kode berikut:


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## Referensi API

`customElements` global mendefinisikan metode berguna untuk menangani elemen khusus.

**`define(tagName, constructor, options)`**

Mendefinisikan elemen khusus baru di browser.

Contoh


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

Asalkan nama tag elemen khusus valid, akan mengembalikan konstruktor elemen. Mengembalikan `undefined`
jika tidak ada definisi elemen yang terdaftar.

Contoh


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

Mengembalikan Promise yang menetapkan kapan elemen khusus didefinisikan. Jika elemen
sudah didefinisikan, segera tetapkan. Menolak jika nama tag bukan
nama elemen khusus yang valid

Contoh


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## Riwayat dan dukungan browser {: #historysupport}

Jika Anda mengikuti perkembangan komponen web selama dua tahun terakhir, Anda akan tahu bahwa
Chrome 36+ mengimplementasikan versi Custom Elements API yang menggunakan `document.registerElement()`
sebagai ganti `customElements.define()`. Itu sekarang dianggap versi
standar yang tidak digunakan lagi, disebut v0. `customElements.define()` adalah antusiasme baru dan mulai diimplementasikan oleh
vendor browser. Ini disebut Custom Elements v1.

Jika Anda ternyata tertarik dengan spesifikasi lama v0, lihat [artikel html5rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }.

### Dukungan browser

Chrome 54 ([status](https://www.chromestatus.com/features/4696261944934400)) memiliki Elemen Khusus v1. Safari telah [memulai pembuatan prototipe](https://bugs.webkit.org/show_bug.cgi?id=150225) dan Anda bisa menguji API ini di WebKit nightly. Edge telah [memulai pembuatan prototipe](https://twitter.com/AaronGustafson/status/717028669948977153). Mozilla memiliki [bug terbuka](https://bugzilla.mozilla.org/show_bug.cgi?id=889230) untuk diimplementasikan.

Agar fitur mendeteksi elemen khusus, periksa keberadaan `window.customElements`:


    const supportsCustomElementsV1 = 'customElements' in window;
    

#### Polyfill {: #polyfill}

Sebelum dukungan browser tersedia secara luas, tersedia [polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js). 

**Catatan**: kelas-semu CSS `:defined` tidak bisa di-polyfill.

Pasang:

    bower install --save webcomponents/custom-elements

Penggunaan:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }
    
    // Lazy load the polyfill if necessary.
    if (!supportsCustomElementsV1) {
      loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
      });
    } else {
      // Native support. Good to go.
    }
    

## Kesimpulan

Elemen khusus memberi kita alat baru untuk mendefinisikan tag HTML baru di browser dan membuat komponen
yang dapat digunakan kembali. Kombinasikan semua itu dengan primitif platform baru seperti Shadow DOM dan `<template>`, maka kita mulai menyadari gambar besar dari Komponen Web:

- Lintas-browser (standar web) untuk membuat dan memperluas komponen yang dapat digunakan kembali.
- Tidak memerlukan pustaka atau kerangka kerja untuk memulai. JS/HTML FTW biasa!
- Menyediakan model pemrograman yang familier. Cuma DOM/CSS/HTML.
- Berfungsi dengan baik bersama fitur platform web baru lainnya (Shadow DOM, `<template>`, properti khusus CSS, dll.)
- Terintegrasi erat dengan DevTools browser.
- Memanfaatkan fitur aksesibilitas yang sudah ada.

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
