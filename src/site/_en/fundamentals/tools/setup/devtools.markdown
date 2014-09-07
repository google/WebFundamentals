---
layout: article
title: "Set Up Developer Tools"
description: "Learn how to set up essential tools for the multi-device development workflow. Your tools should test your site's responsiveness and performance with minimum manual effort."
introduction: "Learn how to set up essential tools for the multi-device development workflow. Your tools should test your site's responsiveness and performance with minimum manual effort."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: set-up
authors:
  - megginkearney
key-takeaways:
  devtools:
    - Make the command line work for you; create aliases that are easy to remember and fast to type.
    - Don't check responsive layouts manually; get a tool to resize and capture screen views.
    - Set up build tools that automatically optimize, build, and live reload your testing URL.
    - Don't wait to see your site on a device; use device emulation and remote debugging now not later.
notes:
  alias:
    - Check out this list of <a href="http://tjholowaychuk.tumblr.com/post/26904939933/git-extras-introduction-screencast"> Git aliases</a>.
  windows:
    - See these <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx">instructions for setting up Windows aliases</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devtools %}

## Tools you need and why

There's no shortage of options when it comes to tools in the web development world.
There's often so much choice, it's daunting.
You find the simplest path to building a great site and
stick with it as long as it's working for you.

But if you want your site to work on small devices
with unreliable network connectivity,
you must invest the time and effort it takes
to learn how to use build tools that will optimize performance
and check your site's responsiveness across devices.

Tools for testing across devices include a combination of actual devices,
device emulation, and device debugging tools.
It's kind of scary, the thought of testing your site on any number of devices.
But you need to do this and you need the tools to make this possible:

<img src="imgs/url.png" class="center" alt="lots of devices open to same URL">

## Set up aliases for common commands

You need to save as much time as you can
for the extra effort it takes to test across devices.
If you are still looking at a list of command shortcuts every time
you make your way into the terminal and/or
you are manually typing the same long commands,
it's time to create some shortcuts.

### How to create command-line shortcuts

One simple way to create command-line shortcuts is to
add aliases for common commands to your `bashrc` file.
On Mac or Linux:

1. From the command line anywhere, type `open -a 'Sublime Text' ~/.bashrc`.
2. Add a new alias, for example, `alias master='git checkout master'`.
3. From your source directory, run `master`.

Another slightly more advanced way to create shortcuts is
to <a href="http://dotfiles.github.io/">store dotfiles in GitHub</a>.
One major gain: your shortcuts won't be device dependent.

{% include modules/remember.liquid title="Note" inline=true list=page.notes.windows %}

### List of common aliases

You don't have to, but we recommend aliases for these common commands:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="command">Command</th>
      <th data-th="alias">Alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="command">Launch a server</td>
      <td data-th="alias">alias server="python -m SimpleHTTPServer"</td>
    </tr>
    <tr>
      <td data-th="command">Open your editor</td>
      <td data-th="alias">alias st='open -a "Sublime Text"'</td>
    </tr>
    <tr>
      <td data-th="command">Go to a directory you commonly work in
</td>
      <td data-th="alias">alias p="cd ~/projects"</td>
    </tr>
  </tbody>
</table>

##Set up responsive tools

Checking your site's responsiveness needn't be a manual task.
Get at least one tool to resize the browser,
and preferably one with image capturing
so that you can compare multiple views.

For Chrome,
the <a href="http://outof.me/responsive-inspector-beta-released/">Responsive Inspect Chrome extension</a>
visually shows the media queries of an opened site,
including the `min-width` and `max-width`
of each media query specified in CSS stylesheets.
Use this tool to resize the site in the browser
and take a screenshot:

<img src="imgs/inspector.png" class="center" alt="Responsive Inspector Chrome extension">

To set up and use the extension:

1. <a href="https://chrome.google.com/webstore/detail/responsive-inspector/memcdolmmnmnleeiodllgpibdjlkbpim?hl=en">Download</a> the extension from the Chrome Web Store.
2. On any opened site,
press the Responsive Inspect icon in the extension toolbar.
3. Resize the screen and take a screen shot.

To test on the Firefox browser, enable the <a href="https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View">Responsive Design View</a>.
Use this view to change the size of the content area without having
to resize the entire browser window.

## Set up build and live reloading tools

Build tools streamline the process of transferring source files to a target result.
You want build tools that keep track of your site's performance;
that optimize source files automatically and measure your site's performance.
We recommend <a href="http://gulpjs.com/">Gulp</a>.
Other examples include:
<a href="http://gruntjs.com/">Grunt</a>,
<a href="https://github.com/broccolijs/broccoli">Broccoli</a>,
<a href="http://www.gnu.org/software/make/">Make</a>.

You also want live reloading which will automatically update the page with any
changes you make to your HTML, CSS, Javascript and images. No more manual
refreshing of the page after every tweak.

Examples:

* <a href="http://vanamco.com/ghostlab/">Ghostlab (commercial)</a>
* <a href="http://livereload.com/">LiveReload (commercial)</a>
* <a href="http://html.adobe.com/edge/inspect/">Adobe Edge Inspect</a>
* <a href="http://livestyle.emmet.io/install/">Emmet LiveStyle</a>

The Web Starter Kit does all this and more while watching for changes:

* Optimizes files and builds your site.
* Reloads the browser upon file changes.
* Synchronizes scrolling, clicks, and navigation across all your devices.

Follow the instructions in the [next guide]({{site.fundamentals}}/tools/setup/setup_kit.html) to set up the Web Starter Kit.

## Set up emulation and debugging tools

Don't put off debugging your site across multiple devices. A simple
first step is to set up device emulation that integrates with debugging
tools.

You can see how your site works across a range of devices using device emulators, such as:

* [iOS Safari Simulator](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html)
* [GenyMotion](http://www.genymotion.com/)
* [Official Android
Emulator](http://developer.android.com/tools/devices/emulator.html) for
Android devices.
* [Modern.ie](https://modern.ie/) for versions of IE.

Chrome DevTools has a device emulation feature built in which mimics some
device characteristics such as screen size, screen density and touch support; learn
how to use [DevTools emulation]({{site.fundamentals}}/tools/test/emulator.html).

Emulation is a good start, but it's no substitute for the real thing.
As soon as your are able to, you should debug your site on actual
devices. Remote debugging tools let you debug your site on a desktop and see
changes on remote devices.

Here's a brief comparison of remote debugging options, with links to set-up
documentation:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="tool">Remote Debugging Tool</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="tool"><a href="https://developer.chrome.com/devtools/docs/remote-debugging">Chrome DevTools Remote Debugging</td>
      <td data-th="Description">Use Chrome DevTools on your development machine to inspect, debug, and analyze browser tabs and WebViews on your Android device.
    </tr>
    <tr>
      <td data-th="tool"><a href="http://people.apache.org/~pmuellr/weinre/docs/latest/Installing.html">Weinre</a></td>
      <td data-th="Description">Remote debugger for web pages. This is helpful when there are no remote debug tools available for a browser, for example the Android Browser on older devices (pre-KitKat).</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android">Firefox for Android + ADB</td>
      <td data-th="Description">Inspect or debug code running in Firefox for Android over USB.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html#//apple_ref/doc/uid/TP40007874-CH2-SW1">Safari Web Inspector - Safari on iOS</a></td>
      <td data-th="Description">Debug web content on an iOS device directly from your desktop.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
