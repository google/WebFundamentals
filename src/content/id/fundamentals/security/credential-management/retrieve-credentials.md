project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-11-08 #}

# Ambil Kredensial {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Untuk memasukkan pengguna, ambil kredensial dari pengelola sandi di browser
dan gunakan untuk memproses masuknya pengguna.

Untuk mengambil kredensial pengguna, gunakan `navigator.credentials.get()`, yang
mengembalikan sebuah promise yang akan memproses dengan
objek kredensial sebagai argumen. Objek kredensial yang diperoleh bisa berupa
[`PasswordCredential`](#authenticate_with_a_server) atau
[`FederatedCredential`](#authenticate_with_an_identity_provider). Jika tidak ada
informasi kredensial, `null` akan dikembalikan.

    navigator.credentials.get({
      password: true,
      unmediated: false,
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      if (cred) {
        // Use provided credential to sign user in  
      }
    });


### Parameter `navigator.credentials.get` {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parameter</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Setel ke <code>true</code> untuk mengambil <code>PasswordCredentials</code>.
        Default-nya adalah <code>false</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
        Objek yang menerima <code>provider</code> atau <code>protocol</code> sebagai
        kunci, yang memiliki larik parameter. Object <code>provider</code>
        menerima larik string yang mengidentifikasi penyedia. Saat ini, tidak ada 
        browser yang mengimplementasikan <code>protocol</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Setel ke <code>true</code> agar tidak menampilkan UI pemilih akun.
      </td>
    </tr>
  </tbody>
</table>

## Dapatkan kredensial

### Dapatkan kredensial secara otomatis

Untuk memasukkan pengguna secara otomatis, minta objek kredensial dengan
`unmediated: true`, segera setelah pengguna mendarat di situs web Anda, misalnya:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: true,</strong> // request a credential without user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
})
</pre>

<figure class="attempt-right">
  <img src="imgs/auto-sign-in.png">
  <figcaption>Notifikasi untuk pengguna yang masuk otomatis</figcaption>
</figure>

Permintaan ini segera diproses dengan objek kredensial dan tidak akan menampilkan
pemilih akun. Bila browser memperoleh informasi kredensial,
notifikasi akan muncul:

<div class="clearfix"></div>


### Dapatkan kredensial melalui pemilih akun

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>UI pemilih akun</figcaption>
</figure>

Jika pengguna memerlukan mediasi, atau memiliki beberapa akun, gunakan pemilih
akun agar pengguna bisa masuk, dan melewati formulir masuk biasa.

Pemilih akun biasanya dipanggil bila pengguna mengetuk tombol
"Sign-In". Pengguna bisa memilih akun untuk masuk, misalnya:

<div class="clearfix"></div>


Untuk mengaktifkan pemilih akun,
setel properti `unmediated` ke `false`:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: false,</strong> // request a credential with user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
});
</pre>

Setelah pengguna memilih akun yang ingin digunakan, promise akan memproses
baik dengan `PasswordCredential` atau `FederatedCredential` berdasarkan pilihan
mereka. Kemudian, [tentukan tipe kredensial](#determine-credential-type)
dan autentikasi pengguna dengan kredensial yang disediakan.

Jika pengguna membatalkan pemilih akun atau tidak ada kredensial yang tersimpan,
promise memproses dengan nilai `undefined`. Dalam hal ini, mundur
ke pengalaman formulir masuk.




## Tentukan tipe kredensial {: #determine-credential-type }

Bila `navigator.credentials.get()` diproses, maka akan mengembalikan 
`undefined` atau objek Credential. Untuk menentukan apakah ini 
`PasswordCredential` atau `FederatedCredential`, cukup lihat ke properti
`.type` objek tersebut, yang akan berupa `password` atau
`federated`. 

Jika `.type` adalah `federated`, properti `.provider` adalah string yang
menyatakan penyedia identitas.

Misalnya:

    if (cred) {
      switch (cred.type) {
        case 'password':
          // authenticate with a server
          break;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com':
              // run google identity authentication flow
              break;
            case 'https://www.facebook.com':
              // run facebook identity authentication flow
              break;
          }
          break;
      }
    } else {
      // auto sign-in not possible
    }


Dalam hal nilai `undefined`, lanjutkan dengan pengguna dalam keadaan telah dikeluarkan.

Nilai `undefined` akan diteruskan bila:

* Pengguna belum mengakui fitur proses masuk otomatis (sekali per
  instance browser).
* Pengguna tidak memiliki kredensial atau lebih dari dua objek kredensial
 telah disimpan di asalnya.
* Pengguna telah meminta untuk mengharuskan mediasi pengguna ke asalnya.




## Autentikasi pengguna


### Autentikasi dengan nama pengguna dan sandi

Untuk mengautentikasi pengguna dengan server Anda, POST 
`PasswordCredential` yang disediakan ke server dengan menggunakan `fetch()`.

Bila telah di-POST-kan, `fetch` secara otomatis mengonversi objek `PasswordCredential` ke
objek `FormData` yang dienkodekan sebagai `multipart/form-data`:

    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

Note: Anda tidak bisa menggunakan `XMLHttpRequest` untuk mem-POST-kan `PasswordCredential` 
ke server Anda.

#### Parameter `PasswordCredential`

Objek `PasswordCredential` yang diperoleh menyertakan parameter berikut:

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
        <code>String</code><br>
        String identifier pengguna.
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        Sandi transparan yang tidak bisa Anda peroleh menggunakan JavaScript.
       </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        String nama pengguna.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        String URL gambar ikon pengguna.
      </td>
    </tr>
  </tbody>
</table>

#### Ubah parameter

Dalam beberapa kasus, mungkin perlu menambahkan data tambahan ke
POST autentikasi.

Ubah kunci param dengan menetapkan string ke `.idName` atau `.passwordName`.

Anda juga bisa menambahkan parameter ekstra seperti token cross-site request forgery (CSRF)
dengan menetapkan `.additionalData` ke `FormData` dan menambahkan nilai-kunci 
padanya.

Setelah Anda mendapatkan objek kredensial:

    if (cred) {
      if (cred.type == 'password') {
        // Use `email` instead of `id` for the id
        cred.idName = 'email';

        // Append CSRF Token
        var csrf_token = document.querySelector('#csrf_token').value;
        var form = new FormData();
        form.append('csrf_token', csrf_token);

        // Append additional credential data to `.additionalData`
        cred.additionalData = form;

        // `POST` the credential object.
        // id, password and the additional data will be encoded and
        // sent to the url as the HTTP body.
        fetch(url, {           // Make sure the URL is HTTPS
          method: 'POST',      // Use POST
          credentials: cred    // Add the password credential object
        }).then(function() {
          // continuation
        });
      }
    }

Anda bisa melakukan hal serupa dengan menetapkan objek `URLSearchParams` sebagai
ganti `FormData` ke `.additionalData`. Dalam hal ini, keseluruhan objek kredensial 
dienkodekan menggunakan `application/x-www-form-urlencoded`.

### Autentikasi dengan penyedia identitas

Untuk mengautentikasi pengguna dengan penyedia identitas, cukup gunakan aliran autentikasi 
spesifik bersama `FederatedCredential`.

Misalnya, jika penyedianya adalah Google, gunakan
[pustaka JavaScript Google Sign-In](/identity/sign-in/web/):

    // Instantiate an auth object
    var auth2 = gapi.auth2.getAuthInstance();

    // Is this user already signed in?
    if (auth2.isSignedIn.get()) {
      var googleUser = auth2.currentUser.get();
      
      // Same user as in the credential object?
      if (googleUser.getBasicProfile().getEmail() === id) {
        // Continue with the signed-in user.
        return Promise.resolve(googleUser);
      }
    }
    
    // Otherwise, run a new authentication flow.
    return auth2.signIn({
      login_hint: id || ''
    });


Google Sign-In menghasilkan token ID sebagai bukti autentikasi yang
Anda kirimkan ke server untuk membuat sesi.

Untuk penyedia identitas tambahan, lihat dokumentasinya masing-masing:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## Keluar {: #sign-out }

Bila pengguna keluar dari situs web, Anda bertanggung jawab untuk memastikan
pengguna tidak secara otomatis dimasukkan pada kunjungan berikutnya. Untuk menonaktifkan
masuk otomatis, panggil
[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation):

    // After a user signing out...
    navigator.credentials.requireUserMediation();

Kemudian, jika `navigator.credentials.get()` dipanggil bersama `unmediated: true`, maka
akan mengembalikan `undefined` dan pengguna tidak akan dimasukkan. Ini hanya akan 
diingat untuk instance browser saat ini bagi asal ini.

Untuk melanjutkan masuk otomatis, pengguna bisa sengaja memilih masuk, dengan
memilih akun yang ingin digunakan untuk masuk, dari pemilih akun. Maka,
pengguna akan selalu dimasukkan kembali, hingga mereka secara eksplisit keluar.



{# wf_devsite_translation #}
