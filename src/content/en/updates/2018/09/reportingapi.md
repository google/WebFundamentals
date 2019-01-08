project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Reporting API brings a common infrastructure for the browser to send reports for various issues: CSP violations, deprecations, browser interventions, network errors, and feature policy violations.

{# wf_updated_on: 2018-10-23 #}
{# wf_published_on: 2018-09-03 #}
{# wf_tags: content-security-policy,interventions,deprecations,removals,feature-policy,reporting-observer,analytics,reporting #}
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
[CSP violations][cspviolations], Feature Policy violations, deprecations,
browser interventions, and network errors are
[some of the things](#reportypes) that can be collected using the
Reporting API.

<figure>
  <img src="/web/updates/images/2018/07/reporting/consolewarnings.png"
       class="screenshot" alt="DevTools console warnings for deprecations and interventions."
       title="DevTools console warnings for deprecations and interventions.">
  <figcaption>Browser-generated warnings in the DevTools console.</figcaption>
</figure>

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
for [blocking document.write() on 2G networks](https://www.chromestatus.com/features/5718547946799104).
Yikes! Without the Reporting API there's no way to know
this is happening to your precious users.

The Reporting API helps catch potential (even future) errors across
your site. Setting it up gives you "peace of mind" that nothing terrible is
happening when real users visit your site. If/when they _do_ experience
unforeseen errors, you'll be in the know. 👍

## The Report-To Header {: #header }

Right now, the API needs to be enabled using a
runtime command line flag: `--enable-features=Reporting`.
{: .caution }

The Reporting API introduces a new HTTP response header, `Report-To`. Its
value is an object which describes an endpoint group for the browser
to report errors to:

```
Report-To: {
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://analytics.provider.com/browser-errors"
             }]
           }
```

Note: If your endpoint URL lives on a different origin than your site, the
endpoint should support CORs preflight requests. (e.g. `Access-Control-Allow-Origin: *;
Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS; Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With`

In the example, sending this response header with your main page
configures the browser to report browser-generated warnings
to the endpoint `https://analytics.provider.com/browser-errors` for `max_age` seconds.
It's important to note that all subsequent HTTP requests made by the page
(for images, scripts, etc.) are ignored. Configuration is setup during
the response of the main page.

### Configuring multiple endpoints {: #multi }

A single response can configure several endpoints at once by sending
multiple `Report-To` headers:


```
Report-To: {
             "group": "default",
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://example.com/browser-reports"
             }]
           }
Report-To: {
             "group": "csp-endpoint",
             "max_age": 10886400,
             "endpoints": [{
               "url": "https://example.com/csp-reports"
             }]
           }
```

or by combining them into a single HTTP header:

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
               "url": "https://example.com/browser-errors"
             }]
           }
```

Once you've sent the `Report-To` header, the browser caches the endpoints
according to their `max_age` values, and sends all of those nasty console
warnings/errors to your URLs. Boom!

<figure>
  <img src="/web/updates/images/2018/07/reporting/consolewarnings.png"
       class="screenshot" alt="DevTools console warnings for deprecations and interventions."
       title="DevTools console warnings for deprecations and interventions.">
  <figcaption>DevTools warnings and errors that can be sent using the Reporting API.</figcaption>
</figure>

### Explanation of header fields {: #fields }

Each endpoint configuration contains a `group` name, `max_age`, and `endpoints`
array. You can also choose whether to consider subdomains when reporting
errors by using the `include_subdomains` field.

| Field | Type | Description |
|---|---|---|---|---|
| `group` | string | Optional. If a `group` name is not specified, the endpoint is given a name of "default". |
| `max_age` | number | **Required**. A non-negative integer that defines the lifetime of the endpoint in seconds. A value of "0" will cause the endpoint group to be removed from the user agent’s reporting cache.|
| `endpoints` | Array&lt;Object> | **Required**. An array of JSON objects that specify the actual URL of your report collector. |
| `include_subdomains` | boolean | Optional. A boolean that enables the endpoint group for all subdomains of the current origin's host. If omitted or anything other than "true", the subdomains are not reported to the endpoint. |

The `group` name is a unique name used to associate a string with
an endpoint. Use this name in other places that integrate
with the Reporting API to refer to a specific endpoint group.

The `max-age` field is also required and specifies how
long the browser should use the endpoint and report errors to it.

The `endpoints` field is an array to provide failover and load balancing
features. See the section on [Failover and load balancing](#load). It's
important to note that the **browser will select only one endpoint**, even
if the group lists several collectors in `endpoints`. If you want to send a
report to several servers at once, your backend will need to forward the
reports.

## How the browser sends a report {: #sending }

**Reports are delivered out-of-band from your app**, meaning the browser
controls when reports are sent to your server(s). The browser attempts to
deliver queued reports as soon as they're ready (in order to provide
timely feedback to the developer) but it can also delay delivery if it's
busy processing higher priority work or the user is on a slow and/or
congested network at the time. The browser may also prioritize sending
reports about a particular origin first, if the user is a frequent visitor.

The browser periodically batches reports and sends them to the reporting
endpoints that you configure. To send reports, the browser issues a `POST`
request with
`Content-Type: application/reports+json` and a body containing the array of
warnings/errors which were captured.

**Example** - browser issues a `POST` request to your CSP errors endpoint:

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
[Report types](#reportypes) discusses how to set up CSP reporting.
{: .note }

The Reporting API was designed to be out of band from your web app.
The browser captures, queues and batches, then sends reports automatically
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

## Report types {: #reportypes }

The Reporting API can be used for more than just browser
`intervention` and `deprecation` messages. In fact, it can be configured to
send many other types of interesting warnings/issues that happen throughout
your site:

- [CSP violations](#csp)
- [Deprecations](https://www.chromestatus.com/features#deprecate)
- [Browser interventions](https://www.chromestatus.com/features#intervention)
- [Feature Policy][featurepolicy] violations (in development)
- [Network Error Logging](#nel) (NEL)
- [Crash reports](#crashreports)

### CSP reports {: #csp }

A long time ago, the web elders realized that sending client-side CSP
violations to a backend would be pretty handy. If your site breaks
because of some new powerful feature (i.e. CSP), you probably want to be notified!
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
In other words: `Content-Security-Policy: ...; report-uri https://example.com/csp-reports; report-to groupname`.
Browsers that support `report-to` will use it instead of `report-uri`.
{: .key-point }

### Network errors {: #nel }

The [Network Error Logging][nel] (NEL) spec defines a **mechanism for
collecting client-side network errors from an origin**. It uses the new `NEL` HTTP
response header to setup to tell the browser collect network errors,
then integrates with the Reporting API to report the errors to a server.

To use NEL, first setup the `Report-To` header with a
collector that uses a named group:

```
Report-To: {
    ...
  }, {
    "group": "network-errors",
    "max_age": 2592000,
    "endpoints": [{
      "url": "https://analytics.provider.com/networkerrors"
    }]
  }
```

Next, send the `NEL` response header to start collecting errors. Since NEL
is opt-in for an origin, you only need to send the header once. Both `NEL` and
`Report-To` will apply to future requests to the same origin and will continue
to collect errors according to the `max_age` value that was used to set up
the collector.

The header value should be a JSON object that contains a `max_age` and
`report_to` field. Use the latter to reference the group name of your
network errors collector:

```
GET /index.html HTTP/1.1
NEL: {"report_to": "network-errors", "max_age": 2592000}
```

The `Report-To` header uses a hyphen. Here, `report_to` uses an underscore.
{: .caution }

#### Sub-resources {: #sub }

NEL works across navigations and subresources fetches. But for subresources,
there's an important point to highlight: the containing page has no visibility
into the NEL reports about cross-origin requests that it makes. This means
that if `example.com` loads `foobar.com/cat.gif` and that resource fails
to load, `foobar.com`'s NEL collector is notified, not `example.com`'s. The
rule of thumb is that NEL is reproducing server-side logs, just generated on
the client. Since `example.com` has no visibility into `foobar.com`'s server
logs, it also has no visibility into its NEL reports.

### Feature Policy violations {: #fpreports }

Currently, [Feature Policy violations][featurepolicy] are not captured with
the Reporting API. However, [the plan](https://crbug.com/867471) is to
[integrate Feature Policy into the Reporting API][reportingintegration].

### Crash reports {: #crashreports }

Browser crash reports are also still in development but will eventually
be capturable via the Reporting API.

## Failover and load balancing {: #load }

Most of the time you'll be configuring one URL collector per group. However,
since reporting can generate a good deal of traffic, the spec includes failover
and load-balancing features inspired by the DNS
[SRV record](https://tools.ietf.org/html/rfc2782#).

The browser will do its best to deliver a report to **at most one** endpoint
in a group. Endpoints can be assigned a `weight` to distribute load, with each
endpoint receiving a specified fraction of reporting traffic. Endpoints can
also be assigned a `priority` to set up fallback collectors.

**Example** - creating a fallback collector at https://backup.com/reports.

```
Report-To: {
             "group": "endpoint-1",
             "max_age": 10886400,
             "endpoints": [
               {"url": "https://example.com/reports", "priority": 1},
               {"url": "https://backup.com/reports", "priority": 2}
             ]
           }
```

Fallback collectors are only tried when uploads to primary collectors fail.
{: .key-point }

## Example server

HTTP examples are great. Actual code is even better.

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

  // The Report-To header tells the browser where to send
  // CSP violations, browser interventions, deprecations, and network errors.
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

## What about ReportingObserver? {: #ro }

Although both are part of the same [Reporting API spec][spec],
[ReportingObserver][reportingobserver] and the `Report-To` header have overlap
with each other but enable slightly different uses cases.

`ReportingObserver` is a JavaScript API that can observe simple
client-side warnings like deprecation and intervention. Reports
are not automatically sent to a server (unless you choose to do so in the callback):

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    // Send report somewhere.
  }
}, {buffered: true});

observer.observe();
```

More sensitive types of errors like CSP violations and network errors
cannot be observed by a `ReportingObserver`. Enter `Report-To`.

The `Report-To` header is more powerful in that it can capture
[more types](#reportypes) of error reports (network, CSP, browser crashes)
in addition to the ones supported in `ReportingObserver`. Use it when you
want to automatically report errors to a server or capture errors
that are otherwise impossible to see in JavaScript (network errors).

## Conclusion

Although the Reporting API is a ways out from shipping in all browsers, it's
a promising tool for diagnosing issues across your site.

Warnings that get logged to the DevTools console are super helpful
but have limited value to you as the site author. That's because they're
local to the user's browser! The Reporting API changes this. Use it to
configure, detect, and report errors to a server even when your own
code cannot. Propagate browser warnings to a backend, catch issues across
your site before they grow out of control, and prevent future bugs before they
happen (e.g. know about deprecated APIs ahead of their removal).

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://w3c.github.io/reporting
[reportingobserver]: /web/updates/2018/07/reportingobserver
[explainer]: https://github.com/W3C/reporting/blob/master/EXPLAINER.md
[featurepolicy]: /web/updates/2018/06/feature-policy
[nel]: https://www.chromestatus.com/features/5391249376804864
[reportingintegration]: https://github.com/WICG/feature-policy/blob/master/reporting.md
[cspviolations]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Enabling_reportin
