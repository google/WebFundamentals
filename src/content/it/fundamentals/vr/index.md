project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2017-10-17 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR {: .page-title }

Warning: WebVR is still experimental and subject to change.

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="jT2mR9WzJ7Y"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

WebVR is a JavaScript API that makes use of any VR headset and a VR-capable
device your users have — such as a [Daydream
headset](https://vr.google.com/daydream/)
and Pixel phone — to create fully immersive 3D experiences in your browser.

<div class="clearfix"></div>

## Supporto e disponibilità

Today the WebVR 2.0 API is
[under development](https://www.chromestatus.com/features/5680169905815552),
but you can try out the WebVR 1.1 API in:

- Chrome Beta (M56+), via an [Origin
Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
- Firefox Nightly.
- Samsung Internet for Android and for Gear VR.

For browsers that don’t support WebVR, or perhaps have older versions of the
APIs, you can fall back to the [WebVR
Polyfill](https://github.com/googlevr/webvr-polyfill).
Bear in mind, however, that VR is *extremely performance-sensitive* and
polyfills typically have a relatively large performance cost, so it may be worth
considering whether or not you wish to use the polyfill for a user who doesn’t
have native support for WebVR.

When in doubt, avoid giving people motion sickness through poorly-performing
experiences!

[Get the latest status on WebVR.](./status/)

## Creazione di contenuto WebVR

To make WebVR content, you will need to make use of some brand new APIs, as well
as existing technologies like
[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial)
and [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API),
as well as accounting for different input types and headsets.

<div class="attempt-left">
  <h3>Inizia con WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Get started with WebVR">
  </a>
  <p>
Make a flying start with WebVR by taking a WebGL scene and adding VR
APIs.<br>
    <a href="./getting-started-with-webvr/">Learn More</a>
  </p>
</div>
<div class="attempt-right">
  <h3>Add Input to a WebVR Scene</h3>
  <a href="./adding-input-to-a-webvr-scene/">
<img src="img/adding-input-to-a-webvr-scene.jpg" alt="Add input to a WebVR
scene">
  </a>
  <p>
Interaction is a crucial part of providing an engaging and immersive
experience.<br>
    <a href="./adding-input-to-a-webvr-scene/">Get Started</a>
  </p>
</div>

<div class="clearfix"></div>

### More resources

Ci sono alcune eccellenti risorse WebVR che iniziano ad apparire sul web.

- [Learn about the WebVR
APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
- [Vedi gli esempi WebVR](https://webvr.info/samples/)
- [Designing for Google
Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Keep track of your performance

<img src="img/oce.png" class="attempt-right" alt="WebVR Performance">

In order to minimize discomfort for the people using WebVR experiences, they
must maintain a consistent (and high) frame rate. Failing to do so can give
users motion sickness!

Sui dispositivi mobili la frequenza di aggiornamento è in genere di 60 Hz, il
che significa che il target è 60 fps (o 16 ms per frame, *incluso* l'overhead
del browser per frame). Sul desktop, il target è in genere 90Hz (11 ms incluso
overhead).

To meet those goals you will need to test [regularly on your target
devices](/web/tools/chrome-devtools/remote-debugging/),
and should [use Chrome DevTools’ Timeline to measure your per-frame
costs](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Embrace Progressive Enhancement

<img src="img/touch-input.png" class="attempt-right" alt="Use Progressive
Enhancement to maximize reach">

What are you to do if your users don’t have a Head Mounted Display (‘HMD’) or
VR-capable device? The best answer is to use Progressive Enhancement.

1. Assume the user is using traditional input, such as a keyboard, mouse,
ortouchscreen with no access to a VR headset.
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

For more, read our guide on [adding input to a WebVR
scene](./adding-input-to-a-webvr-scene/).
