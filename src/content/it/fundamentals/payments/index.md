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

L'acquisto di beni online è un'esperienza comoda ma spesso frustrante, in
particolare sui dispositivi mobili. Sebbene il traffico da dispositivi mobili
continui ad aumentare, le conversioni da dispositivi mobili rappresentano solo
circa un terzo di tutti gli acquisti completati. In altre parole, gli utenti
abbandonano gli acquisti da cellulare due volte più spesso degli acquisti da
desktop. Perché?

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

- Lascia che il browser funga da intermediario tra commercianti, utenti e metodi
di pagamento
- Standardizza il flusso di comunicazione di pagamento il più possibile
- Supporta perfettamente diversi metodi di pagamento sicuri
- Lavora su qualsiasi browser, dispositivo o piattaforma - mobile o altro

La Payment Request API è uno standard aperto e cross-browser che sostituisce i
flussi di pagamento tradizionali consentendo ai commercianti di richiedere e
accettare qualsiasi pagamento in una singola chiamata API. L'API consente alla
pagina Web di scambiare informazioni con lo user agent mentre l'utente fornisce
l'input, prima di approvare o rifiutare una richiesta di pagamento.

Meglio ancora, con il browser che funge da intermediario, tutte le informazioni
necessarie per un checkout veloce possono essere memorizzate nel browser, in
modo che gli utenti possano semplicemente confermare e pagare, tutto con un solo
clic.

### Processo di transazione di pagamento {: #transaction-process }

Utilizzando la Payment Request API, il processo di transazione è reso il più
semplice possibile sia per gli utenti che per i commercianti.

![](images/4_the_payment_transaction_process.png)

*Il processo di transazione di pagamento*

Il processo inizia quando il sito commerciale crea una nuova `PaymentRequest` e
passa al browser tutte le informazioni necessarie per effettuare l'acquisto:
l'importo da addebitare, la valuta in cui si aspetta il pagamento e quali metodi
di pagamento sono accettati dal sito. Il browser determina la compatibilità tra
i metodi di pagamento accettati per il sito e i metodi che l'utente ha
installato sul dispositivo di destinazione.

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
