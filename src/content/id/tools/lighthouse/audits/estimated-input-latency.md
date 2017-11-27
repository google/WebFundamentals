project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Perkiraan Latensi Masukan".

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Perkiraan Latensi Masukan  {: .page-title }

## Mengapa audit itu penting {: #why }

Responsivitas masukan adalah faktor utama dalam cara pengguna mempersepsi
kinerja aplikasi Anda. Aplikasi memiliki waktu 100 md untuk merespons masukan pengguna. Bila lebih lama dari itu,
maka pengguna akan mempersepsi aplikasi itu sebagai lambat. Lihat [Mengukur Kinerja dengan Model
RAIL](/web/fundamentals/performance/rail) untuk informasi selengkapnya.

Lihat bagian [Untuk apa pengujian audit](#what) pada dokumen ini
untuk penjelasan mengenai audit ini menguji dengan target skor 50 md (bukannya
100 md, yang merupakan saran model RAIL).

## Cara untuk lulus audit {: #how }

Agar aplikasi Anda merespons masukan pengguna lebih cepat, Anda perlu mengoptimalkan cara
menjalankan kode Anda di browser. Lihat serangkaian teknik yang dijelaskan secara singkat
dalam dokumen [Kinerja Rendering](/web/fundamentals/performance/rendering/).
 Tip ini beragam, mulai dari pemindahan beban komputasi ke web worker untuk
membebaskan thread utama, hingga pemaktoran ulang pemilih CSS Anda untuk melakukan
perhitungan yang lebih sedikit, hingga penggunaan properti CSS yang meminimalkan jumlah
operasi yang mengandalkan browser.

Satu keberatan penting dari audit ini adalah karena bukan suatu pengukuran lengkap
dari latensi masukan. Sebagaimana dijelaskan di bagian [Untuk apa pengujian dokumen ini](#what) pada
dokumen ini, audit ini tidak mengukur berapa lama sesungguhnya waktu yang diperlukan aplikasi Anda
untuk merespons masukan pengguna. Dengan kata lain, pengujian ini tidak mengukur apakah
respons aplikasi Anda terhadap masukan pengguna telah lengkap secara visual.

Untuk mengukurnya secara manual, buatlah sebuah rekaman dengan
Timeline di Chrome DevTools. Lihat [Cara Menggunakan Alat (Bantu)
Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool) untuk bantuan
selengkapnya. Ide dasarnya adalah mulai sebuah rekaman, lakukan masukan pengguna
yang ingin Anda ukur, hentikan perekaman, kemudian analisis bagan kobaran api
untuk memastikan semua tahapan [saluran
piksel](/web/fundamentals/performance/rendering/#the_pixel_pipeline) lengkap
dalam waktu 50 md.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Model kinerja RAIL menyarankan agar aplikasi merespons masukan pengguna dalam waktu
100 md, sementara target skor Lighthouse adalah 50 md. Mengapa?

Alasan Lighthouse menggunakan metrik proxy untuk mengukur seberapa bagus
aplikasi Anda merespons masukan pengguna: ketersediaan thread utama. Lighthouse
beranggapan bahwa aplikasi Anda membutuhkan 50 md untuk merespons masukan pengguna secara lengkap
(dari melakukan eksekusi JavaScript hingga penggambaran piksel baru
secara fisik ke layar). Jika thread utama Anda tidak tersedia selama 50 md atau lebih,
maka itu tidak menyisakan waktu yang cukup bagi aplikasi untuk menyelesaikan respons.

Ada probabilitas 90% pengguna akan menemukan latensi masukan dengan
jumlah yang dilaporkan Lighthouse, atau malah kurang. 10% pengguna bisa mengharapkan latensi
tambahan.


{# wf_devsite_translation #}
