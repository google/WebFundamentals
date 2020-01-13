project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-04-26 #}
{# wf_published_on: 2016-01-01 #}


# Challenge: Convert a news app to a PWA {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




<div id="overview"></div>


## Overview




In this challenge, you'll use the skills you've learned during the training to build a complete Progressive Web App (PWA).

#### What you will do

* Test PWA development with Lighthouse
* Write a service worker using Workbox and `workbox-build`
* Precache static assets for instant loading
* Dynamically cache 3rd-party API data for an offline fallback
* Enable Add to homescreen functionality

#### What you should know

* Intermediate JavaScript, including familiarity with ES2015  [Promises](/web/fundamentals/primers/promises)
* Familiarity with service workers and Workbox (see  [Lab: Workbox](/web/ilt/pwa/lab-workbox))
* Some familiarity with  [Gulp](https://gulpjs.com/) and  [Node.js](https://nodejs.org/en/) is recommended (see:  [Lab: Gulp Setup](/web/ilt/pwa/lab-gulp-setup))

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A  [browser that supports service workers](https://jakearchibald.github.io/isserviceworkerready/)
* Node.js installed on your computer
* A text editor

The app you'll be building is PWA News Reader, a simple client-side app that displays  [Hacker News](https://news.ycombinator.com/) questions.

Unlike the other labs, this is a self-guided exercise - only the setup is explained, the rest is up to you!

<div id="get-set-up"></div>


## 1. Get set up




If you have not downloaded the  [repository](https://github.com/google-developer-training/pwa-training-labs) and installed  [the LTS version of Node.js](https://nodejs.org/en/), follow the instructions in [Setting up the labs](setting-up-the-labs).

### Install project dependencies and explore the app

After you have downloaded the repo, open the `news-reader/project/` folder in your preferred text editor. The `project/` folder is where you will be working.

Take a moment to look through the code and get familiar with the app's structure. The `src/` folder contains the application's source files.

The `package.json` file specifies the app's development dependencies. You don't need to be familiar with these specific packages, but they're required to build the app. In the command line, navigate to the `project/` directory and install these packages:

    cd news-reader/project
    npm install

After the installation is complete, run the following command to build and serve the app:

    npm run serve

The `serve` command is aliased in `package.json` to run the gulp `dev` task. Open `gulpfile.js` and explore the contents. You don't need to understand all the tasks. The overall build flow (defined by the `dev` task) is as follows:

* The app's images and its root files (`index.html` and `sw.js`) are copied directly to a `dist/` folder
* The CSS files in `styles/` and the JS files in `scripts/` are processed (minified, compiled for browser support, etc.) and inlined directly into `index.html`
* A development server is started in the `dist/` directory
* The `watch` method is configured to rebuild the app and reload the browser as files are updated

You can terminate the development server and `watch` process at any time by running `ctrl + c` from the command line.

Open your browser and navigate to `localhost:8081` to examine the app.

Note: [Unregister](tools-for-pwa-developers#unregister) any service workers and [clear all service worker caches](tools-for-pwa-developers#clearcache) for localhost so that they do not interfere with the lab.

Solution code can be found in the `solution/` folder.

<div id="specification"></div>


## 2. Specification




Now you're ready to start. Here is your challenge:

### 2.1 Service worker

#### Features

Use the Service Worker API to achieve the following:

* Precache the app shell files (`index.html` and all images in the `images/` directory)
* Dynamically cache calls to the Hacker News API (`https://hacker-news.firebaseio.com/v0/*`) and serve them with a network-first strategy
* Dynamically cache calls to the polyfill CDN (`https://cdn.polyfill.io/*`) with a stale-while-revalidate strategy
* Configure the service worker to call  [`skipWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting) and  [`Clients.claim`](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) so that updated service workers will immediately activate and claim all clients

#### Constraints

* The service worker should only be registered if the browser supports service workers, and should register after the page has loaded.
* Use  [workbox-build](/web/tools/workbox/guides/precache-files/workbox-build#using_with_gulp) to inject the precache manifest automatically as part of the gulp build process. Write a gulp task as described in the  [documentation](/web/tools/workbox/guides/precache-files/workbox-build#using_with_gulp) and add the task to those called in the `dist` task. The source service worker is `src/sw.js` and the destination service worker is `dist/sw.js`.
* Use  [Workbox routing](/web/tools/workbox/modules/workbox-routing) and  [strategies](/web/tools/workbox/reference-docs/latest/workbox.strategies) to implement all of the dynamic caching.

#### Optional challenges

* Name the Hacker News API cache "stories" and configure it to accept a maximum of 300 entries. Set a cache lifetime for the entries to 5 minutes.
* Configure the Hacker News API route with a network timeout of 5 seconds.
* Name the polyfill cache "polyfills".

#### Hints

* See the  [Workbox precaching guide](/web/tools/workbox/guides/precache-files/workbox-build) for documentation on precaching files and injecting a precache manifest with gulp.
* Check out the  [Workbox routing guide](/web/tools/workbox/guides/route-requests#handling_a_route_with_a_workbox_strategy) and  [common recipes](/web/tools/workbox/guides/common-recipes) for documentation on runtime caching strategies and routes.
* See the  [workbox module documentation](/web/tools/workbox/modules/workbox-sw#skip_waiting_and_clients_claim) for configuring `skipWaiting` and `Clients.claim`.

#### Testing

If implemented correctly:

* You should see the service worker [registered in developer tools](tools-for-pwa-developers#accesssw)
* The home page should load offline after the first visit and you should see `index.html` and `images/` [in the cache](tools-for-pwa-developers#cache)
* Previously fetched data from the Hacker News API should be available on subsequent loads and should be visible [in the cache](tools-for-pwa-developers#cache)
* Updated service workers should immediately activate on each new page load

You can also run an  [audit with Lighthouse](/web/tools/lighthouse/) using Chrome. The final app should pass all PWA tests except those concerned with HTTPS (the Add to Homescreen tests are completed in the next section).

See the solution code in the `solution/` directory if you get stuck.

### 2.2 Optional: Add to Homescreen

Note: This task is optional, and  [browser support for the manifest file](https://caniuse.com/#feat=web-app-manifest) and  [`beforeinstallprompt`](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) is not as broad as that for service workers.

#### Features

* Add a manifest file to enable Add to Homescreen functionality
* The manifest should be configured to open the `index.html` page in `standalone` mode
* Theme and background colors are `#607d8b`, the name is "PWA News Reader" and the short name is "News Reader"
* `meta` tags should be supplied for browsers that don't support the `manifest.json` file
* Bonus: Ensure that the Add to Home Screen prompt is activated from within a user gesture, which is  [required](/web/updates/2018/06/a2hs-updates) for Chrome 68+

#### Hints

* Note that the touch icons are already available in `images/touch/`.
* Use a manifest generator like  [this one](https://app-manifest.firebaseapp.com/) or  [this one](https://tomitm.github.io/appmanifest/), which also generates `<meta>` tags for browsers that don't support the manifest file.

#### Testing

* In Chrome DevTools, the manifest properties can be examined under __Application__ > __Manifest__, where you can also  [test Add to Homescreen](/web/fundamentals/app-install-banners/#test)
* Using Chrome, the  [Lighthouse](/web/tools/lighthouse/) PWA audit will also confirm that the manifest is configured correctly

<div id="congratulations"></div>


## Congratulations!




You have made the news reader app into a PWA by ensuring that content is available offline and enabling users to add the app to their device's home screen!


