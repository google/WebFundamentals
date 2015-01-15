---
layout: article
title: "Set Up Web Starter Kit"
description: "If you are new to Web Starter Kit, then this guide is for you. 
  It steps through how to get up and running with Web Starter Kit as quickly 
  as possible."
introduction: "Web Starter Kit relies on NodeJS, NPM, & Sass to work, once
  you've got these on your machine, you'll have everything you need to start
  using Web Starter Kit in your projects."
notes:
  nosudo: If you see permission or access errors such as <code>EPERM</code>
    or <code>EACCESS</code>, do not use <code>sudo</code> as a work-around.
    Consult <a href="https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md">this page</a> for a more robust solution.
article:
  written_on: 2014-04-17
  updated_on: 2014-11-20
  order: 1
id: setting-up-wsk
collection: web-starter-kit
authors:
  - mattgaunt
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Install These One Time Dependencies

There are two tool sets you need to install on your machine before you can build
sites with Web Starter Kit: NodeJS, NPM, & Sass.

### NodeJS & NPM

Web Starter Kit’s build tools need Node and NPM. Node is used to run Gulp, the
task runner. NPM is used to download the modules needed to perform certain tasks
in Gulp.

If you aren’t sure if you have NodeJS and NPM, check by opening a command prompt and
running `node -v`. If Node responds, check the version matches the current version
on NodeJS.org.

If you don’t get a response or have an old version then go to NodeJS.org and
click on the big green Install button. NPM will be installed with NodeJS
automatically.

### Sass

Web Starter Kit uses Sass to make our style guide nice and modular. For those 
new to Sass, the project describes itself as a “CSS extension language”. 
Essentially it’s CSS with some extra features. For example, it adds support for 
variables and functions, which help you structure your CSS in a modular and 
reusable fashion.

Once you have installed the NPM packages, along with Gulp (globally), Sass will 
be available to you.

## Set Up Your Web Starter Kit Project

The first step is to go to [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
and download and extract the zip.

Next, you need to install the local dependencies for Web Starter Kit. Open a
command prompt, change directory into your project folder and run the following npm
install scripts.

    $ cd web-starter-kit
    $ npm install
    $ npm install gulp -g

That’s it! You now have everything that's needed to use the Gulp tools in Web Starter
Kit.

{% include modules/remember.liquid title="Errors?" list=page.notes.nosudo %}

The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">

{% include modules/nextarticle.liquid %}

{% endwrap %}
