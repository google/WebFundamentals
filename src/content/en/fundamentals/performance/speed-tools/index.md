project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-08-17 #}
{# wf_published_on: 2018-02-26 #}
{# wf_blink_components: N/A #}

<style>
  img.myth,
  img.role{
    width: 128px;
  }

  h3.myth,
  p.myth,
  h4.role{
    margin: 0;
  }

  h3.myth{
    text-transform: uppercase;
  }

  .download{
    background: #4285f4;
    padding: 20px;
    color: #fff;
    height: auto;
  }

  .download:hover,
  .download:active{
    background: #4285f4;
    color: #fff;
  }

  .tool img{
    display: block;
    margin: 0 auto 20px;
    min-width: 128px;
    max-width: 33.33%;
  }

  .tool img{
    margin-bottom: 0;
    max-width: 25%;
    min-width: 112;
  }

  .tool{
    text-align: center;
    margin: 0 0 20px;
  }

  @media screen and (min-width: 576px){
    .tools{
      display: flex;
      align-items: stretch;
      flex-flow: row wrap;
      justify-content: center;
    }

    .tool{
      width: 50%;
    }

    .tool > p{
      padding: 0 10px;
    }
  }

  @media screen and (min-width: 721px){
    .tools{
      display: block;
    }

    .tool{
      width: 100%;
    }

    .tool > p{
      padding: 0;
    }
  }

  @media screen and (min-width: 800px){
    .tools{
      display: flex;
    }

    .tool{
      width: 50%;
    }

    .tool > p{ padding: 0 10px; } } </style>

# How To Think About Speed Tools {: .page-title }

<div class="clearfix"></div>

Google has put out a lot of guidance around performance data and performance
tooling. The goal of this infographic is to consolidate this guidance for
developers and marketers to help them understand how to think about performance
and navigate all of Google's performance tool offerings.

<a class="button download gc-analytics-event"
href="pdf/Infographic-How_To_Think_About_Speed_Tools.pdf" data-category="webFu"
data-label="speed-scorecard" target="_blank">Download the PDF version</a>

## Common myths about performance

![A piece of paper with a line graph
on it.](images/line-graph.svg){: .attempt-left .myth }

### Myth 1 {: .myth }

**User experience can be captured with a single metric.**<br>
Good user experience is not captured by a single point in time. It's composed of
a series of key milestones in your users' journey. Understand the different
metrics and track the ones that are important to your users' experience.
{: .myth }

<div class="clearfix"></div>

![A collection of network iconography representing different devices and network
conditions.](images/network-icons.svg){: .attempt-left .myth }

### Myth 2 {: .myth }

**User experience can be captured with a single “representative user.”**<br>
Real-world performance is highly variable due to differences in users’ devices,
network connections, and other factors. Calibrate your lab and development
environment to test a variety of such different conditions. Use field data to
inform selection of test parameters for device type (i.e., mobile vs. desktop),
network connections (i.e., 3G or 4G), and other key variables.
{: .myth }

<div class="clearfix"></div>

![An assortment of depictions of different
kinds of users.](images/users.svg){: .attempt-left .myth }

### Myth 3 {: .myth }

**My website loads fast for me, so it should load fast for my users.**<br>
The devices and networks that developers test load performance on are often much
faster than what your users actually experience. Use field data to understand
what devices and networks your users are on and appropriately mirror those
conditions when you test performance.
{: .myth }

## Understanding lab vs. field data

### Lab data

![A depiction of a man standing in front of
a bunch of abstract technical concepts
and icons.](images/tech.svg){: .attempt-right }

Lab data is performance data collected within a controlled environment with
predefined device and network settings. This offers reproducible results and
debugging capabilities to help identify, isolate, and fix performance issues.

#### Strengths {: .compare-better }

- Helpful for debugging performance issues
- End-to-end and deep visibility into the UX
- Reproducible testing and debugging environment

#### Limitations {: .compare-worse }

- Might not capture real-world bottlenecks
- Cannot correlate against real-world page KPIs

Note: Tools like [Lighthouse](/web/tools/lighthouse/) and
[WebPageTest](https://www.webpagetest.org/) collect this type of data.

### Field data

![A depiction of people in a public setting using mobile
devices.](images/on-the-street.svg){: .attempt-right }

(Also called Real User Monitoring or RUM)<br>
Field data is performance data collected from real page loads your users are
experiencing in the wild.

#### Strengths {: .compare-better }

- Captures true real-world user experience
- Enables correlation to business key performance indicators

#### Limitations {: .compare-worse }

- Restricted set of metrics
- Limited debugging capabilities

Note: Public data sets like [Chrome User Experience
Report](/web/tools/chrome-user-experience-report/) and performance tools like
[PageSpeed Insights](/speed/pagespeed/insights/) speed score report this type of
data.

## What are the different performance tools?

<div class="tools">
  <div class="tool">
    <a href="/web/tools/lighthouse/"><img src="images/tool-lighthouse.svg" alt="Lighthouse"></a>
    <h3><a href="/web/tools/lighthouse/">Lighthouse</a></h3>
    <p>Gives you personalized advice on how to improve your website across performance,
accessibility, PWA, SEO, and other best practices.</p>
  </div>
  <div class="tool">
    <a href="https://www.webpagetest.org/"><img src="images/tool-webpagetest.svg"
alt="WebPageTest"></a>
    <h3><a href="https://www.webpagetest.org/">WebPageTest</a></h3>
    <p>Allows you to compare performance of one or more pages in controlled lab
environment, and deep dive into performance stats and test performance on a real
device. You can also run Lighthouse on WebPageTest.</p>
  </div>
  <div class="tool">
    <a href="https://testmysite.thinkwithgoogle.com/"><img
src="images/tool-testmysite.svg" alt="TestMySite"></a>
    <h3><a href="https://testmysite.thinkwithgoogle.com/">TestMySite</a></h3>
    <p>Allows you to diagnose webpage performance across devices and provides a
list of fixes for improving the experience from Webpagetest and PageSpeed
Insights.</p>
  </div>
  <div class="tool">
    <a href="/speed/pagespeed/insights/"><img src="images/tool-psi.svg"
alt="PageSpeed Insights"></a>
    <h3><a href="/speed/pagespeed/insights/">PageSpeed Insights</a></h3>
    <p>Shows speed field data for your site, alongside suggestions for common
optimizations to improve it.</p>
  </div>
  <div class="tool">
    <a href="https://www.thinkwithgoogle.com/feature/mobile/"><img
src="images/tool-speed-scorecard.svg" alt="Speed Scorecard"></a>
    <h3><a href="https://www.thinkwithgoogle.com/feature/mobile/">Speed Scorecard</a></h3>
    <p>Allows you to compare your mobile site speed against your peers in over 10
countries. Mobile site speed is based on real-world data from the Chrome
User Experience Report.</p>
  </div>
  <div class="tool">
    <a href="https://www.thinkwithgoogle.com/feature/mobile/"><img
src="images/tool-impact-calculator.svg" alt="Impact Calculator"></a>
    <h3><a href="https://www.thinkwithgoogle.com/feature/mobile/">Impact Calculator</a></h3>
    <p>Allows you to estimate the potential revenue opportunity of improving your
mobile site speed, based on benchmark data from Google Analytics.</p>
  </div>
  <div class="tool">
    <a href="/web/tools/chrome-devtools/"><img src="images/tool-devtools.svg"
alt="Chrome Developer Tools"></a>
    <h3><a href="/web/tools/chrome-devtools/">Chrome Developer Tools</a></h3>
    <p>Allows you to profile the runtime of a page, as well as identify and debug
performance bottlenecks.</p>
  </div>
</div>

## So you're a...

![Icon of a book showing
charts and graphs.](images/icon-business.svg){: .attempt-right .role }

**Marketer or developer trying to build a business case for improving user
experience of your website. You speak dollars and cents and are looking for
monetary figures that can help you quantify the opportunity cost and expected
lift.**

- Use the **[Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/)**
to see how your mobile site speed compares against your  peers in more than 10
countries. Scores are based on real-world data from Chrome User Experience
Report.
- Use the **[Impact Calculator](https://www.thinkwithgoogle.com/feature/mobile/)**
to estimate the potential revenue opportunity of improving your mobile site
speed. Impact is driven by benchmark data from Google Analytics.
- Use **[TestMySite](https://testmysite.thinkwithgoogle.com/)** to test your
page’s mobile loading time alongside industry benchmarks and to learn how simple
fixes can speed up your site and decrease visitor loss; TestMySite is currently
powered by WebPageTest and PageSpeed Insights.

<div class="clearfix"></div>

![Icon of a laptop with the Chrome logo behind and slightly above
it.](images/icon-dev.svg){: .attempt-right .role }

**Developer trying to understand current performance of your site, as
experienced by real-world Chrome users, and looking for audit recommendations
against top industry trends and guidelines.**

**[PageSpeed Insights](/speed/pagespeed/insights/)** helps you understand the
real-world performance of your site, as experienced by Chrome users, and
recommends optimization opportunities.

<div class="clearfix"></div>

![Icon of a Lighthouse audit
result page.](images/icon-audit.svg){: .attempt-right .role }

**Developer trying to understand and audit a website against modern web
performance best practices.**

**[Lighthouse](/web/tools/lighthouse/)** contains a comprehensive set of
performance opportunities; it provides you with a list of performance
opportunities missing from your page and the time saved by implementing each
optimization, which can help you understand what you should do.

<div class="clearfix"></div>

![Icon of a magnifying glass
over a bug.](images/icon-debug.svg){: .attempt-right .role }

**Developer looking for technical guidance on how to debug/deep dive into the
performance of your site.**

**[Chrome Developer Tools](/web/tools/chrome-devtools/)** (CDT) contains a
Performance Panel that allows you to drill down into performance issues with
your site by profiling your site with customized configurations, allowing you
to track down performance bottlenecks. You can use CDT on either production or
development versions of a website.

**[WebPageTest](https://www.webpagetest.org/)** contains an advanced suite of
metrics and trace viewers. It enables deep diving into the performance of your
site on real mobile hardware with network conditions.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
