---
layout: shared/narrow
title: "Run the sample app"
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 2
authors:
  - paulkinlan
---

First, let’s see what the finished sample app looks like. Follow these instructions to build and start testing the Airhorn app.

Make sure you are on the correct (final) branch by checking out the master 
branch.

{% highlight bash %}
$ git checkout master
{% endhighlight %}


You can now run the site using either your favorite HTTP server or by using 
Python. This starts a server on localhost.

{% highlight bash %}$ cd app
$ python -m SimpleHTTPServer 3000
{% endhighlight %}

Open up the site in Chrome and you should see.

<img src="images/image01.png" width="624" height="382" />
  

