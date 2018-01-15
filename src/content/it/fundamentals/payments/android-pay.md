project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay enables simple and secure purchases online and
eliminates the need for users to remember and manually enter their payment
information. Integrate Android Pay to reach millions of Android users, drive
higher conversion, and give users a true one-touch checkout experience.

{# wf_blink_components: Blink>Payments #}
{# wf_updated_on: 2018-01-10 #}
{# wf_published_on: 2016-09-07 #}

# Integrating Android Pay into Payment Request {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Warning: Android Pay is now Pay with Google and provides access to payment
tokens on the device and credit and debit cards from a user's Google account. To
learn more about Pay with Google, read [Google Pay API](/payments/) docs.

Android Pay consente acquisti online semplici e sicuri ed elimina la necessità
per gli utenti di ricordare e inserire manualmente i propri dati di pagamento.
Integra Android Pay per raggiungere milioni di utenti Android, incrementare le
conversioni e offrire agli utenti una vera esperienza di pagamento one-touch.

**Simple:** Accepting Android Pay is easy and requires no changes to your
payment processing. Leading
[payment gateways](/android-pay/) and
processing platforms are also adding support to make it even easier for
developers to enable Android Pay.

**Sicuro:** Android Pay funziona memorizzando in modo sicuro un numero di
account virtuale associato all'account di pagamento di un utente. Ciò consente
acquisti online senza che l'utente debba inviare il proprio numero reale di
carta di credito o di debito. Android Pay crittografa ogni transazione di
pagamento, mantenendo al sicuro i dati dell'utente.

**Support:** Android Pay is supported in a growing number of countries and by
a majority of major credit card networks and banks, and is available on all
Android Phones with KitKat and above. Please refer to this
[help center page](https://support.google.com/androidpay/answer/6314169) for
complete documentation on availability by country and card type.

## Come funziona

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
    <img src="images/how_it_works_1.jpg">
    <figcaption>1. Premere "Pagamento".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.jpg">
    <figcaption>2. Payment Request UI pops up.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.jpg">
    <figcaption>3. Choose payment method, etc., and press "Pay".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.jpg">
<figcaption>4. Quando viene visualizzata l'app Android Pay, fare clic per
continuare (all'utente potrebbe essere richiesto di sbloccare il telefono /
autenticarsi con le impronte digitali)</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.jpg">
    <figcaption>5. Checkout is complete.</figcaption>
  </figure>
</div>

## Prepararsi

### Conoscenza richiesta

- Because Android Pay in Chrome uses the PaymentRequest API, it is essentialto
familiarize yourself with the[Payment Request
API](/web/fundamentals/payments/deep-dive-into-payment-request)before
continuing.
- Even if you are not an Android developer, it will be useful to
acquaintyourself with the [Android Pay in-app
APIs](/android-pay/android/tutorial).Because the responses returned by Android
Pay are the same on Android andChrome, the information on response handling is
useful.
- Review the Android Pay detailed[content
policies](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)to
make sure your specific goods or services are supported.

### Impostazione dell'ambiente

- Assicurati di avere l'app Android Pay installata sul tuo dispositivo. È
necessario essere in uno dei paesi supportati per installarlo. Controlla su
[android.com/pay](https://www.android.com/pay/) {: .external} per vedere se il
tuo Paese è supportato.
- Per i test, devi [aggiungere una carta di
credito](https://support.google.com/androidpay/answer/6289372) ad Android Pay
sul tuo dispositivo.
- Registrati per Android Pay 
-  Aggiungi la tua azienda, l'origine del sito e l'e-mail aziendale ecc.
Utilizzando [questo modulo.](https://goo.gl/forms/dga1yH1MYcA6QR8x2)
- Assicurarsi che [il gateway / processore di pagamento supporti token Android
Pay](/android-pay/#processors) .
- Acquire a key-pair used to encrypt the response from Android Pay if you
areusing [the network token approach](#integration-using-network-token).
- Google recommends that you work with your payment processor to obtain
apublic key. This simplifies the process as your processor will be able tohandle
decryption of the Android Pay Payload. Find more information atyour payment
processor documentation.
- If you want to handle encryption yourself, please refer to[Payment Token
Cryptography](/android-pay/integration/payment-token-cryptography)for generating
a base64 encoded Elliptic Curve Integrated Encryption key.

## Integrating Android Pay into Payment Request

With Android Pay for Payment Request API, you may request one of two payment
token types: gateway or network. If you are using Braintree, Stripe, or Vantiv
as your payment gateway, then you may request a gateway token from Android Pay.
Otherwise, you may request an encrypted network token bundle. You may either
handle the network token yourself or work with your processor to handle
decrypting the token bundle.

### Approccio token gateway

Android Pay does not process the payment. The merchant would still need to
invoke gateway APIs to charge/process the gateway token returned from Android
Pay.

Lascia che Android Pay API restituisca un token gateway. Questo è il flusso
consigliato se si utilizza Braintree, Stripe o Vantiv.

<a href="images/gateway_token.png" target="_blank"><img
src="images/gateway_token.png"></a>

### Network Token approach

Let Android Pay API return an encrypted network token bundle. You may then
either decrypt the token yourself or leverage your processor APIs to handle
decryption and charge the token.

<a href="images/network_token.png" target="_blank"><img
src="images/network_token.png"></a>

## Integrazione utilizzando il token gateway

L'esempio seguente illustra come richiedere un token direttamente dal gateway di
pagamento. In questo esempio descriviamo come richiedere un token Stripe. Se si
utilizzano altri gateway di pagamento come Braintree o Vantiv, contattare il
processore per i parametri specifici del gateway di pagamento.

In requesting a gateway token, Android Pay makes a call to your processor on
your behalf and returns a chargeable gateway token.

#### Parameters

```
var supportedInstruments = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['amex', 'discover', 'mastercard', 'visa']
    }
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
```

Per utilizzare Android Pay con l'approccio token gateway, aggiungi un oggetto
JSON che contenga i seguenti parametri per l'esempio precedente.

- `supportedMethods: [ 'https://android.com/pay' ]`: Indicate this is a payment
method using Android Pay.
- `data`: These are Android Pay specific values which are not yet standardized.
- `merchantId`: The Android Pay Merchant ID you obtained by [signing up to
Android Pay](https://goo.gl/forms/dga1yH1MYcA6QR8x2).
- `environment:'TEST'`: Add this if you are testing with Android Pay. The
generated gateway token will be invalid.
- `allowedCardNetworks`: Provide an array of credit card networks that
constitute a valid Android Pay response. It accepts "AMEX", "DISCOVER",
"MASTERCARD" and "VISA".
    - `paymentMethodTokenizationParameters`:
- `tokenizationType`: 'GATEWAY_TOKEN': Indicates you are taking the
gateway token approach.
- `parameters`: Payment gateway specific parameters. Refer to specific
payment gateway documentation.

#### Handling the Android Pay response

After you add the Android Pay object, Chrome can request a chargeable gateway
token.

```
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
```

The response from PaymentRequest will contain the shipping and contact
information as in the examples outlined in the
[PaymentRequest deep
dive](/web/fundamentals/payments/deep-dive-into-payment-request),
but now includes an additional response from Android Pay containing

- Informazioni sull'indirizzo di fatturazione
- Informazioni sui contatti
- Informazioni sullo strumento di pagamento
- Dettagli sul token di pagamento

Il modo in cui gestisci un token gateway inviato dipende dal gateway di
pagamento. Si prega di fare riferimento alla documentazione del gateway
specifico per maggiori dettagli.

#### Mettere tutto insieme

```
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
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: ['amex', 'discover','mastercard','visa'],
        supportedTypes: ['credit']
      }
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
```

### Integrazione tramite Network Token

La richiesta di un token di rete richiede l'inserimento di due parti di
informazioni nel PaymentRequest.

1. `merchantId` ottenuto alla registrazione
2. `publicKey` passato come parte di `paymentMethodTokenizationParameters`

#### Parameters

```
var supportedInstruments = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['amex', 'discover','mastercard','visa'],
      supportedTypes: ['credit']
    }
  }, {
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
          publicKey: 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
        }
      }
    }
  }
];
```

In order to use Android Pay with the network token approach, add a JSON object
that contains the following parameters per the above example.

- `supportedMethods: [ 'https://android.com/pay' ]` : indica che si tratta di un
metodo di pagamento che utilizza Android Pay.
- `data` : 
-  `merchantId` : l'ID commerciante Android Pay che hai ottenuto
[iscrivendoti ad Android Pay](https://androidpay.developers.google.com/signup) .
-  `environment:'TEST'` : aggiungi questo se esegui test con Android Pay. Il
token generato non sarà valido. Per l'ambiente di produzione, rimuovere questa
riga.
-  `allowedCardNetworks` : fornisce una serie di reti di carte di credito
che costituiscono una risposta Android Pay valida.
    -  `paymentMethodTokenizationParameters` : 
-  `tokenizationType: 'NETWORK_TOKEN'` : indica che stai adottando
l'approccio token di rete.
-  `parameters` : chiave pubblica richiesta per ricevere un token di
rete. (Vedi [Come generare chiavi di
crittografia](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)
.)

#### Handling the Android Pay response

After you add the Android Pay object, Chrome can request a chargeable network
token.

```
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
```

The encrypted response from PaymentRequest will contain the shipping and
contact information as in the examples outlined in the
[PaymentRequest deep
dive](/web/fundamentals/payments/deep-dive-into-payment-request),
but now includes an additional response from Android Pay containing

- Informazioni sulla carta di credito con token
- Informazioni sull'indirizzo di fatturazione
- Informazioni sullo strumento di pagamento
- Dettagli sul token di pagamento

For a simpler integration of network tokens, we recommend passing the
encrypted payload directly to your payment gateway and allowing them to
handle decryption.  Decrypting the payload yourself is more complex and
involves private key management.  Please contact your payment gateway to
see if this functionality is available.

How you handle a submitted network token depends on the payment gateway.
Please refer to the specific gateway's documentation for more details.

A code example is omitted here, as there is no difference with the
gateway token approach except in constructing the PaymentRequest object.
