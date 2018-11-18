project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Native app install banners give you the ability to let users quickly and seamlessly install your native app on their device from the app store, without leaving the browser.

{# wf_updated_on: 2018-05-10 #}
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

## When is the banner shown?

Chrome will automatically show the native app install prompt to the user when
the following criteria are met:

* Neither the web app or the native app are already installed
* Meets a user engagement heuristic (currently, the user has interacted
  with the domain for at least 30 seconds)
* Includes a [Web App Manifest](/web/fundamentals/web-app-manifest/) that includes:
    - `short_name`
    - `name` (used in the banner prompt)
    - `icons` including a 192px and a 512px version
    - [`prefer_related_applications`](#prefer_related_applications) is `true`
    - [`related_applications`](#related-applications) object with information
      about the app
* Served over **HTTPS**

If your site has a restrictive [Content Security Policy](/web/fundamentals/security/csp/),
make sure to add `*.googleusercontent.com` to the `img-src` directive so Chrome
can download the icon associated with your app from the Play Store.

Note: `*.googleusercontent.com` maybe more verbose than desired. It's possible
to narrow this down by [remote debugging](/web/tools/chrome-devtools/remote-debugging/)
an Android device to find out the URL of the app icon.

## Required manifest properties

To prompt the user to install your native app, you need to add two properties
to your web app manifest, `prefer_related_applications` and
`related_applications`.

    "prefer_related_applications": true,
    "related_applications": [
      {
        "platform": "play",
        "id": "com.google.samples.apps.iosched"
      }
    ]


### `prefer_related_applications` {: #prefer_related_applications }

The `prefer_related_applications` property tells the browser to prompt the
user with your native app instead of the web app. Leaving this value unset,
or `false`, the browser will prompt the user to install the web app instead.

### `related_applications` {: #related_applications }

`related_applications` is an array with a list of objects that tell the
browser about your preferred native application. Each object must include
a `platform` property and an `id` property. Where the `platform` is `play`
and the `id` is your Play Store app ID.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

