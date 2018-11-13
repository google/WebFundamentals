project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentazione di riferimento per audit Lighthouse "Render-blocking
stylesheets" e "Render-blocking scripts".

{# wf_updated_on: 2018-11-13 #}
{# wf_published_on: 2016-12-01 #}
{# wf_blink_components: N/A #}

# Risorse bloccanti il rendering {: .page-title }

## Overview {: #overview }

Caricamenti rapidi delle pagine comportano un maggiore coinvolgimento degli
utenti, più visualizzazioni di pagina e conversione migliorata.

You can improve your page load speed by inlining links and scripts that
are required for first paint, and deferring those that aren't.

## Raccomandazioni {: #recommendations }

Nel report, Lighthouse elenca tutti i link o gli script bloccanti per il
rendering che ha rilevato. L'obiettivo è ridurre questo numero.

Lighthouse segnala tre tipi di collegamenti bloccanti il rendering: script,
fogli di stile e importazioni HTML. Il modo in cui esegui l'ottimizzizzazione
dipende dal tipo di risorsa con cui stai lavorando.

Note: quando una risorsa viene definita "critica" di seguito, significa che la
risorsa è necessaria per il primo disegno o è fondamentale per le funzionalità
principali della pagina.

- Per gli script critici, prendi in considerazione di inserirli nel tuo codice
HTML. Per gli script non critici, prendere in considerazione la possibilità di
contrassegnarli con gli attributi `async` o `defer`. Si veda [Aggiungere
interattività con
JavaScript](/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)
per saperne di più.
- Per i fogli di stile, prendi in considerazione la possibilità di dividere i
tuoi stili in file diversi, organizzati per media query e quindi aggiungere un
attributo `media` a ciascun link del foglio di stile. Quando si carica una
pagina, il browser blocca solo il primo disegno per recuperare i fogli di stile
che corrispondono al dispositivo dell'utente. Vedi [Render-Blocking
CSS](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
per saperne di più.
- Per le importazioni HTML non critiche, contrassegnali con l'attributo `async`.
Come regola generale, `async` dovrebbe essere usato il più possibile con le
importazioni HTML.

## More information {: #more-info }

Lighthouse identifica tre tipi di risorse bloccanti.

A `<script>` tag that:

- Si trova all'interno di `<head>` del documento.
- Does not have a `defer` attribute.
- Does not have an `async` attribute.

Un tag `<link rel="stylesheet">` che:

- Does not have a `disabled` attribute. When this attribute is present,the
browser does not download the stylesheet.
- Does not have a `media` attribute that matches the user's device.

Un tag `<link rel="import">` che:

- Non ha un attributo `async`.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
