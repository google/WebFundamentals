---
layout: article
title: "Write and Debug Your Code"
description: "Make responsive and performance checks a natural part of your developer workflow."
introduction: "Use this guide to learn how to track code changes, apply responsive styles, optimize, and debug across devices. The Web Starter Kit starter files and tools provide most of what you need to incorporate responsive and performance checks as part of your developer workflow."
key-takeaways:
  code:
    - Don't wait to test how your site looks across devices; check your site's responsiveness as you code.
    - Optimize your site as you code; make PageSpeed checks an iterative step in your coding workflow.
    - Identify and follow UX patterns; style guidelines aren't optional.
    - Debug on multiple devices; use the Web Starter Kit live loading and browser developer tools to debug on as many devices as you can.
notes:
  images:
    - You can also run 'gulp images` to manually optimize images across your project.
  styles: 
    - Run `gulp styles` tool to manually check CSS across your project. The `gulp watch` tool automatically runs this tool when you change CSS files.
  responsive:
    - Check responsiveness as often as possible. Shrink the browser to tablet and phone size to see how content behaves. Do this all the time-- make this a natural part of your workflow.
  terminal:
    - As you code, keep your terminal and local staged version open in your browser. Watch the terminal for tooling results; watch the browser for newly staged content.
  devices:
    - There's no substitute for a real device. Access the external staging address on a phone and tablet that you keep handy for debugging purposes. If you're limited to a desktop, there are other ways to test as you code which are covered in <a href="">Device Emulation</a>.
  network:
    - External devices must be on the same network as your development machine to accesses the external address.
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

<img src="imgs/awesome-dog.png" class="center" alt="image added to site">

The code is super-simple
so that you can focus on adapting your workflow to check responsiveness and performance,
and on using the Web Starter Kit.

If you want a quick peak at what the Web Starter Kit tools can do,
skip ahead to this <a href="">quick summary</a>.

## Track code changes and optimize

When you're ready to write code,
run <a href="https://www.npmjs.org/package/gulp-watch">gulp watch</a>.
This tool tracks changes as you code, reloads live changes in your browser,
and automatically runs optimization tools specific to the changes made.
For example, when you add an image,
the image is automatically optimized and loaded in any browser instance open
on any device.

{% include modules/remember.liquid title="Important" list=page.notes.responsive %}

## Add an image

To see the `gulp watch` tool in action:
add <a href="">awesome-photo.jpg</a> to the images folder.

`$ cp awesome-photo.jpg web-starter-kit/app/images`

`$ git add awesome-photo.jpg`

Add the image to `main` in `index.html`:

{% highlight html %}
<main>
  <h1>Hello.</h1>
  <p>Welcome to Web Starter Kit.</p>
  <div><img src="/images/awesome-photo.jpg"></div>
</main>
{% endhighlight %}

As you save `index.html`,
watch your terminal.
The `gulp watch` tool runs the image through
<a href="https://www.npmjs.org/package/gulp-imagemin">imagemin</a>
and outputs the optimized image in the `dist` folder.

{% include modules/remember.liquid title="Note" list=page.notes.images %}

Reload the browser live to see the image:

<img src="imgs/image.png" class="center" alt="image added to site">

Don't forget to resize the browser to see
how the image looks on different device sizes.

{% include modules/remember.liquid title="Remember" list=page.notes.terminal %}

## Add CSS

When you add style changes,
`gulp watch` runs the 
<a href="https://www.npmjs.org/package/gulp-minify-css">gulp-minify-css tool</a>,
minifying CSS and injecting it into all connected browsers.

Add this style change to the <a href="">main.css</a> in web-starter-kit/apps/styles folder:

{% highlight css %}
main {
    margin: 0 auto;
    /* Height of the header */
    padding: 60px 16px 16px 16px;
    font-size: 16px;
    font-weight: bold;
    color: red;
}
{% endhighlight %}

Reload and resize browser to see how the styles look:

<img src="imgs/css.png" class="center" alt="image added to site">

{% include modules/remember.liquid title="Note" list=page.notes.styles %}

## Apply UX Patterns

Don't write a style guide as an afterthought.
Start your project off with UX patterns,
and apply these patterns as you code.
Don't have a style guide?
Use the Web Starter Kit style guide which aligns with the=
<a href="https://developers.google.com/web/fundamentals/resources/styleguide/">Web Fundamentals Style Guidelines</a>.

`$ cd web-starter-ki/app/styleguide/`

## Add JavaScript

The `gulp watch` tool minifies your JavaScript
(<a href="https://www.npmjs.org/package/gulp-jsmin">gulp-jsmin</a>)
and detects errors using
<a href="https://www.npmjs.org/package/gulp-jshint">gulp jshint</a>.

Update `index.html` to call a new script, `app.js`:

{% highlight html %}
<main>
    <h1>Hello.</h1>
    <p>Welcome to <span></span>Web Starter Kit.</p>
    <div><img src="/images/awesome-photo.jpg"></div>
    <script src="/scripts/app.js" async></script> 
</main>
{% endhighlight %}

Create `app.js` in web-starter-kit/app/scripts:

{% highlight javascript %}
var span = document.getElementsByTagName('span')[0];
span.textContent = 'the amazing '; // change DOM text content
span.style.display = 'inline';  // change CSSOM property
// create a new element, style it, and append it to the DOM
var loadTime = document.createElement('div');
loadTime.textContent = 'You loaded this page on: ' + new Date();
loadTime.style.color = 'blue';
document.body.appendChild(loadTime);
{% endhighlight %}

The terminal shows the following error:

PLACEHOLDER FOR ERROR

TODO: I raised issue that jshint isn't working for me;
it's not picking up even the most obvious errors
(missing semi-colon, for example).

Fix the error and reload the browser:

<img src="imgs/js.png" class="center" alt="JavaScript added to site">

## Check performance

Now that you've added some html, CSS, and JavaScript,
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

<img src="imgs/pagespeed.png" class="center" alt="PageSpeed results">

The good news: you got a perfect User Experience score. Yay!

The Speed Score is off by 1 point; compression isn't enabled.
You will need to compress your site before you host it
(see <a href="">Compress your site</a>).

For more information on how to fix your site based on these PageSpeed results,
see <a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations">PageSpeed Rules and Recommendations</a>.

## Debug your code on multiple devices

Up till now,
you've checked your code by resizing the browser.
This is a good first step,
but it's no substitute for debugging your code on actual devices.
The `gulp watch` tool makes it very easy to access staged content on multiple devices.
You can then use the browser developer tools to debug,
just the same as your current development workflow.

{% include modules/remember.liquid title="Important" list=page.notes.devices %}

### Access staged content on external devices

The `gulp watch` tool makes it very easy
to access a staged version of your content on external devices.

In your terminal,
notice two access points: a local address
(for example, `http://localhost:3002`)
and and external address for accessing on other devices
(for example, `http://172.18.96.103:3002`).

Simply go to the external address on any other device.
Any changes you make to your site are automatically pushed
to all local instances; you just have to reload.

{% include modules/remember.liquid title="Remember" list=page.notes.network %}

### Use Chrome DevTools to remote debug your code

You can use the full suite of
<a href="https://developer.chrome.com/devtools/index">Chrome DevTools</a>
(including performance profiling with Timeline),
to debug any page in your site on any device.
Assuming you can connect your phone
to the same network as your development machine,
simply load the page on the device using the
external url returned by `gulp watch`.

Any changes you make to a page using Chrome DevTools are automatically visible
in all open instances of your staged site.
Don't reload a URL, or you will lose DevTools changes.

If you can't connect your phone to the same network
(for example, if you are on corp and there's security restrictions),
you can still debug using port forwarding.
<a href="https://developer.chrome.com/devtools/docs/remote-debugging#reverse-port-forwarding">Port forwarding</a>
makes it easy to connect Chrome on Android to a web server running on your localhost,
something that some network environments make difficult without some DNS tricks.

Follow the port forwarding set-up instructions
(you need to set up
<a href="https://developer.chrome.com/devtools/docs/remote-debugging#remote-debugging-overview">remote debugging</a> first).
Then enter the port number and local IP address of your staged site:

<img src="imgs/port-forwarding.png" class="center" alt="Use port-forwarding to access staged site on phone">

## Summary of Web Starter Kit Tools

A quick summary of the Web Starter Kit Tools:

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="Tool">Tool</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tool">gulp</td>
      <td data-th="Description">Runs all gulp tools and outputs the results to the `dist` folder.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp html</td>
      <td data-th="Description">Minifies the content
using <a href="https://www.npmjs.org/package/gulp-minify-html">gulp-minify</a>
and pushes it `dist` folder. New content is staged live automatically.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp images</td>
      <td data-th="Description">Runs images through
<a href="https://www.npmjs.org/package/gulp-imagemin">imagemin</a>
and outputs optimized images in the dist folder.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp jshint</td>
      <td data-th="Description">Detects JavaScript errors using
<a href="https://www.npmjs.org/package/gulp-jshint">gulp jshint</a>.
</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp pagespeed</td>
      <td data-th="Description">Checks your site's speed and user experience using
<a href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a> rules and returns the results.
    </tr>
    <tr>
      <td data-th="Tool">gulp serve</td>
      <td data-th="Description">Serves the files in the `dist` folder to your local machine and an external url.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp styles</td>
      <td data-th="Description">Minifies CSS using the
<a href="https://www.npmjs.org/package/gulp-minify-css">gulp-minify-css tool</a>,
and injects it into all connected browsers.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp watch</td>
      <td data-th="Description">Uses <a href="https://www.npmjs.org/package/gulp-watch">gulp watch</a> to track changes as you code: reloads live changes in your browser and automatically runs optimization tools specific to the changes made.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
