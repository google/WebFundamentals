project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Responsive design patterns for multi-device accessibility

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Multi-Device Responsive Design {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



We know that it's a good idea to design responsively to provide the best multi-device experience, but responsive design also yields a win for accessibility.

Consider a site like <a href="https://www.udacity.com/" target="_blank">Udacity</a>. A low-vision user who has difficulty reading small print might zoom in the page, perhaps as much as 400%, whereupon they are now essentially viewing the mobile version of the site on their desktop. 

Because the site is designed responsively, the UI will rearrange itself for the "smaller viewport" (actually for the larger page), which is great for desktop users who require screen magnification and for mobile screen reader users as well. It's a win-win. In fact, just by designing responsively, we're meeting <a href="http://webaim.org/standards/wcag/checklist#sc1.4.4" target="_blank">rule 1.4.4 of the WebAIM checklist</a>, which states that a page "...should be readable and functional when the text size is doubled."

Going over all of responsive design is outside the scope of this course, but here are a few important takeaways that will benefit your responsive experience and give your users better access to your content.

 - First, make sure you always use a `viewport` meta tag, and set its width to the `device-width` and its `initial-scale` to 1. Setting `width=device-width` will match the screen's width in device-independent pixels, and setting `initial-scale=1` establishes a 1:1 relationship between CSS pixels and device-independent pixels. Doing this instructs the browser to fit your content to the screen size, so users don't just see a bunch of scrunched-up text.

![a phone display without and with the viewport meta tag](imgs/scrunched-up.png)

>Note: When using the viewport meta tag, make sure you don't force `maximum-scale` to 1 or set `user-scaleable` to no. Let users zoom if they need to!

 - Another technique to keep in mind is designing with a responsive grid. As you saw with the Udacity site, designing with a grid means your content will reflow when the page changes size. Often these layouts are produced using relative units like percents, ems, or rems instead of hard-coded pixel values. The advantage of doing it this way is that text and content can enlarge and force other items down the page. So the DOM order and the reading order remain the same, even if the layout changes because of magnification.

 - Also, consider using relative units like `em` or `rem` for things like text size, instead of pixel values. Some browsers support resizing text only in user preferences, and if you're using a pixel value for text, this setting will not affect your copy. If, however, you've used relative units throughout, then the site copy will update to reflect the user's preference.

![use relative units instead of pixel values](imgs/relative-units.png)

 - Finally, when your design is displayed on a mobile device, you should ensure that interactive elements like buttons or links are large enough, and have enough space around them, to make them easy to press without accidentally overlapping onto other elements. This benefits all users, but is especially helpful for anyone with a motor impairment.

A minimum recommended touch target size is around 48px on a site with a properly set mobile viewport. For example, while an icon may only have a width and height of 24px, you can use additional padding to bring the tap target size up to 48px. The 48x48 pixel area corresponds to around 9mm, which is about the size of a person's finger pad area. Touch targets should also be spaced about 32 pixels apart, both horizontally and vertically, so that a user's finger pressing on one tap target does not inadvertently touch another tap target. 

![proper touch target size and distance](imgs/touch-target.png)

>See the Google article <a href="https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately?hl=en" target="_blank">Size Tap Targets Appropriately</a> for more information.
