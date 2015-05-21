---

layout: update
published: true
title: Expand CSS shorthand properties
date: 2015-05-11
article:
  written_on: 2015-05-11
  updated_on: 2015-05-20
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: In the styles pane, you can expand CSS shorthand properties like <code>flex</code>
  or <code>padding</code> and see the full range of properties which are defined for
  you.
featured-image: /web/updates/images/2015-05-19-expand-css-shorthand-properties/expand-shorthand-properties.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/33-expand-shorthand-properties
permalink: /updates/2015/05/11/expand-css-shorthand-properties.html
---
<img src="/web/updates/images/2015-05-19-expand-css-shorthand-properties/expand-shorthand-properties.gif" alt="Expand CSS shorthand properties">

In the styles pane, you can expand CSS shorthand properties like <code>flex</code> or <code>padding</code> and see the full range of properties which are defined for you. E.g.

<pre>
<code>flex: 0 0 45%;
</code>
</pre>

Translates to:

<pre>
<code>flex-grow: 0;
flex-shrink: 0;
flex-basis: 45%;
</code>
</pre>

Just click the small arrow near the shorthand property to expand it.