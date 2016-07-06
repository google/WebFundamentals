# Web Fundamentals <master> [![Build Status](https://ci.cloudware.io/api/badges/google/WebFundamentals/status.svg)](https://ci.cloudware.io/google/WebFundamentals)

`master` staging: https://web-central.appspot.com/web/
<hr>

Web Fundamentals is a technical documentation center for multi-device web
development.  Our goal is to build a resource for modern web developers
that’s as curated and thorough as developer.android.com or iOS Dev Center.

# Installing Dependencies

To build and run this project you need to have Ruby, Node and NPM.

## Mac

1. Install [XCode Command Line Tools](https://developer.apple.com/xcode/downloads/)
1. Install node
    * [https://nodejs.org/en/](https://nodejs.org/en/)
1. Install [RVM](https://rvm.io/rubies/default)
    * `curl -sSL https://get.rvm.io | bash`
1. Set RVM Default to 2.2.0
    * `rvm install ruby-2.2.0`
    * `rvm --default use 2.2.0`
1. Install [Pygments](http://pygments.org/)
    * `easy_install pygments`
1. Install bundler
    * `gem install bundler`
1. Install [RubyGems](https://rubygems.org/) dependencies ([Jekyll](http://jekyllrb.com/) and [Kramdown](http://kramdown.gettalong.org/))
    * `rvm . do bundle install`
1. Install the [Gulp CLI](http://gulpjs.com/)
    * `npm install -g gulp`
1. Install [npm](https://www.npmjs.org) dependencies
    * `npm install`
1. Get the [App Engine SDK](https://cloud.google.com/appengine/downloads) and unzip into the google_appengine folder inside the project root. Add it to your path accordingly (in bash, `$ PATH=./google_appengine:$PATH`)

# Running the site

To run the site:

    gulp

This will compile styles & javascript and build the site with Jekyll. If thats
all working, it will start a server on port 7331 (which you can reach at
[http://localhost:7331/web/](http://localhost:7331/web/)).


Any changes to files will result in the appropriate tasks be running in gulp.

## Faster Jekyll Builds

To make the build faster you can define a language and/or section of the site
be built.

If you want to build a single language then run this:

    gulp --lang en

If you want to build a specific section then run this:

    gulp --section shows

These can be combined like so:

    gulp --lang en --section shows

## Learning More About Jekyll and Liquid Used

We have a resource area which you can access at [https://web-central.appspot.com/web/resources/?hl=en](https://web-central.appspot.com/web/resources/?hl=en) that should get you up and running with a lot of the custom and useful info.

# View staged pull requests and branches

**Note: this feature is experimental.**

The build process automatically creates staging sites for all pull requests.

To access the staging site for a pull request:

1. Open the pull request on `github.com`.
2. Click **Show All Checks**.
3. Click **Details** next to the **Builder** check. The staging site opens
   up in a new tab.

You can also access each staging site directly, using the following URL:

    https://pr-<NUMBER>-dot-weasel-dot-web-central.appspot.com

Where `<NUMBER>` is the pull request number. For example, the URL for
PR #1000 would be:

    https://pr-1000-dot-weasel-dot-web-central.appspot.com

Staged branches are also available at:

    <branch>-dot-weasel-dot-web-central.appspot.com

Where `<branch>` is the name of the branch.

**The URL pattern for pull requests and branches may change without notice.**

# Translations

See [our translations guide](https://developers.google.com/web/resources/translations/)

# Building Shows

You need the python [Google API client](https://developers.google.com/api-client-library/python/start/installation)

For Linux:

    pip install --upgrade google-api-python-client

# Content plan

Content plan for Web Fundamentals is tracked through GitHub Issues and our [Site Structure + Content Inventory](http://goo.gl/nWDD0M) doc

# Release status

The project was soft launched in late April with a formal v1 launch in June 2014.  We've now moved to a six-week rolling release cycle.

# Project Structure

This is a Jekyll build.

```
/appengine-config - The server to host the static content
/gulp-tasks - The tasks available to Gulp split by responsibility (styles, scripts etc.)
/src - The documentation
  /content - The content in each language
    /en - The base language folder. Sub folders are sections of the site
      /fundamentals
      /showcase
      /shows
      ...etc...
    /<langcode> - Overrides for that language, following the en structure.
  /jekyll -
    /_config - These are files which define specific settings for the setup of the page
    /_data - These are static strings and their translations
    /_includes - These a snippets of HTML you can include in a page
    /_layouts - There are layouts you can reference in the YAML of your doc
    /_plugins - This is the guts of Web Fundamentals.
  /static
    /imgs - Images used in Web Fundamentals
    /scripts - Javascript - not used in final deployment of WF only local
    /styles - Sass for web fundamentals
    /third_party
  /tests
  /tools
```

The site is generated in `/build`, which is never checked in.

# Contributing

Web Fundamentals is an open source project and we welcome your contributions!
Before submitting a pull request, please review [CONTRIBUTING.md](CONTRIBUTING.md)
and make sure that there is an issue filed describing the fix or new content.
If you don't complete these steps, we won't be able to accept your pull request, sorry.
