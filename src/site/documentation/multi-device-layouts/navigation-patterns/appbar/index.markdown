---
layout: article
title: "App Bar"
description: "Users have learnt to expect a header on all of the desktop sites, but on mobile you should be using the App Bar."
thumbnail: appbar/images/appbar.png
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
collection: navigation-patterns
introduction: "Users have learnt to expect a header on all of the desktop sites, but on mobile you should be using the App Bar."
key-takeaways:
  app-bar:
    - Your logo should be placed at the top of each screen and take the user back to your homepage.
    - If you have a menu button, place it on the far left or far right of the App Bar and keep it in the same place throughout your site.
    - Key actions for your page should be kept in the App Bar.
---

{% wrap content%}

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-sample1.html">
	<img class="g-medium--full g-wide--full" src="images/appbar.png">
</a>
<div style="clear: both;"></div>

One expectation users will make when they land on your site is that your site's logo will be at the top of every page and clicking it will take them to your home page.

Traditionally the web has used page headers for this. On mobile devices use the App Bar.

{% include modules/takeaway.liquid list=page.key-takeaways.app-bar %}

The App Bar consists of three elements.

- Your sites logo
- Primary actions
- (Optional) Menu button

Nearly every site on the internet will have actions they enable their users to perform, search for example. Place buttons to perform these actions in the App Bar, giving your user a common to find out what the current actions are available on that page.

If you have a menu, use the hamburger icon (three horizontal lines) and place it on the far left or far right. Once you have selected a side, don't move it, always keep it in the same position meaning the user only needs to learn where it is once.

## Left vs Right Menu Button

If you have a slide in menu, you have the choice of putting the menu on the left or right hand side.

The top left corner is perceived by the user as where the most important elements of your UI lives, however it can also one of  hardest places to reach when holding the phone one handed. Putting the menu on the top right still gives it prominence and importance, but is easier to tap while holding the phone single handidly.

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-sample1.html">
	<img class="g--half" src="images/appbar-menu-left.png">
</a>
<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-sample2.html">
	<img class="g--half g--last" src="images/appbar-menu-right.png">
</a>

<div style="clear: both;"></div>

## Guidelines

The App Bar is a set of principals that you should apply to give your users a predictable experience, but there is plenty of opportunity to be creative in terms of style of the bar, button and interactions.

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-bottombar-sample.html">
	<img class="g--half" src="images/appbar-alt-1.png">
</a>
<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-sample.html">
	<img class="g--half g--last" src="images/appbar-alt-2.png">
</a>

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
