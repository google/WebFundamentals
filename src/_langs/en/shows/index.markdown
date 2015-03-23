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

<div class="showblock-container">
	<a class="g--third showblock-link" href="{{site.baseurl}}/shows/cds/">
		<div class="showblock showblock-cds">
			<div class="showblock--imagecontainer">
				<img src="imgs/cds_circle.png" alt="Chrome Dev Summit Hero Image">
			</div>
			<h1 class="showblock--title">Chrome Dev Summit</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices cursus elit sed mollis. Donec laoreet vehicula pretium. Fusce interdum mollis nulla et lobortis. Proin quis nunc tincidunt libero varius molestie.</p>
		</div>
	</a>

	<a class="g--third showblock-link" href="{{site.baseurl}}/shows/http203/">
		<div class="showblock showblock-http203">
			<div class="showblock--imagecontainer">
				<img src="imgs/http203_circle.png" alt="HTTP203 Hero Image">
			</div>
			<h1 class="showblock--title">HTTP203</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices cursus elit sed mollis. Donec laoreet vehicula pretium. Fusce interdum mollis nulla et lobortis. Proin quis nunc tincidunt libero varius molestie.</p>
		</div>
	</a>

	<a class="g--third g--last showblock-link" href="{{site.baseurl}}/shows/polycasts/">
		<div class="showblock showblock-polycasts">
			<div class="showblock--imagecontainer">
				<img src="imgs/polycasts_circle.png" alt="Polycasts Hero Image">
			</div>
			<h1 class="showblock--title">Polycasts</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices cursus elit sed mollis. Donec laoreet vehicula pretium. Fusce interdum mollis nulla et lobortis. Proin quis nunc tincidunt libero varius molestie.</p>
		</div>
	</a>

	<div class="clear"></div>
</div>

{% endwrap %}
