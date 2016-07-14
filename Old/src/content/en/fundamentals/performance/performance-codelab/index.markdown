---
layout: shared/narrow-pages-list
title: "Performance codelab"
description: "In this codelab, you will learn how to identify and fix web app performance bottlenecks."
published_on: 2015-10-01
updated_on: 2015-10-01
order: 3
translation_priority: 1
authors:
  - megginkearney
---

<p class="intro">
Apps whose displays tend to jump raggedly during animations, 
scrolling, or other user interaction suffer from a performance issue
commonly called <i>jank</i> or <i>judder</i>.
Jank is an annoying distraction for users;
it interrupts the users' flow of thought and
it makes the app look less polished and professional.
</p>

If the browser takes too long to make and display a frame, it gets skipped 
and you don't see the frame at all. Instead, you see the next one (or the one 
after that), and the object jumps across the gap instead of smoothly moving 
through it.

The jank phenomenon can be avoided by ensuring that an app runs at a 
consistent sixty frames per second (60fps). Many factors contribute to an 
app's frame rate, and there are various ways to code JavaScript and CSS to 
reduce or eliminate jank and achieve the desired rate.

## What you'll learn in this codelab

This codelab is about changing the way you approach app performance issues
by helping you find and fix frame display bottlenecks that cause jank.
You will learn:

* How to identify application code that causes display performance bottlenecks
* How to analyze and modify the code to reduce or eliminate the bottlenecks

The codelab is a text-based version of part of the content covered in a 
Udacity course on app/web performance 
([ud860](https://www.udacity.com/course/viewer#!/c-ud860/l-4138328558/m-4157078575)).
Rather than a transcription of the video course, this codelab is meant to be 
a lean, to-the-point treatment of jank identification and correction, using 
the course's original hands-on final project.

## What you should know before you start

* _Critical rendering path_: You should understand the rendering pipeline and 
how JavaScript and CSS affect it. Learn more here: [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) and here: Udacity course on [Website Performance Optimization: The Critical Rendering Path](https://www.udacity.com/course/website-performance-optimization--ud884).
* _Frames and frame rate_: You should know how the browser constructs frames and why the 60fps rate is important for a smooth display. Learn more here: [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) and here: Udacity course on [Browser Rendering Optimization: Building 60 FPS Web Apps](https://www.udacity.com/course/browser-rendering-optimization--ud860).
* _Application life cycle_: You should understand the Load, Idle, Animate, and Response parts of a running app and recognize the windows of opportunity that each part presents. Learn more here: [The RAIL Performance Model](/web/tools/chrome-devtools/profile/evaluate-performance/rail).
* _Chrome DevTools_: You should have a basic understanding of DevTools and how to use them to analyze a web app, especially the Timeline tool. Learn more here: [Analyze Runtime Performance](/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime).

## What you'll need in your development workspace

* Google Chrome browser, DevTools
* The sample code for the hands-on project (see [About the project app](step-01))

## Jank/Judder

Let's get familiar with jank by playing a game, "Jank Invaders" by Jake Archibald. It's designed to demonstrate problems with frame rates and performance. Here's a screen shot.

<figure>
  <img src="images/image07.png" alt="Jank Invaders game">
</figure>

In the game, spaceships move across the screen. The good guys move smoothly, while the bad guys ("spy ships") are janky. Your mission: identify and shoot down the ten janky spy ships among the smooth ones by clicking them as quickly as you can. [Here's the link to the game](https://www.google.com/url?q=http://jakearchibald.github.io/jank-invaders). Go ahead, have fun; come back when you're finished.

Clearly, users notice jank and almost invariably choose apps that perform better, and it's no different with the web: bad performance kills good sites. This codelab will help you think about your projects' performance and explore how to identify and correct common issues. You'll hunt down causes of sticky scrolling, flickering updates, and juddering animations, with the goal of reaching a smooth and seamless 60fps frame rate.
