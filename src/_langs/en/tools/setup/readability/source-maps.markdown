---
layout: article
title: "Map Minified Code to Source Code"
seotitle: "Map Minified Code to Source Code Using Source Maps"
description: "Keep your client-side code readable and debuggable even after you've combined and minified it."
introduction: "Keep your client-side code readable and debuggable even after you've combined and minified it. Use source maps to map your source code to your minified code."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-22
  order: 2
authors:
  - megginkearney
priority: 0
collection: readability
key-takeaways:
  source-maps:
    - Use source maps to map minified code to source code. You can then read and debug compiled code in it's original source.
    - Only use minifiers capable of creating source maps, for example, ClosureCompiler, SASS.
    - Verify your web server can server source maps.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.source-maps %}

## What are source maps?

A [source maps](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1) is a JSON-based mapping format that creates a relationship between a minified file and its sources. When you build for production, along with minifying and combining your JavaScript files, you generate a source map that holds information about your original files. 

The source map causes DevTools to load your original files in addition to your minified ones. You then use the originals to set breakpoints and step through code. Meanwhile, Chrome is actually running your minified code. This gives you the illusion of running a development site in production.

Here's an example of a simple source map:

`{
    version : 3,
    file: "out.min.js",
    sourceRoot : "",
    sources: ["foo.js", "bar.js"],
    names: ["src", "maps", "are", "fun"],
    mappings: "AAgBC,SAAQ,CAAEA"
}`

Also take a look at the special build of the [font dragr tool](http://dev.fontdragr.com) in Chrome, with source mapping enabled, and you'll notice that the JavaScript isn't compiled and you can see all the individual JavaScript files it references. This is using source mapping, but behind the scenes actually running the compiled code. Any errors, logs and breakpoints will map to the dev code for awesome debugging! So in effect it gives you the illusion that you're running a dev site in production.

## Use a minifier capable of creating source maps

You need to use a minifier that's capable of creating source maps. Closure Compiler and UglifyJS 2.0 are two such tools but there are also tools available that create source maps for CoffeeScript, SASS and many others. See the [Source maps: languages, tools and other info](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) wiki page.

## Enable source maps

Sourcemaps are enabled by default (as of Chrome 39), but if you'd like to double-check or enable them, first open DevTools and click the settings cog ![gear](imgs/gear.png). Under **Sources**, check **Enable JavaScript source maps**. You might also check **Enable CSS source maps**.

[Enable source maps](imgs/source-maps.png)

## Make the source map accessible

To tell DevTools that a source map is available, verify the following line is at the end of the minified file.

`//# sourceMappingURL=/path/to/file.js.map`

This line, usually added by whatever tool generated the map, is what enables DevTools to associate minified with unminified files. In CSS, the line would look like `/*# sourceMappingURL=style.css.map */`.

If you don't want an extra comment in your file, use an HTTP header field on the minified JavaScript file to tell DevTools where to find the source map. This requires configuration or customization of your web server and is beyond the scope of this document.

`X-SourceMap: /path/to/file.js.map`

Like the comment, this tells DevTools where to look for the source map associated with a JavaScript file. This header also gets around the issue of referencing source maps in languages that don't support single-line comments.

## Verify web server can serve source maps

Some web servers, like Google App Engine for example, require explicit configuration for each file type served. In this case, your source maps should be served with a MIME type of `application/json`, but Chrome will actually [accept any content-type](http://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files), for example `application/octet-stream`.


## Demo showing @sourceURL and displayName in action

While not part of the source map spec, the `@sourceURL` allows you to make development much easier when working with evals. This helper looks very similar to the `//# sourceMappingURL` property and is actually mentioned in the source map V3 specifications.

By including the following special comment in your code, which will be evaled, you can name evals and inline scripts and styles so they appear as more logical names in your dev tools.

`//# sourceURL=source.coffee`

Navigate to this
**[demo](http://www.thecssninja.com/demo/source_mapping/compile.html)**, then:
* Open the DevTools and go to the **Sources** panel.
* Enter in a filename into the _Name your code:_ input field.
* Click on the **compile** button.
* An alert will appear with the evaluated sum from the CoffeeScript source.

If you expand the _Sources_ sub-panel you will now see a new file with the custom filename you entered earlier. If you double-click to view this file it will contain the compiled JavaScript for our original source. On the last line, however, will be a `// @sourceURL` comment indicating what the original source file was. This can greatly help with debugging when working with language abstractions.

![Working with sourceURL](imgs/coffeescript.jpg)

## Additional source maps resources

* Conditional breakpoints
* [Breakpoint actions in JavaScript](http://www.randomthink.net/blog/2012/11/breakpoint-actions-in-javascript/)
* Working With Source Maps
* [The Breakpoint: Source maps spectacular](https://www.youtube.com/watch?feature=player_embedded&v=HijZNR6kc9A)
* [HTML5 Rocks: An Introduction To JavaScript Source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
* [NetTuts: Source Maps 101](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/)
* [Source maps: languages, tools and other info](https://github.com/ryanseddon/source-map/wiki/Source-maps%3A-languages%2C-tools-and-other-info)
* [CSS Ninja: Multi-level Source maps](http://www.thecssninja.com/javascript/multi-level-sourcemaps)
* [Source maps for CoffeeScript](http://www.coffeescriptlove.com/2012/04/source-maps-for-coffeescript.html)

{% include modules/nextarticle.liquid %}

{% endwrap %}