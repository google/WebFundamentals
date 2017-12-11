project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

[Credential Management API](https://www.w3.org/TR/credential-management/)
adalah API browser berbasis standar yang menyediakan antarmuka programatik
antara situs dan browser untuk masuk tanpa kendala, ke berbagai perangkat, dan
menghilangkan gesekan dari aliran masuk.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>Aliran Masuk Pengguna</figcaption>
  </figure>
</div>

Credential Management API:

* **Menyederhanakan aliran masuk** - Pengguna bisa secara otomatis masuk kembali ke 
  situs, bahkan jika sesinya telah berakhir.
* **Memungkinkan masuk dengan satu ketukan menggunakan pemilih akun** - Sebuah pemilih akun asli akan ditampilkan
  yang meniadakan formulir masuk.
* **Menyimpan kredensial** - Bisa menyimpan kombinasi nama pengguna & sandi
  atau bahkan detail akun gabungan.

Ingin melihat aksinya? Cobalah
[demo Credential Management API](https://credential-management-sample.appspot.com)
dan lihat
[kodenya](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>


## Langkah-langkah untuk mengimplementasikan Pengelolaan Kredensial

Walaupun ada banyak cara agar berhasil mengintegrasikan Credential Management
API, spesifik integrasi ini bergantung pada struktur dan pengalaman
pengguna situs, situs yang menggunakan aliran tersebut memiliki keunggulan pengalaman
pengguna ini:

* Pengguna layanan yang sudah ada dengan kredensial tunggal tersimpan ke
  browser akan langsung masuk, dan dialihkan ke laman yang pernah dimasuki
  begitu autentikasi selesai.
* Pengguna yang memiliki beberapa kredensial tersimpan atau yang telah menonaktifkan
  proses masuk otomatis perlu merespons ke satu dialog sebelum masuk ke laman masuk
  situs web.
* Bila pengguna keluar, situs web akan memastikan mereka tidak dimasukkan kembali
  secara otomatis.

Poin Utama: Penggunaan Credential Management API mengharuskan laman disajikan
dari asal yang aman.

### Ambil kredensial dan masuk pengguna

Untuk memasukkan pengguna, ambil kredensial dari pengelola sandi di browser
dan gunakan untuk memproses masuknya pengguna.

Misalnya:

1. Bila pengguna mendarat di situs Anda dan mereka tidak masuk, 
   panggil `navigator.credential.get()`
2. Gunakan kredensial yang diambil untuk memasukkan pengguna.
3. Perbarui UI untuk menunjukkan bahwa pengguna yang telah masuk.

Ketahui selengkapnya di
[Ambil Kredensial](/web/fundamentals/security/credential-management/retrieve-credentials).

### Simpan atau perbarui kredensial pengguna

Jika pengguna telah masuk dengan nama pengguna dan sandi:

1. Setelah pengguna berhasil masuk, membuat akun atau mengubah
   sandi, buat `PasswordCredential` dengan ID pengguna dan
   sandi.
2. Simpan objek kredensial menggunakan `navigator.credentials.store()`.


Jika pengguna masuk dengan penyedia identitas gabungan seperti Google
Sign-In, Facebook, GitHub, dll:

1. Setelah pengguna berhasil masuk, membuat akun atau mengubah
   sandi, buat `FederatedCredential` dengan alamat email pengguna sebagai
   ID dan tetapkan penyedia identitas dengan `.provider` 
2. Simpan objek kredensial menggunakan `navigator.credentials.store()`.

Ketahui selengkapnya di
[Simpan Kredensial](/web/fundamentals/security/credential-management/store-credentials).

### Keluar

Bila pengguna keluar, panggil `navigator.credentials.requireUserMediation()`
untuk mencegah pengguna dimasukkan kembali secara otomatis.

Dengan menonaktifkan masuk-otomatis juga memungkinkan pengguna beralih akun dengan mudah,
misalnya, antara akun pribadi dan kantor, atau antara akun di
perangkat bersama, tanpa harus memasukkan kembali informasi masuk mereka.

Ketahui selengkapnya di
[Keluar](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).


## Referensi Tambahan

[Credential Management API di MDN](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
