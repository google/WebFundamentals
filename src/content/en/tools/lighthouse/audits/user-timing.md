project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "User Timing Marks and Measures" Lighthouse audit.

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# User Timing Marks and Measures  {: .page-title }

## Why the audit is important {: #why }

The User Timing API enables you to measure your app's JavaScript performance.
The basic idea is that you decide which parts of your scripts you want to
optimize, and then you instrument those parts of your scripts with the User
Timing API. From there, you can access the results from JavaScript using the
API, or view them on your [Chrome DevTools Timeline
Recordings](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## How to pass the audit {: #how }

This audit is not structured as a "pass" or "fail" test. It's just an
opportunity to discover a useful API that can aid you in measuring your app's
performance. The score that Lighthouse reports for this audit corresponds to the
number of User Timing Marks and Measures that it finds in your app.

When your app does include User Timing Marks and Measures, you'll see these
Marks and Measures in your Lighthouse report.

Check out [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
for an introduction on using the User Timing API to measure your app's
JavaScript performance.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse extracts User Timing data from Chrome's Trace Event Profiling Tool.


{% include "web/tools/lighthouse/audits/_feedback/user-timing.html" %}
