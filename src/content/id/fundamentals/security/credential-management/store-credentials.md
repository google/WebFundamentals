project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Simpan Kredensial {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Jadi mudah menyimpan dan memperbarui kredensial pengguna dengan 
`navigator.credentials.store()` API.


## Simpan kredensial pengguna

Setelah pengguna berhasil mendaftar, masuk, atau mengubah sandi, simpan
atau perbarui kredensial pengguna.

### Simpan detail nama pengguna dan sandi

Poin Utama: Buat objek `PasswordCredential` baru dan simpan bersama 
`navigator.credentials.store()`.

Setelah pengguna masuk, dan Anda telah memverifikasi kredensialnya, buat objek
[`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
baru dan teruskan ke `navigator.credentials.store()` untuk menyimpannya.

    // After a successful sign-in, sign-up or password change,
    // Instantiate a `PasswordCredential` object
    var c = new PasswordCredential({
      id:       id,
      password: password,
      name:     name,
      iconrURL: iconUrl
    });

    // Store the credential
    navigator.credentials.store(c)
    .then(function() {
      // done
    });


<figure class="attempt-right">
  <img src="imgs/store-credential.png">
  <figcaption>Notifikasi untuk pengguna yang masuk otomatis</figcaption>
</figure>

Bila browser Chrome memperoleh informasi kredensial,
sebuah notifikasi akan muncul menanyakan untuk menyimpan kredensial
(atau penyedia gabungan)

<div class="clearfix"></div>

### Simpan nama pengguna dan sandi dari formulir

Poin Utama: Gunakan formulir yang dianotasi dengan baik untuk membuat objek `PasswordCredential`
baru dengan mudah dan menyimpannya bersama `navigator.credentials.store()`.

Selain membuat `PasswordCredential` secara manual, Anda bisa
sekadar meneruskan elemen
`form` [yang dianotasi dengan baik](https://html.spec.whatwg.org/multipage/forms.html#autofill) ke `PasswordCredential`.

Misalnya:

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

Kemudian buat objek `PasswordCredential` baru dengan meneruskan referensi ke
elemen form:

    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

Setiap bidang formulir tambahan akan secara otomatis ditambahkan ke
`PasswordCredential` sebagai bagian dari parameter `.additionalData`.


## Simpan kredensial untuk akun gabungan

Poin Utama: Buat objek `FederatedCredential` baru dan simpan bersama 
`navigator.credentials.store()`.


Untuk menyimpan detail akun gabungan, buat instance objek 
[`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) baru,
bersama identifier pengguna dan identifier penyedia. Kemudian panggil 
`navigator.credentials.store()` untuk menyimpan kredensial.

Misalnya:

    // After a successful federation, instantiate a FederatedCredential
    var cred = new FederatedCredential({
      id:       id,                           // id in IdP
      provider: 'https://account.google.com', // A string representing IdP
      name:     name,                         // name in IdP
      iconURL:  iconUrl                       // Profile image url
    });

    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parameter</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        Identifier pengguna saat memanggil aliran autentikasi
        penyedia identitas tertentu, biasanya sebagai nilai untuk <code>login_hint</code>
        di OAuth.
      </td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        Serialisasi ASCII asal yang digunakan penyedia untuk masuk.
        Misalnya, Facebook akan dinyatakan oleh 
        <code>https://www.facebook.com</code> dan Google oleh 
        <code>https://accounts.google.com</code>.
       </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code> (opsional)<br>
        Diperoleh dari penyedia identitas.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code> (opsional)<br>
        Diperoleh dari penyedia identitas.
      </td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
