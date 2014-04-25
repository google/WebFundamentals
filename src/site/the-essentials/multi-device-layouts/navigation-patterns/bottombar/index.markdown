---
layout: article
title: "Bottom Bar"
description: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 4
collection: navigation-patterns
introduction: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
key-takeaways:
  bottom-bar:
    - Only consider using this approach if you aren't using a Tab Bar.
    - Stick to 5 items at most.
    - Use when you need to add more actions than the App Bar can hold.
---

{% wrap content%}

We've seen that the App Bar can be used for placing actions.

For many sites, especially content driven sites, this will be enough space since there are relatively few actions available. However web apps may find they have more actions for sections of their UI.

An additional approach is to place actions in a bar along the bottom, providing you aren't using tabs for your navigation.

The advantage of this is that you have more space for actions and it's in a touch friendly area and gives you a secondary tier of actions. 

Limit yourself to five actions at most, avoiding the buttons becoming to small and difficult to tap.

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/navigation-patterns/navdrawer-sample2.html"><img class="g--half g--last" src="images/bottom-bar-alt-1.png"></a>

<div style="clear: both;"></div>

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.bottom-bar %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
