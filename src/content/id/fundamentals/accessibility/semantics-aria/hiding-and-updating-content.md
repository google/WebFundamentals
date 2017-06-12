project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Menyembunyikan materi dari teknologi pendukung


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Menyembunyikan dan Memperbarui Materi {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

Teknik penting lainnya dalam penyempurnaan pengalaman untuk pengguna
teknologi pendukung antara lain memastikan bahwa hanya bagian laman yang relevan yang
diekspos ke teknologi pendukung. Ada sejumlah cara untuk memastikan bagian
DOM tidak diekspos ke API aksesibilitas.

Pertama, apa saja yang secara eksplisit disembunyikan dari DOM juga tidak akan disertakan
di pohon aksesibilitas. Sehingga apa saja yang memiliki gaya CSS dengan atribut `visibility:hidden` atau `display: none` atau menggunakan `hidden` HTML5 juga akan disembunyikan dari pengguna teknologi pendukung.



Akan tetapi, elemen yang secara visual tidak dirender namun tidak secara eksplisit disembunyikan
akan tetap disertakan dalam pohon aksesibilitas. Salah satu teknik umum adalah menyertakan
"teks khusus pembaca layar" dalam elemen yang diposisikan di luar layar secara mutlak.


    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    

Selain itu, seperti yang telah kita lihat, bisa saja menyediakan teks khusus pembaca layar lewat atribut
`aria-label`, `aria-labelledby`, atau `aria-describedby` yang mereferensikan
elemen yang dalam keadaan lain disembunyikan.

Lihat artikel WebAIM ini di [Teknik untuk menyembunyikan
teks](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external }
untuk informasi selengkapnya mengenai pembuatan teks "khusus pembaca layar".

Terakhir, ARIA menyediakan mekanisme untuk mengecualikan materi dari
teknologi pendukung tidak secara visual disembunyikan, dengan menggunakan atribut `aria-hidden`.
Menerapkan atribut ini ke elemen secara efektif akan membuangnya *dan semua
turunannya* dari pohon aksesibilitas. Pengecualian satu-satunya adalah elemen
yang dirujuk melalui atribut `aria-labelledby` atau `aria-describedby`.

    <div class="deck">
      <div class="slide" aria-hidden="true">
        Sales Targets
      </div>
      <div class="slide">
        Quarterly Sales
      </div>
      <div class="slide" aria-hidden="true">
        Action Items
      </div>
    </div>

Misalnya, Anda dapat menggunakan `aria-hidden` jika membuat beberapa UI modal yang
memblokir akses ke laman utama. Dalam hal ini, pengguna yang berpenglihatan normal
mungkin akan melihat semacam overlay semi-transparan yang menunjukkan
bahwa sebagian besar laman saat ini tidak bisa digunakan, namun pengguna
pembaca layar mungkin tetap bisa menjelajahi bagian lain di laman tersebut. Dalam hal ini, seperti halnya membuat jebakan keyboard [telah dijelaskan
sebelumnya](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps),
Anda perlu memastikan bahwa bagian-bagian laman yang saat ini berada di luar cakupan
berupa `aria-hidden` juga.

Karena kini Anda telah memahami dasar-dasar ARIA, cara memainkannya dengan
semantik HTML asli, dan cara menggunakannya untuk melakukan pembedahan yang
cukup besar pada pohon aksesibilitas serta pengubahan semantik elemen tunggal, mari kita
amati cara menggunakannya untuk menyampaikan informasi yang sensitif terhadap waktu.

## aria-live

`aria-live` memungkinkan developer menandai bagian laman sebagai "live" dalam artian bahwa
pembaruan harus segera dikomunikasikan dengan pengguna, tanpa memperhatikan
posisi laman, daripada cuma terjadi saat menjelajahi bagian laman tersebut. Bila
elemen memiliki atribut `aria-live`, bagian laman yang berisi elemen tersebut dan
turunannya disebut *live region*.

![Pembaruan ARIA menetapkan region yang selalu diperbarui](imgs/aria-live.jpg)

Misalnya, live region dapat berupa pesan status yang muncul sebagai hasil
aksi pengguna. Jika pesan tersebut cukup penting untuk menarik perhatian pengguna
yang berpenglihatan normal, berarti cukup penting untuk mengarahkan perhatian pengguna
teknologi pendukung ke pesan tersebut dengan menyetel atribut `aria-live`-nya. Bandingkan `div` biasa ini


    <div class="status">Your message has been sent.</div>
    

dengan pasangan "live"-nya.


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` memiliki tiga nilai yang diperbolehkan: `polite`, `assertive`, dan `off`.

 - `aria-live="polite"` memberi tahu teknologi pendukung untuk memperingatkan pengguna pada
   perubahan ini bila telah menyelesaikan pekerjaan apa pun yang saat ini dilakukannya. Cocok sekali menggunakannya
   jika ada sesuatu yang penting namun tidak mendesak, dan inilah alasan untuk mayoritas penggunaan
   `aria-live`.
 - `aria-live="assertive"` memberi tahu teknologi pendukung untuk menginterupsi
   apa pun yang sedang dilakukannya dan segera memperingatkan pengguna mengenai perubahan ini. Ini hanya untuk
   pemberitahuan penting dan mendesak, misalnya pesan status seperti "Ada kesalahan
   server dan perubahan Anda tidak disimpan; segarkan laman", atau
   pemberitahuan untuk bidang masukan sebagai akibat langsung dari aksi pengguna, misalnya
   tombol-tombol di stepper-widget.
 - `aria-live="off"` memberi tahu teknologi pendukung untuk menangguhkan sementara interupsi
   `aria-live`.

Ada beberapa trik untuk memastikan live-region Anda bekerja dengan benar.

Pertama, region `aria-live` Anda harus telah disetel dalam pemuatan laman pertama.
Ini bukan aturan mutlak, melainkan jika Anda mengalami kesulitan dengan region
`aria-live`, maka hal ini bisa menjadi masalah.

Kedua, pembaca layar yang berbeda akan bereaksi berbeda terhadap tipe
perubahan yang berbeda. Misalnya, bisa saja memicu peringatan pada beberapa pembaca layar
dengan mengubah gaya `hidden` elemen turunan dari true ke false.

Atribut lain yang bisa digunakan bersama `aria-live` akan membantu Anda menyempurnakan apa
yang dikomunikasikan kepada pengguna bila live-region berubah.

`aria-atomic` menunjukkan apakah keseluruhan region harus dianggap sebagai
satu kesatuan saat mengomunikasikan pembaruan. Misalnya, jika widget tanggal yang terdiri dari
hari, bulan, dan tahun memiliki `aria-live=true` dan `aria-atomic=true`, dan pengguna
menggunakan kontrol stepper untuk mengubah nilai bulan saja, maka isi lengkap
dari widget tanggal akan dibaca lagi. Nilai `aria-atomic` mungkin menjadi `true`
atau `false` (default-nya).

`aria-relevant` menunjukkan tipe perubahan yang harus disajikan kepada pengguna.
Ada beberapa opsi yang dapat digunakan secara terpisah atau sebagai daftar token.

 - *additions*, berarti elemen yang telah ditambahkan ke live-region adalah
   signifikan. Misalnya, penambahan bentang atau span ke log pesan status
   yang ada menunjukkan bahwa bentang itu akan diumumkan kepada pengguna (dengan anggapan
   `aria-atomic` adalah `false`).
 - *text*, berarti isi teks yang akan ditambahkan ke simpul turunan
   adalah relevan. Misalnya, memodifikasi properti `textContent` bidang teks khusus
   akan membacakan teks yang dimodifikasi kepada pengguna.
 - *removals*, berarti pembuangan suatu teks atau simpul turunan
   akan disampaikan kepada pengguna.
 - *all*, berarti semua perubahan adalah relevan. Akan tetapi, nilai default
   `aria-relevant` adalah `additions text`, yang berarti jika Anda tidak menetapkan
   `aria-relevant`, ia akan memberi tahu pengguna mengenai penambahan ke elemen,
   yang kemungkinan besar merupakan hal yang memang Anda inginkan.

Terakhir, `aria-busy` memungkinkan Anda memberi tahu teknologi pendukung agar
untuk sementara mengabaikan perubahan pada elemen, misalnya bila ada sesuatu yang sedang dimuat. Setelah
semua berada pada tempatnya, `aria-busy` harus disetel ke false untuk menormalkan
operasi pembaca.
 


{# wf_devsite_translation #}
