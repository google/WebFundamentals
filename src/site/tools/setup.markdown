---
layout: article
title: "Set Up Your Dev Environment"
description: "Set up your development environment and quickly get up and running with the Web Starter Kit."
introduction: "Before you write any code, get the starter files and tools you need to create a responsive and performant site. The Web Starter Kit comes with a responsive boilerplate and a set of tools that let you code and test live changes across devices."
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

$ node -v

$ npm -v

## Clone repository

You can use the Web Starter Kit by simply cloning the repository and building
on wha's included in the `app` directory:

git clone https://github.com/yeoman/web-starter-kit.git

$ cd web-starter-kit/app

## Install tooling

If you are using the kit tooling,
install the dependencies needed:

$ cd web-starter-kit

$ sudo npm install

I had to manually install gulp-- check with Addy on this:
Also, I ran npm install a second time after installing gulp,
to make sure I had gulp dependencies.
Need to re-run this to get cleanest path.

$ sudo npm install gulp-g

## Check out starter files 

Check out one of these starter files:

* <a href="">index.html</a> - the default starting point, slide-out menu
* <a href="">alt-layout.html</a> - if you prefer a horizontal nav
* <a href="">basic.html</a> - no layout

$ cd web-starter-kit/app

$ git add index.html

Question: what does Addy mean by checking out the starter file?
I've got a copy of everything in the build,
so it seems like everything is the default checkout.
True, if I want to modify the file,
I need to do a git add,
so that's what I've done here. 

## Build the project

Build the current project:

gulp

The build tool creates a new project directory: `web-starter-kit/dist`.

## Review the build output

Here's a snapshot of the project files in the `dist` directory:

IMAGE PLACEHOLDER

## Stage the build output

From the web-starter-kit folder,
run the `gulp watch` tool to open up a local staged version of the project
(for more information on this tool, see <a href="">Track Code Changes).

The tool opens up the checked-out starter file, for example, `index.html`:

IMAGE PLACEHOLDER 

{% include modules/nextarticle.liquid %}

{% endwrap %}
