---
layout: article
title: "Write and Debug Your Code"
description: "TBD."
key-takeaways:
  code:
    - Identify and follow UX patterns; visual style guides aren't a-nice-to-have.
    - Before you write any code, set the foundation for responsive and performant pages.
  debug:
    - Incorporate responsive design and speed in your debuggin steps.
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

The Web Starter Kit comes with a visual style guide, key UX pat
terns built into the boilerplate, and tooling to test responsiven
ess and performance.

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## Track style and performance changes 

Use the `gulp watch` tool to automatically watches files. 
This tool supports live reloading in your browser and lets you sync changes across devices to debug changes as they go live.

This tool also runs optimization tools based on the type of change. You can also use these optimization tools on their own, depending on what you want to do.

TODO: I have a feeling that gulp watch doesn't just track-- it actually optimizes too. Once I confirm this, I need to make sure that I change the title and wording of this section.

Assuming gulp does action the optimization automatically, how do your project files change, what's the output, where is it in comparison to source? What does it mean the next time you work on source files? I need to get a sense of what's going on inside the project folder.

TODO: Work with the tool to get a feel for a natural workflow.

Questions to answer:

Does gulp watch always work in the background, or is it one of those things you run to check everything in one go and re-run when you want to re-check?

What does the `gulp watch' results look like? We should include these in the doc. Each type of result could go in the relevant sections below.

Would a table work better here instead of individual sections? It's nice to have headers for the different tools, but it might be unnecessary.

### Minify pages and check page performance

Use the `gulp html' tool to minify pages.

Use the `gulp pagespeed' tool to return pagespeed insights on your pages.

### Apply UX patterns

Need to cover style guide-- where is it, how can it be used?
Als cover default UX patterns that come with starter files.

### Optimize images, styles, and fonts

Use the `gulp styles` tool to optimize css.

Use the `gulp images` tool to optimize images.

TODO: find out what this is for! use the `gulp fonts` tool to create webfonts. 

### Check your JavaScript

Use the 'gulp jshint' tool to detect problems in your JavaScript code.

## Use pagespeed for performance optimization

Check and see if you can pass a local url into pagespeed as part of debugging before deploying? Ultimately I want to cover pagespeed UX and performance rules in this doc, as part of coding and debugging. But if you can't pass a local version into the tool, then it will have to be part of build doc.

This will include two tables with UX rules and performance rules, and what to do when those rules don't pass. Table format should work here.

### Enter local staging url in Pagespeed insights

TBD.

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
