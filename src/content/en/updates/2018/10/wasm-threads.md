project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: WebAssembly thread support has shipped in Chrome 70 under an origin-trial.

{# wf_published_on: 2018-10-29 #}
{# wf_updated_on: 2019-09-25 #}
{# wf_tags: webassembly,threads #}
{# wf_featured_image: /web/updates/images/generic/info.png #}
{# wf_featured_snippet: WebAssembly threads enable an application to make use of parallel threads running while sharing the same memory address space. This enables libraries and applications that rely on pthreads to be ported to run in the browser. This feature is being run under an origin-trial to solicit feedback from the developer community. #}
{# wf_blink_components: Blink #}

# WebAssembly Threads ready to try in Chrome 70 {: .page-title }

{% include "web/_shared/contributors/alexdanilo.html" %}

Note: WebAssembly threads are enabled by default in Chrome 74 for desktop.
The origin trial mentioned in this article ended in Chrome 75.

WebAssembly (Wasm) enables compilation of code written in C++ and other
languages to run on the web. One very useful feature of native applications
is the ability to use threads - a primitive for parallel computation. Most C
and C++ developers would be familiar with
**[_pthreads_](https://en.wikipedia.org/wiki/POSIX_Threads)** which is a
standardized API for thread management in an application.

The [WebAssembly Community Group](https://www.w3.org/community/webassembly/) has
been working on bringing threads to the web to enable real multi-threaded
applications. As part of this effort, V8 has implemented necessary support for
threads in the WebAssembly engine, available through an
[Origin Trial](https://github.com/GoogleChrome/OriginTrials). Origin Trials
allow developers to experiment with new web features before they are fully
standardized. This allows us to gather real-world feedback from intrepid
developers, which is critical to validate and improve new features.

The Chrome 70 release supports threads for WebAssembly and we encourage
interested developers to start using them and give us feedback.

## Threads? What about Workers?

Browsers have supported parallelism via Web Workers since 2012 in Chrome 4; in
fact it's normal to hear terms like 'on the main thread' etc. However, Web
Workers do not share mutable data between them, instead relying on
message-passing for communication. In fact, Chrome allocates a new V8 engine
for each of them (called isolates). Isolates share neither compiled code nor
JavaScript objects, and thus they cannot share mutable data like pthreads.

WebAssembly threads, on the other hand, are threads that can share the same Wasm
memory. The underlying storage of the shared memory is accomplished with a
[SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer),
a JavaScript primitive that allows sharing a single ArrayBuffer's contents
concurrently between workers. Each WebAssembly thread runs in a Web Worker, but
their shared Wasm memory allows them to work much like they do on native
platforms. This means that the applications that use Wasm threads are
responsible for managing access to the shared memory as in any traditional
threaded application. There are many existing code libraries written in C or C++
that use **_pthreads_**, and those can be compiled to Wasm and run in true
threaded mode, allowing more cores to work on the same data simultaneously. 

## A simple example

Here's an example of a simple 'C' program that uses threads.

```c
#include <pthread.h>
#include <stdio.h>

// Calculate Fibonacci numbers shared function
int fibonacci(int iterations) {
    int     val = 1;
    int     last = 0;

    if (iterations == 0) {
        return 0;
    }
    for (int i = 1; i < iterations; i++) {
        int     seq;

        seq = val + last;
        last = val;
        val = seq;
    }
    return val;
}
// Start function for the background thread
void *bg_func(void *arg) {
    int     *iter = (void *)arg;

    *iter = fibonacci(*iter);
    return arg;
}
// Foreground thread and main entry point
int main(int argc, char *argv[]) {
    int         fg_val = 54;
    int         bg_val = 42;
    pthread_t   bg_thread;

    // Create the background thread
    if (pthread_create(&bg_thread, NULL, bg_func, &bg_val)) {
        perror("Thread create failed");
        return 1;
    }
    // Calculate on the foreground thread
    fg_val = fibonacci(fg_val);
    // Wait for background thread to finish
    if (pthread_join(bg_thread, NULL)) {
        perror("Thread join failed");
        return 2;
    }
    // Show the result from background and foreground threads
    printf("Fib(42) is %d, Fib(6 * 9) is %d\n", bg_val, fg_val);

    return 0;
}
```

That code begins with the **<code>main()</code>** function which declares 2
variables <strong><code>fg_val</code></strong> and
<strong><code>bg_val</code></strong>. There is also a function called
<strong><code>fibonacci()</code></strong>, which will be called by both of the
threads in this example. The <strong><code>main()</code></strong> function
creates a background thread using <strong><code>pthread_create()</code></strong>
whose task is to calculate the fibonacci number sequence value corresponding to
the value of the <strong><code>bg_val</code></strong> variable. Meanwhile, the
<strong><code>main()</code></strong> function running in the foreground thread
calculates it for the <strong><code>fg_val</code></strong> variable. Once the
background thread has completed running, the results are printed out.

## Compile for thread support

First, you should have the [emscripten SDK](https://github.com/juj/emsdk)
installed, preferably version 1.38.11 or later. To build our example code with
[threads enabled](https://kripken.github.io/emscripten-site/docs/porting/pthreads.html)
for running in the browser, we need to pass a couple of extra flags to the
[emscripten](http://kripken.github.io/emscripten-site/) **_emcc_** compiler. Our
command line looks like this:

```bash
emcc -O2 -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=2 -o test.js test.c
```

The command line argument '`-s USE_PTHREADS=1`' turns on threading support for
the compiled WebAssembly module and the argument '`-s PTHREAD_POOL_SIZE=2`'
tells the compiler to generate a pool of two (2) threads.

When the program is run, under the hood it will load the WebAssembly module,
create a Web Worker for each of the threads in the thread pool, share the module
with each of the workers, in this case it's 2, and those will be used whenever a
call to **<code>pthread_create()</code>** is made. Each worker instantiates the
Wasm module with the same memory, allowing them to cooperate. V8's newest
changes in 7.0 share the compiled native code of Wasm modules that are passed
between workers, which allows even very large applications to scale to many
workers. Note, it makes sense to make sure the thread pool size is equal to the
maximum number of threads your application needs, or thread creation may fail.
At the same time, if the thread pool size is too large, you'll be creating
unnecessary Web Workers that'll sit around doing nothing but using memory.

## How to try it out

The quickest way to test out our WebAssembly module is to turn on the
experimental WebAssembly threads support in Chrome 70 onwards. Navigate to the
URL **<code>chrome://flags</code>** in your browser as shown below:

<img src="/web/updates/images/2018/10/WasmThreads1.png" alt="Chrome flags page">

Next, find the experimental WebAssembly threads setting which looks like this:

<img src="/web/updates/images/2018/10/WasmThreads2.png"
     alt="WebAssembly threads setting">

Change the setting to **_Enabled_** as shown below, then restart your browser.

<img src="/web/updates/images/2018/10/WasmThreads3.png"
     alt="WebAssembly threads setting enabled">

After the browser has restarted, we can try loading the threaded WebAssembly
module with a minimal HTML page, containing just this content:

```html
<!DOCTYPE html>
<html>
  <title>Threads test</title>
  <body>
    <script src="test.js"></script>
  </body>
</html>
```

To try this page, you'll need to run some form of web server and load it from
your browser. That will cause the WebAssembly module to load and run. Opening
DevTools shows us the output from the run, and you should see something like the
output image below in the console:

<img src="/web/updates/images/2018/10/WasmThreads4.png"
     alt="Console output from fibonacci program">

Our WebAssembly program with threads has executed successfully! We'd encourage
you to try out your own threaded application using the steps outlined above.

## Testing in the field with an Origin Trial

Trying out threads by turning on experimental flags in the browser is fine for
development purposes, but if you'd like to test your application out in the
field, you can do so with what's known as an
[origin trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md).

Origin trials let you try out experimental features with your users by obtaining
a testing token that's tied to your domain. You can then deploy your app and
expect it to work in a browser that can support the feature you're testing (in
this case Chrome 70 onwards). To obtain your own token to run an origin trial,
use the application
[form here](https://docs.google.com/forms/d/e/1FAIpQLSfO0_ptFl8r8G0UFhT0xhV17eabG-erUWBDiKSRDTqEZ_9ULQ/viewform).

We've hosted our simple example above using an origin trial token, so you can
[try it out for yourself](https://alex-wasm.appspot.com/threads/index.html)
without needing to build anything.

If you want to see what 4 threads running in parallel can do for ASCII art, then
you must take a
[look at this demo](https://alex-wasm.appspot.com/threads/pthread.html) as well!

## Give us feedback

WebAssembly threads are an extremely useful new primitive for porting
applications to the web. It's now possible to run C and C++ applications and
libraries which require **_pthreads_** support in the WebAssembly environment.

We're looking for feedback from developers trying out this feature as it'll help
inform the standardization process as well as validate its usefulness. The best
way to send feedback is to
[report issues](https://bugs.chromium.org/p/chromium/issues/list) and/or get
involved with the [standardization](https://github.com/WebAssembly/threads)
process in the
[WebAssembly Community Group](https://www.w3.org/community/webassembly/).

{% include "web/_shared/rss-widget-updates.html" %}

