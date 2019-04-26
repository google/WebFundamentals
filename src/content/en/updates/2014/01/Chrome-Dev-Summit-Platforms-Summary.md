project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Platforms

{# wf_updated_on: 2019-03-16 #}
{# wf_published_on: 2014-01-09 #}
{# wf_tags: news,platforms,pnacl,dart #}
{# wf_blink_components: N/A #}

# Chrome Dev Summit: Platforms Summary {: .page-title }

{% include "web/_shared/contributors/sethladd.html" %}


## Dart

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="FqsU3TbUw_s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Dart compiles to JavaScript, sometimes generating code that's faster than hand-written JavaScript. Watch Dart co-founder Kasper Lund explain how the dart2js compiler performs local and global optimizations to emit fast and semantically correct JavaScript code. With tree shaking, type inference, and minification, Dart can help you optimize your web app.

[Slides: Dart](https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?usp=sharing)

<div style="clear:both;"></div>

## Chrome Apps

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="f3NctLbtsNE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Chrome Apps provide the power and user experience of native apps with the development simplicity and security of the Web, and integrate seamlessly with Google services like Drive. Chrome Apps run on Mac, Windows, Linux, and ChromeOS, as well as iOS and Android, right out of the box.

[Slides: Chrome Apps](https://docs.google.com/presentation/d/1XdSq-xRxPHwbzYKSPZknZ4dYh_TW0h6MYr85Eyt-4NQ/edit?usp=sharing)

<div style="clear:both;"></div>

## PNaCl

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="hfs5p1BKpxQ"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Portable Native Client is a technology that enables portable, secure execution of native applications in Chrome. This extension of the Native Client project brings the performance and low-level control of native code to modern web browsers without sacrificing the security and portability of the web.

PNaCl helps developers produce a platform-independent form of their native application and run it in the browser without any installs. Behind the scenes, Chrome translates PNaCl applications to machine code at runtime to achieve near-native performance. On other browsers, PNaCl applications can use Emscripten and pepper.js to maintain functionality with a minimal performance hit.

[Slides: PNACL](https://docs.google.com/presentation/d/1VAwkh8HoinUHWx49eQLYdqimL4YsCyg-qw6BGe0cj8E/edit#slide=id.p18)

<div style="clear:both;"></div>

