project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools memudahkan Anda melihat banyak variabel sekaligus dalam aplikasi.

{# wf_published_on: 2016-02-11 #}
{# wf_updated_on: 2016-02-11 #}

# Melihat variabel di Sources {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Chrome DevTools memungkinkan Anda untuk secara mudah melihat beberapa variabel di seluruh aplikasi.
Dengan melihat variabel dalam Sources maka Anda tidak perlu membuka konsol dan bisa fokus untuk memperbaiki kode.

Panel Sources menyediakan kemampuan untuk melihat variabel dalam aplikasi Anda.
Ini terletak di bagian watch dari bilah sisi debugger.
Dengan mengambil keuntungan dari fungsionalitas ini, Anda tidak perlu berulang kali mencatat log objek ke konsol.

![Bagian watch dari debugger](imgs/sources-watch-variables-location.png)

## Menambahkan variabel

Untuk menambahkan variabel ke daftar watch gunakan ikon tambahkan di sebelah kanan bagian judul.
Ini akan membuka masukan inline tempat Anda bisa memberikan nama variabel ke daftar watch.
Setelah diisi, tekan tombol <kbd>Enter</kbd> untuk menambahkannya ke dalam daftar.

![Menambahkan ke tombol daftar watch](imgs/add-variable-to-watch.png)

Watcher akan menunjukkan nilai variabel sekarang selagi ditambahkan.
Jika variabel tidak disetel atau tidak bisa ditemukan, akan menampilkan <samp>&lt;Not Available&gt;</samp> untuk nilai tersebut.

![variabel yang belum didefinisikan pada daftar watch](imgs/undefined-variable-in-watch.png)

## Memperbarui variabel

Nilai variabel bisa berubah selama aplikasi terus berjalan.
Daftar watch bukanlah tampilan langsung dari variabel kecuali Anda melangkah melalui eksekusi.
Ketika Anda melangkah melalui eksekusi menggunakan [breakpoint](add-breakpoints), nilai-nilai yang dilihat akan diperbarui secara otomatis.
Untuk secara manual mengecek ulang variabel dalam daftar, tekan tombol refresh di sebelah kanan bagian judul.

![Tombol refresh melihat variabel](imgs/refresh-variables-being-watched.png)

Saat refresh diminta, keadaan aplikasi saat ini diperiksa ulang.
Setiap item yang diamati akan diperbarui dengan nilai terbaru.

![Variabel yang dilihat telah diperbaharui](imgs/updated-variable-being-watched.png)

## Menghapus variabel

Agar apa yang Anda lihat seminimal mungkin sehingga bisa bekerja lebih cepat, Anda mungkin perlu menghapus variabel dari daftar watch.
Ini bisa dilakukan dengan mengarahkan ke atas variabel kemudian mengeklik ikon removal yang muncul di sebelah kanan.

![Variable Hover yang akan dihapus dari daftar watch](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
