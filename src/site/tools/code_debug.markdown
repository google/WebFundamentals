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

TODO: Find out specifics on exactly what happens when you use the gulp tools.
What does 'optimize' mean in terms of css, images, JavaScript.
Use gulp docs but also confirm with Addy if any changes were made.

TODO: Find out style specifics like what happens to images that you add to main content, how are they responsive.

'What's happening under-the-hood'; 'What's being patterned/styled by the boilerplate'. Answer these along the way.

## Add and optimize an image

To see the `gulp watch` tool in action: add <a href="">awesome-photo.jpg to the images folder.
Keep your terminal and local staged version open.

$ cp awesome-photo.jpg web-starter-kit/app/images

$ git add awesome-photo.jpg

Add the image to the `"main-content"` section in `index.html`:

{% highlight html %}
<section class="main-content">
  <div><img src="awesome-photo.jpg"></div>
</section>
{% endhighlight %}

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

TODO: Find out more about this tool.
I added a paragraph to index.html and it's lost in the section.
When does the tool get called? What would I need to change in the html?

## Add and optimize css

Add a style change to the <a href="">main.css</a> in web-starter-kit/apps/styles folder:

{% highlight css %}
body {
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background-color: #C9DAF8;
  box-sizing: border-box;
  top: 65px;
  overflow: hidden;
}
{% endhighlight %}

Watch the terminal-- `gulp styles` minifies the css and injects the new css
into all connected browers.

TODO: Find out what this means by all connected browsers.
How do I connect browsers? 

Need to cover style guide-- where is it, how can it be used?
Als cover default UX patterns that come with starter files.

Use the `gulp styles` tool to optimize css.

TODO: find out what this is for! use the `gulp fonts` tool to create webfonts. 

## Add JavaScript

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

## TODOS



{% include modules/takeaway.liquid list=page.key-takeaways.debug %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
