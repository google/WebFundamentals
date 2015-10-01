---
layout: shared/narrow
title: "Setting up a basic service worker"
description: "This section describes the most basic service worker possible. It 
  shows you how a client gets, or registers, a service worker. It shows you how 
  a service worker prepares to act as a proxy for its clients. Both subjects 
  have more depth than is shown in this section. It's not intended to be 
  comprehensive; It's intended to give you a basic foundation on which to build 
service worker knowledge."
authors:
- josephmedley
published_on: 2015-10-01
updated_on: 2015-10-01
order: 4
key-takeaways:
  tldr:   
  - "dfdf " 
  - "dfdf"
notes:
  promises:
    - "<b>Promises</b>&mdash;Notice the use of .then() at the end of the register() function. This is an example of an ECMAScript 2015 construct called a <a href='https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise'>Promise</a>. Service workers make heavy use of Promises. If you've never used Promises before, you should familiarize yourself with them before trying to implement a service worker."
  https-only:
    - "<b>HTTPS Only</b>&mdash;As we'll see later, service workers can do almost whatever they want to HTTP requests and responses. Since this would make them targets for man-in-the-middle attacks, they must be served over HTTPS.This doesn't mean you need HTTPS for development and testing. Service workers served over localhost will also work."
  sws-dont-control:
    - "<b>Service Workers Don't Take Control</b>&mdash;If you look around the web, you'll find that many of the pages discussing service workers refer to the service worker as 'taking control' of a page. But as we saw earlier, a service workers can't do anything to its clients. That's why it may be more accurate to think of a service worker as ready to proxy."
---

<p class="intro">
  This section describes the most basic service worker possible. It shows you 
  how a client gets, or registers, a service worker. It shows you how a service 
  worker prepares to act as a proxy for its clients. Both subjects have more 
  depth than is shown in this section. It's not intended to be comprehensive; 
  It's intended to give you a basic foundation on which to build service worker 
  knowledge.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## A client registers a service worker

To use a service worker, a client tells the browser to install it by calling 
register(). Every page that needs the service worker must implement register(), 
but only the first page to do so will trigger the download. The most basic 
register implementation looks like this:

{% highlight javascript %}
//Does the browser support service workers?
if ('serviceWorker' in navigator) {
  //Yes
  navigator.serviceWorker.register('/service-worker.js').then(function() {
    // Advanced actions we'll get to later.
  });
} else {
  //No, but this client should work anyway.
}
{% endhighlight %}

Generally you'll put this code at the end of a page's <body> element so that it 
doesn't block page rendering. Do this with either an inline script or a link to 
a separate JavaScript file.

There's a little more that needs to be said about clients. Now let's talk about 
the service worker itself.

{% include shared/remember.liquid title="Aside" list=page.notes.promises %}

## Where can the service worker play?

A client tells the service worker where it can operate. This is called the 
service worker's scope, and it's the lowest level of your website where the the 
service worker can be used. Let's look at the registration code again, but with 
some changes to the register() parameters.

{% highlight javascript %}
//Does the browser support service workers?
if ('serviceWorker' in navigator) {
  //Yes
  navigator.serviceWorker.register('service-worker.js', {scope: '/'})
    .then(function() {
    // Advanced actions we'll get to later.
  });
} else {
  //No, but this client should work anyway.
}
{% endhighlight %}

This code is functionally identical to the example given in the last section. 
Both examples specify that the scope of the service worker is the entire domain. 
If I want to restrict the service worker to part of a site, I simply specify it 
in the scope. 

For example, say that I had an auction site with different features for buyers 
and sellers. The buyers section is at example.com/buyers and the sellers section 
is at example.com/sellers. A service worker with a scope of /buyers/ it can only 
serve clients under example.com/buyers. It cannot serve clients under 
example.com/sellers. Similarly, a service worker with a scope of /sellers/ can 
only serve clients under example.com/sellers.

{% include shared/remember.liquid title="Aside" list=page.notes.https-only %}

## A service worker installs and activates

Let’s look at what happens during the installation of the service worker. To set 
up a service worker, you need to implement two events:

* install
* activate

These events run one time for a service worker in a particular scope, no matter 
how many clients use it.

### Install

The install event is kicked off immediately after the script containing it is 
downloaded. The possible uses for install include initializing caches, 
prefetching data, handling old versions of the current service worker, or 
generally handling other service workers in the same scope. 

{% highlight javascript %}
self.addEventListener('install', function(installEvent) {
  installEvent.waitUntil(
    //Prefetch resources and initialize data stores.
  );
});
{% endhighlight %}

### Activate

The activate event is generally more important to the update of a service worker 
than the install of a service worker since it's where you'll clear data stores 
created by earlier versions of your service worker. At this stage the only thing 
to remember is that this event is not called when a terminated service worker is
revived. 

{% highlight javascript %}
self.addEventListener('activate', function(activateEvent) {
  activateEvent.waitUntil(
    // Advanced caching actions we'll get to later.
  );
});
{% endhighlight %}

## The client waits

You might've noticed that both the install and activate events contain a call to 
a function named waitUntil(). This method prevents clients from processing until 
the event is complete. If it's not empty it must always take a Promise.

But a Promise to what? Most examples are too complicated for a beginner lesson. 
Fortunately there is something that you will likely always want to do at this 
point.


## The service worker starts immediately

If a client page registered a service worker using the code we've seen so far, 
you'd notice that the service worker doesn't run. To get the service worker to 
run you can do one of several things: 

* You can wait for the next user navigation. For this you can either wait for the 
user to navigate to another page in the same service worker scope, or you can 
ask the user to reload the client page.
* Or, you can do what most implementations, including [Chrome's samples](https://github.com/GoogleChrome/samples)
, do. Add a function called claim(), which allows the service worker to start 
serving to client pages immediately. 

The `claim()` method also returns a Promise.

{% highlight javascript %}
self.addEventListener('activate', function(activateEvent) {
  activateEvent.waitUntil(
    // Advanced caching actions we'll get to later.
    self.clients.claim() //Returns a Promise.
  );
});
{% endhighlight %}

{% include shared/remember.liquid title="Aside" list=page.notes.sws-dont-control %}

