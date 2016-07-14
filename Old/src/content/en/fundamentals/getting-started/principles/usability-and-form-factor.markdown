---
layout: shared/narrow
title: "Usability and form factor"
description: "Mobile users will notice and be delighted by the small things you do for them to enhance their experience."
authors:
  - petelepage
published_on: 2014-09-17
updated_on: 2015-09-17
order: 5
translation_priority: 1
---

<p class="intro">
Delight your mobile users with small things that enhance their experiences.
</p>

{% include shared/toc.liquid %}

## 19. Optimize your entire site for mobile

Use a [responsive layout](/web/fundamentals/design-and-ui/responsive/) that changes based on the size and capabilities of the user’s device. Study participants found sites with a mix of desktop and mobile-optimized pages even harder to use than desktop-only sites.

## 20. Don't make users pinch-to-zoom

Users are comfortable with scrolling sites vertically, but not horizontally. Avoid large, fixed-width elements. Use [CSS media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) to apply different stylings for different screens. Don’t create content that only displays well at a particular [viewport width](/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport). Sites that force users to horizontally scroll fail the [Google Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/), which may negatively impact their search rankings.

## 21. Make product images expandable

Retail customers expect sites to let them [view high resolution closeups](/web/fundamentals/design-and-ui/media/images/) of products. Study participants got frustrated when they weren’t able to see what they were buying.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="wf-figcaption-good">Do: Make product images expandable and easy to see detail.</figcaption>
  </figure>
</div>

## 22. Tell users which orientation works best

Study participants tended to stay in the same screen orientation until something prompted them to switch. Design for both landscape and portrait, or encourage users to switch to the optimal orientation. Make sure that your important calls-to-action can be completed even if the users ignore the suggestion to switch orientations.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/us-orientation.jpg">
    <figcaption class="wf-figcaption-good">Do: Tell the user which orientation works best.</figcaption>
  </figure>
</div>

## 23. Keep your user in a single browser window

Users may have trouble switching between windows and might not be able to find their way back to the site. Avoid calls-to-action that launch new windows. Identify any journeys that might cause a user to look outside your site and provide features to keep them on your site. For example, if you accept coupons, offer them directly on the site, rather than forcing users to search other sites for deals.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="wf-figcaption-good">Do: Macy's keeps their users on their site by providing coupons on site.</figcaption>
  </figure>
</div>

## 24. Avoid 'full site' labeling

When study participants saw an option for a ‘full site’ (i.e. desktop site) versus a ‘mobile site’, they thought the mobile site lacked content and chose the ‘full’ one instead, directing them to the desktop site.


## 25. Be clear why you need a user's location

Users should always understand why you’re asking for their [location](/web/fundamentals/native-hardware/user-location/). Study participants trying to book a hotel in another city became confused when a travel site detected their location and offered hotels in their current city instead. Leave location fields blank by default, and let users choose to populate them through a clear call-to-action like “Find Near Me”.


<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-good.png">
    <figcaption class="wf-figcaption-good">Do: always request access to location on a user gesture.</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="wf-figcaption-bad">Don't: asking for it immediately on the homepage as the site loads results in a poor user experience.</figcaption>
  </figure>
</div>
