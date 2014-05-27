---
layout: article
title: "Bottom Bar"
description: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
thumbnail: bottombar/images/bottombar.png
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 4
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
collection: navigation-patterns
introduction: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
key-takeaways:
  bottom-bar:
    - Only consider using this approach if you aren't using a Tab Bar.
    - Stick to 5 items at most.
    - Use when you need to add more actions than the App Bar can hold.
---

{% wrap content%}

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/bottombar-sample1.html">
	<img class="g-medium--full g-wide--full" src="images/bottombar.png">
</a>

<div style="clear: both;"></div>

We've seen that the App Bar can be used for placing actions.

For many sites, especially content driven sites, this will be enough space since there are relatively few actions available. However, web apps may find they have more actions for sections of their UI.

If you aren't using a tab and you have too many actions to fit on the App Bar, place actions in a bar along the bottom.

{% include modules/takeaway.liquid list=page.key-takeaways.bottom-bar %}

The advantage of this is that you have more space for actions and it's in a touch friendly area and gives you a secondary tier of actions.

Limit yourself to five actions at most, avoiding the buttons becoming to small and difficult to tap.

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/appbar-navdrawer-bottombar-sample.html">
	<img class="g--half g--last" src="images/bottom-bar-alt-1.png"> 
</a>

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
