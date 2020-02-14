project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: An introduction to the new KV Storage API, built-in modules, and import maps.

{# wf_updated_on: 2020-02-14 #}
{# wf_published_on: 2019-03-11 #}
{# wf_tags: chrome74, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_featured_snippet: An introduction to the new KV Storage API, built-in modules, and import maps. #}
{# wf_blink_components: Blink>Storage #}

# KV Storage: the Web's First Built-in Module {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

Warning: KV Storage was originally launched as an origin trial. That trial has
ended, and KV Storage is no longer available.

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

Well, soon there may be. Chrome is
[experimenting](https://groups.google.com/a/chromium.org/d/msg/blink-dev/sEwWEF80T4s/Nss9VxM3BAAJ)
with a new feature known as [built-in
modules](https://github.com/tc39/proposal-javascript-standard-library), and the
first one we're planning to ship is an asynchronous key/value storage module
called [KV Storage](https://github.com/WICG/kv-storage).

But before I get into the details of the KV Storage module, let me explain
what I mean by _built-in modules_.

## What are built-in modules?

[Built-in modules](https://github.com/tc39/proposal-javascript-standard-library/)
are just like regular JavaScript
[modules](/web/fundamentals/primers/modules),
except that they don't have to be downloaded because they ship with the browser.

Like traditional web APIs, built-in modules must go through a standardization
process &mdash; each will have its own specification that requires a [design
review](https://github.com/w3ctag/design-reviews) and positive signs of
support from both web developers and other browser vendors before it can ship.
(In Chrome, built-in modules will follow the same [launch
process](https://www.chromium.org/blink/launching-features) we use to implement
and ship all new APIs.)

Unlike traditional web APIs, built-in modules are not exposed on the global
scope &mdash; they're only available via
[imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

Not exposing built-in modules globally has a lot of advantages: they won't add
any overhead to starting up a new JavaScript runtime context (e.g. a new tab,
worker, or service worker), and they won't consume any memory or CPU unless
they're actually imported. Furthermore, they don't run the risk of naming
collisions with other variables defined in your code.

To import a built-in module, you use the prefix `std:` followed by the built-in
module's identifier. For example, in <a href="#browser-support">supported
browsers</a>, you could import the KV Storage module with the following code
(see below for [how to use a KV Storage polyfill in unsupported
browsers](#what_if_a_browser_doesnt_support_a_built-in_module)):

```js
import storage, {StorageArea} from 'std:kv-storage';
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
main point of this module is that it's not synchronous, in contrast to
`localStorage`). To see the full API in detail, you can refer to the
[specification](https://wicg.github.io/kv-storage/#storagearea).

As you may have noticed from the code example above, the KV Storage module has
one default export `storage` and one named export `StorageArea`.

`storage` is an instance of the `StorageArea` class with the name `'default'`,
and it's what developers will use most often in their application code. The
`StorageArea` class is provided for cases where additional isolation is needed
(e.g. a third-party library that stores data and wants to avoid conflicts with
data stored via the default `storage` instance). `StorageArea` data is stored in
an IndexedDB database with the name `kv-storage:${name}`, where name is the name
of the `StorageArea` instance.

Here's an example of how to use the KV Storage module in your code:

Warning: KV Storage was originally launched as an origin trial. That trial has
ended, and KV Storage is no longer available.

```js
import storage from 'std:kv-storage';

const main = async () => {
  const oldPreferences = await storage.get('preferences');

  document.querySelector('form').addEventListener('submit', async () => {
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
built-in modules before we can use it in our code?_ Thankfully, the answer is no!

You can actually use built-in modules as soon as even one browser supports them
thanks to the help of another feature we're
[experimenting](https://groups.google.com/a/chromium.org/d/msg/blink-dev/sEwWEF80T4s/Nss9VxM3BAAJ)
with called [import maps](https://github.com/WICG/import-maps).

### Import maps

[Import maps](https://github.com/WICG/import-maps) are essentially a mechanism
by which developers can alias import identifiers to one or more alternate
identifiers.

This is powerful because it gives you a way to change (at runtime) how a
browser resolves a particular import identifier across your entire application.

In the case of built-in modules, this allows you to reference a polyfill of the
module in your application code, but a browser that supports the built-in module
can load that version instead!

Here's how you would declare an import map to make this work with the KV Storage
module:

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
  import storage from '/path/to/kv-storage-polyfill.mjs';

  // Use `storage` ...
</script>
```

The key point in the above code is that the URL `/path/to/kv-storage-polyfill.mjs`
is being mapped to _two_ different resources: `std:kv-storage` and then the
original URL again, `/path/to/kv-storage-polyfill.mjs`.

So when the browser encounters an import statement referencing that URL
(`/path/to/kv-storage-polyfill.mjs`), it first tries to load `std:kv-storage`,
and if it can't, then it falls back to loading
`/path/to/kv-storage-polyfill.mjs`.

Again, the magic here is that the browser doesn't need to support import maps
_or_ built-in modules for this technique to work since the URL being passed to
the import statement is the URL for the polyfill. The polyfill is not actually a
fallback, it's the default. The built-in module is a progressive enhancement!

## What about browsers that don't support modules at all?

In order to use import maps to conditionally load built-in modules, you have to
actually use `import` statements, which also means you have to use [module
scripts](/web/fundamentals/primers/modules#module-vs-script), i.e.
`<script type="module">`.

Currently, [more than 80% of browsers support
modules](https://caniuse.com/#feat=es6-module), and for browsers that don't,
you can use the [module/nomodule
technique](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
to serve a legacy bundle. Note that when generating your
`nomodule` build, you'll need to include all polyfills because you know for sure
that browsers that don't support modules will definitely not support built-in
modules.

## KV Storage demo

Warning: KV Storage was originally launched as an origin trial. That trial has
ended, and KV Storage is no longer available.

To illustrate that it's possible to use built-in modules while still supporting
older browsers, I've put together a
[demo](https://rollup-built-in-modules.glitch.me/) that incorporates all the
techniques described above and runs in all browsers today:

* Browsers that support modules, import maps, and the built-in module do not
  load any unneeded code.
* Browsers that support modules and import maps but do not support the built-in
  module load the [KV Storage
  polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill) (via the
  browser's module loader).
* Browsers that support modules but do not support import maps also load the
  KV Storage polyfill (via the browser's module loader).
* Browsers that do not support modules at all get the KV Storage polyfill in
  their legacy bundle (loaded via `<script nomodule>`).

The demo is hosted on Glitch, so you can [view its
source](https://glitch.com/edit/#!/rollup-built-in-modules).
I also have a detailed explanation of the implementation in the
[README](https://glitch.com/edit/#!/rollup-built-in-modules?path=README.md).
Feel free to take a look if you're curious to see how it's built.

<aside>
  <p><strong>Note:</strong> the demo uses <a href="https://rollupjs.org">
  Rollup</a> to bundle the application code and the polyfill, and to generate
  the various versions required to get it working cross-browser. I wanted to
  make a similar demo built with <a href="https://webpack.js.org/">webpack</a>,
  but it doesn't currently support a module output format, so this isn't yet
  possible.</p>
  <p>I've filed a
  <a href="https://github.com/webpack/webpack/issues/8896">feature request</a>
  to add support for built-in modules in webpack. If you'd like to see this
  supported in webpack as well, please voice your support in the issue.</p>
</aside>

In order to actually see the native built-in module in action, you have to load
the demo in Chrome 74 or later with the experimental web
platform features flag turned on
(`chrome://flags/#enable-experimental-web-platform-features`).

You can verify that the built-in module is being loaded because you won't see
the polyfill script in the source panel in DevTools; instead, you'll see the
built-in module version (fun fact: you can actually inspect the module's source
code or even put breakpoints in it!):

<figure class="screenshot">
  <a href="/web/updates/images/2019/03/kv-storage-devtools-source.gif">
    <img src="/web/updates/images/2019/03/kv-storage-devtools-source.gif"
         alt="The KV Storage module source in Chrome DevTools"
         style="display: block">
  </a>
</figure>

## Please give us feedback

Warning: KV Storage was originally launched as an origin trial. That trial has
ended, and KV Storage is no longer available.

This introduction should have given you a taste of what may be possible with
built-in modules. And hopefully, you're excited! We'd really love for developers
to try out the KV Storage module (as well as all the new features discussed
here) and give us feedback.

Here are the GitHub links where you can give us feedback for each of the
features mentioned in this article:

- [KV Storage](https://github.com/WICG/kv-storage)
- [KV Storage Polyfill](https://github.com/GoogleChromeLabs/kv-storage-polyfill)
- [Built-in modules](https://github.com/tc39/proposal-javascript-standard-library)
- [Import Maps](https://github.com/WICG/import-maps)

If your site currently uses `localStorage`, you should try switching to the KV
Storage API to see if it meets all your needs. And if you sign up for the [KV
Storage origin
trial](https://developers.chrome.com/origintrials/#/trials/active), you can
actually deploy these features today. All your users should benefit from better
storage performance, and Chrome 74+ users won't have to pay any extra download
cost.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
