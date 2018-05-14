project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Manfaatkan Console API untuk mengukur waktu eksekusi dan menghitung eksekusi pernyataan.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Mengukur dan menghitung eksekusi {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Manfaatkan Console API untuk mengukur waktu eksekusi dan menghitung eksekusi pernyataan.


### TL;DR {: .hide-from-toc }
- Gunakan <code>console.time()</code> dan <code>console.timeEnd()</code> untuk melacak waktu yang dihabiskan antar titik eksekusi kode.
- Gunakan <code>console.count()</code> untuk menghitung berapa kali string yang sama diteruskan ke sebuah fungsi.


## Mengukur waktu eksekusi

Metode [`time()`](./console-reference#consoletimelabel) memulai timer baru dan sangat berguna untuk mengukur berapa lama waktu yang diperlukan. Teruskan sebuah string ke metode untuk memberi nama pada marker.

Bila ingin menghentikan timer, panggil [`timeEnd()`](./console-reference#consoletimeendlabel) dan teruskan padanya string yang sama dengan yang diteruskan ke initializer.

Selanjutnya konsol akan mencatat label dan waktu yang dihabiskan ke log bila metode `timeEnd()` dipicu.

### Contoh dasar

Di sini, kita mengukur inisialisasi jutaan Larik baru:


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

Di Console, hasilnya seperti berikut ini:
![Waktu yang dihabiskan](images/track-executions-time-duration.png)

### Timer pada Timeline

Bila perekaman [Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) terjadi selama operasi `time()`, timeline juga akan diberi anotasi. Gunakan ini bila ingin melacak apa yang dilakukan aplikasi Anda dan dari mana asalnya.

Penampilan anotasi pada Timeline dari `time()`:

![Anotasi waktu di timeline](images/track-executions-time-annotation-on-timeline.png)

### Menandai Timeline

*Catatan: Metode `timeStamp()` hanya berfungsi apabila perekaman Timeline recording sedang berlangsung.*

[Panel Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) menyediakan ringkasan lengkap mengenai di mana saja mesin menghabiskan waktunya.
Anda bisa menambahkan tanda ke timeline dari konsol dengan [`timeStamp()`](./console-reference#consoletimestamplabel). Ini adalah cara sederhana untuk mengkorelasikan kejadian di aplikasi Anda dengan kejadian lainnya.

`timeStamp()` memberi anotasi pada Timeline di tempat-tempat berikut:

- Garis vertikal kuning di rangkuman Timeline dan tampilan detail.
- Ia menambahkan catatan ke daftar kejadian.

Contoh kode berikut ini:


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

Menghasilkan stempel waktu Timeline berikut:

![Stempel waktu di timeline](images/track-executions-timestamp2.png)

## Menghitung eksekusi pernyataan

Gunakan metode `count()` untuk mencatat ke log string yang diberikan bersama berapa kali string yang sama telah diberikan. Bila pernyataan yang persis diberikan ke `count()` pada baris yang sama, angkanya akan bertambah.

Contoh kode menggunakan `count()` dengan beberapa konten dinamis:


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

Keluaran contoh kode:

![keluaran contoh console.count()](images/track-executions-console-count.png)




{# wf_devsite_translation #}
