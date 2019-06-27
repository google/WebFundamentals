project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Async Clipboard API, the text-focused portion of which we've shipped in Chrome 66, has learned a new trick. As of Chrome 76, it now also handles images.

{# wf_published_on: 2019-06-30 #}
{# wf_updated_on: 2019-06-30 #}
{# wf_featured_image: /web/updates/images/2019/06/pwa-omnibox-install.jpg #}
{# wf_tags: chrome76,cutandcopy,execcommand,input,clipboard #}
{# wf_featured_snippet: The Async Clipboard API, the text-focused portion of which we've shipped in Chrome 66, has learned a new trick. As of Chrome 76, it now also handles images. #}
{# wf_blink_components: Platform>Apps>AppLauncher>Install #}

# Image Support for the Async Clipboard API {: .page-title }

{% include "web/_shared/contributors/thomassteiner.html" %}

In Chrome&nbsp;66, we shipped the [text-focused portion](/web/updates/2018/03/clipboardapi)
of the Asynchronous [Clipboard API](https://w3c.github.io/clipboard-apis/)
that replaced the previous
[`Document.execCommand()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)-based
method to [cut and copy](/web/updates/2015/04/cut-and-copy-commands) contents on the web.
Now in Chrrome&nbsp;76, we are shipping the *image-focused* portion of the Asynchronous Clipboard API.

## Recap of the Asynchronous Clipboard API

Before I dive into what is shipping now, let me briefly look back at how the Asynchronous Clipboard API works.

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

Paste events can be handled by using the, surprise, `"paste"` event.
It works nicely with the new asynchronous methods for reading clipboard text:

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText()
  console.log('Pasted text: ', text);
});
```

### Security and permissions

As usual, `navigator.clipboard` is only supported for pages served over HTTPS
and to help prevent abuse, clipboard access is only allowed when a page is the active tab.
Pages in active tabs can write to the clipboard without requesting permission,
but reading from the clipboard always requires permission.

Two new permissions for copy and paste were added to the
[Permissions API](/web/updates/2015/04/permissions-api-for-the-web).
The `clipboard-write permission` is granted automatically to pages when they are the active tab.
The `clipboard-read permission` must be requested, which you can do by trying to read data from the clipboard.
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

## The new image-focused portion of the Asynchronous Clipboard API

### Copy: Writing an image to the clipboard

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

```js
document.addEventListener('copy', async (e) => {
  e.preventDefault();
  try {
    await navigator.permissions.request({name: 'clipboard-write'});
    await navigator.clipboard.write(e.clipboardData.items);
  } catch (e) {
    console.error(e, e.message);
  }
});
```

## Related links

* [Explainer](https://github.com/w3c/clipboard-apis/blob/master/explainer.adoc)
* [Raw Clipboard Access Design Doc](https://docs.google.com/document/d/1XDOtTv8DtwTi4GaszwRFIJCOuzAEA4g9Tk0HrasQAdE/edit?usp=sharing)
* [Chromium bug](https://crbug.com/150835)
* [Chrome Platform Status entry](https://www.chromestatus.com/features/5074658793619456)

