---
rss: false
layout: tools-article
title: "Inspect and Manage Your Cookies"
seotitle: "Inspect and Manage Your Cookies in the Chrome DevTools Resources Panel"
description: "Inspect and manage your site's cookies by expanding the Cookies category in the Chrome DevTools Resources panel."
introduction: "Inspect and manage your site's cookies by expanding the Cookies category in the Chrome DevTools Resources panel."
article:
  written_on: 2015-04-14
  updated_on: 2015-08-03
  order: 2
authors:
  - megginkearney
priority: 0
collection: manage-data
key-takeaways:
  cookies:
    - View detailed information about cookies created by an HTTP header or with JavaScript.
    - Clear a single cookie, cookies in a selected frame, or cookies in a specified domain.
    - Refresh the cookie's table.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

![Cookies](imgs/cookies.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.cookies %}

## View cookies

View detailed information about cookies that have been created by an HTTP header or with JavaScript. 

When you expand the Cookies category, it displays a list of domains of the main document and those of all loaded frames. Selecting one of these "frame groups" displays all cookies, for all resources, for all frames in that group. There are two consequences of this grouping to be aware of:

* Cookies from different domains may appear in the same frame group. 
* The same cookie may appear in several frame groups.

## Learn about each cookie

The following fields are displayed for each cookie in the selected frame group:

<table class="table-2">
  <thead>
    <tr>
      <th>Cookie Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">The cookie's name.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">The cookie's value.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">The cookie's domain.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">The cookie's path.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">The cookie's expiration time, or maximum age. For session cookies, this field is always "Session".</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">The cookie's size in bytes.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">If present, indicates that cookies should be used only over HTTP, and JavaScript modification is not allowed.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">If present, indicates that communication for this cookie must be over an encrypted transmission.</td>
    </tr>
  </tbody>
</table>

## Clear cookies

You can clear (delete) a single cookie, all cookies in the selected frame group, or cookies from a specific domain. Recall the same cookie may appear in more than one frame group. If the same cookie for a given domain is referenced in two frame groups, deleting all cookies for that domain will affect both groups.

### Clear a single cookie

To clear a single cookie:

* Select a cookie in the table and click the Delete button at the bottom of the panel.
* Right-click on a cookie and select Delete.

### Clear all cookies from selected frame group

To clear all cookies from the selected frame group:

* Click the Clear button ![Clear button](imgs/clear.png){:.inline} at the bottom of the Resources panel.
* Right-click on the frame group and select **Clear** from the context menu.
* Right-click on a cookie row in the table and select **Clear All**.

### Clear all cookies from specific domain

To clear all cookies from a specific domain:

1. Right+click (or Ctrl+click) a cookie in the table from the target domain.
2. From the context menu, select **Clear All from _domain_**, where
   _domain_ is the target domain. 

![Clear all cookies](imgs/clear-all-cookies.png)

Note the following about this operation:

* Only cookies with exactly the same domain name are removed; sub- and top-level domains are unaffected. 
* It only works on domains visible in the cookies table.

## Refresh page's cookies

You can also refresh the table to reflect any changes to the page's cookies.

To refresh the cookies table, click the refresh button ![Refresh button](imgs/refresh.png){:.inline} at the bottom of the Resources panel. 

{% include modules/nextarticle.liquid %}

{% endwrap %}
