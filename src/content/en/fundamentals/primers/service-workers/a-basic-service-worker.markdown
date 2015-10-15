---
layout: shared/narrow
published: false
title: "Setting up a basic service worker"
description: "This section describes the most basic service worker possible. It shows you how a client gets, or registers, a service worker. It shows you how a service worker prepares to act as a proxy for its clients. Both subjects have more depth than is shown in this section. It's not intended to be comprehensive; It's intended to give you a basic foundation on which to build service worker knowledge."
authors:
  - josephmedley
published_on: 2015-10-01
updated_on: 2015-10-01
order: 4
key-takeaways:
  tldr:   
  - "Call <code>register()</code> to install a service worker." 
  - "Learn to use promises before attempting service workers."
  - "Service workers have a limited scope and requrie HTTPS."
  - "The install process has two events: install and activate."
  - "The user has to navigate before the service worker start proxying."
  - "Call <code>waintUntil()</code> to keep a service worker out of its own way."
notes:
  promises:
    - "<b>Promises</b>&mdash;Notice the use of <code>.then()</code> at the end of the <code>register()</code> function. This is an example of an ECMAScript 2015 construct called a <a href='http://www.html5rocks.com/en/tutorials/es6/promises/'>promise</a>. Service workers make heavy use of promises. If you've never used promises before, you should familiarize yourself with them before trying to implement a service worker."
  https-only:
    - "<b>HTTPS Only</b>&mdash;Service workers can do almost whatever they want to HTTP requests and responses. Since this would make them targets for man-in-the-middle attacks, they must be served over HTTPS. This doesn't mean you need HTTPS for development and testing. Service workers served over localhost will also work."
  sws-dont-control:
    - "<b>Service Workers Don't Take Control</b>&mdash;If you look around the web, you'll find that many of the pages discussing service workers refer to the service worker as 'taking control' of a page. But as we saw earlier, a service workers can't change a page's DOM. That's why it may be more accurate to think of a service worker as ready to proxy."
---

<p class="intro">
  This section describes the most basic service worker possible. It shows you 
  how a client gets, or registers, a service worker. It shows you how a service 
  worker prepares to act as a proxy for its clients. Both subjects have more 
  depth than is shown in this section. It's not intended to be comprehensive; 
  It's intended to give you a basic foundation on which to build service worker 
  knowledge.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## A client registers a service worker

To use a service worker, a client tells the browser to install it by calling
`register()`. More than one page can implement `register()`. You can implement
it in either an inline script or a separate JavaScript file. Only the first a
browser encounters trigger the download. The most basic register implementation
looks like this:

{% highlight javascript %}
// Does the browser support service workers?
if ('serviceWorker' in navigator) {
  // Yes
  navigator.serviceWorker.register('/service-worker.js').then(function() {
    // Actions not covered by this primer.
  });
} else {
  // No, but this client should work anyway.
};
{% endhighlight %}

There's little more that needs to be said about clients. Now let's talk about 
the service worker itself.

{% include shared/note.liquid list=page.notes.promises %}

## Where can the service worker play?

A client tells the service worker where it can operate. This is called the
service worker's scope, and it's the lowest level of your website where the
service worker can be used. Let's look at the registration code again, but with
some changes to the `register()` parameters.

{% highlight javascript %}
// Does the browser support service workers?
if ('serviceWorker' in navigator) {
  // Yes
  navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
    .then(function() {
    // Actions not covered by this primer.
  });
} else {
  // No, but this client should work anyway.
}
{% endhighlight %}

This code is functionally identical to the example given in the last section. 
Both examples specify that the scope of the service worker is the entire domain. 
If you want to restrict the service worker to part of a site, simply specify it 
in the scope. 

For example, say that you have an auction site with different features for
buyers  and sellers. The buyers section is at `example.com/buyers` and the
sellers section  is at `example.com/sellers`. A service worker with a scope of
`/buyers` it can only  serve clients under `example.com/buyers`. It cannot serve
clients under  `example.com/sellers`. Similarly, a service worker with a scope
of `/sellers` can  only serve clients under `example.com/sellers`.

{% include shared/note.liquid list=page.notes.https-only %}

## A service worker installs and activates

Let’s look at what happens during the installation of the service worker. To set 
up a service worker, you need to implement two events:

* `install`
* `activate`

These events run one time for a service worker in a particular scope, no matter 
how many clients use it.

### Install

Use the install event to get everything this service worker needs to operate.
This could include initializing caches,  prefetching data, handling old versions
of the current service worker, or  handling other service workers in
the same scope.

The install event is kicked off immediately after the script containing it is
downloaded.

{% highlight javascript %}
self.addEventListener('install', function(installEvent) {
  installEvent.waitUntil(
    // Prefetch resources and initialize data stores.
  );
});
{% endhighlight %}

### Activate

Use activate to clean up after a previous version of a service worker. This may
include migrating data in ways that can't be done while the old service worker
was active. This event is **not** called when a terminated service worker is
revived.

{% highlight javascript %}
self.addEventListener('activate', function(activateEvent) {
  activateEvent.waitUntil(
    // Actions not covered by this primer.
  );
});
{% endhighlight %}

## The user navigates

Now that the service worker is installed, it's doing something for our page,
right? No quite. For the service worker to start handling requests, the user
needs to navigate. Either you can wait for the user to open another page in the
same scope or you can ask the user to reload.

{% include shared/remember.liquid title="Aside" list=page.notes.sws-dont-control %}

## The waitUntil() method

You might've noticed that both the install and activate events contain a method
named `waitUntil()`. This method prevents server workers from getting in their
own way. In the install event it delays firing of the activate event. In the
activate event it delays other service worker events (though clients will behave
as though the service worker doesn't exist until this method returns).This
method must either be empty or take something that resolves to a promise.

But a promise to what? Before answering, let's take a detour and talk about
debugging.







