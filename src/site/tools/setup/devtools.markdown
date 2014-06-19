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
key-takeaways:
  devtools:
    - Make the command line work for you; create aliases that are easy to remember and fast to type.
    - Don't check responsive layouts manually; get a tool to resize and capture screen views.
    - Set up build tools that automatically optimize, build, and live reload your testing url.
    - Don't wait to see your site on a device; use device emulation and remote debugging now not later. 
notes:
  alias:
    - Check out this list of <a href="http://tjholowaychuk.tumblr.com/post/26904939933/git-extras-introduction-screencast"> Git aliases</a>.
  grunt:
    - Chris Coyier's <a href="http://24ways.org/2013/grunt-is-not-weird-and-hard/">Grunt for People Who Think Things Like Grunt are Weird and Hard</a> blog post is good beginner's resource to web build tools.
  windows:
    - See these <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx">instructions for setting up Windows aliases</a>.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.devtools %}

{% include modules/toc.liquid %}

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

<img src="imgs/url.png" class="center" alt="lots of devices open to same url">

## Set up aliases for common commands

You need to save as much time as you can
for the extra effort it takes to test across devices.
If you are still looking at a list of command shortcuts every time
you make your way into the terminal and/or
you are manually typing the same long commands,
it's time to create some short-cuts.

### How to create command-line short-cuts

The easiest way create command-line short-cuts is to
add aliases for common commands to your `bashrc` file.
On Mac or Linux:

* From the command line anywhere, type `vim ~/.bashrc`.
* Add a new alias, for example, `master = 'git checkout master'`.
* From your source directory, run `master`.

Another slightly more advanced way to create short-cuts is
to <a href="http://dotfiles.github.io/">store dotfiles in GitHub</a>.
One major gain: your short-cuts won't be device dependent.

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
      <td data-th="alias">alias server = "python -m SimpleHTTPServer"</td>
    </tr>
    <tr>
      <td data-th="command">Fire up your editor</td>
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

* <a href="https://chrome.google.com/webstore/detail/responsive-inspector/memcdolmmnmnleeiodllgpibdjlkbpim?hl=en">Download</a> the extension from the Chrome Web Store.
* On any opened site,
press the Responsive Inspect icon in the extension tool bar.
* Resize screen and take a screen shot.

To test on the Firefox browser, enable the <a href="https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View">Responsive Design View</a>.
Use this view to change the size of content area without having
to resize the entire browser window.

## Set up build and live reloading tools

Build tools streamline the process of transferring source files to a target result.
You want build tools that keep track of your site's performance;
they optimize source files automatically and measure your site's performance.
We recommend <a href="http://gulpjs.com/">Gulp</a>.
Other examples include:
<a href="http://gruntjs.com/">Grunt</a>, 
<a href="https://github.com/broccolijs/broccoli">Broccoli</a>,
<a href="http://www.gnu.org/software/make/">Make</a>.

You also want live reloading tools that let you navigate to the same URL
on different devices.
Live reloading tools apply source file changes
(CSS, HTML, JavaScript, image changes)
to your site live,
no reloading required, compilers, templating just works.
Scrolling, clicks, and navigation are synchronized.

Examples:

* <a href="http://vanamco.com/ghostlab/">Ghostlab (commercial)</a>
* <a href="http://livereload.com/">LiveReload (commercial)</a>
* <a href="http://html.adobe.com/edge/inspect/">Adobe Edge Inspect</a>
* <a href="http://livestyle.emmet.io/install/">Emmet LiveStyle</a>

The Web Starter Kit does it all:
watches for changes, optmizes files, builds your site,
and reloads the browser live.
Follow the instructions in the
[next guide]({{site.baseurl}}/tools/setup/setup_kit.html)
to set up the Web Starter Kit.

{% include modules/remember.liquid title="Note" inline=true list=page.notes.grunt %}

## Set up emulation and debugging tools

Don't put off debugging your site across multiple projects.
A very simple first step is to set up a device emulation
that integrates with debugging tools.

Using device emulation,
you can project your site on any screen size,
debug the code,
and the changes are automatically visible.
Chrome DevTools has device emulation built in;
learn how to use
[DevTools emulation]({{site.baseurl}}/tools/test/emulator.html).

Emulation is a good start, but it's no substitute for the real thing.
Eventually, preferably as soon as possible,
you must debug your site on actual devices.
Remote debugging tools let you debug your site on a desktop
and see changes on remote devices.

Here's a brief comparison of remote debugging options,
with links to set-up documentation: 

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
      <td data-th="Description">Remote debugger for web pages. Debugging tools work on Chrome and Safari browsers. Test web pages on Android Browser, iOS Mobile Safari application, and PhoneGap/Cordova.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android">Firefox for Android + ADB</td>
      <td data-th="Description">Inspect or debug code running in Firefox for Android over USB.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html#//apple_ref/doc/uid/TP40007874-CH2-SW1">Safari Web Inspector - Safari on iOS</a></td>
      <td data-th="Description">Debug web content on iOS device directly from your desktop.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
