---
title: "Buat proyek di Google Developers Console"
description: "Push notifications dari aplikasi web membutuhkan layanan backend untuk menangani pesan. Chrome saat ini menggunakan Google Cloud Messaging. Pada langkah ini, Anda men-set up proyek di Google Developer Console."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Push notification dari aplikasi web membutuhkan layanan backend untuk menangani pesan.
Chrome saat ini menggunakan [Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM) untuk ini, untuk mempelajari lebih lanjut, silahkan mengacu ke [Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

Browser lain bebas menggunakan layanan lainnya.

Untuk langkah ini, Anda perlu menyiapkan sebuah proyek di Google Developer Console.

**Meskipun ada banyak langkah di sini, jangan ditunda. Cukup mudah untuk membuat sebuah proyek!**


## 1. Buat sebuah proyek

Dari [Google Developers Console](https://console.developers.google.com)
buatlah sebuah proyek:

<img src="images/image04.png" width="907" height="845" alt="Screenshot halaman web: membuat proyek baru dari Google Developers Console" />

## 2. Pilih APIs untuk proyek

Dari **Use Google APIs**, pilih **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Screenshot halaman web: pilih APIs dari Google Developers Console" />

Dari daftar **Google APIs** pilih **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Screenshot halaman web: pilih Google Cloud Messaging API" /> Jika API yang ditambahkan berhasil, Anda akan melihat halaman seperti ini:

<img src="images/image07.png" width="965" height="901" alt="Screenshot halaman web: Google Developers Console, Google Cloud Messaging enabled" />

## 3. Dapatkan credentials

Dari menu **API Manager**, pilih **Credentials**, klik tombol dropdown **Create
credentials** dan pilih **API key**:

<img src="images/image08.png" width="965" height="901" alt="Screenshot halaman web: menambahkan credential dari Google Developers Console" />

Klik tombol **Browser key**:

<img src="images/image09.png" width="907" height="822" alt="Screenshot halaman web: Klik tombol Browser key untuk memilih tipe API key baru di Google Developers Console" />

Berikan nama untuk key (terserah Anda!), tinggalkan field HTTP referrers kosong dan klik tombol **Create**:

<img src="images/image10.png" width="907" height="822" alt="Screenshot halaman web: klik tombol Create untuk membuat sebuah browser API key dari Google Developers Console" />

Simpan **API key** — Anda aka memerlukannya nanti:

<img src="images/image11.png" width="907" height="822" alt="Screenshot halaman web: Simpan API key untuk proyek Anda dari Google Developers Console" />

Dari halaman Home, simpan **Project Number** — Anda juga akan memerlukannya nanti:

<img src="images/image12.png" width="965" height="901" alt="Screenshot halaman web: Simpan Project Number untuk proyek Anda dari Google Developers Console" />

Selamat!

Sekarang Anda telah berhasil membuat sebuah proyek Google Cloud Messaging.
