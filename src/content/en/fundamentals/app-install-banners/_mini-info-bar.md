## The mini-info bar {: #mini-info-bar }

<figure class="attempt-right">
  <img
      class="screenshot"
      src="/web/updates/images/2018/06/a2hs-infobar-cropped.png">
  <figcaption>
    The mini-infobar
  </figcaption>
</figure>

The mini-infobar is one technique you can use to promote the installation of
your Progressive Web App on mobile. The mini-infobar will appear when the
site meets the [criteria](#criteria), and once dismissed by the user, it will
not appear again until a sufficient amount of time has passed
(currently 3 months).

**The mini-infobar is an interim experience for Chrome on Android** as we work
towards creating a consistent experience across all platforms that includes
an install button into the omnibox.

### Preventing the mini-infobar from appearing

Starting in Chrome 76 (July 2019), you can prevent the mini-infobar from
appearing by calling `preventDefault()` on the `beforeinstallprompt` event.

<pre class="prettyprint">
window.addEventListener('beforeinstallprompt', (e) => {
  <strong>// Prevent Chrome 76 and later from showing the mini-infobar
  e.preventDefault();</strong>
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  showInstallPromotion();
});
</pre>

If you decide to call `preventDefault()`, be sure to provide some
[indication](/web/fundamentals/app-install-banners/promoting-install-mobile)
to the user that your Progressive Web App is installable.
