project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-05-17 #}
{# wf_updated_on: 2017-05-17 #}
{# wf_featured_image: /web/showcase/2017/images/twitter/twitter-thumb_2x.jpg #}
{# wf_featured_snippet: The Twitter Lite Progressive Web App combines the best of the modern web and native features to deliver a more robust experience, with explicit goals for instant loading, user engagement and lower data consumption #}
{# wf_tags: casestudy,progressive-web-apps #}
{# wf_region: north-america #}
{# wf_vertical: media #}
{# wf_featured_date: 2017-05-19 #}

# Twitter Lite PWA Significantly Increases Engagement and Reduces Data Usage {: .page-title }

<img src="/web/showcase/2017/images/twitter/twitter-detail_2x.jpg" class="attempt-right">

Twitter is a platform to find out what’s happening in the world. It has 328
million monthly active users around the world who consume, create and share
information. With over 80% of users on mobile, Twitter wanted their mobile web
experience to be faster, more reliable, and more engaging.  The Twitter Lite
Progressive Web App combines the best of the modern web and native features. It
became the default mobile web experience for all users globally in April 2017.
Twitter developed Twitter Lite to deliver a more robust experience, with
explicit goals for instant loading, user engagement and lower data consumption.

* 65% increase in pages per session
* 75% increase in Tweets sent
* 20% decrease in bounce rate

Nicolas Gallagher, the Engineering Lead for Twitter Lite, notes: 
> Twitter Lite is now the fastest, least expensive, and most reliable way
> to use Twitter. The web app rivals the performance of our native apps but
> requires less than 3% of the device storage space compared to Twitter
> for Android.

## Increasing engagement with “Add to Homescreen” prompt and web push notifications

Twitter’s website reaches millions of users, but it’s traditionally been
difficult to re-engage users on the mobile web. After implementing the “Add to
Homescreen” prompt asking users to save Twitter Lite to their homescreens,
Twitter has seen 250,000 unique daily users launch Twitter Lite from the
homescreen 4 times a day on average.

Twitter implemented web push notifications that work the same as those from
native apps and arrive even if the user’s browser is closed. The implementation
is delivering over 10M push notifications a day.


## Lowering data consumption

Twitter Lite uses less data by default, serving smaller media resources and
relying on cached data as much as possible. The PWA also optimizes images to
help reduce data consumption by as much as 70% as users scroll through their
timelines. The
[data saver mode](https://blog.twitter.com/2017/introducing-twitter-lite)
helps users preserve even more mobile data by giving them control over when
Twitter Lite downloads media assets.

Reaching a broad set of users is important for Twitter, including those in
emerging markets where lower download speeds and less powerful mobile devices
are common. Twitter Lite helps reach this audience more effectively by making
Twitter faster and easier to use in low-bandwidth conditions.

Twitter Lite users benefit from data consumption savings; the PWA is only 600KB
over the wire vs. 23.5MB of downloaded data needed to install the native Android
app.



## Nearly instant loading with service worker scripts

First loads for Twitter Lite clock in at under 5 seconds over 3G networks on
most devices, and subsequent loads are nearly instant, even on flaky networks.
The app streams the initial HTML response to the browser, sending instructions
to preload critical resources. Resources are broken up into granular pieces so
that the initial load only requires the resources needed for the visible screen.
A service worker script caches additional resources, enabling fast navigation to
other screens.

Mobile accounts for over 80% of Twitter’s usage, with many Twitter Lite users
reaching the site via 2G or 3G networks. A fast user experience on first load
and subsequent views is essential for enabling users to view and create Tweets
as quickly as possible. Twitter rolled out intelligent loading strategies like
service workers and parts of the [PRPL (Push, Render, Pre-cache and Lazy-
load)](/web/fundamentals/performance/prpl-pattern/) pattern to dramatically
reduce load times for both activities. Repeat visits are nearly instant thanks
to service worker caching of current views, feed updates, notifications,
messages and settings. Twitter Lite users experience a 50% reduction in 99th
percentile time-to-interactive latency and logged in users have a 30% reduction
in average load time.

Twitter adopted an incremental approach to leveraging service workers for
offline and network resilience, starting with a custom offline page presented
whenever a network connection wasn’t available. Next, they transitioned to
offline caching of static resources like CSS, images and JavaScript bundles to
speed up repeat visits. Lastly, they added support for offline caching of their
[application shell](/web/fundamentals/architecture/app-shell). The result:
Twitter Lite boots up in under 3 seconds when a user returns to the PWA, even on
slow mobile devices or networks.
 
### Further Reading {: .hide-from-toc }
* [How we built Twitter Lite](https://blog.twitter.com/2017/how-we-built-twitter-lite)
* [Twitter Lite and high-performance React Progressive Web Apps at scale](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)
