---

layout: update
published: true
title: Go to a line number at a specific column
date: 2015-05-19
article:
  written_on: 2015-05-19
  updated_on: 2015-05-19
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: Learn how to jump to specific line numbers in the Sources panel.
featured-image: /web/updates/images/2015-05-19-devtools-go-to-a-line-number-at-a-specific-column/go-to-column.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/9-go-to-column
permalink: /updates/2015/05/19/go-to-a-line-number-at-a-specific-column.html
---
<img src="/web/updates/images/2015-05-19-devtools-go-to-a-line-number-at-a-specific-column/go-to-column.gif" alt="DevTools - Go to a line number at a specific column">

<strong>GOTO</strong> a line number with a specified column using the format <strong>:linenumber:columnnumber</strong> in the <kbd class="kbd">CMD+O</kbd> dialogue from the Sources panel editor.

<ol>
<li>Hit CMD + O from the Sources Panel with an open file</li>
    <li>Enter :5:9</li>
    <li>Notice you are taken to line 5, column 9!</li>
</ol>