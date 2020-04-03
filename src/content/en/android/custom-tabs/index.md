project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: An overview of the libraries and tools for creating Trusted Web Activities.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-04-03 #}
{# wf_blink_components: N/A #}

# Custom Tabs {: .page-title }

## What are Custom Tabs?

App developers face a choice when a user taps a URL to either launch a browser, or use an in-app
browser.

In the past, the only option for developers who wanted to use an in-app browser was to implement
one from scratch, using the Android WebView.

While the Android WebView is a powerful component and makes a best effort to maintain
compatibility with the Web Platform, it doesn't fully support all features and APIs provided by
full fledged browsers.

WebViews are also unable to share state with the browser, and building and maintaining an in-app
browser using WebViews adds development overhead.

Custom Tabs is a feature implemented by most browsers on Android which gives apps more control over
their web experience, and makes transitions between native and web content more seamless without
having to resort to a WebView.

Custom Tabs allow an app to customize how the browser looks and feels. An app
can change things like:

- Toolbar color
- Enter and exit animations
- Add custom actions to the Chrome toolbar, overflow menu and bottom toolbar
- Add a bottom toolbar with custom content, using [RemoteViews][7].

Custom Tabs also allow the developer to pre-start Chrome and pre-fetch content for faster loading.

<img src="https://developer.chrome.com/multidevice/images/customtab/performance.gif">

You can test this now with our [sample][1] on GitHub. 

## When should I use Custom Tabs vs WebView?

The Android WebView is good solution if you are hosting your own content inside your app. Since the
WebView doesn't support all the the Web Platform features browsers support, we recommend using
Custom Tabs open opening content that directs people to URLs outside your domain. Those are a few
reasons why we recommend Custom Tabs:

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

## Which browsers support Custom Tabs?

Custom Tabs is supported in all major browser in Android, including [Chrome][2], Firefox, Samsung
Internet, and Edge.

We are looking for feedback, questions and suggestions on this project, so we encourage you to file
issues on [crbug.com][3] and ask questions to our Twitter account [@ChromiumDev][4].

## Useful Links
- [GitHub Demo][5]
- [Chrome Custom Tabs on StackOverflow][6]

## FAQ

- Which browsers support Custom Tabs?
    - Custom Tabs is supported in all major browser in Android, including [Chrome][2], Firefox,
		 Samsung Internet, and Edge.
- Where can I ask questions?
    - StackOverflow tag: [chrome-custom-tabs][6].

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}		

[1]: https://github.com/GoogleChrome/custom-tabs-client
[2]: https://play.google.com/store/apps/details?id=com.chrome
[3]: https://crbug.com
[4]: https://twitter.com/ChromiumDev
[5]: https://github.com/GoogleChrome/custom-tabs-client
[6]: https://stackoverflow.com/questions/tagged/chrome-custom-tabs
[7]: https://developer.android.com/reference/android/widget/RemoteViews
