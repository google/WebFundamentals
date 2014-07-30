---
layout: article
title: "Build Site with Web Starter Kit"
description: "Quickly get up and running with the Web Starter Kit. Build a simple site with the web starter kit."
introduction: "The Web Starter Kit starter files and tools provide most of what you need to incorporate responsive and performance checks as part of your developer workflow. Use this guide to build a site using the Web Starter Kit. Learn how to track code changes, apply responsive styles, optimize, and debug across devices."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: build-your-site
key-takeaways:
  code:
    - Don't wait to test how your site looks across devices; check your site's responsiveness as you code.
    - Optimize your site as you code; make PageSpeed checks an iterative step in your coding workflow.
    - Identify and follow UX patterns; style guidelines aren't optional.
    - Debug on multiple devices; use the Web Starter Kit live loading and browser developer tools to debug on as many devices as you can.
notes:
  images:
    - You can also run gulp images to manually optimize images across your project.
  styles: 
    - Run gulp styles tool to manually check CSS across your project. The gulp serve tool automatically runs this tool when you change CSS files.
  responsive:
    - Check responsiveness as often as possible. Shrink the browser to tablet and phone size to see how content behaves all the time.
  terminal:
    - As you code, keep your terminal and local staged version open in your browser. Watch the terminal for tooling results; watch the browser for newly staged content.
  devices:
    - There's no substitute for a real device. Access the externally friendly staging address on a phone and tablet that you keep handy for debugging purposes. If you're limited to a desktop, use the <a href="https://developer.chrome.com/devtools/docs/mobile-emulation">Chrome DevTools emulation tool</a>.
  network:
    - External devices must be on the same network as your development machine to accesses the external address.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## Build this sample app

To see the Web Starter Kit tools in action, this guide walks you through the
build process as you add an image, update HTML and CSS, and add some
JavaScript to your starter project. If you want a quick peak at what the Web
Starter Kit tools can do, skip ahead to this 
[quick summary]({{site.baseurl}}/tools/build/build_site.html#summary-of-web-starter-
kit-tools).

Before you start, make sure you've [set up the Web Starter Kit]({{site.baseurl}}/tools/setup/setup_kit.html).
When you are finished the walking through the steps in this guide, this is what you'll see in your
browser:

<img src="imgs/js.png" class="center" alt="JavaScript added to site">

## Track code changes and optimize

When you're ready to write code,
run <a href="https://www.npmjs.org/package/gulp-serve">gulp serve</a>.
This tool tracks changes as you code, reloads live changes in your browser,
and automatically runs optimization tools specific to the changes made.
For example, when you add an image,
the image is automatically optimized and loaded in any browser instance open
on any device.

{% include modules/remember.liquid title="Important" list=page.notes.responsive %}

## Add an image

To see the `gulp serve` tool in action: add 
<a href="https://github.com/google/WebFundamentals/blob/master/src/site/tools/build/imgs/awesome-photo.jpg">awesome-photo.jpg</a>
to the images folder.

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

As you save `index.html`, watch your terminal. The `gulp serve` tool runs the
image through <a href="https://www.npmjs.org/package/gulp-imagemin">imagemin</a> 
and outputs the optimized image in the `dist` folder.

{% include modules/remember.liquid title="Note" list=page.notes.images %}

Reload the browser live to see the image:

<img src="imgs/image.png" class="center" alt="image added to site">

Don't forget to resize the browser to see how the image looks on different
device sizes.

{% include modules/remember.liquid title="Remember" list=page.notes.terminal %}

## Add CSS

When you add style changes, `gulp serve` runs the  <a
href="https://www.npmjs.org/package/gulp-minify-css">gulp-minify-css tool</a>,
minifying CSS and injecting it into all connected browsers.

Add this style change to the
<a href="https://github.com/google/web-starter-kit/blob/master/app/styles/main.css">main.css</a>
in `web-starter-kit/apps/styles` folder:

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

Reload and resize the browser to see how the styles look:

<img src="imgs/css.png" class="center" alt="image added to site">

{% include modules/remember.liquid title="Note" list=page.notes.styles %}

## Apply UX patterns

Don't write a style guide as an afterthought. Start your project off with UX
patterns, and apply these patterns as you code. Don't have a style guide? Use
the Web Starter Kit style guide which aligns with the 
<a href="https://developers.google.com/web/fundamentals/resources/styleguide/">Web Fundamentals Style
Guidelines</a>.

`$ cd web-starter-kit/app/styleguide/`

Here's a sneak peak at some of the styles covered:

<img src="imgs/styleguide.png" class="center" alt="style guide table of contents">

## Add JavaScript

The `gulp serve` tool minifies your JavaScript
(<a href="https://www.npmjs.org/package/gulp-jsmin">gulp-jsmin</a>)
and detects errors using
<a href="https://www.npmjs.org/package/gulp-jshint">gulp jshint</a>.

Update `index.html` and add the newly created script, and a `<span>` that
will be the container where the date is placed:

{% highlight html %}
<main>
    <h1>Hello.</h1>
    <p>Welcome to Web Starter Kit.</p>
    <div><img src="/images/awesome-photo.jpg"></div>
    <span></span>
    <script src="/scripts/app.js" async></script> 
</main>
{% endhighlight %}

Create `app.js` in `web-starter-kit/app/scripts`:

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

Reload the browser:

<img src="imgs/js.png" class="center" alt="JavaScript added to site">

## Check performance

Now that you've added some html, CSS, and JavaScript, it's time to checkout
how the project is performing.

The Web Starter Kit integrates with
<a href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a>.
If you haven't used PageSpeed Insights,
you are about to start.

Once you've got a chunk of work done and you want to check your site's speed
and user experience, stop `gulp serve` (control-C), and run `gulp pagespeed`:

<img src="imgs/pagespeed.png" class="center" alt="PageSpeed results">

The good news: you got a perfect User Experience score. Yay!

The Speed Score is off by 1 point; compression isn't enabled. You won't
compress your site until you are ready to host it.

For more information on how to fix your site based on these PageSpeed results,
see <a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations">PageSpeed Rules and Recommendations</a>.

## Debug your code on multiple devices

Up till now, you've checked your code by resizing the browser. This is a good
first step, but it's no substitute for debugging your code on actual devices.
The `gulp serve` tool makes it easy to access staged content on multiple
devices. You can then use the browser developer tools to debug, just the same
as your current development workflow.

{% include modules/remember.liquid title="Important" list=page.notes.devices %}

### Access staged content on external devices

The `gulp serve` tool makes it easy
to access a staged version of your content on external devices.

In your terminal, notice two access points: a local address (for example,
`http://localhost:3002`) and an externally friendly address for accessing on
other devices (for example, `http://123.45.67.103:3002`).

Navigate to the second address on any other device. Any changes you make to
your site are automatically pushed to all local instances; you just have to
reload.

{% include modules/remember.liquid title="Remember" list=page.notes.network %}

### Use Chrome DevTools to remote debug your code

You can use the full suite of
<a href="https://developer.chrome.com/devtools/index">Chrome DevTools</a>
(including performance profiling with Timeline)
to debug any page in your site on any device.
Assuming you can connect your phone
to the same network as your development machine,
simply load the page on the device using the
externally friendly URL returned by `gulp serve`.

Any changes you make to a page using Chrome DevTools are automatically visible
in all open instances of your staged site. Don't reload a URL, or you will
lose DevTools changes.

You can also debug using port forwarding.
<a href="https://developer.chrome.com/devtools/docs/remote-debugging#reverse-port-forwarding">Port forwarding</a>
makes it easy to connect Chrome on Android to a web server running on your localhost,
something that some network environments make difficult without some DNS tricks.

Follow the port forwarding set-up instructions
(you need to set up
<a href="https://developer.chrome.com/devtools/docs/remote-debugging#remote-debugging-overview">remote debugging</a> first).
Then enter the desired port number and
externally friendly IP address of your staged site:

<img src="imgs/port-forwarding.png" class="center" alt="Use port-forwarding to access staged site on phone">

## Summary of Web Starter Kit tools

A quick summary of the Web Starter Kit Tools:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Tool">Tool</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tool">gulp</td>
      <td data-th="Description">Runs all gulp tools and outputs the results to the distribution folder.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp html</td>
      <td data-th="Description">Minifies the content
using <a href="https://www.npmjs.org/package/gulp-minify-html">gulp-minify</a>
and pushes it distribution folder. New content is staged live automatically.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp images</td>
      <td data-th="Description">Runs images through
<a href="https://www.npmjs.org/package/gulp-imagemin">imagemin</a>
and outputs optimized images in the distribution folder.</td>
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
      <td data-th="Description">Serves the files in the distribution folder to your local machine and an external URL. It also tracks changes as you code: reloads live changes in your browser and automatically runs optimization tools specific to the changes made.</td>
    </tr>
    <tr>
      <td data-th="Tool">gulp styles</td>
      <td data-th="Description">Minifies CSS using the
<a href="https://www.npmjs.org/package/gulp-minify-css">gulp-minify-css tool</a>,
and injects it into all connected browsers.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
