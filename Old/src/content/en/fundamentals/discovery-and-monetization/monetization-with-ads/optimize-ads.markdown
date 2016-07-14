---
layout: shared/narrow
title: "Optimize your ads"
description: "Optimizing your site, and the ads that appear on it, can improve the quality of ads served and increase your earning potential."
published_on: 2014-08-12
updated_on: 2015-10-06
order: 4
translation_priority: 0
authors:
  - megginkearney
  - petelepage
key-takeaways:
  tldr:
  - "Periodically check your AdSense <b>scorecard</b> and implement any <b>recommendations</b>."
  - "Review <b>performance reports</b> to understand what ads are providing the most value to you and your users."
  - "Choose ads that perform best on your site."
  - "Don't block the AdSense crawler in <code>robots.txt</code>."

---

<p class="intro">
  Optimizing your ads is crucial to the success of your advertising goals. Through ad optimization, you can grow your ad revenue, improve your site's usability, and get more traffic.
</p>

Want to get better results with AdSense ads and make sure that you give your
users what they want while getting what you want? Need some inspiration?
Check out these tips from AdSense specialists who have worked with publishers
of all sizes.

<b>Note:</b> while this article focuses on AdSense, the concepts apply to any 
ad provider.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

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
  <img src="images/optimization_score.png" alt="Revenue optimization scorecard">
  <figcaption>Revenue optimization scorecard</figcaption>
</figure>

<figure>
  <img src="images/multiscreen_score.png" alt="Multi-screen scorecard">
  <figcaption>Multi-screen scorecard</figcaption>
</figure>

<figure>
  <img src="images/site_score.png" alt="Site health scorecard">
  <figcaption>Site health scorecard</figcaption>
</figure>



The <b>Recommendation box</b> on the [Home](https://www.google.com/adsense/app#home)
tab offers recommendations how your site could be changed to earn more revenue. 
These recommendations are based on analyzing the performance of recommendations
that have been recently implemented by other AdSense publishers and are only
provided when there is a high confidence of increased performance.

## Use performance reports

Use the Google AdSense <b>[Performance reports](https://www.google.com/adsense/app#viewreports)</b> 
tab to see how much you’re earning, what impacts those earnings, and graphs
to chart trends over time.

Use the reports below to get started:

<table class="mdl-data-table mdl-js-data-table">
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
        Ad units
      </td>
      <td data-th="Description">
        View performance for individual ad units you've customized to help
        analyze which ad units perform better and decide whether these type 
        of units can be placed in other locations. It can also help you better
        understand why they are performing so well, allowing you to apply it
        to other units.
      </td>
    </tr>
    <tr>
      <td data-th="Report">
        <a href="https://support.google.com/adsense/answer/1407511">Sites</a>
      </td>
      <td data-th="Description">
        If you own multiple sites, this report can help you understand if one
        site is performing better and how you might replicate that behavior
        on other sites.
      </td>
    </tr>
  </tbody>
</table>

### Sign up for customized help and performance suggestions

In addition to performance reports, AdSense can send occasional customized
help and performance report suggestions by email. To sign up, verify 
your email address in [Personal settings](https://www.google.com/adsense/app#personalSettings),
and check the *Customized help and performance suggestions* checkbox under
*Email preferences*.

<figure>
  <img src="images/adsense-emails.jpg" srcset="images/adsense-emails.jpg 1x, images/adsense-emails-2x.jpg 2x" alt="AdSense personal settings page">
  <figcaption>Enable Customized help and performance suggestions emails.</figcaption>
</figure>


## Maximize bidding potential

The higher the competition, or 'auction pressure', the more the advertiser 
will pay to be viewed and clicked on your site. To maximize your bidding
potential:

* Be sure to allow both [text](https://support.google.com/adsense/answer/185665)
and [display ads](https://support.google.com/adsense/answer/185666). Excluding
one type of ads limits the number of advertisers available to you.
* Use ad sizes that are popular with advertisers, see the [Guide to ad sizes](https://support.google.com/adsense/answer/6002621).
* In some cases, certain ads may not blend well with your content, be careful
about blocking too many categories as it will lower your potential earnings.

<b>Note:</b> this information is also included in the publisher scorecard, 
but it's crucial to strong ad performance!

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



