---
rss: false
layout: update
published: true
title: Select and execute a block of code in the Sources Panel
date: 2015-07-17
article:
  written_on: 2015-07-17
  updated_on: 2015-07-17
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: 'Use the shortcut <kbd class="kbd">Ctrl + Shift + E</kbd> to run a block
  of highlighted code in the Sources Panel. '
featured-image: /web/updates/images/2015-07-17-select-and-execute-a-block-of-code-in-the-sources-panel/run-highlighted-code-block.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/45-run-highlighted-code-block
permalink: /updates/2015/07/17/select-and-execute-a-block-of-code-in-the-sources-panel.html
---
<img src="/web/updates/images/2015-07-17-select-and-execute-a-block-of-code-in-the-sources-panel/run-highlighted-code-block.gif" alt="Select and execute a block of code in the Sources Panel">

You can use the shortcut <kbd class="kbd">Ctrl + Shift + E</kbd> to run a block of highlighted code in the Sources Panel. In the clip, I am paused at a breakpoint, and want to access a bunch of variables attached to the <code>this</code> keyword. I select the block where they're defined and change:

<pre>
<code>this.foo = 'hello'
this.bar = 'world'</code></pre>

Into

<pre>
<code>foo = 'hello'
bar = 'world'</code></pre>

Finally, I execute that changed block of code so I have <code>foo</code> and <code>bar</code> in scope and can use them while debugging.




		