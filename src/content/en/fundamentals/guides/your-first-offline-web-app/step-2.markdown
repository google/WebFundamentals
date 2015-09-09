---
layout: shared/plain
title: "Run the sample app"
description: ""
introduction: ""
notes:
  styling:
    - Styling will come later

written_on: 2014-04-17
updated_on: 2014-04-23
order: 2

translation_priority: 0

authors:
  - paulkinlan
translators:
related-guides:
key-takeaways:
---
{% include shared/toc.liquid %}

First, let's see what the finished sample app looks like (hint, it is amazing). 
With the code downloaded, the following instructions describe how to build and 
start testing the Airhorn app.

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
  
{% include fundamentals/lessons_toc.liquid %}