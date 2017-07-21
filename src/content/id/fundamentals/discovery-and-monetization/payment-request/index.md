project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Payment Request API adalah untuk pembayaran yang cepat dan mudah di web.

{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2017-07-12 #}

# Payment Request API: Panduan Integrasi {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Dogfood: `PaymentRequest` masih dalam tahap development. Walaupun kami menganggapnya
cukup stabil untuk diimplementasikan, mungkin saja terus berubah. Kami akan tetap memperbarui laman ini agar
selalu merefleksikan status API saat ini ([perubahan M56](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)).
Sementara itu, untuk melindungi Anda dari perubahan API yang mungkin
tidak kompatibel ke belakang, kami menawarkan [sisipan](https://storage.googleapis.com/prshim/v1/payment-shim.js)
yang bisa disematkan pada situs Anda. Sisipan ini akan menutupi perbedaan API
untuk dua versi Chrome utama.


Membeli barang secara online memang praktis namun sering kali menjadi pengalaman yang mengecewakan, khususnya pada perangkat seluler. Walaupun lalu lintas seluler terus meningkat, akun konversi seluler hanya sekitar sepertiga dari semua pembelian yang diselesaikan. Dengan kata lain, pengguna meninggalkan pembelian lewat seluler dua kali lebih sering daripada pembelian lewat desktop. Mengapa?

![](images/1_why_users_abandon.png)

*Mengapa pengguna meninggalkan formulir pembelian lewat seluler*

Formulir pembelian online adalah intensif-pengguna, sulit digunakan, lambat dimuat dan disegarkan, serta perlu banyak langkah untuk menyelesaikannya. Ini karena kedua komponen utama pembayaran online&mdash;keamanan dan kenyamanan&mdash;sering kali berbenturan; mengutamakan yang satu berarti mengalahkan yang lain.

Kebanyakan masalah yang menyebabkan pengabaian bisa langsung dilacak ke formulir pembelian. Setiap aplikasi atau situs memiliki entri data dan proses validasinya sendiri, dan pengguna sering kali merasa mereka harus memasukkan informasi yang sama pada setiap titik pembelian di aplikasi. Juga, developer aplikasi berusaha membuat alur pembelian yang mendukung beberapa metode pembayaran berbeda sekaligus; bahkan perbedaan kecil dalam persyaratan metode pembayaran bisa memperumit penyelesaian formulir dan proses penyerahannya.

Sistem apa saja yang memperbaiki atau memecahkan satu atau beberapa masalah itu akan menjadi perubahan yang disambut baik. Kita sudah mulai memecahkan masalah dengan [Isiotomatis](/web/updates/2015/06/checkout-faster-with-autofill), namun kita ingin membicarakan tentang solusi yang lebih komprehensif.

## Memperkenalkan Payment Request API {: #introducing }

Payment Request API adalah sistem yang dimaksudkan untuk *meniadakan formulir pemeriksaan*. Ini sangat memperbaiki alur kerja pengguna selama proses pembelian, sehingga memberikan pengalaman pengguna yang konsisten dan memungkinkan para penjual di web dengan mudah memanfaatkan metode pembayaran yang berbeda-beda. Payment Request API bukanlah metode pembayaran baru, tidak juga berintegrasi langsung dengan pemroses pembayaran; melainkan, layer proses yang bertujuan:

* Memungkinkan browser bertindak sebagai perantara antara penjual, pengguna, dan metode pembayaran
* Untuk menstandarkan alur komunikasi pembayaran sebanyak mungkin
* Untuk mendukung dengan mulus beragam metode pembayaran yang aman
* Agar bekerja di browser, perangkat, atau platform apa pun&mdash;seluler atau yang lain

Payment Request API adalah standar terbuka dan lintas-browser yang menggantikan alur checkout tradisional yang memungkinkan penjual meminta dan menerima pembayaran dalam satu panggilan API. Payment Request API memungkinkan laman web bertukar informasi dengan agen-pengguna selagi pengguna memberikan masukan, sebelum menyetujui atau menolak permintaan pembayaran.

Yang terpenting, dengan browser berfungsi sebagai perantara, semua informasi yang diperlukan untuk checkout cepat bisa disimpan di browser, sehingga pengguna bisa tinggal mengonfirmasikan dan membayar, cukup dengan satu klik.

### Proses transaksi pembayaran {: #transaction-process }
Menggunakan Payment Request API, proses transaksi berjalan semulus mungkin untuk pengguna dan penjual.

![](images/4_the_payment_transaction_process.png)

*Proses transaksi pembayaran*

Prosesnya dimulai saat situs penjual membuat `PaymentRequest` baru dan meneruskan semua informasi yang diperlukan ke browser untuk melakukan pembayaran: jumlah yang akan dibebankan, mata uang yang diharapkan pembayaran, dan metode pembayaran yang diterima oleh situs tersebut. Browser akan menentukan kompatibilitas antara metode pembayaran yang diterima untuk situs dan metode yang dipasang pengguna di perangkat target.

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>


Kemudian browser menampilkan UI pembayaran kepada pengguna, yang memilih metode pembayaran dan mengesahkan transaksi. Metode pembayaran bisa sepraktis kartu kredit yang sudah disimpan oleh browser, atau serahasia aplikasi pihak ketiga yang ditulis khusus untuk menyerahkan pembayaran ke situs (fungsionalitas ini sebentar lagi tersedia). Setelah pengguna mengesahkan transaksi, semua detail pembayaran yang diperlukan akan langsung dikirim kembali ke situs. Misalnya, untuk pembayaran dengan kartu kredit, situs akan mengambil kembali nomor kartu, nama pemegang kartu, tanggal kedaluwarsa, dan CVC.

PaymentRequest juga bisa diperluas untuk mengembalikan informasi tambahan, seperti alamat dan opsi pengiriman, email pembayar, dan telepon pembayar. Ini memungkinkan Anda mendapatkan semua informasi yang diperlukan untuk menuntaskan pembayaran tanpa menampilkan formulir checkout kepada pengguna.


Manfaat proses baru ini tiga kali lipat: dari sudut pandang pengguna, semua interaksi&mdash;permintaan, otorisasi, pembayaran, dan hasil membosankan sebelumnya&mdash;sekarang dilakukan hanya dalam satu langkah; dari sudut pandang situs web, ini hanya memerlukan satu panggilan JavaScript API; dari sudut pandang metode pembayaran, tidak ada perubahan proses apa pun.

<div style="clear:both;"></div>

## Menggunakan Payment Request API {: #using }

### Muat sisipan Payment Request API

Untuk mengurangi penderitaan mengejar API standar hidup ini, kami sangat
menyarankan Anda untuk menambahkan sisipan ini di bagian `<head>` pada kode. Sisipan ini
akan diperbarui begitu API berubah dan akan berusaha keras agar kode Anda tetap bekerja
setidaknya pada 2 rilis utama Chrome.


    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### Buat PaymentRequest {: #create-paymentrequest }

Langkah pertama adalah membuat objek [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) dengan memanggil konstruktor [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor). Langkah ini biasanya (namun tidak selalu) dikaitkan dengan tindakan yang diprakarsai pengguna, yang menunjukkan maksud mereka untuk melakukan pembelian. Objek tersebut dibuat menggunakan parameter berisi data yang diperlukan.

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*Konstruktor PaymentRequest*

#### Parameter methodData {: #methoddata-parameter }

Parameter `methodData` berisi daftar metode pembayaran yang didukung dan, jika relevan, informasi tambahan tentang metode pembayaran. Urutan ini berisi kamus-kamus `PaymentMethodData`, termasuk identifier standar yang dikaitkan dengan metode pembayaran yang ingin diterima oleh aplikasi, dan data spesifik metode pembayaran. Lihat [Arsitektur Payment Request API](https://w3c.github.io/browser-payment-api/specs/architecture.html) untuk detail selengkapnya.

Saat ini, `PaymentRequest` di Chrome hanya mendukung kartu kredit standar berikut: '`amex`', '`diners`', '`discover`', '`jcb`', '`maestro`', '`mastercard`', '`unionpay`', dan '`visa`'.


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*Data dan metode pembayaran*

#### Parameter details {: #details-parameter }

Parameter `details` berisi informasi tentang transaksi. Ada dua komponen utama: sebuah total, yang merefleksikan jumlah total dan mata uang yang akan digunakan, dan set opsional `displayItems` yang menunjukkan cara menghitung jumlah akhir. Parameter ini tidak dimaksudkan menjadi daftar item lini, namun melainkan rangkuman komponen utama pesanan: subtotal, diskon, pajak, biaya kirim, dll.

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Perlu diperhatikan bahwa Payment Request API tidak melakukan aritmetika. Yaitu, ia tidak dan tidak bisa memastikan bahwa komponen tampilan menjumlah dengan benar total jumlah yang harus dibayar. Penghitungan ini adalah tanggung jawab developer. Jadi Anda harus selalu memastikan bahwa jumlah item daftar sama dengan jumlah total. Juga, `PaymentRequest` tidak mendukung pengembalian uang, sehingga jumlahnya harus selalu positif (namun item daftar individual bisa berupa negatif, misalnya diskon).

Browser akan merender label seperti yang Anda definisikan dan secara otomatis merender format mata uang yang benar berdasarkan lokal pengguna. Perhatikan, label harus di-render dalam bahasa yang sama dengan materi Anda.

<div style="clear:both;"></div>

    var details = {
      displayItems: [
        {
          label: "Original donation amount",
          amount: { currency: "USD", value : "65.00" }, // US$65.00
        },
        {
          label: "Friends and family discount",
          amount: { currency: "USD", value : "-10.00" }, // -US$10.00
          pending: true // The price is not determined yet
        }
      ],
      total:  {
        label: "Total",
        amount: { currency: "USD", value : "55.00" }, // US$55.00
      }
    }


*Detail transaksi*

`pending` umumnya digunakan untuk menampilkan item seperti jumlah pajak atau pengiriman yang bergantung pada pemilihan alamat pengiriman atau opsi pengiriman. Chrome menunjukkan bidang tertunda pada UI untuk permintaan pembayaran.

Nilai berulang atau terhitung yang digunakan dalam `details` bisa ditetapkan baik sebagai literal string maupun variabel string individual.


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*Variabel-variabel PaymentRequest*

### Tampilkan PaymentRequest {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Aktifkan antarmuka `PaymentRequest` dengan memanggil metodenya [`show()`](https://www.w3.org/TR/payment-request/#show). Metode ini memanggil UI bawaan yang memungkinkan pengguna memeriksa detail pembelian, menambahkan atau mengubah informasi, dan terakhir, membayarnya. Sebuah [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (ditunjukkan oleh fungsi callback dan metode `then()`-nya) yang ditetapkan akan dikembalikan bila pengguna menerima atau menolak permintaan pembayaran.

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*Metode show PaymentRequest*

### Batalkan PaymentRequest {: #abort-paymentrequest }
Anda bisa dengan sengaja membatalkan `PaymentRequest` dengan memanggil metode [`abort()`](https://www.w3.org/TR/payment-request/#abort). Ini terutama berguna bila waktu sesi belanja telah habis atau item di keranjang telah terjual habis selama transaksi.

Gunakan metode ini jika aplikasi perlu membatalkan permintaan pembayaran setelah metode `show()` dipanggil namun sebelum promise diproses &mdash; Misalnya, jika sebuah item tidak lagi tersedia, atau pengguna gagal mengonfirmasi pembelian dalam waktu yang dialokasikan.

Jika Anda membatalkan permintaan, Anda perlu membuat instance baru `PaymentRequest` sebelum bisa memanggil lagi `show()`.


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*Metode batalkan PaymentRequest*

### Proses PaymentResponse {: # process-paymentresponse}
Dengan persetujuan pengguna untuk permintaan pembayaran, promise metode [`show()`](https://www.w3.org/TR/payment-request/#show) akan diproses, yang menghasilkan objek `PaymentResponse`.

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> memiliki bidang-bidang berikut:</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>String yang menunjukkan metode pembayaran yang dipilih (mis., visa)</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td>Kamus berisi informasi untuk <code>methodName</code></td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>Alamat pengiriman pengguna, jika diminta</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>ID opsi pengiriman yang dipilih, jika diminta</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>Alamat email pembayar, jika diminta</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>Nomor telepon pembayar, jika diminta</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>Nama pembayar, jika diminta</td>
</tr>
</table>


Untuk pembayaran dengan kartu kredit, responsnya standar. Untuk pembayaran dengan selain kartu kredit (mis., Android Pay), respons akan didokumentasikan oleh penyedia. Respons kartu kredit berisi kamus berikut:

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

Setelah informasi pembayaran diterima, aplikasi harus menyerahkan informasi pembayaran kepada pemroses pembayaran untuk diproses. UI akan menampilkan spinner saat permintaan terjadi. Bila respons telah kembali, aplikasi harus memanggil `complete()` untuk menutup UI.


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string, e.g. “visa”
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details
      };
      return fetch('/pay', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw 'Payment Error';
        }
      }).then(res => {
        paymentResponse.complete("success");
      }, err => {
        paymentResponse.complete("fail");
      });
    }).catch(err => {
      console.error("Uh oh, something bad happened", err.message);
    });


<div class="attempt-left">
  <figure>
    <img src="images/8_card_verified.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Metode [`complete()`](https://www.w3.org/TR/payment-request/#complete) akan memberi tahu agen-pengguna bahwa interaksi pengguna telah selesai dan mengizinkan aplikasi memberi tahu pengguna mengenai hasilnya dan menangani disposisi elemen UI selebihnya.

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*Metode complete PaymentRequest*

## Mengumpulkan alamat pengiriman {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Jika Anda penjual yang menjual barang fisik, Anda mungkin ingin mengumpulkan alamat pengiriman pengguna dengan menggunakan Payment Request API. Caranya adalah dengan menambahkan `requestShipping: true` ke parameter `options`. Bila telah menyetel parameter ini, "Shipping" akan ditambahkan ke UI, dan pengguna bisa memilih alamat yang telah disimpan dari daftar atau menambahkan alamat pengiriman baru.

Atau Anda bisa menggunakan "Delivery" atau "Pickup" sebagai ganti "Delivery" di UI dengan menetapkan `shippingType`. Hal ini semata-mata untuk keperluan tampilan.

<div style="clear:both;"></div>

Note: <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> harus berupa <code>undefined</code> atau larik kosong saat inisialisasi untuk menerima kejadian <code>shippingaddresschange</code>. Jika tidak maka kejadian tidak akan terpicu.


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*Opsi transaksi*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Opsi pengiriman bisa dihitung secara dinamis bila pengguna memilih atau menambahkan alamat pengiriman baru. Anda bisa menambahkan event listener untuk kejadian `shippingaddresschange`, yang akan memicu pemilihan alamat pengiriman oleh pengguna. Anda nanti bisa memvalidasi kesanggupan mengirim ke alamat itu, menghitung opsi pengiriman, dan memperbarui [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions` Anda dengan opsi pengiriman baru dan informasi harga. Anda bisa menawarkan opsi pengiriman default dengan menyetel `selected` ke `true` pada sebuah opsi.

Untuk menolak alamat karena alasan seperti region yang tidak didukung, teruskan larik kosong ke `details.shippingOptions`. UI akan memberi tahu pengguna bahwa alamat yang dipilih tidak bisa digunakan untuk pengiriman.

<div style="clear:both;"></div>

Note: Memproses kejadian <code>shippingaddresschange</code> dan membiarkan <code>details.shippingOptions</code> sebagai larik kosong juga berarti mengatasi penolakan (dengan kata lain Anda tidak bisa mengirim ke lokasi itu). Selalu pastikan opsi pengiriman Anda diperbarui dan cocok dengan alamat apa saja yang diberikan pengguna.


    request.addEventListener('shippingaddresschange', e => {
      e.updateWith(((details, addr) => {
        if (addr.country === 'US') {
          var shippingOption = {
            id: '',
            label: '',
            amount: {currency: 'USD', value: '0.00'},
            selected: true
          };
          if (addr.region === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          } else {
            shippingOption.id = 'others';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          }
          if (details.displayItems.length === 2) {
            details.displayItems.splice(1, 0, shippingOption);
          } else {
            details.displayItems.splice(1, 1, shippingOption);
          }
          details.shippingOptions = [shippingOption];
        } else {
          details.shippingOptions = [];
        }
        return Promise.resolve(details);
      })(details, request.shippingAddress));
    });



<div class="attempt-right">
  <figure>
    <img src="images/10_shipping_address.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Dengan persetujuan pengguna untuk permintaan pembayaran, promise metode [`show()`](https://www.w3.org/TR/payment-request/#show) memberi solusi. Aplikasi boleh menggunakan properti `.shippingAddress` objek [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) untuk memberitahukan alamat pengiriman kepada pemroses pembayaran, bersama properti lainnya.

<div style="clear:both;"></div>


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON()
      };
      // Send information to the server
    });



## Menambahkan opsi pengiriman {: #shipping-options}
Jika layanan Anda memungkinkan pengguna untuk memilih opsi pengiriman seperti "gratis", "standar", atau "kilat", Anda juga bisa melakukannya melalui UI Payment Request. Untuk menawarkan pilihan tersebut, tambahkan properti [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) dan opsinya ke objek `details`. Dengan menyetel satu pilihan ke `selected: true`, UI akan merendernya sebagai telah terpilih (berarti jumlah total Anda harus merefleksikan harga untuk opsi pengiriman itu).


    var details = {
      total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
      displayItems: [
        {
          label: 'Original donation amount',
          amount: {currency: 'USD', value: '65.00'}
        },
        {
          label: 'Friends and family discount',
          amount: {currency: 'USD', value: '-10.00'}
        }
      ],
      shippingOptions: [
        {
          id: 'standard',
          label: 'Standard shipping',
          amount: {currency: 'USD', value: '0.00'},
          selected: true
        },
        {
          id: 'express',
          label: 'Express shipping',
          amount: {currency: 'USD', value: '12.00'}
        }
      ]
    };
    var request = new PaymentRequest(methodData, details, options);


Note: Sebagaimana disebutkan sebelumnya, <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> harus berupa <code>undefined</code> atau larik kosong saat inisialisasi agar dapat menerima kejadian <code>shippingaddresschange</code>. Atur nilai ini saat inisialisasi hanya bila opsi pengiriman tidak akan berubah berdasarkan alamat (misalnya pengiriman gratis internasional).

Mengubah opsi pengiriman mungkin akan menghasilkan harga yang berbeda. Untuk menambahkan ongkos kirim dan mengubah total harga, Anda dapat menambahkan event listener untuk kejadian `shippingoptionchange`, yang akan terpicu saat pengguna memilih opsi pengiriman, sehingga Anda bisa menjalankan pemeriksaan terprogram terhadap data opsi. Anda juga dapat mengubah ongkos kirim sesuai alamat pengiriman.


    request.addEventListener('shippingoptionchange', e => {
      e.updateWith(((details, shippingOption) => {
        var selectedShippingOption;
        var otherShippingOption;
        if (shippingOption === 'standard') {
          selectedShippingOption = details.shippingOptions[0];
          otherShippingOption = details.shippingOptions[1];
          details.total.amount.value = '55.00';
        } else {
          selectedShippingOption = details.shippingOptions[1];
          otherShippingOption = details.shippingOptions[0];
          details.total.amount.value = '67.00';
        }
        if (details.displayItems.length === 2) {
          details.displayItems.splice(1, 0, selectedShippingOption);
        } else {
          details.displayItems.splice(1, 1, selectedShippingOption);
        }
        selectedShippingOption.selected = true;
        otherShippingOption.selected = false;
        return Promise.resolve(details);
      })(details, request.shippingOption));
    });


<div class="attempt-right">
  <figure>
    <img src="images/11_shipping_options.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Dengan persetujuan pengguna untuk permintaan pembayaran, promise metode [`show()`](https://www.w3.org/TR/payment-request/#show) memberi solusi. Aplikasi dapat menggunakan properti `.shippingOption` objek [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) untuk memberi tahu opsi pengiriman kepada pemroses pembayaran, bersama properti lainnya.

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option
        shippingOption: paymentResponse.shippingOption
      };
      // Send information to the server
    });



## Menambahkan informasi kontak opsional {: #contact-information}
Anda juga bisa mengumpulkan alamat email pengguna, nomor telepon, atau nama dengan mengonfigurasi objek `options`.


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>Antarmuka Permintaan Pembayaran</figcaption>
  </figure>
</div>

Dengan persetujuan pengguna untuk permintaan pembayaran, promise metode [`show()`](https://www.w3.org/TR/payment-request/#show) memberi solusi. Aplikasi dapat menggunakan `.payerPhone`, `.payerEmail` dan/atau properti `.payerName` objek [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) untuk memberi tahu pemroses pembayaran mengenai pilihan pengguna, bersama properti lainnya.

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option string
        shippingOption: paymentResponse.shippingOption,
        // payer's phone number string
        phone: paymentResponse.payerPhone,
        // payer's email address string
        email: paymentResponse.payerEmail,
        // payer's name string
        name: paymentResponse.payerName
      };
      // Send information to the server
    });



## Membuat PaymentRequest sebagai penyempurnaan progresif {: #request-progressive}
Karena Payment Request API adalah fitur yang berkembang, banyak browser yang belum mendukungnya. Untuk menentukan apakah fitur ini tersedia, buat kueri `window.PaymentRequest`.


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

Note: Sebaiknya sediakan tautan normal untuk proses pemeriksaan biasa. Kemudian gunakan JavaScript untuk mencegah navigasi jika PaymentRequest didukung.

## Menyatukan semuanya {: #putting-them-together}


    function onBuyClicked(event) {
      if (!window.PaymentRequest) {
        return;
      }
      // Payment Request API is available.
      // Stop the default anchor redirect.
      event.preventDefault();

      var supportedInstruments = [{
        supportedMethods: [
          'visa', 'mastercard', 'amex', 'discover', 'maestro',
          'diners', 'jcb', 'unionpay', 'bitcoin'
        ]
      }];

      var details = {
        displayItems: [{
          label: 'Original donation amount',
          amount: { currency: 'USD', value: '65.00' }
        }, {
          label: 'Friends and family discount',
          amount: { currency: 'USD', value: '-10.00' }
        }],
        total: {
          label: 'Total due',
          amount: { currency: 'USD', value : '55.00' }
        }
      };

      var options = {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true
      };

      // Initialization
      var request = new PaymentRequest(supportedInstruments, details, options);

      // When user selects a shipping address
      request.addEventListener('shippingaddresschange', e => {
        e.updateWith(((details, addr) => {
          var shippingOption = {
            id: '',
            label: '',
            amount: { currency: 'USD', value: '0.00' },
            selected: true
          };
          // Shipping to US is supported
          if (addr.country === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          // Shipping to JP is supported
          } else if (addr.country === 'JP') {
            shippingOption.id = 'jp';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          // Shipping to elsewhere is unsupported
          } else {
            // Empty array indicates rejection of the address
            details.shippingOptions = [];
            return Promise.resolve(details);
          }
          // Hardcode for simplicity
          if (details.displayItems.length === 2) {
            details.displayItems[2] = shippingOption;
          } else {
            details.displayItems.push(shippingOption);
          }
          details.shippingOptions = [shippingOption];

          return Promise.resolve(details);
        })(details, request.shippingAddress));
      });

      // When user selects a shipping option
      request.addEventListener('shippingoptionchange', e => {
        e.updateWith(((details) => {
          // There should be only one option. Do nothing.
          return Promise.resolve(details);
        })(details));
      });

      // Show UI then continue with user payment info
      request.show().then(result => {
        // POST the result to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(res => {
          // Only if successful
          if (res.status === 200) {
            return res.json();
          } else {
            throw 'Failure';
          }
        }).then(response => {
          // You should have received a JSON object
          if (response.success == true) {
            return result.complete('success');
          } else {
            return result.complete('fail');
          }
        }).then(() => {
          console.log('Thank you!',
              result.shippingAddress.toJSON(),
              result.methodName,
              result.details.toJSON());
        }).catch(() => {
          return result.complete('fail');
        });
      }).catch(function(err) {
        console.error('Uh oh, something bad happened: ' + err.message);
      });
    }

    // Assuming an anchor is the target for the event listener.
    document.querySelector('#start').addEventListener('click', onBuyClicked);



{# wf_devsite_translation #}
