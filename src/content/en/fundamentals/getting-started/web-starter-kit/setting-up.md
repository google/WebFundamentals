project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: If you are new to Web Starter Kit, then this guide is for you. It steps through how to get up and running with Web Starter Kit as quickly as possible.

<p class="intro">
  Web Starter Kit relies on NodeJS, NPM, and Sass to work. Once these are installed, you'll have everything you need to start using Web Starter Kit in your projects.
</p>



## Install These One Time Dependencies

There are two tool sets you need to install on your machine before you can build
sites with Web Starter Kit: NodeJS, NPM, & Sass.

### NodeJS & NPM

Web Starter Kit’s build tools need Node and NPM. Node is used to run Gulp, the
task runner. NPM is used to download the modules needed to perform certain tasks
in Gulp.

If you aren’t sure if you have NodeJS and NPM, check by opening a command prompt and
running `node -v`. If Node responds, check the version matches the current version
on NodeJS.org.

If you don’t get a response or have an old version then go to NodeJS.org and
click on the big green Install button. NPM will be installed with NodeJS
automatically.

## Set Up Your Web Starter Kit Project

The first step is to go to [https://developers.google.com/web/tools/starter-kit/](/web/tools/starter-kit/)
and download and extract the zip. This will be the basis for your project so rename the folder and put it somewhere relevant on your machine. For the rest of this guide we'll call the folder `my-project.`

Next, you need to install the local dependencies for Web Starter Kit. Open a
command prompt, change directory into your project folder and run the following npm
install scripts.

    cd my-project
    npm install
    npm install gulp -g

That’s it! You now have everything that's needed to use the Gulp tools in Web Starter
Kit.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">


