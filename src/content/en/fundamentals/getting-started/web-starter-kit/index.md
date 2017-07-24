project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sometimes the hardest part of a new project is getting started. Web Starter Kit gives you a solid base with a range of tools to help you along the development process.

{# wf_updated_on: 2017-07-14 #}
{# wf_published_on: 2014-07-16 #}

# Start Your Site with Web Starter Kit {: .page-title }

Caution: This article has not been updated in a while and may not reflect reality. Be sure to check the Web Starter Kit [documentation](https://github.com/google/web-starter-kit/) for the latest details.

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

This guide steps you through the process of building a new site with Web
Starter Kit and helps you make the most out of the tools it supplies.

<div style="clear:both;"></div>

## Development phases

During development, there are three commands that you'll use regularly: `gulp serve`, `gulp`, and `gulp serve:dist`. Let’s look at how each one contributes to the development process.


### Start a Local Server

The first task we’ll look at is: `$ gulp serve`.

On the surface, this task starts a local HTTP server so you can view your site
in a browser, but behind the scenes there are some extra tools at work.

#### Live Reload

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Live reload eliminates the traditional refresh dance of making a change in the
editor, switching to the browser, hitting CTRL-R, and then waiting for the page
to reload.

With Live Reload, you can make changes in your editor and see them take effect
immediately in any browser with your site open.


#### Testing Across Devices

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Browser Sync helps you test your site across multiple devices. Any scrolls,
taps, or keyboard presses will be shared across any connected browser.

This only works when you run your site with `gulp serve`. Try it out by running
`gulp serve`, open the URL in two browser windows side by side and scroll
one of the pages.

<div style="clear:both;"></div>

#### Automate Prefixing

When targeting a range of browsers, you’ll need to use vendor prefixes to
ensure you can use features in each of them. Web Starter Kit automates all of
the prefixing for you.

Our example CSS (below) doesn’t include any vendor prefixes:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

The build process runs the CSS through the autoprefixer which produces the
final output below:

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

#### Check Your JavaScript

JSHint is a tool which scans your JavaScript code to check for possible problems
with your JavaScript logic and [enforces coding best practices](//www.jshint.com/docs/){: .external }.

The tool runs whenever you build the project or, if you are running gulp server,
whenever you make a change to a JavaScript file.

#### Compile Your Sass

While you are running the serve command, any changes made to any of the Sass
files in your project will get compiled into CSS and prefixed, after which your
page will be reloaded with Live Reload.

For those new to Sass, the project describes itself as a “CSS
extension language”. Essentially it’s CSS with some extra features. For example,
it adds support for variables and functions, which help you structure your CSS
in a modular and reusable fashion.

### Build a Production Version of Your Site

You can build a production ready version of your site with the simple `gulp`
command. This command runs some of the tasks we’ve seen already, with additional
tasks aimed at making your site load faster and more efficiently.

The main tasks the production build performs are:

#### Build Styles

First the build will compile the Sass in your project. After the Sass has been
compiled, the Autoprefixer runs over all the CSS.

#### Check your JavaScript for problems

The second build step runs JSHint over your JavaScript.

#### Build the HTML Pages

The next step examines your HTML files, looking for build blocks to concatenate
and minify JavaScript. After the JavaScript is taken care of, the build process
minifies the HTML page.

Minification reduces the number of characters in the final JavaScript file by
removing comments or space characters that aren’t actually needed, as well as
some other techniques. This reduces the final file size, speeding up your
site’s load time.

Concatenation means pasting the contents of multiple files into one. The reason
we do this is so that the browser only has to make one request to a server
rather than many, which is faster for your users.

A build block has everything needed to manage which JavaScript files we minify
and concatenate together. Let’s look at a sample build block:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

A build block is nothing more than a specially formatted comment.
All of your javascript files between the build block will be merged
(concatenated) and minified into one file named main.min.js and
the the final build will replace these scripts with the script tag:

    <script src="scripts/main.min.js"></script>

#### Optimize any image assets

For JPEGs and PNGs, the meta data in the image is stripped out; it isn’t needed
to render the image. The meta data includes information such as the camera used
to take the photo.

For SVGs, it’ll remove any attributes which aren’t needed or any whitespace and
comments that exist.

#### Copy Fonts

This simple task copies our fonts from the app to the the final build directory.

#### Copy over Any Files from the Root Directory

If the build finds any files in the root directory of the project, it will copy
them over into the final build as well.

### Test Your Production Build

Before you push anything into production, you need to make sure everything works
as you'd expect. The `gulp serve:dist` command builds a production version of your site,
starts a server, and opens a browser for you. This **doesn’t have Live Reload or
Browser Sync**, but it’s a reliable way of testing your site before deploying it.


## Set up Web Starter Kit


Web Starter Kit relies on NodeJS, NPM, and Sass to work. Once these are installed, you'll have everything you need to start using Web Starter Kit in your projects.


### Install These One Time Dependencies

There are two tool sets you need to install on your machine before you can build
sites with Web Starter Kit: NodeJS and NPM, & Sass.

#### NodeJS & NPM

Web Starter Kit’s build tools need Node and NPM. Node is used to run Gulp, the
task runner. NPM is used to download the modules needed to perform certain tasks
in Gulp.

If you aren’t sure if you have NodeJS and NPM, check by opening a command prompt and
running `node -v`. If Node responds, check the version matches the current version
on NodeJS.org.

If you don’t get a response or have an old version then go to NodeJS.org and
click the big green Install button. NPM will be installed with NodeJS
automatically.

### Set Up Your Web Starter Kit Project

The first step is to go to [/web/tools/starter-kit/](/web/tools/starter-kit/)
and download and extract the zip. This will be the basis for your project so rename the folder and put it somewhere relevant on your machine. For the rest of this guide we'll call the folder `my-project.`

Next, you need to install the local dependencies for Web Starter Kit. Open a
command prompt, change directory into your project folder and run the following npm
install scripts.

    cd my-project
    npm install
    npm install gulp -g

That’s it! You now have everything that's needed to use the Gulp tools in Web Starter
Kit.


Note: If you see permission or access errors such as `EPERM` or `EACCESS`, do not use `sudo` as a work-around. Consult <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>this page</a> for a more robust solution.

<!--
The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">
