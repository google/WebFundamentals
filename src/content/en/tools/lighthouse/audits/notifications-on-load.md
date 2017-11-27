project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Requesting The Notification Permission On Page Load" Lighthouse audit.

{# wf_updated_on: 2017-04-19 #}
{# wf_published_on: 2016-12-05 #}

# Avoids Requesting The Notification Permission On Page Load  {: .page-title }

## Why the audit is important {: #why }

As explained in [What Makes a Good Notification][good], good notifications are
timely, relevant, and precise. If your page asks for permission to send
notifications on page load, those notifications may not be relevant to your
users or precise to their needs. A better user experience is to offer to send
users a specific type of notification, and to present the permissions request
after they opt-in.

[good]: /web/fundamentals/push-notifications/

## How to pass the audit {: #how }

Under **URLs**, Lighthouse reports the line and column numbers where your
code is requesting permission to send notifications. Remove these calls,
and tie the requests to user gestures instead.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

If notification permissions was already granted or denied to a page before
Lighthouse's audit, Lighthouse cannot determine if the page requests
notification permissions on page load. Reset the permissions and run
Lighthouse again. See [Change website permissions][help] for more help.

Lighthouse collects the JavaScript that was executed on page load. If this
code contains calls to `notification.requestPermission()`, and notification
permission was not already granted, then notification permission was requested.

[help]: https://support.google.com/chrome/answer/6148059


{% include "web/tools/lighthouse/audits/_feedback/notifications-on-load.html" %}
