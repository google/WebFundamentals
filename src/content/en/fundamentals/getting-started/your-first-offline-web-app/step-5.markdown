---
layout: shared/narrow
title: "Register a Service Worker on the site"
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 5
authors:
  - paulkinlan
---

The first step to making the app work offline is to register a service worker, a script that allows background functionality without the need for an open web page or user interaction.

This takes two simple steps:

1. Create a javascript file that will be the service worker.
1. Tell the browser to register the javascript file as the "service worker".

First, create a blank file called `sw.js` and place it in the `/app` folder. (This 
folder is the root folder for the app).  You need to do this because the scope 
of a service worker (the set of urls that the ServiceWorker will load for) is 
defined by the directory where it resides. If it is not in the correct directory 
then the ServiceWorker will not be able to make the app work offline (this means 
you can't place it in a script directory.)

Now open `index.html` in the /app folder and add the following code to the bottom.

{% highlight javascript %}
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
{% endhighlight %}

The above snippet checks to see if the browser supports service worker and if it 
does it calls the register method and returns a Promise.  After the registration 
is completed the browser will resolve the Promise and call the function in the 
`.then()` clause. (Note: this happens asynchronously.)

Start up a server on localhost and watch for any future changes to the site.

{% highlight javascript %}
$ cd app
$ python -m SimpleHTTPServer 3000
{% endhighlight %}

Open `chrome://serviceworker-internals/` in Chrome. This will show you a list of 
all the registered service workers and will allow you to open up Chrome DevTools 
and before a service worker is installed.  This is important if you want to 
debug the `install` phase of a service worker.

<img src="images/image02.png" width="624" height="350" />  
Load the web app, open Chrome DevTools and if successful you will see "Service 
Worker Registered" in Chrome DevTools.  This is the first step to integrating 
service worker into your application.  It won't work offline by default, but we 
are on our way.

<img src="images/image03.png" width="624" height="350" />
  
### Frequently Asked Questions

**Why is the service worker in the root?  Why can't I place it in a `/scripts` 
  directory?**

For security reasons, a service worker can only control the pages that are 
in the same directory level or below it.  This means that if you place the 
service worker file in a scripts directory it will be only able to be 
attached to pages inside the /scripts directory and below (/scripts/test/ 
for example).  It is unlikely that your pages for your site will live 
there.


