project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Animasi harus berjalan dengan baik, jika tidak mereka akan berdampak negatif pada pengalaman pengguna.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animasi dan Kinerja {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Pertahankan 60 fps setiap kali Anda melakukan animasi, karena bila kurang bisa mengakibatkan ketidaklancaran atau perlambatan yang akan terlihat oleh pengguna dan berdampak negatif terhadap pengalaman pengguna.

### TL;DR {: .hide-from-toc }
* Jagalah agar animasi tidak menyebabkan masalah kinerja; pastikan Anda tahu dampak menganimasikan properti CSS yang diberikan.
* Menganimasikan properti yang bisa mengubah geometri laman (layout) atau menyebabkan painting berdampak sangat merugikan.
* Sebisa mungkin, tetap konsisten pada ubahan transform dan opacity.
* Gunakan <code>will-change</code> untuk memastikan bahwa browser tahu yang Anda rencanakan untuk dianimasikan.


Menganimasikan properti ini bukannya tanpa risiko, dan beberapa properti lebih mudah dianimasikan dibandingkan yang lainnya. Misalnya, menganimasikan `width` dan `height` dari sebuah elemen akan mengubah geometrinya dan bisa menyebabkan elemen lain pada laman tersebut berpindah atau berubah ukurannya. Proses ini disebut *layout* (atau *mengubah posisi/geometri* di browser berbasis Gecko seperti Firefox), dan bisa sangat merugikan jika laman Anda memiliki banyak elemen. Setiap kali layout terpicu, laman atau bagian darinya biasanya perlu digambar, yang biasanya lebih mahal daripada operasi layout itu sendiri.

Sebisa mungkin, Anda harus menghindari melakukan animasi properti yang memicu layout atau paint. Untuk kebanyakan browser modern, ini berarti membatasi animasi ke `opacity` atau `transform`, yang keduanya bisa dioptimalkan oleh browser; tidak masalah jika animasi ditangani oleh JavaScript atau CSS.

Untuk daftar lengkap pekerjaan yang dipicu oleh properti CSS individual, lihat [Pemicu CSS](http://csstriggers.com). Anda bisa menemukan panduan lengkap tentang membuat [Animasi Berkinerja Tinggi pada HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

### Menggunakan properti will-change

Gunakan [`will-change`](https://dev.w3.org/csswg/css-will-change/) agar browser mengetahui bahwa Anda bermaksud mengubah suatu properti elemen. Hal ini memungkinkan browser untuk menetapkan optimalisasi yang paling tepat sebelum Anda membuat perubahan. Namun, jangan terlalu sering menggunakan `will-change`, karena hal itu bisa menyebabkan browser membuang sumber daya, yang pada akhirnya dapat menyebabkan lebih banyak masalah kinerja.

Aturan mudahnya adalah bahwa jika animasi mungkin dipicu dalam 200 md berikutnya, baik oleh interaksi pengguna atau karena status aplikasi, maka menggunakan `will-change` pada elemen animasi adalah ide yang baik. Pada kebanyakan kejadian, setiap elemen dalam tampilan aktif aplikasi yang Anda ingin animasikan harus mengaktifkan `will-change` untuk properti apa pun yang ingin Anda ubah. Pada kejadian contoh boks yang telah digunakan dalam panduan sebelumnya, menambahkan `will-change` untuk transform dan opacity terlihat seperti ini:


    .box {
      will-change: transform, opacity;
    }
    

Sekarang browser yang mendukungnya, [saat ini Chrome, Firefox dan Opera](http://caniuse.com/#feat=will-change), akan membuat optimalisasi yang sesuai dalam pengaturannya untuk mendukung perubahan atau menganimasikan properti tersebut.

## Kinerja CSS vs JavaScript

Ada banyak thread laman dan komentar di web yang membahas manfaat relatif dari animasi CSS dan JavaScript dari perspektif kinerja. Berikut adalah beberapa poin yang perlu diperhatikan:

* Animasi berbasis CSS, dan Animasi Web yang aslinya sudah didukung, biasanya ditangani di thread yang dikenal sebagai "thread compositor." Hal ini berbeda dengan "thread utama" browser, dengan penataan gaya, layout, painting, dan JavaScript dieksekusi. Ini berarti bahwa jika browser sedang menjalankan beberapa tugas penting di thread utama, animasi ini bisa terus bekerja tanpa terganggu.

* Perubahan lain untuk mengubah transform dan opacity, dalam beberapa kasus, juga ditangani oleh thread compositor.

* Jika animasi memicu paint, layout, atau keduanya, "thread utama" akan diharuskan untuk bekerja. Hal ini berlaku untuk animasi berbasis CSS dan JavaScript, dan overhead layout atau paint akan mengerdilkan setiap pekerjaan yang terkait dengan eksekusi CSS atau JavaScript, membuat persoalan yang tidak pasti.

Untuk informasi selengkapnya tentang pekerjaan apa yang dipicu karena menganimasikan properti tertentu, lihat [Pemicu CSS](http://csstriggers.com).




{# wf_devsite_translation #}
