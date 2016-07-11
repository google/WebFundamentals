---
layout: shared/narrow
title: "Multi-Device Responsive Design"
description: "Responsive design patterns for multi-device accessibility"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 3
translation_priority: 0
authors:
  - megginkearney
  - dgash
key-takeaways:
  tldr: 
    - "Learn what accessibility means and how it applies to web development."
    - "Learn how to make web sites accessible and usable for everyone."
    - "Learn how to include basic accessibility with minimal development impace."
    - "Learn what HTML features are available and how to use them to improve accessibility."
    - "Learn about advanced accessibility techniques for creating polished accessibility experiences."
notes:
  efficiency:
    - "Understanding the accessibility issue, its scope, and its impact can make you a better web developer."
  problem-solving:
    - "Catching, identifying, and removing potential accessibility roadblocks before they happen can improve your development process and reduce maintenance requirements."
---

We know that it's a good idea to design responsively to provide the best multi-device experience, but responsive design is also a win for accessibility.

Consider a site like [Udacity](https://www.udacity.com/). A low-vision user who has difficulty reading small print might zoom in the page, perhaps as much as 400%, whereupon they are now essentially viewing the mobile version of the site on their desktop. 

The UI has rearranged itself for the "smaller viewport" (actually for the larger page), which is great for desktop users who require screen magnification and for mobile screen reader users as well. It's a win-win. In fact, just by designing responsively, we're meeting rule 1.4.4 of the WebAIM checklist, which states that a page "...should be readable and functional when the text size is doubled."

Going over all of responsive design is outside the scope of this course, but here are a few important takeaways that will benefit your responsive experience and give your users better access to your content.

 - First, make sure you always use a `viewport` meta tag, and set its width to the `device-width` and its `initial-scale` to 1. Setting `width=device-width` will match the screen's width in device-independent pixels, and setting `initial-scale=1` establishes a 1:1 relationship between CSS pixels and device-independent pixels. Doing this instructs the browser to fit your content to the screen size, so users don't just see a bunch of scrunched-up text.

>Note: When using the viewport meta tag, make sure you don't force `maximum-scale` to 1 or set `user-scaleable` to no. Let users zoom if they need to!

 - Another technique to keep in mind is designing with a responsive grid. As you saw with the Udacity site, designing with a grid means your content will reflow when the page changes size. Often these layouts are produced using relative units like percents, ems, or rems instead of hard-coded pixel values. The advantage of doing it this way is that text and content can enlarge and force other items down the page. So the DOM order and the reading order remain the same, even if the layout changes because of magnification.

 - Also, consider using relative units like `em` or `rem` for things like text size, instead of pixel values. Some browsers support resizing text only in user preferences, and if you're using a pixel value for text, this setting will not affect your copy. If, however, you've used relative units throughout, then the site copy will update to reflect the user's preference.

 - Finally, when your design is displayed on a mobile device, you shoule ensure that interactive elements like buttons or links are large enough, and have enough space around them, to make them easy to press without accidentally overlapping onto other elements. This benefits all users, but is especially helpful for anyone with a motor impairment.

A minimum recommended touch target size is around 48px on a site with a properly set mobile viewport. For example, while an icon may only have a width and height of 24px, you can use additional padding to bring the tap target size up to 48px. The 48x48 pixel area corresponds to around 9mm, which is about the size of a person's finger pad area. Touch targets should also be spaced about 32 pixels apart, both horizontally and vertically, so that a user's finger pressing on one tap target does not inadvertently touch another tap target. 

>See the Google article [Size Tap Targets Appropriately](https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately?hl=en) for more information.
