project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pelajari cara menyiapkan Lighthouse untuk mengaudit aplikasi web Anda.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-27 #}

# Audit Aplikasi Web Dengan Lighthouse {: .page-title }

[Lighthouse](https://github.com/GoogleChrome/lighthouse) adalah alat (bantu)
sumber terbuka otomatis untuk meningkatkan kualitas aplikasi web Anda. Anda bisa menjalankannya
sebagai Ekstensi Chrome atau dari baris perintah. Anda beri Lighthouse sebuah URL yang ingin Anda
audit, maka Lighthouse menjalankan serangkaian pengujian terhadap laman tersebut, kemudian
menghasilkan sebuah laporan mengenai seberapa bagus laman itu menjalaninya. Dari sini Anda bisa menggunakan
pengujian yang tidak lulus sebagai indikator atas apa yang bisa Anda lakukan untuk meningkatkan aplikasi.

Note: Lighthouse saat ini terutama memfokuskan pada fitur Progressive Web App, misalnya Add to Homescreen dan dukungan offline. Akan tetapi, sasaran yang melandasi proyek ini adalah menyediakan audit ujung-ke-ujung atas semua aspek kualitas aplikasi web.

## Memulai

Ada dua cara untuk menjalankan Lighthouse, sebagai Ekstensi Chrome, atau sebagai alat (bantu)
baris perintah. Ekstensi Chrome menyediakan antarmuka yang lebih ramah pengguna untuk
membaca laporan. Alat (bantu) baris perintah memungkinkan Anda mengintegrasikan Lighthouse ke dalam
sistem integrasi kontinu.

### Ekstensi Chrome

Unduh Google Chrome 52 atau yang lebih baru.

Pasang [Ekstensi Chrome untuk Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk).

Masuklah ke laman yang ingin Anda audit.

Klik ikon Lighthouse (![ikon 
Lighthouse](images/lighthouse-icon-16.png)) yang ada di bilah alat Chrome.

![ikon Lighthouse di Bilah Alat Chrome](images/icon-on-toolbar.png)

Jika Anda tidak melihat ikon di bilah alat, mungkin ikon itu disembunyikan
di menu utama Chrome.

![ikon Lighthouse di Menu Chrome](images/icon-in-menu.png)

Setelah mengeklik ikon tersebut, Anda akan melihat sebuah menu.

![menu Lighthouse](images/menu.png)

Jika Anda hanya ingin menjalankan subset audit, klik tombol **Options** dan
nonaktifkan audit yang tidak Anda inginkan. Gulir ke bawah dan tekan **OK**
untuk mengonfirmasi perubahan.

![menu opsi Lighthouse](images/options.png)

Klik tombol **Generate report** untuk menjalankan pengujian Lighthouse terhadap
laman yang dibuka saat ini.

Bila audit selesai, Lighthouse akan membuka tab baru dan menampilkan
laporan mengenai hasil laman tersebut.

![laporan Lighthouse](images/report.png)

### Alat (bantu) baris perintah

Pasang [Node](https://nodejs.org), versi 5 atau lebih.

Pasang Lighthouse sebagai modul Node global.

    npm install -g lighthouse

Jalankan audit Lighthouse terhadap suatu laman.

    lighthouse https://airhorner.com/

Teruskan flag `--help` untuk melihat opsi masukan dan keluaran yang tersedia.

    lighthouse --help

## Kontribusi

Lighthouse bersifat sumber terbuka dan menerima kontribusi. Periksalah
[issues tracker](https://github.com/GoogleChrome/lighthouse/issues)
repositori untuk menemukan bug yang bisa Anda perbaiki, atau audit yang bisa Anda buat atau tingkatkan.
Issue tracker juga merupakan tempat yang bagus untuk mendiskusikan metrik audit, ide
audit baru, atau apa saja yang berkaitan dengan Lighthouse.


{# wf_devsite_translation #}
