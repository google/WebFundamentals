---
id: shows
layout: default
title: "Shows"
description: ""
collection: web
published: true
---
{% comment %}
NOTE: Testing: collection: home
Fundmentals index: for guide in page.articles.[page.id]
{% endcomment %}

{% assign shows = page.articles[page.id] | sort: 'title'  %}

{% wrap content %}

# Shows

Here you'll find all of the available shows from
the Google Developer team related to web.

Select a show or video and start exploring.

<ol class="shows--videolist blanklist">
  {% for show in shows %}
    <li class="shows--videolistitem">
      <div class="shows--header shows--header-{{ show.id }}">
        {{ show.title }}
      </div>
      <div class="shows--videos shows--videos-{{ show.id }}">
        {% assign showSeries = page.articles[show.id]  | sort: 'date' %}
        <ol class="series-list">
        {% for series in showSeries %}
          <li>
            <div class="shows--videoseriestitle shows--videoseriestitle-{{ series.id }}">{{ series.title }}</div>
            <ol class="flatrowlist">
              {% assign seriesVideos = page.articles[series.id]  | sort: 'date' %}
              {% assign displayedShows = 0 %}
              {% assign MAX_DISPLAYED_SHOWS = 5 %}
              {% for video in seriesVideos %}
                {% if displayedShows < MAX_DISPLAYED_SHOWS %}
                <li>
                  <a class="smallvideo--link" href="{{site.baseurl}}{{video.url | canonicalize}}">
                    <div class="smallvideo">
                      <div class="smallvideo--imagecontainer">
                        <img class="smallvideo--image" src="http://img.youtube.com/vi/{{ video.youtubeVideoID }}/0.jpg" />
                      </div>
                      <div class="smallvideo--title-container">
                        <p class="smallvideo--title">{{ video.title }}</p>
                      </div>
                    </div>
                  </a>
                </li>
                {% endif %}
                {% assign displayedShows = displayedShows | plus: 1 %}
              {% endfor %}
            </ol>
          </li>
        {% endfor %}
        </ol>
      </div>
    </li>
  {% endfor %}
</ol>

{% endwrap %}
