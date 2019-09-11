project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The getInstalledRelatedApps API is a new web platform API that allows your web app to check to see if your native app is installed on the users device, and vice versa..

{# wf_published_on: 2018-12-20 #}
{# wf_updated_on: 2019-03-07 #}
{# wf_featured_image: /web/updates/images/generic/focus.png #}
{# wf_tags: capabilities,progressive-web-apps,webapp,webapk,native,chrome73,origintrials #}
{# wf_featured_snippet: As the capability gap between web and native gets smaller, it becomes easier to offer the same experience for both web and native users. This may lead to cases where users have both the web and native versions installed on the same device. Apps should be able to detect this situation. The <code>getInstalledRelatedApps</code> API is a new web platform API that allows your web app to check to see if your native app is installed on the users device, and vice versa.  #}
{# wf_blink_components: Mobile>WebAPKs #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Check If Your Native App Is Installed With getInstalledRelatedApps {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">
  We’re currently working on this API as part of the new
  <a href="/web/updates/capabilities">capabilities project</a>. Starting in
  Chrome 73, it is available as an <a href="#ot"><b>origin trial</b></a> on Android.
  This post will be updated as the API evolves.<br>
  <b>Last Updated:</b> March 12th, 2019
</aside>

## What is the `getInstalledRelatedApps` API? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/getinstalled-cropped.jpg">
  <figcaption>
    A web app using <code>getInstalledRelatedApps</code> to determine if it's
    related native app is already installed.
  </figcaption>
</figure>

As the capability gap between web and native gets smaller, it becomes easier
to offer the same experience for both web and native users. This may lead to
cases where users have both the web and native versions installed on the same
device. Apps should be able to detect this situation.

The `getInstalledRelatedApps` API is a new web platform API that allows
your web app to check to see if your native app is installed on the users
device, and vice versa. With the `getInstalledRelatedApps` API, you can
disable some functionality of one app if it should be provided by the other
app instead.

If `getInstalledRelatedApps` looks familiar, it is. We originally announced
this feature in April 2017, when it first went to an origin trial. After that
origin trial ended, we took stock of the feedback and spent some time iterating
on this design.

[Read explainer][explainer]{: .button .button-primary }

<div class="clearfix"></div>

### Suggested use cases {: #use-cases }

There may be some cases where there isn’t feature parity between the web and
native apps. With the `getInstalledRelatedApps` API, you can check if the
other version is installed, and switch to the other app, using the
functionality there. For example, one of the most common scenarios we’ve
heard, and the key reason behind this API is to help reduce duplicate
notifications. Using the `getInstalledRelatedApps` API, allows you check to
see if the user has the native app installed, then disable the notification
functionality in the web app.

Installable web apps can help prevent confusion between the web and native
versions by checking to see if the native version is already installed and
either not prompting to install the PWA, or providing different prompts.

## Current status {: #status }

| Step                                         | Status                       |
| -------------------------------------------- | ---------------------------- |
| 1. Create explainer                          | [Complete][explainer]        |
| **2. Create initial draft of specification** | [**In Progress**][spec]      |
| **3. Gather feedback & iterate on design**   | [**In Progress**](#feedback) |
| **4. Origin trial**                          | [**In Progress**](#ot)       |
| 5. Launch                                    | Not started                  |

### See it in action

1. Using Chrome 73 or later on Android, open the [`getInstalledRelatedApps` demo][demo].
   Note, this site uses an origin trial token to enable the API.
2. Install the demo app from the Play store and refresh the [demo][demo] page.
   You should now see the app listed.

## How to use the `getInstalledRelatedApps` API {: #use }

Starting in Chrome 73, the `getInstalledRelatedApps` API is available as an
origin trial for Android. [Origin trials][ot-what-is] allow you to try out
new features and give feedback on usability, practicality, and effectiveness
to us, and the web standards community. For more information, see the
[Origin Trials Guide for Web Developers][ot-dev-guide].

Check out the [`getInstalledRelatedApps` API Demo][demo] and
[`getInstalledRelatedApps` API Demo source][demo-source]

### Register for the origin trial {: #ot }

1. [Request a token][ot-request] for your origin.
2. Add the token to your pages, there are two ways to provide this token on
   any pages in your origin:
     * Add an `origin-trial` `<meta>` tag to the head of any page. For example,
       this may look something like:
       `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
     * If you can configure your server, you can also provide the token on pages
       using an `Origin-Trial` HTTP header. The resulting response header should
       look something like: `Origin-Trial: TOKEN_GOES_HERE`

### Alternatives to the origin trial

If you want to experiment with the API locally, without an origin trial,
enable the `#enable-experimental-web-platform-features` flag in `chrome://flags`.

### Establish a relationship between your apps {: #relationship }

In order to use the `getInstalledRelatedApps`, you must first create a
relationship between your two apps. This relationship is critical and prevents
other apps from using the API to detect if your app is installed, and prevents
sites from collecting information about the apps you have installed on your
device.

#### Define the relationship to your native app {: #relationship-web }

In your [web app manifest](/web/fundamentals/web-app-manifest), add a
`related_applications` property that contains a list of the apps that you want
to detect. The `related_applications` property is an array of objects that
contain the platform on which the app is hosted and the unique identifier for
your app on that platform.

```json
{
  ...
  "related_applications": [{
    "platform": "play",
    "id": "<package-name>",
    "url": "https://example.com",
  }],
  ...
}
```

The `url` property is optional, and the API works fine without it. On Android,
the `platform` must be `play`. On other devices, `platform` will be different.

#### Define the relationship to your web app {: #relationship-native }

Each platform has its own method of verifying a relationship. On Android, the
[Digital Asset Links system](/digital-asset-links/v1/getting-started) is used
to define the association between a website and an application. On other
platforms, the way you define the relationship will differ slightly.

In `AndroidManifest.xml`, add an asset statement that links back to your web
app:

```xml
<manifest>
  <application>
   ...
    <meta-data android:name="asset_statements" android:resource="@string/asset_statements" />
   ...
  </application>
</manifest>
```

Then, in `strings.xml`, add the following asset statement, updating `site` with
your domain. Be sure to include the escaping characters.

```xml
<string name="asset_statements">
  [{
    \"relation\": [\"delegate_permission/common.handle_all_urls\"],
    \"target\": {
      \"namespace\": \"web\",
      \"site\": \"https://example.com\"
    }
  }]
</string>
```

### Test for the presence of your native app {: #test-native }

Once you’ve updated your native app and added the appropriate fields to the
web app manifest, you can add the code to check for the presence of your native
app to you web app. Calling `navigator.getInstalledRelatedApps()` returns a
`Promise` that resolves with an array of your apps that are installed on the
users device.

```js
navigator.getInstalledRelatedApps().then((relatedApps) => {
  relatedApps.forEach((app) => {
    console.log(app.id, app.platform, app.url);
  });
});
```

Note: Like most other powerful web APIs, the `getInstalledRelatedApps` API is
only available when served over **HTTPS**.

## Feedback {: #feedback }

We need your help to ensure that the `getInstalledRelatedApps` API works in a
way that meets your needs and that we’re not missing any key scenarios.

<aside class="key-point">
  <b>We need your help!</b> Will the current design meet your needs? If it
  won’t, please file an issue in the
  <a href="https://github.com/WICG/get-installed-related-apps/issues">
  WICG/get-installed-related-apps repo</a> and provide as much detail as you can.
</aside>

We’re also interested to hear how you plan to use the
`getInstalledRelatedApps` API:

* Have an idea for a use case or an idea where you'd use it?
* Do you plan to use this?
* Like it, and want to show your support?

Share your thoughts on the
[`getInstalledRelatedApps` API WICG Discourse][wicg-discourse] discussion.

{% include "web/_shared/helpful.html" %}

## Helpful Links {: #helpful }

* [Public explainer][explainer]
* [`getInstalledRelatedApps` API Demo][demo] |
  [`getInstalledRelatedApps` API Demo source][demo-source]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `Mobile>WebAPKs`

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://github.com/WICG/get-installed-related-apps
[issues]: https://github.com/WICG/get-installed-related-apps/issues
[demo]: https://get-installed-apps.glitch.me
[demo-source]: https://glitch.com/edit/#!/get-installed-apps
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=895854
[cr-status]: https://www.chromestatus.com/features/5695378309513216
[explainer]: https://github.com/WICG/get-installed-related-apps/blob/master/EXPLAINER.md
[wicg-discourse]: https://discourse.wicg.io/t/proposal-get-installed-related-apps-api/1602
[ot-what-is]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md
[ot-dev-guide]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[ot-use]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin
[ot-request]: https://developers.chrome.com/origintrials/#/view_trial/855683929200394241
