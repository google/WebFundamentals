project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Dimensionamento dei contenuti in base al viewport {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Usando dispositivi mobili o desktop, gli utenti preferiscono scorrere i siti Web in verticale e non in orizzontale, per cui la necessità di uno scorrimento orizzontale o della riduzione dello schermo per visualizzare l'intera pagina potrebbe compromettere l'esperienza d'uso.


## TL;DR {: .hide-from-toc }
- Non utilizzare elementi di grandi dimensioni e larghezza fissa.
- La resa ottimale dei contenuti non deve essere legata alla larghezza di un viewport specifico.
- Utilizza i media query CSS per applicare diversi stili per gli schermi ampi e ristretti.


Durante lo sviluppo di un sito mobile con tag `meta viewport`, potresti creare per errore contenuti di pagina inadatti al viewport specificato, come ad esempio un'immagine con una larghezza maggiore del viewport che potrebbe costringere a uno scorrimento in orizzontale. Modifica il contenuto in modo da adattarlo alla larghezza del viewport per evitare agli utenti di eseguire uno scorrimento in orizzontale.

A causa della variabilità di dimensioni e larghezza dello schermo in pixel CSS fra dispositivi diversi (es. telefoni, tablet o persino modelli diversi di telefono), la resa ottimale dei contenuti non deve basarsi su un viewport specifico.

L'assegnazione di elevate larghezze CSS assolute agli elementi della pagina (come nell'esempio sottostante) produrranno un `div` troppo ampio per i viewport dei dispositivi più piccoli (es. quelli con larghezza di 320 pixel CSS come i primi iPhone). Piuttosto, utilizza valori di larghezza relativi come `width: 100%`. Fai attenzione anche nell'utilizzo dei valori di posizionamento assoluti che potrebbero causare la fuoriuscita dell'elemento dal viewport degli schermi di piccole dimensioni.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Pagina con un elemento con larghezza fissa di 344 pixel in uno dei primi iPhone.">
      Vedi esempio
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Pagina con un elemento a larghezza fissa di 344 pixel di un Nexus 5.">
      Vedi esempio
    {% endlink_sample %}
  </div>
</div>



