---
layout: shared/narrow
title: "Build the starter app"
published_on: 2015-09-30
updated_on: 2015-09-30
translation_priority: 1
order: 4
authors:
  - paulkinlan
  - rupl
---


Go back to the command line and switch from `master` to the `code-lab` branch:

{% highlight bash %}
git checkout code-lab
{% endhighlight %}

This will remove all assets that were supplying offline functionality so you can add them back in by following the tutorial.

Additionally, you will need to unregister the service worker. In Chrome you can do this by visiting `chrome://serviceworker-internals/` and clicking the **Unregister** button underneath the appropriate URL.
