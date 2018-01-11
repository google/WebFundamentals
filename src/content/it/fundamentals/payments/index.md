project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Payment Request API per pagamenti veloci e facili sul web.

{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2018-01-11 #}
{# wf_blink_components: Blink>Payments #}

# Introduzione a Payment Request API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Buying goods online is a convenient but often frustrating experience,
particularly on mobile devices. Although mobile traffic continues to increase,
mobile conversions account for only about a third of all completed purchases. In
other words, users abandon mobile purchases twice as often as desktop purchases.
Why?

![](images/1_why_users_abandon.png)

*Perché gli utenti abbandonano i moduli di acquisto da dispositivi mobili*

I moduli di acquisto online sono intensivi per gli utenti, difficili da
utilizzare, lenti da caricare e aggiornare e richiedono più passaggi da
completare. Questo perché due componenti principali dei pagamenti online -
sicurezza e convenienza - spesso funzionano a scopi incrociati; più di uno in
genere significa meno dell'altro.

La maggior parte dei problemi che portano all'abbandono possono essere
direttamente ricondotti ai moduli di acquisto. Ogni app o sito ha il proprio
processo di immissione e convalida dei dati e gli utenti spesso si trovano a
dover inserire le stesse informazioni nel punto di acquisto di ogni app.
Inoltre, gli sviluppatori di applicazioni faticano a creare flussi di acquisto
che supportano più metodi di pagamento unici; anche piccole differenze nei
requisiti del metodo di pagamento possono complicare il completamento del modulo
e il processo di invio.

Qualsiasi sistema che migliori o risolva uno o più di questi problemi è un
cambiamento positivo. Abbiamo già iniziato a risolvere il problema con
[Autofill](/web/updates/2015/06/checkout-faster-with-autofill), ma ora vorremmo
parlare di una soluzione più completa.

## Introduzione a Payment Request API {: #introducing }

La Payment Request API è un candidato [standard
W3C](https://www.w3.org/TR/payment-request/) che ha lo scopo di *eliminare i
moduli di checkout* . Migliora notevolmente il flusso di lavoro degli utenti
durante il processo di acquisto, offrendo un'esperienza utente più coerente e
consentendo ai commercianti di sfruttare facilmente diversi metodi di pagamento.

La Payment Request API è progettata per essere indipendente dal fornitore, il
che significa che non richiede l'uso di un particolare sistema di pagamento. Non
si tratta di un nuovo metodo di pagamento, né si integra direttamente con i
processori di pagamento; piuttosto, è un canale derivante dalle informazioni di
pagamento e spedizione dell'utente ai commercianti, con i seguenti obiettivi:

- Let the browser act as intermediary among merchants, users, and paymentmethods
- Standardizza il flusso di comunicazione di pagamento il più possibile
- Seamlessly support different secure payment methods
- Lavora su qualsiasi browser, dispositivo o piattaforma - mobile o altro

La Payment Request API è uno standard aperto e cross-browser che sostituisce i
flussi di pagamento tradizionali consentendo ai commercianti di richiedere e
accettare qualsiasi pagamento in una singola chiamata API. L'API consente alla
pagina Web di scambiare informazioni con lo user agent mentre l'utente fornisce
l'input, prima di approvare o rifiutare una richiesta di pagamento.

Best of all, with the browser acting as an intermediary, all the information
necessary for a fast checkout can be stored in the browser, so users can just
confirm and pay, all with a single click.

### Processo di transazione di pagamento {: #transaction-process }

Utilizzando la Payment Request API, il processo di transazione è reso il più
semplice possibile sia per gli utenti che per i commercianti.

![](images/4_the_payment_transaction_process.png)

*The payment transaction process*

The process begins when the merchant site creates a new `PaymentRequest` and
passes to the browser all the information required to make the purchase: the
amount to be charged, what currency they expect payment in, and what payment
methods are accepted by the site. The browser determines compatibility between
the accepted payment methods for the site and the methods the user has installed
on the target device.

Il browser presenta quindi l'interfaccia utente dei pagamenti all'utente, che
seleziona un metodo di pagamento e autorizza la transazione. Un metodo di
pagamento può essere semplice come una carta di credito già memorizzata dal
browser o una applicazione esoterica di terzi scritta specificamente per erogare
pagamenti per il sito.

Note: Pagare con Google è uno dei metodi di pagamento che puoi utilizzare per
ottenere le carte dall'account Google di un utente e i token di pagamento sul
dispositivo. Per ulteriori informazioni consulta la [documentazione di Google
Pay API](/payments/web/paymentrequest/tutorial) .

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png">
    <figcaption>Interfaccia Payment Request </figcaption>
  </figure>
</div>

Dopo che l'utente ha autorizzato la transazione, tutti i dettagli di pagamento
necessari vengono inviati direttamente al sito. Ad esempio, per un pagamento con
carta di credito, il sito riceverà un numero di carta, il nome di un titolare di
carta, una data di scadenza e un CVC.

La Payment Request può anche essere estesa per restituire ulteriori
informazioni, come gli indirizzi e le opzioni di spedizione, l'email del
beneficiario e il telefono del pagatore. Ciò consente di ottenere tutte le
informazioni necessarie per finalizzare un pagamento senza mai mostrare
all'utente un modulo di checkout.

La bellezza del nuovo processo è triplice: dal punto di vista dell'utente, tutta
la noiosa interazione precedente - richiesta, autorizzazione, pagamento e
risultato - ora avviene in un'unica fase; dal punto di vista del sito Web,
richiede solo una singola chiamata API JavaScript; dal punto di vista del metodo
di pagamento, non vi è alcun cambiamento di processo.

Per iniziare ad usare l'API stessa, guarda qui il nostro
[approfondimento](/web/fundamentals/payments/deep-dive-into-payment-request) .

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}

<div style="clear:both;"></div>
