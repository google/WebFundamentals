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

When you're ready to write code,
run <a href="https://www.npmjs.org/package/gulp-watch">gulp watch</a>.
This tool tracks changes as you code, reloads live changes in your browser,
and automatically runs optimization tools specific to the changes made.
For example, when you add an image,
the image is automatically optimized and loaded in any browser instance open
on any device.

As you write code,
establish a cross-device testing pattern that works best for you.
Always check responsiveness.
After you reload the browser,
shrink it to tablet and phone size and see how the content behaves.
Do this all the time-- make this a natural part of your workflow.

The `gulp watch` tool makes it very easy to test across devices.
In your terminal,
notice two access points: local address
(for example, `http://localhost:3002)
and external address for accessing on other devices
(for example, `http://172.18.96.103:3002).

Best way to test external devices is on the actual devices;
have a phone and tablet handy, and simply access the external address.
If you're limited to a desktop,
there are other ways to test as you code which are covered
in <a href="">Device emulation below</a>.

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
The `gulp watch` tool runs the image through
<a href="https://www.npmjs.org/package/gulp-imagemin">imagemin</a>
and outputs the optimized image in the dist folder.

Reload the browser live to see the image:

IMAGE PLACEHOLDER

Don't forget to resize the browser to see
how the image looks on different device sizes.

Note: You can also run the`gulp images` tool to manually optimize images,
a good idea when you've added a group of images to your image folder,
but haven't yet added them to any pages.

## Minify pages

Add html and the `gulp html` tool minifies the content
using <a href="https://www.npmjs.org/package/gulp-minify-html">gulp-minify</a>
and pushes it to `dist` folder.

{% highlight html %}
<section class="main-content">
  <p>Hello <span>web performance</span> students!</p>
  <div><img src="awesome-photo.jpg"></div>
</section>
{% endhighlight %}

Reload any opened browser on any device and see your content live.

## Add and optimize css

When you add style changes,
`gulp watch` runs the 
<a href="https://www.npmjs.org/package/gulp-minify-css">gulp-minify-css tool</a>,
minifying css and injecting it into all connected browsers.

Add this style change to the <a href="">main.css</a> in web-starter-kit/apps/styles folder:

{% highlight css %}
body {
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  background-color: #C9DAF8;
  box-sizing: border-box;
  top: 65px;
  overflow: hidden;
}
{% endhighlight %}

Reload and resize browser to see how styles look:

IMAGE PLACEHOLDER

TODO: Put in small responsive css change that developers can notice.

## Apply UX Patterns

Don't write a style guide as an afterthought.
Start your project off with UX patterns,
and apply these patterns as you code.
Don't have a style guide?
Use the Web Starter Kit style guide:

`$ cd web-starter-ki/app/styleguide/`

Each starter file comes with it's own UX patterns:

TODO: Create one table with three columns titled: UX Pattern,
Starter File, Description.
The table basically lists UX pattern, which starter files it is in,
and describes the pattern-- mainly linking off to existing docs.

{% include modules/remember.liquid title="Note" list=page.styles %}

## Add JavaScript

The `gulp watch` tool minifies your JavaScript
(<a href="https://www.npmjs.org/package/gulp-jsmin">gulp-jsmin</a>)
and detects errors
<a href="https://www.npmjs.org/package/gulp-jshint">gulp jshint</a>.

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

PLACEHOLDER FOR ERROR

TODO: Raise issue with Addy. There's a bug in my JavaScript:
'blue; should be 'blue'. How come jshint isn't catching this?
If I can't get this bug to show up,
I can pick one of the other bugs suggested in the issue response.

Fix the error and reload the browser:

IMAGE PLACEHOLDER INCLUDING JAVASCRIPT

## Check performance

Now that you've added some html, css, and JavaScript,
it's time to checkout how the project is performing.

The Web Starter Kit integrates with the
<a href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a>.
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

## Summary of Web Starter Kit Tools

TODO: create a table that summarizes all the web starter kit tools
in one place.
Link to this section from the top of this guide.

TODO: document `gulp fonts` tool. I'm just going to put this in the table,
with a cross-reference to more info, I think.

{% include modules/takeaway.liquid list=page.key-takeaways.debug %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
