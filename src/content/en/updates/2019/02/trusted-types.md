project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Trusted Types is a new experimental API available in Chrome that helps prevent DOM-Based Cross-Site Scripting in your applications.

{# wf_updated_on: 2019-09-12 #}
{# wf_published_on: 2019-02-15 #}
{# wf_tags: news,security,trusted-types,origintrials,chrome73 #}
{# wf_featured_image: /web/updates/images/generic/security.png #}
{# wf_featured_snippet: Trusted Types is a new experimental API available in Chrome that helps prevent DOM-Based Cross-Site Scripting in your applications. #}
{# wf_blink_components: N/A #}

# Trusted Types help prevent Cross-Site Scripting {: .page-title }

#### TL;DR {: #tldr .hide-from-toc }
We've created a new experimental API that aims to prevent DOM-Based Cross
Site Scripting in modern web applications.

{% include "web/_shared/contributors/koto.html" %}

<aside class="caution"> We’re currently working on the specification and
implementation details for this API. We’ll keep this post updated as Trusted
Types mature. Last update: 2019-02-15.</aside>

## Cross-Site Scripting {: #xss }

[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) (XSS)
is the most prevalent vulnerability affecting web applications. We see this
reflected both in
[our own data](https://security.googleblog.com/2016/09/reshaping-web-defenses-with-strict.html),
and
[throughout the industry](https://www.hackerone.com/sites/default/files/2017-06/The%20Hacker-Powered%20Security%20Report.pdf){: .external}.
Practice shows that maintaining an XSS-free application is still a difficult
challenge, especially if the application is complex. While solutions for
preventing server-side XSS are well known,
[DOM-based Cross-Site Scripting](https://www.owasp.org/index.php/DOM_Based_XSS){: .external}
(DOM XSS) is a *growing* problem. For example, in
[Google's Vulnerability Reward Program](https://g.co/vrp) DOM XSS is already the
most common variant.

Why is that? We think it's caused by two separate issues:

### XSS is easy to introduce

DOM XSS occurs when one of injection sinks in DOM or other browser APIs is
called with user-controlled data. For example, consider this snippet that
intends to load a stylesheet for a given UI template the application uses:

```js
const templateId = location.hash.match(/tplid=([^;&]*)/)[1];
// ...
document.head.innerHTML += `<link rel="stylesheet" href="./templates/${templateId}/style.css">`
```

This code introduces DOM XSS by linking the attacker-controlled **source**
(`location.hash`) with the injection **sink** (`innerHTML`). The attacker can
exploit this bug by tricking their victim into visiting the following URL:

```
https://example.com#tplid="><img src=x onerror=alert(1)>
```

It's easy to make this mistake in code, especially if the code changes often.
For example, maybe `templateId` was once generated and validated on the server,
so this value used to be trustworthy? When assigning to `innerHTML`, all we know
is that the value is a string, but should it be trusted? Where does it really
come from?

Additionally, the problem is not limited to just `innerHTML`. In a typical
browser environment, there are over 60 sink functions or properties that require
this caution. The DOM API is **insecure by default** and requires special
treatment to prevent XSS.

### XSS is difficult to detect

The code above is just an example, so it's trivial to see the bug. In practice,
the sources and the sinks are often accessed in completely different application
parts. The data from the source is passed around, and eventually reaches the
sink. There are some functions that sanitize and verify the data. But was the
right function called?

Looking at the source code alone, it's difficult to know if it introduces a DOM
XSS. It's not enough to grep the `.js` files for sensitive patterns. For one,
the sensitive functions are often used through various wrappers and real-world
vulnerabilities look more like
[this](https://hackerone.com/reports/158853){: .external}.

Sometimes it's not even possible to tell if a codebase is vulnerable by only
looking at it.

```js
obj[prop] = templateID
```

If `obj` points to the `Location` object, and `prop` value is `"href"`, this is
very likely a DOM XSS, but one can only find that out when executing the code.
As any part of your application can potentially hit a DOM sink, all of the code
should undergo a manual security review to be sure - and the reviewer has to be
extra careful to spot the bug. That's unlikely to happen.

## Trusted Types {: #trusted-types }

**[Trusted Types](https://github.com/WICG/trusted-types)** is the new browser
API that might help address the above problems at the root cause - and in
practice help obliterate DOM XSS.

Trusted Types allow you to lock down the dangerous injection sinks - they stop
being insecure by default, and cannot be called with strings. You can enable
this enforcement by setting a special value in the
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy){: .external}
HTTP response header:

```
Content-Security-Policy: trusted-types *
```

Then, in the document you can no longer use strings with the injection sinks:

```js
const templateId = location.hash.match(/tplid=([^;&]*)/)[1];
// typeof templateId == "string"
document.head.innerHTML += templateId // Throws a TypeError.
```

To interact with those functions, you create special typed objects - *Trusted
Types*. Those objects can be created only by certain functions in your
application called *Trusted Type Policies*. The exemplary code "fixed" with
Trusted Types would look like this:

```js
const templatePolicy = TrustedTypes.createPolicy('template', {
  createHTML: (templateId) => {
    const tpl = templateId;
    if (/^[0-9a-z-]$/.test(tpl)) {
      return `<link rel="stylesheet" href="./templates/${tpl}/style.css">`;
    }
    throw new TypeError();
  }
});

const html = templatePolicy.createHTML(location.hash.match(/tplid=([^;&]*)/)[1]);
// html instanceof TrustedHTML
document.head.innerHTML += html;
```

Here, we create a `template` policy that verifies the passed template ID
parameter and creates the resulting HTML. The policy object `create*` function
calls into a respective user-defined function, and wraps the result in a Trusted
Type object. In this case, `templatePolicy.createHTML` calls the provided `templateId`
validation function, and returns a `TrustedHTML` with the `<link ...>` snippet.
The browser allows `TrustedHTML` to be used with an injection sink that expects
HTML - like `innerHTML`.

It might seem that the only improvement is in adding the following check:

```js
if (/^[0-9a-z-]$/.test(tpl)) { /* allow the tplId */ }
```

Indeed, this line is necessary to fix XSS. However, the real change is more
profound. With Trusted Types enforcement, the *only* code that could introduce a
DOM XSS vulnerability is the code of the policies. No other code can produce a
value that the sink functions accept. As such, only the policies need to be
reviewed for security issues. In our example, it doesn't really matter where the
`templateId` value comes from, as the policy makes sure it's correctly validated
first - the output of this particular policy does not introduce XSS.

## Limiting policies

Did you notice the `*` value that we used in the `Content-Security-Policy`
header? It indicates that the application can create an arbitrary number of
policies, provided each of them has a unique name. If applications can freely
create a large number of policies, preventing DOM XSS in practice would be
difficult.

However, we can further limit this by specifying a whitelist of policy names
like so:

```
Content-Security-Policy: trusted-types template
```

This assures that only a single policy with a name `template` can be created.
That policy is then easy to identify in source code and can be effectively
reviewed. With this, we can be certain that the application is free from DOM
XSS. Nice job!

In practice, modern web applications need only a small number of policies. The
rule of thumb is to create a policy where the client-side code produces HTML or
URLs - in script loaders, HTML templating libraries or HTML sanitizers. All the
numerous dependencies that do not interact with the DOM, do not need the
policies. Trusted Types assures that they can't be the cause of the XSS.

## Get started {: #get-started }

This is just a short overview of the API. We are working on providing more code
examples, guides and documentation on how to migrate applications to Trusted
Types. We feel this is the right moment for the web developer community to start
experimenting with it.

To get this new behavior on your site, you need to be
[signed up](https://developers.chrome.com/origintrials){: .external} for the
"Trusted Types" Origin Trial (in Chrome 73 through 78). If you just want to try
it out locally, starting from Chrome 73, the experiment can be enabled on the
command line:

```
chrome --enable-blink-features=TrustedDOMTypes
```

or

```
chrome --enable-experimental-web-platform-features
```

Alternatively, visit `chrome://flags/#enable-experimental-web-platform-features`
and enable the feature. All of those options enable the feature globally in
Chrome for the current session.

<aside class="caution">If you experience crashes, use <code>--enable-features=BlinkHeapUnifiedGarbageCollection</code> as a workaround. See
<a href="http://crbug.com/929601">bug&nbsp;929601</a> for details.</aside>

We have also created a [polyfill](https://github.com/WICG/trusted-types) that
enables you to test Trusted Types in other browsers.

As always, let us know what you think. You can reach us on the
[trusted-types](https://groups.google.com/forum/#!forum/trusted-types) Google
group or file issues on [GitHub](https://github.com/WICG/trusted-types).

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
