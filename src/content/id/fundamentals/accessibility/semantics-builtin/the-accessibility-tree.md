project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengantar Pohon Aksesibilitas


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Pohon Aksesibilitas {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Bayangkan Anda sedang membangun antarmuka pengguna *khusus untuk pengguna pembaca layar*.
Di sini, Anda tidak perlu membuat UI visual sama sekali, melainkan cuma menyediakan
informasi yang cukup untuk digunakan pembaca layar.

Yang akan Anda buat adalah semacam API yang menjelaskan struktur laman, mirip
dengan DOM API, namun Anda bisa menghindar dengan sedikit informasi dan simpul lebih sedikit,
karena banyak dari informasi itu yang hanya berguna bagi presentasi visual. Penampilannya
mungkin seperti ini.

![maket DOM API pembaca layar](imgs/treestructure.jpg)

Pada dasarnya inilah yang sesungguhnya akan disajikan ke pembaca layar. Browser
mengambil pohon DOM dan memodifikasinya menjadi suatu bentuk yang berguna untuk
teknologi pendukung. Kami menyebut pohon yang telah dimodifikasi ini dengan *Pohon
Aksesibilitas*.

Anda mungkin membayangkan pohon aksesibilitas ini seperti mirip dengan laman web tua
dari tahun 90-an: sedikit gambar, banyak tautan, mungkin dengan satu bidang dan tombol.

![laman web gaya 1990-an](imgs/google1998.png)

Dengan memindai laman secara visual seperti ini akan memberi Anda pengalaman yang mirip dengan
apa yang akan didapat oleh pengguna pembaca layar. Antarmuka memang ada, namun sederhana
dan langsung, mirip sekali dengan antarmuka pohon aksesibilitas.

Kebanyakan teknologi pendukung berinteraksi dengan pohon aksesibilitas. Alurnya
berjalan seperti ini.

 1. Sebuah aplikasi (browser atau aplikasi lainnya) mengekspos versi semantik UI-nya
    kepada teknologi pendukung melalui API.
 1. Teknologi pendukung dapat menggunakan informasi yang dibacanya melalui API untuk
    membuat presentasi antarmuka pengguna alternatif bagi pengguna. Misalnya,
    pembaca layar akan membuat sebuah antarmuka yang digunakan pengguna untuk mendengarkan representasi aplikasi
    yang dibacakan.
 1. Teknologi pendukung bisa juga memungkinkan pengguna berinteraksi dengan aplikasi dalam
    cara berbeda. Misalnya, kebanyakan pembaca layar menyediakan kait yang memungkinkan
    pengguna dengan mudah menyimulasikan klik mouse atau ketukan jari.
 1. Teknologi pendukung yang menyampaikan maksud pengguna (misalnya "klik") kembali ke
    aplikasi melalui API aksesibilitas. Selanjutnya aplikasi bertanggung jawab untuk
    menafsirkan aksi sebagaimana mestinya dalam konteks UI asal.

Untuk browser web, ada langkah ekstra di setiap arah, karena browser
sebenarnya adalah platform untuk menjalankan aplikasi web. Jadi browser perlu
menerjemahkan aplikasi web menjadi pohon aksesibilitas, dan harus memastikan bahwa
kejadian yang sesuai akan dipicu di JavaScript berdasarkan tindakan pengguna yang berasal
dari teknologi pendukung.

Namun itu semua adalah tanggung jawab browser. Pekerjaan kita sebagai web developer sekadar
mengetahui bahwa ini terjadi, dan mengembangkan laman web yang memanfaatkan
proses ini untuk membuat suatu pengalaman yang bisa diakses oleh pengguna kita.

Kita melakukannya dengan memastikan bahwa kita mengekspresikan semantik laman dengan benar:
dengan memastikan elemen penting di laman memiliki peran, keadaan, dan properti
yang bisa diakses dengan benar, dan bahwa kita menetapkan nama dan keterangan
yang bisa diakses. Selanjutnya browser bisa memungkinkan teknologi pendukung mengakses
informasi itu untuk membuat pengalaman yang disesuaikan.

## Semantik di HTML asli

Browser bisa mengubah pohon DOM menjadi sebuah pohon aksesibilitas karena
kebanyakan DOM memiliki makna semantik *implisit*. Yakni, DOM menggunakan elemen HTML asli
yang dikenali oleh browser dan berfungsi dengan cara yang bisa diprediksi pada berbagai
platform. Aksesibilitas untuk elemen HTML asli seperti tautan atau tombol
dengan demikian ditangani secara otomatis. Kita bisa memanfaatkan aksesibilitas bawaan itu
dengan menulis HTML yang mengekspresikan semantik elemen laman kita.

Akan tetapi, kadang-kadang kita menggunakan elemen yang tampak seperti elemen asli padahal bukan.
Misalnya, "tombol" bukanlah tombol sama sekali.

{% framebox height="60px" %}
<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>
<div class="fancy-btn">Give me tacos</div>
{% endframebox %}

Ini dapat dibuat di HTML dengan banyak cara; salah satu caranya ditampilkan di bawah ini.


    <div class="button-ish">Give me tacos</div>
    

Bila kita tidak menggunakan elemen tombol sesungguhnya, pembaca layar tidak memiliki cara untuk mengetahui
telah sampai di mana. Selain itu, kita nanti harus melakukan pekerjaan ekstra [berupa penambahan
tabindex](/web/fundamentals/accessibility/focus/using-tabindex) untuk membuatnya
bisa digunakan oleh pengguna keyboard-saja karena, berhubung sekarang telah dibuat kodenya, maka hanya bisa digunakan
dengan mouse.

Kita bisa memperbaikinya secara mudah dengan menggunakan elemen `button` biasa sebagai ganti `div`.
Penggunaan elemen asli juga berguna untuk menjagakan interaksi keyboard
buat kita. Ingatlah bahwa Anda tidak harus kehilangan efek visual
yang menyenangkan hanya lantaran menggunakan elemen asli; Anda bisa menata gaya elemen asli
untuk membuatnya terlihat seperti yang Anda inginkan dan tetap mempertahankan semantik implisit
dan perilakunya.

Sebelumnya kita telah memperhatikan bahwa pembaca layar akan membacakan peran,
nama, keadaan, dan nilai elemen. Dengan menggunakan semantik yang tepat elemen, peran, keadaan, dan nilai
telah tercakup, namun kita juga harus memastikan bahwa kita membuat nama
elemen yang dapat ditemukan.

Secara umum, ada dua tipe nama:

 - *Label yang terlihat*, yang digunakan oleh semua pengguna untuk mengaitkan makna dengan
   elemen, dan
 - *Alternatif berupa teks*, yang hanya digunakan bila tidak memerlukan
   label visual.

Untuk elemen level-teks, kita tidak perlu melakukan apa-apa, karena menurut definisi, elemen
akan berisi beberapa teks. Akan tetapi, untuk elemen masukan atau elemen kontrol, serta materi
visual seperti gambar, kita perlu memastikan bahwa kita menetapkan sebuah nama. Sebenarnya,
menyediakan alternatif berupa teks bagi materi non-teks adalah [item paling
pertama pada daftar periksa WebAIM](http://webaim.org/standards/wcag/checklist#g1.1).

Salah satu cara melakukannya adalah mengikuti saran bahwa "Masukan formulir memiliki
label teks terkait." Ada dua cara untuk mengaitkan label dengan elemen formulir,
misalnya kotak centang. Salah satu dari metode ini menyebabkan teks label juga
menjadi target klik untuk kotak centang, sehingga juga berguna bagi pengguna mouse atau
layar sentuh. Untuk mengaitkan label dengan elemen, bisa dengan

 - Menempatkan elemen masukan di dalam elemen label

<div class="clearfix"></div>

    <label>
      <input type="checkbox">Receive promotional offers?</input>
    </label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receive promotional offers?</input>
    </label>
</div>
{% endframebox %}


atau

 - Mengunakan atribut `for` label dan merujuk `id` elemen

<div class="clearfix"></div>

    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>
</div>
{% endframebox %}
    

Bila kotak centang telah diberi label dengan benar, pembaca layar bisa melaporkan bahwa
elemen memiliki peran kotak centang, dalam keadaan dicentang, dan dinamai "Receive
promotional offers?".

![keluaran teks di layar dari VoiceOver yang menampilkan label yang diucapkan untuk kotak centang](imgs/promo-offers.png)

Berhasil: Sebenarnya Anda bisa menggunakan pembaca layar untuk menemukan label yang
tidak dikaitkan dengan benar dengan berpindah-pindah tab di laman dan memverifikasi peran, keadaan, dan
nama yang dibacakan.




{# wf_devsite_translation #}
