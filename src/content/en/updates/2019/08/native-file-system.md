project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The new Native File System API enables developers to build powerful web apps that interact with files on the user's local device, like IDEs, photo and video editors, text editors, and more. After a user grants a web app access, this API allows web apps to read or save changes directly to files and folders on the user's device.

{# wf_published_on: 2019-08-20 #}
{# wf_updated_on: 2019-09-09 #}
{# wf_featured_image: /web/updates/images/generic/file.png #}
{# wf_tags: capabilities,file,filesystem,native-file-system #}
{# wf_featured_snippet: The new Native File System API enables developers to build powerful web apps that interact with files on the user's local device, like IDEs, photo and video editors, text editors, and more. After a user grants a web app access, this API allows web apps to read or save changes directly to files and folders on the user's device. #}
{# wf_blink_components: Blink>Storage>FileSystem #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# The Native File System API: Simplifying access to local files {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="note">
  The Native File System API (formerly known as the Writeable Files API), is
  available behind a flag in Chrome 77 and later, and should begin an origin
  trial in Chrome 78 (stable in October). It is part of our capabilities
  project, and this post will be updated as the implementation progresses.
</aside>

## What is the Native File System API? {: #what-is-it }

The new Native File System API enables developers to build powerful web apps
that interact with files on the user's local device, like IDEs, photo and video
editors, text editors, and more. After a user grants a web app access, this
API allows web apps to read or save changes directly to files and folders
on the user's device.

If you've worked with reading and writing files before, much of what I'm about
to share will be familliar to you. I encourage you to read anyway because not
all systems are alike.

<aside class="caution">
  We've put a lot of thought into the design and implementation of the Native
  File System API to ensure that people can easily manage their files. See the
  <a href="#security-considerations">Security and permissions</a>
  section of this post for more information.
</aside>

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [In progress][spec]          |
| 3. Gather feedback & iterate on design     | [In progress][spec]          |
| 4. Origin trial                            | Expected to start in Chrome 78 |
| 5. Launch                                  | Not started                  |

## Using the Native File System API {: #how-to-use }

To show off the true power and usefulness of the Native File System APIs,
I wrote a single file [text editor][text-editor]. It lets you open a text
file, edit it, save the changes back to disk, or start a new file and save
the changes to disk. It's nothing fancy, but provides enough to help you
understand the concepts.

### Enabling via chrome://flags

If you want to experiment with the Native File System API locally, enable
the `#native-file-system-api` flag in `chrome://flags`.

<!--
### Enabling support during the origin trial phase {: #origin-trial }

Starting in Chrome 78, the Native File System API is available as an
origin trial on all desktop platforms. Origin trials allow you to try
new features and give feedback on their usability, practicality, and
effectiveness, both to us, and to the web standards community. For
more information, see the [Origin Trials Guide for Web Developers][ot-guide].

1. Request a [token][ot-request] for your origin.
2. Add the token to your pages, there are two ways to provide this token on
   any pages in your origin:
     * Add an `origin-trial` `<meta>` tag to the head of any page. For example,
       this may look something like:
       `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
     * If you can configure your server, you can also provide the token on
       pages using an `Origin-Trial` HTTP header. The resulting response header
       should look something like: `Origin-Trial: TOKEN_GOES_HERE`

-->

### Read a file from the local file system {: #read-file }

The first use case I wanted to tackle was to ask the user to choose a file,
then open and read that file from disk.

#### Ask the user to pick a file to read

The entry point to the Native File System API is
[`window.chooseFileSystemEntries()`][choose-fs-entries]. When called, it shows
a file picker dialog box, and prompts the user to select a file. After selecting
a file, the API returns a handle to the file. An optional options parameter
lets you influence the behavior of the file picker, for example, by allowing the
user to select multiple files, or directories, or different file types.
Without any options specified, the file picker allows the user to select a
single file. This is perfect for our text editor.

Like many other powerful APIs, calling `chooseFileSystemEntries()` must be
done in a [secure context][secure-contexts], and must be called from within
a user gesture.

```js
let fileHandle;
butOpenFile.addEventListener('click', async (e) => {
  fileHandle = await window.chooseFileSystemEntries();
  // Do something with the file handle
});
```

Once the user selects a file, `chooseFileSystemEntries()` returns a handle,
in this case a [`FileSystemFileHandle`][fs-file-handle] that contains the
properties and methods needed to interact with the file.

It’s helpful to keep a reference to the file handle around so that it can be
used later. It’ll be needed to save changes back to the file, or to perform any
other file operations. In the next few versions of Chrome, installed Progressive
Web Apps will also be able to save the handle to IndexedDB and persist access to
the file across page reloads.

#### Read a file from the file system

Now that you have a handle to a file, you can get the file's properties, or
access the file itself. For now, let’s simply read its contents. Calling
`handle.getFile()` returns a [`File`][file-api-spec] object, which contains
binary data as a blob. To get the data from the blob, call one of the reader
methods (`slice()`, `stream()`, `text()`, `arrayBuffer()`).

```js
const file = await fileHandle.getFile();
const contents = await file.text();
```

#### Putting it all together

When users click the Open button, the browser
shows a file picker. Once they’ve selected a file, the app reads the
contents and puts them into a `<textarea>`.

```js
let fileHandle;
butOpenFile.addEventListener('click', async (e) => {
  fileHandle = await window.chooseFileSystemEntries();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});
```

### Write the file to the local file system {: #write-file }

In the text editor, there are two ways to save a file: Save, and Save As.
Save simply writes the changes back to the original file using the file
handle we got earlier. But Save As creates a new file, and thus requires a
new file handle.

#### Create a new file

Passing `{type: 'saveFile'}` to `chooseFileSystemEntries()` will show the
file picker in “save” mode, allowing the user to pick a new file they want
to use for saving. For the text editor, I also wanted it to automatically
add a `.txt` extension, so I provided some additional parameters.

```js
function getNewFileHandle() {
  const opts = {
    type: 'saveFile',
    accepts: [{
      description: 'Text file',
      extensions: ['txt'],
      mimeTypes: ['text/plain'],
    }],
  };
  const handle = window.chooseFileSystemEntries(opts);
  return handle;
}
```

#### Save changes to the original file

You can find all the code for saving changes to a file in my [text
editor][text-editor] demo on [GitHub][text-editor-source]. The core file system
interactions are in [`fs-helpers.js`][text-editor-fs-helper]. At its simpliest,
the process looks like the code below. I'll walk through each step and explain itß.

```js
async function writeFile(fileHandle, contents) {
  // Create a writer (request permission if necessary).
  const writer = await fileHandle.createWriter();
  // Make sure we start with an empty file
  await writer.truncate(0);
  // Write the full length of the contents
  await writer.write(0, contents);
  // Close the file and write the contents to disk
  await writer.close();
}
```

To write data to disk, I needed a [`FileSystemWriter`][fs-writer]. Create one by
calling `createWriter()` on the file handle object. If permission to write
hasn’t been granted, the browser will prompt the user for permission. If
permission isn't granted, , `createWriter()` will throw a `DOMException`, and
the app will not be able to write to the file. In the text editor, these
`DOMException`s are handled in the [`saveFile()`][text-editor-app-js] method.

Next, call `truncate(0)`. This wipes the file of any existing data. If I didn't,
and I wrote less data than was already in the file, I see some of the old data
at the file's end. This is a stop-gap measure. The spec calls for
`createWriter()` to take an option called `keepExistingData`, which will default
to false. That hasn't been implemented yet, so for now I'll use `truncate(0)`.


Call `FileSystemWriter.write()` to write your contents.  The `write()` method
takes a string, which is what we want for a text editor. But it can also take a
[BufferSource][buffersource], or a [Blob][blob]. Finally, finish writing by
calling `FileSystemWriter.close()`.

Note: There's no guarantee that the contents are written to disk until
the `close()` method is called.

### What else is possible?

Beyond reading and writing files, the Native File System API provides
several other new capabilities.

#### Open a directory and enumerate its contents

To enumerate all files in a directory, call `chooseFileSystemEntries()`
with the `type` option set to `'openDirectory'`. The user selects a directory
in a picker, after which a [`FileSystemDirectoryHandle`][fs-dir-handle]
is returned, which lets you enumerate and access the directory’s files.

```js
const butDir = document.getElementById('butDirectory');
butDir.addEventListener('click', async (e) => {
  const opts = {type: 'openDirectory'};
  const handle = await window.chooseFileSystemEntries(opts);
  const entries = await handle.getEntries();
  for await (const entry of entries) {
    const kind = entry.isFile ? 'File' : 'Directory';
    console.log(kind, entry.name);
  }
});
```

## What’s currently supported? {: #whats-supported }

We’re still working on some of the implementation for the
Native File System API, and not everything in the spec (or explainer)
has been completed.

As of Chrome 78, the following functionality is not available, or
doesn't match the spec:

* Handles are not serializable, meaning they cannot be passed via
  `postMessage()`, or stored in IndexedDB.
* Non-atomic writes (i.e. calls to `FileSystemFileHandle.createWriter()`
  with `inPlace: true`).
* Writing to a file using a [`WritableStream`][writablestream].
* The [`FileSystemDirectoryHandle.resolve()`][fs-dir-handle] method.

## Security and permissions {: #security-considerations }

<style>
  figcaption {font-size: smaller;}
</style>

We’ve designed and implemented the Native File System API using the core
principles we defined in
[Controlling Access to Powerful Web Platform Features][powerful-apis],
including user control and transparency, and user ergonomics.

### Opening a file or saving a new file

<figure class="attempt-right">
  <a href="/web/updates/images/2019/08/fs-open.jpg">
    <img src="/web/updates/images/2019/08/fs-open.jpg">
  </a>
  <figcaption>
    A file picker used to open an existing file for reading.
  </figcaption>
</figure>

When opening a file, the user provides permission to read a file or
directory via the file picker. The open file picker can only be shown via
a user gesture when served from a [secure context][secure-contexts]. If
users change their minds, they can cancel the selection in the file
picker and the site does not get access to anything. This is the same
behavior as that of the `<input type="file">` element.

<div class="clearfix"></div>

<figure class="attempt-left">
  <a href="/web/updates/images/2019/08/fs-save.jpg">
    <img src="/web/updates/images/2019/08/fs-save.jpg">
  </a>
  <figcaption>
    A file picker used to save a file to disk.
  </figcaption>
</figure>

Similarly, when a web app wants to save a new file, the browser will show
the save file picker, allowing the user to specify the name and location
of the new file. Since they are saving a new file to the device (versus
overwriting an existing file), the file picker grants the app permission
to write to the file.

<div class="clearfix"></div>

#### Restricted folders

To help protect users and their data, the browser may limit the user’s
ability to  save to certain folders, for example, core operating system
folders like Windows, the macOS Library folders, etc. When this happens,
the browser will show a modal prompt and ask the user to choose a
different folder.

### Modifying an existing file or directory

A web app cannot modify a file on disk without getting explicit permission
from the user.

#### Permission prompt

<figure class="attempt-right">
  <a href="/web/updates/images/2019/08/fs-save-permission.jpg">
    <img src="/web/updates/images/2019/08/fs-save-permission-crop.jpg">
  </a>
  <figcaption>
    Prompt shown to users before the browser is granted write
    permission on an existing file.
  </figcaption>
</figure>

If a person wants to save changes to a file that they previously granted
read access to, the browser will show a modal permission prompt, requesting
permission for the site to write changes to disk. The permission request
can only be triggered by a user gesture, for example, by clicking a “Save”
button.

Alternatively, a web app that edits multiple files, like an IDE, can
also ask for permission to save changes at the time of opening.

If the user chooses *Cancel*, and does not grant write access, the web
app cannot save changes to the local file. It should provide an alternative
method to allow the user to save their data, for example by providing a way to
[“download” the file][download-file], saving data to the cloud, etc.

<div class="clearfix"></div>

### Transparency

<figure class="attempt-right">
  <a href="/web/updates/images/2019/08/fs-save-icon.jpg">
    <img src="/web/updates/images/2019/08/fs-save-icon.jpg">
  </a>
  <figcaption>
    Omnibox icon indicating the user has granted the website permission to
    save to a local file.
  </figcaption>
</figure>

Once a user has granted permission to a web app to save a local file,
Chrome will show an icon in the omnibox. Clicking on the omnibox icon
opens a popover showing the list of files the user has given access to.
The user can easily revoke that access if they choose.

<div class="clearfix"></div>

### Permission persistence

The web app can continue to save changes to the file without prompting as long
as the tab is open. Once a tab is closed, the site loses all access. The next
time the user uses the web app, they will be re-prompted for access to the
files. In the next few versions of Chrome, installed Progressive Web Apps (only)
will also be able to save the handle to IndexedDB and persist access to handles
across page reloads. In this case, an icon will be shown in the omnibox as long
as the app has write access to local files.

## Feedback {: #feedback }

We want to hear about your experiences with the Native File System API.

### Tell us about the API design {: .hide-from-toc }

Is there something about the API that doesn’t work like you expected? Or
are there missing methods or properties that you need to implement your
idea? Have a question or comment on the security model?

* File a spec issue on the [WICG Native File System GitHub repo][spec-issues],
  or add your thoughts to an existing issue.

### Problem with the implementation? {: .hide-from-toc }

Did you find a bug with Chrome's implementation? Or is the implementation
different from the spec?

* File a bug at [https://new.crbug.com][new-bug]. Be sure to include as
  much detail as you can, simple instructions for reproducing, and set
  *Components* to `Blink>Storage>FileSystem`. [Glitch](https://glitch.com)
  works great for sharing quick and easy repros.

### Planning to use the API? {: .hide-from-toc }

Planning to use the Native File System API on your site? Your public support
helps us to prioritize features, and shows other browser vendors how
critical it is to support them.

* Share how you plan to use it on the [WICG Discourse thread][wicg-discourse]
* Send a Tweet to [@ChromiumDev][cr-dev-twitter] with `#nativefs` and
  let us know where and how you’re using it.

## Helpful Links {: #helpful }

* [Public explainer][explainer]
* [Native File System specification][spec] & [File specification][file-api-spec]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* [Native File System API - Chromium Security Model][nfs-cr-sec-model]
* Blink Component: `Blink>Storage>FileSystem`

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/native-file-system/
[cr-bug]: https://crbug.com/853326
[cr-status]: https://www.chromestatus.com/feature/6284708426022912
[explainer]: https://github.com/WICG/native-file-system/blob/master/EXPLAINER.md
[spec-security]: https://wicg.github.io/native-file-system/#privacy-considerations
[new-bug]: https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EStorage%3EFileSystem
[nfs-cr-sec-model]: https://docs.google.com/document/d/1NJFd-EWdUlQ7wVzjqcgXewqC5nzv_qII4OvlDtK6SE8/edit
[wicg-discourse]: https://discourse.wicg.io/t/writable-file-api/1433
[file-api-spec]: https://w3c.github.io/FileAPI/
[choose-fs-entries]: https://wicg.github.io/native-file-system/#api-choosefilesystementries
[fs-writer]: https://wicg.github.io/native-file-system/#filesystemwriter
[blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[buffersource]: https://developer.mozilla.org/en-US/docs/Web/API/BufferSource
[fs-file-handle]: https://wicg.github.io/native-file-system/#api-filesystemfilehandle
[fs-dir-handle]: https://wicg.github.io/native-file-system/#api-filesystemdirectoryhandle
[powerful-apis]: https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md
[ot-guide]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[spec-issues]: https://github.com/wicg/native-file-system/issues/
[api-surface]: https://docs.google.com/document/d/11rcS0FdwM8w-s2esacEQxFfp3g2AAI9uD7drH8ARKPA/edit#
[secure-contexts]: https://w3c.github.io/webappsec-secure-contexts/
[writablestream]: https://streams.spec.whatwg.org/#ws-class
[text-editor]: https://googlechromelabs.github.io/text-editor/
[text-editor-source]: https://github.com/GoogleChromeLabs/text-editor/
[text-editor-fs-helper]: https://github.com/GoogleChromeLabs/text-editor/blob/master/src/inline-scripts/fs-helpers.js
[text-editor-app-js]: https://github.com/GoogleChromeLabs/text-editor/blob/master/src/inline-scripts/app.js
[download-file]: /web/updates/2011/08/Downloading-resources-in-HTML5-a-download
[cr-dev-twitter]: https://twitter.com/chromiumdev
