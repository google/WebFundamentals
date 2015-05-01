---
id: updates-tools
layout: updates-tools
collection: web
title: "Updates"
description: ""
published: true
feedName: Updates
feedPath: updates/feed.xml
---

{% assign updates = page.articles.updates | sort: 'date' | reverse  %}

<header class="tools-header updates-header">
  <div class="container">
    <p class="headliner">Tooling Updates</p>
    <div class="desc">Discover whats happening with Chrome DevTools, WSK and more. Come back often for tips and tricks!</div>
  </div>
</header>

<div class="updates-list">
  <ul class="container">

    {% for article in updates %}
    {% if article.category == 'tools' %}

        <li class="clear">

            <div>
              <a href="{{site.baseurl}}{{article.url | canonicalize}}">
              <h3>{{article.title}}</h3>
              <p>{{article.description}}</p>
              {% if article.tags %}
              <div class="tags">
                {% for tag in article.tags %}
                <span>{{tag}}</span>
                {% endfor %}
              </div>
              {% endif %}
              </a>
            </div>

            <footer>

              {% if article.authors %}
              <div>
              {% for author in article.authors %}
              {% assign contributor = site.data["contributors"][author] %}
                  <a href="{{contributor.homepage}}" target="_blank" title="{{contributor.name.given}} {{contributor.name.family}}">
                    <span class="icon-circle" style="background-image: url({{site.url}}/imgs/contributors/{{author}}.jpg); background-size: contain;"></span>
                    {{contributor.name.given}} {{contributor.name.family}}
                  </a>
              {% endfor %}

              </div>
              {% endif %}

              <div>{{ article.article.written_on | date: '%B %d, %Y' }}</div>

            </footer>

          
        </li>

    {% endif %}
    {% endfor %}

  </ul>
</div>