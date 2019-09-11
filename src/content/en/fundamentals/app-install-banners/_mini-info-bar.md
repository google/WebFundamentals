## The mini-info bar {: #mini-info-bar }

<figure class="attempt-right">
  <img
      class="screenshot"
      src="/web/updates/images/2018/06/a2hs-infobar-cropped.png">
  <figcaption>
    The mini-infobar
  </figcaption>
</figure>

**The mini-infobar is an interim experience for Chrome on Android** as we work
towards creating a consistent experience across all platforms that includes
an install button into the omnibox.

The mini-infobar is a Chrome UI component and is not controllable by the site,
but can be easily dismissed by the user. Once dismissed by the user, it will
not appear again until a sufficient amount of time has passed
(currently 3 months). The mini-infobar will appear when the site meets the
[criteria](#criteria), regardless of whether you `preventDefault()` on the
`beforeinstallprompt` event or not.

Note: The mini-info bar is not displayed on desktop devices.
