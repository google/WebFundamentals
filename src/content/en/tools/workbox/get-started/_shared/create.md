{# wf_md_include #}
## Step 6: Create your own service worker {: #inject }

Up until now, you've been letting Workbox generate your entire service
worker. If you've got a big project, or you want to customize how you cache
certain resources, or do custom logic in your service worker,
then you need to create a custom service worker that calls Workbox instead.
Think of the service worker code you write as a template. You write your custom logic with
placeholder keywords that instruct Workbox where to inject its code.

In this section, you add push notification support in your service worker. Since this is custom
logic, you need to write custom service worker code, and then inject the Workbox code into
the service worker at build-time.

1. Re-focus the tab containing your project source code.
1. Open `package.json`.
1. Click **Add Package**, type `workbox-sw`, then click on the matching package to install
   that library.
1. Write down the version number of `workbox-sw` that gets installed. You'll
   need it later.
1. Add the following line of code to the `init()` function in `app.js`.

    <pre class="prettyprint">function init() {
      ...
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
            <strong>registration.pushManager.subscribe({userVisibleOnly: true});</strong>
          }).catch(registrationError => {
            ...
          });
        });
      }
    }</pre>

    <aside class="warning">**Warning**: For simplicity, this demo asks for permission to
    send push notifications as soon as the service worker is registered. Best practices
    strongly recommend against out-of-context permission requests like this in real apps.
    See [Permission UX][UX].</aside>

[UX]: /web/fundamentals/push-notifications/permission-ux

1. Click **New File**, enter `src/sw.js`, then press <kbd>Enter</kbd>.
1. Add the following code to `src/sw.js`.

    <pre class="prettyprint">// TODO: Replace Xs.
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/X.X.X/workbox-sw.js');
    
    // Note: Ignore the error that Glitch raises about workbox being undefined.
    workbox.skipWaiting();
    workbox.clientsClaim();
    
    workbox.routing.registerRoute(
      new RegExp('https://hacker-news.firebaseio.com'),
      workbox.strategies.staleWhileRevalidate()
    );

    self.addEventListener('push', (event) => {
      const title = 'Get Started With Workbox';
      const options = {
        body: event.data.text()
      };
      event.waitUntil(self.registration.showNotification(title, options));
    });

    workbox.precaching.precacheAndRoute([]);</pre>

    <aside class="important">**Important**: `workbox.precaching.precacheAndRoute([])` is a
    placeholder keyword. At build-time, Workbox injects the list of files to cache into the
    array.</aside>

1. Replace each `X` in `importScripts('.../X.X.X/workbox-sw.js')` with
   the version number of `workbox-sw` in `package.json` that you noted earlier.
