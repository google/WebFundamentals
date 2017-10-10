project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-10-09T21:08:56Z #}
{# wf_published_on: 2016-01-01 #}


# Lab: Workbox {: .page-title }




<div id="overview"></div>


## Overview




[Workbox](https://workboxjs.org/) is the successor to  [`sw-precache`](https://github.com/GoogleChrome/sw-precache) and  [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox). It is a collection of libraries and tools used for generating a service worker, precaching, routing, and runtime-caching. Workbox also includes modules for easily integrating  [background sync](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-background-sync) and  [Google analytics](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-google-analytics) into your service worker.

See the  [Workbox page](/web/tools/workbox/) on developers.google.com for an explanation of each module contained in Workbox. In this lab, we use the main Workbox library, `workbox-sw`, and `workbox-build` to inject an array of static assets that you want to precache into a service worker.

#### What you will learn

* How to write a service worker using the `workbox-sw` library
* How to add routes to your service worker using `workbox-sw`
* How to use the predefined caching strategies provided in `workbox-sw`
* How to inject a manifest into your service worker using `workbox-build` and the `workbox-webpack-plugin`

#### What you should already know

* Basic HTML, CSS, and JavaScript
* ES2015 Promises
* How to run commands from the command line
* Familiarity with gulp
* Some familiarity with service workers is recommended

#### What you will need

* Computer with terminal/shell access
* Connection to the internet 
* A  [browser that supports service worker](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="1"></div>


## 1. Get set up




If you have not already downloaded the repository, follow the instructions in [Setting up the labs](setting-up-the-labs). You don't need to start the server for this lab.

If you have a text editor that lets you open a project, open the __workbox-lab/project__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __project__ folder is where you will be building the lab. 

This folder contains:

* __app/css/main.css__ is the cascading stylesheet for the sample page
* __app/images__ folder contains sample images
* __gulpfile.js__ is where we will write the `workbox-build` gulp task
* __app/index.html__ is a sample HTML page
* __app/service-worker.js__ is where we will write the service worker using `workbox-sw`
* __package.json__ tracks Node dependencies

<div id="2"></div>


## 2. Install workbox-sw




From the __project__ directory, install the project dependencies. See the __package.json__ file for the full list of dependencies.

```
npm install
```

Then run the following to install the `workbox-sw` library and save it as a project dependency:

```
npm install --save workbox-sw
```

#### Explanation

[`workbox-sw`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.html) is a high-level library that makes it easier to precache assets and configure routes with caching strategies in a service worker.

<div id="3"></div>


## 3. Write a basic service worker using workbox-sw




Open __service-worker.js__ and add the following snippet. Be sure to replace `vX.Y.Z` with the actual version number of the `workbox-sw` library (you can find the version number in the file in __node_modules/workbox-sw/build/importScripts/__).

#### service-worker.js

```
importScripts('workbox-sw.prod.vX.Y.Z.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);
```

Save the __service-worker.js __file. In the command line, run `gulp serve` to open the app in the browser (if you don't have gulp installed globally, install it with `npm install -g gulp`). Take a moment to look over the gulpfile and make sure you understand what it does. 

[Unregister](tools-for-pwa-developers#unregister) any existing service workers at localhost:8002. Refresh the page and check that the new service worker was created in your browser's [developer tools](tools-for-pwa-developers#accesssw). You should see a "Service Worker registration successful" message in the console.

#### Explanation

Here we import the `workbox-sw` library and create an instance of `WorkboxSW` so we can access  [the library methods](https://workboxjs.org/reference-docs/latest/module-workbox-sw.WorkboxSW.html#main) from this object.

In the next line we call `workboxSW.precache([])`. This method takes a manifest of URLs to cache on service worker installation. It is recommended to use `workbox-build` or `workbox-cli` to generate the manifest for you (this is why the array is empty). These build tools will generate hashes of the files along with their URLsWe will do that in the next step. 

The `precache` method takes care of precaching files, removing cached files no longer in the manifest, updating existing cached files, and it even sets up a fetch handler to respond to any requests for URLs in the manifest using a cache-first strategy. See  [this example](https://workboxjs.org/examples/workbox-sw/#explore-the-code) for a full explanation.

<div id="4"></div>


## 4. Inject a manifest into the service worker




This step uses gulp and `workbox-build` to build a service worker. 

Start by installing the  [`workbox-build`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html) module:

```
npm install --save workbox-build
```

This module is used to generate a list of assets that should be precached in a service worker. The list items are created with a hash that Workbox uses to intelligently update a cache when the service worker is updated.

Next, add a line to include the workbox-build library at the top of __gulpfile.js__:

#### gulpfile.js

```
const wbBuild = require('workbox-build');
```

Now copy and paste the following gulp task into the gulpfile:

#### gulpfile.js

```
gulp.task('bundle-sw', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/service-worker.js',
    swDest: 'build/service-worker.js',
    globDirectory: 'app',
    staticFileGlobs: [
      'index.html',
      'css/main.css'
    ]
  })
  .catch((err) => {
    console.log('[ERROR] This happened: ' + err);
  });
});
```

Finally, update the `default` gulp task to include the `bundle-sw` task in its `runSequence`:

#### gulpfile.js

```
gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'bundle-sw',
    cb
  );
});
```

Save the file and run `gulp serve` in the command line (you can use `Ctrl-c` to terminate the previous `gulp serve` process). When the command finishes executing, open __build/service-worker.js__ and check that the manifest has been added to the `precache` method in the service worker. It should look like this:

#### build/service-worker.js

```
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "ee7d4366f82a736863dc612c50d16e54"
  },
  {
    "url": "css/main.css",
    "revision": "3a78f101efdbf4c896cef53c323c7bb7"
  }
]);
```

When the app opens in the browser, make sure to close any other open instances of the app. [Update the service worker](tools-for-pwa-developers#update) and [check the cache](tools-for-pwa-developers#cache) in your browser's developer tools. You should see the __index.html__ and __main.css__ files are cached.

#### Explanation

In this step, we installed the `workbox-build` module and wrote a gulp task that uses the module's  [`injectManifest`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.injectManifest) method. This method copies the source service worker file to the destination service worker file, searches the new service worker for an empty `precache()` call, like `.precache([])`, and populates the empty array with the assets defined in `staticFileGlobs`.

<div id="5"></div>


## 5. Add routes to the service worker




`workbox-sw` has a  [`router`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#main) method that lets you easily add routes to your service worker.

Let's add a few routes to the service worker. Copy the following code into __app/service-worker.js__. Make sure you're not editing the service worker in the __build__ folder. This file will be overwritten when we run `gulp serve`.

#### service-worker.js

```
workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute('http://weloveiconfonts.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'iconfonts',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

// We want no more than 50 images in the cache. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);
```

Save the file. Saving the file should trigger the gulp watch task which automatically rebuilds __build/service-worker.js__, restarts the server, and refreshes the page. [Update the service worker](tools-for-pwa-developers#update) and refresh the page a couple times so that the service worker intercepts some network requests. Check the caches to see that the `googleapis`, `iconfonts`, and `images-cache` all exist and contain the right assets. You may need to refresh the caches in developer tools to see the contents. Now you can take the app offline by either stopping the server or using [developer tools](tools-for-pwa-developers#offline). The app should work as normal!

#### Explanation

Here we add a few routes to the service worker using  [`registerRoute`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerRoute) method on the  [`router`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#main) class. `registerRoute` takes an Express-style or regular expression URL pattern, or a  [Route](https://workboxjs.org/reference-docs/latest/module-workbox-routing.Route.html#main) instance. The second argument is the handler that provides a response if the route matches. The handler argument is ignored if you pass in a Route object, otherwise it's required.

Each route uses the  [`strategies`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Strategies.html#main) class to access the  [`cacheFirst`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Strategies.html#cacheFirst) run-time caching strategy. The built-in caching strategies have several  [configuration options](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Strategies.html#.StrategyOptions) for controlling how resources are cached.

The domains in the first two routes are not  [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)-enabled so we must use the `cacheableResponse` option to allow responses with a status of `0` ( [opaque responses](https://jakearchibald.com/2015/thats-so-fetch/#no-cors-and-opaque-responses)). Otherwise, Workbox does not cache these responses if you're using the `cacheFirst` strategy. (Opaque responses are allowed when using `networkFirst` and `staleWhileRevalidate`, because even if an error response is cached, it will be replaced in the near future.)

<div id="6"></div>


## 6. Optional: Use Webpack plugin to bundle the service worker




### 6.1 Install the dependencies

In the command line, move into the __webpack__ directory and install the dependencies. Then install the webpack module globally so we can use it from the command line.

```
cd ../webpack
npm install
npm install -g webpack
npm install -g webpack-dev-server
```

#### Explanation

This will install several packages:

*  [Webpack](https://webpack.js.org/) - webpack is a tool for bundling your project's assets 
*  [workbox-webpack-plugin](https://workboxjs.org/get-started/webpack.html) - generates a service worker or injects a manifest into an existing service worker as part of a webpack build process
*  [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - a webpack development server that provides live reloading

### 6.2 Configure webpack

Open __webpack.config.js__ and paste in the following code to include the necessary plugins:

#### webpack.config.js

```
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
```

Then paste in the following `module.exports` object:

#### webpack.config.js

```
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [
    new WorkboxPlugin({
      globDirectory: './',
      globPatterns: ['**\/*.{html,js,css}'],
      globIgnores: ['admin.html', 'node_modules/**', 'service-worker.js',
        'webpack.config.js', 'src/**', 'build/**'],
      swSrc: './src/service-worker.js',
      swDest: './service-worker.js',
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
```

In the command line run the following commands to test your code:

```
webpack
webpack-dev-server --open --hot
```

#### Explanation

Here we are adding the `workbox-webpack-plugin` to a very basic webpack configuration file. The plugin will inject the files matched in the glob patterns into the source service worker and copy the whole file to the destination service worker. The source service worker must contain an empty call to the `precache` method (`workboxSW.precache([]);`).

This example is meant to demonstrate just the `workbox-webpack-plugin` and doesn't really use webpack the way it's meant to be used. If you'd like to learn more about webpack itself, checkout the  [introduction](https://webpack.js.org/concepts/) on webpack.js.org. 

<div id="congrats"></div>


## Congratulations!




You have learned how to use Workbox to easily create production-ready service workers!

### What we've covered

* Using `workbox-sw` to precache static assets
* Using `workbox-sw` to create routes in your service worker
* Using `workbox-build` to inject a list of files for your service worker to precache
* Using `workbox-webpack-plugin` to inject a list of files for your service worker to precache

### Resources

*  [Workboxjs.org](https://workboxjs.org/)
*  [Workbox](/web/tools/workbox/) - developers.google.com


