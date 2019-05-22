project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The prefers-color-scheme media feature is used to detect if the user has requested the system use a light or dark color theme.

{# wf_updated_on: 2019-05-22 #}
{# wf_published_on: 2019-05-06 #}
{# wf_tags: media-queries, dark-mode #}
{# wf_featured_image: /web/updates/images/2019/05/prefers-color-scheme/moon.svg #}
{# wf_featured_snippet: The prefers-color-scheme media feature is used to detect if the user has requested the system use a light or dark color theme. #}
{# wf_blink_components: Blink>CSS #}

# Hello Darkness, My Old Friend: Dark Theme is Here {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

## Background

<figure class="attempt-right">
  <img style="height:175px; width:auto;" src="/web/updates/images/2019/05/prefers-color-scheme/green-screen.jpg" alt="Green screen computer monitor" intrinsicsize="640x480">
  <figcaption><b>Fig. 1</b> Green screen (<a href="https://commons.wikimedia.org/wiki/File:Compaq_Portable_and_Wordperfect.JPG">Source</a>)</figcaption>
</figure>

We have gone full circle with dark mode.
In the dawn of personal computing, dark mode wasn't a deliberate choice,
but purely a matter of fact:
Monochrome Cathod-Ray Tube (CRT) computer monitors work by firing electron beams
on a phosphorescent screen, and as the phospor that these early CRTs used was green,
they were oftentimes referred to as
[green screens](https://commons.wikimedia.org/wiki/File:Schneider_CPC6128_with_green_monitor_GT65,_start_screen.jpg).
Information like text was displayed in green, and the rest of the screen was black.

The subsequently introduced Color CRTs display multiple colors
through the use of red, green, and blue phosphors.
They create white by activating all three phosphors simultaneously.
With the advent of more sophisticated *What You See Is What You Get* (WYSIWYG)
[desktop publishing](https://en.wikipedia.org/wiki/Desktop_publishing),
the idea of making the document resemble a physical sheet of paper became popular.
This is where *dark-on-white* as a design trend started,
and this trend was carried over to the document-based web.
To the present day, web pages and apps are typically designed with dark text on a light background,
a baseline assumption that is also hard-coded in User-Agent (UA) stylesheets like
[Chrome's](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css).

<figure class="attempt-right">
  <img style="height:175px; width:auto;" src="/web/updates/images/2019/05/prefers-color-scheme/word-processing.jpg" alt="Dark-on-white word processing" intrinsicsize="698x551">
  <figcaption><b>Fig. 2</b> Dark-on-white (<a href="https://www.youtube.com/watch?v=qKkABzt0Zqg">Source</a>)</figcaption>
</figure>

Today, a lot of content consumption and creation has shifted to mobile devices
that use LED backlit LCD or energy-saving AMOLED screens, and on the desktop as well
(which can be a full PC or a laptop), the days of CRTs are long over.
With such smaller and more transportable computers, tablets, and smartphones,
new usage patterns have evolved, like people using their devices in their beds at night-time,
and tasks like coding or high-end gaming frequently happen after-hours in dim environments.
The more people use their devices in the dark, and even more since Apple has introduced
[Dark Mode in macOS Mojave](https://support.apple.com/en-us/HT208976) on the desktop,
the idea of going back to the roots of *light-on-dark* is becoming increasingly popular again.

## Why Dark Mode

When people get asked
[why they like or want dark mode](https://medium.com/dev-channel/let-there-be-darkness-maybe-9facd9c3023d),
the most popular response is that *"it's easier on the eyes,"*
followed by *"it's elegant and beautiful."*
Apple in their
[Dark Mode developer documentation](https://developer.apple.com/documentation/appkit/supporting_dark_mode_in_your_interface)
explicitly write: *"The choice of whether to enable a light or dark appearance
is an aesthetic one for most users, and might not relate to ambient lighting conditions."*

<figure class="attempt-right">
  <img style="height:225px; width:auto;" src="/web/updates/images/2019/05/prefers-color-scheme/closeview.png" alt="CloseView in Mac OS System 7 with \"White on Black\" mode" intrinsicsize="531x618">
  <figcaption><b>Fig. 3</b> System&nbsp;7 CloseView (<a href="https://archive.org/details/mac_Macintosh_System_7_at_your_Fingertips_1992">Source</a>)</figcaption>
</figure>

However, there're also people who actually need dark mode or other accessibility tools,
for example, users with low vision.
The earliest occurrence of such a tool I could find is
[System&nbsp;7](https://en.wikipedia.org/wiki/System_7)'s *CloseView* feature that had a toggle for
*"Black on White"* and *"White on Black,"* which arguably can be called dark mode.
While System&nbsp;7 supported color, the default user interface was still black-and-white.
You can actually
experience System&nbsp;7 live thanks to the
[Internet Archive](https://archive.org/details/mac_MacOS_7.0.1_compilation)
(unfortunately the *CloseView* feature was on a separate floppy disk not part of the emulation).
These simple inversion-based implementations started to suffer the moment color was introduced.
User research by Szpiro *et al.* on
[how people with low vision access computing devices](https://dl.acm.org/citation.cfm?id=2982168)
showed that all interviewed users disliked inverted images, however,
that some preferred light text on a dark background.
On its mobile devices, Apple accomodates for this shortcoming with a feature called
[Smart Invert](https://www.apple.com//accessibility/iphone/vision/)
that reverses the colors on the display, except for images, media,
and some apps that use dark color styles.

Computer Vision Syndrome, also known as Digital Eye Strain, is
[defined](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1475-1313.2011.00834.x)
as *"the combination of eye and vision problems associated with the use of computers
(including desktop, laptop and tablets) and other electronic displays (e.g.
smartphones and electronic reading devices)."*
It has been [proposed](https://bmjopen.bmj.com/content/5/1/e006748)
that the use of electronic devices by adolescents, particularly at night time,
leads to an increased risk of shorter sleep duration,
longer sleep-onset latency, and increased sleep deficiency.
Additionally, exposure to blue light has been widely
[reported](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4254760/)
to be involved in the regulation of circadian rhythm and the sleep cycle,
and irregular light environments may lead to sleep deprivation,
possibly affecting mood and task performance, according to
[Rosenfield](https://www.college-optometrists.org/oip-resource/computer-vision-syndrome--a-k-a--digital-eye-strain.html).
To limit these negative effects, limiting blue light by adjusting the display color temperature
through features like iOS' [Night Shift](https://support.apple.com/en-us/HT207570) or Android's
[Night Light](https://support.google.com/pixelphone/answer/7169926?) can help,
as well as avoiding bright lights or irregular lights in general through dark themes or dark modes.

## Supporting Dark Mode

[Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
allow authors to test and query values or features of the user agent or display device,
independent of the document being rendered.
They are used in the CSS `@media` rule to conditionally apply styles to a document,
and in various other contexts and languages, such as HTML and JavaScript.
[Media Queries Level&nbsp;5](https://drafts.csswg.org/mediaqueries-5/)
introduces so-called user preference media features, that is,
a way for sites to detect the user's preferred way to display content.

Note: An established user preference media feature is `prefers-reduced-motion`
that lets you detect the desire for less motion on a page.
If you're interested, I have written about
[`prefers-reduced-motion`](/web/updates/2019/03/prefers-reduced-motion) before.

The `prefers-color-scheme` media feature is used to detect
if the user has requested the page to use a light or dark color theme.
It takes the following values:

- `no-preference`:
  Indicates that the user has made no preference known to the system.
  This keyword value evaluates as false in the
  [boolean context](https://drafts.csswg.org/mediaqueries-5/#boolean-context).
- `light`:
  Indicates that the user has notified the system that they prefer a page that has a light theme
  (dark text on light background).
- `dark`:
  Indicates that the user has notified the system that they prefer a page that has a dark theme
  (light text on dark background).

## Dark Mode Best Practices

## Related Links

- Resources for the `prefers-color-scheme` media query:
    - [Chrome Platform Status page](https://chromestatus.com/feature/5109758977638400)
    - [Chromium bug](https://crbug.com/889087)
    - [Media Queries Level&nbsp;5 spec](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme)
- Resources for the `supported-color-schemes` meta tag and CSS property:
    - [Chrome Platform Status page](https://chromestatus.com/feature/5330651267989504)
    - [Chromium bug](http://crbug.com/925935)
    - [CSS WG GitHub Issue for the meta tag and the CSS property](https://github.com/w3c/csswg-drafts/issues/3299)
    - [HTML WHATWG GitHub Issue for the meta tag](https://github.com/whatwg/html/issues/4504)

## Acknowledgements

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
