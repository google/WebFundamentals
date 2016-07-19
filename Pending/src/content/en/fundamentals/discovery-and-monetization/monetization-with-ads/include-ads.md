project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Follow the steps in this guide to learn how to include ads in your site. Create an AdSense account, create ad units, place the units in your site, configure payment settings, and get paid.

<p class="intro">
  Follow the steps in this guide to learn how to include ads in your site. Create an AdSense account, create ad units, place the units in your site, configure payment settings, and get paid.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Build sample page with ads

In this walk-through, you'll build a simple page that includes responsive ads
using Google AdSense and the Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Sample website with ads on desktop and mobile">

If you're unfamiliar with the Web Start Kit, refer to the
[Set Up Web Starter Kit](/web/fundamentals/getting-started/web-starter-kit/setting-up) documentation.

In order to include ads in your site and get paid, you'll need to follow these simple steps:

1. Create an AdSense account.
2. Create ad units.
3. Place ad units on a page.
4. Configure payment settings.

## Create an AdSense account
In order to serve ads on your site, you'll need an active AdSense account. If
you don't already have one, you'll need to [create one](https://www.google.com/adsense/) and agree to the
AdSense terms of service.  When you create your account, you'll need to verify:

* You are at least 18 years old and have a verified Google Account.
* You own a live website or other online content that complies with
[Google AdSense program policies](https://support.google.com/adsense/answer/48182);
ads are hosted on this site.
* You have a postal address and a mailing address associated with your bank account
so you can receive payments.

## Create ad units

An ad unit is a set of ads that are displayed on your page as a result of 
JavaScript you add to your page.  You have three options for sizing your ad
units:

* **[Responsive (Recommended)](https://support.google.com/adsense/answer/3213689)**. 
* [Pre-defined](https://support.google.com/adsense/answer/6002621).
* [Custom-sized](https://support.google.com/adsense/answer/3289364).

You are building a responsive site; use responsive ad units.
Responsive ads automatically resize based on the size of the device
and the width of the parent container.
Responsive ads work in line with your responsive layout,
ensuring your site looks great on any device.

If you don't use responsive ad units, you will have to write a lot more code 
to control how ads appear based on a user's device. Even if you must specify 
the exact size of your ad units, use responsive ad units in 
[advanced mode](/web/fundamentals/discovery-and-monetization/monetization-with-ads/customize-ads#what-if-responsive-sizing-isnt-enough).

To make your code simpler and save you time and effort,
the responsive ad code automatically adapts the ad unit size to your page layout.
The code calculates the required size dynamically based on the width of the ad unit’s parent container,
then picks the best-performing ad size that fits in the container.
For example, a mobile-optimized site with a width of 360px might show a 320x50 ad unit.

Track the current
[top performing ad sizes](https://support.google.com/adsense/answer/6002621#top)
in the Google AdSense
[Guide to ad sizes](https://support.google.com/adsense/answer/6002621#top).

### To create a responsive ad unit

1. Visit the [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Click <strong>+New ad unit</strong>.
3. Give your ad unit a unique name. This name appears in the ad code that's
pasted into your site, so be descriptive.
4. Select <strong>Responsive</strong> from the Ad size drop-down.
5. Select <strong>Text & display ads</strong> from the Ad type drop-down.
6. Click <strong>Save and get code</strong>.
7. In the <strong>Ad code</strong> box that appears, select the 
<strong>Smart sizing (recommended)</strong> option from the Mode drop-down. 
This is the recommended mode and doesn’t require you to make any changes to
your ad code.

After creating your ad unit, AdSense provide a snippet of code to include 
on your site, similar to the code below:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script </span><span class="na">async</span> <span class="na">src=</span><span class="s">&quot;//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>
<span class="c">&lt;!-- Top ad in web starter kit sample --&gt;</span>
<span class="nt">&lt;ins</span> <span class="na">class=</span><span class="s">&quot;adsbygoogle&quot;</span>
  <span class="na">style=</span><span class="s">&quot;display:block&quot;</span>
  <span class="na">data-ad-client=</span><span class="s">&quot;XX-XXX-XXXXXXXXXXXXXXXX&quot;</span>
  <span class="na">data-ad-slot=</span><span class="s">&quot;XXXXXXXXXX&quot;</span>
  <span class="na">data-ad-format=</span><span class="s">&quot;auto&quot;</span><span class="nt">&gt;&lt;/ins&gt;</span>
<span class="nt">&lt;script&gt;</span>
  <span class="p">(</span><span class="nx">adsbygoogle</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">adsbygoogle</span> <span class="o">||</span> <span class="p">[]).</span><span class="nx">push</span><span class="p">({});</span>
<span class="nt">&lt;/script&gt;</span></code></pre></div>





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Include ad units in your site

To include the ad on the page, we need to paste the provided AdSense snippet
into our markup.  If you want to include multiple ads, you can either 
re-use the same ad unit, or create multiple ad units.

1. Open the `index.html` in the `app` folder.
2. Paste the provided snippet into the `main` tag.
3. Save the file and try viewing it in your browser, then try opening it on a 
mobile device or via the Chrome emulator.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Sample website with ads on desktop and mobile">
    <br>
    Try it
  </a>
</div>

## Configure payment settings

Wondering when your AdSense payment will arrive? Trying to figure out whether
you'll be paid this month or next month? Be sure you've completed all of
the steps below:

1. Verify you've provided any required tax information in the [payee profile](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE). 
2. Confirm your payee name and address are correct.
3. Select your form of payment on the [Payment settings page](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Enter your [personal identification number (PIN)](https://support.google.com/adsense/answer/157667). This PIN verifies the accuracy of your account information.
5. Check to see if your balance reaches the [payment threshold](https://support.google.com/adsense/answer/1709871). 

Refer to [Intro to AdSense payments](https://support.google.com/adsense/answer/1709858)
for any additional questions.


