---
layout: shared/narrow
title: "About the project app"
description: "Download the project app as a .zip file or clone it from GitHub."
published_on: 2015-09-28
updated_on: 2015-09-28
order: 1
translation_priority: 1
authors:
  - megginkearney
---

<p class="intro">
  Let's begin by taking a look at the app that you'll be debugging in this 
  codelab. It looks like this.
</p>

<figure>
  <img src="images/image08.png" alt="Hacker News app">
</figure>

This site uses the _Hacker News API_ to show recent stories and their scores. 
Right now the app's performance is very poor, especially on mobile, but there's 
no reason it shouldn't be hitting 60fps. By the end of this codelab, you'll 
have the skills, techniques, and -- most importantly -- the mindset needed to 
turn this janky app into an attractive and efficient 60fps experience.

## Get the Project Code

First, you should get the application code, both the "before" and "after" 
versions. You can either clone the repositories or just download the zip files.

*   Here is the original app with performance bottlenecks in a [GitHub repository](https://github.com/udacity/news-aggregator); also, here's the [live site](http://udacity.github.io/news-aggregator) if you'd like to see it. This is the version you'll work on.
*   Here is the completed app without performance bottlenecks in a [GitHub repository](https://github.com/udacity/news-aggregator/tree/solution). You can use this corrected version for reference.

## Run the original app

First, get the original janky version of the app up and running. In Chrome, 
open `index.html` in the top-level folder (e.g., `news-aggregator-master`). 
Experiment with the app a bit; you'll quickly notice a couple of the 
high-level performance problems in the two major user interactions, scrolling 
within the main screen and story slide-in/out. We'll focus on those main 
issues to see how we can improve this janky app's performance.
