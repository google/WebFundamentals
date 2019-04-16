project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The state of the Polymer Union.

{# wf_updated_on: 2019-03-16 #}
{# wf_published_on: 2015-01-05 #}
{# wf_tags: news,webcomponents,polymer,chromedevsummit #}
{# wf_blink_components: N/A #}

# Chrome Dev Summit 2014: Polymer - State of the Union {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}




Polymer and Web Components are very hot topics as of late, and since this ecosystem is evolving rapidly, it can often be difficult for developers to stay abreast of all the latest changes.

In his talk at Chrome Dev Summit, Matt McNulty, engineering manager for the Polymer team, explained what Polymer is, and also outlined the roadmap to Polymer 1.0.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0LT6W5QVCJI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## What is Polymer?

First, what is Polymer exactly?

Polymer is a library that helps you build elements and apps out of web components. Web Components are a cutting edge set of new standards that allow developers to extend the HTML vocabulary with their own custom elements.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/polymer-better.jpg" alt="Polymer helps developers build applications faster" width="640" />
</p>

Because Web Components are designed to be a new primitive for the browser, it means that they're very powerful but also very low level and working with them requires a fair bit of code.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/sweeter.jpg" alt="Polymer makes Web Components sweeter" width="640" />
</p>

Polymer makes it easier to work Web Components by "sugaring" the syntax. It reduces the amount of boilerplate code you need to write, and adds a declarative style so creating Web Components is as easy as writing HTML.

## The Polymer Experiment

Polymer began as an experiment to see if we could polyfill the Web Component standards and get feedback from developers before these technologies had shipped in all browsers. As more developers began using Polymer, it changed from being just polyfills, to an actual library full of productivity features (data binding, attribute change watchers, automatic node finding, etc). But all experiments have results, so how did we do?

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/report-card.jpg" alt="Polymer report card needs improvement" width="640" />
</p>

While many developer said they liked the expressiveness and productivity gains of working with Web Components in Polymer, they also expressed concerns around performance and overall complexity.

It highlights a natural tension that Polymer has had all along: be an experiment to push the web platform forward, but also create something production-worthy that developers can depend on.

## Upcoming Changes

The Polymer team has taken a hard look at every feature of the library with the goal of hammering out a leaner, production-ready version that developers can feel confident about using.

### Layers

Polymer has been refactored into a series of layers. The core features are fast and lean, while the more advanced features will be opt-in. For the majority of use cases, the core features should cover developers' needs.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/layers.jpg" alt="Polymer has been refactored into layers" width="640" />
</p>

### Simplified Data Binding

Polymer's data binding system has also been significantly optimized for performance. Following the layered approach, two-way binding is now opt-in, with the default being one-way bindings. Also, published property types have been made explicit and a property change now fires an event to help elements from different libraries more easily communicate.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/data-binding.jpg" alt="Data binding has been simplified" width="640" />
</p>

### Leaner Shadow DOM

The Shadow DOM polyfill is an amazing feat of engineering. It was designed to be comprehensive and spec compliant, which is important for thoroughly testing the platform primitive, but unfortunately introduces a number of performance bottlenecks for features that Polymer is not using.

The next release of Polymer will take a different approach, employing a shim-style layer that only polyfills what Polymer needs.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/shim-shadowdom.jpg" alt="Shim shadowdom is much faster" width="640" />
</p>

The existing polyfill will live on for generic, non-Polymer web components.

### Moving to webcomponents.org

Speaking of polyfills, those are getting a new home as well. At present many developers are confused about the relationship between Polymer and Web Components. Some think that you must use all of Polymer to use Web Components, when in fact, you only need the polyfills.

To make this distinction more clear, the polyfills are being moved to the webcomponents.org and they have now been renamed to `webcomponents.js`.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/wc-org.jpg" alt="Polyfills moving to webcomponents.org" width="640" />
</p>

This move is designed to help other library authors take advantage of the polyfills without any confusion. The Polymer team will continue to contribute to the polyfills, but the hope is that this change makes them into more of a shared resource for the community.

### Results

So what are the results from all these changes?

### Speed

On Chrome, Polymer is now **5x faster**, and on Safari there has been an **8x speed up**.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/safari-perf.jpg" alt="Polymer is now 8x faster in Safari" width="640" />
</p>

### File Size

The file size has also been reduced by 87%, from 123KB down to 15KB (6KB gzipped).

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/reduced-payload.jpg" alt="Polymer is now 87% smaller" width="640" />
</p>

## Roadmap

There will be some API breaking changes in the next release, signified by the new version number (0.8) but the team wants to make it clear that this is not a rewrite. Moving your current project from Polymer 0.5 to 0.8 should be fairly trivial.

The Polymer team has also outlined a roadmap to give developers more clarity around upcoming releases.

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-06-polymer-state-of-the-union/roadmap.jpg" alt="Polymer roadmap, beta in q1, 1.0 in q2" width="640" />
</p>

The 0.8 preview is available now as a branch on GitHub (though it's still being very actively developed and is lacking in documentation). The 0.9 official beta is planned for Q1 2015, with 1.0 happening sometime in Q2.

## The Experiment is Over

With all the recent changes in Polymer, the team behind it is laying the groundwork for Web Components to become an integral part of every developer's stack. If you're new to Web Components, now is a great time to take a look and familiarize yourself with these transformative technologies. If you're already working with components (and Polymer), the future looks bright indeed. Keep an eye on the Polymer Blog for all the latest updates, and sign up for the Polymer mailing list for questions or comments. Happy hacking!


