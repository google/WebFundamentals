---
layout: article
title: "Bottom Bar"
description: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
thumbnail: bottombar/images/bottombar.png
article:
  written_on: 2014-01-01
  updated_on: 2014-09-19
  order: 4
authors:
  - mattgaunt
collection: navigation-patterns
introduction: "If you are developing a web app and find that the number of actions a user can perform is more than the App Bar can handle, the best option is to overflow into a Bottom Bar."
key-takeaways:
  bottom-bar:
    - Only consider using this approach if you aren't using a Tab Bar.
    - Stick to 5 items at most.
    - Use when you need to add more actions than the App Bar can hold.
---

{% wrap content%}

<div class="g-medium--2 g-medium--last g-wide--3">
  {% link_sample ../_code/bottombar-sample1.html %}
    <img src="images/bottombar.png">
  {% endlink_sample%}

  <div style="text-align:center;">
    {% link_sample_button ../_code/bottombar-sample1.html %}
      Demo
    {% endlink_sample_button %}
  </div>
</div>

<div style="clear: both;"></div>

We've seen that the App Bar can be used for placing actions.

For many sites, especially content driven sites, this will be enough space since there are relatively few actions available. However, web apps may find they have more actions for sections of their UI.

If you aren't using a tab and you have too many actions to fit on the App Bar, place actions in a bar along the bottom.

{% include modules/takeaway.liquid list=page.key-takeaways.bottom-bar %}

The advantage of this is that you have more space for actions and it's in a touch friendly area and gives you a secondary tier of actions.

Limit yourself to five actions at most, avoiding the buttons becoming too small and difficult to tap.

<div class="g-medium--2 g-medium--last g-wide--3">
  <div class="g--half">
    {% link_sample ../_code/appbar-navdrawer-bottombar-sample.html %}
      <img src="images/bottom-bar-alt-1.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/appbar-navdrawer-bottombar-sample.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>
</div>

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
