project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How do you integrate WebAssembly into this setup? In this article we are going to work this out with C/C++ and Emscripten as an example.

{# wf_updated_on: 2019-09-22 #}
{# wf_published_on: 2019-01-15 #}
{# wf_tags: webassembly #}
{# wf_featured_image: /web/updates/images/generic/webassembly.png #}
{# wf_featured_snippet: How do you integrate WebAssembly into this setup? In this article we are going to work this out with C/C++ and Emscripten as an example. #}
{# wf_blink_components: Blink #}

# Emscripten and npm {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

[WebAssembly](/web/updates/2018/03/emscripting-a-c-library) (wasm) is often
framed as either a performance primitive or a way to run your existing C++
codebase on the web. With [squoosh.app](https://squoosh.app), we wanted to show
that there is at least a third perspective for wasm: making use of the huge
ecosystems of other programming languages. With
[Emscripten](https://kripken.github.io/emscripten-site/), you can use C/C++ code,
[Rust has wasm support](https://rustwasm.github.io/book/) built in, and the [Go
team is working on it](https://github.com/golang/go/wiki/WebAssembly), too. I'm
sure many other languages will follow.

In these scenarios, wasm is not the centerpiece of your app, but rather a puzzle
piece: yet another module. Your app already has JavaScript, CSS, image assets, a
web-centric build system and maybe even a framework like React. How do you
integrate WebAssembly into this setup? In this article we are going to work this
out with C/C++ and Emscripten as an example.

## Docker

Note: While I will be using Docker, you don't need a deep understanding of
Docker to follow this article. If you have Docker installed on your machine, you
are good to go!

I have found Docker to be invaluable when working with Emscripten. C/C++
libraries are often written to work with the operating system they are built on.
It is incredibly helpful to have a consistent environment. With Docker you get a
virtualized Linux system that is already set up to work with Emscripten and has
all the tools and dependencies installed. If something is missing, you can just
install it without having to worry about how it affects your own machine or your
other projects. If something goes wrong, throw the container away and start
over. If it works once, you can be sure that it will continue to work and
produce identical results.

The [Docker Registry](https://hub.docker.com) has an [Emscripten
image](https://hub.docker.com/r/trzeci/emscripten/) by
[trzeci](https://github.com/trzecieu/) that I have been using extensively.

## Integration with npm

In the majority of cases, the entry point to a web project is npm's
`package.json`. By convention, most projects can be built with `npm install &&
npm run build`.

In general, the build artifacts produced by Emscripten (a `.js` and a `.wasm`
file) should be treated as just another JavaScript module and just another
asset. The JavaScript file can be handled by a bundler like webpack or rollup,
and the wasm file should be treated like any other bigger binary asset, like
images.

As such, the Emscripten build artifacts need to be built before your "normal"
build process kicks in:

    {
      "name": "my-worldchanging-project",
      "scripts": {
        "build:emscripten": "docker run --rm -v $(pwd):/src trzeci/emscripten
    ./build.sh",
        "build:app": "<the old build command>",
        "build": "npm run build:emscripten && npm run build:app",
        // ...
      },
      // ...
    }

The new `build:emscripten` task could invoke Emscripten directly, but as
mentioned before, I recommend using Docker to make sure the build environment is
consistent.

`docker run ... trzeci/emscripten ./build.sh` tells Docker to spin up a new
container using the `trzeci/emscripten` image and run the `./build.sh` command.
`build.sh` is a shell script that you are going to write next! `--rm` tells
Docker to delete the container after it's done running. This way, you don't build
up a collection of stale machine images over time. `-v $(pwd):/src` means that
you want Docker to "mirror" the current directory (`$(pwd)`) to `/src` inside
the container. Any changes you make to files in the `/src` directory inside the
container will be mirrored to your actual project. These mirrored directories
are called "bind mounts".

Let's take a look at `build.sh`:


    #!/bin/bash

    set -e

    export OPTIMIZE="-Os"
    export LDFLAGS="${OPTIMIZE}"
    export CFLAGS="${OPTIMIZE}"
    export CXXFLAGS="${OPTIMIZE}"

    echo "============================================="
    echo "Compiling wasm bindings"
    echo "============================================="
    (
      # Compile C/C++ code
      emcc \
        ${OPTIMIZE} \
        --bind \
        -s STRICT=1 \
        -s ALLOW_MEMORY_GROWTH=1 \
        -s MALLOC=emmalloc \
        -s MODULARIZE=1 \
        -s EXPORT_ES6=1 \
        -o ./my-module.js \
        src/my-module.cpp

      # Create output folder
      mkdir -p dist
      # Move artifacts
      mv my-module.{js,wasm} dist
    )
    echo "============================================="
    echo "Compiling wasm bindings done"
    echo "============================================="


There's a lot to dissect here!

`set -e` puts the shell into "fail fast" mode. If any commands in the script
return an error, the entire script gets aborted immediately. This can be
incredibly helpful as the last output of the script will always be a success
message or the error that caused the build to fail.

With the `export` statements, you define the values of a couple of environment
variables. They allow you to pass additional command-line parameters to the C
compiler (`CFLAGS`), the C++ compiler (`CXXFLAGS`), and the linker (`LDFLAGS`).
They all receive the optimizer settings via `OPTIMIZE` to make sure that
everything gets optimized the same way. There are a couple of possible values
for the `OPTIMIZE` variable:

* `-O0`: Don't do any optimization. No dead code is eliminated, and Emscripten
  does not minify the JavaScript code it emits, either. Good for debugging.
* `-O3`: Optimize aggressively for performance.
* `-Os`: Optimize aggressively for performance and size as a secondary
  criterion.
* `-Oz`: Optimize aggressively for size, sacrificing performance if necessary.

For the web, I mostly recommend `-Os`.

The `emcc` command has a myriad of options of its own. Note that emcc is
supposed to be a  "drop-in replacement for compilers like GCC or clang". So all
flags that you might know from GCC will most likely be implemented by emcc as
well. The `-s` flag is special in that it allows us to configure Emscripten
specifically. All available options can be found in Emscripten's
[`settings.js`](https://github.com/kripken/emscripten/blob/incoming/src/settings.js),
but that file can be quite overwhelming. Here's a list of the Emscripten flags
that I think are most important for web developers:

* `--bind` enables
  [embind](/web/updates/2018/08/embind).
* `-s STRICT=1` drops support for all deprecated build options. This ensures
  that your code builds in a forward compatible manner.
* `-s ALLOW_MEMORY_GROWTH=1` allows memory to be automatically grown if
  necessary. At the time of writing, Emscripten will allocate 16MB of memory
  initially. As your code allocates chunks of memory, this option decides if
  these operations will make the entire wasm module fail when memory is
  exhausted, or if the glue code is allowed to expand the total memory to
  accommodate the allocation.
* `-s MALLOC=...` chooses which `malloc()` implementation to use. `emmalloc` is
  a small and fast `malloc()` implementation specifically for Emscripten. The
  alternative is `dlmalloc`, a fully-fledged `malloc()` implementation. You only
  need to switch to `dlmalloc` if you are allocating a lot of small objects
  frequently or if you want to use threading.
* `-s EXPORT_ES6=1` will turn the JavaScript code into an ES6 module with a
  default export that works with any bundler. Also requires `-s MODULARIZE=1` to
  be set.

The following flags are not always necessary or are only helpful for debugging
purposes:

* `-s FILESYSTEM=0` is a flag that relates to Emscripten and it's ability to
  emulate a filesystem for you when your C/C++ code uses filesystem operations.
  It does some analysis on the code it compiles to decide whether to include the
  filesystem emulation in the glue code or not. Sometimes, however, this
  analysis can get it wrong and you pay a rather hefty 70kB in additional glue
  code for a filesystem emulation that you might not need. With `-s
  FILESYSTEM=0` you can force Emscripten to not include this code.
* `-g4` will make Emscripten include debugging information in the `.wasm` and
  also emit a source maps file for the wasm module. You can read more on
  debugging with Emscripten in their [debugging
  section](https://kripken.github.io/emscripten-site/docs/porting/Debugging.html).

And there you go! To test this setup, let's whip up a tiny `my-module.cpp`:

    #include <emscripten/bind.h>

    using namespace emscripten;

    int say_hello() {
      printf("Hello from your wasm module\n");
      return 0;
    }

    EMSCRIPTEN_BINDINGS(my_module) {
      function("sayHello", &say_hello);
    }

and an `index.html`:

    <!doctype html>
    <title>Emscripten + npm example</title>
    Open the console to see the output from the wasm module.
    <script type="module">
    import wasmModule from "./my-module.js";

    const instance = wasmModule({
      onRuntimeInitialized() {
        instance.sayHello();
      }
    });
    </script>

(Here is a
[gist](https://gist.github.com/surma/9899231095ada390b2b178a72ff57aa3)
containing all files.)

To build everything, run

    $ npm install
    $ npm run build
    $ npm run serve

Navigating to localhost:8080 should show you the following output in the
DevTools console:

<img src="/web/updates/images/2019/01/emscripten-npm/helloworld.png"
alt="DevTools showing a message printed via C++ and Emscripten">

## Adding C/C++ code as a dependency

If you want to build a C/C++ library for your web app, you need its code to be
part of your project. You can add the code to your project's repository manually
or you can use npm to manage these kind of dependencies as well. Let's say I
want to use [libvpx](https://github.com/webmproject/libvpx) in my webapp. libvpx
is a C++ library to encode images with VP8, the codec used in `.webm` files.
However, libvpx is not on npm and doesn't have a `package.json`, so I can't
install it using npm directly.

To get out of this conundrum, there is
[napa](https://www.npmjs.com/package/napa). napa allows you to install any git
repository URL as a dependency into your `node_modules` folder.

Note: If you dislike using napa, please take a look at the appendix for a more
Docker-centric solution that doesn't require napa.

Install napa as a dependency:

    $ npm install --save napa

and make sure to run `napa` as an install script:

    {
      // ...
      "scripts": {
        "install": "napa",
        // ...
      },
      "napa": {
        "libvpx": "git+https://github.com/webmproject/libvpx"
      }
      // ...
    }

When you run `npm install`, napa takes care of cloning the libvpx GitHub
repository into your `node_modules` under the name `libvpx`.

You can now extend your build script to build libvpx. libvpx uses `configure`
and `make` to be built. Luckily, Emscripten can help ensure that `configure` and
`make` use Emscripten's compiler. For this purpose there are the wrapper
commands `emconfigure` and `emmake`:


    # ... above is unchanged ...
    echo "============================================="
    echo "Compiling libvpx"
    echo "============================================="
    (
      rm -rf build-vpx || true
      mkdir build-vpx
      cd build-vpx
      emconfigure ../node_modules/libvpx/configure \
        --target=generic-gnu
      emmake make
    )
    echo "============================================="
    echo "Compiling libvpx done"
    echo "============================================="

    echo "============================================="
    echo "Compiling wasm bindings"
    echo "============================================="
    # ... below is unchanged ...

Note: Some projects provide a `--host` flag (or similar; libvpx uses non-standard
`--target`) to build for a specific processor architecture. This will often pull
in assembler code that takes advantage of features specific to that architecture
and can't be compiled to WebAssembly. If a flag like that is present (check with
`./configure --help`), make sure to set it to a generic target.

A C/C++ library is split into two parts: the headers (traditionally `.h` or
`.hpp` files) that define the data structures, classes, constants etc. that a
library exposes and the actual library (traditionally `.so` or `.a` files). To
use the `VPX_CODEC_ABI_VERSION` constant of the library in your code, you have
to include the library's header files using a `#include` statement:

    #include "vpxenc.h"
    #include <emscripten/bind.h>

    int say_hello() {
      printf("Hello from your wasm module with libvpx %d\n", VPX_CODEC_ABI_VERSION);
      return 0;
    }

The problem is that the compiler doesn't know _where_ to look for `vpxenc.h`.
This is what the `-I` flag is for. It tells the compiler which directories to
check for header files. Additionally, you also need to give the compiler the
actual library file:

    # ... above is unchanged ...
    echo "============================================="
    echo "Compiling wasm bindings"
    echo "============================================="
    (
      # Compile C/C++ code
      emcc \
        ${OPTIMIZE} \
        --bind \
        -s STRICT=1 \
        -s ALLOW_MEMORY_GROWTH=1 \
        -s ASSERTIONS=0 \
        -s MALLOC=emmalloc \
        -s MODULARIZE=1 \
        -s EXPORT_ES6=1 \
        -o ./my-module.js \
        -I ./node_modules/libvpx \
        src/my-module.cpp \
        build-vpx/libvpx.a

    # ... below is unchanged ...

If you run `npm run build` now, you will see that the process builds a new `.js`
and a new `.wasm` file and that the demo page will indeed output the constant:

<img src="/web/updates/images/2019/01/emscripten-npm/libvpx.png" alt="DevTools
showing a the ABI version of libvpx printed via emscripten">

You will also notice that the build process takes a long time. The reason for
long build times can vary. In the case of libvpx, it takes a long time because
it compiles an encoder and a decoder for both VP8 and VP9 every time you run
your build command, even though the source files haven't changed. Even a small
change to your `my-module.cpp` will take a long time to build. It would be very
beneficial to keep the build artifacts of libvpx around once they have been
built the first time.

One way to achieve this is using environment variables.

Note: If you dislike this solution, please take a look at the appendix for a
more Docker-centric solution.

    # ... above is unchanged ...
    eval $@

    echo "============================================="
    echo "Compiling libvpx"
    echo "============================================="
    test -n "$SKIP_LIBVPX" || (
      rm -rf build-vpx || true
      mkdir build-vpx
      cd build-vpx
      emconfigure ../node_modules/libvpx/configure \
        --target=generic-gnu
      emmake make
    )
    echo "============================================="
    echo "Compiling libvpx done"
    echo "============================================="
    # ... below is unchanged ...

(Here's a [gist](https://gist.github.com/surma/8884a1e66b006c48e1ecc57bd1f36011)
containing all the files.)

The `eval` command allows us to set environment variables by passing parameters
to the build script. The `test` command will skip building libvpx if
`$SKIP_LIBVPX` is set (to any value).

Now you can compile your module but skip rebuilding libvpx:

    $ npm run build:emscripten -- SKIP_LIBVPX=1

## Customizing the build environment

Sometimes libraries depend on additional tools to build. If these dependencies
are missing in the build environment provided by the Docker image, you need to
add them yourself. As an example, let's say you also want to build the
documentation of libvpx using [doxygen](http://www.doxygen.nl/). Doxygen is not
available inside your Docker container, but you can install it using `apt`.

If you were to do that in your `build.sh`, you would re-download and re-install
doxygen everytime you want to build your library. Not only would that be
wasteful, but it would also stop you from working on your project while offline.

Here it makes sense to build your own Docker image. Docker images are built by
writing a `Dockerfile` that describes the build steps. Dockerfiles are quite
powerful and have [a lot of
commands](https://docs.docker.com/engine/reference/builder/), but most of the
time you can get away with just using `FROM`, `RUN` and `ADD`. In this case:

    FROM trzeci/emscripten

    RUN apt-get update && \
        apt-get install -qqy doxygen

With `FROM`, you can declare which Docker image you want to use as a starting
point. I chose `trzeci/emscripten` as a basis — the image you have been using
all along. With `RUN`, you instruct Docker to run shell commands inside the
container. Whatever changes these commands make to the container is now part of
the Docker image. To make sure that your Docker image has been built and is
available before you run `build.sh`, you have to adjust your `package.json` a
bit:

    {
      // ...
      "scripts": {
        "build:dockerimage": "docker image inspect -f '.' mydockerimage || docker build -t mydockerimage .",
        "build:emscripten": "docker run --rm -v $(pwd):/src mydockerimage ./build.sh",
        "build": "npm run build:dockerimage && npm run build:emscripten && npm run build:app",
        // ...
      },
      // ...
    }

(Here's a [gist](https://gist.github.com/surma/71d42a1c0c553d7a63ad8d4cddd61972)
containing all the files.)

This will build your Docker image, but only if it has not been built yet. Then
everything runs as before, but now the build environment has the `doxygen`
command available, which will cause the documentation of libvpx to be built as
well.

## Conclusion

It is not surprising that C/C++ code and npm are not a natural fit, but you can
make it work quite comfortably with some additional tooling and the isolation
that Docker provides. This setup will not work for every project, but it's a
decent starting point that you can adjust for your needs. If you have
improvements, please share.

## Appendix: Making use of Docker image layers

An alternative solution is to encapsulate more of these problems with Docker and
Docker's smart approach to caching. Docker executes Dockerfiles step-by-step and
assigns the result of each step an image of it's own. These intermediate images
are often called "layers". If a command in a Dockerfile hasn't changed, Docker
won't actually re-run that step when you are re-building the Dockerfile. Instead
it reuses the layer from the last time the image was built.

Previously, you had to go through some effort to not rebuild libvpx every time
you build your app. Instead you can move the building instructions for libvpx
from your `build.sh` into the `Dockerfile` to make use of Docker's caching
mechanism:

    FROM trzeci/emscripten

    RUN apt-get update && \
        apt-get install -qqy doxygen git && \
        mkdir -p /opt/libvpx/build && \
        git clone https://github.com/webmproject/libvpx /opt/libvpx/src
    RUN cd /opt/libvpx/build && \
        emconfigure ../src/configure --target=generic-gnu && \
        emmake make

(Here's a [gist](https://gist.github.com/surma/c1b69df0aa168eee6ef08812123e0bbd)
containing all the files.)

Note that you need to manually install git and clone libvpx as you don't have
bind mounts when running `docker build`. As a side-effect, there is no need for
napa anymore.

{% include "web/_shared/helpful.html" %}
{% include "web/_shared/rss-widget-updates.html" %}
