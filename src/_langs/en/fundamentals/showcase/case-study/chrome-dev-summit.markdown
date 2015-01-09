---
layout: case-study
collection: case-study

title: "Chrome Dev Summit 2014"
published: true
introduction: "Built in-house by our own Paul Lewis, the CDS website showed how to build a great mobile web experience for conference visitors."

header_image: ../../../imgs/placeholder--device-landscape.png
header_orientation: landscape

overview:
  description: "The CDS site was the premier destination to read about all things Chrome Dev Summit, a two-day developer event about Chrome in 2014. It was used by attendees to get infos about the schedule, signup and more."
  audience: Offline and online attendees of the Chrome Dev Summit 2014.
  features:
    - Feature 1
    - Feature 2
    - Feature 3
  webbyness:
    - Some advantage
    - Another cool advantage

behind_the_scenes:
  description: "Remarkable is the smoothness at which the site runs in various mobile browsers. It's utilizing the layout and paint cycles of the browser in the best way possible."
  owp:
    - Service Worker
    - Manifest
  patterns:
    - Expanding cards
    - Responsive Grid
  samples:
    - Sample 1
    - Sample 2

our_views:
  good:
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
  bad:
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
other_case_studies:
  - title: Case study number one
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-2.jpg
  - title: Case study number two
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-3.jpg
  - title: Case study number three
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-4.jpg
article:
  written_on: 2014-01-01
  updated_on: 2014-02-02
---

<div class="case-study-wrapper">
  <div class="container clear">
    <div class="g--third">
      <h2>Overview</h2>
      <p>{{page.overview.description}}</p>
      <dl class="case-study__dl">
        <dt>Target audience</dt>
        <dd>{{page.overview.audience}}</dd>

        {% if page.overview.features %}
          <dt>Features</dt>
          <dd>
            <ul>
            {% for feature in page.overview.features %}
              <li>
                {{feature}}
              </li>
            {% endfor %}
            </ul>
          </dd> 
        {% endif %}

        {% if page.overview.webbyness %}
          <dt>Webbyness</dt>
          <dd>
            <ul>
            {% for advantage in page.overview.webbyness %}
              <li>
                {{advantage}}
              </li>
            {% endfor %}
            </ul>
          </dd> 
        {% endif %}

      </dl>
    </div>

    <figure class="case-study__img-wrapper g--third">
      <img src="images/cover.jpg" alt="{{page.title}} on Nexus 5" class="fluid">
    </figure>

    <div class="g--third g--last case-study-inverted">
      <h2>Behind the scenes</h2>
      <p>{{page.behind_the_scenes.description}}</p>
      <dl class="case-study__dl">

        {% if page.behind_the_scenes.owp %}
          <dt>New web platform features</dt>
          <dd>
            <ul>
            {% for owp in page.behind_the_scenes.owp %}
              <li>
                {{owp}}
              </li>
            {% endfor %}
            </ul>
          </dd> 
        {% endif %}

        {% if page.behind_the_scenes.patterns %}
          <dt>Patterns</dt>
          <dd>
            <ul>
            {% for pattern in page.behind_the_scenes.patterns %}
              <li>
                {{pattern}}
              </li>
            {% endfor %}
            </ul>
          </dd> 
        {% endif %}

        {% if page.behind_the_scenes.samples %}
          <dt>Forkable samples</dt>
          <dd>
            <ul>
            {% for sample in page.behind_the_scenes.samples %}
              <li>
                {{sample}}
              </li>
            {% endfor %}
            </ul>
          </dd> 
        {% endif %}

      </dl>
    </div>

  </div>
</div>

<div class="container clear">

  <div class="content">
  <h2>The interview</h2>
  {% include modules/video.liquid id="dEGJ8XyZw40" %}
  </div>

  <div class="content">
    <h2>The impact</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, itaque, velit, magni nostrum esse vero dolorem veritatis earum nisi quis pariatur eius sint beatae quos qui numquam reiciendis atque ab!</p>
  </div>

  <div class="spotlight-content clear">
    <div class="indented-medium g--half">
      <h3>Data examples</h3>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, perferendis error voluptatem quo porro? Labore, obcaecati, alias, officiis exercitationem minus quam vero expedita nulla cumque quia qui quos explicabo quibusdam.</p>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, deleniti nemo inventore autem? Velit, laboriosam, voluptatibus, officia inventore.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, molestiae, voluptatem tempora natus libero eligendi mollitia temporibus vero veritatis reiciendis.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, repudiandae similique reprehenderit accusantium consequatur harum maiores quas sapiente repellat.</li>
      </ul>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, nostrum, a culpa sed perspiciatis voluptas alias eos quis. Quos, laboriosam, modi aliquam odit illo quam ut veritatis obcaecati autem reiciendis?</p>

    </div>

    <div class="centered g--half g--last">
      <h3>Key users</h3>
      <figure class="case-study__img-wrapper contained">
        <img src="../../../imgs/placeholder--square.png" alt="image placeholder" class="fluid">
        <figcaption>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, porro eius.</figcaption>
      </figure>
    </div>
  </div>

</div>