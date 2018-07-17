project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use the PWACompat library to bring your Web App Manifest to all browsers.

{# wf_updated_on: 2018-07-17 #}
{# wf_published_on: 2018-07-17 #}
{# wf_tags: manifest,mobile #}
{# wf_featured_image: /web/updates/images/2018/07/pwacompat.png #}
{# wf_featured_snippet: Use the PWACompat library to bring your Web App Manifest to all browsers. By simply dropping in the library, many of the <code>link</code> and <code>meta</code> meta tags required to suppord older browsers for icons, home screen behavior, theming etc, will be added
automatically- no more steps required! #}
{# wf_blink_components: N/A #}

# PWACompat: the Web App Manifest for all browsers

You've designed a webapp, built its code and service worker, and finally added the
[Web App Manifest](/web/fundamentals/web-app-manifest/) to describe how it should behave when
'installed' on a user's device. This includes things like high-resolution icons to use for e.g. a
mobile phone's launcher or app switcher, or how your webapp should start when opened from the
user's home screen.

And while many browsers will respect the Web App Manifest, not every browser will load or respect
every value you specify. Enter [PWACompat](https://github.com/GoogleChromeLabs/pwacompat), a
library that takes your Web App Manifest and automatically inserts relevant `meta` or `link` tags
for icons of different sizes, the favicon, startup mode, colors etc.

<figure>
  <img src="/web/updates/images/2018/07/webmanifest.png"
       alt="PWACompat takes a Web App Manifest and adds non-standard meta, link etc tags" />
  <figcaption>
    PWACompat takes a Web App Manifest and adds non-standard meta, link etc tags.
  </figcaption>
</figure>

This means you no longer have to add innumerable, non-standard tags (like `<link rel="icon" ... />`
or `<meta name="orientation" ... />`) your pages. And for iOS home screen applications, PWACompat
will even dynamically create splash screens so you don't have to generate one for every different
screen size.

## Using PWACompat

To use [PWACompat](https://github.com/GoogleChromeLabs/pwacompat), be sure to link to your Web App
Manifest on all your pages:

```html
<link rel="manifest" href="manifest.webmanifest" />
```

And then either include this script, or [add it](https://www.npmjs.com/package/pwacompat) to an
async loaded bundle:

```html
<link rel="manifest" href="manifest.webmanifest" />
<!-- include PWACompat _after_ your manifest -->
<script async src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js"
    integrity="sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA"
    crossorigin="anonymous"></script>
```

PWACompat will fetch your manifest file and do work needed for your user's browser, regardless of
whether they're on a mobile device or desktop.

## More Details

For supported browsers, what does PWACompat actually do? As of July 2018, PWACompat will load your
Web App Manifest and:

* Create meta icon tags for all icons in the manifest (e.g., for a favicon, older browsers)
* Create fallback meta tags for various browsers (e.g., iOS, WebKit/Chromium forks etc) describing
  how a webapp should open
* Sets [the theme color][theme-color] based on the manifest

[theme-color]: /web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android

For Safari, PWACompat also:

* Sets `apple-mobile-web-app-capable` (opening without a browser chrome) for
  [display modes](/web/fundamentals/web-app-manifest/#display) `standalone`, `fullscreen` or
  `minimal-ui`
* Creates `apple-touch-icon` images, adding the manifest background to transparent icons:
  otherwise, iOS renders transparency as black
* Creates dynamic splash images, closely matching the splash images generated for Chromium-based
  browsers

If you'd like to contribute more or help with additional browser support,
[PWACompat is on GitHub](https://github.com/GoogleChromeLabs/pwacompat).

## Try It Out

PWACompat is live on [Airhorner](https://airhorner.com) and
[Emojityper](https://emojityper.com). Both sites' header HTML can be simple: just specify
[the manifest](https://emojityper.com/manifest.json) and let PWACompat handle the rest.

📢🤣🎉

{% include "comment-widget.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
