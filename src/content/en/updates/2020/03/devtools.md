project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Emulate color vision deficiencies, Dock To Left in the Command Menu, and more.

{# wf_updated_on: 2020-03-10 #}
{# wf_published_on: 2020-03-10 #}
{# wf_tags: chrome82, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Emulate color vision deficiencies, Dock To Left in the Command Menu, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 82) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Emulate vision deficiencies {: #vision-deficiencies }

Open the [Rendering tab](/web/tools/chrome-devtools/evaluate-performance/reference#rendering)
and use the new **Emulate vision deficiencies** feature to get a better idea of how people with
different types of vision deficiencies experience your site.

<figure>
  <img src="/web/updates/images/2020/03/vision.png"
       alt="Emulating blurred vision."/>
  <figcaption>
    Emulating blurred vision.
  </figcaption>
</figure>

DevTools can emulate blurred vision and the following
[types of color vision deficiencies](http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/):

* Protanopia. The inability to perceive red light.
* Protanomaly. A reduced sensitivity to red light.
* Deuteranopia. The inability to perceive green light.
* Deuteranomaly. A reduced sensitivity to green light.
* Tritanopia. The inability to perceive blue light.
* Tritanomaly. A reduced sensitivity to blue light (extremely rare).
* Achromatopsia. The inability to perceive any color except for shades of grey (extremely rare).
* Achromatomaly. A reduced sensitivity to green, red, and blue light (extremely rare).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e847a020093fbd3c367eda02a7008feae5e28641 #}

{# Send feedback to [Chromium issue #1003700](https://crbug.com/1003700). #}

## **Dock to left** in the Command Menu {: #dock-to-left }

Open the [Command Menu](/web/tools/chrome-devtools/command-menu) and run the `Dock to left` command to
move DevTools to the left of your viewport.

![DevTools docked to the left of the viewport](/web/updates/images/2020/03/dock-to-left.png)

Note: DevTools has had the **Dock to left** feature for a long time but it was previously only
accessible from the [**Main Menu**](/web/tools/chrome-devtools/customize/placement#menu).
The new feature in Chrome 82 is that you can now access this feature from the Command Menu.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7ff2e8eda31b86a8e249983f182e20e65c303556 #}

Send feedback to [Chromium issue #1011679](https://crbug.com/1011679).

<!--

## COEP {: #COEP }

{# Not sure if COEP is launching behind a flag in Chrome 82. We usually don't cover web platform or DevTools experiments. #}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a2afe0b0d0b307a2bc2c1a8e9ed5c97f1b89569c #}

Send feedback to [Chromium issue #1051466](https://crbug.com/1051466).

-->

## Lighthouse updates {: #lighthouse }

### The **Audits** panel is now the **Lighthouse** panel {: #audits }

The DevTools and Lighthouse teams frequently got feedback from web developers that they
would hear that it's possible to run [Lighthouse](/web/tools/lighthouse) from DevTools, but when
they went to try it out they couldn't find the "Lighthouse" panel, so the **Audits** panel is now the
**Lighthouse** panel.

![The Lighthouse panel](/web/updates/images/2020/03/lighthouse.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ae53ef04d84c4201836eb63238e97bc180ea54d #}

<!--

### New audits {: #new-audits }

New audits:

* [CLS](https://github.com/GoogleChrome/lighthouse/commit/a8a0f8fd369faaa23b97d8803bfc220db31e4769#diff-eb7e207cabf22c8000b5abe8f18c6daf)
* [Legacy JS](https://github.com/GoogleChrome/lighthouse/pull/10303)
* [Maskable icon](https://github.com/GoogleChrome/lighthouse/pull/10370)
* [Duplicate JS](https://github.com/GoogleChrome/lighthouse/commit/ea9d226606c5b534d4259253baac5f709a9e3d7c#diff-eb7e207cabf22c8000b5abe8f18c6daf)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/933525c2bdcf22d49b5688c04cad7bc30c476b3d #}

Send feedback to [Chromium issue #772558](https://crbug.com/772558).

-->

## Delete all Local Overrides in a folder {: #overrides }

After setting up [Local Overrides](/web/updates/2018/01/devtools#overrides) you can now
right-click a folder and select the new **Delete all overrides** option to delete all
Local Overrides in that folder.

![Delete all overrides](/web/updates/images/2020/03/overrides.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0fc949c8b168dea42d12432f4591ee4c5dabb9a5 #}

Send feedback to [Chromium issue #1016501](https://crbug.com/1016501).

## Updated Long tasks UI {: #long-tasks }

A [Long Task](https://web.dev/long-tasks-devtools/#what-are-long-tasks) is JavaScript code that
monopolizes the main thread for a long time, causing a web page to freeze.

You've been able to [visualize Long Tasks in the Performance panel](https://web.dev/long-tasks-devtools/#are-there-long-tasks-in-my-page-that-could-delay-interactivity)
for a while now, but in Chrome 82 the Long Task visualization UI in the Performance panel has been updated.
The Long Task portion of a task is now colored with a striped red background.

![The new Long Task UI](/web/updates/images/2020/03/long-task.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e19afdbb2fb24f4123dc7b8b62f38d359ff2d916 #}

Send feedback to [Chromium issue #1054447](https://crbug.com/1054447).

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
