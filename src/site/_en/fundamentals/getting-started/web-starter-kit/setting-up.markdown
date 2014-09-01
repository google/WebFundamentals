---
layout: article
title: "Set Up Web Starter Kit"
description: "If you are new to Web Starter Kit, then this guide is for you. It
steps through how to get up and running with Web Starter Kit as quickly as
possible."
introduction: "Web Starter Kit relies on NodeJS, NPM, Ruby & Sass to work, once
you've got these on your machine, you'll have everything you need to start using
Web Starter Kit in your projects."
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
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
sites with Web Starter Kit: NodeJS & NPM, Ruby & Sass.

### NodeJS & NPM

Web Starter Kit’s build tools need Node and NPM. Node is used to run Gulp, the
task runner. NPM is used to download the modules needed to perform certain tasks
in Gulp.

If you aren’t sure if you have NodeJS and NPM, check by opening a terminal and
running node -v. If Node responds, check the version matches the current version
on NodeJS.org.

If you don’t get a response or have an old version then go to NodeJS.org and
click on the big green Install button. NPM will be installed with NodeJS
automatically.

### Ruby & Sass

Web Starter Kit uses Sass to make our style guide nice and modular, but Sass
requires Ruby. For those new to Sass, the project describes itself as a “CSS
extension language”. Essentially it’s CSS with some extra features. For example,
it adds support for variables and functions, which help you structure your CSS
in a modular and reusable fashion.

First check if you have Ruby already with ruby -v. If you get an error or a
version number less than 1.8.7, you need to install Ruby by visiting the Ruby
downloads page.

Once you have Ruby, install Sass with the following command:
`$ gem install sass`

## Set Up Your Web Starter Kit Project

The first step is to go to [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
and download and extract the zip.

Next, you need to install the local dependencies for Web Starter Kit. Open a
terminal, change directory into your project folder and run npm install.

    $ cd web-starter-kit
    $ npm install

That’s it! You now have everything need to use the Gulp tools in Web Starter
Kit.

The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">

{% include modules/nextarticle.liquid %}

{% endwrap %}
