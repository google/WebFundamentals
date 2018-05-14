project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Debug WebViews di aplikasi asli Android Anda dengan Chrome Developer Tools.

{# wf_updated_on: 2015-07-29 #}
{# wf_published_on: 2015-04-13 #}

# Men-debug WebViews dari Jauh {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Debug WebViews di aplikasi asli Android Anda dengan Chrome Developer Tools.

Pada Android 4.4 (KitKat) atau yang lebih baru,
gunakan DevTools untuk men-debug materi WebView dalam aplikasi asli Android.


### TL;DR {: .hide-from-toc }
- Aktifkan debugging WebView di aplikasi asli Android Anda; debug WebViews di Chrome DevTools.
- Akses daftar WebViews yang bisa di-debug melalui <strong>chrome://inspect</strong>.
- Men-debug WebViews sama dengan men-debug laman web melalui <a href='/web/tools/chrome-devtools/debug/remote-debugging'>debug dari jauh</a>.


## Mengonfigurasi WebViews untuk debugging

Debugging WebView harus diaktifkan dari dalam aplikasi Anda. Untuk mengaktifkan debug WebView, panggil metode statis [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)) pada kelas WebView.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

Setelan ini diterapkan ke semua WebViews aplikasi.

**Tip**: Debug WebView **tidak** dipengaruhi oleh status flag `debuggable` di manifes aplikasi. Jika Anda ingin mengaktifkan debug WebView hanya bila `debuggable` adalah `true`, uji flag di waktu proses.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## Membuka WebView di DevTools

Laman **chrome://inspect** menampilkan daftar WebViews yang bisa di-debug pada perangkat Anda.

Untuk memulai debugging, klik **inspect** di bawah WebView yang ingin Anda debug. Gunakan DevTools seperti yang Anda lakukan untuk tab browser remote.

![Memeriksa elemen di WebView](imgs/webview-debugging.png)

Grafik berwarna abu-abu yang tercantum dengan WebView merepresentasikan ukuran dan posisi relatifnya terhadap layar perangkat. Jika WebViews Anda telah disetel dengan judul, judulnya juga akan dicantumkan.

## Pemecahan Masalah

Tidak bisa melihat WebViews Anda di **laman chrome://inspect**?

* Verifikasi debug WebView telah diaktifkan untuk aplikasi Anda.
* Di perangkat Anda, buka aplikasi dengan WebView yang ingin Anda debug. Kemudian, segarkan laman **chrome://inspect**.


{# wf_devsite_translation #}
