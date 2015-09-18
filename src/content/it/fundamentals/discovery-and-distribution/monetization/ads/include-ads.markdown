---
title: "Includere annunci AdSense sul tuo sito"
description: "Per apprendere come includere annunci nel tuo sito, procedi come indicato nella presente guida. Crea un account AdSense, crea unità pubblicitarie, posizionale nel tuo sito, configura le impostazioni di pagamento e riscuoti il pagamento."
updated_on: 2014-07-31
key-takeaways:
  tldr:
    - "Per creare un account AdSense, devi essere maggiorenne, avere un Account Google e un indirizzo."
    - "Il tuo sito web dev'essere attivo prima di inoltrare la richiesta e il contenuto del sito web deve rispettare le politiche AdSense."
    - "Crea unità pubblicitarie reattive per assicurarti che i tuoi annunci siano idonei, indipendentemente dal dispositivo utilizzato dall'utente per visualizzarli."
    - "Verifica le impostazioni di pagamento e attendi gli introiti."
notes:
  crawler:
    - "Assicurati di non bloccare l'accesso al tuo sito al crawler AdSense (vedi questo utile argomento in <a href='https://support.google.com/adsense/answer/10532'></a>)."
  body:
    - "Incolla il codice annuncio completo nel tag <code>body</code>; diversamente, gli annunci non funzionano."
  smarttag:
    - "Ogni annuncio che crei ha un suo specifico <code>data-ad-client</code> e <code>data-ad-slot</code>."
    - "Il tag <code>data-ad-format=auto</code>, all'interno del codice annuncio generato, attiva il posizionamento intelligente per l'unità pubblicitaria reattiva."
---

<p class="intro">
  Per apprendere come includere annunci nel tuo sito, procedi come indicato nella presente guida. Crea un account AdSense, crea unità pubblicitarie, posizionale nel tuo sito, configura le impostazioni di pagamento e riscuoti il pagamento.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Crea una pagina di esempio con annunci

I seguenti passaggi ti consentono di creare una pagina di esempio che include pubblicità reattive, utilizzando Google AdSense e il Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw"
  srcset="images/ad-ss-1200.png 1200w,
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w,
          images/ad-ss-300.png 300w"
  alt="Esempio di sito web con annunci su desktop e dispositivo mobile">

Se non hai dimestichezza con il Web Start Kit, fai riferimento alla documentazione relativa a come [Impostare il Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html).

Per includere annunci nel tuo sito e ricevere il pagamento, procedi nel seguente modo:

1. Crea un account AdSense.
2. Crea unità pubblicitarie.
3. Posiziona le unità pubblicitarie all'interno della pagina.
4. Configura le impostazioni di pagamento.

##. Crea un account AdSense
Per visualizzare annunci sul tuo sito, devi avere un account AdSense attivo. Se non ne possiedi ancora uno, devi [crearne uno](https://www.google.com/adsense/) e accettare le condizioni per l'utilizzo del servizio di AdSense.  Quando crei l'account, devi verificare di:

* Essere maggiorenne e possedere un Account Google verificato.
* Avere un tuo sito web attivo o altro contenuto online che rispetti le
[politiche concernenti i programmi di Google AdSense](https://support.google.com/adsense/answer/48182); gli annunci si trovano su questo sito.
* Avere un indirizzo postale e un indirizzo mail associati al tuo conto bancario, per ricevere i pagamenti.

## Crea unità pubblicitarie

Un'unità pubblicitaria è un insieme di annunci che vengono visualizzati sulla tua pagina, dopo che hai inserito JavaScript nella pagina.  Hai tre opzioni per dimensionare le tue unità pubblicitarie:

* **[Reattiva (Raccomandata)](https://support.google.com/adsense/answer/3213689)**.
* [Predefinita](https://support.google.com/adsense/answer/6002621).
* [Personalizzata](https://support.google.com/adsense/answer/3289364).

Per creare un sito reattivo, utilizza unità pubblicitarie reattive.
Le pubblicità reattive si dimensionano automaticamente in base alle dimensioni del dispositivo e alla larghezza del contenitore padre.
Le pubblicità reattive si adeguano alla tua disposizione reattiva, garantendo il successo del tuo sito su qualsiasi dispositivo.

Se non utilizzi unità pubblicitarie reattive, dovrai scrivere molti più codici per controllare come vengono visualizzati gli annunci, in base al dispositivo dell'utente. Anche se devi specificare l'esatta dimensione delle tue unità pubblicitarie, utilizza le tue unità pubblicitarie reattive in [modalità avanzata]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Per semplificare il tuo codice e risparmiare tempo e sforzi, il codice annuncio reattivo adatta automaticamente la dimensione dell'unità pubblicitaria alla disposizione della tua pagina.
Il codice calcola dinamicamente la dimensione richiesta, basandosi sulla larghezza del contenitore padre dell'unità pubblicitaria, e sceglie la dimensione dell'annuncio migliore e ideale per il contenitore.
Ad esempio, un sito ottimizzato per cellulari con una larghezza di 360 px può visualizzare un'unità pubblicitaria di 320 x 50.

Traccia le attuali [dimensioni dell'annuncio migliori](https://support.google.com/adsense/answer/6002621#top) nella [Guida alle dimensioni] di Google AdSense(https://support.google.com/adsense/answer/6002621#top).

### Per creare un'unità pubblicitaria reattiva

1. Visita [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Fai clic su <strong>+Nuova unità pubblicitaria</strong>.
3. Assegna un unico nome alla tua unità pubblicitaria. Il nome scelto viene visualizzato nel codice annuncio incollato nel tuo sito: è bene dunque che sia descrittivo.
4. Seleziona <strong>Reattiva</strong> dal menu a discesa delle dimensioni annuncio.
5. Seleziona <strong>Annunci di testo & display</strong> dal menu a discesa delle dimensioni annuncio.
6. Fai clic su <strong>Salva e trova codice</strong>.
7. Nella casella <strong>Codice annuncio</strong> che viene visualizzata, seleziona l'opzione <strong>Dimensionamento intelligente (raccomandato)</strong>, dal menu a discesa Modalità.
Questa è la modalità raccomandata e non richiede modifiche al tuo codice annuncio.

Dopo aver creato la tua unità pubblicitaria, AdSense fornisce un frammento di codice da includere nel tuo sito, simile al seguente codice:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Includi unità pubblicitarie nel tuo sito

Per includere l'annuncio nella pagina, devi incollare il frammento di codice generato da AdSense nel tuo markup. Se desideri includere annunci multipli, puoi riutilizzare la stessa unità pubblicitaria o creare unità pubblicitarie multiple.

1. Apri `index.html` nella cartella `app`.
2. Incolla il frammento di codice nel tag `principale`.
3. Salva il file e prova a visualizzarlo nel tuo browser; poi, prova ad aprirlo su un dispositivo mobile o utilizzando Chrome emulator.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw"
      srcset="images/ad-ss-1200.png 1200w,
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w,
              images/ad-ss-300.png 300w"
      alt="Esempio di sito web con annunci su desktop e dispositivo mobile">
    <br>
    Prova
  </a>
</div>

## Configura le impostazioni di pagamento

Ti chiedi quando arriverà il tuo pagamento AdSense? Ti chiedi se sarai pagato nel mese corrente o in quello successivo? Assicurati di aver eseguito tutti i seguenti passaggi:

1. Verifica di aver inserito tutte le informazioni fiscali richieste nel [profilo del beneficiario](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE).
2. Controlla che il tuo Nome Beneficiario e il tuo indirizzo siano corretti.
3. Seleziona la forma di pagamento prescelta nella [pagina delle impostazioni pagamento](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Inserisci il tuo [numero di identificazione personale (PIN)](https://support.google.com/adsense/answer/157667). Il PIN verifica la precisione delle tue informazioni sull'account.
5. Controlla se il tuo saldo raggiunge la [soglia di versamento](https://support.google.com/adsense/answer/1709871).

Fai riferimento a [Introduzione ai pagamenti AdSense](https://support.google.com/adsense/answer/1709858) per domande aggiuntive.
