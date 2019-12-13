project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-10-24 #}
{# wf_published_on: 2019-10-22 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Compiling a single Chromium source file by hand can help developers experiment with compiler optimization options, understand subtle macro details, or minimize a compiler bug. This month, we take a look at how to preprocess source. #}
{# wf_blink_components: N/A #}

<style>
  body:not(.devsite-dark-code) pre.prettyprint.cc-good {
    background-color: #f7fff7;
  }
</style>

# The Chromium Chronicle: Preprocessing Source {: .page-title }

**Episode 7:** October 2019

*by Bruce Dawson in Seattle*

Sometimes it is helpful **to compile a single Chromium source file by hand**,
perhaps to experiment with compiler optimization options, to preprocess it
to a single file to understand some subtle macro details, or to minimize a
compiler bug.

A few tricks will let a Chromium developer find and execute the command that
compiles a particular source file, with modifications as needed.

Start by going to your output directory and using autoninja (or ninja) to
**compile the file of interest** (and any dependencies) **using the `^` suffix**.
This suffix tells ninja to build the output of the specified `file—version.o`
in this case. Then, touch the file, and **compile it (and only it) again with
the `-v` (verbose) flag** to ninja:

On Linux or OSX:
{: .compare-better }

<pre class="">
<span class="no-select">$</span> autoninja ../../base/version.cc^
<span class="no-select">$</span> touch ../../base/version.cc
<span class="no-select">$</span> autoninja -v ../../base/version.cc^
</pre>

In the Windows cmd shell `^` is a special character and must be escaped:
{: .compare-better }

<pre class="">
<span class="no-select">C:\></span> autoninja ../../base/version.cc^^
<span class="no-select">C:\></span> touch ../../base/version.cc
<span class="no-select">C:\></span> autoninja -v ../../base/version.cc^^
</pre>

Typical output of the `autoninja -v` command looks like this (significantly
trimmed):

<pre class="">
..\..\third_party\llvm-build\Release+Asserts\bin\clang-cl.exe /nologo /showIncludes -imsvc ...
</pre>

This command allows you to compile the file of interest. To get the preprocessed
output, use the following steps:

**On Linux or OSX, remove the `-o obj/base/base/version.o` block from the end,
and add `-E`**. This tells the compiler to print the preprocessed file to
stdout.

Redirect the output to a file, like this:
{: .compare-better }

<pre class="devsite-terminal">
../../third_party/llvm-build/Release+Asserts/bin/clang++ -MMD ... -E >version.i
</pre>

**On Windows, remove the `/showIncludes` option** from the beginning (it prints
a line of output for each `#include`) **and then add `/P`** in order to
preprocess the file instead of compiling it. The results will be saved in the
current directory in `version.i`:

<pre class="">
..\..\third_party\llvm-build\Release+Asserts\bin\clang-cl.exe /nologo -imsvc ... /P
</pre>

Now you can examine the preprocessed file to see what the macros are actually doing,
or make experimental compiler-switch changes and recompile to see what happens.

## Additional Resources

* [Fast Chrome Builds][fast-chrome-builds]: For more build-optimization tips
  (focused on Windows).
* [ETW][etw]: Find out how to find Windows performance problems—in Chrome
  or in the build—by reading the ETW (also known as Xperf) docs.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[fast-chrome-builds]: https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#Faster-builds
[etw]: https://randomascii.wordpress.com/category/xperf/
