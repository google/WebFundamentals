project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-06-14T20:49:00Z #}
{# wf_published_on: 2016-01-01 #}


# Using sw-precache and sw-toolbox {: .page-title }




Codelab:  [sw-precache and sw-toolbox](lab-sw-precache-and-sw-toolbox)

<div id="intro"></div>


## Introduction




In this text we'll cover `sw-precache` and `sw-toolbox`, two Node packages created by Google to automate the creation of service workers, and to make the creation of custom caching routes easier. We'll explore how to use `sw-precache` from the command line, how to build routes using `sw-toolbox,` and how to integrate both tools into a gulp-based workflow.

<div id="routes"></div>


## Creating routes with sw-toolbox




`sw-toolbox` simplifies the process of intercepting network requests in the service worker and performing some caching strategy with the request/response.

Before you can use `sw-toolbox`, you must first install the package in your project from the command line:

```
npm install sw-toolbox
```

To use `sw-toolbox` you define  *routes*  and include them in your service worker. Routes behave like `fetch` event listeners, but are a more convenient way of creating custom handlers for specific requests.

Routes look like this:

```
toolbox.router.get(urlPattern, handler, options)
```

A route intercepts requests that match the specified URL pattern and HTTP request method, and responds according to the rules defined in the request handler. The HTTP request method is called on `toolbox.router` (in the example above it's `get`) and can be any of the methods defined  [here](https://googlechrome.github.io/sw-toolbox/api.html#main). The `options` parameter lets us define a cache to use for that route, as well as a network timeout if the handler is the built-in `toolbox.networkFirst`. See the  [Tutorial: API](https://googlechrome.github.io/sw-toolbox/api.html#main) for more details.

Routes can be added directly to an existing service worker, or written in a separate JavaScript file and imported into the service worker using the `importScripts` method. Before the routes can be used, the `sw-toolbox` Node script itself must also be imported into the service worker from the __node_modules__ folder. For example, you could include the following snippet at the bottom of your service worker to import both the `sw-toolbox` package and a JavaScript file containing your custom routes:

importScripts("./node_modules/sw-toolbox/sw-toolbox.js","./js/toolbox-script.js");



Note: Be sure to include the sw-toolbox package as the first argument in importScripts, so that your custom routes' dependencies exist in the service worker before being called.



### Built-in Handlers

`sw-toolbox` has five built-in handlers to cover the most common caching strategies (see the  [Tutorial: API](https://googlechrome.github.io/sw-toolbox/api.html#main) for the full list and the  [Caching strategies table](#strategies) below for a quick reference). For more information about caching strategies see the  [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/).

Let's look at an example:

```
toolbox.router.get('/my-app/index.html', global.toolbox.networkFirst, {networkTimeoutSeconds: 5});
```

This intercepts all `GET` requests for __/my-app/index.html__ and handles the request according to the built-in "network first" strategy. In this approach the request is first sent to the network, and if that succeeds the request/response pair is added to the cache. If it fails, it tries to get the response from the cache. We have set the `networkTimeoutSeconds` option to `5` so that the app fetches the response from the cache if the network doesn't respond within 5 seconds.

To define "wildcards" (URL patterns for matching more than one file), or if you need to match a cross-origin request, sw-toolbox has two options: Express style routing and regular expression routing.

#### For more information

*  [sw-toolbox Tutorial: Usage](https://googlechrome.github.io/sw-toolbox/usage.html#main)
*  [sw-toolbox Tutorial: API](https://googlechrome.github.io/sw-toolbox/api.html#main)

### Express-style Routing

If you're familiar with  [Express.js](http://expressjs.com/en/guide/routing.html), you can write URL patterns using a syntax similar to its routing syntax.

To use Express-style URL patterns, pass the pattern into the route as a string. `sw-toolbox` then converts the URL to a regular expression via the  [path-to-regexp](https://github.com/pillarjs/path-to-regexp) library.

For example:

```
toolbox.router.get('img/**/*.{png,jpg}', global.toolbox.cacheFirst);
```

This intercepts all  `GET` requests for any `png` or `jpg` file under the __img__ folder, regardless of depth. It handles the request according to the "cache first" strategy, first looking in the cache for the response. If that fails, the request is sent to the network and, if that succeeds, the response is added to the cache.

Here is another example:

```
toolbox.router.get('/.*fly$/', global.toolbox.cacheFirst);
```

This matches any content that ends with fly (like butterfly or dragonfly) using the cache first strategy:

To match a request from another domain using Express-style routing, we must define the `origin` property in the `options` object. The value could be either a string (which is checked for an exact match) or a RegExp object. In both cases, it's matched against the full origin of the URL (for example, __https://<span></span>example.com__).

For example:

```
toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
  origin: /\.googleapis\.com$/
});
```

This matches all files (`'/(.*)'`) with an origin that ends with ".googleapis.com", and uses the "cache first" strategy.

### Regular Expression Routing

You can also use  [regular expressions](https://regex101.com/) to define the URL pattern in the route by passing a  [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) object as the first parameter. This RegExp is matched against the full request URL (request and path) to determine if the route applies to the request. This matching makes for easier cross-origin routing, since the origin and the path are matched without having to specify an `origin` like we did with Express style routes.

This route handles all GET requests that end with __index.html__:

```
toolbox.router.get(/index.html$/, function(request) {
  return new Response('Handled a request for ' + request.url);
});
```

This route handles all POST requests that begin with __https://<span></span>api.flickr.com/__: 

```
toolbox.router.post(/^https://api.flickr.com\//, global.toolbox.networkFirst);
```

### Cache Control

`sw-toolbox` also gives us the ability to control the cache and its characteristics. The Express route below handles requests ending with googleapis.com using the cache first strategy. In addition to handling the origin we customize the cache itself. 

* We give it a name ("googleapis")
* We give it a maximum size of 10 items (indicated by the `maxEntries` parameter)
* We set the content to expire in 86400 seconds (24 hours)

```
toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 10,
    maxAgeSeconds: 86400
  },
  origin: /\.googleapis\.com$/
});
```

<div id="strategies"></div>

### Caching strategies with sw-toolbox

It's important to consider all of the caching strategies and find the right balance between speed and data freshness for each of your data sources. Use the following table to determine which caching strategy is most appropriate for the dynamic resources that populate your app shell.  

__Table of Common Caching Strategies__

<table markdown="1">
<tr><td colspan="1" rowspan="1">
<p><strong>Strategy</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>The service worker ...</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Best use of this strategy ....</strong></p>
</td><td colspan="1" rowspan="1">
<p><strong>Corresponding </p>
<p>sw-toolbox handler </strong></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Cache first,</p>
<p>Network fallback</p>
</td><td colspan="1" rowspan="1">
<p>Loads the local (cached) HTML and JavaScript first, if possible, bypassing the network. If cached content is not available, then the service worker returns a response from the network instead. </p>
</td><td colspan="1" rowspan="1">
<p>When dealing with remote resources that are very unlikely to change, such as static images. </p>
</td><td colspan="1" rowspan="1">
<p><code>toolbox.cacheFirst</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Network first, Cache fallback</p>
</td><td colspan="1" rowspan="1">
<p>Checks the network first for a response and, if successful, returns current data to the page. If the network request fails, then the service worker returns the cached entry instead. </p>
</td><td colspan="1" rowspan="1">
<p>When data must be as fresh as possible, such as for a real-time API response, but you still want to display something as a fallback when the network is unavailable.</p>
</td><td colspan="1" rowspan="1">
<p><code>toolbox.networkFirst</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Cache/network race</p>
</td><td colspan="1" rowspan="1">
<p>Fires the same request to the network and the cache simultaneously. In most cases, the cached data loads first and is returned directly to the page. Meanwhile, the network response updates the previously cached entry. The cache updates keep the cached data relatively fresh. The updates occur in the background and do not block rendering of the cached content. </p>
</td><td colspan="1" rowspan="1">
<p>When content is updated frequently, such as for articles, social media timelines, and game leaderboards. It can also be useful when chasing performance on devices with slow disk access where getting resources from the network might be quicker than pulling data from cache.</p>
</td><td colspan="1" rowspan="1">
<p><code>toolbox.fastest</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Network only</p>
</td><td colspan="1" rowspan="1">
<p>Only checks the network. There is no going to the cache for data. If the network fails, then the request fails. </p>
</td><td colspan="1" rowspan="1">
<p>When only fresh data can be displayed on your site. </p>
</td><td colspan="1" rowspan="1">
<p><code>toolbox.networkOnly</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Cache only</p>
</td><td colspan="1" rowspan="1">
<p>The data is cached during the install event so you can depend on the data being there.</p>
</td><td colspan="1" rowspan="1">
<p>When displaying static data on your site.</p>
</td><td colspan="1" rowspan="1">
<p><code>toolbox.cacheOnly</code></p>
</td>
</tr></table>


The example below demonstrates some `sw-toolbox` strategies to cache different parts of an application.

```
(function(global) {
  'use strict';

  // Example 1
  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 20,
    },
    origin: /\.googleapis\.com$/
  });

  // Example 2
  global.toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
    cache: {
      name: imagesCacheName,
      maxEntries: 50
    }
  });

  // SPECIAL CASES:
  // Example 3
  self.addEventListener('fetch', function(event) {
    if (event.request.headers.get('accept').includes('video/mp4')) {
      // respond with a network only request for the requested object
      event.respondWith(global.toolbox.networkOnly(event.request));
    }
    // you can add additional synchronous checks based on event.request.
  });

  // Example 4
  global.toolbox.router.get('(.+)', global.toolbox.networkOnly, {
    origin: /\.(?:youtube|vimeo)\.com$/
  });

  // Example 5
  global.toolbox.router.get('/*', global.toolbox.cacheFirst);
})(self);
```

Example 1 uses a cache first strategy to fetch content from the __googleapis.com__ domain. It will store up to 20 matches in the googleapis cache. 

Example 2 uses a cache first strategy to fetch all PNG and JPG images (those files that end with "png" or "jpg") from the `images-cache` cache. If it can't find the items in the cache, it fetches them from the network and adds them to the `images-cache` cache. When more than 50 items are stored in the cache, the oldest items are removed. 

Example 3 works with local videos in MP4 and a network only strategy. We don't want large files to bloat the cache so we will only play the videos when we are online. 

Example 4 matches all files from Youtube and Vimeo and uses the network only strategy. When working with external video sources we not only have to worry about cache size but also about potential copyright issues. 

Example 5 presents our default route. If the request did not match any prior routes it will match this one and run with a cache first strategy. 

<div id="gulp"></div>


## Using sw-precache and sw-toolbox in a gulp build file




`sw-precache` is a module for generating a service worker that precaches resources. It integrates with your build process. `sw-precache` gives you fine control over the behavior of the generated service worker. At the time of creation we can specify files to precache, scripts to import, and many other options that determine how the service worker behaves (see the  [sw-precache Github page](https://github.com/GoogleChrome/sw-precache) for more information).

### Integrating sw-precache into a gulp build system

To use `sw-precache` in gulp, we first import the plugin at the top of the gulp file.

```
var swPrecache = require('sw-precache');
```


We then create a gulp task and call `write` on `swPrecache`. The write method looks like this:

```
swPrecache.write(filePath, options, callback)
```

`filePath` is the location of the file to write the service worker to. `options` is an object that defines the behavior of the generated service worker (see the  [documentation on Github](https://github.com/GoogleChrome/sw-precache#options-parameter) for the full list of options). The callback is always executed. This is for gulp to know when an async operation has completed. If there is an error, it is passed to the callback. If no error is found, null is passed to the callback.

Let's look at an example:

```
gulp.task('generate-service-worker', function(callback) {
  swPrecache.write('app/service-worker.js'), {
    //1
    staticFileGlobs: [
       'app/index.html',
       'app/js/main.js',
       'app/css/main.css',
       'app/img/**/*.{svg,png,jpg,gif}'
     ],
    // 2
    importScripts: [
       'app/node_modules/sw-toolbox/sw-toolbox.js',
       'app/js/toolbox-script.js'
     ],
    // 3
    stripPrefix: 'app/'
  }, callback);
});
```

We call the gulp task `'generate-service-worker'` and pass a callback to the function to make it asynchronous.

`swPrecache.write` generates a service worker with the following options:

* The resources in `staticFileGlobs` are precached, meaning the generated service worker will contain an `install` event handler that caches the resources.
* The scripts in `importScripts` are included in the generated service worker inside an `importScripts` method. In the example we are including the `sw-toolbox` module and a script containing our routes.
* The `app/` prefix is removed from all file paths in `staticFileGlobs` so that the paths in the generated service worker are relative.



Note: Incorporating `sw-toolbox` routes into your build is as simple as including the `sw-toolbox` module and a script containing your routes in the `importScripts` option of `swPrecache.write`.



<div id="cmdline"></div>


## Running sw-precache from the command line




You can use `sw-precache` from the command line when you want to test the result of using it, but don't want to have to change your build system for every version of the experiment. 

Sensible defaults are assumed for options that are not provided. For example, if you are inside the top-level directory that contains your site's contents, and you'd like to generate a __service-worker.js__ file that will automatically precache all of the local files, you can simply run:

```
sw-precache
```

Alternatively, if you'd like to only precache `.html` files that live within __dist/__, which is a subdirectory of the current directory, you could run:

```
sw-precache --root=dist --static-file-globs='dist/**/*.html'
```



Note: Be sure to use quotes around parameter values that have special meanings to your shell (such as the * characters in the sample command line above, for example).



Finally, there's support for passing complex configurations using `--config <file>`. Any of the options from the file can be overridden through a command-line flag. We recommend using an external JavaScript file to define configurations using  [module.exports](https://nodejs.org/api/modules.html#modules_module_exports). For example, assume there's a __path/to/sw-precache-config.js__ file that contains:

```
module.exports = {
  staticFileGlobs: [
    'app/css/**.css',
    'app/**.html',
    'app/images/**.*',
    'app/js/**.js'
  ],
  stripPrefix: 'app/',
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
};
```

We can pass the file to the command-line interface, also setting the verbose option:

```
sw-precache --config=path/to/sw-precache-config.js --verbose
```

This provides the most flexibility, such as providing a regular expression for the `runtimeCaching.urlPattern` option.

`sw-precache` also supports passing in a JSON file for `--config`, though this provides less flexibility:

```
{
  "staticFileGlobs": [
    "app/css/**.css",
    "app/**.html",
    "app/images/**.*",
    "app/js/**.js"
  ],
  "stripPrefix": "app/",
  "runtimeCaching": [{
    "urlPattern": "/express/style/path/(.*)",
    "handler": "networkFirst"
  }]
}
```

<div id="further"></div>


## Further reading




#### Documentation

*  [sw-precache - Github](https://github.com/GoogleChrome/sw-precache)
*  [sw-precache - npm](https://www.npmjs.com/package/sw-precache)
*  [sw-toolbox - Github](https://github.com/GoogleChrome/sw-toolbox)
*  [sw-toolbox Usage Tutorial](https://googlechrome.github.io/sw-toolbox/usage.html#main)
*  [sw-toolbox API Tutorial](https://googlechrome.github.io/sw-toolbox/api.html#main)

#### URL Patterns

*  [RegExr](http://regexr.com/)
*  [Express Routing](https://expressjs.com/en/guide/routing.html)


