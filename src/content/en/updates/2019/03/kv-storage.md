project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: An introduction to the new KV Storage API, built-in modules, and import maps.

{# wf_updated_on: 2019-03-11 #}
{# wf_published_on: 2019-03-11 #}
{# wf_tags: chrome74, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_featured_snippet: An introduction to the new KV Storage API, built-in modules, and import maps. #}
{# wf_blink_components: Blink>Storage #}

# KV Storage, the Web's First Built-in Module {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

Browser vendors and web performance experts have been saying for the better part
of the last decade that [`localStorage` is
slow](https://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/),
and web developers should stop using it.

To be fair, the people saying this are not wrong. `localStorage` is a
synchronous API that blocks the main thread, and any time you access it you
potentially prevent your page from being interactive.

The problem is the `localStorage` API is just so temptingly simple, and the only
asynchronous alternative to `localStorage` is
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB),
which (let's face it) is not known for its ease of use or welcoming API.

So developers are left with a choice between something hard to use and something
bad for performance. And while there _are_ libraries that offer the simplicity
of the `localStorage` API while actually using asynchronous storage APIs under
the hood, including one of those libraries in your app has a file-size cost and
can eat into your [performance
budget](https://web.dev/fast/performance-budgets-101).

But what if it were possible to get the performance of an asynchronous storage
API with the simplicity of the `localStorage` API, without having to pay the
file size cost?

Well, now there is. Chrome is experimenting with a new feature called [built-in
modules](https://github.com/tc39/proposal-javascript-standard-library), and the
first one we're planning to ship is an asynchronous key/value storage module
called [KV Storage](https://github.com/WICG/kv-storage)

But before I get into the details of the KV Storage module, let me explain
what I mean by _built-in modules_.

## What are built-in modules?

[Built-in modules](https://github.com/tc39/proposal-javascript-standard-library/)
are just like regular JavaScript
[modules](/web/fundamentals/primers/modules),
except that they don't have to be downloaded because they ship with the browser.

Like traditional web APIs, built-in modules must go through a standardization
process and have well-defined specifications, but unlike traditional web APIs,
they're not exposed on the global scope&mdash;they're only available through
[imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

Not exposing built-in modules globally has a lot of advantages: they won't add
any overhead to starting up a new JavaScript runtime context (e.g. a new tab,
worker, or service worker), and they won't consume any memory or CPU unless
they're actually imported. Furthermore, they don't run the risk of naming
collisions with other variables defined in your code.

To import a built in module you use the prefix `std:` followed by the built-in
module's identifier. For example, in <a href="#browser-support">supported
browsers</a>, you could import the KV Storage module with the following code
(see below for [how to use a KV Storage polyfill in unsupported
browsers](#what_if_a_browser_doesnt_support_a_built-in_module)):


```js
import {storage, StorageArea} from 'std:kv-storage';
```

## The KV Storage module

The KV Storage module is similar in its simplicity to the [`localStorage`
API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), but
its API shape is actually closer to a
[JavaScript `Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
Instead of [`getItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem),
[`setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem),
and [`removeItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem),
it has [`get()`](https://github.com/WICG/kv-storage/blob/master/README.md#getkey),
[`set()`](https://github.com/WICG/kv-storage/blob/master/README.md#setkey-value),
and [`delete()`](https://github.com/WICG/kv-storage/blob/master/README.md#deletekey).
It also has other map-like methods not available to `localStorage`, like
[`keys()`](https://github.com/WICG/kv-storage/blob/master/README.md#keys),
[`values()`](https://github.com/WICG/kv-storage/blob/master/README.md#values), and
[`entries()`](https://github.com/WICG/kv-storage/blob/master/README.md#entries),
and like `Map`, its keys do not have to be strings. They can be any
[structured-serializable type](https://html.spec.whatwg.org/multipage/structured-data.html#serializable-objects).

Unlike `Map`, all KV Storage methods return either
[promises](/web/fundamentals/primers/promises) or
[async iterators](https://github.com/tc39/proposal-async-iteration) (since the
main point of this module is it's not synchronous, in contrast to
`localStorage`). To see the full API in detail, you can refer to the
[specification](https://wicg.github.io/kv-storage/#storagearea).

As you may have noticed from the code example above, the KV Storage module has
two named exports: `storage` and `StorageArea`.

`storage` is an instance of the `StorageArea` class with the name `'default'`,
and it's what developers will use most often in their application code. The
`StorageArea` class is provided for cases where additional isolation is needed
(e.g. a third-party library that stores data and wants to avoid conflicts with
data stored via the default `storage` instance). `StorageArea` data is stored in
an IndexedDB database with the name `kv-storage:${name}`, where name is the name
of the `StorageArea` instance.

Here's an example of how to use the KV Storage module in your code:

```js
import {storage} from 'std:kv-storage';

const main = async () => {
  const oldPreferences = await storage.get('preferences');

  document.querySelector('form').addEventListener('submit', () => {
    const newPreferences = Object.assign({}, oldPreferences, {
      // Updated preferences go here...
    });

    await storage.set('preferences', newPreferences);
  });
};

main();
```

<aside id="browser-support">
  <strong>Note:</strong>
  The KV Storage module is currently available in Chrome 74 if you have the
  experimental web platform features flag turned on:
  (<code>chrome://flags/#enable-experimental-web-platform-features</code>).
</aside>

## What if a browser doesn't support a built-in module?

If you're familiar with using native JavaScript modules in browsers, you
probably know that (at least up until now) importing anything other than a URL
will generate an error. And `std:kv-storage` is not a valid URL.

So that raises the question: _do we have to wait until all browsers support
built-in module before we can use it in our code?_

Thankfully, the answer is **no!**

You can actually use built-in modules in your code today, with help from another
new feature called [import maps](https://github.com/WICG/import-maps).

One of the things I'm most excited about with built-in modules is they're going
to be implemented in JavaScript, and that's important because it means they
can all be polyfilled.

<aside>
  <strong>Note:</strong>
  While the spec does not require built-in modules to be implemented in
  JavaScript, this is our plan for the initial modules we're going to ship
  in Chrome. We want to make it as easy as possible for developers to use
  built-in modules in their applications right away.
</aside>

### Import maps

Import maps give us a way to detect support for a particular built-in module and
use that module if it's supported. If it's not supported, a
[polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill) can be
loaded instead. Import maps are essentially a mechanism by which developers can
alias import identifiers to one or more alternate identifiers.

This is incredibly useful for importing built-in modules because we can use the
polyfill URL in our code, and then map that URL to the built-in module. Browsers
that support import maps and the built-in module load it, and browsers that
don't will load the polyfill as normal.

Here's how you do this with an import map:

```
<!-- The import map is inlined into your page -->
<script type="importmap">
{
  "imports": {
    "/path/to/kv-storage-polyfill.mjs": [
      "std:kv-storage",
      "/path/to/kv-storage-polyfill.mjs"
    ]
  }
}
</script>

<!-- Then any module scripts with import statements use the above map -->
<script type="module">
  import {storage} from '/path/to/kv-storage-polyfill.mjs';

  // Use `storage` ...
</script>
```

They key point in the above code is the URL `/path/to/kv-storage-polyfill.mjs`
is being mapped to _two_ different resources: `std:kv-storage` and
`/path/to/kv-storage-polyfill.mjs`.

So when the browser encounters an import statement referencing `/path/to/kv-
storage-polyfill.mjs`, it first tries to load `std:kv-storage`, and if it can't
then it falls back to loading `/path/to/kv-storage-polyfill.mjs` (which is the
same URL used in the import statement).

Again, the magic here is that the browser doesn't need to support import maps
_or_ built-in modules for this technique to work since the URL being passed to
the import statement is the URL for the polyfill. The polyfill is not actually a
fallback, it's the default. The built-in module is a progressive enhancement!

## What about browsers that don't support modules at all?

In order to use import maps to conditionally load built-in modules, you have to
actually use `import` statements, which also means you have to use [module
scripts](/web/fundamentals/primers/modules#module-vs-script), i.e.
`<script type="module">`.

Currently, more than [80% of browsers support
modules](https://caniuse.com/#feat=es6-module), and for browsers that don't, you
can use the [module/nomodule
technique](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
to serve a legacy bundle to older browsers.

Note that in the legacy bundle you'll need to include all the built-in module
polyfills since you know for sure that browsers that don't support modules will
definitely not support built-in modules.

For your module code you _don't_ want to bundle your polyfills; instead, you
want to deploy them as separate files so browsers can import them on-demand
based on whether they support the corresponding built-in module (or not).

To summarize everything I've said in this section so far, built-in modules (with
the help of import maps) can actually be used today in your applications because
there's a viable way to use them while still supporting older browsers. Here's
what that support matrix looks like:

* Browsers that support modules, import maps, and the built-in module do not
  load any unneeded code.
* Browsers that support modules and import maps but do not support the built-in
  module load the polyfill (via the browser's module loader)
* Browsers that support modules but do not support import maps load the polyfill
  (via the browser's module loader)
* Browsers that do not support modules get the polyfill in their legacy bundle
  (loaded via `<script nomodule>`).

## KV Storage demo

To illustrate that it's possible to use built-in modules today while still
supporting older browsers, I've put together a
[demo](https://rollup-built-in-modules.glitch.me/) that uses the built-in KV
Storage module in browsers that support it and a [KV Storage
polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill) in browsers
that don't. The demo also includes a `nomodule` version of the code, so it even
works in legacy browsers without module support (like Internet Explorer).

The demo is hosted on Glitch, so you can [view its
source](https://glitch.com/edit/#!/rollup-built-in-modules?path=rollup.config.js).
I also have a detailed explanation of the implementation in the
[README](https://glitch.com/edit/#!/rollup-built-in-modules?path=README.md).
Feel free to take a look if you're curious to see how it's built.

<aside>
  <p><strong>Note:</strong> the demo uses <a href="https://rollupjs.org">
  Rollup</a> to bundle the application code, the polyfill, and to generate the
  various versions required to get it working cross-browser. I wanted to make a
  similar demo built with webpack, but it doesn't currently support a module
  output format, so this isn't yet possible.</p>
  <p>I've filed a feature request to add support for built-in modules in
  webpack. If you'd like to see this supported in webpack as well, please
  voice your support in the issue.</p>
</aside>

In order to actually see the built-in module in action, you have to load the
demo in Chrome 74 (currently Chrome Dev or Canary) with the experimental web
platform features flag turned on
(`chrome://flags/#enable-experimental-web-platform-features`).

You can verify that the built-in module is being loaded because you won't see
the polyfill script in the source panel in DevTools; instead you'll see the
built-in module version (fun fact: you can actually inspect the module's source
code or even put breakpoints in it!):

<figure class="screenshot">
  <a href="/web/updates/images/2019/03/kv-storage-devtools-source.png">
    <img src="/web/updates/images/2019/03/kv-storage-devtools-source.png"
         alt="The KV Storage module source in Chrome DevTools"
         style="display: block">
  </a>
</figure>

## Please give us feedback

This introduction should have given you a taste of what's possible with built-in
modules. And hopefully you're excited! We'd really love for developers to try
out the KV Storage API and give us feedback.

Here are the GibHub links where you can give us feedback for each of the
features mentioned in this article:

- [KV Storage](https://github.com/WICG/kv-storage)
- [KV Storage Polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill)
- [Built-in modules](https://github.com/tc39/proposal-javascript-standard-library)
- [Import Maps](https://github.com/WICG/import-maps)

If your site currently uses `localStorage`, you should try switching to the KV
Storage API, and if you sign up for the [KV Storage origin
trial](https://developers.chrome.com/origintrials/#/trials/active), you can
actually deploy your changes today! All your users should benefit from better
performance, and Chrome 74+ users won't have to pay any extra download cost.

{% include "web/_shared/rss-widget-updates.html" %}