project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-04-20 #}
{# wf_updated_on: 2017-10-06 #}
{# wf_featured_image: /web/showcase/2017/images/voot/voot.png #}
{# wf_featured_snippet: Voot.com launches their media Progressive Web App in India. Within days of implementation, session time per user increased by 39% and daily views per user by 15%. #}
{# wf_tags: media,casestudy #}
{# wf_region: asia #}
{# wf_vertical: media #}
{# wf_featured_date: 2017-04-20 #}

# Progressive Web App at Voot {: .page-title }

<img src="/web/showcase/2017/images/voot/voot.png" class="attempt-right">

### TL;DR {: .hide-from-toc }

Voot.com launches their media Progressive Web App in India. Within days of
implementation, session time per user increased by 39% and daily views per user
by 15%.

#### Results {: .hide-from-toc }

* 80% reduction in page load time  
* 39% increase in session time per user  
* 19% reduction in bounce rate  
* 77% increase in conversion from visitor to video viewer  
* 15% increase in average daily video views per user

## About voot.com

<img src="/web/showcase/2017/images/voot/screen.jpg" class="attempt-right">

Voot is one of India's top video-on-demand products, available as both a native
app and a mobile web app. It offers close to 35,000 hours of premium content
online, including exclusive shows from networks such as Colors and MTV, as well
as Voot Originals and over 8,000 videos for children. Voot is run by Viacom18, a
joint venture between Viacom and Network18 Group.

## Challenge

Mobile devices are a primary form of media consumption in India. Such devices
often have limited storage for native apps, making the mobile web a critical
part of the Voot product strategy.

Most mobile Voot users access the Internet via metered 2G and 3G networks. Data
transfer is expensive, and while users become highly committed to a video once
it starts playing, slow load times lead to users giving up before the experience
can even start. To address that challenge and increase mobile web usage, Voot
looked to enhance their site with Progressive Web App features.

## Solution

To improve the overall user experience, Voot.com turned their site into a
Progressive Web App, using features such as Add to Homescreen and a service
worker.

While 4G services have recently launched, most users in India
reach the Internet via 2G and 3G networks, with slow and sometimes
expensive data transfer rates. To reduce the data being transferred, Voot.com
optimized their images specifically for mobile, and the
site now dynamically serves either JPEG or WebP images depending upon browser
capabilities.

Voot.com also decreased load times by adding a service worker to preload images
as the user navigates, and to cache images for repeat visits. The site was also
analyzed with [Lighthouse](/web/tools/lighthouse/) to gain performance insights,
which in turn allowed a reduction in JavaScript and CSS overhead and the
implementation of synchronous server calls.

These optimizations resulted in a 63% reduction in first-view page load data
transfer and an 86% reduction in data transfer for returning visitors. Page
loads became 5 times faster for first-time visitors, and almost 7 times faster
for returning users.

To offer a true app-like experience, Voot.com also implemented
[add to home screen](/web/fundamentals/app-install-banners),
allowing users to launch the page from their home screen like a native app. This
combined with a streamlined login process allows users to quickly and easily
re-engage with the site and watch their favorite shows.

Voot launched its new UI first on mobile web, ahead of desktop web and native
app. Within days of launch, the improvements translated to a 19% reduction in
user abandonment and a 77% increase in conversion from visitor to video viewer.
Users also showed higher levels of engagement, with a 39% increase in average
user session time and a 15% increase in average daily video views per user.
These user engagement metrics show Voot.com performing similarly to the native
app, without requiring the user to install anything.

“We have moved the needle very significantly when it comes to user experience
on the Mobile Web by adopting PWA” says Rajneel Kumar, SVP - Head of Product
and Technology for OTT and Digital Ventures at Viacom18. “All the time and
effort we’ve spent on technology and UI changes as well as optimizations seem
to be showing very positive results. We are going to continue to refine this
further and we are confident that we will continue to see significant consumer
lift.”

