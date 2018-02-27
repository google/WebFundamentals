project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-02-26 #}
{# wf_published_on: 2018-02-26 #}
{# wf_blink_components: N/A #}

<style>
  .text-and-image{
    margin: 0 0 20px;
  }

  .download{
    background: #4285f4;
    padding: 20px;
    color: #fff;
    display: block;
    height: auto;
  }

  .download:hover,
  .download:active{
    background: #4285f4;
    color: #fff;
  }

  .text-and-image + .text-and-image{
    margin-top: 40px;
  }

  .text-and-image > img,
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

  .image-container{
    padding: 20px 0;
    margin: 0 0 20px;
    background: #4285f4;
  }

  .text-and-image > div{
    margin: 0;
  }

  .text-and-image > div > h3,
  .text-and-image > div > p{
    margin: 0;
  }

  .text-and-image > div > h4{
    margin-top: 0;
  }

  .tool{
    text-align: center;
    margin: 0 0 20px;
  }

  @media screen and (min-width: 576px){
    .text-and-image{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .text-and-image > img{
      width: 128px;
      margin: 0;
    }

    .text-and-image > div{
      width: calc(100% - 144px);
    }

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

    .image-container{
      max-width: 97.5%;
    }
  }

  @media screen and (min-width: 721px){
    .text-and-image{
      display: block;
    }

    .text-and-image > img{
      margin: 0 auto 20px;
      min-width: 128px;
      max-width: 33.33%;
    }

    .text-and-image > div{
      width: auto;
    }

    .tools{
      display: block;
    }

    .tool{
      width: 100%;
    }

    .tool > p{
      padding: 0;
    }

    .image-container{
      max-width: none;
    }
  }

  @media screen and (min-width: 800px){
    .text-and-image{
      display: flex;
    }

    .text-and-image > div{
      width: calc(100% - 144px);
    }

    .text-and-image > img{
      margin: 0;
    }

    .tools{
      display: flex;
    }

    .tool{
      width: 50%;
    }

    .tool > p{
      padding: 0 10px;
    }

    .image-container{
      max-width: 97.5%;
    }
  }
</style>

# How To Think About Speed Tools {: .page-title }

## Common myths about performance

<div class="text-and-image">
  <img src="images/line-graph.svg" alt="A piece of paper with a line graph on it.">
  <div>
    <h3>MYTH 1</h3>
    <p>
      <strong>User experience can be captured with a single metric.</strong><br>
      Good user experience is not captured by a single point in time. It's composed of a series of key milestones in your users' journey. Understand the different metrics and track the ones that are important to your users' experience.
    </p>
  </div>
</div>
<div class="text-and-image">
  <img src="images/network-icons.svg" alt="A collection of network iconography representing different devices and network conditions.">
  <div>
    <h3>MYTH 2</h3>
    <p>
      <strong>User experience can be captured with a single “representative user.”</strong><br>
      Real-world performance is highly variable due to differences in users’ devices, network performance, and other factors. Calibrate your lab and development environment to test a variety of such different conditions. Use field data to inform selection of test parameters for device type (i.e. mobile vs desktop), network connections (i.e. 3G or 4G), and other key variables.
    </p>
  </div>
</div>
<div class="text-and-image">
  <img src="images/users.svg" alt="An assortment of depictions of different kinds of users.">
  <div>
    <h3>MYTH 3</h3>
    <p>
      <strong>My website loads fast for me, so it should load fast for my users.</strong><br>
      The devices and networks that developers test load performance on are often much faster than what your users actually experience. Use field data to understand what form factors and networks your users are on and appropriately mirror those conditions when you test performance.
    </p>
  </div>
</div>

## Understanding lab vs. field data

### Lab data

<img src="images/tech.svg" class="attempt-right" alt="A graphical depiction of several people getting around and interacting in a busy public setting while using mobile devices.">

When performance data is collected within a controlled environment with predefined device and network settings. This offers reproducible results and debugging capabilities to help identify, isolate, and fix performance issues.

#### Strengths

- Helpful for debugging performance issues
- End-to-end and deep visibility into the user experience
- Reproducible testing and debugging environment

#### Limitations

- Might not capture real-world bottlenecks
- Cannot correlate against real-world page KPIs

Note: Tools like [Lighthouse](/web/tools/lighthouse/) and [WebPageTest](https://www.webpagetest.org/) collect this.

### Field data

<img src="images/on-the-street.svg" class="attempt-right" alt="A graphical depiction of several people getting around and interacting in a busy public setting while using mobile devices.">

When you collect performance data from real page loads your users are experiencing in the wild. Also called Real User Monitoring (or RUM).

#### Strengths

- Captures true real-world user experience
- Enables correlation to business key performance indicators

#### Limitations

- Restricted set of metrics
- Limited debugging capabilities

Note: Tools like Speed Scorecard, [Chrome UX Report](/web/tools/chrome-user-experience-report/), and the Page Speed Insights speed score report this.

## What are the different performance tools?

<div class="tools">
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-lighthouse.svg" alt="Lighthouse">
    </div>
    <h3>Lighthouse</h3>
    <p>Gives you personalized advice on how to improve your website across performance, accessibility, PWA, SEO, and other best practices.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-webpagetest.svg" alt="WebPageTest">
    </div>
    <h3>WebPageTest</h3>
    <p>Allows you to compare performance of one or more pages in controlled lab environment, and deep dive into performance stats and test performance on a real device. You can also run Lighthouse on WebPageTest.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-psi.svg" alt="PageSpeed Insights">
    </div>
    <h3>PageSpeed Insights</h3>
    <p>Shows speed field data for your site, alongside suggestions for common optimizations to improve it.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-testmysite.svg" alt="TestMySite">
    </div>
    <h3>TestMySite</h3>
    <p>Allows you to diagnose a webpage’s performance across devices, and provides a list of fixes for improving the experience from Webpagetest and PageSpeed Insights.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-speed-scorecard.svg" alt="Speed Scorecard">
    </div>
    <h3>Speed Scorecard</h3>
    <p>Allows you to compare your mobile site speed against your peers in over 10 countries. Mobile site speed is based on real-world data from the <a href="https://developers.google.com/web/tools/chrome-user-experience-report/">Chrome User Experience Report</a>.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-impact-calculator.svg" alt="Impact Calculator">
    </div>
    <h3>Impact Calculator</h3>
    <p>Allows you to estimate the potential revenue opportunity of improving your mobile site speed, based on benchmark data from Google Analytics.</p>
  </div>
  <div class="tool">
    <div class="image-container">
      <img src="images/tool-devtools.svg" alt="Chrome Developer Tools">
    </div>
    <h3>Chrome Developer Tools</h3>
    <p>Allows you to profile the runtime of a page, identify, and debug performance bottlenecks.</p>
  </div>
</div>

## So you're a...

<div class="text-and-image">
  <img src="images/icon-business.svg" alt="Icon of a book showing charts and graphs.">
  <div>
    <h4>Marketer or developer trying to build a business case for improving user experience of your website. You speak dollars and cents and are looking for monetary figures that can help you quantify the opportunity cost and expected lift.</h4>
    <ul>
      <li>Use the <strong>Speed Scorecard</strong> to see how your mobile site speed compares against your  peers in more than 10 countries. Scores are based on real world data from Chrome User Experience Report.</li>
      <li>Use the <strong>Impact Calculator</strong> to estimate the potential revenue opportunity of improving your mobile site speed. Impact is driven by benchmark data from Google Analytics.</li>
      <li>Use <strong>TestMySite</strong> to test your page’s mobile loading time alongside industry benchmarks and to learn how simple fixes can speed up your site and decrease visitor loss.</li>
    </ul>
  </div>
</div>
<div class="text-and-image">
  <img src="images/icon-dev.svg" alt="Icon of a laptop with the Chrome logo behind and slightly above it.">
  <div>
    <h4>Developer trying to understand current performance of your site, as experienced by real-world Chrome users, and looking for audit recommendations against top
    industry trends and guidelines.</h4>
    <p><strong>PageSpeed Insights</strong> helps you understand the real-world performance of your site, as experienced by Chrome users, and recommends optimization opportunities.</p>
  </div>
</div>
<div class="text-and-image">
  <img src="images/icon-audit.svg" alt="Icon of a Lighthouse audit result page.">
  <div>
    <h4>Developer trying to understand and audit a website against modern web performance best practices.</h4>
    <p><strong>Lighthouse</strong> contains a comprehensive set of performance opportunities; it provides you with a list of performance opportunities missing from your page, and the time saved by implementing each optimization, which can help you understand what you should do.</p>
  </div>
</div>
<div class="text-and-image">
  <img src="images/icon-debug.svg" alt="Icon of a magnifying glass over a bug.">
  <div>
    <h4>Developer looking for technical guidance on how to debug/deep-dive into the performance of your site.</h4>
    <p>Chrome Developer Tools (CDT) contains a Performance Panel that allows you to drill-down into performance issues with your site by profiling your site with customized configurations, allowing you to track down performance bottlenecks. You can use CDT on either production or development versions of a website.</p>
    <p>WebPageTest contains an advanced suite of metrics and trace viewers. It enables deep diving into the performance of your site on real mobile hardware with network conditions.</p>
  </div>
</div>
<p>
  <a class="button download" href="pdf/Infographic_HowToThinkAboutSpeedTools.pdf" target="_blank">Download the PDF version</a>
</p>
