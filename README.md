Web Fundamentals <material-branch> [![Build Status](https://travis-ci.org/google/WebFundamentals.svg?branch=material-branch)](https://travis-ci.org/google/WebFundamentals)
================

Web Fundamentals is a technical documentation center for multi-device web
development.  Our goal is to build a resource for modern web developers
that’s as curated and thorough as developer.android.com or iOS Dev Center.

Content plan
------------
Content plan for Web Fundamentals is tracked through GitHub Issues and our [Site Structure + Content Inventory](http://goo.gl/nWDD0M) doc


Release status
--------------

The project was soft launched in late April with a formal v1 launch in June 2014.  We've now moved to a six-week rolling release cycle.

Project Structure
-----------------

This is a Jekyll build.

```
/appengine - the server to host the static content
/src - the documentation
  /_langs - the content in each language
    /en - the base language folder
      /getting-started - the getting started articles
      /multi-device-layouts - responsive design guide
      /introduction-to-media - the guide to using media
      /optimizing-performance - the perf articles
      /using-touch - managing touch
      /showcase - the case-studies
      ...etc...
    /<langcode> - overrides for that language, following the main path structure.
```

The site is generated in `/build`, but is never checked in.


Contributing
------------

Web Fundamentals is an open source project and we welcome your contributions!
Before submitting a pull request, please review [CONTRIBUTING.md](CONTRIBUTING.md)
and make sure that there is an issue filed describing the fix or new content.
If you don't complete these steps, we won't be able to accept your pull request, sorry.


Installing Dependencies
=======================

Mac
---

1. Install [XCode Command Line Tools](https://developer.apple.com/xcode/downloads/)
1. Install [NVM](https://github.com/creationix/nvm)
    * `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash`
1. Install node
    * [https://nodejs.org/en/]()
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

Running the site
================

Once you have all the dependencies installed go to the root of the checked out repo and type:

```
gulp
```

This will have Jekyll build the site, run a static server to listen on
port 7331 (which you can now reach at
[http://localhost:7331/web/](http://localhost:7331/web/)),
and watch for changes to site files. Every change will cause Jekyll to rebuild
the affected files.

If you want to build a single language then run this: `gulp --lang en`.

If you want to build a specific section then run this: `gulp --section shows`.

These can be combined: `gulp --lang en --section shows`

Learning More About Jekyll and Liquid Used
-------------------------------------------

We have a styleguide which you can access at [http://localhost:7331/web/styleguide/](http://localhost:7331/web/styleguide/) that should get you up and running with a lot of the custom and useful info.


Translations
============

See [our translations guide](TRANSLATION.md)

Building Shows
==============

You need the python [Google API client](https://developers.google.com/api-client-library/python/start/installation)

For Linux:

    pip install --upgrade google-api-python-client
