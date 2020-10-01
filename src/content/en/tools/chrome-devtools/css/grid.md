project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Learn how to use Chrome DevTools to view and change a page's CSS.

{# wf_updated_on: 2020-10-01 #}
{# wf_published_on: 2017-06-08 #}
{# wf_blink_components: Platform>DevTools #}

# Inspect CSS Grid {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}

This guide shows you how to discover CSS grids on a page, examining them and debugging layout issues in the **Elements** panel of Chrome DevTools.

The examples shown in the screenshots appearing in this article are from these two web pages: [Fruit box](https://jec.fyi/demo/css-grid-fruit) and [Snack box](https://jec.fyi/demo/css-grid-snack).

## Discover CSS grids {: #discover }
When an HTML element on your page has `display: grid` or `display: inline-grid` applied to it, you can see a `grid` badge next to it in the [**Elements**](/web/tools/chrome-devtools#open) panel.

![Discover grid](/web/tools/chrome-devtools/css/imgs/grid/01-discover-grid.png)

Clicking the badge to toggle the display of a grid overlay on the page. The overlay appears over the element, laid out like a grid to show the position of its grid lines and tracks:

![Toggle grid badge](/web/tools/chrome-devtools/css/imgs/grid/02-highlight-grid.png)

Open the **Layout** pane. When grids are included on a page, the Layout pane includes a **Grid** section containing a number of options for viewing those grids.

![Layout pane](/web/tools/chrome-devtools/css/imgs/grid/03-layout-pane.png)


## Grid viewing options {: #options }

The **Grid** section in the **Layout** pane contains 2 sub sections:

- Overlay display settings
- Grid overlays

Let’s look into each of these sub sections in detail.


## Overlay display settings {: #display-settings }

The **Overlay display settings** consists of 2 parts:

a. A dropdown menu with options within:

- **Hide line labels**: Hide the line labels for each grid overlay.
- **Show lines number**: Show the line numbers for each grid overlay (selected by default).
- **Show line names**: Show the line names for each grid overlay in the case of grids with line names.

b. Checkboxes with options within:

- **Show track sizes**: Toggle to show or hide track sizes.
- **Show area names**: Toggle to show or hide area names, in the case of grids with named grid areas.
- **Extend grid lines**: By default, grid lines are only shown inside the element with `display: grid` or `display: inline-grid` set on it; when toggling this option on, the grid lines extend to the edge of the viewport along each axis.

Let's examine these settings in more detail.


### Show line numbers {: #line-numbers }

By default, the positive and negative line numbers are displayed on the grid overlay.

![Show line numbers](/web/tools/chrome-devtools/css/imgs/grid/04-show-line-numbers.png)


### Hide line labels {: #line-labels }

Select **Hide line labels** to hide the line numbers.

![Hide line labels](/web/tools/chrome-devtools/css/imgs/grid/05-hide-line-labels.png)


### Show line names {: #line-names }

You can select **Show line names** to view the line names instead of numbers. In this example, we have 4 lines with names: left, middle1, middle2 and right.

In this demo, **orange** element spans from left to right, with CSS `grid-column: left / right`. Showing line names make it easier to visualize the start and end position of the element.

![Show line names](/web/tools/chrome-devtools/css/imgs/grid/06-show-line-names.png)


### Show track sizes {: #track-sizes }

Enable the **Show track sizes** checkbox to view the track sizes of the grid. 

DevTools will display `[authored size] - [computed size]` in each line label:
**Authored** size: The size defined in stylesheet (omitted if not defined). 
**Computed** size: The actual size on screen. 

In this demo, the `snack-box` column sizes are defined in the CSS `grid-template-columns:1fr 2fr;`. Therefore, the column line labels show both authored and computed sizes: **1fr - 96.66px** and **2fr - 193.32px**.

The row line labels show only computed sizes: **80px** and **80px** since there are no row sizes defined in the stylesheet.

![Show track sizes](/web/tools/chrome-devtools/css/imgs/grid/07-show-track-sizes.png)


### Show area names {: #area-names }

To view the area names, enable the **Show area names** checkbox. In this example, there are 3 areas in the grid - **top**, **bottom1** and **bottom2**.

![Show area names](/web/tools/chrome-devtools/css/imgs/grid/08-show-area-names.png)


### Extend grid lines {: #extend-grid-lines }

Enable the **Extend grid lines** checkbox to extend the grid lines to the edge of the viewport along each axis.

![Extend grid lines](/web/tools/chrome-devtools/css/imgs/grid/09-extend-grid-lines.png)


## Grid overlays {: #overlays }

The **Grid overlays** section contains a list of grids that are present on the page, each with a checkbox, along with various options.

### Enable overlay views of multiple grids {: #view-multiple-grids }

You can enable overlay views of multiple grids. In this example, there are 2 grid overlays enabled - `main` and `div.snack-box`, each represented with different colors.

![Enable overlay views of multiple grids](/web/tools/chrome-devtools/css/imgs/grid/10-grid-overlays.png)


### Customize the grid overlay color {: #customize-overlay-color }

You can customize each grid overlay color by clicking the color picker.

![Customize the grid overlay color](/web/tools/chrome-devtools/css/imgs/grid/11-grid-overlays-color.png)


### Highlight the grid {: #highlight-grid }

Click the highlight icon to immediately highlight the HTML element, scroll to it in the page and select it in the Elements panel.

![Highlight the grid](/web/tools/chrome-devtools/css/imgs/grid/12-grid-overlays-highlight.png)


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
