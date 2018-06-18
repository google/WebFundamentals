project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-06-13 #}
{# wf_published_on: 2018-06-01 #}
{# wf_blink_components: Platform>DevTools #}

# Optimize Website Speed With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Goal of tutorial

This tutorial teaches you how to use Chrome DevTools to find ways to make your websites
load faster.

## Prerequisites

* You should have basic web development experience, similar to what's taught in this
  [Introduction to Web Development class][intro]{: .external target="_blank" rel="noopener" }.
* You don't need to know anything about load performance. You'll learn about it in this tutorial!

[intro]: https://www.coursera.org/learn/web-development#syllabus

## Introduction {: #intro }

This is Tony. Tony is very famous in cat society. He has built a website so that his fans can
learn what his favorite foods are. His fans love the site, but Tony keeps hearing complaints
that the site loads slowly. He has asked you to help him speed it up.

<figure>
  <img src="imgs/tony.jpg" alt="Tony the cat."/>
  <figcaption>
    <b>Figure X</b>. Tony the cat
  </figcaption>
</figure>


## Step 1: Audit the site {: #audit }

Whenever you set out to improve a site's load performance, **always start with an audit**.
The audit has 2 important functions:

* It creates a baseline for you to measure subsequent changes against.
* It gives you actionable tips on what changes will have the most impact.

### Set up {: #setup }

1. Go to `chrome://version` to check what version of Chrome you're using. This tutorial was made
   with Chrome 68. If you're using an earlier or later version, some features may look different
   or not be available.
1. <a class="external gc-analytics-event" href="https://glitch.com/edit/#!/tony" target="_blank"
   rel="noopener" data-category="CTA" data-label="{% dynamic print request.path %}">Open the
   source code for the site</a>. This tab will be referred to as the *editor tab*.

     <figure>
       <img src="imgs/editor.png" alt="The editor tab."/>
       <figcaption>
         <b>Figure X</b>. The editor tab
       </figcaption>
     </figure>

1. Click **tony**. A menu appears.

     <figure>
       <img src="imgs/menu.png" alt="The menu that appears after clicking 'tony'."/>
       <figcaption>
         <b>Figure X</b>. The menu that appears after clicking <b>tony</b>
       </figcaption>
     </figure>

1. Click **Remix This**. The name of the project changes from **tony** to some randomly-generated
   name. You now have your own editable copy of the code. Later on, you'll make changes to this
   code.
1. Click **Show Live**. The demo opens in a new tab. This tab will be referred to as the *demo
   tab*.

     <figure>
       <img src="imgs/demo.png" alt="The demo tab."/>
       <figcaption>
         <b>Figure X</b>. The demo tab
       </figcaption>
     </figure>

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac)
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS). Chrome DevTools
   opens up alongside the demo.

     <figure>
       <img src="imgs/devtools.png" alt="DevTools and the demo."/>
       <figcaption>
         <b>Figure X</b>. DevTools and the demo
       </figcaption>
     </figure>

For the rest of the screenshots in this tutorial, DevTools will be shown as a separate window. You
can do this by pressing <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the Command
Menu, typing `Undock`, and then selecting **Undock into seperate window**.

<figure>
  <img src="imgs/undocked.png" alt="Undocked DevTools."/>
  <figcaption>
    <b>Figure X</b>. Undocked DevTools
  </figcaption>
</figure>

### Establish a baseline {: #baseline }

The baseline is a record of how the site performed before you made any performance improvements.

1. Click the **Audits** tab. It may be hidden behind the **More Panels**
   ![More Panels](imgs/more-panels.png){:.inline-icon} button. There's a Lighthouse on this
   panel because the project that powers the Audits panel is called
   [Lighthouse](/web/tools/lighthouse).

     <figure>
       <img src="imgs/audits.png" alt="The Audits panel."/>
       <figcaption>
         <b>Figure X</b>. The Audits panel
       </figcaption>
     </figure>

1. Match your audit configuration settings to those in **Figure X**.
1. Click **Run Audits**. After 10 to 30 seconds, the Audits panel shows you a report of the site's
   performance.

     <figure>
       <img src="imgs/report.png" alt="The Audits panel's report of the site's performance."/>
       <figcaption>
         <b>Figure X</b>. The Audits panel's report of the site's performance
       </figcaption>
     </figure>

### Understand your report {: #report }

The number at the top of your report is the overall performance score for the site. Later, as you
make changes to the code, you should see this number rise. A higher score means better performance.

<figure>
  <img src="imgs/overall.png" alt="The overall performance score."/>
  <figcaption>
    <b>Figure X</b>. The overall performance score
  </figcaption>
</figure>

The **Metrics** section provides quantitative measurements of the site's performance. Each metric
provides insight into a different aspect of the performance. For example, **First Contentful Paint**
tells you when content is first painted to the screen, which is an important milestone in the user's
perception of the page load, whereas **First CPU Idle** marks when the main thread is quiet enough
to handle user input, which is essentially a proxy for when the user can first interact with the
page.

<figure>
  <img src="imgs/metrics.png" alt="The Metrics section."/>
  <figcaption>
    <b>Figure X</b>. The Metrics section
  </figcaption>
</figure>

Hover over a metric to see a description of it, and click **Learn More** to read documentation
about it.
 
<figure>
  <img src="imgs/fmp.png" alt="Hovering over the First Meaningful Paint metric."/>
  <figcaption>
    <b>Figure X</b>. Hovering over the First Meaningful Paint metric
  </figcaption>
</figure>

Below **Metrics** is a collection of screenshots that show you how the page looked as it loaded.

<figure>
  <img src="imgs/screenshots.png" alt="Screenshots of how the page looked while loading."/>
  <figcaption>
    <b>Figure X</b>. Screenshots of how the page looked while loading
  </figcaption>
</figure>

The **Opportunities** section provides specific tips on how to improve this particular page's
load performance.

<figure>
  <img src="imgs/opportunities.png" alt="The Opportunities section."/>
  <figcaption>
    <b>Figure X</b>. The Opportunities section
  </figcaption>
</figure>

Click an opportunity to learn more about it.

<figure>
  <img src="imgs/compression.png" alt="More information about the text compression opportunity."/>
  <figcaption>
    <b>Figure X</b>. More information about the text compression opportunity
  </figcaption>
</figure>

Click **Learn More** to see documentation about why an opportunity is important, and specific
recommendations on how to fix it.

<figure>
  <img src="imgs/reference.png" alt="Documentation for the text compression opportunity."/>
  <figcaption>
    <b>Figure X</b>. Documentation for the text compression opportunity
  </figcaption>
</figure>

The **Diagnostics** section provides more information about factors that contribute to the page's
load time.

<figure>
  <img src="imgs/diagnostics.png" alt="The Diagnostics section"/>
  <figcaption>
    <b>Figure X</b>. The Diagnostics section
  </figcaption>
</figure>

The **Passed Audits** section shows you what the site is doing correctly. Click to expand the
section.

<figure>
  <img src="imgs/passed.png" alt="The Passed Audits section."/>
  <figcaption>
    <b>Figure X</b>. The Passed Audits section
  </figcaption>
</figure>

## Step 2: Experiment {: #experiment }

The **Opportunites** section of your audit report gives you tips on how to improve the
page's performance. In this section, you implement the recommended changes to the codebase,
auditing the site after each change to measure how it affects site speed.

### Enable text compression {: #compression }

Your report says that enabling text compression is one of the top opportunities for
improving the page's performance.

Before you enable compression, here are a couple of ways you can manually check whether
text resources are compressed.

1. Click the **Network** tab.

     <figure>
       <img src="imgs/network.png" alt="The Network panel."/>
       <figcaption>
         <b>Figure X</b>. The Network panel
       </figcaption>
     </figure>

1. Click **Use Large Request Rows** ![Use Large Request Rows][large]{: .inline-icon }. The
   height of the rows in the table of network requests increases.

     <figure>
       <img src="imgs/largerows.png" alt="Large rows in the network requests table."/>
       <figcaption>
         <b>Figure X</b>. Large rows in the network requests table
       </figcaption>
     </figure>

[large]: /web/tools/chrome-devtools/network-performance/imgs/large-resource-rows-button.png

1. If you don't see the **Size** column in the table of network requests, click the table
   header and then select **Size**.
1. Each **Size** cell shows two values. The top value is the size of the transferred resource.
   The bottom value is the size of the uncompressed resource. If the two values are the same,
   then the resource is not being compressed when it's sent over the network.

You can also check for compression by inspecting a resource's headers:

1. Click **bundle.js**.
1. Click the **Headers** tab.

     <figure>
       <img src="imgs/headers.png" alt="The Headers tab."/>
       <figcaption>
         <b>Figure X</b>. The Headers tab
       </figcaption>
     </figure>

1. Search the **Response Headers** section for a `content-encoding` header. You shouldn't see one,
   meaning that `bundle.js` was not compressed. When a resource *is* compressed, this header is
   usually set to `gzip`, `deflate`, or `br`. See [Directives][Directives]{:.external} for an
   explanation of these values.

[Directives]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding#Directives

Enough with the explanations. Time to make some changes!
Enable text compression by adding a couple of lines of code:

1. In the editor tab, click **server.js**.
1. Add the following code to **server.js**. Make sure to put `app.use(compression())` before
   `app.use(express.static('build'))`.

     <pre>
       ...
       const fs = require('fs');
       <strong>const compresion = require('compression');</strong>

       <strong>app.use(compression());</strong>
       app.use(express.static('build'));
       ...
     </pre>

     <aside class="note">
       <b>Note</b>: Usually, you'd have to install the <code>compression</code> package via
       something like <code>npm i -S compression</code>, but this has already been done for you.
     </aside>

1. Wait for Glitch to rebuild the site. The fancy animation that you see next to **Logs** and
   **Show** means that the site is getting rebuilt and redeployed.

     <figure>
       <img src="imgs/building.png" 
            alt="The animation that indicates that the site is getting built."/>
       <figcaption>
         <b>Figure X</b>. The animation that indicates that the site is getting built
       </figcaption>
     </figure>

   The change is ready when you see **Show Live** again.

Use the workflows that you learned earlier to manually check that the compression is working:

1. Go back to the demo tab and reload the page. The **Size** column should now show 2 different
   values for text resources like `bundle.js`. In **Figure X** the top value of `264 KB` for
   `bundle.js` is the size of the file that was sent over the network, and the bottom value of
   `1.4 MB` is the uncompressed file size.

     <figure>
       <img src="imgs/requests.png" 
            alt="The Size column now shows 2 different values for text resources."/>
       <figcaption>
         <b>Figure X</b>. The Size column now shows 2 different values for text resources
       </figcaption>
     </figure>

1. The **Response Headers** section for `bundle.js` should now include a `content-encoding: gzip`
   header.

     <figure>
       <img src="imgs/gzip.png" 
            alt="The Response Headers section now contains a content-encoding header."/>
       <figcaption>
         <b>Figure X</b>. The Response Headers section now contains a 
         <code>content-encoding</code> header
       </figcaption>
     </figure>


Audit the page again to measure what kind of impact text compression has on the page's load
performance:

1. Click the **Audits** tab.
1. Click **Perform an audit** ![Perform an audit](imgs/perform.png){: .inline-icon }.
1. Leave the settings the same as before.
1. Click **Run audit**.
  
     <figure>
       <img src="imgs/compressionreport.png" 
            alt="The audit report after enabling text compression."/>
       <figcaption>
         <b>Figure X</b>. The audit report after enabling text compression
       </figcaption>
     </figure>

Woohoo! That looks like progress. Your overall performance score should have increased,
meaning that the site is getting faster.

### Resize images {: #images }

Your new report says that properly sizing images is another big opportunity.

1. In your report, click **Properly size images** to see what images should be
   resized. It looks like all 4 images are bigger than necessary.

     <figure>
       <img src="imgs/resize.png" 
            alt="Details about the 'properly size images' opportunity."/>
       <figcaption>
         <b>Figure X</b>. Details about the <i>Properly size images</i> opportunity
       </figcaption>
     </figure>

1. Back in the editor tab, open `src/model.js`.
1. Replace `const dir = 'big'` with `const dir = 'small'`. **Figure X** highlights the
   line that you should replace.

     <figure>
       <img src="imgs/model.png" 
            alt="Editing model.js."/>
       <figcaption>
         <b>Figure X</b>. Editing <code>model.js</code>
       </figcaption>
     </figure>

1. Audit the page again to see how this change affects load performance.

     <figure>
       <img src="imgs/resizereport.png" 
            alt="The audit report after resizing images."/>
       <figcaption>
         <b>Figure X</b>. The audit report after resizing images</code>
       </figcaption>
     </figure>

Looks like the change only has a minor affect on the overall performance score. However, one thing
that the score doesn't show clearly is how much network data you're saving your users. The total
size of the old photos was around 5.3 megabytes, whereas now it's only about 0.18 megabytes.

#### Resizing images in the real world {: #strategies }

For a small app, doing a one-off resize like this may be good enough. But for a
large app, this obviously isn't scalable. Here are some strategies for managing images in
large apps:

* Resize images during the build process.
* Create multiple sizes of each image during the build process and then use `srcset` in your code.
  At runtime, the browser takes care of choosing what size is best for the device it's running on. 
* Use an image CDN that lets you dynamically resize an image when you request it.

See [Essential Image Optimization][addy]{: .external target="_blank" rel="noopener" } by Addy
for more tips.

[addy]: https://images.guide/

### Eliminate render-blocking resources {: #render }

Your latest report says that eliminating render-blocking resources is now the biggest opportunity.

A render-blocking resource is an external JavaScript or CSS file that the browser must
download, parse, and execute before it can show the page. The goal is to only run the core
CSS and JavaScript code that is required to display the page properly.

The first task, then, is to find code that doesn't need to be executed on page load.

1. Click **Eliminate render-blocking resources** to see which resources are blocking first paint.
   The opportunity says that you should focus on `lodash.js` and `jquery.js`.

     <figure>
       <img src="imgs/render.png" 
            alt="More information about the 'reduce render-blocking resources' opportunity."/>
       <figcaption>
         <b>Figure X</b>. More information about the <i>Reduce render-blocking resources</i>
         opportunity
       </figcaption>
     </figure>


1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open
   the Command Menu, start typing `Coverage`, and then select **Show Coverage**.
1. Click **Reload** ![Reload](imgs/reload.png){: .inline-icon }.
1. The jQuery file includes comments. You can reduce the file size by minifying this file.
1. ... All of those `webpack://` URLs seem to indicate that the site is using the development
   mode of webpack. You'll revisit this later.

It's unclear whether the resources are needed to load the page. The Request Blocking tab can
show you what happens when the resources aren't available. If the page still loads when the
resources aren't available, then there's no reason to block rendering while waiting for these
resources.

1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
  Command Menu.
1. Start typing `blocking` and then select **Show Request Blocking**. This UI lets you block
   resources. You're going to block the network requests for the 2 render-blocking resources, and
   then see if the site still loads correctly. If it does, then there's no reason for these
   resources to block 
1. Click **Add Pattern**, type `/libs/*`, and then press <kbd>Enter</kbd> to confirm.
1. Click **Remove all patterns** to remove the request blocks.

Another tool that can help you determine if a file is needed during page load is the Coverage tab.
While a page loads, the Coverage tab records what code from each file is executed.

In this particular case, it seems like the scripts aren't used whatsoever, so you can remove them
completely from the code.

1. ...

In your own code, you might discover resources that aren't required for page load, but are
needed later for page interactions. In these cases, you can mark the scripts with the `async`
property.

### Ship less JavaScript code {: #splitting }

### Do less JavaScript work {: #js }

## Summary {: #summary}

## Next steps {: #next-steps }

* Check out the rest of the audits. When you configured the Audits panel, you disabled the
  audits for best practices, progressive web apps, SEO, and accessibility. Re-enable these
  categories and then run an audit on your own site to learn how to improve these aspects
  of your site.
* Leave feedback. Please take a moment to leave feedback in the next section. I really do
  use the data to make better tutorials for you.

## Feedback {: #feedback }

TODO
