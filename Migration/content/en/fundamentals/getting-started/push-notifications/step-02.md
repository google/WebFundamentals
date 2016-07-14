---
layout: shared/narrow
title: "Run a local web server"
description: "Set up and run a local web server"
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 2
authors:
  - samdutton
---

**Start up a web server on localhost**

To complete this codelab you will need to run a local web server. You may
already have your own setup for this. Otherwise open a terminal window,
navigate to the **_push-notifications_** directory you created when you
downloaded the code (in the previous step) and run the following Python command to start a server:

{% highlight bash %}
$ python -m SimpleHTTPServer
{% endhighlight %}

This will start a web server on the default HTTP port. Navigate to [localhost](http://localhost) from your browser to see a listing for the top level **_push-notifications_** directory.

To view your own work in the **_app_** directory, navigate to [localhost/app](http://localhost/app). To view the examples of completed code for each step, navigate to the directories in [localhost/completed](http://localhost/completed).

If you don't have Python, you can get it [here](https://www.python.org/downloads/). If there are problems starting the server, [check](https://www.google.com/search?q=what+is+using+port) that there is not another service using the port chosen by SimpleHTTPServer.

The command line examples in this codelab use the bash shell.

Windows users will need to use MS-DOS commands from a Command Prompt window: check this guide for equivalent DOS/bash commands. Alternatively, you may want to use the Cygwin environment.

 Alternatively, you may prefer to use web server stacks such as [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/).
