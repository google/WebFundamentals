project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Formulir sulit diisi pada perangkat seluler. Formulir terbaik adalah formulir dengan masukan paling sedikit.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-30 #}

# Membuat Formulir yang Mengagumkan {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Formulir sulit diisi pada perangkat seluler. Formulir terbaik adalah formulir dengan masukan paling sedikit. Formulir yang baik menyediakan tipe masukan semantik. Kunci harus berubah sesuai jenis masukan pengguna; pengguna memilih tanggal di kalender. Selalu beri tahu pengguna. Alat validasi harus memberi tahu pengguna apa yang harus mereka lakukan sebelum mengirimkan formulir.


## Mendesain formulir efisien


Mendesain formulir efisien dengan menghindari tindakan yang berulang, hanya meminta informasi yang diperlukan dan memandu pengguna dengan menunjukkan seberapa jauh mereka dalam formulir multi-bagian.


### TL;DR {: .hide-from-toc }
- Gunakan data yang ada untuk mengisi bidang dan pastikan untuk mengaktifkan isi-otomatis.
- Gunakan bilah kemajuan yang dilabeli dengan jelas untuk membantu pengguna melalui formulir multi-bagian.
- Sediakan kalender visual sehingga pengguna tidak perlu meninggalkan situs Anda dan berpindah ke aplikasi kalender pada ponsel cerdas mereka.


### Meminimalkan tindakan dan bidang berulang

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Tampilkan kemajuan dalam formulir multi-bagian">
  <figcaption>
    Dalam situs web Progressive.com, pengguna akan diminta kode pos mereka, yang berikutnya sudah diisi ke bagian berikutnya dari formulir.
  </figcaption>
</figure>

Pastikan formulir Anda tidak memiliki tindakan berulang, memiliki bidang yang 
diperlukan saja, dan memanfaatkan dari 
[isiotomatis](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete),
sehingga pengguna bisa dengan mudah melengkapi formulir dengan data yang sudah diisi.

Cari kesempatan untuk mengisi informasi yang Anda sudah tahu, atau mungkin
mengantisipasinya supaya pengguna tidak harus mengisinya sendiri.  Misalnya, 
alamat pengiriman sudah diisi dengan alamat pengiriman terakhir yang diberikan oleh 
pengguna.

<div style="clear:both;"></div>

### Tunjukkan pada pengguna seberapa jauh kemajuan mereka

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Tampilkan kemajuan dalam formulir multi-bagian">
  <figcaption>
    Gunakan bilah kemajuan yang dilabeli dengan jelas untuk membantu pengguna melalui formulir multi-bagian.
  </figcaption>
</figure>

Bilah kemajuan dan menu harus secara akurat menampilkan kemajuan secara keseluruhan melalui 
formulir dan proses multi-langkah.

Jika Anda menempatkan formulir kompleks secara tidak proporsional dalam langkah sebelumnya, pengguna kemungkinan
besar akan meninggalkan situs sebelum mereka melewati seluruh proses. 

<div style="clear:both;"></div>

### Menyediakan kalender visual ketika memilih tanggal

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Situs web hotel dengan kalender yang mudah digunakan">
  <figcaption>
    Situs web pemesanan hotel dengan widget kalender yang mudah digunakan untuk memilih tanggal.
  </figcaption>
</figure>

Pengguna sering kali membutuhkan lebih banyak konteks saat menjadwalkan janji pertemuan dan tanggal perjalanan, 
untuk membuat segalanya lebih mudah dan mencegah pengguna meninggalkan situs Anda untuk memeriksa 
aplikasi kalender mereka, sediakan kalender visual dengan label yang jelas untuk memilih 
tanggal mulai dan selesai. 

<div style="clear:both;"></div>

## Pilih tipe masukan yang terbaik

Rampingkan entri informasi dengan menggunakan tipe masukan yang tepat. Pengguna mengapresiasi
situs web yang secara otomatis menampikan papan nomor untuk memasukkan nomor ponsel, atau
secara otomatis memajukan bidang ketika mereka memasukkannya. Cari kesempatan untuk
menghilangkan ketukan sia-sia dalam formulir Anda.


### TL;DR {: .hide-from-toc }
- Pilih tipe masukan yang paling tepat bagi data Anda untuk menyederhanakan masukan.
- Berikan saran ketika pengguna mengetik dengan elemen <code>datalist</code>.


### Tipe masukan HTML5

HTML5 memperkenalkan sejumlah tipe masukan baru. Tipe masukan baru ini memberikan petunjuk
ke browser tentang tipe layout keyboard yang ditampilkan pada keyboard
di layar.  Pengguna lebih mudah saat memasukkan informasi yang diperlukan tanpa
harus mengubah keyboard mereka dan cukup melihat tombol yang sesuai untuk jenis
masukan tersebut.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Input <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Untuk memasukkan URL. Itu harus diawali dengan skema URI yang valid,
        misalnya <code>http://</code>, <code>ftp://</code> atau <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Untuk memasukkan nomor ponsel. Itu <b>tidak</b>
        memberlakukan sintaks tertentu untuk validasi, jadi jika Anda ingin memastikan
        format tertentu, Anda bisa menggunakan pola.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Untuk memasukkan alamat email, dan petunjuk bahwa
        karakter @ harus ditampilkan pada keyboard secara default. Anda bisa menambahkan
        beberapa atribut jika disediakan lebih dari satu alamat email.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>Sebuah bidang masukan teks yang didesain secara
        konsisten dengan platform bidang penelusuran.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>Untuk masukan numerik, bisa berupa nilai float atau integer
        rasional.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>Untuk memasukkan nomor, tapi tidak seperti tipe
        masukan nomor, nilainya tidak begitu penting. Ini ditampilkan ke pengguna sebagai
        kontrol slider.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>Untuk memasukkan nilai tanggal dan waktu
        dengan zona waktu yang disediakan adalah zona waktu setempat.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>Untuk memasukkan tanggal (saja) tanpa disediakan
        zona waktu.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>Untuk memasukkan waktu (saja) tanpa disediakan
        zona waktu.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>Untuk memasukkan minggu (saja) tanpa disediakan
        zona waktu.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>Untuk memasukkan bulan (saja) tanpa disediakan
        zona waktu.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>Untuk memilih warna.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

Perhatian: Harap ingat untuk selalu menjaga pelokalan ketika memilih tipe masukan,
beberapa lokal menggunakan titik (.) sebagai pemisah bukan koma (,)

### Menawarkan saran saat masukan dengan datalist

Elemen `datalist` bukanlah tipe masukan, namun daftar nilai masukan yang disarankan
untuk dikaitkan dengan bidang formulir. Ini memungkinkan browser menyarankan opsi
pelengkapan otomatis ketika pengguna mengetik. Tidak seperti elemen select ketika pengguna harus memindai daftar
yang panjang untuk menemukan nilai yang mereka cari, dan membatasi mereka hanya ke daftar
tersebut, elemen `datalist` memberikan petunjuk ketika pengguna mengetik.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

Note: Nilai <code>datalist</code> disediakan sebagai saran, dan pengguna tidak dibatasi pada saran yang diberikan.

## Memasukkan label dan nama dengan benar

Formulir sulit diisi pada perangkat seluler. Formulir terbaik adalah formulir dengan masukan paling sedikit. Formulir yang baik menyediakan tipe masukan semantik. Kunci harus berubah sesuai jenis masukan pengguna; pengguna memilih tanggal di kalender. Selalu beri tahu pengguna. Alat validasi harus memberi tahu pengguna apa yang harus mereka lakukan sebelum mengirimkan formulir.


### TL;DR {: .hide-from-toc }
- Selalu gunakan <code>label</code> pada masukan formulir, dan pastikan itu terlihat ketika bidang sedang dalam fokus.
- Gunakan <code>placeholder</code> untuk memberikan panduan mengenai apa yang Anda harapkan.
- Untuk membantu browser mengisi-otomatis formulir, gunakan <code>name</code> yang ditetapkan untuk elemen dan menyertakan atribut <code>autocomplete</code>.


### Pentingnya label

Elemen `label` memberikan petunjuk kepada pengguna, memberi tahu mereka informasi
yang dibutuhkan dalam elemen formulir.  Setiap `label` terkait pada sebuah
elemen masukan dengan menempatkannya di dalam elemen `label`, atau dengan menggunakan atribut "`for`".
  Menerapkan label ke elemen formulir juga membantu meningkatkan ukuran target
sentuh: pengguna bisa menyentuh label maupun masukan untuk menempatkan
fokus pada elemen input.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Ukuran dan penempatan label

Label dan masukan harus cukup besar agar mudah ditekan.  Di tampilan potret
yang terlihat, label bidang harus diletakkan di atas elemen input, dan di sampingnya jika di mode
lanskap.  Pastikan bidang label dan kotak masukan bersesuaian terlihat pada
saat yang bersamaan.  Berhati-hatilah dengan penangan gulir khusus yang mungkin menggulir elemen
masukan ke atas laman menyembunyikan label, atau label yang ditempatkan di bawah elemen
masukan mungkin tertutupi oleh keyboard virtual.

### Gunakan Placeholder

Atribut placeholder memberikan petunjuk kepada pengguna tentang apa yang diharapkan pada
masukan, biasanya dengan menampilkan nilai sebagai teks bercahaya sampai pengguna
mulai mengetik di elemen tersebut.

<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Perhatian: Placeholder segera menghilang ketika pengguna mulai mengetik di sebuah elemen, sehingga mereka tidak untuk menggantikan label.  Placeholder sebaiknya digunakan sebagai bantuan untuk memandu pengguna mengenai format dan materi yang diperlukan.

### Gunakan metadata untuk mengaktifkan pelengkapan-otomatis

Pengguna menyukai ketika situs web mempercepat prosesnya dengan secara otomatis mengisi bidang
yang umum seperti nama, alamat email dan bidang lainnya yang sering digunakan, ditambah hal ini
membantu mengurangi potensi kesalahan masukan -- terutama pada keyboard virtual dan
perangkat kecil.

Browser menggunakan banyak heuristik untuk menentukan bidang mana yang bisa mereka
[isi-otomatis](https://support.google.com/chrome/answer/142893)
[berdasarkan data yang ditetapkan sebelumnya oleh pengguna](https://support.google.com/chrome/answer/142893),
dan Anda dapat memberikan petunjuk ke browser dengan menyediakan atribut `name` dan 
atribut `autocomplete` pada setiap elemen masukan.

Note: Chrome mengharuskan elemen `input` dibungkus dalam tag `<form>` untuk mengaktifkan
auto-complete. Jika elemen tidak dibungkus dengan tag `form`, Chrome akan memberikan
saran, namun **tidak** akan mengisi formulir.

Misalnya, untuk memberikan petunjuk ke browser bahwa itu harus melengkapi-otomatis formulir dengan
nama, alamat email dan nomor ponsel pengguna, Anda harus menggunakan:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### Masukan yang disarankan nilai atribut `name` dan `autocomplete`

Nilai atribut `autocomplete` adalah bagian dari [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill). Atribut `autocomplete` yang paling umum dipakai ditunjukkan di bawah ini.

Atribut `autocomplete` bisa disertai dengan nama bagian, seperti **`shipping `**`given-name` atau **`billing `**`street-address`. Browser akan otomatis mengisi bagian yang berbeda secara terpisah, dan bukan sebagai formulir berkelanjutan.

<table>
  <thead>
    <tr>
      <th data-th="Content type">Jenis materi</th>
      <th data-th="name attribute"> Atribut <code>name</code></th>
      <th data-th="autocomplete attribute"> Atribut <code>autocomplete</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">Nama</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (nama lengkap)</li>
          <li><code>given-name</code> (nama depan)</li>
          <li><code>additional-name</code> (nama tengah)</li>
          <li><code>family-name</code> (nama belakang)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Email</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Alamat</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>Untuk satu masukan alamat:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>Untuk dua masukan alamat:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (negara bagian atau propinsi)</li>
          <li><code>address-level2</code> (kota)</li>
          <li><code>postal-code</code> (kode pos)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Ponsel</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Kartu Kredit</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Nama pengguna</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Sandi</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code> (untuk formulir proses masuk)</li>
          <li><code>new-password</code> (untuk formulir pendaftaran dan perubahan-sandi)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


Note: Gunakan hanya <code>street-address</code> atau <code>address-line1</code> dan <code>address-line2</code>. <code>address-level1</code> dan <code>address-level2</code> hanya diperlukan jika mereka dibutuhkan untuk format alamat Anda.


### Atribut `autofocus`

Pada beberapa formulir, misalnya laman beranda Google dengan satu-satunya hal yang Anda ingin
pengguna lakukan adalah mengisi bidang tertentu, Anda bisa menambahkan atribut `autofocus`
.  Bila disetel, browser desktop segera memindahkan fokus ke bidang
masukan, sehingga memudahkan pengguna untuk dengan cepat mulai menggunakan formulir.  Browser
seluler mengabaikan atribut `autofocus`, untuk mencegah keyboard muncul
secara acak.

Hati-hati menggunakan atribut autofocus karena akan mencuri fokus keyboard
dan berpotensi mencegah karakter backspace digunakan untuk
navigasi.


    <input type="text" autofocus ...>
    


## Menyediakan validasi real-time

Validasi data real-time tidak hanya membantu menjaga data Anda tetap bersih, namun juga membantu meningkatkan pengalaman pengguna.  Browser modern memiliki beberapa alat bawaan untuk membantu menyediakan validasi data real-time dan bisa mencegah pengguna mengirimkan formulir yang tidak valid.  Isyarat visual sebaiknya digunakan untuk menunjukkan apakah formulir telah dilengkapi dengan baik.


### TL;DR {: .hide-from-toc }
- Manfaatkan atribut validasi bawaan browser seperti <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code>, dll.
- Gunakan JavaScript dan Constraints Validation API untuk persyaratan validasi yang lebih kompleks.
- Tampilkan kesalahan validasi secara real time, dan jika pengguna mencoba untuk mengirimkan formulir yang tidak valid, tunjukkan semua bidang yang harus mereka perbaiki.


### Gunakan atribut ini untuk memvalidasi masukan

#### Atribut `pattern`

Atribut `pattern` menentukan [ekspresi reguler](https://en.wikipedia.org/wiki/Regular_expression)
yang digunakan untuk memvalidasi sebuah bidang masukan. Misalnya, untuk memvalidasi kode pos AS
(5 digit, kadang-kadang diikuti dengan tanda hubung dan 4 digit tambahan), kita akan
menyetel `pattern` seperti ini:


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### Pola ekspresi reguler umum

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Ekspresi reguler</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">Alamat pos</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">Kode Pos (AS)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Alamat IP (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Alamat IP (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Alamat IP (keduanya)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Nomor Kartu Kredit</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Nomor Jaminan Sosial</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Nomor Telepon Amerika Utara</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### Atribut `required`

Jika terdapat atribut `required`, maka bidang harus berisi nilai sebelum
formulir bisa dikirimkan. Misalnya, untuk membuat kode pos yang diperlukan, kita
cukup menambahkan atribut yang dibutuhkan:


    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

#### Atribut `min`, `max` dan `step`

Untuk jenis masukan numerik seperti nomor atau jarak serta masukan tanggal/waktu, Anda
bisa menentukan nilai minimum dan maksimum, serta berapa seharusnya nilai mereka setiap terjadi
kenaikan/penurunan ketika diselaraskan dengan slider atau spinner.  Misalnya, masukan
ukuran sepatu akan menyetel ukuran minimal 1 dan ukuran maksimal 13, dengan kenaikan bertahap
0,5


    <input type="number" min="1" max="13" step="0.5" ...>
    

#### Atribut `maxlength`

Atribut `maxlength` bisa digunakan untuk menentukan panjang maksimal masukan atau
kotak teks dan akan bermanfaat ketika Anda ingin membatasi panjang informasi yang bisa diberikan
pengguna. Misalnya, jika Anda ingin membatasi nama file sampai 12 karakter,
Anda bisa menggunakan atribut berikut.


    <input type="text" id="83filename" maxlength="12" ...>
    

#### Atribut `minlength`

Atribut `minlength` bisa digunakan untuk menentukan panjang minimal masukan atau
kotak teks dan akan bermanfaat ketika Anda ingin menetapkan panjang minimal yang harus diberikan
pengguna. Misalnya, jika Anda ingin menetapkan bahwa nama file memerlukan setidaknya
8 karakter, Anda bisa menggunakan atribut berikut.


    <input type="text" id="83filename" minlength="8" ...>
    

#### Atribut `novalidate`

Pada beberapa kejadian, Anda mungkin mau mengizinkan pengguna untuk mengirimkan formulir bahkan jika itu
berisi masukan yang tidak valid. Untuk melakukan ini, tambahkan atribut `novalidate` ke elemen
formulir, atau bidang masukan individual. Dalam kejadian ini, semua kelas-semu dan
JavaScript API tetap akan memperbolehkan Anda untuk memeriksa apakah formulir divalidasi.


    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


Berhasil: Bahkan dengan validasi masukan sisi-klien, validasi data pada server tetap penting untuk memastikan konsistensi dan keamanan data Anda.

### Gunakan JavaScript untuk validasi real-time yang lebih kompleks

Ketika validasi bawaan ditambah ekspresi reguler tidak mencukupi, Anda bisa menggunakan
[Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
alat yang efektif untuk menangani validasi khusus.  API memungkinkan Anda untuk melakukan hal-hal
seperti menyetel kesalahan khusus, memeriksa apakah suatu elemen valid, dan menentukan
alasan sehingga sebuah elemen tidak valid:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Constraint Validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Mengatur pesan validasi khusus dan properti  <code>customError</code> dari objek <code>ValidityState</code> ke <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Mengembalikan string dengan alasan masukan gagal dalam tes validasi.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Mengembalikan <code>true</code> jika elemen memenuhi semua persyaratan, dan <code>false</code> jika sebaliknya. Memutuskan bagaimana laman merespons ketika pengecekan mengembalikan <code>false</code> diserahkan ke developer.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">Mengembalikan <code>true</code> jika elemen memenuhi semua persyaratan, dan <code>false</code> jika sebaliknya. Ketika laman merespons <code>false</code>, masalah batasan dilaporkan ke pengguna.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Mengembalikan sebuah objek <code>ValidityState</code> mewakili status validitas dari elemen.</td>
    </tr>
  </tbody>
</table>



### Menyetel pesan validasi khusus

Jika suatu bidang gagal divalidasi, gunakan `setCustomValidity()` untuk menandai bidang tersebut sebagai tidak valid
dan menjelaskan mengapa bidang tidak divalidasi.  Misalnya, formulir pendaftaran mungkin
meminta pengguna untuk mengonfirmasi alamat email mereka dengan memasukkannya dua kali.  Gunakan kejadian
blur pada masukan kedua untuk memvalidasi dua masukan tersebut dan menyetel respons
yang tepat.  Misalnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Mencegah pengiriman formulir pada formulir tidak valid

Oleh karena tidak semua browser akan mencegah pengguna mengirimkan formulir jika ada data
yang tidak valid, Anda harus menangkap kejadian pengiriman, dan menggunakan `checkValidity()`
pada elemen formulir untuk menentukan apakah formulir tersebut valid.  Misalnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Menampilkan umpan balik secara real-time

Akan lebih baik lagi jika memberikan indikasi visual pada masing-masing bidang yang menunjukkan apakah
pengguna telah menyelesaikan formulir dengan benar sebelum mereka mengirimkannya.
HTML5 juga memperkenalkan beberapa kelas-semu baru yang bisa digunakan untuk memberikan gaya
masukan berdasarkan nilai atau atribut mereka.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Masukan Real-time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Secara eksplisit menetapkan gaya bagi masukan untuk digunakan saat nilai memenuhi semua persyaratan validasi.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Secara eksplisit menetapkan gaya bagi masukan untuk digunakan saat nilai tidak memenuhi semua persyaratan validasi.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Secara eksplisit menetapkan gaya untuk elemen masukan yang memiliki set atribut yang diperlukan.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Secara eksplisit menetapkan gaya untuk elemen masukan yang tidak memiliki set atribut yang diperlukan.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Secara eksplisit menyetel gaya untuk elemen masukan nomor dengan nilai dalam jangkauan.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Secara eksplisit menyetel gaya untuk elemen masukan nomor dengan nilai di luar jangkauan.</td>
    </tr>
  </tbody>
</table>

Validasi terjadi secara langsung yang berarti bahwa ketika laman dimuat, bidang
mungkin ditandai sebagai tidak valid, meskipun pengguna belum memiliki kesempatan untuk
mengisinya.  Ini juga berarti bahwa ketika pengguna mengetik, ada kemungkinan mereka akan melihat
gaya tidak valid saat mengetik. Untuk mencegah hal ini, Anda bisa memadukan CSS dengan
JavaScript untuk hanya menampilkan penataan gaya yang tidak valid ketika pengguna telah mengunjungi bidang.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


Berhasil: Anda harus langsung menunjukkan kepada pengguna semua masalah pada formulir, bukannya menunjukkan satu per satu.




{# wf_devsite_translation #}
