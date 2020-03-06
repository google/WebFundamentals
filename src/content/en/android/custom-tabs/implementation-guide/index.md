project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Implementation Guide for Custom Tabs.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-03-06 #}
{# wf_blink_components: N/A #}

# Custom Tabs Implementation guide {: .page-title }

A complete example is available at [https://github.com/GoogleChrome/custom-tabs-client][1].It
contains re-usable classes to customize the UI, connect to the background service, and handle the
lifecycle of both the application and the custom tab activity.

If you follow the guidance from this page, you will be able to create a great integration.

The first step for a Custom Tabs integration is adding the [Custom Tabs Support Library][2] to your
project. Open your `build.gradle` file and add the support library to the dependency section.

```gradle
dependencies {
    ...
    compile 'com.android.support:customtabs:23.3.0'
}
```

Once the Support Library is added to your project there are two sets of possible customizations:
- Customizing the UI and interaction with the custom tabs.
- Making the page load faster, and keeping the application alive.

The UI Customizations are done by using the [`CustomTabsIntent`][3] and the
[`CustomTabsIntent.Builder`][4] classes; the performance improvements are achieved by using the
[`CustomTabsClient`][5] to connect to the Custom Tabs service, warm-up Chrome and let it know which
urls will be opened.

## Opening a Chrome Custom Tab

```java
// Use a CustomTabsIntent.Builder to configure CustomTabsIntent.
// Once ready, call CustomTabsIntent.Builder.build() to create a CustomTabsIntent
// and launch the desired Url with CustomTabsIntent.launchUrl()

String url = ¨https://paul.kinlan.me/¨;
CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
CustomTabsIntent customTabsIntent = builder.build();
customTabsIntent.launchUrl(this, Uri.parse(url));
```

## Configure the color of the address bar

One of the most important (and simplest to implement) aspects of Chrome Custom Tabs is the ability
for you to change the color of the address bar to be consistent with your app's theme.

```java
// Changes the background color for the address bar. colorInt is an int
// that specifies a <a href="http://developer.android.com/reference/android/graphics/Color.html">Color</a>.

builder.setToolbarColor(colorInt);
```

## Configure a custom action button

<img src="https://developer.chrome.com/multidevice/images/customtab/tumblr_action.png">

As the developer of your app, you have full control over the Action Button  that is presented to
your users inside the Chrome tab.

In most cases, this will be a primary action such as Share, or another common activity that your
users will perform.

The Action Button is represented as a Bundle with an icon of the action button and a pendingIntent
that will be called by Chrome when your user hits the action button. The icon is currenlty 24dp in
height and 24-48 dp in width.

```java
// Adds an Action Button to the Toolbar.
// 'icon' is a <a href="http://developer.android.com/reference/android/graphics/Bitmap.html">Bitmap</a> to be used as the <a href="http://developer.android.com/reference/android/widget/ImageView.html#setImageDrawable(android.graphics.drawable.Drawable)">image source</a> for the
// action button.

// 'description' is a String be used as an accessible description for the button.

// 'pendingIntent is a <a href="http://developer.android.com/reference/android/app/PendingIntent.html">PendingIntent</a> to launch when the action button
// or menu item was tapped. Chrome will be calling <a href="http://developer.android.com/reference/android/app/PendingIntent.html#send(android.content.Context,%20int,%20android.content.Intent)">PendingIntent#send()</a> on
// taps after adding the url as data. The client app can call
// <a href="http://developer.android.com/reference/android/content/Intent.html#getDataString()">Intent#getDataString()</a> to get the url.

// 'tint' is a boolean that defines if the Action Button should be tinted.

builder.setActionButton(icon, description, pendingIntent, tint);
```

## Configure a custom menu

<img src="https://developer.chrome.com/multidevice/images/customtab/twitter_menu.png">

The Chrome browser has a comprehensive menu of actions that users will perform frequently inside a
browser, however they may not be relevant to your application context.

Chrome Custom Tabs will have a three icon row with "Forward", "Page Info" and "Refresh" on top at
all times, with "Find page" and "Open in Browser" on the footer of the menu.

As the developer, you can add and customize up to five menu items that will appear between the icon
row and foot items.

The menu item is added by calling [`CustomTabsIntent.Builder#addMenuItem`][6] with title and a
pendingIntent that Chrome will call on your behalf when the user taps the item are passed as
parameters.

```java
builder.addMenuItem(menuItemTitle, menuItemPendingIntent);
```

## Configure custom enter and exit animations

Many Android applications use custom View Entrance and Exit animations when transition between
Activities on Android. Chrome Custom Tabs is no different, you can change the entrance and exit
(when the user presses Back) animations to keep them consistent with the rest of your application.

```java
builder.setStartAnimations(this, R.anim.slide_in_right, R.anim.slide_out_left);
builder.setExitAnimations(this, R.anim.slide_in_left, R.anim.slide_out_right);
```

## Warm up Chrome to make pages load faster

By default, when [`CustomTabsIntent#launchUrl`][7] is called, it will spin up Chrome and launch the
URL. This can take up precious time and impact on the perception of smoothness.

We believe that users demand a near instantaneous experience, so we have provided a Service in
Chrome that your app can connect to and tell Chrome to warm up the browser and the native
components.  We are also experimenting with the ability for you, the developer to tell Chrome the
likely set of web pages the user will visit.  Chrome will then be able to perform:

- DNS pre-resolution of the main domain
- DNS pre-resolution of the most likely sub-resources
- Pre-connection to the destination including HTTPS/TLS negotiation.

The process for warming up Chrome is as follows:

- Use [`CustomTabsClient#bindCustomTabsService`][8] to connect to the service.
- Once the service is connected, call [`CustomTabsClient#warmup`][9] to start Chrome behind the
scenes.
- Call [`CustomTabsClient#newSession`][10] to create a new session. This session is used for all
requests to the API.
- Optionally, attach a [`CustomTabsCallback`][11] as a parameter when creating a new session, so
that you know a page was loaded.
- Tell Chrome which pages the user is likely to load with [`CustomTabsSession#mayLaunchUrl`][12]
- Call the [`CustomTabsIntent.Builder`][4] constructor passing the created
[`CustomTabsSession`][13] as a parameter.

## Connect to the Chrome Service

The [`CustomTabsClient#bindCustomTabsService`][8] method takes away the complexity of connecting to
the Custom Tabs service.

Create a class that extends [`CustomTabsServiceConnection`][14] and use
[`onCustomTabsServiceConnected`][15] to get an instance of the [`CustomTabsClient`][5]. This
instance will be needed on the next steps.
	
```java
// Package name for the Chrome channel the client wants to connect to. This
// depends on the channel name.
// Stable = com.android.chrome
// Beta = com.chrome.beta
// Dev = com.chrome.dev
public static final String CUSTOM_TAB_PACKAGE_NAME = "com.android.chrome";  // Change when in stable

CustomTabsServiceConnection connection = new CustomTabsServiceConnection() {
    @Override
    public void onCustomTabsServiceConnected(ComponentName name, CustomTabsClient client) {
        mCustomTabsClient = client;
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {

    }
};
boolean ok = CustomTabsClient.bindCustomTabsService(this, mPackageNameToBind, connection);
```

## Warm up the Browser Process

[`boolean warmup(long flags)`][16]

Warms up the browser process and loads the native libraries. Warmup is asynchronous, the return
value indicates whether the request has been accepted. Multiple successful calls will also return
true.

Returns `true` if successful.

## Create a new tab session

[`boolean newSession(CustomTabsCallback  callback)`][17]

Session is used in subsequent calls to link mayLaunchUrl call, the CustomTabsIntent and the tab
generated to each other. The callback provided here is associated with the created session. Any
updates for the created session (see Custom Tabs Callback below) is also received through this
callback. Returns whether a session was created successfully. Multiple calls with the same
CustomTabsCallback or a null value will return false.

## Tell Chrome what URL's the user is likely to open

[`boolean mayLaunchUrl(Uri url, Bundle extras, List<Bundle> otherLikelyBundles)`][18]

This CustomTabsSession method tells the browser of a likely future navigation to a URL. The method
[`warmup()`][9] should be called first as a best practice. The most likely URL has to be specified
first. Optionally, a list of other likely URLs can be provided. They are treated as less likely
than the first one, and have to be sorted in decreasing priority order. These additional URLs may
be ignored. All previous calls to this method will be deprioritized. Returns whether the operation
completed successfully.

## Custom Tabs Connection Callback

[`void onNavigationEvent(int navigationEvent, Bundle extras)`][19]

Will be called when a navigation event happens in the custom tab. The `navigationEvent int` 
is one of 6 values that defines the state of the page is in.  See below for more information.

```java
/**
* Sent when the tab has started loading a page.
*/
public static final int NAVIGATION_STARTED = 1;

/**
* Sent when the tab has finished loading a page.
*/
public static final int NAVIGATION_FINISHED = 2;

/**
* Sent when the tab couldn't finish loading due to a failure.
*/
public static final int NAVIGATION_FAILED = 3;

/**
* Sent when loading was aborted by a user action before it finishes like clicking on a link
* or refreshing the page.
*/
public static final int NAVIGATION_ABORTED = 4;

/**
* Sent when the tab becomes visible.
*/
public static final int TAB_SHOWN = 5;

/**
* Sent when the tab becomes hidden.
*/
public static final int TAB_HIDDEN = 6;
```

## What happens if the user doesn’t have a recent version of Chrome installed?

Custom Tabs uses an ACTION_VIEW Intent with key Extras to customize the UI. 
This means that by default the page willopen in the system browser, or the user's default browser.

If the user has Chrome installed and it is the default browser, it will automatically pick up the
EXTRAS and present a customized UI. It is also possible for another browser to use the Intent
extras to provide a similar customized interface.

## How can I check whether Chrome supports Chrome Custom Tabs?

All versions of Chrome supporting Chrome Custom Tabs expose a service. To check whether Chrome
supports custom tabs, try to bind to the service. If it succeeds, then custom tabs can safely be
used. 

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

[1]: https://github.com/GoogleChrome/custom-tabs-client
[2]: http://developer.android.com/tools/support-library/features.html#custom-tabs
[3]: http://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.html
[4]: http://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.Builder.html
[5]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html
[6]: http://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.Builder.html#addMenuItem(java.lang.String, android.app.PendingIntent)
[7]: http://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.html#launchUrl(android.app.Activity, android.net.Uri)
[8]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#bindCustomTabsService(android.content.Context, java.lang.String, android.support.customtabs.CustomTabsServiceConnection)
[9]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#warmup(long)
[10]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#newSession(android.support.customtabs.CustomTabsCallback)
[11]: http://developer.android.com/reference/android/support/customtabs/CustomTabsCallback.html
[12]: http://developer.android.com/reference/android/support/customtabs/CustomTabsSession.html#mayLaunchUrl(android.net.Uri, android.os.Bundle, java.util.List<android.os.Bundle>)
[13]: http://developer.android.com/reference/android/support/customtabs/CustomTabsSession.html
[14]: http://developer.android.com/reference/android/support/customtabs/CustomTabsServiceConnection.html
[15]: http://developer.android.com/reference/android/support/customtabs/CustomTabsServiceConnection.html#onCustomTabsServiceConnected(android.content.ComponentName, android.support.customtabs.CustomTabsClient)
[16]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#warmup(long)
[17]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#newSession(android.support.customtabs.CustomTabsCallback)
[18]: http://developer.android.com/reference/android/support/customtabs/CustomTabsSession.html#mayLaunchUrl(android.net.Uri, android.os.Bundle, java.util.List<android.os.Bundle>)
[19]: http://developer.android.com/reference/android/support/customtabs/CustomTabsCallback.html#onNavigationEvent(int, android.os.Bundle)
