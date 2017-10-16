project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Migliorare le prestazioni inizia minimizzando, o almeno, ottimizzando i dati che gli utenti scaricano. Comprendere come un browser elabora tali risorse è un prerequisito per migliorare l'efficienza dei codici. Dopo averli migliorati, è necessario un modo per testarli.

{# wf_updated_on: 2017-11-10 #}
{# wf_published_on: 2015-09-08 #}

# Performance {: .page-title }

Migliorare le prestazioni è un processo che inizia minimizzando o, almeno, 
ottimizzando i dati che gli utenti scaricano. Comprendere come un browser 
elabora tali risorse è un prerequisito per migliorare l'efficienza dei 
codici. Dopo averli migliorati, è necessario un modo per testarli.

## Ottimizzazione dell'efficienza dei contenuti

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

Per offrire le migliori prestazioni è necessario ottimizzare la consegna 
di ogni byte del tuo sito.

[Per iniziare](optimizing-content-efficiency/)

<div style="clear:both;"></div>

## Percorso di Rendering Critico

<img src="images/crp.png" class="attempt-right">

Capisci cosa succede nei passaggi intermedi tra la ricezione di HTML, CSS 
e JavaScript e il processo di rendering in pixel?

[Per saperne di più](critical-rendering-path/)

<div style="clear:both;"></div>

## Prestazioni di Rendering

<img src="images/rend.png" class="attempt-right">

Per scrivere siti e applicazioni preformanti, è necessario capire 
come HTML, JavaScript e CSS sono gestiti dal browser e 
accertati che il codice che scrivi (e il codice di terze parti includi) 
funzioni nel modo più efficiente possibile.

[Per saperne di più](rendering/)

<div style="clear:both;"></div>

## Comprendere la Bassa Larghezza di Banda e la Latenza Elevata

<img src="images/low.png" class="attempt-right">

È importante capire che cosa percepisce l'applicazione o il sito quando 
la connettività è scarsa o inaffidabile, e costruire di conseguenza. 
Una gamma di strumenti che può aiutarti.

[Per saperne di più](poor-connectivity/)

<div style="clear:both;"></div>

## Il Modello PRPL

<img src="images/prpl.png" class="attempt-right">

PRPL (push, render, pre-cache e lazy-load) è un modello per la 
strutturazione e la pubblicazione di Progressive Web Apps (PWA), con 
particolare attenzione alle prestazioni della distribuzione e dell'avvio 
delle applicazioni.

[Per saperne di più](prpl-pattern/)

<div style="clear:both;"></div>


## Risorse Correlate

### Codelab

[Trova e risolve i problemi di prestazioni di un'applicazione Web](/web/fundamentals/getting-started/codelabs/web-perf/) 
<br>
Questo codelab ti aiuterà ad imparare ad identificare e correggere i 
colli di bottiglia di prestazioni di un'applicazione web.

### Chrome DevTools

* [Come controllare le Performance](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [Prestazioni di esecuzione](/web/tools/chrome-devtools/rendering-tools/)
* [Introduzione all'Analisi delle Prestazioni di Rete](/web/tools/chrome-devtools/network-performance)


### Corsi Udacity

[Ottimizzazione del Rendering del Browser](https://www.udacity.com/course/browser-rendering-optimization--ud860)<br>
Il guru delle performance di Google, Paul Lewis, è qui per aiutarti a 
distruggere i rallentamenti e creare applicazioni web che mantengono 
60 fotogrammi al secondo.

[Percorso di Rendering Critico](https://www.udacity.com/course/website-performance-optimization--ud884)<br>
Ulteriori informazioni sul percorso di rendering critico o l'insieme dei 
passaggi che i browser devono seguire per convertire HTML, CSS e 
JavaScript in siti web vivi e vegeti.

[da HTTP/1 a HTTP/2](https://www.udacity.com/course/client-server-communication--ud897)<br>
Surma inizia dalle basi di HTTP/1 fino a HTTP/2, come caricare 
efficacemente gli asset e copre anche gli aspetti di sicurezza di 
questi protocolli.
<div style="clear:both;"></div>

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
