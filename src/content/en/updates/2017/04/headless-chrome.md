project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Getting started with Headless Chrome

{# wf_updated_on: 2017-05-01 #}
{# wf_published_on: 2017-04-27 #}

{# wf_tags: chrome59,headless,testing #}
{# wf_featured_image: /web/updates/images/generic/headless-chrome.png #}
{# wf_featured_snippet: Headless Chrome (shipping in Chrome 59) is a way to run the Chrome browser in a headless environment. It brings all modern web platform features provided by Chromium and the Blink rendering engine to the command line. #}

# Getting Started with Headless Chrome {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
</style>

### TL;DR {: #tldr .hide-from-toc}

[Headless Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)
is shipping in Chrome 59. It's a way to run the Chrome browser in a headless environment. Essentially, running
Chrome without chrome! It brings **all modern web platform features** provided
by Chromium and the Blink rendering engine to the command line.

Why is that useful?

A headless browser is a great tool for automated testing and server environments where you
don't need a visible UI shell. For example, you may want to run some tests against
a real web page, create a PDF of it, or just inspect how the browser renders an URL.

Caution: Headless mode is available on Mac and Linux in **Chrome 59**.
[Windows support](https://bugs.chromium.org/p/chromium/issues/detail?id=686608) is coming soon! To
check what version of Chrome you have, open `chrome://version`.

## Starting Headless (CLI) {: #cli }

The easiest way to get started with headless mode is to open the Chrome binary
from the command line. If you've got Chrome 59+ installed, start Chrome with the `--headless` flag:

    chrome \
      --headless \                   # Runs Chrome in headless mode.
      --disable-gpu \                # Temporarily needed for now.
      --remote-debugging-port=9222 \
      https://www.chromestatus.com   # URL to open. Defaults to about:blank.

Note: Right now, you'll also want to include the `--disable-gpu` flag.
That will eventually go away.

`chrome` should point to your installation of Chrome. The exact location will
vary from platform to platform. Since I'm on Mac, I created convenient aliases
for each version of Chrome that I have installed.

If you're on the stable channel of Chrome and cannot get the Beta, I recommend
using `chrome-canary`:

    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
    alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"

Download Chrome Canary [here](https://www.google.com/chrome/browser/canary.html).

## Command line features {: features }

In some cases, you may not need to [programmatically script](#node) Headless Chrome.
There are some [useful command line flags](https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc)
to perform common tasks.

### Printing the DOM {: dom }

The `--dump-dom` flag prints `document.body.innerHTML` to stdout:

    chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/

### Create a PDF {: dom }

The `--print-to-pdf` flag creates a PDF of the page:

    chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/

### Taking screenshots {: #screenshots }

To capture a screenshot of a page, use the `--screenshot` flag:

    chrome --headless --disable-gpu --screenshot https://www.chromestatus.com/

    # Size of a standard letterhead.
    chrome --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/

    # Nexus 5x
    chrome --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/

Running with `--screenshot` will produce a file named `screenshot.png` in the
current working directory. If you're looking for full page screenshots, things
are a tad more involved. There's a great blog
post from David Schnurr that has you covered. Check out [Using headless Chrome as an automated screenshot tool
](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a).


## Debugging Chrome without a browser UI? {: #frontend }

When you run Chrome with `--remote-debugging-port=9222`, it starts an instance
with the [DevTools Protocol][dtviewer] enabled. The
protocol is used to communicate with Chrome and drive the headless
browser instance. It's also what tools like Sublime, VS Code, and Node use for
remote debugging an application. #synergy

Since you don't have browser UI to see the page, navigate to `http://localhost:9222`
in another browser to check that everything is working. You'll see a list of
inspectable pages where you can click through and see what Headless is rendering:

<figure>
  <img src="/web/updates/images/2017/04/headless-chrome/remote-debugging-ui.png"
       class="screenshot" alt="DevTools Remote ">
  <figcaption>DevTools remote debugging UI</figcaption>
</figure>

From here, you can use the familiar DevTools features to inspect, debug, and tweak
the page as you normally would. If you're using Headless programmatically, this
page is also a powerful debugging tool for seeing all the raw DevTools protocol
commands going across the wire, communicating with the browser.

## Using programmatically (Node) {: #node }

### Launching Chrome {: #nodelaunch }

In the previous section, we [started Chrome manually](#cli) using `--headless --remote-debugging-port=9222`. However, to fully automate tests, you'll probably
want to spawn Chrome _from_ your application.

One way is to use `child_process`:

```javascript
const execFile = require('child_process').execFile;

function launchHeadlessChrome(url, callback) {
  // Assuming MacOSx.
  const CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
  execFile(CHROME, ['--headless', '--disable-gpu', '--remote-debugging-port=9222', url], callback);
}

launchHeadlessChrome('https://www.chromestatus.com', (err, stdout, stderr) => {
  ...
});
```

But things get tricky if you want a portable solution that works across multiple
platforms. Just look at that hard-coded path to Chrome :(

#### Using Lighthouse's ChromeLauncher {: #nodechromelauncher }

[Lighthouse](/web/tools/lighthouse/) is a marvelous
tool for testing the quality of your web apps. One thing people don't realize
is that it ships with some really nice helper modules for working with Chrome.
One of those modules is `ChromeLauncher`. `ChromeLauncher` will find where
Chrome is installed, set up a debug instance, launch the browser, and kill it
when your program is done. Best part is that it works cross-platform thanks to
Node!

Note: The Lighthouse team is exploring a standalone package for `ChromeLauncher` with
an improved API. Let us know if you have [feedback](https://github.com/GoogleChrome/lighthouse/issues/2092).

By default, **`ChromeLauncher` will try to launch Chrome Canary** (if it's
installed), but you can change that to manually select which Chrome to use. To
use it, first install Lighthouse from npm:

    yarn add lighthouse

**Example** - using `ChromeLauncher` to launch Headless

```javascript
const {ChromeLauncher} = require('lighthouse/lighthouse-cli/chrome-launcher');

/**
 * Launches a debugging instance of Chrome on port 9222.
 * @param {boolean=} headless True (default) to launch Chrome in headless mode.
 *     Set to false to launch Chrome normally.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
  const launcher = new ChromeLauncher({
    port: 9222,
    autoSelectChrome: true, // False to manually select which Chrome install.
    additionalFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });

  return launcher.run().then(() => launcher)
    .catch(err => {
      return launcher.kill().then(() => { // Kill Chrome if there's an error.
        throw err;
      }, console.error);
    });
}

launchChrome(true).then(launcher => {
  ...
});
```

Running this script doesn't do much, but you should see an instance of
Chrome fire up in the task manager that loaded `about:blank`. Remember, there
won't be any browser UI. We're headless.

To control the browser, we need the DevTools protocol!

### Retrieving information about the page {: #useprotocol }

[chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface)
is a great Node package that provides usable APIs for the
[DevTools Protocol][dtviewer]. You can use it to orchestrate Headless
Chrome, navigate to pages, and fetch information about those pages.

Warning: The DevTools protocol can do a ton of interesting stuff, but it can be a bit
daunting at first. I recommend spending a bit of time browsing the [DevTools Protocol Viewer][dtviewer], first. Then, move on to the `chrome-remote-interface` API docs to
see how it wraps the raw protocol.

Let's install the library:

    yarn add chrome-remote-interface

#### Examples

**Example** - print the user agent

```javascript
launchChrome().then(launcher => {
  chrome.Version().then(version => console.log(version['User-Agent']));
});
```

Results in something like: `HeadlessChrome/60.0.3082.0`

**Example** - check if the site has a [web app manifest](/web/fundamentals/engage-and-retain/web-app-manifest/)

```javascript
const chrome = require('chrome-remote-interface');

function onPageLoad(Page) {
  return Page.getAppManifest().then(response => {
    if (!response.url) {
      console.log('Site has no app manifest');
      return;
    }
    console.log('Manifest: ' + response.url);
    console.log(response.data);
  });
}

launchChrome().then(launcher => {

  chrome(protocol => {
    // Extract the parts of the DevTools protocol we need for the task.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const {Page} = protocol;

    // First, enable the Page domain we're going to use.
     Page.enable().then(() => {
      Page.navigate({url: 'https://www.chromestatus.com/'});

      // Wait for window.onload before doing stuff.
      Page.loadEventFired(() => {
        onPageLoad(Page).then(() => {
          protocol.close();
          launcher.kill(); // Kill Chrome.
        });
      });
    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });

});
```

**Example** - extract the `<title>` of the page using DOM APIs.

```javascript
const chrome = require('chrome-remote-interface');

function onPageLoad(Runtime) {
  const js = "document.querySelector('title').textContent";

  // Evaluate the JS expression in the page.
  return Runtime.evaluate({expression: js}).then(result => {
    console.log('Title of page: ' + result.result.value);
  });
}

launchChrome().then(launcher => {

  chrome(protocol => {
    // Extract the parts of the DevTools protocol we need for the task.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const {Page, Runtime} = protocol;

    // First, need to enable the domains we're going to use.
    Promise.all([
      Page.enable(),
      Runtime.enable()
    ]).then(() => {
      Page.navigate({url: 'https://www.chromestatus.com/'});

      // Wait for window.onload before doing stuff.
      Page.loadEventFired(() => {
        onPageLoad(Runtime).then(() => {
          protocol.close();
          launcher.kill(); // Kill Chrome.
        });
      });

    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });

});
```

## Further resources

Here are some useful resources to get you started:

Docs

* [DevTools Protocol Viewer][dtviewer] - API reference docs

Tools

* [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) - node module that wraps the DevTools protocol
* [Lighthouse](https://github.com/GoogleChrome/lighthouse) - automated tool for testing the quality of web apps

Demos

* "[The Headless Web](https://paul.kinlan.me/the-headless-web/)"  - Paul Kinlan's great blog post on using Headless with api.ai.

## FAQ

**Do I need the `--disable-gpu` flag?**

Yes, for now.  The `--disable-gpu` flag is a temporary requirement to work around a few bugs. You won't need this
flag in future versions of Chrome. See [https://crbug.com/546953#c152](https://bugs.chromium.org/p/chromium/issues/detail?id=546953#c152) and [https://crbug.com/695212](https://bugs.chromium.org/p/chromium/issues/detail?id=695212) for more information.

**So I still need Xvfb?**

No. Headless Chrome doesn't use a window so a display server like Xvfb is
no longer needed. You can happily run your automated tests without it.

What is Xvfb? Xvfb is an in-memory display server for Unix-like systems that enables you
to run graphical applications (like Chrome) without an attached physical display.
Many people use Xvfb to run earlier versions of Chrome to do "headless" testing.

**How do I create a Docker container that runs Headless Chrome?**

Check out [lighthouse-ci](https://github.com/ebidel/lighthouse-ci). It has an
[example Dockerfile](https://github.com/ebidel/lighthouse-ci/blob/master/builder/Dockerfile)
that uses Ubuntu as a base image, and installs + runs Lighthouse in an App Engine
Flexible container.

**Can I use this with Selenium / WebDriver / ChromeDriver**?

Right now, Selenium opens a full instance of Chrome. In other words, it's an
automated solution but not completely headless. However, Selenium could use
`--headless` in the future.

If you want to bleed on the edge, I recommend [Running Selenium with Headless Chrome](https://intoli.com/blog/running-selenium-with-headless-chrome/) to set things up
yourself.

Note: you may encounter bugs using [ChromeDriver](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver).
At the time of writing, the latest release (2.29) only supports Chrome 58.
Headless Chrome requires Chrome 59 or later.

**How is this related to PhantomJS?**

Headless Chrome is similar to tools like [PhantomJS](http://phantomjs.org/). Both
can be used for automated testing in a headless environment. The main difference
between the two is that Phantom uses an older version of WebKit as its rendering
engine while Headless Chrome uses the latest version of Blink.

At the moment, Phantom also provides a higher level API than the [DevTools Protocol][dtviewer].

**Where do I report bugs?**

For bugs against Headless Chrome, file them on [crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink&blocking=705916&cc=skyostil%40chromium.org&Proj=Headless).

For bugs in the DevTools protocol, file them at [github.com/ChromeDevTools/devtools-protocol](https://github.com/ChromeDevTools/devtools-protocol/issues/new).

<br>

{% include "comment-widget.html" %}

[dtviewer]: https://chromedevtools.github.io/devtools-protocol/
