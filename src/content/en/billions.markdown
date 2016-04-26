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
  position: relative;
  top: 7px;
}
.wf-landing-section {
    padding-top: 20px;
}
.wf-landing-section:nth-child(even) {
    background-color: #eee;
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
      <a href="http://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/mobile-white-paper-c11-520862.html" title="Cisco Visual Networking Index: Global Mobile Data Traffic Forecast Update, 2015–2020"><img src="/web/imgs/billions/2g.jpg" alt="CISCO chart showing projections for 2G, 3G and 4G connectivity"></a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Design for variable connectivity</h3>
      <p>Low bandwidth and intermittent connectivity are the norm for many people accessing the web. <a href="http://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/mobile-white-paper-c11-520862.html" title="Cisco Visual Networking Index: Global Mobile Data Traffic Forecast Update, 2015–2020">Most people online still have 2G connections</a> or "3G" that downgrades to 2G — by 2020, more than 10% of users will still be on 2G. Many smartphones are used offline, and users regularly turn on airplane mode to avoid data consumption.</p>
      <ul>
        <li><a href="https://docs.google.com/document/d/1IoethlCWzjTKY1A1JIMNl7KI8mBtOvpQ4TkhU9FhDUU/edit#heading=h.kdb8454jukab">Test with emulated low bandwidth and high latency</a></li>
        <li><a href="https://docs.google.com/document/d/1fyZ3EORcvx6HWZ9UAK1_YHSuou9BjwP5BY9_H81CSlA/edit#">Handle unreliable connectivity and "lie-fi"</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/your-first-offline-web-app/">Design for offline</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads">Reduce the number of resource requests</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer">Make installs and updates as small and fast as possible</a></li>
        <li><a href=".">Reduce page load failures caused by connectivity problems</a></li>
      </ul>
    </div>
  </div>
</div>


<!-- item 2 -->
<div class="wf-landing-section wf-landing-gmp">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
      <h3>Reduce data cost</h3>
      <p>High data cost is often a greater barrier to access than poor connectivity. Mobile users are cost-conscious; even "unlimited" plans can become expensive when roaming or if unexpected fees are applied. Many mobile users are extremely cost conscious, with good reason: for example, a 500MB data plan in India costs the same as <a href="https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/" title="jana.com report: affordable smartphones, expensive data">17 hours of minimum wage work</a>.</p>
      <ul>
        <li><a href="https://docs.google.com/document/d/1eTIGzoiX-14xpD120p4AibbK46dq3J9pOMCW4oyiovM/edit#">Understand the cost of loading page and app components</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/">Reduce the amount of data retrieval required for user interaction</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/site-and-page-navigation">Streamline navigation: help users get to what they want</a></li>
        <li><a href=".">Prioritize content loading</a></li>
        <li><a href=".">Minimize data upload requirements</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <a href="https://blog.jana.com/2015/01/26/the-data-trap/" title="Jana Blog: The data trap"><img src="/web/imgs/billions/cost.jpg" alt="Histogram showing the numbers of hours of minimum wage work to pay for a 500MB mobile data plan"></a>
    </div>
  </div>
</div>

<!-- item 3 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <a href="http://www.folkecenter.net/gb/news/world/wabutungulu/" title="Solar Installation in Wabutungulu, Uganda"><img src="/web/imgs/billions/power.jpg" alt="A number of feature phones connnected to multiple power sockets in Wabutungulu, Uganda"></a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Reduce battery consumption</h3>
      <p>Many people — even those in urban areas — don't always have access to a reliable, consistently available, affordable power supply. This makes power conservation a critical factor in all app and content design.</p>
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
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
      <h3>Optimize for device capability</h3>
      <p>Low spec is the norm. Globally, most new internet users have low-cost devices with basic hardware: single-core processors, 4" screens, limited memory, and limited storage.</p>
      <ul>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/your-first-multi-screen-site/">Cater for a range of viewports and devices</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/">Design for limited memory and CPU: reduce and optimize JavaScript, images, and media</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/performance/">Design for limited storage</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/devices.jpg" alt="Nexus 6P phone next to smaller Samsung phone"></a>
    </div>
  </div>
</div>

<!-- item 5 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <a href="https://flipkart.com" title="Flipkart: India's largest e-commerce site"><img src="/web/imgs/billions/checkout.jpg" alt="flipkart.com checkout screen, showing Cash On Delivery and Net Banking options"></a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Transactions &amp; monetization: think global</h3>
      <p>Payment systems are inaccessible for many people on the web. Many users globally <a href="http://datatopics.worldbank.org/financialinclusion/country/india" title="World Bank report for India">don't have bank accounts and don't use credit cards</a> — <a href="https://www.economist.com/news/united-states/21663262-why-low-income-americans-often-have-pay-more-its-expensive-be-poor" title="Economist article about poverty in the US"> including 8% of US households</a>. Many payment systems don't work well on small viewports or with unreliable connectivity.</p>
      <ul>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/commerce-and-conversion">Streamline transactions</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/design-and-ui/input/forms/">Streamline forms</a></li>
        <li><a href="https://developers.google.com/web/fundamentals/getting-started/principles/usability-and-form-factor">Design orientation-friendly layouts for small-screen devices</a></li>
        <li><a href=".">Make transactions resilient to poor connectivity</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- item 6 -->
<div class="wf-landing-section wf-landing-gmp">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
      <h3>Build multi-device content</h3>
      <p>Large-layout, graphics-heavy content frustrates users and discourages them from using your app or site. Content that is too wide or too tall is overlooked by some users and deliberately avoided by others — and excess content adds page weight and data cost.</p>
      <ul>
        <li><a href=".">Design content to work well across different viewport sizes</a></li>
        <li><a href=".">Eliminate redundant images and other unnecessary content</a></li>
        <li><a href=".">Embrace minimalist writing</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/billions/multi.jpg" alt="Phone, tablet and desktop displays showing responsive design">
    </div>
  </div>
</div>

<!-- item 7 -->
<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <a href="https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers#Charts_and_graphs" title="Wikipedia list of languages by number of native speakers, graphic by User:Jroehl"><img src="/web/imgs/billions/localization.jpg" alt="Wikipedia chart showing the most common languages as different size circles"></a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Plan for localization</h3>
      <p>Localization can help you access new markets. Many websites are only published in English, but English is not the first language of most people online. Only <a href="https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers" title="Wikipedia list of languages by number of native speakers, graphic by User:Jroehl">5.52% of the world's population are native English speakers</a> and US or European cultural conventions may not be familiar or intuitive. Instructions or prompts that are succinct and compact in English may be verbose and obtrusive in other languages.</p>
      <ul>
        <li><a href="https://support.google.com/webmasters/answer/182192">Architect your site to enable localization</a></li>
        <li><a href=".">Store text in string tables</a></li>
        <li><a href=".">Use "plain English" (e.g., ASD-STE) language construction</a></li>
        <li><a href=".">Avoid slang, technical terms, and acronyms</a></li>
        <li><a href=".">Be aware of cultural issues such as colors, icons, and gestures</a></li>
        <li><a href=".">Minimize use of font variants that may not render well in non-European fonts</a></li>
      </ul>
    </div>
  </div>
</div>
