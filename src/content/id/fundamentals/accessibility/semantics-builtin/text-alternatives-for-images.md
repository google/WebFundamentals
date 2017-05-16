project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Menggunakan atribut alt dalam menyediakan alternatif berupa teks untuk gambar


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Alternatif Berupa Teks untuk Gambar {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Gambar adalah komponen penting pada sebagian besar laman web, dan tentu saja
menjadi titik-lekat khusus bagi pengguna yang lemah penglihatannya. Kita harus mempertimbangkan peran yang
dimainkan gambar di laman untuk merencanakan tipe alternatif berupa teks yang harus digunakan.
Perhatikan gambar ini.

    <article>
      <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
      <img src="imgs/160204193356-01-cat-500.jpg">
    </article>

<article>
  <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
  <img src="imgs/160204193356-01-cat-500.jpg">
</article>

Di laman, kita memiliki gambar seekor kucing, yang mengilustrasikan
perilaku kecenderungan menilai yang sudah dikenali pada kucing. Pembaca layar akan membacakan gambar ini dengan menggunakan
nama literalnya, `"/160204193356-01-cat-500.jpg"`. Itu memang akurat, namun tidak berguna
sama sekali.

Anda bisa menggunakan atribut `alt` untuk menyediakan alternatif berupa teks yang berguna bagi
gambar &mdash; misalnya, "A cat staring menacingly off into space."

    <img src="/160204193356-01-cat-500.jpg" alt="A cat staring menacingly off into space">

Kemudian pembaca layar bisa membacakan keterangan singkat mengenai gambar tersebut (
terlihat di bilah hitam VoiceOver) dan pengguna bisa memilih apakah akan berpindah
ke artikel tersebut.

![Gambar dengan teks alternatif yang diperbaiki](imgs/funioncat2.png)

Sepasang komentar tentang `alt`:

 - `alt` memungkinkan Anda menetapkan string sederhana untuk digunakan bila
   gambar tidak tersedia, misalnya bila gambar gagal dimuat, atau diakses melalui
   bot perayapan web, atau kebetulan ditemukan oleh pembaca layar.
 - `alt` berbeda dengan `title`, atau tipe teks, yang *hanya* akan digunakan
   jika gambar tidak tersedia.

Menulis teks alternatif yang berguna ada seninya. Agar string bisa digunakan,
alternatif berupa teks perlu menyampaikan konsep yang sama dengan gambarnya, dalam konteks
yang sama.

Perhatikan gambar logo yang ditautkan di masthead laman seperti yang ditampilkan di atas.
Kita bisa menjelaskan gambar tersebut dengan sangat akurat sebagai "logo The Funion".

    <img class="logo" src="logo.jpg" alt="Logo The Funion">

Mungkin kita tergoda untuk memberikan alternatif berupa teks yang lebih sederhana berupa "beranda" atau "laman
utama", namun itu tidak menguntungkan bagi pengguna yang penglihatannya lemah maupun tajam.

Namun bayangkan seorang pengguna pembaca layar yang ingin mencari logo masthead di
laman; memberinya nilai alt berupa "beranda" sesungguhnya malah akan
menambah bingung. Pengguna yang berpenglihatan tajam pun akan menghadapi kendala yang sama &mdash; yang mengetahui
logo situs dengan mengekliknya &mdash; seperti halnya pengguna pembaca layar.

Di lain pihak, menjelaskan gambar tidak selalu berguna. Misalnya,
perhatikan gambar kaca pembesar di dalam tombol telusur yang berisi teks
"Telusur". Jika teks itu tidak ada, Anda pasti akan memberi gambar itu nilai
alternatif berupa "telusur". Namun karena kita memiliki teks yang terlihat, pembaca layar akan
mengambil dan membacakan kata "telusur"; sehingga, nilai `alt` yang identik pada
gambar menjadi berlebihan.

Akan tetapi, kita tahu bahwa jika membiarkan teks `alt`, mungkin kita akan mendengar
nama file gambar sebagai gantinya, yang tidak ada gunanya dan mungkin akan membingungkan. Dalam hal ini,
Anda bisa menggunakan atribut `alt` kosong saja, dan pembaca layar akan
melewati gambar sama sekali.

    <img src="magnifying-glass.jpg" alt="">

Singkatnya, semua gambar harus memiliki atribut `alt`, namun tidak semuanya
harus memiliki teks. Gambar penting harus memiliki teks alternatif penjelas yang menjelaskan
secara singkat mengenai gambar itu, sedangkan gambar dekoratif harus memiliki atribut alt
yang kosong &mdash; yakni, `alt=""`.


{# wf_devsite_translation #}
