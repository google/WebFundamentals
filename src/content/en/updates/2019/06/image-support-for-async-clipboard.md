project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Async Clipboard API, the text-focused portion of which we’ve shipped in Chrome 66, has learned a new trick. As of Chrome 76, it now also handles images.

{# wf_published_on: 2019-06-30 #}
{# wf_updated_on: 2019-06-30 #}
{# wf_featured_image: /web/updates/images/generic/photo.png #}
{# wf_tags: chrome76,cutandcopy,execcommand,input,clipboard #}
{# wf_featured_snippet: The Async Clipboard API, the text-focused portion of which we’ve shipped in Chrome 66, has learned a new trick. As of Chrome 76, it now also handles images. #}
{# wf_blink_components: Platform>Apps>AppLauncher>Install #}

# Image Support for the Async Clipboard API {: .page-title }

{% include "web/_shared/contributors/thomassteiner.html" %}

In Chrome&nbsp;66, we shipped the [text-focused portion](/web/updates/2018/03/clipboardapi)
of the Asynchronous [Clipboard API](https://w3c.github.io/clipboard-apis/).
Now in Chrome&nbsp;76, we are shipping the *image-focused* portion of the Asynchronous Clipboard
API that will allow sites to programmatically copy and paste `image/png` images?

Before we dive into what is shipping now, let’s briefly look back at how the Asynchronous Clipboard
API works.
If you remember the details, ⏭ skip ahead to the
[new image-focused portion](#the_new_image-focused_portion_of_the_asynchronous_clipboard_api)
of the API.

## Recap of the Asynchronous Clipboard API

### Copy: Writing text to the clipboard

Text can be copied to the clipboard by calling `writeText()`.
Since this API is asynchronous, the `writeText()` function returns a Promise
that will be resolved or rejected depending on whether the passed text is copied successfully:

```js
const copyPageUrl = async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
```

### Paste: Reading text from the clipboard

Much like copy, text can be read from the clipboard by calling `readText()`
and waiting for the returned Promise to resolve with the text:

```js
const getClipboardContents = async () => {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
};
```

### Handling paste events

Paste events can be handled by using the, surprise, `paste` event.
It works nicely with the new asynchronous methods for reading clipboard text:

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  console.log('Pasted text: ', text);
});
```

### Security and permissions

As usual, `navigator.clipboard` is only supported for pages served over HTTPS
and to help prevent abuse, clipboard access is only allowed when a page is the active tab.
Pages in active tabs can write to the clipboard without requesting permission,
but reading from the clipboard always requires permission.

When the Asynchronous Clipboard API was introduced,
two new permissions for copy and paste were added to the
[Permissions API](/web/updates/2015/04/permissions-api-for-the-web).
The `clipboard-write` permission is granted automatically to pages when they are the active tab.
The `clipboard-read` permission must be requested, which you can do by trying to read data from the
clipboard.
Attempting to read or write clipboard data will automatically prompt the user for permission
if it has not already been granted.

```js
const permissionStatus = await navigator.permissions.query({
  name: 'clipboard-read'
});
// Will be 'granted', 'denied' or 'prompt':
console.log(permissionStatus.state);

// Listen for changes to the permission state
permissionStatus.onchange = () => {
  console.log(permissionStatus.state);
};
```

## 🆕 The new image-focused portion of the Asynchronous Clipboard API

### Copy: Writing an image to the clipboard

Similar to `writeText()`, the generic method `write()` that you can now use for copying PNG images
(`image/png`) is asynchronous and Promise-based.
Actually, `writeText()` is just a convenience method for the generic `write()` method.

In order to write an image to the clipboard, first, you need the image as a
[`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
One way to achieve this is by `fetch`ing (or if you insist `XMLHttpRequest`ing) the image from a
server and getting the response body as a
[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob) (or for XHR by setting the
[`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType#Value)
to `'blob'`).
Another method to `Blob`ify an image is to write the image to a canvas, and then to call the
canvas’s [`toBlob()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
method.

Eventually you will be able to copy more than one image to the clipboard,  so in the next step you
need to pass an array of `ClipboardItem`s as a parameter to the `write()` method.
As at present the `write()` method supports just one image, this will be a one-element array.
The `ClipboardItem` takes an object with the MIME type of the image as the key,
and the actual blob as the value.
The sample code below shows a future-proof way to do this by leveraging the
[`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
method.
If you use this approach from the start, your code will be ready for future image types as well as
other MIME types that the Asynchronous Clipboard API shall eventually support.

```js
try {
  await navigator.permissions.request({name: 'clipboard-write'});
  const data = await fetch('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Chrome_Material_Icon-450x450.png');
  const blob = await data.blob();
  await navigator.clipboard.write([
    new ClipboardItem(Object.defineProperty({}, blob.type, {
      value: blob,
      enumerable: true
    }))
  ]);
  console.log('Image copied.');
} catch(e) {
  console.error(e, e.message);
}
```

### Paste: Reading an image from the clipboard

Similar to `write()`, the `readText()` method is just a convenience method for `read()`.
It is likewise asynchronous and Promise-based and supports PNG images (`image/png`).

As a first step, you need to obtain the list of `ClipboardItem`s that you then need to iterate over.
Everything is asynchronous code, so remember to use the
[`for … of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
loop as it copes well with `await`ing asynchronous results.

Each `ClipboardItem` can hold its contents in different types, so next,
you need to iterate over the list of types, again using a `for … of` loop.
For each type, you call the `getType()` method with the current type as an argument
to obtain the corresponding image `Blob`.
As before, this code is future-proof and not tied to images.

```js
try {
  await navigator.permissions.request({name: 'clipboard-read'});
  const clipboardItems = await navigator.clipboard.read();
  for (const clipboardItem of clipboardItems) {
    try {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        console.log(URL.createObjectURL(blob));
      }
    } catch (e) {
      console.error(e, e.message);
    }
  }
} catch (e) {
  console.error(e, e.message);
}
```

### Custom paste handler

If you want to dynamically handle paste events, which most likely you want to do,
the code snippet below has all the steps you need.
It is actually just the snippet from above, but wrapped in an event listener listening on `paste`
that [prevents](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
the default paste behavior.

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  try {
    await navigator.permissions.request({name: 'clipboard-read'});
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      try {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type);
          console.log(URL.createObjectURL(blob), type);
        }
      } catch (e) {
        console.error(e, e.message);
      }
    }
  } catch (e) {
    console.error(e, e.message);
  }
});
```

### Custom copy handler

Rather than manually copying items in the clipboard, which is a little involved
as you need to deal with `Blob`s and wrap them in `ClipboardItem`s manually,
leveraging the `copy` event of the browser is easier.
Again you need to prevent the default behavior, and can then just write the clipboard data
that is conveniently already

```js
document.addEventListener('copy', async (e) => {
  e.preventDefault();
  try {
    await navigator.permissions.request({name: 'clipboard-write'});
    for (const item of e.clipboardData.items) {
      await navigator.clipboard.write(new ClipboardItem(Object.defineProperty({}, item.type, {
        value: item,
        enumerable: true
      })));
    }
    console.log('Image copied.');
  } catch(e) {
    console.error(e, e.message);
  }
});
```

### Demo

<iframe style="border: solid 1px;" width="100%" height="500"
  src="https://jsfiddle.net/0794oysr/2/embedded/result,js,html,css"
  allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"
></iframe>

### Security

Opening up the Asynchronous Clipboard API for images comes with certain
[risks](https://w3c.github.io/clipboard-apis/#security) that need to be carefully evaluated.
One new challenge are so-called [image compression bombs](https://bomb.codes/bombs#images),
that is, image files that appear to be innocent, but—once decompressed—turn out to be huge.
Even more serious than large images are specifically crafted malicious images
that are designed to exploit known vulnerabilities in the native operating system.
This is why we can’t just copy the image directly to the native clipboard,
and why in Chrome we require that the image be transcoded.

The [specification](https://w3c.github.io/clipboard-apis/#image-transcode)
therefore also explicitly mentions transcoding as a mitigation method:
*“To prevent malicious image data from being placed on the clipboard, the image data may be
transcoded to produce a safe version of the image.”*
There is some ongoing discussion happening on the related
[W3C Technical Architecture Group review](https://github.com/w3ctag/design-reviews/issues/350)
on whether and how the transcoding details should be specified.

## Next Steps

We are actively working on expanding the Asynchronous Clipboard API
so that in the future it can support a larger number of data types.
As the related [implementation bug](https://bugs.chromium.org/p/chromium/issues/detail?id=897289)
puts it, *“[t]his is a scary, dangerous, and powerful permission, with plenty of security risks,
so we need to tread carefully.”*
You can star the bug to be notified about changes.
For now, image support has landed and can be used as of Chrome 76.
Happy copying&nbsp;&amp;&nbsp;pasting!

## Related links

* [Explainer](https://github.com/w3c/clipboard-apis/blob/master/explainer.adoc)
* [Raw Clipboard Access Design Doc](https://docs.google.com/document/d/1XDOtTv8DtwTi4GaszwRFIJCOuzAEA4g9Tk0HrasQAdE/edit?usp=sharing)
* [Chromium bug](https://crbug.com/150835)
* [Chrome Platform Status entry](https://www.chromestatus.com/features/5074658793619456)
* [Technical Architecture Group (TAG) Review](https://github.com/w3ctag/design-reviews/issues/350)

## Acknowledgements

The Asynchronous Clipboard API was implemented by
[Darwin Huang](https://www.linkedin.com/in/darwinhuang/)
and [Gary Kačmarčík](https://www.linkedin.com/in/garykac/).
Darwin also provided the [demo](https://jsfiddle.net/0794oysr/2/).
My introduction of this article is inspired by
[Jason Miller](https://twitter.com/_developit?lang=en)’s
original [text](/web/updates/2018/03/clipboardapi).
Thanks to [Kyarik](https://github.com/kyarik) and again Gary Kačmarčík for reviewing this article.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
