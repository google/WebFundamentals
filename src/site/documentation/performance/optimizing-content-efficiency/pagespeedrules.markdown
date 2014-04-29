---
layout: article
title: "PageSpeed Rules and Recommendations"
description: ""
introduction: ""
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 4
collection: optimizing-content-efficiency
---

{% wrap content%}

{% include modules/toc.liquid %}

**TODO****: do we need this content?**

### Minify resources: HTML, CSS, JavaScript, and others.

Some resources, such as HTML, JavaScript, CSS, and even images may contain a lot
of redundant information that is unnecessary to construct the page - e.g.
comments in HTML, CSS, and JavaScript, or photo meta-data containing geo
information or camera settings.

By using a content specific minifier, this extra information can be eliminated
prior to applying other compression (e.g. GZIP for text) techniques and yield
significant additional savings.

### GZIP text-based resources

GZIP is optimized for compressing text-based resources and can decrease the size
of the resource by up to 90% during transfer. Fewer bytes translates to faster
downloads and smaller data charges for the visitor.

Ensure that your server is configured

Compress text resources with GZIP

### Optimize Images

JavaScript resources are 'parser-blocking' by default unless marked as 'async'
or added via a special JavaScript snippet. Parser blocking JavaScript forces the
browser to wait for the CSSOM and pauses construction of the DOM, which in turn
can significantly delay the time to first render.

#### **Prefer async JavaScript resources**

Async resources unblock the document parser and allow the browser to avoid
blocking on CSSOM prior to executing the script. Often, if the script can be
made async, it also means it is not essential for the first render - consider
deferring async scripts.

* minifycss
* minifyhtml
* minifyjavascript
* optimizeimages
    * servescaledimages
* specifyavaryacceptencodingheader

* avoidbadrequests
* leveragebrowsercaching
    * serveresourcesfromaconsistenturl
    * specifyacachevalidator


{% include modules/nextarticle.liquid %}

{% endwrap %}
