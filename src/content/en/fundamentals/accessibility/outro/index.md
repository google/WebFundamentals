project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Wrap-up for Accessibility course

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Wrap-up {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



In these lessons, you've leaned about *focus*, *semantics* (built-in and custom), *ARIA*, and *styling*, and how they all fit into the WCAG and WebAIM checklist. While these are important tools in your accessibility kit, bear in mind that accessibility isn't just about the low-level details &mdash; it's really about making sure that **all** of your users can access **all** of your content **all** of the time.

It's important to remember that there's a whole range of users out there, not just the narrow spectrum that we might be designing for at the moment. That is, try not to over-focus; to build only for that subset of users is to exclude not only anyone with a permanent disability or impairment, but also means your product might fail any user when they are in a context that impacts the way they use technology, such as trying to use a phone one-handed while wrangling a screaming toddler.

Another critical aspect is to make accessibility part of the process from the beginning, and make it part of everyone's job.

 - *Developers* have a responsibility to make sure they implement interfaces in a way that maximizes accessibility and takes advantage of the HTML platform.
 - *Designers* have a responsibility to ensure that accessibility is considered from the beginning, both in terms of ensuring that the visual design is accessible, and considering keyboard usability, semantics, and labeling.
 - *Managers* have a responsibility to ensure that insufficient accessibility is a blocking criterion for launch.

That's a best case scenario, though; we know the real world is messier than that. So what can we do to try to make things better right away?

Remediating accessibility, like any time you're looking at reducing the number of bugs in software, is best viewed through the lens of impact: how can you have the most impact on users with the least amount of effort? This often boils down to three pertinent questions.

 - *How frequently is this piece of UI used?* Is it a critical part of the application, like a sign-in form, or something that might be a handy feature but is less commonly used?
 - *How much does an accessibility issue affect your users?* For example, is it something that completely prevents screen reader users from accessing a part of the UI, or is it something that is mildly annoying, but can be worked around?
 - *How expensive will it be to fix?* Could you fix three other critical accessibility bugs in the time it will take to fix this one?

In the end, the only true measure of accessibility is whether all users can use your product. Well designed products are going to work for a very broad range of users in a very broad range of situations. So, ultimately, **good accessibility equals good UX** &mdash; and making it a standard part of your process benefits everyone.
