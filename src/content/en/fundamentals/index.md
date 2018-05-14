project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
page_type: landing

{# wf_updated_on: 2017-09-10 #}
{# wf_published_on: 2016-09-27 #}

<style>
  .wf-hot {padding-top: 0 !important;}
  .nope {display:none;}
  .wf-hero ul,
  .devsite-landing-row-item-description-content ul {list-style: none; padding-left: 0}
  .wf-hero > p {font-size: 2em; line-height: 1.2em; margin-top: 0}
</style>

<div class="wf-hero">
  <p>The core foundations of a delightful web experience are...</p>
  <img src="/web/images/hero-2x.png" class="attempt-right">
  <ul>
    <li><span class="compare-yes"></span> <b><a href="#fast">Fast</a></b> - It respond quickly to user
      interactions with silky smooth animations and no janky scrolling.</li>
    <li><span class="compare-yes"></span> <b><a href="#integrated">Integrated</a></b> - The user doesn’t have to
      reach through the browser, it uses the full capabilities of the device
      to create an experience true to the device.</li>
    <li><span class="compare-yes"></span> <b><a href="#reliable">Reliable</a></b> - Load instantly and reliably,
      never showing the downasaur, even in uncertain network conditions.</li>
    <li><span class="compare-yes"></span> <b><a href="#engaging">Engaging</a></b> - Keeps the user coming back
      to the app with beautifully designed experiences that look and feel
      natural.</li>
  </ul>
</div>

<h2 class="nope">Delightful web experiences are...</h2>

<section class="devsite-landing-row devsite-landing-row-2-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-f-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Fast</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Users don’t expect janky scrolling or slow load performance. Making your
            site fast is a process that starts with understanding
            <a href="performance/rail">how RAIL affects the performance</a> of your
            site and how use that to measure and improve your performance. 
          </p>
          <ul>
            <li><span class="compare-yes"></span> <a href="performance/critical-rendering-path/">Critical Rendering Path</a></li>
            <li><span class="compare-yes"></span> <a href="performance/rendering/">Rendering Performance</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="devsite-landing-row-item" id="integrated">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-i-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Integrated</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            User experiences on the web should feel like an integrated part of the
            user's device; instead of having to reach through a browser window, the
            experience should feel true to how the user interacts with the device.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Get a <a href="app-install-banners/">place on the users home screen</a>.</li>
            <li><span class="compare-yes"></span> Simplify payments with the <a href="payments/">Payment Request API</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="devsite-landing-row devsite-landing-row-2-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="reliable">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-r-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Reliable</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Users don’t expect the web to work without a network connect, and often
            don’t even bother to try when it’s a slow or intermittent connection.
            <i>We need to change that perception</i>. The web <b>must</b> be reliable.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Use the <a href="instant-and-offline/offline-cookbook/">Offline Cookbook</a> to improve reliablity.</li>
            <li><span class="compare-yes"></span> What should you consider when <a href="instant-and-offline/offline-ux">designing for slow or intermittent networks?</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="devsite-landing-row-item" id="engaging">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-e-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Engaging</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            An engaging app goes beyond functional, but ensures that the whole
            experience is delightful making it easy for the user to do what they
            need to do. Using features like Web Push, it’s always up to date, and
            Notifications keeps users informed. It uses the right capabilities,
            at the right time, in a beautiful way.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Use <a href="push-notifications/">Web Push &amp; Notifications</a> to re-engage with users.</li>
            <li><span class="compare-yes"></span> Designing <a href="design-and-ux/ux-basics/">beautiful user experiences</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

## What's new?

{% include "web/_shared/latest_show.html" %}

{% include "web/_shared/latest_articles.html" %}


## What's hot?

<section class="wf-hot devsite-landing-row devsite-landing-row-3-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="images/web-comp.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="web-components/">Web Components</a></h3>
        <div class="devsite-landing-row-item-description-content">
          Web Components are a new set of standards which let you create your own HTML elements. You can use them to build anything, from simple UI elements, to entire applications.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="web-components/" class="button button-white">Learn more</a>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="devsite-landing-row-item" id="integrated">
      <figure class="devsite-landing-row-item-image">
        <img src="images/pay-req.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="payments/">Payment Request API</a></h3>
        <div class="devsite-landing-row-item-description-content">
          The Payment Request API is a W3C standard candidate meant to eliminate checkout forms. It  improves the purchase process, provides a more consistent user experience and allows you to easily leverage different payment methods.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="payments/" class="button button-white">Learn more</a>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="images/cred-mgt.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="/web/fundamentals/security/credential-management/">Credential Management API</a></h3>
        <div class="devsite-landing-row-item-description-content">
          The Credential Management API is a standards-based browser API that provides a programmatic interface between the site and the browser for seamless sign-in across devices.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="/web/fundamentals/security/credential-management/" class="button button-white">Learn more</a>
        </div>
      </div>
    </div>
  </div>
</section>
