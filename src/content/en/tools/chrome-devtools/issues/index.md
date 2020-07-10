project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Use the Issues Tab to find and fix problems with your website.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2020-05-14 #}
{# wf_blink_components: Security, Platform>DevTools #}

# Find And Fix Problems With The Chrome DevTools Issues Tab {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

The **Issues** tab in Chrome DevTools reduces the notification fatigue and clutter of the 
Console. Use it to find solutions to problems detected by the browser, such as cookie 
issues and mixed content.

<aside class="note">
  <p>In Chrome 84, the Issues tab supports three types of issue:</p> 
  <ul>
    <li><a href="https://web.dev/samesite-cookies-explained" 
      title="Article on web.dev: SameSite cookies explained">Cookie 
    problems</a></li>
    <li><a href="/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content" 
      title="Web Fundamentals article: What Is Mixed Content?">Mixed content</a></li>
    <li><a href="https://web.dev/coop-coep/" title="Article on web.dev: 
      Making your website 'cross-origin isolated' using COOP and COEP">COEP 
    issues</a></li>
  </ul>
  <p>Future versions of Chrome will support more issue types.</p>
</aside>

## Open the Issues tab {: #open }

1. Visit a page  with issues to fix, such as <a href="https://samesite-sandbox.glitch.me/" 
title="SameSite cookie tests">samesite-sandbox.glitch.me</a>. 
1. [Open DevTools](/web/tools/chrome-devtools/open). 
1. Click the **Go to Issues** button in the yellow warning bar. 
  <figure>
   <img src="/web/tools/chrome-devtools/issues/images/issues-detected.png"
        alt="Chrome DevTools screenshot showing yellow warning bar for Issues 
        detected."/>
  <!--        <figcaption>
     <b>Figure 1</b>. Open the <strong>Issues</strong> tab with the 
     <strong>Go to Issues</strong> button.
   </figcaption> -->
  </figure>
  Alternatively, select **Issues** from the **More tools** menu.
  <figure>
   <img src="/web/tools/chrome-devtools/issues/images/more-tools-menu.png"
        alt="Chrome DevTools screenshot showing Issues tab in More tools menu."/>
  <!--      <figcaption>
     <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
     <strong>More tools</strong> menu.
   </figcaption> -->
  </figure>
1. Once you're on the Issues tab, click the **Reload page** button if necessary.
  <figure>
   <img src="/web/tools/chrome-devtools/issues/images/issues-tab-before-reload.png"
        alt="Chrome DevTools screenshot showing Issues tab with 'Reload page' button."/>
  <!--      <figcaption>
     <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
     <strong>More tools</strong> menu.
   </figcaption> -->
  </figure>
  You'll notice that issues reported in the Console (such as the cookie warnings here) are quite 
  hard to understand. It's not clear what needs to be done to fix the issues reported.
  <figure>
 <img src="/web/tools/chrome-devtools/issues/images/issues-tab-after-reload.png"
      alt="Chrome DevTools screenshot showing Issues tab with two 
           cookie issues."/>
<!--      <figcaption>
   <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
   <strong>More tools</strong> menu.
 </figcaption> -->
</figure>

## View items in the Issues tab {: #view-issues }

The **Issues** tab presents warnings from the browser in a structured, aggregated, and 
actionable way. 

1. Click an item in the **Issues** tab to get guidance on how to fix the issue and find 
affected resources.
<figure>
 <img src="/web/tools/chrome-devtools/issues/images/issues-tab-issue-open.png"
      alt="Chrome DevTools screenshot showing a cookie issue open in the Issues tab."/>
<!--      <figcaption>
   <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
   <strong>More tools</strong> menu.
 </figcaption> -->
</figure>
Each item has four components:
<ul>
  <li>A headline describing the issue.</li>
  <li>A description providing the context and the solution.</li>
  <li>An **AFFECTED RESOURCES** section that links to resources within the appropriate DevTools 
    context, such as the Network panel.</li>
  <li>Links to further guidance.</li>
</ul>
<br>
1. Click on **AFFECTED RESOURCES** items to view details. In this 
example, there is one cookie and one request affected.
<figure>
 <img src="/web/tools/chrome-devtools/issues/images/issues-tab-affected-resources.png"
      alt="Chrome DevTools screenshot showing affected resources open in the Issues tab."/>
<!--      <figcaption>
   <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
   <strong>More tools</strong> menu.
 </figcaption> -->
</figure>

## View issues in context {: #issues-devtools }

1. Click on a resource link to view the item in the appropriate context within DevTools. In 
this example, click `samesite-sandbox.glitch.me` to show the cookies attached to that request.
<figure>
   <img src="/web/tools/chrome-devtools/issues/images/issues-tab-view-request.png"
        alt="Chrome DevTools screenshot showing affected resources open in the Issues tab."/>
  <!--      <figcaption>
     <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
     <strong>More tools</strong> menu.
   </figcaption> -->
  </figure>
1. Scroll to view the item with a problem: in this case, the cookie `ck02`. Hover over the 
information icon on the right to see the problem and how to fix it.
<figure>
   <img src="/web/tools/chrome-devtools/issues/images/issues-tab-view-issue.png"
        alt="Chrome DevTools screenshot showing issue with a resource opened from the Issues tab."/>
  <!--      <figcaption>
     <b>Figure 2</b>. Open the <strong>Issues</strong> tab from the 
     <strong>More tools</strong> menu.
   </figcaption> -->
  </figure>


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
