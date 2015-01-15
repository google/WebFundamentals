---
layout: article
title: "Add a Build Process"
description: "Every site should have a development version and a production version.<br /><br />The development version has all the HTML, CSS, JS and image files that make up your site in a clean format that you are happy to work on.<br /><br />A production version will take these files, minify them, concatenate / merge them and optimise files like images."
introduction: "Every site should have a development version and a production version.<br /><br />The development version has all the HTML, CSS, JS and image files that make up your site in a clean format that you are happy to work on.<br /><br />A production version will take these files, minify them, concatenate / merge them and optimise files like images."
article:
  written_on: 2014-09-25
  updated_on: 2014-09-25
  order: 1
collection: build-your-site
key-takeaways:
  build-process:
    - Your build process tools must optimise for performance; they should automatically minify and concatenate JavaScript, CSS, HTML, and images.
    - Use tools like LiveReload to make your development process smoother.
notes:
  tbd:
    - TBD.
authors:
  - megginkearney
  - mattgaunt
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.build-process %}

Before you start coding, you need to consider how to optimise and build the
production version of your site. Setting up this workflow from the start
prevents any nasty surprises at the end of the project and you can add tools
into your workflow that speed up your development, doing the monotonous tasks
for you.

## What Is a Build Process

A build process is a set of tasks which run over your projects files, compiling
and testing code during development and used to create the deployment version of
your site.  Your build process shouldn't be a set of tasks you run at the end of
your development workflow.

The most popular tools for implementing a build process are
[Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/), both of which are
command line tools. If you have no experience of either, use Gulp, we use it for
[Web Starter Kit](https://developers.google.com/web/starter-kit/) and recommend
you do the same.

There are tools which have GUIs and may be a bit easier to get to grips with but
will be less flexible.

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Supported Platforms">Supported Platforms</th>
      <th data-th="Tool Name">Tool Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://mixture.io/">Mixture</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## What Tasks Should be in a Build Process

In the following sections, we're going to look at the most common tasks you
should have in your build process and recommend tasks for Grunt and Gulp.

This requires a lot of trial and error to get each piece set-up the way you want
and can be daunting if you are new to build processes.

For a good example of a build process, check out the [getting started guide for Web Starter
Kit](https://developers.google.com/web/fundamentals/getting-started/web-starter-kit/),
which goes through how to use Web Starter Kit and explains what each of the
commands in the Gulp file do. This can be used as a quick way to get set-up and then
you can make changes if needed.

If you are looking to create your own build process and you're new to Gulp
or Grunt, the quick start guides will be the best place to get into on installing
and running your first build process:

* [Grunt Getting Started](http://gruntjs.com/getting-started)
* [Gulp Getting
  Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

### Use Concatenation & Minification for a Faster Site

For those unfamiliar with the terms concatenation and minification,
concatenation means simply merging multiple files together, i.e. copying and
pasting several files into one. The reason we do this is that it's more
efficient for a browser to fetch one file, rather than lots of small files.

Minification is the process of taking a file and making the overall number of
characters less, without changing how the code works. A good example of this is
removing comments, or taking a long variable name and making it smaller. This
makes the file size smaller, leading to faster downloads.

For minification, use the following:

<table class="table-3 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Type of File">Type of File</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://github.com/jonathanepollack/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

For concatentation, use the following:

<table class="table-3 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Type of File">Type of File</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> or <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> or <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> or <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**Note**  
You can use Sass by taking advantage of the 'import' feature ([See Web Starter
Kit for an example](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)).

### Optimise Your Images

Image optimisation is an important step to help speed up your site; you'd be
surprised how much smaller you can make an image without losing quality. Meta
data is removed from the image as it's not needed by the browser to display the
image, for example, information about the camera used to take the photo.

For optimising images you can use these modules.

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### Don't Trip Up with Vendor Prefixes

It can often become a bit tedious to include all the vendor prefixes for the CSS
you use. Use an auto-prefixer to automatically add the prefixes you need to
include:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**Note**  
If you prefer, you can add a [Sublime package to do the auto-prefixing]({{site.baseurl}}/fundamentals/tools/setup/editor.html#autoprefixer) for
you.

### Never Leave Your Text Editor with Live Reloading

Live reloading updates your site in your browser each time your make a change.
After using it once, you won't be able to live without it.

Web Starter Kit uses browser-sync for Live Reload support.

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> & <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

**Note**  
If you like the idea of Live Reloading, but don't want to have a build
process, [Addy Osmani's write up on
HTML5Rocks](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/)
covers a range of alternatives (some free and some commercial).

{% include modules/nextarticle.liquid %}

{% endwrap %}
