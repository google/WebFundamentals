project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Add to Home Screen gives you the ability to let users quickly and seamlessly add your web app to their home screens without leaving the browser.

{# wf_updated_on: 2019-07-25 #}
{# wf_published_on: 2014-12-16 #}
{# wf_blink_components: Platform>Apps>AppLauncher>Install #}

# Add to Home Screen {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

**If your PWA has use cases where it’s helpful for a user to install
your app, for example if you have users who use your app more than once a
week, you should be promoting the installation of your PWA within the web UI of
your app.**

Add to Home Screen, sometimes referred to as the web app install prompt,
makes it easy for users to install your Progressive Web App on their mobile
or [desktop device](/web/progressive-web-apps/desktop). After the user
accepts the prompt, your PWA will be added to their launcher, and it will run
like any other installed app.

Chrome handles most of the heavy lifting for you:

* On mobile, Chrome will generate a
  [WebAPK](/web/fundamentals/integration/webapks), creating an even
  more integrated experience for your users.
* On desktop, your app will installed, and run in an
  [app window](/web/progressive-web-apps/desktop#app-window).

## What are the criteria? {: #criteria }

{% include "web/fundamentals/app-install-banners/_a2hs-criteria.html" %}

Note: If the web app manifest includes `related_applications` and
has `"prefer_related_applications": true`, the
[native app install prompt](/web/fundamentals/app-install-banners/native)
will be shown instead.

## Show the Add to Home Screen dialog {: #trigger }

<figure class="attempt-right">
  <img src="images/a2hs-dialog-g.png" alt="Add to Home Screen dialog on Android">
  <figcaption>Add to Home Screen dialog on Android</figcaption>
</figure>

In order to show the Add to Home Screen dialog, you need to:

1. Listen for the `beforeinstallprompt` event
1. Notify the user your app can be installed with a button or other element
   that will generate a user gesture event.
1. Show the prompt by calling `prompt()` on the saved `beforeinstallprompt`
   event.

<div class="clearfix"></div>

### Listen for `beforeinstallprompt`

If the add to home screen [criteria](#criteria) are met, Chrome will fire a
`beforeinstallprompt` event, that you can use to indicate your app can be
'installed', and then prompt the user to install it.

When the `beforeinstallprompt` event has fired, save a reference to the event,
and update your user interface to indicate that the user can add your app
to their home screen.

```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  ...
});
```

### Notify the user your app can be installed

There are many different [patterns][install-patterns-mobile] that you can
use to notify the user your app can be installed and promote the installation,
for example, a button in the header, an item in the navigation menu, or an
item in your content feed.

<pre class="prettyprint">
window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  <strong>// Update UI notify the user they can add to home screen
  showInstallPromotion();</strong>
});
</pre>

Note: See [Patterns for Promoting PWA Installation][install-patterns-mobile]
for recommended patterns and best practices for notifying the user your PWA is
installable.

You may want to wait before showing the prompt to the user,
so you don't distract them from what they're doing. For example, if the user
is in a check-out flow, or creating their account, let them complete that
before interrupting them with the prompt.

[install-patterns-mobile]: /web/fundamentals/app-install-banners/promoting-install-mobile

### Show the prompt

To show the add to home screen prompt, call `prompt()` on the saved event
from within a user gesture. It will show a modal dialog, asking the user
to to add your app to their home screen.

Then, listen for the promise returned by the `userChoice` property. The
promise returns an object with an `outcome` property after the prompt has
shown and the user has responded to it.

```js
btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
```

You can only call `prompt()` on the deferred event once. If the user dismisses
it, you'll need to wait until the `beforeinstallprompt` event is fired on
the next page navigation.

<<_mini-info-bar.md>>

<div class="clearfix"></div>

## Determine if the app was successfully installed {: #appinstalled }

To determine if the app was successfully added to the user's home screen _after_
they accepted the prompt, you can listen for the `appinstalled` event.

```js
window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs installed');
});
```

## Detecting if your app is launched from the home screen {: #detect-mode }

### `display-mode` media query

The `display-mode` media query makes it possible to apply styles depending
on how the app was launched, or determine how it was launched with JavaScript.

To apply a different background color for the app above when being launched
from the home screen with `"display": "standalone"`, use conditional CSS:

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

It's also possible to detect if the `display-mode` is standalone from
JavaScript:

```js
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('display-mode is standalone');
}
```

### Safari

To determine if the app was launched in `standalone` mode in Safari, you can
use JavaScript to check:

```js
if (window.navigator.standalone === true) {
  console.log('display-mode is standalone');
}
```

## Updating your app's icon and name

### Android

On Android, when the WebAPK is launched, Chrome will check the currently
installed manifest against the live manifest. If an update is required, it will
be [queued and updated](/web/fundamentals/integration/webapks#update-webapk)
once the device has is plugged in and connected to WiFi.

### Desktop

On Desktop, the manifest is not automatically updated, but this is planned
for a future update.

## Test your add to home screen experience {: #test }

You can manually trigger the `beforeinstallprompt` event with Chrome DevTools.
This makes it possible to see the user experience, understand how the flow
works or debug the flow. If the [PWA criteria](#pwa-criteria) aren't met,
Chrome will throw an exception in the console, and the event will not be fired.

Caution: Chrome has a slightly different install flow for desktop and mobile.
Although the instructions are similar, testing on mobile <b>requires</b> remote
debugging; without it, Chrome will use the desktop install flow.

### Chrome for Android

1. Open a [remote debugging](/web/tools/chrome-devtools/remote-debugging/)
   session to your phone or tablet.
2. Go to the **Application** panel.
3. Go to the **Manifest** tab.
4. Click **Add to home screen**

### Chrome OS, Linux, or Windows

1. Open Chrome DevTools
2. Go to the **Application** panel.
3. Go to the **Manifest** tab.
4. Click **Add to home screen**

### Will `beforeinstallprompt` be fired?

The easiest way to test if the `beforeinstallprompt` event will be fired, is
to use [Lighthouse](/web/tools/lighthouse/) to audit your app, and check the
results of the [User Can Be Prompted To Install The Web App](/web/tools/lighthouse/audits/install-prompt)
test.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}
