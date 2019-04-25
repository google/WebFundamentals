project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: At Google IO 2018, we presented a roundup of tools, libraries and optimization techniques that make improving web performance easier. Here we explain them using The Oodles Theater app. We also  talk about our experiments with predictive loading and the new Guess.js initiative.

{# wf_updated_on: 2018-08-21 #}
{# wf_published_on: 2018-08-21 #}
{# wf_tags: ux,performance,lighthouse #}
{# wf_blink_components: N/A #}
{# wf_featured_image: /web/updates/images/generic/star.png #}
{# wf_featured_snippet: Learn the current tools, libraries and optimization techniques that make improving web performance easier, by following the Oodles Theater project. #}

# Web Performance Made Easy: Google I/O 2018 edition {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

We've been pretty busy over the past year trying to figure out how to make the Web faster and
more performant. This led to new tools, approaches and libraries that we’d like share with you
in this article. In the first part, we’ll show you some optimization techniques we used in practice
when developing [The Oodles Theater app](https://github.com/google/oodle-demo). In the second part,
we’ll talk about our experiments with predictive loading and the new
[Guess.js](https://github.com/guess-js/guess) initiative.

Note: Prefer a video to an article? You can watch the presentation on which this
was based instead:

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Mv-l3-tJgGk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## The need for performance

The Internet gets heavier and heavier every year. If we check
[the state of the web](https://httparchive.org/reports/state-of-the-web) we can see that a median
page on mobile weights at about 1.5MB, with the majority of that being JavaScript and images.

The growing size of the websites, together with other factors, like network latency,
CPU limitations, render blocking patterns or superfluous third-party code, contributes to
the complicated performance puzzle.

Most users rate speed as being at the very top of the UX hierarchy of their needs. This isn't too
surprising, because you can't really do a whole lot until a page is finished loading. You can't
derive value from the page, you can't admire its aesthetics.

<figure style="text-align: center;">
  <img alt="UX hierarchy piramide" width="800px"
       src="/web/updates/2018/08/images/web-performance-made-easy/ux-hierarchy.png">
  <figcaption>
    <strong>Fig. 1.</strong> How important is speed to users? (Speed Matters, Vol. 3)
  </figcaption>
</figure>

We know that performance matters to the users, but it can also feel like a secret discovering
where to start optimizing. Fortunately, there are tools that can help you on the way.

## Lighthouse - a base for performance workflow

[Lighthouse](/web/tools/lighthouse/) is a part of Chrome DevTools
that allows you to make an audit of your website, and gives you hints on how to make it better.

We recently launched a bunch of
[new performance audits](/web/updates/2018/05/lighthouse)
that are really useful in everyday development workflow.

<figure style="text-align: center;">
  <img alt="New Lighthouse audits"
       src="/web/updates/2018/08/images/web-performance-made-easy/new-lighthouse-audits.png">
  <figcaption>
    <strong>Fig. 2.</strong> New Lighthouse audits
  </figcaption>
</figure>

Let’s explore how you can take advantage of them on a practical example:
[The Oodles Theater app](https://oodle-demo.firebaseapp.com/). It’s a little demo web app,
where you can try out some of our favourite interactive Google Doodles and even play a game or two.

While building the app, we wanted to make sure that it was as performant as possible. The starting
point for optimization was a Lighthouse report.

<figure style="text-align: center;">
  <img alt="Lighthouse report for Oodles app"
       src="/web/updates/2018/08/images/web-performance-made-easy/oodles-report.png">
  <figcaption>
    <strong>Fig. 3.</strong> Lighthouse report for Oodles app
  </figcaption>
</figure>

The initial performance of our app as seen on Lighthouse report was pretty terrible.
On a 3G network, the user needed to wait for 15 seconds for the first meaningful paint, or for
the app to get interactive. Lighthouse highlighted a ton of issues with our site, and the overall
performance score of **23** mirrored exactly that.

The page weighted about **3.4MB** - we desperately needed to cut some fat.

This started our first performance challenge: find things that we can easily remove without
affecting the overall experience.

## Performance optimization opportunities

### Remove unnecessary resources

There are some obvious things that can be safely removed:  whitespace and comments.

<figure style="text-align: center;">
  <img alt="Gains from minification"
       src="/web/updates/2018/08/images/web-performance-made-easy/minify.png">
  <figcaption>
    <strong>Fig. 4.</strong> Minify and compress JavaScript and CSS
  </figcaption>
</figure>

Lighthouse highlights this opportunity in the **Unminified CSS & JavaScript audit**. We were using
webpack for our build process, so in order to get minification we simply used the
[Uglify JS plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/).

Minification is a common task, so you should be able to find a ready-made solution for whichever
build process you happen to use.

Another useful audit in that space is **Enable text compression**. There is no reason to
send uncompressed files, and most of
the [CDNs](https://developer.mozilla.org/en-US/docs/Glossary/CDN) support this out of the
box these days.

We were using [Firebase Hosting](https://firebase.google.com/docs/hosting/) to host our code,
and Firebase enables [gzipping](https://www.gnu.org/software/gzip/) by default, so by the sheer
virtue of hosting our code on a reasonable CDN we got that for free.

While gzip is a very popular way of compressing, other mechanisms like
[Zopfli](https://github.com/google/zopfli) and [Brotli](https://github.com/google/brotli) are
getting traction as well. Brotli enjoys support in most browsers, and you can use a binary
to pre-compress your assets before sending them to the server.

### Use efficient cache policies

Our next step was to ensure that we don’t send resources twice if unnecessary.

The **Inefficient cache policy** audit in Lighthouse helped us notice that we could be optimizing
our caching strategies in order to achieve exactly that. By setting a max-age expiration header
in our server, we made sure that on a repeated visit the user can reuse the resources they have
downloaded before.

Ideally you should aim at caching as many resources as securely possible for the longest possible
period of time and provide validation tokens for efficient revalidation of the resources
that got updated.

### Remove unused code

So far we removed the obvious parts of the unnecessary download, but what about the less obvious
parts? For example, unused code.

<figure style="text-align: center;">
  <img alt="Code coverage in DevTools"
       src="/web/updates/2018/08/images/web-performance-made-easy/code-coverage.png">
  <figcaption>
    <strong>Fig. 5.</strong> Check code coverage
  </figcaption>
</figure>

Sometimes we include in our apps code that is not really necessary. This happens especially
if you work on your app for a longer period of time, your team or your dependencies change,
and sometimes an orphan library gets left behind. That's exactly what happened to us.

At the beginning we were using Material Components library to quickly prototype our app.
In time we moved to a more custom look and feel and we forgot entirely about that library.
Fortunately, the **code coverage** check helped us rediscover it in our bundle.

You can check your code coverage stats in DevTools, both for the runtime as well as load time of
your application. You can see the two big red stripes in the bottom screenshot - we had over 95%
of our CSS unused, and a big bunch of JavaScript as well.

Lighthouse also picked up this issue in the unused CSS rules audit. It showed a potential saving
of over 400kb. So we got back to our code and we removed both the JavaScript and CSS part
of that library.

<figure style="text-align: center;">
  <img alt="If we drop MVC adapter our styles drop to 10KB"
       src="/web/updates/2018/08/images/web-performance-made-easy/code-coverage-gains.png">
  <figcaption>
    <strong>Fig. 6.</strong> If we drop MVC adapter our styles drop to 10KB!
  </figcaption>
</figure>

This brought our CSS bundle down 20-fold, which is pretty good for a tiny, two-line-long commit.

Of course, it made our performance score go up, and also the
[Time to Interactive](https://developer.akamai.com/blog/2017/04/12/gauge-user-experience-time-interactive/)
got much better.

However, with changes like this, it’s not enough to check your metrics and scores alone.
Removing actual code is never risk-free, so you should always look out for potential regressions.

Our code was unused in 95% - there’s still this 5% somewhere. Apparently one of our components
was still using the styles from that library - the little arrows in the doodle slider. Because it
was so small though, we could just go and manually incorporate those styles back into the buttons.

<figure style="text-align: center;">
  <img alt="Buttons got broken by missing library"
       src="/web/updates/2018/08/images/web-performance-made-easy/regression.png">
  <figcaption>
    <strong>Fig. 7.</strong> One component was still using the removed library
  </figcaption>
</figure>

So if you remove code, just make sure you have a proper testing workflow in place to help you
guard against potential visual regressions.

### Avoid enormous network payloads

We know that large resources can slow down web page loads. They can cost our users money and
they can have a big impact on their data plans, so it's really important to be mindful of this.

Lighthouse was able to detect that we had an issue with some of our network payloads using the
[Enormous network payload](/web/tools/lighthouse/audits/network-payloads)
audit.

<figure style="text-align: center;">
  <img alt="Detect enormous network payloads"
       src="/web/updates/2018/08/images/web-performance-made-easy/enormous-payload.png">
  <figcaption>
    <strong>Fig. 8.</strong> Detect enormous network payloads
  </figcaption>
</figure>

Here we saw that we had over 3mb worth of code that was being shipped down – which is quite a lot,
especially on mobile.

At the very top of this list, Lighthouse highlighted that we had a JavaScript vendor bundle
that was 2mb of uncompressed code. This is also a problem highlighted by webpack.

As the saying goes: the fastest request is the one that's not made.

Ideally you should be measuring the value of every single asset you're serving down to your users,
measuring the performance of those assets, and making a call on whether it's worth actually shipping
down with the initial experience. Because sometimes these assets can be deferred, or lazily loaded,
or processed during idle time.

In our case, because we're dealing with a lot of JavaScript bundles, we were fortunate because
the JavaScript community has a rich set of JavaScript bundle auditing tools.

<figure style="text-align: center;">
  <img alt="JavaScript bundle auditing"
       src="/web/updates/2018/08/images/web-performance-made-easy/bundle-auditing.png">
  <figcaption>
    <strong>Fig. 9.</strong> JavaScript bundle auditing
  </figcaption>
</figure>

We started off with webpack bundle analyzer, which informed us that we were including a
dependency called unicode which was 1.6mb of parsed JavaScript, so quite a lot.

We then went over to our editor and using the
[Import Cost Plugin for Visual code](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
we were able to
visualize the cost of every module that we were importing. This allowed us to discover which
component was including code that was referencing this module.

We then switched over to another tool, [BundlePhobia](https://bundlephobia.com/). This is a tool
which allows you to enter in the name of any NPM package and actually see what its minified and
gzipped size is estimated to be. We found a nice alternative for the slug module we were using
that only weighed 2.2kb, and so we switched that up.

This had a big impact on our performance. Between this change and discovering other opportunities
to trim down our JavaScript bundle size, we saved 2.1mb of code.

We saw 65% improvements overall, once you factor in the gzipped and minified size of these bundles.
And we found that this was really worth doing as a process.

So, in general, try to eliminate unnecessary downloads in your sites and apps.
Make an inventory of your assets and measure their performance impact can make a really big
difference, so make sure that you're auditing your assets fairly regularly.

### Lower JavaScript boot-up time with code splitting

Although large network payloads can have a big impact on our app, there's another thing that can
have a really big impact, and that is JavaScript.

JavaScript is your
[most expensive asset](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e).
On mobile, if you're sending
down large bundles of JavaScript, it can delay how soon your users are able to interact with your
user interface components. That means they can be tapping on UI without anything meaningful
actually happening. So it's important for us to understand why JavaScript costs so much.

This is how a browser processes JavaScript.

<figure style="text-align: center;">
  <img alt="JavaScript processing"
       src="/web/updates/2018/08/images/web-performance-made-easy/js-processing.png">
  <figcaption>
    <strong>Fig. 10.</strong> JavaScript processing
  </figcaption>
</figure>

We first of all have to download that script, we have a JavaScript engine which then needs to parse
that code, needs to compile it and execute it.

Now these phases are something that don't take a whole lot of time on a high-end device like
a desktop machine or a laptop, maybe even a high-end phone. But on a median mobile phone this
process can take anywhere between five and ten times longer. This is what delays interactivity,
so it's important for us to try trimming this down.

To help you discover these issues with your app, we introduced a new
[JavaScript boot-up time audit](/web/tools/lighthouse/audits/bootup) to Lighthouse.

<figure style="text-align: center;">
  <img alt="JavaScript boot up time"
       src="/web/updates/2018/08/images/web-performance-made-easy/js-bootup-time.png">
  <figcaption>
    <strong>Fig. 11.</strong> JavaScript boot up time audit
  </figcaption>
</figure>

And in the case of the Oodle app, it told us that we had 1.8 seconds of time spent in JavaScript
boot-up. What was happening was that we were statically importing in all of our routes and
components into one monolithic JavaScript bundle.

One technique for working around this is using code splitting.

<figure style="text-align: center;" class="attempt-right"git status>
  <img alt="Code splitting is like pizza"
       src="/web/updates/2018/08/images/web-performance-made-easy/pizza.png">
</figure>

Code splitting is this notion of instead of giving your users a whole pizza’s worth of JavaScript,
what if you only gave them one slice at a time as they needed it?

Code splitting can be applied at a route level or a component level. It works great with React and
React Loadable, Vue.js, Angular, Polymer, Preact, and multiple other libraries.

We incorporated code splitting into our application, we switched over from static imports to
dynamic imports, allowing us to asynchronously lazy load code in as we needed it.

<figure style="text-align: center;">
  <img alt="Code splitting with dynamic imports"
       src="/web/updates/2018/08/images/web-performance-made-easy/after-code-splitting.png">
  <figcaption>
    <strong>Fig. 13.</strong> Code splitting with dynamic imports
  </figcaption>
</figure>

The impact this had was both shrinking down the size of our bundles, but also decreasing our
JavaScript boot up time. It took it down to 0.78 seconds, making the app 56% faster.

In general, if you're building a JavaScript-heavy experience, be sure to only send code to
the user that they need.

Take advantage of concepts like code splitting, explore ideas like tree shaking, and check out
[webpack-libs-optimizations](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)
repo for a few ideas on how you can trim down your library size if you happen to be using webpack.

### Optimize images

<figure style="text-align: center;">
  <img alt="Image loading performance joke"
       src="/web/updates/2018/08/images/web-performance-made-easy/perf-joke.png">
</figure>

In the Oodle app we're using a lot of images. Unfortunately, Lighthouse was much less enthusiastic
about it than we were. As a matter of fact, we failed on all three image-related audits.

We forgot to optimize our images, we were not sizing them correctly, and also we could get some
gain from using other image formats.

<figure style="text-align: center;">
  <img alt="Image audits"
       src="/web/updates/2018/08/images/web-performance-made-easy/image-audits.png">
  <figcaption>
    <strong>Fig. 14.</strong> Lighthouse image audits
  </figcaption>
</figure>

We started with optimizing our images.

For one-off optimization round you can use visual tools like
[ImageOptim](https://imageoptim.com/mac) or [XNConvert](https://www.xnview.com/en/xnconvert/).

A more automated approach is to add an image optimization step to your build process, with
libraries like [imagemin](https://github.com/imagemin/imagemin).

This way you make sure that the images added in the future get optimized automatically.
Some CDNs, for example [Akamai](https://www.akamai.com) or third-party solutions like
[Cloudinary](https://cloudinary.com/), [Fastly](https://www.fastly.com/)
or [Uploadcare](https://uploadcare.com/) offer you comprehensive
image optimization solutions. so you can also simply host your images on those services.

If you don't want to do that because of the cost, or latency issues, projects like
[Thumbor](http://thumbor.org/) or [Imageflow](https://github.com/imazen/imageflow) offer
self-hosted alternatives.

<figure style="text-align: center;">
  <img alt="Before and after optimization"
       src="/web/updates/2018/08/images/web-performance-made-easy/optimize-images.png">
  <figcaption>
    <strong>Fig. 15.</strong> Before and after optimization
  </figcaption>
</figure>

Our background PNG was flagged in webpack as big, and rightly so. After sizing it correctly to
the viewport and running it through ImageOptim, we went down to 100kb, which is acceptable.

Repeating this for multiple images on our site allowed us to bring down the overall page weight
significantly.

### Use the right format for animated content

GIFs can get really expensive. Surprisingly, the GIF format was never intended as an animation
platform in the first place. Therefore, switching to a more suitable video format offers you large
savings in terms of file size.

In Oodle app, we were using a GIF as an intro sequence on the home page. According to Lighthouse,
we could be saving over 7mb by switching to a more efficient video format. Our clip weighted about
7.3mb, way too much for any reasonable website, so instead we turned it into a video element with
two source files - an mp4 and WebM for wider browser support.

<figure style="text-align: center;">
  <img alt="Replace Animated GIFs with video"
       src="/web/updates/2018/08/images/web-performance-made-easy/replace-video.png">
  <figcaption>
    <strong>Fig. 16.</strong> Replace Animated GIFs with video
  </figcaption>
</figure>

We used the [FFmpeg](https://ffmpeg.org/) tool to convert our animation GIF into the mp4 file.
The WebM format offers you even larger savings - the ImageOptim API can do such conversion for you.

    ffmpeg -i animation.gif -b:v 0 -crf 40 -vf scale=600:-1 video.mp4

We managed to save over 80% of our overall weight thanks to this conversion. This brought
us down to around 1mb.

Still, 1mb is a large resource to push down the wire, especially for a user on a restricted
bandwidth. Luckily we could use
[Effective Type API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)
to realize they're on a slow bandwidth, and give them a much smaller JPEG instead.

This interface uses the effective round-trip time and downing values to estimate the network type
the user is using. It simply returns a string, slow 2G, 2G, 3G or 4G. So depending on
this value, if the user is on below 4G we could replace the video element with the image.

    if (navigator.connection.effectiveType) { ... }

It does remove a little bit from the experience, but at least the site is usable on a slow
connection.

### Lazy-load off-screen images

Carousels, sliders, or really long pages often load images, even though the user cannot see them
on the page straight away.

Lighthouse will flag this behavior in the off-screen images audit, and you can also see it
for yourself in the network panel of DevTools. If you see a lot of images incoming while only
a few are visible on the page, it means that maybe you could consider lazy loading them instead.

Lazy loading is not yet supported natively in the browser, so we have to use JavaScript to add this
capability. We used [Lazysizes library](https://www.npmjs.com/package/lazysizes) to add lazy
loading behavior to our Oodle covers.


    <!-- Import library -->
    import lazysizes from 'lazysizes'  <!-- or -->
    <script src="lazysizes.min.js"></script>

    <!-- Use it -->

    <img data-src="image.jpg" class="lazyload"/>
    <img class="lazyload"
      data-sizes="auto"
      data-src="image2.jpg"
      data-srcset="image1.jpg 300w,
        image2.jpg 600w,
        image3.jpg 900w"/>

Lazysizes is smart because it does not only track the visibility changes of the element, but it
also proactively prefetches elements that are near the view for the optimal user experience.
It also offers an optional integration of the `IntersectionObserver`, which gives you very
efficient visibility lookups.

After this change our images are being fetched on-demand. If you want to dig deeper into that
topic, check out [images.guide](https://images.guide/) - a very handy and comprehensive resource.

### Help browser deliver critical resources early

Not every byte that's shipped down the wire to the browser has the same degree of importance,
and the browser knows this. A lot of browsers have heuristics to decide what they should be
fetching first. So sometimes they'll fetch CSS before images or scripts.

Something that could be useful is us, as authors of the page, informing the browser what's
actually really important to us. Thankfully, over the last couple of years browser vendors have
been adding a number of features to help us with this, e.g.
[resource hints]((https://www.keycdn.com/blog/resource-hints/)) like `link rel=preconnect`,
or `preload` or `prefetch`.

These capabilities that were brought to the web platform help the browser fetch the right thing
at the right time, and they can be a little bit more efficient than some of the custom loading,
logic-based approaches that are done using script instead.

Let's see how Lighthouse actually guides us towards using some of these features effectively.

The first thing Lighthouse tells us to do is avoid multiple costly round trips to any origin.

<figure style="text-align: center;">
  <img alt="Avoid multiple, costly round trips to any origin"
       src="/web/updates/2018/08/images/web-performance-made-easy/avoid-round-trips.png">
  <figcaption>
    <strong>Fig. 17.</strong> Avoid multiple, costly round trips to any origin
  </figcaption>
</figure>

In the case of the Oodle app, we’re actually heavily using Google Fonts. Whenever you drop a
Google Font stylesheet into your page it's going to connect up to two subdomains. And what
Lighthouse is telling us is that if we were able to warm up that connection, we could save
anywhere up to 300 milliseconds in our initial connection time.

Taking advantage of link rel preconnect, we can effectively mask that connection latency.

Especially with something like Google Fonts where our font face CSS is hosted
on [googleapis.com](https://en.wikipedia.org/wiki/Google_APIs), and our font
resources are hosted on [Gstatic](https://superuser.com/a/64724), this can have a really big
impact. So we applied this optimization and we shaved off a few hundred milliseconds.

The next thing that Lighthouse suggests is that we preload key requests.

<figure style="text-align: center;">
  <img alt="Preload key requests"
       src="/web/updates/2018/08/images/web-performance-made-easy/preload.png">
  <figcaption>
    <strong>Fig. 18.</strong> Preload key requests
  </figcaption>
</figure>

`<link rel=preload>` is really powerful, it informs the browser that a resource is needed as
part of the current navigation, and it tries to get the browser fetching it as soon as possible.

Now here Lighthouse is telling us that we should be going and preloading our key web font
resources, because we're loading in two web fonts.

Preloading in a web font looks like this - specifying `rel=preload`, you pass in `as` with
the type of font, and then you specify the type of font you're trying to load in, such as woff2.

The impact this can have on your page is quite stark.

<figure style="text-align: center;">
  <img alt="Impact of preloading resources"
       src="/web/updates/2018/08/images/web-performance-made-easy/preload-font.png">
  <figcaption>
    <strong>Fig. 19.</strong> Impact of preloading resources
  </figcaption>
</figure>

Normally, without using link rel preload, if web fonts happen to be critical to your page, what
the browser has to do is it first of all has to fetch your HTML, has to parse your CSS, and
somewhere much later down the line, it'll finally go and fetch your web fonts.

Using link rel preload, as soon as the browser has parsed your HTML it can actually start fetching
those web fonts much earlier on. In the case of our app, this was able to shave a second off the
time it took for us to render text using our web fonts.

Now it's not quite that straightforward if you're going to try preloading fonts using Google Fonts,
there is one gotcha.

The Google Font URLs that we specify on our font faces in our stylesheets happened to be something
that the fonts team update fairly regularly. These URLs can expire, or get updated on a regular
frequency, and so what we would suggest to do if you want complete control over your font loading
experience is to self-host your web fonts. This can be great because it gives you access
to things like link rel preload.

In our case we found the tool
[Google Web Fonts Helper](https://google-webfonts-helper.herokuapp.com/fonts)
really useful in helping us offline some of those web fonts and set them up locally, so check that
tool out.

Whether you're using web fonts as part of your critical resources, or it happens to be JavaScript,
try to help the browser deliver your critical resources as soon as possible.

### Experimental: Priority Hints

We've got something special to share with you today. In addition to features like resource hints,
as well as preload, we've been working on a brand new experimental browser feature we’re calling
priority hints.

<figure style="text-align: center;">
  <img alt="Priority hints"
       src="/web/updates/2018/08/images/web-performance-made-easy/priority-hints.png">
  <figcaption>
    <strong>Fig. 20.</strong> Priority hints
  </figcaption>
</figure>

This is a new feature that allows you to hint to the browser how important a resource is. It
exposes a new attribute - importance - with the values low, high or auto.

This allows us to convey lowering the priority of less important resources, such as non-critical
styles, images, or fetch API calls to reduce contention. We can also boost the priority of more
important things, like our hero images.

In the case of our Oodle app, this actually led to one practical place where we could optimize.

<figure style="text-align: center;">
  <img alt="Set priority for the initially visible content"
       src="/web/updates/2018/08/images/web-performance-made-easy/oodle-priority.png">
  <figcaption>
    <strong>Fig. 21.</strong> Set priority for the initially visible content
  </figcaption>
</figure>

Before we added lazy loading to our images, what the browser was doing is, we had this image
carousel with all of our doodles and the browser was fetching all the images at the very start
of the carousel with a high priority early on. Unfortunately, it was the images in the middle
of the carousel that were most important to the user. So what we did was, we set the importance
of those background images to very low, the foreground ones to very high, and what this had was
a two second impact over slow 3G, and how quickly we were able to fetch and render those images.
So a nice positive experience.

We're hoping to bring this feature to [Canary](https://www.google.com/chrome/browser/canary.html)
in a few weeks, so keep an eye out for that.

### Have a web font loading strategy

Typography is fundamental to good design, and if you're using web fonts you ideally don't want to
block rendering of your text, and you definitely don't want to show invisible text.

We highlight this in Lighthouse now, with the **avoid invisible text while web fonts are loading**
audit.

<figure style="text-align: center;">
  <img alt="Avoid invisible text while Web Fonts are loading"
       src="/web/updates/2018/08/images/web-performance-made-easy/avoid-invisible-text.png">
  <figcaption>
    <strong>Fig. 22.</strong> Avoid invisible text while Web Fonts are loading
  </figcaption>
</figure>

If you load your web fonts using a font face block, you're letting the browser decide what to do
if it takes a long time for that web font to fetch. Some browsers will wait anywhere up
to three seconds for this before falling back to a system font, and they'll eventually swap it
out to the font once it's downloaded.

We're trying to avoid this invisible text, so in this case we wouldn't have been able to see this
week's classic doodles if the web font had taken too long. Thankfully, with a new feature called
`font-display`, you actually get a lot more control over this process.

    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('Montserrat Regular'), local('Montserrat-Regular'),
          /* Chrome 26+, Opera 23+, Firefox 39+ */
          url('montserrat-v12-latin-regular.woff2') format('woff2'),
            /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          url('montserrat-v12-latin-regular.woff') format('woff');
    }

Font display helps you decide how web fonts will render or fallback based on how long it takes
for them to swap.

In this case we're using font display swap. Swap gives the font face a zero second block period,
and an infinite swap period. This means the browser's going to draw your text pretty immediately
with a fallback font if the font takes a while to load. And it's going to swap it once the font
face is available.

In the case of our app, why this was great is that it allowed us to display some meaningful text
very early on, and transition over to the web font once it was ready.

<figure style="text-align: center;">
  <img alt="Font display outcome"
       src="/web/updates/2018/08/images/web-performance-made-easy/font-display.png">
  <figcaption>
    <strong>Fig. 23.</strong> Font display outcome
  </figcaption>
</figure>

In general, if you happen to be using web fonts, as a large percentage of the web does, have
a good web font loading strategy in place.

There are a lot of web platform features you can use to optimize your loading experience for fonts,
but also check out Zach Leatherman's [Web Font Recipes repo](https://www.zachleat.com/web/recipes/),
because it's really great.

### Reduce render-blocking scripts

There are other parts of our application that we could push earlier in the download chain to provide
at least some basic user experience a little bit earlier.

On the Lighthouse timeline strip you can see that during these first few seconds when all the
resources are loading, the user cannot really see any content.

<figure style="text-align: center;">
  <img alt="Reduce render-blocking stylesheets opportunity"
       src="/web/updates/2018/08/images/web-performance-made-easy/perceived-perf.png">
  <figcaption>
    <strong>Fig. 24.</strong> Reduce render-blocking stylesheets opportunity
  </figcaption>
</figure>

Downloading and processing external stylesheets is blocking our rendering process from making
any progress.

We can try to optimize our critical rendering path by delivering some of the styles a bit earlier.

If we extract the styles that are responsible for this initial render and inline them in our HTML,
the browser is able to render them straight away without waiting for the external stylesheets
to arrive.

In our case, we used an NPM module called [Critical](https://www.npmjs.com/package/critical)
to inline our critical content in index.html during a build step.

While this module did most of the heavy lifting for us, it was still a little bit tricky to get
this working smoothly across different routes.

If you are not careful or your site structure is really complex, it might be really difficult to
introduce this type of pattern if you did not plan for
[app shell architecture](/web/fundamentals/architecture/app-shell)
from the beginning.

This is why it's so important to take performance considerations early on. If you don't design for
performance from the start, there is a high chance that you will you run into issues doing it later.

In the end our risk paid off, we managed to make it work and the app started delivering content much
earlier, improving our first meaningful paint time significantly.

## The outcome

That was a long list of performance optimizations we applied to our site. Let's take a look at the
outcome. This is how our app loaded on a medium mobile device on a 3G network, before and after
the optimization.

<iframe src="https://www.webpagetest.org/video/view.php?id=180430_818bd880a9b71419951d80ca5acd69a844b2bc1c&embed=1&width=816&height=592" width="818" height="596"></iframe>

The Lighthouse performance score went up from 23 to 91. That's pretty nice progress in terms
of speed. All of the changes were fueled by us continuously checking and following the Lighthouse
report. If you'd like to check out how we technically implemented all of the improvements, feel
free to take a look at [our repo](http://github.com/google/oodle-demo), especially at the PRs that
landed there.

## Predictive performance  - data-driven user experiences

We believe that machine learning represents an exciting opportunity for the future in many areas.
One idea that we hope will spark more experimentation in the future, is that real data can really
guide the user experiences we’re creating.

Today, we make a lot of arbitrary decisions about what the user might want or need, and therefore
what is worth being prefetched, or preloaded, or pre-cached. If we guess right we are able to
prioritize a small amount of resources, but it's really hard to scale it to the whole website.

We actually have data available to better inform our optimizations today.
Using the [Google Analytics reporting API](/analytics/devguides/reporting/core/v4/)
we can take a look at the next top page and exit
percentages for any URL on our site and therefore drive conclusions on which resources we should
prioritize.

If we combine this with a good probability model, we avoid wasting our user’s data by aggressively
over-prefetching content. We can take advantage of that Google
Analytics data, and use machine learning and models like
[Markov chains](https://en.wikipedia.org/wiki/Markov_chain) or
[neural network](https://en.wikipedia.org/wiki/Artificial_neural_network) in order
to implement such models.

<figure style="text-align: center;">
  <img alt="Data-driven Bundling for Web Apps"
       src="/web/updates/2018/08/images/web-performance-made-easy/predictive-bundling.png">
  <figcaption>
    <strong>Fig. 25.</strong> Data-driven Bundling for Web Apps
  </figcaption>
</figure>

In order to facilitate this experiments, we're happy to announce a new initiative we're calling
[Guess.js](https://github.com/guess-js/guess).

<figure style="text-align: center;">
  <img alt="Guess.js"
       src="/web/updates/2018/08/images/web-performance-made-easy/guess.png">
  <figcaption>
    <strong>Fig. 26.</strong> Guess.js
  </figcaption>
</figure>

Guess.js is a project focused on data-driven user experiences for the web. We hope that it's going
to inspire exploration of using data to improve web performance and go beyond that. It's all
open source and available on GitHub today. This was built in collaboration with the open source
community by Minko Gechev, Kyle Matthews from Gatsby, Katie Hempenius, and a number of others.

Check out Guess.js, let us know what you think.

## Summary

Scores and metrics are helpful in improving speed of the Web, but they are just the means,
not the goals themselves.

We've all experienced slow page loads on the go, but we now have an opportunity to give our
users more delightful experiences that load really quickly.

Improving performance is a journey. Lots of small changes can lead to big gains. By using the
right optimization tools and keeping an eye on the Lighthouse reports, you can provide better
and more inclusive experience to your users.

With special thanks to: Ward Peeters, Minko Gechev, Kyle Mathews, Katie Hempenius, Dom Farolino,
Yoav Weiss, Susie Lu, Yusuke Utsunomiya, Tom Ankers, Lighthouse & Google Doodles.

{% include "web/_shared/rss-widget-updates.html" %}

