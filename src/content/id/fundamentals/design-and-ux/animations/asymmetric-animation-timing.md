project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Memecah kesimetrisan memberikan perbedaan dan daya tarik untuk proyek Anda. Pelajari kapan dan cara menerapkannya ke proyek Anda.

{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# Pengaturan waktu animasi asimetris {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Pengaturan waktu animasi asimetris meningkatkan pengalaman pengguna dengan memungkinkan Anda untuk mengekspresikan kepribadian dan pada saat yang bersamaan merespons dengan cepat setiap interaksi pengguna. Hal ini juga memberikan kesan berbeda, yang membuat antarmuka lebih menarik secara visual.

### TL;DR {: .hide-from-toc }
* Gunakan pengaturan waktu animasi asimetris untuk menambahkan kepribadian dan perbedaan ke pekerjaan Anda.
* Selalu utamakan interaksi pengguna; gunakan durasi lebih pendek ketika merespons ketukan atau klik, dan simpan durasi yang lebih lama untuk hal lainnya.


Seperti kebanyakan "aturan" animasi, Anda harus bereksperimen untuk mencari tahu apa yang paling cocok bagi aplikasi Anda, namun ketika berurusan dengan pengalaman pengguna, pengguna itu terkenal tidak sabar. Aturan mudahnya adalah **selalu menanggapi interaksi pengguna dengan cepat**. Jadi karena, sebagian besar aksi pengguna adalah asimetris, maka animasi juga begitu.

Misalnya, ketika pengguna mengetuk untuk menampilkan navigasi bilah sisi, Anda harus menampilkannya ke layar secepat mungkin, dengan durasi sekitar 100 md. Namun ketika pengguna menutup menu, Anda bisa menganimasikan tampilan keluar dengan sedikit lebih lambat, misalnya dengan durasi sekitar 300 md.

Sebaliknya, ketika Anda menyajikan tampilan modal, ini biasanya untuk menampilkan pesan kesalahan atau beberapa pesan penting lainnya. Dalam keadaan seperti ini, Anda menyajikan tampilan dengan sedikit lebih lambat, sekitar 300 md, namun saat ditutup, yang dipicu oleh pengguna, harus terjadi sangat cepat.

Maka aturan mudahnya adalah sebagai berikut:

* Untuk animasi UI yang dipicu oleh interaksi pengguna, seperti transisi tampilan atau menampilkan elemen, gunakan proses masuk cepat (durasi singkat), tapi proses keluar lambat (durasi lebih lama).
* Untuk animasi UI yang dipicu oleh kode, seperti kesalahan atau tampilan modal, gunakan proses masuk lebih lambat (durasi lebih lama), tapi proses keluar cepat (durasi singkat).


{# wf_devsite_translation #}
