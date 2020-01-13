project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-09-17 #}
{# wf_published_on: 2019-09-24 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Chrome’s issue tracker, Monorail, offers a grid view that allows you to visualize your issues in a Kanban style board. This episode explains how to use the grid mode. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Monorail’s Grid View! {: .page-title }

**Episode 6:** September 2019

*by Tiffany in San Francisco*

Chrome’s issue tracker, [Monorail][monorail-homepage], offers a grid view
that allows you to **visualize your issues in a Kanban style board**.
When you’re viewing a list of issues, you can click the “Grid” button to
activate grid mode!

<img src="/web/updates/images/2019/09/chrom-chron-6-screenshot1.png">

While on the grid page, you can customize your view to **sort issues by
almost any field you want**! Status, Priority, NextAction, Milestone,
Owner, you name it! 

The flexibility of the grid view allows you to **customize it to fit your
team’s needs**. For example, below we’ve set up the grid view to show all
pending Q3 Monorail work, sorted by owner and sprint date.

<img src="/web/updates/images/2019/09/chrom-chron-6-screenshot3.png">

If you need more information on each issue, you can view the grid view with
“Tile” cells instead. And if you want a bird’s eye view of many, many issues,
you can **view issues in the grid view as counts**. In fact, the grid view even
supports loading up to 6,000 issues at once.

<img src="/web/updates/images/2019/09/chrom-chron-6-screenshot2.png">

All setting changes in the grid view are reflected in the page URL. So once
you’ve configured your grid to your needs, you can **share a link to your new
view with your team**. If you want, you could even use the grid view for your
weekly team status meetings. 

As you use Monorail’s grid view, please [file feedback][file-feedback]! We’d love to hear your
suggestions on how we can make the grid view better.  

## Additional Resources

* Want to learn more about Chrome’s issue tracker? You can read more about
[how to use Monorail on chromium.org][monorail-chromium]. 
* Monorail is open source! If you need an issue tracker, you can set up your
own instance of Monorail. Checkout [Monorail’s README][monorail-readme] here. 

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[monorail-homepage]: https://bugs.chromium.org/hosting
[file-feedback]: https://bugs.chromium.org/p/monorail/issues/entry?labels=UI-Refresh-Feedback,Feature-Grids,Via-Chrome-Chronicle&cc=zhangtiff@chromium.org,jrobbins@chromium.org&summary=Feedback+on+the+new+Monorail+Grid+View&components=UI
[monorail-chromium]: https://www.chromium.org/issue-tracking
[monorail-readme]: https://cs.chromium.org/chromium/infra/appengine/monorail/README.md
