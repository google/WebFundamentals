---
layout: shared/narrow
title: "Monetization Strategies"
description: "Monetization Strategies"
published_on: 2014-07-31
updated_on: 2015-10-06
order: 6
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

# Lesson 2: Implementing a Monetization Plan

##Overview
In this lesson, you'll tailor a monetization strategy for your product and learn how to set up tracking to monitor its effectiveness.

In many cases, the strategy choice is pretty clear. Most games use the freemium model, and [Software as a Service (SaaS)](https://en.wikipedia.org/wiki/Software_as_a_service) typically uses subscriptions. However, there is no harm in trying different models and tuning them to fit your needs.

##Implementing your model
Let's go through some of the steps for implementing the various monetization methods.

###Implementing ads on the web
It's important to create responsive ad units that automatically resize based on the size of the device and the width of the parent container. Responsive ads work in concert with your responsive layout, ensuring that your site looks great on any device.

>Responsive sites and ad units are increasingly important to users. See this Google AdWords blog called [Building for the next moment](http://adwords.blogspot.com/2015/05/building-for-next-moment.html) for more information.

In order to serve ads on your site, you will need an account with one of the Ad providers, such as Google AdSense. [Start here](http://www.google.com/adsense/start/#?modal_active=none), and then follow these basic steps to create a responsive ad unit.

 1. Visit the My ads tab.
 1. Click +New ad unit.
 1. Give your ad unit a unique name. This name appears in the ad code that's pasted into your site, so be descriptive.
 1. Select Responsive from the Ad size drop-down.
 1. Select Text & display ads from the Ad type drop-down.
 1. Click Save and get code.
 1. In the Ad code box that appears, select the Smart sizing option from the Mode drop-down. This is the recommended mode and doesn't require you to make any changes to your ad code.

You will get a snippet of code that looks something like this:

```javascript
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

One important side note &mdash; check your **robots.txt** file for these lines:

```
User-agent: Mediapartners-Google
Disallow: /
```

If they are present, remove them from the file, so that robots can scan your pages that contain ads.

>You can learn more about the robots.txt file [here](http://www.robotstxt.org/robotstxt.html).
