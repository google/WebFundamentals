project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chromium Chronicle, ежемесячная серия, предназначенная специально для разработчиков Chromium - разработчиков, которые создают браузер.

{# wf_updated_on: 2019-08-28 #}
{# wf_published_on: 2019-08-27 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: All code has bugs. The Chrome Browser process has no
sandbox, meaning those bugs could give malcious code full access to the whole
device. This episode explains the dos and don'ts of coding without a sandbox. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Coding Outside the Sandbox {: .page-title }

**Эпизод 5:** Август 2019

*Аде в Маунтин-Вью*

Хром раскололся на процессы. Некоторые из них находятся в «песочнице», что
означает, что они имеют ограниченный доступ к системе и учетным записям
пользователей. В изолированном процессе ошибки, позволяющие запускать
вредоносный код, гораздо менее серьезны.

**The browser process has no sandbox**, so a bug could give malicious code full
access to the whole device. What should you do differently? And what's the
situation with other processes?

![sandbox diagram](/web/updates/images/2019/08/ch-chron5/sandbox-diagram.png)

**All code has bugs.** In the browser process, those bugs allow malicious code
to install a program, steal user data, adjust computer settings, access content
of all browser tabs, login data, etc.

**In other processes, OS access is limited** via platform-specific restrictions.
For more information, see Chrome's [sandbox implementation
guide](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md).

Обязательно избегайте следующих распространенных ошибок: {: .compare-worse }

![rule of two](/web/updates/images/2019/08/ch-chron5/rule-of-two.jpg) {:
.attempt-left }

- **Не анализируйте и не интерпретируйте ненадежные данные с помощью C ++ в
процессе браузера.**
- Don’t trust the origin a renderer claims to represent. The
browser’sRenderProcessHost can be used to get the current origin securely.

<div class="clearfix"></div>

Вместо этого используйте следующие рекомендации: {: .compare-better }

- Be extra paranoid if your code is in the browser process.
- Validate all IPC from other processes. Assume all other processes are
alreadycompromised and out to trick you.
- Do your processing in a renderer or utility process or some other
sandboxedprocess. Ideally, also use a memory safe language such as
JavaScript(solves >50% security bugs).

For years, we ran network stacks (e.g. HTTP, DNS, QUIC) in the browser process,
which led to some [critical
vulnerabilities](https://bugs.chromium.org/p/chromium/issues/list?q=type%3Dbug-security%20component%3AInternals%3ENetwork%20status%3Afixed%2Cverified%20security_severity%3Dcritical&can=1).
On
some platforms, networking now has its own process, with a sandbox coming.

## Дополнительные ресурсы

- [Chromium's Rule of
Two](https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md):
no more than two of unsafe data,unsafe code, and unsafe process.
- [Validating IPC
Data](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/mojo.md#Validate-privilege_presuming-data-received-over-IPC):
a guide on how to ensure that IPCsfrom the renderer process are not full of fibs
and misrepresentations.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
