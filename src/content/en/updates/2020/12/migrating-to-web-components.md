project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How we migrate Chrome DevTools to web components. The Chrome DevTools engineering blog - by the developers who build the DevTools.

{# wf_updated_on: 2020-12-08 #}
{# wf_published_on: 2020-12-08 #}
{# wf_tags: devtools-blog #}
{# wf_featured_image: /web/updates/images/2020/12/devtools-blog.png #}
{# wf_featured_snippet: Web components is a great fit for building new UI elements in DevTools. To help with the transition, we created a guide to building UI elements in DevTools to share with the wider DevTools team. #}
{# wf_blink_components: N/A #}

# DevTools architecture refresh: Migrating to web components {: .page-title }

{% include "web/_shared/contributors/jackfranklin.html" %}

When DevTools was first created many, many years ago the team chose to build a bespoke UI framework. This was a reasonable choice at the time and has served DevTools well.

But since then various features have landed in the platform and one of those, web components, is a great fit for building new UI elements in DevTools. By leaning on what the platform provides we can greatly reduce the amount of bespoke UI code we have to maintain and invest more in building features for DevTools, rather than supporting bespoke infrastructure.

To help with the transition, we created a guide to building UI elements in DevTools to share with the wider DevTools team. Some of the guide is bespoke to DevTools and its architecture, which brings its own set of constraints, but some of it are generic guidelines on the approaches we’ve used to build, structure and test web components. 

Today, we’re making this document publicly available at [goo.gle/building-ui-devtools](https://goo.gle/building-ui-devtools
). If you’ve ever wondered more about how web components are used in large, real world applications, or some of the challenges that come with integrating components into a large, pre-existing codebase, this document could help and provide some answers. If you have any questions about our guidelines, feel free to [tweet me](https://www.twitter.com/Jack_Franklin).


<<../../_shared/devtools-feedback.md>>

<<../../_shared/discover-devtools-blog.md>>

{% include "web/_shared/rss-widget-updates.html" %}