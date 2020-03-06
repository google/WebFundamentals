project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Best Practices for Custom Tabs implementations.

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-03-06 #}
{# wf_blink_components: N/A #}

# Custom Tabs Best Practices {: .page-title }

Since Chrome Custom Tabs was launched, we've seen various implementations with different levels of
quality. This section describes a set of best practices we've found to create a good integration.

## Connect to the Custom Tabs service and call `warmup()`

You can **save up to 700 ms** when opening a link with the Custom Tabs by connecting to the service
and pre-loading Chrome.

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
        Uri.parse(Intent.URI_ANDROID_APP_SCHEME + "//" + context.getPackageName()));
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
the link

```java
/**
  * Returns a list of packages that support Custom Tabs.
  */	
public static ArrayList<ResolveInfo> getCustomTabsPackages(Context context) {
    PackageManager pm = context.getPackageManager();
    // Get default VIEW intent handler.
    Intent activityIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.example.com"));

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

## Allow the user to opt out of Custom Tabs

Add an option into the application for the user to open links in the default browser instead of
using a Custom Tab. This is specially important if the application opened the link using the
browser before adding support for Custom Tabs.

## Let native applications handle the content

Some URLs can be handled by native applications. If the user has the Twitter app installed and
clicks on a link to a tweet. They expect that the Twitter application will handle it.

Before opening an url from your application, check if a native alternative is available and use it.

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

## Add a Share Action

Make sure you add the Share Action to the overflow menu, as users expect to be able to share the
link to the content they are seeing in most use cases, and Custom Tabs doesn’t add one by default.

```java
//Sharing content from CustomTabs with on a BroadcastReceiver
public void onReceive(Context context, Intent intent) {
    String url = intent.getDataString();

    if (url != null) {
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.setType("text/plain");
        shareIntent.putExtra(Intent.EXTRA_TEXT, url);

        Intent chooserIntent = Intent.createChooser(shareIntent, "Share url");
        chooserIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        context.startActivity(chooserIntent);
    }
}
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

[1]: http://developer.android.com/reference/android/app/Activity.html#onStart()
[2]: http://developer.android.com/reference/android/support/customtabs/CustomTabsClient.html#warmup%28long%29
[3]: http://developer.android.com/reference/android/support/customtabs/CustomTabsSession.html#mayLaunchUrl%28android.net.Uri,%20android.os.Bundle,%20java.util.List%3Candroid.os.Bundle%3E%29
[4]: http://developer.android.com/reference/android/webkit/WebView.html
[5]: http://developer.android.com/reference/android/widget/TextView.html#attr_android:autoLink