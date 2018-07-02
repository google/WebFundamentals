project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A comprehensive reference of accessibility features in Chrome DevTools.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2018-07-02 #}
{# wf_published_on: 2018-06-29 #}

# Accessibility Reference {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Goal of this document

This page is a comprehensive reference of accessibility features in Chrome DevTools.

If you don't know anything about accessibility, the best place to start is the Audits
panel. The Audits panel performs automated tests on *any* web page, and gives you a report
on that page's accessibility problems.

## Prerequisities and intended audience

This reference assumes that you know how to open DevTools.

This reference is intended for people who have a basic understanding of accessibility
principles and who want to learn 

See [Accessibility](/web/fundamentals/accessibility/) to learn about accessibility
principles and best practices.

## Perform automated accessibility tests on any webpage {: #audits }

The Audits panel can generate an accessibility report for any page on the web. This is the
best starting point for learning how to improve the accessibility of your pages.

1. Go to the URL that you want to audit.
1. In DevTools, click the **Audits** tab. DevTools shows you various configuration options.
1. For **Device**, select **Mobile** if you want to simulate a mobile device. This option changes
   your user agent string and resizes the viewport. If the mobile version of the page displays differently
   than the desktop version, this option could have a significant effect on your accessibility audit.
1. In the **Audits** section, make sure that **Accessibility** is enabled. Disable the other
   categories if you want to exclude them from your report.
1. The **Throttling** section lets you throttle the network and CPU, which is useful when analyzing
   load performance. This option should be irrelevant to your accessibility score, so you can use
   whatever you prefer.
1. The **Clear Storage** checkbox lets you clear all storage before loading the page, or preserve
   storage between page loads. This option is also probably irrelevant to your accessibility score, so you
   can use whatever you prefer.
1. Click **Run Audits**.
1. Your report gives you various tips on how to improve the page's accessibility.
1. Click an audit to read its description.
1. Click **Learn More** to view that audit's documentation.

## Accessibility Pane

## Contrast Ratio in the Color Picker {: #contrast }


