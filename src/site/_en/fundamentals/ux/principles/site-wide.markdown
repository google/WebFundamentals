---
layout: article
title: "Site-wide Design Considerations"
description: "Mobile users will notice and be delighted by the small things you do for them to enhance their experience."
introduction: "Mobile users will notice and be delighted by the small things you do for them to enhance their experience."
article:
  written_on: 2014-07-28
  updated_on: 2014-07-28
  order: 5
id: principles-of-site-design-swide
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
  twitterauthor: "@petele"
collection: principles-of-site-design
key-takeaways:
  tldr:   
    - TBD
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Use responsive design patterns to build your site

Unsurprisingly, participants had a much easier time navigating mobile-optimized 
sites than trying to navigate desktop sites on mobile devices. Sites that 
included a mix of desktop and mobile-optimized pages were actually harder for 
participants to use than all-desktop sites.

<img src="image00.jpg" width="624" height="340" />

See [Responsive Web Design 
Basics](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/) 
for more detailed information on how to build responsive pages.

## Don't make users pinch-to-zoom

Design your mobile site so that users won't ever need to change the size. Some 
mobile sites even disable pinch-to-zoom on their screens - if your site is 
designed correctly, users will never notice it's gone.  Participants were 
frustrated when they needed to zoom in or out, and sometimes missed important 
messaging and calls-to-action. 

## Make product images expandable

Customers want to see what they're buying.  On retail sites, users expect to be 
able to view high resolution closeups of products to get a better look at 
details, and study participants got frustrated if they weren't able to.

<img src="image01.png" width="308" height="412" />

A good example of tappable, expandable images is provided by the J. Crew site.  
An disappearing overlay indicates that an image is tappable, providing a zoomed 
in image with fine detail visible.

## Be clear why you need a user's location

Users should always understand why you're asking for their location. 
Participants trying to book a hotel in another city became confused when a 
travel site detected their location and offered hotels in their current city 
instead. Leave location fields blank by default, and let users choose to 
populate them through a clear call-to-action like "Find Near Me."

<img src="image02.png" width="624" height="318" />

Make sure the user understands why you're asking for their location, and what 
the benefit to them will be.  Asking for it immediately on the homepage as the 
site loads results in a poor user experience.

See [User 
Location](https://developers.google.com/web/fundamentals/device-access/user-location/) 
for more detailed information on how to access the users location.

## Keep your user in a single browser window

Switching between windows on a smartphone can be troublesome, and raises the 
risk that visitors might not find their way back to your site. Try to keep users 
in one place by avoiding calls-to-action that launch new windows. 

<img src="image03.png" width="316" height="418" />

For example, if you accept coupons, consider offering these on your site to 
avoid users opening new windows to search elsewhere.  Consider other ways that 
might cause a user to to look outside your site and provide easy to use features 
to keep them on your site.

{% endwrap %}
