---
layout: shared/wide
title: "Building for Billions"
authors:
- samdutton
description: "Building Web Apps for the Next Billion Users"
published: false
translation_priority: 0
---

<style>
  .mdl-cell h3 {
    margin-top: 0;
  }
  .mdl-cell img {
    padding-bottom: 30px;
    position: relative;
    top: 7px;
  }
  .wf-landing-section:nth-child(even) {
    background-color: #eee;
    padding-top: 20px;
  }
</style>

<div class="wf-subheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--9-col wf-showcase__title">
      <h2>Building Web Apps for the Next Billion Users</h2>
      <p><strong>The next billion people coming online will be diverse in every respect: their physical location, cultural experience, computer expertise, connectivity access, and the kinds of devices they use.</strong></p>
      <p><strong>They will virtually all be mobile users.</strong></p>
      <p>This presents unique challenges for web developers who must abandon the limited <em>mobile first</em> approach in favor of a comprehensive <em>mobile only</em> strategy.</p>
      <p>You can address these challenges by focusing on specific areas.</p>
    </div>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<!-- item 1 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/connectivity.png" alt="Icon: connectivity">
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Design for seamless connectivity</h3>
      <p>Low bandwidth and intermittent connectivity are the norm for many people accessing the web. <a href="http://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/mobile-white-paper-c11-520862.html" title="Cisco Visual Networking Index: Global Mobile Data Traffic Forecast Update, 2015–2020">Most people online still have 2G connections</a> or "3G" that downgrades to 2G. Even by 2020, more than 10% of users will still be on 2G. Many smartphones are used offline, and users regularly turn on airplane mode to avoid data consumption.</p>
      <ul>
        <li><a href="/web/fundamentals/performance/poor-connectivity/testing">Test with emulated low bandwidth and high latency</a></li>
        <li><a href="/web/fundamentals/performance/poor-connectivity/lie-fi">Handle unreliable connectivity and "lie-fi"</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/your-first-offline-web-app/">Design for offline</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads">Reduce the number of resource requests</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer">Make installs and updates as small and fast as possible</a></li>
      </ul>
    </div>
  </div>
</div>


<!-- item 2 -->
<div class="wf-landing-section wf-landing-gmp">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Conserve data usage</h3>
      <p>High data cost is often a greater barrier to access than poor connectivity. Mobile users are cost-conscious; even "unlimited" plans can become expensive when roaming or if unexpected fees are applied. Many mobile users are extremely cost conscious, with good reason: for example, a 500MB data plan in India costs the same as <a href="https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/" title="jana.com report: affordable smartphones, expensive data">17 hours of minimum wage work</a>.</p>
      <ul>
        <li><a href="/web/fundamentals/design-and-ui/content/weight">Understand the cost of loading page and app components</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/">Reduce the amount of data required for interaction</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/site-and-page-navigation">Streamline navigation: help users get to what they want</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en">Prioritize content display</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/cost.png" alt="Icon: data cost">
    </div>
  </div>
</div>

<!-- item 3 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/consumption.png" alt="Icon: battery consumption">
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Reduce battery consumption</h3>
      <p>Many people, even in urban areas, don't have access to a reliable and affordable power supply. This makes power conservation a critical factor in all app and content design.</p>
      <ul>
        <li><a href="https://developers.google.com/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime">Avoid repaints, reflows, and required reorientations</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/design-and-ui/animations/#avoid-animating-expensive-properties">Avoid expensive UI animations</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads">Avoid radio usage: eliminate unnecessary downloads</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/">Reduce user actions required to access content</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/design-and-ui/animations/animations-and-performance">Use hardware acceleration</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- item 4 -->
<div class="wf-landing-section wf-landing-gmp">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Optimize for device capability</h3>
      <p>Low spec is the norm. Globally, most new internet users have low-cost devices with basic hardware: single-core processors, 4" screens, limited memory, and limited storage.</p>
      <ul>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/your-first-multi-screen-site/">Cater for a range of viewports and devices</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/">Design for limited memory and CPU: reduce and optimize</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/capability.png" alt="Icon: optimize for devices">
    </div>
  </div>
</div>

<!-- item 5 -->
<div class="wf-landing-section wf-landing-gmp">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/content.png" alt="Icon: right content for the right context">
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Build multi-device content</h3>
      <p>Large-layout, graphics-heavy content frustrates users and discourages them from using your app or site. Content that is too wide or too tall is overlooked by some users and deliberately avoided by others — and excess content adds page weight and data cost.</p>
      <ul>
        <li><a href="/web/fundamentals/design-and-ui/content/viewport">Design content to work well across different viewport sizes</a></li>
        <li><a href="/web/fundamentals/design-and-ui/content/redundant">Eliminate redundant content</a></li>
        <li><a href="/web/fundamentals/design-and-ui/content/write">Write for mobile</a></li>
        <li><a href="https://www.ampproject.org/">Consider AMP HTML</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- item 6 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Transactions &amp; monetization: think global</h3>
      <p>Payment systems are inaccessible for many people on the web. Many users globally <a href="http://datatopics.worldbank.org/financialinclusion/country/india" title="World Bank report for India">don't have bank accounts and don't use credit cards</a> — <a href="https://www.economist.com/news/united-states/21663262-why-low-income-americans-often-have-pay-more-its-expensive-be-poor" title="Economist article about poverty in the US"> including 8% of US households</a>. Many payment systems don't work well on small viewports or with unreliable connectivity.</p>
      <ul>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/commerce-and-conversion">Streamline transactions</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/design-and-ui/input/forms/">Streamline forms</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/usability-and-form-factor">Design orientation-friendly layouts for small screens</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/monetization.png" alt="Icon: shopping trolley">
    </div>
  </div>
</div>

<!-- item 7 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/localization.png" alt="Icon: globe">
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Plan for localization</h3>
      <p>Localization can help you access new markets. Many websites are only published in English, but English is not the first language of most people online. Only <a href="https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers" title="Wikipedia list of languages by number of native speakers, graphic by User:Jroehl">5.52% of the world's population are native English speakers</a> and US or European cultural conventions may not be familiar or intuitive. Instructions or prompts that are succinct and compact in English may be verbose and obtrusive in other languages.</p>
      <ul>
        <li><a href="https://support.google.com/webmasters/answer/182192">Architect your site to enable localization</a></li>
      </ul>
    </div>
  </div>
</div>
