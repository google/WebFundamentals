project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Low Level Custom Tabs API

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-03-06 #}
{# wf_blink_components: N/A #}

# Custom Tabs Low level API {: .page-title }

Although the recommended method to integrate your application with Custom Tabs is using the Custom
Tabs Support Library, a low level implementation is also available.

The complete implementation of the Support Library is available on [Github][1] and an be used as a
start point. It also contains the [AIDL files][2] required to connect to the service, as the ones
contained in the Chromium repository are not directly usable with Android Studio.

## Basics for Launching Custom Tabs using the Low Level API
```java
// Using a VIEW intent for compatibility with any other browsers on device.
// Caller should not be setting FLAG_ACTIVITY_NEW_TASK or 
// FLAG_ACTIVITY_NEW_DOCUMENT. 
String url = ¨https://paul.kinlan.me/¨;
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url)); 
//  Must have. Extra used to match the session. Its value is an IBinder passed
//  whilst creating a news session. See newSession() below. Even if the service is not 
//  used and there is no valid session id to be provided, this extra has to be present 
//  with a null value to launch a custom tab.

private static final String EXTRA_CUSTOM_TABS_SESSION = "android.support.customtabs.extra.SESSION";
Bundle extras = new Bundle;
extras.putBinder(EXTRA_CUSTOM_TABS_SESSION, 
   sessionICustomTabsCallback.asBinder() /* Set to null for no session */);
intent.putExtras(extras);
```

## Adding UI Customizations

UI Customizations are included by adding Extras to the ACTION_VIEW Intent. A full list of the
extras keys used to customize the UI can be found on the [CustomTabsIntent docs][3]. An example on
how to add a custom toolbar color follows:

```java
// Extra that changes the background color for the address bar. colorInt is an int
// that specifies a Color.

private static final String EXTRA_CUSTOM_TABS_TOOLBAR_COLOR = "android.support.customtabs.extra.TOOLBAR_COLOR";
intent.putExtra(EXTRA_CUSTOM_TABS_TOOLBAR_COLOR, colorInt);
```

## Connecting to the Custom Tabs service

The Custom Tabs service can be used in the same way other Android Services are. The interface is
created with AIDL and automatically creates a proxy service class for you.

Use the methods on the proxy service to warm-up, create sessions and pre-fetch

```java
// Package name for the Chrome channel the client wants to connect to. This
// depends on the channel name.
// Stable = com.android.chrome
// Beta = com.chrome.beta
// Dev = com.chrome.dev
public static final String CUSTOM_TAB_PACKAGE_NAME = "com.chrome.dev";  // Change when in stable

// Action to add to the service intent. This action can be used as a way 
// generically pick apps that handle custom tabs for both activity and service 
// side implementations.
public static final String ACTION_CUSTOM_TABS_CONNECTION =
       "android.support.customtabs.action.CustomTabsService";
Intent serviceIntent = new Intent(ACTION_CUSTOM_TABS_CONNECTION);

serviceIntent.setPackage(CUSTOM_TAB_PACKAGE_NAME);
context.bindService(serviceIntent, mServiceConnection,
                    Context.BIND_AUTO_CREATE | Context.BIND_WAIVE_PRIORITY);    
```

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}		

[1]: https://github.com/GoogleChrome/custom-tabs-client/tree/master/customtabs
[2]: http://developer.android.com/guide/components/aidl.html
[3]: http://developer.android.com/reference/android/support/customtabs/CustomTabsIntent.html