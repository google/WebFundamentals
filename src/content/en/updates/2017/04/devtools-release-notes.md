project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 59.

{# wf_updated_on: 2017-04-12 #}
{# wf_published_on: 2017-04-12 #}
{# wf_tags: chrome59,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 59. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 59) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome to another installment of the DevTools release notes. Here's what's
new for Chrome 59.

Note: You can check which version of Chrome you're running at `chrome://help`.

## Highlights {: #highlights }

* [**CSS and JS code coverage**](#coverage). Find unused CSS and JS with
  the new Coverage tab.
* [**Full-page screenshots**](#screenshots). Take a screenshot of the
  entire page, from the top of the viewport to the bottom.
* [**Block requests**](#block-requests). Manually disable individual
  requests in the Network panel.
* [**Step over async await**](#async). Step through async functions predictably.
* [**Unified Command Menu**](#command-menu). Execute commands and open files
  from the newly-unified Command Menu.
* [**Workspaces 2.0**](#workspaces). Check out the new UX for using DevTools
  as your code editor.

## New features {: #new-features }

### CSS and JS code coverage {: #coverage }

Find unused CSS and JS code with the new **Coverage** tab. When you load or
run a page, the tab tells you how much code was used, versus how much was
loaded. You can reduce the size of your pages by only shipping the code
that you need.

<figure>
  <img src="/web/updates/images/2017/04/coverage.png"
       alt="The Coverage tab"/>
  <figcaption>
    <b>Figure 1</b>. The Coverage tab
  </figcaption>
</figure>

To open the tab:

1. Open the [Command Menu][CM].
1. Start typing `Coverage` and select **Show Coverage**.

[CM]: /web/tools/chrome-devtools/ui#command-menu

### Full-page screenshots {: #screenshots }

Check out the video below to learn how to take a screenshot from the top
of the page, all the way to the bottom.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="r_6_9eFPhxI"
      data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### Block requests {: #block-requests }

Want to see how your page behaves when a particular script, stylesheet, or
other resource isn't available? Right-click on the request in the **Network**
panel and select **Block Request URL**. A new **Request blocking** tab
pops up in the Drawer, which lets you manage blocked requests.

<figure>
  <img src="/web/updates/images/2017/04/block-request-url.png"
       alt="Block Request URL"/>
  <figcaption>
    <b>Figure 2</b>. Block Request URL
  </figcaption>
</figure>

### Step over async await {: #async }

Up until now, trying to step through code like the snippet below was a
headache. You'd be in the middle of `test()`, stepping over a line, and then
you'd get interrupted by the `setInterval()` code. Now, when you step through
async code like `test()`, DevTools steps from the first to last line with
consistency.

    function wait(ms) {
      return new Promise(r => setTimeout(r, ms)).then(() => "Yay");
    }
    
    // do some work in background.
    setInterval(() => 42, 200);
    
    async function test() {
      debugger;
      const hello = "world";
      const response = await fetch('index.html');
      const tmp = await wait(1000);
      console.log(tmp);
      return hello;
    }
    
    async function runTest() {
      let result = await test();
      console.log(result);
    }

P.S. want to level up your debugging skills? Check out these new-ish docs:

* [Get Started With Debugging JS](/web/tools/chrome-devtools/javascript/)
* [Pause Your Code With Breakpoints][breakpoints]
* [JS Debugging Reference](/web/tools/chrome-devtools/javascript/reference)

[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

### Workspaces 2.0 {: #workspaces }

The new UX for using DevTools as your code editor, also known as Workspaces
or Persistence, has been released from Experiments.

1. Go to the **Sources** panel.
1. Click the **Filesystem** tab.
1. Click **Add folder to workspace**.
1. Select the folder in your filesystem containing your source code.
1. Click **Allow** to grant DevTools read and write access to the folder.

DevTools automagically maps the files in your filesystem to the files being
served from the network. No more need to manually map one to the other.

<figure>
  <img src="/web/updates/images/2017/04/workspaces2.png"
       alt="A network file mapped to the filesystem"/>
  <figcaption>
    <b>Figure 3</b>. The green dot next to <code>(index)</code> means
    that it's been mapped to a filesystem resource
  </figcaption>
</figure>

## Changes {: #changes }

### Unified Command Menu {: #command-menu }

When you open the [Command Menu][CM] now, notice that your command
is prepended with a greater-than character (`>`). This is because the Command
Menu has been unified with the **Open File** menu, which is
<kbd>Command</kbd>+<kbd>O</kbd> (Mac), or <kbd>Control</kbd>+<kbd>O</kbd>
(Windows, Linux).
