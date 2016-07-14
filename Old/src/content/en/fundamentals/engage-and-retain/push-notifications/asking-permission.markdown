---
layout: shared/narrow
title: "Asking permission for notifications"
description: "There's more to requesting permission than throwing up a dialog box."
published_on: 2015-10-01
updated_on: 2016-01-05
order: 3
authors:
  - josephmedley
translation_priority: 1
---

<p class="intro">
  There's more to requesting permission than throwing up a dialog box. 
</p>

{% include shared/toc.liquid %}

## Prefer logged in users

If you don't know who your users are it's hard to send them relevant 
notifications. And if notifications aren't relevant, users might 
regard them as spam.

## Trigger from a specific action

Ask for permission to send notifications in response to a specific, 
contextual user interaction. This allows you to tie your notifications 
to a user's goal and makes it clear to the user why you want to send 
notifications. 

For example, If an airline site wanted to notify users of flight delays, 
they would prominently display an opt-in checkbox and only ask for 
notification permissions after the user chooses to opt in.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/airline-prompt.png" alt="Prominently display an opt-in checkbox">
    <figcaption>First, show an opt-in to send notifications.</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/airline-permissions.png" alt="Prominently display an opt-in checkbox"> 
    <figcaption>Only after the user has opted in, ask for permission.</figcaption>
  </figure>
</div>

## Clarify page-load permission requests

We discourage sites from requesting notification permissions during page load.
They can be distracting, spammy, and unclear. If your app requests 
notifications during `onload`, make it clear why you're asking. Dim out 
the screen and add an overlay that explains the reason for the request.

For example:

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/news-prompt.png" alt="Prominently display an opt-in">
    <figcaption>Display an opt-in with an explanation of why you're asking</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/news-permissions.png" alt="Prominently display an opt-in checkbox"> 
    <figcaption>Only then, request permission.</figcaption>
  </figure>
</div>

## Provide a place to manage notifications

Make it easy for users to change and even disable notifications for your site. It prevents users from killing notifications at the browser or device level. 

Add a link to notification settings in a place with high visibility. You could use the site navigation drawer, for example. 

![A high-visibility settings link](images/news-drawer.png)

If your site uses different kinds of notifications, users should be able to toggle them individually.

![Toggle different kinds of notifications](images/news-options.png)
