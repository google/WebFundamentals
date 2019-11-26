project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-11-26 #}
{# wf_published_on: 2019-11-26 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: GWP-ASan is a heap-only memory error detector designed to be used in the wild. It detects use-after-frees, buffer overflows/underflows, and double frees. Unlike ASan, it does not detect errors on the stack or in globals. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: GWP-ASan: Detect bugs in the wild {: .page-title }

**Episode 8:** November, 2019

*by Vlad Tsyrklevich in Seattle*

Debugging memory safety errors, such as use-after-frees or buffer overflows,
can be difficult. Tools like AddressSanitizer (ASan) are helpful to pinpoint
memory errors in unit tests and fuzzers, but many bugs only manifest after
deployment to users where ASan’s overhead is prohibitively high.

**[GWP-ASan][gwp-asan] is a heap-only memory error detector designed to be
used in the wild.** It detects use-after-frees, buffer overflows/underflows,
and double frees. Unlike ASan, it does not detect errors on the stack or in
globals.

By sampling a tiny percentage of allocations, GWP-ASan is able to provide
probabilistic error detection with negligible memory and performance overhead.
**GWP-ASan will cause the process to crash immediately when a memory error
occurs** with a sampled allocation. This makes it easier to spot the bug as
the crash happens right where the error is made instead of at some later point
when corrupt memory is used.

Like ASan, **GWP-ASan crash reports include allocation and deallocation stack
traces** to help debug memory issues. Let's take a look at an example
([crbug/956230](https://crbug.com/956230)) of some of the additional data
presented in the crash UI:

<img src="/web/updates/images/2019/11/cr-chron/img1.png">

<img src="/web/updates/images/2019/11/cr-chron/img2.png">

The use and deallocation both originate in `PDFiumEngine::ExtendSelection()`.
The source quickly shows the bug is a use of an invalidated `std::vector`
iterator.

**GWP-ASan is enabled on the stable channel for allocations made using
`malloc`/`new` and `PartitionAlloc`** on Windows and macOS. Android support is
in progress. Over 60 GWP-ASan bugs have been reported so far and about 70%
have been fixed. GWP-ASan crashes are all candidate security issues that
may be exploitable so please triage them quickly and request backports
where necessary.

[gwp-asan]: https://chromium.googlesource.com/chromium/src/+/lkgr/docs/gwp_asan.md

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
