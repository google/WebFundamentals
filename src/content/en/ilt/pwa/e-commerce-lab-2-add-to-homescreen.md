project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-04-06 #}
{# wf_published_on: 2016-01-01 #}


# E-Commerce Lab 2: Add to Homescreen {: .page-title }




<div id="overview"></div>


## Overview




#### What you will do

* Integrate the "Add to Homescreen" feature into the e-commerce app

#### What you should know

* Basic JavaScript and HTML
* Basic JSON

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A  [browser that supports service workers](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="1"></div>


## 1. Get set up




If you have a text editor that lets you open a project, then open the __project__ folder in the __ecommerce-demo__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __project__ folder is where you will build the app.



If you have completed the previous e-commerce E-Commerce lab, your app is already set up and you can skip to step 2.



If you did not complete lab 1, copy the contents of the __lab2-add-to-homescreen__ folder and overwrite the contents of the __project__ directory. Then run `npm install` in the command line at the __project__ directory.

At the project directory, run `npm run serve` to build the application in __dist__. You must rebuild the application each time you want to test changes to your code. Open your browser and navigate to localhost:8080.



Note: The e-commerce app is based on Google's  [Web Starter Kit](https://github.com/google/web-starter-kit/), which is an "opinionated boilerplate" designed as a starting point for new projects. It allows us to take advantage of several preconfigured tools that facilitate development, and are optimized both for speed and multiple devices. You can learn more about Web Starter Kit  [here](/web/tools/starter-kit/).





Note: Solution code for this lab can be found in the __solution__ folder.



<div id="2"></div>


## 2. Write the manifest.json file




The web app manifest is a JSON file that lets you, the developer, control how your app appears to the user.

Paste the following contents into the __app/manifest.json__ file:

#### manifest.json

```
{
  "name": "E-Commerce Demo",
  "short_name": "Demo",
  "icons": [{
        "src": "images/touch/icon-128x128.png",
        "sizes": "128x128",
        "type": "image/png"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "sizes": "152x152",
        "type": "image/png"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
  "start_url": "/index.html?homescreen=1",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

Save the file.



Note: The __index.html__ file already includes a link to the __manifest.json__ file in the head.



<div id="3"></div>


## 3. Add to Homescreen elements for Safari on iOS




Replace TODO HS-3 in __app/index.html__ with the following code:

#### index.html

```
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="E-Commerce Demo">
<link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">
```

Save the file.

#### Explanation

See  [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) for a full explanation of each of these elements.

<div id="4"></div>


## 4. Add a tile icon for Windows




Replace TODO HS-4 in __app/index.html__ with the following code:

#### index.html

```
<meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
<meta name="msapplication-TileColor" content="#2F3BA2">
```

Save the file.

#### Explanation

See the  [Pinned site metadata reference](https://msdn.microsoft.com/en-us/library/dn255024(v=vs.85).aspx#msapplication-TileImage) for an explanation of these elements.

<div id="5"></div>


## 5. Test it out




To test the app, close any open instances of the app running in your browser and stop the local server (`ctrl+c`) running in your terminal window.

Run the following in the command line to clean out the old files in the __dist__ folder, rebuild it, and serve the app:

    npm run serve

Open your browser to localhost:8080. Unregister the service worker and refresh the page.

If you have Chrome installed, you can test the Add to homescreen functionality from the browser.  [Open DevTools](tools-for-pwa-developers#opendevtools) and inspect the manifest by going to __Application__. Then click __Manifest__ in the navigation bar. Click __Add to homescreen__. You should see an "add this site to your shelf" message below the URL bar. This is the desktop equivalent of mobile's add to homescreen feature. If you can successfully trigger this prompt on desktop, then you can be assured that mobile users can add your app to their devices. Click __Add__ to install the app on your device. 

<div id="congrats"></div>


## Congratulations!




You've integrated the Add to homescreen functionality to the E-Commerce App.


