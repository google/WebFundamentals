---
layout: shared/narrow
title: "Monetization Strategies"
description: "Monetization Strategies"
published_on: 2014-07-31
updated_on: 2015-10-06
order: 5
translation_priority: 0
authors:
  - megginkearney
  - petelepage
key-takeaways:
  tldr: 
    - "Choose the ads platform best suited to your site. We recommend the <a href='http://www.google.com/adsense/start/'>AdSense</a> platform for most sites, and the <a href='http://www.google.com/doubleclick/publishers/'>DoubleClick platform</a> for sites with their own advertising teams."
    - "Ads work best when they integrate nicely in your site; their color, content, size, and location enhance user experience. "
    - "Users click on ads that are relevant to the content they are looking for; understand how ads targeting works so that you can maximize your revenue."
notes:
  placement:
    - "Understanding how ad targeting works can help you to maximize your revenue."
  targeting:
    - "If you'd like to display ads related to specific topics, include complete sentences and paragraphs about these topics."
---

# Native app monetization terminology

In addition to the advertising terms discussed earlier, native apps have a few specific terms of their own.

 - *IAP* is "in-app purchases".
 - *ARPU* is "average revenue per user", and is calculated by dividing your total revenue by your total number of users.
 - *ARPPU* is "average revenue per paying user"; this is calculated by dividing total revenue by the number of users who actually made purchases.

###Premium apps
When you walk into a store in the the real world, you expect to pay for items before you can use them. Sometimes that model works in the app world, sometimes not. If you want to charge users before they download your app, you can. You might follow these steps.

 1. Create a Merchant Account ([more information](http://developer.android.com/distribute/googleplay/start.html#merchant-account))
 1. Set prices for your apps in the Developer Console ([more information](http://developer.android.com/distribute/googleplay/developer-console.html#selling-pricing-your-products))
 1. Optionally include advertising or use in-app billing to sell additional features or content ([more information](http://developer.android.com/google/play/billing/index.html))

###Freemium apps
However, remember that users are more likely to download free apps compared to fixed-priced ones. There are a couple of ways to monetize free apps using in-app billing to sell additional goods or services. 

 - Items that are purchased once and thereafter belong to the users, like levels or advancement codes (example: Angry Birds)
 - Items that users will always need more of, like extra lives or boosters (example: Clash of Clans)

This model is powerful because it builds trust. It lowers the entry barrier and allows users see you app's value. After that, you can ask users who are consistently using the product to pay for it.

###Subscription apps
In the subscription model the customer pays a recurring price for continued access to the product. Subscriptions provide an excellent opportunity to create continuing revenue streams and increase the LTV of your users. Andriod apps can use Google Play to handle the checkout details; iOS apps can use the Apple Store.

A free trial subscription allows users to explore your app first and see the value before subscribing. You can set a time limit for the trial, or use other limits that work better for you. For example, Dropbox limits the space you can use on its free tier.

Due to direct carrier billing limits, monthly subscriptions often work best. Annual subscriptions may exceed the carrier's limits, causing the purchase to be blocked. Also, monthly subscriptions tend to smooth out your cash flow.

>For more information, see this [Selling In-App Products class (Android)](http://developer.android.com/training/in-app-billing/index.html) and this [In-App Purchases class (Apple)](https://developer.apple.com/in-app-purchase/).

###E-commerce apps
Let's take a look at e-Commerce options for native apps. There are many options to sell physical goods such as clothing, bikes, or movie tickets. 

On every platform, you want to make the purchase process as smooth as possible. Generally, you should minimize user data entry and enable a payment flow that only requires one or two clicks. 

Both Android and Apple have built-in ways for you to do this, and both will keep your existing payment infrastructure.

>For Android developers, you can use the new [Android Pay](https://developers.google.com/android-pay/) feature.

###Ad apps
It's important that your ad formats match your app's experience. While banner ads may work well for a flashlight app, an immersive gaming app may benefit more from a video ad. In other words, take into consideration both the placement and the format of ads. The two leading ad platforms are [AdSense](http://www.google.com/adsense/start/) and [DoubleClick](http://www.google.com/doubleclick/publishers/), but there are other platforms as well.

Using [AdMob](http://www.google.com/admob/monetize.html#subid=us-en-et-dac) and the [Google Mobile Ads SDK](http://developer.android.com/google/play-services/ads.html), you can add advertising into your apps with just a few lines of code. Here are the basic steps.

 1. Set up the [Google Play services SDK](http://developer.android.com/google/play-services/setup.html).
 1. Once you've installed the Google Play services package, the Google Mobile Ads sample is located in <code>/extras/google-play-services/samples/ads</code>. It shows you how to serve banner and interstitial ads using the Google Mobile Ads APIs.
 1. Check out the [Google Mobile Ads API reference](http://developer.android.com/reference/gms-packages.html) or see more detailed documentation in this [Google Ads tutorial](https://developers.google.com/ads/).
