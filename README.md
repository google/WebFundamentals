Web Fundamentals [![Build Status](https://travis-ci.org/google/WebFundamentals.svg?branch=master)](https://travis-ci.org/google/WebFundamentals)
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

Technology
----------

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

The site is generated in `/appengine/build`, but is never checked in.


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
1. Install node 0.10.x
    * `nvm install 0.10`
    * `nvm use 0.10`
1. Install [RVM](https://rvm.io/rubies/default)
    * `curl -sSL https://get.rvm.io | bash`
1. Set RVM Default to 2.2.0
    * `rvm install ruby-2.2.0`
    * `rvm --default use 2.2.0`
1. Install [Pygments](http://pygments.org/)
    * `easy_install pygments`
1. Install [RubyGems](https://rubygems.org/) dependencies ([Jekyll](http://jekyllrb.com/) and [Kramdown](http://kramdown.gettalong.org/))
    * `rvm . do bundle install`
1. Install [Node.js](http://nodejs.org/)
1. Install the [Grunt CLI](http://gruntjs.com/)
    * `npm install -g grunt-cli`
1. Install [npm](https://www.npmjs.org) dependencies
    * `npm install`
1. Install fontforge if required for grunt-webfont on your OS.  See [grunt-webfont installation instructions](https://github.com/sapegin/grunt-webfont/blob/master/Readme.md#installation) for details.

**Note:** On OSX, you may see an error about *Warning: EMFILE, too many open files*. If so you will need to 
increase the maximum number of open file handles.  Use `ulimit -n 1024` to increase the maximum number of open files to 2048 from the default of 256, or add `launchctl limit maxfiles 2048 2048 ` to `.bashrc` or `.zshrc`.

**Note:** On OSX, you may also see an error about *Allow dev_appserver to check for updates on startup? (Y/n)* and, many lines below it, *EOFError: EOF when reading a line*. If so you need to run dev_appserver once in a GAE project to allow `dev_appserver` to ask you about checking for updates. Choose whichever answer you like; this just clears the prompt for future runs of `dev_appserver` and you should be good to go.


Running the site
================

Once you have all the dependencies installed go to the root of the checked out repo and type:

```
grunt develop
```

This will have Jekyll build the site, run a static server to listen on port 8081 (which you can now reach at [http://localhost:8081/web/fundamentals/](http://localhost:8081/web/fundamentals/)), and watch for changes to site files. Every change will cause Jekyll to rebuild the affected files.

If you want to build a single language then run this: `grunt develop --lang=en`.


Alternative dev workflow based on Docker
========================================

In this configuration the only requirement is [Docker](https://docs.docker.com/installation/).

Once you clone this repo, start building the site right away:

```sh
tools/docker.sh grunt build
```

or run a local dev server:

```sh
tools/docker.sh grunt develop
# then point your browser to http://localhost:8081/web/fundamentals
```

Essentially, prefix `grunt` command with `tools/docker.sh` and it will run inside a Docker container,
which includes all the dependencies needed to build the site.

If you want to experiment with your own Docker image instead of using `google/webfundamentals-dev`,
modify `Dockerfile` in the root of this repo and build your image:

```sh
docker build -t myimage .
```

Once the image is built, use it with `tools/docker.sh`:

```sh
WF_DOCKER_IMAGE=myimage tools/docker.sh grunt develop
```


Using project-level meta data
=============================

The table of contents is generated from `src/_project.yaml`

To parse the `_project.yaml` file, include `{% injectdata content _project.yaml %}` in the page. You then have access to the variables in the page object.


Generating Table of Contents
----------------------------

The table of contents is generated from `src/_book.yaml`

To parse the `_book.yaml` file, include `{% injectdata content _book.yaml %}` in the page and then iterate as follows:

     {% for section in page.content.toc %}
        SOME MARKUP
     {% endfor %}

Jekyll Special elements
-----------------------

* Code import: `{% highlight javascript %} {% include sample1.js %} {% endhighlight %}`
* `{{ articles _category_}}` a list of articles in divs, ordered by the "order" preamble.
* `{{ showcases _category_}}` a list of showcases.


Translations
============

See [our translations guide](TRANSLATION.md)

