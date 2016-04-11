---
layout: shared/root
published: false
description: "Building Web Apps for the Next Billion Users"
title: "Building Web Apps for the Next Billion Users"
translation_priority: 0
---

<style>
.mdl-layout__content {
    padding: 20px 0 0 100px;
    }
</style>

<p class="intro">The next billion people coming online will be more diverse than ever, in every respect: physical location, cultural experience, device types, computer expertise and access to connectivity.
<br><br>
They will virtually all be mobile users.
</p>

This situation presents unique challenges for web developers, who must abandon the limited "mobile first" approach in favor of a comprehensive "mobile only" strategy.

Developers can address these challenges by focusing on specific areas.


## Connectivity

### Challenge

Many people have limited connectivity through geographical isolation or connection expense, and will regularly experience slow, intermittent, or no connectivity, either by necessity or by choice.

### Solutions

* Design for low-connectivity scenarios.
* Reduce resource requests.
* Plan for offline.
* Make installs and updates as small and fast as possible.
* Avoid load failures due to low bandwidth.

[Learn more](.)


## Content

### Challenge

Large-layout, graphics-heavy content frustrates users and discourages them from using your app. Content that is too wide or too tall is overlooked by some users and deliberately avoided by others.

### Solutions

* Design for small screens.
* Downscale or eliminate images.
* Make optional sections (navigation, sidebars, etc.) hidden but accessible.
* Chunk long content into pages.
* Embrace minimalist writing.

[Learn more](.)


## Power Consumption

### Challenge

Many people — even those in urban areas — don't always have access to a reliable, consistently available, affordable power supply. This makes power conservation a critical factor in all app and content design.

### Solutions

* Design to reduce battery usage.
* Avoid screen repaints, content reflows, and required reorientations.
* Simplify graphics and colors.
* Minimize network requests.
* Reduce the number of user actions (and thus time and battery) required to access content.
* Use hardware acceleration wherever possible.

[Learn more](.)


## Data Usage

### Challenge

High data cost is often a greater barrier to access than poor connectivity. Mobile users are cost-conscious; even "unlimited" plans can become expensive when roaming or if unexpected fees are applied.

### Solutions

* Design for low data transmission.
* Understand the cost of loading page and app components.
* Reduce the amount of data retrieval required for user interaction.
* Streamline navigation.
* Download critical information first.
* Minimize uploading wherever possible.

[Learn more](.)


## Commerce

### Challenge

Monetized apps face problems that are common to emerging markets, both urban and rural. Many people do not have bank accounts or credit cards. Many payment UIs do not work well on small screens or with unreliable connectivity.

### Solutions

* Design for multiple monetization options, including local banking, credit/debit cards, web banking (such as PayPal), and COD.
* Streamline payment UI for efficient use.
* Design orientation-friendly layout for small-screen devices.
* Make transactions resilient to poor connectivity.

[Learn more](.)


## Localization

### Solutions

English is not the first language of most people online — and US or European cultural conventions may not be familiar or intuitive. Instructions or prompts that are succinct and compact in English may be verbose and obtrusive when viewed in other languages.

### Solutions

* Design for localization.
* Store text in string tables.
* Use "plain English" (e.g., ASD-STE) language construction.
* Avoid slang, technical terms, and acronyms.
* Be aware of cultural issues such as colors, icons, and gestures.
* Minimize use of font variants that may not render well in non-English alphabets.

[Learn more](.)
