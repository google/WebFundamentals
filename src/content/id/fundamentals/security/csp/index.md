project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Content Security Policy atau Kebijakan Keamanan Materi bisa secara signifikan mengurangi risiko dan dampak serangan skrip lintas-situs di browser modern.

{# wf_published_on: 2012-06-15 #}
{# wf_updated_on: 2017-07-17 #}

# Content Security Policy {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

Model keamanan web telah mengakar di
[_kebijakan sumber yang sama_](//en.wikipedia.org/wiki/Same-origin_policy){: .external}. Kode
dari `https://mybank.com` seharusnya hanya memiliki akses ke data `https://mybank.com`,
dan `https://evil.example.com` seharusnya tidak pernah boleh diakses.
Setiap sumber dibiarkan tetap terisolasi dari web lainnya, sehingga memberi
kotak pasir yang aman kepada developer untuk membangun dan bermain. Secara terori, ini benar-benar cemerlang. Pada
kenyataannya, penyerang telah menemukan cara pintar untuk mengalahkan sistem.

Serangan [Cross-Site Scripting (XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external},
misalnya, melangkahi kebijakan sumber yang sama dengan menyusupkan
pengiriman kode berbahaya bersama materi yang direncanakan pada situs. Ini merupakan masalah
sangat besar, karena browser mempercayai semua kode yang ditunjukkan pada laman sebagai
bagian sah dari asal keamanan laman itu. [XSS
Cheat Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external} adalah lintas-bagian yang sudah lama namun representatif dari metode yang dapat digunakan penyerang untuk merusak kepercayaan ini dengan menyuntikkan kode berbahaya. Jika penyerang berhasil menyuntikkan _suatu_ kode,
habislah sudah: data sesi pengguna akan dirusak dan
informasi yang seharusnya dirahasiakan dikuasai oleh orang jahat. Kami
jelas ingin mencegah hal itu terjadi.

Ringkasan ini menyoroti pertahanan yang bisa secara signifikan mengurangi risiko dan
dampak serangan XSS di browser modern: Content Security Policy (CSP).

### TL;DR {: .hide-from-toc }
* Gunakan daftar putih untuk memberi tahu klien apa yang boleh dan apa yang tidak.
* Ketahui direktif apa saja yang tersedia.
* Ketahui kata kunci yang digunakannya.
* Kode inline dan `eval()` dianggap membahayakan.
* Laporkan pelanggaran kebijakan ke server Anda sebelum melaksanakannya.


## Daftar Putih Sumber 


Masalah yang dieksploitasi oleh serangan XSS adalah ketidakmampuan browser untuk membedakan
antara skrip yang merupakan bagian dari aplikasi Anda dan skrip yang telah
disuntikkan dengan maksud jahat oleh pihak ketiga. Misalnya, tombol Google +1 di
bagian bawah laman ini memuat dan mengeksekusi kode dari
`https://apis.google.com/js/plusone.js` dalam konteks sumber laman ini. Kita
mempercayai kode itu, namun kita tidak bisa mengharapkan browser untuk mengetahuinya sendiri bahwa
kode dari `apis.google.com` mengagumkan, sedangkan dari `apis.evil.example.com`
mungkin tidak. Browser dengan senang hati mengunduh dan mengeksekusi kode yang
diminta laman, apa pun sumbernya.

Sebagai ganti mempercayai _semuanya_ secara membuta apa yang diserahkan server, CSP mendefinisikan header HTTP
`Content-Security-Policy` yang memungkinkan Anda membuat daftar putih
sumber materi yang dipercaya, dan memerintahkan browser agar hanya mengeksekusi atau merender
sumber daya dari sumber-sumber itu. Bahkan jika seorang penyerang bisa menemukan lubang yang bisa digunakannya
untuk menyuntikkan skrip, skrip tersebut tidak akan menyamai daftar putih, sehingga tidak akan
dieksekusi.

Karena kita mempercayai `apis.google.com` untuk menyerahkan kode yang valid, dan kita mempercayai diri sendiri
untuk melakukan hal yang sama, mari kita definisikan kebijakan yang hanya akan memungkinkan skrip dieksekusi bila
berasal dari salah satu dari dua sumber ini:

    Content-Security-Policy: script-src 'self' https://apis.google.com

Sederhana, bukan? Seperti yang mungkin Anda tebak, `script-src` adalah direktif yang
mengontrol serangkaian skrip yang berkaitan dengan privilese untuk laman tertentu. Kita telah menetapkan
`'self'` sebagai satu sumber skrip yang valid, begitu pula `https://apis.google.com`.
 Browser dengan patuh mengunduh dan mengeksekusi JavaScript dari
`apis.google.com` melalui HTTPS, juga dari sumber laman saat ini.

<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="Kesalahan konsol: Refused to load the script 'http://evil.example.com/evil.js' because it violates the following Content Security Policy directive: script-src 'self' https://apis.google.com">
  </figure>
</div>

Dengan didefinisikannya kebijakan ini, browser tinggal melontarkan kesalahan sebagai ganti
memuat skrip dari sumber lainnya. Bila penyerang yang pintar berusaha
menyuntikkan kode ke dalam situs Anda, mereka langsung mendapatkan pesan kesalahan ketimbang
berhasil dengan apa yang diharapkannya.

### Kebijakan berlaku pada berbagai macam sumber daya

Walaupun sumber daya skrip merupakan risiko keamanan yang paling nyata, CSP menyediakan
serangkaian direktif kebijakan yang memungkinkan kontrol yang cukup terperinci atas berbagai sumber daya
yang boleh dimuat laman. Anda sudah melihat `script-src`, jadi konsep tersebut
tentunya sudah jelas. Mari kita ikuti direktif sumber daya selebihnya:

* **`base-uri`** membatasi URL yang bisa muncul di elemen `<base>` laman.
* **`child-src`** berisi daftar URL untuk worker dan materi bingkai yang disematkan. Misalnya:
`child-src https://youtube.com` akan memungkinkan penyematan video dari
  YouTube, namun bukan dari sumber yang lain. Gunakan ini sebagai ganti direktif
  **`frame-src`** yang tidak digunakan lagi.
* **`connect-src`** membatasi sumber yang bisa Anda hubungkan (lewat XHR,
  WebSockets, dan EventSource).
* **`font-src`** menetapkan sumber yang bisa menyediakan font web. Font web
Google bisa diaktifkan lewat `font-src https://themes.googleusercontent.com`.
* **`form-action`** berisi daftar endpoint yang valid untuk pengiriman dari tag `<form>`.
* **`frame-ancestors`**  menetapkan sumber-sumber yang bisa menyematkan laman saat ini.
Direktif ini berlaku pada tag `<frame>`, `<iframe>`, `<embed>`, dan `<applet>`.
Direktif ini tidak bisa digunakan di tag `<meta>` dan hanya berlaku pada sumber daya
non-HTML.
* **`frame-src`** tidak digunakan lagi. Gunakan **`child-src`** sebagai gantinya.
* **`img-src`** mendefinisikan sumber yang bisa digunakan untuk memuat gambar.
* **`media-src`** membatasi sumber yang boleh mengirim video dan audio.
* **`object-src`** mengizinkan kontrol atas plugin Flash dan plugin lainnya.
* **`plugin-types`** membatasi jenis plugin yang boleh dipanggil oleh laman.
* **`report-uri`** menetapkan ke URL mana saja browser akan mengirim laporan bila
kebijakan keamanan materi dilanggar. Direktif ini tidak bisa digunakan di tag `<meta>`.

* **`style-src`** adalah pasangan untuk `script-src` stylesheet.
* **`upgrade-insecure-requests`** memerintahkan agen-pengguna untuk menulis ulang skema URL,
dengan mengubah HTTP ke HTTPS. Direktif ini untuk situs web dengan banyak
URL   lama yang perlu ditulis ulang.

Secara default, direktif ini terbuka lebar. Jika Anda belum menyetel kebijakan tertentu untuk
direktif, misalnya `font-src`, maka direktif itu secara default
akan berperilaku seolah Anda telah menetapkan `*` sebagai sumber yang valid (misalnya, Anda bisa memuat font dari
mana saja, tanpa pembatasan).

Anda bisa menggantikan perilaku default ini dengan menetapkan sebuah direktif **`default-src`**.
 Direktif ini mendefinisikan default untuk sebagian besar
direktif yang dibiarkan tidak didefinisikan. Umumnya, ini berlaku pada direktif yang
diakhiri dengan `-src`. Jika `default-src` disetel ke `https://example.com`, dan Anda tidak
menetapkan direktif `font-src`, maka Anda bisa memuat font dari
`https://example.com`, tidak dari tempat lain. Kami hanya menetapkan `script-src` dalam
contoh sebelumnya, yang berarti gambar, font, dan sebagainya bisa dimuat dari
sumber mana saja.

Direktif berikut tidak menggunakan `default-src` sebagai fallback. Ingat,
tidak menyetelnya sama saja dengan membiarkan semuanya.

* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

Anda bisa menggunakan sebanyak atau sesedikit mungkin direktif ini bagi
aplikasi tertentu, cukup mencantumkannya masing-masing di header HTTP, dengan memisahkan
setiap direktif dengan titik koma. Pastikan Anda mencantumkan _semua_
sumber daya yang diperlukan dari tipe tertentu dalam direktif _tunggal_. Jika Anda telah menulis
sesuatu seperti `script-src https://host1.com; script-src https://host2.com`
direktif kedua cukup diabaikan saja. Sesuatu seperti berikut ini akan
menetapkan kedua sumber sebagai valid:

    script-src https://host1.com https://host2.com

Jika, misalnya, Anda memiliki aplikasi yang memuat semua sumber dayanya dari
jaringan pengiriman materi (katakan, `https://cdn.example.net`), dan Anda mengetahui bahwa
Anda tidak membutuhkan materi berbingkai atau plugin, kebijakan Anda mungkin akan terlihat seperti
yang berikut ini:

    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### Detail implementasi

Anda akan melihat header `X-WebKit-CSP` dan `X-Content-Security-Policy` dalam beragam
tutorial di web. Ke depannya, Anda harus mengabaikan header
berawalan ini. Browser modern (dengan pengecualian IE) mendukung header
`Content-Security-Policy` yang tidak berawalan. Itulah header yang harus digunakan.

Header apa pun yang digunakan, kebijakan didefinisikan berdasarkan per laman:
Anda perlu mengirim header HTTP bersama setiap respons yang ingin dipastikan
terlindungi. Ini memberikan banyak fleksibilitas, karena Anda bisa menyempurnakan
kebijakan untuk laman tertentu berdasarkan kebutuhan spesifik mereka. Mungkin serangkaian
laman di situs Anda memiliki tombol +1, sementara lainnya tidak memiliki: Anda bisa membuat kode
tombol dimuat hanya bila diperlukan.

Daftar sumber di setiap direktif bersifat fleksibel. Anda bisa menetapkan sumber melalui
skema (`data:`, `https:`), atau merentangkan kekhususan dari hostname-saja
(`example.com`, yang cocok dengan sumber host itu: sembarang skema, port) ke
URI yang sepenuhnya memenuhi syarat (`https://example.com:443`, yang hanya cocok dengan HTTPS,
`example.com` saja, dan port 443 saja). Karakter pengganti diterima, namun hanya sebagai skema,
port, atau di posisi paling kiri pada hostname: `*://*.example.com:*` akan
cocok dengan semua subdomain `example.com` (namun _tidak_ `example.com` itu sendiri), dengan menggunakan
sembarang skema, port.

Daftar sumber juga menerima empat kata kunci:

* **`'none'`**, seperti yang mungkin Anda harapkan, tidak cocok dengan apa pun.
* **`'self'`** mencocokkan sumber saat ini, namun tidak subdomainnya.
* **`'unsafe-inline'`** mengizinkan JavaScript dan CSS inline. (Kita akan
  membahasnya lebih detail lagi nanti.)
* **`'unsafe-eval'`** mengizinkan mekanisme teks-ke-JavaScript, seperti `eval`. (Kita juga nanti
  akan membahasnya.)

Kata kunci ini memerlukan tanda kutip tunggal. Misalnya, `script-src 'self'` (dengan tanda kutip)
mengotorisasi eksekusi JavaScript dari host saat ini; `script-src self`
(tanpa tanda kutip) memungkinkan JavaScript dari server bernama "`self`" (dan _bukan_ dari
host saat ini), barangkali bukan yang Anda maksudkan.

### Kotak pasir

Ada satu direktif lagi yang patut dibahas: `sandbox`. Ini sedikit
berbeda dari lainnya yang telah kita lihat, karena direktif ini menempatkan pembatasan pada tindakan yang
bisa diambil oleh laman, bukannya sumber daya yang dimuat oleh laman. Jika ada direktif
`sandbox`, laman akan dianggap seolah dimuat
di dalam `<iframe>` dengan atribut `sandbox`. Efeknya bisa sangat beragam
pada laman: antara lain, memaksa laman ke dalam sumber yang unik, dan mencegah penyerahan
formulir. Hal ini sedikit di luar cakupan artikel ini, namun Anda
bisa menemukan detail lengkap mengenai atribut kotak pasir yang valid di
[bagian "Sandboxing" pada spesifikasi HTML5](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.{: .external}.

### Tag meta

Mekanisme pengiriman yang disukai CSP adalah header HTTP. Akan tetapi, ini bisa berguna
untuk menyetel kebijakan pada laman secara langsung di markup. Lakukan dengan menggunakan tag `<meta>` bersama
atribut `http-equiv`:


    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


Ini tidak bisa digunakan untuk frame-ancestors, report-uri, atau kotak pasir.

## Kode inline dianggap membahayakan

Jelas sudah bahwa CSP berdasarkan pada sumber daftar putih, karena itulah
cara yang tidak meragukan dalam memerintahkan browser untuk memperlakukan serangkaian sumber daya tertentu
sebagai dapat diterima dan untuk menolak selebihnya. Akan tetapi, daftar putih yang berdasarkan sumber
akan mengatasi ancaman terbesar yang ditimbulkan oleh serangan XSS: injeksi skrip inline.
Jika penyerang menyuntikkan tag skrip secara langsung yang berisi
payload (`<script>sendMyDataToEvilDotCom()</script>`) yang berbahaya,
browser tidak memiliki mekanisme untuk membedakannya dari
tag skrip inline yang sah. CSP mengatasi masalah ini dengan mencekal skrip inline sepenuhnyai:
satu-satunya cara yang meyakinkan.


Pencekalan ini tidak hanya meliputi skrip yang disematkan secara langsung di tag `script`, melainkan juga
penangan kejadian inline dan URL `javascript:`. Anda perlu memindahkan materi tag
`script` ke dalam file eksternal, dan mengganti URL `javascript:` dan `<a ...
onclick="[JAVASCRIPT]">` dengan panggilan `addEventListener()` yang tepat. Misalnya,
Anda menulis ulang kode berikut ini dari:


    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


menjadi seperti ini:

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


Kode yang telah ditulis ulang tersebut memiliki banyak keuntungan, sangat bekerja dengan baik bersama
CSP; sudah menjadi praktik terbaik, apa pun penggunaan CSP Anda. JavaScript
inline mencampur struktur dan perilaku dengan cara persis yang tidak akan Anda lakukan.
Sumber daya eksternal lebih mudah di-cache browser, lebih mudah dipahami
developer, dan kondusif pada kompilasi dan minifikasi. Anda akan menulis kode
lebih baik jika melakukan pemindahan kode ke dalam sumber daya eksternal.

Gaya inline diperlakukan dengan cara yang sama: baik atribut `style` maupun tag `style`
harus dikonsolidasikan ke dalam stylesheet eksternal untuk melindungi dari
beragam metode eksfiltrasi data [begitu pintar](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external}
yang dimungkinkan oleh CSS.

Jika harus memiliki gaya dan skrip inline, Anda dapat mengaktifkannya
dengan menambahkan `'unsafe-inline'` sebagai sumber yang diperbolehkan dalam direktif `script-src` atau `style-
src`. Anda juga bisa menggunakan tanda nonce atau hash (lihat di bawah ini), namun sebaiknya tidak. Pencekalan skrip inline adalah kemenangan keamanan terbesar yang disediakan CSP, dan
demikian pula pencekalan gaya inline akan memperkuat aplikasi Anda. Ini merupakan sedikit
kemajuan dari upaya untuk memastikan pekerjaan berfungsi dengan benar setelah memindah semua kode
keluar dari barisnya, namun itulah konsekuensi yang pantas.

### Jika Anda terpaksa harus menggunakannya ...

CSP Level 2 menawarkan kompatibilitas mundur untuk skrip inline dengan memperbolehkan Anda
memasukkan skrip inline tertentu ke daftar putih dengan menggunakan nonce kriptografik (angka
yang digunakan satu kali) atau hash. Walaupun mungkin tidak praktis, ini lumayan
berguna.

Untuk menggunakan nonce, berikan tag skrip Anda atribut nonce. Nilainya harus sama dengan yang ada
dalam daftar sumber yang tepercaya. Misalnya:


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


Kini, tambahkan nonce ke direktif `script-src` Anda yang ditambahkan ke kata kunci `nonce-`.

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

Ingat, nonce harus dibuat untuk setiap permintaan laman dan harus
tidak bisa ditebak.

Cara kerja hash hampir sama. Sebagai ganti menambahkan kode ke tag skrip,
buat hash SHA dari skrip itu sendiri dan tambahkan ke direktif `script-src`.
Misalnya, anggaplah laman Anda berisi ini:


    <script>alert('Hello, world.');</script>


Kebijakan Anda akan berisi ini:

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

Ada beberapa hal yang harus diperhatikan di sini. Awalan `sha*-` menetapkan algoritme
yang menghasilkan hash. Dalam contoh di atas, digunakan sha256-. CSP juga
mendukung sha384- dan sha512-. Saat membuat hash, jangan sertakan tag
`<script>`. Juga kapitalisasi dan spasi kosong, termasuk spasi kosong di depan
atau di belakang.

Penelusuran Google mengenai pembuatan hash SHA akan mengarahkan Anda pada solusi dalam
sejumlah bahasa. Dengan menggunakan Chrome 40 atau yang lebih baru, Anda bisa membuka DevTools kemudian
memuat ulang laman. Tab Console akan berisi pesan kesalahan dengan hash sha256 yang benar
untuk setiap skrip inline Anda.

## Eval juga

Bahkan bila penyerang tidak bisa menyuntikkan skrip secara langsung, mereka mungkin bisa menipu
aplikasi Anda untuk mengonversi teks biasa menjadi JavaScript yang dapat dieksekusi
dan mengeksekusinya atas nama mereka. `eval()`, `new
Function()`, `setTimeout([string], ...)`, dan
`setInterval([string], ...)` semuanya adalah vektor yang digunakan untuk menyuntikkan
teks yang pada akhirnya akan mengeksekusi sesuatu yang membahayakan tanpa terduga. Respons default CSP
terhadap risiko ini adalah memblokir sepenuhnya semua vektor tersebut.


Dampaknya sedikit lebih besar pada saat Anda membangun aplikasi:

*   Anda harus mem-parse JSON lewat `JSON.parse` bawaan, bukan mengandalkan
    `eval`. Operasi JSON asli tersedia di
    [setiap browser mulai IE8](http://caniuse.com/#feat=json){: .external}, dan semuanya
    benar-benar aman.
*   Tulis ulang semua panggilan `setTimeout` atau `setInterval` yang sedang Anda buat
    dengan fungsi inline, bukan string. Misalnya:

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


akan lebih baik ditulis sebagai:


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   Hindari pembuatan template inline pada waktu proses: Banyak pustaka pembuatan template menggunakan `new
    Function()` secara bebas untuk mempercepat pembuatan template pada waktu proses. Ini
    merupakan aplikasi bagus dari pemrograman dinamis, namun berisiko
    mengevaluasi teks yang berbahaya. Banyak kerangka kerja yang langsung mendukung CSP,
    yang melakukan fallback ke parser lebih tangguh tanpa `eval`.
    [direktif ng-csp dari AngularJS](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external} adalah contoh yang tepat untuk hal ini.

Akan tetapi, pilihan yang lebih baik adalah bahasa pembuatan template yang menawarkan
prakompilasi ([Handlebars](http://handlebarsjs.com/precompilation.html){: .external},
sebagai contoh). Prakompilasi atas template bisa membuat pengalaman pengguna menjadi
jauh lebih cepat daripada implementasi waktu proses tercepat, juga lebih aman.  Jika eval dan
saudara teks-ke-JavaScript-nya begitu mendasar bagi aplikasi, Anda bisa mengaktifkannya
dengan menambahkan `'unsafe-eval'` sebagai sumber yang diperbolehkan dalam direktif `script-src`,
namun kami sangat tidak menyarankannya. Pencekalan kemampuan mengeksekusi
string semakin mempersulit penyerang untuk mengeksekusi
kode tidak sah di situs Anda.

## Pelaporan 


Kemampuan CSP memblokir sisi-klien sumber daya yang tak dipercaya merupakan kemenangan besar bagi
pengguna Anda, namun akan sangat membantu bila memiliki semacam notifikasi
yang dikirimkan kembali ke server sehingga Anda bisa mengidentifikasi dan mengalahkan semua bug yang memungkinkan
penyuntikan berbahaya lebih cepat. Untuk mencapai tujuan, Anda bisa memerintahkan
browser untuk mem- `POST`-kan laporan pelanggaran berformat JSON ke lokasi
yang ditetapkan dalam direktif `report-uri`.


    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

Laporan itu akan terlihat seperti berikut ini:


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



Ini berisi potongan informasi yang akan membantu Anda melacak
sebab spesifik dari pelanggaran, termasuk laman tempat pelanggaran
terjadi (`document-uri`), referrer laman itu (perhatikan, tidak seperti bidang
header HTTP, kunci ini _tidak_ salah eja), sumber daya yang melanggar
kebijakan laman (`blocked-uri`), direktif tertentu yang dilanggarnya
(`violated-directive`), dan kebijakan lengkap laman tersebut (`original-policy`).

### Report-Only

Jika Anda baru saja mulai dengan CSP, ada baiknya mengevaluasi status aplikasi
Anda saat ini sebelum menerapkan kebijakan ketat pada pengguna.
Sebagai batu pijakan untuk menyelesaikan penerapan, Anda bisa meminta browser untuk memantau
kebijakan, melaporkan pelanggaran namun tidak menjalankan pembatasan. Sebagai ganti
mengirim header `Content-Security-Policy`, kirim header
`Content-Security-Policy-Report-Only`.

    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

Kebijakan yang ditetapkan dalam mode hanya-lapor tidak akan memblokir sumber daya yang dibatasi, melainkan
akan mengirim laporan pelanggaran ke lokasi yang Anda tetapkan. Anda bahkan bisa mengirim
_kedua_ header, dengan menjalankan satu kebijakan sambil memantau kebijakan yang satu lagi. Inilah cara bagus
untuk mengevaluasi efek perubahan pada CSP aplikasi Anda: aktifkan
pelaporan bagi kebijakan baru, pantau laporan pelanggaran, dan perbaiki bug
yang muncul; bila Anda puas dengan efeknya, mulailah menerapkan kebijakan baru tersebut.



## Penggunaan Sesungguhnya 

CSP 1 sangat berguna di Chrome, Safari, dan Firefox, namun memiliki dukungan
sangat terbatas di IE 10. Anda bisa <a href="http://caniuse.com/#feat=contentsecuritypolicy">
menampilkan hal yang spesifik di canisue.com</a>. CSP Level 2 telah tersedia di Chrome mulai
versi 40. Situs masif seperti Twitter dan Facebook telah menerapkan header
(<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">Studi kasus
Twitter</a> patut dibaca), dan standar ini sangat siap
untuk mulai Anda terapkan pada situs sendiri.

Langkah pertama dalam pembuatan kebijakan untuk aplikasi Anda adalah mengevaluasi
sumber daya yang sesungguhnya Anda muat. Setelah Anda tahu bagaimana menangani
berbagai hal yang dimasukkan dalam aplikasi Anda, siapkan kebijakan berdasarkan
persyaratan itu. Mari kita pelajari beberapa kasus penggunaan umum dan menentukan bagaimana
kita dapat mendukungnya dalam batasan protektif CSP.

### Kasus penggunaan #1: widget media sosial

* [Tombol +1](/+/web/+1button/){: .external}
Google menyertakan sebuah skrip dari `https://apis.google.com`, dan menyematkan `<iframe>` dari
`https://plusone.google.com`. Anda membutuhkan kebijakan yang menyertakan kedua sumber ini
agar dapat menyematkan tombol. Kebijakan minimal akan seperti `script-src
https://apis.google.com; child-src https://plusone.google.com`. Anda juga perlu
memastikan bahwa cuplikan JavaScript yang disediakan Google ditarik ke dalam
file JavaScript eksternal. Jika Anda memiliki kebijakan yang ada menggunakan `child-src`,
Anda perlu mengubahnya ke `child-src`.

* [Tombol Like](//developers.facebook.com/docs/plugins/like-button){: .external } Facebook

memiliki sejumlah opsi implementasi. Kami menyarankan agar tetap menggunakan versi
`<iframe>` karena kotak pasirnya aman dari bagian selebihnya pada situs Anda. Diperlukan
direktif `child-src https://facebook.com` agar dapat berfungsi dengan benar. Perhatikan,
secara default, kode `<iframe>` yang disediakan Facebook akan memuat sebuah
URL relatif, `//facebook.com`. Ubahlah untuk menetapkan secara eksplisit HTTPS:
`https://facebook.com`. Tidak ada alasan menggunakan HTTP jika Anda tidak perlu.

* [Tombol Tweet](https://publish.twitter.com/#)
Twitter mengandalkan akses ke skrip dan bingkai, keduanya di-host di
`https://platform.twitter.com`. (Begitu juga Twitter menyediakan URL relatif secara
default; edit kode untuk menetapkan HTTPS saat menyalin/menempelkannya secara lokal.)
Anda akan siap dengan `script-src https://platform.twitter.com; child-src
https://platform.twitter.com`, asalkan Anda memindahkan cuplikan JavaScript
yang disediakan Twitter ke dalam file JavaScript eksternal.

* Platform lain memiliki persyaratan serupa dan bisa ditangani dengan cara serupa.
Kami mengusulkan cukup dengan menyetel `default-src` pada `'none'`, dan mengamati konsol Anda untuk
menentukan sumber daya mana yang akan Anda aktifkan untuk membuat widget tersebut bekerja.

Penyertaan beberapa widget sekaligus jadi sederhana: tinggal mengombinasikan direktif
kebijakan, asalkan ingat untuk menggabung semua sumber daya tipe tunggal menjadi satu
direktif tunggal. Jika Anda ingin ketiga widget media sosial, kebijakan tersebut akan terlihat
seperti ini:

    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### Kasus penggunaan #2: penguncian

Anggaplah sementara Anda menjalankan situs perbankan dan ingin memastikan bahwa
hanya sumber daya yang telah Anda tulis sendiri yang nanti bisa dimuat. Dalam skenario ini,
mulailah dengan kebijakan default yang akan memblokir secara mutlak segala sesuatu (``default-src
'none'``), dan bangunlah dari sana.

Anggaplah bank tersebut memuat semua gambar, gaya, dan skrip dari CDN di
`https://cdn.mybank.net`, dan menghubungkan lewat XHR ke `https://api.mybank.com/` untuk menarik
beragam bit data. Bingkai digunakan, namun hanya untuk laman yang sifatnya lokal ke
situs (tidak ada sumber pihak ketiga). Tidak ada Flash di situs tersebut, tidak ada font, tidak ada
ekstra. Header CSP paling ketat yang bisa kita kirim adalah ini:

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### Kasus penggunaan #3: hanya SSL

Admin forum diskusi cincin-pernikahan ingin memastikan semua sumber daya
hanya dimuat lewat saluran aman, namun tidak menulis kode yang banyak; ia tidak mampu
menulis ulang potongan besar perangkat lunak forum pihak ketiga yang diisikan ke tepian dengan
skrip inline dan gaya. Kebijakan berikut akan
efektif:

    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

Meskipun `https:` telah ditetapkan di `default-src`, direktif skrip dan gaya
tidak mewarisi sumber itu secara otomatis. Setiap direktif sepenuhnya
menulis ulang default untuk tipe sumber daya spesifik itu.

## Masa depan


Content Security Policy Level 2 adalah <a href="http://www.w3.org/TR/CSP2/">
Saran Kandidat</a>. W3C Web Application Security Working Group
sudah mulai mengerjakan iterasi berikutnya dari spesifikasi ini,
[Content Security Policy Level 3](https://www.w3.org/TR/CSP3/){: .external }. 


Jika Anda tertarik dengan diskusi seputar fitur mendatang,
[bacalah arsip milis public-webappsec@](http://lists.w3.org/Archives/Public/public-webappsec/),
atau bergabunglah dalam diskusi.


{# wf_devsite_translation #}
