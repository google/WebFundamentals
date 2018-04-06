project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-04-06 #}
{# wf_published_on: 2016-01-01 #}


# E-Commerce Lab 1: Create a Service Worker {: .page-title }




<div id="overview"></div>


## Overview




#### What you will do

* Register a service worker in your app
* Cache the application shell on service worker install
* Intercept network requests and serve responses from the cache
* Remove unused caches on service worker activation

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* Have completed  [Lab: Scripting the service worker](lab-scripting-the-service-worker)
* Have completed  [Lab: Fetch API](lab-fetch-api)
* Have completed  [Lab: Caching files with Service Worker](lab-caching-files-with-service-worker)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A  [browser that supports service workers](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="1"></div>


## 1. Get set up




Clone the E-Commerce lab repository with Git using the following command:

    git clone https://github.com/google-developer-training/pwa-ecommerce-demo.git



Note:  If you do not use Git, then <a class="btn" role="button" href="https://github.com/google-developer-training/pwa-ecommerce-demo/archive/master.zip">download the repo</a> from GitHub.



Navigate into the cloned repo:

    cd pwa-ecommerce-demo

If you have a text editor that lets you open a project, then open the __project__ folder in the __ecommerce-demo__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __project__ folder is where you will build the app.

In a command window at the __project__ folder, run the following command to install the project dependencies (open the __package.json__ file to see a list of the dependencies):

    npm install

Then run the following:

    npm run serve

This runs the default task in __gulpfile.babel.js__ which copies the project files to the appropriate folder and starts a server. Open your browser and navigate to `localhost:8080`. The app is a mock furniture website, "Modern Furniture Store". Several furniture items should display on the front page.

When the app opens, confirm that a service worker is not registered at local host by  [checking developer tools](tools-for-pwa-developers#accesssw). If there is a service worker at localhost,  [unregister it](tools-for-pwa-developers#unregister) so it doesn't interfere with the lab.



Note: The e-commerce app is based on Google's  [Web Starter Kit](https://github.com/google/web-starter-kit/), which is an "opinionated boilerplate" designed as a starting point for new projects. It allows us to take advantage of several preconfigured tools that facilitate development, and are optimized both for speed and multiple devices. You can learn more about Web Starter Kit  [here](/web/tools/starter-kit/).





Note: Solution code for this lab can be found in the __solution__ folder.



<div id="2"></div>


## 2. Register the service worker




To complete TODO SW-2 in __app/scripts/main.js__, write the code to register the service worker at __service-worker.js__. The code should include a check for whether service worker is supported by the browser. Remember to save the file when you have finished.

<div id="3"></div>


## 3. Cache the application shell




To complete TODO SW-3 in __app/service-worker.js__, write the code to cache the following list of files in the service worker install event. Name the cache `e-commerce-v1`.

```
'/',
'index.html',
'scripts/main.min.js',
'styles/main.css',
'images/products/BarrelChair.jpg',
'images/products/C10.jpg',
'images/products/Cl2.jpg',
'images/products/CP03_blue.jpg',
'images/products/CPC_RECYCLED.jpg',
'images/products/CPFS.jpg',
'images/products/CPO2_red.jpg',
'images/products/CPT.jpg',
'images/products/CS1.jpg',
'images/touch/apple-touch-icon.png',
'images/touch/chrome-touch-icon-192x192.png',
'images/touch/icon-128x128.png',
'images/touch/ms-touch-icon-144x144-precomposed.png',
'images/about-hero-image.jpg',
'images/delete.svg',
'images/footer-background.png',
'images/hamburger.svg',
'images/header-bg.jpg',
'images/logo.png'
```

Save the file.

<div id="4"></div>


## 4. Use the cache-first strategy




To complete TODO SW-4 in __app/service-worker.js__, write the code to respond to fetch requests with the " [cache, falling back to network](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)" strategy. First, look for the response in the cache and if it exists, respond with the matching file. If the file does not exist, request the file from the network and cache a clone of the response. Save the file when you have completed this step.



Note: Solution code can be found in the __lab2-add-to-homescreen__ folder.



<div id="5"></div>


## 5. Delete outdated caches




To complete TODO SW-5 in __app/service-worker.js__, write the code to delete unused caches in the  [`activate` event handler](/web/fundamentals/instant-and-offline/offline-cookbook/#on-activate). You should create a "whitelist" of caches currently in use that should not be deleted (such as the `e-commerce-v1` cache). Use `caches.keys()` to get a list of the cache names. Then, inside `Promise.all`, map the array containing the cache names to a function that deletes each cache not in the whitelist. Save the file when you have completed this step.



Note: If you get stuck, you can use  [Lab: Caching files with Service Worker](lab-caching-files-with-service-worker) for clues.



<div id="6"></div>


## 6. Test it out




To test the app, close any open instances of the app in your browser and stop the local server (`ctrl+c`).

Run the following in the command line to clean out the old files in the __dist__ folder, rebuild it, and serve the app:

    npm run serve

Open the browser and navigate to localhost:8080.  [Inspect the cache](tools-for-pwa-developers#storage) to make sure that the specified files are cached when the service worker is installed.  [Take the app offline](tools-for-pwa-developers#offline) and refresh the page. The app should load normally!

<div id="congrats"></div>


## Congratulations!




You have added a service worker to the E-Commerce App. In the sw-precache and sw-toolbox lab, we will generate a service worker in our build process to accomplish the same result with less code.


