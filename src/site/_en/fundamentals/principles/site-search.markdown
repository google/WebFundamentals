---
layout: article
title: "Site Search"
description: "Site search is vital for helping mobile users find what they're looking for in a hurry."
introduction: "Site search is vital for helping mobile users find what they're looking for in a hurry."
article:
  written_on: 2014-08-06
  updated_on: 2014-08-13
  order: 2
id: principles-of-site-design-ssearch
authors:
  - petelepage
collection: principles-of-site-design
key-takeaways:
  tldr:   
    - Place your site search near the top of your homepage via an open text field.  
    - Make sure your site search returns the strongest results first, and implement smart-search features like autocomplete and spelling corrections.  
    - Offer filters to help users get what they need from search, but make sure users can't filter a search to return zero results.   
    - If your offerings can be easily narrowed by segment, asking a few questions upfront helps ensure visitors see relevant results.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple5
  - g.co/mobilesiteprinciple6
  - g.co/mobilesiteprinciple7
  - g.co/mobilesiteprinciple8
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Make site search visible

Users looking for specific information usually turn to search - so search should 
be one of the first things mobile users see on your site, avoid hiding it behind 
a menu. In the [study](/web/fundamentals/principles/research-study.html), 
participants responded best to easily-visible, open text search boxes at the 
top of a page.

<figure>
  <img src="images/ss-search.jpg" srcset="images/ss-search.jpg 1x, images/ss-search-2x.jpg 2x" alt="Sample of site with search accessible and not.">
  <figcaption>Ensure that search isn't hidden behind a menu or hard to find place.</figcaption>
</figure>

## Ensure site search results are relevant

Search should be smart, providing users with the best and most relevant results 
so they don't have to swipe through multiple pages of results. Make life easier 
for users with smart-search features like autocomplete, corrected misspellings 
and suggesting search terms or providing related matches.

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/ss-relevant-bad.png" srcset="images/ss-relevant-bad.png 1x, images/ss-relevant-bad-2x.png 2x" alt="Search returning irrelevant results">
      <figcaption>This site includes results for anything with the word kid in it.</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/ss-relevant-good.png" srcset="images/ss-relevant-good.png 1x, images/ss-relevant-good-2x.png 2x" alt="Site with relevant search results">
      <figcaption>Macy's returns only kids items.</figcaption>
      </figure>
  </div>
</div>

[Participants](/web/fundamentals/principles/research-study.html) didn't 
bother to swipe through multiple pages of search results. Instead, they 
judged a site's search based on the results it returned first, so make sure 
your first page of search results are the strongest. 

## Implement filters to narrow results

Provide easy to use filters to help narrow the search results to more relevant 
results for users.  [Participants](/web/fundamentals/principles/research-study.html) 
relied on filters to narrow down search results, and actually abandoned sites 
that couldn't reduce volume. However, you also need to ensure users don't 
filter themselves into a box - one car dealer site allowed participants to 
specify configurations that didn't actually exist. Help users avoid problems 
by letting them know how many results will be returned with a particular 
filter applied.

<figure>
  <img src="images/ss-filters.jpg" srcset="images/ss-filters.jpg 1x, images/ss-filters-2x.jpg 2x" alt="Make filters accessible.">
  <figcaption>Avoid placing filters in hard to find places.</figcaption>
</figure>

Don't bury the filters at the bottom of the page where users have to scroll to 
the end of the result set before they can begin to filter what they're looking 
for.

## Guide users to better site search results

For sites that serve diverse customer segments, it can be helpful to ask users a 
few questions before they search to ensure they get results from the most 
relevant content segment. 

<figure>
  <img src="images/ss-guide-good.png" srcset="images/ss-guide-good.png 1x, images/ss-guide-good-2x.png 2x" alt="Zappos guides users by asking them what they're looking for.">
  <figcaption>Help users to find what they're looking for by guiding them in the right direction.</figcaption>
</figure>

For example, a large shoe retailer began its mobile searches by having 
participants select the gender and size of shoe they were looking for.

{% endwrap %}

