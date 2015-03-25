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

{% assign cdsShow = null %}
{% assign http203Show = null %}
{% assign polycastsShows = null %}
{% assign udacityShow = null %}
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

        <li class="guides-list__item g--half theme--{{ http203Show.id }} {% cycle '', 'g--last' %}">
          <div class="primary-content show-root--image-container">
          	<a href="{{site.baseurl}}{{http203Show.url | canonicalize}}" title="Go to {{http203Show.title}}">
							<img src="imgs/http203_rect.png" alt="{{http203Show.title}} Hero Image">
						</a>
          </div>
          <div class="secondary-content show-root--info">
            <h3 class="xlarge"><a href="{{site.baseurl}}{{http203Show.url | canonicalize}}" title="Go to {{http203Show.title}}" class="themed">{{http203Show.title}}</a></h3>
            <p>{{http203Show.description}}</p>
          </div>
        </li>

        <li class="guides-list__item g--half theme--{{ polycastsShows.id }} {% cycle '', 'g--last' %}">
          <div class="primary-content show-root--image-container">
          	<a href="{{site.baseurl}}{{polycastsShows.url | canonicalize}}" title="Go to {{polycastsShows.title}}">
							<img src="imgs/polycasts_rect.png" alt="{{polycastsShows.title}} Hero Image">
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
							<img src="imgs/udacity_rect.png" alt="{{udacityShow.title}} Hero Image">
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
							<img src="imgs/cds_rect.png" alt="{{cdsShow.title}} Hero Image">
						</a>
          </div>
          <div class="secondary-content show-root--info">
            <h3 class="xlarge"><a href="{{site.baseurl}}{{cdsShow.url | canonicalize}}" title="Go to {{cdsShow.title}}" class="themed">{{cdsShow.title}}</a></h3>
            <p>{{cdsShow.description}}</p>
          </div>
        </li>

      </ul>
    </div>




<!--
{% wrap content %}

<div class="showblock-container">
	<a class="g--half showblock-link" href="{{site.baseurl}}/shows/http203/">
		<div class="showblock showblock-http203">
			<div class="showblock--imagecontainer">
				<img src="imgs/http203_rect.png" alt="HTTP203 Hero Image">
			</div>
			<h1 class="showblock--title">{{ http203Show.title }}</h1>

			<p>{{ http203Show.description }}</p>
		</div>
	</a>

	<a class="g--half g--last showblock-link" href="{{site.baseurl}}/shows/polycasts/">
		<div class="showblock showblock-polycasts">
			<div class="showblock--imagecontainer">
				<img src="imgs/polycasts_rect.png" alt="Polycasts Hero Image">
			</div>
			<h1 class="showblock--title">{{ polycastsShows.title }}</h1>

			<p>{{ polycastsShows.description }}</p>
		</div>
	</a>

		<a class="g--half showblock-link" href="{{site.baseurl}}/shows/udacity/">
		<div class="showblock showblock-udacity">
			<div class="showblock--imagecontainer">
				<img src="imgs/udacity_rect.png" alt="Udacity Course Hero Image">
			</div>
			<h1 class="showblock--title">{{ udacityShow.title }}</h1>

			<p>{{ udacityShow.description }}</p>
		</div>
	</a>

	<a class="g--half g--last showblock-link" href="{{site.baseurl}}/shows/cds/">
		<div class="showblock showblock-cds">
			<div class="showblock--imagecontainer">
				<img src="imgs/cds_rect.png" alt="Chrome Dev Summit Hero Image">
			</div>
			<h1 class="showblock--title">{{ cdsShow.title }}</h1>

			<p>{{ cdsShow.description }}</p>
		</div>
	</a>

	<div class="clear"></div>
</div>

{% endwrap %}
-->
