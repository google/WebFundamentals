---
id: shows
layout: shows/default
title: "Shows"
description: ""
collection: web
published: true
feedName: Google Developers Web Shows
feedPath: shows/feed.xml
---
{% comment %}
NOTE: Testing: collection: home
Fundmentals index: for guide in page.articles.[page.id]
{% endcomment %}

{% assign shows = page.articles[page.id] | sort: 'title'  %}

{% assign orderedVideos = site.data.allVideos | sort: 'date' | reverse %}
{% assign latestVideo = orderedVideos | first %}

{% assign cdsShow = null %}
{% assign blinkonShow = null %}
{% assign http203Show = null %}
{% assign polycastsShows = null %}
{% assign udacityShow = null %}
{% assign lazywebShow = null %}
{% assign tttShow = null %}
{% assign nicShow = null %}
{% assign googleioShow = null %}
{% assign webrtcShow = null %}
{% for show in shows %}
  {% if show.id == 'cds' %}
    {% assign cdsShow = show %}
  {% endif %}
  {% if show.id == 'http203' %}
    {% assign http203Show = show %}
  {% endif %}
  {% if show.id == 'polycasts' %}
    {% assign polycastsShows = show %}
  {% endif %}
  {% if show.id == 'udacity-courses' %}
    {% assign udacityShow = show %}
  {% endif %}
  {% if show.id == 'lazyweb' %}
    {% assign lazywebShow = show %}
  {% endif %}
  {% if show.id == 'ttt' %}
    {% assign tttShow = show %}
  {% endif %}
  {% if show.id == 'blinkon' %}
    {% assign blinkonShow = show %}
  {% endif %}
  {% if show.id == 'newinchrome' %}
    {% assign nicShow = show %}
  {% endif %}
  {% if show.id == 'googleio' %}
    {% assign googleioShow = show %}
  {% endif %}
  {% if show.id == 'webrtc' %}
    {% assign webrtcShow = show %}
  {% endif %}
{% endfor %}



<div class="guides-section">
  <header class="container">
      <h2 class="xxlarge">{{ page.title }}</h2>
      <div class="divider divider--secondary">
        <span class="themed divider-icon"></span>
      </div>
      {% if page.description %}
      <p>{{ page.description }}</p>
      {% endif %}
  </header>

  <ul class="guides-list container">

    <li class="guides-list__item g--half theme--{{ tttShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
        <a href="{{site.baseurl}}{{tttShow.url | canonicalize}}" title="Go to {{tttShow.title}}">
          <img src="{{site.baseurl}}/shows/imgs/ttt_rect.png" alt="{{tttShow.title}} Hero Image">
        </a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{tttShow.url | canonicalize}}" title="Go to {{tttShow.title}}" class="themed">{{tttShow.title}}</a></h3>
        <p>{{tttShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ http203Show.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{http203Show.url | canonicalize}}" title="Go to {{http203Show.title}}">
					<img src="{{site.baseurl}}/shows/imgs/http203_rect.jpg" alt="{{http203Show.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{http203Show.url | canonicalize}}" title="Go to {{http203Show.title}}" class="themed">{{http203Show.title}}</a></h3>
        <p>{{http203Show.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ lazywebShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{lazywebShow.url | canonicalize}}" title="Go to {{lazywebShow.title}}">
					<img src="{{site.baseurl}}/shows/imgs/lazyweb_rect.jpg" alt="{{lazywebShow.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{lazywebShow.url | canonicalize}}" title="Go to {{lazywebShow.title}}" class="themed">{{lazywebShow.title}}</a></h3>
        <p>{{lazywebShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ nicShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
        <a href="{{site.baseurl}}{{nicShow.url | canonicalize}}" title="Go to {{nicShow.title}}">
          <img src="{{site.baseurl}}/shows/imgs/nic_rect.png" alt="{{nicShow.title}} Hero Image">
        </a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{nicShow.url | canonicalize}}" title="Go to {{nicShow.title}}" class="themed">{{nicShow.title}}</a></h3>
        <p>{{nicShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ googleioShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
        <a href="{{site.baseurl}}{{googleioShow.url | canonicalize}}" title="Go to {{googleioShow.title}}">
          <img src="{{site.baseurl}}/shows/imgs/googleio_rect.jpg" alt="{{googleioShow.title}} Hero Image">
        </a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{googleioShow.url | canonicalize}}" title="Go to {{googleioShow.title}}" class="themed">{{googleioShow.title}}</a></h3>
        <p>{{googleioShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ polycastsShows.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{polycastsShows.url | canonicalize}}" title="Go to {{polycastsShows.title}}">
					<img src="{{site.baseurl}}/shows/imgs/polycasts_rect.png" alt="{{polycastsShows.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{polycastsShows.url | canonicalize}}" title="Go to {{polycastsShows.title}}" class="themed">{{polycastsShows.title}}</a></h3>
        <p>{{polycastsShows.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ udacityShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{udacityShow.url | canonicalize}}" title="Go to {{udacityShow.title}}">
					<img src="{{site.baseurl}}/shows/imgs/udacity_rect.png" alt="{{udacityShow.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{udacityShow.url | canonicalize}}" title="Go to {{udacityShow.title}}" class="themed">{{udacityShow.title}}</a></h3>
        <p>{{udacityShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ cdsShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{cdsShow.url | canonicalize}}" title="Go to {{cdsShow.title}}">
					<img src="{{site.baseurl}}/shows/imgs/cds_rect.png" alt="{{cdsShow.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{cdsShow.url | canonicalize}}" title="Go to {{cdsShow.title}}" class="themed">{{cdsShow.title}}</a></h3>
        <p>{{cdsShow.description}}</p>
      </div>
    </li>

     <li class="guides-list__item g--half theme--{{ blinkonShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
      	<a href="{{site.baseurl}}{{blinkonShow.url | canonicalize}}" title="Go to {{blinkonShow.title}}">
					<img src="{{site.baseurl}}/shows/imgs/blinkon_rect.jpg" alt="{{blinkonShow.title}} Hero Image">
				</a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{blinkonShow.url | canonicalize}}" title="Go to {{blinkonShow.title}}" class="themed">{{blinkonShow.title}}</a></h3>
        <p>{{blinkonShow.description}}</p>
      </div>
    </li>

    <li class="guides-list__item g--half theme--{{ webrtcShow.id }} {% cycle '', 'g--last' %}">
      <div class="primary-content show-root--image-container">
        <a href="{{site.baseurl}}{{webrtcShow.url | canonicalize}}" title="Go to {{webrtcShow.title}}">
          <img src="{{site.baseurl}}/shows/imgs/webrtc_rect.png" alt="{{webrtcShow.title}} Hero Image">
        </a>
      </div>
      <div class="secondary-content show-root--info">
        <h3 class="xlarge"><a href="{{site.baseurl}}{{webrtcShow.url | canonicalize}}" title="Go to {{webrtcShow.title}}" class="themed">{{webrtcShow.title}}</a></h3>
        <p>{{webrtcShow.description}}</p>
      </div>
    </li>

  </ul>
</div>

{% capture feedURL %}{{site.baseurl}}/shows/feed.xml{% endcapture %}
{% include modules/shows/feedlink.liquid feedURL=feedURL emailSubscriptionLink="https://feedburner.google.com/fb/a/mailverify?uri=GoogleDeveloperWebShows&amp;loc=en_US" %}
