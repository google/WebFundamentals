---

title: "Berhenti berlangganan dari notification"
description: "Perbolehkan pengguna Anda untuk Berhenti berlangganan ke Push Notification."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Versi lengkap dari langkah ini ada di direktori completed/step11.

**CUKUP SUDAH BERMAIN DENGAN PESAN:^)!**

Bagaimana Anda memperbolehkan pengguna untuk berhenti berlangganan dan berlangganan ulang?
Sederhana: klien berhenti berlangganan dari notifikasi dengan memanggil method `unsubscribe()`
pada objek `PushSubscription`.
Dalam aplikasi yang sebenarnya, Anda juga akan perlu menghapus data langganan klien yang berhenti berlangganan dari server Anda, untuk menghindari mengirimkan pemberitahuan yang tidak diinginkan.

## 1. Tambahkan tombol Berlangganan/Berhenti Berlangganan

Di file _index.html_ yang Anda buat sebelumnya, tambahkan  tombol sehingga kode terlihat seperti ini:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Push Notification codelab</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Push Notification codelab</h1>
  <p>Halaman ini harus diakses menggunakan HTTPS atau melalui localhost.</p>
  <button disabled>Berlangganan</button>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

## 2. Tambahkan fungsionalitas berlangganan/berhenti ke _main.js_

Ubah kode _main.js_ agar terlihat seperti di bawah ini:

{% highlight javascript %}
var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');
if ('serviceWorker' in navigator) {
  console.log('Service Worker didukung');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(serviceWorkerRegistration) {
    reg = serviceWorkerRegistration;
    subscribeButton.disabled = false;
    console.log('Service Worker siap :^)', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :^(', error);
  });
}
subscribeButton.addEventListener('click', function() {
  if (isSubscribed) {
    unsubscribe();
  } else {
    subscribe();
  }
});
function subscribe() {
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription){
    sub = pushSubscription;
    console.log('Terdaftar! Endpoint:', sub.endpoint);
    subscribeButton.textContent = 'Berhenti Terdaftar';
    isSubscribed = true;
  });
}
function unsubscribe() {
  sub.unsubscribe().then(function(event) {
    subscribeButton.textContent = 'Daftar';
    console.log('Berhenti Terdaftar!', event);
    isSubscribed = false;
  }).catch(function(error) {
    console.log('Error berhenti terdaftar', error);
    subscribeButton.textContent = 'Subscribe';
  });
}
{% endhighlight %}

Dalam kode ini, Anda menetapkan nilai objek ServiceWorkerRegistration ketika service worker menginstal, yang kemudian digunakan dalam fungsi subscribe() untuk berlangganan ke Push Messaging.

Fungsi `subscribe()` menciptakan objek `PushSubscription` **sub** yang dapat digunakan oleh fungsi `unsubscribe()`.

Ingat: klien mendapat ID pendaftaran baru setiap kali berlangganan ulang, sehingga Anda perlu menyesuaikan permintaan ke GCM.
