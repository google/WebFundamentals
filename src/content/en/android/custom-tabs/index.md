project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: An overview of the libraries and tools for creating Trusted Web Activities.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-03-11 #}
{# wf_blink_components: N/A #}

# Custom Tabs {: .page-title }

## What are Custom Tabs?

App developers face a choice when a user taps a URL to either launch a
browser, or build their own in-app browser using WebViews.

Both options present challenges - launching the browser is a heavy context
switch for users that isn't customizable, while WebViews don't share state with the
browser and add maintenance overhead.

Chrome Custom Tabs give apps more control over their web experience, and make
transitions between native and web content more seamless without having to
resort to a WebView.

Chrome Custom Tabs allow an app to customize how Chrome looks and feels. An app
can change things like:

- Toolbar color
- Enter and exit animations
- Add custom actions to the Chrome toolbar, overflow menu and bottom toolbar

Chrome Custom Tabs also allow the developer to pre-start Chrome and pre-fetch
content for faster loading.

<img src="https://developer.chrome.com/multidevice/images/customtab/performance.gif">

You can test this now with our [sample][1] on GitHub. 

## When should I use Custom Tabs vs WebView?

The WebView is good solution if you are hosting your own content inside your
app. If your app directs people to URLs outside your domain, we recommend
that you use Custom Tabs for these reasons:

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

## When will this be available?

As of Chrome 45, Chrome Custom Tabs is now generally available to all users of [Chrome][2], on all
of Chrome's supported Android versions (Jellybean onwards).

We are looking for feedback, questions and suggestions on this project, so we encourage you to file
issues on [crbug.com][3] and ask questions to our Twitter account
[@ChromiumDev][4].

## Useful Links
- [GitHub Demo][5]
- [Chrome Custom Tabs on StackOverflow][6]

## FAQ

- When will this be available on stable channel?
    - Chrome Custom Tabs are available as of Chrome 45.
- Where can I ask questions?
    - StackOverflow tag: [chrome-custom-tabs][6].

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}		

[1]: https://github.com/GoogleChrome/custom-tabs-client
[2]: https://play.google.com/store/apps/details?id=com.chrome
[3]: https://crbug.com
[4]: https://twitter.com/ChromiumDev
[5]: https://github.com/GoogleChrome/custom-tabs-client
[6]: http://stackoverflow.com/questions/tagged/chrome-custom-tabs
