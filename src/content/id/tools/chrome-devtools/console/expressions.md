project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mempelajari status item di laman dari konsol DevTools.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Mengevaluasi Ekspresi {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
Mempelajari status item di laman dari konsol DevTools dengan menggunakan kemampuan evaluasinya.

Pada konsol DevTools, Anda dapat mengetahui status item
di laman dengan cara khusus.
Anda dapat mengevaluasi ekspresi apa saja dengan memadukan
pengetahuan tentang JavaScript dan sejumlah fitur yang didukungnya.


### TL;DR {: .hide-from-toc }
- Mengevaluasi suatu ekspresi cukup dengan mengetikkannya.
- Memilih elemen menggunakan pintasan.
- Memeriksa elemen DOM dan objek heap JavaScript menggunakan <code>inspect()</code>.
- Mengakses elemen dan objek yang baru saja dipilih dengan menggunakan $0 - 4.


## Menelusuri ekspresi

Konsol mengevaluasi setiap ekspresi JavaScript yang diberikan
saat menekan <kbd class="kbd">Enter</kbd>.
Saat Anda mengetikkan suatu ekspresi,
saran nama properti akan muncul;
konsol juga menyediakan pelengkapan otomatis dan pelengkapan tab.

Jika ada beberapa saran,
gunakan <kbd class="kbd">↑</kbd> dan <kbd class="kbd">↓</kbd> untuk menelusurinya. Tekan <kbd class="kbd">→</kbd> untuk memilih saran yang sedang disorot.
Jika hanya ada satu saran,
tekan <kbd class="kbd">Tab</kbd> untuk memilihnya.

![Ekspresi sederhana di konsol.](images/evaluate-expressions.png)

## Memilih elemen

Gunakan pintasan berikut untuk memilih elemen:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Pintasan &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">Mengembalikan elemen pertama yang cocok dengan pemilih CSS yang ditetapkan. Pintasan untuk <code>document.querySelector()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">Mengembalikan larik semua elemen yang cocok dengan pemilih CSS yang ditetapkan. Alias untuk <code>document.querySelectorAll()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">Mengembalikan larik elemen yang cocok dengan XPath yang ditetapkan.</td>
    </tr>
  </tbody>
</table>

Contoh pemilihan target:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## Memeriksa elemen DOM dan objek heap JavaScript

Fungsi `inspect()` menggunakan elemen DOM atau referensi JavaScript
sebagai parameter.
Jika Anda memberikan elemen DOM,
DevTools akan pindah ke panel Elements dan menampilkan elemen itu.
Jika Anda memberikan JavaScript,
DevTools akan pindah ke panel Profile.

Bila kode ini dieksekusi di konsol pada laman ini,
DevTools akan mengambil nilai ini dan menampilkannya pada panel Elements.
DevTools memanfaatkan properti `$_`
untuk mendapatkan keluaran ekspresi yang terakhir dievaluasi.

    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## Mengakses elemen dan objek yang baru saja dipilih

Konsol menyimpan lima elemen dan objek yang terakhir digunakan
dalam variabel agar mudah diakses.
Gunakan $0 - 4,
untuk mengakses elemen-elemen ini dari dalam konsol.
Ingat, komputer mulai menghitung dari 0;
ini berarti item terakhir adalah $0 dan item paling lama adalah $4.


{# wf_devsite_translation #}
