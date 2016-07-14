---
layout: shared/narrow
title: "Custom Tags"
description: "This is a list of custom tags currently in use on /web on Google Developers"
order: 5
---
# Include Code

There are three variables you can set with the include_code element:

- src
  - This is the relative path of the code file
- snippet
  - This is the name of the code snippet you wish to use
- lang
  - This is to define the language of the snippet

We'll look at each of these in more detail below.

### Basic Example

Includes the entire contents of a file

<pre>&#123;% include_code src=_code/example.js %&#125;</pre>

{% include_code src=_code/example.js %}

### Defining a Snippet

You can define a snippet to extract a particular portion
of a code sample.

The snippet is defined in example.html like so:

{% highlight html %}
<!-- // [START examplesnippet] -->
<header>
  <h1>Mobile Web Development</h1>
  <p>Building Mobile Web Experiences</p>
</header>
<!-- // [END examplesnippet] -->
{% endhighlight %}

You can then add it to a page with:

<pre>&#123;% include_code src=_code/example.html snippet=examplesnippet %&#125;</pre>

The result is:

{% include_code src=_code/example.html snippet=examplesnippet %}

The special snippet comments are removed from the code in the final docs.

### Defining the Language of Code

<pre>&#123;% include_code src=_code/example.js snippet=classdefinition lang=javascript %&#125;</pre>

{% include_code src=_code/example.js snippet=classdefinition lang=javascript %}

## Link Sample

The link sample takes a code sample and creates an anchor with the
appropriate link to the sample based on the current environment (development,
  staging or production).

This is the same as the link sample button except it's styled as a normal
link rather than a button.

<pre>&#123;% link_sample _code/mse-gap.html %&#125;
  Demo
&#123;% endlink_sample %&#125;</pre>

{% link_sample _code/mse-gap.html %}Demo{% endlink_sample %}


# Link Sample button

The link sample button takes a code sample and creates an anchor with the
appropriate link to the sample based on the current environment (development,
  staging or production).

This is the same as the link sample except it's styled as a button rather than
a link.

<pre>&#123;% link_sample_button _code/mse-gap.html %&#125;
  Demo
&#123;% endlink_sample_button %&#125;</pre>

{% link_sample_button _code/mse-gap.html %}
  Demo
{% endlink_sample_button %}



# YouTube Video

The ytvideo tag should always be used when adding a youtube video to
a markdown page. This provides a standard size / look and feel to YouTube
embeds.

### Tag usage

<pre>&#123;% ytvideo 2eu23_if6Lw %&#125;</pre>

{% ytvideo 2eu23_if6Lw %}

You can add additional arguments to the end of the youtube embed by adding
them to the end of the tag.

<pre>&#123;% ytvideo 2eu23_if6Lw start=41 %&#125;</pre>

{% ytvideo 2eu23_if6Lw start=41 %}
