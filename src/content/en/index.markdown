---
layout: shared/root
description: "Web Landing"
title: "Web @ Google Developers"
---
{% for section in page.context.subdirectories %}
  {% if section.id == 'fundamentals' %}
    {% assign fundamentals = section %}
  {% elsif section.id == 'tools' %}
    {% assign tools = section %}
  {% elsif section.id == 'updates' %}
    {% assign updates = section %}
  {% endif %}
{% endfor %}

<div class="wf-subheading" hidden>
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--12-col wf-showcase__title">
      <h2>Next Generation Web</h2>
      <p class="mdl-typography--font-light">
        The average user visits 100+ sites per month on the mobile web - 
        will yours be one of them?
      </p>
    </div>
  </div>
</div>

<div class="wf-subheading" hidden>
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet wf-showcase__title">
      <h2>Next Generation Web</h2>
      <p class="mdl-typography--font-light">
        The average user visits 100+ sites per month on the mobile web - will yours be one of them?
      </p>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
      <img src="/web/imgs/landing-devices.png">
    </div>
  </div>
</div>


<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <h2 class="mdl-cell mdl-cell--12-col">
      What's hot?
    </h2>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      {% ytvideo X1F8GEiZf9o %}
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <div class="wf-landing-whatsnew">
        <h4>Push notifications</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="/web/fundamentals/">Learn more</a>
      </div>
      <div class="wf-landing-whatsnew">
        <h4>Add to home screen</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="/web/fundamentals/">Learn more</a>
      </div>
    </div>
  </div>
</div>


<div class="wf-landing-section wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Web<b>Fundamentals</b></h3>
      <p>
        WebFundamentals is a comprehensive resource for web development best 
        practices, designed to help you add the right features and experiences 
        to your web project. If you’re new to web development or just looking 
        to make your project better, we’ve got you covered.
      </p>
      <a href="/web/fundamentals/">Jump in</a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="/web/imgs/dgc-web-w1x.jpg">
    </div>
  </div>
</div>

<div class="wf-landing-section wf-landing-tools">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--hide-phone">
      <a href="/web/tools/chrome-devtools/">
        <img class="wf-landing-tool-img" src="/web/tools/imgs/chrome-devtools.png">
      </a>
      <a href="/web/tools/starter-kit/">
        <img class="wf-landing-tool-img" src="/web/tools/starter-kit/images/thumb.jpg">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--hide-phone">
      <a href="/web/tools/polymer-starter-kit/">
        <img class="wf-landing-tool-img" src="/web/tools/polymer-starter-kit/thumb.jpg">
      </a>
      <a href="http://www.getmdl.io/">
        <img class="wf-landing-tool-img" src="/web/tools/imgs/mdl-thumb.png">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Get Productive</h3>
      <p>Discover our tools and kickstart your development</p>
      <ul>
        <li><a href="/web/tools/chrome-devtools/">Chrome DevTools</a></li>
        <li><a href="/web/tools/starter-kit/">Web Starter Kit</a></li>
        <li><a href="/web/tools/polymer-starter-kit/">Polymer Start Kit</a></li>
        <li><a href="http://www.getmdl.io/">Material Design Lite</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="wf-landing-section wf-landing-casestudies wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Success stories</h3>
      <p>
        See how our partners, from publishing to ecommerce, drive discovery 
        and re-engagement with a rich web experience. More traffic and users 
        means more revenue for your business.
      </p>
      <a href="/web/showcase/">Showcase</a>
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <img src="https://placehold.it/500x250">
    </div>
  </div>
</div>

<div class="wf-landing-section wf-landing-update">
  <div class="page-content mdl-grid">
    <h3 class="mdl-cell mdl-cell--12-col">What's new?</h3>
    {% for post in updates.index.updates | limit:3 %}
    {% assign authorKey = post.authors[0] %}
    {% assign author = site.data["contributors"][authorKey] %}
    <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp wf-card">
      <a style="background-image:url({{post.featured_image}})" class="mdl-card__title" href="{{post.relative_url}}">
        <div>
          <h2 class="mdl-card__title-text">{{post.title}}</h2>
        </div>
      </a>
      <div class="mdl-card__supporting-text">
        <span>{{post.description}}</span>
      </div>
      <div class="mdl-card__actions mdl-card--border wf-update-card--actions">
        <span class="wf-update-card--author">
          {{author.name.given}} {{author.name.family}}
        </span>
        <span class="wf-update-card--date">
          {{post.published_on | date: '%B %-d, %Y' }}
        </span>
      </div>
      <div class="mdl-card__menu">
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<div class="wf-landing-section wf-landing-gmp wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
      <img src="https://placehold.it/500x250">
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
      <h3>Google APIs for the web</h3>
      <p>
        Simplify your web development, grow your user base, and monetize more 
        effectively with Google services for the web.
      </p>
      <a href="#">Develop, engage &amp; earn</a>
    </div>
  </div>
</div>


