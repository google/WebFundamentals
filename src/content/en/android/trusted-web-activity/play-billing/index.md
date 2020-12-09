project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Learn how to integrate Google Play Billing into your Trusted Web Activity project.

{# wf_published_on: 2020-11-25 #}
{# wf_updated_on: 2020-12-08 #}
{# wf_tags: trusted-web-activity #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_blink_components: N/A #}

# Use Play Billing in your Trusted Web Activity {: .page-title }

{% include "web/_shared/contributors/andreban.html" %}

Besides allowing your app to sell digital goods and subscriptions on the Play Store,
[Google Play Billing][1] offers tools for managing your catalog, prices and subscriptions, useful
reports, and a checkout flow powered by the Play Store that is already familiar to your users. It
is also a requirement for applications published on the Play Store that sell digital goods.

Chrome 88 is launching with an [Origin Trial][11] on Android that enables the integration of
[Trusted Web Activities][2] with the [Payment Request API][3] and the [Digital Goods API][4] to
implement purchase flows via Google Play Billing. We expect this Origin Trial to also be available
for Chrome OS on version 89.

In order to ease the integration to the Android app, the Trusted Web Activity team is introducing
an extension library to [android-browser-helper][5]. This guide will show you the changes required
to integrate this library into an existing application.

**Note:** This articles covers the integration for the Android app. If you are using
[Bubblewrap][9] to build your application you will be able to use the tool to update your app. The
implementation on Bubblewrap is being tracked in [this issue][10]. This guide is meant for
those who are **not** using Bubblewrap to update their app.

## build.gradle

The billing extension library itself depends on version `2.1.0` of `android-browser-helper`. Ensure
your application is using a version that is equal or greater than that. 

You will also need to add an implementation declaration for the billing extension library:

```groovy
dependencies {
    ...
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.1.0'
    implementation 'com.google.androidbrowserhelper:billing:1.0.0-alpha05'
}
```

## DelegationService.java

android-browser-helper ships with a default `DelegationService` that can be used directly by apps.
When using the billing extension, you need a slightly customized version of the
`DelegationService`.

In order to do that, you will need to create your own `DelegationService` class that extends the
original one and overrides `onCreate()`. Inside `onCreate()`, you will need to add a single
method call that registers the application as a handler for the Digital Goods API:

```java
package com.example.yourapp;

import com.google.androidbrowserhelper.playbilling.digitalgoods.DigitalGoodsRequestHandler;
import com.google.androidbrowserhelper.trusted.DelegationService;

public class DelegationService
        extends com.google.androidbrowserhelper.trusted.DelegationService {
    @Override
    public void onCreate() {
        super.onCreate();
        registerExtraCommandHandler(new DigitalGoodsRequestHandler(getApplicationContext()));
    }
}
```

## AndroidManifest.xml

On the Android Manifest, you will need to change the reference to the Delegation Library your own
implementation. In the corresponding `service` declaration, replace
`com.google.androidbrowserhelper.trusted.DelegationService` with your newly created class.

```xml
<service
    android:name=".DelegationService"
    android:exported="true">

    <intent-filter>
        <action android:name="android.support.customtabs.trusted.TRUSTED_WEB_ACTIVITY_SERVICE"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</service>
```

The billing library also introduces two new components that will need to be added to your Android
Manifest: a [Service][6] that the browser can connect to and check if the application supports the
payment, and an [Activity][7] that handles the payment flow itself:

```xml
<activity
    android:name="com.google.androidbrowserhelper.playbilling.provider.PaymentActivity"
    android:theme="@android:style/Theme.Translucent.NoTitleBar"
    android:configChanges="keyboardHidden|keyboard|orientation|screenLayout|screenSize"
    android:exported="true">
    <intent-filter>
        <action android:name="org.chromium.intent.action.PAY" />
    </intent-filter>
    <meta-data
        android:name="org.chromium.default_payment_method_name"
        android:value="https://play.google.com/billing" />
</activity>
<!-- This service checks who calls it at runtime. -->
<service
    android:name="com.google.androidbrowserhelper.playbilling.provider.PaymentService"
    android:exported="true" >
    <intent-filter>
        <action android:name="org.chromium.intent.action.IS_READY_TO_PAY" />
    </intent-filter>
</service>
```

## Learn more about the Digital Goods API and Google Play Billing

This article covered the steps needed specifically on the Android application that uses Trusted Web
Activity, but the Google Play Billing API has its own terminology and includes client and backend
components. We strongly recommend reading the [Google Play Billing][1] and the
[Digital Goods API][4] documentation and understanding its concepts before integrating it into an
application in production.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[1]: https://developer.android.com/google/play/billing
[2]: /web/android/trusted-web-activity/
[3]: https://www.w3.org/TR/payment-request/
[4]: https://github.com/WICG/digital-goods
[5]: https://github.com/GoogleChrome/android-browser-helper
[6]: https://developer.android.com/guide/components/services
[7]: https://developer.android.com/reference/android/app/Activity
[8]: https://developer.android.com/google/play/billing/terminology
[9]: https://github.com/GoogleChromeLabs/bubblewrap
[10]: https://github.com/GoogleChromeLabs/bubblewrap/issues/376
[11]: https://web.dev/origin-trials/

