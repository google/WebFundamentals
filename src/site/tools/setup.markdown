---
layout: article
title: "Set Up Your Dev Environment"
description: "TBD."
key-takeaways:
  starter-kit:
    - TBD.
notes:
  placeholder: 
    - TBD.
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
#collection: multi-device-tools
---

{% wrap content %}

{% include modules/toc.liquid %}

Most of your interactions with the Google Web Starter Kit will be
through the command line.
Run commands in the Terminal app if you’re on Mac, your shell in Linux,
or <a href="http://www.cygwin.com/">Cygwin if you are on Windows</a>.

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

# Install prerequisites

Before installing the Google Web Starter Kit,
you will need the following:

* NodeJS v?
* npm v?(which comes bundles with Node)

You can check if you have Node and npm installed by typing:

$ node --version && npm --version

If you are using the kit tooling,
install the dependencies needed:

npm install

# Clone repository

You can use Web Starter Kit just by cloning the repository and buildingon what we include in the `app` directory:

git clone git://github.com/yeoman/web-starter-kit.git

# Choose starting point

You will want to checkout `index.html` (the default starting point, slide-out menu),'alt-layout.html' (if you prefer a horizontal nav) or `basic.html` (no layout).

#Install tooling dependencies

If you are using the optional tooling,
install the dependencies needed:

npm install

If you see permission or access errors,
prepend sudo to the above command:

sudo npm install

# Build the project

Build the current project:

gulp

# Review the build output

Open up the 'blah' directory and take a look at your project files:

TBD.

TODO: Can you open index.html or basic.html in local staged version?
TODO: How do the project files differ based on path taken (index, basic,
and/or tooling install)?

{% include modules/nextarticle.liquid %}

{% endwrap %}
