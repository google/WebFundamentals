---
id: webrtc-2015-krankygeek-06-bluemix
showid: webrtc
layout: shows/single-video
collection: webrtc-2015
title: "IBM Bluemix: Mixing voice &amp; data"
description: ""
published: true
showYoutubeID: xkB0qiU6PGk

date: 2015-09-11 12:00:00
article:
  written_on: 2015-09-15
  updated_on: 2015-09-15
---
In this talk, a video call (using the new Twilio video API) is held between a customer and a customer service agent. As the video call is happening, the IBM Watson Speech to Text service transcribes the audio in real time. After the video call completes, the Alchemy API is used to automatically determine which product the customer was giving feedback on and then determines the sentiment of that feedback. The corresponding product's feedback score, a number between 0 and 100, fluctuates based on this feedback. After the score is updated, Business Rules are invoked to determine if the product has crossed a threshold to automatically suggest a review of investment in the product. If the rules suggest a review, a process instance for a change in product investment is then started and managed by the Bluemix Workflow service. This creates a task for a buyer at the company. The buyer can then decide whether to ignore or go through with the review, thus completing the process.

This session is from an afternoon of talks by WebRTC experts, including updates from Google, Mozilla and Microsoft. The event took place at the Google office in San Francisco. More details at http://krankygeek.com.
