project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Log konsol adalah cara andal untuk memeriksa apa yang dilakukan laman atau aplikasi Anda. Mari kita mulai dengan console.log() dan mendalami penggunaan tingkat lanjut lainnya.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Diagnosis dan Penulisan Log ke Konsol {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Log konsol adalah cara andal untuk memeriksa apa yang dilakukan laman atau aplikasi Anda. Mari kita mulai dengan console.log() dan mendalami penggunaan tingkat lanjut lainnya.


### TL;DR {: .hide-from-toc }
- Gunakan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> untuk menyimpan log biasa
- Gunakan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> dan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> untuk hal-hal yang perlu diperhatikan
- Gunakan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> dan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> untuk mengelompokkan pesan terkait dan agar rapi
- Gunakan <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> untuk menampilkan pesan kesalahan bersyarat


## Menulis ke konsol

Gunakan metode <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> untuk menyimpan log biasa ke konsol. Perlu satu atau beberapa ekspresi sebagai parameter dan menulis nilainya saat ini ke konsol, menyatukan beberapa parameter menjadi baris yang dipisah spasi.

Mengeksekusi baris kode ini di JavaScript Anda:


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

Akan menghasilkan ini di Console:
![Log Sekaligus](images/console-write-log-multiple.png)

## Pelengkapan otomatis perintah {:#autocomplete}

Bila Anda mengetik dalam Console, maka Console secara otomatis akan menampilkan 
menu tarik-turun pelengkapan otomatis untuk metode yang relevan sesuai dengan teks yang 
sudah Anda ketikkan. Ini berisi perintah sebelumnya yang telah Anda eksekusi.

![contoh pelengkapan otomatis](images/autocomplete.png)

## Mengorganisir keluaran Console {:#organizing}

### Mengelompokkan pesan

Anda bisa mengelompokkan keluaran terkait dengan perintah grup. Perintah [`console.group()`](./console-reference#consolegroupobject-object-) menggunakan satu parameter string untuk menyetel nama grup. Setelah memanggilnya di JavaScript Anda, konsol akan mulai mengelompokkan semua keluaran selanjutnya.

Untuk mengakhiri pengelompokan, Anda hanya perlu memanggil [`console.groupEnd()`](./console-reference#consolegroupend) bila telah selesai.

Contoh masukan:


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

Contoh keluaran:
![Keluaran grup konsol sederhana](images/console-write-group.png)

#### Grup tersarang

Grup log juga bisa disarangkan dalam grup lain. Ini berguna untuk melihat grup besar dalam potongan lebih kecil.

Contoh ini menampilkan grup log untuk tahap autentikasi proses masuk:


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

Dan inilah beberapa keluaran grup tersarang di konsol:
![Keluaran grup konsol sederhana](images/console-write-nestedgroup.png)

#### Menciutkan grup otomatis

Saat banyak menggunakan grup, bisa jadi akan sangat berguna bila melihatnya bukan seperti apa adanya. Untuk saat-saat seperti ini Anda bisa secara otomatis menciutkan grup dengan memanggil [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) sebagai ganti `console.group()`:


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

groupCollapsed() keluaran:
![Grup yang diciutkan pertama](images/console-write-groupcollapsed.png)

## Kesalahan dan peringatan

Kesalahan dan peringatan berfungsi sama seperti proses pembuatan log normal. Perbedaan satu-satunya adalah `error()` dan `warn()` memiliki gaya untuk menarik perhatian.

### console.error()

Metode [`console.error()`](./console-reference#consoleerrorobject--object-) menampilkan ikon merah bersama teks pesan merah:


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

berubah menjadi

![Keluaran contoh kesalahan](images/console-write-error-server-not-resp.png)

### console.warn()

Metode [`console.warn()`](./console-reference#consolewarnobject--object-) menampilkan ikon peringatan kuning bersama teks pesan:


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

berubah menjadi

![Contoh peringatan](images/console-write-warning-too-few-nodes.png)

## Pernyataan

Metode [`console.assert()`](./console-reference#consoleassertexpression-object) secara bersyarat menampilkan string kesalahan (parameternya kedua) hanya jika parameter pertamanya mengevaluasi ke `false`.

### Pernyataan sederhana dan cara menampilkannya

Kode berikut akan menyebabkan pesan kesalahan di konsol hanya jika jumlah simpul anak yang dimiliki elemen `list` lebih besar dari 500.


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

Bagaimana suatu pernyataan gagal ditampilkan di konsol:
![Pernyataan gagal](images/console-write-assert-failed.png)

## Substitusi dan pemformatan string

Parameter pertama yang diteruskan ke suatu metode log mungkin berisi satu atau beberapa specifier format. Specifier format terdiri dari sebuah simbol `%` diikuti dengan huruf yang menunjukkan format yang diterapkan pada nilainya. Parameter setelah string berlaku pada placeholder sesuai urutan.

Contoh berikut menggunakan formatter string dan digit untuk memasukkan nilai ke dalam string keluaran. Anda akan melihat "Sam has 100 points" di konsol.

    console.log("%s has %d points", "Sam", 100);

Daftar lengkap specifier format adalah:

| Specifier | Output                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | Memformat nilai sebagai string                                                     |
| %i or %d  | Memformat nilai sebagai integer                                                   |
| %f        | Memformat nilai sebagai nilai floating point                                       |
| %o        | Memformat nilai sebagai elemen DOM yang bisa diperluas. Seperti terlihat di panel Elements     |
| %O        | Memformat nilai sebagai objek JavaScript yang bisa diperluas                              |
| %c        | Menerapkan aturan CSS string keluaran sebagaimana ditetapkan oleh parameter kedua |

Contoh ini menggunakan specifier digit untuk memformat nilai `document.childNodes.length`. Ia juga menggunakan specifier floating point untuk memformat nilai `Date.now()`.

Kode:


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

Keluaran dari contoh kode sebelumnya:
![Contoh keluaran substitusi](images/console-write-log-multiple.png)

### Menata gaya keluaran konsol dengan CSS

Specifier format CSS memungkinkan Anda menyesuaikan tampilan di konsol.
Mulailah string dengan specifier dan berikan gaya yang ingin Anda terapkan sebagai parameter kedua.

Cobalah kode ini:


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

..untuk membuat keluaran log Anda menjadi besar dan berwarna biru:

![String yang diformat](images/console-write-format-string.png)

### Memformat elemen DOM sebagai objek JavaScript

Secara default, log elemen DOM dimasukkan ke konsol sebagai representasi dari HTML-nya, namun kadang-kadang Anda perlu mengakses elemen DOM sebagai objek JavaScript dan memeriksa propertinya. Anda bisa menggunakan specifier string `%o` untuk melakukannya (lihat di atas), atau menggunakan `console.dir` untuk mencapai hasil yang sama: 

![Membuat log elemen dengan menggunakan dir()](images/dir-element.png)




{# wf_devsite_translation #}
