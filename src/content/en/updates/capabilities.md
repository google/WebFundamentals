project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2018-11-29 #}
{# wf_published_on: 2018-11-12 #}
{# wf_tags: capabilities #}
{# wf_featured_image: /web/updates/images/generic/thumbs-up.png #}
{# wf_featured_snippet: We strongly believe that every developer should have access to the capabilities they need to make a great web experience, and we are committed to a more capable web. Learn about some of the new APIs we're considering and how you can get involved. #}
{# wf_blink_components: N/A #}

# Capabilities {: .page-title }

There are some capabilities, like file system access, idle detection, and
more that are available to native but aren’t available on the web. These
missing capabilities mean some types of apps can't be delivered on the
web, or are less useful.

We strongly believe that every developer should have access to the capabilities
they need to make a great web experience, and we are committed to a more
capable web.

We want to close the capability gap between the web and native and make it
easy for developers to build great experiences on the open web. We plan to
design and develop these new capabilities in an open and transparent way,
using the existing open web platform standards processes while getting early
feedback from developers and other browser vendors as we iterate on the
design, to ensure an interoperable design.

## In flight {: #in-flight }

<table>
  <thead>
    <tr>
      <th>Capability</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/web/updates/2018/11/writable-files">Writable Files API</a>
      </td>
      <td>
        The writable files API is designed to increase interoperability of
        web applications with native applications, making it possible for users
        to choose files or directories that a web app can interact with on the
        native file system, and without having to use a native wrapper like
        Electron to ship your web app.
        <br><br>
        <b>Current Status:</b> Gathering feedback &amp; iterating on design.
      </td>
    </tr>
    <tr>
      <td colspan="2">
        See the <a href="https://goo.gl/JkDCXM">full list</a> of capabilities
        including the backlog of ones we've haven't started working on yet.
      </td>
    </tr>
  </tbody>
</table>

## How will we design & implement these new capabilities? {: #process }

We developed this process to make it possible to design and develop new web
platform capabilities that meet the needs of developers quickly, in the open,
and most importantly, work within the existing standards process. It’s no
different than how we develop every other web platform feature, but it puts an
emphasis on developer feedback.

Developer feedback is critical to help us ensure we’re shipping the right
features, but when it comes in late in the process, it can be hard to change
course. That’s why we’re starting to ask for feedback earlier. When actionable
technical and use-case feedback comes in early, it’s easier to course correct or
even stop development, without having shipped poorly thought out or badly
implemented features. Features being developed at WICG are not set in stone, and
[your input](https://discourse.wicg.io/) can make a big difference in how they
evolve.

It’s worth noting that many ideas never make it past the explainer or [origin
trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
stage. The goal of the process is to ship the right feature. That
means we need to learn and iterate quickly. Not shipping a feature because it
doesn’t solve the developer need is OK. To enable this learning, we have come to
employ the following process (although there is frequently some re-ordering of
later steps due to feedback):

### Identify the developer need

The first step is to identify and understand the developer need. What is the
developer trying to accomplish? Who would use it? How are they doing it today?
And what problems or frustrations are fixed by this new capability. Typically,
these come in as feature request from developers, frequently through [bugs filed
on bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/list?can=2&q=Type%3DFeature).

### Create an explainer

After identifying the need for a new capability, create an
[explainer](https://github.com/w3ctag/w3ctag.github.io/blob/master/explainers.md).
The explainer should have enough detail to identify the problem the new
capability provides and helps people understand the scope of the problem. The
Explainer is a living design document that will go through heavy iteration as
the new capability evolves.

### Get feedback and iterate on the explainer

Once the explainer has a reasonable level of clarity, it’s time to publicize it,
to solicit feedback, and iterate on the design. This is an opportunity to verify
the new capability meets the needs of developers and works in a way that they
expect. This is also an opportunity to gather public support and verify that
there really is a need for this capability.

### Move the design to a specification & iterate

At this point, the design work will transition into the standards process,
creating a formal specification, working with developers and other browser
vendors to iterate and improve on the design.

As the design begins to stabilize, an [origin
trial](https://github.com/GoogleChrome/OriginTrials) might be helpful. Origin
trials provide a means to safely experiment with new web platform features in
Chrome and help to verify the proposal solves the problem it set out to solve.

### Ship it

Finally, after the spec has been finalized, the origin trial is complete and all
of the steps and approvals from the [Blink launch
process](https://www.chromium.org/blink/launching-features) have been completed,
it’s time to ship it.





