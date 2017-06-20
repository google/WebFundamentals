project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-06-13T00:06:04Z #}
{# wf_published_on: 2016-01-01 #}


# Lab: sw-precache and sw-toolbox {: .page-title }




Concepts:  [Using sw-precache and sw-toolbox](using-sw-precache-and-sw-toolbox)

<div id="overview"></div>


## Overview




The sw-precache module and sw-toolbox (Node.js) library make it easy to create production-quality service workers. This lab shows you how to use `sw-precache` and `sw-toolbox` to build the service worker programmatically, and provide different routing mechanisms for your service worker to use.

#### What you will learn

* Generate service workers using sw-precache and sw-toolbox
* Create sw-toolbox routes matching popular caching strategies
* Integrate sw-precache into your gulp build process
* Run sw-precache from the command line

#### What you should already know

* Basic HTML, CSS, and JavaScript
* ES2015 Promises
* How to run commands from the command line
* Familiarity with gulp

#### What you will need

* Computer with terminal/shell access
* Connection to the internet 
* A  [browser that supports service worker](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/sw-precache-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __sw-precache-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab. 

This folder contains:

* __css/main.css__ is the cascading stylesheet for the sample page
* __images__ folder contains sample images
* __js/toolbox-scripts.js__ is our custom sw-toolbox script
* __gulpfile.js__ is where we will write the sw-precache gulp task
* __index.html__ is a sample HTML page
* __sw-precache-config.json__ is an optional configuration file for using sw-precache from the command line

<div id="2"></div>


## 2. Install the global tools




[sw-precache](https://github.com/GoogleChrome/sw-precache) and  [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) are available as Node packages that can be used with gulp. In this section we install the gulp command line tool on your system. 

Install the gulp command line interface by running the following in the command line:

    npm install --global gulp-cli

#### Explanation

This installs the gulp command line interface globally so you can use it from the command line without having to type the full path to the version of gulp. 

<div id="3"></div>


## 3. Installing gulp, sw-precache, and sw-toolbox plugins




Because `sw-precache` and `sw-toolbox` are Node.js based applications, we can incorporate them into a gulp-based workflow. First, we will initialize a node package file and install gulp. 

### 3.1 Run npm init

From __app/__ (the project root), run the following in the command line:

    npm init -y

Note that a __package.json__ file was created.

#### Explanation

This command initializes a node package file, __package.json__ (the `-y` flag uses default configuration values for simplicity). Node uses __package.json__ to store information about the project and its dependencies.

### 3.2 Install gulp plugin

From the same directory (__app/__), run the following in the command line:

    npm install gulp --save-dev

This command downloads the necessary dependencies for gulp. Note that a __node_modules__ directory has been added to the project with various packages. Also note that __package.json__ now lists "gulp" as a dependency.

### 3.3 Install sw-precache and sw-toolbox

From the same directory (__app/__), run the following from the command line:

    npm install --save-dev path sw-precache sw-toolbox

#### Explanation

Here we install the `sw-precache` and `sw-toolbox` packages. We also install the `path` package, which will simplify the process of building the correct file paths in the code.

<div id="4"></div>


## 4. Creating the service worker with sw-precache and gulp




Sw-precache allows you generate service workers that precache static assets.

### 4.1 Include the necessary plugins in the gulpfile

In <strong>gulpfile.js</strong> replace TODO 4.1 with the following code:

#### gulpfile.js

```
var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');
```

#### Explanation

This code imports the packages and assigns them to variables so that they are easier to reference when creating the task.

### 4.2 Generate the service worker

Use `sw-precache` to generate a service worker as part of a gulp build process.  

In <strong>gulpfile.js</strong> replace TODO 4.2 with the following code:

#### gulpfile.js

```
var paths = {
  src: './'
};

gulp.task('service-worker', function(callback) {
  swPrecache.write(path.join(paths.src, 'service-worker.js'), {
    staticFileGlobs: [
      paths.src + 'index.html',
      paths.src + 'css/main.css'
    ],
    importScripts: [
      'node_modules/sw-toolbox/sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: paths.src
  }, callback);
});
```

Save the file. To test the code, enter the following command at the project root (__app/__):

    gulp service-worker

A __service-worker.js__ script is created in __app/__. Open the __service-worker.js__ file in a text editor and look at the code for yourself.

Refresh the app in the browser and then [inspect the cache](tools-for-pwa-developers#storage) (you may need to refresh the cache). You should see that all files in the `staticFileGlobs` array have been added to the cache.

#### Explanation

The code first creates a variable, `paths`, to define the path of the source files.

The call to `swPrecache.write()` does the following:

1. Uses the `path` module to join `paths.src` (the location of our source code) with the string `service-worker.js` to indicate the name and location of the service worker. 
2. Writes an `install` event listener in the service worker that adds all the files in `staticFilesGlobs` to the cache (in this case, __index.html__ and __main.css__).
3. Writes an  [importScripts](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) method in the service worker that imports the scripts under `importScripts`. 
4. Strips the prefixes from the files to make them relative URLs using the `stripPrefix` method.

<div id="5"></div>


## 5. Creating routes with sw-toolbox




The `sw-toolbox` library lets you add service worker routes to enable run-time caching in your application. 

Replace TODO 5 in <strong>js/toolbox-script.js</strong> with the following code:

#### toolbox-script.js

```
// Route #1
global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 20,
  },
  origin: /\.googleapis\.com$/
});

// Route #2
global.toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
  cache: {
    name: 'images-cache',
    maxEntries: 50
  }
});
```

Save the code and [unregister the service worker](tools-for-pwa-developers#unregister) in the browser. Refresh the page once or twice so that the new service worker installs and begins to intercept the network requests. [Inspect the cache](tools-for-pwa-developers#storage) in the browser. You should see the `googleapis` cache populated with the Google web font, and the `images-cache` containing all of the fetched images.

#### Explanation

This code sets up several  [routes](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-usage) that serve specific URLs, file types, and origins.

Route #1 creates a new cache called `googleapis` and stores up to 20 items (the `maxEntries` value) originating from any domain that matches the origin (any URL that ends with __googleapis.com__). The route uses the  [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) strategy to access resources. It first checks if the cache contains the resource. If that fails, it sends the request to the network and caches the response.

Route #2 also uses the cache-first strategy. It matches all the files ending in __png__, __gif__, or __jpg__ (image files) using a regular expression and stores them in the `images-cache` cache with a limit of 50 items in the cache. If a new item is added to a full cache, then the oldest is deleted to make space. 



Note: You can add <code>toolbox.options.debug = true;</code> to the script for more verbose console logs.



#### For more information

*  [sw-toolbox Usage Tutorial](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-usage)
*  [sw-toolbox API tutorial](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api.html)
*  [Express Routing](http://expressjs.com/en/guide/routing.html)

<div id="6"></div>


## 6. Optional: Creating the service worker in the command line




### 6.1 Install sw-precache globally

This exercise generates a service worker using the `sw-precache` command line tool. 

In the terminal window, run the following command:

    npm install --global sw-precache

#### Explanation

This command installs `sw-precache` globally and makes the `sw-precache` command available from any location.

### 6.2 Create the sw-precache-config file

The `sw-precache` command line tool can be passed a configuration file to specify the options for the service worker.

Copy and paste the following code into the __sw-precache-config.json__ file:

#### sw-precache-config.json

```
{
  "staticFileGlobs": [
    "index.html",
    "css/main.css"
  ],
  "importScripts": [
    "node_modules/sw-toolbox/sw-toolbox.js",
    "js/toolbox-script.js"
  ]
}
```

Save the file.

#### Explanation

The JSON configuration file provides all the information `sw-precache` needs to generate the service worker.

#### For more information

*  [sw-precache Command Line Interface](https://github.com/GoogleChrome/sw-precache#command-line-interface)

### 6.3 Run sw-precache from the command line

In your terminal window, run the following command:

    sw-precache --config=sw-precache-config.json --verbose

If you test the new service worker in the browser the result should be the same as in the previous section.

#### Explanation

This command generates a service worker file (or overwrites the file if it already exists) using the options provided in `sw-precache-config.json`. The `--verbose` flag makes the success or error message more detailed.

<div id="congrats"></div>


## Congratulations!




You have learned how to use `sw-precache` and `sw-toolbox` to build a service worker programmatically and to provide different routing mechanisms for your service worker to use.

### What we've covered

* Installing nvm, Node, and npm
* Installing gulp, sw-precache, and sw-toolbox plugins
* Installing gulp-cli and sw-precache globally to use from the command line
* Using sw-precache in a gulp-workflow to generate a service worker
* Using sw-precache from the command line to generate a service worker

### Resources

*  [sw-precache - Github](https://github.com/GoogleChrome/sw-precache)
*  [sw-precache - npm](https://www.npmjs.com/package/sw-precache)
*  [sw-toolbox - Github](https://github.com/GoogleChrome/sw-toolbox)
*  [sw-toolbox Usage Tutorial](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-usage)
*  [Offline-first, fast, with the sw-precache module](/web/updates/2015/02/offline-first-with-sw-precache)
*  [Instant Loading Web Apps With A Service Worker Application Shell Architecture](https://addyosmani.com/blog/application-shell/)
*  [Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/blob/master/README.md)


