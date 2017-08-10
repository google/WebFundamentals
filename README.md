# Web Fundamentals on DevSite 

[![Build Status](https://travis-ci.org/google/WebFundamentals.svg?branch=master)](https://travis-ci.org/google/WebFundamentals)

Welcome to the new Web**Fundamentals**! An effort to showcase best practices and tools for modern Web Development. 


### What's changed?

* We're now using the [DevSite](https://developers.google.com/) infrastructure
  * New [style guide](https://petele-scratch.appspot.com/web/resources/style-guide)
  * New [widgets](https://petele-scratch.appspot.com/web/resources/widgets) allow inline JavaScript, common links, related guide and more 
* Jekyll has been eliminated, instead pages are rendered at request time
* Front-matter has been eliminated from the markdown, but files now require a [simple set of tags](https://petele-scratch.appspot.com/web/resources/writing-an-article#yaml-front-matter)

### What stays the same?

* GitHub is still our source of truth for content, 
* We want your contributions, either PR's, issues, whatever!
* The latest will be staged at https://web-central.appspot.com/web/

## Cloning the repo
If you have a high bandwidth connection, I recommend starting with a fresh clone
of the repo.

```
git clone https://github.com/google/WebFundamentals.git
```

## Getting set up
The new DevSite infrastructure simplifies the dependencies a lot. Ensure
you have a recent version of [Node](https://nodejs.org/en/) and the 
[AppEngine SDK for Python](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
already installed.

1. Run `npm install` (needed for the build process)

## Build the auto-generated files
Some files (contributors includes, some pages for updates, showcases, etc) are
automatically generated. The first time you clone the repo and run `npm install`,
this is done for you. However, when you add a case study, update, etc., you'll
need to re-build those files using:

```
npm run build
```

## Update the code labs
To update the Code Labs, you'll need the
[`claat`](https://github.com/googlecodelabs/tools/tree/master/claat) tool, and
access to the original Doc files. This will likely only work for Googlers.

1. Download the `claat` tool and place it in your `tools` directory.
1. Run `tools/update-codelabs.sh`
1. Check the latest changes into GitHub

## Start the development server
1. Run `npm start`

## Test your changes before submitting a PR
Please run your changes through npm test before submitting a PR. The test
looks for things that may cause issues with DevSite and tries to keep our
content consistent. It's part of the deployment process, so PRs will fail
if there are any errors! To run:

```
npm test
```

TEST
