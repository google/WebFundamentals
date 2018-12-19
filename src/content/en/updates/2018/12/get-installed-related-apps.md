project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The getInstalledRelatedApps API is a new web platform API that allows your web app to check to see if your native app is installed on the users device, and vice versa..

{# wf_published_on: 2018-12-20 #}
{# wf_updated_on: 2018-12-19 #}
{# wf_featured_image: /web/updates/images/generic/focus.png #}
{# wf_tags: capabilities,progressive-web-apps,webapp,webapk,native #}
{# wf_featured_snippet: As the capability gap between web and native gets smaller, it becomes easier to offer the same experience for both web and native users. This may lead to cases where users have both the web and native versions installed on the same device. Apps should be able to detect this situation. The <code>getInstalledRelatedApps</code> API is a new web platform API that allows your web app to check to see if your native app is installed on the users device, and vice versa.  #}
{# wf_blink_components: Mobile>WebAPKs #}

# Check If Your Native App Is Installed With getInstalledRelatedApps {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

{% include "web/updates/_shared/capabilities.html" %}

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
| 4. Origin trial                              | Not started                  |
| 5. Launch                                    | Not started                  |

If `getInstalledRelatedApps` looks familiar, it is. We originally announced
this feature in April 2017, when it first went to an origin trial. After that
origin trial ended, we took stock of the feedback and spent some time iterating
on the design. We hope to launch a new origin trial in the first half of 2019.


## How to use the `getInstalledRelatedApps` API {: #use }

Dogfood: We are still iterating on the design of the `getInstalledRelatedApps`
API. It’s only available behind a flag (`#enable-experimental-web-platform-features`).
While in development, bugs are expected, or it may fail to work completely.
The code below is based on the current design, and will likely change between
now and the time it’s standardized.

Check out the [`getInstalledRelatedApps` API Demo][demo] and
[`getInstalledRelatedApps` API Demo source][demo-source]


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


```
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


```
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


```
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

