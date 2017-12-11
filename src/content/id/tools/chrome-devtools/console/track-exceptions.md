project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools menyediakan berbagai alat untuk membantu Anda memperbaiki laman web yang melontarkan pengecualian dan men-debug kesalahan di JavaScript Anda.

{# wf_updated_on: 2015-05-12 #}
{# wf_published_on: 2015-04-13 #}

# Penanganan Kesalahan dan Pengecualian {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools menyediakan berbagai alat untuk membantu Anda memperbaiki laman web yang melontarkan pengecualian dan men-debug kesalahan di JavaScript Anda.

Pengecualian laman dan kesalahan JavaScript sebenarnya sangat berguna - jika Anda bisa mendapatkan detailnya. Bila sebuah laman melontarkan pengecualian atau skrip menghasilkan suatu kesalahan, Console akan memberikan informasi spesifik yang bisa diandalkan untuk membantu Anda menemukan dan mengoreksi masalah tersebut. 

Di Console Anda bisa melacak pengecualian dan mengusut jalur eksekusi yang mengarahkan ke sana, secara eksplisit atau implisit menangkapnya (atau mengabaikannya), dan bahkan menyetel penangan kesalahan untuk mengumpulkan dan memproses data pengecualian secara otomatis.


### TL;DR {: .hide-from-toc }
- Aktifkan Pause on Exceptions untuk men-debug konteks kode bila pengecualian terpicu.
- Cetak tumpukan panggilan JavaScript saat ini menggunakan <code>console.trace</code>.
- Letakkan pernyataan dalam kode Anda dan lontarkan pengecualian menggunakan <code>console.assert()</code>.
- Masukkan ke log kesalahan yang terjadi di browser menggunakan <code>window.onerror</code>.


## Melacak pengecualian

Bila terjadi suatu kesalahan, buka konsol DevTools (`Ctrl+Shift+J` / `Cmd+Option+J`) untuk menampilkan pesan kesalahan JavaScript.
Setiap pesan memiliki tautan ke nama file dengan nomor baris yang bisa Anda masuki.

Contoh pengecualian:
![Contoh pengecualian](images/track-exceptions-tracking-exceptions.jpg)

### Menampilkan pelacakan tumpukan pengecualian

Jalur eksekusi mana yang menyebabkan kesalahan tidaklah selalu jelas.
Lengkapi tumpukan panggilan JavaScript yang menyertai pengecualian di konsol.
Luaskan pesan konsol ini untuk melihat bingkai tumpukan dan menuju lokasinya dalam kode:

![Pelacakan tumpukan pengecualian](images/track-exceptions-exception-stack-trace.jpg)

### Berhenti sebentar di pengecualian JavaScript

Saat berikutnya pengecualian dilontarkan,
hentikan sebentar eksekusi JavaScript dan periksa tumpukan panggilan,
variabel scope, dan status aplikasi Anda.
Sebuah tombol perhentian tiga-status di bagian bawah panel Scripts memungkinkan Anda beralih di antara berbagai macam mode penanganan pengecualian: ![Tombol berhenti sebentar](images/track-exceptions-pause-gray.png){:.inline}

Pilih untuk menghentikan sementara semua pengecualian atau hanya pada pengecualian yang tak tertangkap, atau Anda bisa mengabaikan pengecualian sama sekali.

![Menghentikan eksekusi sementara](images/track-exceptions-pause-execution.jpg)

## Mencetak pelacakan tumpukan

Pahami lebih baik perilaku laman web Anda
dengan mencetak pesan log ke konsol.
Buatlah entri log jadi lebih informatif dengan menyertakan pelacakan tumpukan yang berkaitan. Ada beberapa cara untuk melakukannya:

### Error.stack
Setiap objek Error memiliki properti string yang disebut tumpukan (stack) dan berisi pelacakan tumpukan:

![Contoh Error.stack](images/track-exceptions-error-stack.jpg)

### console.trace()

Melengkapi kode Anda dengan panggilan [`console.trace()`](./console-reference#consoletraceobject) yang mencetak tumpukan panggilan JavaScript saat ini:

![Contoh console.trace()](images/track-exceptions-console-trace.jpg)

### console.assert()

Masukkan pernyataan dalam kode JavaScript dengan memanggil [`console.assert()`](./console-reference#consoleassertexpression-object)
bersama syarat kesalahan sebagai parameter pertama.
Bila hasil evaluasi ekspresi ini adalah false,
Anda akan melihat rekaman konsolnya:

![contoh console.assert()](images/track-exceptions-console-assert.jpg)

## Cara memeriksa pelacakan tumpukan untuk menemukan pemicu

Mari kita lihat cara menggunakan berbagai alat yang baru saja Anda pelajari,
dan temukan penyebab sesungguhnya dari kesalahan.
Inilah laman HTML sederhana yang berisi dua skrip:

![Kode contoh](images/track-exceptions-example-code.png)

Bila pengguna mengeklik di laman,
paragraf akan mengubah teks di dalamnya,
dan fungsi `callLibMethod()` yang disediakan oleh `lib.js` akan dipanggil.

Fungsi ini akan mencetak `console.log`,
kemudian memanggil `console.slog`,
yakni metode yang tidak disediakan oleh Console API.
Ini akan memicu suatu kesalahan.

Bila laman dijalankan dan mengekliknya,
kesalahan ini akan terpicu:

![Kesalahan yang dipicu](images/track-exceptions-example-error-triggered.png)

Klik panah untuk meluaskan pesan kesalahan:

![Pesan kesalahan diluaskan](images/track-exceptions-example-error-message-expanded.png)

Console memberi tahu Anda kesalahan telah dipicu di `lib.js`, baris 4,
yang dipanggil oleh `script.js` dalam callback `addEventListener`,
sebuah fungsi anonim, di baris 3.

Ini adalah contoh yang sangat sederhana,
namun men-debug jejak log paling rumit sekali pun mengikuti proses yang sama.

## Tangani pengecualian waktu proses dengan window.onerror

Chrome akan mengekspos fungsi penangan `window.onerror`,
yang dipanggil bila terjadi kesalahan dalam eksekusi kode JavaScript.
Bila dilontarkan pengecualian JavaScript dalam konteks jendela dan
tidak ditangkap oleh blok try/catch,
fungsi akan dipanggil bersama pesan pengecualian,
URL file yang melontarkan pengecualian,
dan nomor baris di file itu,
yang diteruskan berupa tiga argumen dalam urutan itu.

Ini akan berguna saat Anda menyetel penangan kesalahan yang akan mengumpulkan informasi tentang pengecualian tak tertangkap dan melaporkannya kembali ke server Anda menggunakan panggilan AJAX POST, misalnya. Dengan cara ini, Anda bisa mencatat log semua kesalahan yang terjadi dalam browser pengguna, dan agar diberi tahu tentang hal itu.

Contoh penggunaan `window.onerror`:

![Contoh penangan window.onerror](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
