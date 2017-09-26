project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You should audit your resources periodically to ensure that each resource is helping deliver a better user experience.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2014-03-31 #}

# Eliminating Unnecessary Downloads {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

### TL;DR {: .hide-from-toc }
* Inventory your own assets and third-party assets on your pages.
* Measure the performance of each asset: its value and its technical performance.
* Determine if the resources are providing sufficient value.

The fastest and best-optimized resource is a resource not sent. You should eliminate unnecessary resources from your application. It’s a good practice to question, and periodically revisit, the implicit and explicit assumptions with your team. Here are a few examples:

* You've always included resource X on your pages, but does the cost of downloading and displaying it offset the value it delivers to the user? Can you measure and prove its value?
* Does the resource (especially if it's a third-party resource) deliver consistent performance? Is this resource in the critical path, or need to be? If the resource is in the critical path, could it be a single point of failure for the site? That is, if the resource is unavailable, does it affect performance and the user experience of your pages?
* Does this resource need or have an SLA? Does this resource follow performance best practices: compression, caching, and so on?

Too often, pages contain resources that are unnecessary, or worse, that hinder page performance without delivering much value to the visitor or to the site they're hosted on. This applies equally to first-party and third-party resources and widgets:

* Site A has decided to display a photo carousel on its homepage to allow the visitor to preview multiple photos with a quick click. All of the photos are loaded when the page is loaded, and the user advances through the photos.
    * **Question:** Have you measured how many users view multiple photos in the carousel? You might be incurring high overhead by downloading resources that most visitors never view.
* Site B has decided to install a third-party widget to display related content, improve social engagement, or provide some other service.
    * **Question:** Have you tracked how many visitors use the widget or click-through on the content that the widget provides? Is the engagement that this widget generates enough to justify its overhead?

Determining whether to eliminate unnecessary downloads often requires a lot of careful thinking and measurement. For best results, periodically inventory and revisit these questions for every asset on your pages.
