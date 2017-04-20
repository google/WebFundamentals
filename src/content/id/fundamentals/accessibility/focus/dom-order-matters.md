project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pentingnya urutan DOM default


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Pentingnya Urutan DOM {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Menggunakan elemen asli merupakan cara bagus untuk mempelajari tentang perilaku fokus
karena elemen asli secara otomatis disisipkan ke dalam urutan tab berdasarkan
posisinya di DOM.

Misalnya, Anda mungkin memiliki tiga elemen tombol yang berurutan dalam
DOM. Menekan `Tab` akan memfokus setiap tombol secara berurutan. Cobalah mengeklik blok kode
di bawah ini untuk memindah titik mulai navigasi fokus, kemudian tekan `Tab` untuk memindah fokus
melewati tombol-tombol.

    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

Akan tetapi, penting untuk diingat bahwa, dengan menggunakan CSS, dimungkinkan menempatkan sesuatu
dalam satu urutan di DOM namun muncul dalam urutan berbeda di layar. Misalnya,
jika Anda menggunakan properti CSS seperti `float` untuk memindah satu tombol ke kanan,
tombol-tombol itu akan muncul dalam urutan berbeda di layar. Namun, karena urutannya dalam
DOM tetap sama, maka begitu pula urutan tabnya. Bila pengguna berpindah tab
di laman, tombol akan mendapat fokus dalam urutan yang tidak intuitif. Cobalah mengeklik blok kode
di bawah ini untuk memindah titik mulai navigasi fokus, kemudian tekan `Tab` untuk
memindah fokus melewati tombol-tombol.

    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

Berhati-hatilah saat mengubah posisi visual elemen di layar dengan menggunakan CSS.
Hal ini bisa menyebabkan urutan tab melompat-lompat, seolah acak, sehingga membingungkan
pengguna yang mengandalkan keyboard. Karena alasan ini, daftar periksa Web AIM menyatakan
[di bagian 1.3.2](http://webaim.org/standards/wcag/checklist#sc1.3.2){: .external }
bahwa urutan navigasi dan pembacaan, seperti yang ditentukan oleh urutan kode, harus
logis dan intuitif.

Sebagai aturan, cobalah berpindah-pindah tab melewati berbagai laman sesering mungkin sekadar untuk memastikan Anda
bukan secara tidak sengaja mengacaukan urutan tab. Ini adalah kebiasaan yang baik untuk diterapkan, dan
hal ini tidak memerlukan banyak usaha.

## Materi tak terlihat
Bagaimana jika Anda memiliki materi yang saat ini tidak ditampilkan, namun tetap perlu ada
di DOM, misalnya navigasi samping yang responsif? Bila Anda memiliki elemen seperti ini yang
menerima fokus bila sedang tidak tampak di layar, elemen ini bisa terlihat seakan fokusnya
menghilang dan muncul kembali saat pengguna berpindah tab di laman &mdash; ini jelas
sebuah efek yang tidak diinginkan. Idealnya, kita harus mencegah agar panel tidak mendapat fokus
bila sedang di luar layar, dan hanya bisa difokus bila pengguna bisa
berinteraksi dengannya.

![panel slide-in di luar layar bisa mencuri fokus](imgs/slide-in-panel.png)

Kadang-kadang Anda perlu melakukan semacam pekerjaan detektif untuk mengetahui
ke mana larinya fokus. Anda bisa menggunakan `document.activeElement` dari konsol untuk mengetahui
elemen mana yang saat ini difokus.

Setelah mengetahui elemen di luar layar mana yang sedang difokus, Anda bisa menyetelnya ke
`display: none` atau `visibility: hidden`, kemudian menyetelnya kembali ke `display:
block` atau `visibility: visible` sebelum menampilkannya kepada pengguna.

![panel slide-in disetel ke display none](imgs/slide-in-panel2.png)

![panel slide-in disetel ke display block](imgs/slide-in-panel3.png)

Secara umum, kami mendorong developer untuk berpindah-pindah tab dalam situs mereka sebelum
mempublikasikan untuk mengetahui apakah urutan tab tidak menghilang atau melompat dari urutan
logis. Jika ternyata menghilang atau melompat, pastikan Anda telah menyembunyikan
materi di luar layar dengan benar melalui `display: none` atau `visibility: hidden`, atau apakah
Anda telah menyusun ulang posisi fisik elemen dalam DOM sehingga berada
dalam urutan logis.


{# wf_devsite_translation #}
