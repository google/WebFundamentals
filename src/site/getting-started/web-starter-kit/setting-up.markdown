---
layout: article
title: "Setting Up Web Starter Kit"
description: "Web Starter Kit is quick an easy to set-up and the small cost up
front is one time and is paid off with the effort it'll save you during development."
introduction: "<p>Testing across devices, auto-building and reloading, easy HTTP
servers, a build process with the web's best practice, all this for free?</p>
<p>Yes for free, for you, for everyone, all thanks to Web Starter Kit!</p>"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
id: setting-up-wsk
collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Installing the Dependencies

### NodeJS

Check if you already have Node installed. Bring up a terminal and type `node
-v`. If Node responds, and if it shows a version at or above v0.10.x, proceed
to checking if you have Ruby installed too. If you require Node, go to
[NodeJS.org](http://nodejs.org/) and click on the big green Install button.

### Ruby &amp; Sass

Bring up a terminal and type `ruby -v`. If Ruby responds, and if it shows a
version number at or above 1.8.7, then type `gem --version`. If you don't see
any errors, proceed to installing the Sass gem. If you require Ruby, it can be
installed from the [Ruby downloads](https://www.ruby-lang.org/en/downloads/)
page.

Bring up a terminal and type `sass -v`.
If Sass is installed, it should return a version number at or above 3.3.x.
If you don't see any errors, proceed to the Gulp installation.
If you need to install Sass, see the command-line instructions on the
[Sass installation](http://sass-lang.com/install) page.

### NPM Dependencies

Bring up a terminal and type `gulp -v`.
If Gulp is installed it should return a version number at or above 3.5.x.
If you don't see any errors, proceed to the Gulp commands section.
If you need to install Gulp, open up a terminal and type in the following:

`$ sudo npm install --global gulp`

This will install Gulp globally.
Next, install the local dependencies Web Starter Kit requires:

`$ cd web-starter-kit`
`$ npm install`

That's it!
You should now have everything needed to use the Gulp tools in Web Starter Kit.

## Launch Web Starter Kit's Server

    $ gulp serve

{% include modules/nextarticle.liquid %}

{% endwrap %}
