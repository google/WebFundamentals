project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to enable offline Google Analytics.

{# wf_updated_on: 2020-01-15 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: N/A #}

# Enable Offline Google Analytics {: .page-title }

Offline analytics is a module that will use background sync to ensure
that requests to Google Analytics are made regardless of the current network
condition. This is especially useful if you've built an app that works offline.

Enabling offline analytics can be as simple as:

<pre class="prettyprint js">
import * as googleAnalytics from 'workbox-google-analytics';

googleAnalytics.initialize();
</pre>

There are more options that enable you to detect a retried request as well as
track how long a request has been queued before being sent to Google Analytics.
[Learn more here](/web/tools/workbox/modules/workbox-google-analytics).
