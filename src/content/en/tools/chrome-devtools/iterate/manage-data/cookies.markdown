---
layout: shared/narrow
title: "Inspect and Manage Cookies"
description: "Inspect and manage the cookies on page in the Chrome DevTools 
Resources panel."
published_on: 2015-04-14
updated_on: 2016-03-17
order: 2
authors:
  - kaycebasques
  - megginkearney
translation_priority: 0
key-takeaways:
  cookies:
    - "View detailed information about a cookie, such as its name, value, 
      domain, size, expiration date, and more."
    - "Delete a single cookie, cookies from a selected domain, or all cookies
      from all domains."
    - "Refresh a cookie."
---

<p class="intro">Inspect and manage your site's cookies by expanding the 
Cookies category in the Chrome DevTools Resources panel.</p>

![cookies category in resources panel](imgs/cookies.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.cookies %}

## View cookies

To view cookies, open the **Resources** panel and then expand the **Cookies**
category.

When you expand the **Cookies** category, you see a list of domains of the 
main document and of all loaded frames. Selecting one of these "frame groups" 
displays all cookies, for all resources, for all frames in that group. There 
are two consequences of this grouping to be aware of:

* Cookies from different domains may appear in the same frame group. 
* The same cookie may appear in several frame groups.

## Learn about each cookie

The following fields are displayed for each cookie in the selected frame group:

<table class="mdl-data-table">
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

You can clear (delete) a single cookie, all cookies in the selected frame 
group, or cookies from a specific domain. Recall the same cookie may appear 
in more than one frame group. If the same cookie for a given domain is 
referenced in two frame groups, deleting all cookies for that domain will 
affect both groups.

### Clear a single cookie

To clear a single cookie:

* Select a cookie in the table and click the **Delete** button 
  (![delete cookie button](imgs/delete-cookie.png){:.inline}) at the 
  bottom of the panel. 
* Right-click on a cookie and select **Delete**. In this context "clear" and 
  "delete" mean the same thing.

### Clear all cookies from selected frame group

To clear all cookies from the selected frame group:

* Click the Clear button ![Clear button](imgs/clear.png){:.inline} at the bottom of the Resources panel.
* Right-click on the frame group and select **Clear** from the context menu.
* Right-click on a cookie row in the table and select **Clear All**.

### Clear all cookies from specific domain

To clear all cookies from a specific domain, right-click on a cookie from the
target domain and select **Clear all from "DOMAIN"**, where **DOMAIN** is the
target domain.

![clear cookies from domain](imgs/delete-cookies-from-domain.png)

Note the following about this operation:

* Only cookies with exactly the same domain name are removed; sub- and 
  top-level domains are unaffected. 
* This operation only works on domains visible in the cookies table.

## Refresh page's cookies

You can also refresh the table to reflect any changes to the page's cookies.

To refresh the cookies table, click the refresh button (![Refresh 
button](imgs/refresh.png){:.inline}) at the bottom of the Resources panel, or
right-click on the table and select **Refresh**.


