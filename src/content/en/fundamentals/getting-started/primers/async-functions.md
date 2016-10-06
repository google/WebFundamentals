project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: TODO

{# wf_published_on: 2016-10-07 #}
{# wf_updated_on: 2016-10-07 #}

# Async functions - making promises friendly {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Async functions are enabled by default in Chrome 55 and they're quite frankly marvelous. They allow you to write promise-based code as if it were synchronous, but without blocking the main thread.

Async functions look like this:

    async function myFirstAsyncFucntion() {
      try {
        const resolvedValue = await aPromise;
      }
      catch (rejectedValue) {
        // …
      }
    }

If you use the `async` keyword before a function definition, you can then use `await` within the function. When you `await` a promise, the function is paused until the promise settles. If the promise fulfills, you get the value back. If the promise rejects, the rejected value is thrown.

Note: If you're unfamiliar with promises & promise terminology, check out [our promises guide](/web/fundamentals/getting-started/primers/promises).

Calling an async function returns a promise for whatever the function returns or throws. So:

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

…calling `hello()` returns a promise that *fulfills* with `"world"`.

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

…calling `foo()` returns a promise that *rejects* with `Error('bar')`.

## Example: Logging a fetch

Say we wanted to fetch a URL and log the response as text. Here's how it looks using promises:

    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

And here's the same thing using async functions:

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

It's the same number of lines, but all the callbacks are gone, making it way easier to read, especially for those less familiar with promises.

## Other async function syntax

We've seen `async function() {}` already, but the `async` keyword can be used with other function syntax:

### Arrow functions

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

Note: `array.map(func)` doesn't care that I gave it an async function, it just sees it as a function that returns a promise. It won't wait for the first function to complete before calling the second.

### Object methods

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

### Class methods

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

Note: Class constructors cannot be async.

## Example: Streaming a response

Note: If you're unfamiliar with streaming, [check out my guide](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}.

The benefit of async functions increases in more complex examples. Say we wanted to stream a response, logging out the chunks and returning the final size:

Here it is with promises:

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

Look at that! See how I'm calling `processResult` inside itself to set up an asynchronous loop? Writing that made me feel *very smart*. But like most "smart" code you have to stare at it for ages to figure out what it's doing, like one of those magic-eye pictures from the 90's.

Let's try that again with async functions:

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result;
      let total = 0;

      while ((result = await reader.read()) && !result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
      }

      return total;
    }

The asynchronous loop that made me feel so smug is replaced with a trusty, boring, while-loop. Much better.

Note: The phrase "logging out the chunks" made me sick in my mouth.

## Example: Avoid going too linear

Ok, last example. Say we wanted to fetch a sequence of URLs and log them as soon as possible, in the correct order.

*Deep breath* - here's how that looks with promises:

    function logInOrder(urls) {
      // go fetch
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

Check me out, Jake "wielder of promises" Archibald, using `reduce` to process a sequence of promises. That's definitely a bit of *so smart* coding we'd be better off without.

When converting the above to an async function, it's tempting to go *too linear*:

<span class="compare-worse">Not recommended</span> - too linear

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

Looks much neater, but my second fetch doesn't begin until my first fetch has been fully read, and so on. This is much slower than the promises example that performs the fetches in parallel. Thankfully there's an ideal middle-ground:

<span class="compare-better">Recommended</span> - nice and parallel

    async function logInOrder(urls) {
      // go fetch
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

In this example, the URLs are fetched and read as text in parallel, but the "smart" `reduce` bit is replaced with a standard, readable, for-loop.

## Browser support & workarounds

At time of writing, async functions are enabled by default in Chrome 55, but they're being developed in all the main browsers:

* Edge - [In build 14342+ behind a flag](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [active development](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [active development](https://bugs.webkit.org/show_bug.cgi?id=156147)

### Workaround - Generators

If you're targeting browsers that support generators (which includes [the latest version of every major browser](http://kangax.github.io/compat-table/es6/#test-generators){: .external}) you can sort-of polyfill async functions.

Babel will do this for you, [here's an example via the Babel REPL](https://goo.gl/0Cg1Sq){: .external} - note how similar the transpiled code is.

Note: Babel REPL is fun to say. Try it.

I recommend the transpiling approach, because you can just turn it off once your target browsers support async functions, but if you *really* don't want to use a transpiler, you can take [Babel's polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25) and use it yourself. Instead of:

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

…you'd write:

    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

Note that you have to pass in a generator (`function*`) and use `yield` instead of `await`. Other than that it works the same.

### Workaround - regenerator

If you're targeting older browsers, Babel can also transpile generators, allowing you to use async functions all the way down to IE8.

The [output is not as pretty](https://goo.gl/jlXboV), so watch out for code-bloat.