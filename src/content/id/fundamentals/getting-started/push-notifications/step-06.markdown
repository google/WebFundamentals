---
title: "Subscribe to Push Notifications"
description: "Add code to your web app's service worker to subscribe to push notifications"
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Versi lengkap dari langkah ini ada di direktori completed/step6.

## 1. Tambakan kode untuk berlangganan (subscription)

Ganti komentar TODO dalam file _main.js_ yang Anda buat sebelumnya agar terlihat seperti ini:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
    console.log('Service Worker didukung');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
}
{% endhighlight %}

Kode ini menggunakan objek `pushManager` milik `ServiceWorkerRegistration` untuk berlangganan pesan dari gcm\_sender\_id yang Anda tambahkan ke manifest.

Anda harus memberikan argumen `{userVisibleOnly: true}` ke method subscribe(). Kode ini akan memberitahu browser bahwa pemberitahuan akan selalu ditampilkan ketika Push Message diterima. Saat ini, menjadi kewajiban untuk menunjukkan pemberitahuan.

## 2. Cobalah dari localhost

Bukan _index.html_ dari localhost dan buka Chrome DevTools untuk memeriksa console.

Anda akan melihat sesuatu seperti ini:

<img src="images/image13.png" width="888" height="590" alt="Screenshot halaman web: dialog ijin untuk Push Notification" />

**Penting**: Chrome saat ini tidak mendukung Push API di Incognito Mode.
Jika Anda ingin mengatur ulang preferensi izin push notification setiap saat,
klik ikon halaman di sebelah kiri URL:

<img src="images/image14.png" width="713" height="672"  alt="Screenshot halaman web: Ijin pengaturan dialog Push Notification" />

## 3. Dapatkan subscription ID

Dari Chrome DevTools, klik kanan nilai `endpoint` dan pilih **Copy Link Address** untuk menyalin nilai, yang akan terlihat seperti ini:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

Simpan subscription ID, yang merupakan bagian terakhir dari URL,
disorot di sini dalam huruf tebal.

Anda akan menggunakan nilai ini kemudian untuk memberitahu Google Cloud Messaging ke mana mengirim
pesan.

<img src="images/image15.png" width="774" height="932" alt="Screenshot halaman web: Console Chrome DevTools menunjukkan nilai endpoint Push Notification" />
