## Step 6: Create your own service worker {: #inject }

Up until now, you've been letting Workbox generate your entire service
worker. If you've got a big project, or you want to customize how you cache
certain resources, or do custom logic in your service worker, such as add
support for push notifications, which you're going to add in this section,
then you need to create a custom service worker that calls Workbox instead.
Think of the service worker code you write as a template. You write your custom logic with
placeholder keywords that instruct Workbox where to inject its code.

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
1. Insert the following code into `src/sw.js`.

    <pre class="prettyprint"><strong>// TODO: Replace Xs.
    importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.vX.X.X.js');
    
    // Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
    const workbox = new WorkboxSW({
      skipWaiting: true,
      clientsClaim: true
    });
    
    workbox.router.registerRoute(
      new RegExp('^https://hacker-news.firebaseio.com'),
      workbox.strategies.staleWhileRevalidate()
    );
    
    self.addEventListener('push', (event) => {
      const title = 'Get Started With Workbox';
      const options = {
        body: event.data.text()
      };
      event.waitUntil(self.registration.showNotification(title, options));
    });

    workbox.precache([]);</strong></pre>

    <aside class="important">**Important**: `workbox.precache([])` is a placeholder keyword.
    At build-time, Workbox injects the list of files to cache into the array.</aside>

1. Replace each `X` in `importScripts('.../workbox-sw.prod.vX.X.X.js')` with
   the version number of `workbox-sw` in `package.json` that you noted earlier.
