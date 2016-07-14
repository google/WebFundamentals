---
layout: shared/narrow
title: "Design efficient forms"
description: "Design efficient forms by avoiding repeated actions, asking for only the necessary information and guide users by showing them how far along they are in multi-part forms."
published_on: 2014-08-11
updated_on: 2014-10-21
order: 1
authors:
  - petelepage
translation_priority: 0
key-takeaways:
  tldr:
    - "Use existing data to pre-populate fields and be sure to enable auto-fill."
    - "Use clearly-labeled progress bars to help users get through multi-part forms."
    - "Provide visual calendar so users don’t have to leave your site and jump to the calendar app on their smartphones."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  Design efficient forms by avoiding repeated actions, asking for only the necessary information and guide users by showing them how far along they are in multi-part forms.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Minimize repeated actions and fields

Make sure your forms have no repeated actions, only as many fields as 
necessary, and take advantage of 
[autofill](/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs.html#use-metadata-to-enable-auto-complete),
so that users can easily complete forms with pre-populated data.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    On the Progressive.com website, users are asked first for their ZIP code, which is then pre-populated into the next part of the form.
  </figcaption>
</figure>

Look for opportunities to pre-fill information you already know, or may 
anticipated to save the user from having to provide it.  For example, 
pre-populate the shipping address with the last shipping address supplied by 
the user.

## Show users how far along they are

Progress bars and menus should accurately convey overall progress through 
multi-step forms and processes.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    Use clearly-labeled progress bars to help users get through multi-part forms.
  </figcaption>
</figure>

If you place a disproportionately complex form in an earlier step, users 
are more likely to abandon your site before they go through the entire process. 


## Provide visual calendars when selecting dates

Users often need more context when scheduling appointments and travel dates, 
to make things easier and prevent them from leaving your site to check their 
calendar app, provide a visual calendar with clear labeling for selecting 
start and end dates. 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Hotel website with easy to use calendar">
  <figcaption>
    Hotel booking website with easy to use calendar widget for picking dates.
  </figcaption>
</figure>
