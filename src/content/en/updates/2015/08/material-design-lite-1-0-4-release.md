project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: There is a new release of Material Design Lite, bringing a host of bug fixes and improvements to the build process.

{# wf_updated_on: 2018-07-31 #}
{# wf_published_on: 2015-08-20 #}
{# wf_tags: news,mdl,release #}

# New Release of Material Design Lite - 1.0.4 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}


![](/web/updates/images/2015-08-21-new-mdl-release/mdlsite.jpg)

[Material Design Lite](http://getmdl.io) 1.0.3 (and a regression fixing [1.0.4](https://github.com/google/material-design-lite/releases/tag/v1.0.4)) are out! This release has focused on library, templates, docs and build process fixes. We’ve had over 140 commits from our many contributors since our last release. Heck yes.

**Here are some of the highlights:**

- \#1256. Fix issues with programmatic updates to sliders.
- \#1281. Fix icon alignment inside buttons with text.
- \#1285. Fix radio button positioning.
- \#1309 and \#1365. Add IIFE wrapping and documentation to component classes.
- \#1373. Remove documentation styling that was accidentally included in MDL.
- \#1406. Fix menu behaviour after hiding.
- Fixes to hamburger menu and drawer for certain layout combinations.
- Many improvements and fixes to documentation.
- Several improvements and fixes to library build process.
- Several improvements to templates, including accessibility fixes.
- Improvements to MDL testing, including the addition of memory leak tests.

For a complete breakdown, check out the [release changelog](https://github.com/google/material-design-lite/compare/379151006ff7c6f482c8c1d539c544666f66894c...1340d2c20b34725393df1e35c0458df698202d5d) and the [1.0.3](https://github.com/google/material-design-lite/issues?q=milestone%3A1.0.3+is%3Aclosed) and [1.0.4](https://github.com/google/material-design-lite/milestones/1.0.4) milestones.

**Download Material Design Lite**

[Download the latest release](https://storage.googleapis.com/code.getmdl.io/1.0.4/mdl.zip) with our source code, compiled assets and docs as a ZIP file.

This also contains our Sass sources and Gulpfile for anyone that wants to [build](https://github.com/google/material-design-lite#build) their own version. Don’t forget we’re
available on [npm](https://npmjs.org/package/material-design-lite) as well.

**Material Design Lite CDN**

After you’ve reviewed the changelog, update your CDN paths to the following:


    <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.indigo-pink.min.css">
    <script src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    

**Built with MDL**

It's been exciting to hear users share sites they've seen using MDL in the wild. Some of the newer ones using MDL this month include:

[Hits e Beats](http://www.hitsebeats.info/){: .external }:

![](/web/updates/images/2015-08-21-new-mdl-release/hits-e-beats-1.jpg)
![](/web/updates/images/2015-08-21-new-mdl-release/hits-e-beats-2.jpg)

[TryColors](http://trycolors.com/){: .external }:

![](/web/updates/images/2015-08-21-new-mdl-release/trycolors.jpg)

[ABC.es](http://www.abc.es/gasolineras/){: .external }
![](/web/updates/images/2015-08-21-new-mdl-release/abc-es-1.jpg)
![](/web/updates/images/2015-08-21-new-mdl-release/abc-es-2.jpg)

[London RIB Voyages Mobile](http://www.londonribvoyages.com/mobile/){: .external }

![](/web/updates/images/2015-08-21-new-mdl-release/rib.jpg)

and we're of course more than happy to see some sites just using custom builds of individual components. [Settled.co.uk](http://settled.co.uk) for example uses the MDL slider:

![](/web/updates/images/2015-08-21-new-mdl-release/settled.jpg)
![](/web/updates/images/2015-08-21-new-mdl-release/slider.png)

Want to share your awesome MDL projects with us? File a [new issue](https://github.com/Google/material-design-lite/issues/new?title=Site%20Showcase%20Request&body=Please%20include:%0A*%20Description%0A*%20Primary%20Link%0A*%20Screenshot) on our GitHub issue tracker. The issue should include a link, a description of the site and a suggested screenshot.

Until next time, rock on!

With many heartz,

The MDL [contributors](https://github.com/google/material-design-lite/graphs/contributors)


{% include "comment-widget.html" %}
