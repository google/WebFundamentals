project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-09-17 #}
{# wf_published_on: 2019-08-27 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: All code has bugs. The Chrome Browser process has no sandbox, meaning those bugs could give malcious code full access to the whole device. This episode explains the dos and don'ts of coding without a sandbox. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Coding Outside the Sandbox {: .page-title }

**Episode 5:** August 2019

*by Ade in Mountain View*

Chrome is split into processes. Some of them are sandboxed, which means that
they have reduced access to the system and to users' accounts. In a sandboxed
process, bugs that allow malicious code to run are much less severe.

**The browser process has no sandbox**, so a bug could give malicious code full
access to the whole device. What should you do differently? And what's the
situation with other processes?

![sandbox diagram](/web/updates/images/2019/08/ch-chron5/sandbox-diagram.png)

**All code has bugs.** In the browser process, those bugs allow malicious code
to install a program, steal user data, adjust computer settings, access content
of all browser tabs, login data, etc.

**In other processes, OS access is limited** via platform-specific restrictions.
For more information, see Chrome's [sandbox implementation guide][sandbox-implementation].

Make sure to avoid the following common mistakes:
{: .compare-worse }

![rule of two](/web/updates/images/2019/08/ch-chron5/rule-of-two.jpg){: .attempt-left }

* **Don’t parse or interpret untrustworthy data using C++ in the
  browser process.**
* Don’t trust the origin a renderer claims to represent. The browser’s
  [RenderFrameHost][render-frame-host] can be used to get the current origin securely.

<div class="clearfix"></div>

Instead, use the following best practices:
{: .compare-better }

* Be extra paranoid if your code is in the browser process.
* Validate all IPC from other processes. Assume all other processes are already
  compromised and out to trick you.
* Do your processing in a renderer or utility process or some other sandboxed
  process. Ideally, also use a memory safe language such as JavaScript
  (solves >50% security bugs).

For years, we ran network stacks (e.g. HTTP, DNS, QUIC) in the browser process,
which led to some [critical vulnerabilities][critical-vulnerabilities]. On
some platforms, networking now has its own process, with a sandbox coming.

## Additional Resources

* [Chromium's Rule of Two][rule-of-two]: no more than two of unsafe data,
unsafe code, and unsafe process.
* [Validating IPC Data][validating-ipc]: a guide on how to ensure that IPCs
from the renderer process are not full of fibs and misrepresentations.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[sandbox-implementation]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[render-frame-host]: https://cs.chromium.org/search/?q=RenderFrameHost&sq=package:chromium&type=cs
[critical-vulnerabilities]: https://bugs.chromium.org/p/chromium/issues/list?q=type%3Dbug-security%20component%3AInternals%3ENetwork%20status%3Afixed%2Cverified%20security_severity%3Dcritical&can=1
[rule-of-two]: https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md
[validating-ipc]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/mojo.md#Validate-privilege_presuming-data-received-over-IPC
