project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-12-06 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Migrating to Workbox from sw-precache and sw-toolbox {: .page-title }




<div id="overview"></div>


## Overview




[Workbox](https://workboxjs.org/) is the successor to  [`sw-precache`](https://github.com/GoogleChrome/sw-precache) and  [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox). It is a collection of libraries and tools used for generating a service worker, precaching, routing, and runtime-caching. Workbox also includes modules for easily integrating  [background sync](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-background-sync) and offline  [Google Analytics](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-google-analytics) into your service worker. See the  [Workbox page](/web/tools/workbox/) on developers.google.com for an explanation of each module contained in Workbox.

This lab shows you how to take an existing PWA that uses `sw-precache` and `sw-toolbox` and migrate it to Workbox to create optimal service worker code. This lab may only be useful to you if you have an existing PWA that was written with sw-precache and sw-toolbox. If you want to learn how to use Workbox from scratch, see  [this lab](/web/ilt/pwa/lab-workbox).

#### What you will learn

* The Workbox equivalents of `sw-precache` and `sw-toolbox` strategies
* How to write a service worker using the `workbox-sw` library
* How to add routes to your service worker using `workbox-sw`
* How to use the predefined caching strategies provided in `workbox-sw`
* How to inject a manifest into your service worker using `workbox-build`

#### What you should already know

* Basic HTML, CSS, and JavaScript
* ES2015 Promises
* How to run commands from the command line
* Familiarity with gulp
* Experience with sw-toolbox/sw-precache

#### What you will need

* Computer with terminal/shell access
* Connection to the internet 
* A  [browser that supports service worker](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="1"></div>


## 1. Get set up




If you have not already downloaded the repository, follow the instructions in [Setting up the labs](setting-up-the-labs). You don't need to start the server for this lab.

In __sw-precache-workbox-lab/__, open the __project__ folder in your preferred text editor. The __project__ folder is where you do the work in this lab. 

<div id="2"></div>


## 2. Explore the app




The starting app is a working PWA that currently uses `sw-precache` and `sw-toolbox` to generate a service worker and manage its  [routes](https://googlechromelabs.github.io/sw-toolbox/api.html#toolboxroutergetpostputdeleteheadurlpattern-handler-options). Open __project/gulpfile.js__ and look at the code. Notice the `service-worker` task uses `sw-precache` to generate a service worker and imports the `sw-toolbox` library (__sw-toolbox.js__) and a custom `sw-toolbox` script (__js/toolbox-script.js__) into the generated service worker:

#### gulpfile.js

```
gulp.task('service-worker', function(callback) {
  swPrecache.write('build/sw.js', {
    staticFileGlobs: [
      'build/index.html',
      'build/css/main.css',
    ],
    importScripts: [
      'sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: 'build'
  }, callback);
});
```

This lab shows you how to translate this code so that it uses `workbox-build`, which is the Workbox version of `sw-precache`.

Let's look at the custom `sw-toolbox` script now. Open __app/js/toolbox-script.js__ and look at the code. The file contains a couple routes that use the `cacheFirst` strategy to handle requests for Google fonts and images, and puts them into caches named `googleapis` and `images`, respectively:

```
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 20,
  },
  origin: /\.googleapis\.com$/
});

toolbox.router.get(/\.(?:png|gif|jpg)$/, toolbox.cacheFirst, {
  cache: {
    name: 'images',
    maxEntries: 50
  }
});
```

In the following steps, we'll replace these routes with Workbox routes using the `workbox-sw` library. 

<div id="3"></div>


## 3. Test the app




Now that you have seen the code, run the app so you can see how it works.

Run the following command in the __project__ directory to install the project dependencies:

```
npm install
```

After it's finished installing, run the gulp task to start the app:

```
gulp serve
```

This copies all of the relevant files to a build directory, generates a service worker (__build/sw.js__), starts a server, and opens the app in the browser.

After the app opens in the browser, open your browser's Developer Tools and  [verify that the service worker was installed](/web/ilt/pwa/tools-for-pwa-developers#interact_with_service_workers_in_the_browser). Then,  [open the cache](/web/ilt/pwa/tools-for-pwa-developers#inspect_cache_storage) and verify that the __index.html__ and __main.css__ files are cached. 

Refresh the page and then refresh the cache and verify that the `googleapis` and `images` caches were created and they contain the font and image assets. Now let's convert the app so that we get the same results using Workbox.

<div id="4"></div>


## 4. Install workbox-sw and workbox-build




Close the app in the browser and stop the server with `ctrl+c`.

After the server has stopped, run the following command in the __project__ directory to remove the `node_modules` folder containing the `sw-precache` and `sw-toolbox` modules:

```
rm -rf node_modules
```

Next, install the `workbox-sw` and `workbox-build` modules:

```
npm install --save workbox-sw
npm install --save-dev workbox-build
```

Then, open the __package.json__ file and delete `sw-toolbox` from the `dependencies` and delete `sw-precache` from the `devDependencies`. The full `package.json` file should look like the following (your version numbers may differ):

#### package.json

```
{
  "name": "responsive-blog",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "dependencies": {
    "workbox-sw": "^2.0.0"
  },
  "devDependencies": {
    "browser-sync": "^2.18.13",
    "del": "^2.2.2",
    "gulp": "^3.9.1",
    "run-sequence": "^1.2.2",
    "workbox-build": "^2.1.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Save the file.

Finally, reinstall the project dependencies:

```
npm install
```

#### Explanation

In this step, we install the necessary Workbox libraries and remove the unused `sw-precache` and `sw-toolbox` libraries.  [`workbox-sw`](https://workboxjs.org/reference-docs/latest/module-workbox-sw.html) is a high-level library that contains methods to add routes to your service worker, and a method to precache assets. This module replaces `sw-toolbox`, although it is not a one-to-one mapping. We'll explore the differences later in the lab.

[`workbox-build`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html) replaces `sw-precache` for gulp applications. Workbox also contains build modules for webpack and the command line, which are the  [`workbox-webpack-plugin`](https://workboxjs.org/reference-docs/latest/module-workbox-webpack-plugin.html) and  [`workbox-cli`](https://workboxjs.org/how_tos/workbox-cli.html), respectively.

<div id="5"></div>


## 5. Write the service worker using workbox-sw




With `sw-precache` and `sw-toolbox`, the process of writing a service worker went something like this:

1. Write the routes in a separate file (in this case, __js/toolbox-script.js__) using `sw-toolbox`
2. Generate the service worker using `sw-precache` and import the file containing the routes

This generated a service worker file that contained all of the code in the `sw-precache` library.

With Workbox, the process goes something like this:

1. Write the service worker file itself using `workbox-sw`
2. Inject the files you want to precache into the service worker file using `workbox-build`

Workbox lets you write the service worker file yourself and provides helper modules for doing common tasks in the service worker. The most popular approach is to use the high-level `workbox-sw` module to write the service worker, which contains methods for precaching assets, routing, and performing different caching strategies. After the service worker is written, you can use one of the Workbox build tools, like `workbox-build`, to inject a list of files you want to precache (known as a precache manifest) into the service worker. This process results in a service worker file that is more readable and easier to customize.

Let's write the service worker now. Create an __sw.js__ file in __app/__ and add the following snippet to it:

#### app/sw.js

```
importScripts('workbox-sw.dev.v2.1.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);
```

Now copy the `workbox-sw` file at __node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.0.js__ and paste it into __app/__.



Note: If you have a newer `workbox-sw` version, remember to update the version number in the `importScripts` call in your service worker.



#### Explanation

The `workbox-sw` module exposes a  [few methods](https://workboxjs.org/reference-docs/latest/module-workbox-sw.WorkboxSW.html#main) you can use to write the service worker.

The `precache` method takes a file manifest and caches the assets on service worker install. Note that we've left the array empty: It is recommended that you populate this array using a Workbox build module, such as `workbox-build`. We'll look at how and why in step 7. 

See the  [documentation](https://workboxjs.org/) for full descriptions of the Workbox modules and methods.

<div id="6"></div>


## 6. Replace the sw-toolbox routes with Workbox routes




With `workbox-sw`, we can write the routes directly in the service worker, instead of importing a separate file like we did with `sw-toolbox`. This leaves us with one less file to serve and a simpler development process.

Append the following routes to __app/sw.js__. These are the Workbox equivalents of the existing `sw-toolbox` routes.

#### app/sw.js

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

workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);
```

Save the file. You can delete the __js__ folder containing the __toolbox-script.js__ file and the __sw-toolbox.js__ file in __app/__.

#### Explanation

We've translated the `sw-toolbox` routes into Workbox routes, and put them directly in the service worker. See the  [Router](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#main) documentation for more information on Workbox routes.

<div id="7"></div>


## 7. Precache the static assets




So far, we've removed the `sw-precache` and `sw-toolbox` modules and replaced them with `workbox-build` and `workbox-sw`. We've written the new service worker and translated the `sw-toolbox` routes to `workbox-sw` routes. The only thing left to do is to translate the `sw-precache` gulp task into a `workbox-build` task to inject the manifest into the service worker. Let's do that now.

In __app/gulpfile.js__, replace the line requiring `sw-precache` with the following line to require the `workbox-build` module:

#### app/gulpfile.js

```
const wbBuild = require('workbox-build');
```

Then, replace the `service-worker` task in __app/gulpfile.js__ with the following task:

#### app/gulpfile.js

```
gulp.task('service-worker', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
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

Save the file. 

Before testing your changes, make sure you've closed all open instances of the app in the browser. The service worker won't update if any of the pages it controls are still open. Then, start the server in the __project__ directory with `gulp serve`. 

After the app opens in the browser, open Developer Tools and  [unregister the previous service worker](/web/ilt/pwa/tools-for-pwa-developers#unregister_the_service_worker) and  [clear the caches](/web/ilt/pwa/tools-for-pwa-developers#clear_the_service_worker_cache). Refresh the page a couple times so the new service worker can install and intercept some network requests. Check that the `workbox-precaching-revisioned` cache exists and contains __index.html__ and __css/main.css__. Check that the `googleapis` and `images` caches were created and contain the appropriate files. If everything is there you've successfully migrated the app to Workbox!

#### Explanation

The  [`injectManifest`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.injectManifest) method copies the source service worker file to the destination service worker file, searches the new service worker for an empty `precache()` call (such as `.precache([])`), and populates the empty array with the assets defined in `staticFileGlobs`. It also creates hashes of these files so that Workbox can intelligently update the caches if you change any of the files.

<div id="congrats"></div>


## Congratulations!




You have learned how to convert an app that uses `sw-precache` and `sw-toolbox` to one that uses Workbox!

### What we've covered

* Using `workbox-sw` to precache static assets 
* Using `workbox-sw` to create routes in your service worker
* Using `workbox-build` to inject a list of files for your service worker to precache

### Resources

*  [Workboxjs.org](https://workboxjs.org/)
*  [Workbox](/web/tools/workbox/) - developers.google.com


