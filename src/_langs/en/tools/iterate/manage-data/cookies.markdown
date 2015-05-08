---
rss: false
layout: article
title: "Inspect and Manage Your Cookies"
seotitle: "Inspect and Manage Your Cookies in the Chrome DevTools Resources Panel"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
authors:
  - megginkearney
priority: 0
collection: manage-data
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Cover the content here: https://developer.chrome.com/devtools/docs/resource-panel#cookies

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}


You can view detailed information about cookies that have been created by an HTTP header or with JavaScript. You can also clear individual cookies, groups of cookies from the same origin, or clear all cookies from a specific domain.

<img src="resources-files/cookies.png" />

When you expand the Cookies category, it displays a list of domains of the main document and those of all loaded frames. Selecting one of these "frame groups" displays all cookies, for all resources, for all frames in that group. There are two consequences of this grouping to be aware of:

* Cookies from different domains may appear in the same frame group. 
* The same cookie may appear in several frame groups.

The following fields are displayed for each cookie in the selected frame group:

* **Name** — The cookie's name.
* **Value** — The cookie's value.
* **Domain** — The domain that the cookie applies to.
* **Path** — The path that the cookie applies to.  
* **Expires / Maximum Age**— The cookie's expiration time, or maximum age. For session cookies, this field is always "Session".
* **Size** — The size of the cookie's data in bytes.
* **HTTP** — If present, indicates that cookies should be used only over HTTP, and JavaScript modification is not allowed.
* **Secure** — If present, indicates that communication for this cookie must be over an encrypted transmission.

You can clear (delete) a single cookies, all cookies in the selected frame group, or cookies from a specific domain. Recall the same cookie may appear in more than one frame group, as discussed previously. If the same cookie for a given domain is referenced in two frame groups, deleting all cookies for that domain will affect both groups.

**To clear a single cookie**, do one of the following:

* Select a cookie in the table and click the Delete button at the bottom of the panel.
* Right-click on a cookie and select Delete.

**To clear all cookies from the selected frame group**, do one of the following:

* Click the Clear button <img src="../images/clear.png" /> at the bottom of the Resources panel.
* Right-click on the frame group and select **Clear** from the context menu.
* Right-click on a cookie row in the table and select **Clear All**.

**To clear all cookies from a specific domain:**

1. Right+click (or Ctrl+click) a cookie in the table from the target domain.
2. From the context menu, select **Clear All from _domain_**, where
   _domain_ is the target domain. 

<img src="resources-files/clear-all-cookies.png" />

Note the following about this operation:

* Only cookies with exactly the same domain name are removed; sub- and top-level domains are unaffected. 
* It only works on domains visible in the cookies table.

You can also refresh the table to reflect any changes to the page's cookies.

**To refresh the cookies table**, click the refresh button <img 
src="../images/refresh.png" /> at the bottom of the Resources panel. 

{% include modules/nextarticle.liquid %}

{% endwrap %}
