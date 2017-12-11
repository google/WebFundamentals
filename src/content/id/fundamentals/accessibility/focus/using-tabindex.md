project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Memodifikasi urutan DOM dengan tabindex


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Menggunakan tabindex {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Urutan tab default yang disediakan oleh posisi DOM elemen asli sudah
praktis, namun ada kalanya Anda ingin memodifikasi urutan tab, dan
secara fisik memindahkan elemen di HTML tidak selalu merupakan solusi
yang optimal, apalagi layak. Untuk kasus-kasus ini, Anda bisa menggunakan atribut HTML `tabindex` untuk
menyetel posisi tab elemen secara eksplisit.

`tabindex` bisa diterapkan ke elemen apa saja &mdash; walaupun tidak harus
berguna pada setiap elemen &mdash; dan menggunakan serangkaian nilai integer. Dengan menggunakan
`tabindex`, Anda bisa menetapkan urutan eksplisit untuk elemen laman yang bisa difokus,
menyisipkan elemen yang tidak bisa difokus ke dalam urutan tab, dan membuang elemen
dari urutan tab. Misalnya:

`tabindex="0"`: Menyisipkan sebuah elemen ke dalam urutan tab alami. Elemen bisa
difokus dengan menekan tombol `Tab`, dan elemen bisa difokus dengan memanggil
metode `focus()` -nya

    <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>

{% framebox height="60px" %}
<style>
  custom-button {
    margin: 10px;
  }
</style>
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`: Membuang elemen dari urutan tab alami, namun elemen
tetap bisa difokus dengan memanggil metode `focus()` -nya

    <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
    <button onclick="foo.focus();">Focus my sibling</button>

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`: Semua tabindex yang lebih besar dari 0 akan melompatkan elemen ke depan
urutan tab alami. Jika ada beberapa elemen dengan tabindex lebih besar
dari 0, urutan tab akan mulai dari nilai terendah yang lebih besar dari nol dan
terus ke atas. Menggunakan tabindex yang lebih besar dari 0 dianggap sebuah
**anti-pola**.

    <button>I should be first</button>
    <button>And I should be second</button>
    <button tabindex="5">But I jumped to the front!</button>

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

Hal ini khususnya berlaku untuk elemen non-masukan seperti header, gambar, atau judul
artikel. Penambahan `tabindex` ke elemen semacam itu adalah kontra-produktif. Jika
memungkinkan, sebaiknya susun kode sumber Anda agar urutan DOM menyediakan
urutan tab yang logis. Jika Anda menggunakan `tabindex`, batasi pada tombol kontrol
interaktif khusus seperti tombol, tab, tarik-turun, dan bidang teks; yakni, elemen yang
mungkin dikira pengguna untuk menyediakan masukan.

Jangan khawatir pengguna pembaca layar akan melewatkan materi penting karena
tidak memiliki `tabindex`. Sekalipun materi sangat penting, seperti gambar,
jika itu bukanlah hal yang akan berinteraksi dengan pengguna, maka tidak ada alasan
membuatnya bisa difokus. Pengguna pembaca layar tetap bisa memahami materi gambar
asalkan Anda menyediakan dukungan atribut `alt` yang sesuai, yang nanti akan kita bahas sebentar lagi.

## Mengelola fokus pada level laman

Inilah skenario di mana `tabindex` tidak hanya berguna, melainkan diperlukan. Anda mungkin
membangun laman tunggal yang sempurna dengan beragam bagian materi, yang tidak semuanya
terlihat sekaligus. Di laman semacam ini, mengeklik tautan
navigasi mungkin mengubah materi yang terlihat tanpa melakukan penyegaran laman.

Bila ini terjadi, Anda mungkin akan mengidentifikasi area materi yang dipilih, memberinya
sebuah `tabindex` berupa -1 sehingga tidak muncul dalam urutan tab alami, dan
memanggil metode `focus`-nya. Teknik ini, yang disebut *mengelola fokus*, akan membuat
konteks yang dipersepsi pengguna tetap sinkron dengan materi visual situs.

## Mengelola fokus di komponen

Mengelola fokus saat Anda mengubah sesuatu di laman adalah hal penting, namun
kadang-kadang Anda perlu mengelola fokus pada level kontrol &mdash; misalnya, jika
sedang membangun komponen khusus.

Pertimbangkan elemen `select` asli. Elemen ini bisa menerima fokus dasar, bila
ada, Anda bisa menggunakan tombol panah untuk mengekspos fungsionalitas tambahan (opsi yang
bisa dipilih). Jika sedang membangun elemen `select` khusus, Anda tentu
ingin mengekspos perilaku semacam ini sehingga pengguna yang terutama mengandalkan
keyboard tetap bisa berinteraksi dengan kontrol Anda.

    <!-- Focus the element using Tab and use the up/down arrow keys to navigate -->
    <select>
      <option>Aisle seat</option>
      <option>Window seat</option>
      <option>No preference</option>
    </select>

<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>

Boleh jadi sulit mengetahui perilaku keyboard mana yang akan diimplementasikan, namun ada
dokumen berguna yang bisa Anda rujuk. Panduan
[Accessible Rich Internet Applications (ARIA) Authoring Practices](https://www.w3.org/TR/wai-aria-practices/){: .external } 
mencantumkan daftar tipe komponen dan macam tindakan keyboard yang didukungnya.
Kita akan membahas ARIA secara lebih detail nanti, namun untuk saat ini mari kita gunakan panduan tersebut untuk membantu
menambahkan dukungan keyboard ke sebuah komponen baru.

Mungkin Anda sedang mengerjakan beberapa [Elemen
Khusus](/web/fundamentals/getting-started/primers/customelements) baru yang
menirukan serangkaian tombol radio, namun dengan penampilan dan perilaku tiruan
yang unik.

    <radio-group>
      <radio-button>Water</radio-button>
      <radio-button>Coffee</radio-button>
      <radio-button>Tea</radio-button>
      <radio-button>Cola</radio-button>
      <radio-button>Ginger Ale</radio-button>
    </radio-group>

Untuk menentukan dukungan keyboard macam apa yang dibutuhkan, Anda perlu memeriksa
[panduan ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/){: .external }.
Bagian 2 berisi daftar pola desain, dan dalam daftar itu adalah
[tabel karakteristik untuk grup tombol radio](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external },
komponen yang ada yang paling cocok dengan elemen baru Anda.

Seperti yang bisa Anda lihat dalam tabel, salah satu perilaku keyboard umum yang
harus didukung adalah tombol panah naik/turun/kiri/kanan. Untuk menambahkan perilaku ini ke komponen
baru, kita akan menggunakan teknik yang disebut *roving tabindex*.

![kutipan spesifikasi W3C untuk tombol radio](imgs/radio-button.png)

Roving tabindex bekerja dengan menyetel `tabindex` ke -1 untuk semua anak selain
yang saat ini aktif.

    <radio-group>
      <radio-button tabindex="0">Water</radio-button>
      <radio-button tabindex="-1">Coffee</radio-button>
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Selanjutnya komponen menggunakan event listener keyboard untuk menentukan
tombol mana yang ditekan pengguna; bila terjadi, maka ini akan menyetel
`tabindex` anak yang difokus sebelumnya ke -1, menyetel `tabindex` anak yang
akan difokus ke 0, dan memanggil metode padanya.

    <radio-group>
      // Assuming the user pressed the down arrow, we'll focus the next available child
      <radio-button tabindex="-1">Water</radio-button>
      <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Bila pengguna mencapai anak yang terakhir (atau pertama, bergantung pada
arahnya menggerakkan fokus), Anda akan membuat loop dan memfokus lagi
anak yang pertama (atau terakhir).

Anda bisa mencoba contoh yang telah selesai di bawah ini. Periksa elemen di
DevTools untuk mengamati pergerakan tabindex dari satu tombol radio ke tombol berikutnya.

{% framebox height="130px" %}
<style>
  .demo {
    margin-left: 80px;
  }
  radio-button {
    position: relative;
    display: block;
    font-size: 18px;
  }
  radio-button:focus {
    outline: none;
  }
  radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
  radio-button:focus::before {
    box-shadow: 0 0 3px 3px #83BEFF;
  }
  radio-button[aria-checked="true"]::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: red;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
</style>

<div class="demo">
  <radio-group>
    <radio-button>Water</radio-button>
    <radio-button>Coffee</radio-button>
    <radio-button>Tea</radio-button>
    <radio-button>Cola</radio-button>
    <radio-button>Ginger Ale</radio-button>
  </radio-group>
</div>

<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>

<script>
  class RadioButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-checked', false);
    }
  }

  window.customElements.define('radio-button', RadioButton);

  // Define values for keycodes
  const VK_LEFT       = 37;
  const VK_UP         = 38;
  const VK_RIGHT      = 39;
  const VK_DOWN       = 40;

  class RadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-button'));

      // Setup initial state
      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeyDown(e) {
      switch(e.keyCode) {

        case VK_UP:
        case VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;

        }

        case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }

      }
    }

    handleClick(e) {
      const idx = this.radios.indexOf(e.target);
      if (idx === -1) {
        return;
      }
      this.selected = idx;
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        // Set the old button to tabindex -1
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', false);
      }

      // Set the new button to tabindex 0 and focus it
      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-group', RadioGroup);
</script>
{% endframebox %}

Anda bisa menampilkan
[sumber lengkap elemen ini](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }
melalui GitHub.

## Modal dan jebakan keyboard

Kadang-kadang saat mengelola fokus, Anda bisa masuk ke suatu situasi
dan tidak bisa keluar lagi. Perhatikan sebuah widget pelengkapan otomatis yang mencoba mengelola fokus serta merekam
perilaku tab, namun mencegah pengguna meninggalkannya bila belum selesai.
Ini disebut *jebakan keyboard*, dan hal ini bisa sangat mengesalkan pengguna.
Bagian 2.1.2 pada daftar periksa Web AIM menangani masalah ini, yang menyatakan bahwa
[fokus keyboard tidak boleh dikunci atau terjebak pada satu elemen laman tertentu](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }.
Pengguna harus bisa mengarah ke dan dari semua elemen laman hanya dengan menggunakan
keyboard.

Anehnya, ada kalanya perilaku ini malah sebenarnya yang diinginkan, seperti
jendela modal. Biasanya, bila modal ditampilkan, Anda ingin pengguna mengakses
materi di baliknya. Anda mungkin menambahkan overlay untuk menutupi laman secara visual, namun
itu tidak menghentikan pergerakan fokus keyboard keluar dari modal secara tidak sengaja.

![jendela modal yang meminta pengguna menyimpan pekerjaan mereka](imgs/modal-example.png)

Dalam instance seperti ini Anda bisa mengimplementasikan jebakan keyboard sementara untuk memastikan
bahwa Anda menjebak fokus hanya saat modal ditampilkan kemudian memulihkan fokus
item yang sebelumnya difokus bila modal ditutup.

>Ada beberapa proposal mengenai cara untuk mempermudah hal ini bagi developer, termasuk
elemen `<dialog>`, namun belum mendapatkan dukungan browser yang luas.
>
>Lihat [artikel MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }
ini untuk informasi selengkapnya mengenai `<dialog>`, dan
[contoh modal](https://github.com/gdkraus/accessible-modal-dialog){: .external } untuk
informasi selengkapnya mengenai jendela modal.

Perhatikan dialog modal yang dinyatakan oleh `div` yang berisi beberapa elemen, dan
`div` yang menyatakan overlay latar belakang. Mari kita bahas langkah-langkah
dasar yang dibutuhkan untuk mengimplementasikan jebakan keyboard sementara di situasi ini.

 1. Dengan menggunakan `document.querySelector`, pilih div modal dan overlay serta simpan
    referensinya.
 1. Saat modal dibuka, simpan referensi ke elemen yang telah difokus ketika
    modal dibuka sehingga Anda bisa mengembalikan fokus ke elemen itu.
 1. Gunakan *keydown listener* untuk menangkap tombol-tombol yang ditekan saat modal
    dibuka. Anda juga mendengarkan klik di overlay latar belakang, dan menutup
    modal jika pengguna mengekliknya.
 1. Berikutnya, ambil kumpulan elemen yang bisa difokus dalam modal. Elemen
    yang bisa difokus pertama dan terakhir akan berfungsi sebagai "sentinel" untuk memberi tahu Anda kapan
    membuat loop fokus ke depan atau ke belakang agar tetap berada dalam modal.
 1. Tampilkan jendela modal dan fokus elemen yang bisa difokus pertama.
 1. Saat pengguna menekan `Tab` atau `Shift+Tab`, pindahkan fokus ke depan atau ke belakang,
    dengan melakukan loop pada elemen terakhir atau pertama.
 1. Jika pengguna menekan `Esc`, tutuplah modal. Hal ini sangat membantu karena
    memungkinkan pengguna menutup modal tanpa menelusuri tombol
    tutup tertentu, dan hal ini menguntungkan bahkan untuk pengguna yang menggunakan mouse.
 1. Bila tombol modal ditutup, sembunyikan ini dan overlay latar belakang, serta pulihkan
    fokus ke elemen yang telah difokus sebelumnya yang telah disimpan.

Prosedur ini memberi Anda jendela modal yang berguna dan tidak mengesalkan, yang bisa digunakan
siapa saja secara efektif.

Untuk detail selengkapnya, Anda bisa memeriksa [kode contoh](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external } ini,
dan menampilkan contoh langsung dari
[laman yang telah selesai](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }.



{# wf_devsite_translation #}
