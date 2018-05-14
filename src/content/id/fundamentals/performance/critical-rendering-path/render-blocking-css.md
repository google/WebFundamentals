project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Secara default, CSS diperlakukan sebagai sumber daya pemblokiran render. Pelajari cara mencegahnya agar tidak memblokir rendering.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# CSS Pemblokiran Render {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Secara default, CSS diperlakukan sebagai sumber daya pemblokiran render,
artinya browser tidak akan merender materi yang telah diproses hingga CSSOM
dibuat. Pastikan CSS Anda tetap rapi, kirim secepatnya
dan gunakan tipe dan kueri media untuk membuka blokir rendering.

Dalam [konstruksi pohon render](render-tree-construction) kita melihat bahwa jalur rendering penting membutuhkan baik DOM maupun CSSOM untuk membuat pohon render. Ini menimbulkan implikasi kinerja penting: **baik HTML maupun CSS merupakan sumber daya pemblokiran render.** Untuk HTML, sudah kentara karena tanpa DOM kita tidak memiliki apa pun untuk di-render, namun persyaratan CSS mungkin tidak begitu kentara. Apa yang terjadi jika kita mencoba merender laman biasa tanpa pemblokir rendering pada CSS?

### TL;DR {: .hide-from-toc }
- Secara default, CSS diperlakukan sebagai sumber daya pemblokiran render.
- Tipe media dan kueri media memungkinkan kita menandai sebagian sumber daya CSS sebagai bukan pemblokiran render.
- Browser mengunduh semua sumber daya CSS, terlepas dari perilaku pemblokiran atau bukan pemblokiran.


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="NYTimes dengan CSS">
    <figcaption>The New York Times dengan CSS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes tanpa CSS">
    <figcaption>The New York Times tanpa CSS (FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Contoh di atas, yang menampilkan situs web NYTimes dengan dan tanpa CSS, memperagakan mengapa rendering diblokir hingga CSS tersedia---tanpa CSS, laman relatif tidak bisa digunakan. Pengalaman di sebelah kanan sering kali disebut sebagai "Flash of Unstyled Content" (FOUC). Browser memblokir rendering hingga browser memiliki baik DOM maupun CSSOM.

> **_CSS adalah sumber daya pemblokiran render. Hubungkan ke klien secepatnya untuk mengoptimalkan waktu render pertama._**

Akan tetapi, bagaimana jika kita memiliki sebagian gaya CSS yang hanya digunakan pada kondisi tertentu, misalnya, bila laman dicetak, atau diproyeksikan ke monitor besar? Lebih baik kita tidak memblokir rendering pada sumber daya ini.

"Tipe media" dan "kueri media" CSS memungkinkan kita menangani kasus penggunaan ini:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[Kueri media](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness) terdiri dari tipe media dan nol atau lebih banyak ekspresi yang memeriksa kondisi fitur media tertentu. Misalnya, deklarasi stylesheet pertama kita tidak menyediakan tipe atau kueri media, sehingga hal itu berlaku dalam semua kasus; berarti selalu memblokir render. Di lain pihak, deklarasi stylesheet kedua hanya berlaku bila materi sedang dicetak---mungkin Anda ingin menata ulang layout, mengubah font dan seterusnya, sehingga deklarasi stylesheet ini tidak perlu memblokir rendering laman saat dimuat pertama kali. Pada akhirnya, deklarasi stylesheet terakhir menyediakan "kueri media", yang dieksekusi oleh browser: jika ketentuannya cocok, browser akan memblokir rendering hingga stylesheet diunduh dan diproses.

Dengan menggunakan kueri media, kita bisa menyesuaikan presentasi dengan kasus penggunaan tertentu seperti tampilan versus cetak, juga dengan kondisi dinamis seperti perubahan orientasi layar, kejadian pengubahan ukuran, dan lainnya. **Saat mendeklarasikan aset stylesheet Anda, perhatikan baik-baik tipe dan kueri media; keduanya sangat memengaruhi kinerja jalur rendering penting.**

Marilah kita mempertimbangkan beberapa contoh langsung:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* Deklarasi pertama adalah pemblokir render dan cocok di semua kondisi.
* Deklarasi kedua juga merupakan pemblokiran render: "all" merupakan tipe default sehingga jika Anda tidak menetapkan tipe apa pun, maka secara implisit akan disetel ke "all". Karena itu, deklarasi pertama dan kedua sebenarnya sama.
* Deklarasi ketiga memiliki kueri media dinamis yang dievaluasi bila laman telah dimuat. Bergantung pada orientasi perangkat saat laman dimuat, portrait.css mungkin atau mungkin bukan pemblokiran render.
* Deklarasi terakhir hanya berlaku bila laman sedang dicetak, sehingga bukan pemblokiran render saat laman dimuat pertama kali dimuat di browser.

Terakhir, perhatikan bahwa "pemblokiran render" hanya merujuk pada apakah browser harus menahan rendering awal untuk laman pada sumber daya itu. Dalam kasus mana pun, browser tetap mengunduh aset CSS, meski dengan prioritas lebih rendah untuk sumber daya yang bukan pemblokiran.

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>Berikutnya: Menambahkan Interaktivitas dengan JavaScript</button>
</a>


{# wf_devsite_translation #}
