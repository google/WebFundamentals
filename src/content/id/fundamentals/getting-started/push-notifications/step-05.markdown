---
title: "Tambahkan sebuah manifest"
description: "Tambahkan sebuah file manifest untuk menyediakan konfigurasi Push Notification."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Versi lengkap dari langkah ini ada di direktori completed/step5.

Manifest adalah sebuah file JSON yang menyediakan informasi tentang aplikasi web Anda, termasuk konfigurasi Push Notification.

## 1. Buat sebuah file manifest

Pada tingkat paling atas direktori _app_ Anda, buat file bernama
_manifest.json_ (Anda bisa memilih nama lain).

Sertakan kode berikut. Nilai _gcm\_sender\_id_ harus berisi
Project Number yang telah Anda simpan sebelumnya:

{% highlight json %}
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "593836075156"
}
{% endhighlight %}

Ada beberapa banyak fungsi web manifest, seperti pengaturan ikon aplikasi dan memungkinkan Add to Home Screen di ponsel.

Pelajari lebih lanjut dari artikel Dasar-dasar Web [Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

## 2. Tunjukkan pada browser di mana menemukan file manifest untuk aplikasi web Anda

Tambahkan baris berikut ke elemen head dalam file _index.html_ yang Anda buat sebelumnya:

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}
