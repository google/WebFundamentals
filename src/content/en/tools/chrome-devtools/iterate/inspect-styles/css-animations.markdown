---
layout: shared/narrow
title: "Inspect CSS animations"
description: "Inspect and modify CSS animations with the Chrome DevTools 
Animation Inspector."
published_on: 2016-05-03
updated_on: 2016-05-03
order: 2
authors:
  - kaycebasques
translation_priority: 0
key-takeaways:
  - "Record and view groups of related animations as thumbnails or
    as playbacks in the viewport."
  - "Slow down the preview speed of animations."
  - "Change the duration or delay time of individual animations."
---

<p class="intro">Inspect and modify CSS animations with the Chrome DevTools
Animation Inspector.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways %}

## Overview {#overview}

The Animation Inspector is grouped into four main sections (or panes). This
guide refers to each pane as follows:

1. **Controls**. From here you can clear all currently recorded Animation 
   Groups, or change the speed of the currently selected Animation Group. 
2. **Overview**. Select an Animation Group here to inspect 
   and modify it in the **Details** pane.
3. **Timeline**. Pause and start an animation from here, or jump to a specific 
   point in the animation.
4. **Details**. Inspect and modify the currently selected
   Animation Group. 

![annotation Animation Inspector](imgs/annotated-animation-inspector.png)

## Open the Animation Inspector {#open}

There are two ways to open the Animation Inspector:

* Go to the **Styles** pane (on the **Elements** panel) and press the 
  **Animations** button (![animations 
  button](imgs/animations-button.png){:.inline}). 
* Open the Command Menu and type `Drawer: Show Animations`. 

The Animation Inspector opens up as a tab next to the Console Drawer. Since
it's a Drawer tab, you can use it from any DevTools panel. 

![Empty Animation Inspector](imgs/empty-ai.png)

## Record an animation {#record}

The Animation Inspector automatically records all animations that it detects. 
If the Animation Inspector detects that multiple animations are related, it
sorts them into an **Animation Group**. 

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/record-animations.mp4 %}

If you open the Animation Inspector while an animation is already in progress,
the Animation Inspector may not detect the animation. Reload the page while
DevTools and the Animation Inspector are open, and the animation should get
detected and recorded.

### How are Animation Groups determined?

Animations are grouped by start time (excluding delays, and so on). So, if a 
group of animations are all triggered in the same script block, they'll get 
registered as a group. But if they're asynchronous, they'll end up in 
different groups. 

## Inspect and modify animations {#inspect}

From the **Overview** pane, click on an Animation Group to view its details. 
The currently selected group is highlighted blue in the **Overview** pane.
In the **Details** pane each element that has an animation applied to it 
gets its own row.

![animation group details](imgs/animation-group-details.png)

The **Details** pane provides quite a bit of information about each element:

1. The first part of the label, color-coded purple, is the type of element
   which the animation is applied to.
1. The second part of the label, color-coded gold, is the CSS 
   selector in which the animation is applied. 
1. The first circle is the first keyframe of the animation. Click and drag 
   on this circle or the last one to change the duration of the animation. For
   example, if your animation is two seconds long, and you drag the first 
   circle right, you're effectively shortening the length of the animation
   to some time under two seconds. 
1. The name of the animation is displayed above the keyframes. Click and drag
   near this label to change the start time of the animation. 
1. Any circles bewteen the first and last are intermediary keyframes. Click
   and drag one of these circles to change the keyframe percentages. For
   example, if you have an intermediary keyframe set to `50%` and you drag its
   circle left, you're effectively changing the keyframe to some value under
   `50%`. 
1. The last circle is the last keyframe of the animation. 
1. The lighter area of the animation visualization represents iterations.
   See [Iterations](#iterations) below for more explanation.

![annotated single animation](imgs/annotated-single-animation.png)

### Iterations {#iterations}

For some animations, you may notice that the left section of the 
visualization is colored darker than the right section. In other words, the
right sections are more transparent than the left section. This is because the
left section represents the animation definition and the right sections 
represent iterations. Any edit that you make to the left section section is 
immediately reflected in all the subsequent iterations. For example, in the 
screenshot below, sections two and three represent iterations of section one. 

![diagram of animation iterations](imgs/animation-iterations.png)

### Color-coding {#color-coding}

If two elements have the same animation applied to them, the Animation 
Inspector assigns them the same color. The color itself is random and has 
no significance.

For example, in the screenshot below the two elements `div.eye.left::after` 
and `div.eye.right::after` have the same `eyes` animation applied to them, and 
the two elements `div.feet::before` and `div.feet::after` have the same `feet` 
animation applied to them.

![color-coded animations](imgs/color-coded-animations.png)

## Preview an animation {#preview}

Once an animation is recorded, hover over its thumbnail in the **Overview** 
pane to view a preview of it. 

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/hover-animation-preview.mp4 %}

You can also view a replay of an animation in the viewport by selecting it from
the **Overview** pane and then pressing the **replay** button 
(![replay button](imgs/replay-button.png){:.inline}).

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/replay-animation-in-viewport.mp4 %}

Click on the **animation speed** buttons (![animation speed 
buttons](imgs/animation-speed-buttons.png){:.inline}) to change the preview 
speed of the currently selected Animation Group. 

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/change-animation-speed.mp4 %}

## Slow down or speed up an animation {#speed}

Drag the starting keyframe or ending keyframe of an animation to decrease
or increase the duration of the animation. The smaller the distance between
the starting keyframe and ending keyframe, the smaller the duration of the 
animation. 

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/slow-animation.mp4 %}

## Delay an animation {#delay}

Drag an animation near its label to change the start time of the animation.

{% animation /web/tools/chrome-devtools/iterate/inspect-styles/animations/delay-animation.mp4 %}

## Clear one or all recordings {#clear}

Hover over an Animation Group and press the **X** button to clear it from the 
Animation Inspector.

![clearing one animation group](imgs/clear-one-animation-group.png)

Press the **clear all** button (![clear all animation groups 
button](imgs/clear-all-animation-groups-button.png){:.inline}) to clear all 
Animation Groups. 
