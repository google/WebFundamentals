project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-04-26 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Migrating to Workbox from sw-precache and sw-toolbox {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




<div id="overview"></div>


## Overview




[Workbox](https://workboxjs.org/) is the successor to  [`sw-precache`](https://github.com/GoogleChrome/sw-precache) and  [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox). It is a collection of libraries and tools used for generating a service worker, precaching, routing, and runtime-caching. Workbox also includes modules for easily integrating  [background sync](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-background-sync) and offline  [Google Analytics](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-google-analytics) into your service worker. See the  [Workbox page](/web/tools/workbox/) on developers.google.com for an explanation of each module contained in Workbox.

This lab shows you how to take an existing PWA that uses `sw-precache` and `sw-toolbox` and migrate it to Workbox to create optimal service worker code. This lab may only be useful to you if you have an existing PWA that was written with `sw-precache` and `sw-toolbox`. If you want to learn how to use Workbox from scratch, then see  [this lab](/web/ilt/pwa/lab-workbox) instead.

#### What you will learn

* The Workbox equivalents of `sw-precache` and `sw-toolbox` strategies
* How to write a service worker using the `workbox-sw.js` library
* How to add routes to your service worker using `workbox-sw.js`
* How to use the predefined caching strategies provided in `workbox-sw.js`
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




If you have not downloaded the repository and installed the  [LTS version of Node.js](https://nodejs.org/en/), follow the instructions in [Setting up the labs](setting-up-the-labs).

In `sw-precache-workbox-lab/`, open the `project/` folder in your preferred text editor. The `project/` folder is where you do the work in this lab.

<div id="2"></div>


## 2. Explore the app




The starting app is a working PWA that currently uses `sw-precache` and `sw-toolbox` to generate a service worker and manage its  [routes](https://googlechromelabs.github.io/sw-toolbox/usage.html#regular-expression-routes). Open `project/gulpfile.js` and look at the code. Notice the `service-worker` task uses `sw-precache` to generate a service worker and imports the `sw-toolbox` library (`sw-toolbox.js`) and a custom `sw-toolbox` script (`js/toolbox-script.js`) into the generated service worker:

```
const serviceWorker = () => {
  return swPrecache.write('build/sw.js', {
    staticFileGlobs: [
      'build/index.html',
      'build/styles/main.css',
    ],
    importScripts: [
      'sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: 'build'
  });
};
gulp.task('service-worker', serviceWorker);
```

This lab shows you how to translate this code so that it uses `workbox-build`, which is the Workbox version of `sw-precache`.

Let's look at the custom `sw-toolbox` script now. Open `app/js/toolbox-script.js` and look at the code. The file contains a couple routes that use the `cacheFirst` strategy to handle requests for pages and images, and puts them into caches named `pages` and `images`, respectively:

```
toolbox.router.get(/\.(?:html|css)$/, toolbox.cacheFirst, {
  cache: {
    name: 'pages'
  }
});

toolbox.router.get(/\.(?:png|gif|jpg)$/, toolbox.cacheFirst, {
  cache: {
    name: 'images',
    maxEntries: 50
  }
});
```

In the following steps, we'll replace these routes with Workbox routes using the `workbox-sw.js` library.

<div id="3"></div>


## 3. Test the app




Now that you have seen the code, run the app so you can see how it works.

Run the following command in the `project/` directory to install the project dependencies:

    npm install

After it's finished installing, build and serve the app with the following command::

    npm run serve

The `serve` command is aliased to our gulp `serve` task in `package.json` (we do this to avoid installing the gulp command line tool and to have better control of the gulp version used). The gulp `serve` task copies all of the app files to a build directory, generates a service worker (`build/sw.js`), starts a server, and opens the app in the browser.

After the app opens in the browser, open your browser's Developer Tools and  [verify that the service worker was installed](/web/ilt/pwa/tools-for-pwa-developers#interact_with_service_workers_in_the_browser). Then,  [open the cache](/web/ilt/pwa/tools-for-pwa-developers#inspect_cache_storage) and verify that the `index.html` and `main.css` files are cached.

Refresh the page and then refresh the cache (right-click the cache in DevTools and click Refresh) and verify that the `images` caches were created and they contain the image assets. Now let's convert the app so that we get the same results using Workbox.

<div id="4"></div>


## 4. Install workbox-build




Close the app in the browser and stop the server by running `ctrl+c` from the command line.

After the server has stopped, run the following command in the `project/` directory to remove the `node_modules` folder containing the `sw-precache` and `sw-toolbox` modules:

    rm -rf node_modules

Next, install the `workbox-build` module:

```
npm install --save-dev workbox-build
```

Then, open the `package.json` file and delete `sw-toolbox` from the `dependencies` and delete `sw-precache` from the `devDependencies`. The full `package.json` file should look like the following (your version numbers may differ):

```
{
  "name": "responsive-blog",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "dependencies": {},
  "devDependencies": {
    "browser-sync": "^2.24.6",
    "del": "^3.0.0",
    "gulp": "^4.0.0",
    "workbox-build": "^3.4.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "gulp serve"
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

In this step, we installed `workbox-build` and removed the unused `sw-precache` and `sw-toolbox` libraries.

[`workbox-build`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html) replaces `sw-precache` for gulp applications. Workbox also contains build modules for webpack and the command line, which are the  [`workbox-webpack-plugin`](/web/tools/workbox/guides/precache-files/webpack) and  [`workbox-cli`](/web/tools/workbox/guides/precache-files/cli), respectively.

<div id="5"></div>


## 5. Write the service worker using workbox-sw




With `sw-precache` and `sw-toolbox`, the process of writing a service worker went something like this:

1. Write the routes in a separate file (in this case, `js/toolbox-script.js`) using `sw-toolbox`
2. Generate the service worker using `sw-precache` and import the file containing the routes

This generated a service worker file that contained all of the code in the `sw-precache` library, which made things difficult to read and to customize.

With Workbox, the process goes something like this:

1. Write the service worker file itself using the `workbox-sw.js` library
2. Inject the files you want to precache into an empty array inside the service worker file using `workbox-build`

Workbox lets you write the service worker file yourself and the `workbox-sw.js` library provides helper modules for doing common tasks in the service worker. `workbox-sw.js` contains methods for precaching assets, routing, and performing different caching strategies. After the service worker is written, you can use one of the Workbox build tools, like `workbox-build`, to inject a list of files you want to precache (known as a precache manifest) into the service worker. This process results in a service worker file that is more readable and easier to customize.

Let's write the service worker now. Create an `sw.js` file in `app/` and add the following snippet to it:

```
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);
```

#### Explanation

This code imports the `workbox-sw.js` library from a CDN.

`workbox-sw.js` is a high-level library that contains  [methods to add routes](/web/tools/workbox/reference-docs/latest/workbox.routing) to your service worker, and  [methods to precache assets](/web/tools/workbox/reference-docs/latest/workbox.precaching). This module replaces `sw-toolbox`, although it is not a one-to-one mapping.

The `precacheAndRoute` method takes a file manifest and caches the assets on service worker install. Note that we've left the array empty: It is recommended that you populate this array using a Workbox build module, such as `workbox-build`. We'll look at how and why in a later step.

See the  [documentation](https://workboxjs.org/) for full descriptions of the Workbox modules and methods.

<div id="6"></div>


## 6. Replace the sw-toolbox routes with Workbox routes




With `workbox-sw.js`, we can write the routes directly in the service worker, instead of importing a separate file like we did with `sw-toolbox`. This leaves us with one less file to serve and a simpler development process.

Add the following routes to `app/sw.js`. These are the Workbox equivalents of the existing `sw-toolbox` routes.

```
workbox.routing.registerRoute(/\.(?:html|css)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'pages',
  })
);

workbox.routing.registerRoute(/\.(?:png|gif|jpg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  })
);
```

Save the file. You can delete the `js/` folder containing the `toolbox-script.js` file and the `sw-toolbox.js` file in `app/`.

#### Explanation

We've translated the `sw-toolbox` routes into Workbox routes, and put them directly in the service worker. See the  [Router](/web/tools/workbox/modules/workbox-routing) documentation for more information on Workbox routes.

<div id="7"></div>


## 7. Precache the static assets




So far, we've removed the `sw-precache` and `sw-toolbox` modules and replaced them with `workbox-build` and `workbox-sw.js`. We've written the new service worker and translated the `sw-toolbox` routes to `workbox-sw.js` routes. The only thing left to do is to translate the `service-worker` gulp task, which uses `sw-precache`, into a task that uses `workbox-build` to inject the precache manifest into the service worker. Let's do that now.

In `app/gulpfile.js`, replace the line requiring `sw-precache` with the following line to require the `workbox-build` module:

```
// const swPrecache = require('sw-precache');
const workboxBuild = require('workbox-build');
```

Then, replace the `service-worker` task in `app/gulpfile.js` with the following task:

```
const serviceWorker = () => {
  return workboxBuild.injectManifest({
    swSrc: 'app/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      'index.html',
      'styles/main.css'
    ]
  }).then(resources => {
    console.log(`Injected ${resources.count} resources for precaching, ` +
        `totaling ${resources.size} bytes.`);
  }).catch(err => {
    console.log('[ERROR] This happened: ' + err);
  });
}
gulp.task('service-worker', serviceWorker);
```

Save the file.

Before testing your changes, make sure you've closed all open instances of the app in the browser. The service worker won't update if any of the pages it controls are still open. Then, start the server in the `project/` directory with `npm run serve`.

After the app opens in the browser, open Developer Tools and  [unregister the previous service worker](/web/ilt/pwa/tools-for-pwa-developers#unregister_the_service_worker) and  [clear the caches](/web/ilt/pwa/tools-for-pwa-developers#clear_the_service_worker_cache). Refresh the page a couple times so the new service worker can install and intercept some network requests. Check that the `workbox-precache` cache exists and contains `index.html` and `styles/main.css`. Check that the `images` cache was created and contains the appropriate files. If everything is there you've successfully migrated the app to Workbox!

#### Explanation

The  [`injectManifest`](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.injectManifest) method copies the source service worker file to the destination service worker file. Workbox then searches the new service worker for an empty `precacheAndRoute` method call, and populates the empty array with the assets defined in `staticFileGlobs`. It also creates hashes of these files so that Workbox can intelligently update the caches if you change any of the files.

<div id="congrats"></div>


## Congratulations!




You have learned how to convert an app that uses `sw-precache` and `sw-toolbox` to one that uses Workbox!

### What we've covered

* Using `workbox-sw.js` to precache static assets
* Using `workbox-sw.js` to create routes in your service worker
* Using `workbox-build` to inject a list of files for your service worker to precache

### Resources

*  [Workbox](/web/tools/workbox/) - developers.google.com


