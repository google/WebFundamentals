project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Starting in Chrome 68 on Android, the Add to Home Screen behavior is changing to give you more control over when and how to prompt the user. If your site meets the add to home screen criteria, Chrome will no longer automatically show the add to home screen banner. Instead, you'll need to call prompt() on the saved beforeinstallprompt event to show the add to home screen dialog prompt to your users.

{# wf_updated_on: 2018-07-19 #}
{# wf_published_on: 2018-06-04 #}
{# wf_tags: progressive-web-apps,desktop,chrome68,addtohomescreen #}
{# wf_featured_image: /web/updates/images/2018/06/a2hs-dialog-cropped.png #}
{# wf_featured_snippet: Starting in Chrome 68 on Android, the Add to Home Screen behavior is changing to give you more control over when and how to prompt the user. If your site meets the add to home screen criteria, Chrome will no longer automatically show the add to home screen banner. Instead, you'll need to call <code>prompt()</code> on the saved <code>beforeinstallprompt</code> event to show the add to home screen dialog prompt to your users #}
{# wf_blink_components: UI>Browser>WebAppInstalls #}

# Changes to Add to Home Screen Behavior {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Since we first launched the add to home screen banner, we’ve been working
to label Progressive Web Apps more clearly and simplify the way users can
install them. Our eventual goal is to provide an install button in the
omnibox across all platforms, and in Chrome 68 we are making changes towards
that goal.

Note: Chrome 68 is out of beta. See the
[Add to Home Screen](/web/fundamentals/app-install-banners/) docs for the
current behavior.


## What’s changing?

Starting in Chrome 68 on Android (Stable in July 2018), Chrome will no longer
show the add to home screen banner. If the site meets the
[add to home screen criteria](https://web.dev/install-criteria/),
Chrome will show the mini-infobar. Then, if the user clicks on the
mini-infobar, or you call `prompt()` on the `beforeinstallprompt` event from
within a user gesture, Chrome will show a modal add to home screen dialog.

<style>
  .fb-item { padding: 8px; }
  .fb-title { text-align: center; }
  @media all and (min-width: 900px) {
    .fb-container { display: flex; }
  }
</style>

<div class="fb-container">
  <div class="fb-item">
    <div class="fb-title">
        <b>A2HS banner</b><br>
        Chrome 67 and before
    </div>
    <img src="/web/updates/images/2018/06/a2hs-banner-g.png" class="screenshot">
    <div class="fb-desc">
      <p>
        Shown automatically when site meets the add to home screen criteria,
        and the site does not call <code>preventDefault()</code> on the
        <code>beforeinstallprompt</code> event
      </p>
      <p><b>OR</b></p>
      <p>
        Shown by calling <code>prompt()</code> on the
        <code>beforeinstallprompt</code> event.
      </p>
    </div>
  </div>
  <div class="fb-item">
    <div class="fb-title">
      <b>Mini-infobar</b><br>
      Chrome 68 and later
    </div>
    <img src="/web/updates/images/2018/06/a2hs-infobar-g.png" class="screenshot">
    <div class="fb-desc">
      <p>Shown when the site meets the add to home screen criteria</p>
      <p>
        If dismissed by a user, it will not be shown until a sufficient
        period of time (~3 months) has passed.
      </p>
      <p>
        Shown regardless of if <code>preventDefault()</code> was called on
        the <code>beforeinstallprompt</code> event.
      </p>
      <p>
        This UI treatment will be removed in a future version of Chrome when
        the omnibox install button is introduced.
      </p>
    </div>
  </div>
  <div class="fb-item">
    <div class="fb-title">
      &nbsp;<br><b>A2HS Dialog</b>
    </div>
    <img src="/web/updates/images/2018/06/a2hs-dialog-g.png" class="screenshot">
    <div class="fb-desc">
      <p>
        Shown by calling <code>prompt()</code> from within a user gesture on
        the <code>beforeinstallprompt</code> event in Chrome 68 and later.
      </p>
      <p><b>OR</b></p>
      <p>Shown when a user taps the mini-infobar in Chrome 68 and later.</p>
      <p><b>OR</b></p>
      <p>
        Shown after the user clicks 'Add to Home screen' from the Chrome menu
        in all Chrome versions.
      </p>
    </div>
  </div>
</div>

<div class="clearfix"></div>

## The mini-infobar

<figure class="attempt-right">
  <img
      class="screenshot"
      src="/web/updates/images/2018/06/a2hs-infobar-cropped.png">
  <figcaption>
    The mini-infobar
  </figcaption>
</figure>

The mini-infobar is a Chrome UI component and is not controllable by the site,
but can be easily dismissed by the user. Once dismissed by the user, it will
not appear again until a sufficient amount of time has passed
(currently 3 months). The mini-infobar will appear when the site meets the
[add to home screen criteria](https://web.dev/install-criteria/),
regardless of whether you `preventDefault()` on the `beforeinstallprompt` event
or not.


<div class="clearfix"></div>

<figure class="attempt-right">
  <img
      class="screenshot"
      src="/web/updates/images/2018/06/a2hs-omnibox-cropped.png" >
  <figcaption>
    Early concept of the install button in the omnibox
  </figcaption>
</figure>
The mini-infobar is an interim experience for Chrome on Android as we work
towards creating a consistent experience across all platforms that includes
an install button into the omnibox.

<div class="clearfix"></div>


## Triggering the add to home screen dialog {: #trigger }

<figure class="attempt-left" style="max-width: 200px">
  <img class="screenshot" src="/web/updates/images/2018/06/a2hs-spotify.png" >
  <figcaption>
    Install button on a Desktop Progressive Web App
  </figcaption>
</figure>

Instead of prompting the user on page load (an
[anti-pattern for permission requests](/web/fundamentals/native-hardware/user-location/#ask_permission_responsibly)),
you can indicate your app can be installed with some UI, which will then show
the modal install prompt. For example this desktop PWA adds an
‘Install App’ button just above the user's profile name.

Prompting to install your app on a user gesture feels less spammy to the user
and increases the likelihood that they’ll click ‘Add’ instead of ‘Cancel’.
Incorporating an Install button into your app means that even if the user
chooses not to install your app today, the button will still be there
tomorrow, or whenever they’re ready to install.

<div class="clearfix"></div>

### Listening for the `beforeinstallprompt` event {: #listening }
If your site meets the
[add to home screen criteria](https://web.dev/install-criteria/),
Chrome will fire a `beforeinstallprompt` event, save a reference to the event,
and update your user interface to indicate that the user can add your app to
their home screen.

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

Note: Your site must meet the
[add to home screen criteria](https://web.dev/install-criteria/)
in order for the `beforeinstallprompt` event to be fired and your app installed.

The `beforeinstallprompt` event will not be fired if the app is already
installed (see the
[add to home screen criteria](https://web.dev/install-criteria/)).
But if the user later uninstalls the app, the `beforeinstallprompt` event will
again be fired on each page navigation.

### Showing the dialog with `prompt()` {: #showing-the-prompt }

<figure class="attempt-right">
  <img
      class="screenshot"
      src="/web/updates/images/2018/06/a2hs-dialog-cropped.png">
  <figcaption>
    Add to home screen dialog
  </figcaption>
</figure>

To show the add to home screen dialog, call `prompt()` on the saved event from
within a user gesture. Chrome will show the modal dialog, prompting the user
to add your app to their home screen. Then, listen for the promise returned by
the `userChoice` property of the `beforeinstallprompt` event. The promise
returns an object with an `outcome` property after the prompt has shown and
the user has responded to it.

<div class="clearfix"></div>

```javascript
btnInstall.addEventListener('click', () => {
  // Update the install UI to remove the install button
  document.querySelector('#install-button').disabled = true;
  // Show the modal add to home screen dialog
  installPromptEvent.prompt();
  // Wait for the user to respond to the prompt
  installPromptEvent.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    // Clear the saved prompt since it can't be used again
    installPromptEvent = null;
  });
});
```

Note: Although the `beforeinstallprompt` event may be fired without a user
gesture, calling `prompt()` requires one.

You can only call `prompt()` on the deferred event once, if the user clicks
cancel on the dialog, you'll need to wait until the `beforeinstallprompt`
event is fired on the next page navigation. Unlike traditional permission
requests, clicking cancel will not block future calls to `prompt()` because
it call must be called within a user gesture.

## Additional Resources

Check out [App Install Banners](/web/fundamentals/app-install-banners/)
for more information, including:

* Details on the `beforeinstallprompt` event
* Tracking the user's response to the add home screen prompt
* Tracking if the app has been installed
* Determining if your app is running as an installed app

{% include "web/_shared/rss-widget-updates.html" %}
