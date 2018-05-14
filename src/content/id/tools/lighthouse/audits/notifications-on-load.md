project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Laman Tidak Secara Otomatis Meminta Izin Notifikasi Saat Pemuatan Laman".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Laman Tidak Secara Otomatis Meminta Izin Notifikasi Saat Pemuatan Laman  {: .page-title }

## Mengapa audit itu penting {: #why }

Seperti yang dijelaskan dalam [Apa yang Membuat Notifikasi Bagus][good], notifikasi yang baik adalah
tepat waktu, relevan, dan tepat. Jika laman Anda meminta izin untuk mengirim
notifikasi saat pemuatan laman, notifikasi tersebut mungkin tidak relevan untuk pengguna
atau sesuai dengan kebutuhan mereka. Pengalaman pengguna yang lebih baik adalah dengan menawarkan kepada pengguna untuk mengirimi
notifikasi tipe tertentu, dan menampilkan permintaan izin
setelah mereka ikut serta.

[good]: /web/fundamentals/push-notifications/

## Cara untuk lulus audit {: #how }

Pada **URL**, Lighthouse melaporkan nomor baris dan kolom dari
kode Anda yang meminta izin untuk mengirim notifikasi. Buang panggilan ini,
dan ikat permintaan tersebut ke isyarat pengguna sebagai gantinya.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Jika izin notifikasi sudah diberikan atau ditolak ke laman sebelum
audit Lighthouse, Lighthouse tidak bisa menentukan apakah laman meminta
izin notifikasi saat pemuatan laman. Setel ulang izin dan jalankan
lagi Lighthouse. Lihat [Mengubah izin situs web][help] untuk bantuan selengkapnya.

Lighthouse mengumpulkan JavaScript yang telah dieksekusi saat pemuatan laman. Jika kode
ini berisi panggilan ke `notification.requestPermission()`, dan izin
notifikasi belum diberikan, maka izin notifikasi akan diminta.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
