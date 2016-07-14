---
layout: shared/narrow
title: "Make a project on the Google Developers Console"
description: "Push notifications from a web app need a backend service to handle messaging. Chrome currently uses Google Cloud Messaging. In this step, you set up a project on the Google Developer Console."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 4
authors:
  - samdutton
---

{% include shared/toc.liquid %}

Push notifications from a web app need a backend service to handle messaging.
Chrome currently uses [Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM) for this, though the eventual goal is for Chrome and GCM to support the [Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

Other browsers are free to use other services.

For this step, you need to set up a project on the Google Developer Console.

**There are lots of steps here, but don't be put off. It's really easy to set up a project!**


## 1. Create a project

From the [Google Developers Console](https://console.developers.google.com)
create a new project:

<img src="images/image04.png" width="907" height="845" alt="Web page screenshot: create a new project from the Google Developers Console" />

## 2. Select APIs for the project

From **Use Google APIs**, select **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Web page screenshot: select APIs from the Google Developers Console" />

From the **Google APIs** list, select **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Web page screenshot: select Google Cloud Messaging API" /> If the API was added successfully you will see a page like this:

<img src="images/image07.png" width="965" height="901" alt="Web page screenshot: Google Developers Console, Google Cloud Messaging enabled" />

## 3. Get credentials

From the **API Manager** menu, select **Credentials**, click the **Create
credentials** dropdown button and select **API key**:

<img src="images/image08.png" width="965" height="901" alt="Web page screenshot: add credentials from the Google Developers Console" />

Click the **Browser key** button:

<img src="images/image09.png" width="907" height="822" alt="Web page screenshot: click Browser key button to select new API key type in the Google Developers Console" />

Give the key a name (anything you like!), leave the HTTP referrers field blank and click the **Create** button:

<img src="images/image10.png" width="907" height="822" alt="Web page screenshot: click the Create button to create a browser API key from the Google Developers Console" />

Get the **API key** — you'll need this later:

<img src="images/image11.png" width="907" height="822" alt="Web page screenshot: get the API key for your project from the Google Developers Console" />

From the Home page, get the **Project Number** — you'll also need this later:

<img src="images/image12.png" width="965" height="901" alt="Web page screenshot: get the Project Number for your project from the Google Developers Console" />

Congratulations!

You've now created a Google Cloud Messaging project.
