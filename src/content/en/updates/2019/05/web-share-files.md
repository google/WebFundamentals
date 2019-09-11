project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 75 introduces file sharing from a web app, which lets your web app can share with virtually anything on a user's device.

{# wf_published_on: 2019-05-02 #}
{# wf_updated_on: 2019-09-06 #}
{# wf_featured_image: /web/updates/images/generic/share.png #}
{# wf_tags: capabilities,sharing,chrome75 #}
{# wf_featured_snippet: Chrome 75 introduces file sharing from a web app, which lets your web app can share with virtually anything on a user's device. #}
{# wf_blink_components: Blink>WebShare #}

# Share files with Web Share {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/wst-send.png">
  <figcaption>
    System-level share target picker with installed PWA as an option.
  </figcaption>
</figure>

Over the last few years, we've been working to bring native sharing capabilities
to the web. The
[Web Share API](/web/updates/2016/09/navigator-share)
allows web apps to invoke the same share dialog box that a native app user would
see. The
[Web Share Target API](/web/updates/2018/12/web-share-target)
allows web apps to receive data from a share.

The only resource previously supported by these APIs was links. Chrome 75 adds
support for the [Web Share API - Level
2](https://w3c.github.io/web-share/level-2/), making it easy for web apps to
share files to other apps using the system provided picker. [In the
future](https://www.chromestatus.com/feature/6124071381106688), you'll also be
able to use web apps as a share target. For now, your web app can share files
with other web share targets registered on your device.

This article assumes some familiarity with the Web Share API. If this is new to
you, check out the links above or [the demo](https://w3c.github.io/web-share/demos/share-files.html). 

## The navigator.canShare() method

If you're familiar with the earlier API, you're used to doing feature detection
by testing for `navigator.share()`. With files it's more complicated. You need
to know whether the file a user is sharing is shareable on the current system. To
find out, you test for the presence of `navigator.canShare()`, and if present,
you call it with a reference to the files you want to share. 

```javascript
const shareData = { files: filesArray };
if (navigator.canShare && navigator.canShare(shareData)) {
  // Share the data.
} else {
  console.log('Your system doesn\'t support sharing files.');
}
```

Take note of what's not in `shareData`. When calling `navigator.canShare()` for files,
`shareData` cannot contain other members. If you need title, text, or url you'll
need to add them afterwards.

Image, video, audio and text files can be shared (see
[permitted extensions](https://docs.google.com/document/d/1tKPkHA5nnJtmh2TgqWmGSREUzXgMUFDL6yMdVZHqUsg/edit?usp=sharing)).
More file types may be permitted in the future.  

You're now ready to share:

```javascript
if (navigator.canShare && navigator.canShare( { files: filesArray } )) {
  navigator.share({
    files: filesArray,
    title: 'Vacation Pictures',
    text: 'Barb\nHere are the pictures from our vacation.\n\nJoe',
  })
  .then(() => console.log('Share was successful.'))
  .catch((error) => console.log('Sharing failed', error));
} else {
  console.log('Your system doesn\'t support sharing files.');
}
```

It may seem odd to include other data members when sharing files. Allowing these
members expands the flexibility of use cases. Imagine if after running the code
above, the user chose an email application as the target. The `title` parameter
might become an email subject, the `text`, the body of the message, and the
`files`, attachments.

Note: The `shareData` argument is required for both `navigator.canShare()` and
`navigator.share()` even though the specification labels it as optional in both
cases. As the specification itself states, this is because of a quirk of the Web
IDL rules.

## More information

+   [Web Share demo](https://w3c.github.io/web-share/demos/share-files.html)
+   [Web Share explainer](https://github.com/WICG/web-share/blob/master/docs/explainer.md)
+   [Web Share on Chrome Status](https://www.chromestatus.com/feature/4777349178458112)

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
