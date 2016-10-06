project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What happened to the Resources panel, new features, and community activity.

{# wf_updated_on: 2016-08-05 #}
{# wf_published_on: 2016-08-05 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}

# DevTools Digest, August 2016 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}



Hi, I'm [Kayce](https://twitter.com/kaycebasques), technical writer for
DevTools, here to tell you about the latest happenings in DevTools land.

## The Resources panel is now the Application panel

As of Chrome 52, the Resources panel is no more! It has been 
renamed to the Application panel. All of the old features of the Resources
panel are still available, plus many new ones to help you debug Progressive
Web Apps. Now you, too, can experience the joys of debugging the service worker
lifecycle and cache timing issues.

Check out our new guide, written by yours truly, to learn more about the new
features: [Debug Progressive Web 
Apps](/web/tools/chrome-devtools/debug/progressive-web-apps)

## ChromeLens

<img src="/web/updates/images/2016/08/chromelens.png"
     style="width: 50%">

[ChromeLens](http://chromelens.xyz/){: .external } is an excellent new extension to help
you make your website more accessible to the visually impaired.

P.S. Rob Dodson just launched a new video series on accessibility,
[a11ycasts](https://www.youtube.com/watch?v=HtTyRajRuyY).

## New features now in Canary

Canary is currently Chrome 54. So, for future readers, if you're using Chrome
54 or beyond, you can use these features!

The Color Picker is in the Sources panel.

![sources panel color picker](/web/updates/images/2016/08/colorpicker.jpg)

Right-click the Resources pane in the Network panel and you can copy
a string of cURL requests to download all of your resources.

![copy all as curl](/web/updates/images/2016/08/curl.png)

JavaScript can be disabled from the Command Menu. This used to be available
only from Settings.

![disable JS](/web/updates/images/2016/08/disablejs.jpg)

`console.warn()` now includes a stack trace.

![console.warn() stack trace](/web/updates/images/2016/08/warn.jpg)

This last feature has been around for a few months, but it's worth another
mention. Create a Timeline recording with the JS Profile option enabled, and
you can see a function-by-function breakdown of execution times in the Sources
panel.

![function execution times in sources
panel](/web/updates/images/2016/08/profile.png)

## New ideas from the community

Here are some new ideas from the community that may be coming to a future
DevTools Near You.

* [@matthewcp](https://twitter.com/matthewcp/status/760485187272802304):
  Speed up memory leak debugging by displaying a simple list of growing
  objects.
* [@jonathanbingram](https://twitter.com/jonathanbingram/status/760606705142988802): Increase / decrease `font-weight` values with the increment / decrement
  keyboard shortcuts.
* [@_bl4de](https://twitter.com/_bl4de/status/760563868003434496): Edit
  cookies (actually a long-standing request, but thanks for bringing it up
  again). Rumor has it that 
  [@kdzwinel](https://twitter.com/kdzwinel/status/761360103404634112) has a
  PR in the works.
* [@kienzle_s](https://twitter.com/kienzle_s/status/755668147101896704):
  Add OR filters to the Network panel filter.

Got a new idea? We'd love to hear it. Ping us on Twitter at
[@ChromeDevTools](https://twitter.com/ChromeDevTools) and tell us what's up.

While I've got your attention, if there's any docs that need fixing, or
features that need explaining, feel free to [open an issue on the docs
repository](https://github.com/google/WebFundamentals/issues/new).

Until next month!


{% include "comment-widget.html" %}
