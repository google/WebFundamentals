project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 59.

{# wf_updated_on: 2017-04-19 #}
{# wf_published_on: 2017-04-12 #}
{# wf_tags: chrome59,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 59. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 59) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome to another installment of the DevTools release notes. Watch the video
below or read on to see what's new in Chrome DevTools in Chrome 59!

Note: You can check which version of Chrome you're running at `chrome://help`.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="4mx1m7UbBR0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

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

Clicking on a URL reveals that file in the **Sources** panel with a breakdown
of which lines of code executed.

<figure>
  <img src="/web/updates/images/2017/04/coverage-breakdown.png"
       alt="A breakdown of code coverage in the Sources panel"/>
  <figcaption>
    <b>Figure 2</b>. A breakdown of code coverage in the <b>Sources</b> panel
  </figcaption>
</figure>

Each line of code is color-coded:

* Solid green means that line of code executed.
* Solid red means it did not execute.
* A line of code that is both red and green, such as line 3 in **Figure 2**,
  means that only some code on that line executed. For example, a ternary
  expression like `var b = (a > 0) ? a : 0` is colored both red and green.

Note: The color-coding is likely to change in future Chrome releases.

To open the **Coverage** tab:

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
    <b>Figure 3</b>. Block Request URL
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

## Changes {: #changes }

### Unified Command Menu {: #command-menu }

When you open the [Command Menu][CM] now, notice that your command
is prepended with a greater-than character (`>`). This is because the Command
Menu has been unified with the **Open File** menu, which is
<kbd>Command</kbd>+<kbd>O</kbd> (Mac), or <kbd>Control</kbd>+<kbd>O</kbd>
(Windows, Linux).
