---
layout: article
title: "Set Up Web Starter Kit"
description: "Follow this guide to set up the Web Starter Kit. Simply pick a layout and start coding. For help building a responsive and performant site, set up the build tools."
introduction: "Follow this guide to set up the Web Starter Kit. Simply pick a layout and start coding. For help building a responsive and performant site, set up the build tools."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
collection: set-up
key-takeaways:
  starter-kit:
    - Decide how much UX to inherit from the Web Starter Kit. Do you want a responsive layout or a basic boilerplate?
    - The Web Starter Kit tools are optional, but if you don't have a set of build tools, use them.
    - Once you've successfully set up the build tools, the site automatically loads in the browser.
notes:
  command-line:
    - Most of your interactions with the Web Starter Kit will be through the command line. Run commands in the Terminal app if you’re on Mac, your shell in Linux, or <a href="http://www.cygwin.com/">Cygwin if you are on Windows</a>.
  next:
    - Now that you've set up the Web Starter Kit, try [building a site]({{site.baseurl}}/tools/build/build_site.html).
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Clone repository

To use the Web Starter Kit,
simply clone the repository and
build on what's included in the `app` directory:

`git clone https://github.com/google/web-starter-kit.git`

`$ cd web-starter-kit/app`

## Install tooling

If you're using the Web Starter Kit tools,
make sure your system has [Node](http://nodejs.org),
[Ruby](https://www.ruby-lang.org/), [Gulp](http://gulpjs.com),
and the [Sass gem](http://sass-lang.com/install) installed.

{% include modules/remember.liquid title="Note" list=page.notes.command-line %}

### Node

Check if you already have Node installed.
Bring up a terminal and type `node -v`.
If Node responds, and if it shows a version at or above v0.10.x,
proceed to checking if you have Ruby installed too.
If you require Node,
go to [NodeJS.org](http://nodejs.org/) and click on the big green Install button.

### Ruby

Bring up a terminal and type `ruby -v`.
If Ruby responds,
and if it shows a version number at or above 1.8.7,
then type `gem --version`.
If you don't see any errors, proceed to installing the Sass gem.
If you require Ruby,
it can be installed from the
[Ruby downloads](https://www.ruby-lang.org/en/downloads/) page.

### Sass gem

Bring up a terminal and type `sass -v`.
If Sass is installed, it should return a version number at or above 3.3.x.
If you don't see any errors, proceed to the Gulp installation.
If you need to install Sass, see the command-line instructions on the
[Sass installation](http://sass-lang.com/install) page.

### Gulp

Bring up a terminal and type `gulp -v`.
If Gulp is installed it should return a version number at or above 3.5.x.
If you don't see any errors, proceed to the Gulp commands section.
If you need to install Gulp, open up a terminal and type in the following:

`$ sudo npm install --global gulp`

This will install Gulp globally.
Next, install the local dependencies Web Starter Kit requires:

`$ cd web-starter-kit`
`$ sudo npm install`

That's it!
You should now have everything needed to use the Gulp tools in Web Starter Kit.

## Pick a layout

Pick one of these layouts in the `web-starter-kit/app` folder
that most fits your needs:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="starterfile">Starter File</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="starterfile"><a href="https://github.com/google/web-starter-kit/blob/master/app/index.html">index.html</a></td>
      <td data-th="Description">Default starting point. Includes a slide-out menu.</td>
    </tr>
    <tr>
      <td data-th="starterfile"><a href="https://github.com/google/web-starter-kit/blob/master/app/basic.html">basic.html</a></td>
      <td data-th="Description">Very basic starting point. No navigation. Simple, but responsive styles. To choose this as your starting point, remove the alternative starter files.</td>
    </tr>
  </tbody>
</table>

## Build the project

In `web-starter-kit/app`, run the `gulp` tool to build the current project.
The first time you run this tool,
it creates the project directory: `web-starter-kit/dist`.

## Review the build output

Here's a snapshot of the project files in the `web-starter-kit/dist` directory:

<img src="imgs/structure.png" class="center" alt="project files in dist directory">

## Stage the build output

From the `web-starter-kit` folder,
run the `gulp serve` tool to open up a local staged version of the project
(for more information on this tool,
see [Track code changes and optimize]({{site.baseurl}}/tools/build/build_site.html#track-code-changes-and-optimize)).
The tool opens up the build version of your starter file, `index.html`.

Collapsed and expanded views on desktop:

<img src="imgs/desktop.png" class="center" alt="default and collapsed view on desktop">

Default and expanded menu views on mobile:

<img src="imgs/nexus.png" class="center" alt="default and expanded menu view on mobile">

## Open emulation tool

Once your site is running in a browser,
open the
<a href="https://developer.chrome.com/devtools/docs/mobile-emulation">Chrome DevTools emulation panel</a>,
select a mobile device, and emulate:

<img src="imgs/emulate.png" class="center" alt="index.html in emulation pane">

## What's Next?

Now that you've set up the Web Starter Kit, try [building a site]({{site.baseurl}}/tools/build/build_site.html).

{% include modules/nextarticle.liquid %}

{% endwrap %}
