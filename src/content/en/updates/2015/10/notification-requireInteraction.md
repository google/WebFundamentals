project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Notifications on desktop will be automatically dismissed after a short period of time.

{# wf_updated_on: 2017-10-11 #}
{# wf_published_on: 2015-10-15 #}
{# wf_tags: notifications #}
{# wf_featured_image: /web/updates/images/2015/10/notification.png #}

# Notification requireInteraction - A Smoother Notification UX on Desktop {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

We've learnt a lot since Notifications and Push Messaging landed in Chrome. One
specific piece of feedback about Desktop-class devices was that notifications
would stay around and visible on the user's screen until actively dismissed by the user.

When the page is open it is possible to create a simple JavaScript timer that will automatically
close the notification. But we now live in a world with service worker: where web apps can
live past the lifetime of a window and the service workers are put to sleep as quickly as possible
to save resources. This means we need another way to create a good experience for users.

The Notification spec was recently updated to give the developer the ability to
[indicate that the notification should _not_ be automatically dismissed by the system](https://notifications.spec.whatwg.org/#require-interaction-preference-flag).

> A notification has an associated require interaction preference flag which is initially 
> unset. When set, indicates that on devices with a sufficiently large screen, the notification 
> should remain readily available until the user activates or dismisses the notification.

This might seem odd, but what it implies that unless told otherwise the notification
should be removed from view after a short period of time.

Chrome 47 (beta in October 2015) now supports the `requireInteraction` option. Unless it is explicitly 
provided *and* set to `true`, all notifications on *desktop* will be dismissed after
approximately [20 seconds](https://crbug.com/530697#c9). The interesting part though is that Chrome has 
recently just removed the Notification Center from all desktop platforms (but Chrome OS), this means that 
minimized notifications are considered to be dismissed and are not accessible in a call to `getNotifications` 
in a service worker.

On Chrome for Android, because the notifications are minimized in the notifications tray area, the 
`requireInteraction` option is ignored. 

    navigator.serviceWorker.register('sw.js');

    function showNotifications() {
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('requireInteraction: true', {
              body: 'Requires interaction',
              icon: '../images/touch/chrome-touch-icon-192x192.png',
              requireInteraction: true,
              tag: 'require-interaction'
            });

            registration.showNotification('requireInteraction: false', {
              body: 'Does not require interaction',
              icon: '../images/touch/chrome-touch-icon-192x192.png',
              requireInteraction: false,
              tag: 'no-require-interaction'
            });
          });
        }
      });
    }


[Try the demo](https://googlechrome.github.io/samples/notifications/requireInteraction.html).


Note: Be sure to check out the full documentation including best practices for using [Web Push Notifications](/web/fundamentals/push-notifications)

{% include "comment-widget.html" %}
