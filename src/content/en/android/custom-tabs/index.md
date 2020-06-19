project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: An overview of the libraries and tools for creating Trusted Web Activities.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-06-17 #}
{# wf_blink_components: N/A #}

# Custom Tabs {: .page-title }

## What are Custom Tabs?

App developers face a choice when a user taps a URL to either launch a
browser, or build their own in-app browser using WebViews.

Both options present challenges - launching the browser is a heavy context
switch for users that isn't customizable, while WebViews [don't support][6]
all features of the web platform, don't share state with the
browser and add maintenance overhead.

Custom Tabs is a browser feature, [introduced by Chrome][7], that is now supported
by most major browsers on Android. It give apps more control over their web
experience, and make transitions between native and web content more seamless without
having to resort to a WebView.

Custom Tabs allow an app to customize how the browser looks and feels. An app
can change things like:

- Toolbar color
- Enter and exit animations
- Add custom actions to the browser toolbar, overflow menu and bottom toolbar

Custom Tabs also allow the developer to pre-start the browser and pre-fetch
content for faster loading.

![Perfomance comparison between opening a browser, the WebView and Custom Tabs.](performance.gif)

You can test this now with our [sample][1] on GitHub. 

## When should I use Custom Tabs vs WebView?

The WebView is good solution if you are hosting your own content inside your
app. If your app directs people to URLs outside your domain, we recommend
that you use Custom Tabs for these reasons:

- Support for the same web platform features and capabilities as the browsers.
- Simple to implement. No need to build code to manage requests, permission
	grants or cookie stores.
- UI customization:
  - Toolbar color
	- Action button
	- Custom menu items
	- Custom in/out animations
	- Bottom toolbar
- Navigation awareness: the browser delivers a callback to the application upon
an external navigation.
- Security: the browser uses Google's Safe Browsing to protect the user and the device from
dangerous sites.
- Performance optimization:
	- Pre-warming of the Browser in the background, while avoiding stealing
	resources from the application.
	- Providing a likely URL in advance to the browser, which may perform
	speculative work, speeding up page load time.
- Lifecycle management: the browser prevents the application from being evicted
	by the system while on top of it, by raising its importance to the
	"foreground" level.
- Shared cookie jar and permissions model so users don't have to sign-in to sites
	they are already connected to, or re-grant permissions they have already
	granted.
- If the user has turned on Data Saver, they will still benefit from it.
- Synchronized AutoComplete across devices for better form completion.
- Simple customization model.
- Quickly return to app with a single tap.
- You want to use the latest browser implementations on devices pre-Lollipop
(auto updating WebView) instead of older WebViews.

## When should I use Custom Tabs vs Trusted Web Activity

[Trusted Web Activities][8] extend the Custom Tabs protocol and shares most of its benefits.
But, instead of providing a customized UI, it allows developers to open a browser tab without
any UI at all. It is recommended for developers who want to open their own
[Progressive Web App][9], in full screen, inside their own Android app.

## Where is Custom Tabs available?

Custom Tabs is a feature supported by browsers on the Android platform. It was originally
introduced by [Chrome][2], on version 45. Currentely, the protocol is supported by most Android
browsers.

We are looking for feedback, questions and suggestions on this project, so we encourage you to file
issues on [crbug.com][3] and ask questions to our Twitter account
[@ChromiumDev][4].

## Getting Started

If you are getting started with Custom Tabs, checkout the [Implementation Guide][11] and the 
[GitHub Demo][1].

For questions, check the [chrome-custom-tabs][5] tag on StackOverflow.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}		

[1]: https://github.com/GoogleChrome/android-browser-helper/tree/master/demos/custom-tabs-example-app
[2]: https://play.google.com/store/apps/details?id=com.chrome
[3]: https://crbug.com
[4]: https://twitter.com/ChromiumDev
[5]: https://stackoverflow.com/questions/tagged/chrome-custom-tabs
[6]: https://research.google/pubs/pub46739/
[7]: https://android-developers.googleblog.com/2015/09/chrome-custom-tabs-smooth-transition.html
[8]: /web/android/trusted-web-activity
[9]: https://web.dev/progressive-web-apps/
[10]: https://developers.google.com/digital-asset-links
[11]: /web/android/custom-tabs/implementation-guide/
