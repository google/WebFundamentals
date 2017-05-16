project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay memungkinkan pembelian online sederhana dan aman serta menghapus kebutuhan bagi pengguna untuk mengingat dan memasukkan informasi pembayaran secara manual. Integrasikan Android Pay untuk meraup jutaan pengguna Android, mendorong konversi lebih tinggi, dan memberi pengguna pengalaman checkout satu sentuhan sesungguhnya.

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# Mengintegrasikan Android Pay ke Payment Request {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay memungkinkan pembelian online sederhana dan aman serta menghapus
kebutuhan bagi pengguna untuk mengingat dan memasukkan informasi pembayaran secara manual.
Integrasikan Android Pay untuk meraup jutaan pengguna Android, mendorong konversi
lebih tinggi, dan memberi pengguna pengalaman checkout satu sentuhan sesungguhnya.

**Sederhana:** Menerima Android Pay itu mudah dan tidak memerlukan perubahan terhadap pemrosesan
pembayaran Anda. Platform
[gerbang pembayaran](/android-pay/) dan
pemrosesan terkemuka juga menambah dukungan untuk memudahkan
para developer untuk mengaktifkan Android Pay.

**Aman:** Android Pay bekerja secara aman dengan menyimpan nomor akun virtual
yang mengarahkan ke rekening pembayaran pengguna.  Ini memungkinkan pembelian online tanpa
pengguna harus mengirimkan nomor kartu debit atau kartu kreditnya secara nyata.  Android Pay
mengenkripsi setiap transaksi pembayaran, menjaga data pengguna Anda tetap aman.

**Dukungan:** Android Pay didukung di sejumlah negara berkembang dan oleh
mayoritas jaringan dan bank kartu kredit, serta tersedia di semua
Ponsel Android dengan prosesor KitKat dan yang lebih tinggi. Harap mengacu kepada
[laman pusat bantuan](https://support.google.com/androidpay/answer/6314169) ini untuk
melengkapi dokumentasi tentang ketersediaan berdasarkan negara dan jenis kartu.

## Cara kerjanya

<style>
.figures {
  display: flex;
  flex-wrap: wrap;
}
figure {
  flex-basis: 240px;
  margin: 10px 5px;
  text-align: center;
  float: left;
}
</style>

<div class="figures">
  <figure>
    <img src="images/how_it_works_1.png">
    <figcaption>1. Tekan "Checkout".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. Payment Request UI muncul.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. Pilih metode pembayaran, dll., dan tekan "Pay".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. Saat aplikasi Android Pay muncul, klik untuk melanjutkan (pengguna mungkin diminta untuk membuka kunci ponsel / mengautentikasi dengan sidik jari)</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. Checkout selesai.</figcaption>
  </figure>
</div>

## Bersiap-siap

### Pengetahuan yang diperlukan

* Karena Android Pay di Chrome menggunakan PaymentRequest API, penting untuk membiasakan diri Anda dengan [panduan integrasi](.) sebelum melanjutkan.
* Bahkan jika Anda bukan developer Android, panduan ini berguna agar Anda mengenal [Android Pay in-app API](/android-pay/android/tutorial). Karena respons yang dikembalikan oleh Android Pay sama pada Android dan Chrome, informasi tentang penanganan respons menjadi penting.
* Tinjau Android Pay yang terperinci [kebijakan materi](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1) guna memastikan barang dan jasa spesifik Anda didukung.

### Menyiapkan lingkungan

* Pastikan Anda memiliki aplikasi Android Pay yang terpasang di perangkat Anda. Anda harus berada di salah satu negara yang didukung untuk memasangnya. Lihat [android.com/pay](https://www.android.com/pay/){: .external } untuk melihat apakah negara Anda didukung.
* Untuk pengujian, Anda perlu [menambahkan kartu kredit](https://support.google.com/androidpay/answer/6289372) ke Android Pay di perangkat Anda.
* Daftar Untuk Android Pay
    * Tambahkan perusahaan Anda, asal lokasi, dan email perusahaan dll. menggunakan [formulir ini.](https://androidpay.developers.google.com/signup)
* Pastikan bahwa [gerbang / prosesor pembayaran Anda mendukung token Android Pay](/android-pay/#processors).
* Dapatkan sepasang tombol yang digunakan untuk mengenkripsi respons dari Android Pay jika Anda menggunakan [pendekatan token jaringan](#integration-using-network-token).
    * Google menyarankan agar Anda bekerja sama dengan prosesor pembayaran Anda guna memperoleh kunci publik. Kunci ini menyederhanakan proses karena prosesor Anda akan mampu menangani dekripsi Android Pay Payload. Cari informasi selengkapnya pada dokumentasi prosesor pembayaran.
    * Jika Anda ingin menangani enkripsi sendiri, lihat [Kriptografi Token Pembayaran](/android-pay/integration/payment-token-cryptography) untuk menghasilkan kunci Enkripsi Terintegrasi Kurva Eliptik dienkode base64.

## Mengintegrasikan Android Pay ke dalam Payment Request
dengan Android Pay untuk Payment Request API, Anda akan meminta salah satu dari dua jenis token pembayaran: gerbang atau jaringan. Jika Anda menggunakan Braintree, Stripe, atau Vantiv sebagai gerbang pembayaran Anda, maka Anda dapat meminta token gerbang dari Android Pay. Atau, Anda dapat meminta bundel token jaringan yang dienkripsi. Anda mungkin dapat menangani token jaringan sendiri atau bekerja dengan prosesor Anda untuk menangani mendekripsi bundel token.

### Pendekatan Token Gerbang
Android Pay tidak memroses pembayaran. Penjual akan tetap perlu memanggil gerbang API untuk membebankan/memroses token gerbang yang dikembalikan dari Android Pay.

Android Pay API akan mengembalikan gerbang token. Ini adalah alur yang disarankan jika Anda menggunakan Braintree, Stripe, atau Vantiv.

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### Pendekatan Token Jaringan
Android Pay API akan mengembalikan bundel token jaringan yang dienkripsi. Anda mungkin harus mendekripsi token sendiri atau memanfaatkan API prosesor Anda untuk menangani dekripsi dan membebankan token.

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## Integrasi menggunakan Token Gerbang
Contoh berikut menggarisbawahi cara meminta token langsung dari gerbang pembayaran Anda. Dalam contoh, kami menggarisbawahi cara meminta token Stripe. Jika Anda menggunakan gerbang pembayaran lain seperti Braintree atau Vantiv, harap hubungi prosesor Anda untuk parameter spesifik gerbang pembayaran.

Dalam meminta token gerbang, Android Pay melakukan panggilan ke prosesor Anda atas nama Anda dan mengembalikan token gerbang yang dibebankan.

#### Parameter


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          // Credit Cards allowed via Android Pay
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'GATEWAY_TOKEN',
            parameters: {
              'gateway': 'stripe',
              // Place your own Stripe publishable key here.
              'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
              'stripe:version': '2016-07-06'
            }
          }
        }
      }
    ];


Untuk menggunakan Android Pay dengan pendekatan token gerbang, tambahkan objek JSON yang berisi parameter berikut per contoh di atas.

* `supportedMethods: [ 'https://android.com/pay' ]`: Tunjukkan ini adalah metode pembayaran menggunakan Android Pay.
* `data`: Ini adalah nilai spesifik Android Pay yang belum distandardisasikan.
    * `merchantId`: ID Penjual Android Pay diperoleh dengan [mendaftar ke Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Tambahkan proses ini jika Anda menguji dengan Android Pay. Token gerbang yang dihasilkan akan menjadi tidak valid.
    * `allowedCardNetworks`: Sediakan larik jaringan kartu kredit yang menyusun respons Android Pay yang valid. Jaringan kartu yang diterima adalah "AMEX", "DISCOVER", "MASTERCARD", dan "VISA".
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType`: 'GATEWAY_TOKEN': Menunjukkan Anda sedang mengambil pendekatan token gerbang.
        * `parameters`: Parameter spesifik gerbang pembayaran. Lihat ke dokumentasi gerbang pembayaran spesifik.

#### Menangani respons Android Pay
Setelah Anda menambahkan objek Android Pay, Chrome akan meminta token gerbang yang dibebankan.

    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


Respons dari PaymentRequest akan berisi informasi pengiriman dan informasi kontak seperti di dalam contoh yang ada di [panduan integrasi PaymentRequest](.), namun kini mencakup respons tambahan dari Android Pay yang berisi

* Informasi alamat tagihan
* Informasi kontak
* Informasi tentang alat pembayaran
* Detail tentang token pembayaran

Cara Anda menangani token gerbang yang dikirimkan tergantung pada gerbang pembayaran. Harap lihat dokumentasi gerbang spesifik untuk informasi selengkapnya.

#### Menggabungkan semuanya


    function onBuyClicked() {
      const ANDROID_PAY = 'https://android.com/pay';

      if (!window.PaymentRequest) {
        // PaymentRequest API is not available. Forwarding to
        // legacy form based experience.
        location.href = '/checkout';
        return;
      }

      var supportedInstruments = [
        {
          supportedMethods: [
            'visa', 'mastercard', 'amex', 'discover', 'maestro',
            'diners', 'jcb', 'unionpay', 'bitcoin'
          ]
        },
        {
          supportedMethods: [ ANDROID_PAY ],
          data: {
            merchantId: '02510116604241796260',
            environment: 'TEST',
            allowedCardNetwork: [ 'AMEX', 'MASTERCARD', 'VISA', 'DISCOVER' ],
            paymentMethodTokenizationParameters: {
              tokenizationType: 'GATEWAY_TOKEN',
              parameters: {
                'gateway': 'stripe',
                'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
                'stripe:version': '2016-07-06'
              }
            }
          }
        }
      ];

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

    document.querySelector('#start').addEventListener('click', onBuyClicked);


### Integrasi menggunakan Token Jaringan
Meminta token jaringan memerlukan dua informasi yang harus dimasukkan ke dalam PaymentRequest.

1. `merchantId` diperoleh pada pendaftaran
1. `publicKey` yang diteruskan sebagai bagian dari `paymentMethodTokenizationParameters`

#### Parameter


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'NETWORK_TOKEN',
            parameters: {
              //public key to encrypt response from Android Pay
              'publicKey': 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
            }
          }
        }
      }
    ];


Untuk menggunakan Android Pay dengan pendekatan token jaringan, tambahkan objek JSON yang berisi parameter berikut per contoh di atas.

* `supportedMethods: [ 'https://android.com/pay' ]`: Tunjukkan ini adalah metode pembayaran menggunakan Android Pay.
* `data`:
    * `merchantId`: ID Penjual Android Pay diperoleh dengan [mendaftar ke Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Tambahkan proses ini jika Anda menguji dengan Android Pay. Token yang dihasilkan akan menjadi tidak valid.  Untuk lingkungan produksi, buang garis ini.
    * `allowedCardNetworks`: Sediakan larik jaringan kartu kredit yang menyusun respons Android Pay yang valid.
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType: 'NETWORK_TOKEN'`: Menunjukkan Anda sedang mengambil pendekatan token jaringan.
        * `parameters`: Publik kunci yang diperlukan untuk menerima token jaringan. (Lihat [Cara menghasilkan kunci enkripsi](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload).)

#### Menangani respons Android Pay
Setelah Anda menambahkan objek Android Pay, Chrome akan meminta token jaringan yang dibebankan.


    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


Respons yang dienkripsi dari PaymentRequest akan berisi informasi pengiriman dan informasi kontak seperti di dalam contoh yang ada di [panduan integrasi PaymentRequest](.), namun kini mencakup respons tambahan dari Android Pay yang berisi

* Informasi kartu kredit yang ditokenisasi
* Informasi alamat tagihan
* Informasi tentang alat pembayaran
* Detail tentang token pembayaran

Untuk integrasi token jaringan yang lebih sederhana, kami menyarankan untuk meneruskan payload yang dienkripsi ke gerbang pembayaran Anda dan mengizinkannya untuk menangani dekripsi.  Mendekripsi payload sendiri lebih rumit dan melibatkan pengelolaan kunci pribadi.  Harap hubungi gerbang pembayaran Anda untuk melihat apakah fungsi ini tersedia.

Cara Anda menangani token jaringan yang dikirimkan tergantung pada gerbang pembayaran. Harap lihat dokumentasi gerbang spesifik untuk informasi selengkapnya.

Contoh kode dihilangkan di sini, karena tidak ada perbedaan dengan pendekatan token gerbang kecuali dalam mengonstruksikan objek PaymentRequest.


{# wf_devsite_translation #}
