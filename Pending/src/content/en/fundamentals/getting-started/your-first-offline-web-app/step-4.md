


Go back to the command line and switch from `master` to the `code-lab` branch:

{% highlight bash %}
git checkout code-lab
{% endhighlight %}

This will remove all assets that were supplying offline functionality so you can add them back in by following the tutorial.

Additionally, you will need to unregister the service worker. In Chrome you can do this by visiting `chrome://serviceworker-internals/` and clicking the **Unregister** button underneath the appropriate URL.



