project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan Panel Security untuk memastikan semua sumber daya di situs Anda dilindungi dengan HTTPS.

{# wf_updated_on: 2016-03-09 #}
{# wf_published_on: 2015-12-21 #}

# Memahami masalah keamanan {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

HTTPS menyediakan [keamanan sangat penting dan integritas data][why-https] 
baik untuk situs web Anda maupun orang-orang yang mempercayakan 
informasi pribadi mereka pada situs web Anda. Gunakan Panel Security di Chrome DevTools 
untuk men-debug masalah keamanan dan memastikan bahwa Anda telah mengimplementasikan 
HTTPS dengan benar pada situs web Anda.


### TL;DR {: .hide-from-toc }
- Gunakan Security Overview untuk mengetahui dengan cepat apakah laman saat ini aman atau tidak.
- Periksa masing-masing sumbernya untuk menampilkan koneksi dan detail sertifikat (untuk sumber yang aman) atau untuk mengetahui secara persis permintaan mana yang tak terlindungi (untuk sumber yang tidak aman).


## Ringkasan Keamanan

Untuk menampilkan keamanan keseluruhan dari sebuah laman, buka DevTools dan masuk ke 
Panel Security. 

Hal pertama yang Anda lihat adalah Security Overview. Sekilas, 
Security Overview memberi tahu apakah laman tersebut aman. Laman aman 
ditunjukkan dengan pesan `This page is secure (valid HTTPS).`

![ringkasan keamanan, laman aman](images/overview-secure.png)

Klik **View certificate** untuk menampilkan sertifikat server untuk 
[sumber utama][same-origin-policy]. 

![tampilan sertifikat](images/view-certificate.png)

Laman tidak-aman ditunjukkan dengan pesan `This page is not secure.`

Panel Security membedakan antara dua tipe laman tidak-aman.
Jika laman yang diminta disajikan melalui HTTP, maka sumber utama ditandai sebagai 
tidak aman. 

![ringkasan keamanan, sumber utama tidak aman](images/overview-non-secure.png)

Jika laman yang diminta diambil melalui HTTPS, namun laman kemudian melanjutkan dengan 
mengambil materi dari sumber lain dengan menggunakan HTTP, maka laman tersebut tetap 
ditandai tidak aman. Hal ini dikenal sebagai laman [materi campuran][mixed-content].
 Laman materi campuran hanya sebagian terlindungi karena materi 
HTTP bisa diakses oleh sniffer dan rentan terhadap serangan man-in-the-middle. 

![ringkasan keamanan, materi campuran](images/overview-mixed.png)

Klik **View request in Network Panel** untuk membuka tampilan terfilter dari Panel 
Network dan melihat dengan jelas permintaan apa yang disajikan melalui HTTP. Ini memperlihatkan 
semua permintaan tak terlindungi dari semua sumber. 

![panel jaringan, sumber daya tidak aman, semua sumber](images/network-all.png)

## Memeriksa sumber

Gunakan panel kiri untuk memeriksa sumber yang aman atau tidak aman secara individual. 

Klik pada secure origin untuk menampilkan koneksi dan detail sertifikat untuk 
sumber tersebut.

![detail sumber, aman](images/origin-detail-secure.png)

Jika Anda mengeklik pada sumber tidak-aman, Panel Security menyediakan tautan ke tampilan terfilter dari Panel Network. 

![detail sumber, tidak aman](images/origin-detail-non-secure.png)

Klik pada tautan untuk melihat dengan pasti permintaan dari sumber mana yang 
disajikan melalui HTTP. 

![panel jaringan, sumber daya tidak aman, satu sumber](images/network-one.png)





[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
