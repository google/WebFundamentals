project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Polymer Starter Kit.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Polymer Starter Kit {: .page-title }

[Unduh Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## Apa yang dimaksud dengan Polymer Starter Kit?

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external }
adalah titik mulai untuk membangun aplikasi dengan menggunakan layout berbasis panel samping. Layout 
disediakan oleh elemen `app-layout`.

Template ini, beserta toolchain `polymer-cli`, juga memperagakan penggunaan
"pola PRPL". Pola ini memungkinkan pengiriman pertama yang cepat dan interaksi dengan
materi di rute awal yang diminta oleh pengguna, bersama navigasi
selanjutnya yang cepat dengan melakukan precache komponen selebihnya yang diperlukan oleh aplikasi dan
secara progresif memuatnya bila dibutuhkan saat pengguna mengarah ke berbagai bagian aplikasi.

Pola PRPL, secara ringkas:

* **Push** komponen yang diperlukan untuk rute awal
* **Render** rute awal secepatnya
* **Pre-cache** komponen untuk rute selebihnya
* **Lazy-load** dan secara progresif meningkatkan versi rute berikutnya hanya bila dibutuhkan

### Migrasi dari Polymer Starter Kit v1?

[Lihat entri blog kami yang membahas perubahan apa saja yang ada di PSK2 dan cara migrasi!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

## Persiapan

### Prasyarat

Pasang [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### Lakukan inisialisasi proyek dari template

    mkdir my-app
    cd my-app
    polymer init starter-kit

### Mulai server development

Perintah ini akan menyediakan aplikasi di `http://localhost:8080` dan menyediakan perutean
URL dasar untuk aplikasi:

    polymer serve --open


### Bangun

Perintah ini melakukan pengecilan HTML, CSS, dan JS pada dependensi
aplikasi, dan menghasilkan file service-worker.js bersama kode untuk melakukan precache
dependensi berdasarkan entrypoint dan fragmen yang ditetapkan dalam `polymer.json`.
File yang diperkecil akan disalurkan keluarannya ke folder `build/unbundled`, dan cocok
untuk menyajikan dari server yang kompatibel dengan HTTP/2+Push.

Sebagai tambahan, perintah itu juga akan membuat folder `build/bundled` fallback,
yang dihasilkan menggunakan pembundelan fragmen, cocok untuk menyajikan dari server yang tidak kompatibel dengan
H2/Push atau untuk klien yang tidak mendukung H2/Push.

    polymer build

### Pratinjau versi

Perintah ini menyediakan versi mini aplikasi di `http://localhost:8080`
dalam bentuk yang tidak dibundel, karena akan disajikan melalui server yang kompatibel dengan push:

    polymer serve build/unbundled

Perintah ini menyediakan versi mini aplikasi di `http://localhost:8080`
yang dihasilkan menggunakan pembundelan fragmen:

    polymer serve build/bundled

### Jalankan pengujian

Perintah ini akan menjalankan
[Web Component Tester](https://github.com/Polymer/web-component-tester){: .external } terhadap
browser yang saat ini dipasang pada mesin Anda.

    polymer test

### Menambahkan tampilan baru

Anda bisa memperluas aplikasi dengan menambahkan lebih banyak tampilan yang hanya akan dimuat bila dibutuhkan
mis. berdasarkan rute, atau merender bagian aplikasi yang tidak begitu penting
secara progresif.  Setiap fragmen baru yang hanya dimuat bila dibutuhkan harus ditambahkan ke
daftar `fragments` dalam file `polymer.json` yang disertakan.  Ini akan memastikan
semua komponen itu dan dependensinya ditambahkan ke daftar komponen yang
di-precache (dan bundelnya akan dibuat dalam versi `bundled` fallback).

## Langkah Berikutnya

Lihat [panduan memulai](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }

## Ketahui Selengkapnya

Untuk mengetahui selengkapnya, lihat kode, kirimkan permasalahan, atau ikut serta, periksalah
repo Git kami di [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }


{# wf_devsite_translation #}
