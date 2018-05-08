project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Native app install banners give you the ability to let users quickly and seamlessly install your native app on their device from the app store, without leaving the browser.

{# wf_updated_on: 2018-05-07 #}
{# wf_published_on: 2014-12-16 #}
{# wf_blink_components: Platform>Apps>AppLauncher>Install #}

# Native App Install Banners {: .page-title }

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif"
          alt="Native app install banner" style="max-height: 500px">
  </figure>
</div>

Native app install banners give you the ability to let users quickly and
seamlessly install your native app on their device from the app store, without
leaving the browser, and without showing an annoying interstitial.

## Criteria to show the banner

Chrome will automatically show the native app install prompt to the user when
the following criteria are met:

* The native app is not already installed
* Meets a user engagement heuristic (currently, the user has interacted
  with the domain for at least 30 seconds)
* Includes a [Web App Manifest](/web/fundamentals/web-app-manifest/) that includes:
    - `short_name`
    - `name` (used in the banner prompt)
    - `icons` including a 192px and a 512px version
    - [`related_applications`](#related-application) with information about the app
* Be served over **HTTPS**


If your site has a restrictive [Content Security Policy](/web/fundamentals/security/csp/),
make sure to add `*.googleusercontent.com` to the `img-src` directive so Chrome
can download the icon associated with your app from the Play Store.

Note: `*.googleusercontent.com` maybe more verbose than desired. It's possible
to narrow this down by [remote debugging](/web/tools/chrome-devtools/remote-debugging/)
an Android device to find out the URL of the app icon.

## Manifest property: `related_applications` {: #related-applications }

To integrate into any manifest, add a `related_applications` array with the
platforms of `play` (for Google Play) and the App Id.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


If just want to offer the user the ability to install your Android
application, and not show the web app install banner, then add
`"prefer_related_applications": true`. For example:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
