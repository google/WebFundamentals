project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Promise menyederhanakan komputasi yang tertunda dan asinkron. Sebuah promise mewakili sebuah operasi yang belum selesai."

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2019-02-06 #}
{# wf_blink_components: Blink>JavaScript #}

# Promise JavaScript: Pengantar {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Hadirin sekalian, bersiaplah untuk momen sangat penting dalam sejarah
development web.

<em>[Tabuhan genderang dimulai]</em>

Promise telah tersedia secara native di JavaScript!

<em>[Kembang api meletus, kertas warna-warni bertaburan dari atas, kerumunan orang bersuka ria]</em>

Pada saat ini Anda termasuk dalam salah satu kategori ini:

* Semua orang bersuka cita di sekeliling Anda, namun Anda tidak tahu keriuhan ini karena
  apa. Bahkan Anda mungkin tidak tahu apa yang dimaksud dengan "promise". Anda mengangkat bahu, namun
  berat kertas warna-warni membebani bahu Anda. Jika begitu, jangan
  khawatir, saya perlu waktu lama untuk mengetahui mengapa harus
  memedulikannya. Barangkali Anda ingin mulai dari [awal](#whats-all-the-fuss-about).
* Anda mengangkat tinju! Sudah saatnya kan? Anda pernah menggunakan Promise ini sebelumnya
  namun Anda heran karena semua implementasi memiliki API yang sedikit berbeda.
  API apa untuk versi resmi JavaScript? Anda dapat memulai
  dengan [terminologi](#promise-terminology).
* Anda sudah tahu tentang hal ini dan Anda mengejek mereka yang melompat kegirangan
  menyukai berita ini. Sisihkan waktu sebentar untuk mematangkan superioritas Anda,
  kemudian langsung saja ke [referensi API](#promise-api-reference).

## Ada apa sebenarnya? {: #whats-all-the-fuss-about }

JavaScript merupakan thread tunggal, yang berarti bahwa dua bit skrip tidak dapat dijalankan
bersamaan; keduanya harus dijalankan satu per satu. Di browser, JavaScript
menggunakan thread bersama banyak item lain yang berbeda pada
setiap browser. Namun, biasanya JavaScript berada dalam antrean yang sama dengan menggambar, memperbarui
gaya, dan menangani tindakan pengguna (seperti menandai teks dan berinteraksi
dengan kontrol formulir). Aktivitas pada salah satu tindakan ini akan menunda aktivitas lainnya.

Sebagai manusia, Anda dapat melakukan banyak thread. Anda dapat mengetik dengan beberapa jari,
mengemudi, dan melakukan percakapan sekaligus. Satu-satunya fungsi
blokir yang harus kita hadapi adalah bersin, karena semua aktivitas harus
ditangguhkan selama bersin. Ini tentu sangat mengganggu,
apalagi jika Anda sedang mengemudi dan akan melakukan percakapan. Anda tentu
tidak ingin menulis kode yang sering bersin.

Barangkali Anda sudah menggunakan peristiwa dan callback untuk menyiasatinya. Inilah peristiwa tersebut:

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


Ini sama sekali tidak sering bersin. Kita mendapatkan gambar, menambahkan listener, kemudian
JavaScript dapat menghentikan eksekusi hingga salah satu dari listener tersebut ditampilkan.

Sayangnya, dalam contoh di atas, mungkin saja peristiwa terjadi
sebelum Anda mulai mendengarkannya, jadi kita perlu mengatasinya dengan menggunakan
properti "complete" gambar tersebut:

    var img1 = document.querySelector('.img-1');

    function loaded() {
      // woo yey image loaded
    }

    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
      // argh everything's broken
    });

Tindakan ini tidak menyimpan gambar yang mengalami error sebelum kita sempat mendengarkannya
; sayangnya DOM tidak memberi kita cara untuk melakukannya. Selain itu, tindakan ini
akan memuat satu gambar, keadaan akan semakin kompleks jika kita ingin mengetahui kapan
serangkaian gambar dimuat.


## Peristiwa tidak selalu menjadi cara terbaik

Peristiwa sangat tepat untuk tindakan yang dapat terjadi beberapa kali pada objek
yang sama&mdash;keyup, touchstart, dll. Dengan peristiwa tersebut, Anda tidak
memerhatikan apa yang terjadi sebelum melampirkan listener. Namun, jika menyangkut
keberhasilan/kegagalan asinkron, idealnya Anda memerlukan seperti ini:

    img1.callThisIfLoadedOrWhenLoaded(function() {
      // loaded
    }).orIfFailedCallThis(function() {
      // failed
    });

    // and…
    whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
      // all loaded
    }).orIfSomeFailedCallThis(function() {
      // one or more failed
    });

Inilah yang dilakukan promise, namun dengan penamaan yang lebih baik. Jika elemen gambar HTML memiliki metode
"ready" yang menampilkan sebuah promise, kita dapat melakukan ini:

    img1.ready().then(function() {
      // loaded
    }, function() {
      // failed
    });

    // and…
    Promise.all([img1.ready(), img2.ready()]).then(function() {
      // all loaded
    }, function() {
      // one or more failed
    });


Pada dasarnya, promise mirip event listener, hanya saja:

* Promise hanya dapat gagal atau berhasil satu kali. Promise tidak dapat gagal atau berhasil dua kali,
  juga tidak dapat beralih dari berhasil ke gagal atau sebaliknya.
* Jika promise berhasil atau gagal dan Anda kemudian menambahkan callback berhasil/gagal,
 callback yang tepat akan ditampilkan, meski peristiwa tersebut terjadi
  lebih awal.

Ini sangat berguna untuk keberhasilan/kegagalan asinkron, karena Anda menjadi kurang
tertarik dengan waktu persis sesuatu menjadi tersedia, dan lebih tertarik
dengan reaksi terhadap hasilnya.


## Terminologi promise {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) telah memeriksa draf pertama
artikel ini dan memberi saya nilai "F" untuk terminologi. Ia menahan saya,
memaksa saya menyalin
[States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
100 kali, dan menulis surat yang mencemaskan kepada orang tua saya. Walaupun begitu, saya masih
mencampuradukkan banyak terminologi, namun berikut ini terminologi dasarnya:

Promise dapat berupa:

* **terpenuhi** - Tindakan terkait promise berhasil
* **ditolak** - Tindakan terkait promise gagal
* **pending** - Belum terpenuhi atau ditolak
* **selesai** - Telah terpenuhi atau ditolak


[Spesifikasi](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)
juga menggunakan istilah **thenable** untuk menjelaskan objek yang mirip promise,
karena memiliki metode `then`. Istilah ini mengingatkan saya pada mantan Manajer
Sepak Bola England [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables) jadi
saya akan menggunakannya seminimal mungkin.


## Promise hadir di JavaScript!

Promise sudah lama ada dalam bentuk library, misalnya:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

Promise di atas dan promise JavaScript menggunakan perilaku umum dan terstandardisasi
yang disebut [Promises/A+](https://github.com/promises-aplus/promises-spec). Jika
Anda pengguna jQuery, promise tersebut memiliki item yang mirip, yang disebut
[Deferreds](https://api.jquery.com/category/deferred-object/). Namun,
Deferreds tidak sesuai dengan Promise/A+, sehingga
[agak berbeda dan kurang berguna](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/),
jadi berhati-hatilah. jQuery juga memiliki
[jenis Promise](https://api.jquery.com/Types/#Promise), namun ini hanya berupa
subset Deferred dan memiliki masalah yang sama.

Meski implementasi promise mengikuti perilaku terstandardisasi, API
keseluruhannya berbeda. Promise JavaScript mirip dengan RSVP.js. dalam API.
Begini caranya membuat promise:

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


Konstruktor promise menggunakan satu argumen, callback dengan dua parameter,
resolve dan reject. Lakukan sesuatu dalam callback, bisa asinkron, kemudian tampilkan
resolve jika semua berjalan lancar, jika tidak maka tampilkan reject.

Seperti `throw` di JavaScript lama, ini adalah kebiasaan, namun tidak diperlukan, untuk
menolak objek Error. Manfaat objek Error adalah merekam
pelacakan tumpukan, sehingga membuat alat debug menjadi lebih berguna.

Begini caranya menggunakan promise tersebut:

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` menggunakan dua argumen, callback untuk kasus berhasil, dan satu
lagi untuk kasus gagal. Keduanya bersifat opsional, jadi Anda dapat menambahkan callback untuk
kasus berhasil atau gagal saja.

Promise JavaScript dimulai di DOM sebagai "Futures", diganti namanya menjadi "Promises",
dan terakhir dimasukkan ke JavaScript. Keberadaannya di JavaScript, bukan
DOM, bagus sekali karena promise tersebut akan tersedia dalam konteks JS non-browser seperti
Node.js (lain lagi masalahnya jika menggunakannya dalam API intinya).

Meski menjadi fitur JavaScript, DOM tidak takut menggunakannya. Bahkan
, DOM API serba baru dengan metode berhasil/gagal asinkron akan menggunakan promise.
Hal ini sudah terjadi pada
[Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota),
[Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready),
[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17),
[Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options),
[Streams](https://github.com/whatwg/streams#basereadablestream), dan lainnya.


## Dukungan browser &amp; polyfill

Sekarang sudah ada implementasi promise di browser.

Sejak Chrome 32, Opera 19, Firefox 29, Safari 8 &amp; Microsoft Edge,
promise diaktifkan secara default.

Untuk meningkatkan browser yang tidak memiliki implementasi lengkap promise agar memenuhi
spesifikasi, atau menambahkan promise ke browser lain dan Node.js, lihat
[polyfill](https://github.com/jakearchibald/ES6-Promises#readme)
(file gzip 2k).


## Kompatibilitas dengan library lainnya

API promise JavaScript akan memperlakukan apa saja dengan metode `then()` sebagai
mirip promise (atau `thenable` dalam istilah promise), jadi jika Anda menggunakan library
yang mengembalikan promise Q, bisa saja, cocok dengan promise
JavaScript baru.

Walaupun, seperti yang saya sebutkan, Deferred di jQuery sepertinya… kurang berguna.
Syukurlah Anda dapat mentransmisikannya ke promise standar, yang patut
dilakukan sesegera mungkin:


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


Di sini, `$.ajax` jQuery menampilkan sebuah Deferred. Karena memiliki metode `then()`,
`Promise.resolve()` dapat mengubahnya menjadi promise JavaScript. Akan tetapi,
kadang deferred meneruskan beberapa argumen ke callback-nya, misalnya:

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



Sementara promise JS mengabaikan semua itu selain yang pertama:


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



Untungnya promise inilah yang biasanya Anda inginkan, atau setidaknya memberi Anda akses ke
promise yang Anda inginkan. Selain itu, perlu diperhatikan bahwa jQuery tidak mengikuti konvensi
penerusan objek Error ke dalam penolakan.


## Kode asinkron yang rumit menjadi lebih mudah

Baiklah, mari kita membuat kode. Misalnya, kita ingin:

1. Menjalankan spinner untuk menandakan pemuatan
1. Ambil sebagian JSON untuk cerita, yang akan memberi kita judul dan URL untuk tiap bab
1. Tambahkan judul ke halaman
1. Ambil tiap bab
1. Tambahkan cerita ke halaman
1. Hentikan spinner

… namun beri tahu juga pengguna jika terjadi masalah di tengah proses. Kita juga perlu
menghentikan spinner pada saat itu, jika tidak spinner akan terus berputar, menjadi
pusing, dan menabrak UI lainnya.

Tentu saja, Anda tidak akan menggunakan JavaScript untuk menyajikan cerita,
[lebih cepat jika berfungsi sebagai HTML](https://jakearchibald.com/2013/progressive-enhancement-is-faster/),
namun pola ini sangat umum jika berkaitan dengan API: Lipatgandakan
pengambilan data, kemudian lakukan sesuatu setelah selesai.

Untuk memulai, mari kita tangani pengambilan data dari jaringan:

## Mem-promise-kan XMLHttpRequest

API lama akan diupdate untuk menggunakan promise, jika memungkinkan dengan cara kompatibel
mundur. `XMLHttpRequest` adalah kandidat utama, namun untuk sementara,
mari kita menuliskan fungsi sederhana untuk membuat permintaan GET:



    function get(url) {
      // Return a new promise.
      return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    }


Sekarang mari kita menggunakannya:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


Sekarang kita dapat membuat permintaan HTTP tanpa mengetik `XMLHttpRequest` secara manual. Ini bagus karena
saya tidak perlu sering melihat cara penulisan camel-casing `XMLHttpRequest` yang merepotkan ini.


## Chaining

`then()` bukanlah akhir cerita, Anda dapat merantai `then` bersama untuk
mentransformasikan nilai atau menjalankan tindakan asinkron tambahan satu per satu.


### Mentransformasikan nilai
Anda dapat mentransformasikan nilai hanya dengan menampilkan nilai baru:

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


Sebagai contoh praktis, mari kita kembali ke:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



Responsnya adalah JSON, namun kita saat ini menerimanya sebagai teks biasa. Kita
dapat mengubah fungsi get untuk menggunakan JSON
[`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType),
namun kita juga dapat memecahkannya dalam konteks promise:

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



Karena `JSON.parse()` mengambil satu argumen dan menampilkan nilai hasil transformasi,
kita dapat membuat sebuah pintasan:

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


Bahkan, kita dapat membuat fungsi `getJSON()` dengan sangat mudah:

    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` tetap mengembalikan sebuah promise, promise yang mengambil URL kemudian
menguraikan respons sebagai JSON.


### Mengantre tindakan asinkron

Anda juga dapat merantai beberapa `then` untuk menjalankan tindakan asinkron secara berurutan.

Jika Anda menampilkan sesuatu dari callback `then()`, ini agak ajaib.
Jika Anda menampilkan nilai, `then()` berikutnya akan ditampilkan dengan nilai tersebut. Akan tetapi,
jika Anda menampilkan sesuatu yang mirip promise, `then()` berikutnya akan menunggunya, dan
hanya ditampilkan jika promise tersebut selesai (berhasil/gagal). Misalnya:

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



Di sini kita membuat permintaan asinkron ke `story.json`, yang memberi kita satu set
URL untuk diminta, lalu kita meminta URL pertama. Pada saat ini promise
benar-benar mulai menonjol dari pola callback biasa.

Anda bahkan dapat membuat metode pintasan untuk mendapatkan bab:

    var storyPromise;

    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');

      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }

    // and using it is simple:
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    })


Kita tidak mendownload `story.json` hingga `getChapter` ditampilkan, namun jika nanti
`getChapter` ditampilkan, kita akan menggunakan kembali promise cerita, sehingga `story.json`
hanya diambil satu kali. Yess Promise!


## Penanganan error

Seperti yang telah kita lihat sebelumnya, `then()` menggunakan dua argumen, satu untuk berhasil, satu
untuk gagal (atau fulfill dan reject, dalam istilah promise):

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


Anda juga dapat menggunakan `catch()`:


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


Tidak ada yang spesial dengan `catch()`, ini cuma pemanis untuk
`then(undefined, func)`, namun lebih mudah dibaca. Perlu diperhatikan, dua contoh kode
di atas tidak berperilaku sama, kode kedua setara dengan:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


Perbedaannya kecil, namun sangat berguna. Penolakan promise akan melompat
maju ke `then()` berikutnya dengan callback penolakan (atau `catch()`, karena
setara). Dengan `then(func1, func2)`, `func1` atau `func2` akan
ditampilkan, tidak pernah keduanya. Namun pada `then(func1).catch(func2)`, keduanya akan
ditampilkan jika `func1` menolak, karena keduanya adalah langkah tersendiri dalam rantai tersebut. Perhatikan
yang berikut:


    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch(function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch(function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    })



Alur di atas sangat mirip dengan try/catch JavaScript normal, error yang
terjadi dalam "try" langsung masuk ke blok `catch()`. Seperti inilah
jika berbentuk diagram alur (karena saya suka diagram alur):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden"
   src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Ikuti garis biru untuk promise yang terpenuhi, atau merah untuk promise yang
ditolak.

### Pengecualian dan promise JavaScript
Penolakan terjadi jika promise secara eksplisit ditolak, namun juga secara implisit
jika error ditampilkan dalam callback konstruktor:

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });

    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })


Berarti ini berguna untuk melakukan semua pekerjaan yang terkait promise dalam
callback konstruktor promise, sehingga error secara otomatis direkam dan
menjadi penolakan.

Hal serupa berlaku untuk error yang ditampilkan dalam callback `then()`.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### Penanganan error dalam praktik

Dengan cerita dan bab, kita dapat menggunakan catch untuk menampilkan error kepada pengguna:



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



Jika pengambilan `story.chapterUrls[0]` gagal (mis., http 500 atau pengguna sedang offline),
catch akan melewati semua callback berhasil setelahnya, termasuk yang ada di
`getJSON()` yang mencoba menguraikan respons sebagai JSON, juga akan melewati
callback yang menambahkan chapter1.html ke halaman. Sebagai gantinya, catch pindah ke callback
catch. Akibatnya, "Failed to show chapter" akan ditambahkan ke halaman jika
tindakan sebelumnya ada yang gagal.

Seperti try/catch di JavaScript, error akan ditangkap dan kode selanjutnya
akan dilanjutkan, sehingga spinner selalu tersembunyi, seperti yang kita inginkan. Kode
di atas menjadi versi asinkron yang tidak memblokir untuk:

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


Anda dapat `catch()` hanya untuk keperluan log, tanpa pemulihan
dari error. Caranya, cukup tampilkan kembali error tersebut. Kita dapat melakukannya dalam
metode `getJSON()`:



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


Jadi kita telah berhasil mengambil satu bab, namun kita menginginkan semuanya. Mari kita
melakukannya.


## Paralelisme dan pengurutan: mengoptimalkan keduanya


Membayangkan asinkron tidaklah mudah. Jika Anda berusaha keras untuk memulai,
cobalah menulis kode seakan-akan kode tersebut sinkron. Dalam hal ini:

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);

      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });

      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }

    document.querySelector('.spinner').style.display = 'none'

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/sync-example.html)


Ini berhasil (lihat
[kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/sync-example.html))!
Namun kode ini sinkron dan mengunci browser saat item didownload. Untuk membuat
pekerjaan ini asinkron, kita menggunakan `then()` untuk melakukannya satu per satu.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch &amp; display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })



Namun bagaimana kita dapat melakukan loop melalui URL bab dan mengambilnya secara berurutan? Ini
**tidak berhasil**:

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` tidak mengenal asinkron, jadi bab kita akan muncul sesuai urutan
downloadnya, yang pada dasarnya seperti cara menulis Pulp Fiction. Ini bukanlah
Pulp Fiction, jadi mari kita memperbaikinya.


### Membuat urutan
Kita ingin mengubah array `chapterUrls` menjadi urutan promise. Kita dapat melakukannya menggunakan `then()`:

    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    story.chapterUrls.forEach(function(chapterUrl) {
      // Add these actions to the end of the sequence
      sequence = sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    })


Inilah pertama kali kita melihat `Promise.resolve()`, yang membuat
promise untuk diselesaikan menjadi nilai apa pun yang Anda berikan. Jika Anda meneruskan
instance `Promise`, maka hanya akan mengembalikannya (**Note:** inilah
perubahan pada spesifikasi yang belum diikuti oleh beberapa implementasi). Jika Anda
meneruskan item seperti promise (memiliki metode `then()`), maka akan membuat
 `Promise` asli yang terpenuhi/ditolak dengan cara yang sama. Jika Anda meneruskan
nilai lain, mis., `Promise.resolve('Hello')`, maka akan membuat
promise yang terpenuhi dengan nilai tersebut. Jika Anda memanggilnya tanpa nilai,
seperti di atas, maka akan terpenuhi dengan "undefined".


Ada juga `Promise.reject(val)`, yang membuat promise yang akan ditolak dengan
nilai yang Anda berikan (atau undefined).

Kita dapat merapikan kode di atas menggunakan
[`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



Ini melakukan tindakan yang sama dengan contoh sebelumnya, namun tidak memerlukan variabel "sequence"
terpisah. Callback reduce ditampilkan untuk tiap item dalam array.
"sequence" adalah `Promise.resolve()` yang pertama, namun pada
call berikutnya, "sequence" adalah promise yang ditampilkan dari call sebelumnya. `array.reduce`
sangat berguna untuk meringkas array menjadi satu nilai, yang dalamhal ini merupakan
sebuah promise.

Mari kita merangkumnya:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-example.html)

Dan sekarang kita memilikinya (lihat
[kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-example.html)),
versi asinkron penuh dari versi sinkron. Namun, kita dapat melakukan dengan lebih baik. Untuk saat ini,
halaman kita didownload seperti ini:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Browser lumayan bagus dalam mendownload beberapa item sekaligus, jadi kita akan kehilangan
performa dengan mendownload bab satu per satu. Yang ingin kita lakukan adalah
mendownload semua item sekaligus, lalu memprosesnya setelah semua item tiba.
Untunglah ada API untuk ini:


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` menggunakan array promise dan membuat promise yang akan terpenuhi
jika semua berhasil diselesaikan. Anda mendapatkan array hasil (hasil
apa pun yang terpenuhi oleh promise) dalam urutan yang sama dengan promise yang Anda teruskan.



    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-all-example.html)

Bergantung pada koneksi, pemuatannya dapat beberapa detik lebih cepat daripada memuatnya satu per satu (lihat
[kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-all-example.html)),
dan kodenya lebih sedikit dari percobaan pertama kita. Bab dapat didownload dalam urutan
apa pun, namun bab muncul di layar dalam urutan yang tepat.


<figure>
  <img src="imgs/promise2.gif">
</figure>

Akan tetapi, kita tetap dapat memperbaiki performa yang dirasakan. Jika bab satu masuk, kita
harus menambahkannya ke halaman. Tindakan ini memungkinkan pengguna mulai membaca sebelum
bab selanjutnya tiba. Jika bab tiga masuk, kita tidak akan menambahkannya ke
halaman karena pengguna mungkin tidak menyadari bab dua tidak ada. Jika bab dua masuk
, kita dapat menambahkan bab dua dan tiga, dst.

Caranya, kita mengambil JSON untuk semua bab sekaligus, lalu membuat satu
urutan untuk menambahkannya ke dokumen:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download in parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-best-example.html)

Dan itulah tujuan kita (lihat
[kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-best-example.html)),
yang terbaik dari keduanya! Dibutuhkan waktu yang sama untuk mengirim semua konten,
namun pengguna mendapatkan bagian pertama konten lebih cepat.


<figure>
  <img src="imgs/promise3.gif">
</figure>

Dalam contoh kecil ini, semua bab masuk kurang lebih sama waktunya, namun
manfaat menampilkannya satu per satu akan menjadi berlebihan pada bab yang lebih
banyak dan lebih besar.


Melakukan tindakan di atas dengan [callback atau
peristiwa bergaya Node.js](https://gist.github.com/jakearchibald/0e652d95c07442f205ce) akan
menggandakan kode, namun yang lebih penting adalah tidak mudah mengikutinya. Akan tetapi, ini
bukan akhir cerita untuk promise, jika dikombinasikan dengan fitur ES6 lainnya,
maka akan lebih mudah lagi.


## Ronde bonus: promise dan generator


Bagian berikutnya ini membahas fitur baru ES6, namun Anda tidak
memerlukannya untuk memahami penggunaan promise dalam kode Anda saat ini. Anggaplah ini seperti cuplikan
film untuk beberapa fitur blockbuster yang akan datang.

ES6 juga memberi
[generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators),
yang memungkinkan fungsi keluar pada titik tertentu, seperti "kembali", namun
kemudian melanjutkan dari titik dan keadaan yang sama, misalnya:


    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


Perhatikan tanda bintang di depan nama fungsi, yang menjadikannya sebagai generator. Kata kunci
yield adalah titik kembali/lanjutkan. Kita dapat menggunakannya seperti ini:

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


Namun apa artinya bagi promise? Anda dapat menggunakan perilaku kembali/lanjutkan
ini untuk menulis kode asinkron yang terlihat seperti (dan mudah diikuti seperti)
kode sinkron. Jangan terlalu khawatir memahaminya baris per baris,
di sini ada fungsi pembantu yang memungkinkan kita menggunakan `yield` untuk menunggu promise
selesai:

    function spawn(generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }
      var generator = generatorFunc();
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    }


… yang banyak saya
[ambil kata demi kata dari Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500),
namun telah diadaptasikan untuk promise JavaScript. Dengan ini, kita dapat mengambil contoh
bab final kasus terbaik, mencampurnya dengan banyak keunggulan ES6 baru, dan mengubahnya
menjadi:

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download in parallel.
        let chapterPromises = story.chapterUrls.map(getJSON);

        for (let chapterPromise of chapterPromises) {
          // Wait for each chapter to be ready, then add it to the page
          let chapter = yield chapterPromise;
          addHtmlToPage(chapter.html);
        }

        addTextToPage("All done");
      }
      catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage("Argh, broken: " + err.message);
      }
      document.querySelector('.spinner').style.display = 'none';
    })

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/primers/async-generators-example.html)

Ini berfungsi persis seperti sebelumnya namun jauh lebih mudah dibaca. Generator ini berfungsi di
Chrome dan Opera saat ini (lihat
[kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/primers/async-generators-example.html)),
dan berfungsi di Microsoft Edge dengan membuka `about:flags` dan mengaktifkan
setelan **Enable experimental JavaScript features**. Setelan ini akan
diaktifkan secara default di versi mendatang.


Setelan ini menampilkan sekaligus banyak fitur baru ES6: promise, generator, let, for-of.
Jika kita menyerahkan promise, spawn helper akan menunggu promise untuk diselesaikan dan
mengembalikan nilai final. Jika promise ditolak, spawn akan menyebabkan pernyataan
yield kita menampilkan pengecualian, yang dapat disimpan dengan try/catch
JavaScript biasa. Pengkodean asinkron ini sangat sederhana.


Pola ini begitu berguna, sehingga hadir di ES7 dalam bentuk
[fungsi asinkron](https://jakearchibald.com/2014/es7-async-functions/). Fungsi ini
sama dengan yang di atas, namun tidak memerlukan metode `spawn`.


## Referensi Promise API {: #promise-api-reference }

Semua metode berfungsi di Chrome, Opera, Firefox, Microsoft Edge, dan Safari
, kecuali diberi catatan lain.
[Polyfill](https://github.com/jakearchibald/ES6-Promises#readme) menyediakan
di bawah untuk semua browser.


### Metode Statis

<table class="responsive methods">
<tr>
<th colspan="2">Rangkuman metode</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Menampilkan promise (hanya jika <code>promise.constructor == Promise</code>)</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>
    Membuat promise baru dari thenable. Thenable seperti promise asalkan
    memiliki metode `then()`.
  </td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>Membuat promise yang memenuhi <code>obj</code>. dalam situasi ini.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td>
    Membuat promise yang menolak <code>obj</code>. Untuk konsistensi dan
    debug (mis., pelacakan tumpukan), <code>obj</code> harus berupa
    <code>instanceof Error</code>.
  </td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>
    Membuat promise yang terpenuhi jika setiap item di array terpenuhi, dan
    menolak jika (dan saat) ada item yang menolak. Tiap item array diteruskan ke
    <code>Promise.resolve</code>, sehingga array dapat berupa campuran
    objek mirip promise dan objek lainnya. Nilai pemenuhan adalah
    sebuah array (dalam urutan) nilai pemenuhan. Nilai penolakan adalah
    nilai penolakan pertama.
  </td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>
    Membuat Promise yang terpenuhi begitu ada item yang terpenuhi, atau menolak begitu
    ada item yang ditolak, bergantung pada mana yang terjadi lebih dahulu.
  </td>
</tr>
</table>

Note: Saya tidak percaya dengan kegunaan `Promise.race`; saya lebih suka
kebalikan `Promise.all` yang hanya menolak jika semua item ditolak.

### Konstruktor

<table class="responsive constructors">
<tr>
<th colspan="2">Konstruktor</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Promise akan terpenuhi/ditolak berdasarkan hasil
      <code>thenable</code>
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Promise terpenuhi dengan <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Promise ditolak dengan <code>obj</code>. Untuk konsistensi dan
      debug (mis, pelacakan tumpukan), obj harus berupa <code>instanceof
      Error</code>.  Error yang ditampilkan di callback kontruktor akan
      secara implisit diteruskan ke <code>reject()</code>.
    </p>
  </td>
</tr>
</table>

### Metode Instance

<table class="responsive methods">
<tr>
<th colspan="2">Metode Instance</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    <code>onFulfilled</code> ditampilkan saat/jika "promise" selesai.
    <code>onRejected</code> ditampilkan saat/jika "promise" ditolak. Keduanya
    bersifat opsional, jika salah satu/keduanya ditinggalkan,
    <code>onFulfilled</code>/<code>onRejected</code> berikutnya dalam chain akan ditampilkan.
    Kedua callback memiliki satu parameter, nilai pemenuhan atau
    alasan penolakan. <code>then()</code> menampilkan promise baru yang setara dengan
    nilai yang Anda kembalikan dari <code>onFulfilled</code>/<code>onRejected</code>
    setelah diteruskan melalui <code>Promise.resolve</code>. Jika error
    ditampilkan di callback, promise yang dikembalikan akan ditolak bersama error tersebut.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td>Pemanis untuk <code>promise.then(undefined, onRejected)</code></td>
</tr>
</table>

## Masukan {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

Terima kasih banyak untuk Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp,
Addy Osmani, Arthur Evans, dan Yutaka Hirano yang telah memeriksa dan membuat
koreksi/saran.

Terima kasih juga kepada [Mathias Bynens](https://mathiasbynens.be/) yang telah
[memperbarui beragam bagian](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)
dari artikel ini.
