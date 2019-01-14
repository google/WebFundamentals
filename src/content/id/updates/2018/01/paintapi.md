project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS Paint API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Kemungkinan baru di Chrome Cat API CSS CSS (juga dikenal sebagai &quot;Cat Custom CSS&quot; atau &quot;workwall cat Houdini&quot;) akan diaktifkan secara default di Chrome Stable. Apa itu? Apa yang bisa kamu lakukan dengan itu? Dan bagaimana cara kerjanya? Yah, baca terus, ya &#39;…


CSS Paint API memungkinkan Anda memprogram menghasilkan gambar setiap kali properti CSS mengharapkan gambar. Properti seperti `background-image` atau `border-image` biasanya digunakan dengan `url()` untuk memuat file gambar atau dengan fungsi-fungsi `linear-gradient()` CSS seperti `linear-gradient()` . Daripada menggunakan itu, Anda sekarang dapat menggunakan `paint(myPainter)` untuk merujuk ke _paint worklet_.

### Menulis sebuah worklet cat

Untuk mendefinisikan worklet cat yang disebut `myPainter` , kita perlu memuat file worklet cat CSS menggunakan `CSS.paintWorklet.addModule('my-paint-worklet.js')` . Dalam file itu kita dapat menggunakan fungsi `registerPaint` untuk mendaftarkan kelas worklet cat:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Di dalam callback `paint()` , kita dapat menggunakan `ctx` dengan cara yang sama kita akan sebuah `CanvasRenderingContext2D` seperti yang kita kenal dari `<canvas>` . Jika Anda tahu cara menggambar dalam `<canvas>` , Anda dapat menggambar di worklet cat! `geometry` memberi tahu kita lebar dan tinggi kanvas yang kita miliki. `properties` Akan saya jelaskan nanti di artikel ini.

Note: Konteks cat worklet tidak 100% sama dengan konteks `<canvas>` . Sampai sekarang, metode render teks hilang dan untuk alasan keamanan Anda tidak dapat membaca kembali piksel dari kanvas.

Sebagai contoh pengantar, mari kita menulis sebuah worklet dam dam dan menggunakannya sebagai gambar latar belakang dari `<textarea>` . (Saya menggunakan textarea karena itu dapat diubah ukurannya secara default.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Jika Anda pernah menggunakan `<canvas>` di masa lalu, kode ini akan terlihat familier. Lihat [demo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) langsung di sini.

Note: Seperti hampir semua API baru, CSS Paint API hanya tersedia melalui HTTPS (atau `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="
  Textarea with a checkerboard pattern as a background image.">

Perbedaan dari menggunakan gambar latar belakang umum di sini adalah bahwa pola tersebut akan ditarik kembali sesuai permintaan, setiap kali pengguna mengubah ukuran textarea. Ini berarti gambar latar belakang selalu sama besar dengan kebutuhannya, termasuk kompensasi untuk layar berdensitas tinggi.

Itu cukup keren, tetapi juga cukup statis. Apakah kita ingin menulis sebuah worklet baru setiap kali kita menginginkan pola yang sama tetapi dengan ukuran kotak yang berbeda? Jawabannya adalah tidak!

### Parameterisasi worklet Anda

Untungnya, worklet cat dapat mengakses properti CSS lainnya, yang mana parameter tambahan `properties` ikut bermain. Dengan memberikan kelas atribut `inputProperties` statis, Anda dapat berlangganan perubahan ke properti CSS apa pun, termasuk properti khusus. Nilai-nilai akan diberikan kepada Anda melalui parameter `properties` .

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Sekarang kita dapat menggunakan kode yang sama untuk semua jenis checkerboards yang berbeda. Tetapi lebih baik lagi, kita sekarang bisa masuk ke DevTools dan [fiddle with the values](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) sampai kita menemukan tampilan yang tepat.

<div style="display: flex; justify-content: center">
  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: Akan sangat bagus untuk menentukan warna juga, bukan? Spec memungkinkan fungsi `paint()` untuk mengambil daftar argumen. Fitur ini belum diimplementasikan di Chrome, karena sangat bergantung pada Houdini&#39;s Properties and Values ​​API, yang masih membutuhkan beberapa pekerjaan sebelum dapat dikirimkan.

## Browser yang tidak mendukung worklet cat Pada saat penulisan, hanya Chrome yang menerapkan paint worklet. Meskipun ada sinyal positif dari semua vendor browser lainnya, tidak ada banyak kemajuan. Untuk tetap up to date, periksa [Is Houdini Ready Yet?](https://ishoudinireadyyet.com) secara teratur. Sementara itu, pastikan untuk menggunakan peningkatan progresif untuk menjaga kode Anda tetap berjalan bahkan jika tidak ada dukungan untuk melukis worklet. Untuk memastikan semuanya bekerja seperti yang diharapkan, Anda harus menyesuaikan kode Anda di dua tempat: CSS dan JS.

Mendeteksi dukungan untuk worklet cat di JS dapat dilakukan dengan memeriksa objek `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Untuk sisi CSS, Anda memiliki dua opsi. Anda dapat menggunakan `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Trik yang lebih ringkas adalah dengan menggunakan fakta bahwa CSS membatalkan dan kemudian mengabaikan seluruh pernyataan properti jika ada fungsi yang tidak diketahui di dalamnya. Jika Anda menentukan properti dua kali - pertama tanpa worklet cat, dan kemudian dengan worklet cat - Anda mendapatkan peningkatan progresif:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

Di browser _with_ support untuk worklet paint, deklarasi `background-image` kedua akan menimpa yang pertama. Di browser _without_ support untuk paint worklet, deklarasi kedua tidak valid dan akan dibuang, meninggalkan deklarasi pertama yang berlaku.

### CSS Paint Polyfill

Untuk banyak kegunaan, juga dimungkinkan untuk menggunakan [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) , yang menambahkan dukungan CSS Custom Paint dan Paint Worklets ke browser modern.

## Use cases Ada banyak kasus penggunaan untuk worklet cat, beberapa di antaranya lebih jelas daripada yang lain. Salah satu yang lebih jelas adalah menggunakan worklet cat untuk mengurangi ukuran DOM Anda. Seringkali, elemen ditambahkan murni untuk membuat hiasan menggunakan CSS. Misalnya, dalam [Material Design Lite](https://getmdl.io) tombol dengan efek riak berisi 2 elemen `<span>` tambahan untuk menerapkan riak itu sendiri. Jika Anda memiliki banyak tombol, ini dapat menambahkan hingga sejumlah elemen DOM dan dapat menyebabkan kinerja terdegradasi di seluler. Jika Anda [implement the ripple effect using paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) , Anda berakhir dengan 0 elemen tambahan dan hanya satu worklet cat. Selain itu, Anda memiliki sesuatu yang jauh lebih mudah untuk menyesuaikan dan membuat parameter.

Keuntungan lain menggunakan worklet cat adalah bahwa - dalam kebanyakan skenario - solusi menggunakan worklet cat kecil dalam hal byte. Tentu saja, ada trade-off: kode cat Anda akan berjalan setiap kali ukuran kanvas atau salah satu parameter berubah. Jadi, jika kode Anda rumit dan membutuhkan waktu lama, itu mungkin memperkenalkan jank. Chrome sedang mengerjakan memindahkan cat worklet dari utas utama sehingga bahkan worksheet cat yang lama berjalan tidak mempengaruhi respon dari utas utama.

Bagi saya, prospek yang paling menarik adalah bahwa worklet paint memungkinkan pengolesan efisien fitur CSS yang belum dimiliki browser. Salah satu contoh adalah polyfill [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) sampai mereka mendarat di Chrome secara native. Contoh lain: dalam rapat CSS, diputuskan bahwa Anda kini dapat memiliki banyak warna perbatasan. Saat pertemuan ini masih berlangsung, rekan saya Ian Kilpatrick [wrote a polyfill](https://twitter.com/malyw/status/934737334494429184) untuk perilaku CSS baru ini menggunakan worklet cat.

## Berpikir di luar &quot;kotak&quot; Kebanyakan orang mulai berpikir tentang gambar latar belakang dan gambar perbatasan ketika mereka belajar tentang worklet cat. Satu kasus penggunaan yang kurang intuitif untuk worklet cat adalah `mask-image` untuk membuat elemen DOM memiliki bentuk acak. Misalnya, sebuah [diamond](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/) :

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="
  A DOM element in the shape of a diamond.">

`mask-image` mengambil gambar yang merupakan ukuran elemen. Area di mana gambar topeng transparan, elemen transparan. Area di mana gambar mask buram, elemen buram.

## Sekarang di Chrome

Worklet cat telah berada di Chrome Canary untuk sementara waktu. Dengan Chrome 65, diaktifkan secara default. Pergi ke depan dan mencoba kemungkinan-kemungkinan baru yang melukis worklet membuka dan menunjukkan kepada kita apa yang Anda bangun! Untuk inspirasi lebih lanjut, lihat [Vincent De Oliveira’s collection](https://lab.iamvdo.me/houdini/) .

Note: Breakpoint saat ini tidak didukung di CSS Paint API, tetapi akan diaktifkan di rilis Chrome selanjutnya.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}