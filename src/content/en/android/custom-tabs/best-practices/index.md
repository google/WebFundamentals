project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Best Practices for Custom Tabs implementations.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-07-02 #}
{# wf_blink_components: N/A #}

# Custom Tabs Best Practices {: .page-title }

Since Custom Tabs was launched, we've seen various implementations with different levels of
quality. This section describes a set of best practices we've found to create a good integration.

## Connect to the Custom Tabs service and call `warmup()`

You can **save up to 700 ms** when opening a link with the Custom Tabs by connecting to the service
and pre-loading the browser.

Connect to the Custom Tabs service on the [`onStart()`][1] method of the Activities you plan to
launch a Custom Tab from. Upon connection, call [`warmup()`][2].

The loading happens as a low priority process, meaning that
**it won’t have any negative performance impact on your application**, but will give a big
performance boost when loading a link.

## Pre-render content

Pre-rendering will make external content open instantly. So, as if your user has **at least a 50%**
likelihood of clicking on the link, call the [`mayLaunchUrl()`][3] method.

Calling [`mayLaunchUrl()`][3] will make Custom Tabs pre-fetch the main page with the supporting
content and pre-render. This will give the maximum speed up to the page loading process, but
**comes with a network and battery cost**.

Custom Tabs is smart and knows if the user is using the phone on a metered network or if it’s a low
end device and pre-rendering will have a negative effect on the overall performance of the device
and won’t pre-fetch or pre-render on those scenarios. So, there’s no need to optimize your
application for those cases.

## Provide a fallback for when Custom Tabs is not installed

Although Custom Tabs is available for the great majority of users, there are some scenarios where a
browser that supports Custom Tabs is not installed on the device or the device does not support a
browser version that has Custom Tabs enabled.

**Make sure to provide a fallback that provides a good user experience** by either opening the
default browser or using your own [WebView][4] implementation.

## Add your app as the referrer
It's usually very important for websites to track where their traffic is coming from. Make sure you
let them know you are sending them users by setting the referrer when launching your Custom Tab:

```
intent.putExtra(Intent.EXTRA_REFERRER, 
        Uri.parse("android-app://" + context.getPackageName()));
```

## Add custom animations

Custom animations will make the transition from your application to the web content smoother. Make
sure the finish animation is the reverse of the start animation, as it will help the user
understand them returning to the content where the navigation started.

```java
//Setting custom enter/exit animations
CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
intentBuilder.setStartAnimations(this, R.anim.slide_in_right, R.anim.slide_out_left);
intentBuilder.setExitAnimations(this, android.R.anim.slide_in_left,
    android.R.anim.slide_out_right);

//Open the Custom Tab        
intentBuilder.build().launchUrl(context, Uri.parse("https://developer.chrome.com/"));        
```

## Choosing an icon for the Action Button

Adding an Action Button will make users engage more with your app features. But, if there isn’t a
good icon to represent the action your Action Button will perform, create a bitmap with a text
describing the action.

Remember the maximum size for the bitmap is 24dp height x 48dp width.

```java
String shareLabel = getString(R.string.label_action_share);
Bitmap icon = BitmapFactory.decodeResource(getResources(),
        android.R.drawable.ic_menu_share);

//Create a PendingIntent to your BroadCastReceiver implementation
Intent actionIntent = new Intent(
        this.getApplicationContext(), ShareBroadcastReceiver.class);
PendingIntent pendingIntent = 
        PendingIntent.getBroadcast(getApplicationContext(), 0, actionIntent, 0);	        

//Set the pendingIntent as the action to be performed when the button is clicked.            
intentBuilder.setActionButton(icon, shareLabel, pendingIntent);
```

## Preparing for other browsers

Remember the user may have more than one browser installed that supports 
Custom Tabs. If there's more than one browser that supports Custom Tabs and 
none if them is the preferred browser, ask the user how they want to open 
the link:

```java
/**
  * Returns a list of packages that support Custom Tabs.
  */	
public static ArrayList<ResolveInfo> getCustomTabsPackages(Context context) {
    PackageManager pm = context.getPackageManager();
    // Get default VIEW intent handler.
    Intent activityIntent = new Intent()
        .setAction(Intent.ACTION_VIEW)
        .addCategory(Intent.CATEGORY_BROWSABLE)
        .setData(Uri.fromParts("http", "", null));

    // Get all apps that can handle VIEW intents.
    List<ResolveInfo> resolvedActivityList = pm.queryIntentActivities(activityIntent, 0);
    ArrayList<ResolveInfo> packagesSupportingCustomTabs = new ArrayList<>();
    for (ResolveInfo info : resolvedActivityList) {
        Intent serviceIntent = new Intent();
        serviceIntent.setAction(ACTION_CUSTOM_TABS_CONNECTION);
        serviceIntent.setPackage(info.activityInfo.packageName);
        // Check if this package also resolves the Custom Tabs service.
        if (pm.resolveService(serviceIntent, 0) != null) {
            packagesSupportingCustomTabs.add(info);
        }
    }
    return packagesSupportingCustomTabs;
}
```

### Applications targeting Android 11 (API level 30) or above

Android 11 has introduced [package visibility changes][7]. If your Android app is targeting API
level 30 or above, adding a `queries` section to `AndroidManifest.xml` is needed, otherwise the
code snippet above won't return results:

```xml
<queries>
    <intent>
        <action android:name=
            "android.support.customtabs.action.CustomTabsService" />
    </intent>
</queries>
```

## Allow the user to opt out of Custom Tabs

Add an option into the application for the user to open links in the default browser instead of
using a Custom Tab. This is specially important if the application opened the link using the
browser before adding support for Custom Tabs.

## Let native applications handle the content

Some URLs can be handled by native applications. If the user has the Twitter app installed and
clicks on a link to a tweet. They expect that the Twitter application will handle it.

Before opening an url from your application, check if a native alternative is available and use it.

### On Android 11 and above

Android 11 introduces a new Intent flag, [`FLAG_ACTIVITY_REQUIRE_NON_BROWSER`][6], which is the
recommended way to try opening a native app, as it doesn’t require the app to declare any package
manager queries.

```java
static boolean launchNativeApi30(Context context, Uri uri) {
    Intent nativeAppIntent = new Intent(Intent.ACTION_VIEW, uri)
            .addCategory(Intent.CATEGORY_BROWSABLE)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK |
                    Intent.FLAG_ACTIVITY_REQUIRE_NON_BROWSER);
    try {
        context.startActivity(nativeAppIntent);
        return true;
    } catch (ActivityNotFoundException ex) {
        return false;
    }
}
```

The solution is to try to launch the Intent and use `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` to ask
Android to avoid browsers when launching. 

If a native app that is capable of handling this Intent is not found, an
`ActivityNotFoundException` will be thrown.

### Before Android 11
Even though the application may target Android 11, or API level 30, previous Android versions will
not understand the `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` flag, so we need to resort to querying the
Package Manager in those cases:

```java
private static boolean launchNativeBeforeApi30(Context context, Uri uri) {
    PackageManager pm = context.getPackageManager();

    // Get all Apps that resolve a generic url
    Intent browserActivityIntent = new Intent()
            .setAction(Intent.ACTION_VIEW)
            .addCategory(Intent.CATEGORY_BROWSABLE)
            .setData(Uri.fromParts("http", "", null));
    Set<String> genericResolvedList = extractPackageNames(
            pm.queryIntentActivities(browserActivityIntent, 0));

    // Get all apps that resolve the specific Url
    Intent specializedActivityIntent = new Intent(Intent.ACTION_VIEW, uri)
            .addCategory(Intent.CATEGORY_BROWSABLE);
    Set<String> resolvedSpecializedList = extractPackageNames(
            pm.queryIntentActivities(specializedActivityIntent, 0));

    // Keep only the Urls that resolve the specific, but not the generic
    // urls.
    resolvedSpecializedList.removeAll(genericResolvedList);

    // If the list is empty, no native app handlers were found.
    if (resolvedSpecializedList.isEmpty()) {
        return false;
    }

    // We found native handlers. Launch the Intent.
    specializedActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(specializedActivityIntent);
    return true;
}
```

The approach used here is to query the Package Manager for applications that support a generic
“http” intent. Those applications are likely browsers.

Then, query for applications that handle itents for the specific URL we want to launch. This will
return both browsers and native applications setup to handle that URL.

Now, remove all browsers found on the first list from the second list, and we’ll be left only with
native apps.

If the list is empty, we know there are no native handlers and return false. Otherwise, we launch
the intent for the native handler.

### Putting it all together

We need to ensure using the right method for each occasion: 

```java
static void launchUri(Context context, Uri uri) {
    boolean launched = Build.VERSION.SDK_INT >= 30 ?
            launchNativeApi30(context, uri) :
            launchNativeBeforeApi30(context, uri);

    if (!launched) {
        new CustomTabsIntent.Builder()
                .build()
                .launchUrl(context, uri);
    }
}
```

`Build.VERSION.SDK_INT` provides the information we need. If it’s equal or larger than 30, Android
knows the `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` and we can try launching a nativa app with the new
approach. Otherwise, we try launching with the old approach.

If launching a native app fails, we then launch a Custom Tabs.

## Customize the toolbar color

Customize with your application's primary color if you want the user to feel that the content is a
part of your application.

If you want to make it clear for the user that they have left your application, don’t customize the
color at all.

```java
//Setting a custom toolbar color
CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
intentBuilder.setToolbarColor(Color.BLUE);
```

## Enable the default Share Action or add your own

Make sure you eanble the Share Action to the overflow menu, as users expect to be able to share the
link to the content they are seeing in most use cases:

```java
    CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
    intentBuilder.addDefaultShareMenuItem();
```

## Customize the close button

Customize the close button to make the Custom Tab feel it is part of your application.

If you want the user to feel like Custom Tabs is a modal dialog, use the default `“X”` button. If
you want the user to feel the Custom Tab is part of the application flow, use the back arrow.

```java
    //Setting a custom back button
    CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
    intentBuilder.setCloseButtonIcon(BitmapFactory.decodeResource(
        getResources(), R.drawable.ic_arrow_back));
```

## Handle internal links

When intercepting clicks on links generated by [android:autoLink][5] or overriding clicks on links
on WebViews, make sure that your application handles the internal links and let's Custom Tabs
handle the external ones.

```java
WebView webView = (WebView)findViewById(R.id.webview);
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        return true;
    }

    @Override
    public void onLoadResource(WebView view, String url) {
        if (url.startsWith("http://www.example.com")) {
            //Handle Internal Link...
        } else {
            //Open Link in a Custom Tab
            Uri uri = Uri.parse(url);
            CustomTabsIntent.Builder intentBuilder =
                    new CustomTabsIntent.Builder(mCustomTabActivityHelper.getSession());
           //Open the Custom Tab        
            intentBuilder.build().launchUrl(context, url));                            
        }
    }
});
```

## Handle multiple clicks

If you need to do any processing between the user clicking on a link and opening the Custom Tab,
make sure it runs in under 100ms. Otherwise users will see the unresponsiveness and may try to
click multiple times on the  link.

If it's not possible to avoid the delay, make sure you application is prepared for when a user
clicks multiple times on the same link and does not open a Custom Tab multiple times.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

[1]: https://developer.android.com/reference/android/app/Activity.html#onStart()
[2]: https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient#warmup(long)
[3]: https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession#mayLaunchUrl(android.net.Uri,%20android.os.Bundle,%20java.util.List%3Candroid.os.Bundle%3E)
[4]: https://developer.android.com/reference/android/webkit/WebView.html
[5]: https://developer.android.com/reference/android/widget/TextView.html#attr_android:autoLink
[6]: https://developer.android.com/reference/android/content/Intent#FLAG_ACTIVITY_REQUIRE_NON_BROWSER
[7]: https://developer.android.com/preview/privacy/package-visibility
