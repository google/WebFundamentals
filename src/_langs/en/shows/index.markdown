---
id: shows
layout: shows/default
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

{% assign orderedVideos = site.data.allVideos | sort: 'date' | reverse %}
{% assign latestVideo = orderedVideos | first %}

{% wrap content %}

# Shows

Here you'll find all of the available shows from
the Google Developer team related to web.

Select a show or video and start exploring.

<!-- Latest Episode -->
{% if latestVideo %}

## Latest Show: {{ latestVideo.title }}
{% include modules/video.liquid id=latestVideo.showYoutubeID %}

{% endif %}




## Recent Shows
{% assign NUM_OF_RECENT_SHOWS =  10%}
{% assign displayedShows = 0 %}
<ol class="flatrowlist">
  {% for video in orderedVideos %}
    {% if displayedShows < NUM_OF_RECENT_SHOWS %}
    <li>
      {% include modules/shows/small-video.liquid video=video showid=page.id %}
    </li>
    {% endif %}
    {% assign displayedShows = displayedShows | plus: 1 %}
  {% endfor %}
</ol>



## All Shows




<ol class="shows--videolist blanklist">



  <!-- Loop Through all Shows -->
  {% for show in shows %}



    <!-- Create list item -->
    <li class="shows--videolistitem">



      <!-- Title of Show -->
      <div class="shows--header shows--header-{{ show.id }}">
        {{ show.title }}
      </div>



      <!-- List of series -->
      {% assign showSeries = page.articles[show.id]  | sort: 'date' %}
      <div class="shows--videos shows--videos-{{ show.id }}">
        <ol class="series-list">
        {% for series in showSeries %}

          <!-- Individual series -->
          <li>
            <div class="shows--videoseriestitle shows--videoseriestitle-{{ series.id }}">{{ series.title }}</div>



            <!-- Videos in Series -->
            <ol class="flatrowlist">
              {% assign seriesVideos = page.articles[series.id]  | sort: 'date' %}
              {% assign displayedShows = 0 %}
              {% assign MAX_DISPLAYED_SHOWS = 5 %}
              {% for video in seriesVideos %}
                {% if displayedShows < MAX_DISPLAYED_SHOWS %}
                <li>
                  {% include modules/shows/small-video.liquid video=video showid=page.id %}
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
