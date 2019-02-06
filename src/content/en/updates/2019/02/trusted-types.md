project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: "Trusted Types help prevent Cross-Site-Scripting"

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: news,security,trusted-types,origintrials #}
{# wf_featured_image: /web/updates/images/2019/02/lit-element.jpg #}
{# wf_featured_snippet: Trusted Types TBD TBD. #}
{# wf_blink_components: N/A #}

# Trusted Types help prevent Cross-Site Scripting {: .page-title }

**tldr; Trusted Types tldr **

{% include "web/_shared/contributors/koto.html" %}

<aside class="caution"> We’re currently working on the specification and
implementation details for this API. We’ll keep this post updated as the API
matures. </aside>

## Cross-Site Scripting {: #xss }

[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) (XSS)
is the most prevalent vulnerability that affects web applications. We see this
reflected both in
[our own data](https://security.googleblog.com/2016/09/reshaping-web-defenses-with-strict.html),
and
[throughout the industry](https://www.hackerone.com/sites/default/files/2017-06/The%20Hacker-Powered%20Security%20Report.pdf){: .external}.
Practice shows that maintaining an XSS-free application is still a difficult
challenge, especially if the application is complex. While solutions for
preventing server-side XSS are well known,
[DOM-based Cross-Site Scripting](https://www.owasp.org/index.php/DOM_Based_XSS){: .external}
(DOM XSS) becomes a *growing* problem. For example, in
[Google Vulnerability Reward Program](https://g.co/vrp) DOM XSS is already the
most common variant.

Why is that? We think it's caused by two separate issues:

### XSS is easy to introduce

DOM XSS occurs when one of injection sinks in DOM or other browser APIs is
called with user-controlled data. For example:

```js
const templateId = location.hash.match(/tplid=([^;&]*)/)[1];
// ...
document.head.innerHTML += `<link rel="stylesheet" href="./templates/${templateId}/style.css">`
```

This code introduced DOM XSS by linking the attacker-controlled *source*
(`location.hash`) with the injection *sink* (`innerHTML`). The attacker can
exploit this bug making the victim visit `https://example.com#tplid="><img src=x
onerror=alert(1)>`.

It's easy to make this mistake in code, especially if the code of the
application changes. For example, maybe `templateId` was once generated and
validated on the server, so this value was trustworthy? All we know is that the
value is a string, but should it be trusted? Where does is come from really?

Additionally, it's not just `innerHTML` that one must be careful of. In a
typical browser environment, there are over 60 sink functions or properties that
require this caution. The DOM API is **insecure by default** and requires
special treatment to prevent XSS.

### XSS is difficult to detect

The code above is just an example, so it's trivial to see the bug. In practice,
the sources and the sinks are often accessed in completely different application
parts. The date from the source is passed around, and eventually reaches the
sink. There are some functions that sanitize and verify the data. But was the
right function called?

Looking at the source code alone, it's even difficult to confirm that it
introduces a DOM XSS bug. It's not enough to grep the source code for sensitive
patterns. For one, the sensitive functions are used through various wrappers,
and the actual vulnerability will look more like
[this](https://hackerone.com/reports/158853){: .external}. But sometimes it's
just impossible:

```js
obj[prop] = templateID
```

If obj points to the `Location` object, and prop value is `"href"`, this is very
likely a DOM XSS, but one can only find that out when running the code. As any
part of your application can potentially call a DOM sink, all of the code should
undergo a manual security review to be sure - and the reviewer has to be extra
careful to spot the mistake.

## Trusted Types {: #trusted-types }

**Trusted Types** is the new browser API that might help address the above
problems at the root cause - and in practice help obliterate DOM XSS.

Trusted Types allow you to lock down the dangerous injection sinks - they stop
being insecure by default, and cannot be called with strings. You can enable
this enforcement by setting a special value in the `Content Security Policy`
HTTP response header:

```
Content-Security-Policy: trusted-types *
```

Then, in the document you can no longer use strings with the injection sink
functions:

```js
const templateId = location.hash.match(/tplid=([^;&]*)/)[1];
// typeof templateId == "string"
document.head.innerHTML += aString // Throws a TypeError.
```

To interact with those functions, you can create special typed objects - Trusted
Types. Those objects can be created only by certain functions in your
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

Here, we are creating a `template` policy that verifies the passed template ID
parameter and creates the resulting HTML. The policy object `create*` functions
return Trusted Type objects (in this case, `createHTML` returns a `TrustedHTML`
object) that the browser accepts to be used with the injection sinks.

It might seem that the only improvement is in adding the following check:

```js
if (/^[0-9a-z-]$/.test(tpl)) { /* allow the tplId */ }
```

Indeed, this line is necessary to fix XSS. However, the real change is more
profound. With Trusted Types enforcement, the *only* code that could introduce a
DOM XSS vulnerability is the code of the policies. No other code can produce a
value that would be accepted by the dangerous functions. As such, only the
policies need to be security reviewed. In our example, it doesn't really matter
where the `templateId` value comes from, as the policy makes sure it's correctly
validated first - the output of this particular policy does not introduce XSS.

## Limiting policies

Did you notice the `*` value that we used in the `Content-Security-Policy`
header? It indicated that the application can create arbitrary number of
policies (provided each of them has a unique name). If applications can freely
create a large number of policies, preventing DOM XSS in practice would be
difficult.

However, we can further down limit this by specifying a whitelist of policy
names. `Content-Security-Policy: trusted-types template` This assures that only
a single policy with a name `template` can be created. That policy is then easy
to identify in a source code, and can be effectively reviewed. Now we can be
certain that the application is free from DOM XSS. Nice job!

## There's more!

This is just a short overview of the API. We are working on providing more code
examples, guides and documentation on how to --- mention DOMPUrify, that the
policies will be small etc. ---

## Get started {: #get-started }

To get this new behavior on your site, you need to be
[signed up](https://developers.chrome.com/origintrials){: .external} for the
"Trusted Types" Origin Trial. If you just want to try it out locally, the
experiment can be enabled on the command line:

```
    chrome --enable-blink-features=TrustedDOMTypes
```
or

```
    chrome --enable-experimental-web-platform-features
```
Passing this flag on the command line enables the feature globally in Chrome for
the current session.

We have also created a [polyfill](https://github.com/WICG/trusted-types) that
enables you to test the behavior in other browsers.

As always, let us know what you think. You can reach us on the
[trusted-types](https://groups.google.com/forum/#!forum/trusted-types) Google
group or file issues on [GitHub](https://github.com/WICG/trusted-types).

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
