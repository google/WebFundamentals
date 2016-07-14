---
layout: shared/narrow
title: "Development phases"
description: "Every developer will go through various phases during the development of a project. Web Starter Kit makes you more productive and simplifies a range of tasks for each phase."
published_on: 2014-04-17
updated_on: 2015-10-06
translation_priority: 1
authors:
  - mattgaunt
---

<p class="intro">
During development, there are three commands that you'll use regularly: `gulp serve`, `gulp`, and `gulp serve:dist`. Let’s look at how each one contributes to the development process.</p>

{% include shared/toc.liquid %}

## Start a Local Server

The first task we’ll look at is: `$ gulp serve`.

On the surface, this task starts a local HTTP server so you can view your site
in a browser, but behind the scenes there are some extra tools at work.

### Live Reload

Live reload eliminates the traditional refresh dance of making a change in the
editor, switching to the browser, hitting CTRL-R, and then waiting for the page
to reload.

With Live Reload, you can make changes in your editor and see them take effect
immediately in any browser with your site open.

{% ytvideo JE-ejS8N3YI %}

### Testing Across Devices

Browser Sync helps you test your site across multiple devices. Any scrolls,
taps, or keyboard presses will be shared across any connected browser.

{% ytvideo RKKBIs_3svM %}

This only works when you run your site with `gulp serve`. Try it out by running
`gulp serve`, open the URL in two browser windows side by side and scroll
one of the pages.

### Automate Prefixing

When targeting a range of browsers, you’ll need to use vendor prefixes to
ensure you can use features in each of them. Web Starter Kit automates all of
the prefixing for you.

Our example CSS (below) doesn’t include any vendor prefixes:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

The build process runs the CSS through the autoprefixer which produces the
final output below:

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

### Check Your Javascript

JSHint is a tool which scans your JavaScript code to check for possible problems
with your JavaScript logic and [enforces coding best practices](http://www.jshint.com/docs/).

The tool runs whenever you build the project or, if you are running gulp server,
whenever you make a change to a JavaScript file.

### Compile Your Sass

While you are running the serve command, any changes made to any of the Sass
files in your project will get compiled into CSS and prefixed, after which your
page will be reloaded with Live Reload.

For those new to Sass, the project describes itself as a “CSS
extension language”. Essentially it’s CSS with some extra features. For example,
it adds support for variables and functions, which help you structure your CSS
in a modular and reusable fashion.

## Build a Production Version of Your Site

You can build a production ready version of your site with the simple `gulp`
command. This command runs some of the tasks we’ve seen already, with additional
tasks aimed at making your site load faster and more efficiently.

The main tasks the production build performs are:

### Build Styles

First the build will compile the Sass in your project. After the Sass has been
compiled, the Autoprefixer runs over all the CSS.

### Check your JavaScript for problems

The second build step runs JSHint over your JavaScript.

### Build the HTML Pages

The next step examines your HTML files, looking for build blocks to concatenate
and minify JavaScript. After the JavaScript is taken care of, the build process
minifies the HTML page.

Minification reduces the number of characters in the final JavaScript file by
removing comments or space characters that aren’t actually needed, as well as
some other techniques. This reduces the final file size, speeding up your
site’s load time.

Concatenation means pasting the contents of multiple files into one. The reason
we do this is so that the browser only has to make one request to a server
rather than many, which is faster for your users.

A build block has everything needed to manage which JavaScript files we minify
and concatenate together. Let’s look at a sample build block:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

A build block is nothing more than a specially formatted comment.
All of your javascript files between the build block will be merged
(concatenated) and minified into one file named main.min.js and
the the final build will replace these scripts with the script tag:

    <script src="scripts/main.min.js"></script>

### Optimize any image assets

For JPEGs and PNGs, the meta data in the image is stripped out; it isn’t needed
to render the image. The meta data includes information such as the camera used
to take the photo.

For SVGs, it’ll remove any attributes which aren’t needed or any whitespace and
comments that exist.

### Copy Fonts

This simple task copies our fonts from the app to the the final build directory.

### Copy over Any Files from the Root Directory

If the build finds any files in the root directory of the project, it will copy
them over into the final build as well.

## Test Your Production Build

Before you push anything into production, you need to make sure everything works
as you'd expect. The `gulp serve:dist` command builds a production version of your site,
starts a server, and opens a browser for you. This **doesn’t have Live Reload or
Browser Sync**, but it’s a reliable way of testing your site before deploying it.

