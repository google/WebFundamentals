project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-12-13 #}
{# wf_published_on: 2019-12-13 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: You may find you are asked to fix high-priority security bugs discovered by ClusterFuzz. What is it? Should you take those bugs seriously? How can you help? #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: ClusterFuzz {: .page-title }

**Episode 9:** December, 2019

*by Adrian Taylor in Mountain View*

You may find you are asked to fix high-priority security bugs discovered by
ClusterFuzz. What is it? Should you take those bugs seriously? How can you
help?

![Fuzzing flow chart](/web/updates/images/2019/12/cr-chron-1.png)

**ClusterFuzz feeds input to Chrome and watches for crashes.** Some of those
Chrome builds have extra checks turned on, for example [AddressSanitizer][go-asan],
which looks for memory safety errors.

ClusterFuzz assigns components based on the crash location, and **assigns
severity based on the type of crash and whether it happened in a sandboxed
process**. For example, a heap use-after-free will be high severity, unless
it’s in the browser process, in which case it’s critical (no sandbox to limit
impact!):

```cpp
class Foo {
  Widget* widget;
};

void Foo::Bar() {
  delete widget;
  ...
  widget->Activate();  // Bad in the renderer process, worse in the browser process.
}                      // Obviously, real bugs are more subtle. Usually.
```

ClusterFuzz generates input from fuzzers or from bugs submitted externally.
Some fuzzers are powered by [libFuzzer][go-libfuzzer], which evolves input to
increase code coverage. Some understand the grammar of the input language
converted into `protobufs`. Once ClusterFuzz finds a crash, it will try to
**minimize the input test case and even bisect to find the offending commit**.
It finds a lot...

<img src="/web/updates/images/2019/12/cr-chron-2.png" class="attempt-left">

You can help:

* Be paranoid about object lifetimes & integer overflows.
* Add new fuzzers, especially when you process untrustworthy data or IPC (see
  links below, often < 20 lines of code).
* Fix ClusterFuzz-reported bugs: its **severity heuristics can be trusted because
  they’re based on real-world exploitability**: Even a
  [single byte overflow][go-onebyte] has led to arbitrary code execution by an
  attacker.

<div class="clearfix"></div>

## Resources

* [Fuzz testing in Chromium][go-fuzz-in-cr]: How to add new fuzzers to
  ClusterFuzz for new data formats, or just because you want the credit of
  finding awesome vulns.
* [Chrome Fuzzer Program Update and How-To][go-cr-fuzz-pgm]: Fuzzers are also
  written by external contributors. Hear about their experience and how easy
  it can be to get started.

[go-asan]: https://github.com/google/sanitizers/wiki/AddressSanitizer
[go-libfuzzer]: https://llvm.org/docs/LibFuzzer.html
[go-onebyte]: https://googleprojectzero.blogspot.com/2016/12/chrome-os-exploit-one-byte-overflow-and.html
[go-fuzz-in-cr]: https://chromium.googlesource.com/chromium/src/+/master/testing/libfuzzer/README.md
[go-cr-fuzz-pgm]: https://security.googleblog.com/2019/07/chrome-fuzzer-program-update-and-how-to.html

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
