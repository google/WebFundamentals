project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Background tabs in Chrome 57. 

{# wf_updated_on: 2017-03-09 #}
{# wf_published_on: 2017-03-09 #}
{# wf_tags: chrome57 #}
{# wf_featured_snippet: Background tabs can have a dramatic negative effect on battery life. Chrome 57 brings new power saving changes to background tab behavior by throttling timers if a page is using too much CPU. #}

# Background Tabs in Chrome 57 {: .page-title }

Background tabs can have a dramatic negative effect on browser performance,
especially on battery life. To mitigate this, Chrome has been placing
various restrictions on background tabs for the last several years.
Recently there’s been a number of efforts to make further improvements,
and this document gives an overview of the Chrome policy.
This document focuses on describing current policies in Chrome 57.
Long-term strategy and further plans can be found in
[this document](https://docs.google.com/document/d/18_sX-KGRaHcV3xe5Xk_l6NNwXoxm-23IOepgMx4OlE4/pub).

## Optimising an application for background

Web developers should be aware that users often have a lot of tabs open in the background
and it can have a serious effect on power usage and battery life. Work in the background
should be kept to a minimum unless it’s absolutely necessary to provide
a particular user experience. The
[Page visibility API](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
should be used
to detect when page is the backgrounded and suspend all unnecessary work like visual updates.

[For some sites](https://twitter.com/cryptowat_ch/status/817502626896089090),
this simple optimisation can reduce CPU usage by as much as 75%: 

    var doVisualUpdates = true;
    
    document.addEventListener('visibilitychange', function(){
      doVisualUpdates = !document.hidden;
    });
    
    function update() {
      if (!doVisualUpdates) {
        return;
      }
      doStuff();
    }

## Policies

### requestAnimationFrame()

Per [the documentation](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame),
Chrome does not call `requestAnimationFrame()` when a page is in the background.
This behavior has been in place since 2011.

### Background timer alignment

Since [Chrome 11](https://blog.chromium.org/2011/03/getting-smoother-animated-web-content.html),
each independent timer is run no more than once per second. Chrome runs these timers in batches
once a second, ensuring that the number of process wakeups is kept to a minimum.
Pages playing audible audio are considered user-visible and exempted from background timer
throttling. Exemption lasts for several seconds after audio stops playing to allow
applications to queue the next audio track.

Note that audio is considered audible when and only when Chrome shows the audio icon.
Silent audio streams do not grant exemptions.

### Budget-based background timer throttling

[Shipping in Chrome 57](https://www.chromestatus.com/feature/6172836527865856),
budget-based timer throttling is a further extension of the timer alignment mechanism,
placing an additional limit on background timer CPU usage. It operates as follows:

* Each background tab has a time budget (in seconds) for running timers in the background.
* A page is subjected to time budget limitations after 10 seconds in the background.
* A timer task is allowed to run only when the time budget is non-negative.
* After a timer has executed, its run time is subtracted from the budget.
* The budget continuously regenerates with time (currently set to a rate of
  0.01 seconds per second). Note that this budget regeneration rate can be tweaked as
  Chrome collects more data about throttling behavior.

There are a number of automatic exemptions from this throttling:

* Applications playing audio are considered foreground and aren’t throttled. 
* Applications with real-time connections (WebSockets and WebRTC), to avoid closing
  these connections by timeout. The run-timers-once-a-second rule is still
  applied in these cases.

Note that this his mechanism uses wall time, not CPU time.
It’s a good approximation of CPU time and penalises blocking the main thread for a
long time.

Finally, remember that if you are using long tasks in the background, your application
can be throttled for a very long period of time (up to 100 times the duration of your task).
Split your work in to chunks of 50ms or less per
[the performance guidelines](/web/fundamentals/performance/rail)
and use the `visibilityChange` listener to avoid doing unnecessary work in background.

### Opt-outs

Chrome provides the `--disable-background-timer-throttling` flag for use cases like
running test suites and other user-sanctioned heavy computations.

{% include "comment-widget.html" %}
