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
{% endfor %}

{% wrap content %}

# Shows

Here you'll find all of the available shows from
the Google Developer team related to web.

Select a show or video and start exploring.

{{ page.article['shows'][0].description }}

<div class="showblock-container">
	<a class="g--third showblock-link" href="{{site.baseurl}}/shows/cds/">
		<div class="showblock showblock-cds">
			<div class="showblock--imagecontainer">
				<img src="imgs/cds_circle.png" alt="Chrome Dev Summit Hero Image">
			</div>
			<h1 class="showblock--title">Chrome Dev Summit</h1>

			<p>{{ cdsShow.description }}</p>
		</div>
	</a>

	<a class="g--third showblock-link" href="{{site.baseurl}}/shows/http203/">
		<div class="showblock showblock-http203">
			<div class="showblock--imagecontainer">
				<img src="imgs/http203_circle.png" alt="HTTP203 Hero Image">
			</div>
			<h1 class="showblock--title">HTTP203</h1>

			<p>{{ http203Show.description }}</p>
		</div>
	</a>

	<a class="g--third g--last showblock-link" href="{{site.baseurl}}/shows/polycasts/">
		<div class="showblock showblock-polycasts">
			<div class="showblock--imagecontainer">
				<img src="imgs/polycasts_circle.png" alt="Polycasts Hero Image">
			</div>
			<h1 class="showblock--title">Polycasts</h1>

			<p>{{ polycastsShows.description }}</p>
		</div>
	</a>

	<div class="clear"></div>
</div>

{% endwrap %}
