project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Web Share Target API allows installed web apps to register with the underlying OS as a share target to receive shared content from either the Web Share API or system events, like the OS-level share button.

{# wf_published_on: 2018-12-05 #}
{# wf_updated_on: 2019-08-20 #}
{# wf_featured_image: /web/updates/images/generic/share.png #}
{# wf_tags: capabilities,sharing,android,chrome71 #}
{# wf_featured_snippet: The Web Share Target API allows installed web apps to register with the underlying OS as a share target to receive shared content from either the Web Share API or system events, like the OS-level share button. #}
{# wf_blink_components: Blink>WebShare #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Registering as a Share Target with the Web Share Target API {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

## What is the Web Share Target API? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/wst-send.png">
  <figcaption>
    System-level share target picker with installed PWA as an option.
  </figcaption>
</figure>

On your mobile device, sharing something is usually as simple as clicking the
Share button, choosing which app you want to send it to, and then who to
share it with. For example, after reading an interesting article, I may want
to share it via email with a few friends, or Tweet about it.

Until now, only native apps could register as a share target. The Web Share
Target API allows installed web apps to register with the underlying OS as a
share target to receive shared content from either the Web Share API or
system events, like the OS-level share button.

Users can easily share content to your web app because it appears in the
system-level share target picker.

<div class="clearfix"></div>

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [Complete][spec]             |
| 3. Gather feedback & iterate on design     | [Complete][issues]           |
| 4. Origin trial                            | Complete                     |
| **5. Launch**                              | [**Chrome 71+**][cr-status]  |

Web Share Target is currently supported on Android in Chrome 71 or later. Both
Mozilla and Microsoft have indicated their support but have not implemented it
yet.

We’ve started working on
[Web Share Target - Level 2](https://wicg.github.io/web-share-target/level-2/), adding
support for sharing file objects. Look for a post about that coming soon.


### See it in action {: .hide-from-toc }

1. Using Chrome 71 or later, open the [Web Share Target demo][demo].
2. When prompted, click **Install** to add the app to your home screen, or
   use the Chrome menu to add it to your home screen.
3. Open any app that includes a native share intent, or use the Share button
   in the demo app.
4. Choose **Web Share Test**

After sharing to the demo app, you should see all of the information sent
via the web share target web app.


## Register your app as a share target {: #use }

Note: To register a web app as a share target, it must be meet
[Chrome’s installability criteria](/web/fundamentals/app-install-banners/#criteria),
and have been installed by the user.

To register your app as a share target, the web app needs to meet
[Chrome’s installability criteria](/web/fundamentals/app-install-banners/#criteria).
In addition, before a user can share to your app, they must add it to their
home screen. This prevents sites from randomly adding themselves to the users
share intent chooser, and ensures that it’s something that they want to use.


### Update your web app manifest

To register your app as a share target, add a `share_target` entry to the
[web app manifest](/web/fundamentals/web-app-manifest/).

In the `manifest.json` file, add the following:

```json
"share_target": {
  "action": "/share-target/",
  "method": "GET",
  "enctype": "application/x-www-form-urlencoded",
  "params": {
    "title": "title",
    "text": "text",
    "url": "url"
  }
}
```

If your application already has a share URL scheme, you can replace the
`param` values with your existing query parameters. For example, if your share
URL scheme uses `body` instead of `text`, you could replace the above with
`"text": "body",`.

The `method` value will default to `"GET"` if not provided. You may need to
switch it to `"POST"`, depending on what type of HTTP request your `action` URL
expects to receive. If your web app accepts `POST`s, then the `enctype` value
will determine what
[type of encoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype)
is used for the body of the `POST` request. The default `enctype` is
`"application/x-www-form-urlencoded"`, and the value is ignored if `method` is
set to `"GET"`.

When another application tries to share, your application will be listed as an
option in the share intent chooser.

Note: You can only have one `share_target` per manifest, if you want to share
to different places within your app, provide that as an option within the
share target landing page.

### Handle the incoming content

If the user selects your application, and your `method` is `"GET"` (the
default), the browser opens a new window at the `action` URL. It will generate a
query string using the URL encoded values supplied in the manifest. For example,
if the other app provides `title` and `text`, the query string would be
`?title=hello&text=world`.


```js
window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location);
  // searchParams.get() will properly handle decoding the values.
  console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
  console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
  console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
});
```

If your `method` is `"POST"`, then the body of the incoming `POST` request will
contain the same values, encoded using the `enctype` specified. You may choose
to handle this request server-side, by decoding the request body and using the
provided data.

How you deal with the incoming shared data is up to you, and dependent on your
app.

* An email client could draft a new email, using `title` as the subject of an
  email, with `text` and `url` concatenated together as the body.
* A social networking app could draft a new post, ignoring `title`, using
  `text` as the body of the message and adding `url` as a link. If `text` is
  missing, it might use `url` in the body as well. If `url` is missing, it
  might scan `text` looking for a URL and add that as a link.
* A text messaging app could draft a new message, using `text` and `url`
  concatenated together and dropping `title`.


### What gets shared?

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/wst-receive.png">
  <figcaption>
    System-level share target picker with installed PWA as an option.
  </figcaption>
</figure>

Be sure to check the incoming data. Unfortunately, there is no guarantee
that other apps will share the appropriate content in the right parameter.

On Android, the [`url` field will be empty](https://bugs.chromium.org/p/chromium/issues/detail?id=789379)
because it’s not supported in Android’s share system. Instead, URLs will often
appear in the `text` field, or occasionally in the `title` field.

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}


## Helpful Links {: #helpful }

* [Public explainer][explainer]
* [Tracking bug][cr-bug]
* [Web Share Target Demo][demo] | [Web Share Target Demo source][demo-source]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `Blink>WebShare`

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/web-share-target/
[demo]: https://web-share.glitch.me/
[demo-source]: https://glitch.com/edit/#!/web-share?path=index.html
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=668389
[cr-status]: https://www.chromestatus.com/features/5662315307335680
[explainer]: https://github.com/WICG/web-share-target/blob/master/docs/explainer.md
[issues]: https://github.com/WICG/web-share-target/issues
[wicg-discourse]: https://discourse.wicg.io/t/web-share-target-api-for-websites-to-receive-shared-content/1854
