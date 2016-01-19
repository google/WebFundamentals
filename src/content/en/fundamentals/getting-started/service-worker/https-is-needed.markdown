---
layout: shared/narrow
title: "HTTPS is Needed"
description: "To deploy a service worker you'll need HTTPS on your server."
published_on: 2014-12-01
updated_on: 2016-01-19
translation_priority: 0
order: 3
authors:
  - mattgaunt
---

During development you'll be able to use service worker through `localhost`, but to deploy it on a site you'll need to have HTTPS setup on your server.

Using service worker you can hijack connections, fabricate, and filter responses. Powerful stuff. While you would use these powers for good, a man-in-the-middle might not. To avoid this, you can only register for service workers on pages served over HTTPS, so we know the service worker the browser receives hasn't been tampered with during its journey through the network.

[Github Pages](https://pages.github.com/) are served over HTTPS, so they're a great place to host demos.

If you want to add HTTPS to your server then you'll need to get a TLS certificate and set it up for your server. This varies depending on your setup, so check your server's documentation and be sure to check out [Mozilla's SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) for best practices.