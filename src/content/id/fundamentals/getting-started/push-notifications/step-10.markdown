---

title: "Menangani klik di notification"
description: "Tambahkan kode service worker untuk memungkinkan aksi (seperti navigasi ke halaman web) saat pengguna mengklik notification."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Versi lengkap dari langkah ini ada di direktori completed/step10.

Dalam langkah ini Anda akan menambahkan kode untuk mengaktifkan aksi (seperti menavigasi ke halaman web) saat pengguna mengklik notification.

Tambahkan kode berikut ke _sw.js_, menggantikan komentar _TODO_ dari langkah 
6:

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
{% endhighlight %}

Kode ini memantau klik di notification, kemudian membuka halaman web - dalam contoh ini, video YouTube.

Kode ini memeriksa semua window klien yang menjalankan service worker ini: jika URL yang diminta sudah terbuka di tab, fokus ke tab tersebut - jika tidak, buka tab baru.

**CATATAN**: Android [tidak menutup notification](https://crbug.com/463146) ketika Anda meng-klik notification.

Oleh karena itu, kita memerlukan kode `event.notification.close();`.
