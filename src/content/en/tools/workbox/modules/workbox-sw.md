project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-sw.

{# wf_updated_on: 2017-11-27 #}
{# wf_published_on: 2017-11-27 #}

# Workbox {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

[Demo](https://workbox-demos.firebaseapp.com/demo/workbox-sw/) | [Reference Docs](http://localhost:8080/web/tools/workbox/reference-docs/latest/workbox)

## What is Workbox SW?

The `workbox-sw` module provide an extremely easy way to get up and running
with the Workbox modules and simplifies the loading of the Workbox modules and
offers some simply helper methods.

You can use `workbox-sw` via our CDN or you use it with a set of workbox files
on your own server.

## Using Workbox SW via CDN

The easiest way to start using this module is via the CDN. You just need to
add the following to your service worker:

<pre class="prettyprint js">
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');
</pre>

With this you’ll have the `workbox` namespace in your service worker that will
provide access to all of the Workbox modules.

```javascript
workbox.precaching.*
workbox.routing.*
etc
```

There is some magic that happens as you  start to use the additional modules.

When you reference a module for the first time, `workbox-sw` will detect this
and load the module before making it available. You can see this happening in
the network tab in DevTools.

![Workbox Libraries Loading in DevTools](../images/modules/workbox-sw/workbox-sw-loading.png)

These files will be cached by your browser making them available for future
offline use.

## Using Local Workbox Files Instead of CDN

If you don’t want to use the CDN, it’s easy enough to switch to Workbox files
hosted on your own domain.

The simplest approach is to get the files via [workbox-build#getFiles()]() or
from a [Github Release](https://github.com/GoogleChrome/workbox/releases) and
then tell `workbox-sw` where to find these files via the `modulePathPrefix`
config option.

Let’s say you put the files under `/third_party/workbox/`, you would use them
like so:

```javascript
importScripts('/third_party/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/third_party/workbox/'
});
```

With this, you’ll use only the local workbox files.

## Force Use of Debug or Production Builds

All of the Workbox modules come with two builds, a debug build which is
contains logging and additional type checking and a production build which
strips the logging and type checking.

By default, `workbox-sw` will use the debug build for sites on localhost,
but for any other origin it’ll use the production build.

If you want to force debug or production builds you set the `debug` config
option.

```javascript
workbox.setConfig({
  debug: <true or false>
});
```

## Skip Waiting and Clients Claim

Some developers want to be able to publish a new service worker and have it
update and control a web page as soon as possible, skipping the default
service worker lifecycle.

If you find yourself wanting this behavior, `workbox-sw` provides some helper
methods to make this easy:

```javascript
workbox.skipWaiting();
workbox.clientsClaim();
```
