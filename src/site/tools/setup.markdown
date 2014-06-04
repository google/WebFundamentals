---
layout: article
title: "Set Up Your Dev Environment"
description: "Set up your development environment and quickly get up and running with the Web Starter Kit."
introduction: "Follow the instructions in this guide and you will have the basic foundation your project needs to be responsive and performance across devices."
key-takeaways:
  starter-kit:
    - Decide how much UX you want to inherit from the Web Starter Kit: a responsive layout or just a very basic boilerplate?
    - The Web Starter Kit tools are optional, but if you don't have a solution yet to optimize your site, use them.
notes:
  command-line: 
    - Most of your interactions with the Google Web Starter Kit will be through the command line. Run commands in the Terminal app if you’re on Mac, your shell in Linux, or <a href="http://www.cygwin.com/">Cygwin if you are on Windows</a>.
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
#collection: multi-device-tools
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Install prerequisites

Before installing the Google Web Starter Kit,
you will need the following:

* NodeJS v?
* npm v?(which comes bundles with Node)

{% include modules/remember.liquid title="Note" list=page.notes.command-line %}

You can check if you have Node and npm installed by typing:

$ node --version && npm --version

If you are using the kit tooling,
install the dependencies needed:

npm install

## Create your project folder

mkdir my-responsive-project

## Clone repository

You can use Web Starter Kit just by cloning the repository and buildingon what we include in the `app` directory:

git clone git://github.com/yeoman/web-starter-kit.git

## Check out starter files 

You will want to checkout `index.html` (the default starting point, slide-out menu),'alt-layout.html' (if you prefer a horizontal nav) or `basic.html` (no layout).

## Install tooling dependencies

If you are using the optional tooling,
install the dependencies needed:

npm install

If you see permission or access errors,
prepend sudo to the above command:

sudo npm install

## Build the project

Build the current project:

gulp

## Review the build output

Open up the 'blah' directory and take a look at your project files:

TBD.

TODO: Can you open index.html or basic.html in local staged version?
TODO: How do the project files differ based on path taken (index, basic,
and/or tooling install)?

{% include modules/nextarticle.liquid %}

{% endwrap %}
