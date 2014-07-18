---
layout: article
title: "A Look at the Gulp Tasks"
description: ""
introduction: ""
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
id: using-wsk-styleguide
collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Whats the Build Doing?

When you're up and running with Web Starter Kit you can quickly build a production
ready version of your site with the simple `gulp` command. There is a lot
going on behind the scenes, so let's take a quick look and what is happening.

The main tasks Web Starter Kit does for a build is as follows:

1. Build Styles

    First the build will build the Sass in your project as well as build the Sass
    in the styleguide. After the Sass has been compiled to CSS, the build
    uses an autoprefixer over everything.

2. Check your Javascript for Problems

    The second build step is to run JSHint over your javascript. If you haven't
    come across JSHint before, it's a tool that examines your Javascript and
    throws an error or warning for common issues of errors. A simple example
    is using a variable in a function, where the variable isn't defined anywhere.

3. Building the HTML Pages

    The next step examines your HTML files looking for two things.

    The first is a build block for CSS. A build block looks like the following:

    `<!-- build:css styles/main.min.css -->
    <link rel="stylesheet" href="styleguide/styles/styleguide.css">
    <link rel="stylesheet" href="styles/custom.css">
    <!-- endbuild -->`

    This is just a specially formatted set of comments which the build process
    finds, and picks out the CSS files inside the comment, in this case
    styleguide.css and custom.css, and minifies the CSS and concatenates them
    into main.min.css.

    Minification is just the process of removing any spare characters we can
    from the CSS file. For example spaces and comments aren't needs and removing
    them makes the files smaller to download.

    Concatenates, means nothing more than just pasting the contents of multiple
    files into one. The reason we do this is so that the browser only has to
    make one request rather than multiple.

    The second build block the task looks for is Javascript. Much like the CSS
    build block, the Javascript is minified and concatenated. The syntax is
    identical except instead of 'build:css' we have 'build:js'.

    `<!-- build:js scripts/main.min.js -->
    <script src="scripts/main.js"></script>
    <!-- endbuild -->`

    After the build blocks for a page have been handled, the build process will
    minify the HTML page itself.

5. Optimise the Images

    The next task optimises our images. This task looks at the kind of images you
    have an optimises them accordingly.

    For jpeg and PNG's it simply strip out meta data, like what camera was used
    to take the photo, for SVG's it'll look at any attributes which aren't needed
    or any whitespace and comments that exist.

6. Copy of the Fonts

    A really quick task to copy our fonts over into the final build

7. Copy over Any Files in the Root

    If the build finds any files in the root directory of the project it will
    copy them over into the final build.

That's a lot to cram in to one little, albeit powerful command.

## Building? Check. What About Development?

Where the build process helps you look after the housekeeping of your project,
Web Starter Kit has some added goodies which help you improve your development
workflow.

Well by running your site with the `gulp serve` command, you get the following
out of the box.

### First up is Live Reload.

If you've built web pages before and not used Live Reload, then chances are you've
gone through the pain of making changes and finding your browser
window, hitting Ctrl+r to refresh the page and check your changes.

Live Reload simply removes the manual refresh step, you can make changes in your
editor and see them take affect immediately in a browser window.

<!-- TODO:  Insert Image of Editing Code and Live Reload Occuring -->

### Testing Across All the Things

Live Reload is great for quick checking of changes, but what about testing across
multiple browsers or devices and wanting to check a change at the bottom of the
page?

That's where Browser Sync can help.

Any scrolls, taps or keyboard presses will be shared across any connected browser.

<!-- TODO:  Insert Image of Scrolling and Tapping -->

Combine the two of these and we have a very powerful developer environment.

<!-- TODO:  Changing and scrolling -->

## Serving Production

## Building Production

{% include modules/nextarticle.liquid %}

{% endwrap %}
