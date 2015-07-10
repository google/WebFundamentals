---
id: adventuremachine
layout: spotlight
collection: spotlight
type: spotlight
published: false

date: 2015-07-16
article:
  written_on: 2015-07-16
  updated_on: 2015-07-16
authors:
  - pbakaus

tags: 
- music
- promotion
scores:
  pagespeed:
      speed: 53
      ux: 90
  webpagetest:
      value: 33914
      result: http://www.webpagetest.org/result/150710_W2_CY/

title: "Madeon Adventure Machine"
link: http://www.madeon.fr/adventuremachine/
developer: ??? ???

description: "A clever promotion for Madeon's new album that is a fun drum machine."
pros: |
  The Adventure Machine is a really simple app, but it does its job quite well. By utilizing Web Audio and optionally Web Midi (yes – you can connect your own synthesizer!), the newly created loops that appear by the touch of a button sync perfectly, and the interface works well on mobile, especially when installed to homescreen.
cons: |
  Due to the precaching of all beats and loops, the load time on mobile 3G is abysmal (see WebPageTest score), ignoring gzip compression is lazy, and the touch targets are slightly too small for smaller screens.

interview:
  - question: Why the web?
    answer: |
      We wanted the project to available to as many people as possible all around the world. We also wanted as many people to interact with it as possible, so needed to remove every potential barrier to entry.
  - question: What worked really well during development?
    answer: |
      We used the Web MIDI API for the first time for this project. Interacting with a website using a MIDI instrument is an amazing feeling.
  - question: If you could have any API to improve your app, what would it be?
    answer: |
      For this web app, tbh, there are ways we could improve it, but there are already APIs we could use to help with this.
      
  - question: |
      What happened after launch?
    answer: |
      It got to #2 on the front page of reddit, and had almost half a million users within the first month. It also generated a substantial number of album sales and tour ticket purchases. It exceeded all hopes and expectations.
---