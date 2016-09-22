# Web Fundamentals on DevSite 

Welcome to the new Web**Fundamentals**! 

### What's changed?

* We're now using the [DevSite](https://developers.google.com/) infrastructure
  * New [style guide](https://petele-scratch.appspot.com/web/resources/style-guide)
  * New [widgets](https://petele-scratch.appspot.com/web/resources/widgets) allow inline JavaScript, common links, related guide and more 
* Jekyll has been eliminated, instead pages are rendered at request time
* Front-matter has been eliminated from the markdown, but files now require a [simple set of tags](https://petele-scratch.appspot.com/web/resources/writing-an-article#yaml-front-matter)

### What stays the same?

* GitHub is still our source of truth for content, 
* We want your contributions, either PR's, issues, whatever!
* The latest will be staged at [https://web-central.appspot.com/web/] (coming soon)

## Getting set up
1. Get [App Engine SDK for Python](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
2. Install Python dependencies: `pip install markdown -t ./gae/lib`
2. If you haven't already, install gulp globally: `npm install -g gulp`
3. Run `npm install` (needed for the build process)

## Build the auto-generated files
Use **gulp** to build the auto-generated files, such as the RSS & ATOM feeds,
index pages for updates, shows, showcases, etc.

To use, run:
```
gulp build
```

## Update the code labs
To update the Code Labs, you'll need the
[`claat`](https://github.com/googlecodelabs/tools/tree/master/claat) tool, and
access to the original Doc files. This will likely only work for Googlers.

1. Download the `claat` tool and place it in your `tools` directory.
1. Run `tools/update-codelabs.sh`
1. Check the latest changes into GitHub

## Serve the files
1. If you haven't already, build the auto-generated files
1. Run `start-appengine.sh`

## Test your changes before submitting a PR
To test your changes before submitting a pull request, run:

    gulp test

