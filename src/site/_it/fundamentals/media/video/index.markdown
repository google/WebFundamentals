---
layout: section
title: "Video"
description: "Informazioni su come aggiungere in modo semplice video al tuo sito e assicurare la migliore esperienza agli utenti, su qualsiasi dispositivo."
introduction: "Gli utenti amano i video; possono essere divertenti e informativi. Sui dispositivi mobili, i video possono essere un modo più immediato per acquisire informazioni. Tuttavia, i video consumano larghezza di banda e non funzionano allo stesso modo su tutte le piattaforme. Agli utenti non piace attendere troppo durante il caricamento dei video o premere Riproduci senza che nulla accada. Scopri di più sul modo più semplice per aggiungere video al tuo sito e assicurare la migliore esperienza agli utenti su qualsiasi dispositivo."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Utilizza l'elemento video per caricare, decodificare e riprodurre video sul tuo sito.
    - Crea video in più formati che coprano un'ampia gamma di piattaforme mobili.
    - Ridimensiona correttamente i video e assicurati che non superino le capacità dei relativi contenitori.
    - Dato che l'accessibilità è importante, aggiungi l'elemento traccia come una componente dell'elemento video.
remember:
  media-fragments:
    - La Media Fragments API è supportata dalla maggior parte delle piattaforme, eccetto iOS.
    - Assicurati che le richieste di intervallo siano supportate dal tuo server. Le richieste di intervallo sono attivate per impostazione predefinita nella maggior parte dei server; tuttavia, alcuni servizi di hosting potrebbero disabilitarle.
  dont-overflow:
    - Non modificare la dimensione dell'elemento in modo tale che non rispetti le proporzioni del video originale. Lo schiacciamento e l'allungamento creano un effetto sgradevole.
  accessibility-matters:
    - L'elemento traccia è supportato da Chrome per Android, Safari  per iOS e tutti gli attuali browser su desktop, eccetto Firefox (vedi <a href="http://caniuse.com/track" title="Stato supporto elemento traccia">caniuse.com/track</a>). Sono disponibili anche diversi polyfill. Si consiglia di utilizzare <a href='//www.delphiki.com/html5/playr/' title='Polyfill elemento traccia Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE è supportato da Chrome e Opera su Android, Internet Explorer 11 e Chrome per desktop, con supporto pianificato per <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Sequenza temporale di implementazione MSE Firefox'>Firefox</a>.
  optimize:
    - <a href="../images/">Immagini</a>
    - <a href="../../performance/optimizing-content-efficiency/">Ottimizzazione dell'efficienza nei contenuti</a>
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

