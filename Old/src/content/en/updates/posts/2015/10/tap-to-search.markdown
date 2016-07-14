---
layout: updates/post
title: "Manage the triggering of Touch to Search"
published_on: 2015-10-22
updated_on: 2015-10-22
authors:
  - paulkinlan
tags:
  - news
  - touch
  - search
featured_image: /web/updates/images/2015/10/touchtosearch.jpg
description: "Understanding when and how Touch to Search is triggered"
---

Touch to Search launched in June of 2015 on Chrome 43 for most Android phones. When
 the user taps text on any page in Chrome, the word is selected along with 
relevant surrounding text. The search term appears in a bar at the bottom of 
the screen, which users can open  in an overlay panel to show full search 
results.

<img src="/web/updates/images/2015/10/touchtosearch.gif" style="max-width: 100%" />

Tap triggering is enabled for any plain text that is selectable and non 
interactive or not focusable. When the page has a click handler that responds 
to a tap on text, Touch to Search automatically detects the response and ignores 
it since we know the developer intended to handle the event.  Using a 
touch-and-hold gesture to manually select text also triggers the Touch to Search 
bar.  Users can enable or disable the feature using a preference under Chrome's 
Privacy settings.

As the author of a site there are often times when you don't want a tap gesture 
on certain element to trigger a search. To ensure that Chrome does what you 
intend, make those elements:

1. Focusable: add a `tabindex=-1` property on the element.
1. Interactive: Use any of several standard ways to indicate that an element is 
   interactive:
    * Use accessibility markup to indicate the element has a 
      [w](https://www.w3.org/TR/wai-aria/roles#widget_roles)[i](https://www.w3.org/TR/wai-aria/roles#widget_roles)[dget 
      role](https://www.w3.org/TR/wai-aria/roles#widget_roles), or [widget 
      attributes](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_widgets). 
       For example, any element with role=button won't trigger.  Adding 
      accessibility markup has the added benefit that your page will be more 
      readable by visually impaired users.
    * Any JavaScript click handler that calls `preventDefault()`, or manipulates 
      the DOM or CSS will not trigger Touch-to-Search.
1. Non-selectable: using `-webkit-user-select: none`;  Non-selectable text will 
   not trigger Touch-to-Search even when using the touch-and-hold gesture.

If Touch to Search does not trigger when or where it _should_ trigger, or 
triggers intermittently, then elements are probably marked focusable or 
interactive when they should not be.  Use the following procedure to help 
determine what's preventing Touch to Search from triggering:

1. Check if the text is selectable using the touch-and-hold gesture.  If the 
   text selects, but the Touch-to-Search bar does not appear, check that the 
   feature has not been disabled on your phone in the Touch to Search setting 
   under Privacy in Chrome.  Also note that some low-end devices do not support 
   Touch-to-Search.
1. If the Touch-to-Search bar shows when text is selected, but not when you tap, 
   then there is some tap triggering issue.  If the triggering is intermittent, 
   then the problem is likely due to animation being conditionally activated by 
   a JavaScript handler for the element.
1. If the triggering never happens, consult the trigger reasons listed above 
   (check if the element is focusable or interactive).

If your page still doesn't behave the way you'd like, file a bug at 
[crbug.com](https://crbug.com) and add the label 
`Cr-UI-Browser-Mobile-TouchToSearch`.
