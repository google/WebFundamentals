project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Requesting The Geolocation Permission On Page Load" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-11-30 #}

# Avoids Requesting The Geolocation Permission On Page Load  {: .page-title }

## Why the audit is important {: #why }

Users are mistrustful of or confused by pages that automatically request
their location on page load. Rather than automatically requesting a
user's location on page load, tie the request to a user's gesture, such as
a tapping a "Find Stores Near Me" button. Make sure that the gesture clearly
and explicitly expresses the need for the user's location.

## How to pass the audit {: #how }

Under **URLs**, Lighthouse reports the line and column numbers where your
code is requesting the user's location. Remove these calls, and tie the
requests to user gestures instead. 

See [Ask permission responsibly][ask] for a list of best practices when
requesting a user's location.

[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

If geolocation permission was already granted to a page before Lighthouse's
audit, Lighthouse cannot determine if the page requests the user's location
on page load. Reset the permissions and run Lighthouse again. See
[Change website permissions][help] for more help.

Lighthouse collects the JavaScript that was executed on page load. If this
code contains calls to `geolocation.getCurrentPosition()` or
`geolocation.watchPosition()`, and geolocation permission was not already
granted, then the user's location was requested.

[help]: https://support.google.com/chrome/answer/6148059


{% include "web/tools/lighthouse/audits/_feedback/geolocation-on-load.html" %}
