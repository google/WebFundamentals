# Web Fundamentals on DevSite

[![Build Status](https://travis-ci.org/google/WebFundamentals.svg?branch=main)](https://travis-ci.org/google/WebFundamentals)
[![License](https://img.shields.io/github/license/google/WebFundamentals)](https://github.com/google/WebFundamentals/blob/main/LICENSE)

Welcome to the new [Web Fundamentals](https://developers.google.com/web/fundamentals)! An effort to showcase best practices and tools for modern Web Development.


### What's changed?

* We're now using the [DevSite](https://developers.google.com/) infrastructure
  * New [style guide](https://petele-scratch.appspot.com/web/resources/style-guide)
  * New [widgets](https://petele-scratch.appspot.com/web/resources/widgets) allow inline JavaScript, common links, related guide and more
* Jekyll has been eliminated. Instead, pages are rendered at request time
* Front-matter has been eliminated from the markdown, but files now require a [simple set of tags](https://petele-scratch.appspot.com/web/resources/writing-an-article#yaml-front-matter)

### What stays the same?

* GitHub is still our source of truth for content,
* We want your contributions, either PRs, issues, whatever!
* The latest is staged at https://web-central.appspot.com/web/

## Cloning the repo
If you have a high-bandwidth connection, I recommend starting with a fresh clone
of the repo.

```
git clone https://github.com/google/WebFundamentals.git
```

## Getting set up
The new DevSite infrastructure simplifies the dependencies a lot. Ensure that
you have [Python](https://www.python.org/downloads/), [Node](https://nodejs.org/en/) 10-12, and the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts) already installed.

Login to [Google Cloud via command line](https://cloud.google.com/sdk/gcloud/reference/auth/login).

1. Run `npm install` (needed for the build process)

## Building the auto-generated files
Some files (contributors includes, some pages for updates, showcases, etc.) are
automatically generated. The first time you clone the repo and run `npm install`,
this is done for you. However, when you add a case study, update, etc., you'll
need to re-build those files using:

```
npm run build
```

## Starting Local Server

To view the site locally, just run:

```
npm start
```

**Note:** The first time you start the server, you may need to run
`start-appengine.sh` and answer any prompts provided by `dev_appserver.py`.

## Updating the code labs
To update the Code Labs, you'll need the
[`claat`](https://github.com/googlecodelabs/tools/tree/master/claat) tool and
access to the original Doc files. This will likely only work for Googlers.

1. Download the `claat` tool and place it in your `tools` directory
1. Run `tools/update-codelabs.sh`
1. Check the latest changes into GitHub

## Starting the development server
1. Run `npm start` in the terminal.

## Testing your changes before submitting a PR
Please run your changes through npm test before submitting a PR. The test
looks for things that may cause issues with DevSite and tries to keep our
content consistent. It's part of the deployment process, so PRs will fail
if there are any errors! To run:

```
npm test
```
