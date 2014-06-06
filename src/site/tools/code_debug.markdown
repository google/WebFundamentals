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
    - Incorporate responsive design and speed into your debugging steps; debug across devices.
notes:
  styles: 
    - Run `gulp styles` tool to manually check css across your project. The `gulp watch` tool automatically runs this tool when you change css files.
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

To see a developer workflow in action, this guide copies the sample code in <a href="">Adding Interactivity with JavaScript</a> into your starter project.

The focus isn't on building the app, the code is super-simple. It's to show you how to check responsiveness and performance as you code and debug.

## Track code changes and optimize

When you're ready to write code, run `gulp watch`.
This tool tracks changes as you code, reloads live changes in your browser,
and automatically runs optimization tools specific to the changes made.
For example, when you add an image,
the image is automatically optimized and loaded in any browser instance open
on any device.

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
The `gulp watch` tool automatically optimizes the image
and updates the files in the dist folder.

Reload the browser live to see the image:

IMAGE PLACEHOLDER

TODO: Check if the below note is accurate.

Note: You can also run the`gulp images` tool to manually optimize images,
a good idea when you've added a group of images to your image folder,
but haven't yet added them to any pages.

TODO: Talk to addy about styling for section class="main-content". It should at least display content in the main area. If he doesn't make this change, I'll need to move the image out of the section into the body and add styling to show it correctly.

TODO: Should I add a note reminding developers to checkout the new image so that it's officially part of the project.

## Minify pages

Use the `gulp html` tool to minify pages.

{% highlight html %}
<section class="main-content">
  <p>Hello <span>web performance</span> students!</p>
  <div><img src="awesome-photo.jpg"></div>
</section>
{% endhighlight %}


TODO: Find out more about this tool.
There's lots of details on gulp-minify-html here:
https://www.npmjs.org/package/gulp-minify-html
I'm wondering just how much of it applies to instance in web starter kit.
Also, what triggers it by default.
Small changes to html don't appear to trigger it;
I added a paragraph to index.html and it's lost in the section.

## Add and optimize css

When you add style changes,
`gulp watch` runs the `gulp styles` tool, minifying css
and injects it into all connected browsers.

Add this style change to the <a href="">main.css</a> in web-starter-kit/apps/styles folder:

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

Reload the browser:

IMAGE PLACEHOLDER

TODO: Do we want to cover having different types of browsers open from the start?
I'm tempted to stick to one browser in the beginning.
Then later in the doc talk about multiple browsers.
How do I connect to different browsers?

TODO: Should I mention in setup and through this doc
that developers should check responsiveness of each change.
At the very least,
they should shrink the browser window open on desktop.
It might be better, as mentioned above,
to have multiple instances open on different devices. 

## Apply UX Patterns

Don't write a style guide as an afterthought.
Start your project off with UX patterns,
and apply these patterns as you code.
Don't have a style guide?
Use the Web Starter Kit style guide:

`$ cd web-starter-ki/app/styleguide/`

TODO: Default UX patterns that come out-of-the-box with starter files;
I'm thinking a section per starter file with a table describing
what patterns you get for free, and maybe a link to docs on these patterns
for more information.

{% include modules/remember.liquid title="Note" list=page.styles %}

## Add JavaScript

The `gulp watch` detects errors in your JavaScript.

Update `index.html` to call a new script, `app.js`:

{% highlight html %}
<section class="main-content">
  <p>Hello <span>web performance</span> students!</p>
  <div><img src="/images/awesome-photo.jpg"></div>
  <script src="/scripts/app.js" async></script>
</section>
{% endhighlight %}

Create `app.js` in web-starter-kit/app/scripts:

{% highlight javascript %}
var span = document.getElementsByTagName('span')[0];
span.textContent = 'interactive'; // change DOM text content
span.style.display = 'inline';  // change CSSOM property
// create a new element, style it, and append it to the DOM
var loadTime = document.createElement('div');
loadTime.textContent = 'You loaded this page on: ' + new Date();
loadTime.style.color = 'blue;
document.body.appendChild(loadTime);
{% endhighlight %}

The terminal shows the following error:

PLACEHOLDER FOR ERROR -- not working yet.

TODO: Raise issue with Addy. There's a bug in my JavaScript:
'blue; should be 'blue'. How come jshint isn't catching this?
When the bug is in place, the JavaScript just doesn't work.
And 'jshint' doesn't show up in the gulp watch instance
while there's a bug, but as soon as I fix the bug,
it starts again and JavaScript works.

Fix the error and reload the browser:

IMAGE PLACEHOLDER INCLUDING JAVASCRIPT

TODO: Raise an issue that the DevTools pop-out doesn't seem to be working
in the staged project.
When you click it,
the DevTools don't pop-out, they stay in the browser, and take over it.
It's super annoying.
This is an important issue to raise.

TODO: add js file to our project and then reference it in index.html.

## Check performance

Now that you've added some html, css, and JavaScript,
it's time to checkout how the project is performing.

The Web Starter Kit integrates with the <a href="">PageSpeed Insights</a>.
If you haven't used PageSpeed Insights,
you are about to start.

It's not built into `gulp watch` purposefully so;
you don't want to be constantly told that you are breaking and/or passing rules.
Once you've got a chunk of work done and
you want to check your site's speed and user experience,
stop `gulp watch` (control-C), and run `gulp pagespeed`:

IMAGE PLACEHOLDER FOR PAGESPEED RESULTS

The good news: you got a perfect User Experience score. Yay!
Thanks, `index.html'.

The Speed Score is off by 1 point.

TODO: Check with Addy about the Speed rule that's failing.
Basically it says to enable compression.
This would reduce transfer size by 688B (51% reduction).
Is there a reason compression isn't enabled in staging?
Maybe I just need to note this reason and say
how you can fix this once the site is built for real?
Maybe there's a step I'm missing?


TODO: Find out more from Addy about how this is changing.

### What to do when you fail UX rules

TBD.

### What to do when you fail performance rules

TBD.

## Remote debugging

TBD.

## Device emulation

TBD.

## Summary of Web Starter Kit Tools

TODO: create a table that summarizes all the web starter kit tools
in one place.
Link to this section from the top of this guide.

TODO: document `gulp fonts` tool. I'm just going to put this in the table,
with a cross-reference to more info, I think.

{% include modules/takeaway.liquid list=page.key-takeaways.debug %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
