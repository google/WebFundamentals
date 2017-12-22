project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2017-12-22 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR {: .page-title }

Warning: WebVR è ancora sperimentale e soggetto a modifiche.

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="jT2mR9WzJ7Y"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

WebVR è una JavaScript API che fa uso di qualsiasi apparecchio VR e di un
dispositivo VR che i tuoi utenti hanno, come un [auricolare
Daydream](https://vr.google.com/daydream/) e un telefono Pixel, per creare
esperienze 3D completamente immersive nel tuo browser.

<div class="clearfix"></div>

## Supporto e disponibilità

Oggi WebVR API 2.0 è in [fase di
sviluppo](https://www.chromestatus.com/features/5680169905815552) ma puoi
provare WebVR 1.1 API in:

- Chrome Beta (M56 +) tramite un [Origin
Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
- Firefox Nightly.
- Samsung Internet per Android e per Gear VR.

Per i browser che non supportano WebVR, o che hanno versioni precedenti delle
API, è possibile tornare a [WebVR
Polyfill](https://github.com/googlevr/webvr-polyfill). Tenete a mente, tuttavia,
che la VR è *estremamente sensibile alle prestazioni* e che  polyfill ha in
genere un costo di prestazioni relativamente elevato, quindi potrebbe essere
utile valutare se si desidera utilizzare il polyfill o meno per un utente che
non ha il supporto nativo per WebVR .

In caso di dubbio evita di dare alle persone malesseri da movimento attraverso
esperienze da scarse performance!

[Controlla lo stato attuale di WebVR.](./status/)

## Creazione di contenuto WebVR

Per creare contenuti WebVR è necessario utilizzare alcune API nuovissime nonché
tecnologie esistenti come
[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) e
[Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
oltre a tenere conto di diversi tipi di input e cuffie.

<div class="attempt-left">
  <h3>Inizia con WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Get started with WebVR">
  </a>
<p>Inizia subito con WebVR prendendo una scena WebGL e aggiungendo VR API.
<br> <a href="./getting-started-with-webvr/">Per saperne di più</a></p>
</div>
<div class="attempt-right">
  <h3>Aggiungi input ad una scena WebVR</h3>
  <a href="./adding-input-to-a-webvr-scene/">
<img src="img/adding-input-to-a-webvr-scene.jpg" alt="Add input to a WebVR
scene">
  </a>
<p>L'interazione è una parte cruciale per fornire un'esperienza coinvolgente
ed immersiva. <br> <a href="./adding-input-to-a-webvr-scene/">Per
iniziare</a></p>
</div>

<div class="clearfix"></div>

### Ulteriori risorse

Ci sono alcune eccellenti risorse WebVR che iniziano ad apparire sul web.

- [Scopri di più a proposito di WebVR
API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
- [Vedi gli esempi WebVR](https://webvr.info/samples/)
- [Designing per Google
Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Tieni traccia delle performance

<img src="img/oce.png" class="attempt-right" alt="WebVR Performance">

Al fine minimizzare il disagio per le persone che utilizzano le esperienze WebVR
devono mantenere una frequenza fotogrammi coerente (e alta). Non riuscendo a
farlo puoi causare agli utenti malesseri da spostamento!

Sui dispositivi mobili la frequenza di aggiornamento è in genere di 60 Hz, il
che significa che il target è 60 fps (o 16 ms per frame, *incluso* l'overhead
del browser per frame). Sul desktop, il target è in genere 90Hz (11 ms incluso
overhead).

Per raggiungere questi obiettivi è necessario testare [regolarmente nei
dispositivi di destinazione](/web/tools/chrome-devtools/remote-debugging/) ed
[utilizzare la timeline di Chrome DevTools per misurare i costi per
frame](/web/tools/chrome-devtools/evaluate-performance/timeline-tool) .

## Abbracciare il Progressive Enhancement

<img src="img/touch-input.png" class="attempt-right" alt="Use Progressive
Enhancement to maximize reach">

Che cosa devi fare se i tuoi utenti non hanno un Head Mounterd Display ('HMD') o
un dispositivo con capacità VR? La migliore risposta è usare Progressive
Enhancement.

1. Supponiamo che l'utente stia utilizzando l'input tradizionale, ad esempio una
tastiera, un mouse o un touchscreen senza accesso ad un VR headset.
2. Adattamento alle modifiche nella disponibilità di input e cuffie in fase di
esecuzione.

Fortunatamente le [API
WebVR](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) consentono di
rilevare le modifiche nell'ambiente VR per consentirci di individuare e
adattarsi alle modifiche degli input e delle opzioni di visualizzazione nel
dispositivo dell'utente.

Assumendo per prima cosa un ambiente non VR, puoi massimizzare la portata delle
tue esperienze e assicurarti di fornire la migliore esperienza possibile,
indipendentemente dalla configurazione dei tuoi utenti.

Per ulteriori informazioni leggi la nostra guida sull'[aggiunta di input a una
scena WebVR](./adding-input-to-a-webvr-scene/) .

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
