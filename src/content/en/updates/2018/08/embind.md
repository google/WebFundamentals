project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Emscripten’s embind

{# wf_updated_on: 2019-09-23 #}
{# wf_published_on: 2018-08-20 #}
{# wf_tags: webassembly #}
{# wf_featured_image: /web/updates/images/2018/08/embind/code.png #}
{# wf_featured_snippet: Generate JavaScript bindings for your C/C++ code. #}
{# wf_blink_components: Blink #}

# Emscripten’s embind {: .page-title }
## It _binds_ JS to your wasm!

{% include "web/_shared/contributors/surma.html" %}

In my last [wasm article](/web/updates/2018/03/emscripting-a-c-library), I talked
about how to compile a C library to wasm so you can use it on the web. One thing
that stood out to me (and to many readers) is the crude and slightly awkward way
you have to manually declare which functions of your wasm module you are using.
To refresh your mind, this is the code snippet I am talking about:

    const api = {
      version: Module.cwrap('version', 'number', []),
      create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
      destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
    };

Here we declare the names of the functions that we marked with
`EMSCRIPTEN_KEEPALIVE`, what their return types are, and what the types of their
arguments are. Afterwards, we can use the methods on the `api` object to invoke
these functions. However, using wasm this way doesn't support strings and
requires you to manually move chunks of memory around which makes many library
APIs very tedious to use. Isn't there a better way? Why yes there is, otherwise
what would this article be about?

## C++ name mangling

While the developer experience would be reason enough to build a tool that helps
with these bindings, there's actually a more pressing reason: When you compile C
or C++ code, each file is compiled separately. Then, a linker takes care of
munging all these so-called object files together and turning them into a wasm
file. With C, the names of the functions are still available in the object file
for the linker to use. All you need to be able to call a C function is the name,
which we are providing as a string to `cwrap()`.

C++ on the other hand supports function overloading, meaning you can implement
the same function multiple times as long as the signature is different (e.g.
differently typed parameters). At the compiler level, a nice name like `add`
would get _mangled_ into something that encodes the signature in the function
name for the linker. As a result, we wouldn't be able to look up our function
with its name anymore.

Note: You can prevent the compiler from mangling your functions' names by
 annotating it with `extern "C"`.

## Enter embind

[embind](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html)
is part of the Emscripten toolchain and provides you with a bunch of C++ macros
that allow you to annotate C++ code. You can declare which functions, enums,
classes or value types you are planning to use from JavaScript. Let's start
simple with some plain functions:

    #include <emscripten/bind.h>

    using namespace emscripten;

    double add(double a, double b) {
      return a + b;
    }

    std::string exclaim(std::string message) {
      return message + "!";
    }

    EMSCRIPTEN_BINDINGS(my_module) {
      function("add", &add);
      function("exclaim", &exclaim);
    }

Compared to my previous article, we are not including `emscripten.h` anymore, as
we don't have to annotate our functions with `EMSCRIPTEN_KEEPALIVE` anymore.
Instead, we have an `EMSCRIPTEN_BINDINGS` section in which we list the names under
which we want to expose our functions to JavaScript.

Note: The parameter for the `EMSCRIPTEN_BINDINGS` macro is mostly used to avoid
name conflicts in bigger projects.

To compile this file, we can use the same setup (or, if you want, the same
Docker image) as in the [previous
article](/web/updates/2018/03/emscripting-a-c-library). To use embind,
we add the `--bind` flag:

    $ emcc --bind -O3 add.cpp

Now all that's left is whipping up an HTML file that loads our freshly
created wasm module:

    <script src="/a.out.js"></script>
    <script>
    Module.onRuntimeInitialized = _ => {
      console.log(Module.add(1, 2.3));
      console.log(Module.exclaim("hello world"));
    };
    </script>

Note: If you are curious, [I wrote up the
same](https://gist.github.com/surma/d04cd0fd896610575126d30de36d7eb6) C++ module
_without_ embind to give you a feel for how much work it is doing for you.

As you can see, we aren't using `cwrap()` anymore. This just works straight out
of the box. But more importantly, we don't have to worry about manually copying
chunks of memory to make strings work! embind gives you that for free, along
with type checks:

![DevTools errors when you invoke a function with the wrong number of arguments
or the arguments have the wrong
type](/web/updates/images/2018/08/embind/error.png)

This is pretty great as we can catch some errors early instead of dealing with
the occasionally quite unwieldy wasm errors.

### Objects

Many JavaScript constructors and functions use options objects. It's a nice
pattern in JavaScript, but extremely tedious to realize in wasm manually. embind
can help here, too!

For example, I came up with this _incredibly_ useful C++ function that processes my
strings, and I urgently want to use it on the web. Here is how I did that:

    #include <emscripten/bind.h>
    #include <algorithm>

    using namespace emscripten;

    struct ProcessMessageOpts {
      bool reverse;
      bool exclaim;
      int repeat;
    };

    std::string processMessage(std::string message, ProcessMessageOpts opts) {
      std::string copy = std::string(message);
      if(opts.reverse) {
        std::reverse(copy.begin(), copy.end());
      }
      if(opts.exclaim) {
        copy += "!";
      }
      std::string acc = std::string("");
      for(int i = 0; i < opts.repeat; i++) {
        acc += copy;
      }
      return acc;
    }

    EMSCRIPTEN_BINDINGS(my_module) {
      value_object<ProcessMessageOpts>("ProcessMessageOpts")
        .field("reverse", &ProcessMessageOpts::reverse)
        .field("exclaim", &ProcessMessageOpts::exclaim)
        .field("repeat", &ProcessMessageOpts::repeat);

      function("processMessage", &processMessage);
    }

I am defining a struct for the options of my `processMessage()` function. In the
`EMSCRIPTEN_BINDINGS` block, I can use `value_object` to make JavaScript see
this C++ value as an object. I could also use `value_array` if I preferred to
use this C++ value as an array. I also bind the `processMessage()` function, and
the rest is embind _magic_. I can now call the `processMessage()` function from
JavaScript without any boilerplate code:

    console.log(Module.processMessage(
      "hello world",
      {
        reverse: false,
        exclaim: true,
        repeat: 3
      }
    )); // Prints "hello world!hello world!hello world!"

### Classes

For completeness sake, I should also show you how embind allows you to expose
entire classes, which brings a lot of synergy with ES6 classes. You can probably
start to see a pattern by now:

    #include <emscripten/bind.h>
    #include <algorithm>

    using namespace emscripten;

    class Counter {
    public:
      int counter;

      Counter(int init) :
        counter(init) {
      }

      void increase() {
        counter++;
      }

      int squareCounter() {
        return counter * counter;
      }
    };

    EMSCRIPTEN_BINDINGS(my_module) {
      class_<Counter>("Counter")
        .constructor<int>()
        .function("increase", &Counter::increase)
        .function("squareCounter", &Counter::squareCounter)
        .property("counter", &Counter::counter);
    }

On the JavaScript side, this almost feels like a native class:

    <script src="/a.out.js"></script>
    <script>
    Module.onRuntimeInitialized = _ => {
      const c = new Module.Counter(22);
      console.log(c.counter); // prints 22
      c.increase();
      console.log(c.counter); // prints 23
      console.log(c.squareCounter()); // prints 529
    };
    </script>

## What about C?

embind was written for C++ and can only be used in C++ files, but that doesn't
mean that you can't link against C files! To mix C and C++, you only need to
separate your input files into two groups: One for C and one for C++ files and
augment the CLI flags for `emcc` as follows:

    $ emcc --bind -O3 --std=c++11 a_c_file.c another_c_file.c -x c++ your_cpp_file.cpp

## Conclusion

embind gives you great improvements in the developer experience when working
with wasm and C/C++. This article does not cover all the options embind offers.
If you are interested, I recommend continuing with [embind's
documentation](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html).
Keep in mind that using embind can make both your wasm module and your
JavaScript glue code bigger by up to 11k when gzip'd — most notably on small
modules. If you only have a very small wasm surface, embind might cost more than
it's worth in a production environment! Nonetheless, you should definitely give
it a try.

{% include "web/_shared/rss-widget-updates.html" %}

