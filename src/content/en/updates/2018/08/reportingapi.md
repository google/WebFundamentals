project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Reporting API brings a common infrastructure for the browser to send reports for various issues: CSP violations, deprecations, browser interventions, network errors, and feature policy violations.

{# wf_updated_on: 2018-08-09 #}
{# wf_published_on: 2018-08-09  #}
{# wf_tags: CSP,interventions,deprecations,feature-policy,reporting,reporting-observer,analytics,reports #}
{# wf_featured_image: /web/updates/images/generic/send.png #}
{# wf_featured_snippet: Reporting API brings a common infrastructure for the browser to send reports for various issues: CSP violations, deprecations, browser interventions, network errors, and feature policy violations. #}
{# wf_blink_components: Blink>ReportingObserver #}

# The Reporting API {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-style: italic;
}
</style>

#### TL;DR {: #tldr .hide-from-toc }

The [Reporting API][spec] defines a new HTTP header, `Report-To`, that gives
web developers a way to **specify server endpoints** for the browser
to send warnings and errors to. Browser-generated warnings like
CSP violations, Feature Policy violations, deprecations, browser interventions,
and network errors are some of the things that can be collected using the
Reporting API.

<figure>
  <img src="/web/updates/images/2018/07/reporting/consolewarnings.png"
       class="screenshot" alt="DevTools console warnings for deprecations and interventions."
       title="DevTools console warnings for deprecations and interventions.">
  <figcaption>Browser-generated warnings in the DevTools console.</figcaption>
</figure>

Warnings that get logged in the DevTools console are local to the user's browser.
That's not very helpful to you as the author of the site because you can't see
the issues users are hitting. The Reporting API fixes this. It's a tool
to propagate browser warnings to a backend. Use it to catch errors before they
happen and fix future bugs (e.g. deprecations) across your site.

## Introduction {: #intro }

Some errors only occur in production (aka The Wild). You never see them
locally or during development because **real users, real networks, and
real devices change the game**. Not to mention all the cross
browser issues that get thrown into the mix.

As an example, say your new site relies on `document.write()` to load
critical scripts. New users from different parts of the world will eventually
find your site, but they're probably on much slower connections
than you tested with. Unbeknownst to you, your site starts breaking
for them because of Chrome's [browser intervention](https://www.chromestatus.com/features#intervention)
for [Blocking document.write() on 2G networks](https://www.chromestatus.com/features/5718547946799104).
Yikes! Without the Reporting API there's no way to know
this is happening to your precious users.

The Reporting API helps catch potential (even future) errors across
your site. Setting it up gives you a "peace of mind" that nothing terrible is
happening when real users visit your site. If/when they _do_ experience
unforeseen errors, you'll be in the know. 👍

## The Report-To Header {: #header }

Note: Right now, the Reporting API needs to be enabled using a
runtime command line flag: `--enable-features=Reporting`.


The Reporting API centers around a new HTTP response header, `Report-To`.
It's value is an array of objects, each describing an endpoint group.
Sending the response header with your main page instructs the browser to
report different types of errors to the endpoints. It does this for
`max_age` seconds.

Here's an example that defines multiple endpoint groups:

```
Report-To: {
             "group": "csp-endpoint",
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://example.com/csp-reports"
             }]
           },
           {
             "group": "network-endpoint",
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://example.com/network-errors"
             }]
           },
           {
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://example.com/browser-errors",
               "url": "https://analytics.provider.com/errors"
             }]
           }
```

Note: The header value is basically a JSON array without the surrounding "[ ]".

Once you've sent the `Report-To` header, the browser caches the endpoints
according to your `max_age` values, and sends all of those nasty console
warnings to your URLs. Boom!

<figure>
  <img src="/web/updates/images/2018/07/reporting/consolewarnings.png"
       class="screenshot" alt="DevTools console warnings for deprecations and interventions."
       title="DevTools console warnings for deprecations and interventions.">
  <figcaption>DevTools warnings that can be sent using the Reporting API.</figcaption>
</figure>

### Explanation of header fields {: #fields }

Each endpoint configuration contains a `group` name, `max_age`, and `endpoints`
array. You can also choose whether to consider subdomains when reporting
errors by using the `include_subdomains` field.

| Field | Type | Required? | Description |
|---|---|---|---|---|
| `group` | string | N | If a `group` name is not specified, the endpoint is given a name of "default". |
| `max_age` | number | Y | A non-negative integer that defines the lifetime of the endpoint in seconds. A value of "0" will cause the endpoint group to be removed from the user agent’s reporting cache.|
| `endpoints` | Array&lt;Object> | Y | An array of JSON objects that specify the actual URL of your reporting server(s). This object can also take an optional `priority` and `weight`. See [the spec](https://w3c.github.io/reporting/#header) for more details. |
| `include_subdomains` | boolean | N | A boolean that enables the endpoint group for all subdomains of the current origin's host. If omitted or anything than "true", the subdomains are not reported to the endpoint. |

The `group` name is a unique name used to associate a string with a
an endpoint. You use this name in other places that integrate
with the Reporting API to refer to a specific endpoint.

The `max-age` field is also required and specifies how
long the browser should use the endpoint and report errors to it.

The `endpoints` field is an array so it's possible to **send reports to
several different backends at once**. This is useful if you want to send
reports to an analytics provider in addition to your own server.


## How the browser sends a report {: #sending }

**Reports are delivered out-of-band from your app**, meaning the browser
controls when reports are sent to your servers. The browser attempts to
deliver queued errors as soon as they're ready (in order to maximum feedback
to the developer) but it can also delay delivery if it's busy processing
higher priority work or the user is on a slow and/or congested network at
the time. The browser may also prioritize sending reports to a particular
origin first if the user visits that origin often.

The browser periodically batches reports and sends them to the endpoint(s)
you configure. To send reports, the browser issues a `POST` request with
`Content-Type: application/reports+json` and a body containing the array of
warnings/errors which were captured.

Example - browser issues a `POST` request to your CSP errors endpoint:

```
POST /csp-reports HTTP/1.1
Host: example.com
Content-Type: application/reports+json

[{
  "type": "csp",
  "age": 10,
  "url": "https://example.com/vulnerable-page/",
  "user_agent": "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
  "body": {
    "blocked": "https://evil.com/evil.js",
    "directive": "script-src",
    "policy": "script-src 'self'; object-src 'none'",
    "status": 200,
    "referrer": "https://evil.com/"
  }
}, }
  ...
}]
```
[Other report types](#reportypes) discusses how to set up CSP reporting.
{: .note }

The Reporting API was designed to be out of band from your web app.
The browser captures, queues + batches, and sends reports automatically
at the most opportune time. Reports are
sent internally by the browser, so there's little to no performance concern
(e.g. network contention with your app) when using the Reporting API. There's
also no way to control when the browser sends queued reports.

## Debugging report configurations {: #debug }

If you don't see reports showing up on your server, head over to
`chrome://net-internals/#reporting`. That page is useful for
verifying things are configured correctly and reports are being sent
out properly.

<figure>
  <img src="/web/updates/images/2018/08/reporting/about_network.png"
       class="Reporting panel in about:net-internals"
       title="Reporting panel in about:net-internals">
  <figcaption>Reporting section in chrome://net-internals/#reporting</figcaption>
</figure>

## Other report types {: #reportypes }

The Reporting API can be used for more than just browser
`intervention` and `deprecation` messages. In fact, it can be configured to
send many other types of interesting warnings/issues that happen throughout
your site:

- [CSP violations](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Enabling_reporting)
- [Deprecations](https://www.chromestatus.com/features#deprecate)
- [Browser interventions](https://www.chromestatus.com/features#intervention)
- [Feature Policy][featurepolicy] violations (soon)
- Network Error Logging (`NEL` header)
- Crash reports

A primary "feature" of the Reporting API is that it provides a unified
tool to collect different types of warning/errors and report that information
to a backend.
{: .objective }

### CSP reports {: #csp }

A long time ago, the web elders realized that sending client-side CSP
violations to a backend would be pretty handy. If your site breaks
because of some new powerful feature (CSP), you probably want to be notified!
Thus, we've had a reporting mechanism for CSP from day one.

When a site violates a CSP rule, it can (optionally) tell the browser
to send the error to a server. This is done by adding the
[`report-uri` directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri)
in the CSP header:

```
Content-Security-Policy: ...; report-uri https://example.com/csp-reports
Content-Security-Policy-Report-Only: ...; report-uri https://example.com/csp-reports
```

The **Reporting API integrates with CSP reports** by adding a new
[`report-to` directive](https://www.chromestatus.com/features/5826576096690176).
Unlike `report-uri` which takes a URL, `report-to` takes an
endpoint group name. It still has a URL, but that gets moved inside `endpoints`
in the configuration object:

**New**

```
Content-Security-Policy-Report-Only: ...; report-to csp-endpoint
Report-To: {
    ...
  }, {
    "group": "csp-endpoint",
    "max_age": 10886400,
    "endpoints": [{
      "url": "https://example.com/csp-reports"
    }]
  }
```

For backwards compatibility, continue to use `report-uri` along with `report-to`.
In other words: `Content-Security-Policy: ...; report-uri https://endpoint.com; report-to groupname`.
Browsers that support `report-to` will use it instead of the former.
{: .key-point }

### Network errors {: #nel }

[Network Error Logging][nel] (NEL) is a new spec that defines a mechanism for
collecting client-side network errors on a page using the `NEL` HTTP
response header. To be able to report those errors to a server, it
integrates with the Reporting API. To send a page's network errors, you need
to setup the `Report-To` header and then tell the browser which pages to
report errors for.

First, add another named group in the
`Report-To` header which specifies an endpoint for receiving the reports:

```
Report-To: {
    ...
  }, {
    "group": "network-errors",
    "max_age": 2592000,
    "endpoints": [{
      "url": "https://example.com/reports"
    }]
  }
```

Next, send the `NEL` response header on pages that you want errors from.
The header value is a "JSON" object that takes multiple values. One
of those values--one of those being a `report_to` field to reference the
group name of your network errors endpoint.

```
GET /index.html HTTP/1.1
NEL: {"report_to": "network-errors", "max_age": 2592000}
```

The `Report-To` header uses a hyphen. Here, `report_to` uses an underscore.
{: .caution }

### Feature Policy reports {: #fpreports }

Currently, [Feature Policy violations][featurepolicy] are not captured with
the Reporting API. However, [the plan](https://crbug.com/867471) is to
integrate Feature Policy into the API.

<!--
### Enable CORS

Report requests are subject to CORs preflight requests. You may need to enable
them on your server. One way to do that is enable CORs requests for all
endpoints:

```js
app.options('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
```
-->

## Difference between ReportingObserver {: #which }

[ReportingObserver][reportingobserver] is a subset of the Reporting API!

The `ReportingObserver` is a JavaScript API that can only observe deprecation or
intervention warnings. Inside the callback, you can do whatever
you want: inspect a report, send it to a server, load polyfill/fallback scripts,
report the information to an analytics provider, etc.

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    console.log(report.type, report.url, report.body);
  }
}, {buffered: true});

observer.observe();
```

The Reporting API is different in a couple of ways. The first difference is
that it doesn't have a JavaScript API. The API surface of the Reporting API
is entirely through the `Report-To` HTTP header and usage with other
headers like `NEL` and `Content-Security-Policy`. Secondly, the Reporting
API can capture more powerful types of issues like CSP violations,
network errors, and browser crashes. This information is not exposed to
JS (and therefore `ReportingObserver`) for security reasons.

## Example server

HTTP examples are great. Actual code is better.

To see all this stuff in context, below is an example Node server
that uses Express and brings together all the pieces discussed in this article.
It shows how to configure reporting for several different
[report types](#reportypes) and create separate handlers to capture the results.

```js
const express = require('express');

const app = express();
app.use(express.json({
  type: ['application/json', 'application/csp-report', 'application/reports+json']
}));
app.use(express.urlencoded());

app.get('/', (request, response) => {
  // Note:  report-to replaces report-uri, but it is not supported yet.
  response.set('Content-Security-Policy-Report-Only',
      `default-src 'self'; report-to csp-endpoint`);
   // Note: report_to and not report-to for NEL.
  response.set('NEL', `{"report_to": "network-errors", "max_age": 2592000}`);

  // The Report-To header is used to tell the browser where to send
  // CSP, browser interventions, deprecations, and nertwork errors.
  // The default group (first example below) captures interventions and
  // deprecation reports. Other groups are referenced by their "group" name.
  response.set('Report-To', `{
    "max_age": 2592000,
    "endpoints": [{
      "url": "https://reporting-observer-api-demo.glitch.me/reports"
    }],
  }, {
    "group": "csp-endpoint",
    "max_age": 2592000,
    "endpoints": [{
      "url": "https://reporting-observer-api-demo.glitch.me/csp-reports"
    }],
  }, {
    "group": "network-errors",
    "max_age": 2592000,
    "endpoints": [{
      "url": "https://reporting-observer-api-demo.glitch.me/network-reports"
    }]
  }`);

  response.sendFile('./index.html');
});

function echoReports(request, response) {
  // Record report in server logs or otherwise process results.
  for (const report of request.body) {
    console.log(report.body);
  }
  response.send(request.body);
}

app.post('/csp-reports', (request, response) => {
  console.log(`${request.body.length} CSP violation reports:`);
  echoReports(request, response);
});

app.post('/network-reports', (request, response) => {
  console.log(`${request.body.length} Network error reports:`);
  echoReports(request, response);
});

app.post('/reports', (request, response) => {
  console.log(`${request.body.length} deprecation/intervention reports:`);
  echoReports(request, response);
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
```

## Conclusion

The Reporting API is a useful tool to get more diagnostics about your app
when real users visit your site.  It provides a unified way to collect
different types of browser warnings/errors and report that useful information
to a backend.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[spec]: https://w3c.github.io/reporting
[reportingobserver]: /web/updates/2018/07/reportingobserver
[explainer]: https://github.com/W3C/reporting/blob/master/EXPLAINER.md
[featurepolicy]: /web/updates/2018/06/feature-policy
[nel]: https://www.chromestatus.com/features/5391249376804864
