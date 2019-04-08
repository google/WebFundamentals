project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Polymer Starter Kit.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2019-04-08 #}

# Polymer Starter Kit {: .page-title }

[Download Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## What is the Polymer Starter Kit?

The [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external }
is a starting point for building apps using a drawer-based layout. The layout 
is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

## Setup

### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### Initialize project from template

    mkdir my-app
    cd my-app
    polymer init polymer-3-starter-kit

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    npm start

### Build

The `npm run build` command builds your Polymer application for production, using 
build configuration options provided by the command line or in your project's 
`polymer.json` file.

You can configure your `polymer.json` file to create multiple builds. This is 
necessary if you will be serving different builds optimized for different 
browsers. You can define your own named builds, or use presets. See the 
documentation on 
[building your project for production](https://www.polymer-project.org/3.0/toolbox/build-for-production)
for more information.

The Polymer Starter Kit is configured to create three builds. These builds will 
be output to a subdirectory under the `build/` directory as follows:

```
build/
  es5-bundled/
  es6-bundled/
  esm-bundled/
```

* `es5-bundled` is a bundled, minified build with a service worker. ES6 code is 
compiled to ES5 for compatibility with older browsers.
* `es6-bundled` is a bundled, minified build with a service worker. ES6 code is 
served as-is. This build is for browsers that can handle ES6 code - see 
[building your project for production](https://www.polymer-project.org/3.0/toolbox/build-for-production#compiling)
for a list.
* `esm-bundled` is a bundled, minified build with a service worker. It uses 
standard ES module import/export statements for browsers that support them.

Run `polymer help build` for the full list of available options and optimizations. 
Also, see the documentation on the 
[polymer.json specification](https://www.polymer-project.org/3.0/docs/tools/polymer-json)
and [building your Polymer application for production](https://www.polymer-project.org/3.0/toolbox/build-for-production).

### Preview the build

This command serves your app. Replace `build-folder-name` with the folder name of the build you want to serve.

    npm start build/build-folder-name/

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/tools/tree/master/packages/web-component-tester)
against the browsers currently installed on your machine:

    npm test

If running Windows you will need to set the following environment variables:

- LAUNCHPAD_BROWSERS
- LAUNCHPAD_CHROME

Read More here [daffl/launchpad](https://github.com/daffl/launchpad#environment-variables-impacting-local-browsers-detection).

## Next Steps

Check out the [getting started guide](https://polymer-library.polymer-project.org/3.0/docs/first-element/intro){: .external }.

## Learn More

To learn more, see the code, submit an issue, or to get involved, check out
our Git repo at [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }
