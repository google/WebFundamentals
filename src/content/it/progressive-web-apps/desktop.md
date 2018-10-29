project_path: /web/_project.yaml
book_path: /web/progressive-web-apps/_book.yaml
description: Progressive Web App funzionano sul desktop Chrome OS, Mac, Linux e
Windows.

{# wf_updated_on: 2018-10-18 #}
{# wf_published_on: 2018-05-08 #}
{# wf_blink_components: N/A #}

#   {b0}Progressive Web App Desktop{/b0} sono supportate nelle seguenti piattaforme:
  {ul1}
    {li2}Chrome OS (Chrome 67+){/li2}
    {li3}Linux (Chrome 70+){/li3}
    {li4}Windows (Chrome 70+){/li4}
  {/ul1}

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="success">
  <b>Progressive Web App Desktop</b> sono supportate nelle seguenti piattaforme:
  <ul>
    <li>Chrome OS (Chrome 67+)</li>
    <li>Linux (Chrome 70+)</li>
    <li>Windows (Chrome 70+)</li>
  </ul>
</aside>
<aside class="dogfood">Il supporto <b>Mac</b> per gli PWA Desktop dovrebbe
arrivare con Chrome 72. Per testare su versioni precedenti, abilitare il flag
<code>#enable-desktop-pwas</code> .</aside>

<div class="clearfix"></div>

![Spotify's desktop progressive web
app](/web/progressive-web-apps/images/spotify-screenshot.jpg){: .attempt-right }

Le app desktop progressive web possono essere "installate" sul dispositivo
dell'utente in modo molto simile alle app native. Sono **veloci**. Sono
**integrate** perché lanciate allo stesso modo di altre app ed eseguite in una
finestra, senza una barra degli indirizzi oppure delle schede. Sono
**affidabili** perché gli addetti all'assistenza possono mettere in cache tutte
le risorse di cui hanno bisogno per essere eseguite. Inoltre creano
un'esperienza **coinvolgente** per gli utenti.

<div class="clearfix"></div>

## Perché creare Progressive Web App Desktop? {: #why}

Il mondo mobile ha guidato molto dell'evoluzione delle Progressive Web App. Ma
mentre la crescita del mobile è stata così forte, l'utilizzo del desktop è
ancora in crescita. I picchi di utilizzo del telefono cellulare sono al mattino
e alla sera ed anche i tablet hanno un utilizzo significativamente più elevato
la sera. L'utilizzo del desktop è distribuito più uniformemente durante l'arco
della giornata rispetto all'utilizzo mobile. Ha un uso significativo durante il
giorno in cui la maggior parte delle persone si trova al lavoro e alle proprie
scrivanie.

![Device usage by time](/web/progressive-web-apps/images/device-usage.png){:
.attempt-right }

Having that ‘installed’, native feel, is important to users, it gives them the
confidence that the app will be fast, integrated, reliable and engaging.
Desktop Progressive Web Apps can be launched from the same place as other
desktop apps, but that they run in an app window - so they look and feel
like other apps on the desktop.

<div class="clearfix"></div>

## Come iniziare {: #getting-started }

L'inizip non è diverso da quello che stai già facendo per le progressive web app
esistenti; non è come se si trattasse di una nuova classe di app. Tutto il
lavoro che hai svolto è ancora valido. I [service
worker](/web/fundamentals/primers/service-workers/) rendono il lavoro veloce ed
efficiente; [Web Push e Notifications](/web/fundamentals/push-notifications/)
mantengono gli utenti aggiornati e possono essere "installati" con [la richiesta
di aggiunta alla schermata iniziale](/web/fundamentals/app-install-banners/).
L'unica vera differenza è che invece di girare in una scheda del browser
l'esecuzione è in una finestra app.

<div class="clearfix"></div>

## Considerazioni sulla progettazione {: #design-considerations }

Ci sono alcune considerazioni uniche che è necessario prendere in considerazione
quando si creano Progressive Web App Desktop, cose che non si applicano
necessariamente alle Progressive Web App sui dispositivi mobili.

### La finestra dell'app {: #app-window }

In una finestra app non ci sono tab o barre degli indirizzi, c'è solo la tua
app. È ottimizzata per supportare le esigenze delle app, con un'organizzazione e
manipolazione delle finestre più flessibile rispetto alle schede del browser. Le
finestre delle app facilitano l'unificazione con la finestra a schermo intero o
il multi-task con più finestre aperte. Le finestre app semplificano anche il
passaggio da un'app all'altra utilizzando un commutatore o una scorciatoia da
tastiera, ad esempio alt-tab.

![App window components on Chrome
OS](/web/progressive-web-apps/images/app-window-elements.png)

Come ti aspetteresti, la finestra app ha le icone standard della barra del
titolo per ridurre a icona, ingrandire e chiudere la finestra. Anche la barra
del titolo è a tema in base al `theme_color` definito nel [web app
manifest](/web/fundamentals/web-app-manifest/). E la tua app dovrebbe essere
[progettata](#responsive-design) per occupare tutta la larghezza della finestra.

![App menu](/web/progressive-web-apps/images/app-menu.png){: .attempt-left }

All'interno della finestra dell'app c'è anche il menu dell'app (il pulsante con
i tre puntini), che ti dà accesso alle informazioni sull'app, ti consente di
accedere facilmente all'URL, stampare la pagina, cambiare lo zoom della pagina
oppure aprire l'app nel tuo browser.

<div class="clearfix"></div>

### Usa il responsive design {: #responsive-design }

![Full screen app window](/web/progressive-web-apps/images/dpwa-resp-1.png){:
.attempt-right }

Le app sul desktop hanno accesso a uno schermo molto più grande. Non limitarti a
riempire il tuo contenuto con margini extra, ma usa quello spazio aggiuntivo
creando nuovi breakpoint per schermi più ampi. Alcune applicazioni beneficiano
davvero di questa visione più ampia.

<div class="clearfix"></div>

Quando pensi ai tuoi breakpoint, pensa a come gli utenti useranno la tua app e
come potrebbero ridimensionarla. In un'app meteo una finestra di grandi
dimensioni potrebbe mostrare una previsione di 7 giorni, quindi, man mano che la
finestra si riduce, anziché ridurne tutto, potrebbe mostrare una previsione di 5
giorni. Mentre continua a ridursi, il contenuto potrebbe spostarsi in giro ed
essere ottimizzato per un display più piccolo.

![7 day forecast in menu](/web/progressive-web-apps/images/dpwa-resp-2.png){:
.attempt-left }
![5 day forecast in menu](/web/progressive-web-apps/images/dpwa-resp-3.png){:
.attempt-right }

<div class="clearfix"></div>

![Full screen app window](/web/progressive-web-apps/images/dpwa-resp-4.png){:
.attempt-right }

For some apps, a mini-mode might be really helpful. This weather app shows
only the current conditions. A music player might only show me the current
song and the buttons to change to the next song.

Puoi portare questa idea di responsive design al livello successivo per
supportare convertibili come Pixelbook o Surface. Quando si passa alla modalità
tablet, questi dispositivi rendono la finestra attiva a schermo intero e, a
seconda di come l'utente tiene il dispositivo, possono essere orizzontali o
verticali.

Concentrati sull'ottimizzazione del responsive design, ed questo ciò che conta
qui. Sia che l'utente abbia ridimensionato la finestra, sia che il dispositivo
lo abbia fatto perché si è passati alla modalità tablet, la progettazione
responsive è fondamentale per una Progressive Web App Desktop di successo.

La finestra dell'app desktop apre tante nuove possibilità. Lavora con i tuoi
designer e segui un approccio responsive che aggiunge nuovi breakpoint per
schermi più grandi, supporta visualizzazioni di paesaggi o di ritratti, funziona
a schermo intero o niente e funziona bene con le tastiere virtuali.

### Chiedere all'utente l'installazione

L'installazione di una Progressive Web App Desktop, nota come *Aggiungi a
Homescreen* su dispositivi mobili, funzionerà allo stesso modo.

<img src="/web/updates/images/2018/05/spotify-a2hs.png" alt="Spotify's Add to
Home Screen button" class="attempt-left" style="max-height: 200px;">

Se i [criteri](/web/fundamentals/app-install-banners/#criteria) di Chrome sono
soddisfatti, Chrome genererà un evento `beforeinstallprompt`. Nel gestore
eventi, aggiorna l'interfaccia utente per indicare all'utente che è possibile
aggiungere la tua app alla schermata iniziale. Ad esempio, la Progressive Web
App Desktop di Spotify aggiunge un pulsante "Installa app", appena sopra il nome
del profilo utente.

See [Add to Home Screen](/web/fundamentals/app-install-banners/) for more
information about how to handle the event, update the UI and show the add to
home screen prompt.

<div class="clearfix"></div>

## Quali sono i prossimi passi?

In addition to supporting additional platforms, we're also looking at:

- **Keyboard shortcuts** - Adding support for keyboard shortcuts, so you
canprovide your own functionality.
- **Badging for the launch icon** Let the user know about importantevents that
you don’t want to display a full notification for.
- **Link capturing** - Opening the installed PWA when the user clicks on alink
handled by that app.

### Learn more

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video"
data-video-id="NITk4kXMQDw?t=1678" data-autohide="1" data-showinfo="0"
frameborder="0" allowfullscreen>
  </iframe>
</div>

Controlla i talk del Google I/O 2018, **PWA: costruisci bridge su dispositivi
mobili, desktop e nativi** , copre tutto, dalle desktop PWA, le modifiche
imminenti all'aggiungi alla schermata Home e altro ancora.

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
