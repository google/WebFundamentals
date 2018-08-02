project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Auditing your site or app will help you build a resilient, performant experience — and highlight quick wins that can be implemented with minimal sign-off. An audit also gives you a baseline for data-driven development. Did a change make things better? How does your site compare with competitors?  You get metrics to prioritize effort, and concrete evidence to brag about once you've made improvements.

{# wf_updated_on: 2018-08-03 #}
{# wf_published_on: 2018-08-03 #}
{# wf_blink_components: N/A #}

# Auditing Performance {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## Why and what?

You've probably heard about all the good things that Progressive Web App techniques can do for your
site. You might feel tempted to jump straight in and add PWA features. That's possible, but you'll
be much better off if you get 'PWA-ready' first.

No amount of PWA magic will fix problems such as blocking JavaScript or bloated images. PWAs need a
solid foundation.

So how do you check the health of your website? The first step is to do a site audit: an objective
review of what works well and where (and how) there could be improvement.

Auditing your site or app will help you build a resilient, performant experience — and highlight
quick wins that can be implemented with minimal sign-off. An audit also gives you a baseline for
data-driven development. Did a change make things better? How does your site compare with
competitors? You get metrics to prioritize effort, and concrete evidence to brag about once you've
made improvements.

## If you only have 5 minutes...

Run [Lighthouse](/web/tools/lighthouse/) on your homepage and [save the
report data](/web/tools/lighthouse#gists). You get a quantified
baseline and a todo list for improvements to performance, accessibility, security and SEO.

## If you only have 30 minutes...

[Lighthouse](/web/tools/lighthouse/) is probably still the best place
[to start, but with a little more time you can also record results from other tools. Make sure to
[load your site as a first-time user would see it, by using an Incognito (Private) Window:

* [Chrome DevTools Security panel](/web/tools/chrome-devtools/security): HTTPS usage.
* [Chrome DevTools Network
Panel](/web/tools/chrome-devtools/network-performance/): load timings;
resource sizes and number of requests for HTML, CSS, JavaScript, images, fonts and other files.
* Chrome Task Manager: if your site constantly uses significant CPU or more memory than other apps
then you may need to fix memory leaks, task running or resource loading problems. Make sure to test
your site on devices representative of your users.
* [WebPagetest](https://www.webpagetest.org/easy){: .external}: performance for different locations
and connection types, caching, time to first byte, CDN usage.
* [Pagespeed
Insights](/speed/pagespeed/insights/): load performance, data cost and
resource usage, including Chrome User Experience report data highlighting real-world performance
statistics.
* [Speed Scorecard and Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/){: .external}: compare site speed
against peers and estimate the potential revenue opportunity of improving site speed.

Nothing beats real world testing — try out your site with the same devices and connectivity as your
users and keep a record of your subjective experience. <br><br>

<div class="note">
  <strong>If the range of tools is bewildering, take a look at our guide:
    <a href="https://developers.google.com/web/fundamentals/performance/speed-tools/">How To Think
    About Speed Tools</a>.</strong><br>
  <br>
  If nothing else, use <a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a>
  to check for:<br>
  <ul>
    <li>HTTPS:
      <a href="https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https">every
      site should deliver all assets over HTTPS</a>.</li>
    <li>Server settings: your web server or CDN should
      <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer">use
      compression correctly</a>, <a href="https://developers.google.com/web/fundamentals/performance/http2/">use HTTP/2</a>,
      and <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching">include
      appropriate headers</a> to enable your browser to cache resources.</li>
    <li>Script elements that can be moved to the bottom of the page and/or given an <a href="http://peter.sh/experiments/asynchronous-and-deferred-javascript-execution-explained/">async or defer</a> attribute.</li>
    <li>JavaScript and libraries that can be removed.</li>
    <li><a href="https://umaar.com/dev-tips/121-css-coverage/">Unused CSS</a> and
      <a href="https://developers.google.com/web/updates/2017/04/devtools-release-notes">unused JavaScript</a>.</li>
    <li>Images that can be saved with higher compression or smaller pixel dimensions.</li>
    <li>Image files that would be smaller saved using a different format.<br>
    </li>
  </ul>
</div>

## Audience, stakeholders, context

Priorities for refactoring depend on your audience, content and functionality. Who visits your site?
Why and how do they use it? What's your
[performance budget](http://www.performancebudget.io/){:.external}? If you're not sure of the answer
to these questions, try the requirements gathering exercises from our PWA training resources:
[Your audience, your content](https://docs.google.com/presentation/d/1-UjSS-kRZgE0q77zPBkgjg2-huXF2GobzhSqwI0AdU8/edit#slide=id.g16e897f04a_0_14){: .external} and [Design for all your users](https://docs.google.com/presentation/d/14CaiTF3f-OFoWs84lXeurE95_LJIFJwC-xhMky62dAg/edit#slide=id.g16ea125a27_0_6){: .external}.

Who are your stakeholders, and what are their priorities? This will affect the way you structure,
present and share your audit data.

If you can't audit your whole site, check page analytics to get an idea of where to focus. High
bounce rates, low time-on-page and unexpected exit pages can be a good indicator of where to begin.
Likewise business metrics such as hosting costs, ad clicks and conversions. Get an overview from
stakeholders of what data matters to them.

## Test, record, fix, repeat

Record the state of your site <strong>before</strong> making any changes, to uncover problems and
set a starting point for improvements or regressions. That gives you data to justify and reward
development effort.

Make sure to test multiple page types within your site — not just the home page. For single page
apps, test different components, routes and UX flows, and not just the first load experience.
