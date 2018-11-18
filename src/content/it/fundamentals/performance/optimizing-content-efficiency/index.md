project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La quantità di dati scaricati da ogni app cresce costantemente. Per garantire prestazioni ottimali dobbiamo ottimizzare l'utilizzo di ogni singolo byte!

{# wf_updated_on: 2017-11-10 #}
{# wf_published_on: 2014-03-31 #}

# Ottimizzazione dell'efficienza dei contenuti {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Le nostre applicazioni web continuano a crescere in termini di ambito,
ambizioni e funzionalità, ed è un bene. Tuttavia, la marcia
inarrestabile verso un web sempre più ricco porta con sé un'altra tendenza: la
quantità di dati scaricati da ogni applicazione continua a crescere
incessantemente. Per garantire prestazioni ottimali dobbiamo ottimizzare
l'utilizzo di ogni singolo byte di dati!


Come si presenta una applicazione web moderna?
[HTTP Archive](http://httparchive.org/){: .external } può aiutarci a rispondere
a questa domanda. Il progetto traccia il modo in cui il web è costruito,
indicizzando periodicamente i siti più popolari (oltre 300.000 in base all'elenco
Alexa Top 1M), registrando e mettendo a confronto i dati relativi a risorse,
tipi di contenuti e altri metadati per ogni singola destinazione.

<img src="images/http-archive-trends.png" alt="Trend HTTP Archive">

<table class="">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>50° percentile</th>
    <th>75° percentile</th>
    <th>90° percentile</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Immagini</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Altro</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Totale</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

I dati precedenti definiscono il trend di crescita del numero di byte scaricati
per alcune destinazioni web popolari da gennaio 2013 e gennaio 2014.
Naturalmente, non tutti i siti crescono alla medesima velocità o richiedono la
stessa quantità di dati; ecco perché abbiamo sottolineato i diversi quantili di
distribuzione: 50° (medio), 75° e 90°.

Un sito medio all'inizio del 2014 è composto da 75 richieste che arrivano fino
a 1054 KB di byte trasferiti totali, e il numero totale di byte (e richieste) è
aumentato a ritmo costante nel corso dell'anno precedente. Tale dato da solo non
sarebbe così sorprendente, ma comporta delle importanti implicazioni
prestazionali: è vero, la velocità di internet sta aumentando sempre di più, ma
aumenta in modo diverso in paesi diversi, e molti utenti sono ancora soggetti a
limiti per il download di dati e piani tariffari costosi, specialmente su
dispositivi mobili.

A differenza delle controparti desktop, le applicazioni web non richiedono una
procedura di installazione distinta: basta inserire l'URL ed ecco che possiamo
navigare. Questa è una delle funzioni chiave del web. Tuttavia, perché ciò sia
possibile, **dobbiamo spesso recuperare dozzine, talvolta centinaia di risorse
disparate, fino ad arrivare a megabyte di dati che devono essere ottenuti in
centinaia di millisecondi per consentirci di vivere l'esperienza web istantanea
che ci aspettiamo.**

Poter vivere un'esperienza simile conoscendo tali requisiti non è cosa da poco;
ecco perché l'ottimizzazione dell'efficienza dei contenuti è fondamentale,
eliminando i download non necessari, ottimizzando la codifica dei dati
trasferiti per ogni risorsa tramite diverse tecniche di compressione e
avvalendosi del caching, laddove possibile, per eliminare eventuali download
ridondanti.
