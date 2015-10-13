---
layout: updates/post
title: "Simple keyboard tricks to use in the Styles Pane"
published_on: 2015-08-24
updated_on: 2015-08-24
tags:
  - devtools
authors:
  - umarhansa
description: "Learn how to effectively navigate the Styles Pane with a few useful keyboard tricks."
featured_image: /web/updates/images/2015-08-21-simple-keyboard-tricks-to-use-in-the-styles-pane/styles-pane-keyboard-tricks.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/61-styles-pane-keyboard-tricks/
---
<img src="/web/updates/images/2015-08-21-simple-keyboard-tricks-to-use-in-the-styles-pane/styles-pane-keyboard-tricks.gif" alt="Simple keyboard tricks to use in the Styles Pane">

You can <kbd class="kbd">Tab</kbd> through the significant portions of a CSS Rule. This includes:

<ul>
<li>A selector (e.g. h1)</li>
<li>A property (e.g. color)</li>
<li>A value (e.g. green)</li>
</ul>

Did you know you can also <kbd class="kbd">Shift + Tab</kbd> to cycle backwards?

Tabbing works through <em>multiple</em> rules.

If you start typing out a new property (like <code>back</code>), you might rely on autocompletion to get <code>background</code>, but you actually end up with <code>background-colour.</code> Even you're in the next field (the value field), simply hit backspace to highlight the previous field, at which point you can fix it.

While on the subject, you can delete a declaration (the property + value) by hitting backspace in either the property or value field and then hitting enter.
