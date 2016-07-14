---
layout: shows/episode
title: "Instant Mobile Web Apps"
description: "Bryan talked through how the team at Google went through the process of identifying and prioritizing the assets for the PageSpeed Insights website, taking it from a 20 second load time to just over 1 second!"
youtubeID: VKTWdaupft0

published_on: 2015-02-24
updated_on: 2015-02-24

---

The Critical Rendering Path refers to anything (JavaScript, HTML, CSS, images) that the browser requires before it is able to begin painting the page. Prioritizing the delivery of assets on the critical rendering path is a must, particularly for users on network-constrained devices such as smartphones on cellular networks. Bryan talked through how the team at Google went through the process of identifying and prioritizing the assets for the PageSpeed Insights website, taking it from a 20 second load time to just over 1 second!

[Slides](https://docs.google.com/a/google.com/presentation/d/1z49qp03iXAJIkbXaMtCmWW_Pnnq-MzXGW139Xw8-paM/edit#slide=id.g1764b26cd_043)

+ Eliminate render-blocking JavaScript and CSS.
+ Prioritize visible content.
+ Load scripts asynchronously.
+ Render the initial view server-side as HTML and augment with JavaScript.
+ Minimize render-blocking CSS; deliver only the styles needed to display the initial viewport, then deliver the rest.
+ Large data URIs inlined in render-blocking CSS are harmful for render performance; they are blocking resources where image URLs are non-blocking.
