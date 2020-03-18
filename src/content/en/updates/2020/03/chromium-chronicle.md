project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2020-03-18 #}
{# wf_published_on: 2020-03-18 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Do you find yourself running the same test over and over in the debugger, trying to figure out how the code got in a bad state? We have a tool for you! RR will record an execution trace, making it easy to step backwards, run backwards, see where variables changed their value or when a function was last called on an object. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Time-Travel Debugging with RR {: .page-title }

**Episode 13:** March, 2020

*by Christian Biesinger in Madison, WI*

Do you find yourself **running the same test over and over** in the debugger,
trying to figure out how the code got in a bad state? **We have a tool for you!**
Easy to install and setup, it will record an execution trace, and that gives
magical new powers to `gdb`. **Step backwards, run backwards**, see where
variables changed their value or when a function was last called on an object
(using conditional breakpoints).

On Linux, you can **use rr**. Install using `sudo apt-get install rr` or
from <https://rr-project.org/>.

This is not officially supported, but very useful. The way `rr` works is that
you **first record a trace**, then **replay it**.

<pre class="">
<code class="devsite-terminal">rr record .../content_shell --no-sandbox  --disable-hang-monitor --single-process</code>
<code># record the trace. --single-process is optional, see below. The other flags are required.</code>
<code class="devsite-terminal">rr replay # This will replay the last trace</code>
<code>(gdb)       # rr uses GDB to let you replay traces</code>
</pre>

Conveniently, timing and pointer addresses stay the same every time you replay
the same trace. **Traces can be made portable** using `rr pack` so that you
can copy them to another machine and replay there, or replay even after
recompiling. Run your program using `continue`. You can use all regular
GDB commands `-b`, `next`, `watch`, etc. However, you can also use
**reverse-next** (`rn`), **reverse-cont** (`rc`), **reverse-step** (`rs`),
**reverse-fin**.

These still respect any breakpoints you’ve set. For example:

<pre class="">
(gdb) c  # Execute to the end
(gdb) break blink::LayoutFlexibleBox::UpdateLayout
(gdb) rc # Run back to the last layout call
Thread 5 hit Breakpoint 1, blink::LayoutBlock::UpdateLayout (
    this=0x121672224010)
(gdb) # Inspect anything you want here. To find the previous Layout call on this object:
(gdb) cond 1 this == 0x121672224010
(gdb) rc
Thread 5 hit Breakpoint 1, blink::LayoutBlock::UpdateLayout (
    this=0x121672224010)
(gdb) watch -l style_.ptr_ # Or find the last time the style_ was changed
(gdb) rc
Thread 5 hit Hardware watchpoint 2: -location style_.ptr_

Old value = (const blink::ComputedStyle *) 0x1631ad3dbb0
New value = (const blink::ComputedStyle *) 0x0
0x00007f68cabcf78e in std::__Cr::swap&lt;blink::ComputedStyle const*&gt; (
</pre>

In this example, I have used `--single-process` for simplicity, but that’s
not necessary. **RR can trace multiple processes**; after recording, you can
see a list using `rr ps` and pick one to replay with `rr replay -f PID`.

There are lots of ways RR can be useful. There are **other commands you can use**,
such as when to find out at which event number you are at, or `rr replay -M`
to annotate `stdout` with a process ID and event number for each line. See
the [RR website and documentation](https://rr-project.org/) for more details.

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
