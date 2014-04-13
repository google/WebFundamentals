---
layout: article
title: "Optimizing Performance"
description: ""
---
# {{ page.title }}

Performance Matters (#perfmatters).  It not only matters it is critical that you deliver your content as quickly as possible to the user and once they are in your app you make your page's interaction and rendering as smooth as possible.

Research shows that users' flow is interrupted if pages take longer than one second to load. To deliver the best experience and keep the visitor engaged, focus on rendering some content, known as the above-the-fold content, to users in one second (or less) while the rest of the page continues to load and render in the background.

{% for guide in page.articles.performance %}
{% class %}
### [{{guide.title}}]({{guide.url}}) 
{{guide.description}}
{% endclass %}
{% endfor %}
