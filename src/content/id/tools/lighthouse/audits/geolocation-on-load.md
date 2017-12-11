project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Laman Tidak Secara Otomatis Meminta Geolokasi Saat Pemuatan Laman".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Laman Tidak Secara Otomatis Meminta Geolokasi Saat Pemuatan Laman  {: .page-title }

## Mengapa audit itu penting {: #why }

Pengguna menjadi salah mempercayai atau bingung oleh laman yang secara otomatis meminta
lokasi mereka saat pemuatan laman. Daripada secara otomatis meminta
lokasi pengguna saat pemuatan laman, ikatlah permintaan ke isyarat pengguna, misalnya
pengetukan tombol "Find Stores Near Me". Pastikan isyarat tersebut dengan jelas
dan secara eksplisit menyatakan kebutuhan akan lokasi pengguna.

## Cara untuk lulus audit {: #how }

Pada **URL**, Lighthouse melaporkan nomor baris dan kolom dari
kode Anda yang meminta lokasi pengguna. Buang panggilan ini, dan ikat
permintaan tersebut ke isyarat pengguna sebagai gantinya. 

Lihat [Minta izin secara bertanggung jawab][ask] untuk daftar praktik terbaik saat
meminta lokasi pengguna.

[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Jika izin geolokasi sudah diberikan ke laman sebelum audit,
Lighthouse tidak bisa menentukan apakah laman meminta lokasi pengguna
saat pemuatan laman. Setel ulang izin dan jalankan lagi Lighthouse. Lihat
[Ubah izin situs web][help] untuk bantuan selengkapnya.

Lighthouse mengumpulkan JavaScript yang telah dieksekusi saat pemuatan laman. Jika kode ini
berisi panggilan ke `geolocation.getCurrentPosition()` atau
`geolocation.watchPosition()`, dan izin geolokasi belum
diberikan, maka akan diminta lokasi pengguna.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
