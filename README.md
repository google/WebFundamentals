# Web Fundamentals on DevSite 

## Getting Set Up
1. Get [App Engine SDK for Python](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
2. Install Python dependencies: `pip install markdown -t ./gae/lib`
2. If you haven't already, install gulp globally: `npm install -g gulp`
3. Run `npm install` (needed for the build process)

## Build the auto-generated files
Use **gulp** to build the auto-generated files, such as the RSS & ATOM feeds,
index pages for updates, shows, showcases, etc.

To use, run:
    gulp build


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

## Test Your Changes Before Submitting a PR
To test your changes before submitting a pull request, run:

    gulp test

Note: As we migrate files over there are still many files that fail, so for the
time being, you can skip this step. In the future, this will be part of the
pull request verification, and PRs will not be merged if there are any failures.
