project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How to use Custom Tabs with Android 11

{# wf_updated_on: 2020-07-09 #}
{# wf_published_on: 2020-07-09 #}
{# wf_tags: android, custom-tabs #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_blink_components: N/A #}

{% include "web/_shared/contributors/andreban.html" %}

# Using Custom Tabs with Android 11 {: .page-title }
[Android 11][12] introduced changes on how apps can interact with other apps that the user has
installed on the device. You can read more about those changes on [Android documentation][1].

When an Android app using Custom Tabs targets SDK level 30 or above some changes may be necessary.
This article goes over the changes that may be needed for those apps.

In the simplest case, Custom Tabs can be launched with a one-liner like so:

```java
new CustomTabsIntent.Builder().build()
        .launchUrl(this, Uri.parse("https://www.example.com"));
```

Applications launching applications using this approach, or even adding UI customizations like
[changing the toolbar color][2], [adding an action button][3] won’t need to do any changes in the
application.

## Preferring Native Apps

But, if you followed the [best practices][4] some changes may be required.

The first relevant best practice is that applications [should prefer a native app][5] to handle the
intent instead of a Custom Tab if an app that is capable of handling it is installed.

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

The solution is to try to launch the Intent and use `FLAG_ACTIVITY_REQUIRE_NON_BROWSER` to ask Android
to avoid browsers when launching.

If a native app that is [capable of handling][11] this Intent is not found, an
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
`http` intent. Those applications are likely browsers.

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

There’s some boilerplate involved in this best practice. We’re working on making this simpler by
encapsulating the complexity in a library. Stay tuned for updates to the
[android-browser-helper][9] support library. 

## Detecting browsers that support Custom Tabs

Another common pattern is to use the PackageManager to
[detect which browsers support Custom Tabs][7] on the device. Common use-cases for this are
setting the package on the Intent to avoid the app disambiguation dialog or choosing which browser
to connect to when [connecting to the Custom Tabs service][8].

When targeting API level 30, developers will need to add a queries section to their Android
Manifest, declaring an intent-filter that matches browsers with Custom Tabs support.

```xml
<queries>
    <intent>
        <action android:name=
            "android.support.customtabs.action.CustomTabsService" />
    </intent>
</queries>
```

With the markup in place, the [existing code][7] used to query for browsers that support Custom
Tabs will work as expected.

## Frequently Asked Questions

**Q: The code that looks for Custom Tabs providers queries for applications that can handle
`https://` intents, but the query filter only declares an
 `android.support.customtabs.action.CustomTabsService` query. Shouldn’t a query for `https://`
 intents be declared?**

A: When declaring a query filter, it will filter the responses to a query to the PackageManager,
not the query itself. Since browsers that support Custom Tabs declare handling the
CustomTabsService, they won’t be filtered out. Browsers that don’t support Custom Tabs will be
filtered out.

## Conclusion

Those are all the changes required to adapt an existing Custom Tabs integration to work with
Android 11. To learn more about integrating Custom Tabs into an Android app, start with the
[implementation guide][10] then check out the [best practices][4] to learn about building a
first-class integration.

Let us know if you have any questions or feedback!

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[1]: https://developer.android.com/preview/privacy/package-visibility
[2]: https://developers.google.com/web/android/custom-tabs/implementation-guide#configure_the_color_of_the_address_bar
[3]: https://developers.google.com/web/android/custom-tabs/implementation-guide#configure_a_custom_action_button
[4]: https://developers.google.com/web/android/custom-tabs/best-practices
[5]: https://developers.google.com/web/android/custom-tabs/best-practices#let_native_applications_handle_the_content
[6]: https://developer.android.com/reference/android/content/Intent#FLAG_ACTIVITY_REQUIRE_NON_BROWSER
[7]: https://developers.google.com/web/android/custom-tabs/implementation-guide#how_can_i_check_whether_the_android_device_has_a_browser_that_supports_custom_tab
[8]: https://developers.google.com/web/android/custom-tabs/implementation-guide#connect_to_the_custom_tabs_service
[9]: https://github.com/GoogleChrome/android-browser-helper
[10]: https://developers.google.com/web/android/custom-tabs/implementation-guide
[11]: https://developer.android.com/preview/privacy/package-visibility-use-cases#let-non-browser-apps-handle-urls
[12]: https://developer.android.com/android11
