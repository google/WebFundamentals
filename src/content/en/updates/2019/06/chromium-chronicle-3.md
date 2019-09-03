project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-06-24 #}
{# wf_published_on: 2019-06-25 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Tests are critical because they find bugs and regressions, enforce better designs and make code easier to maintain. This month, we take a look at how to conduct thorough tests with Gerrit #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Code Coverage in Gerrit {: .page-title }

**Episode 3:** June 2019

*by Yuke, Roberto and Sajjad in Mountain View*

Tests are critical because they find bugs and regressions, enforce better
designs and make code easier to maintain. Code coverage helps you ensure
your tests are thorough.

Chromium CLs can show a line-by-line breakdown of test coverage. You can
use the code coverage trybot to ensure you only submit well-tested code.

To see code coverage for a Chromium CL, trigger the code coverage trybot
*linux-coverage-rel*:

<img src="/web/updates/images/2019/06/cr-cron3-left.png" class="attempt-left">
<img src="/web/updates/images/2019/06/cr-cron3-right.png" class="attempt-right">
<div class="clearfix"></div>

Once the build finishes and code coverage data is processed successfully,
look at the right column of the side by side diff view to see coverage
information:

<img src="/web/updates/images/2019/06/cr-cron3-diff.jpg">

The code coverage tool currently supports C/C++ code for Chrome on Linux;
support for more platforms and more languages is in progress.

The code coverage trybot has been rolled out to a 10% experiment, and once
we’re more comfortable in its stability, we plan to enable it by default and
expand it to more platforms.

## Learn More

Want to learn more? Check out the coverage in Gerrit [demo CL][demo-cl]
and play around with code coverage in Gerrit, or see the full
[codebase coverage dashboard][dashboard], broken down by directories and components.

## Share your feedback

Have any feedback? Contact code-coverage@chromium.org or [file a bug][file-bug].

[demo-cl]: https://chromium-review.googlesource.com/c/chromium/src/+/1455344
[dashboard]: https://analysis.chromium.org/p/chromium/coverage
[file-bug]: https://bugs.chromium.org/p/chromium/issues/entry?labels=Pri-3&status=Unconfirmed&components=Tools%3ECodeCoverage&comment=what%27s%20the%20bug%20or%20feature?

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
