project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Richiedi un controllo {: .page-title }

Devi chiedere a Google di esaminare la tua pagina o il tuo sito
in modo che non venga più contrassegnato come pericoloso o potenzialmente ingannevole per gli utenti.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Requisiti

*   Conoscenza dei comandi di shell/terminale

## Operazioni da eseguire

### 1. Prerequisiti

Prima di richiedere un controllo, assicurati di aver svolto i seguenti passaggi:

* Verifica della proprietà del tuo sito in Search Console
* Pulizia del sito dai danni provocati dall’hacker
* Correzione della vulnerabilità
* Ripubblicazione online del sito pulito

### 2. Verifica attentamente che le pagine siano disponibili e corrette

Per avere la certezza, utilizza Wget o cURL per visualizzare le pagine del tuo sito, come la
home page e un URL modificato dall’hacker, che ora dovrebbero essere corretti. Se questo è il caso
e se hai la certezza che lo stesso valga per le restanti pagine del tuo sito,
è il momento di chiedere un controllo.

Nota. Le pagine devono poter essere scansionate da Googlebot per essere certi che siano
corrette. Assicurati che possano essere sottoposte a scansione dai robot e che non ne sia bloccata l’indicizzazione
tramite istruzioni o META tag robots `noindex`.

### 3. Richiedi un controllo

Prima di richiedere un controllo:

* **assicurati che il problema sia davvero risolto**;
richiedere una revisione se il problema è ancora presente non farà altro che prolungare il periodo di tempo in cui il
tuo sito è contrassegnato come pericoloso.

* **verifica attentamente se devi richiedere un controllo**; il processo di controllo verrà
eseguito in uno strumento specifico, in base al problema riscontrato nel sito.
Di seguito sono riportati i vari canali disponibili.


#### A. Sito compromesso

*Hai ricevuto una notifica di sito compromesso nel 
[**report Manual Actions**](https://www.google.com/webmasters/tools/manual-action)
della Search Console:*

1. Ora che hai analizzato i passaggi successivi del processo di pulizia,
 puoi consultare nuovamente il report [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
 e vedere se il problema è relativo all’intero sito 
 o solo a una sua parte.
2. Seleziona **Request a review**.

    Per inviare una richiesta di controllo, ti verrà chiesto di fornire informazioni sulle azioni eseguite
 per pulire il sito. Per ogni categoria di sito compromesso da spam, puoi scrivere
 una frase che spieghi come il sito sia stato pulito (ad esempio, “Nel caso di URL compromessi dall'iniezione di contenuti, ho
rimosso i contenuti con spam e ho corretto la
vulnerabilità aggiornando un plug-in obsoleto.”).


#### B. Software indesiderato (incluso malware)

*Hai ricevuto una notifica di malware o software indesiderato nel
[**report Security Issues**](https://www.google.com/webmasters/tools/security-issues)
in Search Console:*

1. Apri il
  [**report Security Issues**](https://www.google.com/webmasters/tools/security-issues)
nuovamente in Search Console. Il report mostrerà ancora probabilmente gli avvisi e gli URL di esempio
infettati che hai visto prima.
2. Seleziona **Request a review**.

    Per inviare una richiesta di controllo, ti verrà chiesto di fornire maggiori informazioni
riguardanti le azioni eseguite per correggere la violazione della policy sul sito. Ad esempio,
    “Ho rimosso il codice di terzi che distribuiva malware sul mio
    sito Web e l’ho sostituito con una versione più aggiornata del codice".


*Non hai ricevuto una notifica di malware o software indesiderato nel
[**report Security Issues**](https://www.google.com/webmasters/tools/security-issues)
in Search Console, ma hai ricevuto una notifica nell’account AdWords:*

1. Richiedi un controllo attraverso l’
[AdWords support center](https://support.google.com/adwords/contact/site_policy).


#### C. Phishing o social engineering

*Hai ricevuto una notifica di phishing nel
[**report Security Issues**](https://www.google.com/webmasters/tools/security-issues)
in Search Console:*

1. Apri il
  [**report Security Issues**](https://www.google.com/webmasters/tools/security-issues)
nuovamente in Search Console. Il report mostrerà ancora probabilmente gli avvisi e gli URL di esempio
infettati che hai visto prima.
2. Seleziona **Request a review**.

    Per inviare una richiesta di controllo, ti verrà chiesto di fornire maggiori informazioni
sulle azioni eseguite per correggere la violazione della policy sul sito. Ad esempio,
    “Ho rimosso la pagina che chiedeva all’utente di immettere informazioni personali”.

3. Puoi anche richiedere il controllo all’indirizzo
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Oltre a essere uno strumento di reporting per i proprietari di siti che ritengono che la loro pagina
sia stata segnalata come phishing per errore, questo report determinerà l’avvio di un controllo
 delle pagine segnalate come phishing che sono state ripulite allo scopo di rimuovere gli avvisi.

### 4. Attendi il completamento del controllo

* **Tempo di elaborazione del controllo di spam.** L’elaborazione dei controlli di siti compromessi da spam
può richiedere diverse settimane. Ciò è dovuto al fatto che i controlli per
spam possono comportare indagini manuali o una rielaborazione completa delle
pagine compromesse. Se il controllo ha esito positivo, in Security Issues
 non vengono più visualizzati i tipi di categorie compromesse o URL compromessi di esempio.
* **Tempo di elaborazione del controllo di malware.** L’elaborazione dei controlli di siti infetti da
  malware richiede alcuni giorni. Una volta che il controllo è stato completato, la
 risposta sarà riportata nei **Messages** di Search Console.
* **Tempo di elaborazione del controllo di phishing.** L’elaborazione dei controlli di phishing richiede
 circa un giorno. Se l’operazione viene conclusa correttamente, l’avviso di phishing visibile all’utente viene
  rimosso e la pagina può di nuovo essere visualizzata nei risultati di ricerca.

Se Google accerta che il sito è pulito, gli avvisi nel browser e nei
risultati di ricerca vengono rimossi entro 72 ore.

Se Google dovesse rilevare che il problema non è stato risolto, nel report Security
Issues in Search Console potrebbe essere mostrati altri URL
infetti di esempio per aiutarti nel corso dell’indagine successiva. Come avvertimento per proteggere gli utenti, gli avvisi di siti compromessi con malware, phishing o
spam rimangono nei risultati di ricerca e/o nei
browser.

### Passaggi finali

* **Se la tua richiesta è stata approvata,** verifica che il tuo sito funzioni come previsto:
  le pagine vengono caricate correttamente e i link sono selezionabili. Per mantenere la sicurezza del sito,
 consigliamo a tutti i proprietari di siti di implementare il programma di manutenzione e sicurezza
 creato in [Ripulisci e gestisci il sito](clean_site).

    Per ulteriori informazioni, consulta le seguenti risorse da 
    [StopBadware](https://www.stopbadware.org):

      * [Preventing badware: basics](https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites](https://www.stopbadware.org/hacked-sites-resources)

* **Se invece la tua richiesta è stata rifiutata,** esamina di nuovo il sito alla ricerca di
  [malware](hacked_with_malware) o [spam](hacked_with_spam) oppure di eventuali
  modifiche o nuovi file creati dall’hacker. In alternativa, puoi
  richiedere ulteriore aiuto dagli
  [esperti del tuo team di assistenza](support_team).
