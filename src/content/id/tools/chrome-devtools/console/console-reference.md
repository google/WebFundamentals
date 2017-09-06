project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan Console API untuk menulis informasi ke konsol,  membuat profil JavaScript, dan memulai sesi debug.

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Referensi Console API {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Gunakan Console API untuk menulis informasi ke konsol, 
membuat profil JavaScript, dan memulai sesi debug.


## console.assert(expression, object) {:#assert}

Menulis [kesalahan](#error) ke konsol bila hasil evaluasi ekspresi adalah 
`false`. 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![contoh console.assert()](images/assert.png)

## console.clear() {:#clear}

Mengosongkan konsol.


    console.clear();
    

Jika kotak centang [**Preserve log**](index#preserve-log) diaktifkan, 
`console.clear()` dinonaktifkan. Akan tetapi, menekan tombol **clear console** 
(![tombol clear console](images/clear-console-button.png){:.inline})
atau mengetikkan pintasan <kbd>Ctrl</kbd>+<kbd>L</kbd> saat Console yang sedang
fokus masih berfungsi. 

Lihat [Mengosongkan konsol](index#clearing) untuk informasi selengkapnya.

## console.count(label) {:#count}

Menuliskan berapa kali `count()` telah dipanggil pada baris yang sama 
dan dengan label yang sama.


    function login(name) {
      console.count(name + ' logged in');
    }
    

![contoh console.count()](images/count.png)

Lihat [Menghitung Eksekusi Pernyataan][cse] untuk contoh lain.

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

Identik dengan [`console.log()`](#log).

## console.dir(object) {:#dir}

Mencetak representasi JavaScript untuk objek yang ditetapkan. Jika objek yang 
akan di-log adalah elemen HTML, maka properti dari representasi DOM-nya 
akan dicetak, seperti yang ditampilkan di bawah ini:


    console.dir(document.body);
    

![contoh `console.dir()`](images/dir.png)

Pelajari tentang formatter objek yang setara secara fungsional (`%O`) dan lainnya 
di [Substitusi dan pemformatan string][of].

[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

Mencetak representasi XML dari elemen turunan `object` jika 
memungkinkan, atau representasi JavaScript jika tidak. Memanggil `console.dirxml()`
pada elemen HTML dan XML sama dengan memanggil [`console.log()`](#log).


    console.dirxml(document);
    

![contoh console.dirxml()](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

Mencetak pesan yang serupa dengan [`console.log()`](#log), menata gaya 
pesan seperti kesalahan, dan menyertakan pelacakan tumpukan tempat dipanggilnya 
metode.


    console.error('error: name is undefined');
    

![contoh console.error()](images/error.png)

## console.group(object[, object, ...])

Memulai grup log baru dengan judul opsional. Semua keluaran konsol yang
terjadi setelah `console.group()` dan sebelum `console.groupEnd()` secara visual
akan dikelompokkan bersama. 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![contoh console.group()](images/group.png)

Anda juga bisa menyarangkan grup:


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![contoh console.group() tersarang](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

## console.groupCollapsed(object[, object, ...])

Membuat grup log baru yang kondisi awalnya diciutkan, bukan terbuka. 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

Menutup grup log. Lihat [`console.group`](#group) sebagai contoh.

## console.info(object [, object, ...])

Mencetak pesan seperti [`console.log()`](#log) tetapi juga menampilkan ikon (lingkaran
biru dengan "i" putih) di sebelah keluaran. 

## console.log(object [, object, ...]) {:#log}

Menampilkan pesan di dalam konsol. Teruskan satu atau beberapa objek ke metode ini.
Setiap objek dievaluasi dan disatukan menjadi string yang dipisah spasi.


    console.log('Hello, Logs!');
    

### Specifier format {:#format-specifiers}

Objek pertama yang diteruskan bisa berisi satu atau beberapa **specifier format**. 
Specifier format terdiri atas tanda persen (`%`) diikuti dengan sebuah huruf
yang menunjukkan format yang akan diterapkan. 

Panduan Terkait:

* [Mengorganisasi Keluaran Konsol](console-write)

## console.profile([label]) {:#profile}

Memulai profil CPU JavaScript dengan label opsional. Untuk menyelesaikan 
profil, panggil `console.profileEnd()`. Setiap profil ditambahkan ke panel **Profiles**.



    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

Menghentikan sesi profil CPU JavaScript yang sedang berlangsung, jika ada, dan 
mencetak laporan ke panel **Profiles**.

Lihat [`console.profile()`](#profile) sebagai contoh.

## console.time(label) {:#time}

Memulai timer baru dengan label terkait. Bila `console.timeEnd()` 
dipanggil dengan label yang sama, timer akan dihentikan dan waktu yang dihabiskan
akan ditampilkan di konsol. Nilai timer akurat hingga sub-milidetik.
String yang diteruskan ke `time()` dan `timeEnd()` harus sama, jika tidak maka timer 
tidak akan selesai.


    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![contoh console.time()](images/time.png)

## console.timeEnd(label) {:#timeend}

Menghentikan timer yang sedang berlangsung, jika ada, dan mencetak label timer 
diikuti dengan waktu yang dihabiskan ke Console. 

Lihat [`console.time()`](#time) sebagai contoh. 

## console.timeStamp([label]) {:#timestamp}

Menambahkan kejadian ke **Timeline** selama sesi perekaman. 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![contoh console.timeStamp()](images/timestamp.png)

Panduan Terkait:

* [Menggunakan Alat (Bantu)
  Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)

## console.trace(object) {:#trace}

Mencetak pelacakan tumpukan dari titik pemanggilan metode. 

    console.trace();

![Contoh console.trace()](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

Mencetak pesan seperti [`console.log()`](#log), tetapi juga menampilkan 
ikon peringatan berwarna kuning di sebelah pesan log.

    console.warn('user limit reached!');

![contoh console.warn()](images/warn.png)


{# wf_devsite_translation #}
