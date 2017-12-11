project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Anda harus mengaudit sumber daya secara berkala untuk memastikan setiap sumber daya membantu memberikan pengalaman pengguna yang lebih baik.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2014-03-31 #}

# Meniadakan Unduhan yang Tidak Perlu {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

### TL;DR {: .hide-from-toc }
* Inventarisir aset Anda dan aset pihak ketiga di laman Anda.
* Ukur kinerja setiap aset: nilainya dan kinerja teknisnya.
* Tentukan apakah sumber daya menyediakan nilai yang mencukupi.

Sumber daya tercepat dan paling dioptimalkan adalah sumber daya yang tidak dikirim. Anda harus meniadakan sumber daya yang tidak perlu dari aplikasi. Mempertanyakan, dan mengunjungi kembali secara berkala asumsi implisit dan eksplisit dengan tim Anda merupakan sebuah kebiasaan yang baik. Inilah beberapa contohnya:

* Anda selalu menyertakan sumber daya X di laman, namun apakah biaya mengunduh dan menampilkannya sepadan dengan nilai yang diberikannya kepada pengguna? Bisakah Anda mengukur dan membuktikan nilainya?
* Apakah sumber daya (terutama jika itu adalah sumber daya pihak ketiga) memberikan kinerja yang konsisten? Apakah sumber daya ini jalur penting, atau perlu menjadi jalur penting? Jika sumber daya ada dalam jalur penting, bisakah sumber daya itu menjadi satu-satunya titik kegagalan bagi situs? Yaitu, jika sumber daya tersebut tidak ada, apakah itu akan memengaruhi kinerja dan pengalaman pengguna laman Anda?
* Apakah sumber daya ini memerlukan atau memiliki SLA (Perjanjian Tingkat Layanan)? Apakah sumber daya ini mengikuti praktik terbaik kinerja: kompresi, cache, dst?

Seringkali, laman berisi sumber daya yang tidak perlu, atau lebih buruk lagi, menghambat kinerja laman tanpa memberi banyak nilai tambah bagi pengunjung atau situs host. Ini juga berlaku untuk sumber daya dan widget pihak pertama dan pihak ketiga.

* Situs A memutuskan untuk menampilkan korsel foto di berandanya agar pengunjung bisa melihat pratinjau beberapa foto dengan sekali klik cepat. Semua foto dimuat saat laman telah dimuat, dan pengguna menyusuri setiap foto.
    * **Pertanyaan:** Pernahkah Anda mengukur jumlah pengguna yang menampilkan beberapa foto sekaligus di korsel? Anda mungkin menyebabkan overhead yang tinggi karena mengunduh sumber daya yang tidak pernah ditampilkan oleh kebanyakan pengunjung.
* Situs B telah memutuskan untuk memasang widget pihak ketiga untuk menampilkan materi terkait, meningkatkan keterlibatan sosial, atau memberikan beberapa layanan lainnya.
    * **Pertanyaan:** Pernahkah Anda melacak jumlah pengunjung yang menggunakan widget atau mengeklik materi yang disediakan widget? Apakah interaksi yang dihasilkan widget ini cukup menjadi pembenaran overhead-nya?

Menentukan apakah akan meniadakan unduhan yang tidak perlu sering kali memerlukan banyak pemikiran dan pengukuran yang cermat. Untuk hasil terbaik, inventarisir dan pertimbangkan kembali pertanyaan ini bagi setiap aset di laman Anda.


{# wf_devsite_translation #}
