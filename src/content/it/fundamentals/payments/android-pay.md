project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay consente acquisti online semplici e sicuri ed elimina la necessità per gli utenti di ricordare e inserire manualmente i propri dati di pagamento. Integra Android Pay per raggiungere milioni di utenti Android, incrementare le conversioni e offrire agli utenti un'autentica esperienza di pagamento a singolo tocco.

{# wf_blink_components: Blink>Payments #}
{# wf_updated_on: 2018-03-29 #}
{# wf_published_on: 2016-09-07 #}

# Integrazione di Android Pay in Payment Request {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Warning: Android Pay è ora Pay with Google e consente l'accesso ai token di
pagamento sul dispositivo e alle carte di credito e di debito dell'account
Google di un utente. Per ulteriori informazioni su Pay with Google, leggi la
documentazione sull'[API Google Pay](/payments/) .

Android Pay consente acquisti online semplici e sicuri ed elimina la necessità
per gli utenti di ricordare e inserire manualmente i propri dati di pagamento.
Integra Android Pay per raggiungere milioni di utenti Android, incrementare le
conversioni e offrire agli utenti un'autentica esperienza di pagamento a singolo tocco.

**Semplicità:** accettare Android Pay è semplice e non richiede modifiche
all'elaborazione dei pagamenti. I principali [gateway di
pagamento](/android-pay/) e piattaforme di elaborazione stanno giù aggiungendo
il supporto per gli sviluppatori e consentire di semplificare l'abilitazione di
Android Pay.

**Sicurezza:** Android Pay funziona memorizzando in modo sicuro un numero di
account virtuale associato all'account di pagamento di un utente. Ciò consente
acquisti online senza che l'utente debba inviare il numero vero e proprio di
carta di credito o di debito. Android Pay crittografa ogni transazione di
pagamento, mantenendo al sicuro i dati dell'utente.

**Supporto:** Android Pay è supportato in un numero crescente di paesi e dalla
maggior parte dei principali circuiti di carte di credito e banche ed è
disponibile su tutti i telefoni Android con KitKat e versioni successive.
Consulta questa [pagina del centro
assistenza](https://support.google.com/androidpay/answer/6314169) per la
documentazione completa sulla disponibilità in base al paese e al tipo di carta.

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
    <figcaption>1. Premi "Pagamento".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.jpg">
    <figcaption>2. Viene visualizzata l'UI Payment Request.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.jpg">
<figcaption>3. Scegli il metodo di pagamento e premi
"Paga".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.jpg">
<figcaption>4. Quando viene visualizzata l'app Android Pay, fai clic per
continuare (all'utente potrebbe essere richiesto di sbloccare il telefono/
autenticarsi con le impronte digitali)</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.jpg">
    <figcaption>5. Il pagamento è completo.</figcaption>
  </figure>
</div>

## Come prepararsi

### Cosa bisogna sapere

- Poiché Android Pay in Chrome utilizza PaymentRequest API, è essenziale
familiarizzare con l'[API PaymentRequest
](/web/fundamentals/payments/deep-dive-into-payment-request) prima di
continuare.
- Anche se non sei uno sviluppatore Android, sarà utile conoscere le [API Android
Pay in-app](/android-pay/android/tutorial). Poiché le risposte restituite da
Android Pay sono le stesse su Android e Chrome, le informazioni sulla gestione
della risposta sono utili.
- Esamina le [norme relative ai
contenuti](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)
dettagliate di Android Pay per assicurarti che i tuoi specifici prodotti o
servizi siano supportati.

### Impostazione dell'ambiente

- Assicurati di avere l'app Android Pay installata sul tuo dispositivo. È
necessario essere in uno dei paesi supportati per installarla. Controlla su
[android.com/pay](https://www.android.com/pay/) {: .external} per vedere se il
tuo Paese rientra nella lista.
- Per il testing, devi [aggiungere una carta di
credito](https://support.google.com/androidpay/answer/6289372) ad Android Pay
sul tuo dispositivo.
- Registrati per Android Pay 
-  Aggiungi la tua azienda, l'origine del sito, l'email aziendale ecc.
utilizzando [questo modulo].(https://goo.gl/forms/dga1yH1MYcA6QR8x2)
- Assicurati che [il gateway/processore di pagamento supporti i token Android
Pay](/android-pay/#processors).
- Acquisisci una coppia di chiavi utilizzata per crittografare la risposta da
Android Pay se stai utilizzando l'[approccio token
di rete](#integration-using-network-token).
-  Google ti consiglia di utilizzare il tuo processore di pagamento per
ottenere una chiave pubblica. Questo semplifica il processo in quanto il tuo
processore sarà in grado di gestire la decrittografia del Payload Android Pay.
Trova maggiori informazioni nella documentazione del tuo processore di
pagamento.
-  Se desideri gestire autonomamente la crittografia, fai riferimento a
[Crittografia dei token di
pagamento](/android-pay/integration/payment-token-cryptography) per generare una
chiave Elliptic Curve Integrated Encryption codificata a base64.

## Integrazione di Android Pay in Payment Request

Con Android Pay per l'API Payment Request, puoi richiedere uno dei due tipi di
token di pagamento: gateway o rete. Se utilizzi Braintree, Stripe o Vantiv
come gateway di pagamento, puoi richiedere un token gateway da Android Pay. In
caso contrario, puoi richiedere un bundle di token di rete
crittografato. Puoi gestire il token di rete o lavorare con il processore
per gestire la decodifica del bundle di token.

### Approccio token di gateway

Android Pay non elabora il pagamento. Il commerciante deve comunque richiamare
le API gateway per caricare/elaborare il token gateway restituito da Android Pay.

Lascia che Android Pay API restituisca un token gateway. Questo è il flusso
consigliato se utilizzi Braintree, Stripe o Vantiv.

<a href="images/gateway_token.png" target="_blank"><img
src="images/gateway_token.png"></a>

### Approccio token di rete

Lascia che l'API Android Pay restituisca un bundle di token di rete crittografato.
È quindi possibile decodificare il token o sfruttare le API del processore per
gestire la decodifica ed addebitare il token.

<a href="images/network_token.png" target="_blank"><img
src="images/network_token.png"></a>

## Integrazione tramite i token di gateway

L'esempio seguente illustra come richiedere un token direttamente dal gateway di
pagamento. In questo esempio descriviamo come richiedere un token Stripe. Se
utilizzi altri gateway di pagamento come Braintree o Vantiv, contatta il
processore per i parametri specifici del gateway di pagamento.

Nella richiesta di un token gateway, Android Pay effettua una chiamata al
processore per conto dell'utente e restituisce un token gateway di pagamento.

#### Parametri

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
JSON che contenga i seguenti parametri come nell'esempio precedente.

- `supportedMethods: [ 'https://android.com/pay' ]`: indica un
metodo di pagamento che utilizza Android Pay.
- `data`: indica valori specifici per Android Pay che non sono ancora
standardizzati.
-  `merchantId` : l'ID commerciante Android Pay che hai ottenuto
[iscrivendoti ad Android Pay](https://goo.gl/forms/dga1yH1MYcA6QR8x2).
-  `environment:'TEST'` : aggiungi questo se esegui il testing con Android Pay. Il
token del gateway generato non sarà valido.
-  `allowedCardNetworks` : fornisce una serie di reti di carte di
credito che costituiscono una risposta Android Pay valida. Accetta "AMEX",
"DISCOVER", "MASTERCARD" e "VISA".
    -  `paymentMethodTokenizationParameters` : 
-  `tokenizationType` : 'GATEWAY_TOKEN': indica che stai adottando
l'approccio token gateway.
-  `parameters` : `parameters` specifici del gateway di pagamento.
Consulta la documentazione specifica sul gateway di pagamento.

#### Gestione della risposta di Android Pay

Dopo aver aggiunto l'oggetto Android Pay, Chrome può richiedere un token gateway
di pagamento.

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

La risposta da PaymentRequest conterrà le informazioni di spedizione e di
contatto come negli esempi analizzati nell'[approfondimento a
PaymentRequest](/web/fundamentals/payments/deep-dive-into-payment-request) ma
ora include anche un'altra risposta di Android Pay contenente le:

- Informazioni sull'indirizzo di fatturazione
- Informazioni sul contatto
- Informazioni sullo strumento di pagamento
- Informazioni sul token di pagamento

Il modo in cui gestisci un token gateway inviato dipende dal gateway di
pagamento. Consulta la specifica documentazione sui gateway
per maggiori dettagli.

#### Sintesi

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

### Integrazione tramite i token di rete

La richiesta di un token di rete richiede l'inserimento di due parti di
informazioni nel PaymentRequest.

1. `merchantId` ottenuto alla registrazione
2. `publicKey` passato come parte di `paymentMethodTokenizationParameters`

#### Parametri

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

Per utilizzare Android Pay con l'approccio token di rete, aggiungi un oggetto
JSON che contenga i seguenti parametri per l'esempio precedente.

- `supportedMethods: [ 'https://android.com/pay' ]`: indica un
metodo di pagamento che utilizza Android Pay.
- `data` : 
-  `merchantId`: l'ID commerciante Android Pay che hai ottenuto
[iscrivendoti ad Android Pay](https://androidpay.developers.google.com/signup).
-  `environment:'TEST'`:  aggiungilo se esegui il testing con Android Pay. Il
token generato non sarà valido. Per l'ambiente di produzione, rimuovi questa
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

#### Gestione della risposta Android Pay

Dopo aver aggiunto l'oggetto Android Pay, Chrome può richiedere un token di rete
di pagamento.

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

La risposta crittografata da PaymentRequest conterrà le informazioni di
spedizione e di contatto come negli esempi delineati nell'[approfondimento di
PaymentRequest](/web/fundamentals/payments/deep-dive-into-payment-request), ma
ora include anche un'altra risposta di Android Pay contenente le:

- Informazioni sulla carta di credito in formato token
- Informazioni sull'indirizzo di fatturazione
- Informazioni sullo strumento di pagamento
- Informazioni sul token di pagamento

Per una più semplice integrazione dei token di rete, trasferirisci
il payload crittografato direttamente al gateway di pagamento per consentire loro
di gestire la decodifica. Decifrare il payload da soli è più complesso e
coinvolge la gestione delle chiavi private. Contatta il gateway di
pagamento per vedere se questa funzionalità è disponibile.

Il modo in cui gestisci un token di rete inviato dipende dal gateway di
pagamento. Fai riferimento alla documentazione dello
specifico gateway per ulteriori dettagli.

Qui viene omesso un esempio di codice, poiché non vi è alcuna differenza con
l'approccio token gateway tranne che nella costruzione dell'oggetto
PaymentRequest.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
