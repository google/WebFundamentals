project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Once you've audited a site, make sure to package the results in a digestible form. Be sensitive to the people on the receiving end of your audit, structure your report carefully and present your data in terms of opportunities and solutions.

{# wf_updated_on: 2018-08-03 #}
{# wf_published_on: 2018-08-03 #}
{# wf_blink_components: N/A #}

# Share the results {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


Once you've audited a site, make sure to package the results in a digestible form.

* Consider producing different reports for different stakeholders.
* Focus on business needs and show how technical metrics support these.
* Start with a summary.
* Structure data by topic (such as load performance and page weight) rather than simply listing tool output data.
* Order results by priority.
* Leave out results if they're not relevant or interesting.
* Where possible present numerical data as charts or graphs.
* Avoid a wall of data — site reviews should not be boring.
<br><br>

<div class="note">
  <p><strong>Be sensitive to the people on the receiving end of your audit.</strong></p>
  <p>Those working on a site may be well aware of problems. There may be complex, non-technical
  reasons why problems haven't been fixed.</p>
  <p>It's much more helpful to describe poor performance in terms of opportunities and solutions,
  rather than simply listing a catalog of failures.</p>
  <p>Wherever possible, talk to site developers and other stakeholders before presenting your
  findings more widely.</p>
</div>

## Provide context

When sharing review results you may want to include contextual data to justify effort and motivate
developers or other stakeholders to implement improvements you suggest — such as the following from
[DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/){: .external}:

* 53% of users abandon sites that take longer than three seconds to load.
* Mobile sites load in 5 seconds earn up to 2x more mobile ad revenue.
* The average load time for mobile sites is 19 seconds.

There is a comprehensive list of business reasons for improving performance on
[neotys.com](http://www.neotys.com/blog/how-to-talk-about-performance-testing-with-ceos-and-business-managers/){: .external}.
More information about how to improve site performance is available from
[perf.rocks](http://perf.rocks/articles){: .external} and
[Web Fundamentals](/web/fundamentals/performance/), along with case
studies and success stories.

## Demonstrate potential

Chrome DevTools [Local Overrides](https://t.co/0a56PgKlPv){: .external} allow you to override
website assets with local versions. This can be a great way to show how simple changes can make a
big difference.

For example:

* Create a version of the CSS used by a site's homepage, with redundant rules removed.
* Change HTML to defer JavaScript loading.
* Replace image files with optimized versions.

You can even share changed files with developers working on a site, to enable them to demonstrate
potential improvements directly to their colleagues. Local Overrides also makes it simple to create
side-by-side screencasts showing performance differences between optimized and unoptimized versions.
This approach can be much more compelling than a lengthy todo list! Find out how to use Local
Overrides [here](https://glebbahmutov.com/blog/local-overrides/){: .external}.
