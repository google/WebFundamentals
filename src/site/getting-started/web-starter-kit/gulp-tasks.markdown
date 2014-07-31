---
layout: article
title: "A Look at the Gulp Tasks"
description: "The Web Starter Kit gives you a lot of helpful tools out of the box and
it might seem slightly overwhelming, but breaking down the most common tasks
and exploring what each one does will quickly demystify the magic of this kit."
introduction: "When using Web Starter Kit there are 3 particular commands that
you'll use on a regular basis, one simply helps with starting a server but has
some extremely helpful tools to help with development, the second command builds
a production version of your site, ready to deploy and the third command
let's you quickly check the production version of your site by creating a server
only using the production assets."
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
id: using-wsk-styleguide
#collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Using a Local Server

The first task we'll be looking at is...

    $ gulp serve

This task builds a version of your site that is perfect for development and
starts a local HTTP server to serve it to your browser.

The reason this task is perfect for development, other than being an easy way
to start a server, is the tools it gives youe.

### First up is Live Reload.

If you've built web pages before and not used Live Reload, then chances are you've
gone through the refresh dance of making changes, clicking your browser
window, hitting Ctrl+r, watching the refresh before checking your changes.

Live Reload simply removes the manual refresh step, you can make changes in your
editor and see them take affect immediately in a browser window.

<video controls>
     <source src="video/wsk-livereload-demo.mp4" type="video/mp4">
     <p>This browser does not support the video element.</p>
</video>

### Testing Across All the Things

Live Reload is great for quick checking of changes, but what about testing across
multiple browsers or devices and wanting to check a change at the bottom of the
page?

That's where Browser Sync can help.

Any scrolls, taps or keyboard presses will be shared across any connected browser.

<video controls>
     <source src="video/wsk-browsersync-demo.mp4" type="video/mp4">
     <p>This browser does not support the video element.</p>
</video>

### Autoprefixing for Your Convenience

When targeting a range of browsers you'll need to use vendor prefixes to ensure
you can use features in each of them. This is normally a cumbersome task and can
be error prone, so we automated it for you.

Look at the example CSS class below:

   .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;

      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

This doesn't have the vendor prefixes, but the production version in *dist/* and the
version served up when you run `gulp serve` will run the CSS through the autoprefixer
which produces the result below

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      height: 60px;
      position: relative;
      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;
      margin: 0 auto;
    }

### Check Your Javascript

Everyone has those moments where they write some javascript, run it and realise
that it was never going to because of a silly mistake.

JSHint is a tool that catches a lot of common issues with javascript logic as
well as enforces good styling practices (i.e. flag when a variable is used but
never defined before it's used).

JSHint will run whenever you change your javascript and you're running `gulp serve`,
otherwise it will run when build your site (see below).

### Update Your Sass

While you are running the serve command, any changes made to any of the Sass files
in your project will get compiled into CSS, Autoprefixed and your page will be
reloaded.

## Development Server? Check. What About the Production Build?

You can quickly build a production ready version of your site with the simple
`gulp` command. There is a lot going on when you run this,
so let's take a quick look and what is happening.

The production build will do many of the same things the server does, i.e.
Autoprefixing and JSHint'ing, but it also runs a plethora of other
tasks, all aimed to give you an efficient and fast site.

The main tasks Web Starter Kit performs are:

1. Build Styles

    First the build will compile the Sass in your project. After the Sass has
    been compiled to CSS, the build runs the autoprefixer over everything.

2. Check your Javascript for Problems

    The second build step is to run JSHint over your javascript.

3. Building the HTML Pages

    The next step examines your HTML files looking for two things.

    The first is a build block for CSS. A build block looks like the following:

        <!-- build:css styles/main.min.css -->
        <link rel="stylesheet" href="styleguide/styles/styleguide.css">
        <link rel="stylesheet" href="styles/custom.css">
        <!-- endbuild -->

    This is a specially formatted comments where the CSS files are picked
    out, in this case styleguide.css and custom.css, and Gulp minifies the CSS
    and concatenates all the files together and then uses the path in the comment
    to create the minified CSS file, in this example - styles/main.min.css.

    Minification is just the process of removing any spare characters we can
    from the CSS file. For example spaces and comments aren't needed and removing
    them makes the files smaller and faster to download.

    Concatenation means nothing more than just pasting the contents of multiple
    files into one. The reason we do this is so that the browser only has to
    make one request to a server rather than lots.

    The second build block the task looks for is Javascript. Much like the CSS
    build block, the Javascript is minified and concatenated. The syntax is
    identical except instead of 'build:css' we have 'build:js'.

        <!-- build:js scripts/main.min.js -->
        <script src="scripts/main.js"></script>
        <!-- endbuild -->

    After the build blocks for a page have been handled, the build process will
    minify the HTML page itself.

5. Optimise All the Images

    The next task is to optimise our images. This task looks at the kind of
    images you have an optimises them accordingly.

    For jpeg and PNG's the meta data in the image is stripped out. The meta data
    is information like, what camera was used to take the photo and isn't needed
    by the browser. For SVG's it'll remove any attributes which aren't needed
    or any whitespace and comments that exist.

6. Copy of the Fonts

    A simple task to copy our fonts over into the final build

7. Copy over Any Files in the Root

    If the build finds any files in the root directory of the project it will
    copy them over into the final build as well.

That's a lot to cram in to one little, albeit powerful, command.

## Serving Production

From time to time you'll want to check that the production build is working as
expected and this is where `gulp serve:dist` command can help.
It'll build a production version of your site, start a server for those files
and finally open a browser.

This doesn't have Live Reload or Browser Sync, but it's a realible way of
testing your site before deploying it.

{% include modules/nextarticle.liquid %}

{% endwrap %}
