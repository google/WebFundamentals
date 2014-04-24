---
layout: article
title: "TEST PAGE"
description: "This is a test"
introduction: "This is a test"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 5
collection: optimizing-content-efficiency
---
{% wrap content%}

# {{ page.title }}
TEST TEST TEST

## Guides


Parent: {{ page.parent.parent.title }} - {{page.parent.parent.id}}

{% for p in page.parent.parent.articles[page.parent.parent.id]  %}
{% class %}
### [{{p.title}}]({{site.baseurl}}{{p.url}})
{% if p.id == page.collection %}
#### CURRENT CHAPTER

  {% for guide in page.articles[page.collection] %}
{% class %}
##### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{% endclass %}
  {% endfor %}
{% endif %} 
{% endclass %}
{% endfor %}





{% endwrap %}
