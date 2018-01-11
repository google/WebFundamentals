project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-09-27 #}
{# wf_updated_on: 2017-09-27 #}
{# wf_featured_image: /web/showcase/2017/images/eleme/logo.jpg #}
{# wf_featured_snippet: Ele.me is the biggest food ordering and delivery company in mainland China. They built their Progressive Web App (PWA) as a multi-page app to improve its mobile web experience, making it faster and more reliable in flaky connections, while accommodating their operational needs to best serve their customers. #}
{# wf_tags: casestudy,progressive-web-apps #}
{# wf_region: asia #}
{# wf_vertical: retail #}
{# wf_featured_date: 2017-09-27 #}

# Ele.me improves performance load times with a multi-page Progressive Web App {: .page-title }

[Ele.me](https://ele.me) is the biggest food ordering and delivery company
in mainland China. It serves 260 million registered users from over 200
cities all around China, and has over 1.3 million restaurant listings.
With 99% of its users ordering food on mobile, Ele.me set out to improve its
mobile web experience, making it faster and more reliable in flaky connections,
all while relying on the core technical model of a multi-page app to
accommodate their operational needs.

* Loading time decreased by 11.6% across all pre-cached pages
* Loading time decreased on average by 6.35% across all pages.
* Time-to-consistently-interactive dropped to 4.93 seconds on a 3G network on
  first load

> After we released the ele.me PWA, our loading times have dropped
> significantly, transforming our mobile web experience into one of the
> fastest food reservation sites in China.
>> Spencer Yang, Product Manager of Ele.me PWA

## Choosing between multi-page app and single page app

In a multi-page app (MPA), every route that a user navigates to triggers
a full request of the page, along with associated scripts and styles needed,
to the server. This is in contrast to a single-page app (SPA) model, where
every route navigation triggers a fetch just for the content and data
relevant to that route, and the UI is then constructed by Javascript code
running on the client app.

The explosive growth of Ele.me in recent years has led to the growth of
distinct business units within the company, each in charge of running its
micro-service under the main [https://ele.me](https://ele.me) domain. The
Ele.me team concluded that the decoupling of these individual services is
best served by a multi-page app (MPA) model, with each team running and
maintaining its own service.

## Applying PRPL to a MPA

The [PRPL pattern](/web/fundamentals/performance/prpl-pattern/) (**Preload**
critical resources, **Render** initial route, **Pre-cache** remaining routes,
**Lazy-load** remaining routes) provides web developers with a set of rails to
guide the structure of a PWA, with a particular emphasis on a quick time to
interactivity and maximizing caching to reduce network round trips. While PRPL
has been well-tested on SPAs, it was less clear how one would actually apply it
on a MPA. Ele.me decided to take on the PRPL mindset when thinking about a
rebuild of their MPA as a PWA. To do that, they make sure that when a user
navigates to a page, that they are **preloading** critical resources for that
page by including `<link rel="preload">` as needed, or surfacing those scripts
at a sufficiently shallow level so that the browser’s preloader can do its work
without needing additional hints. They also progressively enhance their PWA by
installing a service worker whenever it is supported by the browser, which they
then use to fetch and **pre-cache** other top-level navigation routes so that
the user gets a faster loading and rendering experience as they click around the
PWA. Each page in a MPA is its own route, so speeding up the **rendering of the
initial route** is equivalent to implementing best practices to optimize the
critical rendering path for each route. With these changes, the overall loading
time decreased on average by 6.35% across all pages.

## Serving the transition skeleton screens ASAP

Ele.me wanted to apply the idea of
[skeleton screens](https://medium.com/@owencm/reactive-web-design-the-secret-to-building-web-apps-that-feel-amazing-b5cbfe9b7c50)
into the UX, which is a way to ensure that whenever the user taps any button
or link, the page reacts as soon as possible by transitioning the user to that
new page, and then loading in content to that page as the content becomes
available; this is also the key to improving the perceived performance of
the PWA. However, since each page in a MPA is its own initial route, each
navigation requires redoing all the necessary loading, parsing, and evaluation
work every single time.

To work around this, Ele.me built the skeleton screen as an actual UI
component, and then used Vue.js’ Server Side Rendering stack to build and
then pre-render the Vue components to strings before injecting them into
HTML templates. This allows them to render the skeleton screen directly and
achieve a more fluid transition when navigating between pages.

<figure class="attempt-left">
  <img src="images/eleme/skeleton.png" alt="Skeleton screen during page transition">
  <figcaption>Skeleton screen during page transition</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/eleme/rendered.png" alt="Page fully rendered after page transition">
  <figcaption>Page fully rendered after page transition</figcaption>
</figure>


<div class="clearfix"></div>

## Caching shared resources with service worker

Different routes are loaded as a user browses around the PWA, and it would be a
waste to load these routes from the network over and over again. To tackle this,
Ele.me analyzed the critical routes that users care about most, created a
webpack plugin to collect the dependencies of these critical routes, and then
precached these routes when they install a service worker on the user’s client
browser. These critical routes include the Javascript, CSS, and images that form
the typical UI shell of the PWA.

Routes that are considered important, but not critical, are incrementally cached
by the service worker at runtime instead as the user continues to navigate
through the PWA. This allows Ele.me to serve the PWA to users directly from
cache under all network conditions. The result: loading time decreased by 11.6%
across all pre-cached pages.


## Further reading

* [Upgrading Ele.me to a Progressive Web App](https://medium.com/elemefe/upgrading-ele-me-to-progressive-web-app-2a446832e509)
* [Building a PWA at Ele.me](https://zhuanlan.zhihu.com/p/25800461) (Chinese)
