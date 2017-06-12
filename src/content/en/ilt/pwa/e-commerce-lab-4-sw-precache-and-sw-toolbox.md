project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-04-06T23:42:38Z #}
{# wf_published_on: 2016-01-01 #}


# E-Commerce Lab 4: sw-precache and sw-toolbox {: .page-title }




<div id="overview"></div>


## Overview




#### What you will do

* Integrate `sw-precache` in your app to generate a production-ready service worker
* Integrate `sw-toolbox` in your app to create custom handlers for specific requests

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* Have completed  [Lab: Gulp setup](lab-gulp-setup)
* Have completed  [Lab: sw-precache and sw-toolbox](lab-sw-precache-and-sw-toolbox)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A  [browser that supports service workers](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="1"></div>


## 1. Get set up




If you have a text editor that lets you open a project, then open the __project__ folder in the __ecommerce-demo__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __project__ folder is where you will build the app.



Note: [Unregister the service worker](tools-for-pwa-developers#unregister) at localhost so it doesn't interfere with the lab.





Note: If you have completed the E-Commerce App labs up to this point, your app is already set up and you can skip to step 2.



If you did not complete the previous ecommerce labs, copy the contents of the __lab4-sw-precache__ folder and overwrite the contents of the __project__ directory. Then run `npm install` in the command line at the __project__ directory.

At the project directory, run `npm run serve` to build the application in __dist__. You must rebuild the application each time you want to test changes to your code. Open your browser and navigate to localhost:8080.



Note: The e-commerce app is based on Google's  [Web Starter Kit](https://github.com/google/web-starter-kit/), which is an "opinionated boilerplate" designed as a starting point for new projects. It allows us to take advantage of several preconfigured tools that facilitate development, and are optimized both for speed and multiple devices. You can learn more about Web Starter Kit  [here](/web/tools/starter-kit/).





Note: Solution code for this lab can be found in the __solution__ folder.



<div id="2"></div>


## 2. Write the sw-toolbox script




To complete TODO PRC-2 in __app/scripts/sw/runtime-caching.js,__ use Express-style routing to match all files from __googleapis.com__ or __gstatic.com__ and use the `fastest` caching strategy.

The origin should look like this:

```
origin: /\.(?:googleapis|gstatic)\.com$/
```

Save the code.



Note: See  [Lab: sw-precache and sw-toolbox](lab-sw-precache-and-sw-toolbox) for examples of Express-style routes.



#### Explanation

The `fastest` strategy sends the request to the cache and to the network simultaneously, and returns the fastest response. It then updates the cache with the response from the network.

#### For more information

[sw-toolbox Tutorial: API](https://googlechrome.github.io/sw-toolbox/api.html#main)

<div id="3"></div>


## 3. Copy the toolbox scripts into the dist directory




We need to put copies of the sw-toolbox library and the toolbox script we just wrote into the dist directory.

Replace TODO PRC-3 in __gulpfile.babel.js__ with the following gulp task:

#### gulpfile.babel.js

```
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'));
});
```

<div id="4"></div>


## 4. Generate the service worker




### 4.1 Import the sw-precache plugin

To complete TODO PRC-4.1 in __gulpfile.babel.js,__ write the code to import the `sw-precache` module and call it `swPrecache`. This will look very similar to the other imports in the gulpfile.

#### For more information

[Import - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

### 4.2 Write the sw-precache gulp task

Replace TODO PRC-4.2 in __gulpfile.babel.js__ with the following code:

#### gulpfile.babel.js

```
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    cacheId: pkg.name || 'modern-furniture-store',
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    stripPrefix: rootDir + '/',
    runtimeCaching: [{
      urlPattern: /^https:\/\/code\.getmdl\.io\//,
      handler: 'networkFirst'
    }],
  });
});
```

Save the code.

#### Explanation

We list the `copy-sw-scripts` task that was created in the previous step as a dependency for this task so the toolbox scripts are copied to the dist folder first.

The `cacheId` option in `swPrecache.write` gives the cache an id to avoid conflicts with other caches created when serving on localhost. This should not be necessary in production.

The `importScripts` option writes an importScripts method in the service worker, which imports the scripts in the order they are listed. The `sw-toolbox` library must be imported first. It sets up methods used in `runtime-caching.js`.

`staticFileGlobs` are the files the generated service worker will cache on install.

`stripPrefix` translates a static file path to the relative URL that it's served from.

`runtimeCaching` configures runtime caching for dynamic content. In our code, the service worker uses the `sw-toolbox` `networkFirst` strategy to cache the resources matching the `urlPattern`. The `urlPattern` follows the conventions of the `sw-toolbox` library's  [routing configuration](https://googlechrome.github.io/sw-toolbox/usage.html#basic-routes).

#### For more information

[sw-precache](https://github.com/GoogleChrome/sw-precache)

[runtimeCaching](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject)

### 4.3 Add 'generate-service-worker' to the 'default' task

Replace TODO PRC-4.3 in __gulpfile.babel.js__ with the following code:

#### gulpfile.babel.js

```
'generate-service-worker',
```

Save the file.

#### Explanation

The "default" task is a dependency of the "serve" task. Adding "generate-service-worker" to the "default" task means the "generate-service-worker" task also executes when we run `npm run serve`.



`npm run` goes into your package.json file and pulls out the scripts object. The first argument passed to `npm run` refers to a property in the scripts object - it will execute the property's value as a command in the operating system's default shell. In our case the `serve` property runs `gulp` and `node server.js`.



`runSequence` executes a list of tasks in the order they appear in the list. We add "generate-service-worker" near the end of the list so that the html, scripts, images, and styles tasks are all complete before we generate the service worker. 



In `runSequence`, tasks in an array execute simultaneously.



<div id="5"></div>


## 5. Test it out




To test the app, close any open instances of the app in your browser and stop the local server (`ctrl+c`).

Run the following in the command line to clean out the old files in the __dist__ folder, rebuild it, and serve the app:

    npm run serve

Open the browser to localhost:8080 and  [update the service worker](tools-for-pwa-developers#update).  [Inspect the cache](tools-for-pwa-developers#storage). In the cache, you should see all the application files matching the glob patterns in the `staticFileGlobs` have been cached.

<div id="congrats"></div>


## Congratulations!




You have generated a production-ready service worker that uses custom caching strategies in the E-Commerce App.


