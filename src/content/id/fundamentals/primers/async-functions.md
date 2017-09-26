project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Fungsi async memungkinkan Anda untuk menulis kode berbasis-promise seakan-akan itu sinkron

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2017-07-12 #}

# Fungsi async - membuat promise lebih bersahabat {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Fungsi async diaktifkan secara default di Chrome 55 dan terus terang saja
fungsi tersebut cukup luar biasa. Fungsi async memungkinkan Anda untuk menulis kode berbasis-promise seakan-akan itu sinkron,
namun tanpa memblokir thread utama. Fungsi tersebut membuat kode asinkron Anda kurang
"cerdas" dan lebih mudah dibaca.

Fungsi async bekerja seperti ini:

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

Jika Anda menggunakan kata kunci `async` sebelum definisi fungsi, maka Anda bisa menggunakan
`await` di dalam fungsi. Ketika Anda `await` promise, fungsi tersebut dihentikan sementara
dengan cara yang tak-memblokir sampai promise selesai. Jika promise itu terpenuhi, Anda
mendapatkan kembali nilai tersebut. Jika promise ditolak, nilai yang ditolak akan dibuang.

Note: Jika Anda belum familier dengan promise, lihat [panduan promise
kami](/web/fundamentals/getting-started/primers/promises).

## Contoh: Pembuatan Log pengambilan

Katakanlah kita ingin mengambil URL dan membuat log respons sebagai teks. Berikut adalah bagaimana itu terlihat
menggunakan promise:

    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

Dan berikut adalah fungsi yang sama dengan menggunakan async:

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

Mempunyai jumlah baris yang sama, namun semua callback menghilang. Cara ini membuat membaca
jauh lebih mudah, terutama bagi mereka yang belum familier dengan promise.

Note: Semua yang Anda `await` diteruskan melalui `Promise.resolve()`, sehingga Anda bisa
dengan aman `await` promise non-asli.

## Async mengembalikan nilai

Fungsi async *selalu* mengembalikan promise, apakah Anda menggunakan `await` atau tidak. Promise
diselesaikan dengan fungsi async apa pun yang dikembalikan, atau ditolak dengan
fungsi async apa pun yang dikeluarkan. Jadi dengan:

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

…memanggil `hello()` mengembalikan sebuah promise yang *dilaksanakan* dengan `"world"`.

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

…memanggil `foo()` mengembalikan sebuah promise yang *ditolak* dengan `Error('bar')`.

## Contoh: Streaming respons

Keuntungan fungsi async semakin bertambah pada contoh yang lebih kompleks. Misalnya kita ingin
streaming respons sembari keluar dari potongan, dan mengembalikan ukuran akhir.

Note: Ungkapan "keluar dari potongan" membuat mulut saya sakit.

Berikut tampilan dengan promise:

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

Lihat saya, Jake "wielder of promises" Archibald. Lihat bagaimana saya memanggil
`processResult` dalam dirinya sendiri untuk menyiapkan loop asinkron? Menulis hal itu membuat
saya merasa *sangat cerdas*. Tapi seperti kebanyakan kode "cerdas", Anda harus menatapnya dalam
waktu sangat lama untuk mencari tahu apa yang dilakukannya, seperti salah satu gambar mata-ajaib dari
tahun 90-an.

Mari kita lakukan lagi dengan fungsi async:

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

Semua "kecerdasan" hilang. Loop asinkron yang membuat saya merasa begitu puas
diganti dengan while-loop yang terpercaya dan membosankan. Jauh lebih baik. Di masa mendatang, kita akan mendapatkan
[iterator async](https://github.com/tc39/proposal-async-iteration){: .external},
yang akan
[menggantikan loop `while` dengan loop for-of](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}, membuatnya lebih rapi.

Note: Saya mencintai streaming. Jika Anda belum familier dengan streaming,
[lihat panduan saya](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}.

## Sintaks fungsi async lainnya

Kita telah melihat `async function() {}`, namun kata kunci `async` bisa digunakan
dengan sintaks fungsi lainnya:

### Fungsi Arrow

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

Note: `array.map(func)` tidak peduli bahwa saya memberikannya fungsi async, fungsi itu hanya
melihatnya sebagai fungsi yang mengembalikan promise. Fungsi ini tidak akan menunggu fungsi
pertama untuk diselesaikan sebelum memanggil yang kedua.

### Metode objek

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### Metode kelas

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

Note: Konstruktor dan getter/setelan kelas tidak bisa asinkron.

## Hati-hati! Hindari terlalu sekuensial

Meskipun Anda menulis kode yang terlihat sinkron, pastikan Anda tidak melewatkan
kesempatan untuk melakukan hal-hal secara paralel.

    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

Fungsi di atas membutuhkan waktu 1000 md untuk diselesaikan, sedangkan:

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

…fungsi di atas membutuhkan waktu 500 md untuk diselesaikan, karena kedua proses tunggu terjadi pada waktu yang sama.
Mari kita lihat contoh praktiknya…

### Contoh: Keluaran pengambilan secara urut

Misalnya kita ingin mengambil serangkaian URL dan membuat log sesegera mungkin, dengan
urutan yang benar.

*Tarik napas dalam-dalam* - Beginilah itu akan terlihat dengan promise:

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

Ya, benar, saya menggunakan `reduce` untuk merangkai urutan promise. Saya *begitu
cerdas*. Namun ini adalah pengkodean *begitu cerdas* yang sebaiknya tidak kita gunakan.

Namun, ketika mengubah fungsi di atas menjadi fungsi async, bisa saja tergoda untuk
*terlalu sekuensial*:

<span class="compare-worse">Tidak disarankan</span> - terlalu sekuensial

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

Terlihat jauh lebih rapi, tapi pengambilan kedua saya tidak dimulai sampai pengambilan pertama
telah dibaca sepenuhnya, dan seterusnya. Ini jauh lebih lambat dibandingkan contoh promise yang
melakukan pengambilan secara paralel. Untungnya ada jalan tengah yang ideal:

<span class="compare-better">Disarankan</span> - bagus dan paralel

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

Dalam contoh ini, URL diambil dan dibaca secara paralel, namun 
`reduce` bit yang "cerdas" diganti dengan for-loop standar, membosankan, dan bisa dibaca.

## Dukungan browser & solusi

Pada saat penulisan, fungsi async diaktifkan secara default dalam Chrome 55, tapi
fungsi tersebut sedang dikembangkan di semua browser utama:

* Edge - [Versi 14342+ di belakang flag](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [development aktif](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [development aktif](https://bugs.webkit.org/show_bug.cgi?id=156147)

### Solusi - Generator

Jika Anda menargetkan browser yang mendukung generator (yang mencakup
[versi terbaru dari setiap browser utama](http://kangax.github.io/compat-table/es6/#test-generators){:.external}
) Anda bisa mengurutkan fungsi async polyfill.

[Babel](https://babeljs.io/){: .external} akan melakukannya untuk Anda,
[berikut adalah contoh melalui Babel REPL](https://goo.gl/0Cg1Sq){: .external}
- perhatikan bagaimana miripnya kode yang ditranspilasi. Transformasi ini merupakan bagian dari 
[preset es2017 Babel](http://babeljs.io/docs/plugins/preset-es2017/){: .external}.

Note: Babel REPL menyenangkan untuk digunakan. Cobalah.

Saya menyarankan pendekatan transpiling, karena Anda bisa mematikannya setelah
browser target mendukung fungsi async, namun jika Anda *benar-benar* tidak ingin menggunakan
transpiler, Anda dapat mengambil
[polyfill Babel](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
dan menggunakannya sendiri. Daripada:

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

…Anda akan menyertakan [polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
dan menulis:

    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

Perhatikan bahwa Anda harus meneruskan generator (`function*`) ke `createAsyncFunction`,
dan menggunakan `yield` sebagai ganti `await`. Selain itu, semuanya sama.

### Solusi - regenerator

Jika Anda menargetkan browser lama, Babel juga bisa melakukan transpile generator,
memungkinkan Anda untuk menggunakan fungsi async hingga sampai IE8. Untuk melakukannya, Anda membutuhkan
[preset es2017 Babel](http://babeljs.io/docs/plugins/preset-es2017/){: .external}
*dan* [preset es2015](http://babeljs.io/docs/plugins/preset-es2015/){: .external}.

[Keluarannya tidak semenarik](https://goo.gl/jlXboV), jadi waspadalah terhadap
code-bloat.

## Lakukan async ke semua hal!

Setelah fungsi async terdapat di semua browser, gunakan mereka pada setiap
fungsi yang mengembalikan-promise! Fungsi async tidak hanya membuat kode Anda lebih rapi, tapi juga
memastikan bahwa fungsi tersebut akan *selalu* mengembalikan promise.

Saya benar-benar bersemangat tentang fungsi async [kembali ke
2014](https://jakearchibald.com/2014/es7-async-functions/){: .external}, dan
sangat senang bisa melihatnya hadir, secara nyata, dalam browser. Whoop!


{# wf_devsite_translation #}
