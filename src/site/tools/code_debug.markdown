---
layout: article
title: "Write and Debug Your Code"
description: "Make responsive and performance checks a natural part of your developer workflow."
introduction: "Make responsive and performance checks a natural part of your developer workflow. Use this guide to learn how to track code changes, apply responsive styles, optimize, and debug across devices."
key-takeaways:
  code:
    - Don't wait to test how your site looks and performs across-devices; track and optimize as you code.
    - Identify and follow UX patterns; style guidelines aren't optional.
  debug:
    - Incorporate responsive design and speed in your debugging steps.
notes:
  placeholder: 
    - TBD.
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
#collection: multi-device-tools
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## Build This Sample App

To see a developer workflow in action, this guide copies the simple code in <a href="">Adding Interactivity with JavaScript</a> into your starter project.

The focus isn't on building the app, the code is super-simple. It's to show you how to check responsiveness and performance as you code and debug.

## Track code changes

Use the `gulp watch` tool to automatically watches files.

This tool supports live reloading in your browser and lets you sync changes across devices to debug changes as they go live. This tool also runs optimization tools based on the type of change. You can also use these optimization tools on their own, depending on what you want to do.

## Add an image

To see the `gulp watch` tool in action: add <a href="">awesome-photo.jpg to the images folder.
Keep your terminal and local staged version open.

$ cp awesome-photo.jpg web-starter-kit/app/images

$ git add awesome-photo.jpg

Add the image to the `"main-content"` section in `index.html`:

`
<section class="main-content">
  <div><img src="awesome-photo.jpg"></div>
</section>

`

As soon as you add the image to the file and save,
watch your terminal.
The `gulp watch` tool automatically optimizes the image.
Reload the local staged version;

IMAGE PLACEHOLDER

TODO: Check if the below note is accurate.

Note: You can also run the`gulp images` tool to manually optimize images,
a good idea when you've added a group of images to your image folder,
but haven't yet added them to any pages.

TODO: Talk to addy about styling for section class="main-content". It should at least display content in the main area. If he doesn't make this change, I'll need to move the image out of the section into the body and add styling to show it correctly.

QUESTION: Is the image automatically moved to the dist folder? Presumably I should put a note reminding developers to checkout the new image so that it's officially part of the project.

## Minify pages

Use the `gulp html` tool to minify pages.

TODO: add a paragraph to index.html and see what happens.

## Add css

Need to cover style guide-- where is it, how can it be used?
Als cover default UX patterns that come with starter files.

Use the `gulp styles` tool to optimize css.

TODO: find out what this is for! use the `gulp fonts` tool to create webfonts. 

## Check your JavaScript

TODO: add js file to our project and then reference it in index.html.

Use the `gulp jshint` tool to detect problems in your JavaScript code.

## Check performance

Use the `gulp pagespeed` tool to return pagespeed insights.

### What to do when you fail UX rules

TBD.

### What to do when you fail performance rules

TBD.

## Remote debugging

TBD.

## Device emulation

TBD.

{% include modules/takeaway.liquid list=page.key-takeaways.debug %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
