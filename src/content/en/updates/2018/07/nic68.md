project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 68 for developers?

{# wf_published_on: 2018-07-24 #}
{# wf_updated_on: 2018-07-23 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome68,new-in-chrome #}
{# wf_featured_snippet: Chrome 68 brings changes to the Add to Home Screen behavior on Android, giving you more control. The page lifecycle API tells you when your tab has been suspended or restored. And the Payment Handler API makes it possible for web-based payment apps to support the Payment Request experience. Let’s dive in and see what’s new for developers in Chrome 68! #}
{# wf_blink_components: N/A #}

# New in Chrome 68 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jlbLRsAmKtw"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* The [Add to Home Screen behavior](#a2hs) on Android is changing to give
  you more control.
* The [Page Lifecycle API](#page-lifecycle) tells you when your tab has been
  suspended or restored.
* And the [Payment Handler API](#payment-handler) makes it possible for
  web-based payment apps to support the Payment Request experience.

And there’s [plenty more](#more)!

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 68!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/67.0.3396.62..68.0.3440.74).


## Add to Home Screen changes {: #a2hs }

If your site meets the
[add to home screen criteria](/web/fundamentals/app-install-banners/#criteria),
Chrome will no longer show the add to home screen banner. Instead, you’re in
control over when and how to prompt the user.

To prompt the user, listen for the `beforeinstallprompt` event, then, save
the event and add a button or other UI element to your app to indicate it can
be installed.

```javascript
let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});
```

<img src="/web/updates/images/2018/06/a2hs-dialog-g.png" class="attempt-right">

When the user clicks the install button, call `prompt()` on the saved
`beforeinstallprompt` event, Chrome then shows the add to home screen dialog.

<div class="clearfix"></div>

```javascript
btnInstall.addEventListener('click', () => {
  // Update the install UI to remove the install button
  document.querySelector('#install-button').disabled = true;
  // Show the modal add to home screen dialog
  installPromptEvent.prompt();
  // Wait for the user to respond to the prompt
  installPromptEvent.userChoice.then(handleInstall);
});
```

<img src="/web/updates/images/2018/06/a2hs-infobar-g.png" class="attempt-right">

To give you time to update your site Chrome will show a mini-infobar the first
time a user visits a site that meets the add to home screen criteria. Once
dismissed, the mini-infobar will not be shown again for a while.

[**Changes to Add to Home Screen Behavior**](/web/updates/2018/06/a2hs-updates)
has the full details, including code samples you can use and more.


<div class="clearfix"></div>

## Page Lifecycle API {: #page-lifecycle }

<a href="/web/updates/images/2018/07/lifecycle-states.png">
  <img src="/web/updates/images/2018/07/lifecycle-states.png" class="attempt-right">
</a>

When a user has a large number of tabs running, critical resources such as
memory, CPU, battery and the network can be oversubscribed, leading to a
bad user experience.

If your site is running in the background, the system may suspend the it to
conserve resources. With the new Page Lifecycle API, you can now listen for,
and respond to these events.

For example, if a tab needs to be discarded to conserve memory, the browser
will fire the `frozen` event, where you can store any necessary state. Then,
when the user refocuses the tab, the `resume` event is fired, making it
possible to restore the previous state.

<div class="clearfix"></div>

```javascript
const prepareForFreeze = () => {
  // Close any open IndexedDB connections.
  // Release any web locks.
  // Stop timers or polling.
};
const reInitializeApp = () => {
  // Restore IndexedDB connections.
  // Re-acquire any needed web locks.
  // Restart timers or polling.
};
document.addEventListener('freeze', prepareForFreeze);
document.addEventListener('resume', reInitializeApp);
```

Check out Phil's [Page Lifecycle API](/web/updates/2018/07/page-lifecycle-api)
post for **lots** more detail, including code samples, tips and more.
You can find the [spec](https://wicg.github.io/page-lifecycle/spec.html) and an
[explainer doc](https://github.com/WICG/page-lifecycle) on GitHub.

<div class="clearfix"></div>


##  Payment Handler API {: #payment-handler }


The [Payment Request API](https://www.w3.org/TR/payment-request/) is an open,
standards-based way to accept payments. The
[Payment Handler API](https://www.w3.org/TR/payment-handler/) extends the
reach of Payment Request by enabling web-based payment apps to facilitate
payments directly within the Payment Request experience.

As a seller, adding an existing web-based payment app is as easy as adding an
entry to the `supportedMethods` property.

```javascript
const request = new PaymentRequest([{
  // Your custom payment method identifier comes here
  supportedMethods: 'https://bobpay.xyz/pay'
}], {
  total: {
    label: 'total',
    amount: { value: '10', currency: 'USD' }
  }
});
```

If a service worker that can handle the specified payment method is installed,
it will show up in the Payment Request UI and the user can pay with it.

Eiji has a [great post](/web/updates/2018/06/payment-handler-api) that shows
how to implement this for merchant sites, and for payment handlers.


## And more! {: #more }

These are just a few of the changes in Chrome 68 for developers, of course,
there’s plenty more.


* Content embedded in an `iframe`
  [requires a user gesture to navigate](https://www.chromestatus.com/feature/5629582019395584)
  the top-level browsing context to a different origin.
* Since Chrome 1, the CSS
  [`cursor` values for `grab` and `grabbing`](https://www.chromestatus.com/feature/5575087101050880)
  have been  prefixed, we now support the standard, un-prefixed values.
  **Finally.**
* And - this is a big one! The HTTP [cache is now ignored when requesting
  updates to a service worker](/web/updates/2018/06/fresher-sw), bringing
  Chrome inline with the spec and other browsers.


### New in DevTools

Be sure to check out [New in Chrome DevTools](/web/updates/2018/05/devtools), to
learn what’s new in for DevTools in Chrome 68.

### Subscribe

Then, click the [subscribe](https://goo.gl/6FP1a5) button on our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 69 is released, I’ll be right
here to tell you -- what’s new in Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
