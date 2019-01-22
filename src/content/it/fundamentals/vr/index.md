project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2019-01-22 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR {: .page-title }

Warning: WebVR è ancora sperimentale e soggetto a modifiche.

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="jT2mR9WzJ7Y"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

WebVR è una API JavaScript ideata per utilizzare qualsiasi tipo di visore VR e dispositivo
abilitato per VR posseduto dagli utenti, come i [visori
Daydream](https://vr.google.com/daydream/) e il telefono Pixel, per creare
esperienze 3D completamente immersive nel tuo browser.

<div class="clearfix"></div>

## Supporto e disponibilità

Attualmente l'API Device è in [fase di
sviluppo](https://www.chromestatus.com/features/5680169905815552) ma puoi
provarla con:

- Il flag [#webxr] in Chrome 66 e versioni successive.
Come un [OriginTrial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md) in Chrome 67
e versioni successive.
- Firefox Nightly.

È anche disponibile
tramite il [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill).
Tuttavia, bisogna tenere a mente
che la VR è *estremamente sensibile alle prestazioni* e che il polyfill ha in
genere un costo di prestazioni relativamente elevato, quindi potrebbe essere
utile valutare se desideri utilizzare il polyfill o meno per un utente che
non ha il supporto nativo per WebVR.

Se hai dubbi, evita episodi di cinetosi ai tuoi utenti causati da
di esperienze poco soddisfacenti!

[Informazioni sull'ultimissimo stato di WebVR](./status/).

## Creazione di contenuti WebVR

Per creare contenuti WebVR è necessario utilizzare alcune API nuovissime nonché
tecnologie esistenti come
[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) e
[Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
oltre a tenere in considerazione i diversi tipi di input e visori.

<div class="attempt-left">
  <h3>Inizia con WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Get started with WebVR">
  </a>
<p>Inizia subito con WebVR, aggiungendo l'API VR a una scena WebGL.
<br> <a href="./getting-started-with-webvr/">Per saperne di più</a></p>
</div>
<div class="attempt-right">
  <h3>Aggiungere input a una scena WebVR</h3>
  <a href="./adding-input-to-a-webvr-scene/">
<img src="img/adding-input-to-a-webvr-scene.jpg" alt="Add input to a WebVR
scene">
  </a>
<p>L'interazione è una parte cruciale per fornire un'esperienza coinvolgente
e immersiva. <br> <a href="./adding-input-to-a-webvr-scene/">Per
iniziare</a></p>
</div>

<div class="clearfix"></div>

### Ulteriori risorse

Nel web cominciano ad affiorare molte ottime risorse su WebVR.

- [[Scopri di più sull'API
WebVR](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
- [Vedi gli esempi WebVR](https://webvr.info/samples/)
- [Designing per Google
Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Tenere traccia delle prestazioni

<img src="img/oce.png" class="attempt-right" alt="WebVR Performance">

Per minimizzare il disagio delle persone che utilizzano le esperienze WebVR,
la frequenza dei fotogrammi deve essere mantenuta costante (e alta). Altrimenti
gli utenti potrebbero soffrire di cinetosi!

Solitamente sui dispositivi mobili la frequenza di aggiornamento è pari a 60 Hz,
vale a dire un target di 60 fps (o 16 ms per fotogramma, *incluso* l'overhead
del browser per fotogramma). Sul desktop in genere puntiamo a 90 Hz (11 ms incluso
l'overhead).

Per raggiungere questi obiettivi è necessario testare [regolarmente nei
dispositivi di destinazione](/web/tools/chrome-devtools/remote-debugging/) e
[utilizzare la timeline di Chrome DevTools per misurare i costi per
fotogramma](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Sfruttare il Progressive Enhancement al meglio

<img src="img/touch-input.png" class="attempt-right" alt="Use Progressive
Enhancement to maximize reach">

Cosa fai se gli utenti non hanno un casco con visore (Head Mounted Display, HMD) o
un dispositivo con capacità VR? La risposta è usare il Progressive
Enhancement.

1. Supponi che l'utente stia utilizzando input tradizionali, come la
tastiera, un mouse o un touchscreen senza accesso al visore VR.
2. Adattati ai cambiamenti di disponibilità di input e visori in fase di
esecuzione.

Fortunatamente le [API
WebVR](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) consentono di
rilevare le modifiche nell'ambiente VR per consentirci di individuare e
adattarci ai diversi input e visualizzare le opzioni nel
dispositivo dell'utente.

Pianificare partendo da un ambiente non VR ti consente di rendere la tua soluzione molto più
raggiungibile e assicurarti di fornire la migliore esperienza possibile.


Per ulteriori informazioni, leggi la nostra guida su come [aggiungere input a una
scena WebVR](./adding-input-to-a-webvr-scene/).

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
