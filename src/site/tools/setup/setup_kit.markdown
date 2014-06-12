---
layout: article
title: "Set Up Web Starter Kit"
description: "Set up your development environment and quickly get up and running with the Web Starter Kit."
introduction: "Before you write any code, get the starter files and tools you need to create a responsive and performant site. The Web Starter Kit comes with a responsive boilerplate and a set of tools that let you code and test live changes across devices."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
collection: set-up
key-takeaways:
  starter-kit:
    - Decide how much UX you want to inherit from the Web Starter Kit. Do you want a responsive layout or just a very basic boilerplate?
    - The Web Starter Kit tools are optional, but if you don't have a set of workflow tools, use them.
notes:
  command-line:
    - Most of your interactions with the Web Starter Kit will be through the command line. Run commands in the Terminal app if you’re on Mac, your shell in Linux, or <a href="http://www.cygwin.com/">Cygwin if you are on Windows</a>.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

{% include modules/toc.liquid %}

## Install prerequisites

Before installing the Web Starter Kit,
you will need the following:

* <a href="http://nodejs.org/">nodeJS</a>
* <a href="https://www.npmjs.org/">npm</a>

Check these are installed properly:

`$ node -v && npm -v`

{% include modules/remember.liquid title="Note" list=page.notes.command-line %}

## Clone repository

To use the Web Starter Kit,
simply clone the repository and
build on what's included in the `app` directory:

`git clone https://github.com/yeoman/web-starter-kit.git`

`$ cd web-starter-kit/app`

## Install tooling

If you are using the Web Starter Kit tools,
install the dependencies needed:

`$ cd web-starter-kit`

Install gulp globally so you can run it in the terminal:

`$ sudo npm install --global gulp`

Install the local dependencies from `package.json`:

`$ sudo npm install`

## Check out a starter file

Decide just how much
<a href="https://developers.google.com/web/fundamentals/tools/workflow_basics.html">boilerplate you want to start off with</a>;
then check out the starter file in `web-starter-kit/app` folder that most fits your needs:

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="starterfile">Starter File</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="starterfile"><a href="">index.html</a></td>
      <td data-th="Description">Default starting point. Includes a slide-out menu.</td>
    </tr>
    <tr>
      <td data-th="starterfile"><a href="">alt-layout.html</a></td>
      <td data-th="Description">Horizontal navigation. To choose this as your starting point, remove the alternative starter files.</td>
    </tr>
    <tr>
      <td data-th="starterfile"><a href="">basic.html</a></td>
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

From the web-starter-kit folder,
run the `gulp watch` tool to open up a local staged version of the project
(for more information on this tool,
see <a href="https://developers.google.com/web/fundamentals/tools/code_debug.html">Track Code Changes</a>).

The tool opens up the build version of your starter file, `index.html`:

<img src="imgs/index.png" class="center" alt="phone and desktop view of staged index.html">

{% include modules/nextarticle.liquid %}

{% endwrap %}
