project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn the basics of accessibility, what it means, and why it's important.

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Get Started {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



## TL;DR {: .hide-from-toc }
- Learn what accessibility means and how it applies to web development.
- Learn how to make web sites accessible and usable for everyone.
- Learn how to include basic accessibility with minimal development impact.
- Learn what HTML features are available and how to use them to improve accessibility.
- Learn about advanced accessibility techniques for creating polished accessibility experiences.


Understanding accessibility, its scope, and its impact can make you a better web developer.
This guide is intended to help you understand how you can make your websites accessible and usable for everyone.

"Accessibility" can be difficult to spell, but it doesn't have to be difficult to accomplish. In this guide, you will see how to get some easy wins to help improve accessibility with minimal effort, how you can use what's built in to HTML to create more accessible and robust interfaces, and how to leverage some advanced techniques for creating polished accessible experiences.

You'll also find that many of these techniques will help you create interfaces that are more pleasant and easy to use for *all* users, not just for those with disabilities.

Of course, many developers have only a hazy understanding of what accessibility means &mdash; something to do with government contracts, checklists, and screen readers, right? &mdash; and there are plenty of misconceptions floating around. For example, many developers feel that addressing accessibility will force them to choose between creating a delightful and attractive experience, and one that is clunky and ugly but accessible.

That is, of course, not the case at all, so let's clear that up before we get into anything else. What do we mean by accessibility, and what are we here to learn about?

## What is accessibility?
Broadly speaking, when we say a site is accessible, we mean that the site's content is available, and its functionality can be operated, by literally *anyone*. As developers, it's easy to assume that all users can see and use a keyboard, mouse, or touch screen, and can interact with your page content the same way you do. This can lead to an experience that works well for some people, but creates issues that range from simple annoyances to show-stoppers for others. 

Accessibility, then, refers to the experience of users who might be outside the narrow range of the "typical" user, who might access or interact with things differently than you expect. Specifically, it concerns users who are experiencing some type of impairment or disability &mdash; and bear in mind that that experience might be non-physical or temporary.

For example, although we tend to center our discussion of accessibility on users with physical impairments, we can all relate to the experience of using an interface that is not accessible to us for other reasons. Have you ever had a problem using a desktop site on a mobile phone, or seen the message "This content is not available in your area", or been unable to find a familiar menu on a tablet? Those are all accessibility issues.

As you learn more, you'll find that addressing accessibility issues in this broader, more general sense almost always improves the user experience for everyone. Let's look at an example.

![a form with poor accessibility](imgs/pooraccess.jpg)

This form has several accessibility issues.

 - The text is low contrast, which is hard for low-vision users to read.
 - Having labels on the left and fields on the right makes it hard for many people to associate them, and almost impossible for someone who needs to zoom in to use the page; imagine looking at this on a phone and having to pan around to figure out what goes with what.
 - The "Remember details?" label isn't associated with the checkbox, so you have to tap or click only on the tiny square rather than just clicking the label; also, someone using a screen reader would have trouble figuring out the association.

Now let's wave our accessibility wand and see the form with those issues fixed. We're going to make the text darker, modify the design so that the labels are close to the things they're labeling, and fix the label to be associated with the checkbox so you can toggle it by clicking the label as well.

![a form with improved accessibility](imgs/betteraccess.jpg)

Which would you rather use? If you said "the accessible version", you're on your way to understanding a main premise of this guide. Often, something that's a complete blocker for a few users is also a pain point for many others, so by fixing the accessibility issue you improve the experience for everyone.
