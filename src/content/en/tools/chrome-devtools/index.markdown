---
layout: shared/narrow
description: "The Chrome DevTools are Chrome's built-in authoring and debugging tool."
title: Chrome DevTools

panels:
  - title: Elements
    img: /web/tools/chrome-devtools/images/elements.jpg
    anchor: elements-panel-inspect-dom-and-styles
  - title: Network
    img: /web/tools/chrome-devtools/images/network.jpg
    anchor: network-panel-monitor-network-performance
  - title: Sources
    img: /web/tools/chrome-devtools/images/sources.jpg
    anchor: sources-panel-debug-javascript-with-breakpoints
  - title: Timeline
    img: /web/tools/chrome-devtools/images/timeline.jpg
    anchor: timeline-panel-record-and-analyze-page-activity
  - title: Profiles
    img: /web/tools/chrome-devtools/images/profiles.jpg
    anchor: profiles-panel-profile-execution-time-and-memory-usage
  - title: Resources
    img: /web/tools/chrome-devtools/images/resources.jpg
    anchor: resources-panel-inspect-storage
  - title: Console
    img: /web/tools/chrome-devtools/images/console.jpg
    anchor: console-panel-interact-with-page
  - title: Device Mode
    img: /web/tools/chrome-devtools/images/devicemode.jpg
    anchor: work-in-device-mode
---

<div class="todo-banner">
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <h2>Chrome DevTools</h2>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <p>Chrome's built-in authoring and debugging tool.</p>
      <p>
        <a class="mdl-button mdl-js-button mdl-button--raised" href="#TODO">Learn more</a>
        <a href="https://github.com/GoogleChrome"><img src="/web/imgs/social/github-circle.svg" alt="Github"></a>
        <a href="https://plus.google.com/+GoogleChromeDevelopers"><img src="/web/imgs/social/google-plus-box.svg" alt="Google+"></a>
        <a href="https://twitter.com/ChromeDevTools"><img src="/web/imgs/social/twitter.svg" alt="Twitter"></a>
        <a href="http://stackoverflow.com/questions/tagged/google-chrome-devtools"><img src="/web/imgs/social/stackoverflow.svg" alt="Stack Overflow"></a>
        <a href="https://www.youtube.com/user/ChromeDevelopers"><img src="/web/imgs/social/youtube-play.svg" alt="YouTube"></a>
      </p>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <p>The Chrome DevTools are a set of web authoring and debugging tools built into Google Chrome. They provide web developers deep access into the internals of the browser and their web application. Use the DevTools to efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.</p>
      <div class="note">Note: If you are a web developer and want to get the latest version of DevTools, you should use <a href="https://tools.google.com/dlpage/chromesxs">Google Chrome Canary</a>.</div>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <p>To open the DevTools, open a site or app in Chrome, then:</p>
      <ul>
        <li>Select the <strong>Chrome menu</strong> at the top-right of your browser window, then select <strong>Tools > Developer Tools</strong>.</li>
        <li>Right-click on any page element and select Inspect Element.</li>
        <li>Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd> on Mac) (<a href="https://developer.chrome.com/devtools/docs/shortcuts">more shortcuts</a>)</li>
      </ul>
      <a class="mdl-button mdl-js-button mdl-button--raised" href="/web/tools/setup/workspace/setup-devtools">CONTINUE READING</a>
    </div>
  </div>
</div>

<div class="devtools">


{% if page.articles.updates %}

  {% assign count = '' %}
  {% assign updates = page.articles.updates | sort: 'date' | reverse  %}
  {% for article in updates limit: 20 %}
  {% if count.size < 1 %}
  {% if article.type == "news" and article.tags contains "digest"  %}
  {% if article.product == "chrome-devtools" %}

    <div class="devtools-news-teaser">
      <div class="container flex">
        <div class="title">
          <h4><a href="{{site.baseurl}}{{article.url | canonicalize}}">DevTools Digest</a></h4>
          <p class="date">{{ article.article.written_on | date: '%B %d, %Y' }}</p>
          <div class="explainer">
            The latest features and community updates. Delivered <a href="/web/updates/chrome-devtools/news">every month</a>.
          </div>
        </div>

        {% for teaser in article.teaserblocks %}
        <div class="teaser">
          <a href="{{site.baseurl}}{{article.url | canonicalize}}"><img src="{{teaser.image}}"></a>
          <div>
            <a href="{{site.baseurl}}{{article.url | canonicalize}}">
              <h5>{{teaser.heading}}</h5>
              <p>{{teaser.description}}</p>
            </a>
          </div>
        </div>       
        {% endfor %}

      </div>
    </div>

    {% capture count %}{{ count }}*{% endcapture %}

  {% endif %}
  {% endif %}
  {% endif %}
  {% endfor %}

{% endif %}

<a name="docs"></a>
  <div class="tools-home">

    <div class="container tools-docs-listing">

      <div>

        <h3>Action-oriented tutorials</h3>

        <ul class="doclist">
            {% for guide in page.articles.tools %}
            {% if guide.published != false and (guide.is_localized != true or page.langcode == guide.langcode) %}
            <li class="theme--{{ guide.id }}">
              <a href="{{site.baseurl}}{{guide.url | clean | localize_link:guide }}" title="{{guide.title}}">
                <h4>{{guide.title}}</h4>
              </a>
              <ul>
                {% for subguide in page.articles.[guide.id] %}
                {% if subguide.published != false and (subguide.is_localized != true or page.langcode == subguide.langcode) %}
                <li>
                  <a href="{{site.baseurl}}{{subguide.url | clean | localize_link:subguide }}" title="{{subguide.title}}">
                    {{subguide.title}}
                  </a>
                </li>
                {% endif %}
                {% endfor %}
              </ul>
            </li>
            {% endif %}
            {% endfor %}
        </ul>

        <h3>Reference / Configuration</h3>

        <ul class="doclist">

            <li>
              <h4>Settings &amp; Commands</h4>
              <ul>
                <li><a href="/web/tools/javascript/command-line/command-line-reference">Command Line API</a></li>
                <li><a href="/web/tools/iterate/inspect-styles/shortcuts">Keyboard Shortcuts</a></li>
                <li><a href="https://developer.chrome.com/devtools/docs/settings">Settings</a></li>
              </ul>
            </li>

            <li>
              <h4>Extending DevTools</h4>
              <ul>
                <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integrating with DevTools &amp; Chrome</a></li>
                <li><a href="https://developer.chrome.com/extensions/devtools">DevTools Extensions API</a></li>
                <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Remote Debugging Protocol</a></li>
              </ul>
            </li>

            <li class="note-why">
              <h4>Why are some docs on another site?</h4>
              <p>While you'll get plenty of information of how to use DevTools here, our old home will stay around for a bit and provide you with info on how to extend DevTools.</p>
            </li>
            
        </ul>

      </div>

      {% assign guides1 = page.articles.setup  %}
      {% assign guides2 = page.articles.iterate  %}
      {% assign guides3 = page.articles.javascript  %}
      {% assign guides4 = page.articles.profile-performance  %}
      {% assign combined = guides1 | wfconcat: guides2 | wfconcat: guides3 | wfconcat: guides4  %}

      <div>

        <h3>Per-Panel Documentation</h3>

        <ul class="doclist by-panel">
          {% for panel in page.panels %}
          {% capture lowerPanelTitle %}{{ panel.title | downcase }}{% endcapture %}
          <li>
            <a href="/web/tools/setup/workspace/setup-devtools#{{panel.anchor}}"><img src="{{panel.img}}"></a>
            <h4><a href="/web/tools/setup/workspace/setup-devtools#{{panel.anchor}}">{{panel.title}}</a></h4>
            <ul>
              {% for guide in combined %}
              {% if guide.panel == lowerPanelTitle and guide.published != false and (guide.is_localized != true or page.langcode == guide.langcode) %}
              <li>
                <a href="{{site.baseurl}}{{guide.url | clean | localize_link:guide }}" title="{{guide.title}}">
                  {{guide.title}}
                </a>
              </li>
              {% endif %}
              {% endfor %}
            </ul>
          </li>        
          {% endfor %}
        </ul>
      </div>

    </div>

	</div>

{% if page.articles.updates %}

  <div class="tools-updates devtools-updates">
    <div class="container">
      <h3><a href="/web/updates/chrome-devtools">Tips &amp; Tricks <span>All tips &amp; updates</span></a></h3>
      {% include modules/latest_updates.liquid limit=3 product="chrome-devtools" type="tip" %}
    </div>
  </div>

{% endif %}
	
</div>
