project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-06-08 #}
{# wf_published_on: 2018-06-01 #}
{# wf_blink_components: Platform>DevTools #}

# Improve Load Performance With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Goal of tutorial

This tutorial teaches you how to use Chrome DevTools to find ways to make your web pages
load faster.

## Prerequisites

You should have basic web development experience, similar to the level of experience
outlined in this [Introduction to Web Development][intro] syllabus. You don't need to
know anything about load performance.

[intro]: https://www.coursera.org/learn/web-development

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


## Step 1: Audit the page {: #audit }

Whenever you set out to improve a site's load performance, **always start with an audit**.
The audit has 2 important functions:

* It creates a baseline for you to measure subsequent changes against.
* It gives you actionable tips on what changes will have the most impact.

### Set up {: #setup }

1. Go to `chrome://version` to check what version of Chrome you're using. This tutorial was made with
   Chrome 68. If you're using an earlier or later version, some features may look different or not be available.
   You should be able to complete most of the tutorial. Just keep in mind that the UI may look different
   than what you see in this tutorial's screenshots.
1. <a class="gc-analytics-event" href="https://glitch.com/edit/#!/tony" target="_blank" rel="noopener"
   data-category="CTA" data-label="{% dynamic print request.path %}">Open the source code for the site</a>.
   This tab will be referred to as the **editor tab**.

     <figure>
       <img src="imgs/editor.png" alt="The editor tab."/>
       <figcaption>
         <b>Figure X</b>. The editor tab
       </figcaption>
     </figure>

1. Click **tony**. A menu appears.
1. Click **Remix This**. The name of the project changes from **tony** to some randomly-generated name. You now
   have your own editable copy of the code.
1. Click **Show Live**. The demo opens in a new tab. This tab will be referred to as the **demo tab**.

     <figure>
       <img src="imgs/demo.png" alt="The demo tab."/>
       <figcaption>
         <b>Figure X</b>. The demo tab
       </figcaption>
     </figure>

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac)
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS). Chrome DevTools opens up alongside
   the demo.

<figure>
  <img src="imgs/devtools.png" alt="DevTools."/>
  <figcaption>
    <b>Figure X</b>. DevTools
  </figcaption>
</figure>

### Establish a baseline {: #baseline }

The baseline is a record of how the site performed before you made any performance improvements.

1. Click the **Audits** tab. It may be hidden behind the **More Panels**
   ![More Panels](imgs/more-panels.png){:.inline-icon} button. There's a Lighthouse on this
   page because the project that powers the Audits panel is called [Lighthouse](/web/tools/lighthouse).

     <figure>
       <img src="imgs/audits.png" alt="The Audits panel."/>
       <figcaption>
         <b>Figure X</b>. The Audits panel
       </figcaption>
     </figure>

1. Match your audit configuration settings to those in **Figure X**.
1. Click **Run Audits**.

### Understand your report {: #report }

The number at the top of your report is the overall performance score for the page. Later, as you make
changes to the code, you should see this number rise. A higher score means better performance.

The **Metrics** section provides quantitative measurements of the page's performance. Each metric provides
insight into a different aspect of the page's performance. For example, **First Contentful Paint** tells you
when content is first painted to the screen, which is an important milestone in the user's perception of the
page load, whereas **First CPU Idle** marks when the main thread is quiet enough to handle user input, which
is essentially a proxy for when the user can interact with the page.

Hover over a metric to see a description of it, and click **Learn More** to read documentation about it.

Below **Metrics** is a collection of screenshots that show you how the page looked as it loaded.

The **Opportunities** section provides specific tips on how to improve this particular page's load performance.

The **Diagnostics** section provides more information about factors that contribute to the page's load time.

The **Passed Audits** section shows you what the page is doing correctly.

## Step 2: Experiment {: #experiment }

When you attempt to optimize a page, it's best to make a single change at a time, and then
run an audit after each change, so that you can be sure that this isolated change is actually
the cause of change in load performance.

### Eliminate render-blocking resources {: #crp }

The Audits panel report says that the greatest opportunity to speed up the page's load performance
is to reduce render-blocking resources.

What are render-blocking resources? When a page references external JavaScript or CSS files, the browser
must download, parse, and execute those files before it can finish loading, or rendering, the page.

#### View unused code {: #coverage }

1. Click **Eliminate render-blocking resources** to see which resources are blocking first paint.

First, you need to see if the render-blocking resources are needed for the page load. If the page
needs these resources in order to display the page, then it's necessary for these resources to
be render-blocking. The Coverage tab can help with this analysis.

1. The jQuery file includes comments. You can reduce the file size by minifying this file.
1. ... All of those `webpack://` URLs seem to indicate that the site is using the development mode of
   webpack. You'll revisit this later.

#### Block requests {: #block }

It's unclear whether the resources are needed to load the page. The Request Blocking tab can show you
what happens when the resources aren't available. If the page still loads when the resources aren't
available, then there's no reason to block rendering while waiting for these resources.

1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the Command Menu.
1. Start typing `blocking` and then select **Show Request Blocking**. This UI lets you block resources.
   You're going to block the network requests for the 2 render-blocking resources, and then see if the
   site still loads correctly. If it does, then there's no reason for these resources to block 
1. Click **Add Pattern**, type `/libs/*`, and then press <kbd>Enter</kbd> to confirm.
1. Click **Remove all patterns** to remove the request blocks.

Another tool that can help you determine if a file is needed during page load is the Coverage tab. While
a page loads, the Coverage tab records what code from each file is executed.

In this particular case, it seems like the scripts aren't used whatsoever, so you can remove them
completely from the code.

1. ...

In your own code, you might discover resources that aren't required for page load, but are
needed later for page interactions. In these cases, you can mark the scripts with the `async`
property.

### Enable text compression {: #compression }

Use Network panel to view transmitted / uncompressed

    const compresion = require('compression');
    app.use(compression());

### Resize images

// TODO build a little image resizer on tony.glitch.me, and then use that API to serve resized images...
// this might work https://www.npmjs.com/package/resize-img

For this particular app, there didn't seem to be a straightforward way to automate the process of
resizing images. But nonetheless, it's good to see the potential savings, so 

1. Open `src/model.js'.
1. Replace each instance of `../imgs/` with `../imgs/small/`.

### Reduce JS activity {: #js }

### Reduce render-blocking scripts and stylesheets {: #crp }

Use Request Blocking to experiment with changes.

Code coverage to identify

### Ship less JS code {: #splitting }



## Summary {: #summary}

1. Run an audit to measure your baseline performance.
1. 


## Next steps {: #next-steps }

### Convince your company to invest in load performance

### Get help from the DevTools community

## Feedback {: #feedback }

TODO
