---
layout: shared/wide
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

<style>
  .flex-container {
    display: flex;
  }
  .flex-item {
    width: 50%;
  }
  .flex-item_grid {
    flex-wrap: wrap;
  }

</style>

<div class="page-content">
  <h2>What's new?</h2>
  <div class="flex-container">
    <div class="flex-item">
      {% ytvideo X1F8GEiZf9o %}
    </div>
    <div class="flex-container flex-item flex-item_grid">
      <div class="flex-item">recent update</div>
      <div class="flex-item">recent showcase</div>
      <div class="flex-item">recent video</div>
      <div class="flex-item">recent update</div>
    </div>
  </div>
</div>


<div class="wf-secondaryheading">
  <div class="page-content">
    <h2>{{fundamentals.index.title}}</h2>
    <p>
      {{fundamentals.index.description}}
    </p>
    <div class="mdl-grid mdl-typography--text-center wf-fundamentals-areas">
      {% for pageInSection in fundamentals.subdirectories %}
      {% if pageInSection.index.published != false %}
      {% if pageInSection.id != 'getting-started' and pageInSection.id != 'primers' %}
      {% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
        <div class="mdl-cell mdl-cell--4-col">
          <div class="icon">
            <a href="{{pageInSection.index.canonical_url }}">
              {% include {{icon}} %}
            </a>
          </div>
          <h3>
            <a href="{{pageInSection.index.canonical_url }}">
            {{pageInSection.index.title}}
            </a>
          </h3>
          <p>{{pageInSection.index.description}}</p>
        </div>
      {% endif %}
      {% endif %}
      {% endfor %}
    </div>
  </div>
</div>

<div class="">
  <div class="page-content">
    <h2>{{tools.index.title}}</h2>
    <p>
      {{tools.index.description}}
    </p>
    <div class="mdl-grid mdl-typography--text-center wf-fundamentals-areas">
      {% for pageInSection in tools.subdirectories %}
      {% if pageInSection.index.published != false %}
      {% if pageInSection.id != 'setup' %}
      {% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
        <div class="mdl-cell mdl-cell--6-col">
          <div class="icon">
            <a href="{{pageInSection.index.canonical_url }}">
              {{icon}}
            </a>
          </div>
          <h3>
            <a href="{{pageInSection.index.canonical_url }}">
            {{pageInSection.index.title}}
            </a>
          </h3>
          <p>{{pageInSection.index.description}}</p>
        </div>
      {% endif %}
      {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
