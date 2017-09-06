project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Exists" Lighthouse audit.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# Manifest Exists  {: .page-title }

## Why the audit is important {: #why }

The Web App Manifest is the web technology that enables you to add your web app
to a user's homescreen. This feature is commonly referred to as "Add to
Homescreen (A2HS)".

## How to pass the audit {: #how }

For a hands-on, step-by-step guide on adding A2HS support in an
existing application, check out the following codelab: [Add Your Web App to a
User's Home Screen](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

For a more loosely-structured guide that goes into more depth about Web App
Manifests, see [Improve User Experiences with a Web App
Manifest](/web/fundamentals/engage-and-retain/web-app-manifest).

Use what you learn in these guides to add A2HS support in your
own web app.

You can emulate and test A2HS events in Chrome DevTools. See the following
section for more help: [Web App
Manifest](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse fetches the manifest and verifies that it has data. The manifest that
Lighthouse fetches is separate from the one that Chrome is using on the page, which
can possibly cause inaccurate results.


{% include "web/tools/lighthouse/audits/_feedback/manifest-exists.html" %}
