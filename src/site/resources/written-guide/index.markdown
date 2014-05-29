---
layout: default
title: "Written Style Guide"
description: "Written style guide"
class: "page--styleguide"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 3
collection: resources
---

{% wrap content %}

{% include modules/breadcrumbs.liquid %}

# {{ page.title }}

{% include modules/toc.liquid %}


## Capitalization and naming
  * Across the site, for hyphenated words, capitalize as if the hyphens weren't there (e.g., "Multi-Device" and "Peer-to-Peer").

### Website section titles
  * Title case capitalization (e.g., "Multi-Device Layouts" not "Multi-device layouts").
  * Avoid verbs in top-level section titles.

### Article titles
  * Title case capitalization (e.g., "Responsive Web Design Basics" not "Responsive web design basics").
  * Use imperative verbs when possible (e.g., "Set the viewport" not "Setting the viewport").

### Headlines within articles
  * Sentence case for headlines in articles: "Use placeholders for images".
  * Use imperative verbs when possible (e.g., "Set the viewport" not "Setting the viewport").

## Linking to external articles
  * Related reading to our articles: Add them in.
  * Don't lean on external resources; bring content into your article when necessary (e.g., link to API reference, but not to an explanatory from another developer).

## "Mobile" vs. "multi-device" vs "multi-screen" vs "mobile-only" vs "mobile-first"
  * Use "multi-device" for consistency except when a different term is needed for precision.

## Article length
  * One key "concept" per article (e.g., "use the correct input type in your forms").

## Tone of voice
  * Active, rather than passive.
  * Use present tense, unless referring to the future event (e.g., future bug fix).
  * Informal pronouns and abbreviations, when it simplifies text, but don't over-use.
  * Avoid unnecessary adjectives.

## Code samples
  * Every article should have at least one nontrivial use-case-based example.

## Key takeaways / TL;DR
  * One section of TL;DRs per article.
  * Use the name "TL;DR", not "Key takeaways".
  * Keep each of them brief.

## Media
  * All images need to be in 3:5 or 5:3 ratio.
  * Images will be compressed for you during the deployment step. You do not need to worry about compressing your own images.

{% endwrap %}
