project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan alat allocation profiler (profiler alokasi) untuk menemukan objek yang sampahnya tidak dikumpulkan dengan benar, dan melanjutkan mempertahankan memori.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Cara Menggunakan Alat (Bantu) Allocation Profiler {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
Gunakan alat (bantu) allocation profiler (profiler alokasi) untuk menemukan objek yang sampahnya tidak dikumpulkan dengan benar, dan melanjutkan mempertahankan memori.


## Cara kerja alat

**Allocation profiler** menggabungkan informasi cuplikan terperinci dari
[profiler heap](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)
dengan pembaruan dan pelacakan bertahap dari
[panel Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool).
Mirip dengan alat ini, pelacakan alokasi heap objek dilakukan dengan cara memulai perekaman,
melakukan serangkaian tindakan, lalu menghentikan perekaman untuk analisis.

Alat (bantu) mengambil cuplikan heap secara periodik selama proses perekaman (hingga setiap 50 md!) dan satu cuplikan final di akhir rekaman.

![Allocation profiler](imgs/object-tracker.png)

Note: Nomor setelah @ adalah ID objek yang bertahan di beberapa cuplikan yang diambil. Ini memungkinkan perbandingan yang tepat antar status heap. Menampilkan alamat objek tidak masuk akal karena objek akan dipindahkan selama proses pengumpulan sampah.

## Mengaktifkan allocation profiler

Untuk mulai menggunakan allocation profiler:

1. Pastikan Anda memiliki [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) terbaru.
2. Buka Developer Tools dan klik ikon roda gigi di bagian kanan bawah.
3. Sekarang, buka panel Profiler, seharusnya ada profil bernama "Record Heap Allocations"

![Profiler Record heap allocations](imgs/record-heap.png)

## Membaca profil alokasi heap

Profil alokasi heap menampilkan tempat dibuatnya objek dan mengidentifikasi jalur yang mempertahankan.
Di cuplikan berikut, bilah di atas menunjukkan waktu ditemukannya objek baru di heap.

Tinggi setiap bilah sesuai dengan ukuran objek yang baru-baru ini dialokasikan,
dan warna bilah menunjukkan apakah objek masih hidup di cuplikan heap terakhir atau tidak.
Bilah biru menunjukkan objek yang masih hidup di akhir timeline,
Bilah abu-abu menunjukkan objek yang dialokasikan selama timeline,
tetapi sudah dikumpulkan sampahnya:

![Cuplikan allocation profiler](imgs/collected.png)

Di cuplikan di bawah, suatu tindakan dilakukan 10 kali.
Program contoh menyimpan lima objek di cache, sehingga lima bilah biru terakhir memang sudah diperkirakan.
Akan tetapi, bilah biru paling kiri menunjukkan potensi masalah.

Anda bisa menggunakan slider di timeline di atas untuk memperbesar cuplikan tersebut
dan melihat objek yang baru-baru ini dialokasikan di titik tersebut:

![Perbesar di cuplikan](imgs/sliders.png)

Mengeklik objek tertentu di heap akan menampilkan pohon yang menahannya di bagian bawah cuplikan heap. Memeriksa jalur yang menahan ke objek akan memberi Anda informasi yang cukup untuk memahami mengapa objek tidak dikumpulkan dan Anda bisa membuat perubahan kode yang diperlukan untuk membuang referensi yang tidak perlu.

## Melihat alokasi memori berdasarkan fungsi {: #allocation-profiler }

Anda juga dapat melihat alokasi memori berdasarkan fungsi JavaScript. Lihat
[Menyelidiki alokasi memori berdasarkan fungsi](index#allocation-profile) untuk
informasi selengkapnya.


{# wf_devsite_translation #}
