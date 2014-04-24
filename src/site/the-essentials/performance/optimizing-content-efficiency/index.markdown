---
layout: article
title: "Optimizing content efficiency"
description: "Our web applications continue to grow in their scope, ambition, and 
              functionality - that's a good thing. However, the relentless march towards a 
              richer web is driving another trend: the amount of data downloaded by each 
              application continues to increase at a steady pace. "
introduction: "Our web applications continue to grow in their scope, ambition, and 
               functionality - that's a good thing. However, the relentless march towards a 
               richer web is driving another trend: the amount of data downloaded by each 
               application continues to increase at a steady pace. "
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 2
id: optimizing-content-efficiency
collection: performance
---

{% wrap content%}

* Table of Contents
{:toc}

What does a modern web application look like? [HTTP 
Archive](http://httparchive.org/) can help us answer this question. The project 
tracks how the web is built by periodically crawling the most popular sites 
(300,000+ from the Alexa Top 1M list) and recording and aggregating analytics on 
the number of used resources, content types, and other metadata for each 
individual destination.

<img src="image00.png" width="596" height="216" />

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td></td>
<td>50% (median)</td>
<td>75%</td>
<td>90%</td>
</tr>
<tr>
<td>HTML</td>
<td>13 KB (1%)</td>
<td>26 KB (1%)</td>
<td>54 KB (2%)</td>
</tr>
<tr>
<td>Images</td>
<td>528 KB (50%)</td>
<td>1213 KB (61%)</td>
<td>2384 KB (68%)</td>
</tr>
<tr>
<td>JavaScript</td>
<td>207 KB (20%)</td>
<td>385 KB (19%)</td>
<td>587 KB (17%)</td>
</tr>
<tr>
<td>CSS</td>
<td>24 KB (2%)</td>
<td>53 KB (3%)</td>
<td>108 KB (3%)</td>
</tr>
<tr>
<td>Other</td>
<td>282 KB (27%)</td>
<td>308 KB (16%)</td>
<td>353 KB (10%)</td>
</tr>
<tr>
<td>Total</td>
<td>1054 KB</td>
<td>1985 KB</td>
<td>3486 KB</td>
</tr>
</table>

The above data captures the trend in growth of number of downloaded bytes for 
popular destinations on the web between January 2013 and January 2014. Of 
course, not every site grows at the same rate or requires same amount of data, 
hence the reason why we are highlighting the different quantiles within the 
distribution: 50th (median), 75th, and 90th. 

A median site at the beginning of 2014 is composed of 75 requests that add up to 
1054 KB of total transferred bytes, and the total number of bytes (and requests) 
has grown at a steady pace throughout the previous year. This by itself should 
not be all that surprising, but it does carry important performance 
implications: yes, internet speeds are getting faster, but they are getting 
faster at different rates in different countries, and many users are still 
subject to data caps and expensive metered plans - especially on mobile. 

Unlike their desktop counterparts, web applications do not require a separate 
installation process: type in the URL, hit Go, and we are up and running -- 
that's a key feature of the web. However, to make this happen **we often have to 
fetch dozens, and sometime hundreds, of various resources, all of which can add 
up to megabytes of data and must come together in hundreds of milliseconds to 
facilitate the ****instant web experience**** we are aiming for. **

Achieving an instant web experience in light of these requirements is no small 
feat, which is why optimizing content efficiency is critical: eliminating 
unnecessary downloads, optimizing transfer encoding of each resource through 
various compression techniques, and leveraging caching whenever possible to 
eliminate redundant downloads. 

## Guides

{% for guide in page.articles.optimizing-content-efficiency %}
{% class %}
### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}


{% endwrap %}
