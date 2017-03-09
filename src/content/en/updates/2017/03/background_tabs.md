# Background tabs in Chrome 57.

Background tabs can have a dramatic negative effect on browser performance, especially on battery life. To mitigate this, Chrome have been placing various restrictions on background tabs for last several years. Recently there’s been a number of efforts to make further improvements to the situation, and this document gives an overview of what Chrome policy is. This document focuses on describing current policies in Chrome 57. Long-term strategy and further plans can be found in [this document](https://docs.google.com/document/d/1FCcMdUDl25RCnzfAbKOur5yVACCjS1EV4PUvlPRQ-9w/edit).

## Optimising an application for background

Web developers should be aware that users often have a lot of tabs open in the background and it have a serious effect on power usage and battery life. Work in background should be kept to minimum unless it’s absolutely necessary to provide a particular user experience. [Page visibility API](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange) should be used to detect when page is backgrounded and suspend all necessary work like visual updates.

[For some sites](https://twitter.com/cryptowat_ch/status/817502626896089090), this simple optimisation can reduce CPU usage by 75%: 

```
var doVisualUpdates = true;

document.addEventListener('visibilitychange', function(){

  doVisualUpdates = !document.hidden;

});

function update() {

  if (!doVisualUpdates) {

    return;

  }

  doStuff();}
```

## Policies

### requestAnimationFrame

Per [the spec](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), Chrome does not run requestAnimationFrame callback when page is in background. This behavior was in place since 2011.

### Background timer alignment

Since [Chrome 11](https://blog.chromium.org/2011/03/getting-smoother-animated-web-content.html), each independent timer is run no more than once per second. Chrome runs these timers in batches once a second, ensuring that number of process wakeups is kept to minimum. Pages playing audible audio are considered user-visible and exempted from background timer throttling. Exemption lasts for several seconds after audio stopped playing to allow application to queue next audio track.

Note that audio is considered audible when and only when Chrome shows audio icon. Silent audio streams do not grant exemptions.

### Budget-based background timer throttling

[Shipping in Chrome 57](https://www.chromestatus.com/feature/6172836527865856), this is further extension of timer alignment mechanism, placing an additional limit on background timer CPU usage. It operates as follows:

* Each background tab has a time budget (in seconds) for running timers in background.

* A page is subjected to time budget limitations after 10 seconds in background.

* A timer task is allowed to run only when time budget is non-negative.

* After a timer has executed, its run time is subtracted from the budget.

* The budget continuously regenerates with time (currently set to a rate of  0.01 seconds per second). Note that this budget might vary over time as Chrome collects more data about throttling behavior.

There are a number of automatic exemptions from this throttling:

* Applications playing audio are considered foregrounded and aren’t throttled. 

* Applications with real-time connections (WebSockets and WebRTC) to avoid closing these connections by timeout. Run-timers-once-a-second rule is still applied in these cases.

Note that this his mechanism uses wall time, not CPU time. It’s a good approximation of CPU time and penalises blocking main thread for a long time.

Finally, remember that if you are using long tasks in background, you application can be throttled for a very long period of time (up to 100x of duration of your task). Split your work to chunks of 50ms or less per performance guidelines and use visibilityChange listener to avoid doing unnecessary work in background.

### Opt-outs

Chrome provides `--disable-background-timer-throttling` flag for use cases like running test suites and other user-sanctioned heavy computations.

