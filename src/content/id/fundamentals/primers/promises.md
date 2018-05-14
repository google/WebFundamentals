project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Promise menyederhanakan komputasi yang ditangguhkan dan asinkron. Sebuah promise mewakili sebuah operasi yang belum selesai."

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2017-07-12 #}

# Promise JavaScript: Pengantar {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Hadirin sekalian, bersiaplah untuk momen sangat penting dalam sejarah
development web.

<em>[Tabuhan genderang dimulai]</em>

Promise telah tiba sebagai bawaan asli di JavaScript!

<em>[Kembang api meletus, kertas warna-warni bertaburan dari atas, kerumunan orang bersuka ria]</em>

Pada saat ini Anda termasuk dalam salah satu kategori ini:

* Orang-orang bersuka ria di sekeliling Anda, namun Anda tidak tahu apa yang sedang diramaikan. Bahkan Anda mungkin tidak tahu apa yang dimaksud dengan "promise". Anda mengangkat bahu, namun berat kertas warna-warni membebani bahu Anda. Jika begitu, jangan khawatir, saya perlu waktu lama untuk mengetahui mengapa harus memedulikannya. Barangkali Anda ingin mulai dari [awal](#whats-all-the-fuss-about).
* Anda mengangkat tinju! Soal waktu, ya? Anda pernah menggunakan Promise ini sebelumnya namun ia mengganggu Anda karena semua implementasi memiliki API yang sedikit berbeda. API apa untuk versi resmi JavaScript? Anda mungkin perlu mulai dengan [terminologi](#promise-terminology).
* Anda sudah tahu tentang hal ini dan Anda mengejek mereka yang melompat kegirangan menyukai berita ini. Sisihkan waktu sebentar untuk mematangkan superioritas Anda, kemudian langsung saja ke [referensi API](#promise-api-reference).

## Ada apa sebenarnya? {: #whats-all-the-fuss-about }

JavaScript merupakan thread tunggal, yang berarti bahwa dua bit skrip tidak bisa dijalankan bersamaan; keduanya harus dijalankan satu per satu. Di browser, JavaScript berbagi thread dengan banyak hal lain yang berbeda pada setiap browser. Namun biasanya JavaScript berada dalam antrean yang sama dengan menggambar, memperbarui gaya, dan menangani tindakan pengguna (seperti menyorot teks dan berinteraksi dengan kontrol formulir). Aktivitas dalam semua ini akan menunda aktivitas yang lain.

Sebagai manusia, Anda bisa dianggap multithread. Anda bisa mengetik dengan beberapa jari, bisa mengemudi dan melakukan percakapan sekaligus. Satu-satunya fungsi blokir yang harus kita tangani adalah bersin, karena semua aktivitas harus ditangguhkan selama bersin. Ini tentu sangat mengganggu, khususnya bila Anda sedang mengemudi dan akan melakukan percakapan. Anda tentu tidak ingin menulis kode yang sering bersin.

Barangkali Anda sudah menggunakan kejadian dan callback untuk solusinya. Inilah kejadian tersebut:

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


Ini sama sekali tidak sering bersin. Kita mendapatkan gambar, menambahkan listener, kemudian JavaScript bisa menghentikan eksekusi hingga salah satu dari listener itu dipanggil.

Sayangnya, dalam contoh di atas, mungkin saja kejadian terjadi sebelum Anda mulai mendengarkannya, jadi kita perlu menanganinya dengan menggunakan properti "complete" gambar tersebut:

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

Ini tidak menangkap gambar yang mengalami kesalahan sebelum kita sempat mendengarkannya; sayangnya DOM tidak memberi kita cara untuk melakukannya. Selain itu, ini akan memuat satu gambar, keadaan akan semakin kompleks jika kita ingin mengetahui kapan serangkaian gambar dimuat.


## Kejadian selalu menjadi cara terbaik

Kejadian sangat cocok untuk hal-hal yang bisa terjadi berkali-kali pada objek yang sama&mdash;keyup, touchstart, dll. Dengan kejadian-kejadian itu, Anda benar-benar tidak peduli dengan apa yang terjadi sebelum melampirkan listener. Namun bila menyangkut keberhasilan/kegagalan asinkron, idealnya Anda memerlukan sesuatu seperti ini:

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

Inilah yang dilakukan promise, namun dengan penamaan yang lebih baik. Jika elemen gambar HTML memiliki metode "ready" yang mengembalikan sebuah promise, kita bisa melakukan ini:

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

* Promise hanya bisa gagal atau berhasil satu kali. Itu tidak bisa gagal atau berhasil dua kali, juga tidak bisa beralih dari berhasil ke gagal atau sebaliknya.
* Jika sebuah promise berhasil atau gagal dan Anda kemudian menambahkan callback berhasil/gagal, callback yang benar akan dipanggil, walaupun kejadian tersebut lebih dulu terjadi.

Ini sangat berguna untuk async berhasil/gagal, karena Anda menjadi kurang tertarik dengan waktu persis sesuatu menjadi tersedia, dan lebih tertarik dengan reaksi terhadap hasilnya.


## Terminologi promise {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) telah memeriksa draf pertama artikel ini dan memberi saya nilai "F" untuk terminologi. Ia menahan saya, memaksa saya menyalin [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 100 kali, dan menulis surat yang mencemaskan kepada orang tua saya. Walaupun begitu, saya tetap mendapati banyak terminologi yang bercampur aduk, namun inilah dasar-dasarnya:

Sebuah promise bisa berupa:

* **fulfilled** - Tindakan yang menyangkut promise telah berhasil
* **rejected** - Tindakan yang menyangkut promise telah gagal
* **pending** - belum terlaksana atau ditolak
* **settled** - sudah terlaksana atau ditolak


[Spesifikasi](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) juga menggunakan istilah **thenable** untuk menjelaskan objek yang mirip promise, karena ia memiliki metode `then`. Istilah ini mengingatkan saya pada mantan Manajer Sepak Bola England [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables) jadi saya akan menggunakannya sesedikit mungkin.


## Promise hadir di JavaScript!

Promise sudah lama ada dalam bentuk pustaka, misalnya:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

Promise di atas dan promise JavaScript menggunakan perilaku umum dan terstandardisasi yang sama dengan nama [Promises/A+](https://github.com/promises-aplus/promises-spec). Jika Anda pengguna jQuery, mereka memiliki sesuatu yang mirip bernama [Deferreds](https://api.jquery.com/category/deferred-object/). Akan tetapi, Deferred tidak mengikuti Promise/A+, yang membuatnya [sedikit berbeda dan kurang berguna](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/), jadi harap maklum. jQuery juga memiliki [sebuah tipe Promise](https://api.jquery.com/Types/#Promise), namun ini bukan sekadar subset Deferred dan memiliki masalah yang sama.

Walaupun implementasi promise mengikuti perilaku terstandardisasi, API keseluruhannya berbeda. Promise JavaScript serupa di API hingga RSVP.js. Begini caranya membuat promise:

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


Konstruktor promise menggunakan satu argumen, callback dengan dua parameter, resolve dan reject. Lakukan sesuatu dalam callback, bisa async, kemudian panggil resolve jika semua berjalan lancar, jika tidak maka panggil reject.

Seperti `throw` di JavaScript lama, ini adalah kebiasaan, namun tidak diperlukan, untuk menolak objek Error. Manfaat objek Error adalah merekam pelacakan tumpukan, sehingga membuat alat debug jadi lebih berguna.

Begini caranya menggunakan promise itu:

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` menggunakan dua argumen, satu callback untuk kasus berhasil, dan satu lagi untuk kasus gagal. Keduanya bersifat opsional, Anda bisa menambahkan callback untuk kasus berhasil atau gagal saja.

Promise JavaScript dimulai di DOM sebagai "Futures", diganti namanya menjadi "Promises", dan terakhir dimasukkan ke JavaScript. Keberadaannya di JavaScript ketimbang DOM bagus sekali karena mereka akan tersedia dalam konteks JS non-browser seperti Node.js (lain lagi masalahnya jika menggunakannya dalam API intinya).

Walaupun menjadi fitur JavaScript, DOM tidak takut menggunakannya. Sebenarnya, DOM API serba baru dengan metode async berhasil/gagal akan menggunakan promise. Hal ini sudah terjadi pada [Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), [Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready), [ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options), [Streams](https://github.com/whatwg/streams#basereadablestream), dan lainnya.


## Dukungan browser &amp; polyfill

Sekarang ini sudah ada implementasi promise di browser.

Sejak Chrome 32, Opera 19, Firefox 29, Safari 8 &amp; Microsoft Edge, promise sudah diaktifkan secara default.

Untuk meningkatkan browser yang tidak memiliki implementasi lengkap promise agar memenuhi spesifikasi, atau menambahkan promise ke browser lain dan Node.js, lihat [polyfill](https://github.com/jakearchibald/ES6-Promises#readme) (file gzip 2k).


## Kompatibilitas dengan pustaka lainnya

API promise JavaScript akan memperlakukan apa saja dengan metode `then()` sebagai mirip promise (atau `thenable` dalam istilah promise), jadi jika Anda menggunakan pustaka yang mengembalikan promise Q, bisa saja, cocok dengan promise JavaScript baru.

Walaupun, seperti yang saya sebutkan, Deferred di jQuery agaknya … kurang berguna. Syukurlah Anda bisa men-transmisi-kan ke promise standar, yang patut dilakukan sesegera mungkin:


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


Di sini, `$.ajax` jQuery mengembalikan sebuah Deferred. Karena memiliki metode `then()`, `Promise.resolve()` bisa mengubahnya menjadi promise JavaScript. Akan tetapi, kadang-kadang deferred meneruskan beberapa argumen ke callback-nya, misalnya:

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



Untungnya inilah yang biasanya Anda inginkan, atau setidaknya memberi Anda akses ke apa yang Anda inginkan. Juga, ketahuilah bahwa jQuery tidak mengikuti konvensi penyaluran objek Error ke dalam penolakan.


## Kode async yang rumit menjadi lebih mudah

Baiklah, mari kita membuat kode sedikit. Anggaplah kita ingin:

1. Menjalankan spinner untuk menunjukkan pemuatan
1. Mengambil sebagian JSON untuk cerita, yang akan memberi kita judul dan URL untuk setiap bab
1. Menambahkan judul ke laman
1. Mengambil setiap bab
1. Menambahkan cerita ke laman
1. Menghentikan spinner

… namun beri tahu juga pengguna jika terjadi suatu kesalahan di tengah jalan. Kita juga perlu menghentikan spinner pada saat itu, jika tidak ia akan terus berputar, menjadi pusing, dan menabrak UI lainnya.

Tentu saja, Anda tidak akan menggunakan JavaScript untuk menyajikan cerita, [lebih cepat bila berfungsi sebagai HTML](https://jakearchibald.com/2013/progressive-enhancement-is-faster/), namun pola ini sangat umum bila berurusan dengan API: Lipatgandakan pengambilan data, kemudian lakukan sesuatu setelah selesai.

Untuk mulai, mari kita tangani pengambilan data dari jaringan:

## Mem-promise-kan XMLHttpRequest

API lama akan diperbarui untuk menggunakan promise, jika memungkinkan dengan cara yang kompatibel ke belakang. `XMLHttpRequest` menjadi calon kuat, namun pada saat ini mari kita menulis sebuah fungsi sederhana untuk membuat permintaan GET:



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


[Klik di sini untuk melihat aksinya](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, periksa konsol di DevTools untuk melihat hasilnya. Sekarang kita bisa membuat permintaan HTTP tanpa mengetikkan `XMLHttpRequest` secara manual, itu bagus karena semakin sedikit saya harus melihat cara penulisan camel-casing `XMLHttpRequest` yang menjengkelkan, semakin bahagia hidup saya.


## Perantaian

`then()` bukanlah akhir cerita, Anda bisa merantai `then` bersama untuk mentransformasikan nilai atau menjalankan tindakan async tambahan satu per satu.


### Mentransformasikan nilai
Anda bisa mentransformasikan nilai cukup dengan mengembalikan nilai baru:

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



Responsnya adalah JSON, namun kita saat ini menerimanya sebagai teks biasa. Kita bisa mengubah fungsi get untuk menggunakan JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType), namun kita juga bisa memecahkannya dalam konteks promise:

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



Oleh karena `JSON.parse()` mengambil satu argumen dan mengembalikan nilai hasil transformasi, kita bisa membuat sebuah pintasan:

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[Lihat aksinya di sini](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, periksa konsol di DevTools untuk melihat hasilnya. Sebenarnya, kita bisa membuat fungsi `getJSON()` dengan sangat mudah:


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` tetap mengembalikan sebuah promise, promise yang mengambil URL kemudian mem-parse respons sebagai JSON.


### Mengantre tindakan asinkron

Anda juga bisa merangkai beberapa `then` untuk menjalankan tindakan asinkron secara berurutan.

Bila Anda mengembalikan sesuatu dari callback `then()`, ini agak ajaib. Jika Anda mengembalikan sebuah nilai, `then()` berikutnya akan dipanggil dengan nilai itu. Akan tetapi, jika Anda mengembalikan sesuatu yang mirip promise, `then()` berikutnya akan menunggunya, dan hanya dipanggil bila promise itu selesai (berhasil/gagal). Misalnya:

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



Di sini kita membuat permintaan async ke `story.json`, yang memberi kita satu set URL untuk permintaan, selanjutnya kita meminta yang pertama. Inilah saatnya promise benar-benar mulai unggul dari pola callback biasa.

Anda bahkan bisa membuat metode pintasan untuk mendapatkan bab:

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


Kita tidak mengunduh `story.json` hingga `getChapter` dipanggil, namun bila nanti `getChapter` dipanggil, kita akan menggunakan kembali promise cerita, sehingga `story.json` hanya diambil sekali. Yess Promise!


## Penanganan kesalahan

Seperti yang telah kita lihat sebelumnya, `then()` menggunakan dua argumen, satu untuk berhasil, satu untuk gagal (atau fulfill dan reject, dalam istilah promise):

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


Anda juga bisa menggunakan `catch()`:


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


Tidak ada yang spesial tentang `catch()`, ini cuma pemanis untuk `then(undefined, func)`, namun lebih mudah dibaca. Perhatikan, kedua contoh kode di atas tidak berperilaku sama, yang belakangan setara dengan:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


Perbedaannya kecil, namun sangat berguna. Penolakan promise akan melompat maju ke `then()` berikutnya dengan callback penolakan (atau `catch()`, karena setara). Dengan `then(func1, func2)`, `func1` atau `func2` akan dipanggil, tidak pernah keduanya. Namun pada `then(func1).catch(func2)`, keduanya akan dipanggil jika `func1` menolak, berhubung keduanya adalah langkah tersendiri dalam rantai tersebut. Perhatikan yang berikut ini:


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



Alur di atas sangat mirip dengan try/catch JavaScript normal, kesalahan yang terjadi dalam "try" langsung masuk ke blok `catch()`. Seperti inilah bila berbentuk bagan alur (karena saya suka bagan alur):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Ikuti garis biru untuk promise yang terlaksana, atau merah untuk yang ditolak.

### Pengecualian dan promise JavaScript
Penolakan terjadi bila promise secara eksplisit ditolak, namun juga secara implisit jika sebuah kesalahan dilontarkan dalam callback konstruktor:

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


Berarti ini berguna untuk melakukan semua pekerjaan yang menyangkut promise dalam callback konstruktor promise, sehingga kesalahan secara otomatis ditangkap dan menjadi penolakan.

Hal serupa berlaku untuk kesalahan yang dilontarkan dalam callback `then()`.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### Penanganan kesalahan dalam praktik

Dengan cerita dan bab, kita bisa menggunakan catch untuk menampilkan kesalahan kepada pengguna:



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



Jika pengambilan `story.chapterUrls[0]` gagal (mis., http 500 atau pengguna sedang offline), maka akan melewati semua callback berhasil setelahnya, termasuk yang ada di `getJSON()` yang berusaha mem-parse respons sebagai JSON, juga akan melompati callback yang menambahkan chapter1.html ke laman. Sebagai gantinya, ia pindah ke callback catch. Akibatnya, "Failed to show chapter" akan ditambahkan ke laman jika tindakan sebelumnya ada yang gagal.

Seperti try/catch di JavaScript, kesalahan akan ditangkap dan kode selebihnya akan dilanjutkan, sehingga spinner selalu tersembunyi, sebagaimana yang kita inginkan. Kode di atas akan menjadi versi async yang tidak memblokir untuk:

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


Anda mungkin ingin `catch()` hanya untuk keperluan log, tanpa pemulihan dari kesalahan. Caranya, cukup lontarkan kembali kesalahan tersebut. Kita bisa melakukannya dalam metode `getJSON()`:



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


Jadi kita telah berhasil mengambil satu bab, namun kita menginginkan semuanya. Mari kita lakukan.


## Paralelisme dan pengurutan: mendapatkan yang terbaik dari keduanya


Membayangkan async tidaklah mudah. Jika Anda berusaha keras untuk memulai, cobalah menulis kode seakan-akan ia sinkron. Dalam hal ini:

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

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


Itu akan berhasil (lihat [kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external })!
Namun kode ini menyinkronkan dan mengunci browser saat ada yang diunduh. Untuk membuat
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



Namun bagaimana kita bisa melakukan loop melalui URL bab dan mengambilnya secara berurutan? Ini **tidak berhasil**:

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` tidak kenal async, jadi bab kita akan muncul sesuai urutan pengunduhannya, yang pada dasarnya seperti cara menulis Pulp Fiction. Ini bukanlah Pulp Fiction, jadi ayo kita perbaiki.


### Membuat urutan
Kita ingin mengubah larik `chapterUrls` kita menjadi sebuah urutan promise. Kita bisa melakukannya dengan menggunakan `then()`:

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


Inilah pertama kali kita melihat `Promise.resolve()`, yang membuat sebuah promise untuk mengurai nilai apa pun yang Anda berikan. Jika Anda meneruskan padanya sebuah instance `Promise`, ia cuma mengembalikannya (**catatan:** inilah perubahan pada spesifikasi yang belum diikuti oleh beberapa implementasi). Jika Anda meneruskan sesuatu yang seperti promise (memiliki metode `then()`) ke sana, maka akan dibuat `Promise` asli yang melaksanakan/menolak dengan cara yang sama. Jika Anda meneruskan nilai lain, mis., `Promise.resolve('Hello')`, maka akan dibuat promise yang melaksanakan dengan nilai itu. Jika Anda memanggilnya tanpa nilai, seperti di atas, ia akan melaksanakan dengan "undefined".


Ada juga `Promise.reject(val)`, yang membuat promise yang akan menolak dengan nilai yang Anda berikan padanya (atau undefined).

Kita bisa merapikan kode di atas menggunakan [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



Ini melakukan hal yang sama dengan contoh sebelumnya, namun tidak perlu variabel "sequence" terpisah. Callback reduce kita dipanggil untuk setiap item dalam larik. "sequence" adalah `Promise.resolve()` pertama kali, namun untuk panggilan "sequence" selanjutnya adalah apa saja yang kita kembalikan dari panggilan sebelumnya. `array.reduce` sangat berguna untuk meringkas larik menjadi satu nilai, yang dalam hal ini adalah sebuah promise.

Mari kita satukan semuanya:

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

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

Dan sekarang kita memilikinya (lihat [kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }), versi asinkron penuh dari versi sinkron. Namun kita bisa melakukan dengan lebih baik. Untuk saat ini, laman kita akan diunduh seperti ini:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Browser lumayan bagus dalam mengunduh beberapa item sekaligus, jadi kita akan kehilangan kinerja dengan mengunduh bab satu per satu. Yang ingin kita lakukan adalah mengunduh semuanya sekaligus, kemudian memprosesnya setelah semuanya tiba. Untunglah ada API untuk ini:


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` menggunakan satu larik promise dan membuat sebuah promise yang akan melaksanakan bila semua berhasil diselesaikan. Anda mendapatkan sebuah larik hasil (promise apa pun yang dilaksanakan) dalam urutan yang sama dengan promise yang Anda teruskan padanya.



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

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

Bergantung pada koneksi, pemuatannya bisa beberapa detik lebih cepat daripada memuatnya satu per satu (lihat [kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }), dan kodenya lebih sedikit dari percobaan pertama kita. Bab bisa diunduh dalam urutan apa pun, namun mereka muncul di layar dalam urutan yang tepat.


<figure>
  <img src="imgs/promise2.gif">
</figure>

Akan tetapi, kita tetap bisa memperbaiki kinerja yang dirasakan. Bila bab satu masuk, kita harus menambahkannya ke laman. Hal ini memungkinkan pengguna mulai membaca sebelum bab selebihnya tiba. Bila bab tiga tiba, kita tidak akan menambahkannya ke laman karena pengguna mungkin tidak menyadari bab dua terlewat. Bila bab dua tiba, kita bisa menambahkan bab dua dan tiga, dst dst.

Caranya, kita ambil JSON untuk semua bab sekaligus, kemudian buat satu urutan untuk menambahkannya ke dokumen:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
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

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

Dan itulah tujuan kita (lihat [kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }), yang terbaik dari keduanya! Dibutuhkan waktu yang sama untuk mengirim semua materi, namun pengguna mendapatkan bagian dari materi pertama lebih cepat.


<figure>
  <img src="imgs/promise3.gif">
</figure>

Dalam contoh sepele ini, semua bab tiba kurang lebih sama waktunya, namun manfaat menampilkannya satu per satu akan menjadi berlebihan pada bab yang lebih banyak dan lebih besar.


Melakukan hal di atas dengan [kejadian atau callback bergaya Node.js](https://gist.github.com/jakearchibald/0e652d95c07442f205ce) akan menggandakan kode, namun yang lebih penting adalah tidak mudah mengikutinya. Akan tetapi, ini bukan akhir cerita untuk promise, bila dikombinasikan dengan fitur ES6 lainnya, maka akan lebih mudah lagi.


## Ronde bonus: promise dan generator


Bagian berikutnya ini melibatkan sekelompok fitur baru ES6, namun ini bukanlah sesuatu yang Anda perlukan untuk memahami penggunaan promise di kode Anda saat ini. Anggaplah ini seperti cuplikan film untuk beberapa fitur blockbuster yang akan datang.

ES6 juga memberi kita [generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators), yang memungkinkan fungsi keluar pada titik tertentu, seperti "kembali", namun kemudian melanjutkan dari titik dan keadaan yang sama, misalnya:



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


Perhatikan tanda bintang sebelum nama fungsi, ini menjadikannya pembuat (generator). Kata kunci yield adalah titik kembali/melanjutkan. Kita bisa menggunakannya seperti ini:

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


Namun apa artinya bagi promise? Baiklah, kita Anda bisa menggunakan perilaku kembali/lanjutkan ini untuk menulis kode async yang terlihat seperti (dan mudah diikuti seperti) kode sinkron. Jangan terlalu khawatir memahaminya baris per baris, di sini ada fungsi pembantu yang memungkinkan kita menggunakan `yield` untuk menunggu promise selesai:

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


… yang banyak saya [ambil kata demi kata dari Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500), namun telah diadaptasikan untuk promise JavaScript. Dengan ini, kita bisa mengambil contoh bab final kasus terbaik, mencampurnya dengan sekian kebaikan ES6 baru, dan mengubahnya menjadi:

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download parallel.
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

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

Ini berfungsi persis seperti sebelumnya namun jauh lebih mudah dibaca. Ini berfungsi di Chrome dan Opera (lihat [kode](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }), dan di Microsoft Edge dengan masuk ke `about:flags` dan mengaktifkan setelan **Enable experimental JavaScript features**. Ini akan diaktifkan secara default di versi mendatang.


Ini akan melontarkan sekaligus banyak fitur baru ES6: promise, generator, let, for-of. Bila kita menyerahkan promise, spawn helper akan menunggu promise untuk ditangani dan mengembalikan nilai final. Jika promise ditolak, spawn akan menyebabkan pernyataan yield kita melontarkan pengecualian, yang bisa kita tangkap dengan try/catch JavaScript biasa. Pengkodean async yang sangat sederhana!


Pola ini begitu berguna, yang hadir di ES7 dalam bentuk [fungsi async](https://jakearchibald.com/2014/es7-async-functions/). Ini sangat mirip dengan di atas, namun tidak perlu metode `spawn`.


## Referensi Promise API {: #promise-api-reference }

Semua metode berfungsi di Chrome, Opera, Firefox, Microsoft Edge, dan Safari kecuali jika dinyatakan berbeda. [Polyfill](https://github.com/jakearchibald/ES6-Promises#readme) menyediakan yang di bawah ini untuk semua browser.


### Metode Statis

<table class="responsive methods">
<tr>
<th colspan="2">Rangkuman metode</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Mengembalikan promise (hanya jika <code>promise.constructor == Promise</code>)</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>Membuat promise baru dari thenable. Thenable seperti promise asalkan ia memiliki metode `then()`.</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>Membuat promise yang melaksanakan <code>obj</code>. dalam situasi ini.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td>Membuat promise yang menolak <code>obj</code>. Untuk konsistensi dan melakukan debug (mis. pelacakan tumpukan), <code>obj</code> harus berupa <code>instanceof Error</code>.</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>Membuat promise yang melaksanakan bila setiap item di larik melaksanakan, dan menolak jika (dan bila) ada item yang menolak. Setiap item larik diteruskan ke <code>Promise.resolve</code>, sehingga larik bisa berupa campuran objek mirip promise dan objek lainnya. Nilai pelaksanaan adalah sebuah larik (dalam urutan) nilai pelaksanaan. Nilai penolakan adalah nilai penolakan pertama.</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>Membuat Promise yang melaksanakan begitu ada item yang dilaksanakan, atau menolak begitu ada item yang ditolak, mana saja yang terjadi lebih dahulu.</td>
</tr>
</table>

Note: Saya tidak percaya dengan kegunaan `Promise.race`; saya lebih suka kebalikan `Promise.all` yang hanya menolak jika semua item ditolak.

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
      Promise Anda akan dilaksanakan/ditolak bersama hasil <code>thenable</code>
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Promise Anda dilaksanakan bersama <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Promise Anda ditolak bersama <code>obj</code>. Untuk konsistensi dan 
      debug (mis., pelacakan tumpukan), objek harus berupa <code>instanceof Error</code>.
      Kesalahan yang dilontarkan di callback konstruktor akan diteruskan secara implisit
      ke <code>reject()</code>.
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
    <code>onFulfilled</code> dipanggil bila/jika "promise" dipastikan. 
    <code>onRejected</code> dipanggil bila/jika "promise" ditolak. Keduanya
    bersifat opsional, jika salah satu/keduanya ditinggalkan, 
    <code>onFulfilled</code>/<code>onRejected</code> berikutnya di rangkaian akan dipanggil.
    Kedua callback memiliki parameter tunggal, nilai pemenuhan atau 
    alasan penolakan. <code>then()</code> mengembalikan promise baru yang setara dengan 
    nilai yang Anda kembalikan dari <code>onFulfilled</code>/<code>onRejected</code>
    setelah diteruskan melalui <code>Promise.resolve</code>. Jika sebuah kesalahan
    dilontarkan di callback, promise yang dikembalikan akan ditolak bersama kesalahan itu.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td>Pemanis untuk <code>promise.then(undefined, onRejected)</code></td>
</tr>
</table>



Terima kasih banyak untuk Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans, dan Yutaka Hirano yang telah memeriksa dan membuat koreksi/saran.

Terima kasih juga kepada [Mathias Bynens](https://mathiasbynens.be/){: .external } yang telah [memperbarui beragam bagian](https://github.com/html5rocks/www.html5rocks.com/pull/921/files) dari artikel ini.


{# wf_devsite_translation #}
