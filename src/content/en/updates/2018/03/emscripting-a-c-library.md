project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Emscripting a C library to Wasm

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-03-05 #}
{# wf_tags: webassembly #}
{# wf_featured_image: /web/updates/images/2018/03/emscripting-a-c-library/wasmcode.png #}
{# wf_featured_snippet: Wasm allows you to run C code on the web. #}
{# wf_blink_components: Blink #}


# Emscripting a C library to Wasm {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

Sometimes you want to use a library that is only available as C or C++ code.
Traditionally, this is where you give up. Well, not anymore, because now we have
[Emscripten](http://emscripten.org/) and [WebAssembly](http://webassembly.org/)
(or Wasm)!

Note: In this article I will describe my journey of compiling
[libwebp](https://github.com/webmproject/libwebp) to Wasm. To make use of this
article as well as Wasm in general, you will need knowledge of C, especially
pointers, memory management and compiler options.


## The toolchain

I set myself the goal of working out how to compile some existing C code to
Wasm. There's been some noise around [LLVM](http://llvm.org/)'s Wasm backend, so
I started digging into that. While [you can get simple programs to
compile](https://twitter.com/dassurma/status/752621241886990337?lang=en) this
way, the second you want to use C's standard library or even compile multiple
files, you will probably run into problems. This led me to the major lesson I
learned:

While Emscripten _used_ to be a C-to-asm.js compiler, it has since
matured to target Wasm and is [in the
process](https://github.com/kripken/emscripten/issues/6168) of switching to the
official LLVM backend internally. Emscripten also provides a Wasm-compatible
implementation of C's standard library. **Use Emscripten**. It [carries a lot of
hidden
work](https://kripken.github.io/emscripten-site/docs/porting/emscripten-runtime-environment.html),
emulates a file system, provides memory management, wraps OpenGL with WebGL — a
lot of things that you really don't need to experience developing for yourself.

While that might sound like you have to worry about bloat — I certainly worried
— the Emscripten compiler removes everything that's not needed. In my
experiments the resulting Wasm modules are appropriately sized for the logic
that they contain and the Emscripten and WebAssembly teams are working on making
them even smaller in the future.

You can get Emscripten by following the instructions on their
[website](http://emscripten.org) or using Homebrew. If you are a fan of
dockerized commands like me and don't want to install things on your system just
to have a play with WebAssembly, there is a well-maintained [Docker
image](https://hub.docker.com/r/trzeci/emscripten/) that you can use instead:

    $ docker pull trzeci/emscripten
    $ docker run --rm -v $(pwd):/src trzeci/emscripten emcc <emcc options here>

## Compiling something simple

Let's take the almost canonical example of writing a function in C that
calculates the n<sup>th</sup> fibonacci number:

    #include <emscripten.h>

    EMSCRIPTEN_KEEPALIVE
    int fib(int n) {
      int i, t, a = 0, b = 1;
      for (i = 0; i < n; i++) {
        t = a + b;
        a = b;
        b = t;
      }
      return b;
    }

If you know C, the function itself shouldn't be too surprising. Even if you
don't know C but know JavaScript, you will hopefully be able to understand
what's going on here.

`emscripten.h` is a header file provided by Emscripten. We only need it so we
have access to the `EMSCRIPTEN_KEEPALIVE` macro, but it [provides much more
functionality](https://kripken.github.io/emscripten-site/docs/api_reference/emscripten.h.html).
This macro tells the compiler to not remove a function even if it appears
unused. If we omitted that macro, the compiler would optimize the function away
— nobody is using it after all.

Let's save all that in a file called `fib.c`. To turn it into a `.wasm` file we
need to turn to Emscripten's compiler command `emcc`:

    $ emcc -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' fib.c

Let's dissect this command. `emcc` is Emscripten's compiler. `fib.c` is our C
file. So far, so good. `-s WASM=1` tells Emscripten to give us a Wasm file
instead of an [asm.js](http://asmjs.org/) file.. `-s
EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]'` tells the compiler to leave the
`cwrap()` function available in the JavaScript file — more on this function
later. `-O3` tells the compiler to optimize aggressively. You can choose lower
numbers to decrease build time, but that will also make the resulting bundles
bigger as the compiler might not remove unused code.

After running the command you should end up with a JavaScript file called
`a.out.js` and a WebAssembly file called `a.out.wasm`. The Wasm file (or
"module") contains our compiled C code and should be fairly small. The
JavaScript file takes care of loading and initializing our Wasm module and
providing a nicer API. If needed it will also take care of setting up the stack,
the heap and other functionality usually expected to be provided by the
operating system when writing C code. As such the JavaScript file is a bit
bigger, weighing in at 19KB (~5KB gzip'd).


## Running something simple

The easiest way to load and run your module is to use the generated JavaScript
file. Once you load that file, you will have a [`Module`
global](https://kripken.github.io/emscripten-site/docs/api_reference/module.html)
at your disposal. Use
[`cwrap`](https://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html#cwrap)
to create a JavaScript native function that takes care of converting parameters
to something C-friendly and invoking the wrapped function. `cwrap` takes the
function name, return type and argument types as
arguments, in that order:

    <script src="a.out.js"></script>
    <script>
      Module.onRuntimeInitialized = _ => {
        const fib = Module.cwrap('fib', 'number', ['number']);
        console.log(fib(12));
      };
    </script>

If you [run this
code](https://googlechrome.github.io/samples/webassembly/index.html), you should
see the "233" in the console, which is the 12th Fibonacci number.

Note: Emscripten offers a couple of options to handle loading multiple modules.
More about that in their
[documentation](https://kripken.github.io/emscripten-site/docs/getting_started/FAQ.html#how-can-i-tell-when-the-page-is-fully-loaded-and-it-is-safe-to-call-compiled-functions).

## The holy grail: Compiling a C library

Up until now, the C code we have written was written with Wasm in mind. A core
use-case for WebAssembly, however, is to take the existing ecosystem of C
libraries and allow developers to use them on the web. These libraries often
rely on C's standard library, an operating system, a file system and other
things. Emscripten provides most of these features, although there are some
[limitations](https://kripken.github.io/emscripten-site/docs/porting/guidelines/api_limitations.html).

Let's go back to my original goal: compiling an encoder for WebP to Wasm. The
source for the WebP codec is written in C and available on
[GitHub](https://github.com/webmproject/libwebp) as well as some extensive [API
documentation](/speed/webp/docs/api). That's a
pretty good starting point.

    $ git clone https://github.com/webmproject/libwebp

To start off simple, let's try to expose `WebPGetEncoderVersion()` from
`encode.h` to JavaScript by writing a C file called `webp.c`:

    #include "emscripten.h"
    #include "src/webp/encode.h"

    EMSCRIPTEN_KEEPALIVE
    int version() {
      return WebPGetEncoderVersion();
    }

This is a good simple program to test if we can get the source code of libwebp
to compile, as we don't require any parameters or complex data structures to
invoke this function.

To compile this program, we need to tell the compiler where it can find
libwebp's header files using the `-I` flag and also pass it all the C files of
libwebp that it needs. I'm going to be honest: I just gave it __all__ the C
files I could find and relied on the compiler to strip out everything that was
unnecessary. It seemed to work brilliantly!

    $ emcc -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' \
        -I libwebp \
        webp.c \
        libwebp/src/{dec,dsp,demux,enc,mux,utils}/*.c

Note: This strategy will not work with every C project out there. Many projects
rely on autoconf/automake to generate system-specific code before compilation.
Emscripten provides `emconfigure` and `emmake` to wrap these commands and inject
the appropriate parameters. You can find more in the [Emscripten
documentation](https://kripken.github.io/emscripten-site/docs/compiling/Building-Projects.html).

Now we only need some HTML and JavaScript to load our shiny new module:

    <script src="/a.out.js"></script>
    <script>
      Module.onRuntimeInitialized = async _ => {
        const api = {
          version: Module.cwrap('version', 'number', []),
        };
        console.log(api.version());
      };
    </script>

And we will see the correction version number in the
[output](https://googlechrome.github.io/samples/webassembly/version.html):

<img src="/web/updates/images/2018/03/emscripting-a-c-library/version.png" alt="
  Screenshot of the DevTools console showing the correct version
number.">

Note: libwebp returns the current version a.b.c as a hexadecimal number 0xabc.
So v0.6.1 is encoded as 0x000601 = 1537.

### Get an image from JavaScript into Wasm

Getting the encoder's version number is great and all, but encoding an actual
image would be more impressive, right? Let's do that, then.

The first question we have to answer is: How do we get the image into Wasm land?
Looking at the [encoding API of
libwebp](/speed/webp/docs/api#simple_encoding_api),
it expects an array of bytes in RGB, RGBA, BGR or BGRA. Luckily, the Canvas API
has
[`getImageData()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData),
that gives us an
[Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
containing the image data in RGBA:

    async function loadImage(src) {
      // Load image
      const imgBlob = await fetch(src).then(resp => resp.blob());
      const img = await createImageBitmap(imgBlob);
      // Make canvas same size as image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw image onto canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, img.width, img.height);
    }

Now it's "only" a matter of copying the data from JavaScript land into Wasm
land. For that, we need to expose two additional functions. One that allocates
memory for the image inside Wasm land and one that frees it up again:

    EMSCRIPTEN_KEEPALIVE
    uint8_t* create_buffer(int width, int height) {
      return malloc(width * height * 4 * sizeof(uint8_t));
    }

    EMSCRIPTEN_KEEPALIVE
    void destroy_buffer(uint8_t* p) {
      free(p);
    }

`create_buffer` allocates a buffer for the RGBA image — hence 4 bytes per
pixel. The pointer returned by `malloc()` is the address of the first memory
cell of that buffer. When the pointer is returned to JavaScript land, it is
treated as just a number. After exposing the function to JavaScript using
`cwrap`, we can use that number to find the start of our buffer and copy the
image data.

    const api = {
      version: Module.cwrap('version', 'number', []),
      create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
      destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
    };

<div class="clearfix"></div>

    const image = await loadImage('/image.jpg');
    const p = api.create_buffer(image.width, image.height);
    Module.HEAP8.set(image.data, p);
    // ... call encoder ...
    api.destroy_buffer(p);


### Grand Finale: Encode the image

The image is now available in Wasm land. It is time to call the WebP encoder to
do its job! Looking at the [WebP
documentation](/speed/webp/docs/api#simple_encoding_api),
`WebPEncodeRGBA` seems like a perfect fit. The function takes a pointer to the
input image and its dimensions, as well as a quality option between 0 and 100.
It also allocates an output buffer for us, that we need to free using
`WebPFree()` once we are done with the WebP image.

The result of the encoding operation is an output buffer and its length. Because
functions in C can't have arrays as return types (unless we allocate memory
dynamically), I resorted to a static global array. I know, not clean C (in fact,
it relies on the fact that Wasm pointers are 32bit wide), but to keep things
simple I think this is a fair shortcut.

    int result[2];
    EMSCRIPTEN_KEEPALIVE
    void encode(uint8_t* img_in, int width, int height, float quality) {
      uint8_t* img_out;
      size_t size;

      size = WebPEncodeRGBA(img_in, width, height, width * 4, quality, &img_out);

      result[0] = (int)img_out;
      result[1] = size;
    }

    EMSCRIPTEN_KEEPALIVE
    void free_result(uint8_t* result) {
      WebPFree(result);
    }

    EMSCRIPTEN_KEEPALIVE
    int get_result_pointer() {
      return result[0];
    }

    EMSCRIPTEN_KEEPALIVE
    int get_result_size() {
      return result[1];
    }

Now with all of that in place, we can call the encoding function, grab the
pointer and image size, put it in a JavaScript-land buffer of our own, and
release all the Wasm-land buffers we have allocated in the process.

    api.encode(p, image.width, image.height, 100);
    const resultPointer = api.get_result_pointer();
    const resultSize = api.get_result_size();
    const resultView = new Uint8Array(Module.HEAP8.buffer, resultPointer, resultSize);
    const result = new Uint8Array(resultView);
    api.free_result(resultPointer);

Note: `new Uint8Array(someBuffer)` will create a new view onto the same memory
chunk, while `new Uint8Array(someTypedArray)` will copy the data.

Depending on the size of your image, you might run into an error where Wasm
can't grow the memory enough to accommodate both the input and the output image:

<img src="/web/updates/images/2018/03/emscripting-a-c-library/error.png" alt="
  Screenshot of the DevTools console showing an error.">

Luckily, the solution to this problem is in the error message! We just need to
add `-s ALLOW_MEMORY_GROWTH=1` to our compilation command.

And there you have it! We compiled a WebP encoder and transcoded a JPEG image to
WebP. To prove that it worked, we can turn our result buffer into a blob and use
it on an `<img>` element:

    const blob = new Blob([result], {type: 'image/webp'});
    const blobURL = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = blobURL;
    document.body.appendChild(img)

[Behold, the glory of a new WebP
image](https://googlechrome.github.io/samples/webassembly/image.html)!

<img src="/web/updates/images/2018/03/emscripting-a-c-library/result.jpg" alt="
  DevTools’ network panel and the generated image.">

## Conclusion

It's not a walk in the park to get a C library to work in the browser, but once
you understand the overall process and how the data flow works, it becomes
easier and the results can be mind-blowing.

WebAssembly opens many new possibilities on the web for processing, number
crunching and gaming. Keep in mind that Wasm is not a silver bullet that should
be applied to everything, but when you hit one of those bottlenecks, Wasm can be
an incredibly helpful tool.

## Bonus content: Running something simple the hard way
If you want to try and avoid the generated JavaScript file, you might be able
to. Let's go back to the Fibonacci example. To load and run it ourselves, we can
do the following:

    <!doctype html>
    <script>
      (async function() {
        const imports = {
          env: {
            memory: new WebAssembly.Memory({initial: 1}),
            STACKTOP: 0,
          }
        };
        const {instance} = await WebAssembly.instantiateStreaming(fetch('/a.out.wasm'), imports);
        console.log(instance.exports._fib(12));
      })();
    </script>

Note: Make sure that your `.wasm` files have `Content-Type: application/wasm`.
Otherwise they will be rejected by WebAssembly.

WebAssembly modules that have been created by Emscripten have no memory to work
with unless you provide them with memory. The way you provide a Wasm module with
_anything_ is by using the `imports` object — the second parameter of the
`instantiateStreaming` function. The Wasm module can access everything inside
the imports object, but nothing else outside of it. By convention, modules
compiled by Emscripting expect a couple of things from the loading JavaScript
environment:

* Firstly, there is `env.memory`. The Wasm module is unaware of the outside
world so to speak, so it needs to get some memory to work with. Enter
[`WebAssembly.Memory`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory).
It represents a (optionally growable) piece of linear memory. The sizing
parameters are in "in units of WebAssembly pages", meaning the code above
allocates 1 page of memory, with each page having a size of 64
[KiB](https://en.wikipedia.org/wiki/Kibibyte). Without providing a `maximum`
option, the memory is theoretically unbounded in growth (Chrome currently has a
hard limit of 2GB). Most WebAssembly modules shouldn't need to set a maximum.
* `env.STACKTOP` defines where the stack is supposed to start growing. The stack
is needed to make function calls and to allocate memory for local variables.
Since we don't do any dynamic memory management shenanigans in our little
Fibonacci program, we can just use the entire memory as a stack, hence `STACKTOP
= 0`.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
