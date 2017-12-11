project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Periksa dan hapus cookie dari panel Application.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Memeriksa dan Menghapus Cookie {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Periksa dan hapus cookie dari panel
<strong>Application</strong>.

![panel cookies](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- Tampilkan informasi detail tentang cookie, seperti nama, nilai, domain, ukuran, dan sebagainya.
- Hapus satu cookie, beberapa cookie dari domain yang dipilih, atau semua cookie dari semua domain.


## Ringkasan {:#cookies}

Gunakan panel **Cookies** untuk menampilkan dan menghapus cookie. Anda tidak bisa modifikasi nilai-nilai
cookie.

![panel cookies][cookies]

Cookie dicantumkan menurut domain. Ini termasuk dokumen utama serta bingkai
yang bersarang. Memilih salah satu "kelompok bingkai" ini akan menampilkan semua cookie, untuk
semua sumber daya, untuk semua bingkai di kelompok tersebut. Ada dua akibat
pengelompokan ini yang harus diperhatikan:

* Cookie dari domain yang berbeda bisa muncul di kelompok bingkai yang sama.
* Cookie yang sama mungkin muncul dalam sejumlah grup bingkai.

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## Bidang-bidang {:#fields}

Bidang-bidang berikut disediakan untuk setiap cookie:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Bidang Cookie &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">Nama cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">Nilai cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">Domain cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">Jalur cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">Waktu kedaluwarsa atau usia maksimum cookie. Untuk cookie sesi, bidang ini selalu ditampilkan sebagai "Session".</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">Ukuran cookie dalam byte.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">Jika ada, menunjukkan bahwa cookie harus digunakan melalui HTTP saja dan perubahan JavaScript tidak diizinkan.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Aman</td>
      <td data-th="Description">Jika ada, menunjukkan bahwa komunikasi untuk cookie ini harus melalui transmisi yang dienkripsi.</td>
    </tr>
  </tbody>
</table>

## Menghapus cookie {:#delete}

Ada beberapa cara untuk menghapus cookie:

* Pilih cookie dan tekan tombol **delete**
  (![tombol delete][delete]{:.inline}) untuk menghapus cookie ini saja.
* Tekan tombol **clear** (![tombol clear][cos]{:.inline}) untuk menghapus semua
  cookie untuk kelompok bingkai yang ditetapkan.
* Klik kanan nilai **Domain** cookie dan pilih **Clear all
 dari "..."** (**"..."** adalah nama domain) untuk menghapus semua cookie
 dari domain tersebut.

[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
