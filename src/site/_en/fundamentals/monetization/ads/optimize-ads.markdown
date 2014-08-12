---
layout: article
title: "Optimize Your Ads"
description: "Optimizing your site, and the ads that appear on it can improve the quality of ads served and increase your earning potential."
introduction: "Optimizing your ads and site is crucial when it comes to the success of your goals. Through optimization, you can help grow your ad revenue, improve usability of your site, get more traffic or accomplish any of your other goals."
article:
  written_on: 2014-08-12
  updated_on: 2014-08-12
  order: 4
id: optimize-ads
collection: ads
authors:
  - megginkearney
  - petelepage
key-takeaways:
  tldr:
  - Periodically check your AdSense <b>scorecard</b> and implement any <b>recommendations</b>.
  - Review <b>performance reports</b> to understand what ads are providing the most value to you and your users.
  - Choose ads that perform best on your site.
  - Don't block the AdSense crawler in <code>robots.txt</code>.

---

{% wrap content %}

Want to get better results with AdSense ads and make sure that you give your
users what they want while getting what you want? Need some inspiration?
Check out these tips from AdSense specialists who have worked with publishers
of all sizes.

<b>Note:</b> while this article focuses on AdSense, the concepts apply to any 
ad provider.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Check scorecards and Recommendations

Use the scorecard on the <b>[Home](https://www.google.com/adsense/app#home)</b>
tab of your account to check how well your ad settings, webpages and content
are performing compared to those of other AdSense publishers.

Scorecard is organized into different categories (revenue optimization, site 
health, etc.), provides a score of one to five blue dots. Each score indicates
the ranking relative to other publishers in that particular category. While
a lower score in a category means there are potential areas for improvement,
pay special attention to items flagged with a red or yellow exclamation mark.

<figure>
  <img src="images/multiscreen_score.png" alt="Multi-screen scorecard">
  <figcaption>Multi-screen scorecard</figcaption>
</figure>

<figure>
  <img src="images/site_score.png" alt="Site health scorecard">
  <figcaption>Site health scorecard</figcaption>
</figure>

<figure>
  <img src="images/optimization_score.png" alt="Revenue optimization scorecard">
  <figcaption>Revenue optimization scorecard</figcaption>
</figure>

The <b>Recommendation box</b> on the [Home](https://www.google.com/adsense/app#home)
tab offers recommendations how your site could be changed to earn more revenue. 
These recommendations are based on analyzing the performance of recommendations
that have been recently implemented by other AdSense publishers and are only
provided when there is a high confidence of increased performance.

{% include modules/remember.liquid title="Learn more" text="Review <a href='https://support.google.com/adsense/answer/3006004'>about the scorecard</a> and the <a href='https://support.google.com/adsense/answer/1725006'>recommendation box</a> in AdSense help." %}

## Run performance reports

Use the Google AdSense <b>[Performance reports](https://www.google.com/adsense/app#viewreports)</b> 
tab to see how much you’re earning, what impacts those earnings, and graphs
to chart trends over time.

There are several [pre-defined reports](https://support.google.com/adsense/answer/164700),
and it’s possible to [create custom reports](https://support.google.com/adsense/answer/1703033)
based on specific needs.  In most cases, you’ll find the reports below will
meet your needs and will help to maximize your ad revenue:

<table class="table-2">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th>Report</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Report">
        <a href="https://support.google.com/adsense/answer/3540509">Creative sizes</a>
      </td>
      <td data-th="Description">
        Shows you the size of displayed ads served on your site; use this 
        report to understand trends in ad sizing when using responsive ads.
      </td>
    </tr>
    <tr>
      <td data-th="Report">
        <a href="https://support.google.com/adsense/answer/23168">Targeting types</a>
      </td>
      <td data-th="Description">
        Reports how ads are being targeted to your site; specifically compares
        the percentage of ads targeting your site's content compared to the
        percentage of ads targeting user-interests.
      </td>
    </tr>
    <tr>
      <td data-th="Report">
        <a href="https://support.google.com/adsense/answer/3373004">Platforms</a>
      </td>
      <td data-th="Description">
        Shows which devices your ad units were viewed on, for example, on 
        desktop or mobile. 
      </td>
    </tr>
  </tbody>
</table>

{% include modules/remember.liquid title="Learn more" text="Learn more about <a href='https://support.google.com/adsense/answer/160562'>performance reports</a> in AdSense help." %}

## Maximize bidding potential

The higher the competition, or 'auction pressure', the more the advertiser 
will pay to be viewed and clicked on your site. To maximize your bidding
potential:

* Be sure to allow both [text](https://support.google.com/adsense/answer/185665)
and [display ads](https://support.google.com/adsense/answer/185666). Excluding
one type of ads limits the number of advertisers available to you.
* Use ad sizes that are popular with advertisers, see the [Guide to ad sizes](https://support.google.com/adsense/answer/6002621).

## Don't block the AdSense crawler

Verify that the [robots.txt](https://support.google.com/webmasters/answer/6062608)
file on your site [doesn’t block the AdSense crawler](https://support.google.com/adsense/answer/10532).
AdSense needs to be able to process and index the content of web pages and 
uses the AdSense crawler to visit your site and determine its content.  This
allows AdSense to provide relevant ads.

To update the `robots.txt` file to grant the AdSense crawler access to your 
pages, *remove* the following two lines of text from your `robots.txt`:

    User-agent: Mediapartners-Google
    Disallow: /



{% endwrap %}
