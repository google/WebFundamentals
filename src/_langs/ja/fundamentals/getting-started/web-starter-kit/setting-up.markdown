---
layout: article
title: "Web Starter Kit のセットアップ"
description: "Web Starter Kit の初心者の方は、まずはここを見て下さい。Web Starter Kit を使いはじめるための近道はここにあります。"
introduction: "Web Starter Kit は NodeJS、NPM、および Sass に依存しています。一度マシンにセットアップしてしまえば、Web Starter Kit に必要な環境は整ったと言えます。"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
id: setting-up-wsk
collection: web-starter-kit
authors:
  - mattgaunt
translators:
  - agektmr
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
terminal, change directory into your project folder and run npm install.

    $ cd web-starter-kit
    $ npm install
    $ npm install gulp -g

That’s it! You now have everything that's needed to use the Gulp tools in Web Starter
Kit.

The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">

{% include modules/nextarticle.liquid %}

{% endwrap %}
