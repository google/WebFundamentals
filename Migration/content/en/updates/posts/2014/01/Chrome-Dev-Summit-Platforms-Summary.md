---
layout: updates/post
title: "Chrome Dev Summit: Platforms Summary"
description: "Platforms"
published_on: 2014-01-10
updated_on: 2014-01-10
authors:
  - sethladd
tags:
  - news
  - platforms
  - pnacl
  - dart
---
# Dart

Dart compiles to JavaScript, sometimes generating code that's faster than hand-written JavaScript. Watch Dart co-founder Kasper Lund explain how the dart2js compiler performs local and global optimizations to emit fast and semantically correct JavaScript code. With tree shaking, type inference, and minification, Dart can help you optimize your web app.

[Slides: Dart](https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?usp=sharing)

{% ytvideo FqsU3TbUw_s %} 

# Chrome Apps

Chrome Apps provide the power and user experience of native apps with the development simplicity and security of the Web, and integrate seamlessly with Google services like Drive. Chrome Apps run on Mac, Windows, Linux, and ChromeOS, as well as iOS and Android, right out of the box.

[Slides: Chrome Apps](https://docs.google.com/presentation/d/1XdSq-xRxPHwbzYKSPZknZ4dYh_TW0h6MYr85Eyt-4NQ/edit?usp=sharing)

{% ytvideo f3NctLbtsNE %} 

# PNaCl

Portable Native Client is a technology that enables portable, secure execution of native applications in Chrome. This extension of the Native Client project brings the performance and low-level control of native code to modern web browsers without sacrificing the security and portability of the web.

PNaCl helps developers produce a platform-independent form of their native application and run it in the browser without any installs. Behind the scenes, Chrome translates PNaCl applications to machine code at runtime to achieve near-native performance. On other browsers, PNaCl applications can use Emscripten and pepper.js to maintain functionality with a minimal performance hit.

[Slides: PNACL](https://docs.google.com/presentation/d/1VAwkh8HoinUHWx49eQLYdqimL4YsCyg-qw6BGe0cj8E/edit#slide=id.p18)

{% ytvideo hfs5p1BKpxQ %} 
