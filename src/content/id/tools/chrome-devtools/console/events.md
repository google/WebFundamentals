project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools Command Line API menawarkan beragam cara untuk mengamati dan memeriksa event listener

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Memantau Kejadian {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools Command Line API menawarkan beragam cara untuk mengamati dan memeriksa event listener. JavaScript berperan utama di laman interaktif, dan browser menyediakan banyak alat berguna untuk men-debug kejadian dan penangan kejadian.


### TL;DR {: .hide-from-toc }
- Memantau kejadian bertipe tertentu dengan <code>monitorEvents()</code>.
- Menggunakan <code>unmonitorEvents()</code> untuk berhenti memantau.
- Mengetahui daftar listener suatu elemen DOM dengan <code>getEventListeners()</code>.
- Menggunakan panel Event Listeners Inspector untuk mendapatkan informasi tentang event listener.


## Memantau kejadian

Metode [monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
memerintahkan DevTools untuk membuat log yang mencatat informasi mengenai target yang ditetapkan.

Parameter pertama adalah objek yang akan dipantau.
Semua kejadian pada objek itu akan dikembalikan jika tidak ada parameter kedua.
Untuk menetapkan kejadian yang akan dipantau,
teruskan string atau larik string sebagai parameter kedua.

Untuk memantau kejadian klik pada tubuh laman:

    monitorEvents(document.body, "click");

Jika kejadian yang dipantau adalah *tipe kejadian* yang didukung
dan dipetakan DevTools ke serangkaian nama kejadian standar,
metode ini akan memantau kejadian bertipe itu.

[Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) memiliki pemetaan penuh *tipe kejadian* ke kejadian yang dicakupnya.

Untuk berhenti memantau kejadian,
panggil metode `unmonitorEvents()` dan masukkan objek yang akan dihentikan pemantauannya.

Untuk berhenti memantau kejadian pada objek `body`:

    unmonitorEvents(document.body);

## Menampilkan event listener yang terdaftar pada objek

[getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)
mengembalikan event listener yang terdaftar pada objek yang ditetapkan.

Nilai kembaliannya adalah objek yang berisi larik untuk setiap tipe kejadian yang terdaftar (`click` atau `keydown`, misalnya).
Anggota setiap larik adalah objek yang menjelaskan
listener yang terdaftar untuk setiap tipe.
Misalnya,
kode berikut menampilkan daftar semua event listener yang terdaftar pada objek dokumen:

    getEventListeners(document);

![Keluaran penggunaan getEventListeners()](images/events-call-geteventlisteners.png)

Jika terdaftar lebih dari satu listener pada objek yang ditetapkan,
larik akan berisi satu anggota untuk setiap listener.
Dalam contoh berikut,
ada dua event listener yang terdaftar pada elemen #scrollingList untuk kejadian `mousedown`:

![Tampilan event listener yang dilampirkan ke mousedown](images/events-geteventlisteners_multiple.png)

Luaskan lagi setiap objek ini untuk mempelajari propertinya:

![Tampilan yang diperluas dari objek listener](images/events-geteventlisteners_expanded.png)

## Menampilkan listener yang terdaftar pada elemen DOM

Secara default,
panel *Event Listeners* di Elements Inspector menampilkan semua kejadian yang terhubung ke suatu laman:

![Panel event listeners](images/events-eventlisteners_panel.png)

Filter membatasi kejadian hanya pada simpul yang dipilih:

![Panel event listeners, difilter menurut simpul saja](images/events-eventlisteners_panel_filtered.png)

Dengan meluaskan objek, panel menampilkan perincian event listener.
Dalam contoh ini,
laman memiliki dua event listener yang terhubung lewat jQuery:

![Tampilan event listeners diluaskan](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
