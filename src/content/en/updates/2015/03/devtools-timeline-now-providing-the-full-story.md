project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: We've upgraded the Timeline panel for Chrome DevTools to give developers more insight on their site’s runtime performance.


{# wf_updated_on: 2015-05-07 #}
{# wf_published_on: 2015-03-23 #}
{# wf_tags: devtools,timeline #}
{# wf_featured_image: /web/updates/images/2015-04-20-DevTools-Timeline/draw-calls.png #}

# DevTools Timeline: Now Providing the Full Story {: .page-title }

{% include "web/_shared/contributors/heathermahan.html" %}


The DevTools [Timeline panel](https://developer.chrome.com/devtools/docs/timeline) has always been the best first stop on the path to performance optimization. This centralized overview of your app’s activity helps you analyze where time is spent on loading, scripting, rendering, and painting. Recently, we’ve upgraded the Timeline with more instrumentation so that you can see a more in-depth view of your app’s performance.

We’ve added the following features:

* integrated [JavaScript profiler](#integrated_javascript_profiler). (Flame chart included!)
* [frame viewer](#frame_viewer) to help you visualize composited layers.
* [paint profiler](#paint_profiler) for detailed drill-downs into the browser’s painting activity.

Note that using the __Paint__ capture options described in this article do incur some performance overhead, so flip them on only when you want 'em.

## Integrated JavaScript Profiler

If you’ve ever poked around in __Profiles__ panel, you’re probably familiar with the [JavaScript CPU profiler](https://developer.chrome.com/devtools/docs/cpu-profiling). This tool measures where execution time is spent in your JavaScript functions. By viewing JavaScript profiles with the Flame Chart, you can visualize your JavaScript processing over time.

Now, you can get this granular breakdown of your JavaScript execution in the __Timeline__ panel. By selecting the __JS Profiler__ capture option, you can see your JavaScript call stacks in the Timeline along with other browser events. Adding this feature to the Timeline helps streamline your debugging workflow. But more than that, it allows you to view your JavaScript in context and identify the parts of your code that affect page load time and rendering.

In addition to the JavaScript profiler, we also integrated a Flame Chart view into the __Timeline__ panel. You can now view your app’s activity either as the classic waterfall of events or as a Flame Chart. The Flame Chart icon <img src="/web/updates/images/2015-04-20-DevTools-Timeline/flame-icon.png" /> allows you to toggle between these two views.

<p style="text-align: center; text-align: center; margin: 2em 0 2em 0;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-04-20-DevTools-Timeline/javascript-profiler.png" alt="JavaScript Profiler on Timeline" />
  <span style="color: #999; display: block; margin-top: 1em;">Using the <strong>JS Profiler</strong> capture option and Flame Chart view to investigate call stacks in the Timeline.</span>
</p>

Note: Use WASD to zoom and pan through the Flame Chart. Shift-drag to draw a selection box.

## Frame Viewer

The art of [layer compositing](http://www.html5rocks.com/en/tutorials/speed/layers/){: .external } is another aspect of the browser that has been mostly hidden from developers. When used sparingly and with care, layers can help avoid costly re-paints and yield huge performance boosts. But it’s often not obvious to predict how the browser will composite your content. Using the Timeline’s new __Paint__ capture option, you can visualize composited layers at each frame of a recording.

When you select a gray frame bar above the __Main Thread__, its __Layers__ panel provides a visual model of the layers that compose your app.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="sC6IlD-U2TI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


Note: Play back animations by clicking through frame bars on a Timeline recording.

You can zoom, rotate, and drag the layers model to explore its contents. Hovering over a layer reveals its current position on the page. Right-clicking on a layer lets you jump to the corresponding node in the __Elements__ panel. These features show you what was promoted to a layer. If you select a layer, you can also see why it was promoted in the row labeled __Compositing Reasons__.

<p style="text-align: center; text-align: center; margin: 2em 0 2em 0;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-04-20-DevTools-Timeline/compositing-reasons.png" alt="Compositing Reasons" />
  <span style="color: #999; display: block; margin-top: 1em;">Inspecting a layer from <a href="http://tympanus.net/Development/ScatteredPolaroidsGallery/">Codrops' Scattered Polaroids Gallery</a> to reveal the browser’s reasons for compositing.</span>
</p>

## Paint Profiler

Last but not least, we’ve added the paint profiler to help you identify jank caused by expensive paints. This feature enriches the Timeline with more details about the work Chrome does during paint events.

For starters, it’s now easier to identify the visual content corresponding to each paint event. When you select a green paint event in the Timeline, the __Details__ pane shows you a preview of the actual pixels that were painted.

<p style="text-align: center; text-align: center; margin: 2em 0 2em 0;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-04-20-DevTools-Timeline/paint-capture.png" alt="Paint capture option" />
  <span style="color: #999; display: block; margin-top: 1em;">Previewing pixels that the browser painted using the <strong>Paint</strong> capture option.</span>
</p>

If you really want to dive in, switch over to the __Paint Profiler__ pane. This profiler shows you the exact draw commands that the browser executed for the selected paint. To help you connect these native commands with actual content in your app, you can right-click on a __draw*__ call and jump straight to the corresponding node in the __Elements__ panel.

<p style="text-align: center; text-align: center; margin: 2em 0 2em 0;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-04-20-DevTools-Timeline/draw-calls.png" alt="Paint capture option" />
  <span style="color: #999; display: block; margin-top: 1em;">Relating native browser <strong>draw*</strong> calls to DOM elements using the <strong>Paint Profiler</strong>.</span>
</p>

The mini-timeline across the top of the pane lets you play back the painting process and get a sense of which operations are expensive for the browser to perform. Drawing operations are color-coded as follows: <strong style="color: #ffa181;">pink</strong> (shapes), <strong style="color: #88c4ff;">blue</strong> (bitmap), <strong style="color: #b4ff89;">green</strong> (text), <strong style="color: #cea0ff;">purple</strong> (misc.). Bar height indicates call duration, so investigating tall bars can help you understand what about a particular paint was costly.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="vcjcykN6smw"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Profile and profit!

When it comes to performance optimization, knowledge of the browser can be incredibly powerful. By giving you a peek under the hood, these Timeline updates help clarify the relationship between your code and Chrome’s rendering processes. Try out these new options in the Timeline and see what Chrome DevTools can do to enhance your jank-hunting workflow!


{% include "comment-widget.html" %}
