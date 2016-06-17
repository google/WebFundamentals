---
layout: shared/narrow
title: "Configure and Customize DevTools"
description: "Change the appearance of DevTools and access hidden features."
published_on: 2016-03-29
updated_on: 2016-03-29
order: 1
authors:
  - kaycebasques
translation_priority: 0
key-takeaways:
  tldr:
    - "Open the Main and Settings menus."
    - "Customize the appearance of DevTools."
    - "Access hidden features."
---

<p class="intro">Change the appearance of DevTools and access hidden 
features.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Open the Main Menu {#main-menu}

The **Main Menu** of DevTools is a dropdown menu for configuring how
DevTools looks, accessing additionals tools, opening the Settings, and more.

To open the Main Menu, click on the **Main Menu** button in the top-right
of the DevTools window.

![main menu](images/main-menu.png)

## Open the Settings {#settings}

To open the DevTools Settings, press <kbd>F1</kbd> while DevTools is in focus,
or [open the Main Menu](#main-menu) and then select **Settings**.

## Reorder panel tabs {#panel-tabs}

Click, hold, and drag a panel tab to change its ordering. Your custom tab order
persists across DevTools sessions.

For example, by default the **Network** tab is usually the fourth to the left.

![before reorder](images/before-reorder.png)

You can drag it to any position, such as the first to the left.

![after reorder](images/after-reorder.png)

## Customize DevTools placement {#placement}

You can dock DevTools on the bottom of the page, to right of the page, or 
you can open it in a new window. 

To change the DevTools' placement, [open the Main Menu](#main-menu) and select
the **Undock into separate window** 
(![undock button](images/undock.png){:.inline})
button, **Dock to bottom** 
(![dock to bottom button](images/dock-bottom.png){:.inline})
button, or 
**Dock to right** 
(![dock to right button](images/dock-right.png){:.inline})
button. 

## Use dark theme {#dark-theme}

To use a dark DevTools theme, [open DevTools' Settings](#settings),
go to the **Preferences** page, find the **Appearance** section, and then
select **Dark** from the **Theme** dropdown menu.

![dark theme](images/dark-theme.png)

## Open and close drawer tabs {#drawer-tabs}

Press <kbd>Esc</kbd> to open and close the DevTools **Drawer**. The screenshot
below shows an example of the **Elements** panel while the **Console** Drawer
is open on the bottom.

![Elements panel with Drawer](images/drawer.png)

From the Drawer you can execute commands in the Console, view the Animation 
Inspector, configure network conditions and rendering settings, search for 
strings and files, and emulate mobile sensors.

While the Drawer is open, click the three dot icon
(![three dot icon](images/three-dot.png){:.inline}) to the left of the 
**Console** tab and then select one of the dropdown menu options to open the
other tabs.

![drawer tabs menu](images/drawer-tabs.png)

## Enable experiments {#experiments}

When DevTools Experiments is enabled, a new page called **Experiments**
shows up in the DevTools Settings. From this page you can enable and disable
experimental features.

To enable Experiments, go to `chrome://flags/#enable-devtools-experiments`
and click **Enable**. Click the **Relaunch Now** button at the bottom of the
page. 

You should now see a new page called **Experiments** when you open DevTools
Settings.

![DevTools Experiments](images/experiments.png)

## Emulate print media {#emulate-print-media}

To view a page in print preview mode, [open the DevTools main 
menu](#main-menu), select **More Tools** > **Rendering Settings**, and then 
enable the **emulate media** checkbox with the dropdown menu set to **print**.

![enabling print preview mode](images/emulate-print-media.png)
