project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_published_on: 2018-11-12 #}
{# wf_updated_on: 2019-03-07 #}
{# wf_featured_image: /web/updates/images/generic/file.png #}
{# wf_tags: writable-files,capabilities,file,filesystem #}
{# wf_featured_snippet: The writable files API is being designed to increase interoperability of web applications with native applications, making it possible for users to choose files or directories that a web app can interact with on the native file system. #}
{# wf_blink_components: Blink>Storage>FileSystem #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# The Writable Files API: Simplifying local file access {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

{% include "web/updates/_shared/capabilities.html" %}

## What is the Writable Files API {: #explainer }

Today, if a user wants to edit a local file in a web app, the web app needs
to ask the user to open the file. Then, after editing the file, the only way
to save changes is by downloading the file to the Downloads folder, or having
to replace the original file by navigating the directory structure to find the
original folder and file. This user experience leaves a lot to be desired, and
makes it hard to build web apps that access user files.

The writable files API is designed to increase interoperability of web
applications with native applications, making it possible for users to choose
files or directories that a web app can interact with on the native file
system, and without having to use a native wrapper like Electron to ship your
web app.

With the Writable Files API, you could create a simple, single file editor
that opens a file, allows the user to edit it, and save the changes back to
the same file. Or a multi-file editor like an IDE or CAD style application
where the user opens a project containing multiple files, usually together in
the same directory. And there are plenty more.

Note: Want to see how this might be implemented? Check the explainer for
some [sample code](https://github.com/WICG/writable-files/blob/master/EXPLAINER.md#example-code).

[Read explainer][explainer]{: .button .button-primary }

## Security considerations

The primary entry point for this API is a
file picker, which ensures that the user is always in full control over
what files and directories a website has access to. Every access to a
user selected file (either reading or writing) is done through an
asynchronous API, allowing the browser to potentially include additional
prompting and/or permission checks.

The Writable Files API provides web developers with significant access
to user data and has potential to be abused. There are both privacy
risks, for example websites getting access to private data they weren’t
supposed to have access to, as well as security risks, for example
websites able to modify executables, encrypt user data, and so forth.
The Writable Files API must be designed in such a way as to limit how
much damage a website can do, and make sure that the user understands
what they’re giving the site access to.

<aside class="key-point">
  <b>We need your help</b> - we’re at the design phase for the Writable Files
  API. We are investigating how the permission model should work, and
  what restrictions should be placed on the API. Check out the
  <a href="https://github.com/WICG/writable-files/blob/master/EXPLAINER.md#proposed-security-models">
  proposed security model</a>, then <a href="#feedback">let us know</a> about
  your use cases. We will use your input to make sure what is spec’ed and
  built, meets your needs.
</aside>

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [In progress][spec]          |
| **3. Gather feedback & iterate on design** | [**In progress**](#feedback) |
| 4. Origin trial                            | Not started                  |
| 5. Launch                                  | Not started                  |

## Feedback {: #feedback }

We need your help to design the Writable Files API in a way that will be
useful in a way that is both secure and protects user privacy.

* Have an idea for a use case or an idea where you'd use it?
* Are there types of files or directories you don’t expect to have access to?
* Do you plan to use this?
* Like it, and want to show your support?

Share your thoughts on the [Writable Files WICG Discourse][wicg-discourse]
discussion.

{% include "web/_shared/helpful.html" %}

## Helpful Links

* [Public explainer][explainer]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `Blink>Storage>FileSystem`

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/writable-files/
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=853326
[cr-status]: https://www.chromestatus.com/features/6284708426022912
[explainer]: https://github.com/WICG/writable-files/blob/master/EXPLAINER.md
[wicg-discourse]: https://discourse.wicg.io/t/writable-file-api/1433
