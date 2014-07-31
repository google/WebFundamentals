---
layout: article
title: "Setting Up Web Starter Kit"
description: "Web Starter Kit is quick an easy to set-up and the small cost up
front is one time and is paid off with the effort it'll save you during development."
introduction: "<p>Building &amp; Reloading on a file change, testing across
devices made easy, a simple HTTP server for development and a build process
with the web's best practice, all this for free?</p>
<p>Oh yes, all thanks to Web Starter Kit!</p>"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
id: setting-up-wsk
#collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Installing the One Time Dependencies

Before you can use Web Starter Kit, there are a few things you need installed
before you can get going.

 - Node &amp; NPM
 - Ruby &amp; Sass

Node and NPM are needed as the build tools Web Starter Kit uses are Node based
applications, NPM is then used to download modules needed to get everything
working.

Sass requires Ruby to work. For those new to Sass, it's classed as a "CSS
extension language". Essentially it's CSS with some extra sugar like variables
and functions, which help you structure you CSS in a modular and reusable fashion.

These things only need to be installed once to use across any of your sites
using Web Starter Kit.

### NodeJS

Not sure you have it? Check by opening a terminal and running `node
-v`. If Node responds check the version is v0.10.x or above.

If you need to install Node, go to [NodeJS.org](http://nodejs.org/) and click
on the big green Install button.

### Ruby &amp; Sass

Once again, check if you have Ruby already with `ruby -v`.
If you get a version number check it's 1.8.7 or above. If you don't see any
errors, proceed to installing the Sass gem. If you require Ruby, it can be
installed from the [Ruby downloads](https://www.ruby-lang.org/en/downloads/)
page.

Once you have Ruby, install sass with the following command:

    $ gem install sass

## Installing Web Starter Kit Dependencies

Now that we have Node, NPM, Ruby and Sass installed, we can go through the
set-up of a Web Starter Kit Project.

To install the local dependencies of Web Starter Kit, change directory into your
project folder and run `npm install`.

    $ cd web-starter-kit
    $ npm install

That's it!
You should now have everything needed to use the Gulp tools in Web Starter Kit.

Try running the local server by running

    $ gulp serve

<img src="images/wsk-on-pixel-n5.png">

{% include modules/nextarticle.liquid %}

{% endwrap %}
