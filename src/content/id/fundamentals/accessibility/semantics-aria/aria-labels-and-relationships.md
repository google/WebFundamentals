project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Menggunakan label ARIA untuk membuat keterangan elemen yang bisa diakses


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Hubungan dan Label ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## Label

ARIA menyediakan sejumlah mekanisme untuk menambahkan label dan keterangan ke elemen.
Sebenarnya, ARIA adalah satu-satunya cara untuk menambahkan bantuan atau teks keterangan yang bisa diakses. Mari kita
amati berbagai properti yang digunakan ARIA untuk membuat label yang bisa diakses.

### aria-label

`aria-label` memungkinkan kita untuk menetapkan string yang akan digunakan sebagai label yang bisa diakses.
Ini akan menggantikan mekanisme pelabelan asli lainnya, seperti elemen `label`
&mdash; misalnya, jika `button` memiliki materi teks dan sebuah `aria-label`,
maka hanya nilai `aria-label` yang akan digunakan.

Anda dapat menggunakan atribut `aria-label` bila memiliki semacam indikasi visual
kegunaan elemen, misalnya tombol yang menggunakan grafik sebagai ganti
teks, namun tetap perlu mengklarifikasi kegunaan itu untuk siapa saja yang tidak bisa mengakses
indikasi visual, misalnya tombol yang hanya menggunakan gambar untuk menunjukkan
kegunaannya.

![menggunakan aria-label untuk mengidentifikasi tombol image only](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby` memungkinkan kita menetapkan ID elemen lain dalam DOM sebagai
label elemen.

![menggunakan aria-labelledby untuk mengidentifikasi grup radio](imgs/aria-labelledby.jpg)

Ini mirip sekali dengan penggunaan elemen `label`, dengan beberapa perbedaan penting.

 1. `aria-labelledby` dapat digunakan pada sembarang elemen, tidak cuma elemen yang bisa diberi label.
 1. Walaupun elemen `label` merujuk pada sesuatu yang dilabelinya, hubungannya
    terbalik untuk `aria-labelledby` &mdash; sesuatu yang
    diberi label merujuk pada sesuatu yang melabelinya.
 1. Hanya satu elemen label yang dapat dikaitkan dengan elemen yang bisa diberi label, namun
    `aria-labelledby` bisa menggunakan daftar IDREF untuk membuat label dari beberapa
    elemen sekaligus. Label akan digabung sesuai urutan IDREF
    yang diberikan.
 1. Anda bisa menggunakan `aria-labelledby` untuk merujuk elemen yang disembunyikan dan
    bila tidak demikian tidak akan ada dalam pohon aksesibilitas. Misalnya, Anda bisa menambahkan
    `span` tersembunyi di sebelah elemen yang ingin Anda beri label, dan merujuknya dengan
    `aria-labelledby`.
 1. Akan tetapi, karena ARIA hanya memengaruhi pohon aksesibilitas, `aria-labelledby`
    tidak memberi Anda perilaku pengeklikan label yang familier yang Anda dapat dari penggunaan elemen
    `label`.

Yang penting, `aria-labelledby` menggantikan **semua** sumber nama lainnya untuk
elemen. Jadi, misalnya, jika sebuah elemen memiliki `aria-labelledby` dan
`aria-label`, atau sebuah `aria-labelledby` dan `label` HTML asli, label
`aria-labelledby` akan selalu didahulukan.

## Hubungan

`aria-labelledby` adalah contoh sebuah *atribut hubungan*. Atribut hubungan
membuat hubungan semantik antar elemen pada laman
apa pun hubungan DOM-nya. Untuk `aria-labelledby`, hubungan
itu adalah "elemen ini diberi label oleh elemen itu".

Spesifikasi ARIA mencantumkan [delapan atribut
hubungan](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }.
Enam di antaranya, `aria-activedescendant`, `aria-controls`, `aria-describedby`,
`aria-labelledby`, dan `aria-owns`, mengambil referensi ke satu atau beberapa elemen
untuk membuat tautan baru antar elemen pada laman. Perbedaan di setiap kasus adalah
apa arti tautan itu dan bagaimana menyajikannya kepada pengguna.

### aria-owns

`aria-owns` adalah salah satu hubungan ARIA yang paling banyak digunakan. Atribut ini
memungkinkan kita memberi tahu teknologi pendukung bahwa elemen yang terpisah di
DOM harus diperlakukan sebagai anak dari elemen saat ini, atau untuk menyusun ulang
elemen anak yang ada ke dalam urutan yang berbeda. Misalnya, jika sebuah
sub-menu munculan secara visual diposisikan di dekat menu induknya, namun tidak bisa berupa anak DOM
dari induknya karena akan memengaruhi presentasi visual, Anda bisa menggunakan
`aria-owns` untuk menyajikan sub-menu tersebut sebagai anak dari
menu induk ke pembaca layar.

![menggunakan aria-owns untuk membangun hubungan antara menu dan submenu](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant` memainkan peranan terkait. Mirip dengan elemen aktif pada
laman yang merupakan elemen berfokus, menyetel turunan aktif elemen
memungkinkan kita untuk memberi tahu teknologi pendukung bahwa suatu elemen harus disajikan kepada
pengguna sebagai elemen berfokus bila induknya memiliki fokus. Misalnya,
dalam listbox, Anda mungkin ingin membiarkan fokus laman pada kontainer listbox,
namun tetap memperbarui atribut `aria-activedescendant`-nya ke
item daftar yang dipilih saat ini. Hal ini membuat item yang dipilih saat ini tampak oleh
teknologi pendukung seakan item yang difokus.

![menggunakan aria-activedescendant untuk membangun hubungan dalam satu kotak daftar](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby` menyediakan keterangan yang bisa diakses dengan cara yang sama dengan label yang disediakan oleh
`aria-labelledby`. Seperti halnya `aria-labelledby`, `aria-describedby`
dapat mereferensikan elemen yang dalam keadaan lain tidak akan terlihat, baik yang disembunyikan dari
DOM, atau yang disembunyikan dari pengguna teknologi pendukung. Ini merupakan teknik berguna bila ada
beberapa teks penjelasan tambahan yang mungkin dibutuhkan pengguna, baik yang hanya berlaku
pada pengguna teknologi pendukung atau pun semua pengguna.

Contoh umum adalah bidang masukan sandi dengan sejumlah
teks deskriptif yang menjelaskan persyaratan sandi minimum. Tidak seperti label,
keterangan ini mungkin atau mungkin tidak akan pernah disajikan kepada pengguna; mereka mungkin memiliki
pilihan apakah akan mengaksesnya, atau keterangan tersebut mungkin ditampilkan setelah semua informasi lainnya,
atau mungkin lebih dahulu ditempati oleh sesuatu yang lain. Misalnya, jika pengguna memasukkan
informasi, masukan mereka akan dipantulkan kembali dan mungkin akan menginterupsi
keterangan elemen. Sehingga, keterangan adalah cara yang bagus untuk mengomunikasikan informasi pelengkap,
namun tidak esensial; ia tidak akan menghalangi informasi yang lebih penting
seperti peran elemen.

![menggunakan aria-describedby untuk membangun hubungan dengan bidang sandi](imgs/aria-describedby.jpg)

### aria-posinset & aria-setsize

Atribut hubungan selebihnya sedikit berbeda, dan bekerja bersama-sama.
`aria-posinset` ("position in set") dan `aria-setsize` ("size of set") adalah tentang
mendefinisikan hubungan antar elemen seinduk dalam suatu rangkaian, misalnya sebuah daftar.

Bila ukuran suatu rangkaian tidak bisa ditentukan melalui elemen yang ada dalam DOM
&mdash; misalnya bila menggunakan lazy-rendering agar tidak semua daftar besar
ada dalam DOM sekaligus &mdash; `aria-setsize` bisa menetapkan ukuran rangkaian sesungguhnya, dan
`aria-posinset` bisa menetapkan posisi elemen dalam rangkaian tersebut. Misalnya dalam
rangkaian yang bisa berisi 1000 elemen, anggaplah sebuah elemen tertentu
memiliki `aria-posinset` sebesar 857 walaupun muncul lebih dahulu dalam DOM, kemudian
menggunakan teknik HTML dinamis untuk memastikan pengguna bisa menyusuri daftar lengkap
sesuai kebutuhan.

![menggunakan aria-posinset dan aria-setsize untuk membangun hubungan dalam satu daftar](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
