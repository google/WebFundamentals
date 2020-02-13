project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: To help site owners understand notification permission metrics, we’re adding this data to the Chrome User Experience Report (CrUX) in the 202001 dataset allowing site owners gain a better understanding of typical user notification permission responses for their sites and comparable sites in their category.

{# wf_published_on: 2020-02-11 #}
{# wf_updated_on: 2020-02-11 #}
{# wf_tags: notifications #}
{# wf_featured_image: /web/updates/images/generic/notifications.png #}
{# wf_blink_components: N/A #}
{# wf_featured_snippet: Chrome 80 introduced quieter permission UI for notifications. To help site owners understand notification permission metrics, we’re adding this data to the Chrome User Experience Report (CrUX) in the 202001 dataset allowing site owners gain a better understanding of typical user notification permission responses for their sites and comparable sites in their category. #}

# Adding notification permission data to the Chrome User Experience Report {: .page-title }

{% include "web/_shared/contributors/pjmclachlan.html" %}
{% include "web/_shared/contributors/rviscomi.html" %}

Chrome 80 introduced [quieter permission UI for notifications][quieter-not-post].
To help site owners understand notification permission metrics, we’re adding this
data to the [Chrome User Experience Report](/web/tools/chrome-user-experience-report/)
(CrUX) in the [202001 dataset][202001-crux-dataset], released on February 11,
2020. This will allow site owners gain a better understanding of typical user
notification permission responses for their sites and comparable sites in
their category.

CrUX only provides a high level summary of notification permission request
*Accept*, *Block*, *Ignore*, and *Dismiss* rates.  We recommend you augment
this data with detailed analytics from your preferred analytics platform.

## About CrUX notification permission data

The CrUX data format and methodology is described in detail in the
[developer documentation](/web/tools/chrome-user-experience-report#data-format),
and you should review considerations on
[population and analysis best practices](/web/tools/chrome-user-experience-report#population-differences).
Because reported data is only from opt-in users, there may be variance between
data in the CrUX dataset and data you collect from your own analytics.

When a notification permission is requested, Chrome will show users a prompt.
Users can actively or passively take one of four actions, described in the
table below.

<table>
  <tbody>
    <tr>
      <td><i>Allow</i></td>
      <td>The user explicitly allows the website to show them notifications.</td>
    </tr>
    <tr>
      <td><i>Block</i></td>
      <td>
        The user has explicitly disallowed the website from showing them
        notifications.
      </td>
    </tr>
    <tr>
      <td><i>Dismiss</i></td>
      <td>
        The user closes the permission prompt without any explicit
        response. Tab close counts as a dismiss.  On mobile, tab switch also 
        counts as a dismiss action, and the quiet UI has an explicit user 
		    dismiss option.  
      </td>
    </tr>
    <tr>
      <td><i>Ignore</i></td>
      <td>
        The user does not interact with the prompt at all. Navigation events
        also count as an ignore, such as the back button or navigation using the 
        omnibox.  
      </td>
    </tr>
  </tbody>
</table>

The CrUX dataset includes data for each of these user actions as a percentage
of responses.

## How to interpret your data

*Block* and *Accept* rates are the two most important metrics. As described in
the [quieter notification permissions blog post][quieter-not-post],
Chrome will automatically enroll sites with very low Accept rates into the
quieter UI. Block rate is also a strong signal. When a user clicks
Block, the user has sent a clear message that they are not interested in
receiving the site’s notification, not just at that moment, but at any time.
Most often this means that the user does not understand the intended use of
the notification, the value of the product and service, or has not
established trust with your website. Both low Accept or high Block rates
are a clear indicator that the website should review the
[recommended patterns](#recommended-patterns)  section in this article.

It is normal and expected that different types of sites will have different
Accept and Block rates. For example, a chat app or email app has a very strong
use case and we could expect Accept rates to be quite high. 

It’s also normal that rates for the same site may vary significantly between 
desktop and mobile, as the use cases can be different and users may have a 
strong preference for notification on one type of device over the other. The 
large variance between mobile and desktop is the reason that automatic site 
enrollment in quiet notification permission UI is separated by device type. 
Some sites may be enrolled in quiet UI only on mobile or only on desktop.  

As more users enroll in quieter notifications UI we expect that Ignore
rates will increase over time relative to other metrics. You should view this 
trend as normal and expected.


## Recommended patterns {: #recommened-patterns }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="riKmez3sHaM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Let your users take the initiative and turn on notifications at their own
pace. Introduce toggles or buttons discretely as part of preexisting UI
surfaces so that they are shown at steps of the user’s workflow where there
is good reason to believe that they might want to opt in to receiving timely 
updates.

Avoid showing prompts and/or overlays without context or immediately after a
user lands on the site. Prompts interrupt the user’s browsing experience
without providing context as to why notifications are needed or useful to
them.

<div class="clearfix"></div>

## Querying the dataset

Beginning with the [202001 CrUX dataset][202001-crux-dataset], you can access
notification permission data by querying the
`experimental.permission.notifications` field.

```
SELECT
  SUM(experimental.permission.notifications.accept) AS accept,
  SUM(experimental.permission.notifications.deny) AS deny,
  SUM(experimental.permission.notifications.ignore) AS `ignore`,
  SUM(experimental.permission.notifications.dismiss) AS dismiss
FROM
  `chrome-ux-report.all.202001`
WHERE
  origin = 'https://news.google.com'
```

Note: Because "ignore" is a reserved keyword in BigQuery, we have to enclose it
in backticks so it's interpreted as a field name.

In this example, we're querying the notification permission data for Google
News. We use the `SUM` function to add up the permission rates for each
dimension (form factor and effective connection type) so we get an
origin-wide view.

<table>
  <tbody>
    <tr>
      <th>accept</th>
      <th>deny</th>
      <th>ignore</th>
      <th>dismiss</th>
    </tr>
    <tr>
      <td>0.8231</td>
      <td>0.0476</td>
      <td>0.0502</td>
      <td>0.0791</td>
    </tr>
  </tbody>
</table>

<img src="/web/updates/images/2020/02/crux-gnews.png"
     alt="Pie chart representing accept rates"
     class="attempt-right">

The results show that 82.3% of users accept the notification permission
prompt, while 4.8% deny, 5.0% ignore, and 7.9% dismiss it.

<div class="clearfix"></div>

Learn more about [using CrUX on BigQuery][crux-on-bq] and browse the
[CrUX Cookbook][crux-cookbook] for more example queries.

## Feedback {: .hide-from-toc }

For any questions, or to share your thoughts/feedback about the notification
permission data in CrUX, you can reach us on the
[CrUX support forum][crux-support] or [@ChromeUXReport][crux-twitter] on
Twitter.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[quieter-not-post]: https://blog.chromium.org/2020/01/introducing-quieter-permission-ui-for.html
[202001-crux-dataset]: https://console.cloud.google.com/bigquery?p=chrome-ux-report&d=all&t=202001&page=table
[crux-on-bq]: https://web.dev/chrome-ux-report-bigquery/
[crux-cookbook]: https://github.com/GoogleChrome/CrUX/tree/master/sql
[crux-support]: https://groups.google.com/a/chromium.org/forum/#!topic/chrome-ux-report/
[crux-twitter]: https://twitter.com/ChromeUXReport
